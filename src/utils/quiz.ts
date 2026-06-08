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

export function generateShareText(result: { score: number; total: number; answers: ('correct' | 'wrong')[]; date: string }): string {
  const emojiRow = result.answers.map(a => a === 'correct' ? '🟩' : '🟥').join('')
  const trickNote = result.score < result.total ? " I got tricked!" : " Flawless!"
  return `Globalio ${result.date}\n${result.score}/${result.total} 🌍\n${emojiRow}${trickNote}\nPlay at globalio.netlify.app`
}
