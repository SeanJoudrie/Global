import { useState } from "react"
import { FLAGS } from "../data/flags"
import { SUB_FLAGS } from "../data/subdivisions"
import { HISTORICAL_FLAGS } from "../data/historicalFlags"
import { IDENTITY_FLAGS } from "../data/identityFlags"
import { CODEX } from "../data/codex"

interface Props { onBack: () => void }

// Not celebrated alongside the rest.
const EXCLUDE = (url: string) => url.includes("German_Reich")

function gatherFlagUrls(): string[] {
  const urls = new Set<string>()
  FLAGS.forEach(f => urls.add(f.flagUrl))
  SUB_FLAGS.forEach(s => urls.add(s.flagUrl))
  HISTORICAL_FLAGS.forEach(h => urls.add(h.flagUrl))
  IDENTITY_FLAGS.forEach(i => urls.add(i.flagUrl))
  Object.values(CODEX).forEach(entry => {
    entry.flagHistory.forEach(hf => {
      urls.add(hf.flagUrl)
      hf.parallel?.forEach(p => urls.add(p.flagUrl))
    })
  })
  return [...urls].filter(u => !EXCLUDE(u)).sort(() => Math.random() - 0.5)
}

export default function MegaCodexScreen({ onBack }: Props) {
  const [urls] = useState(gatherFlagUrls)

  return (
    <div style={{ minHeight: "100vh", background: "#0B0717", position: "relative", zIndex: 1 }}>
      {/* No labels — just a back arrow, floating */}
      <button onClick={onBack} aria-label="Back"
        style={{
          position: "fixed", top: 12, left: 12, zIndex: 50,
          width: 40, height: 40, borderRadius: 999, fontSize: 22,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(11,7,23,0.82)", color: "#F5F3FF",
          border: "1px solid rgba(139,108,255,0.4)", backdropFilter: "blur(6px)", cursor: "pointer",
        }}>‹</button>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(54px, 1fr))",
        gap: 3, padding: 6,
      }}>
        {urls.map((u, i) => (
          <img
            key={i}
            src={u}
            alt=""
            loading="lazy"
            style={{ width: "100%", aspectRatio: "3 / 2", objectFit: "cover", borderRadius: 3, display: "block", background: "#1A1033" }}
            onError={e => { (e.target as HTMLImageElement).style.visibility = "hidden" }}
          />
        ))}
      </div>
    </div>
  )
}
