# Drei-Aufgaben-Schnellvergleich v1

**Status:** `candidate`-Fixture-Paket · **Ausführungsbeleg:** `not_run`

Dieses gemeinsame Offline-Aufgabenpaket gehört zu Kapitel 6 und 19. Zwei Kandidatenmodelle oder Workflows erhalten dieselben drei kleinen Aufgaben, bevor ein Team über eine größere, kostenintensivere Bewertung entscheidet.

Ein bestandener lokaler Validator zeigt nur, dass eine Einreichung dem festen Schema und den Akzeptanzregeln entspricht. Er **beweist nicht** Qualität, Preis, Sicherheit, allgemeinen Nutzen, Lernergebnisse oder einen Gesamtsieger.

## Diese Bedingungen bleiben gleich

- Aufgaben-IDs, Anweisungen, synthetische Eingaben, erwartete Ausgaben und Hashes in `fixture.json`;
- pro Runde nur eine Vergleichsvariable: Modell, Workflow oder Arbeitsoberfläche;
- gleicher Kontext, gleiche Werkzeuge, Berechtigungen, Netzwerkbedingung, Zeitbudget und prüfende Person; und
- nach dem ersten Versuch höchstens eine vorher erklärte kontrollierte Überarbeitung.

Die Eingaben sind originäres synthetisches Lehrmaterial ohne Kundendaten, Zugangsdaten, Produktionsaufzeichnungen oder externen Quelltext.

## Eine Aufgabe ausführen

1. Übergib Anweisung und Eingabe unverändert an jeden Kandidaten und sichere Rohantworten vor menschlichen Änderungen.
2. Speichere die Antwort lokal unter dem erforderlichen Dateinamen.
3. Prüfe lokal. Der Validator nutzt weder Netzwerk noch Modellaufruf.

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py evals\candidates\three-task-smoke-v1\validate_submission.py `
  --task extract-01 `
  --submission <candidate-output>/candidate-a-extract-01.json
```

| Aufgabe | Einreichung | Prüfung |
| --- | --- | --- |
| `extract-01` | JSON-Array | strukturierte Extraktion ohne erfundene Fakten |
| `markdown-02` | Markdown-Datei | begrenzte Umformung bei Erhalt einer Unbekannten |
| `gap-review-03` | JSON-Objekt | Evidenzlücken prüfen, ohne vorhandene Evidenz abzuwerten |

Bei zwei Kandidaten bleiben sechs unabhängige Einreichungen erhalten; Bedingungen und Prüfergebnisse gehören in `run-record-template.yaml`. `not_run` sind Platzhalter, keine Ergebnisse.

## Ehrlich stoppen

Nutze `not_comparable`, wenn Unterbrechung, Berechtigungsblockade, geänderter Eingabe-Hash, Werkzeugversion oder eine andere feste Bedingung nur eine Seite betrifft. Ersetze eine unterbrochene Antwort nicht durch einen erfolgreichen Wiederholungsversuch. Selbst sechs vergleichbare Antworten erlauben nur eine auf diese Aufgaben begrenzte Entscheidung, kein allgemeines Modellranking.
