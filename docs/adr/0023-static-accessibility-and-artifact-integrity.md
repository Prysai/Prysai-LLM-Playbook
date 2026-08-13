# ADR-0023: Gate static accessibility and built-artifact integrity

## Status

Accepted

## Date

2026-08-12

## Context

The public source pages had localized labels, skip links, landmarks, and image
text, but CI did not enforce those properties. The Pages builder proved that a
bounded set of files was copied; it did not follow generated HTML references
to show that local routes, resources, and same-page anchors still existed.

A generic rule that requires a source H1 on every HTML file would be wrong for
`site/reader.html`. That file is a dynamic reading shell: its article headings
come from the selected Markdown source at runtime. Static checks must recognize
that boundary instead of rewarding a redundant hidden heading or producing a
permanent false positive.

## Decision

1. Add `scripts/validate_site_accessibility.py` with deterministic checks for
   document language, one main landmark, unique IDs, image `alt` presence,
   named controls, form labels, valid local ARIA references, and non-skipping
   heading order on ordinary source pages.
2. Treat the reader as a declared dynamic shell. Require one accessible article
   mount initially marked busy, while leaving rendered Markdown heading checks
   to browser-level review.
3. Use the same validator against a built artifact to resolve local HTML links,
   stylesheets, scripts, images, and HTML fragments within the artifact
   boundary. Reject escaped paths, absent files, and absent target IDs.
4. Run explicit negative fixtures for missing image alternatives, heading
   jumps, missing generated routes, and missing generated anchors.
5. Include source rules and fixtures in the commit-bound content-integrity
   dimension. Keep artifact route checks inside the existing bounded Pages
   build, so the check observes the files that would actually be uploaded.

## Alternatives considered

### Add Lighthouse and use its score as the gate

Rejected for this stage. A score combines changing audits and browser behavior,
needs another runtime and dependency policy, and still cannot certify keyboard
or assistive-technology use. Deterministic source failures are a smaller and
more legible first gate.

### Require one H1 in every source HTML file

Rejected. The reader shell receives its article and headings dynamically. A
synthetic source heading would misrepresent the page or require presentation
workarounds solely to satisfy the checker.

### Check only repository-relative Markdown links

Rejected. The root Pages entry injects a base path, and generated HTML also
loads scripts, stylesheets, images, and fragment targets. Source-file existence
alone does not establish that those references resolve inside the publish
artifact.

### Claim accessibility when the static gate passes

Rejected. Static markup rules do not observe focus order, keyboard operation,
screen-reader announcements, color contrast, zoom, reflow, motion, browser
differences, or reader success.

## Consequences

- Common structural regressions become blocking and have failure fixtures.
- Broken generated routes and anchors fail the same build that defines the
  Pages upload boundary.
- The dynamic-reader exception is explicit and narrow rather than implicit.
- A later browser matrix can add keyboard, rendered headings, contrast, zoom,
  reflow, and assistive-technology evidence without redefining this gate.

## Evidence boundary

A passing gate proves that the checked source markup met the named static rules
and that local references in the built artifact resolved at build time. It does
not prove WCAG conformance, browser behavior, deployed availability,
assistive-technology output, translation quality, or usability.
