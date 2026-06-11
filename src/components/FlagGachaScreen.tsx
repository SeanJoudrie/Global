import { useState, useMemo } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"
import { todayString } from "../utils/prng"
import { T, ACCENT, FONT, tint } from "../ui/tokens"
import FlagImage from "./FlagImage"

interface Props { onBack: () => void }

// ── rarity ──────────────────────────────────────────────────────────────────
const LEGENDARY = new Set(["NR", "TV", "KI", "FM", "MH", "PW", "ST", "KM", "VU", "SB", "TO", "WS", "DM", "KN", "VC", "AG", "LC", "GD", "SC", "MV", "BT", "SM", "AD", "MC", "LI", "BN"])
function rarity(code: string): "legendary" | "rare" | "common" {
  if (LEGENDARY.has(code)) return "legendary"
  // deterministic ~28% "rare"
  let h = 0; for (const ch of code) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h % 100 < 28 ? "rare" : "common"
}
const RARITY_COLOR = { legendary: "#F4B740", rare: "#8B7BE8", common: "#7E8DA6" }
const RARITY_LABEL = { legendary: "★ Legendary", rare: "◆ Rare", common: "● Common" }

// Continent grouping for the collection view (completionist sort).
const REGION_ORDER = ["Africa", "Americas", "Asia", "Europe", "Middle East", "Oceania"]
const byContinent = (() => {
  const map = new Map<string, FlagRecord[]>()
  for (const f of FLAGS) { const k = f.region ?? "Other"; (map.get(k) ?? map.set(k, []).get(k)!).push(f) }
  const keys = [...map.keys()].sort((a, b) => {
    const ia = REGION_ORDER.indexOf(a), ib = REGION_ORDER.indexOf(b)
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib)
  })
  return keys.map(k => ({ region: k, flags: [...map.get(k)!].sort((a, b) => a.name.localeCompare(b.name)) }))
})()

// ── persistence ──────────────────────────────────────────────────────────────
const KEY = "globalio_gacha"
interface Save { collected: string[]; xp: number; tokens: number; lastDaily: string; seeded?: boolean }
function load(): Save {
  try {
    const raw = localStorage.getItem(KEY)
    const s: Save = raw ? JSON.parse(raw) : { collected: [], xp: 0, tokens: 0, lastDaily: "", seeded: true }
    // Exactly one free pull per day — it does not stockpile.
    if (s.lastDaily !== todayString()) { s.tokens = 1; s.lastDaily = todayString(); s.seeded = true }
    return s
  } catch { return { collected: [], xp: 0, tokens: 1, lastDaily: todayString(), seeded: true } }
}
function persist(s: Save) { try { localStorage.setItem(KEY, JSON.stringify(s)) } catch { /* ignore */ } }

export default function FlagGachaScreen({ onBack }: Props) {
  const [save, setSave] = useState<Save>(load)
  const [reveal, setReveal] = useState<null | { flag: FlagRecord; dupe: boolean }>(null)
  const [browse, setBrowse] = useState(false)
  const collected = useMemo(() => new Set(save.collected), [save.collected])

  const pull = () => {
    if (save.tokens <= 0) return
    const flag = FLAGS[Math.floor(Math.random() * FLAGS.length)]
    const dupe = collected.has(flag.code)
    const next: Save = {
      ...save,
      tokens: save.tokens - 1,
      xp: save.xp + (dupe ? 15 : 0),
      collected: dupe ? save.collected : [...save.collected, flag.code],
    }
    setSave(next); persist(next); setReveal({ flag, dupe })
  }

  const pct = Math.round((save.collected.length / FLAGS.length) * 100)

  // ── reveal card ──
  if (reveal) {
    const r = rarity(reveal.flag.code)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: T.bg }}>
        <div className="geo-micro" style={{ fontSize: 9, color: RARITY_COLOR[r], marginBottom: 12 }}>{RARITY_LABEL[r]}{reveal.dupe ? " · duplicate" : " · NEW"}</div>
        <div style={{ width: 260, borderRadius: 18, overflow: "hidden", border: `2px solid ${RARITY_COLOR[r]}`, boxShadow: `0 0 40px ${tint(RARITY_COLOR[r], 0.6)}`, background: T.surface, animation: "gachaPop 0.4s cubic-bezier(0.2,1.4,0.4,1)" }}>
          <style>{`@keyframes gachaPop{0%{transform:scale(0.6) rotate(-6deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}`}</style>
          <div style={{ height: 168 }}><FlagImage code={reveal.flag.code} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div>
          <div style={{ padding: "14px 16px" }}>
            <div className="geo-display" style={{ fontWeight: 700, fontSize: 20, color: T.text }}>{reveal.flag.name}</div>
            <div style={{ color: T.muted, fontSize: 11, marginTop: 4, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{reveal.flag.funFact}</div>
          </div>
        </div>
        {reveal.dupe && <div className="geo-mono" style={{ marginTop: 14, fontSize: 12, color: ACCENT.codex }}>+15 XP (already collected)</div>}
        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          {save.tokens > 0
            ? <button onClick={pull} className="geo-tap" style={{ padding: "12px 22px", borderRadius: 12, fontWeight: 700, fontFamily: FONT.display, background: ACCENT.codex, color: T.onAccent }}>Pull again ({save.tokens})</button>
            : <button onClick={() => setReveal(null)} className="geo-tap" style={{ padding: "12px 22px", borderRadius: 12, fontWeight: 700, fontFamily: FONT.display, background: ACCENT.codex, color: T.onAccent }}>Done</button>}
          <button onClick={() => { setReveal(null); setBrowse(true) }} className="geo-tap" style={{ padding: "12px 18px", borderRadius: 12, fontWeight: 600, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>Collection</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: T.bg }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 6px" }}>
        <button onClick={onBack} className="geo-tap" style={{ width: 34, height: 34, borderRadius: 9, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>‹</button>
        <div className="geo-micro" style={{ fontSize: 10, color: T.muted }}>Flag Gacha</div>
        <div style={{ fontFamily: FONT.mono, fontSize: 12, color: ACCENT.codex }}>{save.xp} XP</div>
      </header>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "10px 18px 24px", gap: 16 }}>
        {/* progress */}
        <div style={{ borderRadius: 14, padding: 16, background: T.surface, border: `1px solid ${T.line}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span className="geo-display" style={{ fontWeight: 700, fontSize: 16, color: T.text }}>Collection</span>
            <span style={{ fontFamily: FONT.mono, fontSize: 13, color: ACCENT.codex }}>{save.collected.length}<span style={{ color: T.dim }}>/{FLAGS.length}</span></span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: tint(ACCENT.codex, 0.12), marginTop: 8, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: ACCENT.codex, transition: "width 0.5s" }} />
          </div>
        </div>

        {!browse ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
            <div style={{ width: 130, height: 130, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60, background: tint(ACCENT.codex, 0.1), border: `2px dashed ${tint(ACCENT.codex, 0.4)}` }}>🎁</div>
            {save.tokens > 0 ? (
              <>
                <button onClick={pull} className="geo-tap" style={{ padding: "16px 36px", borderRadius: 14, fontWeight: 700, fontSize: 17, fontFamily: FONT.display, background: ACCENT.codex, color: T.onAccent, boxShadow: `0 8px 26px -8px ${tint(ACCENT.codex, 0.8)}` }}>Pull a flag</button>
                <div className="geo-mono" style={{ fontSize: 11, color: T.muted }}>{save.tokens} pull{save.tokens === 1 ? "" : "s"} available</div>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <div className="geo-display" style={{ fontWeight: 700, fontSize: 16, color: T.text }}>Out of pulls</div>
                <div style={{ color: T.muted, fontSize: 12, marginTop: 4 }}>Come back tomorrow for a free pull.</div>
              </div>
            )}
            <button onClick={() => setBrowse(true)} className="geo-tap" style={{ padding: "10px 18px", borderRadius: 12, fontWeight: 600, fontSize: 13, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>View collection →</button>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <button onClick={() => setBrowse(false)} className="geo-micro geo-tap" style={{ fontSize: 9, color: T.dim, background: "transparent", marginBottom: 10 }}>← back to pulls</button>
            {byContinent.map(group => {
              const haveCount = group.flags.filter(f => collected.has(f.code)).length
              return (
                <div key={group.region} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 7 }}>
                    <span className="geo-display" style={{ fontWeight: 700, fontSize: 13, color: T.text }}>{group.region}</span>
                    <span style={{ fontFamily: FONT.mono, fontSize: 10, color: T.dim }}>{haveCount}/{group.flags.length}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(56px,1fr))", gap: 8 }}>
                    {group.flags.map(f => {
                      const have = collected.has(f.code)
                      const r = rarity(f.code)
                      return (
                        <div key={f.code} title={have ? f.name : "???"} style={{ aspectRatio: "3/2", borderRadius: 6, overflow: "hidden", border: `1px solid ${have ? tint(RARITY_COLOR[r], 0.7) : T.line}`, background: have ? "#fff" : tint(T.muted, 0.08), position: "relative" }}>
                          {have
                            ? <FlagImage code={f.code} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                            : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: T.dim, fontSize: 14 }}>?</div>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
