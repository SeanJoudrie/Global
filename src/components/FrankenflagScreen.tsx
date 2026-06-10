import { useState, useMemo } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"

interface Props { onBack: () => void }

const ROUNDS = 5

interface Round { top: FlagRecord; bottom: FlagRecord }

function rand() { return FLAGS[Math.floor(Math.random() * FLAGS.length)] }
function buildRounds(): Round[] {
  const rounds: Round[] = []
  for (let i = 0; i < ROUNDS; i++) {
    let a = rand(), b = rand()
    while (b.code === a.code) b = rand()
    rounds.push({ top: a, bottom: b })
  }
  return rounds
}

// Small inline autocomplete (same pattern as The Crop / The Peel)
function FlagInput({ placeholder, onPick, disabled }: {
  placeholder: string; onPick: (f: FlagRecord) => void; disabled?: boolean
}) {
  const [input, setInput] = useState("")
  const [show, setShow] = useState(false)
  const matches = useMemo(() => {
    const q = input.trim().toLowerCase()
    if (q.length < 1) return []
    return FLAGS.filter(f => f.name.toLowerCase().includes(q) || f.code.toLowerCase() === q).slice(0, 5)
  }, [input])
  if (disabled) return null
  return (
    <div className="relative w-full">
      <input value={input} autoComplete="off"
        onChange={e => { setInput(e.target.value); setShow(true) }}
        onFocus={() => setShow(true)} onBlur={() => setTimeout(() => setShow(false), 150)}
        onKeyDown={e => { if (e.key === "Enter" && matches.length === 1) { onPick(matches[0]); setInput("") } }}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl outline-none font-semibold"
        style={{ background: "#2D1F52", border: "1.5px solid #8B6CFF44", color: "#F5F3FF", fontSize: 14 }} />
      {show && matches.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1 rounded-xl overflow-hidden z-20"
          style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 8px 32px #00000055" }}>
          {matches.map(f => (
            <button key={f.code} onMouseDown={() => { onPick(f); setInput(""); setShow(false) }}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:brightness-125"
              style={{ background: "transparent", borderBottom: "1px solid #8B6CFF11" }}>
              <img src={f.flagUrl} alt="" style={{ width: 30, height: 20, objectFit: "cover", borderRadius: 3 }} />
              <span style={{ color: "#F5F3FF", fontWeight: 600, fontSize: 13 }}>{f.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function FrankenflagScreen({ onBack }: Props) {
  const [rounds] = useState(buildRounds)
  const [idx, setIdx] = useState(0)
  const [topGuess, setTopGuess] = useState<FlagRecord | null>(null)
  const [botGuess, setBotGuess] = useState<FlagRecord | null>(null)
  const [checked, setChecked] = useState(false)
  const [scores, setScores] = useState<number[]>([]) // 0, 0.5, or 1 per round
  const [done, setDone] = useState(false)

  const round = rounds[idx]

  const check = () => {
    let pts = 0
    if (topGuess?.code === round.top.code) pts += 0.5
    if (botGuess?.code === round.bottom.code) pts += 0.5
    setScores(s => [...s, pts])
    setChecked(true)
  }
  const next = () => {
    if (idx + 1 >= ROUNDS) { setDone(true); return }
    setIdx(i => i + 1); setTopGuess(null); setBotGuess(null); setChecked(false)
  }

  if (done) {
    const total = scores.reduce((a, b) => a + b, 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl p-6 text-center mb-4"
            style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 0 32px #8B6CFF22" }}>
            <div className="text-5xl mb-3">🧟</div>
            <div className="text-6xl font-black mb-1" style={{ color: "#F5F3FF" }}>{total}/{ROUNDS}</div>
            <div className="text-sm" style={{ color: "#B8A9E0" }}>halves identified</div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => window.location.reload()}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>Play Again</button>
            <button onClick={onBack}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "#2D1F52", border: "1px solid #8B6CFF33", color: "#B8A9E0" }}>← Home</button>
          </div>
        </div>
      </div>
    )
  }

  const topOK = checked && topGuess?.code === round.top.code
  const botOK = checked && botGuess?.code === round.bottom.code

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Frankenflag</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>{idx + 1} / {ROUNDS}</div>
        </div>
        <div style={{ width: 36 }} />
      </header>

      <div className="flex flex-col items-center px-5 gap-4">
        <p className="text-xs text-center" style={{ color: "#B8A9E0" }}>Two flags stitched together — name the top and bottom halves.</p>

        {/* Composite flag */}
        <div style={{ width: 280, height: 188, borderRadius: 12, overflow: "hidden", border: "2px solid #8B6CFF33", boxShadow: "0 0 28px #8B6CFF22" }}>
          <div style={{ width: "100%", height: "50%", overflow: "hidden", position: "relative", borderBottom: "2px solid #120930" }}>
            <img src={round.top.flagUrl} alt="top" style={{ width: "100%", height: 188, objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ width: "100%", height: "50%", overflow: "hidden", position: "relative" }}>
            <img src={round.bottom.flagUrl} alt="bottom" style={{ width: "100%", height: 188, objectFit: "cover", display: "block", marginTop: -94 }} />
          </div>
        </div>

        {/* Inputs / results */}
        <div className="w-full max-w-sm flex flex-col gap-3">
          <div>
            <div className="text-xs font-semibold mb-1" style={{ color: "#8B6CFF" }}>Top half</div>
            {!checked
              ? <FlagInput placeholder="Name the top flag…" onPick={setTopGuess} />
              : <div className="px-4 py-3 rounded-xl font-semibold flex items-center justify-between"
                  style={{ background: "#2D1F52", border: `1.5px solid ${topOK ? "#34D399" : "#F43F5E"}`, color: "#F5F3FF" }}>
                  <span>{round.top.name}</span><span>{topOK ? "✓" : `✗ (you: ${topGuess?.name ?? "—"})`}</span>
                </div>}
            {!checked && topGuess && <div className="text-xs mt-1" style={{ color: "#A78BFA" }}>Selected: {topGuess.name}</div>}
          </div>
          <div>
            <div className="text-xs font-semibold mb-1" style={{ color: "#8B6CFF" }}>Bottom half</div>
            {!checked
              ? <FlagInput placeholder="Name the bottom flag…" onPick={setBotGuess} />
              : <div className="px-4 py-3 rounded-xl font-semibold flex items-center justify-between"
                  style={{ background: "#2D1F52", border: `1.5px solid ${botOK ? "#34D399" : "#F43F5E"}`, color: "#F5F3FF" }}>
                  <span>{round.bottom.name}</span><span>{botOK ? "✓" : `✗ (you: ${botGuess?.name ?? "—"})`}</span>
                </div>}
            {!checked && botGuess && <div className="text-xs mt-1" style={{ color: "#A78BFA" }}>Selected: {botGuess.name}</div>}
          </div>
        </div>

        {!checked ? (
          <button onClick={check} disabled={!topGuess && !botGuess}
            className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{ background: (topGuess || botGuess) ? "linear-gradient(135deg,#8B6CFF,#A78BFA)" : "#2D1F52",
              color: (topGuess || botGuess) ? "#fff" : "#8B6CFF55", border: "1px solid #8B6CFF22" }}>
            Check →
          </button>
        ) : (
          <button onClick={next}
            className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
            {idx + 1 >= ROUNDS ? "See Results →" : "Next →"}
          </button>
        )}
      </div>
    </div>
  )
}
