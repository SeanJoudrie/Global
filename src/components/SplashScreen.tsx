import { useEffect, useState } from 'react'
import EarthLogo from './EarthLogo'

interface Props { onDone: () => void }

export default function SplashScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<'pop' | 'hold' | 'shrink' | 'done'>('pop')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 400)
    const t2 = setTimeout(() => setPhase('shrink'), 1200)
    const t3 = setTimeout(() => { setPhase('done'); onDone() }, 1600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  const logoStyle = (): React.CSSProperties => {
    if (phase === 'pop') return {
      transform: 'scale(1.15)',
      opacity: 1,
      transition: 'transform 0.38s cubic-bezier(0.175,0.885,0.32,1.275), opacity 0.2s',
    }
    if (phase === 'hold') return {
      transform: 'scale(1)',
      opacity: 1,
      transition: 'transform 0.2s ease-out',
    }
    if (phase === 'shrink') return {
      transform: 'scale(0)',
      opacity: 0,
      transition: 'transform 0.22s cubic-bezier(0.55,0,1,0.45), opacity 0.18s ease-in',
    }
    return { transform: 'scale(0)', opacity: 0 }
  }

  if (phase === 'done') return null

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #1A1033 0%, #2A1A4A 100%)', zIndex: 100 }}
    >
      <div style={{ ...logoStyle(), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <EarthLogo size={140} />
        <h1 style={{ color: '#F5F3FF', fontSize: 36, fontWeight: 900, letterSpacing: '-0.5px', margin: 0 }}>
          Globalio
        </h1>
      </div>
    </div>
  )
}
