// Fetches bird sound recordings from xeno-canto.org.
// Most recordings are CC BY or CC BY-NC-SA — credited per recording.
// API v2 supports CORS, no key required.
// Results are persisted in localStorage (7-day TTL) for instant repeat loads.

import { useState, useEffect, useRef } from 'react'

const XC_API   = 'https://xeno-canto.org/api/2/recordings'
const LS_PREFIX = 'bhn_xc_v1_'
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000   // 7 days

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

// ── In-memory cache (avoids redundant network calls within a session) ─────────
const memCache = {}

// ── Length parser: "1:32" → 92 ────────────────────────────────────────────────
function parseSeconds(lengthStr) {
  if (!lengthStr) return 0
  const parts = lengthStr.split(':').map(Number)
  return parts.length === 2 ? parts[0] * 60 + (parts[1] || 0) : parts[0] || 0
}

const QUALITY_RANK = { A: 1, B: 2, C: 3, D: 4, E: 5 }

// Pick highest-quality song longer than minSec; fall back to any song if none qualify
export function pickBestSong(songs, minSec = 10) {
  if (!songs?.length) return null
  const ranked = [...songs].sort(
    (a, b) => (QUALITY_RANK[a.quality] || 9) - (QUALITY_RANK[b.quality] || 9)
  )
  return ranked.find(s => parseSeconds(s.length) > minSec) || ranked[0] || null
}

// ── Fetcher ───────────────────────────────────────────────────────────────────
async function fetchRecordings(speciesName, type) {
  const query    = `"${speciesName}" cnt:"United States" q:A${type ? ` type:${type}` : ''}`
  const cacheKey = query

  if (memCache[cacheKey]) return memCache[cacheKey]
  const persisted = lsGet(cacheKey)
  if (persisted) { memCache[cacheKey] = persisted; return persisted }

  const params = new URLSearchParams({ query })
  try {
    const res  = await fetch(`${XC_API}?${params}`)
    const data = await res.json()
    const recs = (data.recordings || []).slice(0, 8).map(r => ({
      id:          r.id,
      url:         r.file,
      type:        r.type,
      length:      r.length,
      quality:     r.q,
      location:    r.loc,
      country:     r.cnt,
      date:        r.date,
      recordist:   r.rec,
      license:     r.lic,
      sonogramUrl: r.sono?.small,
      xcUrl:       `https://xeno-canto.org/${r.id}`,
    }))
    memCache[cacheKey] = recs
    lsSet(cacheKey, recs)
    return recs
  } catch {
    return []
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useXenoCantoAudio(xenoCantoSpecies) {
  const [songs, setSongs]     = useState([])
  const [calls, setCalls]     = useState([])
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(null)   // recording id
  const audioRef = useRef(null)

  useEffect(() => {
    if (!xenoCantoSpecies) { setLoading(false); return }
    let cancelled = false
    setLoading(true)

    Promise.all([
      fetchRecordings(xenoCantoSpecies, 'song'),
      fetchRecordings(xenoCantoSpecies, 'call'),
    ]).then(([songRecs, callRecs]) => {
      if (!cancelled) {
        setSongs(songRecs)
        setCalls(callRecs)
        setLoading(false)
      }
    }).catch(() => { if (!cancelled) setLoading(false) })

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

  return { songs, calls, loading, playing, play, stop, bestSong: pickBestSong(songs) }
}
