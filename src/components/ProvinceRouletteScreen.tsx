import { useState } from "react"
import { SUB_FLAGS, SUB_CONTINENTS } from "../data/subdivisions"
import type { SubFlag } from "../data/subdivisions"

interface Props { onBack: () => void; onSubLearned: (code: string) => void }

function shuffle<T>(a: T[]): T[] { return [...a].sort(() => Math.random() - 0.5) }
function pick<T>(a: T[]): T { return a[Math.floor(Math.random() * a.length)] }

interface Step { label: string; choices: string[]; answer: string }

// Always returns exactly 4 distinct options: the answer + 3 distractors,
// preferring `primary`, then backfilling from `fallback` so it's never short.
function fourChoices(answer: string, primary: string[], fallback: string[]): string[] {
  const seen = new Set<string>([answer])
  const out = [answer]
  for (const list of [primary, fallback]) {
    for (const x of shuffle(list)) {
      if (out.length >= 4) break
      if (!seen.has(x)) { seen.add(x); out.push(x) }
    }
  }
  return shuffle(out)
}

const ALL_COUNTRIES = Array.from(new Set(SUB_FLAGS.map(s => s.countryName)))
const ALL_REGIONS = Array.from(new Set(SUB_FLAGS.map(s => s.name)))

function buildSteps(target: SubFlag): Step[] {
  const sameContCountries = SUB_FLAGS
    .filter(s => s.continent === target.continent && s.countryName !== target.countryName)
    .map(s => s.countryName)
  const sameCountryRegions = SUB_FLAGS
    .filter(s => s.countryCode === target.countryCode && s.name !== target.name)
    .map(s => s.name)

  return [
    { label: "Which continent?", choices: shuffle(SUB_CONTINENTS.map(c => c.name)), answer: target.continent },
    { label: "Which country?", choices: fourChoices(target.countryName, sameContCountries, ALL_COUNTRIES), answer: target.countryName },
    { label: "Which subdivision?", choices: fourChoices(target.name, sameCountryRegions, ALL_REGIONS), answer: target.name },
  ]
}

function ProvinceRouletteScreenGame({ onBack, onSubLearned , onReplay }: Props & { onReplay: () => void }) {
  const [target] = useState<SubFlag>(() => pick(SUB_FLAGS))
  const [steps] = useState<Step[]>(() => buildSteps(target))
  const [stepIdx, setStepIdx] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [results, setResults] = useState<boolean[]>([])
  const [done, setDone] = useState(false)

  const step = steps[stepIdx]
  const answered = picked !== null

  const choose = (c: string) => {
    if (answered) return
    setPicked(c)
    setResults(r => [...r, c === step.answer])
  }

  const next = () => {
    if (stepIdx + 1 >= steps.length) {
      if (results.every(Boolean)) onSubLearned(target.code)
      setDone(true)
      return
    }
    setStepIdx(i => i + 1)
    setPicked(null)
  }

  if (done) {
    const correct = results.filter(Boolean).length
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl overflow-hidden mb-4" style={{ border: "2px solid #34D39944" }}>
            <img src={target.flagUrl} alt={target.name} style={{ width: "100%", height: 150, objectFit: "cover", display: "block" }}
              onError={e => { (e.target as HTMLImageElement).style.opacity = "0.3" }} />
          </div>
          <div className="rounded-2xl p-6 text-center mb-4" style={{ background: "#2D1F52", border: "1px solid #8B6CFF44" }}>
            <div className="text-4xl mb-2">{correct === 3 ? "🎯" : correct >= 1 ? "🧭" : "🌍"}</div>
            <div className="text-2xl font-black mb-1" style={{ color: "#F5F3FF" }}>{correct} / 3</div>
            <div className="text-sm" style={{ color: "#B8A9E0" }}>{target.countryEmoji} {target.name}, {target.countryName}</div>
            <div className="flex justify-center gap-2 mt-3">
              {["Continent", "Country", "Region"].map((l, i) => (
                <span key={l} className="text-xs px-2 py-1 rounded-full"
                  style={{ background: results[i] ? "#34D39922" : "#F43F5E22", color: results[i] ? "#34D399" : "#F43F5E", border: `1px solid ${results[i] ? "#34D39944" : "#F43F5E44"}` }}>
                  {results[i] ? "✓" : "✗"} {l}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={onReplay} className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>New Flag</button>
            <button onClick={onBack} className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "#2D1F52", border: "1px solid #8B6CFF33", color: "#B8A9E0" }}>← Home</button>
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
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Province Roulette</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>Step {stepIdx + 1} / 3</div>
        </div>
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: i < results.length ? (results[i] ? "#34D399" : "#F43F5E") : "#8B6CFF33" }} />
          ))}
        </div>
      </header>

      <div className="flex flex-col items-center px-5 gap-4">
        <div style={{ width: 280, height: 186, borderRadius: 14, overflow: "hidden", border: "2px solid #8B6CFF44", boxShadow: "0 0 32px #8B6CFF22", background: "#1E1640" }}>
          <img src={target.flagUrl} alt="subdivision flag"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={e => { (e.target as HTMLImageElement).style.opacity = "0.3" }} />
        </div>
        <div className="text-sm font-semibold" style={{ color: "#A78BFA" }}>{step.label}</div>

        <div className="grid grid-cols-1 gap-2.5 w-full max-w-sm">
          {step.choices.map(c => {
            const isAnswer = c === step.answer
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
          <button onClick={next} className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
            {stepIdx + 1 >= steps.length ? "See Result →" : "Next →"}
          </button>
        )}
      </div>
    </div>
  )
}

export default function ProvinceRouletteScreen({ onBack, onSubLearned }: Props) {
  const [replayKey, setReplayKey] = useState(0)
  return <ProvinceRouletteScreenGame key={replayKey} onBack={onBack} onSubLearned={onSubLearned} onReplay={() => setReplayKey(k => k + 1)} />
}
