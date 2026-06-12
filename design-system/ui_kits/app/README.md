# Globalio — App UI Kit ("Chill Cartography")

An interactive, high-fidelity recreation of the Globalio mobile app in the
**Modern Cartographer** skin — a relaxed, premium take on antique maps. Built
entirely from the design system's component primitives (no re-implemented UI).

## Run it
Open `index.html`. It mounts a phone-framed, clickable app. Tap the bottom tabs
to move between the five surfaces; the Play tab's shelves swipe horizontally and
the Beta Sandbox / Codex continents expand in place.

## Surfaces
- **Today** (`TodayTab.jsx`) — the hook. A pulsing day-streak, one massive
  *Daily Expedition* button, a Quick Play shortcut, and a sleek Flag-of-the-Day
  hero card.
- **Play** (`PlayTab.jsx`) — the arcade. Netflix-style horizontal rows (Daily
  Puzzles · Brain Benders · Geography · Quick Drills) with the niche games
  buried in a collapsible **Beta Sandbox** at the bottom — nothing deleted.
- **Learn** (`LearnTab.jsx`) — grouped curriculum & subdivision modules with
  progress rings.
- **Codex** (`CodexTab.jsx`) — the collection rebuilt as a calm nested
  accordion: Continent → Country, replacing the old wall of tiles.
- **You** (`YouTab.jsx`) — the trophy room: world-mastery dial, field record,
  crowns, and settings links.

## Composition
- `Shell.jsx` — header (wordmark · streak · settings) + scrolling content + the
  fixed `TabBar`.
- `data.js` — a sampled slice of the real registry (45+ games, 195 flags). This
  is mock data for the recreation, not the production source.

## Components used (from the bundle)
`HeroCard`, `ModuleCard`, `GameTile`, `TabBar`, `SectionHeader`, `ProgressRing`,
`StatPill`, `Badge`, `Button`, `FlagChip`, plus the shared `LineIcon` helper
(`assets/line-icon.js`) and Lucide UMD for the etched icons.

> Guardrails honoured: zero deletions (every game still reachable), clutter
> buried via progressive disclosure, and the whole thing kept light & tactile.
