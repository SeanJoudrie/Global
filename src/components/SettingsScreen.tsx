interface Props { onBack: () => void }

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
    name: 'Arctic Teal',
    icon: '🧊',
    bgFrom: '#011C1A', bgTo: '#042E2B',
    cardBg: '#063832', accent: '#14B8A6', accentLight: '#2DD4BF', muted: '#99F6E4',
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

export default function SettingsScreen({ onBack }: Props) {
  const currentId = localStorage.getItem(THEME_STORAGE_KEY) ?? 'space'

  const pick = (id: string) => {
    saveTheme(id)
    // Force re-render by reloading (simplest approach for full-app theme change)
    window.location.reload()
  }

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
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#B8A9E0' }}>Theme</h2>
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
      </div>
    </div>
  )
}
