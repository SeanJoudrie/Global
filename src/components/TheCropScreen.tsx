import { useState, useMemo, useRef } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"

interface Props { onBack: () => void }

// Scale = CSS transform scale factor. We zoom from 6× down to 1×.
const SCALES = [6, 4, 2.8, 2, 1.4, 1]

function TheCropScreenGame({ onBack , onReplay }: Props & { onReplay: () => void }) {
  const [target]  = useState<FlagRecord>(() => FLAGS[Math.floor(Math.random() * FLAGS.length)])
  // Random focal point as percentages (transform-origin)
  const [originX] = useState(() => 20 + Math.random() * 60)  // 20–80%
  const [originY] = useState(() => 20 + Math.random() * 60)

  const [wrongGuesses, setWrongGuesses] = useState(0)
  const [phase, setPhase] = useState<"playing" | "result">("playing")
  const [solved, setSolved] = useState(false)

  // Type-in state
  const [input, setInput]       = useState("")
  const [showDrop, setShowDrop] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const guessedCodes = useRef<Set<string>>(new Set())

  const scaleIdx = Math.min(wrongGuesses, SCALES.length - 1)
  const scale    = SCALES[scaleIdx]

  const matches = useMemo(() => {
    const q = input.trim().toLowerCase()
    if (q.length < 1) return []
    return FLAGS.filter(f =>
      (f.name.toLowerCase().includes(q) || f.code.toLowerCase() === q) &&
      !guessedCodes.current.has(f.code)
    ).slice(0, 6)
  }, [input])

  const submitGuess = (flag: FlagRecord) => {
    if (phase !== "playing") return
    guessedCodes.current.add(flag.code)
    setInput("")
    setShowDrop(false)

    if (flag.code === target.code) {
      setSolved(true)
      setPhase("result")
      return
    }
    const next = wrongGuesses + 1
    setWrongGuesses(next)
    if (next >= SCALES.length - 1) {
      setTimeout(() => setPhase("result"), 800)
    }
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && matches.length === 1) submitGuess(matches[0])
    if (e.key === "Escape") { setInput(""); setShowDrop(false) }
  }

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>

      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>The Crop</div>
          <div className="text-xs" style={{ color: "#8B6CFF" }}>
            {phase === "playing"
              ? `${SCALES.length - 1 - wrongGuesses} reveal${SCALES.length - 1 - wrongGuesses !== 1 ? "s" : ""} left`
              : solved ? "Identified!" : "Better luck next time"}
          </div>
        </div>
        <div className="flex gap-1.5 items-center">
          {Array.from({ length: SCALES.length - 1 }).map((_, i) => (
            <div key={i} style={{
              width: 7, height: 7, borderRadius: "50%",
              background: i < wrongGuesses ? "#F43F5E" : "#8B6CFF33",
            }} />
          ))}
        </div>
      </header>

      <div className="flex flex-col items-center px-5 gap-4">

        {/* Cropped flag — transform-based zoom */}
        <div style={{
          width: 300, height: 200,
          overflow: "hidden",
          borderRadius: 14,
          border: phase === "result"
            ? `2px solid ${solved ? "#34D399" : "#F43F5E"}`
            : "2px solid #8B6CFF44",
          boxShadow: "0 0 32px #8B6CFF22",
          position: "relative",
          background: "#1A1033",
        }}>
          <img
            src={target.flagUrl}
            alt="flag"
            onError={e => {
              const el = e.target as HTMLImageElement
              if (!el.dataset.fb) {
                el.dataset.fb = "1"
                el.src = `https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/${target.code.toLowerCase()}.svg`
              }
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${scale})`,
              transformOrigin: `${originX}% ${originY}%`,
              transition: "transform 0.65s cubic-bezier(0.22,1,0.36,1)",
              display: "block",
            }}
          />
          {phase === "result" && !solved && (
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent,#12093088)",
              padding: "20px 12px 10px", textAlign: "center",
            }}>
              <span style={{ color: "#F5F3FF", fontWeight: 700 }}>{target.name}</span>
            </div>
          )}
        </div>

        {/* Zoom indicator */}
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 11, color: "#8B6CFF55" }}>zoom</span>
          {SCALES.map((_s, i) => (
            <div key={i} style={{
              width: 18, height: 4, borderRadius: 2,
              background: i === scaleIdx ? "#8B6CFF" : "#8B6CFF22",
              transition: "background 0.3s",
            }} />
          ))}
        </div>

        {/* Result card */}
        {phase === "result" ? (
          <div className="w-full max-w-sm flex flex-col gap-3">
            <div className="rounded-xl p-4 text-center"
              style={{ background: "#2D1F52", border: `1px solid ${solved ? "#34D39944" : "#F43F5E44"}` }}>
              <div className="text-2xl mb-1">{solved ? "🎯" : "😬"}</div>
              <div className="font-bold text-lg" style={{ color: "#F5F3FF" }}>{target.name}</div>
              <div className="text-xs mt-1" style={{ color: "#B8A9E0" }}>
                {solved
                  ? `Found in ${wrongGuesses + 1} guess${wrongGuesses + 1 !== 1 ? "es" : ""}!`
                  : "Fully revealed — better luck next time."}
              </div>
            </div>
            <button onClick={onReplay}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
              New Flag
            </button>
            <button onClick={onBack}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "#2D1F52", border: "1px solid #8B6CFF33", color: "#B8A9E0" }}>
              ← Home
            </button>
          </div>
        ) : (
          /* Type-in */
          <div className="w-full max-w-sm relative">
            <input
              ref={inputRef}
              value={input}
              onChange={e => { setInput(e.target.value); setShowDrop(true) }}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowDrop(true)}
              onBlur={() => setTimeout(() => setShowDrop(false), 150)}
              placeholder="Type a country name or code…"
              autoComplete="off"
              className="w-full px-4 py-3.5 rounded-xl outline-none font-semibold"
              style={{
                background: "#2D1F52", border: "1.5px solid #8B6CFF44",
                color: "#F5F3FF", fontSize: 15,
              }}
            />
            {showDrop && matches.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 rounded-xl overflow-hidden z-10"
                style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 8px 32px #00000044" }}>
                {matches.map(flag => (
                  <button key={flag.code}
                    onMouseDown={() => submitGuess(flag)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:brightness-125 transition-all"
                    style={{ background: "transparent", borderBottom: "1px solid #8B6CFF11" }}>
                    <img src={flag.flagUrl} alt="" style={{ width: 32, height: 21, objectFit: "cover", borderRadius: 3 }} />
                    <span style={{ color: "#F5F3FF", fontWeight: 600 }}>{flag.name}</span>
                    <span style={{ color: "#8B6CFF88", fontSize: 11, marginLeft: "auto" }}>{flag.code}</span>
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

export default function TheCropScreen({ onBack }: Props) {
  const [replayKey, setReplayKey] = useState(0)
  return <TheCropScreenGame key={replayKey} onBack={onBack} onReplay={() => setReplayKey(k => k + 1)} />
}
