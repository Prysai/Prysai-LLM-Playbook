# Security policy

## Scope and current posture

Prysai LLM Playbook is a documentation-first repository with a static reading
surface, Python validation scripts, and GitHub Actions workflows. It does not
ship a hosted application, authentication system, or production API.

The repository's security controls are a `candidate` policy. They reduce
avoidable contribution and automation risk; they do not certify the project,
GitHub account, hosting configuration, dependencies, or a future deployment as
secure.

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
- Keep workflow permissions minimal. PR checks run with `contents: read`; do
  not introduce `pull_request_target`, write-scoped tokens, or secret access
  just to automate a review.
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
same-origin CSP contract. Synthetic test examples are assembled at runtime and
covered by focused negative fixtures rather than being whitelisted as arbitrary
repository prose. These are useful tripwires, not a substitute for a human
review, a dependency audit, security testing, secret rotation, runtime HTTP
headers, or deployment configuration review.

GitHub's official Rulesets screen is available, but it currently states that
Rulesets will not be enforced for this private organization repository until
the organization upgrades to GitHub Team. Until that host-side blocker changes,
maintainers must not describe passing CI as branch protection or required human
review. The policy records the exact future `main` configuration, including an
empty default bypass list, human review, required checks, force-push blocking,
and deletion restriction.

## Sources and review

This policy follows GitHub's first-party guidance on least-privileged
`GITHUB_TOKEN` permissions and Actions hardening:

- <https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions>
- <https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#permissions>
- <https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets>
- <https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets>

The source records, owner, and next review are in
[`docs/governance/repository-security-policy.yaml`](docs/governance/repository-security-policy.yaml).
