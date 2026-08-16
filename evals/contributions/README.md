# Community test-material contributions

This directory accepts **test material**, not raw learner studies or private
model transcripts. A merged contribution here remains `candidate`; it never
closes Q-001 or Q-002 by itself.

## Choose the correct route

| You want to contribute | Put in a pull request? | Route |
| --- | --- | --- |
| An original fictional fixture or a safe text-only protocol | Yes | Create `evals/contributions/<contribution-id>/contribution.json` and the material. |
| An executable validator or code-based test | Yes, via standard review | Open an issue first if the scope is new; do not use the fast route. |
| A sanitized observation about reader friction | Usually an issue, not a result PR | Use the [Field Report form](../../.github/ISSUE_TEMPLATE/field-report.yml). |
| Raw learner work, a chat history, account data, identifiers, consent records, or an actual study result | No | Stop. Do not upload it to GitHub. A named pilot may use the private, authorized handling path in the [community evidence protocol](../../docs/quality/community-evidence-contribution-protocol-v1.md). |

## Fast material route

1. Create the exact folder, receipt, and editable positive/boundary skeleton
   with the offline scaffold. Pass the target branch's current commit SHA as
   the baseline—for example, `$base = git rev-parse origin/main`:

   ```powershell
   & $py scripts\create_contribution_receipt.py `
     --id CE-YYYYMMDD-short-topic `
     --kind synthetic_fixture `
     --fixture-id short-fixture-id `
     --base-commit $base
   ```

   The receipt template remains available for inspection, but the scaffold
   prevents common path and field mistakes. It is not a study generator.
2. Use only original, fictional, low-risk inputs. Register any external source
   before adapting it.
3. Include one positive and one boundary/failure case. Run
   `scripts/validate_contributed_test_material.py`, its test script, and the
   scaffold test.
4. Open one focused pull request and select **Test material (fast route)** in
   the PR template.

The receipt ID must match its folder exactly. List every submitted material
file in `test_material_paths`; the fast route accepts only small text files
(`.json`, `.md`, `.txt`, `.yaml`, or `.yml`) inside that one folder.
Do not add an attachment or helper file outside the receipt's declared list.

The dedicated `Fast test-material checks` workflow checks the declared data,
file layout, UTF-8 text-only boundary, non-claim boundary, and the GitHub file
scope. It runs the target branch's validator against the PR checkout as data;
it deliberately does not execute contributor-written code or call a model. It
uses read-only GitHub API access solely to obtain the PR file list;
it does not run a contributor-defined network command. A maintainer still
decides whether the fixture is useful, safe, licensed, non-duplicative, and
ready to merge. "Fast" means a small, reviewable route; it is not an automatic
approval or a service-level promise.

For the author and maintainer click-by-click sequence, see the [fast material
review procedure](../../docs/governance/fast-material-review.md).

## Non-negotiable boundaries

- Do not commit raw prompts, raw model outputs, learner work, participant
  identifiers, consent forms, private repositories, screenshots, or secrets.
- Do not claim a model is better, a person learned faster, productivity rose,
  safety improved, or IQ changed.
- Do not change a Lab, Skill, evaluation, or project status to `verified` or
  `production-ready` from a community test-material PR.
- Every project-owned contribution remains under the repository's current
  license until the owner adopts a new license decision.
