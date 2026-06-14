// ── Ad configuration ─────────────────────────────────────────────────────────
// Globalio is "AdSense-ready": until you fill in ADSENSE_CLIENT below, NO ad
// code loads and every <AdSlot> renders nothing — totally safe to ship.
//
// To turn ads on once your Google AdSense account is approved:
//   1. In the AdSense dashboard, find your publisher ID (looks like
//      "ca-pub-1234567890123456") and paste it into ADSENSE_CLIENT.
//   2. Create one "display" ad unit per slot you want, copy each unit's
//      slot ID (a ~10-digit number) into AD_SLOTS below.
//   3. Commit + push — Netlify redeploys and the ads go live.
//
// AdSense also requires the site to be added & approved in your dashboard, and
// a public privacy policy (we ship one at /privacy.html).

export const ADSENSE_CLIENT = "" // e.g. "ca-pub-XXXXXXXXXXXXXXXX"

// One entry per placement. Leave a value empty to keep that slot off.
export const AD_SLOTS = {
  codexFooter: "", // a responsive banner at the bottom of the Codex
}

export const ADS_ENABLED = ADSENSE_CLIENT.startsWith("ca-pub-")
