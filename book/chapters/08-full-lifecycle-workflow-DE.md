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

## Checkpoints, Versuch und Grenze

Vor einem Retry notiere fehlgeschlagene Phase, Fehlerklasse, letzten akzeptierten Checkpoint, bekannte Änderungen, Retry-Bedingung und Fallback. „Weiter“ ist kein Wiederherstellungsplan. Wenn ein Befehl in `Working` bleibt, ist Stille eine Beobachtung, kein Erfolg.

Vergleiche in einem wegwerfbaren Ordner eine direkte Bitte mit einem Protokoll, Checkpoints und fokussiertem Check. Bewahre erste Ausgabe, Diff, Befehl, Exit-Code, reale Dauer und Nacharbeit auf; fehlende Zeit oder Kosten bleiben `unavailable`. Erzeuge einen Timeout, geänderten Input, Berechtigungsblock oder unbekanntes lokales Schreibergebnis. Ändern sich feste Bedingungen, markiere `not_comparable`. Wenige kleine Aufgaben beweisen keine allgemeine Effizienz, Qualität oder Modellrangfolge.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="07-skills-plugins-and-tools-DE.md">← Vorheriges<br><strong>Kapitel 7 · Skills, Plugins, MCP und Tools</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-DE.md">Nächstes Kapitel in Arbeit →<br><strong>Verfügbarkeit von Kapitel 9 ansehen</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
