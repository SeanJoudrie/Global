import { FLAGS, REGIONS, getFlagsByRegion } from '../data/flags'
import type { Region } from '../data/flags'
import type { AppState } from '../utils/storage'

interface Props {
  state: AppState
  onBack: () => void
  onStartSet: (setId: string, flags: typeof FLAGS) => void
}

interface FlagSet {
  id: string
  label: string
  emoji: string
  flags: typeof FLAGS
}

function buildSets(): FlagSet[] {
  const sets: FlagSet[] = [
    { id: 'world', label: 'World', emoji: '🌍', flags: FLAGS },
    ...REGIONS.map((r): FlagSet => ({
      id: r.toLowerCase().replace(/\s+/g, '-'),
      label: r,
      emoji: regionEmoji(r),
      flags: getFlagsByRegion(r as Region),
    })),
  ]
  return sets
}

function regionEmoji(r: string): string {
  const map: Record<string, string> = {
    Europe: '🏰', Africa: '🌍', Asia: '🏯', Americas: '🗽', Oceania: '🏄', 'Middle East': '🕌',
  }
  return map[r] ?? '🌐'
}

export default function FlagsScreen({ state, onBack, onStartSet }: Props) {
  const sets = buildSets()

  const progressFor = (_setId: string, flags: typeof FLAGS) => {
    const learned = flags.filter(f => state.learnedFlags.includes(f.code)).length
    return { learned, total: flags.length, pct: flags.length ? Math.round((learned / flags.length) * 100) : 0 }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)' }}>
      <header className="flex items-center gap-3 px-5 pt-8 pb-4">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-all active:scale-90"
          style={{ background: '#2D1F52', color: '#B8A9E0' }}
        >
          ‹
        </button>
        <h1 className="text-2xl font-black" style={{ color: '#F5F3FF' }}>Flag Sets</h1>
      </header>

      <div className="flex-1 px-5 pb-8 space-y-3">
        {sets.map(({ id, label, emoji, flags: setFlags }) => {
          const { learned, total, pct } = progressFor(id, setFlags)
          const hasCrown = state.crowns.includes(id)

          return (
            <button
              key={id}
              onClick={() => onStartSet(id, setFlags)}
              className="w-full flex flex-col gap-3 px-5 py-4 rounded-2xl text-left transition-all active:scale-[0.98] hover:brightness-110"
              style={{ background: '#2D1F52', border: `1px solid ${hasCrown ? '#FBBF2444' : '#8B6CFF33'}` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{emoji}</span>
                  <div>
                    <div className="font-bold text-base" style={{ color: '#F5F3FF' }}>{label}</div>
                    <div className="text-xs" style={{ color: '#B8A9E0' }}>{learned}/{total} flags</div>
                  </div>
                </div>
                {hasCrown ? (
                  <span className="text-2xl animate-crown-pop">👑</span>
                ) : (
                  <span style={{ color: '#8B6CFF' }}>›</span>
                )}
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#1A1033' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    background: hasCrown ? 'linear-gradient(90deg, #FBBF24, #F59E0B)' : 'linear-gradient(90deg, #8B6CFF, #A78BFA)',
                  }}
                />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
