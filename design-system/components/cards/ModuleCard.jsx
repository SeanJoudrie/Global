import React from "react";
import { ProgressRing } from "../data/ProgressRing.jsx";

/**
 * ModuleCard — the full-width "heavy task" row: icon chip, title, subtitle, and
 * either a progress ring or a trailing arrow. The backbone of the Learn & Codex
 * lists. Mastered modules (done >= total) get the aged-gold foil edge + crown.
 */
export function ModuleCard({
  icon = null,
  title,
  subtitle,
  accent = "var(--accent)",
  progress,
  onClick,
  style = {},
}) {
  const mastered = !!progress && progress.total > 0 && progress.done >= progress.total;
  return (
    <button
      onClick={onClick}
      className={`gl-tap gl-card is-interactive ${mastered ? "gl-foil" : ""}`}
      style={{
        ["--wash"]: `color-mix(in srgb, ${accent} 42%, transparent)`,
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 13,
        textAlign: "left",
        padding: "13px 14px",
        borderRadius: "var(--radius-md)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <span style={{ position: "absolute", left: 0, top: 10, bottom: 10, width: 2.5, borderRadius: 2, background: accent }} />
      <span
        style={{
          width: "var(--icon-chip-md)",
          height: "var(--icon-chip-md)",
          borderRadius: "var(--radius-sm)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `color-mix(in srgb, ${accent} 12%, transparent)`,
          border: `1px solid color-mix(in srgb, ${accent} 28%, transparent)`,
          color: accent,
        }}
      >
        {icon}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="gl-display" style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em" }}>
          {title}
          {mastered && <span style={{ marginLeft: 6 }}>👑</span>}
        </div>
        <div
          style={{
            color: "var(--text-body)",
            fontSize: 11.5,
            marginTop: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {subtitle}
        </div>
      </div>
      {progress ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
          <ProgressRing done={progress.done} total={progress.total} accent={accent} size={38} />
          <span style={{ fontFamily: "var(--font-data)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "-0.02em" }}>
            {progress.done}/{progress.total}
          </span>
        </div>
      ) : (
        <span style={{ color: accent, fontSize: 18, opacity: 0.7 }}>→</span>
      )}
    </button>
  );
}
