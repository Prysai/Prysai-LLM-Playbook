# French locale browser and visual review — 2026-08-21

**Status:** `candidate` · localized route review completed; independent French
copy review and learner evidence remain pending.

## Scope

This review covers the local Pages candidate generated from the current worktree
on branch `prysai/french-locale-20260821`. It checks the registered eight-locale
route set, French home-page rendering, Reader navigation, explicit failure
states, and the two responsive viewports exercised by the browser smoke suite.

## Verified in the local candidate

- `LOCALE_RELEASE_PATHS_OK`: 40 course units resolve in each of `en`, `zh`,
  `es`, `ja`, `ko`, `de`, `zh-tw`, and `fr`.
- `BOOK_NAVIGATION_OK`: all 22 chapters have same-locale navigation for the
  eight registered route suffixes.
- `BROWSER_SMOKE_OK`: desktop `1280px`, mobile `390px`, localized home-page
  content, five foundation boards, goal routes, Reader routes, lazy search,
  invalid paths, and missing-translation fail-closed behavior passed.
- French home-page checks in the local candidate report `document.lang=fr`, a
  French H1 and primary action, French route labels, French visual-board titles,
  no horizontal overflow, and same-locale Reader links.
- The rendered French desktop hero keeps the first action, foundation route,
  and optional five-minute example in one readable hierarchy. The generated
  mobile capture stacks the five teaching boards vertically without horizontal
  overflow; the Reader mobile capture starts with the localized shell and
  article H1 rather than a blank or fallback page.

## Evidence files

- `output/playwright/hero-routes-desktop.png`
- `output/playwright/hero-routes-mobile.png`
- `output/playwright/foundation-visuals-mobile.png`
- `output/playwright/candidate-reader-mobile-chapter-02.png`
- `output/playwright/candidate-reader-mobile-chapter-02-fr.png`
- `scripts/browser_smoke.mjs`
- `docs/governance/locale-matrix.yaml`
- `site/locale-manifest.js`
- `site/search-index.js`

## Not established by this review

Browser rendering does not certify that the French text is native-level,
culturally adapted, factually complete, or independently proofread. It also
does not establish learner completion, transfer, retention, cross-platform
equivalence, production deployment, crawler ranking, or runtime Skill quality.
The French files therefore remain `translation_status: in-progress` and the
repository remains `candidate`.
