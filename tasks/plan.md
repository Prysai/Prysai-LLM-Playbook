# Implementation plan: governed Reader identity and beginner Skill routing

## Overview

Replace Reader-side path guessing with generated content metadata, then make the
homepage Skill catalog answer a beginner's first question: "Which method fits
the situation I have now?" This is one vertical slice because both changes make
the capability layer easier to enter and safer to maintain.

## Architecture decisions

- Keep content identity in the locale manifest generated from canonical
  governance; the Reader consumes a declared `reader_type` and `overview_target`.
- Preserve the existing detailed twelve-Skill catalog, but precede it with four
  concrete starting situations. Do not add another overlapping Skill.
- Use authored, factual labels and the existing visual system. Do not claim that
  routing accuracy or learning effectiveness has been user-validated.
- Treat browser checks as interaction evidence and static validators as
  structural evidence; report them separately.

## Tasks

### Task 1: Generate Reader presentation metadata

**Acceptance criteria:**

- [ ] Every manifest content record exposes a supported Reader type and return target.
- [ ] Skill and field-note pages render correctly without Reader path-prefix logic.
- [ ] Generated search and locale artifacts remain reproducible.

**Verification:** generator checks, Reader regression fixtures, local-link check.

### Task 2: Add the beginner Skill route

**Acceptance criteria:**

- [ ] Four common situations route to Task Protocol, a Coach, Communication
      Failure Triage, and Evidence Review.
- [ ] The twelve-Skill registry remains complete and clearly separate.
- [ ] The route is readable and operable at 390 x 844 without horizontal overflow.

**Verification:** accessibility checks and real-browser desktop/mobile inspection.

### Task 3: Reconcile routing contracts and ship

**Acceptance criteria:**

- [ ] Any confirmed Skill documentation/machine-contract drift is corrected as
      part of the same routing contract, or recorded as out of scope with evidence.
- [ ] Focused and project-wide validators pass.
- [ ] Only reviewed files are committed; local and remote `main` match; GitHub
      Actions result is reported exactly.

## Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| New metadata duplicates governance | drift | derive it in the existing manifest generator |
| Beginner route implies automatic correctness | misleading claim | call it a starting route and retain boundaries |
| Mobile density hides the catalog | poor discovery | keep route compact and verify the full section at 390 px |
