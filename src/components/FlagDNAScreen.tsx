import { useState, useRef, useMemo } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"
import { FLAG_ATTRIBS, STRIPES_V } from "../data/flagAttribs"

interface Props { onBack: () => void }

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
  proximity: number            // 0–100 similarity %
  colors: { color: Color; match: boolean }[]
  stripesH: boolean | null
  stripesV: boolean | null
  cross:    boolean | null
  star:     boolean | null
  crescent: boolean | null
  emblem:   boolean | null
}

function buildResult(guess: FlagRecord, target: FlagRecord): GuessResult {
  const ga = FLAG_ATTRIBS[guess.code]
  const ta = FLAG_ATTRIBS[target.code]

  // Only ever show colours that belong to the *answer* — a ✓ means your guess
  // also has it, a ✗ means the answer has it and you missed it. We never surface
  // colours that aren't in the target (no "not called yet" middle ground).
  const relevantColors = ALL_COLORS.filter(c => ta.colors.includes(c))
  const colors = relevantColors.map(c => ({
    color: c,
    match: ga.colors.includes(c),
  }))

  const featMatch = (gv: boolean, tv: boolean) => (gv || tv) ? (gv === tv) : null

  // Proximity score: compare all attributes, weight region heavily
  let matched = 0, total = 0

  // Region (weight 2)
  total += 2; if (guess.region === target.region) matched += 2

  // Colors (weight 1 each)
  for (const c of ALL_COLORS) {
    total++
    if (ta.colors.includes(c) === ga.colors.includes(c)) matched++
  }

  // Features (weight 1 each)
  const feats: [boolean, boolean][] = [
    [ga.stripes, ta.stripes],
    [STRIPES_V.has(guess.code), STRIPES_V.has(target.code)],
    [ga.cross, ta.cross],
    [ga.star, ta.star],
    [ga.crescent, ta.crescent],
    [ga.emblem, ta.emblem],
  ]
  for (const [gv, tv] of feats) { total++; if (gv === tv) matched++ }

  const proximity = Math.round((matched / total) * 100)

  return {
    flag: guess,
    regionMatch: guess.region === target.region,
    proximity,
    colors,
    stripesH: featMatch(ga.stripes,            ta.stripes),
    stripesV: featMatch(STRIPES_V.has(guess.code), STRIPES_V.has(target.code)),
    cross:    featMatch(ga.cross,    ta.cross),
    star:     featMatch(ga.star,     ta.star),
    crescent: featMatch(ga.crescent, ta.crescent),
    emblem:   featMatch(ga.emblem,   ta.emblem),
  }
}

function proximityLabel(pct: number): { emoji: string; label: string; color: string } {
  if (pct >= 90) return { emoji: '🔥', label: 'Burning hot',  color: '#F43F5E' }
  if (pct >= 75) return { emoji: '🌶️', label: 'Very warm',   color: '#FB923C' }
  if (pct >= 60) return { emoji: '🌡️', label: 'Warm',        color: '#FBBF24' }
  if (pct >= 45) return { emoji: '🌤️', label: 'Lukewarm',    color: '#A78BFA' }
  return                { emoji: '❄️', label: 'Cold',         color: '#60A5FA' }
}

const FEAT_LABEL: Record<string, string> = {
  stripesH: "H-Stripes", stripesV: "V-Stripes",
  cross: "Cross", star: "Star(s)", crescent: "Crescent", emblem: "Emblem",
}
const REGION_EMOJI: Record<string, string> = {
  Europe: "🇪🇺", Americas: "🌎", Asia: "🌏",
  Africa: "🌍", Oceania: "🌊", "Middle East": "🕌",
}

function FlagDNAScreenGame({ onBack , onReplay }: Props & { onReplay: () => void }) {
  const [target]  = useState<FlagRecord>(() => ELIGIBLE[Math.floor(Math.random() * ELIGIBLE.length)])
  const [input,  setInput]  = useState("")
  const [guesses, setGuesses] = useState<GuessResult[]>([])
  const [phase,  setPhase]  = useState<"playing" | "won" | "lost" | "gaveup">("playing")
  const [showDrop, setShowDrop] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const guessedCodes = useMemo(() => new Set(guesses.map(g => g.flag.code)), [guesses])

  const matches = useMemo(() => {
    const q = input.trim().toLowerCase()
    if (q.length < 1) return []
    return FLAGS
      .filter(f => (f.name.toLowerCase().includes(q) || f.code.toLowerCase() === q) && !guessedCodes.has(f.code))
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

  const handleGiveUp = () => setPhase("gaveup")

  const finished = phase !== "playing"
  const won      = phase === "won"

  // Best proximity so far (for display)
  const bestProx = guesses.length > 0
    ? Math.max(...guesses.map(g => g.proximity))
    : null

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>

      <header className="flex items-center justify-between px-5 pt-8 pb-4" style={{ zIndex: 1 }}>
        <button onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Flag DNA</div>
          <div className="text-xs" style={{ color: "#8B6CFF" }}>
            {finished
              ? (won ? "Solved!" : `It was ${target.name}`)
              : bestProx !== null
                ? `Best match: ${bestProx}%`
                : `${MAX_GUESSES} guesses`}
          </div>
        </div>
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

      {finished && (
        <div className="flex flex-col items-center mb-3" style={{ zIndex: 1 }}>
          <div style={{ borderRadius: 12, overflow: "hidden", border: `2px solid ${won ? "#34D399" : "#F43F5E"}` }}>
            <img src={target.flagUrl} alt={target.name} style={{ width: 180, height: 113, display: "block" }} />
          </div>
          <div className="text-base font-bold mt-2" style={{ color: "#F5F3FF" }}>{target.name}</div>
        </div>
      )}

      {!finished && (
        <div className="mx-5 mb-3 relative" style={{ zIndex: 10 }}>
          <div className="relative">
            <input
              ref={inputRef}
              value={input}
              onChange={e => { setInput(e.target.value); setShowDrop(true) }}
              onFocus={() => setShowDrop(true)}
              onBlur={() => setTimeout(() => setShowDrop(false), 200)}
              placeholder="Type a country…"
              className="w-full px-4 py-3 rounded-xl text-sm font-medium"
              style={{ background: "#2D1F52", border: "1.5px solid #8B6CFF44", color: "#F5F3FF", outline: "none" }}
            />
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
                    <span style={{ marginLeft: 'auto', fontSize: 11, color: '#8B6CFF88' }}>{f.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Give up button after 3 guesses */}
          {guesses.length >= 3 && (
            <button onClick={handleGiveUp}
              className="mt-2 text-xs px-4 py-1.5 rounded-full font-semibold transition-all active:scale-95"
              style={{ background: '#2D1F52', border: '1px solid #F43F5E33', color: '#F43F5E88' }}>
              Give up
            </button>
          )}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-5 space-y-3 pb-6" style={{ zIndex: 1 }}>
        {guesses.map((g, gi) => {
          const isSelf = g.flag.code === target.code
          const prox   = proximityLabel(g.proximity)
          return (
            <div key={gi} className="rounded-xl overflow-hidden"
              style={{ border: `1px solid ${isSelf ? "#34D39944" : "#8B6CFF22"}`, background: "#1E1340" }}>

              {/* Flag row + proximity */}
              <div className="flex items-center gap-3 px-3 py-2.5"
                style={{ background: isSelf ? "#34D39908" : "transparent" }}>
                <img src={g.flag.flagUrl} alt={g.flag.name}
                  style={{ width: 48, height: 30, objectFit: "cover", borderRadius: 5, flexShrink: 0 }} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate" style={{ color: "#F5F3FF" }}>{g.flag.name}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span style={{ fontSize: 12 }}>{REGION_EMOJI[g.flag.region]}</span>
                    <span className="text-xs" style={{ color: g.regionMatch ? "#34D399" : "#F43F5E" }}>
                      {g.flag.region} {g.regionMatch ? "✓" : "✗"}
                    </span>
                  </div>
                </div>
                {/* Proximity badge */}
                {!isSelf && (
                  <div className="flex flex-col items-center">
                    <span style={{ fontSize: 16 }}>{prox.emoji}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: prox.color }}>{g.proximity}%</span>
                  </div>
                )}
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

              {/* Feature chips — H/V stripes distinguished */}
              <div className="flex flex-wrap gap-1.5 px-3 pb-2.5">
                {(["stripesH","stripesV","cross","star","crescent","emblem"] as const).map(feat => {
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
              Each guess shows attribute matches and a proximity %
            </p>
          </div>
        )}

        {finished && (
          <div className="flex flex-col gap-3 mt-2">
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
        )}
      </div>
    </div>
  )
}

export default function FlagDNAScreen({ onBack }: Props) {
  const [replayKey, setReplayKey] = useState(0)
  return <FlagDNAScreenGame key={replayKey} onBack={onBack} onReplay={() => setReplayKey(k => k + 1)} />
}
