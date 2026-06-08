interface Props {
  size?: number
  className?: string
}

export default function EarthLogo({ size = 80, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Globe body */}
      <circle cx="60" cy="60" r="46" fill="#3BB8F0" stroke="#111" strokeWidth="5" />

      {/* Continents */}
      {/* Americas */}
      <path d="M28 35 Q22 44 26 56 Q30 66 27 76 Q24 84 31 88 Q39 92 42 82 Q45 72 40 62 Q35 52 38 42 Q40 32 34 30 Z"
        fill="#4CAF50" stroke="#111" strokeWidth="3.5" strokeLinejoin="round" />
      {/* Europe/Africa */}
      <path d="M54 22 Q62 19 67 26 Q72 34 68 44 Q64 52 68 62 Q73 72 68 82 Q63 90 55 86 Q47 82 50 72 Q53 62 49 52 Q44 42 48 32 Z"
        fill="#4CAF50" stroke="#111" strokeWidth="3.5" strokeLinejoin="round" />
      {/* Asia */}
      <path d="M72 24 Q82 20 90 28 Q97 36 94 46 Q91 56 85 58 Q79 60 74 52 Q67 44 70 34 Z"
        fill="#4CAF50" stroke="#111" strokeWidth="3.5" strokeLinejoin="round" />
      {/* Australia */}
      <path d="M80 68 Q88 65 93 73 Q98 81 91 86 Q84 91 79 83 Q73 75 80 68 Z"
        fill="#4CAF50" stroke="#111" strokeWidth="3.5" strokeLinejoin="round" />

      {/* Globe outline */}
      <circle cx="60" cy="60" r="46" fill="none" stroke="#111" strokeWidth="5" />

      {/* Left cloud */}
      <ellipse cx="18" cy="62" rx="13" ry="7" fill="white" stroke="#111" strokeWidth="3.5" />
      <ellipse cx="12" cy="59" rx="9" ry="7" fill="white" stroke="#111" strokeWidth="3.5" />
      <ellipse cx="22" cy="57" rx="9" ry="7" fill="white" stroke="#111" strokeWidth="3.5" />

      {/* Right cloud */}
      <ellipse cx="102" cy="54" rx="16" ry="9" fill="white" stroke="#111" strokeWidth="3.5" />
      <ellipse cx="94" cy="50" rx="11" ry="9" fill="white" stroke="#111" strokeWidth="3.5" />
      <ellipse cx="108" cy="48" rx="11" ry="9" fill="white" stroke="#111" strokeWidth="3.5" />
    </svg>
  )
}
