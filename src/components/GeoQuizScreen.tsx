import { useState, useEffect, useMemo } from 'react'
import { FLAGS } from '../data/flags'
import type { FlagRecord } from '../data/flags'
import { shuffleWithSeed, seededRandom, todayString } from '../utils/prng'
import { scorePhrase } from '../utils/quiz'
import CountryOutline from './CountryOutline'

interface Props { onBack: () => void }

interface GeoQuestion {
  target: FlagRecord
  choices: FlagRecord[]
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
  }))
}

export default function GeoQuizScreen({ onBack }: Props) {
  const [seed] = useState(() => Date.now().toString())
  const [questions] = useState<GeoQuestion[]>(() => buildQuiz(seed))
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<('correct' | 'wrong')[]>([])
  const [phase, setPhase] = useState<'quiz' | 'result'>('quiz')
  // One hint per game: reveals the continent of whichever question it's used on.
  const [hintUsed, setHintUsed] = useState(false)
  const [hintShownFor, setHintShownFor] = useState<number | null>(null)
  // Answer mode — multiple choice or free type-in.
  const [mode, setMode] = useState<'mc' | 'type'>('mc')
  const [input, setInput] = useState('')
  const [showDrop, setShowDrop] = useState(false)

  const q = questions[idx]
  useEffect(() => { setSelected(null); setInput('') }, [idx, seed])

  const matches = useMemo(() => {
    const qq = input.trim().toLowerCase()
    if (qq.length < 1) return []
    return FLAGS.filter(f => f.name.toLowerCase().includes(qq) || f.code.toLowerCase() === qq).slice(0, 6)
  }, [input])

  const resetGame = () => {
    setIdx(0); setScore(0); setAnswers([]); setSelected(null)
    setHintUsed(false); setHintShownFor(null); setPhase('quiz'); setInput('')
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

  const advance = (correct: boolean) => {
    if (correct) setScore(s => s + 1)
    setAnswers(prev => [...prev, correct ? 'correct' : 'wrong'])
    setTimeout(() => {
      if (idx + 1 >= questions.length) { setPhase('result') }
      else setIdx(i => i + 1)
    }, 1000)
  }

  const handleAnswer = (i: number) => {
    if (selected !== null) return
    setSelected(i)
    advance(q.choices[i].code === q.target.code)
  }

  const [typedGuess, setTypedGuess] = useState<FlagRecord | null>(null)
  useEffect(() => { setTypedGuess(null) }, [idx, seed])

  const handleType = (f: FlagRecord) => {
    if (typedGuess) return
    setTypedGuess(f); setInput(''); setShowDrop(false)
    advance(f.code === q.target.code)
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

      {/* Answer-mode toggle */}
      <div className="mx-5 mb-2 flex justify-center">
        <div className="inline-flex p-0.5 rounded-full" style={{ background: '#2D1F52', border: '1px solid #8B6CFF33' }}>
          {(['mc', 'type'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className="px-4 py-1 rounded-full text-xs font-bold transition-all"
              style={{ background: mode === m ? '#8B6CFF' : 'transparent', color: mode === m ? '#fff' : '#B8A9E0' }}>
              {m === 'mc' ? 'Choices' : 'Type-in'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center px-5 pb-8 gap-6">
        {/* Shape */}
        <div style={{
          width: '100%', maxWidth: 340, height: 220, borderRadius: 20,
          background: '#2D1F52', border: '1px solid #8B6CFF33',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <CountryOutline
            key={q.target.code}
            code={q.target.code}
            fill="#F5F3FF"
            style={{ width: '80%', height: '80%', objectFit: 'contain' }}
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

        {/* Choices (MC) or type-in */}
        {mode === 'mc' ? (
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
        ) : (
          <div style={{ width: '100%', maxWidth: 340 }} className="relative">
            {typedGuess ? (
              <div className="w-full px-4 py-3.5 rounded-2xl font-semibold text-sm text-center"
                style={{
                  background: typedGuess.code === q.target.code ? '#34D39922' : '#F43F5E22',
                  border: `1px solid ${typedGuess.code === q.target.code ? '#34D399' : '#F43F5E'}`,
                  color: '#F5F3FF',
                }}>
                {typedGuess.code === q.target.code ? `✓ ${q.target.name}` : `✗ ${typedGuess.name} — it was ${q.target.name}`}
              </div>
            ) : (
              <>
                <input
                  value={input} autoFocus autoComplete="off"
                  onChange={e => { setInput(e.target.value); setShowDrop(true) }}
                  onFocus={() => setShowDrop(true)}
                  onBlur={() => setTimeout(() => setShowDrop(false), 150)}
                  onKeyDown={e => { if (e.key === 'Enter' && matches.length >= 1) handleType(matches[0]) }}
                  placeholder="Name the country…"
                  className="w-full px-4 py-3.5 rounded-2xl outline-none font-semibold"
                  style={{ background: '#2D1F52', border: '1.5px solid #8B6CFF44', color: '#F5F3FF', fontSize: 15 }} />
                {showDrop && matches.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 rounded-xl overflow-hidden z-20"
                    style={{ background: '#2D1F52', border: '1px solid #8B6CFF44', boxShadow: '0 8px 32px #00000055' }}>
                    {matches.map(f => (
                      <button key={f.code} onMouseDown={() => handleType(f)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:brightness-125"
                        style={{ background: 'transparent', borderBottom: '1px solid #8B6CFF11', color: '#F5F3FF' }}>
                        <span className="font-semibold text-sm">{f.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
