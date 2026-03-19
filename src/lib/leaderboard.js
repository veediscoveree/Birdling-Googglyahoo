// Bird. Here. Now. — Leaderboard client + Supabase stub
//
// Without a Supabase URL/key, operates in local-only mode showing
// a stylised mock leaderboard. When VITE_SUPABASE_URL and
// VITE_SUPABASE_ANON_KEY are provided, the real global table is used.
//
// Supabase setup (one-time):
//   CREATE TABLE leaderboard (
//     id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//     handle     text NOT NULL,
//     score      int  NOT NULL,
//     species    int  NOT NULL DEFAULT 0,
//     created_at timestamptz DEFAULT now(),
//     updated_at timestamptz DEFAULT now()
//   );
//   CREATE INDEX ON leaderboard (score DESC);
//   -- Enable Row Level Security + public read, insert, upsert by handle
//   ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
//   CREATE POLICY "Public read"   ON leaderboard FOR SELECT USING (true);
//   CREATE POLICY "Public upsert" ON leaderboard FOR INSERT WITH CHECK (true);
//   CREATE POLICY "Own update"    ON leaderboard FOR UPDATE USING (true);

const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL  || ''
const SUPABASE_KEY  = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const LIVE = !!(SUPABASE_URL && SUPABASE_KEY)

// ── Supabase REST helpers (no SDK needed) ─────────────────────────────────────
const headers = () => ({
  'Content-Type':  'application/json',
  'apikey':         SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Prefer':        'return=representation',
})

async function sbGet(path, params = {}) {
  const q = new URLSearchParams(params)
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}?${q}`, { headers: headers() })
  if (!r.ok) throw new Error(`Supabase ${r.status}`)
  return r.json()
}

async function sbUpsert(table, row, onConflict) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?on_conflict=${onConflict}`, {
    method:  'POST',
    headers: { ...headers(), Prefer: 'return=representation,resolution=merge-duplicates' },
    body:    JSON.stringify(row),
  })
  if (!r.ok) throw new Error(`Supabase upsert ${r.status}`)
  return r.json()
}

// ── Mock data (shown when Supabase not configured) ────────────────────────────
const MOCK_BOARD = [
  { handle: 'veralark',    score: 4180, species: 38 },
  { handle: 'osprey_fan',  score: 3640, species: 33 },
  { handle: 'patchbirder', score: 3120, species: 28 },
  { handle: 'jay_watcher', score: 2750, species: 25 },
  { handle: 'fieldnotes',  score: 2340, species: 21 },
  { handle: 'reedwarbler', score: 1980, species: 18 },
  { handle: 'dawn_chorus', score: 1650, species: 15 },
  { handle: 'sparrow99',   score: 1200, species: 11 },
  { handle: 'firstlifer',  score:  640, species:  6 },
  { handle: 'backyard_b',  score:  320, species:  3 },
]

// ── Public API ────────────────────────────────────────────────────────────────

/** Fetch top N entries */
export async function fetchLeaderboard(limit = 25) {
  if (!LIVE) return MOCK_BOARD.slice(0, limit)
  return sbGet('leaderboard', {
    select:  'handle,score,species',
    order:   'score.desc',
    limit,
  })
}

/** Submit or update the local player's score */
export async function submitScore({ handle, score, species }) {
  if (!LIVE) {
    // Store locally only
    try {
      const stored = JSON.parse(localStorage.getItem('bhn_leaderboard_entry') || 'null')
      const entry  = { handle, score, species }
      localStorage.setItem('bhn_leaderboard_entry', JSON.stringify(entry))
      return entry
    } catch { return null }
  }
  return sbUpsert('leaderboard', { handle, score, species }, 'handle')
}

export const isLiveLeaderboard = LIVE
