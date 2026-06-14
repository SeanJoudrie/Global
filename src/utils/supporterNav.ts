// Lets any ad component open the Supporter screen without threading navigation
// props through every screen. App registers the handler once on mount.
let handler: (() => void) | null = null

export function setSupporterHandler(fn: (() => void) | null) {
  handler = fn
}

export function openSupporter() {
  handler?.()
}
