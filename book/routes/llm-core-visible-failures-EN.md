<!-- content_id: llm-core-visible-failures | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-17 -->

# Recognize visible LLM failures

**Unit:** `core-visible-failures`
**Status:** `candidate`. **Run status:** `not_run`.
**Time:** about 20 minutes. **Prerequisite:** [Context, instruction, and a first generation](llm-core-first-generation-EN.md).

## The result you should keep

You will label four fixed responses, quote the supplied source that supports
each label, and write one sentence about what the fixture cannot establish.
The goal is not to decide whether a model is good or bad. The goal is to see
the first visible mismatch between a response and its supplied material.

## Freeze the source

Use this fictional notice and do not add outside facts:

> The community room is reserved for Tuesday at 18:00. Bring a notebook. The
> room number will be confirmed later.

The notice supports exactly two positive facts and one unknown: Tuesday at
18:00, a notebook, and no room number yet.

## Four fixed responses

Read all four before writing a judgement. Do not ask a model for a better
answer first.

### A. Omission

> The community room is reserved for Tuesday at 18:00.

The notebook instruction is missing. This is an omission, not an invented
fact. Quote `Bring a notebook.` as the evidence.

### B. Unsupported addition

> The community room is reserved for Tuesday at 18:00. Bring a notebook. The
> meeting is in Room 4.

`Room 4` is not in the notice. This is an unsupported addition. The notice
does not prove which room will be used.

### C. Forced ambiguity

> The community room is reserved for Tuesday at 18:00. Bring a notebook. The
> room is probably Room 4, so arrive there.

The response converts an explicit unknown into a guess and an instruction.
This is forced ambiguity: it chooses a meaning the material did not supply.

### D. Overconfidence

> The community room is definitely confirmed for Tuesday at 18:00 in Room 4.

The time is supported, but the room and the word `definitely` are not. This is
an overconfident claim because it hides the boundary between known and unknown.

## Make an evidence table

Fill this in without copying the labels above:

| Response | Failure label | Exact source quote | What remains unknown? |
|---|---|---|---|
| A |  |  |  |
| B |  |  |  |
| C |  |  |  |
| D |  |  |  |

Use only these labels for this exercise: `omission`, `unsupported addition`,
`forced ambiguity`, and `overconfidence`. If a response has more than one
issue, record the first material mismatch and note the second one separately.

## Boundary: what this table cannot prove

The table can show whether a fixed response matches a fixed notice. It cannot
show that:

- a model always makes or avoids one of these errors;
- the notice itself is true in the outside world;
- the model has no other failure modes; or
- a single correct response transfers to another subject or model.

If you have no supplied source, mark the claim `UNSURE` rather than inventing a
source. If the task asks for a current fact, use the separate source-check
route. If it asks for an external action, stop before acting.

## Unit completion check

Your attempted receipt contains the completed table, four quoted evidence
snippets, and one explicit limitation. Score it as follows:

- `0` — labels a response without source evidence or turns one response into a
  claim about a model;
- `1` — finds a mismatch but confuses an unknown with an error or misses a
  material boundary; and
- `2` — names the failure type, quotes the supplied evidence, and states what
  the fixture cannot establish.

The next unit will use one of these mismatches to make a minimum correction and
record a `PASS` / `FAIL` / `UNSURE` check.

## Optional material and source boundary

The long [Beginner Practice Pack](../communication-clinic-EN.md) contains
application routes for language, work, research, sharing, and recovery. It is
not required for this unit and remains `candidate / not_run`; its repeated
practice cards are not additional core units.

This short route is original Prysai teaching material. No external response,
prompt, user message, or model output is copied. It does not establish model
quality, learning, safety, or cross-platform behavior.
