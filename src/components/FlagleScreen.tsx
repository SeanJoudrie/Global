import { useState, useMemo } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"
import { FLAG_ATTRIBS, STRIPES_V } from "../data/flagAttribs"
import { todayString, shuffleWithSeed } from "../utils/prng"

interface Props { onBack: () => void }

const ELIGIBLE = FLAGS.filter(f => FLAG_ATTRIBS[f.code])
const MAX_GUESSES = 6

type Tile = "hit" | "near" | "miss"
const TILE_BG: Record<Tile, string> = { hit: "#34D399", near: "#FBBF24", miss: "#3A2C5E" }
const TILE_EMOJI: Record<Tile, string> = { hit: "🟩", near: "🟨", miss: "⬛" }

// Attribute columns shown per guess.
const COLS: { key: string; label: string }[] = [
  { key: "colors",   label: "Col" },
  { key: "stripesH", label: "═" },
  { key: "stripesV", label: "║" },
  { key: "cross",    label: "✚" },
  { key: "star",     label: "★" },
  { key: "crescent", label: "☾" },
  { key: "emblem",   label: "🛡" },
  { key: "region",   label: "🌍" },
]

function compare(guess: FlagRecord, target: FlagRecord): Record<string, Tile> {
  const ga = FLAG_ATTRIBS[guess.code], ta = FLAG_ATTRIBS[target.code]
  const shared = ga.colors.filter(c => ta.colors.includes(c)).length
  const colorTile: Tile =
    shared === ta.colors.length && ga.colors.length === ta.colors.length ? "hit"
    : shared > 0 ? "near" : "miss"
  const bin = (a: boolean, b: boolean): Tile => a === b ? "hit" : "miss"
  return {
    colors: colorTile,
    stripesH: bin(ga.stripes, ta.stripes),
    stripesV: bin(STRIPES_V.has(guess.code), STRIPES_V.has(target.code)),
    cross: bin(ga.cross, ta.cross),
    star: bin(ga.star, ta.star),
    crescent: bin(ga.crescent, ta.crescent),
    emblem: bin(ga.emblem, ta.emblem),
    region: guess.region === target.region ? "hit" : "miss",
  }
}

interface Guess { flag: FlagRecord; tiles: Record<string, Tile> }

export default function FlagleScreen({ onBack }: Props) {
  const today = todayString()
  const target = useMemo(() => shuffleWithSeed(ELIGIBLE, "flagle-" + today)[0], [today])

  const [guesses, setGuesses] = useState<Guess[]>([])
  const [input, setInput] = useState("")
  const [showDrop, setShowDrop] = useState(false)
  const [copied, setCopied] = useState(false)

  const guessedCodes = useMemo(() => new Set(guesses.map(g => g.flag.code)), [guesses])
  const won = guesses.some(g => g.flag.code === target.code)
  const finished = won || guesses.length >= MAX_GUESSES

  const matches = useMemo(() => {
    const q = input.trim().toLowerCase()
    if (q.length < 1) return []
    return FLAGS.filter(f => (f.name.toLowerCase().includes(q) || f.code.toLowerCase() === q) && !guessedCodes.has(f.code)).slice(0, 6)
  }, [input, guessedCodes])

  const submit = (f: FlagRecord) => {
    if (finished || guessedCodes.has(f.code)) return
    if (!FLAG_ATTRIBS[f.code]) return
    setGuesses(g => [...g, { flag: f, tiles: compare(f, target) }])
    setInput(""); setShowDrop(false)
  }

  const shareText = () => {
    const head = `Flagle ${today} ${won ? guesses.length : "X"}/${MAX_GUESSES}`
    const grid = guesses.map(g => COLS.map(c => TILE_EMOJI[g.tiles[c.key]]).join("")).join("\n")
    return head + "\n" + grid + "\nglobalio.netlify.app"
  }
  const copyShare = () => {
    navigator.clipboard?.writeText(shareText()).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) })
  }

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
      <header className="flex items-center justify-between px-5 pt-8 pb-3">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Flagle · Daily</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>{Math.min(guesses.length + (finished ? 0 : 1), MAX_GUESSES)} / {MAX_GUESSES}</div>
        </div>
        <div style={{ width: 36 }} />
      </header>

      <div className="flex flex-col items-center px-4 gap-3">
        {/* Column legend */}
        <div className="grid w-full max-w-sm items-center" style={{ gridTemplateColumns: `1.4fr repeat(${COLS.length}, 1fr)`, gap: 3 }}>
          <div className="text-xs font-semibold" style={{ color: "#8B6CFF" }}>Guess</div>
          {COLS.map(c => <div key={c.key} className="text-center text-xs font-bold" style={{ color: "#8B6CFF" }}>{c.label}</div>)}
        </div>

        {/* Guess rows */}
        {guesses.map((g, gi) => (
          <div key={gi} className="grid w-full max-w-sm items-center" style={{ gridTemplateColumns: `1.4fr repeat(${COLS.length}, 1fr)`, gap: 3 }}>
            <div className="flex items-center gap-1.5 min-w-0">
              <img src={g.flag.flagUrl} alt="" style={{ width: 22, height: 14, objectFit: "cover", borderRadius: 2, flexShrink: 0 }} />
              <span className="truncate" style={{ color: "#F5F3FF", fontSize: 10, fontWeight: 600 }}>{g.flag.name}</span>
            </div>
            {COLS.map(c => (
              <div key={c.key} style={{
                aspectRatio: "1", borderRadius: 4, background: TILE_BG[g.tiles[c.key]],
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, color: "#fff", fontWeight: 700,
              }}>{g.tiles[c.key] === "hit" ? "" : g.tiles[c.key] === "near" ? "~" : ""}</div>
            ))}
          </div>
        ))}

        {/* Empty rows */}
        {!finished && Array.from({ length: MAX_GUESSES - guesses.length }).map((_, i) => (
          <div key={i} className="grid w-full max-w-sm" style={{ gridTemplateColumns: `1.4fr repeat(${COLS.length}, 1fr)`, gap: 3 }}>
            <div />
            {COLS.map(c => <div key={c.key} style={{ aspectRatio: "1", borderRadius: 4, background: "#2D1F5266", border: "1px solid #8B6CFF22" }} />)}
          </div>
        ))}

        {/* Input or result */}
        {!finished ? (
          <div className="w-full max-w-sm relative mt-1">
            <input value={input} autoComplete="off"
              onChange={e => { setInput(e.target.value); setShowDrop(true) }}
              onFocus={() => setShowDrop(true)} onBlur={() => setTimeout(() => setShowDrop(false), 150)}
              onKeyDown={e => { if (e.key === "Enter" && matches.length === 1) submit(matches[0]) }}
              placeholder="Guess a country…"
              className="w-full px-4 py-3 rounded-xl outline-none font-semibold"
              style={{ background: "#2D1F52", border: "1.5px solid #8B6CFF44", color: "#F5F3FF", fontSize: 15 }} />
            {showDrop && matches.length > 0 && (
              <div className="absolute left-0 right-0 bottom-full mb-1 rounded-xl overflow-hidden z-20"
                style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 -8px 32px #00000055" }}>
                {matches.map(f => (
                  <button key={f.code} onMouseDown={() => submit(f)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:brightness-125"
                    style={{ background: "transparent", borderBottom: "1px solid #8B6CFF11" }}>
                    <img src={f.flagUrl} alt="" style={{ width: 30, height: 20, objectFit: "cover", borderRadius: 3 }} />
                    <span style={{ color: "#F5F3FF", fontWeight: 600, fontSize: 13 }}>{f.name}</span>
                  </button>
                ))}
              </div>
            )}
            <p className="text-xs text-center mt-2" style={{ color: "#8B6CFF66" }}>
              🟩 match · 🟨 partial colours · ⬛ no match
            </p>
          </div>
        ) : (
          <div className="w-full max-w-sm flex flex-col items-center gap-3 mt-1">
            <div className="rounded-2xl p-4 w-full text-center"
              style={{ background: "#2D1F52", border: `1px solid ${won ? "#34D39944" : "#F43F5E44"}` }}>
              <img src={target.flagUrl} alt={target.name}
                style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 8, margin: "0 auto 8px", border: "1px solid #8B6CFF33" }} />
              <div className="text-lg font-black" style={{ color: "#F5F3FF" }}>{target.name}</div>
              <div className="text-sm font-bold" style={{ color: won ? "#34D399" : "#F43F5E" }}>
                {won ? `Solved in ${guesses.length}!` : "Out of guesses"}
              </div>
            </div>
            <button onClick={copyShare}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
              {copied ? "Copied! ✓" : "Share Result 📋"}
            </button>
            <button onClick={onBack}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "#2D1F52", border: "1px solid #8B6CFF33", color: "#B8A9E0" }}>← Home</button>
            <p className="text-xs text-center" style={{ color: "#8B6CFF66" }}>New flag every day · come back tomorrow</p>
          </div>
        )}
      </div>
    </div>
  )
}
