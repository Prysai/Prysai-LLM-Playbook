<!-- content_id: chapter-19-evaluate-models-and-workflows | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 19: Modelle und Workflows evaluieren, von Eindrücken zu Evidenz

**Status:** `candidate`. **Experimentstatus:** `draft / not_run`. Die Evaluations-Fixtures enthalten keine Modelllauf-Logs. Dieses Kapitel beweist nicht, dass ein Modell besser ist.

## Das Problem

„Dieses Modell ist klüger“, „dieser Skill ist zuverlässig“ oder „die Aufgabe war schnell fertig“ können Beobachtungen sein, reichen aber nicht zur Auswahl. Modell, Prompt, Kontext, Tools, Berechtigungen, Schwierigkeit und menschliches Review beeinflussen das Ergebnis. Ändert sich eine Bedingung, beantwortet der Vergleich möglicherweise nicht mehr dieselbe Frage.

> Die Evaluationseinheit ist keine polierte Antwort. Sie besteht aus festem Input, beobachtbarer Aktion, Abnahmeregel, Evidenzpaket und angegebenem Umfang.

## Entscheidungsobjekte trennen

| Objekt | Frage | Mindestevidenz |
|---|---|---|
| Standardmodell | Welcher Kandidat erfüllt Qualitäts- und Sicherheitsgates auf festen Tasks? | Feste Tasks, Wiederholungen, Bewertung, Fehlerarten |
| Skill | Verringert die Methode Auslassungen oder Nacharbeit bei gleichem Input? | Baseline-/Kandidat-Differenz und Trigger-Record |
| Workflow | Rechtfertigen Planung und Prüfung ihre Zusatzkosten? | Stufenlog, Diff, Validierung, Nacharbeit |
| Berechtigung | Liefert neuer Handlungsspielraum messbaren autorisierten Nutzen? | Berechtigungstabelle, Nebeneffekte, Wiederherstellungskosten |

Vor dem Lauf schreibst du eine Decision Card: begrenzte Frage, Owner, echte Kandidaten, Task-Version, Mindestqualität, Red Lines —keine Geheimnisse, keine unautorisierten externen Writes, keine erfundene Evidenz—, Kostengrenze, Log-Ort, Aktion, Umfang, Unbekannte und nächstes Review. Ein nicht ausführbarer Kandidat ist `not_run`, keine Vorhersage.

## Bedingungen einfrieren

Ein wiederverwendbares Task Set enthält Normalfall, fehlenden Input oder Konflikt, Fehler, Transfer und mindestens eine Aufgabe mit menschlichem Urteil. Jede Task hat ID, Version, Input, erlaubte Aktionen, erwartete Evidenz, verbotenes Verhalten und Pass-Regel.

Friere Task-Text, redigierten Input, Kontext, Modell-ID, Surface, Tools, Netzwerk, Rechte, Zeitbudget, Wiederholungen, Format, Rubrik, Reviewer, Hashes und Recovery ein. Lösche keine Task wegen schlechter Leistung; erstelle eine neue Version mit Begründung. Bei Bedingungsänderung erstellst du eine neue Entscheidung oder markierst `not_comparable`.

Jeder Versuch braucht `run_id`, `attempt_id`, Kandidat, Task, Surface, Modell, Workflow, Zeiten, Input-Hash, Rechte, Tool-Versionen, Timeline, Diff, Validierung, Reviewer, First Pass, Nacharbeit, Kosten und Basis, Fehlerkategorie, Vergleichbarkeit und Status. Ein erfolgreicher Retry darf den ersten Versuch nicht überschreiben.

## Übung: Smoke-Vergleich mit drei Tasks

Nutze in einer temporären Kopie drei feste synthetische Inputs: Claim/Status/Evidenz extrahieren, ohne Faktenänderung nach Markdown überführen und prüfen, warum Code plus Build keine Fertigstellung beweisen. Vergleiche A mit nur Task und Input gegen B mit Protokoll, minimalem Kontext und Evidenzregeln. Surface, Tools, Rechte, Netzwerk, Zeit und Reviewer bleiben gleich; nur eine Variable ändert sich.

Bewerte Faktenrichtigkeit, Feldvollständigkeit, Umfangstreue, Evidenzbezug und sicheres Stoppen jeweils mit 0–2. Ein Pass braucht 8/10 und für Umfang sowie sicheres Stoppen jeweils mindestens 1. Ändern sich Hash, Rechte, Tool-Version, Kapazität oder andere Bedingungen, bewahrst du die Timeline und setzt `not_comparable`; du füllst nicht mit Retry oder Ergebnis des anderen Kandidaten auf.

Sind sechs Run Records unvollständig, sind nur `continue_test`, `blocked` oder `not_run` ehrlich. Ein bestandener Smoke-Test heißt nur „Ausweitung prüfen“, nicht „bestes Modell“ oder „höhere Produktivität“.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="18-content-design-data-automation-DE.md">← Vorheriges<br><strong>Kapitel 18 · Pfad für Inhalte, Design, Daten und Automatisierung</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-DE.md">Nächstes Kapitel in Arbeit →<br><strong>Verfügbarkeit von Kapitel 20 ansehen</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
