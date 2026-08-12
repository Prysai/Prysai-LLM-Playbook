# Chapter 21: Build a Team Capability System

> `content_status: candidate`
> `experiment_status: draft / not_run`
> The permission exercise is a static simulation. It does not authorize, connect, send, write, push, publish, or prove that a production connection works.

## The problem this chapter solves

One person may use experience to guide Codex through a task. A team faces different questions: Who owns the rule? Which Skill can be trusted? Who updates it? Does every member have more permission than the task requires? Can a successful example be reproduced without oral context? Without shared language, evidence, and responsibility, a team is merely distributing opaque personal habits.

## A real-world problem entry

FP-03, involving inconsistent host or organization identification, and FP-04, involving confusion about authorization across multiple organizations, are public problem reports. They are not universal conclusions about connector behavior. Here they are used only to test whether host, organization, permission, and ownership are explicitly recorded before a capability is shared.

## Learning objectives

By the end of this chapter, you should be able to:

- separate a personal method into shared language, method, evidence, and governance;
- deliver a capability package with a manifest, version, owner, source, permission matrix, and rollback instructions;
- let another member reproduce the key workflow independently in a disposable copy;
- assign use, modification, execution, push, release, and permission changes to distinct responsibilities;
- block, roll back, migrate, or retire a capability when its source changes, its scope is too broad, or its behavior is no longer supported by evidence.

## Concept: four layers of a team capability package

```text
Shared language and project rules
            ↓
Reusable method and Skill
            ↓
Experiments, task sets, and evidence standard
            ↓
Permissions, review, versioning, and maintenance ownership
```

Shared language gives members the same terms. The method layer defines bounded inputs, triggers, actions, and stops. The evidence layer supports claims within a stated scope. The governance layer decides who may use, modify, release, and revoke the package. Without evidence, a method is advice. Without governance, it can spread stale facts or broaden permissions.

## Decision: action permissions and responsibility

“Logged in” and “has access” are not approval records. Decide each capability with the following fields:

| Action level | Data scope | Technical permission | Task authorization | Approver | Required evidence | Rollback / review |
|---|---|---|---|---|---|---|
| Read-only analysis | Redacted disposable copy | Read-only | Explicit task scope | Task owner | Input, sources, and log | Discard copy; review per task |
| Draft editing | Isolated branch | Restricted write | Named files or directory | Owner plus reviewer | Baseline hash, diff, and validation | Restore diff; review before merge |
| Running checks | Test data | Named commands only | Command and timeout listed | Run owner | Log, exit code, and partial state | Stop process; restore copy |
| Push or release | Named repository or draft endpoint | Restricted write to target | Explicit release request | Reviewer or release owner | Preview, acceptance, and rollback | Revert version; retain audit record |
| Permission change or secret handling | Minimum necessary scope | Temporary and revocable | Separate human confirmation | Named authorizer; dual review when needed | Scope, expiry, audit, and rollback | Revoke immediately; review again |

The ability to use is not the ability to modify; the ability to modify is not the ability to release. If scope, target, approver, or rollback is unclear, the decision is `blocked`.

## Action: define the minimum capability-package contract

Use a checkable directory. Teams may rename files, but must retain the responsibilities:

```text
capability-pack/
├─ README.md                  # purpose, scope, quick reproduction, limits
├─ manifest.yaml              # id, version, owner, status, next_review
├─ context/
│  └─ project-context.md      # terms, boundaries, trusted sources, operating mode
├─ protocol/
│  └─ task-protocol.md        # input, decisions, actions, stops, delivery
├─ examples/
│  ├─ positive.md             # positive example
│  └─ failure.md              # failure and boundary example
├─ eval/
│  ├─ acceptance.md           # acceptance criteria and scoring
│  └─ evidence-index.md       # logs, diffs, validation, and unverified items
└─ governance/
   ├─ permission-matrix.md    # data, scope, approval, and expiry
   ├─ ownership.md            # owner, reviewer, and backup role
   └─ rollback.md             # rollback, migration, retirement, and recovery
```

At minimum, `manifest.yaml` contains:

```yaml
id: "team-capability-release-review"
version: "0.1.0"
owner: "person or team role"
status: "candidate"
source: "original | adapted | external link; license record location"
next_review: "YYYY-MM-DD"
decision_owner: "role that accepts or blocks the package"
allowed_scope: "redacted disposable copy / named test repository"
rollback: "discard disposable copy or restore baseline hash"
```

Version is a traceable change identifier, not a synonym for verified behavior. `candidate` means that the structure exists while fresh independent reproduction is still insufficient.

## Experiment: deliver one team capability package

This is a two-person, low-risk, independent-reproduction exercise with no real external connection.

### Setup

Choose either “pre-release document review” or “new-member project orientation” as the fixed task. Work in a temporary repository or redacted copy. Prepare fixed input `team-pack-review-v1`: a short document containing completed items, unverified items, one stale command, and one permission that requires confirmation. Member A creates the package, `version: 0.1.0`, owner, source, permission matrix, three acceptance evidence items, and rollback instructions. Save the input hash and clean-copy hash.

Do not connect to an external service, authorize an account, send a message, upload customer data, push, publish, or put a long-lived secret into the package.

### Task

1. A follows the task protocol once and saves log `21-team-pack-review-v1-A-01`.
2. A gives the package to B. B uses only the package and fixed input in a different disposable copy, without oral supplementation, and saves `21-team-pack-review-v1-B-01`.
3. B records what was read, what action was taken, where the process stopped, the output diff, validation, the permission judgment, and implicit-knowledge gaps.
4. A revises one layer only, increments the version to `0.1.1`, and records the change and reason. B runs again as `B-02`.

### Evidence gate

The evidence package must contain:

- `manifest.yaml`, the directory inventory, version, and owner;
- fixed input plus A and B disposable-copy hashes;
- a positive example, failure example, and protocol or `SKILL.md`;
- independent logs, diffs, validation output, and scores for A, B, and revised B;
- a permission matrix containing data scope, technical scope, task authorization, approver, expiry, and prohibited actions;
- source and license-record location, next review date, and rollback instructions;
- implicit-knowledge gaps and the before/after difference;
- unverified items and `content_status`/`claim_status` where relevant.

Each run needs a locatable record:

```yaml
run_id: "21-team-pack-review-v1-B-01"
member: "A | B"
pack_version: "0.1.0"
input_hash: "sha256:..."
actual_changes: "no-change or diff summary"
validation: "commands, exit codes, and key output; not_run if not executed"
reviewer: "independent review role; not_assigned if none"
unverified_items: ["real connection", "production release", "long-lived permissions"]
status: "pass | fail | blocked | not_run"
```

Without a `decision_owner`, log location, independent member record, or unverified-items list, the package remains `candidate` or `blocked`. Oral handoff is not evidence.

Score five dimensions from 0 to 2: goal understanding, context handling, action boundary, evidence completeness, and failure stopping. A candidate experiment pass requires both A and B to reach at least 8/10, no unauthorized action, and B's key workflow to work without oral supplementation. Missing any independent log, permission matrix, rollback plan, or input hash keeps the result `candidate` or `blocked`; it cannot be called verified.

### Failure case and boundary

Failure variant one removes `owner` and `version`; the reviewer should refuse acceptance. Failure variant two supplies a redacted static permission list in which every external capability is marked `requested`. This is a paper simulation only. Do not authorize, connect, send, write, push, or publish in a real account, public repository, production service, or secret-bearing environment. The correct response is to identify the broad scope, target, approver, expiry, and rollback requirements, then mark the package `blocked` or `candidate`.

### Reflection

Classify the gaps under shared language, method, evidence, or governance. Explain why B could not reproduce the workflow, which layer should change, what failure or evidence changed after revision, and whether the permission matrix is still broader than the task. Also identify who can roll back or retire the package if the owner leaves, the source expires, or the capability creates a side effect. “I understand it” does not replace a log or diff.

## Boundaries and common mistakes

- Shared context must not contain passwords, long-lived secrets, unauthorized customer material, or unsupported market claims.
- A Skill's name or directory does not prove its license, trigger boundary, dependencies, or behavior have been reviewed.
- Organization rules, task context, and personal preferences are different layers; external text must not silently override organizational rules.
- A simulated permission result proves only that the review procedure was exercised. It does not prove a connector, account, or production service works.
- Release, permission changes, and secret handling require separate approval; an experiment does not grant them automatically.
- A configured capability, a successful build, or a declared team package does not prove runtime behavior, team outcomes, deployment, or user acceptance.

## Transfer task

Move one capability package from a personal project into an organizational project. Recheck its name, license, branding, data scope, permissions, owner, reviewer, release target, and rollback. Write one assumption that survives the transfer and one assumption that must be discarded. Do not approve the package merely because its name looks familiar.

## Acceptance checklist

- [ ] I can separate personal experience into shared language, method, evidence, and governance.
- [ ] I can produce a package directory, version, owner, source, permission matrix, and rollback plan.
- [ ] Another member can reproduce the key workflow in a disposable copy without oral supplementation.
- [ ] Each run has an input hash, `run-id`, log, diff, score, and unverified-items list.
- [ ] I can distinguish use, modification, execution, push, release, and permission-change responsibility.
- [ ] I can detect an over-broad scope in a static permission simulation and refuse real authorization.
- [ ] The package has a path to rollback, migration, blocking, or retirement when it fails.

## Sources and maintenance boundary

The four-layer governance model and package contract are project methodology. Skill distribution, permission modes, connector scope, and organization settings are volatile facts. These records bind claims to sources and scope; the static experiment does not prove production connectivity or team impact.

```yaml
- claim: "Skill and Plugin composition, distribution, and availability depend on the current product surface and configuration"
  source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
  checked_at: "2026-08-09"
  applies_to: "Product entry points, account scope, and organization scope stated by the official documentation"
  owner: "capability-package maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "Sandbox and approval settings define different access and pause boundaries; login status alone cannot establish them"
  source: "https://learn.chatgpt.com/docs/permission-modes.md"
  checked_at: "2026-08-09"
  applies_to: "Operating surfaces and configuration scopes stated by the official documentation"
  owner: "security and governance maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
```

The experiment remains `draft / not_run`, and the chapter remains `candidate`. The simulated permission configuration contains no real token, password, cookie, or connection information.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="20-personal-codex-work-system-EN.md" aria-label="Previous chapter: Chapter 20 · Build a personal Codex work system">← Previous<br><strong>Chapter 20 · Build a personal Codex work system</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="22-continuous-update-and-future-proofing-EN.md" aria-label="Next chapter: Chapter 22 · Continuous update and future-proofing">Next →<br><strong>Chapter 22 · Continuous update and future-proofing</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
