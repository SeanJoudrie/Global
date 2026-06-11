import { seededRandom } from "../utils/prng"

// ── Synthetic "bot" flags ────────────────────────────────────────────────────
// 50 fixed, procedurally-drawn flags that look like real national flags (same
// flat-vector style) but belong to no country. Every layout carries a
// structural feature (cross, canton, disc, star, triangle, bend) so none is a
// plain tricolor that could collide with a real flag. Rendered as inline SVG
// data URIs so they sit in an <img> exactly like the real flags do.

const FIELD = ["#CE1126", "#003893", "#007A3D", "#002868", "#0055A4", "#21468B", "#006233", "#D80027", "#141414", "#6D071A", "#C8102E", "#00247D", "#1C3F94", "#046A38"]
const LIGHT = ["#FFFFFF", "#FCD116", "#FFD100", "#F1BF00", "#EEEEEE", "#FFCD00"]
const ACCENT = ["#CE1126", "#FCD116", "#FFFFFF", "#007A3D", "#003893", "#000000", "#FF6600", "#0055A4"]

function pick<T>(arr: T[], r: () => number): T { return arr[Math.floor(r() * arr.length)] }
function distinct<T>(arr: T[], r: () => number, not: T): T { let v = pick(arr, r); let i = 0; while (v === not && i++ < 8) v = pick(arr, r); return v }

function starPts(cx: number, cy: number, R: number): string {
  const p: string[] = []
  for (let i = 0; i < 10; i++) {
    const ang = -Math.PI / 2 + (i * Math.PI) / 5
    const r = i % 2 ? R * 0.4 : R
    p.push(`${(cx + r * Math.cos(ang)).toFixed(1)},${(cy + r * Math.sin(ang)).toFixed(1)}`)
  }
  return p.join(" ")
}

function build(seed: string): string {
  const r = seededRandom(seed)
  const field = pick(FIELD, r)
  const light = pick(LIGHT, r)
  const accent = distinct(ACCENT, r, field)
  const layout = Math.floor(r() * 7)
  let inner = ""

  if (layout === 0) {
    // Nordic-style offset cross
    const cross = r() > 0.5 ? light : accent
    inner = `<rect width='60' height='40' fill='${field}'/><rect x='17' width='8' height='40' fill='${cross}'/><rect y='16' width='60' height='8' fill='${cross}'/>`
  } else if (layout === 1) {
    // Canton with star over horizontal bands
    const c2 = distinct(FIELD, r, field)
    inner = `<rect width='60' height='40' fill='${field}'/>`
    for (let i = 1; i < 5; i += 2) inner += `<rect y='${i * 8}' width='60' height='8' fill='${c2}'/>`
    inner += `<rect width='28' height='24' fill='${pick(FIELD, r)}'/><polygon points='${starPts(14, 12, 7)}' fill='${light}'/>`
  } else if (layout === 2) {
    // Bicolor field + central disc
    const c2 = distinct(FIELD, r, field)
    inner = `<rect width='60' height='20' fill='${field}'/><rect y='20' width='60' height='20' fill='${c2}'/><circle cx='30' cy='20' r='9' fill='${light}'/>`
  } else if (layout === 3) {
    // Solid field + big central star
    inner = `<rect width='60' height='40' fill='${field}'/><polygon points='${starPts(30, 20, 11)}' fill='${light}'/>`
  } else if (layout === 4) {
    // Diagonal bend
    const c2 = distinct(FIELD, r, field)
    inner = `<rect width='60' height='40' fill='${field}'/><polygon points='0,40 60,0 60,12 16,40' fill='${c2}'/><polygon points='0,40 0,28 44,0 60,0' fill='${field}'/><polygon points='0,40 60,0 60,12 16,40' fill='${accent}' opacity='0.0'/>`
  } else if (layout === 5) {
    // Vertical bands + centred emblem (disc)
    const a = field, b = light, c = distinct(FIELD, r, field)
    inner = `<rect width='60' height='40' fill='${a}'/><rect x='20' width='20' height='40' fill='${b}'/><rect x='40' width='20' height='40' fill='${c}'/><circle cx='30' cy='20' r='7' fill='${accent}'/>`
  } else {
    // Hoist triangle with star over two bands
    const c2 = distinct(FIELD, r, field)
    inner = `<rect width='60' height='20' fill='${field}'/><rect y='20' width='60' height='20' fill='${c2}'/><polygon points='0,0 26,20 0,40' fill='${pick(FIELD, r)}'/><polygon points='${starPts(8, 20, 5)}' fill='${light}'/>`
  }

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 40' preserveAspectRatio='none'>${inner}</svg>`
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg)
}

export const BOT_FLAGS: string[] = Array.from({ length: 84 }, (_, i) => build("botflag-" + i))
