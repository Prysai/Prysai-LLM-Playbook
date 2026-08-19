# Foundation route visual check — 2026-08-19

**Status:** candidate visual inspection
**Scope:** local static site candidate after adding the foundation route map and
four supporting check boards to `site/index.html`
**Viewports:** 1280 × 1000 and 390 × 844

## What was checked

- The new route board is the first card and states one sequence: define,
  context, request, check, then repair, transfer, or stop.
- The four supporting cards remain in a two-column grid on desktop and become
  one card per row on a 390px viewport.
- Each card keeps a textual title, a short explanation, a localized `alt`,
  and a full-size link; the SVG is not the only explanation.
- The page has no horizontal document overflow at 390px, and all five SVG
  resources report a non-zero natural width in the browser smoke.
- Seven interface locales render the same five-card order with localized
  headings, descriptions, and alternative text.

## Evidence

- `npm run test:browser` passed with `desktop=1280 mobile=390`.
- `python scripts/validate_teaching_assets.py` passed with `assets=25`.
- Temporary screenshots and the local HTTP server used for inspection are not
  repository assets; they were removed after review.

## Boundary

This is a local rendering and link-integrity check. It does not prove that a
reader understands the diagrams, that a model or tool ran, that a source is
correct, or that the course is production-ready. The new board is recorded as
asset `S133` in `docs/sources/asset-register.md`.
