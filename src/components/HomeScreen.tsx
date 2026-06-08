import type { AppState } from '../utils/storage'
import { todayString } from '../utils/prng'
import EarthLogo from './EarthLogo'

interface Props {
  state: AppState
  onStartDaily: () => void
  onGoFlags: () => void
  onGoAchievements: () => void
}

export default function HomeScreen({ state, onStartDaily, onGoFlags, onGoAchievements }: Props) {
  const today = todayString()
  const dailyDone = state.lastDailyDate === today
  const todayResult = state.dailyHistory[today]

  const msUntilMidnight = () => {
    const now = new Date()
    const midnight = new Date()
    midnight.setHours(24, 0, 0, 0)
    return midnight.getTime() - now.getTime()
  }

  const formatCountdown = () => {
    const ms = msUntilMidnight()
    const h = Math.floor(ms / 3600000)
    const m = Math.floor((ms % 3600000) / 60000)
    return `${h}h ${m}m`
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #1A1033 0%, #2A1A4A 100%)' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <div className="flex items-center gap-2">
          <EarthLogo size={36} />
          <span className="text-xl font-black" style={{ color: '#F5F3FF' }}>Daily Globe</span>
        </div>
        <button
          onClick={onGoAchievements}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all active:scale-95"
          style={{ background: '#2D1F52', color: '#B8A9E0', border: '1px solid #8B6CFF33' }}
        >
          👑 {state.crowns.length}
        </button>
      </header>

      {/* Streak bar */}
      {state.currentStreak > 0 && (
        <div className="mx-5 mb-2 flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
          style={{ background: '#2D1F52', border: '1px solid #FBBF2433' }}>
          <span className="text-lg">🔥</span>
          <span style={{ color: '#FBBF24' }} className="font-bold">{state.currentStreak} day streak</span>
        </div>
      )}

      {/* Daily Game card */}
      <div className="mx-5 mt-2 rounded-2xl p-5 animate-slide-up"
        style={{ background: '#2D1F52', border: '1px solid #8B6CFF44', boxShadow: '0 0 32px #8B6CFF22' }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#B8A9E0' }}>Today's Challenge</span>
            <h2 className="text-2xl font-black mt-0.5" style={{ color: '#F5F3FF' }}>Daily Game</h2>
          </div>
          <span className="text-3xl">🌍</span>
        </div>

        {dailyDone && todayResult ? (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-4xl font-black" style={{ color: '#34D399' }}>
                {todayResult.score}/{todayResult.total}
              </span>
              <span className="text-sm" style={{ color: '#B8A9E0' }}>correct today</span>
            </div>
            <div className="flex gap-1 mb-3">
              {todayResult.answers.map((a, i) => (
                <span key={i} className="text-lg">{a === 'correct' ? '🟩' : '🟥'}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ color: '#B8A9E0' }}>
              <span>⏰ Next in {formatCountdown()}</span>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm mb-4" style={{ color: '#B8A9E0' }}>
              10 flags · confusable distractors · shareable result
            </p>
            <button
              onClick={onStartDaily}
              className="w-full py-3.5 rounded-xl font-bold text-lg transition-all active:scale-95 hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #8B6CFF, #A78BFA)', color: '#fff', boxShadow: '0 4px 20px #8B6CFF55' }}
            >
              Play Today's Game →
            </button>
          </div>
        )}
      </div>

      {/* Section tiles */}
      <div className="mx-5 mt-4 space-y-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#B8A9E0' }}>Practice</h3>

        <button
          onClick={onGoFlags}
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all active:scale-[0.98] hover:brightness-110"
          style={{ background: '#2D1F52', border: '1px solid #8B6CFF33' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏳️</span>
            <div className="text-left">
              <div className="font-bold" style={{ color: '#F5F3FF' }}>Flags</div>
              <div className="text-xs" style={{ color: '#B8A9E0' }}>
                {state.learnedFlags.length} learned · {state.crowns.length} crowns
              </div>
            </div>
          </div>
          <span style={{ color: '#8B6CFF' }}>›</span>
        </button>

        <div
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl opacity-50 cursor-not-allowed"
          style={{ background: '#2D1F52', border: '1px solid #8B6CFF22' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🗺️</span>
            <div className="text-left">
              <div className="font-bold" style={{ color: '#F5F3FF' }}>Geography</div>
              <div className="text-xs" style={{ color: '#B8A9E0' }}>Coming soon</div>
            </div>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: '#8B6CFF22', color: '#8B6CFF' }}>Soon</span>
        </div>

        <div
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl opacity-50 cursor-not-allowed"
          style={{ background: '#2D1F52', border: '1px solid #8B6CFF22' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📜</span>
            <div className="text-left">
              <div className="font-bold" style={{ color: '#F5F3FF' }}>History</div>
              <div className="text-xs" style={{ color: '#B8A9E0' }}>Coming soon</div>
            </div>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: '#8B6CFF22', color: '#8B6CFF' }}>Soon</span>
        </div>
      </div>

      {/* Stats footer */}
      <div className="mx-5 mt-4 mb-8 grid grid-cols-3 gap-3">
        {[
          { label: 'Flags Learned', value: state.learnedFlags.length },
          { label: 'Best Streak', value: `${state.longestStreak}🔥` },
          { label: 'Crowns', value: `${state.crowns.length}👑` },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center py-3 rounded-xl" style={{ background: '#2D1F52' }}>
            <span className="text-xl font-black" style={{ color: '#F5F3FF' }}>{value}</span>
            <span className="text-xs mt-0.5" style={{ color: '#B8A9E0' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
