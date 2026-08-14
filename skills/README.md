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

## Current Skills

The fourteen project Skills are listed in the [registry](../docs/skill-registry.md).
The registry is the place to compare triggers, boundaries, maturity, and
runtime evidence; this directory is the implementation surface.

Project-owned Skills are shown first. External candidates are not copied into
this directory merely to increase its size: each one must retain a direct
source-project URL, pass a file-level license review, and clear the same
behavior and evidence gates before adoption.
