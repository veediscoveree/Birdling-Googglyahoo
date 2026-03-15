import { useState, useEffect, useCallback } from 'react'
import RadarScreen from './components/RadarScreen'
import BirdEncounter from './components/BirdEncounter'
import BinocularsCapture from './components/BinocularsCapture'
import CaptureSuccess from './components/CaptureSuccess'
import Aviary from './components/Aviary'
import BirdDetail from './components/BirdDetail'
import { BIRDS, getRandomBird } from './data/birds'

const SCREEN = {
  RADAR:       'radar',
  ENCOUNTER:   'encounter',
  BINOCULARS:  'binoculars',
  SUCCESS:     'success',
  AVIARY:      'aviary',
  BIRD_DETAIL: 'birdDetail',
}

const ENCOUNTER_DELAY_MS = 6000  // show first bird encounter after 6s

export default function App() {
  const [screen, setScreen]             = useState(SCREEN.RADAR)
  const [currentBird, setCurrentBird]   = useState(null)
  const [capturedBirds, setCapturedBirds] = useState([]) // array of bird ids
  const [selectedBird, setSelectedBird] = useState(null)
  const [encounterInfo, setEncounterInfo] = useState(null)
  const [isNewCapture, setIsNewCapture] = useState(false)
  const [score, setScore]               = useState(0)
  const [userLocation, setUserLocation] = useState({ lat: 40.7614, lng: -73.9776 })

  // Try to get real location
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {} // silently fall back to NYC
    )
  }, [])

  // ── Encounter trigger ──────────────────────────────────────────────────────
  // On the radar screen, trigger an encounter after a delay.
  // In production this would fire from eBird/geofence proximity detection.
  useEffect(() => {
    if (screen !== SCREEN.RADAR) return
    const directions = ['to the north', 'nearby', 'to the east', 'in the park', '50m away', 'just ahead']
    const habitats   = ['the hedgerow', 'a nearby oak', 'the water\'s edge', 'the lawn', 'an open field', 'the treetops']
    const timer = setTimeout(() => {
      const bird = getRandomBird()
      setCurrentBird(bird)
      setEncounterInfo({
        distance: Math.floor(Math.random() * 180) + 20,
        direction: directions[Math.floor(Math.random() * directions.length)],
        habitat: habitats[Math.floor(Math.random() * habitats.length)],
        isEBirdVerified: Math.random() > 0.5,
      })
      setScreen(SCREEN.ENCOUNTER)
    }, ENCOUNTER_DELAY_MS)
    return () => clearTimeout(timer)
  }, [screen])

  // ── Screen handlers ────────────────────────────────────────────────────────
  const goToRadar = useCallback(() => setScreen(SCREEN.RADAR), [])

  const handleStartCapture = useCallback(() => setScreen(SCREEN.BINOCULARS), [])

  const handleDismissEncounter = useCallback(() => setScreen(SCREEN.RADAR), [])

  const handleCaptureSuccess = useCallback(() => {
    const isNew = !capturedBirds.includes(currentBird.id)
    setIsNewCapture(isNew)
    if (isNew) {
      setCapturedBirds(prev => [...prev, currentBird.id])
      setScore(prev => prev + currentBird.points)
    } else {
      setScore(prev => prev + Math.floor(currentBird.points * 0.1))
    }
    setScreen(SCREEN.SUCCESS)
  }, [currentBird, capturedBirds])

  const handleMissed = useCallback(() => setScreen(SCREEN.RADAR), [])

  const handleViewAviary = useCallback(() => setScreen(SCREEN.AVIARY), [])

  const handleSelectBird = useCallback((birdId) => {
    setSelectedBird(BIRDS.find(b => b.id === birdId))
    setScreen(SCREEN.BIRD_DETAIL)
  }, [])

  const handleBackToAviary = useCallback(() => setScreen(SCREEN.AVIARY), [])

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="app">
      {screen === SCREEN.RADAR && (
        <RadarScreen
          capturedBirds={capturedBirds}
          score={score}
          userLocation={userLocation}
          onViewAviary={handleViewAviary}
        />
      )}

      {screen === SCREEN.ENCOUNTER && currentBird && (
        <BirdEncounter
          bird={currentBird}
          info={encounterInfo}
          onStartCapture={handleStartCapture}
          onDismiss={handleDismissEncounter}
        />
      )}

      {screen === SCREEN.BINOCULARS && currentBird && (
        <BinocularsCapture
          bird={currentBird}
          onSuccess={handleCaptureSuccess}
          onMiss={handleMissed}
        />
      )}

      {screen === SCREEN.SUCCESS && currentBird && (
        <CaptureSuccess
          bird={currentBird}
          isNew={isNewCapture}
          score={score}
          onViewAviary={handleViewAviary}
          onContinue={goToRadar}
        />
      )}

      {screen === SCREEN.AVIARY && (
        <Aviary
          capturedBirds={capturedBirds}
          score={score}
          onSelectBird={handleSelectBird}
          onBack={goToRadar}
        />
      )}

      {screen === SCREEN.BIRD_DETAIL && selectedBird && (
        <BirdDetail
          bird={selectedBird}
          captured={capturedBirds.includes(selectedBird.id)}
          onBack={handleBackToAviary}
        />
      )}
    </div>
  )
}
