// Recovery pass for files.txt entries the simple md5-URL downloader missed.
// Those failures are almost all names that are already percent-encoded (e.g.
// "...%281921-1957%29.svg") or contain accents — download.mjs double-encodes
// them and 404s. Here we resolve each through the Commons API (which handles
// encoding, normalisation and redirects, and returns the real file URL + ext),
// then download. Keys stay identical to files.txt so genhosted.mjs maps them.
import { readFileSync, writeFileSync } from "node:fs"
import { createHash } from "node:crypto"
import { lookupTitles } from "../lib.mjs"

const MAN = "scripts/flags/cf/manifest.json"
const FAILS = "scripts/flags/cf/fails.txt"
const OUT = "public/cf"
const UA = "GlobalioFlagFetcher/1.0 (https://globalio.app; contact keganbergeron@gmail.com)"
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const manifest = JSON.parse(readFileSync(MAN, "utf8"))
const names = readFileSync(FAILS, "utf8").split("\n").filter(Boolean).filter((n) => !manifest[n])

// files.txt name -> Commons API title (decode %xx, spaces->underscores).
function toTitle(name) {
  let t = name
  try { t = decodeURIComponent(name) } catch { /* bare % — leave as-is */ }
  return t.replace(/ /g, "_")
}
const titleByName = new Map(names.map((n) => [n, toTitle(n)]))
const info = await lookupTitles([...new Set(titleByName.values())])

const slug = (name, ext) => createHash("sha1").update(name).digest("hex").slice(0, 16) + "." + ext

let ok = 0, dead = 0
for (const name of names) {
  const meta = info.get(titleByName.get(name))
  if (!meta || !meta.exists) { dead++; continue }
  let buf = null
  for (let a = 0; a < 4; a++) {
    try {
      const res = await fetch(meta.url, { headers: { "User-Agent": UA } })
      if (res.status === 429 || res.status >= 500) { await sleep(800 * (a + 1)); continue }
      if (!res.ok) break
      const b = Buffer.from(await res.arrayBuffer())
      if (b.length < 40) break
      buf = b; break
    } catch { await sleep(600 * (a + 1)) }
  }
  if (!buf) { dead++; continue }
  const s = slug(name, meta.ext)
  writeFileSync(`${OUT}/${s}`, buf)
  manifest[name] = "/cf/" + s
  ok++
  if (ok % 20 === 0) writeFileSync(MAN, JSON.stringify(manifest))
}
writeFileSync(MAN, JSON.stringify(manifest))
console.log(`recovered ${ok}, still dead/unresolvable ${dead}`)
