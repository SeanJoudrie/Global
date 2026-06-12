import React from "react";

/**
 * StatPill — a single metric: big monospaced value + uppercase micro label,
 * with a coloured accent spine. The building block of the "Field Record" grid.
 */
export function StatPill({ icon = null, value, label, accent = "var(--accent)", big = false, style = {} }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: big ? "14px 16px" : "8px 12px",
        borderRadius: "var(--radius-sm)",
        background: "var(--surface-card)",
        border: "1px solid var(--border-hairline)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2.5, background: accent }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {icon && <span style={{ display: "flex", color: accent }}>{icon}</span>}
        <span
          style={{
            fontFamily: "var(--font-data)",
            fontVariantNumeric: "tabular-nums",
            fontWeight: 800,
            fontSize: big ? 26 : 16,
            color: accent,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {value}
        </span>
      </div>
      <span className="gl-micro" style={{ fontSize: 8.5, color: "var(--text-body)", letterSpacing: "0.16em" }}>
        {label}
      </span>
    </div>
  );
}
