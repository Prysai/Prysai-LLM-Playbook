"""Keep Chapter 0's base-model versus connected-product boundary explicit.

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

# These were attractive simplifications, but they teach the wrong mental model:
# attention does not make context unlimited, and a product's freshness cannot
# be inferred from a cutoff label alone. Keep the correction visible in every
# locale and reject the previous absolute wording when it returns.
ACCURACY_MARKERS = {
    "EN": ("finite context window", "rather than relying on the cutoff alone"),
    "ZH": ("有限的上下文窗口", "不能只凭截止日期下结论"),
    "ES": ("ventana de contexto finita", "solo en la fecha de corte"),
    "JA": ("有限のcontext window", "カットオフだけで判断せず"),
    "KO": ("유한한 context window", "cutoff만으로 판단하지 말고"),
    "DE": ("endliches Kontextfenster", "ein Cutoff allein entscheidet die Frage nicht"),
}

MICRO_EXPERIMENT_MARKERS = {
    "EN": ("A five-minute boundary check", "The city library will close at 6 p.m. today."),
    "ZH": ("五分钟边界检查", "市图书馆今天下午 6 点关门"),
    "ES": ("Comprobación de límites en cinco minutos", "La biblioteca municipal cerrará hoy a las 18:00"),
    "JA": ("5分の境界チェック", "市立図書館は今日18時に閉館する"),
    "KO": ("5분 경계 점검", "시립 도서관은 오늘 오후 6시에 문을 닫습니다"),
    "DE": ("Fünf-Minuten-Grenzcheck", "Die Stadtbibliothek schließt heute um 18 Uhr"),
}

FORBIDDEN_MARKERS = {
    "EN": ("This removed the short-window bottleneck.", "The model is frozen at its training cutoff"),
    "ZH": ("短窗口这个瓶颈就此被打破", "模型冻结在它的训练截止日期"),
    "ES": ("Esto eliminó el cuello de botella de la ventana corta.", "El modelo queda congelado en su fecha de corte"),
    "JA": ("これで短い窓というボトルネックが取り除かれました", "モデルは学習カットオフの時点で固定されています"),
    "KO": ("짧은 범위라는 병목이 사라졌습니다", "모델은 학습 cutoff 시점에 고정됩니다"),
    "DE": ("Damit fiel der Engpass des kurzen Fensters weg.", "Das Modell ist an seinem Trainings-Cutoff eingefroren"),
}


def main() -> int:
    errors: list[str] = []
    for locale, markers in REQUIRED_MARKERS.items():
        path = ROOT / f"book/guides/llm-fundamentals-{locale}.md"
        if not path.is_file():
            errors.append(f"missing Chapter 0 locale: {path.relative_to(ROOT)}")
            continue
        text = re.sub(r"\s+", " ", path.read_text(encoding="utf-8"))
        for marker in markers:
            if marker not in text:
                errors.append(f"{path.relative_to(ROOT)}: missing boundary marker {marker!r}")
        for marker in ACCURACY_MARKERS[locale]:
            if marker not in text:
                errors.append(f"{path.relative_to(ROOT)}: missing accuracy marker {marker!r}")
        for marker in MICRO_EXPERIMENT_MARKERS[locale]:
            if marker not in text:
                errors.append(f"{path.relative_to(ROOT)}: missing Chapter 0 micro-experiment marker {marker!r}")
        for marker in FORBIDDEN_MARKERS[locale]:
            if marker in text:
                errors.append(f"{path.relative_to(ROOT)}: contains superseded absolute claim {marker!r}")

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
