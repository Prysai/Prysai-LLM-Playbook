# Mobile route chooser browser review — 2026-08-13

**Status:** scoped local browser review
**Artifact status:** `candidate`
**Environment:** local static server, headless Microsoft Edge through Playwright
**Viewports:** 1280 × 720 and 390 × 844

## Question

Does the homepage now act as a phone route chooser without weakening the
desktop catalogue, complete indexes, keyboard access, or evidence boundary?

## Measurements

| Observation | Desktop | Mobile EN | Mobile ZH |
|---|---:|---:|---:|
| Viewport | 1280 × 720 | 390 × 844 | 390 × 844 |
| Document height | 16,587 px | 8,773 px | 8,478 px |
| Horizontal overflow | none | none | none |
| Console warnings or errors | none observed | none observed | none observed |
| Visible Lab cards | 18 | 2 | 2 |
| Visible Skill cards | 12 | 4 | 4 |
| Complete mobile index links | hidden by design | 8 of 8 | 8 of 8 |
| Learning-level tabs | 7 | 7 | 7 |
| Chapter route summaries | 4 | 4 | 4 |

The three mobile route links begin at 587, 635, and 682 px from the document
top, so they appear in the first 844 px viewport. They link to the first safe
task, the Beginner Practice Pack, and the complete project indexes. The eight
index links preserve one-tap access to all 22 chapters, 18 Labs, 12 Skills,
three field cases, six locale records, seven teaching boards, 18 update areas,
and four Page Trust families.

## Interaction checks

- The complete starter prompt is collapsed by default at 390 px and remains
  open on desktop. Enter and Space both toggle its native `details` control.
- Enter and Space both toggle a chapter route summary.
- ArrowRight moves the learning path from L0 to L1; End moves it to L6.
- The English and Simplified Chinese mobile route labels, starter-prompt
  summary, and eight index labels render without missing keys.
- A direct mobile link remains available for the complete Lab and Skill
  registries; the reduced cards are examples, not the complete inventories.

## Visual judgement

The retained red/black teaching boards are not generic generated illustrations:
they use hard rules, one accent colour, named stages, explicit evidence limits,
and no gradients, glow, stock imagery, fake charts, or ornamental data. On a
phone, the homepage now removes the board images and presents their titles as
compact links, because the embedded small labels would not be legible at card
width. The full SVGs remain available at their intended viewing size.

## Limits

This review covers one local Edge environment and two viewports. It does not
establish cross-browser behavior, screen-reader output, public Pages routing,
learner outcomes, or production readiness. The desktop page remains long by
design. The mobile result is below the 9,800 px milestone gate, but later user
testing may still justify separate index pages or further reduction.
