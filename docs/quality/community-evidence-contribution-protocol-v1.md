# Community evidence contribution protocol v1

**Status:** `candidate governance record`
**Owner:** `quality-maintainer`
**Last reviewed:** 2026-08-15
**Next review:** before the first public evidence intake or license decision

## Purpose

This protocol gives outside contributors a safe, reviewable way to improve
test materials without confusing a contribution with a result. It is designed
to reduce review latency for original fictional fixtures and validators while
preserving the separate human-study and model-evaluation gates.

It does not recruit participants, collect data, create a public study,
authorize a model call, change a project status, or promise that a pull
request will be merged.

## Two contribution routes

| Route | Permitted material | Review minimum | Can it close a quality finding? |
| --- | --- | --- | --- |
| `fast_material_review` | Original fictional fixtures, deterministic validators, and text-only protocols with no outcome data | One maintainer checks source/license, scope, privacy declaration, focused test, and CI | No. It can improve the instrument only. |
| `restricted_evidence_intake` | A request to contribute actual learner or model evidence | A named authorizer, privacy/retention owner, and the independent reviewers required by the relevant study protocol | Not by the intake itself. Only a complete named study may supply narrowly scoped evidence. |

The fast route is intentionally narrow. It may merge a test asset quickly once
the required checks pass, but no bot or template approves a contribution.

## Exact pull-request format for the fast route

Create one folder at:

```text
evals/contributions/CE-YYYYMMDD-short-topic/
```

The folder must contain `contribution.json`, use the exact fields in the
[receipt template](../../evals/contributions/contribution-receipt-template.json),
and contain only the declared original fictional test materials. Prefer the
offline [`create_contribution_receipt.py`](../../scripts/create_contribution_receipt.py)
scaffold, which writes the exact folder, receipt, and an editable
positive/boundary skeleton without calling a model or network. The receipt
binds the contribution to a base commit, a test scope, a license boundary, the
files under review, the checks actually run, and a non-claim boundary.

The v1 receipt is a closed schema: its `contribution_id` must exactly equal the
folder name; every material file must be listed in `test_material_paths`, live
inside that same folder, exist in the pull request, be smaller than 100 KiB,
and use a text suffix (`.json`, `.md`, `.py`, `.txt`, `.yaml`, or `.yml`).
Do not add an unlisted note, screenshot, transcript, attachment, or metadata
file. A later schema version is required for a genuinely new field.

Use only these values:

| Field | Allowed value or rule |
| --- | --- |
| `contribution_kind` | `synthetic_fixture`, `validator`, or `protocol` |
| `status` | `submitted_unreviewed` |
| `scope` | `fictional_text_only` |
| `authorship` | `original` |
| `review_route` | `fast_material_review` |
| `privacy.*` | Every field must be `false` |

Run these before opening the pull request:

```powershell
& $py scripts\validate_contributed_test_material.py
& $py scripts\test_validate_contributed_test_material.py
& $py scripts\test_create_contribution_receipt.py
& $py scripts\validate_github_templates.py
& $py scripts\check_local_links.py
```

## Evidence is not a public upload format

Never add a learner's answer, model transcript, private prompt, name, email,
account or organization identifier, consent form, raw score sheet, screenshot,
or source with unclear reuse rights to a pull request. De-identification is
not permission to publish.

For a real evidence proposal, submit at most a sanitized Field Report or ask
the named project owner for an authorized private intake. Before any collection
starts, the owner must identify the study protocol, fixture revision, cohort,
consent/withdrawal path, retention end, deletion owner, model surface if any,
two independent scorers where required, and the publication decision. The
[First Win pilot protocol](first-win-pilot-protocol-v2.md) and the [Shift
Handoff protocol](shift-handoff-pilot-protocol-v1.md) remain the controlling
procedures for their own studies.

## Merge rubric

A maintainer may merge a fast-route pull request only when all of the
following are true:

1. The receipt and its focused validator pass locally and in the read-only CI
   workflow.
2. The material is original or has a recorded source and compatible license.
3. The task is fictional, low-risk, observable, and does not need credentials,
   network access, model tools, or an external action.
4. The contribution adds a positive and a boundary/failure case, rather than a
   more decorative version of an existing fixture.
5. The PR states what the material does not prove and does not promote any
   maturity or quality status.

Reject, split, or move to a private authorized process when a contribution
contains personal data, an outcome claim, unclear rights, raw output, a
real-work dependency, or a status-promotion request.

## Automation and host settings

The repository's dedicated read-only `Fast test-material checks` workflow
validates the receipt and material layout with the target branch's validator
against the PR's data checkout. It has no write permissions and uses read-only
GitHub pull-request metadata only to reject a fast route that changes anything
outside one contribution folder. The full quality workflow is skipped only for
a PR whose changed paths all stay in `evals/contributions/**`; any mixed-scope
PR still runs the full quality workflow. The candidate [CODEOWNERS
map](../../.github/CODEOWNERS) routes relevant review requests to `@Prysai`,
including test materials and license, contribution, security, source, and
governance changes. These are automated **tripwires** and routing aids, not
merge bots. The current
private-organization host plan
does not enforce the proposed Ruleset; maintainers must continue to make the
final review decision. If host-side enforcement becomes available, configure
required status checks, one human approval for fast-route material, two
approvals for evidence/security/license changes, no force pushes, and no direct
deletion of `main`.

## Evidence boundary

This protocol and a merged receipt establish only that a contribution followed
the declared structural intake rules. They do not establish contributor
independence, learner outcomes, model behavior, model comparison, safety,
privacy, productivity, efficiency, IQ, community demand, or release readiness.
