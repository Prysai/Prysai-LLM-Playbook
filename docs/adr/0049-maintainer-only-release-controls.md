# ADR-0049: Keep maintainer-only release controls out of public artifacts

## Status

Accepted

## Date

2026-08-30

## Context

An internal maintainer release-control file was tracked in the open repository
and copied by the Pages builder because the builder publishes the declared
`docs/` directory recursively. The same artifact is mirrored to the public Docs
host. The file contained maintainer release gates, rollback and approval
procedure, license review, and security checks. A static scan found no
credential value, but the operational procedure itself was not reader-facing
curriculum and did not need to be distributed as a public source file.

Leaving a public link to a removed file would also create broken contributor
guidance. The repository already has a machine-readable release boundary and
exact-run evidence contracts that are suitable for public review.

## Decision

1. Remove the internal release-control file from the repository and from future
   Pages/Docs artifacts.
2. Use [`docs/governance/release-readiness.yaml`](../governance/release-readiness.yaml)
   and [`docs/governance/release-evidence.yaml`](../governance/release-evidence.yaml)
   as the public release-state and evidence boundaries, with `CHANGELOG.md`
   and the quality register as their declared supporting records.
3. Keep an explicit, normalized deny-list for the former path in
   `scripts/build_pages_artifact.py`. The builder fails closed if the path is
   reintroduced in either the source tree or a staged artifact, including
   case-variant spellings on case-sensitive hosts.
4. Cover the deny-list with a negative fixture so a future refactor cannot
   silently publish the path again.
5. If maintainers need a private operational checklist, store it in an
   access-controlled release system outside this repository. Renaming it into
   another public directory is not a privacy boundary.

## Alternatives considered

### Keep the file but hide it from the Pages artifact

Rejected. A tracked file remains directly browsable through GitHub and can be
copied by other repository consumers even if the site builder excludes it.

### Rename the file to an obscure public path

Rejected. Obscurity is not access control and would preserve the same
unnecessary operational disclosure.

### Delete every governance and quality document

Rejected. Those records define public evidence, source boundaries, and project
status. This decision removes only the maintainer-only checklist and keeps the
public governance contracts that readers and contributors need.

## Consequences

- New GitHub and Pages builds no longer contain the checklist path.
- Historical Git commits may still contain the file; deletion is not history
  rewriting or credential revocation.
- Existing deployed hosts remain unchanged until this commit is merged and
  the deployment workflow publishes and verifies a new artifact.
- A passing local guard proves the declared source/artifact boundary only; it
  does not prove that every historical URL, cache, mirror, or host-level
  system has been purged.

## Evidence boundary

This ADR records a repository and build-policy decision. It does not claim a
complete security audit, production readiness, or a guarantee that no other
public document contains maintainer-oriented material. Future findings should
be handled as separately scoped security or publication changes.
