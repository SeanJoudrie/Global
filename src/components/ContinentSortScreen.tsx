import { useState } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"
import { T, ACCENT, FONT, tint, IS_CARTO } from "../ui/tokens"
import FlagImage from "./FlagImage"

interface Props { onBack: () => void }

const ROUNDS = 8
const REGIONS: FlagRecord["region"][] = ["Europe", "Africa", "Asia", "Americas", "Oceania", "Middle East"]
const shuffle = <X,>(a: X[]): X[] => [...a].sort(() => Math.random() - 0.5)

function ContinentSortGame({ onBack, onReplay }: Props & { onReplay: () => void }) {
  const [deck] = useState(() => shuffle(FLAGS).slice(0, ROUNDS))
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [scores, setScores] = useState<boolean[]>([])
  const [done, setDone] = useState(false)

  const flag = deck[idx]
  const answered = picked !== null

  const choose = (r: string) => {
    if (answered) return
    setPicked(r)
    setScores(s => [...s, r === flag.region])
  }
  const next = () => {
    if (idx + 1 >= deck.length) { setDone(true); return }
    setIdx(i => i + 1); setPicked(null)
  }

  if (done) {
    const correct = scores.filter(Boolean).length
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5" style={{ background: T.bg }}>
        <div className="w-full max-w-sm" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ borderRadius: 16, padding: 24, textAlign: "center", background: T.surface, border: `1px solid ${T.line}` }}>
            <div style={{ fontSize: 40 }}>🌍</div>
            <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 38, color: ACCENT.learn }}>{correct}<span style={{ color: T.dim, fontSize: 20 }}>/{ROUNDS}</span></div>
            <div style={{ color: T.muted, fontSize: 12 }}>sorted correctly</div>
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
        <div className="geo-micro" style={{ fontSize: 9, color: T.muted }}>Continent Sort</div>
        <div style={{ fontFamily: FONT.mono, fontSize: 13, color: T.dim }}>{idx + 1}/{ROUNDS}</div>
      </header>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "12px 18px 22px", gap: 16, alignItems: "center" }}>
        <div style={{ width: 220, height: 146, borderRadius: 14, overflow: "hidden", border: `1px solid ${T.lineHi}`, boxShadow: IS_CARTO ? "0 12px 28px -14px rgba(31,58,60,0.45)" : "0 0 30px rgba(0,0,0,0.4)" }}>
          <FlagImage code={flag.code} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div className="geo-display" style={{ fontWeight: 700, fontSize: 18, color: T.text, marginTop: -6 }}>{flag.name}</div>
        <div className="geo-micro" style={{ fontSize: 9, color: T.muted, marginTop: -10 }}>Which region?</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%", maxWidth: 360 }}>
          {REGIONS.map(r => {
            const isCorrect = r === flag.region
            const isPick = picked === r
            let bg = T.surface, border = `1.5px solid ${T.line}`
            if (answered) {
              if (isCorrect) { bg = tint(ACCENT.learn, IS_CARTO ? 0.12 : 0.16); border = `2px solid ${ACCENT.learn}` }
              else if (isPick) { bg = tint(T.warm, IS_CARTO ? 0.1 : 0.14); border = `2px solid ${T.warm}` }
            }
            return (
              <button key={r} onClick={() => choose(r)} disabled={answered} className="geo-tap"
                style={{ padding: "14px 10px", borderRadius: 12, background: bg, border, color: T.text, fontFamily: FONT.display, fontWeight: 600, fontSize: 14 }}>
                {r}
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

export default function ContinentSortScreen({ onBack }: Props) {
  const [k, setK] = useState(0)
  return <ContinentSortGame key={k} onBack={onBack} onReplay={() => setK(n => n + 1)} />
}
