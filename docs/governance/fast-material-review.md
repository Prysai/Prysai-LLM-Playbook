# Fast fictional test-material review

**Status:** candidate maintainer procedure; no host Ruleset currently enforces it.
**Owner:** governance-maintainer
**Last reviewed:** 2026-08-15
**Next review:** before accepting the first external fast-route pull request or enabling a host Ruleset

## Purpose

This is the short review path for one original, fictional, low-risk test
fixture or text-only protocol. It makes a useful
contribution easy to review without treating a passing CI check as a research
result, a security approval, or an automatic merge decision.

Use the normal or restricted route for executable code or validators, anything
involving people, a real model run, private or workplace material, external
effects, a license change, a workflow or security change, or a maturity claim.

## Contributor: the smallest valid pull request

1. Start from the target branch and obtain its commit SHA. For a checkout with
   `origin/main`, for example:

   ```powershell
   $base = git rev-parse origin/main
   & $py scripts\create_contribution_receipt.py `
     --id CE-YYYYMMDD-short-topic `
     --kind synthetic_fixture `
     --fixture-id short-fixture-id `
     --base-commit $base
   ```

   If the target remote is named differently, use that remote's `main` ref.
   The SHA records the declared baseline; it is not a release tag or proof that
   the contribution was tested against every later commit.

2. Replace all placeholders in the newly created folder. Include one positive
   case and one boundary or failure case. The material must be original,
   fictional, text-only, low-risk, and free of executable code or
   model/network instructions.
3. Run the declared offline checks plus:

   ```powershell
   & $py scripts\validate_contributed_test_material.py
   & $py scripts\test_validate_contributed_test_material.py
   & $py scripts\test_create_contribution_receipt.py
   ```

4. Open a PR that changes **only**
   `evals/contributions/CE-YYYYMMDD-short-topic/`. Choose **Test material
   (fast route)** in the PR template, link its `contribution.json`, state that
   the work is original, and make the required rights declaration.

The dedicated `Fast test-material checks` workflow treats the pull request as
data: it runs the target branch's validator, not a Python file supplied by the
contributor. It has read-only repository and pull-request metadata access so
it can ask GitHub for the file list; it refuses any fast route whose file list
is not exactly one contribution folder. The full release-evidence workflow is
skipped only when every changed path is under `evals/contributions/**`;
changing a script, workflow, license, documentation, or any other path still
invokes the full workflow too.

## Maintainer: short review order

Use this sequence before approval. Stop at the first failed item and request a
small correction or move the work to the restricted route.

1. **Diff scope:** `Files changed` contains one contribution folder only—no
   scripts, workflows, license, status, generated files, or unrelated cleanup.
2. **Receipt identity:** the folder name, `contribution_id`, `fixture_id`,
   base commit, declared file list, license boundary, and all false privacy
   flags agree. `contribution.json` itself is not listed as test material.
3. **Material value:** the changed files state a concrete fictional task, one
   positive case, one boundary/failure case, expected observable evidence, and
   a limit. They do not contain raw prompts, raw model output, learner work,
   credentials, personal data, executable code, or a claim about learning, efficiency, safety,
   productivity, model quality, or IQ.
4. **Rights and safety:** the PR declares original authorship under the current
   license, identifies any source as reference-only unless a compatible use is
   recorded, and introduces no model call, network call, credentials, or
   external action.
5. **Checks and decision:** the exact head commit has a green `Fast
   test-material checks` run. Review the actual content, resolve conversation
   threads, and record either `approved for fast material merge` or the narrow
   reason it is declined. CI is a tripwire, never an approval bot.

After these five checks, one designated maintainer may merge using an enabled
repository merge method. Do not describe this as automatic approval, an
independent review, a DCO/CLA, a learner result, or an evaluation result.
This procedure does not promise a review or merge time.

## Copyable maintainer comment

```text
Fast-material review
- Scope: one contribution folder only
- Receipt and fictional-text boundary: checked
- Positive and boundary/failure cases: checked
- Rights and no-sensitive-data declaration: checked
- Exact-head Fast test-material checks: passed
- Decision: approved for fast material merge

This merge adds candidate test material only. It does not establish learner,
model, efficiency, safety, productivity, or IQ outcomes.
```

## Host-side follow-up

When the organization plan supports an enforceable Ruleset, configure the
project-approved required check name after observing a successful run; require
at least one human approval for this narrow route; require more review for
license, security, and real-evidence paths; and block force-push and deletion
of `main`. Record the live setting separately. Until then, `CODEOWNERS` only
requests review and this procedure is a maintainer checklist.
