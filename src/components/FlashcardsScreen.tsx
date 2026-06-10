import { useState, useRef } from 'react'
import { FLAGS, REGIONS, getFlagsByRegion } from '../data/flags'
import type { Region } from '../data/flags'
import { CHALLENGE_CONTINENTS } from '../data/challenges'
import { shuffleWithSeed } from '../utils/prng'

interface Props {
  onBack: () => void
  onQuizSet: (flags: typeof FLAGS) => void
}

type Mode = 'menu' | 'learn'
type DeckType = 'countries' | 'subdivisions'

// A unified card used by the flip view, built from either a country flag or a subdivision flag.
interface StudyCard {
  key: string
  flagUrl: string
  name: string
  subtitle: string
  funFact?: string
  tip?: string
}

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

// Countries (per continent) that actually have at least one subdivision flag to study.
function countriesWithSubFlags(continentId: string) {
  const cont = CHALLENGE_CONTINENTS.find(c => c.id === continentId)
  if (!cont) return []
  return cont.countries.filter(c => c.subRegions.some(s => s.flagUrl))
}

export default function FlashcardsScreen({ onBack, onQuizSet }: Props) {
  const [mode, setMode] = useState<Mode>('menu')
  const [deckType, setDeckType] = useState<DeckType>('countries')
  const [selectedRegion, setSelectedRegion] = useState<'all' | Region>('all')
  const [subContinent, setSubContinent] = useState<string | null>(null)
  const [subCountry, setSubCountry] = useState<{ code: string; name: string } | null>(null)
  const [cardIdx, setCardIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null)
  const [sessionSeed] = useState(() => Date.now().toString())
  const dragStartX = useRef<number | null>(null)
  const isDragging = useRef(false)

  // ── Build the active deck of StudyCards ────────────────────────────────────
  const sourceFlags = selectedRegion === 'all' ? FLAGS : getFlagsByRegion(selectedRegion)

  const countryCards: StudyCard[] = (() => {
    const recentCodes = loadRecent()
    const recent = recentCodes.map(c => sourceFlags.find(f => f.code === c)).filter(Boolean) as typeof FLAGS
    const rest = shuffleWithSeed(
      sourceFlags.filter(f => !recentCodes.includes(f.code)),
      sessionSeed + selectedRegion
    )
    return [...recent, ...rest].map(f => ({
      key: f.code, flagUrl: f.flagUrl, name: f.name, subtitle: f.region,
      funFact: f.funFact, tip: f.distinguishingTip,
    }))
  })()

  const subdivisionCards: StudyCard[] = (() => {
    if (!subContinent || !subCountry) return []
    const cont = CHALLENGE_CONTINENTS.find(c => c.id === subContinent)
    const country = cont?.countries.find(c => c.code === subCountry.code)
    if (!country) return []
    const withFlags = country.subRegions.filter(s => s.flagUrl)
    return shuffleWithSeed(withFlags, sessionSeed + subCountry.code).map(s => ({
      key: s.code, flagUrl: s.flagUrl!, name: s.name,
      subtitle: s.group ? `${country.name} · ${s.group}` : country.name,
    }))
  })()

  const cards = deckType === 'countries' ? countryCards : subdivisionCards
  const card = cards.length > 0 ? cards[cardIdx % cards.length] : undefined
  const relIdx = cards.length > 0 ? cardIdx % cards.length : 0

  const advance = (dir: 'left' | 'right') => {
    if (exiting || cards.length === 0) return
    setExiting(dir)
    setTimeout(() => { setCardIdx(i => i + 1); setFlipped(false); setExiting(null) }, 230)
  }
  const goPrev = () => {
    if (exiting || cards.length === 0) return
    setExiting('right')
    setTimeout(() => { setCardIdx(i => (i <= 0 ? cards.length - 1 : i - 1)); setFlipped(false); setExiting(null) }, 230)
  }

  const handleFlip = () => {
    if (!card) return
    if (!flipped && deckType === 'countries') addToRecent(card.key)
    setFlipped(f => !f)
  }

  const handleDragStart = (clientX: number) => { dragStartX.current = clientX; isDragging.current = true }
  const handleDragEnd = (clientX: number) => {
    if (!isDragging.current || dragStartX.current === null) return
    const delta = clientX - dragStartX.current
    isDragging.current = false
    dragStartX.current = null
    // Swipe left → next card; swipe right → go back to the previous one.
    if (Math.abs(delta) > 50) {
      if (delta < 0) advance('left')
      else goPrev()
    }
  }

  const cardStyle = (): React.CSSProperties => {
    if (exiting === 'left') return { transform: 'translateX(-120%) rotate(-12deg)', opacity: 0, transition: 'transform 0.23s ease-in, opacity 0.2s' }
    if (exiting === 'right') return { transform: 'translateX(120%) rotate(12deg)', opacity: 0, transition: 'transform 0.23s ease-in, opacity 0.2s' }
    return { transform: 'translateX(0) rotate(0)', opacity: 1, transition: 'transform 0.15s ease-out' }
  }

  const startLearn = () => { setCardIdx(0); setFlipped(false); setMode('learn') }

  // ── MENU ───────────────────────────────────────────────────────────────────
  if (mode === 'menu') {
    const recentCodes = loadRecent()
    const recent = recentCodes.map(c => sourceFlags.find(f => f.code === c)).filter(Boolean) as typeof FLAGS

    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)' }}>
        <header className="flex items-center gap-3 px-5 pt-8 pb-4" style={{ zIndex: 1, position: 'relative' }}>
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
            style={{ background: '#2D1F52', color: '#B8A9E0' }}>‹</button>
          <h1 className="text-2xl font-black" style={{ color: '#F5F3FF' }}>Flashcards</h1>
        </header>

        {/* Deck type tabs */}
        <div className="px-5 mb-4" style={{ zIndex: 1, position: 'relative' }}>
          <div style={{ display: 'flex', gap: 8, background: '#2D1F52', padding: 4, borderRadius: 14 }}>
            {(['countries', 'subdivisions'] as DeckType[]).map(t => (
              <button key={t} onClick={() => setDeckType(t)}
                style={{
                  flex: 1, padding: '8px 0', borderRadius: 10, fontSize: 13, fontWeight: 700,
                  border: 'none', cursor: 'pointer',
                  background: deckType === t ? 'linear-gradient(135deg,#8B6CFF,#A78BFA)' : 'transparent',
                  color: deckType === t ? '#fff' : '#B8A9E0',
                }}>
                {t === 'countries' ? '🏳️ Countries' : '📍 Subdivisions'}
              </button>
            ))}
          </div>
        </div>

        {deckType === 'countries' ? (
          <>
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
                      color: selectedRegion === opt.value ? '#A78BFA' : '#B8A9E0', cursor: 'pointer',
                    }}>
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="text-xs mt-2" style={{ color: '#B8A9E066' }}>
                {countryCards.length} flag{countryCards.length !== 1 ? 's' : ''}{recent.length > 0 ? ` · ${recent.length} recently studied` : ''}
              </div>
            </div>

            {recent.length > 0 && (
              <div className="px-5 mb-4" style={{ zIndex: 1, position: 'relative' }}>
                <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#B8A9E0' }}>Recently Studied</div>
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
              <button onClick={startLearn}
                className="w-full max-w-sm py-4 rounded-2xl font-bold text-lg transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg,#8B6CFF,#A78BFA)', color: '#fff', boxShadow: '0 4px 20px #8B6CFF55' }}>
                📖 Learn
                <div className="text-xs font-normal mt-0.5 opacity-75">Swipe through flags & facts</div>
              </button>
              <button onClick={() => onQuizSet(sourceFlags)}
                className="w-full max-w-sm py-4 rounded-2xl font-bold text-lg transition-all active:scale-95"
                style={{ background: '#2D1F52', border: '1px solid #8B6CFF44', color: '#A78BFA' }}>
                🧠 Quiz Me
                <div className="text-xs font-normal mt-0.5 opacity-75">Test yourself on {countryCards.length} flags</div>
              </button>
            </div>
          </>
        ) : (
          /* ── Subdivisions browser: continent → country ── */
          <div className="flex-1 px-5 overflow-y-auto" style={{ zIndex: 1, position: 'relative' }}>
            <div className="text-xs mb-3" style={{ color: '#B8A9E066' }}>
              Pick a continent, then a country to study its subdivision flags. Only countries with subdivision flags are shown.
            </div>
            <div className="space-y-2 pb-10">
              {CHALLENGE_CONTINENTS.map(cont => {
                const eligible = countriesWithSubFlags(cont.id)
                if (eligible.length === 0) return null
                const open = subContinent === cont.id
                return (
                  <div key={cont.id} style={{ background: '#2D1F52', borderRadius: 14, border: '1px solid #8B6CFF22', overflow: 'hidden' }}>
                    <button onClick={() => setSubContinent(open ? null : cont.id)}
                      className="w-full flex items-center justify-between px-4 py-3"
                      style={{ background: 'transparent', cursor: 'pointer' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 20 }}>{cont.emoji}</span>
                        <span style={{ fontWeight: 800, color: '#F5F3FF' }}>{cont.name}</span>
                        <span style={{ fontSize: 11, color: '#B8A9E0' }}>{eligible.length} countries</span>
                      </span>
                      <span style={{ color: '#A78BFA', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>›</span>
                    </button>
                    {open && (
                      <div style={{ padding: '0 10px 10px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {eligible.map(c => {
                          const n = c.subRegions.filter(s => s.flagUrl).length
                          return (
                            <button key={c.code}
                              onClick={() => { setSubCountry({ code: c.code, name: c.name }); setCardIdx(0); setFlipped(false); setMode('learn') }}
                              style={{
                                display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 999,
                                background: '#1A1033', border: '1px solid #8B6CFF33', color: '#F5F3FF',
                                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                              }}>
                              <span>{c.emoji}</span>{c.name}
                              <span style={{ fontSize: 10, color: '#8B6CFF' }}>{n}</span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── LEARN ──────────────────────────────────────────────────────────────────
  if (!card) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5 gap-4"
        style={{ background: 'linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)' }}>
        <p style={{ color: '#B8A9E0' }}>No flags to study here yet.</p>
        <button onClick={() => setMode('menu')} className="px-6 py-3 rounded-2xl font-bold"
          style={{ background: '#2D1F52', border: '1px solid #8B6CFF44', color: '#A78BFA' }}>‹ Back</button>
      </div>
    )
  }

  const headerSub = deckType === 'countries'
    ? (selectedRegion === 'all' ? 'World' : selectedRegion)
    : (subCountry?.name ?? '')

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)' }}>
      <header className="flex items-center gap-3 px-5 pt-8 pb-2" style={{ zIndex: 1, position: 'relative' }}>
        <button onClick={() => setMode('menu')} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: '#2D1F52', color: '#B8A9E0' }}>‹</button>
        <div className="flex-1">
          <h1 className="text-xl font-black" style={{ color: '#F5F3FF' }}>
            {deckType === 'subdivisions' ? `${headerSub} Subdivisions` : 'Flashcards'}
          </h1>
          <div className="text-xs" style={{ color: '#B8A9E0' }}>#{relIdx + 1} / {cards.length} · {deckType === 'subdivisions' ? 'subdivision flags' : headerSub}</div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-10" style={{ zIndex: 1, position: 'relative' }}>
        <div style={{ width: '100%', maxWidth: 360, position: 'relative' }}>
          {/* Desktop-only navigation arrows (mobile uses swipe) */}
          <button onClick={e => { e.stopPropagation(); goPrev() }} aria-label="Previous card"
            className="hidden sm:flex items-center justify-center active:scale-90 transition-transform"
            style={{ position: 'absolute', left: -64, top: '50%', transform: 'translateY(-50%)', zIndex: 5,
              width: 44, height: 44, borderRadius: 999, fontSize: 22,
              background: '#2D1F52', border: '1px solid #8B6CFF44', color: '#A78BFA', cursor: 'pointer' }}>‹</button>
          <button onClick={e => { e.stopPropagation(); advance('left') }} aria-label="Next card"
            className="hidden sm:flex items-center justify-center active:scale-90 transition-transform"
            style={{ position: 'absolute', right: -64, top: '50%', transform: 'translateY(-50%)', zIndex: 5,
              width: 44, height: 44, borderRadius: 999, fontSize: 22,
              background: '#2D1F52', border: '1px solid #8B6CFF44', color: '#A78BFA', cursor: 'pointer' }}>›</button>

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
                    <div style={{ color: '#8B6CFF', fontSize: 12 }}>{card.subtitle}</div>
                  </div>
                </div>
                {card.funFact && <p style={{ color: '#B8A9E0', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{card.funFact}</p>}
                {card.tip && (
                  <div style={{ background: '#FBBF2411', border: '1px solid #FBBF2433', borderRadius: 10, padding: '10px 12px' }}>
                    <div style={{ color: '#FBBF24', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>💡 How to recognise it</div>
                    <p style={{ color: '#F5F3FF', fontSize: 13, margin: 0 }}>{card.tip}</p>
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
