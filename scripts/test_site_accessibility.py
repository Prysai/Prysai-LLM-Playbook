"""Negative fixtures for source accessibility and generated route checks."""

from __future__ import annotations

import json
import re
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
        if "box.setAttribute('role', 'alert');" not in reader_script:
            raise AssertionError("reader-error-announcement: actionable error card is not assertive")
        if "box.setAttribute('aria-live', 'assertive');" not in reader_script:
            raise AssertionError("reader-error-announcement: actionable error card lacks assertive priority")
        if "setReaderStatus('');" not in reader_script:
            raise AssertionError("reader-error-announcement: stale status banner is not cleared after an actionable error")
        for required in (
            "async function fetchWithTimeout(url, consume = null",
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
        # Non-English course files must not be wrapped in an English-only
        # Reader. These dynamic labels previously leaked from the default
        # dictionary, despite the page's static controls being translated.
        for locale, required in {
            "es": ("Capítulo ${number} de ${total}", "Práctica ${number} de ${total}", "solo para navegar por el catálogo"),
            "ja": ("第${number}章 / 全${total}章", "練習 ${number} / ${total}", "カタログ閲覧用の番号です"),
            "ko": ("제${number}장 / 전체 ${total}장", "연습 ${number} / ${total}", "카탈로그 탐색용 번호"),
            "de": ("Kapitel ${number} von ${total}", "Übung ${number} von ${total}", "nur Katalogreihenfolge"),
        }.items():
            for marker in required:
                if marker not in reader_script:
                    raise AssertionError(f"reader-locale-chrome: {locale} is missing '{marker}'")
        if "return `Chapter ${chapter.number} of ${bookNavigation.chapters.length}" in reader_script:
            raise AssertionError("reader-locale-chrome: non-Chinese chapter progress still falls back to English")
        if "'catalog order only'" in reader_script.split("function updateChapterRail", 1)[1]:
            raise AssertionError("reader-locale-chrome: chapter rail still falls back to English catalog copy")
        for required in (
            "chapter[`title_${locale}`]",
            "chapter[`canonical_title_${locale}`]",
        ):
            if required not in reader_script:
                raise AssertionError(f"reader-locale-chrome: localized generated chapter title is not read: {required}")
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
            "searchNodes.input.addEventListener('input'",
            "if (searchIntentObserved || !searchNodes.input.value.trim()) return;",
            "await loadSearchIndex();",
            "generation !== searchRunGeneration",
            "searchLoading: 'Loading the local search index…'",
        ):
            if required not in site_script:
                raise AssertionError(f"lazy-search-index: missing {required}")
        if not re.search(r"script\.src = 'search-index\.js\?v=[^']+';", site_script):
            raise AssertionError("lazy-search-index: missing a cache-busted generated search-index loader")
        fixtures += 2

        if "document.documentElement.lang = localeManifest.locales[effectiveUiLanguage]?.html_lang || 'en';" not in site_script:
            raise AssertionError("locale-fallback-language: the document language must follow the rendered UI language")
        if "localStorage" in site_script:
            raise AssertionError("locale-url-authority: showcase browser storage must not override an English or shared locale URL")
        # The Reader may keep an explicitly opt-in, local-only learning
        # receipt. It must never use browser storage as a language preference;
        # check the storage call sites rather than banning unrelated local data.
        for line in reader_script.splitlines():
            if "localStorage" in line and re.search(r"language|locale", line, re.IGNORECASE):
                raise AssertionError("locale-url-authority: Reader browser storage must not override an English or shared locale URL")
        for required in (
            "const hasExplicitLanguageParam = languageParam !== null;",
            "currentLanguage = localeTokens.includes(currentLanguage) ? currentLanguage : localeManifest.default_locale;",
            "const locale = validLocales.includes(requestedLocale) ? requestedLocale : manifest.default_locale || 'en';",
        ):
            if required not in (site_script + reader_script):
                raise AssertionError(f"locale-url-authority: missing URL-default contract '{required}'")
        for required in (
            "const canonicalContentId = (contentId) => localeManifest.aliases?.[contentId] || contentId;",
            "const contentId = canonicalContentId(anchor.dataset.contentId || contentIdForHref(sourceHref));",
        ):
            if required not in site_script:
                raise AssertionError(f"locale-alias-routing: missing {required}")
        fixtures += 1

        # The seven-language promise covers the declared 22-chapter / 18-Lab
        # course route. Skills, research, and governance have separately
        # governed translation status, so the public locale panel must never
        # relabel that bounded path as every reader-facing document.
        for forbidden in (
            "every reader-facing page is available in all seven",
            "所有面向读者的页面均提供七语种版本",
            "todas las páginas para lectores existen en los siete",
            "すべての読者向けページが7言語で存在します",
            "모든 독자용 페이지가 7개 언어로 제공됩니다",
            "jede leserorientierte Seite liegt in allen sieben Sprachen vor",
        ):
            if forbidden in site_script:
                raise AssertionError(f"locale-coverage-boundary: overstates course-route coverage: {forbidden}")
        for required in (
            "22 chapters and 18 Labs",
            "22 章和 18 个实验",
            "22 capítulos y 18 Labs",
            "22章と18件のLab",
            "22개 장과 18개 Lab",
            "22 Kapitel und 18 Labs",
        ):
            if required not in site_script:
                raise AssertionError(f"locale-coverage-boundary: missing bounded course-route disclosure: {required}")
        fixtures += 1

        for required in (
            "data-copy-starter",
            "data-starter-prompt",
            "starterStepOne",
            "starterStepTwo",
            "starterStepThree",
            "starterWhy",
            'aria-live="polite"',
        ):
            if required not in site_markup:
                raise AssertionError(f"first-prompt-practice: missing {required}")
        if site_markup.count("data-first-win-check") != 0 or site_markup.count("data-first-win-receipt") != 0:
            raise AssertionError("first-prompt-practice: homepage must not expose lab-style self-scoring records")
        for required in (
            "starterCopyButton?.addEventListener('click'",
            "await navigator.clipboard.writeText(starterPrompt?.textContent || '');",
        ):
            if required not in site_script:
                raise AssertionError(f"first-prompt-practice: missing {required}")
        for required in (
            'href="reader.html?path=book%2Froutes%2Fllm-foundation-core-v1-EN.md&amp;lang=en"',
            'data-content-id="llm-foundation-core-v1"',
            'data-content-id="llm-fundamentals-guide"',
            'data-content-id="llm-core-first-generation"',
            'data-route-decision',
            'heroRouteLessonZero',
            'heroRouteLessonZeroBody',
            'heroRouteChapterOne',
            'heroRouteChapterTwo',
        ):
            if required not in site_markup:
                raise AssertionError(f"textbook-route: missing {required}")
        for required in (
            "heroRouteLessonZero: '1 · LLM Foundation Core'",
            "heroRouteChapterOne: '2 · Unit 1: what an LLM is'",
            "heroRouteChapterTwo: '3 · Unit 2: your first bounded request'",
            "heroRouteLessonZero: '1 · LLM 基础核心课'",
        ):
            if required not in site_script:
                raise AssertionError(f"textbook-route: missing route distinction '{required}'")
        fixtures += 2

        for required in (
            "const updateSeoMetadata = (language) => {",
            "link[rel=\"canonical\"]",
            "meta[property=\"og:url\"]",
            "meta[name=\"twitter:description\"]",
            "#site-structured-data",
        ):
            if required not in site_script:
                raise AssertionError(f"localized-seo: missing {required}")
        if 'const seoLocaleHref = (language) => language === \'en\' ? seoBaseUrl : `${seoBaseUrl}${language}.html`;' not in site_script:
            raise AssertionError("localized-seo: non-English canonical URLs must have crawlable static entries")
        for required in (
            'hreflang="zh-CN" href="https://docs.prysai.com/llm-playbook/zh.html"',
            'href="../zh.html" data-language-option="zh"',
            'href="../de.html" data-language-option="de"',
            'property="og:locale" content="en_US"',
        ):
            if required not in site_markup:
                raise AssertionError(f"localized-seo: missing static locale entry '{required}'")
        seo_config = json.loads((Path(__file__).resolve().parents[1] / "site/seo-config.json").read_text(encoding="utf-8"))
        zh_seo = seo_config.get("static_locale_pages", {}).get("zh", {})
        if zh_seo.get("html_lang") != "zh-CN":
            raise AssertionError("localized-seo: Simplified Chinese must use the consistent zh-CN language tag")
        # A versioned application asset is required for a newly deployed
        # localized route to fetch the matching UI and metadata behavior.
        # The query is a deployment cache boundary, not a claim of browser
        # cache invalidation across every intermediary.
        if not re.search(r'<script src="app\.js\?v=[A-Za-z0-9-]+" defer></script>', site_markup):
            raise AssertionError("localized-seo: app.js must use a non-empty immutable cache version")
        if not re.search(r'<script src="reader\.js\?v=[A-Za-z0-9-]+" defer></script>', reader_markup):
            raise AssertionError("locale-url-authority: reader.js must use a non-empty immutable cache version")
        fixtures += 1

        reader_styles = (Path(__file__).resolve().parents[1] / "site/styles.css").read_text(encoding="utf-8")
        if ".skill-grid > a:nth-child(n + 5) { display: none; }" in reader_styles:
            raise AssertionError("mobile-skill-catalog: Skills 5-12 are permanently hidden")
        if "#project-map .visual-case-card img, #project-map .visual-case-links small { display: none; }" in reader_styles:
            raise AssertionError("mobile-teaching-boards: project-owned visual previews are hidden")
        if "#project-map .visual-case-links { grid-template-columns: 1fr; }" not in reader_styles:
            raise AssertionError("mobile-teaching-boards: visual previews must retain a readable one-column layout")
        preview_rule = re.search(r"\.visual-case-card img\s*\{(?P<body>[^}]*)\}", reader_styles)
        if not preview_rule or not re.search(r"aspect-ratio:\s*3\s*/\s*4", preview_rule.group("body")) or "object-fit: contain" not in preview_rule.group("body"):
            raise AssertionError("teaching-board-preview: vertical teaching boards must show their full composition instead of a cropped 16:9 slice")
        for required in (
            "skillMethod: 'Skill method'",
            "fieldNote: 'Field note'",
            "selection.readerType",
            "missingTranslation: true",
            "requested: locale,",
            "effective: locale,",
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
        locale_matrix = json.loads((root / "docs/governance/locale-matrix.yaml").read_text(encoding="utf-8"))
        declared_field_notes = [
            record
            for record in locale_matrix.get("reader_content", [])
            if record.get("kind") == "field-note"
        ]
        declared_field_note_ids = {record.get("content_id") for record in declared_field_notes}
        if len(declared_field_note_ids) != len(declared_field_notes):
            raise AssertionError("reader-content-identity: locale matrix has duplicate Field note identities")
        skill_registry = json.loads((root / "docs/governance/skill-registry.yaml").read_text(encoding="utf-8"))
        content_status = json.loads((root / "docs/governance/content-status.yaml").read_text(encoding="utf-8"))
        skill_count = len(skill_registry.get("records", []))
        if skill_count != content_status.get("skills", {}).get("count"):
            raise AssertionError("homepage-skill-inventory: skill registry and content status counts differ")
        if len(skill_ids) != skill_count:
            raise AssertionError(
                f"reader-content-identity: expected {skill_count} Skills, got {len(skill_ids)}"
            )
        if field_note_ids != declared_field_note_ids:
            raise AssertionError(
                "reader-content-identity: generated Field notes differ from locale matrix "
                f"(declared={sorted(declared_field_note_ids)}, generated={sorted(field_note_ids)})"
            )
        fixtures += 1

        for expected in (
            f"{skill_count} reusable methods for recurring work",
            f"<strong>{skill_count}</strong><span data-i18n=\"mobileIndexSkills\">Skills</span>",
        ):
            if expected not in site_markup:
                raise AssertionError(f"homepage-skill-inventory: missing markup count '{expected}'")
        for expected in (
            f"repositorySkills: '{skill_count} reusable methods for recurring work'",
            f"repositorySkills: '{skill_count} 个可复用的方法，应对重复工作'",
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
