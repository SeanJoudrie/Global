import { FLAGS } from "./flags"
import { FLAG_ATTRIBS } from "./flagAttribs"

// Symbol taxonomy for Symbol Hunt. The first four are hand-tagged (verified
// against the actual flag designs); the last two are derived from the existing
// structural attributes so they stay in sync. Codes are filtered to FLAGS.
const RAW: { id: string; label: string; emoji: string; codes: string[] }[] = [
  { id: "sun", label: "a Sun", emoji: "☀️", codes: ["AR", "UY", "KZ", "NE", "BD", "JP", "TW", "PH", "KG", "MK", "AG", "RW", "MW", "KI", "NP"] },
  { id: "bird", label: "a Bird", emoji: "🦅", codes: ["EG", "MX", "AL", "RS", "ME", "ZM", "ZW", "MD", "KZ", "UG", "PG", "KI", "DM", "GT"] },
  { id: "weapon", label: "a Weapon", emoji: "⚔️", codes: ["MZ", "KE", "SZ", "AO", "SA", "OM", "GT", "HT", "LK"] },
  { id: "plant", label: "a Plant or Tree", emoji: "🌿", codes: ["LB", "CA", "CY", "ER", "GQ", "BZ", "MX"] },
]

const CODES = new Set(FLAGS.map(f => f.code))
const attrCodes = (key: "cross" | "crescent") =>
  FLAGS.filter(f => FLAG_ATTRIBS[f.code]?.[key]).map(f => f.code)

export interface SymbolDef { id: string; label: string; emoji: string; codes: Set<string> }

export const SYMBOLS: SymbolDef[] = [
  ...RAW.map(s => ({ id: s.id, label: s.label, emoji: s.emoji, codes: new Set(s.codes.filter(c => CODES.has(c))) })),
  { id: "cross", label: "a Cross", emoji: "✚", codes: new Set(attrCodes("cross")) },
  { id: "crescent", label: "a Crescent", emoji: "☾", codes: new Set(attrCodes("crescent")) },
].filter(s => s.codes.size >= 5)
