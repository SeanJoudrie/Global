import { useState } from "react"
import worldMap from "@svg-maps/world"
import { FLAGS } from "../data/flags"
import type { AppState } from "../utils/storage"
import { todayString } from "../utils/prng"
import { T, ACCENT, FONT, tint, IS_CARTO } from "../ui/tokens"
import { groupsFor, REGISTRY } from "../ui/registry"
import type { Entry, TabKey } from "../ui/registry"
import { TabBar, ModuleCard, GameTile, StatPill, SectionHeader, ProgressRing } from "./ui"
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
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: IS_CARTO ? 999 : 8, background: T.surface, border: `1px solid ${tint(T.amber, IS_CARTO ? 0.45 : 0.3)}` }}>
            {IS_CARTO ? <FlameIcon size={13} color={T.amber} strokeWidth={1.7} /> : <span style={{ fontSize: 12 }}>🔥</span>}
            <span style={{ fontFamily: FONT.mono, fontWeight: IS_CARTO ? 600 : 800, fontSize: 14, color: T.amber, letterSpacing: "-0.02em" }}>{state.currentStreak}</span>
          </div>
          <button onClick={() => onNavigate("settings")} aria-label="Settings" className="geo-tap"
            style={{ width: 32, height: 32, borderRadius: IS_CARTO ? 999 : 8, background: T.surface, border: `1px solid ${T.line}`, color: T.muted, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {IS_CARTO ? <LineIcon name="settings" size={16} color={T.muted} /> : "⚙"}
          </button>
        </div>
      </header>

      <main style={{ position: "relative", padding: "8px 16px 96px" }}>
        {tab === "today" && (
          <TodayTab state={state} dailyDone={dailyDone} spotlight={spotlight}
            onNavigate={onNavigate} onGoPlay={() => onTab("play")} onQuickPlay={onQuickPlay} onStartDaily={onStartDaily} launch={launch} playTiles={playTiles} />
        )}
        {tab === "learn" && <ListTab tab="learn" launch={launch} state={state} />}
        {tab === "play" && <PlayTab launch={launch} />}
        {tab === "codex" && <ListTab tab="codex" launch={launch} state={state} />}
        {tab === "you" && <YouTab state={state} learned={learned} onNavigate={onNavigate} />}
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
  const tryGames = [...learnGames, ...playTiles].slice(0, 12)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Swipeable hero carousel: Flag of the Day · Did You Know · featured game · personalise · arcade */}
      <HeroCarousel onNavigate={onNavigate} onGoPlay={onGoPlay} />

      {/* Primary action bento */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {/* Quick Play — pumped-up shading, glow + arrow to pull the tap */}
        <button onClick={onQuickPlay} className="geo-tap"
          style={{
            textAlign: "left", padding: 14, borderRadius: 14, position: "relative", overflow: "hidden",
            background: `linear-gradient(145deg, ${tint(T.chartreuse, 0.3)}, ${tint(T.chartreuse, 0.07)} 58%, ${T.surface})`,
            border: `1px solid ${tint(T.chartreuse, 0.5)}`,
            boxShadow: IS_CARTO ? `0 12px 24px -16px ${tint(T.chartreuse, 0.95)}` : `0 0 28px ${tint(T.chartreuse, 0.2)}`,
          }}>
          <div style={{ position: "absolute", right: -12, bottom: -14, opacity: 0.13, color: T.chartreuse, pointerEvents: "none" }}>
            <LineIcon name="quickplay" size={86} color={T.chartreuse} strokeWidth={1.1} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: T.chartreuse, display: "flex" }}>{IS_CARTO ? <LineIcon name="quickplay" size={22} color={T.chartreuse} /> : <span style={{ fontSize: 22 }}>⚡</span>}</span>
            <span style={{ width: 24, height: 24, borderRadius: 999, background: T.chartreuse, color: T.onAccent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>→</span>
          </div>
          <div className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 16, marginTop: 20 }}>Quick Play</div>
          <div className="geo-mono" style={{ color: T.chartreuse, fontSize: 10, marginTop: 2 }}>10 random flags · instant</div>
        </button>
        <button onClick={onStartDaily} className={`geo-tap ${IS_CARTO ? "carto-card" : ""}`}
          style={{ textAlign: "left", padding: 14, borderRadius: 14, position: "relative", overflow: "hidden",
            ...(IS_CARTO ? { ["--wash" as string]: tint(T.amber, 0.4) } : { background: `linear-gradient(150deg,${tint(T.amber, 0.16)},${T.surface})`, border: `1px solid ${tint(T.amber, 0.4)}` }) }}>
          <div style={{ marginBottom: 22, color: T.amber }}>{IS_CARTO ? <LineIcon name="reversequiz" size={22} color={T.amber} /> : <span style={{ fontSize: 22 }}>🎯</span>}</div>
          <div className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 16 }}>Daily Game</div>
          <div className="geo-mono" style={{ color: dailyDone ? T.green : T.amber, fontSize: 10, marginTop: 2 }}>{dailyDone ? "✓ complete" : "new today"}</div>
        </button>
      </div>

      {/* Resume */}
      {/* Today's game — sits above Resume; poster image to demo & entice */}
      <div>
        <SectionHeader title="Today's game" accent={ACCENT.play} />
        <button onClick={() => launch(spotlight)} className={`geo-tap ${IS_CARTO ? "carto-card" : ""}`}
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

      <div>
        <SectionHeader title="Resume" accent={T.cyan} />
        <ModuleCard icon="🚩" glyph="flags" title="Flag Sets" subtitle="Pick up where you left off" accent={ACCENT.learn}
          progress={{ done: state.learnedFlags.length, total: FLAGS.length }} onClick={() => onNavigate("flags")} />
      </div>

      {/* Games to try — mixes casual games with the learn-section games so they
          surface here too (multiple pathways to every game) */}
      <div>
        <SectionHeader title="Games to try" accent={T.chartreuse} action={<button onClick={() => onNavigate("flags")} className="geo-micro" style={{ fontSize: 8, color: T.dim, background: "transparent" }}>see all →</button>} />
        <div style={{ display: "flex", gap: 10, overflowX: "auto", margin: "0 -16px", padding: "0 16px 4px" }}>
          {tryGames.map(e => (
            <GameTile key={e.id} icon={e.icon} glyph={e.id} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]} onClick={() => launch(e)} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── LEARN / CODEX — grouped module lists ──────────────────────────────── */
function ListTab({ tab, launch, state }: { tab: TabKey; launch: (e: Entry) => void; state: AppState }) {
  const groups = groupsFor(tab)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {tab === "codex" && <CollectionBanner state={state} />}
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

/* ── PLAY — all the games, grouped (Featured first) ────────────────────── */
function PlayTab({ launch }: { launch: (e: Entry) => void }) {
  const groups = groupsFor("play")
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {groups.map(g => {
        const isTiles = g.entries[0].size === "tile"
        return (
          <div key={g.group}>
            <SectionHeader title={g.group} accent={ACCENT[g.entries[0].accent]} />
            {isTiles ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(108px,1fr))", gap: 10 }}>
                {g.entries.map(e => (
                  <GameTile key={e.id} icon={e.icon} glyph={e.id} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]} onClick={() => launch(e)} style={{ width: "100%" }} />
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
