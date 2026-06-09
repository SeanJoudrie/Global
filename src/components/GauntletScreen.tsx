import { useState } from 'react'
import { FLAGS, REGIONS, getFlagsByRegion } from '../data/flags'
import type { FlagRecord, Region } from '../data/flags'
import { shuffleWithSeed } from '../utils/prng'
import { buildQuestion } from '../utils/quiz'

interface Props { onBack: () => void }

type Phase = 'menu' | 'run' | 'dead' | 'win'

interface GauntletConfig {
  label: string
  emoji: string
  flags: FlagRecord[]
  id: string
}

function buildConfigs(): GauntletConfig[] {
  return [
    { id: 'world', label: 'World', emoji: '🌍', flags: FLAGS },
    ...REGIONS.map(r => ({
      id: r,
      label: r,
      emoji: regionEmoji(r),
      flags: getFlagsByRegion(r as Region),
    })),
  ]
}

function regionEmoji(r: string): string {
  const map: Record<string, string> = {
    Europe: '🏰', Africa: '🌍', Asia: '🏯', Americas: '🗽', Oceania: '🏄', 'Middle East': '🕌',
  }
  return map[r] ?? '🌐'
}

export default function GauntletScreen({ onBack }: Props) {
  const configs = buildConfigs()
  const [phase, setPhase] = useState<Phase>('menu')
  const [config, setConfig] = useState<GauntletConfig | null>(null)
  const [questions, setQuestions] = useState<ReturnType<typeof buildQuestion>[]>([])
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)

  const q = questions[idx]

  const startRun = (cfg: GauntletConfig) => {
    const seed = Date.now().toString()
    const shuffled = shuffleWithSeed(cfg.flags, seed)
    const qs = shuffled.map(f => buildQuestion(f, seed))
    setConfig(cfg)
    setQuestions(qs)
    setIdx(0)
    setScore(0)
    setSelected(null)
    setPhase('run')
  }

  const handleAnswer = (i: number) => {
    if (selected !== null) return
    setSelected(i)
    const correct = q.choices[i].code === q.target.code
    if (correct) {
      setScore(s => s + 1)
      setTimeout(() => {
        if (idx + 1 >= questions.length) { setPhase('win') }
        else { setIdx(ix => ix + 1); setSelected(null) }
      }, 700)
    } else {
      // One strike = dead
      setTimeout(() => setPhase('dead'), 900)
    }
  }

  if (phase === 'menu') {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)', position: 'relative', zIndex: 1 }}>
        <header className="flex items-center gap-3 px-5 pt-8 pb-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
            style={{ background: '#2D1F52', color: '#B8A9E0' }}>‹</button>
          <div>
            <h1 className="text-2xl font-black" style={{ color: '#F5F3FF' }}>Gauntlet</h1>
            <p className="text-xs" style={{ color: '#B8A9E0' }}>One wrong answer — game over</p>
          </div>
        </header>

        <div className="px-5 pb-8 space-y-3">
          <div className="px-4 py-3 rounded-xl mb-2" style={{ background: '#F43F5E18', border: '1px solid #F43F5E44' }}>
            <p className="text-sm" style={{ color: '#F43F5E' }}>
              ⚔️ <strong>Survival mode</strong> — get through every flag without a single mistake
            </p>
          </div>
          {configs.map(cfg => (
            <button
              key={cfg.id}
              onClick={() => startRun(cfg)}
              className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all active:scale-[0.98]"
              style={{ background: '#2D1F52', border: '1px solid #F43F5E33' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cfg.emoji}</span>
                <div className="text-left">
                  <div className="font-bold" style={{ color: '#F5F3FF' }}>{cfg.label}</div>
                  <div className="text-xs" style={{ color: '#B8A9E0' }}>{cfg.flags.length} flags to survive</div>
                </div>
              </div>
              <span style={{ color: '#F43F5E' }}>›</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (phase === 'dead') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5 gap-6"
        style={{ background: 'linear-gradient(135deg,#1A0808,#2A1010)', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 72 }}>💀</div>
        <div style={{ textAlign: 'center' }}>
          <div className="text-3xl font-black mb-2" style={{ color: '#F5F3FF' }}>Game Over</div>
          <div style={{ color: '#B8A9E0' }}>You survived <strong style={{ color: '#F43F5E' }}>{score}</strong> flag{score !== 1 ? 's' : ''}</div>
          {q && <div className="mt-2 text-sm" style={{ color: '#B8A9E088' }}>The answer was <strong style={{ color: '#F5F3FF' }}>{q.target.name}</strong></div>}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onBack}
            className="px-6 py-3 rounded-2xl font-bold"
            style={{ background: '#2D1F52', border: '1px solid #8B6CFF44', color: '#A78BFA' }}>
            Home
          </button>
          {config && (
            <button onClick={() => startRun(config)}
              className="px-6 py-3 rounded-2xl font-bold"
              style={{ background: 'linear-gradient(135deg,#F43F5E,#FB7185)', color: '#fff' }}>
              Try Again
            </button>
          )}
        </div>
      </div>
    )
  }

  if (phase === 'win') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5 gap-6"
        style={{ background: 'linear-gradient(135deg,#071410,#0F2018)', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 72 }}>🏆</div>
        <div style={{ textAlign: 'center' }}>
          <div className="text-3xl font-black mb-2" style={{ color: '#F5F3FF' }}>Flawless!</div>
          <div style={{ color: '#4ADE80' }}>You named all <strong>{score}</strong> flags without a mistake</div>
        </div>
        <button onClick={onBack}
          className="px-8 py-3 rounded-2xl font-bold"
          style={{ background: 'linear-gradient(135deg,#22C55E,#4ADE80)', color: '#fff' }}>
          Back to Home
        </button>
      </div>
    )
  }

  // Run phase
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)', position: 'relative', zIndex: 1 }}>
      <header className="flex items-center gap-3 px-5 pt-8 pb-4">
        <button onClick={() => setPhase('menu')} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: '#2D1F52', color: '#B8A9E0' }}>‹</button>
        <div className="flex-1">
          <div className="font-black" style={{ color: '#F5F3FF' }}>{config?.label} Gauntlet</div>
          <div className="text-xs" style={{ color: '#B8A9E0' }}>{idx + 1} / {questions.length} · {score} survived</div>
        </div>
        <div style={{
          padding: '4px 12px', borderRadius: 999,
          background: '#F43F5E22', border: '1px solid #F43F5E44',
          color: '#F43F5E', fontSize: 12, fontWeight: 700,
        }}>⚔️ 1 life</div>
      </header>

      <div className="flex-1 flex flex-col items-center px-5 pb-8 gap-5">
        {/* Survival progress */}
        <div style={{ width: '100%', height: 4, borderRadius: 999, background: '#2D1F52', overflow: 'hidden' }}>
          <div style={{
            width: `${(idx / questions.length) * 100}%`, height: '100%',
            background: 'linear-gradient(90deg,#F43F5E,#FB7185)',
            borderRadius: 999, transition: 'width 0.3s',
          }} />
        </div>

        {/* Flag */}
        <div style={{
          width: '100%', maxWidth: 340, borderRadius: 20, overflow: 'hidden',
          border: '1px solid #8B6CFF33',
        }}>
          <img
            key={q.target.code}
            src={q.target.flagUrl}
            alt="flag"
            style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>

        {/* Choices */}
        <div style={{ width: '100%', maxWidth: 340, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {q.choices.map((choice, i) => {
            const isCorrect = choice.code === q.target.code
            const isSelected = selected === i
            let bg = '#2D1F52'
            let border = '1px solid #8B6CFF33'
            let textColor = '#F5F3FF'
            if (selected !== null) {
              if (isCorrect) { bg = '#34D39922'; border = '1px solid #34D399'; textColor = '#34D399' }
              else if (isSelected) { bg = '#F43F5E22'; border = '1px solid #F43F5E'; textColor = '#F43F5E' }
            }
            return (
              <button
                key={choice.code}
                onClick={() => handleAnswer(i)}
                className="py-4 px-4 rounded-2xl font-semibold text-sm text-left transition-all active:scale-95"
                style={{ background: bg, border, color: textColor }}
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
