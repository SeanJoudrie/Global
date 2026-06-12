// ── 2026 FIFA World Cup — the 48-team field ──────────────────────────────────
// The tournament (USA · Canada · Mexico, June–July 2026) expands to 48 teams.
// The three hosts qualify automatically; the rest of the field below is the
// realistic line-up of likely / traditional qualifiers, grouped by
// confederation. Real-world qualification is still finishing, so the
// non-host entries are the projected field — swap any code here once the
// official bracket is locked. Each is an ISO-3166 alpha-2 code so flags,
// Codex summaries and historical flags all resolve from data we already ship.

export interface WorldCupTeam {
  code: string
  /** Auto-qualified host nation. */
  host?: boolean
  /** FIFA confederation, for grouping the explorer. */
  conf: "Hosts" | "UEFA" | "CONMEBOL" | "CAF" | "AFC" | "CONCACAF" | "OFC"
}

export const WORLD_CUP_2026: WorldCupTeam[] = [
  // Hosts (automatic)
  { code: "US", host: true, conf: "Hosts" },
  { code: "CA", host: true, conf: "Hosts" },
  { code: "MX", host: true, conf: "Hosts" },

  // UEFA (Europe)
  { code: "FR", conf: "UEFA" },
  { code: "ES", conf: "UEFA" },
  { code: "GB", conf: "UEFA" }, // England (FIFA: ENG; flag falls back to GB)
  { code: "DE", conf: "UEFA" },
  { code: "PT", conf: "UEFA" },
  { code: "IT", conf: "UEFA" },
  { code: "NL", conf: "UEFA" },
  { code: "BE", conf: "UEFA" },
  { code: "HR", conf: "UEFA" },
  { code: "DK", conf: "UEFA" },
  { code: "CH", conf: "UEFA" },
  { code: "RS", conf: "UEFA" },
  { code: "AT", conf: "UEFA" },
  { code: "PL", conf: "UEFA" },
  { code: "TR", conf: "UEFA" },
  { code: "NO", conf: "UEFA" },

  // CONMEBOL (South America)
  { code: "BR", conf: "CONMEBOL" },
  { code: "AR", conf: "CONMEBOL" },
  { code: "UY", conf: "CONMEBOL" },
  { code: "CO", conf: "CONMEBOL" },
  { code: "EC", conf: "CONMEBOL" },
  { code: "PY", conf: "CONMEBOL" },

  // CAF (Africa)
  { code: "MA", conf: "CAF" },
  { code: "SN", conf: "CAF" },
  { code: "EG", conf: "CAF" },
  { code: "NG", conf: "CAF" },
  { code: "CM", conf: "CAF" },
  { code: "CI", conf: "CAF" },
  { code: "DZ", conf: "CAF" },
  { code: "GH", conf: "CAF" },
  { code: "TN", conf: "CAF" },

  // AFC (Asia)
  { code: "JP", conf: "AFC" },
  { code: "KR", conf: "AFC" },
  { code: "IR", conf: "AFC" },
  { code: "AU", conf: "AFC" },
  { code: "SA", conf: "AFC" },
  { code: "QA", conf: "AFC" },
  { code: "UZ", conf: "AFC" },
  { code: "IQ", conf: "AFC" },
  { code: "JO", conf: "AFC" },

  // CONCACAF (North/Central America & Caribbean) — beyond the hosts
  { code: "CR", conf: "CONCACAF" },
  { code: "PA", conf: "CONCACAF" },
  { code: "JM", conf: "CONCACAF" },
  { code: "HN", conf: "CONCACAF" },

  // OFC (Oceania)
  { code: "NZ", conf: "OFC" },
]

/** Display name override where the FIFA team name differs from the flag's
 *  country name (England flies the UK flag in our set, etc.). */
export const WC_NAME_OVERRIDE: Record<string, string> = {
  GB: "England",
}
