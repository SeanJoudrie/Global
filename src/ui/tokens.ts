// Tactical Geo-Codex design tokens (shared by the dashboard shell + cards).
// Kept as plain values for the app's inline-style convention; the same palette
// lives in src/index.css as CSS custom properties.
export const T = {
  void: "#06080D",
  bg: "#0A0E16",
  surface: "#0E1421",
  surfaceHi: "#131C2B",
  line: "#1E2A3D",
  lineHi: "#2B3D58",
  text: "#E9EFF8",
  muted: "#7E8DA6",
  dim: "#4A5870",
  amber: "#F5A524",
  chartreuse: "#BEF23A",
  cyan: "#27D3DE",
  warm: "#FF6A45",
  gold: "#FBBF24",
  green: "#34D399",
} as const

export type AccentKey = "learn" | "play" | "codex" | "challenge" | "today"

// Electric accents are reserved strictly for interaction / progress / streaks.
export const ACCENT: Record<AccentKey, string> = {
  learn: T.cyan,
  play: T.chartreuse,
  codex: T.amber,
  challenge: T.warm,
  today: T.amber,
}

export const FONT = {
  display: "'Space Grotesk', 'Inter', sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
} as const

// translucent tint of an accent, for fills/borders
export const tint = (hex: string, alpha: number) => {
  const a = Math.round(alpha * 255).toString(16).padStart(2, "0")
  return `${hex}${a}`
}
