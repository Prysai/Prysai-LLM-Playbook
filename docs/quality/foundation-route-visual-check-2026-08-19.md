# Foundation route visual check — 2026-08-19

**Status:** candidate visual inspection
**Scope:** local static site candidate after adding the foundation route map,
four supporting check boards, and a complete five-unit route preview to
`site/index.html`
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
- The homepage route preview now names all five core units: the first three
  remain actionable links, while units 3–5 are shown as continuation nodes so
  unsupported translated deep links are not fabricated.
- At 390px, repeated route descriptions are hidden while the numbered labels
  and boundary remain visible; this keeps the primary action and route map
  scannable without horizontal overflow.
- The Reader's local core tracker now adds one compact `Next step` card below
  the five-unit status list. Before an attempt it opens the current unit and
  names that unit's declared artifact; after saving an attempt it points to
  the next unit and names the next artifact. The card is informational only:
  it does not change the local receipt schema or turn an attempt into a course
  completion claim.
- The next-step card was checked in English, Simplified Chinese, Traditional
  Chinese, Spanish, Japanese, Korean, and German. It remains visible at the
  phone width without horizontal overflow and keeps its link inside the
  selected locale.

## Evidence

- `npm run test:browser` passed with `desktop=1280 mobile=390` and checked the
  five-unit route preview, local next-step transitions, and all seven
  interface locales.
- `python scripts/validate_teaching_assets.py` passed with `assets=25`.
- Temporary screenshots and the local HTTP server used for inspection are not
  repository assets; they were removed after review.

## Boundary

This is a local rendering and link-integrity check. It does not prove that a
reader understands the diagrams or next-step copy, that a model or tool ran,
that a source is correct, or that the course is production-ready. The new
board is recorded as asset `S133` in `docs/sources/asset-register.md`.
