import { useState, useRef, useEffect, useCallback } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"

interface Props { onBack: () => void }

const CANVAS_W = 300
const CANVAS_H = 190
const BRUSH_R  = 22   // scratch brush radius

function scoreFromPct(pct: number): number {
  if (pct < 5)  return 1000
  if (pct < 12) return 900
  if (pct < 22) return 750
  if (pct < 35) return 600
  if (pct < 50) return 400
  if (pct < 70) return 200
  return 100
}

function pickChoices(target: FlagRecord): FlagRecord[] {
  const sameRegion = FLAGS.filter(f => f.code !== target.code && f.region === target.region)
  const shuffled   = [...sameRegion].sort(() => Math.random() - 0.5)
  const distractors = shuffled.slice(0, 3)
  return [target, ...distractors].sort(() => Math.random() - 0.5)
}

export default function ThePeelScreen({ onBack }: Props) {
  const [target]  = useState<FlagRecord>(() => FLAGS[Math.floor(Math.random() * FLAGS.length)])
  const [choices] = useState<FlagRecord[]>(() => pickChoices(target))

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [revealed, setRevealed] = useState(0)      // % revealed 0-100
  const [phase, setPhase]       = useState<'scratch' | 'guess' | 'result'>('scratch')
  const [guess, setGuess]       = useState<FlagRecord | null>(null)
  const [score, setScore]       = useState(0)
  const isPointerDown           = useRef(false)

  // Draw initial dark mask
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#120930'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
  }, [])

  const scratch = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const x    = (clientX - rect.left) * (CANVAS_W / rect.width)
    const y    = (clientY - rect.top)  * (CANVAS_H / rect.height)

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, BRUSH_R, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalCompositeOperation = 'source-over'

    // Sample revealed percentage (every few calls — cheap via small grid)
    const data   = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H).data
    const step   = 8   // sample every 8th pixel
    let cleared  = 0, total = 0
    for (let i = 3; i < data.length; i += 4 * step) {
      if (data[i] < 128) cleared++
      total++
    }
    setRevealed(Math.round((cleared / total) * 100))
  }, [])

  // Mouse events
  const onMouseDown  = (e: React.MouseEvent) => { isPointerDown.current = true; scratch(e.clientX, e.clientY) }
  const onMouseMove  = (e: React.MouseEvent) => { if (isPointerDown.current) scratch(e.clientX, e.clientY) }
  const onMouseUp    = ()                     => { isPointerDown.current = false }

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => { e.preventDefault(); isPointerDown.current = true; scratch(e.touches[0].clientX, e.touches[0].clientY) }
  const onTouchMove  = (e: React.TouchEvent) => { e.preventDefault(); scratch(e.touches[0].clientX, e.touches[0].clientY) }
  const onTouchEnd   = ()                    => { isPointerDown.current = false }

  const handleMakeGuess = () => setPhase('guess')

  const handleGuess = (flag: FlagRecord) => {
    const pct = revealed
    const s   = flag.code === target.code ? scoreFromPct(pct) : 0
    setGuess(flag)
    setScore(s)
    setPhase('result')
  }

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>

      <header className="flex items-center justify-between px-5 pt-8 pb-4" style={{ zIndex: 1 }}>
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>The Peel</div>
          {phase === 'scratch' && (
            <div className="text-xs" style={{ color: "#8B6CFF" }}>
              {revealed < 5 ? "Scratch to reveal" : `${revealed}% revealed — guess now for ${scoreFromPct(revealed)} pts`}
            </div>
          )}
          {phase === 'result' && (
            <div className="text-xs font-bold" style={{ color: guess?.code === target.code ? "#34D399" : "#F43F5E" }}>
              {guess?.code === target.code ? `🎯 Score: ${score}` : "✗ Wrong flag"}
            </div>
          )}
        </div>
        {/* Revealed meter */}
        <div className="flex flex-col items-end gap-1">
          <div className="text-xs" style={{ color: "#8B6CFF88" }}>{revealed}%</div>
          <div style={{ width: 40, height: 5, borderRadius: 3, background: "#8B6CFF22", overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${revealed}%`, background: revealed < 20 ? '#34D399' : revealed < 50 ? '#FBBF24' : '#F43F5E', transition: 'width 0.1s, background 0.3s' }} />
          </div>
        </div>
      </header>

      <div className="flex flex-col items-center gap-5 px-5" style={{ zIndex: 1 }}>

        {/* Flag + scratch canvas stacked */}
        <div style={{
          width: CANVAS_W, height: CANVAS_H,
          position: 'relative', borderRadius: 12,
          overflow: 'hidden',
          border: phase === 'result'
            ? `2px solid ${guess?.code === target.code ? '#34D399' : '#F43F5E'}`
            : '2px solid #8B6CFF33',
          boxShadow: '0 0 32px #8B6CFF22',
          userSelect: 'none',
        }}>
          {/* Flag image underneath */}
          <img src={target.flagUrl} alt="hidden flag"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          {/* Scratch canvas on top */}
          <canvas ref={canvasRef}
            width={CANVAS_W} height={CANVAS_H}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              cursor: 'crosshair', touchAction: 'none',
              display: phase === 'result' ? 'none' : 'block',
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />
        </div>

        {/* Score legend */}
        {phase === 'scratch' && (
          <div className="flex gap-3 justify-center flex-wrap">
            {[
              { label: '< 5%', pts: '1000', color: '#34D399' },
              { label: '5–22%', pts: '750–900', color: '#A78BFA' },
              { label: '22–50%', pts: '400–600', color: '#FBBF24' },
              { label: '50%+', pts: '100–200', color: '#F43F5E' },
            ].map(({ label, pts, color }) => (
              <div key={label} className="text-xs px-2 py-1 rounded-lg"
                style={{ background: '#2D1F52', border: `1px solid ${color}44`, color }}>
                {label} → {pts} pts
              </div>
            ))}
          </div>
        )}

        {/* Phase: scratch → show "Make My Guess" */}
        {phase === 'scratch' && (
          <button onClick={handleMakeGuess}
            className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
            Make My Guess →
          </button>
        )}

        {/* Phase: guess → show choices */}
        {phase === 'guess' && (
          <div className="w-full max-w-sm">
            <p className="text-sm text-center mb-3 font-semibold" style={{ color: "#B8A9E0" }}>
              Which flag did you reveal?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {choices.map(flag => (
                <button key={flag.code} onClick={() => handleGuess(flag)}
                  className="py-3 px-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
                  style={{ background: "#2D1F52", border: "1.5px solid #8B6CFF33", color: "#F5F3FF" }}>
                  {flag.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Phase: result */}
        {phase === 'result' && (
          <div className="w-full max-w-sm flex flex-col gap-3">
            <div className="rounded-2xl p-5 text-center"
              style={{ background: '#2D1F52', border: `1px solid ${guess?.code === target.code ? '#34D39944' : '#F43F5E44'}` }}>
              <div className="text-4xl mb-2">{guess?.code === target.code ? '🎉' : '😬'}</div>
              <div className="text-3xl font-black mb-1" style={{ color: '#F5F3FF' }}>
                {guess?.code === target.code ? score : 0} pts
              </div>
              <div className="text-sm mb-1" style={{ color: '#B8A9E0' }}>
                {guess?.code === target.code
                  ? `${target.name} — you revealed ${revealed}%`
                  : `That was ${target.name} — you guessed ${guess?.name}`}
              </div>
              {guess?.code === target.code && score === 1000 && (
                <div className="text-xs mt-2" style={{ color: '#34D399' }}>Perfect peel! Under 5% revealed 🏆</div>
              )}
            </div>
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
