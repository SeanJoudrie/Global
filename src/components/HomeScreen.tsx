import type { AppState } from "../utils/storage"
import { todayString } from "../utils/prng"
import { FLAGS } from "../data/flags"
import EarthLogo from "./EarthLogo"
import HomeCarousel from "./HomeCarousel"

interface Props {
  state: AppState
  onStartDaily: () => void
  onGoFlags: () => void
  onGoAchievements: () => void
  onGoProfile: () => void
  onGoFlashcards: () => void
  onGoLanguage: () => void
  onQuickPlay: () => void
  onGoReverseQuiz: () => void
  onGoCapitalQuiz: () => void
  onGoChallenge: () => void
}

const ComingSoonTile = ({ emoji, label, desc }: { emoji: string; label: string; desc: string }) => (
  <div className="w-full flex items-center justify-between px-5 py-4 rounded-2xl opacity-45 cursor-not-allowed"
    style={{ background: "#2D1F52", border: "1px solid #8B6CFF22" }}>
    <div className="flex items-center gap-3">
      <span className="text-2xl">{emoji}</span>
      <div className="text-left">
        <div className="font-bold" style={{ color: "#F5F3FF" }}>{label}</div>
        <div className="text-xs" style={{ color: "#B8A9E0" }}>{desc}</div>
      </div>
    </div>
    <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
      style={{ background: "#8B6CFF22", color: "#8B6CFF" }}>Soon</span>
  </div>
)

export default function HomeScreen({
  state, onStartDaily, onGoFlags, onGoProfile, onGoFlashcards,
  onGoLanguage, onQuickPlay, onGoReverseQuiz, onGoCapitalQuiz, onGoChallenge,
}: Props) {
  const today = todayString()
  const dailyDone = state.lastDailyDate === today
  const todayResult = state.dailyHistory[today]

  return (
    <div className="min-h-screen flex flex-col" style={{ position: "relative", zIndex: 1 }}>
      <header className="flex items-center justify-between px-5 pt-8 pb-3">
        <div className="flex items-center gap-2">
          <EarthLogo size={34} />
          <span className="text-xl font-black" style={{ color: "#F5F3FF" }}>Globalio</span>
        </div>
        <button onClick={onGoProfile}
          className="w-9 h-9 flex items-center justify-center rounded-full text-lg transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #2D1F52, #3D2A6A)",
            border: "1px solid #8B6CFF44",
          }}>
          👤
        </button>
      </header>

      {state.currentStreak > 0 && (
        <div className="mx-5 mb-2 flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
          style={{
            background: "linear-gradient(135deg, #2D1F52, #3A2460)",
            border: "1px solid #FBBF2444", boxShadow: "0 0 16px #FBBF2418",
          }}>
          <span className="text-lg">🔥</span>
          <span style={{ color: "#FBBF24" }} className="font-bold">{state.currentStreak} day streak</span>
          <span style={{ color: "#B8A9E0" }} className="text-xs ml-auto">best: {state.longestStreak}</span>
        </div>
      )}

      <HomeCarousel state={state} onStartDaily={onStartDaily} dailyDone={dailyDone} todayScore={todayResult} />

      {/* Quick Play */}
      <div className="mx-5 mt-3 mb-2">
        <button onClick={onQuickPlay}
          className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #3D1A7A, #5A2A9A)",
            border: "1px solid #A78BFA55",
            boxShadow: "0 0 20px #8B6CFF22",
          }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div className="text-left">
              <div className="font-bold" style={{ color: "#F5F3FF" }}>Quick Play</div>
              <div className="text-xs" style={{ color: "#C4B5FD" }}>5 random flags · instant start</div>
            </div>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ background: "#8B6CFF33", color: "#A78BFA" }}>Go →</span>
        </button>
      </div>

      <div className="mx-5 mt-2 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Practice</h3>

        <button onClick={onGoFlags}
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all active:scale-[0.98] hover:brightness-110"
          style={{ background: "#2D1F52", border: "1px solid #8B6CFF33" }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚩</span>
            <div className="text-left">
              <div className="font-bold" style={{ color: "#F5F3FF" }}>Flag Sets</div>
              <div className="text-xs" style={{ color: "#B8A9E0" }}>{state.learnedFlags.length}/{FLAGS.length} learned · {state.crowns.length} crowns</div>
            </div>
          </div>
          <span style={{ color: "#8B6CFF" }}>›</span>
        </button>

        <button onClick={onGoReverseQuiz}
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all active:scale-[0.98] hover:brightness-110"
          style={{ background: "#2D1F52", border: "1px solid #8B6CFF33" }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div className="text-left">
              <div className="font-bold" style={{ color: "#F5F3FF" }}>Flag ID Challenge</div>
              <div className="text-xs" style={{ color: "#B8A9E0" }}>See the name, pick the flag</div>
            </div>
          </div>
          <span style={{ color: "#8B6CFF" }}>›</span>
        </button>

        <button onClick={onGoCapitalQuiz}
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all active:scale-[0.98] hover:brightness-110"
          style={{ background: "#2D1F52", border: "1px solid #8B6CFF33" }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏙️</span>
            <div className="text-left">
              <div className="font-bold" style={{ color: "#F5F3FF" }}>Capital Cities</div>
              <div className="text-xs" style={{ color: "#B8A9E0" }}>Name that capital</div>
            </div>
          </div>
          <span style={{ color: "#8B6CFF" }}>›</span>
        </button>

        <button onClick={onGoFlashcards}
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all active:scale-[0.98] hover:brightness-110"
          style={{ background: "#2D1F52", border: "1px solid #8B6CFF33" }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎴</span>
            <div className="text-left">
              <div className="font-bold" style={{ color: "#F5F3FF" }}>Flashcards</div>
              <div className="text-xs" style={{ color: "#B8A9E0" }}>Swipe and learn all {FLAGS.length} flags</div>
            </div>
          </div>
          <span style={{ color: "#8B6CFF" }}>›</span>
        </button>

        <button onClick={onGoLanguage}
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all active:scale-[0.98] hover:brightness-110"
          style={{ background: "#2D1F52", border: "1px solid #F59E0B33" }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌐</span>
            <div className="text-left">
              <div className="font-bold" style={{ color: "#F5F3FF" }}>Guess the Language</div>
              <div className="text-xs" style={{ color: "#B8A9E0" }}>50 languages · 3 difficulties</div>
            </div>
          </div>
          <span style={{ color: "#F59E0B" }}>›</span>
        </button>

        <ComingSoonTile emoji="🗺️" label="Geography" desc="Identify countries by shape" />
        <ComingSoonTile emoji="📜" label="History" desc="Flags through the ages" />

        <h3 className="text-xs font-semibold uppercase tracking-widest pt-1" style={{ color: "#B8A9E0" }}>Challenge</h3>

        <button onClick={onGoChallenge}
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all active:scale-[0.98] hover:brightness-110"
          style={{ background: "#2D1F52", border: "1px solid #FBBF2433" }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div className="text-left">
              <div className="font-bold" style={{ color: "#F5F3FF" }}>Challenge Mode</div>
              <div className="text-xs" style={{ color: "#B8A9E0" }}>States, provinces &amp; regions</div>
            </div>
          </div>
          <span style={{ color: "#FBBF24" }}>›</span>
        </button>
      </div>

      <div className="mx-5 mt-4 mb-8 grid grid-cols-3 gap-3">
        {[
          { label: "Learned", value: state.learnedFlags.length },
          { label: "Best Streak", value: `${state.longestStreak}🔥` },
          { label: "Crowns", value: `${state.crowns.length}👑` },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center py-3 rounded-xl" style={{ background: "#2D1F52" }}>
            <span className="text-xl font-black" style={{ color: "#F5F3FF" }}>{value}</span>
            <span className="text-xs mt-0.5" style={{ color: "#B8A9E0" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
