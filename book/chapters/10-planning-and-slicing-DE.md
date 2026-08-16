<!-- content_id: chapter-10-planning-and-slicing | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 10: Planung und vertikale Schnitte

**Status:** `candidate`. Plan und Beispiele sind Lehrmaterial. Sie beweisen weder einen Agent-Lauf noch, dass ein Schnitt in jedem Repository funktioniert.

## Das Problem dieses Kapitels

Auch ein detaillierter Plan kann verbergen, dass bis zum Ende niemand ein Ergebnis prüfen kann. Ein horizontaler Ablauf – alle Daten, dann API, dann UI – entdeckt falsche Annahmen spät. Ein vertikaler Schnitt führt ein kleines Ergebnis von der Eingabe bis zum Beleg.

```text
eine Eingabe → kleinste Änderung → beobachtbare Aktion → fokussierter Check → Beleg
```

Das ist kein Freibrief, alles gleichzeitig zu ändern. Der Schnitt entdeckt das teuerste Risiko früh und bleibt prüf- und rücksetzbar.

## Lernziele

Du kannst ein großes Vorhaben in einen kleinen, beobachtbaren Schnitt übersetzen, seine Abhängigkeiten und Stopppunkte vor dem Edit festhalten und einen fehlgeschlagenen Versuch so übergeben, dass keine Person Umfang oder Rechte erraten muss. Die Übung misst nicht allgemeine Geschwindigkeit, Modellqualität oder dauerhaften Lernerfolg.

## Praxisfälle: Wenn ein detaillierter Plan kein überprüfbares Ergebnis hervorbringt

Ein Plan kann viele Dateien, Phasen und Werkzeuge nennen und trotzdem keinen ersten Zustand liefern, den jemand prüfen kann. Das reale Risiko ist eine lange Kette aus Annahmen: fehlende Datei, unbekannte Berechtigung oder unklare Abnahme werden erst sichtbar, nachdem nicht prüfbare Arbeit gewachsen ist. Ein vertikaler Schnitt prüft zuerst die Abhängigkeit, die den nächsten sichtbaren Schritt blockiert.

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

### Vorbereitung

Lege eine wegwerfbare lokale Kopie ohne Remote, Geheimnisse oder externe Konten an. Wähle einen kleinen Ausgangstext, eine bekannte Änderung und eine feste Abnahmefrage. Sichere die Basisrevision und lege vorab eine Stoppregel fest; installiere, veröffentliche oder sende nichts.

### Aufgabe

Vergleiche in einer wegwerfbaren Kopie einen horizontalen und vertikalen Plan für dieselbe kleine Änderung. Bewahre Ausgangsplan, Basisrevision, Befehle, Diffs, Checks und geänderte Entscheidungen auf. Füge eine fehlende Abhängigkeit oder unklare Abnahme ein. Der vertikale Plan besteht, wenn er die Blockade zeigt, bevor nicht prüfbare Änderungen anwachsen.

Miss aus einer Aufgabe keine allgemeine Geschwindigkeit oder Qualität. Nicht beobachtete Zeit, Kosten und Ergebnisse bleiben `unavailable`, `unknown` oder `not_run`.

### Belege

Bewahre beide Pläne, die feste Eingabe, den gewählten Schnitt, Abhängigkeits- und Rechteannahmen, Diff, Check-Ausgabe, Stopppunkt und Übergabekarte auf. Ist ein Versuch nicht gelaufen, bleibt er `not_run`; ein plausibler Plan ersetzt kein Ergebnis.

- [ ] Ergebnis, Eingabe, Umfang und Abnahme sind beobachtbar.
- [ ] Der Schnitt hat einen Check und eine Wiederherstellungsquelle.
- [ ] Auch ein fehlgeschlagener Versuch hinterlässt prüfbare Evidenz.
- [ ] Externe Nebenwirkungen ohne ausdrückliche Autorität bleiben außerhalb des Umfangs.
- [ ] Die Übergabe trennt geändert, verifiziert, blockiert und nicht bewiesen.

## Arbeitsblatt mit drei Plänen: nach dem ersten Beleg entscheiden

Schreibe für dieselbe Anfrage drei Varianten, bevor du den Editor öffnest. Du
musst nicht alle ausführen. Der Vergleich zeigt, wo ein Plan den ersten
nützlichen Befund versteckt.

| Form | Typischer erster Schritt | Erster nützlicher Beleg | Signal zum Anhalten |
|---|---|---|---|
| Horizontal | „Erst alle Daten, dann die gesamte UI vorbereiten“ | Kommt oft erst nach vielen Schichten | Heute gibt es keine Person, Eingabe oder Prüfung für ein Review |
| Dateireihenfolge | „Diese Dateien in dieser Reihenfolge editieren“ | Ein lokal prüfbarer Diff | Die Dateireihenfolge sagt nicht, was jemand beobachten kann |
| Vertikal | „Mit fester Eingabe ein Ergebnis zeigen und prüfen“ | Ein kleiner Pfad, Check und Datensatz | Der erste Pfad braucht Veröffentlichung, Installation oder mehrere Systeme |

Wähle den vertikalen Plan, wenn du früh wissen musst, ob die Idee den nächsten
Schritt verdient. Weißt du noch nicht einmal, ob eine Abhängigkeit, Berechtigung
oder Datei existiert, wähle einen schreibgeschützten Probe. Ein Probe beantwortet
„können wir weiter?“, nicht „ist die Funktion fertig?“.

## Stopp- und Übergabekarte

Eine Unterbrechung löscht den Plan nicht, erlaubt aber auch keine automatische
Fortsetzung. Hinterlasse vor dem Schließen der Sitzung oder vor einer Bitte um
Hilfe eine Karte, die jemand ohne den Gesprächsverlauf lesen kann:

```text
schnitt: Name eines einzelnen beobachtbaren Ergebnisses
baseline: verglichener Branch, Revision oder Kopie
mit belegen erledigt: tatsächlich vorhandene Änderung und Prüfung
blockade oder unbekanntes: erste fehlende Abhängigkeit oder Prüfung
zielzustand: keine Änderung / Teiländerung / unbekannt
noch nicht: Rechte erweitern, installieren, veröffentlichen oder ausgeschlossene Dateien
nächste einzige Aktion: schreibgeschützter Probe oder idempotenter Wiederholversuch
```

Kannst du keine einzige nächste Aktion benennen, ist der Schnitt noch zu groß.
Teile die Frage, bevor du erneut einfach „weiter“ anforderst.

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

## Sicheres Scheitern und Grenze

Lösche absichtlich **So prüfst du es** oder nenne eine nicht vorhandene Datei.
Der erste Fehler soll zeigen, ob Inhalt fehlt oder die Eingabe falsch ist. Füge
keine Abhängigkeit oder Berechtigung hinzu, um ihn zu verdecken. Notiere, was du
beobachtet hast, was unbewiesen bleibt und was die eine sichere nächste Aktion ist.
Dieses Kapitel bleibt `candidate`: Die Übung misst für sich keine Wirksamkeit,
Geschwindigkeit oder dauerhaftes Lernen.

## Reflexion

Welche Abhängigkeit hättest du im horizontalen Plan zuletzt entdeckt? Welcher Beleg machte den vertikalen Schnitt prüfbar, und welche Behauptung blieb auch nach dem Check außerhalb des Umfangs?

## Transferaufgabe

Plane denselben Schnitt für eine Recherche, eine Sprachübung oder eine Inhaltsüberarbeitung. Halte Ergebnis, feste Eingabe, erlaubte und verbotene Aktionen, Check und Rückweg bei. Für Sprache soll die Abnahme eine spätere, unbekannte Abrufaufgabe ohne Hilfe enthalten, nicht nur eine flüssige assistierte Antwort. Notiere, was die neue Übung nicht beweist.

## Abnahme-Checkliste

- [ ] Ergebnis, Eingabe, Umfang und Abnahme sind beobachtbar.
- [ ] Der Schnitt hat einen Check, eine Stoppregel und eine Wiederherstellungsquelle.
- [ ] Auch ein fehlgeschlagener Versuch hinterlässt prüfbare Evidenz.
- [ ] Externe Nebenwirkungen ohne ausdrückliche Autorität bleiben außerhalb des Umfangs.
- [ ] Die Übergabe trennt geändert, verifiziert, blockiert und nicht bewiesen.

## Quellen und Wartungsgrenze

Vertikale Schnitte, Abhängigkeitsreihenfolge und Stopppunkte sind die stabile Lehrmethode dieses Projekts. Produktfunktionen, Berechtigungen, Modellverfügbarkeit und Community-Symptome ändern sich. Prüfe aktuelle Behauptungen gegen die [offiziellen Faktenkarten](../evidence-library-DE.md#source-notes) und den [Feldproblemindex](../evidence-library-DE.md#source-notes). Diese ersetzen weder eine lokale Ausführung noch eine unabhängige Lernbeobachtung.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="09-verification-and-recovery-DE.md" aria-label="Vorheriges Kapitel: Kapitel 9 · Überprüfung, Zweifel und Wiederherstellung">← Zurück<br><strong>Kapitel 9 · Überprüfung, Zweifel und Wiederherstellung</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="11-designing-a-skill-DE.md" aria-label="Nächstes Kapitel: Kapitel 11 · Einen Skill entwerfen, der seinen Platz verdient">Weiter →<br><strong>Kapitel 11 · Einen Skill entwerfen, der seinen Platz verdient</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
