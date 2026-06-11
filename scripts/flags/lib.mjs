// Shared helpers for the flag audit / self-hosting scripts.
import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { createHash } from "node:crypto"

// Local filename slug from a Commons title (must match across download/generate).
export function slugify(title) {
  const base = title.replace(/^File:/i, "").replace(/\.[a-z0-9]+$/i, "")
  return (
    base
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/%[0-9a-f]{2}/gi, "-")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "flag"
  )
}

// Deterministic title -> slug assignment with collision resolution, shared by
// download.mjs and generate.mjs so on-disk filenames always match the map.
export function assignLiveSlugs(report) {
  const liveByTitle = new Map()
  for (const r of report) {
    if (r.exists && !liveByTitle.has(r.title)) {
      liveByTitle.set(r.title, { url: r.url, ext: r.ext, finalTitle: r.finalTitle || r.title })
    }
  }
  const titleToSlug = new Map()
  const used = new Set()
  for (const [title, info] of liveByTitle) {
    let slug = slugify(info.finalTitle)
    if (used.has(slug)) slug = `${slug}-${createHash("sha1").update(title).digest("hex").slice(0, 6)}`
    used.add(slug)
    titleToSlug.set(title, slug)
  }
  return { liveByTitle, titleToSlug }
}

export const FILES = {
  challenges: "src/data/challenges.ts",
  identity: "src/data/identityFlags.ts",
  city: "src/data/usCityFlags.ts",
}

// Match fp("...") and wiki("...") calls, capturing the helper and the raw arg.
const CALL_RE = /\b(fp|wiki)\("((?:[^"\\]|\\.)*)"\)/g

// Turn a helper argument into the true Commons file title.
// - wiki() replaces spaces with underscores at runtime; the API normalises
//   spaces/underscores either way, so we just decode percent-escapes (fp args
//   contain things like %2B for +). Underscores are kept.
export function argToTitle(arg) {
  let t = arg
  try {
    t = decodeURIComponent(arg)
  } catch {
    // arg had a bare % that isn't a valid escape — leave as-is.
    t = arg
  }
  return t.replace(/ /g, "_")
}

// Extract every fp()/wiki() occurrence from a source file.
export function extractCalls(path) {
  const src = readFileSync(path, "utf8")
  const out = []
  let m
  while ((m = CALL_RE.exec(src)) !== null) {
    out.push({
      helper: m[1],
      arg: m[2],
      raw: m[0], // e.g. fp("Foo.svg")
      title: argToTitle(m[2]),
    })
  }
  return out
}

// usCityFlags.ts passes filenames as the 4th arg of c(id, name, state, FILE, note),
// i.e. fp() is called on a variable, so the generic fp("...") regex misses them.
const CITY_RE =
  /\bc\(\s*"(?:[^"\\]|\\.)*"\s*,\s*"(?:[^"\\]|\\.)*"\s*,\s*"(?:[^"\\]|\\.)*"\s*,\s*"((?:[^"\\]|\\.)*)"/g

export function extractCityCalls(path) {
  const src = readFileSync(path, "utf8")
  const out = []
  let m
  while ((m = CITY_RE.exec(src)) !== null) {
    const arg = m[1]
    out.push({ helper: "fp", arg, raw: `c(...,"${arg}",...)`, title: argToTitle(arg) })
  }
  return out
}

// Query the MediaWiki API for imageinfo on up to 50 titles at once.
// Returns Map<normalizedTitle, {exists, url, mime, ext}>.
const API = "https://commons.wikimedia.org/w/api.php"

async function apiGet(params) {
  const url = `${API}?${new URLSearchParams(params)}`
  for (let attempt = 0; attempt <= 9; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Globalio-flag-audit/1.0 (quiz app self-hosting)" },
      })
      if (res.status === 200) return await res.json()
      if (res.status === 429 || res.status === 403 || res.status >= 500) {
        await sleep(Math.min(1000 * 2 ** attempt, 15000) + Math.random() * 500)
        continue
      }
      throw new Error(`HTTP ${res.status}`)
    } catch (e) {
      if (attempt === 9) throw e
      await sleep(Math.min(1000 * 2 ** attempt, 15000) + Math.random() * 500)
    }
  }
  throw new Error("apiGet: exhausted retries")
}

export function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function extFromMime(mime, title) {
  const map = {
    "image/svg+xml": "svg",
    "image/png": "png",
    "image/gif": "gif",
    "image/jpeg": "jpg",
    "image/webp": "webp",
  }
  if (map[mime]) return map[mime]
  const m = title.match(/\.([a-z0-9]+)$/i)
  return m ? m[1].toLowerCase() : "svg"
}

// Look up many titles. Input: array of unique titles. Returns Map keyed by the
// ORIGINAL title we asked for (resolving normalisation + redirects).
const CACHE_PATH = new URL("./lookup-cache.json", import.meta.url)

function loadCache() {
  if (existsSync(CACHE_PATH)) {
    try {
      return new Map(Object.entries(JSON.parse(readFileSync(CACHE_PATH, "utf8"))))
    } catch {
      /* ignore corrupt cache */
    }
  }
  return new Map()
}

function saveCache(map) {
  writeFileSync(CACHE_PATH, JSON.stringify(Object.fromEntries(map), null, 0))
}

export async function lookupTitles(titles) {
  const cache = loadCache()
  const result = new Map()
  const todo = []
  for (const t of titles) {
    if (cache.has(t)) result.set(t, cache.get(t))
    else todo.push(t)
  }
  process.stderr.write(`  cache hits ${result.size}, to query ${todo.length}\n`)

  const batchSize = 50
  for (let i = 0; i < todo.length; i += batchSize) {
    const batch = todo.slice(i, i + batchSize)
    const data = await apiGet({
      action: "query",
      titles: batch.map((t) => `File:${t}`).join("|"),
      prop: "imageinfo",
      iiprop: "url|mime|size",
      redirects: "1",
      format: "json",
      formatversion: "2",
    })

    // Build lookups for normalisation + redirects so we can map back to inputs.
    const norm = new Map() // from -> to
    for (const n of data.query?.normalized ?? []) norm.set(n.from, n.to)
    for (const r of data.query?.redirects ?? []) norm.set(r.from, r.to)

    const byTitle = new Map()
    for (const p of data.query?.pages ?? []) {
      byTitle.set(p.title, p)
    }

    for (const t of batch) {
      // Resolve File:t through normalisation/redirect chain.
      let key = `File:${t}`
      const seen = new Set()
      while (norm.has(key) && !seen.has(key)) {
        seen.add(key)
        key = norm.get(key)
      }
      const page = byTitle.get(key)
      let entry
      if (page && !page.missing && page.imageinfo?.[0]) {
        const ii = page.imageinfo[0]
        entry = {
          exists: true,
          url: ii.url,
          mime: ii.mime,
          ext: extFromMime(ii.mime, t),
          finalTitle: page.title,
        }
      } else {
        entry = { exists: false }
      }
      result.set(t, entry)
      cache.set(t, entry)
    }
    saveCache(cache)
    process.stderr.write(`  checked ${Math.min(i + batchSize, todo.length)}/${todo.length}\n`)
    await sleep(500)
  }
  return result
}

// Commons File-namespace search. Returns array of file titles (without "File:").
export async function searchFiles(query, limit = 8) {
  const data = await apiGet({
    action: "query",
    list: "search",
    srsearch: `${query} `,
    srnamespace: "6",
    srlimit: String(limit),
    format: "json",
    formatversion: "2",
  })
  return (data.query?.search ?? []).map((s) => s.title.replace(/^File:/, ""))
}
