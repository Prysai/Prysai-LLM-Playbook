# Review evidence: snapshots and experiments

Use this guidance for a PR or issue follow-up that requests a snapshot, trace,
benchmark, test result, or before/after comparison. The goal is a reviewer-reproducible
artifact, not a reassuring summary.

## Evidence packet

Provide these fields in the response, omitting only fields that genuinely do not apply.
State what is unavailable instead of filling a gap with an inference.

1. **State** — Give the exact base and head commit. Say which commit each result
   represents.
2. **Reproduction** — Give the literal command, relevant test path, fixture or input,
   configuration, seed when applicable, environment, and whether a provider, network,
   clock, or other external service was exercised.
3. **Capture** — Show or link the raw trace, JSON, log, screenshot, or numerical output
   before summarizing it. For snapshots, capture both states through the same path.
4. **Comparison** — Name each quantity, unit, expected value or source, error metric,
   and tolerance. Explain whether the reference is an external measurement, an upstream
   implementation, or a deterministic regression value.
5. **Scope and status** — State the configurations and behaviors covered, exclusions,
   repeatability or known variability, and the final-head test or CI result. Do not use
   a result from an earlier commit to vouch for a later change.
6. **Decision** — Answer the review request directly: what is added now, what is
   deferred, why, and which issue or follow-up owns deferred work.

## Classify the experiment

- **External validation:** compare against an observed measurement or a pinned external
  implementation. Cite its identity and conditions; do not call one matching output a
  complete model validation.
- **Deterministic regression:** pin the output of a defined execution path so future
  changes are detectable. It protects that path; it is not an independent proof that the
  output is physically or externally correct.
- **No usable reference:** report the missing evidence and avoid adding an assertion
  merely because a reviewer named another metric.

## Compact response template

```markdown
State: before `<base>`; after `<head>`.
Reproduction: `<command>` using `<fixture/config>` on `<environment>`;
`<external dependency>` was <used/not used>.
Capture: <raw before/after output or artifact link>.
Comparison: `<metric>` (<unit>) is compared with `<reference>` using `<error metric>`
and `<tolerance>`; this is <external validation/deterministic regression>.
Scope: covers <behaviors/configurations>; excludes <behaviors/configurations>.
Status: `<final-head command or CI job>` <passed/failed/is pending> at `<head>`.
Decision: add <item> now; defer <item> to <issue/reason>.
```

Avoid saying "all tests pass," "fully validated," or "accepted" unless the exact
command or CI state, commit, scope, and review decision support that claim.
