import React from "react";

/**
 * Button — the brand's pill-shaped action. Antique-gold fill by default; pass
 * any accent. Variants: solid (filled), soft (tinted), ghost (text), outline.
 */
export function Button({
  children,
  variant = "solid",
  size = "md",
  accent = "var(--accent)",
  accentInk = "var(--text-on-accent)",
  trailingArrow = false,
  icon = null,
  disabled = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: "6px 12px", fontSize: 12, gap: 6, icon: 14 },
    md: { padding: "9px 18px", fontSize: 13, gap: 7, icon: 16 },
    lg: { padding: "12px 24px", fontSize: 15, gap: 8, icon: 18 },
  };
  const s = sizes[size] || sizes.md;

  const skins = {
    solid: { background: accent, color: accentInk, border: "1px solid transparent" },
    soft: {
      background: `color-mix(in srgb, ${accent} 14%, transparent)`,
      color: accent,
      border: `1px solid color-mix(in srgb, ${accent} 32%, transparent)`,
    },
    outline: { background: "var(--surface-card)", color: "var(--text-strong)", border: "1px solid var(--border-hairline)" },
    ghost: { background: "transparent", color: accent, border: "1px solid transparent" },
  };

  return (
    <button
      className="gl-tap"
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        padding: s.padding,
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: s.fontSize,
        lineHeight: 1,
        letterSpacing: "-0.01em",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        whiteSpace: "nowrap",
        ...skins[variant],
        ...style,
      }}
      {...rest}
    >
      {icon}
      {children}
      {trailingArrow && <span style={{ fontSize: s.icon, fontWeight: 700 }}>→</span>}
    </button>
  );
}
