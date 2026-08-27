"""Build the dependency-free search index consumed by the public site."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_FILE = ROOT / "site/search-index.js"
LOCALES = ("en", "zh", "es", "ja", "ko", "de", "zh-tw", "fr")
# The Reader deliberately renders candidate and in-progress translations while
# disclosing their review state. Search must follow that same availability rule:
# otherwise a Chinese search can point to English even when the Reader can
# already present the declared Chinese candidate file.
READY_TRANSLATIONS = {"source", "candidate", "in-progress", "verified", "production-ready"}
MAX_SEARCH_CHARS = 9000
MAX_SNIPPET_CHARS = 260


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def normalize_text(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip().lower()


def strip_markdown(value: str) -> str:
    text = re.sub(r"```[\s\S]*?```", " ", value)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = re.sub(r"!\[([^\]]*)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"<https?://[^>]+>", " ", text)
    text = re.sub(r"https?://\S+", " ", text)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"[*_~]", "", text)
    text = re.sub(r"^\s{0,3}#{1,6}\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\s*(?:[-*+] |\d+[.)] )", "", text, flags=re.MULTILINE)
    return text


def source_body(raw: str) -> str:
    text = raw.lstrip("\ufeff")
    text = re.sub(r"^(?:\s*<!--.*?-->\s*)+", "", text, flags=re.DOTALL)
    front_matter = re.match(r"(?s)^(?P<h1># [^\n]+\n\s*)?---\n.*?\n---\n", text)
    if front_matter:
        text = f"{front_matter.group('h1') or ''}{text[front_matter.end():]}"
    return text.lstrip()


def title_and_text(raw: str, canonical_title: str) -> tuple[str, str, str]:
    body = source_body(raw)
    heading = re.search(r"(?m)^#\s+(.+?)\s*#*\s*$", body)
    source_title = strip_markdown(heading.group(1)).strip() if heading else ""
    # Chapters use the curated navigation title. Other pages should still have
    # a human-readable heading in the reader and search results rather than an
    # internal content identifier such as "lab-001-first-safe-task".
    title = canonical_title or source_title
    text = strip_markdown(body)
    text = normalize_text(text)
    if title:
        text = normalize_text(f"{title} {text}")
    return title, text[:MAX_SEARCH_CHARS], text[:MAX_SNIPPET_CHARS]


def route_for_part(part: str | None) -> str | None:
    return {"part-1": "A", "part-2": "B", "part-3": "C", "part-4": "D"}.get(part or "")


def item_number(content_id: str, kind: str) -> int | None:
    if kind == "chapter" or kind == "lab":
        match = re.search(r"(?:chapter|lab)-(?:(\d+))", content_id)
        return int(match.group(1)) if match else None
    return None


def canonical_title_for_locale(chapter: dict[str, Any], locale: str) -> str:
    """Return the chapter title owned by the requested locale.

    The navigation manifest stores one canonical title per locale.  Search
    must not collapse every non-English result onto the Chinese title merely
    because Chinese was historically the first migrated locale.
    """

    value = chapter.get(f"canonical_title_{locale}")
    return value if isinstance(value, str) else ""


def add_catalog_search_targets(manifest: dict[str, Any], documents: list[dict[str, Any]]) -> None:
    """Project a small, source-governed section target into the document index.

    A document result remains useful for broad discovery. A target exists only
    where the catalog names one intentional learner destination, so a broad
    word elsewhere cannot accidentally redirect a reader to an unrelated
    heading. Targets inherit a real Reader path and locale record rather than
    creating a second content source.
    """
    catalog = load_json(ROOT / "site" / "content-catalog.json")
    guides = catalog.get("supplemental_guides", {})
    if not isinstance(guides, dict):
        raise ValueError("site/content-catalog.json supplemental_guides must be an object")

    source_order = {document["content_id"]: document["order"] for document in documents}
    for content_id, guide in guides.items():
        if not isinstance(guide, dict):
            raise ValueError(f"search-target guide {content_id} must be an object")
        targets = guide.get("search_targets", [])
        if targets is None:
            continue
        if not isinstance(targets, list):
            raise ValueError(f"search_targets for {content_id} must be a list")
        if not targets:
            continue

        content = manifest["contents"].get(content_id)
        if not isinstance(content, dict) or content_id not in source_order:
            raise ValueError(f"search target {content_id} must name a routed source document")
        for offset, target in enumerate(targets, start=1):
            if not isinstance(target, dict):
                raise ValueError(f"search target {content_id} must be an object")
            target_id = target.get("id")
            locale = target.get("locale")
            title = target.get("title")
            snippet = target.get("snippet")
            anchor = target.get("anchor")
            aliases = target.get("aliases", [])
            if not isinstance(target_id, str) or not re.fullmatch(r"[a-z0-9][a-z0-9-]{1,80}", target_id):
                raise ValueError(f"search target {content_id} has an invalid id")
            if locale not in LOCALES:
                raise ValueError(f"search target {content_id}/{target_id} has an unsupported locale")
            if not isinstance(title, str) or not title.strip() or not isinstance(snippet, str) or not snippet.strip():
                raise ValueError(f"search target {content_id}/{target_id} needs a title and snippet")
            if not isinstance(anchor, str) or not re.fullmatch(r"[a-z0-9][a-z0-9-]{1,120}", anchor):
                raise ValueError(f"search target {content_id}/{target_id} has an invalid heading anchor")
            if not isinstance(aliases, list) or any(not isinstance(alias, str) or not alias.strip() for alias in aliases):
                raise ValueError(f"search target {content_id}/{target_id} aliases must be non-empty strings")

            locale_record = content.get("locales", {}).get(locale)
            if not isinstance(locale_record, dict) or not locale_record.get("exists") or not isinstance(locale_record.get("path"), str):
                raise ValueError(f"search target {content_id}/{target_id} needs an existing {locale} source")
            path = locale_record["path"]
            if not (ROOT / path).is_file():
                raise ValueError(f"search target {content_id}/{target_id} source is missing: {path}")
            body = (ROOT / path).read_text(encoding="utf-8")
            if not re.search(rf'<span\s+id="{re.escape(anchor)}"></span>', body) and not re.search(rf"(?m)^##+\s+.*?\{{#{re.escape(anchor)}\}}\s*$", body):
                # Reader generates conventional heading IDs. Require the
                # declared slug to match its source heading, without relying
                # on an invisible hand-maintained fragment map.
                heading_slugs = {
                    re.sub(r"[^a-z0-9]+", "-", normalize_text(match.group(1))).strip("-")
                    for match in re.finditer(r"(?m)^##+\s+(.+?)\s*$", body)
                }
                if anchor not in heading_slugs:
                    raise ValueError(f"search target {content_id}/{target_id} anchor is not a source heading: {anchor}")

            localized = {
                locale: {
                    "path": f"{path}#{anchor}",
                    "exists": True,
                    "ready": locale_record.get("translation_status") in READY_TRANSLATIONS,
                    "title": title.strip(),
                    "snippet": snippet.strip(),
                    "content_status": locale_record.get("content_status"),
                    "translation_status": locale_record.get("translation_status"),
                }
            }
            documents.append(
                {
                    "content_id": f"{content_id}--{target_id}",
                    "kind": "document",
                    "number": None,
                    "route": None,
                    "order": source_order[content_id] + (offset / 100),
                    "status": locale_record.get("content_status"),
                    "available_locales": [locale],
                    "locales": localized,
                    "search": {locale: normalize_text(" ".join([title, snippet, *aliases]))},
                    # Keep the catalog's short learner-facing labels separate
                    # from the body search text.  The UI gives an exact or
                    # partial alias match a deliberate ranking boost, so a
                    # query such as "Spanish practice" reaches the declared
                    # card anchor before the broader source document.
                    "search_aliases": {locale: normalize_text(" ".join(aliases))},
                }
            )


def build_index() -> dict[str, Any]:
    sys.path.insert(0, str(ROOT / "scripts"))
    import build_site_locale_manifest  # pylint: disable=import-outside-toplevel

    manifest = build_site_locale_manifest.build_manifest()
    chapters = {
        item["content_id"]: item
        for item in manifest["book_navigation"].get("chapters", [])
        if item.get("content_id")
    }
    documents: list[dict[str, Any]] = []

    for order, (content_id, content) in enumerate(manifest["contents"].items()):
        kind = content.get("kind", "document")
        chapter = chapters.get(content_id, {})
        localized: dict[str, Any] = {}
        searchable: dict[str, str] = {}
        available: list[str] = []
        for locale in LOCALES:
            record = content.get("locales", {}).get(locale)
            if not record or not record.get("exists"):
                continue
            path = ROOT / record["path"]
            canonical_title = canonical_title_for_locale(chapter, locale)
            title, search_text, snippet = title_and_text(
                path.read_text(encoding="utf-8"),
                canonical_title or "",
            )
            ready = record.get("translation_status") in READY_TRANSLATIONS
            available.append(locale)
            localized[locale] = {
                "path": record["path"],
                "exists": True,
                "ready": ready,
                "title": title,
                "snippet": snippet,
                "content_status": record.get("content_status"),
                "translation_status": record.get("translation_status"),
            }
            # Search can use an existing source even while its translation is
            # still under review. The UI selects ready content for display and
            # labels its candidate status; hiding an existing source would make
            # the migration state impossible to discover.
            searchable[locale] = search_text

        if not localized:
            continue
        search_aliases: dict[str, str] = {}
        if kind == "chapter":
            chinese_titles = [
                chapter.get("canonical_title_zh", ""),
                chapter.get("title_zh", ""),
            ]
            if chapter.get("number"):
                chinese_titles.append(f"第{chapter['number']}章")
            search_aliases["zh"] = normalize_text(" ".join(filter(None, chinese_titles)))
        documents.append(
            {
                "content_id": content_id,
                "kind": kind,
                "number": chapter.get("number") or item_number(content_id, kind),
                "route": route_for_part(chapter.get("part")),
                "order": order,
                "status": chapter.get("status") or next(
                    (
                        item.get("content_status")
                        for item in localized.values()
                        if item.get("content_status")
                    ),
                    None,
                ),
                "available_locales": available,
                "locales": localized,
                "search": searchable,
                "search_aliases": search_aliases,
            }
        )

    add_catalog_search_targets(manifest, documents)

    return {
        "schema_version": "1",
        "default_locale": "en",
        "locales": list(LOCALES),
        "document_count": len(documents),
        "source": [
            "docs/governance/content-status.yaml",
            "docs/governance/locale-matrix.yaml",
            "docs/governance/book-navigation.yaml",
            "book/title-map.json",
            "book/chapters",
            "book/labs",
            "book/README*.md",
            "site/content-catalog.json",
        ],
        "documents": documents,
    }


def render(index: dict[str, Any]) -> str:
    body = json.dumps(index, ensure_ascii=False, indent=2)
    return "/* Generated by scripts/build_site_search_index.py. Do not edit by hand. */\n" f"window.CODEX_SEARCH_INDEX = {body};\n"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="verify the generated file without writing it")
    args = parser.parse_args()
    try:
        expected = render(build_index())
    except (OSError, UnicodeError, KeyError, TypeError, ValueError, json.JSONDecodeError) as exc:
        print("SITE_SEARCH_INDEX_FAILED")
        print(f"- {exc}")
        return 1

    if args.check:
        if not OUTPUT_FILE.is_file() or OUTPUT_FILE.read_text(encoding="utf-8") != expected:
            print("SITE_SEARCH_INDEX_FAILED")
            print(f"- generated output is stale or missing: {OUTPUT_FILE.relative_to(ROOT)}")
            print("- run: python scripts/build_site_search_index.py")
            return 1
        print(f"SITE_SEARCH_INDEX_OK documents={build_index()['document_count']}")
        return 0

    OUTPUT_FILE.write_text(expected, encoding="utf-8", newline="\n")
    print(f"SITE_SEARCH_INDEX_BUILT output={OUTPUT_FILE.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
