"""Build the project-owned social preview from deterministic editorial geometry."""

from __future__ import annotations

import argparse
import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets/readme/prysai-llm-playbook-social.png"
BRAND_MARK = ROOT / "assets/branding/prysai-lab-mark-white-512.png"
WIDTH, HEIGHT = 1200, 630
INK = "#11151a"
PAPER = "#f3f0e9"
MUTED = "#aeb4b9"
RED = "#e12b2f"


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    windows_root = os.environ.get("WINDIR") or os.environ.get("SystemRoot")
    if not windows_root:
        raise RuntimeError("WINDIR or SystemRoot is required to render the Windows social-preview font")
    windows = Path(windows_root) / "Fonts"
    name = "arialbd.ttf" if bold else "arial.ttf"
    return ImageFont.truetype(str(windows / name), size=size)


def spaced(draw: ImageDraw.ImageDraw, position: tuple[int, int], text: str, *, size: int, fill: str, gap: int = 4) -> None:
    x, y = position
    face = font(size, bold=True)
    for char in text:
        draw.text((x, y), char, font=face, fill=fill)
        box = draw.textbbox((x, y), char, font=face)
        x += box[2] - box[0] + gap


def build() -> Image.Image:
    image = Image.new("RGB", (WIDTH, HEIGHT), INK)
    draw = ImageDraw.Draw(image)
    draw.line((0, 132, WIDTH, 132), fill="#34383d", width=1)
    draw.line((0, 526, WIDTH, 526), fill="#34383d", width=1)
    draw.line((842, 0, 842, HEIGHT), fill="#34383d", width=1)

    mark = Image.open(BRAND_MARK).convert("RGBA")
    mark.thumbnail((28, 28), Image.Resampling.LANCZOS)
    image.paste(mark, (55, 46), mark)
    spaced(draw, (101, 48), "PRYSAI LAB / LLM PLAYBOOK", size=16, fill=PAPER, gap=3)
    draw.text((58, 166), "LLM", font=font(86, True), fill=PAPER, stroke_width=0)
    draw.text((58, 264), "PLAYBOOK", font=font(92, True), fill=PAPER)
    spaced(draw, (63, 363), "FROM FIRST TASK TO RELIABLE WORK", size=16, fill=RED, gap=3)
    draw.text((61, 421), "A universal practice core. Codex is the flagship practice track.", font=font(24), fill=MUTED)

    spaced(draw, (880, 52), "ONE METHOD", size=15, fill=PAPER, gap=3)
    labels = ("DEFINE", "CONTEXT", "ACT", "VERIFY", "TRANSFER")
    y = 151
    for index, label in enumerate(labels, start=1):
        fill = RED if index < 5 else PAPER
        draw.rectangle((881, y, 904, y + 23), fill=fill)
        draw.text((929, y - 3), label, font=font(25, True), fill=PAPER)
        if index < 5:
            draw.line((892, y + 23, 892, y + 65), fill=PAPER, width=2)
        y += 74

    spaced(draw, (60, 558), "BOUND THE ACTION", size=15, fill=RED, gap=3)
    draw.line((286, 570, 780, 570), fill=PAPER, width=2)
    spaced(draw, (862, 558), "KEEP THE PROOF", size=15, fill=PAPER, gap=3)
    return image


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    rendered = build()
    if args.check:
        if not OUTPUT.is_file():
            print("SOCIAL_PREVIEW_FAILED missing output")
            return 1
        existing = Image.open(OUTPUT).convert("RGB")
        if existing.size != (WIDTH, HEIGHT) or existing.tobytes() != rendered.tobytes():
            print("SOCIAL_PREVIEW_FAILED output is stale")
            return 1
        print(f"SOCIAL_PREVIEW_OK path={OUTPUT.relative_to(ROOT)} size={WIDTH}x{HEIGHT}")
        return 0
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    rendered.save(OUTPUT, format="PNG", optimize=True)
    print(f"SOCIAL_PREVIEW_BUILT path={OUTPUT.relative_to(ROOT)} size={WIDTH}x{HEIGHT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
