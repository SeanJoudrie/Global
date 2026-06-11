import { useState } from "react"
import { CAPITALS } from "../data/capitals"
import type { CapitalRecord } from "../data/capitals"
import { CITIES } from "../data/cities"

interface Props { onBack: () => void }

type Phase = "menu" | "quiz" | "result"

interface CapQ {
  target: CapitalRecord
  choices: string[]
  correctIndex: number
}

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

  const handleAnswer = (i: number) => {
    if (answered) return
    const isCorrect = i === q.correctIndex
    setSelected(i)
    setAnimating(i)
    setTimeout(() => setAnimating(null), 500)
    setAnswers(prev => [...prev, isCorrect ? "correct" : "wrong"])
  }

  const handleNext = () => {
    if (idx + 1 >= questions.length) { setPhase("result"); return }
    setIdx(i => i + 1)
    setSelected(null)
    setAnimating(null)
  }

  const bgColor = (i: number) => {
    if (!answered) return "#2D1F52"
    if (i === q.correctIndex) return "#34D39922"
    if (i === selected && i !== q.correctIndex) return "#F43F5E22"
    return "#2D1F52"
  }

  const borderColor = (i: number) => {
    if (!answered) return "#8B6CFF33"
    if (i === q.correctIndex) return "#34D399"
    if (i === selected && i !== q.correctIndex) return "#F43F5E"
    return "#8B6CFF22"
  }

  const textColor = (i: number) => {
    if (!answered) return "#F5F3FF"
    if (i === q.correctIndex) return "#34D399"
    if (i === selected && i !== q.correctIndex) return "#F43F5E"
    return "#B8A9E0"
  }

  const animClass = (i: number) => {
    if (animating !== i) return ""
    return i === q.correctIndex ? "animate-correct-bounce" : "animate-wrong-shake"
  }

  if (phase === "result") {
    const pct = Math.round((score / TOTAL) * 100)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm" style={{ zIndex: 1, position: "relative" }}>
          <div className="rounded-2xl p-6 mb-4 text-center"
            style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 0 32px #8B6CFF22" }}>
            <div className="text-5xl mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚"}</div>
            <div className="text-6xl font-black mb-1" style={{ color: "#F5F3FF" }}>{score}/{TOTAL}</div>
            <div className="text-sm mb-3" style={{ color: "#B8A9E0" }}>Capital Cities Quiz</div>
            <div className="flex justify-center gap-1 mb-4">
              {answers.map((a, i) => <span key={i}>{a === "correct" ? "🟩" : "🟥"}</span>)}
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#1A1033" }}>
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#8B6CFF,#A78BFA)" }} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={startQuiz}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>Play Again</button>
            <button onClick={onBack}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "#2D1F52", border: "1px solid #8B6CFF22", color: "#B8A9E0" }}>&#8592; Home</button>
          </div>
        </div>
      </div>
    )
  }

  if (!q) return null

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
      <header className="flex items-center justify-between px-5 pt-8 pb-2" style={{ zIndex: 1 }}>
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Capital Cities</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>{idx + 1} / {TOTAL}</div>
        </div>
        <div className="w-9" />
      </header>

      <div className="mx-5 mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "#2D1F52", zIndex: 1 }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(idx / TOTAL) * 100}%`, background: "linear-gradient(90deg,#8B6CFF,#A78BFA)" }} />
      </div>

      <div className="flex-1 flex flex-col items-center px-5 py-4" style={{ zIndex: 1 }}>
        <div className="w-full max-w-sm mb-5 rounded-2xl p-5 text-center"
          style={{ background: "#2D1F52", border: "1px solid #8B6CFF44" }}>
          <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#A78BFA" }}>
            🏛️ Capital of...
          </div>
          <div className="text-3xl font-black mb-1" style={{ color: "#F5F3FF" }}>{q.target.country}</div>
          <div className="text-sm" style={{ color: "#B8A9E0" }}>{q.target.region}</div>
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
            style={{ background: "#2D1F52", border: `1px solid ${selected === q.correctIndex ? "#34D39944" : "#F43F5E44"}` }}>
            <div className="text-xs font-semibold" style={{ color: selected === q.correctIndex ? "#34D399" : "#F43F5E" }}>
              {selected === q.correctIndex
                ? `✓ Correct! ${q.target.capital} is the capital of ${q.target.country}.`
                : `✗ The capital of ${q.target.country} is ${q.target.capital}.`}
            </div>
          </div>
        )}

        {answered && (
          <button onClick={handleNext}
            className="w-full max-w-sm py-3.5 rounded-xl font-bold text-base transition-all active:scale-95 animate-slide-up"
            style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
            {idx + 1 >= questions.length ? "See Results →" : "Next →"}
          </button>
        )}
      </div>
    </div>
  )
}
