<!-- content_id: lab-007-action-boundaries | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-11 -->

# Lab 007: Put One README Task Behind Three Action Boundaries

---
id: lab-007-action-boundaries
title: "Place one README task in three work surfaces and practice authorization, stopping, and evidence"
level: L3
domain: general
goal: "Turn recurring boundary symptoms from public reports into a low-risk, observable, and reversible practice flow"
setup: "A redacted README task, a normal local copy, an isolated Worktree or Worktree simulation, and a second directory that represents an organization-like surface; no real token is needed"
task: "Plan and, where safe, execute the same README fixture in three surfaces: observe first, make the smallest local edit, record staged state, symptoms, checks, and evidence; do not perform a real push or publish"
evidence:
  - "One staged state card per scenario separating signed in, authorized, executed, and verified"
  - "A symptom card, smallest diagnostic order, stop conditions, and final evidence table"
  - "A diff and rollback entry for the local copy and Worktree, plus additional risk notes for the organization-like directory"
  - "A transfer record applying the same boundary method to documentation, research, or release preparation"
failure_variant: "Treat browser success as token exchange, one authenticated host as the target host, access to one organization as installation in another, or verification as permission to force-reinstall a persistent environment"
reflection: "Which state is most easily hidden by the phrase already logged in? Which check produces new evidence without expanding authority? How do the three work surfaces change rollback and review?"
status: draft
last_verified: "Not run; a real three-surface experiment is pending; this file defines the practice only"
transfer_task: "Apply the same boundary record to a documentation, research, or release-preparation task that requires no real external write"
transfer_domain: "Engineering release preparation, research publishing preparation, marketing content, team approval"
transfer_evidence: "A redacted task card, surface cards, staged state cards, symptom and diagnostic notes, execution records, result checks, and rollback entry"
transfer_limitations: "This lab does not prove that any real account, Enterprise host, organization installation, branch protection, connector, publishing platform, or rollback chain is available"
---

## The real problem this lab addresses

Public reports repeatedly compress several different facts into one word:
logged in, reachable, authorized, executed, and verified. That shortcut creates
dangerous jumps:

- a browser shows authentication success, but a later token exchange fails;
- a GitHub Enterprise CLI session is authenticated, but a pull-request entry
  probes github.com;
- a user can access one organization, but cannot create an installation for a
  second organization; or
- a user authorizes a source edit and check, while an Agent expands
  verification into a force reinstall or persistent-environment replacement.

These are user reports indexed in the Codex field-problem research, not local
reproductions or official root-cause statements. The lab does not reproduce
authentication or connector defects. It trains the safe response: put the
symptom in the correct stage, make the smallest observable check, and write
not_run when proof would require a broader permission.

## Fixed fixture: one redacted README task

Do not use a real organization, repository, remote, token, SSH key, cookie,
environment file, production file, or personal data. Create only this
disposable input:

~~~text
fixture-readme/
└── README.md
~~~

~~~markdown
# Acme Notes

This is a redacted practice repository.

## Status

- owner: redacted
- source: local fixture
~~~

Use this task request unchanged:

> Add the line boundary: local-only under Status in README.md; preserve the
> existing content and modify only this file. Show the diff and check result.
> Unless a new explicit authorization is given, do not commit, push, publish,
> install dependencies, or modify a persistent user environment.

### Fixed acceptance criteria

- only the new boundary line is added;
- the original heading, fields, and unrelated line endings remain intact;
- the before/after diff is visible;
- each check says whether it ran and what side effect it could have; and
- commit, push, publish, installation, and restart are recorded as not_run
  unless separately authorized.

Rollback means restoring the disposable copy or removing this one line. It
does not mean deleting remote history.

## Three scenarios

Run each scenario with a fresh run-id. Do not export success from one surface
to another.

### Scenario A: ordinary local copy

Use a temporary directory containing the redacted fixture. Read the file,
edit one line, view the diff, and run an offline check of the target line.
Record the absolute path, baseline hash, and rollback entry. The expected
result is one visible local change; account, remote, and publish state remain
not_run.

### Scenario B: isolated Worktree

Use a disposable Git repository and isolated Worktree. If Git is unavailable,
use a second directory named worktree-simulation and state clearly that it is
a simulation. Record the main worktree, isolated path, branch, and base
commit. Edit only the isolated copy, verify the main tree is unchanged, and
inspect the Worktree diff. The default experiment does not commit, push, or
publish.

### Scenario C: organization-like second directory

Prefer a local, redacted read-only copy. If none exists, use a second local
directory explicitly labeled organization-like-simulation. Do not connect a
real organization, Enterprise host, connector, remote, or network service.
Reassess visibility, collaborator impact, branch-protection assumptions,
installation scope, and rollback ownership. Technical writability is not
organization authorization.

## Symptom cards: safe observation questions

For every card, record what was observed, what cannot be inferred, and the
smallest next check. Add: source is a user report; local reproduction was not
done; official root cause was not confirmed.

| Card | Reported symptom | Safe fact to record | Do not infer | Smallest next check |
|---|---|---|---|---|
| S-02 | Browser authentication appears successful, but token exchange fails | Browser stage succeeded; later exchange failed; system, version, and network need separate records | that the account is fully logged in, the token is valid, or the root cause is known | split the authentication stages and record redacted error/time; do not retry a real login |
| S-03 | Enterprise CLI is authenticated, but a PR entry probes github.com and returns 401 | CLI host and application host may differ | that GitHub is generally available or that 401 means repository permission | compare target host, remote shape, source, and entrypoint strings read-only |
| S-04 | Access to one organization does not create an installation for a second | user identity, organization, installation, repository access, and approval are separate states | that administrator access implies installation or that an error root cause is confirmed | record the four states with redacted names; do not request installation |
| S-11 | Verification expands into force reinstall or persistent environment replacement | the worktree may be dirty and verification is not installation authorization | that a technically executable installation is allowed | preserve the diff and use an isolated/static check; stop before persistent changes |

The original URLs and dates live in the research index. This lab intentionally
does not copy external issue text, credentials, or assets.

## Staged state card

Complete one for each scenario. Later states do not overwrite earlier gaps:

~~~text
run_id:
scenario: local | worktree | organization-like-second-directory
fixture_path:
baseline_hash_or_commit:
surface_and_version:       # use not_observed when unavailable

source_present: planned | authorized | executed | verified | not_run
source_read: planned | authorized | executed | verified | not_run
local_edit: planned | authorized | executed | verified | not_run
check_or_test: planned | authorized | executed | verified | not_run
commit: planned | authorized | executed | verified | not_run
push: planned | authorized | executed | verified | not_run
publish: planned | authorized | executed | verified | not_run

identity_observed: yes | no | not_applicable
action_authorized: yes | no | not_observed
result_verified: yes | no | not_observed
external_state_changed: yes | no | not_observed
rollback_entry:
stop_reason_or_next_check:
evidence_paths:
~~~

Keep these distinctions explicit:

~~~text
identity can be observed       ≠ this action is authorized
action was executed            ≠ its result is verified
directory is writable          ≠ a shared or remote target allows writing
~~~

## Reflection

Before marking a state `verified`, record which observation supports it, which
stage remains unknown, and whether the next check would add information without
adding an external side effect.

## Smallest diagnostic order

Each step must produce a new piece of evidence. Try again is not a diagnostic
method.

1. **Freeze scope:** write the exact path, file, host or organization if any,
   and forbidden actions. Confirm that no secret entered the record.
2. **Save the baseline:** record hashes, git status, branch/Worktree, and the
   original task. Do not reset, clean, force-push, or reinstall first.
3. **Locate the stage:** classify the symptom as entry, identity, target,
   authorization, execution, or verification. Page success covers only the
   page stage.
4. **Check read-only:** inspect files, path shape, configuration shape, host
   strings, and redacted logs. Do not call a real external write.
5. **Make one reversible local change:** edit only the fixture or run an
   offline check; capture diff, return code, and generated output.
6. **Compare surfaces:** compare the local copy, Worktree, and organization-like
   directory for visibility, collaborator impact, and rollback ownership.
7. **Verify or stop:** write verified only when evidence matches acceptance;
   otherwise write unverified or blocked and propose a smaller next check.

## Stop conditions

Stop and preserve the current diff, error, baseline, and checkpoint if:

- the target path, host, organization, branch, or data scope is unclear;
- the next step needs commit, push, publish, install, deploy, restart, delete,
  or notification beyond the task contract;
- a token, key, cookie, environment file, production file, or unredacted
  personal data appears;
- an approval prompt does not identify the exact target, payload, and action;
- continuing needs an external account, installation, Enterprise host, or
  persistent environment;
- a suggestion includes force-push, force-reinstall, deletion, or overwrite;
- the record shows logged in or executed but not authorized or verified; or
- a command may perform unknown writes, uploads, installs, subprocesses, or a
  long-running action whose side effects are not bounded.

The safe alternative is: preserve evidence, name the gap, propose one smaller
read-only or isolated check, and wait for explicit authorization. not_run is
an accurate result, not a failed attempt hidden from review.

## Required evidence table

| Item | Required content | Evidence | State |
|---|---|---|---|
| Task boundary | Redacted request, allowed file, forbidden actions | task card | planned/verified |
| Surface | Scenario, absolute path, real Worktree or simulation | surface card | verified/unverified |
| Baseline | Hash/commit, status, branch, existing diff | command output | executed/verified |
| Five permission fields | Sandbox, approval, network, read/write roots, side-effect confirmation | observation or not_observed | observed/not_observed |
| Symptom location | Card, stage, report fact versus speculation | symptom record | verified/unverified |
| Smallest action | Exact command/edit, scope, expected side effect | redacted log/diff/return code | executed/not_run |
| Result | README diff, check output, local/remote state | diff/output or not_run | verified/unverified |
| Staged state | Identity, authorization, execution, verification | state card | verified/unverified |
| Rollback | Exact reversal and evidence before/after | restore or reverse-diff record | available/not_run |
| External action | Commit, push, publish, installation, notice, deployment, restart | explicit not_run unless separately authorized | not_run |

## Intentional failure review

Apply four misleading prompts only to the local fixture:

1. The browser succeeded, so write remotely. Stop at the authentication
   stage because token exchange is unverified.
2. The CLI is logged in, so the PR entry must be github.com. Stop at host
   targeting when the surfaces disagree.
3. The user is an administrator in both organizations, so installation is
   complete. Record installation and repository access separately.
4. The check failed; force-reinstall first. Preserve the diff and use an
   isolated/static check instead.

Your review must name the missing evidence, the state if execution occurred
before verification, and the smallest check that increases information without
increasing external side effects.

## Transfer task

Choose a real task that requires no real write, such as organizing a research
source table, preparing release notes, or reviewing a redacted pull request.
Repeat the five moves:

1. fix a sanitized input and one acceptance criterion;
2. create cards for local, isolated, and shared/organization-like surfaces;
3. list identity, authorization, execution, and verification in advance;
4. write two realistic symptoms, one diagnostic order, and three stop
   conditions; and
5. submit the evidence table and mark every real external write not_run.

## Passing standard

- repeat the fixture in three surfaces and explain what changed;
- distinguish identity, authorization, execution, and verification;
- handle S-02, S-03, S-04, and S-11 as user reports rather than official
  causes or local reproductions;
- save a baseline before diagnosis and do not use force operations as proof;
- preserve evidence when a stop condition fires and state a safe next check;
- submit complete cards, with real token, push, publish, installation,
  deployment, notification, and persistent replacement all marked not_run;
  and
- complete one low-risk transfer to documentation, research, or release
  preparation.

## Sources and limits

| Source | Use | Limit |
|---|---|---|
| FP-02, FP-03, FP-04, and FP-11 in the Codex field-problem research | Real symptoms and public issue links | User reports; not local reproductions; reported hypotheses are not official causes |
| The forum research record | Community reports about sandbox networking and host boundaries | Community suggestions are not official fixes; do not execute forum commands as lab steps |
| The redacted fixture in this file | Original, reversible training input | Cannot prove real account, connector, Enterprise, publishing, or rollback availability |
