<!-- content_id: prysai-dialogue-brief | locale: DE | language: de | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: dea08a5 | source_license: project-owned CC-BY-4.0 -->

# Dialog-Briefing

Forme eine noch nicht ausprobierte, risikoarme Bitte in eine kurze erste Nachricht um, die direkt kopiert und gesendet werden kann. Dieses Skill arbeitet an der Schnittstelle vor einer inhaltlichen Antwort, einem Tool-Aufruf, einer Recherche oder einer Lernschleife. Es führt die Bitte nicht aus und bewertet die Antwort nicht.

## Zuerst prüfen, ob es passt

Verwende dieses Skill nur, wenn alle folgenden Punkte zutreffen:

- Die Person hat die Bitte noch nicht gesendet; eine misslungene Antwort muss nicht repariert werden.
- Es geht um ein erstes Gespräch, das nur Text und wenig Risiko umfasst.
- Es werden keine Dateien, Tools, Konten, Browserzugriffe, privaten Aufzeichnungen, Veröffentlichungen oder externen Aktionen benötigt.
- Die Person möchte eine klar begrenzte Bitte formulieren, nicht eine Fähigkeit üben oder eine Tatsache recherchieren.

Wenn Lernende eine Ausgangsmessung, Feedback, Korrektur oder Transferübung brauchen, leite an `prysai-learning-coach` weiter. Bei Fragen zu Codex, Tools, Skills oder Agents ist `prysai-codex-coach` zuständig. Bei Dateien, Berechtigungen, Konten, externen Aktionen oder einem echten Lieferziel verwende `prysai-task-protocol`. Für aktuelle Fakten, Quellen oder belegte Schlussfolgerungen verwende `prysai-source-investigator` oder `prysai-research-router`. Gibt es bereits die ursprüngliche Bitte und eine unbefriedigende Antwort, verwende `prysai-communication-failure-triage`; soll eine vorhandene Behauptung auf Belege geprüft werden, verwende `prysai-evidence-review`.

Fordere keine Geheimnisse, sensiblen personenbezogenen Daten, unveröffentlichten Unterlagen, Zugangsdaten, Kontostände oder privaten Prompts an. Ein Briefing zu erstellen erlaubt keine spätere Aktion.

## Nur die Angaben für den ersten Durchgang sammeln

Übernimm nach Möglichkeit die Worte der Person und erfasse diese Felder:

```text
outcome: ein beobachtbares Ergebnis, das die erste Antwort liefern soll
audience: wer das Ergebnis verwendet oder liest
supplied_inputs: der sichere Text oder die Fakten, die in diesem Durchgang vorliegen
constraints: zu bewahrende Fakten, Grenzen, Ton, Ausschlüsse oder Hilfsregeln
output_shape: gewünschte Form und Länge
acceptance_check: was vor der Annahme geprüft wird
stop_boundary: was nicht passieren darf oder bei welcher fehlenden Tatsache gestoppt wird
```

Fehlt ein Feld, dessen Fehlen das Ergebnis wesentlich verändern würde, gib den unten gezeigten Beleg `needs_clarification` mit genau einer einfachen Frage zurück. Schreibe kein Teil-Briefing, erfinde keine Zielgruppe oder Details und stelle nicht mehrere Fragen, nur damit der Text vollständiger wirkt. Wenn sich auch nach dieser Klärung kein beobachtbares Ergebnis benennen lässt, gib `blocked: outcome_not_observable` zurück und nenne die kleinste noch offene Entscheidung.

## Das erste Briefing formulieren

Gib zuerst ein Briefing mit 120–180 Wörtern und danach eine kopierfertige erste Nachricht aus. Begrenze den Umfang auf einen Durchgang. Schreibe direkt und verständlich; füge keine Rollen, keinen emotionalen Druck, keine Aufforderung zu verborgenem Schlussfolgern, keine Leistungsversprechen und keine allgemeine Füllformel hinzu.

Die kopierfertige Nachricht muss diese Elemente mit den folgenden Bezeichnungen in natürlicher Sprache enthalten:

```text
Outcome
Audience
Supplied inputs
Constraints
Output shape
Acceptance check
Stop boundary
```

Fehlt eine für die Antwort nötige Tatsache, soll das empfangende Modell sie als `unknown` kennzeichnen, statt sie zu erfinden. Werden Quellen benötigt, fordere zuerst einen Quellenplan an oder stoppe; verlange keine sichere Tatsachenantwort ohne Belege.

## Einen kurzen Beleg zurückgeben

Wenn ein wichtiges Feld fehlt, gib exakt Folgendes zurück:

```text
brief_status: needs_clarification
clarifying_question:
known_inputs:
risk: R0
content_status: candidate
handoff:
```

Wenn die Angaben ausreichen, gib exakt Folgendes zurück:

```text
brief_status: ready_to_copy | blocked
dialogue_brief: 120–180 words
first_turn: copy-ready text
inputs_preserved:
unknowns:
acceptance_check:
stop_boundary_or_blocker:
risk: R0
evidence: selected brief revision only
content_status: candidate
handoff:
```

Akzeptiere das Ergebnis nur, wenn es die gelieferten Fakten bewahrt, eine beobachtbare Prüfung enthält, den Umfang von Daten und Handlungen nicht eigenmächtig erweitert und für Arbeit außerhalb des ersten Durchgangs einen Weiterleitungsweg nennt. `ready_to_copy` bedeutet nur, dass das Briefing vorhanden ist; es belegt weder Modellverhalten, Antwortqualität, Lernerfolg, faktische Richtigkeit, Zufriedenheit noch die Erledigung der Aufgabe.

## Wartungsnotiz

- `source`: originäre Methode von Prysai Lab, neu geordnet aus den Verträgen von communication-clinic, task, evidence und routing
- `license`: originäre Überarbeitung; externe Inhalte bleiben Referenzen unter `docs/sources/asset-register.md`
- `owner`: communication-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-12`
- `content_status`: `candidate`
