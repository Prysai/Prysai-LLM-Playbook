# Chapter 22: Continuous Update and Future-Proofing

> `content_status: candidate`
> `experiment_status: draft / not_run`
> The exercise runs only in a disposable copy or isolated branch. It uses no production access, real credentials, push, release, or bulk external replacement.

## The problem this chapter solves

Codex entry points, models, reasoning settings, permissions, Skill distribution, and external services can change. A workflow that works today can become misleading months later if it has no source, scope, review date, migration plan, or rollback path. Continuous maintenance is not a race to adopt every new feature. It is a disciplined way to decide what is stable, what is volatile, what must be rechecked, and when an old version should be retained, blocked, migrated, or retired.

## A real-world problem entry

FP-01, involving an authentication-flow regression, FP-06, involving Skill discovery boundaries, and FP-10, involving a validation command that may appear to stall, are public user reports. They do not replace current first-party documentation or local reproduction. They are useful prompts for practicing impact analysis, version decisions, stopping, and rollback.

## Learning objectives

By the end of this chapter, you should be able to:

- separate stable principles, product usage, domain methods, and instance facts;
- record each volatile claim with `claim`, source, access date, scope, owner, review date, and `claim_status`;
- build an impact matrix and a minimum migration and rollback plan when a model, tool, or Skill changes;
- distinguish `current`, `stale`, `disputed`, and `removed` from `draft`, `candidate`, `verified`, and `production-ready`;
- use evidence and maintenance responsibility to decide whether to retain, update, block, migrate, or retire a capability.

## Concept: four layers with different lifetimes

| Layer | Examples | Maintenance method |
|---|---|---|
| Stable principles | Context affects understanding; tools change the action space; evidence supports a completion claim | Teaching, experiments, and boundary review |
| Product usage | Codex entry points, Skill invocation, permission modes, configuration | Recheck against the specific first-party page |
| Domain methods | Engineering, research, marketing, documentation, and data workflows | Practice tasks and human review |
| Instance facts | Model IDs, prices, quotas, parameters, and third-party API behavior | Bind to a dated source; migrate or remove when necessary |

“The fact is current” is not the same as “the chapter is verified.” Keep the namespaces explicit:

- content maturity uses `content_status: draft | candidate | verified | production-ready`;
- volatile claims use `claim_status: current | stale | disputed | removed`;
- execution observation uses `planned | authorized | executed | verified | not_run`.

## Decision: update, retain, block, or retire

| Evidence situation | Claim status and action | Exit condition |
|---|---|---|
| An authoritative source remains available, scope still matches, and relevant evaluation passes | `current`; retain or update the explanation | Source, review date, and affected consumers are recorded |
| Sources conflict, account scope is unclear, or observed behavior conflicts with the source | `disputed`; suspend definitive wording | Mark the unknown and assign a review owner; do not publish a firm conclusion |
| The source is unavailable and no replacement evidence exists | `stale`; warn or temporarily block | Do not present the old claim as current |
| License or security conditions no longer permit the capability and no safe alternative exists | `removed`; retire it | Preserve migration notes and recovery information |
| A compatible replacement exists and migration plus evaluation pass | `current`; publish a migration note | State the old scope, replacement path, evidence, and next review |

Finding a change does not justify a full rewrite. First map the impact. A change without an owner, evidence, or rollback target is `blocked`.

## Action: claim records, impact matrices, and update flow

Use stable fields for every volatile fact:

```yaml
claim: "The current claim"
source: "Official or other authoritative URL"
checked_at: "YYYY-MM-DD"
applies_to: "Product, version, region, account, or organization scope"
owner: "Maintainer or team role"
next_review: "YYYY-MM-DD"
claim_status: "current | stale | disputed | removed"
```

The update flow is:

```text
discover change
    → classify impact and risk
    → locate affected chapters, Skills, labs, task sets, prompts, and permissions
    → read the source or collect bounded runtime evidence
    → make the smallest safe change
    → rerun relevant checks and evaluations
    → obtain fresh-context review
    → release, retain the old version, migrate, block, or retire
```

For a model or Skill migration, recheck the task set's first-pass behavior, error types, context, tools, permissions, triggers, output format, license, maintainer, and failure recovery. A source refresh updates a claim within its scope; it does not prove account-level access, runtime behavior, deployment, or team outcomes.

## Experiment: process a hypothetical product change

This is a disposable, reversible update drill. It is not an operation on a real product.

### Setup

In a temporary copy or isolated branch, create fixture `update-impact-demo-v1` containing only this redacted claim:

```yaml
claim: "The example tool entry was described as supporting action X on 2026-08-01"
source: "https://example.invalid/public-doc"
checked_at: "2026-08-01"
applies_to: "Example learning fixture only; not a real product claim"
owner: "exercise maintainer"
next_review: "2026-11-01"
claim_status: "disputed"
```

`example.invalid` is deliberately unavailable. The initial claim must therefore remain `disputed`: do not access it, execute its instructions, or treat it as real product evidence. Save the target-file SHA-256, baseline directory inventory, pre-change diff, and run ID. Do not access production, use real credentials, push, release, run a bulk replacement, or connect to an external service.

### Task

Assume that a maintainer receives a notice that the public description of action X changed, but has no second trusted source. In the temporary copy only:

1. Keep the claim `disputed` and suspend definitive teaching wording.
2. Create an impact matrix with at least these rows:

   | Consumer | Affected content | Risk | Required action | Evidence | Owner | Status |
   |---|---|---|---|---|---|---|
   | Chapter | Claim and example | Reader misunderstanding | Minimal rewrite | Source or diff | Content maintainer | pending |
   | Skill | Trigger or output | Wrong action | Stop or migration | Evaluation log | Skill owner | pending |
   | Lab | Input or pass criterion | Invalid comparison | Update fixture | Run ID or score | Evaluation owner | pending |
   | Permission note | Scope or approval | Excess authority | Static review | Permission matrix | Security owner | pending |
   | Task set | Task or prohibited action | Regression gap | Create a new version | Task result | Evaluation owner | pending |

3. Change only the necessary claim status and explanatory note in the paper fixture. Do not write unverified replacement behavior as fact.
4. Run only the relevant configured checks or static checks, and record the command, exit code, and output. If nothing runs, write `not_run`.
5. Record `run-id: 22-update-impact-demo-v1-01`, before/after diff, unverified items, and rollback action. Complete the update decision card.

The decision card must include `decision_owner`, `delivery_target` (temporary copy only for this exercise), `reviewer`, and `rollback_target`. If any field is missing, keep the status `blocked`; a paper status change is not a completed update loop.

### Evidence gate

The evidence package must contain the claim YAML, source snapshot or unavailable-source record, access date and scope, impact matrix, before/after hashes, diff, check output, reason for the status transition, unverified-items list, owner, next review date, and rollback instructions. Count ten required items: claim, source, scope, owner, `next_review`, baseline hash, after hash/diff, impact matrix, validation log, and unverified list. Missing one means the update loop is not complete.

Rollback must be executable without production access: restore the temporary copy from the pre-change hash, or discard the temporary copy or branch. Preserve the before/after diff and result. “The file looks restored” is not rollback evidence.

### Failure case and boundary

Deliberately fail by replacing a new model or action name across every document without updating task sets, scope, sources, permissions, or migration notes. Stop the approach, preserve the failed diff in the temporary copy, restore the baseline hash, and add the missed downstream consumers to the impact matrix. If sources conflict, licensing is unclear, the owner is missing, or evaluation is not run, keep the claim `disputed` or `stale` and the work `blocked`; do not release it.

### Reflection

Answer: Which layer changed? Which source mattered most? Which downstream consumer was missed? Which unknown remains unverified? Why is the correct status `current`, `stale`, `disputed`, or `removed`? Who owns the next review and what trigger starts it? Which change can be deleted to reduce risk? Cite the actual hash, diff, log, or explicit `not_run` status; a plan alone is not evidence.

## Boundaries and common mistakes

- A larger directory does not prove that a capability system improved; a new capability must add evidence, value, or coverage.
- An accessible official source does not prove that a local entry point, account, or organization has the feature enabled.
- A user report is a research entry, not an automatic official root cause.
- Bulk name replacement cannot substitute for impact analysis, evaluation, permission review, and license review.
- `claim_status: current` means only that the claim has a current source within its declared scope. It does not mean that the chapter, Skill, experiment, deployment, or runtime is `verified`.
- A successful build, prepared package, or documented migration is not evidence of production behavior or team effect unless that evidence actually exists.

## Transfer task

Choose one real but redacted external Skill candidate. Use the claim record and impact matrix to move it from “unreviewed” to `blocked` or “adaptation candidate.” State what is missing for license, dependencies, triggers, permissions, risks, owner, and evaluation evidence. Do not approve it because the name appears suitable.

## Acceptance checklist

- [ ] I can distinguish stable principles, product usage, domain methods, and instance facts.
- [ ] Every volatile claim has `claim`, `source`, `checked_at`, `applies_to`, `owner`, `next_review`, and `claim_status`.
- [ ] I can use an impact matrix to locate downstream effects in chapters, Skills, labs, task sets, and permission notes.
- [ ] I can explain the difference between claim status and content maturity.
- [ ] The update drill records hashes, diffs, logs, rollback, and unverified items in a disposable copy or isolated branch.
- [ ] I know when to retain an old version, block, migrate, or retire instead of performing a bulk replacement.
- [ ] I can name the next review owner and trigger.

## Sources and maintenance boundary

The lifecycle, impact matrix, rollback, and evidence gates are project methodology. Model names, IDs, entry points, reasoning settings, Skill behavior, and permission boundaries are volatile product facts and must be rechecked against current first-party sources.

```yaml
- claim: "Model names, IDs, entry points, reasoning settings, and availability are governed by the current official Models documentation"
  source: "https://learn.chatgpt.com/docs/models.md"
  checked_at: "2026-08-09"
  applies_to: "Codex and ChatGPT entry points, account scope, and version scope stated by the official documentation"
  owner: "content and model-evaluation maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "Skill discovery, invocation, distribution, and Plugin composition are volatile product facts"
  source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
  checked_at: "2026-08-09"
  applies_to: "Product entry points, account scope, and organization scope stated by the official documentation"
  owner: "Skill maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "Sandbox, approval, and security boundaries must be checked against current documentation and actual authorized configuration"
  source: "https://learn.chatgpt.com/docs/permission-modes.md"
  checked_at: "2026-08-09"
  applies_to: "Operating surfaces and configuration scopes stated by the official documentation"
  owner: "security and governance maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
```

The project update process is further described in [`docs/governance/content-lifecycle.md`](../../docs/governance/content-lifecycle.md). This chapter remains `candidate`, and the exercise remains `draft / not_run`; the `claim_status` values above do not change either conclusion.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="21-team-capability-system-EN.md" aria-label="Previous chapter: Chapter 21 · Build a team capability system">← Previous<br><strong>Chapter 21 · Build a team capability system</strong></a></td>
      <td align="right"></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
