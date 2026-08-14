"""Negative fixtures for source accessibility and generated route checks."""

from __future__ import annotations

import json
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

        findings = source_findings(
            Path("implicit-label.html"),
            MINIMAL.format(body='<label><input type="radio" name="check" value="pass">Pass</label>'),
        )
        if any("input requires a label or accessible name" in item for item in findings):
            raise AssertionError(f"implicit-label: native nested label was rejected: {findings}")
        fixtures += 1

        findings = source_findings(
            Path("empty-implicit-label.html"),
            MINIMAL.format(body='<label><input type="radio" name="check" value="pass"></label>'),
        )
        require("input requires a label or accessible name", findings, "empty-implicit-label")
        fixtures += 1

        findings = source_findings(
            Path("hidden-implicit-label.html"),
            MINIMAL.format(body='<label><input type="radio" name="check" value="pass"><span aria-hidden="true">Pass</span></label>'),
        )
        require("input requires a label or accessible name", findings, "hidden-implicit-label")
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
            "visualLink.className = 'reader-image-link';",
            "visualLink.classList.add('reader-teaching-visual');",
            "thesis.className = 'reader-visual-thesis';",
            "linkLabel.className = 'reader-image-link-label';",
            "openVisual: 'Open full-size visual'",
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

        if "document.documentElement.lang = localeManifest.locales[effectiveUiLanguage]?.html_lang || 'en';" not in site_script:
            raise AssertionError("locale-fallback-language: the document language must follow the rendered UI language")
        fixtures += 1

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
            "judgment_state:",
            "firstWinCompare.disabled = !record.complete;",
        ):
            if required not in site_script:
                raise AssertionError(f"first-win-copy-feedback: missing {required}")
        if "accepted_on_this_check" in site_script or "acceptance:" in site_script:
            raise AssertionError("first-win-copy-feedback: self-reported judgments must not claim acceptance")
        for required in (
            'href="../README.md#choose-your-starting-point"',
            'data-content-id="chapter-01"',
            'data-content-id="chapter-02"',
            'data-content-id="lab-001-first-safe-task"',
            'data-route-decision',
            'data-content-id="first-safe-change-route"',
            'heroRouteFixtureBody',
            'mobileRouteFixture',
        ):
            if required not in site_markup:
                raise AssertionError(f"recommended-codex-route: missing {required}")
        for required in (
            "heroRouteGuidedTitle: 'Have a disposable project? Follow the guided path.'",
            "heroRouteFixtureBody: 'It supplies one offline target and check. It does not replace the guided Codex path.'",
            "heroRouteFixtureBody: '它提供一个离线目标和检查，不替代有引导的 Codex 路径。'",
        ):
            if required not in site_script:
                raise AssertionError(f"recommended-codex-route: missing route distinction '{required}'")
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
        for required in (
            ".reader-teaching-visual {",
            ".reader-article .reader-teaching-visual img { display: none; }",
            ".reader-visual-thesis {",
        ):
            if required not in reader_css:
                raise AssertionError(f"teaching-visual-reader-treatment: missing {required}")
        fixtures += 1

        manifest = build_site_locale_manifest.build_manifest()
        kinds = {content_id: record.get("kind") for content_id, record in manifest["contents"].items()}
        skill_ids = {content_id for content_id, kind in kinds.items() if kind == "skill"}
        field_note_ids = {content_id for content_id, kind in kinds.items() if kind == "field-note"}
        root = Path(__file__).resolve().parents[1]
        skill_registry = json.loads((root / "docs/governance/skill-registry.yaml").read_text(encoding="utf-8"))
        content_status = json.loads((root / "docs/governance/content-status.yaml").read_text(encoding="utf-8"))
        skill_count = len(skill_registry.get("records", []))
        if skill_count != content_status.get("skills", {}).get("count"):
            raise AssertionError("homepage-skill-inventory: skill registry and content status counts differ")
        if len(skill_ids) != skill_count:
            raise AssertionError(
                f"reader-content-identity: expected {skill_count} Skills, got {len(skill_ids)}"
            )
        if field_note_ids != {"field-problems-index-2026-08-10", "field-problems-forums-2026-08-10", "codex-field-cases-current-review-2026-08-12", "ai-safety-field-signals-and-research-receipts-2026-08-13", "field-case-external-instruction-authority-2026-08-13"}:
            raise AssertionError(f"reader-content-identity: unexpected public Field notes: {sorted(field_note_ids)}")
        fixtures += 1

        for expected in (
            f"{skill_count} reusable Skills · candidate",
            f"<strong>{skill_count}</strong><span data-i18n=\"mobileIndexSkills\">Skills</span>",
            f"Skills · {skill_count}",
        ):
            if expected not in site_markup:
                raise AssertionError(f"homepage-skill-inventory: missing markup count '{expected}'")
        for expected in (
            f"{skill_count} project Skills with triggers, boundaries, and evidence contracts.",
            f"ledgerSkills: 'Skills · {skill_count}'",
            f"{skill_count} \\u4e2a\\u9879\\u76ee Skill",
            f"ledgerSkills: 'Skill \\u00b7 {skill_count}'",
            f"{skill_count} 个可复用 Skill · candidate",
        ):
            if expected not in site_script:
                raise AssertionError(f"homepage-skill-inventory: missing localized count '{expected}'")
        fixtures += 1
    except (AssertionError, OSError, UnicodeError, ValueError) as exc:
        print("SITE_ACCESSIBILITY_FIXTURES_FAILED")
        print(f"- {exc}")
        return 1
    print(f"SITE_ACCESSIBILITY_FIXTURES_OK fixtures={fixtures}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
