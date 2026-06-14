import { useState } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"
import { T, ACCENT, FONT, tint } from "../ui/tokens"
import { ScreenHeader } from "./ui"
import { Tags, ThumbsUp, BookOpen } from "lucide-react"

interface Props { onBack: () => void }

interface Family {
  id: string
  label: string
  emoji: string
  codes: string[]
}

const FAMILY_DEFS: Family[] = [
  { id: 'nordic',     label: 'Nordic Cross',        emoji: '✚',  codes: ['DK','NO','SE','FI','IS'] },
  { id: 'crescent',   label: 'Crescent & Star',      emoji: '☪️', codes: ['TR','PK','MY','TN','DZ','AZ','TM','MV','UZ'] },
  { id: 'v-tricolor', label: 'Vertical Tricolor',    emoji: '🎨', codes: ['FR','IT','IE','BE','RO','NG','ML','SN','CI','GN','CM'] },
  { id: 'h-tricolor', label: 'Horizontal Tricolor',  emoji: '═',  codes: ['DE','NL','RU','HU','AT','BG','LT','EE','LV','AM'] },
  { id: 'pan-african',label: 'Pan-African Colors',   emoji: '🌍', codes: ['ET','GH','SN','ML','GN','CI','KE','ZM','TZ'] },
  { id: 'uk-ensign',  label: 'Union Jack Family',    emoji: '🇬🇧', codes: ['AU','NZ','FJ','NR','CK','TV'] },
  { id: 'pan-arab',   label: 'Pan-Arab Colors',      emoji: '🟥', codes: ['EG','IQ','SY','YE','JO','KW','AE','LY','PS'] },
  { id: 'disc',       label: 'Disc / Sun Center',    emoji: '🔴', codes: ['JP','BD','LA','PW'] },
  { id: 'hoist-tri',  label: 'Hoist Triangle',       emoji: '◢',  codes: ['CZ','PH','ER','DJ','BS','GY','MZ','ZA'] },
  // Harder "look closely at the emblem" families — two-headed vs single eagle is
  // a deliberate near-pair, and a centered cross contrasts with the Nordic cross.
  { id: 'eagle2',     label: 'Double-Headed Eagle',  emoji: '🦅', codes: ['AL','ME','RS'] },
  { id: 'eagle1',     label: 'Single Eagle',         emoji: '🦅', codes: ['EG','MX','ZM','KZ','MD'] },
  { id: 'cross-mid',  label: 'Centered Cross',       emoji: '✝️', codes: ['CH','GE','TO','DO','GR'] },
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
    // Exclude any code that belongs to BOTH families, so a flag is never
    // ambiguous within a round.
    const flagsA = FLAGS.filter(f => famA.codes.includes(f.code) && !famB.codes.includes(f.code)).sort(() => Math.random() - 0.5).slice(0, 3)
    const flagsB = FLAGS.filter(f => famB.codes.includes(f.code) && !famA.codes.includes(f.code)).sort(() => Math.random() - 0.5).slice(0, 3)
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
const ACCENT_A = ACCENT.play
const ACCENT_B = T.green

const FLAG_W = 72
const FLAG_H = 48

function FlagFamiliesScreenGame({ onBack , onReplay }: Props & { onReplay: () => void }) {
  const [rounds]    = useState(() => buildRounds(TOTAL_ROUNDS))
  const [idx, setIdx]       = useState(0)
  // assignments: code → 'A' | 'B'
  const [assignments, setAssignments] = useState<Record<string, 'A' | 'B'>>({})
  const [selected, setSelected]       = useState<string | null>(null)
  const [dragged, setDragged]         = useState<string | null>(null)
  const [checked, setChecked]         = useState(false)
  const [revealSwap, setRevealSwap]   = useState(false)   // player's A actually = familyB
  const [hadWrong, setHadWrong]       = useState(false)   // any wrong attempt this round?
  const [tryAgain, setTryAgain]       = useState(false)   // show "try again" hint
  const [scores, setScores]           = useState<boolean[]>([])
  const [done, setDone]               = useState(false)

  const round = rounds[idx]

  // Tap a flag in the pool: select it; tap again to deselect
  const handleFlagTap = (code: string) => {
    if (checked) return
    setSelected(prev => prev === code ? null : code)
  }

  const assign = (code: string, row: 'A' | 'B') => {
    setAssignments(prev => ({ ...prev, [code]: row }))
    setSelected(null); setTryAgain(false)
  }

  // Tap a row (A or B) to assign the selected flag
  const handleRowTap = (row: 'A' | 'B') => {
    if (checked || !selected) return
    assign(selected, row)
  }

  // Tap a flag already in a row to move it back to pool
  const handleUnassign = (code: string) => {
    if (checked) return
    setAssignments(prev => {
      const next = { ...prev }
      delete next[code]
      return next
    })
    setSelected(null); setTryAgain(false)
  }

  const allAssigned = round?.flags.every(f => !!assignments[f.flag.code])

  const handleCheck = () => {
    if (!allAssigned) return
    // The groups are SECRET, so all that matters is the partition: every flag of
    // one family together, every flag of the other together. Either direction
    // (A=familyA or A=familyB) counts as correct.
    const direct  = round.flags.every(f => assignments[f.flag.code] === f.family)
    const swapped = round.flags.every(f => assignments[f.flag.code] !== f.family)
    if (!direct && !swapped) {
      // Don't lock — let them keep re-sorting. First wrong attempt costs the
      // "first try" point but they can still get it green.
      setHadWrong(true); setTryAgain(true); setSelected(null)
      return
    }
    setRevealSwap(swapped && !direct)   // their A maps to familyB
    setScores(prev => [...prev, !hadWrong])
    setChecked(true); setSelected(null); setTryAgain(false)
  }

  const handleNext = () => {
    if (idx + 1 >= rounds.length) { setDone(true); return }
    setIdx(i => i + 1)
    setAssignments({})
    setSelected(null); setDragged(null)
    setChecked(false); setRevealSwap(false); setHadWrong(false); setTryAgain(false)
  }

  // ── Result ──────────────────────────────────────────────────────────────────
  if (done || rounds.length === 0) {
    const correct = scores.filter(Boolean).length
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: T.bg, minHeight: "100vh", color: T.text }}>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl p-6 text-center mb-4"
            style={{ background: T.surface, border: `1px solid ${T.line}`, boxShadow: `0 12px 32px -14px ${tint(T.text, 0.45)}` }}>
            <div className="mb-3 flex justify-center" style={{ color: correct === scores.length ? T.gold : correct >= 2 ? T.green : ACCENT_A }}>
              {correct === scores.length
                ? <Tags size={44} strokeWidth={1.6} absoluteStrokeWidth />
                : correct >= 2
                  ? <ThumbsUp size={44} strokeWidth={1.6} absoluteStrokeWidth />
                  : <BookOpen size={44} strokeWidth={1.6} absoluteStrokeWidth />}
            </div>
            <div className="text-6xl font-black mb-1" style={{ color: T.text, fontFamily: FONT.mono, fontVariantNumeric: "tabular-nums" }}>{correct}/{scores.length}</div>
            <div className="text-sm mb-3" style={{ color: T.muted }}>rounds sorted correctly</div>
            <div className="flex justify-center gap-2">
              {scores.map((ok, i) => <span key={i} style={{ width: 16, height: 16, borderRadius: 4, display: 'inline-block', background: ok ? T.green : T.danger }} />)}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={onReplay}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: ACCENT_A, color: T.onAccent, fontFamily: FONT.display }}>
              Play Again
            </button>
            <button onClick={onBack}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: T.surface, border: `1px solid ${T.line}`, color: T.muted }}>
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
    // Once checked we know it's a valid partition; honour the swap direction.
    const correctRow = inRow !== null ? (revealSwap ? inRow !== family : inRow === family) : null
    let border = `1.5px solid ${T.line}`
    if (checked && inRow !== null) {
      border = `2px solid ${correctRow ? T.green : T.danger}`
    } else if (isSelected) {
      border = `2px solid ${T.gold}`
    }

    return (
      <button key={flag.code}
        draggable={!checked}
        onDragStart={() => setDragged(flag.code)}
        onDragEnd={() => setDragged(null)}
        onClick={() => inRow !== null ? handleUnassign(flag.code) : handleFlagTap(flag.code)}
        className="flex flex-col items-center rounded-xl overflow-hidden transition-all active:scale-95"
        style={{ border, background: isSelected ? tint(T.gold, 0.15) : T.surface, width: FLAG_W, cursor: checked ? 'default' : 'grab' }}>
        <img src={flag.flagUrl} alt={flag.name}
          style={{ width: FLAG_W, height: FLAG_H, objectFit: 'cover', display: 'block' }} />
        <div style={{ padding: '2px 4px', textAlign: 'center', width: '100%' }}>
          <span style={{ fontSize: 9, color: T.muted, fontWeight: 600, display: 'block',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {flag.name}
          </span>
          {checked && inRow !== null && (
            <span style={{ fontSize: 10, color: correctRow ? T.green : T.danger }}>{correctRow ? '✓' : '✗'}</span>
          )}
        </div>
      </button>
    )
  }

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: T.bg, minHeight: "100vh", color: T.text }}>

      <ScreenHeader title="Flag Families" subtitle={`Round ${idx + 1} / ${rounds.length}`} onBack={onBack}
        right={
          <div className="flex gap-1.5">
            {Array.from({ length: rounds.length }).map((_, i) => (
              <div key={i} style={{
                width: 7, height: 7, borderRadius: '50%',
                background: i < scores.length ? (scores[i] ? T.green : T.danger) : T.line,
              }} />
            ))}
          </div>
        } />

      <div className="mx-5 h-1.5 rounded-full overflow-hidden mb-4" style={{ background: T.line }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(idx / rounds.length) * 100}%`, background: ACCENT_A }} />
      </div>

      <div className="flex flex-col items-center px-5 gap-4">

        {/* Instruction — categories stay secret; sort by the visual pattern */}
        <p className="text-xs text-center" style={{ color: T.muted }}>
          {checked
            ? 'Revealed! Two hidden families:'
            : selected
              ? `"${round.flags.find(f => f.flag.code === selected)?.flag.name}" — tap a group to place it`
              : 'Two secret groups. Sort each flag by what it shares — tap or drag.'}
        </p>

        {/* Row A */}
        <button
          onClick={() => handleRowTap('A')}
          disabled={(!selected && !dragged) || checked}
          onDragOver={e => { if (!checked) e.preventDefault() }}
          onDrop={() => { if (dragged && !checked) { assign(dragged, 'A'); setDragged(null) } }}
          className="w-full max-w-sm rounded-xl transition-all"
          style={{
            background: (selected || dragged) && !checked ? tint(ACCENT_A, 0.12) : T.surface,
            border: `2px solid ${(selected || dragged) && !checked ? ACCENT_A : tint(ACCENT_A, 0.3)}`,
            minHeight: 80, padding: '8px 10px',
            cursor: selected && !checked ? 'pointer' : 'default',
          }}>
          <div className="flex items-center gap-2 mb-2">
            {checked
              ? <span style={{ fontSize: 18 }}>{(revealSwap ? round.familyB : round.familyA).emoji}</span>
              : <span style={{ width: 22, height: 22, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: tint(ACCENT_A, 0.15), color: ACCENT_A, fontSize: 11, fontWeight: 800 }}>A</span>}
            <span className="text-sm font-bold" style={{ color: checked ? T.text : ACCENT_A, fontFamily: FONT.display }}>{checked ? (revealSwap ? round.familyB : round.familyA).label : 'Group A'}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {flagsInA.map(item => renderFlag(item, 'A'))}
            {flagsInA.length === 0 && (
              <span style={{ fontSize: 11, color: tint(ACCENT_A, 0.5), paddingLeft: 2 }}>drop here</span>
            )}
          </div>
        </button>

        {/* Row B */}
        <button
          onClick={() => handleRowTap('B')}
          disabled={(!selected && !dragged) || checked}
          onDragOver={e => { if (!checked) e.preventDefault() }}
          onDrop={() => { if (dragged && !checked) { assign(dragged, 'B'); setDragged(null) } }}
          className="w-full max-w-sm rounded-xl transition-all"
          style={{
            background: (selected || dragged) && !checked ? tint(ACCENT_B, 0.12) : T.surface,
            border: `2px solid ${(selected || dragged) && !checked ? ACCENT_B : tint(ACCENT_B, 0.3)}`,
            minHeight: 80, padding: '8px 10px',
            cursor: selected && !checked ? 'pointer' : 'default',
          }}>
          <div className="flex items-center gap-2 mb-2">
            {checked
              ? <span style={{ fontSize: 18 }}>{(revealSwap ? round.familyA : round.familyB).emoji}</span>
              : <span style={{ width: 22, height: 22, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: tint(ACCENT_B, 0.15), color: ACCENT_B, fontSize: 11, fontWeight: 800 }}>B</span>}
            <span className="text-sm font-bold" style={{ color: checked ? T.text : ACCENT_B, fontFamily: FONT.display }}>{checked ? (revealSwap ? round.familyA : round.familyB).label : 'Group B'}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {flagsInB.map(item => renderFlag(item, 'B'))}
            {flagsInB.length === 0 && (
              <span style={{ fontSize: 11, color: tint(ACCENT_B, 0.5), paddingLeft: 2 }}>drop here</span>
            )}
          </div>
        </button>

        {/* Unassigned pool */}
        {unassigned.length > 0 && (
          <div className="w-full max-w-sm"
            onDragOver={e => { if (!checked) e.preventDefault() }}
            onDrop={() => { if (dragged && !checked) { handleUnassign(dragged); setDragged(null) } }}>
            <div className="text-xs mb-2 font-semibold" style={{ color: T.muted }}>Unsorted flags:</div>
            <div className="flex flex-wrap gap-3">
              {unassigned.map(item => renderFlag(item, null))}
            </div>
          </div>
        )}

        {/* "Try again" hint after a wrong check (round stays editable) */}
        {tryAgain && !checked && (
          <div className="w-full max-w-sm px-4 py-3 rounded-xl"
            style={{ background: T.surface, border: `1px solid ${tint(T.danger, 0.35)}` }}>
            <p className="text-sm font-semibold" style={{ color: T.danger }}>✗ Not quite — those aren't the groups. Try again.</p>
          </div>
        )}

        {/* Result feedback */}
        {checked && (
          <div className="w-full max-w-sm px-4 py-3 rounded-xl"
            style={{ background: T.surface, border: `1px solid ${tint(roundScore ? T.green : T.gold, 0.35)}` }}>
            {roundScore
              ? <p className="text-sm font-semibold" style={{ color: T.green }}>✓ Yes — these are the categories! Nailed it first try.</p>
              : <p className="text-sm font-semibold" style={{ color: T.gold }}>✓ Right groups — got there after a retry.</p>}
          </div>
        )}

        {!checked ? (
          <button onClick={handleCheck} disabled={!allAssigned}
            className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{
              background: allAssigned ? ACCENT_A : T.surface,
              color: allAssigned ? T.onAccent : T.dim,
              border: allAssigned ? 'none' : `1px solid ${T.line}`,
              fontFamily: FONT.display,
            }}>
            Check →
          </button>
        ) : (
          <button onClick={handleNext}
            className="w-full max-w-sm py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{ background: ACCENT_A, color: T.onAccent, fontFamily: FONT.display }}>
            {idx + 1 >= rounds.length ? "See Results →" : "Next Round →"}
          </button>
        )}
      </div>
    </div>
  )
}

export default function FlagFamiliesScreen({ onBack }: Props) {
  const [replayKey, setReplayKey] = useState(0)
  return <FlagFamiliesScreenGame key={replayKey} onBack={onBack} onReplay={() => setReplayKey(k => k + 1)} />
}
