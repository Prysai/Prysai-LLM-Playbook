<!-- content_id: prysai-task-protocol | locale: DE | language: de | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: 2dfe4e3 | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-task-protocol
description: >
  Eine unklare Anfrage in ein begrenztes Codex-Aufgabenprotokoll überführen,
  das Ergebnis, Kontext, Eingaben, Einschränkungen, erlaubte Aktionen,
  Abnahmebelege, Fehlerbehandlung und Übergabe abdeckt. Verwenden Sie den Skill,
  wenn eine Anfrage vage ist, viel Nacharbeit erwarten lässt,
  berechtigungssensitiv ist oder externe Nebenwirkungen hat. Nicht als
  Hauptweg für Lernen, Belegaudit, Forschungssynthese, Produktkontext,
  Skill-Auswahl oder mehrstufige Orchestrierung verwenden, wenn der Vertrag
  bereits klar ist.
---

# Aufgabenprotokoll

Erstellen Sie den kleinsten Vertrag, der eine Aufgabe ausführbar und prüfbar
macht. Dieser Skill definiert die Grenze; er führt die Aufgabe nicht aus.

## Auslösegrenze und Übergabe

Übernehmen Sie vage Verben wie „verbessern“, „bauen“, „recherchieren“ oder
„verbinden“ sowie jede Anfrage, bei der Umfang, Autorität, Abnahme oder
Nebenwirkungen unklar sind.

Geben Sie die Anfrage weiter, wenn:

- ein explizites `$skill` genannt ist; bewahren Sie diesen Weg und ergänzen Sie
  nur zwingende Sicherheitsfragen;
- bereits ein vollständiges Protokoll vorliegt und die Person Ausführung will:
  übergeben Sie an Workflow Orchestrator oder den passenden Fachweg;
- gefragt wird, ob ein vorhandenes Ergebnis wahr ist: Evidence Review;
- die offene Arbeit aus Quellensuche besteht: Research Router;
- die offene Arbeit Produktpositionierung ist: Product Context;
- die offene Arbeit Skill-Auswahl oder -Installation ist: Skill Selector.

Rufen Sie sich niemals selbst erneut auf. Sie dürfen eine Übergabe nennen,
aber nach der Rückgabe eines anderen Skills kein Protokoll rekursiv neu bauen,
solange die Person den Umfang nicht ändert.

## Erforderliche Eingaben und fehlende Felder

Sammeln Sie `goal`, `background`, `inputs`, `constraints`, `allowed_actions`,
`acceptance_evidence`, `failure_handling` und `delivery_format`. Ordnen Sie
`risk` als `R0`, `R1`, `R2` oder `R3` ein und halten Sie `owner`, `checkpoint`,
`rollback` und `confirmation` fest, wenn die Aufgabe einen gemeinsamen oder
externen Zustand ändern kann. Kennzeichnen Sie Unbekanntes als `missing`, nicht
als Annahme. Prüfen Sie eine lokale, risikoarme Eingabe, bevor Sie danach
fragen; stellen Sie nur Fragen, die Umfang, Risiko, Implementierungswahl oder
Abnahme verändern. Bei einer externen, geheimnishaltigen, produktiven,
irreversiblen oder eigentumssensitiven Lücke geben Sie `blocked on <field>`
zurück und führen nichts aus.

Wenden Sie vor der Bereitschaftserklärung diese minimale Risikogrenze an:

| Risiko | Erforderlicher Vertrag | Standardaktion |
|---|---|---|
| `R0` | genauer Lesebereich, Eingaben, Abnahmeprüfung und keine Schreibgrenze | nur Erklärung oder Read-only-Inspektion |
| `R1` | genaue lokale Ziel, erlaubte Schreib-/Befehlsmenge, Checkpoint, Rollback-Ziel und reversible Abnahmeprüfung | nur reversible lokale Aktion |
| `R2` | genaues gemeinsames/external Ziel, Datenexposition, Owner, aktionsbezogene Bestätigung, Checkpoint, Rollback und Belegverantwortlicher | blockieren, bis die benannte Bestätigung festgehalten ist |
| `R3` | alle `R2`-Felder sowie enger Zweck, unabhängige Prüfung und ausdrückliche Bestätigung unmittelbar vor einer irreversiblen, produktiven, geheimnishaltigen oder weitreichenden Aktion | harter Stopp; nicht allein aus diesem Protokoll ausführen |

Führen Sie `read`, `edit`, `run`, `network`, `commit`, `push`, `publish`,
`deploy`, `restart` und `secret` als getrennte Aktionsdatensätze mit dem Status
`allowed`, `not_allowed` oder `confirmation_required`. Eine allgemeine
Berechtigung, ein Token, eine Anmeldung oder frühere Freigabe erlaubt keine
nicht aufgeführte Aktion. Bei mehreren gewünschten Aktionen teilen Sie diese
in Stufen mit eigenem Risiko, Ziel, Bestätigung, Checkpoint, Rollback und
Abnahmebeleg auf.

## Reihenfolge des Aufbaus

1. Nennen Sie Ergebnis und Nutznießer.
2. Begrenzen Sie Dateien, Systeme, Konten, Versionen und Zeitraum.
3. Trennen Sie erlaubtes Lesen, Schreiben, Befehle, Netzwerk, Commits, Pushes
   und Veröffentlichungen; bündeln Sie sie nicht unter einer pauschalen
   Berechtigung.
4. Weisen Sie das Risiko zu und definieren Sie genaues Ziel, Owner,
   Bestätigungspunkt, Checkpoint, Rollback und beobachtbaren Abnahmebeleg.
5. Markieren Sie Annahmen, Unbekanntes und die nächste Übergabe.

Nennen Sie für jede Abnahmebehauptung das beobachtbare Artefakt oder die
Kommandoausgabe, die sie belegen würde, und die Grenze, die sie nicht beweisen
kann. Ein Protokoll ist kein Ausführungsbeleg. Markieren Sie eine Aktion nicht
als abgeschlossen, weil sie angefordert, geplant, gestartet oder mit plausibler
Ausgabe beantwortet wurde.

## Risiko, Nebenwirkungen und Bestätigung

Ordnen Sie `R0` als Erklärung/Read-only, `R1` als reversible lokale Änderung,
`R2` als Änderung eines externen Dienstes oder gemeinsamen Repositorys und
`R3` als produktive, irreversible, geheimnishaltige oder weitreichende Aktion
ein. Ein Protokoll darf eine Nebenwirkung beschreiben; die Ausführung benötigt
jedoch eine ausdrückliche Autorisierung für genaues Ziel und genaue Aktion.
Eine Bestätigung „aller Berechtigungen“ ersetzt kein enges Ziel. Nehmen Sie
niemals Geheimnisse in das Protokoll auf. Bei `R2`/`R3` muss die Bestätigung
erfolgen, nachdem Ziel und Aktion feststehen. Ein erfolgreicher Build, Login
oder Dry Run bestätigt keinen späteren Write, Push, Publish, Deploy oder
Restart.

## Harte Stopps

Geben Sie `blocked` zurück, wenn Nutznießer oder Ergebnis fehlen, Ownership
unklar ist, Abnahme nicht beobachtbar ist, ein Secret offengelegt würde, ein
Ziel mehrdeutig ist, eine irreversible Aktion ohne Bestätigung bleibt oder
eine Projektregel der Anfrage widerspricht. Bewahren Sie Bedingung und
Stoppgrund. Ein Retry ist nur erlaubt, wenn sich eine benannte Bedingung ändert
und die neue Prüfung feststeht; sonst geben Sie `blocked` oder `unverified`
zurück, statt endlos zu wiederholen. Ersetzen Sie ein fehlendes Feld nicht
durch einen geratenen Standard, wenn dadurch Risiko oder Umfang verändert wird.

## Feste Ausgabe

Geben Sie genau Folgendes zurück:

1. `protocol_status` (`ready_to_execute` oder `blocked_on`)
2. `goal`
3. `background`
4. `inputs_and_unknowns`
5. `constraints`
6. `allowed_actions_and_permissions` — getrennte Aktionsdatensätze mit Status,
   Ziel, Risiko, Datenexposition und Bestätigungsanforderung
7. `acceptance_evidence`
8. `failure_handling`
9. `delivery_format`
10. `handoff`
11. `risk`
12. `owner_and_confirmation` — genauer Entscheidungs-Owner, Bestätigungspunkt
    und unbestätigte Aktionen
13. `checkpoint_and_rollback` — beobachtbares Artefakt,
    Wiederherstellungsziel und Recovery-Entscheidung
14. `content_status`

## Statuszuordnung nach Belegen

Das Protokoll selbst ist `draft`, solange Felder fehlen, `candidate`, wenn der
Vertrag eine lokale Vollständigkeitsprüfung besteht, aber noch nicht erprobt
wurde, `verified`, sobald die genannte Abnahmeevidenz beobachtet wurde, und
`production-ready` erst nach Produktions-, Rollback-, Wartungs- und
Ownership-Gates. Prüfen Sie das Protokoll, indem Sie Pflichtfelder mit der
Risikogrenze vergleichen, jede Aktion gegen exaktes Ziel und
Berechtigungsstatus halten und jede Abnahmebehauptung zu einer beobachtbaren
Prüfung zurückverfolgen. Bei `R2` und `R3` prüfen Sie Bestätigungspunkt,
Checkpoint, Rollback und Datenexpositionsnachweis getrennt. Markieren Sie die
Aufgabe nicht aufgrund der Protokollbereitschaft als erledigt.

## Wartungsnotiz

- `source`: `CONTEXT.md`; `docs/charter.md`;
  `docs/quality/skill-quality-standard.md`
- `license`: originäre Überarbeitung; externes Material bleibt gemäß
  `docs/sources/asset-register.md` Referenz
- `owner`: task-systems maintainer
- `version`: `0.2.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
