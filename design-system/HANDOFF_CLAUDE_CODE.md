# Handoff → Claude Code: Globalio "Chill Cartography" Redesign

## What this is

This repository is a **complete design system** for Globalio's *Modern Cartographer*
("Chill Cartography") skin, plus a working interactive recreation of the app. It was
generated from your live source (`github.com/SeanJoudrie/Global`) and is meant to be
**dropped into a Claude Code session inside your `Global` checkout** so an agent with
real git + filesystem access can (A) commit the system and/or (B) port the skin into the
running React app.

**Fidelity: high.** Colors, type, spacing, radii, shadows, motion and copy are final.
Recreate them exactly using the app's existing React/Tailwind patterns — don't ship the
HTML prototypes directly; they are the *reference*, not the production code.

> Start here in Claude Code: read `SKILL.md`, then `readme.md` (the full design guide),
> then this file for the port mapping.

---

## Two tracks

### Track A — Archive the system (5 min)
Copy this whole folder into the repo as `design-system/` and commit. It stands alone:
`styles.css` is the single entry point; `readme.md` is the guide; the Design System tab
cards live in `guidelines/` and each `components/*` dir.

### Track B — Port the skin into the live app (the real redesign)
Your app **already ships the Cartographer aesthetic** (it's the default in
`src/ui/tokens.ts`). The redesign is therefore mostly: **lock it as the default, polish the
tokens, and restructure three screens.** Map this system onto your source as follows.

---

## File-by-file port map

| This system | Your repo | Action |
|---|---|---|
| `tokens/colors.css`, `tokens/effects.css` | `src/ui/tokens.ts` `CARTOGRAPHER` palette + `src/index.css` (`.carto-paper`, `.carto-card`, `body.aesthetic-carto`) | Reconcile values to the table below. They already match closely — treat this system as the source of truth and update any drift. |
| `tokens/typography.css` | `index.html` Google Fonts links + `src/ui/tokens.ts` `FONT` | Confirm Playfair Display + Inter; Cartographer `FONT.display` = Playfair, data = Inter. |
| `components/*` (Button, Badge, Card, ModuleCard, GameTile, HeroCard, TabBar, SectionHeader, ProgressRing, StatPill, FlagChip) | `src/components/ui.tsx` | Your `ui.tsx` already has ModuleCard/GameTile/TabBar/ProgressRing/StatPill/SectionHeader/HeroCard. Use my versions as the visual spec; add the missing primitives (Button, Badge, Card, FlagChip) if you want them factored out. |
| `assets/line-icon.js` glyph map | `src/components/icons.tsx` | Already Lucide. Glyph→icon mapping is identical; no change needed. |
| `ui_kits/app/TodayTab.jsx` | `src/components/MainTabs.tsx` → `TodayTab` | **Restructure** (see below). |
| `ui_kits/app/PlayTab.jsx` | `src/components/MainTabs.tsx` → `PlayTab` | **Restructure into Netflix rows + Beta Sandbox** (see below). |
| `ui_kits/app/CodexTab.jsx` | `src/components/MainTabs.tsx` → `ListTab`/codex | **Rebuild as Continent→Country accordion** (see below). |
| game grouping | `src/ui/registry.ts` | Add a `sandbox?: boolean` flag (or `group: "Beta Sandbox"`) to niche games; regroup Play into the new rows. |

### The three screen changes (per the redesign directive)

1. **Today (`TodayTab`)** — strip to: a pulsing **day-streak** celebration, ONE massive
   *Daily Expedition* primary button, a secondary *Quick Play*, and a sleek **Flag of the
   Day** `HeroCard`. Remove the dense bento/grid clutter. Ref: `ui_kits/app/TodayTab.jsx`.

2. **Play (`PlayTab`)** — replace flat grids with **horizontal swipeable rows**
   (`overflow-x:auto`): *Daily Puzzles · Brain Benders · Geography · Quick Drills*. Bury
   niche/clunky games in a **collapsible "Beta Sandbox"** at the very bottom — nothing
   deleted, just progressively disclosed. Ref: `ui_kits/app/PlayTab.jsx`.

3. **Codex/Learn** — replace the wall of tiles with a **nested accordion**
   (Continent → Country, smooth slide-down). Ref: `ui_kits/app/CodexTab.jsx`.

### Guardrails (carry these into the port)
- **Zero deletions** — every one of the 45+ games, historical/identity flags, subdivision
  data, React logic and localStorage hooks stays. Only *reorganize* and *restyle*.
- **Progressive disclosure** — bury clutter (Beta Sandbox, accordions), never remove.
- Keep it **light, tactile, chill** — no heavy/over-historical treatment.

---

## Design tokens (exact values)

**Surfaces** — page `#FBF4E4` · card `#FFFCF4` · inset `#FCF6E7` · void `#EFE3C8`
**Ink** — text strong `#1F3A3C` · body `#5F726D` · muted `#A09074` · on-accent `#FFFCF4`
**Edges** — hairline `#DDCEAF` · strong `#C8B58C`
**Accents** (interaction/progress only) — Play/terracotta `#C2735A` · Learn/sky `#5C8CA8`
· Codex·Today/ochre `#C0883A` · Challenge/clay `#A85440` · Success/sage `#5C8A6B` ·
Danger/rust `#B4452F`
**Brand globe** — cream `#F4E9D2` · land `#C0883C` · outline `#6B4A23`

**Type** — display `'Playfair Display', Georgia, serif` (700–800, −0.01em) · body/UI/data
`'Inter'` · data uses `tabular-nums` + −0.04em · micro eyebrow = Inter UPPERCASE 0.18em 600.

**Radii** — 8 / 10 / 12 / 14 / 16 / 999px.
**Shadows** — card `0 1px 2px rgba(31,58,60,.05), 0 8px 20px -14px rgba(31,58,60,.25)` ·
hover `0 2px 4px rgba(31,58,60,.06), 0 16px 30px -16px rgba(31,58,60,.4)`.
**Signature card move** — on hover: `translateY(-2px) rotate(-0.15deg)`, border → `#C8B58C`,
and an accent **watercolour wash** radial-bleeds from top-left (`::before`, `--wash`).
**Motion** — paper ease `cubic-bezier(0.2,0.7,0.2,1)` 0.22s · tap `scale(0.96)` · streak
`pulse` 1→1.14 · drawers/tabs slide-up (transform-only; visible at rest) · all respect
`prefers-reduced-motion`.

---

## Assets
- `assets/earth-logo.svg` — the brand globe mark (recreated from `src/components/EarthLogo.tsx`).
- `assets/line-icon.js` — Lucide `LineIcon` helper + the app's exact glyph→icon map.
- `assets/flags/` — 24 sampled country SVGs (your repo self-hosts all 195 in `public/flags/`).
- Icons: Lucide, 1.6 stroke, `currentColor`, `absoluteStrokeWidth`. **No emoji** in this skin
  (one exception: 👑 on a mastered collectible).

## Files index
- `styles.css` — single CSS entry (`@import` manifest).
- `tokens/` — colors, typography, spacing, effects, base.
- `components/{core,data,cards,navigation}/` — React primitives + specimen cards + `.prompt.md` docs.
- `ui_kits/app/` — interactive app recreation (`index.html` + per-tab JSX + `data.js`).
- `guidelines/` — foundation specimen cards.
- `readme.md` — full design guide. `SKILL.md` — Agent-Skills front-matter.

---

## Suggested Claude Code prompt
> "Read `design-system/SKILL.md` and `design-system/HANDOFF_CLAUDE_CODE.md`. Using this
> system as the source of truth, lock the Cartographer aesthetic as the app default, then
> restructure `MainTabs.tsx` per the three screen changes (stripped Today, Netflix Play rows
> + Beta Sandbox, Codex continent accordion) and regroup `registry.ts`. Keep all 45+ games
> and data — reorganize only. Commit on a `chill-cartography` branch and open a PR."
