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
