import { useEffect, useRef, useState } from "react"

/**
 * Shared micro-animation primitives. Pure CSS-driven (keyframes live in
 * index.css) so they cost nothing on the bundle and honour
 * prefers-reduced-motion automatically.
 */

const DEFAULT_COLORS = ["#FBBF24", "#34D399", "#8B6CFF", "#F472B6", "#38BDF8"]

/** A one-shot burst of confetti from the centre of its (relative) parent.
 *  Deterministic per index so re-renders don't reshuffle mid-flight. */
export function ConfettiBurst({ colors = DEFAULT_COLORS, count = 18, spread = 76 }:
  { colors?: string[]; count?: number; spread?: number }) {
  const bits = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + (i % 3) * 0.35
    const dist = spread * (0.55 + ((i * 37) % 100) / 220)
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist * 0.9 - 16,
      rot: (i * 73) % 360,
      delay: (i % 5) * 0.03,
      color: colors[i % colors.length],
      w: 5 + (i % 3) * 2,
    }
  })
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}>
      {bits.map((b, i) => (
        <span key={i} className="confetti-bit" style={{
          width: b.w, height: b.w * 0.62, borderRadius: 1.5, background: b.color,
          ["--cx" as string]: `${b.x}px`,
          ["--cy" as string]: `${b.y}px`,
          ["--cr" as string]: `${b.rot}deg`,
          ["--cd" as string]: `${b.delay}s`,
        }} />
      ))}
    </div>
  )
}

/** Eased count-up for score/streak reveals. */
export function useCountUp(target: number, duration = 700): number {
  const [val, setVal] = useState(0)
  const raf = useRef<number | null>(null)
  useEffect(() => {
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [target, duration])
  return val
}

/** Smooth expand/collapse via the grid-template-rows trick — animates to
 *  natural content height with no measuring. */
export function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateRows: open ? "1fr" : "0fr",
      transition: "grid-template-rows 0.32s var(--motion-ease, ease)",
    }}>
      <div style={{ overflow: "hidden", minHeight: 0 }}>{children}</div>
    </div>
  )
}
