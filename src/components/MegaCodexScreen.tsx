import { useState, useRef, useEffect } from "react"
import { FLAGS } from "../data/flags"
import { SUB_FLAGS } from "../data/subdivisions"
import { HISTORICAL_FLAGS } from "../data/historicalFlags"
import { IDENTITY_FLAGS } from "../data/identityFlags"
import { CODEX } from "../data/codex"

interface Props { onBack: () => void }

// Nazi swastika is not celebrated here; .gif flags are skipped (heavy/animated).
const EXCLUDE = (url: string) => url.includes("German_Reich") || /\.gif(\?|$)/i.test(url)

function gatherFlagUrls(): string[] {
  const urls = new Set<string>()
  FLAGS.forEach(f => urls.add(f.flagUrl))
  SUB_FLAGS.forEach(s => urls.add(s.flagUrl))
  HISTORICAL_FLAGS.forEach(h => urls.add(h.flagUrl))
  IDENTITY_FLAGS.forEach(i => urls.add(i.flagUrl))
  Object.values(CODEX).forEach(entry => {
    entry.flagHistory.forEach(hf => {
      urls.add(hf.flagUrl)
      hf.parallel?.forEach(p => urls.add(p.flagUrl))
    })
  })
  return [...urls].filter(u => !EXCLUDE(u)).sort(() => Math.random() - 0.5)
}

const GAP = 3
const PAD = 6
const MIN_TILE = 56
const BUFFER_ROWS = 8

export default function MegaCodexScreen({ onBack }: Props) {
  const [urls] = useState(gatherFlagUrls)
  const scrollRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const [vw, setVw] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 390))
  const [vh, setVh] = useState(() => (typeof window !== "undefined" ? window.innerHeight : 800))
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const onResize = () => { setVw(window.innerWidth); setVh(window.innerHeight) }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Uniform grid geometry
  const cols = Math.max(2, Math.floor((vw - PAD * 2 + GAP) / (MIN_TILE + GAP)))
  const tileW = (vw - PAD * 2 - GAP * (cols - 1)) / cols
  const rowH = tileW * (2 / 3) + GAP
  const totalRows = Math.ceil(urls.length / cols)
  const totalHeight = totalRows * rowH + PAD * 2

  const startRow = Math.max(0, Math.floor(scrollTop / rowH) - BUFFER_ROWS)
  const endRow = Math.min(totalRows, Math.ceil((scrollTop + vh) / rowH) + BUFFER_ROWS)
  const startIdx = startRow * cols
  const endIdx = Math.min(urls.length, endRow * cols)
  const visible = urls.slice(startIdx, endIdx)

  const onScroll = () => {
    if (rafRef.current != null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      if (scrollRef.current) setScrollTop(scrollRef.current.scrollTop)
    })
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "#0B0717", zIndex: 1 }}>
      <button onClick={onBack} aria-label="Back"
        style={{
          position: "fixed", top: 12, left: 12, zIndex: 50,
          width: 40, height: 40, borderRadius: 999, fontSize: 22,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(11,7,23,0.82)", color: "#F5F3FF",
          border: "1px solid rgba(139,108,255,0.4)", backdropFilter: "blur(6px)", cursor: "pointer",
        }}>‹</button>

      <div ref={scrollRef} onScroll={onScroll}
        style={{ position: "absolute", inset: 0, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
        {/* Full-height spacer so the scrollbar represents the whole wall */}
        <div style={{ height: totalHeight, position: "relative" }}>
          {/* Only the visible rows are mounted */}
          <div style={{
            position: "absolute", left: PAD, right: PAD, top: PAD + startRow * rowH,
            display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: GAP,
          }}>
            {visible.map((u, k) => (
              <img
                key={startIdx + k}
                src={u}
                alt=""
                loading="lazy"
                decoding="async"
                style={{ width: "100%", aspectRatio: "3 / 2", objectFit: "cover", borderRadius: 3, display: "block", background: "#16102E" }}
                onError={e => {
                  const el = e.target as HTMLImageElement
                  const t = Number(el.dataset.t || "0")
                  if (t < 2) {
                    el.dataset.t = String(t + 1)
                    el.removeAttribute("src")
                    window.setTimeout(() => { el.src = u }, 500 + t * 800 + Math.random() * 600)
                  } else {
                    el.style.visibility = "hidden"
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
