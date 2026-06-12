**TabBar** — the fixed, frosted bottom navigation: Today · Learn · Play · Codex · You. The active tab lights its top bar, icon and label in its own accent.

```jsx
<TabBar active={tab} onChange={setTab}
  renderIcon={(g, on, c) => <LineIcon name={g} size={19} color={c} />} />
```

Pass `renderIcon` to draw glyphs (wire up LineIcon). Override `tabs` for a different destination set; set `fixed={false}` to inline it.
