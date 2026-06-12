import React from "react";

/**
 * HeroCard — the big, image-led card at the top of the Today tab (Flag of the
 * Day, featured game, fun fact). Eyebrow + serif title + subtitle over an
 * accent spine, with an optional contained media slot on the right.
 */
export function HeroCard({
  eyebrow,
  title,
  subtitle,
  accent = "var(--accent-codex)",
  media = null,
  cta,
  onClick,
  minHeight = 150,
  style = {},
}) {
  return (
    <button
      onClick={onClick}
      className="gl-tap gl-card is-interactive"
      style={{
        ["--wash"]: `color-mix(in srgb, ${accent} 40%, transparent)`,
        width: "100%",
        textAlign: "left",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        position: "relative",
        minHeight,
        padding: 16,
        display: "flex",
        gap: 14,
        ...style,
      }}
    >
      <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: accent }} />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div className="gl-micro" style={{ fontSize: 9, color: accent, marginBottom: 6 }}>◦ {eyebrow}</div>
        <div className="gl-display" style={{ fontWeight: 700, fontSize: 22, letterSpacing: "-0.01em", lineHeight: 1.05 }}>
          {title}
        </div>
        {subtitle && (
          <p style={{ color: "var(--text-body)", fontSize: 12, marginTop: 6, lineHeight: 1.5 }}>{subtitle}</p>
        )}
        {cta && (
          <div
            style={{
              marginTop: "auto",
              alignSelf: "flex-start",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 14px",
              borderRadius: "var(--radius-pill)",
              background: accent,
              color: "var(--text-on-accent)",
            }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12 }}>{cta}</span>
            <span style={{ fontSize: 13 }}>→</span>
          </div>
        )}
      </div>
      {media && <div style={{ flexShrink: 0, alignSelf: "stretch", display: "flex", alignItems: "center" }}>{media}</div>}
    </button>
  );
}
