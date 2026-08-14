# Visual asset audit addendum — current teaching boards

**Review date:** 2026-08-14
**Scope:** current source and local Reader render of
`assets/teaching/beginner-practice-loop-red-black.svg`; comparison against
claims in `visual-asset-audit-2026-08-12.md` about several teaching boards.

## Purpose

This addendum preserves the earlier audit as a historical record. It corrects
only observations that no longer describe the current tracked SVG sources. It
is a local visual inspection, not a user study, design approval, publication
check, or learner-outcome claim.

## Superseded observation

The 2026-08-12 audit classified `skill-to-observable-output.svg`,
`lifecycle-checkpoints.svg`, `evidence-recovery-ladder.svg`, and
`model-choice-is-a-test.svg` as older gradient or rounded-card work requiring
rebuild. The current tracked source files are hard-edged red, near-black, and
warm-white editorial boards. That historical classification must not be used
as a statement about their current source without a new source-and-render
inspection.

## Beginner practice board review

Local Chromium review of the Reader found the board visible in the desktop
teaching card at approximately 643 × 363 CSS pixels with no document-level
horizontal overflow. At a 390px viewport the Reader intentionally suppresses
the dense SVG and retains its thesis plus an accessible full-size link. The
full-size board remains the appropriate route for inspecting its detailed
labels; this does not demonstrate that readers use, understand, or complete
the practice loop.

The board previously embedded `CANDIDATE / 2026-08-13` in its footer. Those
are mutable project-state and date claims. The footer now carries the stable
provenance and action cue `PRYSAI LAB / ORIGINAL TEACHING BOARD / INSPECT THE
RECEIPT`. Current candidate and run-status facts remain in
`docs/governance/content-status.yaml` and the adjacent source page.

## Boundary

Screenshots and static accessibility checks establish only local rendering,
asset loading, and the stated responsive presentation. They do not establish
human design review, teaching quality, comprehension, learner completion,
transfer, safety, public deployment, or release readiness.
