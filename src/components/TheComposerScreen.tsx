import { useState, useMemo, useEffect } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"
import { flagSources } from "./FlagImage"

interface Props { onBack: () => void }

// One tile of the 3×3 puzzle. Uses CSS background slicing (backgroundSize +
// backgroundPosition) rather than an offset <img>, which renders the correct
// slice reliably in every browser. Falls back through the source chain on error.
function FlagSlice({ code, col, row, w, h }: { code: string; col: number; row: number; w: number; h: number }) {
  const sources = useMemo(() => flagSources(code), [code])
  const [i, setI] = useState(0)
  useEffect(() => { setI(0) }, [code])
  const url = sources[Math.min(i, sources.length - 1)]
  useEffect(() => {
    const img = new Image()
    img.onerror = () => setI(x => (x < sources.length - 1 ? x + 1 : x))
    img.src = url
  }, [url, sources.length])
  return (
    <div style={{
      position: "absolute", inset: 0,
      backgroundColor: "#1A1033",
      backgroundImage: `url(${url})`,
      backgroundSize: `${w * 3}px ${h * 3}px`,
      backgroundPosition: `${-col * w}px ${-row * h}px`,
      backgroundRepeat: "no-repeat",
    }} />
  )
}

// ── Tile layout ──────────────────────────────────────────────────────────────
// 3×3 grid positions, labelled by warmth slot allocation:
//  corners  = indices 0,2,6,8  (cold guess = different region)
//  edges    = indices 1,3,5,7  (warm guess = same region)
//  center   = index   4        (hot  guess = confusable / same sub-region)
const CORNER_IDX = [0, 2, 6, 8]
const EDGE_IDX   = [1, 3, 5, 7]
const CENTER_IDX = [4]

function warmth(guess: FlagRecord, target: FlagRecord): 'hot' | 'warm' | 'cold' {
  if (guess.code === target.code) return 'hot'
  if (target.confusableWith?.includes(guess.code)) return 'hot'
  if (guess.region === target.region) return 'warm'
  return 'cold'
}

function pickFrom(pool: number[], flipped: Set<number>): number | null {
  const avail = pool.filter(i => !flipped.has(i))
  if (avail.length === 0) return null
  return avail[Math.floor(Math.random() * avail.length)]
}

function nextTile(level: 'hot' | 'warm' | 'cold', flipped: Set<number>): number {
  if (level === 'hot')  return pickFrom(CENTER_IDX, flipped) ?? pickFrom(EDGE_IDX, flipped) ?? pickFrom(CORNER_IDX, flipped) ?? 0
  if (level === 'warm') return pickFrom(EDGE_IDX, flipped)   ?? pickFrom(CORNER_IDX, flipped) ?? pickFrom(CENTER_IDX, flipped) ?? 0
  return                       pickFrom(CORNER_IDX, flipped) ?? pickFrom(EDGE_IDX, flipped)   ?? pickFrom(CENTER_IDX, flipped) ?? 0
}

// ── Game state ───────────────────────────────────────────────────────────────
interface GameState {
  target: FlagRecord
  flipped: Set<number>  // tile indices 0-8 that have been revealed
  guesses: { flag: FlagRecord; level: 'hot' | 'warm' | 'cold' }[]
  solved: boolean
  gaveUp: boolean
}

function freshGame(): GameState {
  return {
    target: FLAGS[Math.floor(Math.random() * FLAGS.length)],
    flipped: new Set(),
    guesses: [],
    solved: false,
    gaveUp: false,
  }
}

const TILE_W = 90
const TILE_H = 60

export default function TheComposerScreen({ onBack }: Props) {
  const [game, setGame] = useState<GameState>(freshGame)

  // Type-in
  const [input, setInput]       = useState("")
  const [showDrop, setShowDrop] = useState(false)

  const matches = useMemo(() => {
    const q = input.trim().toLowerCase()
    if (q.length < 1) return []
    return FLAGS.filter(f =>
      f.name.toLowerCase().includes(q) || f.code.toLowerCase() === q
    ).slice(0, 6)
  }, [input])

  const handleGuess = (flag: FlagRecord) => {
    setInput("")
    setShowDrop(false)

    if (flag.code === game.target.code) {
      const allFlipped = new Set([0,1,2,3,4,5,6,7,8])
      setGame(g => ({
        ...g,
        flipped: allFlipped,
        guesses: [...g.guesses, { flag, level: 'hot' }],
        solved: true,
      }))
      return
    }

    const level = warmth(flag, game.target)
    const tile  = nextTile(level, game.flipped)
    setGame(g => {
      const newFlipped = new Set(g.flipped)
      newFlipped.add(tile)
      return { ...g, flipped: newFlipped, guesses: [...g.guesses, { flag, level }] }
    })
  }

  const handleGiveUp = () => {
    setGame(g => ({ ...g, flipped: new Set([0,1,2,3,4,5,6,7,8]), gaveUp: true }))
  }

  const handleNewGame = () => {
    setGame(freshGame())
    setInput("")
    setShowDrop(false)
  }

  const { target, flipped, guesses, solved, gaveUp } = game
  const done = solved || gaveUp
  const pts  = solved ? Math.max(1000 - (guesses.length - 1) * 100, 100) : 0

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>

      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>The Composer</div>
          <div className="text-xs" style={{ color: "#8B6CFF" }}>
            {done
              ? (solved ? `Solved in ${guesses.length} ${guesses.length === 1 ? 'guess' : 'guesses'} · ${pts} pts` : target.name)
              : `${flipped.size}/9 tiles revealed`}
          </div>
        </div>
        <div style={{ width: 36 }} />
      </header>

      <div className="flex flex-col items-center px-5 gap-4">

        {/* 3×3 tile grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          gap: 3, borderRadius: 14, overflow: 'hidden',
          border: done
            ? `2px solid ${solved ? '#34D399' : '#F43F5E'}`
            : '2px solid #8B6CFF33',
          boxShadow: '0 0 40px #8B6CFF22',
          width: TILE_W * 3 + 3 * 2 + 2,
        }}>
          {Array.from({ length: 9 }).map((_, i) => {
            const row = Math.floor(i / 3)
            const col = i % 3
            const revealed = flipped.has(i)
            return (
              <div key={i} style={{ width: TILE_W, height: TILE_H, position: 'relative', overflow: 'hidden' }}>
                {/* the correct flag slice for this tile (always mounted) */}
                <FlagSlice code={target.code} col={col} row={row} w={TILE_W} h={TILE_H} />
                {/* face-down cover that fades away when the tile is revealed */}
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg,#2D1F52,#1A1033)',
                  opacity: revealed ? 0 : 1,
                  transform: revealed ? 'scale(1.08)' : 'scale(1)',
                  transition: `opacity 0.45s ${(row + col) * 40}ms ease, transform 0.45s ease`,
                  pointerEvents: 'none',
                }}>
                  <span style={{ fontSize: 18, opacity: 0.3 }}>🎴</span>
                </div>
              </div>
            )
          })}
        </div>

        {!done && guesses.length === 0 && (
          <p className="text-xs text-center" style={{ color: "#B8A9E0", maxWidth: 280 }}>
            Guess the flag. Each guess flips a tile — closer guesses flip better tiles!
          </p>
        )}

        {/* Guess history */}
        {guesses.length > 0 && !done && (
          <div className="w-full max-w-sm flex flex-col gap-1.5">
            {[...guesses].reverse().slice(0, 4).map((g, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: '#2D1F52', border: '1px solid #8B6CFF22' }}>
                <img src={g.flag.flagUrl} alt="" style={{ width: 28, height: 18, objectFit: 'cover', borderRadius: 3 }} />
                <span style={{ color: '#F5F3FF', fontSize: 13, fontWeight: 600, flex: 1 }}>{g.flag.name}</span>
                <span style={{ fontSize: 16 }}>
                  {g.level === 'hot' ? '🔥' : g.level === 'warm' ? '🌡️' : '❄️'}
                </span>
                <span style={{ fontSize: 11, color: '#B8A9E0' }}>
                  {g.level === 'hot' ? 'Hot' : g.level === 'warm' ? 'Warm' : 'Cold'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Result card */}
        {done && (
          <div className="w-full max-w-sm rounded-2xl p-5 text-center"
            style={{
              background: '#2D1F52',
              border: `1px solid ${solved ? '#34D39944' : '#F43F5E44'}`,
            }}>
            <div className="text-4xl mb-2">{solved ? (guesses.length <= 3 ? '🏆' : '🎉') : '😬'}</div>
            <div className="text-2xl font-black mb-1" style={{ color: '#F5F3FF' }}>{target.name}</div>
            {solved && (
              <div className="text-lg font-bold mb-1" style={{ color: '#34D399' }}>{pts} pts</div>
            )}
            <div className="text-xs mb-2" style={{ color: '#B8A9E0' }}>
              {guesses.length} {guesses.length === 1 ? 'guess' : 'guesses'}
            </div>
            {target.distinguishingTip && (
              <p className="text-xs" style={{ color: '#B8A9E0', fontStyle: 'italic' }}>
                {target.distinguishingTip}
              </p>
            )}
          </div>
        )}

        {/* Type-in */}
        {!done && (
          <div className="w-full max-w-sm relative">
            <input
              value={input}
              onChange={e => { setInput(e.target.value); setShowDrop(true) }}
              onKeyDown={e => {
                if (e.key === "Enter" && matches.length === 1) handleGuess(matches[0])
                if (e.key === "Escape") { setInput(""); setShowDrop(false) }
              }}
              onFocus={() => setShowDrop(true)}
              onBlur={() => setTimeout(() => setShowDrop(false), 150)}
              placeholder="Type a country name or code…"
              autoComplete="off"
              className="w-full px-4 py-3.5 rounded-xl outline-none font-semibold"
              style={{ background: "#2D1F52", border: "1.5px solid #8B6CFF44", color: "#F5F3FF", fontSize: 15 }}
            />
            {showDrop && matches.length > 0 && (
              <div className="absolute left-0 right-0 bottom-full mb-1 rounded-xl overflow-hidden z-10"
                style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 -8px 32px #00000044" }}>
                {matches.map(flag => (
                  <button key={flag.code}
                    onMouseDown={() => handleGuess(flag)}
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

        {!done && guesses.length >= 3 && (
          <button onClick={handleGiveUp}
            className="text-xs px-4 py-2 rounded-full font-semibold transition-all active:scale-95"
            style={{ background: '#2D1F52', border: '1px solid #F43F5E33', color: '#F43F5E88' }}>
            Give up
          </button>
        )}

        {done && (
          <div className="w-full max-w-sm flex flex-col gap-3">
            <button onClick={handleNewGame}
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
