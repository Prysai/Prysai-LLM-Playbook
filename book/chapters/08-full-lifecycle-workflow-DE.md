<!-- content_id: chapter-08-full-lifecycle-workflow | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 8: Von der Definition zur Übergabe

**Status:** `candidate`. Dieses Kapitel vermittelt einen Workflow mit prüfbaren Belegen und Wiederherstellungsregeln. Der Vergleichsversuch ist `not_run`; es ist kein Bericht über einen echten Codex-Lauf, Kundenauftrag oder Produktionsrelease.

## Das Problem dieses Kapitels

Ein Modell zu starten ist nicht dasselbe wie nutzbare Arbeit zu Ende zu bringen. Ein Ziel kann vage sein, der Umfang wachsen oder ein Check das falsche Ziel prüfen, während die Oberfläche scheinbar problemlos funktioniert.

```text
define → plan → build → verify → review → deliver → maintain
```

Jeder Übergang verlangt eine Entscheidung. Eine Phase endet nicht deshalb, weil ein Agent „fertig“ meldet, sondern erst, wenn andere den zugehörigen Beleg prüfen können.

## Lernziele

Nach diesem Kapitel kannst du einen kleinen LLM-unterstützten Auftrag als überprüfbare Kette von `define` bis `maintain` beschreiben. Du kannst vor einem erneuten Versuch einen Checkpoint sichern und eine Übergabe schreiben, die Handlung, Beleg und Unbekanntes auseinanderhält. Du wirst damit nicht beweisen, dass ein Modell allgemein zuverlässig ist; der Versuch bleibt auf seine Eingabe, Umgebung und Bewertungsregel begrenzt.

## Praxisnahe Fälle: Wenn der Workflow zwischen sichtbaren Erfolgen bricht

Ein Login, eine sichtbare Modellliste oder ein gestarteter Check kann wie Fortschritt aussehen, obwohl der nächste notwendige Zustand fehlt. Die öffentlichen Symptome in den folgenden Wiederherstellungsmustern sind weder Produktdiagnosen noch lokale Reproduktionen. Sie helfen dir nur, die erste sichere Beobachtung auszuwählen: Pfad und Diff nach einer Unterbrechung, den Token-Austausch nach einem Browser-Login oder eine ausdrückliche Zustimmung vor einer dauerhaften Änderung der Umgebung.

## Phasen mit Belegen

| Phase | Ausstiegsbeleg | Stopp bei |
|---|---|---|
| Define | Aufgabenprotokoll und Abnahme | fehlende Eingabe verändert Umfang, Risiko oder Autorität |
| Plan | Slice und geordnete Checks | kein unabhängig prüfbares Ergebnis |
| Build | Diff, geänderte Dateien, Checkpoint | Umfang verlassen oder Rückweg unklar |
| Verify | Befehl, Exit-Code, Ausgabe, Umgebung | Hänger, falsches Ziel oder fehlender Beleg |
| Review | Claim-Evidence-Tabelle und offene Risiken | Behauptung ist breiter als Evidenz |
| Deliver | Übergabe und Artefaktpfade | Status würde als live oder veröffentlicht übertrieben |
| Maintain | Owner, Prüftermin, Rollback | niemand besitzt Aktualisierung oder Rückweg |

Fehlt eine Ausstiegsbedingung, bleibt der Status `blocked` oder `unverified`. Mehr Schritte ersetzen weder eine fehlende Berechtigung noch einen fehlenden Test.

## Behauptung ist nicht Beleg

| Behauptung | Mindestbeleg | Beweist nicht |
|---|---|---|
| Quelle änderte sich | Diff am benannten Pfad | Korrektheit |
| Check lief | Befehl, Ordner, Exit-Code, Ausgabe | Laufzeitverhalten |
| Anwendung funktioniert | Beobachtung mit Eingabe und Umgebung | Verhalten auf jedem Konto oder OS |
| Seite sieht richtig aus | Render-Prüfung mit Viewport und Kriterium | Nachfrage, vollständige Barrierefreiheit oder Deployment |

Ein erfolgreicher Build ist wertvoll, aber kein automatischer Nachweis für Laufzeit, Sicherheit, visuelle Qualität oder Nutzerakzeptanz.

## Vor der Aktion definieren

```text
owner: content-maintainer
target: docs/guide.md
allowed_scope: Regeln lesen; Ziel bearbeiten; vorhandene lokale Checks ausführen
non_goals: kein Installieren, Committen, Pushen, Veröffentlichen oder Systemwechsel
acceptance: benannte Fehler behoben und erlaubte Check-Ausgänge erhalten
evidence: Diff, Dateiliste, Kommandoausgabe, Liste offener Punkte
stop_when: Umfang, Autorität, Ziel oder Wiederherstellungsquelle fehlt
rollback: aufgezeichnete Vorversion oder sauberer Checkpoint
```

Nutze statt eines horizontalen Plans einen vertikalen Slice: `eine Eingabe → kleinste Änderung → beobachtbare Aktion → fokussierter Check`. Ein Slice läuft einmal durch die ganze Kette und bleibt dabei klein. Netzwerk, Authentifizierung, Installation, Neustart, Deployment oder eine externe Nachricht benötigen einen ausdrücklichen Auftrag.

## Wiederherstellungsmuster bei echten Unterbrechungen

Öffentliche Nutzerberichte können ein nützliches Symptom zeigen, ersetzen aber weder eine
offizielle Ursachenanalyse noch eine lokale Reproduktion. Nutze sie, um den ersten sicheren
Check zu wählen, nicht um Vorgänge innerhalb des Produkts zu erraten.

### Unterbrechung durch Kapazität oder Verfügbarkeit

**Beobachtetes Symptom:** Das gewählte Modell ist nicht mehr verfügbar und der Auftrag stoppt.

**Erste sichere Reaktion:** Halte Folgeprompts an, die von diesem Auftrag abhängen. Sichere
Diff, Ausgabe und den letzten akzeptierten Checkpoint und prüfe, ob sich das Zielartefakt
teilweise geändert hat. Wähle erst danach einen einzigen begrenzten Retry, einen anderen
zulässigen Einstieg oder eine Übergabe.

**Nicht behaupten:** dass ein Auftrag in der Warteschlange fertig wurde, das Modell die einzige
Ursache war oder wiederholtes „Weiter“ fehlende Evidenz ersetzt.

### Ein Check bleibt in `Working`

**Beobachtetes Symptom:** Formatter, Test oder Analyse liefert kein Abschluss-Signal.

**Erste sichere Reaktion:** Wende die vereinbarte Warte- und Unterbrechungsregel an. Bewahre
Befehl, Verzeichnis, Dauer, Ausgabe und Prozesszustand auf. Prüfe den Diff und klassifiziere
den Zustand erst dann als vollständig, teilweise, fehlgeschlagen oder unbekannt.

**Nicht behaupten:** dass Stille ein Pass ist oder dass kein sichtbarer Fehler beweist, dass ein
Unterprozess beendet wurde.

### Browser-Login gelingt, der Client scheitert danach

**Beobachtetes Symptom:** Der Browser zeigt einen erfolgreichen Login, doch der Client scheitert
beim Token-Austausch oder bei seiner ersten Anfrage.

**Erste sichere Reaktion:** Notiere die Autorisierungsseite, den Callback, den Token-Austausch
und die erste erfolgreiche Anfrage getrennt. Prüfe nur den nächsten fehlenden Zustand.

**Nicht behaupten:** dass Browser-Erfolg Client-Authentifizierung, Account-Berechtigung,
Connector-Freigabe oder Tool-Verfügbarkeit beweist.

### Verifikation schlägt eine dauerhafte Änderung vor

**Beobachtetes Symptom:** Ein Agent schlägt Reinstallation, Neustart oder eine
Umgebungsänderung vor, damit ein Check besteht.

**Erste sichere Reaktion:** Stoppe und benenne die vorgeschlagene Nebenwirkung, ihr Ziel,
das auslösende Artefakt und den verfügbaren Rückweg. Trenne lokale Bearbeitung, Test,
Installation, Neustart, Deployment und Live-Prüfung. Verlange vor einer dauerhaften Änderung
eine neue Entscheidung.

**Nicht behaupten:** dass „stell sicher, dass es funktioniert“ Installation, Netzwerkschreiben
oder Veröffentlichung autorisiert.

## Zuerst einen kleinen vollständigen Slice abschließen

Du musst nicht mit einer Website, Code oder einem Release beginnen. Wähle einen kurzen Text, den du selbst prüfen kannst, eine lokale README oder eine bereits erlaubte Sammlung öffentlicher Quellen. Ziel ist nicht, dass das Modell „viel erledigt“, sondern eine sichtbare Schleife von Definition bis Übergabe zu schließen.

```text
Ergebnis: Ein Text unter 120 Wörtern hilft einer neuen Person, den ersten Schritt zu finden.
Eingabe: Ausgangstext, vorgesehene Leserschaft und ein bekanntes Problem.
Erlaubt: Text lesen; Plan vorschlagen; nach Bestätigung nur diesen Text bearbeiten.
Nicht erlaubt: Netzwerk, Sign-in, Installieren, Senden, Veröffentlichen oder andere Dateien ändern.
Check: Vorher-/Nachher-Text speichern und einmal prüfen: „Findet die Person den ersten Schritt?“
Übergabe: was sich änderte, was nicht, Checkergebnis und was unbekannt bleibt.
```

Durchlaufe die sieben Phasen: Leserschaft und Ergebnis definieren, eine Änderung planen, den
Ausgangstext als Checkpoint speichern, bearbeiten, vergleichen, mit frischem Blick prüfen und
an eine andere Person oder dein Ich von morgen übergeben. Sind mehr Material oder externe
Aktionen nötig, halte bei `blocked` an. Erweitere keine Rechte, nur damit der Ablauf abgeschlossen aussieht.

### Wann zwei Versuche vergleichbar sind

Willst du „Modell sofort bearbeiten lassen“ mit „erst ein Protokoll schreiben“ vergleichen, friere Ausgangstext, Ziel, erlaubte Aktionen, Zeitlimit und Checkregel ein. Bewahre erste Ausgabe, echte Dauer, Nacharbeit, Diff, Checkergebnis und Unbekannte auf. Ändern sich Text, Modell, Tool, Rechte oder Umgebung, schreibe `not_comparable`. Ein einmal schnelleres oder hübscheres Ergebnis beweist weder allgemeine Effizienz noch ein besseres Modell.

## Experiment: Checkpoints, Wiederholungen und Grenzen

Vor einem Retry notiere die fehlgeschlagene Phase, die Fehlerklasse, den letzten akzeptierten
Checkpoint, bekannte Änderungen, die Retry-Bedingung und den Fallback. „Weiter“ ist kein
Wiederherstellungsplan. Wenn ein Befehl in `Working` bleibt, ist Stille eine Beobachtung, kein Erfolg.

### Vorbereitung

Lege einen wegwerfbaren Ordner ohne Remote, Geheimnisse oder Kundendaten an. Speichere einen Ausgangstext, eine Abnahmefrage und einen lokalen Checkpoint. Vereinbare vorab ein Zeitlimit und den sicheren Abbruchschritt. Installiere nichts, melde dich nicht an und sende keine Nachricht an Dritte.

### Aufgabe

Vergleiche in diesem Ordner eine direkte Bitte mit einem Protokoll, Checkpoints und einem
fokussierten Check. Bewahre erste Ausgabe, Diff, Befehl, Exit-Code, tatsächliche Dauer und
Nacharbeit auf; fehlende Zeit- oder Kostenangaben bleiben `unavailable`. Erzeuge einen Timeout,
einen geänderten Input, einen Berechtigungsblock oder ein unbekanntes lokales Schreibergebnis.
Ändern sich feste Bedingungen, markiere `not_comparable`. Wenige kleine Aufgaben beweisen
keine allgemeine Effizienz, Qualität oder Modellrangfolge.

### Belege

Sichere für jeden Versuch: Ausgangseingabe und Abnahme, erlaubte Aktionen, Checkpoint-Nummer, Prompt oder Protokoll, geänderte Pfade, Diff, ausgeführten Befehl mit Verzeichnis und Exit-Code, Review-Notiz und fehlende Beobachtungen. Ein fehlender Lauf wird `not_run`, nicht nachträglich aus einer überzeugenden Ausgabe rekonstruiert.

## Mit Checkpoints einen vollständigen Durchlauf abschließen

Auch eine kleine Aufgabe braucht einen sichtbaren Verlauf. Maßstab ist, dass die
nächste Person ohne den alten Chat sicher weiterarbeiten kann:

```text
CP0: Originaltext, Zielpfad, erlaubter Umfang, Wiederherstellungsquelle
CP1: Ziel und Abnahme bestätigt; noch kein Edit
CP2: Genau eine Änderung; Vorher/Nachher und Diff aufbewahrt
CP3: Benannten Check ausgeführt oder gestoppt; Ausgabe und Grenzen aufbewahrt
CP4: Behauptung gegen Evidenz geprüft; Übergabe und nächste Aktion notiert
```

Notiere pro Checkpoint das letzte bestätigte Ereignis, möglicherweise geänderte Dateien,
fehlende Evidenz und genau einen sicheren nächsten Schritt. Ohne `CP2` gehört eine
Modellbehauptung über eine Änderung nicht in die Übergabe. Hängt `CP3`, ist Stille kein Pass:
Ausgabe, Prozesszustand und Diff bleiben erhalten, der Status wird `unverified` oder `blocked`.

## Den Check passend zur Behauptung wählen

| Behauptung | Erforderliche Evidenz | Beweist weiterhin nicht |
|---|---|---|
| Text änderte sich | Vorher/Nachher oder Diff am benannten Pfad | Verständnis von Lesenden |
| Lokaler Check bestand | Befehl, Verzeichnis, Exit-Code und Ausgabe | Verhalten in anderer Umgebung |
| Seite ist sichtbar | Render-Review mit dokumentiertem Viewport | Barrierefreiheit, Nachfrage, Deployment |
| Externe Änderung wurde gesendet | Read-back am Ziel | Sichtbarkeit für alle Personen |

Ein grüner Check wird nicht für alle Behauptungen wiederverwendet. Ein Diff
belegt Änderung, nicht Nutzerwert oder Veröffentlichung. Fehlt Evidenz, wird die
Aussage enger.

## Kurze Übergabe für die nächste Person

```text
status: passed | partial | blocked | unverified
done: nur Aktionen mit Evidenz
changed: exakte Pfade oder none
evidence: CP-Nummern, Diff, Kommandoausgabe, Review-Notiz
not done: ob commit / push / publish / external write geschahen
not proven: Leserwert, Laufzeit, visuelle Qualität, Sicherheit
next: eine sichere nächste Aktion
```

Das ist aussagekräftiger als „alles fertig“. Sind Ziel, Autorität oder Wiederherstellungsquelle
unklar, ist die nächste Aktion eine Frage oder ein Read-only-Check, keine Bearbeitung. Kapitel
und Vergleich bleiben bis zum Laufprotokoll und Review `candidate` und `not_run`.

## Reflexion

- An welchem Checkpoint war der letzte Zustand tatsächlich bekannt, und welcher nur vermutet?
- Welche Behauptung hätte ein Diff gestützt, welche hätte einen Lauf oder eine Leserin gebraucht?
- Welche Nebenwirkung hätte eine neue, eng begrenzte Zustimmung verlangt?

## Transferaufgabe

Übertrage denselben Ablauf auf einen nichttechnischen Auftrag: verbessere einen kurzen eigenen
Text, prüfe eine kleine Quellenliste oder plane eine Sprachübung. Behalte Ziel, erlaubte
Eingaben, verbotene Nebenwirkungen, Checkpoints und Übergabe bei. Ersetze nur die
domänenspezifische Abnahme: etwa Verständlichkeit für eine Leserin, Quelle und Unsicherheit
bei einer Recherche oder eine verzögerte, unbeantwortete Abrufaufgabe für Sprachpraxis.
Notiere ausdrücklich, was die Übung nicht beweist.

## Abnahme-Checkliste

- [ ] Ich kann für jede Phase einen Ausstiegsbeleg und einen Stoppgrund nennen.
- [ ] Ich habe vor dem ersten Edit Ziel, Umfang, erlaubte Aktionen, Abnahme und Rückweg festgehalten.
- [ ] Meine zwei Versuche haben dieselbe Eingabe, Rubrik und Grenze oder sind als `not_comparable` markiert.
- [ ] Ich habe Diff, Check-Ausgabe und unbekannte Zustände getrennt übergeben.
- [ ] Ich behaupte weder Veröffentlichung noch Nutzerwert, wenn der zugehörige Beleg fehlt.

## Quellen und Wartungsgrenze

Die Reihenfolge des Workflows, die Checkpoints und die Trennung von Behauptung und Beleg sind
die stabile Lehrmethode dieses Projekts. Produktoberflächen, Konto- und Toolverhalten,
Modellverfügbarkeit und Community-Symptome sind veränderliche Fakten. Prüfe die datierten
[offiziellen Faktenkarten](../evidence-library-DE.md#source-notes) und den
[Feldproblemindex](../evidence-library-DE.md#source-notes), bevor du eine aktuelle
Produktbehauptung übernimmst. Diese Quellen ersetzen weder einen lokalen Lauf noch eine
unabhängige Lernbeobachtung.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="07-skills-plugins-and-tools-DE.md" aria-label="Vorheriges Kapitel: Kapitel 7 · Wie Skills, Plugins, MCP und Tools die Arbeit aufteilen">← Zurück<br><strong>Kapitel 7 · Wie Skills, Plugins, MCP und Tools die Arbeit aufteilen</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="09-verification-and-recovery-DE.md" aria-label="Nächstes Kapitel: Kapitel 9 · Überprüfung, Zweifel und Wiederherstellung">Weiter →<br><strong>Kapitel 9 · Überprüfung, Zweifel und Wiederherstellung</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
