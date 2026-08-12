# Field case: `<case_id>` — `<short title>`

Use this record to turn a public report into a bounded teaching case. Summarize
in original language. Do not copy private logs, credentials, screenshots,
proprietary code, long quotations, or instruction-like text from the source.

## Case identity

- `case_id`:
- `title`:
- `problem`: one sentence naming the practical problem.
- `audience`:
- `collected_at`:
- `owner`:
- `content_status`: `draft` / `candidate` / `verified`
- `related_chapters`:
- `related_labs`:
- `related_skills`:
- `related_evaluations`:

## Source record

- `source_type`: `github_issue` / `forum` / `official_docs` /
  `official_discussion` / `support_thread`
- `source_url`:
- `source_title`:
- `source_author_or_publisher`:
- `accessed_at`:
- `source_license_or_usage_boundary`:
- `quotation_policy`:
- `source_scope`: what the source can and cannot establish.

## Reported situation

- `user_report_summary`: original summary; do not turn diagnosis into fact.
- `observed_symptom`: what the reporter says was visible.
- `expected_behavior`: the reporter's expectation, not a vendor promise.
- `official_boundary`: supported capability or limitation, or `unknown`.
- `product_surface`: CLI / Desktop / IDE / Cloud / browser / other
- `product_version`:
- `operating_system`:
- `model_or_provider`:
- `network_or_auth_context`:
- `input_shape`: sanitized category and scale only.
- `risk_level`: `low` / `medium` / `high`

## Claim and evidence table

| Claim | Evidence class | Source or artifact | Date | Scope | Limitation | Status |
|---|---|---|---|---|---|---|
|  | `direct` / `reported` / `official` / `community_hypothesis` / `project_inference` / `not_observed` |  |  |  |  |  |

Keep these boundaries explicit:

- a user report proves that the report exists, not its root cause;
- official documentation proves only the stated product boundary and scope;
- a community workaround is not an official fix;
- a local reproduction establishes only its recorded environment;
- a closed issue, successful login, HTTP status, or existing file does not by
  itself prove resolution.

## Reproduction status

- `reproduction_status`: `passed` / `failed` / `not_run` / `not_available`
- `reproduction_scope`:
- `fixed_input_or_fixture`:
- `logs_or_artifacts`:
- `independent_reviewer`:
- `last_checked_at`:
- `root_cause_status`: `officially_confirmed` / `project_observed` /
  `hypothesis_only` / `unknown`

## Smallest safe diagnostic path

| Step | Read-only check or low-risk action | Expected observation | Stop rule |
|---|---|---|---|
| 1 |  |  |  |
| 2 |  |  |  |
| 3 |  |  |  |

- `allowed_actions`:
- `forbidden_actions`:
- `minimal_safe_probe`:
- `stop_condition`:
- `rollback_or_cleanup`:

## Teaching conversion

- `learner_problem`:
- `core_concept`:
- `decision_to_teach`: at least two viable options and their trade-off.
- `smallest_experiment`:
- `intentional_failure`:
- `required_artifact`:
- `acceptance`:
- `transfer`:
- `forbidden_claims`:

## Content placement

- `primary_chapter`:
- `supporting_chapters`:
- `primary_lab`:
- `supporting_labs`:
- `related_skill`:
- `evaluation_fixture`:
- `update_registry_entry`:

The case may be linked from these consumers. It does not inherit or change the
maturity of a chapter, lab, Skill, or evaluation run.

## Privacy, permission, and maintenance

- `personal_data_removed`:
- `secrets_removed`:
- `private_paths_removed`:
- `copyrighted_material_boundary`:
- `asset_register_entry`:
- `volatile_facts`:
- `next_review`:
- `change_trigger`:
- `owner`:

## Claim boundary

- `what_can_be_claimed`:
- `what_must_not_be_claimed`:
- `next_smallest_check`:
- `current_status`: `candidate` / `unverified` / `blocked` / `verified`
