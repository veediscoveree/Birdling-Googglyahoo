import { useState, useMemo } from 'react'
import { XC_V3, getXcKey, buildXcQuery } from '../hooks/useXenoCantoAudio'

// ──────────────────────────────────────────────────────────────────────────
// Developer panel — summon any bird or Easter Egg on demand, jump screens.
// Purpose: review changes instantly instead of grinding random encounters.
// Toggled from App via ?dev=1 or tapping the version badge 5×.
// ──────────────────────────────────────────────────────────────────────────

const RARITY_ORDER = { common: 0, uncommon: 1, rare: 2, very_rare: 3, legendary: 4 }
const RARITY_COLOR = {
  common: '#8a9a7a', uncommon: '#5ab0e0', rare: '#c88ae0',
  very_rare: '#e0a020', legendary: '#e05050',
}

// ── Audio-source diagnostics ──────────────────────────────────────────────
// v2 is retired and the public proxies are dead; v3 needs a key but is
// CORS-direct. These probes test v3 (with the key) across query formats and
// reveal the response shape, so we can confirm audio works from the device.
function v3Url(query, key) {
  return `${XC_V3}?${new URLSearchParams({ query, key })}`
}
async function probeUrl(label, url, key) {
  const t0 = Date.now()
  if (!key) return { label, ok: false, status: 'no-key', ms: 0, n: '—', keys: '', fileUrl: '',
    snippet: 'paste a xeno-canto key above first' }
  try {
    const res  = await fetch(url)
    const text = await res.text()
    let n = '—', keys = '', fileUrl = ''
    try {
      const j  = JSON.parse(text)
      n = j.numRecordings ?? (j.recordings ? j.recordings.length : '—')
      const r0 = j.recordings && j.recordings[0]
      if (r0) {
        keys = Object.keys(r0).join(',')
        fileUrl = r0.file || r0['file-name'] || r0.url || r0.audio || (r0.sono && r0.sono.full) || ''
      }
    } catch {}
    return { label, ok: res.ok && n !== '—' && n !== 0 && n !== '0', status: String(res.status),
      ms: Date.now() - t0, n, keys, fileUrl, snippet: text.slice(0, 90).replace(/\s+/g, ' ') }
  } catch (e) {
    return { label, ok: false, status: 'ERR', ms: Date.now() - t0, n: '—', keys: '', fileUrl: '',
      snippet: `${e.name || 'Error'}: ${(e.message || '').slice(0, 70)}` }
  }
}

const box = {
  background: 'rgba(10,16,10,0.96)',
  border: '1px solid rgba(245,166,35,0.45)',
  borderRadius: 10,
  boxShadow: '0 6px 24px rgba(0,0,0,0.5)',
  fontFamily: 'monospace',
  color: '#e8f0e0',
}

export default function DevPanel({
  birds, eggs, open, onToggleOpen,
  onSummonBird, onTriggerEgg,
  onGoRadar, onGoAviary, onGoLeaderboard, onExit,
}) {
  const [query, setQuery]   = useState('')
  const [rarity, setRarity] = useState('all')
  const [diag, setDiag]     = useState(null)
  const [diagRunning, setDiagRunning] = useState(false)
  const [xcKey, setXcKey]   = useState(() => getXcKey())

  const saveXcKey = (v) => {
    setXcKey(v)
    try { v ? localStorage.setItem('bhn_xc_key', v.trim()) : localStorage.removeItem('bhn_xc_key') } catch {}
  }

  const runAudioDiag = async () => {
    setDiagRunning(true)
    setDiag([])
    const key = getXcKey()
    const probes = [
      ['v3 gen/sp',  v3Url(buildXcQuery('Cardinalis cardinalis', 'song'), key)],
      ['v3 sp:full', v3Url('sp:"Cardinalis cardinalis"', key)],
      ['v3 freetext', v3Url('Cardinalis cardinalis', key)],
    ]
    const results = []
    for (const [label, url] of probes) {
      const r = await probeUrl(label, url, key)
      results.push(r)
      setDiag([...results])
    }
    setDiagRunning(false)
  }

  const sorted = useMemo(() => {
    return [...birds].sort((a, b) => {
      const r = (RARITY_ORDER[a.rarity] ?? 0) - (RARITY_ORDER[b.rarity] ?? 0)
      return r !== 0 ? r : a.commonName.localeCompare(b.commonName)
    })
  }, [birds])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sorted.filter(b => {
      if (rarity !== 'all' && b.rarity !== rarity) return false
      if (!q) return true
      return b.commonName.toLowerCase().includes(q) ||
             (b.scientificName || '').toLowerCase().includes(q)
    })
  }, [sorted, query, rarity])

  const rarities = useMemo(() => {
    const set = new Set(birds.map(b => b.rarity).filter(Boolean))
    return ['all', ...[...set].sort((a, b) => (RARITY_ORDER[a] ?? 0) - (RARITY_ORDER[b] ?? 0))]
  }, [birds])

  if (!open) {
    return (
      <button onClick={onToggleOpen} style={{
        ...box, position: 'fixed', top: 8, left: 8, zIndex: 10000,
        padding: '6px 10px', fontSize: 11, cursor: 'pointer',
        color: '#f5a623', fontWeight: 700, letterSpacing: 1,
      }}>DEV ▸</button>
    )
  }

  const btn = {
    background: 'rgba(245,166,35,0.12)', color: '#f5d08a',
    border: '1px solid rgba(245,166,35,0.35)', borderRadius: 6,
    padding: '6px 8px', fontSize: 11, fontFamily: 'monospace',
    cursor: 'pointer', flex: 1, minWidth: 0,
  }

  return (
    <div style={{
      ...box, position: 'fixed', top: 8, left: 8, zIndex: 10000,
      width: 'min(300px, calc(100vw - 16px))',
      maxHeight: 'calc(100vh - 16px)', display: 'flex', flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 10px', borderBottom: '1px solid rgba(245,166,35,0.25)',
      }}>
        <span style={{ color: '#f5a623', fontWeight: 700, fontSize: 12, letterSpacing: 1 }}>
          🐦 DEV MODE
        </span>
        <span style={{ display: 'flex', gap: 6 }}>
          <button onClick={onToggleOpen} title="Collapse" style={{
            ...btn, flex: 'none', padding: '3px 8px',
          }}>▾</button>
          <button onClick={onExit} title="Exit dev mode" style={{
            ...btn, flex: 'none', padding: '3px 8px',
            color: '#e88', borderColor: 'rgba(230,120,120,0.4)',
            background: 'rgba(230,80,80,0.12)',
          }}>✕</button>
        </span>
      </div>

      <div style={{ padding: 10, overflowY: 'auto' }}>
        {/* Screen jumps */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          <button style={btn} onClick={onGoRadar}>Radar</button>
          <button style={btn} onClick={onGoAviary}>Aviary</button>
          <button style={btn} onClick={onGoLeaderboard}>Leaders</button>
        </div>

        {/* Audio key + diagnostics */}
        <div style={{ fontSize: 10, color: '#9ab088', letterSpacing: 1, margin: '2px 0 5px' }}>
          XENO-CANTO KEY (for bird sounds)
        </div>
        <input
          value={xcKey}
          onChange={e => saveXcKey(e.target.value)}
          placeholder="paste your xeno-canto API key…"
          autoCapitalize="off" autoCorrect="off" spellCheck={false}
          style={{
            width: '100%', boxSizing: 'border-box', marginBottom: 6,
            background: 'rgba(0,0,0,0.4)', border: `1px solid ${xcKey ? 'rgba(61,220,127,0.4)' : 'rgba(255,255,255,0.15)'}`,
            borderRadius: 6, padding: '6px 8px', color: '#e8f0e0',
            fontFamily: 'monospace', fontSize: 11,
          }}
        />
        <div style={{ fontSize: 9.5, color: '#8a9a7a', marginBottom: 6 }}>
          {xcKey ? '✓ key saved on this device' : 'Get a free key at xeno-canto.org → your account → API'}
        </div>
        <button onClick={runAudioDiag} disabled={diagRunning} style={{
          ...btn, width: '100%', flex: 'none', marginBottom: 6,
          opacity: diagRunning ? 0.6 : 1,
        }}>{diagRunning ? 'probing…' : '🎵 Test audio (v3)'}</button>
        {diag && (
          <div style={{
            fontSize: 9.5, lineHeight: 1.35, marginBottom: 12,
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: 7,
            background: 'rgba(0,0,0,0.3)',
          }}>
            {diag.length === 0 && <div style={{ color: '#9ab088' }}>running…</div>}
            {diag.map((r, i) => (
              <div key={i} style={{ marginBottom: 6, wordBreak: 'break-word' }}>
                <span style={{ color: r.ok ? '#6fe0a0' : '#e88' }}>
                  {r.ok ? '✓' : '✗'} {r.label}
                </span>
                <span style={{ color: '#8a9a7a' }}> · {r.status} · n={r.n} · {r.ms}ms</span>
                {r.keys && <div style={{ color: '#8ab0d0' }}>fields: {r.keys}</div>}
                {r.fileUrl && <div style={{ color: '#6fe0a0', opacity: 0.85 }}>file: {r.fileUrl.slice(0, 80)}</div>}
                {!r.ok && <div style={{ color: '#aab', opacity: 0.75 }}>{r.snippet}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Easter Eggs */}
        <div style={{ fontSize: 10, color: '#9ab088', letterSpacing: 1, margin: '2px 0 5px' }}>
          EASTER EGGS
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {eggs.map(egg => (
            <button key={egg.id} onClick={() => onTriggerEgg(egg)} style={{
              ...btn, flex: '1 1 45%',
              background: 'rgba(200,164,23,0.14)', borderColor: 'rgba(200,164,23,0.4)',
            }}>{(egg.name.split(' ').slice(-1)[0] || egg.name).replace(/[^A-Za-z]/g, '')}</button>
          ))}
        </div>

        {/* Bird summon */}
        <div style={{ fontSize: 10, color: '#9ab088', letterSpacing: 1, margin: '2px 0 5px' }}>
          SUMMON BIRD ({filtered.length})
        </div>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="search species…"
          style={{
            width: '100%', boxSizing: 'border-box', marginBottom: 6,
            background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 6, padding: '6px 8px', color: '#e8f0e0',
            fontFamily: 'monospace', fontSize: 12,
          }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
          {rarities.map(r => (
            <button key={r} onClick={() => setRarity(r)} style={{
              background: rarity === r ? 'rgba(245,166,35,0.3)' : 'transparent',
              color: r === 'all' ? '#ccc' : (RARITY_COLOR[r] || '#ccc'),
              border: `1px solid ${rarity === r ? 'rgba(245,166,35,0.6)' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: 5, padding: '3px 7px', fontSize: 10,
              fontFamily: 'monospace', cursor: 'pointer',
            }}>{r.replace('_', ' ')}</button>
          ))}
        </div>

        <div style={{
          maxHeight: 260, overflowY: 'auto',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6,
        }}>
          {filtered.map(b => (
            <div key={b.id} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '5px 7px', borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                background: RARITY_COLOR[b.rarity] || '#888',
              }}/>
              <span style={{ flex: 1, fontSize: 11, minWidth: 0, overflow: 'hidden',
                textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {b.commonName}
              </span>
              <button onClick={() => onSummonBird(b)} title="See encounter" style={{
                ...btn, flex: 'none', padding: '3px 7px', fontSize: 10,
              }}>👁</button>
              <button onClick={() => onSummonBird(b, { straightToCapture: true })}
                title="Straight to capture" style={{
                ...btn, flex: 'none', padding: '3px 7px', fontSize: 10,
                background: 'rgba(61,220,127,0.14)', borderColor: 'rgba(61,220,127,0.4)',
                color: '#8fe0b0',
              }}>🔭</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
