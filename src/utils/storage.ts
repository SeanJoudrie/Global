const STORAGE_KEY = 'dailyglobe_v1'

export interface DailyResult {
  score: number
  total: number
  date: string
  answers: ('correct' | 'wrong')[]
}

export interface AppState {
  username: string
  learnedFlags: string[]
  crowns: string[]
  currentStreak: number
  longestStreak: number
  lastDailyDate: string | null
  dailyHistory: Record<string, DailyResult>
  funFactStreak: number
  lastFunFactDate: string | null
  lastShareResult: ShareResult | null
}

export interface ShareResult {
  game: string
  score: string        // e.g. "8/10" or "750 pts"
  emojiGrid: string[]  // ['🟩','🟥',...]
  date: string
  streak?: number
}

const DEFAULT_STATE: AppState = {
  username: "",
  learnedFlags: [],
  crowns: [],
  currentStreak: 0,
  longestStreak: 0,
  lastDailyDate: null,
  dailyHistory: {},
  funFactStreak: 0,
  lastFunFactDate: null,
  lastShareResult: null,
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_STATE }
    return { ...DEFAULT_STATE, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_STATE }
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function markFlagLearned(state: AppState, code: string): AppState {
  if (state.learnedFlags.includes(code)) return state
  return { ...state, learnedFlags: [...state.learnedFlags, code] }
}

export function recordDailyResult(state: AppState, result: DailyResult): AppState {
  const today = result.date
  const yesterday = getPreviousDay(today)

  const streakBroken = state.lastDailyDate !== yesterday && state.lastDailyDate !== today
  const alreadyDoneToday = state.lastDailyDate === today

  let newStreak = state.currentStreak
  if (!alreadyDoneToday) {
    newStreak = streakBroken ? 1 : state.currentStreak + 1
  }

  return {
    ...state,
    lastDailyDate: today,
    currentStreak: newStreak,
    longestStreak: Math.max(state.longestStreak, newStreak),
    dailyHistory: { ...state.dailyHistory, [today]: result },
  }
}

export function recordFunFactViewed(state: AppState, date: string): AppState {
  if (state.lastFunFactDate === date) return state
  const yesterday = getPreviousDay(date)
  const streakBroken = state.lastFunFactDate !== yesterday
  const newStreak = streakBroken ? 1 : (state.funFactStreak ?? 0) + 1
  return { ...state, lastFunFactDate: date, funFactStreak: newStreak }
}

export function saveShareResult(state: AppState, result: ShareResult): AppState {
  return { ...state, lastShareResult: result }
}

export function awardCrown(state: AppState, setId: string): AppState {
  if (state.crowns.includes(setId)) return state
  return { ...state, crowns: [...state.crowns, setId] }
}

function getPreviousDay(dateStr: string): string {
  const d = new Date(dateStr)
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}
