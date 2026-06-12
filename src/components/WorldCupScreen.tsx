import { useRef, useState } from "react"
import { FLAGS } from "../data/flags"
import { CODEX, CODEX_SUMMARIES } from "../data/codex"
import { WORLD_CUP_2026, WC_NAME_OVERRIDE } from "../data/worldCup2026"
import { T, ACCENT, FONT, tint, IS_CARTO } from "../ui/tokens"
import { ScreenHeader } from "./ui"
import { ChevronLeftIcon, LineIcon } from "./icons"
import FlagImage from "./FlagImage"

// 2026 World Cup flashcard explorer — swipe (or tap the arrows) through the
// 48-nation field. Each card pulls the flag, a real Codex description, and the
// country's historical flags from data we already ship. Pure learning, in the
// same parchment style as the rest of the app.
interface Props { onBack: () => void }
const A = ACCENT.codex

export default function WorldCupScreen({ onBack }: Props) {
  const teams = WORLD_CUP_2026
  const n = teams.length
  const [i, setI] = useState(0)
  const [dx, setDx] = useState(0)
  const startX = useRef(0)
  const startY = useRef(0)
  const axis = useRef<null | "h" | "v">(null)
  const dragging = useRef(false)

  const go = (d: number) => { setI(v => (v + d + n) % n); setDx(0) }
  const team = teams[i]
  const code = team.code.toLowerCase()
  const rec = FLAGS.find(f => f.code === team.code)
  const name = WC_NAME_OVERRIDE[team.code] ?? rec?.name ?? team.code
  const summary = CODEX_SUMMARIES[team.code] ?? rec?.funFact ?? ""
  const region = rec?.region ?? ""
  // Skip the live flag (history[0] is usually current) — show only the past.
  const history = (CODEX[team.code]?.flagHistory ?? []).filter(h => h.toYear !== null)

  return (
    <div style={{ position: "fixed", inset: 0, background: T.bg, color: T.text, zIndex: 1, display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="World Cup 2026" subtitle={`${n} nations · flags, facts & history`} onBack={onBack}
        right={
          <span className="geo-mono" style={{ fontFamily: FONT.mono, fontVariantNumeric: "tabular-nums", fontSize: 13, color: T.muted, padding: "0 4px" }}>
            {i + 1}/{n}
          </span>
        } />

      <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch", padding: "4px 16px 32px" }}>
        {/* Flag card — swipe horizontally (or use the arrows) to change nation */}
        <div style={{ position: "relative", touchAction: "pan-y" }}
          onPointerDown={e => { dragging.current = true; axis.current = null; startX.current = e.clientX; startY.current = e.clientY; try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId) } catch { /* ignore */ } }}
          onPointerMove={e => {
            if (!dragging.current) return
            const ax = e.clientX - startX.current, ay = e.clientY - startY.current
            if (axis.current === null) {
              if (Math.abs(ax) < 8 && Math.abs(ay) < 8) return
              axis.current = Math.abs(ax) > Math.abs(ay) ? "h" : "v"
            }
            if (axis.current === "v") { dragging.current = false; setDx(0); return }
            setDx(ax)
          }}
          onPointerUp={() => {
            if (!dragging.current) return
            dragging.current = false
            const horizontal = axis.current === "h"
            axis.current = null
            if (horizontal && Math.abs(dx) > 60) go(dx < 0 ? 1 : -1); else setDx(0)
          }}
          onPointerCancel={() => { dragging.current = false; axis.current = null; setDx(0) }}>
          <div className={IS_CARTO ? "carto-card" : ""} style={{
            borderRadius: 18, overflow: "hidden", position: "relative",
            border: `1px solid ${tint(A, 0.4)}`, background: T.surface,
            transform: `translateX(${dx}px) rotate(${dx * 0.018}deg)`,
            transition: dragging.current ? "none" : "transform 0.25s cubic-bezier(0.2,0.7,0.2,1)",
          }}>
            <div style={{ height: 188, background: tint(A, 0.1), position: "relative" }}>
              <FlagImage code={code} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              {team.host && (
                <span className="geo-micro" style={{ position: "absolute", top: 10, left: 10, fontSize: 8.5, color: T.onAccent, background: A, padding: "5px 9px", borderRadius: 999 }}>◦ Host nation</span>
              )}
            </div>
            <div style={{ padding: "13px 16px 15px" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
                <div className="geo-display" style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em", color: T.text, lineHeight: 1.05 }}>{name}</div>
                <span className="geo-micro" style={{ fontSize: 8.5, color: A, flexShrink: 0 }}>{team.conf}</span>
              </div>
              {region && <div style={{ color: T.muted, fontSize: 11.5, marginTop: 2 }}>{region}</div>}
            </div>
          </div>

          {/* Arrow controls (≥44px) */}
          <button onClick={() => go(-1)} aria-label="Previous nation" className="geo-tap"
            style={{ ...arrowStyle, left: 8 }}>
            <ChevronLeftIcon size={22} color={T.text} strokeWidth={1.8} />
          </button>
          <button onClick={() => go(1)} aria-label="Next nation" className="geo-tap"
            style={{ ...arrowStyle, right: 8, transform: "translateY(-50%) scaleX(-1)" }}>
            <ChevronLeftIcon size={22} color={T.text} strokeWidth={1.8} />
          </button>
        </div>

        {/* Description */}
        {summary && (
          <p style={{ color: T.muted, fontSize: 13.5, lineHeight: 1.6, marginTop: 16 }}>{summary}</p>
        )}

        {/* Historical flags from the Codex */}
        {history.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ width: 12, height: 1.5, background: A, opacity: 0.7 }} />
              <span className="geo-micro" style={{ fontSize: 10, color: A }}>Flags through history</span>
            </div>
            <div className="carto-rail" style={{ display: "flex", gap: 10, overflowX: "auto", margin: "0 -16px", padding: "2px 16px 8px" }}>
              {history.map((h, k) => (
                <div key={k} style={{ width: 132, flexShrink: 0 }}>
                  <div style={{ width: "100%", height: 84, borderRadius: 10, overflow: "hidden", border: `1px solid ${T.line}`, background: T.surfaceHi }}>
                    <img src={h.flagUrl} alt={h.label} loading="lazy" decoding="async"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      onError={e => { (e.currentTarget.parentElement as HTMLElement).style.display = "none" }} />
                  </div>
                  <div className="geo-display" style={{ fontSize: 11, fontWeight: 600, color: T.text, marginTop: 6, lineHeight: 1.2 }}>{h.label}</div>
                  <div style={{ fontFamily: FONT.mono, fontSize: 9.5, color: T.muted, marginTop: 1 }}>
                    {h.fromYear}{h.toYear ? `–${h.toYear}` : "–now"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {history.length === 0 && (
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, color: T.dim, fontSize: 11.5 }}>
            <LineIcon name="historical" size={14} color={T.dim} />
            Historical flags for {name} are coming to the Codex.
          </div>
        )}
      </div>
    </div>
  )
}

const arrowStyle = {
  position: "absolute" as const, top: 94, transform: "translateY(-50%)",
  width: 44, height: 44, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center",
  background: `${T.surface}E8`, border: `1px solid ${T.line}`, backdropFilter: "blur(4px)",
  boxShadow: `0 4px 12px -6px ${tint(T.text, 0.5)}`,
}
