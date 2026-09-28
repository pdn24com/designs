# Daria Music Player — redesign dossier (28 September 2026)

Self-contained HTML deliverables for the Daria redesign assignment. Open `index.html` in a browser; everything works offline except the optional IBM Plex web font for the documentation pages (the product mockups use the bundled Vazirmatn).

| File | Deliverable |
| --- | --- |
| `index.html` | Concise owner summary: decisions worth debating, strongest improvements, creative bets, what is unproven |
| `diagnosis.html` | Part 1 · Product diagnosis: evidence inventory, strengths, ranked problems, capability/status map, questions, assumptions |
| `concepts.html` | Part 2 · Three concepts (Rooms, Dock, Stage): criteria and weights, IA maps, comparable mockups, shared task walkthroughs, comparison, recommendation, head-to-head with each reference |
| `design.html` | Part 3 · Final design: structure, 60+ rendered states, dark/RTL/small/large-text/landscape, visual system, motion, accessibility, decision register, critique |
| `prototype.html` | Interactive Dock prototype with scenario controls (language, theme, text scale, width, reduced motion, start states, failure simulations) |
| `handoff.html` | Part 4 · Engineering handoff: component and state contracts, behaviour specs, content rules, accessibility acceptance, staged rollout, coverage ledger, reused ideas |
| `validation.html` | Part 5 · Validation plan: participants, prioritised tasks, experiments, technical checks, remaining risks |
| `exports/` | PNG renders of key screens and concept mockups |

## Evidence conventions

Claims carry the package's evidence classes: Observed (capture ID), Contract (feature-contracts.md), Owner requirement, Proposal, Unknown, Simulated. Capture IDs refer to `current-app/NN-*.png` in the supplied package. Figma frames are F01–F10.

## What is simulated

- No audio plays. No file is read or written. Android permission dialogs, the write-consent dialog, the share chooser, the photo picker and the file picker are imitations, labelled in red inside the prototype.
- Library counts around the observed 825-song baseline (hidden, short and unknown-duration files) are modelled, not measured.
- Titles, artists, durations, folders and counts come from the captures; covers are generated placeholders; "Night Letters", "Blue Hour", the Persian-script tracks, the short clips and all lyrics are illustrative.

## Structure

- `assets/kit.css`, `assets/kit.js` — product tokens, representative content, components, generated covers and the Daria fallback tile
- `assets/proto.js` — the Dock prototype engine (state, screens, actions, EN/FA strings)
- `assets/concepts.js` — static renderers for the Rooms and Stage concepts
- `assets/doc.css`, `assets/doc.js` — documentation styling, navigation and phone galleries
- `assets/fonts` — Vazirmatn (SIL OFL); `assets/icons.js` — Lucide 0.460 icons (ISC); licences in `assets/licenses`

## Regenerating exports

`node tools/export.js` (requires Playwright with Chromium) renders the PNGs in `exports/`.
