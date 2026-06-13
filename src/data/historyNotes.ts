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

  // ── Asia deep pass: pre-modern states lacking a clean flag image ──
  { country: "Myanmar", era: "Konbaung dynasty (peacock)", status: "to-verify",
    detail: "The Konbaung dynasty (and earlier Toungoo/Pagan Burmese kingdoms) flew a green peacock banner, but no clean Commons SVG turns up under the obvious names. Worth adding before the 1939 British Burma entry once a file is confirmed." },
  { country: "Brunei", era: "Bruneian Empire (pre-1906)", status: "to-verify",
    detail: "The Bruneian Empire was a major maritime power across Borneo for centuries, flying a plain yellow sultan's banner, but no distinct Commons flag file exists separate from the modern Brunei flag. Needs a verified image." },
  { country: "Mongolia", era: "Mongol Empire (Genghis Khan)", status: "ambiguous",
    detail: "The Mongol Empire used the white/black horsehair tug (sulde) standard rather than a cloth flag, and there's no agreed flag image. Probably best represented as a note rather than a flag entry." },
  { country: "Indonesia", era: "Majapahit Empire (1293–1527)", status: "to-verify",
    detail: "Majapahit — whose red-and-white 'Gula Kelapa' is the cited origin of Indonesia's flag — has only its Surya Majapahit sun emblem on Commons, not a clean nine-stripe banner SVG. ID already carries the Gowa & Tidore sultanates; add Majapahit if a flag file is found." },
  { country: "Malaysia", era: "Malacca Sultanate / British Malaya", status: "to-verify",
    detail: "MY jumps from the 1950 Federation of Malaya. Could add British Malaya / the Straits Settlements, and further back the Malacca Sultanate (a major 15th-c. Malay empire) — but the Sultanate's flag is uncertain/attributed; verify before adding." },
  { country: "Vietnam", era: "pre-Nguyen dynasties", status: "ambiguous",
    detail: "VN history bottoms out at the Nguyen Dynasty (1802). Earlier Vietnamese dynasties (Lê, Trần, Lý) had no national flag in the modern sense and no reliable flag images — the 1802 Long-tinh-kỳ is genuinely the earliest documented Vietnamese flag." },
]
