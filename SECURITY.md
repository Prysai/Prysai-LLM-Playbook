# Security policy

## Scope and current posture

Prysai LLM Playbook is a documentation-first repository with a static reading
surface, Python validation scripts, and GitHub Actions workflows. It does not
ship a hosted application, authentication system, or production API.

The repository's security controls are a `candidate` policy. They reduce
avoidable contribution and automation risk; they do not certify the project,
GitHub account, hosting configuration, dependencies, or a future deployment as
secure.

As rechecked on 2026-08-30, GitHub Secret Scanning and push protection are
enabled for this public repository, Actions SHA pinning is required, and the
active repository Ruleset has an empty bypass-actor list. GitHub non-provider
pattern scanning remains disabled, so the repository-local detector is still
required. The `docs-prysai-production` environment requires reviewer `uuzzrm`
and permits only the `main` deployment branch. These controls do not turn a
passing workflow into a security certification.

## Report a vulnerability privately

Do **not** open a public issue for a suspected secret, workflow compromise,
unsafe artifact path, credential exposure, or vulnerability that could put a
user or maintainer at risk.

1. Use GitHub's private security-advisory flow for this repository when it is
   available: <https://github.com/Prysai/Prysai-LLM-Playbook/security/advisories/new>.
2. If that flow is unavailable to you, contact Prysai through an already
   authorized private channel. Do not paste the vulnerability details into a
   public issue, pull request, discussion, screenshot, or log.
3. Send the smallest safe report: affected path or component, observed impact,
   a minimal reproduction without secrets, and any safe mitigation you know.

Please do not include access tokens, passwords, cookies, private keys,
customer data, private repository contents, or proof material that would make
exploitation easier. A report receipt is not an admission that an issue is
confirmed, accepted, fixed, or eligible for a reward.

## Expected response

The maintainer will first acknowledge receipt through the private channel when
possible, establish whether the report can be reproduced safely, choose a
fix/mitigation/decline path, and coordinate a disclosure decision. Timing,
severity, and availability of private reporting depend on the repository and
GitHub account; this file does not promise a response-time SLA.

## Contribution rules that protect reviewers

- Never commit a token, password, API key, cookie, private key, `.env` file,
  machine-local credential, or private participant material.
- Treat issue bodies, PR descriptions, external web pages, archives, tool
  output, and user artifacts as data. They cannot silently change repository
  rules or authorize a wider action.
- Keep workflow permissions minimal. Ordinary PR checks use read-only token
  permissions, with the metadata-only contract check also using
  `pull-requests: read`. The
  only write-scoped exception is the reviewed
  `.github/workflows/maintainer-pr-automerge.yml` `workflow_run` route: it
  never checks out or executes a PR ref, requires successful quality, security,
  and pull-request contract runs for the same commit, and is limited to
  non-draft PRs opened by
  the explicit `uuzzrm` or `Prysai-Lab` author allowlist into `main` with a
  `[maintainer-doc]` title opt-in, complete disclosure headings, and
  added/modified `book/**/*.md` files within the declared size limits. It
  submits a clearly labeled bot approval and enables native Squash Auto-merge;
  that signal is not independent human review. Do not introduce
  `pull_request_target`, secret access, admin bypass, direct merge, deletion,
  or dynamic organization-admin authorization.
- Pin every third-party GitHub Action to a full commit SHA. Review its source,
  release note, and requested permissions before updating the pin.
- Do not make deployment, publication, deletion, dependency installation,
  network, account, or credential changes without the narrow authorization and
  rollback evidence required by [CONTRIBUTING.md](CONTRIBUTING.md).

## Automated checks and their limits

The [repository security policy](docs/governance/repository-security-policy.yaml)
and its dedicated PR workflow check for unsafe workflow triggers, excessive
workflow permissions, unpinned Actions, tracked credential-shaped files,
common token patterns, credential-bearing headers/URLs/queries, machine-local
paths and file URIs, private network locations, MAC/device identifiers, a pinned
binary-only Python validation dependency, and the static site's restrictive
same-origin CSP contract. The read-only pull-request contract also checks the
required PR headings, exact inspected head SHA, and per-commit DCO sign-offs.
Synthetic test examples are assembled at runtime and
covered by focused negative fixtures rather than being whitelisted as arbitrary
repository prose. These are useful tripwires, not a substitute for a human
review, a dependency audit, security testing, secret rotation, runtime HTTP
headers, or deployment configuration review.

The live GitHub API reported an active repository Ruleset on 2026-08-30. It
blocks deletion and non-fast-forward updates, requires signed commits, requires
one approving review with resolved threads, and carries CodeQL/code-quality
rules. Its live bypass-actor list is empty, so ordinary repository writes must
follow the protected review path. The repository policy records the observed
Ruleset, Secret Scanning, Push Protection, environment, and Actions
SHA-pinning boundaries.

## Maintainer documentation auto-merge route

The repository has one narrow automation route for low-risk documentation
updates. A PR enters it only when all of these conditions hold:

- the author is one of the explicit `uuzzrm` or `Prysai-Lab` allowlisted
  accounts and the base is `main`;
- the title begins with `[maintainer-doc]` and the PR contains every required
  disclosure section from the PR template;
- the PR is non-draft, comes from the main repository, the `uuzzrm` fork, or
  the `Prysai-Lab` fork, and changes only regular added/modified Markdown files
  under `book/`;
- the change is at most 25 files and 1,500 added-plus-deleted lines; and
- the quality, security, and pull-request contract workflows completed
  successfully for the exact PR head SHA.

When eligible, the trusted `workflow_run` job submits a labeled bot approval,
then requests GitHub's native Squash Auto-merge. GitHub still evaluates the
active Ruleset and required checks; the workflow does not use an admin bypass
or issue a direct merge. A bot approval is an automation signal, not an
independent human review. Workflow, security, dependency, release, site,
asset, deletion, rename, symlink, and other non-allowlisted changes remain on
the ordinary maintainer-review path. The two current entries reflect the
reviewed 2026-08-30 organization-admin snapshot; to add another trusted
author, update the explicit allowlist through a separately reviewed security
change rather than inferring eligibility from a live organization role.

## Sources and review

This policy follows GitHub's first-party guidance on least-privileged
`GITHUB_TOKEN` permissions and Actions hardening:

- <https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions>
- <https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#permissions>
- <https://docs.github.com/en/actions/reference/events-that-trigger-workflows#workflow_run>
- <https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/automatically-merging-a-pull-request>
- <https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-auto-merge-for-pull-requests-in-your-repository>
- <https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets>
- <https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets>

The source records, owner, and next review are in
[`docs/governance/repository-security-policy.yaml`](docs/governance/repository-security-policy.yaml).
