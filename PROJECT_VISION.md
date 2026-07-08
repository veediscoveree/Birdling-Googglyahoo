# Bird. Here. Now. — Project Vision, State of Play & Roadmap

**Author:** Jared Harary (vision) + Claude Fable 5 (assessment & technical planning)
**Date:** 2026-07-08
**Branch of record:** `claude/bird-game-prototype-Mx0aV`
**Status:** Planning document — no builds authorized from this file yet. Each phase below
should be its own explicit build request.

---

## 1. What this document is

This file protects the project's knowledge, aims, and decisions so that no future
Claude Code session (or human collaborator) starts from zero. It captures:

1. Where the codebase actually stands today (verified against the source, not memory).
2. The full vision as articulated by Jared in July 2026.
3. Fable's honest assessment and recommendations — including what was weak in past builds.
4. A phased, actionable roadmap with the decisions still needed.

**How to use it:** at the start of any new session, say "Read PROJECT_VISION.md first."
When a phase ships, update its status here in the same commit.

---

## 2. Where the project stands today (verified 2026-07-08)

### 2.1 The game in one paragraph

*Bird. Here. Now.* is a browser-based birding game (React 18 + Vite, single-file build)
where players see a radar of birds "present" around them, enter a binoculars mini-game to
locate and capture each bird against a habitat backdrop, and build an Aviary/life list.
It deploys as a single HTML file via GitHub Pages (`docs/index.html`), with a duplicate
build in `dist/`. There is also a legacy standalone prototype at
`bird-here-now-prototype.html` in the repo root.

### 2.2 Repo map

| Path | Lines | What it is |
|---|---|---|
| `src/App.jsx` | 337 | Top-level state machine (radar → encounter → capture → aviary) |
| `src/data/birds.js` | 3,935 | **73 species**, rich schema: field marks, plumage text, sounds, seasonality, habitat, rarity, capture params (`speed`, `movementPattern`) |
| `src/components/BinocularsCapture.jsx` | 1,656 | The capture mini-game: ~14 procedural habitat backgrounds (wetland, forest canopy/floor/trunk, open water, open sky, urban edge, etc.) and ~15 movement behaviors (`flit`, `skulking`, `soaring`, `swimming`, `aerial_dart`, `hovering`, …) |
| `src/components/BirdAvatars.jsx` | 3,852 | Hand-built SVG avatars for all species |
| `src/components/RadarScreen.jsx` | 411 | Radar / nearby-birds screen |
| `src/components/VerificationModal.jsx` | 438 | UI for the sighting-verification flow |
| `src/components/EasterEggs/` | ~890 | 4 Easter Egg encounters: Audubon, Avi Gitler, Birding Bob, Mighty Birders — each with a discovery screen + mini-game |
| `src/lib/verification.js` | 193 | **Evidence-based verification engine** (see 2.3) |
| `src/lib/leaderboard.js` | 92 | Leaderboard with Supabase backend + local-mock fallback |
| `src/hooks/useEBirdLocation.js` | 136 | **Live eBird API v2 integration** — expanding radius/time search ladder until ≥20 local species matched |
| `src/hooks/useXenoCantoAudio.js` | 160 | Real bird recordings from xeno-canto |
| `src/hooks/useWikimediaPhotos.js` | 117 | Real bird photos from Wikimedia |

### 2.3 Critical realization: the "advanced direction" is already scaffolded

The real-world features Jared described as the crucial future goal are **partially built
already** — they exist as working code paths that activate when API keys are supplied:

- **eBird integration** (`useEBirdLocation.js`): fetches real recent observations near the
  player's GPS position, maps eBird species codes to the game's database, expands the
  search radius (2 km/1 day → 80 km/30 days) until enough species are found. Needs only a
  free `VITE_EBIRD_API_KEY`.
- **Verification engine** (`verification.js`): already models exactly the "shreds of
  evidence adding up past a reliability threshold" idea. Five evidence types —
  `ebird_match` (auto), `location` GPS-within-1km (auto), `sound` recording, `photo`, and
  `together` ("Birded it Together", worth 2 credits) — with rarity-tiered requirements
  (common: 0, uncommon: 1, rare: 2, very rare: 3). Includes a Supabase `together_claims`
  schema with a 2-hour join window.
- **Social/leaderboard** (`leaderboard.js`): Supabase-backed global leaderboard, mock mode
  without keys.

**What this means:** the next advanced step is not greenfield architecture — it is
(a) activating and hardening what exists (keys, Supabase project, real device testing),
and (b) deepening the two evidence types that are currently thin: sound (no actual
species recognition yet, just "a recording was made") and photo (no actual image
assessment yet).

### 2.4 Known weaknesses (honest inventory)

- **Easter Eggs**: shipped, but as Jared says, "barely viable for their artwork or
  gameplay." The four mini-games are shallow tap-fests; the art is placeholder-tier
  relative to the bird avatars. Also very NYC/Harlem-specific, which limits universality.
- **Capture realism**: movement patterns exist per species but feasibility isn't
  calibrated to reality — some easy birds are annoying, some hard birds are trivially
  easy, and some behaviors don't match the species (the "mallard darting on a pond"
  problem class).
- **Backgrounds**: procedural and serviceable, not beautiful. All are code-drawn scenes
  in `BinocularsCapture.jsx`.
- **Developer friction**: there is no way to see a specific bird, rarity, or Easter Egg
  on demand — testing changes means replaying random encounters. This slows every
  iteration loop and has directly caused "builds and fixes that were not executed" to go
  unnoticed.
- **Requested-but-unverified work**: past sessions committed builds without a review
  mode, so regressions and non-executions slipped through.

---

## 3. The vision (Jared, July 2026)

Captured from the originating conversation, in two horizons:

### 3.1 Near-term: make the game genuinely good

1. **Backgrounds** — more real and beautiful habitat scenes in the capture mini-game.
2. **Bird accuracy + charm** — avatars more accurate on field marks *and* cuter in their
   cartoonized style. These goals are compatible: correct field marks, appealing shapes.
3. **Capture feasibility bands** — difficulty should track reality. Harder where the real
   bird is hard (kinglets, skulkers, aerial insectivores), easier where it's easy
   (mallards, robins), and always within a band of plausible behavior for that species.
   Open to changing the very objective of the mini-game if a better design emerges.
4. **Easter Eggs 2.0** — rethink from scratch: more universal (not only NYC figures),
   better art, better gameplay, real educational payoff.
5. **Developer/unlock modes** — codes or a dev mode that (a) lets the developer directly
   summon any bird, rarity tier, or Easter Egg to review changes without grinding, and
   (b) could double as player-facing unlock codes/modes where rarities or Eggs appear in
   close proximity.

### 3.2 Long-term: the real goal — a holistic, verified, social birding app

1. **eBird connectivity** — find real reports of birds sighted nearby (✅ scaffolded);
   eventually *submit* sightings to eBird with full explanations.
2. **"Find the bird IRL"** — public mapping integration to navigate to a sighting.
3. **A constellation of verification signals**, each imperfect alone but strong together:
   - proximity to other birders who confirmed the same sighting (e.g., on eBird);
   - two-way "birded it together" confirmation between users;
   - a Merlin-linked or Merlin-like listening function: "hears" the bird and reports
     species with an above-threshold probability;
   - in-app photo capture cross-referenced with time + location, assessed above X%
     certainty to be the claimed species;
   - other creative signals as formulated.
4. **A verification "hash"** — the shreds of data and metadata combine into a unique,
   reliability-scored record over a threshold: a portable proof-of-sighting.
5. **Human connection** — people who birded near each other can meet/connect, **only with
   bidirectional agreement to share**. Privacy-first by design.
6. **eBird export** — verified records loadable directly to eBird with full documentation.

### 3.3 Meta-goal: how Jared works

Jared builds entirely by prompting (no independent coding). Requirements:
- Protect context across sessions (this file is step one).
- Break work into prompts of the right size.
- Identify external components/services worth adopting (with access granted to Claude).
- Know where compromises are needed and make them deliberately.

---

## 4. Fable's assessment & recommendations

### 4.1 On the mini-game (backgrounds, birds, capture)

**Backgrounds.** Two viable paths, in order of recommendation:
1. **Layered parallax SVG scenes** (evolve current approach): richer gradients, depth
   layers (far ridge / mid trees / near reeds), time-of-day palettes, subtle animation
   (drifting clouds, water shimmer). Keeps the single-file build, zero external assets,
   fully controllable by prompt. This is the pragmatic winner.
2. Real photographic/painted backdrops (Wikimedia habitat photos or licensed art). More
   beautiful ceiling, but breaks single-file simplicity, adds licensing review, and makes
   birds harder to composite legibly. Revisit only if path 1 plateaus.

**Bird avatars.** Establish a written *avatar style guide* (proportions, line weight,
eye style, field-mark checklist per species from `birds.js` `distinctiveMarkings`) and
then re-pass species in batches of 5, comparing each against its own data entry. The
data to verify against already exists in the schema — use it as the acceptance test.

**Capture feasibility bands.** Replace ad-hoc speed values with a derived difficulty
model: `difficulty = f(size, movementPattern, feedingLayer, wariness, rarity)` with a
per-species override. Then define hard bands: every species must be capturable by a
median player within N attempts, and no "easy" species may require more than M seconds.
Behavior must be plausible: swimming birds glide and drift, they never dart; kinglets
never sit still; soaring hawks circle predictably but at distance. The schema already
carries `behaviorNotes` prose for nearly every species — that text is the spec.

**Changing the objective (invited by Jared).** Recommended evolution rather than
replacement: keep "find and hold the bird in view," but score on **observation quality**
instead of a binary catch — hold time, steadiness, and optionally identifying a field
mark (tap the eyebrow stripe / wing bar from 3 choices) for bonus credit. This deepens
the birding-skill fantasy, naturally makes hard birds hard (they give you shorter
windows), and directly teaches the field marks the long-term app will ask users to
verify in real life. The mini-game becomes training for the IRL product.

### 4.2 On Easter Eggs 2.0

- **Universalize the roster**: keep Audubon (globally known), and add universal figures/
  moments — e.g., the Passenger Pigeon's last flock, the Snowy Owl irruption, Rosalie
  Edge, the ivory-billed woodpecker searches, Christmas Bird Count origin story. Local
  heroes (Gitler, Birding Bob) can remain as *region-locked* eggs that trigger only near
  their real locations — which turns the NYC-specificity from a bug into a delight.
- **Gameplay**: each egg should reuse a polished core mechanic with a twist, not four
  bespoke shallow games. One well-built mechanic (e.g., the observation-quality capture
  above, reskinned: "sketch the bird before it flies" for Audubon) beats four weak ones.
- **Art**: apply the same avatar style guide; the eggs should look like premium cards.

### 4.3 On dev mode & unlock codes

Build one system with two faces:
- **Dev mode** (`?dev=1` URL param or 7-tap on the version badge): a panel to summon any
  species, force any rarity, trigger any Easter Egg, skip to any screen, and set fake
  GPS. This is the single highest-leverage build for iteration speed — it should be
  **Phase 1**, before any art/gameplay rework, because it makes every later phase
  reviewable in minutes instead of hours.
- **Player codes**: the same machinery exposed as redeemable codes ("MURMURATION" →
  rare-bird weekend, "INCAS" → Easter Egg festival mode). Ship later; trivial once dev
  mode exists.

### 4.4 On the verification constellation (the real goal)

**Sound ID ("Merlin-like").** Merlin has no public API. The right tool is **BirdNET**
(Cornell's open-source acoustic classifier, same lab as Merlin):
- Easiest: BirdNET public analysis API (server-side) — send the 5-second clip the app
  already records, get species + confidence back.
- Better long-term: run BirdNET-Analyzer on our own small server (a Supabase Edge
  Function won't run it; a cheap Fly.io/Render container will), so we control uptime and
  rate limits. On-device TFLite is possible later inside a native wrapper.
- The existing `sound` evidence type upgrades from "a recording exists" (1 credit) to
  "BirdNET ≥ P% confidence for the claimed species" (2–3 credits, scaled by confidence).

**Photo ID.** Merlin Photo ID also has no API. Practical option: **iNaturalist's
computer-vision API** (public, well-documented, excellent on birds) — submit the photo,
get ranked species suggestions. Cross-reference EXIF/capture timestamp + GPS as the app
already plans. Same credit-scaling as sound.

**The verification hash.** Formalize what `verification.js` already gestures at: a
canonical record `{species, time, geohash, evidence[] with confidences, device
attestation}` → content-hash (SHA-256) → a signed, portable proof. Store the hash chain
in Supabase; optionally publish hashes (not data) for public verifiability. This is
achievable with ordinary web crypto — no blockchain required, and none recommended.

**Together-birding & meeting people.** The `together_claims` table exists. The human-
connection layer on top must be strictly opt-in both ways: each party independently
flags "open to connect" on a shared claim; only a double-match reveals anything (handle
first, contact only after a second confirmation). Never expose precise location of
another user; use the shared *sighting* location only. This needs a short privacy design
doc before build (Phase 5).

**eBird submission.** eBird's API is read-only for third parties; direct programmatic
checklist submission is not publicly offered. Compromise: generate a pre-filled eBird
checklist record (species, count, location, time, and auto-composed details text from
the evidence) that the user pastes/enters, or export in eBird Record Format (CSV) for
bulk import. Revisit if Cornell opens a submission API; consider reaching out to the
Cornell Lab once the verification engine is demonstrably good — they are the natural
partner for exactly this evidence-quality work.

### 4.5 On how to work (process for a prompting-only builder)

1. **This file is the memory.** Also add a lean `CLAUDE.md` (done alongside this file)
   so every Claude Code session auto-loads the essentials.
2. **One phase per session/PR.** Small scoped asks ("Phase 1: dev mode, per
   PROJECT_VISION.md §5") beat sprawling prompts. Sprawl is what caused past
   non-executions.
3. **Demand verification, not claims.** End every build prompt with: "run the build,
   open the app, exercise the change, and show me evidence." The dev mode makes this
   cheap.
4. **Use GitHub Issues as the backlog.** Each roadmap item below can become an issue;
   sessions then reference issue numbers.
5. **External services to set up (all free tiers, Jared-owned accounts):**
   - eBird API key (ebird.org/api/keygen) → `VITE_EBIRD_API_KEY`
   - Supabase project → `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (leaderboard,
     together-claims, verification records)
   - Later: a small container host (Fly.io or Render) for BirdNET.
6. **Compromises to accept now:** no direct eBird write API; no Merlin API (use
   BirdNET/iNaturalist); browser-only limits background audio listening (a future native
   wrapper — Capacitor — lifts this); single-file build may eventually yield to a normal
   hosted app as assets grow.

---

## 5. Roadmap (each phase = one build request)

| Phase | Scope | Why this order | Status |
|---|---|---|---|
| **0** | This document + `CLAUDE.md`; optional: convert roadmap to GitHub issues | Protect knowledge | ✅ this commit |
| **1** | **Dev mode**: summon any bird/rarity/egg, fake GPS, screen jump, player code redemption stub | Makes every later phase testable in minutes | ☐ |
| **2** | **Capture overhaul**: derived difficulty model + feasibility bands; behavior plausibility pass (all 73 species vs. their `behaviorNotes`); observation-quality scoring prototype behind a dev-mode flag | Core gameplay first | ☐ |
| **3** | **Backgrounds pass**: layered parallax scenes, time-of-day palettes, per-habitat polish | Visual payoff on solid gameplay | ☐ |
| **4** | **Avatar accuracy+charm pass**: style guide, then species in batches of 5 audited against `distinctiveMarkings` | Uses dev mode for instant review | ☐ |
| **5** | **Easter Eggs 2.0**: universal roster + region-locked locals, shared polished mechanic, premium-card art | Rebuild once the style/mechanic foundations exist | ☐ |
| **6** | **Verification v1 live**: eBird key + Supabase configured on the deployed app; sound evidence → BirdNET API; photo evidence → iNaturalist CV API; confidence-scaled credits | Activates existing scaffolding | ☐ |
| **7** | **Verification hash + eBird export**: canonical record, SHA-256 proof, eBird Record Format CSV export with auto-composed details | The portable proof | ☐ |
| **8** | **Social layer**: privacy design doc, then double-opt-in connect on together-claims | Highest sensitivity, so last | ☐ |

Parallel-safe: Phases 3 and 4 can run alongside 6.

---

## 6. Decisions needed from Jared

1. **Mini-game objective**: adopt the observation-quality scoring direction (§4.1), keep
   pure catch, or prototype both behind dev-mode flags? *(Fable recommends prototyping
   observation-quality in Phase 2.)*
2. **Easter Egg roster**: approve universal+region-locked model? Which figures?
3. **Accounts**: create eBird key + Supabase project when Phase 6 nears (Fable can walk
   through both, ~15 minutes total).
4. **Naming**: the repo is `Birdling-Googglyahoo`; the app is *Bird. Here. Now.* Worth
   aligning before anything public.
5. **Native wrapper** (later): appetite for a Capacitor iOS/Android build once
   verification matters? Affects mic/camera/GPS quality significantly.

---

## Appendix A — Running & building

```bash
npm install        # once
npm run dev        # local dev server (Vite)
npm run build      # single-file build → dist/index.html
# docs/index.html is the GitHub Pages artifact (auto-rebuilt by workflow)
```

Environment variables (create `.env.local`, never commit):

```
VITE_EBIRD_API_KEY=...
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

All three are optional; the app falls back to mock/offline modes without them.

## Appendix B — Glossary

- **Evidence credits**: points toward confirming a sighting; rarity tier sets the bar.
- **Together claim**: a user's assertion that others birded a sighting with them;
  joinable for 2 hours; worth 2 credits.
- **Search ladder**: eBird query expansion — 2 km/1 day → 8 km/3 days → 25 km/14 days →
  80 km/30 days — until ≥20 known species are found nearby.
- **BirdNET**: Cornell Lab's open-source bird-sound classifier (the "Merlin-like" engine).
- **eBird Record Format**: CSV format eBird accepts for bulk checklist import.
