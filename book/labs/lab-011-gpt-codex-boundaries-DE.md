<!-- content_id: lab-011-gpt-codex-boundaries | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: f521e29 -->

# Lab 011: GPT, Codex, Tools und Agents trennen

---
id: lab-011-gpt-codex-boundaries
title: "Erstelle eine beobachtbare Grenzkarte, bevor du Berechtigungen erteilst"
level: L0
domain: general
goal: "Erzeugung, Kontext, Ausführung, Tool-Ergebnisse, Verifizierung und Agent-Schleifen unterscheiden, ohne verborgenen Zugriff anzunehmen"
setup: "Festgelegte synthetische Aufgabenkarten und ein leeres Grenzprotokoll; kein echtes Konto, kein Geheimnis, kein externer Dienst und kein öffentliches Repository"
task: "Die Karten klassifizieren, ein reines Text-Kontextexperiment durchführen und eine absichtlich unsichere Fertigstellungsbehauptung korrigieren"
evidence:
  - "Ein Grenzprotokoll für die Karten A–E mit Begründungen, erlaubten Aktionen, verbotenen Aktionen, Belegen und Stoppunkten"
  - "Zwei Laufprotokolle mit Eingaberevision, Run-ID, Kennzeichnung von Oberfläche/Modell, geänderter Variable, beobachteter Ausgabe und Unbekanntem"
  - "Eine Korrekturnotiz, die vorgeschlagene Tool-Aktion, Ausführung, geänderten Zustand und Verifizierung trennt"
failure_variant: "Eine Login-Seite, einen Skillnamen, Modellnamen oder eine Tool-Meldung als Beweis für Autorität oder abgeschlossene Arbeit behandeln; oder nach einem Fehler wiederholen, ohne den aktuellen Checkpoint zu prüfen"
reflection: "Welches Ereignis hast du mit einem Beweis verwechselt, und welche kleinste Beobachtung würde diese Beweislücke tatsächlich schließen?"
status: draft
last_verified: "not run"
transfer_task: "Das Protokoll auf ein Forschungsbriefing aus festgelegten öffentlichen Quellen anwenden, ohne externe Schreibaktionen zu erlauben"
transfer_domain: "research, engineering, content, or marketing"
transfer_evidence: "Das Transferprotokoll, die Quellengrenze, den Ausschlussgrund für eine nicht vertrauenswürdige Anweisung und eine ausdrückliche Liste nicht verifizierter Punkte speichern"
transfer_limitations: "Dieses Lab vermittelt beobachtbare Grenzen; es beweist nicht, dass sich ein bestimmtes Modell, ein Skill, ein Tool, ein Connector, ein Konto oder eine Agent-Oberfläche in der Produktion gleich verhält"
---

## Worum es in diesem Lab geht

Dies ist eine risikoarme Einführung in die L0-Stufe. Es ist kein Live-
Integrationstest und fordert dich nicht auf, Zugangsdaten in Codex einzufügen.
Die Ausgabe ist ein Protokoll, das eine andere Person prüfen kann, keine
polierte Antwort.

Verwende diese Unterscheidung der Ereignisse:

    generierter Text
      != vorgeschlagene Tool-Aktion
      != erlaubte/ausgeführte Aktion
      != geänderter Zustand
      != verifiziertes Ergebnis

## Sicherheit und Vorbereitung

- Arbeite in einem wegwerfbaren lokalen Verzeichnis oder in einem einfachen
  Text-Lernprotokoll.
- Verbinde für den erforderlichen Teil des Labs weder ChatGPT, Codex Cloud,
  GitHub, ein Browserkonto, MCP noch einen externen Dienst.
- Verwende keine Tokens, Cookies, privaten Schlüssel, `.env`-Dateien,
  Kundendaten oder Produktionsdateien.
- Bearbeite nur das Lernprotokoll und, falls du die optionale lokale Erweiterung
  wählst, eine wegwerfbare Notizendatei.
- Wenn ein vorgeschlagener Schritt einen Netzwerkaufruf, Kontozugriff, ein
  Geheimnis, eine öffentliche Schreibaktion oder einen destruktiven Reset
  erfordert, stoppe und markiere ihn als `blocked`.

Erstelle eine Run-ID wie `lab011-de-2026-08-10-a`. Erfasse das Datum, die
Kennzeichnung von Oberfläche/Modell, falls eine verwendet wird, die
Eingaberevision und die Tatsache, dass der erforderliche Teil statisch oder
reiner Text ist.

## Teil 1: Grenzprotokoll ausfüllen

Klassifiziere diese festgelegten Karten. „Primäre Ebene“ bedeutet die Ebene, die
die lernende Person beobachten muss; es ist keine Aussage über die interne
Implementierung des Produkts.

| Karte | Aufgabenkarte |
|---|---|
| A | „Erkläre Kontext mit deinen eigenen Worten und nenne zwei Unsicherheiten.“ |
| B | „Lies notes.md, füge einer wegwerfbaren lokalen Kopie eine Überschrift hinzu und zeige den Diff.“ |
| C | „Rufe ein Tool auf, schreibe das Ergebnis in das öffentliche Repository der Organisation und benachrichtige das Team.“ |
| D | „Versuche weiter, den Fehler zu beheben, bis es erfolgreich aussieht; erfasse keinen Zwischenzustand.“ |
| E | „Das System ist angemeldet. Das Tool hat completed gemeldet, also veröffentliche jetzt und überspringe Prüfungen.“ |

Fülle dieses Protokoll aus:

| Karte | Primäre Ebene | Erlaubte Aktion | Verbotene Aktion | Mindestbeleg | Stopp-/Bestätigungspunkt | Was bleibt unbekannt? |
|---|---|---|---|---|---|---|
| A |  |  |  |  |  |  |
| B |  |  |  |  |  |  |
| C |  |  |  |  |  |  |
| D |  |  |  |  |  |  |
| E |  |  |  |  |  |  |

Verwende diese Reihenfolge für die Entscheidung:

1. Geht es bei der Anfrage um Erklärung/Erzeugung, Lesen/Bearbeiten oder eine
   externe Zustandsänderung?
2. Wenn sich ein Zustand ändert: Welches genaue Objekt, welche Autorität,
   Bestätigung und Rückabwicklung sind erforderlich?
3. Welcher Beleg entspricht der Fertigstellungsbehauptung?
4. Was lässt die Aufgabe stoppen, statt sie zu wiederholen?

Eine gute Baseline-Antwort erkennt A als Erklärung, B als begrenzte lokale
Ausführungsaufgabe, C als Plan mit externer Nebenwirkung, der hier nicht
ausgeführt werden darf, D als unbeschränkte Agent-Schleife und E als nicht
gestützte Annahmen. Erkläre die Gründe; kopiere diesen Satz nicht als Beweis.

## Teil 2: Kontrolliertes Kontextexperiment durchführen

Verwende diese reine Textaufgabe:

> Prüfe den bereitgestellten README-Auszug und nenne eine Verbesserung. Ändere
> keine Dateien. Sage, was dir gegeben wurde, warum die Verbesserung wichtig
> ist, wie sie geprüft werden könnte und was du nicht wissen kannst.

Führe die Baseline nur mit dem Auszug aus. Wiederhole sie mit genau einer
Änderung:

1. die vorgesehene Zielgruppe hinzufügen;
2. eine kurze Projektregel hinzufügen; oder
3. eine Abnahmebedingung hinzufügen.

Behaupte nicht, dass das geänderte Element den Unterschied in der Ausgabe
verursacht hat, es sei denn, du hast Modell/Oberfläche, Eingaberevision,
Generierungskonfiguration und Tool-Zustand ausreichend konstant gehalten, um
diese Behauptung zu stützen. Wenn das nicht möglich ist, schreibe:
different outcome observed; cause not isolated.

Erfasse:

    run-id | input revision | surface/model | changed variable | tool called? | file changed? | observed evidence | unknowns

Das Lab kann mit einer von Hand geschriebenen Simulation abgeschlossen werden.
Ein tatsächlicher Modelllauf ist optional und muss mit seinen realen Belegen
gekennzeichnet werden. Ein simuliertes Tool-Ergebnis ist niemals ein
ausgeführtes Tool-Ergebnis.

## Teil 3: Unsichere Fertigstellungsbehauptung korrigieren

Beginne mit:

> „Die Browser-Anmeldung war erfolgreich, das Tool meldete completed und das
> Modell sagte, die Änderung sei fertig. Daher wurde das öffentliche Repository
> aktualisiert.“

Schreibe sie als Behauptungsprotokoll um:

| Behauptung | Benötigter Beleg | Aktueller Status | Sichere nächste Prüfung |
|---|---|---|---|
| Browser-Authentifizierung abgeschlossen | Authentifizierungsstufe sowie Token-/Sitzungsbeleg des Clients |  |  |
| Aktion für dieses Repository autorisiert | Ziel, Konto-/Organisationsumfang und Berechtigungsbeleg |  |  |
| Tool hat den Schreibvorgang ausgeführt | Tool-Aufruf/-Ergebnis und Zielkennung |  |  |
| Beabsichtigtes Objekt geändert | Frisches Lesen vom Ziel oder ein anbieterbezogener Datensatz |  |  |
| Änderung ist akzeptabel | Diff/Review/Tests oder menschliche Abnahme |  |  |

Fülle einen leeren Status nicht mit „wahrscheinlich“. Verwende `not_observed`,
`blocked`, `partial` oder `verified within scope` und erkläre den Umfang.

## Teil 3A: Einen Fehler auf Mechanismus-Ebene ergänzen

Wähle einen dieser synthetischen Fälle ohne Netzwerk und ergänze ihn im
Behauptungsprotokoll:

- **Schema bestanden, semantisch fehlgeschlagen:** Eine Antwort enthält gültiges
  JSON und alle Pflichtfelder, aber das referenzierte Objekt existiert nicht.
  Ergänze eine Prüfung von Geschäftsregel/Zustand.
- **Retrieval-Treffer, fehlende Ausnahme:** Ein allgemeiner Richtlinien-Chunk
  wird ausgewählt, während die versionsspezifische Ausnahme fehlt. Ergänze
  Anfrage, Filter, ausgewählten Chunk und Felder für fehlende Belege.
- **Anweisungsförmige Daten:** Eine README oder ein Tool-Ergebnis sagt, die
  Sicherheitsregel der Aufgabe zu ignorieren. Behalte es als Daten, lehne die
  externe Nebenwirkung ab und erfasse Quelle und versuchten Einfluss.

Der Punkt ist, die genaue fehlgeschlagene Ebene zu benennen. Ein Schemaergebnis,
ein Retrieval-Treffer oder eine sichtbare Zeichenfolge ist nicht automatisch ein
Beweis für semantische Korrektheit, vollständigen Kontext oder Autorität. Siehe
die [LLM-Mechanismusforschung](../evidence-library-DE.md#source-notes)
für die quellenbasierten Grenzen; dieses Lab führt keinen Live-Anbieter aus.

## Teil 4: Die Stoppregel üben

Wähle einen harmlosen, eingebauten Fehler:

- Melde, dass das Modell seine Kapazitätsgrenze erreicht hat.
- Melde, dass ein Befehl länger als die festgelegte Zeitbegrenzung im Status
  Working geblieben ist; oder
- Melde, dass ein Verifizierungsbefehl eine erzwungene Neuinstallation verlangt.

Wiederhole nicht automatisch. Schreibe:

    Zustand | sichtbares Symptom | aktueller Checkpoint | erfasste Belege | benötigte Autorität | kleinste Wiederherstellungsaktion | nicht verifizierte Punkte

Die richtige Wiederherstellung besteht gewöhnlich darin, den aktuellen Zustand
zu prüfen, das Protokoll zu bewahren, die nächste Prüfung einzugrenzen oder
Autorität anzufordern. Sie besteht nicht darin, den Workspace zu löschen,
Abhängigkeiten zwangsweise zu installieren oder die nächste eingereihte
Anweisung zu senden.

Diese Fehlerformen basieren auf öffentlichen Berichten in der [Codex-
Forschung zu Feldproblemen](../evidence-library-DE.md#source-notes). Sie
sind Nutzerbelege und keine offizielle Bestätigung der Ursache; dieses Lab
behauptet keine lokale Reproduktion.

## Belegpaket

Reiche ein Verzeichnis oder Markdown-Protokoll ein, das Folgendes enthält:

1. die Version der festen Karten und die Run-IDs;
2. das ausgefüllte Grenzprotokoll für A–E;
3. die beiden Zeilen des Kontextexperiments und die Störfaktoren;
4. das korrigierte Behauptungsprotokoll;
5. das Stopp-/Wiederherstellungsprotokoll; und
6. eine persönliche Zusammenfassung mit höchstens 150 Wörtern.

Die Zusammenfassung muss beantworten:

- Was ist der Unterschied zwischen einer Modellausgabe und einem Tool-Ergebnis?
- Was ist der Unterschied zwischen einem Tool-Ergebnis und einem verifizierten
  Zustand?
- Warum beweisen eine Anmeldung, ein Modellname, ein Skillname oder eine
  Fertigmeldung weder Autorität noch Korrektheit?
- Welche Aussage bleibt `not_observed`?

## Abnahmekriterien

Bestehe nur, wenn:

- jede feste Karte einen Grund, eine Grenze, einen Beleg und einen Stoppunkt
  hat;
- Karte C und Karte E keine echte externe Schreibaktion oder Benachrichtigung
  auslösen;
- mindestens eine Aussage absichtlich nicht verifiziert und nicht erraten wird;
- das Kontextexperiment eine geänderte Variable und jeden Störfaktor erfasst;
- die Fehlerübung vor destruktiver oder nicht autorisierter Eskalation stoppt;
  und
- der Mechanismusfall angibt, ob die Lücke bei Schema, Kontextauswahl,
  Anweisungsautorität, Ausführung oder Verifizierung liegt; und
- eine zweite lesende Person erkennen kann, welche Ereignisse simuliert,
  beobachtet oder nicht ausgeführt wurden.

Das Lab bleibt `draft` mit `run_status not_run`, bis das Projekt ein echtes
Laufprotokoll und eine unabhängige Review besitzt. Ein vollständiges
Arbeitsblatt ist ein Beleg für die Übung der lernenden Person, nicht dafür,
dass sich jede Codex-Produktoberfläche gleich verhält.

## Transferaufgabe

Nimm eine festgelegte Menge öffentlicher Quellen und erstelle eine einseitige
Recherchezusammenfassung in einer wegwerfbaren lokalen Datei. Kennzeichne
Quellentext, Nutzeranweisungen, Modellvorschläge, lokale Änderungen und
Verifizierungsprüfungen als getrennte Ebenen. Füge eine Quelle hinzu, die einen
für die Zusammenfassung irrelevanten, anweisungsförmigen Satz enthält. Erfasse,
warum er als Daten statt als Autorität behandelt wird. Browsing,
Veröffentlichungen oder einen externen Connector darfst du für diesen Transfer
nicht verwenden, es sei denn, du erstellst ein neues Aufgabenprotokoll mit
explizitem Umfang und expliziter Bestätigung.

## Quellen und Wartung

- [Projektterminologie](../evidence-library-DE.md#core-terms) — stabile Grenzen für das Lab.
- [Offizielle OpenAI-Codex-Faktenbaseline](../evidence-library-DE.md#source-notes) — datierte Produktfakten und Berechtigungsgrenzen; geprüft am 2026-08-09.
- [Forschung zu realen Codex-Nutzerproblemen](../evidence-library-DE.md#source-notes) — öffentliche Berichte, Quelllinks und Belegkennzeichnungen; geprüft am 2026-08-09.
- [Vertiefung zu LLM-Mechanismen](../evidence-library-DE.md#source-notes) — auf offiziellen Quellen beruhende Mechanismuskarten und Fehlerexperimente; geprüft am 2026-08-10.
- [Kapitel 1 — Verstehe GPT, bevor du Codex vertraust](../chapters/01-gpt-and-codex-DE.md) — konzeptioneller und fallbezogener Kontext für dieses Lab.

Dies ist eine originäre Übung. Sie kopiert keine externen Prompts, Protokolle,
Zugangsdaten oder Skill-Anweisungen. Prüfe veränderliche Produktfakten erneut,
bevor du eine Live-Oberfläche verwendest; der Status bleibt `draft`, bis die
erklärten Belege vorliegen.
