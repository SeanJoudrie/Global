import { useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import worldMap from "@svg-maps/world"
import { Pointer, MousePointer2 } from "lucide-react"
import { SUB_FLAGS } from "../data/subdivisions"
import { T, tint } from "../ui/tokens"
import { LineIcon } from "./icons"
import FlagImage from "./FlagImage"

/**
 * GamePoster — the art for a game card. Every poster *demonstrates* its game:
 * Silhouette is a black-and-white US flag in the dark, The Peel is a flag
 * scratched out from under a dark coating by a finger, Build the Flag is the
 * French tricolore with one band missing, … All hand-curated per game id (no
 * random flags), composed from data we already ship plus CSS — so changing a
 * poster is editing this one file, not producing 37 image assets.
 *
 * Colours *inside* a poster are scene art (flag content), so specific paint
 * (French blue, scratch-card grey) is allowed there; chrome still uses tokens.
 *
 * Fills its parent; the caller owns size, radius and overflow:hidden.
 * variant="hero" (the Trending deck) insets full-bleed art in a framed stage
 * so the flag's edges are always visible.
 */

// Historical art lives on Wikimedia (same source the Historical screens use).
const WM = (file: string) => `https://commons.wikimedia.org/wiki/Special:FilePath/${file}`
const HOLY_ROMAN = WM("Banner_of_the_Holy_Roman_Emperor_with_haloes_(1430-1806).svg")
const SOVIET = WM("Flag_of_the_Soviet_Union.svg")
const RUSSIAN_EMPIRE = WM("Flag_of_the_Russian_Empire_(black-yellow-white).svg")

const subUrl = (code: string) => SUB_FLAGS.find(s => s.code === code)?.flagUrl

const FILL: CSSProperties = { width: "100%", height: "100%", objectFit: "cover", display: "block" }
const flag = (code: string, style: CSSProperties = {}) =>
  <FlagImage code={code} style={{ ...FILL, ...style }} />
const urlImg = (src: string, style: CSSProperties = {}) =>
  <img src={src} alt="" loading="lazy" decoding="async" style={{ ...FILL, ...style }} />

// A small framed flag "card" used inside composed scenes.
function MiniFlag({ code, src, style }: { code?: string; src?: string; style?: CSSProperties }) {
  return (
    <div style={{ aspectRatio: "3 / 2", borderRadius: 4, overflow: "hidden", border: `1px solid ${T.line}`, boxShadow: `0 2px 6px -3px ${tint(T.text, 0.55)}`, background: T.surface, ...style }}>
      {src ? urlImg(src) : code ? flag(code) : null}
    </div>
  )
}

// A country shape from the world map, auto-zoomed to its own bounding box.
function MapShape({ loc, fill = "none", stroke, dashed = false }:
  { loc: string; fill?: string; stroke?: string; dashed?: boolean }) {
  const ref = useRef<SVGPathElement>(null)
  const [vb, setVb] = useState<{ x: number; y: number; w: number; h: number } | null>(null)
  const map = worldMap as { viewBox: string; locations: { id: string; path: string }[] }
  const shape = map.locations.find(l => l.id === loc)
  useEffect(() => {
    if (!ref.current) return
    const b = ref.current.getBBox()
    const pad = Math.max(b.width, b.height) * 0.09
    setVb({ x: b.x - pad, y: b.y - pad, w: b.width + pad * 2, h: b.height + pad * 2 })
  }, [loc])
  if (!shape) return null
  const sw = vb ? vb.w * 0.014 : 1
  return (
    <svg viewBox={vb ? `${vb.x} ${vb.y} ${vb.w} ${vb.h}` : map.viewBox} preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "100%", display: "block", opacity: vb ? 1 : 0 }}>
      <path ref={ref} d={shape.path} fill={fill} stroke={stroke} strokeWidth={stroke ? sw : 0}
        strokeDasharray={dashed ? `${sw * 2.6} ${sw * 1.8}` : undefined} strokeLinejoin="round" />
    </svg>
  )
}

// 2×2 grid of curated flags; `ring` highlights one cell (the impostor).
function FourGrid({ codes, ring, badge }: { codes: string[]; ring?: number; badge?: ReactNode }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 2, background: T.line }}>
        {codes.map((c, i) => (
          <div key={c} style={{ position: "relative", overflow: "hidden" }}>
            {flag(c)}
            {ring === i && <div style={{ position: "absolute", inset: 2, borderRadius: 4, border: `2px solid ${T.danger}` }} />}
          </div>
        ))}
      </div>
      {badge}
    </div>
  )
}

// Two flags head-to-head with a VS seal.
function Versus({ a, b, accent, hero }: { a: string; b: string; accent: string; hero: boolean }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", gap: 2, background: T.line }}>
      <div style={{ flex: 1, overflow: "hidden" }}>{flag(a)}</div>
      <div style={{ flex: 1, overflow: "hidden" }}>{flag(b)}</div>
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: hero ? 34 : 24, height: hero ? 34 : 24, borderRadius: 999, background: accent, color: T.onAccent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontSize: hero ? 13 : 9, boxShadow: `0 2px 8px -2px ${tint(T.text, 0.6)}` }}>VS</div>
    </div>
  )
}

// Three items in sequence with connectors (lineage / timeline).
function FlagRow({ items, accent, hero }: { items: { code?: string; src?: string }[]; accent: string; hero: boolean }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: hero ? 8 : 4, padding: hero ? "0 14px" : "0 7px", background: `radial-gradient(120% 120% at 50% 22%, ${tint(accent, 0.2)}, ${tint(accent, 0.06)})` }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: hero ? 8 : 4, minWidth: 0, flex: 1 }}>
          {i > 0 && <span style={{ flex: "0 0 auto", width: hero ? 12 : 7, height: 2, background: tint(accent, 0.6) }} />}
          <MiniFlag code={it.code} src={it.src} style={{ flex: 1, minWidth: 0 }} />
        </div>
      ))}
    </div>
  )
}

// id → scene. `bleed` scenes get the framed inset stage in the hero variant so
// the flag's edges always show; composed scenes already frame themselves.
function buildArt(id: string, accent: string, hero: boolean): { node: ReactNode; bleed: boolean } {
  const wash = `radial-gradient(120% 120% at 50% 22%, ${tint(accent, 0.22)}, ${tint(accent, 0.07)})`
  const box: CSSProperties = { position: "absolute", inset: 0 }

  switch (id) {
    // ── Daily rituals ──
    case "funfact":
      // The daily fact: a small, tilted Polish flag with a glowing bulb beside
      // it — most of the warm wash stays visible so it reads calm.
      return { bleed: false, node: (
        <div style={{ ...box, background: wash, display: "flex", alignItems: "center", justifyContent: "center", gap: hero ? 16 : 9 }}>
          <span style={{ display: "flex", filter: `drop-shadow(0 0 ${hero ? 8 : 5}px ${tint(T.gold, 0.85)})` }}>
            <LineIcon name="funfact" size={hero ? 34 : 22} color={T.gold} strokeWidth={1.5} />
          </span>
          <MiniFlag code="pl" style={{ width: hero ? "30%" : "38%", transform: "rotate(5deg)" }} />
        </div>
      ) }
    case "flagbracket":
      // A four-flag bracket: Kazakhstan & Iceland vs Canada & Brazil.
      return { bleed: false, node: (
        <div style={{ ...box, background: wash, display: "flex", alignItems: "stretch", padding: hero ? "12px 14px" : "7px 8px", gap: 4 }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "27%" }}>
            <MiniFlag code="kz" /><MiniFlag code="is" />
          </div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ flex: 1, height: "100%" }}>
            {["M0 22 H30 V78 H0", "M30 50 H46", "M100 22 H70 V78 H100", "M70 50 H54"].map(d => (
              <path key={d} d={d} fill="none" stroke={tint(accent, 0.75)} strokeWidth={2} vectorEffect="non-scaling-stroke" />
            ))}
            <circle cx="50" cy="50" r="5" fill={accent} />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "27%" }}>
            <MiniFlag code="ca" /><MiniFlag code="br" />
          </div>
        </div>
      ) }
    case "tierlist":
      // Zoomed S / A tier rows with a cursor dragging Poland into S.
      return { bleed: false, node: (
        <div style={{ ...box, display: "flex", flexDirection: "column", gap: 2, background: T.line }}>
          {[{ k: "S", c: T.gold }, { k: "A", c: T.green }].map(t => (
            <div key={t.k} style={{ flex: 1, display: "flex", background: T.surfaceHi }}>
              <div style={{ width: hero ? 36 : 24, display: "flex", alignItems: "center", justifyContent: "center", background: tint(t.c, 0.3), fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontSize: hero ? 18 : 13, color: T.text }}>{t.k}</div>
            </div>
          ))}
          <div style={{ position: "absolute", left: "46%", top: "18%", width: hero ? "26%" : "32%", transform: "rotate(-7deg)" }}>
            <MiniFlag code="pl" />
            <MousePointer2 size={hero ? 20 : 14} color={T.text} fill={T.surface} strokeWidth={1.7} style={{ position: "absolute", right: -6, bottom: -7 }} />
          </div>
        </div>
      ) }

    // ── One Glance ──
    case "silhouette":
      // A black-and-white American flag, edges visible, floating in the dark.
      return { bleed: false, node: (
        <div style={{ ...box, background: "#10171c", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: hero ? "52%" : "64%", aspectRatio: "3 / 2", borderRadius: 4, overflow: "hidden", border: "1px solid #2c3940", boxShadow: "0 0 18px rgba(0,0,0,0.7)" }}>
            {flag("us", { filter: "grayscale(1) contrast(1.05)" })}
          </div>
        </div>
      ) }
    case "thecrop":
      // Deep zoom into the Vatican flag (SVG source, so it stays crisp).
      return { bleed: true, node: (
        <div style={{ ...box, background: tint(accent, 0.1) }}>
          {flag("va", { transform: `scale(${hero ? 3.2 : 2.8})`, transformOrigin: "62% 58%" })}
        </div>
      ) }
    case "thepeel":
      // A finger scratching dark coating off a flag — the reveal pops.
      return { bleed: true, node: (
        <div style={{ ...box, background: "#22282b" }}>
          <div style={{ position: "absolute", inset: 0, clipPath: "polygon(16% 34%, 44% 18%, 72% 36%, 86% 28%, 80% 60%, 52% 76%, 28% 62%)" }}>
            {flag("br")}
          </div>
          <Pointer size={hero ? 26 : 17} color="#EDE6D4" strokeWidth={1.7} style={{ position: "absolute", right: "16%", top: "20%", transform: "rotate(-14deg)" }} />
        </div>
      ) }
    case "composer":
      // The 3×3 tile board mid-game: two tiles flipped, Mexico underneath.
      return { bleed: true, node: (
        <div style={{ ...box }}>
          {flag("mx")}
          <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr 1fr", gap: 1 }}>
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} style={{ background: [1, 5].includes(i) ? "transparent" : T.surfaceHi, border: `1px solid ${T.line}` }} />
            ))}
          </div>
        </div>
      ) }
    case "buildflag":
      // The French tricolore being assembled — red band still to place.
      return { bleed: false, node: (
        <div style={{ ...box, background: wash, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: hero ? "52%" : "66%", aspectRatio: "3 / 2", display: "flex", gap: 3 }}>
            <div style={{ flex: 1, background: "#0055A4", borderRadius: 3, boxShadow: `0 2px 6px -3px ${tint(T.text, 0.55)}` }} />
            <div style={{ flex: 1, background: "#FFFFFF", borderRadius: 3, border: `1px solid ${T.line}` }} />
            <div style={{ flex: 1, borderRadius: 3, border: `2px dashed ${tint(T.text, 0.45)}` }} />
          </div>
        </div>
      ) }
    case "frankenflag":
      // Top half of one flag stitched to the bottom half of another.
      return { bleed: true, node: (
        <div style={{ ...box }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "50%", overflow: "hidden" }}>
            {flag("de", { height: "200%" })}
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "50%", overflow: "hidden" }}>
            {flag("br", { height: "200%", transform: "translateY(-50%)" })}
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2, marginTop: -1, background: T.surface, opacity: 0.9 }} />
        </div>
      ) }

    // ── Spot It ──
    case "oddoneout":
      // Three Nordic crosses and one impostor, ringed.
      return { bleed: true, node: <FourGrid codes={["dk", "no", "se", "ch"]} ring={3} /> }
    case "lookalikes":
      // Four genuinely confusable tricolores.
      return { bleed: true, node: <FourGrid codes={["ro", "td", "ad", "md"]} /> }
    case "flagdna":
      // A DNA helix and a mystery flag to deduce.
      return { bleed: false, node: (
        <div style={{ ...box, background: wash, display: "flex", alignItems: "center", justifyContent: "center", gap: hero ? 16 : 9 }}>
          <LineIcon name="flagdna" size={hero ? 36 : 24} color={accent} strokeWidth={1.4} />
          <div style={{ width: hero ? "28%" : "36%", aspectRatio: "3 / 2", borderRadius: 4, border: `1.5px dashed ${tint(accent, 0.6)}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontSize: hero ? 22 : 15, color: accent }}>?</div>
        </div>
      ) }
    case "symbolhunt":
      // Four star-bearing flags under the magnifier.
      return { bleed: true, node: (
        <FourGrid codes={["tr", "vn", "ma", "so"]} badge={
          <div style={{ position: "absolute", right: hero ? 10 : 5, bottom: hero ? 8 : 4, color: accent, background: `${T.surface}F0`, borderRadius: 999, padding: hero ? 6 : 4, display: "flex", border: `1px solid ${tint(accent, 0.5)}` }}>
            <LineIcon name="symbolhunt" size={hero ? 20 : 13} color={accent} />
          </div>
        } />
      ) }
    case "flagfamilies":
      // The Nordic cross family, together.
      return { bleed: true, node: <FourGrid codes={["dk", "se", "no", "is"]} /> }

    // ── Cartographer ──
    case "geo":
      // Italy's shape, bright white on deep slate.
      return { bleed: false, node: (
        <div style={{ ...box, background: "#1c2e36", padding: hero ? 8 : 5 }}>
          <MapShape loc="it" fill="#FFFFFF" />
        </div>
      ) }
    case "bordermap":
      // Poland's flag beside its neighbour Czechia, waiting to be filled in.
      return { bleed: false, node: (
        <div style={{ ...box, background: wash, display: "flex", alignItems: "center", justifyContent: "center", gap: hero ? 14 : 8, padding: hero ? 10 : 6 }}>
          <MiniFlag code="pl" style={{ width: "34%" }} />
          <div style={{ width: "34%", height: "78%" }}>
            <MapShape loc="cz" stroke={T.text} dashed />
          </div>
        </div>
      ) }
    case "continentsort":
      // One flag from each corner of the world.
      return { bleed: true, node: <FourGrid codes={["jp", "br", "fr", "za"]} /> }

    // ── Sharp Recall ──
    case "statclash":
      // Largest country vs smallest.
      return { bleed: true, node: <Versus a="ru" b="va" accent={accent} hero={hero} /> }
    case "higherlower":
      return { bleed: true, node: <Versus a="cn" b="in" accent={accent} hero={hero} /> }

    // ── Loremaster ──
    case "realorbot":
      // A Canada that's the wrong colour — clearly a bot's work.
      return { bleed: true, node: (
        <div style={{ ...box, background: tint(accent, 0.1) }}>
          {flag("ca", { filter: "hue-rotate(160deg) saturate(1.4)" })}
          <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,0.07) 3px 4px)" }} />
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: hero ? 40 : 28, height: hero ? 40 : 28, borderRadius: 999, background: `${T.surface}F2`, border: `2px solid ${accent}`, color: accent, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 2px 10px -2px ${tint(T.text, 0.6)}` }}>
            <LineIcon name="realorbot" size={hero ? 24 : 17} color={accent} strokeWidth={1.8} />
          </div>
        </div>
      ) }
    case "deadoralive": {
      // The Soviet flag — the canonical "vanished" flag.
      return { bleed: true, node: (
        <div style={{ ...box, background: "#8a1f1f" }}>
          {urlImg(SOVIET)}
          <div style={{ position: "absolute", right: hero ? 10 : 5, bottom: hero ? 8 : 4, color: T.muted, background: `${T.surface}F0`, borderRadius: 999, padding: hero ? 6 : 4, display: "flex", border: `1px solid ${T.line}` }}>
            <LineIcon name="deadoralive" size={hero ? 18 : 12} color={T.muted} />
          </div>
        </div>
      ) }
    }
    case "timeline":
      // One country, three eras: Russian Empire → Soviet Union → Russia.
      return { bleed: false, node: <FlagRow items={[{ src: RUSSIAN_EMPIRE }, { src: SOVIET }, { code: "ru" }]} accent={accent} hero={hero} /> }
    case "lineage":
      // A real family tree: the Union Jack and its descendants.
      return { bleed: false, node: <FlagRow items={[{ code: "gb" }, { code: "au" }, { code: "nz" }]} accent={accent} hero={hero} /> }

    // ── Curriculum & subdivisions ──
    case "historical":
      // The Holy Roman Empire's eagle banner, lightly aged.
      return { bleed: true, node: (
        <div style={{ ...box, background: "#cdbb93" }}>
          {urlImg(HOLY_ROMAN, { filter: "sepia(0.25)" })}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(130% 130% at 50% 40%, transparent 50%, rgba(60,40,15,0.35))" }} />
        </div>
      ) }
    case "provinceroulette": {
      const src = subUrl("ca-qc") // Quebec
      if (!src) break
      return { bleed: true, node: <div style={{ ...box, background: tint(accent, 0.1) }}>{urlImg(src)}</div> }
    }
    case "substumper": {
      const src = subUrl("us-az") // Arizona
      if (!src) break
      return { bleed: true, node: <div style={{ ...box, background: tint(accent, 0.1) }}>{urlImg(src)}</div> }
    }
    case "identity":
    case "prideroulette":
      return { bleed: true, node: (
        <div style={{ ...box, display: "flex", flexDirection: "column" }}>
          {["#E40303", "#FF8C00", "#FFED00", "#008026", "#004CFF", "#732982"].map(c => (
            <div key={c} style={{ flex: 1, background: c }} />
          ))}
        </div>
      ) }
    case "flags":
    case "flashcards":
      // A fanned stack of cards to learn.
      return { bleed: false, node: (
        <div style={{ ...box, display: "flex", alignItems: "center", justifyContent: "center", background: wash }}>
          <div style={{ position: "relative", width: hero ? "42%" : "58%", aspectRatio: "3 / 2" }}>
            {["us", "jp", "br"].map((c, i) => (
              <div key={c} style={{ position: "absolute", inset: 0, borderRadius: 5, overflow: "hidden", border: `1px solid ${T.surface}`,
                transform: `translate(${(i - 1) * (hero ? 9 : 5)}px, ${(i - 1) * (hero ? 7 : 4)}px) rotate(${(i - 1) * 5}deg)`,
                boxShadow: `0 3px 8px -4px ${tint(T.text, 0.6)}`, zIndex: i }}>{flag(c)}</div>
            ))}
          </div>
        </div>
      ) }
  }

  // Default — the game's own etched glyph on a soft accent wash. Relevant and
  // calm; never a random unrelated flag.
  return { bleed: false, node: (
    <div style={{ ...box, display: "flex", alignItems: "center", justifyContent: "center", background: wash }}>
      <LineIcon name={id} size={hero ? 56 : 32} color={accent} strokeWidth={1.3} />
    </div>
  ) }
}

export function GamePoster({ id, accent, variant = "tile" }:
  { id: string; accent: string; variant?: "tile" | "hero" }) {
  const hero = variant === "hero"
  const { node, bleed } = buildArt(id, accent, hero)
  if (hero && bleed) {
    // Inset stage: the flag art floats framed on the wash, edges fully visible.
    return (
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 120% at 50% 22%, ${tint(accent, 0.18)}, ${tint(accent, 0.06)})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", height: "calc(100% - 18px)", aspectRatio: "3 / 2", borderRadius: 8, overflow: "hidden", border: `1px solid ${T.line}`, boxShadow: `0 4px 14px -6px ${tint(T.text, 0.5)}` }}>
          {node}
        </div>
      </div>
    )
  }
  return <>{node}</>
}
