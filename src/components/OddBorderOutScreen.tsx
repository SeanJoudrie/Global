import { useState } from "react"
import { FLAGS } from "../data/flags"
import { neighborsOf, countriesWithBorders } from "../data/borders"
import { T, ACCENT, FONT } from "../ui/tokens"
import FlagImage from "./FlagImage"

interface Props { onBack: () => void }

const ROUNDS = 6
const shuffle = <X,>(a: X[]): X[] => [...a].sort(() => Math.random() - 0.5)
const NAME = (code: string) => FLAGS.find(f => f.code === code)?.name ?? code
const REGION = (code: string) => FLAGS.find(f => f.code === code)?.region

// Targets with at least 3 neighbours so we can show 3 real borders + 1 impostor.
const TARGETS = countriesWithBorders(3)

interface Round { target: string; options: string[]; odd: string }
function buildRounds(): Round[] {
  return shuffle(TARGETS).slice(0, ROUNDS).map(target => {
    const ns = neighborsOf(target)
    const three = shuffle(ns).slice(0, 3)
    const neighborSet = new Set([target, ...ns])
    // impostor: not a neighbour & not the target; prefer same region to be sneaky
    const sameRegion = FLAGS.filter(f => !neighborSet.has(f.code) && REGION(f.code) === REGION(target))
    const pool = sameRegion.length ? sameRegion : FLAGS.filter(f => !neighborSet.has(f.code))
    const odd = shuffle(pool)[0].code
    return { target, options: shuffle([...three, odd]), odd }
  })
}

function OddBorderGame({ onBack, onReplay }: Props & { onReplay: () => void }) {
  const [rounds] = useState(buildRounds)
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [scores, setScores] = useState<boolean[]>([])
  const [done, setDone] = useState(false)

  const round = rounds[idx]
  const answered = picked !== null

  const choose = (code: string) => {
    if (answered) return
    setPicked(code)
    setScores(s => [...s, code === round.odd])
  }
  const next = () => {
    if (idx + 1 >= rounds.length) { setDone(true); return }
    setIdx(i => i + 1); setPicked(null)
  }

  if (done) {
    const correct = scores.filter(Boolean).length
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5" style={{ background: T.bg }}>
        <div className="w-full max-w-sm" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ borderRadius: 16, padding: 24, textAlign: "center", background: T.surface, border: `1px solid ${T.line}` }}>
            <div style={{ fontSize: 40 }}>🧭</div>
            <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 38, color: ACCENT.learn }}>{correct}<span style={{ color: T.dim, fontSize: 20 }}>/{ROUNDS}</span></div>
            <div style={{ color: T.muted, fontSize: 12 }}>impostors spotted</div>
          </div>
          <button onClick={onReplay} className="geo-tap" style={{ padding: "14px 0", borderRadius: 12, fontWeight: 700, fontFamily: FONT.display, background: ACCENT.learn, color: T.onAccent }}>Play again</button>
          <button onClick={onBack} className="geo-tap" style={{ padding: "12px 0", borderRadius: 12, fontWeight: 600, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>← Home</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: T.bg }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 6px" }}>
        <button onClick={onBack} className="geo-tap" style={{ width: 34, height: 34, borderRadius: 9, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>‹</button>
        <div className="geo-micro" style={{ fontSize: 9, color: T.muted }}>Odd Border Out</div>
        <div style={{ fontFamily: FONT.mono, fontSize: 13, color: T.dim }}>{idx + 1}/{ROUNDS}</div>
      </header>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "12px 18px 22px", gap: 14, alignItems: "center" }}>
        <p style={{ textAlign: "center", color: T.muted, fontSize: 13 }}>Which one does <b style={{ color: T.text }}>NOT</b> border</p>
        <div className="geo-display" style={{ fontWeight: 700, fontSize: 26, color: ACCENT.learn, marginTop: -8 }}>{NAME(round.target)}?</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%", maxWidth: 360, marginTop: 4 }}>
          {round.options.map(code => {
            const isOdd = code === round.odd
            const isPick = picked === code
            let border = `1.5px solid ${T.line}`
            if (answered) {
              if (isOdd) border = `2.5px solid ${ACCENT.codex}`
              else if (isPick) border = `2.5px solid ${T.warm}`
            }
            return (
              <button key={code} onClick={() => choose(code)} disabled={answered} className="geo-tap"
                style={{ borderRadius: 12, overflow: "hidden", border, background: T.surface, padding: 0, position: "relative" }}>
                <div style={{ aspectRatio: "3/2", background: "#fff" }}>
                  <FlagImage code={code} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: "7px 8px", fontFamily: FONT.display, fontWeight: 600, fontSize: 12.5, color: T.text }}>{NAME(code)}</div>
                {answered && isOdd && <span style={{ position: "absolute", top: 6, right: 6, background: ACCENT.codex, color: "#fff", borderRadius: 999, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>✓</span>}
                {answered && isPick && !isOdd && <span style={{ position: "absolute", top: 6, right: 6, background: T.warm, color: "#fff", borderRadius: 999, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>✗</span>}
              </button>
            )
          })}
        </div>

        {answered && (
          <button onClick={next} className="geo-tap" style={{ marginTop: "auto", width: "100%", maxWidth: 360, padding: "14px 0", borderRadius: 12, fontWeight: 700, fontFamily: FONT.display, background: ACCENT.learn, color: T.onAccent }}>
            {idx + 1 >= ROUNDS ? "See result →" : "Next →"}
          </button>
        )}
      </div>
    </div>
  )
}

export default function OddBorderOutScreen({ onBack }: Props) {
  const [k, setK] = useState(0)
  return <OddBorderGame key={k} onBack={onBack} onReplay={() => setK(n => n + 1)} />
}
