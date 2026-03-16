// Fetches recent nearby bird sightings from eBird API v2.
// Requires a free API key from ebird.org/api/keygen
// Falls back to showing all database species if no key is set.

import { useState, useEffect } from 'react'
import { BIRDS } from '../data/birds'

// Drop your eBird API key here, or set via environment variable.
// Get a free key at: https://ebird.org/api/keygen
const EBIRD_API_KEY = import.meta.env.VITE_EBIRD_API_KEY || ''
const EBIRD_BASE    = 'https://api.ebird.org/v2'

const cache = {}

async function fetchNearbySpecies(lat, lng, radiusKm = 5) {
  if (!EBIRD_API_KEY) return null

  const cacheKey = `${lat.toFixed(2)},${lng.toFixed(2)}`
  if (cache[cacheKey]) return cache[cacheKey]

  // Recent observations within radius, last 14 days
  const params = new URLSearchParams({
    lat, lng,
    dist: radiusKm,
    back: 14,
    maxResults: 200,
    fmt: 'json',
  })

  try {
    const res = await fetch(`${EBIRD_BASE}/data/obs/geo/recent?${params}`, {
      headers: { 'X-eBirdApiToken': EBIRD_API_KEY },
    })
    if (!res.ok) return null
    const obs = await res.json()
    // Return set of species codes seen nearby
    const codes = new Set(obs.map(o => o.speciesCode))
    cache[cacheKey] = codes
    return codes
  } catch {
    return null
  }
}

export function useEBirdLocation(userLocation) {
  const [nearbyBirds, setNearbyBirds]     = useState(BIRDS)  // default: all birds
  const [eBirdActive, setEBirdActive]     = useState(false)
  const [loading, setLoading]             = useState(false)

  useEffect(() => {
    if (!userLocation?.lat || !userLocation?.lng) return
    let cancelled = false
    setLoading(true)

    fetchNearbySpecies(userLocation.lat, userLocation.lng)
      .then(codeSet => {
        if (cancelled) return
        if (!codeSet) {
          // No eBird key — use all birds, no filtering
          setNearbyBirds(BIRDS)
          setEBirdActive(false)
        } else {
          // Filter our database to birds seen nearby; always show at least common birds
          const nearby = BIRDS.filter(b =>
            codeSet.has(b.eBirdCode) || b.rarity === 'common'
          )
          setNearbyBirds(nearby.length >= 3 ? nearby : BIRDS)
          setEBirdActive(true)
        }
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [userLocation?.lat, userLocation?.lng])

  return { nearbyBirds, eBirdActive, loading }
}
