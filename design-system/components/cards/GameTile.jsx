import React from "react";

/**
 * GameTile — the compact, casual minigame tile used in the Play arcade grids
 * and the swipeable "Games to try" rows. Icon chip + title + one-line subtitle
 * on a paper card with an accent watercolour wash.
 */
export function GameTile({ icon = null, title, subtitle, accent = "var(--accent-play)", onClick, width = 124, style = {} }) {
  return (
    <button
      onClick={onClick}
      className="gl-tap gl-card is-interactive"
      style={{
        ["--wash"]: `color-mix(in srgb, ${accent} 40%, transparent)`,
        width,
        flexShrink: 0,
        textAlign: "left",
        padding: "12px 12px 13px",
        borderRadius: "var(--radius-md)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <span
        style={{
          width: "var(--icon-chip-sm)",
          height: "var(--icon-chip-sm)",
          borderRadius: "var(--radius-sm)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `color-mix(in srgb, ${accent} 12%, transparent)`,
          border: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`,
          color: accent,
        }}
      >
        {icon}
      </span>
      <div>
        <div className="gl-display" style={{ fontWeight: 600, fontSize: 12.5, lineHeight: 1.1 }}>
          {title}
        </div>
        <div style={{ color: "var(--text-body)", fontSize: 9.5, marginTop: 3, lineHeight: 1.2 }}>{subtitle}</div>
      </div>
    </button>
  );
}
