# ADR-0040: require a clean matching checkout for release evidence

## Status

Accepted.

## Date

2026-08-15

## Context

ADR-0021 requires release evidence to be bound to one candidate commit. The
packet builder accepted a syntactically valid `--candidate-sha`, but did not
prove that it matched `HEAD` or that the files tested were exactly that commit.
A dirty working tree could therefore produce current local results labelled
with an earlier commit SHA. That weakens the most important identity boundary
of a release packet.

## Decision

1. A full release-evidence invocation must resolve `git rev-parse HEAD` and
   require it to exactly equal the supplied candidate SHA.
2. It must reject tracked, untracked, and staged working-tree changes before
   executing any gate or writing a packet.
3. `--check` continues to validate only the stable contract, so developers can
   inspect the contract while they are working.
4. A local run on a dirty checkout may still be described as a development
   validation, but never as commit-bound release evidence.

## Alternatives considered

### Trust the CLI argument

Rejected. A string supplied by a caller cannot identify the files a local
process actually executed.

### Include the dirty diff in the packet

Rejected. That creates an uncommitted pseudo-release whose identity is hard to
review, reproduce, cite, or roll back. It belongs in development notes, not a
release artifact.

### Permit dirty state only for local runs

Rejected. The same command name and packet shape would invite accidental
overstatement. The contract-only mode already supports safe local inspection.

## Consequences

- CI checkouts can continue to create commit-bound packets because they are
  clean and expose the exact candidate SHA.
- Maintainers must commit or discard unrelated work before producing a local
  packet for a proposed release.
- Existing packets from dirty local worktrees are not retroactively valid
  release evidence; retain them, if useful, only as development validation.

## Evidence boundary

The guard binds the packet's SHA to the checkout identity and excludes local
uncommitted files. It does not prove that all intended files were committed to
a remote, that a tag or release exists, that host-side protection is enabled,
or that the named gates establish learner, runtime, security, or user outcomes.
