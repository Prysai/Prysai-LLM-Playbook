"""Build the bounded static artifact used by GitHub Pages."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import sys
from pathlib import Path
from tempfile import TemporaryDirectory
from urllib.parse import quote
from xml.sax.saxutils import escape as xml_escape

from validate_site_accessibility import artifact_findings


ROOT = Path(__file__).resolve().parents[1]
PUBLISH_DIRECTORIES = ("site", "book", "docs", "skills", "assets", "examples", "evals")
PUBLISH_ROOT_FILES = (
    "README.md",
    "README-EN.md",
    "README-ZH.md",
    "README-ES.md",
    "README-JA.md",
    "README-KO.md",
    "README-DE.md",
    "README-ZHTW.md",
    "README-FR.md",
    "AGENTS.md",
    "CONTEXT.md",
)
FORBIDDEN_NAMES = (".git", ".work", ".codex-temp", "tmp", ".pytest_cache")
REQUIRED_PUBLISH_FILES = (
    "assets/branding/prysai-lab-mark-black-96.png",
    "assets/branding/prysai-lab-mark-white-96.png",
    "assets/readme/prysai-llm-playbook-social.png",
)
SEO_CONFIG = ROOT / "site/seo-config.json"
SPACE_README_FRONTMATTER = """---
title: Prysai LLM Playbook
emoji: "📖"
colorFrom: gray
colorTo: indigo
sdk: static
pinned: false
---
"""
FORBIDDEN_PUBLISH_FILENAMES = {
    ".env",
    "credentials.json",
    "secrets.json",
    "token.json",
    "id_rsa",
    "id_ed25519",
}
FORBIDDEN_PUBLISH_SUFFIXES = (".pem", ".key", ".p12", ".pfx")
TEXT_PUBLISH_SUFFIXES = {
    ".css", ".csv", ".html", ".js", ".json", ".md", ".svg", ".toml", ".txt", ".xml", ".yaml", ".yml",
}
RENDERABLE_TRANSLATION_STATUSES = {
    "source",
    "candidate",
    "in-progress",
    "verified",
    "production-ready",
}
# Reader/search may expose an in-progress translation with an explicit
# disclosure, but a public sitemap should contain only pages that are ready to
# be treated as indexable content. Keep maturity and translation readiness
# separate: a candidate source can be indexed, while a draft or incomplete
# translation cannot.
SITEMAP_CONTENT_STATUSES = {
    "candidate",
    "verified",
    "production-ready",
}
SITEMAP_TRANSLATION_STATUSES = RENDERABLE_TRANSLATION_STATUSES - {"in-progress"}
SITEMAP_INDEX_FILENAME = "sitemap_index.xml"
# Deliberately narrow credential signatures. This detects publishable secrets,
# not ordinary instructional prose about tokens, keys, or passwords.
SECRET_SIGNATURES = (
    ("private-key", re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----")),
    ("github-classic-token", re.compile(r"\bgh[pousr]_[A-Za-z0-9]{36,255}\b")),
    ("github-fine-grained-token", re.compile(r"\bgithub_pat_[A-Za-z0-9_]{70,100}\b")),
    ("openai-api-key", re.compile(r"\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b")),
    ("anthropic-api-key", re.compile(r"\bsk-ant-[A-Za-z0-9_-]{20,}\b")),
)


def root_index(site_index: Path) -> str:
    """Return a root entry that loads the source site from the artifact.

    Use the generated document as the base URL rather than the ``site/``
    directory.  Some static hosts redirect directory requests (including a
    fragment-only navigation resolved against that directory) to a provider
    route instead of serving ``site/index.html``.
    """

    text = site_index.read_text(encoding="utf-8")
    marker = "<head>"
    if marker not in text:
        raise ValueError(f"{site_index.relative_to(ROOT)} is missing a <head> element")
    base = '    <base href="site/index.html" />\n    <script>window.CODEX_PAGES_ARTIFACT = true;</script>\n'
    return text.replace(marker, f"{marker}\n{base}", 1)


VERSIONED_SITE_ASSETS = (
    "styles.css",
    "locale-manifest.js",
    "learning-path-data.js",
    "goal-templates.js",
    "traditional-chinese.js",
    "app.js",
    "reader.css",
    "reader.js",
    "search-index.js",
    "visuals.css",
    "visuals.js",
    "visual.html",
    "visual-viewer.css",
    "visual-viewer.js",
)


def asset_versions() -> dict[str, str]:
    """Return short content fingerprints for browser-cached public assets."""

    return {
        name: hashlib.sha256((ROOT / "site" / name).read_bytes()).hexdigest()[:16]
        for name in VERSIONED_SITE_ASSETS
    }


def versioned_asset_references(text: str, versions: dict[str, str]) -> str:
    """Replace hand-maintained query labels with content-addressed versions."""

    for name, version in versions.items():
        text = re.sub(
            rf"({re.escape(name)}\?v=)[^\"'\s<>]+",
            rf"\g<1>{version}",
            text,
        )
    return text


def static_locale_page(site_index: Path, config: dict[str, object], locale: str) -> str:
    """Build a crawlable, language-specific entry without duplicating source content."""
    pages = config["static_locale_pages"]
    assert isinstance(pages, dict)
    metadata = pages[locale]
    assert isinstance(metadata, dict)
    base_url = str(config["public_site_url"])
    page_url = f"{base_url}{locale}.html"
    text = root_index(site_index)
    text = text.replace('<html lang="en">', f'<html lang="{metadata["html_lang"]}" data-prysai-static-locale="{locale}">', 1)
    home_page = config["home_page"]
    assert isinstance(home_page, dict)
    text = text.replace(f'<title>{home_page["title"]}</title>', f'<title>{metadata["title"]}</title>', 1)
    text = re.sub(r'(<meta name="description" content=")[^"]*(" />)', rf'\g<1>{metadata["description"]}\2', text, count=1)
    text = re.sub(r'(<link rel="canonical" href=")[^"]*(" />)', rf'\g<1>{page_url}\2', text, count=1)
    text = re.sub(r'(<meta property="og:url" content=")[^"]*(" />)', rf'\g<1>{page_url}\2', text, count=1)
    text = re.sub(r'(<meta property="og:locale" content=")[^"]*(" />)', rf'\g<1>{metadata["og_locale"]}\2', text, count=1)
    text = re.sub(r'(<meta property="og:title" content=")[^"]*(" />)', rf'\g<1>{metadata["title"]}\2', text, count=1)
    text = re.sub(r'(<meta property="og:description" content=")[^"]*(" />)', rf'\g<1>{metadata["description"]}\2', text, count=1)
    text = re.sub(r'(<meta name="twitter:title" content=")[^"]*(" />)', rf'\g<1>{metadata["title"]}\2', text, count=1)
    text = re.sub(r'(<meta name="twitter:description" content=")[^"]*(" />)', rf'\g<1>{metadata["description"]}\2', text, count=1)
    structured_data = re.search(r'(<script type="application/ld\+json" id="site-structured-data">)(.*?)(</script>)', text)
    if not structured_data:
        raise ValueError(f"{site_index.relative_to(ROOT)} is missing site structured data")
    value = json.loads(structured_data.group(2))
    value["url"] = page_url
    value["name"] = str(config["site_name"])
    value["alternateName"] = str(config["alternate_name"])
    value["description"] = metadata["description"]
    value["inLanguage"] = metadata["html_lang"]
    text = text[:structured_data.start(2)] + json.dumps(value, ensure_ascii=False, separators=(",", ":")) + text[structured_data.end(2):]
    text = text.replace('window.CODEX_PAGES_ARTIFACT = true;', f'window.CODEX_PAGES_ARTIFACT = true; window.PRYSAI_STATIC_LOCALE = "{locale}";', 1)
    return text


def pages_reader(reader: Path) -> str:
    """Return the Reader with an explicit artifact routing mode."""

    text = reader.read_text(encoding="utf-8")
    marker = "<head>"
    if marker not in text:
        raise ValueError(f"{reader.relative_to(ROOT)} is missing a <head> element")
    flag = "    <script>window.CODEX_PAGES_ARTIFACT = true;</script>\n"
    return text.replace(marker, f"{marker}\n{flag}", 1)


def pages_reader_alias(reader: Path) -> str:
    """Return a root-level Reader alias whose base points into ``site/``.

    The published artifact keeps the source Reader at ``site/reader.html``.
    A root-level alias makes copied or bookmarked ``/reader.html?...`` links
    resolve to the same shell instead of falling back to the homepage.  The
    explicit file base is important: it routes the Reader's relative assets,
    Markdown sources, and locale manifest through the artifact root.
    """

    text = pages_reader(reader)
    marker = "<head>"
    if marker not in text:
        raise ValueError(f"{reader.relative_to(ROOT)} is missing a <head> element")
    base = '    <base href="site/reader.html" />\n'
    return text.replace(marker, f"{marker}\n{base}", 1)


def pages_visuals(visuals: Path, base_url: str) -> str:
    """Return the root visual entry while keeping its source-relative assets."""

    text = visuals.read_text(encoding="utf-8")
    marker = "<head>"
    if marker not in text:
        raise ValueError(f"{visuals.relative_to(ROOT)} is missing a <head> element")
    base = '    <base href="site/visuals.html" />\n'
    flag = "    <script>window.CODEX_PAGES_ARTIFACT = true;</script>\n"
    canonical = f'    <link rel="canonical" href="{base_url}visuals.html" />\n'
    return text.replace(marker, f"{marker}\n{base}{flag}{canonical}", 1)


def validate_source() -> None:
    required = (
        ROOT / "site/index.html",
        ROOT / "site/styles.css",
        ROOT / "site/app.js",
        ROOT / "site/locale-manifest.js",
        ROOT / "site/learning-path-data.js",
        ROOT / "site/goal-templates.js",
        ROOT / "site/traditional-chinese.js",
        ROOT / "site/search-index.js",
        ROOT / "site/reader.html",
        ROOT / "site/reader.css",
        ROOT / "site/reader.js",
        ROOT / "site/visual.html",
        ROOT / "site/visual-viewer.css",
        ROOT / "site/visual-viewer.js",
        SEO_CONFIG,
        *(ROOT / path for path in REQUIRED_PUBLISH_FILES),
    )
    missing = [path.relative_to(ROOT).as_posix() for path in required if not path.is_file()]
    if missing:
        raise FileNotFoundError("missing Pages source files: " + ", ".join(missing))


def load_seo_config() -> dict[str, object]:
    value = json.loads(SEO_CONFIG.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError("site/seo-config.json must contain an object")
    base_url = value.get("public_site_url")
    locales = value.get("locales")
    if not isinstance(base_url, str) or not base_url.startswith("https://") or not base_url.endswith("/"):
        raise ValueError("site/seo-config.json public_site_url must be an absolute HTTPS URL ending in /")
    for key in ("site_name", "alternate_name"):
        if not isinstance(value.get(key), str) or not value[key].strip():
            raise ValueError(f"site/seo-config.json {key} must be a non-empty string")
    if locales != ["en", "zh", "es", "ja", "ko", "de", "zh-tw", "fr"]:
        raise ValueError("site/seo-config.json locales must list the eight supported locales in canonical order")
    locale_pages = value.get("static_locale_pages")
    home_page = value.get("home_page")
    expected_pages = {locale for locale in locales if locale != "en"}
    if not isinstance(locale_pages, dict) or set(locale_pages) != expected_pages:
        raise ValueError("site/seo-config.json static_locale_pages must define each non-English locale")
    if not isinstance(home_page, dict) or not all(isinstance(home_page.get(key), str) and home_page[key].strip() for key in ("html_lang", "og_locale", "title", "description")):
        raise ValueError("site/seo-config.json home_page needs html_lang, og_locale, title, and description")
    for locale, metadata in locale_pages.items():
        if not isinstance(metadata, dict) or not all(isinstance(metadata.get(key), str) and metadata[key].strip() for key in ("html_lang", "og_locale", "title", "description")):
            raise ValueError(f"site/seo-config.json static_locale_pages[{locale}] needs html_lang, og_locale, title, and description")
    return value


def sitemap_urls(config: dict[str, object]) -> list[str]:
    """Return crawlable, same-host entry and Reader URLs from the manifest."""

    base_url = str(config["public_site_url"])
    urls = [base_url, *(f"{base_url}{locale}.html" for locale in config["locales"] if locale != "en")]
    # Keep the sitemap tied to the same canonical locale/content manifest as
    # the Reader. A missing or non-renderable translation is not an indexable
    # page and must not silently become an English URL.
    import build_site_locale_manifest  # pylint: disable=import-outside-toplevel

    manifest = build_site_locale_manifest.build_manifest()
    for content in manifest.get("contents", {}).values():
        for locale in config["locales"]:
            record = content.get("locales", {}).get(locale)
            if not isinstance(record, dict):
                continue
            if (
                not record.get("exists")
                or record.get("content_status") not in SITEMAP_CONTENT_STATUSES
                or record.get("translation_status") not in SITEMAP_TRANSLATION_STATUSES
            ):
                continue
            path = str(record.get("path", ""))
            if not path.endswith(".md"):
                continue
            urls.append(
                f"{base_url}site/reader.html?path={quote(path, safe='')}&lang={quote(str(locale), safe='')}"
            )
    return list(dict.fromkeys(urls))


def seo_files(config: dict[str, object]) -> tuple[str, str]:
    base_url = str(config["public_site_url"])
    robots = "User-agent: *\nAllow: /\nSitemap: " + base_url + "sitemap.xml\n"
    sitemap_items = "".join(f"  <url><loc>{xml_escape(url)}</loc></url>\n" for url in sitemap_urls(config))
    sitemap = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n" + sitemap_items + "</urlset>\n"
    return robots, sitemap


def sitemap_index_file(config: dict[str, object]) -> str:
    """Return a standard index alias for clients that expect sitemap_index.xml."""

    sitemap_url = xml_escape(f"{config['public_site_url']}sitemap.xml")
    return (
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
        "<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n"
        f"  <sitemap><loc>{sitemap_url}</loc></sitemap>\n"
        "</sitemapindex>\n"
    )


def source_symlinks(candidates: list[Path] | None = None) -> list[str]:
    """Return symbolic links in source paths that would be copied to Pages."""
    if candidates is None:
        candidates = [*(ROOT / directory for directory in PUBLISH_DIRECTORIES), *(ROOT / filename for filename in PUBLISH_ROOT_FILES)]
    links: list[str] = []
    for candidate in candidates:
        if candidate.is_symlink():
            links.append(source_path_label(candidate, candidate.parent))
        elif candidate.is_dir():
            links.extend(
                source_path_label(path, candidate.parent)
                for path in candidate.rglob("*")
                if path.is_symlink()
            )
    return sorted(links)


def source_path_label(path: Path, fallback_root: Path) -> str:
    """Use repository labels in production and stable local labels in fixtures."""
    try:
        return path.relative_to(ROOT).as_posix()
    except ValueError:
        return path.relative_to(fallback_root).as_posix()


def artifact_secret_findings(output: Path) -> list[str]:
    """Find high-confidence credential signatures without exposing their values."""
    findings: list[str] = []
    for path in output.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in TEXT_PUBLISH_SUFFIXES:
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        for rule_id, pattern in SECRET_SIGNATURES:
            if pattern.search(text):
                findings.append(f"{rule_id}:{path.relative_to(output).as_posix()}")
    return findings


def space_readme(source: str) -> str:
    """Add the Static Space metadata without changing the project README."""
    if source.startswith("---\n"):
        return source
    return SPACE_README_FRONTMATTER + "\n" + source.lstrip()


def validate_artifact(output: Path, versions: dict[str, str] | None = None) -> None:
    expected = (
        output / "index.html",
        output / "reader.html",
        output / "visuals.html",
        output / "site" / "visual.html",
        output / ".nojekyll",
        output / "robots.txt",
        output / "sitemap.xml",
        output / SITEMAP_INDEX_FILENAME,
    )
    missing = [path.name for path in expected if not path.is_file()]
    if missing:
        raise FileNotFoundError("Pages artifact is missing: " + ", ".join(missing))

    for directory in PUBLISH_DIRECTORIES:
        if not (output / directory).is_dir():
            raise FileNotFoundError(f"Pages artifact is missing directory: {directory}")
    for filename in PUBLISH_ROOT_FILES:
        if not (output / filename).is_file():
            raise FileNotFoundError(f"Pages artifact is missing root source: {filename}")
    space_metadata = (output / "README.md").read_text(encoding="utf-8")
    if not space_metadata.startswith(SPACE_README_FRONTMATTER):
        raise ValueError("Pages artifact README.md must include Static Space metadata")
    for filename in REQUIRED_PUBLISH_FILES:
        if not (output / filename).is_file():
            raise FileNotFoundError(f"Pages artifact is missing required public asset: {filename}")

    leaked = [name for name in FORBIDDEN_NAMES if (output / name).exists()]
    if leaked:
        raise ValueError("forbidden work directories leaked into Pages artifact: " + ", ".join(leaked))

    forbidden_files = []
    for path in output.rglob("*"):
        if not path.is_file():
            continue
        name = path.name.lower()
        if name in FORBIDDEN_PUBLISH_FILENAMES or name == ".env" or name.startswith(".env.") or name.endswith(FORBIDDEN_PUBLISH_SUFFIXES):
            forbidden_files.append(path.relative_to(output).as_posix())
    if forbidden_files:
        raise ValueError("sensitive files leaked into Pages artifact: " + ", ".join(forbidden_files))

    secret_findings = artifact_secret_findings(output)
    if secret_findings:
        raise ValueError("credential signature leaked into Pages artifact: " + ", ".join(secret_findings))

    root_text = (output / "index.html").read_text(encoding="utf-8")
    config = load_seo_config()
    if '<base href="site/index.html" />' not in root_text or "window.CODEX_PAGES_ARTIFACT = true" not in root_text:
        raise ValueError("root Pages entry must point relative assets and content through site/index.html")
    if not (output / "site/search-index.js").is_file():
        raise FileNotFoundError("Pages artifact is missing site/search-index.js")
    reader_text = (output / "site/reader.html").read_text(encoding="utf-8")
    if "window.CODEX_PAGES_ARTIFACT = true" not in reader_text:
        raise ValueError("Pages Reader must retain artifact routing mode")
    reader_alias_text = (output / "reader.html").read_text(encoding="utf-8")
    if (
        '<base href="site/reader.html" />' not in reader_alias_text
        or "window.CODEX_PAGES_ARTIFACT = true" not in reader_alias_text
    ):
        raise ValueError("root Reader alias must point to site/reader.html and retain artifact routing mode")
    visuals_text = (output / "visuals.html").read_text(encoding="utf-8")
    if (
        '<base href="site/visuals.html" />' not in visuals_text
        or "window.CODEX_PAGES_ARTIFACT = true" not in visuals_text
        or f'<link rel="canonical" href="{config["public_site_url"]}visuals.html" />' not in visuals_text
    ):
        raise ValueError("Pages visual entry must retain artifact routing and canonical metadata")
    if versions:
        public_texts = {
            "index": root_text,
            "reader": reader_text,
            "reader_alias": reader_alias_text,
            "app": (output / "site/app.js").read_text(encoding="utf-8"),
            "visuals": visuals_text,
            "visual": (output / "site/visual.html").read_text(encoding="utf-8"),
        }
        for name, version in versions.items():
            expected = f"{name}?v={version}"
            if name in {"styles.css", "locale-manifest.js", "learning-path-data.js", "goal-templates.js", "traditional-chinese.js", "app.js"} and expected not in public_texts["index"]:
                raise ValueError(f"Pages artifact index is missing content version for {name}")
            if name in {"reader.css", "locale-manifest.js", "traditional-chinese.js", "reader.js"} and expected not in public_texts["reader"]:
                raise ValueError(f"Pages artifact Reader is missing content version for {name}")
            if name == "search-index.js" and expected not in public_texts["app"]:
                raise ValueError("Pages artifact search loader is missing a content version")
            if name in {"visuals.css", "visuals.js"} and expected not in public_texts["visuals"]:
                raise ValueError(f"Pages visual entry is missing content version for {name}")
            if name in {"visual-viewer.css", "visual-viewer.js"} and expected not in public_texts["visual"]:
                raise ValueError(f"Pages visual viewer is missing content version for {name}")
    home_page = config["home_page"]
    assert isinstance(home_page, dict)
    source_index = (ROOT / "site/index.html").read_text(encoding="utf-8")
    for key in ("title", "description", "og_locale"):
        if str(home_page[key]) not in source_index:
            raise ValueError(f"site/index.html {key} must match site/seo-config.json home_page")
    source_structured_data = re.search(r'<script type="application/ld\+json" id="site-structured-data">(.*?)</script>', source_index)
    if not source_structured_data:
        raise ValueError("site/index.html is missing site structured data")
    source_structured_value = json.loads(source_structured_data.group(1))
    expected_site_languages = ["en", *(config["static_locale_pages"][locale]["html_lang"] for locale in config["locales"] if locale != "en")]
    if (
        source_structured_value.get("url") != config["public_site_url"]
        or source_structured_value.get("name") != config["site_name"]
        or source_structured_value.get("alternateName") != config["alternate_name"]
        or source_structured_value.get("inLanguage") != expected_site_languages
        or source_structured_value.get("description") != home_page["description"]
    ):
        raise ValueError("site/index.html structured data must match site/seo-config.json home_page")
    for locale in config["locales"]:
        if locale == "en":
            continue
        page = output / f"{locale}.html"
        if not page.is_file():
            raise FileNotFoundError(f"Pages artifact is missing localized SEO entry: {page.name}")
        text = page.read_text(encoding="utf-8")
        expected_url = f"{config['public_site_url']}{locale}.html"
        hreflang = config["static_locale_pages"][locale]["html_lang"]
        metadata = config["static_locale_pages"][locale]
        assert isinstance(metadata, dict)
        if (
            expected_url not in text
            or f'<html lang="{hreflang}" data-prysai-static-locale="{locale}">' not in text
            or f'window.PRYSAI_STATIC_LOCALE = "{locale}"' not in text
            or f'<meta property="og:locale" content="{metadata["og_locale"]}" />' not in text
        ):
            raise ValueError(f"Pages artifact localized SEO entry is incomplete: {page.name}")
        structured_data = re.search(r'<script type="application/ld\+json" id="site-structured-data">(.*?)</script>', text)
        if not structured_data:
            raise ValueError(f"Pages artifact localized SEO structured data is missing: {page.name}")
        value = json.loads(structured_data.group(1))
        if (
            value.get("url") != expected_url
            or value.get("name") != config["site_name"]
            or value.get("alternateName") != config["alternate_name"]
            or value.get("inLanguage") != hreflang
            or value.get("description") != metadata["description"]
        ):
            raise ValueError(f"Pages artifact localized SEO structured data is incorrect: {page.name}")
    robots, sitemap = seo_files(config)
    if (output / "robots.txt").read_text(encoding="utf-8") != robots:
        raise ValueError("Pages artifact robots.txt must be generated from site/seo-config.json")
    if (output / "sitemap.xml").read_text(encoding="utf-8") != sitemap:
        raise ValueError("Pages artifact sitemap.xml must be generated from site/seo-config.json")
    if (output / SITEMAP_INDEX_FILENAME).read_text(encoding="utf-8") != sitemap_index_file(config):
        raise ValueError(f"Pages artifact {SITEMAP_INDEX_FILENAME} must point to the canonical sitemap")

    integrity_findings = artifact_findings(output)
    if integrity_findings:
        raise ValueError("Pages artifact route integrity failed: " + "; ".join(integrity_findings))


def build_into(output: Path) -> None:
    """Copy and validate one staging artifact without replacing an existing one."""
    output.mkdir(parents=True)
    for directory in PUBLISH_DIRECTORIES:
        shutil.copytree(ROOT / directory, output / directory)
    for filename in PUBLISH_ROOT_FILES:
        source = (ROOT / filename).read_text(encoding="utf-8")
        if filename == "README.md":
            source = space_readme(source)
        (output / filename).write_text(source, encoding="utf-8", newline="\n")

    versions = asset_versions()
    source_index = ROOT / "site/index.html"
    root_entry = versioned_asset_references(root_index(source_index), versions)
    (output / "index.html").write_text(root_entry, encoding="utf-8", newline="\n")
    seo_config = load_seo_config()
    visuals_entry = versioned_asset_references(
        pages_visuals(ROOT / "site/visuals.html", str(seo_config["public_site_url"])),
        versions,
    )
    (output / "visuals.html").write_text(visuals_entry, encoding="utf-8", newline="\n")
    for locale in seo_config["locales"]:
        if locale != "en":
            page = static_locale_page(source_index, seo_config, locale)
            (output / f"{locale}.html").write_text(versioned_asset_references(page, versions), encoding="utf-8", newline="\n")
    reader_entry = versioned_asset_references(pages_reader(ROOT / "site/reader.html"), versions)
    (output / "site/reader.html").write_text(reader_entry, encoding="utf-8", newline="\n")
    visual_entry = versioned_asset_references((ROOT / "site/visual.html").read_text(encoding="utf-8"), versions)
    (output / "site/visual.html").write_text(visual_entry, encoding="utf-8", newline="\n")
    reader_alias = versioned_asset_references(pages_reader_alias(ROOT / "site/reader.html"), versions)
    (output / "reader.html").write_text(reader_alias, encoding="utf-8", newline="\n")
    app_path = output / "site/app.js"
    app_path.write_text(versioned_asset_references(app_path.read_text(encoding="utf-8"), versions), encoding="utf-8", newline="\n")
    (output / ".nojekyll").write_text("", encoding="utf-8")
    robots, sitemap = seo_files(seo_config)
    (output / "robots.txt").write_text(robots, encoding="utf-8", newline="\n")
    (output / "sitemap.xml").write_text(sitemap, encoding="utf-8", newline="\n")
    (output / SITEMAP_INDEX_FILENAME).write_text(sitemap_index_file(seo_config), encoding="utf-8", newline="\n")
    validate_artifact(output, versions)


def build(output: Path) -> None:
    validate_source()
    links = source_symlinks()
    if links:
        raise ValueError("symbolic links are not allowed in Pages sources: " + ", ".join(links))
    output = output.resolve()
    allowed_in_repo = ROOT / "_site"
    if output == ROOT or (ROOT in output.parents and output != allowed_in_repo):
        raise ValueError(f"refusing to build Pages artifact at an unapproved repository path: {output}")
    output.parent.mkdir(parents=True, exist_ok=True)
    with TemporaryDirectory(prefix=f".{output.name}-build-", dir=output.parent) as temporary:
        staged = Path(temporary) / "artifact"
        build_into(staged)
        backup = output.parent / f".{output.name}-previous"
        if backup.exists():
            shutil.rmtree(backup)
        if output.exists():
            output.replace(backup)
        try:
            shutil.move(str(staged), str(output))
        except OSError:
            if backup.exists() and not output.exists():
                backup.replace(output)
            raise
        else:
            if backup.exists():
                shutil.rmtree(backup)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, help="artifact directory to create")
    parser.add_argument(
        "--check",
        action="store_true",
        help="build and validate an isolated temporary artifact without keeping it",
    )
    args = parser.parse_args()

    if not args.output and not args.check:
        parser.error("provide --output or use --check")
    if args.output and args.check:
        parser.error("--output and --check cannot be combined")

    try:
        if args.check:
            with TemporaryDirectory(prefix="codex-pages-") as temporary:
                build(Path(temporary) / "artifact")
            print("PAGES_ARTIFACT_OK mode=temporary")
        else:
            build(args.output)
            print(f"PAGES_ARTIFACT_OK output={args.output.resolve()}")
    except (FileNotFoundError, OSError, ValueError, UnicodeError) as exc:
        print("PAGES_ARTIFACT_FAILED")
        print(f"- {exc}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
