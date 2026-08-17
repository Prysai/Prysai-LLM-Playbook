<!-- content_id: llm-core-first-generation | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-17 -->

# Context, instruction, and a first generation

**Unit:** `core-first-generation`
**Status:** `candidate`. **Run status:** `not_run`.
**Time:** about 20 minutes. **Prerequisite:** [What an LLM is, and what it is not](../guides/llm-fundamentals-EN.md).

## The result you should keep

You will write a four-field task card, make one first request in a text chat,
preserve the first response, and record unknowns. The four fields are:

1. **Goal:** the observable result you want;
2. **Material:** the exact text or facts the model may use;
3. **Constraints:** what must stay true and what the model must not do; and
4. **Response shape:** the form you will inspect.

Add a **stop line** whenever a task could browse, upload, send, publish, or
change external state. This practice does not require a named product or a
special prompt syntax.

## Use a fictional notice

Do not paste private messages, credentials, customer material, unpublished work,
or real files. Use this notice exactly:

> The community room is reserved for Tuesday at 18:00. Bring a notebook. The
> room number will be confirmed later.

Write your task card before opening a model:

```text
Goal: rewrite the notice for a new member.
Material: the notice above and nothing else.
Constraints: keep every stated fact; put missing details in [brackets]; do not
add a room number, fee, contact, promise, or new time.
Response shape: two sentences, then a list of preserved facts.
Stop: do not browse, upload, send, publish, or assume an unknown detail.
```

If your own goal differs, change only the goal and response shape. Keep the
material, constraints, and stop line bounded for this first run.

## Make and preserve the first request

Send the task card to any text-only chat. Ask for a response, not an action.
Save both the exact request and the first response before asking for a rewrite
or correction. Different models may word the response differently; score the
observable constraints, not the style.

Use this receipt:

```text
Task card:
First response:
Unknowns the response kept visible:
One thing I will check:
```

Do not add private conversation history to the receipt. A pasted fictional
notice is enough.

## Check the result before improving it

Compare the first response with the supplied notice:

| Check | PASS when | FAIL when |
|---|---|---|
| Goal | It is addressed to a new member | It changes the audience or task |
| Material | Every factual statement is traceable to the notice | It adds a room, fee, contact, promise, or time |
| Constraints | Unknown details stay bracketed or explicitly unknown | It fills a gap to sound complete |
| Shape | It has two sentences and a preserved-facts list | It ignores the requested form |
| Stop | No search, upload, message, or publication was attempted | The chat proposes or performs an external action |

If any row is `FAIL` or `UNSURE`, record that state. Do not silently replace the
first response with a polished answer; the first output is the evidence that
lets you see what the task card changed.

## Failure and minimum repair

The most useful failure for this unit is a plausible addition:

> The community room is reserved for Tuesday at 18:00. Bring a notebook. The
> meeting will be in Room 4.

The notice never supplied `Room 4`. Mark that claim `FAIL`, quote the source
line that leaves the room unknown, and remove only the unsupported sentence or
replace it with `The room number will be confirmed later.` Do not add a new
contact, date, or explanation.

If the model asks to browse, upload, or send something, stop. A new capability
or side effect is outside this text-only exercise and needs a separate, explicit
decision.

## Unit completion check

You may record this unit as an attempted candidate exercise only when the
receipt contains:

- the four-field task card and stop line;
- the exact first request and first response;
- at least one `PASS`, `FAIL`, or `UNSURE` check with a source reference; and
- one unknown that remains unknown.

This receipt is a learning artifact, not a claim that the model or learner is
reliable. The next unit asks you to label visible omissions, unsupported
additions, forced ambiguity, and overconfidence in a fixed response.

## Sources and limits

This is original Prysai teaching material. The stable method reuses the
project's task-protocol vocabulary; [Chapter 3](../chapters/03-task-protocol-EN.md)
contains the longer platform-neutral protocol and is not required for this
exercise. No external prompt, response, private data, tool call, or product
claim is copied here.

The route remains `candidate / not_run`. It does not prove that a prompt works
across models, that a first output is correct, or that a learner can transfer
the method to a different domain.
