import { useState } from "react"
import { FLAGS } from "../data/flags"
import { FLAG_ATTRIBS, STRIPES_V } from "../data/flagAttribs"
import { T, ACCENT, FONT, tint } from "../ui/tokens"

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
    <div className="min-h-screen flex flex-col" style={{ background: T.bg }}>
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>&#8249;</button>
        <div className="text-center">
          <div className="geo-micro" style={{ fontSize: 9, color: T.muted }}>Higher or Lower</div>
          <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 16, color: ACCENT.play }}>Streak {streak}</div>
        </div>
        <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 13, color: T.amber }}>🏆 {best}</div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-5 gap-5">
        <p style={{ fontSize: 13, color: T.muted }}>Tap the one you think has more — or use the buttons.</p>

        {/* Trait A — tap it to say "this one has more" */}
        <button onClick={() => answer(true)} disabled={!!reveal}
          className="geo-tap w-full max-w-sm rounded-2xl px-5 py-6 text-center"
          style={{ background: reveal && q.answer ? tint(T.green, 0.18) : T.surface, border: `1.5px solid ${reveal && q.answer ? T.green : tint(ACCENT.play, 0.4)}`, cursor: reveal ? "default" : "pointer", transition: "background 0.2s ease, border-color 0.2s ease" }}>
          <div style={{ fontSize: 36 }}>{q.a.emoji}</div>
          <div className="geo-display" style={{ fontSize: 18, fontWeight: 700, marginTop: 4, color: T.text }}>{q.a.label}</div>
          {reveal && <div style={{ fontFamily: FONT.mono, fontSize: 24, fontWeight: 800, marginTop: 4, color: ACCENT.play }}>{q.a.count}</div>}
        </button>

        <div className="geo-micro" style={{ fontSize: 11, color: T.muted }}>— than —</div>

        {/* Trait B — tap it to say "this one has more" */}
        <button onClick={() => answer(false)} disabled={!!reveal}
          className="geo-tap w-full max-w-sm rounded-2xl px-5 py-6 text-center"
          style={{ background: reveal && !q.answer ? tint(T.green, 0.18) : T.surface, border: `1.5px solid ${reveal && !q.answer ? T.green : tint(ACCENT.play, 0.4)}`, cursor: reveal ? "default" : "pointer", transition: "background 0.2s ease, border-color 0.2s ease" }}>
          <div style={{ fontSize: 36 }}>{q.b.emoji}</div>
          <div className="geo-display" style={{ fontSize: 18, fontWeight: 700, marginTop: 4, color: T.text }}>{q.b.label}</div>
          {reveal && <div style={{ fontFamily: FONT.mono, fontSize: 24, fontWeight: 800, marginTop: 4, color: ACCENT.play }}>{q.b.count}</div>}
        </button>

        {!reveal ? (
          <div className="flex gap-3 w-full max-w-sm">
            <button onClick={() => answer(true)} className="geo-tap flex-1 py-3.5 rounded-xl"
              style={{ background: T.green, color: T.onAccent, fontFamily: FONT.display, fontWeight: 700 }}>
              More ↑ (top)
            </button>
            <button onClick={() => answer(false)} className="geo-tap flex-1 py-3.5 rounded-xl"
              style={{ background: T.warm, color: T.onAccent, fontFamily: FONT.display, fontWeight: 700 }}>
              More ↓ (bottom)
            </button>
          </div>
        ) : (
          <div className="w-full max-w-sm flex flex-col gap-3 items-center">
            <div className="geo-display" style={{ fontSize: 17, fontWeight: 700, color: reveal.correct ? T.green : T.warm }}>
              {reveal.correct ? "✓ Correct!" : `✗ Streak ended at ${streak}`}
            </div>
            <button onClick={cont} className="geo-tap w-full py-3.5 rounded-xl"
              style={{ background: ACCENT.play, color: T.onAccent, fontFamily: FONT.display, fontWeight: 700 }}>
              {reveal.correct ? "Next →" : "Try Again"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
