import AdBox from "./AdBox"
import { AD_SLOTS } from "../ads"
import { openSupporter } from "../utils/supporterNav"
import { T, ACCENT, FONT, tint } from "../ui/tokens"

/**
 * The boxed "every 4th game" break. A gentle, dismissible overlay — never a
 * forced timer (a true skippable video needs H5 Games Ads / AdMob, a later
 * phase). App only mounts this when ads are enabled and the player isn't a
 * Supporter, so it's dormant until AdSense is configured.
 */
export default function AdBreakModal({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="animate-fade-in" style={{
      position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(3px)",
    }}>
      <div className="w-full max-w-sm rounded-2xl animate-slide-up" style={{ background: T.surface, border: `1px solid ${T.line}`, padding: 18 }}>
        <div className="text-center">
          <div className="geo-display" style={{ fontWeight: 800, fontSize: 18, color: T.text }}>Quick break 💛</div>
          <p style={{ color: T.muted, fontSize: 12.5, marginTop: 4, lineHeight: 1.5 }}>
            This keeps Globalio free for everyone.
          </p>
        </div>

        <AdBox slot={AD_SLOTS.adBreak} style={{ marginTop: 14 }} />

        <button onClick={onContinue}
          className="w-full mt-4 py-3 rounded-xl font-bold text-base transition-all active:scale-95"
          style={{ background: ACCENT.today, color: T.onAccent, fontFamily: FONT.display }}>
          Continue →
        </button>
        <button onClick={openSupporter}
          className="w-full mt-2 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95"
          style={{ background: tint(T.gold, 0.12), border: `1px solid ${tint(T.gold, 0.4)}`, color: T.gold }}>
          Remove ads — become a Supporter
        </button>
      </div>
    </div>
  )
}
