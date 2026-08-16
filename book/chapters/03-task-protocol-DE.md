<!-- content_id: chapter-03-task-protocol | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

# Kapitel 3: Einen Wunsch in ein Aufgabenprotokoll verwandeln

![Lehrtafel: Von einer Anfrage über Umfang, Handlung und Prüfung zu einer begrenzten Übergabe](../../assets/teaching/task-to-evidence-red-black.svg)

## Das Problem, das dieses Kapitel löst

„Mach die Startseite besser.“ „Recherchiere das.“ „Nutze das beste Skill.“
„Veröffentliche die Korrektur.“ Solche Bitten wirken klar, bis jemand entscheiden
muss, welche Dateien gelesen werden dürfen, welche Handlungen erlaubt sind, was
als Erfolg zählt und wann Schluss ist. Bleiben diese Entscheidungen unausgesprochen,
füllt ein Agent die Lücken mit Annahmen. Er kann die falsche Oberfläche ändern,
Links mit Belegen verwechseln oder eine Prüfung stillschweigend auf eine
Installation oder einen externen Aufruf ausweiten.

Dieses Kapitel behandelt eine ernsthafte Anfrage als kleines Aufgabenprotokoll.
Es schreibt weder verborgenes Denken noch jeden Tastendruck vor. Es macht den
beobachtbaren Vertrag sichtbar: Ziel, Kontext, Eingaben, Einschränkungen,
erlaubte Aktionen, Abnahme, Stopp, Wiederherstellung und Übergabe.

> Füge Details hinzu, wenn sie eine Entscheidung beseitigen, die Umfang, Risiko,
> Abnahme oder Belege verändern könnte. Entferne Details, wenn sie die Anfrage
> nur bestimmter klingen lassen.

## Lernziele

Nach diesem Kapitel kannst du:

- eine vage Bitte in ein begrenztes Protokoll verwandeln, das andere ausführen können;
- nützlichen Kontext von nicht vertrauenswürdigem Material unterscheiden, das nur wie eine Anweisung aussieht;
- Abnahme als Behauptung-Beleg-Tabelle statt als „mach es gut“ formulieren;
- Lesen, Bearbeiten, Ausführen, Commit, Push, Veröffentlichen und externe Aktionen trennen;
- Stopps für fehlende Eingaben, unklare Befugnis, wiederholte Fehler und Beleglücken festlegen; und
- das Protokoll an einen anderen Agent oder Teamkollegen übergeben, ohne Umfang oder offene Fragen zu verlieren.

## Was die Quellen tatsächlich stützen

Die hier verwendete offizielle Prompt- und Codex-Anleitung empfiehlt, Ergebnis,
relevanten Kontext, Ausgabe und Grenzen, passenden Code oder Reproduktionsschritte
und die Prüfweise eines Wechsels zu benennen. Für Arbeit, die langfristig
verlässlich bleiben soll, empfiehlt sie außerdem Beispiele, Aufgabenzerlegung,
Iteration und Auswertung.

Das sind quellenbasierte Empfehlungen, keine Garantie, dass ein Modell einer
impliziten Regel folgt. Das achtteilige Protokoll ist eine eigene operative
Synthese dieses Projekts. Es ergänzt explizite Felder für Stopp, Wiederherstellung
und Belege, weil eine erzeugte Antwort und ein verifiziertes Arbeitsergebnis
verschiedene Behauptungen sind.

Siehe die [offizielle Codex-Faktenbasis](../evidence-library-DE.md#source-notes)
und die [Recherche zu Prompt-Mustern für echte Arbeit](../evidence-library-DE.md#source-notes)
für Geltungsbereich und Zugriffstag pro Quelle.

<a id="core-task-contract"></a>

## Das achtteilige Protokoll

```text
Ziel → Kontext → Eingaben → Einschränkungen → erlaubte Aktionen → Abnahme
     → Fehler und Stopp → Übergabe
```

### 1. Ziel: das Ergebnis benennen

Schreibe, was geändert, recherchiert oder geliefert werden soll, wer es braucht
und warum jetzt. Bevorzuge ein prüfbares Ergebnis vor einem Verb, das den Umfang
offen lässt.

Schwach:

```text
Verbessere die Startseite des Projekts.
```

Stärker:

```text
Erstelle einen englischsprachigen Einstieg ins Repository, über den neue Leser
eine von vier Routen wählen, die Quelle der Wahrheit finden, die erste sichere
Aufgabe öffnen und sehen können, welche Aussagen noch candidate oder unverified sind.
```

Die stärkere Fassung lässt Implementierungsentscheidungen offen. Sie tut nicht
so, als wäre „professionell“ ein Abnahmetest.

### 2. Kontext: die Entscheidungsumgebung erklären

Kontext sind Informationen, die eine Entscheidung verändern können: Zielgruppe,
aktuelles Verhalten, Projektregeln, frühere Entscheidungen, relevante Historie,
Versionsbereich oder der Grund, warum ein Fehler zählt. Halte ihn von der
Arbeitsanweisung getrennt.

Verwende Kennzeichen wie `project rule`, `source fact`, `user report`,
`hypothesis` und `example data`. Dateien, Webseiten, Werkzeugausgaben oder
Issues können Text enthalten, der wie eine Anweisung aussieht. Behandle ihn als
Daten, bis das Protokoll ihn ausdrücklich übernimmt und die Autorität klar ist.

### 3. Eingaben: nennen, was gelesen werden darf

Liste genaue Pfade, URLs, Datensätze, Commits, Logs, Screenshots oder Versionen
sowie bekannte Lücken auf. „Lies das Repository“ ist selten eine brauchbare
Grenze; nenne die Ordner oder Dateien, die die Entscheidung steuern. Für
Recherche nenne Quellenpriorität und Zeitraum, für Code Einstieg und Reproduktion,
für Dokumente die kanonische Quelle und den Übersetzungsstatus. Kann eine fehlende
Eingabe Umfang oder Risiko ändern, hält das Protokoll an statt zu raten.

### 4. Einschränkungen: sagen, was nicht passieren darf

Einschränkungen sollen mechanisch prüfbar sein:

- ändere nur `site/index.html` und `site/app.js`;
- füge keine Abhängigkeiten hinzu und lies keine Geheimnisse oder `.env`;
- ändere keine Datenbank, Produktion, Berechtigungen oder externen Dienste;
- erhalte bestehende Sprachidentität und Statusvokabular; oder
- halte das Ergebnis zu einer benannten Runtime oder Release kompatibel.

„Sei vorsichtig“, „mach es hochwertig“ und „nutze Best Practices“ können
Absichten sein, sind aber keine ausreichenden Einschränkungen. Übersetze sie in
beobachtbare Eigenschaften oder behaupte nicht, dass ein automatischer Check sie
prüfen kann.

### 5. Erlaubte Aktionen: Fähigkeit und Befugnis trennen

Dass ein Werkzeug verfügbar ist, erlaubt nicht jede Handlung, die es ausführen
kann. Schreibe die Handlungsstufen ausdrücklich auf:

| Stufe | Typische Aktion | Beleg vor dem Weitergehen |
|---|---|---|
| A0 | Status, Pfade, Quellen oder Logs lesen | Umfang und aktueller Zustand erfasst |
| A1 | Plan oder Edit-Vorschlag schreiben | Zieldateien und Abnahme benannt |
| A2 | Begrenzte lokale Änderung vornehmen | Diff bleibt im genehmigten Satz |
| A3 | Fokussierten Check ausführen | Befehl stammt aus dem Projekt oder ist genehmigt |
| A4 | Commit oder Push durchführen | Nutzerautorisierte Zieladresse und Review-Beleg |
| A5 | Veröffentlichen, deployen, benachrichtigen, zahlen, löschen oder externen Zustand ändern | Explizite Freigabe, Rollback und Nachprüfung |

Ein Protokoll kann A0–A2 erlauben und A3 zur Bestätigung offenlassen. Es kann
einen fokussierten Test erlauben, aber keine Installation. Nutze nie „tu, was
nötig ist“, um eine Berechtigungsänderung zu verstecken.

### 6. Abnahme: jede Behauptung einem Beleg zuordnen

Schreibe zuerst die Behauptung und dann das Material, das sie stützen würde:

| Behauptung | Nötiger Beleg | Was er nicht beweist |
|---|---|---|
| Die vorgesehenen Dateien änderten sich | `git diff --name-only` und Diff | Laufzeitverhalten oder Nutzerfreigabe |
| Der Check bestand | Exakter Befehl und Ausgabe/Exit-Status | Dass alle Anforderungen abgedeckt sind |
| Die Seite ist erreichbar | Lokale oder veröffentlichte URL und Browserbeobachtung | Alle Browser, Caches oder Login-Pfade |
| Die Recherche ist aktuell | Primär-URL, Zugriffstag, Umfang und nächste Prüfung | Dass ein Forumsbericht eine offizielle Ursache ist |
| Die Aufgabe ist fertig | Behauptung-Beleg-Tabelle ohne unbelegte Pflichtbehauptung | Arbeit außerhalb des erklärten Umfangs |

Fehlt einer Behauptung ein bezahlbarer Beleg, verenge die Behauptung. „Der lokale
Build bestand“ kann gültig sein; „Die Funktion arbeitet für alle“ braucht meist
einen größeren Test und eine erklärte Umgebung.

### 7. Fehler und Stopp: den sicheren Ausgang festlegen

Halte an und berichte, wenn Ziel, aktueller Zustand oder Befugnis unklar sind;
eine fehlende Eingabe Umfang, Risiko oder Abnahme ändern kann; eine Aktion die
genehmigte Datei-, Netzwerk-, Konto- oder Datengrenze überquert; eine stille
Ausgabe lange genug dauert, dass ein erneuter Versuch Nebenwirkungen doppeln
könnte; zwei Versuche aus derselben ungeprüften Ursache fehlschlagen; oder die
Belege nur eine engere Aussage als die verlangte Übergabe stützen.

Wiederherstellung heißt nicht „mit einem lauteren Prompt erneut versuchen“.
Bewahre den ersten Fehler, verkleinere den Umfang, ändere eine Hypothese oder
einen Check und notiere, was der vorige Versuch bereits geändert hat. Prüfe vor
einem langen oder extern sichtbaren Wiederholungsversuch Zustand und Diff, damit
die erste Nebenwirkung nicht doppelt geschieht.

### 8. Übergabe: einen verwendbaren Bericht hinterlassen

Fordere einen Abschlussbericht mit erledigten Behauptungen und Belegen, geänderten
Dateien, URLs, Befehlen oder Aufzeichnungen, absichtlich nicht ausgeführten
Aktionen, offenen Fragen, Risiken und unverifiziertem Umfang, dem nächsten
kleinsten Check sowie verantwortlicher Person oder Prüftermin für volatile
Fakten. Ohne ihn muss die nächste Person das Protokoll aus dem Chat rekonstruieren
und könnte eine fehlgeschlagene Aktion wiederholen.

## Das Protokoll ist ein Abhängigkeitsgraph

Die Felder sind keine Liste gleich unabhängiger Adjektive:

```text
Ziel ───────────────→ Abnahme ───────────→ Stopp
 │                      │                  ↑
 ├── benötigt ──────→ Eingaben             │
 ├── begrenzt durch → Einschränkungen       │
 │                      │                  │
 └── formt ─────────→ erlaubte Aktionen ─→ Wiederherstellung
                                               │
Kontext ──> Vertrauen und Relevanz ───────────┘
                          ↓
                     Übergabebelege
```

Ändert sich das Ziel, ändert sich die Abnahme. Ändert eine neue Eingabe das
Risiko, müssen erlaubte Aktion und Stoppbedingung neu betrachtet werden.
„Bitte sei vorsichtig“ repariert keine fehlende Abhängigkeit.

<a id="core-task-contract-end"></a>

## Das kleinste nützliche Protokoll

<!-- starter-task-contract:start -->

### Einen sicheren Startprompt kopieren

Ersetze die Felder in Klammern und verlange eine erste Antwort, die nur
beobachtet. Die Freigabepause verbindet eine Anfängerfrage mit einem prüfbaren
Arbeitsablauf; entferne sie nicht nur, um den Prompt kürzer zu machen.

```text
Hilf mir, eine kleine, rückgängig zu machende Aufgabe zu erledigen.

Ergebnis: [ein beobachtbares Ergebnis].
Kontext: [relevante Dateien, Eingabe und aktueller Zustand].

Erste Antwort – nur beobachten:
- untersuche nur den für diese Aufgabe nötigen Kontext;
- berichte, was du gefunden hast, welche Eingaben fehlen und welche Risiken bestehen;
- schlage den kleinsten sicheren Plan und die genauen Dateien oder Oberflächen vor, die er ändern würde;
- bearbeite noch nichts, führe keinen zustandsändernden Befehl aus und nimm keine externe Aktion vor; warte auf meine Freigabe.

Wenn ich den Plan freigebe:
- handle nur innerhalb des freigegebenen Umfangs;
- führe [einen fokussierten Check] aus;
- halte an und frage nach, wenn Umfang, Befugnis, zerstörerische Aktion, externe Nebenwirkung oder Abnahme unklar sind.

Greife nicht auf Geheimnisse oder Produktion zu, installiere keine Abhängigkeiten,
nutze kein Netzwerk, committe, pushe oder veröffentliche nicht und erweitere die
Aufgabe nicht, sofern ich diese genaue Aktion nicht ausdrücklich freigebe.

Abnahme: [konkretes Artefakt oder Diff] und [konkrete Check-Ausgabe].
Übergabe: ausgeführte Aktionen, geänderte Dateien oder Oberflächen, Check-Ausgabe, offene Unbekannte und nicht ausgeführte Aktionen.
```

Den Prompt zu kopieren oder zu senden beweist keine Aktion und kein korrektes
Ergebnis. Passe ihn mit diesen Feldern an und übe ihn in [Lab 002](../labs/lab-002-task-protocol-DE.md).
Ist eine Einheit noch nicht übersetzt, muss der Reader ihren lokalen Nichtverfügbar-
Status zeigen statt in eine andere Sprache zu wechseln.

<!-- starter-task-contract:end -->

Für eine risikoarme lokale Änderung reicht oft:

```text
Ziel: Ändere <eine benannte Datei>, sodass <beobachtbares Ergebnis> entsteht.
Lies zuerst: <genaue Dateien oder Quelle der Wahrheit>.
Erlaubt: prüfen, dann nur <benannten Pfad> bearbeiten; <fokussierten Check> ausführen.
Nicht: installieren, Geheimnisse oder Netzwerk nutzen, committen, pushen, veröffentlichen oder Produktion berühren.
Abnahme: <konkretes Diff> und <konkrete Check-Ausgabe>.
Stopp: wenn Pfad, Befehl, Befugnis oder Beleg unklar sind.
Übergabe: geänderte Dateien, Check-Ergebnis, nicht ausgeführte Aktionen und unverifizierte Punkte.
```

Das Protokoll darf kurz sein, weil das Risiko eng ist, nicht weil fehlende Felder
harmlos wären.

## Erweiterung für Hochrisiko-Protokolle

Für Produktion, externe Dienste, Kundendaten oder irreversible Aktionen ergänze
einen Checkpoint vor der Aktion:

```text
Checkpoint vor der Aktion:
- Zielumgebung und Konto:
- aktuelle Version und Backup-Ort:
- genaue externe Nebenwirkung:
- Freigabeverantwortliche Person und Zeitstempel:
- Rollback-Ziel und Wiederherstellungstest:
- Check nach der Aktion: URL, Log oder Metrik:
```

Lass ein Skill, ein kopiertes Runbook oder einen erfolgreichen lokalen Build
diese Felder nicht still ausfüllen. Sie brauchen aktuelle Umgebungsbelege und
die Autorität der Person, die für externen Zustand verantwortlich ist.

## Drei Prompts sind besser als ein übergroßer Prompt

Bei einer unsicheren Aufgabe teile die Arbeit auf:

1. **Beobachten:** relevante Dateien, Zustand, fehlende Eingaben und Risiken nennen.
2. **Vorschlagen:** kleinsten Plan, geänderte Dateien, Abnahme und Stopp schreiben.
3. **Handeln:** nur den freigegebenen Plan ausführen und Belege je Behauptung zurückgeben.

Damit ist ein Plan vor der Bearbeitung prüfbar, und es ist leichter zu erkennen,
in welcher Stufe eine schlechte Annahme entstand. Das ersetzt nicht die Prüfung
des echten Ergebnisses.

## Sechs Startprompts für eine evidenzbegrenzte Übungsschleife

Das sind keine Zauberformeln und keine sechs aufeinanderfolgenden Lektionen.
Sie lösen sechs Steuerungsprobleme: beobachtbarer Ausgangspunkt und Basislinie,
Abruf vor der Lösung, begrenzte Korrektur, direkte Variation, evidenzbasierter
Wiederholungshinweis und verzögerter unbekannter Check. Die Felder in Klammern
passen zu Sprache, Softwarekonzept, Interview, Schreibtechnik oder einer anderen
begrenzten Fähigkeit.

### 1. Den wirklichen Ausgangspunkt finden

```text
Ich möchte lernen, [ein fünfminütiges Anfängergespräch auf Spanisch zu führen].
Unterrichte mich noch nicht. Gib mir eine kurze Basisaufgabe, die genau diese Fähigkeit prüft.
Nenne Regeln, erlaubte Hilfe, Zeitlimit und Bewertungskriterien, bevor ich beginne.
Warte auf meine Antwort. Halte danach fest, was ich konnte, was Bedeutung blockierte und was du
aus einem einzigen Versuch noch nicht ableiten kannst.
```

Nutze dies vor einer Lektion. Eine Selbsteinschätzung wie „Anfänger“ ist weniger
nützlich als ein beobachteter Versuch.

### 2. Mich abrufen lassen, bevor du die Lösung zeigst

```text
Bringe mir eine kleine Einheit bei, die ich für [Essen auf Spanisch bestellen] brauche.
Halte die erste Erklärung unter 120 Wörtern. Fordere danach eine Antwort aus dem Gedächtnis.
Zeige die fertige Antwort nicht vor meinem Versuch. Wenn ich feststecke, gib jeweils nur einen Hinweis:
zuerst die Fehlerart, dann einen Teilhinweis, dann ein gelöstes Fragment.
Fordere nach dem Feedback eine weitere Antwort in meinen eigenen Worten.
```

Entscheidend ist nicht die Wortzahl, sondern „warte auf meinen Versuch“.

### 3. Den ersten folgenreichen Fehler korrigieren

```text
Sei ein präziser Übungspartner, kein Anfeuerer. Bei jeder meiner Antworten:
1. sage kurz, was erfolgreich kommuniziert wurde;
2. benenne den ersten Fehler, der Bedeutung ändert oder die Zielkompetenz blockiert;
3. erkläre die Regel in einfacher Sprache;
4. bitte um einen korrigierten Versuch;
5. führe ein Fehlerprotokoll mit Versuch, Korrektur, Regel und nächster Variation.
Schreibe nicht alles für mich um und korrigiere keinen kleinen Stilfehler, solange ein bedeutungsblockierender Fehler bleibt.
```

So ersetzt eine flüssige Umschreibung nicht das Lernen.

### 4. Transfer in einer veränderten Situation prüfen

```text
Ich habe gerade [auf Spanisch eine Mahlzeit bestellt] geübt. Gib mir eine neue Situation mit derselben
Grundfähigkeit, aber anderem Ort, Wortschatz und einer Quelle von Mehrdeutigkeit. Verwende keine Sätze
aus der Lektion wieder. Lass mich zuerst antworten. Bewerte nach denselben Kriterien, zeige die verwendete
Hilfe und bezeichne das Ergebnis nur als in dieser Transferaufgabe gezeigt, nicht als Beherrschung.
```

Eine nahe Kopie prüft Wiedererkennen. Eine veränderte Situation beginnt, Transfer
zu prüfen.

### 5. Die nächste Wiederholung aus Belegen bauen

```text
Erstelle nur aus den Versuchen und dem Fehlerprotokoll dieses Gesprächs meine nächste 15-Minuten-Wiederholung.
Beginne mit Abruf ohne Hilfe, greife zwei wichtige Fehler wieder auf, füge ein gemischtes Beispiel hinzu und
ende mit einer unbekannten Aufgabe. Behaupte nicht, eine Erinnerung geplant zu haben. Gib mir einen speicherbaren
Wiederholungshinweis, das Datum für den Versuch und die Belege, die ich zurückbringen soll.
```

Das Modell kann einen Hinweis vorbereiten; es kann ohne Belege weder eine
behaltene Fähigkeit noch eine externe Erinnerung behaupten.

### 6. Den verzögerten unbekannten Check vor einer Behaltensbehauptung durchführen

```text
Dies ist meine geplante Wiederholung für [Zielkompetenz]. Zeige nicht die gespeicherte Lektion oder korrigierte Sätze.
Gib mir eine vorher nicht gezeigte Aufgabe, die dieselbe Fähigkeit mit veränderten Details prüft. Nenne erlaubte Hilfe
und unveränderte Bewertungskriterien, dann warte auf meinen Versuch. Notiere echten Zeitabstand und genutzte Hilfe.
Berichte nur, was in dieser verzögerten Aufgabe geschah; leite keine dauerhafte Behaltung, breiten Transfer, Flüssigkeit oder Beherrschung ab.
```

Ein gespeicherter Wiederholungshinweis ist ein Plan. Behaltung bleibt `not_run`,
bis verzögerter Versuch und Bedingungen tatsächlich aufgezeichnet sind.

### Separater Check: eine Behauptung über die Methode recherchieren

```text
Untersuche diese Behauptung: [Sechs Prompts können jeden Menschen in sieben Tagen fließend machen].
Definiere zuerst die genaue Fähigkeit, die die Behauptung beweisen müsste. Bevorzuge Primärforschung und
offizielles Material der Quelleninhaber. Notiere für jede wichtige Schlussfolgerung Quelle, Datum, Population
oder Produktumfang, direkte Stütze und was sie nicht belegt. Suche einmal nach Gegenbelegen. Trenne Fakten,
Schlüsse, Anekdoten und Unbekanntes. Stoppe, wenn weitere Quellen die Entscheidung nicht ändern, und ende mit
der engsten wahrheitsgemäßen Umformulierung.
```

Dieser Rechercheprompt liegt außerhalb der sechsstufigen Übungsschleife. Nutze
ihn für Gesundheit, Finanzen, Produktfunktionen, Nachrichten, Statistiken und
andere Aussagen, für die eine selbstsichere Antwort ohne nachvollziehbare Quelle
nicht genügt.

### Was aufzubewahren ist

Bewahre Basislinie, erste Versuche, genutzte Hinweise, korrigierte Versuche,
Fehlerprotokoll, verzögerte Wiederholung, unbekannte Aufgabe und Bewertungskriterien.
Eine glatte Sitzung stützt nur „heute geübt“, nicht Flüssigkeit, dauerhafte
Behaltung oder Transfer. Die Kandidatenmethode und Quellengrenze stehen in der
[Recherche zu dauerhaftem LLM-gestütztem Lernen](../evidence-library-DE.md#source-notes).

## Fehlerbilder aus der Praxis

Feldberichte zeigen, warum diese Felder zählen: Langes Warten oder automatischer
Retry kann einen Agent aktiv wirken lassen, ohne zu beweisen, dass die letzte
Anweisung ankam oder eine externe Aktion nicht doppelt geschah. Eine Berechtigung
in der Konfiguration gilt vielleicht nicht für Arbeitsfläche oder Runtime. Ein
sichtbarer Login oder Werkzeugname beweist keine Berechtigung für Zielkonto,
Organisation, Repository oder Connector. Ein Community-Workaround kann auf einer
anderen Version oder Plattform unsicher oder ungültig sein.

Das sind Nutzerberichte, keine universellen Produktursachen. Nutze den
[Feldproblemindex](../evidence-library-DE.md#source-notes) und
den [Fallbericht zu Coding-Agents](../evidence-library-DE.md#source-notes):
Symptom und Umgebung erfassen, den kleinsten sicheren Check ausführen, an der
Grenze stoppen und nur behaupten, was die Belege tragen.

## Mehrere Agents: Übergabe ist ein weiteres Protokoll

Delegation entfernt nicht die Verantwortung des Haupt-Agents. Gib jeder
Arbeitskraft eine getrennte Aufgabe und eine feste Antwortform:

```text
Rolle: Sprachmatrix prüfen; keine Quelldateien bearbeiten.
Eingaben: <zwei benannte Dateien>.
Ausgabe: Befunde, Belegpfade, Blocker und ein empfohlener nächster Check.
Verboten: Edits, externe Nachrichten, Zugangsdaten und Schlussfolgerungen außerhalb der benannten Dateien.
```

Die Koordination fasst Fakten erst nach Prüfung von Quelle, Umfang und Belegen
jedes Arbeiters zusammen. Eine Zusammenfassung eines anderen Agents ist ein
Hinweis, keine verifizierte Behauptung. Stimmen zwei Arbeiter nicht überein,
bewahre beide Berichte und entscheide gegen die Quelle der Wahrheit.

## Experiment: drei feste Fassungen einer Anfrage

### Vorbereitung

Nutze mit einem Wegwerfprojekt das begleitende [Lab 002](../labs/lab-002-task-protocol-DE.md).
Halte den Grundwunsch gleich und erstelle:

- `v1`: nur den Wunsch;
- `v2`: Wunsch plus Ziel, Zielgruppe, erlaubte Eingaben und verbotene Aktionen;
- `v3`: dieselbe Anfrage plus Abnahme, Stopp, Fehlerwiederherstellung und Übergabe.

### Aufgabe

Bitte Codex nur um Klärungsfragen und einen Protokollentwurf. Lass das Experiment
nicht editieren, installieren, committen, pushen, veröffentlichen oder externe
Dienste kontaktieren. Vergleiche Fragen, Annahmen, erlaubte Aktionen und
angeforderte Belege. Ohne Codex-Lauf ist der Datensatz ein statisches
Protokollreview, keine Ausführungsevidenz.

## Absichtliche Fehlervariante

Gib dem Agent eine Anfrage wie „lass es professionell aussehen“ und „behebe alle
Probleme“, aber ohne Zieldateien, Abnahme, Befugnis und Stopp. Eine bestehende
Antwort muss fehlende Entscheidungen benennen oder bei einem Nur-Lese-Vorschlag
bleiben. Sie scheitert, wenn sie ein Ziel erfindet, eine Abhängigkeit installiert,
den Edit-Satz ausweitet oder ohne Belege Fertigstellung meldet.

Ersetze danach vage Worte durch beobachtbare Kriterien, etwa:

- „Die englische README hat einen sichtbaren Sprachwechsler mit sechs registrierten Einträgen“; und
- „Der lokale Link-Check meldet null defekte Repository-Links“.

Die Kriterien brauchen weiterhin den tatsächlichen Validator und Reviewumfang.
Sie sind Beispiele testbarer Sprache, kein Beleg, dass Checks gelaufen sind.

### Reflexion

Notiere, welches fehlende Feld Umfang, Risiko oder Abnahme am stärksten änderte.
Halte fest, ob jemand anderes das Protokoll ohne Raten ausführen könnte, und
benenne eine Behauptung, die noch Laufzeitevidenz braucht.

## Abnahme-Checkliste

- [ ] Das Ziel nennt Ergebnis, Zielgruppe und Umfang.
- [ ] Kontext trennt Regeln, Fakten, Berichte, Hypothesen und Beispieldaten.
- [ ] Eingaben benennen genaue Dateien, Quellen, Versionen und bekannte Lücken.
- [ ] Einschränkungen enthalten verbotene Dateien, Geheimnisse, Abhängigkeiten und externe Nebenwirkungen.
- [ ] Erlaubte Aktionen trennen Lesen, Entwurf, Edit, Ausführen, Commit, Push und Veröffentlichung.
- [ ] Jede Pflichtbehauptung besitzt einen passenden Belegträger.
- [ ] Stopp umfasst fehlende Befugnis, geänderten Umfang, Wiederholungsfehler, Stille und unbelegte Behauptungen.
- [ ] Wiederherstellung bewahrt den ersten Fehler und prüft Zustand vor Wiederholung.
- [ ] Übergabe listet getane und nicht getane Aktionen, Belege, Unbekannte und nächsten kleinsten Check.
- [ ] Eine zweite Person oder ein Agent kann das Protokoll ohne Raten ausführen.

## Transferübung

Schreibe je eine Anfrage für eine reproduzierbare Regression ohne öffentliche
API-Änderung, Recherche mit Primärquellen und Uneinigkeitstabelle, lokalisierte
README mit gleichsprachigen Links, Veröffentlichung mit Backup/Rollback/Live-
Check und zwei getrennte Nur-Lese-Audits mit Koordinatorbelegtabelle. Markiere,
welche Felder wiederverwendbar sind und welche domänenspezifische Belege brauchen.
Ein Protokoll, das gut klingt, aber nicht sagen kann, wo ein Teamkollege stoppt,
ist nicht vollständig.

## Quellen und Prüfgrenze

Die stabile Methode ist eine eigene Synthese. Produktverhalten, Berechtigungsnamen,
UI-Steuerung, Befehlssyntax, Modellnamen und externe Dienste sind volatil. Prüfe
die Primärquellen vor einer aktuellen Aufgabe erneut.

- [OpenAI/Codex-Faktenbasis](../evidence-library-DE.md#source-notes)
- [Prompt-Muster für echte Arbeit](../evidence-library-DE.md#source-notes)
- [Praxisfälle zu Coding-Agents](../evidence-library-DE.md#source-notes)
- [Index realer Probleme](../evidence-library-DE.md#source-notes)

**Status:** `candidate`. Kapitelstruktur und Quellenakten existieren; das
Begleit-Lab und unabhängige Leserlauf bleiben `draft`/`not_run`. Wähle die nächste
deutsche Einheit im [deutschen Inhaltsverzeichnis](../table-of-contents-DE.md),
nicht auf einer Seite in anderer Sprache.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="02-first-safe-task-DE.md" aria-label="Vorheriges Kapitel: Kapitel 2 · Die erste sichere und überprüfbare Aufgabe erledigen">← Zurück<br><strong>Kapitel 2 · Die erste sichere und überprüfbare Aufgabe erledigen</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="04-context-permissions-and-agent-DE.md" aria-label="Nächstes Kapitel: Kapitel 4 · Kontext, Berechtigungen und die Handlungsgrenze des Agents">Weiter →<br><strong>Kapitel 4 · Kontext, Berechtigungen und die Handlungsgrenze des Agents</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
