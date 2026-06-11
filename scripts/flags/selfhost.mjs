// Best-effort self-hosting downloader (resumable, gentle, throttle-tolerant).
// Fetches every working flag image not yet on disk:
//   - live flags        -> <slug>.<ext>
//   - repaired dead ones -> fix-<slug>.<ext>   (from repairs.json)
// Writes nothing else; run generate.mjs afterwards to refresh the map. Safe to
// stop/rerun at any time — already-downloaded files are skipped.
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync, readdirSync } from "node:fs"
import { assignLiveSlugs, slugify, sleep } from "./lib.mjs"

const OUT_DIR = new URL("../../public/flags/wm/", import.meta.url)
const here = (p) => new URL(p, import.meta.url)
mkdirSync(OUT_DIR, { recursive: true })
const report = JSON.parse(readFileSync(here("./audit-report.json")))

const have = new Set(readdirSync(OUT_DIR).map((f) => f.replace(/\.[a-z0-9]+$/i, "")))

// Build worklist: {url, slug, ext}.
const work = []
const { liveByTitle, titleToSlug } = assignLiveSlugs(report)
for (const [title, info] of liveByTitle) {
  const slug = titleToSlug.get(title)
  if (!have.has(slug)) work.push({ url: info.url, slug, ext: info.ext })
}
if (existsSync(here("./repairs.json"))) {
  for (const r of JSON.parse(readFileSync(here("./repairs.json"))).repairs) {
    const slug = `fix-${slugify(r.finalTitle)}`
    if (!have.has(slug)) work.push({ url: r.url, slug, ext: r.ext })
  }
}

async function fetchBuf(url) {
  for (let attempt = 0; attempt <= 8; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Globalio-flag-audit/1.0 (self-hosting)" },
        redirect: "follow",
        signal: AbortSignal.timeout(25000),
      })
      if (res.status === 429 || res.status === 403 || res.status >= 500) {
        await sleep(500 + Math.random() * 700)
        continue
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      if (!buf.length) throw new Error("empty body")
      return buf
    } catch {
      await sleep(500 + Math.random() * 700)
    }
  }
  return null // give up on this file for now; a later run retries
}

let done = 0
let ok = 0
let fail = 0
const CONCURRENCY = 4
let next = 0
async function worker() {
  while (next < work.length) {
    const { url, slug, ext } = work[next++]
    const buf = await fetchBuf(url)
    if (buf) {
      writeFileSync(new URL(`${slug}.${ext}`, OUT_DIR), buf)
      ok++
    } else {
      fail++
    }
    if (++done % 25 === 0 || done === work.length) {
      process.stdout.write(`progress ${done}/${work.length} (ok ${ok}, fail ${fail})\n`)
    }
  }
}
console.log(`Need ${work.length} files (${have.size} already on disk).`)
await Promise.all(Array.from({ length: CONCURRENCY }, worker))
console.log(`Done. ok ${ok}, fail ${fail}. Rerun to retry failures; then run generate.mjs.`)
