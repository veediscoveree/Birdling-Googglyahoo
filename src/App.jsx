import { useState, useEffect, useCallback } from 'react'
import RadarScreen from './components/RadarScreen'
import BirdEncounter from './components/BirdEncounter'
import BinocularsCapture from './components/BinocularsCapture'
import CaptureSuccess from './components/CaptureSuccess'
import Aviary from './components/Aviary'
import BirdDetail from './components/BirdDetail'
import Leaderboard from './components/Leaderboard'
import VerificationModal from './components/VerificationModal'
import { BIRDS, getRandomBird } from './data/birds'
import { detectAutoEvidence } from './lib/verification'
import { useEBirdLocation } from './hooks/useEBirdLocation'

function timeAgo(obsDt) {
  if (!obsDt) return ''
  const d = new Date(obsDt.replace(' ', 'T'))
  if (isNaN(d)) return ''
  const mins = Math.round((Date.now() - d) / 60000)
  if (mins < 2)  return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24)  return `${hrs}h ago`
  return `${Math.round(hrs / 24)}d ago`
}

const SCREEN = {
  RADAR: 'radar', RARITY_ALERT: 'rarityAlert', ENCOUNTER: 'encounter',
  BINOCULARS: 'binoculars', SUCCESS: 'success', AVIARY: 'aviary',
  BIRD_DETAIL: 'birdDetail', LEADERBOARD: 'leaderboard', VERIFY: 'verify',
}

function RarityAlert({ bird, onProceed, onDismiss }) {
  const alert = bird.vagrantAlert
  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#020804',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '24px', zIndex: 100,
    }}>
      {/* Pulsing rarity glow */}
      <div style={{
        width: 120, height: 120, borderRadius: '50%',
        background: `radial-gradient(circle, ${bird.rarityColor}44 0%, transparent 70%)`,
        animation: 'rarityPulse 1.6s ease-in-out infinite',
        marginBottom: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ fontSize: 56 }}>⚡</div>
      </div>

      <div style={{
        color: bird.rarityColor, fontSize: 11, fontFamily: 'monospace',
        letterSpacing: 4, textTransform: 'uppercase', marginBottom: 6,
      }}>Rare Bird Alert</div>

      <h1 style={{
        color: '#f5f5f0', fontSize: 'clamp(22px, 6vw, 32px)', fontFamily: 'Georgia, serif',
        fontWeight: 900, textAlign: 'center', margin: '0 0 4px',
        letterSpacing: 1,
      }}>{alert.headline}</h1>

      <div style={{
        color: bird.rarityColor, fontSize: 13, fontFamily: 'monospace',
        letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20,
        textAlign: 'center',
      }}>{alert.subtitle}</div>

      <p style={{
        color: '#c0c8b0', fontSize: 14, lineHeight: 1.7,
        textAlign: 'center', maxWidth: 380, margin: '0 0 32px',
      }}>{alert.body}</p>

      <div style={{ display: 'flex', gap: 12, flexDirection: 'column', width: '100%', maxWidth: 320 }}>
        <button onClick={onProceed} style={{
          background: bird.rarityColor, color: '#fff', border: 'none',
          borderRadius: 8, padding: '14px 24px', fontSize: 15,
          fontWeight: 700, fontFamily: 'monospace', letterSpacing: 2,
          textTransform: 'uppercase', cursor: 'pointer',
        }}>{alert.cta} →</button>
        <button onClick={onDismiss} style={{
          background: 'transparent', color: '#5a6a4a', border: '1px solid #2a3a1a',
          borderRadius: 8, padding: '10px 24px', fontSize: 13,
          fontFamily: 'monospace', letterSpacing: 1, cursor: 'pointer',
        }}>Pass — return to radar</button>
      </div>

      <style>{`
        @keyframes rarityPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

const ENCOUNTER_DELAY_MS = 6000

export default function App() {
  const [screen, setScreen]               = useState(SCREEN.RADAR)
  const [currentBird, setCurrentBird]     = useState(null)
  const [capturedBirds, setCapturedBirds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bhn_captured') || '[]') } catch { return [] }
  })
  const [selectedBird, setSelectedBird]   = useState(null)
  const [encounterInfo, setEncounterInfo] = useState(null)
  const [isNewCapture, setIsNewCapture]   = useState(false)
  const [score, setScore]                 = useState(() => {
    try { return parseInt(localStorage.getItem('bhn_score') || '0', 10) } catch { return 0 }
  })
  const [userLocation, setUserLocation]   = useState({ lat: 40.7614, lng: -73.9776 })
  const [funFactIndex, setFunFactIndex]   = useState(0)
  const [verificationResult, setVerificationResult] = useState(null)
  const handle = (() => { try { return localStorage.getItem('bhn_handle') || '' } catch { return '' } })()

  const { nearbyBirds, eBirdObs, eBirdActive } = useEBirdLocation(userLocation)

  // Persist aviary across reloads
  useEffect(() => {
    try { localStorage.setItem('bhn_captured', JSON.stringify(capturedBirds)) } catch {}
  }, [capturedBirds])
  useEffect(() => {
    try { localStorage.setItem('bhn_score', String(score)) } catch {}
  }, [score])

  // Geolocation
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {}
    )
  }, [])

  // Encounter trigger — picks from nearby birds (location-aware)
  useEffect(() => {
    if (screen !== SCREEN.RADAR) return
    const pool = nearbyBirds.length > 0 ? nearbyBirds : BIRDS
    const DIRECTIONS = ['to the north','nearby','to the east','in the park','50m away','just ahead']
    const HABITATS   = ['the hedgerow','a nearby oak','the water\'s edge','the lawn','open field','the treetops']

    const timer = setTimeout(() => {
      // Weight toward common species 70% of the time
      const common = pool.filter(b => b.rarity === 'common')
      const bird = (common.length > 0 && Math.random() < 0.7)
        ? common[Math.floor(Math.random() * common.length)]
        : pool[Math.floor(Math.random() * pool.length)]

      // Find matching eBird observation for this bird
      const obs = eBirdActive
        ? eBirdObs.find(o => o.bird.id === bird.id)
        : null

      setCurrentBird(bird)
      setFunFactIndex(0)  // reset for new bird

      // Minimum encounter distance by size — ensures the bird has room to move
      // at least 4 body-lengths laterally within the capture view.
      // Larger birds at close range overflow the oval; keeping them further away
      // also looks more realistic (ducks are across the pond, herons at the far bank).
      const minDist = { tiny: 20, small: 30, medium: 45, large: 65, very_large: 90 }
      const dMin = minDist[bird.sizeCategory] ?? 30
      const distance = Math.floor(Math.random() * (130 - dMin)) + dMin

      setEncounterInfo({
        distance,
        direction:     DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)],
        habitat:       obs?.locName || HABITATS[Math.floor(Math.random() * HABITATS.length)],
        isEBirdVerified: !!obs,
        eBirdLocName:  obs?.locName || null,
        eBirdTimeAgo:  obs?.obsDt   ? timeAgo(obs.obsDt) : null,
      })
      // Rare/vagrant birds get a dramatic rarity alert before the encounter
      const isVagrant = bird.vagrantAlert || bird.rarity === 'legendary'
      setScreen(isVagrant ? SCREEN.RARITY_ALERT : SCREEN.ENCOUNTER)
    }, ENCOUNTER_DELAY_MS)

    return () => clearTimeout(timer)
  }, [screen, nearbyBirds, eBirdActive])

  const goToRadar              = useCallback(() => setScreen(SCREEN.RADAR), [])
  const handleStartCapture     = useCallback(() => setScreen(SCREEN.BINOCULARS), [])
  const handleDismiss          = useCallback(() => setScreen(SCREEN.RADAR), [])
  const handleRarityProceed    = useCallback(() => setScreen(SCREEN.ENCOUNTER), [])

  const handleCaptureSuccess = useCallback(() => {
    const isNew = !capturedBirds.includes(currentBird.id)
    setIsNewCapture(isNew)
    if (isNew) {
      setCapturedBirds(prev => [...prev, currentBird.id])
      // Introduced birds subtract points; native birds add them
      setScore(prev => prev + currentBird.points)
    } else {
      // Resighting: introduced birds give 0 extra, native give 10%
      if (!currentBird.introduced) {
        setScore(prev => prev + Math.floor(currentBird.points * 0.1))
      }
      const facts = currentBird.funFacts || [currentBird.funFact]
      setFunFactIndex(prev => (prev + 1) % facts.length)
    }
    setScreen(SCREEN.SUCCESS)
  }, [currentBird, capturedBirds])

  // Release an introduced bird: undo the capture and restore points
  const handleRelease = useCallback(() => {
    if (!currentBird) return
    setCapturedBirds(prev => prev.filter(id => id !== currentBird.id))
    // Restore the penalty (points is negative for introduced birds)
    setScore(prev => prev - currentBird.points)
    setScreen(SCREEN.RADAR)
  }, [currentBird])

  const handleMissed           = useCallback(() => setScreen(SCREEN.RADAR), [])
  const handleViewAviary       = useCallback(() => setScreen(SCREEN.AVIARY), [])
  const handleBackToAviary     = useCallback(() => setScreen(SCREEN.AVIARY), [])
  const handleViewLeaderboard  = useCallback(() => setScreen(SCREEN.LEADERBOARD), [])
  const handleOpenVerify       = useCallback(() => setScreen(SCREEN.VERIFY), [])
  const handleVerifyConfirm    = useCallback(({ bonusPoints }) => {
    if (bonusPoints > 0) setScore(prev => prev + bonusPoints)
    setVerificationResult({ confirmed: true })
    setScreen(SCREEN.SUCCESS)
  }, [])
  const handleVerifySkip       = useCallback(() => {
    setVerificationResult({ confirmed: false })
    setScreen(SCREEN.SUCCESS)
  }, [])

  const handleSelectBird = useCallback((birdId) => {
    setSelectedBird(BIRDS.find(b => b.id === birdId))
    setScreen(SCREEN.BIRD_DETAIL)
  }, [])

  // Get the current fun fact for the active bird (rotates on resighting)
  const getCurrentFunFact = (bird) => {
    if (!bird) return ''
    const facts = bird.funFacts || [bird.funFact]
    return facts[funFactIndex % facts.length]
  }

  return (
    <div className="app">
      {/* Version badge — visible in all screens for debugging */}
      <div style={{
        position: 'fixed', bottom: 4, right: 6, zIndex: 9999,
        fontSize: 9, fontFamily: 'monospace', color: 'rgba(61,220,127,0.55)',
        letterSpacing: 0.5, pointerEvents: 'none',
      }}>v2.1-landscape</div>
      {screen === SCREEN.RARITY_ALERT && currentBird && (
        <RarityAlert bird={currentBird}
          onProceed={handleRarityProceed} onDismiss={handleDismiss}/>
      )}
      {screen === SCREEN.RADAR && (
        <RadarScreen capturedBirds={capturedBirds} score={score}
          userLocation={userLocation} eBirdActive={eBirdActive}
          nearbyBirds={nearbyBirds} eBirdObs={eBirdObs}
          onViewAviary={handleViewAviary}
          onViewLeaderboard={handleViewLeaderboard}/>
      )}
      {screen === SCREEN.ENCOUNTER && currentBird && (
        <BirdEncounter bird={currentBird} info={encounterInfo}
          onStartCapture={handleStartCapture} onDismiss={handleDismiss}/>
      )}
      {screen === SCREEN.BINOCULARS && currentBird && (
        <BinocularsCapture bird={currentBird}
          encounterDistance={encounterInfo?.distance}
          onSuccess={handleCaptureSuccess} onMiss={handleMissed}/>
      )}
      {screen === SCREEN.SUCCESS && currentBird && (
        <CaptureSuccess bird={currentBird} isNew={isNewCapture} score={score}
          funFact={getCurrentFunFact(currentBird)}
          verificationResult={verificationResult}
          onVerify={handleOpenVerify}
          onViewAviary={handleViewAviary} onContinue={goToRadar}
          onRelease={handleRelease}/>
      )}
      {screen === SCREEN.VERIFY && currentBird && (
        <VerificationModal
          bird={currentBird}
          eBirdObs={eBirdObs}
          userLocation={userLocation}
          handle={handle}
          initialEvidence={detectAutoEvidence(currentBird, eBirdObs, userLocation)}
          onConfirm={handleVerifyConfirm}
          onSkip={handleVerifySkip}/>
      )}
      {screen === SCREEN.AVIARY && (
        <Aviary capturedBirds={capturedBirds} score={score}
          allBirds={BIRDS} onSelectBird={handleSelectBird} onBack={goToRadar}/>
      )}
      {screen === SCREEN.BIRD_DETAIL && selectedBird && (
        <BirdDetail bird={selectedBird} captured={capturedBirds.includes(selectedBird.id)}
          onBack={handleBackToAviary}/>
      )}
      {screen === SCREEN.LEADERBOARD && (
        <Leaderboard capturedBirds={capturedBirds} score={score} onBack={goToRadar}/>
      )}
    </div>
  )
}
