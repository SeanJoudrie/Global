import { useState } from "react"
import { CAPITALS } from "../data/capitals"
import type { CapitalRecord } from "../data/capitals"
import { FLAGS } from "../data/flags"
import { T, ACCENT, FONT, tint, IS_CARTO } from "../ui/tokens"
import FlagImage from "./FlagImage"

interface Props { onBack: () => void }

const ROUNDS = 4
const PER = 5
const shuffle = <X,>(a: X[]): X[] => [...a].sort(() => Math.random() - 0.5)
const POOL = CAPITALS.filter(c => FLAGS.some(f => f.code === c.code))

interface Round { left: CapitalRecord[]; right: CapitalRecord[] }
function buildRounds(): Round[] {
  const picks = shuffle(POOL)
  const rounds: Round[] = []
  for (let i = 0; i < ROUNDS; i++) {
    const set = picks.slice(i * PER, i * PER + PER)
    rounds.push({ left: set, right: shuffle(set) })
  }
  return rounds
}

function CapitalMatchGame({ onBack, onReplay }: Props & { onReplay: () => void }) {
  const [rounds] = useState(buildRounds)
  const [idx, setIdx] = useState(0)
  const [sel, setSel] = useState<string | null>(null)        // selected flag code
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrong, setWrong] = useState<string | null>(null)
  const [mistakes, setMistakes] = useState(0)
  const [done, setDone] = useState(false)

  const round = rounds[idx]

  const pickCapital = (code: string) => {
    if (matched.has(code)) return
    if (!sel) return
    if (sel === code) {
      const next = new Set(matched).add(code)
      setMatched(next); setSel(null)
      if (next.size === round.left.length) {
        setTimeout(() => {
          if (idx + 1 >= rounds.length) { setDone(true); return }
          setIdx(i => i + 1); setMatched(new Set()); setSel(null)
        }, 350)
      }
    } else {
      setWrong(code); setMistakes(m => m + 1)
      setTimeout(() => setWrong(null), 450)
    }
  }

  if (done) {
    const total = ROUNDS * PER
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5" style={{ background: T.bg }}>
        <div className="w-full max-w-sm" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ borderRadius: 16, padding: 24, textAlign: "center", background: T.surface, border: `1px solid ${T.line}` }}>
            <div style={{ fontSize: 40 }}>🏛️</div>
            <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 36, color: ACCENT.learn }}>{total}<span style={{ color: T.dim, fontSize: 18 }}> matched</span></div>
            <div style={{ color: T.muted, fontSize: 12 }}>{mistakes === 0 ? "Flawless!" : `${mistakes} mistake${mistakes === 1 ? "" : "s"}`}</div>
          </div>
          <button onClick={onReplay} className="geo-tap" style={{ padding: "14px 0", borderRadius: 12, fontWeight: 700, fontFamily: FONT.display, background: ACCENT.learn, color: IS_CARTO ? "#FFFCF4" : T.void }}>Play again</button>
          <button onClick={onBack} className="geo-tap" style={{ padding: "12px 0", borderRadius: 12, fontWeight: 600, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>← Home</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: T.bg }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 6px" }}>
        <button onClick={onBack} className="geo-tap" style={{ width: 34, height: 34, borderRadius: 9, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>‹</button>
        <div className="geo-micro" style={{ fontSize: 9, color: T.muted }}>Capital Match</div>
        <div style={{ fontFamily: FONT.mono, fontSize: 13, color: T.dim }}>{idx + 1}/{ROUNDS}</div>
      </header>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 16px 22px", gap: 12 }}>
        <div className="geo-micro" style={{ textAlign: "center", fontSize: 9, color: T.muted }}>Tap a flag, then its capital city</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 10, flex: 1 }}>
          {/* flags */}
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {round.left.map(c => {
              const isMatched = matched.has(c.code)
              const isSel = sel === c.code
              return (
                <button key={c.code} onClick={() => !isMatched && setSel(isSel ? null : c.code)} className="geo-tap"
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: 7, borderRadius: 10, flex: 1,
                    background: isMatched ? tint(ACCENT.learn, 0.12) : T.surface,
                    border: `2px solid ${isMatched ? ACCENT.learn : isSel ? ACCENT.codex : T.line}`,
                    opacity: isMatched ? 0.55 : 1 }}>
                  <div style={{ width: 40, height: 27, borderRadius: 4, overflow: "hidden", flexShrink: 0, border: `1px solid ${T.line}` }}>
                    <FlagImage code={c.code} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <span style={{ fontFamily: FONT.display, fontWeight: 600, fontSize: 12, color: T.text, textAlign: "left", lineHeight: 1.1 }}>{c.country}</span>
                </button>
              )
            })}
          </div>
          {/* capitals */}
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {round.right.map(c => {
              const isMatched = matched.has(c.code)
              const isWrong = wrong === c.code
              return (
                <button key={c.code} onClick={() => pickCapital(c.code)} disabled={isMatched} className="geo-tap"
                  style={{ display: "flex", alignItems: "center", padding: "8px 12px", borderRadius: 10, flex: 1,
                    background: isMatched ? tint(ACCENT.learn, 0.12) : T.surface,
                    border: `2px solid ${isMatched ? ACCENT.learn : isWrong ? T.warm : sel ? tint(ACCENT.codex, 0.5) : T.line}`,
                    opacity: isMatched ? 0.55 : 1, transition: "border-color 0.15s" }}>
                  <span style={{ fontFamily: FONT.display, fontWeight: 600, fontSize: 13, color: T.text, textAlign: "left" }}>{c.capital}</span>
                  {isMatched && <span style={{ marginLeft: "auto", color: ACCENT.learn }}>✓</span>}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CapitalMatchScreen({ onBack }: Props) {
  const [k, setK] = useState(0)
  return <CapitalMatchGame key={k} onBack={onBack} onReplay={() => setK(n => n + 1)} />
}
