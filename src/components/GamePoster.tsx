import type { CSSProperties } from "react"
import { FLAGS } from "../data/flags"
import { SUB_FLAGS } from "../data/subdivisions"
import { T, tint } from "../ui/tokens"
import { LineIcon } from "./icons"
import FlagImage from "./FlagImage"

/**
 * GamePoster — the art for a game card. Every poster *demonstrates* its game
 * (a silhouette game shows a flag in the dark, Frankenflag shows two halves
 * stitched, …) instead of a random unrelated flag. Recipes are composed from
 * data we already ship (FLAGS / SUB_FLAGS) plus CSS and the etched line icons,
 * so adding/clarifying art is editing this one file — no 37 image assets.
 *
 * Fills its parent; the caller owns size, radius and overflow:hidden.
 */

// Stable FNV-1a hash so a game's poster is varied yet identical every render.
function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) }
  return h >>> 0
}
// `n` distinct, recognisable flags seeded by the game id (skews to well-known
// flags up front so the demonstrations read clearly).
function flagsFor(id: string, n: number) {
  const out: string[] = []
  let k = hash(id)
  while (out.length < n) {
    const code = FLAGS[k % FLAGS.length].code
    if (!out.includes(code)) out.push(code)
    k = (k * 1103515245 + 12345) >>> 0
  }
  return out
}
function subFor(id: string) {
  return SUB_FLAGS.length ? SUB_FLAGS[hash(id) % SUB_FLAGS.length] : null
}

const FILL: CSSProperties = { width: "100%", height: "100%", objectFit: "cover", display: "block" }
const fullFlag = (code: string, style: CSSProperties = {}) =>
  <FlagImage code={code} style={{ ...FILL, ...style }} />

// id → recipe key. Anything not listed falls back to the icon-forward poster.
const RECIPE: Record<string, string> = {
  silhouette: "silhouette", thecrop: "crop", frankenflag: "franken",
  lookalikes: "grid", flagfamilies: "grid", continentsort: "grid", oddoneout: "grid",
  flagdna: "grid", symbolhunt: "huntgrid",
  statclash: "versus", higherlower: "versus",
  realorbot: "glitch", historical: "aged", deadoralive: "aged",
  timeline: "row", lineage: "row",
  substumper: "subflag", provinceroulette: "subflag",
  identity: "pride", prideroulette: "pride",
  gacha: "capsule", thepeel: "peel",
  buildflag: "bands", composer: "bands",
  flags: "stack", flashcards: "stack",
}

export function GamePoster({ id, accent, variant = "tile" }:
  { id: string; accent: string; variant?: "tile" | "hero" }) {
  const hero = variant === "hero"
  const wash = `radial-gradient(120% 120% at 50% 22%, ${tint(accent, 0.22)}, ${tint(accent, 0.07)})`
  const box: CSSProperties = { position: "absolute", inset: 0 }

  switch (RECIPE[id]) {
    case "silhouette": {
      const [a] = flagsFor(id, 1)
      return (
        <div style={{ ...box, background: "#10171c" }}>
          {fullFlag(a, { filter: "grayscale(1) brightness(0.16) contrast(1.5)" })}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(130% 130% at 50% 40%, transparent 30%, rgba(0,0,0,0.65))" }} />
        </div>
      )
    }
    case "crop": {
      const [a] = flagsFor(id, 1)
      return (
        <div style={{ ...box, background: tint(accent, 0.1) }}>
          {fullFlag(a, { transform: `scale(${hero ? 3.4 : 2.9})`, transformOrigin: "38% 46%" })}
        </div>
      )
    }
    case "franken": {
      const [a, b] = flagsFor(id, 2)
      return (
        <div style={{ ...box, display: "flex" }}>
          <div style={{ width: "50%", height: "100%", overflow: "hidden" }}>{fullFlag(a, { width: "200%" })}</div>
          <div style={{ width: "50%", height: "100%", overflow: "hidden", display: "flex", justifyContent: "flex-end" }}>{fullFlag(b, { width: "200%" })}</div>
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 2, marginLeft: -1, background: T.surface, opacity: 0.85 }} />
        </div>
      )
    }
    case "grid": {
      const four = flagsFor(id, 4)
      return (
        <div style={{ ...box, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 2, background: T.line }}>
          {four.map(c => <div key={c} style={{ overflow: "hidden" }}>{fullFlag(c)}</div>)}
        </div>
      )
    }
    case "huntgrid": {
      const four = flagsFor(id, 4)
      return (
        <div style={{ ...box }}>
          <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 2, background: T.line }}>
            {four.map(c => <div key={c} style={{ overflow: "hidden" }}>{fullFlag(c)}</div>)}
          </div>
          <div style={{ position: "absolute", right: hero ? 14 : 7, bottom: hero ? 12 : 6, color: accent, background: `${T.surface}F0`, borderRadius: 999, padding: hero ? 7 : 4, display: "flex", border: `1px solid ${tint(accent, 0.5)}` }}>
            <LineIcon name="symbolhunt" size={hero ? 22 : 14} color={accent} />
          </div>
        </div>
      )
    }
    case "versus": {
      const [a, b] = flagsFor(id, 2)
      return (
        <div style={{ ...box, display: "flex", gap: 2, background: T.line }}>
          <div style={{ flex: 1, overflow: "hidden" }}>{fullFlag(a)}</div>
          <div style={{ flex: 1, overflow: "hidden" }}>{fullFlag(b)}</div>
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: hero ? 38 : 26, height: hero ? 38 : 26, borderRadius: 999, background: accent, color: T.onAccent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontSize: hero ? 15 : 10, boxShadow: `0 2px 8px -2px ${tint(T.text, 0.6)}` }}>VS</div>
        </div>
      )
    }
    case "glitch": {
      const [a] = flagsFor(id, 1)
      return (
        <div style={{ ...box, background: tint(accent, 0.1) }}>
          {fullFlag(a, { filter: "hue-rotate(150deg) saturate(1.7) contrast(1.1)" })}
          <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,0.06) 3px 4px)" }} />
          <div style={{ position: "absolute", right: hero ? 12 : 6, top: hero ? 12 : 6, color: accent, background: `${T.surface}F0`, borderRadius: 999, padding: hero ? 7 : 4, display: "flex", border: `1px solid ${tint(accent, 0.5)}` }}>
            <LineIcon name="realorbot" size={hero ? 22 : 14} color={accent} />
          </div>
        </div>
      )
    }
    case "aged": {
      const [a] = flagsFor(id, 1)
      return (
        <div style={{ ...box, background: "#cdbb93" }}>
          {fullFlag(a, { filter: "sepia(0.6) contrast(0.9) brightness(1.02)", opacity: 0.9 })}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(130% 130% at 50% 40%, transparent 45%, rgba(60,40,15,0.4))" }} />
        </div>
      )
    }
    case "row": {
      const three = flagsFor(id, 3)
      return (
        <div style={{ ...box, display: "flex", alignItems: "center", gap: hero ? 10 : 5, padding: hero ? "0 16px" : "0 8px", background: wash }}>
          {three.map((c, i) => (
            <div key={c} style={{ display: "flex", alignItems: "center", gap: hero ? 10 : 5, minWidth: 0 }}>
              {i > 0 && <span style={{ flex: "0 0 auto", width: hero ? 14 : 8, height: 2, background: tint(accent, 0.6) }} />}
              <div style={{ flex: 1, minWidth: 0, aspectRatio: "3 / 2", borderRadius: 4, overflow: "hidden", border: `1px solid ${T.line}`, boxShadow: `0 2px 6px -3px ${tint(T.text, 0.5)}` }}>{fullFlag(c)}</div>
            </div>
          ))}
        </div>
      )
    }
    case "subflag": {
      const sub = subFor(id)
      if (!sub) break
      return (
        <div style={{ ...box, background: tint(accent, 0.1) }}>
          <img src={sub.flagUrl} alt="" loading="lazy" decoding="async" style={FILL} />
        </div>
      )
    }
    case "pride":
      return (
        <div style={{ ...box, display: "flex", flexDirection: "column" }}>
          {["#E40303", "#FF8C00", "#FFED00", "#008026", "#004CFF", "#732982"].map(c => (
            <div key={c} style={{ flex: 1, background: c }} />
          ))}
        </div>
      )
    case "capsule": {
      const [a] = flagsFor(id, 1)
      return (
        <div style={{ ...box, display: "flex", alignItems: "center", justifyContent: "center", background: wash }}>
          <div style={{ width: hero ? "46%" : "62%", aspectRatio: "1", borderRadius: "50%", overflow: "hidden", border: `2px solid ${tint(accent, 0.6)}`, boxShadow: `0 4px 12px -4px ${tint(T.text, 0.5)}`, background: T.surface }}>
            <div style={{ width: "100%", height: "50%", background: tint(accent, 0.5) }} />
            <div style={{ width: "100%", height: "50%", overflow: "hidden" }}>{fullFlag(a)}</div>
          </div>
        </div>
      )
    }
    case "peel": {
      const [a] = flagsFor(id, 1)
      return (
        <div style={{ ...box }}>
          {fullFlag(a)}
          <div style={{ position: "absolute", inset: 0, background: T.surfaceHi,
            clipPath: "polygon(0 0, 100% 0, 100% 32%, 64% 44%, 78% 72%, 40% 64%, 22% 100%, 0 100%)",
            borderRight: `1px dashed ${T.lineHi}` }} />
          <div style={{ position: "absolute", left: hero ? 12 : 6, top: hero ? 12 : 6, color: T.muted, display: "flex" }}>
            <LineIcon name="thepeel" size={hero ? 22 : 14} color={T.muted} />
          </div>
        </div>
      )
    }
    case "bands": {
      const [a] = flagsFor(id, 1)
      const offs = [-1, 0, 1]
      return (
        <div style={{ ...box, background: wash, display: "flex", flexDirection: "column", justifyContent: "center", gap: hero ? 5 : 3, padding: hero ? "0 18px" : "0 10px" }}>
          {offs.map((o, i) => (
            <div key={i} style={{ height: hero ? 22 : 12, borderRadius: 3, overflow: "hidden", border: `1px solid ${T.line}`, transform: `translateX(${o * (hero ? 14 : 7)}px)`, boxShadow: `0 2px 5px -3px ${tint(T.text, 0.5)}` }}>
              {fullFlag(a, { height: hero ? 66 : 36, marginTop: `-${i * (hero ? 22 : 12)}px` })}
            </div>
          ))}
        </div>
      )
    }
    case "stack": {
      const three = flagsFor(id, 3)
      return (
        <div style={{ ...box, display: "flex", alignItems: "center", justifyContent: "center", background: wash }}>
          <div style={{ position: "relative", width: hero ? "44%" : "60%", aspectRatio: "3 / 2" }}>
            {three.map((c, i) => (
              <div key={c} style={{ position: "absolute", inset: 0, borderRadius: 5, overflow: "hidden", border: `1px solid ${T.surface}`,
                transform: `translate(${(i - 1) * (hero ? 9 : 5)}px, ${(i - 1) * (hero ? 7 : 4)}px) rotate(${(i - 1) * 5}deg)`,
                boxShadow: `0 3px 8px -4px ${tint(T.text, 0.6)}`, zIndex: i }}>{fullFlag(c)}</div>
            ))}
          </div>
        </div>
      )
    }
  }

  // Icon-forward default — the game's own etched glyph on a soft accent wash.
  // Relevant and calm; never a random unrelated flag.
  return (
    <div style={{ ...box, display: "flex", alignItems: "center", justifyContent: "center", background: wash }}>
      <LineIcon name={id} size={hero ? 64 : 34} color={accent} strokeWidth={1.3} />
    </div>
  )
}
