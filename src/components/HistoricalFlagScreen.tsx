import { useState } from "react"
import { HISTORICAL_FLAGS } from "../data/historicalFlags"
import type { HistoricalEntity } from "../data/historicalFlags"

interface Props { onBack: () => void }

const ROUNDS = 6
const PTS = 1000

function pickChoices(target: HistoricalEntity): HistoricalEntity[] {
  const sameRegion = HISTORICAL_FLAGS.filter(h => h.id !== target.id && h.region === target.region)
  const shuffled = [...sameRegion].sort(() => Math.random() - 0.5)
  const distractors = shuffled.slice(0, 3)
  if (distractors.length < 3) {
    const extra = HISTORICAL_FLAGS
      .filter(h => h.id !== target.id && !distractors.some(d => d.id === h.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3 - distractors.length)
    distractors.push(...extra)
  }
  return [target, ...distractors].sort(() => Math.random() - 0.5)
}

interface Round { target: HistoricalEntity; choices: HistoricalEntity[] }

function buildRounds(): Round[] {
  return [...HISTORICAL_FLAGS].sort(() => Math.random() - 0.5)
    .slice(0, ROUNDS)
    .map(target => ({ target, choices: pickChoices(target) }))
}

function FlagImg({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: 300, height: 200, borderRadius: 12, overflow: "hidden", border: "2px solid #8B6CFF33", position: "relative", background: "#1E1640" }}>
      <img src={src} alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        onError={e => {
          const el = e.target as HTMLImageElement
          el.style.display = "none"
          const ph = el.parentElement?.querySelector(".ph") as HTMLElement
          if (ph) ph.style.display = "flex"
        }} />
      <div className="ph" style={{ display: "none", position: "absolute", inset: 0, alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#8B6CFF66", fontSize: 52 }}>🏴</span>
      </div>
    </div>
  )
}

function HistoricalFlagScreenGame({ onBack , onReplay }: Props & { onReplay: () => void }) {
  const [rounds] = useState(buildRounds)
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [scores, setScores] = useState<{ correct: boolean }[]>([])
  const [done, setDone] = useState(false)

  const round = rounds[idx]
  const answered = selected !== null

  const handlePick = (id: string) => {
    if (answered) return
    setSelected(id)
    setScores(prev => [...prev, { correct: id === round.target.id }])
  }

  const handleNext = () => {
    if (idx + 1 >= rounds.length) { setDone(true); return }
    setIdx(i => i + 1)
    setSelected(null)
  }

  if (done) {
    const correct = scores.filter(s => s.correct).length
    const totalPts = correct * PTS
    const maxPts = ROUNDS * PTS
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl p-6 text-center mb-4"
            style={{ background: "#2D1F52", border: "1px solid #C084FC44", boxShadow: "0 0 32px #C084FC22" }}>
            <div className="text-5xl mb-3">{correct >= ROUNDS * 0.8 ? "👑" : correct >= ROUNDS * 0.5 ? "📜" : "🏛️"}</div>
            <div className="text-5xl font-black mb-1" style={{ color: "#F5F3FF" }}>{correct} / {ROUNDS}</div>
            <div className="text-sm mb-3" style={{ color: "#B8A9E0" }}>{totalPts.toLocaleString()} pts · max {maxPts.toLocaleString()}</div>
            <div className="flex justify-center gap-2 flex-wrap">
              {scores.map((s, i) => <span key={i} style={{ fontSize: 22 }}>{s.correct ? "🟪" : "🟥"}</span>)}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={onReplay}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#A855F7,#C084FC)", color: "#fff" }}>
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

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>

      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Historical Flag</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>{idx + 1} / {ROUNDS}</div>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: ROUNDS }).map((_, i) => (
            <div key={i} style={{
              width: 7, height: 7, borderRadius: "50%",
              background: i < scores.length ? (scores[i].correct ? "#C084FC" : "#F43F5E") : "#8B6CFF33",
            }} />
          ))}
        </div>
      </header>

      <div className="mx-5 h-1.5 rounded-full overflow-hidden mb-4" style={{ background: "#2D1F52" }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(idx / ROUNDS) * 100}%`, background: "linear-gradient(90deg,#A855F7,#C084FC)" }} />
      </div>

      <div className="flex flex-col items-center px-5 gap-4">
        <div className="text-sm font-semibold" style={{ color: "#C084FC" }}>Which vanished state flew this flag?</div>

        <FlagImg src={round.target.flagUrl} alt="mystery historical flag" />

        <div className="grid grid-cols-1 gap-2.5 w-full max-w-sm">
          {round.choices.map(ent => {
            const isTarget = ent.id === round.target.id
            const isChosen = selected === ent.id
            let border = "1.5px solid #8B6CFF22"
            if (answered) {
              if (isTarget) border = "2px solid #C084FC"
              else if (isChosen) border = "2px solid #F43F5E"
            }
            return (
              <button key={ent.id} onClick={() => handlePick(ent.id)}
                disabled={answered}
                className="py-3 px-4 rounded-xl font-semibold text-sm transition-all active:scale-95"
                style={{ background: "#2D1F52", border, color: "#F5F3FF", textAlign: "left" }}>
                {ent.name}
                {answered && isTarget && <span style={{ float: "right" }}>✓</span>}
                {answered && isChosen && !isTarget && <span style={{ float: "right", color: "#F43F5E" }}>✗</span>}
              </button>
            )
          })}
        </div>

        {answered && (
          <>
            <div className="w-full max-w-sm px-4 py-3 rounded-xl"
              style={{ background: "#2D1F52", border: `1px solid ${selected === round.target.id ? "#C084FC44" : "#F43F5E44"}` }}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="text-sm font-bold" style={{ color: selected === round.target.id ? "#C084FC" : "#F43F5E" }}>
                  {selected === round.target.id ? "✓ " : "✗ "}{round.target.name}
                </p>
                <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: "#8B6CFF22", color: "#A78BFA", border: "1px solid #8B6CFF33", whiteSpace: "nowrap" }}>
                  {round.target.era}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#B8A9E0", lineHeight: 1.6 }}>{round.target.note}</p>
            </div>
            <button onClick={handleNext}
              className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#A855F7,#C084FC)", color: "#fff" }}>
              {idx + 1 >= ROUNDS ? "See Results →" : "Next →"}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function HistoricalFlagScreen({ onBack }: Props) {
  const [replayKey, setReplayKey] = useState(0)
  return <HistoricalFlagScreenGame key={replayKey} onBack={onBack} onReplay={() => setReplayKey(k => k + 1)} />
}
