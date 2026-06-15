interface Props {
  size?: number
  className?: string
}

// The Globalio brand mark — the detailed 3-cloud globe (public/logo.png, a
// transparent cut-out). Rendered as an <img> so the artwork stays pixel-perfect
// everywhere it's used (splash, headers, supporter screen). Sits in a square
// box with the art centred so existing size props keep their footprint.
export default function EarthLogo({ size = 80, className = "" }: Props) {
  return (
    <img
      src="/logo.png"
      alt="Globalio"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: "contain", display: "block" }}
      draggable={false}
    />
  )
}
