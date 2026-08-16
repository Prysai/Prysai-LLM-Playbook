# GitHub contribution governance for external test-evidence pull requests: source receipt

**Status:** candidate research record / `not_run`
**Accessed:** 2026-08-15 (America/Los_Angeles)
**Owner:** governance-maintainer
**Next review:** 2026-09-15, or before enabling a contribution agreement,
`CODEOWNERS`, ruleset, branch protection rule, required check, or external
test-evidence intake path.

## Research question and scope

What GitHub-controlled mechanisms can help a private candidate repository
accept **external test-evidence pull requests** quickly while preserving clear
review, validation, and contribution-rights boundaries?

This record covers only official GitHub documentation for:

1. pull request templates and the distinct issue-form surface;
2. `CODEOWNERS` review routing;
3. rulesets, pull-request review requirements, and required status checks; and
4. commit signoffs, DCO/CLA decision boundaries, and GitHub's default
   repository-license contribution term.

It is not a GitHub-settings audit, legal advice, a security certification, or
an authorization to accept a contribution. No organization setting, repository
setting, ruleset, protected-branch rule, `CODEOWNERS` file, PR template,
workflow, GitHub App, DCO check, CLA, contributor, pull request, test result,
or merge was inspected, created, enabled, or changed for this receipt.

## Evidence classes and limits

| Evidence class | Meaning here | Does not establish |
| --- | --- | --- |
| `official documentation fact` | A capability or condition described by the linked GitHub-controlled page, within its stated product and plan scope. | That this repository has configured, enforced, or successfully used it. |
| `project policy suggestion` | A proposed local decision for making evidence PRs reviewable and low-friction. | A GitHub platform requirement, legal conclusion, contributor agreement, or merge approval. |
| `not_run` | No live GitHub configuration, external PR, human review, or CI run was observed. | That a guard works, a contribution is trustworthy, or a PR may merge. |

## Official platform facts retained

### 1. Templates guide contributors; they are not a merge gate

GitHub documents that issue and pull-request templates standardize information
contributors include. A pull-request template is shown automatically in the PR
body, provided the template is on the default branch in a supported location
[O1][O2]. GitHub documents web-form fields as **issue forms**; their submitted
inputs become a Markdown issue comment [O1].

Therefore, the documented native surface for a structured external test
submission is an issue form, while the documented PR surface is a Markdown
template. This record does not infer that a template makes fields complete,
truthful, safe, reviewed, or mergeable.

### 2. `CODEOWNERS` requests review; a host rule makes it required

GitHub documents that a non-draft PR modifying an owned path automatically
requests its code owner for review. The applicable `CODEOWNERS` file is on the
PR base branch, and owners need the documented repository access. GitHub also
documents a separate required-review option for requiring code-owner approval
before merge [O3].

Thus, a path owner is review routing. It is not by itself evidence that a
review is mandatory, sufficient, independent, or completed.

### 3. Rulesets can require a PR, current review, and passing checks

GitHub documents ruleset rules that can require changes to target a branch
through a PR, require a chosen number of approvals, optionally dismiss stale
approvals after the reviewed diff changes, and optionally require code-owner
approval [O4]. GitHub also documents required status checks: all selected
checks must pass before merge, and a rule can restrict a required check to a
specific GitHub App as its expected status source [O4].

GitHub separately warns that people or integrations with write access can set
status-check state [O5]. Selecting a trusted expected source is therefore a
useful platform control, but it does not prove that a check's test design,
inputs, outputs, or pass condition are adequate.

### 4. Commit signoff, DCO, CLA, and signed commits are distinct seams

GitHub documents a repository setting that requires signoff for web-based
commits. Its documentation says command-line authors must use `--signoff`, and
explicitly distinguishes a signoff from cryptographic commit signing [O6]. It
names the Developer Certificate of Origin as one example of a repository
signoff agreement, without making that document a Prysai agreement [O6].

GitHub's Terms state that content added to a repository containing a license is
licensed under that repository's terms unless a separate agreement, such as a
CLA, supersedes [O7]. This is a GitHub policy statement, not legal advice on
whether the repository's present license, a DCO, a CLA, dual licensing, or any
contributor workflow is suitable.

### 5. Pull-request path filters can separate a narrow check from a full check

GitHub documents `paths` and `paths-ignore` filters for `pull_request`
workflows [O8]. When both branch and path filters are present, both must match;
for a `paths-ignore` filter, a workflow does not run only when all changed
paths match an ignored pattern. GitHub also warns that a required workflow
skipped by path filtering can leave its required check pending.

Therefore this repository may run a read-only static contribution check for
`evals/contributions/**` while retaining the full quality workflow for any
mixed-scope pull request. This is a local workflow design decision, not proof
that its check is enabled, required, safe for arbitrary code execution, or
enforced by GitHub.

## Local candidate implementation after this research record

The repository worktree now contains a candidate implementation of the narrow
policy: a `Fast test-material checks` read-only workflow, a path-ignore rule on
the full quality workflow, a static material validator, a local scaffold, and
a maintainer procedure. The fast job intentionally does **not** execute
contributor-written code; it validates only the repository-owned receipt
contract and its regression tests.

This source record does not convert that local source state into a live GitHub
configuration result. No external PR, fork, exact workflow run, required-check
setting, CODEOWNERS request, approval, merge, DCO/CLA, or host Ruleset has been
observed through this record.

## Candidate fast-and-safe evidence-PR policy

The following is a **project policy suggestion**, not an implemented setting.
It translates the bounded platform facts above into a narrow contribution path
for detailed test or learner-evidence PRs:

| Seam | Suggested minimum | Why it preserves speed and reviewability |
| --- | --- | --- |
| Intake | A dedicated PR template, such as `external-test-evidence.md`, with the compact receipt below. Use an issue form only for pre-PR intake or reports that do not change repository files. | Contributors know the required context before review starts; maintainers can decline incomplete or high-risk material without reconstructing its context. |
| Small scope | One test protocol, result record, correction, or redacted fixture per PR; link any related issue or protocol. | A bounded change can receive a focused review and a single clear merge decision. |
| Ownership | Assign specific maintainers to `evals/`, evidence records, governance, and curriculum paths through a future `CODEOWNERS` map; require their approval only where the selected host rule makes it required. | Specialist review is routed to the relevant material without implying that all PRs need the same reviewers. |
| Merge gate | For the protected default branch, require a PR, at least the project-chosen human approval, dismissal of stale approval after a material diff change, conversation resolution, and only named validation checks from a trusted source. | Fast merge means a small PR that has passed explicit gates; it does not mean bypassing review after a green check. |
| Evidence safety | Require redaction and provenance fields before accepting logs, screenshots, transcripts, datasets, or participant reports. Do not accept secrets, private credentials, personal data, or material with unclear permission. | A passing formatter or link check cannot establish safe publication rights. |
| Rights policy | Before opening external intake, make one published, counsel-reviewed inbound-rights decision: repository-license default only, a DCO-style signoff process, or a separate CLA path. If selecting DCO-style signoff, account for the documented web-only scope of GitHub's compulsory setting and define how non-web commits are checked. | Contributors receive one consistent rule; maintainers do not need to improvise license decisions during review. |

### Proposed PR-template receipt for test evidence

This is original Prysai wording suggested for a future Markdown PR template.
It is deliberately a review aid, not a claim that GitHub validates each field.

```md
## Evidence receipt

- Change type: protocol | fixture | de-identified result | correction
- Exact test question and acceptance rule:
- Environment, version, and date:
- Inputs retained in this PR or a permitted reference:
- Expected result and observed result:
- Failure, uncertainty, or deviation:
- Redaction and publication-rights statement:
- Related protocol / issue / source receipt:
- Requested reviewers and reason:
- Checks run locally (if any) and results:
```

The PR should state `not_run`, `draft`, or `candidate` when that is the true
state. A contributor's assertion, a template checkbox, a signed commit, or a
successful status check must not be described as learner validation,
independent review, safety proof, or permission to publish sensitive material.

## Explicit non-claims

This receipt does **not** establish that:

- this repository currently has a PR template, issue form, `CODEOWNERS` file,
  protected branch, ruleset, required reviewer, merge queue, required status
  check, trusted check source, DCO policy, CLA, or public contribution path;
- any contributor, test result, learning record, source, fixture, transcript,
  screenshot, or dataset is accurate, de-identified, rights-cleared, safe to
  publish, independently reviewed, or ready to merge;
- a PR template enforces completion, a code-owner request guarantees review,
  a status check demonstrates evidence quality, or a signed commit proves a
  contributor agreement;
- the GitHub Terms select a suitable license policy for this mixed
  documentation, curriculum, code, Skills, and evidence repository; or
- these controls meet legal, privacy, security, safety, research-ethics,
  organizational, or release-readiness requirements.

## Source ledger and reuse boundary

All sources below are GitHub-controlled documentation or policy pages accessed
on **2026-08-15 (America/Los_Angeles)**. They describe products and policy
that can change. Their platform, plan, access, and configuration scope must
remain attached to every reuse.

| ID | Evidence class | Canonical GitHub-controlled source | Scoped support in this receipt | Does not prove |
| --- | --- | --- | --- | --- |
| O1 | official documentation fact | GitHub Docs, [About issue and pull request templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates) | Native PR-template behavior and the distinct issue-form surface. | A configured template/form, mandatory completion, or safe evidence. |
| O2 | official documentation fact | GitHub Docs, [Creating a pull request template for your repository](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository) | Supported locations and default-branch availability for PR templates. | That this repository has any template or that it is enforced. |
| O3 | official documentation fact | GitHub Docs, [About code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) | Base-branch review routing and the separate option to require code-owner approval. | An owner mapping, access grant, approval, enforcement, or merge result. |
| O4 | official documentation fact | GitHub Docs, [Available rules for rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets) | PR, approval, stale-review, code-owner, and required-status-check rules. | A plan entitlement, configured ruleset, required check, or enforcement outcome. |
| O5 | official documentation fact | GitHub Docs, [Status checks](https://docs.github.com/en/pull-requests/reference/status-checks) | Status-check purpose, authorship boundary, and merge-check context. | Test quality, trusted provenance, or a repository's check configuration. |
| O6 | official documentation fact | GitHub Docs, [Managing the commit signoff policy for your repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-the-commit-signoff-policy-for-your-repository) | Web-commit signoff scope, CLI distinction, DCO example, and difference from commit signing. | A DCO agreement, legal sufficiency, or CLI enforcement. |
| O7 | official GitHub policy fact | GitHub Docs, [GitHub Terms of Service — Contributions Under Repository License](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service#6-contributions-under-repository-license) | Default contribution-license term and the stated separate-CLA exception. | Legal advice, consent validity, or an appropriate Prysai licensing choice. |
| O8 | official documentation fact | GitHub Docs, [Workflow syntax — path filters](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#onpull_requestpull_request_targetpaths-paths-ignore) | `pull_request` path-filter semantics and the skipped-required-check warning. | That a workflow ran, is a required check, handles all path patterns correctly, or is appropriate for untrusted code. |

This is original Prysai source-record wording. It retains short factual
summaries and links only; it does not copy GitHub Docs prose, templates,
configuration, assets, credentials, account data, contributor records, or
legal agreements. Linked material remains reference-only under its owner's
terms. No external dependency, license grant, contribution agreement, or
GitHub setting is introduced by this receipt.

## Volatility and next smallest check

- `volatile_facts`: GitHub template locations and behavior; issue-form scope;
  `CODEOWNERS` routing; ruleset availability and semantics; status-check
  authorship and enforcement; commit-signoff behavior; GitHub policy terms;
  workflow path-filter behavior and skipped-check effects.
- `review_owner`: governance-maintainer.
- `review_trigger`: a GitHub Docs or Terms update; a proposed external
  contribution path; any licensing decision; a proposed PR template,
  `CODEOWNERS` map, ruleset, branch rule, DCO/CLA service, or required check.
- `next_smallest_check`: Before changing host settings or accepting public
  evidence, create a separately authorized proposal that names the exact PR
  template fields, path owners, rule target, reviewers, trusted check source,
  check names, data-redaction boundary, inbound-rights policy, rollback owner,
  and independent evidence of host configuration. Obtain appropriate legal
  review for any DCO, CLA, license, privacy, or contributor-agreement choice.
