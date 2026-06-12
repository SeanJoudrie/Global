// ── 2026 FIFA World Cup — the qualified 48-team field ────────────────────────
// The tournament (USA · Canada · Mexico, June–July 2026) expands to 48 teams.
// This is the real qualified field grouped by confederation. Codes are mostly
// ISO-3166 alpha-2 so flags, Codex summaries and historical flags resolve from
// data we already ship; England and Scotland use their self-hosted constituent
// flags (gb-eng / gb-sct) and Curaçao uses cw, none of which are sovereign
// Codex entries — their names and descriptions are supplied below.

export interface WorldCupTeam {
  code: string
  host?: boolean
  conf: "Hosts" | "UEFA" | "CONMEBOL" | "CAF" | "AFC" | "CONCACAF" | "OFC"
}

export const WORLD_CUP_2026: WorldCupTeam[] = [
  // Hosts (automatic)
  { code: "CA", host: true, conf: "Hosts" },
  { code: "MX", host: true, conf: "Hosts" },
  { code: "US", host: true, conf: "Hosts" },

  // UEFA (16)
  { code: "gb-eng", conf: "UEFA" },
  { code: "FR", conf: "UEFA" },
  { code: "HR", conf: "UEFA" },
  { code: "PT", conf: "UEFA" },
  { code: "NO", conf: "UEFA" },
  { code: "DE", conf: "UEFA" },
  { code: "NL", conf: "UEFA" },
  { code: "CH", conf: "UEFA" },
  { code: "gb-sct", conf: "UEFA" },
  { code: "ES", conf: "UEFA" },
  { code: "AT", conf: "UEFA" },
  { code: "BE", conf: "UEFA" },
  { code: "BA", conf: "UEFA" },
  { code: "SE", conf: "UEFA" },
  { code: "TR", conf: "UEFA" },
  { code: "CZ", conf: "UEFA" },

  // CONMEBOL (6)
  { code: "AR", conf: "CONMEBOL" },
  { code: "BR", conf: "CONMEBOL" },
  { code: "EC", conf: "CONMEBOL" },
  { code: "PY", conf: "CONMEBOL" },
  { code: "UY", conf: "CONMEBOL" },
  { code: "CO", conf: "CONMEBOL" },

  // CAF (10)
  { code: "MA", conf: "CAF" },
  { code: "TN", conf: "CAF" },
  { code: "EG", conf: "CAF" },
  { code: "DZ", conf: "CAF" },
  { code: "GH", conf: "CAF" },
  { code: "CV", conf: "CAF" },
  { code: "SN", conf: "CAF" },
  { code: "ZA", conf: "CAF" },
  { code: "CI", conf: "CAF" },
  { code: "CD", conf: "CAF" },

  // AFC (9)
  { code: "JP", conf: "AFC" },
  { code: "IR", conf: "AFC" },
  { code: "UZ", conf: "AFC" },
  { code: "JO", conf: "AFC" },
  { code: "KR", conf: "AFC" },
  { code: "AU", conf: "AFC" },
  { code: "QA", conf: "AFC" },
  { code: "SA", conf: "AFC" },
  { code: "IQ", conf: "AFC" },

  // CONCACAF (beyond the hosts)
  { code: "PA", conf: "CONCACAF" },
  { code: "CW", conf: "CONCACAF" },
  { code: "HT", conf: "CONCACAF" },

  // OFC (1)
  { code: "NZ", conf: "OFC" },
]

/** Display names for teams whose flag code isn't a sovereign-state entry. */
export const WC_NAME_OVERRIDE: Record<string, string> = {
  "gb-eng": "England",
  "gb-sct": "Scotland",
  CW: "Curaçao",
}

/** Descriptions for the three teams without a Codex summary. */
export const WC_BLURB: Record<string, string> = {
  "gb-eng": "England is the largest nation of the United Kingdom and the birthplace of modern football, codifying the game's first laws in 1863. The Three Lions' sole World Cup triumph came on home soil in 1966, and they remain one of the sport's most-watched sides.",
  "gb-sct": "Scotland, the northern nation of the United Kingdom, is famed for its highlands, lochs and tartan heritage. Its football team is one of the oldest in the world, having contested the very first international match in 1872 — and reaches the 2026 finals after a long absence.",
  CW: "Curaçao is a Dutch Caribbean island off the coast of Venezuela, known for the pastel waterfront of UNESCO-listed Willemstad, its coral reefs and the namesake blue liqueur. The 2026 World Cup is its first ever — among the smallest nations by population to qualify.",
}
