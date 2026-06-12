/* SHELL — header, per-tab content, and the fixed bottom tab bar, inside the
   phone frame. */
(function () {
  const NS = window.GlobalioDesignSystem_019dee;
  const { TabBar } = NS;
  const LineIcon = window.LineIcon;
  const D = window.GLOBALIO_DATA;
  const ic = (n, c, s) => React.createElement(LineIcon, { name: n, size: s || 19, color: c });

  function Header({ go }) {
    return (
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px 8px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <img src="../../assets/earth-logo.svg" width="26" height="26" alt="" />
          <span className="gl-display" style={{ fontWeight: 700, fontSize: 21, color: "var(--text-strong)", letterSpacing: "0.01em" }}>Globalio</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 11px", borderRadius: "var(--radius-pill)",
            background: "var(--surface-card)", border: "1px solid color-mix(in srgb, var(--accent-today) 40%, transparent)" }}>
            {ic("flame", "var(--accent-today)", 13)}
            <span style={{ fontFamily: "var(--font-data)", fontWeight: 700, fontSize: 14, color: "var(--accent-today)", letterSpacing: "-0.02em" }}>{D.PROFILE.streak}</span>
          </div>
          <button onClick={() => go("you")} aria-label="Settings" className="gl-tap" style={{ width: 32, height: 32, borderRadius: "var(--radius-pill)",
            background: "var(--surface-card)", border: "1px solid var(--border-hairline)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {ic("settings", "var(--text-muted)", 16)}
          </button>
        </div>
      </header>
    );
  }

  function App() {
    const [tab, setTab] = React.useState("today");
    const go = (t) => setTab(t);
    const scrollRef = React.useRef(null);
    React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [tab]);

    const Body = {
      today: window.TodayTab,
      learn: window.LearnTab,
      play: window.PlayTab,
      codex: window.CodexTab,
      you: window.YouTab,
    }[tab];

    return (
      <div className="gl-paper" style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
        <Header go={go} />
        <main ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "8px 18px 24px" }}>
          <Body key={tab} go={go} />
        </main>
        <TabBar active={tab} onChange={setTab} fixed={false}
          renderIcon={(g, on, c) => ic(g, c, 19)} />
      </div>
    );
  }
  window.GlobalioApp = App;
})();
