import { useState } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"
import { FLAG_ATTRIBS } from "../data/flagAttribs"
import type { FlagAttribs } from "../data/flagAttribs"

const FEATURES = ['stripes', 'cross', 'star', 'crescent', 'emblem'] as const

// How visually similar `oddCode` is to the in-group of three flags. Higher =
// blends in better. We reward shared colours and matching the group's majority
// feature profile, and heavily penalise a distinctive "tell" the group lacks
// (e.g. a Nordic cross among Middle-Eastern flags), so the answer can't be
// spotted by look alone.
function visualScore(oddCode: string, three: FlagRecord[]): number {
  const oa = FLAG_ATTRIBS[oddCode]
  if (!oa) return -Infinity
  const inAttrs = three.map(t => FLAG_ATTRIBS[t.code]).filter(Boolean) as FlagAttribs[]
  if (inAttrs.length === 0) return 0
  let s = 0
  const colorFreq: Record<string, number> = {}
  inAttrs.forEach(a => a.colors.forEach(c => { colorFreq[c] = (colorFreq[c] || 0) + 1 }))
  oa.colors.forEach(c => { s += (colorFreq[c] || 0) * 1.5 })
  for (const f of FEATURES) {
    const inCount = inAttrs.filter(a => a[f]).length
    if (oa[f] && inCount === 0) s -= 3
    else if (oa[f] === (inCount >= 2)) s += 1
  }
  return s
}

function pickBlendingOutlier(three: FlagRecord[], outPool: FlagRecord[]): FlagRecord {
  const scored = outPool
    .map(f => ({ f, s: visualScore(f.code, three) }))
    .sort((a, b) => b.s - a.s)
  // Randomise among the top blending candidates so rounds still vary.
  const top = scored.slice(0, Math.min(4, scored.length))
  return (top[Math.floor(Math.random() * top.length)] ?? scored[0]).f
}

interface Props { onBack: () => void }

interface Round {
  question: string
  themeLabel: string
  flags: FlagRecord[]
  oddIndex: number
}

// ── Category definitions ─────────────────────────────────────────────────────

interface Category {
  id: string
  question: string    // "Which does NOT..."
  themeLabel: string  // "The other 3 are all..."
  codes: Set<string>
}

const ENGLISH_CODES = new Set(['GB','US','AU','NZ','CA','IE','ZA','NG','KE','GH','UG','ZM','ZW','JM','TT','BB','SG','IN','PK','MT','CY','PH','CM','ET'])
const LANDLOCKED    = new Set(['AT','CH','CZ','HU','SK','LI','LU','BY','MD','AM','KZ','KG','TJ','TM','UZ','MN','NP','BT','AF','ML','NE','BF','MR','CF','SS','BI','RW','UG','MW','ZM','ZW','BW','LS','SZ','BO','PY'])
const ISLANDS       = new Set(['GB','IE','IS','MT','CY','JP','PH','ID','LK','MV','SG','TL','CU','JM','HT','DO','TT','BB','LC','AG','DM','GD','KN','VC','BS','NZ','FJ','PG','SB','VU','WS','TO','KI','TV','NR','PW','FM','MH','MG','MU','SC','CV','ST','KM'])
const MONARCHIES    = new Set(['GB','SE','NO','DK','NL','BE','ES','LU','MC','LI','JP','TH','MY','BN','JO','SA','AE','KW','QA','BH','OM','MA','LS','SZ','AU','NZ','CA','JM','BB','TT'])
const EU_MEMBERS    = new Set(['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE'])
const MEDITERR      = new Set(['ES','FR','IT','HR','ME','AL','GR','TR','SY','LB','IL','EG','LY','TN','DZ','MA','MT','CY'])
const G20           = new Set(['AR','AU','BR','CA','CN','FR','DE','IN','ID','IT','JP','KR','MX','RU','SA','ZA','TR','GB','US'])
const NATO          = new Set(['AL','BE','BG','CA','HR','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IT','LV','LT','LU','ME','NL','MK','NO','PL','PT','RO','SK','SI','ES','TR','GB','US'])
const RED_FLAG      = new Set(['CN','VN','TR','BA','AL','GE','TN','PK','MY','MV','AZ','TM','UZ','SG','AF','OM','BH','QA','MR','MO','TW'])
const CRESCENT_STAR = new Set(['TR','PK','MY','TN','DZ','LY','MR','AZ','TM','UZ','KG','MV','SG','MS','SY','SD','DZ','TN','SO'])

function regionCat(region: FlagRecord['region'], label?: string): Category {
  const codes = new Set(FLAGS.filter(f => f.region === region).map(f => f.code))
  return {
    id: `region-${region}`,
    question: `Which flag is NOT from ${region}?`,
    themeLabel: `${label ?? region} flags`,
    codes,
  }
}

const CATEGORIES: Category[] = [
  { id: 'english',     question: 'Which country does NOT have English as an official language?', themeLabel: 'official English-speaking countries', codes: ENGLISH_CODES },
  { id: 'landlocked',  question: 'Which country is NOT landlocked?',                             themeLabel: 'landlocked countries (no sea access)', codes: LANDLOCKED    },
  { id: 'island',      question: 'Which country is NOT an island nation?',                       themeLabel: 'island nations',                        codes: ISLANDS       },
  { id: 'monarchy',    question: 'Which country is NOT a monarchy?',                             themeLabel: 'monarchies',                            codes: MONARCHIES    },
  { id: 'eu',          question: 'Which country is NOT in the EU?',                              themeLabel: 'EU member states',                      codes: EU_MEMBERS    },
  { id: 'mediterr',    question: 'Which country does NOT border the Mediterranean?',             themeLabel: 'Mediterranean countries',               codes: MEDITERR      },
  { id: 'g20',         question: 'Which country is NOT in the G20?',                             themeLabel: 'G20 nations',                           codes: G20           },
  { id: 'nato',        question: 'Which country is NOT a NATO member?',                          themeLabel: 'NATO members',                          codes: NATO          },
  { id: 'red',         question: 'Which flag does NOT prominently feature red?',                 themeLabel: 'flags with prominent red',              codes: RED_FLAG      },
  { id: 'crescent',    question: 'Which flag does NOT have a crescent or star symbol?',          themeLabel: 'crescent & star flags',                 codes: CRESCENT_STAR },
  regionCat('Europe'),
  regionCat('Africa'),
  regionCat('Asia'),
  regionCat('Americas'),
  regionCat('Oceania'),
  regionCat('Middle East', 'Middle Eastern'),
]

function buildRounds(count: number): Round[] {
  const rounds: Round[] = []
  const shuffledCats = [...CATEGORIES].sort(() => Math.random() - 0.5)

  for (const cat of shuffledCats) {
    if (rounds.length >= count) break

    const inPool  = FLAGS.filter(f => cat.codes.has(f.code))
    const outPool = FLAGS.filter(f => !cat.codes.has(f.code))
    if (inPool.length < 3 || outPool.length < 1) continue

    const three = [...inPool].sort(() => Math.random() - 0.5).slice(0, 3)
    // Make it HARD: choose an outlier that visually blends in with the in-group
    // (shared palette/symbols, no obvious tell), so you can't just spot the odd
    // flag — you have to actually know the fact.
    const odd   = pickBlendingOutlier(three, outPool)
    const all   = [...three, odd].sort(() => Math.random() - 0.5)

    rounds.push({
      question: cat.question,
      themeLabel: cat.themeLabel,
      flags: all,
      oddIndex: all.indexOf(odd),
    })
  }

  // Fallback to region-based if we ran out
  while (rounds.length < count) {
    const cat = CATEGORIES[CATEGORIES.length - 1]
    const inPool  = FLAGS.filter(f => cat.codes.has(f.code))
    const outPool = FLAGS.filter(f => !cat.codes.has(f.code))
    const three   = [...inPool].sort(() => Math.random() - 0.5).slice(0, 3)
    const odd     = pickBlendingOutlier(three, outPool)
    const all     = [...three, odd].sort(() => Math.random() - 0.5)
    rounds.push({ question: cat.question, themeLabel: cat.themeLabel, flags: all, oddIndex: all.indexOf(odd) })
  }

  return rounds
}

const TOTAL_ROUNDS = 5

function OddOneOutScreenGame({ onBack , onReplay }: Props & { onReplay: () => void }) {
  const [rounds]     = useState(() => buildRounds(TOTAL_ROUNDS))
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [scores, setScores]     = useState<boolean[]>([])
  const [done, setDone]         = useState(false)

  const round    = rounds[idx]
  const answered = selected !== null
  const isRight  = answered && selected === round.oddIndex

  const handlePick = (i: number) => {
    if (answered) return
    setSelected(i)
    setScores(prev => [...prev, i === round.oddIndex])
  }

  const handleNext = () => {
    if (idx + 1 >= TOTAL_ROUNDS) { setDone(true); return }
    setIdx(i => i + 1)
    setSelected(null)
  }

  // ── Result ─────────────────────────────────────────────────────────────────
  if (done) {
    const correct = scores.filter(Boolean).length
    const pct = Math.round((correct / TOTAL_ROUNDS) * 100)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm" style={{ position: "relative", zIndex: 1 }}>
          <div className="rounded-2xl p-6 text-center mb-4"
            style={{ background: "#2D1F52", border: "1px solid #8B6CFF44", boxShadow: "0 0 32px #8B6CFF22" }}>
            <div className="text-5xl mb-3">{pct === 100 ? "🏆" : pct >= 60 ? "👍" : "📚"}</div>
            <div className="text-6xl font-black mb-1" style={{ color: "#F5F3FF" }}>{correct}/{TOTAL_ROUNDS}</div>
            <div className="text-sm mb-4" style={{ color: "#B8A9E0" }}>
              {pct === 100 ? "Perfect round!" : pct >= 60 ? "Well played" : "Keep practising"}
            </div>
            <div className="flex justify-center gap-2">
              {scores.map((ok, i) => <span key={i} style={{ fontSize: 28 }}>{ok ? "🟩" : "🟥"}</span>)}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={onReplay}
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

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>

      <header className="flex items-center justify-between px-5 pt-8 pb-4" style={{ zIndex: 1 }}>
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Odd One Out</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>Round {idx + 1} / {TOTAL_ROUNDS}</div>
        </div>
        <div className="flex gap-1.5 items-center">
          {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: "50%",
              background: i < scores.length ? (scores[i] ? "#34D399" : "#F43F5E") : "#8B6CFF33",
            }} />
          ))}
        </div>
      </header>

      <div className="mx-5 h-1.5 rounded-full overflow-hidden" style={{ background: "#2D1F52", zIndex: 1 }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(idx / TOTAL_ROUNDS) * 100}%`, background: "linear-gradient(90deg,#8B6CFF,#A78BFA)" }} />
      </div>

      <div className="flex-1 flex flex-col items-center px-5 pt-5" style={{ zIndex: 1 }}>

        {/* Question */}
        <div className="w-full max-w-sm mb-4 px-4 py-3 rounded-xl"
          style={{ background: "#2D1F52", border: "1px solid #8B6CFF44" }}>
          <p className="text-sm font-semibold text-center" style={{ color: "#F5F3FF" }}>
            {round.question}
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {round.flags.map((flag, i) => {
            const isOdd    = i === round.oddIndex
            const isChosen = selected === i
            let border  = "1.5px solid #8B6CFF33"
            let overlay: string | null = null
            if (answered) {
              if (isOdd)         { border = "2px solid #34D399"; overlay = "#34D39915" }
              else if (isChosen) { border = "2px solid #F43F5E"; overlay = "#F43F5E15" }
            } else if (isChosen) {
              border = "2px solid #8B6CFF"
            }
            return (
              <button key={flag.code} onClick={() => handlePick(i)}
                disabled={answered}
                className="relative rounded-xl overflow-hidden transition-all active:scale-95"
                style={{ border, background: "#1A1033", aspectRatio: "3/2" }}>
                <img src={flag.flagUrl} alt={flag.name} className="w-full h-full object-cover"
                  onError={e => {
                    const el = e.target as HTMLImageElement
                    if (!el.dataset.fb) { el.dataset.fb = "1"; el.src = `https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/${flag.code.toLowerCase()}.svg` }
                  }} />
                {overlay && (
                  <div style={{ position: 'absolute', inset: 0, background: overlay,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 26 }}>{isOdd ? '✓' : '✗'}</span>
                  </div>
                )}
                {answered && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: '#12093066', padding: '2px 4px', textAlign: 'center',
                  }}>
                    <span style={{ fontSize: 10, color: '#F5F3FF', fontWeight: 600 }}>{flag.name}</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {answered && (
          <div className="w-full max-w-sm mt-3 px-4 py-3 rounded-xl"
            style={{ background: '#2D1F52', border: `1px solid ${isRight ? '#34D39944' : '#F43F5E44'}` }}>
            <p className="text-sm font-semibold" style={{ color: isRight ? '#34D399' : '#F43F5E' }}>
              {isRight ? "✓ Correct!" : `✗ Wrong — ${round.flags[round.oddIndex].name} was the odd one out`}
            </p>
            <p className="text-xs mt-1" style={{ color: '#B8A9E0' }}>
              The other three are all {round.themeLabel}.
            </p>
          </div>
        )}

        {answered && (
          <button onClick={handleNext}
            className="w-full max-w-sm mt-3 py-3.5 rounded-xl font-bold transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
            {idx + 1 >= TOTAL_ROUNDS ? "See Results →" : "Next →"}
          </button>
        )}
      </div>
    </div>
  )
}

export default function OddOneOutScreen({ onBack }: Props) {
  const [replayKey, setReplayKey] = useState(0)
  return <OddOneOutScreenGame key={replayKey} onBack={onBack} onReplay={() => setReplayKey(k => k + 1)} />
}
