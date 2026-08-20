# Surface-specific guidance

Match the edit to where readers encounter it. The same sentence may work on a landing
page and fail in an error message.

## README and repository landing page

- Lead with what the software does, the intended user, and the distinguishing verified
  behavior.
- Put a runnable path near the top. State prerequisites and expected results.
- Prefer one representative example over a feature adjective stack.
- Keep status, maturity, platform support, and important limitations visible.
- Avoid a wall of badges, announcements, slogans, or historical releases before the
  reader understands the project.

## Documentation and tutorials

- State prerequisites, steps, expected output, and recovery from common failures.
- Keep causal and transitional wording when it helps readers build a mental model.
- Do not remove repetition that prevents errors in a procedure.
- Distinguish normative requirements from suggestions and examples.

## Contribution and governance documents

- Name the accepted workflow, target branch, checks, response expectations, and scope.
- Use welcoming language, but avoid generic community praise and future-facing slogans.
- Preserve codes of conduct, security policies, legal language, and templates exactly
  unless the user explicitly requests a policy edit.

## Release notes and changelogs

- Describe the user-visible behavior, affected surface, and any required action.
- Separate features, fixes, breaking changes, deprecations, and migrations when scale
  warrants it.
- Avoid “major,” “exciting,” “powerful,” and “improved” without saying what changed.
- Do not rewrite historical entries merely to impose the current voice unless asked.

## Pull requests and issues

- Explain the observed problem, cause or rationale, chosen change, and verification.
- Separate evidence from interpretation. Link exact artifacts when available.
- Avoid narrating routine effort or praising the patch.
- Preserve uncertainty when the cause or outcome is not verified.

### Reviewer follow-up responses

When a reviewer asks for evidence — a trace, a benchmark, a before/after
comparison — the response is a technical artifact, not a conversation.

- Lead with the commit hash or version that produced the result.
- Provide the raw data first (trace, table, log excerpt), then the interpretation.
- State the test environment: platform, language version, dependency versions.
- Name what was tested and what was not. A scope statement ("transonic CP was not
  compared") prevents the reviewer from assuming full coverage.
- Do not pad with social openers, closers, or assurances ("everything works great").
  The evidence speaks; let it.

### Commit messages

- Name the component or area, the incorrect behavior or gap, and the correction.
- "Fix bug" and "update code" tell the reader nothing the diff does not already show.
- Follow the project's commit convention (conventional commits, imperative mood, etc.).

### Review comments

- Cite the function, variable, or line that motivates the comment.
- State the structural or behavioral reason, not just "this is better."
- A specific review comment lets the author act without guessing intent.

## UI copy and error messages

- Tell users what happened, what it affects, and what they can do next.
- Use labels that describe actions rather than clever or branded substitutes.
- Keep text short because the surface is constrained, not because fragments look bold.
- Never blame the user. Never claim success before the operation completes.

## Prompts, personas, and generated prose

- Write observable behavior and boundaries instead of stacks of personality adjectives.
- Separate instructions, context, output contract, and examples.
- Avoid asking a model to “sound human” without defining audience and evidence rules.
- Require preservation of facts and prohibit invented specificity.

## Localization

- Treat each locale as authored prose, not a word-for-word mirror.
- Preserve product semantics, commands, placeholders, and safety qualifications.
- Compare translations after editing the source language and flag drift explicitly.
- Load a region-specific locale pack when one exists; do not treat script conversion
  as localization.
- Keep official UI labels searchable even when they differ from local preference.
- Ask for a native review when a high-stakes locale exceeds available language ability.
