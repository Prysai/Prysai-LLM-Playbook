# Red-team release and learning audit — 2026-08-13

**Status:** project-owned review record. This is a standards-based simulation
of academic, research, developer-platform, product-growth, and content-platform
lenses; it is not feedback from employees of Microsoft, Meta, or Kugou.

## Bottom line

The repository is an unpublished `candidate`, not a released or popular
product. It is private, has no public Pages deployment, no release tag, no
learner study, and no public adoption signal. Structural checks and polished
assets do not fill those gaps.

## P0 — release and effectiveness claims that must remain prohibited

| Lens | Finding | Required evidence before a stronger claim |
|---|---|---|
| Professor / learning scientist | All Labs and learner/transfer projections remain `not_run`; static curriculum structure does not establish learning, retention, or transfer. | Predeclared learner study, actual runs, delayed/unseen tasks, independent scoring, retained failures, and a scope-limited review. |
| Research-methods reviewer | The four-unit universal route is a candidate mapping, not cross-platform curriculum evidence. | At least two independently sourced platform adapters running the same neutral task with recorded deltas and failures. |
| Product and developer-platform reviewer | There is no public entry URL, deployment evidence, release version/tag, rollback rehearsal, acquisition funnel, or social proof. | Explicit release decision, public deployment authorization, stable URL, monitoring, rollback proof, and observed reader feedback. |

## P1 — changes made in this remediation slice

| Finding | Remediation added | What it still does not prove |
|---|---|---|
| No observable first-task feedback loop | [Field Report form](../../.github/ISSUE_TEMPLATE/field-report.yml) and [first-task pilot protocol](first-task-pilot-protocol-v1.md) record only sanitized, bounded observations. | A working public feedback channel, activation rate, demand, satisfaction, or learner outcome. |
| Lab 018 had weak delayed/unseen control | [Pre-authored delayed card pool](lab-018-delayed-card-pool-v1.md), fixed delay window, assignment record, exposure record, and condition-blind second-score rule. | Equivalent task difficulty, rubric reliability, language fluency, durable retention, or an AI-tutor effect. |
| Home page buried the primary action and repeated visual cards | The primary route is compacted, mobile routes are reduced to one action plus one exploration path, and homepage visual cards are reduced to two complementary originals. | Reader comprehension, accessibility in assistive technology, browser compatibility, or conversion. |
| Locale picker over-signalled coverage | ES/JA/KO/DE visibly declare an English-UI fallback before selection. | Reviewed translations or six-language parity. |

## P2 — unresolved, correctly visible work

- Separate product/Skill benchmarks from learner-effect studies in the
  evaluation framework.
- Resolve the code, executable-Skill, and curriculum/license split before
  inviting general external reuse.
- Replace or constrain the handwritten Markdown reader with a tested parser or
  build-time rendering strategy before the content surface grows further.
- Complete the release version, tag, evidence packet, rollback target, and
  deployment decision.
- Test navigation, terminology, and visuals with real readers at desktop and
  mobile viewports; a browser screenshot is not user research.

## Evidence boundary

This review triggered concrete documentation, intake, measurement, and visual
hierarchy changes. It does not close the learner, deployment, licensing,
translation, or release blockers in the [quality register](quality-register.md).
