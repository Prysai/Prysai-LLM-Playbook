<!-- content_id: chapter-16-engineering-track | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 16: Engineering-Pfad – von der Idee zu zuverlässiger Software

**Status:** `candidate`. **Experimentstatus:** `draft / not_run`. Dieses Kapitel vermittelt einen Engineering-Ablauf; die Feldberichte sind keine lokalen Reproduktionen und keine Ursachenbestätigung für jede Version.

## Das Problem dieses Kapitels

Engineering-Aufgaben verleiten dazu, zu programmieren, bevor Anforderungen, Architekturentscheidungen, Testdesign, Laufzeitbeobachtung und das Zurückrollen geklärt sind. Ein Patch kann bauen und alle Unit-Tests bestehen, ohne dass Nutzerpfad, Fehlerbehandlung, Abhängigkeitsversionen, Deployment oder Wiederherstellung funktionieren.

> Ein erfolgreicher Build, bestandene Unit- und Integrationstests, korrektes Laufzeitverhalten, Nutzerakzeptanz und Produktionsreife sind verschiedene Behauptungen.

Ein Engineering-Skill führt durch einen Ablauf, in dem jede Phase Eintrittsbedingungen, den kleinsten nützlichen Schritt, Fehlerpfade und einen überprüfbaren Abschluss hat.

## Der Entwicklungsablauf

```text
Problem definieren → spezifizieren und Abnahme festlegen → planen und in Schritte teilen
→ schrittweise implementieren → statische Checks und Tests
→ Laufzeit prüfen → reviewen und vereinfachen
→ veröffentlichen und zurückrollen können → warten und Regressionen prüfen
```

| Phase | Eintrittsbedingung | Minimale Ausgangsevidenz |
|---|---|---|
| Definition | Problem und Umfang | Wiederholbare Problembeschreibung |
| Spezifikation | Grenzen, Ein-/Ausgaben, Fehler | Abnahmekriterien und Nicht-Ziele |
| Planung | Abhängigkeiten und Risiken | Unabhängig prüfbare Schritte |
| Implementierung | Aktueller Schritt und Baseline | Kleiner, erklärbarer Diff |
| Tests | Verhalten und Fehler sind ausführbar | Befehle, Resultate, Fehlererklärung |
| Laufzeit | Startbare Umgebung und repräsentative Daten | Version, Logs, Antwort oder Bildschirm |
| Release | Review und Rollback vorhanden | Release-Aufzeichnung, Monitoring, Rollback-Probe |

## Vor der Implementierung Anforderungen und Abnahme klären

Bei „Export hinzufügen“ fragst du nach Format, Datenbereich, Berechtigung, dem Umgang mit unvollständigen Dateien, Überschreibregel und Abnahmekriterien. Eine Aufgabe nennt Nutzeraktion, Eingabebeschränkungen, Erfolgs- und Fehlerausgabe, Grenzen, Nicht-Ziele, Leistungs-/Sicherheitsvorgaben, beobachtbare Signale und Abnahmemethode. Ein Skill darf eine Entscheidung nicht still durch einen Standard ersetzen.

Arbeite source-driven, doubt-driven und inkrementell. Für APIs und Versionen sind offizielle Dokumentation, Typen, aktueller Code oder reproduzierbares Ergebnis maßgeblich; Blogs und Modellgedächtnis sind Hinweise. Prüfe Netzwerk, Datenbank, Browser, Berechtigungen, Parallelität, Zeitzonen und Deployment, die Typen und Unit-Tests nicht beweisen. Ändere jeweils nur einen erklärbaren Schnitt und bewahre Diff und Rollback-Punkt.

## Laufzeitprüfung, Stopp und Wiederherstellung

Build-Evidenz heißt kompilierbar; Test-Evidenz heißt, dass bestimmte Assertions bestanden. Laufzeit-Evidenz benötigt Startbefehl, Versionen, Umgebungswerte, reale Eingaben, Antwort oder Bildschirm, Logs und Fehlerpfade. Produktionsreife braucht zusätzlich Sicherheit, Performance, Migration, Monitoring, Rollback und Nutzerakzeptanz.

Keine Ausgabe bis zum Timeout, fehlende Testabhängigkeit, unbekannte Worktree-Änderung, echte Credentials, persistente Änderung, Veröffentlichung, Deployment oder Neustart sind Stoppsignale. Erzwinge keinen Reinstall und erweitere keine Rechte, nur um ein Grün zu erhalten; ohne Autorisierung nutze isolierte Umgebung, Test Double oder statischen Check.

## Übung und Grenze

Wähle eine risikoarme Funktion, etwa eine lokale Liste zu deduplizieren und JSON zu schreiben. Bereite normale, leere, doppelte und ungültige Eingaben vor. Vergleiche eine Runde mit nur dem Ziel gegen eine mit Problem, Abnahme, Nicht-Zielen, Schnitten und Testmatrix. Führe in beiden statische Checks, Unit-Tests, lokale Ausführung sowie leere und ungültige Eingaben aus und bewahre Verträge, Diffs, Befehle, Endzustände, Logs, Version, Eingaben und Rollback-Punkte auf.

Simuliere eine Unterbrechung und prüfe Worktree, Diff, Logs und Teststatus, bevor du fortsetzt. Bis reale Aufzeichnungen und unabhängiges Review existieren, bleibt die Übung `candidate / not_run`. Ohne spezifische Autorisierung wird nicht installiert, veröffentlicht, deployt oder neu gestartet.

## Eine Anforderung in eine Engineering-Karte verwandeln

„Export hinzufügen“ ist noch kein Startsignal zum Programmieren. Unbekanntes bleibt eine Frage, die das Modell nicht selbst entscheidet.

```text
Nutzeraktion: In <Seite/Befehl> <klaren Datenbereich> exportieren.
Erfolg: <Format> mit <Feldern> erzeugen und <beobachtbares Ergebnis> zeigen.
Fehler: Was passiert bei Recht, leeren Daten, ungültiger Eingabe und Schreibfehler?
Nicht-Ziele: keine Historienmigration, Veröffentlichung, Rechteänderung oder externer Dienst.
Umfang: Lese-/Schreibpfade, erlaubte Befehle, Netzwerk- und Geheimnisgrenze.
Abnahme: Tests, ein lokaler Lauf, menschlicher Check und jeweiliger Umfang.
Wiederherstellung: Ausgangszustand, temporäre Artefakte, Read-back, Stoppsignal.
```

Erst wenn eine zweite Person Ziel und Nicht-Ziel wiederholen kann, wählst du den ersten Schnitt. Sind Format, Überschreiben oder Berechtigung unbekannt, kann der kleinste Schnitt eine reine Lesevorschau sein, kein stilles Schreiben.

| Evidenz | Erlaubt zu sagen | Erlaubt nicht zu sagen |
|---|---|---|
| Build erfolgreich | Mit dieser Konfiguration kompilier- oder paketierbar | Nutzerpfad oder Deployment korrekt |
| Tests erfolgreich | Diese Assertions gelten in dieser Umgebung | Nicht abgedeckte Fehler, Browser, Rechte oder reale Eingaben |
| Lokaler Lauf | Dieses Input erzeugte dieses beobachtete Resultat | Produktion, alle Konten oder Performance |
| Remote-Read-back | Die benannte Revision/Aufzeichnung ist remote sichtbar | Nutzerakzeptanz, Monitoring, sicheres Rollback |

## Web-Coding: Ein sichtbares Ergebnis im echten Browser prüfen

„Baue eine komplette Website“ vermischt Zielgruppe, Zustände, Quelldateien,
Laufzeit, Browserprüfung und Rollback. Lies zuerst README und `index.html` in
einer wegwerfbaren Kopie von `examples/skill-sandbox/product-context-real-estate`
und ändere nur einen sichtbaren Satz in `index.html`. Füge kein Framework, Bild,
Formular, API oder Netzwerk hinzu. Wenn Python 3 bereits vorhanden ist, starte
aus der Kopie `python -m http.server 4182`, öffne `http://127.0.0.1:4182/` und
prüfe Titel, neuen Satz, erhaltene Überschrift, Links, Konsole und einen 390px-
Viewport.

Bewahre Kopie, erlaubte Datei, URL, beobachteten Zustand, Diff sowie die nicht
geprüften Punkte (Deployment, Accessibility, andere Browser, Nutzerabnahme) auf.
Ein Quelldiff zeigt weder CSS-Laden, relative Pfade, mobile Abschneidung noch
Laufzeitfehler; lokales Rendern ist kein Deployment.

## Kleines Experiment: ein JSON-Vertikalschnitt

Lies in einem wegwerfbaren Verzeichnis eine String-Liste aus `input.json`, entferne Duplikate und schreibe `output.json`. Lesen und Schreiben sind nur dort erlaubt; kein Netzwerk, Installieren, Login, Commit, Push oder Veröffentlichen.

1. Schreibe Karte und Baseline: normal, leer, Duplikate, fehlendes Feld/ungültiges JSON.
2. Implementiere zuerst normal und Duplikate; bewahre Diff und Befehlsausgabe auf.
3. Ergänze leer und ungültig. Ändere jeweils nur einen erklärbaren Punkt und führe deklarierte Checks aus.
4. Lies `output.json` mit einem unabhängigen Befehl; notiere Version, Input, Exit-Status, Roh-Ausgabe und Umfang.
5. Simuliere Unterbrechung: lies vor dem Fortsetzen Status, Diff, Logs und Ausgabe und entscheide über Continue, Wiederherstellung oder Checkpoint.

Fehlt Ausgabe oder Abhängigkeit oder werden PATH-Änderung, Runtime-Reinstall, Log-Upload, Deployment oder Neustart vorgeschlagen, stoppe und nenne fehlende Autorisierung und Wiederherstellung.

## Eigene Abnahme

- [ ] Ich schrieb Nutzeraktion, Erfolg/Fehler, Nicht-Ziele, Umfang, Abnahme und Wiederherstellung auf.
- [ ] Ich bewahre je Schnitt Diff, Befehl, Exit-Status, Input/Output und Unbekanntes auf.
- [ ] Ich verwechsle Build, Test, lokalen Lauf, Remote und Nutzerakzeptanz nicht.
- [ ] Nach Unterbrechung prüfe ich den Zustand vor einem Retry.

## Engineering-Karte: Eine abnahmefähige minimale Änderung

Diese Karte gilt für eine wegwerfbare Kopie eines eigenen oder autorisierten Projekts. Zuerst begrenzt sie das Problem; danach darf jedes LLM beim Lesen, Planen oder Ändern helfen. Sie erlaubt keine Installation, kein Netzwerk, keinen Commit, Push, keine Veröffentlichung und keinen Zugriff auf Produktionsdaten.

```text
Ziel: Welches prüfbare Ergebnis soll eine Person nach [einer konkreten Aktion] sehen?
Umfang: [Pfade] lesen; nach Bestätigung nur [Pfade] ändern; [Pfade] nicht ändern.
Baseline: Aktueller Branch/Commit, vorhandene Änderungen, ursprüngliche Test- oder Befehlsergebnisse.
Quelle der Wahrheit: Welche Spezifikation, welches bestehende Verhalten, welcher Test, welche Schnittstelle oder welches Design besitzt diese Tatsache?
Minimaler Schnitt: Welches einzelne beobachtbare Verhalten ändert sich jetzt?
Abnahme: Was prüfen Dateiumfang, fokussierter Check, Laufzeitbeobachtung und menschliches Lesen jeweils?
Verboten: Installieren, Netzwerk, Löschen, Commit, Push, Veröffentlichung, externe Nachrichten, Geheimnisse lesen.
Stopp: Pausieren, wenn Pfad, Spezifikation, Berechtigung, Wiederherstellung oder Abnahmeregel unklar sind.
Übergabe: Diff, echte Befehle und Ausgaben, bestanden/fehlgeschlagen/nicht ausgeführt, Unbekanntes und kleinste nächste Prüfung.
```

### Vier grüne Signale sind vier verschiedene Schlussfolgerungen

| Signal | Belegt höchstens | Belegt noch nicht |
|---|---|---|
| kleiner Diff | Textänderung im Vergleichsumfang ist klein | Anforderung erfüllt oder Laufzeit korrekt |
| statischer Check bestanden | dieser Check lief im protokollierten Umfeld durch | alle Pfade und Nutzenden funktionieren |
| lokaler Lauf bestanden | ein benanntes Laufszenario war beobachtbar | Deployment, Leistung, Sicherheit oder externe Integration |
| menschliche Abnahme | eine benannte Person sah das Ergebnis nach der Regel | Wartung, Transfer oder breite Übernahme |

Fehlt ein Signal, bleibt `not_run`, `blocked` oder `unknown` in der Übergabe. Erweitere weder Berechtigungen noch ersetze die Umgebung oder schreibe die Spezifikation um, nur um Grün zu erhalten.

## Lernziele

Du zerlegst eine Anforderung in einen kleinen prüfbaren Schnitt und trennst Build, Test, lokalen Lauf, Veröffentlichung und Nutzerannahme als eigene Evidenzbehauptungen.

## Praxisfälle: Ein grüner Test endet nicht bei der Nutzeraufgabe

Ein Patch kann kompilieren und trotzdem leere Eingabe, falschen Pfad oder Wiederherstellung übersehen. Entscheidend ist, ob die Checks die konkrete Nutzerhandlung und ihren Fehlerfall abdecken.

### Vorbereitung

Verwende einen wegwerfbaren lokalen Ordner mit `input.json`, ohne Netzwerk, Zugangsdaten, Remote oder Installation. Halte Ausgangsdatei und erlaubte Schreibpfade fest.

### Aufgabe

Entferne nur Duplikate aus einer String-Liste und schreibe lokal `output.json`. Prüfe normalen, leeren, doppelten und ungültigen Input; ändere pro Schritt nur einen erklärbaren Punkt.

### Belege

Speichere Karte, Diff, Befehle, Exit-Status, Eingabe, unabhängig zurückgelesene Ausgabe und nicht ausgeführte Aktionen. Ein Test beweist ohne diese Aufzeichnung keine Veröffentlichung oder Nutzerannahme.

### Reflexion

Welche Behauptung stützt jeder Check tatsächlich? Welcher Fehlerpfad bleibt unbekannt, und was ist die kleinste nächste Prüfung?

## Transferaufgabe

Übertrage die Karte auf eine Korrektur eines Lernbeispiels, ohne Links, Navigation oder Veröffentlichungsstatus zu verändern. Benenne Nutzerwirkung, Dateien, Check und Rückholweg.

## Abnahme-Checkliste

- [ ] Ich nenne Nutzeraktion, Erfolg, Fehler, Nicht-Ziele, Umfang und Wiederherstellung.
- [ ] Ich kann Diff, Befehl, Ergebnis und nicht geprüfte Behauptung getrennt übergeben.
- [ ] Ich stoppe bei unbekanntem Pfad, Geheimnis, Netzwerk oder persistentem Effekt.

## Quellen und Wartungsgrenze

Der Lebenszyklus und die Evidenztrennung sind stabile Methoden. Frameworks, Befehle, Laufzeiten und Deploymentregeln sind veränderlich und müssen im jeweiligen Projekt geprüft werden.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="15-research-track-DE.md" aria-label="Vorheriges Kapitel: Kapitel 15 · Forschungspfad, von der Frage zu prüfbarem Wissen">← Zurück<br><strong>Kapitel 15 · Forschungspfad, von der Frage zu prüfbarem Wissen</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="17-marketing-track-DE.md" aria-label="Nächstes Kapitel: Kapitel 17 · Marketing-Pfad, vom Produktverständnis zu Wachstumsexperimenten">Weiter →<br><strong>Kapitel 17 · Marketing-Pfad, vom Produktverständnis zu Wachstumsexperimenten</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
