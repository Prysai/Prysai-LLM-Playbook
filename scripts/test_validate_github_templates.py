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

        fixture_repository = "Prysai/Example-Repository"
        require(templates.repository_from_remote_url(f"https://github.com/{fixture_repository}.git") == fixture_repository, "HTTPS origin was not parsed")
        require(templates.repository_from_remote_url(f"git@github.com:{fixture_repository}.git") == fixture_repository, "SSH origin was not parsed")
        require(templates.repository_from_remote_url(f"https://example.com/{fixture_repository}.git") is None, "non-GitHub origin was accepted")
        repository, error = templates.resolve_repository({"GITHUB_REPOSITORY": fixture_repository})
        require(repository == fixture_repository and error is None, "documented repository override was rejected")
        fixtures += 4

        config_path = templates.ISSUE_DIR / "config.yml"
        require(
            not templates.validate_config(config_path, "Prysai/Prysai-LLM-Playbook"),
            "current contact links were rejected for the canonical repository",
        )
        require(
            any(
                "must stay inside" in error
                for error in templates.validate_config(config_path, "Prysai/Other-Repository")
            ),
            "contact links accepted a different repository",
        )
        fixtures += 2

        valid_pr = templates.PR_TEMPLATE.read_text(encoding="utf-8")
        require(not templates.validate_pr_template_text(valid_pr), "current pull-request template was rejected")
        require(
            any("contribution-route text" in error for error in templates.validate_pr_template_text(valid_pr.replace("Fast material review", ""))),
            "pull-request template accepted a missing fast-route declaration",
        )
        valid_codeowners = templates.CODEOWNERS.read_text(encoding="utf-8")
        require(not templates.validate_codeowners_text(valid_codeowners), "current CODEOWNERS routing was rejected")
        require(
            any("evals/contributions" in error for error in templates.validate_codeowners_text(valid_codeowners.replace("/evals/contributions/ @Prysai-Lab", ""))),
            "CODEOWNERS accepted a missing evidence route",
        )
        require(not templates.validate_dco(), "current DCO policy was rejected")
        require(
            templates.validate_dco_path(Path("missing-DCO.md")) == ["missing missing-DCO.md"],
            "missing DCO policy was accepted",
        )
        with TemporaryDirectory(prefix="dco-fixture-") as temporary:
            dco = Path(temporary) / "DCO.md"
            dco.write_text("Developer Certificate of Origin\n", encoding="utf-8")
            require(any("Signed-off-by:" in error for error in templates.validate_dco_path(dco)), "incomplete DCO policy was accepted")
            dco.write_text(
                "Developer Certificate of Origin\nhttps://developercertificate.org/\n"
                "Signed-off-by:\nverified GitHub commit signature\nCLA\n",
                encoding="utf-8",
            )
            require(not templates.validate_dco_path(dco), "complete DCO policy fixture was rejected")
        fixtures += 7

        token = "fixture-secret-token"
        seen_authorization: list[str] = []

        def successful_open(request: object, timeout: int) -> Response:
            require(timeout == 15, "remote request timeout changed")
            seen_authorization.append(request.get_header("Authorization"))
            return Response([{"name": "field-report"}])

        labels, errors = templates.fetch_remote_labels(fixture_repository, token, successful_open)
        require(not errors and labels == {"field-report"}, "remote labels response was not accepted")
        require(seen_authorization == [f"Bearer {token}"], "remote request did not use the supplied token")
        fixtures += 1

        def failing_open(request: object, timeout: int) -> Response:
            raise urllib.error.HTTPError(request.full_url, 401, "Unauthorized", {}, io.BytesIO())

        _labels, errors = templates.fetch_remote_labels(fixture_repository, token, failing_open)
        require(errors == ["GitHub labels request failed with HTTP 401"], "HTTP failure was not clean")
        require(token not in " ".join(errors), "token leaked into remote error")
        require(templates.validate_remote_labels(["field-report"], {}) == ["--check-remote requires GITHUB_TOKEN or GH_TOKEN"], "missing token was not rejected")
        mismatch = templates.validate_remote_labels(
            ["field-report"],
            {"GITHUB_TOKEN": token},
            resolve=lambda _environ: (fixture_repository, None),
            fetch=lambda _repository, _token: ({"bug"}, []),
        )
        require(mismatch == [f"declared field-report label does not exist in {fixture_repository}: field-report"], "missing remote label was accepted")
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
