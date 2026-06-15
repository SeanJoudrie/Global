import { useState } from "react"
import { AESTHETIC, saveAesthetic, T, ACCENT, tint } from "../ui/tokens"
import type { Aesthetic } from "../ui/tokens"
import { ScreenHeader } from "./ui"
import { LineIcon } from "./icons"
import { openSupporter } from "../utils/supporterNav"
import { loadState, saveState, setPremium, isSupporter } from "../utils/storage"

interface Props { onBack: () => void; onMegaCodex: () => void; onFlagCheck: () => void }

// Creator unlock — typing the passcode flips on the Supporter flag locally,
// which hides every ad on this device. Reloads so ad components re-read it.
function CreatorUnlock() {
  const [code, setCode] = useState("")
  const [done, setDone] = useState(() => isSupporter())
  const submit = () => {
    if (code.trim().toLowerCase() === "zip") {
      saveState(setPremium(loadState(), true))
      setDone(true)
      location.reload()
    } else {
      setCode("")
    }
  }
  if (done) return (
    <div className="text-xs mt-3 text-center" style={{ color: T.gold }}>✓ ads are off on this device</div>
  )
  return (
    <div className="mt-3 flex gap-2">
      <input
        value={code}
        onChange={e => setCode(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") submit() }}
        placeholder="creator unlock code"
        style={{ flex: 1, minWidth: 0, padding: "9px 12px", borderRadius: 10, fontSize: 13, background: T.surfaceHi, border: `1px solid ${T.line}`, color: T.text, outline: "none" }}
      />
      <button onClick={submit} className="active:scale-95"
        style={{ flexShrink: 0, padding: "9px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700, background: tint(T.gold, 0.14), border: `1px solid ${tint(T.gold, 0.4)}`, color: T.gold }}>
        Unlock
      </button>
    </div>
  )
}

export interface Theme {
  id: string
  name: string
  icon: string
  bgFrom: string
  bgTo: string
  cardBg: string
  accent: string
  accentLight: string
  muted: string
}

export const THEMES: Theme[] = [
  {
    id: 'space',
    name: 'Deep Space',
    icon: '🌌',
    bgFrom: '#1A1033', bgTo: '#2A1A4A',
    cardBg: '#2D1F52', accent: '#8B6CFF', accentLight: '#A78BFA', muted: '#B8A9E0',
  },
  {
    id: 'ocean',
    name: 'Dark Ocean',
    icon: '🌊',
    bgFrom: '#051428', bgTo: '#0D2240',
    cardBg: '#0F2545', accent: '#38BDF8', accentLight: '#7DD3FC', muted: '#93C5FD',
  },
  {
    id: 'forest',
    name: 'Deep Forest',
    icon: '🌲',
    bgFrom: '#071410', bgTo: '#0F2018',
    cardBg: '#122218', accent: '#22C55E', accentLight: '#4ADE80', muted: '#86EFAC',
  },
  {
    id: 'crimson',
    name: 'Crimson',
    icon: '🔥',
    bgFrom: '#1A0808', bgTo: '#2A1010',
    cardBg: '#2D1212', accent: '#F43F5E', accentLight: '#FB7185', muted: '#FCA5A5',
  },
  {
    id: 'teal',
    name: 'Teal & Orange',
    icon: '🪸',
    bgFrom: '#021C1A', bgTo: '#053330',
    cardBg: '#06403A', accent: '#FB8C3C', accentLight: '#FDBA74', muted: '#5EEAD4',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    icon: '🌅',
    bgFrom: '#2A1206', bgTo: '#3D1E0A',
    cardBg: '#3A1E10', accent: '#FB923C', accentLight: '#FDBA74', muted: '#FCD9B0',
  },
  {
    id: 'rose',
    name: 'Rose Quartz',
    icon: '🌸',
    bgFrom: '#240A1A', bgTo: '#3A1029',
    cardBg: '#3A1430', accent: '#F472B6', accentLight: '#F9A8D4', muted: '#FBCFE8',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    icon: '🌃',
    bgFrom: '#070B1A', bgTo: '#0E1530',
    cardBg: '#121A38', accent: '#6366F1', accentLight: '#A5B4FC', muted: '#C7D2FE',
  },
]

export const THEME_STORAGE_KEY = 'globalio_theme'

export function loadTheme(): Theme {
  const id = localStorage.getItem(THEME_STORAGE_KEY) ?? 'space'
  return THEMES.find(t => t.id === id) ?? THEMES[0]
}

export function saveTheme(id: string) {
  localStorage.setItem(THEME_STORAGE_KEY, id)
}

export default function SettingsScreen({ onBack, onMegaCodex, onFlagCheck }: Props) {
  const currentId = localStorage.getItem(THEME_STORAGE_KEY) ?? 'space'
  const currentAesthetic = AESTHETIC

  const pick = (id: string) => {
    saveTheme(id)
    // Force re-render by reloading (simplest approach for full-app theme change)
    window.location.reload()
  }

  const pickAesthetic = (a: Aesthetic) => {
    saveAesthetic(a)
    window.location.reload()
  }

  const AESTHETICS: { id: Aesthetic; name: string; sub: string; swatch: string[] }[] = [
    { id: 'cartographer', name: 'Modern Cartographer', sub: 'Warm parchment archive · serif', swatch: ['#FBF4E4', '#C2735A', '#5C8CA8', '#1F3A3C'] },
    { id: 'tactical', name: 'Tactical Geo-Codex', sub: 'Dark charcoal · electric accents', swatch: ['#0A0E16', '#BEF23A', '#27D3DE', '#F5A524'] },
    { id: 'original', name: 'Original (Beta)', sub: 'The classic purple dashboard & list', swatch: ['#1A1033', '#8B6CFF', '#A78BFA', '#FBBF24'] },
  ]

  return (
    <div className="min-h-screen flex flex-col" style={{ background: T.bg, color: T.text, position: 'relative', zIndex: 1 }}>
      <ScreenHeader title="Settings" subtitle="Aesthetic & themes" onBack={onBack} />

      <div className="px-5 pb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: T.muted }}>Dashboard Aesthetic</h2>
        <div className="grid grid-cols-1 gap-3 mb-8">
          {AESTHETICS.map(a => {
            const active = a.id === currentAesthetic
            return (
              <button key={a.id} onClick={() => pickAesthetic(a.id)}
                className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all active:scale-[0.98] geo-tap"
                style={{
                  background: T.surface,
                  border: `2px solid ${active ? ACCENT.codex : T.line}`,
                  boxShadow: active ? `0 0 0 3px ${tint(ACCENT.codex, 0.15)}` : 'none',
                }}>
                <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: `1px solid ${T.line}`, flexShrink: 0 }}>
                  {a.swatch.map((c, i) => <div key={i} style={{ width: 16, height: 40, background: c }} />)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: T.text, fontWeight: 700, fontSize: 14 }}>{a.name}</div>
                  <div style={{ color: T.muted, fontSize: 11, marginTop: 2 }}>{a.sub}</div>
                </div>
                {active && <div style={{ width: 20, height: 20, borderRadius: '50%', background: ACCENT.codex, color: T.onAccent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</div>}
              </button>
            )
          })}
        </div>

        <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: T.muted }}>Colour Theme</h2>
        {/* The 8 colour themes drive the CSS vars used only by the "original"
            aesthetic — cartographer/tactical ignore them, so hide the picker
            there instead of presenting buttons that do nothing visible. */}
        {AESTHETIC === 'original' ? (
          <div className="grid grid-cols-2 gap-3">
            {THEMES.map(t => {
              const active = t.id === currentId
              return (
                <button
                  key={t.id}
                  onClick={() => pick(t.id)}
                  className="flex flex-col gap-3 p-4 rounded-2xl text-left transition-all active:scale-95"
                  style={{
                    background: `linear-gradient(135deg,${t.bgFrom},${t.bgTo})`,
                    border: `2px solid ${active ? t.accent : t.accent + '33'}`,
                    boxShadow: active ? `0 0 20px ${t.accent}44` : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 24 }}>{t.icon}</span>
                    {active && (
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12,
                      }}>✓</div>
                    )}
                  </div>
                  {/* Color preview row */}
                  <div style={{ display: 'flex', gap: 5 }}>
                    {[t.cardBg, t.accent, t.accentLight, t.muted].map((c, i) => (
                      <div key={i} style={{ flex: 1, height: 8, borderRadius: 999, background: c }} />
                    ))}
                  </div>
                  {/* theme cards preview their own dark palettes, so the label stays light */}
                  <div style={{ color: '#F5F3FF', fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="text-xs" style={{ color: T.muted }}>
            Colour themes apply to the Original look — switch aesthetic above to use them.
          </div>
        )}

        {/* Support Globalio — opens the Supporter screen (reachable even ad-free) */}
        <button onClick={openSupporter}
          className="w-full mt-8 py-3 rounded-xl text-sm font-semibold transition-all active:scale-95 block text-center"
          style={{ background: tint(T.gold, 0.12), border: `1px solid ${tint(T.gold, 0.4)}`, color: T.gold }}>
          <span className="inline-flex items-center justify-center gap-2">💛 Support Globalio</span>
        </button>

        {/* Creator unlock — enter the passcode to turn ads off on this device */}
        <CreatorUnlock />

        {/* Feedback — opens the user's mail app, pre-addressed to the dev */}
        <a href={"mailto:sjoudrie@gmail.com?subject=" + encodeURIComponent("Globalio feedback") + "&body=" + encodeURIComponent("What I love / what I'd change / an idea:\n\n")}
          className="w-full mt-3 py-3 rounded-xl text-sm font-semibold transition-all active:scale-95 block text-center"
          style={{ textDecoration: 'none', background: tint(ACCENT.learn, 0.12), border: `1px solid ${tint(ACCENT.learn, 0.4)}`, color: ACCENT.learn }}>
          <span className="inline-flex items-center justify-center gap-2"><LineIcon name="historical" size={15} color={ACCENT.learn} /> Send feedback or ideas</span>
        </a>
        <div className="text-xs mt-2 text-center" style={{ color: T.muted }}>
          i'm a one-man operation, so i genuinely read every message — thanks for playing, and i'll do my best to make it happen 💛
        </div>

        {/* Legal — required for ad networks & app stores */}
        <div className="text-xs mt-5 text-center" style={{ color: T.dim }}>
          <a href="/privacy.html" target="_blank" rel="noopener" style={{ color: T.muted, textDecoration: 'underline' }}>Privacy Policy</a>
          <span style={{ margin: '0 8px' }}>·</span>
          <a href="/terms.html" target="_blank" rel="noopener" style={{ color: T.muted, textDecoration: 'underline' }}>Terms of Use</a>
        </div>

        {/* secret */}
        <button onClick={onMegaCodex}
          className="w-full mt-8 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95"
          style={{ background: 'transparent', border: `1px dashed ${T.line}`, color: T.dim }}>
          <span className="inline-flex items-center justify-center gap-2"><LineIcon name="codex" size={14} color={T.dim} /> Secret MegaCodex</span>
        </button>

        {/* temporary flag-QA list */}
        <button onClick={onFlagCheck}
          className="w-full mt-3 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95"
          style={{ background: 'transparent', border: `1px dashed ${T.line}`, color: T.dim }}>
          <span className="inline-flex items-center justify-center gap-2"><LineIcon name="flags" size={14} color={T.dim} /> Flag Check (QA)</span>
        </button>
      </div>
    </div>
  )
}
