/* @ds-bundle: {"format":3,"namespace":"GlobalioDesignSystem_019dee","components":[{"name":"GameTile","sourcePath":"components/cards/GameTile.jsx"},{"name":"HeroCard","sourcePath":"components/cards/HeroCard.jsx"},{"name":"ModuleCard","sourcePath":"components/cards/ModuleCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"FlagChip","sourcePath":"components/data/FlagChip.jsx"},{"name":"ProgressRing","sourcePath":"components/data/ProgressRing.jsx"},{"name":"StatPill","sourcePath":"components/data/StatPill.jsx"},{"name":"SectionHeader","sourcePath":"components/navigation/SectionHeader.jsx"},{"name":"TabBar","sourcePath":"components/navigation/TabBar.jsx"}],"sourceHashes":{"assets/line-icon.js":"a031187bc4c0","components/cards/GameTile.jsx":"c9932b906f96","components/cards/HeroCard.jsx":"0d7645d000f9","components/cards/ModuleCard.jsx":"cd87f43e0427","components/core/Badge.jsx":"359cee04dfd2","components/core/Button.jsx":"f5b3d7af8604","components/core/Card.jsx":"d784c5cfed79","components/data/FlagChip.jsx":"bfcf05d3326c","components/data/ProgressRing.jsx":"70a595d34b70","components/data/StatPill.jsx":"1a9c6c0e9105","components/navigation/SectionHeader.jsx":"269b49f44905","components/navigation/TabBar.jsx":"b51d00bb3e1e","ui_kits/app/CodexTab.jsx":"b96edbd77517","ui_kits/app/LearnTab.jsx":"b9ea2da0b793","ui_kits/app/PlayTab.jsx":"884320ab4847","ui_kits/app/Shell.jsx":"7e4367ac6379","ui_kits/app/TodayTab.jsx":"c56c13d19a24","ui_kits/app/YouTab.jsx":"ec697a79e0a4","ui_kits/app/data.js":"15338b286bde"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GlobalioDesignSystem_019dee = window.GlobalioDesignSystem_019dee || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/line-icon.js
try { (() => {
/* ============================================================================
   GLOBALIO · LineIcon helper (for demos, specimen cards & UI kits)
   The brand renders monochrome, etched line icons (Lucide, 1.6 stroke,
   currentColor). This builds a React icon from Lucide's UMD data and maps the
   app's glyph ids -> Lucide names, exactly as the product does.

   Load order:  React  →  lucide UMD  →  this file.
   Usage:       <LineIcon name="flags" size={22} color="var(--accent-learn)" />
   ============================================================================ */
(function () {
  // glyph id -> Lucide PascalCase name (mirrors the app's icons map)
  var GLYPHS = {
    // learn
    flags: "Flag",
    flashcards: "Layers",
    historical: "ScrollText",
    identity: "HeartHandshake",
    reversequiz: "Target",
    capitalquiz: "Landmark",
    language: "Languages",
    geo: "Globe2",
    provinceroulette: "Dices",
    substumper: "MapPin",
    lineage: "TreeDeciduous",
    // play
    oddoneout: "Search",
    thecrop: "Crop",
    flagdna: "Dna",
    silhouette: "Moon",
    thepeel: "Brush",
    lookalikes: "Search",
    buildflag: "Puzzle",
    composer: "Palette",
    flagfamilies: "Users",
    funfact: "Lightbulb",
    gauntlet: "Swords",
    challenge: "Medal",
    tierlist: "Trophy",
    flagle: "LayoutGrid",
    realorbot: "Bot",
    timeline: "History",
    deadoralive: "Skull",
    frankenflag: "SplitSquareHorizontal",
    higherlower: "ArrowUpDown",
    describeit: "AlignLeft",
    flagbracket: "Vote",
    bordermap: "MapPinned",
    borderchain: "Waypoints",
    gacha: "Gift",
    symbolhunt: "ScanSearch",
    twotruths: "VenetianMask",
    capitalmatch: "Building2",
    oddborder: "Signpost",
    continentsort: "FolderTree",
    statclash: "Scale",
    // codex / chrome / tabs
    codex: "BookOpen",
    progressmap: "Map",
    substats: "BarChart3",
    profile: "User",
    achievements: "Award",
    settings: "Settings",
    today: "Compass",
    quickplay: "Zap",
    learn: "GraduationCap",
    play: "Gamepad2",
    you: "User",
    // brand chrome
    flame: "Flame",
    crown: "Crown",
    search: "Search",
    arrowRight: "ArrowRight",
    chevronDown: "ChevronDown",
    chevronRight: "ChevronRight",
    check: "Check",
    x: "X",
    star: "Star",
    share: "Share2",
    calendar: "CalendarDays",
    sparkles: "Sparkles"
  };
  function LineIcon(props) {
    var R = window.React;
    var name = props.name;
    var size = props.size || 21;
    var stroke = props.strokeWidth || 1.6;
    var color = props.color || "currentColor";
    var pascal = GLYPHS[name] || (window.lucide && window.lucide.icons && window.lucide.icons[name] ? name : "Compass");
    var data = window.lucide && window.lucide.icons && window.lucide.icons[pascal] || [];
    var children = data.map(function (node, i) {
      return R.createElement(node[0], Object.assign({
        key: i
      }, node[1]));
    });
    return R.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: stroke,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        display: "block",
        flexShrink: 0
      }
    }, children);
  }
  window.LineIcon = LineIcon;
  window.GLOBALIO_GLYPHS = GLYPHS;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/line-icon.js", error: String((e && e.message) || e) }); }

// components/cards/GameTile.jsx
try { (() => {
/**
 * GameTile — the compact, casual minigame tile used in the Play arcade grids
 * and the swipeable "Games to try" rows. Icon chip + title + one-line subtitle
 * on a paper card with an accent watercolour wash.
 */
function GameTile({
  icon = null,
  title,
  subtitle,
  accent = "var(--accent-play)",
  onClick,
  width = 124,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: "gl-tap gl-card is-interactive",
    style: {
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
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "var(--icon-chip-sm)",
      height: "var(--icon-chip-sm)",
      borderRadius: "var(--radius-sm)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: `color-mix(in srgb, ${accent} 12%, transparent)`,
      border: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`,
      color: accent
    }
  }, icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gl-display",
    style: {
      fontWeight: 600,
      fontSize: 12.5,
      lineHeight: 1.1
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-body)",
      fontSize: 9.5,
      marginTop: 3,
      lineHeight: 1.2
    }
  }, subtitle)));
}
Object.assign(__ds_scope, { GameTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/GameTile.jsx", error: String((e && e.message) || e) }); }

// components/cards/HeroCard.jsx
try { (() => {
/**
 * HeroCard — the big, image-led card at the top of the Today tab (Flag of the
 * Day, featured game, fun fact). Eyebrow + serif title + subtitle over an
 * accent spine, with an optional contained media slot on the right.
 */
function HeroCard({
  eyebrow,
  title,
  subtitle,
  accent = "var(--accent-codex)",
  media = null,
  cta,
  onClick,
  minHeight = 150,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: "gl-tap gl-card is-interactive",
    style: {
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
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 3,
      background: accent
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gl-micro",
    style: {
      fontSize: 9,
      color: accent,
      marginBottom: 6
    }
  }, "\u25E6 ", eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "gl-display",
    style: {
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: "-0.01em",
      lineHeight: 1.05
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-body)",
      fontSize: 12,
      marginTop: 6,
      lineHeight: 1.5
    }
  }, subtitle), cta && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      alignSelf: "flex-start",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "7px 14px",
      borderRadius: "var(--radius-pill)",
      background: accent,
      color: "var(--text-on-accent)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 12
    }
  }, cta), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13
    }
  }, "\u2192"))), media && /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      alignSelf: "stretch",
      display: "flex",
      alignItems: "center"
    }
  }, media));
}
Object.assign(__ds_scope, { HeroCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/HeroCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small label chip. Tones: soft (tinted), solid (filled), outline.
 * Set `eyebrow` for the uppercase micro-label style (with a leading ◦ marker).
 */
function Badge({
  children,
  accent = "var(--accent)",
  tone = "soft",
  eyebrow = false,
  style = {},
  ...rest
}) {
  if (eyebrow) {
    return /*#__PURE__*/React.createElement("span", _extends({
      className: "gl-micro",
      style: {
        color: accent,
        fontSize: 9,
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": true
    }, "\u25E6"), children);
  }
  const tones = {
    soft: {
      background: `color-mix(in srgb, ${accent} 12%, transparent)`,
      color: accent,
      border: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`
    },
    solid: {
      background: accent,
      color: "var(--text-on-accent)",
      border: "1px solid transparent"
    },
    outline: {
      background: "transparent",
      color: accent,
      border: `1px solid color-mix(in srgb, ${accent} 45%, transparent)`
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "gl-micro",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "3px 9px",
      borderRadius: "var(--radius-pill)",
      fontSize: 8.5,
      lineHeight: 1,
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the brand's pill-shaped action. Antique-gold fill by default; pass
 * any accent. Variants: solid (filled), soft (tinted), ghost (text), outline.
 */
function Button({
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
    sm: {
      padding: "6px 12px",
      fontSize: 12,
      gap: 6,
      icon: 14
    },
    md: {
      padding: "9px 18px",
      fontSize: 13,
      gap: 7,
      icon: 16
    },
    lg: {
      padding: "12px 24px",
      fontSize: 15,
      gap: 8,
      icon: 18
    }
  };
  const s = sizes[size] || sizes.md;
  const skins = {
    solid: {
      background: accent,
      color: accentInk,
      border: "1px solid transparent"
    },
    soft: {
      background: `color-mix(in srgb, ${accent} 14%, transparent)`,
      color: accent,
      border: `1px solid color-mix(in srgb, ${accent} 32%, transparent)`
    },
    outline: {
      background: "var(--surface-card)",
      color: "var(--text-strong)",
      border: "1px solid var(--border-hairline)"
    },
    ghost: {
      background: "transparent",
      color: accent,
      border: "1px solid transparent"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    className: "gl-tap",
    disabled: disabled,
    style: {
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
      ...style
    }
  }, rest), icon, children, trailingArrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: s.icon,
      fontWeight: 700
    }
  }, "\u2192"));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the paper-stock surface every Globalio panel is built on. Hairline
 * border, soft ink-teal shadow, and a single-accent watercolour wash that
 * bleeds in on hover when `interactive`. Renders as <button> when onClick set.
 */
function Card({
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
  return /*#__PURE__*/React.createElement(Tag, _extends({
    onClick: onClick,
    className: `gl-card ${isInteractive ? "is-interactive gl-tap" : ""} ${className}`,
    style: {
      // expose the wash colour for the ::before bleed
      ["--wash"]: `color-mix(in srgb, ${accent} 42%, transparent)`,
      display: "block",
      width: "100%",
      textAlign: "left",
      padding: "var(--pad-card)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      cursor: isInteractive ? "pointer" : "default",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/FlagChip.jsx
try { (() => {
/**
 * FlagChip — a flag image inside a clean white frame, always fully contained
 * (never cropped). Uses the brand's self-hosted-first fallback chain so a
 * single CDN hiccup never shows a broken image.
 */
function FlagChip({
  code,
  w = 88,
  h = 59,
  rounded = "var(--radius-sm)",
  flagBase = "assets/flags",
  style = {}
}) {
  const sources = [`${flagBase}/${code.toLowerCase()}.svg`, `https://flagcdn.com/w320/${code.toLowerCase()}.png`, `https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/${code.toLowerCase()}.svg`];
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => setIdx(0), [code]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
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
      ...style
    }
  }, idx < sources.length ? /*#__PURE__*/React.createElement("img", {
    src: sources[idx],
    alt: code,
    loading: "lazy",
    decoding: "async",
    onError: () => setIdx(i => i + 1),
    style: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
      display: "block"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      fontSize: 22
    }
  }, "\u2691"));
}
Object.assign(__ds_scope, { FlagChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/FlagChip.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressRing.jsx
try { (() => {
/**
 * ProgressRing — circular completion meter with a monospaced % readout.
 * Used on module cards, the codex collection banner and the You dashboard.
 */
function ProgressRing({
  done,
  total,
  accent = "var(--accent)",
  size = 44,
  stroke = 3.5,
  label = true
}) {
  const pct = total ? Math.min(1, done / total) : 0;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const mid = size / 2;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: mid,
    cy: mid,
    r: r,
    fill: "none",
    stroke: "var(--border-hairline)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: mid,
    cy: mid,
    r: r,
    fill: "none",
    stroke: accent,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: c * (1 - pct),
    transform: `rotate(-90 ${mid} ${mid})`,
    style: {
      transition: "stroke-dashoffset 0.6s var(--ease-out, ease)"
    }
  }), label && /*#__PURE__*/React.createElement("text", {
    x: mid,
    y: mid,
    dominantBaseline: "central",
    textAnchor: "middle",
    fill: accent,
    fontSize: size * 0.27,
    fontWeight: 700,
    style: {
      fontFamily: "var(--font-data)",
      letterSpacing: "-0.04em",
      fontVariantNumeric: "tabular-nums"
    }
  }, Math.round(pct * 100)));
}
Object.assign(__ds_scope, { ProgressRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressRing.jsx", error: String((e && e.message) || e) }); }

// components/cards/ModuleCard.jsx
try { (() => {
/**
 * ModuleCard — the full-width "heavy task" row: icon chip, title, subtitle, and
 * either a progress ring or a trailing arrow. The backbone of the Learn & Codex
 * lists. Mastered modules (done >= total) get the aged-gold foil edge + crown.
 */
function ModuleCard({
  icon = null,
  title,
  subtitle,
  accent = "var(--accent)",
  progress,
  onClick,
  style = {}
}) {
  const mastered = !!progress && progress.total > 0 && progress.done >= progress.total;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: `gl-tap gl-card is-interactive ${mastered ? "gl-foil" : ""}`,
    style: {
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
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      top: 10,
      bottom: 10,
      width: 2.5,
      borderRadius: 2,
      background: accent
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "var(--icon-chip-md)",
      height: "var(--icon-chip-md)",
      borderRadius: "var(--radius-sm)",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: `color-mix(in srgb, ${accent} 12%, transparent)`,
      border: `1px solid color-mix(in srgb, ${accent} 28%, transparent)`,
      color: accent
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gl-display",
    style: {
      fontWeight: 600,
      fontSize: 15,
      letterSpacing: "-0.01em"
    }
  }, title, mastered && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 6
    }
  }, "\uD83D\uDC51")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-body)",
      fontSize: 11.5,
      marginTop: 1,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, subtitle)), progress ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ProgressRing, {
    done: progress.done,
    total: progress.total,
    accent: accent,
    size: 38
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-data)",
      fontSize: 9,
      color: "var(--text-muted)",
      letterSpacing: "-0.02em"
    }
  }, progress.done, "/", progress.total)) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: accent,
      fontSize: 18,
      opacity: 0.7
    }
  }, "\u2192"));
}
Object.assign(__ds_scope, { ModuleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ModuleCard.jsx", error: String((e && e.message) || e) }); }

// components/data/StatPill.jsx
try { (() => {
/**
 * StatPill — a single metric: big monospaced value + uppercase micro label,
 * with a coloured accent spine. The building block of the "Field Record" grid.
 */
function StatPill({
  icon = null,
  value,
  label,
  accent = "var(--accent)",
  big = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      padding: big ? "14px 16px" : "8px 12px",
      borderRadius: "var(--radius-sm)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-hairline)",
      position: "relative",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 2.5,
      background: accent
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      color: accent
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-data)",
      fontVariantNumeric: "tabular-nums",
      fontWeight: 800,
      fontSize: big ? 26 : 16,
      color: accent,
      letterSpacing: "-0.04em",
      lineHeight: 1
    }
  }, value)), /*#__PURE__*/React.createElement("span", {
    className: "gl-micro",
    style: {
      fontSize: 8.5,
      color: "var(--text-body)",
      letterSpacing: "0.16em"
    }
  }, label));
}
Object.assign(__ds_scope, { StatPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatPill.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SectionHeader.jsx
try { (() => {
/**
 * SectionHeader — the tracked uppercase micro-label with a short accent tick
 * that introduces every row/section. Optional right-aligned action.
 */
function SectionHeader({
  title,
  accent = "var(--text-body)",
  action = null,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 1.5,
      background: accent,
      opacity: 0.7
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "gl-micro",
    style: {
      fontSize: 10,
      color: accent
    }
  }, title)), action);
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TabBar.jsx
try { (() => {
/**
 * TabBar — the fixed bottom navigation. Five destinations, each with its own
 * accent; the active tab lights its top bar, icon and label. Pass a
 * `renderIcon(glyph, active, color)` to draw icons (e.g. with LineIcon).
 */
const DEFAULT_TABS = [{
  key: "today",
  label: "Today",
  glyph: "today",
  accent: "var(--accent-today)"
}, {
  key: "learn",
  label: "Learn",
  glyph: "learn",
  accent: "var(--accent-learn)"
}, {
  key: "play",
  label: "Play",
  glyph: "play",
  accent: "var(--accent-play)"
}, {
  key: "codex",
  label: "Codex",
  glyph: "codex",
  accent: "var(--accent-codex)"
}, {
  key: "you",
  label: "You",
  glyph: "you",
  accent: "var(--accent-learn)"
}];
function TabBar({
  active,
  onChange,
  tabs = DEFAULT_TABS,
  renderIcon,
  fixed = true,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: fixed ? "fixed" : "relative",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 60,
      display: "grid",
      gridTemplateColumns: `repeat(${tabs.length},1fr)`,
      background: "rgba(251,244,228,0.94)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderTop: "1px solid var(--border-hairline)",
      paddingBottom: "env(safe-area-inset-bottom)",
      ...style
    }
  }, tabs.map(t => {
    const on = active === t.key;
    const color = on ? t.accent : "var(--text-muted)";
    return /*#__PURE__*/React.createElement("button", {
      key: t.key,
      onClick: () => onChange && onChange(t.key),
      className: "gl-tap",
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        padding: "9px 0 8px",
        position: "relative",
        background: "transparent",
        border: "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 0,
        height: 2,
        width: 26,
        borderRadius: 2,
        background: on ? t.accent : "transparent"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        color,
        opacity: on ? 1 : 0.8,
        transition: "all 0.15s"
      }
    }, renderIcon ? renderIcon(t.glyph, on, color) : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, "\u2022")), /*#__PURE__*/React.createElement("span", {
      className: "gl-micro",
      style: {
        fontSize: 8,
        color,
        letterSpacing: "0.14em"
      }
    }, t.label));
  }));
}
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TabBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/CodexTab.jsx
try { (() => {
/* CODEX — the collection, rebuilt as a calm nested accordion: Continent →
   Country. Smooth-sliding drawers replace the old wall of tiles. */
(function () {
  const NS = window.GlobalioDesignSystem_019dee;
  const {
    ProgressRing,
    Badge,
    FlagChip,
    SectionHeader
  } = NS;
  const LineIcon = window.LineIcon;
  const D = window.GLOBALIO_DATA;
  const ic = (n, c, s) => React.createElement(LineIcon, {
    name: n,
    size: s || 18,
    color: c
  });
  function ContinentDrawer({
    block,
    open,
    onToggle
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "gl-card",
      style: {
        "--wash": "color-mix(in srgb, var(--accent-codex) 42%, transparent)",
        padding: 0,
        borderRadius: "var(--radius-lg)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onToggle,
      className: "gl-tap",
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 13,
        padding: "13px 14px",
        background: "transparent",
        border: "none",
        textAlign: "left",
        borderRadius: "var(--radius-lg)"
      }
    }, /*#__PURE__*/React.createElement(ProgressRing, {
      done: block.learned,
      total: block.total,
      accent: "var(--accent-codex)",
      size: 40
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "gl-display",
      style: {
        fontWeight: 700,
        fontSize: 16,
        color: "var(--text-strong)"
      }
    }, block.continent), /*#__PURE__*/React.createElement("div", {
      className: "gl-body",
      style: {
        fontSize: 11,
        marginTop: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-data)",
        fontWeight: 600,
        color: "var(--accent-codex)"
      }
    }, block.learned), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-muted)"
      }
    }, " / ", block.total, " catalogued"))), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        color: "var(--text-muted)",
        transform: open ? "rotate(180deg)" : "none",
        transition: "transform 0.3s var(--ease-paper)"
      }
    }, ic("chevronDown", "var(--text-muted)", 20))), open && /*#__PURE__*/React.createElement("div", {
      className: "gl-slide-up",
      style: {
        padding: "2px 10px 10px"
      }
    }, block.countries.map(c => /*#__PURE__*/React.createElement("div", {
      key: c.code,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "9px 6px",
        borderTop: "1px solid var(--border-hairline)"
      }
    }, /*#__PURE__*/React.createElement(FlagChip, {
      code: c.code,
      flagBase: "../../assets/flags",
      w: 42,
      h: 28,
      rounded: "6px"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "gl-display",
      style: {
        fontWeight: 600,
        fontSize: 13.5,
        color: "var(--text-strong)"
      }
    }, c.name), /*#__PURE__*/React.createElement("div", {
      className: "gl-body",
      style: {
        fontSize: 10.5,
        marginTop: 1,
        display: "flex",
        alignItems: "center",
        gap: 4
      }
    }, ic("capitalquiz", "var(--text-muted)", 11), " ", c.cap)), c.learned ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        color: "var(--accent-success)",
        fontFamily: "var(--font-body)",
        fontSize: 10.5,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.12em"
      }
    }, ic("check", "var(--accent-success)", 14), " learned") : /*#__PURE__*/React.createElement(Badge, {
      accent: "var(--text-muted)",
      tone: "outline"
    }, "new")))));
  }
  function CodexTab() {
    const [open, setOpen] = React.useState("Europe");
    const p = D.PROFILE;
    return /*#__PURE__*/React.createElement("div", {
      className: "gl-slide-up",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "gl-card",
      style: {
        "--wash": "color-mix(in srgb, var(--accent-codex) 42%, transparent)",
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: 16
      }
    }, /*#__PURE__*/React.createElement(ProgressRing, {
      done: p.learned,
      total: p.total,
      accent: "var(--accent-codex)",
      size: 58,
      stroke: 5
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "gl-micro",
      style: {
        fontSize: 9,
        color: "var(--accent-codex)",
        marginBottom: 3
      }
    }, "\u25E6 Codex Collection"), /*#__PURE__*/React.createElement("div", {
      className: "gl-display",
      style: {
        fontWeight: 700,
        fontSize: 17,
        color: "var(--text-strong)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-data)"
      }
    }, p.learned), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-muted)",
        fontSize: 13
      }
    }, " / ", p.total), " flags catalogued"), /*#__PURE__*/React.createElement("div", {
      className: "gl-body",
      style: {
        fontSize: 11,
        marginTop: 2
      }
    }, "Open a continent to browse the binder."))), /*#__PURE__*/React.createElement(SectionHeader, {
      title: "By continent",
      accent: "var(--accent-codex)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, D.CODEX.map(b => /*#__PURE__*/React.createElement(ContinentDrawer, {
      key: b.continent,
      block: b,
      open: open === b.continent,
      onToggle: () => setOpen(o => o === b.continent ? null : b.continent)
    }))));
  }
  window.CodexTab = CodexTab;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/CodexTab.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/LearnTab.jsx
try { (() => {
/* LEARN — grouped curriculum modules with progress. */
(function () {
  const NS = window.GlobalioDesignSystem_019dee;
  const {
    ModuleCard,
    SectionHeader
  } = NS;
  const LineIcon = window.LineIcon;
  const D = window.GLOBALIO_DATA;
  const ic = (n, c) => React.createElement(LineIcon, {
    name: n,
    size: 21,
    color: c
  });
  function LearnTab() {
    return /*#__PURE__*/React.createElement("div", {
      className: "gl-slide-up",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 20
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "gl-display",
      style: {
        fontWeight: 800,
        fontSize: 26,
        letterSpacing: "-0.02em",
        color: "var(--text-strong)"
      }
    }, "Learn"), /*#__PURE__*/React.createElement("div", {
      className: "gl-body",
      style: {
        fontSize: 12.5,
        marginTop: 3
      }
    }, "Curriculum & subdivision drills, at your pace.")), D.LEARN.map(g => /*#__PURE__*/React.createElement("div", {
      key: g.group
    }, /*#__PURE__*/React.createElement(SectionHeader, {
      title: g.group,
      accent: g.accent
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, g.modules.map(m => /*#__PURE__*/React.createElement(ModuleCard, {
      key: m.id,
      icon: ic(m.glyph, g.accent),
      title: m.title,
      subtitle: m.sub,
      accent: g.accent,
      progress: m.total ? {
        done: m.done,
        total: m.total
      } : undefined
    }))))));
  }
  window.LearnTab = LearnTab;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/LearnTab.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/PlayTab.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* PLAY — the arcade. Horizontal, swipeable Netflix-style rows; the niche games
   are buried in a collapsible Beta Sandbox at the very bottom. */
(function () {
  const NS = window.GlobalioDesignSystem_019dee;
  const {
    GameTile,
    SectionHeader,
    Badge
  } = NS;
  const LineIcon = window.LineIcon;
  const D = window.GLOBALIO_DATA;
  const ic = (n, c, s) => React.createElement(LineIcon, {
    name: n,
    size: s || 21,
    color: c
  });
  function Row({
    group,
    accent,
    games
  }) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeader, {
      title: group,
      accent: accent
    }), /*#__PURE__*/React.createElement("div", {
      className: "gl-rail",
      style: {
        display: "flex",
        gap: 10,
        overflowX: "auto",
        margin: "0 -18px",
        padding: "2px 18px 6px"
      }
    }, games.map(g => /*#__PURE__*/React.createElement(GameTile, {
      key: g.id,
      icon: ic(g.glyph, accent),
      title: g.title,
      subtitle: g.sub,
      accent: accent
    }))));
  }
  function PlayTab() {
    const [open, setOpen] = React.useState(false);
    const S = D.SANDBOX;
    return /*#__PURE__*/React.createElement("div", {
      className: "gl-slide-up",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 20
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "gl-display",
      style: {
        fontWeight: 800,
        fontSize: 26,
        letterSpacing: "-0.02em",
        color: "var(--text-strong)"
      }
    }, "The Arcade"), /*#__PURE__*/React.createElement("div", {
      className: "gl-body",
      style: {
        fontSize: 12.5,
        marginTop: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-data)",
        fontWeight: 700,
        color: "var(--accent-play)"
      }
    }, D.GAME_COUNT), " games \xB7 swipe each shelf")), D.ROWS.map(r => /*#__PURE__*/React.createElement(Row, _extends({
      key: r.group
    }, r))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(o => !o),
      className: "gl-tap",
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 14px",
        borderRadius: "var(--radius-md)",
        background: "var(--surface-inset)",
        border: "1px dashed var(--border-strong)",
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        color: "var(--text-muted)"
      }
    }, ic("flagdna", "var(--text-muted)", 18)), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "gl-display",
      style: {
        fontWeight: 600,
        fontSize: 14,
        color: "var(--text-strong)"
      }
    }, "Beta Sandbox"), /*#__PURE__*/React.createElement("div", {
      className: "gl-body",
      style: {
        fontSize: 10.5,
        marginTop: 1
      }
    }, S.games.length, " experimental & niche games")), /*#__PURE__*/React.createElement(Badge, {
      accent: "var(--text-muted)",
      tone: "outline"
    }, "beta"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        color: "var(--text-muted)",
        transform: open ? "rotate(180deg)" : "none",
        transition: "transform 0.28s var(--ease-paper)"
      }
    }, ic("chevronDown", "var(--text-muted)", 18))), open && /*#__PURE__*/React.createElement("div", {
      className: "gl-slide-up",
      style: {
        marginTop: 10,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10
      }
    }, S.games.map(g => /*#__PURE__*/React.createElement(GameTile, {
      key: g.id,
      icon: ic(g.glyph, "var(--text-muted)"),
      title: g.title,
      subtitle: g.sub,
      accent: "var(--text-muted)",
      width: "100%"
    })))));
  }
  window.PlayTab = PlayTab;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/PlayTab.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Shell.jsx
try { (() => {
/* SHELL — header, per-tab content, and the fixed bottom tab bar, inside the
   phone frame. */
(function () {
  const NS = window.GlobalioDesignSystem_019dee;
  const {
    TabBar
  } = NS;
  const LineIcon = window.LineIcon;
  const D = window.GLOBALIO_DATA;
  const ic = (n, c, s) => React.createElement(LineIcon, {
    name: n,
    size: s || 19,
    color: c
  });
  function Header({
    go
  }) {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 18px 8px",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 9
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/earth-logo.svg",
      width: "26",
      height: "26",
      alt: ""
    }), /*#__PURE__*/React.createElement("span", {
      className: "gl-display",
      style: {
        fontWeight: 700,
        fontSize: 21,
        color: "var(--text-strong)",
        letterSpacing: "0.01em"
      }
    }, "Globalio")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "5px 11px",
        borderRadius: "var(--radius-pill)",
        background: "var(--surface-card)",
        border: "1px solid color-mix(in srgb, var(--accent-today) 40%, transparent)"
      }
    }, ic("flame", "var(--accent-today)", 13), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-data)",
        fontWeight: 700,
        fontSize: 14,
        color: "var(--accent-today)",
        letterSpacing: "-0.02em"
      }
    }, D.PROFILE.streak)), /*#__PURE__*/React.createElement("button", {
      onClick: () => go("you"),
      "aria-label": "Settings",
      className: "gl-tap",
      style: {
        width: 32,
        height: 32,
        borderRadius: "var(--radius-pill)",
        background: "var(--surface-card)",
        border: "1px solid var(--border-hairline)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, ic("settings", "var(--text-muted)", 16))));
  }
  function App() {
    const [tab, setTab] = React.useState("today");
    const go = t => setTab(t);
    const scrollRef = React.useRef(null);
    React.useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }, [tab]);
    const Body = {
      today: window.TodayTab,
      learn: window.LearnTab,
      play: window.PlayTab,
      codex: window.CodexTab,
      you: window.YouTab
    }[tab];
    return /*#__PURE__*/React.createElement("div", {
      className: "gl-paper",
      style: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement(Header, {
      go: go
    }), /*#__PURE__*/React.createElement("main", {
      ref: scrollRef,
      style: {
        flex: 1,
        overflowY: "auto",
        padding: "8px 18px 24px"
      }
    }, /*#__PURE__*/React.createElement(Body, {
      key: tab,
      go: go
    })), /*#__PURE__*/React.createElement(TabBar, {
      active: tab,
      onChange: setTab,
      fixed: false,
      renderIcon: (g, on, c) => ic(g, c, 19)
    }));
  }
  window.GlobalioApp = App;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/TodayTab.jsx
try { (() => {
/* TODAY — the hook. Stripped to a streak celebration, one massive primary
   action, and a sleek Flag of the Day card. */
(function () {
  const NS = window.GlobalioDesignSystem_019dee;
  const {
    HeroCard,
    ModuleCard,
    GameTile,
    SectionHeader,
    Button,
    FlagChip
  } = NS;
  const LineIcon = window.LineIcon;
  const D = window.GLOBALIO_DATA;
  const ic = (n, c, s) => React.createElement(LineIcon, {
    name: n,
    size: s || 21,
    color: c
  });
  function TodayTab({
    go
  }) {
    const p = D.PROFILE;
    return /*#__PURE__*/React.createElement("div", {
      className: "gl-slide-up",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "4px 2px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "gl-pulse",
      style: {
        width: 54,
        height: 54,
        borderRadius: "50%",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "color-mix(in srgb, var(--accent-today) 14%, transparent)",
        border: "1px solid color-mix(in srgb, var(--accent-today) 34%, transparent)"
      }
    }, ic("flame", "var(--accent-today)", 26)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 7
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-data)",
        fontVariantNumeric: "tabular-nums",
        fontWeight: 800,
        fontSize: 34,
        letterSpacing: "-0.04em",
        color: "var(--accent-today)",
        lineHeight: 1
      }
    }, p.streak), /*#__PURE__*/React.createElement("span", {
      className: "gl-display",
      style: {
        fontWeight: 700,
        fontSize: 18,
        color: "var(--text-strong)"
      }
    }, "day streak")), /*#__PURE__*/React.createElement("div", {
      className: "gl-body",
      style: {
        fontSize: 12,
        marginTop: 3
      }
    }, "Best run ", p.best, " \xB7 keep the map lit"))), /*#__PURE__*/React.createElement("button", {
      className: "gl-tap gl-card is-interactive",
      onClick: () => go("play"),
      style: {
        "--wash": "color-mix(in srgb, var(--accent-play) 42%, transparent)",
        position: "relative",
        overflow: "hidden",
        padding: "22px 20px",
        borderRadius: "var(--radius-xl)",
        textAlign: "left",
        border: "1px solid color-mix(in srgb, var(--accent-play) 36%, transparent)",
        background: "linear-gradient(150deg, color-mix(in srgb, var(--accent-play) 16%, var(--surface-card)), var(--surface-card) 70%)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        right: -18,
        bottom: -22,
        opacity: 0.12,
        color: "var(--accent-play)"
      }
    }, ic("today", "var(--accent-play)", 132)), /*#__PURE__*/React.createElement("div", {
      className: "gl-micro",
      style: {
        fontSize: 9,
        color: "var(--accent-play)",
        marginBottom: 8
      }
    }, "\u25E6 Today's expedition"), /*#__PURE__*/React.createElement("div", {
      className: "gl-display",
      style: {
        fontWeight: 800,
        fontSize: 30,
        lineHeight: 1.02,
        letterSpacing: "-0.02em",
        color: "var(--text-strong)",
        maxWidth: 240
      }
    }, "Daily Expedition"), /*#__PURE__*/React.createElement("div", {
      className: "gl-body",
      style: {
        fontSize: 12.5,
        marginTop: 6,
        maxWidth: 220
      }
    }, "Ten flags from across the world. One run, once a day."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "11px 20px",
        borderRadius: "var(--radius-pill)",
        background: "var(--accent-play)",
        color: "var(--text-on-accent)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 15
      }
    }, "Start"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16
      }
    }, "\u2192"))), /*#__PURE__*/React.createElement("button", {
      className: "gl-tap gl-card is-interactive",
      onClick: () => go("play"),
      style: {
        "--wash": "color-mix(in srgb, var(--accent-today) 40%, transparent)",
        display: "flex",
        alignItems: "center",
        gap: 13,
        padding: "13px 16px",
        borderRadius: "var(--radius-md)",
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 40,
        height: 40,
        borderRadius: "var(--radius-sm)",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "color-mix(in srgb, var(--accent-today) 12%, transparent)",
        border: "1px solid color-mix(in srgb, var(--accent-today) 28%, transparent)"
      }
    }, ic("quickplay", "var(--accent-today)", 20)), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "gl-display",
      style: {
        fontWeight: 600,
        fontSize: 15
      }
    }, "Quick Play"), /*#__PURE__*/React.createElement("div", {
      className: "gl-body",
      style: {
        fontSize: 11.5,
        marginTop: 1
      }
    }, "10 random flags \xB7 instant, no streak")), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--accent-today)",
        fontSize: 18,
        opacity: 0.7
      }
    }, "\u2192")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeader, {
      title: "Flag of the Day",
      accent: "var(--accent-codex)"
    }), /*#__PURE__*/React.createElement(HeroCard, {
      eyebrow: D.FOTD.region,
      title: D.FOTD.name,
      subtitle: D.FOTD.fact,
      accent: "var(--accent-codex)",
      cta: "Open in codex",
      onClick: () => go("codex"),
      media: /*#__PURE__*/React.createElement(FlagChip, {
        code: D.FOTD.code,
        flagBase: "../../assets/flags",
        w: 104,
        h: 70
      })
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeader, {
      title: "Pick up where you left off",
      accent: "var(--accent-learn)"
    }), /*#__PURE__*/React.createElement(ModuleCard, {
      icon: ic("flags", "var(--accent-learn)"),
      title: "Flag Sets",
      subtitle: "Country, historical & identity sets",
      accent: "var(--accent-learn)",
      progress: {
        done: p.learned,
        total: p.total
      },
      onClick: () => go("learn")
    })));
  }
  window.TodayTab = TodayTab;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/TodayTab.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/YouTab.jsx
try { (() => {
/* YOU — the trophy room. World mastery dial, field record, crowns, links. */
(function () {
  const NS = window.GlobalioDesignSystem_019dee;
  const {
    ProgressRing,
    StatPill,
    ModuleCard,
    SectionHeader,
    Badge
  } = NS;
  const LineIcon = window.LineIcon;
  const D = window.GLOBALIO_DATA;
  const ic = (n, c, s) => React.createElement(LineIcon, {
    name: n,
    size: s || 21,
    color: c
  });
  const CROWNS = ["Europe", "Nordics", "Americas", "Benelux", "Iberia", "Alpine", "Oceania"];
  function YouTab() {
    const p = D.PROFILE;
    const pct = Math.round(p.learned / p.total * 100);
    return /*#__PURE__*/React.createElement("div", {
      className: "gl-slide-up",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "gl-card",
      style: {
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: 18
      }
    }, /*#__PURE__*/React.createElement(ProgressRing, {
      done: p.learned,
      total: p.total,
      accent: "var(--accent-learn)",
      size: 72,
      stroke: 6
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "gl-micro",
      style: {
        fontSize: 9,
        color: "var(--accent-learn)",
        marginBottom: 4
      }
    }, "\u25E6 World Mastery"), /*#__PURE__*/React.createElement("div", {
      className: "gl-display",
      style: {
        fontWeight: 700,
        fontSize: 24,
        color: "var(--text-strong)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-data)"
      }
    }, pct), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-muted)",
        fontSize: 16
      }
    }, "%")), /*#__PURE__*/React.createElement("div", {
      className: "gl-body",
      style: {
        fontSize: 11,
        marginTop: 2
      }
    }, p.learned, " of ", p.total, " flags mastered"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeader, {
      title: "Field Record",
      accent: "var(--accent-today)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(StatPill, {
      icon: ic("flame", "var(--accent-today)", 15),
      value: p.streak,
      label: "Day streak",
      accent: "var(--accent-today)",
      big: true
    }), /*#__PURE__*/React.createElement(StatPill, {
      icon: ic("quickplay", "var(--accent-play)", 15),
      value: p.best,
      label: "Best streak",
      accent: "var(--accent-play)",
      big: true
    }), /*#__PURE__*/React.createElement(StatPill, {
      icon: ic("crown", "var(--accent-learn)", 15),
      value: p.crowns,
      label: "Crowns",
      accent: "var(--accent-learn)",
      big: true
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeader, {
      title: "Crowns earned",
      accent: "var(--accent-codex)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 8
      }
    }, CROWNS.map(c => /*#__PURE__*/React.createElement("div", {
      key: c,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 11px",
        borderRadius: "var(--radius-pill)",
        background: "color-mix(in srgb, var(--accent-codex) 10%, transparent)",
        border: "1px solid color-mix(in srgb, var(--accent-codex) 32%, transparent)"
      }
    }, ic("crown", "var(--accent-codex)", 13), /*#__PURE__*/React.createElement("span", {
      className: "gl-display",
      style: {
        fontWeight: 600,
        fontSize: 12,
        color: "var(--text-strong)"
      }
    }, c))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(ModuleCard, {
      icon: ic("profile", "var(--accent-learn)"),
      title: "Full Profile",
      subtitle: "Detailed history & badges",
      accent: "var(--accent-learn)"
    }), /*#__PURE__*/React.createElement(ModuleCard, {
      icon: ic("achievements", "var(--accent-codex)"),
      title: "Achievements",
      subtitle: "Milestones & medals",
      accent: "var(--accent-codex)"
    }), /*#__PURE__*/React.createElement(ModuleCard, {
      icon: ic("settings", "var(--text-muted)"),
      title: "Settings",
      subtitle: "Themes & aesthetic",
      accent: "var(--text-muted)"
    })));
  }
  window.YouTab = YouTab;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/YouTab.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/data.js
try { (() => {
/* ============================================================================
   GLOBALIO UI KIT · sample data
   A trimmed slice of the real app's registry & flag set, enough to drive an
   interactive "chill cartography" recreation. (Production has 45+ games, 195
   flags, full subdivisions — none of that is removed, only sampled here.)
   ============================================================================ */
window.GLOBALIO_DATA = function () {
  // ── Game registry, grouped into Netflix-style rows ──────────────────────
  const ROWS = [{
    group: "Daily Puzzles",
    accent: "var(--accent-today)",
    games: [{
      id: "flagle",
      title: "Flagle",
      sub: "Flag Wordle · 6 guesses",
      glyph: "flagle"
    }, {
      id: "daily",
      title: "Daily Game",
      sub: "10 flags · new today",
      glyph: "reversequiz"
    }, {
      id: "gacha",
      title: "Flag Gacha",
      sub: "Daily pull · collect",
      glyph: "gacha"
    }, {
      id: "funfact",
      title: "Fun Fact",
      sub: "Today's flag fact",
      glyph: "funfact"
    }, {
      id: "timeline",
      title: "Flag Timeline",
      sub: "Order them in time",
      glyph: "timeline"
    }]
  }, {
    group: "Brain Benders",
    accent: "var(--accent-play)",
    games: [{
      id: "flagdna",
      title: "Flag DNA",
      sub: "Guess by attributes",
      glyph: "flagdna"
    }, {
      id: "buildflag",
      title: "Build the Flag",
      sub: "Assemble the bands",
      glyph: "buildflag"
    }, {
      id: "thepeel",
      title: "The Peel",
      sub: "Scratch to reveal",
      glyph: "thepeel"
    }, {
      id: "frankenflag",
      title: "Frankenflag",
      sub: "Name both halves",
      glyph: "frankenflag"
    }, {
      id: "realorbot",
      title: "Real or Bot",
      sub: "Real flag or AI fake?",
      glyph: "realorbot"
    }, {
      id: "lineage",
      title: "Lineage",
      sub: "Trace the family tree",
      glyph: "lineage"
    }]
  }, {
    group: "Geography",
    accent: "var(--accent-learn)",
    games: [{
      id: "geo",
      title: "Geography",
      sub: "Countries by shape",
      glyph: "geo"
    }, {
      id: "bordermap",
      title: "Border Map",
      sub: "Fill in the neighbours",
      glyph: "bordermap"
    }, {
      id: "borderchain",
      title: "Border Path",
      sub: "Connect by land",
      glyph: "borderchain"
    }, {
      id: "oddborder",
      title: "Odd Border Out",
      sub: "Spot the non-neighbour",
      glyph: "oddborder"
    }, {
      id: "continentsort",
      title: "Continent Sort",
      sub: "Sort by region",
      glyph: "continentsort"
    }]
  }, {
    group: "Quick Drills",
    accent: "var(--accent-codex)",
    games: [{
      id: "capitalquiz",
      title: "Capital Cities",
      sub: "Name that capital",
      glyph: "capitalquiz"
    }, {
      id: "reversequiz",
      title: "Flag ID Challenge",
      sub: "Name → pick the flag",
      glyph: "reversequiz"
    }, {
      id: "higherlower",
      title: "Higher / Lower",
      sub: "More red or blue?",
      glyph: "higherlower"
    }, {
      id: "statclash",
      title: "Stat Clash",
      sub: "Bigger pop or area?",
      glyph: "statclash"
    }, {
      id: "twotruths",
      title: "Two Truths",
      sub: "Spot the lie",
      glyph: "twotruths"
    }]
  }];

  // Niche / clunky games — buried in a collapsible Beta Sandbox at the bottom.
  const SANDBOX = {
    group: "Beta Sandbox",
    accent: "var(--text-muted)",
    games: [{
      id: "uscityflags",
      title: "US City Flags",
      sub: "Name the city",
      glyph: "capitalmatch"
    }, {
      id: "symbolhunt",
      title: "Symbol Hunt",
      sub: "Find a symbol",
      glyph: "symbolhunt"
    }, {
      id: "describeit",
      title: "Describe-It",
      sub: "Guess from clues",
      glyph: "describeit"
    }, {
      id: "oddoneout",
      title: "Odd One Out",
      sub: "Find the impostor",
      glyph: "oddoneout"
    }, {
      id: "silhouette",
      title: "Silhouette",
      sub: "Guess from the dark",
      glyph: "silhouette"
    }, {
      id: "thecrop",
      title: "The Crop",
      sub: "Zoom out to guess",
      glyph: "thecrop"
    }, {
      id: "composer",
      title: "The Composer",
      sub: "Reassemble the flag",
      glyph: "composer"
    }, {
      id: "lookalikes",
      title: "Lookalikes",
      sub: "Spot the real one",
      glyph: "lookalikes"
    }, {
      id: "flagfamilies",
      title: "Flag Families",
      sub: "Sort into families",
      glyph: "flagfamilies"
    }, {
      id: "prideroulette",
      title: "Pride Roulette",
      sub: "Survival",
      glyph: "identity"
    }, {
      id: "tierlist",
      title: "Tier List Maker",
      sub: "Rank flags S–F",
      glyph: "tierlist"
    }]
  };

  // ── Learn modules (Curriculum / Subdivisions) ───────────────────────────
  const LEARN = [{
    group: "Curriculum",
    accent: "var(--accent-learn)",
    modules: [{
      id: "flags",
      title: "Flag Sets",
      sub: "Country, historical & identity sets",
      glyph: "flags",
      done: 88,
      total: 195
    }, {
      id: "flashcards",
      title: "Flashcards",
      sub: "Swipe & learn all 195",
      glyph: "flashcards",
      done: 88,
      total: 195
    }, {
      id: "historical",
      title: "Historical Flags",
      sub: "Vanished empires & states",
      glyph: "historical"
    }, {
      id: "identity",
      title: "Identity Flags",
      sub: "Pride · ethnic · signal flags",
      glyph: "identity"
    }]
  }, {
    group: "Subdivisions",
    accent: "var(--accent-learn)",
    modules: [{
      id: "provinceroulette",
      title: "Province Roulette",
      sub: "Continent → country → region",
      glyph: "provinceroulette",
      done: 31,
      total: 280
    }, {
      id: "substumper",
      title: "Subdivision Stumper",
      sub: "Province flag → country",
      glyph: "substumper",
      done: 31,
      total: 280
    }]
  }];

  // ── Codex: continents → countries (for the nested accordion) ────────────
  const CODEX = [{
    continent: "Europe",
    learned: 9,
    total: 12,
    countries: [{
      code: "gb",
      name: "United Kingdom",
      cap: "London",
      learned: true
    }, {
      code: "fr",
      name: "France",
      cap: "Paris",
      learned: true
    }, {
      code: "de",
      name: "Germany",
      cap: "Berlin",
      learned: true
    }, {
      code: "it",
      name: "Italy",
      cap: "Rome",
      learned: true
    }, {
      code: "es",
      name: "Spain",
      cap: "Madrid",
      learned: true
    }, {
      code: "se",
      name: "Sweden",
      cap: "Stockholm",
      learned: true
    }, {
      code: "ch",
      name: "Switzerland",
      cap: "Bern",
      learned: true
    }, {
      code: "nl",
      name: "Netherlands",
      cap: "Amsterdam",
      learned: true
    }, {
      code: "pt",
      name: "Portugal",
      cap: "Lisbon",
      learned: true
    }, {
      code: "gr",
      name: "Greece",
      cap: "Athens",
      learned: false
    }, {
      code: "no",
      name: "Norway",
      cap: "Oslo",
      learned: false
    }, {
      code: "pl",
      name: "Poland",
      cap: "Warsaw",
      learned: false
    }]
  }, {
    continent: "Americas",
    learned: 3,
    total: 5,
    countries: [{
      code: "us",
      name: "United States",
      cap: "Washington",
      learned: true
    }, {
      code: "ca",
      name: "Canada",
      cap: "Ottawa",
      learned: true
    }, {
      code: "br",
      name: "Brazil",
      cap: "Brasília",
      learned: true
    }, {
      code: "mx",
      name: "Mexico",
      cap: "Mexico City",
      learned: false
    }, {
      code: "ar",
      name: "Argentina",
      cap: "Buenos Aires",
      learned: false
    }]
  }, {
    continent: "Asia",
    learned: 1,
    total: 2,
    countries: [{
      code: "jp",
      name: "Japan",
      cap: "Tokyo",
      learned: true
    }, {
      code: "in",
      name: "India",
      cap: "New Delhi",
      learned: false
    }]
  }, {
    continent: "Africa",
    learned: 1,
    total: 3,
    countries: [{
      code: "za",
      name: "South Africa",
      cap: "Pretoria",
      learned: true
    }, {
      code: "ke",
      name: "Kenya",
      cap: "Nairobi",
      learned: false
    }, {
      code: "eg",
      name: "Egypt",
      cap: "Cairo",
      learned: false
    }]
  }, {
    continent: "Oceania",
    learned: 1,
    total: 2,
    countries: [{
      code: "au",
      name: "Australia",
      cap: "Canberra",
      learned: true
    }, {
      code: "nz",
      name: "New Zealand",
      cap: "Wellington",
      learned: false
    }]
  }];

  // ── Flag of the day & a fun fact ────────────────────────────────────────
  const FOTD = {
    code: "br",
    name: "Brazil",
    region: "South America",
    fact: "The 27 stars on Brazil's flag show the night sky over Rio de Janeiro exactly as it appeared on 15 November 1889."
  };
  const FACT = {
    code: "np",
    name: "Nepal",
    fact: "Nepal flies the world's only non-rectangular national flag — two stacked pennants representing the Himalayas."
  };
  const PROFILE = {
    name: "Cartographer",
    streak: 42,
    best: 61,
    crowns: 7,
    learned: 88,
    total: 195
  };
  return {
    ROWS,
    SANDBOX,
    LEARN,
    CODEX,
    FOTD,
    FACT,
    PROFILE,
    GAME_COUNT: 45
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.GameTile = __ds_scope.GameTile;

__ds_ns.HeroCard = __ds_scope.HeroCard;

__ds_ns.ModuleCard = __ds_scope.ModuleCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.FlagChip = __ds_scope.FlagChip;

__ds_ns.ProgressRing = __ds_scope.ProgressRing;

__ds_ns.StatPill = __ds_scope.StatPill;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.TabBar = __ds_scope.TabBar;

})();
