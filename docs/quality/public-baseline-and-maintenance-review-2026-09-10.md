# Public baseline and maintenance review — 2026-09-10

**Review status:** `dated live observation`
**Project status:** `candidate`
**Review target:** public `Prysai/Prysai-LLM-Playbook` `main` at
`4e7b9386a14de3b853429fb3c75bd7a1de19662a`
**Purpose:** refresh the public maintenance baseline after PR #98 and keep
source, engineering, artifact, public-host, and learner-evidence claims
separate.

This is a dated snapshot. It does not promote the project to `verified`,
`production-ready`, or an accepted release. The machine-readable release
decision remains `not_ready`.

## Conclusion

The public baseline is internally consistent for the checks and publication
surfaces recorded below. The current main commit is suitable as a clean
candidate starting point for the next focused maintenance PR. It is not the
same thing as the dirty shared development checkout, and it is not evidence
that the course has been learned or that a production rollback has been
tested.

The high-value follow-up remains narrow: keep using one maintained branch,
refresh volatile evidence before making claims, and do not add breadth until
the core learner pilot and source-archive boundary are executable.

## Facts checked

| Area | Observation | Evidence boundary |
| --- | --- | --- |
| Public source | `main` resolves to [`4e7b9386`](https://github.com/Prysai/Prysai-LLM-Playbook/commit/4e7b9386a14de3b853429fb3c75bd7a1de19662a), the merge commit for PR [#98](https://github.com/Prysai/Prysai-LLM-Playbook/pull/98). | Establishes the public source baseline at this review time. It does not synchronize or validate local development branches. |
| Quality | The public quality run [`34545068467`](https://github.com/Prysai/Prysai-LLM-Playbook/actions/runs/34545068467) completed successfully for the exact current-main SHA. Its unified regression and commit-bound release-evidence steps completed successfully. | Engineering and candidate-evidence status only; the packet remains `candidate_only` and is not an accepted release decision. |
| Security | The repository-security run [`34545068463`](https://github.com/Prysai/Prysai-LLM-Playbook/actions/runs/34545068463) completed successfully for the exact current-main SHA. | Static repository-policy and fixture evidence only; it is not a complete security audit or host compromise assessment. |
| Multilingual coverage | The eight-locale audit [`34545068450`](https://github.com/Prysai/Prysai-LLM-Playbook/actions/runs/34545068450) completed successfully for the exact current-main SHA. | Structural route, content-identity, and audit-contract evidence; it does not prove native-language quality, cultural adaptation, or learner equivalence. |
| Code scanning | The latest successful CodeQL run [`34544420680`](https://github.com/Prysai/Prysai-LLM-Playbook/actions/runs/34544420680) inspected PR #98's head `469415e3d580de804b37b52279665696a57bdbf6`. | A successful PR-head scan is recorded separately; this snapshot does not relabel it as a distinct post-merge current-main CodeQL run. |
| Publication | The site workflow [`34545068479`](https://github.com/Prysai/Prysai-LLM-Playbook/actions/runs/34545068479) completed successfully for the exact current-main SHA. Build, Pages deployment, Hugging Face sync, and Docs publication verification all completed successfully. | Establishes the named workflow jobs, not universal host equivalence or production readiness. |
| Docs artifact | A fresh artifact built from `4e7b9386` passed `PAGES_ARTIFACT_OK`. The existing verifier returned `DEPLOYED_SITE_OK attempts=1 paths=30` for `https://docs.prysai.com/llm-playbook/`. | Strong route-critical artifact/Docs byte evidence for the recorded host and path set. It does not prove comprehension, translation quality, or assistive-technology behavior. |
| Hugging Face | `https://huggingface.co/spaces/Prysai/Prysai-LLM-Playbook` returned HTTP 200. | Availability only; no exact artifact-byte comparison was run here. |
| GitHub Pages identity | The Pages API reports source `main` at `/` and the configured URL `http://prysai.com/`. | Pages identity is recorded separately from Docs; this review does not claim that both hosts serve byte-identical content. |
| Ruleset | Active ruleset [`20903386`](https://github.com/Prysai/Prysai-LLM-Playbook/rules/20903386) requires pull-request review, signatures, CodeQL, code quality, resolved threads, and the `candidate-evidence`, `repository-security`, and `pull-request-contract` checks; no bypass actors were returned. | Ruleset observation only. The legacy branch-protection endpoint returning 404 does not override the active ruleset. |

The machine-readable release record now points its candidate evidence to
`4e7b9386` and run `34545068467`, while retaining `decision: not_ready` and
`release_evidence.status: candidate_only`.

## Local state deliberately excluded

The shared checkout remains on
`uuzzrm/native-copy-polish-20260828` at
`52717e2002082332758d74ca5e42d41762351527`. It is 231 commits behind and 57
commits ahead of public `main`, with 33 modified tracked files and 11
non-ignored untracked files. It is user work and is not a publication or
release-evidence source. This review does not reset it, clean it, or delete
its branches or worktrees.

The maintained contribution branch used for this review was based on the
current public `main` in a clean isolated worktree. No second topic branch was
created for this update.

## Current maturity gaps

The following gaps remain explicit:

- The project and LLM Foundation Core remain `candidate`; learner, transfer,
  and retention evidence remain `not_run`.
- The 18 Labs remain `draft / not_run`; deterministic maintainer reference
  runs are not learner or transfer evidence.
- `python -X utf8 scripts/audit_input_archives.py` remains incomplete because
  `PRYSAI_INPUT_ARCHIVE_DIR` or an explicit archive directory was not
  configured. No provenance-closure claim is made.
- The eight locales have structural coverage, but native-language review and
  learning equivalence are not established.
- The quality ledger still contains active P0/P1 blockers; its check reports
  `active_p0=2`, `active_p1=4`, and `active_p2=2`. Q-011 remains in progress
  because accepted release evidence and production rollback evidence are not
  present.
- The current release-readiness decision is `not_ready` with one remaining
  machine-readable blocker: `release_evidence`. The candidate packet is not a
  release, and the alpha tag is only an older rollback reference.
- The update registry has separate review clocks for volatile facts and
  locale/site maintenance. This refresh does not claim that the due
  official-facts semantic review or every locale-quality review is complete.

## Checks run for this refresh

The following checks were run from an isolated worktree based on current
public `main`. The worktree was clean before this refresh was edited; the
governance checks were repeated after the edits below:

```text
python -X utf8 scripts/validate_release_readiness.py
→ RELEASE_READINESS_OK decision=not_ready blockers=2 before this refresh;
  after the evidence-pointer refresh the maintenance record is reviewed and
  the only remaining readiness blocker is release_evidence

python -X utf8 scripts/build_release_evidence.py --check
→ RELEASE_EVIDENCE_CONTRACT_OK dimensions=6 commands=98

python -X utf8 scripts/validate_update_registry.py
→ VALIDATION_OK registry=docs\governance\update-registry.yaml areas=22

python -X utf8 scripts/validate_timely_content.py
→ TIMELY_CONTENT_VALIDATION_OK as_of=2026-09-10 field_notes=14 source_first_field_notes=1

python -X utf8 scripts/validate_content_status.py
→ CONTENT_STATUS_OK chapters=22 labs=18 skills=26 learning_levels=7 evaluations=40 tracks=16

python -X utf8 scripts/validate_repository_security.py
→ REPOSITORY_SECURITY_POLICY_OK workflows=10 candidate_files=1641 host_ruleset=active

python -X utf8 scripts/check_local_links.py
→ LOCAL_LINKS_OK checked=4686

python -X utf8 scripts/build_quality_register.py --check
→ QUALITY_REGISTER_OK items=13 active_p0=2 active_p1=4 active_p2=2

python -X utf8 scripts/run_tests.py
→ TEST_RUNNER_SUMMARY script_tests=51 passed=52 failed=0

python -X utf8 scripts/audit_input_archives.py
→ INPUT_ARCHIVE_AUDIT_INCOMPLETE archive_dir=not_configured

python -X utf8 scripts/build_pages_artifact.py --output <temporary-directory>
→ PAGES_ARTIFACT_OK

python -X utf8 scripts/check_deployed_site.py --artifact <temporary-directory> \
  --base-url https://docs.prysai.com/llm-playbook/ \
  --attempts 3 --delay-seconds 2 --timeout-seconds 15 \
  --cache-buster 4e7b9386a14de3b853429fb3c75bd7a1de19662a
→ DEPLOYED_SITE_OK attempts=1 paths=30
```

The first readiness line records the pre-edit diagnostic from this refresh;
the committed machine-readable contract is validated again after the edit.
The archive audit is intentionally recorded as incomplete rather than omitted.

## Maintenance decisions

1. Use `4e7b9386` as the only public baseline for the next candidate.
2. Continue the existing `uuzzrm/maintenance-review-intake-20260901` branch
   for this maintenance stream; do not create another similarly named branch.
3. Keep the project at `candidate` and `not_ready` until the release packet,
   source archive boundary, learner pilot, and rollback evidence meet their
   own contracts.
4. Keep timely field notes source-first, dated, scoped, and candidate-only;
   a friend or community report remains a demand signal, not a product fact.
5. Do not use this review as a reason to add chapters, Skills, locales,
   visual controls, or platform claims.

## Source and license boundary

This is an original Prysai maintenance record. No external prose, code,
image, prompt, transcript, or private material was adapted. The repository's
existing `LICENSE`, `LICENSE-CODE`, and
`docs/sources/asset-register.md` remain the governing license records.

## Next review

| Item | Owner | Trigger | Next review |
| --- | --- | --- | --- |
| Public branch, ruleset, and workflow evidence | `release-maintainer` | Any merge, workflow, or ruleset change | 2026-10-10 |
| Docs, Hugging Face, and Pages surface identity | `site-maintainer` | Host, workflow, or artifact change | 2026-09-24 |
| Input archive and source boundary | `source-maintainer` | Archive availability or source change | Before the next provenance claim |
| Core learner pilot | `quality-maintainer` | Protocol approval or first authorized run | Before recruitment |
| Volatile platform facts | `facts-maintainer` | Official source change or reported step failure | Before the next affected-content update |
