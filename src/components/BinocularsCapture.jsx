// Bird. Here. Now. — Binoculars Capture Mechanic
//
// Controls:
//   Mobile  — DeviceOrientationEvent: tilt creates velocity (momentum-based panning)
//   Desktop — Mouse move (relative to screen center)
//   Touch   — Drag (fallback)
//
// Bird movement: species-specific state machines with 2-3 characteristic moves.
// Focus knob: players must also dial in the correct optical focus distance.
// Backgrounds: habitat-appropriate SVG scenes inside the lens.

import { useState, useEffect, useRef, useCallback } from 'react'
import { BirdAvatar } from './BirdAvatars'

// ── Constants ──────────────────────────────────────────────────────────────
const CAPTURE_TIME_MS   = 2200   // hold BOTH spatial + optical focus this long
const ENCOUNTER_TIME_MS = 32000  // total time before bird flees
const SPATIAL_FOCUS_R   = 0.18   // fraction of lens radius for "in center"
const OPTICAL_BLUR_MAX  = 1.2    // optical focus blur at which capture is impossible
const MAX_FLEES         = 2

function clamp(v, min, max) { return Math.min(max, Math.max(min, v)) }

// ── Habitat backgrounds ────────────────────────────────────────────────────
// Returns an SVG <g> element rendered inside the lens
function HabitatBackground({ type, lensR }) {
  const cx = lensR
  const cy = lensR
  switch (type) {
    case 'wetland':
    case 'marsh_edge':
      return (
        <g>
          {/* Sky */}
          <rect x="0" y="0" width={lensR*2} height={lensR*1.1} fill="#7AACCF"/>
          <rect x="0" y={lensR*0.6} width={lensR*2} height={lensR*0.5} fill="#6B9CBF"/>
          {/* Water */}
          <rect x="0" y={lensR*1.1} width={lensR*2} height={lensR*0.9} fill="#2A5A6A"/>
          {/* Water ripples */}
          {[20,50,80,110,140,160].map((x,i) => (
            <ellipse key={i} cx={x} cy={lensR*1.2+i*10} rx={12+i*3} ry={2} fill="#3A6A7A" opacity="0.5"/>
          ))}
          {/* Cattails */}
          {[30, 68, 140, 178].map((x, i) => (
            <g key={i}>
              <line x1={x} y1={lensR*2} x2={x} y2={lensR*0.7} stroke="#6B5030" strokeWidth="2.5"/>
              <ellipse cx={x} cy={lensR*0.82} rx={5} ry={14} fill="#5A3A20"/>
            </g>
          ))}
          {/* Overhanging branch */}
          <path d={`M 0 ${lensR*0.5} C ${lensR*0.6} ${lensR*0.4} ${lensR} ${lensR*0.55} ${lensR*1.4} ${lensR*0.45}`}
            stroke="#4A3018" strokeWidth="8" fill="none" strokeLinecap="round"/>
          <path d={`M 0 ${lensR*0.5} C ${lensR*0.6} ${lensR*0.4} ${lensR} ${lensR*0.55} ${lensR*1.4} ${lensR*0.45}`}
            stroke="#5A4020" strokeWidth="5" fill="none" strokeLinecap="round"/>
        </g>
      )

    case 'forest_canopy':
    case 'tall_trees':
      return (
        <g>
          {/* Sky between leaves */}
          <rect x="0" y="0" width={lensR*2} height={lensR*2} fill="#87CEEB"/>
          {/* Layered leaf clusters — back layer */}
          {[[-10,10],[40,-5],[90,15],[140,-8],[175,20],[20,50],[80,45],[130,50]].map(([x,y],i) => (
            <ellipse key={`b${i}`} cx={x} cy={y} rx={38+i*3} ry={28+i*2}
              fill={i%2===0 ? '#3A6A28' : '#4A7A35'} opacity="0.9"/>
          ))}
          {/* Main branch */}
          <path d={`M 0 ${lensR*0.9} C ${lensR*0.5} ${lensR*0.85} ${lensR*1.1} ${lensR*0.95} ${lensR*2} ${lensR*0.88}`}
            stroke="#5A3A18" strokeWidth="18" fill="none"/>
          <path d={`M 0 ${lensR*0.9} C ${lensR*0.5} ${lensR*0.85} ${lensR*1.1} ${lensR*0.95} ${lensR*2} ${lensR*0.88}`}
            stroke="#7A5020" strokeWidth="12" fill="none"/>
          {/* Front leaf layer */}
          {[[5,75],[60,65],[120,70],[165,80],[-5,110],[50,105],[100,100],[155,108]].map(([x,y],i) => (
            <ellipse key={`f${i}`} cx={x} cy={y} rx={30+i*2} ry={22+i*2}
              fill={i%2===0 ? '#2A5A1E' : '#3A6A28'} opacity="0.85"/>
          ))}
        </g>
      )

    case 'forest_floor':
      return (
        <g>
          {/* Dim forest light */}
          <rect x="0" y="0" width={lensR*2} height={lensR*2} fill="#2A3820"/>
          {/* Dappled sky light through canopy */}
          <ellipse cx={lensR*0.6} cy={lensR*0.3} rx={30} ry={20} fill="#6A9A60" opacity="0.3"/>
          <ellipse cx={lensR*1.3} cy={lensR*0.4} rx={20} ry={14} fill="#6A9A60" opacity="0.25"/>
          {/* Tree trunks */}
          {[25, 160].map((x, i) => (
            <g key={i}>
              <rect x={x-10} y="0" width={22} height={lensR*2} fill="#4A3018" rx="4"/>
              <rect x={x-7} y="0" width={6} height={lensR*2} fill="#5A3A20" rx="2" opacity="0.6"/>
            </g>
          ))}
          {/* Ground — leaf litter */}
          <rect x="0" y={lensR*1.3} width={lensR*2} height={lensR*0.7} fill="#5A4028"/>
          {[20,45,70,95,115,140,160,175].map((x,i) => (
            <ellipse key={i} cx={x} cy={lensR*1.4+i*5} rx={10+i*2} ry={4+i}
              fill={i%2===0 ? '#7A5A30' : '#6A4A20'} opacity="0.8"/>
          ))}
          {/* Ferns */}
          {[40, 100, 155].map((x, i) => (
            <path key={i} d={`M ${x} ${lensR*1.3} C ${x-20} ${lensR*1.1} ${x-15} ${lensR*0.9} ${x} ${lensR*0.85}`}
              stroke="#3A6A28" strokeWidth="3" fill="none"/>
          ))}
        </g>
      )

    case 'forest_trunk':
      return (
        <g>
          {/* Bark texture — close-up */}
          <rect x="0" y="0" width={lensR*2} height={lensR*2} fill="#5A4028"/>
          {/* Bark ridges */}
          {Array.from({length:12}, (_,i) => (
            <path key={i}
              d={`M ${i*20-10} 0 C ${i*20-5} ${lensR*0.5} ${i*20+5} ${lensR} ${i*20} ${lensR*2}`}
              stroke="#4A3018" strokeWidth="6" fill="none" opacity="0.7"/>
          ))}
          {Array.from({length:8}, (_,i) => (
            <path key={i}
              d={`M ${i*28} 0 C ${i*28+4} ${lensR*0.6} ${i*28-4} ${lensR*1.2} ${i*28+2} ${lensR*2}`}
              stroke="#3A2010" strokeWidth="3" fill="none" opacity="0.5"/>
          ))}
          {/* Lichen patches */}
          {[[30,40],[80,90],[140,60],[160,130],[50,160]].map(([x,y],i) => (
            <ellipse key={i} cx={x} cy={y} rx={12+i} ry={8+i}
              fill={i%2===0 ? '#7A8A50' : '#6A7A40'} opacity="0.4"/>
          ))}
        </g>
      )

    case 'shrubby_field':
    case 'shrubby_undergrowth':
    case 'forest_undergrowth':
      return (
        <g>
          {/* Sky */}
          <rect x="0" y="0" width={lensR*2} height={lensR} fill="#A8C8E8"/>
          {/* Horizon haze */}
          <rect x="0" y={lensR*0.7} width={lensR*2} height={lensR*0.3} fill="#C8D8B0" opacity="0.6"/>
          {/* Ground */}
          <rect x="0" y={lensR} width={lensR*2} height={lensR} fill="#4A6A30"/>
          {/* Wild grass and weeds */}
          {Array.from({length:18}, (_,i) => (
            <path key={i}
              d={`M ${i*13+5} ${lensR*2} C ${i*13+2} ${lensR*1.3} ${i*13+8} ${lensR*0.9} ${i*13+5} ${lensR*0.8}`}
              stroke={i%3===0 ? '#8AB040' : '#6A9030'} strokeWidth={i%2===0?2:1.5} fill="none" opacity="0.8"/>
          ))}
          {/* Shrub clumps */}
          {[[20,lensR],[80,lensR-5],[140,lensR],[185,lensR+5]].map(([x,y],i) => (
            <ellipse key={i} cx={x} cy={y} rx={25+i*5} ry={20+i*3}
              fill={i%2===0 ? '#3A6020' : '#4A7030'} opacity="0.9"/>
          ))}
          {/* Weed stems — for bunting perching */}
          {[60, 120, 160].map((x, i) => (
            <line key={i} x1={x} y1={lensR*2} x2={x+i*3-3} y2={lensR*0.5}
              stroke="#7A6030" strokeWidth="2" opacity="0.8"/>
          ))}
        </g>
      )

    case 'forest_edge':
      return (
        <g>
          {/* Sky */}
          <rect x="0" y="0" width={lensR*2} height={lensR*0.7} fill="#A0C8E0"/>
          {/* Tree line left */}
          <path d={`M 0 ${lensR*0.7} C 20 ${lensR*0.4} 50 ${lensR*0.2} 70 ${lensR*0.5} C 80 ${lensR*0.3} 90 ${lensR*0.1} 100 ${lensR*0.4} C 110 ${lensR*0.2} 120 0 130 ${lensR*0.3}`}
            fill="#3A6020" opacity="0.9"/>
          {/* Open ground/grass half */}
          <rect x="0" y={lensR*0.7} width={lensR*2} height={lensR*1.3} fill="#4A7030"/>
          {/* Branch reaching in from side */}
          <path d={`M 0 ${lensR*0.85} C ${lensR*0.4} ${lensR*0.8} ${lensR*0.8} ${lensR*0.9} ${lensR*1.3} ${lensR*0.82}`}
            stroke="#5A3A18" strokeWidth="14" fill="none"/>
          <path d={`M 0 ${lensR*0.85} C ${lensR*0.4} ${lensR*0.8} ${lensR*0.8} ${lensR*0.9} ${lensR*1.3} ${lensR*0.82}`}
            stroke="#7A5020" strokeWidth="8" fill="none"/>
          {/* Leaf clusters along branch */}
          {[50, 100, 145].map((x, i) => (
            <ellipse key={i} cx={x} cy={lensR*0.78} rx={22} ry={16}
              fill={i%2===0 ? '#3A6A28' : '#4A7A35'} opacity="0.85"/>
          ))}
        </g>
      )

    case 'urban_edge':
      return (
        <g>
          <rect x="0" y="0" width={lensR*2} height={lensR*2} fill="#8A9A9A"/>
          {/* Building walls */}
          <rect x="0" y={lensR*0.2} width={lensR*0.8} height={lensR*1.8} fill="#B0A8A0"/>
          <rect x={lensR*0.9} y={lensR*0.5} width={lensR*0.6} height={lensR*1.5} fill="#A8A090"/>
          <rect x={lensR*1.6} y={lensR*0.1} width={lensR*0.4} height={lensR*1.9} fill="#C0B8B0"/>
          {/* Windows */}
          {[0.3,0.6,1.0].map((y,i) => <rect key={i} x={lensR*0.15} y={lensR*y} width={18} height={14} fill="#7A9AB0" opacity="0.6" rx="2"/>)}
          {/* Ground — pavement */}
          <rect x="0" y={lensR*1.5} width={lensR*2} height={lensR*0.5} fill="#707878"/>
        </g>
      )

    default: // generic woodland
      return (
        <g>
          <rect x="0" y="0" width={lensR*2} height={lensR*0.6} fill="#6A9ABF"/>
          <path d={`M 0 ${lensR*0.6} C 30 ${lensR*0.3} 70 ${lensR*0.1} 110 ${lensR*0.4} C 130 ${lensR*0.2} 150 0 180 ${lensR*0.3} C 190 ${lensR*0.1} 200 ${lensR*0.2} ${lensR*2} ${lensR*0.5}`}
            fill="#3A6020" opacity="0.9"/>
          <rect x="0" y={lensR*0.6} width={lensR*2} height={lensR*1.4} fill="#3A5020"/>
          <path d={`M 10 ${lensR*0.9} C ${lensR*0.5} ${lensR*0.85} ${lensR} ${lensR*0.92} ${lensR*1.8} ${lensR*0.88}`}
            stroke="#4A3018" strokeWidth="12" fill="none"/>
          <path d={`M 10 ${lensR*0.9} C ${lensR*0.5} ${lensR*0.85} ${lensR} ${lensR*0.92} ${lensR*1.8} ${lensR*0.88}`}
            stroke="#6A4A20" strokeWidth="7" fill="none"/>
        </g>
      )
  }
}

// ── Species movement state machines ──────────────────────────────────────────
// Each pattern returns { x, y } updates and manages its own internal state.

function makeBehaviorEngine(movementPattern, startPos) {
  let pos = { ...startPos }
  let target = { x: 0, y: 0 }
  let phase = 'pause'
  let phaseTimer = 0
  let phaseDuration = 800
  let phaseIndex = 0

  const rand = (min, max) => min + Math.random() * (max - min)
  const lerp = (a, b, t) => a + (b - a) * t

  function nextPhase() {
    phaseTimer = 0
    phaseIndex++
    switch (movementPattern) {
      case 'flit': {
        // Warbler: perch pause → quick dart → perch pause
        if (phaseIndex % 3 === 0) {
          phase = 'dart'
          target = { x: clamp(pos.x + rand(-0.45, 0.45), -0.7, 0.7), y: clamp(pos.y + rand(-0.35, 0.35), -0.6, 0.6) }
          phaseDuration = rand(150, 300)
        } else {
          phase = 'perch'
          phaseDuration = rand(600, 1400)
        }
        break
      }
      case 'fanning': {
        // Redstart: perch + fan → dart after insect → return
        const seq = phaseIndex % 4
        if (seq === 0) { phase = 'perch'; phaseDuration = rand(500, 1000) }
        else if (seq === 1) { phase = 'dart'; target = { x: clamp(pos.x + rand(-0.4, 0.4), -0.7, 0.7), y: clamp(pos.y + rand(-0.3, 0.3), -0.6, 0.6) }; phaseDuration = rand(120, 250) }
        else if (seq === 2) { phase = 'return'; phaseDuration = rand(150, 280) }
        else { phase = 'perch'; phaseDuration = rand(400, 800) }
        break
      }
      case 'skulking': {
        // Yellowthroat: hide at edge → peek toward center → scurry away
        const seq = phaseIndex % 4
        if (seq === 0) { phase = 'hide'; target = { x: rand(0.5, 0.85) * (Math.random()>0.5?1:-1), y: rand(-0.3, 0.3) }; phaseDuration = rand(1200, 2200) }
        else if (seq === 1) { phase = 'peek'; target = { x: rand(-0.2, 0.2), y: clamp(pos.y + rand(-0.15, 0.15), -0.5, 0.5) }; phaseDuration = rand(300, 600) }
        else if (seq === 2) { phase = 'scurry'; target = { x: rand(-0.7, -0.3) * (Math.random()>0.5?1:-1), y: rand(-0.4, 0.4) }; phaseDuration = rand(250, 500) }
        else { phase = 'hide'; target = { x: rand(0.55, 0.9) * (Math.random()>0.5?1:-1), y: rand(-0.3, 0.3) }; phaseDuration = rand(1000, 1800) }
        break
      }
      case 'creeping': {
        // B&W Warbler: slow creep up → sideways → probe → down
        const seq = phaseIndex % 4
        if (seq === 0) { phase = 'creep_up'; target = { x: clamp(pos.x + rand(-0.1, 0.1), -0.5, 0.5), y: clamp(pos.y - rand(0.15, 0.3), -0.7, 0.7) }; phaseDuration = rand(800, 1400) }
        else if (seq === 1) { phase = 'creep_side'; target = { x: clamp(pos.x + rand(-0.25, 0.25), -0.6, 0.6), y: clamp(pos.y + rand(-0.05, 0.05), -0.7, 0.7) }; phaseDuration = rand(600, 1000) }
        else if (seq === 2) { phase = 'probe'; target = { x: pos.x + rand(-0.05, 0.05), y: pos.y + rand(-0.05, 0.05) }; phaseDuration = rand(300, 500) }
        else { phase = 'creep_down'; target = { x: clamp(pos.x + rand(-0.1, 0.1), -0.5, 0.5), y: clamp(pos.y + rand(0.1, 0.2), -0.7, 0.7) }; phaseDuration = rand(700, 1200) }
        break
      }
      case 'vireo': {
        // Slow deliberate vireo: long pause → small step → pause → step
        if (phaseIndex % 3 === 0) {
          phase = 'step'
          target = { x: clamp(pos.x + rand(-0.18, 0.18), -0.6, 0.6), y: clamp(pos.y + rand(-0.12, 0.12), -0.5, 0.5) }
          phaseDuration = rand(350, 600)
        } else {
          phase = 'pause_long'
          phaseDuration = rand(1800, 3500)
        }
        break
      }
      case 'oriole': {
        // Pendulum swing → hop along branch → hang
        const seq = phaseIndex % 3
        if (seq === 0) { phase = 'hang'; phaseDuration = rand(800, 1400) }
        else if (seq === 1) { phase = 'hop_branch'; target = { x: clamp(pos.x + rand(-0.35, 0.35), -0.65, 0.65), y: clamp(pos.y + rand(-0.15, 0.15), -0.5, 0.5) }; phaseDuration = rand(250, 450) }
        else { phase = 'swing'; phaseDuration = rand(600, 1000) }
        break
      }
      case 'scratching': {
        // Towhee: scratch backward → pause → hop forward
        const seq = phaseIndex % 3
        if (seq === 0) { phase = 'scratch'; target = { x: clamp(pos.x - rand(0.05, 0.15), -0.7, 0.7), y: clamp(pos.y + rand(0.02, 0.06), -0.6, 0.6) }; phaseDuration = rand(400, 700) }
        else if (seq === 1) { phase = 'pause_scratch'; phaseDuration = rand(500, 1000) }
        else { phase = 'hop_forward'; target = { x: clamp(pos.x + rand(0.03, 0.1), -0.7, 0.7), y: clamp(pos.y - rand(0.02, 0.05), -0.6, 0.6) }; phaseDuration = rand(180, 320) }
        break
      }
      case 'hopping': {
        // Ground birds: pause → hop → run → pause
        const seq = phaseIndex % 4
        if (seq === 0 || seq === 3) { phase = 'pause_ground'; phaseDuration = rand(700, 1500) }
        else if (seq === 1) { phase = 'hop'; target = { x: clamp(pos.x + rand(-0.25, 0.25), -0.7, 0.7), y: clamp(pos.y + rand(-0.2, 0.2), -0.6, 0.6) }; phaseDuration = rand(200, 350) }
        else { phase = 'run'; target = { x: clamp(pos.x + rand(-0.4, 0.4), -0.7, 0.7), y: clamp(pos.y + rand(-0.2, 0.2), -0.6, 0.6) }; phaseDuration = rand(300, 600) }
        break
      }
      case 'swimming': {
        phase = 'swim_sway'
        phaseDuration = rand(1500, 2500)
        break
      }
      case 'soaring': {
        phase = 'soar_circle'
        phaseDuration = rand(3000, 5000)
        break
      }
      case 'stalking': {
        phase = 'stalk_slow'
        phaseDuration = rand(2000, 4000)
        target = { x: clamp(pos.x + rand(-0.15, 0.15), -0.5, 0.5), y: clamp(pos.y + rand(-0.1, 0.1), -0.4, 0.4) }
        break
      }
      case 'hovering': {
        // Hummingbird: hover near flower → dart → hover
        const seq = phaseIndex % 3
        if (seq !== 1) { phase = 'hover'; phaseDuration = rand(1000, 2000) }
        else { phase = 'dart_fast'; target = { x: clamp(pos.x + rand(-0.5, 0.5), -0.7, 0.7), y: clamp(pos.y + rand(-0.4, 0.4), -0.6, 0.6) }; phaseDuration = rand(100, 200) }
        break
      }
      default: { // perching
        if (phaseIndex % 5 === 0) {
          phase = 'fly_to_branch'
          target = { x: clamp(pos.x + rand(-0.5, 0.5), -0.65, 0.65), y: clamp(pos.y + rand(-0.4, 0.4), -0.55, 0.55) }
          phaseDuration = rand(250, 450)
        } else {
          phase = 'sit_still'
          phaseDuration = rand(1200, 2800)
        }
        break
      }
    }
  }

  // Initialize first phase
  nextPhase()

  return {
    update(dt, totalFrame) {
      phaseTimer += dt
      if (phaseTimer >= phaseDuration) nextPhase()

      const t = Math.min(phaseTimer / phaseDuration, 1)
      const noise = () => (Math.random() - 0.5) * 0.004

      switch (phase) {
        case 'perch':
        case 'pause_long':
        case 'sit_still':
        case 'pause_ground':
        case 'pause_scratch':
        case 'hang':
          pos.x += noise()
          pos.y += (Math.sin(totalFrame * 0.05) * 0.003) + noise()
          break

        case 'dart':
        case 'dart_fast':
        case 'hop':
        case 'run':
        case 'hop_forward':
        case 'hop_branch':
        case 'fly_to_branch':
        case 'step':
        case 'creep_up':
        case 'creep_side':
        case 'creep_down':
        case 'peek':
        case 'scurry':
        case 'scratch': {
          // Smooth lerp toward target
          const speed = phase === 'dart_fast' ? 0.18 : (phase === 'dart' || phase === 'hop' ? 0.12 : 0.06)
          pos.x = lerp(pos.x, target.x, speed)
          pos.y = lerp(pos.y, target.y, speed)
          break
        }

        case 'hide':
          pos.x = lerp(pos.x, target.x, 0.04)
          pos.y = lerp(pos.y, target.y, 0.04)
          break

        case 'probe':
          pos.x += Math.sin(totalFrame * 0.3) * 0.006
          pos.y += Math.cos(totalFrame * 0.4) * 0.004
          break

        case 'return':
          // Return roughly toward center after catch
          pos.x = lerp(pos.x, pos.x * 0.5, 0.08)
          pos.y = lerp(pos.y, pos.y * 0.5, 0.08)
          break

        case 'swim_sway':
          pos.x = Math.sin(totalFrame * 0.025) * 0.55
          pos.y += noise()
          pos.y *= 0.98
          break

        case 'soar_circle': {
          const angle = totalFrame * 0.018
          pos.x = Math.sin(angle) * 0.45
          pos.y = Math.cos(angle) * 0.22
          break
        }

        case 'stalk_slow':
          pos.x = lerp(pos.x, target.x, 0.006)
          pos.y = lerp(pos.y, target.y, 0.005)
          pos.x += noise()
          pos.y += noise()
          break

        case 'hover': {
          const hNoise = 0.008
          pos.x += (Math.random() - 0.5) * hNoise
          pos.y += (Math.random() - 0.5) * hNoise
          break
        }

        case 'swing':
          pos.x = lerp(pos.x, pos.x + Math.sin(totalFrame * 0.08) * 0.03, 1)
          pos.y += noise()
          break
      }

      return { x: clamp(pos.x, -0.85, 0.85), y: clamp(pos.y, -0.75, 0.75) }
    },
    getPos() { return { ...pos } },
  }
}

// ── Background mapping ────────────────────────────────────────────────────────
const BIRD_BACKGROUNDS = {
  wetland: ['prothonotary_warbler', 'great_blue_heron', 'mallard'],
  marsh_edge: ['common_yellowthroat'],
  forest_canopy: ['red_eyed_vireo', 'blue_headed_vireo', 'yellow_throated_vireo', 'scarlet_tanager',
                  'black_capped_chickadee', 'white_breasted_nuthatch', 'cedar_waxwing', 'blue_jay'],
  forest_trunk: ['black_and_white_warbler', 'downy_woodpecker'],
  forest_edge: ['american_redstart', 'yellow_rumped_warbler', 'rose_breasted_grosbeak',
                'northern_cardinal', 'american_robin', 'eastern_bluebird'],
  tall_trees: ['baltimore_oriole', 'red_tailed_hawk', 'american_crow'],
  shrubby_field: ['indigo_bunting', 'american_goldfinch', 'american_kestrel', 'barn_swallow'],
  forest_undergrowth: ['eastern_towhee', 'song_sparrow', 'dark_eyed_junco'],
  forest_floor: ['wood_thrush'],
  open_field: ['mourning_dove', 'red_winged_blackbird', 'common_grackle', 'house_finch', 'house_finch'],
  open_water: ['canada_goose'],
  sky: ['turkey_vulture', 'osprey'],
  urban_edge: ['house_sparrow', 'european_starling'],
}

function getBirdBackground(birdId) {
  if (!birdId) return 'forest_edge'
  // Check captureBackground from data first via birdId matching
  for (const [bg, ids] of Object.entries(BIRD_BACKGROUNDS)) {
    if (ids.includes(birdId)) return bg
  }
  return 'forest_edge'
}

// ── Component ──────────────────────────────────────────────────────────────
export default function BinocularsCapture({ bird, encounterDistance, onSuccess, onMiss }) {
  // ── Refs (game state — not rendered directly) ─────────────────────────────
  const birdPosRef      = useRef({ x: 0.3, y: 0.1 })
  const behaviorRef     = useRef(null)
  const frameRef        = useRef(0)
  const animRef         = useRef(null)

  // View offset — where binoculars are pointing
  const viewOffsetRef   = useRef({ x: 0, y: 0 })
  const tiltVelRef      = useRef({ x: 0, y: 0 })
  const orientRef       = useRef({ beta: 45, gamma: 0 })
  const hasTiltRef      = useRef(false)
  const prevViewRef     = useRef({ x: 0, y: 0 })

  // Focus knob — optical focus distance in meters
  const opticalFocusRef = useRef(35)  // starts at 35m
  const birdDistanceRef = useRef(encounterDistance || (20 + Math.random() * 80 | 0))

  const focusTimerRef   = useRef(0)
  const gameActiveRef   = useRef(true)
  const gameTimeRef     = useRef(ENCOUNTER_TIME_MS)

  // Drag state for focus knob
  const focusKnobRef    = useRef({ dragging: false, startY: 0, startFocus: 35 })

  // Lens ref for mouse tracking
  const lensRef = useRef(null)

  // ── React state (triggers re-renders) ─────────────────────────────────────
  const [focusPct, setFocusPct]         = useState(0)
  const [spatialFocus, setSpatialFocus] = useState(false)
  const [opticalGood, setOpticalGood]   = useState(false)
  const [timeLeft, setTimeLeft]         = useState(ENCOUNTER_TIME_MS / 1000)
  const [birdFled, setBirdFled]         = useState(false)
  const [captureFlash, setCaptureFlash] = useState(false)
  const [viewPos, setViewPos]           = useState({ x: 0, y: 0 })
  const [started, setStarted]           = useState(false)
  const [speedWarning, setSpeedWarning] = useState(false)
  const [opticalFocusDisplay, setOpticalFocusDisplay] = useState(35)
  const birdDistance = birdDistanceRef.current

  const habitatBg = getBirdBackground(bird?.id || bird?.captureStats?.captureBackground)

  // ── Device orientation (mobile) ──────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      orientRef.current = { beta: e.beta ?? 45, gamma: e.gamma ?? 0 }
      if (Math.abs(e.gamma ?? 0) > 1.5 || Math.abs((e.beta ?? 45) - 45) > 1.5) {
        hasTiltRef.current = true
      }
    }
    window.addEventListener('deviceorientation', handler)
    return () => window.removeEventListener('deviceorientation', handler)
  }, [])

  // ── Mouse control (desktop) ──────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (!gameActiveRef.current || !lensRef.current) return
      const rect = lensRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      viewOffsetRef.current = {
        x: clamp((e.clientX - cx) / (rect.width * 0.4), -1, 1),
        y: clamp((e.clientY - cy) / (rect.height * 0.4), -1, 1),
      }
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  // ── Touch drag (fallback) ─────────────────────────────────────────────────
  useEffect(() => {
    let startTouch = null
    const onStart = (e) => {
      // Ignore touches on the focus knob
      if (e.target.closest?.('[data-focus-knob]')) return
      startTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY, ox: viewOffsetRef.current.x, oy: viewOffsetRef.current.y }
    }
    const onMove = (e) => {
      if (!startTouch || !gameActiveRef.current) return
      const dx = (e.touches[0].clientX - startTouch.x) / 120
      const dy = (e.touches[0].clientY - startTouch.y) / 120
      viewOffsetRef.current = { x: clamp(startTouch.ox + dx, -1, 1), y: clamp(startTouch.oy + dy, -1, 1) }
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchmove', onMove)
    }
  }, [])

  // ── Focus knob drag ───────────────────────────────────────────────────────
  const handleFocusPointerDown = useCallback((e) => {
    e.stopPropagation()
    focusKnobRef.current = { dragging: true, startY: e.clientY, startFocus: opticalFocusRef.current }
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      if (!focusKnobRef.current.dragging) return
      const dy = focusKnobRef.current.startY - e.clientY   // up = closer = less distance
      const delta = dy * 0.8  // 0.8m per pixel
      const newFocus = clamp(focusKnobRef.current.startFocus + delta, 5, 150)
      opticalFocusRef.current = newFocus
      setOpticalFocusDisplay(Math.round(newFocus))
    }
    const onUp = () => { focusKnobRef.current.dragging = false }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  // ── Main game loop ────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    if (started) return
    setStarted(true)
    gameActiveRef.current = true

    const movementPattern = bird.captureStats.movementPattern || 'perching'
    behaviorRef.current = makeBehaviorEngine(movementPattern, { x: 0.3, y: 0.1 })

    const speedThreshold = 0.06 + (10 - bird.captureStats.flightiness) * 0.01
    let lastTime = performance.now()

    const loop = (now) => {
      if (!gameActiveRef.current) return

      const dt = Math.min(now - lastTime, 50)
      lastTime = now
      const frame = ++frameRef.current

      // ── Momentum-based tilt aiming (mobile) ─────────────────────────────
      if (hasTiltRef.current) {
        const { beta, gamma } = orientRef.current
        // Dead zones
        const tiltX = Math.abs(gamma) > 3 ? gamma : 0
        const tiltY = Math.abs(beta - 45) > 3 ? (beta - 45) : 0
        // Tilt angle → velocity contribution
        const sensitivity = 0.0018
        viewOffsetRef.current.x = clamp(viewOffsetRef.current.x + tiltX * sensitivity * dt / 16, -1, 1)
        viewOffsetRef.current.y = clamp(viewOffsetRef.current.y + tiltY * sensitivity * dt / 16, -1, 1)
      }

      // ── Speed warning (spook) ────────────────────────────────────────────
      const vx = Math.abs(viewOffsetRef.current.x - prevViewRef.current.x)
      const vy = Math.abs(viewOffsetRef.current.y - prevViewRef.current.y)
      const viewSpeed = Math.sqrt(vx * vx + vy * vy)
      prevViewRef.current = { ...viewOffsetRef.current }

      if (viewSpeed > speedThreshold) {
        setSpeedWarning(true)
        setTimeout(() => setSpeedWarning(false), 700)
      }

      // ── Update bird position via behavior engine ─────────────────────────
      birdPosRef.current = behaviorRef.current.update(dt, frame)

      // ── In-lens position (bird relative to view) ─────────────────────────
      const inViewX = birdPosRef.current.x - viewOffsetRef.current.x
      const inViewY = birdPosRef.current.y - viewOffsetRef.current.y
      const spatialDist = Math.sqrt(inViewX * inViewX + inViewY * inViewY)
      setViewPos({ x: clamp(inViewX, -1.3, 1.3), y: clamp(inViewY, -1.3, 1.3) })

      // ── Optical focus blur ───────────────────────────────────────────────
      const focusDiff = Math.abs(opticalFocusRef.current - birdDistanceRef.current)
      const optBlur = focusDiff * 0.12    // pixels of blur per meter off
      const isSpatiallyFocused = spatialDist < SPATIAL_FOCUS_R
      const isOpticallyFocused = optBlur < OPTICAL_BLUR_MAX
      setSpatialFocus(isSpatiallyFocused)
      setOpticalGood(isOpticallyFocused)

      const fullyFocused = isSpatiallyFocused && isOpticallyFocused
      if (fullyFocused) {
        focusTimerRef.current = Math.min(focusTimerRef.current + dt, CAPTURE_TIME_MS)
      } else {
        focusTimerRef.current = Math.max(focusTimerRef.current - dt * 0.4, 0)
      }
      setFocusPct(Math.round((focusTimerRef.current / CAPTURE_TIME_MS) * 100))

      // ── Capture! ─────────────────────────────────────────────────────────
      if (focusTimerRef.current >= CAPTURE_TIME_MS) {
        gameActiveRef.current = false
        setCaptureFlash(true)
        setTimeout(onSuccess, 600)
        return
      }

      // ── Countdown ────────────────────────────────────────────────────────
      gameTimeRef.current -= dt
      setTimeLeft(Math.ceil(gameTimeRef.current / 1000))
      if (gameTimeRef.current <= 0) {
        gameActiveRef.current = false
        setBirdFled(true)
        setTimeout(onMiss, 1800)
        return
      }

      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)
  }, [bird, started, onSuccess, onMiss])

  useEffect(() => {
    return () => {
      gameActiveRef.current = false
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  // ── Rendering helpers ─────────────────────────────────────────────────────
  const LENS_R = 110
  const birdX = viewPos.x * LENS_R * 0.7
  const birdY = viewPos.y * LENS_R * 0.7

  // Spatial blur (being out of center)
  const spatialDist = Math.sqrt(viewPos.x ** 2 + viewPos.y ** 2)
  const spatialBlur = spatialFocus ? 0 : Math.min(2, (spatialDist - SPATIAL_FOCUS_R) * 3)

  // Optical blur (focus knob off)
  const focusDiff = Math.abs(opticalFocusDisplay - birdDistance)
  const opticalBlur = Math.min(6, focusDiff * 0.12)
  const totalBlur = spatialBlur + (started ? opticalBlur : 0)

  const focusColor = (spatialFocus && opticalGood) ? '#3ddc7f' : spatialFocus ? '#f5a623' : '#ffffff40'

  // Distance to size: scale bird avatar size by distance vs typical
  const distanceScaleFactor = clamp((50 / birdDistance) * 0.8 + 0.2, 0.5, 1.4)
  const avatarSize = Math.round(80 * distanceScaleFactor)

  // Focus knob position (0=near, 1=far on the track)
  const focusKnobPos = clamp((opticalFocusDisplay - 5) / 145, 0, 1)  // 5–150m range

  const lensContent = (parallaxX = 0) => (
    <div style={{
      width: LENS_R * 2,
      height: LENS_R * 2,
      borderRadius: '50%',
      overflow: 'hidden',
      position: 'relative',
      border: '3px solid #2a3a2a',
    }}>
      {/* Habitat background */}
      <svg style={{ position: 'absolute', inset: 0 }} width={LENS_R * 2} height={LENS_R * 2}>
        <clipPath id={`lensClipBg${parallaxX}`}><circle cx={LENS_R} cy={LENS_R} r={LENS_R - 3}/></clipPath>
        <g clipPath={`url(#lensClipBg${parallaxX})`}>
          <HabitatBackground type={habitatBg} lensR={LENS_R}/>
        </g>
      </svg>

      {/* Grid lines */}
      <svg style={{ position: 'absolute', inset: 0 }} width={LENS_R * 2} height={LENS_R * 2}>
        <clipPath id={`lensClip${parallaxX}`}><circle cx={LENS_R} cy={LENS_R} r={LENS_R - 3}/></clipPath>
        <g clipPath={`url(#lensClip${parallaxX})`} opacity="0.14">
          <line x1={LENS_R} y1="0" x2={LENS_R} y2={LENS_R * 2} stroke="#00ff88" strokeWidth="0.8"/>
          <line x1="0" y1={LENS_R} x2={LENS_R * 2} y2={LENS_R} stroke="#00ff88" strokeWidth="0.8"/>
        </g>
        {/* Focus ring */}
        <circle
          cx={LENS_R + birdX + parallaxX}
          cy={LENS_R + birdY}
          r={spatialFocus ? 30 : 46}
          fill="none"
          stroke={focusColor}
          strokeWidth={spatialFocus ? 2.5 : 1.5}
          style={{ transition: 'r 0.15s, stroke 0.15s', animation: spatialFocus && opticalGood ? 'pulse 0.8s infinite' : 'none' }}
        />
        {/* Corner brackets when in spatial focus */}
        {spatialFocus && (
          <g stroke={focusColor} strokeWidth="2.5" fill="none">
            <path d={`M ${LENS_R + birdX + parallaxX - 26} ${LENS_R + birdY - 26} l 0 -12 l 12 0`}/>
            <path d={`M ${LENS_R + birdX + parallaxX + 26} ${LENS_R + birdY - 26} l 0 -12 l -12 0`}/>
            <path d={`M ${LENS_R + birdX + parallaxX - 26} ${LENS_R + birdY + 26} l 0 12 l 12 0`}/>
            <path d={`M ${LENS_R + birdX + parallaxX + 26} ${LENS_R + birdY + 26} l 0 12 l -12 0`}/>
          </g>
        )}
        {/* Distance label */}
        {started && (
          <text
            x={LENS_R + birdX + parallaxX + 34}
            y={LENS_R + birdY - 32}
            fontSize="10"
            fill={focusColor}
            fontFamily="monospace"
            opacity="0.85"
          >{birdDistance}m</text>
        )}
      </svg>

      {/* Bird avatar */}
      <div style={{
        position: 'absolute',
        left: LENS_R + birdX + parallaxX - avatarSize / 2,
        top:  LENS_R + birdY - avatarSize / 2 - 5,
        filter: `blur(${totalBlur.toFixed(1)}px)`,
        transition: 'filter 0.1s',
      }}>
        <BirdAvatar birdId={bird.id} size={avatarSize} animated={started}/>
      </div>

      {/* Lens edge vignette */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle, transparent 52%, rgba(0,0,0,0.75) 100%)',
        pointerEvents: 'none',
      }}/>
    </div>
  )

  // ── Focus knob (vertical dial on right side) ──────────────────────────────
  const KNOB_H = 120  // track height in px
  const KNOB_W = 32
  const knobY = focusKnobPos * (KNOB_H - 20)  // knob position on track

  const focusKnobEl = started && (
    <div
      data-focus-knob="true"
      style={{
        position: 'absolute',
        right: -KNOB_W - 10,
        top: '50%',
        transform: 'translateY(-50%)',
        width: KNOB_W,
        height: KNOB_H,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
      }}
    >
      {/* Track */}
      <div style={{
        width: 6,
        height: KNOB_H,
        background: 'rgba(255,255,255,0.12)',
        borderRadius: 3,
        position: 'relative',
        cursor: 'pointer',
      }}>
        {/* Fill from knob to bottom (far = bottom) */}
        <div style={{
          position: 'absolute', left: 0, right: 0,
          top: knobY + 10, bottom: 0,
          background: opticalGood ? 'rgba(61,220,127,0.4)' : 'rgba(255,165,0,0.3)',
          borderRadius: 3,
        }}/>
        {/* Knob pill */}
        <div
          onPointerDown={handleFocusPointerDown}
          style={{
            position: 'absolute',
            left: '50%',
            top: knobY,
            transform: 'translateX(-50%)',
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: opticalGood ? '#3ddc7f' : '#f5a623',
            border: '2px solid rgba(255,255,255,0.3)',
            cursor: 'grab',
            boxShadow: opticalGood ? '0 0 8px rgba(61,220,127,0.6)' : '0 0 6px rgba(245,166,35,0.4)',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
        />
      </div>
      {/* Labels */}
      <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)', marginTop: 3, fontFamily: 'monospace' }}>FAR</div>
      <div style={{ fontSize: 9, color: opticalGood ? '#3ddc7f' : '#f5a623', fontFamily: 'monospace', fontWeight: 700 }}>
        {opticalFocusDisplay}m
      </div>
      <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>NEAR</div>
    </div>
  )

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="screen" style={{
      background: '#050a06',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 0 24px',
      userSelect: 'none',
    }}>

      {/* Capture flash */}
      {captureFlash && (
        <div style={{ position: 'absolute', inset: 0, background: 'white', zIndex: 100,
          animation: 'captureFlash 0.6s ease forwards', pointerEvents: 'none' }}/>
      )}

      {/* Bird fled overlay */}
      {birdFled && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 50,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ fontSize: 52 }}>🐦</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)' }}>It flew away…</div>
          <div style={{ fontSize: 14, color: 'var(--text-dim)' }}>Move slowly and focus carefully.</div>
        </div>
      )}

      {/* ── Top HUD ──────────────────────────────────────────────────────── */}
      <div style={{ width: '100%', padding: '0 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: 1 }}>CAPTURING</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--text-primary)' }}>
            {bird.commonName}
          </div>
          {started && (
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>
              ~{birdDistance}m away
            </div>
          )}
        </div>
        {/* Countdown */}
        <div style={{
          background: timeLeft <= 10 ? 'rgba(255,85,85,0.15)' : 'rgba(255,255,255,0.06)',
          border: `1px solid ${timeLeft <= 10 ? '#ff5555' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 20, padding: '5px 14px', fontSize: 16, fontWeight: 700,
          fontFamily: 'var(--font-mono)',
          color: timeLeft <= 10 ? '#ff5555' : 'var(--text-primary)',
          transition: 'all 0.3s',
        }}>
          {timeLeft}s
        </div>
      </div>

      {/* Speed warning */}
      {speedWarning && (
        <div style={{
          position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(255,165,0,0.15)', border: '1px solid rgba(255,165,0,0.4)',
          borderRadius: 20, padding: '5px 14px', fontSize: 12, color: 'orange',
          fontWeight: 600, zIndex: 20, animation: 'fadeIn 0.2s ease', whiteSpace: 'nowrap',
        }}>
          ⚠ Slow down — you'll spook it!
        </div>
      )}

      {/* ── Binoculars view ───────────────────────────────────────────── */}
      {!started ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <div style={{ fontSize: 64, animation: 'birdFloat 2s ease-in-out infinite' }}>🔭</div>
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: 15 }}>
            Raise your phone and look<br/>through the binoculars
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-dim)', textAlign: 'center', maxWidth: 290, lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--text-secondary)' }}>Mobile:</strong> tilt to pan the view.<br/>
            <strong style={{ color: 'var(--text-secondary)' }}>Focus dial:</strong> drag the orange knob to match the bird's distance.<br/>
            Move slowly — sudden movements spook it!
          </div>
          <button className="btn btn-primary btn-lg" onClick={startGame} style={{ marginTop: 8, width: 220 }}>
            🔭 Start Tracking
          </button>
        </div>
      ) : (
        <div ref={lensRef} style={{ flex: 1, display: 'flex', alignItems: 'center',
          justifyContent: 'center', width: '100%' }}>
          {/* Binoculars body */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {/* Left lens */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              {lensContent(-3)}
            </div>
            {/* Bridge */}
            <div style={{ width: 24, height: 40, background: '#1a2a1c', zIndex: 1,
              border: '2px solid #2a3a2a', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.5)' }}/>
            {/* Right lens */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              {lensContent(3)}
            </div>
            {/* Focus knob — positioned right of right lens */}
            {focusKnobEl}
          </div>
        </div>
      )}

      {/* ── Focus status bar ──────────────────────────────────────────── */}
      {started && (
        <div style={{ width: '100%', padding: '8px 20px 0' }}>
          {/* Two status rows */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 11 }}>
            <span style={{ color: spatialFocus ? 'var(--accent-green)' : 'var(--text-dim)' }}>
              {spatialFocus ? '● Centered' : '○ Track bird'}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
            <span style={{ color: opticalGood ? 'var(--accent-green)' : '#f5a623' }}>
              {opticalGood ? '● Focus sharp' : `◐ Adjust focus dial (${opticalFocusDisplay}m → ${birdDistance}m)`}
            </span>
            <span style={{ marginLeft: 'auto', color: 'var(--text-dim)' }}>{focusPct}%</span>
          </div>
          {/* Progress bar */}
          <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${focusPct}%`,
              background: (spatialFocus && opticalGood)
                ? 'linear-gradient(90deg, #2abc65, #3ddc7f)'
                : spatialFocus
                  ? 'linear-gradient(90deg, #c87010, #f5a623)'
                  : 'linear-gradient(90deg, #2a4a2e, #3a5a3e)',
              borderRadius: 3,
              transition: 'width 0.15s, background 0.2s',
              boxShadow: (spatialFocus && opticalGood) ? '0 0 8px rgba(61,220,127,0.5)' : 'none',
            }}/>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-dim)', textAlign: 'center' }}>
            {!spatialFocus && `Track the ${bird.commonName} into the crosshairs`}
            {spatialFocus && !opticalGood && 'Adjust the focus dial →'}
            {spatialFocus && opticalGood && 'Hold steady…'}
          </div>
        </div>
      )}
    </div>
  )
}
