<!-- content_id: chapter-18-content-design-data-automation | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 18: Pfad für Inhalte, Design, Daten und Automatisierung

**Status:** `candidate`. **Experimentstatus:** `draft / not_run`. Dieser Pfad lehrt die Prüfung von Übergaben; er dokumentiert keinen Produktionslauf.

## Das Problem dieses Kapitels

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

## Die ersten zehn Minuten: aus einer vagen Bitte einen prüfbaren Entwurf machen

Mach dies, bevor du ein weiteres Tool auswählst oder ein Konto verbindest. Nutze einen erfundenen Auftrag und eine wegwerfbare lokale Datei, etwa: „Schreibe ein einseitiges Update über drei erfundene Event-Anmeldungen.“ Es geht nicht darum, dass das Modell beeindruckend klingt. Prüfe, ob sich eine kleine Bitte präzise genug formulieren lässt, um sie zu kontrollieren.

1. Schreibe fünf Zeilen: **Leser**, **Endform**, **bereitgestellte Fakten**, **verbotene Daten oder Aktionen** und **was akzeptabel wäre**.
2. Ersetze die Klammern in diesem Prompt:

   ```text
   Erstelle eine/n [Endform] für [Leser] nur mit diesen bereitgestellten Fakten: [Fakten].
   Erfinde keine Zahlen, Quellen, Namen oder Ergebnisse. Fehlt Information, markiere sie als [fehlt] und stelle genau eine Frage.
   Gib nur einen Entwurf zurück; nicht senden, veröffentlichen, anmelden oder externe Dienste aufrufen.
   Abnahmeprüfungen: [drei beobachtbare Prüfungen].
   ```

3. Öffne den Entwurf wie der Leser ihn öffnen würde. Prüfe jeden Fakt, jede Marke `[fehlt]`, die Überschriftenhierarchie und die genannten Prüfungen.
4. Bewahre Auftrag, Prompt, Ausgabe und eine dreizeilige Notiz auf: **bestanden**, **fehlgeschlagen**, **unbekannt**. Braucht das Ergebnis echte Daten, Verteilung oder neue Rechte, stoppe und schreibe dies als nächste Entscheidung auf; erweitere die Aufgabe nicht stillschweigend.

Ein sauberer Entwurf zeigt weder, dass ein Prompt allgemein besser ist, noch, dass die Arbeit schneller wurde oder der Ablauf für Produktion sicher ist. Er liefert nur einen kleinen, prüfbaren Vergleichspunkt für die nächste Änderung.

Es gibt vier Stufen: risikoarmes lokales Lesen; reversible Projektarbeit; kontrollierte externe Verbindung mit Freigabe und Logs; Produktionsschreiben oder öffentliche Veröffentlichung mit expliziter Autorisierung, Datenschutz-/Lizenzprüfung, Vorschau, Rollback und Online-Verifikation. Jede höhere Stufe braucht neuen Grund, neue Rechte, Risiken, Evidenz und Wiederherstellung.

## Übung und Grenze

Nutze einen synthetischen Produktbericht-Kontext, de-identifizierte strukturierte Fixtures und ein erfundenes Publikum. A ist Dokument, B Dokument plus Analyse, C Dokument plus gerendertes Diagramm, D Dokument plus externe Verteilung. Füge leere Daten, fehlende Spalte, Extremwert und fehlerhafte Eingabe hinzu. Führe A/B/C lokal aus; D nur mit Testkonto oder Draft-Endpunkt, Vorschau, Batch-ID, Idempotenzschlüssel, Logs und Freigabe, ohne zu veröffentlichen.

Bewahre A–D-Tabelle, Endrender, Datenwörterbuch, Validierung, Antworten auf ungültige Eingaben, Logs, Berechtigungen, Retry-Aufzeichnungen, Sandbox-Status und explizite Evidenz für keine Veröffentlichung auf. Bei Timeout nach einem simulierten Schreiben bleibt der Trace erhalten, der Teilzustand wird abgefragt und eine nicht idempotente Aktion nicht wiederholt. Bis echte Endform-Evidenz und unabhängiges Review vorliegen, bleibt es `candidate / not_run`.

## Automatisierungsvertrag: Daten vor Aktionen definieren

Beispiel offline: Aus aggregierten Zählwerten wird ein einseitiger Bericht. Es liest nur synthetisches JSON und schreibt in ein wegwerfbares Verzeichnis; kein Netzwerk, Login oder Versand.

```text
Eingabe: report-input.json mit date, category, count; count ist nichtnegative ganze Zahl.
Sensible Grenze: keine Namen, E-Mails, IPs, Chats, Tokens oder externe IDs.
Transformation: count je category summieren und Input-/Script-Version bewahren.
Ausgabe: report.md mit Zeitfenster, Nenner, fehlenden Feldern und Leerzustand.
Validierung: Ausgabe erneut lesen, Summen, Kategorien, Hash und Leer-/Fehlerfälle prüfen.
Retry: nur mit gleichem Idempotenzschlüssel und lesbarer Ausgabe; unbekanntes Schreiben zuerst abfragen.
Stopp: Schema ungültig, sensible Daten, Zielverzeichnis unklar oder Overwrite-Regel ungeklärt.
```

Exit-Code 0 zeigt nur das Ende nach Script-Definition, nicht Feldmapping, Labels, Publikum oder externes System.

| Übergabe | Nach dem Öffnen prüfen | Häufig vergessener Fehler |
|---|---|---|
| Dokument/PDF | Hierarchie, Seiten, Links, leer, auswählbarer Text | Beschädigter Export |
| Website | 390px/Desktop, Tastatur, leer/Fehler, Links | Button- oder Sprachfehler |
| Diagramm | Einheit, Nenner, Labels, Kontrast, Alt, Rechte | Schön, aber irreführend |
| Tabelle | Formel, Filter, leer, Einheit, Neuberechnung | Überschriebene Formel |
| Flow | Schema, Log, Batch, Schlüssel, Read-back | Doppelschreiben nach Timeout |

## Kleines Experiment: Offline-Report und zwei Fehler

1. Erzeuge normale, leere, `count`-fehlende, negative und extreme synthetische Eingaben. Keine echten Kunden-, Personen- oder Produktionsdaten.
2. Erzeuge Markdown und prüfe Fenster, Summe, Kategorien und Leerzustand; bei PDF/PNG auch die Endform.
3. Bewahre pro Lauf Input-Hash, Transformationsversion, Ausgabepfad, Exit-Status, Rohlog und Read-back auf.
4. Simuliere Timeout nach Schreiben. Nicht sofort erneut schreiben: mit gleichem Batch nach Teilbericht lesen. Bei unbekanntem Zustand `unverified` übergeben und stoppen.
5. Bei fehlender Spalte oder fehlerhaften Daten Blockgrund zeigen, keine Nullwerte, Diagramme oder Erfolge erfinden.

Versand an E-Mail, CRM, Cloud oder Website wäre ein neuer externer Schreibvorgang mit Testkonto/Draft-Endpunkt, Ziel/Publikum, Freigabe, Batch, Rücknahme/Rollback und Online-Read-back; diese Übung autorisiert ihn nicht.

## Eigene Abnahme

- [ ] Ich definierte Eingabefelder, sensible Grenze, Version, Ausgabe, Validierung, Retry und Stopp.
- [ ] Ich öffne die Endform und prüfe Leer-/Fehlerzustand/Barrierefreiheit, nicht nur das Script.
- [ ] Bei Timeout frage ich Batch/Ausgabe vor einem möglichen erneuten Schreiben ab.
- [ ] Ich trenne lokal erzeugt, Entwurf, gesendet, veröffentlicht und online gelesen.

## Lernziele

Du wählst Fähigkeiten nach der endgültigen Übergabe und ihrem Risiko, prüfst die gerenderte Form und behandelst einen erfolgreichen Scriptlauf nicht als Nachweis einer vollständigen oder veröffentlichten Lieferung.

## Praxisfälle: Eine Quelldatei ist nicht das Ergebnis für Leser

Ein korrektes Markdown, Bild oder Script kann im PDF, Browser oder Tabellenexport trotzdem unlesbar, falsch beschriftet oder unzugänglich sein. Die richtige Frage lautet daher: Was sieht und nutzt die Zielperson nach dem Öffnen?

### Vorbereitung

Lege synthetische Zählwerte mit normalem, leerem, fehlendem und extremem Fall in einem wegwerfbaren Ordner an. Kein Konto, Netzwerk, Produktionsdatum oder externer Versand.

### Aufgabe

Erzeuge einen kurzen Offline-Bericht und prüfe Summe, Kategorien, Leerzustand und Fehler bei fehlender Spalte. Öffne die Endform und markiere, was geprüft wurde; bei Timeout nach einem Schreibversuch lies zuerst den Teilzustand zurück.

### Belege

Speichere Eingabe-Hash, Transformationsversion, Ausgabepfad, Log, Exit-Status, Read-back und Status „nicht versendet“. Ein erzeugtes Artefakt beweist keinen Versand, keine Veröffentlichung und keine Wirkung beim Publikum.

### Reflexion

Welcher Fehler war erst in der Endform sichtbar? Welche Aktion wäre nach einem Timeout nicht sicher wiederholbar?

## Transferaufgabe

Wende denselben Vertrag auf eine lokale Kursgrafik an: definiere Publikum, Tatsachen, Alt-Text, Lizenzgrenze und visuelle Prüfung. Erzeuge keinen externen Upload.

## Abnahme-Checkliste

- [ ] Ich definiere Schema, sensible Grenze, Ausgabe, Retry, Read-back und Stopp.
- [ ] Ich prüfe die Endform einschließlich Leer- und Fehlerzustand.
- [ ] Ich trenne lokal erzeugt, Entwurf, gesendet, veröffentlicht und online bestätigt.

## Quellen und Wartungsgrenze

Endformprüfung und Idempotenz sind stabile Methoden. Dateiformate, APIs, Renderer und Zugriffsregeln ändern sich und benötigen pro Umgebung aktuelle Prüfung.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="17-marketing-track-DE.md" aria-label="Vorheriges Kapitel: Kapitel 17 · Marketing-Pfad, vom Produktverständnis zu Wachstumsexperimenten">← Zurück<br><strong>Kapitel 17 · Marketing-Pfad, vom Produktverständnis zu Wachstumsexperimenten</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="19-evaluate-models-and-workflows-DE.md" aria-label="Nächstes Kapitel: Kapitel 19 · Modelle und Workflows evaluieren, von Eindrücken zu Evidenz">Weiter →<br><strong>Kapitel 19 · Modelle und Workflows evaluieren, von Eindrücken zu Evidenz</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
