import { useState, useMemo } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"
import { todayString, shuffleWithSeed } from "../utils/prng"

interface Props { onBack: () => void }

const SIZE = 16

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

export default function FlagBracketScreen({ onBack }: Props) {
  const today = todayString()
  const bracket = useMemo(() => shuffleWithSeed(FLAGS, "bracket-" + today).slice(0, SIZE), [today])

  // current round contestants
  const [field, setField] = useState<FlagRecord[]>(bracket)
  const [pair, setPair] = useState(0)               // index of current matchup within round
  const [winners, setWinners] = useState<FlagRecord[]>([])
  const [champion, setChampion] = useState<FlagRecord | null>(null)

  const roundName = (n: number) =>
    n === 16 ? "Round of 16" : n === 8 ? "Quarter-finals" : n === 4 ? "Semi-finals" : n === 2 ? "Final" : "Round"

  const pick = (f: FlagRecord) => {
    const nextWinners = [...winners, f]
    if (pair + 1 < field.length / 2) {
      setWinners(nextWinners); setPair(pair + 1)
    } else {
      // round complete
      if (nextWinners.length === 1) { setChampion(nextWinners[0]); return }
      setField(nextWinners); setWinners([]); setPair(0)
    }
  }

  if (champion) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
        <div className="w-full max-w-sm text-center">
          <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#B8A9E0" }}>Your Champion</div>
          <div className="rounded-2xl p-6 mb-4" style={{ background: "#2D1F52", border: "1px solid #FBBF2455", boxShadow: "0 0 40px #FBBF2433" }}>
            <div className="text-4xl mb-2">👑</div>
            <img src={champion.flagUrl} alt={champion.name}
              style={{ width: 200, height: 133, objectFit: "cover", borderRadius: 12, margin: "0 auto 10px", border: "2px solid #FBBF24" }} />
            <div className="text-2xl font-black" style={{ color: "#F5F3FF" }}>{champion.name}</div>
            <div className="text-xs mt-1" style={{ color: "#B8A9E0" }}>crowned coolest flag of the day</div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => window.location.reload()}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>Run It Again</button>
            <button onClick={onBack}
              className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
              style={{ background: "#2D1F52", border: "1px solid #8B6CFF33", color: "#B8A9E0" }}>← Home</button>
          </div>
        </div>
      </div>
    )
  }

  const a = field[pair * 2], b = field[pair * 2 + 1]
  const totalPairs = field.length / 2

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>Flag Bracket</div>
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
