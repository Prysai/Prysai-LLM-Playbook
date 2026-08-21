"""Generate deterministic chapter footers from the canonical book order."""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
NAV_PATH = ROOT / "docs/governance/book-navigation.yaml"
START = "<!-- chapter-navigation:start -->"
END = "<!-- chapter-navigation:end -->"
BLOCK_RE = re.compile(
    rf"{re.escape(START)}.*?{re.escape(END)}", re.DOTALL
)


def load_navigation() -> dict[str, Any]:
    try:
        document = json.loads(NAV_PATH.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        raise ValueError(f"cannot parse {NAV_PATH.relative_to(ROOT)}: {exc}") from exc
    if not isinstance(document, dict) or not isinstance(document.get("chapters"), list):
        raise ValueError("navigation source must contain a chapters list")
    return document


LOCALES = ("EN", "ZH", "ES", "JA", "KO", "DE", "ZHTW", "FR")


def path_for(item: dict[str, Any], locale: str) -> str:
    english_path = item.get("english_path")
    if locale == "EN" and english_path:
        return str(english_path)
    if english_path:
        stem = str(english_path)[: -len("-EN.md")]
        return f"{stem}-{locale}.md"
    return str(item.get("legacy_path", english_path or ""))


def title_for(item: dict[str, Any], locale: str) -> str:
    # The locale suffix is not always the same as the navigation field suffix:
    # Traditional Chinese is stored as ``zh-tw`` rather than ``zhtw``.
    field_locale = {"ZHTW": "zh-tw"}.get(locale, locale.lower())
    return str(item.get(f"title_{field_locale}") or item.get("title_en") or "")


def relative_href(source: Path, target: Path) -> str:
    return Path(os.path.relpath(target, source.parent)).as_posix()


def link_markup(
    item: dict[str, Any],
    locale: str,
    source: Path,
    direction: str,
) -> str:
    target = ROOT / path_for(item, locale)
    href = relative_href(source, target)
    number = int(item["number"])
    title = title_for(item, locale)
    pending = locale == "EN" and not item.get("english_path")
    copy = {
        "EN": {"prev": "Previous chapter", "next": "Next chapter", "prev_short": "← Previous", "next_short": "Next →", "sep": " · ", "pending": " · migration pending", "num": f"Chapter {number}"},
        "ZH": {"prev": "上一章", "next": "下一章", "prev_short": "← 上一章", "next_short": "下一章 →", "sep": " · ", "pending": " · 迁移待定", "num": f"第 {number} 章"},
        "ES": {"prev": "Capítulo anterior", "next": "Capítulo siguiente", "prev_short": "← Anterior", "next_short": "Siguiente →", "sep": " · ", "pending": " · migración pendiente", "num": f"Capítulo {number}"},
        "JA": {"prev": "前の章", "next": "次の章", "prev_short": "← 前へ", "next_short": "次へ →", "sep": " · ", "pending": " · 移行待ち", "num": f"第 {number} 章"},
        "KO": {"prev": "이전 장", "next": "다음 장", "prev_short": "← 이전", "next_short": "다음 →", "sep": " · ", "pending": " · 전환 대기 중", "num": f"{number}장"},
        "DE": {"prev": "Vorheriges Kapitel", "next": "Nächstes Kapitel", "prev_short": "← Zurück", "next_short": "Weiter →", "sep": " · ", "pending": " · Migration ausstehend", "num": f"Kapitel {number}"},
        "ZHTW": {"prev": "上一章", "next": "下一章", "prev_short": "← 上一章", "next_short": "下一章 →", "sep": " · ", "colon": "：", "after_colon": "", "pending": " · 遷移待定", "num": f"第 {number} 章"},
    }[locale]
    copy.setdefault("colon", ":")
    copy.setdefault("after_colon", " ")
    prefix = copy["prev"] if direction == "previous" else copy["next"]
    label = f"{prefix}{copy['colon']}{copy['after_colon']}{copy['num']}{copy['sep']}{title}"
    if pending:
        label += copy["pending"]
    visible_prefix = copy["prev_short"] if direction == "previous" else copy["next_short"]
    visible_title = f"{copy['num']}{copy['sep']}{title}"
    if pending:
        visible_title += copy["pending"]
    return (
        f'<a data-chapter-nav="{direction}" href="{href}" '
        f'aria-label="{label}">{visible_prefix}<br><strong>'
        f"{visible_title}</strong></a>"
    )


def build_block(index: int, entries: list[dict[str, Any]], locale: str, source: Path) -> str:
    previous = entries[index - 1] if index > 0 else None
    following = entries[index + 1] if index + 1 < len(entries) else None
    aria_labels = {
        "EN": "Chapter navigation", "ZH": "章节导航", "ES": "Navegación de capítulos",
        "JA": "章ナビゲーション", "KO": "장 내비게이션", "DE": "Kapitelnavigation", "ZHTW": "章節導覽",
    }
    aria_label = aria_labels.get(locale, "Chapter navigation")
    previous_cell = (
        f'<td align="left">{link_markup(previous, locale, source, "previous")}</td>'
        if previous else '<td align="left"></td>'
    )
    next_cell = (
        f'<td align="right">{link_markup(following, locale, source, "next")}</td>'
        if following else '<td align="right"></td>'
    )
    return "\n".join(
        [
            START,
            "<hr>",
            f'<nav class="chapter-navigation" aria-label="{aria_label}">',
            '  <table role="presentation" width="100%">',
            "    <tr>",
            f"      {previous_cell}",
            f"      {next_cell}",
            "    </tr>",
            "  </table>",
            "</nav>",
            END,
        ]
    )


def replace_block(text: str, block: str) -> str:
    if BLOCK_RE.search(text):
        return BLOCK_RE.sub(block, text, count=1)
    return text.rstrip() + "\n\n" + block + "\n"


def expected_files(document: dict[str, Any]) -> list[tuple[Path, int, str]]:
    entries = document["chapters"]
    targets: list[tuple[Path, int, str]] = []
    for index, item in enumerate(entries):
        for locale in LOCALES:
            target = ROOT / path_for(item, locale)
            if target.is_file():
                targets.append((target, index, locale))
    return targets


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="fail when generated files are stale")
    args = parser.parse_args()
    try:
        document = load_navigation()
    except ValueError as exc:
        print("BOOK_NAVIGATION_FAILED")
        print(f"- {exc}")
        return 1

    entries = document["chapters"]
    stale: list[str] = []
    changed = 0
    for target, index, locale in expected_files(document):
        if not target.is_file():
            stale.append(f"missing target: {target.relative_to(ROOT)}")
            continue
        expected = replace_block(
            target.read_text(encoding="utf-8"),
            build_block(index, entries, locale, target),
        )
        actual = target.read_text(encoding="utf-8")
        if actual != expected:
            stale.append(f"stale navigation: {target.relative_to(ROOT)}")
            if not args.check:
                target.write_text(expected, encoding="utf-8", newline="\n")
                changed += 1

    if stale and args.check:
        print("BOOK_NAVIGATION_FAILED")
        for item in stale:
            print(f"- {item}")
        return 1
    if stale and not args.check:
        print(f"BOOK_NAVIGATION_GENERATED files={changed}")
    else:
        print(f"BOOK_NAVIGATION_OK files={len(expected_files(document))}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
