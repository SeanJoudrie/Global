# Globalio UI Audit — "Everything Wrong" Punch List

Full-app UI/UX review for the next redesign round. Generated after the Chill
Cartography dashboard port (PR #1). Scope: all 58 components in
`src/components/`, the shell (`App.tsx`), tokens, registry and CSS layers.

**Ground rules for whoever acts on this (carry these forward):**
- **ZERO deletions.** All 45+ games, historical/identity flags, subdivision
  data, React logic and localStorage hooks stay. Reorganize, restyle, rebuild
  screens from scratch if needed — but every destination remains reachable.
- **Keep the vibe:** Chill Cartography (`design-system/` is the source of
  truth) — warm parchment, paper cards, watercolour washes, Playfair Display
  headers, etched Lucide line icons, no emoji in chrome, calm motion.
- **Progressive disclosure over removal** (Beta Sandbox pattern).

---

## P0 — The app is two apps (the single biggest problem)

**Only 17 of 58 screens use the design-token system. 40 screens still
hardcode the old deep-space purple skin** (`#1A1033` / `#2D1F52` / `#8B6CFF` /
near-white text). The parchment dashboard is a thin veneer: tap into ~70% of
games and you teleport from a warm paper world into a dark purple one, then
back. This is the core experience — the quiz loop itself is purple.

Old-skin screens (all hardcoded, no `../ui/tokens` usage):
AchievementsScreen, BuildFlagScreen, CapitalQuizScreen, ChallengeScreen,
CodexScreen, ConfusablesScreen, DescribeItScreen, FlagBracketScreen,
FlagDNAScreen, FlagDiagnosticsScreen, FlagFamiliesScreen, FlagleScreen,
FlagsScreen, FlashcardsScreen, FrankenflagScreen, FunFactScreen,
GauntletScreen, GeoQuizScreen, HistoricalFlagScreen, HomeCarousel, HomeScreen,
IdentityFlagScreen, LanguageQuizScreen, LineageScreen, MegaCodexScreen,
OddOneOutScreen, PrideRouletteScreen, ProfileScreen, ProgressMapScreen,
ProvinceRouletteScreen, **QuizScreen**, **ResultScreen**, ReverseQuizScreen,
**ShareCard**, SilhouetteScreen, SubdivisionStatsScreen,
SubdivisionStumperScreen, TheComposerScreen, TheCropScreen, ThePeelScreen,
TierListScreen. (SettingsScreen imports tokens but renders purple.)

Worst offenders, with receipts:
- `QuizScreen.tsx` — the core loop. Header button `background:'#2D1F52'`
  (line ~82), progress gradient `#8B6CFF→#A78BFA` (~92), choice buttons
  hardcoded `#2D1F52` (~53), feedback box purple (~118).
- `ResultScreen.tsx` — purple score card (`#2D1F52` + `#8B6CFF44` border,
  ~58) **and** emoji grading copy (🏆 🌟 👍 📚 😅, ~21–26).
- `ShareCard.tsx` — the social share image has a **permanently baked**
  deep-space gradient (`#110728→#1E0D42→#2A1155→#120930`, ~60) plus 🌍/🔥.
  Users sharing from the parchment app broadcast the old brand.
- `FlashcardsScreen.tsx` — violet gradient deck tabs (~197), emoji deck
  labels ('🏳️ Countries', '📜 Historical'…, ~187–191), purple card faces
  (~402/417).
- `LineageScreen.tsx` — zero token imports at all.
- Contrast time-bomb: these screens assume dark backgrounds
  (`color:'#F5F3FF'` text everywhere). Any naive re-skin makes near-white
  text on `#FFFCF4` paper — illegible. Each screen needs real conversion,
  not find-and-replace.

## P0 — Old-skin bleed-through in the shell

- `App.tsx:182–198` — the fixed "Home" pill shown on **every** game screen is
  hardcoded purple (`rgba(45,31,82,0.85)` bg, `#8B6CFF44` border, lavender
  text). On parchment it's a dark alien blob floating top-right, on every
  single game.
- `App.tsx:178` + `StarField.tsx` — a canvas of 70 white/violet space embers
  with purple radial glows (`rgba(139,108,255,…)`) renders **unconditionally**,
  including in cartographer mode, on every screen except splash.

## P1 — Design-language violations

- **Zero game screens use the serif display font.** `FONT.display`
  (Playfair Display) is applied only inside the dashboard. Every game header
  is sans. The signature typographic move of the skin disappears one tap in.
- **Emoji in UI chrome on 8+ screens** (ResultScreen grades, FlashcardsScreen
  deck tabs, HomeScreen ⚙️/👤 buttons, ShareCard 🌍🔥, CodexScreen /
  FlagsScreen / LanguageQuizScreen category badges). Spec: Lucide line icons
  only; the single allowed emoji is 👑 on a mastered collectible.
- **Three different back-button/header patterns** across screens (purple `‹`
  pill, token `‹` pill, none). There is no shared `ScreenHeader` /
  `BackButton` primitive — 50 screens hand-roll their own. Build one
  primitive, use it everywhere.

## P1 — Information architecture & the clutter problem

- **No way to find a game by name.** 37 play destinations + 6 learn modules,
  zero search, no "recently played", no favorites/pinning. The Arcade rows
  help browsing but not returning. A player who loves one game re-swipes
  shelves every session. (Recently-played row + a tiny search would fix this
  without removing anything.)
- **Row accent collision:** Daily Puzzles and Quick Drills both resolve to
  ochre (`ACCENT.today === ACCENT.codex === T.amber`), so two of four
  shelves look identical at a glance. The accent system has 5 keys but only
  4 distinct colors in cartographer.
- **Codex accordion doesn't deep-link.** Tapping a country opens the Codex
  *list* screen — the user must find the same country again (double work).
  `CodexScreen` needs an `initialCode` prop wired through `App.tsx`.
- **Daily Expedition lies a little:** copy says "One run, once a day" and the
  CTA flips to "✓ Done today", but the button still launches (and re-records)
  the daily quiz. Done-state should swap to a recap (score, share, countdown
  to tomorrow) instead of a replay.
- **Streak shown twice on Today** — header chip (`MainTabs.tsx:84–87`) and the
  hero celebration (~120–136), same number 40px apart.
- **Dead-end game flow:** finish game → result → Home → re-navigate. Result
  screen offers retry but no "next" suggestion; there's no game-to-game path
  at all and the tab bar disappears inside games.
- **Back behavior inconsistent:** every game's `onBack` → "home", except set
  quizzes → "flags", except non-daily reverse quiz which hardcodes "home"
  (`App.tsx:317` vs `:322`). Tab state survives, scroll position doesn't —
  switching tabs always resets to top.

## P2 — Readability & accessibility

- **Tab bar labels are 8px** (`ui.tsx:187`) — the primary nav is the least
  readable text in the app. Micro-labels of 8–9.5px appear throughout
  (StatPill 8.5, GameTile subtitle 9.5, eyebrows 9, "new"/"beta" badges 8).
  Fine as an aesthetic accent; wrong for anything functional.
- **Touch targets below 44px:** header settings button 32×32
  (`MainTabs.tsx:89`), tab-bar effective hit zones, 20px chevrons on
  accordion drawers, carousel dots.
- **Contrast:** `T.dim` (#A09074) and some `T.muted` text on parchment runs
  borderline for WCAG AA at small sizes — audit with real contrast checks.
- **7 aria-labels in the whole app.** Accordion/sandbox toggles lack
  `aria-expanded`; rails lack any keyboard affordance; icon-only buttons are
  unlabeled.
- **No error boundary:** a failed lazy chunk = white screen.
- 195-row continent drawers (the accordion) render every country at once —
  fine on desktop, heavy on low-end phones; consider virtualization or
  per-continent "show all".

## P2 — Systems debt that causes UX confusion

- **Settings themes are a silent no-op:** the 8 color themes only affect the
  "original" aesthetic, but the picker is always shown. In cartographer you
  pick "Sunset" and nothing changes. Hide/scope the picker per aesthetic, or
  make themes work everywhere.
- **Aesthetic switch = full page reload** (`SettingsScreen.tsx:95,100`),
  because `AESTHETIC`/`T` are frozen at module load (`tokens.ts:19`). Fine
  short-term; a context/CSS-variable refactor would make switching instant
  and let screens be truly theme-reactive.
- **HeroCarousel.tsx is dead code** (orphaned by the redesign — keep or
  delete deliberately; HomeScreen/HomeCarousel remain live for the
  "original" aesthetic only).
- **Three overlapping CSS layers** in `index.css` (Tailwind `@theme` purple
  vars + `geo-*` tactical layer + `carto-*` layer) plus inline-style-heavy
  components. The next round should pick one mechanism (CSS vars per
  aesthetic seems natural) and collapse.
- **Main bundle is 1.8 MB (559 KB gzip)** even with per-screen code-splitting
  — `lucide-react` and `@svg-maps/world` likely dominate. Slow first paint
  hurts the "instant daily ritual" promise.
- **"The Arcade — 37 games"** counts only the Play tab; marketing copy says
  45+. Decide what the number means (all playable destinations ≈ 45+) and
  make it consistent.
- `public/world-map.jpg` is referenced by the dashboard backdrop but absent —
  vector fallback always used.

---

## Ready-to-paste prompt for the next design round

> Read `design-system/SKILL.md`, `design-system/readme.md`,
> `design-system/HANDOFF_CLAUDE_CODE.md`, and `UI_AUDIT.md` (the full defect
> list — treat it as the work order). The dashboard shell already matches the
> design system; the job now is **total coverage and maximum polish**.
>
> Hard constraints: ZERO deletions — every game, dataset, route and
> localStorage behavior stays; the Chill Cartography vibe stays (parchment,
> serif display, line icons, no emoji in chrome, calm motion); you may
> otherwise rebuild any screen from the ground up.
>
> Priority order:
> 1. Convert all 40 old-purple screens to the token system (`src/ui/tokens.ts`,
>    `T`/`ACCENT`/`FONT`), starting with the core loop: QuizScreen,
>    ReverseQuizScreen, ResultScreen, ShareCard, FlagsScreen, FlashcardsScreen,
>    CodexScreen, then the rest. Build ONE shared `ScreenHeader`/`BackButton`
>    primitive and use it on every screen. Serif display headers everywhere.
>    Replace all chrome emoji with Lucide line icons (👑 mastered is the only
>    exception). Mind contrast: these screens assume dark backgrounds today.
> 2. Fix shell bleed-through: the purple fixed Home pill in `App.tsx` and the
>    StarField canvas must respect the active aesthetic.
> 3. De-clutter without deleting: recently-played row + lightweight game
>    search in Play; give Daily Puzzles and Quick Drills distinct accents;
>    deep-link Codex accordion countries into `CodexScreen` (`initialCode`);
>    make the post-daily state a recap (score/share/countdown), not a replay;
>    show the streak once on Today; add a "play next" suggestion on the
>    result screen.
> 4. Accessibility floor: ≥11px functional text (tab labels especially),
>    ≥44px touch targets, `aria-expanded` on disclosures, aria-labels on
>    icon buttons, an error boundary around lazy screens, contrast-check
>    muted text on parchment.
> 5. Systems: scope or fix the Settings theme picker per aesthetic; keep all
>    three aesthetics working; verify `npm run build` passes.
>
> Work in small commits per screen-cluster so the diff stays reviewable.

---

*Audit sources: two full-codebase sweeps (skin classification of all 58
components; shell/UX/navigation/a11y review), 2026-06-12.*
