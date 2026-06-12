import React from "react";

/**
 * ProgressRing — circular completion meter with a monospaced % readout.
 * Used on module cards, the codex collection banner and the You dashboard.
 */
export function ProgressRing({
  done,
  total,
  accent = "var(--accent)",
  size = 44,
  stroke = 3.5,
  label = true,
}) {
  const pct = total ? Math.min(1, done / total) : 0;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const mid = size / 2;
  return (
    <svg width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx={mid} cy={mid} r={r} fill="none" stroke="var(--border-hairline)" strokeWidth={stroke} />
      <circle
        cx={mid}
        cy={mid}
        r={r}
        fill="none"
        stroke={accent}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        transform={`rotate(-90 ${mid} ${mid})`}
        style={{ transition: "stroke-dashoffset 0.6s var(--ease-out, ease)" }}
      />
      {label && (
        <text
          x={mid}
          y={mid}
          dominantBaseline="central"
          textAnchor="middle"
          fill={accent}
          fontSize={size * 0.27}
          fontWeight={700}
          style={{ fontFamily: "var(--font-data)", letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}
        >
          {Math.round(pct * 100)}
        </text>
      )}
    </svg>
  );
}
