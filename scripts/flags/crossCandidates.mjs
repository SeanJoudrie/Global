// Re-gather candidate flags for the still-missing entries, searching BOTH
// Wikimedia Commons and English Wikipedia's File namespace (many niche flags are
// uploaded local to en.wiki, not Commons). Resolves each candidate to a real
// image URL via en.wikipedia's imageinfo (which serves both local and Commons
// files). Writes candidates-extra.json: { arg: [{file,url}] } for generate.mjs.
import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { sleep } from "./lib.mjs"

const here = (p) => new URL(p, import.meta.url)
const EN = "https://en.wikipedia.org/w/api.php"
const COMMONS = "https://commons.wikimedia.org/w/api.php"

const JUNK = /\.(jpe?g|tiff?)$|flag.?map|map of|outline|\blabel\b|corner|disputed|simple map|\bseal\b|coat of arms|\blogo\b|\bemblem\b|locator|orthographic|\btemple\b|\bvisit\b|assembly|parliament|construction|\brugby\b|\bpin\b|\bicon\b|background|\bday\b|\.pdf$/i
const FLAGISH = /flag|bandera|drapeau|bandiera|vlag|bayrak|bandeira/i

const cachePath = here("./xwiki-cache.json")
const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, "utf8")) : {}
const saveCache = () => writeFileSync(cachePath, JSON.stringify(cache))

async function api(base, params) {
  const url = `${base}?${new URLSearchParams({ ...params, format: "json", formatversion: "2" })}`
  for (let a = 0; a <= 8; a++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": "Globalio-flag-audit/1.0" }, signal: AbortSignal.timeout(20000) })
      if (r.status === 429 || r.status === 403 || r.status >= 500) { await sleep(800 + Math.random() * 800); continue }
      if (!r.ok) throw new Error("HTTP " + r.status)
      return await r.json()
    } catch (e) { if (a === 8) throw e; await sleep(800 + Math.random() * 800) }
  }
}

async function search(base, q) {
  const key = `${base.includes("commons") ? "c" : "en"}:${q}`
  if (cache[key]) return cache[key]
  let res = []
  try {
    const d = await api(base, { action: "query", list: "search", srsearch: q, srnamespace: "6", srlimit: "12" })
    res = (d.query?.search ?? []).map((s) => s.title.replace(/^File:/, ""))
  } catch { res = [] }
  cache[key] = res
  saveCache()
  return res
}

// Resolve titles -> {url,ext} via en.wikipedia imageinfo (handles local+Commons).
async function resolve(titles) {
  const out = {}
  for (let i = 0; i < titles.length; i += 40) {
    const batch = titles.slice(i, i + 40)
    const ckey = "ii:" + batch.join("|")
    if (cache[ckey]) { Object.assign(out, cache[ckey]); continue }
    const got = {}
    try {
      const d = await api(EN, {
        action: "query", titles: batch.map((t) => `File:${t}`).join("|"),
        prop: "imageinfo", iiprop: "url|mime", redirects: "1",
      })
      const norm = new Map()
      for (const n of d.query?.normalized ?? []) norm.set(n.from, n.to)
      const byTitle = new Map((d.query?.pages ?? []).map((p) => [p.title, p]))
      for (const t of batch) {
        let key = `File:${t}`, seen = new Set()
        while (norm.has(key) && !seen.has(key)) { seen.add(key); key = norm.get(key) }
        const p = byTitle.get(key)
        // Commons files queried via en.wiki come back missing:true + "shared" but
        // still carry imageinfo — accept imageinfo whenever it is present.
        const ii = p?.imageinfo?.[0]
        if (ii) {
          const m = { "image/svg+xml": "svg", "image/png": "png", "image/gif": "gif" }
          got[t] = { url: ii.url, ext: m[ii.mime] || (t.match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase() ?? "svg") }
        }
      }
    } catch { /* skip */ }
    cache[ckey] = got
    saveCache()
    Object.assign(out, got)
    await sleep(300)
  }
  return out
}

const subjectOf = (arg) =>
  arg.replace(/\.(svg|png|gif|jpe?g)$/i, "").replace(/_/g, " ")
    .replace(/^Flag of the /i, "").replace(/^Flag of /i, "").replace(/^Bandera /i, "")
    .replace(/ flag$/i, "").replace(/[()]/g, "").trim()

const data = JSON.parse(readFileSync(here("./repairs.json")))
const extra = {}
let i = 0
for (const u of data.unrepairable) {
  i++
  const subj = subjectOf(u.arg)
  const commons = await search(COMMONS, `${subj} flag`)
  const en = await search(EN, `${subj} flag`)
  const titles = [...new Set([...(u.candidates || []), ...commons, ...en])]
    .filter((c) => FLAGISH.test(c) && !JUNK.test(c))
  process.stdout.write(`  ${i}/${data.unrepairable.length} ${subj} — ${titles.length} candidates\n`)
  if (!titles.length) continue
  const urls = await resolve(titles.slice(0, 10))
  const cands = titles.map((file) => urls[file] && { file, url: urls[file].url }).filter(Boolean).slice(0, 6)
  if (cands.length) extra[u.arg] = cands
}

writeFileSync(here("./candidates-extra.json"), JSON.stringify(extra, null, 0))
console.log(`\nWrote candidates-extra.json for ${Object.keys(extra).length} entries.`)
