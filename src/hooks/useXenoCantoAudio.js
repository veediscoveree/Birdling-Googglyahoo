// Fetches bird sound recordings from xeno-canto.org.
// Most recordings are CC BY or CC BY-NC-SA — credited per recording.
// API v2 supports CORS, no key required.

import { useState, useEffect, useRef } from 'react'

const XC_API = 'https://xeno-canto.org/api/2/recordings'

const cache = {}

async function fetchRecordings(speciesName, type = null) {
  const query = `"${speciesName}" cnt:"United States" q:A${type ? ` type:${type}` : ''}`
  const cacheKey = query
  if (cache[cacheKey]) return cache[cacheKey]

  const params = new URLSearchParams({ query })
  try {
    const res = await fetch(`${XC_API}?${params}`)
    const data = await res.json()
    const recs = (data.recordings || []).slice(0, 5).map(r => ({
      id: r.id,
      url: r.file,         // direct mp3 URL
      type: r.type,        // song, call, flight call, etc.
      length: r.length,    // "0:32"
      quality: r.q,        // A–E
      location: r.loc,
      country: r.cnt,
      date: r.date,
      recordist: r.rec,
      license: r.lic,
      remarks: r.rmk,
      sonogramUrl: r.sono?.small,
      xcUrl: `https://xeno-canto.org/${r.id}`,
    }))
    cache[cacheKey] = recs
    return recs
  } catch {
    return []
  }
}

export function useXenoCantoAudio(xenoCantoSpecies) {
  const [songs, setSongs]     = useState([])
  const [calls, setCalls]     = useState([])
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(null)   // recording id
  const audioRef = useRef(null)

  useEffect(() => {
    if (!xenoCantoSpecies) { setLoading(false); return }
    let cancelled = false
    setLoading(true)

    Promise.all([
      fetchRecordings(xenoCantoSpecies, 'song'),
      fetchRecordings(xenoCantoSpecies, 'call'),
    ]).then(([songRecs, callRecs]) => {
      if (!cancelled) {
        setSongs(songRecs)
        setCalls(callRecs)
        setLoading(false)
      }
    }).catch(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [xenoCantoSpecies])

  const play = (recording) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    if (playing === recording.id) {
      setPlaying(null)
      return
    }
    const audio = new Audio(recording.url)
    audio.onended = () => setPlaying(null)
    audio.onerror = () => setPlaying(null)
    audio.play().catch(() => setPlaying(null))
    audioRef.current = audio
    setPlaying(recording.id)
  }

  const stop = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
    setPlaying(null)
  }

  // Clean up on unmount
  useEffect(() => () => { if (audioRef.current) audioRef.current.pause() }, [])

  return { songs, calls, loading, playing, play, stop }
}
