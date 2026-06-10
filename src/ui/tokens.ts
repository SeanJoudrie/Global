// Two switchable shell aesthetics. The colour *theme* system (8 palettes in
// SettingsScreen) is orthogonal and untouched — this only governs the dashboard
// shell skin. Changing aesthetic reloads the app, so reading once at module
// load is correct and avoids threading context everywhere.
// "original" = the pre-redesign HomeScreen layout (purple list + emoji), kept
// as a switchable option. cartographer/tactical use the new tab dashboard.
export type Aesthetic = "cartographer" | "tactical" | "original"
const KEY = "globalio_aesthetic"

export function loadAesthetic(): Aesthetic {
  if (typeof localStorage === "undefined") return "cartographer"
  const v = localStorage.getItem(KEY)
  return v === "tactical" || v === "original" ? v : "cartographer"
}
export function saveAesthetic(a: Aesthetic) {
  try { localStorage.setItem(KEY, a) } catch { /* ignore */ }
}

export const AESTHETIC: Aesthetic = loadAesthetic()

interface Palette {
  void: string; bg: string; surface: string; surfaceHi: string
  line: string; lineHi: string
  text: string; muted: string; dim: string
  amber: string; chartreuse: string; cyan: string; warm: string; gold: string; green: string
}

// "Tactical Geo-Codex" — deep charcoal/navy, electric accents.
const TACTICAL: Palette = {
  void: "#06080D", bg: "#0A0E16", surface: "#0E1421", surfaceHi: "#131C2B",
  line: "#1E2A3D", lineHi: "#2B3D58",
  text: "#E9EFF8", muted: "#7E8DA6", dim: "#4A5870",
  amber: "#F5A524", chartreuse: "#BEF23A", cyan: "#27D3DE", warm: "#FF6A45", gold: "#FBBF24", green: "#34D399",
}

// "Modern Cartographer" — warm parchment paper, midnight-teal ink, muted
// watercolour accents (terracotta / sky blue / ochre). Token *names* are reused
// so component code is aesthetic-agnostic.
const CARTOGRAPHER: Palette = {
  void: "#EFE3C8", bg: "#FBF4E4", surface: "#FFFCF4", surfaceHi: "#FCF6E7",
  line: "#DDCEAF", lineHi: "#C8B58C",
  text: "#1F3A3C", muted: "#5F726D", dim: "#A09074",
  amber: "#C0883A", chartreuse: "#C2735A" /* play=terracotta */, cyan: "#5C8CA8" /* learn=sky */,
  warm: "#A85440" /* challenge=clay */, gold: "#C0883A", green: "#5C8A6B",
}

export const T: Palette = AESTHETIC === "tactical" ? TACTICAL : CARTOGRAPHER

export type AccentKey = "learn" | "play" | "codex" | "challenge" | "today"

// Electric/watercolour accents reserved strictly for interaction & progress.
export const ACCENT: Record<AccentKey, string> = {
  learn: T.cyan,
  play: T.chartreuse,
  codex: T.amber,
  challenge: T.warm,
  today: T.amber,
}

export const FONT = AESTHETIC === "tactical"
  ? { display: "'Space Grotesk', 'Inter', sans-serif", mono: "'JetBrains Mono', ui-monospace, monospace" }
  : { display: "'Playfair Display', Georgia, serif", mono: "'Inter', system-ui, sans-serif" }

export const IS_CARTO = AESTHETIC === "cartographer"

// translucent tint of an accent, for fills/borders
export const tint = (hex: string, alpha: number) => {
  const a = Math.round(alpha * 255).toString(16).padStart(2, "0")
  return `${hex}${a}`
}
