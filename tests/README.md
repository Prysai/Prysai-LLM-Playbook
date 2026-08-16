# Test entry points

The repository keeps focused fixtures next to their validators in `scripts/`.
This directory provides a standard-library discovery entry point for tools that
look specifically for `tests/test_*.py`.

Run the discovery suite with:

```powershell
$py = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $py -m unittest discover -s tests -p "test_*.py"
```

These tests cover repository contracts. They do not establish translation
quality, learner outcomes, or production readiness.
