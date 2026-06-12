import React from "react";

/**
 * TabBar — the fixed bottom navigation. Five destinations, each with its own
 * accent; the active tab lights its top bar, icon and label. Pass a
 * `renderIcon(glyph, active, color)` to draw icons (e.g. with LineIcon).
 */
const DEFAULT_TABS = [
  { key: "today", label: "Today", glyph: "today", accent: "var(--accent-today)" },
  { key: "learn", label: "Learn", glyph: "learn", accent: "var(--accent-learn)" },
  { key: "play", label: "Play", glyph: "play", accent: "var(--accent-play)" },
  { key: "codex", label: "Codex", glyph: "codex", accent: "var(--accent-codex)" },
  { key: "you", label: "You", glyph: "you", accent: "var(--accent-learn)" },
];

export function TabBar({ active, onChange, tabs = DEFAULT_TABS, renderIcon, fixed = true, style = {} }) {
  return (
    <nav
      style={{
        position: fixed ? "fixed" : "relative",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 60,
        display: "grid",
        gridTemplateColumns: `repeat(${tabs.length},1fr)`,
        background: "rgba(251,244,228,0.94)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderTop: "1px solid var(--border-hairline)",
        paddingBottom: "env(safe-area-inset-bottom)",
        ...style,
      }}
    >
      {tabs.map((t) => {
        const on = active === t.key;
        const color = on ? t.accent : "var(--text-muted)";
        return (
          <button
            key={t.key}
            onClick={() => onChange && onChange(t.key)}
            className="gl-tap"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: "9px 0 8px",
              position: "relative",
              background: "transparent",
              border: "none",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 0,
                height: 2,
                width: 26,
                borderRadius: 2,
                background: on ? t.accent : "transparent",
              }}
            />
            <span style={{ display: "flex", color, opacity: on ? 1 : 0.8, transition: "all 0.15s" }}>
              {renderIcon ? renderIcon(t.glyph, on, color) : <span style={{ fontSize: 18 }}>•</span>}
            </span>
            <span className="gl-micro" style={{ fontSize: 8, color, letterSpacing: "0.14em" }}>
              {t.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
