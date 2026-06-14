# Self-hosting the gallery flags (public/cf)

These flags were hot-linked from Wikimedia Commons; we self-host them under
`public/cf/` so the app serves them same-origin (no 429 rate-limits) and to
improve our licensing posture. `fp()` (src/data/codex.ts) resolves
`HOSTED_FLAGS` (src/data/hostedFlags.ts) → falls back to the live Commons
hotlink for anything not yet hosted, so a partial set is always safe.

- `files.txt`     — every Commons filename the app references (target set).
- `manifest.json` — filename → /cf/<sha1>.<ext> for files already downloaded.
- `download.mjs`  — gentle, resumable downloader (skips files already in the
                    manifest). Wikimedia throttles bulk pulls, so run it in
                    multiple passes; it resumes where it left off.
- `genhosted.mjs` — regenerates src/data/hostedFlags.ts from the manifest.

## Finish the remaining ~840
    node scripts/flags/cf/download.mjs        # resumes; re-run until counts stop rising
    node scripts/flags/cf/genhosted.mjs       # rebuild the map
    npm run build && git add public/cf src/data/hostedFlags.ts && git commit && git push
