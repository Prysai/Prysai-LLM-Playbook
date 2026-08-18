# Sensitive-information audit — 2026-08-18

## Executive summary

This was a repository-grounded audit of the Prysai LLM Playbook. The code
verification snapshot was committed as
`60f4aa3c7c84b69c31d44409b6f1cb60442e29ab`; the current evidence-record
snapshot is `8a0ab55a7859ffedea24567319c260e1fabd3b0f`. The latter only updates
this audit record, while retaining the verified CodeQL permission validator,
its 42 focused fixtures, and the preceding Reader and deployment-boundary
fixes. The working tree was clean before this evidence refresh.
No high-confidence API key, access token, private key, JWT, credential-bearing
URL, device identifier, MAC address, or private-network location remains in the
current tracked candidate file set after the fixes in this audit.

### Post-audit deployment verification — 2026-08-18

The historical scan snapshot above is not the current publication receipt. The
repository state audited for this record is
`8a0ab55a7859ffedea24567319c260e1fabd3b0f`; this audit file is a
documentation-only follow-up commit.
For the code verification snapshot, Security run
[32195940061](https://github.com/Prysai/Prysai-LLM-Playbook/actions/runs/32195940061),
CodeQL run [32195940006](https://github.com/Prysai/Prysai-LLM-Playbook/actions/runs/32195940006),
and Quality run [32195939994](https://github.com/Prysai/Prysai-LLM-Playbook/actions/runs/32195939994)
completed successfully. The evidence-record snapshot's Pages/Docs workflow
[32196731775](https://github.com/Prysai/Prysai-LLM-Playbook/actions/runs/32196731775)
also completed successfully after the required environment approval, with Docs
deployment `5973053336`; its GitHub Pages deployment completed in the same run.
The
`docs-prysai-production` environment metadata shows a required `uuzzrm` reviewer
and a `main` deployment-branch policy. This supersedes the earlier SIA-10
observation for the current deployment, but does not certify the external host.

The current-tree scan is clean. A replay of the repository detector over the
reachable object database found one provider-shaped match in an older negative
test fixture (`6173a14`); local inspection confirmed that it was synthetic test
data, not a live credential. Historical objects also retain old maintainer-local
path text, but no current-tree or unreachable-object credential/private-key
match was found. The current tests assemble detector values at runtime.

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
- 7 GitHub Actions workflows, including PR permissions, checkout credentials,
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
- remote workflow receipts for the code verification snapshot: [security run
  32195940061](https://github.com/Prysai/Prysai-LLM-Playbook/actions/runs/32195940061),
  [CodeQL run 32195940006](https://github.com/Prysai/Prysai-LLM-Playbook/actions/runs/32195940006),
  and [quality run 32195939994](https://github.com/Prysai/Prysai-LLM-Playbook/actions/runs/32195939994);
  the evidence-record publication receipt is [Pages/Docs run
  32196731775](https://github.com/Prysai/Prysai-LLM-Playbook/actions/runs/32196731775).
  Workflow logs were read without exposing secret values.
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
device identifiers. The validator now detects these classes and has 42 focused
fixtures, including false-positive checks for ordinary URLs, filenames,
explicit synthetic paths, large text files, and secret-bearing deployment
artifact boundaries.

### SIA-03 — Static-site and workflow boundary — no issue observed

The static site uses a restrictive same-origin CSP contract and the browser
code does not expose an authentication system or production API client. The
Pages workflow references secrets only as GitHub Actions secret contexts in the
protected deployment path; no secret value is present in repository content.
The repository security workflow remains read-only, uses `pull_request`,
disables persisted checkout credentials, and pins third-party Actions to full
SHAs. CodeQL also uses `pull_request`, has no secrets context, and is the only
PR workflow allowed to request a write scope: exactly
`security-events: write`, alongside `actions: read`, `contents: read`, and
`packages: read`, so it can upload its own analysis results. Other PR
workflows are rejected by the validator if they request any write scope.

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

The scan of 888 commits and 5,238 reachable blobs found one provider-shaped
match in the historical `scripts/test_build_pages_artifact.py` blob introduced
by commit `6173a14`. The surrounding test was explicitly a negative fixture,
and the values were synthetic. The current version keeps only redacted text and
runtime string assembly, so the current-tree gate passes. No rotation or
history rewrite is justified by this evidence. Historical path privacy residue
is retained as audit context; it is not evidence of an active device or
credential exposure.

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

At the repository snapshot recorded by this report, the active GitHub Ruleset
still lists a `RepositoryRole` actor with `bypass_mode=always`. The security
changes were pushed directly to `main`; GitHub's push response explicitly
reported that the push bypassed the pull-request requirement, verified-signature
requirement, and Code Scanning wait. This confirms that the recorded Ruleset
bypass was operational, not merely metadata.

Security, CodeQL, Quality, and Pages/Docs runs for the current SHA succeeded.
The repository's separate formal release readiness remains `not_ready`. No
host-side Ruleset mutation was performed; the bypass remains an open governance
risk and must be rechecked before release.

### SIA-09 — Secret-bearing deployment job had redundant build authority — fixed

Severity: Medium workflow-hardening issue; no secret value was exposed.

The Docs deployment job previously checked out the repository, installed
Python, and rebuilt the Pages artifact in the same job that loaded
`DOCS_DEPLOY_SSH_KEY`. The build job already produced and validated the
`pages-candidate-${{ github.sha }}` artifact. The workflow now downloads that exact
artifact with a pinned `actions/download-artifact` action, preserves the hidden
`.nojekyll` marker in the candidate artifact, and grants the Docs job only
`actions: read`; it no longer checks out source or executes the build scripts
beside the deployment key. See ADR-0045.

### SIA-10 — Docs deployment environment protection — fixed on host

Severity: Medium governance risk; no secret exposure was observed.

GitHub API metadata now shows the `docs-prysai-production` environment has a
required reviewer rule for `uuzzrm` and a custom deployment branch policy whose
only policy is `main`. The workflow also restricts the deployment job to
`refs/heads/main`. Secret values were not read; this is host-side protection
evidence and is not represented as a repository file change. Re-verify it before
each release because environment settings are not versioned in this repository.

## Scan results

| Surface | Result | Evidence boundary |
| --- | --- | --- |
| Current candidate files | Pass; 1,097 candidate files, 7 workflows | Static patterns and policy checks only; the largest text artifact is approximately 5.2 MiB |
| Focused security fixtures | Pass; 42 fixtures | Detector behavior, including CodeQL PR permission boundaries, synthetic false-positive boundaries, large-file coverage, and secret-bearing deployment artifact boundaries |
| All refs and reachable history | 20 refs; 888 reachable commits and 5,238 reachable blobs; current candidate files have 0 high-confidence credential, private-key, device, MAC, private-network, or authentication-URL matches; 1 older provider-shaped historical fixture is classified synthetic; historical path residue remains | Pattern scan of local branches, remote-tracking refs, and tag; not every provider-specific secret format |
| Unreachable Git objects | 142 blobs across 15 unreachable commits; the current detector found old machine-local path residue but 0 provider-shaped credential/private-key hits | Classified historical data; local object reachability/retention can change |
| Git stash/reflog | No stash entries; reflog showed normal repository refs | Does not inspect remote provider backups or account logs |
| Workflow permissions and action refs | Pass; all checkout steps disable persisted credentials, all third-party refs use full SHAs, the candidate artifact preserves hidden `.nojekyll`, and Docs deploy consumes the validated build artifact without checkout/build execution | Does not prove every hosted runner or future workflow remains safe |
| Host-side security controls | Secret Scanning, Push Protection, Dependabot security updates, and Actions SHA pinning enabled; non-provider patterns disabled; Docs environment requires reviewer `uuzzrm` and branch policy `main` | Repository-level API settings only; the Ruleset bypass actor is the pre-mutation observation and non-provider patterns remain disabled |
| Dependencies | Pass; `npm audit` reported 0 vulnerabilities and top-level dependency listing contains Playwright only | Local npm advisory snapshot; does not replace ongoing update review |
| Native frontend and binary assets | Pass; no dangerous string execution/HTML sink found; 10 tracked PNG assets, no archives/databases/private-key files, no PNG text metadata findings | Static review and filename/byte checks; no image steganography or independent provider scanner |
| Published surfaces | GitHub Pages and Docs returned 200; workflow `32196731775` completed build, Pages, Hugging Face, and Docs publication for the evidence-record snapshot; body scans found no sensitive rule IDs | Response-header hardening differs by host; live content and headers can change |
| Static CSP | Pass under the repository policy; an early meta CSP is present | Both live responses lacked a CSP response header; meta CSP is not a substitute for runtime HTTP headers |
| External source archives | Incomplete; no archive directory was configured | Original archives were not supplied, so source/license audit coverage is incomplete |
| Release evidence | Quality run `32195939994` for the code verification snapshot completed successfully and uploaded its packet; formal readiness remains `not_ready` | A passing check or uploaded packet is not release approval |

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
- CodeQL analysis records for the current code snapshot exist for JavaScript and
  Python, each with zero results; this does not certify the repository against
  every scanner or future change.
- The `docs-prysai-production` Environment protection is host-side and is not
  versioned here; the current check observed a required reviewer and `main`
  branch policy. The Ruleset bypass actor remains active.
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
3. Before a release, separately re-verify live HTTP headers, Pages/Docs
   deployment state, GitHub Environment protection and secret scope, the active
   Ruleset bypass list, and host-side Secret Scanning settings.
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
- [Evidence-record Pages/Docs workflow run 32196731775](https://github.com/Prysai/Prysai-LLM-Playbook/actions/runs/32196731775)
