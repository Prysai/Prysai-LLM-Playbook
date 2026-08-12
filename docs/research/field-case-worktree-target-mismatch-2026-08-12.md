# Field case: `FC-WORKTREE-01` — Worktree target mismatch

## Case identity

- `case_id`: `FC-WORKTREE-01`
- `title`: Worktree target mismatch
- `problem`: A visible Worktree state may disagree with the effective checkout that receives commands and edits.
- `audience`: Codex users choosing or handing off between Local and Worktree environments
- `collected_at`: 2026-08-12
- `owner`: project research maintainers
- `content_status`: `candidate`
- `related_chapters`: Chapter 5; Chapter 13
- `related_labs`: Lab 014
- `related_skills`: Task Protocol; Evidence Review
- `related_evaluations`: none assigned

## Source record

- `source_type`: `github_issue`
- `source_url`: https://github.com/openai/codex/issues/34352
- `source_title`: “Continue in worktree” creates a worktree, but Codex keeps working in the original checkout
- `source_author_or_publisher`: public `openai/codex` issue author
- `accessed_at`: 2026-08-12
- `source_license_or_usage_boundary`: reference-only public report; metadata and short original summary only
- `quotation_policy`: no screenshots, private paths, logs, or long quotations copied
- `source_scope`: establishes that one user reported a cross-surface target mismatch; it does not establish root cause, prevalence, or a fix.

## Reported situation

- `user_report_summary`: After a Local-to-Worktree handoff, the reporter says the thread indicator and IDE action referenced the worktree while copied path, environment label, shell directory, writable root, and Git actions still referenced the original checkout.
- `observed_symptom`: Different UI and runtime signals reportedly named different checkouts.
- `expected_behavior`: The reporter expected every execution and review surface to use the new worktree.
- `official_boundary`: OpenAI documentation describes a worktree as a separate checkout and Handoff as moving chat and code between Local and Worktree.
- `product_surface`: Desktop
- `product_version`: Codex App `26.715.52143`, as reported
- `operating_system`: macOS `Darwin 25.5.0` arm64, as reported
- `model_or_provider`: not stated
- `network_or_auth_context`: ChatGPT Pro, as reported; not material to the diagnostic
- `input_shape`: one repository and one Local-to-Worktree transition
- `risk_level`: `high`

## Claim and evidence table

| Claim | Evidence class | Source or artifact | Date | Scope | Limitation | Status |
|---|---|---|---|---|---|---|
| One user reported that Worktree UI signals and the effective Agent checkout disagreed | `reported` | Issue #34352 | 2026-08-12 | Reported App version and macOS environment | Not locally reproduced | candidate |
| Local and Worktree are distinct checkouts | `official` | OpenAI Worktrees documentation | 2026-08-12 | Documented product concept | Does not diagnose the issue | candidate |
| Target identity should be checked before the first write | `project_inference` | Current review and this case | 2026-08-12 | Low-risk teaching rule | Not an OpenAI product statement | candidate |
| The runtime failed to rebind atomically | `not_observed` | No maintainer RCA or local trace | 2026-08-12 | Implementation root cause | Reporter inference only | unverified |

## Reproduction status

- `reproduction_status`: `not_run`
- `reproduction_scope`: no Codex App worktree transition was run by this project
- `fixed_input_or_fixture`: none
- `logs_or_artifacts`: [current public-state review](codex-field-cases-current-review-2026-08-12.md)
- `independent_reviewer`: pending
- `last_checked_at`: 2026-08-12
- `root_cause_status`: `unknown`

## Smallest safe diagnostic path

| Step | Read-only check or low-risk action | Expected observation | Stop rule |
|---|---|---|---|
| 1 | Record the intended checkout, visible environment label, copied path, and shell `cwd` | All signals name one checkout | Stop writes if any signal differs |
| 2 | Read Git top-level, worktree list, branch/HEAD, and writable roots | Git and write boundaries match the intended checkout | Stop branch, edit, build, and test actions on mismatch |
| 3 | Preserve `git status --short --branch` and current diff for each explicitly identified checkout | Existing state is reviewable without repair | Do not reset, clean, copy, or delete a worktree to force consistency |

- `allowed_actions`: read paths, Git metadata, status, and diff
- `forbidden_actions`: edit, branch mutation, reset, clean, worktree deletion, or copying changes before target resolution
- `minimal_safe_probe`: compare `cwd`, Git top-level, worktree list, branch/HEAD, and writable root
- `stop_condition`: any effective target differs from the intended checkout
- `rollback_or_cleanup`: none; the diagnostic is read-only

## Teaching conversion

- `learner_problem`: The interface says Worktree, but the learner cannot prove where the next edit will land.
- `core_concept`: UI state, process state, Git state, and write scope are separate claims.
- `decision_to_teach`: continue immediately for speed, or pause for a read-only target check; the pause costs seconds and prevents editing the wrong checkout.
- `smallest_experiment`: in a disposable repository with two known worktrees, compare the target card before a harmless temporary-file write.
- `intentional_failure`: make one recorded path point to the original checkout and require the learner to stop.
- `required_artifact`: target identity card plus before/after Git status
- `acceptance`: the learner refuses to write until every target signal agrees.
- `transfer`: apply the same check to IDE roots, deployment directories, and remote branches.
- `forbidden_claims`: official root cause, prevalence, fixed version, or successful local reproduction

## Content placement

- `primary_chapter`: Chapter 5
- `supporting_chapters`: Chapter 13
- `primary_lab`: Lab 014
- `supporting_labs`: none
- `related_skill`: Task Protocol
- `evaluation_fixture`: pending
- `update_registry_entry`: review when issue state, maintainer response, linked fix, or Worktrees documentation changes

The case does not change the maturity of any linked chapter, lab, Skill, or evaluation.

## Privacy, permission, and maintenance

- `personal_data_removed`: yes
- `secrets_removed`: yes
- `private_paths_removed`: yes
- `copyrighted_material_boundary`: original summary only; no issue screenshot or long prose copied
- `asset_register_entry`: public issue reference and project-owned teaching diagram
- `volatile_facts`: issue state, labels, replies, App behavior, and official documentation
- `next_review`: before publication or on source change
- `change_trigger`: issue state, maintainer reply, fix link, release note, or documentation change
- `owner`: project research maintainers

## Claim boundary

- `what_can_be_claimed`: a public report exposes why effective target identity must be verified before mutation.
- `what_must_not_be_claimed`: Codex has a confirmed atomic-state bug or that a particular recovery fixes it.
- `next_smallest_check`: independent read-only target-card review, then a disposable fixture run.
- `current_status`: `unverified`
