"""Validate deterministic source accessibility and built-site route integrity."""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
SOURCE_PAGES = (ROOT / "site/index.html", ROOT / "site/reader.html")
EXTERNAL_SCHEMES = {"data", "http", "https", "mailto", "tel", "javascript"}
SPACE_RE = re.compile(r"\s+")


@dataclass
class Element:
    tag: str
    attrs: dict[str, str | None]
    line: int
    in_main: bool
    parent: "Element | None" = None
    text: list[str] = field(default_factory=list)
    children: list["Element"] = field(default_factory=list)

    def accessible_text(self) -> str:
        parts = [*self.text]
        for child in self.children:
            if not is_hidden_from_accessibility(child):
                parts.append(child.accessible_text())
        return SPACE_RE.sub(" ", " ".join(parts)).strip()


def is_hidden_from_accessibility(element: Element) -> bool:
    """Return whether an element removes its descendants from the accessibility tree."""
    return "hidden" in element.attrs or (element.attrs.get("aria-hidden") or "").lower() == "true"


class DocumentParser(HTMLParser):
    """Collect only the DOM facts needed by the deterministic checks."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.elements: list[Element] = []
        self.stack: list[Element] = []
        self.main_depth = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        normalized = tag.lower()
        if normalized == "main":
            self.main_depth += 1
        parent = self.stack[-1] if self.stack else None
        element = Element(
            normalized,
            dict(attrs),
            self.getpos()[0],
            self.main_depth > 0,
            parent,
        )
        if parent:
            parent.children.append(element)
        self.elements.append(element)
        if normalized not in {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}:
            self.stack.append(element)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)
        if self.stack and self.stack[-1].tag == tag.lower():
            self.stack.pop()

    def handle_endtag(self, tag: str) -> None:
        normalized = tag.lower()
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index].tag == normalized:
                del self.stack[index:]
                break
        if normalized == "main" and self.main_depth:
            self.main_depth -= 1

    def handle_data(self, data: str) -> None:
        if data.strip() and self.stack:
            self.stack[-1].text.append(data)


def parse_html(text: str) -> DocumentParser:
    parser = DocumentParser()
    parser.feed(text)
    parser.close()
    return parser


def has_named_implicit_label(element: Element) -> bool:
    """Return whether a control is nested in a native label with usable text."""
    parent = element.parent
    while parent:
        if parent.tag == "label":
            return bool(parent.accessible_text())
        parent = parent.parent
    return False


def source_findings(path: Path, text: str) -> list[str]:
    parser = parse_html(text)
    findings: list[str] = []
    label = path.as_posix()
    ids: dict[str, Element] = {}
    labels_for = {
        element.attrs.get("for")
        for element in parser.elements
        if element.tag == "label" and element.attrs.get("for")
    }

    html = next((element for element in parser.elements if element.tag == "html"), None)
    if not html or not (html.attrs.get("lang") or "").strip():
        findings.append(f"{label}: html element requires a non-empty lang attribute")

    mains = [element for element in parser.elements if element.tag == "main"]
    if len(mains) != 1:
        findings.append(f"{label}: expected exactly one main element; found {len(mains)}")

    for element in parser.elements:
        element_id = element.attrs.get("id")
        if element_id:
            if element_id in ids:
                findings.append(f"{label}:{element.line}: duplicate id '{element_id}'")
            else:
                ids[element_id] = element

    for element in parser.elements:
        if element.tag == "img" and "alt" not in element.attrs:
            findings.append(f"{label}:{element.line}: img requires an alt attribute")

        if element.tag in {"input", "select", "textarea"}:
            if element.attrs.get("type") == "hidden":
                continue
            control_id = element.attrs.get("id")
            if (
                not element.attrs.get("aria-label")
                and not element.attrs.get("aria-labelledby")
                and control_id not in labels_for
                and not has_named_implicit_label(element)
            ):
                findings.append(f"{label}:{element.line}: {element.tag} requires a label or accessible name")

        if element.tag in {"a", "button"}:
            named = element.accessible_text() or (element.attrs.get("aria-label") or "").strip()
            if not named:
                labelledby = (element.attrs.get("aria-labelledby") or "").split()
                if not labelledby:
                    findings.append(f"{label}:{element.line}: {element.tag} requires an accessible name")

        for attribute in ("aria-labelledby", "aria-describedby", "aria-controls"):
            for target in (element.attrs.get(attribute) or "").split():
                if target not in ids:
                    findings.append(f"{label}:{element.line}: {attribute} references missing id '{target}'")

    main_headings = [element for element in parser.elements if element.in_main and re.fullmatch(r"h[1-6]", element.tag)]
    dynamic_reader = any("data-reader-article" in element.attrs for element in parser.elements)
    if dynamic_reader:
        mounts = [element for element in parser.elements if "data-reader-article" in element.attrs]
        if len(mounts) != 1 or mounts[0].tag != "article" or mounts[0].attrs.get("aria-busy") != "true":
            findings.append(f"{label}: dynamic reader requires one article mount initially marked aria-busy=true")
    else:
        h1_count = sum(element.tag == "h1" for element in main_headings)
        if h1_count != 1:
            findings.append(f"{label}: main content requires exactly one h1; found {h1_count}")
        previous = 0
        for heading in main_headings:
            level = int(heading.tag[1])
            if previous and level > previous + 1:
                findings.append(f"{label}:{heading.line}: heading level jumps from h{previous} to h{level}")
            previous = level

    return findings


def resolve_artifact_target(page: Path, artifact: Path, reference: str, base_href: str | None) -> tuple[Path, str]:
    parsed = urlsplit(reference)
    fragment = unquote(parsed.fragment)
    reference_path = unquote(parsed.path)
    start = page.parent
    if base_href:
        base_path = unquote(urlsplit(base_href).path)
        start = (page.parent / base_path).resolve()
    if reference_path.startswith("/"):
        target = artifact / reference_path.lstrip("/")
    elif reference_path:
        target = start / reference_path
    elif base_href:
        target = start / "index.html"
    else:
        target = page
    return target.resolve(), fragment


def artifact_findings(artifact: Path) -> list[str]:
    artifact = artifact.resolve()
    findings: list[str] = []
    required_pages = (artifact / "index.html", artifact / "site/index.html", artifact / "site/reader.html")
    for page in required_pages:
        if not page.is_file():
            findings.append(f"missing generated route: {page.relative_to(artifact).as_posix()}")

    for page in sorted(artifact.rglob("*.html")):
        parser = parse_html(page.read_text(encoding="utf-8"))
        page_label = page.relative_to(artifact).as_posix()
        base = next((element.attrs.get("href") for element in parser.elements if element.tag == "base"), None)
        for element in parser.elements:
            attribute = "href" if element.tag in {"a", "link"} else "src" if element.tag in {"img", "script"} else None
            if not attribute:
                continue
            reference = element.attrs.get(attribute)
            if not reference:
                continue
            parsed = urlsplit(reference)
            if parsed.scheme.lower() in EXTERNAL_SCHEMES or reference.startswith("//"):
                continue
            if reference == "#" and any(key.startswith("data-reader-") for key in element.attrs):
                continue
            target, fragment = resolve_artifact_target(page, artifact, reference, base)
            try:
                target.relative_to(artifact)
            except ValueError:
                findings.append(f"{page_label}:{element.line}: local reference escapes artifact: {reference}")
                continue
            if not target.is_file():
                findings.append(f"{page_label}:{element.line}: missing generated target: {reference}")
                continue
            if fragment and target.suffix.lower() == ".html":
                target_parser = parse_html(target.read_text(encoding="utf-8"))
                target_ids = {item.attrs.get("id") for item in target_parser.elements if item.attrs.get("id")}
                if fragment not in target_ids:
                    findings.append(f"{page_label}:{element.line}: missing generated anchor: {reference}")
    return findings


def validate_sources(paths: tuple[Path, ...] = SOURCE_PAGES) -> list[str]:
    findings: list[str] = []
    for path in paths:
        if not path.is_file():
            findings.append(f"missing source page: {path.relative_to(ROOT).as_posix()}")
            continue
        findings.extend(source_findings(path.relative_to(ROOT), path.read_text(encoding="utf-8")))
    return findings


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--artifact", type=Path, help="validate local routes and anchors in a built Pages artifact")
    args = parser.parse_args()
    try:
        findings = artifact_findings(args.artifact) if args.artifact else validate_sources()
    except (OSError, UnicodeError, ValueError) as exc:
        findings = [str(exc)]
    if findings:
        print("SITE_ACCESSIBILITY_FAILED" if not args.artifact else "SITE_ARTIFACT_INTEGRITY_FAILED")
        for finding in findings:
            print(f"- {finding}")
        return 1
    if args.artifact:
        print("SITE_ARTIFACT_INTEGRITY_OK routes=3 local_references=checked html_anchors=checked")
    else:
        print(f"SITE_ACCESSIBILITY_OK source_pages={len(SOURCE_PAGES)} rules=lang,main,headings,alt,labels,names,aria")
    return 0


if __name__ == "__main__":
    sys.exit(main())
