# Context Packet Builder v1 proposal fixture

**Proposal status:** `proposed`

**Skill status:** no Skill exists or is registered

**Model run status:** `not_run`

**Independent review status:** `not_run`

**Learner participation:** none

**Fixture data:** original, fictional records only

This packet prepares the admission evidence for one possible future
responsibility: turn already supplied, mixed material into the smallest
traceable context packet for one fixed task. It is deliberately **not** a
fifteenth Skill, a model benchmark, or a security test.

The fixture exercises decisions that are easy to lose when material is copied
into a chat window: source identity, conflict, freshness, instruction-like
text, sensitive fields, budget reduction, and downstream authority. It keeps
the task and the proposed downstream action fixed. It never asks a model to
fetch a source, authenticate, upload, send, publish, or use a real file.

## What the static checker covers

[`fixture.json`](fixture.json) contains original positive, boundary, failure,
transfer, budget, and fresh-context-routing cases. It also contains explicit
near-neighbour routes for Task Protocol, Product Context, Source Investigator,
Research Router, Evidence Review, and Workflow Orchestrator.

The deterministic checker verifies that the proposal remains unadmitted; that
all material is fictional; that each packet plan preserves source identity and
conflict; and that hostile instruction-like text or a sensitive placeholder
cannot silently add authority. It does **not** run a model or infer that a
model would follow these decisions.

```powershell
$py = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $py scripts\validate_context_packet_builder_candidate.py
& $py scripts\test_context_packet_builder_candidate.py
```

## Required evidence before admission

The fixture and its checker satisfy only part of the documented admission
gate. Before a Skill can exist, the project still needs a fresh-context
routing observation, a synthetic model-built packet independently reviewed
against the rubric, and a downstream handoff that stays within the original
authority envelope. Those records are intentionally `not_run` here.

If a future maintainer runs this study, use
[`run-record-template.json`](run-record-template.json) and
[`review-rubric.json`](review-rubric.json). Preserve every failed, stopped,
unavailable, and disagreed result. A checked proposal fixture must never be
presented as prompt-injection resistance, safe redaction in a real system,
automatic routing, learner evidence, or production readiness.

## Source and license boundary

The fixture is original Prysai Lab material. Its responsibility boundary and
the first-party curriculum-structure observations are recorded in
[`docs/research/context-packet-builder-and-official-curriculum-structures-2026-08-13.md`](../../../docs/research/context-packet-builder-and-official-curriculum-structures-2026-08-13.md).
No source prose, code, prompt, notebook, image, external URL, credential,
personal data, or vendor output is copied into this candidate.
