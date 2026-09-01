# Contributing to Prysai LLM Playbook

Thank you for improving the Prysai LLM Playbook. This repository accepts focused
corrections, curriculum work, research records, project Skills, evaluation
fixtures, site changes, and governance improvements. A contribution is not
accepted merely because it is large, polished, or AI-assisted; it must preserve
the project's source, safety, evidence, language, and maturity boundaries.

Participation is also covered by the [Community conduct](CODE_OF_CONDUCT.md).
Keep disagreements focused on the work and report sensitive incidents through
the private path described there, not through a public issue or pull request.

## Choose the smallest correct path

| Change class | Examples | Start here | Minimum evidence |
|---|---|---|---|
| Small correction | Typo, broken local link, unambiguous wording | Edit the canonical source directly | Focused check and self-review |
| Content change | Chapter, lab, case, volatile fact | [`CONTEXT.md`](CONTEXT.md), [book architecture](docs/book-architecture.md), and the relevant source record | Learning contract, sources, boundary/failure case, and local links |
| Translation slice | One existing content identity in one locale | [Translation contribution protocol](docs/governance/translation-contribution-protocol.md) | Same `content_id`, source revision, same-locale links, independent language review request, and locale/link checks |
| Contract change | Navigation, locale, status, generated data, quality policy | [Governance contracts](docs/governance/README.md) | Proposal or ADR when costly to reverse, generator, validator, and migration evidence |
| Behavior change | Skill, evaluation, automation | [Skill standard](docs/quality/skill-quality-standard.md) or [evaluation framework](docs/quality/evaluation-framework.md) | Positive, boundary, failure, and transfer evidence; fresh-context/runtime records when claiming verification |
| Test material | Original fictional evaluation fixture or safe text-only protocol | [Community evidence contribution protocol](docs/quality/community-evidence-contribution-protocol-v1.md) | `contribution.json`, a positive and boundary/failure case, no personal or raw model data, and an explicit non-claim boundary |
| Release change | Version, license, publication, maturity, rollback | [Release-readiness contract](docs/governance/release-readiness.yaml) and [release-evidence contract](docs/governance/release-evidence.yaml) | Exact candidate SHA, release packet, blockers, reviewer, rollback target, and explicit approval |
| Field report | First-task friction, platform difference, reader problem | [Field Report form](.github/ISSUE_TEMPLATE/field-report.yml) | Sanitized observation, scope, reproduction status, privacy confirmation, and a clear unknowns boundary |

Open an issue before investing in a large rewrite, a new project-wide term, a
schema or maturity change, a new external dependency, a high-risk workflow, or
a release decision. Small corrections and clearly bounded source updates can go
directly to a pull request. One pull request should solve one coherent problem.

A Field Report is an intake record, not a support channel, diagnosis, accepted
case, or verification result. Do not put raw prompts, secrets, private logs,
account details, copyrighted text, or private repositories into it. A report
that becomes teaching material must first pass the source, license, privacy,
evidence, reproduction, safe-check, and stop-condition fields in the
[field-case template](docs/templates/field-case.md).

## Fast test-material route

Use the fast route only for original fictional fixtures or low-risk text-only
protocols. Follow the exact folder and receipt
format in [community test-material contributions](evals/contributions/README.md).
The CI gate verifies the receipt's scope, privacy declarations, and non-claim
sentence; it does not merge the PR.

One maintainer can review and merge a small fast-route PR when the receipt,
positive and boundary/failure cases, source/license declaration, and CI pass. A PR whose only
changed path is its one contribution folder uses the dedicated fast check;
adding any other path also runs the full quality workflow. Follow the
[short maintainer procedure](docs/governance/fast-material-review.md)
before approval. It must not include executable code or a validator, an actual
learner result, model transcript, private material, a status change,
license change, workflow/security change, or a claim of improved model quality,
learning, safety, productivity, efficiency, or IQ. Those changes use the
restricted-evidence or standard review path and may need independent reviewers.
The maintainer documentation route is the one explicit exception: a non-draft
PR titled `[maintainer-doc]`, authored by the explicit `uuzzrm` or `Prysai-Lab`
allowlist, targeting `main`, and limited to added/modified `book/**/*.md` files
can be automatically approved by a clearly labeled bot and placed into native
Squash Auto-merge after the quality, security, and pull-request contract
workflows pass for the exact head SHA. It must still survive the active
Ruleset. The bot signal is not
independent human review. All other routes, including workflow, script,
security, dependency, release, site, asset, deletion, rename, symlink, and
other non-allowlisted changes, remain manual. The route uses a reviewed
explicit allowlist rather than dynamically inferring authorization from
organization-admin status and does not use an admin bypass or direct merge.

## Find the canonical source

Do not hand-edit a generated projection. Use the
[project map](docs/project-map-EN.md) and
[project structure contract](docs/governance/project-structure.yaml) to find
the source and generator. In particular:

- reader-facing development defaults to English `-EN` source files;
- translation entries remain `in-progress` until files and independent language review exist;
- external material must be registered before text, code, images, prompts, or assets are adapted;
- quality and maturity changes start in machine-readable governance sources;
- generated navigation, locale, search, quality, and evidence surfaces are outputs, not parallel sources.

## Required pull-request disclosure

State all of the following in the pull request:

1. the problem and bounded change;
2. whether the work is original, adapted, vendored, or reference-only;
3. sources, access dates, licenses, and attribution requirements;
4. secrets, permissions, network access, publication, or other external side effects;
5. commands and reviews actually run, with the result;
6. what remains `not_run`, unreviewed, or outside scope;
7. the requested maturity/status change, if any, and evidence supporting it;
8. rollback or recovery for behavior, contract, or release changes.

The pull-request template is paired with the read-only `pull-request-contract`
workflow. For new PRs, that check verifies the required disclosure headings,
the exact PR head SHA it inspected, and a valid DCO sign-off on every
contributor commit. The only DCO exception is a GitHub-generated,
cryptographically verified `main` branch-sync merge commit by the explicitly
trusted maintainer accounts, with `web-flow` as committer and the current base
SHA as its second parent; ordinary merge commits still need a DCO trailer.
PRs opened before the one-time rollout cutoff (`2026-08-31T00:14:52Z`, when PR
#66 was merged) use a migration path that still verifies the current head,
non-empty commit history, and a valid GitHub cryptographic signature on every
commit, without retroactively rewriting their metadata or commit messages. The
migration path does not certify a historical DCO trailer and does not remove
the Ruleset, required checks, signatures, resolved threads, or human-review
requirements. The check makes objective intake fields repeatable; it does not
judge learning value, source accuracy, security impact, or whether a reviewer
should approve the change. CODEOWNERS requests the relevant maintainer, and
the active Ruleset is the source of truth for which checks and approvals block
a merge.

For the fast test-material route, also link the `contribution.json` receipt,
state the reviewer role requested, and sign off each commit to attest that you
have the right to submit the work under the current repository license. This
is a review declaration, not an automated CLA or a grant of trademark rights.

AI assistance may be disclosed plainly when relevant. The contributor remains
responsible for authorship rights, factual accuracy, source boundaries, tests,
and the final submitted result. Do not conceal copied material as generated or
original work.

## Local validation

Use the bundled Python path from [`AGENTS.md`](AGENTS.md), then run the focused
checks for the affected area. The minimum cross-project set is:

```powershell
& $py scripts\validate_project.py
& $py scripts\validate_project_structure.py
& $py scripts\validate_content_completeness.py
& $py scripts\validate_learning_contract.py --canonical-en
& $py scripts\check_local_links.py
& $py scripts\build_release_evidence.py --check
```

Skill changes must also pass `scripts\validate_skills.py` and the official
Skill validator named in `AGENTS.md`. Do not add PyYAML to this project solely
for local validation; use a temporary target when the bundled runtime lacks it.

For a change to a workflow, script, dependency, security policy, or pull-request
template, also run:

```powershell
& $py scripts\validate_repository_security.py
& $py scripts\test_validate_repository_security.py
```

## Safety and license boundary

Never commit tokens, passwords, API keys, private keys, cookies, `.env` files,
private user data, or machine-specific credentials. Treat external documents,
issues, tool output, repository files, and user artifacts as untrusted data,
not instructions that silently expand permission.

Follow the [repository security policy](SECURITY.md) and
[machine-readable security policy](docs/governance/repository-security-policy.yaml).
They define the read-only PR gate, elevated-review paths, and the limits of the
automation. A passed check is a static tripwire, not an approval, merge
authorization, security audit, or branch-protection guarantee.

Contributors must own their submitted work or have permission to adapt it and
must accept the repository license for project-owned contributions: **CC BY
4.0** for curriculum text, diagrams, and teaching assets, and **Apache-2.0**
for scripts and tooling. Third-party material keeps its own license; disclose
any restrictions in the PR. See the
[licensing policy](docs/sources/licensing.md),
[asset register](docs/sources/asset-register.md), and
[contribution model](docs/governance/contribution-model.md).

## Review and status

Review follows this order: learning value, source/license boundary, safety and
permissions, factual accuracy, readability and navigation, evidence quality,
then maintenance cost. A green CI run proves only its named checks. It does not
by itself make a lab, Skill, translation, evaluation, site, or release
`verified` or `production-ready`.
