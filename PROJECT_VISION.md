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
| **1** | **Dev mode**: summon any bird/rarity/egg, screen jump | Makes every later phase testable in minutes | ✅ shipped 2026-09-09 (fake-GPS + player-codes deferred) |
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
6. **Deploy source** (see Appendix C): confirm which branch GitHub Pages serves, and
   decide whether `main` or the feature branch is the single source of truth going forward.

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

## Changelog

**2026-09-10 — Audio migrated to xeno-canto API v3 (keyed).**
- On-device diagnostic revealed the truth: **xeno-canto API v2 is permanently retired**
  (404 "no longer available"), all public CORS proxies are dead/keyed (allorigins timeout,
  codetabs blocked, corsproxy now requires its own key), and **v3 requires a free key but is
  CORS-enabled** (a keyless call returned a readable 401 — proving direct browser access works).
- **Fix:** `useXenoCantoAudio` rewritten for **v3** — tag-based query (`gen:"X" sp:"Y"`),
  `key` param, direct fetch (no proxy), tolerant parser. Key resolves from `?xckey=` → env
  `VITE_XENOCANTO_KEY` → `localStorage.bhn_xc_key`. Cache namespace `bhn_xc3_`.
- **Dev panel** now has a **xeno-canto key input** (saves to localStorage) so audio can be
  tested instantly without a deploy, and the diagnostic tests v3 across 3 query formats and
  dumps the response field names + file URL (to confirm the exact v3 shape from the device).
- `deploy.yml` now passes `VITE_XENOCANTO_KEY` and `VITE_EBIRD_API_KEY` from repo secrets so
  production bakes them in (absent → mock/offline mode).
- **Action needed from Jared:** register a free xeno-canto account, get an API key, paste it
  into the dev panel to confirm, then add it as repo secret `VITE_XENOCANTO_KEY` for the live
  site. *Tradeoff:* a key baked into a public static build is visible in the JS (low-risk,
  rate-limited to his account); a key-hiding relay (Cloudflare Worker) is the later hardening.
- Verified with a mocked v3 response: diagnostic passes, Songs/Calls render, playback wired.
  Version badge `v2.4`.

**2026-09-09 (c) — Tilt control + bird-speed calibration.**
- **Tilt "doesn't work" fixed** (`BinocularsCapture.jsx`): the absolute tilt mapping assumed a
  fixed neutral (beta=45°, gamma=0), which in landscape pegged the view to an edge so tilting
  did nothing. Now the pose held at **Start is captured as the neutral baseline** and tilt is
  measured relative to it (works in any orientation, still no drift). ~18° pans fully.
- **"Unaccountably fast" birds fixed** (frame-rate independence): the behavior engine used
  fixed per-frame lerp factors and `totalFrame` counters that ignored `dt`, so on 120Hz
  ProMotion iPhones/iPads every bird moved ~2× too fast (validated: a 300ms dart covered ~99.7%
  of its path at 120Hz vs ~94.6% at 60Hz). All motion is now **dt-scaled** via a wall-clock
  accumulator, so speeds are identical at any refresh rate.
- **Barn Swallow & Cooper's Hawk specifically**: peak dart speed trimmed (0.18→0.15, 0.12→0.10)
  and the `aerial_dart` / `fast_low_ambush` **capture windows lengthened** (~1.1–1.6s near
  center) so they're catchable. *Note:* `captureStats.speed` per species is still unused —
  wiring it into a real per-species difficulty band is the proper Phase 2 follow-up.
- Version badge bumped to `v2.3`.

**2026-09-09 (b) — Photo & audio loading fixes.**
- **Root causes:** the xeno-canto metadata fetch is CORS-blocked in browsers (xeno-canto
  sends no CORS headers) and the single `corsproxy.io` fallback now requires registration,
  so recording lists never arrived → *audio never worked*. Wikimedia Commons *does* allow
  CORS but had no fallback, so any tightening on their side left photos dead.
- **Fix:** new shared helper `src/hooks/corsFetch.js` — `fetchJsonWithFallback()` tries the
  direct request first (keeps Wikimedia's fast path), then falls through a chain of public
  CORS proxies (allorigins → codetabs → corsproxy). `useXenoCantoAudio` and
  `useWikimediaPhotos` both use it. Added a reliable **Wikipedia REST lead-image fallback**
  so the headline species photo appears even if Commons search returns nothing. Cache
  prefixes bumped (`bhn_wiki_v2_`, `bhn_xc_v3_`) to evict stale empty results.
- **Verified** with a mocked-network headless run: photos render and load; when the direct
  xeno-canto fetch is blocked the proxy fallback delivers recordings and audio plays.
  *(Caveat: the mock proves our code path; real-world success also depends on the public
  proxies and xeno-canto being up — needs on-device confirmation.)*

**2026-09-09 — Phase 1 (dev mode) + two capture bug fixes.**
- **Dev mode** (`src/components/DevPanel.jsx`, wired in `App.jsx`): enable via `?dev=1`
  or by tapping the version badge 5×. Summon any of the 73 species (to the encounter or
  straight to capture), trigger any Easter Egg on demand, jump to Radar/Aviary/Leaderboard,
  filter by rarity, search by name. While dev mode is on, random encounters are suppressed
  so review is deterministic. State persists in `localStorage` (`bhn_devmode`).
- **Rotation cut-off fixed** (`BinocularsCapture.jsx`): in landscape the capture screen was
  clipped to the app's 430px-wide centered column (`App.css .app { max-width: 430px }`),
  showing a cut-off partial image. The capture screen now becomes a full-viewport
  `position: fixed` overlay in landscape, and viewport dimensions are tracked in state so a
  rotation always re-renders cleanly (iOS reports stale sizes mid-rotation, so we re-read at
  0/150/400 ms). Verified headlessly: capture `.screen` spans the full 844px viewport.
- **Drifting background fixed** (`BinocularsCapture.jsx`): tilt aiming integrated the tilt
  angle as a *velocity*, so holding the phone at any slight angle drifted the view (and
  background) forever. Now tilt angle maps directly to view *position* (~22° = full
  deflection) with easing, so holding steady holds the view steady. *(Reasoned + build-
  verified; needs on-device confirmation of feel since headless has no device-orientation.)*
- Version badge bumped to `v2.2`.

---

## Appendix C — Repository & deployment state (2026-07-09 archaeology)

A read-only "repository archaeology" pass established the following. No code was changed.

**Branches that exist:**
- `claude/bird-game-prototype-Mx0aV` — the **branch of record** and the real, current game.
  It is a clean *superset* of `main`: it has everything `main` has, **plus** the Easter
  Eggs feature and these vision docs. Verified: `main` contains nothing the branch lacks.
- `main` — **stale snapshot.** Frozen at 2026-03-30. PR #9 merged an *older* state of the
  branch into `main` (before Easter Eggs), so `main` is missing the Easter Eggs entirely
  (confirmed: its `docs/index.html` has 0 hits for "Carolina Parakeet"/"Save the Last
  Flock"/"Birding Bob"; the branch's build has them). This is a git-history staleness, not
  a lost-work problem — the work is safe on the branch.
- `claude/data-discovery-processing-system-yJMWn` — **orphaned, unrelated.** A whole
  eDiscovery/nginx/container platform ("VDiscovery") that was merged in via PR #8, then
  deliberately deleted (commit `a4e78b2`). The branch lingers as pure noise in a birding
  repo. Safe to delete.

**Build integrity:** the branch's committed `docs/index.html` is a **faithful, current
build** of the branch source — verified by a fresh `npm run build` producing a
byte-identical file. Not stale relative to its own source.

**Deployment mechanism:** `.github/workflows/deploy.yml` runs on pushes to **both** `main`
and the feature branch — it builds and auto-commits `docs/index.html` back to whichever
branch was pushed (these are the "Auto-rebuild docs [skip ci]" commits). Building on two
branches is *how `main` and the branch drifted apart*.

**Open question — which branch does GitHub Pages actually serve?** Could not be read from
inside the dev environment (no repo-settings access; the proxy blocks `github.io`).
Evidence leans toward Pages serving the **feature branch's `/docs`** (commit `b484c88` is
titled "…(GitHub Pages source branch)" referring to the feature branch). If so, the **live
site is already current** with Easter Eggs and nothing is broken for players — only `main`
is a stale git snapshot. **Jared to confirm in Settings → Pages.**

**Recommended actions (all are GitHub web clicks — see chat for direct links):**
1. Confirm the Pages source branch (Settings → Pages) and eyeball the live site.
2. *(Optional hygiene)* Merge the branch of record → `main` so `main` stops being a stale
   snapshot. Low-risk because the branch is a clean superset.
3. *(Optional cleanup)* Delete the orphaned `claude/data-discovery-processing-system-yJMWn`
   branch.
4. *(Later)* Pick ONE deploy source and keep it fed, so "latest work" and "what's live"
   stop diverging.
