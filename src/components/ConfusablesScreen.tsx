import { useState } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"

interface Props { onBack: () => void }

interface Round {
  target: FlagRecord
  choices: FlagRecord[]   // 4 visually similar flags, 1 is correct
  correctIndex: number
}

function buildRounds(count: number): Round[] {
  // Only use flags that have at least 1 confusable
  const eligible = FLAGS.filter(f => f.confusableWith.length > 0)
  const shuffled  = [...eligible].sort(() => Math.random() - 0.5)
  const rounds: Round[] = []

  for (const target of shuffled) {
    if (rounds.length >= count) break

    // Get confusable flags (by code)
    const confusables = target.confusableWith
      .map(code => FLAGS.find(f => f.code === code))
      .filter((f): f is FlagRecord => !!f)

    if (confusables.length < 1) continue

    // Fill to 4 choices using confusables first, then same-region
    const extra = FLAGS.filter(
      f => f.code !== target.code && !confusables.some(c => c.code === f.code)
        && f.region === target.region
    ).sort(() => Math.random() - 0.5)

    const distractors = [
      ...confusables,
      ...extra,
    ].slice(0, 3)

    if (distractors.length < 3) continue  // can't fill a full set of 4

    const all = [target, ...distractors].sort(() => Math.random() - 0.5)
    rounds.push({ target, choices: all, correctIndex: all.indexOf(target) })
  }

  return rounds
}

const TOTAL = 5

export default function ConfusablesScreen({ onBack }: Props) {
  const [rounds]    = useState(() => buildRounds(TOTAL))
  const [idx, setIdx]       = useState(0)
  const [selected, setSelected]  = useState<number | null>(null)
  const [scores, setScores] = useState<boolean[]>([])
  const [done, setDone]     = useState(false)

  const round    = rounds[idx]
  const answered = selected !== null
  const isRight  = answered && selected === round?.correctIndex

  const handlePick = (i: number) => {
    if (answered) return
    setSelected(i)
    setScores(prev => [...prev, i === round.correctIndex])
  }

  const handleNext = () => {
    if (idx + 1 >= rounds.length) { setDone(true); return }
    setIdx(i => i + 1)
    setSelected(null)
  }

  // ── Result ─────────────────────────────────────────────────────────────────
  if (done || rounds.length === 0) {
    const correct = scores.filter(Boolean).length
    const total   = rounds.length
    const pct     = total > 0 ? Math.round((correct / total) * 100) : 0
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl p-6 text-center mb-4"
            style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 0 32px #8B6CFF22" }}>
            <div className="text-5xl mb-3">{pct === 100 ? "🏆" : pct >= 60 ? "🎯" : "📚"}</div>
            <div className="text-6xl font-black mb-1" style={{ color: "#F5F3FF" }}>{correct}/{total}</div>
            <div className="text-sm" style={{ color: "#B8A9E0" }}>
              {pct === 100 ? "Unbeatable! You know your lookalikes." : "These are the trickiest flags in the world — don't feel bad."}
            </div>
            <div className="flex justify-center gap-2 mt-3">
              {scores.map((ok, i) => <span key={i} style={{ fontSize: 24 }}>{ok ? '🟩' : '🟥'}</span>)}
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

  // ── Quiz ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>

      <header className="flex items-center justify-between px-5 pt-8 pb-4" style={{ zIndex: 1 }}>
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Lookalikes</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>{idx + 1} / {rounds.length}</div>
        </div>
        <div className="flex gap-1.5 items-center">
          {Array.from({ length: rounds.length }).map((_, i) => (
            <div key={i} style={{
              width: 7, height: 7, borderRadius: '50%',
              background: i < scores.length ? (scores[i] ? '#34D399' : '#F43F5E') : '#8B6CFF33',
            }} />
          ))}
        </div>
      </header>

      {/* Progress */}
      <div className="mx-5 h-1.5 rounded-full overflow-hidden mb-5" style={{ background: "#2D1F52", zIndex: 1 }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(idx / rounds.length) * 100}%`, background: "linear-gradient(90deg,#8B6CFF,#A78BFA)" }} />
      </div>

      <div className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
        {/* Prompt */}
        <div className="w-full max-w-sm mb-5 rounded-2xl px-5 py-4 text-center"
          style={{ background: "#2D1F52", border: "1px solid #8B6CFF44" }}>
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#B8A9E0" }}>Which flag is…</p>
          <p className="text-2xl font-black" style={{ color: "#F5F3FF" }}>{round.target.name}</p>
          {answered && (
            <p className="text-xs mt-1.5" style={{ color: "#8B6CFF88" }}>
              {round.target.distinguishingTip}
            </p>
          )}
        </div>

        {/* 2×2 flag grid */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-4">
          {round.choices.map((flag, i) => {
            const isCorrect = i === round.correctIndex
            const isChosen  = selected === i
            let border = '1.5px solid #8B6CFF22'
            if (answered) {
              if (isCorrect)          border = '2px solid #34D399'
              else if (isChosen)      border = '2px solid #F43F5E'
            } else if (isChosen) {
              border = '2px solid #8B6CFF'
            }

            return (
              <button key={flag.code} onClick={() => handlePick(i)}
                disabled={answered}
                className="relative rounded-xl overflow-hidden transition-all active:scale-95"
                style={{ border, background: "#1A1033", aspectRatio: "3/2" }}>
                <img src={flag.flagUrl} alt={flag.name} className="w-full h-full object-cover" />
                {answered && (isCorrect || isChosen) && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: isCorrect ? '#34D39918' : '#F43F5E18',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 28 }}>{isCorrect ? '✓' : '✗'}</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {answered && (
          <div className="w-full max-w-sm mb-3 px-4 py-3 rounded-xl"
            style={{ background: '#2D1F52', border: `1px solid ${isRight ? '#34D39944' : '#F43F5E44'}` }}>
            <p className="text-sm font-semibold" style={{ color: isRight ? '#34D399' : '#F43F5E' }}>
              {isRight ? `✓ Correct — ${round.target.name}` : `✗ That was ${round.choices[selected!].name}`}
            </p>
            {!isRight && (
              <p className="text-xs mt-1" style={{ color: '#B8A9E0' }}>
                {round.target.name}: {round.target.distinguishingTip}
              </p>
            )}
          </div>
        )}

        {answered && (
          <button onClick={handleNext}
            className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
            {idx + 1 >= rounds.length ? "See Results →" : "Next →"}
          </button>
        )}
      </div>
    </div>
  )
}
