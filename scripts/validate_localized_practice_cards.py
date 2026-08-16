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
        "可选应用练习：语言、工作与研究",
        "你现在处于中文说明路径",
        "如果你只是第一次来、也不打算练西班牙语：先从 B 的第 3 张开始。",
        "A. 可选外语练习",
        "B. 推荐从这里开始：工作表达与判断",
        "C. 研究与分享前核查",
    ),
    "ES": (
        "Práctica de aplicación opcional: idioma, trabajo e investigación",
        "Estás en la ruta explicada en español",
        "Si es tu primera visita y no quieres practicar español, empieza por la tarjeta 3 de B.",
        "A. Práctica opcional de idioma",
        "B. Empieza aquí: expresión y decisiones de trabajo",
        "C. Investigación y revisión antes de compartir",
    ),
    "JA": (
        "任意の応用練習：言語・仕事・調査",
        "ここは日本語で説明する学習ルートです",
        "初めてで、スペイン語を練習する目的がない場合は、B のカード 3 から始めてください。",
        "A. 任意の語学練習",
        "B. ここから始める：仕事の表現と判断",
        "C. 調査と共有前の確認",
    ),
    "KO": (
        "선택 응용 연습: 언어, 업무, 리서치",
        "지금 보고 있는 것은 한국어 설명 경로입니다",
        "처음 왔고 스페인어를 연습할 생각이 없다면 B의 3번 카드부터 시작하세요.",
        "A. 선택 외국어 연습",
        "B. 여기서 시작: 업무 표현과 판단",
        "C. 리서치와 공유 전 확인",
    ),
    "DE": (
        "Optionale Anwendungsübung: Sprache, Arbeit und Recherche",
        "Du befindest dich auf dem deutsch erklärten Lernpfad",
        "Wenn du zum ersten Mal hier bist und kein Spanisch üben möchtest, beginne mit Karte 3 in B.",
        "A. Optionale Sprachübung",
        "B. Hier beginnen: Ausdruck und Entscheidungen bei der Arbeit",
        "C. Recherche und Prüfung vor dem Teilen",
    ),
}

FOUNDATION_MARKERS = {
    "EN": ("Chapter 0](guides/llm-fundamentals-EN.md)", "they are not an introduction to what an LLM is"),
    "ZH": ("第 0 章](guides/llm-fundamentals-ZH.md)", "它们不是解释“大语言模型是什么”的入门课"),
    "ES": ("Capítulo 0](guides/llm-fundamentals-ES.md)", "no son una introducción a lo que es un LLM"),
    "JA": ("第0章](guides/llm-fundamentals-JA.md)", "LLMとは何かを説明する入門ではありません"),
    "KO": ("0장](guides/llm-fundamentals-KO.md)", "LLM이 무엇인지 설명하는 입문 과정이 아닙니다"),
    "DE": ("Kapitel 0](guides/llm-fundamentals-DE.md)", "sie führen nicht in die Frage ein, was ein LLM ist"),
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
        for marker in FOUNDATION_MARKERS[locale]:
            if marker not in text:
                errors.append(f"{path.relative_to(ROOT)}: missing textbook-foundation boundary {marker!r}")
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
