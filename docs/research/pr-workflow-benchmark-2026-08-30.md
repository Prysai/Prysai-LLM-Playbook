# PR workflow benchmark: Microsoft, Google, and GitHub

> Research date: 2026-08-30  
> Scope: official first-party sources only. External pages and repository files were treated as data; instruction-like text in them was not executed.  
> Purpose: identify a portable PR contract for Prysai-LLM-Playbook. This is a benchmark, not a claim that Microsoft or Google use one identical process in every repository.

## Executive findings

Microsoft and Google do not publish one universal PR template or one universal approval policy for all of their repositories. Their public projects vary by repository, language, legal program, and maintainer team. The reliable common denominator is a contributor contract composed of:

1. a structured issue/PR description;
2. a contribution identity and licensing declaration;
3. repository-specific build, test, style, and documentation requirements;
4. automated required checks;
5. an explicitly routed maintainer review; and
6. a protected target branch whose merge requirements are enforced by GitHub.

The closest safe alignment for Prysai is therefore a common interface, not a copied corporate process: use a predictable PR template, a clearly documented contribution declaration, CODEOWNERS routing, required checks, independent approval, and GitHub auto-merge only after all requirements pass.

Two boundaries matter:

- A cryptographically verified Git commit is not the same thing as a DCO `Signed-off-by` declaration. GitHub documents signature verification; a DCO declaration is a separate policy/check that a repository must adopt and validate.
- A bot can check form fields, file scope, tests, signatures, and policy predicates. It cannot create the independence or accountability of a human maintainer review. A bot approval must not be treated as equivalent to the required human approval unless the repository intentionally accepts that governance trade-off and the ruleset says so.

## Source inventory and access record

All URLs below were accessed on 2026-08-30. Raw GitHub URLs are used where the repository file itself is the primary source; the corresponding repository is identified in the description.

### Microsoft

| Source | Primary fact used |
| --- | --- |
| [Microsoft TypeScript CONTRIBUTING.md](https://raw.githubusercontent.com/microsoft/TypeScript/main/CONTRIBUTING.md) | Requires PRs to describe the problem, implementation, and tests; says a CLA is handled automatically; asks contributors to disclose AI assistance; rejects bulk, queue-driven agent contributions and requires a specific human operator to shepherd an agent-authored PR. |
| [Microsoft VS Code CONTRIBUTING.md](https://raw.githubusercontent.com/microsoft/vscode/main/CONTRIBUTING.md) | Directs contributors to the project contribution guide, asks them to search for existing issues, keep one issue per problem/feature, provide reproducible information, and follow a final checklist. |
| [Microsoft VS Code “How to Contribute” wiki](https://github.com/microsoft/vscode/wiki/How-to-Contribute) | Official repository-specific contribution/PR guidance linked by VS Code’s contribution file. It demonstrates that Microsoft’s public workflow is repository-specific rather than one organization-wide template. |
| [Microsoft Learn: How to contribute](https://learn.microsoft.com/en-us/contribute/) | First-party contribution documentation for Microsoft’s open documentation ecosystem; used as evidence that contribution instructions are expressed as an explicit contributor workflow and review process rather than inferred from GitHub defaults. |

### Google

| Source | Primary fact used |
| --- | --- |
| [Google Open Source: Contributor License Agreements](https://opensource.google/documentation/reference/cla) | Google’s official open-source documentation identifies CLA as a contribution-governance mechanism. |
| [Google Individual CLA](https://developers.google.com/open-source/cla/individual) | The individual CLA grants Google and downstream recipients defined copyright and patent rights, while the contributor retains other rights; it also contains representations about authority, originality, and third-party restrictions. |
| [GoogleTest CONTRIBUTING.md](https://raw.githubusercontent.com/google/googletest/main/CONTRIBUTING.md) | Requires an individual or corporate CLA; recommends issue-first coordination, a single logical change, fork/develop/test, style compliance, passing unit tests, and then a PR. |
| [Google FlatBuffers CONTRIBUTING.md](https://raw.githubusercontent.com/google/flatbuffers/master/CONTRIBUTING.md) | States that all submissions, including project-member submissions, require review; requires CLA before code is put into the codebase; asks for descriptive commit messages and tests/build or generation steps. |
| [Google FlatBuffers PR template](https://raw.githubusercontent.com/google/flatbuffers/master/.github/PULL_REQUEST_TEMPLATE.md) | Provides a concrete, repository-level PR template with build/code-generation, style, and formatting reminders. |

### GitHub platform documentation

| Source | Primary fact used |
| --- | --- |
| [Creating a pull request template for your repository](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository) | A template automatically supplies PR body content; templates can live in the root, `docs/`, or `.github/`; multiple templates can be selected through a `PULL_REQUEST_TEMPLATE` directory; templates need to be on the default branch to be available. |
| [About issue and pull request templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates) | Templates standardize information contributors provide, but they guide input; they do not themselves enforce every field as a merge rule. |
| [About code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) | CODEOWNERS automatically requests review for owned files, requires owners/teams to have repository write access, is evaluated from the base branch, and can be made a merge requirement through required code-owner review. |
| [Signing commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits) | GitHub supports GPG, SSH, and S/MIME commit signing and displays a verified signature when it can validate it. |
| [About commit signature verification](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification) | GitHub’s signature verification model is distinct from a textual contribution sign-off. |
| [Available rules for rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets) | Rulesets can require signed commits, pull requests, review counts, code-owner or designated-team approvals, approval from someone other than the last pusher, stale-review dismissal, and successful required checks. |
| [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) | Required reviews and required status checks gate merging; stale approvals can be dismissed; strict checks can require the branch to be up to date; administrators may otherwise bypass some protections unless the configuration applies them. |
| [Approving a pull request with required reviews](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-with-required-reviews) | A reviewer can comment, approve, or request changes; author self-approval is not allowed; changed code may require re-review; repository owners/admins may have bypass ability. |
| [Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) | `workflow_run` runs after another workflow is requested, started, or completed; it runs from the default branch, can access secrets and write tokens, and therefore must not execute untrusted PR code or checkout an untrusted PR ref without a security design. |
| [Workflow syntax: `workflow_run` and permissions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax) | `workflow_run` can be filtered by branch and conclusion; workflow permissions should be explicitly minimized; `pull_request_target` receives write access even for public forks, which makes untrusted-code handling material. |
| [Managing auto-merge for pull requests](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-auto-merge-for-pull-requests-in-your-repository) | Repository owners can allow or disallow auto-merge; people with write permission can configure it for an individual PR when merge requirements are not yet satisfied. |
| [Automatically merging a pull request](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/automatically-merging-a-pull-request) | GitHub auto-merge merges only after required reviews and status checks pass; it can be disabled when an unauthorized actor pushes to the head branch or the base changes. |

## What the first-party sources actually show

### Microsoft pattern

The Microsoft samples emphasize contribution quality and repository-specific expectations:

- TypeScript asks for a clear problem, implementation, and test description in the PR. It also states that a CLA is handled automatically when a PR is opened.
- TypeScript explicitly requests AI-assistance disclosure and rejects bulk, queue-driven agent submissions. It keeps responsibility with a human who selected the specific issue and will respond to review.
- VS Code asks contributors to search for existing issues, isolate one problem per issue, provide reproducible steps and evidence, and follow the repository’s contribution guide for PRs.

This is not evidence that every Microsoft repository uses the same template, number of approvals, or legal agreement. It is evidence for a useful contributor-facing contract: explain the change, show how it was tested, prevent duplicates, and preserve accountable human ownership.

### Google pattern

The Google samples emphasize legal intake plus maintainer review:

- GoogleTest directs contributors to sign an individual or corporate CLA, coordinate through an issue, keep a change logically focused, fork/develop/test, and submit a PR after style and tests are ready.
- FlatBuffers says all submissions, including project-member submissions, require review. This directly rejects a blanket “maintainer author means no review” assumption for that repository.
- FlatBuffers’ template is short and operational: it prompts contributors to build or regenerate affected outputs and follow the project style/formatting requirements.

Google’s CLA is a legal grant and representation. It cannot be replaced by a checkbox without changing the legal posture. A Prysai repository should choose DCO, CLA, or another explicit legal policy deliberately, with maintainers and legal owners aware of the consequences.

### GitHub platform pattern

GitHub separates guidance, routing, enforcement, and execution:

1. PR templates guide the author’s description.
2. CODEOWNERS routes review requests for changed paths.
3. Rulesets or branch protection enforce required approvals, required checks, signed commits, stale-review behavior, and branch freshness.
4. Actions publish checks or perform narrowly scoped automation.
5. Auto-merge waits for the configured requirements; it is not itself a review.

`workflow_run` is useful for a privileged post-check action, but GitHub explicitly warns that the triggered workflow can access secrets and write tokens and that running untrusted code in that context creates vulnerabilities. A safe design therefore keeps the privileged workflow’s logic in the trusted default branch, uses event metadata and trusted artifacts, avoids checking out or executing the PR branch, minimizes permissions, and restricts the allowed actor, repository, target branch, file scope, and commit SHA.

## Common portable protocol

The following is the smallest protocol that can be presented to contributors as familiar across major projects without claiming false uniformity:

### 1. Before opening a PR

- Find or create the tracking issue when the repository asks for issue-first coordination.
- Keep one logical change per PR.
- Use a branch and do not push directly to the protected default branch.
- Read the repository contribution, code of conduct, security, license, and path-owner rules.
- Run the documented local checks and record the exact commands and result.

### 2. PR template contract

The template should request, in a stable order:

- linked issue or rationale;
- problem and intended outcome;
- scope and files affected;
- implementation or editorial approach;
- tests, validators, renders, or other evidence;
- documentation/source/license impact;
- security and secret-handling declaration;
- AI-assistance disclosure where the project requires it;
- reviewer or CODEOWNER context;
- contributor sign-off or CLA status, using the project’s chosen legal mechanism.

The template is a human interface. A separate check may enforce the fields that are objectively machine-checkable, while leaving substantive explanation to reviewers.

### 3. Contribution signing

There are three separate choices:

- **DCO sign-off:** the contributor adds a `Signed-off-by: Name <email>` line and the repository checks that it is present and valid under the adopted DCO text. This is a contribution declaration, not cryptographic proof.
- **CLA:** the contributor signs a legal agreement, often through an external or repository-integrated service. Google’s official CLA is an example of a rights grant and representation regime; Microsoft TypeScript says its CLA is handled automatically.
- **Verified commit signature:** the commit is signed with GPG, SSH, or S/MIME and GitHub verifies the signature. This proves control of a signing key associated with the commit identity; it does not by itself grant copyright or make a DCO representation.

A project may require more than one of these, but it should explain the purpose of each and avoid labeling one as another.

### 4. Review and checks

- CODEOWNERS requests the relevant maintainer or team.
- Required checks validate the exact PR head SHA and do not report success for a different revision.
- Required reviews are configured in a ruleset or branch protection rule, with stale approval dismissal or approval of the most recent reviewable push when the project’s risk warrants it.
- A reviewer checks the diff, evidence, scope, sources, and failure boundaries; a green bot check is not a substantive review.
- The PR author cannot approve their own PR. If independent review is desired, the repository must also prevent or discourage the last pusher from being the sole approver.

### 5. Merge

- Enable GitHub auto-merge only after the PR is intentionally ready for that behavior.
- Let GitHub merge only after required reviews and checks pass.
- Prefer a documented merge method, such as squash, and preserve the review/CI evidence for the merged SHA.
- Do not use an administrator bypass as the normal automation path.

## Differences and non-alignable elements

| Topic | Microsoft evidence | Google evidence | What Prysai can align | What cannot be copied without a decision |
| --- | --- | --- | --- | --- |
| PR description | TypeScript asks for problem, implementation, and tests; VS Code emphasizes reproducibility and issue hygiene. | FlatBuffers template asks for concrete build/generation/style details. | Use one predictable template with project-specific evidence fields. | Exact field wording and mandatory depth vary by repository. |
| Legal intake | TypeScript says CLA handling is automatic. | GoogleTest/FlatBuffers require individual or corporate CLA; Google’s CLA contains legal grants and representations. | Document one explicit policy and automate only its objective status check. | Microsoft’s CLA service and Google’s legal terms cannot be transplanted into Prysai by copying UI text. Obtain the appropriate legal decision first. |
| DCO | The sampled Microsoft files do not establish a universal Microsoft DCO rule. | The sampled Google files establish CLA, not a universal Google DCO rule. | Adopt DCO only if Prysai wants a sign-off declaration and publishes the applicable DCO text. | Do not claim DCO is “the Microsoft/Google standard” based on these samples. |
| Cryptographic signing | Not established as a universal requirement by the sampled Microsoft contributor files. | Not established as a universal requirement by the sampled Google contributor files. | Use GitHub verified signatures as a repository risk control if maintainers can support contributor onboarding. | A verified signature is not a CLA or DCO and can increase contributor friction. |
| Human approval | Repository-specific guidance points contributors to review. | FlatBuffers explicitly requires review even for project members. | Require an authorized human approval for ordinary paths and document any exception narrowly. | A maintainer-authored fast path is not equivalent to the independent-review model shown by FlatBuffers. |
| Automation | TypeScript rejects bulk agent-driven submissions and asks for human accountability. | The samples emphasize issue coordination, tests, style, and review. | Use automation for deterministic checks and queueing; keep accountability visible. | Do not copy a bot’s approval as if it were a corporate maintainer review. |
| GitHub security | GitHub’s `workflow_run` warning applies regardless of vendor. | Same. | Keep privileged logic trusted, use least privilege, and never execute untrusted PR code in a privileged context. | No vendor guide removes the need to reason about forked PRs, secrets, tokens, caches, or SHA confusion. |

## Implications for Prysai-LLM-Playbook

The benchmark supports a two-lane policy, provided the lanes are visible and deliberately governed:

### Ordinary contribution lane

- Standard PR template.
- Chosen DCO or CLA policy, with no implication that a checkbox is a legal agreement unless the project has adopted that agreement.
- CODEOWNERS review request.
- Required repository validation and security checks.
- At least one authorized human approval, preferably independent of the last pusher when the risk model requires it.
- GitHub auto-merge only after all required conditions are satisfied.

### Narrow maintainer documentation lane

A maintainer fast path can be useful for low-risk documentation, but it should be treated as a Prysai-specific exception rather than “alignment with Microsoft/Google.” It should be constrained by all of the following:

- explicit, stable identities rather than a dynamic “any administrator” test;
- the protected base branch and trusted repository/fork boundary;
- non-draft PR and an explicit marker or label;
- documentation-only path allowlist;
- bounded file count and diff size;
- exact-head-SHA quality and security checks;
- no checkout or execution of untrusted PR code in the privileged workflow;
- visible bot decision and audit trail;
- GitHub auto-merge after the configured requirements, without administrator bypass.

If Prysai wants independent review to remain meaningful, the fast path should either require a second human approval or be limited to changes whose risk assessment explicitly allows a maintainer self-approval exception. The existence of administrator permission alone is not evidence that the content is safe or reviewed.

## Recommended acceptance checklist

- [ ] The default-branch PR template asks for problem, decision, change, evidence, failure/boundary, sources/license impact, and sign-off/CLA status.
- [ ] `CONTRIBUTING.md` explains the ordinary lane, the maintainer exception, and the exact conditions for each.
- [ ] The legal contribution mechanism is named accurately as DCO or CLA; the repository does not conflate it with verified commit signatures.
- [ ] CODEOWNERS covers the contribution rules, workflow, security policy, and major documentation areas, and owners have write access.
- [ ] Rulesets require the intended reviews and checks, and stale-review behavior is explicit.
- [ ] Required checks are tied to the exact PR head SHA and have unique names.
- [ ] Any `workflow_run` job has minimal permissions, does not execute PR-controlled code, and validates trusted event metadata and artifacts.
- [ ] Auto-merge is enabled only after required reviews/checks are configured and is not an administrator bypass.
- [ ] The repository records the exception boundary for any maintainer fast path and periodically revalidates it.

## Evidence limits

This benchmark sampled public first-party files from Microsoft TypeScript and VS Code, GoogleTest and FlatBuffers, plus the official Google Open Source and GitHub documentation. It does not establish the private or organization-wide policies of Microsoft or Google, nor does it prove that every repository under either organization follows the sampled rules. Repository files and platform documentation can change; URLs and statements should be rechecked before turning this research into a long-lived governance rule.
