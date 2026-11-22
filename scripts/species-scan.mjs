// Tally which species were reported in the player's area over the last N days, using
// eBird's per-day historic endpoint, and list the ones the game doesn't have yet.
// Run in CI (needs EBIRD_KEY). Output: data/nearby-species.json
import { readFileSync, writeFileSync, mkdirSync } from 'fs'

const KEY = process.env.EBIRD_KEY
const REGIONS = (process.env.REGIONS || 'US-NY-061,US-NY-005,US-NJ-003').split(',')
const DAYS = +(process.env.DAYS || 60)
if (!KEY) { console.error('EBIRD_KEY missing'); process.exit(1) }

const have = new Set([...readFileSync('src/data/birds.js', 'utf8').matchAll(/eBirdCode:\s*'([a-z0-9]+)'/g)].map(m => m[1]))
const tally = {}
for (let d = 1; d <= DAYS; d++) {
  const dt = new Date(Date.now() - d * 864e5)
  const [y, m, day] = [dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate()]
  for (const r of REGIONS) {
    const url = `https://api.ebird.org/v2/data/obs/${r}/historic/${y}/${m}/${day}?detail=simple&rank=mrec`
    const res = await fetch(url, { headers: { 'X-eBirdApiToken': KEY } })
    if (!res.ok) { console.warn(r, y, m, day, res.status); continue }
    for (const o of await res.json()) {
      if (o.speciesCode.includes('/') || o.speciesCode.startsWith('x') || /sp\.|hybrid| x /i.test(o.comName)) continue
      const t = tally[o.speciesCode] ||= { code: o.speciesCode, comName: o.comName, sciName: o.sciName, regionDays: 0 }
      t.regionDays++
    }
  }
}
const all = Object.values(tally).sort((a, b) => b.regionDays - a.regionDays)
const out = {
  generated: new Date().toISOString(), regions: REGIONS, days: DAYS,
  maxRegionDays: REGIONS.length * DAYS,
  inGame: all.filter(s => have.has(s.code)).length,
  candidates: all.filter(s => !have.has(s.code)),
}
mkdirSync('data', { recursive: true })
writeFileSync('data/nearby-species.json', JSON.stringify(out, null, 1))
console.log(`${all.length} species seen; ${out.inGame} already in game; top new:`, out.candidates.slice(0, 30).map(s => s.comName).join(', '))
