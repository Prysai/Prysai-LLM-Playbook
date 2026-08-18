"""Validate the repository's static security policy without external services."""

from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parents[1]
POLICY_PATH = ROOT / "docs/governance/repository-security-policy.yaml"
SECURITY_PATH = ROOT / "SECURITY.md"
PR_TEMPLATE = ROOT / ".github/PULL_REQUEST_TEMPLATE.md"
WORKFLOW_DIR = ROOT / ".github/workflows"
SITE_ENTRYPOINTS = (ROOT / "site/index.html", ROOT / "site/reader.html")
QUALITY_WORKFLOW = WORKFLOW_DIR / "quality.yml"

SHA_RE = re.compile(r"^[0-9a-f]{40}$", re.IGNORECASE)
USES_RE = re.compile(r"^\s*(?:-\s*)?uses:\s*([^@\s]+)@([^\s#]+)", re.MULTILINE)
PULL_REQUEST_TARGET_RE = re.compile(r"^\s*pull_request_target\s*:", re.MULTILINE)
PULL_REQUEST_RE = re.compile(r"^\s*pull_request\s*:", re.MULTILINE)
PERMISSIONS_BLOCK_RE = re.compile(r"^permissions:\s*\n((?:^  [a-z-]+:\s*[a-z-]+\s*$\n?)+)", re.MULTILINE)
PERMISSION_LINE_RE = re.compile(r"^  ([a-z-]+):\s*([a-z-]+)\s*$", re.MULTILINE)
WRITE_PERMISSION_RE = re.compile(r"^\s+[a-z-]+:\s*write\s*$", re.MULTILINE)
SECRETS_CONTEXT_RE = re.compile(r"\$\{\{\s*secrets\.", re.IGNORECASE)
UNSAFE_PIPE_RE = re.compile(
    r"(?:curl|wget|Invoke-WebRequest)\b[^\n|]*\|\s*(?:sh|bash|zsh|pwsh|powershell|Invoke-Expression)\b",
    re.IGNORECASE,
)
CSP_META_RE = re.compile(
    r'<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"\s*/?>',
    re.IGNORECASE,
)
RESOURCE_TAG_RE = re.compile(r"<(?:script|link)\b", re.IGNORECASE)
REQUIRED_SITE_CSP_DIRECTIVES = (
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "script-src 'self'",
    "style-src 'self'",
    "img-src 'self'",
    "font-src 'self'",
    "connect-src 'self'",
    "form-action 'self'",
    "frame-src 'none'",
)
REQUIRED_PYYAML_INSTALL = "python -m pip install --disable-pip-version-check --only-binary=:all: PyYAML==6.0.3"
FAST_MATERIAL_WORKFLOW = WORKFLOW_DIR / "contribution-material.yml"
FAST_MATERIAL_REQUIRED_FRAGMENTS = (
    "ref: ${{ github.event.pull_request.base.sha }}",
    "path: trusted-base",
    "ref: ${{ github.event.pull_request.head.sha }}",
    "path: untrusted-submission",
    "gh api --paginate",
    "--repository-root \"$GITHUB_WORKSPACE/untrusted-submission\"",
    "--changed-paths-file \"$GITHUB_WORKSPACE/changed-paths.txt\"",
)
SECRET_PATTERNS = (
    re.compile(r"\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b"),
    re.compile(r"\bgithub_pat_[A-Za-z0-9_]{40,}\b"),
    re.compile(r"\bsk-(?:proj-|ant-)?[A-Za-z0-9]{20,}\b"),
    re.compile(r"\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}\b"),
    re.compile(r"\bAKIA[0-9A-Z]{16}\b"),
    re.compile(r"\bASIA[0-9A-Z]{16}\b"),
    re.compile(r"\bAIza[0-9A-Za-z_-]{20,}\b"),
    re.compile(r"\b(?:hf|npm)_[A-Za-z0-9_-]{20,}\b"),
    re.compile(r"\bxox[baprs]-[A-Za-z0-9-]{16,}\b"),
    re.compile(r"\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b"),
    re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
)
SUSPICIOUS_SECRET_ASSIGNMENT_RE = re.compile(
    r"""(?ix)\b(?:api[_ -]?key|access[_ -]?token|refresh[_ -]?token|client[_ -]?secret|auth[_ -]?token|password|secret)\b
    \s*[:=]\s*(?:"(?P<double>[^"\r\n]{16,})"|'(?P<single>[^'\r\n]{16,})'|(?P<bare>[A-Za-z0-9][A-Za-z0-9._~+/=-]{15,}))"""
)
AUTH_HEADER_VALUE_RE = re.compile(
    r"(?i)\b(?:authorization|proxy-authorization|x-api-key|x-auth-token|cookie)\b\s*[:=]\s*(?:bearer|basic)?\s*[A-Za-z0-9._~+/=-]{16,}"
)
URL_USERINFO_RE = re.compile(
    r"(?i)\b(?:https?|postgres(?:ql)?|mysql|redis|mongodb(?:\+srv)?):\/\/[^\/\s@:]+:[^\/\s@]+@[^\/\s]+"
)
URL_SECRET_QUERY_RE = re.compile(
    r"(?i)[?&](?:api[_-]?key|access[_-]?token|refresh[_-]?token|client[_-]?secret|token|secret|password|session|sig(?:nature)?|x-amz-signature)=([^&\s\"'<>]+)"
)
WINDOWS_ABSOLUTE_PATH_RE = re.compile(
    r"(?ix)(?<![A-Za-z0-9])(?P<path>[A-Za-z]:[\\/][^\s\"'`<>|]+)"
)
POSIX_USER_PATH_RE = re.compile(
    r"(?ix)(?<![A-Za-z0-9])(?P<path>/(?:Users|home)/[^\s\"'`<>|]+)"
)
CODEX_LOCAL_PATH_RE = re.compile(
    r"(?ix)(?<![A-Za-z0-9])(?P<path>(?:[A-Za-z]:[\\/]|/)[^\s\"'`<>|]*(?:codex-" + r"runtimes|codex[\\/](?:home|attachments))[^\s\"'`<>|]*)"
)
LOCAL_FILE_URI_RE = re.compile(
    r"(?ix)(?<![A-Za-z0-9])file:" + r"///(?P<path>[^\s\"'<>]+)"
)
PRIVATE_IPV4_RE = re.compile(
    r"(?<![0-9.])(?:10\.(?:[0-9]{1,3}\.){2}[0-9]{1,3}|192\.168\.(?:[0-9]{1,3}\.)[0-9]{1,3}|172\.(?:1[6-9]|2[0-9]|3[0-1])\.(?:[0-9]{1,3}\.)[0-9]{1,3}|169\.254\.169\.254)(?![0-9.])"
)
PRIVATE_HOSTNAME_RE = re.compile(
    r"(?i)(?<![A-Za-z0-9.-])(?:[A-Za-z0-9-]+\.)+(?:internal|intranet|corp|lan|local)(?![A-Za-z0-9.-])"
)
MAC_ADDRESS_RE = re.compile(
    r"(?i)(?<![A-Za-z0-9])(?:[0-9a-f]{2}[:-]){5}[0-9a-f]{2}(?![A-Za-z0-9])"
)
DEVICE_IDENTIFIER_RE = re.compile(
    r"(?ix)\b(?:machine|device|hardware|serial|asset|installation)[ _-]?(?:id|number|serial)\b\s*[:=]\s*(?:\"[^\"\r\n]{8,}\"|'[^'\r\n]{8,}'|[A-Za-z0-9][A-Za-z0-9._:-]{7,})"
)
PLACEHOLDER_VALUES = {
    "changeme",
    "dummy",
    "example",
    "fake",
    "fixture",
    "placeholder",
    "private",
    "redacted",
    "sample",
    "secret",
    "test",
    "token",
    "your-api-key",
    "your_api_key",
    "your-token",
    "your_token",
}
SYNTHETIC_PATH_SEGMENTS = {
    "candidate-a",
    "example",
    "examples",
    "fixture",
    "fixtures",
    "me",
    "placeholder",
    "sample",
    "samples",
    "test",
    "tests",
    "user",
    "username",
}
SYNTHETIC_HOSTS = {"example.com", "example.invalid", "example.test", "localhost"}
SYNTHETIC_LINE_MARKERS = (
    "synthetic",
    "fixture",
    "placeholder",
    "pattern-definition",
    "test-only",
    "test only",
    "redacted",
    "dummy",
)
FORBIDDEN_FILENAMES = {"id_rsa", "id_dsa", "id_ecdsa", "id_ed25519"}
FORBIDDEN_SUFFIXES = {".pem", ".p12", ".pfx", ".key"}
REQUIRED_POLICY_KEYS = {
    "schema_version",
    "policy_id",
    "status",
    "owner",
    "reviewed_at",
    "next_review",
    "scope",
    "automation",
    "review_requirements",
    "host_ruleset",
    "sources",
}
REQUIRED_PR_HEADINGS = {
    "## Source, authorship, and license",
    "## Safety and external effects",
    "## Security review",
    "## Contribution route and review request",
    "## Evidence actually produced",
    "## Unverified and out of scope",
}


def relative(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def _line_containing(text: str, start: int, end: int) -> str:
    line_start = text.rfind("\n", 0, start) + 1
    line_end = text.find("\n", end)
    if line_end == -1:
        line_end = len(text)
    return text[line_start:line_end]


def _synthetic_context(line: str) -> bool:
    lowered = line.casefold()
    return any(marker in lowered for marker in SYNTHETIC_LINE_MARKERS)


def _placeholder_value(value: str) -> bool:
    cleaned = value.strip().strip("\"'").casefold()
    return cleaned in PLACEHOLDER_VALUES or cleaned.startswith("your-") or cleaned.startswith("your_")


def _synthetic_path(value: str, line: str) -> bool:
    if _synthetic_context(line):
        return True
    normalized = value.replace("\\", "/").strip(".,;:)")
    segments = {segment.casefold() for segment in normalized.split("/") if segment}
    return bool(segments & SYNTHETIC_PATH_SEGMENTS) and not any(
        segment.casefold() in {"administrator", "admin", "root"} for segment in segments
    )


def _synthetic_url(value: str, line: str) -> bool:
    if _synthetic_context(line):
        return True
    try:
        hostname = urlsplit(value).hostname
    except ValueError:
        return False
    return hostname in SYNTHETIC_HOSTS


def sensitive_information_scan(text: str) -> list[str]:
    """Return rule IDs without echoing potentially sensitive matched values."""

    findings: set[str] = set()
    if any(pattern.search(text) for pattern in SECRET_PATTERNS):
        findings.add("credential-signature")

    for match in SUSPICIOUS_SECRET_ASSIGNMENT_RE.finditer(text):
        line = _line_containing(text, match.start(), match.end())
        value = next((group for group in match.groups() if group is not None), "")
        if _placeholder_value(value) and _synthetic_context(line):
            continue
        findings.add("secret-like-assignment")
        break

    for match in AUTH_HEADER_VALUE_RE.finditer(text):
        line = _line_containing(text, match.start(), match.end())
        if _synthetic_context(line):
            continue
        findings.add("credential-bearing-header")
        break

    for match in URL_USERINFO_RE.finditer(text):
        line = _line_containing(text, match.start(), match.end())
        if _synthetic_url(match.group(0), line):
            continue
        findings.add("credential-bearing-url")
        break

    for match in URL_SECRET_QUERY_RE.finditer(text):
        line = _line_containing(text, match.start(), match.end())
        value = match.group(1)
        if _placeholder_value(value) and any(host in line.casefold() for host in SYNTHETIC_HOSTS):
            continue
        if _synthetic_context(line):
            continue
        findings.add("secret-bearing-url-query")
        break

    for pattern in (WINDOWS_ABSOLUTE_PATH_RE, POSIX_USER_PATH_RE, CODEX_LOCAL_PATH_RE, LOCAL_FILE_URI_RE):
        for match in pattern.finditer(text):
            line = _line_containing(text, match.start(), match.end())
            path = match.groupdict().get("path", match.group(0))
            if _synthetic_path(path, line):
                continue
            findings.add("machine-local-path")
            break
        if "machine-local-path" in findings:
            break

    for pattern in (PRIVATE_IPV4_RE, PRIVATE_HOSTNAME_RE):
        for match in pattern.finditer(text):
            line = _line_containing(text, match.start(), match.end())
            if _synthetic_context(line):
                continue
            findings.add("private-network-location")
            break
        if "private-network-location" in findings:
            break

    if any(match for match in MAC_ADDRESS_RE.finditer(text) if not _synthetic_context(_line_containing(text, match.start(), match.end()))):
        findings.add("mac-address")
    if any(match for match in DEVICE_IDENTIFIER_RE.finditer(text) if not _synthetic_context(_line_containing(text, match.start(), match.end()))):
        findings.add("device-identifier")
    return sorted(findings)


def load_policy(path: Path = POLICY_PATH) -> tuple[dict[str, object] | None, list[str]]:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        return None, [f"cannot parse {path.name} as JSON-compatible YAML: {exc}"]
    if not isinstance(data, dict):
        return None, [f"{path.name} must contain an object"]
    return data, []


def validate_policy(policy: dict[str, object]) -> list[str]:
    errors: list[str] = []
    missing = REQUIRED_POLICY_KEYS - policy.keys()
    for key in sorted(missing):
        errors.append(f"policy is missing {key}")
    if policy.get("schema_version") != "1":
        errors.append("policy schema_version must be '1'")
    if policy.get("policy_id") != "repository-security-policy":
        errors.append("policy_id must be repository-security-policy")
    if policy.get("status") != "candidate":
        errors.append("policy status must remain candidate until host-side enforcement exists")

    automation = policy.get("automation")
    if not isinstance(automation, dict):
        errors.append("automation must be an object")
    else:
        if automation.get("workflow_path") != ".github/workflows/security-policy.yml":
            errors.append("automation.workflow_path must name the dedicated workflow")
        if automation.get("token_permissions") != {"contents": "read"}:
            errors.append("automation.token_permissions must be exactly contents: read")
        events = automation.get("events")
        if events != ["pull_request", "push:main"]:
            errors.append("automation.events must be pull_request and push:main")
        forbidden = automation.get("forbidden_workflow_features")
        required_forbidden = {
            "pull_request_target",
            "write-scoped token permissions on pull_request workflows",
            "persisted checkout credentials on pull_request workflows",
        }
        if not isinstance(forbidden, list) or not required_forbidden.issubset(forbidden):
            errors.append("automation must explicitly forbid unsafe pull-request workflow features")

    host_ruleset = policy.get("host_ruleset")
    if not isinstance(host_ruleset, dict) or host_ruleset.get("status") != "unenforceable_on_private_organization_plan":
        errors.append("host_ruleset must honestly record the current enforcement blocker")

    sources = policy.get("sources")
    if not isinstance(sources, list) or len(sources) < 3:
        errors.append("policy must retain three first-party GitHub source records")
    else:
        for index, source in enumerate(sources, start=1):
            if not isinstance(source, dict):
                errors.append(f"sources[{index}] must be an object")
                continue
            for key in ("url", "accessed_at", "scope", "owner", "next_review"):
                if not isinstance(source.get(key), str) or not str(source[key]).strip():
                    errors.append(f"sources[{index}] is missing {key}")
            url = source.get("url")
            if isinstance(url, str) and not url.startswith("https://docs.github.com/"):
                errors.append(f"sources[{index}].url must be first-party GitHub documentation")
    return errors


def validate_workflow_text(text: str, label: str) -> list[str]:
    errors: list[str] = []
    if PULL_REQUEST_TARGET_RE.search(text):
        errors.append(f"{label}: pull_request_target is forbidden by the repository policy")
    # A deployment-only workflow may need a scoped secret on a protected push.
    # The untrusted boundary is a pull-request trigger: there, a secret context
    # could be exposed to contributor-controlled workflow or repository content.
    if PULL_REQUEST_RE.search(text) and SECRETS_CONTEXT_RE.search(text):
        errors.append(f"{label}: pull-request workflow must not reference the secrets context")
    if UNSAFE_PIPE_RE.search(text):
        errors.append(f"{label}: downloads must not be piped directly into a shell")
    for action, ref in USES_RE.findall(text):
        if action.startswith("./"):
            continue
        if not SHA_RE.fullmatch(ref):
            errors.append(f"{label}: Action must use a full commit SHA: {action}@{ref}")
    if PULL_REQUEST_RE.search(text):
        permission_match = PERMISSIONS_BLOCK_RE.search(text)
        if not permission_match:
            errors.append(f"{label}: pull-request workflow must explicitly set read-only permissions")
        else:
            permissions = dict(PERMISSION_LINE_RE.findall(permission_match.group(0)))
            if permissions.get("contents") != "read":
                errors.append(f"{label}: pull-request workflow must grant contents: read")
            if any(scope not in {"contents", "pull-requests"} or level != "read" for scope, level in permissions.items()):
                errors.append(f"{label}: pull-request workflow may grant only read-only contents or pull-requests permissions")
        if WRITE_PERMISSION_RE.search(text):
            errors.append(f"{label}: pull-request workflow must not grant write-scoped permissions")
        if "actions/checkout@" in text and "persist-credentials: false" not in text:
            errors.append(f"{label}: pull-request workflow must disable persisted checkout credentials")
    return errors


def validate_quality_dependency_pin(text: str, label: str) -> list[str]:
    if REQUIRED_PYYAML_INSTALL not in text:
        return [f"{label}: validation dependency must use the pinned binary-only PyYAML install"]
    return []


def validate_fast_material_workflow(text: str, label: str) -> list[str]:
    """Keep the fast route on trusted validator code and untrusted data only."""
    errors = []
    for fragment in FAST_MATERIAL_REQUIRED_FRAGMENTS:
        if fragment not in text:
            errors.append(f"{label}: missing trusted fast-material boundary: {fragment}")
    if "working-directory: trusted-base" not in text:
        errors.append(f"{label}: fast-material validators must run from trusted-base")
    return errors


def validate_workflows() -> tuple[int, list[str]]:
    errors: list[str] = []
    workflows = sorted(WORKFLOW_DIR.glob("*.y*ml"))
    if not workflows:
        return 0, ["no workflow files found"]
    for path in workflows:
        text = path.read_text(encoding="utf-8")
        errors.extend(validate_workflow_text(text, relative(path)))

    security_workflow = WORKFLOW_DIR / "security-policy.yml"
    if not security_workflow.is_file():
        errors.append("missing .github/workflows/security-policy.yml")
    else:
        text = security_workflow.read_text(encoding="utf-8")
        if not re.search(r"(?m)^on:\s*\n\s+pull_request:\s*$", text):
            errors.append("security-policy workflow must run on pull_request")
        if not re.search(r"(?m)^permissions:\s*\n\s+contents:\s*read\s*$", text):
            errors.append("security-policy workflow must have a read-only contents permission")
        if "persist-credentials: false" not in text:
            errors.append("security-policy workflow must not persist checkout credentials")
    if not QUALITY_WORKFLOW.is_file():
        errors.append("missing .github/workflows/quality.yml")
    else:
        errors.extend(validate_quality_dependency_pin(QUALITY_WORKFLOW.read_text(encoding="utf-8"), relative(QUALITY_WORKFLOW)))
    if not FAST_MATERIAL_WORKFLOW.is_file():
        errors.append("missing .github/workflows/contribution-material.yml")
    else:
        errors.extend(validate_fast_material_workflow(FAST_MATERIAL_WORKFLOW.read_text(encoding="utf-8"), relative(FAST_MATERIAL_WORKFLOW)))
    return len(workflows), errors


def candidate_files() -> tuple[list[Path], list[str]]:
    try:
        result = subprocess.run(
            ["git", "ls-files", "-co", "--exclude-standard", "-z"],
            cwd=ROOT,
            capture_output=True,
            check=False,
        )
    except OSError as exc:
        return [], [f"cannot list repository candidate files: {exc}"]
    if result.returncode != 0:
        return [], ["git ls-files failed while checking repository security"]
    files = [ROOT / Path(value) for value in result.stdout.decode("utf-8", errors="replace").split("\0") if value]
    return files, []


def secret_scan(paths: list[Path]) -> list[str]:
    errors: list[str] = []
    for path in paths:
        name = path.name.casefold()
        suffix = path.suffix.casefold()
        label = relative(path)
        if name in FORBIDDEN_FILENAMES or suffix in FORBIDDEN_SUFFIXES or (name.startswith(".env") and name != ".env.example"):
            errors.append(f"{label}: credential-shaped file must not be tracked")
            continue
        try:
            if path.stat().st_size > 1_000_000:
                continue
            data = path.read_bytes()
        except OSError as exc:
            errors.append(f"{label}: cannot read tracked file for security scan: {exc}")
            continue
        if b"\x00" in data:
            continue
        text = data.decode("utf-8", errors="replace")
        for rule_id in sensitive_information_scan(text):
            if rule_id == "credential-signature":
                errors.append(f"{label}: contains a credential-shaped value; remove it and rotate any real credential")
            else:
                errors.append(f"{label}: contains {rule_id}; remove the exposed value or replace it with a synthetic placeholder")
    return errors


def validate_contributor_docs() -> list[str]:
    errors: list[str] = []
    if not SECURITY_PATH.is_file():
        errors.append("missing SECURITY.md")
    elif "private security-advisory" not in SECURITY_PATH.read_text(encoding="utf-8").casefold():
        errors.append("SECURITY.md must explain the private reporting path")
    if not PR_TEMPLATE.is_file():
        errors.append("missing .github/PULL_REQUEST_TEMPLATE.md")
    else:
        text = PR_TEMPLATE.read_text(encoding="utf-8")
        for heading in sorted(REQUIRED_PR_HEADINGS - set(re.findall(r"(?m)^## .+$", text))):
            errors.append(f"pull-request template is missing {heading}")
    return errors


def validate_site_csp_text(text: str, label: str) -> list[str]:
    errors: list[str] = []
    match = CSP_META_RE.search(text)
    if not match:
        return [f"{label}: missing an early Content-Security-Policy meta contract"]
    first_resource = RESOURCE_TAG_RE.search(text)
    if first_resource and match.start() > first_resource.start():
        errors.append(f"{label}: CSP must precede every script and stylesheet resource")
    policy = match.group(1)
    for directive in REQUIRED_SITE_CSP_DIRECTIVES:
        if directive not in policy:
            errors.append(f"{label}: CSP is missing {directive}")
    for unsafe_directive in ("unsafe-inline", "unsafe-eval"):
        if unsafe_directive in policy:
            errors.append(f"{label}: CSP must not allow {unsafe_directive}")
    return errors


def validate_site_csp() -> list[str]:
    errors: list[str] = []
    for path in SITE_ENTRYPOINTS:
        if not path.is_file():
            errors.append(f"missing static-site entrypoint {relative(path)}")
            continue
        errors.extend(validate_site_csp_text(path.read_text(encoding="utf-8"), relative(path)))
    return errors


def main() -> int:
    policy, errors = load_policy()
    if policy is not None:
        errors.extend(validate_policy(policy))
    workflow_count, workflow_errors = validate_workflows()
    errors.extend(workflow_errors)
    candidates, candidate_errors = candidate_files()
    errors.extend(candidate_errors)
    if not candidate_errors:
        errors.extend(secret_scan(candidates))
    errors.extend(validate_contributor_docs())
    errors.extend(validate_site_csp())

    if errors:
        print("REPOSITORY_SECURITY_POLICY_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print(
        "REPOSITORY_SECURITY_POLICY_OK "
        f"workflows={workflow_count} candidate_files={len(candidates)} "
        "host_ruleset=unenforceable_on_private_organization_plan"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
