import type { AppState } from '../utils/storage'
import { FLAGS } from '../data/flags'

interface Props {
  state: AppState
  onBack: () => void
}

const SET_IDS = [
  { id: 'world', label: 'World', emoji: '🌍' },
  { id: 'europe', label: 'Europe', emoji: '🏰' },
  { id: 'africa', label: 'Africa', emoji: '🌍' },
  { id: 'asia', label: 'Asia', emoji: '🏯' },
  { id: 'americas', label: 'Americas', emoji: '🗽' },
  { id: 'oceania', label: 'Oceania', emoji: '🏄' },
  { id: 'middle-east', label: 'Middle East', emoji: '🕌' },
]

export default function AchievementsScreen({ state, onBack }: Props) {
  const totalFlags = FLAGS.length
  const learned = state.learnedFlags.length
  const pct = totalFlags ? Math.round((learned / totalFlags) * 100) : 0

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #1A1033 0%, #2A1A4A 100%)' }}>
      <header className="flex items-center gap-3 px-5 pt-8 pb-4">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full text-xl transition-all active:scale-90"
          style={{ background: '#2D1F52', color: '#B8A9E0' }}
        >
          ‹
        </button>
        <h1 className="text-2xl font-black" style={{ color: '#F5F3FF' }}>Trophy Case</h1>
      </header>

      <div className="flex-1 px-5 pb-8 space-y-4">
        {/* Overall stats */}
        <div className="rounded-2xl p-5" style={{ background: '#2D1F52', border: '1px solid #8B6CFF44' }}>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Flags Learned', value: learned, icon: '🏳️' },
              { label: 'Day Streak', value: state.currentStreak, icon: '🔥' },
              { label: 'Best Streak', value: state.longestStreak, icon: '⭐' },
            ].map(({ label, value, icon }) => (
              <div key={label} className="text-center py-2">
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-2xl font-black" style={{ color: '#F5F3FF' }}>{value}</div>
                <div className="text-xs" style={{ color: '#B8A9E0' }}>{label}</div>
              </div>
            ))}
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#1A1033' }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #8B6CFF, #A78BFA)' }}
            />
          </div>
          <div className="text-xs mt-1 text-right" style={{ color: '#B8A9E0' }}>{pct}% of all flags mastered</div>
        </div>

        {/* Crowns */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#B8A9E0' }}>
            Crowns ({state.crowns.length}/{SET_IDS.length})
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {SET_IDS.map(({ id, label, emoji }) => {
              const earned = state.crowns.includes(id)
              return (
                <div
                  key={id}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: '#2D1F52',
                    border: `1px solid ${earned ? '#FBBF2466' : '#8B6CFF22'}`,
                    opacity: earned ? 1 : 0.45,
                  }}
                >
                  <span className="text-2xl">{earned ? '👑' : '○'}</span>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: earned ? '#FBBF24' : '#B8A9E0' }}>{label}</div>
                    <div className="text-xs" style={{ color: '#B8A9E0' }}>{emoji} Crown</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Daily history */}
        {Object.keys(state.dailyHistory).length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#B8A9E0' }}>Daily History</h2>
            <div className="space-y-2">
              {Object.entries(state.dailyHistory)
                .sort(([a], [b]) => b.localeCompare(a))
                .slice(0, 7)
                .map(([date, result]) => (
                  <div key={date} className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{ background: '#2D1F52', border: '1px solid #8B6CFF22' }}>
                    <div className="text-sm" style={{ color: '#B8A9E0' }}>{date}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {result.answers.map((a, i) => (
                          <span key={i} className="text-sm">{a === 'correct' ? '🟩' : '🟥'}</span>
                        ))}
                      </div>
                      <span className="font-bold text-sm" style={{ color: '#F5F3FF' }}>{result.score}/{result.total}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
