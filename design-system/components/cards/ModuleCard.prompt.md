**ModuleCard** — the full-width "heavy task" row for Learn & Codex lists: icon chip, title, subtitle, and a progress ring (or trailing arrow). Mastered modules earn the aged-gold foil edge and a crown.

```jsx
<ModuleCard icon={<LineIcon name="flags" />} title="Flag Sets"
  subtitle="Country, historical & identity sets" accent="var(--accent-learn)"
  progress={{ done: 88, total: 195 }} onClick={open} />
```

Omit `progress` to show the → arrow instead. Pass `progress` where `done >= total` to trigger the foil + 👑.
