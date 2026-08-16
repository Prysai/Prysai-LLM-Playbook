# Visual asset audit addendum — current teaching boards

**Review date:** 2026-08-14
**Scope:** current tracked SVG sources and local Reader renders of the header,
five public teaching boards, and the responsive beginner-practice card;
comparison against claims in `visual-asset-audit-2026-08-12.md`.

## Purpose

This addendum preserves the earlier audit as a historical record. It corrects
only observations that no longer describe the current tracked SVG sources. It
is a local visual inspection, not a user study, design approval, publication
check, or learner-outcome claim.

## Superseded observations

The 2026-08-12 audit classified `skill-to-observable-output.svg`,
`lifecycle-checkpoints.svg`, `evidence-recovery-ladder.svg`, and
`model-choice-is-a-test.svg` as older gradient or rounded-card work requiring
rebuild. The current tracked source files are hard-edged red, near-black, and
warm-white editorial boards. That historical classification must not be used
as a statement about their current source without a new source-and-render
inspection.

The audit also named the then-current `codex-field-guide-header.svg`. The
current reader-facing header is `prysai-llm-playbook-header.svg`, and it now
uses a labelled five-checkpoint rail rather than an unlabeled glow treatment.
The 2026-08-12 filename and its corresponding visual finding remain useful
historical evidence, not a description of the current header.

## Current local render inspection

The following screenshots were made from the current local Reader or direct
asset route at a desktop viewport. They establish only the visible composition
at that declared local render, not human approval or user comprehension.

| Current asset | Local screenshot | Observation |
| --- | --- | --- |
| `assets/readme/prysai-llm-playbook-header.svg` | `output/playwright/header-before.png` | A near-black title field and a labelled five-checkpoint rail make the reading sequence visible without ornamental pseudo-data. |
| `assets/teaching/skill-to-observable-output.svg` | `output/playwright/skill-flow-before.png` | Variable-width panels, one red state panel, and a labelled verification rail replace the prior rounded-card grammar. |
| `assets/teaching/lifecycle-checkpoints.svg` | `output/playwright/lifecycle-before.png` | The lifecycle has two reading bands and a visible `STOP / RECOVER` branch; it is not a seven-card rainbow sequence. |
| `assets/teaching/evidence-recovery-ladder.svg` | `output/playwright/recovery-ladder-current.png` | The stepped proof model visibly stops at the first missing proof and separates recovery from an acceptance claim. |
| `assets/teaching/model-choice-is-a-test.svg` | `output/playwright/model-choice-current.png` | The fixed-condition comparison is now a four-stage hard-edged board with one restrained accent system. |
| `assets/teaching/task-to-evidence-red-black.svg` | `output/playwright/task-evidence-current.png` | The request-to-claim sequence is readable as five named evidence steps ending in an explicit unknown/stop boundary. |

These observations supersede only the old claims of gradients, glass panels,
soft shadows, decorative curves, rainbow sequencing, or rounded-card grammar
for the named current assets. They do not settle whether every label is
optimal at every placement, whether a social crawler will render an image, or
whether the system is ready for publication.

## Field-signal legibility correction

A later local Reader screenshot of
`field-signal-to-safe-degradation-red-black.svg` found that the three-column
body copy still became too small at its embedded reading width. The current
source now shortens each row to a direct observation, one forbidden inference,
and one safe move; it uses 38–40px body text on the 1600px source canvas and a
two-line conclusion. The source boundary remains S43 and no field report,
runtime, or learner result is added by this visual correction.

This correction is based on a local rendered screenshot, not on a reader
comprehension test. A future usability observation may still find that the
labels, order, or full-size route need adjustment.

## Beginner practice board review

Local Chromium review of the Reader found the board visible in the desktop
teaching card at approximately 643 × 363 CSS pixels with no document-level
horizontal overflow. At a 390px viewport the Reader intentionally suppresses
the dense SVG and retains its thesis plus an `Open full-size visual` link. The
raw SVG destination is not itself phone-fitted: at that width its initial view
is cropped rather than a readable scaled board. Treat the thesis as the mobile
fallback and log a responsive/zoomable visual view as a Reader-owner repair;
do not describe the raw destination as an accessible full-size alternative.
This does not demonstrate that readers use, understand, or complete the
practice loop.

The board previously embedded `CANDIDATE / 2026-08-13` in its footer. Those
are mutable project-state and date claims. The footer now carries the stable
provenance and action cue `PRYSAI LAB / ORIGINAL TEACHING BOARD / INSPECT THE
RECEIPT`. Current candidate and run-status facts remain in
`docs/governance/content-status.yaml` and the adjacent source page.

## Source-record card review

The original `source-check-before-belief-red-black.svg` board was rendered in
the local Reader at the `#source-check-route` fragment. At the 1280px desktop
viewport, one thesis, the missing-record state, four checkable fields, and the
red stop action remained visible without document-level horizontal overflow;
the `source-record-check-desktop.png` screenshot is retained under
`output/playwright/`. At the 390px viewport, the Reader did not shrink the
dense board. It retained the thesis and an `Open full-size visual` link; the
corresponding mobile screenshot is
`output/playwright/source-record-check-mobile.png`. The raw SVG destination is
not phone-fitted: its initial viewport is cropped. Treat the thesis as the
mobile fallback, not the link as an accessible visual alternative, until the
Reader supplies a responsive or zoomable view.

This is a local render observation only. It does not establish that readers
understand the evidence distinction, identify bad citations, verify sources,
or change a later decision.

## Six-message research card review

The original `research-question-to-source-record-red-black.svg` board was
rendered in the local Reader at the `#six-short-research-messages` fragment.
At the 1280px desktop viewport, the two-line decision thesis, four panels, and
two-line stop boundary remained fully contained at the embedded reading width;
the local screenshot is
`output/playwright/six-message-research-desktop.png`. This board intentionally
uses short lines such as `ONE CHECK / YOU CAN / ANSWER.` so the complete action
is legible in the narrow Reader column rather than relying on a clipped heading
or an assumed full-size visit.

At the 390px viewport, the Reader intentionally withholds the dense board and
retains its thesis plus an `OPEN FULL-SIZE VISUAL` link; the local screenshot
is `output/playwright/six-message-research-mobile.png`. That raw SVG link is
not phone-fitted, so the thesis is the mobile fallback and the visual link is
not yet an accessible alternative. The nearby six-message flow states that it
is a candidate source-planning aid, not a promise that a model can search,
judge a source, complete research, or make a decision.

This is a local render observation only. It does not establish that readers
understand the sequence, use the full-size route, perform research correctly,
verify sources, make safe decisions, or gain a durable skill.

## Practice-target card review

The original `practice-target-to-first-attempt-red-black.svg` board was
rendered in the local Reader at the `#practice-target-route` fragment. At the
1280px desktop viewport, the four panels—`KEEP THEIR WORDS`, `ONE REAL
SCENE`, `ONE VISIBLE MOVE`, and `FOUR TYPED TURNS. THEN LOOK.`—were fully
contained in their panels at the embedded reading width; the local screenshot
is `output/playwright/practice-target-desktop.png`. The adjacent copy keeps
the handoff visible and states that selecting a target starts practice but
does not prove a result.

At the 390px viewport, the Reader intentionally avoids shrinking the dense
board. It retains the board's thesis and an `OPEN FULL-SIZE VISUAL` link; the
local screenshot is `output/playwright/practice-target-mobile.png`. The raw
SVG link is not phone-fitted, so the thesis is the mobile fallback and the
visual link is not yet an accessible alternative. The six copy-ready Spanish
practice messages were also locally inspected at that viewport in
`output/playwright/six-message-spanish-mobile.png`; the first message and its
copy control remained visible without horizontal overflow.

These are local rendering observations, not evidence that a learner selects
the right target, understands the six messages, completes the practice loop,
or gains a language skill.

## Work-update practice-loop review

The new fictional work-update loop was rendered in the local Reader at the
`#six-short-work-update-messages` fragment. At the 1280px desktop viewport,
the fragment heading appeared below the fixed header, the first boundary
paragraph and first copy control were visible, and the first prompt card stayed
inside the reading column. At the 390px viewport, the heading, fictional-data
boundary, first action, and `COPY PROMPT` control stayed visible without
document-level horizontal overflow; local screenshots are
`output/playwright/six-message-work-update-desktop.png` and
`output/playwright/six-message-work-update-mobile.png`.

This is a local rendering observation only. It does not establish that a
beginner understands the update task, protects real workplace information,
writes an effective update, uses the copy control, completes the six-message
loop, or transfers the method to a real audience.

## 2026-08-15 vertical reflow for three beginner-route boards

The 2026-08-14 raw-mobile observations for
`source-check-before-belief-red-black.svg`,
`research-question-to-source-record-red-black.svg`, and
`practice-target-to-first-attempt-red-black.svg` describe their prior
1600×900 source files. They are superseded for those named assets by an
original 900×1400 vertical reflow on 2026-08-15. After rebuilding the temporary
Pages artifact, a direct local 390×844 render of each source showed its title,
four steps, and stop or claim-limit panel without horizontal cropping in the
initial viewport.

This is a narrow source-and-render observation. It does not prove that the
Reader's hidden-card fallback invites the link, that a reader understands the
board, that its text is comfortable at every zoom level, or that any other raw
wide board is phone-fitted. No learner, accessibility, or teaching-result
claim is created by this reflow.

## 2026-08-15 vertical reflow for two universal-core boards

The prior raw-mobile inspection also found the wide
`conversation-safety-card-red-black.svg` cropped at 390px and the wide
`first-turn-contract-card.svg` too reduced for card-body text to be useful.
Those sources are now superseded by original 900×1450 and 900×1500 vertical
boards. After rebuilding the temporary Pages artifact, a direct local 390×844
render of each showed all five Boundary Card decisions or all six first-turn
fields and its final limit panel in the initial viewport.

This changes no safety, product, platform, or learner claim. It does not make
the Reader's full-size destination a general responsive viewer or repair any
remaining wide raw SVG destination.

## Boundary

Screenshots and static accessibility checks establish only local rendering,
asset loading, and the stated responsive presentation. They do not establish
human design review, teaching quality, comprehension, learner completion,
transfer, safety, public deployment, or release readiness. An independent
human art-direction review remains pending.
