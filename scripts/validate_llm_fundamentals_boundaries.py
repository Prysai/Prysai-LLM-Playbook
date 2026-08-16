"""Keep Lesson 0's base-model versus connected-product boundary explicit.

This is a wording-presence check for a safety-critical introductory concept.
It cannot evaluate translation quality, privacy compliance, product behavior,
or learner understanding.
"""

from __future__ import annotations

import sys
import re
from pathlib import Path


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="backslashreplace")


ROOT = Path(__file__).resolve().parents[1]

# Markers are intentionally local-language phrases, not translations of an
# English sentence. They preserve the three decisions a beginner needs to see:
# base model versus product surface, data/authorization before a connection,
# and source/date verification after retrieval.
REQUIRED_MARKERS = {
    "EN": (
        "A base model generates text",
        "search, retrieval, files, memory, or tools",
        "what may leave the current surface and who authorized it",
        "check the original source and date",
    ),
    "ZH": (
        "基础模型生成的是",
        "搜索、检索、文件、记忆或工具",
        "哪些数据会离开当前界面，以及谁授权这样做",
        "核对原始来源和日期",
    ),
    "ES": (
        "Un modelo base genera texto",
        "búsqueda, recuperación, archivos, memoria o herramientas",
        "qué puede salir de la superficie actual y quién lo autorizó",
        "comprueba la fuente original y la fecha",
    ),
    "JA": (
        "基盤モデルは学習データと*整合する*テキストを生成します",
        "検索、retrieval、ファイル、記憶、ツール",
        "何が現在の画面から出るのか、誰が許可したのか",
        "原典と日付を確認してください",
    ),
    "KO": (
        "기반 모델은 학습 데이터와 *일관된*",
        "검색, 검색·검색증강, 파일, 기억, 도구",
        "무엇이 현재 화면을 떠날 수 있는지와 누가 이를 허가했는지",
        "원문과 날짜를 확인하세요",
    ),
    "DE": (
        "Ein Basismodell erzeugt Text",
        "Suche, Retrieval, Dateien, Speicher oder Tools",
        "was die aktuelle Oberfläche verlassen darf und wer dies autorisiert hat",
        "Prüfe Originalquelle und Datum",
    ),
}


def main() -> int:
    errors: list[str] = []
    for locale, markers in REQUIRED_MARKERS.items():
        path = ROOT / f"book/guides/llm-fundamentals-{locale}.md"
        if not path.is_file():
            errors.append(f"missing Lesson 0 locale: {path.relative_to(ROOT)}")
            continue
        text = re.sub(r"\s+", " ", path.read_text(encoding="utf-8"))
        for marker in markers:
            if marker not in text:
                errors.append(f"{path.relative_to(ROOT)}: missing boundary marker {marker!r}")

    if errors:
        print("LLM_FUNDAMENTALS_BOUNDARIES_FAILED")
        print("\n".join(f"- {error}" for error in errors))
        return 1

    print("LLM_FUNDAMENTALS_BOUNDARIES_OK")
    print("locales=EN,ZH,ES,JA,KO,DE")
    print("evidence_boundary=wording-presence-not-language-review-product-behavior-or-learning-proof")
    return 0


if __name__ == "__main__":
    sys.exit(main())
