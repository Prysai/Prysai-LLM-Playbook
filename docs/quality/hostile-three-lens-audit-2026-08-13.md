# Hostile three-lens audit — 2026-08-13

**Snapshot:** `d8dc26a01e944498fc4a9369adcbc9907ab11180` (`main`)
**Scope:** read-only review of the repository's learning product, rendered
reader, Skills, evaluation records, and release boundary.
**Status:** audit record only. It does not alter the project's `candidate`
status, quality register, or release decision.

## Bottom line

The project has a strong structural curriculum and a coherent local reading
surface. Its decisive weaknesses are empirical, not editorial: no learner has
completed a recorded Lab, the 39 evaluation fixtures have no scored executions,
and the first public learning outcome has not been observed. It must therefore
remain a private, unreleased candidate—not a validated course, public beta, or
cross-platform product.

## Evidence-backed gaps

| Severity | Lens | Gap and evidence | Consequence |
| --- | --- | --- | --- |
| **P0** | University educator / scientist | All 18 Labs are `draft`; their learner and transfer projections are `not_run`. The controlled First Win protocol has no recruitment, run, score, or aggregate. See `docs/governance/content-status.yaml`, `docs/quality/first-win-pilot-protocol-v2.md`, and Q-001/Q-013 in `docs/quality/quality-register.md`. | The 22-chapter path can be called structured, but not understandable, teachable, retained, or transferable. A screenshot and a compliant chapter contract do not resolve this. |
| **P0** | University educator / scientist; platform engineer | The 39 evaluation fixtures are `not_run / static_structure_only`; `evals/results/` contains no execution result. Q-002 remains open. | The project has no measured basis for claims about model/workflow behavior, Skill routing, or comparative reliability. Do not replace this with prose, more fixtures, or a model ranking. |
| **P1** | Microsoft/Meta-like reliability engineer | `docs/governance/release-readiness.yaml` is `not_ready`: version, changelog, reviewed immutable tag, accepted release evidence, rollback target, and rehearsal are absent. The repository is private, has no Homepage or topics, no release/tag, and no public Pages deployment. | A green quality workflow proves its declared checks for one commit; it is not a release or deployment signal. The intentionally failing gate on run `31743415896` recorded that `not_ready` decision; the audit snapshot's exact-HEAD run [31745393208](https://github.com/Prysai/Codex-Field-Guide/actions/runs/31745393208) passed its declared candidate checks. |
| **P1** | Consumer learning-product operator | No observed reader can be shown to find the First Win, complete it unaided, notice a source-fidelity error, use the rescue path, or return for transfer. The 15-minute label is explicitly an unmeasured target. The homepage is locally rendered and readable at 1280px and 390px, but that is not activation or comprehension evidence. | The current funnel is a well-designed hypothesis, not a product funnel. Feedback intake is authorised-pilot-only and private; it is not public support, demand, or adoption evidence. |
| **P1** | Platform engineer; educator | The new Codex/Claude Code/Grok Build research deliberately says it creates no reader-facing adapter, run, or equivalence claim. The 12 project Skills pass structural checks, but their fresh-task evidence is partial or pending. See `docs/research/cross-platform-coding-agent-invariants-2026-08-13.md` and the Skill entries in `content-status.yaml`. | Do not market this as a complete all-LLM course, add vendor adapters, or add more Skills to imply capability. Each adapter and Skill needs a narrow, observable, platform-specific run before it earns stronger placement. |

## What must not change in response to this audit

- Do not promote `candidate`, `draft`, or `not_run` to `verified`,
  `production-ready`, “released,” or “public beta.”
- Do not add chapters, Skills, platform adapters, testimonials, popularity
  claims, or a larger visual redesign to compensate for missing run evidence.
- Do not erase the evidence boundaries on the First Win, Skills, research, or
  multilingual routes. The explicit limits are currently a strength.
- Do not enable Pages, make the repository public, create a release, or invite
  a general cohort as an incidental follow-up to a documentation change. Each
  is a separate authorization and operational decision.

## One highest-value next vertical slice

**Run the existing commit-bound First Win pilot once with 5–8 authorised
experienced-beginner readers; change no reader-facing content first.**

Use the fixed v2 protocol: record the unaided baseline, First Win judgment,
seeded recovery, immediate unseen transfer, 48–72-hour delayed transfer, help,
drop-off, and two independent scorer columns. Publish only the de-identified
aggregate and instrument findings. Treat the round as instrument debugging—not
proof that the course works—and keep Q-001/Q-002 open unless their separate
closure evidence is met.

This is the smallest slice that tests the primary promise rather than expanding
the catalogue. It requires an explicit owner decision on recruitment, privacy,
retention, deletion, scorer, and immutable candidate revision; this audit does
not authorize those external actions.

## Inspection record

### Repository and governance

- `AGENTS.md`; `CONTEXT.md`; `docs/charter.md`; `docs/book-architecture.md`
- `README.md`; `README-EN.md`; `CONTRIBUTING.md`; `docs/project-map-EN.md`
- `docs/governance/content-status.yaml`; `docs/governance/quality-register.yaml`; `docs/quality/quality-register.md`
- `docs/governance/release-readiness.yaml`; `docs/governance/release-evidence.yaml`; `docs/governance/learning-path.yaml`; `docs/governance/skill-registry.yaml`
- `docs/quality/first-win-pilot-protocol-v2.md`; `docs/quality/public-beta-feedback-contract-v1.md`; `.github/ISSUE_TEMPLATE/field-report.yml`
- `docs/research/cross-platform-coding-agent-invariants-2026-08-13.md`

### Curriculum, Skills, evaluation, and reader

- Every canonical chapter: `book/chapters/01-gpt-and-codex-EN.md` through `book/chapters/22-continuous-update-and-future-proofing-EN.md`; `book/table-of-contents-EN.md`
- Every English Lab: `book/labs/lab-001-first-safe-task-EN.md` through `book/labs/lab-018-language-transfer-EN.md`; `book/labs/README-EN.md`
- Every project-owned Skill: `skills/prysai-{codex-coach,communication-failure-triage,evidence-review,field-signal-curator,learning-coach,platform-adapter-review,product-context,research-router,skill-selector,source-investigator,task-protocol,workflow-orchestrator}/SKILL.md`; `skills/README.md`
- `evals/task-set-v1.yaml`; `evals/README.md`; `evals/results/README.md`
- `site/index.html`; `site/styles.css`; `site/app.js`; `site/reader.html`; `site/reader.js`; `site/reader.css`; `site/README.md`

### Direct checks performed

- Local structural checks passed: `validate_project`, `validate_project_structure`, `validate_content_completeness`, `validate_learning_contract --canonical-en`, `validate_site_i18n`, `validate_site_accessibility`, `validate_release_readiness`, `build_quality_register --check`, `build_pages_artifact --check`, and `check_local_links` (`2054` targets).
- The GitHub-template validator required PyYAML, which was temporarily installed outside the repository; its validator and fixture tests then passed.
- Local Chromium inspection rendered the homepage and Chapter 1 reader at 1280px and 390px without horizontal overflow or console warnings/errors. This observation is limited to that local browser and those routes.
- Remote metadata was inspected with `gh repo view` on 2026-08-13: private repository, zero Stars/Forks/Issues, no Homepage/topics, Discussions disabled, no tags or releases. Workflow runs were inspected at the exact commit SHA.

## Boundary

This audit uses “P0” and “P1” as prioritization labels for this review. It does
not edit, supersede, resolve, or add items to the generated quality register.
