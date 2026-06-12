/* LEARN — grouped curriculum modules with progress. */
(function () {
  const NS = window.GlobalioDesignSystem_019dee;
  const { ModuleCard, SectionHeader } = NS;
  const LineIcon = window.LineIcon;
  const D = window.GLOBALIO_DATA;
  const ic = (n, c) => React.createElement(LineIcon, { name: n, size: 21, color: c });

  function LearnTab() {
    return (
      <div className="gl-slide-up" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <div className="gl-display" style={{ fontWeight: 800, fontSize: 26, letterSpacing: "-0.02em", color: "var(--text-strong)" }}>Learn</div>
          <div className="gl-body" style={{ fontSize: 12.5, marginTop: 3 }}>Curriculum &amp; subdivision drills, at your pace.</div>
        </div>
        {D.LEARN.map((g) => (
          <div key={g.group}>
            <SectionHeader title={g.group} accent={g.accent} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {g.modules.map((m) => (
                <ModuleCard key={m.id} icon={ic(m.glyph, g.accent)} title={m.title} subtitle={m.sub} accent={g.accent}
                  progress={m.total ? { done: m.done, total: m.total } : undefined} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  window.LearnTab = LearnTab;
})();
