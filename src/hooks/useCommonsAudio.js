// Bird recordings from Wikimedia Commons, served as MP3 so iPhones can play them.
// Fallback for when xeno-canto's own audio files won't play in the browser
// (iOS reported "media error 4" on both xeno-canto URLs).
//
// Commons mostly hosts Ogg/WAV/FLAC, which iOS Safari can't play, but it
// transcodes every audio file to MP3 at a predictable URL:
//   .../commons/a/ab/File.ogg  →  .../commons/transcoded/a/ab/File.ogg/File.ogg.mp3

import { useState, useEffect } from 'react'
import { fetchJsonWithFallback } from './corsFetch'

const API = 'https://commons.wikimedia.org/w/api.php'
const LS_PREFIX = 'bhn_cma1_'
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000
const memCache = {}

function lsGet(k) {
  try {
    const raw = localStorage.getItem(LS_PREFIX + k); if (!raw) return null
    const { data, ts } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL) return null
    return data
  } catch { return null }
}
function lsSet(k, data) { try { localStorage.setItem(LS_PREFIX + k, JSON.stringify({ data, ts: Date.now() })) } catch {} }

export function mp3UrlFor(url, mime) {
  if (!url) return null
  if (/audio\/(mpeg|mp3|mp4|aac|x-m4a)/.test(mime || '') || /\.(mp3|m4a)$/i.test(url)) return url
  const m = url.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/([0-9a-f])\/([0-9a-f]{2})\/(.+)$/)
  if (!m) return null
  return `${m[1]}/transcoded/${m[2]}/${m[3]}/${m[4]}/${m[4]}.mp3`
}

const strip = (h) => (h || '').replace(/<[^>]+>/g, '').trim()

export async function fetchCommonsAudio(scientificName) {
  const key = scientificName
  if (memCache[key]) return memCache[key]
  const cached = lsGet(key); if (cached) { memCache[key] = cached; return cached }

  const params = new URLSearchParams({
    action: 'query', generator: 'search',
    gsrsearch: `"${scientificName}" filetype:audio`, gsrnamespace: '6', gsrlimit: '12',
    prop: 'imageinfo', iiprop: 'url|mime|extmetadata',
    format: 'json', origin: '*',
  })
  let recs = []
  try {
    const data = await fetchJsonWithFallback(`${API}?${params}`)
    recs = Object.values(data.query?.pages || {})
      .map(p => {
        const ii = p.imageinfo?.[0]; if (!ii) return null
        const meta = ii.extmetadata || {}
        const url = mp3UrlFor(ii.url, ii.mime)
        if (!url) return null
        const title = p.title.replace(/^File:/, '').replace(/\.[a-z0-9]+$/i, '')
        return {
          id: `wm-${p.pageid}`,
          url, urls: [url],
          type: /call/i.test(title) ? 'call' : /song/i.test(title) ? 'song' : 'recording',
          title,
          recordist: strip(meta.Artist?.value).slice(0, 40) || 'Wikimedia Commons',
          license: meta.LicenseShortName?.value || 'CC',
          location: '', length: '', quality: '',
          source: 'wikimedia',
          pageUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(p.title)}`,
        }
      })
      .filter(Boolean)
  } catch (e) {
    console.warn('[commons audio]', e.message)
  }
  if (recs.length) { memCache[key] = recs; lsSet(key, recs) }
  return recs
}

export function useCommonsAudio(scientificName) {
  const [recs, setRecs] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!scientificName) { setLoading(false); return }
    let cancelled = false
    setLoading(true)
    fetchCommonsAudio(scientificName).then(r => { if (!cancelled) { setRecs(r); setLoading(false) } })
    return () => { cancelled = true }
  }, [scientificName])
  return { recs, loading }
}
