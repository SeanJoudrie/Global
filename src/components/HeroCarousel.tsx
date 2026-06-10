import { useState, useRef, useEffect, useMemo } from "react"
import type { ReactNode } from "react"
import { FLAGS } from "../data/flags"
import { SUB_FLAGS } from "../data/subdivisions"
import { HISTORICAL_FLAGS } from "../data/historicalFlags"
import { seededRandom, todayString } from "../utils/prng"
import { T, ACCENT, FONT, tint, IS_CARTO } from "../ui/tokens"
import { LineIcon } from "./icons"
import FlagImage from "./FlagImage"

interface Props {
  onNavigate: (screen: string) => void
}

const dayIdx = Math.floor(Date.now() / 86400000)
const CARD_H = 186

interface Featured { id: string; label: string; title: string; sub: string; img: string; accent: string }

function buildFeatured(): Featured {
  const sub = SUB_FLAGS[Math.floor(seededRandom(todayString() + "subfeat")() * SUB_FLAGS.length)]
  const hist = HISTORICAL_FLAGS[Math.floor(seededRandom(todayString() + "histfeat")() * HISTORICAL_FLAGS.length)]
  const pool: Featured[] = [
    { id: "substumper", label: "New Challenge", title: "Subdivision Stumper", sub: `Whose province is this — ${sub.name}?`, img: sub.flagUrl, accent: ACCENT.learn },
    { id: "historical", label: "From the Archive", title: "Historical Flags", sub: `Name a vanished state — ${hist.name}`, img: hist.flagUrl, accent: ACCENT.codex },
    { id: "lineage", label: "Trace the Tree", title: "Lineage", sub: "Follow a flag's family to today's country", img: hist.flagUrl, accent: ACCENT.play },
    { id: "provinceroulette", label: "Spin It", title: "Province Roulette", sub: `Continent → country → ${sub.name}`, img: sub.flagUrl, accent: ACCENT.learn },
  ]
  return pool[dayIdx % pool.length]
}

// A neat, fully-visible flag chip (contain, never zoomed/cropped).
function FlagChip({ code, w, h }: { code: string; w: number; h: number }) {
  return (
    <div style={{ flexShrink: 0, width: w, height: h, borderRadius: 9, overflow: "hidden", border: `1px solid ${T.line}`,
      background: IS_CARTO ? "#FFFFFF" : T.surfaceHi, display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
      <FlagImage code={code} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }} />
    </div>
  )
}

export default function HeroCarousel({ onNavigate }: Props) {
  const fotd = useMemo(() => FLAGS[Math.floor(seededRandom(todayString() + "fotd")() * FLAGS.length)], [])
  const factFlag = useMemo(() => FLAGS[Math.floor(seededRandom(todayString() + "fact")() * FLAGS.length)], [])
  const featured = useMemo(buildFeatured, [])

  const [idx, setIdx] = useState(0)
  const dragX = useRef<number | null>(null)
  const dragging = useRef(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const NUM = 4

  // Auto-advance every 9s; resets when the user interacts.
  const reset = () => {
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => setIdx(i => (i + 1) % NUM), 9000)
  }
  useEffect(() => { reset(); return () => { if (timer.current) clearInterval(timer.current) } }, [])

  const go = (i: number) => { setIdx(((i % NUM) + NUM) % NUM); reset() }
  const onDown = (x: number) => { dragX.current = x; dragging.current = true }
  const onUp = (x: number) => {
    if (!dragging.current || dragX.current === null) return
    const d = x - dragX.current
    if (Math.abs(d) > 40) go(d < 0 ? idx + 1 : idx - 1)
    dragging.current = false; dragX.current = null
  }

  const shellCard = (accent: string, children: ReactNode, onClick: () => void) => (
    <button onClick={onClick} className={IS_CARTO ? "carto-card" : ""}
      style={{
        width: "100%", height: CARD_H, borderRadius: 16, textAlign: "left", position: "relative", overflow: "hidden",
        padding: 16, display: "flex", flexDirection: "column",
        ...(IS_CARTO ? { ["--wash" as string]: tint(accent, 0.4) } : { background: T.surface, border: `1px solid ${tint(accent, 0.4)}`, boxShadow: `0 0 28px ${tint(accent, 0.13)}` }),
      }}>
      {children}
    </button>
  )

  const eyebrow = (text: string, accent: string) => (
    <div className="geo-micro" style={{ fontSize: 9, color: accent, marginBottom: 6 }}>◦ {text}</div>
  )

  const regionChip = (region: string, accent: string) => (
    <span className="geo-micro" style={{ fontSize: 8, color: accent, padding: "3px 8px", borderRadius: 999, background: tint(accent, 0.12), border: `1px solid ${tint(accent, 0.3)}` }}>{region}</span>
  )

  const slides = [
    // 0 — Flag of the Day (small contained flag top-right, fact gets full width)
    shellCard(ACCENT.codex, (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            {eyebrow("Flag of the Day", ACCENT.codex)}
            <div className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 24, lineHeight: 1, letterSpacing: "-0.01em" }}>{fotd.name}</div>
            <div style={{ marginTop: 8 }}>{regionChip(fotd.region, ACCENT.codex)}</div>
          </div>
          <FlagChip code={fotd.code} w={88} h={59} />
        </div>
        <p style={{ marginTop: "auto", fontSize: 11, lineHeight: 1.5, color: T.muted, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{fotd.funFact}</p>
      </div>
    ), () => onNavigate("codex")),

    // 1 — Fun Fact (clean serif, no quotes, not italic; flag chip; roomy)
    shellCard(ACCENT.learn, (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          {eyebrow("Fun Fact", ACCENT.learn)}
          <FlagChip code={factFlag.code} w={62} h={42} />
        </div>
        <p className="geo-display" style={{ color: T.text, fontWeight: 600, fontSize: 14, lineHeight: 1.5, margin: "2px 0 0",
          display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{factFlag.funFact}</p>
        <div className="geo-micro" style={{ marginTop: "auto", fontSize: 8, color: T.muted }}>{factFlag.name} · tap for more</div>
      </div>
    ), () => onNavigate("funfact")),

    // 2 — Featured game (sells a game with a contained image + CTA)
    shellCard(featured.accent, (
      <div style={{ display: "flex", gap: 14, height: "100%" }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          {eyebrow(featured.label, featured.accent)}
          <div className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 20, lineHeight: 1.05 }}>{featured.title}</div>
          <p style={{ marginTop: 6, fontSize: 11.5, lineHeight: 1.5, color: T.muted, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{featured.sub}</p>
          <div style={{ marginTop: "auto", display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 6, padding: "7px 13px", borderRadius: 999, background: featured.accent, color: T.onAccent }}>
            <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 12 }}>Play now</span>
            <span style={{ fontSize: 13 }}>→</span>
          </div>
        </div>
        <div style={{ flexShrink: 0, width: 104, height: "100%", borderRadius: 12, overflow: "hidden", border: `1px solid ${T.line}`, background: IS_CARTO ? "#FFFFFF" : tint(featured.accent, 0.08), display: "flex", alignItems: "center", justifyContent: "center", padding: 6 }}>
          <img src={featured.img} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
            onError={e => { (e.target as HTMLImageElement).style.opacity = "0.25" }} />
        </div>
      </div>
    ), () => onNavigate(featured.id)),

    // 3 — Make it yours (promotes the other look + themes)
    (() => {
      const promo = IS_CARTO
        ? { name: "Tactical Geo-Codex", sw: ["#0A0E16", "#BEF23A", "#27D3DE", "#F5A524"] }
        : { name: "Modern Cartographer", sw: ["#FBF4E4", "#C2735A", "#5C8CA8", "#1F3A3C"] }
      return shellCard(ACCENT.challenge, (
        <div style={{ display: "flex", gap: 14, height: "100%" }}>
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
            {eyebrow("Make It Yours", ACCENT.challenge)}
            <div className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 19, lineHeight: 1.1 }}>Try a different look</div>
            <p style={{ marginTop: 6, fontSize: 11.5, lineHeight: 1.5, color: T.muted }}>Switch the whole vibe — or pick from 8 colour themes. Tap to open Settings.</p>
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", borderRadius: 7, overflow: "hidden", border: `1px solid ${T.line}` }}>
                {promo.sw.map((c, i) => <div key={i} style={{ width: 16, height: 26, background: c }} />)}
              </div>
              <span style={{ fontFamily: FONT.display, fontWeight: 600, fontSize: 12, color: T.text }}>{promo.name} →</span>
            </div>
          </div>
          <div style={{ flexShrink: 0, width: 60, height: "100%", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: tint(ACCENT.challenge, 0.1), border: `1px solid ${tint(ACCENT.challenge, 0.3)}`, color: ACCENT.challenge }}>
            <LineIcon name="settings" size={24} color={ACCENT.challenge} />
          </div>
        </div>
      ), () => onNavigate("settings"))
    })(),
  ]

  const dotAccent = [ACCENT.codex, ACCENT.learn, featured.accent, ACCENT.challenge][idx]

  return (
    <div>
      <div className="select-none" style={{ cursor: "grab", touchAction: "pan-y" }}
        onMouseDown={e => onDown(e.clientX)} onMouseUp={e => onUp(e.clientX)}
        onMouseLeave={() => { dragging.current = false; dragX.current = null }}
        onTouchStart={e => onDown(e.touches[0].clientX)} onTouchEnd={e => onUp(e.changedTouches[0].clientX)}>
        {slides[idx]}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 7, marginTop: 11 }}>
        {Array.from({ length: NUM }).map((_, i) => (
          <button key={i} onClick={() => go(i)}
            style={{ width: i === idx ? 18 : 6, height: 6, borderRadius: 999, padding: 0, border: "none", cursor: "pointer",
              background: i === idx ? dotAccent : T.line, transition: "all 0.3s" }} />
        ))}
      </div>
    </div>
  )
}
