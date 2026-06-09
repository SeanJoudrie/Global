import { useState, useEffect } from "react"
import { FLAGS } from "../data/flags"
import { todayString } from "../utils/prng"
import type { AppState } from "../utils/storage"
import { recordFunFactViewed } from "../utils/storage"

interface Props {
  state: AppState
  onBack: () => void
  onStateChange: (state: AppState) => void
}

function getDailyFlag() {
  const DAY_MS = 86400000
  const idx = Math.floor(Date.now() / DAY_MS) % FLAGS.length
  return FLAGS[idx]
}

export default function FunFactScreen({ state, onBack, onStateChange }: Props) {
  const flag = getDailyFlag()
  const today = todayString()
  const alreadySeen = state.lastFunFactDate === today
  const streak = state.funFactStreak ?? 0

  const [revealed, setRevealed] = useState(alreadySeen)

  useEffect(() => {
    if (revealed && !alreadySeen) {
      onStateChange(recordFunFactViewed(state, today))
    }
  }, [revealed]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>

      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Fun Fact</div>
          <div className="text-xs" style={{ color: "#8B6CFF" }}>Daily</div>
        </div>
        {/* Streak badge */}
        <div className="flex flex-col items-end">
          <div className="text-xs font-black" style={{ color: '#FBBF24' }}>
            {alreadySeen || revealed ? `🔥 ${streak}` : '🔥'}
          </div>
          <div className="text-xs" style={{ color: '#8B6CFF88' }}>day streak</div>
        </div>
      </header>

      <div className="flex flex-col items-center px-5 gap-5 pb-10">

        {/* Date */}
        <div className="text-xs font-semibold" style={{ color: "#B8A9E0" }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>

        {/* Flag card */}
        <div className="w-full max-w-sm rounded-2xl overflow-hidden"
          style={{ border: "1px solid #8B6CFF33", boxShadow: "0 0 40px #8B6CFF22" }}>

          {/* Flag image */}
          <div style={{ position: 'relative', width: '100%', height: 200 }}>
            <img src={flag.flagUrl} alt={flag.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            {/* Gradient overlay for country name */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, #120930dd)',
              padding: '32px 16px 14px',
            }}>
              <div className="text-xl font-black" style={{ color: '#F5F3FF' }}>{flag.name}</div>
              <div className="text-xs" style={{ color: '#B8A9E0' }}>{flag.region}</div>
            </div>
          </div>

          {/* Fact body */}
          <div style={{ background: "#2D1F52", padding: "20px" }}>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#8B6CFF" }}>
              Did you know?
            </div>

            {revealed ? (
              <p className="text-base leading-relaxed font-medium" style={{ color: "#F5F3FF" }}>
                {flag.funFact}
              </p>
            ) : (
              <div>
                {/* Blurred placeholder */}
                <div style={{
                  filter: 'blur(8px)', userSelect: 'none', pointerEvents: 'none',
                  color: '#F5F3FF', fontSize: 15, lineHeight: 1.6,
                }}>
                  {flag.funFact}
                </div>
              </div>
            )}

            {!revealed && (
              <button onClick={() => setRevealed(true)}
                className="w-full mt-4 py-3 rounded-xl font-bold transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
                Reveal Fact ✨
              </button>
            )}
          </div>
        </div>

        {/* Streak card (shown after reveal) */}
        {revealed && (
          <div className="w-full max-w-sm px-5 py-4 rounded-2xl"
            style={{ background: "#2D1F52", border: "1px solid #FBBF2444" }}>
            <div className="flex items-center gap-3">
              <div className="text-3xl">🔥</div>
              <div>
                <div className="font-black text-lg" style={{ color: "#FBBF24" }}>
                  {streak} day streak
                </div>
                <div className="text-xs" style={{ color: "#B8A9E0" }}>
                  {alreadySeen ? "Come back tomorrow for the next fact." : "Come back tomorrow to keep it going!"}
                </div>
              </div>
            </div>
          </div>
        )}

        {revealed && (
          <div className="w-full max-w-sm">
            <div className="text-xs mb-3 text-center" style={{ color: "#B8A9E0" }}>
              Also known for:
            </div>
            <div className="px-4 py-3 rounded-xl" style={{ background: "#2D1F52", border: "1px solid #8B6CFF22" }}>
              <div className="text-xs font-semibold mb-1" style={{ color: "#8B6CFF" }}>Distinguishing tip</div>
              <p className="text-sm" style={{ color: "#F5F3FF" }}>{flag.distinguishingTip}</p>
            </div>
          </div>
        )}

        <button onClick={onBack}
          className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
          style={{ background: "#2D1F52", border: "1px solid #8B6CFF33", color: "#B8A9E0" }}>
          ← Home
        </button>
      </div>
    </div>
  )
}
