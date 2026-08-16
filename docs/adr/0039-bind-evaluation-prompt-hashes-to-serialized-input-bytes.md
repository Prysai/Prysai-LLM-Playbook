# ADR-0039: bind evaluation prompt hashes to serialized input bytes

## Status

Accepted.

## Date

2026-08-15

## Context

The Shift Handoff v1 packet builder calculated prompt hashes from Python text,
then wrote the files with platform-default newline handling. A review of the
historical Windows packet directory found `CRLF` bytes where the recorded
hashes represented `LF` text bytes. The manifest was retained and the model
outputs were de-identified, but the declared input hashes could not prove the
exact serialized prompts.

The old round must remain a historical capture record rather than being
rewritten to look valid. Future evaluation packages need an input binding that
survives Windows, macOS, Linux, and later inspection.

## Decision

1. The builder now writes every prompt as UTF-8 with explicit `LF` newlines.
2. V2 manifests state `sha256:utf-8-bytes:lf-newlines`; tests hash raw file
   bytes, not newline-normalized text.
3. The blind-review generator accepts only the current v2 manifest revision.
4. The historical v1 collection, its log, and its responses are preserved with
   an explicit input-integrity review, but they are ineligible for comparative
   scoring or aggregation.
5. A future v2 run must retain its exact prompt files, manifest, candidate SHA,
   declared surface/settings, and a pre-collection freeze record before the
   first model call.

## Alternatives considered

### Rewrite the historical manifest with the observed CRLF hashes

Rejected. It would create a post-collection manifest and could be mistaken for
a pre-frozen input record.

### Treat line endings as irrelevant

Rejected. The declared contract was byte-level hashing. Downgrading that
contract after collection would make the evidence boundary depend on a desired
result rather than the recorded design.

### Hash normalized text only

Rejected for future packets. It can be useful for content comparison, but it
does not prove which serialized bytes were prepared or retained. A normalized
text digest may be added later as a separate, clearly named field.

## Consequences

- The next collection must use a new v2 packet set; it cannot silently reuse
  the v1 outputs for a comparative claim.
- Windows-specific newline behavior is covered by a regression test.
- The candidate evaluation remains open: byte binding is necessary, but it
  does not provide independent scoring, model-version control, user evidence,
  reliability, or a benefit conclusion.

## Evidence boundary

Passing the v2 packet-builder test proves only that its generated local files
match their recorded prompt hashes under the test conditions. It does not prove
the files were sent to a model, that a browser preserved those bytes, that an
output is correct, or that either prompt layout improves real work.
