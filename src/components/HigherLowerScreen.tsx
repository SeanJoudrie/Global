import { useState } from "react"
import { FLAGS } from "../data/flags"
import { FLAG_ATTRIBS, STRIPES_V } from "../data/flagAttribs"

interface Props { onBack: () => void }

// ── Build a table of countable flag traits ───────────────────────────────────
interface Trait { label: string; emoji: string; count: number }

function buildTraits(): Trait[] {
  const withAttr = FLAGS.filter(f => FLAG_ATTRIBS[f.code])
  const countColor = (c: string) => withAttr.filter(f => FLAG_ATTRIBS[f.code].colors.includes(c)).length
  const countFeat  = (k: 'stripes' | 'cross' | 'star' | 'crescent' | 'emblem') =>
    withAttr.filter(f => FLAG_ATTRIBS[f.code][k]).length
  const countRegion = (r: string) => FLAGS.filter(f => f.region === r).length

  return [
    { label: "red",      emoji: "🟥", count: countColor("red") },
    { label: "blue",     emoji: "🟦", count: countColor("blue") },
    { label: "green",    emoji: "🟩", count: countColor("green") },
    { label: "yellow",   emoji: "🟨", count: countColor("yellow") },
    { label: "white",    emoji: "⬜", count: countColor("white") },
    { label: "black",    emoji: "⬛", count: countColor("black") },
    { label: "orange",   emoji: "🟧", count: countColor("orange") },
    { label: "a star",            emoji: "⭐", count: countFeat("star") },
    { label: "a crescent",        emoji: "🌙", count: countFeat("crescent") },
    { label: "a cross",           emoji: "✚", count: countFeat("cross") },
    { label: "a coat of arms",    emoji: "🛡️", count: countFeat("emblem") },
    { label: "horizontal stripes",emoji: "☰", count: countFeat("stripes") },
    { label: "vertical stripes",  emoji: "⫼", count: withAttr.filter(f => STRIPES_V.has(f.code)).length },
    { label: "a flag in Europe",      emoji: "🇪🇺", count: countRegion("Europe") },
    { label: "a flag in Africa",      emoji: "🌍", count: countRegion("Africa") },
    { label: "a flag in Asia",        emoji: "🌏", count: countRegion("Asia") },
    { label: "a flag in the Americas",emoji: "🌎", count: countRegion("Americas") },
  ]
}

const TRAITS = buildTraits()

interface Q { a: Trait; b: Trait; answer: boolean } // answer: is a's count > b's count?

function nextQuestion(): Q {
  for (let tries = 0; tries < 40; tries++) {
    const a = TRAITS[Math.floor(Math.random() * TRAITS.length)]
    const b = TRAITS[Math.floor(Math.random() * TRAITS.length)]
    if (a.label === b.label) continue
    if (Math.abs(a.count - b.count) < 3) continue // avoid near-ties
    return { a, b, answer: a.count > b.count }
  }
  return { a: TRAITS[0], b: TRAITS[1], answer: TRAITS[0].count > TRAITS[1].count }
}

export default function HigherLowerScreen({ onBack }: Props) {
  const [q, setQ] = useState<Q>(nextQuestion)
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(() => Number(localStorage.getItem("globalio_hl_best") ?? 0))
  const [reveal, setReveal] = useState<null | { correct: boolean }>(null)

  const answer = (guessMoreA: boolean) => {
    if (reveal) return
    const correct = guessMoreA === q.answer
    setReveal({ correct })
    if (correct) {
      const s = streak + 1
      setStreak(s)
      if (s > best) { setBest(s); localStorage.setItem("globalio_hl_best", String(s)) }
    }
  }

  const cont = () => {
    if (reveal?.correct) { setQ(nextQuestion()); setReveal(null) }
    else { setStreak(0); setQ(nextQuestion()); setReveal(null) }
  }

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Higher or Lower</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>Streak {streak}</div>
        </div>
        <div className="text-xs font-black" style={{ color: "#FBBF24" }}>🏆 {best}</div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-5 gap-5">
        <p className="text-sm" style={{ color: "#B8A9E0" }}>Are there more flags with…</p>

        {/* Trait A */}
        <div className="w-full max-w-sm rounded-2xl px-5 py-6 text-center"
          style={{ background: "#2D1F52", border: "1.5px solid #8B6CFF44" }}>
          <div style={{ fontSize: 36 }}>{q.a.emoji}</div>
          <div className="text-lg font-bold mt-1" style={{ color: "#F5F3FF" }}>{q.a.label}</div>
          {reveal && <div className="text-2xl font-black mt-1" style={{ color: "#A78BFA" }}>{q.a.count}</div>}
        </div>

        <div className="text-sm font-black" style={{ color: "#8B6CFF" }}>— than —</div>

        {/* Trait B */}
        <div className="w-full max-w-sm rounded-2xl px-5 py-6 text-center"
          style={{ background: "#2D1F52", border: "1.5px solid #8B6CFF44" }}>
          <div style={{ fontSize: 36 }}>{q.b.emoji}</div>
          <div className="text-lg font-bold mt-1" style={{ color: "#F5F3FF" }}>{q.b.label}</div>
          {reveal && <div className="text-2xl font-black mt-1" style={{ color: "#A78BFA" }}>{q.b.count}</div>}
        </div>

        {!reveal ? (
          <div className="flex gap-3 w-full max-w-sm">
            <button onClick={() => answer(true)}
              className="flex-1 py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#34D399,#10B981)", color: "#fff" }}>
              More ↑ (top)
            </button>
            <button onClick={() => answer(false)}
              className="flex-1 py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#F43F5E,#E11D48)", color: "#fff" }}>
              More ↓ (bottom)
            </button>
          </div>
        ) : (
          <div className="w-full max-w-sm flex flex-col gap-3 items-center">
            <div className="text-lg font-black" style={{ color: reveal.correct ? "#34D399" : "#F43F5E" }}>
              {reveal.correct ? "✓ Correct!" : `✗ Streak ended at ${streak}`}
            </div>
            <button onClick={cont}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
              {reveal.correct ? "Next →" : "Try Again"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
