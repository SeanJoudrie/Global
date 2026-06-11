import { useState } from "react"
import { FIXED_FLAGS, MISSING_FLAGS } from "../data/flagDiagnostics"
import type { DiagFlag, MissingFlag } from "../data/flagDiagnostics"

// Temporary QA screen (Settings → Flag Check).
//  • Fixed   – repaired dead links; every image should load.
//  • Missing – dead links with candidate guesses. Tap the correct flag(s), then
//              Submit to get a copy-paste block to send back for wiring in.
interface Props { onBack: () => void }

// ── Fixed tab tile ──────────────────────────────────────────────────────────
function FixedTile({ f }: { f: DiagFlag }) {
  const [state, setState] = useState<"loading" | "ok" | "err">("loading")
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ width: 54, height: 36, flexShrink: 0, borderRadius: 4, overflow: "hidden", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", outline: state === "err" ? "2px solid #ff5e5e" : "none" }}>
        <img src={f.url} alt={f.label} loading="lazy" onLoad={() => setState("ok")} onError={() => setState("err")}
          style={{ width: "100%", height: "100%", objectFit: "contain", display: state === "err" ? "none" : "block" }} />
        {state === "err" && <span style={{ fontSize: 16 }}>❌</span>}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 13, color: "#F5F3FF", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.label}</div>
        <div style={{ fontSize: 10, color: state === "ok" ? "#6BCB77" : state === "err" ? "#ff8a8a" : "#8B6CFF99" }}>
          {state === "ok" ? "loads ✓" : state === "err" ? "BROKEN" : "…"}
        </div>
      </div>
    </div>
  )
}

// ── Missing tab: tap-to-select candidates ──────────────────────────────────
function CandidateTile({ url, file, selected, onTap }: { url: string; file: string; selected: boolean; onTap: () => void }) {
  const [err, setErr] = useState(false)
  if (err) return null
  return (
    <button onClick={onTap} style={{
      width: 104, flexShrink: 0, padding: 0, border: "none", background: "none", cursor: "pointer", textAlign: "left",
    }}>
      <div style={{
        width: 104, height: 70, borderRadius: 6, overflow: "hidden", position: "relative",
        background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center",
        outline: selected ? "3px solid #6BCB77" : "1px solid rgba(255,255,255,0.12)",
      }}>
        <img src={url} alt={file} loading="lazy" onError={() => setErr(true)}
          style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        {selected && (
          <div style={{ position: "absolute", top: 2, right: 2, width: 20, height: 20, borderRadius: 999, background: "#6BCB77", color: "#062", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>
        )}
      </div>
      <div style={{ fontSize: 9, color: selected ? "#6BCB77" : "#B8A9E0", marginTop: 2, lineHeight: 1.2, wordBreak: "break-word" }}>{file}</div>
    </button>
  )
}

function MissingRow({ f, sel, toggle }: { f: MissingFlag; sel: Set<string>; toggle: (file: string) => void }) {
  return (
    <div style={{ padding: "8px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ fontSize: 13, color: "#F5F3FF", fontWeight: 600, marginBottom: 5 }}>{f.label}</div>
      {f.cands.length === 0
        ? <div style={{ fontSize: 11, color: "#ff8a8a" }}>no candidate found — needs a filename</div>
        : <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
            {f.cands.map((c) => (
              <CandidateTile key={c.file} url={c.url} file={c.file}
                selected={sel.has(c.file)} onTap={() => toggle(c.file)} />
            ))}
          </div>}
    </div>
  )
}

export default function FlagDiagnosticsScreen({ onBack }: Props) {
  const [tab, setTab] = useState<"missing" | "fixed">("missing")
  // selections: arg -> set of chosen candidate filenames
  const [picks, setPicks] = useState<Record<string, Set<string>>>({})
  const [submitText, setSubmitText] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const toggle = (arg: string, file: string) =>
    setPicks((prev) => {
      const next = { ...prev }
      const s = new Set(next[arg] ?? [])
      s.has(file) ? s.delete(file) : s.add(file)
      if (s.size) next[arg] = s
      else delete next[arg]
      return next
    })

  const count = Object.values(picks).reduce((n, s) => n + s.size, 0)

  const buildSubmit = () => {
    const lines = ["=== FLAG PICKS ==="]
    for (const f of MISSING_FLAGS) {
      const s = picks[f.arg]
      if (s && s.size) for (const file of s) lines.push(`${f.arg}  =>  ${file}`)
    }
    const text = lines.join("\n")
    setSubmitText(text)
    setCopied(false)
    navigator.clipboard?.writeText(text).then(() => setCopied(true)).catch(() => {})
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "#0B0717", zIndex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 12px 8px" }}>
        <button onClick={onBack} aria-label="Back" style={{ width: 36, height: 36, borderRadius: 999, fontSize: 20, flexShrink: 0, background: "rgba(139,108,255,0.15)", color: "#F5F3FF", border: "1px solid rgba(139,108,255,0.4)", cursor: "pointer" }}>‹</button>
        <div style={{ color: "#F5F3FF", fontWeight: 700, fontSize: 16 }}>Flag Check</div>
      </div>
      <div style={{ display: "flex", gap: 6, padding: "0 12px 10px" }}>
        {([["missing", `Missing (${MISSING_FLAGS.length})`], ["fixed", `Fixed (${FIXED_FLAGS.length})`]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ flex: 1, padding: "8px 0", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", background: tab === id ? "#8B6CFF" : "rgba(255,255,255,0.06)", color: tab === id ? "#fff" : "#B8A9E0", border: "none" }}>{label}</button>
        ))}
      </div>
      <div style={{ padding: "0 12px 8px", fontSize: 11, color: "#8B6CFF99", lineHeight: 1.4 }}>
        {tab === "missing"
          ? "Tap the correct flag(s) for each entry (pick more than one if several are right). Then hit Submit at the bottom and send me the copied text."
          : "These were repaired. Every one should show “loads ✓”. Tell me if any looks wrong."}
      </div>

      <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch", paddingBottom: tab === "missing" ? 72 : 0 }}>
        {tab === "missing"
          ? MISSING_FLAGS.map((f, i) => <MissingRow key={"m" + i} f={f} sel={picks[f.arg] ?? new Set()} toggle={(file) => toggle(f.arg, file)} />)
          : FIXED_FLAGS.map((f, i) => <FixedTile key={"f" + i} f={f} />)}
      </div>

      {tab === "missing" && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 10, background: "rgba(11,7,23,0.95)", borderTop: "1px solid rgba(139,108,255,0.3)", backdropFilter: "blur(6px)" }}>
          <button onClick={buildSubmit} disabled={count === 0} style={{
            width: "100%", padding: "12px 0", borderRadius: 12, fontSize: 14, fontWeight: 700, border: "none",
            cursor: count ? "pointer" : "default", background: count ? "#6BCB77" : "rgba(255,255,255,0.08)", color: count ? "#062" : "#8B6CFF77",
          }}>{count ? `Submit ${count} pick${count > 1 ? "s" : ""}` : "Tap flags to select"}</button>
        </div>
      )}

      {submitText !== null && (
        <div onClick={() => setSubmitText(null)} style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#160F2E", borderRadius: 14, padding: 16, width: "100%", maxWidth: 460, maxHeight: "80%", display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#F5F3FF", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{copied ? "✅ Copied — paste it to me" : "Copy this and paste it to me"}</div>
            <textarea readOnly value={submitText} style={{ flex: 1, minHeight: 160, fontFamily: "monospace", fontSize: 11, padding: 10, borderRadius: 8, border: "1px solid rgba(139,108,255,0.3)", background: "#0B0717", color: "#D9CCFF", resize: "none" }} />
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button onClick={() => { navigator.clipboard?.writeText(submitText).then(() => setCopied(true)) }} style={{ flex: 1, padding: "10px 0", borderRadius: 10, fontWeight: 700, border: "none", background: "#6BCB77", color: "#062", cursor: "pointer" }}>Copy</button>
              <button onClick={() => setSubmitText(null)} style={{ flex: 1, padding: "10px 0", borderRadius: 10, fontWeight: 700, border: "1px solid rgba(139,108,255,0.4)", background: "transparent", color: "#B8A9E0", cursor: "pointer" }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
