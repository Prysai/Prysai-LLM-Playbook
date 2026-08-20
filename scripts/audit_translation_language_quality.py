"""Audit translation readability signals without pretending to perform native review.

This check is intentionally conservative. It reports structural and editorial
signals for human review; it cannot establish that a translation is native,
idiomatic, culturally appropriate, or effective for learners.
"""

from __future__ import annotations

import argparse
import json
import re
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LOCALES = ("ZH", "ZHTW", "ES", "JA", "KO", "DE")
LOCALE_NAMES = {
    "ZH": "Simplified Chinese",
    "ZHTW": "Traditional Chinese",
    "ES": "Spanish",
    "JA": "Japanese",
    "KO": "Korean",
    "DE": "German",
}
HEADER_STATUS_RE = re.compile(r"translation_status:\s*([^ |]+)")
HEADING_RE = re.compile(r"^#{1,6}\s+\S", re.MULTILINE)
CODE_RE = re.compile(r"```.*?```", re.DOTALL)
COMMENT_RE = re.compile(r"<!--.*?-->", re.DOTALL)
LINK_RE = re.compile(r"\[([^\]]+)\]\([^)]*\)")
URL_RE = re.compile(r"https?://\S+")
ASCII_WORD_RE = re.compile(r"(?<![A-Za-z])[A-Za-z]{3,}(?![A-Za-z])")
ZH_SENTENCE_RE = re.compile(r"[^。！？!?\n]+[。！？!?]?")
LATIN_ALLOWED = {
    "agent", "api", "aria", "codex", "diff", "draft", "embedding", "fail",
    "fixture", "github", "git", "html", "ide", "json", "lab", "llm", "mcp",
    "markdown", "openai", "pass", "plugin", "prompt", "rag", "readme", "skill",
    "status", "token", "transfer", "unknown", "unsure", "url", "verified", "working",
}
ZH_JARGON = {
    "宿主": "承载产品（host）",
    "回执": "可核对的记录",
    "工作面": "使用入口",
    "夹具": "固定练习材料",
    "行动者": "能执行操作的主体",
    "证据路径": "查证路径",
    "新鲜度": "是否过期",
    "token 化": "按 token 计算",
    "读回": "重新查看并核对",
    "能力链": "从看见工具到确认结果的步骤链",
    "竖向切片": "从输入到结果的一小段完整流程",
}


def clean_text(raw: str) -> str:
    text = COMMENT_RE.sub(" ", raw)
    text = CODE_RE.sub(" ", text)
    text = URL_RE.sub(" ", text)
    text = LINK_RE.sub(r"\1", text)
    return text


def header_status(raw: str) -> str:
    match = HEADER_STATUS_RE.search(raw[:1000])
    return match.group(1) if match else "missing"


def sentence_attention(text: str, locale: str) -> list[str]:
    if locale in {"ZH", "ZHTW"}:
        threshold = 82
        sentences = ZH_SENTENCE_RE.findall(text)
    else:
        threshold = 180
        sentences = re.split(r"(?<=[.!?。！？])\s+", text)
    return [" ".join(sentence.split())[:160] for sentence in sentences if len(sentence.strip()) > threshold]


def exact_source_line_count(source: str, localized: str) -> int:
    def lines(value: str) -> set[str]:
        result: set[str] = set()
        for line in clean_text(value).splitlines():
            line = " ".join(line.split())
            if len(line) >= 40 and not line.startswith("#"):
                result.add(line)
        return result

    return len(lines(source) & lines(localized))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--verbose", action="store_true", help="print every file signal")
    args = parser.parse_args()

    rows: list[dict[str, object]] = []
    for locale in LOCALES:
        for localized_path in sorted((ROOT / "book").rglob(f"*-{locale}.md")):
            source_path = localized_path.with_name(localized_path.name[: -len(f"-{locale}.md")] + "-EN.md")
            raw = localized_path.read_text(encoding="utf-8")
            text = clean_text(raw)
            ascii_words = Counter(word.lower() for word in ASCII_WORD_RE.findall(text))
            # Latin-word leakage is useful for CJK review, but would mistake
            # ordinary Spanish/German prose for untranslated content.
            unexplained_ascii = (
                sum(count for word, count in ascii_words.items() if word not in LATIN_ALLOWED)
                if locale in {"ZH", "ZHTW", "JA", "KO"}
                else 0
            )
            jargon = {term: replacement for term, replacement in ZH_JARGON.items() if term in text} if locale in {"ZH", "ZHTW"} else {}
            source_raw = source_path.read_text(encoding="utf-8") if source_path.is_file() else ""
            rows.append({
                "locale": locale,
                "file": localized_path.relative_to(ROOT).as_posix(),
                "status": header_status(raw),
                "chars": len(text),
                "headings": len(HEADING_RE.findall(raw)),
                "source_chars": len(clean_text(source_raw)) if source_raw else None,
                "exact_source_lines": exact_source_line_count(source_raw, raw) if source_raw else None,
                "unexplained_ascii_words": unexplained_ascii,
                "jargon": jargon,
                "long_sentences": sentence_attention(text, locale),
            })

    by_locale = {}
    for locale in LOCALES:
        locale_rows = [row for row in rows if row["locale"] == locale]
        by_locale[locale] = {
            "name": LOCALE_NAMES[locale],
            "files": len(locale_rows),
            "status_counts": dict(Counter(str(row["status"]) for row in locale_rows)),
            "jargon_files": sum(bool(row["jargon"]) for row in locale_rows),
            "long_sentence_files": sum(bool(row["long_sentences"]) for row in locale_rows),
            "source_overlap_files": sum(bool(row["exact_source_lines"]) for row in locale_rows),
        }

    print("TRANSLATION_LANGUAGE_AUDIT")
    print("Signals are editorial prompts only; they do not establish native-level quality or independent review.")
    print(json.dumps({"locales": by_locale, "files": len(rows)}, ensure_ascii=False, indent=2))
    if args.verbose:
        for row in rows:
            attention = []
            if row["jargon"]:
                attention.append("jargon=" + ",".join(row["jargon"].keys()))
            if row["long_sentences"]:
                attention.append(f"long_sentences={len(row['long_sentences'])}")
            if row["exact_source_lines"]:
                attention.append(f"source_overlap={row['exact_source_lines']}")
            if row["unexplained_ascii_words"]:
                attention.append(f"unexplained_ascii={row['unexplained_ascii_words']}")
            if attention:
                print(f"- {row['locale']} {row['file']} | " + " | ".join(attention))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
