// Cross-origin JSON fetch with a direct-first proxy fallback chain.
//
// Why this exists:
//  - Some APIs (MediaWiki / Wikimedia Commons) send CORS headers, so a direct
//    browser fetch works — that's the fast path, tried first.
//  - Others (xeno-canto) send NO CORS headers, so a direct browser fetch is
//    blocked. For those we fall through a chain of public CORS proxies until
//    one succeeds.
//
// Note: media *playback* (<img>, <audio>) is NOT subject to CORS — only reading
// JSON metadata is. So this is used to fetch the lists of photos/recordings;
// the resulting file URLs are then loaded directly by the browser.

const PROXIES = [
  (u) => u,                                                                  // direct
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  (u) => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(u)}`,
  (u) => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
]

// Fetch a URL and parse its body as JSON, trying each proxy in turn.
// Resolves with the parsed object, or throws if every attempt fails.
export async function fetchJsonWithFallback(targetUrl, { timeoutMs = 12000 } = {}) {
  let lastErr
  for (const wrap of PROXIES) {
    const url = wrap(targetUrl)
    try {
      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), timeoutMs)
      let res
      try {
        res = await fetch(url, { signal: ctrl.signal, headers: { Accept: 'application/json' } })
      } finally {
        clearTimeout(timer)
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const text = await res.text()
      if (!text) throw new Error('empty body')
      return JSON.parse(text)
    } catch (e) {
      lastErr = e
      // Try the next proxy in the chain.
    }
  }
  throw lastErr || new Error('all fetch attempts failed')
}
