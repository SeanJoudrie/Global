import { useState } from "react"
import { FLAGS } from "../data/flags"
import type { AppState } from "../utils/storage"

interface Props {
  state: AppState
  onBack: () => void
  onSetUsername: (name: string) => void
}

const REGIONS = ["Europe", "Africa", "Asia", "Americas", "Middle East", "Oceania"]

export default function ProfileScreen({ state, onBack, onSetUsername }: Props) {
  const [editingName, setEditingName] = useState(false)
  const [draftName, setDraftName] = useState(state.username)
  const displayName = state.username.trim() || "Explorer"

  const saveName = () => {
    onSetUsername(draftName.trim().slice(0, 24))
    setEditingName(false)
  }
  const regionStats = REGIONS.map(region => {
    const regionFlags = FLAGS.filter(f => f.region === region)
    const learned = regionFlags.filter(f => state.learnedFlags.includes(f.code)).length
    return { region, total: regionFlags.length, learned, pct: regionFlags.length > 0 ? learned / regionFlags.length : 0 }
  })

  const worldPct = FLAGS.length > 0 ? state.learnedFlags.length / FLAGS.length : 0

  const dailyDates = Object.keys(state.dailyHistory).sort().slice(-7)

  const regionEmoji: Record<string, string> = {
    Europe: "🌍", Africa: "🌍", Asia: "🌏", Americas: "🌎", "Middle East": "🕌", Oceania: "🌊"
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)", position: "relative", zIndex: 1 }}>
      <header className="flex items-center gap-3 px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <h1 className="text-2xl font-black" style={{ color: "#F5F3FF" }}>Profile</h1>
      </header>

      {/* Profile banner */}
      <div className="mx-5 mb-4 flex items-center gap-4 px-5 py-4 rounded-2xl"
        style={{ background: "#2D1F52", border: "1px solid #8B6CFF33" }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#3D1A7A,#5A2A9A)" }}>🌍</div>
        <div className="min-w-0 flex-1">
          {editingName ? (
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={draftName}
                onChange={e => setDraftName(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") saveName(); if (e.key === "Escape") setEditingName(false) }}
                placeholder="Your name"
                maxLength={24}
                className="min-w-0 flex-1 px-2 py-1 rounded-lg text-lg font-black outline-none"
                style={{ background: "#1A1033", border: "1px solid #8B6CFF66", color: "#F5F3FF" }}
              />
              <button onClick={saveName} className="px-3 py-1.5 rounded-lg text-sm font-bold flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>Save</button>
            </div>
          ) : (
            <button onClick={() => { setDraftName(state.username); setEditingName(true) }}
              className="flex items-center gap-2 group">
              <span className="text-xl font-black" style={{ color: "#F5F3FF" }}>{displayName}</span>
              <span className="text-xs" style={{ color: "#A78BFA" }}>✏️</span>
            </button>
          )}
          <div className="text-xs mt-0.5" style={{ color: "#B8A9E0" }}>
            {state.learnedFlags.length} flags learned · {state.crowns.length} crowns earned
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="mx-5 mb-4 grid grid-cols-3 gap-3">
        {[
          { label: "Learned", value: state.learnedFlags.length, sub: `/ ${FLAGS.length}` },
          { label: "Day Streak", value: state.currentStreak, sub: "🔥" },
          { label: "Best", value: state.longestStreak, sub: "days" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="flex flex-col items-center py-3 rounded-xl" style={{ background: "#2D1F52" }}>
            <span className="text-xl font-black" style={{ color: "#F5F3FF" }}>{value}</span>
            <span className="text-xs" style={{ color: "#A78BFA" }}>{sub}</span>
            <span className="text-xs mt-0.5" style={{ color: "#B8A9E0" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Progress bars */}
      <div className="mx-5 mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#B8A9E0" }}>Progress</h3>
        <div className="space-y-3">

          {/* World Flags */}
          <div className="px-4 py-3 rounded-xl" style={{ background: "#2D1F52", border: "1px solid #8B6CFF22" }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span>🌍</span>
                <span className="font-semibold text-sm" style={{ color: "#F5F3FF" }}>World Flags</span>
              </div>
              <span className="text-xs font-semibold" style={{ color: "#A78BFA" }}>
                {state.learnedFlags.length} / {FLAGS.length}
              </span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#1A1033" }}>
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${worldPct * 100}%`, background: "linear-gradient(90deg,#8B6CFF,#A78BFA)" }} />
            </div>
            <div className="text-xs mt-1 text-right" style={{ color: "#B8A9E0" }}>
              {Math.round(worldPct * 100)}%
            </div>
          </div>

          {/* Regional bars */}
          {regionStats.map(rs => (
            <div key={rs.region} className="px-4 py-3 rounded-xl" style={{ background: "#2D1F52", border: "1px solid #8B6CFF22" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span>{regionEmoji[rs.region] ?? "🌐"}</span>
                  <span className="font-semibold text-sm" style={{ color: "#F5F3FF" }}>{rs.region}</span>
                </div>
                <span className="text-xs font-semibold" style={{ color: "#A78BFA" }}>
                  {rs.learned} / {rs.total}
                </span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#1A1033" }}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${rs.pct * 100}%`,
                    background: rs.pct >= 1 ? "linear-gradient(90deg,#FBBF24,#F59E0B)"
                               : "linear-gradient(90deg,#8B6CFF,#A78BFA)" }} />
              </div>
              {rs.pct >= 1 && <div className="text-xs mt-1 text-right" style={{ color: "#FBBF24" }}>👑 Complete!</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Daily history */}
      {dailyDates.length > 0 && (
        <div className="mx-5 mb-8">
          <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#B8A9E0" }}>Daily History</h3>
          <div className="flex gap-2 flex-wrap">
            {dailyDates.map(date => {
              const result = state.dailyHistory[date]
              const pct = result ? result.score / result.total : 0
              const color = pct >= 0.8 ? "#34D399" : pct >= 0.5 ? "#F59E0B" : "#F43F5E"
              return (
                <div key={date} className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold"
                    style={{ background: `${color}22`, border: `1.5px solid ${color}66`, color }}>
                    {result ? `${result.score}/${result.total}` : "-"}
                  </div>
                  <div className="text-xs" style={{ color: "#B8A9E0" }}>{date.slice(5)}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
