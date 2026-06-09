import { useState, useEffect } from "react"
import { LANGUAGES, detectScript, scriptFont, languageNote } from "../data/languages"
import type { LanguageRecord, Difficulty } from "../data/languages"
import { shuffleWithSeed, seededRandom } from "../utils/prng"

interface Props { onBack: () => void }

type Phase = "menu" | "quiz" | "result"

// Build 3 distractors. We pull from ALL languages and strongly prefer the SAME writing
// system as the target, so you can't win just by recognising the alphabet.
function getChoices(target: LanguageRecord, all: LanguageRecord[], seed: string): LanguageRecord[] {
  const rng = seededRandom(seed + target.code)
  const targetScript = detectScript(target.sample)
  const pool = all.filter(l => l.code !== target.code)
  const picks: LanguageRecord[] = []

  // 1. Curated confusables first
  for (const c of target.confusableWith) {
    const l = pool.find(p => p.code === c)
    if (l && !picks.find(p => p.code === l.code)) picks.push(l)
  }
  // 2. Same-script languages (the key anti-giveaway step)
  const sameScript = pool
    .filter(l => detectScript(l.sample) === targetScript && !picks.find(p => p.code === l.code))
    .sort(() => rng() - 0.5)
  picks.push(...sameScript)
  // 3. Anything else as a last resort
  const rest = pool
    .filter(l => !picks.find(p => p.code === l.code))
    .sort(() => rng() - 0.5)
  picks.push(...rest)

  return [target, ...picks.slice(0, 3)].sort(() => rng() - 0.5)
}

const DIFF_COLORS: Record<Difficulty, { bg: string; border: string; label: string }> = {
  easy:    { bg: "#34D39922", border: "#34D399", label: "🟢 Easy" },
  medium:  { bg: "#F59E0B22", border: "#F59E0B", label: "🟡 Medium" },
  hard:    { bg: "#F43F5E22", border: "#F43F5E", label: "🔴 Hard" },
  extreme: { bg: "#8B6CFF22", border: "#8B6CFF", label: "💀 Extreme" },
}

export default function LanguageQuizScreen({ onBack }: Props) {
  const [phase, setPhase] = useState<Phase>("menu")
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [questions, setQuestions] = useState<{ target: LanguageRecord; choices: LanguageRecord[] }[]>([])
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<("correct" | "wrong")[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [showRoman, setShowRoman] = useState(false)

  const TOTAL = 10

  const startQuiz = (diff: Difficulty) => {
    setDifficulty(diff)
    const pool = LANGUAGES.filter(l => l.difficulty === diff)
    const seed = Date.now().toString() + diff
    const shuffled = shuffleWithSeed(pool, seed).slice(0, TOTAL)
    // Distractors are drawn from the whole language set (preferring the same script),
    // not just this difficulty — so e.g. Classical Chinese sits next to Mandarin.
    const qs = shuffled.map((t, i) => ({ target: t, choices: getChoices(t, LANGUAGES, seed + i) }))
    setQuestions(qs)
    setIdx(0)
    setAnswers([])
    setSelected(null)
    setShowRoman(false)
    setPhase("quiz")
  }

  const q = questions[idx]

  useEffect(() => { setSelected(null); setShowRoman(false) }, [idx])

  const handleAnswer = (choiceIdx: number) => {
    if (selected !== null) return
    setSelected(choiceIdx)
    const correct = q.choices[choiceIdx].code === q.target.code
    setAnswers(prev => [...prev, correct ? "correct" : "wrong"])
  }

  const handleNext = () => {
    if (idx + 1 >= questions.length) { setPhase("result"); return }
    setIdx(i => i + 1)
  }

  const score = answers.filter(a => a === "correct").length

  if (phase === "menu") {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <header className="flex items-center gap-3 px-5 pt-8 pb-4" style={{ zIndex: 1, position: "relative" }}>
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
            style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
          <h1 className="text-2xl font-black" style={{ color: "#F5F3FF" }}>Guess the Language</h1>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-5 gap-5" style={{ zIndex: 1, position: "relative" }}>
          <div className="text-6xl">🌐</div>
          <div className="text-center">
            <h2 className="text-xl font-black mb-2" style={{ color: "#F5F3FF" }}>Which language is this?</h2>
            <p className="text-sm" style={{ color: "#B8A9E0" }}>Read a sentence and identify the language from 4 choices.</p>
          </div>
          <div className="w-full max-w-sm space-y-3">
            {(["easy", "medium", "hard", "extreme"] as Difficulty[]).map(d => (
              <button key={d} onClick={() => startQuiz(d)}
                className="w-full py-4 px-5 rounded-2xl text-left transition-all active:scale-95 hover:brightness-110"
                style={{ background: DIFF_COLORS[d].bg, border: `1px solid ${DIFF_COLORS[d].border}66`, color: "#F5F3FF" }}>
                <div className="font-bold text-base">{DIFF_COLORS[d].label}</div>
                <div className="text-xs mt-0.5" style={{ color: "#B8A9E0" }}>
                  {d === "easy" && "Major world languages — Spanish, French, Mandarin…"}
                  {d === "medium" && "Familiar but tricky — Polish, Greek, Hebrew…"}
                  {d === "hard" && "Obscure & similar-looking — Basque, Georgian, Welsh…"}
                  {d === "extreme" && "Ancient & dead languages — Latin, Sanskrit, Gothic…"}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (phase === "result") {
    const total = questions.length || TOTAL
    const pct = Math.round((score / total) * 100)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm" style={{ zIndex: 1, position: "relative" }}>
          <div className="rounded-2xl p-6 mb-4 text-center"
            style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 0 32px #8B6CFF22" }}>
            <div className="text-5xl mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚"}</div>
            <div className="text-6xl font-black mb-1" style={{ color: "#F5F3FF" }}>{score}/{total}</div>
            <div className="text-sm mb-3" style={{ color: "#B8A9E0" }}>Guess the Language · {DIFF_COLORS[difficulty].label}</div>
            <div className="flex justify-center gap-1 mb-4">
              {answers.map((a, i) => <span key={i}>{a === "correct" ? "🟩" : "🟥"}</span>)}
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#1A1033" }}>
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#8B6CFF,#A78BFA)" }} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => startQuiz(difficulty)}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>Play Again</button>
            <button onClick={() => setPhase("menu")}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "#2D1F52", border: "1px solid #8B6CFF33", color: "#B8A9E0" }}>Change Difficulty</button>
            <button onClick={onBack}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "#2D1F52", border: "1px solid #8B6CFF22", color: "#B8A9E0" }}>&#8592; Home</button>
          </div>
        </div>
      </div>
    )
  }

  if (!q) return null

  const answered = selected !== null
  const correctIdx = q.choices.findIndex(c => c.code === q.target.code)
  const diff = DIFF_COLORS[difficulty]

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
      <header className="flex items-center justify-between px-5 pt-8 pb-2" style={{ zIndex: 1, position: "relative" }}>
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>
            Guess the Language · {difficulty}
          </div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>{idx + 1} / {questions.length}</div>
        </div>
        <div className="w-9" />
      </header>

      <div className="mx-5 mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "#2D1F52", zIndex: 1 }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(idx / questions.length) * 100}%`, background: diff.border }} />
      </div>

      <div className="flex-1 flex flex-col px-5 py-4" style={{ zIndex: 1, position: "relative" }}>
        <div className="rounded-2xl p-5 mb-4"
          style={{ background: "#2D1F52", border: `1px solid ${diff.border}44` }}>
          <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: diff.border }}>
            🌐 What language is this?
          </div>
          <p className="text-xl leading-relaxed font-semibold" style={{
            color: "#F5F3FF",
            fontFamily: (showRoman && !q.target.isLatinScript) ? undefined : scriptFont(detectScript(q.target.sample)),
          }}>
            {showRoman && !q.target.isLatinScript ? q.target.romanized : q.target.sample}
          </p>
          {!q.target.isLatinScript && (
            <button onClick={() => setShowRoman(s => !s)}
              className="mt-3 text-xs px-3 py-1 rounded-full transition-all active:scale-95"
              style={{ background: "#8B6CFF22", color: "#A78BFA", border: "1px solid #8B6CFF44" }}>
              {showRoman ? "🔤 Show original script" : "Aa Show Latin alphabet"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {q.choices.map((choice, i) => {
            let bg = "#2D1F52"
            let border = "#8B6CFF33"
            let color = "#F5F3FF"
            if (answered) {
              if (i === correctIdx) { bg = "#34D39922"; border = "#34D399"; color = "#34D399" }
              else if (i === selected) { bg = "#F43F5E22"; border = "#F43F5E"; color = "#F43F5E" }
            }
            return (
              <button key={choice.code} onClick={() => handleAnswer(i)} disabled={answered}
                className="py-4 px-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
                style={{ background: bg, border: `1.5px solid ${border}`, color, cursor: answered ? "default" : "pointer" }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{choice.name}</div>
                <div style={{ fontSize: 11, fontWeight: 400, marginTop: 2, opacity: 0.6 }}>{choice.nativeName}</div>
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="rounded-xl p-4 mb-4 animate-slide-up"
            style={{ background: "#2D1F52", border: `1px solid ${selected === correctIdx ? "#34D39944" : "#F43F5E44"}` }}>
            <div className="text-xs font-semibold mb-1" style={{ color: selected === correctIdx ? "#34D399" : "#F43F5E" }}>
              {selected === correctIdx ? `✓ Correct — ${q.target.name}` : `✗ That was ${q.target.name}`}
            </div>
            <p className="text-sm" style={{ color: "#F5F3FF" }}>{languageNote(q.target)}</p>
          </div>
        )}

        {answered && (
          <button onClick={handleNext}
            className="w-full py-3.5 rounded-xl font-bold text-base transition-all active:scale-95 animate-slide-up"
            style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
            {idx + 1 >= questions.length ? "See Results →" : "Next →"}
          </button>
        )}
      </div>
    </div>
  )
}
