"""Negative fixtures for source accessibility and generated route checks."""

from __future__ import annotations

import sys
from pathlib import Path
from tempfile import TemporaryDirectory

from validate_site_accessibility import artifact_findings, source_findings


MINIMAL = """<!doctype html><html lang=\"en\"><body><main><h1>Title</h1>{body}</main></body></html>"""


def require(finding: str, findings: list[str], fixture: str) -> None:
    if not any(finding in item for item in findings):
        raise AssertionError(f"{fixture}: expected '{finding}', got {findings}")


def main() -> int:
    fixtures = 0
    try:
        findings = source_findings(Path("missing-alt.html"), MINIMAL.format(body='<img src="figure.svg">'))
        require("img requires an alt attribute", findings, "missing-alt")
        fixtures += 1

        findings = source_findings(Path("heading-jump.html"), MINIMAL.format(body="<h3>Skipped</h3>"))
        require("heading level jumps from h1 to h3", findings, "heading-jump")
        fixtures += 1

        with TemporaryDirectory(prefix="site-integrity-fixture-") as temporary:
            artifact = Path(temporary)
            (artifact / "site").mkdir()
            shell = MINIMAL.format(body='<a href="missing.html">Missing route</a><a href="#absent">Missing anchor</a>')
            (artifact / "index.html").write_text(shell, encoding="utf-8")
            (artifact / "site/index.html").write_text(shell, encoding="utf-8")
            (artifact / "site/reader.html").write_text(MINIMAL.format(body=""), encoding="utf-8")
            findings = artifact_findings(artifact)
            require("missing generated target", findings, "missing-route")
            require("missing generated anchor", findings, "missing-anchor")
            fixtures += 2

        reader_script = (Path(__file__).resolve().parents[1] / "site/reader.js").read_text(encoding="utf-8")
        for required in (
            "copyPrompt: 'Copy prompt'",
            "copyPrompt: '复制提示词'",
            "copiedPrompt: '提示词已复制'",
            "status.setAttribute('aria-live', 'polite')",
        ):
            if required not in reader_script:
                raise AssertionError(f"dynamic-copy-control: missing {required}")
        fixtures += 1
    except (AssertionError, OSError, UnicodeError, ValueError) as exc:
        print("SITE_ACCESSIBILITY_FIXTURES_FAILED")
        print(f"- {exc}")
        return 1
    print(f"SITE_ACCESSIBILITY_FIXTURES_OK fixtures={fixtures}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
