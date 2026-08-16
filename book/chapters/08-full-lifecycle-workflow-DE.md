<!-- content_id: chapter-08-full-lifecycle-workflow | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 8: Von der Definition zur Übergabe

**Status:** `candidate`. Dieses Kapitel vermittelt einen Workflow mit prüfbaren Belegen und Wiederherstellungsregeln. Der Vergleichsversuch ist `not_run`; es ist kein Bericht über einen echten Codex-Lauf, Kundenauftrag oder Produktionsrelease.

## Das Problem

Ein Modell anfangen zu lassen ist nicht dasselbe wie nutzbare Arbeit zu Ende zu bringen. Ein Ziel kann vage sein, der Umfang wachsen oder ein Check das falsche Ziel prüfen, während die Oberfläche gesund aussieht.

```text
define → plan → build → verify → review → deliver → maintain
```

Jeder Übergang verlangt eine Entscheidung. Eine Phase endet nicht, weil ein Agent „fertig“ sagt, sondern weil andere ihren Beleg prüfen können.

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

Nutze statt eines horizontalen Plans einen vertikalen Schnitt: `eine Eingabe → kleinste Änderung → beobachtbare Aktion → fokussierter Check`. Netzwerk, Authentifizierung, Installation, Neustart, Deployment oder externe Nachricht benötigen einen ausdrücklichen Auftrag.

## Wiederherstellungsmuster bei echten Unterbrechungen

Öffentliche Nutzerberichte können ein nützliches Symptom zeigen, ersetzen aber weder eine
offizielle Ursachenanalyse noch eine lokale Reproduktion. Nutze sie, um den ersten sicheren
Check zu wählen, nicht um Vorgänge innerhalb des Produkts zu erraten.

### Unterbrechung durch capacity oder availability

**Beobachtetes Symptom:** Das gewählte Model ist nicht mehr verfügbar und die Aufgabe stoppt.

**Erste sichere Reaktion:** Halte Folgeprompts an, die von dieser Aufgabe abhängen, sichere
Diff, Ausgabe und den letzten akzeptierten Checkpoint und prüfe, ob das Zielartefakt teilweise
geändert wurde. Wähle erst dann einen einzigen begrenzten Retry, eine erlaubte andere Surface
oder eine Übergabe.

**Nicht behaupten:** dass eine Warteschlangenaufgabe fertig wurde, das Model die einzige Ursache
war oder wiederholtes „Weiter“ fehlende Evidenz wiederhergestellt hat.

### Ein Check bleibt in `Working`

**Beobachtetes Symptom:** Formatter, Test oder Analyse liefert kein Abschluss-Signal.

**Erste sichere Reaktion:** Wende die vereinbarte Warte- und Unterbrechungsregel an; bewahre
Befehl, Verzeichnis, Dauer, Ausgabe und Prozesszustand auf. Prüfe den Diff und klassifiziere
erst dann als vollständig, teilweise, fehlgeschlagen oder unbekannt.

**Nicht behaupten:** dass Stille ein Pass ist oder dass kein sichtbarer Fehler beweist, dass ein
Unterprozess beendet wurde.

### Browser-Login gelingt, der Client scheitert danach

**Beobachtetes Symptom:** Der Browser zeigt einen erfolgreichen Login, doch der Client scheitert
beim Token-Austausch oder bei der ersten Anfrage.

**Erste sichere Reaktion:** Notiere Autorisierungsseite, Callback, Client-Austausch und erste
erfolgreiche Anfrage getrennt. Prüfe nur den nächsten fehlenden Zustand.

**Nicht behaupten:** dass Browser-Erfolg Client-Authentifizierung, Account-Berechtigung,
Connector-Freigabe oder Tool-Verfügbarkeit beweist.

### Verifikation schlägt eine dauerhafte Änderung vor

**Beobachtetes Symptom:** Ein Agent schlägt Reinstallation, Neustart oder eine
Umgebungsänderung vor, damit ein Check besteht.

**Erste sichere Reaktion:** Stoppe und benenne die vorgeschlagene Nebenwirkung, ihr Ziel,
das auslösende Artefakt und die verfügbare Wiederherstellung. Trenne lokalen Edit, Test,
Installation, Neustart, Deployment und Live-Verifikation; verlange vor einer dauerhaften
Änderung eine neue Entscheidung.

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

Durchlaufe die sieben Phasen: Leserschaft und Ergebnis definieren; eine Änderung planen; Ausgangstext als Checkpoint speichern; bearbeiten; vergleichen; mit frischem Blick reviewen; an eine andere Person oder dein Ich von morgen übergeben. Sind mehr Material oder externe Aktionen nötig, halte bei `blocked` an. Erweitere keine Rechte, nur damit der Ablauf abgeschlossen aussieht.

### Wann zwei Versuche vergleichbar sind

Willst du „Modell sofort bearbeiten lassen“ mit „erst ein Protokoll schreiben“ vergleichen, friere Ausgangstext, Ziel, erlaubte Aktionen, Zeitlimit und Checkregel ein. Bewahre erste Ausgabe, echte Dauer, Nacharbeit, Diff, Checkergebnis und Unbekannte auf. Ändern sich Text, Modell, Tool, Rechte oder Umgebung, schreibe `not_comparable`. Ein einmal schnelleres oder hübscheres Ergebnis beweist weder allgemeine Effizienz noch ein besseres Modell.

## Checkpoints, Versuch und Grenze

Vor einem Retry notiere fehlgeschlagene Phase, Fehlerklasse, letzten akzeptierten Checkpoint, bekannte Änderungen, Retry-Bedingung und Fallback. „Weiter“ ist kein Wiederherstellungsplan. Wenn ein Befehl in `Working` bleibt, ist Stille eine Beobachtung, kein Erfolg.

Vergleiche in einem wegwerfbaren Ordner eine direkte Bitte mit einem Protokoll, Checkpoints und fokussiertem Check. Bewahre erste Ausgabe, Diff, Befehl, Exit-Code, reale Dauer und Nacharbeit auf; fehlende Zeit oder Kosten bleiben `unavailable`. Erzeuge einen Timeout, geänderten Input, Berechtigungsblock oder unbekanntes lokales Schreibergebnis. Ändern sich feste Bedingungen, markiere `not_comparable`. Wenige kleine Aufgaben beweisen keine allgemeine Effizienz, Qualität oder Modellrangfolge.

## Mit Checkpoints einen vollständigen Kreis schließen

Auch eine kleine Aufgabe braucht einen sichtbaren Verlauf. Maßstab ist, dass die
nächste Person ohne den alten Chat sicher weiterarbeiten kann:

```text
CP0: Originaltext, Zielpfad, erlaubter Umfang, Wiederherstellungsquelle
CP1: Ziel und Abnahme bestätigt; noch kein Edit
CP2: Genau eine Änderung; Vorher/Nachher und Diff aufbewahrt
CP3: Benannten Check ausgeführt oder gestoppt; Ausgabe und Grenzen aufbewahrt
CP4: Behauptung gegen Evidenz geprüft; Übergabe und nächste Aktion notiert
```

Notiere pro Checkpoint das letzte bestätigte Ereignis, möglicherweise geänderte
Dateien, fehlende Evidenz und genau einen sicheren nächsten Schritt. Ohne `CP2`
gehört eine Modellbehauptung über eine Änderung nicht in die Übergabe. Hängt
`CP3`, ist Stille kein Pass: Ausgabe, Prozesszustand und Diff bleiben erhalten,
der Status wird `unverified` oder `blocked`.

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

Das ist stärker als „alles fertig“. Sind Ziel, Autorität oder Wiederherstellungs-
quelle unklar, ist die nächste Aktion eine Frage oder ein Read-only-Check, kein
Edit. Kapitel und Vergleich bleiben bis zu Laufprotokoll und Review `candidate`
und `not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="07-skills-plugins-and-tools-DE.md">← Vorheriges<br><strong>Kapitel 7 · Skills, Plugins, MCP und Tools</strong></a></td><td align="right"><a data-chapter-nav="next" href="09-verification-and-recovery-DE.md">Weiter →<br><strong>Kapitel 9 · Überprüfung, Zweifel und Wiederherstellung</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
