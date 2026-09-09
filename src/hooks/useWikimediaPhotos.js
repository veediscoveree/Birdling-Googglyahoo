// Fetches CC-licensed bird photos from Wikimedia Commons.
// Uses the MediaWiki API (CORS-enabled, no key). If Commons search fails or
// returns nothing, falls back to the Wikipedia REST lead image so at least the
// headline photo of the species reliably appears.
// Results are persisted in localStorage (7-day TTL) for instant repeat loads.

import { useState, useEffect } from 'react'
import { fetchJsonWithFallback } from './corsFetch'

const WIKI_API   = 'https://commons.wikimedia.org/w/api.php'
const WIKIPEDIA_SUMMARY = 'https://en.wikipedia.org/api/rest_v1/page/summary/'
const THUMB_WIDTH = 640
const LS_PREFIX  = 'bhn_wiki_v2_'   // bumped to evict stale/empty caches from the old fetch path
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

// ── Wikipedia REST lead image — reliable single-photo fallback ────────────────
async function wikipediaLeadPhoto(scientificName) {
  if (!scientificName) return []
  const url = WIKIPEDIA_SUMMARY + encodeURIComponent(scientificName.replace(/ /g, '_'))
  try {
    const data = await fetchJsonWithFallback(url)
    const img = data?.originalimage?.source || data?.thumbnail?.source
    if (!img) return []
    return [{
      thumbUrl:    data.thumbnail?.source || img,
      fullUrl:     data.originalimage?.source || img,
      title:       data.title || scientificName,
      credit:      'Wikipedia',
      license:     'CC',
      description: (data.extract || '').slice(0, 120),
    }]
  } catch {
    return []
  }
}

async function searchWikimediaImages(searchTerms, scientificName, limit = 8) {
  const cacheKey = searchTerms.join('|')

  if (memCache[cacheKey]) return memCache[cacheKey]
  const persisted = lsGet(cacheKey)
  if (persisted && persisted.length) { memCache[cacheKey] = persisted; return persisted }

  const fileTitles = new Set()

  for (const term of searchTerms.slice(0, 3)) {
    const params = new URLSearchParams({
      action: 'query', list: 'search',
      srsearch: term, srnamespace: 6, srlimit: 6,
      format: 'json', origin: '*',
    })
    try {
      const data = await fetchJsonWithFallback(`${WIKI_API}?${params}`)
      data.query?.search?.forEach(r => fileTitles.add(r.title))
    } catch { /* try next term */ }
    if (fileTitles.size >= limit) break
  }

  let photos = []
  if (fileTitles.size > 0) {
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
      const data  = await fetchJsonWithFallback(`${WIKI_API}?${params}`)
      const pages = Object.values(data.query?.pages || {})
      photos = pages
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
          const u = (p.thumbUrl || '').toLowerCase()
          return !t.includes('map') && !t.includes('range') && !t.includes('logo')
            && !t.includes('icon') && !t.includes('stamp')
            && (u.includes('.jpg') || u.includes('.jpeg') || u.includes('.png'))
        })
    } catch { /* fall through to Wikipedia lead image */ }
  }

  // Fallback: at least show the species' Wikipedia lead photo.
  if (photos.length === 0) {
    photos = await wikipediaLeadPhoto(scientificName)
  }

  if (photos.length > 0) {
    memCache[cacheKey] = photos
    lsSet(cacheKey, photos)
  }
  return photos
}

export function useWikimediaPhotos(wikimediaSearchTerms, scientificName) {
  const [photos, setPhotos]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!wikimediaSearchTerms?.length) { setLoading(false); return }
    let cancelled = false
    setLoading(true)
    setError(null)

    searchWikimediaImages(wikimediaSearchTerms, scientificName)
      .then(results => { if (!cancelled) { setPhotos(results); setLoading(false) } })
      .catch(e      => { if (!cancelled) { setError(e.message); setLoading(false) } })

    return () => { cancelled = true }
  }, [wikimediaSearchTerms?.join('|'), scientificName])

  return { photos, loading, error }
}
