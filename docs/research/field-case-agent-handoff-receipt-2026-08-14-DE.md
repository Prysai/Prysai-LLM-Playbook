<!-- content_id: field-case-agent-handoff-receipt-2026-08-14 | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: field-case-agent-handoff-receipt-2026-08-14.md | source_revision: 2026-08-23 -->

# Praxisfall: Ein erstellter Subagent ist noch kein Aufgabenbeleg

## Zuerst den fehlenden Prüfpunkt benennen

Dass ein Subagent in einer Aufgabenliste erscheint, beweist nicht, dass er die Arbeit erhalten hat. Vor einer echten Delegation sind diese Prüfpunkte getrennt festzuhalten:

1. Die Übergabeanfrage wurde erstellt.
2. Der empfangende Agent wurde gestartet oder geweckt.
3. Der empfangende Agent kann den harmlosen Aufgabenbeleg zeigen.
4. Der empfangende Agent hat die beschriebene Handlung abgeschlossen.
5. Der übergeordnete Ablauf hat ein prüfbares Ergebnis erhalten.

Nur der dritte Punkt belegt die Zustellung. Fehlt er, wird die Übergabe als `blocked` markiert. Dann keine echte Arbeit über diesen Weg senden, sondern einen einzelnen Agenten oder eine menschliche Übergabe verwenden. Diese Seite ist eine Offline-Entscheidungshilfe: Sie erstellt keinen Agenten, sendet keine Nachricht, prüft keine Sitzung und diagnostiziert kein Produkt.

![Fünf Übergabeprüfpunkte: erstellt, gestartet, Beleg, ausgeführt und Ergebnis zurückgegeben. Der Beleg ist das Zustellungstor.](../../assets/teaching/agent-handoff-receipt-checkpoints-red-black.svg)

## Fallidentität

- `case_id`: `FC-HANDOFF-01`
- `title`: Ein erstellter Subagent ist noch kein Aufgabenbeleg
- `problem`: Der übergeordnete Ablauf scheint einen Subagenten zu erstellen, doch der Aufgabentext ist am Empfang möglicherweise nicht sichtbar.
- `audience`: Einsteiger und Reviewer in mehrstufigen, werkzeugfähigen Programmierumgebungen
- `collected_at`: 2026-08-14
- `owner`: research-maintainer
- `content_status`: `candidate`
- `related_chapters`: Kapitel 10; Kapitel 12
- `related_labs`: Lab 013
- `related_skills`: Task Protocol; Evidence Review
- `related_evaluations`: keine

## Quellenprotokoll

- `source_type`: `github_issue`
- `source_url`: https://github.com/openai/codex/issues/37822
- `source_title`: Öffentlicher Bericht über eine als erstellt angezeigte Übergabe ohne sichtbaren Aufgabenbeleg
- `source_author_or_publisher`: öffentlicher GitHub-Berichterstatter
- `accessed_at`: 2026-08-14
- `source_license_or_usage_boundary`: öffentliche Referenzquelle; dieser Fall verwendet eine eigene Zusammenfassung und ein fiktives Offline-Fixture
- `quotation_policy`: Kein Issue-Text, Befehl, Log, Screenshot, Anhang, Konto, Projektpfad, Anbieter-Setting oder Reproduktionsarchiv wird kopiert.
- `source_scope`: Beim Zugriff zeigten die Issue-Metadaten einen öffentlichen, offenen Bericht. Das belegt nur die Beschreibung und Erwartung einer Person in den genannten Umgebungen. Es belegt weder Ursache, aktuelles Verhalten, Häufigkeit, unterstützte Lösung noch Verhalten bei einem anderen Konto, einer anderen Version, einem anderen Anbieter, Workflow oder System.

## Berichtete Situation

- `user_report_summary`: Eine öffentliche Meldung beschreibt eine Übergabe vom Elternprozess an einen Subagenten: Das Kind schien zu starten, antwortete aber, als habe es keinen Auftrag erhalten. Der Bericht nennt das Symptom auf mehreren benannten Oberflächen und in mehreren Einstellungen.
- `observed_symptom`: Die untergeordnete Aufgabe war sichtbar oder aktiv, aber die Antwort belegte nicht den Empfang des erwarteten Aufgabentexts.
- `expected_behavior`: Der Berichterstatter erwartete, dass das Kind die Nachricht des Elternprozesses erhält und danach handelt.
- `official_boundary`: `unknown`. Dieser Fall behandelt weder interne Mechanismen noch aktuelle Unterstützung, Konfiguration oder Fehlerbehebung.
- `product_surface`: Desktop und CLI wurden berichtet; keines davon wird hier reproduziert.
- `product_version`: Versionen und Einstellungen der Quelle sind nicht unabhängig geprüft.
- `operating_system`: Die Quelle nennt eine Plattform; dieses Projekt hat sie nicht untersucht.
- `model_or_provider`: Es wurde ein benutzerdefinierter Anbieter genannt; Anbieter werden nicht verglichen.
- `network_or_auth_context`: nicht untersucht; es wurden kein Konto, kein Geheimnis, kein Anbieter und keine Verbindung verwendet.
- `input_shape`: Prüfung mit einer fiktiven festen Empfangsphrase; keine echte Aufgabe, kein Repository, keine Datei, kein Geheimnis und keine Nutzerdaten.
- `risk_level`: `medium`, wenn ein echter Ablauf vor der Empfangsbestätigung eine irreversible Aktion oder sensible Inhalte delegiert

## Behauptungs- und Evidenztabelle

| Behauptung | Evidenzklasse | Quelle oder Artefakt | Datum | Geltungsbereich | Einschränkung | Status |
|---|---|---|---|---|---|---|
| Die öffentliche Issue #37822 existierte beim Zugriff und war offen. | `direct` | [GitHub Issue #37822](https://github.com/openai/codex/issues/37822) | 2026-08-14 | Öffentliche Metadaten | Offen bedeutet weder aktiven Fehler, Priorität, Reproduktion noch eine ungeklärte Ursache. | candidate |
| Eine Person beschrieb ein erstelltes oder gewecktes Kind ohne sichtbaren Aufgabenbeleg. | `reported` | Dieselbe öffentliche Issue | 2026-08-14 | Umgebung und Beobachtung einer Person | Keine unabhängige Reproduktion und keine allgemeine Behauptung. | candidate |
| Die Nachricht ging wegen eines bestimmten internen Feldes oder Entschlüsselungspfads verloren. | `not_observed` | Keine lokale Quelle, Laufzeitbeobachtung oder unabhängige Prüfung | 2026-08-14 | Interner Mechanismus und Diagnose | Die Vermutung aus dem Bericht wird nicht als Projektfakt übernommen. | unverified |
| Erstellung, Wecken, Empfang, Ausführung und Rückgabe sind getrennt zu erfassende Aussagen. | `project_inference` | Dieser Fall; Kapitel 10 und 12; Lab 013 | 2026-08-14 | Vorsichtige Lehre für mehrstufige Abläufe | Das garantiert keine Implementierung, erkennt nicht jeden Fehler und beweist keine sichere Agentennutzung. | candidate |

## Reproduktionsstatus

- `reproduction_status`: `not_run`
- `reproduction_scope`: Das Projekt hat kein Übergabewerkzeug aufgerufen, keinen Subagenten erstellt, keine Logs oder Sitzungen geprüft, keinen Anbieter verwendet und die gemeldete Umgebung nicht ausgeführt.
- `fixed_input_or_fixture`: ursprüngliche Offline-Empfangskarte aus **Übertragung in den Unterricht**.
- `logs_or_artifacts`: ausgefüllte fiktive Prüfkarte und begrenzter Entscheidungsbeleg, falls später ein autorisierter Lauf freigegeben wird
- `independent_reviewer`: ausstehend
- `last_checked_at`: 2026-08-14
- `root_cause_status`: `unknown`

## Kleinster sicherer Diagnoseweg

| Schritt | Nur-Lese-Prüfung oder risikoarme Handlung | Erwartete Beobachtung | Stoppregel |
|---|---|---|---|
| 1 | Die fiktive Karte lesen und jeden Prüfpunkt markieren: erstellt, gestartet, Beleg, ausgeführt, zurückgegeben. | Sichtbarer Status wird nicht stillschweigend zum Aufgabenbeleg aufgewertet. | Stoppen, sobald eine echte Aufgabe, private Daten, ein Tool, Konto oder Setting auftaucht. |
| 2 | `not_observed` setzen, wenn die Karte nur Erstellung und eine allgemeine Antwort zeigt. | Übergabe ist `blocked`; kein Ergebnis wird angenommen. | Keinen Fehler, fehlende Berechtigung oder sicheren Wiederholungsgrund vermuten. |
| 3 | Fallback wählen: begrenzte Aufgabe mit einem Agenten oder lesbare menschliche Übergabe. | Der nächste Schritt hat eine benannte verantwortliche Person und keine verborgene Zustellungsannahme. | Vor Agentenerstellung, Nachricht, Setting-Änderung oder Wiederholung eines echten Effekts stoppen. |

- `allowed_actions`: fiktiven Datensatz lesen, Beobachtungen klassifizieren, lokalen Beleg schreiben und einen nicht delegierten Fallback wählen
- `forbidden_actions`: Agent erstellen oder wecken, Aufgabe senden, Geheimnis offenlegen, Logs oder Sitzungen lesen, Anbieter oder Schalter ändern, Effekt wiederholen, installieren, committen, pushen, veröffentlichen oder Konto verwenden
- `minimal_safe_probe`: ausgefüllte Fünf-Punkte-Karte mit der festen Phrase `RECEIPT-OK`
- `stop_condition`: feste Phrase durch echte Aufgabe ersetzen, Fallback ohne Verantwortliche oder ungeprüften externen Effekt einführen
- `rollback_or_cleanup`: temporären Beleg löschen, wenn er keine nützliche Entscheidung enthält; das fiktive Fixture unverändert lassen

## Überführung in den Unterricht

- `learner_problem`: Ein Dashboard zeigt einen Helfer, aber Lernende können nicht feststellen, ob er den Auftrag erhalten hat.
- `core_concept`: Sichtbarkeit des Lebenszyklus ist nicht Nachrichtenzustellung. Eine vertrauenswürdige Übergabe braucht einen Beleg, bevor die Ausführung als zuverlässig gilt.
- `decision_to_teach`: Vor einer genehmigten Aufgabe einen harmlosen Empfangsprobe verwenden oder die Arbeit ohne Beleg bei einem einzelnen Agenten oder einem Menschen lassen. Die erste Option fügt einen Prüfpunkt hinzu, die zweite kann langsamer sein. Keine davon erfindet Zustellungsbelege.
- `smallest_experiment`: Nur diese Offline-Karte verwenden:

  ```text
  handoff_id: demo-01
  parent_request: "Genau zurückgeben: RECEIPT-OK"
  visible_status: child created; child started
  child_reply: "Warte auf eine Aufgabe."
  receipt_observed: no
  execution_observed: no
  result_returned: no usable task result
  ```

  Ohne ein Tool auszuführen, diesen begrenzten Entscheidungsbeleg ausfüllen:

  ```text
  created: observed
  started: observed
  receipt: not_observed
  execution: not_observed
  returned_result: not_accepted
  decision: blocked — einzelnen Agenten oder menschliche Übergabe verwenden
  external_actions: not_run
  ```

- `intentional_failure`: `created` als Zustellungsbeleg behandeln, das Kind die fehlende Aufgabe erraten lassen, nach fehlendem Beleg echte Arbeit senden oder den Bericht als bestätigten Produktfehler bezeichnen.
- `required_artifact`: ausgefüllter Beleg, ein Satz zum nicht beobachteten Prüfpunkt und ein Fallback mit Verantwortlicher oder Verantwortlichem
- `acceptance`: alle fünf Prüfpunkte unterscheiden; Empfang als unbeobachtet markieren; keine Ursache oder Konfiguration behaupten; echte Arbeit ablehnen; Fallback benennen; `external_actions: not_run` festhalten.
- `transfer`: dieselbe Karte auf Queue-Worker, Webhook, Genehmigungssystem, Build-Pipeline oder Team-Ticket anwenden. Die Invariante lautet: Ein sichtbares Lebenszyklusereignis beweist nicht, dass der erwartete Inhalt den nächsten Akteur erreicht hat.
- `forbidden_claims`: aktueller Codex-Fehler, interner Mechanismus, unterstütztes Setting, sicherer Retry, ausgeführtes Ergebnis, Agentengarantie, Lernkompetenz, erfolgreicher Transfer, Sicherheitswirksamkeit oder Produktionsreife

## Inhaltliche Einordnung

- `primary_chapter`: [Kapitel 10 — Planen und schneiden](../../book/chapters/10-planning-and-slicing-DE.md)
- `supporting_chapters`: [Kapitel 12 — Agentenschleife und Stop](../../book/chapters/12-agent-loop-and-stop-DE.md); [Kapitel 9 — Prüfen und Wiederherstellen](../../book/chapters/09-verification-and-recovery-DE.md)
- `primary_lab`: [Lab 013 — Vertikaler Schnitt](../../book/labs/lab-013-l3-vertical-slice-DE.md)
- `supporting_labs`: [Lab 007 — Aktionsgrenzen](../../book/labs/lab-007-action-boundaries-DE.md); [Lab 016 — Grenze für Nebenwirkungen](../../book/labs/lab-016-side-effect-boundary-DE.md)
- `related_skill`: [Task Protocol](../../skills/prysai-task-protocol/SKILL.md); [Evidence Review](../../skills/prysai-evidence-review/SKILL.md)
- `evaluation_fixture`: keines
- `update_registry_entry`: prüfen, wenn sich die Quelle ändert, eine offizielle Grenze anerkannt wird, eine kontrollierte lokale Reproduktion vorgeschlagen oder eine ausführbare Übergabeübung verlangt wird

Der Fall macht ein älteres öffentliches Signal auffindbar und gibt ihm eine sichere Lehrform. Er ändert nicht die Reife der verknüpften Kapitel, Labs, Skills oder Evaluationen.

## Datenschutz, Berechtigungen und Pflege

- `personal_data_removed`: ja; fiktive Übung ohne Quellenidentität
- `secrets_removed`: ja; kein Konto, Anbieter, Pfad, Aufgabeninhalt oder Sitzungsinhalt verwendet
- `private_paths_removed`: ja
- `copyrighted_material_boundary`: nur eigene Zusammenfassung und eigene fiktive Karte; kein Issue-Text, Befehl, Log, Anhang, Screenshot oder Antwort kopiert
- `asset_register_entry`: S89 in `docs/sources/asset-register.md`
- `volatile_facts`: Issue-Status, Produktsupport, Übergabeverhalten, Versionen, Anbieter, Berechtigungen und Implementierungsdetails
- `next_review`: 2026-09-14 oder vor jeder Produkt-, Laufzeit-, Konfigurations- oder Veröffentlichungsbehauptung
- `change_trigger`: Quellenänderung, Aufnahme offizieller Dokumentation, geplanter Online-Versuch oder Wunsch nach einer ausführbaren Übergabe
- `owner`: research-maintainer

## Behauptungsgrenze

- `what_can_be_claimed`: Ein älterer öffentlicher Bericht wird als begrenzter Fall mit Quelle, Symptom, Evidenzklassen, Reproduktionsstatus, Offline-Diagnoseweg und Stoppbedingung dargestellt.
- `what_must_not_be_claimed`: Der Bericht sei aktuell oder reproduzierbar, alle Übergaben seien betroffen, die Ursache sei bekannt, ein Setting behebe sie, das Kind habe eine versteckte Nachricht erhalten, die Offline-Karte finde alle Fehler oder ein Lernender habe eine echte Delegation abgeschlossen.
- `next_smallest_check`: unabhängig geprüfter und zugestimmter Lauf der festen Empfangsprobe in einer benannten Umgebung; harmlose Phrase, keine Sammlung von Sitzung, Repository, Geheimnis, Konto, privater Aufgabe oder Personendaten; Stopp vor jedem Effekt.
- `current_status`: `candidate`
