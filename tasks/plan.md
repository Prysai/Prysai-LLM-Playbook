# Implementation plan: multilingual release hardening

## Overview

Make the candidate Playbook easier to start, safer to trust, and honest about
what has and has not been validated. The release slice is intentionally
vertical: a reader should be able to choose a language, follow one coherent
30–60 minute first path, perform a low-risk task, and inspect the evidence and
limits without being sent through unrelated draft material.

This plan covers the public learning surface and its governance. It does not
claim that six machine-assisted translations are native-reviewed, that labs
have learner evidence, or that the product is ready merely because structural
checks pass.

## Architecture decisions

- Keep English as the canonical source and keep explicit `-EN`, `-ZH`, `-ES`,
  `-JA`, `-KO`, and `-DE` content identities. A locale path must never silently
  substitute another language.
- Treat the first path as a small deterministic route: LLM fundamentals →
  model/tool/agent boundaries → first safe task → first-safe-change fixture →
  Lab 001. Optional labs remain available but are not presented as completed
  learner evidence.
- Preserve research, audit, and run records even when reader-facing draft
  detours are removed. Evidence is not reader copy and must not be deleted to
  make status look better.
- Keep project-owned Skills separate from imported references. Every external
  reference needs a target URL, license/provenance record, and a bounded
  trigger; no Skill is added solely to increase the count.
- Use existing red/black editorial visuals. Fix information hierarchy, labels,
  and responsive behavior before considering new artwork.

## Task list

### Phase 1: Release baseline and license boundary

#### Task 1: Reconcile release status and licensing

**Description:** Compare the public README, license files, source register, and
governance status. Resolve only evidence-backed contradictions and record any
remaining blockers explicitly.

**Acceptance criteria:**

- [ ] `LICENSE`, `LICENSE-CODE`, `docs/sources/licensing.md`, and the asset
      register describe the same content/code boundary.
- [ ] No claim says `verified` or `production-ready` without the named evidence.
- [ ] Release readiness still names tag, evidence, rollback, and maintenance
      blockers when they are absent.

**Verification:** `validate_content_status.py`, `validate_release_readiness.py`,
`validate_project.py`, and `git diff --check`.

**Dependencies:** None

### Phase 2: Six-language first path

#### Task 2: Make every public locale entry purposeful

**Description:** Ensure each supported language has a real entry surface,
same-language navigation, a localized first-path summary, and a clear fallback
when a translation is not independently reviewed.

**Acceptance criteria:**

- [ ] Six locale entries expose the same first-path sequence and language
      identity.
- [ ] English paths contain no reader-facing non-English prose or links.
- [ ] Missing or in-progress translations are labelled rather than silently
      presented as complete.

**Verification:** `audit_locale_release_paths.py`,
`audit_first_path_localization.py`, `validate_site_i18n.py`, local-link checks,
and the real-browser smoke suite at desktop and 390px widths.

**Dependencies:** Task 1

#### Task 3: Audit and tighten the first-path teaching units

**Description:** Review the fundamentals guide, Chapters 1–2, first-safe-change
route, Lab 001, Lab 011, and Communication Clinic in all six locales. Fix only
demonstrable drift: missing objective, impossible prompt, wrong status word,
cross-locale link, unsupported platform claim, repetition, or AI-sounding
filler.

**Acceptance criteria:**

- [ ] Each first-path unit states a problem, action, observable evidence,
      failure/boundary, and acceptance check.
- [ ] Copy-ready prompts include a user goal, context, constraints, and a
      request for uncertainty or evidence; none promise guaranteed outcomes.
- [ ] Terminology and status vocabulary remain consistent across locales.

**Verification:** localized learning-contract and translation-depth audits,
focused content review, and the six-locale browser smoke path.

**Dependencies:** Task 2

### Phase 3: Public draft boundary and capability registry

#### Task 4: Remove reader-facing draft detours

**Description:** Keep draft labs and unrun evidence in governance, but stop
presenting them as the default route or as validated exercises. Make the
optional status visible where a reader can reach the item.

**Acceptance criteria:**

- [ ] Homepage and locale routes lead to candidate first-path material first.
- [ ] Draft/not-run labels remain accurate in source and registry data.
- [ ] Research notes and audit records remain intact and discoverable to
      contributors.

**Verification:** content-status validation, first-path audit, site accessibility
and browser navigation checks.

**Dependencies:** Task 3

#### Task 5: Tighten Skill provenance and routing

**Description:** Audit the Skill registry and selected project-owned Skills for
triggers, exclusions, inputs/outputs, failure handling, and provenance. Add no
new Skill unless it closes a documented beginner or maintainer gap.

**Acceptance criteria:**

- [ ] Every listed Skill has a valid machine contract and quality metadata.
- [ ] Imported references include their target URL and license boundary.
- [ ] Beginner routing explains why a Skill fits and when it should not run.

**Verification:** `validate_skills.py`, the official Skill validator,
`validate_skill_registry.py`, `validate_skill_routing_contract.py`, and a
fresh-context adversarial review.

**Dependencies:** Task 4

### Phase 4: Visual and release evidence

#### Task 6: Perform visual and interaction QA

**Description:** Inspect the homepage, localized entry points, first-path
reader, practice pack, and representative teaching visuals in a real browser.
Prefer layout and hierarchy fixes over generated artwork.

**Acceptance criteria:**

- [ ] No horizontal overflow, dead arrows, random jumps, or console errors at
      desktop and mobile widths.
- [ ] The first action and route purpose are understandable without reading the
      repository.
- [ ] Visual assets use the existing restrained red/black editorial system and
      remain legible on small screens.

**Verification:** `npm run test:browser`, screenshot inspection, and
`validate_site_accessibility.py`.

**Dependencies:** Tasks 2–4

#### Task 7: Build release evidence and a reversible handoff

**Description:** Re-run all relevant validators, generate commit-bound release
evidence, and document the exact remaining blockers. Do not create a release
tag or claim readiness until the evidence and rollback target exist.

**Acceptance criteria:**

- [ ] Local validators and browser checks pass or their failures are recorded.
- [ ] The evidence packet names the exact commit, checks, blind spots, and
      rollback boundary.
- [ ] A release candidate can be reverted to a known commit without deleting
      user data or pretending that unrun labs are verified.

**Verification:** full project test suite, `validate_release_readiness.py`,
`build_release_evidence.py --check`, remote workflow status, and a final
critical review.

**Dependencies:** Tasks 1–6

## Checkpoints

### Checkpoint A: Baseline

- [ ] License/status boundary is internally consistent.
- [ ] The working tree is clean before the first content slice.

### Checkpoint B: First path

- [ ] Six locales expose the same purpose and sequence.
- [ ] The first path works in a real browser at 390px and desktop widths.

### Checkpoint C: Release handoff

- [ ] Draft and not-run evidence remains honest and out of the default route.
- [ ] All required checks and remote workflow results are reported separately.

## Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Treating file presence as translation quality | High | Keep translation status and independent review evidence separate |
| Removing draft records to improve appearance | High | Hide reader detours while retaining governance and audit records |
| Expanding Skills faster than they can be tested | Medium | Require a documented gap, contract, provenance, and focused cases |
| Replacing editorial visuals with generic AI art | Medium | Fix hierarchy and responsive layout first; reuse owned SVG assets |
| Calling public reach a product result | High | Report stars, Pages, CI, learning evidence, and release readiness separately |

## Open questions

- Which locale(s), if any, have a named independent language reviewer and a
  review date? Until recorded, those translations remain candidate/in-progress.
- Who owns the rollback target and maintenance review after the first public
  release?
- Which two or three first-path labs will receive real learner runs before the
  status can move beyond candidate?
