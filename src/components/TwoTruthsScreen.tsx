import { useState } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"
import { CAPITALS } from "../data/capitals"
import { FLAG_ATTRIBS } from "../data/flagAttribs"
import { neighborsOf } from "../data/borders"
import { T, ACCENT, FONT, tint, IS_CARTO } from "../ui/tokens"
import FlagImage from "./FlagImage"

interface Props { onBack: () => void }

const ROUNDS = 6
const shuffle = <X,>(a: X[]): X[] => [...a].sort(() => Math.random() - 0.5)
const rand = <X,>(a: X[]): X => a[Math.floor(Math.random() * a.length)]
const NAME = (code: string) => FLAGS.find(f => f.code === code)?.name ?? code

const ALL_COLORS = ["red", "blue", "green", "yellow", "white", "black", "orange"]
const ALL_REGIONS = ["Europe", "Africa", "Asia", "Americas", "Oceania", "Middle East"]
const CAP = new Map(CAPITALS.map(c => [c.code, c]))

// Countries we can build statements for (flag + capital + attributes).
const POOL = FLAGS.filter(f => CAP.has(f.code) && FLAG_ATTRIBS[f.code])

interface Stmt { text: string; type: string }

function trueStmt(type: string, f: FlagRecord): Stmt | null {
  const cap = CAP.get(f.code)!
  const attr = FLAG_ATTRIBS[f.code]
  if (type === "capital") return { text: `Its capital is ${cap.capital}.`, type }
  if (type === "region") return { text: `It lies in ${f.region}.`, type }
  if (type === "color") return { text: `Its flag includes the colour ${rand(attr.colors)}.`, type }
  if (type === "border") {
    const ns = neighborsOf(f.code)
    if (!ns.length) return null
    return { text: `It shares a land border with ${NAME(rand(ns))}.`, type }
  }
  return null
}

function falseStmt(type: string, f: FlagRecord): Stmt {
  const cap = CAP.get(f.code)!
  const attr = FLAG_ATTRIBS[f.code]
  if (type === "capital") {
    const other = rand(CAPITALS.filter(c => c.capital !== cap.capital))
    return { text: `Its capital is ${other.capital}.`, type }
  }
  if (type === "region") {
    const other = rand(ALL_REGIONS.filter(r => r !== f.region))
    return { text: `It lies in ${other}.`, type }
  }
  if (type === "color") {
    const missing = ALL_COLORS.filter(c => !attr.colors.includes(c))
    return { text: `Its flag includes the colour ${rand(missing)}.`, type }
  }
  // border: claim a border with a country on a DIFFERENT continent (guaranteed
  // not a real neighbour, so the statement is reliably false)
  const far = rand(FLAGS.filter(x => x.region !== f.region && x.code !== f.code))
  return { text: `It shares a land border with ${far.name}.`, type }
}

interface Round { flag: FlagRecord; stmts: Stmt[]; falseIdx: number }

function makeRound(f: FlagRecord): Round {
  const types = ["capital", "region", "color"]
  if (neighborsOf(f.code).length) types.push("border")
  const chosen = shuffle(types).slice(0, 3)
  const falseType = rand(chosen)
  const built = chosen.map(t => ({ stmt: t === falseType ? falseStmt(t, f) : trueStmt(t, f)!, isFalse: t === falseType }))
  const ordered = shuffle(built)
  return { flag: f, stmts: ordered.map(b => b.stmt), falseIdx: ordered.findIndex(b => b.isFalse) }
}

function buildRounds(): Round[] {
  return shuffle(POOL).slice(0, ROUNDS).map(makeRound)
}

function TwoTruthsGame({ onBack, onReplay }: Props & { onReplay: () => void }) {
  const [rounds] = useState(buildRounds)
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [scores, setScores] = useState<boolean[]>([])
  const [done, setDone] = useState(false)

  const round = rounds[idx]
  const answered = picked !== null

  const choose = (i: number) => {
    if (answered) return
    setPicked(i)
    setScores(s => [...s, i === round.falseIdx])
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
            <div style={{ fontSize: 40 }}>{correct >= ROUNDS * 0.7 ? "🕵️" : "📚"}</div>
            <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 38, color: ACCENT.codex }}>{correct}<span style={{ color: T.dim, fontSize: 20 }}>/{ROUNDS}</span></div>
            <div style={{ color: T.muted, fontSize: 12 }}>lies spotted</div>
          </div>
          <button onClick={onReplay} className="geo-tap" style={{ padding: "14px 0", borderRadius: 12, fontWeight: 700, fontFamily: FONT.display, background: ACCENT.codex, color: IS_CARTO ? "#FFFCF4" : T.void }}>Play again</button>
          <button onClick={onBack} className="geo-tap" style={{ padding: "12px 0", borderRadius: 12, fontWeight: 600, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>← Home</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: T.bg }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 6px" }}>
        <button onClick={onBack} className="geo-tap" style={{ width: 34, height: 34, borderRadius: 9, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>‹</button>
        <div className="geo-micro" style={{ fontSize: 9, color: T.muted }}>Two Truths &amp; a Flag</div>
        <div style={{ fontFamily: FONT.mono, fontSize: 13, color: T.dim }}>{idx + 1}/{ROUNDS}</div>
      </header>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "10px 18px 22px", gap: 16 }}>
        <div style={{ width: 220, height: 146, margin: "0 auto", borderRadius: 14, overflow: "hidden", border: `1px solid ${T.lineHi}`, boxShadow: IS_CARTO ? "0 12px 28px -14px rgba(31,58,60,0.45)" : "0 0 30px rgba(0,0,0,0.4)" }}>
          <FlagImage code={round.flag.code} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <p className="geo-display" style={{ textAlign: "center", color: T.text, fontWeight: 700, fontSize: 18 }}>{round.flag.name}</p>
        <div className="geo-micro" style={{ textAlign: "center", fontSize: 9, color: T.muted, marginTop: -8 }}>One of these is a lie — tap it.</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {round.stmts.map((s, i) => {
            const isLie = i === round.falseIdx
            let border = `1.5px solid ${T.line}`, bg = T.surface
            if (answered) {
              if (isLie) { border = `2px solid ${T.warm}`; bg = tint(T.warm, IS_CARTO ? 0.1 : 0.14) }
              else if (i === picked) { border = `2px solid ${ACCENT.codex}` }
            }
            return (
              <button key={i} onClick={() => choose(i)} disabled={answered} className="geo-tap"
                style={{ textAlign: "left", padding: "13px 15px", borderRadius: 12, background: bg, border, color: T.text, fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ flex: 1 }}>{s.text}</span>
                {answered && isLie && <span style={{ color: T.warm, fontWeight: 700, fontSize: 12 }}>LIE</span>}
                {answered && !isLie && <span style={{ color: ACCENT.codex }}>✓</span>}
              </button>
            )
          })}
        </div>

        {answered && (
          <button onClick={next} className="geo-tap" style={{ marginTop: "auto", width: "100%", padding: "14px 0", borderRadius: 12, fontWeight: 700, fontFamily: FONT.display, background: ACCENT.codex, color: IS_CARTO ? "#FFFCF4" : T.void }}>
            {idx + 1 >= ROUNDS ? "See result →" : "Next →"}
          </button>
        )}
      </div>
    </div>
  )
}

export default function TwoTruthsScreen({ onBack }: Props) {
  const [k, setK] = useState(0)
  return <TwoTruthsGame key={k} onBack={onBack} onReplay={() => setK(n => n + 1)} />
}
