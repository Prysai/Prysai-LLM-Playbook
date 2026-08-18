# Sensitive-information audit — 2026-08-18

## Executive summary

This was a repository-grounded audit of the Prysai LLM Playbook. The second
round was refreshed on 2026-08-18 in a worktree whose committed base was
`2eb257e`; it also included the uncommitted deployment-hardening and exact-
permission-validator changes listed in this report. The report does not treat
the earlier `1842b18` snapshot as evidence for SIA-09. The follow-up commit
containing this report binds those changes to a reproducible repository state.
No high-confidence API key, access token, private key, JWT, credential-bearing
URL, device identifier, MAC address, or private-network location remains in the
current tracked candidate file set after the fixes in this audit.

The current-tree scan is clean. The reachable main history still contains one
credential-shaped match in an older negative test fixture (`6173a14`); local
inspection confirmed that it was synthetic test data, not a live credential.
The current test assembles its detector values at runtime, and no unclassified
historical credential match was found.

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
- the dedicated repository-security validator and its focused negative fixtures;
- live GET responses from the GitHub Pages and Docs publishing URLs, including
  response-header presence and a redacted body scan.
- authenticated GitHub repository settings and recent workflow conclusions;
  secret values were not read.
- all local branches, remote-tracking branches, and tags recorded by
  `git for-each-ref`, plus unreachable blobs and commits reported by
  `git fsck --full --unreachable --no-reflogs`;
- tracked binary assets and archive/database/private-key filename classes;
- `npm audit --json`, top-level `npm ls --depth=0`, native frontend security
  sinks, and GitHub Environment/secret metadata without reading secret values.

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
device identifiers. The validator now detects these classes and has 30 focused
fixtures, including false-positive checks for ordinary URLs, filenames,
explicit synthetic paths, and large text files.

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

### SIA-04 — Large-file scan bypass — fixed on current main

Severity: Medium prevention gap.

The previous validator silently skipped text files larger than 1,000,000
bytes. The generated `site/search-index.js` is approximately 5.2 MiB, so that
rule created a real blind spot for a repository-owned public artifact. The
validator now scans files up to 25 MiB and fails closed above that limit;
the focused fixture now proves that a credential-shaped value in a formerly
skipped large text file is detected.

### SIA-05 — Secret-bearing manual publication path — narrowed on current main

Severity: Medium workflow-hardening issue; no secret value was exposed.

The Pages workflow has repository secrets for optional Hugging Face and Docs
publication. The current workflow requires publication steps to run only
when `github.ref == 'refs/heads/main'`, disables persisted checkout credentials
on every checkout, and leaves non-main manual runs as review-artifact builds.

### SIA-06 — Historical synthetic credential-shaped fixture — reviewed

Severity: Informational historical residue; no live credential was established.

The scan of 849 commits reachable from the audited `main` snapshot found one
provider-shaped
match in the historical `scripts/test_build_pages_artifact.py` blob introduced
by commit `6173a14`. The surrounding test was explicitly a negative fixture,
and the values were synthetic. The current version keeps only redacted text and
runtime string assembly, so the current-tree gate passes. No rotation or
history rewrite is justified by this evidence.

### SIA-07 — Published response-header hardening gap — open outside this repository

Severity: Low defense-in-depth gap; no sensitive data was observed in either
published HTML response.

On 2026-08-18, both published URLs returned HTTP 200 and the redacted body scan
reported no repository-sensitive rule IDs. The GitHub Pages response exposed
HSTS but no CSP, `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, or `Permissions-Policy` response header. The Docs response
exposed `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`, but
no CSP, HSTS, or `Permissions-Policy` response header.

The repository does contain an early same-origin meta CSP. That is useful
defense in depth, but it is not equivalent to an HTTP CSP header and cannot
provide every header-only control. The Docs host should add the missing
response headers at its edge/server; GitHub Pages cannot be configured from
this repository, so the meta policy must remain there unless an edge proxy is
introduced.

### SIA-08 — Ruleset bypass and release-evidence boundary — open

Severity: Medium governance risk; no secret exposure was observed.

The active GitHub Ruleset still lists a `RepositoryRole` actor with
`bypass_mode=always`. The final audit-report commit was pushed directly to
`main`; GitHub's push response explicitly reported that the push bypassed the
pull-request requirement, verified-signature requirement, and Code Scanning
wait. This confirms that the recorded Ruleset bypass is operational, not merely
metadata.

The security and Pages workflows for the final commit succeeded. The quality
workflow also concluded `success`, but its release-evidence step emitted
`decision=blocked` under `continue-on-error`; the repository's formal release
readiness therefore remains `not_ready`. Remove or narrow the permanent
bypass, require signed reviewed changes, and run the formal release gate for a
separately reviewed candidate before promoting the security policy or release
status.

### SIA-09 — Secret-bearing deployment job had redundant build authority — fixed

Severity: Medium workflow-hardening issue; no secret value was exposed.

The Docs deployment job previously checked out the repository, installed
Python, and rebuilt the Pages artifact in the same job that loaded
`DOCS_DEPLOY_SSH_KEY`. The build job already produced and validated the
`pages-candidate-${{ github.sha }}` artifact. The workflow now downloads that exact
artifact with a pinned `actions/download-artifact` action and grants the Docs
job only `actions: read`; it no longer checks out source or executes the build
scripts beside the deployment key. See ADR-0045.

### SIA-10 — Docs deployment environment protection — open outside this repository

Severity: Medium governance risk; no secret exposure was observed.

GitHub API metadata showed the `docs-prysai-production` environment has the
`DOCS_DEPLOY_SSH_KEY` secret but no protection rules and no deployment branch
policy. The workflow itself restricts the job to `refs/heads/main`, but the
environment should also require the intended reviewers and protected-branch
policy at the GitHub host. Changing those settings requires an explicit host
administrator decision and is not represented as a repository file change.

## Scan results

| Surface | Result | Evidence boundary |
| --- | --- | --- |
| Current candidate files | Pass; 1,096 candidate files, 6 workflows | Static patterns and policy checks only; the largest text artifact is approximately 5.2 MiB |
| Focused security fixtures | Pass; 34 fixtures | Detector behavior, including synthetic false-positive boundaries, large-file coverage, and secret-bearing deployment permission boundaries |
| All refs and reachable history | 20 refs; 863 reachable commits and 5,194 reachable blobs; current ref tips have 0 high-confidence credential, private-key, device, MAC, private-network, or authentication-URL matches; 1 older provider-shaped historical fixture is classified synthetic | Pattern scan of local branches, remote-tracking refs, and tag; not every provider-specific secret format |
| Unreachable Git objects | 142 blobs across 15 unreachable commits; 1 old `example.test` negative-fixture object matched authentication-URL/query rules; 0 provider-shaped credential/private-key hits | Classified synthetic test data; local object reachability/retention can change |
| Git stash/reflog | No stash entries; reflog showed normal repository refs | Does not inspect remote provider backups or account logs |
| Workflow permissions and action refs | Pass; all checkout steps disable persisted credentials, all third-party refs use full SHAs, and Docs deploy consumes the validated build artifact without checkout/build execution | Does not prove every hosted runner or future workflow remains safe |
| Host-side security controls | Secret Scanning, Push Protection, Dependabot security updates, and Actions SHA pinning enabled; non-provider patterns disabled; 1 repository secret and 1 Docs environment secret names observed without values | Repository-level API settings only; Ruleset has an always-bypass repository role and Docs environment protection is empty |
| Dependencies | Pass; `npm audit` reported 0 vulnerabilities and top-level dependency listing contains Playwright only | Local npm advisory snapshot; does not replace ongoing update review |
| Native frontend and binary assets | Pass; no dangerous string execution/HTML sink found; 10 tracked PNG assets, no archives/databases/private-key files, no PNG text metadata findings | Static review and filename/byte checks; no image steganography or independent provider scanner |
| Published surfaces | GitHub Pages and Docs returned 200; body scans found no sensitive rule IDs | Response-header hardening differs by host; live content and headers can change |
| Static CSP | Pass under the repository policy; an early meta CSP is present | Both live responses lacked a CSP response header; meta CSP is not a substitute for runtime HTTP headers |
| External source archives | Incomplete; no archive directory was configured | Original archives were not supplied, so source/license audit coverage is incomplete |
| Release evidence | Quality workflow succeeded, but its commit-bound release-evidence decision was `blocked`; formal readiness remains `not_ready` | A green workflow is not release approval |

## Remaining limitations

- No credential rotation was performed because no real credential was confirmed.
- No Git history rewrite or unreachable-object deletion was performed. Those are
  destructive operations and require explicit authorization if a real secret is
  later confirmed.
- GitHub secret values, organization settings, hosting headers, deployment
  server access, dependency vulnerability databases, browser profile data, and
  external backups are outside the repository-only evidence collected here.
- GitHub did not enable non-provider pattern scanning through the authenticated
  API request; the repository-local detector remains the additional tripwire.
- `gitleaks`, `trufflehog`, and `detect-secrets` were not installed in the local
  environment, so this audit did not include an independent provider-aware
  scanner.
- Code Scanning alert API returned `no analysis found`; absence of an alert list
  is not evidence that CodeQL analysis has run.
- The `docs-prysai-production` Environment has no protection rules or deployment
  branch policy in the observed GitHub metadata; the repository workflow's
  `main` guard is the only checked-in branch boundary.
- The external archive audit remains incomplete because no
  `--archive-dir <directory>` was supplied.
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
   state, GitHub Environment protection and secret scope, the active Ruleset
   bypass list, and host-side Secret Scanning settings.
4. If a real credential is ever found, stop public publication, rotate/revoke
   it at the provider, identify all reachable and hosted copies, and only then
   consider an explicitly authorized history-remediation plan.

## Evidence files

- [`SECURITY.md`](../../SECURITY.md)
- [`docs/governance/repository-security-policy.yaml`](../governance/repository-security-policy.yaml)
- [`scripts/validate_repository_security.py`](../../scripts/validate_repository_security.py)
- [`scripts/test_validate_repository_security.py`](../../scripts/test_validate_repository_security.py)
- [`docs/adr/0043-expand-repository-sensitive-information-tripwires.md`](../adr/0043-expand-repository-sensitive-information-tripwires.md)
- [`docs/adr/0044-live-host-security-controls-and-publishing-boundaries.md`](../adr/0044-live-host-security-controls-and-publishing-boundaries.md)
- [`docs/adr/0045-deploy-only-validated-pages-artifact.md`](../adr/0045-deploy-only-validated-pages-artifact.md)
