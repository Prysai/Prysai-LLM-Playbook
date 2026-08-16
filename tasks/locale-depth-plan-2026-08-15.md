# Implementation plan: truthful deep-localization foundation

## Overview

Turn the current six-locale migration surface into a useful, honest
localization foundation. This slice delivers a continuous Chinese beginner
route through Chapter 5, makes the visible locale state disclose coverage and
fallbacks, and records an evidence-backed contribution path for the remaining
locales. It deliberately does not claim that a machine-generated or
single-author translation is independently language-reviewed.

## Architecture decisions

- English remains the canonical source. Every localized file retains its
  `content_id`, source revision, source links, code blocks, and status
  boundary.
- Chinese is the only course locale extended in this slice because it already
  has a continuous, readable start and a named project audience. ES, JA, KO,
  and DE remain entry/slice locales until a qualified reviewer is available.
- The site may show a locale selector, but it must distinguish a translated
  entry or candidate course slice from a fully localized course. Locale
  counts are generated from the matrix rather than maintained as prose.
- File existence and static validation prove routing/contract consistency;
  they do not prove translation quality, learner outcomes, or completeness.

## Task list

### Phase 1: Measure and disclose the actual state

- [x] Generate locale coverage metadata from the canonical matrix.
- [x] Show coverage/fallback state in the language selector without changing
      reader architecture outside this narrow disclosure.
- [x] Add a regression test that prevents a locale selector from implying
      complete course coverage when it is only a migration slice.

**Acceptance criteria:** locale totals match the matrix; no ES/JA/KO/DE route
is silently presented as a fully localized course; existing EN/ZH routing
continues to work.

### Phase 2: Complete one usable Chinese beginner slice

- [x] Translate Chapter 5, “Choose the Codex surface”, into Simplified
      Chinese while preserving the canonical teaching contract and source
      boundary.
- [x] Register it in the matrix, Chinese table of contents, and reader
      artifacts; retain `in-progress` pending independent language review.
- [x] Verify same-locale navigation, links, manifest/search generation, and
      desktop/mobile rendering.

**Acceptance criteria:** a Chinese reader can follow Chapters 1–5 and the
available accompanying labs without an accidental English redirect; status
remains truthful.

### Phase 3: Make the next four locales contributable, not fictional

- [x] Record first-party research on document-language metadata and reviewable
      translation PRs.
- [x] Link a concise translation slice and review checklist from contribution
      guidance.
- [x] Leave a prioritized language-slice backlog with an explicit human
      language-review gate.

**Acceptance criteria:** a contributor can submit one locale/content pair,
run focused checks, and know exactly what evidence is still required before
promotion.

## Verification checkpoints

After each phase, run the focused validator(s). Before handoff, run the
project, structure, content, canonical-learning-contract, localization,
locale-manifest, site-i18n, search, link, and targeted browser checks that
cover modified behavior.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| A language count is mistaken for completeness | state translated-unit and full-course totals separately |
| Translation drifts from English | retain identity/revision metadata and link back to source |
| UI work collides with the separate Reader project | limit changes to existing locale disclosure hooks and generated metadata |
| No independent reviewer is available | retain `in-progress`; do not promote status or claim quality verification |
