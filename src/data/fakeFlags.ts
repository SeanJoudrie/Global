// ── Doctored flags for Flag Forgery ─────────────────────────────────────────
// Each entry is a real country's flag with exactly one detail quietly wrong.
// The SVGs in /public/fakes are edited copies of the self-hosted /public/flags
// originals, so they render pixel-identical in style to the genuine article —
// nothing about image quality gives them away.

export interface FakeFlag {
  /** ISO code of the country being forged (never shown as a real card in the same round). */
  code: string
  name: string
  /** Doctored SVG under /fakes/. */
  src: string
  /** Terse in-round toast shown right after the swipe. */
  short: string
  /** Full explanation for the end-of-round recap. */
  reason: string
}

export const FAKE_FLAGS: FakeFlag[] = [
  {
    code: "es", name: "Spain", src: "/fakes/es.svg",
    short: "The crest was centred",
    reason: "The coat of arms sits dead centre — on the real flag it's offset toward the hoist.",
  },
  {
    code: "ad", name: "Andorra", src: "/fakes/ad.svg",
    short: "The stripes ran the wrong way",
    reason: "The blue–yellow–red bands run horizontally — Andorra's tricolour is vertical.",
  },
  {
    code: "br", name: "Brazil", src: "/fakes/br.svg",
    short: "The motto lost its E",
    reason: "The banner reads ORDEM PROGRESSO — the real motto is ORDEM E PROGRESSO.",
  },
  {
    code: "au", name: "Australia", src: "/fakes/au.svg",
    short: "St Patrick's saltire was missing",
    reason: "The Union Jack is missing the red St Patrick's saltire that represents Northern Ireland.",
  },
  {
    code: "cd", name: "DR Congo", src: "/fakes/cd.svg",
    short: "A second star sneaked in",
    reason: "There's an extra star in the lower fly — the real flag has a single star, up by the hoist.",
  },
  {
    code: "mx", name: "Mexico", src: "/fakes/mx.svg",
    short: "Green and red traded places",
    reason: "The stripes run red–white–green — on the real flag, green leads at the hoist.",
  },
  {
    code: "ma", name: "Morocco", src: "/fakes/ma.svg",
    short: "The star was filled in",
    reason: "The pentagram is solid green — the real star is an interlaced outline with red showing through.",
  },
  {
    code: "pk", name: "Pakistan", src: "/fakes/pk.svg",
    short: "The white stripe switched sides",
    reason: "The white stripe sits at the fly end — it belongs at the hoist, before the green.",
  },
  {
    code: "sy", name: "Syria", src: "/fakes/sy.svg",
    short: "A star went missing",
    reason: "Only two red stars — the new Syrian flag carries three.",
  },
  {
    code: "tr", name: "Turkey", src: "/fakes/tr.svg",
    short: "The star lost its tilt",
    reason: "The star sits perfectly upright — on the real flag it's tilted, with one point aimed away from the crescent.",
  },
  {
    code: "jm", name: "Jamaica", src: "/fakes/jm.svg",
    short: "Green and black traded places",
    reason: "The hoist and fly triangles are green — on the real flag they're black, with green top and bottom.",
  },
]

export const FAKE_CODES = new Set(FAKE_FLAGS.map(f => f.code))
