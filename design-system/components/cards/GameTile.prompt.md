**GameTile** — the compact minigame tile for Play arcade grids and swipeable "Netflix" rows: icon chip, title, one-line subtitle, accent wash.

```jsx
<GameTile icon={<LineIcon name="flagle" />} title="Flagle"
  subtitle="Daily flag Wordle · 6 guesses" accent="var(--accent-play)" onClick={open} />
```

Fixed `width` (124) suits horizontal rows; pass `width="100%"` inside a grid.
