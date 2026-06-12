import { useState } from "react"
import { SUB_CONTINENTS, SUB_FLAGS, countriesWithSubs } from "../data/subdivisions"
import type { AppState } from "../utils/storage"
import { T, ACCENT, FONT, tint } from "../ui/tokens"
import { ScreenHeader } from "./ui"

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
      <div className="min-h-screen flex flex-col" style={{ background: T.bg, color: T.text }}>
        <ScreenHeader title="Subdivision Stats" subtitle={`${totalGot} / ${totalAll} subdivision flags learned`} onBack={onBack} />
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-10 space-y-2.5">
          {contStat.map(c => {
            const pct = c.total ? c.got / c.total : 0
            return (
              <button key={c.id} onClick={() => setContinent(c.name)}
                className="geo-tap w-full px-4 py-3.5 rounded-2xl transition-all active:scale-[0.98] text-left"
                style={{ background: T.surface, border: `1px solid ${T.line}` }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="geo-display font-bold" style={{ color: T.text }}>{c.emoji} {c.name}</span>
                  <span className="text-xs font-semibold" style={{ color: ACCENT.codex, fontFamily: FONT.mono, fontVariantNumeric: "tabular-nums" }}>{c.got} / {c.total} ›</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: T.line }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct * 100}%`, background: ACCENT.codex }} />
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
    <div className="min-h-screen flex flex-col" style={{ background: T.bg, color: T.text }}>
      <ScreenHeader title={continent} subtitle="subdivision completion by country" onBack={() => setContinent(null)} />
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-10 space-y-2">
        {countries.map(c => {
          const got = learnedInCountry(c.code)
          const pct = c.total ? got / c.total : 0
          const full = got === c.total
          return (
            <div key={c.code} className="px-4 py-2.5 rounded-xl" style={{ background: T.surface, border: `1px solid ${full ? tint(T.green, 0.4) : T.line}` }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold" style={{ color: T.text }}>
                  {c.emoji} {c.name} {full && <span className="text-xs" style={{ color: T.green }}>✓</span>}
                </span>
                <span className="text-xs font-semibold" style={{ color: full ? T.green : ACCENT.codex, fontFamily: FONT.mono, fontVariantNumeric: "tabular-nums" }}>{got} / {c.total}</span>
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: T.line }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct * 100}%`, background: full ? T.green : ACCENT.codex }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
