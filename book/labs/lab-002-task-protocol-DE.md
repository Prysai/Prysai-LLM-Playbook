<!-- content_id: lab-002-task-protocol | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

---
id: lab-002-task-protocol
title: "Einen Wunsch in ein Aufgabenprotokoll verwandeln"
level: L2
domain: general
goal: "Üben, einen informationsarmen Wunsch in Ziel, Kontext, Eingaben, Einschränkungen, erlaubte Aktionen, Abnahme, Stopp, Wiederherstellung und Übergabe zu übersetzen"
setup: "Ein Wegwerf- oder Nichtproduktionsprojekt und eine risikoarme README-, Recherche-, Content- oder kleine UI-Anfrage; keine Geheimnisse, Kundendaten, Produktionszustände oder externen Schreibvorgänge"
task: "Drei feste Protokollentwürfe erstellen; Codex darf nichts bearbeiten oder zustandsverändernd ausführen"
evidence:
  - "Ein unveränderter Ein-Satz-Wunsch und drei Run-IDs"
  - "Klärungsfragen und Protokollentwürfe für v1, v2 und v3"
  - "Eine Tabelle zu Annahmen, erlaubten Aktionen, Stopps und neuen Belegen"
failure_variant: "Eine umfangsändernde Eingabe auslassen, vage Wörter wie professionell oder beste beibehalten oder ohne Dateigrenze alles Nötige reparieren erlauben"
reflection: "Welche Frage reduzierte das größte Risiko? Welches Detail machte den Prompt nur länger? Welche Behauptung hat noch keinen Beleg?"
status: draft
last_verified: "not run"
transfer_task: "Dasselbe Protokoll auf Recherchebrief, Code-Regression, lokalisierte README und Veröffentlichungsplan anwenden"
transfer_domain: "Recherche, Engineering, Content, Veröffentlichung oder Teamarbeit"
transfer_evidence: "Protokolle, geänderte Felder, einen Fehlerdatensatz und ein unabhängiges Grenzreview aufbewahren"
transfer_limitations: "Ein klares Protokoll beweist weder wahre Eingaben noch wirksame Berechtigungen oder ein korrektes Ergebnis; alles braucht eigene Belege"
---

# Lab 002: Einen Wunsch in ein Aufgabenprotokoll verwandeln

## Zweck und Sicherheitsgrenze

Dieses Lab macht Kapitel 3 beobachtbar. Es prüft, ob genauere Aufgabeninformation
Fragen, Annahmen, Aktionsgrenze und Belegplan verändert; nicht, ob ein längerer
Prompt eine hübschere Antwort erzeugt.

Nutze ein Wegwerfprojekt oder eine Nichtproduktionskopie. Füge keine Tokens,
Cookies, privaten Schlüssel, `.env`, Kundendaten oder privaten Dienstdaten ein.
Installiere nichts, nutze kein Netzwerk, bearbeite keine Dateien, führe keine
zustandsverändernden Befehle aus und committe, pushe, veröffentliche, benachrichtige
oder rufe keinen externen Dienst auf.

Sind Ziel, Befugnis oder Beleggrenze unklar, markiere die Runde `blocked` und
belasse die Arbeit beim Protokollentwurf.

## Feste Eingabe

Wähle einen Wunsch und behalte seinen Wortlaut in allen drei Runden bei. Beispiel:

```text
Hilf mir, die Startseite dieses Projekts besser zu machen.
```

Das Beispiel ist absichtlich unvollständig. Du darfst einen gleichwertigen
risikoarmen Wunsch nutzen, aber die zugrunde liegende Aufgabe nicht still
zwischen den Runden wechseln.

Lege getrennte Run-IDs an:

```text
lab002-protocol-<datum>-v1
lab002-protocol-<datum>-v2
lab002-protocol-<datum>-v3
```

Eine Run-ID kennzeichnet einen Datensatz; sie beweist keinen Codex-Lauf.

## Drei Runden

### v1: nur der Wunsch

Gib Codex den Ein-Satz-Wunsch und fordere nur Klärungsfragen sowie einen
Protokollentwurf. Es darf nicht bearbeiten, Befehle ausführen, installieren,
committen, pushen, veröffentlichen oder ein externes System kontaktieren.

Halte fest:

- welches Ziel es erriet oder nicht erraten wollte;
- welche Fragen es stellte;
- welche Annahmen sichtbar wurden;
- welche Aktionen es vorschlug; und
- welche Belege es für eine Fertigmeldung bräuchte.

### v2: Ziel und Grenze

Behalte den Wunsch bei und ergänze nur:

- Zielgruppe und gewünschtes beobachtbares Ergebnis;
- genaue Dateien oder Quellen, die es lesen darf;
- Dateien, die es bearbeiten dürfte, falls vorhanden;
- verbotene Aktionen und externe Nebenwirkungen; und
- dass diese Runde weiterhin nur plant.

Vergleiche, welche v1-Fragen verschwinden und welche bleiben. Zusätzlicher
Kontext autorisiert keinen Edit.

### v3: Abnahme und Wiederherstellung

Behalte v1 und v2 fest und ergänze:

- Abnahmebehauptungen und die Belege für jede;
- Stopps für fehlende Eingabe, Berechtigung, Stille, wiederholten Fehler und Umfangserweiterung;
- Wiederherstellung nach fehlgeschlagenem Check; und
- die Übergabeaufzeichnung einschließlich nicht ausgeführter und unverifizierter Punkte.

Bitte Codex nur um Protokoll und offene Fragen. Bearbeitet es oder führt einen
zustandsverändernden Befehl aus, stoppe die Runde, bewahre die Ausgabe und
notiere den Umfangsverstoß als Fehlerbeleg.

## Belegaufzeichnung

Verwende pro Runde eine Zeile:

```text
run_id | neu gelieferte Felder | beseitigte Mehrdeutigkeit | sichtbare Annahmen |
erlaubte Aktionen | Stoppunkt | nötige Belege | tatsächliche Nebenwirkung
```

Schreibe danach eine Behauptung-Beleg-Tabelle:

```text
Behauptung | Beleg, der sie stützen würde | tatsächlich gesammelter Beleg | Status
```

Nutze, sofern das Projekt keine Alternative dokumentiert, nur:

- `observed`: Ausgabe oder Verhalten direkt gesehen;
- `verified`: der erklärte Beleg stützt die Aussage im Umfang;
- `unverified`: plausibel, aber nötiger Beleg fehlt;
- `blocked`: nötige Eingabe, Berechtigung oder sicherer Weg fehlt; oder
- `not_run`: es gab keinen Codex-Lauf, nur statisches Review.

## Absichtliche Fehlervarianten

Ändere die Sicherheitsgrenze nicht und führe mindestens eine aus:

1. lasse die Zieldatei weg und bitte Codex, „alles Änderungswürdige zu finden“;
2. lasse „mach es professionell“ oder „nutze den besten Ansatz“ als Abnahme stehen;
3. füge „behebe alles Nötige“ ohne Dateisatz oder Abhängigkeitspolitik hinzu; oder
4. schreibe „bei Validierungsfehler weiter versuchen“ ohne Retrybudget, geänderte Hypothese oder Rollback.

Das erwartete Ergebnis ist Klärung, ein engerer Vorschlag oder `blocked` – kein
erfundenes Ziel, keine Installation, keine Endlosschleife und keine Fertigmeldung.

## Unabhängiges Review

Gib das v3-Protokoll jemandem, der es nicht schrieb, ohne den ursprünglichen Chat
zu öffnen. Bitte um Antworten auf:

1. Was darf genau geändert oder aufgerufen werden?
2. Welche Belege sind für Abschluss nötig?
3. Was lässt dich vor dem Handeln stoppen?
4. Was soll nach einem Fehler erhalten bleiben?

Notiere Abweichungen. Muss die Person den Autor nach einer fehlenden Antwort
fragen, ist das Protokoll noch nicht bereit zur Ausführung.

## Transfer

Schreibe das Protokoll für vier risikoarme Bereiche um:

- eine reproduzierbare Engineering-Regression;
- einen Recherchebrief mit Primärquellen;
- eine lokalisierte README-Aktualisierung mit gleichsprachigen Links; und
- einen Veröffentlichungsplan mit Backup, Rollback und Nachprüfung.

Erhalte die Feldabhängigkeit, ersetze aber die Belege: Tests und Diff für
Engineering, Quellenakten für Recherche, Link- und Sprachchecks für Dokumente,
Deployment-/Rollback-Belege für Veröffentlichung.

## Abschluss-Checkliste

- [ ] Der Grundwunsch blieb in allen Runden gleich.
- [ ] Jede Runde hat eigene ID und gespeicherte Ausgabe.
- [ ] Kein nicht autorisierter Edit, Install, Netzwerkaufruf, Commit, Push, Veröffentlichung oder externe Nachricht geschah.
- [ ] v3 benennt genaue Eingaben, Einschränkungen, erlaubte Aktionen, Abnahme, Stopp, Wiederherstellung und Übergabe.
- [ ] Jede Pflichtbehauptung hat einen vorgeschlagenen Belegträger.
- [ ] Mindestens eine Fehlervariante erzeugte eine enge Antwort oder `blocked`.
- [ ] Eine unabhängige Person kann die Grenze ohne Raten wiedergeben.
- [ ] Statisches Review heißt `not_run`; Promptqualität wird nicht als Ausführung oder Produktverifikation dargestellt.

## Reflexion

Beantworte im Datensatz:

- Welche Frage veränderte die Aufgabe am meisten?
- Welches Feld machte eine gefährliche Aktion vor ihrem Auftreten sichtbar?
- Welcher Satz erhöhte nur Länge, nicht Kontrolle?
- Welche Behauptung ist unverifiziert und was ist der nächste kleinste sichere Check?
- Was soll Projektregel, Skill, Evaluierungsfixture oder Einmalanweisung werden?

**Status:** `draft` · **Run-Status:** `not_run`.

Diese Kandidatenübersetzung ist lesbar, bleibt aber bis zu unabhängigem
Sprachreview `in-progress`. Lesen oder statisches Review beweisen weder einen
erfolgreichen Lernerlauf noch Änderungen an Sicherheit, Produktivität, Effizienz
oder Lernfähigkeit.
