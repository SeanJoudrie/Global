/* PLAY — the arcade. Horizontal, swipeable Netflix-style rows; the niche games
   are buried in a collapsible Beta Sandbox at the very bottom. */
(function () {
  const NS = window.GlobalioDesignSystem_019dee;
  const { GameTile, SectionHeader, Badge } = NS;
  const LineIcon = window.LineIcon;
  const D = window.GLOBALIO_DATA;
  const ic = (n, c, s) => React.createElement(LineIcon, { name: n, size: s || 21, color: c });

  function Row({ group, accent, games }) {
    return (
      <div>
        <SectionHeader title={group} accent={accent} />
        <div className="gl-rail" style={{ display: "flex", gap: 10, overflowX: "auto", margin: "0 -18px", padding: "2px 18px 6px" }}>
          {games.map((g) => (
            <GameTile key={g.id} icon={ic(g.glyph, accent)} title={g.title} subtitle={g.sub} accent={accent} />
          ))}
        </div>
      </div>
    );
  }

  function PlayTab() {
    const [open, setOpen] = React.useState(false);
    const S = D.SANDBOX;
    return (
      <div className="gl-slide-up" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <div className="gl-display" style={{ fontWeight: 800, fontSize: 26, letterSpacing: "-0.02em", color: "var(--text-strong)" }}>The Arcade</div>
          <div className="gl-body" style={{ fontSize: 12.5, marginTop: 3 }}>
            <span style={{ fontFamily: "var(--font-data)", fontWeight: 700, color: "var(--accent-play)" }}>{D.GAME_COUNT}</span> games · swipe each shelf
          </div>
        </div>

        {D.ROWS.map((r) => <Row key={r.group} {...r} />)}

        {/* Beta Sandbox — buried, collapsible */}
        <div style={{ marginTop: 4 }}>
          <button onClick={() => setOpen((o) => !o)} className="gl-tap"
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
              borderRadius: "var(--radius-md)", background: "var(--surface-inset)", border: "1px dashed var(--border-strong)", textAlign: "left" }}>
            <span style={{ display: "flex", color: "var(--text-muted)" }}>{ic("flagdna", "var(--text-muted)", 18)}</span>
            <div style={{ flex: 1 }}>
              <div className="gl-display" style={{ fontWeight: 600, fontSize: 14, color: "var(--text-strong)" }}>Beta Sandbox</div>
              <div className="gl-body" style={{ fontSize: 10.5, marginTop: 1 }}>{S.games.length} experimental & niche games</div>
            </div>
            <Badge accent="var(--text-muted)" tone="outline">beta</Badge>
            <span style={{ display: "flex", color: "var(--text-muted)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.28s var(--ease-paper)" }}>
              {ic("chevronDown", "var(--text-muted)", 18)}
            </span>
          </button>

          {open && (
            <div className="gl-slide-up" style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {S.games.map((g) => (
                <GameTile key={g.id} icon={ic(g.glyph, "var(--text-muted)")} title={g.title} subtitle={g.sub} accent="var(--text-muted)" width="100%" />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  window.PlayTab = PlayTab;
})();
