// ── Analytics ────────────────────────────────────────────────────────────────
// Privacy-friendly and dormant: nothing loads until you fill in an ID below, so
// it's safe to ship as-is. Pick ONE option, set its value, commit + push.
//
//  Option A — GoatCounter (recommended): free, no cookies, no consent banner.
//    1. Sign up at https://www.goatcounter.com and choose a code (e.g. "globalio").
//    2. Set GOATCOUNTER_CODE below to that code. Done — view stats at
//       https://<code>.goatcounter.com
//
//  Option B — Google Analytics 4: free, more powerful, but sets cookies (your
//    existing ad consent banner should cover it).
//    1. Create a GA4 property, copy its Measurement ID (looks like "G-XXXXXXXXXX").
//    2. Set GA4_ID below.
//
// If both are set, GoatCounter wins (it's the privacy-friendly default).

export const GOATCOUNTER_CODE = "" // e.g. "globalio"
export const GA4_ID = ""           // e.g. "G-XXXXXXXXXX"

export function initAnalytics() {
  if (typeof document === "undefined") return

  if (GOATCOUNTER_CODE) {
    const s = document.createElement("script")
    s.async = true
    s.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`
    s.src = "//gc.zgo.at/count.js"
    document.head.appendChild(s)
    return
  }

  if (GA4_ID) {
    const tag = document.createElement("script")
    tag.async = true
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
    document.head.appendChild(tag)
    const inline = document.createElement("script")
    inline.textContent =
      `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}` +
      `gtag('js',new Date());gtag('config','${GA4_ID}');`
    document.head.appendChild(inline)
  }
}
