import type { CSSProperties } from "react"
import AdSlot from "./AdSlot"
import { ADS_ENABLED } from "../ads"
import { isSupporter } from "../utils/storage"
import { openSupporter } from "../utils/supporterNav"
import { T, tint, ACCENT, FONT } from "../ui/tokens"

/**
 * A framed ad container — a soft card with the "keeps Globalio free" line and a
 * Supporter link, with the ad inside. Always non-sticky: it sits inline at the
 * bottom of a screen, so you only see it if you scroll to it.
 *
 * Renders nothing for Supporters or when AdSense isn't configured. In local dev
 * (no publisher id) it shows a dashed placeholder so the framing can be previewed.
 */
export default function AdBox({ slot, style }: { slot: string; style?: CSSProperties }) {
  if (isSupporter()) return null
  const showPlaceholder = !ADS_ENABLED && import.meta.env.DEV
  if (!ADS_ENABLED && !showPlaceholder) return null
  if (!slot && !showPlaceholder) return null

  return (
    <div
      style={{
        marginTop: 22,
        borderRadius: 16,
        border: `1px solid ${T.line}`,
        background: tint(T.text, 0.025),
        padding: 12,
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: T.muted }}>Ads keep Globalio free for everyone 💛</span>
        <button
          onClick={openSupporter}
          className="geo-tap"
          style={{ fontSize: 11, fontWeight: 700, color: ACCENT.today, background: "none", border: "none", cursor: "pointer", fontFamily: FONT.display, whiteSpace: "nowrap" }}
        >
          Remove ads →
        </button>
      </div>
      {showPlaceholder ? (
        <div style={{ height: 90, borderRadius: 10, border: `1px dashed ${T.lineHi}`, display: "flex", alignItems: "center", justifyContent: "center", color: T.dim, fontSize: 12 }}>
          Ad placeholder (set VITE/AdSense id to serve real ads)
        </div>
      ) : (
        <AdSlot slot={slot} />
      )}
    </div>
  )
}
