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
      {/* Ocean fill */}
      <circle cx="60" cy="60" r="46" fill="#3BB8F0" />

      {/* Greenland */}
      <path d="M 26,20 C 30,16 38,16 41,20 C 42,24 38,27 31,26 Z"
        fill="#4CAF50" stroke="#111" strokeWidth="3" strokeLinejoin="round" />

      {/* North America */}
      <path d="M 22,32 C 28,25 40,23 52,27 C 58,30 57,38 52,45 C 47,51 42,55 38,62 C 34,58 30,50 26,44 C 22,40 20,36 22,32 Z"
        fill="#4CAF50" stroke="#111" strokeWidth="3.5" strokeLinejoin="round" />

      {/* Florida peninsula */}
      <path d="M 38,62 C 40,66 39,72 36,74 C 34,72 33,66 35,62 Z"
        fill="#4CAF50" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />

      {/* South America */}
      <path d="M 36,68 C 42,64 50,66 52,76 C 54,86 50,96 44,98 C 38,97 32,88 32,78 C 31,72 33,68 36,68 Z"
        fill="#4CAF50" stroke="#111" strokeWidth="3.5" strokeLinejoin="round" />

      {/* Europe */}
      <path d="M 60,26 C 66,22 75,24 78,30 C 79,35 74,39 67,38 C 61,37 58,32 60,26 Z"
        fill="#4CAF50" stroke="#111" strokeWidth="3" strokeLinejoin="round" />

      {/* Africa — big, recognizable West bulge */}
      <path d="M 56,42 C 64,36 78,38 82,50 C 86,62 82,78 74,88 C 66,94 57,92 53,82 C 49,72 50,58 54,48 Z"
        fill="#4CAF50" stroke="#111" strokeWidth="3.5" strokeLinejoin="round" />

      {/* Asia (partial, right side) */}
      <path d="M 78,26 C 86,21 97,24 100,32 C 102,40 96,46 88,46 C 80,45 76,40 76,34 Z"
        fill="#4CAF50" stroke="#111" strokeWidth="3" strokeLinejoin="round" />

      {/* Globe outline on top */}
      <circle cx="60" cy="60" r="46" fill="none" stroke="#111" strokeWidth="5" />

      {/* Left small cloud */}
      <ellipse cx="17" cy="64" rx="10" ry="6" fill="white" stroke="#111" strokeWidth="3" />
      <ellipse cx="11" cy="61" rx="7" ry="6" fill="white" stroke="#111" strokeWidth="3" />
      <ellipse cx="21" cy="59" rx="8" ry="6" fill="white" stroke="#111" strokeWidth="3" />

      {/* Right big cloud */}
      <ellipse cx="103" cy="52" rx="14" ry="9" fill="white" stroke="#111" strokeWidth="3.5" />
      <ellipse cx="94" cy="48" rx="10" ry="9" fill="white" stroke="#111" strokeWidth="3.5" />
      <ellipse cx="110" cy="46" rx="10" ry="8" fill="white" stroke="#111" strokeWidth="3.5" />
    </svg>
  )
}
