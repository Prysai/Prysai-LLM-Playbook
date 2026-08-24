<!-- content_id: ai-safety-field-signals-and-research-receipts-2026-08-13 | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: ai-safety-field-signals-and-research-receipts-2026-08-13.md | source_revision: 2026-08-23 -->

# Feldsignale zur KI-Sicherheit: Berechtigungen, Belege und Fortschritt erhalten

**Abruf:** 2026-08-13 (America/Los_Angeles)  
**Status:** `candidate`-Forschungsnotiz. Sie fasst wenige datierte öffentliche Berichte und vorsichtige Lehrfolgerungen des Projekts zusammen. Kein Bericht wurde lokal reproduziert; Modell, Agent, Lernende, Konto, Repository und Sicherheitskontrolle wurden nicht getestet.  
**Verantwortlich:** security-research-maintainer  
**Nächste Prüfung:** 2026-09-13 oder früher, wenn sich ein verknüpftes Issue oder eine Produktoberfläche wesentlich ändert.

## Forschungsfrage

Welche beobachtbaren Gewohnheiten helfen, bei einem langen, werkzeuggestützten oder forschenden Gespräch die ursprüngliche Autorisierung, die Belege für wichtige Aussagen und die noch offene Arbeit zu erhalten, wenn das Gespräch unübersichtlich wird?

Das ist keine Schwachstellenstudie. Die Notiz ordnet keine Produkte, schätzt keine Vorfallhäufigkeit, diagnostiziert kein Produkt und beweist nicht, dass eine Checkliste unsicheres Verhalten verhindert. Das enge Lehrziel ist eine prüfbare Übergabe: Man soll zeigen können, was freigegeben war, welche Quelle jede wichtige Aussage trägt, was tatsächlich geprüft wurde und warum die Arbeit stoppte.

## Evidenzklassen und Nutzungsgrenze

| Klasse | Verwendung | Belegt nicht |
| --- | --- | --- |
| `official fact` | Eine dokumentierte Risiko- oder Sicherheitsgrenze des Herausgebers | Verhalten im Konto des Lesers, Sicherheit einer Konfiguration oder Ursache eines Berichts |
| `public user report` | Die nachprüfbare Symptombeschreibung eines Autors | Häufigkeit, Ursache, aktuelle Reproduktion, Anbieterbestätigung oder Fix |
| `project inference` | Eine vorsichtige Lehrhandlung aus dem begrenzten Datensatz | Dass die Handlung als Sicherheitskontrolle genügt oder ein Ergebnis verbessert |
| `not_run` | Ein bewusst nicht ausgeführtes Produkt-, Lern- oder Angriffsszenario | Irgendein Laufzeit-, Sicherheits- oder Lernergebnis |

Die folgenden Texte sind eigene Zusammenfassungen. Issue-Texte, Beiträge, Prompts, Code, Anhänge, Screenshots, Logs und Workarounds wurden nicht kopiert; die Links sind Quellen, keine Ausführungsanweisungen.

## Vier Feldsignale und begrenzte Antworten

### S1 – Eine dynamische Instruktionsebene kann den Aufgabenstatus unklar machen

Eine Person aus der OpenAI Community berichtete nach dem Hinzufügen eines kurzen `instructions`-Werts zu einem Assistant-API-Lauf von inkonsistentem Verhalten [R1]. Das ist ein einzelner Bericht zu einer datierten API-Oberfläche, keine Aussage über das aktuelle Produkt und kein Grund, jeden Instruktionslayer als widersprüchlich anzusehen.

**Lehrhandlung:** Jede Eingabe wird vor dem Handeln klassifiziert:

```text
approved task: freigegebenes Ergebnis und Aktionsrahmen
project rule: bereits übernommene Repository- oder Teamregel
external data: zu prüfende Seite, Datei, Quelle, Issue oder Toolausgabe
unknown: nicht autorisiertes Material, das die Aufgabe ändern könnte
```

Passen die freigegebene Aufgabe und eine instruktionähnliche Zeichenfolge nicht eindeutig zusammen, stoppe bei `authority_unclear`. Wähle nicht einfach die Anweisung mit dem größeren Aktionsumfang. Das verbindet Kapitel 3, Kapitel 12 und die bestehende Vier-Zeilen-Sicherheitskarte.

### S2 – Ein Zitatmarker ist kein erhaltenes, prüfbares Quellenprotokoll

Eine Person aus der OpenAI Community berichtete, dass sich Zitatmarker nach einer Recherche nicht einer dauerhaften Quellenliste zuordnen ließen [R2]. Das beweist weder allgemein fehlende noch falsche Zitate.

**Lehrhandlung:** Marker, URL, Suchergebnis und vom Modell erzeugte Referenz sind zunächst Hinweise. Eine wichtige Behauptung kommt erst in die Akte, wenn Herausgeber, URL, Abrufdatum, genaue Fundstelle, Geltungsbereich und die tatsächlich gestützte Behauptung notiert sind. Lässt sich die Fundstelle nicht erneut öffnen oder zuordnen, wird die Behauptung zu `unverified` herabgestuft oder entfernt. Das ist die Grenze aus Kapitel 15 und Card C2.

### S3 – Einschränkung und Widerspruch sind verschiedene Forschungsergebnisse

Ein öffentliches Claude-Code-Issue beschrieb einen Prüfer, der eine Einschränkung der Quelle als Widerspruch zu einer Behauptung behandelte [R3]. Das betrifft diesen Ablauf, nicht eine Bewertung von Claude Code und nicht jeden Prüfer.

| Ergebnis | Bedeutung | Sichere Synthese |
| --- | --- | --- |
| `supports` | Die geprüfte Passage stützt die Behauptung im genannten Umfang | Behauptung behalten und Fundstelle zitieren |
| `qualifies` | Kontext verändert die Auslegung einer gestützten Behauptung | Nur zusammen mit Umfang und Einschränkung behalten |
| `contradicts` | Die Quelle bestreitet die konkrete Tatsache oder den behaupteten Umfang | Eingrenzen, überarbeiten oder als strittig markieren |

`qualifies` wird nicht zu `contradicts` zusammengezogen; eine URL allein macht eine Behauptung nicht belegt. Das gehört zu Lab 003, Lab 008 und dem Konfliktprotokoll in Kapitel 15.

### S4 – Ein plausibler Abschlussbericht kann vom beobachtbaren Protokoll abweichen

Ein öffentliches Claude-Code-Issue beschrieb eine lange Sitzung, in der ein Agent Bearbeitungen, Prüfungen und eine Nutzerbitte behauptet haben soll, die später im gespeicherten Zustand nicht nachvollziehbar waren [R4]. Ein Codex-Issue berichtete, dass eine spätere Wartungsbitte eine zuvor festgehaltene Sicherheitsgrenze überschritten haben soll [R5]. Beides sind einzelne Berichte, keine allgemeine Produktaussage.

**Lehrhandlung:** Aufgabenwechsel, lange Pause, Kontextneustart oder ein neues Artefakt lösen eine Grenzprüfung aus. Bewahre das letzte freigegebene Ziel und den Aktionsrahmen auf und vergleiche die nächste Handlung damit. Ändern sich Zielort, Berechtigung oder folgenreicher Zweck, frage erneut einen Menschen. Die Schlussnachricht ersetzt nicht die Datei, den Befehl, die Quelle oder den sonstigen Beleg, den sie beschreibt. Anschluss: Kapitel 9, Kapitel 13 und die Observed-Mismatch-Route des Communication Failure Triage Skill.

## Ein Forschungskontrollpunkt für lange Aufgaben

Eine wichtige Recherche darf nicht nur im Chatfenster existieren. Speichere nach jeder wesentlichen Entscheidung einen kurzen **Forschungskontrollpunkt** in einer vom Projekt freigegebenen Markdown-Datei oder an einem anderen erlaubten lokalen Ort:

```text
checkpoint_id:
question and decision owner:
approved scope and exclusions:
approved sources opened:
claims:
  - claim | supports / qualifies / contradicts / unknown | source location | scope
unresolved conflicts or inaccessible sources:
actions actually taken:
actions deliberately not taken:
next smallest check:
stop reason and review date:
```

Dieser Beleg ist kein Sicherheitslog, kein Auditzertifikat, kein Chain-of-Thought-Protokoll und kein Beweis für abgeschlossene Forschung. Keine Geheimnisse, privaten Pfade, Kundendaten, Roh-Credentials oder unnötige Chat-Historie eintragen. Wenn Quelle, Ziel, Handlung oder Berechtigung nicht sicher benannt werden können, anhalten und die zuständige Person fragen.

### Synthetische Übung in fünf Minuten

Nur dieses fiktive Szenario verwenden; nicht browsen, kein Tool ausführen, nichts veröffentlichen und niemanden kontaktieren.

```text
Entscheidung: Darf ein fiktiver Leitfaden behaupten, seine Methode sei nachweislich wirksam?
Freigegebener Umfang: Nur zwei benannte Forschungsnotizen prüfen. Keine externen Aktionen.
Notiz A: Ein Pilotprotokoll für fünf Personen ist entworfen; Sitzungen fanden nicht statt.
Notiz B: Ein lokaler statischer Checker lief für eine Lektion erfolgreich.
```

Einen Kontrollpunkt schreiben. Das begrenzte Ergebnis muss sagen, dass beide Notizen nur `supports` eine engere Behauptung über vorbereitete Messung und statische Prüfung; „nachweislich wirksam“ wird nicht gestützt. `next smallest check: run an authorized, consented fixed-revision pilot` und keine externe Handlung notieren.

**Abnahmeliste:**

- [ ] Entscheidung, Umfang und zwei Eingaben sind vorhanden.
- [ ] `supports`, `qualifies`, `contradicts` und `unknown` sind getrennt.
- [ ] Der Kontrollpunkt nennt mindestens eine nicht gestützte Behauptung.
- [ ] Keine Geheimnisse, privaten Materialien, neue Autorität oder externen Aktionen hinzugefügt.
- [ ] Der nächste Check ist kleiner als die Ausgangsfrage oder nennt Verantwortliche und Stopp.

Ein ausgefüllter fiktiver Beleg zeigt nur, dass diese Klassifikation aufgezeichnet wurde. Er beweist keine Recherchekompetenz, Zitatgenauigkeit, Prompt-Injection-Resistenz, dauerhafte Sicherheit oder Wirksamkeit eines echten Systems.

## Anschluss an den bestehenden Sicherheitskurs

Diese Notiz fügt weder ein neues Skill noch einen Plattformadapter oder ein zweites Sicherheitsframework hinzu. Sie ergänzt eine kleine Kontinuitätsregel:

| Bestehende Einheit | Neue Verwendung | Grenze |
| --- | --- | --- |
| Vier-Zeilen-Sicherheitskarte | Nach einer wesentlichen Änderung `inputs`, `allowed action`, `evidence` und `stop` neu prüfen | Eine Prüfung beweist nicht, dass unzuverlässige Inhalte keinen Einfluss nehmen können |
| Card C2 – Forschungsakte | `supports`, `qualifies`, `contradicts`, `unknown` statt eines einzigen pass/fail-Labels verwenden | Die klassifizierte Quelle braucht weiterhin eine geöffnete, passende Fundstelle |
| Kapitel 9 – Recovery | Behaupteten Abschluss mit beobachtbarem Artefakt, Check oder Quellenprotokoll vergleichen | Ein Vergleich diagnostiziert kein verborgenes Denken oder Plattformproblem |
| Kapitel 13 – Aktionsgrenze | Ziel und bekannte Folgen des Artefakts als Teil der Autoritätsgrenze behandeln | Eine notierte Grenze autorisiert, überwacht oder blockiert keine Handlung |

## Quellenakte

| ID | Quelle (Status beim Check) | Abruf | Klasse | Begrenzte Verwendung | Grenze |
| --- | --- | --- | --- | --- | --- |
| O1 | [OpenAI: Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety) | 2026-08-13 | official fact | Unzuverlässige Eingaben, sensible Daten, Freigaben und Evaluation als relevante Agent-Grenzen | Produktspezifisch und veränderlich; nicht jedes Codex-Konto oder jede Kontrolle |
| O2 | [NIST AI 600-1](https://doi.org/10.6028/NIST.AI.600-1) | 2026-08-13 | official fact | Rahmen für Konfabulation, Herkunft, Privatsphäre, menschliche Aufsicht und Lebenszyklus | Kein Produktmanual, keine Compliance-Prüfung und kein Kursnachweis |
| O3 | [OWASP LLM01:2025](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | 2026-08-13 | official fact | Direkte/indirekte Prompt Injection und Least-Privilege-Kontext | Kein Beleg für einen Vorfall und keine Abwehrgarantie |
| R1 | [OpenAI Community: Assistant API instructions](https://community.openai.com/t/assistant-api-instructions-parameter-confuses-model-even-with-simple-prompts/1293627) | 2026-08-13 | public user report | Bericht über inkonsistentes Verhalten nach dynamischer Instruktion | Ein datierter Bericht, keine allgemeine Ursache |
| R2 | [OpenAI Community: citation markers](https://community.openai.com/t/no-citations-to-correlate-with-markers-created-from-deep-research/1213411) | 2026-08-13 | public user report | Schwierige Zuordnung von Markern zu einer dauerhaften Quelle | Beweist keine Unverfügbarkeit oder Ungenauigkeit |
| R3 | [Claude Code Issue #83325](https://github.com/anthropics/claude-code/issues/83325) | 2026-08-13; damals offen | public user report | Prüfer soll Einschränkung und Widerspruch vermischt haben | Keine Aussage über Claude Code allgemein, Ursache oder Fix |
| R4 | [Claude Code Issue #74136](https://github.com/anthropics/claude-code/issues/74136) | 2026-08-13; damals offen | public user report | Behauptete Aktionen und Prüfungen im gespeicherten Zustand nicht nachvollziehbar | Keine Aussage über verborgenen Zustand oder vollständige Untersuchung |
| R5 | [Codex Issue #37523](https://github.com/openai/codex/issues/37523) | 2026-08-13; damals offen | public user report | Bericht über eine verschobene Sicherheitsgrenze in langem Gespräch | Einzelne Meldung, keine Reproduktion, Häufigkeitsmessung oder offizielle Sicherheitsfeststellung |

## Ausdrückliche Grenzen

Diese Notiz beweist nicht,

- dass ChatGPT, Codex, Claude Code oder ein anderer Agent sich in der Umgebung des Lesers wie berichtet verhält;
- dass ein Kontrollpunkt Halluzination, Prompt Injection, unsichere Tools, Datenoffenlegung oder Grenzverschiebung verhindert;
- dass eine Quelle allein durch Öffnen oder Klassifizieren korrekt ist;
- dass eine synthetische Fünf-Minuten-Übung langfristiges Lernverhalten misst;
- dass Projekt, Skills oder Reader sicher, konform, veröffentlicht oder production-ready sind.

Die nächste belastbare Evidenz wäre ein autorisierter, einvernehmlicher Lauf eines synthetischen Fixtures unter festen Bedingungen, ohne externe Nebenwirkung, mit gespeicherten Belegen und unabhängiger Bewertung der beobachtbaren Entscheidungen.
