# ADR-0037: make the first decision match the reader's actual starting point

## Status

Accepted; supersedes ADR-0032's hero-order decision while retaining its
distinction between the guided Codex path, the fixture, and the warm-up.

## Date

2026-08-14

## Context

The project teaches a transferable LLM collaboration core and has its deepest
current runnable teaching projection in the Codex Practice Track. The first
surface previously made the Codex route primary and described the no-setup
check as optional. That is appropriate for an already prepared Codex learner,
but it asks a reader with no code, project, or product experience to infer
which route is safe for them.

An independent read-only review also found that the public outcome could be
misread as general-core-plus-platform-adapters, even though the project has no
admitted runnable Claude Code or Grok route. The existing experienced-reader
First Win protocol does not address a person who has never sent a chat-model
prompt.

## Decision

1. Show the current guided scope before the first action: transferable core
   plus the Codex Practice Track. Name Claude Code and Grok as not yet runnable
   routes.
2. Put a no-setup, text-only LLM check first for readers without a project or
   coding background. It uses fictional material and does not grant tool,
   file, account, or private-data authority.
3. Keep the guided Codex path as the explicit route for a reader with a
   disposable project, beginning at Chapter 1.
4. Keep First Safe Change as a fallback for a safe local file after the Chapter
   2 decision. It does not replace the guided path.
5. Test the three entry labels and destinations in the browser gate, then use
   the newcomer observation protocol before making a usability or learner
   claim.

## Alternatives considered

### Keep Codex as the only visibly primary action

Rejected. It remains the flagship practice track but creates a false first
step for a reader who cannot safely work with a local project yet.

### Present Claude Code and Grok as equivalent starting lanes

Rejected. No source-backed, runnable adapter has passed the project's
admission gate; familiar product names do not establish equal controls,
permissions, or failure behavior.

### Remove the fixture and warm-up to reduce choices

Rejected. This would make the page shorter at the cost of removing the safe
fallbacks that the stated beginner conditions need. The repair is clearer
choice wording, not a misleading one-size-fits-all path.

## Consequences

- A first-time reader can select a route from their current condition instead
  of first learning product terminology.
- The public surface makes the current platform boundary visible before the
  reader can infer unsupported adapter coverage.
- The first visible action is no longer a claim that a text-only warm-up is a
  substitute for local Codex practice.
- The page remains a candidate surface. The new observation protocol is an
  instrument, not evidence that a newcomer understands, completes, learns, or
  transfers the method.

## Evidence boundary

Static and browser checks can establish labels, links, rendered layout, and
the absence of horizontal overflow in the recorded environment. Only an
authorized, privacy-bounded observation can provide limited evidence about
how the named cohort finds and chooses these entry routes. Neither form of
evidence establishes platform equivalence, teaching effectiveness, or release
readiness.
