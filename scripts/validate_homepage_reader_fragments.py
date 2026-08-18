"""Validate homepage Reader deep links against the Markdown Reader renderer."""

from __future__ import annotations

import argparse
import re
import sys
import unicodedata
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
EMPTY_ANCHOR_RE = re.compile(
    r'^<(?:a|span)\s+id="([a-z][a-z0-9-]*)"\s*></(?:a|span)>$',
    re.IGNORECASE,
)
HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*#*$")
HTML_BLOCK_RE = re.compile(
    r"^<(?:div|table|details|summary|figure|section|nav|hr|p|h[1-6]|ul|ol|dl|img)\b",
    re.IGNORECASE,
)
HTML_CONTAINER_RE = re.compile(
    r"</?(div|table|details|figure|section|nav|ul|ol|dl)\b",
    re.IGNORECASE,
)
GENERATED_BLOCK_RE = re.compile(
    r"^<!--\s*(chapter-navigation|lab-navigation|language-switcher):start\s*-->$",
    re.IGNORECASE,
)
GENERATED_END_TEMPLATE = r"^<!--\s*{kind}:end\s*-->$"
MARKDOWN_LINK_RE = re.compile(r"\[[^\]]+\]\(([^)]+)\)")

# These reader-facing sources use stable fragments from the homepage, README,
# or a translated navigation table. Keep the check narrow: GitHub and other
# Markdown renderers use different heading-slug rules than our Reader.
BOOK_FRAGMENT_SOURCES = (
    "book/communication-clinic-EN.md",
    "book/routes/platform-adapter-guide-EN.md",
    "book/routes/platform-adapter-guide-ZH.md",
    "book/routes/platform-adapter-guide-ES.md",
    "book/routes/platform-adapter-guide-JA.md",
    "book/routes/platform-adapter-guide-KO.md",
    "book/routes/platform-adapter-guide-DE.md",
    "book/routes/platform-adapter-guide-ZHTW.md",
)


class _HomepageLinkParser(HTMLParser):
    """Collect anchor attributes while retaining source line numbers."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.links: list[tuple[int, str]] = []

    def _collect(self, attrs: list[tuple[str, str | None]]) -> None:
        href = next(
            (value for name, value in attrs if name.lower() == "href"),
            None,
        )
        if href is not None:
            self.links.append((self.getpos()[0], href))

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() == "a":
            self._collect(attrs)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() == "a":
            self._collect(attrs)


class _HtmlIdParser(HTMLParser):
    """Read IDs from a Reader-sanitized HTML block."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: set[str] = set()

    def _collect(self, attrs: list[tuple[str, str | None]]) -> None:
        for name, value in attrs:
            if name.lower() == "id" and value:
                self.ids.add(value)

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self._collect(attrs)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self._collect(attrs)


def _normalize_reader_path(value: str) -> str:
    """Mirror the Reader's slash, dot, and parent-segment normalization."""

    output: list[str] = []
    for segment in value.replace("\\", "/").split("/"):
        if not segment or segment == ".":
            continue
        if segment == "..":
            if output:
                output.pop()
            continue
        output.append(segment)
    return "/".join(output)


def _slug(value: str, used: dict[str, int]) -> str:
    """Reproduce site/reader.js's Unicode-aware heading slug algorithm."""

    cleaned = value.lower().translate({ord(char): None for char in "`*_~"})
    chunks: list[str] = []
    pending_separator = False
    for char in cleaned:
        category = unicodedata.category(char)
        if category.startswith(("L", "N")):
            if pending_separator and chunks:
                chunks.append("-")
            chunks.append(char)
            pending_separator = False
        else:
            pending_separator = True
    base = "".join(chunks).strip("-") or "section"
    count = used.get(base, 0) + 1
    used[base] = count
    return base if count == 1 else f"{base}-{count}"


def _unique_heading_id(value: str, used_slugs: dict[str, int], used_ids: set[str]) -> str:
    identifier = _slug(value, used_slugs)
    while identifier in used_ids:
        identifier = _slug(value, used_slugs)
    return identifier


def _html_block_ids(raw_lines: list[str]) -> set[str]:
    parser = _HtmlIdParser()
    parser.feed("\n".join(raw_lines))
    parser.close()
    return parser.ids


def _explicit_html_id_duplicates(markdown: str) -> list[str]:
    """Return duplicate authored HTML IDs, excluding fenced examples.

    Reader-generated heading IDs are handled separately by ``_reader_ids``.
    Authored ``id`` attributes are a stronger contract: two of them in one
    document make deep links ambiguous for the browser, screen readers, and
    search indexes. Code examples are ignored because they are rendered as
    code, not page markup.
    """

    visible_lines: list[str] = []
    in_fence = False
    fence: str | None = None
    for line in markdown.splitlines():
        stripped = line.strip()
        if stripped.startswith(("```", "~~~")):
            marker = stripped[:3]
            if not in_fence:
                in_fence, fence = True, marker
            elif marker == fence:
                in_fence, fence = False, None
            continue
        if not in_fence:
            visible_lines.append(line)

    parser = _HtmlIdParser()
    parser.feed("\n".join(visible_lines))
    parser.close()
    ordered_ids: list[str] = []
    # HTMLParser stores a set for normal validation; collect the ordered list
    # here so a duplicate can be reported once and deterministically.
    id_pattern = re.compile(r"\bid\s*=\s*([\"'])([^\"']+)\1", re.IGNORECASE)
    for match in id_pattern.finditer("\n".join(visible_lines)):
        ordered_ids.append(match.group(2))
    seen: set[str] = set()
    duplicates: list[str] = []
    for identifier in ordered_ids:
        if identifier in seen and identifier not in duplicates:
            duplicates.append(identifier)
        seen.add(identifier)
    return duplicates


def _reader_ids(markdown: str) -> set[str]:
    """Return IDs that renderBlocks can expose for a Markdown source."""

    lines = markdown.lstrip("\ufeff").splitlines()
    used_slugs: dict[str, int] = {}
    used_ids: set[str] = set()
    available_ids: set[str] = set()
    rendered_nodes: list[str] = []
    front_matter = False
    front_matter_seen = False
    index = 0

    while index < len(lines):
        line = lines[index]
        stripped = line.strip()
        h1_before_front_matter = len(rendered_nodes) == 1 and rendered_nodes[0] == "h1"
        if (
            not front_matter_seen
            and stripped == "---"
            and (not rendered_nodes or h1_before_front_matter)
        ):
            front_matter = True
            front_matter_seen = True
            index += 1
            continue
        if front_matter:
            if stripped == "---":
                front_matter = False
            index += 1
            continue
        if not stripped:
            index += 1
            continue

        generated_start = GENERATED_BLOCK_RE.fullmatch(stripped)
        if generated_start:
            kind = generated_start.group(1)
            end_re = re.compile(
                GENERATED_END_TEMPLATE.format(kind=re.escape(kind)),
                re.IGNORECASE,
            )
            index += 1
            while index < len(lines) and not end_re.fullmatch(lines[index].strip()):
                index += 1
            if index < len(lines):
                index += 1
            continue
        if stripped.startswith("<!--"):
            index += 1
            continue

        empty_anchor = EMPTY_ANCHOR_RE.fullmatch(stripped)
        if empty_anchor:
            identifier = empty_anchor.group(1)
            if identifier not in used_ids:
                used_ids.add(identifier)
                available_ids.add(identifier)
            rendered_nodes.append("anchor")
            index += 1
            continue

        if stripped.startswith(("```", "~~~")):
            fence = stripped[:3]
            index += 1
            while index < len(lines) and not lines[index].strip().startswith(fence):
                index += 1
            if index < len(lines):
                index += 1
            rendered_nodes.append("code")
            continue

        if HTML_BLOCK_RE.match(stripped):
            raw_lines = [lines[index]]
            depth = 0
            while True:
                opens = len(re.findall(r"<(div|table|details|figure|section|nav|ul|ol|dl)\b", lines[index], re.IGNORECASE))
                closes = len(re.findall(r"</(div|table|details|figure|section|nav|ul|ol|dl)>", lines[index], re.IGNORECASE))
                depth += opens - closes
                index += 1
                if index >= len(lines) or depth <= 0:
                    break
                raw_lines.append(lines[index])
            available_ids.update(_html_block_ids(raw_lines))
            rendered_nodes.append("html")
            continue

        heading = HEADING_RE.match(line)
        if heading:
            identifier = _unique_heading_id(heading.group(2), used_slugs, used_ids)
            used_ids.add(identifier)
            available_ids.add(identifier)
            rendered_nodes.append(f"h{len(heading.group(1))}")
            index += 1
            continue

        rendered_nodes.append("paragraph")
        index += 1

    return available_ids


def _relative_path(path: Path, root: Path) -> str:
    try:
        return path.relative_to(root).as_posix()
    except ValueError:
        return str(path)


def _is_reader_link(href: str) -> bool:
    parsed = urlsplit(href)
    if parsed.scheme or parsed.netloc:
        return False
    path = parsed.path.replace("\\", "/")
    while path.startswith("./"):
        path = path[2:]
    return path == "reader.html"


def _validate(homepage: Path, root: Path) -> tuple[list[str], int]:
    errors: list[str] = []
    try:
        html = homepage.read_text(encoding="utf-8")
    except (OSError, UnicodeError) as exc:
        return [f"{_relative_path(homepage, root)}: could not read homepage: {exc}"], 0

    parser = _HomepageLinkParser()
    try:
        parser.feed(html)
        parser.close()
    except Exception as exc:  # HTMLParser is permissive, but report malformed input clearly.
        return [f"{_relative_path(homepage, root)}: could not parse homepage: {exc}"], 0

    homepage_label = _relative_path(homepage, root)
    source_cache: dict[Path, set[str]] = {}
    checked = 0
    for line_number, href in parser.links:
        if not _is_reader_link(href):
            continue
        parsed = urlsplit(href)
        if "#" not in href:
            continue
        checked += 1
        query = parse_qs(parsed.query, keep_blank_values=True)
        path_values = query.get("path", [])
        if len(path_values) != 1 or not path_values[0].strip():
            errors.append(
                f"{homepage_label}:{line_number}: Reader link is missing a non-empty path query parameter: {href}"
            )
            continue
        fragment = unquote(parsed.fragment)
        if not fragment:
            errors.append(
                f"{homepage_label}:{line_number}: Reader link has an empty fragment: {href}"
            )
            continue

        normalized = _normalize_reader_path(path_values[0])
        if not normalized:
            errors.append(
                f"{homepage_label}:{line_number}: Reader path resolves to an empty source path: {href}"
            )
            continue
        source = (root / Path(*normalized.split("/"))).resolve()
        try:
            source.relative_to(root.resolve())
        except ValueError:
            errors.append(
                f"{homepage_label}:{line_number}: Reader path escapes the repository: {path_values[0]}"
            )
            continue
        if not source.is_file():
            errors.append(
                f"{homepage_label}:{line_number}: Reader source does not exist: {normalized}"
            )
            continue

        if source not in source_cache:
            try:
                source_text = source.read_text(encoding="utf-8")
                duplicate_ids = _explicit_html_id_duplicates(source_text)
                if duplicate_ids:
                    errors.append(
                        f"{homepage_label}:{line_number}: Reader source has duplicate authored IDs in "
                        f"{normalized}: {', '.join(duplicate_ids)}"
                    )
                source_cache[source] = _reader_ids(source_text)
            except (OSError, UnicodeError) as exc:
                errors.append(
                    f"{homepage_label}:{line_number}: could not read Reader source {normalized}: {exc}"
                )
                continue
        if fragment not in source_cache[source]:
            errors.append(
                f"{homepage_label}:{line_number}: Reader fragment #{fragment} is not rendered by {normalized}"
            )

    return errors, checked


def validate_homepage_fragments(
    homepage: Path = ROOT / "site/index.html",
) -> list[str]:
    """Return all invalid homepage Reader deep-link diagnostics."""

    errors, _ = _validate(Path(homepage), ROOT)
    return errors


def _markdown_link_target(value: str) -> str:
    """Return the URL portion of a Markdown link, without an optional title."""

    return value.strip().split(None, 1)[0].strip("<>")


def _validate_markdown_file(path: Path, root: Path) -> tuple[list[str], int]:
    """Validate Reader-style local fragments in one Markdown source."""

    label = _relative_path(path, root)
    try:
        lines = path.read_text(encoding="utf-8").splitlines()
    except (OSError, UnicodeError) as exc:
        return [f"{label}: could not read Markdown source: {exc}"], 0

    ids = _reader_ids("\n".join(lines))
    errors: list[str] = []
    duplicate_ids = _explicit_html_id_duplicates("\n".join(lines))
    if duplicate_ids:
        errors.append(
            f"{label}: duplicate authored IDs: {', '.join(duplicate_ids)}"
        )
    checked = 0
    in_fence = False
    fence: str | None = None
    for line_number, line in enumerate(lines, start=1):
        stripped = line.strip()
        if stripped.startswith(("```", "~~~")):
            marker = stripped[:3]
            if not in_fence:
                in_fence, fence = True, marker
            elif marker == fence:
                in_fence, fence = False, None
            continue
        if in_fence:
            continue
        for match in MARKDOWN_LINK_RE.finditer(line):
            target = _markdown_link_target(match.group(1))
            parsed = urlsplit(target)
            if parsed.scheme or parsed.netloc or not parsed.fragment:
                continue
            if parsed.path:
                target_path = (path.parent / Path(*parsed.path.replace("\\", "/").split("/"))).resolve()
            else:
                target_path = path
            try:
                target_path.relative_to(root.resolve())
            except ValueError:
                errors.append(f"{label}:{line_number}: fragment target escapes the repository: {target}")
                continue
            if not target_path.is_file():
                errors.append(f"{label}:{line_number}: fragment target does not exist: {target}")
                continue
            if target_path != path:
                try:
                    target_ids = _reader_ids(target_path.read_text(encoding="utf-8"))
                except (OSError, UnicodeError) as exc:
                    errors.append(f"{label}:{line_number}: could not read fragment target {target}: {exc}")
                    continue
            else:
                target_ids = ids
            checked += 1
            fragment = unquote(parsed.fragment)
            if fragment not in target_ids:
                errors.append(
                    f"{label}:{line_number}: Reader fragment #{fragment} is not rendered by "
                    f"{_relative_path(target_path, root)}"
                )
    return errors, checked


def validate_book_fragments() -> list[str]:
    """Validate stable Reader fragments in the selected book entry points."""

    errors: list[str] = []
    for relative_path in BOOK_FRAGMENT_SOURCES:
        path = ROOT / Path(*relative_path.split("/"))
        file_errors, _ = _validate_markdown_file(path, ROOT)
        errors.extend(file_errors)
    return errors


def main() -> int:
    argument_parser = argparse.ArgumentParser(
        description="Validate homepage Reader fragments against source Markdown."
    )
    argument_parser.add_argument(
        "--homepage",
        type=Path,
        default=ROOT / "site/index.html",
        help="homepage HTML source (default: site/index.html)",
    )
    args = argument_parser.parse_args()
    errors, checked = _validate(args.homepage, ROOT)
    book_errors = validate_book_fragments()
    errors.extend(book_errors)
    if errors:
        print("HOMEPAGE_READER_FRAGMENTS_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print(f"HOMEPAGE_READER_FRAGMENTS_OK checked={checked} book_sources={len(BOOK_FRAGMENT_SOURCES)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
