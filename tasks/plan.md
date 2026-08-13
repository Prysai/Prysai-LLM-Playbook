# Implementation plan: first executable Lab evidence slice

## Overview

Turn Lab 013 from a prose-only exercise into a reproducible maintainer
reference run over a disposable Markdown repository. Preserve the distinction
between a reference execution, independent artifact review, and an actual
learner run. The slice also strengthens release maintenance using the bounded
contract produced in parallel and incorporates first-party docs-engineering
research without copying external project content.

## Architecture decisions

- Use Lab 013 because it is the L3 primary Lab and already owns the complete
  CP0–CP4 workflow contract required by Q-001.
- Keep the sandbox synthetic, local, credential-free, and network-free.
- Generate a durable run packet from fixed inputs. Store raw failed and passing
  checks; do not hand-write a success narrative.
- A maintainer reference run may advance implementation readiness, but it does
  not prove learner independence, transfer, platform portability, or mastery.
- Require an independent artifact review before changing any Lab status field.

## Dependency graph

```text
fixed sandbox + run-packet schema
    -> runner and packet validator
        -> positive run + deliberate failure/recovery
            -> independent review
                -> status, quality, navigation, and release-evidence updates
                    -> full local and remote verification
```

## Tasks

### Task 1: Freeze the Lab 013 sandbox contract

**Acceptance criteria:**

- [ ] Fixed facts, allowed path, forbidden actions, acceptance, rollback, and
      deliberate failure are machine-readable.
- [ ] Fixture contains no credential, network, production, publish, or push
      requirement.
- [ ] Source and license boundary is registered.

**Verification:** focused schema validation and secret-pattern scan.

**Dependencies:** none.
**Likely files:** `examples/lab-013-sandbox/`, source register.
**Scope:** medium.

### Task 2: Build the reference runner and negative fixtures

**Acceptance criteria:**

- [ ] Runner records input hashes and CP0–CP4.
- [ ] Only the allowed Markdown output changes.
- [ ] One deliberately overclaimed or incomplete artifact fails with preserved
      raw output before a corrected artifact passes.
- [ ] Run packet includes diff, action log, checks, claim-to-evidence table,
      rollback target, unknowns, and handoff.

**Verification:** runner succeeds; tampered/missing evidence fixtures fail.

**Dependencies:** Task 1.
**Likely files:** runner, validator, fixtures, run packet.
**Scope:** medium.

### Task 3: Independently review the stored run

**Acceptance criteria:**

- [ ] Reviewer receives the stored packet and acceptance contract, not the
      implementation narrative.
- [ ] Review identifies supported claims, unsupported claims, remaining learner
      gap, and smallest next check.
- [ ] Raw run evidence is not edited during review.

**Verification:** review contract and links pass; hashes still match.

**Dependencies:** Task 2.
**Likely files:** `docs/quality/`, run packet review record.
**Scope:** small.

### Task 4: Project the exact maturity state

**Acceptance criteria:**

- [ ] Lab/status sources distinguish `reference_run` from `learner_run`.
- [ ] Q-001 remains active unless all of its required level evidence exists.
- [ ] Site and Lab index expose the reference-run boundary without claiming
      verified learning.
- [ ] Release evidence runs the new runner/validator checks.

**Verification:** content, status, locale, learning-path, generated-site, and
quality-register checks.

**Dependencies:** Task 3.
**Likely files:** governance, Lab 013, generated site, release evidence.
**Scope:** medium.

### Task 5: Release the exact commit evidence

**Acceptance criteria:**

- [ ] Desktop and 390px views remain coherent.
- [ ] Full release-evidence gate, official Skill validators, workflow parsing,
      secret scan, and diff check pass.
- [ ] `main` is pushed and the exact-SHA GitHub artifact is downloaded and
      inspected.

**Verification:** remote run SHA, command logs, decision, annotations, and
remote branch SHA match.

**Dependencies:** Tasks 1–4.
**Scope:** medium.

## Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| A generated packet is mistaken for learner evidence | High | Use separate evidence classes and keep Q-001 active |
| Runner writes outside the sandbox | High | Resolve and validate every target under a temporary root |
| Failure is simulated only in prose | High | Preserve a real non-zero check log before recovery |
| Evidence can be edited to self-certify | High | Hash inputs/artifacts and use an independent review record |
| New checks pass locally but not on Linux CI | Medium | Standard-library Python, normalized paths, remote artifact review |

## Completion boundary

This slice is complete when the reference run is reproducible and independently
reviewed at an exact commit. The whole project and Q-001 remain incomplete
until the required L0, L1, L3, and L6 learner evidence exists.
