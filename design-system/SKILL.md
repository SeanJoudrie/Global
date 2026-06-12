---
name: globalio-design
description: Use this skill to generate well-branded interfaces and assets for Globalio (a massive daily flag & geography puzzle game), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping the "Chill Cartography" / Modern Cartographer look — warm parchment, faded golden accents, midnight-teal ink, etched line icons.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view — link `styles.css`, load Lucide UMD + `assets/line-icon.js`, and use the `.gl-*` utility classes and CSS custom properties. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

Key files:
- `readme.md` — the full design guide (content fundamentals, visual foundations, iconography, manifest).
- `styles.css` — the single CSS entry point (tokens + fonts + utility classes).
- `tokens/` — colors, typography, spacing, effects, base reset.
- `assets/` — `earth-logo.svg`, `line-icon.js` (LineIcon helper + glyph map), `flags/`.
- `components/` — React primitives (Button, Badge, Card, ProgressRing, StatPill, FlagChip, ModuleCard, GameTile, HeroCard, TabBar, SectionHeader).
- `ui_kits/app/` — an interactive recreation of the full mobile app.
- `guidelines/` — foundation specimen cards.

The vibe is **Chill Cartography**: a relaxed, premium daily-puzzle game with a cartographer's twist. Light, tactile, intuitive — soft parchment, paper-stock cards with watercolour hover washes, calm motion, and etched Lucide line icons (never emoji). Title Case titles, sentence-case body, UPPERCASE ◦ micro-eyebrows, tabular numbers for all stats.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
