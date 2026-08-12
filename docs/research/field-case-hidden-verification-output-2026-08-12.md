# Field case: `FC-EVIDENCE-01` — Hidden verification output

## Case identity

- `case_id`: `FC-EVIDENCE-01`
- `title`: Hidden verification output
- `problem`: A verification action may appear to finish while the evidence needed for audit is not reviewable.
- `audience`: developers and release reviewers using Codex for verification
- `collected_at`: 2026-08-12
- `owner`: project research maintainers
- `content_status`: `candidate`
- `related_chapters`: Chapter 9
- `related_labs`: Lab 003; Lab 015
- `related_skills`: Evidence Review
- `related_evaluations`: none assigned

## Source record

- `source_type`: `github_issue`
- `source_url`: https://github.com/openai/codex/issues/34951
- `source_title`: False positive cybersecurity filtering hides legitimate software verification output and blocks release auditing
- `source_author_or_publisher`: public `openai/codex` issue author
- `accessed_at`: 2026-08-12
- `source_license_or_usage_boundary`: reference-only public report; short original summary only
- `quotation_policy`: no screenshots, sensitive output, logs, or long quotations copied
- `source_scope`: establishes that one user reported hidden App output; it does not identify the filter, prove every command succeeded, or establish a fix.

## Reported situation

- `user_report_summary`: The reporter says defensive verification commands completed but their visible results were replaced by a content-unavailable message, preventing independent release review.
- `observed_symptom`: Human-readable verification output was reportedly hidden.
- `expected_behavior`: The reporter expected legitimate verification logs to remain reviewable.
- `official_boundary`: OpenAI non-interactive documentation distinguishes command events, errors, file changes, and final output as separate observable records.
- `product_surface`: Desktop
- `product_version`: Codex App `26.715.72359`, as reported
- `operating_system`: macOS `Darwin 25.5.0` arm64, as reported
- `model_or_provider`: not stated
- `network_or_auth_context`: ChatGPT Pro, as reported
- `input_shape`: defensive software-integrity and release-verification tasks
- `risk_level`: `high`

## Claim and evidence table

| Claim | Evidence class | Source or artifact | Date | Scope | Limitation | Status |
|---|---|---|---|---|---|---|
| One user reported that verification output was hidden in the App | `reported` | Issue #34951 | 2026-08-12 | Reported App version and workflows | Not locally reproduced | candidate |
| Execution events and final output can be distinct evidence channels | `official` | OpenAI Non-interactive mode documentation | 2026-08-12 | Documented automation surface | Not a Desktop workaround guarantee | candidate |
| Missing required output leaves the audit claim unverified | `project_inference` | Current review and this case | 2026-08-12 | Evidence discipline | Does not diagnose filtering | candidate |
| A named cybersecurity classifier caused a false positive | `not_observed` | No maintainer explanation | 2026-08-12 | Product root cause | Reporter interpretation only | unverified |

## Reproduction status

- `reproduction_status`: `not_run`
- `reproduction_scope`: no reported content or filter behavior was tested
- `fixed_input_or_fixture`: none
- `logs_or_artifacts`: [current public-state review](codex-field-cases-current-review-2026-08-12.md)
- `independent_reviewer`: pending
- `last_checked_at`: 2026-08-12
- `root_cause_status`: `unknown`

## Smallest safe diagnostic path

| Step | Read-only check or low-risk action | Expected observation | Stop rule |
|---|---|---|---|
| 1 | Split the verification claim into command, target, terminal state, output, artifact, and review rows | Each row has its own evidence status | Stop the audit claim if required output is missing |
| 2 | Preserve already-authorized exit, event, diff, artifact, or hash records | Independent evidence remains inspectable | Do not rerun a consequential or non-idempotent action only to recover display output |
| 3 | Mark hidden or absent evidence explicitly | Handoff states `unverified` and names the gap | Do not evade filters, weaken controls, or expose sensitive output |

- `allowed_actions`: preserve already-authorized non-sensitive evidence and report the gap
- `forbidden_actions`: filter evasion, safety-control weakening, unapproved reruns, or data exfiltration
- `minimal_safe_probe`: claim-to-evidence table with an explicit hidden-output row
- `stop_condition`: a required audit artifact cannot be inspected
- `rollback_or_cleanup`: none for read-only review; follow the original action's recovery plan if a rerun is separately authorized

## Teaching conversion

- `learner_problem`: The learner sees a completion-shaped state but cannot inspect the evidence required for the claim.
- `core_concept`: action completion, exit status, durable artifact, visible output, and reviewer acceptance are different claims.
- `decision_to_teach`: downgrade to `unverified`, or seek a separately authorized evidence channel; preserving honesty costs less than inventing proof.
- `smallest_experiment`: remove one required output artifact from a synthetic verification bundle and require the review to reject the strong claim.
- `intentional_failure`: provide a zero exit code and polished summary without reviewable output.
- `required_artifact`: claim-to-evidence table and missing-evidence note
- `acceptance`: the learner does not call the audit verified.
- `transfer`: apply the rule to CI logs, database migrations, checksums, and browser submissions.
- `forbidden_claims`: confirmed false positive, universal workload impact, definite command success, bypass, or fixed release

## Content placement

- `primary_chapter`: Chapter 9
- `supporting_chapters`: Chapter 13
- `primary_lab`: Lab 015
- `supporting_labs`: Lab 003
- `related_skill`: Evidence Review
- `evaluation_fixture`: pending
- `update_registry_entry`: review when issue state, maintainer response, linked fix, or evidence-surface documentation changes

The case does not change the maturity of any linked chapter, lab, Skill, or evaluation.

## Privacy, permission, and maintenance

- `personal_data_removed`: yes
- `secrets_removed`: yes
- `private_paths_removed`: yes
- `copyrighted_material_boundary`: original summary only; no reported audit output copied
- `asset_register_entry`: public issue reference and project-owned teaching diagram
- `volatile_facts`: issue state, replies, App behavior, and non-interactive event documentation
- `next_review`: before publication or on source change
- `change_trigger`: issue state, maintainer reply, fix link, release note, or documentation change
- `owner`: project research maintainers

## Claim boundary

- `what_can_be_claimed`: a public report demonstrates why hidden evidence must keep a verification claim unverified.
- `what_must_not_be_claimed`: a particular classifier caused the symptom or that another surface recovers it safely.
- `next_smallest_check`: independent review of the claim table, followed by a synthetic missing-output fixture.
- `current_status`: `unverified`
