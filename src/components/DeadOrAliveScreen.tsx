import { useState } from "react"
import { FLAGS } from "../data/flags"
import { HISTORICAL_FLAGS } from "../data/historicalFlags"

interface Props { onBack: () => void }

interface Card { flagUrl: string; name: string; alive: boolean; sub: string }

const ALIVE: Card[] = FLAGS.map(f => ({ flagUrl: f.flagUrl, name: f.name, alive: true, sub: f.region }))
const DEAD: Card[]  = HISTORICAL_FLAGS.map(h => ({ flagUrl: h.flagUrl, name: h.name, alive: false, sub: h.era }))

function nextCard(): Card {
  // ~50/50 alive vs dead
  const pool = Math.random() < 0.5 ? ALIVE : DEAD
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function DeadOrAliveScreen({ onBack }: Props) {
  const [card, setCard] = useState<Card>(nextCard)
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(() => Number(localStorage.getItem("globalio_doa_best") ?? 0))
  const [reveal, setReveal] = useState<null | { correct: boolean }>(null)

  const guess = (guessAlive: boolean) => {
    if (reveal) return
    const correct = guessAlive === card.alive
    setReveal({ correct })
    if (correct) {
      const s = streak + 1
      setStreak(s)
      if (s > best) { setBest(s); localStorage.setItem("globalio_doa_best", String(s)) }
    }
  }

  const cont = () => {
    if (!reveal?.correct) setStreak(0)
    setCard(nextCard())
    setReveal(null)
  }

  const border = reveal ? (card.alive ? "#34D399" : "#F43F5E") : "#8B6CFF33"

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Dead or Alive</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>Streak {streak}</div>
        </div>
        <div className="text-xs font-black" style={{ color: "#FBBF24" }}>🏆 {best}</div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-5 gap-5">
        <p className="text-sm" style={{ color: "#B8A9E0" }}>Is this a flag of a country that exists today?</p>

        <div style={{
          width: 300, height: 200, borderRadius: 14, overflow: "hidden",
          border: `2.5px solid ${border}`, background: "#1E1640", position: "relative",
          boxShadow: "0 0 32px #8B6CFF22",
        }}>
          <img src={card.flagUrl} alt="mystery flag"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={e => { (e.target as HTMLImageElement).style.opacity = "0.15" }} />
          {reveal && (
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent,#120930ee)", padding: "26px 12px 10px", textAlign: "center",
            }}>
              <div style={{ color: "#F5F3FF", fontWeight: 800 }}>{card.name}</div>
              <div style={{ color: card.alive ? "#34D399" : "#F43F5E", fontSize: 12, fontWeight: 700 }}>
                {card.alive ? "✓ Still flying today" : `✝ Vanished · ${card.sub}`}
              </div>
            </div>
          )}
        </div>

        {!reveal ? (
          <div className="flex gap-3 w-full max-w-sm">
            <button onClick={() => guess(false)}
              className="flex-1 py-4 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#F43F5E,#E11D48)", color: "#fff" }}>
              ✝ Vanished
            </button>
            <button onClick={() => guess(true)}
              className="flex-1 py-4 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#34D399,#10B981)", color: "#fff" }}>
              ✓ Current
            </button>
          </div>
        ) : (
          <div className="w-full max-w-sm flex flex-col gap-3 items-center">
            <div className="text-lg font-black" style={{ color: reveal.correct ? "#34D399" : "#F43F5E" }}>
              {reveal.correct ? "✓ Correct!" : `✗ Survived ${streak}`}
            </div>
            <button onClick={cont}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
              {reveal.correct ? "Next →" : "Try Again"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
