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
      style={{
        background: 'linear-gradient(160deg, #F7F0E1 0%, #EADCC2 100%)',
        zIndex: 100,
        animation: 'splashFade 1.6s ease forwards',
      }}
    >
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
        animation: 'splashAnim 1.6s cubic-bezier(0.4,0,0.2,1) forwards',
      }}>
        <EarthLogo size={150} />
        <h1 style={{ color: '#3A2A16', fontSize: 38, fontWeight: 900, letterSpacing: '-0.5px', margin: 0 }}>
          Globalio
        </h1>
      </div>
      <style>{`
        /* Logo starts big, holds, then shrinks away to reveal the dashboard */
        @keyframes splashAnim {
          0%   { transform: scale(1.6); opacity: 0; }
          18%  { transform: scale(1.35); opacity: 1; }
          55%  { transform: scale(1.0);  opacity: 1; }
          100% { transform: scale(0.15); opacity: 0; }
        }
        /* The cream backdrop itself fades out at the end */
        @keyframes splashFade {
          0%, 70% { opacity: 1; }
          100%    { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
