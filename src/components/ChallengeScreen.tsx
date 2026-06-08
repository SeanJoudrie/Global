import { useState } from "react"
import { CHALLENGE_CONTINENTS } from "../data/challenges"
import type { ChallengeContinent, ChallengeCountry, SubRegion } from "../data/challenges"

interface Props { onBack: () => void }

type Phase = "continents" | "countries" | "quiz" | "result"

interface ChallengeQ {
  target: SubRegion
  choices: SubRegion[]
  correctIndex: number
}

function buildQuiz(subRegions: SubRegion[]): ChallengeQ[] {
  if (subRegions.length < 4) return []
  const count = Math.min(10, subRegions.length)
  const shuffled = [...subRegions].sort(() => Math.random() - 0.5).slice(0, count)
  return shuffled.map(target => {
    const distractors = subRegions.filter(r => r.code !== target.code).sort(() => Math.random() - 0.5).slice(0, 3)
    const allChoices = [target, ...distractors].sort(() => Math.random() - 0.5)
    const correctIndex = allChoices.findIndex(r => r.code === target.code)
    return { target, choices: allChoices, correctIndex }
  })
}

export default function ChallengeScreen({ onBack }: Props) {
  const [phase, setPhase] = useState<Phase>("continents")
  const [activeContinent, setActiveContinent] = useState<ChallengeContinent | null>(null)
  const [activeCountry, setActiveCountry] = useState<ChallengeCountry | null>(null)
  const [questions, setQuestions] = useState<ChallengeQ[]>([])
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<("correct" | "wrong")[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [animating, setAnimating] = useState<number | null>(null)
  const [imgError, setImgError] = useState<Record<string, boolean>>({})

  const handleContinentClick = (c: ChallengeContinent) => {
    if (c.locked) return
    setActiveContinent(c)
    setPhase("countries")
  }

  const handleCountryClick = (country: ChallengeCountry) => {
    if (country.locked || country.subRegions.length < 4) return
    setActiveCountry(country)
    const qs = buildQuiz(country.subRegions)
    setQuestions(qs)
    setIdx(0)
    setAnswers([])
    setSelected(null)
    setAnimating(null)
    setImgError({})
    setPhase("quiz")
  }

  const q = questions[idx]
  const answered = selected !== null
  const score = answers.filter(a => a === "correct").length
  const total = questions.length

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

  if (phase === "continents") {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,#1A1033 0%,#2A1A4A 100%)" }}>
        <header className="flex items-center gap-3 px-5 pt-8 pb-4" style={{ zIndex: 1, position: "relative" }}>
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
            style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
          <div>
            <h1 className="text-2xl font-black" style={{ color: "#F5F3FF" }}>Challenge Mode</h1>
            <p className="text-xs" style={{ color: "#B8A9E0" }}>Master sub-national flags by region</p>
          </div>
        </header>
        <div className="px-5 pb-10 space-y-3" style={{ zIndex: 1, position: "relative" }}>
          {CHALLENGE_CONTINENTS.map(c => (
            <button key={c.id} onClick={() => handleContinentClick(c)} disabled={c.locked}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all ${c.locked ? "opacity-40 cursor-not-allowed" : "active:scale-[0.98] hover:brightness-110"}`}
              style={{ background: "#2D1F52", border: `1px solid ${c.locked ? "#8B6CFF22" : "#8B6CFF44"}` }}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{c.emoji}</span>
                <div className="text-left">
                  <div className="font-bold" style={{ color: "#F5F3FF" }}>{c.name}</div>
                  {c.locked
                    ? <div className="text-xs" style={{ color: "#B8A9E0" }}>Coming soon</div>
                    : <div className="text-xs" style={{ color: "#8B6CFF" }}>
                        {c.countries.filter(co => !co.locked && co.subRegions.length >= 4).length} countries available
                      </div>
                  }
                </div>
              </div>
              <span style={{ color: c.locked ? "#8B6CFF44" : "#8B6CFF" }}>{c.locked ? "🔒" : "›"}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (phase === "countries" && activeContinent) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,#1A1033 0%,#2A1A4A 100%)" }}>
        <header className="flex items-center gap-3 px-5 pt-8 pb-4" style={{ zIndex: 1, position: "relative" }}>
          <button onClick={() => setPhase("continents")} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
            style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
          <div>
            <h1 className="text-2xl font-black" style={{ color: "#F5F3FF" }}>{activeContinent.emoji} {activeContinent.name}</h1>
            <p className="text-xs" style={{ color: "#B8A9E0" }}>Select a country</p>
          </div>
        </header>
        <div className="px-5 pb-10 space-y-3" style={{ zIndex: 1, position: "relative" }}>
          {activeContinent.countries.map(country => (
            <button key={country.code} onClick={() => handleCountryClick(country)}
              disabled={country.locked || country.subRegions.length < 4}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all ${(country.locked || country.subRegions.length < 4) ? "opacity-40 cursor-not-allowed" : "active:scale-[0.98] hover:brightness-110"}`}
              style={{ background: "#2D1F52", border: `1px solid ${(country.locked || country.subRegions.length < 4) ? "#8B6CFF22" : "#8B6CFF44"}` }}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{country.emoji}</span>
                <div className="text-left">
                  <div className="font-bold" style={{ color: "#F5F3FF" }}>{country.name}</div>
                  <div className="text-xs" style={{ color: "#B8A9E0" }}>{country.subTitle}</div>
                </div>
              </div>
              <span style={{ color: (country.locked || country.subRegions.length < 4) ? "#8B6CFF44" : "#8B6CFF" }}>
                {(country.locked || country.subRegions.length < 4) ? "🔒" : "›"}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (phase === "result" && activeCountry) {
    const pct = Math.round((score / total) * 100)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: "linear-gradient(135deg,#1A1033 0%,#2A1A4A 100%)" }}>
        <div className="w-full max-w-sm" style={{ zIndex: 1, position: "relative" }}>
          <div className="rounded-2xl p-6 mb-4 text-center"
            style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 0 32px #8B6CFF22" }}>
            <div className="text-5xl mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚"}</div>
            <div className="text-6xl font-black mb-1" style={{ color: "#F5F3FF" }}>{score}/{total}</div>
            <div className="text-sm mb-3" style={{ color: "#B8A9E0" }}>{activeCountry.emoji} {activeCountry.name} · {activeCountry.subTitle}</div>
            <div className="flex justify-center gap-1 mb-4">
              {answers.map((a, i) => <span key={i}>{a === "correct" ? "🟩" : "🟥"}</span>)}
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#1A1033" }}>
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#8B6CFF,#A78BFA)" }} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => handleCountryClick(activeCountry)}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>Play Again</button>
            <button onClick={() => setPhase("countries")}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "#2D1F52", border: "1px solid #8B6CFF33", color: "#B8A9E0" }}>Other Countries</button>
            <button onClick={onBack}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "#2D1F52", border: "1px solid #8B6CFF22", color: "#B8A9E0" }}>&#8592; Home</button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === "quiz" && q) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,#1A1033 0%,#2A1A4A 100%)" }}>
        <header className="flex items-center justify-between px-5 pt-8 pb-2" style={{ zIndex: 1 }}>
          <button onClick={() => setPhase("countries")} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
            style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>
              {activeCountry?.emoji} {activeCountry?.name}
            </div>
            <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>{idx + 1} / {total}</div>
          </div>
          <div className="w-9" />
        </header>

        <div className="mx-5 mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "#2D1F52", zIndex: 1 }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(idx / total) * 100}%`, background: "linear-gradient(90deg,#8B6CFF,#A78BFA)" }} />
        </div>

        <div className="flex-1 flex flex-col items-center px-5 py-4" style={{ zIndex: 1 }}>
          <div className="mb-4">
            <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: "2px solid #8B6CFF44" }}>
              {imgError[q.target.code] ? (
                <div className="flex items-center justify-center text-4xl"
                  style={{ width: 280, height: 175, background: "#2D1F52", color: "#B8A9E0" }}>🏳️</div>
              ) : (
                <img src={q.target.flagUrl} alt="flag" width={280} height={175}
                  className="object-cover" style={{ display: "block" }}
                  onError={() => setImgError(e => ({ ...e, [q.target.code]: true }))} />
              )}
            </div>
          </div>

          {answered && (
            <div className="w-full max-w-sm mb-3 px-4 py-3 rounded-xl animate-slide-up"
              style={{ background: "#2D1F52", border: `1px solid ${selected === q.correctIndex ? "#34D39944" : "#F43F5E44"}` }}>
              <div className="text-xs font-semibold" style={{ color: selected === q.correctIndex ? "#34D399" : "#F43F5E" }}>
                {selected === q.correctIndex ? `✓ Correct — ${q.target.name}` : `✗ That was ${q.target.name}`}
              </div>
            </div>
          )}

          <div className="w-full max-w-sm grid grid-cols-2 gap-3 mb-4">
            {q.choices.map((choice, i) => (
              <button key={choice.code} onClick={() => handleAnswer(i)} disabled={answered}
                className={`py-3.5 px-3 rounded-xl font-semibold text-sm transition-colors active:scale-95 ${animClass(i)}`}
                style={{ background: bgColor(i), border: `1.5px solid ${borderColor(i)}`, color: textColor(i), cursor: answered ? "default" : "pointer" }}>
                {choice.name}
              </button>
            ))}
          </div>

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

  return null
}
