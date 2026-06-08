import { useState } from 'react'
import { FLAGS } from '../data/flags'
import { shuffleWithSeed, todayString } from '../utils/prng'

interface Props {
  onBack: () => void
  onQuizSet: (flags: typeof FLAGS) => void
}

type Mode = 'menu' | 'learn'

export default function FlashcardsScreen({ onBack, onQuizSet }: Props) {
  const [mode, setMode] = useState<Mode>('menu')
  const [cardIdx, setCardIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragDelta, setDragDelta] = useState(0)
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null)

  const cards = shuffleWithSeed(FLAGS, todayString() + 'flashcards')

  const card = cards[cardIdx % cards.length]

  const advance = (dir: 'left' | 'right') => {
    setExiting(dir)
    setTimeout(() => {
      setCardIdx(i => i + 1)
      setFlipped(false)
      setExiting(null)
    }, 220)
  }

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
    if (Math.abs(dragDelta) > 60) {
      advance(dragDelta < 0 ? 'left' : 'right')
    }
    setDragging(false)
    setDragDelta(0)
  }

  const cardTransform = () => {
    if (exiting === 'left') return 'translateX(-110%) rotate(-8deg)'
    if (exiting === 'right') return 'translateX(110%) rotate(8deg)'
    if (dragging && Math.abs(dragDelta) > 10) return `translateX(${dragDelta * 0.4}px) rotate(${dragDelta * 0.03}deg)`
    return 'translateX(0) rotate(0)'
  }

  if (mode === 'menu') {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,#1A1033 0%,#2A1A4A 100%)' }}>
        <header className="flex items-center gap-3 px-5 pt-8 pb-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
            style={{ background: '#2D1F52', color: '#B8A9E0' }}>‹</button>
          <h1 className="text-2xl font-black" style={{ color: '#F5F3FF' }}>Flashcards</h1>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-5 gap-5">
          <div className="text-6xl mb-2">🃏</div>
          <div className="text-center mb-6">
            <p className="text-base" style={{ color: '#B8A9E0' }}>
              Swipe through {FLAGS.length} flags from around the world
            </p>
          </div>

          <button
            onClick={() => setMode('learn')}
            className="w-full max-w-sm py-4 rounded-2xl font-bold text-lg transition-all active:scale-95"
            style={{ background: 'linear-gradient(135deg,#8B6CFF,#A78BFA)', color: '#fff', boxShadow: '0 4px 20px #8B6CFF55' }}
          >
            📖 Learn
            <div className="text-xs font-normal mt-0.5 opacity-75">Swipe through flags & facts</div>
          </button>

          <button
            onClick={() => onQuizSet(FLAGS)}
            className="w-full max-w-sm py-4 rounded-2xl font-bold text-lg transition-all active:scale-95"
            style={{ background: '#2D1F52', border: '1px solid #8B6CFF44', color: '#A78BFA' }}
          >
            🧠 Quiz Me
            <div className="text-xs font-normal mt-0.5 opacity-75">Test yourself on all flags</div>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,#1A1033 0%,#2A1A4A 100%)' }}>
      <header className="flex items-center gap-3 px-5 pt-8 pb-4">
        <button onClick={() => setMode('menu')} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: '#2D1F52', color: '#B8A9E0' }}>‹</button>
        <div className="flex-1">
          <h1 className="text-xl font-black" style={{ color: '#F5F3FF' }}>Flashcards</h1>
          <div className="text-xs" style={{ color: '#B8A9E0' }}>#{(cardIdx % cards.length) + 1} of {cards.length} · swipe to continue</div>
        </div>
      </header>

      {/* Card stack hint */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-10">
        {/* Background cards for depth */}
        <div className="relative" style={{ width: '100%', maxWidth: 360 }}>
          <div className="absolute inset-0 rounded-2xl" style={{ background: '#2D1F52', transform: 'rotate(3deg) scale(0.97)', top: 8, opacity: 0.5 }} />
          <div className="absolute inset-0 rounded-2xl" style={{ background: '#2D1F52', transform: 'rotate(-1.5deg) scale(0.98)', top: 4, opacity: 0.7 }} />

          {/* Main card */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: '#2D1F52',
              border: '1px solid #8B6CFF44',
              boxShadow: '0 8px 40px #00000060',
              transform: cardTransform(),
              transition: exiting ? 'transform 0.22s ease-in, opacity 0.22s' : dragging ? 'none' : 'transform 0.15s ease-out',
              opacity: exiting ? 0 : 1,
              cursor: 'grab',
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onClick={() => !dragging && setFlipped(f => !f)}
          >
            {/* Flag image */}
            <div className="flex items-center justify-center p-6 pb-4">
              <img
                src={card.flagUrl}
                alt={card.name}
                className="rounded-xl object-cover"
                style={{ width: '100%', height: 180, border: '2px solid #8B6CFF33' }}
                onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden' }}
              />
            </div>

            {/* Info */}
            <div className="px-5 pb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-black" style={{ color: '#F5F3FF' }}>{card.name}</h2>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: '#8B6CFF22', color: '#A78BFA' }}>{card.region}</span>
              </div>

              {flipped ? (
                <div className="animate-slide-up">
                  <p className="text-sm leading-relaxed mb-3" style={{ color: '#B8A9E0' }}>{card.funFact}</p>
                  {card.distinguishingTip && (
                    <div className="px-3 py-2 rounded-lg" style={{ background: '#FBBF2411', border: '1px solid #FBBF2433' }}>
                      <div className="text-xs font-semibold mb-1" style={{ color: '#FBBF24' }}>💡 How to recognise it</div>
                      <p className="text-xs" style={{ color: '#F5F3FF' }}>{card.distinguishingTip}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm" style={{ color: '#8B6CFF' }}>Tap to reveal facts · Swipe to next</p>
              )}
            </div>
          </div>
        </div>

        {/* Swipe hint buttons */}
        <div className="flex gap-6 mt-8">
          <button onClick={() => advance('right')} className="w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all active:scale-90"
            style={{ background: '#2D1F52', border: '1px solid #8B6CFF33' }}>←</button>
          <button onClick={() => setFlipped(f => !f)} className="px-6 h-14 rounded-full flex items-center justify-center font-semibold text-sm transition-all active:scale-90"
            style={{ background: '#8B6CFF', color: '#fff' }}>
            {flipped ? 'Hide' : 'Reveal'}
          </button>
          <button onClick={() => advance('left')} className="w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all active:scale-90"
            style={{ background: '#2D1F52', border: '1px solid #8B6CFF33' }}>→</button>
        </div>
      </div>
    </div>
  )
}
