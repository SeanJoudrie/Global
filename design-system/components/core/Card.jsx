import React from "react";

/**
 * Card — the paper-stock surface every Globalio panel is built on. Hairline
 * border, soft ink-teal shadow, and a single-accent watercolour wash that
 * bleeds in on hover when `interactive`. Renders as <button> when onClick set.
 */
export function Card({
  children,
  accent = "var(--accent)",
  interactive = false,
  as,
  style = {},
  className = "",
  onClick,
  ...rest
}) {
  const Tag = as || (onClick ? "button" : "div");
  const isInteractive = interactive || !!onClick;
  return (
    <Tag
      onClick={onClick}
      className={`gl-card ${isInteractive ? "is-interactive gl-tap" : ""} ${className}`}
      style={{
        // expose the wash colour for the ::before bleed
        ["--wash"]: `color-mix(in srgb, ${accent} 42%, transparent)`,
        display: "block",
        width: "100%",
        textAlign: "left",
        padding: "var(--pad-card)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        cursor: isInteractive ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
