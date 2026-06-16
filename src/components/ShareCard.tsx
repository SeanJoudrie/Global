import { useState } from 'react'
import { Globe2, Flame, Share2 } from 'lucide-react'
import { toPng } from 'html-to-image'
import type { ShareResult } from "../utils/storage"
import { T, FONT, tint, IS_CARTO } from "../ui/tokens"

interface Props {
  result: ShareResult
  showCopyButton?: boolean
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[m - 1]} ${d}, ${y}`
}

function pctColor(grid: string[]): string {
  if (!grid.length) return '#A78BFA'
  const correct = grid.filter(e => e === '🟩').length
  const pct = correct / grid.length
  if (pct >= 0.9) return '#FBBF24'
  if (pct >= 0.7) return '#34D399'
  if (pct >= 0.5) return '#A78BFA'
  return '#F87171'
}

export function shareText(result: ShareResult): string {
  const grid = result.emojiGrid.join('')
  const lines = [
    `🌍 Globalio — ${result.game}`,
    `${result.date}`,
    '',
    grid,
    '',
    `Score: ${result.score}`,
    result.streak ? `🔥 ${result.streak} day streak` : '',
    '',
    'globalio.app',
  ].filter(l => l !== undefined)
  return lines.join('\n').replace(/\n\n\n/g, '\n\n')
}

export default function ShareCard({ result, showCopyButton = true }: Props) {
  const { game, score, emojiGrid, date, streak } = result
  // Cartographer: the card is parchment with ochre accents; the original skin
  // keeps its score-graded deep-space accent.
  const accent = IS_CARTO ? T.amber : pctColor(emojiGrid)

  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState(false)

  // Smart share cascade, best → simplest:
  //   1. Native share sheet WITH the rendered card as a PNG (Instagram, X,
  //      Messages…) — the real viral path on mobile.
  //   2. Native share sheet, text only.
  //   3. Clipboard copy (desktop / unsupported browsers).
  const handleShare = async () => {
    if (busy) return
    const text = shareText(result)
    setBusy(true)
    try {
      const node = document.getElementById('share-card')
      const canShareFiles = typeof navigator !== 'undefined' && !!navigator.canShare
      if (node && canShareFiles) {
        try {
          const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true })
          const blob = await (await fetch(dataUrl)).blob()
          const file = new File([blob], `globalio-${date}.png`, { type: 'image/png' })
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], text })
            return
          }
        } catch (e) {
          if ((e as Error)?.name === 'AbortError') return // user cancelled
          // otherwise fall through to text/clipboard
        }
      }
      if (typeof navigator !== 'undefined' && navigator.share) {
        try { await navigator.share({ text }); return }
        catch (e) { if ((e as Error)?.name === 'AbortError') return }
      }
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      alert(text)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Card */}
      <div
        id="share-card"
        style={{
          width: '100%', maxWidth: 320,
          background: IS_CARTO
            ? 'linear-gradient(160deg, #FBF4E4, #F3E8CE)'
            : 'linear-gradient(145deg, #110728 0%, #1E0D42 40%, #2A1155 70%, #120930 100%)',
          border: IS_CARTO ? `1px solid ${tint(accent, 0.45)}` : `1px solid ${accent}44`,
          borderRadius: 20,
          padding: '20px 20px 18px',
          boxShadow: IS_CARTO
            ? `0 10px 28px -18px ${tint(T.text, 0.55)}, 0 0 0 1px ${tint(accent, 0.1)} inset`
            : `0 0 40px ${accent}22, 0 0 0 1px #ffffff08 inset`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* subtle dot texture (stars on deep-space, stippling on parchment) */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: IS_CARTO
            ? `radial-gradient(circle, ${tint(T.text, 0.1)} 1px, transparent 1px)`
            : 'radial-gradient(circle, #ffffff18 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.4,
        }} />

        {/* Top row: logo + game name */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            {IS_CARTO
              ? <Globe2 size={19} color={T.text} strokeWidth={1.6} absoluteStrokeWidth />
              : <span style={{ fontSize: 20 }}>🌍</span>}
            <span style={{
              color: IS_CARTO ? T.text : '#F5F3FF', fontWeight: 900, fontSize: 15, letterSpacing: '-0.3px',
              ...(IS_CARTO ? { fontFamily: FONT.display, fontWeight: 800 } : {}),
            }}>Globalio</span>
          </div>
          <span style={{ color: IS_CARTO ? T.muted : '#B8A9E0', fontSize: 11, fontWeight: 600 }}>{formatDate(date)}</span>
        </div>

        {/* Game label */}
        <div style={{
          fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: accent, marginBottom: 10, position: 'relative',
        }}>
          {game}
        </div>

        {/* Answer grid (emoji on deep-space; ink-friendly dots on parchment) */}
        {emojiGrid.length > 0 && (
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14,
            justifyContent: emojiGrid.length <= 10 ? 'flex-start' : 'center',
            position: 'relative',
          }}>
            {emojiGrid.map((e, i) => (
              IS_CARTO
                ? <span key={i} style={{
                    width: 20, height: 20, borderRadius: 5, display: 'inline-block',
                    background: e === '🟩' ? T.green : T.danger,
                    border: `1px solid ${tint(T.text, 0.15)}`,
                  }} />
                : <span key={i} style={{ fontSize: 22, lineHeight: 1 }}>{e}</span>
            ))}
          </div>
        )}

        {/* Score */}
        <div style={{
          fontSize: 32, fontWeight: 900, color: IS_CARTO ? T.text : '#F5F3FF',
          letterSpacing: '-1px', marginBottom: 4, position: 'relative',
          textShadow: IS_CARTO ? 'none' : `0 0 20px ${accent}66`,
          ...(IS_CARTO ? { fontFamily: FONT.mono } : {}),
        }}>
          {score}
        </div>

        {/* Streak */}
        {streak ? (
          <div style={{
            fontSize: 13, color: IS_CARTO ? T.amber : '#FBBF24', fontWeight: 700, marginBottom: 10, position: 'relative',
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            {IS_CARTO
              ? <Flame size={14} color={T.amber} strokeWidth={1.6} absoluteStrokeWidth />
              : <span>🔥</span>}
            {streak} day streak
          </div>
        ) : <div style={{ marginBottom: 10 }} />}

        {/* Divider */}
        <div style={{
          width: '100%', height: 1,
          background: `linear-gradient(90deg, transparent, ${IS_CARTO ? tint(accent, 0.5) : `${accent}44`}, transparent)`,
          marginBottom: 10, position: 'relative',
        }} />

        {/* Footer */}
        <div style={{ fontSize: 11, color: IS_CARTO ? T.muted : '#8B6CFF88', fontWeight: 600, letterSpacing: '0.05em', position: 'relative' }}>
          globalio.app
        </div>
      </div>

      {showCopyButton && (
        <button
          onClick={handleShare}
          disabled={busy}
          className="w-full max-w-xs py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
          style={{
            background: IS_CARTO ? T.amber : 'linear-gradient(135deg,#8B6CFF,#A78BFA)',
            color: T.onAccent, opacity: busy ? 0.7 : 1,
          }}
        >
          <Share2 size={15} color={T.onAccent} strokeWidth={1.6} absoluteStrokeWidth />
          {busy ? 'Sharing…' : copied ? 'Copied! ✓' : 'Share result'}
        </button>
      )}
      <p style={{ fontSize: 11, color: T.dim, textAlign: 'center' }}>
        Shares the card image — or screenshot it
      </p>
    </div>
  )
}
