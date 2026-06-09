import { useState, useMemo } from "react"
import { FLAGS } from "../data/flags"
import type { FlagRecord } from "../data/flags"

interface Props { onBack: () => void }

// How zoomed-in we start and how we open up with each wrong guess.
// scale=5 means the image is 5× its natural size (you see ~20% of the flag).
const SCALES = [5, 3.5, 2.5, 1.75, 1.2, 1]
// At the final scale (1) the full flag is shown — that's after 5 wrong guesses.

function pickChoices(target: FlagRecord): FlagRecord[] {
  const sameRegion = FLAGS.filter(f => f.code !== target.code && f.region === target.region)
  const shuffled   = [...sameRegion].sort(() => Math.random() - 0.5)
  // Prefer same-region distractors; pad with any flag if not enough
  const distractors = shuffled.slice(0, 3)
  if (distractors.length < 3) {
    const extra = FLAGS
      .filter(f => f.code !== target.code && !distractors.some(d => d.code === f.code))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3 - distractors.length)
    distractors.push(...extra)
  }
  return [target, ...distractors].sort(() => Math.random() - 0.5)
}

export default function TheCropScreen({ onBack }: Props) {
  // Pick a random target flag (different each mount)
  const [target]  = useState<FlagRecord>(() => FLAGS[Math.floor(Math.random() * FLAGS.length)])
  // Random focus point (where in the flag we're looking), normalised 0–1
  const [focusX]  = useState(() => 0.2 + Math.random() * 0.6)   // avoid extreme edges
  const [focusY]  = useState(() => 0.2 + Math.random() * 0.6)

  const [wrongGuesses, setWrongGuesses] = useState(0)
  const [chosen, setChosen]             = useState<string | null>(null)
  const [phase, setPhase]               = useState<"playing" | "result">("playing")

  const choices = useMemo(() => pickChoices(target), [target])

  const scaleIdx  = Math.min(wrongGuesses, SCALES.length - 1)
  const scale     = SCALES[scaleIdx]
  const guessesLeft = SCALES.length - 1 - wrongGuesses   // how many wrong guesses remain

  // Container dimensions (fixed)
  const CW = 280, CH = 175

  const handleGuess = (flag: FlagRecord) => {
    if (phase !== "playing") return
    setChosen(flag.code)
    if (flag.code === target.code) {
      setPhase("result")
      return
    }
    // Wrong
    const next = wrongGuesses + 1
    setWrongGuesses(next)
    if (next >= SCALES.length - 1) {
      // Used all guesses — show full flag, then result
      setTimeout(() => setPhase("result"), 900)
    }
    // Reset chosen after a moment so they can guess again
    setTimeout(() => setChosen(null), 700)
  }

  const isCorrect = chosen === target.code && phase === "result"
  const solved = phase === "result" && isCorrect

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)" }}>

      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-8 pb-4" style={{ zIndex: 1 }}>
        <button onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: "#2D1F52", color: "#B8A9E0" }}>&#8249;</button>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B8A9E0" }}>
            The Crop
          </div>
          <div className="text-xs" style={{ color: "#8B6CFF" }}>
            {phase === "playing"
              ? `${guessesLeft} reveal${guessesLeft !== 1 ? "s" : ""} left`
              : solved ? "Solved!" : "Better luck next time"}
          </div>
        </div>
        {/* wrong guess pips */}
        <div className="flex gap-1.5 items-center">
          {Array.from({ length: SCALES.length - 1 }).map((_, i) => (
            <div key={i} style={{
              width: 7, height: 7, borderRadius: "50%",
              background: i < wrongGuesses ? "#F43F5E" : "#8B6CFF33",
            }} />
          ))}
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center px-5 pt-2" style={{ zIndex: 1 }}>

        {/* Cropped flag viewport */}
        <div style={{
          width: CW, height: CH,
          overflow: "hidden",
          position: "relative",
          borderRadius: 14,
          border: phase === "result"
            ? `2px solid ${solved ? "#34D399" : "#F43F5E"}`
            : "2px solid #8B6CFF44",
          boxShadow: "0 0 32px #8B6CFF22",
          transition: "border-color 0.3s",
        }}>
          <img
            src={target.flagUrl}
            alt="flag"
            style={{
              position: "absolute",
              width:  320 * scale,
              height: 213 * scale,
              left:   CW / 2 - focusX * 320 * scale,
              top:    CH / 2 - focusY * 213 * scale,
              transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
              imageRendering: scale > 2 ? "pixelated" : "auto",
            }}
          />
        </div>

        {/* Zoom level indicator */}
        <div className="flex items-center gap-2 mt-3 mb-5">
          <span style={{ fontSize: 11, color: "#8B6CFF88" }}>zoom</span>
          {SCALES.map((_s, i) => (
            <div key={i} style={{
              width: 18, height: 4, borderRadius: 2,
              background: i === scaleIdx ? "#8B6CFF" : "#8B6CFF22",
              transition: "background 0.3s",
            }} />
          ))}
        </div>

        {/* Answer or result */}
        {phase === "result" ? (
          <div className="w-full max-w-sm mb-5">
            <div className="rounded-xl p-4 text-center"
              style={{
                background: "#2D1F52",
                border: `1px solid ${solved ? "#34D39944" : "#F43F5E44"}`,
              }}>
              <div className="text-2xl mb-1">{solved ? "🎯" : "😬"}</div>
              <div className="font-bold text-lg" style={{ color: "#F5F3FF" }}>{target.name}</div>
              <div className="text-xs mt-1" style={{ color: "#B8A9E0" }}>
                {solved
                  ? `Identified in ${wrongGuesses + 1} guess${wrongGuesses + 1 !== 1 ? "es" : ""}!`
                  : "The flag was revealed — better luck next time."}
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <button onClick={() => window.location.reload()}
                className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff" }}>
                New Flag
              </button>
              <button onClick={onBack}
                className="w-full py-3.5 rounded-xl font-bold transition-all active:scale-95"
                style={{ background: "#2D1F52", border: "1px solid #8B6CFF33", color: "#B8A9E0" }}>
                ← Home
              </button>
            </div>
          </div>
        ) : (
          /* Multiple choice buttons */
          <div className="w-full max-w-sm grid grid-cols-2 gap-3">
            {choices.map(flag => {
              const isChosen = chosen === flag.code
              const isWrong  = isChosen && flag.code !== target.code
              return (
                <button key={flag.code}
                  onClick={() => handleGuess(flag)}
                  disabled={!!chosen}
                  className="py-3 px-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
                  style={{
                    background: isWrong ? "#F43F5E22"
                      : isChosen        ? "#34D39922"
                      : "#2D1F52",
                    border: isWrong ? "1.5px solid #F43F5E"
                      : isChosen    ? "1.5px solid #34D399"
                      : "1.5px solid #8B6CFF33",
                    color: isWrong ? "#F43F5E"
                      : isChosen   ? "#34D399"
                      : "#F5F3FF",
                  }}>
                  {flag.name}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
