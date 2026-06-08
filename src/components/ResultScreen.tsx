import { generateShareText } from '../utils/quiz'
import { todayString } from '../utils/prng'

interface Props {
  score: number
  total: number
  answers: ('correct' | 'wrong')[]
  isDaily: boolean
  setLabel: string
  onHome: () => void
  onRetry?: () => void
}

export default function ResultScreen({ score, total, answers, isDaily, setLabel, onHome, onRetry }: Props) {
  const pct = Math.round((score / total) * 100)

  const getMessage = () => {
    if (pct === 100) return { emoji: '🏆', text: 'Perfect score! Incredible!' }
    if (pct >= 80) return { emoji: '🌟', text: 'Fantastic! You really know your flags.' }
    if (pct >= 60) return { emoji: '👍', text: 'Solid! A few sneaky ones tripped you up.' }
    if (pct >= 40) return { emoji: '📚', text: 'Room to grow — but that\'s the fun part!' }
    return { emoji: '😅', text: 'Flags are hard! You\'ll get them next time.' }
  }

  const { emoji, text } = getMessage()

  const handleShare = async () => {
    const shareText = generateShareText({ score, total, answers, date: todayString() })
    try {
      await navigator.clipboard.writeText(shareText)
      alert('Copied to clipboard!')
    } catch {
      alert(shareText)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5"
      style={{ background: 'linear-gradient(135deg, #1A1033 0%, #2A1A4A 100%)' }}>

      <div className="w-full max-w-sm animate-slide-up">
        {/* Score card */}
        <div className="rounded-2xl p-6 mb-4 text-center"
          style={{ background: '#2D1F52', border: '1px solid #8B6CFF44', boxShadow: '0 0 32px #8B6CFF22' }}>
          <div className="text-5xl mb-3">{emoji}</div>
          <div className="text-6xl font-black mb-1" style={{ color: '#F5F3FF' }}>{score}/{total}</div>
          <div className="text-sm mb-3" style={{ color: '#B8A9E0' }}>{setLabel}</div>
          <p className="text-base font-semibold mb-4" style={{ color: '#A78BFA' }}>{text}</p>

          {/* Emoji grid */}
          <div className="flex justify-center gap-1 mb-4 flex-wrap">
            {answers.map((a, i) => (
              <span key={i} className="text-xl">{a === 'correct' ? '🟩' : '🟥'}</span>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full overflow-hidden mb-1" style={{ background: '#1A1033' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, background: pct === 100 ? 'linear-gradient(90deg, #FBBF24, #F59E0B)' : 'linear-gradient(90deg, #34D399, #6EE7B7)' }}
            />
          </div>
          <div className="text-xs" style={{ color: '#B8A9E0' }}>{pct}% correct</div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          {isDaily && (
            <button
              onClick={handleShare}
              className="w-full py-3.5 rounded-xl font-bold text-base transition-all active:scale-95 hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #8B6CFF, #A78BFA)', color: '#fff', boxShadow: '0 4px 20px #8B6CFF55' }}
            >
              📋 Share Result
            </button>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full py-3.5 rounded-xl font-bold text-base transition-all active:scale-95"
              style={{ background: '#2D1F52', border: '1px solid #8B6CFF44', color: '#A78BFA' }}
            >
              🔄 Play Again
            </button>
          )}
          <button
            onClick={onHome}
            className="w-full py-3.5 rounded-xl font-bold text-base transition-all active:scale-95"
            style={{ background: '#2D1F52', border: '1px solid #8B6CFF33', color: '#B8A9E0' }}
          >
            ← Home
          </button>
        </div>
      </div>
    </div>
  )
}
