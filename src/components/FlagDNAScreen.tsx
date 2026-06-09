import { useState, useRef, useMemo } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"
import { FLAG_ATTRIBS } from "../data/flagAttribs"

interface Props { onBack: () => void }

// Only use countries we have attribute data for as targets
const ELIGIBLE = FLAGS.filter(f => FLAG_ATTRIBS[f.code])
const MAX_GUESSES = 7

const ALL_COLORS = ["red","blue","green","yellow","white","black","orange"] as const
type Color = typeof ALL_COLORS[number]

const COLOR_HEX: Record<Color, string> = {
  red: "#F43F5E", blue: "#60A5FA", green: "#34D399",
  yellow: "#FBBF24", white: "#F5F3FF", black: "#6B7280", orange: "#FB923C",
}

interface GuessResult {
  flag: FlagRecord
  regionMatch: boolean
  colors: { color: Color; match: boolean }[]    // only colors relevant to target or guess
  stripes:  boolean | null   // null = both false (no info either way)
  cross:    boolean | null
  star:     boolean | null
  crescent: boolean | null
  emblem:   boolean | null
}

function buildResult(guess: FlagRecord, target: FlagRecord): GuessResult {
  const ga = FLAG_ATTRIBS[guess.code]
  const ta = FLAG_ATTRIBS[target.code]

  // Colors: show any color present in either flag
  const relevantColors = ALL_COLORS.filter(
    c => ta.colors.includes(c) || ga.colors.includes(c)
  )
  const colors = relevantColors.map(c => ({
    color: c,
    match: ta.colors.includes(c) === ga.colors.includes(c),
  }))

  const featMatch = (gv: boolean, tv: boolean) =>
    (gv || tv) ? (gv === tv) : null   // null if both false — not worth showing

  return {
    flag: guess,
    regionMatch: guess.region === target.region,
    colors,
    stripes:  featMatch(ga.stripes,  ta.stripes),
    cross:    featMatch(ga.cross,    ta.cross),
    star:     featMatch(ga.star,     ta.star),
    crescent: featMatch(ga.crescent, ta.crescent),
    emblem:   featMatch(ga.emblem,   ta.emblem),
  }
}

const FEAT_LABEL: Record<string, string> = {
  stripes: "Stripes", cross: "Cross", star: "Star(s)",
  crescent: "Crescent", emblem: "Emblem",
}
const REGION_EMOJI: Record<string, string> = {
  Europe: "🇪🇺", Americas: "🌎", Asia: "🌏",
  Africa: "🌍", Oceania: "🌊", "Middle East": "🕌",
}

export default function FlagDNAScreen({ onBack }: Props) {
  const [target]  = useState<FlagRecord>(() => ELIGIBLE[Math.floor(Math.random() * ELIGIBLE.length)])
  const [input,  setInput]  = useState("")
  const [guesses, setGuesses] = useState<GuessResult[]>([])
  const [phase,  setPhase]  = useState<"playing" | "won" | "lost">("playing")
  const [showDrop, setShowDrop] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const guessedCodes = new Set(guesses.map(g => g.flag.code))

  // Autocomplete matches
  const matches = useMemo(() => {
    const q = input.trim().toLowerCase()
    if (q.length < 1) return []
    return FLAGS
      .filter(f => f.name.toLowerCase().includes(q) && !guessedCodes.has(f.code))
      .slice(0, 6)
  }, [input, guessedCodes])

  const submitGuess = (flag: FlagRecord) => {
    if (phase !== "playing") return
    if (guessedCodes.has(flag.code)) return

    const result = buildResult(flag, target)
    const next   = [...guesses, result]
    setGuesses(next)
    setInput("")
    setShowDrop(false)
    inputRef.current?.focus()

    if (flag.code === target.code) { setPhase("won"); return }
    if (next.length >= MAX_GUESSES) { setPhase("lost"); return }
  }

  const alreadyWon  = phase === "won"
  const alreadyLost = phase === "lost"
  const finished    = alreadyWon || alreadyLost

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>

      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-8 pb-4" style={{ zIndex: 1 }}>
        <button onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Flag DNA</div>
          <div className="text-xs" style={{ color: "#8B6CFF" }}>
            {finished ? (alreadyWon ? "Solved!" : `It was ${target.name}`) : `${MAX_GUESSES - guesses.length} guess${MAX_GUESSES - guesses.length !== 1 ? "es" : ""} left`}
          </div>
        </div>
        {/* guess pips */}
        <div className="flex gap-1 items-center">
          {Array.from({ length: MAX_GUESSES }).map((_, i) => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: "50%",
              background: i < guesses.length
                ? (guesses[i].flag.code === target.code ? "#34D399" : "#F43F5E")
                : "#8B6CFF33",
            }} />
          ))}
        </div>
      </header>

      {/* Hidden flag revealed only when finished */}
      {finished && (
        <div className="flex flex-col items-center mb-3" style={{ zIndex: 1 }}>
          <div style={{ borderRadius: 12, overflow: "hidden", border: `2px solid ${alreadyWon ? "#34D399" : "#F43F5E"}` }}>
            <img src={target.flagUrl} alt={target.name} style={{ width: 180, height: 113, display: "block" }} />
          </div>
          <div className="text-base font-bold mt-2" style={{ color: "#F5F3FF" }}>{target.name}</div>
        </div>
      )}

      {/* Input row */}
      {!finished && (
        <div className="mx-5 mb-3 relative" style={{ zIndex: 10 }}>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                value={input}
                onChange={e => { setInput(e.target.value); setShowDrop(true) }}
                onFocus={() => setShowDrop(true)}
                onBlur={() => setTimeout(() => setShowDrop(false), 200)}
                placeholder="Type a country…"
                className="w-full px-4 py-3 rounded-xl text-sm font-medium"
                style={{
                  background: "#2D1F52", border: "1.5px solid #8B6CFF44",
                  color: "#F5F3FF", outline: "none",
                }}
              />
              {/* Dropdown */}
              {showDrop && matches.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 rounded-xl overflow-hidden"
                  style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", zIndex: 20, boxShadow: "0 8px 24px #00000066" }}>
                  {matches.map(f => (
                    <button key={f.code}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-all hover:bg-[#3D2A6A]"
                      onMouseDown={() => submitGuess(f)}
                      style={{ color: "#F5F3FF" }}>
                      <img src={f.flagUrl} alt="" style={{ width: 28, height: 18, objectFit: "cover", borderRadius: 3 }} />
                      {f.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Guess history */}
      <div className="flex-1 overflow-y-auto px-5 space-y-3 pb-6" style={{ zIndex: 1 }}>
        {guesses.map((g, gi) => {
          const isSelf = g.flag.code === target.code
          return (
            <div key={gi} className="rounded-xl overflow-hidden"
              style={{ border: `1px solid ${isSelf ? "#34D39944" : "#8B6CFF22"}`, background: "#1E1340" }}>

              {/* Flag row */}
              <div className="flex items-center gap-3 px-3 py-2.5"
                style={{ background: isSelf ? "#34D39908" : "transparent" }}>
                <img src={g.flag.flagUrl} alt={g.flag.name}
                  style={{ width: 48, height: 30, objectFit: "cover", borderRadius: 5, flexShrink: 0 }} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate" style={{ color: "#F5F3FF" }}>{g.flag.name}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span style={{ fontSize: 12 }}>{REGION_EMOJI[g.flag.region]}</span>
                    <span className="text-xs"
                      style={{ color: g.regionMatch ? "#34D399" : "#F43F5E" }}>
                      {g.flag.region} {g.regionMatch ? "✓" : "✗"}
                    </span>
                  </div>
                </div>
                {isSelf && <span style={{ fontSize: 20 }}>🎯</span>}
              </div>

              {/* Color chips */}
              <div className="flex flex-wrap gap-1.5 px-3 pb-2 pt-1">
                {g.colors.map(({ color, match }) => (
                  <span key={color} className="text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"
                    style={{
                      background: match ? `${COLOR_HEX[color]}22` : "#8B6CFF11",
                      border: `1px solid ${match ? COLOR_HEX[color] : "#8B6CFF22"}`,
                      color: match ? COLOR_HEX[color] : "#8B6CFF55",
                    }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLOR_HEX[color], display: "inline-block" }} />
                    {color} {match ? "✓" : "✗"}
                  </span>
                ))}
              </div>

              {/* Feature chips */}
              <div className="flex flex-wrap gap-1.5 px-3 pb-2.5">
                {(["stripes","cross","star","crescent","emblem"] as const).map(feat => {
                  const val = g[feat]
                  if (val === null) return null
                  return (
                    <span key={feat} className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        background: val ? "#34D39915" : "#F43F5E15",
                        border: `1px solid ${val ? "#34D39955" : "#F43F5E55"}`,
                        color: val ? "#34D399" : "#F43F5E",
                      }}>
                      {FEAT_LABEL[feat]} {val ? "✓" : "✗"}
                    </span>
                  )
                })}
              </div>
            </div>
          )
        })}

        {guesses.length === 0 && !finished && (
          <div className="text-center py-8" style={{ color: "#8B6CFF55" }}>
            <div style={{ fontSize: 40 }}>🧬</div>
            <p className="text-sm mt-2">Type a country to start decoding the flag</p>
            <p className="text-xs mt-1" style={{ color: "#8B6CFF33" }}>
              Each guess reveals what attributes match ✓ or don't ✗
            </p>
          </div>
        )}

        {finished && (
          <div className="flex flex-col gap-3 mt-2">
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
        )}
      </div>
    </div>
  )
}
