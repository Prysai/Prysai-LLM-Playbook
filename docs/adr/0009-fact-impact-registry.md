# ADR-0009: Track volatile fact consumers in a machine-readable impact registry

## Status

Accepted

## Date

2026-08-10

## Context

The project separates stable teaching principles, volatile product facts,
account/runtime observations, and artifact maturity. The dated Codex facts
refresh contains 24 claims, but a source record alone does not tell a
maintainer which chapter, lab, Skill, evaluation fixture, generated site data,
or review record must be revisited when one claim changes.

Manual search is especially fragile for claims about models, permissions,
Plugins, MCP, work surfaces, and authentication. A file can still link to a
source while silently teaching an outdated support boundary.

## Decision

Maintain `docs/governance/fact-impact-registry.yaml` as the machine-readable
consumer map for volatile facts. It must:

1. use stable claim IDs from the dated canonical fact record;
2. preserve source URL, checked date, next review, evidence class and claim
   status from that record;
3. map each claim to one or more bounded impact groups;
4. list real chapter, lab, Skill, evaluation, site and governance paths;
5. declare a recheck level (`source-only`, `static-review`,
   `fresh-context`, or `runtime`) and required commands;
6. keep `not_run`, `unconfirmed`, and `local_unreproduced_boundary` visible;
7. pass `scripts/validate_fact_impact_registry.py` before the project or CI
   quality run can pass.

The registry is an impact map, not a claim that every listed consumer has
already been re-run. It does not replace `content-status.yaml`, the learning
path contract, source/license records, or evaluation run logs.

## Alternatives considered

### Keep only dated prose source records

Rejected: prose establishes provenance but does not reliably enumerate all
downstream consumers or catch a renamed/missing path.

### Put consumer mappings inside every claim paragraph

Rejected: repeated mappings drift and make a single source refresh expensive to
audit. A separate registry keeps the canonical fact record readable while
making dependencies machine-checkable.

### Treat every fact change as a full project rebuild

Rejected: the four impact groups let maintainers choose the smallest valid
review scope while still requiring explicit escalation for runtime and account
claims.

## Consequences

- A new or changed volatile claim must be added to the canonical source and
  registry in the same change.
- A consumer path or evaluation ID that does not exist fails validation.
- A passing static check still cannot promote content, Skill, lab or evaluation
  status to `verified`.
- Maintainers must record a new review when a Plugin, model, permission,
  work-surface or connector boundary changes.
