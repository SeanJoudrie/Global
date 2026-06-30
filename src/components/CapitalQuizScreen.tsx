import { useState, useEffect, useRef } from "react"
import { Trophy, ThumbsUp, BookOpen } from "lucide-react"
import { CAPITALS } from "../data/capitals"
import type { CapitalRecord } from "../data/capitals"
import { CITIES } from "../data/cities"
import { T, ACCENT, FONT, tint } from "../ui/tokens"
import { ScreenHeader } from "./ui"
import { LineIcon } from "./icons"

interface Props { onBack: () => void }

type Phase = "menu" | "quiz" | "result"

interface CapQ {
  target: CapitalRecord
  choices: string[]
  correctIndex: number
}

const ACC = ACCENT.drill

const shuffle = <X,>(a: X[]): X[] => [...a].sort(() => Math.random() - 0.5)

function buildCapitalQuiz(count = 10): CapQ[] {
  const shuffled = shuffle([...CAPITALS]).slice(0, count)
  return shuffled.map(target => {
    const distractors: string[] = []
    // Up to 2 real *non-capital* cities from the same country — the sneaky part:
    // they're genuinely in that country, so you can't answer on vibes alone.
    const cities = shuffle((CITIES[target.code] ?? []).filter(c => c !== target.capital))
    for (const c of cities.slice(0, 2)) if (!distractors.includes(c)) distractors.push(c)
    // Fill the rest with other countries' capitals (prefer same region).
    const otherCaps = shuffle([
      ...CAPITALS.filter(c => c.region === target.region && c.code !== target.code),
      ...CAPITALS.filter(c => c.region !== target.region && c.code !== target.code),
    ])
    for (const c of otherCaps) {
      if (distractors.length >= 3) break
      if (c.capital !== target.capital && !distractors.includes(c.capital)) distractors.push(c.capital)
    }
    const allChoices = shuffle([target.capital, ...distractors])
    const correctIndex = allChoices.indexOf(target.capital)
    return { target, choices: allChoices, correctIndex }
  })
}

export default function CapitalQuizScreen({ onBack }: Props) {
  // Skip the intro/example screen — picking a capital is intuitive, so start
  // straight into the quiz.
  const [phase, setPhase] = useState<Phase>("quiz")
  const [questions, setQuestions] = useState<CapQ[]>(() => buildCapitalQuiz(10))
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<("correct" | "wrong")[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [animating, setAnimating] = useState<number | null>(null)

  const TOTAL = 10

  const startQuiz = () => {
    setQuestions(buildCapitalQuiz(TOTAL))
    setIdx(0)
    setAnswers([])
    setSelected(null)
    setAnimating(null)
    setPhase("quiz")
  }

  const q = questions[idx]
  const answered = selected !== null
  const score = answers.filter(a => a === "correct").length

  const animTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (animTimer.current) clearTimeout(animTimer.current) }, [])

  const handleAnswer = (i: number) => {
    if (answered) return
    const isCorrect = i === q.correctIndex
    setSelected(i)
    setAnimating(i)
    if (animTimer.current) clearTimeout(animTimer.current)
    animTimer.current = setTimeout(() => setAnimating(null), 500)
    setAnswers(prev => [...prev, isCorrect ? "correct" : "wrong"])
  }

  const handleNext = () => {
    if (idx + 1 >= questions.length) { setPhase("result"); return }
    setIdx(i => i + 1)
    setSelected(null)
    setAnimating(null)
  }

  const bgColor = (i: number) => {
    if (!answered) return T.surface
    if (i === q.correctIndex) return tint(T.green, 0.13)
    if (i === selected && i !== q.correctIndex) return tint(T.danger, 0.13)
    return T.surface
  }

  const borderColor = (i: number) => {
    if (!answered) return T.line
    if (i === q.correctIndex) return T.green
    if (i === selected && i !== q.correctIndex) return T.danger
    return T.line
  }

  const textColor = (i: number) => {
    if (!answered) return T.text
    if (i === q.correctIndex) return T.green
    if (i === selected && i !== q.correctIndex) return T.danger
    return T.muted
  }

  const animClass = (i: number) => {
    if (animating !== i) return ""
    return i === q.correctIndex ? "animate-correct-bounce" : "animate-wrong-shake"
  }

  if (phase === "result") {
    const pct = Math.round((score / TOTAL) * 100)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: T.bg, color: T.text }}>
        <div className="w-full max-w-sm" style={{ zIndex: 1, position: "relative" }}>
          <div className="rounded-2xl p-6 mb-4 text-center"
            style={{ background: T.surface, border: `1px solid ${T.line}` }}>
            <div className="mb-3 flex justify-center" style={{ color: pct >= 80 ? T.gold : ACC }}>
              {pct >= 80
                ? <Trophy size={44} strokeWidth={1.6} absoluteStrokeWidth />
                : pct >= 50
                  ? <ThumbsUp size={44} strokeWidth={1.6} absoluteStrokeWidth />
                  : <BookOpen size={44} strokeWidth={1.6} absoluteStrokeWidth />}
            </div>
            <div className="text-6xl mb-1" style={{ color: T.text, fontFamily: FONT.mono, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{score}/{TOTAL}</div>
            <div className="text-sm mb-3" style={{ color: T.muted }}>Capital Cities Quiz</div>
            <div className="flex justify-center gap-1 mb-4">
              {answers.map((a, i) => (
                <span key={i} style={{ width: 14, height: 14, borderRadius: 3, background: a === "correct" ? T.green : T.danger, display: "inline-block" }} />
              ))}
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: T.line }}>
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: ACC }} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={startQuiz}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: ACC, color: T.onAccent, fontFamily: FONT.display }}>Play Again</button>
            <button onClick={onBack}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>&#8592; Home</button>
          </div>
        </div>
      </div>
    )
  }

  if (!q) return null

  return (
    <div className="min-h-screen flex flex-col" style={{ background: T.bg, color: T.text }}>
      <ScreenHeader title="Capital Cities" subtitle={`${score} correct so far`} onBack={onBack}
        right={
          <span style={{ fontFamily: FONT.mono, fontVariantNumeric: "tabular-nums", fontWeight: 700, fontSize: 14, color: ACC, padding: "5px 11px", borderRadius: 999, background: tint(ACC, 0.1), border: `1px solid ${tint(ACC, 0.3)}` }}>
            {idx + 1} / {TOTAL}
          </span>
        } />

      <div className="mx-5 mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: T.line, zIndex: 1 }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(answers.length / TOTAL) * 100}%`, background: ACC }} />
      </div>

      <div className="flex-1 flex flex-col items-center px-5 py-4" style={{ zIndex: 1 }}>
        <div className="w-full max-w-sm mb-5 rounded-2xl p-5 text-center"
          style={{ background: T.surface, border: `1px solid ${T.line}` }}>
          <div className="text-xs font-semibold uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5" style={{ color: ACC }}>
            <LineIcon name="capitalquiz" size={13} color={ACC} /> Capital of...
          </div>
          <div className="text-3xl mb-1" style={{ color: T.text, fontFamily: FONT.display, fontWeight: 800 }}>{q.target.country}</div>
          <div className="text-sm" style={{ color: T.muted }}>{q.target.region}</div>
        </div>

        <div className="w-full max-w-sm grid grid-cols-2 gap-3 mb-4">
          {q.choices.map((choice, i) => (
            <button key={i} onClick={() => handleAnswer(i)} disabled={answered}
              className={`py-4 px-3 rounded-xl font-semibold text-sm text-center transition-colors active:scale-95 ${animClass(i)}`}
              style={{
                background: bgColor(i),
                border: `1.5px solid ${borderColor(i)}`,
                color: textColor(i),
                cursor: answered ? "default" : "pointer",
              }}>
              {choice}
            </button>
          ))}
        </div>

        {answered && (
          <div className="w-full max-w-sm mb-3 px-4 py-3 rounded-xl animate-slide-up"
            style={{ background: T.surface, border: `1px solid ${tint(selected === q.correctIndex ? T.green : T.danger, 0.4)}` }}>
            <div className="text-xs font-semibold" style={{ color: selected === q.correctIndex ? T.green : T.danger }}>
              {selected === q.correctIndex
                ? `✓ Correct! ${q.target.capital} is the capital of ${q.target.country}.`
                : `✗ The capital of ${q.target.country} is ${q.target.capital}.`}
            </div>
          </div>
        )}

        {answered && (
          <button onClick={handleNext}
            className="w-full max-w-sm py-3.5 rounded-xl font-bold text-base transition-all active:scale-95 animate-slide-up"
            style={{ background: ACC, color: T.onAccent, fontFamily: FONT.display }}>
            {idx + 1 >= questions.length ? "See Results →" : "Next →"}
          </button>
        )}
      </div>
    </div>
  )
}
