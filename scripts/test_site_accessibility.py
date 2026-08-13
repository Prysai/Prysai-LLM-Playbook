"""Negative fixtures for source accessibility and generated route checks."""

from __future__ import annotations

import sys
from pathlib import Path
from tempfile import TemporaryDirectory

from validate_site_accessibility import artifact_findings, source_findings
import build_site_locale_manifest


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
        reader_markup = (Path(__file__).resolve().parents[1] / "site/reader.html").read_text(encoding="utf-8")
        reader_css = (Path(__file__).resolve().parents[1] / "site/reader.css").read_text(encoding="utf-8")
        for required in (
            "copyPrompt: 'Copy prompt'",
            "copyPrompt: '复制提示词'",
            "copiedPrompt: '提示词已复制'",
            "status.setAttribute('aria-live', 'polite')",
            "function isSafeDestination(value, path, { image = false } = {})",
            "const emptyAnchor = line.trim().match(/^<(?:a|span)\\s+id=\"([a-z][a-z0-9-]*)\"\\s*><\\/(?:a|span)>$/i);",
            "anchor.className = 'reader-anchor';",
            "const uniqueHeadingId = (value) => {",
            "else if (isSafeDestination(destination.target, path)) element.href = destination.target;",
            "link.href = window.CODEX_PAGES_ARTIFACT ? `../${target}` : target;",
        ):
            if required not in reader_script:
                raise AssertionError(f"dynamic-copy-control: missing {required}")
        if "else element.href = destination.target;" in reader_script:
            raise AssertionError("dynamic-reader-link-policy: unsafe fallback assignment returned")
        if "box.setAttribute('role', 'alert');" in reader_script:
            raise AssertionError("reader-error-announcement: duplicate assertive alert returned")
        if "setReaderStatus(message, { assertive: true });" not in reader_script:
            raise AssertionError("reader-error-announcement: primary assertive status is missing")
        if "banner.setAttribute('aria-live', assertive ? 'assertive' : 'polite');" not in reader_script:
            raise AssertionError("reader-error-announcement: live-region priority does not follow status severity")
        for required in (
            "async function fetchWithTimeout(url, consume = null)",
            "controller.abort()",
            "error?.name === 'AbortError' ? currentReaderCopy().loadTimeout : currentReaderCopy().loadNetwork",
            "retryButton.addEventListener('click', () => { void load(); }",
            "void loadTrustRecord(selection.contentId).then(renderTrustRecord)",
            "(openingParagraph || articleHeading)?.after(orientation, mobilePageToc);",
            "articleHeading.textContent.replace(/^Chapter",
            "Evidence note for this page",
            "data-reader-trust-reviewed",
            "Editorial order",
            "source-aware navigation and explicit evidence limits",
        ):
            if required not in reader_script:
                raise AssertionError(f"reader-recovery-contract: missing {required}")
        fixtures += 2

        site_script = (Path(__file__).resolve().parents[1] / "site/app.js").read_text(encoding="utf-8")
        site_markup = (Path(__file__).resolve().parents[1] / "site/index.html").read_text(encoding="utf-8")
        for required in (
            "const pagesHref = (href, language = currentLanguage) => {",
            "if (!path || !path.endsWith('.md')) return href;",
            "return `reader.html?path=${encodeURIComponent(path)}${localeQuery}${hash}`;",
        ):
            if required not in site_script:
                raise AssertionError(f"showcase-reader-route: missing {required}")
        if "if (!pagesArtifactMode) return href;" in site_script:
            raise AssertionError("showcase-reader-route: local site still sends Markdown links to raw files")
        if "if (pagesArtifactMode && pagesPathFromHref(sourceHref)?.endsWith('.md'))" in site_script:
            raise AssertionError("showcase-reader-route: unregistered Markdown links bypass the local Reader")
        fixtures += 1

        if '<script src="search-index.js' in site_markup:
            raise AssertionError("lazy-search-index: full-text index blocks the initial document")
        for required in (
            "const loadSearchIndex = () => {",
            "script.src = 'search-index.js?v=20260813-lazy-search';",
            "searchNodes.input.addEventListener('input'",
            "if (searchIntentObserved || !searchNodes.input.value.trim()) return;",
            "await loadSearchIndex();",
            "generation !== searchRunGeneration",
            "searchLoading: 'Loading the local search index…'",
        ):
            if required not in site_script:
                raise AssertionError(f"lazy-search-index: missing {required}")
        fixtures += 2

        for required in (
            "data-copy-starter",
            "data-copy-rescue",
            "data-starter-prompt",
            "data-rescue-prompt",
            "data-first-win-check",
            "data-first-win-compare",
            "data-first-win-receipt",
            "data-copy-first-win-record",
            "data-first-win-comparison",
            'aria-live="polite"',
        ):
            if required not in site_markup:
                raise AssertionError(f"first-win-controls: missing {required}")
        if site_markup.count("data-human-check") != 3:
            raise AssertionError("first-win-controls: exactly three human checks are required")
        for required in (
            "rescueCopyButton?.addEventListener('click'",
            "starterCopyButton?.addEventListener('click'",
            "starterRescueCopied",
            "const renderFirstWinRecord = () => {",
            "accepted_on_this_check",
            "firstWinCompare.disabled = !record.complete;",
        ):
            if required not in site_script:
                raise AssertionError(f"first-win-copy-feedback: missing {required}")
        fixtures += 2

        reader_styles = (Path(__file__).resolve().parents[1] / "site/styles.css").read_text(encoding="utf-8")
        if ".skill-grid > a:nth-child(n + 5) { display: none; }" in reader_styles:
            raise AssertionError("mobile-skill-catalog: Skills 5-12 are permanently hidden")
        if "#project-map .visual-case-card img, #project-map .visual-case-links small { display: none; }" in reader_styles:
            raise AssertionError("mobile-teaching-boards: project-owned visual previews are hidden")
        if "#project-map .visual-case-links { grid-template-columns: 1fr; }" not in reader_styles:
            raise AssertionError("mobile-teaching-boards: visual previews must retain a readable one-column layout")
        for required in (
            "skillMethod: 'Skill method'",
            "fieldNote: 'Field note'",
            "selection.readerType",
            "fallback: locale !== 'en', requested: locale, effective: 'en'",
            "selection.overviewTarget || 'index.html'",
        ):
            if required not in reader_script:
                raise AssertionError(f"reader-content-type: missing {required}")
        for forbidden in ("path.startsWith('skills/')", "path.startsWith('docs/research/')"):
            if forbidden in reader_script:
                raise AssertionError(f"reader-content-type: path-prefix inference returned: {forbidden}")
        for required in ("data-reader-mobile-page-toc", "data-reader-mobile-page-toc-list"):
            if required not in reader_markup:
                raise AssertionError(f"mobile-reader-toc: missing {required}")
        for required in ("mobilePageToc.open = false", "mobilePageTocList.replaceChildren", "target.focus({ preventScroll: true })"):
            if required not in reader_script:
                raise AssertionError(f"mobile-reader-toc: missing {required}")
        if ".reader-header { position: static; }" not in reader_css:
            raise AssertionError("mobile-reader-toc: mobile header must not persistently obstruct headings")
        if ".reader-article h2, .reader-article h3 { scroll-margin-top: 24px; }" not in reader_css:
            raise AssertionError("mobile-reader-toc: static-header heading offset is missing")
        fixtures += 1

        manifest = build_site_locale_manifest.build_manifest()
        kinds = {content_id: record.get("kind") for content_id, record in manifest["contents"].items()}
        skill_ids = {content_id for content_id, kind in kinds.items() if kind == "skill"}
        field_note_ids = {content_id for content_id, kind in kinds.items() if kind == "field-note"}
        if len(skill_ids) != 12:
            raise AssertionError(f"reader-content-identity: expected 12 Skills, got {len(skill_ids)}")
        if field_note_ids != {"field-problems-index-2026-08-10", "field-problems-forums-2026-08-10", "codex-field-cases-current-review-2026-08-12"}:
            raise AssertionError(f"reader-content-identity: unexpected public Field notes: {sorted(field_note_ids)}")
        fixtures += 1
    except (AssertionError, OSError, UnicodeError, ValueError) as exc:
        print("SITE_ACCESSIBILITY_FIXTURES_FAILED")
        print(f"- {exc}")
        return 1
    print(f"SITE_ACCESSIBILITY_FIXTURES_OK fixtures={fixtures}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
