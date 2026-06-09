import { useState } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"

interface Props { onBack: () => void }

// Stages: ultra-contrast black&white → high contrast → grayscale → color
// Each wrong guess moves to the next stage (more visible)
const STAGES = [
  { filter: 'contrast(30) brightness(0.4) saturate(0)',  label: 'Black & White',  pts: 1000 },
  { filter: 'contrast(6) brightness(0.6) saturate(0)',   label: 'High contrast',  pts: 700  },
  { filter: 'contrast(1.5) brightness(0.85) saturate(0)', label: 'Grayscale',    pts: 400  },
  { filter: 'none',                                       label: 'Full colour',   pts: 100  },
]

function pickChoices(target: FlagRecord): FlagRecord[] {
  const pool = FLAGS.filter(f => f.code !== target.code && f.region === target.region)
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  const distractors = shuffled.slice(0, 3)
  if (distractors.length < 3) {
    const extra = FLAGS
      .filter(f => f.code !== target.code && !distractors.some(d => d.code === f.code))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3 - distractors.length)
    distractors.push(...extra)
  }
  return [target, ...distractors].sort(() => Math.random() - 0.5)
}

const ROUNDS = 5

interface Round { target: FlagRecord; choices: FlagRecord[] }

function buildRounds(): Round[] {
  return [...FLAGS].sort(() => Math.random() - 0.5)
    .slice(0, ROUNDS)
    .map(target => ({ target, choices: pickChoices(target) }))
}

export default function SilhouetteScreen({ onBack }: Props) {
  const [rounds]  = useState(buildRounds)
  const [idx, setIdx]     = useState(0)
  const [stage, setStage] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [scores, setScores]     = useState<{ correct: boolean; pts: number }[]>([])
  const [done, setDone]   = useState(false)

  const round    = rounds[idx]
  const answered = selected !== null

  const handlePick = (code: string) => {
    if (answered) return
    const correct = code === round.target.code
    setSelected(code)
    setScores(prev => [...prev, { correct, pts: correct ? STAGES[stage].pts : 0 }])
  }

  const handleReveal = () => {
    if (stage < STAGES.length - 1) setStage(s => s + 1)
  }

  const handleNext = () => {
    if (idx + 1 >= rounds.length) { setDone(true); return }
    setIdx(i => i + 1)
    setStage(0)
    setSelected(null)
  }

  // ── Result ────────────────────────────────────────────────────────────────
  if (done) {
    const totalPts = scores.reduce((s, r) => s + r.pts, 0)
    const maxPts   = ROUNDS * STAGES[0].pts
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl p-6 text-center mb-4"
            style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 0 32px #8B6CFF22" }}>
            <div className="text-5xl mb-3">{totalPts >= maxPts * 0.8 ? "👁️" : totalPts >= maxPts * 0.5 ? "🎯" : "📚"}</div>
            <div className="text-5xl font-black mb-1" style={{ color: "#F5F3FF" }}>{totalPts.toLocaleString()}</div>
            <div className="text-sm mb-3" style={{ color: "#B8A9E0" }}>pts · max {maxPts.toLocaleString()}</div>
            <div className="flex justify-center gap-2 flex-wrap">
              {scores.map((s, i) => <span key={i} style={{ fontSize: 22 }}>{s.correct ? '🟩' : '🟥'}</span>)}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => window.location.reload()}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
              Play Again
            </button>
            <button onClick={onBack}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "#2D1F52", border: "1px solid #8B6CFF33", color: "#B8A9E0" }}>
              ← Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentStage = STAGES[stage]

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>

      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Silhouette</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>{idx + 1} / {ROUNDS}</div>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: ROUNDS }).map((_, i) => (
            <div key={i} style={{
              width: 7, height: 7, borderRadius: '50%',
              background: i < scores.length ? (scores[i].correct ? '#34D399' : '#F43F5E') : '#8B6CFF33',
            }} />
          ))}
        </div>
      </header>

      <div className="mx-5 h-1.5 rounded-full overflow-hidden mb-4" style={{ background: "#2D1F52" }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(idx / ROUNDS) * 100}%`, background: "linear-gradient(90deg,#8B6CFF,#A78BFA)" }} />
      </div>

      <div className="flex flex-col items-center px-5 gap-4">

        {/* Stage badge + points */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: '#8B6CFF22', color: '#A78BFA', border: '1px solid #8B6CFF44' }}>
            {currentStage.label}
          </div>
          {!answered && (
            <div className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: '#34D39922', color: '#34D399', border: '1px solid #34D39944' }}>
              {currentStage.pts} pts if correct
            </div>
          )}
        </div>

        {/* Flag with CSS filter */}
        <div style={{
          width: 300, height: 200, borderRadius: 12, overflow: 'hidden',
          border: answered
            ? `2px solid ${selected === round.target.code ? '#34D399' : '#F43F5E'}`
            : '2px solid #8B6CFF33',
          position: 'relative', background: '#000',
        }}>
          <img
            src={round.target.flagUrl}
            alt="mystery flag"
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              filter: answered ? 'none' : currentStage.filter,
              transition: 'filter 0.5s ease',
            }}
          />
          {answered && selected !== round.target.code && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent,#12093088)', padding: '20px 12px 8px', textAlign: 'center',
            }}>
              <span style={{ color: '#F5F3FF', fontWeight: 700 }}>{round.target.name}</span>
            </div>
          )}
        </div>

        {/* Reveal more */}
        {!answered && stage < STAGES.length - 1 && (
          <button onClick={handleReveal}
            className="text-xs px-4 py-2 rounded-full font-semibold transition-all active:scale-95"
            style={{ background: '#2D1F52', border: '1px solid #8B6CFF44', color: '#8B6CFF' }}>
            Reveal more ({STAGES[stage + 1].pts} pts) →
          </button>
        )}

        {/* Choices */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {round.choices.map(flag => {
            const isTarget = flag.code === round.target.code
            const isChosen = selected === flag.code
            let border = '1.5px solid #8B6CFF22'
            if (answered) {
              if (isTarget) border = '2px solid #34D399'
              else if (isChosen) border = '2px solid #F43F5E'
            }
            return (
              <button key={flag.code} onClick={() => handlePick(flag.code)}
                disabled={answered}
                className="py-3 px-4 rounded-xl font-semibold text-sm transition-all active:scale-95"
                style={{ background: "#2D1F52", border, color: "#F5F3FF", textAlign: 'left' }}>
                {flag.name}
                {answered && isTarget && <span style={{ float: 'right' }}>✓</span>}
                {answered && isChosen && !isTarget && <span style={{ float: 'right', color: '#F43F5E' }}>✗</span>}
              </button>
            )
          })}
        </div>

        {answered && (
          <>
            <div className="w-full max-w-sm px-4 py-3 rounded-xl"
              style={{ background: "#2D1F52", border: `1px solid ${selected === round.target.code ? '#34D39944' : '#F43F5E44'}` }}>
              <p className="text-sm font-semibold" style={{ color: selected === round.target.code ? '#34D399' : '#F43F5E' }}>
                {selected === round.target.code
                  ? `✓ ${round.target.name} — ${scores[scores.length - 1].pts} pts`
                  : `✗ That was ${round.target.name}`}
              </p>
              {round.target.distinguishingTip && (
                <p className="text-xs mt-1" style={{ color: '#B8A9E0' }}>{round.target.distinguishingTip}</p>
              )}
            </div>
            <button onClick={handleNext}
              className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
              {idx + 1 >= ROUNDS ? "See Results →" : "Next →"}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
