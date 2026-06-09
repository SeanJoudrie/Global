export type Layout = 'v3' | 'h3' | 'h2' | 'v2' | 'disc'

export interface Piece {
  id: string
  color: string
  label: string
}

export interface BuildPuzzle {
  code: string
  name: string
  layout: Layout
  slots: string[]                    // ordered slot ids
  solution: Record<string, string>   // slotId -> pieceId
  pieces: Piece[]                    // correct + decoys, shuffled
}

function p(id: string, color: string, label: string): Piece {
  return { id, color, label }
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const GREEN   = (id: string) => p(id, '#169B62', 'Green')
const RED     = (id: string) => p(id, '#CF0921', 'Red')
const BLUE    = (id: string) => p(id, '#003189', 'Blue')
const WHITE   = (id: string) => p(id, '#F5F5F5', 'White')
const BLACK   = (id: string) => p(id, '#1A1A1A', 'Black')
const YELLOW  = (id: string) => p(id, '#FFCE00', 'Yellow')
const ORANGE  = (id: string) => p(id, '#FF883E', 'Orange')

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

// ── Puzzles ───────────────────────────────────────────────────────────────────
const raw: BuildPuzzle[] = [

  // ── Vertical tricolors (v3) ──────────────────────────────────────────────
  {
    code: 'IE', name: 'Ireland', layout: 'v3',
    slots: ['left', 'center', 'right'],
    solution: { left: 'g', center: 'w', right: 'o' },
    pieces: shuffle([GREEN('g'), WHITE('w'), ORANGE('o'),
      RED('r'), BLUE('b'), YELLOW('y')]),
  },
  {
    code: 'FR', name: 'France', layout: 'v3',
    slots: ['left', 'center', 'right'],
    solution: { left: 'b', center: 'w', right: 'r' },
    pieces: shuffle([BLUE('b'), WHITE('w'), RED('r'),
      GREEN('g'), YELLOW('y'), BLACK('k')]),
  },
  {
    code: 'IT', name: 'Italy', layout: 'v3',
    slots: ['left', 'center', 'right'],
    solution: { left: 'g', center: 'w', right: 'r' },
    pieces: shuffle([GREEN('g'), WHITE('w'), RED('r'),
      BLUE('b'), ORANGE('o'), YELLOW('y')]),
  },
  {
    code: 'BE', name: 'Belgium', layout: 'v3',
    slots: ['left', 'center', 'right'],
    solution: { left: 'k', center: 'y', right: 'r' },
    pieces: shuffle([BLACK('k'), YELLOW('y'), RED('r'),
      WHITE('w'), BLUE('b'), GREEN('g')]),
  },
  {
    code: 'RO', name: 'Romania', layout: 'v3',
    slots: ['left', 'center', 'right'],
    solution: { left: 'b', center: 'y', right: 'r' },
    pieces: shuffle([BLUE('b'), YELLOW('y'), RED('r'),
      GREEN('g'), WHITE('w'), ORANGE('o')]),
  },

  // ── Horizontal tricolors (h3) ──────────────────────────────────────────
  {
    code: 'DE', name: 'Germany', layout: 'h3',
    slots: ['top', 'middle', 'bottom'],
    solution: { top: 'k', middle: 'r', bottom: 'y' },
    pieces: shuffle([BLACK('k'), RED('r'), YELLOW('y'),
      WHITE('w'), BLUE('b'), GREEN('g')]),
  },
  {
    code: 'NL', name: 'Netherlands', layout: 'h3',
    slots: ['top', 'middle', 'bottom'],
    solution: { top: 'r', middle: 'w', bottom: 'b' },
    pieces: shuffle([RED('r'), WHITE('w'), p('b','#21468B','Blue'),
      GREEN('g'), YELLOW('y'), BLACK('k')]),
  },
  {
    code: 'RU', name: 'Russia', layout: 'h3',
    slots: ['top', 'middle', 'bottom'],
    solution: { top: 'w', middle: 'b', bottom: 'r' },
    pieces: shuffle([WHITE('w'), BLUE('b'), RED('r'),
      GREEN('g'), YELLOW('y'), BLACK('k')]),
  },
  {
    code: 'AT', name: 'Austria', layout: 'h3',
    slots: ['top', 'middle', 'bottom'],
    solution: { top: 'r', middle: 'w', bottom: 'r2' },
    pieces: shuffle([RED('r'), WHITE('w'), p('r2','#CF0921','Red'),
      BLUE('b'), GREEN('g'), BLACK('k')]),
  },
  {
    code: 'HU', name: 'Hungary', layout: 'h3',
    slots: ['top', 'middle', 'bottom'],
    solution: { top: 'r', middle: 'w', bottom: 'g' },
    pieces: shuffle([RED('r'), WHITE('w'), GREEN('g'),
      BLUE('b'), YELLOW('y'), BLACK('k')]),
  },
  {
    code: 'BG', name: 'Bulgaria', layout: 'h3',
    slots: ['top', 'middle', 'bottom'],
    solution: { top: 'w', middle: 'g', bottom: 'r' },
    pieces: shuffle([WHITE('w'), GREEN('g'), RED('r'),
      BLUE('b'), YELLOW('y'), BLACK('k')]),
  },
  {
    code: 'LT', name: 'Lithuania', layout: 'h3',
    slots: ['top', 'middle', 'bottom'],
    solution: { top: 'y', middle: 'g', bottom: 'r' },
    pieces: shuffle([YELLOW('y'), GREEN('g'), RED('r'),
      WHITE('w'), BLUE('b'), BLACK('k')]),
  },
  {
    code: 'ET', name: 'Ethiopia', layout: 'h3',
    slots: ['top', 'middle', 'bottom'],
    solution: { top: 'g', middle: 'y', bottom: 'r' },
    pieces: shuffle([GREEN('g'), YELLOW('y'), RED('r'),
      WHITE('w'), BLUE('b'), BLACK('k')]),
  },
  {
    code: 'GA', name: 'Gabon', layout: 'h3',
    slots: ['top', 'middle', 'bottom'],
    solution: { top: 'g', middle: 'y', bottom: 'b' },
    pieces: shuffle([GREEN('g'), YELLOW('y'), BLUE('b'),
      WHITE('w'), RED('r'), BLACK('k')]),
  },

  // ── Horizontal bicolors (h2) ──────────────────────────────────────────
  {
    code: 'PL', name: 'Poland', layout: 'h2',
    slots: ['top', 'bottom'],
    solution: { top: 'w', bottom: 'r' },
    pieces: shuffle([WHITE('w'), RED('r'),
      BLUE('b'), GREEN('g'), YELLOW('y'), BLACK('k')]),
  },
  {
    code: 'ID', name: 'Indonesia', layout: 'h2',
    slots: ['top', 'bottom'],
    solution: { top: 'r', bottom: 'w' },
    pieces: shuffle([RED('r'), WHITE('w'),
      BLUE('b'), GREEN('g'), YELLOW('y'), BLACK('k')]),
  },
  {
    code: 'UA', name: 'Ukraine', layout: 'h2',
    slots: ['top', 'bottom'],
    solution: { top: 'b', bottom: 'y' },
    pieces: shuffle([p('b','#005BBB','Blue'), p('y','#FFD500','Yellow'),
      RED('r'), WHITE('w'), GREEN('g'), BLACK('k')]),
  },
  {
    code: 'EE', name: 'Estonia', layout: 'h3',
    slots: ['top', 'middle', 'bottom'],
    solution: { top: 'b', middle: 'k', bottom: 'w' },
    pieces: shuffle([BLUE('b'), BLACK('k'), WHITE('w'),
      RED('r'), GREEN('g'), YELLOW('y')]),
  },

  // ── Disc (Japan) ──────────────────────────────────────────────────────
  {
    code: 'JP', name: 'Japan', layout: 'disc',
    slots: ['bg', 'disc'],
    solution: { bg: 'w', disc: 'r' },
    pieces: shuffle([
      WHITE('w'), RED('r'),
      BLUE('b'), GREEN('g'), p('y','#FFD500','Yellow'),
    ]),
  },
]

// Export shuffled so each session is different
export const PUZZLES: BuildPuzzle[] = raw
