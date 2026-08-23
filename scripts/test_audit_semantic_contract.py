"""Fixtures for the semantic contract audit."""

from __future__ import annotations

import audit_semantic_contract as audit


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    matrix = {
        "content": [
            {
                "content_id": "chapter-fixture",
                "kind": "chapter",
                "locales": {
                    "EN": {"path": "README.md"},
                    "FR": {"path": "README.md"},
                },
            }
        ]
    }
    # Unit-level checks avoid depending on a repository file during the test.
    complete = """
## Objectifs d’apprentissage
## Expérience
## Échec et limite
## Preuves
## Liste de contrôle d’acceptation
## Transfert
## Sources et limite de mise à jour
<!-- chapter-navigation:start -->
"""
    missing = complete.replace("## Sources et limite de mise à jour\n", "")
    required = {group.name for group in audit.GROUPS["chapter"]}
    found = {group.name for group in audit.GROUPS["chapter"] if audit.has_group(complete, group)}
    require(found == required, f"complete fixture lost groups: {required - found}")
    missing_names = [group.name for group in audit.GROUPS["chapter"] if not audit.has_group(missing, group)]
    require(missing_names == ["sources"], f"missing source was not reported: {missing_names}")
    require(audit.headings(complete) == 7, "heading count changed unexpectedly")

    # A localized Lab may use a translated acceptance heading without a
    # checkbox, while only the two public entry Labs require an embedded
    # navigation block. Reader pagination covers the remaining Labs.
    require(audit.ACCEPTANCE_RE.search("## Liste de contrôle d’acceptation"), "French acceptance heading not recognized")
    require("lab-002-task-protocol" not in audit.EMBEDDED_NAVIGATION_REQUIRED, "non-entry Lab incorrectly requires embedded navigation")
    require("lab-001-first-safe-task" in audit.EMBEDDED_NAVIGATION_REQUIRED, "first Lab entry navigation is not protected")

    # Deep concept checks are intentionally separate from the ordinary
    # contract gate. They should recognise a natural localized label and
    # report a genuinely absent concept without requiring English headings.
    lab006_groups = {group.name: group for group in audit.DEEP_CONTRACTS["lab-006-agent-stop-conditions"]}
    localized_lab006 = """
events.yaml run-record.yaml handoff.md
## Cinq branches bornées
### Réponse perdue : réconcilier avant de reprendre
## Revue des preuves
## Transfert
## Sources et limites
"""
    require(audit.has_group(localized_lab006, lab006_groups["event_trace"]), "localized event trace was not recognised")
    require(audit.has_group(localized_lab006, lab006_groups["run_record"]), "localized run record was not recognised")
    require(audit.has_group(localized_lab006, lab006_groups["lost_response"]), "localized lost-response branch was not recognised")
    require(audit.has_group(localized_lab006, lab006_groups["transfer"]), "localized transfer was not recognised")
    require("evidence_to_keep" in {group.name for group in audit.DEEP_CONTRACTS["lab-013-l3-vertical-slice"]}, "deep contract lost evidence group")
    print("SEMANTIC_CONTRACT_AUDIT_TESTS_OK fixtures=3")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
