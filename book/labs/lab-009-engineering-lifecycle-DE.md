<!-- content_id: lab-009-engineering-lifecycle | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-009-engineering-lifecycle
title: "Direkte Umsetzung mit einem vollständigen Engineering-Lebenszyklus vergleichen"
level: L3
domain: engineering
goal: "Ohne aus einem kleinen Vergleich eine allgemeine Überlegenheit abzuleiten messen, wo Definition, Planung, Prüfung, Review und Übergabe Nacharbeit verringern"
setup: "Ein wegwerfbares lokales Repository, drei eingefrorene risikoarme Aufgaben, eine Basisrevision, feste Werkzeuge und keine Produktions- oder externen Nebenwirkungen"
task: "Dieselben drei Aufgaben direkt und mit Lebenszyklus ausführen und Erstversuche, veränderte Bedingungen, Belegqualität und Nacharbeit vergleichen"
status: draft
last_verified: "not run"
---

# Lab 009: Direkte Umsetzung mit einem vollständigen Engineering-Lebenszyklus vergleichen

## Lernziel

Prüfe eine enge Behauptung: Verbessern explizite Definition, Planung, Prüfung, Review und Übergabe drei festgelegte Aufgaben unter denselben Bedingungen? Das ist ein Engineering-Smoke-Test, keine Modellrangliste.

## Vorbereitung

Lege ein wegwerfbares Repository mit einer eingecheckten Basis an. Friere drei kleine Aufgaben samt Abnahmekriterien ein. Halte Umgebung, Modell, Werkzeuge, Berechtigungen, Netzbedingung und Zeitbudget für beide Abläufe gleich. Wenn du das Modell wechselst, bleibt der Ablauf gleich; wenn du den Ablauf wechselst, bleibt das Modell gleich. Stelle vor jeder Aufgabe die Basis wieder her, lege die Reihenfolge vorab fest und nenne Reihenfolgeeffekte als Grenze.

Kandidat A erhält nur das eingefrorene Ziel, die Eingabe und die Abnahmeregel. Kandidat B arbeitet mit einem schriftlichen Protokoll aus `define`, `plan`, `build`, `verify`, `review` und `deliver`.

## Aufgabe und Experiment

Nutze drei harmlose Fixtures:

1. Extrahiere drei benannte Felder aus einem kurzen synthetischen Lieferdatensatz.
2. Formatiere den Datensatz als Markdown und trenne erledigte von unbestätigter Arbeit.
3. Prüfe die unbelegte Aussage: „Der Code existiert und baut, also ist das Feature verifiziert.“

Führe A für alle drei Aufgaben aus, danach B für alle drei. Erlaube pro Durchlauf höchstens eine kontrollierte Nacharbeit. Bewahre das erste Ergebnis auf, auch wenn die Nacharbeit gelingt.

Notiere nur tatsächliche Werte:

```yaml
run_id: lab-009-v1-A-extract-01
attempt_id: initial
candidate: A
task_id: extract-01
baseline_revision: actual-revision
input_hash: sha256:actual-hash
surface: actual-surface-and-version
model: actual-model-id
workflow: direct
tool_versions: actual-values
permissions: disposable-local-repository
network: offline
started_at: actual-timestamp
ended_at: actual-timestamp
first_pass: true
rework_count: 0
elapsed: actual-duration
cost_value: actual-value-or-unavailable
cost_basis: actual-basis-or-unavailable
error_category: none
comparability: comparable
validation: command-output-and-exit-code
status: pass
```

Schätze fehlende Zeit oder Kosten nie. Trage `unavailable` ein. Ein Erfolg nach Nacharbeit wird nicht zum Erfolg im Erstversuch.

## Belege, Fehlerfall und Abnahme

Bewahre die sechs Erstausgaben, jede Nacharbeit als eigenen Versuch, alle Diffs, Befehle, Exit-Codes, Prüfausgaben, Review-Notizen, Übergabezusammenfassungen und eine 2-mal-3-Vergleichstabelle auf. Das Ergebnis lautet `expand`, `do_not_expand` oder `insufficient_evidence`.

Lass einen Durchlauf an einem Timeout, einer Berechtigungssperre, einem geänderten Eingabe-Hash, einer anderen Werkzeugversion oder einem lokal simulierten unklaren Schreibresultat scheitern. Halte den unterbrochenen Versuch fest, prüfe das Ziel vor dem Wiederholen und markiere den Vergleich als `not_comparable`, wenn sich die eingefrorenen Bedingungen geändert haben. Ein späterer Erfolg stellt Vergleichbarkeit nicht rückwirkend her.

- [ ] Beide Abläufe verwendeten dieselben eingefrorenen Aufgaben und die wiederhergestellte Basis.
- [ ] Sechs Erstversuche und jede Nacharbeit bleiben getrennt prüfbar.
- [ ] Erstdurchlauf, Zeit, Nacharbeit, Fehlerklasse und Prüfung enthalten tatsächliche Werte.
- [ ] Mindestens ein Fehlerzweig ist ehrlich abgeglichen oder als `not_comparable` festgehalten.
- [ ] Ein erfolgreicher Build wird nicht als Laufzeit-, Deployment- oder Nutzerverifikation bezeichnet.
- [ ] Die Schlussfolgerung bleibt im Rahmen des Smoke-Tests mit drei Aufgaben.

## Rückblick und Transfer

Welche Phase fing das erste folgenreiche Problem ab? Welche Phase erzeugte nur Zeremonie, ohne das Ergebnis zu ändern? Übertrage nur nützliche Kontrollpunkte auf eine andere reversible Aufgabe und erkläre, ob sie vergleichbar ist. Drei kleine Aufgaben beweisen weder allgemeine Kosten, Qualität noch Modellrankings; lokale Prüfungen beweisen auch kein Deployment oder keine Nutzerakzeptanz.
