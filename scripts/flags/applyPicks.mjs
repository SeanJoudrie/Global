// Apply user-confirmed flag picks into repairs.json.
// Usage: node scripts/flags/applyPicks.mjs <picks-file> [excludeArg ...]
// Picks file lines: "<arg>  =>  <Commons file>" (the format the in-app Flag
// Check screen produces). Verified against Commons before applying.
import { readFileSync, writeFileSync } from "node:fs"
import { lookupTitles } from "./lib.mjs"

const [picksPath, ...exclude] = process.argv.slice(2)
const excludeSet = new Set(exclude)
const here = (p) => new URL(p, import.meta.url)

const picks = readFileSync(picksPath, "utf8")
  .split("\n")
  .map((l) => l.trim())
  .filter((l) => l && l.includes("=>") && !l.startsWith("="))
  .map((l) => {
    const [arg, file] = l.split("=>").map((s) => s.trim())
    return { arg, file }
  })
  .filter((p) => !excludeSet.has(p.arg))

const verify = await lookupTitles([...new Set(picks.map((p) => p.file))])

const data = JSON.parse(readFileSync(here("./repairs.json")))
const applied = []
const failed = []
for (const p of picks) {
  const info = verify.get(p.file)
  if (!info?.exists) {
    failed.push(p)
    continue
  }
  applied.push({
    arg: p.arg,
    fileKey: "user",
    chosen: p.file,
    url: info.url,
    ext: info.ext,
    finalTitle: info.finalTitle,
    recovered: true,
  })
}

const appliedArgs = new Set(applied.map((a) => a.arg))
// Remove these args from unrepairable and any prior repair, then add fresh.
const repairs = [...data.repairs.filter((r) => !appliedArgs.has(r.arg)), ...applied]
const unrepairable = data.unrepairable.filter((u) => !appliedArgs.has(u.arg))
writeFileSync(here("./repairs.json"), JSON.stringify({ repairs, unrepairable }, null, 2))

console.log(`Applied ${applied.length}:`)
for (const a of applied) console.log(`  ${a.arg}  =>  ${a.chosen}`)
if (failed.length) {
  console.log(`\nFailed (not found on Commons): ${failed.length}`)
  for (const f of failed) console.log(`  ${f.arg}  =>  ${f.file}`)
}
console.log(`\nrepairs ${repairs.length}, unrepairable ${unrepairable.length}. Run generate.mjs next.`)
