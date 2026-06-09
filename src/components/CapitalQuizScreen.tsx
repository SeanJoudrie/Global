import { useState } from "react"
import { CAPITALS } from "../data/capitals"
import type { CapitalRecord } from "../data/capitals"

interface Props { onBack: () => void }

type Phase = "menu" | "quiz" | "result"

interface CapQ {
  target: CapitalRecord
  choices: string[]
  correctIndex: number
}

function buildCapitalQuiz(count = 10): CapQ[] {
  const shuffled = [...CAPITALS].sort(() => Math.random() - 0.5).slice(0, count)
  return shuffled.map(target => {
    const sameRegion = CAPITALS.filter(c => c.region === target.region && c.code !== target.code)
    const distractors = [...sameRegion].sort(() => Math.random() - 0.5).slice(0, 3)
    while (distractors.length < 3) {
      const fallback = CAPITALS.filter(c => c.code !== target.code && !distractors.find(d => d.code === c.code))
      const pick = fallback[Math.floor(Math.random() * fallback.length)]
      if (pick) distractors.push(pick)
    }
    const allChoices = [target.capital, ...distractors.map(d => d.capital)].sort(() => Math.random() - 0.5)
    const correctIndex = allChoices.indexOf(target.capital)
    return { target, choices: allChoices, correctIndex }
  })
}

export default function CapitalQuizScreen({ onBack }: Props) {
  const [phase, setPhase] = useState<Phase>("menu")
  const [questions, setQuestions] = useState<CapQ[]>([])
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

  if (phase === "menu") {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <header className="flex items-center gap-3 px-5 pt-8 pb-4" style={{ zIndex: 1, position: "relative" }}>
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
            style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
          <h1 className="text-2xl font-black" style={{ color: "#F5F3FF" }}>Capital Cities</h1>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-5 gap-5" style={{ zIndex: 1, position: "relative" }}>
          <div className="text-6xl">🏛️</div>
          <div className="text-center">
            <h2 className="text-xl font-black mb-2" style={{ color: "#F5F3FF" }}>Name that Capital</h2>
            <p className="text-sm" style={{ color: "#B8A9E0" }}>
              10 random countries · pick the correct capital city
            </p>
          </div>
          <div className="w-full max-w-sm rounded-2xl p-4" style={{ background: "#2D1F52", border: "1px solid #8B6CFF33" }}>
            <div className="text-xs font-semibold mb-2" style={{ color: "#A78BFA" }}>Example question</div>
            <div className="font-bold mb-3" style={{ color: "#F5F3FF" }}>What is the capital of France?</div>
            <div className="grid grid-cols-2 gap-2">
              {["Paris ✓", "Lyon", "Berlin", "Brussels"].map(c => (
                <div key={c} className="py-2 px-3 rounded-lg text-sm text-center"
                  style={{ background: c.includes("✓") ? "#34D39922" : "#1A1033",
                    border: `1px solid ${c.includes("✓") ? "#34D399" : "#8B6CFF22"}`,
                    color: c.includes("✓") ? "#34D399" : "#B8A9E0" }}>
                  {c}
                </div>
              ))}
            </div>
          </div>
          <button onClick={startQuiz}
            className="w-full max-w-sm py-4 rounded-2xl font-bold text-lg transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff", boxShadow: "0 4px 20px #8B6CFF55" }}>
            Start Quiz →
          </button>
        </div>
      </div>
    )
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
