<!-- content_id: book-table-of-contents | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: dd08a68 -->

# Prysai LLM Playbook: Inhaltsverzeichnis v0.2

> Deutsche Inhaltsverzeichnisseite (`DE`). Diese Migrationsscheibe basiert auf
> `book/table-of-contents.md` und bewahrt alle 22 Kapitel, 17 Experimente,
> Statusgrenzen sowie die Einstiege in die Forschung zu realen Problemen. Sie
> behauptet nicht, dass Kapitel, Experimente oder Laufzeitprüfung bereits in
> sechs Sprachen migriert sind.

## Migrationsstatus und Linkregel

- `content_status` dieser Seite: `candidate`; Quellrevision: `dd08a68`.
- Alle 22 Kapiteleinträge und 13 echten Experimentdateien bleiben enthalten.
- Kapitel haben den Status `candidate`; Experimente sind `draft` mit
  `run_status: not_run`.
- Die zugehörige volatile Aussage von Kapitel 6 hat
  `claim_status: disputed`; Kapitel 22 hat `claim_status: current | disputed`.
- Für DE existieren bereits lokalisierte Projekt-, Buch-, Vorwort- und
  Inhaltsverzeichnis-Einstiege. Kapitel 1 und lab-011 haben jetzt deutsche
  Schnitte; die übrigen Kapitel und Experimente befinden sich noch in Migration.
  Ihre Einträge zeigen diesen Status ausdrücklich. Gemeinsame Governance-,
  Evaluations- und Forschungsdateien sind als `locale-neutral` markiert.
- Es gibt keinen stillen Fallback auf eine andere Sprache. Ein fehlendes
  lokales Ziel ist im Linktext sichtbar gekennzeichnet.

## Leseeinstiege

- Projektseite: [`README-DE.md`](../README-DE.md) — erste deutsche Migration, Sprachreview noch offen.
- Buchübersicht: [`book/README-DE.md`](README-DE.md) — erste deutsche Migration, Sprachreview noch offen.
- Vorwort: [`book/preface-DE.md`](preface-DE.md) — erste deutsche Migration, Sprachreview noch offen.
- [Lernpfad-Vertrag — locale-neutral](../docs/governance/learning-path.yaml)
- [Locale-Matrix — locale-neutral](../docs/governance/locale-matrix.yaml)

## Teil I: Von GPT-Verständnis zur ersten sicheren Nutzung

### Kapitel 1 — Erst GPT verstehen, dann die Arbeitsweise von Codex

Wie Modelle aus Kontext generieren; wie Codex ein Modell an eine
Arbeitsumgebung anschließt; und wie Kontext, Tools, Skills, Berechtigungen und
eine beobachtbare Agent-Schleife das Ergebnis beeinflussen.
**content_status:** `candidate`

- Kapitel: Kapitel-1-Quelle auf DE (deutsche Fassung noch nicht verfügbar)
- Experiment: lab-011-Quelle auf DE (deutsche Fassung noch nicht verfügbar)

### Kapitel 2 — Eine erste sichere, überprüfbare Aufgabe erledigen

Eine risikoarme Aufgabe auswählen, ein erstes Aufgabenprotokoll schreiben,
Bestätigungspunkte setzen und Übergabenachweise hinterlassen.
**content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experiment: [lab-001 · Erste sichere Aufgabe](labs/lab-001-first-safe-task-DE.md) · `draft` · `not_run` · unabhängige Sprachprüfung ausstehend

### Kapitel 3 — Aus einem Wunsch ein Aufgabenprotokoll machen

Ziel, Hintergrund, Eingaben, Einschränkungen, erlaubte Aktionen, Abnahme,
Fehlerbehandlung und Lieferformat definieren. **content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experiment: lab-002 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)

### Kapitel 4 — Kontext, Berechtigungen und Aktionsgrenzen des Agents

Kontextschichten, Vertrauensgrenzen, Sandbox, Freigaben, externe
Nebenwirkungen und beobachtbares Verhalten. **content_status:** `candidate`

- Kapitel: Kapitel 4 · DE-Quelle (deutsche Fassung noch nicht verfügbar)
- Experiment: Lab 007 · DE-Quelle (deutsche Fassung noch nicht verfügbar)

### Kapitel 5 — Die richtige Codex-Oberfläche auswählen

Aufgaben passend zwischen Desktop-App, CLI, IDE, Cloud und Remote auswählen.
**content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experiment: Lab 007 · DE-Quelle (deutsche Fassung noch nicht verfügbar)

### Kapitel 6 — Modellauswahl ist keine Modellverehrung

Modelle anhand von Aufgabenset, Kosten, Geschwindigkeit, Stabilität und
Überprüfung vergleichen; Annahmen über die Modellpositionierung testen.
**content_status:** `candidate` · zugehörige volatile Aussage:
`claim_status: disputed`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Forschung: [OpenAI/Codex-Baseline — locale-neutrale Forschung](../docs/research/openai-codex-baseline.md)

## Teil II: Vom Nutzer zum Workflow-Designer

### Kapitel 7 — Wie Skills, Plugins, MCP und Tools die Arbeit aufteilen

Methoden-, Verbindungs-, Ausführungs- und Verteilungsebene verstehen und die
kleinste wirksame Kombination auswählen. **content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experiment: lab-004 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)

### Kapitel 8 — Der vollständige Lebenszyklus von der Definition bis zur Lieferung

Definition, Planung, Aufbau, Prüfung, Review, Lieferung und Wartung mit
überprüfbaren vertikalen Schnitten. **content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Primäre Übung: lab-013 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Unterstützende Übung: lab-009 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)

### Kapitel 9 — Überprüfung, Zweifel und Wiederherstellung

Fertigstellungsbehauptungen in Behauptung und Nachweis zerlegen; Unsicherheit,
Fehler und Wiederherstellung bearbeiten. **content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experiment: lab-003 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)

### Kapitel 10 — Planung und vertikale Schnitte

Ein großes Ziel in Lieferabschnitte mit klaren Abhängigkeiten, ausführbaren
Schritten und prüfbaren Kontrollen zerlegen. **content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experimente: lab-002 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar) · lab-013 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)

### Kapitel 11 — Einen wirklich nützlichen Skill entwerfen

Auslösegrenzen, progressive Offenlegung, Ressourcen, Skripte, Ausgaben,
Fehlerbeispiele, Evaluation und Versionierung. **content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experiment: lab-005 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)

### Kapitel 12 — Schleife, Zustand und Stoppbedingungen des Agents

Beobachten, planen, handeln, Feedback, Wiederholung, Bestätigung und Stopp;
Verhalten erklären, ohne verborgene Schlussfolgerungen zu erfinden.
**content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experiment: lab-006 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)

### Kapitel 13 — Aktionsgrenzen für Dateien, Terminal, Browser und GitHub

Nur-Lese-Prüfungen, Bearbeitung, Befehle, Browsing, Commits, Pushes, externe
Nachrichten und Rollback. **content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experiment: Lab 007 · DE-Quelle (deutsche Fassung noch nicht verfügbar)

## Teil III: Skills, Tools und professionelle Praxis

### Kapitel 14 — Externe Skills finden, installieren und prüfen

Vom Index zur vertrauenswürdigen Fähigkeit: Quelle, Lizenz, Abhängigkeiten,
Authentifizierung, Trigger und Wartung. **content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experimente: lab-004 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar) · lab-005 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)

### Kapitel 15 — Forschungspfad: Von der Frage zu prüfbarem Wissen

Die Forschungsfrage eingrenzen und Quellen, Zitate, Methode, Gegenprüfung,
Offenlegung und Vollständigkeit behandeln. **content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experiment: lab-008 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)

### Kapitel 16 — Engineering-Pfad: Von der Idee zu zuverlässiger Software

Anforderungen, Spezifikationen, Planung, inkrementelle Umsetzung, Tests,
Debugging, Review, Veröffentlichung und Migration. **content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experiment: lab-009 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)

### Kapitel 17 — Marketing-Pfad: Vom Produktverständnis zu Wachstumsexperimenten

Produktkontext, Zielgruppe, Positionierung, Inhalte, Konversion, Messung und
Attribution. **content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experiment: lab-010 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)

### Kapitel 18 — Pfad für Inhalte, Design, Daten und Automatisierung

Das externe Ökosystem nach Aufgabenfähigkeiten nutzen, statt blind alle Skills
zu installieren. **content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experiment: lab-004 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)

## Teil IV: Von geübter Nutzung zur Organisation

### Kapitel 19 — Modelle und Workflows evaluieren

Aufgabensets erstellen, Experimente wiederholen, menschlich bewerten und Fehler
klassifizieren. **content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experimente: lab-003 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar) · lab-009 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Evaluationsrahmen: [locale-neutrale Governance](../docs/quality/evaluation-framework.md)

### Kapitel 20 — Ein persönliches Codex-Arbeitssystem aufbauen

Projektkontext, Gedächtnis, Vorlagen, wiederkehrende Abläufe und Retrospektiven.
**content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experimente: [lab-001 · Erste sichere Aufgabe](labs/lab-001-first-safe-task-DE.md) · `draft` · `not_run` · unabhängige Sprachprüfung ausstehend · lab-010 · Migration läuft · deutsche Fassung noch nicht verfügbar

### Kapitel 21 — Ein Team-Fähigkeitssystem aufbauen

Gemeinsame Skills, `AGENTS.md`, Berechtigungen, Evaluation, Review, Beiträge und
Versionierung. **content_status:** `candidate`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experiment: lab-012 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)

### Kapitel 22 — Kontinuierliche Aktualisierung und Zukunftssicherheit

Veränderliche Fakten erkennen, Quellen aktualisieren, Modelle migrieren, Tools
prüfen und veraltete Fähigkeiten entfernen. **content_status:** `candidate` ·
zugehörige volatile Aussage: `claim_status: current | disputed`

- Kapitel: Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)
- Experimente: lab-008 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar) · lab-010 · Migration läuft · aktueller Quellpfad (deutsche Fassung noch nicht verfügbar)

## Experimentindex und Statusgrenzen

Das Repository enthält 13 echte Experimentdateien. Alle bleiben `draft` und
`run_status: not_run`; ein Link im Inhaltsverzeichnis ist ein Leseeinstieg und
kein Nachweis dafür, dass Experiment oder Lernergebnis verifiziert sind.

| Experiment | Schwerpunkt | Status | Einstieg |
|---|---|---|---|
| lab-001 | Erste sichere Aufgabe | `draft` · `not_run` | [deutsche Kandidatenübersetzung](labs/lab-001-first-safe-task-DE.md) · unabhängige Sprachprüfung ausstehend |
| lab-002 | Aufgabenprotokoll | `draft` · `not_run` | Migration läuft · aktuelle Quelle (deutsche Fassung noch nicht verfügbar) |
| lab-003 | Evidenzprüfung | `draft` · `not_run` | Migration läuft · aktuelle Quelle (deutsche Fassung noch nicht verfügbar) |
| lab-004 | Skill-Auswahl | `draft` · `not_run` | Migration läuft · aktuelle Quelle (deutsche Fassung noch nicht verfügbar) |
| lab-005 | Skill-Design | `draft` · `not_run` | Migration läuft · aktuelle Quelle (deutsche Fassung noch nicht verfügbar) |
| lab-006 | Stoppbedingungen des Agents | `draft` · `not_run` | Migration läuft · aktuelle Quelle (deutsche Fassung noch nicht verfügbar) |
| lab-007 | Aktionsgrenzen | `draft` · `not_run` | DE-Quelle (deutsche Fassung noch nicht verfügbar) |
| lab-008 | Forschungsfrage | `draft` · `not_run` | Migration läuft · aktuelle Quelle (deutsche Fassung noch nicht verfügbar) |
| lab-009 | Engineering-Lebenszyklus | `draft` · `not_run` | Migration läuft · aktuelle Quelle (deutsche Fassung noch nicht verfügbar) |
| lab-010 | Produktkontext | `draft` · `not_run` | Migration läuft · aktuelle Quelle (deutsche Fassung noch nicht verfügbar) |
| lab-011 | GPT, Codex, Tools und Agents | `draft` · `not_run` | DE-Quelle (deutsche Fassung noch nicht verfügbar) |
| lab-012 | Migration von Teamfähigkeiten | `draft` · `not_run` | Migration läuft · aktuelle Quelle (deutsche Fassung noch nicht verfügbar) |
| lab-013 | Prüfbarer L3-Vertikalschnitt | `draft` · `not_run` | Migration läuft · aktuelle Quelle (deutsche Fassung noch nicht verfügbar) |

## Evaluation, Status und Forschung zu realen Problemen

- Experimentindex — Migration läuft · aktuelle Quelle (deutsche Fassung noch nicht verfügbar): 13 echte Experimente, Stufen, Bereiche, Migrationsfokus und `lab_status`.
- [Inhaltsintegrationsmatrix — locale-neutrale Governance](../docs/content-matrix.md): Fähigkeitszuordnungen und zusätzliche Fähigkeiten bei thematischer Wiederholung.
- [Evaluationsrahmen — locale-neutrale Governance](../docs/quality/evaluation-framework.md): Abnahmeschwellen für Inhalte und Fähigkeiten.
- [Lernpfad-Vertrag — locale-neutrale Governance](../docs/governance/learning-path.yaml): Stufen, primäre und unterstützende Experimente sowie Aufstiegskriterien.
- [Forschung zu realen Codex-Nutzerproblemen — locale-neutrale Forschung](../docs/research/field-problems-codex.md): öffentliche Problemzugänge ohne vorgebliche offizielle Ursachen.
- [Index der Forschung zu realen Problemen — locale-neutrale Forschung](../docs/research/field-problems-index-2026-08-10.md): Zuordnung von FP, FP-S, FUP, Forenfunden und Kapitel-/Experimentorten.
- [Foren- und öffentliche-Issue-Forschung — locale-neutrale Forschung](../docs/research/field-problems-forums-2026-08-10.md): zuverlässig erreichbare Stack-Overflow-API/Seiten und GitHub-Issue-Zusammenfassungen.
- [Forschungsarchiv der offiziellen Baseline — locale-neutrale Forschung](../docs/research/openai-codex-baseline.md): Quellenbegrenzung für volatile Aussagen.

Die unabhängigen primären Experimente für L0, L3 und L6 sind lab-011 · DE-Quelle (deutsche Fassung noch nicht verfügbar), lab-013 · Migration läuft (deutsche Fassung noch nicht verfügbar) und lab-012 · Migration läuft (deutsche Fassung noch nicht verfügbar).
