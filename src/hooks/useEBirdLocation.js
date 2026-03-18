// Fetches recent nearby bird sightings from eBird API v2.
// Requires a free API key from ebird.org/api/keygen
// Falls back gracefully if no key is configured.
//
// Strategy: expand search outward (radius + time) until we have
// at least MIN_BIRDS matched species in our database.

import { useState, useEffect } from 'react'
import { BIRDS } from '../data/birds'

const EBIRD_API_KEY = import.meta.env.VITE_EBIRD_API_KEY || ''
const EBIRD_BASE    = 'https://api.ebird.org/v2'
const MIN_BIRDS     = 20   // keep expanding until we have this many

// Expansion ladder: [radiusKm, daysBack]
const SEARCH_LADDER = [
  [2,   1],
  [8,   3],
  [25,  14],
  [80,  30],
]

// Build a map of eBirdCode → BIRDS entry for fast lookup
const EBIRD_MAP = {}
for (const b of BIRDS) {
  if (b.eBirdCode) EBIRD_MAP[b.eBirdCode] = b
}

// ── Fetch one rung of the ladder ──────────────────────────────────────────────
async function fetchObservations(lat, lng, radiusKm, daysBack) {
  const params = new URLSearchParams({
    lat, lng,
    dist:       radiusKm,
    back:       daysBack,
    maxResults: 500,
    fmt:        'json',
  })
  const res = await fetch(`${EBIRD_BASE}/data/obs/geo/recent?${params}`, {
    headers: { 'X-eBirdApiToken': EBIRD_API_KEY },
  })
  if (!res.ok) throw new Error(`eBird ${res.status}`)
  return res.json()   // array of observation objects
}

// ── Parse eBird obs → our internal format ────────────────────────────────────
function parseObs(obs) {
  return obs
    .map(o => {
      const bird = EBIRD_MAP[o.speciesCode]
      if (!bird) return null
      return {
        bird,
        // Human-readable attribution shown on the radar
        locName:   o.locName  || 'nearby',
        obsDt:     o.obsDt    || '',       // "2026-03-18 07:15"
        howMany:   o.howMany  || 1,
        lat:       o.lat,
        lng:       o.lng,
        subId:     o.subId,
      }
    })
    .filter(Boolean)
}

// ── Session-level cache (keyed by rounded lat/lng) ───────────────────────────
const sessionCache = {}

async function resolveNearbyBirds(lat, lng) {
  const key = `${lat.toFixed(2)},${lng.toFixed(2)}`
  if (sessionCache[key]) return sessionCache[key]

  let bestObs = []

  for (const [radiusKm, daysBack] of SEARCH_LADDER) {
    try {
      const raw    = await fetchObservations(lat, lng, radiusKm, daysBack)
      const parsed = parseObs(raw)

      // Deduplicate: keep the most-recent observation per species
      const bySpecies = {}
      for (const o of parsed) {
        const id = o.bird.id
        if (!bySpecies[id] || o.obsDt > bySpecies[id].obsDt) {
          bySpecies[id] = o
        }
      }
      bestObs = Object.values(bySpecies)

      if (bestObs.length >= MIN_BIRDS) break   // good enough — stop expanding
    } catch (e) {
      console.warn(`[eBird] rung ${radiusKm}km/${daysBack}d failed:`, e.message)
    }
  }

  sessionCache[key] = bestObs
  return bestObs
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useEBirdLocation(userLocation) {
  const [nearbyBirds,    setNearbyBirds]    = useState(BIRDS)
  const [eBirdObs,       setEBirdObs]       = useState([])   // full obs with attribution
  const [eBirdActive,    setEBirdActive]    = useState(false)
  const [searchRadius,   setSearchRadius]   = useState(null) // km actually used
  const [loading,        setLoading]        = useState(false)

  useEffect(() => {
    if (!EBIRD_API_KEY || !userLocation?.lat || !userLocation?.lng) return
    let cancelled = false
    setLoading(true)

    resolveNearbyBirds(userLocation.lat, userLocation.lng)
      .then(obs => {
        if (cancelled) return
        if (obs.length === 0) {
          setNearbyBirds(BIRDS)
          setEBirdActive(false)
        } else {
          const birds = obs.map(o => o.bird)
          // Always include 'common' birds from the full list as padding
          const common = BIRDS.filter(b => b.rarity === 'common' && !birds.find(x => x.id === b.id))
          setNearbyBirds([...birds, ...common])
          setEBirdObs(obs)
          setEBirdActive(true)
        }
        setLoading(false)
      })
      .catch(() => {
        if (!cancelled) { setNearbyBirds(BIRDS); setLoading(false) }
      })

    return () => { cancelled = true }
  }, [userLocation?.lat, userLocation?.lng])

  return { nearbyBirds, eBirdObs, eBirdActive, searchRadius, loading }
}
