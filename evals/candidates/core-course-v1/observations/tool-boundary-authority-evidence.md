# Experiment C — Tool boundary, authority, and evidence

**Status:** `candidate`  
**Run status:** `not_run`  
**Primary outcomes:** `explain` and `transfer`

## Question

Can the learner distinguish four different states that are often collapsed
into one sentence?

1. A model or agent proposes an action.
2. A person or policy grants authority for that action.
3. A tool actually executes the action.
4. A later read-back or receipt provides evidence of what happened.

The experiment uses a paper fixture. It does not execute a tool, open a file,
contact a service, or grant authority.

## Fixed record

Show this fictional sequence in the stated order:

```text
S1  Assistant: I can update the meeting note to say “Room 4”.
S2  User: Do not change any file. Show me the proposed diff only.
S3  Assistant: Proposed diff: + Room 4
S4  User: I have not approved a write. Stop.
S5  Tool log: no tool call was made.
S6  Read-back: the original note is unchanged; it still says the room will be confirmed later.
```

Ask the learner to classify each line as one or more of:

```text
proposal | authority | execution | evidence | stop
```

Then ask: “What may you safely claim happened, and what may you not claim?”

## Procedure

1. Present the sequence without the labels or answer key.
2. Lock the learner's first classification and claim statement.
3. Ask the learner to name the smallest safe next action if the user now
   explicitly approves a write. The expected boundary is a new authorization
   check plus a bounded diff review; do not permit a real write.
4. Introduce a counterfactual card: replace S5 with `Tool log: write completed`.
   Ask what additional read-back evidence is still needed before claiming the
   file contains the new text.
5. Record any cue. A cue may point to the difference between a proposal and a
   receipt; it may not supply the four labels or the final claim.

## Required record

```text
candidate_sha | fixture_revision | first_state_labels | first_claim
counterfactual_labels | counterfactual_claim | next_safe_action
help_used | stop_reason | reviewer_1 | reviewer_2
disagreement | claim_status | limits
```

Only the de-identified labels and claims for the fictional record are retained.
Do not run a command, connect a tool, use a real repository, or store a user
authorization token.

## Acceptance notes for reviewers

- S1 and S3 are proposals, not execution evidence.
- S2 and S4 express authority boundaries and a stop, not a completed write.
- S5 is negative execution evidence: no tool call was made.
- S6 is read-back evidence that the original note is unchanged; it does not
  prove what would happen in another environment.
- In the counterfactual, a tool log alone is not enough to claim final file
  contents; the learner should request a bounded read-back or diff.
- The learner must not infer that a model can use a tool merely because the
  conversation mentions one.

These notes are for scoring after the first attempt; do not show them during
the task.

## Stop rules

Stop if the learner asks to test the sequence on a real file, grants an actual
permission, exposes a credential, or requests an external side effect. Mark
the run `invalidated` if a real action occurs or if the counterfactual is shown
before the first classification.

## Interpretation boundary

A future run can show only whether this learner separated proposal, authority,
execution, and evidence for this fictional sequence. It cannot establish
runtime tool safety, permission correctness, product behavior, security,
retention, or general Agent competence.
