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

interface Round { code: string; name: string; lineage: HistoricalFlag[]; current: HistoricalFlag; choices: string[] }

function buildRounds(): Round[] {
  return shuffle(ELIGIBLE).slice(0, ROUNDS).map(c => {
    // Stored newest-first → predecessors are everything after the current, shown oldest→newest.
    const current = c.history[0]
    const predecessors = c.history.slice(1).reverse().slice(-4) // up to 4 oldest→newest
    const others = shuffle(ELIGIBLE.filter(e => e.code !== c.code)).slice(0, 3).map(e => e.name)
    return { code: c.code, name: c.name, lineage: predecessors, current, choices: shuffle([c.name, ...others]) }
  })
}

function MiniFlag({ src, w = 64 }: { src: string; w?: number }) {
  return (
    <img src={src} alt="" style={{ width: w, height: w * 0.62, objectFit: "cover", borderRadius: 4, border: "1px solid #8B6CFF22", flexShrink: 0, background: "#1E1640" }}
      onError={e => { (e.target as HTMLImageElement).style.opacity = "0.25" }} />
  )
}

export default function LineageScreen({ onBack }: Props) {
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
    setScores(s => [...s, c === round.name])
  }
  const next = () => {
    if (idx + 1 >= rounds.length) { setDone(true); return }
    setIdx(i => i + 1); setPicked(null)
  }

  if (done) {
    const correct = scores.filter(Boolean).length
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl p-6 text-center mb-4" style={{ background: "#2D1F52", border: "1px solid #F59E0B44" }}>
            <div className="text-5xl mb-3">{correct >= ROUNDS * 0.8 ? "🌳" : correct >= ROUNDS * 0.5 ? "📜" : "🧬"}</div>
            <div className="text-5xl font-black mb-1" style={{ color: "#F5F3FF" }}>{correct} / {ROUNDS}</div>
            <div className="text-sm mb-3" style={{ color: "#B8A9E0" }}>lineages traced</div>
            <div className="flex justify-center gap-2 flex-wrap">{scores.map((s, i) => <span key={i} style={{ fontSize: 22 }}>{s ? "🟩" : "🟥"}</span>)}</div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => window.location.reload()} className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95" style={{ background: "linear-gradient(135deg,#F59E0B,#FBBF24)", color: "#fff" }}>Play Again</button>
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
          {rounds.map((_, i) => (<div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: i < scores.length ? (scores[i] ? "#34D399" : "#F43F5E") : "#8B6CFF33" }} />))}
        </div>
      </header>

      <div className="flex flex-col items-center px-5 gap-4">
        <div className="text-sm font-semibold text-center" style={{ color: "#F59E0B" }}>
          These flags evolved into one modern country. Which one?
        </div>

        {/* Lineage: oldest → newest predecessors */}
        <div className="flex items-center gap-2 flex-wrap justify-center px-2 py-4 rounded-2xl w-full max-w-sm"
          style={{ background: "#2D1F52", border: "1px solid #F59E0B33" }}>
          {round.lineage.map((h, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <MiniFlag src={h.flagUrl} />
                <span style={{ fontSize: 9, color: "#8B6CFF99" }}>{h.toYear ?? "?"}</span>
              </div>
              {i < round.lineage.length - 1 && <span style={{ color: "#F59E0B88", fontSize: 16 }}>→</span>}
            </div>
          ))}
          <span style={{ color: "#F59E0B88", fontSize: 16 }}>→</span>
          {/* The mystery current flag */}
          <div className="flex flex-col items-center gap-1">
            {answered
              ? <MiniFlag src={round.current.flagUrl} w={72} />
              : <div style={{ width: 72, height: 72 * 0.62, borderRadius: 4, background: "#1A1033", border: "1px dashed #F59E0B66", display: "flex", alignItems: "center", justifyContent: "center", color: "#F59E0B88", fontSize: 22 }}>?</div>}
            <span style={{ fontSize: 9, color: "#F59E0B" }}>today</span>
          </div>
        </div>

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
            <div className="w-full max-w-sm px-4 py-3 rounded-xl" style={{ background: "#2D1F52", border: "1px solid #8B6CFF22" }}>
              <p className="text-sm font-bold mb-1" style={{ color: "#F5F3FF" }}>{round.name} — {round.current.label}</p>
              <p className="text-xs leading-relaxed" style={{ color: "#B8A9E0", lineHeight: 1.6 }}>{round.current.note}</p>
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
