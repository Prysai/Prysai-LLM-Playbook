# ADR-0032: Distinguish the first local path from the optional warm-up

## Status

Accepted

## Date

2026-08-14

## Context

The site has a recommended Codex route and a no-setup First Win warm-up. Both
are useful, but their proximity at the entry surface made it easy to read the
warm-up as an interchangeable first route. The learner-activation record
requires an observation of whether readers can distinguish these routes; no
such observation exists yet.

The project also has a candidate First Safe Change fixture for a reader who
reaches the Chapter 2 decision without a disposable local target. It supplies
a fixed offline file and a checker, but it is not a replacement for the
conceptual and boundary work in the guided Codex path.

## Decision

1. Keep the guided Codex path as the primary hero action, beginning at Chapter
   1.
2. Label the no-setup First Win explicitly as optional. It remains an
   inspectable text-only example, not the local Codex route.
3. Add a compact route-decision card beside the primary action. It names the
   disposable-project condition and points readers without a safe target to
   the offline First Safe Change fixture at the Chapter 2 decision.
4. State on the card and in the GitHub README that the fixture does not
   replace the guided path, and retain the candidate and unmeasured-outcome
   boundary.
5. Cover the route labels and their Reader destinations with static and
   browser smoke checks.

## Alternatives considered

### Make the warm-up the default path

Rejected. It lowers setup cost but omits the file, authority, diff, and
focused-check conditions that define the first local Codex practice.

### Send every reader directly to the fixture

Rejected. The fixture is deliberately synthetic and narrowly scoped. It
cannot stand in for the project-specific inspection and evidence decisions
taught by the guided path.

### Keep both routes without a decision explanation

Rejected. The project would retain a known first-visit ambiguity without a
way to check that the intended distinction survives later site changes.

## Consequences

- A first visitor can see the primary route, the safe-target fallback, and the
  optional warm-up without treating them as equivalent.
- The fixture becomes easier to discover without gaining a maturity or learner
  claim.
- The card adds a small amount of front-page information. Its copy stays
  short, and the full curriculum index remains outside the first decision.
- Q-013 remains open until an authorized study observes real readers choosing
  and completing these routes.

## Evidence boundary

Static and browser checks can show that the links, labels, mobile layout, and
Reader destinations match this decision in the declared local environment.
They do not show that a beginner understands the distinction, completes a
route, learns the method, or transfers it to a new task.
