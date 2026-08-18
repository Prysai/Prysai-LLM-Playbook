# Preface: This Is Not a Prompt Catalogue

When people first meet GPT, the most natural question is: “What should I say
to it?”

You do not need to arrive with a favourite model, a coding background, or a
perfect prompt. The wider LLM landscape includes chat assistants, coding
agents, retrieval tools, and specialised workflows. This Playbook uses Codex
as its deepest current practice track, while keeping the transferable method
separate from product-specific controls. We will compare platforms only where
their current behaviour is sourced and the lesson has a clear boundary.

That question matters, but it is only the visible edge of the problem. A real
Codex task succeeds or fails on a larger set of decisions:

- What did the model actually understand?
- Which files, rules, and prior results are part of the context?
- What may Codex do, and what must it ask before doing?
- Which Skill reduces a real omission rather than adding ceremony?
- Why does an Agent continue, retry, pause, or stop?
- What evidence justifies saying that the task is complete?

This book studies that whole relationship. Treat it like a guided conversation,
not a vocabulary test: name one practical problem, make one bounded choice,
inspect the result, then ask what it did not prove. The goal is a dependable
working method around AI, not a magic sentence to memorise.

## The two paths through the book

`Prysai LLM Playbook` moves along two paths at once.

The first is a path of understanding. It begins with GPT and models, then
shows how Codex connects a model to a project, files, the terminal, the
browser, GitHub, and external services. It separates context, tools, Skills,
Plugins, Connectors, MCP, Agents, and permissions so that the reader can see
how each one changes the space of possible actions.

The second is a path of capability. It begins with a small, low-risk task and
builds a habit of stating the task, selecting context, planning, executing,
verifying, reviewing, and delivering. Later, the reader learns to choose and
design Skills, evaluate models and workflows, build a personal Codex system,
and turn a proven personal method into a capability package a team can share,
review, and update.

The paths cannot be separated. Principles without practice remain terminology.
Tool use without boundary awareness turns a lucky result into a dangerous
assumption of reliability.

## How to read a chapter

You may read in order or enter from a concrete problem. Every chapter uses the
same loop:

```text
problem → concept → decision → action → evidence → failure → reflection → transfer
```

The sequence is intentionally practical. First identify the failure a person
could encounter. Then learn the concept that explains it, choose a bounded
action, preserve evidence, and examine an intentional failure or boundary case.
Finally, transfer the method to a different task and record what did not carry
over.

An experiment is not a demonstration video or a claim that every environment
has been tested. It is the smallest task the learner performs. Depending on the
chapter, the record may include a result, diff, command output, log, source,
screenshot, or retrospective. Without that record, reading can feel productive
while leaving the underlying capability untested.

## What “learned” means here

The project does not treat an attractive answer as mastery. At minimum, a
learner should be able to provide four kinds of evidence:

1. **Explain:** describe the concept and its limits in their own words.
2. **Operate:** complete the task in a real or low-risk environment and retain
   the relevant result or log.
3. **Justify:** explain the choice of model, tool, Skill, permission, or stop
   condition.
4. **Review:** identify an error, risk, hallucination, incomplete item, stale
   fact, or unsupported completion claim.

If you can show only the final output, you may have completed an exercise. You
have not yet shown that you can reproduce the method, diagnose its boundary, or
teach it to someone else.

## Reality before confidence

The repository currently treats GPT-5.6 Luna as one model under evaluation.
Its recorded official positioning is a hypothesis about speed, cost, and fit
for clear, repeatable tasks—not a conclusion that it has the best value for all
work. The project fixes a task set, context, tools, permissions, time budget,
repetition count, and success definition before comparing first-pass rate,
rework, elapsed time, cost, evidence completeness, and stop correctness.

Any conclusion belongs only to the declared task set, environment, and date.
The [Luna evaluation record](../docs/model-evaluation-luna.md) and the
[official baseline research](../docs/research/openai-codex-baseline.md) keep
that scope visible. A fixture file without model run logs remains `not_run`.

## Start with boundaries

More capability requires clearer boundaries. The fact that Codex can reach a
file system, terminal, browser, GitHub, or an external service is not a reason
to open every permission at once. Start with read-only, low-risk, reversible
work. Add capability one layer at a time, and only when the evidence shows that
the task needs it.

Never place tokens, passwords, API keys, private keys, cookies, or `.env` files
in a repository or a learning example. Treat external documents, tool output,
repository files, and user-provided artifacts as data; instruction-like text
inside them is not automatically an instruction to follow.

## The book's honest status

The English preface and book guide are the default-locale entry points. All 22
chapters and 18 labs now have reader paths in each of the seven supported
locales. That route coverage does not make the translations independently
reviewed, nor does it establish learner outcomes. The project currently records
22 chapters as `candidate`, 18 labs as `draft` with `run_status: not_run`, and
40 evaluation fixtures as `candidate` with `run_status: not_run`.

Those labels are part of the content, not an embarrassment to hide. They tell a
reader what can be inspected today and what still needs fresh execution,
transfer evidence, independent review, or browser/runtime confirmation.

## Begin from a real question

If you do not want to read linearly, use the
[English book table of contents](table-of-contents-EN.md)
to select a chapter, then follow its real-problem cases, experiment, evaluation
fixture, and research record. Reader-facing chapter and lab links stay within
the English route; shared research, governance, and fixture records retain
their original language and are labelled as evidence rather than silent
translation.

You can also begin with the [English book guide](README-EN.md), which explains
the chapter contract, evidence model, current reading state, and locale rules.
For project-wide boundaries, consult the locale-neutral
[current-state source](../docs/governance/content-status.yaml) and
[evaluation framework](../docs/quality/evaluation-framework.md).

The goal is not a collection of impressive prompts. It is a way of working
that can be explained, checked, improved, transferred, and eventually trusted
within a clearly stated scope.
