<!-- content_id: book-readme | locale: DE | language: de | default_locale: EN | content_status: candidate | translation_status: in-progress | reader_runtime_status: not_run | translated_from: EN | source_revision: dd08a68 -->

# Prysai LLM Playbook: Buchleitfaden

> Deutscher Buch-Einstieg (`DE`). Alle 22 Kapitel und 18 Labs haben deutsche
> Leserpfade; unabhängige Sprachprüfung und Lernendenläufe stehen weiterhin aus.

<!-- language-switcher:start -->
**Sprachen:** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | 繁體中文（尚未提供）
<!-- language-switcher:end -->

Navigation:

- [Zum deutschen Projekt-Einstieg](../README-DE.md)
- [Deutsches Vorwort](preface-DE.md)
- [Deutsches Inhaltsverzeichnis](table-of-contents-DE.md)
- [Universelle LLM-Erstaufgabe — sichere Textübung](routes/universal-core-foundations-DE.md)
- [Die erste sichere Änderung — vollständiger deutscher Übungsentwurf](routes/first-safe-change-DE.md)

## Zwei erste lokalisierte Praxisschritte

Wenn du nur mit Textchat beginnen willst, öffne die [Einstiegskarten](communication-clinic-DE.md).
Sie enthalten sechs kopierbare Nachrichten für Sprache, Updates, Entscheidungen, Recherche und
Quellenprüfung. Dieser Pfad ist `draft / not_run` und verspricht weder Sprachflüssigkeit,
Effizienz noch Lernerfolg.

Wenn du noch kein Projekt hast und die KI nichts außerhalb des Chats tun soll,
beginne mit der [universellen LLM-Erstaufgabe](routes/universal-core-foundations-DE.md).
Du schreibst eine fiktive Mitteilung um und hältst Prüfung und Stopp-Punkt
sichtbar. Das ist eine Übung `candidate / not_run`; sie beweist weder
Lernergebnisse noch gleiches Verhalten auf verschiedenen Plattformen.

Bevor du eine Installation suchst oder dein eigenes Projekt verwendest,
bearbeite [Die erste sichere Änderung](routes/first-safe-change-DE.md): eine
wegwerfbare lokale Kopie, genau eine erlaubte Änderung und eine sichtbare
Abnahmebedingung. Die Route ist als Übersetzung `in-progress`; sie behauptet
weder eine unabhängige Sprachprüfung noch einen Lernendendurchlauf.

Hier liegt die originale Hauptlinie des Buches `Prysai LLM Playbook`. Sie ist nach dem Wachstum der Lernenden aufgebaut und nicht als
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

Die Mindestanforderung beschreibt der Evaluationsrahmen. Seine Aufzeichnungen
sind locale-neutral; ein statischer Check ersetzt weder Modell- noch
Lernendenbelege.
Eine Gliederung, ein bestandener Struktur-Checker oder eine gut aussehende
generierte Antwort reicht nicht aus, um ein Kapitel `verified` zu nennen.

## Aktueller Lesestatus

Das Repository enthält 22 strukturierte Kapitel. Ihr aufgezeichneter
Inhaltsstatus ist `candidate`. Für die Kapitel 19–22 existieren Entwürfe; ihr
Status bleibt jedoch „Entwurf geschrieben, Fresh-Context-Vortest ausstehend“.
Die Dateien sind vorhanden, aber Ausführungs- und Prüfbelege fehlen noch.

Die Evaluations-Fixtures umfassen 40 feste Aufgaben in 16 Spuren. Sie sind
`candidate`, ihr `run_status` ist `not_run`, und die Prüfung bleibt bis zu
Modellausführungsprotokollen auf statische Struktur beschränkt. Die Sammlung
enthält 18 Labs; jedes ist derzeit `draft` mit `run_status: not_run`.

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

Evaluationsrahmen, Luna-Modellevaluation und Forschungsakten haben noch keine
deutsche Lesefassung. Dieser Buchleitfaden verlinkt daher nicht auf ihre
Originalsprache.

Das deutsche Inhaltsverzeichnis liegt unter `table-of-contents-DE.md`. Alle
22 Kapitel und 18 Labs haben `-DE`-Pfade; ihre Übersetzungen bleiben
`in-progress` und unabhängig ungeprüft.

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

Die Ausgangsdokumente dieser Forschung liegen noch nicht auf Deutsch vor; die
deutsche Lesestrecke bleibt deshalb auf ihre verfügbaren Einheiten begrenzt.

## Struktur des Buches

| Ort | Inhalt | Aktueller Migrationsstatus |
|---|---|---|
| `book/chapters/` | 22 Hauptkapitel | 22 deutsche Kandidatenübersetzungen; unabhängige Sprachprüfung ausstehend |
| `book/labs/` | 18 praktische Labs | 18 deutsche Kandidatenübersetzungen; alle Lernendenläufe `not_run` |
| `book/table-of-contents-DE.md` | Deutsches Leseverzeichnis und Kapiteleinstiege | Vollständige deutsche Lesepfade, Übersetzung `in-progress` |
| `book/README-DE.md` | Dieser deutsche Buchleitfaden | `candidate`, Übersetzung `in-progress` |
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

Dieser Schnitt liefert deutsche Leserpfade für 22 Kapitel und 18 Labs. Skills,
Evaluations-Fixtures, Forschung und Site behalten ihren jeweils aufgezeichneten
Status. Weitere Änderungen müssen denselben `content_id`, das Suffix `-DE`,
die Quellenrevision und die sichtbare Evidenzgrenze beibehalten.
