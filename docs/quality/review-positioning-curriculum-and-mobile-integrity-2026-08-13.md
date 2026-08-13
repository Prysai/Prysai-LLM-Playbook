# Positioning, curriculum, and mobile integrity review — 2026-08-13

**Status:** scoped candidate review

**Surfaces:** README entry, public homepage, Reader, book architecture, learning model, Labs 017–018

**Runtime:** local static server; headless Microsoft Edge; 390 × 844 plus desktop in-app Chromium

## Question

Do the public entry points describe the accepted universal-core / Codex-flagship
architecture without overstating completion, and can a phone reader reach the
actual chapter links and adjacent chapter controls?

## Confirmed defects and disposition

| Defect | Evidence before repair | Disposition |
|---|---|---|
| Public promise hid the accepted transferable-core / Codex-flagship relationship | Homepage hero and README front door | Kept the existing Codex public identity, clarified the architecture as a subtitle and scope statement, and added an explicit universal-core route |
| Internal maturity language appeared before reader benefit | Homepage hero note and four-item brief | Replaced the first summary choices with actions and moved claim limits behind a visible evidence link |
| Eight desktop navigation choices competed in the header | Homepage primary navigation | Reduced to Start here, Learning path, Reading routes, and Project index |
| Browser could combine new HTML with cached old JavaScript | Local Chromium showed the new four-link navigation but the old Hero copy | Added matching version query strings to homepage and Reader CSS/JS assets; refreshed runtime then showed one coherent version |
| The README called a private repository public | GitHub visibility and README release note disagreed | Removed the public claim and stated the current private/Pages boundary |
| ADR-0025 presented its 17-Lab decision-time count as a current fact | Current canonical inventory contains 18 Labs | Marked 17 as the decision-time snapshot and pointed current inventory ownership to the content-status source |
| Lab 018 said it was unregistered after it had entered the canonical graph | Learning path, content status, Lab index, and locale manifest already contained it | Replaced the stale statement with the accurate `draft / not_run` evidence boundary |
| Lab 017 skipped Lab 018 | Its next link returned to the Lab index | Linked 017 to 018 and added an 018 footer back to the complete Lab index |
| Mobile chapter groups expanded without exposing chapter links | `#chapters .chapter-items { display: none; }` at 480px | Restored a one-column chapter list inside each disclosure |
| Reader chapter navigation appeared after long article content on a phone | Sidebar source order and ineffective child `order` rule | Added a compact pre-article disclosure with progress, adjacent chapters, and the page outline; maintenance details remain after the article |
| L5 had two conflicting names | Canonical learning path used Evidence reviewer; learning model used Agent designer | Aligned the learning model to Evidence reviewer |
| Four evidence types were described as sufficient for unqualified mastery | Book architecture omitted retention, unseen transfer, independence, and stability | Recast them as minimum evidence in a named task and environment; stronger learning claims require separate measurements |

## Browser evidence

At 390 × 844, the English and Chinese homepages had no horizontal overflow and
recorded no console warning, console error, or page error. The English homepage
rendered all six links after opening the first chapter group. Its document
height was 9,327px after the links were restored; the Chinese page was 8,498px.

Chapter 22 rendered without horizontal overflow. The mobile chapter disclosure
appeared before the article, identified Chapter 22 of 22, exposed Chapter 21 as
the previous chapter, and correctly hid the next control. The universal-core
route rendered in the Reader without pretending to be a numbered Codex
chapter. These checks establish behavior only in the recorded local Edge
environment.

## Remaining high-value gaps

- The universal route maps four units, not a complete platform-neutral
  curriculum. Context selection, reuse, evaluation, and team governance still
  need canonical ownership, neutral practice, and transfer evidence.
- Most Labs still lack generated previous/next navigation. Labs 017–018 were
  repaired because their current sequence was factually wrong; a separate Lab
  navigation contract is preferable to hand-maintaining all 18 footers.
- Learner and transfer runs remain `not_run`. Structural validity, a local
  render, and a maintainer reference run do not establish learning outcomes.
- The mobile homepage is still long. Restoring functional chapter links raised
  the English page to 9,327px, below the earlier 9,800px milestone but not proof
  of good first-time-user comprehension.
- The repository is private and GitHub Pages is not live under the current
  plan. Local runtime and a Pages artifact workflow do not establish a public
  deployment.

## Verification boundary

The repository validators, local-link checker, localization check, canonical
English learning-contract check, generated navigation check, and two local
browser environments passed for this worktree. This review does not establish
cross-browser compatibility, screen-reader quality, learner comprehension,
retention, transfer, public reachability, or production readiness.
