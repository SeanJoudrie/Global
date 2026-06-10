import { useState, useMemo, useRef } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"

interface Props { onBack: () => void }

// Each wrong guess lightens the flag one step: near-black silhouette → dark
// gray → light gray → a hint of colour → full colour. Black/white contrast is
// preserved throughout (grayscale + contrast).
const STAGES = [
  { filter: "grayscale(1) brightness(0.05) contrast(1.5)", label: "Pitch black", pts: 1000 },
  { filter: "grayscale(1) brightness(0.16) contrast(1.35)", label: "Very dark",  pts: 750  },
  { filter: "grayscale(1) brightness(0.38) contrast(1.2)",  label: "Dark gray",  pts: 500  },
  { filter: "grayscale(1) brightness(0.72)",                label: "Light gray", pts: 300  },
  { filter: "grayscale(0.5) brightness(0.95)",              label: "A hint of colour", pts: 150 },
  { filter: "none",                                         label: "Full colour", pts: 50  },
]

export default function SilhouetteScreen({ onBack }: Props) {
  // Fresh random flag every mount / "New flag" reload.
  const [target] = useState<FlagRecord>(() => FLAGS[Math.floor(Math.random() * FLAGS.length)])

  const [wrong, setWrong] = useState(0)
  const [phase, setPhase] = useState<"playing" | "result">("playing")
  const [solved, setSolved] = useState(false)

  const [input, setInput] = useState("")
  const [showDrop, setShowDrop] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const guessed = useRef<Set<string>>(new Set())

  const stageIdx = Math.min(wrong, STAGES.length - 1)
  const stage = STAGES[stageIdx]
  const revealFilter = phase === "result" ? "none" : stage.filter

  const matches = useMemo(() => {
    const q = input.trim().toLowerCase()
    if (q.length < 1) return []
    return FLAGS.filter(f =>
      (f.name.toLowerCase().includes(q) || f.code.toLowerCase() === q) &&
      !guessed.current.has(f.code)
    ).slice(0, 6)
  }, [input])

  const submitGuess = (flag: FlagRecord) => {
    if (phase !== "playing") return
    guessed.current.add(flag.code)
    setInput("")
    setShowDrop(false)
    if (flag.code === target.code) {
      setSolved(true)
      setPhase("result")
      return
    }
    const next = wrong + 1
    setWrong(next)
    if (next >= STAGES.length - 1) setTimeout(() => setPhase("result"), 700)
    inputRef.current?.focus()
  }

  // ── Result ──────────────────────────────────────────────────────────────
  if (phase === "result") {
    const pts = solved ? STAGES[Math.min(wrong, STAGES.length - 1)].pts : 0
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl overflow-hidden mb-4" style={{ border: `2px solid ${solved ? "#34D399" : "#F43F5E"}` }}>
            <img src={target.flagUrl} alt={target.name}
              style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
          </div>
          <div className="rounded-2xl p-6 text-center mb-4"
            style={{ background: "#2D1F52", border: `1px solid ${solved ? "#34D39944" : "#F43F5E44"}` }}>
            <div className="text-4xl mb-2">{solved ? "👁️" : "📚"}</div>
            <div className="text-2xl font-black mb-1" style={{ color: "#F5F3FF" }}>{target.name}</div>
            <div className="text-sm" style={{ color: solved ? "#34D399" : "#B8A9E0" }}>
              {solved ? `Solved at "${stage.label}" — ${pts} pts` : "Fully revealed — better luck next time."}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => window.location.reload()}
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
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>

      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Silhouette</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>{stage.label}</div>
        </div>
        <div className="flex gap-1.5">
          {STAGES.slice(0, STAGES.length - 1).map((_, i) => (
            <div key={i} style={{
              width: 7, height: 7, borderRadius: "50%",
              background: i < wrong ? "#F43F5E" : "#8B6CFF33",
            }} />
          ))}
        </div>
      </header>

      <div className="flex flex-col items-center px-5 gap-4">
        {/* Darkened flag */}
        <div style={{
          width: 300, height: 200, borderRadius: 14, overflow: "hidden",
          border: "2px solid #8B6CFF44", boxShadow: "0 0 32px #8B6CFF22", background: "#000",
        }}>
          <img
            src={target.flagUrl}
            alt="mystery flag"
            onError={e => {
              const el = e.target as HTMLImageElement
              if (!el.dataset.fb) {
                el.dataset.fb = "1"
                el.src = `https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/${target.code.toLowerCase()}.svg`
              }
            }}
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              filter: revealFilter, transition: "filter 0.6s ease",
            }}
          />
        </div>

        {/* Reveal indicator */}
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 11, color: "#8B6CFF55" }}>reveal</span>
          {STAGES.map((_s, i) => (
            <div key={i} style={{
              width: i === stageIdx ? 22 : 14, height: 5, borderRadius: 3,
              background: i <= stageIdx ? "#8B6CFF" : "#8B6CFF22",
              transition: "all 0.3s",
            }} />
          ))}
        </div>

        <p className="text-xs text-center" style={{ color: "#B8A9E0", maxWidth: 280 }}>
          Type the country. Each wrong guess lightens the flag.
        </p>

        {/* Type-in */}
        <div className="w-full max-w-sm relative">
          <input
            ref={inputRef}
            value={input}
            onChange={e => { setInput(e.target.value); setShowDrop(true) }}
            onFocus={() => setShowDrop(true)}
            placeholder="Type a country name or code…"
            className="w-full px-4 py-3.5 rounded-xl text-base outline-none"
            style={{ background: "#2D1F52", border: "1.5px solid #8B6CFF44", color: "#F5F3FF" }}
            onKeyDown={e => { if (e.key === "Enter" && matches[0]) submitGuess(matches[0]) }}
          />
          {showDrop && matches.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 rounded-xl overflow-hidden z-10"
              style={{ background: "#241A45", border: "1px solid #8B6CFF44", boxShadow: "0 12px 32px #00000066" }}>
              {matches.map(flag => (
                <button key={flag.code} onClick={() => submitGuess(flag)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all active:scale-[0.99]"
                  style={{ borderBottom: "1px solid #8B6CFF11" }}>
                  <img src={flag.flagUrl} alt="" style={{ width: 32, height: 21, objectFit: "cover", borderRadius: 3 }} />
                  <span style={{ color: "#F5F3FF", fontSize: 14, fontWeight: 600 }}>{flag.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
