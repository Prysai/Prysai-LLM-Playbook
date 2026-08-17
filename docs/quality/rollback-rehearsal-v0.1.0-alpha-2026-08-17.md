# Rollback rehearsal: `v0.1.0-alpha`

**Status:** `candidate` · bounded static rehearsal only  
**Run date:** 2026-08-17  
**Owner:** release-maintainer  
**Target:** `v0.1.0-alpha` → `abd343d032ea1ad344b9ae9ccaecf5c1a2fbf5e9`

## Purpose

This record tests whether the reviewed alpha tag can be restored into an
isolated checkout and rebuilt as a Pages candidate without changing the live
repository, the GitHub release, or the public deployment. It is a recovery
exercise, not approval to release or a production rollback rehearsal.

## Controlled procedure

1. Created the temporary worktree `.work/rollback-rehearsal-20260817-alpha` at
   `refs/tags/v0.1.0-alpha`.
2. Confirmed the detached worktree was clean and resolved to the target SHA
   above.
3. Ran the following commands from that worktree:

   ```text
   python scripts/validate_project.py
   python scripts/validate_project_structure.py
   python scripts/validate_content_completeness.py
   python scripts/validate_release_readiness.py
   python scripts/build_pages_artifact.py --check
   python scripts/check_local_links.py
   python scripts/validate_learning_contract.py --canonical-en
   ```

4. Removed the temporary worktree after the checks. No production URL, GitHub
   release, tag, branch, file, account, or external service was changed.

## Observed output

- `VALIDATION_OK` (`required_files=114`)
- `PROJECT_STRUCTURE_OK` (`top_level=10`, `subdirectories=20`)
- `CONTENT_COMPLETENESS_OK` (`canonical_chapters=22`, `navigation=22`)
- `RELEASE_READINESS_OK decision=not_ready blockers=4`
- `PAGES_ARTIFACT_OK mode=temporary`
- `LOCAL_LINKS_OK checked=2726`
- `LEARNING_CONTRACT_OK chapters=22 labs=18`

The restored snapshot is therefore structurally rebuildable. Its own older
readiness record reports `not_ready`; that is an expected limitation of using
an older alpha snapshot and must not be hidden by this rehearsal.

## Boundary and follow-up

This evidence covers only isolated snapshot restoration and static candidate
rebuild. It does not prove that a deployed Pages site can be rolled back,
that caches will invalidate, that a live URL is reachable, that learner or
runtime evidence exists, or that the current `main` candidate is ready for
production. A production rollback still requires a deployment-specific runbook
and an approved operator with access to the hosting controls.
