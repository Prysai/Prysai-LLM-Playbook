# Public beta feedback contract v1

**Status:** candidate governance record. This contract prepares bounded feedback
for a future public beta; it does not announce or open one.

**Update routing:** [`contribution-flow`](../governance/update-registry.yaml)
controls this contract, the Field Report form, and their validator.

## Purpose and current boundary

This contract governs voluntary, sanitized observations from an **authorized
pilot** of the First Win route. It applies only after a pilot authorizer has
named the cohort, channel, roles, retention end, and deletion owner.

The repository is currently private. It has no public Pages deployment, and
this document is not an invitation for general public use. Until an owner
authorizes a named pilot, no feedback collection or recruitment is active.

| Current fact | Record |
| --- | --- |
| Repository boundary | `Prysai/Prysai-LLM-Playbook` is private; public deployment is not established. |
| Authority | GitHub repository metadata: <https://github.com/Prysai/Prysai-LLM-Playbook>, accessed 2026-08-14. |
| Scope owner | `release-maintainer` for publication authorization; `quality-maintainer` for this feedback contract. |
| Next review | Before any pilot authorization, repository visibility change, or public deployment decision. |

This contract does not replace the controlled-study procedure. A named First
Win pilot must use [First Win pilot protocol v2](first-win-pilot-protocol-v2.md)
for its fixed conditions, participant safeguards, scoring, stopping rules, and
aggregate reporting. Do not copy or improvise a second study procedure here.

## Scope and exclusions

In scope: a bounded observation about first-task friction, a reader-facing
failure, an accessibility concern, a platform difference, or a result/evidence
mismatch.

Out of scope: technical support, account or billing help, platform diagnosis,
feature commitments, security incident response, publication approval, and any
claim about demand, satisfaction, learning, retention, transfer, or product
quality. No report authorizes a maintainer to access an account, private
repository, message history, or external service.

## Roles and no-service boundary

Before a pilot begins, the pilot authorizer records these roles in the pilot
record:

| Role | Responsibility |
| --- | --- |
| Pilot authorizer | Approves the named cohort, channel, scope, and start/stop decision. |
| Feedback triager | Applies the allowed states and routes only sanitized observations. |
| Privacy and retention owner | Confirms minimization, retention end, deletion process, and safety-stop handling. |
| Moderator | Is the participant contact for consent, discomfort, or a safety stop. |
| Independent scorer | Applies only when the controlled-study protocol requires one; the feedback triager does not substitute for that review. |

There is no response-time, reproduction, fix, publication, or follow-up
commitment. A report may be closed without response or action. These roles and
states are internal governance terms, not GitHub labels or a support SLA.

## Intake and data minimization

Use the [Field Report form](../../.github/ISSUE_TEMPLATE/field-report.yml) for
an unsolicited observation only when the authorized channel permits it. Keep
the report to the smallest useful summary: surface/date or version, bounded
task, expected and observed result, reproduction status, safe evidence, and
related guide material.

Do not collect, request, copy, or retain names, contact details, account or
organization identifiers, billing details, device identifiers, raw prompts,
raw logs, chat histories, secrets, private files or repositories, credentials,
copyrighted source material, screenshots containing personal data, or other
unnecessary material. A controlled pilot follows the de-identified record and
retention limits in [First Win pilot protocol v2](first-win-pilot-protocol-v2.md),
not this issue-form intake.

## Allowed record states

Each intake record may have one of these states:

| State | Meaning |
| --- | --- |
| `received` | A sanitized report awaits a boundary check. |
| `needs-sanitization` | Processing is paused until unsafe or unnecessary material is removed. |
| `triage` | The report is being classified within the stated scope. |
| `out-of-scope` | It requests support, diagnosis, an external action, or another excluded activity. |
| `safety-stopped` | Privacy, consent, distress, external-action, or another safety boundary ended processing. |
| `separate-review` | The observation may be considered under the field-case review boundary; it is not accepted curriculum material. |
| `closed-no-action` | No further action is planned; this is not a finding that the report was incorrect. |

`received`, `triage`, or `separate-review` do not mean reproduced, accepted,
fixed, or verified.

## Safety stop, deletion, and triage boundary

Stop processing immediately if a report includes private material, credentials,
identifiers, unclear-license material, participant distress, an employment or
academic evaluation concern, or a request for an external action. Do not quote
or reproduce the unsafe material. The moderator or privacy and retention owner
asks for its removal through the authorized channel, removes any
maintainer-created copies under the recorded deletion process, and retains only
a non-sensitive safety-stop record when needed.

Triage may identify a report's evidence class, unknowns, and the smallest safe
next check. It must not infer a root cause, prevalence, platform behavior,
platform equivalence, a verified fix, or learner outcome from one observation.
It must not silently convert a report into research, curriculum, or a public
claim.

## Field-case review boundary

A Field Report is hypothesis intake, not a field case. A maintainer may create
a separate record using the [field-case template](../templates/field-case.md)
only after source, license, privacy, evidence level, reproduction status, safe
check, stop condition, and teaching-boundary review. The original report is
not automatically published as curriculum, quoted, or treated as permission
to publish.

## Evidence boundary

Writing this contract, receiving a report, or authorizing/recruiting a pilot
does not produce learner evidence. A completed controlled round may produce
only the task-usability and measurement evidence defined by [First Win pilot
protocol v2](first-win-pilot-protocol-v2.md). It does not establish learning,
retention, transfer, demand, satisfaction, platform reliability, or public-beta
readiness, and it does not promote the project beyond `candidate`.
