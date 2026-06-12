import React from "react";

/**
 * FlagChip — a flag image inside a clean white frame, always fully contained
 * (never cropped). Uses the brand's self-hosted-first fallback chain so a
 * single CDN hiccup never shows a broken image.
 */
export function FlagChip({
  code,
  w = 88,
  h = 59,
  rounded = "var(--radius-sm)",
  flagBase = "assets/flags",
  style = {},
}) {
  const sources = [
    `${flagBase}/${code.toLowerCase()}.svg`,
    `https://flagcdn.com/w320/${code.toLowerCase()}.png`,
    `https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/${code.toLowerCase()}.svg`,
  ];
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => setIdx(0), [code]);

  return (
    <div
      style={{
        flexShrink: 0,
        width: w,
        height: h,
        borderRadius: rounded,
        overflow: "hidden",
        border: "1px solid var(--border-hairline)",
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        ...style,
      }}
    >
      {idx < sources.length ? (
        <img
          src={sources[idx]}
          alt={code}
          loading="lazy"
          decoding="async"
          onError={() => setIdx((i) => i + 1)}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
        />
      ) : (
        <span style={{ color: "var(--text-muted)", fontSize: 22 }}>⚑</span>
      )}
    </div>
  );
}
