# ADR-0007: Use one machine-readable learning-path contract

## Status

Accepted

## Date

2026-08-10

## Context

The project already has seven capability levels, 22 chapters, 17 labs, seven
project Skills, and 38 evaluation fixtures. Those assets were individually
valid, but their relationships were maintained in several places. Reused labs
were not distinguished as primary, prerequisite, transfer, or reference work;
evaluation fixtures were not linked to the assets they assess; and the public
site showed only one recommended chapter for each level.

## Decision

Use `docs/governance/learning-path.yaml` as the single machine-readable
contract for L0–L6. Each level declares its prerequisites, primary chapters,
primary lab, supporting labs, supporting Skills, evaluation fixture IDs,
evidence types, graduation gate, blocked conditions, owner, and artifact
status.

The contract is separate from `content-status.yaml`: the path describes
relationships and progression, while the status source describes maturity,
run state, review dates, and evidence records. Skill applicability remains a
routing concern and does not become a learner's graduation level.

## Alternatives considered

### Keep the mappings in Markdown and JavaScript

Rejected because each new chapter or experiment would require manually
updating multiple representations, allowing silent drift between the book,
site, and evaluation set.

### Put the path into the current status source

Rejected because maturity/status and curriculum relationships change for
different reasons and need different owners and validation rules.

## Consequences

- Future path changes have one canonical data file and one validator.
- The site can present an executable level contract rather than a single link.
- Shared labs and Skills can be reused without pretending they are separate
  assets or separate proof of mastery.
- The contract adds a maintenance obligation: references and statuses must be
  validated on every quality run.
- The current path remains `candidate`; the new contract does not prove that
  labs, Skills, evaluations, or browser behavior have run successfully.
