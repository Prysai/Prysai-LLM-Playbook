# Field case: A created sub-agent is not a task receipt

## Start here: name the missing checkpoint

Seeing a sub-agent appear in a task list is not the same as knowing that it
received the work. Before delegating a real task, keep these checkpoints
separate:

1. the handoff request was created;
2. the receiving agent was started or woken;
3. the receiving agent can show the harmless task receipt;
4. the receiving agent completed the stated action; and
5. the parent received a result that can be checked.

Only the third checkpoint establishes delivery. If it is absent, mark the
handoff `blocked`, stop sending real work through that route, and use a
single-agent or human handoff instead. This page is an offline decision aid:
it does not create an agent, send a message, inspect a session, or diagnose a
product.

![Five handoff checkpoints: created, started, receipt, execution, and returned result. Receipt is the delivery gate.](../../assets/teaching/agent-handoff-receipt-checkpoints-red-black.svg)

## Case identity

- `case_id`: `FC-HANDOFF-01`
- `title`: A created sub-agent is not a task receipt
- `problem`: A parent workflow appears to create a sub-agent, but the task body may not be observable at the receiving end.
- `audience`: beginners and reviewers using multi-step, tool-enabled coding environments
- `collected_at`: 2026-08-14
- `owner`: research-maintainer
- `content_status`: `candidate`
- `related_chapters`: Chapter 10; Chapter 12
- `related_labs`: Lab 013
- `related_skills`: Task Protocol; Evidence Review
- `related_evaluations`: none assigned

## Source record

- `source_type`: `github_issue`
- `source_url`: https://github.com/openai/codex/issues/37822
- `source_title`: A public report that an agent handoff showed creation but no visible task receipt
- `source_author_or_publisher`: public GitHub reporter
- `accessed_at`: 2026-08-14
- `source_license_or_usage_boundary`: reference-only public report; this case uses an original summary and a fictional offline fixture
- `quotation_policy`: no issue prose, command, log, screenshot, attachment, account, project path, provider setting, or reproduction archive is copied
- `source_scope`: the issue metadata showed an open public report when accessed. The report can establish what one author described and expected in stated environments. It cannot establish a root cause, current product behavior, prevalence, a supported workaround, or behavior in another account, version, provider, workflow, or platform.

## Reported situation

- `user_report_summary`: A public reporter described a parent-to-sub-agent handoff where the child appeared to start but replied as if it had no assignment. The reporter described the symptom across more than one named work surface and setting.
- `observed_symptom`: The reported child task was visible or active, while the reported child response did not demonstrate receipt of the intended task text.
- `expected_behavior`: The reporter expected a child to receive and act on the parent’s supplied task message.
- `official_boundary`: `unknown`. This case does not teach product internals, current capability support, configuration, or a fix.
- `product_surface`: Desktop and CLI were reported; neither is reproduced here.
- `product_version`: versions and settings were reported in the source but are not independently verified facts in this case.
- `operating_system`: a platform was reported by the source author; this project did not inspect one.
- `model_or_provider`: a custom-provider context was reported; this project makes no provider comparison.
- `network_or_auth_context`: not inspected; no account, credential, provider, or connection was used.
- `input_shape`: a fictional fixed-phrase receipt check only; no real task, repository, file, secret, or user content.
- `risk_level`: `medium` if a real workflow would delegate an irreversible action or sensitive content before receipt is confirmed

## Claim and evidence table

| Claim | Evidence class | Source or artifact | Date | Scope | Limitation | Status |
|---|---|---|---|---|---|---|
| A public Issue #37822 existed and was Open when this case was accessed. | `direct` | [GitHub Issue #37822](https://github.com/openai/codex/issues/37822) | 2026-08-14 | Public issue metadata | Open status does not prove an active bug, priority, reproduction, or unresolved root cause. | candidate |
| One reporter described a child that was created or woken without a visible task receipt. | `reported` | Same public issue | 2026-08-14 | One author’s stated environments and observations | The report is not an independent reproduction or a universal behavior claim. | candidate |
| A message was dropped because of a particular internal field or decryption path. | `not_observed` | No local source, runtime, or independent review | 2026-08-14 | Product internals and diagnosis | The reporter’s mechanism theory is not adopted as a project fact. | unverified |
| Creation, wake-up, receipt, execution, and return are separate assertions worth recording. | `project_inference` | This case; Chapter 10; Chapter 12; Lab 013 | 2026-08-14 | Conservative multi-step workflow teaching | This does not guarantee a handoff implementation, detect every failure, or prove an agent is safe to use. | candidate |

## Reproduction status

- `reproduction_status`: `not_run`
- `reproduction_scope`: This project did not invoke a handoff tool, create a sub-agent, inspect logs, read a session, use a provider, or run the reported environment.
- `fixed_input_or_fixture`: The original offline receipt card under **Teaching conversion**.
- `logs_or_artifacts`: a completed fictional checkpoint card and bounded decision receipt, if an authorized learner run is later approved
- `independent_reviewer`: pending
- `last_checked_at`: 2026-08-14
- `root_cause_status`: `unknown`

## Smallest safe diagnostic path

| Step | Read-only check or low-risk action | Expected observation | Stop rule |
|---|---|---|---|
| 1 | Read the fixed fictional handoff card and label each observed checkpoint: created, started, receipt, execution, return. | The visible status is not silently upgraded into task receipt. | Stop if a real task, private content, tool call, account, or configuration is introduced. |
| 2 | Mark the receipt field `not_observed` when the card contains only creation and a generic child reply. | The handoff is classified `blocked`; no result is accepted. | Do not infer a bug, a missing permission, or a safe retry condition. |
| 3 | Choose a fallback: one bounded single-agent task or a human-readable handoff. | The next action has a named owner and no hidden delivery assumption. | Stop before creating an agent, sending a message, changing provider settings, or retrying a real side effect. |

- `allowed_actions`: read the fictional record, classify observations, write a local receipt, and choose a non-delegated fallback
- `forbidden_actions`: creating or waking an agent, sending a task, exposing a secret, reading logs or sessions, changing a provider or feature flag, retrying a side effect, installing software, committing, pushing, publishing, or using an account
- `minimal_safe_probe`: a completed five-checkpoint card using the fixed phrase `RECEIPT-OK`
- `stop_condition`: any attempt to substitute a real task for the fixed phrase, any missing owner for the fallback, or any unreviewed external side effect
- `rollback_or_cleanup`: delete a local scratch receipt if it contains no useful decision record; the fictional fixture remains unchanged

## Teaching conversion

- `learner_problem`: A workflow dashboard says a helper exists, but the learner cannot tell whether the helper received the assignment.
- `core_concept`: Lifecycle visibility is not message delivery. A trustworthy handoff has a receipt boundary before execution is trusted.
- `decision_to_teach`: either (a) use a harmless receipt probe before a separate, approved task, or (b) keep the work with one agent or a human handoff when receipt is absent. The first option adds a checkpoint; the second may be slower. Neither invents delivery evidence.
- `smallest_experiment`: Work only from this original offline card:

  ```text
  handoff_id: demo-01
  parent_request: "Return exactly: RECEIPT-OK"
  visible_status: child created; child started
  child_reply: "Waiting for an assignment."
  receipt_observed: no
  execution_observed: no
  result_returned: no usable task result
  ```

  Complete this bounded decision receipt without running a tool:

  ```text
  created: observed
  started: observed
  receipt: not_observed
  execution: not_observed
  returned_result: not_accepted
  decision: blocked — use a single-agent or human handoff
  external_actions: not_run
  ```

- `intentional_failure`: Treat `created` as proof of delivery, ask the child to guess the missing task, send a real task after the missing receipt, or describe the report as a confirmed product defect.
- `required_artifact`: the completed receipt, one sentence naming the unobserved checkpoint, and one fallback with an owner
- `acceptance`: The receipt distinguishes all five checkpoints; it marks the message receipt as unobserved; it does not name a root cause or configuration; it declines to send real work; it names a fallback; and it records `external_actions: not_run`.
- `transfer`: Apply the same checkpoint card to a queue worker, webhook, approval system, build pipeline, or team ticket. The invariant is that a visible lifecycle event is not proof that the intended content reached the next actor.
- `forbidden_claims`: a current Codex defect, an internal mechanism, a supported configuration, a safe retry, a reproduced runtime result, an agent capability guarantee, learner competence, transfer success, safety effectiveness, or production readiness

## Content placement

- `primary_chapter`: [Chapter 10 — Planning and slicing](../../book/chapters/10-planning-and-slicing-EN.md)
- `supporting_chapters`: [Chapter 12 — Agent loop and stop](../../book/chapters/12-agent-loop-and-stop-EN.md); [Chapter 9 — Verification, doubt, and recovery](../../book/chapters/09-verification-and-recovery-EN.md)
- `primary_lab`: [Lab 013 — Vertical slice](../../book/labs/lab-013-l3-vertical-slice-EN.md)
- `supporting_labs`: [Lab 007 — Action boundaries](../../book/labs/lab-007-action-boundaries-EN.md); [Lab 016 — Side-effect boundary](../../book/labs/lab-016-side-effect-boundary-EN.md)
- `related_skill`: [Task Protocol](../../skills/prysai-task-protocol/SKILL.md); [Evidence Review](../../skills/prysai-evidence-review/SKILL.md)
- `evaluation_fixture`: none assigned
- `update_registry_entry`: review when the source changes, an official product boundary is admitted, a controlled local reproduction is proposed, or a real handoff exercise is requested

The case makes one older public signal searchable and gives it a safe teaching shape. It does not change the maturity of a linked chapter, lab, Skill, or evaluation.

## Privacy, permission, and maintenance

- `personal_data_removed`: yes; the exercise is fictional and does not reuse a source identity
- `secrets_removed`: yes; no credential, account, provider, project path, task payload, or session content is used
- `private_paths_removed`: yes
- `copyrighted_material_boundary`: original summary and original fictional card only; no issue prose, command, log, attachment, screenshot, or answer is copied
- `asset_register_entry`: S89 in `docs/sources/asset-register.md`
- `volatile_facts`: issue state, product support, handoff behavior, versions, providers, permissions, and implementation details
- `next_review`: 2026-09-14, or before any product, runtime, configuration, or publication claim
- `change_trigger`: source change, official documentation admission, proposed live exercise, or a request to add a runnable handoff
- `owner`: research-maintainer

## Claim boundary

- `what_can_be_claimed`: One older public report is now represented as a bounded case with source type, symptom, evidence classes, reproduction status, an offline diagnostic path, and a stop condition.
- `what_must_not_be_claimed`: The report is current or reproducible; every handoff is affected; a root cause is known; a setting fixes it; a child received a hidden message; the offline card detects all failures; or a learner completed a real delegation.
- `next_smallest_check`: An independently reviewed, consented run of the fixed receipt probe in a named environment. It must use a harmless phrase, collect no session, repository, credential, account, private task, or personal data, and stop before any side effect.
- `current_status`: `candidate`
