/* YOU — the trophy room. World mastery dial, field record, crowns, links. */
(function () {
  const NS = window.GlobalioDesignSystem_019dee;
  const { ProgressRing, StatPill, ModuleCard, SectionHeader, Badge } = NS;
  const LineIcon = window.LineIcon;
  const D = window.GLOBALIO_DATA;
  const ic = (n, c, s) => React.createElement(LineIcon, { name: n, size: s || 21, color: c });
  const CROWNS = ["Europe", "Nordics", "Americas", "Benelux", "Iberia", "Alpine", "Oceania"];

  function YouTab() {
    const p = D.PROFILE;
    const pct = Math.round((p.learned / p.total) * 100);
    return (
      <div className="gl-slide-up" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* mastery hero */}
        <div className="gl-card" style={{ display: "flex", alignItems: "center", gap: 18, padding: 18 }}>
          <ProgressRing done={p.learned} total={p.total} accent="var(--accent-learn)" size={72} stroke={6} />
          <div>
            <div className="gl-micro" style={{ fontSize: 9, color: "var(--accent-learn)", marginBottom: 4 }}>◦ World Mastery</div>
            <div className="gl-display" style={{ fontWeight: 700, fontSize: 24, color: "var(--text-strong)" }}>
              <span style={{ fontFamily: "var(--font-data)" }}>{pct}</span><span style={{ color: "var(--text-muted)", fontSize: 16 }}>%</span>
            </div>
            <div className="gl-body" style={{ fontSize: 11, marginTop: 2 }}>{p.learned} of {p.total} flags mastered</div>
          </div>
        </div>

        {/* field record */}
        <div>
          <SectionHeader title="Field Record" accent="var(--accent-today)" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <StatPill icon={ic("flame", "var(--accent-today)", 15)} value={p.streak} label="Day streak" accent="var(--accent-today)" big />
            <StatPill icon={ic("quickplay", "var(--accent-play)", 15)} value={p.best} label="Best streak" accent="var(--accent-play)" big />
            <StatPill icon={ic("crown", "var(--accent-learn)", 15)} value={p.crowns} label="Crowns" accent="var(--accent-learn)" big />
          </div>
        </div>

        {/* crowns */}
        <div>
          <SectionHeader title="Crowns earned" accent="var(--accent-codex)" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CROWNS.map((c) => (
              <div key={c} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 11px", borderRadius: "var(--radius-pill)",
                background: "color-mix(in srgb, var(--accent-codex) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-codex) 32%, transparent)" }}>
                {ic("crown", "var(--accent-codex)", 13)}
                <span className="gl-display" style={{ fontWeight: 600, fontSize: 12, color: "var(--text-strong)" }}>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* links */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <ModuleCard icon={ic("profile", "var(--accent-learn)")} title="Full Profile" subtitle="Detailed history & badges" accent="var(--accent-learn)" />
          <ModuleCard icon={ic("achievements", "var(--accent-codex)")} title="Achievements" subtitle="Milestones & medals" accent="var(--accent-codex)" />
          <ModuleCard icon={ic("settings", "var(--text-muted)")} title="Settings" subtitle="Themes & aesthetic" accent="var(--text-muted)" />
        </div>
      </div>
    );
  }
  window.YouTab = YouTab;
})();
