import { useState } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"

interface Props { onBack: () => void }

interface Round {
  theme: string          // region shared by the 3 matching flags
  flags: FlagRecord[]    // all 4 flags, shuffled
  oddIndex: number       // which one doesn't belong
}

function buildRounds(count: number): Round[] {
  const regions = Array.from(new Set(FLAGS.map(f => f.region)))
  const rounds: Round[] = []
  const usedThemes = new Set<string>()

  while (rounds.length < count) {
    // pick theme region (try not to repeat)
    let theme = regions[Math.floor(Math.random() * regions.length)]
    if (usedThemes.size < regions.length && usedThemes.has(theme)) continue
    usedThemes.add(theme)

    const pool = FLAGS.filter(f => f.region === theme)
    const others = FLAGS.filter(f => f.region !== theme)
    if (pool.length < 3 || others.length < 1) continue

    const shuffledPool = [...pool].sort(() => Math.random() - 0.5)
    const shuffledOthers = [...others].sort(() => Math.random() - 0.5)

    const matching = shuffledPool.slice(0, 3)
    const odd = shuffledOthers[0]

    const all = [...matching, odd].sort(() => Math.random() - 0.5)
    rounds.push({ theme, flags: all, oddIndex: all.indexOf(odd) })
  }

  return rounds
}

const TOTAL_ROUNDS = 3
const REGION_EMOJI: Record<string, string> = {
  Europe: "🇪🇺", Americas: "🌎", Asia: "🌏", Africa: "🌍",
  Oceania: "🌊", "Middle East": "🕌",
}

export default function OddOneOutScreen({ onBack }: Props) {
  const [rounds]       = useState(() => buildRounds(TOTAL_ROUNDS))
  const [idx, setIdx]  = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [scores, setScores]     = useState<boolean[]>([])
  const [done, setDone]         = useState(false)

  const round    = rounds[idx]
  const answered = selected !== null
  const isRight  = answered && selected === round.oddIndex

  const handlePick = (i: number) => {
    if (answered) return
    setSelected(i)
    setScores(prev => [...prev, i === round.oddIndex])
  }

  const handleNext = () => {
    if (idx + 1 >= TOTAL_ROUNDS) { setDone(true); return }
    setIdx(i => i + 1)
    setSelected(null)
  }

  const restart = () => {
    // remount via key trick would be cleaner — for now just reload
    window.location.reload()
  }

  // ── Result screen ────────────────────────────────────────────────────────────
  if (done) {
    const correct = scores.filter(Boolean).length
    const pct = Math.round((correct / TOTAL_ROUNDS) * 100)
    const trophy = pct === 100 ? "🏆" : pct >= 66 ? "👍" : "📚"
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm" style={{ zIndex: 1, position: "relative" }}>
          <div className="rounded-2xl p-6 text-center mb-4"
            style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 0 32px #8B6CFF22" }}>
            <div className="text-5xl mb-3">{trophy}</div>
            <div className="text-6xl font-black mb-1" style={{ color: "#F5F3FF" }}>
              {correct}/{TOTAL_ROUNDS}
            </div>
            <div className="text-sm mb-4" style={{ color: "#B8A9E0" }}>
              {pct === 100 ? "Perfect round!" : pct >= 66 ? "Well played" : "Keep practising"}
            </div>
            <div className="flex justify-center gap-2">
              {scores.map((ok, i) => (
                <span key={i} style={{ fontSize: 28 }}>{ok ? "🟩" : "🟥"}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={restart}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
              Play Again
            </button>
            <button onClick={onBack}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "#2D1F52", border: "1px solid #8B6CFF33", color: "#B8A9E0" }}>
              ← Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Quiz screen ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>

      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-8 pb-4" style={{ zIndex: 1 }}>
        <button onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>
            Odd One Out
          </div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>
            Round {idx + 1} / {TOTAL_ROUNDS}
          </div>
        </div>
        {/* score dots */}
        <div className="flex gap-1.5 items-center">
          {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: "50%",
              background: i < scores.length
                ? (scores[i] ? "#34D399" : "#F43F5E")
                : "#8B6CFF33",
            }} />
          ))}
        </div>
      </header>

      {/* Progress bar */}
      <div className="mx-5 h-1.5 rounded-full overflow-hidden" style={{ background: "#2D1F52", zIndex: 1 }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(idx / TOTAL_ROUNDS) * 100}%`, background: "linear-gradient(90deg,#8B6CFF,#A78BFA)" }} />
      </div>

      <div className="flex-1 flex flex-col items-center px-5 pt-6" style={{ zIndex: 1 }}>
        <p className="text-base font-semibold mb-5 text-center" style={{ color: "#B8A9E0" }}>
          Which flag doesn't belong?
        </p>

        {/* 2×2 flag grid */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {round.flags.map((flag, i) => {
            const isOdd = i === round.oddIndex
            const isChosen = selected === i
            let border = "1.5px solid #8B6CFF33"
            let overlay: string | null = null
            if (answered) {
              if (isOdd)    { border = "2px solid #34D399"; overlay = "#34D39915" }
              else if (isChosen) { border = "2px solid #F43F5E"; overlay = "#F43F5E15" }
            } else if (isChosen) {
              border = "2px solid #8B6CFF"
            }

            return (
              <button key={flag.code} onClick={() => handlePick(i)}
                disabled={answered}
                className="relative rounded-xl overflow-hidden transition-all active:scale-95"
                style={{ border, background: "#1A1033", aspectRatio: "3/2" }}>
                <img src={flag.flagUrl} alt={flag.name}
                  className="w-full h-full object-cover" />
                {overlay && (
                  <div style={{
                    position: "absolute", inset: 0, background: overlay,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {isOdd && answered && (
                      <span style={{ fontSize: 28 }}>{isChosen ? "✓" : "✓"}</span>
                    )}
                    {!isOdd && isChosen && (
                      <span style={{ fontSize: 28 }}>✗</span>
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Country names revealed after answer */}
        {answered && (
          <div className="w-full max-w-sm mt-4 p-4 rounded-xl"
            style={{ background: "#2D1F52", border: `1px solid ${isRight ? "#34D39944" : "#F43F5E44"}` }}>
            <div className="text-sm font-semibold mb-2"
              style={{ color: isRight ? "#34D399" : "#F43F5E" }}>
              {isRight
                ? `✓ Correct! ${round.flags[round.oddIndex].name} doesn't belong.`
                : `✗ It was ${round.flags[round.oddIndex].name}.`}
            </div>
            <div className="text-xs" style={{ color: "#B8A9E0" }}>
              The other three are all from{" "}
              <span style={{ color: "#A78BFA", fontWeight: 700 }}>
                {REGION_EMOJI[round.theme]} {round.theme}
              </span>
              {" — "}
              {round.flags
                .filter((_, i) => i !== round.oddIndex)
                .map(f => f.name)
                .join(", ")}
            </div>
            <div className="text-xs mt-1" style={{ color: "#8B6CFF88" }}>
              {round.flags[round.oddIndex].name} is from {REGION_EMOJI[round.flags[round.oddIndex].region]} {round.flags[round.oddIndex].region}
            </div>
          </div>
        )}

        {answered && (
          <button onClick={handleNext}
            className="w-full max-w-sm mt-3 py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
            {idx + 1 >= TOTAL_ROUNDS ? "See Results →" : "Next Round →"}
          </button>
        )}
      </div>
    </div>
  )
}
