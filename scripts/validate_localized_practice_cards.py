"""Check the minimum reader contract for localized beginner practice cards.

This is a structural coverage gate. It confirms that every non-English starter
pack exposes the same seven immediately usable card slots, a short practice
receipt, and explicit non-action / evidence limits. It cannot assess language
quality, cultural fit, model behavior, or learner outcomes.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LOCALES = ("ZH", "ES", "JA", "KO", "DE")
CARD_RE = re.compile(r"^###\s+([1-7])\.\s+.+$", re.MULTILINE)

# Keep this deliberately small and outcome-oriented.  The localized prose is
# allowed to evolve; these are the reader safeguards every starter pack must
# retain.
REQUIRED_MARKERS = {
    "ZH": ("状态：template_selected | practised | not_run | blocked", "不要发送、上传或生成链接"),
    "ES": ("estado: template_selected | practised | not_run | blocked", "No envíes, subas ni crees enlaces"),
    "JA": ("状態：template_selected | practised | not_run | blocked", "送信、アップロード、リンク作成はしないでください"),
    "KO": ("상태: template_selected | practised | not_run | blocked", "보내거나 업로드하거나 링크를 만들지 마세요"),
    "DE": ("Status: template_selected | practised | not_run | blocked", "Sende nichts, lade nichts hoch und erstelle keinen Link"),
}

# A localized starter pack may offer a foreign-language exercise, but it must
# never make that exercise look like a broken locale path.  Readers need to
# see, before the first card, that this is a multi-purpose pack and that the
# surrounding explanation remains in their selected language.
ROUTE_CONTEXT_MARKERS = {
    "ZH": (
        "通用 LLM 新手提示卡：语言、工作与研究",
        "你现在处于中文说明路径",
        "A. 语言练习",
        "B. 工作表达与判断",
        "C. 研究与分享前核查",
    ),
    "ES": (
        "Tarjetas iniciales para LLM: idioma, trabajo e investigación",
        "Estás en la ruta explicada en español",
        "A. Práctica de idioma",
        "B. Expresión y decisiones de trabajo",
        "C. Investigación y revisión antes de compartir",
    ),
    "JA": (
        "LLM 初心者カード：言語・仕事・調査",
        "ここは日本語で説明する学習ルートです",
        "A. 言語練習",
        "B. 仕事の表現と判断",
        "C. 調査と共有前の確認",
    ),
    "KO": (
        "LLM 초보자 카드: 언어, 업무, 리서치",
        "지금 보고 있는 것은 한국어 설명 경로입니다",
        "A. 언어 연습",
        "B. 업무 표현과 판단",
        "C. 리서치와 공유 전 확인",
    ),
    "DE": (
        "LLM-Einstiegskarten: Sprache, Arbeit und Recherche",
        "Du befindest dich auf dem deutsch erklärten Lernpfad",
        "A. Sprachübung",
        "B. Ausdruck und Entscheidungen bei der Arbeit",
        "C. Recherche und Prüfung vor dem Teilen",
    ),
}


def main() -> int:
    errors: list[str] = []
    for locale in LOCALES:
        path = ROOT / f"book/communication-clinic-{locale}.md"
        if not path.is_file():
            errors.append(f"missing localized starter pack: {path.relative_to(ROOT)}")
            continue
        text = path.read_text(encoding="utf-8")
        numbers = [int(match.group(1)) for match in CARD_RE.finditer(text)]
        if numbers != list(range(1, 8)):
            errors.append(f"{path.relative_to(ROOT)}: expected exactly cards 1 through 7, got {numbers}")
        for marker in REQUIRED_MARKERS[locale]:
            if marker not in text:
                errors.append(f"{path.relative_to(ROOT)}: missing required reader boundary {marker!r}")
        for marker_index, marker in enumerate(ROUTE_CONTEXT_MARKERS[locale], start=1):
            if marker not in text:
                errors.append(
                    f"{path.relative_to(ROOT)}: missing route-context marker #{marker_index}"
                )
        if "not_run" not in text:
            errors.append(f"{path.relative_to(ROOT)}: missing not_run evidence boundary")

    if errors:
        print("LOCALIZED_PRACTICE_CARDS_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print("LOCALIZED_PRACTICE_CARDS_OK")
    print("locales=ZH,ES,JA,KO,DE cards_per_locale=7")
    print("evidence_boundary=structural-coverage-not-language-quality-or-learning-proof")
    return 0


if __name__ == "__main__":
    sys.exit(main())
