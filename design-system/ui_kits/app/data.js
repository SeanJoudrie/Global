/* ============================================================================
   GLOBALIO UI KIT · sample data
   A trimmed slice of the real app's registry & flag set, enough to drive an
   interactive "chill cartography" recreation. (Production has 45+ games, 195
   flags, full subdivisions — none of that is removed, only sampled here.)
   ============================================================================ */
window.GLOBALIO_DATA = (function () {

  // ── Game registry, grouped into Netflix-style rows ──────────────────────
  const ROWS = [
    {
      group: "Daily Puzzles",
      accent: "var(--accent-today)",
      games: [
        { id: "flagle", title: "Flagle", sub: "Flag Wordle · 6 guesses", glyph: "flagle" },
        { id: "daily", title: "Daily Game", sub: "10 flags · new today", glyph: "reversequiz" },
        { id: "gacha", title: "Flag Gacha", sub: "Daily pull · collect", glyph: "gacha" },
        { id: "funfact", title: "Fun Fact", sub: "Today's flag fact", glyph: "funfact" },
        { id: "timeline", title: "Flag Timeline", sub: "Order them in time", glyph: "timeline" },
      ],
    },
    {
      group: "Brain Benders",
      accent: "var(--accent-play)",
      games: [
        { id: "flagdna", title: "Flag DNA", sub: "Guess by attributes", glyph: "flagdna" },
        { id: "buildflag", title: "Build the Flag", sub: "Assemble the bands", glyph: "buildflag" },
        { id: "thepeel", title: "The Peel", sub: "Scratch to reveal", glyph: "thepeel" },
        { id: "frankenflag", title: "Frankenflag", sub: "Name both halves", glyph: "frankenflag" },
        { id: "realorbot", title: "Real or Bot", sub: "Real flag or AI fake?", glyph: "realorbot" },
        { id: "lineage", title: "Lineage", sub: "Trace the family tree", glyph: "lineage" },
      ],
    },
    {
      group: "Geography",
      accent: "var(--accent-learn)",
      games: [
        { id: "geo", title: "Geography", sub: "Countries by shape", glyph: "geo" },
        { id: "bordermap", title: "Border Map", sub: "Fill in the neighbours", glyph: "bordermap" },
        { id: "borderchain", title: "Border Path", sub: "Connect by land", glyph: "borderchain" },
        { id: "oddborder", title: "Odd Border Out", sub: "Spot the non-neighbour", glyph: "oddborder" },
        { id: "continentsort", title: "Continent Sort", sub: "Sort by region", glyph: "continentsort" },
      ],
    },
    {
      group: "Quick Drills",
      accent: "var(--accent-codex)",
      games: [
        { id: "capitalquiz", title: "Capital Cities", sub: "Name that capital", glyph: "capitalquiz" },
        { id: "reversequiz", title: "Flag ID Challenge", sub: "Name → pick the flag", glyph: "reversequiz" },
        { id: "higherlower", title: "Higher / Lower", sub: "More red or blue?", glyph: "higherlower" },
        { id: "statclash", title: "Stat Clash", sub: "Bigger pop or area?", glyph: "statclash" },
        { id: "twotruths", title: "Two Truths", sub: "Spot the lie", glyph: "twotruths" },
      ],
    },
  ];

  // Niche / clunky games — buried in a collapsible Beta Sandbox at the bottom.
  const SANDBOX = {
    group: "Beta Sandbox",
    accent: "var(--text-muted)",
    games: [
      { id: "uscityflags", title: "US City Flags", sub: "Name the city", glyph: "capitalmatch" },
      { id: "symbolhunt", title: "Symbol Hunt", sub: "Find a symbol", glyph: "symbolhunt" },
      { id: "describeit", title: "Describe-It", sub: "Guess from clues", glyph: "describeit" },
      { id: "oddoneout", title: "Odd One Out", sub: "Find the impostor", glyph: "oddoneout" },
      { id: "silhouette", title: "Silhouette", sub: "Guess from the dark", glyph: "silhouette" },
      { id: "thecrop", title: "The Crop", sub: "Zoom out to guess", glyph: "thecrop" },
      { id: "composer", title: "The Composer", sub: "Reassemble the flag", glyph: "composer" },
      { id: "lookalikes", title: "Lookalikes", sub: "Spot the real one", glyph: "lookalikes" },
      { id: "flagfamilies", title: "Flag Families", sub: "Sort into families", glyph: "flagfamilies" },
      { id: "prideroulette", title: "Pride Roulette", sub: "Survival", glyph: "identity" },
      { id: "tierlist", title: "Tier List Maker", sub: "Rank flags S–F", glyph: "tierlist" },
    ],
  };

  // ── Learn modules (Curriculum / Subdivisions) ───────────────────────────
  const LEARN = [
    {
      group: "Curriculum",
      accent: "var(--accent-learn)",
      modules: [
        { id: "flags", title: "Flag Sets", sub: "Country, historical & identity sets", glyph: "flags", done: 88, total: 195 },
        { id: "flashcards", title: "Flashcards", sub: "Swipe & learn all 195", glyph: "flashcards", done: 88, total: 195 },
        { id: "historical", title: "Historical Flags", sub: "Vanished empires & states", glyph: "historical" },
        { id: "identity", title: "Identity Flags", sub: "Pride · ethnic · signal flags", glyph: "identity" },
      ],
    },
    {
      group: "Subdivisions",
      accent: "var(--accent-learn)",
      modules: [
        { id: "provinceroulette", title: "Province Roulette", sub: "Continent → country → region", glyph: "provinceroulette", done: 31, total: 280 },
        { id: "substumper", title: "Subdivision Stumper", sub: "Province flag → country", glyph: "substumper", done: 31, total: 280 },
      ],
    },
  ];

  // ── Codex: continents → countries (for the nested accordion) ────────────
  const CODEX = [
    {
      continent: "Europe", learned: 9, total: 12,
      countries: [
        { code: "gb", name: "United Kingdom", cap: "London", learned: true },
        { code: "fr", name: "France", cap: "Paris", learned: true },
        { code: "de", name: "Germany", cap: "Berlin", learned: true },
        { code: "it", name: "Italy", cap: "Rome", learned: true },
        { code: "es", name: "Spain", cap: "Madrid", learned: true },
        { code: "se", name: "Sweden", cap: "Stockholm", learned: true },
        { code: "ch", name: "Switzerland", cap: "Bern", learned: true },
        { code: "nl", name: "Netherlands", cap: "Amsterdam", learned: true },
        { code: "pt", name: "Portugal", cap: "Lisbon", learned: true },
        { code: "gr", name: "Greece", cap: "Athens", learned: false },
        { code: "no", name: "Norway", cap: "Oslo", learned: false },
        { code: "pl", name: "Poland", cap: "Warsaw", learned: false },
      ],
    },
    {
      continent: "Americas", learned: 3, total: 5,
      countries: [
        { code: "us", name: "United States", cap: "Washington", learned: true },
        { code: "ca", name: "Canada", cap: "Ottawa", learned: true },
        { code: "br", name: "Brazil", cap: "Brasília", learned: true },
        { code: "mx", name: "Mexico", cap: "Mexico City", learned: false },
        { code: "ar", name: "Argentina", cap: "Buenos Aires", learned: false },
      ],
    },
    {
      continent: "Asia", learned: 1, total: 2,
      countries: [
        { code: "jp", name: "Japan", cap: "Tokyo", learned: true },
        { code: "in", name: "India", cap: "New Delhi", learned: false },
      ],
    },
    {
      continent: "Africa", learned: 1, total: 3,
      countries: [
        { code: "za", name: "South Africa", cap: "Pretoria", learned: true },
        { code: "ke", name: "Kenya", cap: "Nairobi", learned: false },
        { code: "eg", name: "Egypt", cap: "Cairo", learned: false },
      ],
    },
    {
      continent: "Oceania", learned: 1, total: 2,
      countries: [
        { code: "au", name: "Australia", cap: "Canberra", learned: true },
        { code: "nz", name: "New Zealand", cap: "Wellington", learned: false },
      ],
    },
  ];

  // ── Flag of the day & a fun fact ────────────────────────────────────────
  const FOTD = { code: "br", name: "Brazil", region: "South America",
    fact: "The 27 stars on Brazil's flag show the night sky over Rio de Janeiro exactly as it appeared on 15 November 1889." };
  const FACT = { code: "np", name: "Nepal",
    fact: "Nepal flies the world's only non-rectangular national flag — two stacked pennants representing the Himalayas." };

  const PROFILE = { name: "Cartographer", streak: 42, best: 61, crowns: 7, learned: 88, total: 195 };

  return { ROWS, SANDBOX, LEARN, CODEX, FOTD, FACT, PROFILE, GAME_COUNT: 45 };
})();
