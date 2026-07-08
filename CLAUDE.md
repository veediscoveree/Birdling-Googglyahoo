# Bird. Here. Now. — Claude Code session guide

**Read `PROJECT_VISION.md` before doing anything.** It holds the full project state,
vision, roadmap phases, and pending decisions. Update it in the same commit whenever a
roadmap phase ships or a decision is made.

## Ground rules

- The maintainer (Jared) builds entirely by prompting — explain what you did in plain
  language and always verify your own work: run `npm run build`, exercise the change,
  and report evidence, not claims.
- One roadmap phase per session/PR. Don't bundle unrelated work.
- Develop on the `claude/`-prefixed branch you were given; never push elsewhere.

## Quick facts

- React 18 + Vite, single-file build (`vite-plugin-singlefile`).
- `npm run dev` to run; `npm run build` outputs `dist/index.html`; GitHub Pages serves
  `docs/index.html` (auto-rebuilt by a workflow — don't hand-edit it).
- 73 species in `src/data/birds.js` — this schema is the source of truth for field
  marks, behavior, sounds, and capture difficulty. Avatar/gameplay changes must be
  audited against it.
- eBird, Supabase, xeno-canto, and Wikimedia integrations already exist and activate
  via env vars (see PROJECT_VISION.md Appendix A). Without keys the app runs in
  mock/offline mode — that is expected, not a bug.
- Legacy standalone prototype lives at `bird-here-now-prototype.html`; the real app is
  `src/`.
