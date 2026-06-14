import { FLAGS } from '../data/flags'
import type { FlagRecord } from '../data/flags'
import { shuffleWithSeed, seededRandom } from './prng'

export interface Question {
  target: FlagRecord
  choices: FlagRecord[]  // 4 total including target
  correctIndex: number
}

function getDistractors(target: FlagRecord, count: number, rngSeed: string): FlagRecord[] {
  const rng = seededRandom(rngSeed + target.code)

  const confusables = target.confusableWith
    .map(c => FLAGS.find(f => f.code === c))
    .filter((f): f is FlagRecord => !!f && f.code !== target.code)

  const shuffledConfusables = [...confusables].sort(() => rng() - 0.5)
  const picked: FlagRecord[] = shuffledConfusables.slice(0, count)

  if (picked.length < count) {
    const sameRegion = FLAGS.filter(
      f => f.region === target.region && f.code !== target.code && !picked.find(p => p.code === f.code)
    ).sort(() => rng() - 0.5)
    picked.push(...sameRegion.slice(0, count - picked.length))
  }

  if (picked.length < count) {
    const rest = FLAGS.filter(
      f => f.code !== target.code && !picked.find(p => p.code === f.code)
    ).sort(() => rng() - 0.5)
    picked.push(...rest.slice(0, count - picked.length))
  }

  return picked.slice(0, count)
}

export function buildQuestion(target: FlagRecord, seed: string): Question {
  const distractors = getDistractors(target, 3, seed)
  const allChoices = [target, ...distractors]
  const rng = seededRandom(seed + target.code + 'order')
  const shuffled = [...allChoices].sort(() => rng() - 0.5)
  const correctIndex = shuffled.findIndex(f => f.code === target.code)
  return { target, choices: shuffled, correctIndex }
}

export function buildDailyQuiz(dateStr: string, count = 10): Question[] {
  const shuffled = shuffleWithSeed(FLAGS, dateStr)
  const selected = shuffled.slice(0, count)
  return selected.map(flag => buildQuestion(flag, dateStr))
}

export function buildSetQuiz(flags: FlagRecord[], seed: string, max = 10): Question[] {
  const shuffled = shuffleWithSeed(flags, seed)
  const selected = shuffled.slice(0, max)
  return selected.map(flag => buildQuestion(flag, seed))
}

// A distinct, Wordle-style flavour line for each score out of 10.
const SHARE_PHRASES = [
  "Blanked! 🌑 The atlas wins this round.", // 0
  "A flicker of recognition 🌱",            // 1
  "Finding my bearings 🧭",                 // 2
  "The map's coming into focus 🗺️",        // 3
  "Getting warmer 🚩",                      // 4
  "Dead even with the flags ⚖️",            // 5
  "More right than wrong 📈",               // 6
  "Sharp eyes 🔥",                          // 7
  "Flag connoisseur 🌟",                    // 8
  "So close to flawless 🦅",                // 9
  "Flawless! A true vexillologist 🏆",      // 10
]

// Pick the flavour line for a score (scales to a 0-10 tier if the quiz isn't out of 10).
export function scorePhrase(score: number, total: number): string {
  const idx = total === 10 ? score : Math.round((score / total) * 10)
  return SHARE_PHRASES[idx] ?? ""
}

export function generateShareText(result: { score: number; total: number; answers: ('correct' | 'wrong')[]; date: string }): string {
  const emojiRow = result.answers.map(a => a === 'correct' ? '🟩' : '🟥').join('')
  const phrase = scorePhrase(result.score, result.total)
  const scoreLine = `${result.score}/${result.total} 🌍${phrase ? ` ${phrase}` : ""}`
  return `Globalio ${result.date}\n${scoreLine}\n${emojiRow}\nPlay at globalio.app`
}
