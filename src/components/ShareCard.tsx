import type { ShareResult } from "../utils/storage"

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
    'globalio.netlify.app',
  ].filter(l => l !== undefined)
  return lines.join('\n').replace(/\n\n\n/g, '\n\n')
}

export default function ShareCard({ result, showCopyButton = true }: Props) {
  const { game, score, emojiGrid, date, streak } = result
  const accent = pctColor(emojiGrid)

  const handleCopy = async () => {
    const text = shareText(result)
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      alert(text)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Card */}
      <div
        id="share-card"
        style={{
          width: '100%', maxWidth: 320,
          background: 'linear-gradient(145deg, #110728 0%, #1E0D42 40%, #2A1155 70%, #120930 100%)',
          border: `1px solid ${accent}44`,
          borderRadius: 20,
          padding: '20px 20px 18px',
          boxShadow: `0 0 40px ${accent}22, 0 0 0 1px #ffffff08 inset`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* subtle star dots */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #ffffff18 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.4,
        }} />

        {/* Top row: logo + game name */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontSize: 20 }}>🌍</span>
            <span style={{ color: '#F5F3FF', fontWeight: 900, fontSize: 15, letterSpacing: '-0.3px' }}>Globalio</span>
          </div>
          <span style={{ color: '#B8A9E0', fontSize: 11, fontWeight: 600 }}>{formatDate(date)}</span>
        </div>

        {/* Game label */}
        <div style={{
          fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: accent, marginBottom: 10, position: 'relative',
        }}>
          {game}
        </div>

        {/* Emoji grid */}
        {emojiGrid.length > 0 && (
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14,
            justifyContent: emojiGrid.length <= 10 ? 'flex-start' : 'center',
            position: 'relative',
          }}>
            {emojiGrid.map((e, i) => (
              <span key={i} style={{ fontSize: 22, lineHeight: 1 }}>{e}</span>
            ))}
          </div>
        )}

        {/* Score */}
        <div style={{
          fontSize: 32, fontWeight: 900, color: '#F5F3FF',
          letterSpacing: '-1px', marginBottom: 4, position: 'relative',
          textShadow: `0 0 20px ${accent}66`,
        }}>
          {score}
        </div>

        {/* Streak */}
        {streak ? (
          <div style={{ fontSize: 13, color: '#FBBF24', fontWeight: 700, marginBottom: 10, position: 'relative' }}>
            🔥 {streak} day streak
          </div>
        ) : <div style={{ marginBottom: 10 }} />}

        {/* Divider */}
        <div style={{
          width: '100%', height: 1,
          background: `linear-gradient(90deg, transparent, ${accent}44, transparent)`,
          marginBottom: 10, position: 'relative',
        }} />

        {/* Footer */}
        <div style={{ fontSize: 11, color: '#8B6CFF88', fontWeight: 600, letterSpacing: '0.05em', position: 'relative' }}>
          globalio.netlify.app
        </div>
      </div>

      {showCopyButton && (
        <button
          onClick={handleCopy}
          className="w-full max-w-xs py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg,#8B6CFF,#A78BFA)', color: '#fff' }}
        >
          📋 Copy Result
        </button>
      )}
      <p style={{ fontSize: 11, color: '#8B6CFF66', textAlign: 'center' }}>
        Screenshot to share
      </p>
    </div>
  )
}
