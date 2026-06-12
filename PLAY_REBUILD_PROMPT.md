# BRIEF: Rebuild the Play tab for maximum engagement

You have a **demolition permit**. The Play tab of Globalio (a flag/geography
puzzle game) is yours to tear down to the studs and rebuild however you think
drives the most play. Do not treat the current layout as precious — it is a
starting point, not a constraint. Restructure shelves, invent new sections,
design new components, rewrite the information architecture from scratch. The
only thing you cannot do is make a game unreachable.

---

## The single north-star metric

**Games started per session.** Every decision serves one goal: a person opens
this tab and ends up playing a lot of games — more than they intended to, and
they come back tomorrow and do it again. Optimize relentlessly for:

1. **Time-to-first-tap** — how fast can someone go from opening Play to being
   in a game? It should feel almost involuntary.
2. **Click-through depth** — after one game ends and they return, the next game
   should be irresistible and obvious. Chain sessions.
3. **Catalog reach** — there are 40+ games. Most players touch 3. Surface the
   buried ones; make discovery a reward, not a chore.
4. **Return cadence** — daily reasons to come back (rotation, streaks,
   near-completion nudges, fresh recommendations).

This is the chill, premium "Chill Cartography" brand, so engagement must be
achieved through **desire, not anxiety** — no dark patterns, no fake badges, no
manipulative timers. Make people *want* to play because it looks delicious and
the next thing is always one tap away. Think Duolingo's pull and Netflix's
browse, rendered in warm parchment.

---

## The ONE inviolable rule: zero deletions

Every game, learning module, and destination in the registry must remain
reachable from the Play tab. **Nothing gets removed — ever.** If a game feels
low-quality, half-baked, or doesn't fit your new structure, it goes into the
**Beta Sandbox**: a collapsible drawer at the very bottom of the tab,
progressively disclosed. That is the pressure-release valve — use it freely to
keep the main experience curated and tight, but the games stay in the app and
stay launchable. Curate aggressively; delete nothing.

---

## What you're optimizing — ideas to plunder (not a checklist)

You decide which of these earn their place. They are raw material:

- **Personalized recommendation rail** — "Recommended for you" / "Because you
  played Flagle." Even without a server, you can derive this locally from
  recently-played, learned-flags progress, accent/category affinity, and which
  games share mechanics.
- **A single hero that rotates** — Game of the Day, or a smarter "pick up where
  the streak is hot" hero. Make it huge, colourful, flag-forward.
- **Continue / one-more-game hooks** — surface the just-finished game's sibling,
  or a "3 quick games" mini-playlist that auto-advances.
- **Variable reward / discovery** — a Shuffle or "Surprise me" that pulls from
  the whole catalog, weighted toward games the player hasn't tried.
- **Progress-driven surfacing** — someone at 88/195 flags learned should see the
  games that close that gap, with the ring right there.
- **Curated "most loved" shelf** — you may hand-pick the genuinely great games
  into a premium top shelf (the dev knows which are A-tier; ask or infer from
  polish). Bury the rough ones in Sandbox.
- **Session goals / quests** — "Play 3 games to keep your streak," lightweight,
  optional, celebratory not nagging.
- **New / Updated tags**, near-completion nudges, "you've never tried these"
  prompts, difficulty ramps, themed collections (e.g. "Africa week").
- **Browse affordances** — search (exists), category chips, fast filter, snap
  carousels with momentum.

Anti-goals: do not bury the learning curriculum (it's a core value); do not turn
the calm parchment aesthetic into a loud casino; do not overwhelm with twenty
sections — curation beats volume; do not make the first screen require scrolling
to reach a playable game.

---

## The codebase — how it actually works (read these first)

This is a Vite + React 19 + TypeScript app. The Play tab is **registry-driven**:
a single data file declares every game, and the UI derives shelves, accents,
search, and recents from it. Learn how this works before changing it.

- **`src/ui/registry.ts`** — THE SOURCE OF TRUTH. `REGISTRY: Entry[]` lists every
  destination. `Entry` = `{ id, action?, title, subtitle, icon, tab, group,
  size: "module"|"tile", accent: AccentKey, sandbox?: boolean, progress? }`.
  `tab` is `"today"|"play"|"codex"|"you"`. `group` is the shelf name. `sandbox:
  true` routes a game into the Beta Sandbox drawer. `groupsFor(tab)` returns
  ordered `{group, entries}` buckets. **Re-sorting games is mostly editing this
  file** — change `group`, `accent`, `sandbox`, and order. You may add fields
  (e.g. `featured?`, `tier?`, `tags?`, `difficulty?`) if your design needs them,
  but keep it the single source the whole app reads.
- **`src/components/MainTabs.tsx`** — the dashboard shell + `PlayTab` (the thing
  you're rebuilding), `TodayTab`, `YouTab`. `PlayTab` currently renders: title +
  Shuffle, search, Game of the Day, "Learn the World" curriculum, shelves, Beta
  Sandbox. The `launch(e)` helper handles navigation AND records recents — call
  it for every game start. `loadRecent()` reads the recently-played ids.
- **`src/components/ui.tsx`** — shared primitives: `GameTile` (compact game
  card), `ModuleCard` (learning card with progress ring), `SectionHeader`,
  `ProgressRing`, `StatPill`, `ScreenHeader`/`BackButton`, `TabBar`. Reuse and
  extend these; build new ones in the same style.
- **`src/ui/tokens.ts`** — `T` (palette), `ACCENT` (per-category colours:
  learn/play/codex/challenge/today/drill), `FONT` ({display: Playfair serif,
  mono: Inter}), `tint(hex, alpha)`, `IS_CARTO`. Use tokens for ALL colour —
  the app has 3 switchable aesthetics (cartographer/tactical/original) and
  hardcoded hex breaks two of them.
- **`src/components/icons.tsx`** — `LineIcon name=""` maps game ids → Lucide
  etched icons. Add mappings for any new glyphs. **No emoji in chrome** (the one
  sanctioned exception is 👑 on a mastered set).
- **`src/components/FlagImage.tsx`** — `<FlagImage code="br" />`, robust flag
  rendering with fallbacks. Use it for any flag art.
- **`src/utils/storage.ts`** — `AppState`: `learnedFlags[]`, `learnedSubs[]`,
  `crowns[]`, `currentStreak`, `longestStreak`, `lastDailyDate`,
  `dailyHistory{}`. This is the local signal you have for personalization.
  There is **no server analytics** — "popular" must be curated or derived
  locally (recents, progress, affinity).
- **`src/App.tsx`** — lazy-loads every game screen, routes by a `Screen` union,
  passes `onNavigate`/`onQuickPlay`/`onStartDaily`/`onReverseQuiz` into
  `MainTabs`. The Play tab launches games through these.
- **`design-system/`** — the full "Chill Cartography" design language (tokens,
  component specs, motion, the readme). This is the visual bible. Match it.
- **`UI_AUDIT.md`** — prior audit + decisions, for context on what's been done.

### Design language (non-negotiable, but layout is yours)

Warm parchment surfaces, midnight-teal ink, Playfair Display serif headers,
Inter body, muted watercolour accents reserved for interaction, etched Lucide
line icons (never emoji), paper-stock cards with a soft watercolour wash on
hover, calm transform-only motion that respects `prefers-reduced-motion`.
Tabular-nums for all stats. The *structure* is yours to reinvent; the *texture*
stays Chill Cartography.

---

## Constraints & quality bar

- **Keep all three aesthetics working.** Everything reads from `IS_CARTO`/`T`;
  never hardcode colour.
- **TypeScript is strict** (`noUnusedLocals`/`noUnusedParameters`). Import only
  what you use. `npm run build` (tsc + vite) MUST pass before you're done.
- **Accessibility floor:** ≥44px touch targets, ≥11px functional text,
  `aria-expanded` on disclosures, aria-labels on icon-only buttons.
- **Performance:** the dashboard is the hot path. Don't import heavy modules
  eagerly; keep flag images lazy; don't render 195-item lists unvirtualized.
- **The registry stays the single source of truth** — Today's tab, search, and
  recents all read from it, so keep those working when you re-tag games.
- Commit in small, reviewable steps. Leave the Today / Codex / You tabs intact
  unless a change genuinely serves the Play rebuild.

---

## Your mandate, stated plainly

Rebuild the Play tab into the most engaging game-browser you can design within
this brand. Re-sort, re-group, re-rank, re-skin, re-architect. Invent the
recommendation logic. Make discovery a joy. Make the next tap inevitable. Bury
the rough games in the Beta Sandbox so the main stage only shows your best.
**Burn the current layout down if that's what it takes — just don't lose a
single game on the way.** Ship it building-green, on-brand, and addictive.
