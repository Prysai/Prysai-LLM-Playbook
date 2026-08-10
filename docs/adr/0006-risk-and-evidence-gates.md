# ADR 0006: Use explicit risk and evidence gates for multi-stage work

## Status

Accepted

## Date

2026-08-10

## Context

The project moves from read-only learning to local edits, shared repositories,
account connections, cloud work, and public delivery. A file status such as
`candidate` describes content maturity, but it does not by itself describe
what an Agent may do, who owns the action, or what evidence is missing.

## Decision

Use two explicit gates for work that can affect the project or an external
system:

1. **Risk gate:** classify work as `R0`, `R1`, `R2`, or `R3`. Risk describes
   required scrutiny; it does not grant permission.
2. **Evidence gate:** state the observable evidence required for each claim and
   keep `not_observed`, `unknown`, and `blocked` separate from `verified`.

For L3 or higher learning tasks, and before any `R2`/`R3` action, the task
contract or decision card must identify:

```text
goal | target | owner | inputs and trust | allowed actions | risk
confirmation | checkpoint | rollback | acceptance evidence | stop condition
unknowns | next review
```

The project keeps these dimensions separate:

- artifact maturity: `draft`, `candidate`, `verified`, `production-ready`;
- volatile fact status: `current`, `stale`, `disputed`, `removed`;
- execution observation: `planned`, `authorized`, `executed`, `verified`,
  `not_run`.

Official product facts continue to live in dated source records. A source
refresh can update affected chapters and routing records, but it cannot turn
an account-level or runtime claim into evidence without that observation.

## Alternatives considered

### Treat a broad login or token as permission for the whole workflow

Rejected: identity, resource access, action authorization, and result
verification are different stages. A broad credential statement also does not
define the target, owner, data exposure, or rollback.

### Use one completion status for content and execution

Rejected: a well-structured draft and a successful runtime experiment answer
different questions. Combining them would make static checks look like product
verification.

### Let each Skill invent its own handoff fields

Rejected: incompatible fields make multi-Skill work hard to audit and increase
the chance that owner, confirmation, rollback, or unknowns disappear between
stages.

## Consequences

- Future chapters, labs, Skills, and evaluations can share a small, auditable
  contract.
- Low-risk explanations remain lightweight; the full decision card is reserved
  for work where context, permissions, or side effects matter.
- More work will remain `candidate`, `draft`, `not_run`, or `unknown` until the
  matching evidence exists.
- Maintainers must update the source record, status source, quality note, and
  routing/index entry together when a product fact changes.
