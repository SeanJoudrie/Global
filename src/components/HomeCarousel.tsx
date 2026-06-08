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
  "There are 195 countries in the world recognised by the United Nations.",
  "The flag of Nepal is the only national flag that is not rectangular.",
  "No two countries have the same flag — each one is legally distinct.",
  "The US flag has been redesigned 27 times as new states joined.",
  "Scotland's national animal is the unicorn.",
  "The Olympic flag's five rings represent the five inhabited continents.",
  "Bhutan's flag is the only one featuring a dragon.",
  "Switzerland and Vatican City are the only countries with square flags.",
  "More than half the world's flags contain the colour blue.",
  "The flag of Cyprus shows a map of the island — unique in the world.",
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

const SLIDE_COLORS = [
  { border: '#8B6CFF', glow: '#8B6CFF22', accent: '#A78BFA' },  // Daily – violet
  { border: '#F59E0B', glow: '#F59E0B18', accent: '#FBBF24' },  // Fact – amber
  { border: '#34D399', glow: '#34D39918', accent: '#6EE7B7' },  // Flag – green
]

export default function HomeCarousel({ onStartDaily, dailyDone, todayScore }: Props) {
  const [idx, setIdx] = useState(0)
  const dragStartX = useRef<number | null>(null)
  const isDragging = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const today = todayString()
  const dailyFact = getDailyFact(today)
  const dailyFlag = getDailyFlag(today)
  const NUM = 3

  const goTo = (i: number) => setIdx(((i % NUM) + NUM) % NUM)

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => setIdx(i => (i + 1) % NUM), 10000)
  }, [])

  useEffect(() => {
    resetTimer()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [resetTimer])

  // Unified drag handling (mouse + touch)
  const handleDragStart = (clientX: number) => {
    dragStartX.current = clientX
    isDragging.current = true
  }

  const handleDragEnd = (clientX: number) => {
    if (!isDragging.current || dragStartX.current === null) return
    const delta = clientX - dragStartX.current
    if (Math.abs(delta) > 40) {
      goTo(delta < 0 ? idx + 1 : idx - 1)
      resetTimer()
    }
    isDragging.current = false
    dragStartX.current = null
  }

  const color = SLIDE_COLORS[idx]

  const slides = [
    // Slide 0 — Daily Game
    <div key="daily" className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#B8A9E0' }}>Today's Challenge</span>
          <h2 className="text-2xl font-black mt-0.5" style={{ color: '#F5F3FF' }}>Daily Game</h2>
        </div>
        <span className="text-3xl">🌍</span>
      </div>
      {dailyDone && todayScore ? (
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-4xl font-black" style={{ color: '#34D399' }}>{todayScore.score}/{todayScore.total}</span>
              <span className="text-sm" style={{ color: '#B8A9E0' }}>correct today</span>
            </div>
            <div className="flex gap-1 mb-2 flex-wrap">
              {todayScore.answers.map((a, i) => <span key={i}>{a === 'correct' ? '🟩' : '🟥'}</span>)}
            </div>
          </div>
          <div className="text-xs" style={{ color: '#B8A9E0' }}>⏰ Next puzzle in {formatCountdown()}</div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between">
          <p className="text-sm" style={{ color: '#B8A9E0' }}>10 flags · confusable distractors · shareable result</p>
          <button onClick={onStartDaily}
            className="w-full py-3 rounded-xl font-bold text-base transition-all active:scale-95 hover:brightness-110"
            style={{ background: 'linear-gradient(135deg,#8B6CFF,#A78BFA)', color: '#fff', boxShadow: '0 4px 20px #8B6CFF55' }}>
            Play Today's Game →
          </button>
        </div>
      )}
    </div>,

    // Slide 1 — Fun Fact
    <div key="fact" className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#B8A9E0' }}>Did You Know?</span>
          <h2 className="text-2xl font-black mt-0.5" style={{ color: '#F5F3FF' }}>Fact of the Day</h2>
        </div>
        <span className="text-3xl">💡</span>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <p className="text-base leading-relaxed" style={{ color: '#F5F3FF' }}>{dailyFact}</p>
        <p className="text-xs mt-2" style={{ color: '#B8A9E0' }}>New fact every day</p>
      </div>
    </div>,

    // Slide 2 — Flag of the Day
    <div key="flagday" className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#B8A9E0' }}>Daily Spotlight</span>
          <h2 className="text-2xl font-black mt-0.5" style={{ color: '#F5F3FF' }}>Flag of the Day</h2>
        </div>
        <span className="text-3xl">🏳️</span>
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <img
          src={dailyFlag.flagUrl}
          alt={dailyFlag.name}
          className="rounded-xl object-cover w-full"
          style={{ height: 110, border: `2px solid ${SLIDE_COLORS[2].border}44` }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <div>
          <div className="font-bold text-base" style={{ color: '#F5F3FF' }}>{dailyFlag.name}
            <span className="ml-2 text-xs font-normal" style={{ color: '#B8A9E0' }}>{dailyFlag.region}</span>
          </div>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: '#B8A9E0' }}>{dailyFlag.funFact}</p>
        </div>
      </div>
    </div>,
  ]

  return (
    <div className="mx-5 mt-2 rounded-2xl overflow-hidden transition-all duration-300"
      style={{ background: '#2D1F52', border: `1px solid ${color.border}66`, boxShadow: `0 0 32px ${color.glow}` }}>

      {/* Slide area — fixed height, no layout shift */}
      <div
        className="p-5 select-none"
        style={{ minHeight: 220, cursor: 'grab' }}
        onMouseDown={e => handleDragStart(e.clientX)}
        onMouseUp={e => handleDragEnd(e.clientX)}
        onMouseLeave={() => { isDragging.current = false; dragStartX.current = null }}
        onTouchStart={e => handleDragStart(e.touches[0].clientX)}
        onTouchEnd={e => handleDragEnd(e.changedTouches[0].clientX)}
      >
        <div style={{ minHeight: 175 }}>
          {slides[idx]}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 pb-4">
        {Array.from({ length: NUM }).map((_, i) => (
          <button key={i} onClick={() => { goTo(i); resetTimer() }}
            className="rounded-full transition-all duration-300"
            style={{ width: i === idx ? 20 : 7, height: 7, background: i === idx ? color.border : '#8B6CFF33' }} />
        ))}
      </div>
    </div>
  )
}
