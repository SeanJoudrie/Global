import { useState } from "react"
import { CODEX } from "../data/codex"
import type { HistoricalFlag } from "../data/codex"
import { FLAGS } from "../data/flags"
import { T, ACCENT, FONT, tint, IS_CARTO } from "../ui/tokens"

interface Props { onBack: () => void }

const ROUNDS = 5
const shuffle = <X,>(a: X[]): X[] => [...a].sort(() => Math.random() - 0.5)
const nameOf = (code: string) => FLAGS.find(f => f.code === code)?.name ?? code

// Countries with a deep enough flag history to order.
const ELIGIBLE = Object.entries(CODEX)
  .filter(([code, e]) => e.flagHistory.length >= 3 && FLAGS.some(f => f.code === code))
  .map(([code, e]) => ({ code, name: nameOf(code), history: e.flagHistory }))

interface Round { name: string; chrono: HistoricalFlag[]; shuffled: HistoricalFlag[] }

function buildRounds(): Round[] {
  return shuffle(ELIGIBLE).slice(0, ROUNDS).map(c => {
    // history is newest-first → chrono is oldest-first, capped to 5 for the board
    const chrono = [...c.history].reverse().slice(-5)
    return { name: c.name, chrono, shuffled: shuffle(chrono) }
  })
}

function FlagTile({ src, dim, badge, onClick }: { src: string; dim?: boolean; badge?: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} disabled={!onClick} className={onClick ? "geo-tap" : ""}
      style={{ position: "relative", width: 60, height: 40, borderRadius: 6, overflow: "hidden", border: `1px solid ${T.line}`, background: "#fff", opacity: dim ? 0.32 : 1, flexShrink: 0 }}>
      <img src={src} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        onError={e => { (e.target as HTMLImageElement).style.opacity = "0.2" }} />
      {badge && <span style={{ position: "absolute", top: -6, left: -6, width: 16, height: 16, borderRadius: "50%", background: ACCENT.learn, color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.mono }}>{badge}</span>}
    </button>
  )
}

function TimelineGame({ onBack, onReplay }: Props & { onReplay: () => void }) {
  const [rounds] = useState(buildRounds)
  const [idx, setIdx] = useState(0)
  const [order, setOrder] = useState<number[]>([])   // indices into round.shuffled, in tap order (oldest→newest)
  const [locked, setLocked] = useState(false)
  const [scores, setScores] = useState<number[]>([])
  const [done, setDone] = useState(false)

  const round = rounds[idx]
  const placed = new Set(order)

  const tap = (i: number) => { if (locked || placed.has(i)) return; setOrder(o => [...o, i]) }
  const undo = () => { if (locked) return; setOrder(o => o.slice(0, -1)) }

  const lockIn = () => {
    // correct positions: chrono order should equal the tapped flags oldest→newest
    let correct = 0
    order.forEach((shufIdx, pos) => {
      if (round.shuffled[shufIdx] === round.chrono[pos]) correct++
    })
    setScores(s => [...s, correct])
    setLocked(true)
  }

  const next = () => {
    if (idx + 1 >= rounds.length) { setDone(true); return }
    setIdx(i => i + 1); setOrder([]); setLocked(false)
  }

  if (done) {
    const total = scores.reduce((a, b) => a + b, 0)
    const max = rounds.reduce((a, r) => a + r.chrono.length, 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5" style={{ background: T.bg }}>
        <div className="w-full max-w-sm" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ borderRadius: 16, padding: 24, textAlign: "center", background: T.surface, border: `1px solid ${T.line}` }}>
            <div style={{ fontSize: 40 }}>⏳</div>
            <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 38, color: ACCENT.learn, marginTop: 4 }}>{total}<span style={{ color: T.dim, fontSize: 20 }}>/{max}</span></div>
            <div style={{ color: T.muted, fontSize: 12 }}>flags placed in the right era</div>
          </div>
          <button onClick={onReplay} className="geo-tap" style={{ padding: "14px 0", borderRadius: 12, fontWeight: 700, fontFamily: FONT.display, background: ACCENT.learn, color: IS_CARTO ? "#FFFCF4" : T.void }}>Play again</button>
          <button onClick={onBack} className="geo-tap" style={{ padding: "12px 0", borderRadius: 12, fontWeight: 600, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>← Home</button>
        </div>
      </div>
    )
  }

  const allPlaced = order.length === round.chrono.length

  return (
    <div className="min-h-screen flex flex-col" style={{ background: T.bg }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 6px" }}>
        <button onClick={onBack} className="geo-tap" style={{ width: 34, height: 34, borderRadius: 9, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>‹</button>
        <div style={{ textAlign: "center" }}>
          <div className="geo-micro" style={{ fontSize: 9, color: T.muted }}>Flag Timeline</div>
          <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 16, color: T.text }}>{round.name}</div>
        </div>
        <div style={{ fontFamily: FONT.mono, fontSize: 13, color: T.dim }}>{idx + 1}/{ROUNDS}</div>
      </header>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 18px 24px", gap: 18 }}>
        <p style={{ color: T.muted, fontSize: 12.5, textAlign: "center", maxWidth: 300 }}>
          Tap the flags in order — <b style={{ color: ACCENT.learn }}>oldest → newest</b>.
        </p>

        {/* ordered slots */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", justifyContent: "center", minHeight: 52 }}>
          {round.chrono.map((_, pos) => {
            const shufIdx = order[pos]
            const filled = shufIdx !== undefined
            const correct = locked && filled && round.shuffled[shufIdx] === round.chrono[pos]
            return (
              <div key={pos} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {pos > 0 && <span style={{ color: T.dim, fontSize: 13 }}>→</span>}
                <div style={{ position: "relative", width: 60, height: 40, borderRadius: 6, border: `1.5px ${filled ? "solid" : "dashed"} ${locked ? (correct ? ACCENT.learn : T.warm) : filled ? T.lineHi : T.line}`, overflow: "hidden", background: filled ? "#fff" : tint(ACCENT.learn, 0.05), display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {filled
                    ? <img src={round.shuffled[shufIdx].flagUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { (e.target as HTMLImageElement).style.opacity = "0.2" }} />
                    : <span style={{ color: T.dim, fontSize: 10, fontFamily: FONT.mono }}>{pos + 1}</span>}
                  {locked && filled && <span style={{ position: "absolute", bottom: 1, right: 2, fontSize: 9, color: correct ? ACCENT.learn : T.warm }}>{correct ? "✓" : "✗"}</span>}
                </div>
              </div>
            )
          })}
        </div>

        {locked && (
          <div className="geo-micro" style={{ fontSize: 9, color: T.muted }}>↓ correct order with years</div>
        )}
        {locked && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", maxWidth: 340 }}>
            {round.chrono.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: 8, borderRadius: 10, background: T.surface, border: `1px solid ${T.line}` }}>
                <FlagTile src={h.flagUrl} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: FONT.mono, fontSize: 11, color: ACCENT.learn }}>{h.fromYear ?? "?"}{h.toYear ? `–${h.toYear}` : "–now"}</div>
                  <div style={{ color: T.muted, fontSize: 10.5, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{h.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* pickable flags */}
        {!locked && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
            {round.shuffled.map((h, i) => (
              <FlagTile key={i} src={h.flagUrl} dim={placed.has(i)} badge={placed.has(i) ? String(order.indexOf(i) + 1) : undefined} onClick={placed.has(i) ? undefined : () => tap(i)} />
            ))}
          </div>
        )}

        <div style={{ marginTop: "auto", width: "100%", maxWidth: 340, display: "flex", gap: 10 }}>
          {!locked && order.length > 0 && (
            <button onClick={undo} className="geo-tap" style={{ flex: 1, padding: "12px 0", borderRadius: 12, fontWeight: 600, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>Undo</button>
          )}
          {!locked
            ? <button onClick={lockIn} disabled={!allPlaced} className="geo-tap" style={{ flex: 2, padding: "13px 0", borderRadius: 12, fontWeight: 700, fontFamily: FONT.display, background: allPlaced ? ACCENT.learn : T.surface, color: allPlaced ? (IS_CARTO ? "#FFFCF4" : T.void) : T.dim, border: allPlaced ? "none" : `1px solid ${T.line}` }}>{allPlaced ? "Lock in" : `Place all ${round.chrono.length}`}</button>
            : <button onClick={next} className="geo-tap" style={{ flex: 1, padding: "13px 0", borderRadius: 12, fontWeight: 700, fontFamily: FONT.display, background: ACCENT.learn, color: IS_CARTO ? "#FFFCF4" : T.void }}>{idx + 1 >= ROUNDS ? "See result →" : "Next →"}</button>}
        </div>
      </div>
    </div>
  )
}

export default function FlagTimelineScreen({ onBack }: Props) {
  const [k, setK] = useState(0)
  return <TimelineGame key={k} onBack={onBack} onReplay={() => setK(n => n + 1)} />
}
