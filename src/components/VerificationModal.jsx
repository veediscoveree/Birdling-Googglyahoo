// Bird. Here. Now. — Verification Modal
//
// Gamified sighting verification screen. Appears after capture for
// uncommon+ species (required) or as an optional bonus for common birds.
//
// Evidence flow:
//   Auto (passive) ─── eBird match / GPS location → detected on load
//   Active ──────────── Sound (5s recording) / Photo (camera)
//   Cooperative ─────── "Birded it Together" (eBird reporter piggyback)

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  EVIDENCE_TYPES, REQUIRED_BY_RARITY, detectAutoEvidence,
  countCredits, isConfirmed, pointsMultiplier,
  submitTogetherClaim, saveLocalVerification,
  isLiveVerification,
} from '../lib/verification'

// ── Waveform animation for recording ─────────────────────────────────────────
function Waveform({ active }) {
  const bars = [0.4, 0.7, 1, 0.8, 0.5, 0.9, 0.6, 1, 0.7, 0.4, 0.8, 0.6, 1, 0.5, 0.7]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 28 }}>
      {bars.map((h, i) => (
        <div key={i} style={{
          width: 3, borderRadius: 2,
          background: active ? 'var(--accent-green)' : 'rgba(255,255,255,0.2)',
          height: active ? `${h * 28}px` : '4px',
          transition: 'height 0.15s ease',
          animation: active ? `waveBar 0.${4 + i % 5}s ease-in-out infinite alternate` : 'none',
          animationDelay: `${i * 0.05}s`,
        }}/>
      ))}
    </div>
  )
}

// ── Evidence row ──────────────────────────────────────────────────────────────
function EvidenceRow({ typeKey, state, children }) {
  const def = EVIDENCE_TYPES[typeKey]
  const colors = {
    done:    { bg: 'rgba(61,220,127,0.08)',  border: 'rgba(61,220,127,0.25)',  text: 'var(--accent-green)' },
    active:  { bg: 'rgba(245,166,35,0.08)',  border: 'rgba(245,166,35,0.3)',   text: 'var(--accent-amber)' },
    idle:    { bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)', text: 'var(--text-dim)' },
  }
  const c = colors[state] || colors.idle
  return (
    <div style={{
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: 14, padding: '12px 14px',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18 }}>{def.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: state === 'done' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
            {def.label}
            {def.credits === 2 && (
              <span style={{ marginLeft: 6, fontSize: 10, color: 'var(--accent-amber)', fontWeight: 700 }}>
                ×2 credits
              </span>
            )}
          </div>
        </div>
        {state === 'done' && (
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            background: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, color: '#000', fontWeight: 700, flexShrink: 0,
          }}>✓</div>
        )}
      </div>
      {children}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function VerificationModal({
  bird, eBirdObs, userLocation, handle,
  initialEvidence = [],
  onConfirm, onSkip,
}) {
  const required     = REQUIRED_BY_RARITY[bird.rarity] ?? 0
  const isOptional   = required === 0

  // Evidence state — start with auto-detected items
  const [evidence, setEvidence]     = useState(initialEvidence)

  // Sound recording state
  const [recState,    setRecState]  = useState('idle')   // idle | requesting | recording | done | error
  const [recSeconds,  setRecSeconds]= useState(0)
  const mediaRef    = useRef(null)
  const recTimerRef = useRef(null)

  // Photo state
  const photoInputRef = useRef(null)
  const [photoThumb,  setPhotoThumb] = useState(null)

  // Together state
  const [togetherState, setTogetherState] = useState('idle')   // idle | claiming | done | error
  const [togetherHandle, setTogetherHandle] = useState('')

  // eBird obs for this bird
  const matchObs = eBirdObs?.find(o => o.bird?.id === bird.id) || null

  const addEvidence = useCallback((key) => {
    setEvidence(prev => prev.includes(key) ? prev : [...prev, key])
  }, [])

  const credits  = countCredits(evidence)
  const confirmed = isConfirmed(bird.rarity, evidence)
  const multiplier = pointsMultiplier(bird.rarity, evidence)
  const bonusPoints = Math.round(bird.points * (multiplier - 1))

  // ── Sound recording ───────────────────────────────────────────────────────
  const startRecording = async () => {
    setRecState('requesting')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      mediaRef.current = recorder
      recorder.start()
      setRecState('recording')
      setRecSeconds(0)

      let elapsed = 0
      recTimerRef.current = setInterval(() => {
        elapsed++
        setRecSeconds(elapsed)
        if (elapsed >= 5) {
          recorder.stop()
          stream.getTracks().forEach(t => t.stop())
          clearInterval(recTimerRef.current)
          setRecState('done')
          addEvidence('sound')
        }
      }, 1000)

      recorder.onstop = () => {
        if (recState !== 'done') setRecState('done')
        addEvidence('sound')
      }
    } catch {
      setRecState('error')
    }
  }

  const stopRecordingEarly = () => {
    if (mediaRef.current?.state === 'recording') {
      mediaRef.current.stop()
    }
    clearInterval(recTimerRef.current)
    setRecState('done')
    addEvidence('sound')
  }

  useEffect(() => () => clearInterval(recTimerRef.current), [])

  // ── Photo capture ─────────────────────────────────────────────────────────
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPhotoThumb(url)
    addEvidence('photo')
  }

  // ── Birded it Together ────────────────────────────────────────────────────
  const handleTogether = async () => {
    setTogetherState('claiming')
    const result = await submitTogetherClaim({
      handle:       handle || 'anonymous',
      birdId:       bird.id,
      obs:          matchObs,
      userLocation,
    })
    if (result.success !== false) {
      setTogetherState('done')
      addEvidence('together')
      if (matchObs) addEvidence('location')   // together near an eBird obs = location credit too
    } else {
      setTogetherState('error')
    }
  }

  // ── Confirm ───────────────────────────────────────────────────────────────
  const handleConfirm = () => {
    saveLocalVerification(bird.id, evidence, multiplier)
    onConfirm({ evidence, multiplier, bonusPoints })
  }

  // ── Progress meter ────────────────────────────────────────────────────────
  const progressPct = required > 0
    ? Math.min(100, (credits / required) * 100)
    : Math.min(100, credits * 33)

  return (
    <div className="screen animate-fadeIn" style={{ background: 'var(--bg-deep)' }}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div style={{
        padding: '14px 20px 10px', flexShrink: 0,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{
            fontSize: 11, letterSpacing: 1, fontWeight: 700,
            color: isOptional ? 'var(--accent-amber)' : confirmed ? 'var(--accent-green)' : '#f5a623',
            marginBottom: 3,
          }}>
            {isOptional ? 'OPTIONAL · BONUS POINTS' : confirmed ? 'RECORD CONFIRMED' : `VERIFICATION REQUIRED (${required - credits} more)`}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700 }}>
            Verify Sighting
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 2 }}>
            {bird.commonName} · {bird.rarity}
          </div>
        </div>
        {isOptional && (
          <button onClick={onSkip} style={{
            background: 'none', border: 'none', color: 'var(--text-dim)',
            fontSize: 13, cursor: 'pointer', padding: '4px 0',
          }}>
            Skip →
          </button>
        )}
      </div>

      {/* ── Progress ────────────────────────────────────────────────────── */}
      <div style={{ padding: '12px 20px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 11 }}>
          <span style={{ color: 'var(--text-dim)' }}>
            {credits} credit{credits !== 1 ? 's' : ''} collected
          </span>
          {bonusPoints > 0 && (
            <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>
              +{bonusPoints} bonus pts ({Math.round((multiplier - 1) * 100)}%)
            </span>
          )}
        </div>
        <div style={{ height: 6, background: 'var(--bg-elevated)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${progressPct}%`,
            background: confirmed
              ? 'linear-gradient(90deg, var(--accent-green2), var(--accent-green))'
              : 'linear-gradient(90deg, #c87010, #f5a623)',
            borderRadius: 3, transition: 'width 0.5s ease',
            boxShadow: confirmed ? '0 0 8px rgba(61,220,127,0.5)' : 'none',
          }}/>
        </div>
      </div>

      {/* ── Evidence list ────────────────────────────────────────────────── */}
      <div className="scroll-y" style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* ── eBird match (auto) ────────────────────────────────────────── */}
        <EvidenceRow typeKey="ebird_match" state={evidence.includes('ebird_match') ? 'done' : 'idle'}>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.4 }}>
            {evidence.includes('ebird_match')
              ? `Matched eBird report${matchObs?.locName ? ` at ${matchObs.locName}` : ''}`
              : 'No recent eBird report for this species in your area'}
          </div>
        </EvidenceRow>

        {/* ── Location (auto) ───────────────────────────────────────────── */}
        <EvidenceRow typeKey="location" state={evidence.includes('location') ? 'done' : 'idle'}>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.4 }}>
            {evidence.includes('location')
              ? `Within 1km of ${matchObs?.locName || 'the eBird sighting'}`
              : matchObs
                ? 'Move closer to the reported location to auto-verify'
                : 'Requires a nearby eBird sighting to compare'}
          </div>
        </EvidenceRow>

        {/* ── Sound recording ───────────────────────────────────────────── */}
        <EvidenceRow typeKey="sound" state={evidence.includes('sound') ? 'done' : recState !== 'idle' ? 'active' : 'idle'}>
          {!evidence.includes('sound') ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {recState === 'idle' && (
                <button className="btn btn-outline btn-sm" onClick={startRecording}
                  style={{ alignSelf: 'flex-start' }}>
                  🎙 Record ambient sound (5s)
                </button>
              )}
              {recState === 'requesting' && (
                <div style={{ fontSize: 12, color: 'var(--text-dim)', fontStyle: 'italic' }}>
                  Requesting microphone…
                </div>
              )}
              {recState === 'recording' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Waveform active={true}/>
                  <span style={{ fontSize: 11, color: 'var(--accent-amber)', fontWeight: 600 }}>
                    Recording… {recSeconds}/5s
                  </span>
                  <button className="btn btn-outline btn-sm" onClick={stopRecordingEarly}
                    style={{ fontSize: 11, padding: '4px 10px' }}>
                    Stop
                  </button>
                </div>
              )}
              {recState === 'error' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, color: '#f87171' }}>Mic access denied</span>
                  <button className="btn btn-outline btn-sm" onClick={startRecording}
                    style={{ fontSize: 11 }}>Retry</button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Waveform active={false}/>
              <span style={{ fontSize: 11, color: 'var(--accent-green)' }}>
                {recSeconds > 0 ? `${recSeconds}s recording` : 'Recording saved'}
              </span>
            </div>
          )}
        </EvidenceRow>

        {/* ── Photo ─────────────────────────────────────────────────────── */}
        <EvidenceRow typeKey="photo" state={evidence.includes('photo') ? 'done' : 'idle'}>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />
          {!evidence.includes('photo') ? (
            <button className="btn btn-outline btn-sm" onClick={() => photoInputRef.current?.click()}
              style={{ alignSelf: 'flex-start' }}>
              📸 Take field photo
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {photoThumb && (
                <img src={photoThumb} alt="Field photo"
                  style={{ width: 52, height: 52, borderRadius: 8, objectFit: 'cover',
                    border: '1px solid rgba(61,220,127,0.3)' }}/>
              )}
              <span style={{ fontSize: 11, color: 'var(--accent-green)' }}>Photo attached</span>
            </div>
          )}
        </EvidenceRow>

        {/* ── Birded it Together ────────────────────────────────────────── */}
        <EvidenceRow typeKey="together"
          state={evidence.includes('together') ? 'done' : togetherState !== 'idle' ? 'active' : 'idle'}>

          {!evidence.includes('together') ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* eBird reporter piggyback */}
              {matchObs && (
                <div style={{
                  fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.5,
                  padding: '6px 8px', background: 'rgba(245,166,35,0.06)',
                  borderRadius: 8, border: '1px solid rgba(245,166,35,0.15)',
                }}>
                  <span style={{ color: 'var(--accent-amber)', fontWeight: 600 }}>
                    eBird report nearby:
                  </span>{' '}
                  {matchObs.locName}
                  {matchObs.obsDt ? ` · ${matchObs.obsDt.split(' ')[0]}` : ''}
                  {matchObs.howMany > 1 ? ` · ${matchObs.howMany} birds` : ''}
                  <br/>Joining this sighting gives you location + together credits (×2).
                </div>
              )}

              {togetherState === 'idle' && (
                <button className="btn btn-outline btn-sm"
                  onClick={handleTogether}
                  style={{ alignSelf: 'flex-start', borderColor: 'rgba(245,166,35,0.4)', color: 'var(--accent-amber)' }}>
                  🤝 {matchObs ? `Join ${matchObs.locName || 'this sighting'}` : 'Birded it Together'}
                </button>
              )}
              {togetherState === 'claiming' && (
                <div style={{ fontSize: 11, color: 'var(--text-dim)', fontStyle: 'italic' }}>
                  Submitting…
                </div>
              )}
              {togetherState === 'error' && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: '#f87171' }}>
                    {isLiveVerification ? 'Submit failed' : 'Saved locally (no Supabase)'}
                  </span>
                  <button className="btn btn-outline btn-sm" onClick={handleTogether}
                    style={{ fontSize: 11 }}>Retry</button>
                </div>
              )}

              <div style={{ fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.4 }}>
                Counts as 2 credits. Your claim is public — others can join within 2 hours.
                {!isLiveVerification && ' (Stored locally — connect Supabase to share globally.)'}
              </div>
            </div>
          ) : (
            <div style={{ fontSize: 12, color: 'var(--accent-green)' }}>
              🤝 Sighting claimed — others can join for 2h
              {!isLiveVerification && ' (local only)'}
            </div>
          )}
        </EvidenceRow>

        <div style={{ height: 8 }}/>
      </div>

      {/* ── Action bar ──────────────────────────────────────────────────── */}
      <div style={{ padding: '12px 16px 24px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button
          className="btn btn-primary btn-lg"
          onClick={handleConfirm}
          disabled={!isOptional && !confirmed}
          style={{ opacity: (!isOptional && !confirmed) ? 0.45 : 1 }}
        >
          {confirmed
            ? `✓ Confirm Record${bonusPoints > 0 ? ` (+${bonusPoints} pts)` : ''}`
            : isOptional
              ? `Confirm without bonus${bonusPoints > 0 ? ` (+${bonusPoints} pts)` : ''}`
              : `Need ${required - credits} more credit${required - credits !== 1 ? 's' : ''}`}
        </button>

        {!isOptional && !confirmed && (
          <button onClick={onSkip} style={{
            background: 'none', border: 'none', color: 'var(--text-dim)',
            fontSize: 12, cursor: 'pointer', padding: '4px', textAlign: 'center',
          }}>
            Save as tentative record (unconfirmed)
          </button>
        )}
      </div>
    </div>
  )
}
