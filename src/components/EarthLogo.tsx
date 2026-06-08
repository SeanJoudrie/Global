interface Props {
  size?: number
  className?: string
}

export default function EarthLogo({ size = 80, className = "" }: Props) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 120 120"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Ocean */}
      <circle cx="60" cy="60" r="46" fill="#3BB8F0" />

      {/* North America */}
      <path d="M 22,33 Q 30,24 52,28 Q 58,33 56,44 Q 51,52 45,59 Q 41,66 37,73 Q 32,68 34,62 Q 29,55 25,46 Q 21,40 22,33 Z" fill="#4CAF50" />

      {/* Greenland */}
      <path d="M 26,20 Q 34,15 41,20 Q 42,27 33,27 Z" fill="#4CAF50" />

      {/* South America */}
      <path d="M 37,71 Q 44,65 51,68 Q 54,80 51,92 Q 47,101 42,100 Q 35,97 32,84 Q 30,73 37,71 Z" fill="#4CAF50" />

      {/* Europe */}
      <path d="M 60,25 Q 68,20 77,25 Q 80,32 74,38 Q 65,39 61,33 Z" fill="#4CAF50" />

      {/* Africa */}
      <path d="M 56,42 Q 65,36 80,40 Q 85,53 83,70 Q 78,88 68,92 Q 58,92 53,80 Q 49,66 53,50 Z" fill="#4CAF50" />

      {/* Asia */}
      <path d="M 78,27 Q 89,21 100,28 Q 103,37 97,44 Q 88,45 80,39 Q 76,34 78,27 Z" fill="#4CAF50" />

      {/* Globe outline */}
      <circle cx="60" cy="60" r="46" fill="none" stroke="#111" strokeWidth="4.5" />

      {/* Left cloud — single smooth path, no internal dividers */}
      <path
        d="M 8,71 C 4,72 3,65 7,62 C 6,55 10,52 16,55 C 17,48 23,47 27,51 C 30,48 37,50 37,57 C 43,58 42,66 37,69 L 8,71 Z"
        fill="white" stroke="#111" strokeWidth="2.5" strokeLinejoin="round"
      />

      {/* Right cloud — single smooth path, no internal dividers */}
      <path
        d="M 89,62 C 85,63 84,55 89,53 C 88,45 95,42 101,47 C 104,40 112,41 115,47 C 121,43 125,53 120,57 C 124,63 89,63 89,62 Z"
        fill="white" stroke="#111" strokeWidth="3" strokeLinejoin="round"
      />
    </svg>
  )
}
