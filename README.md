# Globalio

**Learn every flag in the world.** A beautiful, free flag & geography game with
50+ ways to play — daily challenges, dozens of mini‑games, and a 2,000‑flag
codex. No sign‑up, no backend: everything runs in the browser and your progress
lives on your device.

🌍 **Live:** [globalio.app](https://globalio.app)

---

## What it is

Globalio is a single‑page web app in the spirit of Wordle, scaled up into a
whole arcade of geography games. Its "Chill Cartography" skin — soft parchment,
faded gold, midnight‑teal ink — wraps a surprisingly deep catalogue:

- **195 country flags**, plus historical flags of vanished empires and states,
  identity flags (Pride, ethnic, signal), organisation flags, US city flags,
  and world **subdivision** flags (provinces, states, regions).
- **50+ game modes**, filed by *appetite* (what you're in the mood for) rather
  than by mechanic — quick‑glance guessers, spot‑the‑difference puzzles,
  lore/trivia, drawing games, brackets, and more.
- A **daily ritual** loop — a daily challenge, streaks, and a fun‑fact of the
  day to bring you back.
- A **2,000‑entry codex** (the "Mega Codex") you fill in as you learn.
- **Local, private progress** — learned flags, crowns, streaks and stats are
  saved to `localStorage`. There's no account and nothing to sign up for.
- **Shareable results** — games render a share card (via `html-to-image`) you
  can post anywhere.

## The games

Every destination is one entry in a single registry (`src/ui/registry.ts`),
grouped by the mood it serves:

| Group | The vibe | Examples |
| --- | --- | --- |
| **Learn the World** | The learning spine | Flag Sets, Flashcards, Historical, Identity, Province Roulette, Subdivision Stumper |
| **Daily Rituals** | Come back every day | Daily Challenge, Fun Fact, streaks |
| **One Glance** | Guess at a glance | Quiz, Reverse Quiz, Silhouette, The Crop, The Peel, Higher/Lower |
| **Spot It** | Find the odd one / the flaw | Odd One Out, Confusables, Spot the Error, Real or Bot, Forgery |
| **Sharp Recall** | Test what stuck | Gauntlet, Bracket, Stat Clash, Two Truths |
| **Loremaster** | Trivia & history | Fun Facts, Dead or Alive, Describe It, Flag Timeline |
| **Cartographer** | Maps & borders | Border Map, Border Chain, Odd Border Out, Continent Sort, Geo Paint |
| **Collection** | Fill the shelf | Mega Codex, Flag Gacha |
| **Beta Sandbox** | Rough / experimental | Games earning their way up — *nothing is ever deleted, only resorted* |

> The registry is the **single source of truth**: tabs (`Today · Play · Codex ·
> You`), section shelves, accent colours, "Most Loved" featuring, and per‑game
> progress bars all derive from it. Adding a game is one entry.

## Tech stack

- **[React 19](https://react.dev/)** + **TypeScript** — every game screen is
  `React.lazy` code‑split, so the initial load ships only the dashboard shell
  and each mode's JS is fetched on first open.
- **[Vite](https://vitejs.dev/)** — dev server and build.
- **[Tailwind CSS v4](https://tailwindcss.com/)** via `@tailwindcss/vite`.
- **[lucide-react](https://lucide.dev/)** icons, **[@svg-maps/world](https://www.npmjs.com/package/@svg-maps/world)**
  for map games, **[html-to-image](https://github.com/bubkoo/html-to-image)**
  for share cards.
- **No backend.** State persists in `localStorage` (`AppState`, key
  `dailyglobe_v1`), with import/export backup in `src/utils/backup.ts`.

## Project structure

```
Global/
├── index.html                 # SPA shell + SEO/OpenGraph/PWA meta
├── vite.config.ts             # React + Tailwind v4 plugins
├── netlify.toml               # Build + SPA redirects (Node 22)
├── src/
│   ├── App.tsx                # Shell, routing between screens, global state wiring
│   ├── main.tsx               # Entry
│   ├── index.css              # Global styles / design tokens
│   ├── ui/
│   │   ├── registry.ts        # ★ Single source of truth for every game/destination
│   │   └── tokens.ts          # Design tokens & accent palette
│   ├── components/            # ~60 screens (one per game) + shared UI
│   ├── data/                  # Flags, codex, capitals, borders, languages, challenges…
│   ├── utils/                 # storage, share, prng, quiz builders, color, backup
│   ├── ads.ts / analytics.ts  # AdSense + analytics toggles
│   └── assets/
├── public/                    # Self-hosted flag images, icons, manifest, ads.txt
├── scripts/
│   ├── prerender.mjs          # Post-build SEO: one crawlable page per country
│   └── flags/                 # Flag-image pipeline (download, host, audit, repair)
├── design-system/             # "Chill Cartography" design system + handoff docs
└── docs/                      # GAME_IDEAS.md, FORMER_STATES_CHECKLIST.md
```

## Data

All game content is authored as TypeScript modules under `src/data/` — no
database, no API. Highlights:

- `flags.ts` — the 195 sovereign countries (the core set).
- `codex.ts` — the ~2,000‑entry Mega Codex.
- `historicalFlags.ts`, `identityFlags.ts`, `ethnicFlags.ts`, `extinctStates.ts`,
  `orgFlags.ts`, `usCityFlags.ts` — the extended flag universe.
- `subdivisions.ts`, `territories.ts`, `borders.ts`, `capitals.ts`,
  `cities.ts`, `countryStats.ts`, `languages.ts` — geography facts that power
  the map, capital, and stat games.
- `challenges.ts` — pre‑generated daily challenges.
- `botFlags.ts` / `fakeFlags.ts` / `buildFlagPuzzles.ts` / `paintPuzzles.ts` —
  content for the generative games (Real or Bot, Forgery, Build/Sketch, Geo Paint).

Flag images are **self‑hosted** in `public/flags` (with a Cloudflare mirror and
Wikimedia as CDN fallback). The `scripts/flags/` pipeline downloads, hosts,
audits and repairs them — see `scripts/flags/lib.mjs`.

## Getting started

**Prerequisites:** Node.js **22+** (the SEO prerender step uses Node's native
TypeScript stripping) and npm.

```bash
# install
npm install

# run the dev server (http://localhost:5173)
npm run dev

# type-check, production build, then generate SEO pages into dist/
npm run build

# preview the production build locally
npm run preview
```

### npm scripts

| Script | What it does |
| --- | --- |
| `dev` | Vite dev server with HMR |
| `build` | `tsc` type‑check → `vite build` → `scripts/prerender.mjs` (SEO pages) |
| `preview` | Serve the built `dist/` locally |

### Flag pipeline (maintenance)

The scripts in `scripts/flags/` manage the flag image set — run them with Node
when adding or fixing flags:

- `download.mjs` / `generate.mjs` — fetch & generate flag assets
- `autohost.sh` / `applyPicks.mjs` — host chosen sources
- `audit.mjs` / `repair.mjs` / `recover.mjs` — verify and fix the set
- `crossCandidates.mjs` — reconcile candidate sources

## SEO & prerendering

Globalio is client‑rendered, so a crawler hitting `/` would otherwise see an
empty shell. After each build, `scripts/prerender.mjs` emits **real crawlable
HTML — one rich page per country plus an index hub — into `dist/`** and rewrites
the sitemap. Pages import data straight from the TypeScript sources (Node 22
type stripping), so they can never drift from the in‑app content, and each links
back into the live app to double as a landing page.

## Deployment

Deployed on **Netlify** (`netlify.toml`):

- **Build:** `npm run build` → publish `dist/`
- **Node:** 22 (required for the prerender step)
- **Routing:** SPA fallback — all paths rewrite to `/index.html`

## Monetization

Free to play. Ads are served via Google AdSense (toggle in `src/ads.ts`), with a
one‑time **Supporter** unlock (`$1.99`) that sets `premium` in local state and
hides every ad across the app. There are no subscriptions and no accounts.

## Design system

The look — "**Chill Cartography**" / the *Modern Cartographer* skin — is
documented in [`design-system/`](./design-system/readme.md): parchment stock,
watercolour washes, etched line icons, faded‑gold accents and midnight‑teal ink.
Tokens live in `src/ui/tokens.ts` and global CSS in `src/index.css`.

## Adding a new game

1. Build the screen component in `src/components/YourGameScreen.tsx`.
2. `React.lazy`‑import it in `src/App.tsx` and route to it by `id`.
3. Add **one entry** to `REGISTRY` in `src/ui/registry.ts` (id, title, subtitle,
   icon, tab, group, accent — plus optional `featured`, `sandbox`, `progress`).

Tabs, shelves, accents and progress bars all pick it up automatically. New or
rough games can land in the **Beta Sandbox** group and be promoted later —
Globalio never deletes a game, it resorts it.

## Credits

- Flag, geography and historical data assembled from public sources (Wikimedia
  Commons and others); flag images self‑hosted with Wikimedia CDN fallback.
- Design system: "Chill Cartography," reverse‑engineered from the product and
  documented under `design-system/`.

---

*Built with React 19, Vite and Tailwind v4. Made to make learning every flag in
the world feel like play.*
