**Card** — the paper-stock surface under every Globalio panel: hairline border, soft ink-teal shadow, and an accent watercolour wash that bleeds in on hover when interactive.

```jsx
<Card accent="var(--accent-play)" onClick={play}>
  <Badge eyebrow accent="var(--accent-play)">Featured</Badge>
  <h3 className="gl-display">Flag DNA</h3>
</Card>
```

Renders a `<button>` automatically when `onClick` is passed; set `interactive` to get the lift/wash on a non-clickable card. Pass `accent` to tint the wash.
