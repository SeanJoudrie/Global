import { useState } from "react"
import { FLAGS } from "../data/flags"
import { STATS, STAT_CODES } from "../data/countryStats"
import { T, ACCENT, FONT } from "../ui/tokens"
import FlagImage from "./FlagImage"

interface Props { onBack: () => void }

const BEST_KEY = "globalio_statclash_best"
const loadBest = () => { try { return Number(localStorage.getItem(BEST_KEY)) || 0 } catch { return 0 } }
const saveBest = (n: number) => { try { localStorage.setItem(BEST_KEY, String(n)) } catch { /* ignore */ } }
const NAME = (c: string) => FLAGS.find(f => f.code === c)?.name ?? c
const rand = () => STAT_CODES[Math.floor(Math.random() * STAT_CODES.length)]

type Metric = "pop" | "area"
interface Q { metric: Metric; a: string; b: string }

// Only ask when the two values differ comfortably (>=25%), so there's always a
// clear right answer and rounding can't mislead.
function nextQ(): Q {
  for (let i = 0; i < 60; i++) {
    const metric: Metric = Math.random() < 0.5 ? "pop" : "area"
    const a = rand(), b = rand()
    if (a === b) continue
    const va = STATS[a][metric], vb = STATS[b][metric]
    const hi = Math.max(va, vb), lo = Math.min(va, vb)
    if (lo > 0 && hi / lo >= 1.25) return { metric, a, b }
  }
  return { metric: "pop", a: "CN", b: "TV" }
}

const fmt = (metric: Metric, code: string) => {
  const v = STATS[code][metric]
  if (metric === "pop") return v >= 1 ? `${v % 1 ? v.toFixed(1) : v} M people` : `${Math.round(v * 1e6).toLocaleString()} people`
  const km2 = v * 1000
  return `${km2 >= 1000 ? Math.round(km2).toLocaleString() : km2.toLocaleString()} km²`
}

function StatClashGame({ onBack, onReplay }: Props & { onReplay: () => void }) {
  const [q, setQ] = useState<Q>(nextQ)
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(loadBest)
  const [reveal, setReveal] = useState<null | { correct: boolean; pick: string }>(null)

  const prompt = q.metric === "pop" ? "more people?" : "the bigger area?"
  const winner = STATS[q.a][q.metric] >= STATS[q.b][q.metric] ? q.a : q.b

  const choose = (code: string) => {
    if (reveal) return
    const correct = code === winner
    setReveal({ correct, pick: code })
    if (correct) {
      const ns = streak + 1
      setTimeout(() => {
        setStreak(ns)
        if (ns > best) { setBest(ns); saveBest(ns) }
        setQ(nextQ()); setReveal(null)
      }, 900)
    } else {
      if (streak > best) { setBest(streak); saveBest(streak) }
    }
  }

  if (reveal && !reveal.correct) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5" style={{ background: T.bg }}>
        <div className="w-full max-w-sm" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ borderRadius: 16, padding: 22, textAlign: "center", background: T.surface, border: `1px solid ${T.line}` }}>
            <div style={{ fontSize: 38 }}>📉</div>
            <div className="geo-display" style={{ fontWeight: 700, fontSize: 18, color: T.text, marginTop: 4 }}>{NAME(winner)} had {q.metric === "pop" ? "more people" : "more land"}</div>
            <div style={{ color: T.muted, fontSize: 12, marginTop: 6 }}>{NAME(q.a)}: {fmt(q.metric, q.a)}<br />{NAME(q.b)}: {fmt(q.metric, q.b)}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 16 }}>
              <div><div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 28, color: ACCENT.play }}>{streak}</div><div className="geo-micro" style={{ fontSize: 8, color: T.muted }}>streak</div></div>
              <div><div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 28, color: T.amber }}>{best}</div><div className="geo-micro" style={{ fontSize: 8, color: T.muted }}>best</div></div>
            </div>
          </div>
          <button onClick={onReplay} className="geo-tap" style={{ padding: "14px 0", borderRadius: 12, fontWeight: 700, fontFamily: FONT.display, background: ACCENT.play, color: T.onAccent }}>Go again</button>
          <button onClick={onBack} className="geo-tap" style={{ padding: "12px 0", borderRadius: 12, fontWeight: 600, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>← Home</button>
        </div>
      </div>
    )
  }

  const card = (code: string) => {
    const isPick = reveal?.pick === code
    const isWinner = code === winner
    let border = `1px solid ${T.lineHi}`
    if (reveal) { if (isWinner) border = `3px solid ${ACCENT.codex}`; else if (isPick) border = `3px solid ${T.warm}` }
    return (
      <button onClick={() => choose(code)} disabled={!!reveal} className="geo-tap"
        style={{ flex: 1, borderRadius: 14, overflow: "hidden", border, background: T.surface, padding: 0, position: "relative" }}>
        <div style={{ aspectRatio: "3/2", background: "#fff" }}>
          <FlagImage code={code} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div style={{ padding: "9px 8px" }}>
          <div className="geo-display" style={{ fontWeight: 700, fontSize: 14, color: T.text }}>{NAME(code)}</div>
          {reveal && <div className="geo-mono" style={{ fontSize: 10, color: isWinner ? ACCENT.codex : T.muted, marginTop: 2 }}>{fmt(q.metric, code)}</div>}
        </div>
      </button>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: T.bg }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 6px" }}>
        <button onClick={onBack} className="geo-tap" style={{ width: 34, height: 34, borderRadius: 9, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>‹</button>
        <div style={{ textAlign: "center" }}>
          <div className="geo-micro" style={{ fontSize: 9, color: T.muted }}>Stat Clash</div>
          <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: ACCENT.play }}>{streak}</div>
        </div>
        <div style={{ textAlign: "right" }}><div className="geo-micro" style={{ fontSize: 8, color: T.dim }}>best</div><div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 14, color: T.amber }}>{best}</div></div>
      </header>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 18px 30px", gap: 16 }}>
        <div style={{ textAlign: "center" }}>
          <div className="geo-micro" style={{ fontSize: 9, color: q.metric === "pop" ? ACCENT.learn : ACCENT.codex }}>{q.metric === "pop" ? "👥 Population" : "🗺 Land area"}</div>
          <div className="geo-display" style={{ fontWeight: 700, fontSize: 21, color: T.text, marginTop: 2 }}>Which has {prompt}</div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "stretch" }}>
          {card(q.a)}
          <div style={{ display: "flex", alignItems: "center", fontFamily: FONT.display, fontWeight: 700, color: T.dim, fontSize: 13 }}>vs</div>
          {card(q.b)}
        </div>
      </div>
    </div>
  )
}

export default function StatClashScreen({ onBack }: Props) {
  const [k, setK] = useState(0)
  return <StatClashGame key={k} onBack={onBack} onReplay={() => setK(n => n + 1)} />
}
