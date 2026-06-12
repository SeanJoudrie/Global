import { useState } from "react"
import { LGBTQ_FLAGS } from "../data/identityFlags"
import type { IdentityFlag } from "../data/identityFlags"
import { T, ACCENT, FONT, tint } from "../ui/tokens"
import { ScreenHeader } from "./ui"
import { LineIcon } from "./icons"
import { Trophy } from "lucide-react"

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
        style={{ background: T.bg, minHeight: "100vh", color: T.text }}>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl p-6 text-center mb-4"
            style={{ background: T.surface, border: `1px solid ${T.line}`, boxShadow: `0 12px 32px -14px ${tint(T.text, 0.45)}` }}>
            <div className="mb-2 flex justify-center" style={{ color: ACCENT.play }}>
              <LineIcon name="identity" size={44} color={ACCENT.play} />
            </div>
            <div className="text-6xl font-black mb-1" style={{ color: T.text, fontFamily: FONT.mono, fontVariantNumeric: "tabular-nums" }}>{streak}</div>
            <div className="text-sm" style={{ color: T.muted }}>flags in a row · best {best}</div>
            <div className="text-xs mt-3" style={{ color: T.muted }}>
              It was <span style={{ color: T.text, fontWeight: 700 }}>{round.target.name}</span>
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
              style={{ background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>
              ← Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: T.bg, minHeight: "100vh", color: T.text }}>
      <ScreenHeader title="Pride Roulette" subtitle={`Streak ${streak}`} onBack={onBack}
        right={
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 999, background: T.surface, border: `1px solid ${tint(T.gold, 0.4)}` }}>
            <Trophy size={13} color={T.gold} strokeWidth={1.6} absoluteStrokeWidth />
            <span style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 13, color: T.gold }}>{best}</span>
          </div>
        } />

      <div className="flex-1 flex flex-col items-center px-5 gap-4">
        <p className="text-sm" style={{ color: T.muted }}>Name that pride flag — one wrong ends the run.</p>

        {/* Flag */}
        <div style={{
          width: 300, height: 200, borderRadius: 12, overflow: "hidden",
          border: `2px solid ${answered ? (picked === round.target.id ? T.green : T.danger) : T.line}`,
          background: T.surface, position: "relative",
          boxShadow: `0 10px 28px -12px ${tint(T.text, 0.45)}`,
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
            let border = `1.5px solid ${T.line}`
            if (answered) {
              if (isTarget) border = `2px solid ${T.green}`
              else if (isChosen) border = `2px solid ${T.danger}`
            }
            return (
              <button key={f.id} onClick={() => pick(f.id)} disabled={answered}
                className="py-3 px-4 rounded-xl font-semibold text-sm transition-all active:scale-95"
                style={{ background: T.surface, border, color: T.text, textAlign: "left" }}>
                {f.name}
                {answered && isTarget && <span style={{ float: "right", color: T.green }}>✓</span>}
                {answered && isChosen && !isTarget && <span style={{ float: "right", color: T.danger }}>✗</span>}
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
