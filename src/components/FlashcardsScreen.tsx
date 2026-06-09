import { useState, useRef } from 'react'
import { FLAGS, REGIONS, getFlagsByRegion } from '../data/flags'
import type { Region } from '../data/flags'
import { shuffleWithSeed } from '../utils/prng'

interface Props {
  onBack: () => void
  onQuizSet: (flags: typeof FLAGS) => void
}

type Mode = 'menu' | 'learn'

const REGION_OPTS: { label: string; value: 'all' | Region }[] = [
  { label: 'World', value: 'all' },
  ...REGIONS.map(r => ({ label: r, value: r as Region })),
]

const RECENT_KEY = 'globalio_flashcard_recent'
const MAX_RECENT = 5

function loadRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]') } catch { return [] }
}

function saveRecent(codes: string[]) {
  localStorage.setItem(RECENT_KEY, JSON.stringify(codes.slice(0, MAX_RECENT)))
}

function addToRecent(code: string) {
  const prev = loadRecent().filter(c => c !== code)
  saveRecent([code, ...prev])
}

export default function FlashcardsScreen({ onBack, onQuizSet }: Props) {
  const [mode, setMode] = useState<Mode>('menu')
  const [selectedRegion, setSelectedRegion] = useState<'all' | Region>('all')
  const [cardIdx, setCardIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null)
  const [sessionSeed] = useState(() => Date.now().toString())
  const dragStartX = useRef<number | null>(null)
  const isDragging = useRef(false)

  const sourceFlags = selectedRegion === 'all' ? FLAGS : getFlagsByRegion(selectedRegion)

  // Build deck: recent 5 first, then the rest shuffled
  const cards = (() => {
    const recentCodes = loadRecent()
    const recent = recentCodes.map(c => sourceFlags.find(f => f.code === c)).filter(Boolean) as typeof FLAGS
    const rest = shuffleWithSeed(
      sourceFlags.filter(f => !recentCodes.includes(f.code)),
      sessionSeed + selectedRegion
    )
    return [...recent, ...rest]
  })()

  const card = cards[cardIdx % cards.length]

  const advance = (dir: 'left' | 'right') => {
    if (exiting) return
    setExiting(dir)
    setTimeout(() => {
      setCardIdx(i => i + 1)
      setFlipped(false)
      setExiting(null)
    }, 230)
  }

  const handleFlip = () => {
    if (!flipped) {
      // Track this card as recently studied when revealed
      addToRecent(card.code)
    }
    setFlipped(f => !f)
  }

  const handleDragStart = (clientX: number) => {
    dragStartX.current = clientX
    isDragging.current = true
  }

  const handleDragEnd = (clientX: number) => {
    if (!isDragging.current || dragStartX.current === null) return
    const delta = clientX - dragStartX.current
    isDragging.current = false
    dragStartX.current = null
    if (Math.abs(delta) > 50) advance(delta < 0 ? 'left' : 'right')
  }

  const cardStyle = (): React.CSSProperties => {
    if (exiting === 'left') return { transform: 'translateX(-120%) rotate(-12deg)', opacity: 0, transition: 'transform 0.23s ease-in, opacity 0.2s' }
    if (exiting === 'right') return { transform: 'translateX(120%) rotate(12deg)', opacity: 0, transition: 'transform 0.23s ease-in, opacity 0.2s' }
    return { transform: 'translateX(0) rotate(0)', opacity: 1, transition: 'transform 0.15s ease-out' }
  }

  const recentCodes = loadRecent()
  const isRecentCard = recentCodes.includes(card?.code ?? '')
  const relIdx = cardIdx % cards.length

  if (mode === 'menu') {
    const recent = recentCodes.map(c => sourceFlags.find(f => f.code === c)).filter(Boolean) as typeof FLAGS
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)' }}>
        <header className="flex items-center gap-3 px-5 pt-8 pb-4" style={{ zIndex: 1, position: 'relative' }}>
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
            style={{ background: '#2D1F52', color: '#B8A9E0' }}>‹</button>
          <h1 className="text-2xl font-black" style={{ color: '#F5F3FF' }}>Flashcards</h1>
        </header>

        {/* Region filter */}
        <div className="px-5 mb-4" style={{ zIndex: 1, position: 'relative' }}>
          <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#B8A9E0' }}>Region</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {REGION_OPTS.map(opt => (
              <button key={opt.value} onClick={() => setSelectedRegion(opt.value)}
                style={{
                  padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                  border: `1px solid ${selectedRegion === opt.value ? '#8B6CFF' : '#8B6CFF33'}`,
                  background: selectedRegion === opt.value ? '#8B6CFF33' : 'transparent',
                  color: selectedRegion === opt.value ? '#A78BFA' : '#B8A9E0',
                  cursor: 'pointer',
                }}>
                {opt.label}
              </button>
            ))}
          </div>
          <div className="text-xs mt-2" style={{ color: '#B8A9E066' }}>
            {cards.length} flag{cards.length !== 1 ? 's' : ''}{recent.length > 0 ? ` · ${recent.length} recently studied` : ''}
          </div>
        </div>

        {/* Recent flags */}
        {recent.length > 0 && (
          <div className="px-5 mb-4" style={{ zIndex: 1, position: 'relative' }}>
            <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#B8A9E0' }}>
              Recently Studied
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {recent.map(f => (
                <div key={f.code} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <img src={f.flagUrl} alt={f.name}
                    style={{ width: 44, height: 30, objectFit: 'cover', borderRadius: 6, border: '1px solid #8B6CFF33' }}
                    onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
                  <span style={{ fontSize: 8, color: '#B8A9E0', textAlign: 'center', maxWidth: 44, lineHeight: 1.2 }}>{f.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col items-center justify-center px-5 gap-5" style={{ zIndex: 1, position: 'relative' }}>
          <button onClick={() => { setCardIdx(0); setMode('learn') }}
            className="w-full max-w-sm py-4 rounded-2xl font-bold text-lg transition-all active:scale-95"
            style={{ background: 'linear-gradient(135deg,#8B6CFF,#A78BFA)', color: '#fff', boxShadow: '0 4px 20px #8B6CFF55' }}>
            📖 Learn
            <div className="text-xs font-normal mt-0.5 opacity-75">Swipe through flags & facts</div>
          </button>
          <button onClick={() => onQuizSet(cards)}
            className="w-full max-w-sm py-4 rounded-2xl font-bold text-lg transition-all active:scale-95"
            style={{ background: '#2D1F52', border: '1px solid #8B6CFF44', color: '#A78BFA' }}>
            🧠 Quiz Me
            <div className="text-xs font-normal mt-0.5 opacity-75">Test yourself on {cards.length} flags</div>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)' }}>
      <header className="flex items-center gap-3 px-5 pt-8 pb-2" style={{ zIndex: 1, position: 'relative' }}>
        <button onClick={() => setMode('menu')} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: '#2D1F52', color: '#B8A9E0' }}>‹</button>
        <div className="flex-1">
          <h1 className="text-xl font-black" style={{ color: '#F5F3FF' }}>Flashcards</h1>
          <div className="text-xs" style={{ color: '#B8A9E0' }}>
            #{relIdx + 1} / {cards.length} · {selectedRegion === 'all' ? 'World' : selectedRegion}
            {isRecentCard && <span style={{ color: '#FBBF24', marginLeft: 6 }}>⭐ recent</span>}
          </div>
        </div>
      </header>

      {/* Region chips */}
      <div className="px-5 pb-3" style={{ zIndex: 1, position: 'relative' }}>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {REGION_OPTS.map(opt => (
            <button key={opt.value}
              onClick={() => { setSelectedRegion(opt.value); setCardIdx(0); setFlipped(false) }}
              style={{
                padding: '3px 10px', borderRadius: 999, fontSize: 11,
                border: `1px solid ${selectedRegion === opt.value ? '#8B6CFF' : '#8B6CFF22'}`,
                background: selectedRegion === opt.value ? '#8B6CFF33' : 'transparent',
                color: selectedRegion === opt.value ? '#A78BFA' : '#B8A9E066',
                cursor: 'pointer',
              }}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-10" style={{ zIndex: 1, position: 'relative' }}>
        <div style={{ width: '100%', maxWidth: 360, position: 'relative' }}>
          <div className="absolute inset-0 rounded-2xl" style={{ background: '#2D1F52', transform: 'rotate(3deg) scale(0.97) translateY(8px)', opacity: 0.4 }} />
          <div className="absolute inset-0 rounded-2xl" style={{ background: '#2D1F52', transform: 'rotate(-1.5deg) scale(0.985) translateY(4px)', opacity: 0.65 }} />

          <div
            style={{ perspective: 1000, ...cardStyle() }}
            onMouseDown={e => handleDragStart(e.clientX)}
            onMouseUp={e => handleDragEnd(e.clientX)}
            onMouseLeave={() => { isDragging.current = false; dragStartX.current = null }}
            onTouchStart={e => handleDragStart(e.touches[0].clientX)}
            onTouchEnd={e => handleDragEnd(e.changedTouches[0].clientX)}
            onClick={() => !isDragging.current && handleFlip()}
          >
            <div style={{
              position: 'relative', transformStyle: 'preserve-3d',
              transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              cursor: 'pointer', borderRadius: 16, minHeight: 300,
            }}>
              {/* FRONT */}
              <div style={{
                backfaceVisibility: 'hidden', position: flipped ? 'absolute' : 'relative',
                inset: 0, background: '#2D1F52', border: '1px solid #8B6CFF44', borderRadius: 16,
                boxShadow: '0 8px 40px #00000060',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: 24, gap: 16, minHeight: 300,
              }}>
                <img src={card.flagUrl} alt="flag"
                  style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 12, border: '2px solid #8B6CFF33' }}
                  onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden' }} />
                <p style={{ color: '#8B6CFF', fontSize: 14, margin: 0 }}>Tap to reveal · Swipe to skip</p>
              </div>

              {/* BACK */}
              <div style={{
                backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
                position: flipped ? 'relative' : 'absolute', inset: 0,
                background: '#2D1F52', border: '1px solid #A78BFA44', borderRadius: 16,
                boxShadow: '0 8px 40px #00000060', padding: 24, minHeight: 300,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <img src={card.flagUrl} alt={card.name}
                    style={{ width: 56, height: 36, objectFit: 'cover', borderRadius: 6, border: '1.5px solid #8B6CFF33', flexShrink: 0 }}
                    onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden' }} />
                  <div>
                    <div style={{ color: '#F5F3FF', fontWeight: 900, fontSize: 20 }}>{card.name}</div>
                    <div style={{ color: '#8B6CFF', fontSize: 12 }}>{card.region}</div>
                  </div>
                </div>
                <p style={{ color: '#B8A9E0', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{card.funFact}</p>
                {card.distinguishingTip && (
                  <div style={{ background: '#FBBF2411', border: '1px solid #FBBF2433', borderRadius: 10, padding: '10px 12px' }}>
                    <div style={{ color: '#FBBF24', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>💡 How to recognise it</div>
                    <p style={{ color: '#F5F3FF', fontSize: 13, margin: 0 }}>{card.distinguishingTip}</p>
                  </div>
                )}
                <p style={{ color: '#8B6CFF55', fontSize: 12, marginTop: 16, textAlign: 'center' }}>Swipe to next</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 4, marginTop: 24 }}>
          {Array.from({ length: Math.min(7, cards.length) }).map((_, i) => (
            <div key={i} style={{ width: i === relIdx % 7 ? 16 : 6, height: 6, borderRadius: 999,
              background: i === relIdx % 7 ? '#8B6CFF' : '#8B6CFF33', transition: 'all 0.2s' }} />
          ))}
        </div>
      </div>
    </div>
  )
}
