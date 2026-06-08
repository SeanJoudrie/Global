import { useState, useMemo } from 'react'
import { FLAGS } from '../data/flags'
import { CODEX } from '../data/codex'
import type { HistoricalFlag } from '../data/codex'

interface Props {
  onBack: () => void
}

type Phase = 'list' | 'country'

const REGION_ORDER = ['Europe', 'Africa', 'Asia', 'Americas', 'Middle East', 'Oceania'] as const

export default function CodexScreen({ onBack }: Props) {
  const [phase, setPhase] = useState<Phase>('list')
  const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [historyExpanded, setHistoryExpanded] = useState(false)

  const filteredFlags = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return FLAGS
    return FLAGS.filter(f => f.name.toLowerCase().includes(q) || f.region.toLowerCase().includes(q))
  }, [search])

  const grouped = useMemo(() => {
    return REGION_ORDER.map(region => ({
      region,
      flags: filteredFlags.filter(f => f.region === region),
    })).filter(g => g.flags.length > 0)
  }, [filteredFlags])

  const selectedFlag = selectedCode ? FLAGS.find(f => f.code === selectedCode) : null
  const selectedEntry = selectedCode ? CODEX[selectedCode] : null

  const openCountry = (code: string) => {
    setSelectedCode(code)
    setHistoryExpanded(false)
    setPhase('country')
  }

  if (phase === 'country' && selectedFlag && selectedEntry) {
    const hasHistory = selectedEntry.flagHistory.length > 0

    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,#1A1033 0%,#2A1A4A 100%)', position: 'relative', zIndex: 1 }}>
        <header className="flex items-center gap-3 px-5 pt-8 pb-4">
          <button onClick={() => setPhase('list')}
            className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
            style={{ background: '#2D1F52', color: '#B8A9E0' }}>‹</button>
          <h1 className="text-xl font-black" style={{ color: '#F5F3FF' }}>{selectedFlag.name}</h1>
          <span className="text-xs px-2 py-0.5 rounded-full ml-auto"
            style={{ background: '#8B6CFF22', color: '#A78BFA', border: '1px solid #8B6CFF33' }}>
            {selectedFlag.region}
          </span>
        </header>

        <div className="flex-1 overflow-y-auto px-5 pb-12">
          {/* Flag image */}
          <div className="rounded-2xl overflow-hidden mb-5" style={{ border: '1px solid #8B6CFF33' }}>
            <img
              src={selectedFlag.flagUrl}
              alt={selectedFlag.name}
              style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
              onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
            />
          </div>

          {/* Summary */}
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#8B6CFF' }}>Overview</h2>
            <p className="text-sm leading-relaxed" style={{ color: '#D4CCF0', lineHeight: 1.75 }}>
              {selectedEntry.summary}
            </p>
          </div>

          {/* Flag History */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#8B6CFF' }}>Flag History</h2>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: '#F59E0B22', color: '#F59E0B', border: '1px solid #F59E0B44' }}>
                🔬 Beta
              </span>
            </div>

            {!hasHistory ? (
              <div className="rounded-2xl p-5 text-center"
                style={{ background: '#2D1F52', border: '1px solid #8B6CFF22' }}>
                <div className="text-3xl mb-2">🏳️</div>
                <p className="text-sm" style={{ color: '#B8A9E0' }}>Flag history for {selectedFlag.name} is coming soon.</p>
                <p className="text-xs mt-1" style={{ color: '#8B6CFF88' }}>This feature is in beta — we're adding countries one by one.</p>
              </div>
            ) : (
              <div>
                <p className="text-xs mb-4" style={{ color: '#8B6CFF88' }}>
                  Showing {selectedEntry.flagHistory.length} flag{selectedEntry.flagHistory.length !== 1 ? 's' : ''} · newest first
                </p>
                <div className="space-y-0">
                  {(historyExpanded ? selectedEntry.flagHistory : selectedEntry.flagHistory.slice(0, 2)).map((hf: HistoricalFlag, i: number) => (
                    <div key={i}>
                      <FlagHistoryCard hf={hf} isFirst={i === 0} />
                      {i < (historyExpanded ? selectedEntry.flagHistory.length : Math.min(2, selectedEntry.flagHistory.length)) - 1 && (
                        <div className="flex flex-col items-center py-1">
                          <div style={{ width: 2, height: 12, background: '#8B6CFF44' }} />
                          <div className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: '#2D1F52', color: '#8B6CFF88', border: '1px solid #8B6CFF22', fontSize: 10 }}>
                            ↓ older
                          </div>
                          <div style={{ width: 2, height: 12, background: '#8B6CFF44' }} />
                        </div>
                      )}
                    </div>
                  ))}
                  {selectedEntry.flagHistory.length > 2 && !historyExpanded && (
                    <div className="flex flex-col items-center pt-1">
                      <div style={{ width: 2, height: 12, background: '#8B6CFF33' }} />
                      <button
                        onClick={() => setHistoryExpanded(true)}
                        className="text-xs px-4 py-2 rounded-full transition-all active:scale-95"
                        style={{ background: '#2D1F52', color: '#A78BFA', border: '1px solid #8B6CFF44' }}>
                        Show {selectedEntry.flagHistory.length - 2} older flag{selectedEntry.flagHistory.length - 2 !== 1 ? 's' : ''} ↓
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,#1A1033 0%,#2A1A4A 100%)', position: 'relative', zIndex: 1 }}>
      <header className="flex items-center gap-3 px-5 pt-8 pb-3">
        <button onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: '#2D1F52', color: '#B8A9E0' }}>‹</button>
        <div>
          <h1 className="text-2xl font-black" style={{ color: '#F5F3FF' }}>Codex</h1>
          <p className="text-xs" style={{ color: '#B8A9E0' }}>{FLAGS.length} countries · flag histories in beta</p>
        </div>
      </header>

      {/* Search */}
      <div className="px-5 mb-3">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: '#2D1F52', border: '1px solid #8B6CFF33' }}>
          <span style={{ color: '#8B6CFF88' }}>🔍</span>
          <input
            type="text"
            placeholder="Search countries…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: '#F5F3FF' }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ color: '#8B6CFF88', fontSize: 16 }}>✕</button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-12">
        {grouped.length === 0 ? (
          <div className="text-center py-12" style={{ color: '#B8A9E0' }}>No countries match "{search}"</div>
        ) : (
          grouped.map(({ region, flags }) => (
            <div key={region} className="mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#8B6CFF' }}>{region}</h3>
              <div className="space-y-1.5">
                {flags.map(flag => {
                  const entry = CODEX[flag.code]
                  const hasHistory = entry?.flagHistory?.length > 0
                  return (
                    <button
                      key={flag.code}
                      onClick={() => openCountry(flag.code)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all active:scale-[0.98] hover:brightness-110 text-left"
                      style={{ background: '#2D1F52', border: '1px solid #8B6CFF22' }}>
                      <img
                        src={flag.flagUrl}
                        alt={flag.name}
                        style={{ width: 40, height: 26, objectFit: 'cover', borderRadius: 4, border: '1px solid #8B6CFF22', flexShrink: 0 }}
                        onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate" style={{ color: '#F5F3FF' }}>{flag.name}</div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {hasHistory && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full"
                            style={{ background: '#F59E0B22', color: '#F59E0B', border: '1px solid #F59E0B33', fontSize: 9 }}>
                            🔬
                          </span>
                        )}
                        <span style={{ color: '#8B6CFF' }}>›</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function FlagHistoryCard({ hf, isFirst }: { hf: HistoricalFlag; isFirst: boolean }) {
  const yearLabel = hf.toYear === null ? `${hf.fromYear} — Present` : `${hf.fromYear} — ${hf.toYear}`

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#2D1F52', border: `1px solid ${isFirst ? '#8B6CFF44' : '#8B6CFF22'}` }}>
      {isFirst && (
        <div className="flex items-center justify-center gap-1.5 py-1.5"
          style={{ background: '#8B6CFF18', borderBottom: '1px solid #8B6CFF22' }}>
          <span style={{ color: '#A78BFA', fontSize: 11, fontWeight: 600 }}>↑ Current flag</span>
        </div>
      )}
      <img
        src={hf.flagUrl}
        alt={hf.label}
        style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }}
        onError={e => {
          const el = e.target as HTMLImageElement
          el.style.display = 'none'
          const placeholder = el.parentElement?.querySelector('.flag-placeholder') as HTMLElement
          if (placeholder) placeholder.style.display = 'flex'
        }}
      />
      <div className="flag-placeholder" style={{ display: 'none', height: 140, alignItems: 'center', justifyContent: 'center', background: '#1A1033' }}>
        <span style={{ color: '#8B6CFF44', fontSize: 40 }}>🏳️</span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="font-bold text-sm" style={{ color: '#F5F3FF' }}>{hf.label}</div>
          <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: '#8B6CFF22', color: '#A78BFA', border: '1px solid #8B6CFF33', whiteSpace: 'nowrap' }}>
            {yearLabel}
          </span>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: '#B8A9E0', lineHeight: 1.65 }}>{hf.note}</p>
      </div>
    </div>
  )
}
