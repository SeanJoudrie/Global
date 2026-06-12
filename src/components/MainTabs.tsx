import { useState, useRef, lazy, Suspense } from "react"
import type { ReactNode } from "react"
import worldMap from "@svg-maps/world"
import { FLAGS } from "../data/flags"
import type { AppState } from "../utils/storage"
import { todayString } from "../utils/prng"
import { T, ACCENT, FONT, tint, IS_CARTO } from "../ui/tokens"
import { groupsFor, REGISTRY, recommendFor, discoverGames, trendingGames } from "../ui/registry"
import type { Entry, TabKey } from "../ui/registry"
import { TabBar, ModuleCard, GameTile, FlagTile, StatPill, SectionHeader, ProgressRing } from "./ui"
import { LineIcon, FlameIcon, ChevronDownIcon, FlaskIcon, SearchIcon, ShuffleIcon, CompassIcon, SparklesIcon, HistoryIcon, TrendingUpIcon } from "./icons"
import FlagImage from "./FlagImage"
import { GamePoster } from "./GamePoster"

// Faint antique world-map backdrop (Cartographer skin only). Fixed to the
// viewport so it stays put while the page scrolls; heavily blurred, very low
// opacity, and feathered on every edge so there's no hard boundary.
//
// Prefers a real map photo at /world-map.jpg (drop your vintage-map image into
// public/ and it's used automatically); falls back to the vector world map
// until that file exists.
function MapBackdrop() {
  const soft = "radial-gradient(108% 108% at 50% 44%, #000 0%, #000 38%, rgba(0,0,0,0.5) 64%, transparent 84%)"
  const [usePhoto, setUsePhoto] = useState(true)
  return (
    <div aria-hidden style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
      opacity: usePhoto ? 0.13 : 0.1, filter: "blur(3px)",
      WebkitMaskImage: soft, maskImage: soft,
      display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
    }}>
      {usePhoto ? (
        <img src="/world-map.jpg" alt="" onError={() => setUsePhoto(false)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : (
        <svg viewBox={(worldMap as { viewBox: string }).viewBox} preserveAspectRatio="xMidYMid meet"
          style={{ width: "172%", minWidth: 720, maxWidth: "none", display: "block" }}>
          {(worldMap as { locations: { id: string; path: string }[] }).locations.map(l => (
            <path key={l.id} d={l.path} fill="#8C7A5A" />
          ))}
        </svg>
      )}
    </div>
  )
}

// The Codex tab renders the real Codex directly (no launcher page between).
// Lazy so the dashboard bundle stays lean — same chunk App.tsx already splits.
const CodexScreenLazy = lazy(() => import("./CodexScreen"))

interface Props {
  state: AppState
  tab: TabKey
  onTab: (t: TabKey) => void
  onNavigate: (screen: string) => void
  onQuickPlay: () => void
  onStartDaily: () => void
  onReverseQuiz: () => void
}

const dayIdx = Math.floor(Date.now() / 86400000)
const weekIdx = Math.floor(Date.now() / (7 * 86400000))

// Lightweight recently-played memory (ids only) so a favourite game is one tap
// away instead of a re-swipe through the shelves. Separate key from AppState —
// purely presentational, safe to lose.
const RECENT_KEY = "globalio_recent_games"
function loadRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]") as string[] } catch { return [] }
}
function pushRecent(id: string) {
  try {
    const next = [id, ...loadRecent().filter(x => x !== id)].slice(0, 8)
    localStorage.setItem(RECENT_KEY, JSON.stringify(next))
  } catch { /* ignore */ }
}

export default function MainTabs({ state, tab, onTab, onNavigate, onQuickPlay, onStartDaily, onReverseQuiz }: Props) {
  const today = todayString()
  const dailyDone = state.lastDailyDate === today

  const launch = (e: Entry) => {
    pushRecent(e.id)
    if (e.action === "quickplay") return onQuickPlay()
    if (e.action === "reverse") return onReverseQuiz()
    if (e.action === "daily") return onStartDaily()
    onNavigate(e.id)
  }

  const learned = state.learnedFlags.length

  return (
    <div className={IS_CARTO ? "carto-paper" : "geo-grid"} style={{ minHeight: "100vh", position: "relative", zIndex: 1, background: IS_CARTO ? T.bg : undefined }}>
      {IS_CARTO ? <MapBackdrop /> : <div className="geo-vignette" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />}

      {/* ── Shared header: wordmark · live streak · system actions ── */}
      <header style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ width: 9, height: 9, borderRadius: IS_CARTO ? "50%" : 2, background: ACCENT.today, boxShadow: IS_CARTO ? "none" : `0 0 8px ${ACCENT.today}`, display: "inline-block" }} />
          <span className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: IS_CARTO ? 22 : 18, letterSpacing: IS_CARTO ? "0.01em" : "0.02em" }}>
            {IS_CARTO ? "Globalio" : "GLOBALIO"}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Today already opens on a big streak celebration — don't show it twice */}
          {tab !== "today" && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: IS_CARTO ? 999 : 8, background: T.surface, border: `1px solid ${tint(T.amber, IS_CARTO ? 0.45 : 0.3)}` }}>
              {IS_CARTO ? <FlameIcon size={13} color={T.amber} strokeWidth={1.7} /> : <span style={{ fontSize: 12 }}>🔥</span>}
              <span style={{ fontFamily: FONT.mono, fontWeight: IS_CARTO ? 600 : 800, fontSize: 14, color: T.amber, letterSpacing: "-0.02em" }}>{state.currentStreak}</span>
            </div>
          )}
          <button onClick={() => onNavigate("settings")} aria-label="Settings" className="geo-tap"
            style={{ width: 44, height: 44, borderRadius: IS_CARTO ? 999 : 8, background: T.surface, border: `1px solid ${T.line}`, color: T.muted, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {IS_CARTO ? <LineIcon name="settings" size={18} color={T.muted} /> : "⚙"}
          </button>
        </div>
      </header>

      <main style={{ position: "relative", padding: tab === "codex" ? "0 0 96px" : "8px 16px 96px" }}>
        {tab === "today" && (
          <TodayTab state={state} dailyDone={dailyDone} launch={launch}
            onNavigate={onNavigate} onGoCodex={() => onTab("codex")} onGoPlay={() => onTab("play")}
            onQuickPlay={onQuickPlay} onStartDaily={onStartDaily} />
        )}
        {tab === "play" && <PlayTab launch={launch} state={state} />}
        {tab === "codex" && (
          <Suspense fallback={<div style={{ padding: 48, textAlign: "center", color: T.dim, fontSize: 13 }}>Opening the codex…</div>}>
            <CodexScreenLazy embedded />
          </Suspense>
        )}
        {tab === "you" && <YouTab state={state} learned={learned} onNavigate={onNavigate} />}
      </main>

      <TabBar active={tab} onChange={onTab} />
    </div>
  )
}

/* ── TODAY — the hook. Stripped to a streak celebration, one massive primary
   action, a secondary Quick Play and a sleek Flag of the Day card. ────────── */
function TodayTab({ state, dailyDone, launch, onNavigate, onGoCodex, onGoPlay, onQuickPlay, onStartDaily }: {
  state: AppState; dailyDone: boolean; launch: (e: Entry) => void
  onNavigate: (s: string) => void; onGoCodex: () => void; onGoPlay: () => void; onQuickPlay: () => void; onStartDaily: () => void
}) {
  const fotd = FLAGS[dayIdx % FLAGS.length]
  const dyk = FLAGS[(dayIdx * 7 + 3) % FLAGS.length]
  const gameCount = REGISTRY.filter(r => r.tab === "play").length
  const todayResult = state.dailyHistory[todayString()]
  const recent = loadRecent().map(id => REGISTRY.find(r => r.id === id)).filter((e): e is Entry => !!e)
  const dailyRituals = ["gacha", "funfact"].map(id => REGISTRY.find(r => r.id === id)).filter((e): e is Entry => !!e)
  return (
    <div className={IS_CARTO ? "carto-slide-up" : undefined} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Streak celebration */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "4px 2px" }}>
        <div className={IS_CARTO ? "carto-pulse" : undefined} style={{
          width: 54, height: 54, borderRadius: "50%", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: tint(ACCENT.today, 0.14), border: `1px solid ${tint(ACCENT.today, 0.34)}`,
        }}>
          {IS_CARTO ? <FlameIcon size={26} color={ACCENT.today} strokeWidth={1.6} /> : <span style={{ fontSize: 24 }}>🔥</span>}
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
            <span style={{ fontFamily: FONT.mono, fontVariantNumeric: "tabular-nums", fontWeight: 800, fontSize: 34, letterSpacing: "-0.04em", color: ACCENT.today, lineHeight: 1 }}>{state.currentStreak}</span>
            <span className="geo-display" style={{ fontWeight: 700, fontSize: 18, color: T.text }}>day streak</span>
          </div>
          <div style={{ color: T.muted, fontSize: 12, marginTop: 3 }}>Best run {state.longestStreak} · keep the map lit</div>
        </div>
      </div>

      {/* Hero carousel — the Daily Expedition up front, old-style adverts behind
          (the arcade, personalisation, a daily fact). Swipe to browse. */}
      <HeroDeck accent={ACCENT.play}>
      <button onClick={dailyDone ? undefined : onStartDaily} className={`${dailyDone ? "" : "geo-tap"} ${IS_CARTO ? "carto-card" : ""}`}
        aria-disabled={dailyDone || undefined}
        style={{
          flex: 1, position: "relative", overflow: "hidden", padding: "22px 20px", borderRadius: 16, textAlign: "left",
          border: `1px solid ${tint(dailyDone ? T.green : ACCENT.play, 0.36)}`,
          background: `linear-gradient(150deg, ${tint(dailyDone ? T.green : ACCENT.play, 0.16)}, ${T.surface} 70%)`,
          cursor: dailyDone ? "default" : "pointer",
          ...(IS_CARTO ? { ["--wash" as string]: tint(dailyDone ? T.green : ACCENT.play, 0.42) } : {}),
        }}>
        <div style={{ position: "absolute", right: -18, bottom: -22, opacity: 0.12, color: dailyDone ? T.green : ACCENT.play, pointerEvents: "none" }}>
          {IS_CARTO ? <LineIcon name="today" size={132} color={dailyDone ? T.green : ACCENT.play} strokeWidth={1.1} /> : <span style={{ fontSize: 110 }}>🧭</span>}
        </div>
        <div className="geo-micro" style={{ fontSize: 9, color: dailyDone ? T.green : ACCENT.play, marginBottom: 8 }}>◦ Today's expedition</div>
        <div className="geo-display" style={{ fontWeight: 800, fontSize: 30, lineHeight: 1.02, letterSpacing: "-0.02em", color: T.text, maxWidth: 240 }}>
          Daily Expedition
        </div>
        <div style={{ color: T.muted, fontSize: 12.5, marginTop: 6, maxWidth: 220 }}>
          {dailyDone ? "Logged for today — a fresh expedition lands tomorrow." : "Ten flags from across the world. One run, once a day."}
        </div>
        <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 20px", borderRadius: 999, background: dailyDone ? T.green : ACCENT.play, color: T.onAccent }}>
          <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 15 }}>
            {dailyDone ? (todayResult ? `✓ ${todayResult.score}/${todayResult.total} today` : "✓ Done today") : "Start"}
          </span>
          {!dailyDone && <span style={{ fontSize: 16 }}>→</span>}
        </div>
      </button>
      <AdSlide accent={ACCENT.challenge} glyph="play" eyebrow="The Arcade"
        title={`${gameCount} games, one arcade`}
        body="Daily puzzles, brain benders, geography drills — every shelf swipes."
        cta="Browse games" onClick={onGoPlay} />
      <AdSlide accent={ACCENT.learn} glyph="settings" eyebrow="Make it yours"
        title="Your map, your colours"
        body="Parchment, tactical or classic purple — switch the whole look in Settings."
        cta="Open settings" onClick={() => onNavigate("settings")} />
      <AdSlide accent={ACCENT.codex} glyph="funfact" eyebrow="Did you know?"
        title={dyk.name}
        body={dyk.funFact}
        cta="More fun facts" onClick={() => onNavigate("funfact")} />
      </HeroDeck>

      {/* Secondary quick play */}
      <button onClick={onQuickPlay} className={`geo-tap ${IS_CARTO ? "carto-card" : ""}`}
        style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 16px", borderRadius: 12, textAlign: "left",
          ...(IS_CARTO ? { ["--wash" as string]: tint(ACCENT.today, 0.4) } : { background: T.surface, border: `1px solid ${T.line}` }) }}>
        <span style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
          background: tint(ACCENT.today, 0.12), border: `1px solid ${tint(ACCENT.today, 0.28)}` }}>
          {IS_CARTO ? <LineIcon name="quickplay" size={20} color={ACCENT.today} /> : <span style={{ fontSize: 18 }}>⚡</span>}
        </span>
        <div style={{ flex: 1 }}>
          <div className="geo-display" style={{ fontWeight: 600, fontSize: 15, color: T.text }}>Quick Play</div>
          <div style={{ color: T.muted, fontSize: 11.5, marginTop: 1 }}>10 random flags · instant, no streak</div>
        </div>
        <span style={{ color: ACCENT.today, fontSize: 18, opacity: 0.7 }}>→</span>
      </button>

      {/* Daily rituals — Flag Gacha & Fun Fact, promoted from the arcade */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {dailyRituals.map(e => (
          <button key={e.id} onClick={() => launch(e)} className={`geo-tap ${IS_CARTO ? "carto-card" : ""}`}
            style={{
              textAlign: "left", padding: 14, borderRadius: 14, position: "relative", overflow: "hidden",
              border: `1px solid ${tint(ACCENT[e.accent], 0.36)}`,
              background: `linear-gradient(150deg, ${tint(ACCENT[e.accent], 0.14)}, ${T.surface} 75%)`,
              ...(IS_CARTO ? { ["--wash" as string]: tint(ACCENT[e.accent], 0.4) } : {}),
            }}>
            <div style={{ marginBottom: 18, color: ACCENT[e.accent], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <LineIcon name={e.id} size={22} color={ACCENT[e.accent]} />
              <span style={{ width: 22, height: 22, borderRadius: 999, background: ACCENT[e.accent], color: T.onAccent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800 }}>→</span>
            </div>
            <div className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 15 }}>{e.title}</div>
            <div style={{ color: T.muted, fontSize: 10.5, marginTop: 2 }}>{e.subtitle}</div>
          </button>
        ))}
      </div>

      {/* Jump back in — recently played, promoted from the arcade */}
      {recent.length > 0 && (
        <div>
          <SectionHeader title="Jump back in" accent={ACCENT.play} />
          <div className="carto-rail" style={{ display: "flex", gap: 10, overflowX: "auto", margin: "0 -16px", padding: "2px 16px 6px" }}>
            {recent.map(e => (
              <GameTile key={e.id} icon={e.icon} glyph={e.id} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]} onClick={() => launch(e)} />
            ))}
          </div>
        </div>
      )}

      {/* Flag of the Day — sleek premium card */}
      <div>
        <SectionHeader title="Flag of the Day" accent={ACCENT.codex} />
        <button onClick={onGoCodex} className={`geo-tap ${IS_CARTO ? "carto-card" : ""}`}
          style={{ width: "100%", textAlign: "left", borderRadius: 16, padding: 16, display: "flex", gap: 14, alignItems: "center", position: "relative", overflow: "hidden",
            ...(IS_CARTO ? { ["--wash" as string]: tint(ACCENT.codex, 0.4) } : { background: T.surface, border: `1px solid ${T.line}` }) }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="geo-micro" style={{ fontSize: 9, color: ACCENT.codex, marginBottom: 5 }}>◦ {fotd.region}</div>
            <div className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 22, lineHeight: 1.05 }}>{fotd.name}</div>
            <p style={{ color: T.muted, fontSize: 12, marginTop: 5, lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{fotd.funFact}</p>
            <div className="geo-micro" style={{ fontSize: 8.5, color: ACCENT.codex, marginTop: 10 }}>Open in codex →</div>
          </div>
          <div style={{ flexShrink: 0, width: 104, height: 70, borderRadius: 10, overflow: "hidden", border: `1px solid ${T.line}`, boxShadow: `0 4px 12px -6px ${tint(T.text, 0.35)}` }}>
            <FlagImage code={fotd.code} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </button>
      </div>

      {/* Resume */}
      <div>
        <SectionHeader title="Pick up where you left off" accent={ACCENT.learn} />
        <ModuleCard icon="🚩" glyph="flags" title="Flag Sets" subtitle="Country, historical & identity sets" accent={ACCENT.learn}
          progress={{ done: state.learnedFlags.length, total: FLAGS.length }} onClick={() => onNavigate("flags")} />
      </div>
    </div>
  )
}

/* ── Hero deck: full-width snap carousel with dot indicators ────────────── */
function HeroDeck({ children, accent }: { children: ReactNode[]; accent: string }) {
  const [idx, setIdx] = useState(0)
  return (
    <div>
      <div className="carto-rail"
        onScroll={e => {
          const el = e.currentTarget
          const first = el.firstElementChild as HTMLElement | null
          const w = (first?.offsetWidth ?? el.clientWidth) + 12
          setIdx(Math.max(0, Math.min(children.length - 1, Math.round(el.scrollLeft / w))))
        }}
        style={{ display: "flex", gap: 12, overflowX: "auto", scrollSnapType: "x mandatory", margin: "0 -16px", padding: "0 16px" }}>
        {children.map((c, i) => (
          <div key={i} style={{ flex: "0 0 100%", scrollSnapAlign: "center", display: "flex" }}>{c}</div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10 }} aria-hidden>
        {children.map((_, i) => (
          <span key={i} style={{
            width: i === idx ? 18 : 6, height: 6, borderRadius: 3,
            background: i === idx ? accent : T.line,
            transition: "width 0.25s, background 0.2s",
          }} />
        ))}
      </div>
    </div>
  )
}

/* One advert slide — mirrors the Daily Expedition card's shape so the deck
   reads as a single rotating hero. */
function AdSlide({ accent, glyph, eyebrow, title, body, cta, onClick }: {
  accent: string; glyph: string; eyebrow: string; title: string; body: string; cta: string; onClick: () => void
}) {
  return (
    <button onClick={onClick} className={`geo-tap ${IS_CARTO ? "carto-card" : ""}`}
      style={{
        flex: 1, position: "relative", overflow: "hidden", padding: "22px 20px", borderRadius: 16, textAlign: "left",
        border: `1px solid ${tint(accent, 0.36)}`,
        background: `linear-gradient(150deg, ${tint(accent, 0.16)}, ${T.surface} 70%)`,
        ...(IS_CARTO ? { ["--wash" as string]: tint(accent, 0.42) } : {}),
      }}>
      <div style={{ position: "absolute", right: -18, bottom: -22, opacity: 0.12, color: accent, pointerEvents: "none" }}>
        <LineIcon name={glyph} size={132} color={accent} strokeWidth={1.1} />
      </div>
      <div className="geo-micro" style={{ fontSize: 9, color: accent, marginBottom: 8 }}>◦ {eyebrow}</div>
      <div className="geo-display" style={{ fontWeight: 800, fontSize: 26, lineHeight: 1.05, letterSpacing: "-0.02em", color: T.text, maxWidth: 250 }}>
        {title}
      </div>
      <div style={{
        color: T.muted, fontSize: 12.5, marginTop: 6, maxWidth: 240, lineHeight: 1.5,
        display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>{body}</div>
      <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 20px", borderRadius: 999, background: accent, color: T.onAccent }}>
        <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 15 }}>{cta}</span>
        <span style={{ fontSize: 16 }}>→</span>
      </div>
    </button>
  )
}

/* ── PLAY — the game browser. A flag-forward Game-of-the-Day hero sits above
   the fold (one tap to play), then locally-derived personal rails (jump back
   in · because-you-played · most loved), the learning spine, the full
   catalogue by category, and a daily discovery rail. The rough/niche games
   live in the collapsible Beta Sandbox at the very bottom — nothing is ever
   deleted, only re-ranked. ─────────────────────────────────────────────── */
function PlayTab({ launch, state }: { launch: (e: Entry) => void; state: AppState }) {
  const [sandboxOpen, setSandboxOpen] = useState(false)
  const [q, setQ] = useState("")
  const [activeGroup, setActiveGroup] = useState<string | null>(null)

  const all = REGISTRY.filter(r => r.tab === "play")
  const playable = all.filter(r => !r.sandbox)
  const sandbox = all.filter(r => r.sandbox)
  const featured = playable.filter(r => r.featured)
  const categoryGroups = groupsFor("play").filter(g => !g.entries[0].sandbox)

  // Local personalization, all derived on-device from recently-played ids.
  const recentIds = loadRecent()
  const recents = recentIds.map(id => all.find(r => r.id === id)).filter((e): e is Entry => !!e)
  const rec = recommendFor(recentIds)
  const discover = discoverGames(recentIds, dayIdx)
  // Trending deck — featured A-tier games lead, then a stable weekly rotation.
  const trending = trendingGames(weekIdx)

  const shuffle = () => launch(playable[Math.floor(Math.random() * playable.length)])

  const learned = state.learnedFlags.length
  const learnPct = FLAGS.length ? Math.round((learned / FLAGS.length) * 100) : 0

  // Browse vs. filter: a search query or a non-"All" chip collapses the shelves
  // into a flat result grid. Search spans the *whole* catalogue (sandbox too)
  // so every game stays findable by name. "Popular" is the hand-picked set.
  const POPULAR = "__popular"
  const query = q.trim().toLowerCase()
  const filtering = !!query || activeGroup !== null
  const filtered = query
    ? all.filter(r => `${r.title} ${r.subtitle}`.toLowerCase().includes(query))
    : activeGroup === POPULAR
      ? featured
      : activeGroup
        ? all.filter(r => r.group === activeGroup)
        : []

  const chips: { label: string; group: string | null }[] = [
    { label: "All", group: null },
    { label: "Popular", group: POPULAR },
    ...categoryGroups.map(g => ({ label: g.group, group: g.group })),
  ]
  const selectChip = (group: string | null) => { setActiveGroup(group); setQ("") }

  return (
    <div className={IS_CARTO ? "carto-slide-up" : undefined} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Title + Surprise me (variable-reward shuffle across the whole catalogue) */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div className="geo-display" style={{ fontWeight: 800, fontSize: 26, letterSpacing: "-0.02em", color: T.text }}>Play</div>
          <div style={{ color: T.muted, fontSize: 12.5, marginTop: 3 }}>
            <span style={{ fontFamily: FONT.mono, fontWeight: 700, color: ACCENT.play }}>{playable.length}</span> games · one tap to dive in
          </div>
        </div>
        <button onClick={shuffle} className="geo-tap" aria-label="Surprise me — play a random game"
          style={{ display: "flex", alignItems: "center", gap: 7, padding: "11px 16px", borderRadius: 999, flexShrink: 0,
            background: tint(ACCENT.play, 0.12), border: `1px solid ${tint(ACCENT.play, 0.35)}`, color: ACCENT.play }}>
          <ShuffleIcon size={15} color={ACCENT.play} strokeWidth={1.7} />
          <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 13 }}>Surprise me</span>
        </button>
      </div>

      {/* Find any game by name — including everything buried in the sandbox */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 12px", height: 44, borderRadius: 12, background: T.surface, border: `1px solid ${T.line}` }}>
        <SearchIcon size={16} color={T.dim} strokeWidth={1.6} />
        <input value={q} onChange={e => { setQ(e.target.value); if (e.target.value) setActiveGroup(null) }} placeholder="Find a game…" aria-label="Search games"
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: T.text, fontSize: 14 }} />
        {q && (
          <button onClick={() => setQ("")} aria-label="Clear search"
            style={{ color: T.dim, background: "transparent", fontSize: 18, lineHeight: 1, padding: "4px 2px" }}>×</button>
        )}
      </div>

      {/* Category chips — fast filter across the whole catalogue */}
      <div className="carto-rail" style={{ display: "flex", gap: 8, overflowX: "auto", margin: "-8px -16px 0", padding: "0 16px 2px" }}>
        {chips.map(c => {
          const on = c.group === null ? activeGroup === null && !query : activeGroup === c.group
          return (
            <button key={c.label} onClick={() => selectChip(c.group)} aria-pressed={on} className="geo-tap"
              style={{ flexShrink: 0, padding: "7px 13px", minHeight: 34, borderRadius: 999, whiteSpace: "nowrap",
                fontFamily: FONT.display, fontWeight: 600, fontSize: 12.5,
                background: on ? ACCENT.play : T.surface, color: on ? T.onAccent : T.muted,
                border: `1px solid ${on ? ACCENT.play : T.line}` }}>
              {c.label}
            </button>
          )
        })}
      </div>

      {filtering ? (
        filtered.length ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {filtered.map(e => (
              <FlagTile key={e.id} id={e.id} title={e.title} subtitle={e.subtitle}
                accent={e.sandbox ? T.muted : ACCENT[e.accent]} onClick={() => launch(e)} style={{ width: "100%" }} />
            ))}
          </div>
        ) : (
          <div style={{ padding: 18, borderRadius: 12, border: `1px dashed ${T.line}`, textAlign: "center", color: T.dim, fontSize: 12 }}>
            No game matches "{q.trim()}".
          </div>
        )
      ) : (
      <>
        {/* Trending this week — the swipeable flag-card deck (showpiece) */}
        <TrendingDeck games={trending} launch={launch} />

        {/* Jump back in — your recent rotation, one tap away */}
        {recents.length > 0 && (
          <div>
            <ShelfHead icon={<HistoryIcon size={15} color={ACCENT.play} strokeWidth={1.7} />} accent={ACCENT.play}
              title="Jump back in" reason="Pick up a recent game" />
            <Rail>
              {recents.map(e => (
                <FlagTile key={e.id} id={e.id} title={e.title} subtitle={e.subtitle}
                  accent={e.sandbox ? T.muted : ACCENT[e.accent]} onClick={() => launch(e)} />
              ))}
            </Rail>
          </div>
        )}

        {/* Because you played … — locally-derived affinity recommendations */}
        {rec && (
          <div>
            <ShelfHead icon={<SparklesIcon size={15} color={ACCENT.codex} strokeWidth={1.7} />} accent={ACCENT.codex}
              title="Recommended for you" reason={`Because you played ${rec.seed.title}`} />
            <Rail>
              {rec.entries.map(e => (
                <FlagTile key={e.id} id={e.id} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]} onClick={() => launch(e)} />
              ))}
            </Rail>
          </div>
        )}

        {/* The collections — every game, filed by appetite. Each shelf swipes.
            Learn the World leads with its live mastery line; the curriculum is
            fully integrated as poster tiles like every other game. */}
        {categoryGroups.map(g => (
          <div key={g.group}>
            {g.group === "Learn the World" ? (
              <ShelfHead icon={<LineIcon name="learn" size={15} color={ACCENT.learn} />} accent={ACCENT.learn}
                title="Learn the World"
                reason={learned > 0 ? `${learned} of ${FLAGS.length} flags learned · ${learnPct}%` : "Structured sets with mastery tracking"} />
            ) : (
              <SectionHeader title={g.group} accent={ACCENT[g.entries[0].accent]} />
            )}
            <Rail>
              {g.entries.map(e => (
                <FlagTile key={e.id} id={e.id} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]} onClick={() => launch(e)} />
              ))}
            </Rail>
          </div>
        ))}

        {/* Discover something new — fresh picks rotated daily, weighted away from
            your recent rotation so the long tail of the catalogue surfaces */}
        {discover.length > 0 && (
          <div>
            <ShelfHead icon={<CompassIcon size={15} color={ACCENT.today} strokeWidth={1.7} />} accent={ACCENT.today}
              title="Discover something new" reason="Fresh picks, rotated daily"
              action={
                <button onClick={shuffle} aria-label="Surprise me — play a random game" className="geo-tap"
                  style={{ width: 40, height: 40, borderRadius: 999, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                    background: tint(ACCENT.today, 0.12), border: `1px solid ${tint(ACCENT.today, 0.3)}`, color: ACCENT.today }}>
                  <ShuffleIcon size={15} color={ACCENT.today} strokeWidth={1.7} />
                </button>
              } />
            <Rail>
              {discover.map(e => (
                <FlagTile key={e.id} id={e.id} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]} onClick={() => launch(e)} />
              ))}
            </Rail>
          </div>
        )}

        {/* Beta Sandbox — progressively disclosed, nothing deleted */}
        <div style={{ marginTop: 4 }}>
          <button onClick={() => setSandboxOpen(o => !o)} className="geo-tap" aria-expanded={sandboxOpen}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
              borderRadius: 12, background: T.surfaceHi, border: `1px dashed ${T.lineHi}`, textAlign: "left" }}>
            <span style={{ display: "flex", color: T.muted }}>{IS_CARTO ? <FlaskIcon size={18} color={T.muted} strokeWidth={1.6} /> : <span style={{ fontSize: 16 }}>🧪</span>}</span>
            <div style={{ flex: 1 }}>
              <div className="geo-display" style={{ fontWeight: 600, fontSize: 14, color: T.text }}>Beta Sandbox</div>
              <div style={{ color: T.muted, fontSize: 10.5, marginTop: 1 }}>{sandbox.length} experimental & niche games</div>
            </div>
            <span className="geo-micro" style={{ fontSize: 8, color: T.muted, padding: "3px 8px", borderRadius: 999, border: `1px solid ${T.lineHi}` }}>beta</span>
            <span style={{ display: "flex", color: T.muted, transform: sandboxOpen ? "rotate(180deg)" : "none", transition: "transform 0.28s cubic-bezier(0.2,0.7,0.2,1)" }}>
              <ChevronDownIcon size={18} color={T.muted} strokeWidth={1.6} />
            </span>
          </button>

          {sandboxOpen && (
            <div className={IS_CARTO ? "carto-slide-up" : undefined} style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {sandbox.map(e => (
                <FlagTile key={e.id} id={e.id} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]} onClick={() => launch(e)} style={{ width: "100%" }} />
              ))}
            </div>
          )}
        </div>
      </>
      )}
    </div>
  )
}

/* ── Horizontal swipe rail — the Netflix-style shelf used across Play. ────── */
function Rail({ children }: { children: ReactNode }) {
  return (
    <div className="carto-rail" style={{ display: "flex", gap: 10, overflowX: "auto", margin: "0 -16px", padding: "2px 16px 6px" }}>
      {children}
    </div>
  )
}

/* ── Premium shelf header — etched icon chip + serif title + a one-line reason
   (e.g. "Because you played Flagle"), with an optional trailing action. Used
   for the curated/personal shelves; the plain catalogue shelves keep the
   quieter uppercase SectionHeader so the good stuff reads louder. ─────────── */
function ShelfHead({ icon, title, reason, accent, action }: {
  icon: ReactNode; title: string; reason?: string; accent: string; action?: ReactNode
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
        <span style={{ width: 26, height: 26, borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
          background: tint(accent, 0.12), border: `1px solid ${tint(accent, 0.28)}`, color: accent }}>{icon}</span>
        <div style={{ minWidth: 0 }}>
          <div className="geo-display" style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em", color: T.text, lineHeight: 1.12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
          {reason && <div style={{ color: T.muted, fontSize: 11, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{reason}</div>}
        </div>
      </div>
      {action}
    </div>
  )
}

/* ── Trending this week — the showpiece. A swipeable stack of bold, full-colour
   flag cards: flick through games like a deck of postcards, one tap to play.
   Pointer-drag is an enhancement; explicit Play + Skip buttons and a position
   counter keep every game reachable without dragging, and it honours
   prefers-reduced-motion (instant swap, no fly-out). ─────────────────────── */
function TrendingDeck({ games, launch }: { games: Entry[]; launch: (e: Entry) => void }) {
  const [idx, setIdx] = useState(0)
  const [dx, setDx] = useState(0)
  const startX = useRef(0)
  const dragging = useRef(false)
  const [reduce] = useState(() =>
    typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)

  if (!games.length) return null
  const n = games.length
  const advance = () => { setIdx(i => (i + 1) % n); setDx(0) }
  const commit = (dir: number) => {
    if (reduce) { advance(); return }
    setDx(dir * 540)
    window.setTimeout(advance, 230)
  }

  const top = games[idx]
  const accent = ACCENT[top.accent]
  const CARD_H = 236

  // Framed poster + caption, shared by the live card and the depth cards behind
  // it. The flag sits inset with parchment around it (calm, not loud) and the
  // title is the loudest element.
  const face = (g: Entry, gAccent: string) => (
    <>
      <div style={{ position: "relative", margin: "12px 12px 0", height: 98, borderRadius: 12, overflow: "hidden", border: `1px solid ${T.line}`, background: tint(gAccent, 0.08) }}>
        <GamePoster id={g.id} accent={gAccent} variant="hero" />
        <div style={{ position: "absolute", top: 9, left: 9, display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 999, background: `${T.surface}F0`, border: `1px solid ${tint(gAccent, 0.4)}` }}>
          <TrendingUpIcon size={12} color={gAccent} strokeWidth={2} />
          <span className="geo-micro" style={{ fontSize: 8.5, color: gAccent }}>Trending this week</span>
        </div>
      </div>
      <div style={{ padding: "11px 16px 0" }}>
        <div className="geo-display" style={{ color: T.text, fontWeight: 800, fontSize: 25, letterSpacing: "-0.02em", lineHeight: 1.02, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{g.title}</div>
        <div style={{ color: T.muted, fontSize: 12.5, marginTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{g.subtitle}</div>
      </div>
    </>
  )

  return (
    <div>
      <div style={{ position: "relative", height: CARD_H + 18 }}>
        {/* Depth cards — the next games peek out (now with art that actually
            represents them), so you can see what's coming and want to swipe. */}
        {[2, 1].filter(off => off < n).map(off => {
          const g = games[(idx + off) % n]
          return (
            <div key={off} aria-hidden style={{
              position: "absolute", left: 0, right: 0, top: 0, height: CARD_H, borderRadius: 18, overflow: "hidden",
              background: T.surface, border: `1px solid ${T.line}`,
              transform: `translate(${off * 7}px, ${off * 8}px) scale(${1 - off * 0.03})`,
              opacity: 1 - off * 0.12, boxShadow: "0 8px 20px -16px rgba(31,58,60,0.4)",
            }}>
              {face(g, ACCENT[g.accent])}
              <div style={{ position: "absolute", inset: 0, background: tint(T.surface, off === 1 ? 0.22 : 0.4) }} />
            </div>
          )
        })}

        {/* Live top card — drag surface */}
        <div
          onPointerDown={e => { dragging.current = true; startX.current = e.clientX; try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId) } catch { /* ignore */ } }}
          onPointerMove={e => { if (dragging.current) setDx(e.clientX - startX.current) }}
          onPointerUp={() => { if (!dragging.current) return; dragging.current = false; if (Math.abs(dx) > 80) commit(dx > 0 ? 1 : -1); else setDx(0) }}
          style={{
            position: "absolute", left: 0, right: 0, top: 0, height: CARD_H, borderRadius: 18, overflow: "hidden", touchAction: "pan-y pinch-zoom", cursor: "grab",
            background: T.surface, border: `1px solid ${tint(accent, 0.5)}`,
            boxShadow: `0 2px 6px rgba(31,58,60,0.08), 0 22px 42px -22px ${tint(accent, 0.85)}`,
            transform: `translateX(${dx}px) rotate(${dx * 0.022}deg)`,
            transition: dragging.current ? "none" : "transform 0.26s cubic-bezier(0.2,0.7,0.2,1)",
            opacity: Math.max(0, 1 - Math.abs(dx) / 620),
          }}>
          {face(top, accent)}
          {/* Actions */}
          <div style={{ position: "absolute", left: 16, right: 16, bottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => launch(top)} onPointerDown={e => e.stopPropagation()}
              style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 22px", borderRadius: 999, minHeight: 44, background: accent, color: T.onAccent }}>
              <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 15 }}>Play</span><span style={{ fontSize: 15 }}>→</span>
            </button>
            <button onClick={() => commit(-1)} onPointerDown={e => e.stopPropagation()} aria-label="Skip to next game"
              style={{ display: "inline-flex", alignItems: "center", padding: "11px 18px", borderRadius: 999, minHeight: 44, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>
              <span style={{ fontFamily: FONT.display, fontWeight: 600, fontSize: 13 }}>Skip</span>
            </button>
          </div>
        </div>
      </div>

      {/* Position dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 13 }} aria-hidden>
        {games.map((_, i) => (
          <span key={i} style={{ width: i === idx ? 16 : 5, height: 5, borderRadius: 3, background: i === idx ? accent : T.line, transition: "width 0.25s, background 0.2s" }} />
        ))}
      </div>
    </div>
  )
}

/* ── YOU — trophy room ─────────────────────────────────────────────────── */
function YouTab({ state, learned, onNavigate }: { state: AppState; learned: number; onNavigate: (s: string) => void }) {
  const pct = FLAGS.length ? Math.round((learned / FLAGS.length) * 100) : 0
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Completion hero */}
      <div className="geo-grid-soft" style={{ display: "flex", alignItems: "center", gap: 18, padding: 18, borderRadius: 16, background: T.surface, border: `1px solid ${T.line}` }}>
        <ProgressRing done={learned} total={FLAGS.length} accent={T.cyan} size={72} stroke={6} />
        <div>
          <div className="geo-micro" style={{ fontSize: 9, color: T.cyan, marginBottom: 4 }}>◦ World Mastery</div>
          <div className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 22 }}>
            <span className="geo-mono">{pct}</span><span style={{ color: T.dim, fontSize: 15 }}>%</span>
          </div>
          <div style={{ color: T.muted, fontSize: 11, marginTop: 2 }}>{learned} of {FLAGS.length} flags mastered</div>
        </div>
      </div>

      {/* Metric grid */}
      <div>
        <SectionHeader title="Field Record" accent={T.amber} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <StatPill icon="🔥" value={state.currentStreak} label="Day streak" accent={T.amber} big />
          <StatPill icon="⚡" value={state.longestStreak} label="Best streak" accent={T.chartreuse} big />
          <StatPill icon="👑" value={state.crowns.length} label="Crowns" accent={T.cyan} big />
        </div>
      </div>

      {/* Crowns shelf */}
      <div>
        <SectionHeader title="Crowns earned" accent={T.cyan} />
        {state.crowns.length === 0 ? (
          <div className="geo-grid-soft" style={{ padding: 18, borderRadius: 12, border: `1px dashed ${T.line}`, textAlign: "center", color: T.dim, fontSize: 12 }}>
            Complete a full set to earn your first crown.
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {state.crowns.map(c => (
              <div key={c} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 11px", borderRadius: 999, background: tint(T.amber, 0.1), border: `1px solid ${tint(T.amber, 0.35)}` }}>
                <span style={{ fontSize: 13 }}>👑</span>
                <span className="geo-display" style={{ color: T.text, fontSize: 12, fontWeight: 600, textTransform: "capitalize" }}>{c.replace(/-/g, " ")}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Collection — the codex's companion reference tools */}
      <div>
        <SectionHeader title="Collection" accent={ACCENT.codex} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {groupsFor("you").flatMap(g => g.entries).map(e => (
            <ModuleCard key={e.id} icon={e.icon} glyph={e.id} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]}
              progress={e.progress?.(state)} onClick={() => onNavigate(e.id)} />
          ))}
        </div>
      </div>

      {/* Links */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <ModuleCard icon="📊" glyph="profile" title="Full Profile" subtitle="Detailed history & badges" accent={T.cyan} onClick={() => onNavigate("profile")} />
        <ModuleCard icon="🏅" glyph="achievements" title="Achievements" subtitle="Milestones & medals" accent={T.amber} onClick={() => onNavigate("achievements")} />
        <ModuleCard icon="⚙️" glyph="settings" title="Settings" subtitle="Themes & aesthetic" accent={T.muted} onClick={() => onNavigate("settings")} />
      </div>
    </div>
  )
}
