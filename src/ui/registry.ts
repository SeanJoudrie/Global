import type { AppState } from "../utils/storage"
import { FLAGS } from "../data/flags"
import { SUB_FLAGS } from "../data/subdivisions"
import type { AccentKey } from "./tokens"

export type TabKey = "today" | "learn" | "play" | "codex" | "you"
export type Size = "module" | "tile"
export type LaunchAction = "quickplay" | "daily" | "reverse"

export interface Entry {
  id: string                 // Screen id for plain navigation
  action?: LaunchAction      // special launches that build a quiz first
  title: string
  subtitle: string
  icon: string
  tab: TabKey
  group: string
  size: Size
  accent: AccentKey
  /** Niche/experimental games — buried in the collapsible Beta Sandbox at the
   *  bottom of Play. Progressive disclosure: nothing is ever deleted. */
  sandbox?: boolean
  progress?: (s: AppState) => { done: number; total: number }
}

const flagProgress = (s: AppState) => ({ done: s.learnedFlags.length, total: FLAGS.length })
const subProgress = (s: AppState) => ({ done: s.learnedSubs.length, total: SUB_FLAGS.length })

// Single source of truth. Adding a destination (or a whole new regional set)
// is one entry here — tabs, sections, accents and progress all derive from it.
export const REGISTRY: Entry[] = [
  // ── LEARN ──────────────────────────────────────────────────────────────
  { id: "flags", title: "Flag Sets", subtitle: "Country, historical & identity sets", icon: "🚩", tab: "learn", group: "Curriculum", size: "module", accent: "learn", progress: flagProgress },
  { id: "flashcards", title: "Flashcards", subtitle: "Swipe & learn all 195", icon: "🃏", tab: "learn", group: "Curriculum", size: "module", accent: "learn", progress: flagProgress },
  { id: "historical", title: "Historical Flags", subtitle: "Vanished empires & states", icon: "📜", tab: "learn", group: "Curriculum", size: "module", accent: "learn" },
  { id: "identity", title: "Identity Flags", subtitle: "Pride · ethnic · signal flags", icon: "🏳️‍🌈", tab: "learn", group: "Curriculum", size: "module", accent: "learn" },

  { id: "provinceroulette", title: "Province Roulette", subtitle: "Continent → country → region", icon: "🎰", tab: "learn", group: "Subdivisions", size: "module", accent: "learn", progress: subProgress },
  { id: "substumper", title: "Subdivision Stumper", subtitle: "Province flag → country", icon: "📍", tab: "learn", group: "Subdivisions", size: "module", accent: "learn", progress: subProgress },

  // ── PLAY ───────────────────────────────────────────────────────────────
  // Netflix-style swipeable rows (Chill Cartography redesign): Daily Puzzles ·
  // Brain Benders · Geography · Quick Drills, then Challenge modules, then the
  // niche games progressively disclosed in the Beta Sandbox. Zero deletions.

  // Daily Puzzles — the once-a-day ritual games
  { id: "flagle", title: "Flagle", subtitle: "Daily flag Wordle · 6 guesses", icon: "🟩", tab: "play", group: "Daily Puzzles", size: "tile", accent: "today" },
  { id: "gacha", title: "Flag Gacha", subtitle: "Daily pull · collect them all", icon: "🎁", tab: "play", group: "Daily Puzzles", size: "tile", accent: "today" },
  { id: "funfact", title: "Fun Fact", subtitle: "Daily flag fact", icon: "💡", tab: "play", group: "Daily Puzzles", size: "tile", accent: "today" },
  { id: "timeline", title: "Flag Timeline", subtitle: "Order a country's flags in time", icon: "⏳", tab: "play", group: "Daily Puzzles", size: "tile", accent: "today" },

  // Brain Benders — the standout puzzle games
  { id: "language", title: "Guess the Language", subtitle: "82 languages · easy → extreme", icon: "🗣️", tab: "play", group: "Brain Benders", size: "tile", accent: "play" },
  { id: "flagdna", title: "Flag DNA", subtitle: "Guess by attributes", icon: "🧬", tab: "play", group: "Brain Benders", size: "tile", accent: "play" },
  { id: "buildflag", title: "Build the Flag", subtitle: "Assemble the bands", icon: "🧩", tab: "play", group: "Brain Benders", size: "tile", accent: "play" },
  { id: "thepeel", title: "The Peel", subtitle: "Scratch to reveal", icon: "🖌️", tab: "play", group: "Brain Benders", size: "tile", accent: "play" },
  { id: "frankenflag", title: "Frankenflag", subtitle: "Name both halves", icon: "🧟", tab: "play", group: "Brain Benders", size: "tile", accent: "play" },
  { id: "realorbot", title: "Real or Bot", subtitle: "Swipe: real flag or AI fake?", icon: "🤖", tab: "play", group: "Brain Benders", size: "tile", accent: "play" },
  { id: "deadoralive", title: "Dead or Alive", subtitle: "Live or vanished?", icon: "💀", tab: "play", group: "Brain Benders", size: "tile", accent: "play" },
  { id: "lineage", title: "Lineage", subtitle: "Trace a flag's family tree", icon: "🌳", tab: "play", group: "Brain Benders", size: "tile", accent: "play" },

  // Geography — maps, borders & shapes
  { id: "geo", title: "Geography", subtitle: "Identify countries by shape", icon: "🗺️", tab: "play", group: "Geography", size: "tile", accent: "learn" },
  { id: "bordermap", title: "Border Map", subtitle: "Fill in a country's neighbours", icon: "🗺️", tab: "play", group: "Geography", size: "tile", accent: "learn" },
  { id: "borderchain", title: "Border Path", subtitle: "Connect two countries by land", icon: "🔗", tab: "play", group: "Geography", size: "tile", accent: "learn" },
  { id: "oddborder", title: "Odd Border Out", subtitle: "Spot the non-neighbour", icon: "🧭", tab: "play", group: "Geography", size: "tile", accent: "learn" },
  { id: "continentsort", title: "Continent Sort", subtitle: "Sort flags by region", icon: "🌍", tab: "play", group: "Geography", size: "tile", accent: "learn" },

  // Quick Drills — fast recall reps
  { id: "reversequiz", action: "reverse", title: "Flag ID Challenge", subtitle: "See the name, pick the flag", icon: "🎯", tab: "play", group: "Quick Drills", size: "tile", accent: "codex" },
  { id: "capitalquiz", title: "Capital Cities", subtitle: "Name that capital", icon: "🏛️", tab: "play", group: "Quick Drills", size: "tile", accent: "codex" },
  { id: "capitalmatch", title: "Capital Match", subtitle: "Match flags to capitals", icon: "🏛️", tab: "play", group: "Quick Drills", size: "tile", accent: "codex" },
  { id: "higherlower", title: "Higher / Lower", subtitle: "More red or blue?", icon: "📊", tab: "play", group: "Quick Drills", size: "tile", accent: "codex" },
  { id: "statclash", title: "Stat Clash", subtitle: "Bigger population or area?", icon: "⚖️", tab: "play", group: "Quick Drills", size: "tile", accent: "codex" },
  { id: "twotruths", title: "Two Truths", subtitle: "Spot the lie about a country", icon: "🕵️", tab: "play", group: "Quick Drills", size: "tile", accent: "codex" },

  { id: "gauntlet", title: "Gauntlet", subtitle: "One life · every flag", icon: "⚔️", tab: "play", group: "Challenge", size: "module", accent: "challenge" },
  { id: "challenge", title: "Challenge Mode", subtitle: "States, provinces & regions", icon: "🎖️", tab: "play", group: "Challenge", size: "module", accent: "challenge" },

  // Beta Sandbox — experimental & niche games, collapsed at the bottom of Play
  { id: "oddoneout", title: "Odd One Out", subtitle: "Find the impostor", icon: "🕵️", tab: "play", group: "Beta Sandbox", size: "tile", accent: "play", sandbox: true },
  { id: "thecrop", title: "The Crop", subtitle: "Zoom out to guess", icon: "🔍", tab: "play", group: "Beta Sandbox", size: "tile", accent: "play", sandbox: true },
  { id: "silhouette", title: "Silhouette", subtitle: "Guess from the dark", icon: "🌑", tab: "play", group: "Beta Sandbox", size: "tile", accent: "play", sandbox: true },
  { id: "lookalikes", title: "Lookalikes", subtitle: "Spot the real one", icon: "👯", tab: "play", group: "Beta Sandbox", size: "tile", accent: "play", sandbox: true },
  { id: "composer", title: "The Composer", subtitle: "Reassemble the flag", icon: "🎴", tab: "play", group: "Beta Sandbox", size: "tile", accent: "play", sandbox: true },
  { id: "flagfamilies", title: "Flag Families", subtitle: "Sort into families", icon: "👪", tab: "play", group: "Beta Sandbox", size: "tile", accent: "play", sandbox: true },
  { id: "prideroulette", title: "Pride Roulette", subtitle: "Name the pride flag · survival", icon: "🏳️‍🌈", tab: "play", group: "Beta Sandbox", size: "tile", accent: "play", sandbox: true },
  { id: "symbolhunt", title: "Symbol Hunt", subtitle: "Find every flag with a symbol", icon: "🔎", tab: "play", group: "Beta Sandbox", size: "tile", accent: "play", sandbox: true },
  { id: "describeit", title: "Describe-It", subtitle: "Guess from the clues", icon: "📝", tab: "play", group: "Beta Sandbox", size: "tile", accent: "play", sandbox: true },
  { id: "flagbracket", title: "Flag Bracket", subtitle: "Vote your champion", icon: "🏆", tab: "play", group: "Beta Sandbox", size: "tile", accent: "play", sandbox: true },
  { id: "uscityflags", title: "US City Flags", subtitle: "Name the American city", icon: "🏙️", tab: "play", group: "Beta Sandbox", size: "tile", accent: "play", sandbox: true },
  { id: "tierlist", title: "Tier List Maker", subtitle: "Rank flags S–F", icon: "🏆", tab: "play", group: "Beta Sandbox", size: "tile", accent: "play", sandbox: true },

  // ── CODEX ──────────────────────────────────────────────────────────────
  { id: "codex", title: "The Codex", subtitle: "Every country's flag history", icon: "📖", tab: "codex", group: "Reference", size: "module", accent: "codex", progress: flagProgress },
  { id: "progressmap", title: "Progress Map", subtitle: "Light up the world", icon: "🗺️", tab: "codex", group: "Reference", size: "module", accent: "codex", progress: flagProgress },
  { id: "substats", title: "Subdivision Stats", subtitle: "Mastery by continent", icon: "📊", tab: "codex", group: "Reference", size: "module", accent: "codex", progress: subProgress },
]

export function groupsFor(tab: TabKey): { group: string; entries: Entry[] }[] {
  const out: { group: string; entries: Entry[] }[] = []
  for (const e of REGISTRY.filter(r => r.tab === tab)) {
    let g = out.find(x => x.group === e.group)
    if (!g) { g = { group: e.group, entries: [] }; out.push(g) }
    g.entries.push(e)
  }
  return out
}
