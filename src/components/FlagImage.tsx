import { useState, useMemo, useEffect } from "react"
import type { CSSProperties } from "react"

/**
 * Shared flag image with a robust multi-source fallback chain.
 *
 * Every game previously pointed an <img> straight at flagcdn and handled (or
 * forgot to handle) failures on its own — so a single flagcdn hiccup showed a
 * broken-image "?". This centralises loading: on each error we advance to the
 * next source, and if they all fail we render a styled placeholder instead of
 * a broken image. Fixing it here fixes it everywhere at once.
 */
export function flagSources(code: string): string[] {
  const c = code.toLowerCase()
  return [
    `https://flagcdn.com/w320/${c}.png`,
    `https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/${c}.svg`,
    `https://flagcdn.com/${c}.svg`,
  ]
}

interface Props {
  code: string
  alt?: string
  style?: CSSProperties
  className?: string
  /** Optional override of the placeholder glyph shown when every source fails. */
  placeholder?: string
}

export default function FlagImage({ code, alt = "", style, className, placeholder = "🏳️" }: Props) {
  const sources = useMemo(() => flagSources(code), [code])
  const [idx, setIdx] = useState(0)

  // Reset to the primary source whenever the flag changes.
  useEffect(() => { setIdx(0) }, [code])

  if (idx >= sources.length) {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: style?.background ?? "#1A1033",
          color: "#8B6CFF66", fontSize: 28,
        }}
      >
        {placeholder}
      </div>
    )
  }

  return (
    <img
      src={sources[idx]}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
      onError={() => setIdx(i => i + 1)}
    />
  )
}
