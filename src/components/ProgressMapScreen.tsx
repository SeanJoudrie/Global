import worldMap from "@svg-maps/world"
import { FLAGS, REGIONS } from "../data/flags"
import type { AppState } from "../utils/storage"

interface Props {
  state: AppState
  onBack: () => void
}

const LIT = "#FBBF24"        // learned country
const UNLIT = "#2B2150"      // not yet learned
const OCEAN = "#0C1326"

export default function ProgressMapScreen({ state, onBack }: Props) {
  const learned = new Set(state.learnedFlags)
  const litCount = state.learnedFlags.length
  const worldPct = FLAGS.length ? litCount / FLAGS.length : 0

  const stats = REGIONS.map(region => {
    const inRegion = FLAGS.filter(f => f.region === region)
    const got = inRegion.filter(f => learned.has(f.code)).length
    return { region, total: inRegion.length, got, pct: inRegion.length ? got / inRegion.length : 0 }
  })

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)", position: "relative", zIndex: 1 }}>
      <header className="flex items-center gap-3 px-5 pt-8 pb-2">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>‹</button>
        <div>
          <h1 className="text-xl font-black" style={{ color: "#F5F3FF" }}>Progress Map</h1>
          <div className="text-xs" style={{ color: "#B8A9E0" }}>Learn a flag and its country lights up — forever</div>
        </div>
      </header>

      {/* Real world map — each learned country fills yellow */}
      <div className="px-4 pt-2">
        <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #8B6CFF33", background: OCEAN }}>
          <svg viewBox={worldMap.viewBox} width="100%" style={{ display: "block" }}>
            {/* base layer: every country unlit */}
            {worldMap.locations.map(loc => (
              <path key={loc.id} d={loc.path} fill={UNLIT} stroke={OCEAN} strokeWidth={0.4} />
            ))}
            {/* lit overlay: learned countries paint in one after another */}
            {(() => {
              let litIdx = 0
              return worldMap.locations.map(loc => {
                if (!learned.has(loc.id.toUpperCase())) return null
                const delay = Math.min(litIdx++ * 16, 1400)
                return (
                  <path
                    key={`lit-${loc.id}`}
                    d={loc.path}
                    fill={LIT}
                    stroke={OCEAN}
                    strokeWidth={0.4}
                    style={{
                      filter: "drop-shadow(0 0 1.2px rgba(251,191,36,0.9))",
                      animation: `paint-in 0.7s ease ${delay}ms both`,
                    }}
                  />
                )
              })
            })()}
          </svg>
        </div>
        <div className="text-center mt-3 mb-1">
          <span className="text-2xl font-black" style={{ color: LIT }}>{litCount}</span>
          <span className="text-sm" style={{ color: "#B8A9E0" }}> / {FLAGS.length} countries lit up</span>
        </div>
        <div className="text-center text-xs mb-4" style={{ color: "#8B6CFF" }}>{Math.round(worldPct * 100)}% of the world</div>
      </div>

      {/* Region progress */}
      <div className="px-5 pb-10 space-y-2">
        {stats.slice().sort((a, b) => b.pct - a.pct).map(s => {
          const done = s.got === s.total
          return (
            <div key={s.region} className="px-4 py-2.5 rounded-xl" style={{ background: "#2D1F52", border: `1px solid ${done ? "#FBBF2455" : "#8B6CFF22"}` }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold" style={{ color: "#F5F3FF" }}>
                  {s.region} {done && <span className="text-xs" style={{ color: LIT }}>✨ lit</span>}
                </span>
                <span className="text-xs font-semibold" style={{ color: done ? LIT : "#A78BFA" }}>{s.got} / {s.total}</span>
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
