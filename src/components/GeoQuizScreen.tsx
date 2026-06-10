import { useState, useEffect } from 'react'
import { FLAGS } from '../data/flags'
import type { FlagRecord } from '../data/flags'
import { shuffleWithSeed, seededRandom, todayString } from '../utils/prng'
import { scorePhrase } from '../utils/quiz'

interface Props { onBack: () => void }

interface GeoQuestion {
  target: FlagRecord
  choices: FlagRecord[]
  shapeUrl: string
}

function shapeUrl(code: string) {
  return `https://cdn.jsdelivr.net/gh/djaiss/mapsicon@master/all/${code.toLowerCase()}/512.png`
}

function buildChoices(target: FlagRecord, seed: string): FlagRecord[] {
  const rng = seededRandom(seed + target.code)
  // Prefer same-region distractors
  const sameRegion = FLAGS
    .filter(f => f.region === target.region && f.code !== target.code)
    .sort(() => rng() - 0.5).slice(0, 3)
  const picks = [...sameRegion]
  if (picks.length < 3) {
    const rest = FLAGS.filter(f => f.code !== target.code && !picks.find(p => p.code === f.code))
      .sort(() => rng() - 0.5)
    picks.push(...rest.slice(0, 3 - picks.length))
  }
  return [target, ...picks.slice(0, 3)].sort(() => rng() - 0.5)
}

function buildQuiz(seed: string, count = 10): GeoQuestion[] {
  const shuffled = shuffleWithSeed(FLAGS, seed).slice(0, count)
  return shuffled.map(target => ({
    target,
    choices: buildChoices(target, seed),
    shapeUrl: shapeUrl(target.code),
  }))
}

export default function GeoQuizScreen({ onBack }: Props) {
  const [seed] = useState(() => Date.now().toString())
  const [questions] = useState<GeoQuestion[]>(() => buildQuiz(Date.now().toString()))
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<('correct' | 'wrong')[]>([])
  const [phase, setPhase] = useState<'quiz' | 'result'>('quiz')
  const [imgLoaded, setImgLoaded] = useState(false)
  // One hint per game: reveals the continent of whichever question it's used on.
  const [hintUsed, setHintUsed] = useState(false)
  const [hintShownFor, setHintShownFor] = useState<number | null>(null)

  const q = questions[idx]
  useEffect(() => { setSelected(null); setImgLoaded(false) }, [idx, seed])

  const resetGame = () => {
    setIdx(0); setScore(0); setAnswers([]); setSelected(null)
    setHintUsed(false); setHintShownFor(null); setPhase('quiz')
  }

  const useHint = () => {
    if (hintUsed) return
    setHintUsed(true)
    setHintShownFor(idx)
  }

  const handleShare = async () => {
    const grid = answers.map(a => a === 'correct' ? '🟩' : '🟥').join('')
    const phrase = scorePhrase(score, questions.length)
    const text = `Globalio Geography ${todayString()}\n${score}/${questions.length} 🌍${phrase ? ` ${phrase}` : ''}\n${grid}\nPlay at globalio.netlify.app`
    try { await navigator.clipboard.writeText(text); alert('Copied to clipboard!') }
    catch { alert(text) }
  }

  const handleAnswer = (i: number) => {
    if (selected !== null) return
    setSelected(i)
    const correct = q.choices[i].code === q.target.code
    if (correct) setScore(s => s + 1)
    setAnswers(prev => [...prev, correct ? 'correct' : 'wrong'])
    setTimeout(() => {
      if (idx + 1 >= questions.length) { setPhase('result') }
      else setIdx(i => i + 1)
    }, 1000)
  }

  if (phase === 'result') {
    const pct = score / questions.length
    const color = pct >= 0.8 ? '#34D399' : pct >= 0.5 ? '#F59E0B' : '#F43F5E'
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: 'linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🌍</div>
        <div style={{ fontSize: 48, fontWeight: 900, color }} className="mb-2">{score}/{questions.length}</div>
        <div style={{ color: '#B8A9E0', marginBottom: 20 }}>
          {pct >= 0.8 ? 'Geography master! 🏆' : pct >= 0.5 ? 'Not bad!' : 'Keep exploring!'}
        </div>

        {/* Wordle-style result grid */}
        <div className="flex justify-center gap-1 mb-6 flex-wrap" style={{ maxWidth: 320 }}>
          {answers.map((a, i) => (
            <span key={i} className="text-xl">{a === 'correct' ? '🟩' : '🟥'}</span>
          ))}
        </div>

        <button onClick={handleShare}
          className="px-6 py-3 rounded-2xl font-bold mb-3 transition-all active:scale-95 hover:brightness-110"
          style={{ background: 'linear-gradient(135deg,#8B6CFF,#A78BFA)', color: '#fff', boxShadow: '0 4px 20px #8B6CFF55' }}>
          📋 Share Result
        </button>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onBack}
            className="px-6 py-3 rounded-2xl font-bold"
            style={{ background: '#2D1F52', border: '1px solid #8B6CFF44', color: '#A78BFA' }}>
            Home
          </button>
          <button onClick={resetGame}
            className="px-6 py-3 rounded-2xl font-bold"
            style={{ background: '#2D1F52', border: '1px solid #8B6CFF44', color: '#A78BFA' }}>
            Play Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)', position: 'relative', zIndex: 1 }}>
      <header className="flex items-center gap-3 px-5 pt-8 pb-2">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: '#2D1F52', color: '#B8A9E0' }}>‹</button>
        <div className="flex-1">
          <h1 className="text-xl font-black" style={{ color: '#F5F3FF' }}>Geography</h1>
          <div className="text-xs" style={{ color: '#B8A9E0' }}>{idx + 1} / {questions.length} · {score} correct</div>
        </div>
        {/* Single-use hint */}
        <button
          onClick={useHint}
          disabled={hintUsed}
          title={hintUsed ? 'Hint used' : 'Use your one hint (reveals the continent)'}
          className="px-3 h-9 flex items-center gap-1.5 rounded-full text-sm font-bold transition-all active:scale-95"
          style={{
            background: hintUsed ? '#2D1F5288' : '#2D1F52',
            border: `1px solid ${hintUsed ? '#8B6CFF22' : '#FBBF2466'}`,
            color: hintUsed ? '#8B6CFF66' : '#FBBF24',
            cursor: hintUsed ? 'default' : 'pointer',
          }}
        >💡 {hintUsed ? 'Used' : '1'}</button>
      </header>

      {/* Full-width progress bar */}
      <div className="mx-5 mb-3 h-1.5 rounded-full overflow-hidden" style={{ background: '#2D1F52' }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(idx / questions.length) * 100}%`, background: 'linear-gradient(90deg,#8B6CFF,#A78BFA)' }} />
      </div>

      <div className="flex-1 flex flex-col items-center px-5 pb-8 gap-6">
        {/* Shape */}
        <div style={{
          width: '100%', maxWidth: 340, height: 220, borderRadius: 20,
          background: '#2D1F52', border: '1px solid #8B6CFF33',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {!imgLoaded && (
            <div style={{ position: 'absolute', color: '#8B6CFF44', fontSize: 14 }}>Loading shape…</div>
          )}
          <img
            key={q.target.code}
            src={q.shapeUrl}
            alt="Country shape"
            onLoad={() => setImgLoaded(true)}
            onError={e => {
              const el = e.target as HTMLImageElement
              if (!el.dataset.fb) {
                el.dataset.fb = "1"
                el.src = `https://cdn.jsdelivr.net/gh/djaiss/mapsicon@master/all/${q.target.code.toLowerCase()}/vector.svg`
              } else {
                setImgLoaded(true)
              }
            }}
            style={{
              maxWidth: '80%', maxHeight: '80%', objectFit: 'contain',
              filter: 'brightness(0) invert(1)',
              opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s',
            }}
          />
        </div>

        {/* Continent is hidden by default — only revealed if the player spends their hint */}
        {hintShownFor === idx ? (
          <div style={{
            padding: '4px 14px', borderRadius: 999,
            background: '#FBBF2422', border: '1px solid #FBBF2455',
            fontSize: 11, color: '#FBBF24', fontWeight: 600,
          }}>💡 {q.target.region}</div>
        ) : (
          <div style={{ height: 25 }} />
        )}

        {/* Choices */}
        <div style={{ width: '100%', maxWidth: 340, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {q.choices.map((choice, i) => {
            const isCorrect = choice.code === q.target.code
            const isSelected = selected === i
            let bg = '#2D1F52'
            let border = '1px solid #8B6CFF33'
            if (selected !== null) {
              if (isCorrect) { bg = '#34D39922'; border = '1px solid #34D399' }
              else if (isSelected) { bg = '#F43F5E22'; border = '1px solid #F43F5E' }
            }
            return (
              <button
                key={choice.code}
                onClick={() => handleAnswer(i)}
                className="py-3 px-4 rounded-2xl font-semibold text-sm text-left transition-all active:scale-95"
                style={{ background: bg, border, color: '#F5F3FF' }}
              >
                {choice.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
