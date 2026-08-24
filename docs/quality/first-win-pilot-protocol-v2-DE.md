<!-- content_id: first-win-pilot-protocol-v2 | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: first-win-pilot-protocol-v2.md | source_revision: 2026-08-23 -->

# First-Win-Pilotprotokoll v2

**Status:** Kandidatenprotokoll; keine Rekrutierung, Teilnahme oder Ergebnisse aufgezeichnet.

## Welche Entscheidung der Pilot informieren kann

Kann eine Person, die den Leitfaden zum ersten Mal liest, in einer kurzen Modellantwort eine
fehlende Quellenangabe und eine nicht belegte Ergänzung erkennen, die First-Win-Methode anwenden
und die Prüfung an einer unbekannten Nachricht wiederholen?

Der Pilot kann Aufgabe, Rubrik, Wortlaut und Reihenfolge der Route verbessern. Er beweist weder
Lehrwirksamkeit, Behalten, allgemeine Schreibfähigkeit, Modellzuverlässigkeit, Marktnachfrage,
Popularität noch Überlegenheit gegenüber einem anderen Kurs.

## Enges Konstrukt

Untersucht wird nur:

> Quellen-Treuefehler in einer kurzen Modellantwort finden und die kleinste Korrektur vornehmen, ohne unbelegte Informationen hinzuzufügen.

Konfidenz, Geschmack, Höflichkeit, Grammatikniveau, Prompt-Länge, Modellpräferenz und Codex-Fähigkeit
gehören nicht zu diesem Konstrukt und werden nicht bewertet.

## Teilnehmende und Befugnis

Rekrutieren Sie 5–8 Erwachsene, die ein Chatmodell kennen, diesen Leitfaden aber noch nicht verwendet
haben. Das ist eine Stichprobe erfahrener Anfänger, kein Beleg für die allererste Chat-Sitzung. Die erste
Runde dient der Instrumentenprüfung, nicht einer Wirksamkeitsstudie. Verwenden Sie in der gesamten Runde
einen festen Repository-Commit oder einen unveränderlichen Pages-Kandidaten.

Vor der Rekrutierung benennen Sie Rekrutierungskanal, Datenschutzverantwortliche, Moderation,
unabhängige Bewertung, Aufbewahrungsdauer und Löschdatum. Teilnahme ist freiwillig. Keine Minderjährigen,
direkt Unterstellten, Studierenden mit möglicher Notenwirkung oder Personen, denen eine Ablehnung schaden könnte.

Sammeln Sie keine Namen, Kontaktdaten, rohen Chatverläufe, Kontodaten, privaten Dateien, Arbeitgebermaterial,
Gesundheits- oder Finanzdaten oder Bildschirmaufnahmen. Bewahren Sie nur einen zufälligen Sitzungscode,
grobe Vorerfahrung, Bedingungsdaten, bewertete Aufgabenartefakte, Dauer, verwendete Hilfe, ersten Abbruch
und eine bereinigte Beobachtungsnotiz auf.

## Feste Bedingungen

Vor der ersten Sitzung festhalten:

- Protokollrevision und Kandidaten-SHA
- Einstiegs-URL und Sprache
- Browser-Version und Viewport
- Modell und Oberfläche sowie sichtbare Einstellungen
- Moderation und unabhängige Bewertung
- Rubrikrevision, Aufbewahrungsende und Löschverantwortung

Modell, Prompts, Aufgabenfolge, Bewertungsrubrik und sichtbare Site-Version bleiben in einer Runde gleich.
Bei einer Änderung die Runde stoppen und mit einer neuen Revision beginnen. Abgebrochene und ausgeschlossene
Sitzungen gehören in die Gesamtsumme.

## Commit-gebundenes Pilotpaket

Vor jeder autorisierten Sitzung mit dem [pilot-kit-Vertrag](../governance/first-win-pilot-kit.yaml) ein
lokales Paket aus einem vorhandenen Commit erzeugen. Es enthält feste Teilnehmer-Arbeitsblätter,
Moderationsleitfaden, Bewertungsschlüssel, leere Protokolle und Aggregatvorlage und schreibt die exakten
Quell-Digests. Der Generator weist ungültige Commits, nicht leere Ausgabeverzeichnisse, fehlerhafte Rollenalias,
denselben Alias für Moderation und unabhängige Bewertung, abgelaufene Aufbewahrung sowie URLs mit Zugangsdaten,
Query oder Fragment zurück. Die Rollen müssen von verschiedenen Personen ausgeübt werden; Aliase machen die
Trennung prüfbar, ohne Namen zu speichern. Der Generator rekrutiert nicht, kontaktiert niemanden, sammelt keine
Daten und beweist keine Genehmigung.

Nach Bestätigung von Befugnis, Datenschutz, Aufbewahrung und unabhängiger Prüfung vom Repository-Root ausführen:

```text
python scripts/first_win_pilot_kit.py \
  --candidate-sha <full-40-character-commit-sha> \
  --output-dir .work/first-win-pilot/<round-label> \
  --pilot-authorizer <role-alias> \
  --privacy-owner <role-alias> \
  --moderator <role-alias> \
  --independent-scorer <role-alias> \
  --deletion-owner <role-alias> \
  --recruitment-channel <approved-channel-alias> \
  --retention-end <YYYY-MM-DD> \
  --locale <locale> \
  --model-surface <surface-label> \
  --browser-os-viewport <environment-label>
```

Vor der ersten Sitzung `--validate-package <local-package-path>` ausführen und `manifest.json` mit
dem Commit vergleichen. Keine Teilnehmendendaten in das Paket legen; leere CSVs definieren nur Felder.
Der Bewertungsschlüssel bleibt bei Moderation und unabhängiger Bewertung. `prepared_no_recruitment_or_participant_run_recorded`
ist Vorbereitung, kein Lernendennachweis.

## Phase 1 — Baseline ohne Hilfe

First-Win-Prompt, Beispiel, Checks und Rescue-Prompt nicht zeigen. Diese fiktive Quelle und die absichtlich
fehlerhafte Antwort vorlegen:

> The volunteer briefing starts Tuesday at 3. Bring the printed checklist. If you cannot attend, message the coordinator.

> The volunteer briefing starts Tuesday at 3 in Room 204. If you cannot attend, email the coordinator.

Die Person markiert alle Quellen-Treuefehler und schreibt eine korrigierte Nachricht. Anzahl und Art der
Fehler nicht erklären. Der feste Schlüssel enthält drei Befunde: `Bring the printed checklist` fehlt,
`Room 204` wurde erfunden und `message` wurde ohne Beleg in `email` geändert.

## Studienpräsentation

Das optionale öffentliche Warm-up zeigt das akzeptable Beispiel erst, wenn alle drei Check-Zustände gewählt
sind. Das Studienarbeitsblatt bindet die genaue öffentliche Quelle, Prompt, Checks, Rescue-Prompt,
Vergleichs-Gate und Grenze an einen Commit und bewahrt URL und Digest. Ergebnisse des Arbeitsblatts sind
kein Beleg für die unbeeinflusste Nutzung der öffentlichen Startseite.

Vor der Baseline eine getrennte, unbewertete Beobachtung der öffentlichen Oberfläche durchführen:
Kann die Person den empfohlenen Codex-Pfad vom Warm-up unterscheiden, die erste lokale Aufgabe finden,
das Beispiel als Illustration erkennen und die Checks erreichen? Beobachtung und Aufgabenpunkte getrennt halten.
Arbeitsblatt, Prompt, Beispiel, Checks, Rescue oder Lösung erst danach zeigen.

## Phase 2 — First-Win-Anleitung

Das commitgebundene Arbeitsblatt öffnen. Die Person verwendet die feste Quelle, kopiert den Prompt und
sichert die erste Modellantwort vor jeder Reparatur. Für jeden Check `PASS / FAIL / UNSURE` samt exakten
Belegwörtern notieren und die Entscheidung vor dem Beispiel sperren.

Wenn alles passt, `not_observable_no_failure` notieren und nicht als Recovery-Erfolg zählen. Danach diese
feste fehlerhafte Antwort zeigen und den ersten fehlgeschlagenen Check mit demselben Rescue-Prompt bearbeiten lassen:

> The workshop starts Friday at 10 in Studio B. Please bring your notes. If you cannot attend, email the organizer.

Wurde das Beispiel zu früh gezeigt, `example_exposed` notieren und nur den Vergleich von Phase 2 ausschließen.
Baseline und spätere Behaltensdaten nicht allein wegen dieses Präsentationsfehlers verwerfen. Festhalten,
ob Fakten von fehlenden Angaben unterschieden, `UNSURE` akzeptiert, der erste fehlgeschlagene Check ohne
Moderationshinweis gefunden, nur Notwendiges geändert und die Grenze des Ergebnisses erklärt wurde.

## Phase 3 — unmittelbarer unbekannter Transfer

Den Workshop-Prompt nicht wörtlich geben. Diese neue fiktive Quelle verwenden:

> The repair appointment is Monday at 8. Leave the side gate unlocked. Call us if the time no longer works.

Die Person schreibt eine kurze Modellanweisung, prüft die Antwort und korrigiert sie bei Bedarf. Fünf
getrennte Belege aufbewahren: Anweisung, erste Antwort, markierte Befunde, Endantwort und Vorher/Nachher-Diff.
Eine korrekte erste Antwort beweist keine Prüfung. Bei Quellentreue `no_correction_needed` und jede Hilfe,
auch das erneute Öffnen von First Win oder Kopieren von Text, notieren.

## Phase 4 — verzögerter unbekannter Transfer

Nach 48–72 Stunden eine andere Domäne ohne ursprünglichen Prompt, Checks, Beispiel oder Rescue-Text verwenden:

> Applications close Thursday at noon. Attach one work sample. Contact the programme office if the form does not open.

Anweisen, Antwort prüfen und Quellen-Treuefehler korrigieren lassen. Die fünf Belege aus Phase 3 erhalten
und die Rückkehr notieren. Fehlende verzögerte Daten nicht durch den letzten Score ersetzen.

## Sitzungsprotokoll

Eine Zeile pro Phase; beide Bewertungsspalten behalten:

```text
session_code | phase | timer_start | timer_end | completed | first_answer
participant_instruction | marked_findings | check_1 | check_2 | check_3
help_code | recovery_branch | final_answer | before_after_diff | drop_off
example_exposed | scorer_a_dimensions | scorer_b_dimensions | disagreement
```

In Phase 2 beginnt die Zeit mit der Anzeige der Quelle und endet nach dem Sperren aller drei Entscheidungen
und der Reparatur oder `not_observable_no_failure`. Die 15-Minuten-Marke bleibt ein ungeprüftes Ziel, kein Bestehensgrenzwert.

Erlaubte Hilfe: `none`, `reopen_first_win`, `copy_text`, `moderator_clarification`, `other_recorded`.
Erlaubte Recovery: `independent`, `seeded`, `not_observable_no_failure`, `not_attempted`, `stopped`.
Eine Phase ist nur mit allen Pflichtfeldern vollständig; Fehlen ist keine Nullwertung.

## Bewertungsrubrik

Baseline- und Transferartefakte möglichst ohne Kenntnis der Phase bewerten.

| Dimension | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Erforderliche Fakten | mindestens zwei fehlen/geändert | eines fehlt/geändert | alle erhalten |
| Unbelegte Fakten | mindestens zwei hinzugefügt | eines hinzugefügt | keine |
| Geforderte Aktion | fehlt oder stark verändert | vorhanden, aber unklar | klar erhalten |
| Korrekturumfang | neuer Fehler | Ziel plus unnötige Änderung | kleinste ausreichende Änderung |

Zwei Bewertende beurteilen jedes Artefakt unabhängig. Beide Scores und der Grund der Abweichung bleiben
erhalten; Übereinstimmung und Abweichung nach Dimension berichten, nicht durch einen Mittelwert verdecken.
Bei inkonsistenter Anwendung die Rubrik nach der ersten Runde ändern.

## Stopp und Sicherheit

Bei privaten Materialien, wahrgenommener Arbeits-/Studienbewertung, Unwohlsein oder notwendiger externer
Aktion die Sitzung stoppen. Private Inhalte löschen und nur einen Sicherheitsstopp protokollieren.
Die Runde stoppen und das Instrument überarbeiten, wenn zwei Personen den Auftrag unvereinbar verstehen,
der Schlüssel mehrdeutig ist, die Oberfläche Bedingungen nicht halten kann, das Beispiel in zwei Sitzungen
zu früh sichtbar wird oder Einwilligung und Datenminimierung nicht erfüllt sind.

## Aggregatbericht

Nur ein de-identifiziertes Aggregat veröffentlichen: Rekrutierungs- und Ausschlusszahlen, Abschlüsse und
Rückkehr, Abbrüche, Abweichungen, Rubrikstreit, Baseline-/sofortige/verzögerte Verteilungen, Zeit und
15-Minuten-Anzahl der Phase 2, unabhängige/gesäte Recovery, `not_observable_no_failure`, Hilfe, kritische
Vorfälle und Instrumentänderungen. Bei 5–8 Personen nur beschreibende Zahlen und Verteilungen verwenden;
keine Signifikanz und kein „Leitfaden funktioniert“ behaupten.

## Beleggrenze

Das Schreiben oder Validieren dieses Protokolls liefert keinen Lernendennachweis. Eine Runde kann für
genau diese Revision Aufgaben- und Messbarkeit belegen, schließt aber Q-001 oder Q-002 nicht und hebt
den Status von Kurs, First Win, Labs oder Evaluations-Fixtures nicht an.
