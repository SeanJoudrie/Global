import { useState } from 'react'
import { FLAGS, REGIONS, getFlagsByRegion } from '../data/flags'
import type { Region } from '../data/flags'
import type { AppState } from '../utils/storage'
import type { HistoricalRegion } from '../data/historicalFlags'

interface Props {
  state: AppState
  onBack: () => void
  onStartSet: (setId: string, flags: typeof FLAGS) => void
  onStartHistorical: (region?: HistoricalRegion) => void
  onGoIdentity: () => void
}

interface FlagSet {
  id: string
  label: string
  emoji: string
  flags: typeof FLAGS
}

// Map each continent to its broad historical region + a display label.
const HIST: Record<string, { region: HistoricalRegion; label: string }> = {
  Europe:        { region: 'Europe',              label: 'Europe' },
  Africa:        { region: 'Africa & Middle East', label: 'Africa & the Middle East' },
  'Middle East': { region: 'Africa & Middle East', label: 'Africa & the Middle East' },
  Asia:          { region: 'Asia & Oceania',       label: 'Asia & Oceania' },
  Oceania:       { region: 'Asia & Oceania',       label: 'Asia & Oceania' },
  Americas:      { region: 'Americas',             label: 'the Americas' },
}

function buildSets(): FlagSet[] {
  return [
    { id: 'world', label: 'World', emoji: '🌍', flags: FLAGS },
    ...REGIONS.map((r): FlagSet => ({
      id: r.toLowerCase().replace(/\s+/g, '-'),
      label: r,
      emoji: regionEmoji(r),
      flags: getFlagsByRegion(r as Region),
    })),
  ]
}

function regionEmoji(r: string): string {
  const map: Record<string, string> = {
    Europe: '🏰', Africa: '🌍', Asia: '🏯', Americas: '🗽', Oceania: '🏄', 'Middle East': '🕌',
  }
  return map[r] ?? '🌐'
}

export default function FlagsScreen({ state, onBack, onStartSet, onStartHistorical, onGoIdentity }: Props) {
  const sets = buildSets()
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const toggle = (id: string) => setExpanded(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  const progressFor = (flags: typeof FLAGS) => {
    const learned = flags.filter(f => state.learnedFlags.includes(f.code)).length
    return { learned, total: flags.length, pct: flags.length ? Math.round((learned / flags.length) * 100) : 0 }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)' }}>
      <header className="flex items-center gap-3 px-5 pt-8 pb-4">
        <button onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-all active:scale-90"
          style={{ background: '#2D1F52', color: '#B8A9E0' }}>‹</button>
        <h1 className="text-2xl font-black" style={{ color: '#F5F3FF' }}>Flag Sets</h1>
      </header>

      <div className="flex-1 px-5 pb-8 space-y-3">
        {/* Dedicated Identity Flags section — pride, ethnic/pan-national,
            separatist, micronations and maritime/signal flags all live here. */}
        <button onClick={onGoIdentity}
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-left transition-all active:scale-[0.98] hover:brightness-110"
          style={{ background: 'linear-gradient(135deg,#2A1A4A,#3A1F5E)', border: '1px solid #A78BFA55' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏳️‍🌈</span>
            <div>
              <div className="font-bold text-base" style={{ color: '#F5F3FF' }}>Identity Flags</div>
              <div className="text-xs" style={{ color: '#C4B5FD' }}>Pride · ethnic · separatist · micronations · signal</div>
            </div>
          </div>
          <span style={{ color: '#A78BFA' }}>›</span>
        </button>

        {sets.map(({ id, label, emoji, flags: setFlags }) => {
          const { learned, total, pct } = progressFor(setFlags)
          const hasCrown = state.crowns.includes(id)
          const isOpen = expanded.has(id)
          const hist = HIST[label]

          return (
            <div key={id} className="rounded-2xl overflow-hidden"
              style={{ background: '#2D1F52', border: `1px solid ${hasCrown ? '#FBBF2444' : '#8B6CFF33'}` }}>
              {/* Header — taps straight into the modern-flags set, as usual */}
              <button onClick={() => onStartSet(id, setFlags)}
                className="w-full flex flex-col gap-3 px-5 py-4 text-left transition-all active:scale-[0.98]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{emoji}</span>
                    <div>
                      <div className="font-bold text-base" style={{ color: '#F5F3FF' }}>{label}</div>
                      <div className="text-xs" style={{ color: '#B8A9E0' }}>{learned}/{total} flags</div>
                    </div>
                  </div>
                  {hasCrown ? <span className="text-2xl animate-crown-pop">👑</span> : <span style={{ color: '#8B6CFF' }}>›</span>}
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#1A1033' }}>
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: hasCrown ? 'linear-gradient(90deg, #FBBF24, #F59E0B)' : 'linear-gradient(90deg, #8B6CFF, #A78BFA)' }} />
                </div>
              </button>

              {/* Dashed divider → reveals more sets to learn */}
              <button onClick={() => toggle(id)}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold transition-all"
                style={{ borderTop: '1px dashed #8B6CFF33', color: '#8B6CFF' }}>
                <span>{isOpen ? 'Hide sets' : 'More sets'}</span>
                <span style={{ display: 'inline-block', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
              </button>

              {isOpen && (
                <div className="px-3 pb-3 pt-1 space-y-2">
                  <button onClick={() => onStartSet(id, setFlags)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all active:scale-[0.98]"
                    style={{ background: '#1A1033', border: '1px solid #8B6CFF22' }}>
                    <span className="text-xl">🏛️</span>
                    <div>
                      <div className="text-sm font-bold" style={{ color: '#F5F3FF' }}>Modern political flags</div>
                      <div className="text-xs" style={{ color: '#B8A9E0' }}>{total} current national flags</div>
                    </div>
                  </button>
                  <button onClick={() => onStartHistorical(hist?.region)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all active:scale-[0.98]"
                    style={{ background: '#1A1033', border: '1px solid #F59E0B33' }}>
                    <span className="text-xl">📜</span>
                    <div>
                      <div className="text-sm font-bold" style={{ color: '#F5F3FF' }}>
                        Historical Flags{hist ? ` of ${hist.label}` : ''}
                      </div>
                      <div className="text-xs" style={{ color: '#B8A9E0' }}>Vanished states &amp; past regimes</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
