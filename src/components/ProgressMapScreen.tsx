import { FLAGS, REGIONS } from "../data/flags"
import type { AppState } from "../utils/storage"

interface Props {
  state: AppState
  onBack: () => void
}

// EarthLogo landmass paths (viewBox 0 0 120 120), grouped by the app's flag regions.
const CONTINENTS: { region: string; paths: string[] }[] = [
  { region: "Americas", paths: [
    "M 22,33 Q 30,24 52,28 Q 58,33 56,44 Q 51,52 45,59 Q 41,66 37,73 Q 32,68 34,62 Q 29,55 25,46 Q 21,40 22,33 Z", // North America
    "M 26,20 Q 34,15 41,20 Q 42,27 33,27 Z",                                                                       // Greenland
    "M 37,71 Q 44,65 51,68 Q 54,80 51,92 Q 47,101 42,100 Q 35,97 32,84 Q 30,73 37,71 Z",                            // South America
  ]},
  { region: "Europe",      paths: ["M 60,25 Q 68,20 77,25 Q 80,32 74,38 Q 65,39 61,33 Z"] },
  { region: "Africa",      paths: ["M 56,42 Q 65,36 80,40 Q 85,53 83,70 Q 78,88 68,92 Q 58,92 53,80 Q 49,66 53,50 Z"] },
  { region: "Asia",        paths: ["M 78,27 Q 89,21 100,28 Q 103,37 97,44 Q 88,45 80,39 Q 76,34 78,27 Z"] },
  { region: "Middle East", paths: ["M 75,41 Q 81,43 81,49 Q 77,53 73,49 Q 71,44 75,41 Z"] },
]
// Oceania has no continent in the globe art — drawn as island dots in the lower-right ocean.
const OCEANIA_DOTS: [number, number, number][] = [[96, 74, 2.4], [101, 81, 1.8], [90, 86, 2.0]]

const REGION_META: Record<string, { emoji: string }> = {
  Europe: { emoji: "🏰" }, Africa: { emoji: "🦁" }, Asia: { emoji: "🐉" },
  Americas: { emoji: "🗽" }, Oceania: { emoji: "🌊" }, "Middle East": { emoji: "🕌" },
}

const Y = "251,191,36" // bright yellow (#FBBF24)

// A landmass is a faint ghost at 0% and a bright, glowing yellow at 100%.
function regionStyle(pct: number): React.CSSProperties {
  return {
    fill: `rgb(${Y})`,
    opacity: 0.1 + 0.9 * pct,
    filter: pct > 0.04 ? `drop-shadow(0 0 ${2 + 6 * pct}px rgba(${Y},${0.6 * pct}))` : "none",
    transition: "opacity 0.6s, filter 0.6s",
  }
}

export default function ProgressMapScreen({ state, onBack }: Props) {
  const learned = new Set(state.learnedFlags)
  const stats = REGIONS.map(region => {
    const inRegion = FLAGS.filter(f => f.region === region)
    const got = inRegion.filter(f => learned.has(f.code)).length
    return { region, total: inRegion.length, got, pct: inRegion.length ? got / inRegion.length : 0 }
  })
  const pctOf = (region: string) => stats.find(s => s.region === region)?.pct ?? 0
  const totalLit = state.learnedFlags.length
  const worldPct = FLAGS.length ? totalLit / FLAGS.length : 0
  const oceaniaPct = pctOf("Oceania")

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)", position: "relative", zIndex: 1 }}>
      <header className="flex items-center gap-3 px-5 pt-8 pb-2">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>‹</button>
        <div>
          <h1 className="text-xl font-black" style={{ color: "#F5F3FF" }}>Progress Map</h1>
          <div className="text-xs" style={{ color: "#B8A9E0" }}>Learn a flag and its region lights up — forever</div>
        </div>
      </header>

      {/* Globe */}
      <div className="flex flex-col items-center px-5 pt-2">
        <svg width={300} height={300} viewBox="0 0 120 120">
          <defs>
            <radialGradient id="ocean" cx="42%" cy="38%" r="70%">
              <stop offset="0%" stopColor="#10243f" />
              <stop offset="100%" stopColor="#06101f" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="46" fill="url(#ocean)" stroke="#1d3354" strokeWidth="1.5" />
          <g clipPath="url(#globeClip)">
            <clipPath id="globeClip"><circle cx="60" cy="60" r="46" /></clipPath>
            {CONTINENTS.map(c => c.paths.map((d, i) => (
              <path key={c.region + i} d={d} style={regionStyle(pctOf(c.region))} />
            )))}
            {OCEANIA_DOTS.map(([cx, cy, r], i) => (
              <circle key={"oc" + i} cx={cx} cy={cy} r={r} style={regionStyle(oceaniaPct)} />
            ))}
          </g>
          <circle cx="60" cy="60" r="46" fill="none" stroke="#FBBF2433" strokeWidth="0.8" />
        </svg>
        <div className="text-center -mt-2 mb-1">
          <span className="text-2xl font-black" style={{ color: "#FBBF24" }}>{totalLit}</span>
          <span className="text-sm" style={{ color: "#B8A9E0" }}> / {FLAGS.length} countries lit up</span>
        </div>
        <div className="text-xs mb-4" style={{ color: "#8B6CFF" }}>{Math.round(worldPct * 100)}% of the world</div>
      </div>

      {/* Region legend */}
      <div className="px-5 pb-10 space-y-2">
        {stats.slice().sort((a, b) => b.pct - a.pct).map(s => {
          const done = s.got === s.total
          return (
            <div key={s.region} className="px-4 py-2.5 rounded-xl" style={{ background: "#2D1F52", border: `1px solid ${done ? "#FBBF2455" : "#8B6CFF22"}` }}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span>{REGION_META[s.region]?.emoji ?? "🌐"}</span>
                  <span className="text-sm font-semibold" style={{ color: "#F5F3FF" }}>{s.region}</span>
                  {done && <span className="text-xs" style={{ color: "#FBBF24" }}>✨ lit</span>}
                </div>
                <span className="text-xs font-semibold" style={{ color: done ? "#FBBF24" : "#A78BFA" }}>{s.got} / {s.total}</span>
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "#1A1033" }}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${s.pct * 100}%`, background: "linear-gradient(90deg,#F59E0B,#FBBF24)", boxShadow: s.pct > 0 ? "0 0 8px #FBBF2466" : "none" }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
