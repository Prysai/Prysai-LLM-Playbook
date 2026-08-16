# Current adversarial and visual review — 2026-08-15

**Status:** review record only; it does not promote the project, close a
quality-register item, or authorize release.
**Review target:** local candidate worktree at `871d4842b856f981170191c51d6ae4d6e31245d3`, with uncommitted local changes.
**Review date:** 2026-08-15 (America/Los_Angeles)
**Owner:** quality-maintainer
**Risk:** `R0` repository and public-metadata inspection plus `R1` local
rendering. No learner, private data, external model call, publication, or
account change occurred.

## Decision

The project is a **well-presented candidate curriculum**, not a popular,
validated, all-LLM product. Its strongest current assets are its bounded
first-use route, careful evidence language, source/skill governance, and a
readable local surface. Its decisive weaknesses are unchanged: no learner
outcomes, no model/Skill execution results, no immutable release, and no
public adoption evidence.

Do not attempt to hide those gaps by adding more Skills, chapters, vendor
names, screenshots, or claims of efficiency. The next high-value evidence is
one authorized pilot and one versioned model run, not a larger catalogue.

## Evidence inspected

| Evidence | Direct observation | Scope limit |
| --- | --- | --- |
| Local structural candidate | `validate_project`, `validate_project_structure`, `validate_content_completeness`, `validate_learning_contract --canonical-en`, Skill registry/routing checks, and local-link checks passed in the current worktree. | Contract and identity consistency only; it is not learner, model, safety, deployment, or adoption evidence. |
| Quality source | `Q-001` and `Q-002` are still open P0 findings; `Q-006`, `Q-007`, `Q-011`, and `Q-013` remain active. | A register is a declared defect state, not a measure of reader harm or prevalence. |
| Live repository metadata | `Prysai/Prysai-LLM-Playbook` was private, had 0 stars, 0 forks, 0 issues, no Homepage, no release, and no Discussions. The latest quality and security workflow runs for `871d484` succeeded. | Private zero-star state is a distribution fact, not a quality score. A successful workflow does not establish release readiness. |
| Local desktop rendering | At a 1280px browser viewport, the home page had no horizontal overflow and made its no-setup and Codex routes visible. | One local rendering, not reader comprehension or public deployment. |
| Local mobile rendering | At a 390px viewport, the home page had no horizontal overflow and the main title, first route, search field, and menu were usable. | One device-size observation, not accessibility certification or task completion. |
| Local Reader rendering | The direct Spanish-practice anchor opened `#six-short-spanish-messages` at the intended target. At desktop size, the inspected teaching board rendered inside the Reader without page overflow. At 390px, the Reader intentionally suppresses dense SVG boards and leaves an adjacent textual thesis plus an “Open full-size visual” link. | The desktop result and the narrow-screen fallback apply to this local candidate only. They do not establish that the full-size link is usable on a phone or that a reader understands the summary. |
| Search observation | Before the content-title repair, the mobile query `Spanish practice` returned 12 broad results and placed the practice pack third. After regenerating the index, it placed **Beginner Practice Pack: Spanish practice, research, and first attempts** first; its visible first section links to Card A1. The result remains document-level, not a heading-level link to the exact six-message block. | One fixed query on one current local index. Better rank does not show that readers choose, complete, or understand the card. |

The local render included uncommitted work. It therefore must not be described
as the public GitHub surface or as a deployed release.

## Adversarial lenses and findings

These are evidence-grounded **lenses**, not the opinions, endorsement, or
review of a university professor, scientist, Microsoft, Meta, Kugou, or any
other named organization or employee. The public-source basis for these lenses
is recorded in [the critical-review source record](../research/critical-review-lenses-public-evidence-2026-08-14.md).

| Severity | Lens | Claim or assumption stressed | Failure path | Status and evidence | Smallest repair and verification |
| --- | --- | --- | --- | --- | --- |
| P0 | University educator / scientist | A structured route teaches a transferable capability. | A novice follows a polished model answer, never makes an unaided attempt, and cannot recover or handle an unseen variation. | **Observed missing evidence.** `Q-001` and `Q-013` record no learner run, transfer result, scorer record, or aggregate. | Run the already commit-bound, consented First Win and newcomer-entry instruments with their declared safeguards; preserve drop-off, help, failures, and independent scorer disagreement. |
| P0 | Evaluation scientist / reliability engineer | A candidate Skill or workflow is more efficient, reliable, or safer. | A fixture or static validator passes while a fresh model run omits a fact, invents authority, or needs more rework than the baseline. | **Observed incomplete evidence.** `Q-002` has one captured, unscored 18-output fictional collection, but its historical prompt-byte binding failed integrity review and makes it ineligible for comparison. No eligible run or independent scorer result exists. | Freeze and verify byte-exact v2 inputs, then use one declared model/surface, 18 prepared fictional packets, two scorer roles, and the manifest-bound analyzer. Report counts and records, not an IQ or general-efficiency claim. |
| P1 | Microsoft/Meta-like platform engineer | “Works with all LLMs” means named platforms work alike. | A learner applies a universal lesson to a product-specific permission, tool, data, or failure model and assumes equivalence. | **Observed boundary.** The local home page itself says the guided scope is transferable core + Codex Practice Track and that Claude Code and Grok are not runnable routes. | Keep that boundary on every entry. Admit one named adapter only after first-party facts, one low-risk run, a failure boundary, an owner, and a review date. |
| P1 | Open-source release maintainer | A green CI run makes the project ready to publish. | A reader cannot cite an immutable version, find a release note, or recover from a bad deployment. | **Observed.** Release readiness remains `not_ready`; no reviewed tag, accepted release evidence, rollback target, or rehearsal exists. | Complete the existing release checklist on an immutable candidate SHA, then separately verify tag, evidence, rollback target, and rehearsal. |
| P1 | International documentation editor | Six language entries mean a beginner can use the same course in six languages. | A non-English reader chooses an entry and reaches a fallback or incomplete translation without a clear alternate path. | **Observed.** `Q-006` remains open; locale records describe a migration route, not six reviewed course editions. | Keep the entry labels and fallbacks explicit; test one language route with a reviewer before promoting translation coverage. |
| P2 | Least-prepared mobile reader | Search reliably lands me on the exact small exercise I want. | A search for “Spanish practice” sends a reader to a broad document and the reader cannot identify the next card. | **Partially remediated locally.** Regenerated search ranked the pack first at 390px, and its first visible route is Card A1. The search result still opens the document top rather than the exact six-message heading, and no user completion result exists. | Have the Reader/search owner add or test heading/card-level result records, then replay this query plus three predefined novice queries at 390px. |
| P2 | Visual-information reviewer | A crisp teaching board automatically teaches its content. | The board looks polished but its smaller in-card text is treated as the only explanation, especially on a narrow display. | **Inferred from local rendering.** The SVG is clean and non-decorative, and its Reader placement has explanatory prose; readability was not tested with users. | Preserve an adjacent textual summary and full-size/alt route. Verify with a small observation that readers can state the four fields without zooming or copying the image. |
| P2 | Least-prepared mobile reader | “Open full-size visual” makes a dense teaching board inspectable on a phone. | The Reader hides the board at 390px; the supplied link opens the raw 1600×900 SVG without a responsive viewer, so the reader initially sees only a cropped portion and must discover browser zoom or horizontal panning. | **Observed locally.** The 390px Reader fallback was deliberate CSS, and the raw SVG destination was not phone-fitted. The adjacent prose preserves the course path, so this is not a claim that the whole route is blocked. | The Reader owner should provide a responsive, zoomable visual view or replace the label with an honest text-summary route. Verify the named board opens fitted, exposes its text alternative, and has no horizontal document overflow at 390px. |

### Narrow visual follow-up — Beginner Practice Loop

After this review, `beginner-practice-loop-red-black.svg` was rebuilt from a
horizontal 1600×900 board into a vertical 900×1400 board. A new local 390px
inspection of the raw SVG showed a 390px-wide rendered asset, no document-level
horizontal overflow, and all four step labels plus the claim-limit panel in the
initial view. The text was deliberately shortened where SVG has no automatic
line wrapping.

This is a repair for **one named board only**. It does not make the other raw
1600×900 visual links phone-fitted, create a zoomable Reader view, establish
that text is comfortable for every reader, or close the general mobile-visual
finding. It is a local visual rendering observation, not learner evidence.

### Narrow visual follow-up — three beginner-route boards

`practice-target-to-first-attempt-red-black.svg`,
`research-question-to-source-record-red-black.svg`, and
`source-check-before-belief-red-black.svg` were rebuilt from their prior wide
boards into original 900×1400 vertical editorial boards. A direct local render
of each at 390×844 on 2026-08-15 showed its heading, four steps, and stop or
claim-limit panel in the initial viewport. The source was then rebuilt into the
temporary Pages artifact before the render check; the first stale-artifact
inspection was not treated as evidence for the new sources.

This supersedes the raw-phone-fit finding for those **three named assets**
only. It does not create a responsive or zoomable Reader view, prove that a
reader opens the link, prove comprehension, or repair the remaining wide raw
SVG destinations named elsewhere in this review.

### Narrow visual follow-up — two universal-core boards

`first-turn-contract-card.svg` and `conversation-safety-card-red-black.svg`
were also rebuilt from prior wide boards into original 900×1500 and 900×1450
vertical editorial boards. After rebuilding the temporary Pages artifact, a
direct local 390×844 render on 2026-08-15 showed every field and the final
claim-limit or stop panel in the initial viewport. The former safety card's
neon accent was removed; its new palette is cream, near-black, white, and red.

This repairs the raw-phone-fit defect for these **two named assets** only. It
does not demonstrate the card is sufficient security guidance, an effective
prompt, a learner-comprehension result, a responsive Reader feature, or a
general solution for the remaining wide raw SVG assets.

### Narrow visual follow-up — request to evidence board

`task-to-evidence-red-black.svg` was rebuilt from a horizontal 1600×900 chain
into an original 900×1400 vertical editorial sequence. The source keeps the
same five evidence decisions—request, scope, action, observation, and claim
limit—while placing the unknown/stop condition in a dedicated final panel.
After rebuilding the temporary site artifact, a direct local 390×844 render
showed the title, all five decisions, and the unknown/stop panel in the initial
viewport with no document-level horizontal overflow.

This source-level repair does not make the Reader itself responsive or
zoomable, prove that a reader finds the card, prove comprehension, or repair
the other horizontal raw SVG destinations.

### Narrow visual follow-up — field signal to safe degradation board

`field-signal-to-safe-degradation-red-black.svg` was rebuilt from an explicit
1600px-wide three-column matrix into a 900×1450 vertical sequence. Its three
field signals, unsupported inferences, safe-move cue, and maintained S43
source boundary stay in the original project asset. After rebuilding the
temporary site artifact, a direct local 390×844 render showed all three
signals, their inference boundary, the safe-move panel, and no document-level
horizontal overflow.

This repair does not turn a public report into a local reproduction, establish
a safety control, or make the Reader's raw-asset handoff responsive.

## What the visual inspection supports—and does not

The red/black/cream teaching boards are original, purposeful diagrams rather
than generic AI art. On the inspected home and Reader routes they reinforce a
decision or a route. That is enough to support a narrow visual-quality
observation. It does **not** show that users understand the diagrams,
distinguish candidate status, find the best route, or retain the method.

The inspection did **not** find a page-overflow defect in the home page or the
two Reader deep links inspected. The Reader intentionally hides dense boards
at 390px rather than shrinking their text beyond usefulness. However, its
“Open full-size visual” destination is a raw 1600×900 SVG rather than a
phone-fitted visual view; this is a separate P2 discovery and inspection
problem. Do not classify either the desktop embed or the raw asset view as
evidence that mobile readers can understand the diagram.

## Skill decision

The project currently has 23 original candidate Skills, including distinct
methods for first-turn checks, learning practice, research, source
investigation, evidence review, interruption recovery, comparison design, and
handoff. Adding another Skill merely to increase the count would worsen the
same discoverability and maintenance problems this review identifies.

No new Skill is admitted by this review. A future Skill must first show a
distinct responsibility that cannot be routed to an existing method, a
source/license boundary, a safe output, negative fixtures, maintenance owner,
and a fresh-task evidence plan.

## Ranked repair agenda

1. **Authorize and run the smallest learner pilot** for `Q-001`/`Q-013`.
   This is the only route from polished candidate to a first observed
   learning/usability result. It needs recruitment, privacy, retention,
   deletion, independent scoring, and an immutable revision decision from the
   named owner.
2. **Authorize a declared model execution surface** for `Q-002`. Run the
   existing frozen fictional packets and preserve every inclusion, exclusion,
   score, and failure. Without a usable versioned surface, no efficiency or
   Skill-effect chart is available.
3. **Improve direct discovery before adding more content.** Treat the
   observed Spanish query as a candidate search defect. Resolve it with
   heading-level discovery or an explicit starter link, then repeat the fixed
   novice-query check on mobile and desktop.
4. **Repair the mobile visual handoff.** Keep the short textual thesis, but
   make the named full-size board phone-fitted and zoomable before calling the
   link an accessible visual alternative. Recheck the exact card at 390px.
5. **Keep the all-LLM ambition honest.** Make the durable core primary; add
   named-platform adapters one at a time under their own source and run gates.
6. **Prepare release operations after, not instead of, outcome evidence.** A
   tag, rollback rehearsal, and release packet will make a candidate
   reproducible; they cannot make untested lessons effective.

## Non-claims and next review

This review does not claim that the project is popular, released, complete,
easy, effective, efficient, secure, accessible, or ready for public beta. It
does not measure a Skill, a model, a learner, the market, or IQ.

Review again after either the first authorized pilot has a de-identified
aggregate or the fixed search-discovery check changes. Until then, the correct
project status remains `candidate`.
