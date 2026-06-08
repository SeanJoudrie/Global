import type { AppState } from '../utils/storage'
import { todayString } from '../utils/prng'
import { FLAGS } from '../data/flags'
import EarthLogo from './EarthLogo'
import HomeCarousel from './HomeCarousel'

interface Props {
  state: AppState
  onStartDaily: () => void
  onGoFlags: () => void
  onGoAchievements: () => void
  onGoFlashcards: () => void
  onGoLanguage: () => void
}

const ComingSoonTile = ({ emoji, label }: { emoji: string; label: string }) => (
  <div className="w-full flex items-center justify-between px-5 py-4 rounded-2xl opacity-50 cursor-not-allowed"
    style={{ background: '#2D1F52', border: '1px solid #8B6CFF22' }}>
    <div className="flex items-center gap-3">
      <span className="text-2xl">{emoji}</span>
      <div className="text-left">
        <div className="font-bold" style={{ color: '#F5F3FF' }}>{label}</div>
        <div className="text-xs" style={{ color: '#B8A9E0' }}>Coming soon</div>
      </div>
    </div>
    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: '#8B6CFF22', color: '#8B6CFF' }}>Soon</span>
  </div>
)

export default function HomeScreen({ state, onStartDaily, onGoFlags, onGoAchievements, onGoFlashcards, onGoLanguage }: Props) {
  const today = todayString()
  const dailyDone = state.lastDailyDate === today
  const todayResult = state.dailyHistory[today]

  return (
    <div className="min-h-screen flex flex-col" style={{ position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-8 pb-3">
        <div className="flex items-center gap-2">
          <EarthLogo size={34} />
          <span className="text-xl font-black" style={{ color: '#F5F3FF' }}>Globalio</span>
        </div>
        <button onClick={onGoAchievements}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #2D1F52, #3D2A6A)',
            color: '#FBBF24',
            border: '1px solid #FBBF2444',
            boxShadow: '0 0 12px #FBBF2422',
          }}>
          👑 {state.crowns.length}
        </button>
      </header>

      {/* Streak */}
      {state.currentStreak > 0 && (
        <div className="mx-5 mb-2 flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
          style={{
            background: 'linear-gradient(135deg, #2D1F52, #3A2460)',
            border: '1px solid #FBBF2444',
            boxShadow: '0 0 16px #FBBF2418',
          }}>
          <span className="text-lg">🔥</span>
          <span style={{ color: '#FBBF24' }} className="font-bold">{state.currentStreak} day streak</span>
          <span style={{ color: '#B8A9E0' }} className="text-xs ml-auto">best: {state.longestStreak}</span>
        </div>
      )}

      {/* Carousel */}
      <HomeCarousel state={state} onStartDaily={onStartDaily} dailyDone={dailyDone} todayScore={todayResult} />

      {/* Sections */}
      <div className="mx-5 mt-4 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#B8A9E0' }}>Practice</h3>

        {/* Flags */}
        <button onClick={onGoFlags}
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all active:scale-[0.98] hover:brightness-110"
          style={{ background: '#2D1F52', border: '1px solid #8B6CFF33' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏳️</span>
            <div className="text-left">
              <div className="font-bold" style={{ color: '#F5F3FF' }}>Flag Sets</div>
              <div className="text-xs" style={{ color: '#B8A9E0' }}>{state.learnedFlags.length}/{FLAGS.length} learned · {state.crowns.length} crowns</div>
            </div>
          </div>
          <span style={{ color: '#8B6CFF' }}>›</span>
        </button>

        {/* Flashcards */}
        <button onClick={onGoFlashcards}
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all active:scale-[0.98] hover:brightness-110"
          style={{ background: '#2D1F52', border: '1px solid #8B6CFF33' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🃏</span>
            <div className="text-left">
              <div className="font-bold" style={{ color: '#F5F3FF' }}>Flashcards</div>
              <div className="text-xs" style={{ color: '#B8A9E0' }}>Swipe & learn all {FLAGS.length} flags</div>
            </div>
          </div>
          <span style={{ color: '#8B6CFF' }}>›</span>
        </button>

        {/* Language Quiz */}
        <button onClick={onGoLanguage}
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all active:scale-[0.98] hover:brightness-110"
          style={{ background: '#2D1F52', border: '1px solid #F59E0B33' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🗣️</span>
            <div className="text-left">
              <div className="font-bold" style={{ color: '#F5F3FF' }}>Guess the Language</div>
              <div className="text-xs" style={{ color: '#B8A9E0' }}>50 languages · 3 difficulties · Latin toggle</div>
            </div>
          </div>
          <span style={{ color: '#F59E0B' }}>›</span>
        </button>

        {/* Coming Soon */}
        <ComingSoonTile emoji="🗺️" label="Geography" />
        <ComingSoonTile emoji="📜" label="History" />
      </div>

      {/* Stats footer */}
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
