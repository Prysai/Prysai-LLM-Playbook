# Field case: `FC-NETWORK-01` — A blocked request does not widen authority

## Start here: keep the boundary

A blocked request means that the current path cannot proceed. It does **not**
mean that unrestricted network access, a proxy, or a broader permission is now
allowed.

Before touching a setting, write down three things:

1. The one external result the task needs, without adding a real endpoint or a secret.
2. The person who can approve a minimum exception, or the approved offline artifact that could replace it.
3. The smallest non-sensitive probe and the evidence you would keep if that exception were approved.

If any of those is unknown, stop and ask for a narrower decision. This page is
an offline decision aid, not a configuration guide: it makes no network
request, teaches no proxy setting, and records no live product behavior.

## Case identity

- `case_id`: `FC-NETWORK-01`
- `title`: A blocked request does not widen authority
- `problem`: A network request is blocked, and a user must decide whether to seek a narrow, reviewable exception or to broaden access without evidence.
- `audience`: beginners and reviewers using a tool-enabled coding environment
- `collected_at`: 2026-08-14
- `owner`: research-maintainer
- `content_status`: `candidate`
- `related_chapters`: Chapter 4; Chapter 9; Chapter 13
- `related_labs`: Lab 001; Lab 007; Lab 016
- `related_skills`: Task Protocol; Evidence Review
- `related_evaluations`: none assigned

## Source record

- `source_type`: `forum`
- `source_url`: https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox
- `source_title`: A public question about outbound access from a sandboxed Codex CLI session
- `source_author_or_publisher`: public Stack Overflow contributor
- `accessed_at`: 2026-08-10, as recorded in [the forum research set](field-problems-forums-2026-08-10.md)
- `source_license_or_usage_boundary`: reference-only public report; this case uses an original summary and a fictional offline fixture
- `quotation_policy`: no post prose, configuration fragments, logs, credentials, URLs from a real environment, or workaround commands are copied
- `source_scope`: the question establishes that one author described a blocked outbound request in one stated environment. It does not establish current configuration syntax, an official product boundary, a safe workaround, a root cause, or behavior in another account, version, network, or tool.

## Reported situation

- `user_report_summary`: A public question author described trying to keep a sandbox while allowing a command to reach a needed public host. The reported request was blocked before the author could complete the task.
- `observed_symptom`: The author reported a proxy or allowlist-style outbound block.
- `expected_behavior`: The author expected a narrowly configured network path to coexist with a sandbox.
- `official_boundary`: `unknown` in this case. No current configuration syntax or support guarantee is taught here.
- `product_surface`: CLI, as reported
- `product_version`: not recorded as a verified fact in this case
- `operating_system`: not recorded as a verified fact in this case
- `model_or_provider`: not relevant to the teaching decision
- `network_or_auth_context`: a restricted outbound path was reported; no account, proxy, or credential was inspected
- `input_shape`: one required public host for a task, with the actual host intentionally omitted
- `risk_level`: `high` if a real task would broaden network access, expose project context, or add a proxy

## Claim and evidence table

| Claim | Evidence class | Source or artifact | Date | Scope | Limitation | Status |
|---|---|---|---|---|---|---|
| One public author reported a blocked outbound request while using a sandboxed Codex CLI session | `reported` | [Stack Overflow question #79970154](https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox) | 2026-08-10 | One reported environment | A question is not a reproduction, diagnosis, or support guarantee | candidate |
| The report contains a current, safe configuration recipe | `not_observed` | No configuration was copied, tested, or independently reviewed | 2026-08-14 | Product configuration and deployment | Deliberately outside this case | unverified |
| A blocked request authorizes unrestricted network access or a proxy change | `not_observed` | No owner authorization or live task was supplied | 2026-08-14 | Authority to change network policy | A blocked request is evidence of a limit, not permission to remove it | unverified |
| A request should remain blocked until its target, reason, minimum scope, and safe probe are reviewable | `project_inference` | This case; Chapter 13; Labs 007 and 016 | 2026-08-14 | Conservative teaching rule for external side effects | Does not define vendor configuration or guarantee a safe exception | candidate |

## Reproduction status

- `reproduction_status`: `not_run`
- `reproduction_scope`: This project did not invoke a network request, inspect a live sandbox, change a proxy, add an allowlist, or use an account.
- `fixed_input_or_fixture`: The original offline record under **Teaching conversion**.
- `logs_or_artifacts`: a completed boundary card and a short decision receipt, if an authorized learner run is later approved
- `independent_reviewer`: pending
- `last_checked_at`: 2026-08-14
- `root_cause_status`: `unknown`

## Smallest safe diagnostic path

| Step | Read-only check or low-risk action | Expected observation | Stop rule |
|---|---|---|---|
| 1 | Write the required result, named host category, allowed action, evidence, and stop condition from a local fixture. | The requested effect is distinguishable from the task goal. | Stop if the host, reason, owner, data class, or external effect is unknown. |
| 2 | Record the synthetic block as `reported` and list the missing facts: active policy, exact target, narrow scope, and safe probe. | The error-shaped record remains evidence of a limit, not a diagnosis. | Do not infer a configuration change, a product defect, or a successful workaround. |
| 3 | Prepare a decision request for the owner: why the host is needed, the smallest non-sensitive probe, the evidence to preserve, and the rollback path. | A reviewer can approve, reject, or narrow the proposed exception. | Stop before a live request, proxy change, policy edit, install, upload, or credential use. |

- `allowed_actions`: read the fictional record, classify evidence, write a local decision request, and identify a fallback
- `forbidden_actions`: making a network request, editing network policy, adding a proxy, exposing a secret, installing a dependency, changing permissions, committing, pushing, publishing, or using an account
- `minimal_safe_probe`: a four-line boundary card plus one approval request that names a minimum host scope and a non-sensitive test
- `stop_condition`: any missing owner decision, data classification, destination, evidence plan, or rollback path
- `rollback_or_cleanup`: delete the local scratch receipt if it contains no useful decision record; the fictional fixture is unchanged

## Teaching conversion

- `learner_problem`: A task needs an external input, but the first attempted request is blocked and the learner is tempted to remove the limit.
- `core_concept`: A technical limit, a task need, and authority to change the limit are separate facts. An error does not grant a new permission.
- `decision_to_teach`: either (a) pause and request a smallest reviewable exception, or (b) use an approved offline artifact or postpone the task. The first option may take longer; the second may leave the task incomplete. Both are more honest than silently widening access.
- `smallest_experiment`: Work only from this offline record:

  ```text
  Task: verify a checksum that has not yet been downloaded.
  Local record: the request for the required public host was blocked.
  Proposed next action: enable unrestricted network access and retry.
  ```

  Write this bounded receipt shape without making a request:

  ```text
  observed: a block is recorded in the fixture
  known need: one named public host is required for the checksum task
  missing evidence: effective policy, owner approval, narrow probe, and rollback
  decision: blocked — request a minimum exception or an approved offline artifact
  external actions: not_run
  ```

- `intentional_failure`: Treat the block as permission to enable unrestricted network access, claim that a proxy is safe without review, or say the checksum was verified without an inspectable artifact.
- `required_artifact`: the completed receipt, one sentence separating the task goal from the authority request, and one safe fallback
- `acceptance`: The receipt records the block without diagnosing it; it names the required host only as a category; it refuses the unrestricted proposal; it names an owner decision or offline fallback; and it records `external actions: not_run`.
- `transfer`: Apply the same boundary to a package download, research API, webhook, or browser submission. The invariant is that an unmet technical need does not create authority; the material change is the target and its minimum safe probe.
- `forbidden_claims`: a current Codex configuration, an official network policy, a product defect, a secure proxy, a successful request, a local reproduction, learner competence, safety effectiveness, transfer success, or production readiness

## Content placement

- `primary_chapter`: [Chapter 13 — Action boundaries](../../book/chapters/13-action-boundaries-EN.md)
- `supporting_chapters`: [Chapter 4 — Context, permissions, and the Agent action boundary](../../book/chapters/04-context-permissions-and-agent-EN.md); [Chapter 9 — Verification, doubt, and recovery](../../book/chapters/09-verification-and-recovery-EN.md)
- `primary_lab`: [Lab 016 — Side-effect boundary](../../book/labs/lab-016-side-effect-boundary-EN.md)
- `supporting_labs`: [Lab 001 — First safe task](../../book/labs/lab-001-first-safe-task-EN.md); [Lab 007 — Action boundaries](../../book/labs/lab-007-action-boundaries-EN.md)
- `related_skill`: [Task Protocol](../../skills/prysai-task-protocol/SKILL.md); [Evidence Review](../../skills/prysai-evidence-review/SKILL.md)
- `evaluation_fixture`: none assigned
- `update_registry_entry`: review when the public source changes, an official policy source is admitted, or a live network run is proposed

The case makes an older field signal searchable and gives it a safe teaching shape. It does not change the maturity of any linked chapter, lab, Skill, or evaluation.

## Privacy, permission, and maintenance

- `personal_data_removed`: yes; the exercise is fictional and no source identity or real endpoint is reused
- `secrets_removed`: yes; no credential, proxy, token, account, project path, or real URL is used
- `private_paths_removed`: yes
- `copyrighted_material_boundary`: original summary and original fixture only; no post prose, configuration, or answer is copied
- `asset_register_entry`: S88 in `docs/sources/asset-register.md`
- `volatile_facts`: source state, product configuration, policy defaults, proxy behavior, and product support
- `next_review`: 2026-09-14, or before a configuration, safety, runtime, or publication claim
- `change_trigger`: source change, official documentation admission, proposed live exercise, or a request to add a configuration example
- `owner`: research-maintainer

## Claim boundary

- `what_can_be_claimed`: One older public report is now represented as a bounded case with source type, symptom, evidence classes, reproduction status, a low-risk diagnostic path, and a stop condition.
- `what_must_not_be_claimed`: The report is current or reproducible; its root cause is known; unrestricted access is necessary or safe; any product supports a particular configuration; the fixture proves a safety control; or a learner completed the decision.
- `next_smallest_check`: An independently reviewed, consented run of the fixed offline record. It must collect no network traffic, credential, account, project, proxy, or personal data.
- `current_status`: `candidate`
