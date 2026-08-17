"""Validate the public page's language contract and translation coverage."""

from __future__ import annotations

import re
import sys
import json
from pathlib import Path


# A localized validation error must remain readable on Windows consoles that
# still default to a legacy code page; contributors should see the failed
# locale label rather than a secondary UnicodeEncodeError.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="backslashreplace")


ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "site/index.html"
APP = ROOT / "site/app.js"
GENERATED = ROOT / "site/learning-path-data.js"
LOCALE_MANIFEST = ROOT / "site/locale-manifest.js"
LOCALE_TOKENS = {"en", "zh", "es", "ja", "ko", "de"}
STATUS = ROOT / "docs/governance/content-status.yaml"
PUBLIC_COURSE_COVERAGE_TABLES = {
    ROOT / "README-EN.md": {
        "English": "en",
        "Simplified Chinese": "zh",
        "Spanish": "es",
        "Japanese": "ja",
        "Korean": "ko",
        "German": "de",
    },
    ROOT / "README-ZH.md": {
        "English": "en",
        "简体中文": "zh",
        "Español": "es",
        "日本語": "ja",
        "한국어": "ko",
        "Deutsch": "de",
    },
}


def keys_for(block: str, expected: set[str]) -> set[str]:
    """Find expected object keys without mistaking colons in copy for keys."""
    return {
        key
        for key in expected
        if re.search(
            rf"(?:^|,)\s*(?:['\"]{re.escape(key)}['\"]|{re.escape(key)})\s*:",
            block,
            re.MULTILINE,
        )
    }


def translation_keys(app: str, language: str, html_keys: set[str]) -> set[str]:
    """Collect keys from the primary dictionary and additive translation blocks."""
    blocks: list[str] = []
    if language == "en":
        match = re.search(r"\n  en: \{(?P<body>.*?)\n  \},\n  zh: \{", app, re.DOTALL)
    elif language == "zh":
        match = re.search(r"\n  zh: \{(?P<body>.*?)\n  \}\n\};", app, re.DOTALL)
    else:
        match = re.search(
            rf"\ncopy\.{re.escape(language)}\s*=\s*\{{(?P<body>.*?)\n\}};",
            app,
            re.DOTALL,
        )
    if match:
        blocks.append(match.group("body"))
    blocks.extend(
        re.findall(
            rf"Object\.assign\(copy\.{language}, \{{(?P<body>.*?)\}}\);",
            app,
            re.DOTALL,
        )
    )
    return set().union(*(keys_for(block, html_keys) for block in blocks)) if blocks else set()


def validate_copy_initialization_order(app: str, errors: list[str]) -> None:
    """Reject locale overrides that execute before their primary dictionaries exist."""

    for language in sorted(LOCALE_TOKENS - {"en", "zh"}):
        primary = re.search(rf"\ncopy\.{language}\s*=\s*\{{", app)
        if not primary:
            errors.append(f"{language} primary translation dictionary is missing")
            continue
        early_override = re.search(rf"Object\.assign\(copy\.{language},", app[: primary.start()])
        if early_override:
            errors.append(f"{language} translation override appears before its primary dictionary")


def load_generated_manifest() -> dict:
    text = LOCALE_MANIFEST.read_text(encoding="utf-8")
    marker = "window.CODEX_LOCALE_MANIFEST ="
    if marker not in text:
        raise ValueError("manifest assignment marker is missing")
    payload = text.split(marker, 1)[1].strip().rstrip(";")
    value = json.loads(payload)
    if not isinstance(value, dict):
        raise ValueError("manifest payload must be an object")
    return value


def local_target_from_href(href: str) -> str | None:
    target = href.split("#", 1)[0].split("?", 1)[0]
    if not target.startswith("../"):
        return None
    return target[3:]


def validate_skill_count_copy(surface_copy: str, skill_count: int, errors: list[str]) -> None:
    """Reject site copy whose visible Skill inventory drifts from current status."""

    # `site/app.js` retains earlier catalogue assignments for incremental locale
    # composition. The final inventory override is the reader-facing value;
    # inspect that effective declaration rather than treating superseded source
    # literals as visible copy.
    effective_marker = "// Keep the reader-facing inventory synchronized with the registered Skill"
    if effective_marker in surface_copy:
        surface_copy = surface_copy.split(effective_marker, 1)[1]

    patterns = (
        r"\b(\d+)\s+(?:project|reusable)\s+Skills\b",
        r"\bSkills\s+·\s+(\d+)\b",
        r"\ball\s+(\d+)\s+methods\b",
        r"\b(\d+)\s+个(?:项目|可复用)\s+Skill\b",
        r"\bSkill\s+·\s+(\d+)\b",
    )
    declared = [
        int(match.group(1))
        for pattern in patterns
        for match in re.finditer(pattern, surface_copy)
    ]
    if not declared:
        errors.append("site Skill inventory copy is missing")
        return
    mismatches = sorted({count for count in declared if count != skill_count})
    if mismatches:
        errors.append(
            "site Skill inventory copy must match content-status skills.count "
            f"{skill_count}; found {', '.join(str(count) for count in mismatches)}"
        )


def validate_localization_coverage(manifest: dict, errors: list[str]) -> None:
    """Keep registered locale names separate from actual course availability."""

    coverage = manifest.get("localization_coverage")
    expected_total = sum(manifest.get("routed_status_counts", {}).values())
    if not isinstance(coverage, dict) or set(coverage) != LOCALE_TOKENS:
        errors.append("locale manifest must expose coverage for every registered locale")
        return
    for locale in sorted(LOCALE_TOKENS):
        record = coverage.get(locale)
        if not isinstance(record, dict):
            errors.append(f"locale coverage must be an object: {locale}")
            continue
        total = record.get("total_units")
        available = record.get("available_units")
        counts = [record.get(key) for key in ("source_units", "candidate_translation_units", "reviewed_translation_units")]
        if not isinstance(total, int) or total != expected_total:
            errors.append(f"locale coverage total must equal the chapter/Lab route total for {locale}")
        if not isinstance(available, int) or not isinstance(total, int) or not 0 <= available <= total:
            errors.append(f"locale coverage availability is invalid for {locale}")
        if not all(isinstance(value, int) and value >= 0 for value in counts):
            errors.append(f"locale coverage status counts are invalid for {locale}")
        elif isinstance(available, int) and sum(counts) != available:
            errors.append(f"locale coverage status counts must add up for {locale}")
    english = coverage.get("en", {}) if isinstance(coverage, dict) else {}
    if english.get("available_units") != expected_total or english.get("source_units") != expected_total:
        errors.append("English must expose every canonical course unit as source content")


def validate_public_coverage_table(
    text: str,
    labels: dict[str, str],
    coverage: dict,
    surface: str,
    errors: list[str],
) -> None:
    """Reject README coverage claims that drift from the generated route reality.

    The locale manifest is the reader's generated view of files that actually
    exist. README tables are hand-authored product copy, so check them
    separately: a locale picker must not imply more readable course material
    than the manifest can route to.
    """

    for label, locale in labels.items():
        matches = re.findall(
            rf"(?m)^\|\s*{re.escape(label)}\s*\|\s*(\d+)\s*/\s*(\d+)\s*\|",
            text,
        )
        if len(matches) != 1:
            errors.append(f"{surface} must declare exactly one course-coverage row for {label}")
            continue
        declared_available, declared_total = (int(value) for value in matches[0])
        record = coverage.get(locale)
        if not isinstance(record, dict):
            errors.append(f"{surface} coverage cannot resolve locale {locale} for {label}")
            continue
        expected_available = record.get("available_units")
        expected_total = record.get("total_units")
        if (declared_available, declared_total) != (expected_available, expected_total):
            errors.append(
                f"{surface} course coverage for {label} must match locale manifest: "
                f"expected {expected_available} / {expected_total}, found "
                f"{declared_available} / {declared_total}"
            )


def validate_public_coverage_tables(manifest: dict, errors: list[str]) -> None:
    coverage = manifest.get("localization_coverage")
    if not isinstance(coverage, dict):
        return
    for path, labels in PUBLIC_COURSE_COVERAGE_TABLES.items():
        try:
            text = path.read_text(encoding="utf-8")
        except (OSError, UnicodeError) as exc:
            errors.append(f"cannot read public coverage table {path.relative_to(ROOT)}: {exc}")
            continue
        validate_public_coverage_table(text, labels, coverage, path.relative_to(ROOT).as_posix(), errors)


def main() -> int:
    errors: list[str] = []
    manifest: dict = {}
    html = HTML.read_text(encoding="utf-8")
    app = APP.read_text(encoding="utf-8")
    try:
        status = json.loads(STATUS.read_text(encoding="utf-8"))
        skill_count = status["skills"]["count"]
        if not isinstance(skill_count, int) or skill_count <= 0:
            raise ValueError("skills.count must be a positive integer")
    except (OSError, UnicodeError, json.JSONDecodeError, KeyError, TypeError, ValueError) as exc:
        skill_count = None
        errors.append(f"content status cannot provide the current Skill count: {exc}")
    if skill_count is not None:
        validate_skill_count_copy(f"{html}\n{app}", skill_count, errors)
    if not GENERATED.is_file():
        errors.append("generated learning-path data is missing; run scripts/build_learning_path_site.py")
    elif "Generated by scripts/build_learning_path_site.py" not in GENERATED.read_text(encoding="utf-8"):
        errors.append("generated learning-path data must carry its generator marker")
    if not LOCALE_MANIFEST.is_file():
        errors.append("generated locale manifest is missing; run scripts/build_site_locale_manifest.py")
    else:
        manifest_text = LOCALE_MANIFEST.read_text(encoding="utf-8")
        if "Generated by scripts/build_site_locale_manifest.py" not in manifest_text:
            errors.append("generated locale manifest must carry its generator marker")
        manifest_tokens = set(re.findall(r'"([a-z]{2})": \{\n\s+"suffix": "(?:EN|ZH|ES|JA|KO|DE)"', manifest_text))
        if manifest_tokens != LOCALE_TOKENS:
            errors.append(f"locale manifest must contain exactly: {', '.join(sorted(LOCALE_TOKENS))}")
        for source in ("docs/governance/locale-matrix.yaml", "docs/governance/content-status.yaml"):
            if source not in manifest_text:
                errors.append(f"locale manifest source is missing: {source}")
        try:
            manifest = load_generated_manifest()
        except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
            manifest = {}
            errors.append(f"locale manifest cannot be parsed: {exc}")
        if manifest:
            if set(manifest.get("locales", {})) != LOCALE_TOKENS:
                errors.append("locale manifest locale records do not match the six registered tokens")
            counts = manifest.get("routed_status_counts")
            if counts != {"chapters": 22, "labs": 18}:
                errors.append("locale manifest must cover 22 chapters and 18 labs from content-status")
            validate_localization_coverage(manifest, errors)
            validate_public_coverage_tables(manifest, errors)
            aliases = manifest.get("aliases", {})
            for section, prefix in (("chapters", "chapter-"), ("labs", "lab-")):
                try:
                    status = json.loads(STATUS.read_text(encoding="utf-8"))
                    expected_ids = {
                        item["id"]
                        for item in status[section]["items"]
                        if isinstance(item, dict) and isinstance(item.get("id"), str)
                    }
                except (OSError, UnicodeError, json.JSONDecodeError, KeyError, TypeError):
                    expected_ids = set()
                missing = sorted(item_id for item_id in expected_ids if item_id.startswith(prefix) and item_id not in aliases)
                if missing:
                    errors.append(f"locale manifest is missing {section} aliases: {', '.join(missing)}")

    if not re.search(r"<html\s+lang=\"en\"", html):
        errors.append("site/index.html must default to lang=\"en\"")
    if "data-language-toggle" not in html:
        errors.append("language toggle is missing")
    menu_tokens = set(re.findall(r'data-language-option="([a-z]{2})"', html))
    if menu_tokens != LOCALE_TOKENS:
        errors.append(f"language menu must expose exactly: {', '.join(sorted(LOCALE_TOKENS))}")
    if "data-locale-banner" not in html or "data-locale-banner-text" not in html:
        errors.append("visible locale fallback banner is missing")
    first_turn_contract_fields = (
        "promptContractOutcomeLabel",
        "promptContractContextLabel",
        "promptContractResponseLabel",
        "promptContractLimitsLabel",
        "promptContractCheckLabel",
        "promptContractStopLabel",
    )
    missing_first_turn_fields = [
        key for key in first_turn_contract_fields if f'data-i18n="{key}"' not in html
    ]
    if missing_first_turn_fields:
        errors.append(
            "homepage first-turn contract is missing visible fields: "
            + ", ".join(missing_first_turn_fields)
        )
    if "URLSearchParams" not in app or "get('lang')" not in app or "searchParams.set('lang'" not in app:
        errors.append("language state must support a shareable lang parameter")
    if "localStorage" in app:
        errors.append("language state must not let browser storage override a shared locale URL")
    if "document.documentElement.lang" not in app:
        errors.append("language switching must update document.documentElement.lang")
    validate_copy_initialization_order(app, errors)
    if "const localeCanRender" not in app:
        errors.append("candidate translation routes must be renderable without being marked reviewed")
    for marker in ("CODEX_LOCALE_MANIFEST", "contentFor", "localizedContentHref", "data-locale-fallback", "localeCoverageLabel", "translated units"):
        if marker not in app:
            errors.append(f"locale-aware link routing marker is missing: {marker}")

    html_keys = set(re.findall(r'data-i18n="([^"]+)"', html))
    for attribute_value in re.findall(r'data-i18n-attr="([^"]+)"', html):
        for entry in attribute_value.split(";"):
            parts = entry.split(":", 1)
            if len(parts) == 2:
                html_keys.add(parts[1])

    en_match = re.search(r"\n  en: \{(?P<body>.*?)\n  \},\n  zh: \{", app, re.DOTALL)
    zh_match = re.search(r"\n  zh: \{(?P<body>.*?)\n  \}\n\};", app, re.DOTALL)
    if not en_match or not zh_match:
        errors.append("translation dictionary could not be located")
        english_keys = set()
        chinese_keys = set()
    else:
        english_keys = translation_keys(app, "en", html_keys)
        chinese_keys = translation_keys(app, "zh", html_keys)
        for language in sorted(LOCALE_TOKENS):
            keys = translation_keys(app, language, html_keys)
            if not keys:
                errors.append(f"{language} translation dictionary is empty or malformed")
            for key in sorted(html_keys - keys):
                errors.append(f"{language} dictionary is missing HTML key: {key}")

    if manifest:
        path_index = manifest.get("path_index", {})
        routed_paths = {
            path
            for content in manifest.get("contents", {}).values()
            if isinstance(content, dict) and content.get("kind") in {"chapter", "lab"}
            for locale in (content.get("locales", {}) or {}).values()
            if isinstance(locale, dict) and isinstance(locale.get("path"), str)
            for path in [locale["path"]]
        }
        routed_paths.update(
            path
            for content in manifest.get("contents", {}).values()
            if isinstance(content, dict)
            for path in content.get("legacy_paths", [])
            if isinstance(path, str)
        )
        for href in re.findall(r'<a\b[^>]*\bhref="([^"]+)"', html):
            target = local_target_from_href(href)
            is_routed_reader_file = (
                target
                and (target.startswith("book/chapters/") or target.startswith("book/labs/"))
                and target.endswith(".md")
                and not Path(target).name.upper().startswith("README")
            )
            if is_routed_reader_file:
                if target not in routed_paths or path_index.get(target) is None:
                    errors.append(f"site chapter/lab link is not indexed by locale manifest: {target}")
        learning_data = GENERATED.read_text(encoding="utf-8") if GENERATED.is_file() else ""
        for item_id in re.findall(r'"id":\s*"((?:chapter|lab)-[^"]+)"', learning_data):
            if item_id not in manifest.get("aliases", {}):
                errors.append(f"learning-path item is not indexed by locale manifest: {item_id}")

    if errors:
        print("VALIDATION_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"VALIDATION_OK html_keys={len(html_keys)} translated_keys={len(english_keys)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
