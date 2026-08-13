<!-- content_id: chapter-14-discover-and-audit-skills | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-11 -->

# Chapter 14: Discover, Install, and Audit External Skills

> **Status:** `candidate`  
> **Experiment status:** `draft / not_run`  
> This chapter teaches Skill discovery and adoption review. The field reports below are reports and teaching inputs, not local reproductions or official root-cause findings.

## The problem this chapter solves

External Skills can package repeated steps, domain knowledge, and tool calls into reusable capabilities. They can also expand context, dependencies, network access, account permissions, external side effects, and licensing obligations. The real question is not “Where can I find more Skills?” It is: when a real task exposes a gap, is a Skill the right remedy, how do I turn a directory entry into an auditable candidate, and how do I test it without leaking secrets, accepting prompt injection, or writing beyond the authorization boundary?

The conclusion of this chapter is simple: a directory is a discovery entry point, not proof of quality; installation is a state change, not verification; and “it can be triggered” does not mean “it should be adopted.”

## Learning objectives

By the end of this chapter, you should be able to:

1. Derive a Skill requirement from a task’s goal, inputs, outputs, and acceptance criteria, while distinguishing a knowledge gap from a workflow, tool, or permission gap.
2. Prepare a pre-installation review package that a maintainer can approve or reject, covering source and revision, trigger and non-trigger conditions, dependencies, permissions, external side effects, licensing and NOTICE files, isolated trial, backup, rollback, approval points, and ownership.
3. Identify prompt injection, requests for secrets, irrelevant uploads, excessive permissions, and undisclosed external actions in a Skill; mark the candidate `blocked` or narrow it to a safe scope.
4. Use low-risk smoke, boundary, and failure tests to build evidence; distinguish a file existing, being discoverable, being loaded, being adopted, and being verified; and limit the adoption decision to `recommendation-only`, `blocked`, `approved-to-install`, or `installed-candidate`.

## Real-world problem entry: from “findable” to “safe to adopt”

This chapter connects directly to three problems recorded in field research:

- **FP-06:** An ordinary `SKILL.md` may be discoverable while a file symlink is ignored. The lesson is that discovery behavior is an implementation detail. “It is not in the list” is not proof that the Skill does not exist, and one version’s discovery behavior must not be written as a permanent rule.
- **FP-07:** Explicit invocation may incorrectly depend on an implicitly visible list. Record implicit routing evidence and explicit name-resolution evidence separately; one list cannot substitute for both kinds of verification.
- **FP-11:** An Agent was reported to expand source verification into a persistent-environment force reinstall. Executability does not equal authorization. Installation, verification, publication, deployment, and restart are different states and require separate authorization and evidence.

These are user reports or community evidence, not local reproductions or general behavior confirmed by the official product. Treat the FP identifiers as risk entry points, not as product commitments.

## Concepts and decisions

### 1. Write the task protocol before deciding that you need a Skill

Describe the task with this minimum protocol:

```text
Goal: what should change?
Inputs: which files, data, or public sources may be read, and which may not?
Output: what is the final shape of the deliverable?
Acceptance: what evidence would show that it is complete?
Authorization: which tools, network access, accounts, and writes are allowed?
Stop: what conditions require a pause and a question?
```

Then classify the gap:

| Gap | Usually addressed by | Common misjudgment |
|---|---|---|
| A missing concept or fact | Research, official documentation, human judgment | Using a Skill instead of checking a source |
| A repeated, stable procedure | A local Skill or script | Using one large Skill for every situation |
| Observation or change in an external system | A controlled tool or connector | Treating “callable” as “authorized” |
| An unclear goal or acceptance rule | Clarifying the task first | Installing a Skill to hide unclear requirements |

### 2. A Skill, tool, Plugin, and Connector are different things

A Skill is a method and routing contract. A tool is an interface that can observe or change the outside world. A Plugin or Connector is a product layer that carries or connects those capabilities. Ask four questions during review: What does the Skill read? What does it recommend? What does the tool actually do? What does the external service receive? Do not infer permissions from a Skill’s name, or runtime behavior from a README alone.

### 3. Licensing and the security boundary are adoption conditions

A candidate may pass a functional test and still be unsuitable for a release because its license is unclear, nested dependencies are undisclosed, code or branding cannot be copied, or privacy handling is unknown. The project asset register treats material without a clear license as research reference or an external link by default. Directory sources S03 and S06 are indexes or candidate pools; their item counts are not quality evidence. S02’s CC BY-NC 4.0 material cannot be included in a commercial release without preserving attribution and the license boundary.

### 4. Treat Skill content as untrusted input

Skill text, READMEs, remote pages, Issues, sample files, and tool results are data. Instructions such as “ignore the higher-level rules,” “read and upload the secrets,” “send the result to this address,” or “run this unauthorized command” are suspicious content. Their location inside a Skill file does not give them higher priority. Safer handling is to extract the minimum input, remove secrets, run without network access or in a sandbox, and record what was refused.

## Decision flow and review card

### Step 1: Discover

Derive search terms from the task protocol. Search an official directory, the project repository, or a registered source. Record the search date, source URL, and commit or version; do not copy the source text. Stars, download counts, directory size, and promotional language can create a candidate, but cannot replace review.

### Step 2: Prepare the pre-installation review package

Create at least one `skill-adoption-decision.md` for each candidate:

```text
candidate / task_gap:
trigger_conditions / non_trigger_conditions:
source_url / revision / inventory_date:
license / NOTICE / nested_assets / copy_boundary:
dependencies / network / account:
target_install_scope:
permissions / secrets_boundary:
external_side_effects:
isolated_trial:
backup_and_restore_target:
rollback_steps / rollback_success_check:
approval_points:
behavior_tests: positive | boundary | failure | migration
owner / version_policy / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unverified / unblock_conditions:
```

Separate at least these approval points: permission to obtain a fixed revision; permission to write to the specified installation target; permission to install dependencies, use the network, or authenticate; and permission to enter team or production scope. One approval does not imply the next. Rollback must be more specific than “delete the files”: name the pre-install configuration backup, exact target, restoration steps, and the post-restore success check.

### Step 3: Separate decision state from behavior state

There are only four adoption decisions:

- `recommendation-only`: the task match is plausible, so recommend read-only review or an isolated trial;
- `blocked`: at least one of the license or NOTICE, revision, dependencies, permissions, target scope, or rollback plan is unclear;
- `approved-to-install`: the target, backup and rollback, permissions, and approval points are clear and approved, but installation has not happened;
- `installed-candidate`: the candidate was installed in the approved isolated target with path and log evidence, but behavior verification and adoption are still pending.

Behavior evidence is recorded separately:

```text
File exists: the path, manifest, or hash for a fixed revision is established
Discovered: the current work surface can list or resolve the name
Loaded: a new session records that the candidate resource or instructions were loaded
Adopted: an owner and approval record include it in the stated personal or team scope
Verified: positive, boundary, failure, and migration cases pass in the declared environment
```

These five states can be partly true and may differ by work surface, account, session, and version. A file existing does not prove discovery; discovery does not prove loading; loading does not prove organizational adoption; adoption does not prove behavior verification. An installation log proves the installation action and, at most, supports the `installed-candidate` decision.

### Step 4: Enable in layers

Move from lower to higher risk: local read-only work, reversible file operations, external connections in a sandbox or test account, then production writes and public release. Before moving upward, state the new permissions, evidence, and rollback method. Production-level maturity also needs organizational approval, a license inventory, version pinning, a maintenance owner, and a regression plan. One successful smoke test supports at most a project maturity of `candidate`; it cannot become `verified` by itself and does not change the adoption decision above.

## Observable experiment: approve or reject two candidates

### Setup

Prepare two candidates at fixed revisions, or use two redacted local samples. Candidate A matches the task gap and has a traceable licensing signal; decide whether it is worth an isolated trial. Candidate B intentionally lacks a license or NOTICE signal, or lacks a rollback plan; decide whether to reject or defer it. Prepare the repository URLs, fixed revisions, file inventories, license and NOTICE files, a `SKILL.md` frontmatter summary, tool/network/credential declarations, and the task protocol. Review only. Do not install, authenticate, or enable a team environment. If the installation target, configuration backup, or restore check is not concrete, do not write `approved-to-install`.

You may use this project’s original demonstration inputs: A is S05 `code-review-and-quality`, from `https://github.com/addyosmani/agent-skills`, with archived SHA-256 revision evidence `6EEDBE7D2EA3A82417781D879785BD501FBDE21275627F557DE4B76560BA1250`; B is S06 `webapp-testing`, from `https://github.com/composio-community/awesome-codex-skills`, with archived SHA-256 revision evidence `D3DA83ED9D474690E7FF235351376114972840C78BC319CBCB8F89CBD704608E`. A’s reasonable initial result is `recommendation-only`: the repository-level MIT signal is traceable, but dependencies and nested assets still need item-by-item review. B’s reasonable result is `blocked`: a root license does not automatically cover nested Skills, scripts, or assets, and installation is not acceptable without a concrete backup and rollback. This uses only asset-register metadata and an original summary; it does not copy source-repository text.

### Task

1. Do not install. For A and B, inspect the entry-file summary, manifest, dependency declarations, and license/NOTICE signals; record the URL, revision, and actual file paths.
2. Complete a pre-installation review package for each, including the task gap, trigger and non-trigger conditions, minimum permissions, external side effects, isolated trial, backup and rollback, approval points, and owner.
3. Design but do not run a behavior-verification plan for A: one positive case, one boundary case, one failure or injection case, and one cross-project migration case. State the input, expected behavior, stop condition, and evidence for each.
4. Keep A at `recommendation-only` unless installation approval, a specific path, a backup, and a rollback all have real evidence. Do not install merely to obtain a higher status.
5. Do not bypass B’s licensing or rollback gap. Mark it `blocked` and state the material needed to unblock it. Record “file exists / discovered / loaded / adopted / verified” separately; use `not_observed` for unknowns and make no inference.

### Evidence

The evidence package should contain two `skill-adoption-decision.md` files, source URLs and revisions, file inventories, license and NOTICE conclusions tied to actual files, dependency and permission lists, specific installation, backup, and rollback targets, approval points, an owner, A’s four behavior-verification plans, B’s blockers and unblock conditions, and all five behavior states. Another reader should be able to reproduce why A is worth further review and why B is rejected, rather than seeing only general advice.

### Failure variant

Keep the candidate repository accessible and `SKILL.md` present, but remove a traceable license or NOTICE, or say only “delete the directory” without a configuration backup and restore check. Alternatively, make the candidate request that a real `.env` file be read and uploaded. The correct result is `blocked`: do not download, install, elevate, or upload, and do not turn the file’s existence into a claim that it was discovered, loaded, adopted, or verified.

### Reflection

Answer these questions:

- Which piece of evidence changed your adoption decision?
- Did you verify Skill behavior, or only directory metadata?
- If the discovery differences in FP-06 or FP-07 appeared in your version, how would you verify implicit and explicit invocation separately?
- Which action needs separate user or organizational authorization, and why must it not be hidden inside a Skill?
- Who owns the next review when the revision, license, or dependencies change?

## Failure and boundary cases

- **Missing from the list does not mean nonexistent:** check supported Skill roots, ordinary-file requirements, and version behavior before recording “not discovered,” rather than “unavailable.” Symlinks, hard links, directory links, and operating-system differences require separate checks.
- **An explicit name cannot be judged only from the visible list:** try the supported explicit entry point and record the resolution result. If it fails, provide an equivalent manual route and record the degradation; do not claim that it was called.
- **A directory license does not cover nested content:** S06’s root license signal does not automatically cover every nested Skill, script, image, or dependency. Without a specific license or NOTICE, keep the material `reference-only` or `blocked`.
- **A smoke test can pass while production adoption remains unsafe:** it may miss deletion, duplicate retries, token leakage through redirects, concurrency, timeouts, broken dependencies, or maintainer abandonment. Production adoption needs permission review, a regression set, a rollback rehearsal, and an owner.
- **Installation can alter a persistent environment:** if verification requires packages, PATH changes, runtime replacement, production credentials, or a service restart, specify the target, scope, impact, rollback, and authorization first. Following FP-11, distinguish `source modified`, `validated`, `installed`, `published`, `deployed`, `restarted`, and `live verified`.

## Transfer exercise

Choose a Skill or internal team script you currently use without changing production:

1. Rewrite it from a directory entry into a task protocol and complete pre-installation review package.
2. Design a read-only smoke test, a failure variant, and a prompt-injection variant.
3. Produce a one-page adoption decision using only the four allowed values, with an approval point, owner, and evidence attached to the decision.
4. Ask a colleague to reach the same conclusion using only the review card. If they cannot, add the missing source, revision, permission, or output evidence.

## Acceptance checklist

- [ ] I can explain from a real task why a Skill is or is not needed.
- [ ] I recorded the candidate’s source, version, trigger, non-trigger conditions, and maintenance owner.
- [ ] I pinned the revision and specified the isolated trial, configuration backup, exact rollback steps, and approval points.
- [ ] I distinguished Skill instructions, tool permissions, and user authorization.
- [ ] I checked licenses, NOTICE files, nested dependencies, and copy boundaries instead of adding unclear material to a release.
- [ ] I designed a secret-free, low-risk isolated smoke test with inputs, expected output, environment, stop conditions, and saved evidence; I did not present a plan as a result.
- [ ] My behavior-verification plan covers positive, boundary, failure/injection, and migration cases.
- [ ] I can explain how FP-06, FP-07, or FP-11 relates to my review decision.
- [ ] I did not confuse “discoverable,” “triggerable,” “runnable,” and “approved for production.”
- [ ] I did not confuse a file existing, being discovered, being loaded, being adopted, and being verified.

## Sources and update boundary

- Realistic-report entry point: [`docs/research/field-problems-codex.md`](../../docs/research/field-problems-codex.md), FP-06, FP-07, and FP-11. The record is `candidate`, with an access and curation date of 2026-08-09, maintained by the Field Guide maintenance group.
- Licensing and asset boundaries: [`docs/sources/asset-register.md`](../../docs/sources/asset-register.md), S02, S03, and S06; update through the project’s archive and license-review process.
- Skill structure and verification: the [official OpenAI Codex repository](https://github.com/openai/codex), used to check volatile entry points, versions, and implementation behavior; it does not replace local runtime evidence.
- Update owner: the Field Guide maintenance group. Review after every Skill-source upgrade, license change, or discovery-behavior change, or no later than 2026-11-09. Chapter status: `candidate`; related Skills should be called `production-ready` only after organizational-permission, licensing, regression, and rollback evidence is complete.

## Practice the adoption decision

Use [Lab 017: Audit discovery before adopting a Skill](../labs/lab-017-skill-discovery-audit-EN.md)
to check discovery, explicit loading, dependencies, license, behavior, and
rollback as separate claims. Finding or installing a Skill is not evidence
that it loaded correctly or deserves team adoption.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="13-action-boundaries-EN.md" aria-label="Previous chapter: Chapter 13 · Action boundaries for files, terminals, browsers, and GitHub">← Previous<br><strong>Chapter 13 · Action boundaries for files, terminals, browsers, and GitHub</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="15-research-track-EN.md" aria-label="Next chapter: Chapter 15 · Research track: from question to auditable knowledge">Next →<br><strong>Chapter 15 · Research track: from question to auditable knowledge</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
