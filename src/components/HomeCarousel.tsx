import { useState, useEffect, useRef, useCallback } from 'react'
import { FLAGS } from '../data/flags'
import { todayString, seededRandom } from '../utils/prng'
import type { AppState } from '../utils/storage'

interface Props {
  state: AppState
  onStartDaily: () => void
  dailyDone: boolean
  todayScore?: { score: number; total: number; answers: ('correct' | 'wrong')[] }
}

const DAILY_FACTS = [
  "🌍 There are 195 countries in the world recognised by the United Nations.",
  "🏳️ The flag of Nepal is the only national flag that is not rectangular.",
  "🌊 No two countries have the same flag — each one is legally distinct.",
  "⭐ The US flag has been redesigned 27 times as new states joined.",
  "🦁 Scotland's national animal is the unicorn.",
  "🌐 The Olympic flag's five rings represent the five inhabited continents.",
  "🏴 Bhutan's flag is the only one featuring a dragon.",
  "📐 Switzerland and Vatican City are the only countries with square flags.",
  "🔵 More than half the world's flags contain the colour blue.",
  "🌺 The flag of Cyprus shows a map of the island — unique in the world.",
]

function getDailyFact(dateStr: string): string {
  const rng = seededRandom(dateStr + 'fact')
  return DAILY_FACTS[Math.floor(rng() * DAILY_FACTS.length)]
}

function getDailyFlag(dateStr: string) {
  const rng = seededRandom(dateStr + 'flagofday')
  return FLAGS[Math.floor(rng() * FLAGS.length)]
}

function formatCountdown(): string {
  const now = new Date()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  const ms = midnight.getTime() - now.getTime()
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  return `${h}h ${m}m`
}

export default function HomeCarousel({ onStartDaily, dailyDone, todayScore }: Props) {
  const [idx, setIdx] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragDelta, setDragDelta] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const today = todayString()
  const dailyFact = getDailyFact(today)
  const dailyFlag = getDailyFlag(today)

  const NUM = 3

  const next = useCallback(() => setIdx(i => (i + 1) % NUM), [])
  const prev = useCallback(() => setIdx(i => (i - 1 + NUM) % NUM), [])

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(next, 10000)
  }, [next])

  useEffect(() => {
    resetTimer()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [resetTimer])

  const onTouchStart = (e: React.TouchEvent) => {
    setDragging(true)
    setDragStart(e.touches[0].clientX)
    setDragDelta(0)
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return
    setDragDelta(e.touches[0].clientX - dragStart)
  }
  const onTouchEnd = () => {
    if (Math.abs(dragDelta) > 40) {
      if (dragDelta < 0) { next(); resetTimer() } else { prev(); resetTimer() }
    }
    setDragging(false)
    setDragDelta(0)
  }

  const slides = [
    // Slide 0 — Daily Game
    <div key="daily" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#B8A9E0' }}>Today's Challenge</span>
          <h2 className="text-2xl font-black mt-0.5" style={{ color: '#F5F3FF' }}>Daily Game</h2>
        </div>
        <span className="text-3xl">🌍</span>
      </div>
      {dailyDone && todayScore ? (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-4xl font-black" style={{ color: '#34D399' }}>{todayScore.score}/{todayScore.total}</span>
            <span className="text-sm" style={{ color: '#B8A9E0' }}>correct today</span>
          </div>
          <div className="flex gap-1 mb-2">
            {todayScore.answers.map((a, i) => <span key={i}>{a === 'correct' ? '🟩' : '🟥'}</span>)}
          </div>
          <div className="text-xs" style={{ color: '#B8A9E0' }}>⏰ Next in {formatCountdown()}</div>
        </div>
      ) : (
        <div>
          <p className="text-sm mb-4" style={{ color: '#B8A9E0' }}>10 flags · confusable distractors · shareable result</p>
          <button
            onClick={onStartDaily}
            className="w-full py-3 rounded-xl font-bold text-base transition-all active:scale-95 hover:brightness-110"
            style={{ background: 'linear-gradient(135deg,#8B6CFF,#A78BFA)', color: '#fff', boxShadow: '0 4px 20px #8B6CFF55' }}
          >
            Play Today's Game →
          </button>
        </div>
      )}
    </div>,

    // Slide 1 — Fun Fact of the Day
    <div key="fact" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#B8A9E0' }}>Fun Fact</span>
          <h2 className="text-2xl font-black mt-0.5" style={{ color: '#F5F3FF' }}>Fact of the Day</h2>
        </div>
        <span className="text-3xl">💡</span>
      </div>
      <p className="text-base leading-relaxed" style={{ color: '#F5F3FF' }}>{dailyFact}</p>
      <p className="text-xs" style={{ color: '#B8A9E0' }}>New fact every day — come back tomorrow!</p>
    </div>,

    // Slide 2 — Flag of the Day
    <div key="flagday" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#B8A9E0' }}>Daily Spotlight</span>
          <h2 className="text-2xl font-black mt-0.5" style={{ color: '#F5F3FF' }}>Flag of the Day</h2>
        </div>
        <span className="text-3xl">🏳️</span>
      </div>
      <div className="flex gap-3 items-start">
        <img
          src={dailyFlag.flagUrl}
          alt={dailyFlag.name}
          className="rounded-lg object-cover flex-shrink-0"
          style={{ width: 80, height: 50, border: '1.5px solid #8B6CFF44' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <div>
          <div className="font-bold" style={{ color: '#F5F3FF' }}>{dailyFlag.name}</div>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: '#B8A9E0' }}>{dailyFlag.funFact}</p>
        </div>
      </div>
    </div>,
  ]

  return (
    <div
      className="mx-5 mt-2 rounded-2xl overflow-hidden"
      style={{ background: '#2D1F52', border: '1px solid #8B6CFF44', boxShadow: '0 0 32px #8B6CFF22' }}
    >
      {/* Slide area */}
      <div
        className="p-5"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ userSelect: 'none' }}
      >
        {slides[idx]}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 pb-4">
        {Array.from({ length: NUM }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setIdx(i); resetTimer() }}
            className="rounded-full transition-all"
            style={{
              width: i === idx ? 20 : 7,
              height: 7,
              background: i === idx ? '#8B6CFF' : '#8B6CFF44',
            }}
          />
        ))}
      </div>
    </div>
  )
}
