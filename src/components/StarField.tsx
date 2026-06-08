import { useEffect, useRef } from 'react'

interface Ember {
  x: number; y: number; r: number; opacity: number
  vx: number; vy: number; twinkleSpeed: number; twinkleOffset: number
  life: number; maxLife: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const makeEmber = (forceBottom = false): Ember => ({
      x: Math.random() * canvas.width,
      y: forceBottom ? canvas.height + 10 : Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.6,
      opacity: Math.random() * 0.55 + 0.15,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 0.6 + 0.25),   // drift upward like embers
      twinkleSpeed: Math.random() * 0.04 + 0.01,
      twinkleOffset: Math.random() * Math.PI * 2,
      life: 0,
      maxLife: Math.random() * 300 + 150,
    })

    const embers: Ember[] = Array.from({ length: 70 }, () => makeEmber(false))

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Subtle light beams
      const g1 = ctx.createRadialGradient(canvas.width * 0.75, 0, 0, canvas.width * 0.75, 0, canvas.height)
      g1.addColorStop(0, 'rgba(139,108,255,0.055)')
      g1.addColorStop(1, 'rgba(139,108,255,0)')
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const g2 = ctx.createRadialGradient(canvas.width * 0.15, canvas.height, 0, canvas.width * 0.15, canvas.height, canvas.height * 0.9)
      g2.addColorStop(0, 'rgba(167,139,250,0.04)')
      g2.addColorStop(1, 'rgba(167,139,250,0)')
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      t++
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i]
        e.x += e.vx + Math.sin(t * 0.012 + e.twinkleOffset) * 0.18
        e.y += e.vy
        e.life++

        // Fade in/out over lifetime
        const lifePct = e.life / e.maxLife
        const fadeFactor = lifePct < 0.15 ? lifePct / 0.15
                         : lifePct > 0.75 ? 1 - (lifePct - 0.75) / 0.25
                         : 1

        if (e.life >= e.maxLife || e.y < -10) {
          embers[i] = makeEmber(true)
          continue
        }

        const twinkle = Math.sin(t * e.twinkleSpeed + e.twinkleOffset) * 0.35 + 0.65
        const alpha = e.opacity * twinkle * fadeFactor

        // Glow
        const glow = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 3)
        glow.addColorStop(0, `rgba(255,255,255,${alpha * 0.5})`)
        glow.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
  )
}
