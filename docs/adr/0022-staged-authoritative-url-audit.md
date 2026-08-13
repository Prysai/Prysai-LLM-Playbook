# ADR-0022: Stage authoritative URL auditing before blocking releases

## Status

Accepted

## Date

2026-08-12

## Context

The fact-impact registry maps 24 current or disputed claims to 10 deduplicated
first-party documentation URLs. Those claims have owners, checked dates, next
reviews, and downstream consumers, but CI previously proved only that each URL
was syntactically present. A removed or inaccessible source could remain marked
`current` until a maintainer manually revisited it.

External checks are also noisy. Rate limits, temporary server failures, network
outages, bot restrictions, and HEAD handling can fail without invalidating the
claim. Conversely, HTTP 200 does not prove that a page still contains or
supports the recorded statement.

## Decision

1. Store the network policy in
   `docs/governance/external-url-audit.yaml` and derive targets from the
   fact-impact registry instead of copying URLs into a second list.
2. Cover only allowlisted HTTPS hosts and reject redirects before they leave
   the allowlist.
3. Deduplicate transport requests while preserving every mapped claim ID.
4. Use bounded timeouts and attempts, HEAD first, and a small GET fallback only
   for configured statuses.
5. Classify reachable, not-found, restricted, rate-limited, server, timeout,
   network, unexpected-status, and outside-policy redirects separately.
6. Run weekly and on manual dispatch, upload JSON and Markdown reports, and
   publish the same report as the workflow summary.
7. Begin in `report_only` mode. Policy/schema/fixture/execution failures still
   fail the job; observed third-party reachability findings do not yet block
   every contribution.
8. Keep Q-007 `in_progress`. Upgrade stable failure classes to blocking only
   after repeated scheduled observations establish retry behavior, false
   positives, ownership, and an escalation/exception process.

## Alternatives considered

### Check every external link on every pull request

Rejected. The repository contains research, community, historical, and
reference-only links with different owners and risk. A broad blocking crawler
would create noise without tying failure to release claims.

### Treat any non-200 response as a broken source

Rejected. Valid pages can redirect, require GET, rate-limit automation, or
temporarily fail. Failure categories require different maintainer actions.

### Mark claims fresh whenever the URL returns successfully

Rejected. Reachability is transport evidence, not semantic review. It cannot
update `checked_at`, `claim_status`, or `next_review` by itself.

### Allow arbitrary HTTPS hosts from the registry

Rejected. A governance edit could otherwise turn the scheduled runner into an
unbounded network client. New hosts require an explicit policy review.

## Consequences

- The project gains regular, claim-mapped transport evidence without making PR
  reliability depend immediately on a third-party service.
- Redirect and host handling become an explicit security boundary.
- Maintainers receive categorized evidence and can distinguish removal from
  access restrictions or transient failures.
- Semantic source review remains manual or separately automated; a green URL
  audit cannot close Q-007.

## Evidence boundary

The audit proves the recorded HTTP/network observation at one time from one
runner. It does not prove source meaning, product behavior, account access,
claim accuracy, local reproduction, or publication readiness.
