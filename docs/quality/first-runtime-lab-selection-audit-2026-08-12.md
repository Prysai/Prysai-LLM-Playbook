# First runtime Lab selection audit

**Audit date:** 2026-08-12  
**Decision:** prepare **Lab 013 — Run one complete vertical slice** as the
first runtime-evidence slice  
**Current state:** recommendation only; no Lab was run and no status was changed

## Why Lab 013 wins

All 17 canonical English Labs are still `draft / not_run`. Q-001 requires fixed
input, a run log, an artifact, a failure branch, and independent review for L0,
L1, L3, and L6. The first run cannot resolve Q-001 by itself; it should maximize
the value and reusability of the first evidence packet.

| Criterion | Lab 001 | Lab 013 | Lab 015 |
|---|---|---|---|
| Learning-path role | L1 primary | **L3 primary** | L5 supporting |
| Performs a real bounded change | yes | **yes, through the full lifecycle** | no; primarily audits a supplied change and handoff |
| Baseline and identity | path/status; hash not required in its current record | **input hash, baseline state, rollback target** | working directory and supplied diff |
| Staged evidence | inspect, edit, diff, focused check | **CP0 definition through CP4 handoff** | claim ledger after evidence already exists |
| Required failure | four useful variants, but no canonical one selected | **at least one preserved failure and recovery/stop** | missing output file; useful but narrow |
| Recovery and handoff | honest handoff | **recovery, rollback, fresh-context continuation** | next check and reviewer decision |
| Existing evaluation alignment | indirect L1 fixtures | **`workflow-local-vertical-slice-039`** | evidence-review fixtures, not a complete workflow |
| First-run weakness | best beginner fit, but proves only one edit loop | fixture and record formats are not yet frozen | cannot generate the source evidence it is meant to review |

Lab 013 is the only candidate of the three whose declared artifact already
matches the whole vertical-slice claim: one run ID binds the input baseline,
task protocol, checkpoints, actual diff, command output, intentional failure,
recovery/stop, claim-to-evidence table, rollback target, and handoff. Its
learning-path acceptance also requires preserving failure history rather than
rewriting it after success.

Lab 001 should be the **second** runtime slice because Q-001 still requires L1
evidence and it is the correct beginner-facing proof. Lab 015 should be run
after Lab 013 and use a redacted copy of the Lab 013 packet; otherwise it risks
becoming a circular paper exercise that audits evidence invented solely for the
audit.

## Why Lab 013 is not runnable as-is

The current 651-word Lab is a sound contract sketch, not a frozen experiment.
Before runtime it still lacks:

- exact input filenames and their checked-in contents;
- the one allowed output path and an exact required release-note schema;
- a deterministic local validator and expected exit codes;
- a canonical intentional-failure mutation;
- machine-readable CP0-CP4 and action-log schemas;
- environment metadata and hashing commands that work in the declared runner;
- an explicit cleanup check;
- an independent-review rubric and disagreement process; and
- a durable results location linked from the status source.

Running it before these are frozen would let the operator choose the task,
failure, evidence, and passing interpretation after seeing the result. That is
demonstration theatre, not credible runtime evidence.

## Required sandbox fixture

Create a repository-owned, secret-free fixture under a dedicated Lab 013
fixture directory. Do not use this project worktree itself as the learner
sandbox.

```text
lab-013-v1/
  inputs/
    change-request.md
    shipped-changes.json
    release-note.schema.json
    untrusted-note.md
  seed/
    README.md
    release-notes/
      next.md
  expected/
    acceptance.json
    allowed-paths.json
  scripts/
    validate_release_note.py
  records/
    checkpoint-template.json
    action-log-template.jsonl
    run-record-template.json
    review-template.json
```

Fixture rules:

1. `shipped-changes.json` is the only factual source for the release note.
2. Only `release-notes/next.md` may change; records must be written outside the
   copied product tree or to a predeclared evidence directory.
3. The acceptance contract requires exact headings, supplied change IDs, no
   unsupported claims, no secret-like strings, and no instruction copied from
   `untrusted-note.md`.
4. The validator uses the standard library, performs no network access or
   installation, and returns documented non-zero codes for missing input,
   invalid content, unexpected changed paths, and schema failure.
5. The harness copies `seed/` to a temporary directory, records its absolute
   path and hash manifest, and destroys only that exact temporary copy after
   review evidence is preserved.
6. No commit, push, publication, credential, external message, browser
   submission, or production path is present.

The sandbox fixture should itself pass the gold-content admission gate, but
that only establishes editorial admission. It does not establish a Lab run.

## Required run record

One immutable run directory should bind every artifact to one `run_id`:

```text
run_id
lab_id and fixture_version
operator and runner role
started_at / ended_at / timezone
repository revision and fixture input hashes
temporary sandbox absolute path
runtime and operating-system versions
model, provider, surface, and session identifiers when observable
context supplied and files actually read
allowed actions / forbidden actions / authority owner
CP0..CP4 timestamps, decisions, and evidence paths
action log: observation, action, result, state change, risk, next step
changed-path inventory and diff
validation command, cwd, stdout, stderr, exit code
failure-branch mutation and pre-failure hash
stop/recovery decision and post-recovery hash
claim-to-evidence table
rollback target and cleanup result
unknowns, exclusions, and smallest next check
operator status: passed | failed | stopped | blocked
review_status: not_assigned | pending | accepted | rejected | disputed
```

Raw logs and the failed attempt must be append-only within the packet. A later
successful run may reference them but must not overwrite or relabel them.
Secrets must never be recorded; identifiers should be redacted when they are
not necessary for reproduction.

## Canonical failure variant for the first run

Use one deterministic validator failure rather than the more complex fresh-
context, prompt-injection, or persistent-environment branches on the first
execution:

1. freeze the baseline and CP0-CP1;
2. apply a supplied failure mutation that omits one required change ID from
   `release-notes/next.md`;
3. run the validator and preserve its non-zero exit, stdout/stderr, diff, and
   hashes;
4. record `unverified` or `failed` at CP3 and stop automatic progression;
5. diagnose against the fixed acceptance file;
6. make one bounded correction without changing the fixture or rubric;
7. rerun the same validator and preserve the new result; and
8. retain both attempts in the claim-to-evidence table.

This variant proves failure visibility and bounded recovery without requiring
network, secrets, simulated token leakage, or an unverifiable host timeout.
The untrusted-input and resume variants remain later boundary tests; they must
not be silently counted as completed by the first run.

## Independent review contract

The reviewer must not be the operator and must not inherit the operator's
completion judgment. A fresh model session may be an additional adversarial
review, but it is not sufficient evidence of independent human learner review
when the claim concerns learner effectiveness.

The reviewer receives only the frozen fixture revision, run packet, and rubric.
They must independently answer:

- Did changed paths stay within the declared product and evidence boundaries?
- Do CP0-CP4 and the action log reconcile with hashes, diff, and command logs?
- Was the first failed attempt preserved and classified correctly?
- Did recovery change only the diagnosed condition?
- Does every completion claim point to sufficient evidence of the same scope?
- Are publication, production, reader acceptance, transfer, and broader
  platform behavior still excluded?
- Can the reviewer identify the rollback target and smallest next check without
  reading the original conversation?

The review record needs reviewer identity or stable role, date, rubric version,
per-criterion decision, disagreements, requested correction, final disposition,
and its own evidence-limit statement. `accepted` means the packet meets the
frozen Lab 013 v1 scope; it does not mean the learner mastered L3 or the Lab is
production-ready.

## Status migration and governance impact

No status should change while only this audit and fixture design exist.

After one complete operator run and accepted independent packet review:

- `content-status.yaml` may change **Lab 013 only** from `run_status: not_run`
  to `completed`, with the exact result paths added to evidence. The current
  validator supports `completed` but does not yet require per-run metadata, so
  the status schema should be strengthened before relying on that field.
- Lab 013's artifact status should remain `draft` unless the editorial owner
  separately finds its instructions stable and the run exposes no required
  rewrite. A completed run and a candidate document are distinct claims.
- The aggregate Labs `run_status` must not become `completed` while 16 Labs
  remain unrun. The current aggregate field is too coarse and should remain
  `not_run` or be replaced by a controlled mixed/partial summary derived from
  item records.
- Q-001 must remain `open`. One L3 packet supplies only the L3 portion of its
  required L0/L1/L3/L6 evidence. Its evidence paths and resolution scope may
  record partial progress without marking it resolved.
- Q-002 remains `open`. Running Lab 013 does not score evaluation fixture 039.
  If fixture 039 is later executed, it needs its own frozen environment,
  scoring threshold, and reviewer record.
- The learning-path L3 status and graduation gate must not change based on one
  operator run. Learner explain/operate/judge/review evidence and transfer are
  separate from Lab runtime validity.
- `book/labs/README-EN.md`, the release evidence blind spots, quality-register
  projection, update registry, and any generated public status must be updated
  from the same canonical item record; none may claim all Labs have run.

Promotion beyond a single completed run requires repeated fresh-context runs,
the declared transfer task, and review of failure consistency. `verified`
requires a deliberately stated task set and evidence threshold; one successful
maintainer-operated run is only runtime-candidate evidence.

## Recommended execution order after this audit

1. Freeze the Lab 013 v1 fixture, validator, schemas, hashes, and rubric.
2. Validate the fixture statically and through negative tests.
3. Run one operator slice including the canonical failure and bounded recovery.
4. Conduct independent packet review and preserve disagreement.
5. Update only the exact Lab 013 item evidence/run state supported by the
   packet; keep Q-001 open.
6. Use the packet as input to Lab 015, testing whether its evidence delivery is
   independently reproducible.
7. Run Lab 001 with a novice-oriented fixture to supply the required L1 slice.
8. Continue with L0 and L6 packets before considering Q-001 resolution.

## Evidence boundary

This report inspected the 17 canonical Lab records, Lab 001/013/015 source,
the learning path, content-status contract, quality register, evaluation task
039, prior static reviews, and the gold-content admission policy. It did not
execute a model, Codex surface, learner, validator fixture, failure branch, or
independent review. Therefore Lab 013 remains `draft / not_run`, and this
selection report is planning evidence only.
