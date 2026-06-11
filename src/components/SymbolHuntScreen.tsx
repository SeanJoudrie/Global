import { useState } from "react"
import { FLAGS } from "../data/flags"
import { SYMBOLS } from "../data/flagSymbols"
import type { SymbolDef } from "../data/flagSymbols"
import { OTHER_IDENTITY_FLAGS } from "../data/identityFlags"
import { T, ACCENT, FONT } from "../ui/tokens"
import FlagImage from "./FlagImage"

interface Props { onBack: () => void }

const ROUNDS = 5
const GRID = 15
const shuffle = <X,>(a: X[]): X[] => [...a].sort(() => Math.random() - 0.5)

// A grid tile is either a real country flag (by code) or a non-country
// "identity" flag (rendered from a URL). Identity tiles are never a match —
// they're sprinkled in so players get exposed to them.
interface Cell { key: string; code?: string; url?: string; name?: string; match: boolean }
interface Round { sym: SymbolDef; grid: Cell[]; matchCount: number }

function buildRounds(): Round[] {
  return shuffle(SYMBOLS).slice(0, ROUNDS).map(sym => {
    const pool = [...sym.codes]
    const nMatch = Math.min(pool.length, 4 + Math.floor(Math.random() * 4)) // 4–7 present
    const matches = shuffle(pool).slice(0, nMatch)
    const matchCells: Cell[] = matches.map(code => ({ key: "c:" + code, code, match: true }))
    // 0–2 identity flags as decoys to introduce them
    const nIdentity = matchCells.length < GRID - 4 ? Math.floor(Math.random() * 3) : 0
    const idCells: Cell[] = shuffle(OTHER_IDENTITY_FLAGS).slice(0, nIdentity)
      .map(f => ({ key: "i:" + f.id, url: f.flagUrl, name: f.name, match: false }))
    const need = GRID - matchCells.length - idCells.length
    const fillers: Cell[] = shuffle(FLAGS.filter(f => !sym.codes.has(f.code))).slice(0, need)
      .map(f => ({ key: "c:" + f.code, code: f.code, match: false }))
    return { sym, grid: shuffle([...matchCells, ...idCells, ...fillers]), matchCount: matchCells.length }
  })
}

function SymbolHuntGame({ onBack, onReplay }: Props & { onReplay: () => void }) {
  const [rounds] = useState(buildRounds)
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<Set<string>>(new Set())
  const [checked, setChecked] = useState(false)
  const [scores, setScores] = useState<{ hit: number; miss: number; total: number }[]>([])
  const [done, setDone] = useState(false)

  const round = rounds[idx]
  const matchKeys = new Set(round.grid.filter(c => c.match).map(c => c.key))

  const toggle = (key: string) => {
    if (checked) return
    setPicked(p => { const n = new Set(p); n.has(key) ? n.delete(key) : n.add(key); return n })
  }

  const check = () => {
    let hit = 0, miss = 0
    picked.forEach(k => matchKeys.has(k) ? hit++ : miss++)
    setScores(s => [...s, { hit, miss, total: round.matchCount }])
    setChecked(true)
  }

  const next = () => {
    if (idx + 1 >= rounds.length) { setDone(true); return }
    setIdx(i => i + 1); setPicked(new Set()); setChecked(false)
  }

  if (done) {
    const hits = scores.reduce((a, s) => a + s.hit, 0)
    const total = scores.reduce((a, s) => a + s.total, 0)
    const misses = scores.reduce((a, s) => a + s.miss, 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5" style={{ background: T.bg }}>
        <div className="w-full max-w-sm" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ borderRadius: 16, padding: 24, textAlign: "center", background: T.surface, border: `1px solid ${T.line}` }}>
            <div style={{ fontSize: 40 }}>🔎</div>
            <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 38, color: ACCENT.play }}>{hits}<span style={{ color: T.dim, fontSize: 20 }}>/{total}</span></div>
            <div style={{ color: T.muted, fontSize: 12 }}>symbols found{misses ? ` · ${misses} wrong` : " · flawless!"}</div>
          </div>
          <button onClick={onReplay} className="geo-tap" style={{ padding: "14px 0", borderRadius: 12, fontWeight: 700, fontFamily: FONT.display, background: ACCENT.play, color: T.onAccent }}>Play again</button>
          <button onClick={onBack} className="geo-tap" style={{ padding: "12px 0", borderRadius: 12, fontWeight: 600, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>← Home</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: T.bg }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 6px" }}>
        <button onClick={onBack} className="geo-tap" style={{ width: 34, height: 34, borderRadius: 9, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>‹</button>
        <div className="geo-micro" style={{ fontSize: 9, color: T.muted }}>Symbol Hunt</div>
        <div style={{ fontFamily: FONT.mono, fontSize: 13, color: T.dim }}>{idx + 1}/{ROUNDS}</div>
      </header>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 16px 20px", gap: 14 }}>
        <div style={{ textAlign: "center" }}>
          <div className="geo-micro" style={{ fontSize: 9, color: T.muted }}>Tap every flag with</div>
          <div className="geo-display" style={{ fontWeight: 700, fontSize: 24, color: T.text }}>{round.sym.emoji} {round.sym.label}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9 }}>
          {round.grid.map(cell => {
            const isPicked = picked.has(cell.key)
            const isMatch = cell.match
            let border = `1.5px solid ${isPicked ? ACCENT.play : T.line}`
            if (checked) {
              if (isMatch) border = `2.5px solid ${ACCENT.codex}`           // should have been picked
              else if (isPicked) border = `2.5px solid ${T.warm}`           // wrong pick
            }
            return (
              <button key={cell.key} onClick={() => toggle(cell.key)} className="geo-tap"
                style={{ position: "relative", aspectRatio: "3/2", borderRadius: 8, overflow: "hidden", border, background: "#fff", opacity: checked && !isMatch && !isPicked ? 0.5 : 1 }}>
                {cell.code
                  ? <FlagImage code={cell.code} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  : <img src={cell.url} alt={cell.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => { (e.target as HTMLImageElement).style.opacity = "0.3" }} />}
                {isPicked && !checked && <span style={{ position: "absolute", top: 3, right: 3, width: 18, height: 18, borderRadius: "50%", background: ACCENT.play, color: "#fff", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>}
                {checked && isMatch && <span style={{ position: "absolute", bottom: 2, right: 3, fontSize: 13, color: ACCENT.codex }}>✓</span>}
                {checked && isPicked && !isMatch && <span style={{ position: "absolute", bottom: 2, right: 3, fontSize: 13, color: T.warm }}>✗</span>}
                {checked && !cell.code && <span style={{ position: "absolute", top: 2, left: 3, fontSize: 8, fontWeight: 700, color: T.warm, background: T.bg, padding: "1px 4px", borderRadius: 4 }}>not a country</span>}
              </button>
            )
          })}
        </div>

        <div style={{ marginTop: "auto" }}>
          {!checked
            ? <button onClick={check} className="geo-tap" style={{ width: "100%", padding: "14px 0", borderRadius: 12, fontWeight: 700, fontFamily: FONT.display, background: ACCENT.play, color: T.onAccent }}>Submit{picked.size ? ` (${picked.size})` : ""}</button>
            : <button onClick={next} className="geo-tap" style={{ width: "100%", padding: "14px 0", borderRadius: 12, fontWeight: 700, fontFamily: FONT.display, background: ACCENT.play, color: T.onAccent }}>{idx + 1 >= ROUNDS ? "See result →" : "Next →"}</button>}
        </div>
      </div>
    </div>
  )
}

export default function SymbolHuntScreen({ onBack }: Props) {
  const [k, setK] = useState(0)
  return <SymbolHuntGame key={k} onBack={onBack} onReplay={() => setK(n => n + 1)} />
}
