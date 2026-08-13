# Beginner Practice Pack browser and visual review

**Date:** 2026-08-13

**Status:** candidate review

**Surface:** local static server at `127.0.0.1:4173`; no deployment

## Scope

This review inspected the current worktree after the Beginner Practice Pack,
reader copy controls, and practice-loop SVG were integrated. It is rendering
and interaction evidence, not learner, model, prompt-effectiveness, transfer,
retention, deployment, or production evidence.

## Desktop homepage

- Viewport: 1280 × 720.
- Document: 15,931px high; `scrollWidth=1265` within the 1280px viewport.
- The general-skill route and replacement practice-loop visual were present.
- Browser console warnings/errors recorded for the page: 0.
- Visual observation: the hard red/black hierarchy remains consistent and the
  new route does not add another visual card; it replaces the older route card.

## Mobile practice pack

- Viewport: 390 × 844.
- Document: 12,385px high; `scrollWidth=375` within the 390px viewport.
- The title, evidence boundary, and teaching board rendered without clipping.
- Seven copy controls rendered: six prompt cards plus the common receipt.
- Activating the first control changed its live status to `Prompt copied`.
- Browser console warnings/errors recorded before the SVG-only navigation: 0.

The page length is a known cost of keeping all six cards in one source. It is
acceptable for this candidate reader because routes have direct anchors, but
it is not evidence that the mobile information architecture is finished.

## Teaching board

- The SVG rendered at 1280 × 720 with no clipping or horizontal scrolling.
- The four steps, evidence labels, claim ladder, and mastery warning were
  readable at the inspected viewport.
- The composition uses only project-owned type, rules, blocks, and text; no
  external image, icon, illustration, gradient, shadow, or generated person.

An error appeared in the browser automation layer after navigating from the
reader to the standalone SVG. It did not appear on the homepage or reader and
is not attributed to asset JavaScript because the SVG contains no script.

## Critical limitation retained

The 15,931px value above is the earlier 1280px-wide desktop homepage, not a
mobile-homepage measurement. Final independent inspection of the complete
worktree measured the 390 × 844 homepage at 17,165px with no page-level
horizontal overflow or console error. The seventh problem route increased the
start section, and this milestone did not reduce the larger project-map,
learning-path, or first-30-minute sections. Reducing the mobile homepage below
a declared target remains P1.
