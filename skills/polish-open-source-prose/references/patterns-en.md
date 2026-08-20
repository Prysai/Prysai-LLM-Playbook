# English editorial signals

Use these as diagnostic signals, not proof of AI authorship and not automatic bans.
Judge the phrase's job in its sentence and the sentence's job on its surface.

## High-confidence signals

### Empty framing

- “In today's fast-paced/evolving landscape”
- “In a world where”
- “It is important/worth noting that” when the sentence needs no qualification
- “At its core,” “The reality is,” or “The truth is” before an ordinary claim
- “Let's dive in,” “Let's explore,” or “Let's unpack” before documentation
- “Here's the thing/problem/why” when the next words can stand alone

Delete the frame or replace it with the condition that makes the statement relevant.

### Unsupported promotion

- groundbreaking, revolutionary, game-changing, next-generation
- seamless, robust, powerful, comprehensive, intelligent, cutting-edge
- effortless, unmatched, unparalleled, best-in-class, production-ready
- “built for everyone,” “handles any workload,” or other unbounded promises

Keep an adjective only when the repository supplies a measurable or observable basis.
“Robust” may become the failure modes handled; “seamless” may become the steps removed.

### Generic software language

- unlock, empower, elevate, supercharge, transform
- navigate complexity, harness the power of, leverage synergies
- ecosystem, journey, landscape, solution, platform when a specific noun fits
- “designed with users in mind” or “built from the ground up” without evidence

Replace category language with the action the software performs and who needs it.

### Performed insight or intimacy

- “Let that sink in,” “Think about it,” “Make no mistake,” “Full stop”
- “The uncomfortable truth,” “What nobody tells you,” “I promise”
- a paragraph-ending slogan that merely repeats the paragraph
- strings of fragments used to manufacture weight: “Fast. Simple. Powerful.”

Retain genuine voice or humor. Remove performance that substitutes for content.

### Formulaic structure

- repeated “not X, but Y” pivots
- repeated three-item lists or three equal-length sentences
- questions answered immediately in every section
- every section ending in a punch line or broad future-facing claim
- repetitive “Whether you are X or Y” audience framing

Fix repetition, not the construction itself. A contrast, list, or question can carry
real logic.

## Context-dependent signals

### Passive voice

Keep passive voice when the actor is unknown, irrelevant, intentionally omitted, or
less important than the affected object. Revise it when readers need to know who must
act or who caused a failure.

### Adverbs and qualifiers

Keep qualifiers that encode uncertainty, frequency, scope, compatibility, or safety.
Remove intensifiers that only simulate confidence. Never turn “usually” into “always.”

### Inanimate technical subjects

Software, APIs, parsers, and commands conventionally perform actions. “The server
rejects the request” is clear technical prose. Name a human actor only when it improves
responsibility or instructions.

### Dashes, fragments, questions, and triads

Keep them when they fit the project's punctuation and rhythm. Revise only when they
repeat mechanically, obscure syntax, or produce a stack of slogans.

## Common open-source checks

- Replace vague benefits with a verified feature, constraint, or user outcome.
- Replace “easy” with the actual number or sequence of steps when useful.
- Qualify security, privacy, performance, and compatibility claims.
- Prefer current behavior over origin stories and aspirations in the first screenful.
- Remove praise that the project gives itself; let evidence, examples, and users judge.

## Evidence presentation in reviewer follow-ups

When a reviewer asks for verification — a trace, a benchmark, a before/after
comparison — the response is a technical artifact, not a conversation.
For a reproducible packet that also covers snapshots, experiment type, and final-head
status, read [review-evidence.md](review-evidence.md).

### Anchor to commits

Cite the exact commit hash for every state referenced. "Before (commit `abc1234`)"
and "After (commit `def5678`)" let the reviewer reproduce the comparison.

### Show, don't summarize

Prefer concrete output over adjectives:

- a before/after JSON trace or log excerpt over "the output looks correct"
- a numerical comparison table with computed error over "values match"
- an exact diagnostic message over "a warning is emitted"

### Bound the scope

State what was compared, what range or configurations were covered, and what was
excluded. Include:

- the reference implementation and its pinned version or commit
- the quantities or behaviors checked
- tolerance or error metric
- platform, language version, and dependency versions
- features or configurations intentionally not compared

### Separate observation from conclusion

"Four geometries produced matching CNa values" is an observation.
"The implementation is fully verified" is a conclusion the observation does not
support unless every geometry and condition was tested.

## PR and issue writing conventions

### Distinguish observation from judgment

An issue should describe what was observed (error message, failing input, platform)
before proposing a cause. Mark unverified causes as hypotheses:

- Observed: "`rules.json` fails to load on macOS 15 with error `E42`"
- Hypothesis: "This may be caused by the new sandboxing policy"

Do not write "the parser is clearly broken" when only the symptom is known.

### Qualify verification claims

Do not write "exhaustively validated" or "completely fixed" unless the test matrix
is stated. When CI has not finished, say so:

- "Windows CI is still running; result pending"
- not "This fix resolves the Windows issue"

### Cite artifacts by identity

Reference commits by hash, issues by number, and files by path. Avoid "the recent
change" or "the fix" when a concrete identifier exists.

### Drop social filler in evidence

"Thanks for looking into this!", "Let me know if you need anything else!", and
"Great catch!" are fine in conversation but should not pad an evidence response.
Lead with the data; close when the data is complete.
