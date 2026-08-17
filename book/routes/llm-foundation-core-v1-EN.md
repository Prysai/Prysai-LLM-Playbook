<!-- content_id: llm-foundation-core-v1-route | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-17 -->

# LLM Foundation Core v1

**Status:** `candidate`. **Run status:** `not_run`.

This is the proposed beginner route for the Prysai LLM Playbook. It starts
with one offline, fictional text task and then moves through five observable
learning outcomes. The route is a contract and a reading order, not evidence
that anyone has completed or learned it.

<!-- entry: core-first-success -->

## Start with one safe attempt

Use only this fictional notice. Do not paste private messages, credentials,
customer material, unpublished work, or real files.

> The community room is reserved for Tuesday at 18:00. Bring a notebook. The
> room number will be confirmed later.

Ask any text chat:

```text
Rewrite this notice for a new member in two sentences.
Keep every stated fact. Put missing details in [brackets].
Then list the facts you preserved.
Check: do not add a room number, fee, contact, promise, or new time.
Stop: do not browse, send, publish, or assume an unknown detail.
```

Keep the first request and first response. Before changing anything, check:

1. Can you point to every statement in the rewrite in the supplied notice?
2. Did it follow the two-sentence limit and list preserved facts?
3. Did it invent a room number, fee, contact, promise, or time?

If the response invents a detail, mark it and stop. A fluent response is not
proof that the detail is true.

## Five-unit sequence

The machine-readable contract is [`core-course.yaml`](../../docs/governance/core-course.yaml).
Each unit has one outcome, one retained artifact, one operation, and a stop
boundary. Do not skip ahead to a platform adapter to complete this route.

1. <span id="unit-1-llm-boundaries"></span>[What an LLM is and is not](../guides/llm-fundamentals-EN.md) — explain context-based generation and distinguish a model from a product or tool.
2. <span id="unit-2-first-generation"></span>[Context, instruction, and a first generation](llm-core-first-generation-EN.md) — make the goal, material, constraints, and response shape explicit.
3. <span id="unit-3-visible-failures"></span>[Recognize visible failure modes](llm-core-visible-failures-EN.md) — label omissions, unsupported additions, forced ambiguity, and overconfidence with source evidence.
4. <span id="unit-4-check-repair"></span>[Check, repair, and state limits](llm-core-check-repair-EN.md) — use `PASS` / `FAIL` / `UNSURE`, make a minimum correction, and record the limit.
5. <span id="unit-5-unseen-transfer"></span>[Repeat the method on an unseen task](llm-core-unseen-transfer-EN.md) — define, attempt, check, repair, and state limits without a complete template.

## Evidence boundary

The route is `candidate / not_run`. Static validation checks only identity,
order, artifacts, boundaries, links, and fixture coverage. It does not prove
learning, retention, transfer, safety, productivity, model quality, or
cross-platform equivalence.
