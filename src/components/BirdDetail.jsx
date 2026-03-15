// Bird. Here. Now. — Bird Detail / Field Guide Screen
// Shows the full unlocked data card for a captured species.
// This is the "Marvel card" equivalent — all the rich species data
// in a scannable, beautiful layout.

import { useState } from 'react'
import { BirdAvatar } from './BirdAvatars'
import { getRarityLabel, getSizeLabel } from '../data/birds'

const StatBar = ({ label, value, max = 10, color = '#3ddc7f' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
    <div style={{ width: 100, fontSize: 12, color: 'var(--text-dim)', flexShrink: 0 }}>{label}</div>
    <div style={{ flex: 1, height: 5, background: 'var(--bg-elevated)', borderRadius: 3, overflow: 'hidden' }}>
      <div style={{
        height: '100%',
        width: `${(value / max) * 100}%`,
        background: color,
        borderRadius: 3,
        transition: 'width 0.8s ease',
      }}/>
    </div>
    <div style={{ width: 20, textAlign: 'right', fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>
      {value}
    </div>
  </div>
)

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{
      fontSize: 10, color: 'var(--text-dim)',
      letterSpacing: 1.2, textTransform: 'uppercase',
      marginBottom: 10,
      paddingBottom: 6,
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      {title}
    </div>
    {children}
  </div>
)

const Row = ({ label, value }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between',
    padding: '7px 0',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    gap: 12,
  }}>
    <span style={{ fontSize: 12, color: 'var(--text-dim)', flexShrink: 0 }}>{label}</span>
    <span style={{ fontSize: 12, color: 'var(--text-secondary)', textAlign: 'right' }}>{value}</span>
  </div>
)

export default function BirdDetail({ bird, captured, onBack }) {
  const [tab, setTab] = useState('appearance')
  const tabs = ['appearance', 'behavior', 'sounds', 'capture']

  const tabLabel = { appearance: 'Appearance', behavior: 'Behavior', sounds: 'Sounds', capture: 'Capture Stats' }

  return (
    <div className="screen animate-fadeIn" style={{ background: 'var(--bg-deep)' }}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="screen-header">
        <button className="back-btn" onClick={onBack}>← Aviary</button>
        <div/>
        <span className={`rarity-badge rarity-${bird.rarity}`}>
          {getRarityLabel(bird.rarity)}
        </span>
      </div>

      <div className="scroll-y" style={{ flex: 1 }}>

        {/* ── Hero section ──────────────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '16px 20px',
          background: `linear-gradient(135deg, ${bird.appearance.uiColor}18, transparent)`,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            background: `${bird.appearance.uiColor}15`,
            borderRadius: 20,
            padding: 8,
            border: `1px solid ${bird.appearance.uiColor}30`,
          }}>
            <BirdAvatar birdId={bird.id} size={100} animated={captured}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
            }}>
              {bird.commonName}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', fontStyle: 'italic', marginTop: 2 }}>
              {bird.scientificName}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>
              Family {bird.family}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              <span className="points-badge">{bird.points} pts</span>
              <span style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20, padding: '3px 9px',
                fontSize: 10, fontWeight: 600, color: 'var(--text-dim)',
              }}>
                {getSizeLabel(bird.sizeCategory)}
              </span>
            </div>
          </div>
        </div>

        {/* Capture status */}
        {!captured && (
          <div style={{
            margin: '12px 16px',
            padding: '10px 14px',
            background: 'rgba(255,165,0,0.08)',
            border: '1px solid rgba(255,165,0,0.2)',
            borderRadius: 12,
            fontSize: 13,
            color: '#f5a623',
          }}>
            🔒 Capture this bird to unlock full field notes
          </div>
        )}

        <div style={{ padding: '0 16px 24px' }}>

          {/* ── Tab navigation ────────────────────────────────────────── */}
          <div style={{
            display: 'flex', gap: 6, margin: '12px 0',
            overflowX: 'auto', paddingBottom: 4,
          }} className="scroll-y">
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: tab === t ? bird.appearance.uiColor + '22' : 'transparent',
                  border: `1px solid ${tab === t ? bird.appearance.uiColor : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 20,
                  padding: '7px 14px',
                  fontSize: 12,
                  fontWeight: tab === t ? 700 : 400,
                  color: tab === t ? bird.appearance.uiColor : 'var(--text-dim)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {tabLabel[t]}
              </button>
            ))}
          </div>

          {/* ── Appearance tab ────────────────────────────────────────── */}
          {tab === 'appearance' && (
            <div className="animate-fadeIn">
              <Section title="Male Plumage">
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {captured ? bird.appearance.plumageDescription.male : '??? Capture this bird to unlock plumage description.'}
                </div>
              </Section>
              {captured && (
                <>
                  <Section title="Female Plumage">
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                      {bird.appearance.plumageDescription.female}
                    </div>
                  </Section>
                  <Section title="Juvenile">
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                      {bird.appearance.plumageDescription.juvenile}
                    </div>
                  </Section>
                  <Section title="Field Marks">
                    {bird.appearance.distinctiveMarkings.male.map((mark, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 8,
                        padding: '5px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                      }}>
                        <span style={{ color: bird.appearance.uiColor, fontSize: 10, marginTop: 2 }}>●</span>
                        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{mark}</span>
                      </div>
                    ))}
                  </Section>
                  <Section title="Physical Measurements">
                    <Row label="Length" value={`${bird.length_cm[0]}–${bird.length_cm[1]} cm`}/>
                    <Row label="Wingspan" value={`${bird.wingspan_cm[0]}–${bird.wingspan_cm[1]} cm`}/>
                    <Row label="Weight" value={`${bird.weight_g[0]}–${bird.weight_g[1]} g`}/>
                    <Row label="Size Class" value={getSizeLabel(bird.sizeCategory)}/>
                    <Row label="Bill Shape" value={bird.appearance.billShape.charAt(0).toUpperCase() + bird.appearance.billShape.slice(1)}/>
                    <Row label="Crest" value={bird.appearance.crestPresent ? `Yes (${bird.appearance.crestColor.male})` : 'None'}/>
                  </Section>
                </>
              )}
            </div>
          )}

          {/* ── Behavior tab ──────────────────────────────────────────── */}
          {tab === 'behavior' && (
            <div className="animate-fadeIn">
              {captured ? (
                <>
                  <Section title="Description">
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                      {bird.description}
                    </div>
                  </Section>
                  <Section title="Ecology">
                    <Row label="Primary Habitat" value={bird.primaryHabitat.join(', ').replace(/_/g, ' ')}/>
                    <Row label="Feeding Layer" value={bird.feedingLayer.charAt(0).toUpperCase() + bird.feedingLayer.slice(1)}/>
                    <Row label="Flight Style" value={bird.flightStyle.charAt(0).toUpperCase() + bird.flightStyle.slice(1)}/>
                    <Row label="Active Hours" value={(bird.activeHours || 'diurnal').replace(/_/g, ' ')}/>
                    <Row label="Breeding" value={bird.socialBehavior.breeding.replace(/_/g, ' ')}/>
                    <Row label="Winter" value={bird.socialBehavior.winter.replace(/_/g, ' ')}/>
                    <Row label="Group Size" value={`${bird.typicalGroupSize.min}–${bird.typicalGroupSize.max}`}/>
                  </Section>
                  <Section title="Seasonality">
                    {['spring','summer','fall','winter'].map(s => (
                      <Row key={s}
                        label={s.charAt(0).toUpperCase() + s.slice(1)}
                        value={`${bird.seasons[s].presence} · ${bird.seasons[s].commonness}`}
                      />
                    ))}
                  </Section>
                </>
              ) : (
                <div style={{ padding: '20px 0', color: 'var(--text-dim)', fontSize: 13 }}>
                  🔒 Capture this species to unlock behavioral data.
                </div>
              )}
            </div>
          )}

          {/* ── Sounds tab ────────────────────────────────────────────── */}
          {tab === 'sounds' && (
            <div className="animate-fadeIn">
              {captured ? (
                <>
                  <Section title="Call">
                    <div style={{
                      background: 'var(--bg-card)',
                      borderRadius: 12, padding: '12px 14px',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {bird.sound.callDescription}
                      </div>
                    </div>
                  </Section>
                  <Section title="Song">
                    <div style={{
                      background: 'var(--bg-card)',
                      borderRadius: 12, padding: '12px 14px',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {bird.sound.songDescription}
                      </div>
                    </div>
                  </Section>
                  <Section title="Sound Statistics">
                    <div style={{ marginTop: 4 }}>
                      <StatBar label="Loudness" value={bird.sound.loudness} color="#f5a623"/>
                      <StatBar label="Call Frequency" value={bird.sound.callFrequency} color="#5bc4e8"/>
                    </div>
                  </Section>
                  <Section title="Singing By Season">
                    {['spring','summer','fall','winter'].map(s => (
                      <Row key={s}
                        label={s.charAt(0).toUpperCase() + s.slice(1)}
                        value={bird.sound.singingSeason[s] || '—'}
                      />
                    ))}
                  </Section>
                </>
              ) : (
                <div style={{ padding: '20px 0', color: 'var(--text-dim)', fontSize: 13 }}>
                  🔒 Capture to unlock sound recordings & descriptions.
                </div>
              )}
            </div>
          )}

          {/* ── Capture Stats tab ─────────────────────────────────────── */}
          {tab === 'capture' && (
            <div className="animate-fadeIn">
              <Section title="Capture Card">
                <div style={{ marginTop: 4 }}>
                  <StatBar label="Difficulty"    value={bird.captureStats.difficulty}  color={bird.captureStats.difficulty > 6 ? '#ff8a65' : '#3ddc7f'}/>
                  <StatBar label="Speed"         value={bird.captureStats.speed}        color="#5bc4e8"/>
                  <StatBar label="Flightiness"   value={bird.captureStats.flightiness}  color="#f5a623"/>
                  <StatBar label="Camouflage"    value={bird.captureStats.camouflage}   color="#9c6b3c"/>
                  <StatBar label="Size Score"    value={bird.captureStats.sizeScore}    color="#ce93d8"/>
                </div>
              </Section>
              <Section title="Capture Notes">
                <div style={{
                  background: 'var(--bg-card)', borderRadius: 12,
                  padding: '12px 14px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6,
                }}>
                  {bird.captureStats.behaviorNotes}
                </div>
              </Section>
              <Section title="Verification">
                <Row label="Rarity Tier" value={getRarityLabel(bird.rarity)}/>
                <Row label="Certainty Required" value={`${Math.round(bird.verificationThreshold * 100)}%`}/>
                <Row label="Methods Required" value={`${bird.verificationMethods}`}/>
                <Row label="Points Value" value={`${bird.points}`}/>
              </Section>
            </div>
          )}

          {/* Fun fact footer */}
          {captured && (
            <div style={{
              marginTop: 8,
              padding: '12px 14px',
              background: `${bird.appearance.uiColor}10`,
              border: `1px solid ${bird.appearance.uiColor}25`,
              borderRadius: 12,
            }}>
              <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 5 }}>
                DID YOU KNOW
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {bird.funFact}
              </div>
            </div>
          )}

          <div style={{ height: 20 }}/>
        </div>
      </div>
    </div>
  )
}
