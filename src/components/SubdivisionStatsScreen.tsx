import { useState } from "react"
import { SUB_CONTINENTS, SUB_FLAGS, countriesWithSubs } from "../data/subdivisions"
import type { AppState } from "../utils/storage"

interface Props { state: AppState; onBack: () => void }

export default function SubdivisionStatsScreen({ state, onBack }: Props) {
  const [continent, setContinent] = useState<string | null>(null)
  const learned = new Set(state.learnedSubs)
  const learnedInCountry = (code: string) =>
    SUB_FLAGS.filter(s => s.countryCode === code && learned.has(s.code)).length

  // ── Continent list ─────────────────────────────────────────────────────────
  if (!continent) {
    const contStat = SUB_CONTINENTS.map(c => {
      const subs = SUB_FLAGS.filter(s => s.continent === c.name)
      const got = subs.filter(s => learned.has(s.code)).length
      return { ...c, total: subs.length, got }
    }).filter(c => c.total > 0)
    const totalGot = state.learnedSubs.length
    const totalAll = SUB_FLAGS.length

    return (
      <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <header className="flex items-center gap-3 px-5 pt-8 pb-2">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl" style={{ background: "#2D1F52", color: "#B8A9E0" }}>‹</button>
          <div>
            <h1 className="text-xl font-black" style={{ color: "#F5F3FF" }}>Subdivision Stats</h1>
            <div className="text-xs" style={{ color: "#B8A9E0" }}>{totalGot} / {totalAll} subdivision flags learned</div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-10 space-y-2.5">
          {contStat.map(c => {
            const pct = c.total ? c.got / c.total : 0
            return (
              <button key={c.id} onClick={() => setContinent(c.name)}
                className="w-full px-4 py-3.5 rounded-2xl transition-all active:scale-[0.98] text-left"
                style={{ background: "#2D1F52", border: "1px solid #8B6CFF33" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold" style={{ color: "#F5F3FF" }}>{c.emoji} {c.name}</span>
                  <span className="text-xs font-semibold" style={{ color: "#A78BFA" }}>{c.got} / {c.total} ›</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#1A1033" }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct * 100}%`, background: "linear-gradient(90deg,#8B6CFF,#34D399)" }} />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // ── Country bar graph for a continent ────────────────────────────────────────
  const countries = countriesWithSubs(continent)
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
      <header className="flex items-center gap-3 px-5 pt-8 pb-2">
        <button onClick={() => setContinent(null)} className="w-9 h-9 flex items-center justify-center rounded-full text-xl" style={{ background: "#2D1F52", color: "#B8A9E0" }}>‹</button>
        <div>
          <h1 className="text-xl font-black" style={{ color: "#F5F3FF" }}>{continent}</h1>
          <div className="text-xs" style={{ color: "#B8A9E0" }}>subdivision completion by country</div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-10 space-y-2">
        {countries.map(c => {
          const got = learnedInCountry(c.code)
          const pct = c.total ? got / c.total : 0
          const full = got === c.total
          return (
            <div key={c.code} className="px-4 py-2.5 rounded-xl" style={{ background: "#2D1F52", border: `1px solid ${full ? "#34D39955" : "#8B6CFF22"}` }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold" style={{ color: "#F5F3FF" }}>
                  {c.emoji} {c.name} {full && <span className="text-xs" style={{ color: "#34D399" }}>✓</span>}
                </span>
                <span className="text-xs font-semibold" style={{ color: full ? "#34D399" : "#A78BFA" }}>{got} / {c.total}</span>
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "#1A1033" }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct * 100}%`, background: full ? "#34D399" : "linear-gradient(90deg,#8B6CFF,#A78BFA)" }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
