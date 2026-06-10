import { useState } from "react"
import { FLAGS } from "../data/flags"
import { HISTORICAL_FLAGS } from "../data/historicalFlags"
import { T, ACCENT, FONT } from "../ui/tokens"

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

  const border = reveal ? (card.alive ? T.green : T.warm) : T.lineHi

  return (
    <div className="min-h-screen flex flex-col" style={{ background: T.bg }}>
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>&#8249;</button>
        <div className="text-center">
          <div className="geo-micro" style={{ fontSize: 9, color: T.muted }}>Dead or Alive</div>
          <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 16, color: ACCENT.play }}>Streak {streak}</div>
        </div>
        <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 13, color: T.amber }}>🏆 {best}</div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-5 gap-5">
        <p style={{ fontSize: 13, color: T.muted }}>Is this a flag of a country that exists today?</p>

        <div style={{
          width: 300, height: 200, borderRadius: 14, overflow: "hidden",
          border: `2.5px solid ${border}`, background: "#fff", position: "relative",
        }}>
          <img src={card.flagUrl} alt="mystery flag"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={e => { (e.target as HTMLImageElement).style.opacity = "0.15" }} />
          {reveal && (
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent,rgba(0,0,0,0.82))", padding: "26px 12px 10px", textAlign: "center",
            }}>
              <div style={{ color: "#fff", fontWeight: 800 }}>{card.name}</div>
              <div style={{ color: card.alive ? T.green : T.warm, fontSize: 12, fontWeight: 700 }}>
                {card.alive ? "✓ Still flying today" : `✝ Vanished · ${card.sub}`}
              </div>
            </div>
          )}
        </div>

        {!reveal ? (
          <div className="flex gap-3 w-full max-w-sm">
            <button onClick={() => guess(false)} className="geo-tap flex-1 py-4 rounded-xl"
              style={{ background: T.warm, color: T.onAccent, fontFamily: FONT.display, fontWeight: 700 }}>
              ✝ Vanished
            </button>
            <button onClick={() => guess(true)} className="geo-tap flex-1 py-4 rounded-xl"
              style={{ background: T.green, color: T.onAccent, fontFamily: FONT.display, fontWeight: 700 }}>
              ✓ Current
            </button>
          </div>
        ) : (
          <div className="w-full max-w-sm flex flex-col gap-3 items-center">
            <div className="geo-display" style={{ fontSize: 17, fontWeight: 700, color: reveal.correct ? T.green : T.warm }}>
              {reveal.correct ? "✓ Correct!" : `✗ Survived ${streak}`}
            </div>
            <button onClick={cont} className="geo-tap w-full py-3.5 rounded-xl"
              style={{ background: ACCENT.play, color: T.onAccent, fontFamily: FONT.display, fontWeight: 700 }}>
              {reveal.correct ? "Next →" : "Try Again"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
