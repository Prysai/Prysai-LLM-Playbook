"""Focused fixtures for GitHub template static and remote validation."""

from __future__ import annotations

import io
import json
import urllib.error
from pathlib import Path
from tempfile import TemporaryDirectory

import validate_github_templates as templates


CONTRACT = """# Public beta feedback contract

Status: Candidate. Participation is voluntary.

## Data minimization

Do not submit secrets or private data.

Reports are not automatically accepted or published as curriculum.
One report does not establish a root cause, prevalence, or verified fix.
"""


class Response:
    def __init__(self, payload: object) -> None:
        self.payload = json.dumps(payload).encode("utf-8")

    def __enter__(self) -> "Response":
        return self

    def __exit__(self, *_args: object) -> None:
        return None

    def read(self) -> bytes:
        return self.payload


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    fixtures = 0
    try:
        with TemporaryDirectory(prefix="github-template-fixture-") as temporary:
            root = Path(temporary)
            issue_form = root / "field-report.yml"
            issue_form.write_text("labels: []\n", encoding="utf-8")
            labels, errors = templates.declared_labels(issue_form)
            require(not labels and any("non-empty list" in error for error in errors), "empty declared labels were accepted")
            issue_form.write_text('labels: ["field-report"]\n', encoding="utf-8")
            labels, errors = templates.declared_labels(issue_form)
            require(labels == ["field-report"] and not errors, "valid declared labels were rejected")
            fixtures += 2

            contract = root / "contract.md"
            require(templates.validate_feedback_contract(contract) == [f"missing {contract}"], "missing contract was accepted")
            fixtures += 1
            contract.write_text(CONTRACT, encoding="utf-8")
            require(not templates.validate_feedback_contract(contract), "complete Candidate contract was rejected")
            contract.write_text(CONTRACT.replace("root cause, prevalence, or verified fix", "general conclusions"), encoding="utf-8")
            require(any("single-report evidence limit" in error for error in templates.validate_feedback_contract(contract)), "evidence boundary omission was accepted")
            fixtures += 2

        require(templates.repository_from_remote_url("https://github.com/Prysai/Codex-Field-Guide.git") == "Prysai/Codex-Field-Guide", "HTTPS origin was not parsed")
        require(templates.repository_from_remote_url("git@github.com:Prysai/Codex-Field-Guide.git") == "Prysai/Codex-Field-Guide", "SSH origin was not parsed")
        require(templates.repository_from_remote_url("https://example.com/Prysai/Codex-Field-Guide.git") is None, "non-GitHub origin was accepted")
        repository, error = templates.resolve_repository({"GITHUB_REPOSITORY": "Prysai/Codex-Field-Guide"})
        require(repository == "Prysai/Codex-Field-Guide" and error is None, "documented repository override was rejected")
        fixtures += 4

        token = "fixture-secret-token"
        seen_authorization: list[str] = []

        def successful_open(request: object, timeout: int) -> Response:
            require(timeout == 15, "remote request timeout changed")
            seen_authorization.append(request.get_header("Authorization"))
            return Response([{"name": "field-report"}])

        labels, errors = templates.fetch_remote_labels("Prysai/Codex-Field-Guide", token, successful_open)
        require(not errors and labels == {"field-report"}, "remote labels response was not accepted")
        require(seen_authorization == [f"Bearer {token}"], "remote request did not use the supplied token")
        fixtures += 1

        def failing_open(request: object, timeout: int) -> Response:
            raise urllib.error.HTTPError(request.full_url, 401, "Unauthorized", {}, io.BytesIO())

        _labels, errors = templates.fetch_remote_labels("Prysai/Codex-Field-Guide", token, failing_open)
        require(errors == ["GitHub labels request failed with HTTP 401"], "HTTP failure was not clean")
        require(token not in " ".join(errors), "token leaked into remote error")
        require(templates.validate_remote_labels(["field-report"], {}) == ["--check-remote requires GITHUB_TOKEN or GH_TOKEN"], "missing token was not rejected")
        mismatch = templates.validate_remote_labels(
            ["field-report"],
            {"GITHUB_TOKEN": token},
            resolve=lambda _environ: ("Prysai/Codex-Field-Guide", None),
            fetch=lambda _repository, _token: ({"bug"}, []),
        )
        require(mismatch == ["declared field-report label does not exist in Prysai/Codex-Field-Guide: field-report"], "missing remote label was accepted")
        require(token not in " ".join(mismatch), "token leaked into label mismatch")
        fixtures += 3
    except (AssertionError, OSError, UnicodeError) as exc:
        print("GITHUB_TEMPLATE_VALIDATOR_TESTS_FAILED")
        print(f"- {exc}")
        return 1
    print(f"GITHUB_TEMPLATE_VALIDATOR_TESTS_OK fixtures={fixtures} remote=mocked candidate_boundary=checked")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
