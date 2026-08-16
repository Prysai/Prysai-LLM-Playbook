# Static-site security review — 2026-08-15

**Status:** candidate security review. It records a source and code snapshot;
it is not a penetration test, host-configuration audit, certification,
compliance finding, deployment approval, or claim that the project is secure.

**Scope:** the static Reader and showcase, repository workflows, and the local
candidate security-policy checks. No account, repository setting, Pages
deployment, live URL, token, secret, external service, or user data was
accessed or changed.

**Review methods:** a targeted JavaScript security scan, source inspection,
the local repository-security validator and fixtures, the local Pages-artifact
check, and the complete browser smoke suite. The host-governance boundary is
recorded separately in [the GitHub Pages source receipt](../research/github-pages-host-governance-boundaries-source-receipt-2026-08-15.md).

## Executive summary

No critical or high-severity client-side finding was confirmed in this local
candidate snapshot. The Reader builds visible Markdown with DOM nodes,
filters unsafe link and image destinations, and does not expose a known
untrusted string-to-code or HTML-insertion path in the inspected surface.

This review did find two medium host-side gaps: a meta CSP cannot prove the
HTTP headers or anti-framing policy of a future deployment, and the current
private organization plan does not enforce the proposed `main` Ruleset.
Those gaps remain release and governance risks even though the local static
surface now has a restrictive CSP and the repository workflows have
least-privilege static checks.

## Verified local controls

| Control | Evidence | Limit |
| --- | --- | --- |
| Restrictive same-origin CSP | `site/index.html:5` and `site/reader.html:5` now declare `default-src 'self'`, no inline/eval exception, `object-src 'none'`, `form-action 'self'`, and `frame-src 'none'`. `scripts/validate_repository_security.py` rejects a missing, late, incomplete, or unsafe policy; 14 focused fixtures passed. | A meta CSP cannot prove host HTTP headers or prevent another origin from framing the page. |
| Markdown rendering avoids HTML sinks | `site/reader.js:132-133` rejects `data:` and `javascript:` source paths; `site/reader.js:344-349` allows only resolved project paths, `https?`, or `mailto:` destinations; `site/reader.js:470-506` allowlists rendered HTML and rechecks URL attributes. Normal rendering builds elements and writes text through `textContent` (for example `site/reader.js:360-434`). | A future parser or allowlist change needs the same URL and DOM-sink review. |
| Non-sensitive browser storage | `site/app.js:629-644` reads only a locale preference, then accepts it only if it is in the controlled locale list. `site/reader.js:939-947` applies the same constrained selection. | Browser storage remains attacker-influenced input; it must never be extended to contain credentials, participant data, or authority decisions. |
| Workflow and dependency hardening | `security-policy.yml` uses a `pull_request` trigger, `contents: read`, SHA-pinned Actions, and non-persisted checkout. `quality.yml:30` pins the CI-only validator dependency to binary-only `PyYAML==6.0.3`; the static policy now tests that contract. | A pin and static scan do not replace provenance review, vulnerability monitoring, or a host-side required-check rule. |
| Actual local interface regression | `BROWSER_SMOKE_OK` completed after the CSP change across desktop and 390px views; the browser run also asserts no console or page errors on its declared routes. | This is not an external penetration test, accessibility certification, deployment test, or user study. |

## Findings requiring an authorized host or release decision

### SEC-001 — HTTP security and anti-framing policy are unverified

**Severity:** Medium
**Location:** future Pages or external-host deployment; no live deployment is
in scope. The local meta CSP at `site/index.html:5` and `site/reader.html:5`
does not include `frame-ancestors`, because that directive is not enforceable
from a meta policy.

**Evidence:** the project is still `not_ready` in
`docs/governance/release-readiness.yaml:4`; the GitHub Pages source receipt
records no Pages configuration, URL, audience, deployment, or runtime header
observation.

**Impact:** if a future host does not send an appropriate HTTP CSP with
`frame-ancestors`, another site could frame the reader and mislead or
clickjack a visitor. This review has no evidence of that configuration either
way.

**Required fix before a public site claim:** select a host that can provide
the desired HTTP response headers, deploy a bounded candidate only after
authorization, capture the response headers and framing behavior at the real
URL, and retain the result with release evidence. Do not treat the current
meta CSP as proof of anti-framing or full production header coverage.

### SEC-002 — Branch and review enforcement are still host-side gaps

**Severity:** Medium
**Location:** `docs/governance/repository-security-policy.yaml:63-86` and
`SECURITY.md:67-70`.

**Evidence:** the policy records
`unenforceable_on_private_organization_plan` and `configuration_state:
not_created`. The local workflow can flag unsafe changes, but no local file
can prove a required review, required check, direct-push block, force-push
block, or deletion restriction on `main`.

**Impact:** a direct write or an unreviewed merge could bypass the review
process that protects the static site, source records, and workflows.

**Required fix before describing branch protection as active:** obtain the
required organization capability, configure the documented Ruleset or a
protected-branch rule, and verify it with a controlled test pull request and
a failed direct-push or rule-inspection observation. Keep the bypass list empty
unless a time-bounded emergency exception is explicitly approved.

## Residual observations, not confirmed vulnerabilities

- The repository has no inspected third-party scripts, remote stylesheets,
  `postMessage` listener, dynamic code execution, or credential-like browser
  storage in the scanned site files. This is a narrow code observation, not a
  guarantee that future content, hosting, browser extensions, or dependencies
  cannot add risk.
- The quality workflow now pins the one installed Python validation package,
  but a pin is not a complete dependency-vulnerability or package-provenance
  program. Any new dependency, action pin, workflow permission, or generated
  artifact needs the heightened review path in the repository policy.
- The project should retain the local CSP as defense in depth even if a future
  host supplies stronger headers. Removing it would reintroduce an avoidable
  regression risk for static previews and alternative hosting.

## Evidence run for this review

```text
REPOSITORY_SECURITY_POLICY_OK workflows=4 candidate_files=680
REPOSITORY_SECURITY_POLICY_TESTS_OK fixtures=14
PAGES_ARTIFACT_OK mode=temporary
BROWSER_SMOKE_OK initial_search_requests=0 lazy_search_requests=1 desktop=1280 mobile=390 ...
```

The exact candidate worktree was dirty while this review was written. These
results describe the inspected local files only and must not be relabeled as a
remote GitHub deployment, a release, a security certification, or a claim that
the project has no security defects.

## Review trigger

Review this record before a Pages or external-host deployment, a host-header
change, a `CODEOWNERS` or Ruleset decision, a workflow permission or action
change, a dependency addition, a Markdown-renderer change, or a change to the
CSP contract. For a suspected real vulnerability, use the private reporting
path in [`SECURITY.md`](../../SECURITY.md); do not publish a sensitive report
or proof material in an issue.
