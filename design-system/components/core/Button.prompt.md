**Button** — the brand's pill-shaped action; antique-gold fill by default, recolour with any `accent`, use across CTAs and chips.

```jsx
<Button accent="var(--accent-play)" trailingArrow>Quick Play</Button>
<Button variant="soft" accent="var(--accent-learn)">Learn more</Button>
<Button variant="outline" size="sm">Skip</Button>
```

Variants: `solid` (filled), `soft` (tinted fill + border), `outline` (paper stock), `ghost` (text only). Sizes `sm | md | lg`. Pass `icon` for a leading glyph and `trailingArrow` for the signature → .
