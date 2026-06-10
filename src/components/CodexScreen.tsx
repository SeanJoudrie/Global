import { useState, useMemo } from 'react'
import { FLAGS } from '../data/flags'
import { CODEX } from '../data/codex'
import type { HistoricalFlag } from '../data/codex'
import { historicalFor } from '../data/historicalFlags'
import { IDENTITY_FLAGS, IDENTITY_CATEGORIES } from '../data/identityFlags'
import { CHALLENGE_CONTINENTS } from '../data/challenges'
import type { SubRegion } from '../data/challenges'

interface Props {
  onBack: () => void
}

type Phase = 'list' | 'country'

const REGION_ORDER = ['Europe', 'Africa', 'Asia', 'Americas', 'Middle East', 'Oceania'] as const

// Look up sub-regions for a country code across all challenge continents
function getSubRegions(code: string) {
  for (const cont of CHALLENGE_CONTINENTS) {
    const country = cont.countries.find(c => c.code === code)
    if (country && country.subRegions.length > 0) return country.subRegions
  }
  return []
}

export default function CodexScreen({ onBack }: Props) {
  const [phase, setPhase] = useState<Phase>('list')
  const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  // Regions start collapsed; store which are expanded
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set())
  const [historyExpanded, setHistoryExpanded] = useState(false)
  const [historyIdx, setHistoryIdx] = useState(0)
  const [subdivisionsExpanded, setSubdivisionsExpanded] = useState(false)
  const [predecessorsExpanded, setPredecessorsExpanded] = useState(false)

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
    setHistoryIdx(0)
    setSubdivisionsExpanded(false)
    setPredecessorsExpanded(false)
    setPhase('country')
  }

  const toggleRegion = (region: string) => {
    setExpandedRegions(prev => {
      const next = new Set(prev)
      if (next.has(region)) next.delete(region)
      else next.add(region)
      return next
    })
  }

  // Auto-expand all regions when searching
  const isSearching = search.trim().length > 0

  if (phase === 'country' && selectedFlag && selectedEntry) {
    const hasHistory = selectedEntry.flagHistory.length > 0
    const subRegions = getSubRegions(selectedFlag.code)
    const hasSubdivisions = subRegions.length > 0
    const predecessors = historicalFor(selectedFlag.code)

    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)', position: 'relative', zIndex: 1 }}>
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
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#8B6CFF' }}>Overview</h2>
            <p className="text-sm leading-relaxed" style={{ color: '#D4CCF0', lineHeight: 1.75 }}>
              {selectedEntry.summary}
            </p>
          </div>

          {/* Did you know? — surfaces the flag's fun fact + how to tell it apart */}
          {(selectedFlag.funFact || selectedFlag.distinguishingTip) && (
            <div className="mb-5 rounded-2xl overflow-hidden" style={{ border: '1px solid #FBBF2433' }}>
              {selectedFlag.funFact && (
                <div style={{ background: '#2D1F52', padding: '16px 18px' }}>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#FBBF24' }}>
                    💡 Did you know?
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#F5F3FF', lineHeight: 1.65 }}>
                    {selectedFlag.funFact}
                  </p>
                </div>
              )}
              {selectedFlag.distinguishingTip && (
                <div style={{ background: '#1A1033', padding: '12px 18px', borderTop: '1px solid #8B6CFF22' }}>
                  <div className="text-xs font-semibold mb-1" style={{ color: '#8B6CFF' }}>How to tell it apart</div>
                  <p className="text-xs leading-relaxed" style={{ color: '#B8A9E0', lineHeight: 1.6 }}>
                    {selectedFlag.distinguishingTip}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Flag History — collapsible */}
          <div className="mb-5">
            <button
              onClick={() => setHistoryExpanded(v => !v)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
              style={{ background: '#2D1F52', border: '1px solid #8B6CFF33' }}
            >
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#8B6CFF' }}>Flag History</h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: '#F59E0B22', color: '#F59E0B', border: '1px solid #F59E0B44' }}>
                  🔬 Beta
                </span>
                {hasHistory && (
                  <span className="text-xs" style={{ color: '#B8A9E0' }}>{selectedEntry.flagHistory.length} flags</span>
                )}
              </div>
              <span style={{ color: '#8B6CFF', transition: 'transform 0.2s', transform: historyExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
            </button>

            {historyExpanded && (
              <div className="mt-3">
                {!hasHistory ? (
                  <div className="rounded-2xl p-5 text-center"
                    style={{ background: '#2D1F52', border: '1px solid #8B6CFF22' }}>
                    <div className="text-3xl mb-2">🏳️</div>
                    <p className="text-sm" style={{ color: '#B8A9E0' }}>Flag history for {selectedFlag.name} is coming soon.</p>
                    <p className="text-xs mt-1" style={{ color: '#8B6CFF88' }}>This feature is in beta — we're adding countries one by one.</p>
                  </div>
                ) : (
                  <div>
                    {/* Navigation row */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs" style={{ color: '#8B6CFF88' }}>
                        {historyIdx + 1} / {selectedEntry.flagHistory.length} · newest → oldest
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setHistoryIdx(i => Math.max(0, i - 1))}
                          disabled={historyIdx === 0}
                          className="w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-90"
                          style={{
                            background: historyIdx === 0 ? '#2D1F5266' : '#2D1F52',
                            border: `1px solid ${historyIdx === 0 ? '#8B6CFF11' : '#8B6CFF44'}`,
                            color: historyIdx === 0 ? '#8B6CFF22' : '#8B6CFF',
                            fontSize: 18,
                          }}>‹</button>
                        <button
                          onClick={() => setHistoryIdx(i => Math.min(selectedEntry.flagHistory.length - 1, i + 1))}
                          disabled={historyIdx === selectedEntry.flagHistory.length - 1}
                          className="w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-90"
                          style={{
                            background: historyIdx === selectedEntry.flagHistory.length - 1 ? '#2D1F5266' : '#2D1F52',
                            border: `1px solid ${historyIdx === selectedEntry.flagHistory.length - 1 ? '#8B6CFF11' : '#8B6CFF44'}`,
                            color: historyIdx === selectedEntry.flagHistory.length - 1 ? '#8B6CFF22' : '#8B6CFF',
                            fontSize: 18,
                          }}>›</button>
                      </div>
                    </div>

                    {/* Main card */}
                    <FlagHistoryCard
                      hf={selectedEntry.flagHistory[historyIdx]}
                      isFirst={historyIdx === 0}
                    />

                    {/* Timeline strip */}
                    <div className="mt-4">
                      <p className="text-xs mb-2" style={{ color: '#8B6CFF55' }}>Timeline — tap to jump</p>
                      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6 }}>
                        {selectedEntry.flagHistory.map((hf: HistoricalFlag, i: number) => (
                          <button key={i} onClick={() => setHistoryIdx(i)}
                            style={{
                              flexShrink: 0, borderRadius: 8, overflow: 'hidden',
                              border: `2px solid ${i === historyIdx ? '#8B6CFF' : '#8B6CFF22'}`,
                              opacity: i === historyIdx ? 1 : 0.55,
                              transition: 'opacity 0.2s, border-color 0.2s',
                              background: '#1A1033',
                            }}>
                            <img src={hf.flagUrl} alt={hf.label}
                              style={{ width: 72, height: 46, objectFit: 'cover', display: 'block' }}
                              onError={e => { (e.target as HTMLImageElement).style.opacity = '0.15' }}
                            />
                            <div style={{ padding: '3px 5px', textAlign: 'center', background: '#2D1F52' }}>
                              <span style={{ fontSize: 9, color: i === historyIdx ? '#A78BFA' : '#8B6CFF66', fontWeight: 600 }}>
                                {hf.fromYear}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dot indicators */}
                    <div className="flex justify-center gap-1.5 mt-3">
                      {selectedEntry.flagHistory.map((_: HistoricalFlag, i: number) => (
                        <button key={i} onClick={() => setHistoryIdx(i)}
                          style={{
                            width: i === historyIdx ? 20 : 7,
                            height: 7, borderRadius: 4,
                            background: i === historyIdx ? '#8B6CFF' : '#8B6CFF33',
                            transition: 'width 0.25s, background 0.2s',
                            border: 'none', padding: 0,
                          }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Subdivisions — collapsible */}
          {hasSubdivisions && (
            <div className="mb-5">
              <button
                onClick={() => setSubdivisionsExpanded(v => !v)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
                style={{ background: '#2D1F52', border: '1px solid #34D39933' }}
              >
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#34D399' }}>Subdivisions</h2>
                  <span className="text-xs" style={{ color: '#B8A9E0' }}>{subRegions.length} regions</span>
                </div>
                <span style={{ color: '#34D399', transition: 'transform 0.2s', transform: subdivisionsExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
              </button>

              {subdivisionsExpanded && (
                <SubdivisionGrid
                  subRegions={subRegions}
                  confirmedNoFlags={NO_SUBDIVISION_FLAG_COUNTRIES.has(selectedFlag.code)}
                  headerLabel={selectedFlag.code === 'IE' ? 'Province' : selectedFlag.code === 'GB' ? 'Nation' : undefined}
                  memberLabel={selectedFlag.code === 'IE' ? 'Counties' : selectedFlag.code === 'GB' ? 'Council areas' : undefined}
                />
              )}
            </div>
          )}

          {/* Predecessor & related states — collapsible */}
          {predecessors.length > 0 && (
            <div className="mb-5">
              <button
                onClick={() => setPredecessorsExpanded(v => !v)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
                style={{ background: '#2D1F52', border: '1px solid #C084FC33' }}
              >
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#C084FC' }}>Predecessor & Related States</h2>
                  <span className="text-xs" style={{ color: '#B8A9E0' }}>{predecessors.length}</span>
                </div>
                <span style={{ color: '#C084FC', transition: 'transform 0.2s', transform: predecessorsExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
              </button>

              {predecessorsExpanded && (
                <div className="mt-3">
                  <p className="text-xs mb-3" style={{ color: '#C084FC88' }}>
                    Vanished empires and states tied to this land's history — featured in the Historical Flag game.
                  </p>
                  <div className="space-y-2.5">
                    {predecessors.map(h => (
                      <div key={h.id} className="rounded-2xl overflow-hidden" style={{ background: '#2D1F52', border: '1px solid #C084FC22' }}>
                        <FlagImg src={h.flagUrl} alt={h.name} height={140} />
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div className="font-bold text-sm" style={{ color: '#F5F3FF' }}>{h.name}</div>
                            <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                              style={{ background: '#C084FC22', color: '#C084FC', border: '1px solid #C084FC33', whiteSpace: 'nowrap' }}>
                              {h.era}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: '#B8A9E0', lineHeight: 1.65 }}>{h.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)', position: 'relative', zIndex: 1 }}>
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
          grouped.map(({ region, flags }) => {
            const isExpanded = isSearching || expandedRegions.has(region)
            return (
              <div key={region} className="mb-3">
                {/* Region header — clickable to expand/collapse */}
                <button
                  onClick={() => toggleRegion(region)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
                  style={{
                    background: isExpanded ? '#2D1F52' : '#221740',
                    border: `1px solid ${isExpanded ? '#8B6CFF44' : '#8B6CFF22'}`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#8B6CFF' }}>{region}</h3>
                    <span className="text-xs" style={{ color: '#B8A9E066' }}>{flags.length}</span>
                  </div>
                  <span style={{
                    color: '#8B6CFF', fontSize: 18, transition: 'transform 0.2s',
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  }}>›</span>
                </button>

                {isExpanded && (
                  <div className="mt-1.5 space-y-1.5">
                    {flags.map(f => {
                      const entry = CODEX[f.code]
                      const hasHistory = entry?.flagHistory?.length > 0
                      return (
                        <button
                          key={f.code}
                          onClick={() => openCountry(f.code)}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all active:scale-[0.98] hover:brightness-110 text-left"
                          style={{ background: '#2D1F52', border: '1px solid #8B6CFF22' }}>
                          {/* Flag thumbnail */}
                          <img
                            src={f.flagUrl}
                            alt={f.name}
                            style={{ width: 46, height: 30, objectFit: 'cover', borderRadius: 5, border: '1px solid #8B6CFF22', flexShrink: 0 }}
                            onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm truncate" style={{ color: '#F5F3FF' }}>{f.name}</div>
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
                )}
              </div>
            )
          })
        )}

        {/* Identity & other flags — pride, ethnic, separatist, micronations… */}
        {!isSearching && <IdentityCodexSection />}
      </div>
    </div>
  )
}

// ── Identity flags browser (pride, ethnic, separatist, micronations, signal) ──
function IdentityCodexSection() {
  const [sectionOpen, setSectionOpen] = useState(false)
  const [openCat, setOpenCat] = useState<string | null>(null)
  const [openFlag, setOpenFlag] = useState<string | null>(null)
  return (
    <div className="mt-5">
      {/* Collapsed by default — countries come first; tap to reveal the extras */}
      <button
        onClick={() => setSectionOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
        style={{ background: sectionOpen ? '#2D1F52' : '#221740', border: `1px solid ${sectionOpen ? '#FF6FD855' : '#8B6CFF33'}` }}>
        <div className="text-left">
          <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#FF6FD8' }}>Identity &amp; Other Flags</h3>
          <p className="text-xs" style={{ color: '#B8A9E088' }}>{IDENTITY_FLAGS.length} flags beyond countries</p>
        </div>
        <span style={{ color: '#FF6FD8', fontSize: 20, transition: 'transform 0.2s', transform: sectionOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
      </button>

      {sectionOpen && <div className="mt-3" />}
      {sectionOpen && IDENTITY_CATEGORIES.map(cat => {
        const flags = IDENTITY_FLAGS.filter(f => f.category === cat)
        const isOpen = openCat === cat
        return (
          <div key={cat} className="mb-3">
            <button
              onClick={() => setOpenCat(o => o === cat ? null : cat)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
              style={{ background: isOpen ? '#2D1F52' : '#221740', border: `1px solid ${isOpen ? '#FF6FD855' : '#8B6CFF22'}` }}>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#C084FC' }}>{cat}</h3>
                <span className="text-xs" style={{ color: '#B8A9E066' }}>{flags.length}</span>
              </div>
              <span style={{ color: '#C084FC', fontSize: 18, transition: 'transform 0.2s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
            </button>
            {isOpen && (
              <div className="mt-1.5 space-y-1.5">
                {flags.map(f => {
                  const showNote = openFlag === f.id
                  return (
                    <button key={f.id} onClick={() => setOpenFlag(o => o === f.id ? null : f.id)}
                      className="w-full px-4 py-3 rounded-xl transition-all active:scale-[0.99] text-left"
                      style={{ background: '#2D1F52', border: `1px solid ${showNote ? '#C084FC44' : '#8B6CFF22'}` }}>
                      <div className="flex items-center gap-3">
                        <img src={f.flagUrl} alt={f.name}
                          style={{ width: 46, height: 30, objectFit: 'contain', borderRadius: 5, border: '1px solid #8B6CFF22', flexShrink: 0, background: '#1E1640' }}
                          onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate" style={{ color: '#F5F3FF' }}>{f.name}</div>
                        </div>
                        <span style={{ color: '#C084FC', fontSize: 16, transition: 'transform 0.2s', transform: showNote ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
                      </div>
                      {showNote && (
                        <p className="text-xs leading-relaxed mt-2.5" style={{ color: '#B8A9E0', lineHeight: 1.65 }}>{f.note}</p>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Shown when a subdivision is positively confirmed to have no flag.
const NO_FLAG_PLACEHOLDER = (
  <div style={{ width: '100%', aspectRatio: '3/2', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.45)', borderRadius: 4 }}>
    <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.55)', textAlign: 'center', lineHeight: 1.2 }}>No flag</span>
  </div>
)

// Shown when a flag may exist but hasn't been added yet (the default for unknowns).
const UNKNOWN_FLAG_PLACEHOLDER = (
  <div style={{ width: '100%', aspectRatio: '3/2', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(139,108,255,0.10)', border: '1px dashed rgba(139,108,255,0.30)', borderRadius: 4 }}>
    <span style={{ fontSize: 16, lineHeight: 1 }}>🏳️</span>
  </div>
)
// HTML string version for the <img> onError fallback (a broken URL = unverified, not "no flag").
const UNKNOWN_FLAG_HTML = 'width:100%;aspect-ratio:3/2;display:flex;align-items:center;justify-content:center;background:rgba(139,108,255,0.10);border:1px dashed rgba(139,108,255,0.30);border-radius:4px'

// Countries whose first-level subdivisions are confirmed to have NO official flags —
// their flagless tiles read "No flag" rather than the ambiguous 🏳️ placeholder.
const NO_SUBDIVISION_FLAG_COUNTRIES = new Set<string>([
  // Africa — first-level subdivisions verified to have no official flags.
  'DZ', 'BJ', 'BW', 'BF', 'BI', 'CF', 'TD', 'CG', 'CD', 'CI', 'DJ', 'GQ', 'ER', 'SZ',
  'GH', 'MA', 'MZ', 'SN', 'GM', 'GN', 'GW', 'LS', 'LY', 'MW', 'ML', 'MR', 'NA', 'NE',
  'RW', 'TG', 'UG', 'ZM', 'MG', 'ZW', 'GA', 'SL', 'TN', 'SO', 'TZ', 'MU', 'ST',
  // Americas — subdivisions confirmed flagless (Cuba province flags were deleted as
  // fakes; Suriname/Haiti/DR have only a handful, handled individually).
  'CU', 'SR', 'HT', 'DO', 'BZ',
  // Caribbean island nations — parishes/districts have no flags (autonomous isles handled individually)
  'JM', 'BS', 'BB', 'LC', 'DM', 'VC', 'TT', 'KN', 'AG', 'GD',
  // Middle East — provinces/governorates with no official subdivision flags
  'TR', 'IR', 'SA', 'IL', 'JO', 'YE', 'SY', 'LB', 'OM', 'KW', 'QA', 'BH', 'PS',
  // Oceania — small island nations with no subdivision flags
  'KI', 'MH', 'NR', 'WS', 'TO', 'TV', 'NZ', 'FJ',
  // Asia — flagless subdivisions (countries with a few flagged ones keep those)
  'CN', 'IN', 'PH', 'MM', 'KH', 'LA', 'BN', 'SG', 'TL', 'KP',
  'VN', 'KZ', 'KG', 'TJ', 'TM', 'AF', 'AM', 'AZ', 'BT', 'NP', 'BD', 'MV', 'UZ', 'GE', 'PK',
  // Only unofficial/proposed designs exist for these — no official subdivision flags.
  // (Countries with SOME official flags keep their flagged tiles; only flagless ones show "No flag".)
  'AO', 'CM', 'ZA',
])

function SubRegionTile({ sr, confirmedNoFlags }: { sr: SubRegion; confirmedNoFlags?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      {sr.flagUrl
        ? <img
            src={sr.flagUrl}
            alt={sr.name}
            style={{ width: '100%', aspectRatio: '3/2', objectFit: 'contain', borderRadius: 4, display: 'block' }}
            onError={e => { (e.target as HTMLImageElement).replaceWith(Object.assign(document.createElement('div'), { style: UNKNOWN_FLAG_HTML, innerHTML: '<span style="font-size:16px;line-height:1">🏳️</span>' })) }}
          />
        : (sr.noFlag || confirmedNoFlags) ? NO_FLAG_PLACEHOLDER : UNKNOWN_FLAG_PLACEHOLDER
      }
      <span style={{ fontSize: 8.5, color: '#B8A9E0', textAlign: 'center', lineHeight: 1.2, wordBreak: 'break-word' }}>{sr.name}</span>
    </div>
  )
}

const SUBLABEL_STYLE: React.CSSProperties = {
  fontSize: 9, fontWeight: 700, color: '#8B6CFF', letterSpacing: '0.08em',
  textTransform: 'uppercase', margin: '0 0 6px 2px',
}
const GRID_STYLE: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px 6px' }

function SubdivisionGrid({ subRegions, headerLabel, memberLabel, confirmedNoFlags }: { subRegions: SubRegion[]; headerLabel?: string; memberLabel?: string; confirmedNoFlags?: boolean }) {
  const hasGroups = subRegions.some(sr => sr.group)
  if (!hasGroups) {
    return <div className="mt-3" style={GRID_STYLE}>{subRegions.map(sr => <SubRegionTile key={sr.code} sr={sr} confirmedNoFlags={confirmedNoFlags} />)}</div>
  }
  const groups: { label: string; items: SubRegion[] }[] = []
  for (const sr of subRegions) {
    const label = sr.group ?? 'Other'
    let g = groups.find(g => g.label === label)
    if (!g) { g = { label, items: [] }; groups.push(g) }
    g.items.push(sr)
  }
  return (
    <div className="mt-3" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {groups.map(g => {
        // A "header" tile is the province/nation flag itself, shown on its own row on top.
        const headers = g.items.filter(s => s.groupHeader)
        const members = g.items.filter(s => !s.groupHeader)
        return (
          <div key={g.label}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: '#34D399',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              marginBottom: 8, paddingLeft: 2, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {g.label}
              <span style={{ color: '#34D39966', fontWeight: 400 }}>{members.length}</span>
            </div>
            {headers.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                {headerLabel && <div style={SUBLABEL_STYLE}>{headerLabel}</div>}
                <div style={GRID_STYLE}>{headers.map(sr => <SubRegionTile key={sr.code} sr={sr} confirmedNoFlags={confirmedNoFlags} />)}</div>
              </div>
            )}
            {headers.length > 0 && memberLabel && members.length > 0 && <div style={SUBLABEL_STYLE}>{memberLabel}</div>}
            <div style={GRID_STYLE}>{members.map(sr => <SubRegionTile key={sr.code} sr={sr} confirmedNoFlags={confirmedNoFlags} />)}</div>
          </div>
        )
      })}
    </div>
  )
}

function FlagImg({ src, alt, height }: { src: string; alt: string; height: number }) {
  return (
    <div style={{ width: '100%', height, position: 'relative', overflow: 'hidden' }}>
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height, objectFit: 'cover', display: 'block' }}
        onError={e => {
          const el = e.target as HTMLImageElement
          el.style.display = 'none'
          const placeholder = el.parentElement?.querySelector('.flag-placeholder') as HTMLElement
          if (placeholder) (placeholder as HTMLElement).style.display = 'flex'
        }}
      />
      <div className="flag-placeholder" style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', background: '#1E1640' }}>
        <span style={{ color: '#8B6CFF44', fontSize: 40 }}>🏳️</span>
      </div>
    </div>
  )
}

function yearRange(hf: HistoricalFlag) {
  return hf.toYear === null ? `${hf.fromYear} — Present` : `${hf.fromYear} — ${hf.toYear}`
}

function FlagHistoryCard({ hf, isFirst }: { hf: HistoricalFlag; isFirst: boolean }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#2D1F52', border: `1px solid ${isFirst ? '#8B6CFF44' : '#8B6CFF22'}` }}>
      {isFirst && (
        <div className="flex items-center justify-center gap-1.5 py-1.5"
          style={{ background: '#8B6CFF18', borderBottom: '1px solid #8B6CFF22' }}>
          <span style={{ color: '#A78BFA', fontSize: 11, fontWeight: 600 }}>↑ Current flag</span>
        </div>
      )}
      <FlagImg src={hf.flagUrl} alt={hf.label} height={160} />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="font-bold text-sm" style={{ color: '#F5F3FF' }}>{hf.label}</div>
          <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: '#8B6CFF22', color: '#A78BFA', border: '1px solid #8B6CFF33', whiteSpace: 'nowrap' }}>
            {yearRange(hf)}
          </span>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: '#B8A9E0', lineHeight: 1.65 }}>{hf.note}</p>

        {/* Branch — flags that existed at the same time (e.g. East/West Germany) */}
        {hf.parallel && hf.parallel.length > 0 && (
          <div className="mt-3 pt-3" style={{ borderTop: '1px dashed #8B6CFF44' }}>
            <div className="flex items-center gap-1.5 mb-2.5">
              <span style={{ color: '#F59E0B', fontSize: 13 }}>⌥</span>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#F59E0B' }}>
                {hf.parallelCaption ?? 'Flown at the same time'}
              </span>
            </div>
            <div className={`grid gap-2.5 ${hf.parallel.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {hf.parallel.map((p, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ background: '#241A45', border: '1px solid #8B6CFF22' }}>
                  <FlagImg src={p.flagUrl} alt={p.label} height={90} />
                  <div className="p-2.5">
                    <div className="font-semibold mb-0.5" style={{ color: '#F5F3FF', fontSize: 12 }}>{p.label}</div>
                    <div className="mb-1" style={{ color: '#A78BFA', fontSize: 10 }}>{yearRange(p)}</div>
                    <p style={{ color: '#B8A9E0', fontSize: 10.5, lineHeight: 1.5 }}>{p.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
