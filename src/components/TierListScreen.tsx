import { useState, useEffect } from 'react'
import { FLAGS, REGIONS, getFlagsByRegion } from '../data/flags'
import type { Region } from '../data/flags'

interface Props { onBack: () => void }

type TierId = 'S' | 'A' | 'B' | 'C' | 'D' | 'F'
const TIERS: { id: TierId; color: string }[] = [
  { id: 'S', color: '#F43F5E' },
  { id: 'A', color: '#FB923C' },
  { id: 'B', color: '#FBBF24' },
  { id: 'C', color: '#34D399' },
  { id: 'D', color: '#38BDF8' },
  { id: 'F', color: '#8B6CFF' },
]
const POOL = 'pool'

type RegionChoice = 'World' | Region
const REGION_OPTS: RegionChoice[] = ['World', ...REGIONS]

const keyFor = (r: RegionChoice) => `globalio_tierlist_${r}`
function loadPlacement(r: RegionChoice): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(keyFor(r)) ?? '{}') } catch { return {} }
}

export default function TierListScreen({ onBack }: Props) {
  const [region, setRegion] = useState<RegionChoice>('Europe')
  const [placement, setPlacement] = useState<Record<string, string>>(() => loadPlacement('Europe'))
  const [selected, setSelected] = useState<string | null>(null)
  const [dragged, setDragged] = useState<string | null>(null)

  const flags = region === 'World' ? FLAGS : getFlagsByRegion(region as Region)

  // Load this region's saved list whenever the region changes.
  useEffect(() => { setPlacement(loadPlacement(region)); setSelected(null) }, [region])
  // Persist on every change.
  useEffect(() => { localStorage.setItem(keyFor(region), JSON.stringify(placement)) }, [placement, region])

  const place = (code: string, tier: string) => {
    setPlacement(p => ({ ...p, [code]: tier }))
    setSelected(null)
  }

  // When a tier (or the pool) is tapped while a flag is selected, move it there.
  const tapZone = (tier: string) => { if (selected) place(selected, tier) }

  const flagsIn = (tier: string) =>
    flags.filter(f => (placement[f.code] ?? POOL) === tier)

  const resetAll = () => { setPlacement({}); setSelected(null) }

  const FlagChip = ({ code, url, name }: { code: string; url: string; name: string }) => (
    <div
      draggable
      onDragStart={() => setDragged(code)}
      onDragEnd={() => setDragged(null)}
      onClick={() => setSelected(s => (s === code ? null : code))}
      title={name}
      style={{
        position: 'relative', cursor: 'grab', borderRadius: 5, overflow: 'hidden',
        outline: selected === code ? '2px solid #fff' : '1px solid #00000040',
        boxShadow: selected === code ? '0 0 10px #ffffffaa' : 'none',
        flexShrink: 0, lineHeight: 0,
      }}
    >
      <img src={url} alt={name} width={42} height={28}
        style={{ display: 'block', objectFit: 'cover', width: 42, height: 28 }}
        onError={e => { (e.target as HTMLImageElement).style.opacity = '0.25' }} />
    </div>
  )

  const dropProps = (tier: string) => ({
    onDragOver: (e: React.DragEvent) => e.preventDefault(),
    onDrop: () => { if (dragged) place(dragged, tier) },
    onClick: () => tapZone(tier),
  })

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)', position: 'relative', zIndex: 1 }}>
      <header className="flex items-center gap-3 px-5 pt-8 pb-3">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full text-xl"
          style={{ background: '#2D1F52', color: '#B8A9E0' }}>‹</button>
        <div className="flex-1">
          <h1 className="text-xl font-black" style={{ color: '#F5F3FF' }}>Tier List Maker</h1>
          <div className="text-xs" style={{ color: '#B8A9E0' }}>Drag flags into tiers — or tap a flag, then tap a tier</div>
        </div>
        <button onClick={resetAll} className="px-3 h-9 rounded-full text-xs font-bold"
          style={{ background: '#2D1F52', border: '1px solid #F43F5E44', color: '#F43F5E', cursor: 'pointer' }}>Reset</button>
      </header>

      {/* Region selector */}
      <div className="px-5 pb-2" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {REGION_OPTS.map(r => (
          <button key={r} onClick={() => setRegion(r)}
            style={{
              padding: '4px 11px', borderRadius: 999, fontSize: 12, fontWeight: 600,
              border: `1px solid ${region === r ? '#8B6CFF' : '#8B6CFF33'}`,
              background: region === r ? '#8B6CFF33' : 'transparent',
              color: region === r ? '#A78BFA' : '#B8A9E0', cursor: 'pointer',
            }}>{r}</button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-6">
        {/* Tier rows */}
        {TIERS.map(t => (
          <div key={t.id} style={{ display: 'flex', marginBottom: 6, minHeight: 46, borderRadius: 8, overflow: 'hidden', border: '1px solid #00000030' }}>
            <div
              {...dropProps(t.id)}
              style={{
                width: 46, flexShrink: 0, background: t.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: 22, color: '#1A1033', cursor: selected ? 'pointer' : 'default',
              }}>{t.id}</div>
            <div
              {...dropProps(t.id)}
              style={{
                flex: 1, background: '#2D1F52', display: 'flex', flexWrap: 'wrap', gap: 4,
                alignContent: 'flex-start', padding: 5, minHeight: 46,
              }}>
              {flagsIn(t.id).map(f => <FlagChip key={f.code} code={f.code} url={f.flagUrl} name={f.name} />)}
            </div>
          </div>
        ))}

        {/* Unranked pool */}
        <div style={{ marginTop: 14 }}>
          <div className="text-xs font-semibold uppercase tracking-widest mb-2 px-1" style={{ color: '#B8A9E0' }}>
            Unranked {selected ? '· tap a tier to place the selected flag' : `· ${flagsIn(POOL).length} left`}
          </div>
          <div {...dropProps(POOL)}
            style={{
              background: '#1A1033', borderRadius: 12, border: '1px dashed #8B6CFF44',
              display: 'flex', flexWrap: 'wrap', gap: 5, padding: 8, minHeight: 70,
            }}>
            {flagsIn(POOL).map(f => <FlagChip key={f.code} code={f.code} url={f.flagUrl} name={f.name} />)}
            {flagsIn(POOL).length === 0 && (
              <div style={{ color: '#8B6CFF66', fontSize: 13, padding: 8 }}>Every flag has been ranked! 🎉</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
