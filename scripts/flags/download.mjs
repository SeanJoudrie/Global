// Phase 1: self-host every LIVE Wikimedia flag.
// Reads audit-report.json, downloads each working image into public/flags/wm/,
// and generates src/data/localFlags.ts mapping the fp()/wiki() argument
// (space->underscore normalised) to its local path.
//
// Hybrid sizing: simple SVGs are tiny vectors, so keep them as SVG (crisp at any
// size). Heavy SVGs (detailed seals) and oversized rasters are replaced with a
// ~1000px PNG thumbnail from Wikimedia, which is much smaller and renders fast.
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync, readdirSync } from "node:fs"
import { createHash } from "node:crypto"
import { sleep } from "./lib.mjs"

const ROOT = new URL("../../", import.meta.url)
const OUT_DIR = new URL("public/flags/wm/", ROOT)
const report = JSON.parse(readFileSync(new URL("./audit-report.json", import.meta.url)))

mkdirSync(OUT_DIR, { recursive: true })

const SVG_KEEP_LIMIT = 80_000 // SVG bytes above this -> rasterise to PNG thumbnail
const RASTER_KEEP_LIMIT = 250_000 // raster bytes above this -> shrink to thumbnail
const THUMB_WIDTH = 1000

const keyOf = (arg) => arg.replace(/ /g, "_")

function slugify(title) {
  const base = title.replace(/^File:/i, "").replace(/\.[a-z0-9]+$/i, "")
  let s = base
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/%[0-9a-f]{2}/gi, "-")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
  return s || "flag"
}

// Live, unique-by-title set.
const liveByTitle = new Map()
for (const r of report) {
  if (r.exists && !liveByTitle.has(r.title)) {
    liveByTitle.set(r.title, { url: r.url, ext: r.ext, finalTitle: r.finalTitle || r.title })
  }
}

// Assign a collision-free slug (without extension) per title.
const titleToSlug = new Map()
const usedSlugs = new Set()
for (const [title, info] of liveByTitle) {
  let slug = slugify(info.finalTitle)
  if (usedSlugs.has(slug)) {
    slug = `${slug}-${createHash("sha1").update(title).digest("hex").slice(0, 6)}`
  }
  usedSlugs.add(slug)
  titleToSlug.set(title, slug)
}

const thumbUrl = (title) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    title.replace(/^File:/, ""),
  )}?width=${THUMB_WIDTH}`

async function fetchBuf(url) {
  // CDN throttles datacenter IPs to ~3-4 req/s. Short flat backoff + many
  // attempts so throttled requests retry quickly and keep saturating the budget.
  for (let attempt = 0; attempt <= 30; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Globalio-flag-audit/1.0 (self-hosting)" },
        redirect: "follow",
      })
      if (res.status === 429 || res.status === 403 || res.status >= 500) {
        await sleep(400 + Math.random() * 400)
        continue
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return Buffer.from(await res.arrayBuffer())
    } catch (e) {
      if (attempt === 30) throw e
      await sleep(400 + Math.random() * 400)
    }
  }
}

// Resume support: map existing files by slug so we skip already-saved ones.
const existingBySlug = new Map()
for (const f of readdirSync(OUT_DIR)) {
  const slug = f.replace(/\.[a-z0-9]+$/i, "")
  existingBySlug.set(slug, f)
}

const titleToFile = new Map() // title -> final filename (slug.ext)
let done = 0
let downloaded = 0
let thumbed = 0
const failed = []

async function handle(title) {
  const info = liveByTitle.get(title)
  const slug = titleToSlug.get(title)
  if (existingBySlug.has(slug)) {
    const f = existingBySlug.get(slug)
    if (statSync(new URL(f, OUT_DIR)).size > 0) {
      titleToFile.set(title, f)
      done++
      return
    }
  }
  try {
    // Download the original once (no server-side thumbnail round-trip — that
    // halves request count and avoids slow on-demand SVG rasterisation under the
    // CDN rate limit). Oversized files are shrunk in a separate local pass later.
    const buf = await fetchBuf(info.url)
    const name = `${slug}.${info.ext}`
    writeFileSync(new URL(name, OUT_DIR), buf)
    titleToFile.set(title, name)
    downloaded++
  } catch (e) {
    failed.push({ title, url: info.url, error: String(e) })
  }
  done++
}

async function run() {
  const titles = [...liveByTitle.keys()]
  // Moderate concurrency saturates the CDN's shared ~3-4 req/s budget: while some
  // requests back off on 429, others succeed, instead of one slow file blocking all.
  const CONCURRENCY = 5
  let next = 0
  async function worker() {
    while (next < titles.length) {
      const i = next++
      await handle(titles[i])
      if (i % 50 === 0 || done >= titles.length) {
        process.stdout.write(
          `progress ${done}/${titles.length} (new ${downloaded}, thumb ${thumbed}, failed ${failed.length})\n`,
        )
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))

  // Build the map keyed by every live fp()/wiki() argument.
  const map = {}
  for (const r of report) {
    if (!r.exists) continue
    const name = titleToFile.get(r.title)
    if (name) map[keyOf(r.arg)] = `/flags/wm/${name}`
  }
  // Persist the live map so generate.mjs can merge it with repairs/dead entries.
  writeFileSync(new URL("./live-map.json", import.meta.url), JSON.stringify(map, null, 0))

  const keys = Object.keys(map).sort()
  const lines = keys.map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(map[k])},`)
  writeFileSync(
    new URL("src/data/localFlags.ts", ROOT),
    `// AUTO-GENERATED by scripts/flags/download.mjs — do not edit by hand.
// Maps a Wikimedia Commons filename (as passed to fp()/wiki(), with spaces
// normalised to underscores) to its self-hosted local path under /flags/wm/.
// Regenerate: node scripts/flags/audit.mjs && node scripts/flags/download.mjs
export const LOCAL_FLAGS: Record<string, string> = {
${lines.join("\n")}
}
`,
  )

  if (failed.length) {
    writeFileSync(new URL("./download-failures.json", import.meta.url), JSON.stringify(failed, null, 2))
  }
  process.stdout.write(
    `Done. ${liveByTitle.size} unique live flags, ${downloaded} new (${thumbed} thumbnailed), ${failed.length} failed. Map entries: ${keys.length}.\n`,
  )
}

run()
