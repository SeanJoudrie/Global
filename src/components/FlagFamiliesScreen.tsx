import { useState } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"

interface Props { onBack: () => void }

interface Family {
  id: string
  label: string
  emoji: string
  codes: string[]
}

const FAMILY_DEFS: Family[] = [
  { id: 'nordic',     label: 'Nordic Cross',        emoji: '✚',  codes: ['DK','NO','SE','FI','IS'] },
  { id: 'crescent',   label: 'Crescent & Star',      emoji: '☪️', codes: ['TR','PK','MY','TN','DZ','AZ','TM','LY','MV','UZ'] },
  { id: 'v-tricolor', label: 'Vertical Tricolor',    emoji: '🎨', codes: ['FR','IT','IE','BE','RO','NG','ML','SN','CI','GN','CM'] },
  { id: 'h-tricolor', label: 'Horizontal Tricolor',  emoji: '═',  codes: ['DE','NL','RU','HU','AT','BG','LT','EE','LV','AM'] },
  { id: 'pan-african',label: 'Pan-African Colors',   emoji: '🌍', codes: ['ET','GH','SN','ML','GN','CI','NG','CM','KE','ZM','TZ'] },
  { id: 'uk-ensign',  label: 'Union Jack Family',    emoji: '🇬🇧', codes: ['AU','NZ','FJ','NR','CK','TV'] },
]

interface Round {
  familyA: Family
  familyB: Family
  flags: { flag: FlagRecord; family: 'A' | 'B' }[]
}

function buildRounds(count: number): Round[] {
  const rounds: Round[] = []
  const shuffledDefs = [...FAMILY_DEFS].sort(() => Math.random() - 0.5)

  for (let i = 0; i < shuffledDefs.length - 1 && rounds.length < count; i += 2) {
    const famA = shuffledDefs[i]
    const famB = shuffledDefs[i + 1]
    const flagsA = FLAGS.filter(f => famA.codes.includes(f.code)).sort(() => Math.random() - 0.5).slice(0, 3)
    const flagsB = FLAGS.filter(f => famB.codes.includes(f.code)).sort(() => Math.random() - 0.5).slice(0, 3)
    if (flagsA.length < 2 || flagsB.length < 2) continue
    const combined = [
      ...flagsA.map(flag => ({ flag, family: 'A' as const })),
      ...flagsB.map(flag => ({ flag, family: 'B' as const })),
    ].sort(() => Math.random() - 0.5)
    rounds.push({ familyA: famA, familyB: famB, flags: combined })
  }
  return rounds
}

const TOTAL_ROUNDS = 3
const ACCENT_A = '#8B6CFF'
const ACCENT_B = '#34D399'

const FLAG_W = 72
const FLAG_H = 48

export default function FlagFamiliesScreen({ onBack }: Props) {
  const [rounds]    = useState(() => buildRounds(TOTAL_ROUNDS))
  const [idx, setIdx]       = useState(0)
  // assignments: code → 'A' | 'B'
  const [assignments, setAssignments] = useState<Record<string, 'A' | 'B'>>({})
  const [selected, setSelected]       = useState<string | null>(null)
  const [checked, setChecked]         = useState(false)
  const [scores, setScores]           = useState<boolean[]>([])
  const [done, setDone]               = useState(false)

  const round = rounds[idx]

  // Tap a flag in the pool: select it; tap again to deselect
  const handleFlagTap = (code: string) => {
    if (checked) return
    setSelected(prev => prev === code ? null : code)
  }

  // Tap a row (A or B) to assign the selected flag
  const handleRowTap = (row: 'A' | 'B') => {
    if (checked || !selected) return
    setAssignments(prev => ({ ...prev, [selected]: row }))
    setSelected(null)
  }

  // Tap a flag already in a row to move it back to pool
  const handleUnassign = (code: string) => {
    if (checked) return
    setAssignments(prev => {
      const next = { ...prev }
      delete next[code]
      return next
    })
    setSelected(null)
  }

  const allAssigned = round?.flags.every(f => !!assignments[f.flag.code])

  const handleCheck = () => {
    if (!allAssigned) return
    const correct = round.flags.every(f => assignments[f.flag.code] === f.family)
    setScores(prev => [...prev, correct])
    setChecked(true)
    setSelected(null)
  }

  const handleNext = () => {
    if (idx + 1 >= rounds.length) { setDone(true); return }
    setIdx(i => i + 1)
    setAssignments({})
    setSelected(null)
    setChecked(false)
  }

  // ── Result ──────────────────────────────────────────────────────────────────
  if (done || rounds.length === 0) {
    const correct = scores.filter(Boolean).length
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl p-6 text-center mb-4"
            style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 0 32px #8B6CFF22" }}>
            <div className="text-5xl mb-3">{correct === scores.length ? "🏷️" : correct >= 2 ? "👍" : "📚"}</div>
            <div className="text-6xl font-black mb-1" style={{ color: "#F5F3FF" }}>{correct}/{scores.length}</div>
            <div className="text-sm mb-3" style={{ color: "#B8A9E0" }}>rounds sorted correctly</div>
            <div className="flex justify-center gap-2">
              {scores.map((ok, i) => <span key={i} style={{ fontSize: 24 }}>{ok ? '🟩' : '🟥'}</span>)}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => window.location.reload()}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
              Play Again
            </button>
            <button onClick={onBack}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "#2D1F52", border: "1px solid #8B6CFF33", color: "#B8A9E0" }}>
              ← Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  const flagsInA    = round.flags.filter(f => assignments[f.flag.code] === 'A')
  const flagsInB    = round.flags.filter(f => assignments[f.flag.code] === 'B')
  const unassigned  = round.flags.filter(f => !assignments[f.flag.code])
  const roundScore  = checked ? scores[scores.length - 1] : null

  const renderFlag = (
    { flag, family }: { flag: FlagRecord; family: 'A' | 'B' },
    inRow: 'A' | 'B' | null,
  ) => {
    const isSelected = selected === flag.code
    const correctRow = inRow !== null ? inRow === family : null
    let border = '1.5px solid #8B6CFF22'
    if (checked && inRow !== null) {
      border = `2px solid ${correctRow ? '#34D399' : '#F43F5E'}`
    } else if (isSelected) {
      border = '2px solid #FBBF24'
    }

    return (
      <button key={flag.code}
        onClick={() => inRow !== null ? handleUnassign(flag.code) : handleFlagTap(flag.code)}
        className="flex flex-col items-center rounded-xl overflow-hidden transition-all active:scale-95"
        style={{ border, background: isSelected ? '#FBBF2418' : '#1A1033', width: FLAG_W }}>
        <img src={flag.flagUrl} alt={flag.name}
          style={{ width: FLAG_W, height: FLAG_H, objectFit: 'cover', display: 'block' }} />
        <div style={{ padding: '2px 4px', textAlign: 'center', width: '100%' }}>
          <span style={{ fontSize: 9, color: '#B8A9E0', fontWeight: 600, display: 'block',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {flag.name}
          </span>
          {checked && inRow !== null && (
            <span style={{ fontSize: 10 }}>{correctRow ? '✓' : '✗'}</span>
          )}
        </div>
      </button>
    )
  }

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>

      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Flag Families</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>Round {idx + 1} / {rounds.length}</div>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: rounds.length }).map((_, i) => (
            <div key={i} style={{
              width: 7, height: 7, borderRadius: '50%',
              background: i < scores.length ? (scores[i] ? '#34D399' : '#F43F5E') : '#8B6CFF33',
            }} />
          ))}
        </div>
      </header>

      <div className="mx-5 h-1.5 rounded-full overflow-hidden mb-4" style={{ background: "#2D1F52" }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(idx / rounds.length) * 100}%`, background: "linear-gradient(90deg,#8B6CFF,#A78BFA)" }} />
      </div>

      <div className="flex flex-col items-center px-5 gap-4">

        {/* Instruction */}
        <p className="text-xs text-center" style={{ color: '#B8A9E0' }}>
          {selected
            ? `"${round.flags.find(f => f.flag.code === selected)?.flag.name}" — tap a row to place it`
            : 'Tap a flag, then tap a row to sort it'}
        </p>

        {/* Row A */}
        <button
          onClick={() => handleRowTap('A')}
          disabled={!selected || checked}
          className="w-full max-w-sm rounded-xl transition-all"
          style={{
            background: selected && !checked ? `${ACCENT_A}18` : '#2D1F5218',
            border: `2px solid ${selected && !checked ? ACCENT_A : ACCENT_A + '44'}`,
            minHeight: 80, padding: '8px 10px',
            cursor: selected && !checked ? 'pointer' : 'default',
          }}>
          <div className="flex items-center gap-2 mb-2">
            <span style={{ fontSize: 18 }}>{round.familyA.emoji}</span>
            <span className="text-sm font-bold" style={{ color: '#F5F3FF' }}>{round.familyA.label}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {flagsInA.map(item => renderFlag(item, 'A'))}
            {flagsInA.length === 0 && (
              <span style={{ fontSize: 11, color: ACCENT_A + '66', paddingLeft: 2 }}>drop here</span>
            )}
          </div>
        </button>

        {/* Row B */}
        <button
          onClick={() => handleRowTap('B')}
          disabled={!selected || checked}
          className="w-full max-w-sm rounded-xl transition-all"
          style={{
            background: selected && !checked ? `${ACCENT_B}18` : '#2D1F5218',
            border: `2px solid ${selected && !checked ? ACCENT_B : ACCENT_B + '44'}`,
            minHeight: 80, padding: '8px 10px',
            cursor: selected && !checked ? 'pointer' : 'default',
          }}>
          <div className="flex items-center gap-2 mb-2">
            <span style={{ fontSize: 18 }}>{round.familyB.emoji}</span>
            <span className="text-sm font-bold" style={{ color: '#F5F3FF' }}>{round.familyB.label}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {flagsInB.map(item => renderFlag(item, 'B'))}
            {flagsInB.length === 0 && (
              <span style={{ fontSize: 11, color: ACCENT_B + '66', paddingLeft: 2 }}>drop here</span>
            )}
          </div>
        </button>

        {/* Unassigned pool */}
        {unassigned.length > 0 && (
          <div className="w-full max-w-sm">
            <div className="text-xs mb-2 font-semibold" style={{ color: '#B8A9E0' }}>Unsorted flags:</div>
            <div className="flex flex-wrap gap-3">
              {unassigned.map(item => renderFlag(item, null))}
            </div>
          </div>
        )}

        {/* Result feedback */}
        {checked && (
          <div className="w-full max-w-sm px-4 py-3 rounded-xl"
            style={{ background: '#2D1F52', border: `1px solid ${roundScore ? '#34D39944' : '#F43F5E44'}` }}>
            {roundScore
              ? <p className="text-sm font-semibold" style={{ color: '#34D399' }}>✓ All flags sorted correctly!</p>
              : <p className="text-sm font-semibold" style={{ color: '#F43F5E' }}>✗ Some were wrong — see corrections above</p>}
          </div>
        )}

        {!checked ? (
          <button onClick={handleCheck} disabled={!allAssigned}
            className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{
              background: allAssigned ? "linear-gradient(135deg,#8B6CFF,#A78BFA)" : "#2D1F52",
              color: allAssigned ? "#fff" : "#8B6CFF44",
              border: allAssigned ? 'none' : '1px solid #8B6CFF22',
            }}>
            Check →
          </button>
        ) : (
          <button onClick={handleNext}
            className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
            {idx + 1 >= rounds.length ? "See Results →" : "Next Round →"}
          </button>
        )}
      </div>
    </div>
  )
}
