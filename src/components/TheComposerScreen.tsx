import { useState } from "react"
import { PUZZLES } from "../data/buildFlagPuzzles"
import type { BuildPuzzle, Piece } from "../data/buildFlagPuzzles"

interface Props { onBack: () => void }

interface ComposerPuzzle {
  base: BuildPuzzle
  colors: Piece[]   // only correct pieces, shuffled
}

function buildComposerPuzzles(n: number): ComposerPuzzle[] {
  const shuffled = [...PUZZLES].sort(() => Math.random() - 0.5).slice(0, n)
  return shuffled.map(base => {
    const needed = new Set(Object.values(base.solution))
    const colors = base.pieces.filter(p => needed.has(p.id)).sort(() => Math.random() - 0.5)
    return { base, colors }
  })
}

const SLOT_LABELS: Record<string, string> = {
  left: 'Left', center: 'Center', right: 'Right',
  top: 'Top', middle: 'Middle', bottom: 'Bottom',
  bg: 'Background', disc: 'Disc',
}

const TOTAL = 8

export default function TheComposerScreen({ onBack }: Props) {
  const [puzzles]  = useState(() => buildComposerPuzzles(TOTAL))
  const [idx, setIdx]       = useState(0)
  const [placed, setPlaced] = useState<Record<string, string>>({})  // slotId → pieceId
  const [selected, setSelected] = useState<string | null>(null)     // selected pieceId
  const [checked, setChecked]   = useState(false)
  const [scores, setScores]     = useState<boolean[]>([])
  const [done, setDone]         = useState(false)

  const puzzle = puzzles[idx]

  const handleColorTap = (pieceId: string) => {
    if (checked) return
    setSelected(s => s === pieceId ? null : pieceId)
  }

  const handleSlotTap = (slotId: string) => {
    if (checked) return
    if (selected) {
      setPlaced(p => ({ ...p, [slotId]: selected }))
      setSelected(null)
    } else if (placed[slotId]) {
      // tap filled slot to clear it
      setPlaced(p => { const n = { ...p }; delete n[slotId]; return n })
    }
  }

  const allFilled = puzzle.base.slots.every(s => !!placed[s])

  const handleCheck = () => {
    if (!allFilled) return
    const correct = puzzle.base.slots.every(s => placed[s] === puzzle.base.solution[s])
    setScores(prev => [...prev, correct])
    setChecked(true)
  }

  const handleNext = () => {
    if (idx + 1 >= puzzles.length) { setDone(true); return }
    setIdx(i => i + 1)
    setPlaced({})
    setSelected(null)
    setChecked(false)
  }

  // ── Result ─────────────────────────────────────────────────────────────────
  if (done) {
    const correct = scores.filter(Boolean).length
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl p-6 text-center mb-4"
            style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 0 32px #8B6CFF22" }}>
            <div className="text-5xl mb-3">{correct === TOTAL ? "🏆" : correct >= TOTAL * 0.7 ? "🎨" : "📚"}</div>
            <div className="text-6xl font-black mb-1" style={{ color: "#F5F3FF" }}>{correct}/{TOTAL}</div>
            <div className="text-sm mb-3" style={{ color: "#B8A9E0" }}>flags composed correctly</div>
            <div className="flex justify-center gap-2 flex-wrap">
              {scores.map((ok, i) => <span key={i} style={{ fontSize: 22 }}>{ok ? '🟩' : '🟥'}</span>)}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => window.location.reload()}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
              Play Again
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

  // ── Slot colors ────────────────────────────────────────────────────────────
  const slotColors: Record<string, string> = {}
  for (const [slotId, pieceId] of Object.entries(placed)) {
    const piece = puzzle.colors.find(p => p.id === pieceId)
    if (piece) slotColors[slotId] = piece.color
  }

  const correctSlots = checked
    ? puzzle.base.slots.filter(s => placed[s] === puzzle.base.solution[s]).length
    : 0

  // Placed piece IDs (to gray out in palette)
  const placedIds = new Set(Object.values(placed))

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>

      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>The Composer</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>{idx + 1} / {TOTAL}</div>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} style={{
              width: 7, height: 7, borderRadius: '50%',
              background: i < scores.length ? (scores[i] ? '#34D399' : '#F43F5E') : '#8B6CFF33',
            }} />
          ))}
        </div>
      </header>

      {/* Progress */}
      <div className="mx-5 h-1.5 rounded-full overflow-hidden mb-5" style={{ background: "#2D1F52" }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(idx / TOTAL) * 100}%`, background: "linear-gradient(90deg,#8B6CFF,#A78BFA)" }} />
      </div>

      <div className="flex flex-col items-center px-5 gap-5">

        {/* Prompt */}
        <div className="w-full max-w-sm rounded-2xl px-5 py-4 text-center"
          style={{ background: "#2D1F52", border: "1px solid #8B6CFF44" }}>
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#B8A9E0" }}>Compose the flag of</p>
          <p className="text-2xl font-black" style={{ color: "#F5F3FF" }}>{puzzle.base.name}</p>
          <p className="text-xs mt-1" style={{ color: "#8B6CFF88" }}>
            Tap a colour, then tap a slot to place it
          </p>
        </div>

        {/* Flag canvas */}
        <div className="w-full max-w-sm">
          <FlagCanvas
            layout={puzzle.base.layout}
            slots={puzzle.base.slots}
            slotColors={slotColors}
            checked={checked}
            solution={puzzle.base.solution}
            placed={placed}
            colors={puzzle.colors}
            onSlotTap={handleSlotTap}
          />
        </div>

        {/* Color palette */}
        <div className="w-full max-w-sm">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#B8A9E0" }}>Colours</p>
          <div className="flex gap-3 flex-wrap">
            {puzzle.colors.map(piece => {
              const isSelected = selected === piece.id
              const isPlaced   = placedIds.has(piece.id)
              return (
                <button key={piece.id} onClick={() => handleColorTap(piece.id)}
                  disabled={checked}
                  style={{
                    width: 52, height: 52, borderRadius: 10,
                    background: piece.color,
                    border: isSelected ? '3px solid #F5F3FF' : '2px solid #8B6CFF44',
                    opacity: isPlaced ? 0.3 : 1,
                    boxShadow: isSelected ? '0 0 0 3px #8B6CFF88' : 'none',
                    transition: 'all 0.15s',
                    transform: isSelected ? 'scale(1.12)' : 'scale(1)',
                    cursor: 'pointer',
                  }}
                  title={piece.label}
                />
              )
            })}
          </div>
        </div>

        {/* Result feedback */}
        {checked && (
          <div className="w-full max-w-sm px-4 py-3 rounded-xl"
            style={{ background: "#2D1F52", border: `1px solid ${correctSlots === puzzle.base.slots.length ? '#34D39944' : '#F43F5E44'}` }}>
            {correctSlots === puzzle.base.slots.length ? (
              <p className="text-sm font-semibold" style={{ color: '#34D399' }}>✓ Perfect! All slots correct.</p>
            ) : (
              <>
                <p className="text-sm font-semibold mb-2" style={{ color: '#F43F5E' }}>
                  {correctSlots}/{puzzle.base.slots.length} slots correct
                </p>
                <div className="flex gap-2 flex-wrap">
                  {puzzle.base.slots.map(s => {
                    const ok = placed[s] === puzzle.base.solution[s]
                    const correctPiece = puzzle.colors.find(p => p.id === puzzle.base.solution[s])
                    return (
                      <div key={s} className="flex items-center gap-1.5">
                        <div style={{ width: 16, height: 16, borderRadius: 4, background: correctPiece?.color ?? '#888' }} />
                        <span style={{ fontSize: 12, color: ok ? '#34D399' : '#F43F5E' }}>
                          {SLOT_LABELS[s]} {ok ? '✓' : '✗'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* Buttons */}
        {!checked ? (
          <button onClick={handleCheck} disabled={!allFilled}
            className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{
              background: allFilled ? "linear-gradient(135deg,#8B6CFF,#A78BFA)" : "#2D1F52",
              color: allFilled ? "#fff" : "#8B6CFF44",
              border: allFilled ? 'none' : '1px solid #8B6CFF22',
            }}>
            Check →
          </button>
        ) : (
          <button onClick={handleNext}
            className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
            {idx + 1 >= TOTAL ? "See Results →" : "Next →"}
          </button>
        )}
      </div>
    </div>
  )
}

// ── FlagCanvas ──────────────────────────────────────────────────────────────

interface CanvasProps {
  layout: string
  slots: string[]
  slotColors: Record<string, string>
  checked: boolean
  solution: Record<string, string>
  placed: Record<string, string>
  colors: Piece[]
  onSlotTap: (slotId: string) => void
}

function FlagCanvas({ layout, slots, slotColors, checked, solution, placed, onSlotTap }: CanvasProps) {
  const W = 300, H = 200

  function slotStyle(slotId: string): React.CSSProperties {
    const filled = !!slotColors[slotId]
    const ok     = checked && placed[slotId] === solution[slotId]
    const bad    = checked && placed[slotId] !== solution[slotId]
    return {
      background: filled ? slotColors[slotId] : '#1A1033',
      border: checked ? `2px solid ${ok ? '#34D399' : bad ? '#F43F5E' : '#8B6CFF33'}`
                      : `2px dashed ${filled ? 'transparent' : '#8B6CFF44'}`,
      cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all 0.15s',
      borderRadius: 4,
      position: 'relative' as const,
    }
  }

  function badge(slotId: string) {
    if (!checked) return null
    const ok = placed[slotId] === solution[slotId]
    return (
      <span style={{ fontSize: 18, position: 'absolute', bottom: 4, right: 4 }}>
        {ok ? '✓' : '✗'}
      </span>
    )
  }

  if (layout === 'v3') {
    return (
      <div style={{ width: W, height: H, display: 'flex', borderRadius: 10, overflow: 'hidden' }}>
        {slots.map(s => (
          <div key={s} style={{ flex: 1, height: '100%', ...slotStyle(s) }}
            onClick={() => onSlotTap(s)}>
            {badge(s)}
          </div>
        ))}
      </div>
    )
  }

  if (layout === 'h3' || layout === 'h2') {
    return (
      <div style={{ width: W, height: H, display: 'flex', flexDirection: 'column', borderRadius: 10, overflow: 'hidden' }}>
        {slots.map(s => (
          <div key={s} style={{ flex: 1, width: '100%', ...slotStyle(s) }}
            onClick={() => onSlotTap(s)}>
            {badge(s)}
          </div>
        ))}
      </div>
    )
  }

  if (layout === 'disc') {
    const bg = slots[0]  // 'bg'
    const disc = slots[1] // 'disc'
    return (
      <div style={{ width: W, height: H, position: 'relative', borderRadius: 10, overflow: 'hidden',
        ...slotStyle(bg), border: 'none' }}
        onClick={() => onSlotTap(bg)}>
        {badge(bg)}
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%,-50%)',
          width: 90, height: 90, borderRadius: '50%',
          ...slotStyle(disc),
          border: checked
            ? `3px solid ${placed[disc] === solution[disc] ? '#34D399' : '#F43F5E'}`
            : '3px dashed #8B6CFF66',
        }}
          onClick={(e) => { e.stopPropagation(); onSlotTap(disc) }}>
          {badge(disc)}
        </div>
      </div>
    )
  }

  return null
}
