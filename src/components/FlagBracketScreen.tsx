import { useState } from "react"
import { FLAGS, REGIONS, getFlagsByRegion } from "../data/flags"
import type { FlagRecord, Region } from "../data/flags"

interface Props { onBack: () => void }

type Scope = "World" | Region
const SCOPES: Scope[] = ["World", ...REGIONS]

// Largest power of two ≤ n, capped at 16.
function fieldSize(n: number): number {
  let s = 2
  while (s * 2 <= n && s < 16) s *= 2
  return s
}

interface Match { a: FlagRecord; b: FlagRecord; winnerCode: string; roundSize: number }

const shuffle = <X,>(a: X[]): X[] => [...a].sort(() => Math.random() - 0.5)
const roundName = (n: number) =>
  n === 16 ? "Round of 16" : n === 8 ? "Quarter-finals" : n === 4 ? "Semi-finals" : n === 2 ? "Final" : "Round"

function FlagChoice({ flag, onPick }: { flag: FlagRecord; onPick: (f: FlagRecord) => void }) {
  return (
    <button onClick={() => onPick(flag)}
      className="w-full max-w-sm rounded-2xl overflow-hidden transition-all active:scale-95 hover:brightness-110"
      style={{ border: "2px solid #8B6CFF33", background: "#2D1F52" }}>
      <img src={flag.flagUrl} alt={flag.name}
        style={{ width: "100%", height: 150, objectFit: "cover", display: "block" }}
        onError={e => { (e.target as HTMLImageElement).style.opacity = "0.2" }} />
      <div className="py-3 font-bold text-lg" style={{ color: "#F5F3FF" }}>{flag.name}</div>
    </button>
  )
}

function MiniFlag({ src, dim }: { src: string; dim?: boolean }) {
  return (
    <img src={src} alt="" style={{ width: 34, height: 22, objectFit: "cover", borderRadius: 3, opacity: dim ? 0.3 : 1, border: "1px solid #8B6CFF33" }}
      onError={e => { (e.target as HTMLImageElement).style.opacity = "0.2" }} />
  )
}

function BracketGame({ onBack, onReplay }: Props & { onReplay: () => void }) {
  const [scope, setScope] = useState<Scope | null>(null)
  const [field, setField] = useState<FlagRecord[]>([])
  const [pair, setPair] = useState(0)
  const [winners, setWinners] = useState<FlagRecord[]>([])
  const [champion, setChampion] = useState<FlagRecord | null>(null)
  const [history, setHistory] = useState<Match[]>([])

  const start = (s: Scope) => {
    const pool = s === "World" ? FLAGS : getFlagsByRegion(s)
    const size = fieldSize(pool.length)
    setScope(s)
    setField(shuffle(pool).slice(0, size))
    setPair(0); setWinners([]); setChampion(null); setHistory([])
  }

  // ── scope picker ──
  if (!scope) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <header className="flex items-center justify-between px-5 pt-8 pb-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl" style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Flag Bracket</div>
          <div style={{ width: 36 }} />
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5">
          <div className="text-5xl">🏆</div>
          <p className="text-base font-bold text-center" style={{ color: "#F5F3FF" }}>Crown the coolest flag</p>
          <p className="text-xs text-center" style={{ color: "#B8A9E0", maxWidth: 280 }}>Pick a pool — a fresh random bracket is drawn every run.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%", maxWidth: 340 }}>
            {SCOPES.map(s => (
              <button key={s} onClick={() => start(s)}
                className="py-3.5 px-3 rounded-xl font-bold text-sm transition-all active:scale-95"
                style={{ background: s === "World" ? "linear-gradient(135deg,#8B6CFF,#A78BFA)" : "#2D1F52", border: s === "World" ? "none" : "1px solid #8B6CFF44", color: s === "World" ? "#fff" : "#F5F3FF", gridColumn: s === "World" ? "1 / -1" : undefined }}>
                {s === "World" ? "🌍 Random (World)" : s}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const pick = (f: FlagRecord) => {
    const a = field[pair * 2], b = field[pair * 2 + 1]
    setHistory(h => [...h, { a, b, winnerCode: f.code, roundSize: field.length }])
    const nextWinners = [...winners, f]
    if (pair + 1 < field.length / 2) {
      setWinners(nextWinners); setPair(pair + 1)
    } else {
      if (nextWinners.length === 1) { setChampion(nextWinners[0]); return }
      setField(nextWinners); setWinners([]); setPair(0)
    }
  }

  // ── champion + bracket recap ──
  if (champion) {
    const rounds = Array.from(new Set(history.map(m => m.roundSize))).sort((a, b) => b - a)
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <header className="flex items-center justify-between px-5 pt-8 pb-3">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl" style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Your Champion</div>
          <div style={{ width: 36 }} />
        </header>
        <div className="flex-1 overflow-y-auto px-5 pb-6">
          <div className="w-full max-w-sm mx-auto text-center">
            <div className="rounded-2xl p-6 mb-4" style={{ background: "#2D1F52", border: "1px solid #FBBF2455", boxShadow: "0 0 40px #FBBF2433" }}>
              <div className="text-4xl mb-2">👑</div>
              <img src={champion.flagUrl} alt={champion.name}
                style={{ width: 200, height: 133, objectFit: "cover", borderRadius: 12, margin: "0 auto 10px", border: "2px solid #FBBF24" }} />
              <div className="text-2xl font-black" style={{ color: "#F5F3FF" }}>{champion.name}</div>
              <div className="text-xs mt-1" style={{ color: "#B8A9E0" }}>your coolest flag — {scope}</div>
            </div>

            {/* Bracket recap */}
            <div className="rounded-2xl p-4 mb-4 text-left" style={{ background: "#1A1033", border: "1px solid #8B6CFF22" }}>
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#B8A9E0" }}>The Bracket</div>
              {rounds.map(rs => (
                <div key={rs} style={{ marginBottom: 12 }}>
                  <div className="text-xs font-bold mb-1.5" style={{ color: "#8B6CFF" }}>{roundName(rs)}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {history.filter(m => m.roundSize === rs).map((m, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs" style={{ color: "#F5F3FF" }}>
                        <MiniFlag src={m.a.flagUrl} dim={m.winnerCode !== m.a.code} />
                        <span style={{ flex: 1, opacity: m.winnerCode === m.a.code ? 1 : 0.4, fontWeight: m.winnerCode === m.a.code ? 700 : 400 }}>{m.a.name}</span>
                        <span style={{ color: "#8B6CFF66" }}>vs</span>
                        <span style={{ flex: 1, textAlign: "right", opacity: m.winnerCode === m.b.code ? 1 : 0.4, fontWeight: m.winnerCode === m.b.code ? 700 : 400 }}>{m.b.name}</span>
                        <MiniFlag src={m.b.flagUrl} dim={m.winnerCode !== m.b.code} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button onClick={onReplay}
                className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>New Bracket</button>
              <button onClick={onBack}
                className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
                style={{ background: "#2D1F52", border: "1px solid #8B6CFF33", color: "#B8A9E0" }}>← Home</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const a = field[pair * 2], b = field[pair * 2 + 1]
  const totalPairs = field.length / 2

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Flag Bracket · {scope}</div>
          <div className="text-sm font-bold" style={{ color: "#F5F3FF" }}>{roundName(field.length)} · {pair + 1}/{totalPairs}</div>
        </div>
        <div style={{ width: 36 }} />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-5 gap-4">
        <p className="text-sm font-semibold" style={{ color: "#B8A9E0" }}>Which flag is cooler?</p>
        <FlagChoice flag={a} onPick={pick} />
        <div className="text-sm font-black" style={{ color: "#8B6CFF" }}>VS</div>
        <FlagChoice flag={b} onPick={pick} />
      </div>
    </div>
  )
}

export default function FlagBracketScreen({ onBack }: Props) {
  const [k, setK] = useState(0)
  return <BracketGame key={k} onBack={onBack} onReplay={() => setK(n => n + 1)} />
}
