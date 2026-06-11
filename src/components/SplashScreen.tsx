import { useEffect } from 'react'
import EarthLogo from './EarthLogo'
import { T, IS_CARTO } from '../ui/tokens'

interface Props { onDone: () => void }

export default function SplashScreen({ onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600)
    return () => clearTimeout(t)
  }, [onDone])

  // Match the backdrop to the dashboard we're about to reveal, so there's no
  // colour flash as the splash fades out. Cartographer gets a warm parchment
  // wash; other aesthetics just use their own background.
  const backdrop = IS_CARTO ? 'linear-gradient(160deg, #F7F0E1 0%, #F3E8CE 100%)' : T.bg

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        background: backdrop,
        zIndex: 100,
        animation: 'splashFade 1.6s ease forwards',
      }}
    >
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
        animation: 'splashAnim 1.6s cubic-bezier(0.4,0,0.2,1) forwards',
      }}>
        <EarthLogo size={150} />
        <h1 style={{ color: IS_CARTO ? '#3A2A16' : T.text, fontSize: 38, fontWeight: 900, letterSpacing: '-0.5px', margin: 0 }}>
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
        /* The backdrop itself fades out at the end */
        @keyframes splashFade {
          0%, 70% { opacity: 1; }
          100%    { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
