import { useEffect, useState } from 'react'
import EarthLogo from './EarthLogo'

interface Props {
  onDone: () => void
}

export default function SplashScreen({ onDone }: Props) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1800)
    const t2 = setTimeout(() => onDone(), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-600 ${fading ? 'opacity-0' : 'opacity-100'}`}
      style={{ background: 'linear-gradient(135deg, #1A1033 0%, #2A1A4A 100%)' }}
    >
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <EarthLogo size={120} spin glow />
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight" style={{ color: '#F5F3FF' }}>
            Daily Globe
          </h1>
          <p className="text-sm mt-1" style={{ color: '#B8A9E0' }}>
            How well do you know the world's flags?
          </p>
        </div>
      </div>
    </div>
  )
}
