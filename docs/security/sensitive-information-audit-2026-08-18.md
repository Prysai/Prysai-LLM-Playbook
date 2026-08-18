# Sensitive-information audit — 2026-08-18

## Executive summary

This was a read-only, repository-grounded audit of the Prysai LLM Playbook.
No high-confidence API key, access token, private key, JWT, credential-bearing
URL, device identifier, MAC address, or private-network location remains in the
current tracked candidate file set after the fixes in this audit.

The main confirmed issue was privacy hygiene rather than an active credential:
reader-facing and research records contained maintainer-local paths, including
Windows user/runtime, download, attachment, and font locations. Those paths
were replaced with portable commands, generic placeholders, or intentionally
omitted source locators. The security gate now checks these classes to prevent
regression.

Status: `candidate` security posture. This report is not a penetration test,
secret-management certification, release approval, or proof that a hosted
origin is secure.

## Scope and method

Checked on 2026-08-18 from the repository working tree:

- tracked and unignored candidate files discovered by `git ls-files -co
  --exclude-standard -z`;
- 6 GitHub Actions workflows, including PR permissions, checkout credentials,
  action pinning, and secret-context boundaries;
- static-site entrypoints and same-origin CSP text;
- Python/JavaScript source, documentation, fixtures, generated site inputs,
  source records, and publishing configuration;
- reachable Git history and the local Git object database's unreachable blobs;
- the dedicated repository-security validator and its focused negative fixtures.

The scan reports rule IDs and file paths only. It does not print matched values.
Synthetic security-test inputs are assembled at runtime and are covered by
negative fixtures; they are not broad repository exemptions.

## Verified findings

### SIA-01 — Maintainer-local path disclosure — fixed

Severity: Low privacy exposure; no credential was established.

The audit found local Windows user/runtime paths, attachment/download paths,
fixed Windows font paths, and concrete temporary/example paths in repository
prose or tests. These disclose workstation layout and can make instructions
non-portable. They do not by themselves grant access to the machine.

Fixes applied:

- portable `Get-Command python` examples replace a bundled runtime path;
- source/archive records use `<input-archive-dir>` or omit private source
  locators;
- research and fixture records use generic path placeholders;
- social-preview rendering reads `WINDIR`/`SystemRoot` instead of embedding a
  fixed font directory;
- candidate output examples use `<candidate-output>`.

### SIA-02 — Missing tripwires for non-token sensitive data — fixed

Severity: Medium prevention gap.

The previous gate did not inspect local file URIs, authenticated URLs, secret
query parameters, private IPv4/hostname locations, MAC addresses, or labeled
device identifiers. The validator now detects these classes and has 27 focused
fixtures, including false-positive checks for ordinary URLs, filenames, and
explicit synthetic paths.

### SIA-03 — Static-site and workflow boundary — no issue observed

The static site uses a restrictive same-origin CSP contract and the browser
code does not expose an authentication system or production API client. The
Pages workflow references secrets only as GitHub Actions secret contexts in the
protected deployment path; no secret value is present in repository content.
The PR security workflow remains read-only, uses `pull_request`, disables
persisted checkout credentials, and pins third-party Actions to full SHAs.

The site does use `localStorage` for non-secret learning receipts/language
preferences. The audit did not find cookies, bearer headers, API keys, or
account/session secrets in that storage path. Local storage is still browser-
modifiable state and is not an authority or proof of completion.

## Scan results

| Surface | Result | Evidence boundary |
| --- | --- | --- |
| Current candidate files | Pass; 1,093 candidate files, 6 workflows | Static patterns and policy checks only |
| Focused security fixtures | Pass; 27 fixtures | Detector behavior, including synthetic false-positive boundaries |
| Reachable history | 840 commits scanned; 0 high-confidence credential-signature commit hits | Pattern scan of committed snapshots; not every provider-specific secret format |
| Unreachable Git objects | 142 blobs across 15 unreachable commits; 0 high-confidence credential/private-key hits after regex tightening | Local object database only; object reachability/retention can change |
| Git stash/reflog | No stash entries; reflog showed normal repository refs | Does not inspect remote provider backups or account logs |
| Workflow permissions and action refs | Pass under the repository policy | Does not prove host-side Ruleset enforcement |
| Static CSP | Pass under the repository policy | Meta CSP is not a substitute for runtime HTTP headers |

## Remaining limitations

- No credential rotation was performed because no real credential was confirmed.
- No Git history rewrite or unreachable-object deletion was performed. Those are
  destructive operations and require explicit authorization if a real secret is
  later confirmed.
- GitHub secret values, organization settings, hosting headers, deployment
  server access, dependency vulnerability databases, browser profile data, and
  external backups are outside the repository-only evidence collected here.
- Regex checks can miss encoded, split, provider-specific, binary, or
  intentionally obfuscated secrets. They can also require a narrow fixture
  marker when demonstrating a sensitive shape.
- A passing static site build or workflow does not prove authentication,
  deployment, runtime privacy, indexing, or production readiness.

## Follow-up controls

1. Keep `scripts/validate_repository_security.py` and its fixtures in the PR
   gate; review any pattern or allowlist change as a security-sensitive diff.
2. Run a provider-aware secret scanner in an authorized CI or repository-host
   context if one is adopted; keep its logs redacted.
3. Before a release, separately verify live HTTP headers, Pages/Docs deployment
   state, GitHub Environment secret scope, and the host Ruleset status.
4. If a real credential is ever found, stop public publication, rotate/revoke
   it at the provider, identify all reachable and hosted copies, and only then
   consider an explicitly authorized history-remediation plan.

## Evidence files

- [`SECURITY.md`](../../SECURITY.md)
- [`docs/governance/repository-security-policy.yaml`](../governance/repository-security-policy.yaml)
- [`scripts/validate_repository_security.py`](../../scripts/validate_repository_security.py)
- [`scripts/test_validate_repository_security.py`](../../scripts/test_validate_repository_security.py)
- [`docs/adr/0043-expand-repository-sensitive-information-tripwires.md`](../adr/0043-expand-repository-sensitive-information-tripwires.md)
