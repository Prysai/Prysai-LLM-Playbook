"""Validate the repository's contributor-facing GitHub templates."""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any, Callable

import yaml


ROOT = Path(__file__).resolve().parents[1]
ISSUE_DIR = ROOT / ".github/ISSUE_TEMPLATE"
PR_TEMPLATE = ROOT / ".github/PULL_REQUEST_TEMPLATE.md"
CODEOWNERS = ROOT / ".github/CODEOWNERS"
DCO = ROOT / "DCO.md"
FIELD_REPORT = ISSUE_DIR / "field-report.yml"
FEEDBACK_CONTRACT = ROOT / "docs/quality/public-beta-feedback-contract-v1.md"
ALLOWED_TYPES = {"markdown", "input", "textarea", "dropdown", "checkboxes"}
REPOSITORY_RE = re.compile(r"^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$")
FEEDBACK_BOUNDARIES = {
    "Candidate status": ("candidate",),
    "voluntary participation": ("voluntary",),
    "secret and private-data exclusion": ("secret", "private"),
    "data minimization": ("data minimization",),
    "no automatic curriculum publication": ("not automatically", "curriculum"),
    "single-report evidence limit": ("root cause", "prevalence", "verified fix"),
}
REQUIRED_PR_HEADINGS = {
    "## Tracking and summary",
    "## Implementation or editorial approach",
    "## Change class",
    "## Contribution route and review request",
    "## Contribution declaration",
    "## Source, authorship, and license",
    "## Safety and external effects",
    "## Security review",
    "## AI assistance",
    "## Validation and evidence",
    "## Unverified and out of scope",
    "## Status claim",
    "## Checklist",
}
REQUIRED_PR_ROUTE_TEXT = (
    "Test material (fast route",
    "Fast material review",
    "contribution.json",
    "DCO:",
    "Signed-off-by:",
)
REQUIRED_CODEOWNER_LINES = {
    "/book/ @Prysai-Lab",
    "/skills/ @Prysai-Lab",
    "/site/ @Prysai-Lab",
    "/evals/contributions/ @Prysai-Lab",
    "/LICENSE @Prysai-Lab",
    "/LICENSE-CODE @Prysai-Lab",
    "/CONTRIBUTING.md @Prysai-Lab",
    "/SECURITY.md @Prysai-Lab",
    "/DCO.md @Prysai-Lab",
    "/docs/quality/ @Prysai-Lab",
    "/docs/governance/ @Prysai-Lab",
    "/docs/sources/ @Prysai-Lab",
    "/docs/strategy/ @Prysai-Lab",
    "/.github/ @Prysai-Lab",
    "/scripts/ @Prysai-Lab",
}
DCO_REQUIRED_FRAGMENTS = (
    "Developer Certificate of Origin",
    "https://developercertificate.org/",
    "Signed-off-by:",
    "verified GitHub commit signature",
    "CLA",
)


def load_yaml(path: Path) -> Any:
    if not path.is_absolute():
        path = ROOT / path
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def validate_form(path: Path) -> list[str]:
    errors: list[str] = []
    if not path.is_absolute():
        path = ROOT / path
    data = load_yaml(path)
    label = str(path.relative_to(ROOT))
    if not isinstance(data, dict):
        return [f"{label} must contain an object"]
    for key in ("name", "description", "body"):
        if key not in data:
            errors.append(f"{label} is missing {key}")
    if not isinstance(data.get("name"), str) or not data["name"].strip():
        errors.append(f"{label}.name must be non-empty")
    description = data.get("description")
    if not isinstance(description, str) or not description.strip() or len(description) > 200:
        errors.append(f"{label}.description must contain 1-200 characters")
    body = data.get("body")
    if not isinstance(body, list) or not body:
        errors.append(f"{label}.body must be a non-empty list")
        return errors
    ids: set[str] = set()
    interactive = 0
    for index, item in enumerate(body, start=1):
        item_label = f"{label}.body[{index}]"
        if not isinstance(item, dict):
            errors.append(f"{item_label} must be an object")
            continue
        item_type = item.get("type")
        if item_type not in ALLOWED_TYPES:
            errors.append(f"{item_label}.type is not supported")
            continue
        attributes = item.get("attributes")
        if not isinstance(attributes, dict):
            errors.append(f"{item_label}.attributes must be an object")
            continue
        if item_type == "markdown":
            if not isinstance(attributes.get("value"), str) or not attributes["value"].strip():
                errors.append(f"{item_label}.attributes.value must be non-empty")
            continue
        interactive += 1
        item_id = item.get("id")
        if not isinstance(item_id, str) or not item_id.strip():
            errors.append(f"{item_label}.id must be non-empty")
        elif item_id in ids:
            errors.append(f"{item_label}.id is duplicated: {item_id}")
        else:
            ids.add(item_id)
        if not isinstance(attributes.get("label"), str) or not attributes["label"].strip():
            errors.append(f"{item_label}.attributes.label must be non-empty")
        validations = item.get("validations")
        if item_type != "checkboxes" and (not isinstance(validations, dict) or validations.get("required") is not True):
            errors.append(f"{item_label} must be required")
        if item_type == "dropdown":
            options = attributes.get("options")
            if not isinstance(options, list) or len(options) < 2 or any(not isinstance(option, str) or not option.strip() for option in options):
                errors.append(f"{item_label}.attributes.options must contain at least two strings")
        if item_type == "checkboxes":
            options = attributes.get("options")
            if not isinstance(options, list) or not options:
                errors.append(f"{item_label}.attributes.options must be non-empty")
            else:
                for option_index, option in enumerate(options, start=1):
                    if not isinstance(option, dict) or not isinstance(option.get("label"), str) or not option["label"].strip():
                        errors.append(f"{item_label}.attributes.options[{option_index}] needs a label")
                    elif option.get("required") is not True:
                        errors.append(f"{item_label}.attributes.options[{option_index}] must be required")
    if interactive < 3:
        errors.append(f"{label} must contain at least three interactive fields")
    return errors


def declared_labels(path: Path = FIELD_REPORT) -> tuple[list[str], list[str]]:
    """Return normalized labels declared by the field-report issue form."""
    if not path.is_absolute():
        path = ROOT / path
    label = str(path.relative_to(ROOT)) if path.is_relative_to(ROOT) else str(path)
    data = load_yaml(path)
    if not isinstance(data, dict):
        return [], [f"{label} must contain an object"]
    labels = data.get("labels")
    if not isinstance(labels, list) or not labels:
        return [], [f"{label}.labels must be a non-empty list"]
    errors: list[str] = []
    normalized: list[str] = []
    for index, value in enumerate(labels, start=1):
        if not isinstance(value, str) or not value.strip():
            errors.append(f"{label}.labels[{index}] must be a non-empty string")
        else:
            normalized.append(value.strip())
    if len(set(normalized)) != len(normalized):
        errors.append(f"{label}.labels must not contain duplicates")
    return normalized, errors


def validate_feedback_contract(path: Path = FEEDBACK_CONTRACT) -> list[str]:
    """Check the local public-feedback boundary before exposing its issue form."""
    if not path.is_absolute():
        path = ROOT / path
    label = str(path.relative_to(ROOT)) if path.is_relative_to(ROOT) else str(path)
    if not path.is_file():
        return [f"missing {label}"]
    text = path.read_text(encoding="utf-8").casefold()
    errors: list[str] = []
    for boundary, fragments in FEEDBACK_BOUNDARIES.items():
        if any(fragment.casefold() not in text for fragment in fragments):
            errors.append(f"{label} is missing the {boundary} boundary")
    return errors


def repository_from_remote_url(remote_url: str) -> str | None:
    """Extract owner/repository only from recognized GitHub origin formats."""
    value = remote_url.strip()
    patterns = (
        r"^https?://github\.com/([^/]+/[^/]+?)(?:\.git)?/?$",
        r"^git@github\.com:([^/]+/[^/]+?)(?:\.git)?$",
        r"^ssh://git@github\.com/([^/]+/[^/]+?)(?:\.git)?/?$",
        r"^git://github\.com/([^/]+/[^/]+?)(?:\.git)?/?$",
    )
    for pattern in patterns:
        match = re.fullmatch(pattern, value, flags=re.IGNORECASE)
        if match:
            repository = match.group(1)
            return repository if REPOSITORY_RE.fullmatch(repository) else None
    return None


def resolve_repository(
    environ: dict[str, str] | os._Environ[str] = os.environ,
    run: Callable[..., subprocess.CompletedProcess[str]] = subprocess.run,
) -> tuple[str | None, str | None]:
    """Resolve GITHUB_REPOSITORY override, then the configured origin."""
    override = environ.get("GITHUB_REPOSITORY", "").strip()
    if override:
        if REPOSITORY_RE.fullmatch(override):
            return override, None
        return None, "GITHUB_REPOSITORY must use owner/repository"
    try:
        result = run(
            ["git", "config", "--get", "remote.origin.url"],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
    except OSError:
        return None, "cannot read remote.origin.url from git config"
    repository = repository_from_remote_url(result.stdout) if result.returncode == 0 else None
    if not repository:
        return None, "remote.origin.url is not a recognized GitHub repository; set GITHUB_REPOSITORY=owner/repository"
    return repository, None


def fetch_remote_labels(
    repository: str,
    token: str,
    open_url: Callable[..., Any] = urllib.request.urlopen,
) -> tuple[set[str], list[str]]:
    """Fetch all repository label names without exposing authorization data."""
    owner, name = repository.split("/", maxsplit=1)
    base = f"https://api.github.com/repos/{urllib.parse.quote(owner, safe='')}/{urllib.parse.quote(name, safe='')}/labels"
    labels: set[str] = set()
    page = 1
    try:
        while True:
            request = urllib.request.Request(
                f"{base}?per_page=100&page={page}",
                headers={
                    "Accept": "application/vnd.github+json",
                    "Authorization": f"Bearer {token}",
                    "User-Agent": "prysai-llm-playbook-template-validator",
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            )
            with open_url(request, timeout=15) as response:
                payload = json.loads(response.read().decode("utf-8"))
            if not isinstance(payload, list):
                return set(), ["GitHub labels endpoint returned an unexpected response"]
            for item in payload:
                if isinstance(item, dict) and isinstance(item.get("name"), str):
                    labels.add(item["name"])
            if len(payload) < 100:
                return labels, []
            page += 1
    except urllib.error.HTTPError as exc:
        return set(), [f"GitHub labels request failed with HTTP {exc.code}"]
    except (urllib.error.URLError, TimeoutError, OSError, UnicodeError, json.JSONDecodeError):
        return set(), ["GitHub labels request failed due to a network or response error"]


def validate_remote_labels(
    declared: list[str],
    environ: dict[str, str] | os._Environ[str] = os.environ,
    resolve: Callable[..., tuple[str | None, str | None]] = resolve_repository,
    fetch: Callable[..., tuple[set[str], list[str]]] = fetch_remote_labels,
) -> list[str]:
    token = environ.get("GITHUB_TOKEN", "").strip() or environ.get("GH_TOKEN", "").strip()
    if not token:
        return ["--check-remote requires GITHUB_TOKEN or GH_TOKEN"]
    repository, repository_error = resolve(environ)
    if repository_error:
        return [repository_error]
    available, errors = fetch(repository or "", token)
    if errors:
        return errors
    return [f"declared field-report label does not exist in {repository}: {label}" for label in declared if label not in available]


def validate_config(path: Path, repository: str) -> list[str]:
    """Require contact links to follow the current canonical repository."""
    errors: list[str] = []
    if not path.is_absolute():
        path = ROOT / path
    data = load_yaml(path)
    label = str(path.relative_to(ROOT))
    if not isinstance(data, dict):
        return [f"{label} must contain an object"]
    if data.get("blank_issues_enabled") is not False:
        errors.append(f"{label}.blank_issues_enabled must be false")
    links = data.get("contact_links")
    if not isinstance(links, list) or not links:
        errors.append(f"{label}.contact_links must be non-empty")
    else:
        for index, link in enumerate(links, start=1):
            if not isinstance(link, dict) or any(not isinstance(link.get(key), str) or not link[key].strip() for key in ("name", "url", "about")):
                errors.append(f"{label}.contact_links[{index}] needs name, url, and about")
            elif not link["url"].startswith(f"https://github.com/{repository}/"):
                errors.append(f"{label}.contact_links[{index}] must stay inside the project repository")
    return errors


def validate_pr_template_text(text: str) -> list[str]:
    missing = sorted(REQUIRED_PR_HEADINGS - set(text.splitlines()))
    errors = [f"pull request template is missing heading: {heading}" for heading in missing]
    for fragment in REQUIRED_PR_ROUTE_TEXT:
        if fragment not in text:
            errors.append(f"pull request template is missing contribution-route text: {fragment}")
    return errors


def validate_pr_template() -> list[str]:
    if not PR_TEMPLATE.is_file():
        return ["missing .github/PULL_REQUEST_TEMPLATE.md"]
    return validate_pr_template_text(PR_TEMPLATE.read_text(encoding="utf-8"))


def validate_dco() -> list[str]:
    return validate_dco_path(DCO)


def validate_dco_path(path: Path) -> list[str]:
    if not path.is_file():
        return [f"missing {path.name}"]
    text = path.read_text(encoding="utf-8")
    return [f"{path.name} is missing contribution boundary: {fragment}" for fragment in DCO_REQUIRED_FRAGMENTS if fragment not in text]


def validate_codeowners_text(text: str) -> list[str]:
    lines = {line.strip() for line in text.splitlines() if line.strip() and not line.lstrip().startswith("#")}
    missing = sorted(REQUIRED_CODEOWNER_LINES - lines)
    return [f"CODEOWNERS is missing review route: {line}" for line in missing]


def validate_codeowners() -> list[str]:
    if not CODEOWNERS.is_file():
        return ["missing .github/CODEOWNERS"]
    return validate_codeowners_text(CODEOWNERS.read_text(encoding="utf-8"))


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check-remote",
        action="store_true",
        help="verify field-report labels through the GitHub API; uses GITHUB_REPOSITORY or remote.origin.url and GITHUB_TOKEN/GH_TOKEN",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    errors: list[str] = []
    form_paths = sorted(path for path in ISSUE_DIR.glob("*.yml") if path.name != "config.yml")
    if len(form_paths) < 2:
        errors.append("at least two issue forms are required")
    for path in form_paths:
        try:
            errors.extend(validate_form(path))
        except (OSError, UnicodeError, yaml.YAMLError) as exc:
            errors.append(f"cannot parse {path.relative_to(ROOT)}: {exc}")
    repository, repository_error = resolve_repository()
    if repository_error:
        errors.append(repository_error)
    else:
        try:
            errors.extend(validate_config(ISSUE_DIR / "config.yml", repository or ""))
        except (OSError, UnicodeError, yaml.YAMLError) as exc:
            errors.append(f"cannot parse .github/ISSUE_TEMPLATE/config.yml: {exc}")
    errors.extend(validate_pr_template())
    errors.extend(validate_dco())
    errors.extend(validate_codeowners())
    labels: list[str] = []
    try:
        labels, label_errors = declared_labels()
        errors.extend(label_errors)
    except (OSError, UnicodeError, yaml.YAMLError) as exc:
        errors.append(f"cannot parse .github/ISSUE_TEMPLATE/field-report.yml labels: {exc}")
    try:
        errors.extend(validate_feedback_contract())
    except (OSError, UnicodeError) as exc:
        errors.append(f"cannot read docs/quality/public-beta-feedback-contract-v1.md: {exc}")
    if args.check_remote:
        errors.extend(validate_remote_labels(labels))
    if errors:
        print("GITHUB_TEMPLATES_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    remote = "checked" if args.check_remote else "not_checked"
    print(f"GITHUB_TEMPLATES_OK issue_forms={len(form_paths)} pr_headings={len(REQUIRED_PR_HEADINGS)} field_labels={len(labels)} remote={remote}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
