<!-- content_id: prysai-evidence-review | locale: DE | language: de | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: 2dfe4e3 | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-evidence-review
description: >
  Behauptungen zu Codex, Agents, Forschung, Marketing, Browser, Deployment,
  Skills oder abgeschlossenen Aufgaben anhand beobachtbarer Belege prüfen.
  Verwenden Sie den Skill, wenn ein Ergebnis zwar fertig wirkt, aber unvollständig
  sein könnte, wenn verified, inferred, blocked und unknown getrennt werden
  müssen oder wenn eine kleinste nächste Prüfung gebraucht wird. Nicht zum
  Ausführen der fehlenden Prüfung oder als Ersatz für einen Quellenrechercheweg
  verwenden.
---

# Belegprüfung

Prüfen Sie Behauptungen gegen Belege, die eine andere Person einsehen kann.
Das Fehlen eines Belegs beweist keinen Fehlschlag; kennzeichnen Sie die Lage
präzise und nennen Sie die nächste Prüfung.

## Auslösegrenze und Übergabe

Übernehmen Sie Eingaben mit einer Abschlussbehauptung, einem Ergebnis, Diff,
Test, quellenbelegten Satz, Screenshot, Log, Deployment-Bericht oder einer
Evaluation.

Geben Sie weiter, wenn:

- ein explizites `$skill` genannt ist; prüfen Sie nur bei einer ausdrücklichen
  Audit-Anfrage und halten Sie trotzdem die Sicherheitsgrenzen ein;
- fehlende Forschung durchgeführt werden soll: Research Router;
- eine unklare Aufgabe ausgeführt werden soll: Task Protocol;
- ein mehrstufiger Workflow ausgeführt werden soll: Workflow Orchestrator;
- eine nicht auf Codex bezogene Lektion oder Übung gewünscht ist: Learning
  Coach;
- eine Codex-Lektion oder -Übung gewünscht ist: Codex Coach.

Reparieren Sie das geprüfte Artefakt nicht stillschweigend. Eine Reparatur ist
eine neue Aufgabe und muss separat weitergeleitet werden.

## Erforderliche Eingaben und fehlende Felder

Verlangen Sie `claims`, `scope`, `evidence`, `time_or_version` und
`acceptance_rule`. Erfassen Sie für jede Behauptung zusätzlich `owner`, wenn
das Ergebnis geteilt oder extern veröffentlicht wurde, und unterscheiden Sie
`not_observed` von `failed`. Fehlt eine Behauptung, fordern Sie sie an. Fehlt
ein Beleg, geben Sie eine `unknown`- oder `blocked`-Bewertung zurück und nennen
Sie die kleinste sichere Prüfung. Füllen Sie die Lücke nicht mit Plausibilität,
Erinnerung oder einer aus dem Artefakt kopierten Aussage.

## Prüfverfahren

Erfassen Sie für jede Behauptung Geltungsbereich, Belegart, Aktualität,
Herkunft, Abdeckung und nächste Prüfung. Fragen Sie, ob die Quelle veraltet,
generiert, nachgestellt, auf die falsche Zielumgebung bezogen oder zu eng ist.
Passen Sie die Prüfung an die Behauptung an: Diff für eine Dateiänderung,
Kommandoausgabe für einen Build, Laufzeitbeobachtung für Laufzeitverhalten,
gerendertes Ergebnis für visuelle Aussagen, maßgebliche URL plus Datum für
volatile Fakten und eine definierte Stichprobe mit Methode für Präferenz-
behauptungen. Eine verifizierte Behauptung gilt nur im Umfang ihrer Belege;
heben Sie sie nicht zu einer allgemeinen Aussage an.

### Profil für Lernbelege

Bei Behauptungen über Übung oder Lernen halten Sie `process_pass` getrennt von
`learner_outcome`. Verlangen Sie feste Fixture-Revision, erlaubte Hilfen,
aufbewahrten Baseline-Versuch, Hinweisprotokoll, vom Lernenden verfasste
Korrektur, eine veränderte Aufgabe, Scorer und Schwelle sowie einen Abstand,
wenn Retention behauptet wird. Ordnen Sie das Ergebnis eng zu:

- ein ausgewählter Prompt oder Plan: `template_selected`;
- eine abgeschlossene betreute Schleife: `practised`;
- eine bestandene feste Aufgabe: `demonstrated_on_this_task`;
- eine bestandene ungesehene veränderte Aufgabe: `transferred_to_[variation]`;
- eine nach einem Abstand bestandene ungesehene veränderte Aufgabe:
  `retained_at_[delay]`.

Lehnen Sie `mastered`, `fluent`, `expert` oder allgemeine Verbesserung ab, wenn
das Paket nur eine Modellantwort, eine Korrektur in derselben Sitzung, eine
Selbstbewertung des Modells oder eine einzelne erfolgreiche Aufgabe enthält.
Verwenden Sie einen vorhandenen Learning-Coach-Beleg als Eingang; machen Sie
aus diesem Prüfprofil keine zweite Coaching-Schleife.

## Risiko, Nebenwirkungen und Bestätigung

Das Standardrisiko ist `R0`, weil die Prüfung read-only ist. Das erneute
Ausführen einer lokalen Prüfung ist `R1`; Netzwerkabruf, Kontozugriff,
Produktionsinspektion oder eine Artefaktänderung ist `R2` oder höher und
benötigt einen ausdrücklich festgelegten Umfang und eine Bestätigung. Legen Sie
keine Geheimnisse in Belege; redigieren Sie sie, aber bewahren Sie genug
Kontext zur Identifikation der Prüfung.

## Harte Stopps

Stoppen Sie mit `blocked`, wenn Geltungsbereich oder Ziel der Behauptung unklar,
die Herkunft nicht verfügbar, der Beleg nicht zugänglich oder die angeforderte
Prüfung nur mit unberechtigtem Zugriff möglich ist oder wenn die Person ein
nicht verifiziertes Ergebnis als `verified` bezeichnen lassen will. Die eigene
Abschlussaussage eines Artefakts ist kein Beleg.

## Feste Ausgabe

Geben Sie genau Folgendes zurück:

1. `review_scope`
2. `claim_table` mit `claim`, `scope`, `evidence`, `freshness`, `status` und
   `next_check`
3. `verified_facts`
4. `partial_or_inferred_facts`
5. `blocked_or_unknown_facts`
6. `decision_risks`
7. `smallest_next_verification`
8. `owner_and_review_date`
9. `content_status`
10. `side_effects_and_permissions`

## Statuszuordnung nach Belegen

Verwenden Sie für Behauptungen die Status `verified`, `partially-verified`,
`inferred`, `blocked` oder `unknown`. Ordnen Sie das Artefakt als `practice`
ein, wenn es explorativ ist, als `candidate`, wenn Struktur und grundlegende
Prüfungen bestehen, als `verified`, wenn normale, Grenz-, Fehler- und
Transferbelege den behaupteten Umfang abdecken, und als `production-ready` erst
nach Sicherheits-, Wartungs-, Ownership-, Versions-, Rollback- und
Release-Gates.

## Wartungsnotiz

- `source`: `docs/quality/skill-quality-standard.md`;
  `docs/book-architecture.md`; `docs/quality/evaluation-framework.md`
- `license`: originäre Überarbeitung; externes Material bleibt gemäß
  `docs/sources/asset-register.md` Referenz
- `owner`: evidence-systems maintainer
- `version`: `0.3.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
