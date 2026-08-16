<!-- content_id: chapter-10-planning-and-slicing | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 10: Planung und vertikale Schnitte

**Status:** `candidate`. Plan und Beispiele sind Lehrmaterial. Sie beweisen weder einen Agent-Lauf noch, dass ein Schnitt in jedem Repository funktioniert.

## Das Problem

Auch ein detaillierter Plan kann verbergen, dass bis zum Ende niemand ein Ergebnis prüfen kann. Ein horizontaler Ablauf – alle Daten, dann API, dann UI – entdeckt falsche Annahmen spät. Ein vertikaler Schnitt führt ein kleines Ergebnis von der Eingabe bis zum Beleg.

```text
eine Eingabe → kleinste Änderung → beobachtbare Aktion → fokussierter Check → Beleg
```

Das ist kein Freibrief, alles gleichzeitig zu ändern. Der Schnitt entdeckt das teuerste Risiko früh und bleibt prüf- und rücksetzbar.

## Schnitt vor der Änderung entwerfen

| Feld | Frage |
|---|---|
| Ergebnis | Was kann am Ende jemand beobachten? |
| Eingabe | Welche Datei, Daten oder Entscheidung ist eingefroren? |
| Grenze | Welche Dateien, Rechte und Nebenwirkungen sind erlaubt? |
| Kleinste Änderung | Welche minimale Änderung erzeugt das Ergebnis? |
| Check | Welcher Befehl oder Read-back kann es ablehnen? |
| Evidenz | Welcher Diff, Output oder Review bleibt erhalten? |
| Nicht bewiesen | Was liegt weiterhin außerhalb des Umfangs? |
| Wiederherstellung | Wie kommt man zum letzten akzeptierten Zustand zurück? |

Ein guter Schnitt beantwortet eine Entscheidung. „Die gesamte Navigation migrieren“ tut das nicht. „Eine Person öffnet ein lokales Kapitel aus dem deutschen Inhaltsverzeichnis, findet die Übung und kehrt über einen aufgezeichneten Weg zurück“ kann es tun.

## Nach Abhängigkeiten planen

1. Ergebnis und Abnahme vor den Werkzeugen notieren.
2. Eingaben, Abhängigkeiten, Berechtigungen und unbekannte Fakten auflisten.
3. Das Unbekannte zuerst prüfen, das das Ergebnis blockieren könnte.
4. Einen Schnitt wählen, der auch bei einem Fehler Evidenz hinterlässt.
5. Reihenfolge der Checks und Stop-Bedingung festlegen.
6. Nach jedem Schnitt Diff, Umfang, Evidenz und nächste Entscheidung prüfen.

Eine Aufgabenliste ist kein Versprechen. Ausgeführte Aufgaben können ohne Ergebnis bleiben. Ein Plan macht Annahmen sichtbar, statt sie hinter sicherer Sprache zu verstecken.

## Experiment und Grenze

Vergleiche in einer wegwerfbaren Kopie einen horizontalen und vertikalen Plan für dieselbe kleine Änderung. Bewahre Ausgangsplan, Basisrevision, Befehle, Diffs, Checks und geänderte Entscheidungen auf. Füge eine fehlende Abhängigkeit oder unklare Abnahme ein. Der vertikale Plan besteht, wenn er die Blockade zeigt, bevor nicht prüfbare Änderungen anwachsen.

Miss aus einer Aufgabe keine allgemeine Geschwindigkeit oder Qualität. Nicht beobachtete Zeit, Kosten und Ergebnisse bleiben `unavailable`, `unknown` oder `not_run`.

- [ ] Ergebnis, Eingabe, Umfang und Abnahme sind beobachtbar.
- [ ] Der Schnitt hat einen Check und eine Wiederherstellungsquelle.
- [ ] Auch ein fehlgeschlagener Versuch hinterlässt prüfbare Evidenz.
- [ ] Externe Nebenwirkungen ohne ausdrückliche Autorität bleiben außerhalb des Umfangs.
- [ ] Die Übergabe trennt geändert, verifiziert, blockiert und nicht bewiesen.

## Deinen ersten vollständigen Schnitt machen

Beginne nicht mit „Verbessere den ganzen Kurs“. Wähle einen lokalen Text mit
höchstens 120 Wörtern, den eine neue Person verstehen soll. Das Ergebnis dieses
Schnitts ist klein: Die zwei sichtbaren Abschnitte **Was sich änderte** und
**So prüfst du es**, ohne zu veröffentlichen, etwas zu installieren oder andere
Dateien zu ändern.

Bitte das Modell zuerst, noch nicht zu editieren. Gib ihm diese Karte:

```text
ergebnis: Lesende sehen, was sich änderte und wie sie es prüfen
feste_eingabe: eine lokale Datei mit höchstens 120 Wörtern
erlaubt: Text vorschlagen; nach Bestätigung nur diese Datei editieren
verboten: veröffentlichen, installieren, Links oder andere Dateien ändern
abnahme: beide Abschnitte existieren und eine Person kann sie finden
stopp_wenn: Datei fehlt, eine weitere Datei nötig wird oder der Auftrag unklar wird
```

Dann gehst du so vor: definieren → Plan mit drei Schritten anfordern → Umfang
vor dem Edit prüfen → klein ändern → vorher und nachher vergleichen → beide
Abschnitte lesen → ehrlich übergeben. Will das Modell den Auftrag ausweiten,
kehrst du zur Karte zurück. Ohne neue Entscheidung ist mehr Umfang nicht
automatisch hilfreicher.

## Zwei Anfragen vergleichen, ohne eine Kennzahl zu erfinden

Du kannst eine direkte Bitte („Mach es klarer“) einmal neben der Karten-Anfrage
ausprobieren. Halte Text, Modell, Tool, verfügbare Zeit und Lesekriterium fest.
Bewahre beide Prompts, Versionen, Leserfragen und Fehler auf. Ändert sich eine
Variable, notiere `not_comparable`. Eine schnellere oder schönere Antwort beweist
weder allgemeine Produktivität noch Modellüberlegenheit. Die Übung macht sichtbar,
welche Information vor dem Edit fehlte und ob das Ergebnis prüfbar ist.

## Sicheres Scheitern und Rückblick

Lösche absichtlich **So prüfst du es** oder nenne eine nicht vorhandene Datei.
Der erste Fehler soll zeigen, ob Inhalt fehlt oder die Eingabe falsch ist. Füge
keine Abhängigkeit oder Berechtigung hinzu, um ihn zu verdecken. Notiere, was du
beobachtet hast, was unbewiesen bleibt und was die eine sichere nächste Aktion ist.
Dieses Kapitel bleibt `candidate`: Die Übung misst für sich keine Wirksamkeit,
Geschwindigkeit oder dauerhaftes Lernen.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="09-verification-and-recovery-DE.md">← Vorheriges<br><strong>Kapitel 9 · Überprüfung, Zweifel und Wiederherstellung</strong></a></td><td align="right"><a data-chapter-nav="next" href="11-designing-a-skill-DE.md">Nächstes →<br><strong>Kapitel 11 · Einen Skill entwerfen, der seinen Platz verdient</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
