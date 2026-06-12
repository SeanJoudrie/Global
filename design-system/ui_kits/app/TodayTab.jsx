/* TODAY — the hook. Stripped to a streak celebration, one massive primary
   action, and a sleek Flag of the Day card. */
(function () {
  const NS = window.GlobalioDesignSystem_019dee;
  const { HeroCard, ModuleCard, GameTile, SectionHeader, Button, FlagChip } = NS;
  const LineIcon = window.LineIcon;
  const D = window.GLOBALIO_DATA;
  const ic = (n, c, s) => React.createElement(LineIcon, { name: n, size: s || 21, color: c });

  function TodayTab({ go }) {
    const p = D.PROFILE;
    return (
      <div className="gl-slide-up" style={{ display: "flex", flexDirection: "column", gap: 18 }}>

        {/* Streak celebration */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "4px 2px" }}>
          <div className="gl-pulse" style={{ width: 54, height: 54, borderRadius: "50%", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "color-mix(in srgb, var(--accent-today) 14%, transparent)",
            border: "1px solid color-mix(in srgb, var(--accent-today) 34%, transparent)" }}>
            {ic("flame", "var(--accent-today)", 26)}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
              <span style={{ fontFamily: "var(--font-data)", fontVariantNumeric: "tabular-nums", fontWeight: 800,
                fontSize: 34, letterSpacing: "-0.04em", color: "var(--accent-today)", lineHeight: 1 }}>{p.streak}</span>
              <span className="gl-display" style={{ fontWeight: 700, fontSize: 18, color: "var(--text-strong)" }}>day streak</span>
            </div>
            <div className="gl-body" style={{ fontSize: 12, marginTop: 3 }}>Best run {p.best} · keep the map lit</div>
          </div>
        </div>

        {/* Massive primary action */}
        <button className="gl-tap gl-card is-interactive" onClick={() => go("play")}
          style={{ "--wash": "color-mix(in srgb, var(--accent-play) 42%, transparent)",
            position: "relative", overflow: "hidden", padding: "22px 20px", borderRadius: "var(--radius-xl)",
            textAlign: "left", border: "1px solid color-mix(in srgb, var(--accent-play) 36%, transparent)",
            background: "linear-gradient(150deg, color-mix(in srgb, var(--accent-play) 16%, var(--surface-card)), var(--surface-card) 70%)" }}>
          <div style={{ position: "absolute", right: -18, bottom: -22, opacity: 0.12, color: "var(--accent-play)" }}>
            {ic("today", "var(--accent-play)", 132)}
          </div>
          <div className="gl-micro" style={{ fontSize: 9, color: "var(--accent-play)", marginBottom: 8 }}>◦ Today's expedition</div>
          <div className="gl-display" style={{ fontWeight: 800, fontSize: 30, lineHeight: 1.02, letterSpacing: "-0.02em", color: "var(--text-strong)", maxWidth: 240 }}>
            Daily Expedition
          </div>
          <div className="gl-body" style={{ fontSize: 12.5, marginTop: 6, maxWidth: 220 }}>Ten flags from across the world. One run, once a day.</div>
          <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 20px",
            borderRadius: "var(--radius-pill)", background: "var(--accent-play)", color: "var(--text-on-accent)" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>Start</span>
            <span style={{ fontSize: 16 }}>→</span>
          </div>
        </button>

        {/* Secondary quick play */}
        <button className="gl-tap gl-card is-interactive" onClick={() => go("play")}
          style={{ "--wash": "color-mix(in srgb, var(--accent-today) 40%, transparent)", display: "flex", alignItems: "center", gap: 13,
            padding: "13px 16px", borderRadius: "var(--radius-md)", textAlign: "left" }}>
          <span style={{ width: 40, height: 40, borderRadius: "var(--radius-sm)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
            background: "color-mix(in srgb, var(--accent-today) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-today) 28%, transparent)" }}>
            {ic("quickplay", "var(--accent-today)", 20)}
          </span>
          <div style={{ flex: 1 }}>
            <div className="gl-display" style={{ fontWeight: 600, fontSize: 15 }}>Quick Play</div>
            <div className="gl-body" style={{ fontSize: 11.5, marginTop: 1 }}>10 random flags · instant, no streak</div>
          </div>
          <span style={{ color: "var(--accent-today)", fontSize: 18, opacity: 0.7 }}>→</span>
        </button>

        {/* Flag of the Day — sleek premium card */}
        <div>
          <SectionHeader title="Flag of the Day" accent="var(--accent-codex)" />
          <HeroCard eyebrow={D.FOTD.region} title={D.FOTD.name} subtitle={D.FOTD.fact}
            accent="var(--accent-codex)" cta="Open in codex" onClick={() => go("codex")}
            media={<FlagChip code={D.FOTD.code} flagBase="../../assets/flags" w={104} h={70} />} />
        </div>

        {/* Resume */}
        <div>
          <SectionHeader title="Pick up where you left off" accent="var(--accent-learn)" />
          <ModuleCard icon={ic("flags", "var(--accent-learn)")} title="Flag Sets" subtitle="Country, historical & identity sets"
            accent="var(--accent-learn)" progress={{ done: p.learned, total: p.total }} onClick={() => go("learn")} />
        </div>
      </div>
    );
  }
  window.TodayTab = TodayTab;
})();
