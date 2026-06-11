import { useState } from "react"
import { LGBTQ_FLAGS } from "../data/identityFlags"
import type { IdentityFlag } from "../data/identityFlags"

interface Props { onBack: () => void }

const BEST_KEY = "globalio_prideroulette_best"
const loadBest = () => { try { return Number(localStorage.getItem(BEST_KEY)) || 0 } catch { return 0 } }
const saveBest = (n: number) => { try { localStorage.setItem(BEST_KEY, String(n)) } catch { /* ignore */ } }

const PRIDE_GRADIENT = "linear-gradient(90deg,#FF5E5E,#FFD93D,#6BCB77,#4D96FF,#B66DFF)"

interface Round { target: IdentityFlag; choices: IdentityFlag[] }

function buildRound(): Round {
  const target = LGBTQ_FLAGS[Math.floor(Math.random() * LGBTQ_FLAGS.length)]
  const distractors = LGBTQ_FLAGS
    .filter(f => f.id !== target.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
  const choices = [target, ...distractors].sort(() => Math.random() - 0.5)
  return { target, choices }
}

export default function PrideRouletteScreen({ onBack }: Props) {
  const [round, setRound] = useState<Round>(buildRound)
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(loadBest)
  const [picked, setPicked] = useState<string | null>(null)
  const [over, setOver] = useState(false)

  const answered = picked !== null

  const pick = (id: string) => {
    if (answered) return
    setPicked(id)
    if (id === round.target.id) {
      const ns = streak + 1
      setStreak(ns)
      if (ns > best) { setBest(ns); saveBest(ns) }
    } else {
      if (streak > best) { setBest(streak); saveBest(streak) }
      setTimeout(() => setOver(true), 900)
    }
  }

  const next = () => { setRound(buildRound()); setPicked(null) }
  const restart = () => { setStreak(0); setRound(buildRound()); setPicked(null); setOver(false) }

  // ── Game over ───────────────────────────────────────────────────────────────
  if (over) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl p-6 text-center mb-4"
            style={{ background: "#2D1F52", border: "1px solid #FF6FD855", boxShadow: "0 0 32px #FF6FD822" }}>
            <div className="text-5xl mb-2">🏳️‍🌈</div>
            <div className="text-6xl font-black mb-1" style={{ color: "#F5F3FF" }}>{streak}</div>
            <div className="text-sm" style={{ color: "#B8A9E0" }}>flags in a row · best {best}</div>
            <div className="text-xs mt-3" style={{ color: "#B8A9E0" }}>
              It was <span style={{ color: "#F5F3FF", fontWeight: 700 }}>{round.target.name}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={restart}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: PRIDE_GRADIENT, color: "#fff", textShadow: "0 1px 2px #0006" }}>
              Spin Again
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

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Pride Roulette</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>Streak {streak}</div>
        </div>
        <div className="text-xs font-black" style={{ color: "#FBBF24" }}>🏆 {best}</div>
      </header>

      <div className="flex-1 flex flex-col items-center px-5 gap-4">
        <p className="text-sm" style={{ color: "#B8A9E0" }}>Name that pride flag — one wrong ends the run.</p>

        {/* Flag */}
        <div style={{
          width: 300, height: 200, borderRadius: 12, overflow: "hidden",
          border: `2px solid ${answered ? (picked === round.target.id ? "#6BCB77" : "#F43F5E") : "#8B6CFF33"}`,
          background: "#1E1640", position: "relative",
        }}>
          <img src={round.target.flagUrl} alt="pride flag"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", padding: 8 }}
            onError={e => { (e.target as HTMLImageElement).style.opacity = "0.15" }} />
        </div>

        {/* Choices */}
        <div className="grid grid-cols-1 gap-2.5 w-full max-w-sm">
          {round.choices.map(f => {
            const isTarget = f.id === round.target.id
            const isChosen = picked === f.id
            let border = "1.5px solid #8B6CFF22"
            if (answered) {
              if (isTarget) border = "2px solid #6BCB77"
              else if (isChosen) border = "2px solid #F43F5E"
            }
            return (
              <button key={f.id} onClick={() => pick(f.id)} disabled={answered}
                className="py-3 px-4 rounded-xl font-semibold text-sm transition-all active:scale-95"
                style={{ background: "#2D1F52", border, color: "#F5F3FF", textAlign: "left" }}>
                {f.name}
                {answered && isTarget && <span style={{ float: "right" }}>✓</span>}
                {answered && isChosen && !isTarget && <span style={{ float: "right", color: "#F43F5E" }}>✗</span>}
              </button>
            )
          })}
        </div>

        {answered && picked === round.target.id && (
          <button onClick={next}
            className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{ background: PRIDE_GRADIENT, color: "#fff", textShadow: "0 1px 2px #0006" }}>
            Next →
          </button>
        )}
      </div>
    </div>
  )
}
