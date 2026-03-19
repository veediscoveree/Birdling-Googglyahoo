// Bird. Here. Now. — Verification Engine
//
// Gamified evidence-based sighting verification.
// Evidence types:
//   ebird_match  — species was in eBird obs for user's area (auto)
//   location     — user's GPS is within LOCATION_RADIUS_M of the eBird obs (auto)
//   sound        — 5-second ambient recording submitted (active)
//   photo        — in-field photo submitted (active)
//   together     — "Birded it Together" cooperative claim (active)
//
// Requirements by rarity:
//   common    — 0 required (verification is optional bonus)
//   uncommon  — 1 required to confirm record
//   rare      — 2 required
//   very_rare — 3 required
//
// Auto-evidence is detected from eBird obs data and user GPS.
// Active evidence is collected by the user via mic/camera.
// "Together" provides 2 credits (counts as location + together).
//
// Supabase schema (run once):
//   CREATE TABLE together_claims (
//     id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//     handle       text NOT NULL,
//     species_id   text NOT NULL,
//     obs_id       text,          -- eBird subId if available
//     lat          float,
//     lng          float,
//     joiners      text[] DEFAULT '{}',
//     created_at   timestamptz DEFAULT now()
//   );
//   CREATE INDEX ON together_claims (species_id, created_at DESC);
//   ALTER TABLE together_claims ENABLE ROW LEVEL SECURITY;
//   CREATE POLICY "Public read/write" ON together_claims USING (true) WITH CHECK (true);

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL  || ''
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const LIVE = !!(SUPABASE_URL && SUPABASE_KEY)

// ── Constants ─────────────────────────────────────────────────────────────────
export const LOCATION_RADIUS_M  = 1000   // GPS within 1km of eBird obs = location evidence
export const TOGETHER_WINDOW_MS = 2 * 60 * 60 * 1000   // 2-hour window for joining claims

export const EVIDENCE_TYPES = {
  ebird_match: { label: 'eBird match',       icon: '🗺️',  auto: true,  credits: 1 },
  location:    { label: 'Location verified',  icon: '📍',  auto: true,  credits: 1 },
  sound:       { label: 'Sound recorded',     icon: '🎙️', auto: false, credits: 1 },
  photo:       { label: 'Photo taken',        icon: '📸',  auto: false, credits: 1 },
  together:    { label: 'Birded it Together', icon: '🤝',  auto: false, credits: 2 },
}

export const REQUIRED_BY_RARITY = {
  common:    0,
  uncommon:  1,
  rare:      2,
  very_rare: 3,
}

// Bonus multiplier per credit above minimum
export const BONUS_PER_CREDIT = 0.12   // +12% points per extra evidence credit

// ── Haversine distance (metres) ───────────────────────────────────────────────
export function distanceM(lat1, lng1, lat2, lng2) {
  const R  = 6371000
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a  = Math.sin(dLat/2)**2 +
             Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLng/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

// ── Auto-detect evidence from existing data ───────────────────────────────────
// Returns an array of auto-evidence type keys already satisfied.
export function detectAutoEvidence(bird, eBirdObs, userLocation) {
  const found = []

  // eBird match: species was reported in the user's area recently
  const obs = eBirdObs?.find(o => o.bird?.id === bird.id)
  if (obs) {
    found.push('ebird_match')

    // Location: user's GPS within LOCATION_RADIUS_M of the eBird obs location
    if (userLocation?.lat && userLocation?.lng && obs.lat && obs.lng) {
      const d = distanceM(userLocation.lat, userLocation.lng, obs.lat, obs.lng)
      if (d <= LOCATION_RADIUS_M) {
        found.push('location')
      }
    }
  }

  return found
}

// ── Credit count for an evidence set ─────────────────────────────────────────
export function countCredits(evidenceSet) {
  return evidenceSet.reduce((sum, key) => sum + (EVIDENCE_TYPES[key]?.credits ?? 0), 0)
}

// ── Is the record confirmed? ──────────────────────────────────────────────────
export function isConfirmed(rarity, evidenceSet) {
  const required = REQUIRED_BY_RARITY[rarity] ?? 0
  return countCredits(evidenceSet) >= required
}

// ── Points multiplier from evidence ──────────────────────────────────────────
export function pointsMultiplier(rarity, evidenceSet) {
  const required = REQUIRED_BY_RARITY[rarity] ?? 0
  const credits  = countCredits(evidenceSet)
  const extra    = Math.max(0, credits - required)
  return 1 + extra * BONUS_PER_CREDIT
}

// ── Supabase REST helpers ─────────────────────────────────────────────────────
const sbHeaders = () => ({
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Prefer': 'return=representation',
})

// Post a "Birded it Together" claim
export async function submitTogetherClaim({ handle, birdId, obs, userLocation }) {
  if (!LIVE || !handle) return { id: `local_${Date.now()}`, success: true, live: false }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/together_claims`, {
      method: 'POST',
      headers: sbHeaders(),
      body: JSON.stringify({
        handle,
        species_id: birdId,
        obs_id:    obs?.subId || null,
        lat:       userLocation?.lat ?? null,
        lng:       userLocation?.lng ?? null,
      }),
    })
    if (!res.ok) throw new Error(`Supabase ${res.status}`)
    const [row] = await res.json()
    return { id: row.id, success: true, live: true }
  } catch (e) {
    return { id: `local_${Date.now()}`, success: false, error: e.message, live: false }
  }
}

// Join an existing "Together" claim (adds your handle to joiners array)
export async function joinTogetherClaim({ claimId, handle }) {
  if (!LIVE || !handle) return { success: false }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/join_together_claim`, {
      method: 'POST',
      headers: sbHeaders(),
      body: JSON.stringify({ claim_id: claimId, joiner_handle: handle }),
    })
    return { success: res.ok }
  } catch { return { success: false } }
}

// Fetch active Together claims near this species (for the "join" UI)
export async function fetchTogetherClaims({ birdId, lat, lng }) {
  if (!LIVE) return []
  try {
    const since = new Date(Date.now() - TOGETHER_WINDOW_MS).toISOString()
    const params = new URLSearchParams({
      select:      'id,handle,obs_id,lat,lng,joiners,created_at',
      species_id:  `eq.${birdId}`,
      created_at:  `gte.${since}`,
      order:       'created_at.desc',
      limit:       '10',
    })
    const res = await fetch(`${SUPABASE_URL}/rest/v1/together_claims?${params}`, { headers: sbHeaders() })
    if (!res.ok) return []
    return res.json()
  } catch { return [] }
}

// Save verified sighting to localStorage (offline record; syncs on leaderboard submit)
export function saveLocalVerification(birdId, evidenceSet, multiplier) {
  try {
    const key  = 'bhn_verifications'
    const prev = JSON.parse(localStorage.getItem(key) || '{}')
    prev[birdId] = { evidence: evidenceSet, multiplier, ts: Date.now() }
    localStorage.setItem(key, JSON.stringify(prev))
  } catch {}
}

export function loadLocalVerification(birdId) {
  try {
    const key = 'bhn_verifications'
    const all = JSON.parse(localStorage.getItem(key) || '{}')
    return all[birdId] || null
  } catch { return null }
}

export const isLiveVerification = LIVE
