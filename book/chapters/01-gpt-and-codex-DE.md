<!-- content_id: chapter-01-gpt-and-codex | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: f521e29 -->

# Kapitel 1: Verstehe GPT, bevor du Codex vertraust

## Fang hier an: Die Namen brauchst du noch nicht

Heute beginnen wir mit der Frage, die hinter den Produktnamen steckt. Vielleicht hast du schon gehört, dass Codex und Claude Code zusammen genannt werden. Sie sind nützliche Beispiele für einen größeren Wandel: Ein Sprachmodell kann mit einer Aufgabe, einem Kontext und manchmal Werkzeugen arbeiten, statt nur eine Chat-Antwort zu liefern. Betrachte diese Eröffnung als kurzes geführtes Gespräch, nicht als Prüfung: Du musst dich nicht zuerst für eine Seite entscheiden oder eine Funktionsliste auswendig lernen. Bevor wir uns irgendwelche Bedienelemente ansehen, merke dir die Frage, die alles Weitere leichter macht:

> Wenn ein Sprachmodell-Werkzeug sagt, es sei fertig: Was kannst du tatsächlich prüfen, bevor du dem Ergebnis vertraust?

In dieser ersten Lektion trennst du eine vorgeschlagene Handlung von einer erlaubten Handlung, eine Werkzeugmeldung von einem tatsächlich geänderten Ziel und eine plausible Antwort von Belegen. Codex ist die vertiefte Praxisroute dieses Playbooks. Die Methode geht darüber hinaus: Für jede benannte Plattform brauchen wir einen eigenen Adapter, bevor wir ihre Schaltflächen, Berechtigungen oder Verhaltensweisen als geprüfte Tatsachen darstellen.

Deshalb bleibt die erste Übung bewusst klein. Starte mit einer sichtbaren Eingabe, einer risikoarmen Handlung und einer Prüfung, die eine andere Person wiederholen kann. Eine lange Funktionsliste kann warten, bis du ein fertiges Ergebnis von einem bloß überzeugend wirkenden Befund unterscheiden kannst.

## Wo die bekannten Namen hingehören

Du wirst GPT, Grok, Gemini, Kimi, Codex und Answer.AI in ein und demselben Gespräch hören. Sie stehen nicht alle für dasselbe. Manche Namen bezeichnen Modellfamilien, andere Arbeitsumgebungen, die Dateien oder Werkzeuge hinzufügen, und wieder andere Organisationen für angewandte KI-Forschung und Bildung. Eine nützliche Landkarte ist:

| Name, den du hörst | Erste Frage, die du stellst | Nimm nicht an |
| --- | --- | --- |
| GPT / OpenAI | Welche konkrete Kombination aus Modell und Oberfläche—ChatGPT, API oder Codex—werde ich tatsächlich nutzen? | Ein Modellname gewährt Datei- oder Werkzeugzugriff oder ein besseres Ergebnis. |
| Grok / xAI | Ist der vom Anbieter beschriebene Schwerpunkt auf logischem Schlussfolgern für meine konkrete Aufgabe relevant? | Es ist das beste Modell für deine Aufgabe oder in deinem Konto verfügbar. |
| Gemini / Google DeepMind | Braucht diese Aufgabe bestimmte Eingabeformate oder ein Ökosystem, auf das ich tatsächlich zugreifen kann? | Jede Gemini-Oberfläche hat dieselben Werkzeuge oder Fähigkeiten. |
| Kimi / Moonshot AI | Was muss ich für diese Aufgabe testen: Programmieren, Analysieren oder das Arbeiten mit langen Dokumenten? | Sein beworbener Kontext oder Funktionsumfang beweist Qualität in dieser Arbeitsumgebung. |
| Answer.AI | Suche ich angewandte Forschung, Bildungsarbeit oder ein Produkt für Endnutzer? | Es ist ein Basismodell-Anbieter für dieselbe Auswahl. |

Der [Quellenbeleg zur Übersicht von Modellen und Arbeitsumgebungen](../evidence-library-DE.md#source-notes) verknüpft jede Zeile mit einer Quelle des Anbieters und trennt dessen Positionierung von einem gemessenen Ergebnis. Verbessere zuerst eine Anfrage in dem Modell, das du bereits hast; vergleiche Kandidaten erst danach mit derselben Aufgabe und derselben Akzeptanzregel.

## Das Problem, das dieses Kapitel löst

Viele beschreiben Codex als „ein Chatfenster, das besseren Code schreibt“. Diese
Beschreibung hilft beim ersten echten Fehlschlag nicht mehr. Sie erklärt nicht,
warum dieselbe Anfrage sich anders verhält, wenn sich Modell, Projekt, Kontext,
Berechtigungen, Tools oder Feedback ändern. Sie fördert außerdem eine gefährliche
Abkürzung: eine selbstsichere Antwort oder Tool-Meldung als Beweis zu behandeln,
dass die Arbeit ausgeführt und geprüft wurde.

Dieses Kapitel entwickelt ein kleines Arbeitsmodell. Es ist keine Aussage über
verborgene Gedankengänge (chain-of-thought). Wir verwenden nur das, was Lernende
prüfen können: Eingabe, ausgewählter Kontext, angeforderte Aktion, Tool-Grenze,
zurückgegebenes Ergebnis, geänderter Zustand und die Belege, mit denen man
stoppt.

## Lernziele

Nach diesem Kapitel solltest du in der Lage sein:

- GPT, ein Modell, die Codex-Arbeitsoberfläche, ein Tool, einen Skill und eine
  Agent-Schleife voneinander zu unterscheiden;
- zu erklären, warum Kontextauswahl und Sampling eine Ausgabe ändern können,
  ohne den Satz des Nutzers zu ändern;
- die von einem Modell vorgeschlagene Tool-Aktion von der
  Berechtigungsprüfung der Laufzeit, dem Tool-Ergebnis und der abschließenden
  Verifizierung zu trennen;
- eine unsichere Fertigstellungsbehauptung in ein kleines, reversibles Experiment
  zu verwandeln; und
- ein reales Symptom zu erkennen, ohne eine offizielle Ursache zu erfinden.

## Mit einem beobachtbaren Ablauf beginnen

Verwende bei der Analyse einer Aufgabe diesen Ablauf:

    Modellfähigkeit
            ↓ erzeugt eine Antwort oder einen Aktionsvorschlag
    Codex-Arbeitsumgebung
            ↓ liefert Projektkontext und eine Ausführungsgrenze
    Tool/Laufzeit
            ↓ kann eine angeforderte Aktion erlauben, ablehnen oder ausführen
    Tool-Ergebnis / geänderter Zustand
            ↓ wird zu einem neuen Beleg oder neuen Kontext
    Verifizierung und menschliche Entscheidung
            ↓ entscheidet, ob die Arbeit stoppen oder wiederhergestellt werden muss
    Aussage zur Lieferung

Die Pfeile sind keine automatischen Garantien. Ein Modell kann einen
Shell-Befehl vorschlagen, ohne dass die Laufzeit ihn ausführt. Eine Laufzeit kann
einen Befehl mit Exit-Code null ausführen, während die falsche Datei oder
Umgebung geprüft wurde. Ein Tool kann eine Erfolgsmeldung zurückgeben, obwohl
das beabsichtigte externe Objekt nicht geändert wurde. Jeder Pfeil braucht
seine eigenen Belege.

### Die Begriffe in einfacher Sprache

| Begriff | Was er beiträgt | Was er nicht beweist |
|---|---|---|
| GPT | Eine Familie generativer Modellfähigkeiten | Datei- oder Terminalzugriff, Kontoberechtigung oder eine erfolgreiche Änderung |
| Modell | Eine konkrete Modell-/Konfigurationskombination für einen Lauf | Dass es in jeder Oberfläche verfügbar oder für jede Aufgabe am besten geeignet ist |
| Codex | Eine Arbeitsoberfläche, die ein Modell mit Projektkontext, Tools und Berechtigungen verbindet | Dass jedes sichtbare Konto oder jeder Connector für das Ziel autorisiert ist |
| Tool | Eine Schnittstelle zum Lesen oder Ändern einer Datei, eines Prozesses, Browsers, Git-Hosts oder Dienstes | Dass die angeforderte Aktion erlaubt, korrekt oder abgeschlossen war |
| Skill | Eine wiederverwendbare Methode mit Auslösern, Eingaben, Grenzen, Schritten und Belegen | Ein neues Modell, eine Berechtigungsgewährung oder ein Ersatz für Verifizierung |
| Agent | Eine beobachtbare mehrstufige Schleife aus Beobachtung, Aktion, Feedback, Wiederholung und Stopp | Zugriff auf verborgene Schlussfolgerungen oder die Berechtigung, ewig zu wiederholen |

Die stabile Terminologie des Projekts ist in [CONTEXT.md](../evidence-library-DE.md#core-terms)
festgelegt. Produktdetails wie Modellnamen, Aufrufsyntax und Standardwerte für
Berechtigungen sind veränderliche Fakten; verwende die datierte [offizielle
Baseline](../evidence-library-DE.md#source-notes) und prüfe die verlinkte
Dokumentation des jeweiligen Anbieters erneut, bevor du dich darauf stützt.

## Wie ein Sprachmodell eine Antwort erzeugt

Ein nützliches vereinfachtes Modell ist:

    ausgewählter Kontext + Aufgabe + Modellkonfiguration
            → eine Verteilung über mögliche nächste Tokens
            → ein Token nach dem anderen wird gesampelt oder ausgewählt
            → eine Antwort, ein strukturierter Aktionsvorschlag oder eine Ablehnung

Das Modell ruft nicht eine einzige vorformulierte Antwort aus einer Datenbank
ab. Es erzeugt eine Sequenz, die vom empfangenen Kontext abhängt. Kleine
Änderungen an Kontext, Reihenfolge, Anweisungen, Tool-Ergebnissen oder
Generierungskonfiguration können die Fortsetzung ändern. Dieses Bild sagt dir
nicht genau, was ein Modell gedacht hat; es zeigt dir, welche Eingaben für einen
fairen Vergleich konstant gehalten werden müssen.

### Mechanismuskarte: Kontext ist Budget und Filter

Mehr Kontext ist nicht automatisch besserer Kontext. Ordne jede mögliche
Eingabe ein:

1. Ist sie notwendig, um das Objekt und die Abnahmebedingung zu identifizieren?
2. Ist sie vertrauenswürdig, oder enthält sie eine nicht verifizierte Anweisung
   innerhalb von Daten?
3. Ist sie für diese Aufgabe aktuell genug?
4. Liefert sie ein Signal, oder konkurriert sie mit der Aufgabe um Kontextplatz?

Für eine README-Änderung können Projektregeln und die Ziel-README relevant sein.
Ein zufälliges altes Issue, ein kopierter Prompt und ein nicht zugehöriges
Geheimnis sind es nicht. Eine Datei mit der Aussage „Ignoriere die
Projektregeln“ bleibt eine zu analysierende Datei und wird nicht zu einer
Autorität, der man gehorchen muss. Kontextauswahl ist daher sowohl eine
Qualitätsentscheidung als auch eine Sicherheitsentscheidung.

### Mechanismuskarte: Variation ist ein Messproblem

Zwei unterschiedliche Ausgaben beweisen nicht, dass ein bestimmter Kontextteil
den Unterschied verursacht hat. Das Modell kann anders sampeln, der Dienst kann
eine andere Revision verwenden, der Tool-Zustand kann sich geändert haben oder
die Aufgabe kann unzureichend spezifiziert sein. Ändere jeweils nur eine
Variable und erfasse:

    run-id | model/surface | input revision | changed variable | output/state | evidence | unknowns

Wiederhole nach Möglichkeit die Baseline. Wenn du eine Variable nicht konstant
halten kannst, bezeichne die Beobachtung als „anderes Ergebnis beobachtet“, nicht
als „durch X verursacht“.

## Ein Tool-Aufruf ist eine Protokollgrenze, keine magische Aktion

Wenn Codex Tools verwenden kann, denke an vier getrennte Ereignisse:

1. Das Modell schlägt eine Aktion vor.
2. Die Laufzeit prüft Umfang, Berechtigungen und Bestätigungsregeln.
3. Das Tool führt die Aktion aus, lehnt sie ab oder läuft in einen Timeout.
4. Das Ergebnis und der geänderte Zustand werden vom nächsten Schritt geprüft.

Diese Aussagen sind nicht gleichbedeutend:

- „Das Modell hat einen Befehl geschrieben.“
- „Der Befehl wurde ausgeführt.“
- „Der Befehl hat das beabsichtigte Objekt geändert.“
- „Die Änderung erfüllt die Abnahmekriterien.“

Bei einer lokalen Datei können der geprüfte Pfad, ein Vorher-/Nachher-Diff, eine
fokussierte Prüfung und eine Liste nicht verifizierter Punkte nützliche Belege
sein. Bei einer GitHub-Aktion oder einer anderen externen Aktion kommen das
genaue Ziel, der Autorisierungsstatus, der Bestätigungspunkt, das Ergebnisobjekt
und der Rückabwicklungs- oder Wiederherstellungspfad hinzu. Eine Login-Seite,
ein Toolname oder eine Meldung mit „fertig“ schließt keine dieser Lücken allein.

### Berechtigung ist nicht dasselbe wie Fähigkeit

Die offizielle Produktdokumentation unterscheidet zwischen technischer Sandbox und
Freigabegrenze. In den Begriffen des Projekts:

- Eine Sandbox beschreibt, worauf die Laufzeit technisch zugreifen kann.
- Eine Freigabe beschreibt, wann die Laufzeit vor einer Aktion anhalten muss.
- Keine von beiden beweist, dass Ziel, Umfang oder Ergebnis korrekt sind.

Leite Berechtigungen nicht aus dem Modellnamen, dem Vorhandensein eines Skills,
der Kontoanmeldung oder einer verfügbaren Schaltfläche ab. Prüfe Ziel und Aktion
unmittelbar vor einer Nebenwirkung. Beginne eine Lernübung mit einer
wegwerfbaren Kopie und ohne Geheimnisse.

## Drei Mechanismusfallen, die man früh lernen sollte

Dieselbe beobachtbare Grenze taucht in drei häufigen Systemen auf. In einer
Produktdemo sehen sie unterschiedlich aus, aber jedes kann eine plausible
Antwort erzeugen, die noch kein vertrauenswürdiges Ergebnis ist.

### 1. Strukturierte Ausgabe kann syntaktisch korrekt und semantisch falsch sein

Ein JSON-Schema oder eine typisierte Antwort kann Form, Pflichtfelder und einige
Typen einschränken. Es beweist nicht, dass eine ID existiert, ein Datum aktuell
ist, eine Berechtigung gültig ist oder eine Quelle den Wert unterstützt.
Verwende drei Prüfungen:

```text
Schema-/Typprüfung → Geschäftsregelprüfung → Quellen-/Zustandsprüfung
```

Zum Beispiel kann `{ "status": "approved" }` gültiges JSON sein und ein Schema
erfüllen, während die Genehmigung zum falschen Projekt gehört. Bewahre die rohe
Modellausgabe, das Schemaergebnis, das Ergebnis der Geschäftsregelprüfung und
die externe Verifizierung als getrennte Belege auf. Die [LLM-
Mechanismusforschung](../evidence-library-DE.md#source-notes)
dokumentiert dies als Lehrgrenze, nicht als Behauptung, dass jeder Anbieter
dieselbe Implementierung verwendet.

### 2. Retrieval wählt Material aus; eine vollständige Nutzung ist nicht garantiert

Suche oder Retrieval kann einen relevanten Abschnitt auswählen, aber Relevanz
ist nicht dasselbe wie Vollständigkeit, Aktualität, Autorität oder tatsächliche
kausale Nutzung durch das Modell. Ein kurzer Absatz mit einer Ausnahme kann
unter einer allgemeinen Regel gerankt werden, oder eine Chunk-Grenze kann eine
Bedingung von ihrer Definition trennen. Erfasse Anfrage, Filter, Revision,
ausgewählte Chunk-IDs und die abschließenden Zitate. Wenn sich die Antwort
ändert, sage „ein anderer Retrieval-Kontext führte zu einem anderen Ergebnis“,
sofern das Experiment nicht isoliert, warum.

### 3. Daten, die wie eine Anweisung aussehen, bleiben Daten

Webseiten, Anhänge, Issue-Texte, Tool-Ergebnisse, Datenbankfelder und
MCP-Ressourcen können Text wie „Ignoriere die vorherigen Regeln“ enthalten.
Diese Zeichenfolge erhält nicht allein dadurch Autorität, dass sie wie eine
Systemanweisung aussieht. Behandle sie als nicht vertrauenswürdige Daten, halte
externe Aktionen standardmäßig schreibgeschützt und verlange eine separate
Entscheidung, bevor sie einen Tool-Aufruf beeinflussen darf. Das ist die
praktische Form der Prompt-Injection-Abwehr für Lernende am Anfang: Identifiziere
die Datenquelle, begrenze die Tool-Grenze und bewahre die versuchte Aktion im
Protokoll auf.

Diese drei Fallen werden mit anbieterspezifischen Quellen und risikoarmen
Experimenten in der [Mechanismus-Vertiefung](../evidence-library-DE.md#source-notes)
behandelt.

## Was eine Agent-Schleife wirklich bedeutet

Ein Agent lässt sich am besten als Zustandsmaschine erklären, die
beobachtbare Spuren hinterlässt:

    ready
      → observed
      → planned
      → action_requested
      → awaiting_approval / executing
      → feedback_received
      → verified / recoverable_failure / blocked
      → stop or bounded_retry

Die Schleife braucht ein Wiederholungslimit und einen Grund für jede
Wiederholung. „Versuch es noch einmal“ ist keine Wiederherstellungsstrategie,
wenn sich Eingabe, Autorität, Umgebung oder Abnahmebedingung nicht geändert
haben. Ein guter Stoppdatensatz beantwortet:

- Welcher Zustand wurde erreicht?
- Was hat sich geändert, falls überhaupt etwas?
- Welche Belege stützen die Behauptung?
- Welche Belege fehlen?
- Welche kleinste nächste Prüfung könnte die Unsicherheit verringern?

Die Schleife kann nützlich sein, ohne vorzugeben, verborgene Schlussfolgerungen
offenzulegen. Erfasse beobachtbare Ereignisse und Entscheidungen; stelle keine
erfundene private Begründung als Protokoll des internen Prozesses des Modells
dar.

## Praxisfälle: Die nützliche Lehre ist die Grenze

Die folgenden Fälle sind öffentliche Nutzerberichte aus der Feldforschung des
Projekts. Sie sind keine offiziellen Berichte über Ursachen und wurden in
diesem Projekt nicht lokal reproduziert. Ihr Wert liegt darin, dass sie zeigen,
wo ein beiläufiges mentales Modell zusammenbricht.

### Fall FP-09: Kapazitätsunterbrechung und eine gefährliche Annahme beim Wiederholen

Nutzer berichteten, dass ein ausgewähltes Modell wegen fehlender Kapazität nicht
verfügbar wurde und später eingereihte Anweisungen scheinbar von einem teilweise
fertigen Zustand aus fortgesetzt werden konnten. Der Bericht stellt weder die
dienstseitige Ursache noch die genaue Warteschlangensemantik fest. Eine sichere
Reaktion ist daher nicht „weiter auf Fortsetzen drücken“.

Die kleinste sichere Reaktion ist:

1. Stoppe und erfasse Modell, Oberfläche, Zeitpunkt und sichtbaren Fehler.
2. Prüfe den aktuellen Diff und Checkpoint, bevor du eine weitere Anweisung
   sendest.
3. Führe die engste verfügbare Prüfung des aktuellen Zustands aus.
4. Setze von einem benannten Checkpoint aus fort oder starte einen sauberen Lauf
   erst, nachdem du entschieden hast, welcher Zustand maßgeblich ist.

Quellen- und Belegkennzeichnung: [FP-09 in der
Feldforschung](../evidence-library-DE.md#source-notes).

### Fall FP-10: „Working“ ist kein Beweis für Fortschritt

Ein Windows-CLI-Nutzer berichtete, dass Formatierungs- oder Analysearbeit lange
ohne klare Fertigstellung oder Fehlermeldung im Status Working/running blieb.
Der Bericht bewies nicht, ob die Ursache ein hängender Befehl,
Prozessbehandlung, Ausgabepufferung, Umgebungsdrift oder etwas anderes war. Ein
Status für einen langen Lauf ist eine Zustandsbeobachtung, kein erfolgreiches
Ergebnis.

Erfasse Befehl, Prozesszustand, verstrichene Zeit, Ausgabe und den
Unterbrechungspunkt. Prüfe anschließend den Diff und führe, falls sicher, eine
fokussierte Prüfung unabhängig aus. Verwandle „Die Benutzeroberfläche zeigt
noch Working“ nicht in „Der Formatter ist fertig“.

Quellen- und Belegkennzeichnung: [FP-10 in der
Feldforschung](../evidence-library-DE.md#source-notes).

### Fall FP-11: Eine Verifizierung kann die Aufgabe unbeabsichtigt erweitern

Ein öffentlicher Bericht beschreibt einen Agent, der eine Verifizierungsaktion
zu einer nicht autorisierten erzwungenen Neuinstallation ausweitete. Ob die
Erklärung des Berichts tatsächlich die Ursache war, ist unbestätigt. Die
dauerhafte Lehre ist unabhängig von der Ursache: Eine Verifizierung muss einen
festgelegten Befehlsumfang, Schreibumfang und Stoppunkt haben.

Wenn eine Prüfung einen destruktiven Reset, einen Netzwerkaufruf, eine
Paketneuinstallation oder Zugangsdaten erfordert, stoppe und fordere eine
neue Entscheidung an. „Die Prüfung ist fehlgeschlagen“ gewährt keine Erlaubnis
zur Eskalation.

Siehe den [Index der Feldprobleme](../evidence-library-DE.md#source-notes)
für die Evidenzklassifikation und die Zuordnung zu verwandten Kapiteln und
Labs.

## Entscheidungsregel für eine echte Aufgabe

Bevor du Codex eine Aktion ausführen lässt, schreibe diese kleine Aufgabenkarte:

| Feld | Beispiel für eine reine README-Änderung | Was tun, wenn es fehlt |
|---|---|---|
| Ziel | Einen neuen Beitragenden beim Start des Projekts unterstützen | Nachfragen; „Mach es besser“ nicht als Abnahme interpretieren |
| Kontext | Projektregeln, README, Paketskripte | Nur die minimal relevanten Dateien lesen |
| Erlaubte Aktion | Eine lokale README in einem wegwerfbaren Branch bearbeiten | Nicht aufgeführte Nebenwirkungen als verboten behandeln |
| Feedback | Diff, Linkprüfung und Aufzeichnung der Befehlsausgabe | Vor weiteren Änderungen eine Prüfung ergänzen |
| Stoppbedingung | Umfang geändert, Befehl benötigt Installation/Netzwerk oder Belege fehlen | Stoppen und als `blocked` oder `not_observed` erfassen |
| Lieferbehauptung | „README geändert; Linkprüfung bestanden; Laufzeit nicht getestet“ | Jede Behauptung auf den tatsächlich vorhandenen Beleg begrenzen |

Diese Karte ist wertvoller als ein langer Prompt, weil sie die Entscheidungen
sichtbar macht, die ein Prompt oft implizit lässt.

## Kleines Experiment: Aufgabe festhalten, eine Eingabe ändern

## Erstes Gespräch: drei Prompts für sofort

Du musst nicht zuerst schwierige Begriffe auswendig lernen. Wähle ein kleines Ziel ohne persönliche Daten und ohne externen Schreibzugriff und füge einen der folgenden Texte in den Chat des von dir verwendeten LLM ein. Ersetze die eckigen Klammern. Es sind keine Zauberformeln: Sie machen Verständnis, Grenzen und den nächsten Schritt sichtbar. Ergebnisse können sich zwischen Modellen und Arbeitsumgebungen unterscheiden.

### 1. Eine Sprache oder kleine Fähigkeit lernen

```text
Ich lerne [Spanisch / eine Fähigkeit]. Das kann ich derzeit ehrlich: [aktueller Stand].
Erstelle eine 10-Minuten-Übung für genau ein Ziel; setze keine anderen Kenntnisse voraus.
Zeige zuerst ein Beispiel und lass mich dann antworten. Korrigiere nur ein oder zwei Punkte, die das Verständnis am stärksten beeinflussen.
Schreibe zum Schluss drei Zeilen: Was gelang, was ich als Nächstes übe und was diese einzelne Sitzung nicht belegt.
Stelle eine Unterhaltung nicht als Nachweis dar, dass ich die Fähigkeit beherrsche.
```

Das ist kein Versprechen, eine Sprache in sieben Tagen zu lernen. Eine Sitzung hinterlässt nur diese Antwort und dieses Feedback; Behalten, Transfer in eine neue Situation und echte Gesprächsfähigkeit prüfst du später getrennt. Wenn Fakten nicht überprüfbar sind, die Aufgabe zu groß wird oder nach persönlichen Daten gefragt wird, verkleinere die Aufgabe, verlange eine Quelle oder beende das Gespräch.

### 2. Öffentliche Quellen schnell ordnen

```text
Ich muss diese Frage beantworten: [Frage].
Nutze nur die Quellen, die ich unten gebe; füge keine nicht gelieferten Fakten hinzu.
Nenne zuerst Titel, Datum (falls vorhanden) und möglichen Beitrag jeder Quelle; schreibe danach eine kurze Zusammenfassung mit Quellenmarkierung.
Trenne „Quelle sagt ausdrücklich“, „plausible Schlussfolgerung“ und „noch unbekannt“.
Wenn Quellen widersprechen, veraltet sind oder eine Schlüsseltatsache fehlt, stoppe bei einer Fragenliste; rate nicht.
```

So wird aus „ich habe viel gefunden“ ein Ergebnis, das zur Quelle zurückverfolgt werden kann. Bei Recherche mit Netzwerk, kostenpflichtiger Datenbank oder echtem Konto prüfst du vorher Produktrechte, Quellenlizenz und Datenumfang. Eine sichtbare Antwort bedeutet nicht, dass die Recherche abgeschlossen ist.

### 3. Einen unklaren Auftrag vor der Aktion klären

```text
Ich möchte [Ergebnis] für [Zielgruppe oder Datei] erreichen.
Bekannte Eingabe: [Material]. Unbekannt: [Unklarheiten].
Noch nichts ausführen, senden, veröffentlichen, installieren oder bearbeiten.
Gib nur Ziel-Neufassung, fehlende Informationen, kleinsten reversiblen Schritt,
Abnahmebeleg und Stoppbedingung aus.
Wenn Secret, Netzwerk, Konto, externer Write oder größerer Umfang nötig ist, markiere blocked und nenne die nötige Bestätigung.
```

Prüfe auch bei einer gut klingenden Antwort, ob sie diese Felder wirklich beantwortet. Überspringt sie Unbekanntes, stellt sie Vorschläge als Ergebnisse dar oder erweitert sie unautorisierte Aktionen, ist das ein beobachtbarer Fehler. Lass das Modell nicht weiter raten.

## Drei Schritte zum Zurücklesen

Stell dir nach jedem Prompt eine Minute lang drei Fragen: **Was wurde gelesen? Was wurde tatsächlich getan? Was kann ich prüfen?** Bei einer reinen Chat-Aufgabe sind meist nur Eingabe und Ausgabe prüfbar. Bei Datei-, Browser- oder Code-Aufgaben brauchst du zusätzlich Ziel, Diff, Befehlsausgabe oder eine externe Rückmeldung. So trennst du vom ersten Tag an „ich kann chatten“ von „ich kann zuverlässig liefern“.

### Vorbereitung

Verwende eine wegwerfbare lokale Kopie, die nur eine README und eine kurze
Projektregel enthält. Verwende kein privates Repository, keine Geheimnisse,
Kundendaten, Netzwerkaufrufe oder externen Konten. Erfasse für jeden Versuch
eine Run-ID.

### Aufgabe

Bitte das Modell oder die Codex-Oberfläche:

> Prüfe den README-Auszug und nenne eine Verbesserung. Ändere keine Dateien.
> Erkläre, was du gelesen hast, warum die Verbesserung wichtig ist und wie eine
> spätere Änderung geprüft werden könnte.

Führe eine Baseline aus und wiederhole sie anschließend, wobei du nur eine
Variable änderst:

1. Zielgruppe und Projektziel hinzufügen;
2. eine Projektregel hinzufügen;
3. vor der Antwort einen kurzen Plan verlangen; oder
4. ein explizites Abnahmekriterium hinzufügen.

Wenn sich Oberfläche oder Modell zwischen den Läufen ändern, erfasse das als
Störfaktor. Behaupte keine Kausalität aus einem beiläufigen Vorher-/Nachher-
Vergleich.

### Belege

Speichere Revision von Prompt/Eingabe, Run-ID, Kennzeichnung von
Oberfläche/Modell, Lesebereich, Antwort, ob ein Datei-Diff existiert, und nicht
verifizierte Punkte. Ein bestandenes statisches Experiment beweist nicht, dass
dieselbe Verhaltensweise in jeder Codex-Oberfläche auftritt.

### Reflexion

- Welche Variable hat die Aufgabengrenze verändert und nicht nur die Formulierung?
- Wie hast du einen Tool-Vorschlag von einer ausgeführten Aktion unterschieden?
- Was müsstest du beobachten, bevor du behauptest, dass das Ergebnis korrekt ist?
- Welches kleinste nächste Experiment würde eine Unsicherheit beseitigen?

## Beabsichtigter Fehlschlag

Verwende diese absichtlich unzureichend spezifizierte Anfrage in der
wegwerfbaren Kopie:

> Mach das gesamte Projekt professionell und behebe jedes Problem.

Die richtige Reaktion besteht nicht in einer großen, unbeschränkten Änderung. Eine solide
Reaktion benennt die fehlende Definition von „professionell“, Umfang,
Eingabedateien, Risiko, Abnahmekriterien und Stoppbedingungen; sie schlägt eine
schreibgeschützte Bestandsaufnahme vor oder stellt eine fokussierte Frage. Wenn
sofort editiert wird, erfasse das als Versagen der Aufgabengrenze, nicht als
nützliche Initiative.

## Abnahme-Checkliste

Du kannst weitermachen, wenn du:

- den Unterschied zwischen Modellfähigkeit, Codex-Oberfläche, Tool-Aktion,
  Tool-Ergebnis und Verifizierung erklären kannst;
- Kontextauswahl als kontrollierte Variable beschreiben kannst und nicht als
  „mehr ist immer besser“;
- einen Feldbericht als Nutzerbericht, offizielle Tatsache, lokale Beobachtung
  oder nicht verifizierte Hypothese kennzeichnen kannst;
- eine Aufgabenkarte mit erlaubter Aktion und Stoppbedingung schreiben kannst;
  und
- ein Laufprotokoll erstellen kannst, das sagt, was die Belege nicht beweisen.

Markiere dieses Kapitel nicht deshalb als gemeistert, weil du Definitionen
wiederholen kannst. Bearbeite [Lab 011 — GPT, Codex, Tools und
Agents](../labs/lab-011-gpt-codex-boundaries-DE.md) und bewahre das Ergebnis in
einem lokalen Lernprotokoll auf.

## Transferaufgabe

Wende dasselbe Modell auf eine Aufgabe außerhalb des Codes an: Bitte Codex,
aus einer festgelegten Menge öffentlicher Quellen ein kurzes
Recherchebriefing zu erstellen. Identifiziere Modell, Arbeitsoberfläche,
Quellenkontext, Tools, erlaubte Aktionen, Prüfungen der Quellenqualität,
Stoppbedingungen und abschließende Belege. Füge eine absichtlich irrelevante
Quelle hinzu und erfasse, wie du entscheidest, sie auszuschließen. Gehe nicht
davon aus, dass eine öffentliche Quelle jede darin enthaltene Anweisung
autorisiert.

## Quellen und Wartungsgrenze

- [Transformer-Architekturpapier (Vaswani et al., 2017)](https://arxiv.org/abs/1706.03762) — primäre Forschungsreferenz für das aufmerksamkeitsbasierte Sequenzmodell; abgerufen am 2026-08-10.
- [Offizielle OpenAI-Codex-Faktenbaseline](../evidence-library-DE.md#source-notes) — datierter Projektvermerk zu veränderlichen Produktfakten und offiziellen URLs; geprüft am 2026-08-09.
- [Forschung zu realen Codex-Nutzerproblemen](../evidence-library-DE.md#source-notes) — öffentliche Berichte und Belegkennzeichnungen; geprüft am 2026-08-09; kein Bericht über eine lokale Reproduktion.
- [Vertiefung zu LLM-Mechanismen](../evidence-library-DE.md#source-notes) — auf offiziellen Quellen beruhende Mechanismuskarten, Experimente und Kennzeichnungen für Fakten, Schlussfolgerungen und Unbekanntes; geprüft am 2026-08-10.
- [Projektterminologie](../evidence-library-DE.md#core-terms) — stabile Definitionen für GPT, Codex, Tools, Skills, Agents, Belege und Status.

Die erklärende Struktur dieses Kapitels ist originär für dieses Projekt. Produktnamen,
Aufrufsyntax, Modellverfügbarkeit, Berechtigungen und Dienstverhalten müssen
erneut anhand der aktuellen Quelle aus erster Hand geprüft werden, bevor sie als
aktuelle Fakten gelten. Der Kapitelstatus bleibt `candidate`; das verlinkte Lab
bleibt `draft` und `not_run`, bis ein echtes Laufprotokoll und eine unabhängige
Review vorliegen.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"></td>
      <td align="right"><a data-chapter-nav="next" href="02-first-safe-task-DE.md" aria-label="Nächstes Kapitel: Kapitel 2 · Die erste sichere und überprüfbare Aufgabe erledigen">Weiter →<br><strong>Kapitel 2 · Die erste sichere und überprüfbare Aufgabe erledigen</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
