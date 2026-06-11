import { useState, useMemo } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"
import { FLAG_ATTRIBS, STRIPES_V } from "../data/flagAttribs"

interface Props { onBack: () => void }

const ELIGIBLE = FLAGS.filter(f => FLAG_ATTRIBS[f.code])
const ROUNDS = 5

const COLOR_WORD: Record<string, string> = {
  red: "red", blue: "blue", green: "green", yellow: "gold",
  white: "white", black: "black", orange: "orange",
}

// Build the descriptive clue lines for a flag (visual only, no name).
function describe(f: FlagRecord): string[] {
  const a = FLAG_ATTRIBS[f.code]
  const lines: string[] = []
  const colors = a.colors.map(c => COLOR_WORD[c] ?? c)
  if (colors.length === 1) lines.push(`A solid ${colors[0]} field.`)
  else lines.push(`Colours: ${colors.join(", ")}.`)
  if (a.stripes) lines.push("It has horizontal stripes.")
  if (STRIPES_V.has(f.code)) lines.push("It has vertical stripes.")
  if (a.cross) lines.push("There is a cross.")
  if (a.star) lines.push("There is at least one star.")
  if (a.crescent) lines.push("There is a crescent moon.")
  if (a.emblem) lines.push("It carries a coat of arms or central emblem.")
  return lines
}

interface Round { target: FlagRecord; clues: string[] }

function buildRounds(): Round[] {
  return [...ELIGIBLE].sort(() => Math.random() - 0.5).slice(0, ROUNDS).map(target => {
    const clues = describe(target)
    // region + fun-fact as deeper hints
    clues.push(`Region: ${target.region}.`)
    if (target.distinguishingTip) clues.push(`Tip: ${target.distinguishingTip}`)
    return { target, clues }
  })
}

export default function DescribeItScreen({ onBack }: Props) {
  const [rounds] = useState(buildRounds)
  const [idx, setIdx] = useState(0)
  const [shown, setShown] = useState(2)         // clue lines revealed
  const [input, setInput] = useState("")
  const [showDrop, setShowDrop] = useState(false)
  const [result, setResult] = useState<null | { correct: boolean }>(null)
  const [scores, setScores] = useState<number[]>([])
  const [done, setDone] = useState(false)

  const round = rounds[idx]

  const matches = useMemo(() => {
    const q = input.trim().toLowerCase()
    if (q.length < 1) return []
    return FLAGS.filter(f => f.name.toLowerCase().includes(q) || f.code.toLowerCase() === q).slice(0, 5)
  }, [input])

  const submit = (f: FlagRecord) => {
    if (result) return
    const correct = f.code === round.target.code
    setInput(""); setShowDrop(false)
    if (correct) {
      const pts = Math.max(100, 600 - (shown - 2) * 100)
      setScores(s => [...s, pts]); setResult({ correct: true })
    } else {
      // reveal one more clue; if out of clues, fail the round
      if (shown < round.clues.length) setShown(s => s + 1)
      else { setScores(s => [...s, 0]); setResult({ correct: false }) }
    }
  }

  const next = () => {
    if (idx + 1 >= ROUNDS) { setDone(true); return }
    setIdx(i => i + 1); setShown(2); setInput(""); setResult(null)
  }

  if (done) {
    const total = scores.reduce((a, b) => a + b, 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl p-6 text-center mb-4"
            style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 0 32px #8B6CFF22" }}>
            <div className="text-5xl mb-3">🔤</div>
            <div className="text-5xl font-black mb-1" style={{ color: "#F5F3FF" }}>{total.toLocaleString()}</div>
            <div className="text-sm mb-3" style={{ color: "#B8A9E0" }}>pts · {scores.filter(s => s > 0).length}/{ROUNDS} solved</div>
            <div className="flex justify-center gap-2">{scores.map((s, i) => <span key={i} style={{ fontSize: 22 }}>{s > 0 ? "🟩" : "🟥"}</span>)}</div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => window.location.reload()}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>Play Again</button>
            <button onClick={onBack}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "#2D1F52", border: "1px solid #8B6CFF33", color: "#B8A9E0" }}>← Home</button>
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
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Describe-It</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>{idx + 1} / {ROUNDS}</div>
        </div>
        <div style={{ width: 36 }} />
      </header>

      <div className="flex flex-col items-center px-5 gap-4">
        <p className="text-xs text-center" style={{ color: "#B8A9E0" }}>No image — name the flag from its description. Each wrong guess reveals another clue.</p>

        {/* Clue card */}
        <div className="w-full max-w-sm rounded-2xl p-5" style={{ background: "#2D1F52", border: "1.5px solid #8B6CFF44" }}>
          {round.clues.slice(0, shown).map((c, i) => (
            <p key={i} className="text-base leading-relaxed" style={{ color: i === 0 ? "#F5F3FF" : "#D4CCF0", marginBottom: 8 }}>
              <span style={{ color: "#8B6CFF" }}>•</span> {c}
            </p>
          ))}
          {!result && shown < round.clues.length && (
            <p className="text-xs mt-1" style={{ color: "#8B6CFF66" }}>{round.clues.length - shown} more clue(s) on a wrong guess</p>
          )}
        </div>

        {result ? (
          <>
            {/* reveal the flag now that the round is over */}
            <div style={{ width: 220, height: 147, borderRadius: 12, overflow: "hidden", border: `2px solid ${result.correct ? "#34D399" : "#F43F5E"}`, boxShadow: "0 0 24px #00000044" }}>
              <img src={round.target.flagUrl} alt={round.target.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={e => { (e.target as HTMLImageElement).style.opacity = "0.3" }} />
            </div>
            <div className="w-full max-w-sm px-4 py-3 rounded-xl"
              style={{ background: "#2D1F52", border: `1px solid ${result.correct ? "#34D39944" : "#F43F5E44"}` }}>
              <p className="text-sm font-bold" style={{ color: result.correct ? "#34D399" : "#F43F5E" }}>
                {result.correct ? `✓ ${round.target.name} — +${scores[scores.length - 1]}` : `✗ It was ${round.target.name}`}
              </p>
            </div>
            <button onClick={next}
              className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
              {idx + 1 >= ROUNDS ? "See Results →" : "Next →"}
            </button>
          </>
        ) : (
          <div className="w-full max-w-sm relative">
            <input value={input} autoFocus autoComplete="off"
              onChange={e => { setInput(e.target.value); setShowDrop(true) }}
              onFocus={() => setShowDrop(true)} onBlur={() => setTimeout(() => setShowDrop(false), 150)}
              onKeyDown={e => { if (e.key === "Enter" && matches.length === 1) submit(matches[0]) }}
              placeholder="Type a country name or code…"
              className="w-full px-4 py-3.5 rounded-xl outline-none font-semibold"
              style={{ background: "#2D1F52", border: "1.5px solid #8B6CFF44", color: "#F5F3FF", fontSize: 15 }} />
            {showDrop && matches.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 rounded-xl overflow-hidden z-20"
                style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 8px 32px #00000055" }}>
                {matches.map(f => (
                  <button key={f.code} onMouseDown={() => submit(f)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:brightness-125"
                    style={{ background: "transparent", borderBottom: "1px solid #8B6CFF11" }}>
                    <img src={f.flagUrl} alt="" style={{ width: 32, height: 21, objectFit: "cover", borderRadius: 3 }} />
                    <span style={{ color: "#F5F3FF", fontWeight: 600 }}>{f.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
