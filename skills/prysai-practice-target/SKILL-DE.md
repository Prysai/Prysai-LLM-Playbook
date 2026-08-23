<!-- content_id: prysai-practice-target | locale: DE | language: de | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-practice-target
description: Einen großen oder vagen Lernwunsch in ein kleines, ehrliches und promptbereites Übungsziel überführen. Verwenden Sie den Skill bei „Spanisch in sieben Tagen lernen“, „besser in Interviews werden“, „eine Fähigkeit mit KI lernen“ oder der Frage nach einem Startpunkt für ein zeitlich begrenztes Ziel. Vor dem Coaching Situation, Baseline, Sitzungsbudget, erlaubte Hilfe, sichtbaren Check und Fallback festlegen. Nicht zum Unterrichten, Planen eines Kurses, Bewerten von Kompetenz, Recherchieren oder Versprechen eines Ergebnisses verwenden.
---

# Übungsziel

Machen Sie aus einem Wunsch den nächsten echten Versuch. Bewahren Sie die Worte
des Lernenden, ersetzen Sie aber Labels wie „fließend“, „Experte“ und „besser“
durch eine Leistung in einer konkreten Situation.

## Den Zielsetzungs-Moment besitzen

Nutzen Sie den Skill vor einer LLM-Übung, wenn ein Ziel, aber noch kein
begrenzter Erstversuch vorhanden ist. Er bereitet die Übergabe vor; er lehrt,
korrigiert, bewertet oder erstellt keinen langen Kursplan.

Geben Sie ab, statt das Ziel auszudehnen:

- ein Versuch existiert und Feedback, Korrektur oder ein geänderter Fall werden
  gewünscht: `prysai-learning-coach`;
- eine ungesendete textliche Anfrage muss geschrieben werden:
  `prysai-dialogue-brief`;
- eine vorhandene Erstnachricht soll geprüft werden: `prysai-first-turn-check`;
- das Ziel hängt von aktuellen Fakten, Quellen oder einem „besten“ Ergebnis ab:
  `prysai-source-investigator` oder `prysai-research-router`;
- Dateien, Tools, Konten, eine reale Person, Prüfung, Veröffentlichung,
  Zahlung oder ein anderer externer Effekt erscheint: `prysai-task-protocol`.

Fordern Sie keine privaten Lernendenunterlagen, Diagnosen, Credentials,
Arbeitgeber- oder Schuldaten oder Prüfungsantworten an. Zielsetzung erteilt
keine Autorität für eine spätere Handlung.

## Die kleinste fehlende Entscheidung fragen

Starten Sie mit dem vorhandenen Ziel. Fehlt eine Entscheidung, stellen Sie genau
eine einfache Frage. „Welche Situation behandeln wir zuerst?“ ist besser als
„Wie ist Ihr Niveau?“.

Setzen Sie nur diese Felder:

```text
practice_target: eine Sache, die Lernende sagen, schreiben, wählen, erklären oder tun
situation: ein gewöhnlicher Kontext, in dem sie zählt
baseline: ein kleiner Versuch ohne Hilfe oder not_run
session_budget: eine Zeit- oder Turn-Grenze
allowed_help: keine Hilfe, ein Hinweis, Lookup-Limit oder bereitgestelltes Material
visible_check: was Leser am Versuch prüfen können
fallback: kleinere Fassung, falls der Erstversuch zu schwer ist
```

Lehnen Sie ein fixes Zeitversprechen als Ziel ab. Aus „Französisch in sieben
Tagen“ wird „in einem vier Turn langen schriftlichen französischen Austausch
nach einer Zugzeit fragen und eine Entweder-oder-Frage lösen“. Daraus wird
weder Flüssigkeit, Sprachlevel, gesprochene Leistung noch ein Sieben-Tage-
Ergebnis.

## Eine nutzbare Übergabe zurückgeben

Wenn die Felder ausreichen, geben Sie exakt zurück:

```text
target_status: ready_for_first_attempt | needs_one_answer | out_of_scope | blocked
practice_target:
situation:
baseline:
session_budget:
allowed_help:
visible_check:
fallback:
copy_ready_next_message:
handoff:
claim_limit: a selected target is not evidence of learning, retention, transfer, proficiency, or model quality
content_status: candidate
```

`copy_ready_next_message` bleibt normal und kurz. Es muss das empfangende
Modell auffordern, auf die erste Lernendenantwort zu warten, den Versuch zu
bewahren und keine polierte Musterantwort vor dem Versuch zu liefern. Machen
Sie aus dem Receipt keine Prüfung, Note, Persona, Garantie oder einen
Zwölf-Schritte-Plan.

Bei ungelöstem Ziel: `needs_one_answer` mit einer Frage, ohne erfundenen Plan.
Bei sicherheitskritischem, hochriskantem oder prüfungsbeschränktem Ziel:
`blocked` und qualifizierte/autorisierten nächsten Weg nennen.

## Vor der Übergabe prüfen

Akzeptieren Sie nur eine sichtbare Leistung, eine Situation, einen begrenzten
Erstversuch, eine Hilferegel, einen sichtbaren Check und einen kleineren
Fallback. Unbekanntes bleibt sichtbar. Ein Ziel ist bereit zum Üben; es macht
den Lernenden nicht bereit.

## Wartungseintrag

- `source`: ursprüngliche Prysai-Lab-Methode aus sechsstufigem Practice Record,
  Beginner Practice Pack und Learning-Coach-Grenze
- `license`: ursprüngliche Überarbeitung; verknüpfte Quellen bleiben unter
  `docs/sources/asset-register.md` Referenzmaterial
- `owner`: learning-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-11-14`
- `content_status`: `candidate`
