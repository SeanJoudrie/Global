import { useState } from "react"
import worldMap from "@svg-maps/world"
import { FLAGS } from "../data/flags"
import type { AppState } from "../utils/storage"
import { todayString } from "../utils/prng"
import { T, ACCENT, FONT, tint, IS_CARTO } from "../ui/tokens"
import { groupsFor, REGISTRY } from "../ui/registry"
import type { Entry, TabKey } from "../ui/registry"
import { TabBar, ModuleCard, GameTile, StatPill, SectionHeader, CollapsibleSection, ProgressRing, cardMotion } from "./ui"
import { LineIcon, FlameIcon } from "./icons"
import FlagImage from "./FlagImage"
import HeroCarousel from "./HeroCarousel"

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
  const playTiles = REGISTRY.filter(r => r.tab === "play" && r.size === "tile")
  const spotlight = playTiles[dayIdx % playTiles.length]

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
          {/* Live streak chip — glows and the flame breathes while a streak is alive */}
          <div className={state.currentStreak > 0 ? "streak-live" : undefined}
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: IS_CARTO ? 999 : 8, background: T.surface, border: `1px solid ${tint(T.amber, IS_CARTO ? 0.45 : 0.3)}`, ["--glow" as string]: tint(T.amber, 0.35) }}>
            <span className="flame">{IS_CARTO ? <FlameIcon size={13} color={T.amber} strokeWidth={1.7} /> : <span style={{ fontSize: 12 }}>🔥</span>}</span>
            <span style={{ fontFamily: FONT.mono, fontWeight: IS_CARTO ? 600 : 800, fontSize: 14, color: T.amber, letterSpacing: "-0.02em" }}>{state.currentStreak}</span>
          </div>
          <button onClick={() => onNavigate("settings")} aria-label="Settings" className="geo-tap"
            style={{ width: 32, height: 32, borderRadius: IS_CARTO ? 999 : 8, background: T.surface, border: `1px solid ${T.line}`, color: T.muted, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {IS_CARTO ? <LineIcon name="settings" size={16} color={T.muted} /> : "⚙"}
          </button>
        </div>
      </header>

      <main style={{ position: "relative", padding: "8px 16px 96px" }}>
        {/* Keyed wrapper cross-fades the pane on every tab change */}
        <div key={tab} className="tab-pane">
          {tab === "today" && (
            <TodayTab state={state} dailyDone={dailyDone} spotlight={spotlight}
              onNavigate={onNavigate} onGoPlay={() => onTab("play")} onQuickPlay={onQuickPlay} onStartDaily={onStartDaily} launch={launch} playTiles={playTiles} />
          )}
          {tab === "learn" && <ListTab tab="learn" launch={launch} state={state} />}
          {tab === "play" && <PlayTab launch={launch} />}
          {tab === "codex" && <ListTab tab="codex" launch={launch} state={state} />}
          {tab === "you" && <YouTab state={state} learned={learned} onNavigate={onNavigate} />}
        </div>
      </main>

      <TabBar active={tab} onChange={onTab} />
    </div>
  )
}

/* ── TODAY ─────────────────────────────────────────────────────────────── */
function TodayTab({ state, dailyDone, spotlight, onNavigate, onGoPlay, onQuickPlay, onStartDaily, launch, playTiles }: {
  state: AppState; dailyDone: boolean; spotlight: Entry
  onNavigate: (s: string) => void; onGoPlay: () => void; onQuickPlay: () => void; onStartDaily: () => void
  launch: (e: Entry) => void; playTiles: Entry[]
}) {
  const posterFlag = FLAGS[(dayIdx * 13) % FLAGS.length]
  // Surface the game-like LEARN entries here too, mixed with casual games.
  const LEARN_GAME_IDS = ["language", "geo", "capitalquiz", "reversequiz", "substumper", "lineage"]
  const learnGames = LEARN_GAME_IDS.map(id => REGISTRY.find(r => r.id === id)).filter(Boolean) as Entry[]
  const tryGames = [...learnGames, ...playTiles.filter(e => !LEARN_GAME_IDS.includes(e.id))].slice(0, 12)
  const streak = state.currentStreak
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* ── DAILY HERO — the one-tap habit loop. Open app → tap → playing. ── */}
      <button onClick={onStartDaily} className={`geo-tap ${cardMotion}`}
        style={{
          width: "100%", textAlign: "left", borderRadius: 18, padding: "18px 18px 16px", position: "relative",
          overflow: "hidden", minHeight: 148, display: "flex", flexDirection: "column",
          ...(IS_CARTO
            ? { ["--wash" as string]: tint(T.amber, 0.5) }
            : {
                background: `linear-gradient(140deg, ${tint(T.amber, 0.26)}, ${tint(T.amber, 0.06)} 55%, ${T.surface})`,
                border: `1px solid ${tint(T.amber, 0.5)}`,
                boxShadow: `0 0 36px ${tint(T.amber, 0.16)}`,
              }),
        }}>
        {/* oversized faint compass glyph anchors the card */}
        <div style={{ position: "absolute", right: -18, bottom: -22, opacity: 0.1, pointerEvents: "none" }}>
          <LineIcon name="reversequiz" size={130} color={T.amber} strokeWidth={1} />
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div className="geo-micro" style={{ fontSize: 9, color: T.amber }}>◦ Daily Challenge · resets at midnight</div>
          {/* Elevated streak flame — the celebrated centrepiece */}
          <div className={streak > 0 ? "streak-live" : undefined}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 999, flexShrink: 0,
              background: tint(T.amber, IS_CARTO ? 0.14 : 0.12), border: `1px solid ${tint(T.amber, 0.4)}`, ["--glow" as string]: tint(T.amber, 0.4) }}>
            <span className="flame">{IS_CARTO ? <FlameIcon size={15} color={T.amber} strokeWidth={1.7} /> : <span style={{ fontSize: 14 }}>🔥</span>}</span>
            <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 16, color: T.amber, letterSpacing: "-0.02em" }}>{streak}</span>
            <span className="geo-micro" style={{ fontSize: 7.5, color: T.amber, opacity: 0.85 }}>day{streak === 1 ? "" : "s"}</span>
          </div>
        </div>
        <div className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 27, lineHeight: 1.04, marginTop: 14, letterSpacing: "-0.01em" }}>
          {dailyDone ? "Done for today" : "Play today's 10"}
        </div>
        <p style={{ color: T.muted, fontSize: 12, marginTop: 4, position: "relative" }}>
          {dailyDone ? "Streak safe — come back tomorrow for a fresh ten." : "Ten flags, one shot a day. Keep the flame alive."}
        </p>
        <div style={{ marginTop: "auto", paddingTop: 12, display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 999,
          background: dailyDone ? tint(T.green, 0.16) : T.amber, color: dailyDone ? T.green : T.onAccent,
          border: dailyDone ? `1px solid ${tint(T.green, 0.45)}` : "none" }}>
          <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 13 }}>{dailyDone ? "✓ Complete · replay" : "Play now"}</span>
          {!dailyDone && <span style={{ fontSize: 14 }}>→</span>}
        </div>
      </button>

      {/* Instant secondary actions: zero-setup Quick Play + the daily Flagle */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <button onClick={onQuickPlay} className={`geo-tap ${cardMotion}`}
          style={{
            textAlign: "left", padding: 14, borderRadius: 14, position: "relative", overflow: "hidden",
            ...(IS_CARTO ? { ["--wash" as string]: tint(T.chartreuse, 0.45) } : {
              background: `linear-gradient(145deg, ${tint(T.chartreuse, 0.22)}, ${tint(T.chartreuse, 0.05)} 58%, ${T.surface})`,
              border: `1px solid ${tint(T.chartreuse, 0.5)}`,
            }),
          }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: T.chartreuse, display: "flex" }}>{IS_CARTO ? <LineIcon name="quickplay" size={22} color={T.chartreuse} /> : <span style={{ fontSize: 22 }}>⚡</span>}</span>
            <span style={{ width: 24, height: 24, borderRadius: 999, background: T.chartreuse, color: T.onAccent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>→</span>
          </div>
          <div className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 16, marginTop: 18 }}>Quick Play</div>
          <div className="geo-mono" style={{ color: T.chartreuse, fontSize: 10, marginTop: 2 }}>10 random flags · instant</div>
        </button>
        <button onClick={() => onNavigate("flagle")} className={`geo-tap ${cardMotion}`}
          style={{ textAlign: "left", padding: 14, borderRadius: 14, position: "relative", overflow: "hidden",
            ...(IS_CARTO ? { ["--wash" as string]: tint(ACCENT.learn, 0.4) } : { background: T.surface, border: `1px solid ${tint(ACCENT.learn, 0.4)}` }) }}>
          <div style={{ marginBottom: 20, fontSize: 22 }}>🟩</div>
          <div className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 16 }}>Flagle</div>
          <div className="geo-mono" style={{ color: ACCENT.learn, fontSize: 10, marginTop: 2 }}>daily puzzle · 6 guesses</div>
        </button>
      </div>

      {/* Flag of the Day & friends — swipeable, below the daily hook */}
      <HeroCarousel onNavigate={onNavigate} onGoPlay={onGoPlay} />

      {/* Today's spotlight game — poster card, rotates daily */}
      <div>
        <SectionHeader title="Today's game" accent={ACCENT.play} />
        <button onClick={() => launch(spotlight)} className={`geo-tap ${cardMotion}`}
          style={{ width: "100%", textAlign: "left", borderRadius: 16, padding: 14, position: "relative", overflow: "hidden", display: "flex", gap: 14, alignItems: "center",
            ...(IS_CARTO ? { ["--wash" as string]: tint(ACCENT.play, 0.4) } : { background: T.surface, border: `1px solid ${T.line}` }) }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="geo-micro" style={{ fontSize: 9, color: ACCENT.play, marginBottom: 5 }}>◦ Today's Game · rotates daily</div>
            <div className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 22, lineHeight: 1.05 }}>{spotlight.title}</div>
            <p style={{ color: T.muted, fontSize: 12, marginTop: 5 }}>{spotlight.subtitle}</p>
            <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 999, background: ACCENT.play, color: T.onAccent }}>
              <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 12 }}>Play</span><span style={{ fontSize: 13 }}>→</span>
            </div>
          </div>
          <div style={{ flexShrink: 0, width: 96, height: 96, borderRadius: 14, overflow: "hidden", position: "relative", border: `1px solid ${T.line}`, background: tint(ACCENT.play, 0.1), display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FlagImage code={posterFlag.code} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.26 }} />
            <span style={{ position: "relative", color: ACCENT.play, display: "flex" }}><LineIcon name={spotlight.id} size={40} color={ACCENT.play} strokeWidth={1.5} /></span>
          </div>
        </button>
      </div>

      {/* Games to try — one row; the full arcade lives in the Play tab */}
      <div>
        <SectionHeader title="Games to try" accent={T.chartreuse} action={<button onClick={onGoPlay} className="geo-micro" style={{ fontSize: 8, color: T.dim, background: "transparent" }}>see all →</button>} />
        <div style={{ display: "flex", gap: 10, overflowX: "auto", margin: "0 -16px", padding: "6px 16px 8px" }}>
          {tryGames.map(e => (
            <GameTile key={e.id} icon={e.icon} glyph={e.id} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]} onClick={() => launch(e)} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── LEARN / CODEX — collapsible grouped module lists ──────────────────── */
function ListTab({ tab, launch, state }: { tab: TabKey; launch: (e: Entry) => void; state: AppState }) {
  const groups = groupsFor(tab)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {tab === "codex" && <CollectionBanner state={state} />}
      {groups.map(g => (
        <CollapsibleSection key={g.group} title={g.group} accent={ACCENT[g.entries[0].accent]} count={g.entries.length}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 2 }}>
            {g.entries.map(e => (
              <ModuleCard key={e.id} icon={e.icon} glyph={e.id} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]}
                progress={e.progress?.(state)} onClick={() => launch(e)} />
            ))}
          </div>
        </CollapsibleSection>
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

/* ── PLAY — App-Store-style arcade: horizontal shelves by vibe ─────────── */
function PlayTab({ launch }: { launch: (e: Entry) => void }) {
  const groups = groupsFor("play")
  const total = REGISTRY.filter(r => r.tab === "play").length
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      {/* Arcade masthead */}
      <div style={{ padding: "2px 2px 0" }}>
        <div className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 24, letterSpacing: "-0.01em" }}>The Arcade</div>
        <div style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>
          <span className="geo-mono" style={{ color: ACCENT.play }}>{total}</span> games · swipe each shelf to browse
        </div>
      </div>
      {groups.map(g => {
        const isTiles = g.entries[0].size === "tile"
        return (
          <div key={g.group}>
            <SectionHeader title={g.group} accent={ACCENT[g.entries[0].accent]}
              action={<span className="geo-mono" style={{ fontSize: 9, color: T.dim }}>{g.entries.length} games</span>} />
            {isTiles ? (
              // Horizontal shelf — cards lift on hover, edge-to-edge scroll
              <div style={{ display: "flex", gap: 10, overflowX: "auto", margin: "0 -16px", padding: "6px 16px 10px" }}>
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
