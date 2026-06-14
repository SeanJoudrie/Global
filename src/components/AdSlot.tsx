import { useEffect } from "react"
import { ADSENSE_CLIENT, ADS_ENABLED } from "../ads"

// Loads the AdSense library exactly once, and only after a real publisher ID is
// configured — so the network request never fires on an un-monetised build.
let scriptRequested = false
function ensureAdScript() {
  if (scriptRequested || typeof document === "undefined") return
  scriptRequested = true
  const s = document.createElement("script")
  s.async = true
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`
  s.crossOrigin = "anonymous"
  document.head.appendChild(s)
}

declare global {
  interface Window { adsbygoogle?: Record<string, unknown>[] }
}

// A single responsive AdSense display unit. Renders nothing until both a
// publisher ID (ads.ts) and this slot's unit ID are set, so it's safe to drop
// anywhere in the UI now and flip on later.
export default function AdSlot({ slot, style }: { slot: string; style?: React.CSSProperties }) {
  useEffect(() => {
    if (!ADS_ENABLED || !slot) return
    ensureAdScript()
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch { /* AdSense not ready yet */ }
  }, [slot])

  if (!ADS_ENABLED || !slot) return null
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", ...style }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
