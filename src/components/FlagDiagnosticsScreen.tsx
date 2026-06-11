import { useState } from "react"
import { FIXED_FLAGS, MISSING_FLAGS } from "../data/flagDiagnostics"
import type { DiagFlag } from "../data/flagDiagnostics"

// Temporary QA screen (Settings → Flag Check). Two lists:
//  • FIXED   – dead links that were repaired; every image should load.
//  • MISSING – dead links with no confirmed replacement, rendered from their
//              original Wikimedia name. Broken ones are the "find a filename" list.
interface Props { onBack: () => void }

function Tile({ f }: { f: DiagFlag }) {
  const [state, setState] = useState<"loading" | "ok" | "err">("loading")
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, padding: "6px 10px",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{
        width: 54, height: 36, flexShrink: 0, borderRadius: 4, overflow: "hidden",
        background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center",
        outline: state === "err" ? "2px solid #ff5e5e" : "none",
      }}>
        {f.url
          ? <img src={f.url} alt={f.label} loading="lazy"
              onLoad={() => setState("ok")} onError={() => setState("err")}
              style={{ width: "100%", height: "100%", objectFit: "contain", display: state === "err" ? "none" : "block" }} />
          : null}
        {state === "err" && <span style={{ fontSize: 16 }}>❌</span>}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 13, color: "#F5F3FF", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.label}</div>
        <div style={{ fontSize: 10, color: state === "ok" ? "#6BCB77" : state === "err" ? "#ff8a8a" : "#8B6CFF99" }}>
          {state === "ok" ? "loads ✓" : state === "err" ? "BROKEN — needs filename" : "…"}
        </div>
      </div>
    </div>
  )
}

export default function FlagDiagnosticsScreen({ onBack }: Props) {
  const [tab, setTab] = useState<"fixed" | "missing">("missing")
  const list = tab === "fixed" ? FIXED_FLAGS : MISSING_FLAGS
  return (
    <div style={{ position: "fixed", inset: 0, background: "#0B0717", zIndex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 12px 8px" }}>
        <button onClick={onBack} aria-label="Back" style={{
          width: 36, height: 36, borderRadius: 999, fontSize: 20, flexShrink: 0,
          background: "rgba(139,108,255,0.15)", color: "#F5F3FF", border: "1px solid rgba(139,108,255,0.4)", cursor: "pointer",
        }}>‹</button>
        <div style={{ color: "#F5F3FF", fontWeight: 700, fontSize: 16 }}>Flag Check</div>
      </div>
      <div style={{ display: "flex", gap: 6, padding: "0 12px 10px" }}>
        {([["missing", `Missing (${MISSING_FLAGS.length})`], ["fixed", `Fixed (${FIXED_FLAGS.length})`]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, padding: "8px 0", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: tab === id ? "#8B6CFF" : "rgba(255,255,255,0.06)",
            color: tab === id ? "#fff" : "#B8A9E0", border: "none",
          }}>{label}</button>
        ))}
      </div>
      <div style={{ padding: "0 12px 8px", fontSize: 11, color: "#8B6CFF99", lineHeight: 1.4 }}>
        {tab === "missing"
          ? "These dead links have no confirmed flag. Anything BROKEN below likely has a real flag — send me the correct Commons filename and I'll wire it in."
          : "These were repaired. Every one should show “loads ✓”. Flag anything that looks wrong."}
      </div>
      <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
        {list.map((f, i) => <Tile key={tab + i} f={f} />)}
      </div>
    </div>
  )
}
