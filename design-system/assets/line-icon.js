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
    flags: "Flag", flashcards: "Layers", historical: "ScrollText", identity: "HeartHandshake",
    reversequiz: "Target", capitalquiz: "Landmark", language: "Languages", geo: "Globe2",
    provinceroulette: "Dices", substumper: "MapPin", lineage: "TreeDeciduous",
    // play
    oddoneout: "Search", thecrop: "Crop", flagdna: "Dna", silhouette: "Moon", thepeel: "Brush",
    lookalikes: "Search", buildflag: "Puzzle", composer: "Palette", flagfamilies: "Users", funfact: "Lightbulb",
    gauntlet: "Swords", challenge: "Medal", tierlist: "Trophy",
    flagle: "LayoutGrid", realorbot: "Bot", timeline: "History", deadoralive: "Skull",
    frankenflag: "SplitSquareHorizontal", higherlower: "ArrowUpDown", describeit: "AlignLeft", flagbracket: "Vote",
    bordermap: "MapPinned", borderchain: "Waypoints", gacha: "Gift",
    symbolhunt: "ScanSearch", twotruths: "VenetianMask",
    capitalmatch: "Building2", oddborder: "Signpost", continentsort: "FolderTree", statclash: "Scale",
    // codex / chrome / tabs
    codex: "BookOpen", progressmap: "Map", substats: "BarChart3",
    profile: "User", achievements: "Award", settings: "Settings", today: "Compass", quickplay: "Zap",
    learn: "GraduationCap", play: "Gamepad2", you: "User",
    // brand chrome
    flame: "Flame", crown: "Crown", search: "Search", arrowRight: "ArrowRight",
    chevronDown: "ChevronDown", chevronRight: "ChevronRight", check: "Check", x: "X",
    star: "Star", share: "Share2", calendar: "CalendarDays", sparkles: "Sparkles",
  };

  function LineIcon(props) {
    var R = window.React;
    var name = props.name;
    var size = props.size || 21;
    var stroke = props.strokeWidth || 1.6;
    var color = props.color || "currentColor";
    var pascal = GLYPHS[name] || (window.lucide && window.lucide.icons && window.lucide.icons[name] ? name : "Compass");
    var data = (window.lucide && window.lucide.icons && window.lucide.icons[pascal]) || [];
    var children = data.map(function (node, i) {
      return R.createElement(node[0], Object.assign({ key: i }, node[1]));
    });
    return R.createElement("svg", {
      width: size, height: size, viewBox: "0 0 24 24",
      fill: "none", stroke: color, strokeWidth: stroke,
      strokeLinecap: "round", strokeLinejoin: "round",
      style: { display: "block", flexShrink: 0 },
    }, children);
  }

  window.LineIcon = LineIcon;
  window.GLOBALIO_GLYPHS = GLYPHS;
})();
