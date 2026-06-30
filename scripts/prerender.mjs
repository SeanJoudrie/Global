// Static content-page generator — run AFTER `vite build` (see package.json).
//
// Globalio is a client-rendered SPA: the crawler that fetches "/" sees an empty
// shell until JavaScript runs, which is why search engines and AdSense saw "no
// content". This script emits real, crawlable HTML — one rich page per country
// plus an index hub — into dist/, and rewrites the sitemap. Each page links into
// the live app, so they double as SEO landing pages.
//
// Data is imported straight from the TypeScript sources via Node's native type
// stripping (Node >= 22), so the pages can never drift from the in-app data.

import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const ORIGIN = 'https://globalio.app'

const { FLAGS, REGIONS } = await import(path.join(ROOT, 'src/data/flags.ts'))
const { CAPITALS } = await import(path.join(ROOT, 'src/data/capitals.ts'))

const CAPITAL = new Map(CAPITALS.map(c => [c.code, c.capital]))
const BY_CODE = new Map(FLAGS.map(f => [f.code, f]))

// ── helpers ──────────────────────────────────────────────────────────────────
const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
const slug = code => code.toLowerCase()

// Shared <head> + chrome so every generated page is self-contained and styled.
function page({ title, description, canonical, body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<link rel="canonical" href="${canonical}" />
<meta name="theme-color" content="#1A1033" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Globalio" />
<meta property="og:url" content="${canonical}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:image" content="${ORIGIN}/world-map.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2216954143093824" crossorigin="anonymous"></script>
<style>
  *{box-sizing:border-box}
  body{margin:0;font-family:Inter,system-ui,-apple-system,sans-serif;color:#F5F3FF;
       background:linear-gradient(135deg,#1A1033 0%,#2A1A4A 100%);min-height:100vh;line-height:1.6}
  a{color:#A78BFA;text-decoration:none}
  a:hover{text-decoration:underline}
  .wrap{max-width:760px;margin:0 auto;padding:28px 22px 64px}
  header nav{font-size:13px;color:#B8A9E0;margin-bottom:24px}
  h1{font-size:30px;font-weight:800;margin:0 0 6px;letter-spacing:-0.02em}
  h2{font-size:19px;font-weight:700;margin:32px 0 10px}
  p{margin:0 0 14px}
  .muted{color:#B8A9E0}
  .flag{width:100%;max-width:340px;border-radius:12px;border:1px solid #2D1F52;
        background:#fff;display:block;margin:18px 0}
  .facts{list-style:none;padding:0;margin:0 0 14px;display:grid;gap:8px}
  .facts li{background:#2D1F52;border:1px solid #3a2a5e;border-radius:10px;padding:10px 14px}
  .facts b{color:#fff}
  .cta{display:inline-block;margin:20px 0;background:#8B6CFF;color:#fff;font-weight:700;
       padding:13px 22px;border-radius:12px}
  .cta:hover{text-decoration:none;filter:brightness(1.08)}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin:10px 0 4px}
  .card{display:flex;align-items:center;gap:9px;background:#2D1F52;border:1px solid #3a2a5e;
        border-radius:10px;padding:8px 10px;font-size:14px;color:#F5F3FF}
  .card img{width:30px;height:20px;object-fit:cover;border-radius:3px;flex-shrink:0}
  footer{margin-top:40px;padding-top:18px;border-top:1px solid #3a2a5e;font-size:13px;color:#B8A9E0}
  footer a{margin-right:14px}
</style>
</head>
<body>
<div class="wrap">
${body}
<footer>
  <a href="/">Play Globalio</a><a href="/flags/">All flags</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a>
  <p style="margin-top:12px">© Globalio — learn every flag in the world.</p>
</footer>
</div>
</body>
</html>
`
}

// ── per-country pages: /flags/<code>/ ────────────────────────────────────────
function countryPage(flag) {
  const capital = CAPITAL.get(flag.code)
  const confusable = flag.confusableWith
    .map(c => BY_CODE.get(c))
    .filter(Boolean)
  const title = `${flag.name} Flag — meaning, colors & facts | Globalio`
  const description = `The flag of ${flag.name}: ${flag.distinguishingTip}`.slice(0, 230)
  const body = `
<header><nav><a href="/">Home</a> › <a href="/flags/">Flags</a> › ${esc(flag.name)}</nav></header>
<h1>Flag of ${esc(flag.name)}</h1>
<p class="muted">${esc(flag.region)}${capital ? ` · Capital: ${esc(capital)}` : ''}</p>
<img class="flag" src="${flag.flagUrl}" width="340" height="227" alt="Flag of ${esc(flag.name)}" loading="lazy" />
<ul class="facts">
  <li><b>Country:</b> ${esc(flag.name)}</li>
  <li><b>Region:</b> ${esc(flag.region)}</li>
  ${capital ? `<li><b>Capital:</b> ${esc(capital)}</li>` : ''}
  <li><b>Country code:</b> ${esc(flag.code)}</li>
</ul>
<h2>How to recognise it</h2>
<p>${esc(flag.distinguishingTip)}</p>
<h2>Did you know?</h2>
<p>${esc(flag.funFact)}</p>
${confusable.length ? `<h2>Easily confused with</h2>
<p class="muted">${esc(flag.name)}'s flag is often mixed up with these — learn to tell them apart:</p>
<div class="grid">
${confusable.map(c => `<a class="card" href="/flags/${slug(c.code)}/"><img src="${c.flagUrl}" alt="Flag of ${esc(c.name)}" loading="lazy" /> ${esc(c.name)}</a>`).join('\n')}
</div>` : ''}
<a class="cta" href="/">▶ Play Globalio — learn ${esc(flag.name)}'s flag and every other</a>
`
  return page({ title, description, canonical: `${ORIGIN}/flags/${slug(flag.code)}/`, body })
}

// ── hub page: /flags/ ────────────────────────────────────────────────────────
function hubPage() {
  const byRegion = REGIONS.map(region => ({
    region,
    flags: FLAGS.filter(f => f.region === region).sort((a, b) => a.name.localeCompare(b.name)),
  }))
  const body = `
<header><nav><a href="/">Home</a> › Flags</nav></header>
<h1>Flags of the World</h1>
<p class="muted">Browse the flags of all ${FLAGS.length} countries, grouped by region.
Each flag has its colours, meaning, capital and a fact — then test yourself in
the <a href="/">Globalio</a> flag game.</p>
${byRegion.map(({ region, flags }) => `
<h2>${esc(region)} <span class="muted" style="font-size:14px;font-weight:400">(${flags.length})</span></h2>
<div class="grid">
${flags.map(f => `<a class="card" href="/flags/${slug(f.code)}/"><img src="${f.flagUrl}" alt="Flag of ${esc(f.name)}" loading="lazy" /> ${esc(f.name)}</a>`).join('\n')}
</div>`).join('\n')}
<a class="cta" href="/">▶ Play Globalio</a>
`
  return page({
    title: `Flags of the World — All ${FLAGS.length} Country Flags | Globalio`,
    description: `Browse and learn the flags of all ${FLAGS.length} countries of the world, grouped by region, with colours, capitals and facts. Free flag game — no sign-up.`,
    canonical: `${ORIGIN}/flags/`,
    body,
  })
}

// ── sitemap ──────────────────────────────────────────────────────────────────
function sitemap() {
  const urls = [
    { loc: `${ORIGIN}/`, priority: '1.0', freq: 'daily' },
    { loc: `${ORIGIN}/flags/`, priority: '0.9', freq: 'weekly' },
    ...FLAGS.map(f => ({ loc: `${ORIGIN}/flags/${slug(f.code)}/`, priority: '0.7', freq: 'monthly' })),
    { loc: `${ORIGIN}/privacy.html`, priority: '0.3', freq: 'monthly' },
    { loc: `${ORIGIN}/terms.html`, priority: '0.3', freq: 'monthly' },
  ]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}
</urlset>
`
}

// ── write everything ─────────────────────────────────────────────────────────
if (!fs.existsSync(DIST)) {
  console.error('[prerender] dist/ not found — run `vite build` first.')
  process.exit(1)
}

fs.mkdirSync(path.join(DIST, 'flags'), { recursive: true })
fs.writeFileSync(path.join(DIST, 'flags', 'index.html'), hubPage())

let n = 0
for (const flag of FLAGS) {
  const dir = path.join(DIST, 'flags', slug(flag.code))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), countryPage(flag))
  n++
}

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap())

console.log(`[prerender] wrote ${n} country pages + hub + sitemap (${FLAGS.length + 2} URLs).`)
