# Shift Handoff pilot input-integrity review

**Status:** `integrity defect recorded / comparative analysis ineligible`  
**Reviewed:** 2026-08-15  
**Scope:** the historical v1 prepared-packet manifest and the 18 retained,
de-identified output artifacts in this result directory.

## Finding

The v1 packet builder calculated each prompt SHA-256 from an in-memory UTF-8
string, then wrote the prompt with platform-default newline behavior. On
Windows, the prepared `.md` files were serialized with `CRLF` line endings,
while the declared hashes represented `LF` string bytes. A local byte review of
the retained prepared packet directory found a mismatch for all 18 declared
prompt hashes.

This is an evidence-binding failure. It does not establish that a different
semantic prompt was submitted, and it does not delete or alter the retained
responses. It does mean that this directory cannot demonstrate byte-exact,
pre-frozen prompt inputs for a comparative model-output analysis.

## Evidence retained

- Candidate commit: `a99d0adae1b8211bd9a1870fc7fc02c021790046`.
- The retained [packet manifest](packet-manifest.json) SHA-256 remains
  `58c7ef6f98a116d353126a58c8b6dca574699b3bf23749b979167683aa523c14`.
- The [raw run log](run-log.json) and each response artifact remain unchanged.
- The response collection still records 18 outputs, with 9 declared packets in
  each condition, but it is not a scored result and no random population was
  sampled.

The original prepared-packet location was a local working artifact, not a
repository asset. Its existence is a maintainer report, not a portable or
third-party-verifiable archive. The manifest, candidate SHA, and raw response
artifacts alone do not repair the missing byte binding.

## Consequence

Do not run the analyzer, publish ready-receipt rates, or use either condition
as a comparative result from this round. Do not distribute the earlier local
blind-review folders for scoring. The only supported description is:

> One reported anonymous-web collection captured 18 de-identified responses
> for pre-specified fictional packets. The collection is unscored and its v1
> prompt-byte binding failed review, so it supports no comparative conclusion.

## Corrective action

`scripts/build_shift_handoff_run_packets.py` now emits a v2 manifest and
writes prompts with explicit LF newlines. Its regression test verifies the
SHA-256 of raw file bytes rather than a text value that can normalize line
endings. The blind-review generator accepts only the v2 format.

A future round must generate a new v2 packet directory before collection,
retain the exact prompt files alongside the manifest, record a trustworthy
pre-collection freeze time, and pass the byte-hash check before any model call.
It still needs two independent human reviewers, preserved disagreement,
condition-blinding limits, a declared model surface/version, and a threshold
decision before it can support even a narrow descriptive comparison.
