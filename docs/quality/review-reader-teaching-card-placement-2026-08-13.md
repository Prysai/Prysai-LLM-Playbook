# Reader teaching-card placement review — 2026-08-13

**Status:** scoped local browser review  
**Artifact status:** `candidate`  
**Surface:** locally built Pages candidate at `127.0.0.1:4173`; no public deployment  
**Viewports:** 1440 × 1024 and 390 × 844

## Question

Do the four original teaching boards remain useful in their real Reader
placements, rather than only when opened as standalone SVG files?

## Method

The local Pages artifact was rebuilt with
`scripts/build_pages_artifact.py`, then served through
`scripts/serve_pages_candidate.py --skip-build --port 4173`. A Chromium
check opened the following canonical English chapter routes, scrolled each
board into its actual placement, and captured one desktop and one mobile
viewport:

| Reader placement | Teaching board | Desktop result | 390px result |
| --- | --- | --- | --- |
| Chapter 8, *Full lifecycle workflow* | `lifecycle-checkpoints.svg` | visible at 643 × 363px | board is withheld; title and full-size route remain visible |
| Chapter 9, *Verification and recovery* | `evidence-recovery-ladder.svg` | visible at 643 × 363px | board is withheld; title and full-size route remain visible |
| Chapter 10, *Planning and slicing* | `lifecycle-checkpoints.svg` | visible at 643 × 363px | board is withheld; title and full-size route remain visible |
| Chapter 11, *Designing a Skill* | `skill-to-observable-output.svg` | visible at 643 × 363px | board is withheld; title and full-size route remain visible |

The captures and the machine-readable measurement report are local review
evidence under `output/visual-audit/2026-08-13/`. That directory is ignored on
purpose: it is reproducible workstation evidence, not a publication asset or a
claim of deployed rendering.

## Observations

### Desktop Reader

- All four routes loaded the intended original SVG through the Reader. Each
  board was surrounded by a labelled teaching-card treatment, a direct
  **Open full-size visual** route, and an adjacent evidence boundary.
- At the in-column size, the board-level thesis, stage order, red stop state,
  and main decision path remained visible. The smallest labels are supporting
  detail, not a substitute for the chapter text; the full-size route is needed
  to inspect them comfortably.
- The red/black/off-white editorial system remained consistent with the
  Reader. No clipping, blank asset, overlap with the side navigation, or
  horizontal document overflow was observed in these placements.

### Mobile Reader

- The Reader did not squeeze the 1600 × 900 boards into a narrow phone column.
  Instead it retained the board thesis and a visible **Open full-size visual**
  route. This avoids presenting unreadable small type as if it were mobile
  content.
- Each inspected page retained a 390px document width with no horizontal
  overflow. The surrounding boundary note and the next prose section remained
  readable after the visual handoff.

## Decision

Keep the original SVG boards and the current mobile full-size handoff. A new
raster illustration would not clarify the learning mechanism and would weaken
the inspectable, project-owned asset boundary. Do not claim that the desktop
preview makes every small internal label readable; it is an overview with an
explicit full-size reading route.

## Evidence boundary

This is rendered local-browser evidence for four chapter placements and two
viewports. It does not establish cross-browser rendering, assistive-technology
experience, reader comprehension, translation coverage, public Pages
availability, learner outcomes, or that the boards prove a Skill or workflow
ran. Asset provenance remains recorded in
[`docs/sources/asset-register.md`](../sources/asset-register.md), including
the original teaching-asset entries S22, S24, and S25.
