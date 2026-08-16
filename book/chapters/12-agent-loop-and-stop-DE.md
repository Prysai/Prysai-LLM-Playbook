<!-- content_id: chapter-12-agent-loop-and-stop | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 12: Agent-Schleife, Zustand und Stoppbedingungen

**Status:** `candidate`. **Experimentstatus:** `not_run`. Dieses Kapitel erklärt eine beobachtbare Schleife; es beweist nicht das Verhalten eines bestimmten Hosts, Modells oder Tools.

## Das Problem

„Der Agent soll das erledigen“ klingt wie eine Aktion. Tatsächlich folgen Modellvorschlag, Host-Entscheidung, Werkzeugausführung oder Ablehnung, Beobachtung, Zustandsaktualisierung, Überprüfung und die Entscheidung zum Fortsetzen oder Stoppen. Ein selbstsicherer Schlusssatz ersetzt diese Ereignisse nicht.

> Eine Modellausgabe ist ein Vorschlag. Ein Tool-Ergebnis ist eine Beobachtung. Eine verifizierte Übergabe braucht Evidenz aus der Zielumgebung.

## Die beobachtbare Schleife

```text
Aufgabenvertrag → Zustand lesen → Modellvorschlag → Host-Freigabe
→ Tool-Ausführung → Beobachtung → Zustand aktualisieren → Abnahmecheck
                                                   ↓
                             übergeben / fragen / wiederherstellen / stoppen
```

| Ebene | Kann belegen | Belegt allein nicht |
|---|---|---|
| Vorschlag | Das Modell schlug einen Schritt vor | Freigabe, Ausführung oder Richtigkeit |
| Host-Entscheidung | Eine Aktion wurde erlaubt, abgelehnt oder pausiert | Dass das erwartete Ergebnis entstand |
| Tool-Effekt | Start, Ende, Fehler oder Diff | Dass die Änderung die gewünschte Bedeutung erfüllt |
| Überprüfung | Ein Check prüfte eine konkrete Regel | Behauptungen außerhalb seines Umfangs |

Zwischen „Ich aktualisiere die Datei und teste“ und „fertig“ müssen Freigabe, Befehl, Endstatus, Diff und Testumfang liegen. Fehlen sie, lautet die Klassifikation `unverified`. Notiere zuerst den nicht gestützten Übergang, statt vage von Halluzination zu sprechen.

## Zustand aufschreiben

Ein kurzer Checkpoint macht eine Unterbrechung wiederaufnehmbar:

```yaml
task: "nicht leere Zeilen in einer wegwerfbaren Eingabedatei sortieren"
scope:
  read: ["sandbox/input.txt"]
  write: ["sandbox/output.txt", "sandbox/evidence/"]
completed: ["Pfad bestätigt", "Aufgabenvertrag gelesen"]
state: blocked_input
last_observation: "sandbox/input.txt fehlt"
verification: not_run
retry: {used: 0, allowed: 1}
next_safe_action: "Eingabedatei anfordern"
```

Nützliche Statusnamen sind `ready`, `proposed`, `awaiting_approval`, `running`, `feedback_received`, `blocked_input`, `paused`, `unknown`, `verified` und `stopped`. Eine Abschlussantwort macht einen unbekannten Zustand nicht zu `verified`.

Halte Ereignisse fest, keine Absichten: Vorschlag, Freigabe, Ausführungsbeginn und -ende, Effekt, Überprüfung und Übergabe. Nicht beobachtete Werte bleiben `not_observed`; sie werden nicht mit dem Plan des Modells ergänzt.

## Wiederholen ist eine begrenzte Entscheidung

Ordne den Fehler vor einem Wiederholungsversuch ein: fehlende Eingabe, Umfangs- oder Berechtigungskonflikt, Fehlinterpretation, Tool- oder Umgebungsfehler, mehrdeutiger Check oder Bedingungsdrift. Dieselbe Aktion unter denselben Bedingungen zu wiederholen, ist meist keine Diagnose.

Lege Budgets für Versuche, Zeit, veränderbare Dateien, externe Nebenwirkungen, Kosten und Ungewissheit fest. Nach einer verlorenen Antwort lese das Ziel und vergleiche die Nachbedingung, bevor du einen Schreibvorgang wiederholst: Er könnte bereits erfolgreich gewesen sein.

| Aktionsklasse | Erster Schritt nach ungewissem Ergebnis |
|---|---|
| Nur lesen | Im erlaubten Lesebereich erneut prüfen |
| Idempotent | Zustand und Nachbedingung lesen |
| Kompensierbar | Effekt bestätigen und begrenzte Kompensation vorbereiten |
| Nicht idempotent | Stoppen und abgleichen, bevor erneut versucht wird |

## Übung und Grenze

Bitte einen Agenten in einem wegwerfbaren Verzeichnis, Links zu fehlenden Dateien zu melden, ohne Quelldokumente zu ändern. Bestimme Lese- und Schreibwurzeln, die Definition eines fehlenden Links, den Check, zwei reine Leseversuche und einen absichtlichen Fehler, etwa eine falsche Wurzel. Prüfe Vorschlag, Bericht und Check getrennt.

Die Übung gelingt, wenn du jeden Übergang erklären und mit Evidenz als `verified`, `partial`, `blocked` oder `unverified` übergeben kannst. Bis ein unabhängiger Lauf gespeichert ist, bleibt dieses Kapitel `candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="11-designing-a-skill-DE.md">← Vorheriges<br><strong>Kapitel 11 · Einen Skill entwerfen, der seinen Platz verdient</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-DE.md">Nächstes Kapitel in Arbeit →<br><strong>Verfügbarkeit von Kapitel 13 ansehen</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
