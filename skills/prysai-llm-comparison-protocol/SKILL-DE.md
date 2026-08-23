<!-- content_id: prysai-llm-comparison-protocol | locale: DE | language: de | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-llm-comparison-protocol
description: >-
  Einen fairen, auf eine Aufgabe begrenzten Vergleich zwischen zwei benannten
  LLM-, Modell-, Anbieter- oder Workflow-Kandidaten planen oder prüfen.
  Verwenden Sie diesen Skill bei Fragen nach besser, schneller, günstiger oder
  ausbaufähig, wenn feste Bedingungen, Rohbelege, nicht verfügbare Fälle und
  eine enge Schlussfolgerung erhalten bleiben müssen. Nicht zur Aufnahme einer
  benannten Plattformlektion, zum Abruf aktueller Produktfakten, zum Ausführen
  eines Modells ohne Autorisierung oder zur Veröffentlichung eines allgemeinen
  Rankings verwenden.
---

# LLM-Vergleichsprotokoll

Machen Sie aus „Was ist besser?“ eine prüfbare Entscheidung. Dieser Skill plant
oder reviewt den Vergleich; er führt keine Modelle aus, gibt kein Budget aus,
legt keine privaten Eingaben offen und macht aus einem kleinen Ergebnis keine
Rangliste.

## Entscheidung einfrieren

Verlangen Sie Decision-ID und Owner, genau zwei Kandidatenkarten, eine geänderte
Variable, festes Taskset, Inputs, Reihenfolge, Rubrik, Wiederholungen und
Scorer sowie Kontext-Fingerprint, Tools und Versionen, Berechtigungen,
Kostenbasis, Verfügbarkeitsfenster, Log-Ort, Aufbewahrungsgrenze, Stopbedingung
und `not-comparable`-Bedingung.

Geben Sie `blocked` zurück, wenn Kandidat, Abnahmeregel, Berechtigungsgrenze,
Kostenbasis oder Owner fehlt. Normalisieren Sie Unterschiede bei Konto, Plan,
Region, Rate Limit, Tools, Systemkontext oder Ausgabeformat nicht stillschweigend.

Benannte Produktbefehle, Berechtigungen oder Laufzeitverhalten gehen an
`prysai-platform-adapter-review`; aktuelle Preise, Verfügbarkeit und
Produktclaims an `prysai-source-investigator`; die Prüfung eines abgeschlossenen
Vergleichsclaims an `prysai-evidence-review`.

## Eine feste Oberfläche verwenden

Verwenden Sie das projekseigene Drei-Aufgaben-Paket
`evals/candidates/three-task-smoke-v1/`, wenn die synthetischen Inputs zur
Entscheidung passen. Führen Sie vor jeder externen Ausführung dessen lokalen
Validator aus. Das Paket liefert eingefrorene Inputs, Hashes, erwartete
Ausgabeform und Run-Record-Vorlage; es enthält kein Modellergebnis und erhebt
keinen Benchmarkanspruch.

Passt es nicht, definieren Sie vor jedem Modellrun einen neuen Taskvertrag.
Ändern Sie nach einem Ergebnis weder Inputs, Rubrik, Kontext, Tools,
Berechtigungsstufe, Budget noch Stopregel. Eine geänderte Bedingung ist ein
neuer Vergleich, kein Retry unter der alten Entscheidung.

## Einen ehrlichen Run-Record bewahren

Planung und statische Fixture-Prüfung sind `R0`. Ein autorisierter, reversibler
lokaler Run ist `R1`. Provider, Konto, Netzwerk, kostenpflichtige API,
geteiltes Repository oder externer Dienst sind `R2` und benötigen exaktes Ziel,
Datenrahmen, Budget, Owner, Rückbau/Cleanup und Bestätigung.

Bewahren Sie pro Kandidat und Task Run-ID, Attempt-ID, Candidate-ID, Task-ID,
Input-Hash, Kontext-Fingerprint, Tools und Versionen, Berechtigungen,
Kostenbasis, Verfügbarkeitsereignis, Rohoutput-Ort, Validierung, menschliche
Bewertung, Ergebnisstatus, `not-comparable`-Grund und Limit. Machen Sie den
Erstoutput unveränderlich; kontrollierte Nacharbeit bekommt eine neue Attempt-ID.

Kapazitätsfehler, unerreichbare Oberfläche, Berechtigungsmismatch,
Input-Hash-Drift, Toolversions-Drift oder fehlender Rohoutput ist zu
bewahrende Evidenz, keine zu versteckende Leerstelle.

## Schlussfolgerung begrenzen

Klassifizieren Sie jede Zeile als `comparable`, `not-comparable` oder `not-run`.
Geben Sie danach genau eine Entscheidung zurück:

- `worth-expanding`: deklarierte Task-Evidenz trägt einen separat geplanten
  größeren Vergleich;
- `do-not-expand-yet`: Beobachtung verfehlt Gate oder hat ungeklärten
  wesentlichen Fehler;
- `insufficient-evidence`: Inputs, Bedingungen, Evidenz, Score oder
  Vergleichbarkeit sind unvollständig.

Benennen Sie keinen universellen Gewinner, veröffentlichen Sie kein allgemeines
Ranking, leiten Sie Fähigkeit nicht aus Verfügbarkeit, Zuverlässigkeit nicht
aus einem Erfolg und vergleichen Sie keine ungleichen Kosten. Ein ungeprüftes
Protokoll ist kein Leistungsbeleg.

## Vergleichs-Receipt zurückgeben

Geben Sie Decision-ID, Owner, Vergleichsvariable, Kandidatenkarten, eingefrorene
Bedingungen, Taskset und Input-Hashes, Abnahme und Scoring, Runstatus,
vergleichbare und nicht vergleichbare Zeilen, Entscheidung, Evidenz,
Unbekanntes, Übergabe, Risiko, Contentstatus und folgende Grenze zurück:
aufgabenbezogene Kandidatenentscheidung; kein Produktranking, Benchmark,
Laufzeitversprechen, Lernergebnis oder Produktionsvorschlag.

## Wartungseintrag

- `source`: ursprüngliche Prysai-Lab-Methode aus dem festen
  `three-task-smoke`-Fixture und den Kapiteln 6 und 19
- `license`: ursprüngliche Überarbeitung; Modell-/Produktdokumentation und
  Ausführungsaufzeichnungen bleiben unter `docs/sources/asset-register.md`
  Referenzmaterial
- `owner`: evaluation-maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-14`
- `content_status`: `candidate`
