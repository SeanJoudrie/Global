import { useRef, useState, useLayoutEffect } from "react"
import type { CSSProperties } from "react"
import worldMap from "@svg-maps/world"

/**
 * Renders a single country's outline from the local @svg-maps/world path data
 * (no network). The Geography quiz previously pulled raster outlines from the
 * mapsicon CDN, which is missing/mismatched for a number of countries — so some
 * outlines silently failed to load. Drawing the vector path locally is reliable
 * and instant. For the handful of codes the map doesn't include, we fall back
 * to the mapsicon image so nothing renders blank.
 */
const PATHS = new Map<string, string>(
  (worldMap as { locations: { id: string; path: string }[] }).locations.map(l => [l.id, l.path])
)

export function hasOutline(code: string): boolean {
  return PATHS.has(code.toLowerCase())
}

interface Props {
  code: string
  fill?: string
  className?: string
  style?: CSSProperties
}

export default function CountryOutline({ code, fill = "#fff", className, style }: Props) {
  const path = PATHS.get(code.toLowerCase())
  const ref = useRef<SVGPathElement>(null)
  const [vb, setVb] = useState<string | null>(null)
  const [forCode, setForCode] = useState<string | null>(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    const b = ref.current.getBBox()
    if (b.width === 0 || b.height === 0) return
    const pad = Math.max(b.width, b.height) * 0.08
    setVb(`${b.x - pad} ${b.y - pad} ${b.width + pad * 2} ${b.height + pad * 2}`)
    setForCode(code)
  }, [code, path])

  if (!path) {
    // Fallback for codes not present in the local map: mapsicon raster.
    const c = code.toLowerCase()
    return (
      <img
        src={`https://cdn.jsdelivr.net/gh/djaiss/mapsicon@master/all/${c}/512.png`}
        alt=""
        className={className}
        style={{ ...style, filter: "brightness(0) invert(1)" }}
        onError={e => {
          const el = e.target as HTMLImageElement
          if (!el.dataset.fb) {
            el.dataset.fb = "1"
            el.src = `https://cdn.jsdelivr.net/gh/djaiss/mapsicon@master/all/${c}/vector.svg`
          }
        }}
      />
    )
  }

  const ready = forCode === code && vb != null
  return (
    <svg
      viewBox={vb ?? "0 0 1010 666"}
      className={className}
      style={{ ...style, opacity: ready ? 1 : 0, transition: "opacity 0.2s" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <path ref={ref} d={path} fill={fill} />
    </svg>
  )
}
