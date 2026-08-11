"""Build the bounded static artifact used by GitHub Pages."""

from __future__ import annotations

import argparse
import shutil
import sys
from pathlib import Path
from tempfile import TemporaryDirectory


ROOT = Path(__file__).resolve().parents[1]
PUBLISH_DIRECTORIES = ("site", "book", "docs", "skills", "assets", "examples", "evals")
PUBLISH_ROOT_FILES = (
    "README.md",
    "README-EN.md",
    "README-ZH.md",
    "README-ES.md",
    "README-JA.md",
    "README-KO.md",
    "README-DE.md",
    "AGENTS.md",
    "CONTEXT.md",
)
FORBIDDEN_NAMES = (".git", ".work", ".codex-temp", "tmp", ".pytest_cache")


def root_index(site_index: Path) -> str:
    """Return a root entry that loads the source site from the artifact."""

    text = site_index.read_text(encoding="utf-8")
    marker = "<head>"
    if marker not in text:
        raise ValueError(f"{site_index.relative_to(ROOT)} is missing a <head> element")
    base = '    <base href="site/" />\n    <script>window.CODEX_PAGES_ARTIFACT = true;</script>\n'
    return text.replace(marker, f"{marker}\n{base}", 1)


def validate_source() -> None:
    required = (
        ROOT / "site/index.html",
        ROOT / "site/styles.css",
        ROOT / "site/app.js",
        ROOT / "site/locale-manifest.js",
        ROOT / "site/learning-path-data.js",
        ROOT / "site/reader.html",
        ROOT / "site/reader.css",
        ROOT / "site/reader.js",
    )
    missing = [path.relative_to(ROOT).as_posix() for path in required if not path.is_file()]
    if missing:
        raise FileNotFoundError("missing Pages source files: " + ", ".join(missing))


def validate_artifact(output: Path) -> None:
    expected = (output / "index.html", output / ".nojekyll")
    missing = [path.name for path in expected if not path.is_file()]
    if missing:
        raise FileNotFoundError("Pages artifact is missing: " + ", ".join(missing))

    for directory in PUBLISH_DIRECTORIES:
        if not (output / directory).is_dir():
            raise FileNotFoundError(f"Pages artifact is missing directory: {directory}")
    for filename in PUBLISH_ROOT_FILES:
        if not (output / filename).is_file():
            raise FileNotFoundError(f"Pages artifact is missing root source: {filename}")

    leaked = [name for name in FORBIDDEN_NAMES if (output / name).exists()]
    if leaked:
        raise ValueError("forbidden work directories leaked into Pages artifact: " + ", ".join(leaked))

    root_text = (output / "index.html").read_text(encoding="utf-8")
    if '<base href="site/" />' not in root_text or "window.CODEX_PAGES_ARTIFACT = true" not in root_text:
        raise ValueError("root Pages entry must point relative assets and content through site/")


def build(output: Path) -> None:
    validate_source()
    output = output.resolve()
    allowed_in_repo = ROOT / "_site"
    if output == ROOT or (ROOT in output.parents and output != allowed_in_repo):
        raise ValueError(f"refusing to build Pages artifact at an unapproved repository path: {output}")
    if output.exists():
        shutil.rmtree(output)
    output.mkdir(parents=True)

    for directory in PUBLISH_DIRECTORIES:
        shutil.copytree(ROOT / directory, output / directory)
    for filename in PUBLISH_ROOT_FILES:
        shutil.copy2(ROOT / filename, output / filename)

    (output / "index.html").write_text(root_index(ROOT / "site/index.html"), encoding="utf-8", newline="\n")
    (output / ".nojekyll").write_text("", encoding="utf-8")
    validate_artifact(output)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, help="artifact directory to create")
    parser.add_argument(
        "--check",
        action="store_true",
        help="build and validate an isolated temporary artifact without keeping it",
    )
    args = parser.parse_args()

    if not args.output and not args.check:
        parser.error("provide --output or use --check")
    if args.output and args.check:
        parser.error("--output and --check cannot be combined")

    try:
        if args.check:
            with TemporaryDirectory(prefix="codex-pages-") as temporary:
                build(Path(temporary) / "artifact")
            print("PAGES_ARTIFACT_OK mode=temporary")
        else:
            build(args.output)
            print(f"PAGES_ARTIFACT_OK output={args.output.resolve()}")
    except (FileNotFoundError, OSError, ValueError, UnicodeError) as exc:
        print("PAGES_ARTIFACT_FAILED")
        print(f"- {exc}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
