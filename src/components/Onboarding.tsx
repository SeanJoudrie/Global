import { useState } from "react"
import { T, ACCENT, tint, FONT } from "../ui/tokens"

export const ONBOARDED_KEY = "globalio_onboarded"

export function hasOnboarded(): boolean {
  try { return localStorage.getItem(ONBOARDED_KEY) === "1" } catch { return true }
}
function markOnboarded() {
  try { localStorage.setItem(ONBOARDED_KEY, "1") } catch { /* ignore */ }
}

const SLIDES = [
  { emoji: "🌍", title: "Welcome to Globalio", body: "Learn every flag in the world through 50+ quick games — and a flag codex that doubles as a real reference tool." },
  { emoji: "🔥", title: "A new challenge daily", body: "Daily quizzes and Flagle-style puzzles. Build a streak, beat your best, and share your score with one tap." },
  { emoji: "📖", title: "Explore the Codex", body: "Search 4,500+ flags — countries, historical states, regions, peoples and more. Tap any flag to learn its story." },
]

// Lightweight first-run intro. Rendered above the app on first launch; skippable
// instantly, and dismissing (Skip or Start) sets the onboarded flag for good.
export default function Onboarding({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0)
  const last = i === SLIDES.length - 1
  const finish = () => { markOnboarded(); onDone() }
  const next = () => { if (last) finish(); else setI(i + 1) }
  const s = SLIDES[i]

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 3000, background: tint(T.bg, 0.97),
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 0 }}>
        <button onClick={finish} aria-label="Skip"
          style={{ position: "absolute", top: 16, right: 18, background: "transparent", border: "none", color: T.muted, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          Skip
        </button>

        <div style={{ fontSize: 64, lineHeight: 1, marginBottom: 22 }}>{s.emoji}</div>
        <h1 className="geo-display" style={{ color: T.text, fontWeight: 800, fontSize: 26, margin: 0, marginBottom: 12, fontFamily: FONT.display }}>{s.title}</h1>
        <p style={{ color: T.muted, fontSize: 15, lineHeight: 1.55, margin: 0, marginBottom: 28 }}>{s.body}</p>

        {/* progress dots */}
        <div style={{ display: "flex", gap: 7, marginBottom: 26 }}>
          {SLIDES.map((_, k) => (
            <span key={k} style={{ width: k === i ? 22 : 8, height: 8, borderRadius: 999,
              background: k === i ? ACCENT.codex : tint(T.muted, 0.4), transition: "width 0.2s ease" }} />
          ))}
        </div>

        <button onClick={next}
          className="active:scale-95"
          style={{ width: "100%", padding: "14px", borderRadius: 14, border: "none", cursor: "pointer",
            background: ACCENT.codex, color: T.onAccent, fontWeight: 800, fontSize: 15, transition: "transform 0.1s ease" }}>
          {last ? "Start playing" : "Next"}
        </button>
      </div>
    </div>
  )
}
