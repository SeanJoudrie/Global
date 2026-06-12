import { useState, useMemo } from 'react'
import { FLAGS } from '../data/flags'
import { CODEX } from '../data/codex'
import type { HistoricalFlag } from '../data/codex'
import { historicalFor } from '../data/historicalFlags'
import { IDENTITY_FLAGS, IDENTITY_CATEGORIES, SIGNAL_FLAGS } from '../data/identityFlags'
import { US_CITY_FLAGS } from '../data/usCityFlags'
import { CHALLENGE_CONTINENTS } from '../data/challenges'
import type { SubRegion } from '../data/challenges'
import { T, ACCENT, FONT, tint } from '../ui/tokens'
import { ScreenHeader } from './ui'
import { LineIcon, FlaskIcon } from './icons'
import { Search, Anchor } from 'lucide-react'

interface Props {
  onBack: () => void
  initialCode?: string | null
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

export default function CodexScreen({ onBack, initialCode }: Props) {
  const [phase, setPhase] = useState<Phase>(initialCode != null ? 'country' : 'list')
  const [selectedCode, setSelectedCode] = useState<string | null>(initialCode != null ? initialCode : null)
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
    // Always start a country page at the top (don't inherit the list's scroll).
    window.scrollTo({ top: 0 })
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
      <div className="min-h-screen flex flex-col" style={{ background: T.bg, color: T.text, position: 'relative', zIndex: 1 }}>
        <ScreenHeader title={selectedFlag.name} onBack={() => setPhase('list')}
          right={
            <span className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: tint(ACCENT.codex, 0.12), color: ACCENT.codex, border: `1px solid ${tint(ACCENT.codex, 0.3)}` }}>
              {selectedFlag.region}
            </span>
          } />

        <div className="flex-1 overflow-y-auto px-5 pb-12 pt-2">
          {/* Flag image */}
          <div className="rounded-2xl overflow-hidden mb-5" style={{ border: `1px solid ${T.line}` }}>
            <img
              src={selectedFlag.flagUrl}
              alt={selectedFlag.name}
              style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
              onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
            />
          </div>

          {/* Summary */}
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT.codex }}>Overview</h2>
            <p className="text-sm leading-relaxed" style={{ color: T.text, lineHeight: 1.75 }}>
              {selectedEntry.summary}
            </p>
          </div>

          {/* Did you know? — surfaces the flag's fun fact + how to tell it apart */}
          {(selectedFlag.funFact || selectedFlag.distinguishingTip) && (
            <div className="mb-5 rounded-2xl overflow-hidden" style={{ border: `1px solid ${tint(T.gold, 0.3)}` }}>
              {selectedFlag.funFact && (
                <div style={{ background: T.surface, padding: '16px 18px' }}>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: T.gold, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <LineIcon name="funfact" size={14} color={T.gold} /> Did you know?
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: T.text, lineHeight: 1.65 }}>
                    {selectedFlag.funFact}
                  </p>
                </div>
              )}
              {selectedFlag.distinguishingTip && (
                <div style={{ background: T.surfaceHi, padding: '12px 18px', borderTop: `1px solid ${T.line}` }}>
                  <div className="text-xs font-semibold mb-1" style={{ color: ACCENT.codex }}>How to tell it apart</div>
                  <p className="text-xs leading-relaxed" style={{ color: T.muted, lineHeight: 1.6 }}>
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
              className="geo-tap w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
              style={{ background: T.surface, border: `1px solid ${T.line}` }}
            >
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: ACCENT.codex }}>Flag History</h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: tint(T.gold, 0.12), color: T.gold, border: `1px solid ${tint(T.gold, 0.3)}`,
                    display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <FlaskIcon size={12} color={T.gold} strokeWidth={1.6} absoluteStrokeWidth /> Beta
                </span>
                {hasHistory && (
                  <span className="text-xs" style={{ color: T.muted }}>{selectedEntry.flagHistory.length} flags</span>
                )}
              </div>
              <span style={{ color: ACCENT.codex, transition: 'transform 0.2s', transform: historyExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
            </button>

            {historyExpanded && (
              <div className="mt-3">
                {!hasHistory ? (
                  <div className="rounded-2xl p-5 text-center"
                    style={{ background: T.surface, border: `1px solid ${T.line}` }}>
                    <div className="mb-2 flex justify-center"><LineIcon name="flags" size={30} color={T.dim} /></div>
                    <p className="text-sm" style={{ color: T.muted }}>Flag history for {selectedFlag.name} is coming soon.</p>
                    <p className="text-xs mt-1" style={{ color: T.dim }}>This feature is in beta — we're adding countries one by one.</p>
                  </div>
                ) : (
                  <div>
                    {/* Navigation row */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs" style={{ color: T.dim, fontFamily: FONT.mono, fontVariantNumeric: 'tabular-nums' }}>
                        {historyIdx + 1} / {selectedEntry.flagHistory.length} · newest → oldest
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setHistoryIdx(i => Math.max(0, i - 1))}
                          disabled={historyIdx === 0}
                          className="w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-90"
                          style={{
                            background: T.surface,
                            border: `1px solid ${historyIdx === 0 ? T.line : tint(ACCENT.codex, 0.4)}`,
                            color: historyIdx === 0 ? T.dim : ACCENT.codex,
                            opacity: historyIdx === 0 ? 0.5 : 1,
                            fontSize: 18,
                          }}>‹</button>
                        <button
                          onClick={() => setHistoryIdx(i => Math.min(selectedEntry.flagHistory.length - 1, i + 1))}
                          disabled={historyIdx === selectedEntry.flagHistory.length - 1}
                          className="w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-90"
                          style={{
                            background: T.surface,
                            border: `1px solid ${historyIdx === selectedEntry.flagHistory.length - 1 ? T.line : tint(ACCENT.codex, 0.4)}`,
                            color: historyIdx === selectedEntry.flagHistory.length - 1 ? T.dim : ACCENT.codex,
                            opacity: historyIdx === selectedEntry.flagHistory.length - 1 ? 0.5 : 1,
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
                      <p className="text-xs mb-2" style={{ color: T.dim }}>Timeline — tap to jump</p>
                      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6 }}>
                        {selectedEntry.flagHistory.map((hf: HistoricalFlag, i: number) => (
                          <button key={i} onClick={() => setHistoryIdx(i)}
                            style={{
                              flexShrink: 0, borderRadius: 8, overflow: 'hidden',
                              border: `2px solid ${i === historyIdx ? ACCENT.codex : T.line}`,
                              opacity: i === historyIdx ? 1 : 0.55,
                              transition: 'opacity 0.2s, border-color 0.2s',
                              background: T.surfaceHi,
                            }}>
                            <img src={hf.flagUrl} alt={hf.label}
                              style={{ width: 72, height: 46, objectFit: 'cover', display: 'block' }}
                              onError={e => { (e.target as HTMLImageElement).style.opacity = '0.15' }}
                            />
                            <div style={{ padding: '3px 5px', textAlign: 'center', background: T.surface }}>
                              <span style={{ fontSize: 9, fontFamily: FONT.mono, color: i === historyIdx ? ACCENT.codex : T.dim, fontWeight: 600 }}>
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
                            background: i === historyIdx ? ACCENT.codex : tint(ACCENT.codex, 0.25),
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
                className="geo-tap w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
                style={{ background: T.surface, border: `1px solid ${tint(T.green, 0.3)}` }}
              >
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: T.green }}>Subdivisions</h2>
                  <span className="text-xs" style={{ color: T.muted }}>{subRegions.length} regions</span>
                </div>
                <span style={{ color: T.green, transition: 'transform 0.2s', transform: subdivisionsExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
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
                className="geo-tap w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
                style={{ background: T.surface, border: `1px solid ${tint(T.warm, 0.3)}` }}
              >
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: T.warm }}>Predecessor & Related States</h2>
                  <span className="text-xs" style={{ color: T.muted }}>{predecessors.length}</span>
                </div>
                <span style={{ color: T.warm, transition: 'transform 0.2s', transform: predecessorsExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
              </button>

              {predecessorsExpanded && (
                <div className="mt-3">
                  <p className="text-xs mb-3" style={{ color: tint(T.warm, 0.7) }}>
                    Vanished empires and states tied to this land's history — featured in the Historical Flag game.
                  </p>
                  <div className="space-y-2.5">
                    {predecessors.map(h => (
                      <div key={h.id} className="rounded-2xl overflow-hidden" style={{ background: T.surface, border: `1px solid ${tint(T.warm, 0.2)}` }}>
                        <FlagImg src={h.flagUrl} alt={h.name} height={140} />
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div className="geo-display font-bold text-sm" style={{ color: T.text }}>{h.name}</div>
                            <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                              style={{ background: tint(T.warm, 0.12), color: T.warm, border: `1px solid ${tint(T.warm, 0.25)}`, whiteSpace: 'nowrap' }}>
                              {h.era}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: T.muted, lineHeight: 1.65 }}>{h.note}</p>
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
    <div className="min-h-screen flex flex-col" style={{ background: T.bg, color: T.text, position: 'relative', zIndex: 1 }}>
      <ScreenHeader title="Codex" subtitle={`${FLAGS.length} countries · flag histories in beta`} onBack={onBack} />

      {/* Search */}
      <div className="px-5 mb-3">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: T.surface, border: `1px solid ${T.line}` }}>
          <Search size={16} color={T.dim} strokeWidth={1.6} absoluteStrokeWidth />
          <input
            type="text"
            placeholder="Search countries…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: T.text }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ color: T.dim, fontSize: 16 }}>✕</button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-12">
        {grouped.length === 0 ? (
          <div className="text-center py-12" style={{ color: T.muted }}>No countries match "{search}"</div>
        ) : (
          grouped.map(({ region, flags }) => {
            const isExpanded = isSearching || expandedRegions.has(region)
            return (
              <div key={region} className="mb-3">
                {/* Region header — clickable to expand/collapse */}
                <button
                  onClick={() => toggleRegion(region)}
                  className="geo-tap w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
                  style={{
                    background: isExpanded ? T.surface : T.surfaceHi,
                    border: `1px solid ${isExpanded ? tint(ACCENT.codex, 0.35) : T.line}`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: ACCENT.codex }}>{region}</h3>
                    <span className="text-xs" style={{ color: T.dim, fontFamily: FONT.mono, fontVariantNumeric: 'tabular-nums' }}>{flags.length}</span>
                  </div>
                  <span style={{
                    color: ACCENT.codex, fontSize: 18, transition: 'transform 0.2s',
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
                          className="geo-tap w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all active:scale-[0.98] text-left"
                          style={{ background: T.surface, border: `1px solid ${T.line}` }}>
                          {/* Flag thumbnail */}
                          <img
                            src={f.flagUrl}
                            alt={f.name}
                            style={{ width: 46, height: 30, objectFit: 'cover', borderRadius: 5, border: `1px solid ${T.line}`, flexShrink: 0 }}
                            onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm truncate" style={{ color: T.text }}>{f.name}</div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {hasHistory && (
                              <span className="text-xs px-1.5 py-0.5 rounded-full inline-flex items-center"
                                style={{ background: tint(T.gold, 0.12), color: T.gold, border: `1px solid ${tint(T.gold, 0.25)}` }}>
                                <FlaskIcon size={11} color={T.gold} strokeWidth={1.6} absoluteStrokeWidth />
                              </span>
                            )}
                            <span style={{ color: ACCENT.codex }}>›</span>
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
        {/* American city flags — beta, lots of municipal flags */}
        {!isSearching && <AmericanCitiesCodexSection />}
        {/* Maritime / signal alphabet — its own section, separate from Identity */}
        {!isSearching && <SignalCodexSection />}
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
        className="geo-tap w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
        style={{ background: sectionOpen ? T.surface : T.surfaceHi, border: `1px solid ${sectionOpen ? tint(T.warm, 0.4) : T.line}` }}>
        <div className="text-left">
          <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: T.warm }}>Identity &amp; Other Flags</h3>
          <p className="text-xs" style={{ color: T.dim }}>{IDENTITY_FLAGS.length - SIGNAL_FLAGS.length} flags beyond countries</p>
        </div>
        <span style={{ color: T.warm, fontSize: 20, transition: 'transform 0.2s', transform: sectionOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
      </button>

      {sectionOpen && <div className="mt-3" />}
      {sectionOpen && IDENTITY_CATEGORIES.map(cat => {
        const flags = IDENTITY_FLAGS.filter(f => f.category === cat)
        const isOpen = openCat === cat
        return (
          <div key={cat} className="mb-3">
            <button
              onClick={() => setOpenCat(o => o === cat ? null : cat)}
              className="geo-tap w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
              style={{ background: isOpen ? T.surface : T.surfaceHi, border: `1px solid ${isOpen ? tint(T.warm, 0.4) : T.line}` }}>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: T.warm }}>{cat}</h3>
                <span className="text-xs" style={{ color: T.dim, fontFamily: FONT.mono, fontVariantNumeric: 'tabular-nums' }}>{flags.length}</span>
              </div>
              <span style={{ color: T.warm, fontSize: 18, transition: 'transform 0.2s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
            </button>
            {isOpen && (
              <div className="mt-1.5 space-y-1.5">
                {flags.map(f => {
                  const showNote = openFlag === f.id
                  return (
                    <button key={f.id} onClick={() => setOpenFlag(o => o === f.id ? null : f.id)}
                      className="geo-tap w-full px-4 py-3 rounded-xl transition-all active:scale-[0.99] text-left"
                      style={{ background: T.surface, border: `1px solid ${showNote ? tint(T.warm, 0.35) : T.line}` }}>
                      <div className="flex items-center gap-3">
                        <img src={f.flagUrl} alt={f.name}
                          style={{ width: 46, height: 30, objectFit: 'contain', borderRadius: 5, border: `1px solid ${T.line}`, flexShrink: 0, background: T.surfaceHi }}
                          onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate" style={{ color: T.text }}>{f.name}</div>
                        </div>
                        <span style={{ color: T.warm, fontSize: 16, transition: 'transform 0.2s', transform: showNote ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
                      </div>
                      {showNote && (
                        <p className="text-xs leading-relaxed mt-2.5" style={{ color: T.muted, lineHeight: 1.65 }}>{f.note}</p>
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

// ── American city flags (Beta) — lots of municipal flags ──
function AmericanCitiesCodexSection() {
  const [open, setOpen] = useState(false)
  const [openFlag, setOpenFlag] = useState<string | null>(null)
  const cities = [...US_CITY_FLAGS].sort((a, b) => a.name.localeCompare(b.name))
  return (
    <div className="mt-5">
      <button
        onClick={() => setOpen(o => !o)}
        className="geo-tap w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
        style={{ background: open ? T.surface : T.surfaceHi, border: `1px solid ${open ? tint(T.cyan, 0.4) : T.line}` }}>
        <div className="text-left">
          <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: T.cyan }}>
            American Cities <span style={{ color: tint(T.cyan, 0.6), fontSize: 10 }}>(Beta)</span>
          </h3>
          <p className="text-xs" style={{ color: T.dim }}>{cities.length} U.S. municipal flags</p>
        </div>
        <span style={{ color: T.cyan, fontSize: 20, transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
      </button>
      {open && (
        <div className="mt-1.5 space-y-1.5">
          {cities.map(f => {
            const showNote = openFlag === f.id
            return (
              <button key={f.id} onClick={() => setOpenFlag(o => o === f.id ? null : f.id)}
                className="geo-tap w-full px-4 py-3 rounded-xl transition-all active:scale-[0.99] text-left"
                style={{ background: T.surface, border: `1px solid ${showNote ? tint(T.cyan, 0.35) : T.line}` }}>
                <div className="flex items-center gap-3">
                  <img src={f.flagUrl} alt={f.name}
                    style={{ width: 46, height: 30, objectFit: 'contain', borderRadius: 5, border: `1px solid ${T.line}`, flexShrink: 0, background: T.surfaceHi }}
                    onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate" style={{ color: T.text }}>{f.name}</div>
                    <div className="text-xs" style={{ color: T.dim }}>{f.state}</div>
                  </div>
                  <span style={{ color: T.cyan, fontSize: 16, transition: 'transform 0.2s', transform: showNote ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
                </div>
                {showNote && (
                  <p className="text-xs leading-relaxed mt-2.5" style={{ color: T.muted, lineHeight: 1.65 }}>{f.note}</p>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Maritime / international signal flags (Alpha, Bravo, Charlie …) ──
function SignalCodexSection() {
  const [open, setOpen] = useState(false)
  const [openFlag, setOpenFlag] = useState<string | null>(null)
  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="geo-tap w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
        style={{ background: open ? T.surface : T.surfaceHi, border: `1px solid ${open ? tint(T.cyan, 0.4) : tint(T.cyan, 0.25)}` }}>
        <div className="text-left">
          <h3 className="text-sm font-bold uppercase tracking-widest"
            style={{ color: T.cyan, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Anchor size={14} color={T.cyan} strokeWidth={1.6} absoluteStrokeWidth /> Signal &amp; Maritime Flags
          </h3>
          <p className="text-xs" style={{ color: T.dim }}>{SIGNAL_FLAGS.length} international code / phonetic flags</p>
        </div>
        <span style={{ color: T.cyan, fontSize: 20, transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
      </button>
      {open && (
        <div className="mt-2 space-y-1.5">
          {SIGNAL_FLAGS.map(f => {
            const showNote = openFlag === f.id
            return (
              <button key={f.id} onClick={() => setOpenFlag(o => o === f.id ? null : f.id)}
                className="geo-tap w-full px-4 py-3 rounded-xl transition-all active:scale-[0.99] text-left"
                style={{ background: T.surface, border: `1px solid ${showNote ? tint(T.cyan, 0.35) : T.line}` }}>
                <div className="flex items-center gap-3">
                  <img src={f.flagUrl} alt={f.name}
                    style={{ width: 46, height: 30, objectFit: 'contain', borderRadius: 5, border: `1px solid ${T.line}`, flexShrink: 0, background: T.surfaceHi }}
                    onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate" style={{ color: T.text }}>{f.name}</div>
                  </div>
                  <span style={{ color: T.cyan, fontSize: 16, transition: 'transform 0.2s', transform: showNote ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
                </div>
                {showNote && (
                  <p className="text-xs leading-relaxed mt-2.5" style={{ color: T.muted, lineHeight: 1.65 }}>{f.note}</p>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Shown when a subdivision is positively confirmed to have no flag.
const NO_FLAG_PLACEHOLDER = (
  <div style={{ width: '100%', aspectRatio: '3/2', display: 'flex', alignItems: 'center', justifyContent: 'center', background: T.surfaceHi, border: `1px solid ${T.line}`, borderRadius: 4 }}>
    <span style={{ fontSize: 10, fontWeight: 600, color: T.dim, textAlign: 'center', lineHeight: 1.2 }}>No flag</span>
  </div>
)

// Shown when a flag may exist but hasn't been added yet (the default for unknowns).
const UNKNOWN_FLAG_PLACEHOLDER = (
  <div style={{ width: '100%', aspectRatio: '3/2', display: 'flex', alignItems: 'center', justifyContent: 'center', background: tint(ACCENT.codex, 0.1), border: `1px dashed ${tint(ACCENT.codex, 0.3)}`, borderRadius: 4 }}>
    <span style={{ fontSize: 16, lineHeight: 1 }}>🏳️</span>
  </div>
)
// HTML string version for the <img> onError fallback (a broken URL = unverified, not "no flag").
const UNKNOWN_FLAG_HTML = `width:100%;aspect-ratio:3/2;display:flex;align-items:center;justify-content:center;background:${tint(ACCENT.codex, 0.1)};border:1px dashed ${tint(ACCENT.codex, 0.3)};border-radius:4px`

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
      <span style={{ fontSize: 8.5, color: T.muted, textAlign: 'center', lineHeight: 1.2, wordBreak: 'break-word' }}>{sr.name}</span>
    </div>
  )
}

const SUBLABEL_STYLE: React.CSSProperties = {
  fontSize: 9, fontWeight: 700, color: ACCENT.codex, letterSpacing: '0.08em',
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
              fontSize: 10, fontWeight: 700, color: T.green,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              marginBottom: 8, paddingLeft: 2, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {g.label}
              <span style={{ color: tint(T.green, 0.5), fontWeight: 400, fontFamily: FONT.mono, fontVariantNumeric: 'tabular-nums' }}>{members.length}</span>
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
      <div className="flag-placeholder" style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', background: T.surfaceHi }}>
        <span style={{ color: T.dim, fontSize: 40 }}>🏳️</span>
      </div>
    </div>
  )
}

function yearRange(hf: HistoricalFlag) {
  return hf.toYear === null ? `${hf.fromYear} — Present` : `${hf.fromYear} — ${hf.toYear}`
}

function FlagHistoryCard({ hf, isFirst }: { hf: HistoricalFlag; isFirst: boolean }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: T.surface, border: `1px solid ${isFirst ? tint(ACCENT.codex, 0.35) : T.line}` }}>
      {isFirst && (
        <div className="flex items-center justify-center gap-1.5 py-1.5"
          style={{ background: tint(ACCENT.codex, 0.1), borderBottom: `1px solid ${tint(ACCENT.codex, 0.2)}` }}>
          <span style={{ color: ACCENT.codex, fontSize: 11, fontWeight: 600 }}>↑ Current flag</span>
        </div>
      )}
      <FlagImg src={hf.flagUrl} alt={hf.label} height={160} />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="geo-display font-bold text-sm" style={{ color: T.text }}>{hf.label}</div>
          <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: tint(ACCENT.codex, 0.12), color: ACCENT.codex, border: `1px solid ${tint(ACCENT.codex, 0.25)}`, whiteSpace: 'nowrap', fontFamily: FONT.mono, fontVariantNumeric: 'tabular-nums' }}>
            {yearRange(hf)}
          </span>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: T.muted, lineHeight: 1.65 }}>{hf.note}</p>

        {/* Branch — flags that existed at the same time (e.g. East/West Germany) */}
        {hf.parallel && hf.parallel.length > 0 && (
          <div className="mt-3 pt-3" style={{ borderTop: `1px dashed ${T.lineHi}` }}>
            <div className="flex items-center gap-1.5 mb-2.5">
              <span style={{ color: T.gold, fontSize: 13 }}>⌥</span>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: T.gold }}>
                {hf.parallelCaption ?? 'Flown at the same time'}
              </span>
            </div>
            <div className={`grid gap-2.5 ${hf.parallel.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {hf.parallel.map((p, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ background: T.surfaceHi, border: `1px solid ${T.line}` }}>
                  <FlagImg src={p.flagUrl} alt={p.label} height={90} />
                  <div className="p-2.5">
                    <div className="font-semibold mb-0.5" style={{ color: T.text, fontSize: 12 }}>{p.label}</div>
                    <div className="mb-1" style={{ color: ACCENT.codex, fontSize: 10, fontFamily: FONT.mono, fontVariantNumeric: 'tabular-nums' }}>{yearRange(p)}</div>
                    <p style={{ color: T.muted, fontSize: 10.5, lineHeight: 1.5 }}>{p.note}</p>
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
