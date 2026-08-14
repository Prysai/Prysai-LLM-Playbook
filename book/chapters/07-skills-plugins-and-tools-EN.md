<!-- content_id: chapter-07-skills-plugins-and-tools | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-11 -->

# Chapter 7: How Skills, Plugins, MCP, and Tools Divide the Work

**Status:** `candidate`. **Comparison:** `not_run`. The examples teach the
method; they do not prove that an external Skill ran successfully.

**Start here:** name the task gap, then choose the smallest capability that
fits it.

## The problem this chapter solves

“I need a Skill” is not always the right diagnosis. A Skill, Plugin, MCP
server, connector, script, template, and ordinary document solve different
problems. If they are treated as interchangeable labels, people install more
capability than the task needs, make the context harder to inspect, and widen
the possible external side effects without noticing.

The useful question is not “Which directory has the most Skills?” It is:

> What is missing from this task, and what is the smallest capability that can
> fill that gap while keeping permissions, licensing, dependencies, and proof
> within reach?

## Learning objectives

By the end of this chapter, you should be able to:

- explain the division of labor with method, connection, execution, and
  distribution layers;
- derive a smallest useful combination from the task rather than starting
  with a catalogue;
- check triggers, dependencies, licensing, permissions, side effects, and
  evidence before adopting a Skill, Plugin, or connector; and
- distinguish a file that exists from a capability that was discovered,
  loaded, adopted, or behaviorally verified.

## A real-world entry point: discovery fails before the task starts

The project's [Codex field research](../../docs/research/field-problems-codex.md)
records two public reports that are useful as symptoms, not as official root
cause analyses or local reproductions:

| Public symptom | What the reporter observed | What it does **not** prove | First safe response |
|---|---|---|---|
| A user Skill works as a regular file but disappears when represented by a file symlink | Discovery changed when the file representation changed; the report also compared a hard link | That every Skill scanner, operating system, or release has the same bug | Preserve the exact file representation and work surface; compare a regular file and a link in an isolated test, then record the result |
| Explicit Skill use depends on an implicit available list | A user could not treat an explicit request as independent from what the current surface listed | That the report describes a universal routing rule or an official product guarantee | Save the visible list, the exact request, the session, and the loaded-resource evidence separately |

These reports make a practical boundary visible: a path in a repository is not
the same thing as a Skill discovered by the current host. A visible name is not
the same thing as a Skill loaded into the current session, and a loaded Skill
is not proof that its external dependencies or permissions worked.

## 1. A four-layer capability model

Use these layers to name the missing capability before choosing a package:

```text
Method layer       Skill       A repeatable way to perform a kind of task
Connection layer   MCP/connector  External data, context, or actions
Execution layer    Tool        Reading, editing, running, browsing, or calling
Distribution layer Plugin      A package that distributes several capabilities
```

The layers overlap in real products, but they answer different design
questions:

| Layer | What it contributes | What it does not grant by itself |
|---|---|---|
| Skill | Instructions and supporting resources for a repeatable task or workflow | Permission, external access, or proof that the method works in this environment |
| MCP server / connector | A bridge to external tools, resources, context, or actions | Authentication, approval for every action, or a safe data boundary |
| Tool | An observable operation such as reading a file, running a command, or calling an API | A reason to run it, authorization to use it, or evidence that its result is correct |
| Plugin | A distribution and composition package that can group capabilities | Automatic authorization or a guarantee that every packaged component is available |

A script is usually the better fit for deterministic, repeated logic that
should not be regenerated every time. A template is better for a stable output
shape. A document is better for background knowledge that should be read for a
particular situation. A Skill earns its place when the method itself is
repeatable but still needs context-sensitive judgment.

## 2. Select in an order that limits scope

Use this order before installing or enabling anything:

1. Decide whether the task has a clear protocol. If it does not, clarify the
   task before adding capability.
2. If the same method recurs and people regularly miss steps, consider a Skill.
3. If the task needs external data or an external action, ask whether a
   connector or MCP server is actually necessary.
4. If the transformation is deterministic, prefer a script.
5. If several capabilities need to travel together, consider a Plugin as the
   distribution layer.
6. Only then decide whether to install, authenticate, or open additional
   permissions.

This order is intentionally conservative. A large catalogue can make a task
look more capable while making the actual dependency and permission graph less
visible.

## 3. Start with the task gap, not the Skill name

Before adopting a candidate, answer each question in writing:

- **Task gap:** Is the missing piece a stable method, a deterministic script,
  an external connection, or a task that has not yet been defined?
- **Trigger and exclusion:** What inputs should trigger this capability? Which
  similar requests must not trigger it or must be handled by another Skill?
  Shared keywords are not enough.
- **Source and revision:** Can another reviewer check the URL, fixed commit,
  version, or archive hash and the inventory date?
- **License and dependencies:** Does the repository license cover the target
  file? Are NOTICE files, nested assets, and runtime dependencies accounted for?
- **Permissions and side effects:** What can it read or write? Does it need a
  network or an account? Can it send, publish, delete, modify, or otherwise
  change an external system?
- **Verification and maintenance:** Can an isolated test cover a positive,
  boundary, failure, and migration case? Who approves it, owns it, backs it up,
  updates it, and rehearses the rollback?

The number of entries in an external catalogue is not a quality metric. An
automation package can also carry account, network, and third-party service
risk. Review each candidate on its own evidence.

### What a Plugin contains, and where support ends

The official [Plugins documentation](https://learn.chatgpt.com/docs/plugins.md)
describes a Plugin as an installable capability bundle that can contain Skills,
Connectors, or both. A Connector can be backed by an MCP server that provides
tools, shared information, or actions in an external system. That makes a
Plugin a distribution and composition layer. It is not an authorization grant.

The official support description checked on 2026-08-09 listed Plugins for
ChatGPT Chat/Work on web, desktop, and mobile; Codex in the ChatGPT desktop
app; and a Plugin browser in Codex CLI. It did not list Plugins as supported by
the IDE extension. Mobile Chat/Work availability does not establish that a
mobile client has the same catalogue browsing or installation surface as
desktop.

Treat the product and connection state as a chain that needs separate evidence:

```text
product support → account or organization authorization → Plugin installation
→ connector authentication → new session → Skill/tool visibility
→ actual invocation → external result verification
```

Each arrow is its own claim. The official Plugin record also says that “Sign in
with ChatGPT” does not automatically grant Plugin data access or approve
actions. The requested permissions still need separate review and approval.
The current source record links these boundaries to `OF-015`, `OF-016`,
`UF-001`, `UF-003`, and `LB-002`; see the [fact-impact registry](../../docs/governance/fact-impact-registry.yaml)
before changing any of the affected chapters or experiments.

The official Skills and Plugins material checked on 2026-08-10 also described
automatic matching and explicit selection as different entry points: ChatGPT
uses an `@` mention and Codex uses a `$` mention. It described a new chat or
CLI session after installation as part of the flow. These are volatile product
facts, not permissions supplied by a Skill. A local check should record the
surface, session, exact invocation string, loaded resources, behavior output,
and result verification. This repository has not collected those runtime
records, so the relevant state remains `not_observed`.

## 4. The pre-adoption review package

Before installation, produce a `skill-adoption-decision.md` record rather than
writing “license checked” and moving on. At minimum, record:

```text
task_gap:
trigger_conditions:
non_trigger_conditions:
source_url / revision / inventory_date:
license / NOTICE / nested_assets:
dependencies:
target_install_scope:
permissions:
external_side_effects:
isolated_trial:
backup_and_restore_target:
rollback_steps_and_success_check:
approval_points:
behavior_tests: positive | boundary | failure | migration
owner / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unverified:
```

These four decision values describe adoption, not the project's artifact
status:

| Decision | Meaning | What it permits you to say | What it does not permit you to say |
|---|---|---|---|
| `recommendation-only` | The task fit is plausible; continue read-only review or isolated trial | “Worth reviewing further” | “Approved for installation” or “usable” |
| `blocked` | License, NOTICE, revision, dependency, permission, or rollback evidence is missing | “Do not adopt yet; here are the conditions to unblock it” | “Install first and fill in the record later” |
| `approved-to-install` | Revision, target scope, backup, rollback, and approval points are specified and accepted | “May be installed within this scope” | “Installed” or “verified” |
| `installed-candidate` | The target path and install record are observable, but behavior and adoption review remain | “An isolated installation candidate exists” | “The team adopted it” or “production-ready” |

The project's `draft`, `candidate`, `verified`, and `production-ready` labels
remain separate from these adoption decisions. A GitHub page being reachable
does not prove that its license is clear. A manifest existing does not prove
that a tool call succeeds.

### Five states that are easy to confuse

| State | Minimum evidence | What it does not establish |
|---|---|---|
| File exists | A path, manifest entry, inventory, or hash at a fixed revision | That the current work surface can discover it |
| Discovered | A visible list or name-resolution record from the current surface | That this session loaded it |
| Loaded | Resource or instruction evidence from a new session | That the team adopted it |
| Adopted | An owner and approval record include it in the declared scope | That its behavior is verified |
| Verified | Positive, boundary, failure, and migration evidence in the declared environment | That another account, entry point, or version behaves the same way |

Installation is another observable action. A target path and successful install
log can support `installed-candidate`; they cannot skip discovery, loading,
adoption, or behavior verification.

### Two worked adoption decisions

- **Recommendation:** S05's `code-review-and-quality` is a plausible
  `recommendation-only` candidate for a merge-review task. Its source is the
  local archive of `https://github.com/addyosmani/agent-skills`, with SHA-256
  evidence
  `6EEDBE7D2EA3A82417781D879785BD501FBDE21275627F557DE4B76560BA1250` and a
  repository-level MIT signal. The trigger is a fixed diff and a request for
  review; it should not trigger merely to generate new functionality or to
  review an undefined baseline. Nested dependencies, the target Skill's
  complete asset set, actual permissions, and rollback remain unreviewed, so
  the correct next step is read-only review or an offline isolated trial—not
  approval to install. The owner is the Prysai LLM Playbook maintenance group.
- **Blocked variant:** S06's `webapp-testing` should remain `blocked`. It comes
  from the local archive of
  `https://github.com/composio-community/awesome-codex-skills`, with SHA-256
  evidence
  `D3DA83ED9D474690E7FF235351376114972840C78BC319CBCB8F89CBD704608E`. The
  inventory confirms a root Apache-2.0 signal, but not consistent licensing or
  NOTICE coverage for every nested Skill, script, and asset. If the target
  installation path, configuration backup, and restore check are also unclear,
  the existence of `SKILL.md` is not enough to proceed. Unblock it only after
  item-level license review and a rehearsable rollback exist. Do not download,
  install, or describe it as discovered or usable before then.

## 5. Compose capabilities; do not stack them

A useful combination often looks like this:

```text
task protocol → domain method → tool or connection → evidence review
```

For a low-risk marketing experiment, the task protocol defines the goal and
limits, a product-context method supplies audience and positioning, an analysis
tool records the data needed for the decision, and Evidence Review checks that
the events actually fired. Opening ten overlapping Skills can make routing and
context less legible than using one method and a clear protocol.

## 6. Handoff before composition

Use the same handoff fields when one capability passes work to another:

```text
status | owner | scope | inputs | assumptions | actions_done
actions_not_done | evidence | unverified | blocked_on | next_check
permission_boundary | next_review
```

The domain Skill owns its method. Task Protocol owns execution boundaries.
Evidence Review inspects existing claims. Workflow Orchestrator owns stages and
checkpoints. A Skill does not gain another Skill's permissions merely because
it was invoked, and it should not recursively start a complete orchestration.

## 7. Experiment: compare three capability combinations

### Setup

Choose a local, low-risk, reversible task. Prepare a task protocol, two
candidate Skills at fixed revisions, and a simulated option that would require
an external connection. One candidate should be suitable for continued isolated
review; the other should be rejected because its license, NOTICE coverage, or
rollback is unclear. Do not upload real data, send messages, write to a third-
party service, or authenticate an external account. Give each combination a
`run-id` while keeping the task text and acceptance rubric fixed.

### Task

Design three approaches for the same task:

1. a clear task protocol only;
2. the task protocol plus one domain Skill; and
3. the task protocol, domain Skill, and external connection.

For each candidate Skill, first complete the pre-adoption review package. In
this experiment, perform read-only review only: do not install, authenticate,
or enable a team-wide configuration. Compare output quality, elapsed time,
permission scope, verification cost, and side effects. State when the extra
capability is a net benefit and when it only adds complexity.

### Evidence

Save the three approaches, their `run-id` values, two
`skill-adoption-decision.md` records, dependency and permission tables,
license findings, simulated or actual outputs, verification results, and an
explicit list of external actions not performed. A passing record must make
the source and revision checkable; point the license conclusion to the actual
files; name the installation, backup, and rollback targets; identify an owner
and approval point; cover positive, boundary, failure, and migration behavior;
and preserve a baseline that needs no extra connection. A simulated call must
be labeled simulated, not reported as a successful runtime invocation.

### Reflection

Record the decision value and reason for both the recommended and rejected
candidate. Explain what evidence would be needed to move a candidate from
`recommendation-only` or `blocked` to the next state. For every observation,
label whether it proves file existence, discovery, loading, adoption, or
verification. Never use an earlier state as a substitute for a later one.

## Deliberate failure and boundary case

Give the task three overlapping Skills, including one that requests an external
upload even though the task only needs local organization. Add another
candidate whose repository is reachable and whose `SKILL.md` exists, but whose
license or rollback is unclear.

The learner passes when they identify the redundancy, reject the unnecessary
permission, mark the unclear candidate `blocked`, and preserve a baseline that
uses only the task protocol or one Skill.

## Transfer

Apply the four-layer model to a research workflow and a product-report
workflow. For each, identify which capability is a method, which is a
connection, and which deterministic transformation could be a script instead.

## Sources and maintenance boundary

| Fact or boundary | Source | Accessed | Applies to | Owner / next review |
|---|---|---:|---|---|
| Skills as task or workflow instructions with supporting resources, including explicit selection | [Skills and Plugins](https://learn.chatgpt.com/docs/skills-and-plugins.md) and the [fact refresh record](../../docs/research/openai-codex-facts-refresh-2026-08-09.md) | 2026-08-09 | Official product description at that access date; not proof that a particular Skill is enabled or loaded here | `facts-maintainer` / 2026-09-09 |
| Plugin composition, supported surfaces, installation, connector authentication, and separate approval | [Plugins](https://learn.chatgpt.com/docs/plugins.md) and the [fact-impact registry](../../docs/governance/fact-impact-registry.yaml) | 2026-08-09 | Official support description; catalogue contents and account or organization access can vary | `facts-maintainer` / 2026-09-09 |
| MCP servers, exposed tools/resources/prompts, and tool allow/deny or approval configuration | [MCP](https://learn.chatgpt.com/docs/extend/mcp.md) | 2026-08-09 | Official Codex host configuration; a server's authentication, tools, and organization policy still need separate checks | `facts-maintainer` / 2026-09-09 |
| Side-effecting connector or MCP actions can be part of the approval boundary | [Agent approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | 2026-08-09 | The official approval model; not this repository's current runtime configuration | `facts-maintainer` / 2026-09-09 |
| Discovery symptoms involving symlinks and explicit Skill calls | [Codex field research](../../docs/research/field-problems-codex.md) | 2026-08-09 | Public user reports; no local reproduction or official root-cause claim | `curriculum-maintainer` / 2026-09-09 |
| Candidate archive inventory and license signals | [Skill candidate catalogue](../../docs/sources/skill-candidate-catalog.md) and [asset register](../../docs/sources/asset-register.md) | 2026-08-09 | Project inventory and review boundary; not approval to install any external Skill | `source-maintainer` / 2026-11-09 |

Skill, Plugin, connector, MCP, manifest, authentication, and invocation details
can change. When an official page or current surface changes, refresh the
first-party record, then review the fact-impact registry, this chapter, related
labs, Skills, evaluation fixtures, and site paths. Keep official product
descriptions, community symptoms, and local runtime evidence in separate
sentences.

## Acceptance checklist

- [ ] I can distinguish Skill, Plugin, MCP server, connector, tool, script,
      template, and document in my own words.
- [ ] I can state the task gap, trigger, exclusion, source revision, license,
      dependencies, permissions, side effects, owner, and rollback for a
      candidate.
- [ ] I can keep one candidate at `recommendation-only` and mark an unclear
      license or rollback `blocked` without installing it first.
- [ ] I can distinguish file existence, discovery, loading, adoption, and
      behavioral verification.
- [ ] I can compare a protocol-only baseline with added capabilities while
      keeping inputs, acceptance, and evidence boundaries fixed.
- [ ] I can state which external actions were not performed and what evidence
      would be required before claiming runtime success.
- [ ] I can report that this chapter is `candidate` and that its comparison
      experiment remains `not_run` until run records and review evidence exist.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="06-model-selection-EN.md" aria-label="Previous chapter: Chapter 6 · Model selection is not model worship">← Previous<br><strong>Chapter 6 · Model selection is not model worship</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="08-full-lifecycle-workflow-EN.md" aria-label="Next chapter: Chapter 8 · The complete lifecycle from definition to delivery">Next →<br><strong>Chapter 8 · The complete lifecycle from definition to delivery</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
