import { useState } from "react"
import worldMap from "@svg-maps/world"
import { FLAGS } from "../data/flags"
import { CAPITALS } from "../data/capitals"
import type { AppState } from "../utils/storage"
import { todayString } from "../utils/prng"
import { T, ACCENT, FONT, tint, IS_CARTO } from "../ui/tokens"
import { groupsFor, REGISTRY } from "../ui/registry"
import type { Entry, TabKey } from "../ui/registry"
import { TabBar, ModuleCard, GameTile, StatPill, SectionHeader, ProgressRing } from "./ui"
import { LineIcon, FlameIcon, ChevronDownIcon, CheckIcon, FlaskIcon } from "./icons"
import FlagImage from "./FlagImage"

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

export default function MainTabs({ state, tab, onTab, onNavigate, onQuickPlay, onStartDaily, onReverseQuiz }: Props) {
  const today = todayString()
  const dailyDone = state.lastDailyDate === today

  const launch = (e: Entry) => {
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

      <main style={{ position: "relative", padding: "8px 16px 96px" }}>
        {tab === "today" && (
          <TodayTab state={state} dailyDone={dailyDone}
            onNavigate={onNavigate} onQuickPlay={onQuickPlay} onStartDaily={onStartDaily} />
        )}
        {tab === "learn" && <ListTab tab="learn" launch={launch} state={state} />}
        {tab === "play" && <PlayTab launch={launch} />}
        {tab === "codex" && <CodexTab state={state} launch={launch} onNavigate={onNavigate} />}
        {tab === "you" && <YouTab state={state} learned={learned} onNavigate={onNavigate} />}
      </main>

      <TabBar active={tab} onChange={onTab} />
    </div>
  )
}

/* ── TODAY — the hook. Stripped to a streak celebration, one massive primary
   action, a secondary Quick Play and a sleek Flag of the Day card. ────────── */
function TodayTab({ state, dailyDone, onNavigate, onQuickPlay, onStartDaily }: {
  state: AppState; dailyDone: boolean
  onNavigate: (s: string) => void; onQuickPlay: () => void; onStartDaily: () => void
}) {
  const fotd = FLAGS[dayIdx % FLAGS.length]
  const todayResult = state.dailyHistory[todayString()]
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

      {/* Massive primary action — becomes a recap once today's run is logged
          ("once a day" means once: no accidental replays that re-record) */}
      <button onClick={dailyDone ? undefined : onStartDaily} className={`${dailyDone ? "" : "geo-tap"} ${IS_CARTO ? "carto-card" : ""}`}
        aria-disabled={dailyDone || undefined}
        style={{
          position: "relative", overflow: "hidden", padding: "22px 20px", borderRadius: 16, textAlign: "left",
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

      {/* Flag of the Day — sleek premium card */}
      <div>
        <SectionHeader title="Flag of the Day" accent={ACCENT.codex} />
        <button onClick={() => onNavigate("codex")} className={`geo-tap ${IS_CARTO ? "carto-card" : ""}`}
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

/* ── LEARN / CODEX — grouped module lists ──────────────────────────────── */
function ListTab({ tab, launch, state }: { tab: TabKey; launch: (e: Entry) => void; state: AppState }) {
  const groups = groupsFor(tab)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {groups.map(g => (
        <div key={g.group}>
          <SectionHeader title={g.group} accent={ACCENT[g.entries[0].accent]} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {g.entries.map(e => (
              <ModuleCard key={e.id} icon={e.icon} glyph={e.id} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]}
                progress={e.progress?.(state)} onClick={() => launch(e)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function CollectionBanner({ state }: { state: AppState }) {
  const done = state.learnedFlags.length
  return (
    <div className="geo-grid-soft" style={{ display: "flex", alignItems: "center", gap: 16, padding: 16, borderRadius: 14, background: `linear-gradient(135deg,${tint(T.amber, 0.12)},${T.surface})`, border: `1px solid ${tint(T.amber, 0.3)}` }}>
      <ProgressRing done={done} total={FLAGS.length} accent={T.amber} size={58} stroke={5} />
      <div>
        <div className="geo-micro" style={{ fontSize: 9, color: T.amber, marginBottom: 3 }}>◦ Codex Collection</div>
        <div className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 17 }}>
          <span className="geo-mono">{done}</span> <span style={{ color: T.dim, fontSize: 13 }}>/ {FLAGS.length}</span> flags catalogued
        </div>
        <div style={{ color: T.muted, fontSize: 11, marginTop: 2 }}>Master every flag to complete the binder.</div>
      </div>
    </div>
  )
}

/* ── CODEX — the collection, rebuilt as a calm nested accordion:
   Continent → Country. Smooth-sliding drawers replace the wall of tiles. ── */
const CONTINENT_ORDER = ["Europe", "Africa", "Asia", "Americas", "Middle East", "Oceania"] as const
const CAPITAL_BY_CODE = new Map(CAPITALS.map(c => [c.code, c.capital]))

function CodexTab({ state, launch, onNavigate }: { state: AppState; launch: (e: Entry) => void; onNavigate: (s: string) => void }) {
  const [open, setOpen] = useState<string | null>("Europe")
  const learned = new Set(state.learnedFlags)
  const blocks = CONTINENT_ORDER
    .map(continent => ({ continent, flags: FLAGS.filter(f => f.region === continent) }))
    .filter(b => b.flags.length > 0)
  return (
    <div className={IS_CARTO ? "carto-slide-up" : undefined} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <CollectionBanner state={state} />

      <div>
        <SectionHeader title="By continent" accent={ACCENT.codex} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {blocks.map(b => (
            <ContinentDrawer key={b.continent} continent={b.continent} flags={b.flags} learned={learned}
              open={open === b.continent}
              onToggle={() => setOpen(o => (o === b.continent ? null : b.continent))}
              onOpenCountry={() => onNavigate("codex")} />
          ))}
        </div>
      </div>

      <div>
        <SectionHeader title="Reference" accent={ACCENT.codex} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {groupsFor("codex").flatMap(g => g.entries).map(e => (
            <ModuleCard key={e.id} icon={e.icon} glyph={e.id} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]}
              progress={e.progress?.(state)} onClick={() => launch(e)} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ContinentDrawer({ continent, flags, learned, open, onToggle, onOpenCountry }: {
  continent: string; flags: typeof FLAGS; learned: Set<string>
  open: boolean; onToggle: () => void; onOpenCountry: () => void
}) {
  const done = flags.filter(f => learned.has(f.code)).length
  return (
    <div className={IS_CARTO ? "carto-card" : undefined}
      style={{ borderRadius: 14, overflow: "hidden", ...(IS_CARTO ? { ["--wash" as string]: tint(ACCENT.codex, 0.42) } : { background: T.surface, border: `1px solid ${T.line}` }) }}>
      <button onClick={onToggle} className="geo-tap" aria-expanded={open}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 13, padding: "13px 14px", background: "transparent", textAlign: "left" }}>
        <ProgressRing done={done} total={flags.length} accent={ACCENT.codex} size={40} />
        <div style={{ flex: 1 }}>
          <div className="geo-display" style={{ fontWeight: 700, fontSize: 16, color: T.text }}>{continent}</div>
          <div style={{ fontSize: 11, marginTop: 1 }}>
            <span style={{ fontFamily: FONT.mono, fontWeight: 600, color: ACCENT.codex }}>{done}</span>
            <span style={{ color: T.muted }}> / {flags.length} catalogued</span>
          </div>
        </div>
        <span style={{ display: "flex", color: T.muted, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.3s cubic-bezier(0.2,0.7,0.2,1)" }}>
          <ChevronDownIcon size={20} color={T.muted} strokeWidth={1.6} />
        </span>
      </button>

      {open && (
        <div className={IS_CARTO ? "carto-slide-up" : undefined} style={{ padding: "2px 10px 10px" }}>
          {flags.map(f => (
            <button key={f.code} onClick={onOpenCountry} className="geo-tap"
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "9px 6px", background: "transparent", textAlign: "left", borderTop: `1px solid ${T.line}` }}>
              <span style={{ flexShrink: 0, width: 42, height: 28, borderRadius: 6, overflow: "hidden", border: `1px solid ${T.line}`, display: "block" }}>
                <FlagImage code={f.code} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="geo-display" style={{ fontWeight: 600, fontSize: 13.5, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</div>
                <div style={{ color: T.muted, fontSize: 10.5, marginTop: 1, display: "flex", alignItems: "center", gap: 4 }}>
                  <LineIcon name="capitalquiz" size={11} color={T.muted} /> {CAPITAL_BY_CODE.get(f.code) ?? "—"}
                </div>
              </div>
              {learned.has(f.code)
                ? <span style={{ display: "flex", alignItems: "center", gap: 4, color: T.green, fontSize: 10.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                    <CheckIcon size={14} color={T.green} strokeWidth={1.8} /> learned
                  </span>
                : <span className="geo-micro" style={{ fontSize: 8, color: T.muted, padding: "3px 8px", borderRadius: 999, border: `1px solid ${T.lineHi}` }}>new</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── PLAY — the arcade. Horizontal swipeable Netflix-style rows; the niche
   games are buried in a collapsible Beta Sandbox at the very bottom. ──────── */
function PlayTab({ launch }: { launch: (e: Entry) => void }) {
  const [sandboxOpen, setSandboxOpen] = useState(false)
  const groups = groupsFor("play").filter(g => !g.entries[0].sandbox)
  const sandbox = REGISTRY.filter(r => r.tab === "play" && r.sandbox)
  const gameCount = REGISTRY.filter(r => r.tab === "play").length
  return (
    <div className={IS_CARTO ? "carto-slide-up" : undefined} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div className="geo-display" style={{ fontWeight: 800, fontSize: 26, letterSpacing: "-0.02em", color: T.text }}>The Arcade</div>
        <div style={{ color: T.muted, fontSize: 12.5, marginTop: 3 }}>
          <span style={{ fontFamily: FONT.mono, fontWeight: 700, color: ACCENT.play }}>{gameCount}</span> games · swipe each shelf
        </div>
      </div>

      {groups.map(g => {
        const isTiles = g.entries[0].size === "tile"
        return (
          <div key={g.group}>
            <SectionHeader title={g.group} accent={ACCENT[g.entries[0].accent]} />
            {isTiles ? (
              <div className="carto-rail" style={{ display: "flex", gap: 10, overflowX: "auto", margin: "0 -16px", padding: "2px 16px 6px" }}>
                {g.entries.map(e => (
                  <GameTile key={e.id} icon={e.icon} glyph={e.id} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]} onClick={() => launch(e)} />
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {g.entries.map(e => (
                  <ModuleCard key={e.id} icon={e.icon} glyph={e.id} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]} onClick={() => launch(e)} />
                ))}
              </div>
            )}
          </div>
        )
      })}

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
              <GameTile key={e.id} icon={e.icon} glyph={e.id} title={e.title} subtitle={e.subtitle} accent={T.muted} onClick={() => launch(e)} style={{ width: "100%" }} />
            ))}
          </div>
        )}
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

      {/* Links */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <ModuleCard icon="📊" glyph="profile" title="Full Profile" subtitle="Detailed history & badges" accent={T.cyan} onClick={() => onNavigate("profile")} />
        <ModuleCard icon="🏅" glyph="achievements" title="Achievements" subtitle="Milestones & medals" accent={T.amber} onClick={() => onNavigate("achievements")} />
        <ModuleCard icon="⚙️" glyph="settings" title="Settings" subtitle="Themes & aesthetic" accent={T.muted} onClick={() => onNavigate("settings")} />
      </div>
    </div>
  )
}
