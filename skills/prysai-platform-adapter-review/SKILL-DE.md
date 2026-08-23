<!-- content_id: prysai-platform-adapter-review | locale: DE | language: de | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: skill-registry | source_license: project-owned CC-BY-4.0 -->

# Plattform-Adapter prüfen

Entscheide, ob ein Tutorial oder Workflow für eine bestimmte Plattform tatsächlich eine belegte, ausführbare und wartbare Differenz bietet. Eine Funktionsliste mit ausgetauschtem Anbieter­namen ist kein Adapter.

## Die Behauptung festschreiben

Halte Plattform, Oberfläche, Konto- oder Tarifgrenze, Version und Datum, Ergebnis für die Lesenden, Voraussetzung des universal core, vorgeschlagenen Status und die genau zu prüfenden Behauptungen fest. Teile plattformübergreifende Behauptungen auf, außer eine feste Vergleichsaufgabe und ein gemeinsames Bewertungsraster machen sie wirklich vergleichbar.

## Den Adaptervertrag prüfen

Verlange ausdrückliche Antworten auf:

1. `surface`: Chat, Desktop, CLI, IDE, Web, API oder ein anderer Einstieg;
2. `context_injection`: Dateien, Regeln, Gesprächszustand, Retrieval oder Artefakte der Person;
3. `actions`: Was kann diese Oberfläche beobachten oder ändern?
4. `authority`: Berechtigungen, Bestätigungen, Sandbox, Konto, Abrechnung und externe Nebenwirkungen;
5. `persistence`: Was bleibt über einen Turn, eine Sitzung, eine Aufgabe oder ein Projekt hinweg erhalten?
6. `control_loop`: beobachtbare Planung, Toolnutzung, Feedback, Wiederholungen und Delegation;
7. `verification_surface`: Diffs, Logs, Zitate, Vorschauen, Tests, Traces oder externer Zustand;
8. `failure_modes`: produktspezifische Missverständnisse und Verschlechterungspfade;
9. `volatile_facts`: maßgebliche URL, Abrufdatum, Geltungsbereich, Verantwortliche und nächste Prüfung;
10. `transfer_lab`: feste Eingaben, sichere Aktionen, Abnahme, Aufräumen, Fehler und Beleggrenze.

Markiere `not_applicable` nur mit einer Begründung. Wenn keine aktuelle Quelle und kein Lauf eine Antwort stützen, verwende `unknown`.

## Beleg-Gates anwenden

Trenne drei Belegklassen (der Statuswert für einen offiziellen Fakt ist `official`):

- offizieller Fakt: aktuelle Primärdokumentation oder eine von der Plattform verantwortete Quelle;
- beobachtetes Verhalten: ein gespeicherter Lauf mit Plattformkonfiguration und sichtbaren Aktionen;
- Feldsignal: ein öffentlicher Bericht, der nur ein Symptom oder einen Bedarf belegt.

Community-Beiträge erfüllen kein Gate für offizielle Fakten. Dokumentation beweist weder das Konto, die Laufzeitumgebung noch das Ergebnis einer Person. Ein einziger erfolgreicher Lauf beweist kein universelles Verhalten, keine Zuverlässigkeit, Überlegenheit oder Lerntransfer.

Lehne unbelegte Gleichsetzungen ab. Gleiche Bezeichnungen wie Agent, Tool, Memory, Project, Skill oder Search bedeuten keine identische Semantik. Vergleiche nur eine feste Aufgabe mit denselben Eingaben, Abnahmekriterien, Risikogrenzen und Review-Regeln; bewahre Konfigurationsunterschiede und vermerke `not_comparable`.

## Die Einstufung entscheiden

Gib einen der folgenden Zustände zurück:

- `admit_candidate`: alle erforderlichen Differenzen, Quellen, Läufe, Fehlerfälle, Verantwortlichen, Prüfdaten und Beleggrenzen sind vorhanden;
- `draft_source_gap`: ein wichtiger veränderlicher Fakt hat keine Primärquelle;
- `draft_run_gap`: der Vertrag ist belegt, aber ein begrenzter Lauf fehlt;
- `merge_into_core`: es bleibt keine sinnvolle Plattformdifferenz;
- `quarantine`: Lizenz, Sicherheit, Datenschutz oder Herkunft sind unklar;
- `retire`: der Adapter ist veraltet, ohne Verantwortliche, doppelt oder nicht mehr nützlich.

Setze den Status nicht hoch, nur weil die Anmeldung funktioniert, ein Befehl existiert oder der Text vollständig wirkt. Ein Adapter mit `candidate` ist weder verifizierter Lerntransfer noch Produktionsanleitung.

## Die Prüfung liefern

Beginne mit Einstufung und stärkstem Grund. Führe anschließend Vertragsmatrix, unbelegte Behauptungen, Lücken bei Quelle, Lauf oder Lizenz, Überschneidung mit dem universal core, nächstes Experiment, Verantwortliche, nächsten Prüftermin und die weiterhin nicht belegten Punkte auf. Halte das Format proportional zur Zahl der Behauptungen; erzwinge bei einer einzelnen Behauptung keine zeremonielle Gliederung.

## Wartungsnotiz

- `source`: originäre Prysai-Lab-Methode zur Umsetzung von ADR-0025 und der verbindlichen Inhaltszulassungsgrenze
- `license`: originäre Überarbeitung; Anbieterunterlagen und Community-Berichte bleiben ohne eigene Lizenz Referenzen
- `owner`: platform-adapter maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-12`
- `content_status`: `candidate`
