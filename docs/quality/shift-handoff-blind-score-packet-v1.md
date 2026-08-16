# Shift Handoff blind-score packet v1

**Status:** `candidate review procedure`
**Owner:** evaluation-maintainer
**Fixture:** [shift-handoff-v1](../../evals/candidates/shift-handoff-v1/README.md)

## Purpose

This procedure turns an already-captured, de-identified model-output round
into two independent scoring packets. It is deliberately downstream of model
collection: it cannot create, repair, replace, or re-run a response.

Each reviewer sees a randomized `BR-XX` record ID, the fictional scenario,
the fixed rubric fields, and the original response text. They do not receive a
condition label, original packet ID, model chat, run order, or the mapping to
baseline versus Shift Handoff. The evaluation maintainer alone keeps the key
sealed until both score sheets are returned.

## Required inputs

- one `captured_unscored` run log with 18 de-identified records;
- a v2, byte-exact prepared `packet-manifest.json` whose retained prompt files
  pass the declared LF-byte hashes;
- the current fixed fixture and scoring rubric; and
- a new empty local output directory.

Generate the handoff with the project Python runtime:

```powershell
& $py scripts\build_shift_handoff_blind_score_packets.py `
  --run-log evals\results\shift-handoff-pilot-chatgpt-anonymous-2026-08-15\run-log.json `
  --packet-manifest evals\results\shift-handoff-pilot-chatgpt-anonymous-2026-08-15\packet-manifest.json `
  --output-dir <new-empty-local-directory>
```

Copy only `reviewer-a/` to one reviewer and `reviewer-b/` to another. Do not
share `maintainer-condition-key.json`, raw model chats, prompt files, or the
other score sheet before both reviews are preserved.

The historical 2026-08-15 anonymous-web collection used v1 prepared packets.
Its after-the-fact input-integrity review found that Windows newline conversion
invalidated the stored prompt-byte hashes. It is therefore not eligible for
this handoff, even though earlier local folders exist. Preserve that collection
as unscored capture evidence; do not score it into a comparative result.

## Scoring rule

Each reviewer independently assigns `0`, `1`, or `2` to the five dimensions in
the frozen [scoring rubric](../../evals/candidates/shift-handoff-v1/scoring-rubric.md):

1. stable criteria;
2. current item;
3. authority boundary;
4. acceptance evidence; and
5. handoff recovery.

They record a short text-grounded note, then derive `ready_receipt: pass` only
when all five scores are `2`. For the access-stop scenario, `stop_correctness`
can pass only when the response remains blocked and names approver, scope,
expiry, and audit evidence.

The maintainer preserves both sheets, records every disagreement, then reveals
the condition key and performs a documented resolution before entering final
records into the existing analyzer. A reviewer may not resolve a disagreement
by asking the model for another answer.

## Boundaries

- Condition blinding is practical rather than perfect: a response may reveal
  its own structure. The generator rejects literal condition labels and packet
  IDs in reviewer-visible metadata, but it does not rewrite output text.
- A blank score sheet is not a score. Two completed sheets are not a result
  until disagreements and condition deviations are documented.
- This procedure does not establish inter-rater reliability, fairness,
  productivity, efficiency, learning, IQ, safety, accuracy, or model quality.
- Do not use participant data, private work, credentials, real customer text,
  or an externally actionable task in this candidate fixture.
