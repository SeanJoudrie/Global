# Globalio Design System — "Chill Cartography"

A design system for **Globalio**, a massive daily flag & geography puzzle game
(think Wordle, with 45+ mini-games, 195 country flags, historical & identity
flags, and world subdivisions). This system captures the game's **Modern
Cartographer** skin: a relaxed, premium take on antique maps — soft parchment
backgrounds, faded golden accents, midnight-teal ink, and clean modern type.
Light, tactile, intuitive, *extremely chill* — never heavy, cluttered, or
overly historical.

> **The vibe in one line:** a casual daily puzzle game with a cartographer's
> twist — paper-stock cards, watercolour washes, and etched line icons.

---

## Sources

This system was reverse-engineered from the product source. If you have access,
explore these to go deeper:

- **GitHub:** https://github.com/SeanJoudrie/Global
  - The live app (React 19 + Vite + Tailwind v4). The Cartographer aesthetic is
    the app's default; tokens live in `src/ui/tokens.ts`, global CSS in
    `src/index.css`, UI primitives in `src/components/ui.tsx`, the icon map in
    `src/components/icons.tsx`, and the screen registry in `src/ui/registry.ts`.
  - Self-hosted flag SVGs live in `public/flags/` (195 countries).

The app ships three switchable shell aesthetics — *Modern Cartographer*
(default, the one this system encodes), *Tactical Geo-Codex* (dark charcoal +
electric accents), and *Original* (deep-space purple). **This design system
encodes Cartographer only**, per the "Chill Cartography" redesign directive.

---

## CONTENT FUNDAMENTALS

How Globalio writes copy:

- **Voice — warm, plain, encouraging.** Short, concrete, second-person where it
  addresses the player ("Master every flag to complete the binder", "Pick up
  where you left off", "keep the map lit"). Never corporate, never hype.
- **Casing — Title Case for titles, sentence case for everything else.** Game
  names are Title Case ("Flag of the Day", "Subdivision Stumper"); subtitles and
  body are sentence case ("See the name, pick the flag").
- **Micro-labels — UPPERCASE, tracked, with a ◦ marker.** Eyebrows above cards:
  `◦ FLAG OF THE DAY`, `◦ WORLD MASTERY`, `◦ THE ARCADE`.
- **Numbers are characters.** Counts, streaks, percentages and "88 / 195" ratios
  are first-class — always set in the tabular data font, often coloured by
  accent. They carry the collect-athon feel.
- **Cartographer metaphors, used lightly.** "binder", "catalogued", "the
  archive", "expedition", "field record", "world mastery" — a light dusting, not
  a costume. Keep it modern.
- **Subtitles are tiny and factual.** One line, describing the action: "Assemble
  the bands", "Trace a flag's family tree", "Daily flag Wordle · 6 guesses". A
  middot ` · ` separates clauses.
- **Tone is celebratory but calm.** Progress is praised quietly (a ring fills, a
  crown appears, a streak pulses) — no exclamation-mark confetti.
- **Emoji:** the Cartographer skin **replaces emoji with etched line icons.**
  Do not use emoji in this skin (the older Tactical/Original skins used them; we
  don't). The crown 👑 on a *mastered* collectible is the one sanctioned glyph.

---

## VISUAL FOUNDATIONS

**Colour.** Warm parchment surfaces (`#FBF4E4` page → `#FFFCF4` card), midnight-
teal ink for text (`#1F3A3C`), and a five-ink watercolour accent ramp used
*only* for interaction & progress: terracotta (Play), sky blue (Learn), antique
ochre/gold (Codex · Today), burnt clay (Challenge), sage (success). Accents
appear as solid fills on CTAs, 12% tints behind icon chips, and 30% borders.
Nothing is neon; everything is slightly desaturated, like watercolour on paper.

**Type.** Playfair Display (serif) for the wordmark, titles and card heroes —
warm, archival, set tight (−0.01em) at heavy weights (700–800). Inter for all
body, UI and data. Data readouts (streaks, counts, %) use Inter with
`tabular-nums` and −0.04em tracking. Micro eyebrows are Inter, UPPERCASE, 0.18em
tracking, 600.

**Backgrounds.** Parchment (`.gl-paper`): a flat warm base + a faint top ochre
wash + a barely-there dot-matrix grain (26px). The app also floats a heavily
blurred, ~13%-opacity antique world map behind the dashboard (feathered on all
edges). No gradients-for-gradients'-sake, no purple, no photographic hero
imagery — paper is the hero.

**Cards.** Paper stock (`.gl-card`): `#FFFCF4` fill, 1px `#DDCEAF` hairline,
14px radius, and a soft *two-layer ink-teal shadow* (`0 1px 2px / 0 8px 20px
-14px`). On hover/press they **lift 2px and tilt −0.15°**, the border warms to
`#C8B58C`, and a single-accent **watercolour wash bleeds in** from the top-left
(a radial `--wash` gradient on `::before`). This bleed is the signature move.

**Radii.** Soft throughout — chips 8–10px, tiles & module cards 12px, primary
cards 14px, hero cards 16px, pills/CTAs/tabs fully round (999px). Nothing sharp.

**Shadows.** Always warm ink-teal, low and soft — `--shadow-card` at rest,
`--shadow-card-hover` lifted, `--shadow-pop` for dialogs. Never a hard or
coloured glow (that belongs to the Tactical skin, which this system omits).

**Borders.** Hairline `#DDCEAF` by default, `#C8B58C` on emphasis; dashed
hairlines mark *empty / beta* states (the Beta Sandbox toggle, empty crowns).

**Motion.** Calm and tactile. Cards lift on a `cubic-bezier(0.2,0.7,0.2,1)`
"paper" ease over 0.22s. Taps scale to 0.96 (`.gl-tap`). Streak counters
**pulse** gently (`.gl-pulse`, scale 1→1.14). Tab content and drawers **slide
up + fade** (`.gl-slide-up`, 0.3s). Mastered collectibles get a slow aged-gold
**foil sheen** sweep. No bounce, no spin, no infinite decorative loops on
content. All animation respects `prefers-reduced-motion`.

**Hover / press states.** Hover = lift + wash + warmer border (cards) or
slightly stronger fill (buttons). Press = `scale(0.96)`. Disabled = 45% opacity.

**Transparency & blur.** Used sparingly: the bottom tab bar is frosted
(`rgba(251,244,228,0.94)` + `blur(14px)`); accent tints use `color-mix` alphas;
the map backdrop is blurred. No glassmorphism elsewhere.

**Iconography.** See below.

---

## ICONOGRAPHY

- **System:** [Lucide](https://lucide.dev) line icons — monochromatic, "etched",
  consistent **1.6 stroke**, `currentColor`, rendered at 24×24 then scaled. The
  Cartographer skin deliberately swapped the older emoji for these calm line
  marks. Stroke uses `absoluteStrokeWidth` so weight stays constant at any size.
- **In this system:** load Lucide UMD + `assets/line-icon.js`, then use
  `<LineIcon name="flags" size={21} color="var(--accent-learn)" />`. The helper
  carries the app's exact **glyph→Lucide map** (e.g. `flags→Flag`,
  `historical→ScrollText`, `flagdna→Dna`, `gauntlet→Swords`, `today→Compass`,
  `quickplay→Zap`, `flame→Flame`, `crown→Crown`). Specimen: see the
  *Iconography* card in the Design System tab.
- **Icon chips:** icons usually sit in a rounded chip — accent at 12% fill, 28%
  border, accent `currentColor`.
- **Emoji:** not used in this skin (one exception: 👑 on a mastered collectible).
- **Brand mark:** the **Earth logo** (`assets/earth-logo.svg`) — a cream planet
  with golden-brown continents, a warm-brown outline, and two hand-drawn white
  clouds. Pairs with the Playfair "Globalio" wordmark at −0.5px tracking.

---

## INDEX / MANIFEST

**Root**
- `styles.css` — the single entry point consumers link (an `@import` manifest).
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skills front-matter for use in Claude Code.

**`tokens/`** — `colors.css`, `typography.css`, `spacing.css`, `effects.css`,
`base.css`. CSS custom properties (base ramps + semantic aliases) plus the
`.gl-*` utility classes (`.gl-paper`, `.gl-card`, `.gl-tap`, `.gl-foil`,
`.gl-pulse`, `.gl-slide-up`, type helpers).

**`fonts/`** — `fonts.css` (Playfair Display + Inter via Google Fonts CDN).

**`assets/`** — `earth-logo.svg` (brand mark), `line-icon.js` (LineIcon helper +
glyph map), `flags/` (24 sampled country SVGs; the full app self-hosts 195).

**`components/`** — reusable primitives (bundled to `window.GlobalioDesignSystem_*`):
- `core/` — **Button**, **Badge**, **Card**
- `data/` — **ProgressRing**, **StatPill**, **FlagChip**
- `cards/` — **ModuleCard**, **GameTile**, **HeroCard**
- `navigation/` — **TabBar**, **SectionHeader**

**`ui_kits/app/`** — interactive "Chill Cartography" recreation of the full
mobile app (Today · Play · Learn · Codex · You). See its `README.md`.

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand)
that populate the Design System tab.

---

## Substitutions & caveats

- **Fonts** load from the Google Fonts CDN (Playfair Display + Inter) — these are
  the app's real families, not substitutes. To fully self-host, drop woff2 files
  in `/fonts` and swap the `@import` for `@font-face` rules.
- **Icons** load Lucide from CDN (matching the app's `lucide-react`).
- **Flags:** 24 representative SVGs are bundled; `FlagChip` falls back to
  flagcdn / jsDelivr for any other ISO code. The production app self-hosts all
  195.
