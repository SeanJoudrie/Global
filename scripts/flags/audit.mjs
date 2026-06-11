// Audit every Wikimedia flag filename referenced via fp()/wiki() across the
// three data files. Writes scripts/flags/audit-report.json and prints a summary.
import { writeFileSync } from "node:fs"
import { FILES, extractCalls, extractCityCalls, lookupTitles } from "./lib.mjs"

const all = [] // {file, helper, arg, raw, title}
for (const [key, path] of Object.entries(FILES)) {
  const calls = key === "city" ? extractCityCalls(path) : extractCalls(path)
  for (const c of calls) all.push({ fileKey: key, path, ...c })
}

console.error(`Extracted ${all.length} fp()/wiki() references across ${Object.keys(FILES).length} files.`)

// Unique titles to verify.
const uniqueTitles = [...new Set(all.map((c) => c.title))]
console.error(`Unique Commons titles: ${uniqueTitles.length}. Querying API...`)

const lookup = await lookupTitles(uniqueTitles)

// Annotate occurrences.
let live = 0
let dead = 0
const report = all.map((c) => {
  const info = lookup.get(c.title)
  if (info?.exists) live++
  else dead++
  return {
    fileKey: c.fileKey,
    helper: c.helper,
    arg: c.arg,
    raw: c.raw,
    title: c.title,
    exists: !!info?.exists,
    url: info?.url ?? null,
    mime: info?.mime ?? null,
    ext: info?.ext ?? null,
    finalTitle: info?.finalTitle ?? null,
  }
})

writeFileSync(
  new URL("./audit-report.json", import.meta.url),
  JSON.stringify(report, null, 2),
)

// Summaries.
const byFile = {}
for (const r of report) {
  byFile[r.fileKey] ??= { live: 0, dead: 0, deadList: [] }
  if (r.exists) byFile[r.fileKey].live++
  else {
    byFile[r.fileKey].dead++
    byFile[r.fileKey].deadList.push(`${r.helper}("${r.arg}")`)
  }
}

console.error("\n===== AUDIT SUMMARY =====")
console.error(`Total references: ${all.length}  (live ${live}, dead ${dead})`)
for (const [k, v] of Object.entries(byFile)) {
  console.error(`\n[${k}] live ${v.live} / dead ${v.dead}`)
}
console.error("\nReport written to scripts/flags/audit-report.json")
