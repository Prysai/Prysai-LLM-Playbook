"""Build the bounded static artifact used by GitHub Pages."""

from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
from pathlib import Path
from tempfile import TemporaryDirectory

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
    """Return a root entry that loads the source site from the artifact."""

    text = site_index.read_text(encoding="utf-8")
    marker = "<head>"
    if marker not in text:
        raise ValueError(f"{site_index.relative_to(ROOT)} is missing a <head> element")
    base = '    <base href="site/" />\n    <script>window.CODEX_PAGES_ARTIFACT = true;</script>\n'
    return text.replace(marker, f"{marker}\n{base}", 1)


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


def validate_source() -> None:
    required = (
        ROOT / "site/index.html",
        ROOT / "site/styles.css",
        ROOT / "site/app.js",
        ROOT / "site/locale-manifest.js",
        ROOT / "site/learning-path-data.js",
        ROOT / "site/search-index.js",
        ROOT / "site/reader.html",
        ROOT / "site/reader.css",
        ROOT / "site/reader.js",
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
    if locales != ["en", "zh", "es", "ja", "ko", "de"]:
        raise ValueError("site/seo-config.json locales must list the six supported locales in canonical order")
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


def seo_files(config: dict[str, object]) -> tuple[str, str]:
    base_url = str(config["public_site_url"])
    locale_urls = [base_url, *(f"{base_url}{locale}.html" for locale in config["locales"] if locale != "en")]
    robots = "User-agent: *\nAllow: /\nSitemap: " + base_url + "sitemap.xml\n"
    sitemap_items = "".join(f"  <url><loc>{url}</loc></url>\n" for url in locale_urls)
    sitemap = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n" + sitemap_items + "</urlset>\n"
    return robots, sitemap


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


def validate_artifact(output: Path) -> None:
    expected = (output / "index.html", output / ".nojekyll", output / "robots.txt", output / "sitemap.xml")
    missing = [path.name for path in expected if not path.is_file()]
    if missing:
        raise FileNotFoundError("Pages artifact is missing: " + ", ".join(missing))

    for directory in PUBLISH_DIRECTORIES:
        if not (output / directory).is_dir():
            raise FileNotFoundError(f"Pages artifact is missing directory: {directory}")
    for filename in PUBLISH_ROOT_FILES:
        if not (output / filename).is_file():
            raise FileNotFoundError(f"Pages artifact is missing root source: {filename}")
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
    if '<base href="site/" />' not in root_text or "window.CODEX_PAGES_ARTIFACT = true" not in root_text:
        raise ValueError("root Pages entry must point relative assets and content through site/")
    if not (output / "site/search-index.js").is_file():
        raise FileNotFoundError("Pages artifact is missing site/search-index.js")
    reader_text = (output / "site/reader.html").read_text(encoding="utf-8")
    if "window.CODEX_PAGES_ARTIFACT = true" not in reader_text:
        raise ValueError("Pages Reader must retain artifact routing mode")
    config = load_seo_config()
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

    integrity_findings = artifact_findings(output)
    if integrity_findings:
        raise ValueError("Pages artifact route integrity failed: " + "; ".join(integrity_findings))


def build_into(output: Path) -> None:
    """Copy and validate one staging artifact without replacing an existing one."""
    output.mkdir(parents=True)
    for directory in PUBLISH_DIRECTORIES:
        shutil.copytree(ROOT / directory, output / directory)
    for filename in PUBLISH_ROOT_FILES:
        shutil.copy2(ROOT / filename, output / filename)

    (output / "index.html").write_text(root_index(ROOT / "site/index.html"), encoding="utf-8", newline="\n")
    seo_config = load_seo_config()
    for locale in seo_config["locales"]:
        if locale != "en":
            (output / f"{locale}.html").write_text(static_locale_page(ROOT / "site/index.html", seo_config, locale), encoding="utf-8", newline="\n")
    (output / "site/reader.html").write_text(pages_reader(ROOT / "site/reader.html"), encoding="utf-8", newline="\n")
    (output / ".nojekyll").write_text("", encoding="utf-8")
    robots, sitemap = seo_files(seo_config)
    (output / "robots.txt").write_text(robots, encoding="utf-8", newline="\n")
    (output / "sitemap.xml").write_text(sitemap, encoding="utf-8", newline="\n")
    validate_artifact(output)


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
