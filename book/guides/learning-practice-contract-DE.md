<!-- content_id: learning-practice-contract | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

# Lernpraxisvertrag

**Status:** `draft` | **Laufnachweis:** `not_run` | **Plattform:** universelle Textchat-Grundlage; produktspezifisches Verhalten benötigt einen belegten Adapter.

## Problem

Eine überzeugende Antwort kann verratenes Wissen verbergen. Eine abgeschlossene Lektion kann Abhängigkeit von Hinweisen verbergen. Eine hohe Punktzahl kann Vertrautheit mit dem Test statt Können zeigen. Wenn sich während der Übung Ziel, erlaubte Hilfen, Aufgaben, Rubrik oder Artefakte ändern, kann weder die lernende noch die prüfende Person erkennen, was tatsächlich gezeigt wurde.

## Konzept

Der Lernpraxisvertrag legt Fähigkeit und Nachweisregeln fest, bevor das Coaching beginnt. Er trennt formative Hilfe von Ergebnisnachweisen:

```text
Ausgangswert → Abruf → abgestufte Hilfe → Korrektur durch die lernende Person
             → veränderte Sofortprüfung → verzögerte Prüfung → unbekannter Transfer
```

Das Modell darf fragen, abgestufte Hinweise geben, Fehler erklären und Nachweise ordnen. Seine Ermutigung und Selbstbewertung sind kein unabhängiger Lernnachweis.

## Entscheidung

Formuliere den Vertrag beobachtbar:

```text
Bei [Eingabe/Kontext] wird die lernende Person [beobachtbare Handlung]
innerhalb von [Zeit] mit [erlaubten Hilfen] bis zu [Rubrikschwelle] ausführen.
```

„verstehen“, „wissen“, „lernen“ und „beherrschen“ sind keine Abnahmeregeln. Vor dem Ausgangswert werden diese Felder festgelegt:

| Feld | Erforderliche Entscheidung |
|---|---|
| Zielfähigkeit | Beobachtbare Handlung, Bedingungen, Zeit, Qualitätsschwelle |
| Erlaubte Hilfen | Benannte Quellen, Werkzeuge, Wörterbücher, Notizen oder keine |
| Antwortleckage | Was der Coach wann und in welcher Reihenfolge verraten darf |
| Ausgangswert | Feste Aufgabenrevision, Anweisungen, Zeit, Hilfen und Rubrik |
| Versuche | Original-, korrigierte, sofortige, verzögerte und Transfer-Versuche speichern |
| Korrekturprotokoll | Fehler, Hinweisstufe, Korrektur, Regel, offener Punkt |
| Sofortiger veränderter Fall | Gleiche Fähigkeit, wesentlich andere Oberflächendetails |
| Verzögerte Prüfung | Benannter Abstand, keine unmittelbare Wiederholung, neue Aufgabe |
| Unbekannter Transfer | Neues Variationsmaterial, keine nahe Kopie |
| Bewertende Person | Feste Rubrik; bei Bedarf deterministische oder unabhängige Prüfung |

Verwende nur diese kalibrierten Zustände:

- `template_selected`: Vertrag oder Prompt wurde ausgewählt und gespeichert.
- `practised`: Übung und Hilfe-/Korrekturprotokoll wurden abgeschlossen.
- `demonstrated_on_this_task`: Die feste Prüfung erfüllte unter dokumentierten Bedingungen die Rubrik.
- `retained_at_[delay]`: Die verzögerte Prüfung erfüllte die Rubrik nach dem benannten Abstand.
- `transferred_to_[variation]`: Eine unbekannte veränderte Aufgabe erfüllte die Rubrik.

Keiner dieser Zustände bedeutet breite Beherrschung, Flüssigkeit, Expertise, dauerhafte Behaltensleistung oder wahrscheinliche Leistung unter ungetesteten Bedingungen. Die Etiketten gelten getrennt: Ein bestandener Transfer heute erzeugt keinen Nachweis für verzögertes Behalten.

## Handlung

1. Ziel, Bedingungen, Ausschlüsse, Hilfen, Leckage-Regel und Rubrik aufschreiben.
2. Den festen Ausgangswert vor Beispielen, Erklärungen, Optionen oder Hinweisen geben.
3. Ausgangswert aufbewahren und Abruf verlangen, bevor Hilfe erfolgt.
4. Hilfe schrittweise steigern: Fehler lokalisieren, Teilhinweis geben, dann ein gelöstes Fragment zeigen. Höchste verwendete Stufe notieren.
5. Eine Korrektur der lernenden Person verlangen; die Antwort nicht still ersetzen.
6. Eine unmittelbare Aufgabe mit veränderten Details, aber gleicher Fähigkeit und Rubrik durchführen.
7. Eine verzögerte Prüfung und einen deutlich anderen unbekannten Transfer vorbereiten, aber nicht als terminiert ausgeben. Wenn möglich, ihre Revisionen vorher notieren.
8. Jedes Artefakt mit der festen Rubrik bewerten. Meinungsverschiedenheiten und Unbekanntes festhalten statt wegzumitteln.
9. Nur den engsten Zustand ausgeben, den gespeicherte Nachweise tragen.

Die Pflichtübung ist risikoarm und rückgängig zu machen: fiktives oder öffentliches Material in einem wegwerfbaren lokalen Protokoll nutzen. Keine Zugangsdaten, privaten Daten, echten Kundendaten, externen Kontakte, Produktionssysteme, Käufe, Veröffentlichungen oder zerstörerische Aktionen verwenden. Wenn eine Aufgabe dies erfordert, stoppen und ein separat autorisiertes Verfahren anlegen.

## Nachweise

Ein Paket aufbewahren:

```text
contract_revision | task_revisions | date | surface/model label
target | conditions | allowed_aids | leakage_policy | rubric | scorer
baseline_attempt | hints_used | correction_ledger | corrected_attempt
immediate_changed_attempt | delayed_attempt | transfer_attempt
scores | scorer_disagreement | unknowns | status_claim | claim_limit
```

Eine sofort korrigierte Antwort belegt Übung, nicht Behalten. Eine bestandene feste Prüfung kann `demonstrated_on_this_task` stützen; eine verzögerte `retained_at_[delay]`; ein unbekannter veränderter Fall `transferred_to_[variation]`. Fehlen Nachweise, bleibt es bei `not_run` oder ohne Behauptung.

## Fehlerfälle

- Vor dem Ausgangswert nach der Ideallösung fragen. Der Coach muss die Nicht-Leckage-Regel wahren oder den Ausgangswert als kontaminiert markieren.
- Einen Satz aus der Lektion als „Transfer“ wiederholen. Die prüfende Person muss ihn als nahe Kopie ablehnen und einen wesentlich anderen Fall verlangen.
- Dasselbe Modell, das unterrichtet hat, nach Beherrschung fragen. Es muss ablehnen oder die Behauptung einengen und die Abhängigkeit von der bewertenden Person offenlegen.
- Den verzögerten Termin verpassen. `not_run` notieren; Behalten nicht aus dem unmittelbaren Ergebnis nachtragen.

## Reflexion

Welches Ergebnis hing am stärksten von Hinweisen ab? Welche Variation war wirklich neu? Was würde eine unabhängige bewertende Person beanstanden? Welche kleinste spätere Prüfung könnte die aktuelle Behauptung stärken – oder widerlegen?

## Abnahmecheckliste

- [ ] Das Ziel ist eine beobachtbare Handlung mit Bedingungen und Schwelle.
- [ ] Erlaubte Hilfen und Leckage-Regeln stehen vor dem Ausgangswert fest.
- [ ] Originalversuche, Hinweise, Korrekturen, Bewertungen und Unbekanntes sind erhalten.
- [ ] Die unmittelbare Aufgabe ändert den Fall, nicht die Fähigkeit.
- [ ] Verzögerte und unbekannte Transferaufgaben sind verschieden und nutzen die erklärte Rubrik.
- [ ] Bewertende Person sowie Abhängigkeiten oder Differenzen sind sichtbar.
- [ ] Die Statussprache passt exakt zu den verfügbaren Nachweisen.
- [ ] Kein Status deutet breite Beherrschung, Flüssigkeit oder Expertise an.
- [ ] Der Pflichtpfad enthält keine Geheimnisse, externen Nebenwirkungen oder Produktion.

## Quellen und Pflege

- Forschungsprotokoll zu dauerhaftem LLM-gestütztem Lernen: Kandidatensynthese zu Abruf, Feedback, Verteilung, Behalten, Transfer und Behauptungsgrenzen; abgerufen am 2026-08-12.
- Projektterminologie: stabile Unterscheidungen zwischen Modellen, Werkzeugen, Skills, Agents, Nachweisen und Lernpfaden.
- Einsteiger-Praxispaket: Lesematerial, das diesen Vertrag auf Sprach- und Recherchepfade anwendet.

Dieser Leitfaden ist originales Projektmaterial. Das Forschungsprotokoll verweist auf den IES-Praxisleitfaden und wissenschaftliche Quellen und erklärt deren Grenzen. Vor produktspezifischen Aktionen müssen gehostete Produkthinweise erneut geprüft werden. Dieser Entwurf enthält keine dokumentierte Lernendenausführung, verzögerte Prüfung, Transferergebnis oder unabhängige Bewertung.
