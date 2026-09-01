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
DCO_PATH = ROOT / "DCO.md"
WORKFLOW_DIR = ROOT / ".github/workflows"
SITE_ENTRYPOINTS = (ROOT / "site/index.html", ROOT / "site/reader.html")
QUALITY_WORKFLOW = WORKFLOW_DIR / "quality.yml"
PAGES_WORKFLOW = WORKFLOW_DIR / "pages.yml"
CODEQL_WORKFLOW = WORKFLOW_DIR / "codeql.yml"
MAINTAINER_AUTOMERGE_WORKFLOW = WORKFLOW_DIR / "maintainer-pr-automerge.yml"
PULL_REQUEST_CONTRACT_WORKFLOW = WORKFLOW_DIR / "pull-request-contract.yml"

SHA_RE = re.compile(r"^[0-9a-f]{40}$", re.IGNORECASE)
USES_RE = re.compile(r"^\s*(?:-\s*)?uses:\s*([^@\s]+)@([^\s#]+)", re.MULTILINE)
PULL_REQUEST_TARGET_RE = re.compile(r"^\s*pull_request_target\s*:", re.MULTILINE)
PULL_REQUEST_RE = re.compile(r"^\s*pull_request\s*:", re.MULTILINE)
WORKFLOW_RUN_RE = re.compile(r"^\s*workflow_run\s*:", re.MULTILINE)
WORKFLOW_DISPATCH_RE = re.compile(r"^\s*workflow_dispatch\s*:", re.MULTILINE)
MAIN_REF_GUARD_RE = re.compile(r"github\.ref\s*==\s*['\"]refs/heads/main['\"]")
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
MAX_TEXT_SCAN_BYTES = 25_000_000
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
DOCS_DEPLOY_REQUIRED_FRAGMENTS = (
    "needs: build",
    "actions: read",
    "uses: actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c",
    "name: pages-candidate-${{ github.sha }}",
    "path: _site",
    "github-token: ${{ github.token }}",
    "name: docs-verifier-${{ github.sha }}",
    "path: docs-verifier",
    "python docs-verifier/check_deployed_site.py",
)
DOCS_DEPLOY_ALLOWED_PERMISSIONS = {"actions": "read"}
LEGACY_NODE20_ACTION_PINS = (
    "actions/configure-pages@983d7736d9b0ae728b81ab479565c72886d7745b",
    "actions/download-artifact@d3f86a106a0bac45b974a628896c90dbdf5c8093",
    "actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02",
    "astral-sh/setup-uv@d4b2f3b6ecc6e67c4457f6d3e41ec42d3d0fcb86",
)
PAGES_CANDIDATE_ARTIFACT_REQUIRED = (
    "name: pages-candidate-${{ github.sha }}",
    "path: _site",
    "include-hidden-files: true",
)
PAGES_POST_MERGE_REQUIRED_FRAGMENTS = (
    "workflow_dispatch:",
    "sync-huggingface:",
    "group: pages-build-${{ github.ref }}",
    "group: huggingface-publication",
    "group: github-pages-deployment",
    "group: docs-prysai-production",
)
DOCS_DEPLOY_FORBIDDEN_FRAGMENTS = (
    "actions/checkout@",
    "actions/setup-python@",
    "scripts/build_pages_artifact.py",
)
CODEQL_REQUIRED_FRAGMENTS = (
    "pull_request:",
    "github/codeql-action/init@ff2f1c621b7f889edc0d3c761ac2e6a3f8cdb0dd",
    "github/codeql-action/autobuild@ff2f1c621b7f889edc0d3c761ac2e6a3f8cdb0dd",
    "github/codeql-action/analyze@ff2f1c621b7f889edc0d3c761ac2e6a3f8cdb0dd",
    "security-events: write",
    "languages: ${{ matrix.language }}",
    "language: [javascript, python]",
)
CODEQL_PR_ALLOWED_PERMISSIONS = {
    "actions": "read",
    "contents": "read",
    "packages": "read",
    "security-events": "write",
}
MAINTAINER_AUTOMERGE_ALLOWED_PERMISSIONS = {
    "actions": "read",
    "contents": "write",
    "pull-requests": "write",
}
REQUIRED_HOST_STATUS_CHECKS = (
    "candidate-evidence",
    "repository-security",
    "pull-request-contract",
)
MAINTAINER_AUTOMERGE_REQUIRED_FRAGMENTS = (
    "workflow_run:",
    "types: [completed]",
    "github.event.workflow_run.conclusion == 'success'",
    "run.event !== 'pull_request'",
    "Prysai LLM Playbook quality",
    "Prysai LLM Playbook security",
    "workflow_id: workflow.file",
    "event: 'pull_request'",
    "head_sha: headSha",
    "const allowedAuthors = new Set([",
    "'Prysai-Lab',",
    "allowedAuthors.has(pullRequest.user?.login)",
    "pullRequest.base?.ref === 'main'",
    "pullRequest.base?.repo?.full_name === baseRepository",
    "allowedHeadRepositories.has(pullRequest.head?.repo?.full_name)",
    "'Prysai-Lab/Prysai-LLM-Playbook',",
    "pullRequest.draft !== true",
    "pullRequest.title?.startsWith('[maintainer-doc]')",
    "## Source, authorship, and license",
    "## Safety and external effects",
    "## Security review",
    "## Change class",
    "## Contribution route and review request",
    "## Validation and evidence",
    "## Unverified and out of scope",
    "## Status claim",
    "pathParts[0] !== 'book'",
    "pathParts.some((part) => part === '' || part === '.' || part === '..' || part.includes('\\\\'))",
    "!file.filename.toLowerCase().endsWith('.md')",
    "const maxFiles = 25",
    "const maxChangedLines = 1500",
    "file.status",
    "entry.mode === '120000'",
    "review.commit_id === headSha",
    "pulls.createReview",
    "Recheck pull-request head before enabling auto-merge",
    "pullRequest.head?.sha !== expectedHeadSha",
    "pullRequest.base?.repo?.full_name !== `${owner}/${repo}`",
    "requiredBodyMarkers.some((marker) => !pullRequest.body?.includes(marker))",
    "steps.recheck.outcome == 'success'",
    "peter-evans/enable-pull-request-automerge@a660677d5469627102a1c1e11409dd063606628d",
    "merge-method: squash",
    "This is a workflow signal, not an independent human review.",
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
    "host_deployment_environment",
    "host_security_controls",
    "sources",
}
REQUIRED_PR_HEADINGS = {
    "## Source, authorship, and license",
    "## Safety and external effects",
    "## Security review",
    "## Change class",
    "## Contribution route and review request",
    "## Tracking and summary",
    "## Implementation or editorial approach",
    "## Contribution declaration",
    "## AI assistance",
    "## Validation and evidence",
    "## Unverified and out of scope",
    "## Status claim",
    "## Checklist",
}
PULL_REQUEST_CONTRACT_REQUIRED_FRAGMENTS = (
    "pull_request:",
    "pull-requests: read",
    "gh api --paginate --slurp",
    "EXPECTED_HEAD_SHA",
    "ROLLOUT_CUTOFF_AT",
    "Signed-off-by:",
    "required_headings =",
    "created_time < cutoff_time",
    "verification = (commit.get(\"commit\") or {}).get(\"verification\")",
    "verification.get(\"verified\") is not True",
    "verification.get(\"reason\") != \"valid\"",
    "legacy migration requires a valid GitHub cryptographic signature",
    "PR_CONTRACT_MIGRATION_OK",
    "branch_sync_authors = {\"uuzzrm\", \"Prysai-Lab\"}",
    "branch_sync_committer = \"web-flow\"",
    "parents[1].get(\"sha\") == base.get(\"sha\")",
    "and committer.get(\"login\") == branch_sync_committer",
    "branch_sync_headline = re.compile",
    "branch_sync_exemptions",
    "PR_CONTRACT_OK",
)


def relative(path: Path) -> str:
    """Return a stable label for repository files and test fixtures alike.

    Production scans normally receive paths from ``git ls-files`` and therefore
    stay under ``ROOT``.  Unit tests also pass isolated temporary fixtures so
    they can exercise the scanner without mutating the checkout.  Keep those
    diagnostics readable instead of raising before the policy can inspect the
    fixture.
    """
    try:
        return path.relative_to(ROOT).as_posix()
    except ValueError:
        return f"<outside-repository>/{path.name}"


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
        errors.append("policy status must remain candidate until the declared evidence supports promotion")

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
            "secrets context in untrusted pull_request workflows",
            "write-scoped token permissions on untrusted pull_request workflows; any write-scoped workflow_run exception must be explicitly listed below",
            "persisted checkout credentials on pull_request workflows",
        }
        if not isinstance(forbidden, list) or not required_forbidden.issubset(forbidden):
            errors.append("automation must explicitly forbid unsafe pull-request workflow features")
        controlled_permissions = automation.get("controlled_pr_write_permissions")
        expected_controlled_permissions = [
            {
                "workflow_path": ".github/workflows/codeql.yml",
                "permissions": CODEQL_PR_ALLOWED_PERMISSIONS,
                "reason": "CodeQL must upload its own pull-request analysis results without receiving any other write scope",
            },
            {
                "workflow_path": ".github/workflows/maintainer-pr-automerge.yml",
                "permissions": MAINTAINER_AUTOMERGE_ALLOWED_PERMISSIONS,
                "reason": "A trusted workflow_run may submit a clearly labeled bot approval and enable native squash auto-merge only for the explicit uuzzrm or Prysai-Lab book-Markdown route",
            },
        ]
        if controlled_permissions != expected_controlled_permissions:
            errors.append("automation must declare the exact controlled write-permission exceptions")

    host_ruleset = policy.get("host_ruleset")
    if not isinstance(host_ruleset, dict) or host_ruleset.get("status") != "active":
        errors.append("host_ruleset must honestly record the currently active host Ruleset")
    elif host_ruleset.get("bypass_list") != []:
        errors.append("host_ruleset.bypass_list must record the verified empty bypass list")
    else:
        if host_ruleset.get("required_status_checks") != list(REQUIRED_HOST_STATUS_CHECKS):
            errors.append(
                "host_ruleset.required_status_checks must require candidate-evidence, "
                "repository-security, and pull-request-contract"
            )
        if host_ruleset.get("strict_required_status_checks") is not True:
            errors.append("host_ruleset.strict_required_status_checks must be true")

    deployment_environment = policy.get("host_deployment_environment")
    if not isinstance(deployment_environment, dict):
        errors.append("host_deployment_environment must record the protected Docs environment")
    else:
        if deployment_environment.get("name") != "docs-prysai-production":
            errors.append("host_deployment_environment.name must be docs-prysai-production")
        if deployment_environment.get("required_reviewers") != ["uuzzrm"]:
            errors.append("host_deployment_environment.required_reviewers must be exactly uuzzrm")
        if deployment_environment.get("can_admins_bypass") is not False:
            errors.append("host_deployment_environment.can_admins_bypass must be false")
        if deployment_environment.get("deployment_branch_policy") != "custom":
            errors.append("host_deployment_environment.deployment_branch_policy must be custom")
        if deployment_environment.get("allowed_branches") != ["main"]:
            errors.append("host_deployment_environment.allowed_branches must be exactly main")

    host_controls = policy.get("host_security_controls")
    if not isinstance(host_controls, dict):
        errors.append("host_security_controls must record live repository security settings")
    else:
        if host_controls.get("secret_scanning") != "enabled":
            errors.append("host_security_controls.secret_scanning must be enabled")
        if host_controls.get("secret_scanning_push_protection") != "enabled":
            errors.append("host_security_controls.secret_scanning_push_protection must be enabled")
        if host_controls.get("secret_scanning_non_provider_patterns") != "disabled":
            errors.append("host_security_controls.secret_scanning_non_provider_patterns must record disabled")
        actions = host_controls.get("actions")
        if not isinstance(actions, dict) or actions.get("sha_pinning_required") is not True:
            errors.append("host_security_controls.actions.sha_pinning_required must be true")

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
    for action_pin in LEGACY_NODE20_ACTION_PINS:
        if action_pin in text:
            errors.append(f"{label}: legacy Node.js 20 Action pin must be upgraded: {action_pin}")
    if PULL_REQUEST_TARGET_RE.search(text):
        errors.append(f"{label}: pull_request_target is forbidden by the repository policy")
    # A deployment-only workflow may need a scoped secret on a protected push.
    # The untrusted boundary is a pull-request trigger: there, a secret context
    # could be exposed to contributor-controlled workflow or repository content.
    if PULL_REQUEST_RE.search(text) and SECRETS_CONTEXT_RE.search(text):
        errors.append(f"{label}: pull-request workflow must not reference the secrets context")
    if WORKFLOW_DISPATCH_RE.search(text) and SECRETS_CONTEXT_RE.search(text) and not MAIN_REF_GUARD_RE.search(text):
        errors.append(f"{label}: workflow_dispatch secret use must be gated to refs/heads/main")
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
            if _is_codeql_workflow_label(label):
                if permissions != CODEQL_PR_ALLOWED_PERMISSIONS:
                    errors.append(
                        f"{label}: CodeQL pull-request workflow must declare exactly "
                        "actions: read, contents: read, packages: read, and security-events: write"
                    )
            else:
                if permissions.get("contents") != "read":
                    errors.append(f"{label}: pull-request workflow must grant contents: read")
                if any(scope not in {"contents", "pull-requests"} or level != "read" for scope, level in permissions.items()):
                    errors.append(f"{label}: pull-request workflow may grant only read-only contents or pull-requests permissions")
                if WRITE_PERMISSION_RE.search(text):
                    errors.append(f"{label}: pull-request workflow must not grant write-scoped permissions")
    if WORKFLOW_RUN_RE.search(text) and label != relative(MAINTAINER_AUTOMERGE_WORKFLOW) and WRITE_PERMISSION_RE.search(text):
        errors.append(f"{label}: only the controlled maintainer auto-merge workflow may grant workflow_run write permissions")
    if "actions/checkout@" in text and "persist-credentials: false" not in text:
        errors.append(f"{label}: every checkout must disable persisted checkout credentials")
    return errors


def _is_codeql_workflow_label(label: str) -> bool:
    """Identify the one workflow allowed to upload PR CodeQL results."""

    return label == relative(CODEQL_WORKFLOW)


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


def validate_docs_deploy_workflow(text: str, label: str) -> list[str]:
    """Keep the secret-bearing Docs job limited to the validated artifact."""

    match = re.search(
        r"(?ms)^  docs-prysai-deploy:\s*\n(.*?)(?=^  [A-Za-z0-9_-]+:\s*$|\Z)",
        text,
    )
    if not match:
        return [f"{label}: missing docs-prysai-deploy job"]
    job = match.group(0)
    errors = []
    for fragment in DOCS_DEPLOY_REQUIRED_FRAGMENTS:
        if fragment not in job:
            errors.append(f"{label}: Docs deployment must retain artifact boundary: {fragment}")
    for fragment in DOCS_DEPLOY_FORBIDDEN_FRAGMENTS:
        if fragment in job:
            errors.append(f"{label}: Docs deployment must not execute source/build code beside its secret: {fragment}")
    permissions_match = re.search(
        r"(?ms)^    permissions:\s*\n(?P<body>(?:^      [a-z-]+:\s*[a-z-]+\s*$\n?)+)",
        job,
    )
    if not permissions_match:
        errors.append(f"{label}: Docs deployment must declare exactly actions: read permissions")
    else:
        permissions = dict(
            re.findall(
                r"^      ([a-z-]+):\s*([a-z-]+)\s*$",
                permissions_match.group("body"),
                re.MULTILINE,
            )
        )
        if permissions != DOCS_DEPLOY_ALLOWED_PERMISSIONS:
            errors.append(f"{label}: Docs deployment must declare exactly actions: read permissions")
    return errors


def validate_pages_candidate_artifact(text: str, label: str) -> list[str]:
    """Keep the review artifact complete, including the validated .nojekyll file."""

    errors = []
    for fragment in PAGES_CANDIDATE_ARTIFACT_REQUIRED:
        if fragment not in text:
            errors.append(f"{label}: Pages candidate artifact must include hidden files: {fragment}")
    return errors


def validate_pages_post_merge_orchestration(text: str, label: str) -> list[str]:
    """Keep every main push deployable without cross-surface queue blocking."""

    errors = []
    if re.search(r"(?m)^concurrency:\s*$", text):
        errors.append(f"{label}: Pages workflow must not use workflow-wide concurrency")
    for fragment in PAGES_POST_MERGE_REQUIRED_FRAGMENTS:
        if fragment not in text:
            errors.append(f"{label}: post-merge publication contract is missing: {fragment}")

    push_match = re.search(
        r"(?ms)^  push:\s*\n(?P<body>.*?)(?=^  workflow_dispatch:\s*$|^permissions:\s*$|\Z)",
        text,
    )
    if not push_match:
        errors.append(f"{label}: Pages workflow must define a push trigger for main")
    else:
        push_body = push_match.group("body")
        if not re.search(r"(?m)^    branches:\s*\[main\]\s*$", push_body):
            errors.append(f"{label}: Pages push trigger must target main")
        if re.search(r"(?m)^    paths(?:-ignore)?:\s*$", push_body):
            errors.append(f"{label}: Pages push trigger must not filter paths after a merge")

    if text.count("group: docs-prysai-production") < 1:
        errors.append(f"{label}: Docs publication must use the protected serialized host group")
    return errors


def validate_codeql_workflow(text: str, label: str) -> list[str]:
    """Keep CodeQL analysis pinned, secret-free, and limited to trusted refs."""

    errors = []
    for fragment in CODEQL_REQUIRED_FRAGMENTS:
        if fragment not in text:
            errors.append(f"{label}: CodeQL workflow is missing required boundary: {fragment}")
    if PULL_REQUEST_RE.search(text):
        permission_match = PERMISSIONS_BLOCK_RE.search(text)
        permissions = dict(PERMISSION_LINE_RE.findall(permission_match.group(0))) if permission_match else {}
        if permissions != CODEQL_PR_ALLOWED_PERMISSIONS:
            errors.append(
                f"{label}: CodeQL pull-request workflow must declare exactly "
                "actions: read, contents: read, packages: read, and security-events: write"
            )
    if SECRETS_CONTEXT_RE.search(text):
        errors.append(f"{label}: CodeQL workflow must not reference the secrets context")
    if "persist-credentials: false" not in text:
        errors.append(f"{label}: CodeQL checkout must disable persisted credentials")
    return errors


def validate_maintainer_automerge_workflow(text: str, label: str) -> list[str]:
    """Keep the only approval/auto-merge workflow narrow and auditable."""

    errors = []
    if not WORKFLOW_RUN_RE.search(text):
        errors.append(f"{label}: maintainer auto-merge workflow must use workflow_run")
    for fragment in MAINTAINER_AUTOMERGE_REQUIRED_FRAGMENTS:
        if fragment not in text:
            errors.append(f"{label}: maintainer auto-merge workflow is missing required boundary: {fragment}")
    permission_match = re.search(
        r"(?ms)^permissions:\s*\n(?P<body>(?:^  [a-z-]+:\s*[a-z-]+\s*$\n?)+)",
        text,
    )
    permissions = dict(PERMISSION_LINE_RE.findall(permission_match.group("body"))) if permission_match else {}
    if permissions != MAINTAINER_AUTOMERGE_ALLOWED_PERMISSIONS:
        errors.append(
            f"{label}: maintainer auto-merge workflow must declare exactly "
            "actions: read, contents: write, and pull-requests: write"
        )
    return errors


def validate_pull_request_contract_workflow(text: str, label: str) -> list[str]:
    """Keep the contributor contract check read-only and metadata-based."""

    errors = []
    for fragment in PULL_REQUEST_CONTRACT_REQUIRED_FRAGMENTS:
        if fragment not in text:
            errors.append(f"{label}: pull-request contract workflow is missing required boundary: {fragment}")
    if WRITE_PERMISSION_RE.search(text) or SECRETS_CONTEXT_RE.search(text):
        errors.append(f"{label}: pull-request contract workflow must not use write permissions or secrets")
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
    if not PAGES_WORKFLOW.is_file():
        errors.append("missing .github/workflows/pages.yml")
    else:
        pages_text = PAGES_WORKFLOW.read_text(encoding="utf-8")
        errors.extend(validate_docs_deploy_workflow(pages_text, relative(PAGES_WORKFLOW)))
        errors.extend(validate_pages_candidate_artifact(pages_text, relative(PAGES_WORKFLOW)))
        errors.extend(validate_pages_post_merge_orchestration(pages_text, relative(PAGES_WORKFLOW)))
    if not CODEQL_WORKFLOW.is_file():
        errors.append("missing .github/workflows/codeql.yml")
    else:
        errors.extend(validate_codeql_workflow(CODEQL_WORKFLOW.read_text(encoding="utf-8"), relative(CODEQL_WORKFLOW)))
    if not MAINTAINER_AUTOMERGE_WORKFLOW.is_file():
        errors.append("missing .github/workflows/maintainer-pr-automerge.yml")
    else:
        errors.extend(
            validate_maintainer_automerge_workflow(
                MAINTAINER_AUTOMERGE_WORKFLOW.read_text(encoding="utf-8"),
                relative(MAINTAINER_AUTOMERGE_WORKFLOW),
            )
        )
    if not PULL_REQUEST_CONTRACT_WORKFLOW.is_file():
        errors.append("missing .github/workflows/pull-request-contract.yml")
    else:
        errors.extend(
            validate_pull_request_contract_workflow(
                PULL_REQUEST_CONTRACT_WORKFLOW.read_text(encoding="utf-8"),
                relative(PULL_REQUEST_CONTRACT_WORKFLOW),
            )
        )
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
    # `git ls-files -c` also reports tracked paths deleted in the working tree.
    # They are not candidate bytes to scan; skip them so a deliberate removal
    # does not turn the security check into a false failure.
    files = [
        ROOT / Path(value)
        for value in result.stdout.decode("utf-8", errors="replace").split("\0")
        if value and (ROOT / Path(value)).is_file()
    ]
    return files, []


def secret_scan(paths: list[Path]) -> list[str]:
    errors: list[str] = []
    for path in paths:
        name = path.name.casefold()
        suffix = path.suffix.casefold()
        label = relative(path) if path.is_relative_to(ROOT) else path.name
        if name in FORBIDDEN_FILENAMES or suffix in FORBIDDEN_SUFFIXES or (name.startswith(".env") and name != ".env.example"):
            errors.append(f"{label}: credential-shaped file must not be tracked")
            continue
        try:
            if path.stat().st_size > MAX_TEXT_SCAN_BYTES:
                errors.append(
                    f"{label}: text file exceeds the repository security scan limit; split or explicitly review it"
                )
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
    if not DCO_PATH.is_file():
        errors.append("missing DCO.md")
    else:
        dco = DCO_PATH.read_text(encoding="utf-8")
        for fragment in ("Developer Certificate of Origin", "https://developercertificate.org/", "Signed-off-by:"):
            if fragment not in dco:
                errors.append(f"DCO.md is missing {fragment}")
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
        "host_ruleset=active"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
