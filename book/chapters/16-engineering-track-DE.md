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

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="15-research-track-DE.md">← Vorheriges<br><strong>Kapitel 15 · Forschungspfad, von der Frage zu prüfbarem Wissen</strong></a></td><td align="right"><a data-chapter-nav="next" href="17-marketing-track-DE.md">Nächstes →<br><strong>Kapitel 17 · Marketing-Pfad, vom Produktverständnis zu Wachstumsexperimenten</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
