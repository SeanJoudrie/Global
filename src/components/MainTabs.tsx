import { FLAGS } from "../data/flags"
import type { AppState } from "../utils/storage"
import { todayString } from "../utils/prng"
import { T, ACCENT, FONT, tint } from "../ui/tokens"
import { groupsFor, REGISTRY } from "../ui/registry"
import type { Entry, TabKey } from "../ui/registry"
import { TabBar, ModuleCard, GameTile, HeroCard, StatPill, SectionHeader, ProgressRing } from "./ui"
import FlagImage from "./FlagImage"

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
  const fotd = FLAGS[dayIdx % FLAGS.length]
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
    <div className="geo-grid" style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
      <div className="geo-vignette" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* ── Shared header: wordmark · live streak · system actions ── */}
      <header style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 9, height: 9, borderRadius: 2, background: ACCENT.today, boxShadow: `0 0 8px ${ACCENT.today}`, display: "inline-block" }} />
          <span className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 18, letterSpacing: "0.02em" }}>GLOBALIO</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 8, background: T.surface, border: `1px solid ${tint(T.amber, 0.3)}` }}>
            <span style={{ fontSize: 12 }}>🔥</span>
            <span style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 14, color: T.amber, letterSpacing: "-0.03em" }}>{state.currentStreak}</span>
          </div>
          <button onClick={() => onNavigate("settings")} aria-label="Settings" className="geo-tap"
            style={{ width: 32, height: 32, borderRadius: 8, background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>⚙</button>
        </div>
      </header>

      <main style={{ position: "relative", padding: "8px 16px 96px" }}>
        {tab === "today" && (
          <TodayTab state={state} fotd={fotd} dailyDone={dailyDone} spotlight={spotlight}
            onNavigate={onNavigate} onQuickPlay={onQuickPlay} onStartDaily={onStartDaily} launch={launch} playTiles={playTiles} />
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
function TodayTab({ state, fotd, dailyDone, spotlight, onNavigate, onQuickPlay, onStartDaily, launch, playTiles }: {
  state: AppState; fotd: typeof FLAGS[number]; dailyDone: boolean; spotlight: Entry
  onNavigate: (s: string) => void; onQuickPlay: () => void; onStartDaily: () => void
  launch: (e: Entry) => void; playTiles: Entry[]
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Flag of the Day — image hero */}
      <button onClick={() => onNavigate("codex")} className="geo-tap"
        style={{ position: "relative", width: "100%", height: 168, borderRadius: 16, overflow: "hidden", border: `1px solid ${T.line}`, textAlign: "left" }}>
        <FlagImage code={fotd.code} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,#06080D 8%,rgba(6,8,13,0.2) 55%,transparent), linear-gradient(90deg,rgba(6,8,13,0.85),transparent 70%)" }} />
        <div style={{ position: "absolute", left: 16, bottom: 14, right: 16 }}>
          <div className="geo-micro" style={{ fontSize: 9, color: ACCENT.today, marginBottom: 4 }}>◦ Flag of the Day</div>
          <div className="geo-display" style={{ color: "#fff", fontWeight: 700, fontSize: 26, letterSpacing: "-0.02em", lineHeight: 1 }}>{fotd.name}</div>
          <div style={{ color: T.muted, fontSize: 11.5, marginTop: 5, maxWidth: "85%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{fotd.funFact}</div>
        </div>
      </button>

      {/* Primary action bento */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <button onClick={onQuickPlay} className="geo-tap"
          style={{ textAlign: "left", padding: 14, borderRadius: 14, background: `linear-gradient(150deg,${tint(T.chartreuse, 0.16)},${T.surface})`, border: `1px solid ${tint(T.chartreuse, 0.4)}`, position: "relative", overflow: "hidden" }}>
          <div style={{ fontSize: 22, marginBottom: 24 }}>⚡</div>
          <div className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 15 }}>Quick Play</div>
          <div className="geo-mono" style={{ color: T.chartreuse, fontSize: 10, marginTop: 2 }}>10 RANDOM FLAGS</div>
        </button>
        <button onClick={onStartDaily} className="geo-tap"
          style={{ textAlign: "left", padding: 14, borderRadius: 14, background: `linear-gradient(150deg,${tint(T.amber, 0.16)},${T.surface})`, border: `1px solid ${tint(T.amber, 0.4)}`, position: "relative", overflow: "hidden" }}>
          <div style={{ fontSize: 22, marginBottom: 24 }}>🎯</div>
          <div className="geo-display" style={{ color: T.text, fontWeight: 700, fontSize: 15 }}>Daily Game</div>
          <div className="geo-mono" style={{ color: dailyDone ? T.green : T.amber, fontSize: 10, marginTop: 2 }}>{dailyDone ? "✓ COMPLETE" : "NEW TODAY"}</div>
        </button>
      </div>

      {/* Resume */}
      <div>
        <SectionHeader title="Resume" accent={T.cyan} />
        <ModuleCard icon="🚩" title="Flag Sets" subtitle="Pick up where you left off" accent={ACCENT.learn}
          progress={{ done: state.learnedFlags.length, total: FLAGS.length }} onClick={() => onNavigate("flags")} />
      </div>

      {/* Daily game spotlight */}
      <div>
        <SectionHeader title="Today's game" accent={T.chartreuse} />
        <HeroCard eyebrow="◦ Rotates daily" title={spotlight.title} subtitle={spotlight.subtitle} accent={ACCENT.play}
          tall onClick={() => launch(spotlight)} />
      </div>

      {/* Jump back in */}
      <div>
        <SectionHeader title="Jump back in" accent={T.chartreuse} action={<span className="geo-micro" style={{ fontSize: 8, color: T.dim }}>swipe →</span>} />
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, margin: "0 -16px", padding: "0 16px 4px" }}>
          {playTiles.slice(0, 8).map(e => (
            <GameTile key={e.id} icon={e.icon} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]} onClick={() => launch(e)} />
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
              <ModuleCard key={e.id} icon={e.icon} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]}
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

/* ── PLAY — casual carousel + challenge modules ────────────────────────── */
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
                  <GameTile key={e.id} icon={e.icon} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]} onClick={() => launch(e)} style={{ width: "100%" }} />
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {g.entries.map(e => (
                  <ModuleCard key={e.id} icon={e.icon} title={e.title} subtitle={e.subtitle} accent={ACCENT[e.accent]} onClick={() => launch(e)} />
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
        <ModuleCard icon="📊" title="Full Profile" subtitle="Detailed history & badges" accent={T.cyan} onClick={() => onNavigate("profile")} />
        <ModuleCard icon="🏅" title="Achievements" subtitle="Milestones & medals" accent={T.amber} onClick={() => onNavigate("achievements")} />
        <ModuleCard icon="⚙️" title="Settings" subtitle="Themes & secrets" accent={T.muted} onClick={() => onNavigate("settings")} />
      </div>
    </div>
  )
}
