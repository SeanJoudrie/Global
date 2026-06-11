import { useState } from "react"
import { SUB_FLAGS } from "../data/subdivisions"
import type { SubFlag } from "../data/subdivisions"

interface Props { onBack: () => void; onSubLearned: (code: string) => void }

const ROUNDS = 6
function shuffle<T>(a: T[]): T[] { return [...a].sort(() => Math.random() - 0.5) }

interface Round { target: SubFlag; choices: string[] }

function buildRounds(): Round[] {
  return shuffle(SUB_FLAGS).slice(0, ROUNDS).map(target => {
    const sameCont = Array.from(new Set(
      SUB_FLAGS.filter(s => s.continent === target.continent && s.countryName !== target.countryName).map(s => s.countryName)
    ))
    let distract = shuffle(sameCont).slice(0, 3)
    if (distract.length < 3) {
      const extra = Array.from(new Set(SUB_FLAGS.filter(s => s.countryName !== target.countryName).map(s => s.countryName)))
      distract = shuffle([...distract, ...extra.filter(c => !distract.includes(c))]).slice(0, 3)
    }
    return { target, choices: shuffle([target.countryName, ...distract]) }
  })
}

function SubdivisionStumperScreenGame({ onBack, onSubLearned , onReplay }: Props & { onReplay: () => void }) {
  const [rounds] = useState(buildRounds)
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [scores, setScores] = useState<boolean[]>([])
  const [done, setDone] = useState(false)

  const round = rounds[idx]
  const answered = picked !== null

  const choose = (c: string) => {
    if (answered) return
    setPicked(c)
    const ok = c === round.target.countryName
    if (ok) onSubLearned(round.target.code)
    setScores(s => [...s, ok])
  }

  const next = () => {
    if (idx + 1 >= rounds.length) { setDone(true); return }
    setIdx(i => i + 1)
    setPicked(null)
  }

  if (done) {
    const correct = scores.filter(Boolean).length
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl p-6 text-center mb-4" style={{ background: "#2D1F52", border: "1px solid #34D39944" }}>
            <div className="text-5xl mb-3">{correct >= ROUNDS * 0.8 ? "🗺️" : correct >= ROUNDS * 0.5 ? "📍" : "🧭"}</div>
            <div className="text-5xl font-black mb-1" style={{ color: "#F5F3FF" }}>{correct} / {ROUNDS}</div>
            <div className="text-sm mb-3" style={{ color: "#B8A9E0" }}>subdivisions placed</div>
            <div className="flex justify-center gap-2 flex-wrap">{scores.map((s, i) => <span key={i} style={{ fontSize: 22 }}>{s ? "🟩" : "🟥"}</span>)}</div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={onReplay} className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95" style={{ background: "linear-gradient(135deg,#34D399,#10B981)", color: "#fff" }}>Play Again</button>
            <button onClick={onBack} className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95" style={{ background: "#2D1F52", border: "1px solid #8B6CFF33", color: "#B8A9E0" }}>← Home</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl" style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Subdivision Stumper</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>{idx + 1} / {ROUNDS}</div>
        </div>
        <div className="flex gap-1.5">
          {rounds.map((_, i) => (<div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: i < scores.length ? (scores[i] ? "#34D399" : "#F43F5E") : "#8B6CFF33" }} />))}
        </div>
      </header>

      <div className="flex flex-col items-center px-5 gap-4">
        <div style={{ width: 280, height: 186, borderRadius: 14, overflow: "hidden", border: "2px solid #8B6CFF44", boxShadow: "0 0 32px #8B6CFF22", background: "#1E1640" }}>
          <img src={round.target.flagUrl} alt="subdivision flag" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={e => { (e.target as HTMLImageElement).style.opacity = "0.3" }} />
        </div>
        {/* answer sits right under the flag once you've guessed */}
        {answered
          ? <div className="w-full max-w-sm px-4 py-2.5 rounded-xl text-sm text-center" style={{ background: "#2D1F52", border: "1px solid #8B6CFF22", color: "#B8A9E0" }}>
              {round.target.countryEmoji} <span style={{ color: "#F5F3FF", fontWeight: 600 }}>{round.target.name}</span> — {round.target.countryName}
            </div>
          : <div className="text-sm font-semibold" style={{ color: "#34D399" }}>This is a subdivision of which country?</div>}

        <div className="grid grid-cols-1 gap-2.5 w-full max-w-sm">
          {round.choices.map(c => {
            const isAnswer = c === round.target.countryName
            const isChosen = picked === c
            let border = "1.5px solid #8B6CFF22"
            if (answered) { if (isAnswer) border = "2px solid #34D399"; else if (isChosen) border = "2px solid #F43F5E" }
            return (
              <button key={c} onClick={() => choose(c)} disabled={answered}
                className="py-3 px-4 rounded-xl font-semibold text-sm transition-all active:scale-95"
                style={{ background: "#2D1F52", border, color: "#F5F3FF", textAlign: "left" }}>
                {c}
                {answered && isAnswer && <span style={{ float: "right" }}>✓</span>}
                {answered && isChosen && !isAnswer && <span style={{ float: "right", color: "#F43F5E" }}>✗</span>}
              </button>
            )
          })}
        </div>

        {answered && (
          <button onClick={next} className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95" style={{ background: "linear-gradient(135deg,#34D399,#10B981)", color: "#fff" }}>
            {idx + 1 >= ROUNDS ? "See Results →" : "Next →"}
          </button>
        )}
      </div>
    </div>
  )
}

export default function SubdivisionStumperScreen({ onBack, onSubLearned }: Props) {
  const [replayKey, setReplayKey] = useState(0)
  return <SubdivisionStumperScreenGame key={replayKey} onBack={onBack} onSubLearned={onSubLearned} onReplay={() => setReplayKey(k => k + 1)} />
}
