import { useState, useRef, useMemo } from "react"
import { FLAGS } from "../data/flags"
import { neighborsOf, countriesWithBorders } from "../data/borders"
import { T, ACCENT, FONT, tint, IS_CARTO } from "../ui/tokens"
import FlagImage from "./FlagImage"

interface Props { onBack: () => void }

const BEST_KEY = "globalio_borderchain_best"
const loadBest = () => { try { return Number(localStorage.getItem(BEST_KEY)) || 0 } catch { return 0 } }
const saveBest = (n: number) => { try { localStorage.setItem(BEST_KEY, String(n)) } catch { /* ignore */ } }
const NAME = (code: string) => FLAGS.find(f => f.code === code)?.name ?? code

// Start on a country with plenty of onward options for a satisfying run.
const STARTERS = countriesWithBorders(3)

function ChainGame({ onBack, onReplay }: Props & { onReplay: () => void }) {
  const [chain, setChain] = useState<string[]>(() => [STARTERS[Math.floor(Math.random() * STARTERS.length)]])
  const used = useMemo(() => new Set(chain), [chain])
  const [input, setInput] = useState("")
  const [showDrop, setShowDrop] = useState(false)
  const [over, setOver] = useState<null | { reason: string }>(null)
  const [best, setBest] = useState(loadBest)
  const inputRef = useRef<HTMLInputElement>(null)

  const current = chain[chain.length - 1]
  const options = neighborsOf(current)
  const remaining = options.filter(c => !used.has(c))

  const matches = input.trim().length
    ? FLAGS.filter(f => f.name.toLowerCase().includes(input.trim().toLowerCase())).slice(0, 6)
    : []

  const endRun = (reason: string) => {
    const len = chain.length
    if (len > best) { setBest(len); saveBest(len) }
    setOver({ reason })
  }

  const submit = (code: string) => {
    if (over) return
    setInput(""); setShowDrop(false)
    if (used.has(code)) { endRun(`${NAME(code)} was already in your chain.`); return }
    if (!options.includes(code)) { endRun(`${NAME(code)} doesn't border ${NAME(current)}.`); return }
    const next = [...chain, code]
    setChain(next)
    // dead end? (no onward moves) — that's a natural, successful stop
    if (neighborsOf(code).filter(c => !next.includes(c)).length === 0) {
      const len = next.length
      if (len > best) { setBest(len); saveBest(len) }
      setOver({ reason: `${NAME(code)} is a dead end — nice chain!` })
    }
    inputRef.current?.focus()
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && matches.length >= 1) submit(matches[0].code)
    if (e.key === "Escape") { setInput(""); setShowDrop(false) }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: T.bg }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 6px" }}>
        <button onClick={onBack} className="geo-tap" style={{ width: 34, height: 34, borderRadius: 9, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>‹</button>
        <div style={{ textAlign: "center" }}>
          <div className="geo-micro" style={{ fontSize: 9, color: T.muted }}>Border Chain</div>
          <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: ACCENT.learn }}>{chain.length}<span style={{ color: T.dim, fontSize: 12 }}> links</span></div>
        </div>
        <div style={{ textAlign: "right" }}><div className="geo-micro" style={{ fontSize: 8, color: T.dim }}>best</div><div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 14, color: T.amber }}>{best}</div></div>
      </header>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 18px 22px", gap: 16 }}>
        {/* chain so far */}
        <div style={{ display: "flex", gap: 6, overflowX: "auto", alignItems: "center", paddingBottom: 4 }}>
          {chain.map((c, i) => (
            <div key={c} style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              {i > 0 && <span style={{ color: T.dim }}>→</span>}
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 46, height: 31, borderRadius: 5, overflow: "hidden", border: `1px solid ${i === chain.length - 1 ? ACCENT.learn : T.line}`, boxShadow: i === chain.length - 1 ? `0 0 10px ${tint(ACCENT.learn, 0.6)}` : "none" }}>
                  <FlagImage code={c} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* current */}
        <div style={{ textAlign: "center" }}>
          <div className="geo-micro" style={{ fontSize: 9, color: T.muted, marginBottom: 6 }}>Name a country bordering</div>
          <div style={{ width: 200, height: 133, margin: "0 auto", borderRadius: 14, overflow: "hidden", border: `1px solid ${T.lineHi}`, boxShadow: IS_CARTO ? "0 12px 28px -14px rgba(31,58,60,0.45)" : "0 0 30px rgba(0,0,0,0.4)" }}>
            <FlagImage code={current} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div className="geo-display" style={{ fontWeight: 700, fontSize: 20, color: T.text, marginTop: 8 }}>{NAME(current)}</div>
          {!over && <div className="geo-mono" style={{ fontSize: 10, color: T.dim, marginTop: 2 }}>{remaining.length} option{remaining.length === 1 ? "" : "s"} left</div>}
        </div>

        {over ? (
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ borderRadius: 14, padding: 18, textAlign: "center", background: T.surface, border: `1px solid ${T.line}` }}>
              <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 34, color: ACCENT.learn }}>{chain.length}</div>
              <div style={{ color: T.muted, fontSize: 12 }}>{over.reason}</div>
            </div>
            <button onClick={onReplay} className="geo-tap" style={{ padding: "14px 0", borderRadius: 12, fontWeight: 700, fontFamily: FONT.display, background: ACCENT.learn, color: IS_CARTO ? "#FFFCF4" : T.void }}>New chain</button>
            <button onClick={onBack} className="geo-tap" style={{ padding: "12px 0", borderRadius: 12, fontWeight: 600, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>← Home</button>
          </div>
        ) : (
          <div style={{ position: "relative", marginTop: "auto" }}>
            <input ref={inputRef} value={input}
              onChange={e => { setInput(e.target.value); setShowDrop(true) }} onKeyDown={onKey}
              onFocus={() => setShowDrop(true)} onBlur={() => setTimeout(() => setShowDrop(false), 150)}
              placeholder={`Borders ${NAME(current)}…`} autoComplete="off"
              style={{ width: "100%", padding: "13px 14px", borderRadius: 12, outline: "none", fontWeight: 600, fontSize: 15, fontFamily: FONT.display, background: T.surface, border: `1.5px solid ${T.lineHi}`, color: T.text }} />
            {showDrop && matches.length > 0 && (
              <div style={{ position: "absolute", left: 0, right: 0, bottom: "100%", marginBottom: 6, borderRadius: 12, overflow: "hidden", background: T.surface, border: `1px solid ${T.line}`, boxShadow: "0 8px 32px rgba(0,0,0,0.25)", zIndex: 5 }}>
                {matches.map(f => (
                  <button key={f.code} onMouseDown={() => submit(f.code)} className="geo-tap"
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, textAlign: "left", padding: "9px 13px", borderBottom: `1px solid ${T.line}`, color: T.text, fontWeight: 600, fontSize: 13.5, background: "transparent" }}>
                    <FlagImage code={f.code} style={{ width: 26, height: 17, objectFit: "cover", borderRadius: 3 }} />
                    {f.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function BorderChainScreen({ onBack }: Props) {
  const [k, setK] = useState(0)
  return <ChainGame key={k} onBack={onBack} onReplay={() => setK(n => n + 1)} />
}
