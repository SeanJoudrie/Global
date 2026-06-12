/* CODEX — the collection, rebuilt as a calm nested accordion: Continent →
   Country. Smooth-sliding drawers replace the old wall of tiles. */
(function () {
  const NS = window.GlobalioDesignSystem_019dee;
  const { ProgressRing, Badge, FlagChip, SectionHeader } = NS;
  const LineIcon = window.LineIcon;
  const D = window.GLOBALIO_DATA;
  const ic = (n, c, s) => React.createElement(LineIcon, { name: n, size: s || 18, color: c });

  function ContinentDrawer({ block, open, onToggle }) {
    return (
      <div className="gl-card" style={{ "--wash": "color-mix(in srgb, var(--accent-codex) 42%, transparent)", padding: 0, borderRadius: "var(--radius-lg)" }}>
        {/* header row */}
        <button onClick={onToggle} className="gl-tap" style={{ width: "100%", display: "flex", alignItems: "center", gap: 13,
          padding: "13px 14px", background: "transparent", border: "none", textAlign: "left", borderRadius: "var(--radius-lg)" }}>
          <ProgressRing done={block.learned} total={block.total} accent="var(--accent-codex)" size={40} />
          <div style={{ flex: 1 }}>
            <div className="gl-display" style={{ fontWeight: 700, fontSize: 16, color: "var(--text-strong)" }}>{block.continent}</div>
            <div className="gl-body" style={{ fontSize: 11, marginTop: 1 }}>
              <span style={{ fontFamily: "var(--font-data)", fontWeight: 600, color: "var(--accent-codex)" }}>{block.learned}</span>
              <span style={{ color: "var(--text-muted)" }}> / {block.total} catalogued</span>
            </div>
          </div>
          <span style={{ display: "flex", color: "var(--text-muted)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.3s var(--ease-paper)" }}>
            {ic("chevronDown", "var(--text-muted)", 20)}
          </span>
        </button>

        {/* country list */}
        {open && (
          <div className="gl-slide-up" style={{ padding: "2px 10px 10px" }}>
            {block.countries.map((c) => (
              <div key={c.code} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 6px", borderTop: "1px solid var(--border-hairline)" }}>
                <FlagChip code={c.code} flagBase="../../assets/flags" w={42} h={28} rounded="6px" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="gl-display" style={{ fontWeight: 600, fontSize: 13.5, color: "var(--text-strong)" }}>{c.name}</div>
                  <div className="gl-body" style={{ fontSize: 10.5, marginTop: 1, display: "flex", alignItems: "center", gap: 4 }}>
                    {ic("capitalquiz", "var(--text-muted)", 11)} {c.cap}
                  </div>
                </div>
                {c.learned
                  ? <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--accent-success)", fontFamily: "var(--font-body)", fontSize: 10.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}>{ic("check", "var(--accent-success)", 14)} learned</span>
                  : <Badge accent="var(--text-muted)" tone="outline">new</Badge>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function CodexTab() {
    const [open, setOpen] = React.useState("Europe");
    const p = D.PROFILE;
    return (
      <div className="gl-slide-up" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* collection banner */}
        <div className="gl-card" style={{ "--wash": "color-mix(in srgb, var(--accent-codex) 42%, transparent)",
          display: "flex", alignItems: "center", gap: 16, padding: 16 }}>
          <ProgressRing done={p.learned} total={p.total} accent="var(--accent-codex)" size={58} stroke={5} />
          <div>
            <div className="gl-micro" style={{ fontSize: 9, color: "var(--accent-codex)", marginBottom: 3 }}>◦ Codex Collection</div>
            <div className="gl-display" style={{ fontWeight: 700, fontSize: 17, color: "var(--text-strong)" }}>
              <span style={{ fontFamily: "var(--font-data)" }}>{p.learned}</span>
              <span style={{ color: "var(--text-muted)", fontSize: 13 }}> / {p.total}</span> flags catalogued
            </div>
            <div className="gl-body" style={{ fontSize: 11, marginTop: 2 }}>Open a continent to browse the binder.</div>
          </div>
        </div>

        <SectionHeader title="By continent" accent="var(--accent-codex)" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {D.CODEX.map((b) => (
            <ContinentDrawer key={b.continent} block={b} open={open === b.continent}
              onToggle={() => setOpen((o) => (o === b.continent ? null : b.continent))} />
          ))}
        </div>
      </div>
    );
  }
  window.CodexTab = CodexTab;
})();
