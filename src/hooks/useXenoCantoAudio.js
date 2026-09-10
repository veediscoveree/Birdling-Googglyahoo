// Fetches bird sound recordings from xeno-canto.org — API v3.
//
// The old keyless API v2 was permanently retired in 2025. API v3 requires a
// free key but IS CORS-enabled, so the browser can fetch it directly (no proxy).
//
// Key resolution order:
//   1. ?xckey=... in the URL (also saved to localStorage for convenience)
//   2. VITE_XENOCANTO_KEY baked in at build time (production)
//   3. localStorage 'bhn_xc_key' (pasted via the dev panel while testing)
//
// Results are persisted in localStorage (7-day TTL) for instant repeat loads.

import { useState, useEffect, useRef } from 'react'

export const XC_V3 = 'https://xeno-canto.org/api/3/recordings'
const LS_PREFIX = 'bhn_xc3_'   // v3 cache namespace
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000   // 7 days

// ── Key resolution ────────────────────────────────────────────────────────────
export function getXcKey() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('xckey')
    if (fromUrl) { try { localStorage.setItem('bhn_xc_key', fromUrl) } catch {} ; return fromUrl }
  } catch {}
  const fromEnv = (import.meta.env && import.meta.env.VITE_XENOCANTO_KEY) || ''
  if (fromEnv) return fromEnv
  try { return localStorage.getItem('bhn_xc_key') || '' } catch { return '' }
}

// ── v3 query builder (tag-based) ──────────────────────────────────────────────
// v3 replaced free-text species search with field tags. We split the scientific
// name into genus + species epithet: e.g. "Cardinalis cardinalis" →
// gen:"Cardinalis" sp:"cardinalis".
export function buildXcQuery(scientificName, type) {
  const parts = (scientificName || '').trim().split(/\s+/)
  let q = parts.length >= 2 ? `gen:"${parts[0]}" sp:"${parts[1]}"` : (scientificName || '')
  if (type) q += ` type:${type}`
  return q
}

// ── localStorage helpers ──────────────────────────────────────────────────────
function lsGet(key) {
  try {
    const raw = localStorage.getItem(LS_PREFIX + key)
    if (!raw) return null
    const { data, ts } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL) { localStorage.removeItem(LS_PREFIX + key); return null }
    return data
  } catch { return null }
}
function lsSet(key, data) {
  try { localStorage.setItem(LS_PREFIX + key, JSON.stringify({ data, ts: Date.now() })) } catch {}
}

const memCache = {}

// ── Length parser: "1:32" → 92 ────────────────────────────────────────────────
function parseSeconds(lengthStr) {
  if (!lengthStr) return 0
  const parts = String(lengthStr).split(':').map(Number)
  return parts.length === 2 ? parts[0] * 60 + (parts[1] || 0) : parts[0] || 0
}

const QUALITY_RANK = { A: 1, B: 2, C: 3, D: 4, E: 5 }

export function pickBestSong(songs, minSec = 10) {
  if (!songs?.length) return null
  const ranked = [...songs].sort(
    (a, b) => (QUALITY_RANK[a.quality] || 9) - (QUALITY_RANK[b.quality] || 9)
  )
  return ranked.find(s => parseSeconds(s.length) > minSec) || ranked[0] || null
}

// ── Response parser — tolerant of v3 field-name variations ────────────────────
export function parseXCResponse(data) {
  return (data.recordings || []).slice(0, 12).map(r => {
    const raw = r.file || r['file-name'] || r.url || r.audio ||
                (r.sono && (r.sono.full || r.sono.large)) || null
    const url = raw ? (String(raw).startsWith('//') ? `https:${raw}` : String(raw)) : null
    return {
      id:        String(r.id),
      url,
      type:      r.type || '',
      length:    r.length || r.len || '',
      quality:   r.q || r.quality || '',
      location:  r.loc || '',
      country:   r.cnt || '',
      date:      r.date || '',
      recordist: r.rec || '',
      license:   r.lic || '',
      xcUrl:     `https://xeno-canto.org/${r.id}`,
    }
  }).filter(r => r.url)
}

// ── Fetcher (v3, direct, keyed) ───────────────────────────────────────────────
async function fetchRecordings(scientificName, type) {
  const key = getXcKey()
  if (!key) return []
  const query    = buildXcQuery(scientificName, type)
  const cacheKey = `${query}`

  if (memCache[cacheKey]) return memCache[cacheKey]
  const persisted = lsGet(cacheKey)
  if (persisted) { memCache[cacheKey] = persisted; return persisted }

  const url = `${XC_V3}?${new URLSearchParams({ query, key })}`
  let recs = []
  try {
    const res = await fetch(url)
    if (res.ok) recs = parseXCResponse(await res.json())
    else console.warn('[XC v3]', res.status, 'for', query)
  } catch (e) {
    console.warn('[XC v3] fetch failed for', query, '—', e.message)
  }

  if (recs.length > 0) {
    memCache[cacheKey] = recs
    lsSet(cacheKey, recs)
  }
  return recs
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useXenoCantoAudio(xenoCantoSpecies) {
  const [songs, setSongs]       = useState([])
  const [calls, setCalls]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [apiError, setApiError] = useState(false)
  const [noKey, setNoKey]       = useState(!getXcKey())
  const [playing, setPlaying]   = useState(null)
  const audioRef = useRef(null)

  useEffect(() => {
    if (!xenoCantoSpecies) { setLoading(false); return }
    if (!getXcKey()) { setNoKey(true); setLoading(false); return }
    setNoKey(false)
    let cancelled = false
    setLoading(true)

    Promise.all([
      fetchRecordings(xenoCantoSpecies, 'song'),
      fetchRecordings(xenoCantoSpecies, 'call'),
    ]).then(async ([songRecs, callRecs]) => {
      if (songRecs.length === 0 && callRecs.length === 0) {
        const all = await fetchRecordings(xenoCantoSpecies, '')
        songRecs = all.slice(0, 8)
        if (all.length === 0 && !cancelled) setApiError(true)
      }
      if (!cancelled) {
        setSongs(songRecs)
        setCalls(callRecs)
        setLoading(false)
      }
    }).catch(() => {
      if (!cancelled) { setApiError(true); setLoading(false) }
    })

    return () => { cancelled = true }
  }, [xenoCantoSpecies])

  const play = (recording) => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
    if (playing === recording.id) { setPlaying(null); return }
    const audio = new Audio(recording.url)
    audio.onended = () => setPlaying(null)
    audio.onerror = () => setPlaying(null)
    audio.play().catch(() => setPlaying(null))
    audioRef.current = audio
    setPlaying(recording.id)
  }

  const stop = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
    setPlaying(null)
  }

  useEffect(() => () => { if (audioRef.current) audioRef.current.pause() }, [])

  return { songs, calls, loading, apiError, noKey, playing, play, stop, bestSong: pickBestSong(songs) }
}
