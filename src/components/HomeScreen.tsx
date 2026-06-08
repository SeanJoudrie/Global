import type { AppState } from '../utils/storage'
import { todayString } from '../utils/prng'
import EarthLogo from './EarthLogo'
import HomeCarousel from './HomeCarousel'

interface Props {
  state: AppState
  onStartDaily: () => void
  onGoFlags: () => void
  onGoAchievements: () => void
  onGoFlashcards: () => void
}

export default function HomeScreen({ state, onStartDaily, onGoFlags, onGoAchievements, onGoFlashcards }: Props) {
  const today = todayString()
  const dailyDone = state.lastDailyDate === today
  const todayResult = state.dailyHistory[today]

  return (
    <div className="min-h-screen flex flex-col relative" style={{ zIndex: 1 }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-8 pb-3">
        <div className="flex items-center gap-2">
          <EarthLogo size={34} />
          <span className="text-xl font-black" style={{ color: '#F5F3FF' }}>Globalio</span>
        </div>
        <button
          onClick={onGoAchievements}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all active:scale-95"
          style={{ background: '#2D1F52', color: '#B8A9E0', border: '1px solid #8B6CFF33' }}
        >
          👑 {state.crowns.length}
        </button>
      </header>

      {/* Streak */}
      {state.currentStreak > 0 && (
        <div className="mx-5 mb-2 flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
          style={{ background: '#2D1F52', border: '1px solid #FBBF2433' }}>
          <span className="text-lg">🔥</span>
          <span style={{ color: '#FBBF24' }} className="font-bold">{state.currentStreak} day streak</span>
        </div>
      )}

      {/* Carousel */}
      <HomeCarousel
        state={state}
        onStartDaily={onStartDaily}
        dailyDone={dailyDone}
        todayScore={todayResult}
      />

      {/* Section tiles */}
      <div className="mx-5 mt-4 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#B8A9E0' }}>Practice</h3>

        <button onClick={onGoFlags}
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all active:scale-[0.98]"
          style={{ background: '#2D1F52', border: '1px solid #8B6CFF33' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏳️</span>
            <div className="text-left">
              <div className="font-bold" style={{ color: '#F5F3FF' }}>Flag Sets</div>
              <div className="text-xs" style={{ color: '#B8A9E0' }}>{state.learnedFlags.length} learned · {state.crowns.length} crowns</div>
            </div>
          </div>
          <span style={{ color: '#8B6CFF' }}>›</span>
        </button>

        <button onClick={onGoFlashcards}
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all active:scale-[0.98]"
          style={{ background: '#2D1F52', border: '1px solid #8B6CFF33' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🃏</span>
            <div className="text-left">
              <div className="font-bold" style={{ color: '#F5F3FF' }}>Flashcards</div>
              <div className="text-xs" style={{ color: '#B8A9E0' }}>Swipe through all {195} flags</div>
            </div>
          </div>
          <span style={{ color: '#8B6CFF' }}>›</span>
        </button>

        <div className="opacity-50 cursor-not-allowed w-full flex items-center justify-between px-5 py-4 rounded-2xl"
          style={{ background: '#2D1F52', border: '1px solid #8B6CFF22' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🗺️</span>
            <div className="text-left">
              <div className="font-bold" style={{ color: '#F5F3FF' }}>Geography</div>
              <div className="text-xs" style={{ color: '#B8A9E0' }}>Coming soon</div>
            </div>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: '#8B6CFF22', color: '#8B6CFF' }}>Soon</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-5 mt-4 mb-8 grid grid-cols-3 gap-3">
        {[
          { label: 'Learned', value: state.learnedFlags.length },
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
