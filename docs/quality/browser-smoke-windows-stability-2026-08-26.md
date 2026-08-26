<!-- content_id: browser-smoke-windows-stability-2026-08-26 | kind: quality-record | status: candidate | owner: site-maintainer | reviewed: 2026-08-26 -->

# Browser smoke Windows stability — 2026-08-26

This record documents a test-harness reliability fix. It does not establish
deployment health, browser compatibility beyond the listed local run, learner
outcomes, translation quality, or release readiness.

## Finding

The full browser smoke starts a local Python HTTP server for a request-heavy
matrix. Its access-log `stdout` was connected to an unread pipe, which could
fill and stall the server on Windows. The cleanup path also treated the
expected exit after `server.kill()` as a server failure because Windows can
surface that termination as unsigned `-1` (`4294967295`).

## Fix

- Discard non-diagnostic server `stdout` while retaining `stderr` for failures.
- Mark an intentional cleanup termination before checking for unexpected
  server exits.
- Set the finite default smoke guard to 600 seconds so the complete local
  matrix can finish without relying on an environment override.

## Verification

| Check | Result |
| --- | --- |
| JavaScript syntax and whitespace | passed — `node --check scripts/browser_smoke.mjs`, `git diff --check` |
| Full browser smoke | passed — `npm run test:browser`, `BROWSER_SMOKE_OK`, desktop 1280px, mobile 390px, 8 locales |
| Focused visual and Reader smoke | passed — `npm run test:visuals`, `npm run test:reader-visuals` |
| Repository regression suite | passed — `npm test`, 49 tests |
| Static project and localization gates | passed — project, structure, content, learning contract, core scope, localization, site i18n, release checks |

The result is local candidate evidence for the test harness. It does not move
the curriculum beyond `candidate / not_ready`, and it does not replace an
independent review or learner run.
