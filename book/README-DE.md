<!-- content_id: book-readme | locale: DE | language: de | default_locale: EN | content_status: candidate | translation_status: in-progress | reader_runtime_status: not_run | translated_from: EN | source_revision: dd08a68 -->

# Codex: From First Task to Real Work — Buchleitfaden

> Deutscher Buch-Einstieg (`DE`). Die Kapitelkörper sind noch nicht vollständig
> ins Deutsche übertragen und nicht vollständig zur Laufzeit geprüft.

Navigation:

- [Zum deutschen Projekt-Einstieg](../README-DE.md)
- [Deutsches Vorwort](preface-DE.md)
- [Deutsches Inhaltsverzeichnis](table-of-contents-DE.md)

Hier liegt die originale Hauptlinie des Buches `Codex: From First Task to Real
Work`. Sie ist nach dem Wachstum der Lernenden aufgebaut und nicht als
Sammlung unabhängiger externer Projekte. Das Buch erklärt zuerst die Ideen und
lässt die Entscheidungen üben, die diese Ideen in echter Arbeit zuverlässig
machen.

## Vertrag für jedes Kapitel

Bevor ein Kapitel in den Hauptlernpfad aufgenommen wird, muss es Folgendes
sichtbar machen:

- ein Lernziel;
- die Konzepte, die für die Entscheidung nötig sind;
- ein kleinstes nützliches Experiment;
- einen absichtlichen Fehler oder Grenzfall;
- eine Übertragungsaufgabe in einem anderen Kontext;
- Abnahmebelege, die eine lesende Person tatsächlich prüfen kann;
- aktuelle Fakten mit Quelle und Prüfungsumfang; und
- einen Reife- und Aktualisierungsstatus, der die Belege nicht übertreibt.

Die Mindestanforderung beschreibt der
[Evaluationsrahmen — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](../docs/quality/evaluation-framework.md).
Eine Gliederung, ein bestandener Struktur-Checker oder eine gut aussehende
generierte Antwort reicht nicht aus, um ein Kapitel `verified` zu nennen.

## Aktueller Lesestatus

Das Repository enthält 22 strukturierte Kapitel. Ihr aufgezeichneter
Inhaltsstatus ist `candidate`. Für die Kapitel 19–22 existieren Entwürfe; ihr
Status bleibt jedoch „Entwurf geschrieben, Fresh-Context-Vortest ausstehend“.
Die Dateien sind vorhanden, aber Ausführungs- und Prüfbelege fehlen noch.

Die Evaluations-Fixtures umfassen 39 feste Aufgaben in 16 Spuren. Sie sind
`candidate`, ihr `run_status` ist `not_run`, und die Prüfung bleibt bis zu
Modellausführungsprotokollen auf statische Struktur beschränkt. Die Sammlung
enthält 13 Labs; jedes ist derzeit `draft` mit `run_status: not_run`.

Für die drei deutschen Einstiege gilt separat:

- `content_status: candidate`: Struktur und grundlegende statische Prüfung
  sind vorhanden.
- `translation_status: in-progress`: unabhängige deutsche Sprachprüfung und
  vollständige Übersetzungsreview fehlen noch.
- `reader_runtime_status: not_run`: Es gibt kein Browser-, Runtime- oder
  Leserakzeptanzprotokoll für diese deutsche Migration.

Diese Angaben sind nicht austauschbar. Eine Übersetzung kann strukturell
`candidate` sein, während der zugrunde liegende Lernlauf `draft` oder
`not_run` bleibt.

## Wo der deutsche Einstieg weiterführt

- [Deutsches Vorwort](preface-DE.md)
- [Deutsches Inhaltsverzeichnis](table-of-contents-DE.md)
- [Evaluationsrahmen — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](../docs/quality/evaluation-framework.md)
- [Luna-Modellevaluation — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](../docs/model-evaluation-luna.md)
- [Codex-Baseline-Forschung — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](../docs/research/openai-codex-baseline.md)
- [Index der Real-Problem-Forschung — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](../docs/research/field-problems-index-2026-08-10.md)

Das deutsche Inhaltsverzeichnis liegt jetzt unter
`table-of-contents-DE.md`. Kapitel und Labs haben noch keine vollständige
deutsche Variante; die dort sichtbaren Migrationshinweise markieren deshalb
weiterhin den locale-neutralen Quellpfad.

## Reale Probleme und ihre Evidenzgrenze

Die Forschungsstrecke sammelt öffentliche Berichte und Community-Erfahrungen zu
Authentifizierung, Provider-Konfiguration, Worktrees, Cloud-Oberflächen,
Netzwerk-Allowlisting, Updater-Verhalten und weiteren Codex-Abläufen. Diese
Fälle schärfen eine Entscheidungsgrenze oder einen Fehler-Übungsschritt. Sie
werden nicht stillschweigend zu offiziellen Ursachen umgeschrieben.

Ein Bericht belegt ein berichtetes Symptom, nicht automatisch die Ursache. Ein
Community-Workaround ist kein unterstützter Produktfix. Erst eine ausdrücklich
aufgezeichnete lokale Reproduktion kann zeigen, dass sich ein Fall in der
untersuchten Umgebung reproduzieren lässt. Fehlt ein Ausführungslog, bleibt
der Lauf `not_run`; eine plausible Antwort oder ein statischer Check ersetzt
keinen Laufbeleg. Quelle, Datum, Evidenzstufe, Umfang und Reproduktionsstatus
müssen zusammen gelesen werden.

Für die Ausgangsdokumente siehe den
[Real-Problem-Forschungsindex — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](../docs/research/field-problems-index-2026-08-10.md)
und die
[Codex-Problemforschung — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](../docs/research/field-problems-codex.md).

## Struktur des Buches

| Ort | Inhalt | Aktueller Migrationsstatus |
|---|---|---|
| `book/chapters/` | 22 Hauptkapitel | Noch keine vollständige `-DE`-Matrix für die vorhandenen Dateien |
| `book/labs/` | 13 praktische Labs | Noch keine vollständige `-DE`-Matrix; Ausführungen `not_run` |
| `book/table-of-contents-DE.md` | Deutsches Leseverzeichnis und Kapiteleinstiege | Erste Migration, Kapitel und Labs weiterhin in Arbeit |
| `book/README-DE.md` | Dieser deutsche Buchleitfaden | Erste Migration, `candidate`, Übersetzung `in-progress` |
| `book/preface-DE.md` | Deutsches Vorwort | Erste Migration, `candidate`, Übersetzung `in-progress` |

„Noch nicht migriert“ bedeutet: kein englischer oder deutscher Inhalt wird
stillschweigend vorgetäuscht. Wenn ein aktueller Originalpfad verlinkt wird,
steht die Migrationsnotiz im sichtbaren Linktext.

## Locale-Regel und Links

Das Projekt unterstützt genau sechs Locales:

| Locale | Suffix | URL-Token | HTML-`lang` | Anzeigename |
|---|---|---|---|---|
| EN | `-EN` | `en` | `en` | English |
| ZH | `-ZH` | `zh` | `zh-CN` | 简体中文 |
| ES | `-ES` | `es` | `es` | Español |
| JA | `-JA` | `ja` | `ja` | 日本語 |
| KO | `-KO` | `ko` | `ko` | 한국어 |
| DE | `-DE` | `de` | `de` | Deutsch |

Jede translatierbare Datei folgt `<stabiler-stem>-<LOCALE>.md`, auch die
englische Quelle. Wenn das Ziel existiert, bleibt ein reader-facing Link in
derselben Locale und beim selben `content_id`: Von dieser Datei geht es also
zu `preface-DE.md`, nicht zu `preface-EN.md` oder `preface-ZH.md`.

Locale-neutrale Governance-, Quellen- und Validator-Dateien können während der
Migration verlinkt werden. Leserinnen und Leser müssen dann im Linktext sehen,
dass die deutsche Migration noch läuft und der aktuelle Pfad locale-neutral
ist. Für ein fehlendes `-DE`-Ziel gibt es keinen stillen Rückfall auf Englisch
oder auf ein altes unsuffixiertes reader-facing Dokument.

## Lesen und Statusgrenzen

Die Kapitel verwenden `draft`, `candidate`, `verified` und `production-ready`
für die Inhaltsreife. Veränderliche Fakten verwenden eigene Zustände wie
`current`, `stale`, `disputed` und `removed`. Übersetzungsstatus und
Ausführungsstatus sind davon getrennt. Das Vorhandensein einer Datei, ein
bestandener Link-Checker oder eine vollständige wirkende Übersetzung hebt den
Inhalt nicht automatisch auf `verified`.

## Umfang dieses deutschen Schnitts

Dieser erste deutsche Schnitt erstellt nur die drei Einstiegsdateien
`README-DE.md`, `book/README-DE.md` und `book/preface-DE.md`. Kapitel, Labs,
Skills, Evaluations-Fixtures, Forschung und Site bleiben in ihren jeweils
aufgezeichneten Zuständen. Die nächste Migration muss denselben `content_id`,
das Suffix `-DE`, die Quellenrevision und die sichtbare Evidenzgrenze
beibehalten.
