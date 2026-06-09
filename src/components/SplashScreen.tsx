import { useEffect } from 'react'
import EarthLogo from './EarthLogo'

interface Props { onDone: () => void }

export default function SplashScreen({ onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #1A1033 0%, #2A1A4A 100%)', zIndex: 100 }}
    >
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
        animation: 'splashAnim 1.6s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
      }}>
        <EarthLogo size={140} />
        <h1 style={{ color: '#F5F3FF', fontSize: 36, fontWeight: 900, letterSpacing: '-0.5px', margin: 0 }}>
          Globalio
        </h1>
      </div>
      <style>{`
        @keyframes splashAnim {
          0%   { transform: scale(0.05); opacity: 0; }
          28%  { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(0.05); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
