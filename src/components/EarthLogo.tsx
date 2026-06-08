interface Props {
  size?: number
  className?: string
  spin?: boolean
  glow?: boolean
}

export default function EarthLogo({ size = 80, className = '', spin = false, glow = false }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${spin ? 'animate-spin-slow' : ''} ${glow ? 'animate-pulse-glow' : ''} ${className}`}
    >
      {/* Globe body */}
      <circle cx="50" cy="50" r="44" fill="#1E3A5F" stroke="#A78BFA" strokeWidth="3.5" />

      {/* Continents — simplified blobs */}
      {/* Americas */}
      <path d="M22 30 Q18 38 22 46 Q26 52 24 60 Q22 68 28 72 Q34 76 36 68 Q38 60 34 52 Q30 44 32 36 Q34 28 28 26 Z" fill="#34D399" />
      {/* Europe/Africa */}
      <path d="M46 22 Q52 20 56 26 Q60 32 56 40 Q52 46 56 54 Q60 62 56 70 Q52 76 46 72 Q40 68 42 60 Q44 52 40 44 Q36 36 40 28 Z" fill="#34D399" />
      {/* Asia */}
      <path d="M60 24 Q68 20 74 26 Q80 32 78 40 Q76 48 72 50 Q68 52 64 46 Q58 40 60 32 Z" fill="#34D399" />
      {/* Australia */}
      <path d="M68 58 Q74 56 78 62 Q82 68 76 72 Q70 76 66 70 Q62 64 68 58 Z" fill="#34D399" />

      {/* Latitude lines */}
      <ellipse cx="50" cy="50" rx="44" ry="15" stroke="#A78BFA" strokeWidth="1.2" fill="none" opacity="0.4" />
      <line x1="6" y1="50" x2="94" y2="50" stroke="#A78BFA" strokeWidth="1.2" opacity="0.4" />

      {/* Subtle orbit ring */}
      <ellipse cx="50" cy="50" rx="52" ry="14" stroke="#8B6CFF" strokeWidth="1.5" fill="none" opacity="0.3" transform="rotate(-20 50 50)" />
    </svg>
  )
}
