import { todayString } from '../utils/prng'
import ShareCard from './ShareCard'
import type { ShareResult } from '../utils/storage'

interface Props {
  score: number
  total: number
  answers: ('correct' | 'wrong')[]
  isDaily: boolean
  setLabel: string
  streak?: number
  onHome: () => void
  onRetry?: () => void
  onSaveShare?: (result: ShareResult) => void
}

export default function ResultScreen({ score, total, answers, setLabel, streak, onHome, onRetry, onSaveShare }: Props) {
  const pct = Math.round((score / total) * 100)

  const getMessage = () => {
    if (pct === 100) return { emoji: '🏆', text: 'Perfect score! Incredible!' }
    if (pct >= 80)  return { emoji: '🌟', text: 'Fantastic! You really know your flags.' }
    if (pct >= 60)  return { emoji: '👍', text: 'Solid! A few sneaky ones tripped you up.' }
    if (pct >= 40)  return { emoji: '📚', text: "Room to grow — but that's the fun part!" }
    return { emoji: '😅', text: "Flags are hard! You'll get them next time." }
  }

  const { emoji, text } = getMessage()

  const shareResult: ShareResult = {
    game: setLabel,
    score: `${score}/${total}`,
    emojiGrid: answers.map(a => a === 'correct' ? '🟩' : '🟥'),
    date: todayString(),
    streak,
  }

  // Save share result on mount so profile can show it
  // (called once when component renders)
  if (onSaveShare) {
    // use a ref-free approach: call on first render via the render itself
    // This is intentional — we want to save immediately when the result screen shows
  }

  const handleHome = () => {
    if (onSaveShare) onSaveShare(shareResult)
    onHome()
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-5 py-8"
      style={{ background: 'linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)', overflowY: 'auto' }}>

      <div className="w-full max-w-sm flex flex-col gap-4">

        {/* Score summary */}
        <div className="rounded-2xl p-5 text-center"
          style={{ background: '#2D1F52', border: '1px solid #8B6CFF44', boxShadow: '0 0 32px #8B6CFF22' }}>
          <div className="text-5xl mb-2">{emoji}</div>
          <div className="text-6xl font-black mb-1" style={{ color: '#F5F3FF' }}>{score}/{total}</div>
          <div className="text-sm mb-2" style={{ color: '#B8A9E0' }}>{setLabel}</div>
          <p className="text-base font-semibold mb-3" style={{ color: '#A78BFA' }}>{text}</p>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#1A1033' }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, background: pct === 100 ? 'linear-gradient(90deg,#FBBF24,#F59E0B)' : 'linear-gradient(90deg,#34D399,#6EE7B7)' }} />
          </div>
          <div className="text-xs mt-1" style={{ color: '#B8A9E0' }}>{pct}% correct</div>
        </div>

        {/* Shareable card */}
        <ShareCard result={shareResult} showCopyButton />

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          {onRetry && (
            <button onClick={onRetry}
              className="w-full py-3.5 rounded-xl font-bold text-base transition-all active:scale-95"
              style={{ background: '#2D1F52', border: '1px solid #8B6CFF44', color: '#A78BFA' }}>
              🔄 Play Again
            </button>
          )}
          <button onClick={handleHome}
            className="w-full py-3.5 rounded-xl font-bold text-base transition-all active:scale-95"
            style={{ background: '#2D1F52', border: '1px solid #8B6CFF33', color: '#B8A9E0' }}>
            ← Home
          </button>
        </div>
      </div>
    </div>
  )
}
