// Lenient recovery pass over CACHED search candidates (no new searches): the
// strict matcher rejects real flags whose current filename drops a qualifier
// (e.g. "Navajo flag.svg" for "Flag of the Navajo Nation"). Here we accept a
// cached candidate that is clearly a flag of the same subject, then verify it
// exists (one batched lookup) and fold it into repairs.json as a repair.
import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { lookupTitles } from "./lib.mjs"

const here = (p) => new URL(p, import.meta.url)
const cache = JSON.parse(readFileSync(here("./search-cache.json")))
const data = JSON.parse(readFileSync(here("./repairs.json")))

const PHOTO = /\.(jpe?g|tif?f|webp)$/i
const FLAGISH = /(flag|bandera|drapeau|bandiera|vlag|flagge|bendera)/i
const NEG = /(flag.?map|map of|locator|orthographic|\bseal\b|coat of arms|\blogo\b|\bemblem\b|\btemple\b|\bvisit\b|assembly|parliament|\bpin\b|\bday\b|proposal|proposed|construction|\brugby\b|outline|detailed|background)/i
// Generic qualifiers to drop so "Navajo Nation" matches "Navajo flag".
const SOFT = new Set(["nation", "tribe", "people", "peoples", "the", "of", "flag", "flags", "a", "and", "bandera", "drapeau", "de", "la"])

function toks(s) {
  return s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").split(/[^a-z0-9]+/).filter(Boolean)
}
function distinctive(title) {
  let t = title.replace(/^File:/i, "").replace(/\.[a-z0-9]+$/i, "").replace(/\([^)]*\)/g, " ").replace(/\b\d{3,4}\b/g, " ")
  return toks(t).filter((w) => w.length >= 3 && !SOFT.has(w))
}

function pick(deadArg, candidates) {
  const need = distinctive(deadArg)
  if (need.length === 0) return null
  let best = null
  let bestScore = -1
  for (const cand of candidates) {
    if (PHOTO.test(cand) || !FLAGISH.test(cand) || NEG.test(cand)) continue
    const ct = new Set(toks(cand))
    if (!need.every((w) => ct.has(w))) continue
    // Prefer svg, shorter titles (more canonical), and "Flag …" leading.
    let s = 10 - toks(cand).length
    if (/\.svg$/i.test(cand)) s += 3
    if (/^Flag\b/i.test(cand)) s += 2
    if (s > bestScore) {
      bestScore = s
      best = cand
    }
  }
  return best
}

// Each unrepairable entry stored its candidate list (repair.mjs), with the
// cached search as a fallback.
const proposals = []
const stillDead = []
for (const u of data.unrepairable) {
  const cands = u.candidates || cache[u.query] || []
  const chosen = pick(u.arg, cands)
  if (chosen) proposals.push({ ...u, chosen })
  else stillDead.push(u)
}

console.log(`Lenient recovery: ${proposals.length} candidates found, ${stillDead.length} still unrecoverable.`)

// Verify chosen titles exist; capture url/ext/finalTitle.
const titles = [...new Set(proposals.map((p) => p.chosen))]
const verify = await lookupTitles(titles)
const recovered = []
for (const p of proposals) {
  const info = verify.get(p.chosen)
  if (info?.exists) {
    recovered.push({ arg: p.arg, fileKey: p.fileKey, chosen: p.chosen, url: info.url, ext: info.ext, finalTitle: info.finalTitle, recovered: true })
    console.log(`  RECOVER  ${p.arg}  =>  ${p.chosen}`)
  } else {
    stillDead.push(p)
  }
}

// Fold recovered into repairs.json (move from unrepairable to repairs).
const recoveredArgs = new Set(recovered.map((r) => r.arg))
const newRepairs = [...data.repairs, ...recovered]
const newUnrepairable = data.unrepairable.filter((u) => !recoveredArgs.has(u.arg))
writeFileSync(here("./repairs.json"), JSON.stringify({ repairs: newRepairs, unrepairable: newUnrepairable }, null, 2))
console.log(`\nMerged. repairs ${newRepairs.length}, unrepairable ${newUnrepairable.length}. Re-run generate.mjs.`)
