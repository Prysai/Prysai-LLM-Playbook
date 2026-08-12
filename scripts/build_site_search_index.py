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
LOCALES = ("en", "zh", "es", "ja", "ko", "de")
READY_TRANSLATIONS = {"source", "verified", "production-ready"}
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
    if text.startswith("---\n"):
        _, _, remainder = text.partition("\n---\n")
        text = remainder
    text = re.sub(r"^<!--.*?-->\s*", "", text, flags=re.DOTALL)
    return text


def title_and_text(raw: str, fallback: str) -> tuple[str, str, str]:
    body = source_body(raw)
    heading = re.search(r"(?m)^#\s+(.+?)\s*#*\s*$", body)
    title = strip_markdown(heading.group(1)).strip() if heading else fallback
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
            fallback_title = chapter.get("title_en") if locale == "en" else chapter.get("title_zh")
            title, search_text, snippet = title_and_text(
                path.read_text(encoding="utf-8"),
                fallback_title or content_id,
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
            # labels an English fallback; hiding an existing source would make
            # the migration state impossible to discover.
            searchable[locale] = search_text

        if not localized:
            continue
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
            }
        )

    return {
        "schema_version": "1",
        "default_locale": "en",
        "locales": list(LOCALES),
        "document_count": len(documents),
        "source": [
            "docs/governance/content-status.yaml",
            "docs/governance/locale-matrix.yaml",
            "docs/governance/book-navigation.yaml",
            "book/chapters",
            "book/labs",
            "book/README*.md",
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
