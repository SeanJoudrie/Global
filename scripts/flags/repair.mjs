// Phase 2: try to repair DEAD fp()/wiki() links by finding the correct current
// Commons filename via File-namespace search. Conservative: only accept a
// candidate that clearly IS the subject's flag. Writes scripts/flags/repairs.json
// with {repairs: [...], unrepairable: [...]} for review before applying.
import { readFileSync, writeFileSync } from "node:fs"
import { searchFiles, lookupTitles, sleep } from "./lib.mjs"

const report = JSON.parse(readFileSync(new URL("./audit-report.json", import.meta.url)))
const dead = report.filter((r) => !r.exists)

// Strict matching: a candidate is accepted ONLY when its meaningful tokens are
// exactly the same set as the dead title's. This rejects different-entity
// supersets (Tobago -> "Trinidad and Tobago"), maps/seals/coats, photos, and
// "proposed/campaign" flags. Misses are left unrepairable (removed, not invented).

const PHOTO_EXT = /\.(jpe?g|tif?f|webp)$/i
const FLAGISH = /(flag|bandera|drapeau|bandiera|flagge|bendera)/i
// Structural / descriptive words to ignore when comparing the subject.
const STRUCT = new Set([
  "flag", "flags", "map", "of", "the", "a", "and", "or", "banner", "bandera", "drapeau",
  "bandiera", "flagge", "bendera", "de", "du", "des", "da", "del", "la", "le", "el",
  "province", "provincia", "provincial", "state", "governorate", "muhafazah", "district",
  "region", "regional", "parish", "bailiwick", "county", "city", "prefecture", "oblast",
  "krai", "republic", "department", "departamento", "canton", "municipality", "territory",
  "variant", "civil", "official", "new", "old",
])
// Clearly-not-the-subject-flag markers.
const NEG = /(flag map|map of|locator|orthographic|\bseal\b|coat of arms|proposed|campaign|university|rajabhat|\bscout\b|election|animated|construction sheet|\brugby\b|warning|background|outline|detailed|naval ensign|war ensign|\bgame\b)/i

function tokens(s) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 2)
}

function meaningfulSet(title) {
  let t = title.replace(/^File:/i, "").replace(/\.[a-z0-9]+$/i, "")
  t = t.replace(/\([^)]*\)/g, " ") // drop parentheticals (years, "variant")
  t = t.replace(/\b\d{3,4}\b/g, " ") // drop year numbers
  return new Set(tokens(t).filter((w) => !STRUCT.has(w)))
}

function setEq(a, b) {
  if (a.size !== b.size || a.size === 0) return false
  for (const x of a) if (!b.has(x)) return false
  return true
}

// Build a focused search query from the dead title's meaningful tokens.
function queryOf(title) {
  return [...meaningfulSet(title)].join(" ")
}

function score(deadTitle, candidate) {
  if (PHOTO_EXT.test(candidate)) return -99
  if (!FLAGISH.test(candidate)) return -99
  if (NEG.test(candidate)) return -99
  const target = meaningfulSet(deadTitle)
  const cand = meaningfulSet(candidate)
  if (!setEq(target, cand)) return -99
  let s = 10
  if (/\.svg$/i.test(candidate)) s += 1
  return s
}

const repairs = []
const unrepairable = []
let i = 0
for (const d of dead) {
  i++
  const query = queryOf(d.title)
  const candidates = query ? await searchFiles(`Flag ${query}`, 10) : []
  let best = null
  let bestScore = 0
  for (const c of candidates) {
    const sc = score(d.title, c)
    if (sc > bestScore) {
      bestScore = sc
      best = c
    }
  }
  if (best) {
    repairs.push({ ...d, query, chosen: best, score: bestScore })
  } else {
    unrepairable.push({ ...d, query, candidates })
  }
  process.stdout.write(`  ${i}/${dead.length} ${best ? "FIX " : "----"} ${d.title} ${best ? "=> " + best : ""}\n`)
  await sleep(500)
}

// Verify chosen titles actually resolve, and capture url/ext.
const chosenTitles = [...new Set(repairs.map((r) => r.chosen))]
const verify = await lookupTitles(chosenTitles)
const confirmed = []
for (const r of repairs) {
  const info = verify.get(r.chosen)
  if (info?.exists) confirmed.push({ ...r, url: info.url, ext: info.ext, finalTitle: info.finalTitle })
  else unrepairable.push({ ...r, reason: "chosen-not-resolving" })
}

writeFileSync(
  new URL("./repairs.json", import.meta.url),
  JSON.stringify({ repairs: confirmed, unrepairable }, null, 2),
)

console.error(`\nDead: ${dead.length}. Repairable: ${confirmed.length}. Unrepairable: ${unrepairable.length}.`)
console.error("Wrote scripts/flags/repairs.json")
