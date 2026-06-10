import { AESTHETIC, saveAesthetic } from "../ui/tokens"
import type { Aesthetic } from "../ui/tokens"

interface Props { onBack: () => void; onMegaCodex: () => void }

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

export default function SettingsScreen({ onBack, onMegaCodex }: Props) {
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
    <div className="min-h-screen flex flex-col" style={{
      background: 'linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)',
      position: 'relative', zIndex: 1,
    }}>
      <header className="flex items-center gap-3 px-5 pt-8 pb-6">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: '#2D1F52', color: '#B8A9E0' }}>‹</button>
        <h1 className="text-2xl font-black" style={{ color: '#F5F3FF' }}>Settings</h1>
      </header>

      <div className="px-5">
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#B8A9E0' }}>Dashboard Aesthetic</h2>
        <div className="grid grid-cols-1 gap-3 mb-8">
          {AESTHETICS.map(a => {
            const active = a.id === currentAesthetic
            return (
              <button key={a.id} onClick={() => pickAesthetic(a.id)}
                className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all active:scale-[0.98]"
                style={{ background: '#2D1F52', border: `2px solid ${active ? '#A78BFA' : '#8B6CFF33'}`, boxShadow: active ? '0 0 20px #8B6CFF33' : 'none' }}>
                <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1px solid #00000033', flexShrink: 0 }}>
                  {a.swatch.map((c, i) => <div key={i} style={{ width: 16, height: 40, background: c }} />)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#F5F3FF', fontWeight: 700, fontSize: 14 }}>{a.name}</div>
                  <div style={{ color: '#B8A9E0', fontSize: 11, marginTop: 2 }}>{a.sub}</div>
                </div>
                {active && <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#A78BFA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</div>}
              </button>
            )
          })}
        </div>

        <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#B8A9E0' }}>Colour Theme</h2>
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
                <div style={{ color: '#F5F3FF', fontWeight: 700, fontSize: 14 }}>{t.name}</div>
              </button>
            )
          })}
        </div>

        {/* secret */}
        <button onClick={onMegaCodex}
          className="w-full mt-8 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95"
          style={{ background: 'transparent', border: '1px dashed #8B6CFF22', color: '#8B6CFF55' }}>
          🌈 Mega Codex
        </button>
      </div>
    </div>
  )
}
