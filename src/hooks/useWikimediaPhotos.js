// Fetches CC-licensed bird photos from Wikimedia Commons.
// Uses the MediaWiki API with CORS support — no key required.

import { useState, useEffect } from 'react'

const WIKI_API = 'https://commons.wikimedia.org/w/api.php'
const THUMB_WIDTH = 640

// Cache across renders
const cache = {}

async function searchWikimediaImages(searchTerms, limit = 8) {
  const cacheKey = searchTerms.join('|')
  if (cache[cacheKey]) return cache[cacheKey]

  // Search Commons for each term, collect file titles
  const fileTitles = new Set()

  for (const term of searchTerms.slice(0, 3)) {
    const params = new URLSearchParams({
      action: 'query',
      list: 'search',
      srsearch: term,
      srnamespace: 6,      // File namespace
      srlimit: 6,
      format: 'json',
      origin: '*',
    })
    try {
      const res = await fetch(`${WIKI_API}?${params}`)
      const data = await res.json()
      data.query?.search?.forEach(r => fileTitles.add(r.title))
    } catch { /* skip on network error */ }
    if (fileTitles.size >= limit) break
  }

  if (fileTitles.size === 0) return []

  // Batch fetch image URLs for all found titles
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
    const res = await fetch(`${WIKI_API}?${params}`)
    const data = await res.json()
    const pages = Object.values(data.query?.pages || {})

    const photos = pages
      .filter(p => p.imageinfo?.[0])
      .map(p => {
        const info = p.imageinfo[0]
        const meta = info.extmetadata || {}
        return {
          thumbUrl: info.thumburl || info.url,
          fullUrl: info.url,
          title: p.title.replace('File:', ''),
          credit: meta.Artist?.value?.replace(/<[^>]+>/g, '') || 'Wikimedia Commons',
          license: meta.LicenseShortName?.value || 'CC',
          description: meta.ImageDescription?.value?.replace(/<[^>]+>/g, '').slice(0, 120) || '',
        }
      })
      // Filter to likely bird photos (skip maps, logos, etc.)
      .filter(p => {
        const t = p.title.toLowerCase()
        return !t.includes('map') && !t.includes('range') && !t.includes('logo')
          && !t.includes('icon') && !t.includes('stamp')
          && (p.thumbUrl.endsWith('.jpg') || p.thumbUrl.endsWith('.jpeg') || p.thumbUrl.endsWith('.png'))
      })

    cache[cacheKey] = photos
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
      .catch(e    => { if (!cancelled) { setError(e.message); setLoading(false) } })

    return () => { cancelled = true }
  }, [wikimediaSearchTerms?.join('|')])

  return { photos, loading, error }
}
