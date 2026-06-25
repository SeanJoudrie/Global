import { useState } from "react"
import { HISTORICAL_FLAGS } from "../data/historicalFlags"
import type { HistoricalEntity, HistoricalRegion } from "../data/historicalFlags"
import { T, ACCENT, FONT, tint } from "../ui/tokens"
import { ScreenHeader } from "./ui"

interface Props { onBack: () => void; region?: HistoricalRegion }

const ROUNDS = 6
const PTS = 1000
const A = ACCENT.learn

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

function buildRounds(region?: HistoricalRegion): Round[] {
  const pool = region ? HISTORICAL_FLAGS.filter(h => h.region === region) : HISTORICAL_FLAGS
  const usePool = pool.length >= 4 ? pool : HISTORICAL_FLAGS
  return [...usePool].sort(() => Math.random() - 0.5)
    .slice(0, ROUNDS)
    .map(target => ({ target, choices: pickChoices(target) }))
}

function FlagImg({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: 300, height: 200, borderRadius: 12, overflow: "hidden", border: `2px solid ${tint(A, 0.3)}`, position: "relative", background: T.surfaceHi }}>
      <img src={src} alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        onError={e => {
          const el = e.target as HTMLImageElement
          el.style.display = "none"
          const ph = el.parentElement?.querySelector(".ph") as HTMLElement
          if (ph) ph.style.display = "flex"
        }} />
      <div className="ph" style={{ display: "none", position: "absolute", inset: 0, alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 52, opacity: 0.4 }}>🏴</span>
      </div>
    </div>
  )
}

function HistoricalFlagScreenGame({ onBack, onReplay, region }: Props & { onReplay: () => void }) {
  const [rounds] = useState(() => buildRounds(region))
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
        style={{ background: T.bg, color: T.text }}>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl p-6 text-center mb-4"
            style={{ background: T.surface, border: `1px solid ${tint(A, 0.3)}` }}>
            <div className="text-5xl mb-3">{correct >= ROUNDS * 0.8 ? "👑" : correct >= ROUNDS * 0.5 ? "📜" : "🏛️"}</div>
            <div className="text-5xl font-black mb-1" style={{ color: T.text, fontFamily: FONT.mono, fontVariantNumeric: "tabular-nums" }}>{correct} / {ROUNDS}</div>
            <div className="text-sm mb-3" style={{ color: T.muted }}>{totalPts.toLocaleString()} pts · max {maxPts.toLocaleString()}</div>
            <div className="flex justify-center gap-2 flex-wrap">
              {scores.map((s, i) => <span key={i} style={{ fontSize: 22 }}>{s.correct ? "🟪" : "🟥"}</span>)}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={onReplay}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: A, color: T.onAccent, fontFamily: FONT.display }}>
              Play Again
            </button>
            <button onClick={onBack}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>
              ← Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: T.bg, color: T.text }}>

      <ScreenHeader title="Historical Flag" subtitle={`Round ${idx + 1} / ${ROUNDS}`} onBack={onBack}
        right={
          <div className="flex gap-1.5">
            {Array.from({ length: ROUNDS }).map((_, i) => (
              <div key={i} style={{
                width: 7, height: 7, borderRadius: "50%",
                background: i < scores.length ? (scores[i].correct ? A : T.danger) : T.line,
              }} />
            ))}
          </div>
        } />

      <div className="mx-5 h-1.5 rounded-full overflow-hidden mb-4" style={{ background: T.line }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(scores.length / ROUNDS) * 100}%`, background: A }} />
      </div>

      <div className="flex flex-col items-center px-5 gap-4">
        <div className="text-sm font-semibold" style={{ color: A }}>Which vanished state flew this flag?</div>

        <FlagImg src={round.target.flagUrl} alt="mystery historical flag" />

        <div className="grid grid-cols-1 gap-2.5 w-full max-w-sm">
          {round.choices.map(ent => {
            const isTarget = ent.id === round.target.id
            const isChosen = selected === ent.id
            let border = `1.5px solid ${T.line}`
            if (answered) {
              if (isTarget) border = `2px solid ${A}`
              else if (isChosen) border = `2px solid ${T.danger}`
            }
            return (
              <button key={ent.id} onClick={() => handlePick(ent.id)}
                disabled={answered}
                className="py-3 px-4 rounded-xl font-semibold text-sm transition-all active:scale-95"
                style={{ background: T.surface, border, color: T.text, textAlign: "left" }}>
                {ent.name}
                {answered && isTarget && <span style={{ float: "right", color: A }}>✓</span>}
                {answered && isChosen && !isTarget && <span style={{ float: "right", color: T.danger }}>✗</span>}
              </button>
            )
          })}
        </div>

        {answered && (
          <>
            <div className="w-full max-w-sm px-4 py-3 rounded-xl"
              style={{ background: T.surface, border: `1px solid ${tint(selected === round.target.id ? A : T.danger, 0.35)}` }}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="text-sm font-bold" style={{ color: selected === round.target.id ? A : T.danger }}>
                  {selected === round.target.id ? "✓ " : "✗ "}{round.target.name}
                </p>
                <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: tint(A, 0.13), color: A, border: `1px solid ${tint(A, 0.3)}`, whiteSpace: "nowrap" }}>
                  {round.target.era}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: T.muted, lineHeight: 1.6 }}>{round.target.note}</p>
            </div>
            <button onClick={handleNext}
              className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: A, color: T.onAccent, fontFamily: FONT.display }}>
              {idx + 1 >= ROUNDS ? "See Results →" : "Next →"}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function HistoricalFlagScreen({ onBack, region }: Props) {
  const [replayKey, setReplayKey] = useState(0)
  return <HistoricalFlagScreenGame key={replayKey} onBack={onBack} region={region} onReplay={() => setReplayKey(k => k + 1)} />
}
