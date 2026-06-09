import { useState, useRef } from "react"
import { FLAGS } from "../data/flags"
import { todayString } from "../utils/prng"
import type { AppState } from "../utils/storage"
import { recordFunFactViewed } from "../utils/storage"

interface Props {
  state: AppState
  onBack: () => void
  onStateChange: (state: AppState) => void
}

// Shuffle FLAGS in a deterministic daily order, starting from today's offset
function getDailyOrder() {
  const DAY_MS = 86400000
  const start  = Math.floor(Date.now() / DAY_MS) % FLAGS.length
  return [...FLAGS.slice(start), ...FLAGS.slice(0, start)]
}

export default function FunFactScreen({ state, onBack, onStateChange }: Props) {
  const [ordered]        = useState(getDailyOrder)
  const [cardIdx, setCardIdx] = useState(0)
  const today            = todayString()
  const alreadySeen      = state.lastFunFactDate === today
  const streak           = state.funFactStreak ?? 0
  const seenRef          = useRef(alreadySeen)

  const flag = ordered[cardIdx % ordered.length]

  const handleNext = () => {
    if (!seenRef.current) {
      seenRef.current = true
      onStateChange(recordFunFactViewed(state, today))
    }
    setCardIdx(i => i + 1)
  }
  const handlePrev = () => { setCardIdx(i => Math.max(0, i - 1)) }

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>

      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Fun Facts</div>
          <div className="text-xs" style={{ color: "#8B6CFF" }}>{cardIdx + 1} of {ordered.length}</div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-xs font-black" style={{ color: '#FBBF24' }}>🔥 {streak}</div>
          <div className="text-xs" style={{ color: '#8B6CFF88' }}>streak</div>
        </div>
      </header>

      <div className="flex flex-col items-center px-5 gap-4 pb-10 flex-1">

        {/* Card */}
        <div className="w-full max-w-sm rounded-2xl overflow-hidden"
          style={{ border: "1px solid #8B6CFF33", boxShadow: "0 0 40px #8B6CFF22" }}>

          {/* Flag image */}
          <div style={{ position: 'relative', height: 180 }}>
            <img src={flag.flagUrl} alt={flag.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, #120930cc)',
              padding: '28px 16px 12px',
            }}>
              <div className="text-xl font-black" style={{ color: '#F5F3FF' }}>{flag.name}</div>
              <div className="text-xs" style={{ color: '#B8A9E0' }}>{flag.region}</div>
            </div>
          </div>

          {/* Fact */}
          <div style={{ background: "#2D1F52", padding: "18px 20px" }}>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#8B6CFF" }}>
              Did you know?
            </div>
            <p className="text-base leading-relaxed font-medium" style={{ color: "#F5F3FF" }}>
              {flag.funFact}
            </p>
          </div>

          {/* Tip */}
          <div style={{ background: "#1A1033", padding: "12px 20px", borderTop: "1px solid #8B6CFF22" }}>
            <div className="text-xs font-semibold mb-1" style={{ color: "#8B6CFF" }}>Flag tip</div>
            <p className="text-xs" style={{ color: "#B8A9E0" }}>{flag.distinguishingTip}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 w-full max-w-sm">
          <button onClick={handlePrev} disabled={cardIdx === 0}
            className="flex-1 py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{
              background: "#2D1F52", border: "1px solid #8B6CFF33",
              color: cardIdx === 0 ? "#8B6CFF22" : "#B8A9E0",
              cursor: cardIdx === 0 ? 'not-allowed' : 'pointer',
            }}>
            ← Prev
          </button>
          <button onClick={handleNext}
            className="flex-1 py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
            Next →
          </button>
        </div>

        {/* Streak card */}
        {(streak > 0 || alreadySeen) && (
          <div className="w-full max-w-sm px-5 py-4 rounded-2xl"
            style={{ background: "#2D1F52", border: "1px solid #FBBF2444" }}>
            <div className="flex items-center gap-3">
              <div className="text-3xl">🔥</div>
              <div>
                <div className="font-black text-lg" style={{ color: "#FBBF24" }}>{streak} day streak</div>
                <div className="text-xs" style={{ color: "#B8A9E0" }}>Come back tomorrow to keep it going!</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
