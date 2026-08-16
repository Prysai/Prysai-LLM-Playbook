# GitHub Pages host-governance boundaries for a private candidate: source receipt

**Status:** candidate research record / `not_run`
**Accessed:** 2026-08-15 (America/Los_Angeles)
**Owner:** governance-maintainer
**Next review:** 2026-09-15, or before a Pages visibility, publishing-source,
workflow-permission, environment, branch-rule, or CODEOWNERS decision.

## Research question and scope

Which GitHub-controlled documentation conditions should remain explicit when a
**private candidate repository** is merely considering a GitHub Pages
deployment?

This receipt is limited to three seams:

1. GitHub Pages site visibility and the difference between a source
   repository's visibility and a future site's access boundary;
2. custom Pages workflow permissions, deployment environments, and review or
   protection rules; and
3. the distinct scopes of `CODEOWNERS` review routing and protected-branch
   merge rules.

It is a source record, not a GitHub-settings audit. No repository setting,
organization plan, visibility change, Pages configuration, workflow execution,
environment, reviewer, branch rule, ruleset, `CODEOWNERS` file, deployment,
domain, URL, artifact, or access attempt was inspected or changed for this
record.

## Overlap and distinct delta

Before writing, this research inspected `docs/research/` and the existing
[GitHub Pages eligibility record](github-pages-eligibility-2026-08-11.md) plus
[GitHub Actions release-evidence facts](github-actions-release-evidence-facts-2026-08-12.md).
Those earlier records cover repository-specific historical eligibility evidence
and selected Action dependency versions.

This receipt does not repeat that API observation, eligibility conclusion,
build-artifact discussion, or dependency inventory. Its narrow delta is the
**host-side governance boundary**: site audience is a separately configured
condition; a deployment workflow can have scoped permissions and an
environment; and review routing is not the same as an enforced merge gate.

## Evidence classes

| Evidence class | Meaning in this receipt | Does not establish |
| --- | --- | --- |
| `official documentation fact` | A condition stated by the linked GitHub Docs page within that page's product and plan scope. | The setting, entitlement, behavior, or outcome of this repository, organization, workflow, site, or URL. |
| `project governance mapping` | An original Prysai mapping from an official condition to an existing local governance location. | A required host configuration, a completed review, an enabled control, or a release decision. |
| `not_run` | No live GitHub deployment or access test occurred. | Permission effectiveness, reviewer action, merge prevention, deployment success, URL reachability, confidentiality, or security. |

## Official conditions kept in their documented scopes

### 1. Private source and site audience are separate decisions

GitHub's Enterprise Cloud documentation says that an organization must use
GitHub Enterprise Cloud to publish a Pages site privately. For an organization
using Enterprise Cloud without Enterprise Managed Users, it describes a choice
to publish an organization project site privately or publicly to people on the
internet, and scopes access control to eligible project sites published from
organization-owned private or internal repositories [O1].

This is an Enterprise Cloud documentation boundary, not a statement about any
Prysai entitlement or site. It supports recording a future **site audience and
access decision** separately from a source-repository visibility decision. It
does not establish whether any Pages URL exists, who could access one, which
plan applies, or whether a proposed audience is appropriate.

### 2. A custom Pages deployment has permission and environment conditions

GitHub's custom-workflow documentation says that the job using the
`deploy-pages` action needs at least `pages: write` and `id-token: write`
permissions. The same page says that an environment must be established to
enforce branch/deployment protection rules, names `github-pages` as the default
environment, and documents an optional workflow output field for the page URL
[O2].

GitHub's environment documentation states that a job referencing an environment
must satisfy that environment's protection rules before it runs or accesses the
environment's secrets. It documents required reviewers as one protection rule,
with optional self-review prevention, and also documents deployment branch and
tag restrictions [O3].

These are configuration conditions in the named GitHub surfaces. A permissions
block, an environment name, an approval control, or an output field does not
by itself establish a successful Pages deployment, an accessible URL, a review,
or a protection rule that applies to this repository.

### 3. `CODEOWNERS` routes review; protected-branch rules create a merge gate

GitHub documents that code owners are automatically requested for review when a
non-draft pull request changes code they own, and that the `CODEOWNERS` file
must be on the pull request's base branch for those requests. Its documentation
also directs repository administrators to enable **Require review from Code
Owners** in branch protection when approval by code owners is to be required
before merge [O4].

GitHub's protected-branch documentation describes branch rules that can require
approvals, code-owner reviews, and successful status checks before a pull
request is merged into a protected branch. It separately describes default
force-push and deletion restrictions for a matching protected-branch rule [O5].

The narrow governance distinction is therefore: a path pattern in a
`CODEOWNERS` file is review-routing information; a host-side protected-branch
rule is the separately configured condition that can make qualifying review or
checks a merge requirement. This is not evidence that either artifact or rule
exists, applies to `main`, covers a particular path, or prevents a direct push
in this project.

## Narrow Prysai governance mapping

No local governance file is changed by this receipt. If a future Pages proposal
is authorized, keep these evidence types in their existing owners rather than
turning a local build check into host-configuration evidence:

| Existing governance location | Narrow relationship to this source record | Boundary |
| --- | --- | --- |
| [`docs/governance/release-evidence.yaml`](../governance/release-evidence.yaml) | Receives candidate and artifact evidence. A future host deployment needs separate evidence of the declared audience, deployment run, and actual URL access boundary. | This record does not supply any of that evidence. |
| [`docs/governance/release-readiness.yaml`](../governance/release-readiness.yaml) | Owns the project release decision, release evidence, and rollback boundary. | Official GitHub documentation cannot mark the repository ready or create a rollback target. |
| [`docs/governance/repository-security-policy.yaml`](../governance/repository-security-policy.yaml) | Owns local workflow-permission and host-enforcement policy boundaries. | A static policy or this research receipt cannot inspect, create, or prove a GitHub environment, branch rule, ruleset, reviewer, or token grant. |
| [`docs/governance/contribution-model.md`](../governance/contribution-model.md) | States local contribution-review expectations. | Local review expectations do not establish that GitHub has enforced a CODEOWNERS or protected-branch requirement. |

The next decision, if one is ever proposed, is limited to selecting one
explicit site-audience/access requirement and one independently checkable host
evidence plan. This receipt neither selects an audience nor authorizes a
settings change.

## Explicit non-claims

This receipt does **not** establish that:

- Prysai LLM Playbook has GitHub Pages enabled, a publishing source, a deployed
  artifact, a Pages URL, a custom domain, HTTPS, a public site, a private site,
  or an accessible site;
- the repository or organization has a particular GitHub plan, Enterprise
  feature, Pages entitlement, access-control option, or audience policy;
- a workflow has `pages: write`, `id-token: write`, or any other permission;
  an environment exists; any deployment has been approved; or an environment
  secret was accessed;
- a `CODEOWNERS` file exists, its patterns match a path, a review was requested
  or approved, a branch is protected, a ruleset is enforced, status checks are
  required, or force pushes/direct pushes are blocked;
- the cited controls are sufficient for security, privacy, access control,
  regulatory compliance, release readiness, rollback, or safe publication; or
- GitHub Docs describe all plans, products, organizations, repository types,
  future versions, or custom integrations identically.

## Source ledger and reuse boundary

All sources below are GitHub Docs pages controlled by GitHub and were accessed
on **2026-08-15 (America/Los_Angeles)**. They contain volatile product,
plan, entitlement, workflow, and settings information; their scope must remain
attached to every reuse.

| ID | Evidence class | Canonical GitHub-controlled source | Scoped support in this receipt | Does not prove |
| --- | --- | --- | --- | --- |
| O1 | official documentation fact | GitHub Docs, [Changing the visibility of your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site) | Enterprise Cloud conditions for private Pages publishing and organization project-site public/private access control. | A project plan, source visibility, Pages setting, URL, or actual audience. |
| O2 | official documentation fact | GitHub Docs, [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) | Documented custom-workflow deployment permissions, environment condition, and optional URL output. | A valid workflow in this repository, a deployment run, environment protection, or a reachable URL. |
| O3 | official documentation fact | GitHub Docs, [Managing environments for deployment](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments) | Environment protection conditions, including required reviewers and branch/tag restrictions. | That an environment, reviewer, restriction, secret, or deployment exists here. |
| O4 | official documentation fact | GitHub Docs, [About code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) | Base-branch scope for review requests and the separate branch-protection option to require code-owner review. | That code ownership is configured, a request was sent, or review is enforced. |
| O5 | official documentation fact | GitHub Docs, [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) | Review, check, code-owner, force-push, and deletion behavior when a matching protected-branch rule is configured. | A branch rule's availability, configuration, enforcement, or effect in this repository. |

This is original Prysai source-record wording. It retains only short factual
summaries and links; it does not copy GitHub Docs prose, screenshots, product
assets, workflow templates, credentials, tokens, configuration files, or
account data. The linked material remains reference-only under its owner's
terms. No external asset, dependency, license grant, or GitHub setting is
introduced by this receipt.

## Volatility and review trigger

- `volatile_facts`: Pages plan and visibility conditions; access-control scope;
  custom-workflow permission requirements; environment protection behavior;
  branch-protection availability and defaults; CODEOWNERS review semantics.
- `review_owner`: governance-maintainer.
- `review_trigger`: GitHub Docs change; a plan/entitlement change; a proposed
  Pages publication; any workflow permission/environment change; a proposed
  branch rule, ruleset, or CODEOWNERS change; or a release-readiness review.
- `next_smallest_check`: If a future deployment is approved, separately record
  the proposed audience, source/publishing path, exact workflow commit,
  declared permissions, environment and reviewer evidence, protected-branch
  scope, completed deployment run, URL access observation, and rollback
  decision. Do not infer any missing item from this research receipt.

