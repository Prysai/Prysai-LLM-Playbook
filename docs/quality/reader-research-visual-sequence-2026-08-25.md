<!-- content_id: reader-research-visual-sequence-2026-08-25 | kind: quality-record | status: candidate | owner: site-maintainer | reviewed: 2026-08-25 -->

# Reader research visual sequence — 2026-08-25

This record covers the addition of the evidence-maturity ladder to the
research route's related visual sequence. It records route and rendering
checks; it does not establish translation quality, learner comprehension,
transfer, independent review, or release readiness.

**Follow-up verification:** 2026-08-26 at commit `4a12e18`.

## Change

- `site/reader.js` now supplies localized title, next-question, and evidence-
  boundary copy for `evidence-maturity-ladder-red-black.svg` in all eight
  registered Reader locales.
- Chapter 15, Lab 008, and Lab 015 now include that board in the related visual
  sequence. The existing two-card Reader presentation remains bounded to two
  related cards, so the new board replaces no primary visual and does not turn
  the Reader into an unstructured gallery.
- `scripts/reader_visual_smoke.mjs` now checks Chapter 15 in all eight locales,
  including discoverability of the ladder, non-empty alternative text, an
  evidence boundary, and no horizontal overflow at 390px.

## Verification

| Check | Result | Scope |
| --- | --- | --- |
| JavaScript syntax and whitespace | passed | `site/reader.js`, `scripts/reader_visual_smoke.mjs`, `git diff --check` |
| Reader visual smoke | passed | Lab 003 in 8 locales; Chapter 15 in 8 locales; 390px overflow guard |
| Teaching asset catalog | passed | 42 project-owned SVG boards, source register, mobile inventory, and SVG text alternatives |
| Project validators | passed | project, structure, content completeness, and canonical-EN learning contract |
| Semantic contract audit | passed with 10 attention signals | 320 files; `missing_contract=0`, `deep_missing=0`; compression signals are pre-existing review prompts |
| Regression suite | passed | `npm test`; 49 tests passed |
| Visual guide smoke | passed | 8 locales, 20 boards, 390px and 360px, no-script fallbacks |

## Evidence boundary

The ladder separates designed, rendered, practiced, transferred, and
independently reviewed evidence. Adding it to the Reader improves discovery of
that distinction; it does not move this project to a higher evidence stage.
The full browser smoke suite completed at commit `4a12e18` when run with
`BROWSER_SMOKE_TIMEOUT_MS=600000`; the default 240-second guard had timed out
once without an assertion stack. This is bounded local regression evidence,
not a performance target, production claim, deployment proof, or learner
evidence.
