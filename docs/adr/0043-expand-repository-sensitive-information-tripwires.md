# ADR-0043: Expand repository sensitive-information tripwires

## Status

Accepted. The repository remains a `candidate` security policy; this decision
does not enable host-side branch protection or prove that historical data is
safe.

## Date

2026-08-18

## Context

The existing read-only security gate checked a small set of credential
signatures, credential-shaped files, workflow boundaries, and the static site's
CSP. A repository-wide audit also needed to catch accidental publication of
machine-local paths, `file:` URIs, credential-bearing URLs, private network
locations, MAC addresses, and labeled device identifiers. The project contains
teaching fixtures and negative tests, so a broad pattern scan must not turn
synthetic examples into arbitrary permanent allowlists.

## Decision

1. Keep the scan offline, deterministic, read-only, and secret-value-free in
   its output.
2. Add high-confidence token/private-key signatures plus secret-like
   assignments, authorization headers, credential-bearing URLs, and
   secret-bearing query parameters.
3. Add detection for Windows/POSIX user paths, Codex-local paths, local file
   URIs, private IPv4/hostname locations, MAC addresses, and labeled device
   identifiers.
4. Permit only narrow synthetic-context handling: a fixture/path exception
   must be explicitly marked on the same line or use a clearly synthetic
   placeholder. Focused negative tests assemble their values at runtime so the
   repository does not carry complete detector samples as apparent disclosures.
5. Report rule IDs and relative file paths only. Never print matched secret
   values, token fragments, or file contents.
6. Treat reachable history, unreachable Git objects, account secrets, hosted
   headers, dependency vulnerabilities, and runtime behavior as separate audit
   surfaces. A passing current-tree gate does not establish those surfaces.

## Alternatives considered

### Allow all examples and tests by path

Rejected. A path-wide allowlist could hide a real secret added beside a test or
fixture. The exception is limited to explicit synthetic context and the tests
exercise the detector with runtime-assembled values.

### Print matched values for faster triage

Rejected. A security checker must not create a second disclosure in CI logs.
Triage uses a local, authorized inspection of the named file/object and can
rotate a credential without copying it into an issue or report.

### Rewrite Git history automatically

Rejected for this audit. No real credential was found in reachable history or
the inspected unreachable objects. Rewriting history is destructive to refs and
requires an explicit, separately scoped authorization if a real secret is
confirmed.

## Consequences

- The PR gate catches more privacy and credential regressions without network
  access or repository write permissions.
- Some legitimate teaching examples need explicit synthetic labels or
  placeholders; this makes their safety boundary visible.
- The patterns are high-signal tripwires, not a full DLP engine. Reviewers must
  inspect suspicious matches safely and consider encoding, binary files,
  provider-specific formats, generated artifacts, and external systems.
- The policy and this ADR require re-review when new secret formats, generated
  content, publishing targets, or host-side controls are introduced.

## Evidence boundary

The implementation and fixture evidence are recorded in
[`scripts/validate_repository_security.py`](../../scripts/validate_repository_security.py)
and
[`scripts/test_validate_repository_security.py`](../../scripts/test_validate_repository_security.py).
The machine-readable policy records the checks and review date. The companion
audit report records the 2026-08-18 scan scope, results, limitations, and
remaining host/history boundaries without reproducing sensitive values.
