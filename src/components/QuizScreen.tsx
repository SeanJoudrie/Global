import { useState, useEffect } from 'react'
import type { Question } from '../utils/quiz'

interface Props {
  questions: Question[]
  title: string
  onFinish: (answers: ('correct' | 'wrong')[]) => void
  onBack: () => void
}

type AnswerState = 'idle' | 'correct' | 'wrong'

export default function QuizScreen({ questions, title, onFinish, onBack }: Props) {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<('correct' | 'wrong')[]>([])
  const [answerState, setAnswerState] = useState<AnswerState>('idle')
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [showLightbulb, setShowLightbulb] = useState(false)
  const [imgError, setImgError] = useState(false)

  const q = questions[idx]

  useEffect(() => {
    setAnswerState('idle')
    setSelectedIdx(null)
    setShowLightbulb(false)
    setImgError(false)
  }, [idx])

  const handleChoice = (choiceIdx: number) => {
    if (answerState !== 'idle') return

    const isCorrect = choiceIdx === q.correctIndex
    setSelectedIdx(choiceIdx)
    setAnswerState(isCorrect ? 'correct' : 'wrong')
    if (!isCorrect) setShowLightbulb(true)

    const newAnswers = [...answers, isCorrect ? 'correct' : 'wrong'] as ('correct' | 'wrong')[]
    setAnswers(newAnswers)

    setTimeout(() => {
      if (idx + 1 >= questions.length) {
        onFinish(newAnswers)
      } else {
        setIdx(i => i + 1)
      }
    }, isCorrect ? 1800 : 3000)
  }

  const choiceBg = (i: number) => {
    if (answerState === 'idle') return '#2D1F52'
    if (i === q.correctIndex) return '#34D399'
    if (i === selectedIdx && answerState === 'wrong') return '#F43F5E'
    return '#2D1F52'
  }

  const choiceBorder = (i: number) => {
    if (answerState === 'idle') return '#8B6CFF33'
    if (i === q.correctIndex) return '#34D399'
    if (i === selectedIdx && answerState === 'wrong') return '#F43F5E'
    return '#8B6CFF22'
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #1A1033 0%, #2A1A4A 100%)' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-8 pb-2">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full text-xl transition-all active:scale-90"
          style={{ background: '#2D1F52', color: '#B8A9E0' }}
        >
          ‹
        </button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#B8A9E0' }}>{title}</div>
          <div className="text-sm font-bold" style={{ color: '#F5F3FF' }}>{idx + 1} / {questions.length}</div>
        </div>
        <div className="w-9" />
      </header>

      {/* Progress bar */}
      <div className="mx-5 mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: '#2D1F52' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${((idx) / questions.length) * 100}%`, background: 'linear-gradient(90deg, #8B6CFF, #A78BFA)' }}
        />
      </div>

      {/* Flag */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-6">
        <div className="mb-6 relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: '2px solid #8B6CFF44' }}>
            {imgError ? (
              <div className="flex items-center justify-center text-5xl"
                style={{ width: 280, height: 175, background: '#2D1F52', color: '#B8A9E0' }}>
                🏳️
              </div>
            ) : (
              <img
                src={q.target.flagUrl}
                alt="mystery flag"
                width={280}
                height={175}
                className="object-cover"
                style={{ display: 'block' }}
                onError={() => setImgError(true)}
              />
            )}
          </div>
          {/* Lightbulb button */}
          <button
            onClick={() => setShowLightbulb(s => !s)}
            className="absolute -bottom-3 -right-3 w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all active:scale-90 hover:brightness-110"
            style={{ background: '#2D1F52', border: '1px solid #8B6CFF44', boxShadow: '0 2px 8px #00000066' }}
            title="Show distinguishing tip"
          >
            💡
          </button>
        </div>

        {/* Lightbulb tip */}
        {showLightbulb && (
          <div className="w-full max-w-sm mb-4 px-4 py-3 rounded-xl animate-slide-up"
            style={{ background: '#2D1F52', border: '1px solid #FBBF2444' }}>
            <div className="text-xs font-semibold mb-1" style={{ color: '#FBBF24' }}>💡 How to tell them apart</div>
            <p className="text-sm" style={{ color: '#F5F3FF' }}>{q.target.distinguishingTip}</p>
          </div>
        )}

        {/* Correct fun fact */}
        {answerState === 'correct' && (
          <div className="w-full max-w-sm mb-4 px-4 py-3 rounded-xl animate-slide-up"
            style={{ background: '#2D1F52', border: '1px solid #34D39944' }}>
            <div className="text-xs font-semibold mb-1" style={{ color: '#34D399' }}>✓ {q.target.name}</div>
            <p className="text-sm" style={{ color: '#F5F3FF' }}>{q.target.funFact}</p>
          </div>
        )}

        {/* Wrong answer confuser note */}
        {answerState === 'wrong' && (
          <div className="w-full max-w-sm mb-4 px-4 py-3 rounded-xl animate-slide-up"
            style={{ background: '#2D1F52', border: '1px solid #F43F5E44' }}>
            <div className="text-xs font-semibold mb-1" style={{ color: '#F43F5E' }}>✗ Tricky one! The answer was {q.target.name}</div>
            <p className="text-sm" style={{ color: '#F5F3FF' }}>{q.target.distinguishingTip}</p>
          </div>
        )}

        {/* Choices */}
        <div className="w-full max-w-sm grid grid-cols-2 gap-3">
          {q.choices.map((choice, i) => (
            <button
              key={choice.code}
              onClick={() => handleChoice(i)}
              disabled={answerState !== 'idle'}
              className="py-3.5 px-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
              style={{
                background: choiceBg(i),
                border: `1.5px solid ${choiceBorder(i)}`,
                color: '#F5F3FF',
                cursor: answerState !== 'idle' ? 'default' : 'pointer',
              }}
            >
              {choice.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
