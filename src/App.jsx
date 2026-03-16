import { useState, useEffect, useCallback } from 'react'
import RadarScreen from './components/RadarScreen'
import BirdEncounter from './components/BirdEncounter'
import BinocularsCapture from './components/BinocularsCapture'
import CaptureSuccess from './components/CaptureSuccess'
import Aviary from './components/Aviary'
import BirdDetail from './components/BirdDetail'
import { BIRDS, getRandomBird } from './data/birds'
import { useEBirdLocation } from './hooks/useEBirdLocation'

const SCREEN = {
  RADAR: 'radar', ENCOUNTER: 'encounter', BINOCULARS: 'binoculars',
  SUCCESS: 'success', AVIARY: 'aviary', BIRD_DETAIL: 'birdDetail',
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

  const { nearbyBirds, eBirdActive } = useEBirdLocation(userLocation)

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

      setCurrentBird(bird)
      setFunFactIndex(0)  // reset for new bird
      setEncounterInfo({
        distance: Math.floor(Math.random() * 180) + 20,
        direction: DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)],
        habitat: HABITATS[Math.floor(Math.random() * HABITATS.length)],
        isEBirdVerified: eBirdActive && Math.random() > 0.4,
      })
      setScreen(SCREEN.ENCOUNTER)
    }, ENCOUNTER_DELAY_MS)

    return () => clearTimeout(timer)
  }, [screen, nearbyBirds, eBirdActive])

  const goToRadar       = useCallback(() => setScreen(SCREEN.RADAR), [])
  const handleStartCapture = useCallback(() => setScreen(SCREEN.BINOCULARS), [])
  const handleDismiss   = useCallback(() => setScreen(SCREEN.RADAR), [])

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

  const handleMissed       = useCallback(() => setScreen(SCREEN.RADAR), [])
  const handleViewAviary   = useCallback(() => setScreen(SCREEN.AVIARY), [])
  const handleBackToAviary = useCallback(() => setScreen(SCREEN.AVIARY), [])

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
      {screen === SCREEN.RADAR && (
        <RadarScreen capturedBirds={capturedBirds} score={score}
          userLocation={userLocation} eBirdActive={eBirdActive}
          nearbyBirds={nearbyBirds} onViewAviary={handleViewAviary}/>
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
          onViewAviary={handleViewAviary} onContinue={goToRadar}
          onRelease={handleRelease}/>
      )}
      {screen === SCREEN.AVIARY && (
        <Aviary capturedBirds={capturedBirds} score={score}
          allBirds={BIRDS} onSelectBird={handleSelectBird} onBack={goToRadar}/>
      )}
      {screen === SCREEN.BIRD_DETAIL && selectedBird && (
        <BirdDetail bird={selectedBird} captured={capturedBirds.includes(selectedBird.id)}
          onBack={handleBackToAviary}/>
      )}
    </div>
  )
}
