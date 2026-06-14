import { seededRandom } from "../utils/prng"

// ── Synthetic "bot" flags ────────────────────────────────────────────────────
// 120 fixed, procedurally-drawn flags that look like real national flags (same
// flat-vector style) but belong to no country. Every layout carries a
// structural feature (cross, saltire, canton, disc, star, triangle, bend,
// pale) so none is a plain tricolor that could collide with a real flag, and
// every pair of touching colours must clear a minimum contrast — real flags
// never put navy on navy. Rendered as inline SVG data URIs so they sit in an
// <img> exactly like the real flags do.

const FIELD = ["#CE1126", "#003893", "#007A3D", "#002868", "#0055A4", "#21468B", "#006233", "#D80027", "#141414", "#6D071A", "#C8102E", "#00247D", "#1C3F94", "#046A38", "#012169", "#00966E", "#7B1113", "#1B5E20", "#E70013", "#0A3161"]
const LIGHT = ["#FFFFFF", "#FCD116", "#FFD100", "#F1BF00", "#EEEEEE", "#FFCD00", "#FFC400", "#F7F7F7"]
const ACCENT = ["#CE1126", "#FCD116", "#FFFFFF", "#007A3D", "#003893", "#000000", "#FF6600", "#0055A4", "#00966E", "#E70013"]

function pick<T>(arr: T[], r: () => number): T { return arr[Math.floor(r() * arr.length)] }

// Real flags want contrast between touching colours — no navy-on-navy. A pick
// must sit a minimum RGB distance from every colour it borders, otherwise the
// fake reads as obviously wrong (dark blue bands on dark blue field, etc.).
function rgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]
}
function dist(a: string, b: string): number {
  const [r1, g1, b1] = rgb(a), [r2, g2, b2] = rgb(b)
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)
}
const MIN_CONTRAST = 105
function apart(arr: string[], r: () => number, ...avoid: string[]): string {
  for (let i = 0; i < 14; i++) {
    const v = pick(arr, r)
    if (avoid.every(a => dist(v, a) >= MIN_CONTRAST)) return v
  }
  // Fall back to the farthest available colour rather than a bad neighbour.
  return arr.reduce((best, v) =>
    Math.min(...avoid.map(a => dist(v, a))) > Math.min(...avoid.map(a => dist(best, a))) ? v : best)
}

function starPts(cx: number, cy: number, R: number): string {
  const p: string[] = []
  for (let i = 0; i < 10; i++) {
    const ang = -Math.PI / 2 + (i * Math.PI) / 5
    const r = i % 2 ? R * 0.4 : R
    p.push(`${(cx + r * Math.cos(ang)).toFixed(1)},${(cy + r * Math.sin(ang)).toFixed(1)}`)
  }
  return p.join(" ")
}

// A crescent opening to the right: a filled disc with the background colour
// carved out of it by an offset disc. Must sit over a SOLID region (the carve
// disc is painted in the background colour).
function crescent(cx: number, cy: number, R: number, color: string, bg: string): string {
  return `<circle cx='${cx}' cy='${cy}' r='${R}' fill='${color}'/><circle cx='${(cx + R * 0.4).toFixed(1)}' cy='${cy}' r='${(R * 0.82).toFixed(1)}' fill='${bg}'/>`
}

// A sun: a central disc with triangular rays radiating out.
function sun(cx: number, cy: number, R: number, color: string): string {
  let s = ""
  const rays = 16
  for (let i = 0; i < rays; i++) {
    const a = (i * 2 * Math.PI) / rays
    const tip = `${(cx + Math.cos(a) * R * 1.85).toFixed(1)},${(cy + Math.sin(a) * R * 1.85).toFixed(1)}`
    const b1 = `${(cx + Math.cos(a - 0.14) * R).toFixed(1)},${(cy + Math.sin(a - 0.14) * R).toFixed(1)}`
    const b2 = `${(cx + Math.cos(a + 0.14) * R).toFixed(1)},${(cy + Math.sin(a + 0.14) * R).toFixed(1)}`
    s += `<polygon points='${tip} ${b1} ${b2}' fill='${color}'/>`
  }
  return s + `<circle cx='${cx}' cy='${cy}' r='${R}' fill='${color}'/>`
}

// A ring of small stars (EU-style).
function ringStars(cx: number, cy: number, R: number, n: number, color: string, size: number): string {
  let s = ""
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n
    s += `<polygon points='${starPts(cx + Math.cos(a) * R, cy + Math.sin(a) * R, size)}' fill='${color}'/>`
  }
  return s
}

// A simple escutcheon (shield) with an inner mark.
function shield(cx: number, cy: number, w: number, h: number, fill: string, mark: string): string {
  const path = `M${cx - w},${cy - h} L${cx + w},${cy - h} L${cx + w},${(cy + h * 0.25).toFixed(1)} Q${cx + w},${cy + h} ${cx},${cy + h} Q${cx - w},${cy + h} ${cx - w},${(cy + h * 0.25).toFixed(1)} Z`
  return `<path d='${path}' fill='${fill}' stroke='${mark}' stroke-width='1'/><polygon points='${starPts(cx, cy, w * 0.5)}' fill='${mark}'/>`
}

function build(seed: string): string {
  const r = seededRandom(seed)
  const field = pick(FIELD, r)
  const light = apart(LIGHT, r, field)
  const layout = Math.floor(r() * 19)
  let inner = ""

  if (layout === 0) {
    // Nordic-style offset cross
    const cross = r() > 0.5 ? light : apart(ACCENT, r, field)
    inner = `<rect width='60' height='40' fill='${field}'/><rect x='17' width='8' height='40' fill='${cross}'/><rect y='16' width='60' height='8' fill='${cross}'/>`
  } else if (layout === 1) {
    // Canton with star over horizontal bands
    const c2 = apart(FIELD, r, field)
    const canton = apart(FIELD, r, field, c2)
    inner = `<rect width='60' height='40' fill='${field}'/>`
    for (let i = 1; i < 5; i += 2) inner += `<rect y='${i * 8}' width='60' height='8' fill='${c2}'/>`
    inner += `<rect width='28' height='24' fill='${canton}'/><polygon points='${starPts(14, 12, 7)}' fill='${apart(LIGHT, r, canton)}'/>`
  } else if (layout === 2) {
    // Bicolor field + central disc
    const c2 = apart(FIELD, r, field)
    inner = `<rect width='60' height='20' fill='${field}'/><rect y='20' width='60' height='20' fill='${c2}'/><circle cx='30' cy='20' r='9' fill='${apart(LIGHT, r, field, c2)}'/>`
  } else if (layout === 3) {
    // Solid field + big central star
    inner = `<rect width='60' height='40' fill='${field}'/><polygon points='${starPts(30, 20, 11)}' fill='${light}'/>`
  } else if (layout === 4) {
    // Diagonal bend
    const c2 = apart(FIELD, r, field)
    inner = `<rect width='60' height='40' fill='${field}'/><polygon points='0,40 60,0 60,12 16,40' fill='${c2}'/><polygon points='0,40 0,28 44,0 60,0' fill='${field}'/>`
  } else if (layout === 5) {
    // Vertical bands + centred emblem (disc)
    const c = apart(FIELD, r, field, light)
    inner = `<rect width='60' height='40' fill='${field}'/><rect x='20' width='20' height='40' fill='${light}'/><rect x='40' width='20' height='40' fill='${c}'/><circle cx='30' cy='20' r='7' fill='${apart(ACCENT, r, light)}'/>`
  } else if (layout === 6) {
    // Hoist triangle with star over two bands
    const c2 = apart(FIELD, r, field)
    const tri = apart(FIELD, r, field, c2)
    inner = `<rect width='60' height='20' fill='${field}'/><rect y='20' width='60' height='20' fill='${c2}'/><polygon points='0,0 26,20 0,40' fill='${tri}'/><polygon points='${starPts(8, 20, 5)}' fill='${apart(LIGHT, r, tri)}'/>`
  } else if (layout === 7) {
    // Saltire (diagonal cross)
    const cross = r() > 0.4 ? light : apart(ACCENT, r, field)
    inner = `<rect width='60' height='40' fill='${field}'/>` +
      `<polygon points='0,0 8,0 60,34 60,40 52,40 0,6' fill='${cross}'/>` +
      `<polygon points='60,0 60,6 8,40 0,40 0,34 52,0' fill='${cross}'/>`
  } else if (layout === 8) {
    // Horizontal bicolor + hoist pale with a column of stars
    const c2 = apart(FIELD, r, field)
    const pale = apart(FIELD, r, field, c2)
    const star = apart(LIGHT, r, pale)
    inner = `<rect width='60' height='20' fill='${field}'/><rect y='20' width='60' height='20' fill='${c2}'/><rect width='14' height='40' fill='${pale}'/>` +
      [10, 20, 30].map(cy => `<polygon points='${starPts(7, cy, 3.4)}' fill='${star}'/>`).join("")
  } else if (layout === 9) {
    // Crescent & star on a solid field (Islamic-style)
    const em = apart(LIGHT, r, field)
    inner = `<rect width='60' height='40' fill='${field}'/>` + crescent(27, 20, 10, em, field) +
      `<polygon points='${starPts(40, 20, 4.5)}' fill='${em}'/>`
  } else if (layout === 10) {
    // Vertical tricolor + central star
    const c2 = apart(FIELD, r, field)
    inner = `<rect width='20' height='40' fill='${field}'/><rect x='20' width='20' height='40' fill='${light}'/><rect x='40' width='20' height='40' fill='${c2}'/>` +
      `<polygon points='${starPts(30, 20, 8)}' fill='${apart(ACCENT, r, light)}'/>`
  } else if (layout === 11) {
    // Sun with rays over a horizontal bicolor
    const c2 = apart(FIELD, r, field)
    inner = `<rect width='60' height='40' fill='${field}'/><rect y='20' width='60' height='20' fill='${c2}'/>` + sun(30, 20, 5, apart(LIGHT, r, field, c2))
  } else if (layout === 12) {
    // Ring of stars on a solid field
    inner = `<rect width='60' height='40' fill='${field}'/>` + ringStars(30, 20, 12, 12, apart(LIGHT, r, field), 2.3)
  } else if (layout === 13) {
    // Horizontal triband + a small shield
    const c2 = apart(FIELD, r, field)
    const c3 = apart(FIELD, r, field, c2)
    inner = `<rect width='60' height='13.3' fill='${field}'/><rect y='13.3' width='60' height='13.4' fill='${c2}'/><rect y='26.7' width='60' height='13.3' fill='${c3}'/>` +
      shield(30, 20, 6.5, 8, apart(LIGHT, r, c2), apart(ACCENT, r, field, c2, c3))
  } else if (layout === 14) {
    // Many stripes + a canton of stars (ensign-style)
    const stripe = apart(LIGHT, r, field)
    inner = `<rect width='60' height='40' fill='${field}'/>`
    for (let i = 1; i < 8; i += 2) inner += `<rect y='${i * 5}' width='60' height='5' fill='${stripe}'/>`
    const canton = apart(FIELD, r, field, stripe)
    const sc = apart(LIGHT, r, canton)
    inner += `<rect width='26' height='20' fill='${canton}'/>`
    for (let row = 0; row < 2; row++) for (let col = 0; col < 3; col++)
      inner += `<polygon points='${starPts(7 + col * 6, 6 + row * 8, 2.2)}' fill='${sc}'/>`
  } else if (layout === 15) {
    // Quartered field with a central disc
    const c2 = apart(FIELD, r, field)
    inner = `<rect width='30' height='20' fill='${field}'/><rect x='30' width='30' height='20' fill='${c2}'/>` +
      `<rect y='20' width='30' height='20' fill='${c2}'/><rect x='30' y='20' width='30' height='20' fill='${field}'/>` +
      `<circle cx='30' cy='20' r='7' fill='${apart(LIGHT, r, field, c2)}'/>`
  } else if (layout === 16) {
    // Diagonal stripe (hoist-bottom to fly-top) with a star
    const band = apart(LIGHT, r, field)
    inner = `<rect width='60' height='40' fill='${field}'/>` +
      `<polygon points='0,40 20,40 60,13 60,0 40,0 0,27' fill='${band}'/>` +
      `<polygon points='${starPts(30, 20, 5)}' fill='${apart(ACCENT, r, band)}'/>`
  } else if (layout === 17) {
    // Off-centre hoist crescent on a solid field
    inner = `<rect width='60' height='40' fill='${field}'/>` + crescent(21, 20, 11, apart(LIGHT, r, field), field)
  } else {
    // Chevron pointing from the hoist over a horizontal bicolor
    const c2 = apart(FIELD, r, field)
    const chev = apart(ACCENT, r, field, c2)
    inner = `<rect width='60' height='20' fill='${field}'/><rect y='20' width='60' height='20' fill='${c2}'/>` +
      `<polygon points='0,0 14,0 44,20 14,40 0,40 30,20' fill='${chev}'/>`
  }

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 40' preserveAspectRatio='none'>${inner}</svg>`
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg)
}

export const BOT_FLAGS: string[] = Array.from({ length: 260 }, (_, i) => build("botflag-" + i))
