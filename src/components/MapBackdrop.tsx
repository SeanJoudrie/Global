import worldMap from "@svg-maps/world"

/**
 * A faint vintage-map texture that sits behind everything.
 * Barely-there parchment landmasses, heavily blurred, masked into a soft
 * half-circle "dome" that fades out toward the curved edges.
 *
 * Tune the three knobs below to taste.
 */
const OPACITY = 0.08      // overall visibility — keep low (0.05–0.12)
const BLUR = 2.2          // px of edge softening
const TINT = "#C9B68F"    // warm sepia/parchment landmass colour

export default function MapBackdrop() {
  // A radial mask shaped as a wide dome near the top: solid in the middle,
  // dissolving on a curved arc toward the edges so there are no hard borders.
  const dome =
    "radial-gradient(125% 85% at 50% 12%, #000 0%, #000 42%, rgba(0,0,0,0.45) 62%, transparent 78%)"

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: OPACITY,
        filter: `blur(${BLUR}px)`,
        WebkitMaskImage: dome,
        maskImage: dome,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox={worldMap.viewBox}
        style={{
          width: "135%",          // overscan so the blurred edges stay off-screen
          maxWidth: "none",
          marginTop: "4vh",
          display: "block",
        }}
      >
        {worldMap.locations.map(loc => (
          <path key={loc.id} d={loc.path} fill={TINT} />
        ))}
      </svg>
    </div>
  )
}
