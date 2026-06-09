import { useState, useEffect } from 'react'
import { FLAGS } from '../data/flags'
import type { FlagRecord } from '../data/flags'
import { shuffleWithSeed, seededRandom } from '../utils/prng'

interface Props { onBack: () => void }

interface GeoQuestion {
  target: FlagRecord
  choices: FlagRecord[]
  shapeUrl: string
}

function shapeUrl(code: string) {
  return `https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${code.toLowerCase()}/512.png`
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
  const [phase, setPhase] = useState<'quiz' | 'result'>('quiz')
  const [imgLoaded, setImgLoaded] = useState(false)

  const q = questions[idx]
  useEffect(() => { setSelected(null); setImgLoaded(false) }, [idx, seed])

  const handleAnswer = (i: number) => {
    if (selected !== null) return
    setSelected(i)
    if (q.choices[i].code === q.target.code) setScore(s => s + 1)
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
        style={{ background: 'linear-gradient(135deg,#1A1033 0%,#2A1A4A 100%)' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🌍</div>
        <div style={{ fontSize: 48, fontWeight: 900, color }} className="mb-2">{score}/{questions.length}</div>
        <div style={{ color: '#B8A9E0', marginBottom: 32 }}>
          {pct >= 0.8 ? 'Geography master! 🏆' : pct >= 0.5 ? 'Not bad!' : 'Keep exploring!'}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onBack}
            className="px-6 py-3 rounded-2xl font-bold"
            style={{ background: '#2D1F52', border: '1px solid #8B6CFF44', color: '#A78BFA' }}>
            Home
          </button>
          <button onClick={() => { setIdx(0); setScore(0); setSelected(null); setPhase('quiz') }}
            className="px-6 py-3 rounded-2xl font-bold"
            style={{ background: 'linear-gradient(135deg,#8B6CFF,#A78BFA)', color: '#fff' }}>
            Play Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,#1A1033 0%,#2A1A4A 100%)', position: 'relative', zIndex: 1 }}>
      <header className="flex items-center gap-3 px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: '#2D1F52', color: '#B8A9E0' }}>‹</button>
        <div className="flex-1">
          <h1 className="text-xl font-black" style={{ color: '#F5F3FF' }}>Geography</h1>
          <div className="text-xs" style={{ color: '#B8A9E0' }}>{idx + 1} / {questions.length} · {score} correct</div>
        </div>
        {/* Progress bar */}
        <div style={{ width: 80, height: 6, borderRadius: 999, background: '#2D1F52', overflow: 'hidden' }}>
          <div style={{ width: `${((idx) / questions.length) * 100}%`, height: '100%', background: '#8B6CFF', borderRadius: 999, transition: 'width 0.3s' }} />
        </div>
      </header>

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
            onError={() => setImgLoaded(true)}
            style={{
              maxWidth: '80%', maxHeight: '80%', objectFit: 'contain',
              filter: 'brightness(0) invert(1)',
              opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s',
            }}
          />
        </div>

        {/* Region hint */}
        <div style={{
          padding: '4px 14px', borderRadius: 999,
          background: '#8B6CFF22', border: '1px solid #8B6CFF33',
          fontSize: 11, color: '#A78BFA', fontWeight: 600,
        }}>{q.target.region}</div>

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
