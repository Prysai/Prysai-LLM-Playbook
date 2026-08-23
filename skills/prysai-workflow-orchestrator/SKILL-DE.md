<!-- content_id: prysai-workflow-orchestrator | locale: DE | language: de | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-workflow-orchestrator
description: >
  Komplexe Codex-Arbeit über Definition, Task Protocol, Planung, inkrementelle
  Ausführung, Verifikation, Review, Lieferung und Wartung orchestrieren.
  Verwenden Sie den Skill, wenn eine Anfrage mehrere Schritte, Dateien,
  Werkzeuge, Domänen oder Checkpoints umfasst oder eine End-to-End-Lieferung
  verlangt. Nicht für eine einzelne begrenzte Aktion, eine Lernerklärung, ein
  selbstständiges Evidenz-Audit oder eine einmalige Forschungsfrage verwenden.
---

# Workflow-Orchestrator

Halten Sie einen endlichen, auditierbaren Lebenszyklus aufrecht. Dieser Skill
koordiniert Phasen; er erteilt keine Berechtigungen, ersetzt kein Fachurteil
und erklärt keine Phase für abgeschlossen, die er nicht geprüft hat.

## Auslösegrenze und Übergabe

Übernehmen Sie Arbeit mit mindestens zwei abhängigen Phasen oder mit Bedarf an
Checkpoints, Wiederherstellung, mehreren Artefakten oder domänenübergreifender
Koordination.

Geben Sie ab, wenn:

- ein `$skill` für eine begrenzte Teilaufgabe ausdrücklich genannt wird:
  Tragen Sie ihn als Phase ein und bewahren Sie seinen Scope;
- es sich um eine einzelne unklare Aktion handelt: zuerst Task Protocol;
- nur gelehrt werden soll: Codex Coach;
- nur Evidenz geprüft werden soll: Evidence Review;
- nur Quellen entdeckt oder synthetisiert werden sollen: Research Router;
- nur Skills gewählt werden sollen: Skill Selector;
- nur ein gemeinsamer Positionierungskontext erstellt werden soll: Product
  Context.

Die einzige zulässige interne Übergabeschleife lautet `orchestrator -> task
protocol -> one domain route -> evidence review -> orchestrator checkpoint`.
Rufen Sie den Orchestrator nicht aus einer Phase heraus auf und starten Sie
keine abgeschlossene Phase ohne neue Erkenntnis oder Scope-Änderung neu.

## Erforderliche Eingaben und Umgang mit Lücken

Verlangen Sie `outcome`, `non_goals`, `stages`, `dependencies`,
`allowed_actions`, `acceptance_evidence`, `checkpoints`, `rollback` und `owner`.
Sind Phasen oder Abhängigkeiten unklar, geben Sie einen Vorschlagsplan mit
`blocked_on`-Feldern zurück. Der Vertrag muss außerdem `decision_owner`, ein
exaktes `delivery_target` und die Bedeutung jedes `commit`-Schritts benennen:
lokaler Commit, Push, Pull Request und Veröffentlichung sind verschiedene
Aktionen mit verschiedenen Bestätigungsgates. Fragen Sie nur das kleinste, das
Route oder Risiko verändert.

Bevor eine Phase `in-progress` erhält, erfassen Sie:

```yaml
owner: "role or named maintainer"
input_and_action: "fixed input and allowed action"
exit_evidence: "observable file, log, command, review, or URL"
checkpoint: "who may approve the next stage and what is checked"
rollback: "exact diff, copy, branch, or target to restore"
risk: "R0 | R1 | R2 | R3"
confirmation: "required | not_required; state the decision point"
```

Fehlendes `delivery_target`, Owner, Abnahmebeleg oder Rückbauziel ist eine
Ausführungssperre und keine Erlaubnis, ein Ziel zu erraten.

## Lebenszyklus und Checkpoints

1. Definieren Sie Ergebnis, Nutzer, Nichtziele, Risiken und Abnahmekriterien.
2. Erstellen oder validieren Sie das Task Protocol genau einmal.
3. Teilen Sie die Arbeit in reversible vertikale Phasen mit Owner und Evidenz.
4. Führen Sie jeweils eine Phase aus und bewahren Sie Diffs, Logs und Run-IDs.
5. Prüfen Sie jeden Claim mit passendem Test, Runtime-, Browser-, Quellen-,
   Sicherheits-, Visual- oder menschlichem Beleg.
6. Reviewen Sie Scope, Annahmen, Wartbarkeit und Fehlerpfade.
7. Liefern Sie abgeschlossene, unvollständige, abgeleitete, blockierte und
   nächste Punkte getrennt.
8. Dokumentieren Sie Wartung, Quellenaktualisierung, Migration und Rückbau.

Das Lieferziel gehört in den Phasengraphen. Lokaler Commit, Push auf eine
gemeinsame Branch, Pull Request und öffentliche Release sind getrennte Phasen,
wenn mehr als eine dieser Aktionen verlangt ist.

## Risiken, Nebenwirkungen und Bestätigung

Klassifizieren Sie jede Phase als `R0` lesend, `R1` lokal und reversibel, `R2`
geteilt oder extern oder `R3` produktiv, irreversibel, geheimnistragend oder
mit weitreichendem Zugriff. Halten Sie vor Berechtigungserweiterung,
Secret-Zugriff, externer Nachricht, Commit/Push/Veröffentlichung,
Produktionsänderung oder irreversibler Aktion an. Der Nutzer muss die genaue
Phase, das Ziel und die Nebenwirkung bestätigen; eine fremde frühere
Bestätigung wird nicht übernommen.

## Harte Stopps und Wiederherstellung

Stoppen Sie mit `blocked` bei ungeklärtem Owner, fehlender Abnahme, unsicherem
Ziel, widersprüchlichen Anweisungen, fehlgeschlagenem Rückbau, verlorener
Evidenz oder wiederholtem Fehler ohne neue Hypothese. Bewahren Sie den Fehler,
verkleinern Sie den Scope, ändern Sie evidenzbasiert eine Sache und führen Sie
nur die passende Prüfung erneut aus. Erweitern Sie niemals Berechtigungen und
versuchen Sie nicht endlos weiter.

## Festgelegte Ausgabe

Geben Sie genau Folgendes zurück:

1. `outcome_and_scope`
2. `stage_graph_and_current_stage`
3. `checkpoint_log`
4. `actions_and_permissions`
5. `evidence_by_stage`
6. `failures_recovery_and_rollback`
7. `completed_incomplete_inferred_blocked`
8. `handoffs`
9. `risks_and_unknowns`
10. `content_status`

## Evidenz- und Statuszuordnung

Verwenden Sie für Phasen `not-started`, `in-progress`, `blocked`, `verified`
oder `accepted`. Gesamtstatus ist `practice` für Exploration, `candidate` bei
strukturiertem Workflow und bestandenen Basiskontrollen, `verified` mit Beleg
für jede erklärte Phase und Grenzsituation und `production-ready` erst nach
Release-, Security-, Ownership-, Wartungs- und Rückbaugates.

## Wartungseintrag

- `source`: `docs/book-architecture.md`; `docs/charter.md`;
  `docs/quality/skill-quality-standard.md`
- `license`: ursprüngliche Überarbeitung; externe Inhalte bleiben unter
  `docs/sources/asset-register.md` Referenzmaterial
- `owner`: workflow-systems maintainer
- `version`: `0.2.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
