<!-- content_id: chapter-16-engineering-track | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 16: Engineering-Pfad, von der Idee zu zuverlässiger Software

**Status:** `candidate`. **Experimentstatus:** `draft / not_run`. Dieses Kapitel lehrt einen Engineering-Lebenszyklus; Feldberichte sind keine lokalen Reproduktionen oder Ursachenbestätigungen für jede Version.

## Das Problem

Engineering-Aufgaben verleiten dazu, vor klaren Anforderungen, Architekturentscheidungen, Testdesign, Laufzeitbeobachtung und Rollback zu programmieren. Ein Patch kann bauen und alle Unit-Tests bestehen, ohne dass der Nutzerpfad, Fehlerbehandlung, Abhängigkeitsversionen, Deployment oder Wiederherstellung funktionieren.

> Erfolgreicher Build, bestandene Unit-Tests, bestandene Integrationstests, korrektes Laufzeitverhalten, Nutzerakzeptanz und Produktionsreife sind verschiedene Behauptungen.

Ein Engineering-Skill ist ein evidenztragender Lebenszyklus. Jede Phase hat Eintrittsbedingungen, den kleinsten nützlichen Schnitt, Fehlerpfade und Ausgangsevidenz.

## Der Engineering-Lebenszyklus

```text
Problem definieren → spezifizieren und abnehmen → planen und schneiden
→ schrittweise implementieren → statische Checks und Tests
→ Laufzeit prüfen → reviewen und vereinfachen
→ releasen und zurückrollen → warten und Regressionen prüfen
```

| Phase | Eintrittsbedingung | Minimale Ausgangsevidenz |
|---|---|---|
| Definition | Problem und Umfang | Wiederholbare Problembeschreibung |
| Spezifikation | Grenzen, Ein-/Ausgaben, Fehler | Abnahme und Nicht-Ziele |
| Planung | Abhängigkeiten und Risiken | Unabhängig prüfbare Schnitte |
| Implementierung | Aktueller Schnitt und Baseline | Kleiner, erklärbarer Diff |
| Tests | Verhalten und Fehler sind ausführbar | Befehle, Resultate, Fehlererklärung |
| Laufzeit | Startbare Umgebung und repräsentative Daten | Version, Logs, Antwort oder Bildschirm |
| Release | Review und Rollback vorhanden | Release-Aufzeichnung, Monitoring, Rollback-Probe |

## Vor der Implementierung spezifizieren

Bei „Export hinzufügen“ fragst du nach Format, Datenbereich, Berechtigung, Teil-Dateien, Überschreibregel und finaler Abnahme. Eine Aufgabe nennt Nutzeraktion, Eingabebeschränkungen, Erfolgs- und Fehlerausgabe, Grenzen, Nicht-Ziele, Leistungs-/Sicherheitsvorgaben, beobachtbare Signale und Abnahmemethode. Ein Skill darf eine Entscheidung nicht still durch einen Standard ersetzen.

Arbeite source-driven, doubt-driven und inkrementell. Für APIs und Versionen sind offizielle Dokumentation, Typen, aktueller Code oder reproduzierbares Ergebnis maßgeblich; Blogs und Modellgedächtnis sind Hinweise. Prüfe Netzwerk, Datenbank, Browser, Berechtigungen, Parallelität, Zeitzonen und Deployment, die Typen und Unit-Tests nicht beweisen. Ändere jeweils nur einen erklärbaren Schnitt und bewahre Diff und Rollback-Punkt.

## Laufzeit, Stopp und Wiederherstellung

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
