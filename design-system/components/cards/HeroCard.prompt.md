**HeroCard** — the big, image-led card crowning the Today tab (Flag of the Day, featured game, fun fact): eyebrow, serif title, subtitle, accent spine + CTA pill, with an optional contained media slot.

```jsx
<HeroCard eyebrow="Flag of the Day" title="Brazil"
  subtitle="The green stands for its forests; the blue globe carries 27 stars."
  accent="var(--accent-codex)" cta="Open codex"
  media={<FlagChip code="br" w={96} h={64} />} onClick={open} />
```

Omit `cta` for a non-clickable feature; pass any node as `media`.
