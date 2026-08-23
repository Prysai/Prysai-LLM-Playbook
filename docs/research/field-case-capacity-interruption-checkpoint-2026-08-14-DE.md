<!-- content_id: field-case-capacity-interruption-checkpoint-2026-08-14 | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: field-case-capacity-interruption-checkpoint-2026-08-14.md | source_revision: 2026-08-23 -->

# Praxisfall: Vor dem Wiederholen einer unterbrochenen Aufgabe pausieren

## Hier beginnen: Die Unterbrechung nicht unsichtbar machen

Wenn das gewählte Modell nicht verfügbar ist, möchte man schnell den nächsten Prompt senden, etwas umstellen oder annehmen, die Aufgabe sei fast fertig. Erst pausieren. Vor einem neuen Versuch einen kleinen Prüfpunkt anlegen, der Wissen und Hoffnung trennt:

1. das Ziel in einem Satz aufschreiben;
2. das letzte tatsächlich prüfbare Artefakt behalten: Diff, Testergebnis, Notiz oder ausdrücklich kein Artefakt;
3. jedes fehlende Ergebnis als `unknown` markieren, statt die Lücke beruhigend zu erzählen;
4. erst dann genau einen begrenzten nächsten Schritt wählen, wenn der vorherige Zustand als vollständig, teilweise oder unbekannt eingeordnet ist.

Diese Seite ist eine Offline-Entscheidungsübung. Sie sendet keinen Prompt, wiederholt oder wechselt kein Modell, prüft kein Konto und legt nicht fest, wie sich ein Anbieter verhält. Die bescheidene Regel lautet: Eine Unterbrechung braucht einen prüfbaren Beleg, bevor daraus eine neue Aufgabe wird.

![Unterbrechungsprüfpunkt: vor einem neuen Prompt pausieren, Bekanntes und Unbekanntes festhalten und eine begrenzte Entscheidung wählen.](../../assets/teaching/interruption-checkpoint-card-red-black.svg)

## Fallidentität

- `case_id`: `FC-CAPACITY-01`
- `title`: Vor dem Wiederholen einer unterbrochenen Aufgabe pausieren
- `problem`: Eine Aufgabe wird durch eine Meldung über ein nicht verfügbares Modell unterbrochen. Lernende dürfen ein unbeobachtetes Ergebnis nicht als erledigte Aufgabe behandeln.
- `audience`: Einsteiger und Reviewer auf einer modellgestützten Arbeitsoberfläche
- `collected_at`: 2026-08-14
- `owner`: research-maintainer
- `content_status`: `candidate`
- `related_chapters`: Kapitel 6; Kapitel 9; Kapitel 19
- `related_labs`: Lab 001; Lab 013
- `related_skills`: Interruption Checkpoint; Task Protocol; Evidence Review; LLM Comparison Protocol
- `related_evaluations`: `three-task-smoke-v1`, Status `not_run`

## Quellenprotokoll

- `source_type`: `github_issue`
- `source_url`: https://github.com/openai/codex/issues/33865
- `source_title`: Öffentlicher Bericht über ein nicht verfügbares ausgewähltes Modell
- `source_author_or_publisher`: öffentlicher Autor einer GitHub-Issue
- `accessed_at`: 2026-08-14, dokumentiert im [Feldsignal zur Modellkapazität](field-signal-model-capacity-budget-2026-08-14.md)
- `source_license_or_usage_boundary`: öffentliche Referenzquelle; dieser Fall nutzt eine eigene Zusammenfassung und ein fiktives Offline-Fixture
- `quotation_policy`: Kein Issue-Text, Kommentar, Log, Kontodetail, Modellname, Maschinendetail, Befehlsausgabe, Workaround, Screenshot oder Aufgabeninhalt wird kopiert.
- `source_scope`: Die Issue belegt nur, dass eine Person an einem Datum ein öffentliches Signal über ein nicht verfügbares Modell veröffentlicht hat. Sie belegt weder Ursache, Häufigkeit, aktuelle Verfügbarkeit, Retry-Verhalten, Service-Regel, Queue-Semantik, Fix noch Verhalten auf einer anderen Oberfläche, in einem anderen Konto, Modell oder Anbieter. Das verknüpfte Feldsignal nennt zusätzlich eine offizielle API-Limit-Dokumentation; diese beschreibt nur die API und erklärt den Codex-Bericht nicht automatisch.

## Berichtete Situation

- `user_report_summary`: Ein öffentlicher Issue-Autor berichtet eine kapazitätsbezogene Meldung, die die Nutzung des gewählten Modells in einem bestimmten Kontext verhinderte.
- `observed_symptom`: Laut Quelle war das gewählte Modell nicht verfügbar, bevor ein vollständiges Ergebnis vorlag.
- `expected_behavior`: Der Autor erwartete die Verfügbarkeit des Modells; das ist keine Zusage des Anbieters.
- `official_boundary`: `unknown` für das berichtete Codex-Ereignis. Die verknüpfte API-Dokumentation beschreibt nur ihre eigene Ratenbegrenzung.
- `product_surface`: CLI laut Bericht; hier nicht reproduziert
- `product_version`: in diesem Fall nicht als verifizierte Tatsache etabliert
- `operating_system`: in diesem Fall nicht als verifizierte Tatsache etabliert
- `model_or_provider`: absichtlich ausgelassen; dies ist kein Modellvergleich
- `network_or_auth_context`: nicht untersucht; kein Konto und keine Berechtigung verwendet
- `input_shape`: begrenzte lokale Änderungsaufgabe mit ausdrücklichem Abnahmekriterium
- `risk_level`: `medium`, wenn spätere Prompts auf einen unklaren lokalen Zustand wirken könnten

## Behauptungs- und Evidenztabelle

| Behauptung | Evidenzklasse | Quelle oder Artefakt | Datum | Geltungsbereich | Einschränkung | Status |
|---|---|---|---|---|---|---|
| Eine Person meldete ein nicht verfügbares Modell in einem Codex-Kontext. | `reported` | [GitHub Issue #33865](https://github.com/openai/codex/issues/33865) | 2026-08-14 | Ein datierter öffentlicher Bericht | Keine Reproduktion, Diagnose, Häufigkeitsmessung oder Supportzusage | candidate |
| OpenAIs API-Dokumentation beschreibt Ratenlimits und Antwort-Header seiner API. | `official` | [Rate limits](https://platform.openai.com/docs/guides/rate-limits), begrenzt durch das [Feldsignal](field-signal-model-capacity-budget-2026-08-14.md) | 2026-08-14 | Nur API-Dokumentation | Identifiziert weder die Ursache dieses Berichts noch Codex-Verhalten | candidate |
| Die unterbrochene Aufgabe ist vollständig, teilweise oder sicher fortsetzbar. | `not_observed` | Keine lokale Aufgabe, Wiederholung, Konto-, Modell- oder Artefaktprüfung | 2026-08-14 | Dieses Repository | Fehlende Belege beweisen nicht, dass keine Arbeit stattfand | unverified |
| Vor einem späteren Prompt ist ein expliziter Prüfpunkt zu bewahren. | `project_inference` | Dieser Offline-Fall; Kapitel 6 und 9; `three-task-smoke-v1` | 2026-08-14 | Konservative Lernmethode | Garantiert weder Wiederherstellung noch Kontext und verhindert keine Unterbrechung | candidate |

## Reproduktionsstatus

- `reproduction_status`: `not_run`
- `reproduction_scope`: Das Projekt hat kein Modell ausgewählt, keine Aufgabe gesendet, kein Konto geprüft, keinen Retry ausgeführt, kein Setting geändert und keine Service-Telemetrie abgerufen.
- `fixed_input_or_fixture`: ursprünglicher fiktiver Datensatz aus **Überführung in den Unterricht**
- `logs_or_artifacts`: vom Lernenden erstellter Prüfpunktbeleg nur nach genehmigtem, unabhängig geprüftem Offline-Lauf
- `independent_reviewer`: ausstehend
- `last_checked_at`: 2026-08-14
- `root_cause_status`: `unknown`

## Kleinster sicherer Diagnoseweg

| Schritt | Nur-Lese-Prüfung oder risikoarme Handlung | Erwartete Beobachtung | Stoppregel |
|---|---|---|---|
| 1 | Fiktive Aufgabe stoppen und Ziel, letztes sichtbares Artefakt sowie Abnahmekriterium in einem lokalen Beleg festhalten. | Ziel und unbeobachtetes Ergebnis bleiben getrennt. | Bei unbekanntem Ziel, Artefakttyp oder Kriterium stoppen; keinen weiteren Prompt senden. |
| 2 | Vorherigen Zustand mit dem genannten Artefakt als `complete`, `partial` oder `unknown` klassifizieren. | Fehlende Evidenz bleibt sichtbar. | Ohne Abnahmebeleg niemals `complete` schreiben. |
| 3 | Eine Entscheidung wählen: begrenzte Nur-Lese-Prüfung, neue Aufgabe mit Beleg oder Pause zur aktuellen offiziellen Hilfe/Statusseite. | Der nächste Schritt hat eigene Evidenz und erbt keinen Beweis aus der Unterbrechung. | Vor Retry, Modell- oder Settingwechsel, Ausgaben, Upload oder Erfolgsbehauptung stoppen. |

- `allowed_actions`: diesen fiktiven Fall lesen, lokalen Prüfpunkt schreiben, Evidenz klassifizieren und eine zukünftige Entscheidung benennen
- `forbidden_actions`: Prompt senden, Retry, Modell oder Konfiguration ändern, Konto ansehen, Credits ausgeben, Dateien hochladen, API aufrufen, committen, pushen, veröffentlichen oder Geheimnisse verwenden
- `minimal_safe_probe`: lokaler Prüfpunktbeleg mit fünf Zeilen und ohne echte Produktdaten
- `stop_condition`: letztes Artefakt, seine Abnahmebedeutung oder die Berechtigung für die nächste externe Aktion fehlt
- `rollback_or_cleanup`: unnötigen lokalen fiktiven Beleg löschen; System, Konto und Repository blieben unverändert

## Überführung in den Unterricht

- `learner_problem`: Während ein Anfänger eine kleine Änderung vorbereitet, erscheint eine Meldung über ein nicht verfügbares Modell; er möchte „mach dort weiter, wo du aufgehört hast“ senden.
- `core_concept`: Sichtbare Unterbrechung, Artefakt und erfolgreiche Aufgabe sind drei verschiedene Dinge. Ein neuer Versuch erbt keinen Beleg der vorherigen Aufgabe.
- `decision_to_teach`: Einen Beleg sichern und vor der neuen Aufgabe eine begrenzte Prüfung machen oder pausieren und den aktuellen offiziellen Hilfe-/Statusweg nutzen. Option eins klärt lokale Belege, Option zwei vermeidet weitere Aktivität bei fehlender Autorität oder Evidenz. Keine Option garantiert Kapazität, Wiederherstellung oder Abschluss.
- `smallest_experiment`: Nur diesen fiktiven Datensatz verwenden:

  ```text
  goal: einer lokalen Übungsseite eine Zeile in der Abnahme-Checkliste hinzufügen
  last_visible_event: Meldung über nicht verfügbares Modell erschien
  artifact_available: kein Abschluss, Diff oder Testergebnis wurde geprüft
  tempting_next_action: „mach dort weiter, wo du aufgehört hast“ senden
  ```

  Ohne ein Tool zu öffnen, diesen Prüfpunkt anlegen:

  ```text
  goal: eine Zeile zur Checkliste hinzufügen
  last_accepted_evidence: unknown
  state_classification: unknown
  missing_evidence: Diff oder Dateiansicht und Ergebnis der Checkliste
  next_decision: blocked — diesen Beleg vor jeder neuen Aufgabe bewahren
  external_actions: not_run
  ```

- `intentional_failure`: behaupten, die Zeile sei hinzugefügt, der Retry werde sicher fortsetzen, das Modell sei schlecht oder ein API-Limit habe das Ereignis verursacht.
- `required_artifact`: sechzeiliger Prüfpunkt und ein Satz, warum ein neuer Prompt den vorherigen Abschluss nicht beweist
- `acceptance`: Ziel benennen, `unknown` ohne Artefakt behalten, Ereignis und Abschluss trennen, Ursache und Anbieter nicht behaupten und `external actions: not_run` festhalten.
- `transfer`: denselben Prüfpunkt nach Timeout, verlorener Browser-Sitzung, fehlendem Tool, getrennter Übergabe oder anderer Unterbrechung verwenden. Invariant ist der frische Beleg für den nächsten Schritt; Artefakt und sichere Grenze ändern sich.
- `forbidden_claims`: aktuelle Verfügbarkeit, Ursache, Queue-Verhalten, Retry-Erfolg, Modellqualität, Plattformgleichheit, Abrechnung, Aufgabenabschluss, Sicherheitswirksamkeit, Lernkompetenz, erfolgreicher Transfer oder Produktionsreife

## Inhaltliche Einordnung

- `primary_chapter`: [Kapitel 9 — Prüfen, Zweifel und Wiederherstellung](../../book/chapters/09-verification-and-recovery-DE.md)
- `supporting_chapters`: [Kapitel 6 — Modellauswahl](../../book/chapters/06-model-selection-DE.md); [Kapitel 19 — Modelle und Workflows bewerten](../../book/chapters/19-evaluate-models-and-workflows-DE.md)
- `primary_lab`: [Lab 013 — Auditierbarer vertikaler Schnitt](../../book/labs/lab-013-l3-vertical-slice-DE.md)
- `supporting_labs`: [Lab 001 — Erste sichere Aufgabe](../../book/labs/lab-001-first-safe-task-DE.md)
- `related_skill`: [Interruption Checkpoint](../../skills/prysai-interruption-checkpoint/SKILL.md); [Task Protocol](../../skills/prysai-task-protocol/SKILL.md); [Evidence Review](../../skills/prysai-evidence-review/SKILL.md); [LLM Comparison Protocol](../../skills/prysai-llm-comparison-protocol/SKILL.md)
- `evaluation_fixture`: [three-task-smoke-v1](../../evals/candidates/three-task-smoke-v1/README.md), `not_run`
- `update_registry_entry`: prüfen, wenn sich der Bericht ändert, offizielle Codex-Anleitung aufgenommen wird, ein echter Lauf vorgeschlagen oder eine produktspezifische Wiederherstellung verlangt wird

Der Fall macht ein vorhandenes öffentliches Signal lehrbar, ohne die Reife von Kapitel, Lab, Skill, Evaluation oder Plattformaussage zu erhöhen.

## Datenschutz, Berechtigungen und Pflege

- `personal_data_removed`: ja; keine Identität, Konto- oder Umgebungsdetails übernommen
- `secrets_removed`: ja; keine Zugangsdaten, Tokens, Pläne, Modell-IDs, Pfade, Aufgabeninhalte oder Logs
- `private_paths_removed`: ja
- `copyrighted_material_boundary`: nur eigene Zusammenfassung und fiktives Fixture; kein Issue-Text, Kommentar, Workaround oder Dokumentation kopiert
- `asset_register_entry`: S103 in `docs/sources/asset-register.md`
- `volatile_facts`: Issue-Status, Metadaten, Verfügbarkeit, API-Limits, Produktsteuerung, Hilfewege und Plattformverhalten
- `next_review`: 2026-09-14 oder vor jeder Behauptung zu Wiederherstellung, Kapazität oder Produkt
- `change_trigger`: Quellenänderung, Aufnahme offizieller Codex-Dokumentation, vorgeschlagener Lauf oder Wunsch nach Retry-/Konfigurationsunterricht
- `owner`: research-maintainer

## Behauptungsgrenze

- `what_can_be_claimed`: Ein datierter öffentlicher Bericht wird als begrenzter Kandidatenfall mit Quelle, Evidenzklassen, Reproduktionsstatus, Offline-Prüfpunkt und Stoppbedingung dargestellt.
- `what_must_not_be_claimed`: Der Bericht sei häufig, aktuell, reproduzierbar oder durch ein API-Limit verursacht; eine Unterbrechung sei sicher fortsetzbar; ein Anbieter sei besser; die Übung verhindere Verlust; oder Lern-, Laufzeit-, Release- oder Produktionsbelege seien erbracht.
- `next_smallest_check`: genehmigte, unabhängig geprüfte Offline-Übung des fiktiven Prüfpunkts ohne Konto-, Modell-, Aufgaben-, Prompt-, Projekt-, Nutzungs-, Personen- oder externen Servicedaten.
- `current_status`: `candidate`
