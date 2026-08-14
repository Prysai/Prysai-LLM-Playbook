<!-- content_id: community-tutorial-intake-and-foundations-2026-08-14 | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-14 -->

# Community tutorial intake: a better beginner opening, not a product source

**Status:** `candidate` research record.
**Decision:** retain the supplied community tutorial as a `reference-only` signal;
do not embed its player, copy its transcript, reuse its screenshots, or use it
as authority for current product behaviour.

## The decision this record supports

The supplied Bilibili/BibiGPT material has one useful editorial strength: it
begins with a familiar name, gives a new reader a reason to care, and follows a
single concrete project instead of listing controls in isolation. That is a
teaching pattern, not a licence to reuse its expression or a basis for current
product claims.

This record answers a narrow question: **what can this guide learn from that
teaching pattern while keeping its own writing, sources, and evidence honest?**

The answer is to start with one observable question before any feature tour:

> When a language-model tool says it finished, what can you inspect before you
> trust the result?

That question works for Codex, Claude Code, and other model-assisted work
surfaces without claiming that their controls, permissions, persistence, or
Agent behaviour are equivalent.

## What the public source can and cannot contribute

| Material in the supplied source | Treatment in this project | Reason |
| --- | --- | --- |
| Its progression from a familiar product name to one simple project | **Keep as a teaching pattern, rewrite from scratch** | A beginner needs a concrete reason to continue, but the wording and presentation are not ours to copy. |
| Product names, plans, quotas, keyboard shortcuts, and interface labels | **Do not teach from this source** | These are volatile, account- and surface-dependent claims; the supplied material is not the owning documentation. |
| Permission modes and approval behaviour | **Teach only the sandbox-versus-approval principle, with a dated first-party source** | The exact modes and defaults can change. An approval reviewer does not itself expand the runtime boundary. |
| A visual pointing/annotation workflow | **Teach the durable principle, not the named control** | When visual context matters, point to the relevant area and state the requested result. Do not promise that every surface has the same UI. |
| A preview/storage failure story | **Keep out of product instruction** | It is a single presentation of a symptom. This project did not reproduce it and has no owner-confirmed root cause. |
| Git checkpoints, scoped tasks, independent checks, and stop conditions | **Teach as product-neutral methods** | These are useful practices whose value does not depend on copying a vendor-specific workflow. |
| Skills, plugins, and external tools | **Use current owner documentation for definitions; retain action and data boundaries** | A Skill is not an authorization grant, and a listed plugin is not proof that an external action ran. |
| Thread editing, forking, archiving, automations, computer control, or mobile use | **Exclude until a named surface has a current adapter record** | The source does not supply a current, first-party, runnable contract for those product-specific assertions. |

## Current official boundary check

The following sources were reachable on 2026-08-14. Their pages are controlled
by OpenAI; their claims still apply only to their stated product surfaces and
must be reviewed again before a release that depends on them.

| Claim safe enough to teach | First-party source | What it still does not prove |
| --- | --- | --- |
| Codex terminology spans multiple surfaces, while the concrete capabilities of a surface remain scoped. | [OpenAI glossary](https://learn.chatgpt.com/docs/glossary.md) | A learner's account, installed version, permissions, or successful run. |
| A useful request makes goal, context, output, and boundaries visible; visual work benefits from pointing to the relevant area. | [OpenAI prompting guidance](https://learn.chatgpt.com/docs/prompting.md) | That a request will succeed or that every client exposes a named annotation control. |
| Sandbox controls accessible files/network resources; approvals control when a runtime pauses. Changing the reviewer does not enlarge the sandbox. | [OpenAI permissions](https://learn.chatgpt.com/docs/permission-modes.md) | Any current default, organisation policy, or target-specific authorization. |
| A Skill packages reusable task-specific instructions and resources; a Plugin may bundle Skills and connectors. | [OpenAI Skills & Plugins](https://learn.chatgpt.com/docs/skills-and-plugins.md) | That a Skill was selected, a connector is authenticated, or an external action completed. |
| In the desktop app, Local and Worktree are distinct execution locations; Worktree isolates changes in a Git worktree. | [OpenAI Codex environments](https://learn.chatgpt.com/docs/environments/modes.md) | That isolation is sufficient for a particular concurrent task or that any unrelated platform follows the same model. |

These are source checks, not local product runs. The guide therefore retains
the status `candidate` and makes no current claim about the video's interface,
plans, availability, preview behaviour, mobile flow, or specific feature
labels.

## An original opening for the general course

This is the reader-facing direction now used at the start of Chapter 1. It is
original project writing, not a transcript or translation:

> You may have heard names such as Codex and Claude Code. They are useful
> examples of a bigger shift: a language model can now work with a task,
> context, and sometimes tools instead of only returning a chat reply. Before
> we tour any controls, learn the one question that makes the rest easier:
> when the tool says it is done, what can you actually check?
>
> In this first lesson, you do not need to memorise products. You will separate
> a suggested action from a permitted action, a tool message from a changed
> target, and a plausible answer from evidence. Codex is the flagship practice
> track here. The method is broader; any named platform must earn its own
> adapter before we teach its buttons as fact.

This kind of opening gives a novice an invitation, a usable mental model, and a
clear payoff. It avoids unsupported claims such as “the core product,” “the
best option,” or “the direct equivalent of another product.”

## The first ten minutes: one promise, one boundary

A basic lesson should not begin by asking a reader to choose a model, payment
plan, plugin, or permission mode. It should make one small promise:

1. **Name one result.** For example: rewrite a fictional message without adding
   facts, or inspect a one-file change.
2. **Show the starting material.** The learner should see the exact text, file,
   or fixture before asking a model to act.
3. **State the action boundary.** Say whether the task is text-only, read-only,
   or permitted to make one reversible change. No secrets or external accounts.
4. **Show the check.** The reader names what must remain true, what must change,
   and what is still unknown.
5. **Make stopping safe.** If the target, authority, or evidence is unclear,
   stop and report the smallest next check rather than escalating access.

The existing optional warm-up follows this pattern with a fictional source
message. The Chapter 1 opening now explains *why* that modest first result is
more valuable than a long feature list.

## Naming implication: general method, explicit flagship

The content should describe itself in two layers:

- **general method:** define the result, select only necessary context, set an
  action boundary, inspect evidence, recover, and retain a receipt;
- **flagship practice track:** teach Codex in depth where current first-party
  sources, bounded runs, failure evidence, and review dates exist.

Claude Code and other named systems are comparison or adapter candidates, not
interchangeable substitutes. The pending product-name recommendation and
staged migration are recorded in
[the naming transition note](../strategy/naming-and-positioning-transition-2026-08-14.md).

## Source and rights receipt

| Field | Record |
| --- | --- |
| Source | Bilibili player reference for `BV1c9EK6KEW4` and the supplied BibiGPT-generated Chinese text, provided to this project on 2026-08-14. |
| Evidence class | Community suggestion / editorial reference. |
| Rights treatment | No licence or reuse permission was supplied or independently established. No prose, screenshots, image URLs, iframe, code, or brand treatment is copied into this repository. |
| Local reproduction | None. The project did not run the tutorial, use its project, test its feature claims, or inspect its linked assets. |
| Decision | `reference-only`; it may inform an original topic outline, never a current product fact or reader-facing embed. |
| Owner and review | Curriculum maintainer; re-evaluate only if a separately licensed, first-party-relevant source changes an editorial decision. |

## What this record does not prove

This intake does not establish that the source's author, transcript service,
plans, permissions, controls, preview behaviour, project workflow, automation,
computer use, mobile use, or results are accurate, current, licensed for
reuse, representative, secure, or equivalent to any other platform. It does
not prove that a revised opening improves comprehension, completion, retention,
transfer, or project adoption. Those require a bounded learner study.
