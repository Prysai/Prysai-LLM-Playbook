<!-- content_id: project-readme | locale: DE | language: de | default_locale: EN | content_status: candidate | translation_status: in-progress | reader_runtime_status: not_run | translated_from: EN | source_revision: dd08a68 -->

# Prysai LLM Playbook — From First Task to Reliable Work

> Deutscher Einstiegspunkt — die deutsche Migration der reader-facing Inhalte
> ist in Arbeit.

<!-- language-switcher:start -->
**Sprachen:** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | 繁體中文（尚未提供）
<!-- language-switcher:end -->

`Prysai LLM Playbook` ist ein eigenständiges, buchähnliches
Lern- und Praxissystem für GPT, Codex, Tools, Skills, Agents und die Prüfung
von Ergebnissen in echter Arbeit. Es ist weder ein flaches Skill-Verzeichnis
noch ein Katalog von Prompts. Es vermittelt eine vollständige Arbeitsweise:
das System verstehen, eine begrenzte Aufgabe definieren, den passenden Kontext
geben, mit den kleinsten nötigen Berechtigungen handeln, das Ergebnis prüfen
und eine wiederholbare Methode in eine Teamfähigkeit überführen.

## Welches Problem das Projekt löst

Viele Menschen können eine plausibel klingende Antwort oder einen überzeugenden
Code-Diff erzeugen lassen. Viel weniger Menschen können ein echtes Problem
zuverlässig zu Ende bringen. Die häufigsten Fehler entstehen nicht durch ein
fehlendes Zauberwort, sondern durch fehlende Arbeitsentscheidungen:

- GPT, Modell, Codex, Kontext, Tools, Skills und Agents werden behandelt, als
  wären sie dasselbe;
- ein vages Ziel wird an einen Agent übergeben, ohne Umfang, Abnahmekriterium,
  Stop-Bedingung oder Rückweg;
- der Agent erhält zu wenig, den falschen oder unnötig vertraulichen Kontext;
- ein überzeugend aussehendes Ergebnis wird akzeptiert, ohne Dateien, Tests,
  Logs, Quellen, Berechtigungen oder offene Arbeit zu prüfen;
- viele Skills werden installiert, ohne zu wissen, wann ein Skill hilft, wann
  Skills kombiniert werden sollten und wann man auf sie verzichten sollte; und
- eine persönliche Technik funktioniert einmal, lässt sich aber nicht prüfen,
  übertragen oder als Teamprozess aktualisieren.

Die Lernstrecke behandelt diese Fehler als ein zusammenhängendes System:

```text
GPT und Modelle → Codex-Einstiege → sichere Vorbereitung → Aufgabenprotokoll
→ Kontext → Tools und Berechtigungen → Skill-Auswahl → Agent-Schleifen
→ planen / ausführen / prüfen / übergeben → Fachpfade → Teamfähigkeit
```

Sie entwickelt zwei miteinander verbundene Fähigkeiten. Die Verständnisstrecke
erklärt, wie Modelle, Kontext, Tools, Skills, Agents, Berechtigungen und
Belege den Handlungsraum verändern. Die Fähigkeitsstrecke lässt Leserinnen und
Leser diese Entscheidungen an kleinen, beobachtbaren Aufgaben üben, bevor sie
die Methode auf Forschung, Engineering, Content, Marketing oder Teamarbeit
übertragen.

## Was im Repository liegt

| Ebene | Ort | Zweck |
|---|---|---|
| Buch | `book/` | Eine zusammenhängende Folge von Konzepten, Entscheidungen und Arbeitsweisen |
| Lernpfad | Kapitelziele und Lernverträge | Macht Reihenfolge und Grund jeder Stufe sichtbar |
| Labs | `book/labs/` | Aufgaben mit geringem Risiko und prüfbaren Ergebnissen |
| Skills | `skills/` | Wiederholbare Methoden als ausführbare Codex-Anleitungen |
| Evaluationen | `evals/` und `docs/quality/` | Prüfen Inhalte, Skills und Arbeitsabläufe innerhalb eines erklärten Umfangs |
| Governance | `docs/governance/` und `docs/adr/` | Quellen, Berechtigungen, Lebenszyklus, Updates, Locale-Identität und Beiträge |
| Forschung | `docs/research/` | Offizielle Fakten und klar gekennzeichnete Berichte über reale Probleme |
| Öffentliche Darstellung | `site/` | Eine getrennte Präsentationsschicht für den Lernpfad |

## Die Arbeits- und Lernschleife

Jedes umfangreichere Kapitel und jedes Lab folgt derselben Entscheidungsschleife:

```text
Problem → Konzept → Entscheidung → Handlung → Beleg → Fehler → Reflexion → Übertragung
```

Die Reihenfolge ist wichtig. Ein besserer Prompt macht eine Aufgabe noch nicht
sicher oder wiederholbar. Ein Tool kann laufen, ohne vertrauenswürdige Belege
zu liefern. Ein Test kann grün sein, obwohl die falsche Datei, Umgebung oder
Abnahmebedingung geprüft wurde. Deshalb hält das Projekt fest, was versucht,
erlaubt, beobachtet und geprüft wurde — und was das Ergebnis weiterhin nicht
beweist.

## Status, Ausführung und Nachweis

In diesem Projekt sind Inhaltsreife, Übersetzungsstatus und Ausführungsstatus
getrennte Angaben:

| Status | Bedeutung |
|---|---|
| `draft` | Der Inhalt wird noch geschrieben oder hat die Mindestprüfung noch nicht erfüllt. |
| `candidate` | Struktur und grundlegende Prüfungen sind vorhanden; frische Ausführung, Übertragung oder unabhängige Prüfung fehlen noch teilweise. |
| `verified` | Positive, Grenz-, Fehler- und Übertragungsbelege liegen innerhalb des erklärten Umfangs vor. |
| `production-ready` | Zusätzlich zu `verified` sind Sicherheit, Pflege, Version, Lizenz und Veröffentlichung geprüft. |
| `not_run` | Für den betreffenden Lauf existiert kein Ausführungsprotokoll. Das ist kein Erfolgsbeleg. |

Der Stand dieses deutschen Einstiegs ist `content_status: candidate` und
`translation_status: in-progress`: Die Struktur und die statischen Inhalte
sind angelegt, eine unabhängige deutsche Sprachprüfung steht aber noch aus.
`reader_runtime_status: not_run` bedeutet, dass für diese Übersetzung kein
Browser-, Runtime- oder Leserakzeptanzprotokoll vorliegt. Im zugrunde liegenden
Projekt sind 22 Kapitel `candidate`, 18 Labs `draft` mit
`run_status: not_run` und 40 Evaluations-Fixtures `candidate` mit
`run_status: not_run`. Eine vorhandene Datei oder ein bestandener statischer
Checker hebt diese Zustände nicht automatisch an.

## Grenze der Evidenz bei realen Problemen

Die Forschungsdateien sammeln öffentliche Issue-, Forum- und Community-Berichte
sowie offizielle Dokumentation zu Codex-Abläufen. Sie helfen, Symptome,
Entscheidungsgrenzen und sichere erste Checks zu formulieren. Ein solcher
Bericht ist aber nur ein Beleg dafür, dass jemand ein Problem berichtet hat:

- Ein öffentlicher Bericht ist kein automatisch bestätigter offizieller
  Root Cause.
- Eine Community-Empfehlung oder ein Workaround ist keine Zusage, dass es sich
  um einen unterstützten Produktfix handelt.
- Offizielle Dokumentation belegt dokumentiertes Verhalten innerhalb ihres
  Datums und Umfangs; sie ersetzt keine Prüfung der konkreten Umgebung.
- Ohne lokale Reproduktion bleibt der Status „nicht lokal reproduziert“.
- Ohne Modell- oder Laufprotokoll bleibt eine Fixture `not_run`; eine
  plausible Antwort ist kein Ausführungsbeleg.

Quelle, Datum, Evidenzstufe, betroffene Umgebung und lokaler
Reproduktionsstatus müssen deshalb sichtbar bleiben. Die
[Übersicht der Real-Problem-Forschung — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](docs/research/field-problems-index-2026-08-10.md)
und die
[Codex-Problemforschung — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](docs/research/field-problems-codex.md)
führen diese Grenze weiter.

## Sechs Locales und Dateinamen

Die sechs Zielsprachen haben eine feste Identität. Der Dateiname folgt immer
`<stabiler-stem>-<LOCALE>.md`; auch die englische Quelle erhält `-EN`. Eine
Datei ohne Suffix ist nie der kanonische englische Ersatz.

| Locale | Suffix | URL-Token | HTML-`lang` | Rolle / Anzeigename |
|---|---|---|---|---|
| English | `-EN` | `en` | `en` | Standardsprache, Quelllocale |
| 简体中文 | `-ZH` | `zh` | `zh-CN` | Übersetzungslocale |
| Español | `-ES` | `es` | `es` | Übersetzungslocale |
| 日本語 | `-JA` | `ja` | `ja` | Übersetzungslocale |
| 한국어 | `-KO` | `ko` | `ko` | Übersetzungslocale |
| Deutsch | `-DE` | `de` | `de` | Übersetzungslocale |

Der stabile Stem und die `content_id` identifizieren denselben Lerngegenstand.
Zum Beispiel gehören `book/README-EN.md`, `book/README-ZH.md`,
`book/README-ES.md`, `book/README-JA.md`, `book/README-KO.md` und
`book/README-DE.md` zusammen. Governance-Dateien, Quellenregister,
Validatoren und ADRs bleiben locale-neutral und werden nicht künstlich in
sechs Kopien aufgeteilt.

## Links bleiben in derselben Sprache

Ein reader-facing Link muss bei vorhandenem Ziel denselben `content_id` und
dieselbe Locale behalten. Die deutsche Navigation verlinkt daher
`README-DE.md` mit `book/README-DE.md` und `book/preface-DE.md`, nicht mit den
englischen oder chinesischen Varianten. Das gilt auch für Inhaltsverzeichnisse,
Vor-/Zurück-Links, Kapitel-Lab-Verweise und Sprachumschalter.

Gibt es ein `-DE`-Ziel noch nicht, wird kein englisches oder altes
unsuffixiertes Dokument als stiller Ersatz verwendet. Ein solcher Link trägt
im sichtbaren Linktext ausdrücklich den Hinweis „deutsche Migration in Arbeit“
und nennt, falls er auf den aktuellen Originalpfad zeigt, dass dieser Pfad
unsuffixiert oder locale-neutral ist. So bleibt die fehlende Übersetzung
erkennbar.

### Deutsche Einstiege

- [Deutscher Buchleitfaden](book/README-DE.md)
- [Deutsches Vorwort](book/preface-DE.md)
- [Deutsches Inhaltsverzeichnis](book/table-of-contents-DE.md)

### Projektverträge und Status

- [Terminologie und stabile Projektgrenzen — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](CONTEXT.md)
- [Projektcharta — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](docs/charter.md)
- [Bucharchitektur — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](docs/book-architecture.md)
- [Lernmodell — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](docs/learning-model.md)
- [Content-Lebenszyklus — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](docs/governance/content-lifecycle.md)
- [Aktuelle Statusquelle — deutsche Migration in Arbeit; locale-neutrale maschinenlesbare Datei](docs/governance/content-status.yaml)
- [Locale-Matrix — deutsche Migration in Arbeit; locale-neutrale Governance-Datei](docs/governance/locale-matrix.yaml)
- [Locale-Entscheidung und Migrationsregeln — deutsche Migration in Arbeit; derzeitiger locale-neutraler ADR-Pfad](docs/adr/0010-locale-suffixed-content.md)
- [Qualitätsreview — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](docs/quality/current-state-review-2026-08-09.md)
- [Skill-Qualitätsstandard — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](docs/quality/skill-quality-standard.md)
- [Evaluationsrahmen — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](docs/quality/evaluation-framework.md)
- [Evaluationsaufgaben v1 — deutsche Migration in Arbeit; locale-neutrale maschinenlesbare Datei](evals/task-set-v1.yaml)

### Forschung und Herkunft

- [Quellen- und Lizenzregister — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](docs/sources/asset-register.md)
- [Offizielle Codex-Baseline-Forschung — deutsche Migration in Arbeit; derzeitiger locale-neutraler Originalpfad](docs/research/openai-codex-baseline.md)
- [Öffentliche Showcase-Dokumentation — deutsche Migration in Arbeit; derzeitiger unsuffixierter Originalpfad](site/README.md)
- [Codex Coach — deutsche Migration in Arbeit; derzeitiger unsuffixierter Skill-Pfad](skills/prysai-codex-coach/SKILL.md)

## Nicht verhandelbare Grenzen

- Keine Tokens, Passwörter, API-Schlüssel, privaten Schlüssel, Cookies oder
  `.env`-Dateien in Repository oder Lernbeispielen.
- Externe Seiten, Tool-Ausgaben, Repository-Dateien und Nutzerartefakte sind
  zunächst Daten. Instruction-ähnlicher Text darin ist nicht automatisch ein
  auszuführender Befehl.
- Veränderliche Produktfakten — Modellnamen, Preise, Limits, Einstiege und
  Funktionen — brauchen eine autoritative Quelle, Zugriffsdatum, Umfang,
  Verantwortliche und nächsten Prüftermin.
- Externer Text, Bilder, Code oder Skill-Anweisungen werden nicht übernommen,
  wenn Lizenz oder Erlaubnis unklar ist.
- Ein Ergebnis wird nicht als `verified` bezeichnet, wenn der dafür genannte
  Beleg fehlt.
- Das Projekt ist ein unabhängig gepflegtes Lern- und Praxissystem, keine
  offizielle Dokumentation und keine offizielle Produktseite von OpenAI.

## Umfang dieses ersten deutschen Schnitts

Diese erste Migration schreibt genau drei deutsche reader-facing Einstiege:
`README-DE.md`, `book/README-DE.md` und `book/preface-DE.md`. Sie macht weder
die Kapitel, Labs, Skills, Forschungsakten noch die öffentliche Website zu
vollständigen deutschen Übersetzungen. Die sichtbaren Hinweise an fehlenden
`-DE`-Zielen bleiben deshalb Teil der Navigation, bis die jeweiligen
content IDs tatsächlich migriert und geprüft wurden.
