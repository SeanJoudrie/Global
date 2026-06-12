import { useState } from "react"
import { FLAGS } from "../data/flags"
import type { AppState } from "../utils/storage"
import { T, ACCENT, FONT, tint } from "../ui/tokens"
import { ScreenHeader } from "./ui"

interface Props {
  state: AppState
  onBack: () => void
  onStateChange: (state: AppState) => void
}

const A = ACCENT.today

// Randomly shuffle so facts aren't clustered by region.
function shuffled() {
  return [...FLAGS].sort(() => Math.random() - 0.5)
}

export default function FunFactScreen({ onBack }: Props) {
  const [ordered] = useState(shuffled)
  const [cardIdx, setCardIdx] = useState(0)

  const flag = ordered[cardIdx % ordered.length]

  const handleNext = () => setCardIdx(i => i + 1)
  const handlePrev = () => setCardIdx(i => Math.max(0, i - 1))

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: T.bg, color: T.text }}>

      <ScreenHeader title="Fun Facts" subtitle={`${cardIdx + 1} of ${ordered.length}`} onBack={onBack} />

      <div className="flex flex-col items-center px-5 gap-4 pb-10 flex-1">

        {/* Card */}
        <div className="w-full max-w-sm rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${T.line}`, boxShadow: `0 6px 20px -10px ${tint(T.text, 0.5)}` }}>

          {/* Flag image — show the whole flag (no zoom/crop), larger 3:2 frame */}
          <div style={{ position: 'relative', aspectRatio: '3 / 2', background: T.surfaceHi }}>
            <img src={flag.flagUrl} alt={flag.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: `linear-gradient(transparent, ${tint(T.text, 0.85)})`,
              padding: '28px 16px 12px',
            }}>
              <div className="text-xl font-black" style={{ color: T.bg, fontFamily: FONT.display }}>{flag.name}</div>
              <div className="text-xs" style={{ color: tint(T.bg, 0.75) }}>{flag.region}</div>
            </div>
          </div>

          {/* Fact */}
          <div style={{ background: T.surface, padding: "18px 20px" }}>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: A }}>
              Did you know?
            </div>
            <p className="text-base leading-relaxed font-medium" style={{ color: T.text }}>
              {flag.funFact}
            </p>
          </div>

          {/* Tip */}
          <div style={{ background: T.surfaceHi, padding: "12px 20px", borderTop: `1px solid ${T.line}` }}>
            <div className="text-xs font-semibold mb-1" style={{ color: A }}>Flag tip</div>
            <p className="text-xs" style={{ color: T.muted }}>{flag.distinguishingTip}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 w-full max-w-sm">
          <button onClick={handlePrev} disabled={cardIdx === 0}
            className="flex-1 py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{
              background: T.surface, border: `1px solid ${T.line}`,
              color: cardIdx === 0 ? T.dim : T.muted,
              opacity: cardIdx === 0 ? 0.6 : 1,
              cursor: cardIdx === 0 ? 'not-allowed' : 'pointer',
            }}>
            ← Prev
          </button>
          <button onClick={handleNext}
            className="flex-1 py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{ background: A, color: T.onAccent, fontFamily: FONT.display }}>
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
