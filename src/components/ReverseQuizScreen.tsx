import { useState, useEffect } from "react"
import type { Question } from "../utils/quiz"

interface Props {
  questions: Question[]
  title: string
  onFinish: (answers: ("correct" | "wrong")[]) => void
  onBack: () => void
}

type AnswerState = "idle" | "correct" | "wrong"

export default function ReverseQuizScreen({ questions, title, onFinish, onBack }: Props) {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<("correct" | "wrong")[]>([])
  const [answerState, setAnswerState] = useState<AnswerState>("idle")
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [animatingIdx, setAnimatingIdx] = useState<number | null>(null)

  const q = questions[idx]

  useEffect(() => {
    setAnswerState("idle")
    setSelectedIdx(null)
    setAnimatingIdx(null)
  }, [idx])

  const handleChoice = (choiceIdx: number) => {
    if (answerState !== "idle") return
    const isCorrect = choiceIdx === q.correctIndex
    setSelectedIdx(choiceIdx)
    setAnswerState(isCorrect ? "correct" : "wrong")
    setAnimatingIdx(choiceIdx)
    setTimeout(() => setAnimatingIdx(null), 500)
    setAnswers(prev => [...prev, isCorrect ? "correct" : "wrong"])
  }

  const handleNext = () => {
    if (idx + 1 >= questions.length) {
      onFinish([...answers])
    } else {
      setIdx(i => i + 1)
    }
  }

  const borderColor = (i: number) => {
    if (answerState === "idle") return "#8B6CFF33"
    if (i === q.correctIndex) return "#34D399"
    if (i === selectedIdx && answerState === "wrong") return "#F43F5E"
    return "#8B6CFF22"
  }

  const overlayColor = (i: number) => {
    if (answerState === "idle") return "transparent"
    if (i === q.correctIndex) return "#34D39933"
    if (i === selectedIdx && answerState === "wrong") return "#F43F5E33"
    return "transparent"
  }

  const animClass = (i: number) => {
    if (animatingIdx !== i) return ""
    return i === q.correctIndex ? "animate-correct-bounce" : "animate-wrong-shake"
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
      <header className="flex items-center justify-between px-5 pt-8 pb-2" style={{ zIndex: 1 }}>
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>{title}</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>{idx + 1} / {questions.length}</div>
        </div>
        <div className="w-9" />
      </header>

      <div className="mx-5 mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "#2D1F52", zIndex: 1 }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(idx / questions.length) * 100}%`, background: "linear-gradient(90deg,#A78BFA,#8B6CFF)" }} />
      </div>

      <div className="flex-1 flex flex-col items-center px-5 py-5" style={{ zIndex: 1 }}>
        <div className="w-full max-w-sm mb-5 rounded-2xl p-5 text-center"
          style={{ background: "#2D1F52", border: "1px solid #8B6CFF44" }}>
          <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#A78BFA" }}>
            Which flag belongs to...
          </div>
          <div className="text-3xl font-black" style={{ color: "#F5F3FF" }}>{q.target.name}</div>
          <div className="text-sm mt-1" style={{ color: "#B8A9E0" }}>{q.target.region}</div>
        </div>

        <div className="w-full max-w-sm grid grid-cols-2 gap-3 mb-4">
          {q.choices.map((choice, i) => (
            <button key={choice.code} onClick={() => handleChoice(i)} disabled={answerState !== "idle"}
              className={`rounded-xl overflow-hidden transition-all active:scale-95 ${animClass(i)}`}
              style={{
                border: `2.5px solid ${borderColor(i)}`,
                cursor: answerState !== "idle" ? "default" : "pointer",
                position: "relative",
                boxShadow: answerState !== "idle" && i === q.correctIndex ? "0 0 16px #34D39944" : "none",
              }}>
              <img src={choice.flagUrl} alt={choice.name}
                style={{ width: "100%", height: 90, objectFit: "cover", display: "block" }}
                onError={e => { (e.target as HTMLImageElement).style.opacity = "0.3" }} />
              <div style={{
                position: "absolute", inset: 0,
                background: overlayColor(i),
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s",
              }}>
                {answerState !== "idle" && i === q.correctIndex && (
                  <span className="text-2xl">✓</span>
                )}
                {answerState !== "idle" && i === selectedIdx && answerState === "wrong" && (
                  <span className="text-2xl">✗</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {answerState !== "idle" && (
          <div className="w-full max-w-sm mb-3 px-4 py-3 rounded-xl animate-slide-up"
            style={{
              background: "#2D1F52",
              border: `1px solid ${answerState === "correct" ? "#34D39944" : "#F43F5E44"}`,
            }}>
            <div className="text-xs font-semibold" style={{ color: answerState === "correct" ? "#34D399" : "#F43F5E" }}>
              {answerState === "correct"
                ? `✓ Correct — ${q.target.name}`
                : `✗ That was the flag of ${q.target.name}`}
            </div>
          </div>
        )}

        {answerState !== "idle" && (
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
