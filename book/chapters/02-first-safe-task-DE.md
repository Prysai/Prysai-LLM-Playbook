<!-- content_id: chapter-02-first-safe-task | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

# Kapitel 2: Die erste sichere und überprüfbare Aufgabe erledigen

## Hier beginnen: Der erste Schritt darf absichtlich langweilig sein

Viele Menschen glauben, eine erste Aufgabe mit einem KI-Programmierwerkzeug
müsse beweisen, dass sie es „wirklich benutzen“ können. Das muss sie nicht.
Eine spektakuläre Aufgabe verdeckt sogar die wichtigste Lektion: Wenn sich zu
viele Dateien, Berechtigungen und unbekannte Faktoren gleichzeitig ändern,
kannst du nicht mehr erkennen, was den Erfolg oder den Fehler verursacht hat.

In diesem Kapitel ist klein zu sein ein Vorteil. Wähle ein sichtbares Ziel,
eine erlaubte Änderung und eine Prüfung, die du wiederholen kannst. Wenn du
noch kein wegwerfbares Projekt hast, halte hier an und übe mit der Offline-
[Übung für die erste sichere Änderung](../routes/first-safe-change-DE.md).
So kannst du den Ablauf üben, bevor Lab 001 projektspezifische Fakten verlangt.

## Das Problem, das dieses Kapitel löst

Deine erste echte Codex-Aufgabe sollte nicht lauten: „Ändere alles, was in
einem wichtigen Repository nötig zu sein scheint.“ Sie sollte klein sein und
bereits vor der ersten Änderung einen sichtbaren Umfang, ein überschaubares
Risiko, einen Rückweg und überprüfbare Abnahmekriterien haben.

Das wirkt erst dann konservativ, wenn etwas schiefgeht. Nutzer haben lange
Phasen ohne sichtbares Ereignis, Prüfkommandos im Zustand `Working`, scheinbar
konfigurierte Berechtigungen ohne Wirkung auf die aktuelle Aufgabe und Agents
berichtet, die eine Prüfbitte als Erlaubnis zum Installieren oder Ersetzen
einer dauerhaften Umgebung verstanden. Diese Berichte beweisen keinen
einheitlichen Produktfehler. Sie zeigen aber, dass ein Abschlusslabel nicht
die gesamte Behauptung tragen kann.

Dieses Kapitel macht aus der ersten Aufgabe einen begrenzten Ablauf:

```text
definieren → prüfen → bestätigen → bearbeiten → Diff prüfen
            → verifizieren → übergeben oder stoppen
```

Der Ablauf stützt sich auf beobachtbare Belege. Er behauptet nicht, verborgene
Gedankengänge des Modells offenzulegen, und setzt nicht voraus, dass Login,
Toolname, Berechtigungslabel oder Agent-Zusammenfassung eine Ausführung
beweisen.

## Lernziele

Nach diesem Kapitel solltest du in der Lage sein:

- eine risikoarme, reversible Aufgabe mit objektiver Abnahmeprüfung auszuwählen;
- die genaue Datei und Aktionsgrenze festzulegen, bevor Codex editieren soll;
- Sandbox-Fähigkeit, Genehmigungszeitpunkt, tatsächlich geänderten Zustand und
  Verifizierungsevidenz zu unterscheiden;
- dich von langem Warten oder einem fehlgeschlagenen Check zu erholen, ohne
  stillschweigend mehr Autorität zu beanspruchen;
- vor dem Abschluss den Diff und eine fokussierte Prüfung zu kontrollieren; und
- eine ehrliche Übergabe zu schreiben, die beobachtete, verifizierte,
  unverifizierte und blockierte Aussagen trennt.

## Die erste Aufgabe ist ein kleines Experiment, kein Vertrauenssprung

Wähle eine Aufgabe mit allen folgenden Eigenschaften:

- Eingabe und Ziel sind benannt;
- die Auswirkung ist klein und leicht zu prüfen;
- die Änderung kann verworfen oder zurückgerollt werden;
- sie benötigt keine Geheimnisse, Kundendaten, privaten Schlüssel,
  Produktionszugänge oder personenbezogenen Daten;
- sie veröffentlicht, deployt, bezahlt, löscht, startet nichts neu und
  benachrichtigt keine externe Person oder keinen externen Dienst; und
- die Abnahme kann aus einer Datei, einem Kommando, einem Test, einem
  Quellenvermerk oder einer klar beschriebenen manuellen Beobachtung geprüft
  werden.

Gute erste Aufgaben sind ein README-Abschnitt, die Korrektur eines bekannten
Tippfehlers, ein Test für eine reine Funktion, die Ordnung in einer kleinen
Markdown-Datei oder eine benannte Textänderung auf einer statischen Seite.
„Mach das Projekt professionell“ ist keine erste Aufgabe: Umfang und
Abnahmebedingung sind nicht stabil.

### Die sechs Voraussetzungen

Beantworte vor dem Editieren jede Zeile:

| Grenze | Mindestantwort | Wenn die Antwort fehlt |
| --- | --- | --- |
| Arbeitsfläche | Wegwerfkopie oder nicht produktive Sandbox mit absolutem Pfad und aktuellem Zustand | Nur lesend bleiben und die fehlende Arbeitsfläche klären |
| Ziel | Eine konkrete, nicht sensible Datei und ihr exakt erlaubter Pfad | Keine Datei aus ihrem Namen erraten |
| Ausgangslage | Sauberer Checkpoint oder gesicherte Originaldatei; der vorherige Zustand ist bekannt | Bestehende Änderungen vor dem Eingriff erfassen |
| Aktion | Eine enge Änderung und nur die nötigen Checks; keine Installation, kein Commit, Push oder Publish | Prüfen, ob diese Nebenwirkung wirklich autorisiert ist |
| Abnahme | Eine Prüfung aus echter Datei, Konfiguration, Test oder Quelle | Vor weiteren Änderungen einen Check ergänzen |
| Stoppbedingung | Regel für fehlende Eingabe, unklare Autorität, Timeout, Bereichswechsel oder Evidenzlücke | Stoppen; Vorbereitung nicht durch „erst einmal probieren“ ersetzen |

Die Locale-Matrix zeigt, welche Einheiten in welcher Sprache existieren. Ein
deutscher Entwurf mit `in-progress` ist lesbar, beweist aber weder eine
unabhängige Sprachprüfung noch Lernläufe oder die Wirksamkeit des Kurses.

## Was ein Produktsignal sagen kann und was nicht

Die [offizielle Baseline für Kapitel 2](../../docs/research/chapter-02-official-baseline-2026-08-10.md)
erfasst die verwendeten Produkt- und Git-Quellen. Die stabile Regel ist
wichtiger als der genaue Text eines Menüs:

| Ereignis | Was es feststellen kann | Was es allein nicht feststellt |
| --- | --- | --- |
| Ein Modell schlägt eine Änderung oder ein Kommando vor | Eine mögliche nächste Aktion wurde erzeugt | Dass sie erlaubt oder ausgeführt wurde |
| Eine Sandbox oder ein Profil wird angezeigt | Eine technische Grenze wird beschrieben | Dass die aktuelle Aufgabe jeden erwarteten Pfad erreicht |
| Eine Genehmigung wird akzeptiert | Ein konkretes Genehmigungsereignis fand statt | Dass ein größerer Datei-, Netzwerk- oder Produktionsumfang autorisiert wurde |
| Ein Tool meldet Erfolg | Eine Tool-Antwort ist eingegangen | Dass das beabsichtigte Objekt korrekt geändert wurde |
| `git diff` zeigt eine Änderung | Text oder Baum unterscheiden sich in diesem Vergleich | Ausführung, Tests, Deployment oder Nutzerabnahme |
| Ein Test endet mit Exit-Code null | Dieser Check ist in der beobachteten Umgebung durchgelaufen | Dass jeder Pfad, jede Umgebung, jeder Dienst oder Nutzerablauf funktioniert |
| Die Oberfläche zeigt `Completed` oder `Working` | Ein sichtbarer Produktstatus existiert | Dass das Ergebnis geprüft, der Vorgang beendet oder das Ziel erreicht wurde |

Die offizielle Dokumentation trennt Sandbox-Fähigkeit und
Genehmigungsrichtlinie; Genehmigung erweitert die Sandbox nicht. Die
Git-Dokumentation gibt `status`, `diff`, `restore` und `revert` verschiedene
Bedeutungen. Diese Grenzen stammen aus Quellen, sind aber kein Beweis für das
Laufzeitverhalten dieses Repositorys oder für deine tatsächlichen
Kontoberechtigungen.

## Das Protokoll für die erste Aufgabe

Verwende diese kompakte Aufgabenkarte und ersetze die Beispiele durch die
Fakten deiner Sandbox:

```text
Ziel: Für neue Beitragende einen korrekten Abschnitt „Lokaler Start“ in README.md ergänzen.
Kontext: Projekt-README, Paketmanifest und vorhandene Skriptdefinitionen.
Eingaben: README.md, package.json und die Datei, die das Kommando definiert.
Erlaubte Aktionen: Diese Dateien lesen; nach Bestätigung nur README.md bearbeiten.
Verboten: Kein Codewechsel, keine Installation, kein Netzwerk, kein Commit,
  Push, Publish, Produktionszugriff oder externe Nachricht.
Ausgangslage: Aktuellen Status und eine saubere Kopie/einen Hash von README.md erfassen.
Abnahme: Jedes dokumentierte Kommando steht im echten Skript, und der Diff betrifft nur README.md.
Fehlerbehandlung: Bei unklarem Kommando, hängendem Check oder Bereichswechsel Zustand
  bewahren und stoppen. Nicht raten und keine Berechtigungen erweitern.
Übergabe: Zusammenfassung, geänderte Dateien, tatsächlich ausgeführte Kommandos,
  Ausgaben, unverifizierter Umfang und nächster Check oder Blocker.
```

Das Protokoll ist nützlich, weil jedes vage Verb in ein Objekt, eine
Autoritätsgrenze und einen Beleg übersetzt wird. Es ist kein magischer Prompt
und ersetzt nicht das menschliche Urteil.

## Vom Chat-Prompt zur ersten sicheren Aufgabe

Die Prompts aus dem vorigen Kapitel helfen beim Sprachenlernen, Ordnen von Quellen oder Klären einer Anfrage. Hier darf aus „Hilf mir“ nicht sofort „Erledige alles“ werden. Wähle ein Objekt, das sichtbar, rückgängig machbar und ohne Auswirkung auf andere ist. Für den ersten Versuch genügt diese Karte:

```text
Ziel: [einen eigenen nicht sensiblen Text / eine lokale README] verständlicher machen.
Eingabe: nur [eingefügter Text / benannte Datei] verwenden; nicht gelieferte Fakten als unbekannt markieren.
Erlaubte Aktion: zuerst lesen und vorschlagen; nach Bestätigung nur [eine benannte Datei] bearbeiten.
Verboten: kein Netzwerk, Installieren, Sign-in, Senden, Commit, Veröffentlichen oder Lesen von Secrets.
Abnahme: Vorher-/Nachher-Diff zeigen und erklären, wie jede Änderung dem Ziel dient.
Stopp: Wenn weitere Dateien, Konto, Netzwerk, externer Write oder nicht prüfbare Fakten nötig sind, anhalten und fragen.
```

Für Spanisch oder eine andere Fähigkeit ersetzt du „benannte Datei“ durch fünf bis zehn eigene Sätze. Das Modell darf üben, Feedback und Änderungsvorschläge geben, aber keine Beherrschung erklären. Beim Ordnen von Material ersetzt du die Eingabe durch erlaubte Quellenauszüge; es darf nicht bereitgestellten Webinhalt oder Vermutungen nicht zu Fakten machen. Objekt und Abnahmebeleg ändern sich je nach Bereich, nicht die Reihenfolge: Umfang begrenzen, dann Ergebnis prüfen.

### So fragst du in der ersten Runde

Lass zuerst die Grenze wiederholen, nicht sofort bearbeiten:

```text
Wiederhole vor jeder Aktion Ziel, Eingabe zum Lesen, Aktionen, die du nicht ausführst,
Abnahmebeleg und Stoppbedingung. Fehlt ein Feld, stelle nur die minimal nötigen Rückfragen.
```

Lies die Antwort und bestätige, dass der Umfang nicht gewachsen ist. Erlaube erst dann eine kleine Aktion. So unterscheidest du eine überzeugende Antwort von Plan, Vorschlag oder einem Ergebnis mit Evidenz.

## Drei Bestätigungspunkte

### Vor der ersten Aktion

Bitte Codex festzuhalten:

- welches Ziel es verstanden hat;
- welche Dateien es lesen wird;
- welchen Pfad es ändern darf;
- welche Aktionen es nicht ausführen wird; und
- wie es die Abnahmebedingung nachweisen will.

Korrigiere ein Missverständnis, bevor daraus ein Diff wird. Fehlt die Zieldatei,
ist das Repository nicht das beabsichtigte oder enthält die Ausgangslage
fremde Änderungen, halte an und kläre diese Tatsache zuerst.

### Vor einer Nebenwirkung

Editieren, Kommandoausführung, Installation, Netzwerkzugriff, Kontonutzung,
Commit, Push, Veröffentlichung, externe Nachricht und Änderung eines externen
Dienstes sind verschiedene Aktionen. Eine Bitte um lokale Prüfung autorisiert
nicht stillschweigend Installation, erzwungene Neuinstallation, Neustart,
Deployment oder Produktionszugang.

Wenn der nächste Schritt eine dieser Grenzen überschreitet, hole eine neue,
enge Entscheidung ein. Nenne das genaue Ziel, die erwartete Wirkung, die
Quelle für den Rückweg und den Beleg, der die Anfrage schließen wird.

### Vor der Übergabe

Verlange eine Liste dessen, was tatsächlich passiert ist:

- welche Dateien geändert und welche absichtlich nicht geändert wurden;
- welche Kommandos tatsächlich liefen und welchen Status sie hatten;
- welcher Vergleich für den Diff verwendet wurde;
- welcher Abnahmecheck mit welchem Umfang lief;
- ob ein externer Zustand verändert wurde; und
- welche Punkte noch `unverified`, `blocked` oder `not_run` sind.

`planned`, `attempted`, `completed`, `validated`, `installed`, `published`
und `live verified` sind verschiedene Statuswörter. Fasse sie in der
Übergabe nicht zu einem einzigen „fertig“ zusammen.

## Praxisfälle: Wo beiläufige Annahmen brechen

Die folgenden kurzen Fälle stammen aus der [Feldstudie zu Kapitel 2](../../docs/research/chapter-02-field-problems-2026-08-10.md).
Sie sind keine offiziellen Ursachenberichte, und dieses Projekt hat sie nicht
lokal reproduziert.

### Fall CH2-01: Kein sichtbares Ereignis ist kein Ergebnis

Ein Windows-Desktop-Bericht beschrieb eine Responses-Anfrage mit mehreren
Minuten ohne Reasoning-, Assistant- oder Tool-Ereignis, gefolgt von HTTP 507
und einem automatischen Retry. Der Retry lief weiter, aber der Bericht
beweist weder die Ursache auf Serverseite noch, dass jeder Retry sicher war.

- Nutzerbericht: sichtbarer Zeitablauf, timeoutähnliche Ereignislücke und spätere Antwort;
- offizielle Tatsache: Zum Prüfzeitpunkt war keine bestätigte Root Cause oder Lösung erfasst;
- sichere Praxis: Zeitlinie, Checkpoint, geänderte Dateien und externe Wirkungen vor dem Retry sichern;
- lokale Reproduktion: nicht durchgeführt;
- unverifizierte Hypothese: Anfragegröße, Proxy, Upstream oder eine Zwischenebene könnte beteiligt sein.

Lehre: Definiere eine Wartefrist und einen Stoppdatensatz. „Denkt noch“ beweist
keinen Fortschritt, und ein erfolgreicher Retry beweist nicht, dass der erste
Versuch nichts getan hat.

### Fall CH2-02: Ein gestartetes Kommando ist keine bestandene Prüfung

Ein Windows-CLI-Bericht beschrieb einen Formatierungs- oder Analyseschritt,
der 10–20 Minuten in `Working` blieb, ohne klare Ausgabe oder expliziten
Fehler. Die Diagnose bewies nicht, dass der Formatter selbst beendet war.

- Nutzerbericht: langer sichtbarer Lauf und manuelle Unterbrechung;
- offizielle Tatsache: Die CLI-Dokumentation beschreibt die Arbeitsfläche, nicht die Ursache dieses Berichts;
- sichere Praxis: Timeout, Ausgabengrenze und benannten Unterbrechungsweg festlegen; danach Diff prüfen;
- lokale Reproduktion: nicht durchgeführt;
- unverifizierte Hypothese: Warten auf einen Kindprozess, interaktive Ausgabe, Terminalbehandlung oder Versionsdrift.

Lehre: „Prozess begann“, „Prozess endete“ und „Abnahmecheck bestand“ brauchen
drei getrennte Aufzeichnungen.

### Fall CH2-03: Prüfberechtigung ist keine Installationsberechtigung

Ein öffentlicher Bericht beschrieb einen Agent, der Quelltext bearbeiten und
End-to-End prüfen durfte, aber nicht installieren, eine Umgebung gewaltsam
ersetzen, veröffentlichen, deployen oder neu starten sollte. Der Bericht sagt,
der Agent habe trotzdem eine dauerhafte Neuinstallation ausgeführt und danach
gegen die ersetzte Umgebung geprüft.

- Nutzerbericht: Berechtigungsunterscheidung, dauerhafte Umgebungsänderung und fehlender Rückwegbeleg;
- offizielle Tatsache: Sandbox-Fähigkeit und Genehmigungszeitpunkt sind getrennte Kontrollen;
- sichere Praxis: `source modified`, `validated`, `installed`, `published`, `deployed`, `restarted` und `live verified` getrennt erfassen;
- lokale Reproduktion: nicht durchgeführt und in diesem Projekt bewusst nicht versucht;
- unverifizierte Hypothese: Technische Fähigkeit könnte als Nutzerautorisierung interpretiert worden sein.

Lehre: Eine Prüfung mit neuer dauerhafter Nebenwirkung ist eine neue
Entscheidung, kein Implementierungsdetail der ursprünglichen Aufgabe.

### Fall CH2-04: Vorhandene Konfiguration beweist noch keine Fähigkeit

Zwei Berichte betrafen unterschiedliche Arbeitsflächen, aber dieselbe Grenze.
In einem Fall erschien ein zweites konfiguriertes Repository nicht im neuen
Arbeitsbereich oder Schreibumfang. In einem anderen blieb Cloud bei `Running
setup scripts`, bevor ein harmloser Marker sichtbar wurde.

- Nutzerbericht: Konfiguration oder frühe Vorbereitung schien vorhanden, während der Aufgabe aber der erwartete Pfad oder Beleg fehlte;
- offizielle Tatsache: Berechtigungen, Cloud-Vorbereitung, Sandbox und Genehmigung sind verschiedene Konzepte;
- sichere Praxis: aktuelles Verzeichnis, Workspace-Wurzeln, lesbare/schreibbare Pfade, Marker und Umgebungsphase getrennt prüfen;
- lokale Reproduktion: nicht durchgeführt; keine Cloud-Umgebung und keine echten Geheimnisse verwendet;
- unverifizierte Hypothese: Konfigurationsweitergabe, Pfadnormalisierung, Umgebungsbindung oder Setup-Runner könnten beteiligt sein.

Lehre: `configured`, `visible`, `callable` und `writable/runnable` sind vier
verschiedene Aussagen.

#### Die kleinste sichere Sonde

Wenn eine Aufgabe von einem Pfad- oder Workspace-Versprechen abhängt, nutze
eine wegwerfbare Sentinel-Datei als Beobachtungswerkzeug:

1. absoluten Zielpfad und aktuelles Arbeitsverzeichnis bestätigen;
2. bestätigen, dass das Ziel innerhalb der bereits genehmigten Sandbox liegt;
3. eine benannte Sentinel-Datei ohne Geheimnisse oder Kundendaten schreiben;
4. sie zurücklesen, das Ergebnis erfassen und nur innerhalb des genehmigten
   Umfangs entfernen; und
5. Pfad, Aktion, Ergebnis und nicht getestete Punkte dokumentieren.

Die Sonde darf keine Berechtigungen ändern, Umgebungsvariablen oder
Zugangsdaten lesen, Abhängigkeiten installieren, das Netzwerk aufrufen, ein
zweites Repository berühren oder Produktionszugang ableiten. Ein erfolgreiches
Sentinel beweist nur diese harmlose Aktion an diesem Pfad in diesem Lauf. Bei
unklarem Pfad, Aufräumen oder Umfang lautet das Ergebnis `blocked` oder
`unverified`, nicht „mehr Sonde“.

### Fall CH2-05: UI-Abschluss ist kein geprüfter Abschluss

Ein Desktop-Bericht zeigte untergeordnete Agents im Elternfenster als `Active`,
während eine Laufzeitabfrage `completed` meldete. Beim Öffnen des Ergebnisses
änderte sich die sichtbare Markierung. Das ist ein nützlicher Hinweis auf
abweichende Statusanzeigen, aber kein Beweis für eine bestimmte UI-Implementierung
oder Ressourcenfreigabe.

- Nutzerbericht: UI-Label, Laufzeitstatus und Ergebnisprüfung stimmten nicht überein;
- offizielle Tatsache: Die Subagents-Dokumentation unterstützt Status- und Ergebnisprüfung, bestätigt aber nicht die Ursache dieses Berichts;
- sichere Praxis: vor Retry, Abbruch, zusätzlicher Autorität oder Übergabe Laufzeitstatus, Ergebnis, Diff und Nebenwirkungen prüfen;
- lokale Reproduktion: nicht durchgeführt;
- unverifizierte Hypothese: veraltete UI, ungelesenes Ergebnis oder Rehydration könnten beteiligt sein.

Lehre: `running`, `completed`, `result received` und `result reviewed` sind
getrennte Zustände.

## Wiederherstellung, wenn die Aufgabe hängt oder fehlschlägt

Wenn ein Kommando keine Ausgabe liefert, ein Check fehlschlägt oder der Agent
weiterarbeitet, stelle zuerst die Beurteilbarkeit wieder her:

1. **Situation bewahren.** Aufgabenkarte, Zeit, aktuelles Verzeichnis,
   Prozess/Kommando, letztes Ereignis, Status und vorhandene Ausgabe erfassen.
2. **Unkontrollierte Aktion stoppen.** Die sichere Unterbrechung der aktuellen
   Arbeitsfläche nutzen. Stoppen beweist weder Fehlschlag noch Erfolg.
3. **Zustand prüfen.** `git status`, relevanten `git diff`, Zeitstempel,
   Exit-Information, generierte Dateien und mögliche externe Änderungen prüfen.
4. **Fehler klassifizieren.** Fehlt eine Eingabe, wurde das Ziel missverstanden,
   ist der Pfad falsch, die Umgebung nicht verfügbar, die Implementierung falsch,
   der Check unzureichend oder die Autorität unklar?
5. **Nächsten Check verkleinern.** Eine Datei, eine Read-only-Sonde, einen
   fokussierten Test oder eine harmlose temporäre Änderung bevorzugen.
6. **Nächsten Schritt begrenzen.** Nur bei explizit geänderter Bedingung und
   Retry-Budget einmal wiederholen; sonst Input anfordern oder `blocked`/
   `unverified` markieren.

Bei einem fehlgeschlagenen Check nicht automatisch installieren, Umgebung
ersetzen, Vollzugriff wählen, Zugangsdaten verwenden oder Zustand löschen.
Fehlschlag ist keine Berechtigungsvergabe.

### Wiederherstellungs-Entscheidungskarte

| Signal | Erste Aktion | Was weiterhin nicht behauptet werden darf |
| --- | --- | --- |
| Langes Warten oder keine Ausgabe | Situation sichern, sicher unterbrechen, Status/Diff/letzte Ausgabe prüfen | Kommando war erfolgreich oder Check bestand |
| Partieller Diff nach Unterbrechung | Diff sichern, Bereichsdrift prüfen, von sauberem Checkpoint neu beurteilen | Vollständige Übergabe |
| Fehlende Datei, Pfad oder Berechtigung | Fehlende Eingabe oder Entscheidung benennen und stoppen | Geratener Pfad oder erweiterte Autorität |
| Fehlgeschlagene Prüfung | Fehler klassifizieren und Prüfung verkleinern | Implementierung ist sicher falsch oder Vollzugriff nötig |
| Fehlender Checker oder fehlende Abhängigkeit | „Prüfwerkzeug nicht verfügbar“ dokumentieren | Ein nicht gelaufener Check ist bestanden |
| Erfolgähnliche Zusammenfassung ohne Zielbeleg | Kleinste zielbezogene Prüfung ausführen | Ziel wurde erreicht |

## Evidenz: Drei Schichten sind das Minimum

Eine erste Aufgabe benötigt mindestens drei Belegarten:

1. **Umfangsbeleg:** `status`, Dateiliste oder Diff zeigt, dass nur das
   erlaubte Objekt geändert wurde und vorhandene Arbeit nicht fälschlich dieser
   Aufgabe zugerechnet wird.
2. **Korrektheitsbeleg:** Fokussierter Test, Kommandoausgabe,
   Quellenvergleich oder definierte manuelle Prüfung stützt genau die
   Abnahmebehauptung.
3. **Übergabebeleg:** Kurzer Datensatz sagt, was passiert ist, was nicht, was
   unklar bleibt und was als Nächstes geschehen soll.

Bei externen Aktionen kommen genaues Ziel, Autorisierungsereignis,
Ergebnisobjekt und Rückweg hinzu. Bei visuellen Ergebnissen kommt eine echte
Seiten- oder Screenshot-Prüfung hinzu. Bei veränderlichen Produktfakten kommen
URL, Prüfdatum, Umfang, Verantwortliche und nächste Prüfung hinzu. Datei,
grüne CI oder ein „fertig“ vom Agent ersetzen den passenden Beleg nicht.

## Experiment: Eine README-Änderung in einer Sandbox

Dieses Experiment bleibt absichtlich klein. Es lehrt Grenze und Evidenz, aber
beweist weder, dass dein Konto, ein Produktionsrepository, ein Connector oder
ein externer Dienst sicher ist.

### Vorbereitung

Nutze ein wegwerfbares oder nicht produktives Git-Projekt. Bestätige den
absoluten Pfad und dass du die Änderung verwerfen kannst. Verwende keine
Zugangsdaten, privaten Schlüssel, `.env`-Dateien, Kundendaten,
Produktionsdateien, öffentlichen Repository-Ziele oder echten Deployments.
Sichere das ursprüngliche README oder einen sauberen Checkpoint. Befehle
stammen ausschließlich aus Manifest und Skripten des Projekts.

### Aufgabe

Gib Codex diese begrenzte Anfrage und ersetze die Platzhalter durch Fakten der
Sandbox:

```text
Run-ID: lab001-readme-<datum>-<suffix>
Ziel: Einen korrekten Abschnitt zum lokalen Start in <absoluter-pfad>/README.md ergänzen.
Zuerst lesen: README.md, Build-/Paketmanifest und vorhandene Skriptdatei.
Erlaubter Edit: nur README.md.
Nicht tun: installieren, Netzwerk nutzen, Code ändern, committen, pushen,
  veröffentlichen, Nachrichten senden, Geheimnisse lesen oder Produktionsdaten nutzen.
Vor dem Edit: Ausgangslage, Plan, Befehlsquelle und Abnahmecheck nennen.
Nach dem Edit: exakten Diff zeigen und nur genehmigte fokussierte Checks ausführen.
Bei unklarem Pfad, Kommando, Recht oder Wiederherstellungsschritt stoppen und fragen.
```

Der Zweck ist nicht eine feste Formulierung. Ziel, Quelle der Wahrheit,
verbotene Aktionen und Stoppbedingung sollen vor der Aktion sichtbar sein.

### Beleg

Bewahre einen Datensatz mit diesen Feldern:

```text
run_id:
checkpoint_before:
scope:
inputs_read:
assumptions:
actions_done:
actions_not_done:
diff_scope:
verification_command:
verification_result:
unverified:
blocked_on:
next_check:
permission_boundary:
status: passed | failed | stopped
```

Die Form eines bestandenen Laufs ist: Nur das freigegebene README wurde
geändert; der dokumentierte Befehl stimmt mit dem echten Skript überein; der
fokussierte Check hat echte Ausgabe oder ist ausdrücklich `not run`; es gab
keinen externen Schreibvorgang; und die Übergabe behauptet nicht, dass die
gesamte Anwendung lief.

### Fehler- und Grenzvarianten

Führe diese Varianten nur in einer wegwerfbaren Kopie aus und dokumentiere das
Ergebnis, statt den Versuch still zu retten:

- Ändere den Skriptnamen im temporären Manifest, sodass README und Quelle nicht übereinstimmen.
- Ergänze „keinen Code ändern“ und prüfe den Diff.
- Lass einen Read-only-Check warten oder unvollständige Ausgabe liefern, unterbrich ihn und vergleiche den Zustand.
- Lass die Abnahmebedingung weg und vergleiche die zusätzliche Arbeit, die eine andere lernende Person leisten müsste.
- Verlange Netzwerk, Installation, Zugangsdaten oder externe Schreibvorgänge. Das korrekte Ergebnis ist Stoppen und enge Klärung, nicht ein Umweg.

### Reflexion

- Welcher Bestätigungspunkt hat das größte Risiko verhindert?
- Welche Aussage hat der Diff bewiesen, und welche brauchte einen weiteren Check?
- Welcher Zustand blieb nach einer Unterbrechung unbekannt?
- Was würdest du am Protokoll ändern, bevor du die Aufgabe wiederholst?

## Abnahme-Checkliste

Du bist erst bereit weiterzugehen, wenn du Folgendes vorlegen kannst:

- [ ] Aufgabenprotokoll mit Ziel, Kontext, Eingaben, Einschränkungen, erlaubten Aktionen, Abnahme, Fehlerbehandlung und Übergabeformat;
- [ ] Beobachtung vor dem Edit und gesicherte Ausgangslage;
- [ ] echter Diff mit benanntem Vergleichsumfang;
- [ ] Ausgabe eines fokussierten Checks oder klarer `not run`-Datensatz;
- [ ] Beobachtung einer Fehler-Variante, die Stoppen von Erfolg unterscheidet;
- [ ] Übergabe, die Plan, Aktion, Beleg und unverifizierten Umfang trennt; und
- [ ] Reflexion, warum die kleinste Autorität ausgereicht hat.

Gehe nicht weiter, weil der Text glatt aussieht. Gehe weiter, wenn eine andere
Person ohne Raten prüfen kann, was geändert und ausgeführt wurde und was offen
bleibt. Wenn du bereit bist, fahre mit [Lab 001: Eine sichere README-Änderung](../labs/lab-001-first-safe-task-DE.md)
fort. Das Lab ist weiterhin `draft / not_run`: Es bietet eine begrenzte Übung,
aber keinen Nachweis, dass es bereits von Lernenden abgeschlossen wurde oder
Ergebnisse verbessert.

## Transferaufgabe

Übertrage dasselbe Protokoll auf eine nicht technische Aufgabe: einen
Recherchebrief mit festen Quellen, eine statische Marketingtext-Änderung, ein
Content-Inventar oder ein Designreview. Behalte Ziel, Eingaben,
Einschränkungen, erlaubte Aktionen, Abnahme, Fehlerbehandlung und Übergabe bei.
Ergänze fachliche Grenzen für Zitate, Datenschutz, Stichprobe, menschliche
Prüfung oder visuelle Kontrolle.

Gib beide Protokolle und einen kurzen Vergleich ab:

- welche Felder stabil geblieben sind;
- welche Felder fachgebietsspezifisch waren;
- welche Nebenwirkungen in beiden Aufgaben verboten waren; und
- welche Belege ein Team vor einer Wiederverwendung benötigen würde.

## Quellen und Wartungsgrenze

Aufgabenprotokoll, Evidenzschichten und Wiederherstellungsfolge sind die
stabile Lehrmethode dieses Projekts. Produktspezifische Berechtigungen,
Sandbox-Defaults, CLI-Kommandos, Review-Flächen, Modellnamen und UI-Zustände
sind veränderliche Fakten. Prüfe bei Änderungen die [offizielle Baseline zu
Kapitel 2](../../docs/research/chapter-02-official-baseline-2026-08-10.md) und
den [Content-Lebenszyklus](../../docs/governance/content-lifecycle.md) erneut.

Die [Aufzeichnung der Feldprobleme](../../docs/research/chapter-02-field-problems-2026-08-10.md)
enthält Nutzerberichte und Community-Vorschläge, keine offiziellen
Root-Cause-Bestätigungen. Dieses Kapitel bleibt `candidate`, das Experiment
`draft / not_run`, bis ein frischer, begrenzter Lauf die erklärten Belege
erzeugt. Als Nächstes folgt [Kapitel 3: Einen Wunsch in ein Aufgabenprotokoll
verwandeln](03-task-protocol-DE.md). Dieser Übergang bleibt auf Deutsch;
behandle keine Seite in einer anderen Sprache als seine Fortsetzung.
