"""Exercise the safe README fixture without invoking a model or the network."""

from __future__ import annotations

import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
FIXTURE = ROOT / "examples/lab-001-v1"
ROUTE = ROOT / "book/routes/first-safe-change-EN.md"


def run_verifier(seed: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [sys.executable, str(seed / "verify_readme.py")],
        cwd=seed,
        text=True,
        encoding="utf-8",
        errors="replace",
        capture_output=True,
        check=False,
    )


def main() -> int:
    failures: list[str] = []
    route_text = ROUTE.read_text(encoding="utf-8")
    fixture_readme_text = (FIXTURE / "README.md").read_text(encoding="utf-8")
    for label, text in (("route", route_text), ("fixture README", fixture_readme_text)):
        if "python.exe" in text or "codex-runtimes" in text:
            failures.append(f"{label} exposes a maintainer-specific runtime path to learners")
        if "required_readme_strings" not in text:
            failures.append(f"{label} does not explain the no-runtime acceptance source")
    if "No-runtime check (the default)" not in route_text:
        failures.append("route does not present a no-runtime check as the default")
    if "manual `3/3` check is the default" not in fixture_readme_text:
        failures.append("fixture README does not make the manual 3/3 check the default")

    baseline = run_verifier(FIXTURE / "seed")
    if baseline.returncode != 1 or "FIRST_SAFE_CHANGE_FAILED" not in baseline.stdout or "preview_command" not in baseline.stdout:
        failures.append("seeded README did not expose the intended preview-command failure")

    with tempfile.TemporaryDirectory(prefix="first-safe-change-") as temporary:
        copied = Path(temporary) / "fixture"
        shutil.copytree(FIXTURE, copied)
        readme = copied / "seed/README.md"
        original = readme.read_text(encoding="utf-8")
        corrected = original.replace(
            "python -m http.server\n", "python -m http.server 8080\n"
        ).replace(
            "Open the preview in a browser when it starts.",
            "Open http://127.0.0.1:8080 in a browser when it starts.",
        )
        readme.write_text(corrected, encoding="utf-8", newline="\n")
        passed = run_verifier(copied / "seed")
        if passed.returncode != 0 or "FIRST_SAFE_CHANGE_OK" not in passed.stdout:
            failures.append("one allowed README correction did not pass the fixture")

        readme.write_text(corrected.replace("http://127.0.0.1:8080", "the local address"), encoding="utf-8", newline="\n")
        missing_url = run_verifier(copied / "seed")
        if missing_url.returncode != 1 or "preview_url" not in missing_url.stdout:
            failures.append("missing local URL did not remain a visible failure")

    if failures:
        print("LAB_001_FIRST_SAFE_CHANGE_FIXTURE_FAILED")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("LAB_001_FIRST_SAFE_CHANGE_FIXTURE_OK baseline=failed corrected=passed negative=missing-url")
    print("evidence_boundary=fixture-checker-contract; not learner-or-model evidence")
    return 0


if __name__ == "__main__":
    sys.exit(main())
