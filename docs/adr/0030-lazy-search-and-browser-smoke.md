# ADR-0030: Load search on intent and gate critical browser flows

## Status

Accepted

## Date

2026-08-13

## Context

The generated full-text index had grown to about 1.30 MiB and loaded from the
document head on every showcase visit. Most readers do not search, so the page
paid the transfer and parse cost before it knew the index was needed.

The existing accessibility and artifact checks inspect deterministic source
and route facts. They do not execute the First Win copy controls, dynamic
Reader fetch and navigation, query-parameter search, failure states, or mobile
reflow. A green static gate could therefore coexist with a broken reading
flow.

## Decision

1. Keep the generated search index as a separate canonical artifact, but load
   it only after the first non-empty search input, submitted query, or `?q=`
   URL. Keyboard focus alone must not fetch the index.
2. Expose loading and failure through the existing live search status. A
   failed request remains retryable; it never becomes an empty successful
   result.
3. Add a pinned Playwright Chromium smoke test over the built Pages candidate.
   It checks the initial no-index request boundary, one lazy index request,
   search results, both First Win copy feedback paths, Reader rendering and
   previous/next navigation, explicit invalid-path failure, console errors,
   and horizontal reflow at 1280 px and 390 px.
4. Run that smoke test inside commit-bound release evidence. Pin the browser
   library in `package-lock.json`; CI installs only Chromium.
5. Keep visual inspection, screen-reader testing, cross-browser coverage,
   performance measurement, deployment reachability, and learner usability as
   separate evidence.

## Consequences

- A reader who does not search no longer downloads or parses the full index.
- Critical browser behavior can fail the same exact-SHA quality workflow as
  source contracts.
- Quality CI takes longer and installs a browser runtime.
- One Chromium smoke path is deliberately smaller than a complete browser,
  assistive-technology, or user-study matrix.

## Evidence boundary

A passing smoke run proves only that the named flows completed in the pinned
Chromium environment against the generated candidate artifact. It does not
prove search relevance, low-end-device performance, browser compatibility,
WCAG conformance, deployment, adoption, comprehension, or learning outcomes.
