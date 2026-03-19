// Fetches CC-licensed bird photos from Wikimedia Commons.
// Uses the MediaWiki API with CORS support — no key required.
// Results are persisted in localStorage (7-day TTL) for instant repeat loads.

import { useState, useEffect } from 'react'

const WIKI_API  = 'https://commons.wikimedia.org/w/api.php'
const THUMB_WIDTH = 640
const LS_PREFIX  = 'bhn_wiki_v1_'
const CACHE_TTL  = 7 * 24 * 60 * 60 * 1000   // 7 days

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

// ── In-memory cache ───────────────────────────────────────────────────────────
const memCache = {}

async function searchWikimediaImages(searchTerms, limit = 8) {
  const cacheKey = searchTerms.join('|')

  if (memCache[cacheKey]) return memCache[cacheKey]
  const persisted = lsGet(cacheKey)
  if (persisted) { memCache[cacheKey] = persisted; return persisted }

  const fileTitles = new Set()

  for (const term of searchTerms.slice(0, 3)) {
    const params = new URLSearchParams({
      action: 'query', list: 'search',
      srsearch: term, srnamespace: 6, srlimit: 6,
      format: 'json', origin: '*',
    })
    try {
      const res  = await fetch(`${WIKI_API}?${params}`)
      const data = await res.json()
      data.query?.search?.forEach(r => fileTitles.add(r.title))
    } catch { /* skip on network error */ }
    if (fileTitles.size >= limit) break
  }

  if (fileTitles.size === 0) return []

  const params = new URLSearchParams({
    action: 'query',
    titles: [...fileTitles].slice(0, limit).join('|'),
    prop: 'imageinfo',
    iiprop: 'url|mime|extmetadata',
    iiurlwidth: THUMB_WIDTH,
    format: 'json',
    origin: '*',
  })

  try {
    const res   = await fetch(`${WIKI_API}?${params}`)
    const data  = await res.json()
    const pages = Object.values(data.query?.pages || {})

    const photos = pages
      .filter(p => p.imageinfo?.[0])
      .map(p => {
        const info = p.imageinfo[0]
        const meta = info.extmetadata || {}
        return {
          thumbUrl:    info.thumburl || info.url,
          fullUrl:     info.url,
          title:       p.title.replace('File:', ''),
          credit:      meta.Artist?.value?.replace(/<[^>]+>/g, '') || 'Wikimedia Commons',
          license:     meta.LicenseShortName?.value || 'CC',
          description: meta.ImageDescription?.value?.replace(/<[^>]+>/g, '').slice(0, 120) || '',
        }
      })
      .filter(p => {
        const t = p.title.toLowerCase()
        return !t.includes('map') && !t.includes('range') && !t.includes('logo')
          && !t.includes('icon') && !t.includes('stamp')
          && (p.thumbUrl.endsWith('.jpg') || p.thumbUrl.endsWith('.jpeg') || p.thumbUrl.endsWith('.png'))
      })

    memCache[cacheKey] = photos
    lsSet(cacheKey, photos)
    return photos
  } catch {
    return []
  }
}

export function useWikimediaPhotos(wikimediaSearchTerms) {
  const [photos, setPhotos]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!wikimediaSearchTerms?.length) { setLoading(false); return }
    let cancelled = false
    setLoading(true)
    setError(null)

    searchWikimediaImages(wikimediaSearchTerms)
      .then(results => { if (!cancelled) { setPhotos(results); setLoading(false) } })
      .catch(e      => { if (!cancelled) { setError(e.message); setLoading(false) } })

    return () => { cancelled = true }
  }, [wikimediaSearchTerms?.join('|')])

  return { photos, loading, error }
}
