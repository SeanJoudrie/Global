import { useState, useRef, useMemo } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"
import FlagImage from "./FlagImage"

interface Props { onBack: () => void }

// Each wrong guess lifts the flag one stage. brightness() scales luminance, so
// blacks stay black and whites only reach true white at the end — preserving
// the real contrast. grayscale starts at 1 (no colour tell) and fades to a
// faint hint near the end before the full-colour reveal.
const STAGES = [
  { filter: "grayscale(1) brightness(0.04)",   label: "Barely visible", pts: 1000 },
  { filter: "grayscale(1) brightness(0.12)",   label: "Very dark",      pts: 800  },
  { filter: "grayscale(1) brightness(0.30)",   label: "Dark grey",      pts: 600  },
  { filter: "grayscale(0.7) brightness(0.55)", label: "Grey",           pts: 400  },
  { filter: "grayscale(0.3) brightness(0.82)", label: "Faint colour",   pts: 200  },
]

const ROUNDS = 5

function buildRounds(): FlagRecord[] {
  return [...FLAGS].sort(() => Math.random() - 0.5).slice(0, ROUNDS)
}

interface RoundResult { correct: boolean; pts: number }

function SilhouetteGame({ onBack, onReplay }: Props & { onReplay: () => void }) {
  const [rounds] = useState(buildRounds)
  const [idx, setIdx] = useState(0)
  const [stage, setStage] = useState(0)        // 0..STAGES.length-1
  const [revealed, setRevealed] = useState(false)
  const [solved, setSolved] = useState(false)
  const [results, setResults] = useState<RoundResult[]>([])
  const [done, setDone] = useState(false)

  const [input, setInput] = useState("")
  const [showDrop, setShowDrop] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const guessedCodes = useRef<Set<string>>(new Set())

  const target = rounds[idx]
  const currentStage = STAGES[stage]
  const filter = revealed ? "none" : currentStage.filter

  const matches = useMemo(() => {
    const q = input.trim().toLowerCase()
    if (q.length < 1) return []
    return FLAGS.filter(f =>
      (f.name.toLowerCase().includes(q) || f.code.toLowerCase() === q) &&
      !guessedCodes.current.has(f.code)
    ).slice(0, 6)
  }, [input])

  const nextRound = (result: RoundResult) => {
    setResults(prev => [...prev, result])
    // brief reveal pause, then advance
    setRevealed(true)
    setTimeout(() => {
      if (idx + 1 >= rounds.length) { setDone(true); return }
      setIdx(i => i + 1)
      setStage(0)
      setRevealed(false)
      setSolved(false)
      setInput("")
      setShowDrop(false)
      guessedCodes.current = new Set()
    }, 1100)
  }

  const submitGuess = (flag: FlagRecord) => {
    if (revealed) return
    guessedCodes.current.add(flag.code)
    setInput("")
    setShowDrop(false)

    if (flag.code === target.code) {
      setSolved(true)
      nextRound({ correct: true, pts: currentStage.pts })
      return
    }
    // wrong: lighten one stage, or fail if already at the lightest pre-reveal stage
    if (stage < STAGES.length - 1) {
      setStage(s => s + 1)
      inputRef.current?.focus()
    } else {
      setSolved(false)
      nextRound({ correct: false, pts: 0 })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && matches.length >= 1) submitGuess(matches[0])
    if (e.key === "Escape") { setInput(""); setShowDrop(false) }
  }

  // ── Result ────────────────────────────────────────────────────────────────
  if (done) {
    const totalPts = results.reduce((s, r) => s + r.pts, 0)
    const maxPts = ROUNDS * STAGES[0].pts
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl p-6 text-center mb-4"
            style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 0 32px #8B6CFF22" }}>
            <div className="text-5xl mb-3">{totalPts >= maxPts * 0.8 ? "👁️" : totalPts >= maxPts * 0.4 ? "🌑" : "📚"}</div>
            <div className="text-5xl font-black mb-1" style={{ color: "#F5F3FF" }}>{totalPts.toLocaleString()}</div>
            <div className="text-sm mb-3" style={{ color: "#B8A9E0" }}>pts · max {maxPts.toLocaleString()}</div>
            <div className="flex justify-center gap-2 flex-wrap">
              {results.map((r, i) => <span key={i} style={{ fontSize: 22 }}>{r.correct ? "🟩" : "🟥"}</span>)}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={onReplay}
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

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Silhouette</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>{idx + 1} / {ROUNDS}</div>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: ROUNDS }).map((_, i) => (
            <div key={i} style={{
              width: 7, height: 7, borderRadius: "50%",
              background: i < results.length ? (results[i].correct ? "#34D399" : "#F43F5E") : "#8B6CFF33",
            }} />
          ))}
        </div>
      </header>

      <div className="flex flex-col items-center px-5 gap-4">
        {/* Stage / points indicator */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: "#8B6CFF22", color: "#A78BFA", border: "1px solid #8B6CFF44" }}>
            {revealed ? (solved ? "Revealed" : target.name) : currentStage.label}
          </div>
          {!revealed && (
            <div className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: "#34D39922", color: "#34D399", border: "1px solid #34D39944" }}>
              {currentStage.pts} pts
            </div>
          )}
        </div>

        {/* The darkened flag */}
        <div style={{
          width: 300, height: 200, borderRadius: 12, overflow: "hidden",
          border: revealed ? `2px solid ${solved ? "#34D399" : "#F43F5E"}` : "2px solid #8B6CFF33",
          background: "#000", position: "relative",
        }}>
          <FlagImage
            code={target.code}
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              filter, transition: "filter 0.5s ease",
            }}
          />
          {revealed && !solved && (
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent,#12093088)", padding: "20px 12px 8px", textAlign: "center",
            }}>
              <span style={{ color: "#F5F3FF", fontWeight: 700 }}>{target.name}</span>
            </div>
          )}
        </div>

        {/* Reveal-progress pips */}
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 11, color: "#8B6CFF55" }}>reveal</span>
          {STAGES.map((_s, i) => (
            <div key={i} style={{
              width: 18, height: 4, borderRadius: 2,
              background: i <= stage ? "#8B6CFF" : "#8B6CFF22", transition: "background 0.3s",
            }} />
          ))}
        </div>

        {/* Type-in */}
        {!revealed && (
          <div className="w-full max-w-sm relative">
            <input
              ref={inputRef}
              value={input}
              onChange={e => { setInput(e.target.value); setShowDrop(true) }}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowDrop(true)}
              onBlur={() => setTimeout(() => setShowDrop(false), 150)}
              placeholder="Type the country name…"
              autoComplete="off"
              className="w-full px-4 py-3.5 rounded-xl outline-none font-semibold"
              style={{ background: "#2D1F52", border: "1.5px solid #8B6CFF44", color: "#F5F3FF", fontSize: 15 }}
            />
            {showDrop && matches.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 rounded-xl overflow-hidden z-10"
                style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 8px 32px #00000044" }}>
                {matches.map(flag => (
                  <button key={flag.code} onMouseDown={() => submitGuess(flag)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:brightness-125 transition-all"
                    style={{ background: "transparent", borderBottom: "1px solid #8B6CFF11" }}>
                    <FlagImage code={flag.code} style={{ width: 32, height: 21, objectFit: "cover", borderRadius: 3 }} />
                    <span style={{ color: "#F5F3FF", fontWeight: 600 }}>{flag.name}</span>
                    <span style={{ color: "#8B6CFF88", fontSize: 11, marginLeft: "auto" }}>{flag.code}</span>
                  </button>
                ))}
              </div>
            )}
            {guessedCodes.current.size > 0 && (
              <p className="text-xs mt-2 text-center" style={{ color: "#F43F5E99" }}>
                {guessedCodes.current.size} wrong · it lightens with each miss
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function SilhouetteScreen({ onBack }: Props) {
  const [replayKey, setReplayKey] = useState(0)
  return <SilhouetteGame key={replayKey} onBack={onBack} onReplay={() => setReplayKey(k => k + 1)} />
}
