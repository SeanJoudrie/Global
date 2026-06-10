import { useState } from "react"
import { CODEX } from "../data/codex"
import type { HistoricalFlag } from "../data/codex"
import { FLAGS } from "../data/flags"

interface Props { onBack: () => void }

const ROUNDS = 6
function shuffle<T>(a: T[]): T[] { return [...a].sort(() => Math.random() - 0.5) }
const nameOf = (code: string) => FLAGS.find(f => f.code === code)?.name ?? code

// Countries with a deep enough flag history to form a lineage.
const ELIGIBLE = Object.entries(CODEX)
  .filter(([code, e]) => e.flagHistory.length >= 3 && FLAGS.some(f => f.code === code))
  .map(([code, e]) => ({ code, name: nameOf(code), history: e.flagHistory }))

interface Round { code: string; name: string; timeline: HistoricalFlag[]; choices: string[] }

function buildRounds(): Round[] {
  return shuffle(ELIGIBLE).slice(0, ROUNDS).map(c => {
    // Stored newest-first → reverse to oldest-first so the chain reads
    // oldest → … → modern. Cap to keep the board readable.
    const full = [...c.history].reverse()
    const timeline = full.length > 6 ? [full[0], ...full.slice(-5)] : full
    const others = shuffle(ELIGIBLE.filter(e => e.code !== c.code)).slice(0, 3).map(e => e.name)
    return { code: c.code, name: c.name, timeline, choices: shuffle([c.name, ...others]) }
  })
}

// More points the OLDER the flag you commit at: full points if you nail it from
// the oldest alone, sliding down toward a floor as you reveal newer flags.
function scoreFor(revealed: number, total: number): number {
  if (total <= 1) return 1000
  const frac = (total - revealed) / (total - 1) // 1 at the oldest, 0 once all shown
  return 150 + Math.round(frac * 850)
}

const yearOf = (h: HistoricalFlag) => h.fromYear ?? "?"

function MiniFlag({ src, w = 72 }: { src: string; w?: number }) {
  return (
    <img src={src} alt="" style={{ width: w, height: w * 0.62, objectFit: "cover", borderRadius: 4, border: "1px solid #8B6CFF22", flexShrink: 0, background: "#1E1640" }}
      onError={e => { (e.target as HTMLImageElement).style.opacity = "0.25" }} />
  )
}

function LineageGame({ onBack, onReplay }: Props & { onReplay: () => void }) {
  const [rounds] = useState(buildRounds)
  const [idx, setIdx] = useState(0)
  const [revealed, setRevealed] = useState(1)   // how many flags (oldest-first) are shown
  const [picked, setPicked] = useState<string | null>(null)
  const [results, setResults] = useState<{ correct: boolean; pts: number }[]>([])
  const [done, setDone] = useState(false)

  const round = rounds[idx]
  const total = round.timeline.length
  const answered = picked !== null
  const potential = scoreFor(revealed, total)

  const revealNext = () => {
    if (answered) return
    setRevealed(r => Math.min(total, r + 1))
  }

  const choose = (name: string) => {
    if (answered) return
    setPicked(name)
    const correct = name === round.name
    setResults(r => [...r, { correct, pts: correct ? potential : 0 }])
    setRevealed(total) // reveal the full chain so the player sees the lineage
  }

  const next = () => {
    if (idx + 1 >= rounds.length) { setDone(true); return }
    setIdx(i => i + 1)
    setRevealed(1)
    setPicked(null)
  }

  if (done) {
    const totalPts = results.reduce((s, r) => s + r.pts, 0)
    const maxPts = ROUNDS * 1000
    const correct = results.filter(r => r.correct).length
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl p-6 text-center mb-4" style={{ background: "#2D1F52", border: "1px solid #F59E0B44" }}>
            <div className="text-5xl mb-3">{totalPts >= maxPts * 0.7 ? "🌳" : correct >= ROUNDS * 0.5 ? "📜" : "🧬"}</div>
            <div className="text-5xl font-black mb-1" style={{ color: "#F5F3FF" }}>{totalPts.toLocaleString()}</div>
            <div className="text-sm mb-3" style={{ color: "#B8A9E0" }}>pts · {correct}/{ROUNDS} traced · max {maxPts.toLocaleString()}</div>
            <div className="flex justify-center gap-2 flex-wrap">{results.map((r, i) => <span key={i} style={{ fontSize: 22 }}>{r.correct ? "🟩" : "🟥"}</span>)}</div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={onReplay} className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95" style={{ background: "linear-gradient(135deg,#F59E0B,#FBBF24)", color: "#fff" }}>Play Again</button>
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
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Lineage</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>{idx + 1} / {ROUNDS}</div>
        </div>
        <div className="flex gap-1.5">
          {rounds.map((_, i) => (<div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: i < results.length ? (results[i].correct ? "#34D399" : "#F43F5E") : "#8B6CFF33" }} />))}
        </div>
      </header>

      <div className="flex flex-col items-center px-5 gap-4">
        <div className="text-sm font-semibold text-center" style={{ color: "#F59E0B" }}>
          Trace this flag's lineage — which modern country is it?
        </div>
        {!answered && (
          <div className="text-xs px-3 py-1 rounded-full" style={{ background: "#34D39922", color: "#34D399", border: "1px solid #34D39944" }}>
            Guess now for {potential} pts · reveal a newer flag to lower it
          </div>
        )}

        {/* Oldest → newest chain */}
        <div className="flex items-center gap-2 flex-wrap justify-center px-2 py-4 rounded-2xl w-full max-w-sm"
          style={{ background: "#2D1F52", border: "1px solid #F59E0B33" }}>
          {round.timeline.map((h, i) => {
            const shown = i < revealed
            const isNextToReveal = i === revealed && !answered
            return (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && <span style={{ color: "#F59E0B88", fontSize: 15 }}>→</span>}
                {shown ? (
                  <div className="flex flex-col items-center gap-1">
                    <MiniFlag src={h.flagUrl} w={i === 0 ? 84 : 70} />
                    <span style={{ fontSize: 9, color: "#F59E0B" }}>{yearOf(h)}</span>
                  </div>
                ) : isNextToReveal ? (
                  <button onClick={revealNext} className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
                    style={{ width: 70, height: 70 * 0.62, borderRadius: 4, background: "#1A1033", border: "1px dashed #F59E0B66", color: "#F59E0B", fontSize: 11, fontWeight: 700 }}>
                    👁 reveal
                  </button>
                ) : (
                  <div style={{ width: 70, height: 70 * 0.62, borderRadius: 4, background: "#1A1033", border: "1px solid #8B6CFF22", display: "flex", alignItems: "center", justifyContent: "center", color: "#8B6CFF55", fontSize: 16 }}>?</div>
                )}
              </div>
            )
          })}
        </div>

        {/* Country choices */}
        <div className="grid grid-cols-1 gap-2.5 w-full max-w-sm">
          {round.choices.map(c => {
            const isAnswer = c === round.name
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
          <>
            <div className="w-full max-w-sm px-4 py-3 rounded-xl" style={{ background: "#2D1F52", border: `1px solid ${results[idx].correct ? "#34D39944" : "#F43F5E44"}` }}>
              <p className="text-sm font-bold mb-1" style={{ color: results[idx].correct ? "#34D399" : "#F43F5E" }}>
                {results[idx].correct ? `✓ ${round.name} — +${results[idx].pts} pts` : `✗ That was ${round.name}`}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "#B8A9E0", lineHeight: 1.6 }}>{round.timeline[round.timeline.length - 1].note}</p>
            </div>
            <button onClick={next} className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95" style={{ background: "linear-gradient(135deg,#F59E0B,#FBBF24)", color: "#fff" }}>
              {idx + 1 >= ROUNDS ? "See Results →" : "Next →"}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function LineageScreen({ onBack }: Props) {
  const [replayKey, setReplayKey] = useState(0)
  return <LineageGame key={replayKey} onBack={onBack} onReplay={() => setReplayKey(k => k + 1)} />
}
