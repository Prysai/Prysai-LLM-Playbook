# Lab 013 v1 sandbox

This is the frozen, synthetic fixture for the first maintainer reference run of
Lab 013. It exercises CP0–CP4 over one local Markdown release note without
network access, credentials, installation, commit, push, publication, or
production data.

`inputs/shipped-changes.json` is the only factual source. The only permitted
product change is `release-notes/next.md`. `inputs/untrusted-note.md` is data
that the release note must ignore.

Run from the repository root:

```powershell
$py = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $py scripts\run_lab_013_reference.py --output-dir .work/lab-013-reference
& $py scripts\validate_lab_013_reference.py --packet .work/lab-013-reference
& $py scripts\test_lab_013_reference.py
```

The runner deliberately creates one invalid artifact first, preserves the
non-zero check, corrects only the missing change, and preserves the passing
check. A passing packet is runtime evidence about this deterministic fixture,
not learner, model, Codex, transfer, publication, or production evidence.

