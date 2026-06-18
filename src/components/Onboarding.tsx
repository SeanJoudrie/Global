import { useState } from "react"
import type { ReactNode, CSSProperties } from "react"
import { Compass, BookOpen } from "lucide-react"
import { T, ACCENT, tint, FONT } from "../ui/tokens"
import EarthLogo from "./EarthLogo"
import FlagImage from "./FlagImage"

export const ONBOARDED_KEY = "globalio_onboarded"

export function hasOnboarded(): boolean {
  try { return localStorage.getItem(ONBOARDED_KEY) === "1" } catch { return true }
}
function markOnboarded() {
  try { localStorage.setItem(ONBOARDED_KEY, "1") } catch { /* ignore */ }
}

// Two visually-distinct "vanity" flags flank the Codex slide — the Estelada
// Blava (Catalan independence) and the Kanaka Maoli (Native Hawaiian) flag.
// Commons FilePath always resolves, so no extra data module is pulled into the
// first-run path.
const ESTELADA = "https://commons.wikimedia.org/wiki/Special:FilePath/Estelada_blava.svg"
const KANAKA = "https://commons.wikimedia.org/wiki/Special:FilePath/Kanaka_Maoli_flag.svg"

const FLANK: CSSProperties = {
  width: 36, height: 24, objectFit: "cover", borderRadius: 4,
  border: `1px solid ${tint(T.text, 0.18)}`, boxShadow: `0 5px 12px -7px ${tint(T.text, 0.55)}`,
}

type Slide = { center: ReactNode; left?: ReactNode; right?: ReactNode; title: string; body: string }

const SLIDES: Slide[] = [
  {
    center: <EarthLogo size={92} />,
    left: <FlagImage code="br" style={FLANK} />,
    right: <FlagImage code="vu" style={FLANK} />,
    title: "Welcome to Globalio",
    body: "Learn every flag in the world through 50+ quick games — and a flag codex that doubles as a real reference tool.",
  },
  {
    center: <Compass size={62} strokeWidth={1.5} color={ACCENT.codex} absoluteStrokeWidth />,
    title: "A new challenge daily",
    body: "Daily quizzes and Flagle-style puzzles. Build a streak, beat your best, and share your score with one tap.",
  },
  {
    center: <BookOpen size={58} strokeWidth={1.5} color={ACCENT.codex} absoluteStrokeWidth />,
    left: <img src={ESTELADA} alt="" style={FLANK} />,
    right: <img src={KANAKA} alt="" style={FLANK} />,
    title: "Explore the Codex",
    body: "Search 4,500+ flags — countries, historical states, regions, peoples and more. Tap any flag to learn its story.",
  },
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

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, minHeight: 92, marginBottom: 22 }}>
          {s.left && <div style={{ transform: "rotate(-8deg)" }}>{s.left}</div>}
          <div style={{ lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.center}</div>
          {s.right && <div style={{ transform: "rotate(8deg)" }}>{s.right}</div>}
        </div>
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
