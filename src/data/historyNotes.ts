// Hand-maintained dev notes from the Codex historical-flag sweep. These are
// candidate flags considered but NOT yet added to a country's flagHistory —
// either the Wikimedia filename couldn't be verified at the time (rate-limited)
// or it's ambiguous whether the flag truly belongs. Surfaced in Settings →
// Flag Check → Notes so the to-do isn't lost. Adding one = verify the file
// loads, then move it into src/data/codex.ts FLAG_HISTORY.
export interface HistoryNote {
  country: string
  era: string
  detail: string
  candidate?: string // proposed Wikimedia filename to verify
  status: "to-verify" | "ambiguous"
}

export const HISTORY_NOTES: HistoryNote[] = [
  { country: "Kosovo", era: "pre-2008 (UNMIK)", status: "ambiguous",
    detail: "XK history starts at 2008. Under UN administration (1999–2008) Kosovo had no official flag of its own (the UN flag flew; the Albanian flag was used unofficially). Unclear whether to represent this period." },
  { country: "Portugal", era: "1816–1826", status: "to-verify",
    detail: "United Kingdom of Portugal, Brazil and the Algarves used a distinct flag (Portuguese arms on an armillary sphere). Couldn't confirm a filename — worth adding between the 1707 and 1830 entries if found." },
  { country: "Slovakia", era: "1848 / 1918 Pan-Slavic", status: "ambiguous",
    detail: "SK jumps from the 1939–45 wartime tricolor to 1992. A plain white-blue-red Pan-Slavic tricolor was used by Slovaks during the 1848 uprising and into the Czechoslovak era — visually similar to the modern flag minus the arms; decide if it's distinct enough." },
  { country: "Bosnia & Herzegovina", era: "medieval Kingdom", status: "to-verify",
    detail: "Could add the medieval Kingdom of Bosnia / Kotromanić banner before the 1946 SR entry. No Commons file found under the obvious names — needs a correct filename before it can be added." },
  { country: "France", era: "pre-1790 royal", status: "to-verify",
    candidate: "Pavillon_royal_de_la_France.svg",
    detail: "FR is well covered, but this white Bourbon royal banner (fleur-de-lis) could enrich the pre-revolution era. File confirmed to load — just deciding whether it adds enough over the existing 1589–1790 Kingdom entry." },
  { country: "Haiti", era: "1811–1820 Kingdom (Christophe)", status: "to-verify",
    detail: "In Haiti's split early years, Henri Christophe ruled a northern Kingdom of Haiti (1811–1820) with its own royal flag/standard, distinct from Pétion's southern republic. Couldn't find a Commons file under the obvious names — needs a correct filename before adding alongside the Second Empire entry." },
]
