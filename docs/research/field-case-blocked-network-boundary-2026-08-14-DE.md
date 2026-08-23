<!-- content_id: field-case-blocked-network-boundary-2026-08-14 | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: field-case-blocked-network-boundary-2026-08-14.md | source_revision: 2026-08-23 -->

# Praxisfall: `FC-NETWORK-01` — Ein blockierter Auftrag erweitert keine Berechtigung

## Hier beginnen: die Grenze halten

Ein blockierter Auftrag bedeutet, dass der aktuelle Weg nicht weiterführt. Er erlaubt weder uneingeschränkten Netzwerkzugang noch einen Proxy oder eine umfassendere Berechtigung.

Vor jeder Änderung an einer Einstellung drei Dinge notieren:

1. Das eine externe Ergebnis, das der Auftrag benötigt, ohne echten Endpunkt oder Geheimnis zu ergänzen.
2. Die Person, die eine minimale Ausnahme freigeben kann, oder ein freigegebenes Offline-Artefakt als Ersatz.
3. Die kleinste nicht sensible Sonde und die Belege, die bei einer Freigabe erhalten bleiben sollen.

Wenn einer dieser Punkte unklar ist, stoppen und eine engere Entscheidung anfordern. Diese Seite ist eine Offline-Entscheidungshilfe, keine Konfigurationsanleitung: Sie stellt keine Netzwerkanfrage, lehrt keine Proxy-Einstellung und dokumentiert kein Live-Produktverhalten.

## Fallidentität

- `case_id`: `FC-NETWORK-01`
- `title`: Ein blockierter Auftrag erweitert keine Berechtigung
- `problem`: Eine Netzwerkanfrage ist blockiert; nun muss zwischen einer kleinen, prüfbaren Ausnahme und einer unbelegten Erweiterung des Zugriffs entschieden werden.
- `audience`: Einsteiger und Reviewer in einer Tool-fähigen Programmierumgebung
- `collected_at`: 2026-08-14
- `owner`: research-maintainer
- `content_status`: `candidate`
- `related_chapters`: Kapitel 4; Kapitel 9; Kapitel 13
- `related_labs`: Lab 001; Lab 007; Lab 016
- `related_skills`: Task Protocol; Evidence Review
- `related_evaluations`: keine

## Quellenprotokoll

- `source_type`: `forum`
- `source_url`: https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox
- `source_title`: öffentliche Frage zu ausgehendem Zugriff aus einer Codex-CLI-Sandbox-Sitzung
- `source_author_or_publisher`: öffentlicher Stack-Overflow-Beitrag
- `accessed_at`: 2026-08-10, wie im Forschungsset `field-problems-forums-2026-08-10.md` festgehalten
- `source_license_or_usage_boundary`: öffentlicher Bericht nur als Referenz; dieser Fall nutzt eine eigene Zusammenfassung und ein fiktives Offline-Fixture
- `quotation_policy`: Kein Beitragstext, Konfigurationsfragment, Log, Zugangsdaten, echter Umgebungslink oder Workaround wird übernommen.
- `source_scope`: Die Frage belegt nur, dass eine Person einen blockierten ausgehenden Auftrag in einer Umgebung beschrieben hat. Sie belegt weder aktuelle Syntax, offizielle Produktgrenze, sichere Lösung, Ursache noch Verhalten in einer anderen Umgebung.

## Berichtete Situation

- `user_report_summary`: Die fragende Person wollte einen Befehl trotz Sandbox einen öffentlichen Host erreichen lassen; der Auftrag wurde vor dem Abschluss blockiert.
- `observed_symptom`: Gemeldet wurde eine ausgehende Sperre, die einer Proxy- oder Allowlist-Sperre ähnelte.
- `expected_behavior`: Eine eng begrenzte Netzwerkroute sollte mit der Sandbox zusammen funktionieren.
- `official_boundary`: In diesem Fall `unknown`. Es wird weder aktuelle Konfigurationssyntax noch Support zugesichert.
- `product_surface`: CLI, laut Bericht
- `product_version`: nicht als verifizierte Tatsache erfasst
- `operating_system`: nicht als verifizierte Tatsache erfasst
- `model_or_provider`: für die didaktische Entscheidung nicht relevant
- `network_or_auth_context`: ein eingeschränkter Ausgangspfad wurde berichtet; Konto, Proxy und Zugangsdaten wurden nicht geprüft
- `input_shape`: benötigter öffentlicher Host, dessen echter Name absichtlich fehlt
- `risk_level`: `high`, wenn eine reale Aufgabe Netzwerkzugriff, Projektkontext oder Proxy erweitern würde

## Tabelle von Behauptungen und Belegen

| Behauptung | Evidenzklasse | Quelle oder Artefakt | Datum | Geltungsbereich | Einschränkung | Status |
|---|---|---|---|---|---|---|
| Eine Person meldete einen blockierten ausgehenden Auftrag in einer Codex-CLI-Sandbox-Sitzung | `reported` | [Stack Overflow #79970154](https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox) | 2026-08-10 | Eine berichtete Umgebung | Eine Frage ist keine Reproduktion, Diagnose oder Supportzusage | candidate |
| Der Bericht enthält eine aktuelle, sichere Konfigurationslösung | `not_observed` | Keine Konfiguration wurde kopiert, getestet oder unabhängig geprüft | 2026-08-14 | Konfiguration und Bereitstellung | Absichtlich außerhalb des Falls | unverified |
| Ein Block berechtigt zu offenem Netzwerk oder einer Proxy-Änderung | `not_observed` | Keine Freigabe und kein Live-Auftrag | 2026-08-14 | Berechtigung zur Änderung der Netzwerkrichtlinie | Ein Block ist Evidenz einer Grenze, keine Erlaubnis, sie zu entfernen | unverified |
| Der Auftrag bleibt blockiert, bis Ziel, Grund, Mindestumfang und sichere Sonde prüfbar sind | `project_inference` | Dieser Fall, Kapitel 13 sowie Labs 007 und 016 | 2026-08-14 | Vorsichtige Lehrregel zu externen Effekten | Definiert keine Anbieter-Konfiguration und garantiert keine sichere Ausnahme | candidate |

## Reproduktionsstatus

- `reproduction_status`: `not_run`
- `reproduction_scope`: Das Projekt hat keine Netzwerkanfrage gestellt, keine Live-Sandbox untersucht, keinen Proxy geändert, keine Allowlist ergänzt und kein Konto verwendet.
- `fixed_input_or_fixture`: Offline-Protokoll aus **Didaktische Übertragung**
- `logs_or_artifacts`: Grenzkarte und kurzer Entscheidungsbeleg, falls ein Experiment autorisiert wird
- `independent_reviewer`: ausstehend
- `last_checked_at`: 2026-08-14
- `root_cause_status`: `unknown`

## Kleinster sicherer Diagnoseweg

| Schritt | Prüfung mit Leserechten oder risikoarme Handlung | Erwartete Beobachtung | Stoppregel |
|---|---|---|---|
| 1 | Ergebnis, Host-Kategorie, erlaubte Aktion, Beleg und Stoppbedingung in einem lokalen Fixture notieren. | Der externe Effekt ist vom Auftragsziel getrennt. | Stoppen, wenn Host, Grund, Verantwortliche, Datenklasse oder externer Effekt fehlen. |
| 2 | Den synthetischen Block als `reported` erfassen und effektive Richtlinie, Ziel, Mindestumfang und sichere Sonde als offene Fakten auflisten. | Das fehlerähnliche Protokoll bleibt Grenzbeleg, keine Diagnose. | Keine Konfigurationsänderung, keinen Produktfehler und keine erfolgreiche Lösung ableiten. |
| 3 | Für die verantwortliche Person eine Entscheidungsvorlage erstellen: Host-Grund, nicht sensible Sonde, aufzubewahrende Belege und Rückweg. | Die Ausnahme kann freigegeben, abgelehnt oder verkleinert werden. | Vor Live-Anfrage, Proxy- oder Richtlinienänderung, Installation, Upload oder Zugangsdatengebrauch stoppen. |

- `allowed_actions`: fiktives Protokoll lesen, Evidenz klassifizieren, lokale Entscheidungsvorlage schreiben und eine Offline-Alternative benennen
- `forbidden_actions`: Netzwerkanfrage, Netzwerkrichtlinie, Proxy, Geheimnis, Abhängigkeit, Berechtigung, Commit, Push, Veröffentlichung oder Konto verwenden
- `minimal_safe_probe`: vierzeilige Grenzkarte und Freigabeanfrage mit minimalem Host-Umfang und nicht sensibler Probe
- `stop_condition`: Entscheidung, Datenklassifizierung, Ziel, Belegplan oder Rückweg fehlt
- `rollback_or_cleanup`: temporären Beleg ohne Aufbewahrungswert löschen; das fiktive Fixture bleibt unverändert

## Didaktische Übertragung

- `learner_problem`: Ein Auftrag benötigt eine externe Eingabe, aber der erste Versuch wird blockiert und die lernende Person möchte die Grenze entfernen.
- `core_concept`: technische Grenze, Auftragsbedarf und Befugnis zur Änderung dieser Grenze sind getrennte Tatsachen. Ein Fehler erzeugt keine neue Berechtigung.
- `decision_to_teach`: pausieren und eine kleinste prüfbare Ausnahme anfordern, oder ein freigegebenes Offline-Artefakt nutzen bzw. den Auftrag verschieben. Beides ist ehrlicher als der stille Zugriffsausbau.
- `smallest_experiment`: ausschließlich dieses Offline-Protokoll verwenden, ohne eine Anfrage zu stellen:

  ```text
  task: einen noch nicht heruntergeladenen Checksum-Wert prüfen
  local record: die Anfrage an den benötigten öffentlichen Host ist im Fixture blockiert
  proposed next action: uneingeschränkten Netzwerkzugang aktivieren und erneut versuchen
  ```

  Diesen Beleg schreiben:

  ```text
  observed: das Fixture verzeichnet einen Block
  known need: die Checksum-Aufgabe benötigt einen öffentlichen Host der benannten Kategorie
  missing evidence: effektive Richtlinie, Freigabe, minimale Sonde und Rückweg
  decision: blocked — minimale Ausnahme oder freigegebenes Offline-Artefakt anfordern
  external actions: not_run
  ```

- `intentional_failure`: den Block als Erlaubnis für uneingeschränktes Netzwerk behandeln, einen Proxy ohne Prüfung als sicher bezeichnen oder die Prüfung ohne prüfbares Artefakt behaupten.
- `required_artifact`: vollständiger Beleg, ein Satz zur Trennung von Auftragsziel und Berechtigung sowie eine sichere Offline-Alternative
- `acceptance`: Der Block wird dokumentiert, nicht diagnostiziert; der Host wird nur als Kategorie genannt; der uneingeschränkte Vorschlag wird abgelehnt; Freigabe oder Offline-Alternative steht im Beleg; `external actions: not_run` bleibt erhalten.
- `transfer`: dieselbe Grenze auf Paketdownload, Recherche-API, Webhook oder Browserübermittlung anwenden. Unverändert bleibt: ein technischer Bedarf schafft keine Befugnis; Ziel und minimale Sonde ändern sich.
- `forbidden_claims`: aktuelle Codex-Konfiguration, offizielle Netzwerkrichtlinie, Produktfehler, sicherer Proxy, erfolgreiche Anfrage, lokale Reproduktion, Lernkompetenz, Sicherheitswirksamkeit, Transfererfolg oder Produktionsreife

## Inhaltsplatzierung

- `primary_chapter`: [Kapitel 13 — Aktionsgrenzen](../../book/chapters/13-action-boundaries-DE.md)
- `supporting_chapters`: [Kapitel 4 — Kontext, Berechtigungen und Aktionsgrenze des Agents](../../book/chapters/04-context-permissions-and-agent-DE.md); [Kapitel 9 — Verifikation, Zweifel und Wiederherstellung](../../book/chapters/09-verification-and-recovery-DE.md)
- `primary_lab`: [Lab 016 — Grenze von Seiteneffekten](../../book/labs/lab-016-side-effect-boundary-DE.md)
- `supporting_labs`: [Lab 001 — Erste sichere Aufgabe](../../book/labs/lab-001-first-safe-task-DE.md); [Lab 007 — Aktionsgrenzen](../../book/labs/lab-007-action-boundaries-DE.md)
- `related_skill`: [Task Protocol](../../skills/prysai-task-protocol/SKILL.md); [Evidence Review](../../skills/prysai-evidence-review/SKILL.md)
- `evaluation_fixture`: keines
- `update_registry_entry`: prüfen, wenn die Quelle wechselt, eine offizielle Richtlinie aufgenommen wird, ein Live-Experiment geplant oder ein Konfigurationsbeispiel ergänzt wird

Der Fall macht ein älteres Feldsignal als begrenzten, auffindbaren Fall nutzbar. Er ändert die Reife der verknüpften Inhalte nicht.

## Datenschutz, Berechtigungen und Pflege

- `personal_data_removed`: ja; das Experiment ist fiktiv und verwendet keine echte Identität oder Zieladresse
- `secrets_removed`: ja; keine Zugangsdaten, Proxy-, Konto-, Projektpfad- oder echte URL-Daten
- `private_paths_removed`: ja
- `copyrighted_material_boundary`: nur eigene Zusammenfassung und eigenes Fixture; kein Beitragstext, keine Konfiguration und keine Antwort wurde kopiert
- `asset_register_entry`: S88 in `docs/sources/asset-register.md`
- `volatile_facts`: Quellenstatus, Produktkonfiguration, Standardwerte, Proxy-Verhalten und Produktsupport
- `next_review`: 2026-09-14 oder vor einer Aussage zu Konfiguration, Sicherheit, Laufzeit oder Veröffentlichung
- `change_trigger`: Quellen- oder Leitfadenänderung, vorgeschlagenes Live-Experiment oder neues Konfigurationsbeispiel
- `owner`: research-maintainer

## Geltungsgrenze der Aussagen

- `what_can_be_claimed`: Ein älterer öffentlicher Bericht ist als Kandidatenfall mit Quellenart, Symptom, Evidenzklassen, Reproduktionsstatus, risikoarmem Diagnoseweg und Stoppregel aufbereitet.
- `what_must_not_be_claimed`: Der Bericht sei aktuell oder reproduzierbar, die Ursache sei bekannt, uneingeschränkter Zugriff sei nötig oder sicher, ein Produkt unterstütze eine bestimmte Einstellung, das Fixture beweise eine Sicherheitskontrolle oder Lernende hätten die Entscheidung abgeschlossen.
- `next_smallest_check`: eine unabhängig geprüfte und freigegebene Offline-Ausführung des festen Protokolls; kein Netzwerkverkehr und keine Sammlung von Zugangsdaten, Konten, Projekten, Proxies oder personenbezogenen Daten
- `current_status`: `candidate`
