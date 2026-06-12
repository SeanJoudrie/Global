import React from "react";

/**
 * SectionHeader — the tracked uppercase micro-label with a short accent tick
 * that introduces every row/section. Optional right-aligned action.
 */
export function SectionHeader({ title, accent = "var(--text-body)", action = null, style = {} }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 12, height: 1.5, background: accent, opacity: 0.7 }} />
        <span className="gl-micro" style={{ fontSize: 10, color: accent }}>
          {title}
        </span>
      </div>
      {action}
    </div>
  );
}
