# Multilingual release hardening checklist

## Baseline

- [ ] Reconcile license files, source register, and governance claims.
- [ ] Record current public/release/Pages/CI state without treating it as a
      learning or quality result.

## Six-language first path

- [ ] Verify English, 简体中文, Español, 日本語, 한국어, and Deutsch entries.
- [ ] Verify same-locale Reader links, anchors, search results, and fallbacks.
- [ ] Review the fundamentals → boundaries → first safe task sequence in all
      six locales.

## Content and draft boundary

- [ ] Remove reader-facing draft detours from the default route.
- [ ] Keep draft/not-run evidence in governance and label it accurately.
- [ ] Remove repetition, unsupported guarantees, and AI-sounding filler found
      during the first-path review.

## Skills and sources

- [ ] Validate every project Skill and its machine contract.
- [ ] Confirm external Skill records include target URL and license boundary.
- [ ] Add a Skill only when a documented gap and focused evaluation exist.

## Visual and release gates

- [ ] Run `npm run test:browser` and inspect desktop/mobile evidence.
- [ ] Run the full Python validation suite and `git diff --check`.
- [ ] Generate commit-bound release evidence.
- [ ] Confirm rollback and maintenance ownership before any ready claim.
- [ ] Commit and push each reviewed slice; report local, remote, and CI states
      separately.
