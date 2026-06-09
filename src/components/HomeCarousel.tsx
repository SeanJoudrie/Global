import { useState, useEffect, useRef, useCallback } from "react"
import { FLAGS } from "../data/flags"
import { todayString, seededRandom } from "../utils/prng"
import type { AppState } from "../utils/storage"

interface Props {
  state: AppState
  onStartDaily: () => void
  dailyDone: boolean
  todayScore?: { score: number; total: number; answers: ("correct" | "wrong")[] }
}

const ALL_FACTS = [
  "There are 195 countries recognised by the United Nations.",
  "The flag of Nepal is the only national flag that is not rectangular.",
  "No two countries have exactly the same flag — each one is legally distinct.",
  "The US flag has been redesigned 27 times as new states joined the union.",
  "Scotland's national animal is the unicorn.",
  "The Olympic flag's five rings represent the five inhabited continents.",
  "Bhutan's flag is the only one featuring a dragon.",
  "Switzerland and Vatican City are the only countries with square flags.",
  "More than half the world's flags contain the colour blue.",
  "The flag of Cyprus shows a map of the island — unique in the world.",
  "The Canadian flag was officially adopted in 1965, replacing the colonial design.",
  "Libya's flag was plain green for 20 years — the simplest national flag ever.",
  "The flag of Mozambique contains an AK-47 with a bayonet.",
  "Denmark's flag, the Dannebrog, is the oldest national flag still in use.",
  "The Union Jack is only called a 'Jack' when flown at sea.",
  "Brazil's flag has 27 stars, one for each state and the federal district.",
  "The flag of Belize features two men — one of only a few with people.",
  "Russia and the Netherlands have almost identical flags, just reversed.",
  "The flags of Chad and Romania are nearly identical — both tricolours.",
  "Papua New Guinea's flag features the Southern Cross and a Bird of Paradise.",
  "Jamaica is the only Caribbean flag with no red, white, or blue.",
  "The Albanian flag shows a double-headed eagle from medieval origins.",
  "South Africa has six colours on its flag — more than most.",
  "The Philippines' flag is flown upside-down during wartime.",
  "Cambodia's flag is the only one featuring a building: Angkor Wat.",
  "Saudi Arabia's flag always flies right-side up — its text must be readable.",
  "Bolivia has two official flags — one public, one for the government.",
  "Qatar's flag is the only one with a width-to-height ratio greater than 1:2.",
  "The Dannebrog is said to have fallen from the sky during the Battle of Lyndanisse in 1219.",
  "Lesotho's flag is the only one changed for the 2006 World Cup — they updated the hat design.",
]

function getCurrentFact(minute: number): string {
  return ALL_FACTS[minute % ALL_FACTS.length]
}

function getDailyFlag(dateStr: string) {
  const rng = seededRandom(dateStr + "flagofday")
  return FLAGS[Math.floor(rng() * FLAGS.length)]
}

function formatCountdown(): string {
  const now = new Date()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  const ms = midnight.getTime() - now.getTime()
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  return `${h}h ${m}m`
}

const SLIDE_COLORS = [
  { border: "#8B6CFF", glow: "#8B6CFF28", accent: "#A78BFA" },
  { border: "#F59E0B", glow: "#F59E0B22", accent: "#FBBF24" },
  { border: "#34D399", glow: "#34D39922", accent: "#6EE7B7" },
]

const CARD_HEIGHT = 210
const CONTENT_HEIGHT = 160

export default function HomeCarousel({ onStartDaily, dailyDone, todayScore }: Props) {
  const [idx, setIdx] = useState(0)
  const [minute, setMinute] = useState(() => Math.floor(Date.now() / 60000))
  const dragStartX = useRef<number | null>(null)
  const isDragging = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const today = todayString()
  const dailyFlag = getDailyFlag(today)
  const NUM = 3

  useEffect(() => {
    const minuteTimer = setInterval(() => setMinute(Math.floor(Date.now() / 60000)), 60000)
    return () => clearInterval(minuteTimer)
  }, [])

  const currentFact = getCurrentFact(minute)

  const goTo = (i: number) => setIdx(((i % NUM) + NUM) % NUM)

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => setIdx(i => (i + 1) % NUM), 10000)
  }, [])

  useEffect(() => {
    resetTimer()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [resetTimer])

  const handleDragStart = (clientX: number) => {
    dragStartX.current = clientX
    isDragging.current = true
  }

  const handleDragEnd = (clientX: number) => {
    if (!isDragging.current || dragStartX.current === null) return
    const delta = clientX - dragStartX.current
    if (Math.abs(delta) > 40) { goTo(delta < 0 ? idx + 1 : idx - 1); resetTimer() }
    isDragging.current = false
    dragStartX.current = null
  }

  const color = SLIDE_COLORS[idx]

  const slides = [
    // Slide 0 — Daily Game
    <div key="daily" style={{ height: CONTENT_HEIGHT, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#F5F3FF" }}>Daily Game</div>
        <div style={{
          width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(135deg,#2D1F52,#3D2A6A)", border: "1px solid #8B6CFF44",
          fontSize: 24,
        }}>🌍</div>
      </div>
      {dailyDone && todayScore ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 36, fontWeight: 900, color: "#34D399" }}>{todayScore.score}/{todayScore.total}</span>
              <span style={{ fontSize: 13, color: "#B8A9E0" }}>correct today</span>
            </div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {todayScore.answers.map((a, i) => <span key={i}>{a === "correct" ? "🟩" : "🟥"}</span>)}
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#B8A9E0" }}>Next puzzle in {formatCountdown()}</div>
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <p style={{ fontSize: 13, color: "#B8A9E0", margin: 0 }}>10 flags · confusable distractors · shareable result</p>
          <button onClick={onStartDaily}
            style={{ width: "100%", padding: "11px 0", borderRadius: 14, fontWeight: 700, fontSize: 15,
              background: "linear-gradient(135deg,#8B6CFF,#A78BFA)", color: "#fff",
              boxShadow: "0 4px 20px #8B6CFF55", border: "none", cursor: "pointer" }}>
            Play Today's Game →
          </button>
        </div>
      )}
    </div>,

    // Slide 1 — Rotating Fun Fact
    <div key="fact" style={{ height: CONTENT_HEIGHT, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#F5F3FF" }}>Fun Fact</div>
        <div style={{
          width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(135deg,#3A2A10,#4A3A18)", border: "1px solid #F59E0B44",
          fontSize: 24,
        }}>💡</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <p style={{ fontSize: 14, color: "#F5F3FF", margin: 0, lineHeight: 1.65, fontStyle: "italic" }}>"{currentFact}"</p>
      </div>
    </div>,

    // Slide 2 — Flag of the Day
    <div key="flagday" style={{ height: CONTENT_HEIGHT, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontSize: 22, fontWeight: 900, color: "#F5F3FF" }}>Flag of the Day</div>
      <div style={{ flex: 1, display: "flex", gap: 14, alignItems: "center" }}>
        {/* Info left */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ fontWeight: 800, fontSize: 17, color: "#F5F3FF" }}>{dailyFlag.name}</div>
          <div style={{ display: "flex" }}>
            <span style={{
              padding: "2px 8px", borderRadius: 999,
              background: "#34D39922", border: "1px solid #34D39944",
              fontSize: 10, fontWeight: 600, color: "#6EE7B7",
            }}>{dailyFlag.region}</span>
          </div>
          <p style={{
            fontSize: 12, lineHeight: 1.55, color: "#B8A9E0", margin: 0,
            display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>{dailyFlag.funFact}</p>
        </div>
        {/* Flag right */}
        <div style={{
          flexShrink: 0, width: 108, height: 72,
          borderRadius: 10, overflow: "hidden",
          border: "2px solid #34D39944",
          boxShadow: "0 0 20px #34D39930",
          background: "#1A1033",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <img
            src={dailyFlag.flagUrl}
            alt={dailyFlag.name}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
            onError={e => { (e.target as HTMLImageElement).style.display = "none" }}
          />
        </div>
      </div>
    </div>,
  ]

  return (
    <div className="mx-5 mt-2 rounded-2xl overflow-hidden transition-all duration-300"
      style={{ background: "#2D1F52", border: `1px solid ${color.border}66`, boxShadow: `0 0 32px ${color.glow}` }}>
      <div
        className="p-5 select-none"
        style={{ height: CARD_HEIGHT, cursor: "grab", overflow: "hidden" }}
        onMouseDown={e => handleDragStart(e.clientX)}
        onMouseUp={e => handleDragEnd(e.clientX)}
        onMouseLeave={() => { isDragging.current = false; dragStartX.current = null }}
        onTouchStart={e => handleDragStart(e.touches[0].clientX)}
        onTouchEnd={e => handleDragEnd(e.changedTouches[0].clientX)}
      >
        {slides[idx]}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, paddingBottom: 14 }}>
        {Array.from({ length: NUM }).map((_, i) => (
          <button key={i} onClick={() => { goTo(i); resetTimer() }}
            style={{ width: i === idx ? 20 : 7, height: 7, borderRadius: 999,
              background: i === idx ? color.border : "#8B6CFF33",
              border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
        ))}
      </div>
    </div>
  )
}
