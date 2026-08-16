<!-- content_id: chapter-18-content-design-data-automation | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 18: Pfad für Inhalte, Design, Daten und Automatisierung

**Status:** `candidate`. **Experimentstatus:** `draft / not_run`. Dieser Pfad lehrt die Prüfung von Übergaben; er dokumentiert keinen Produktionslauf.

## Das Problem

Je mehr Tools ein Workflow enthält, desto leichter werden „die Quelldatei existiert“, „das Script lief“ oder „die API ist verbunden“ mit einer fertigen Übergabe verwechselt. Auch Layout, Leerzustände, Barrierefreiheit, Lizenz, Formeln, Datenschutz, Berechtigungen, doppelte Schreibvorgänge und Wiederherstellung können fehlschlagen.

> Definiere zuerst die Endform und ihr Publikum. Aktiviere dann Fähigkeiten nach Risiko und prüfe das gerenderte Ergebnis, Ein- und Ausgaben, Berechtigungen, Wiederherstellung und Veröffentlichungsstatus.

## Nach Übergabe statt Marke wählen

| Übergabe | Endform-Checks | Typische Risiken |
|---|---|---|
| Dokument oder PDF | Paginierung, Inhaltsverzeichnis, Links, Fonts, Lesbarkeit, Druck | Reflow, fehlende Fonts, Zitat- oder Lizenzfehler |
| Website | Browser-Render, responsives Verhalten, Interaktion, Leer-/Fehlerzustände, Tastatur, Mobil | Quelle korrekt, Oberfläche unbenutzbar |
| Bild oder Video | Maße, Klarheit, Text, Rechte, Captions/Alt, Editierbarkeit | Faktenfehler, unklare Lizenz, unzugängliche Medien |
| Präsentation | Projektionsgröße, Hierarchie, Kontrast, Reihenfolge, Notizen | Überlauf, geringer Kontrast, Skriptabweichung |
| Tabelle oder Bericht | Formeln, Filter, Einheiten, Leerwerte, Export, Neuberechnung | Verschobene Zahlen, Nennerdrift, überschriebene Formeln |
| Automatisierung | Schema, Logs, Wiederholung, Idempotenz, Rechte, Rollback, Ausgabe | Doppelschreibvorgang, Datenleck, Teilabschluss |

Ein Source-Diff ersetzt keine Evidenz der Endform. Wenn die wirkliche Form zählt, rendere PDF/PNG, öffne die Website im Browser, berechne die Tabelle neu oder führe einen kontrollierten Flow im Testkonto aus. Prüfe Hierarchie, Lesbarkeit, Leer-/Fehlerzustände, Barrierefreiheit, Richtigkeit, Lizenz und Editierbarkeit.

## Reversible und wiederholbare Automatisierung

```text
Eingabe-Schema und Beispiel; sensible Felder und erlaubte Nutzung;
Transformationen und Versionen; externe Aufrufe, Ziel und minimale Rechte;
Timeout, Retry, Backoff und Idempotenzschlüssel; Logs, Trace-ID, Fehlerklassen;
Ausgabe-Schema und Validierung; Teilzustand, Kompensation und Rollback;
menschlicher Freigabepunkt und Stoppsignal.
```

„Die API war verbunden“ beweist nur Konnektivität. Es beweist kein Feldmapping, keine Vollständigkeit, kein Duplikatverhalten, keinen Berechtigungsumfang und keine nachgelagerte Richtigkeit. Vor Produktionsschreiben verwende Testkonto, Sandbox oder lokale Simulation und bewahre bei Bedarf Input-/Output-Hashes und Batch-ID auf.

Es gibt vier Stufen: risikoarmes lokales Lesen; reversible Projektarbeit; kontrollierte externe Verbindung mit Freigabe und Logs; Produktionsschreiben oder öffentliche Veröffentlichung mit expliziter Autorisierung, Datenschutz-/Lizenzprüfung, Vorschau, Rollback und Online-Verifikation. Jede höhere Stufe braucht neuen Grund, neue Rechte, Risiken, Evidenz und Wiederherstellung.

## Übung und Grenze

Nutze einen synthetischen Produktbericht-Kontext, de-identifizierte strukturierte Fixtures und ein erfundenes Publikum. A ist Dokument, B Dokument plus Analyse, C Dokument plus gerendertes Diagramm, D Dokument plus externe Verteilung. Füge leere Daten, fehlende Spalte, Extremwert und fehlerhafte Eingabe hinzu. Führe A/B/C lokal aus; D nur mit Testkonto oder Draft-Endpunkt, Vorschau, Batch-ID, Idempotenzschlüssel, Logs und Freigabe, ohne zu veröffentlichen.

Bewahre A–D-Tabelle, Endrender, Datenwörterbuch, Validierung, Antworten auf ungültige Eingaben, Logs, Berechtigungen, Retry-Aufzeichnungen, Sandbox-Status und explizite Evidenz für keine Veröffentlichung auf. Bei Timeout nach einem simulierten Schreiben bleibt der Trace erhalten, der Teilzustand wird abgefragt und eine nicht idempotente Aktion nicht wiederholt. Bis echte Endform-Evidenz und unabhängiges Review vorliegen, bleibt es `candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="17-marketing-track-DE.md">← Vorheriges<br><strong>Kapitel 17 · Marketing-Pfad, vom Produktverständnis zu Wachstumsexperimenten</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-DE.md">Nächstes Kapitel in Arbeit →<br><strong>Verfügbarkeit von Kapitel 19 ansehen</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
