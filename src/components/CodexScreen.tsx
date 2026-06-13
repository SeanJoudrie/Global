import { useState, useMemo } from 'react'
import { FLAGS } from '../data/flags'
import type { FlagRecord } from '../data/flags'
import { CAPITALS } from '../data/capitals'
import { CODEX } from '../data/codex'
import type { HistoricalFlag } from '../data/codex'
import { UK_NATIONS } from '../data/ukNations'
import type { UKNation } from '../data/ukNations'
import { TERRITORIES } from '../data/territories'
import type { Territory } from '../data/territories'
import { historicalFor } from '../data/historicalFlags'
import { IDENTITY_FLAGS, IDENTITY_CATEGORIES, SIGNAL_FLAGS } from '../data/identityFlags'
import { US_CITY_FLAGS } from '../data/usCityFlags'
import { CHALLENGE_CONTINENTS } from '../data/challenges'
import type { SubRegion } from '../data/challenges'
import { T, ACCENT, FONT, tint } from '../ui/tokens'
import { ScreenHeader } from './ui'
import { LineIcon } from './icons'
import { Search, Anchor, ChevronDown, Castle, Sun, Mountain, Landmark, MoonStar, Sailboat, Rainbow, Users, Feather, MapPin, Crown, Vote, Building2, HeartHandshake } from 'lucide-react'

// Etched line icon per continent — cartographer style, never emoji.
const REGION_ICONS: Record<string, typeof Castle> = {
  Europe: Castle, Africa: Sun, Asia: Mountain, Americas: Landmark,
  'Middle East': MoonStar, Oceania: Sailboat,
}

// Same etched treatment for the identity collections.
const CAT_ICONS: Record<string, typeof Castle> = {
  'Pride & LGBTQ+': Rainbow, 'Pan-National & Ethnic': Users, 'Indigenous Peoples': Feather,
  'Separatist & Autonomous': MapPin, Micronations: Crown, 'Civic & Ideological': Vote,
}

interface Props {
  onBack?: () => void
  initialCode?: string | null
  /** Rendered inside the dashboard's Codex tab: no back button on the list
   *  view (the bottom tab bar is the navigation). */
  embedded?: boolean
}

const CAPITAL_BY_CODE = new Map(CAPITALS.map(c => [c.code, c.capital]))

const REGION_ORDER = ['Europe', 'Africa', 'Asia', 'Americas', 'Middle East', 'Oceania'] as const

// Look up sub-regions for a country code across all challenge continents
function getSubRegions(code: string) {
  for (const cont of CHALLENGE_CONTINENTS) {
    const country = cont.countries.find(c => c.code === code)
    if (country && country.subRegions.length > 0) return country.subRegions
  }
  return []
}

export default function CodexScreen({ onBack, initialCode, embedded = false }: Props) {
  // A tapped country expands inline beneath its row — browsing never leaves
  // the page, so there's nothing to "go back" from.
  const [selectedCode, setSelectedCode] = useState<string | null>(initialCode ?? null)
  const [search, setSearch] = useState('')
  // Regions start collapsed; store which are expanded
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(() => {
    const f = initialCode != null ? FLAGS.find(x => x.code === initialCode) : null
    return new Set(f ? [f.region] : [])
  })

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

  return (
    <div className="min-h-screen flex flex-col" style={{ background: T.bg, color: T.text, position: 'relative', zIndex: 1 }}>
      {embedded || !onBack ? (
        <header style={{ padding: '14px 16px 10px' }}>
          <h1 className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 20, letterSpacing: '-0.01em', lineHeight: 1.1, margin: 0 }}>Codex</h1>
          <div style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>{FLAGS.length} countries · flag histories in beta</div>
        </header>
      ) : (
        <ScreenHeader title="Codex" subtitle={`${FLAGS.length} countries · flag histories in beta`} onBack={onBack} />
      )}

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
                {/* Region header — open underline row, no box */}
                <button
                  onClick={() => toggleRegion(region)}
                  aria-expanded={isExpanded}
                  className="geo-tap w-full flex items-center justify-between px-1 py-3 transition-all active:scale-[0.99]"
                  style={{
                    background: 'transparent',
                    borderBottom: `1px solid ${isExpanded ? tint(ACCENT.codex, 0.45) : T.line}`,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    {(() => { const Icon = REGION_ICONS[region] ?? Landmark; return <Icon size={15} color={ACCENT.codex} strokeWidth={1.6} absoluteStrokeWidth /> })()}
                    <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: ACCENT.codex }}>{region}</h3>
                    <span className="text-xs" style={{ color: T.dim, fontFamily: FONT.mono, fontVariantNumeric: 'tabular-nums' }}>{flags.length}</span>
                  </div>
                  <ChevronDown size={17} color={ACCENT.codex} strokeWidth={1.6} absoluteStrokeWidth
                    style={{ transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>

                {isExpanded && (
                  <div className="mt-1.5">
                    {flags.map(f => {
                      const open = selectedCode === f.code
                      const capital = CAPITAL_BY_CODE.get(f.code)
                      return (
                        <div key={f.code}>
                          <button
                            onClick={() => setSelectedCode(c => (c === f.code ? null : f.code))}
                            aria-expanded={open}
                            className="geo-tap w-full flex items-center gap-3 px-1.5 py-2.5 rounded-lg transition-all active:scale-[0.99] text-left"
                            style={{ background: open ? tint(ACCENT.codex, 0.07) : 'transparent', borderBottom: `1px solid ${tint(T.line, 0.55)}` }}>
                            {/* Flag thumbnail */}
                            <img
                              src={f.flagUrl}
                              alt={f.name}
                              style={{ width: 46, height: 30, objectFit: 'cover', borderRadius: 5, border: `1px solid ${T.line}`, flexShrink: 0 }}
                              onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm truncate" style={{ color: T.text }}>{f.name}</div>
                              {capital && (
                                <div className="flex items-center gap-1 truncate" style={{ color: T.muted, marginTop: 2, fontSize: 11, opacity: 0.75 }}>
                                  <LineIcon name="capitalquiz" size={10} color={T.muted} />
                                  <span className="truncate">{capital}</span>
                                </div>
                              )}
                            </div>
                            <span style={{ color: ACCENT.codex, fontSize: 18, transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', flexShrink: 0 }}>›</span>
                          </button>
                          {open && <CountryDetail flag={f} />}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })
        )}

        {/* Soft divide: countries above, everything-else collections below */}
        {!isSearching && (
          <div aria-hidden className="flex items-center gap-3" style={{ margin: '28px 2px 6px' }}>
            <span style={{ flex: 1, height: 1, background: T.line }} />
            <span className="geo-micro" style={{ fontSize: 8.5, color: T.dim }}>Beyond countries</span>
            <span style={{ flex: 1, height: 1, background: T.line }} />
          </div>
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

// ── Inline country overview — expands beneath the row so browsing never
// leaves the page. Quick-jot sized: short clamped overview up top, the deep
// dives (history · subdivisions · predecessors) as collapsibles, trivia last.
function CountryDetail({ flag }: { flag: FlagRecord }) {
  const entry = CODEX[flag.code]
  const [sumExpanded, setSumExpanded] = useState(false)
  const [triviaExpanded, setTriviaExpanded] = useState(false)
  const [historyExpanded, setHistoryExpanded] = useState(false)
  const [historyIdx, setHistoryIdx] = useState(0)
  const [subdivisionsExpanded, setSubdivisionsExpanded] = useState(false)
  const [predecessorsExpanded, setPredecessorsExpanded] = useState(false)
  const history = entry?.flagHistory ?? []
  const hasHistory = history.length > 0
  const subRegions = getSubRegions(flag.code)
  const hasSubdivisions = subRegions.length > 0
  const predecessors = historicalFor(flag.code)

  return (
    <div className="carto-slide-up" style={{ margin: '6px 0 10px', padding: 14, borderRadius: 14, background: T.surfaceHi, border: `1px solid ${tint(ACCENT.codex, 0.22)}` }}>
      {/* Flag */}
      <div className="rounded-xl overflow-hidden mb-3" style={{ border: `1px solid ${T.line}` }}>
        <img
          src={flag.flagUrl}
          alt={flag.name}
          style={{ width: '100%', height: 140, objectFit: 'contain', display: 'block', background: T.surface, padding: '8px 0' }}
          onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
        />
      </div>

      {/* Overview — short by default, tap for the full story */}
      {entry?.summary && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: ACCENT.codex }}>Overview</h2>
          <p className="text-xs leading-relaxed" style={{
            color: T.text, fontSize: 12.5, lineHeight: 1.6,
            ...(sumExpanded ? {} : { display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }),
          }}>
            {entry.summary}
          </p>
          <button onClick={() => setSumExpanded(v => !v)} className="text-xs mt-1" style={{ color: ACCENT.codex, background: 'transparent', fontWeight: 600, padding: '2px 0' }}>
            {sumExpanded ? 'show less' : 'read more'}
          </button>
        </div>
      )}

      {/* Subdivisions — collapsible */}
      {hasSubdivisions && (
        <div className="mb-3">
          <button
            onClick={() => setSubdivisionsExpanded(v => !v)}
            aria-expanded={subdivisionsExpanded}
            className="geo-tap w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
            style={{ background: T.surface, border: `1px solid ${tint(T.green, 0.3)}` }}
          >
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: T.green }}>Subdivisions</h2>
              <span className="text-xs" style={{ color: T.muted }}>{subRegions.length} regions</span>
            </div>
            <span style={{ color: T.green, transition: 'transform 0.2s', transform: subdivisionsExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
          </button>

          {subdivisionsExpanded && (
            <SubdivisionGrid
              subRegions={subRegions}
              confirmedNoFlags={NO_SUBDIVISION_FLAG_COUNTRIES.has(flag.code)}
              headerLabel={flag.code === 'IE' ? 'Province' : flag.code === 'GB' ? 'Nation' : undefined}
              memberLabel={flag.code === 'IE' ? 'Counties' : flag.code === 'GB' ? 'Council areas' : undefined}
            />
          )}
        </div>
      )}

      {/* United Kingdom — drill down into its four constituent nations. The one
          country that gets this treatment. */}
      {flag.code === 'GB' && <UKNationsSection />}

      {/* Flag History — collapsible */}
      <div className="mb-3">
        <button
          onClick={() => setHistoryExpanded(v => !v)}
          aria-expanded={historyExpanded}
          className="geo-tap w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
          style={{ background: T.surface, border: `1px solid ${T.line}` }}
        >
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT.codex }}>Flag History</h2>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: tint(T.gold, 0.12), color: T.gold, border: `1px solid ${tint(T.gold, 0.3)}` }}>
              Beta
            </span>
            {hasHistory && (
              <span className="text-xs" style={{ color: T.muted, fontFamily: FONT.mono, fontVariantNumeric: 'tabular-nums' }}>{history.length} flags</span>
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
                <p className="text-sm" style={{ color: T.muted }}>Flag history for {flag.name} is coming soon.</p>
                <p className="text-xs mt-1" style={{ color: T.dim }}>This feature is in beta — we're adding countries one by one.</p>
              </div>
            ) : (
              <div>
                {/* Navigation row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs" style={{ color: T.dim, fontFamily: FONT.mono, fontVariantNumeric: 'tabular-nums' }}>
                    {historyIdx + 1} / {history.length} · newest → oldest
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
                      onClick={() => setHistoryIdx(i => Math.min(history.length - 1, i + 1))}
                      disabled={historyIdx === history.length - 1}
                      className="w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-90"
                      style={{
                        background: T.surface,
                        border: `1px solid ${historyIdx === history.length - 1 ? T.line : tint(ACCENT.codex, 0.4)}`,
                        color: historyIdx === history.length - 1 ? T.dim : ACCENT.codex,
                        opacity: historyIdx === history.length - 1 ? 0.5 : 1,
                        fontSize: 18,
                      }}>›</button>
                  </div>
                </div>

                {/* Main card */}
                <FlagHistoryCard hf={history[historyIdx]} isFirst={historyIdx === 0} />

                {/* Timeline strip */}
                <div className="mt-4">
                  <p className="text-xs mb-2" style={{ color: T.dim }}>Timeline — tap to jump</p>
                  <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6 }}>
                    {history.map((hf: HistoricalFlag, i: number) => (
                      <button key={i} onClick={() => setHistoryIdx(i)}
                        style={{
                          flexShrink: 0, borderRadius: 8, overflow: 'hidden',
                          border: `2px solid ${i === historyIdx ? ACCENT.codex : T.line}`,
                          opacity: i === historyIdx ? 1 : 0.55,
                          transition: 'opacity 0.2s, border-color 0.2s',
                          background: T.surfaceHi,
                        }}>
                        <img src={hf.flagUrl} alt={hf.label}
                          style={{ width: 72, height: 46, objectFit: 'contain', display: 'block', background: T.surfaceHi }}
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
              </div>
            )}
          </div>
        )}
      </div>

      {/* Territories & dependencies — present-day dependent territories */}
      {TERRITORIES[flag.code]?.length > 0 && <TerritoriesSection territories={TERRITORIES[flag.code]} />}

      {/* Predecessor & related states — collapsible */}
      {predecessors.length > 0 && (
        <div className="mb-3">
          <button
            onClick={() => setPredecessorsExpanded(v => !v)}
            aria-expanded={predecessorsExpanded}
            className="geo-tap w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
            style={{ background: T.surface, border: `1px solid ${tint(T.warm, 0.3)}` }}
          >
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: T.warm }}>Predecessor & Related States</h2>
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
                    <FlagImg src={h.flagUrl} alt={h.name} height={120} />
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

      {/* Trivia — quiet expandable; just the label and an arrow until opened */}
      {(flag.funFact || flag.distinguishingTip) && (
        <div>
          <button onClick={() => setTriviaExpanded(v => !v)} aria-expanded={triviaExpanded}
            className="geo-tap w-full flex items-center justify-between px-1 py-2"
            style={{ background: 'transparent' }}>
            <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5" style={{ color: T.gold }}>
              <LineIcon name="funfact" size={13} color={T.gold} /> Did you know?
            </span>
            <ChevronDown size={15} color={T.gold} strokeWidth={1.6} absoluteStrokeWidth
              style={{ transition: 'transform 0.2s', transform: triviaExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>
          {triviaExpanded && (
            <div className="carto-slide-up">
              {flag.funFact && (
                <p className="text-xs leading-relaxed px-1 pt-1" style={{ color: T.text, lineHeight: 1.6 }}>{flag.funFact}</p>
              )}
              {flag.distinguishingTip && (
                <div className="mt-2.5 rounded-xl" style={{ background: T.surface, border: `1px solid ${T.line}`, padding: '10px 12px' }}>
                  <div className="text-xs font-semibold mb-1" style={{ color: ACCENT.codex }}>How to tell it apart</div>
                  <p className="text-xs leading-relaxed" style={{ color: T.muted, lineHeight: 1.6 }}>{flag.distinguishingTip}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── United Kingdom drill-down — England · Scotland · Wales · N. Ireland ──
// The UK is effectively four nations; clicking it opens a purple-outlined
// section where each constituent country expands into its own flag history
// (Wessex, Mercia, the Lion Rampant, Glyndŵr's banner…).
function UKNationsSection() {
  const [open, setOpen] = useState(false)
  const [openNation, setOpenNation] = useState<string | null>(null)
  return (
    <div className="mb-3">
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="geo-tap w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
        style={{ background: tint(T.violet, 0.08), border: `1px solid ${tint(T.violet, 0.5)}` }}
      >
        <div className="flex items-center gap-2 text-left">
          <Crown size={15} color={T.violet} strokeWidth={1.6} absoluteStrokeWidth />
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: T.violet }}>Constituent Nations</h2>
            <span className="text-xs" style={{ color: tint(T.violet, 0.75) }}>
              {open ? 'England · Scotland · Wales · N. Ireland' : 'Click here to expand — 4 nations'}
            </span>
          </div>
        </div>
        <span style={{ color: T.violet, transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
      </button>

      {open && (
        <div className="mt-2.5 space-y-2">
          {UK_NATIONS.map(nation => {
            const isOpen = openNation === nation.key
            const current = nation.flagHistory[0]
            return (
              <div key={nation.key} className="rounded-xl overflow-hidden" style={{ background: T.surface, border: `1px solid ${isOpen ? tint(T.violet, 0.45) : T.line}` }}>
                <button
                  onClick={() => setOpenNation(o => o === nation.key ? null : nation.key)}
                  aria-expanded={isOpen}
                  className="geo-tap w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all active:scale-[0.99]"
                  style={{ background: isOpen ? tint(T.violet, 0.06) : 'transparent' }}
                >
                  <img src={current.flagUrl} alt={nation.name}
                    style={{ width: 46, height: 30, objectFit: 'contain', borderRadius: 5, border: `1px solid ${T.line}`, flexShrink: 0, background: T.surfaceHi }}
                    onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate" style={{ color: T.text }}>{nation.name}</div>
                    <div className="text-xs truncate" style={{ color: T.muted, marginTop: 1 }}>{nation.emblem}</div>
                  </div>
                  <span className="text-xs" style={{ color: tint(T.violet, 0.8), fontFamily: FONT.mono, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{nation.flagHistory.length} flags</span>
                  <span style={{ color: T.violet, fontSize: 16, transition: 'transform 0.2s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', flexShrink: 0 }}>›</span>
                </button>
                {isOpen && (
                  <div className="px-3 pb-3 pt-1">
                    <NationHistory nation={nation} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// A compact flag-history browser for one UK nation — selected card + tappable
// timeline strip, reusing the same FlagHistoryCard as the country view.
function NationHistory({ nation }: { nation: UKNation }) {
  const [idx, setIdx] = useState(0)
  const history = nation.flagHistory
  return (
    <div>
      <FlagHistoryCard hf={history[idx]} isFirst={idx === 0} />
      <div className="mt-3">
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6 }}>
          {history.map((hf, i) => (
            <button key={i} onClick={() => setIdx(i)}
              style={{
                flexShrink: 0, borderRadius: 8, overflow: 'hidden',
                border: `2px solid ${i === idx ? T.violet : T.line}`,
                opacity: i === idx ? 1 : 0.55,
                transition: 'opacity 0.2s, border-color 0.2s',
                background: T.surfaceHi,
              }}>
              <img src={hf.flagUrl} alt={hf.label}
                style={{ width: 72, height: 46, objectFit: 'contain', display: 'block', background: T.surfaceHi }}
                onError={e => { (e.target as HTMLImageElement).style.opacity = '0.15' }} />
              <div style={{ padding: '3px 5px', textAlign: 'center', background: T.surface }}>
                <span style={{ fontSize: 9, fontFamily: FONT.mono, color: i === idx ? T.violet : T.dim, fontWeight: 600 }}>{hf.fromYear}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Territories & dependencies — present-day dependent territories ──
// Crown Dependencies & British Overseas Territories under the UK, the Caribbean
// constituent countries under the Netherlands, French overseas collectivities,
// US insular areas, etc. Grouped where the data carries a `group` label.
function TerritoriesSection({ territories }: { territories: Territory[] }) {
  const [open, setOpen] = useState(false)
  // Preserve insertion order while collecting groups.
  const groups: { label: string | undefined; items: Territory[] }[] = []
  for (const t of territories) {
    let g = groups.find(g => g.label === t.group)
    if (!g) { g = { label: t.group, items: [] }; groups.push(g) }
    g.items.push(t)
  }
  return (
    <div className="mb-3">
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="geo-tap w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
        style={{ background: T.surface, border: `1px solid ${tint(T.cyan, 0.35)}` }}
      >
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: T.cyan }}>Territories &amp; Dependencies</h2>
          <span className="text-xs" style={{ color: T.muted }}>{territories.length}</span>
        </div>
        <span style={{ color: T.cyan, transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
      </button>

      {open && (
        <div className="mt-3">
          <p className="text-xs mb-3" style={{ color: tint(T.cyan, 0.75) }}>
            Present-day territories and dependencies — self-governing or administered, but not sovereign countries of their own.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {groups.map((g, gi) => (
              <div key={gi}>
                {g.label && (
                  <div style={{ fontSize: 10, fontWeight: 700, color: T.cyan, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, paddingLeft: 2 }}>
                    {g.label}
                  </div>
                )}
                <div className="space-y-2.5">
                  {g.items.map((t, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden" style={{ background: T.surface, border: `1px solid ${tint(T.cyan, 0.2)}` }}>
                      <div className="flex items-stretch gap-0">
                        <div style={{ width: 96, flexShrink: 0, background: T.surfaceHi, borderRight: `1px solid ${T.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8 }}>
                          {t.noFlag ? (
                            <span style={{ fontSize: 9, fontWeight: 700, color: T.dim, textAlign: 'center', lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: '0.04em' }}>No flag</span>
                          ) : (
                            <img src={t.flagUrl} alt={t.name}
                              style={{ width: '100%', maxHeight: 56, objectFit: 'contain', borderRadius: 3 }}
                              onError={e => { (e.target as HTMLImageElement).style.opacity = '0.25' }} />
                          )}
                        </div>
                        <div className="p-3 min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="geo-display font-bold text-sm" style={{ color: T.text }}>{t.name}</div>
                          </div>
                          <span className="text-xs px-2 py-0.5 rounded-full inline-block mb-1.5"
                            style={{ background: tint(T.cyan, 0.12), color: T.cyan, border: `1px solid ${tint(T.cyan, 0.25)}`, whiteSpace: 'nowrap' }}>
                            {t.status}
                          </span>
                          <p className="text-xs leading-relaxed" style={{ color: T.muted, lineHeight: 1.6 }}>{t.note}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
        className="geo-tap w-full flex items-center justify-between px-1 py-3 transition-all active:scale-[0.99]"
        style={{ background: 'transparent', borderBottom: `1px solid ${sectionOpen ? tint(T.warm, 0.45) : T.line}` }}>
        <div className="text-left">
          <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: T.warm }}>
            <HeartHandshake size={15} color={T.warm} strokeWidth={1.6} absoluteStrokeWidth /> Identity &amp; Other Flags
          </h3>
          <p className="text-xs" style={{ color: T.dim }}>{IDENTITY_FLAGS.length - SIGNAL_FLAGS.length} flags beyond countries</p>
        </div>
        <ChevronDown size={17} color={T.warm} strokeWidth={1.6} absoluteStrokeWidth
          style={{ transition: 'transform 0.2s', transform: sectionOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }} />
      </button>

      {sectionOpen && <div className="mt-3" />}
      {sectionOpen && IDENTITY_CATEGORIES.map(cat => {
        const flags = IDENTITY_FLAGS.filter(f => f.category === cat)
        const isOpen = openCat === cat
        return (
          <div key={cat} className="mb-3">
            <button
              onClick={() => setOpenCat(o => o === cat ? null : cat)}
              aria-expanded={isOpen}
              className="geo-tap w-full flex items-center justify-between px-1 py-3 transition-all active:scale-[0.99]"
              style={{ background: 'transparent', borderBottom: `1px solid ${isOpen ? tint(T.warm, 0.45) : T.line}` }}>
              <div className="flex items-center gap-2.5">
                {(() => { const Icon = CAT_ICONS[cat] ?? Users; return <Icon size={15} color={T.warm} strokeWidth={1.6} absoluteStrokeWidth /> })()}
                <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: T.warm }}>{cat}</h3>
                <span className="text-xs" style={{ color: T.dim, fontFamily: FONT.mono, fontVariantNumeric: 'tabular-nums' }}>{flags.length}</span>
              </div>
              <ChevronDown size={16} color={T.warm} strokeWidth={1.6} absoluteStrokeWidth
                style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }} />
            </button>
            {isOpen && (
              <div className="mt-1.5 space-y-1.5">
                {flags.map(f => {
                  const showNote = openFlag === f.id
                  return (
                    <button key={f.id} onClick={() => setOpenFlag(o => o === f.id ? null : f.id)}
                      className="geo-tap w-full px-1.5 py-2.5 rounded-lg transition-all active:scale-[0.99] text-left"
                      style={{ background: showNote ? tint(T.warm, 0.07) : 'transparent', borderBottom: `1px solid ${tint(T.line, 0.55)}` }}>
                      <div className="flex items-center gap-3">
                        {f.noFlag ? (
                          <div style={{ width: 46, height: 30, borderRadius: 5, border: `1px dashed ${T.line}`, flexShrink: 0, background: T.surfaceHi, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: 7.5, fontWeight: 700, color: T.dim, textAlign: 'center', lineHeight: 1.1, textTransform: 'uppercase', letterSpacing: '0.03em' }}>No flag</span>
                          </div>
                        ) : (
                          <img src={f.flagUrl} alt={f.name}
                            style={{ width: 46, height: 30, objectFit: 'contain', borderRadius: 5, border: `1px solid ${T.line}`, flexShrink: 0, background: T.surfaceHi }}
                            onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
                        )}
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
        className="geo-tap w-full flex items-center justify-between px-1 py-3 transition-all active:scale-[0.99]"
        style={{ background: 'transparent', borderBottom: `1px solid ${open ? tint(T.cyan, 0.45) : T.line}` }}>
        <div className="text-left">
          <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: T.cyan }}>
            <Building2 size={15} color={T.cyan} strokeWidth={1.6} absoluteStrokeWidth /> American Cities <span style={{ color: tint(T.cyan, 0.6), fontSize: 10 }}>(Beta)</span>
          </h3>
          <p className="text-xs" style={{ color: T.dim }}>{cities.length} U.S. municipal flags</p>
        </div>
        <ChevronDown size={17} color={T.cyan} strokeWidth={1.6} absoluteStrokeWidth
        style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }} />
      </button>
      {open && (
        <div className="mt-1.5 space-y-1.5">
          {cities.map(f => {
            const showNote = openFlag === f.id
            return (
              <button key={f.id} onClick={() => setOpenFlag(o => o === f.id ? null : f.id)}
                className="geo-tap w-full px-1.5 py-2.5 rounded-lg transition-all active:scale-[0.99] text-left"
                style={{ background: showNote ? tint(T.cyan, 0.07) : 'transparent', borderBottom: `1px solid ${tint(T.line, 0.55)}` }}>
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
        className="geo-tap w-full flex items-center justify-between px-1 py-3 transition-all active:scale-[0.99]"
        style={{ background: 'transparent', borderBottom: `1px solid ${open ? tint(T.cyan, 0.45) : T.line}` }}>
        <div className="text-left">
          <h3 className="text-sm font-bold uppercase tracking-widest"
            style={{ color: T.cyan, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Anchor size={14} color={T.cyan} strokeWidth={1.6} absoluteStrokeWidth /> Signal &amp; Maritime Flags
          </h3>
          <p className="text-xs" style={{ color: T.dim }}>{SIGNAL_FLAGS.length} international code / phonetic flags</p>
        </div>
        <ChevronDown size={17} color={T.cyan} strokeWidth={1.6} absoluteStrokeWidth
        style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }} />
      </button>
      {open && (
        <div className="mt-2 space-y-1.5">
          {SIGNAL_FLAGS.map(f => {
            const showNote = openFlag === f.id
            return (
              <button key={f.id} onClick={() => setOpenFlag(o => o === f.id ? null : f.id)}
                className="geo-tap w-full px-1.5 py-2.5 rounded-lg transition-all active:scale-[0.99] text-left"
                style={{ background: showNote ? tint(T.cyan, 0.07) : 'transparent', borderBottom: `1px solid ${tint(T.line, 0.55)}` }}>
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
        style={{ width: '100%', height, objectFit: 'contain', display: 'block', background: T.surfaceHi }}
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
