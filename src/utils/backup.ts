// Progress backup — no backend, so the code IS the backup. We serialise every
// localStorage key (streaks, scores, learned flags, settings, Supporter status)
// into one portable string the player can save and paste into "Restore" on any
// device. Guards against pasting unrelated text with a version marker.
const MARK = "GLOBALIO1:"

export function exportProgress(): string {
  const data: Record<string, string> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k != null) data[k] = localStorage.getItem(k) ?? ""
  }
  // UTF-8 safe base64 (btoa chokes on multi-byte chars otherwise).
  return MARK + btoa(unescape(encodeURIComponent(JSON.stringify(data))))
}

export function importProgress(code: string): boolean {
  const trimmed = (code || "").trim()
  if (!trimmed.startsWith(MARK)) return false
  try {
    const json = decodeURIComponent(escape(atob(trimmed.slice(MARK.length))))
    const data = JSON.parse(json) as Record<string, string>
    if (typeof data !== "object" || data === null) return false
    // A backup is a full snapshot of localStorage, so a restore must fully
    // *replace* local state — otherwise stale keys not present in the backup
    // survive and merge into an inconsistent mix.
    localStorage.clear()
    Object.entries(data).forEach(([k, v]) => localStorage.setItem(k, String(v)))
    return true
  } catch {
    return false
  }
}
