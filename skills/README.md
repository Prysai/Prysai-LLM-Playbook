# Project Skills

This directory contains the project's reusable Skill contracts. A Skill is a
bounded method with triggers, inputs, exclusions, actions, outputs, failure
handling, and evaluation cases. It is not a claim that every invocation will
work in every account or environment.

## Start here

- [Skill registry](../docs/skill-registry.md)
- [Skill quality standard](../docs/quality/skill-quality-standard.md)
- [Skill routing matrix](../docs/quality/skill-routing-matrix.md)
- The official structural validator is the local path documented in `AGENTS.md`;
  use the bundled runtime when needed.

Each Skill lives in its own directory and normally includes `SKILL.md` plus
`agents/openai.yaml`. Read the contract before changing metadata or composing
it with another Skill. Structural validation does not replace a fresh-context
pretest, a failure case, or an independent review.

## Pick one starting method

Do not begin by installing a pile of methods. Start from the problem in front
of you, use one small route, and keep the result you can inspect.

| If you want to… | Start with | Leave with |
| --- | --- | --- |
| Send a first low-risk message to any text LLM | [Dialogue Brief](prysai-dialogue-brief/SKILL.md) | One plain request with a visible outcome, limit, check, and stop point |
| Practise Spanish, an interview answer, writing, or another human skill | [Practice Target](prysai-practice-target/SKILL.md), then [Learning Coach](prysai-learning-coach/SKILL.md) after the first attempt | One small performance to try, followed by feedback on the learner's own work |
| Check a current claim or gather reliable sources | [Source Investigator](prysai-source-investigator/SKILL.md) | A claim ledger, source hierarchy, unresolved conflict, and a stop receipt |
| Recover after a response missed the task | [Communication Failure Triage](prysai-communication-failure-triage/SKILL.md) | The observed miss, one changed condition, and a comparable rerun |

These are candidate methods, not buttons that guarantee an outcome. Use the
[Beginner Practice Pack](../book/communication-clinic-EN.md) when you want
copy-ready, low-risk messages before choosing a Skill.

## Start with a message, not an installation

If you have never used a Skill, do not install anything first. Pick one small,
text-only prompt card, make your own first attempt, and inspect the reply.

- Want to practise one written Spanish travel exchange? Use the [six short
  Spanish messages](../book/communication-clinic-EN.md#six-short-spanish-messages).
  They rehearse one fictional typed situation; they do not promise fluency,
  speaking ability, or a seven-day result.
- Want to practise a work update, interview answer, explanation, or another
  observable performance? Start with the [six short work-update
  messages](../book/communication-clinic-EN.md#six-short-work-update-messages),
  then use [Practice Target](prysai-practice-target/SKILL.md) only if you need
  to shrink a broad goal into a first attempt.
- Want to prepare a careful source check? Use the [research
  prompt](../book/communication-clinic-EN.md#bounded-research-route) with only
  the material you can share. Move to [Source
  Investigator](prysai-source-investigator/SKILL.md) when the question is
  current and the conclusion needs sources.

Each card works with a text chat and has an explicit stop boundary. Copying it
does not prove the model's answer is correct; check the stated acceptance line
before relying on a result.

## Provenance in plain sight

All 25 current entries are original Prysai Lab methods; none is copied or
installed from another project. The generated registry lists original methods
first. If a future entry is adapted or vendored, its **Origin** cell must link
to the canonical upstream project, and its source record and license boundary
must be present before it can enter this directory.

## Current Skills

Current project Skills are listed in the [registry](../docs/skill-registry.md).
The registry is the place to compare triggers, boundaries, maturity, and
runtime evidence; this directory is the implementation surface.

Project-owned Skills are shown first. External candidates are not copied into
this directory merely to increase its size: each one must retain a direct
source-project URL, pass a file-level license review, and clear the same
behavior and evidence gates before adoption.
