import React from "react";

/**
 * Badge — small label chip. Tones: soft (tinted), solid (filled), outline.
 * Set `eyebrow` for the uppercase micro-label style (with a leading ◦ marker).
 */
export function Badge({
  children,
  accent = "var(--accent)",
  tone = "soft",
  eyebrow = false,
  style = {},
  ...rest
}) {
  if (eyebrow) {
    return (
      <span
        className="gl-micro"
        style={{ color: accent, fontSize: 9, display: "inline-flex", alignItems: "center", gap: 5, ...style }}
        {...rest}
      >
        <span aria-hidden>◦</span>
        {children}
      </span>
    );
  }

  const tones = {
    soft: {
      background: `color-mix(in srgb, ${accent} 12%, transparent)`,
      color: accent,
      border: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`,
    },
    solid: { background: accent, color: "var(--text-on-accent)", border: "1px solid transparent" },
    outline: { background: "transparent", color: accent, border: `1px solid color-mix(in srgb, ${accent} 45%, transparent)` },
  };

  return (
    <span
      className="gl-micro"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 9px",
        borderRadius: "var(--radius-pill)",
        fontSize: 8.5,
        lineHeight: 1,
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
