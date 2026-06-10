import { useState, useRef, useCallback, useEffect } from "react"
import { PUZZLES } from "../data/buildFlagPuzzles"
import type { BuildPuzzle, Piece } from "../data/buildFlagPuzzles"

interface Props { onBack: () => void }

interface DragState {
  pieceId: string
  x: number
  y: number
}

const FLAG_W = 270
const FLAG_H = 170

// ── Flag canvas renderer ─────────────────────────────────────────────────────
function FlagCanvas({
  puzzle, placed, phase, slotRefs,
  onSlotClick,
}: {
  puzzle: BuildPuzzle
  placed: Record<string, string>
  phase: 'playing' | 'result'
  slotRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>
  onSlotClick: (slotId: string) => void
}) {
  const getPiece = (slotId: string): Piece | undefined =>
    puzzle.pieces.find(p => p.id === placed[slotId])

  const slotStyle = (slotId: string): React.CSSProperties => {
    const piece = getPiece(slotId)
    const isCorrect = phase === 'result' && placed[slotId] === puzzle.solution[slotId]
    const isWrong   = phase === 'result' && placed[slotId] && placed[slotId] !== puzzle.solution[slotId]
    const isEmpty   = !placed[slotId]
    return {
      background: piece ? piece.color : 'rgba(139,108,255,0.06)',
      border: phase === 'playing'
        ? isEmpty ? '2px dashed rgba(139,108,255,0.3)' : '2px solid rgba(139,108,255,0.5)'
        : isCorrect ? '2.5px solid #34D399'
        : isWrong   ? '2.5px solid #F43F5E'
        : '2px dashed rgba(139,108,255,0.2)',
      cursor: phase === 'playing' ? 'pointer' : 'default',
      transition: 'background 0.2s',
      position: 'relative',
      boxSizing: 'border-box',
    }
  }

  const resultOverlay = (slotId: string) => {
    if (phase !== 'result') return null
    if (!placed[slotId]) return <span style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, color:'#F43F5E' }}>✗</span>
    const ok = placed[slotId] === puzzle.solution[slotId]
    return <span style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, color: ok ? '#34D399' : '#F43F5E' }}>{ok ? '✓' : '✗'}</span>
  }

  if (puzzle.layout === 'v3') {
    return (
      <div style={{ display:'flex', width:FLAG_W, height:FLAG_H, borderRadius:8, overflow:'hidden', boxShadow:'0 0 24px #8B6CFF22' }}>
        {puzzle.slots.map(s => (
          <div key={s} ref={el => { slotRefs.current[s] = el }}
            style={{ ...slotStyle(s), flex:1, height:'100%' }}
            onClick={() => onSlotClick(s)}>
            {resultOverlay(s)}
          </div>
        ))}
      </div>
    )
  }

  if (puzzle.layout === 'h3' || puzzle.layout === 'h2' || puzzle.layout === 'h4') {
    return (
      <div style={{ display:'flex', flexDirection:'column', width:FLAG_W, height:FLAG_H, borderRadius:8, overflow:'hidden', boxShadow:'0 0 24px #8B6CFF22' }}>
        {puzzle.slots.map(s => (
          <div key={s} ref={el => { slotRefs.current[s] = el }}
            style={{ ...slotStyle(s), flex:1, width:'100%' }}
            onClick={() => onSlotClick(s)}>
            {resultOverlay(s)}
          </div>
        ))}
      </div>
    )
  }

  if (puzzle.layout === 'disc') {
    const bg   = getPiece('bg')
    const disc = getPiece('disc')
    const bgOk   = phase === 'result' && placed['bg']   === puzzle.solution['bg']
    const discOk = phase === 'result' && placed['disc']  === puzzle.solution['disc']
    return (
      <div ref={el => { slotRefs.current['bg'] = el }}
        onClick={() => onSlotClick('bg')}
        style={{
          width: FLAG_W, height: FLAG_H, borderRadius: 8,
          background: bg ? bg.color : 'rgba(139,108,255,0.06)',
          border: phase === 'playing' ? '2px dashed rgba(139,108,255,0.3)' : bgOk ? '2.5px solid #34D399' : '2.5px solid #F43F5E',
          position: 'relative', cursor: 'pointer', overflow: 'hidden',
          boxShadow: '0 0 24px #8B6CFF22',
        }}>
        {/* Disc slot */}
        <div ref={el => { slotRefs.current['disc'] = el }}
          onClick={e => { e.stopPropagation(); onSlotClick('disc') }}
          style={{
            position: 'absolute',
            left: '50%', top: '50%',
            transform: 'translate(-50%,-50%)',
            width: 80, height: 80, borderRadius: '50%',
            background: disc ? disc.color : 'rgba(139,108,255,0.12)',
            border: phase === 'playing' ? '2px dashed rgba(139,108,255,0.4)' : discOk ? '2.5px solid #34D399' : '2.5px solid #F43F5E',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          {phase === 'result' && <span style={{ fontSize:20, color: discOk ? '#34D399' : '#F43F5E' }}>{discOk ? '✓' : '✗'}</span>}
        </div>
        {phase === 'result' && (
          <div style={{ position:'absolute', top:4, right:6, fontSize:16, color: bgOk ? '#34D399' : '#F43F5E' }}>
            {bgOk ? '✓' : '✗'}
          </div>
        )}
      </div>
    )
  }

  return null
}

// ── Main screen ───────────────────────────────────────────────────────────────
function randomPuzzle() { return PUZZLES[Math.floor(Math.random() * PUZZLES.length)] }

export default function BuildFlagScreen({ onBack }: Props) {
  const [puzzle, setPuzzle]  = useState<BuildPuzzle>(randomPuzzle)
  const [placed, setPlaced]   = useState<Record<string, string>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [dragging, setDragging] = useState<DragState | null>(null)
  const [phase, setPhase]     = useState<'playing' | 'result'>('playing')
  const slotRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const startNewGame = () => {
    setPuzzle(randomPuzzle())
    setPlaced({})
    setSelected(null)
    setDragging(null)
    setPhase('playing')
    slotRefs.current = {}
  }

  const placedPieceIds  = new Set(Object.values(placed))
  const palette         = puzzle.pieces.filter(p => !placedPieceIds.has(p.id))
  const allSlotsFilled  = puzzle.slots.every(s => placed[s])

  const placePieceInSlot = useCallback((pieceId: string, slotId: string) => {
    setPlaced(prev => {
      const next = { ...prev }
      // Remove piece from any existing slot
      for (const k of Object.keys(next)) if (next[k] === pieceId) delete next[k]
      next[slotId] = pieceId
      return next
    })
    setSelected(null)
  }, [])

  const removeFromSlot = useCallback((slotId: string) => {
    setPlaced(prev => { const n = { ...prev }; delete n[slotId]; return n })
    setSelected(null)
  }, [])

  // Tap on palette piece
  const handlePaletteTap = (pieceId: string) => {
    setSelected(s => s === pieceId ? null : pieceId)
  }

  // Tap on a slot
  const handleSlotClick = (slotId: string) => {
    if (phase !== 'playing') return
    if (selected) {
      placePieceInSlot(selected, slotId)
    } else if (placed[slotId]) {
      removeFromSlot(slotId)
    }
  }

  // ── Drag ──────────────────────────────────────────────────────────────────
  const handlePointerDown = (e: React.PointerEvent, pieceId: string) => {
    e.preventDefault()
    ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
    setSelected(null)
    setDragging({ pieceId, x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      setDragging(d => d ? { ...d, x: e.clientX, y: e.clientY } : null)
    }
    const onUp = (_e: PointerEvent) => {
      if (!dragging) return
      const { x, y, pieceId } = dragging
      for (const [slotId, ref] of Object.entries(slotRefs.current)) {
        if (!ref) continue
        const r = ref.getBoundingClientRect()
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
          placePieceInSlot(pieceId, slotId)
          break
        }
      }
      setDragging(null)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup',   onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup',   onUp)
    }
  }, [dragging, placePieceInSlot])

  // ── Result ────────────────────────────────────────────────────────────────
  const correct = puzzle.slots.filter(s => placed[s] === puzzle.solution[s]).length
  const total   = puzzle.slots.length
  const perfect = correct === total

  if (phase === 'result') {
    return (
      <div className="min-h-screen flex flex-col items-center"
        style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <header className="flex items-center justify-between w-full px-5 pt-8 pb-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
            style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
          <div className="text-base font-bold" style={{ color: "#F5F3FF" }}>Build the Flag</div>
          <div className="w-9" />
        </header>

        <div className="flex flex-col items-center px-5 gap-4 w-full max-w-sm">
          {/* Show their answer */}
          <FlagCanvas puzzle={puzzle} placed={placed} phase="result" slotRefs={slotRefs} onSlotClick={() => {}} />

          {/* Score */}
          <div className="w-full rounded-2xl p-5 text-center"
            style={{ background: "#2D1F52", border: `1px solid ${perfect ? '#34D39944' : '#F43F5E44'}` }}>
            <div className="text-4xl mb-2">{perfect ? "🎨" : "🖌️"}</div>
            <div className="text-5xl font-black mb-1" style={{ color: "#F5F3FF" }}>{correct}/{total}</div>
            <div className="text-sm" style={{ color: "#B8A9E0" }}>
              {perfect ? `Perfect! That's ${puzzle.name}!` : `${correct} of ${total} bands correct for ${puzzle.name}`}
            </div>
            {/* Correct answer hint when wrong */}
            {!perfect && (
              <div className="mt-3 text-xs" style={{ color: "#8B6CFF" }}>
                Correct order: {puzzle.slots.map(s => {
                  const piece = puzzle.pieces.find(p => p.id === puzzle.solution[s])
                  return piece?.label
                }).join(' · ')}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button onClick={startNewGame}
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

  // ── Playing ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}
      // Prevent page scroll while dragging
      onTouchMove={dragging ? e => e.preventDefault() : undefined}>

      <header className="flex items-center justify-between px-5 pt-8 pb-4" style={{ zIndex: 1 }}>
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Build the Flag</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>
            {puzzle.name}
          </div>
        </div>
        <div className="w-9" />
      </header>

      <div className="flex flex-col items-center gap-6 px-5" style={{ zIndex: 1 }}>
        {/* Instruction */}
        <p className="text-xs text-center" style={{ color: "#B8A9E0" }}>
          {selected
            ? `"${puzzle.pieces.find(p => p.id === selected)?.label}" selected — tap a slot to place it`
            : 'Drag pieces onto the flag, or tap a piece then tap a slot'}
        </p>

        {/* Flag canvas */}
        <FlagCanvas
          puzzle={puzzle} placed={placed} phase="playing"
          slotRefs={slotRefs} onSlotClick={handleSlotClick}
        />

        {/* Slot labels */}
        <div className="flex justify-center gap-1" style={{ width: FLAG_W }}>
          {puzzle.slots.map(s => {
            const piece = puzzle.pieces.find(p => p.id === placed[s])
            return (
              <div key={s} className="flex-1 text-center text-xs py-1 rounded"
                style={{ color: piece ? '#A78BFA' : '#8B6CFF44', fontSize: 10 }}>
                {piece ? piece.label : s}
              </div>
            )
          })}
        </div>

        {/* Palette */}
        <div>
          <div className="text-xs mb-3 text-center font-semibold uppercase tracking-widest"
            style={{ color: "#B8A9E0" }}>
            {palette.length > 0 ? "Pieces" : "All pieces placed"}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {puzzle.pieces.map(piece => {
              const isPlaced   = placedPieceIds.has(piece.id)
              const isSelected = selected === piece.id
              return (
                <div key={piece.id}
                  onPointerDown={isPlaced ? undefined : e => handlePointerDown(e, piece.id)}
                  onClick={() => !isPlaced && handlePaletteTap(piece.id)}
                  style={{
                    width: 64, height: 44, borderRadius: 10,
                    background: isPlaced ? 'rgba(139,108,255,0.06)' : piece.color,
                    border: isSelected ? '3px solid #A78BFA'
                      : isPlaced       ? '2px dashed rgba(139,108,255,0.2)'
                      : '2px solid rgba(255,255,255,0.15)',
                    cursor: isPlaced ? 'default' : 'grab',
                    touchAction: 'none',
                    opacity: isPlaced ? 0.25 : 1,
                    transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.15s, opacity 0.2s',
                    boxShadow: isSelected ? '0 0 12px #A78BFA88' : 'none',
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                    paddingBottom: 4,
                    userSelect: 'none',
                  }}>
                  {!isPlaced && (
                    <span style={{ fontSize: 9, color: 'rgba(0,0,0,0.45)', fontWeight: 700, textShadow: '0 1px 2px rgba(255,255,255,0.4)' }}>
                      {piece.label}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Confirm */}
        <button
          onClick={() => setPhase('result')}
          disabled={!allSlotsFilled}
          className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
          style={{
            background: allSlotsFilled ? "linear-gradient(135deg,#8B6CFF,#A78BFA)" : "#2D1F52",
            border: allSlotsFilled ? "none" : "1px solid #8B6CFF22",
            color: allSlotsFilled ? "#fff" : "#8B6CFF44",
            cursor: allSlotsFilled ? "pointer" : "not-allowed",
          }}>
          {allSlotsFilled ? "Confirm →" : `Fill all ${total - Object.keys(placed).length} remaining slots`}
        </button>
      </div>

      {/* Drag ghost */}
      {dragging && (() => {
        const piece = puzzle.pieces.find(p => p.id === dragging.pieceId)
        return piece ? (
          <div style={{
            position: 'fixed',
            left: dragging.x - 32,
            top:  dragging.y - 22,
            width: 64, height: 44,
            background: piece.color,
            borderRadius: 10,
            border: '2px solid rgba(255,255,255,0.3)',
            pointerEvents: 'none',
            zIndex: 9999,
            opacity: 0.9,
            boxShadow: '0 8px 28px rgba(0,0,0,0.5)',
            transform: 'scale(1.12)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 4,
          }}>
            <span style={{ fontSize: 9, color: 'rgba(0,0,0,0.45)', fontWeight: 700 }}>{piece.label}</span>
          </div>
        ) : null
      })()}
    </div>
  )
}
