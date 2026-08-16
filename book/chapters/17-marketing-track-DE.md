<!-- content_id: chapter-17-marketing-track | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 17: Marketing-Pfad, vom Produktverständnis zu Wachstumsexperimenten

**Status:** `candidate`. **Experimentstatus:** `draft / not_run`. Dieser Pfad lehrt überprüfbare Marketingentscheidungen; er liefert keine Kunden, Kampagnenergebnisse oder nachgewiesene Kausalität.

## Das Problem

Marketing wird vage, wenn Produkt, Zielgruppe, Positionierung, Beleg und gewünschte Handlung fehlen. Es wird auch riskant, wenn persönliche Daten gesammelt oder automatisch veröffentlicht werden, bevor klar ist, welche Entscheidung die Daten ändern sollen.

> Erstelle zuerst einen versionierten Produktkontext, formuliere dann eine Hypothese, bestimme die kleinste nützliche Messung und bereite erst danach Inhalt oder Aktion innerhalb der Datenschutz- und Autorisierungsgrenzen vor.

## Produktkontext und Entscheidung

Halte Produkt und Version, Nicht-Ziele, ein- und ausgeschlossene Zielgruppen, Problem und Nutzungssituation, Alternativen, Differenzierung und verfügbare Belege, Einwände, anonymisierte Kundensprache, Voice, verbotene Formulierungen, gewünschte Handlung, Channel, Region, Datum, Owner und Review fest. Eine Behauptung ohne Beleg bleibt Hypothese oder wird entfernt.

Schreibe vor der Metrik Entscheidung, Hypothese, kleinste Frage, Event und Metrik, Nenner, Stichprobe, Zeitfenster, Segmente, Duplikate, fehlende Daten, Verzögerung, Einwilligung, Aufbewahrung, Zugriff, Stoppregel und nächste Handlung auf. „Variante B hatte mehr Klicks“ bedeutet ohne Exposition, Nenner, Population und Zeitfenster nichts.

| Fähigkeitsgruppe | Ergebnis | Grenze |
|---|---|---|
| Produktkontext | Kontext und Claim-Register | Fakten, Hypothesen, Owner, Review |
| Positionierung | Varianten für Zielgruppe und Einwände | Beleg, Voice, verbotene Claims |
| Experiment | Hypothese, Exposition, Stoppregel | Stichprobe, Nenner, Einwilligung |
| Verteilung | Entwurf oder Sandbox-Batch | Channel, Freigabe, Rollback |
| Messung | Aggregierter Bericht und Grenzen | Event-Schema, Qualität, Kausalgrenzen |

## Datenschutz, Attribution und Autorisierung

Ein Agent kann Kontext ordnen, Varianten formulieren, Event-Namen prüfen und deskriptive Statistik erklären. Er darf keine Kausalität ableiten, Stichprobenbias verbergen oder ohne getrennte Freigabe in Werbung, CRM, E-Mail oder soziale Kanäle veröffentlichen. Externe Schreibvorgänge benötigen Testkonto oder Sandbox, menschliche Freigabe, Batch-ID und Rücknahme oder Rollback.

Namen, vollständige E-Mail- und IP-Adressen, private Gespräche und kontextübergreifende Kennungen gehören nicht in die Standardeingabe. Bevorzuge Aggregate, De-Identifizierung, kurze Aufbewahrung und begrenzten Zugriff. Prüfe Duplikate, fehlende Werte, Zeitzone, Verzögerung, Bots und Nennerdrift. Ein schönes Diagramm macht schwache Daten nicht zu Evidenz.

Kontozugriff autorisiert auch nicht die Nutzung der Daten einer bestimmten Organisation. Bestätige Host, Organisation, Installation, Zielgruppe und Umfang vor jedem externen Experiment.

## Übung und Grenze

Nutze ein synthetisches Produkt mit drei Einwänden, ohne Testimonials, Inventar oder Kennzahlen, und eine lokale Tabelle nur mit Zählwerten. Vergleiche „Schreibe eine überzeugende Einführung“ mit einer Anfrage, die Kontext, fehlenden Beleg, gewünschte Handlung, Hypothese, Metrik, Nenner, Stichprobe und nächste Entscheidung enthält. Markiere unbelegte Claims und erstelle zwei Varianten, ohne Sieger oder Kausalität zu behaupten.

Bewahre Anfragen, Kontextversion, Varianten, Hypothesentabelle, Metriken, Stichprobennotizen, de-identifiziertes Datenwörterbuch, Datenschutzentscheidungen und nächste Entscheidung auf. Bis autorisierte Daten, Qualitätsprüfung und menschliches Review vorliegen, bleibt die Übung `candidate / not_run`.

## Vom Content-Entwurf zur messbaren Entscheidung: Experimentkarte

Frage zuerst: „Welche Entscheidung ändert diese Messung?“ Beispiel für eine synthetische lokale Seite:

```text
Entscheidung: Formulierung zu weniger Übergabeverlusten weiter testen oder zur Erklärung des Einrichtungsaufwands zurückkehren.
Hypothese: Bei gleicher Zielgruppe und Position führt ein klarer Übergabekonflikt eher zur Musteranfrage.
Einzige Änderung: Titel und erster Absatz; nicht Preis, Channel, Zielgruppe oder CTA.
Metrik: Musteranfragen / deduplizierte Expositionen.
Umfang: synthetische oder autorisierte aggregierte Zählwerte, kurzes Fenster; keine Namen, vollständigen E-Mails, IPs oder Chats.
Stopp: kleine Stichprobe, gemischte Varianten, fehlendes Event, unklare Einwilligung oder Ziel.
Nächster Schritt: Differenz und Grenzen beschreiben, keinen kausalen Sieger erklären.
```

| Typ | Zulässige Form | Nicht daraus machen |
|---|---|---|
| Bestätigte Tatsache | „Diese Übung nutzt eine lokale synthetische Aufgabe“ | „Viele Teams nutzen es bereits“ |
| Hypothese | „Wir prüfen, ob das verständlicher ist“ | „Es steigert bereits die Effizienz“ |
| Zielgruppenstimme | Erlaubter, de-identifizierter, nachvollziehbarer kurzer Satz | Erfundenes Testimonial |
| Ohne Beleg | Entfernen oder als Hypothese markieren | „Branchenführer“ oder „am beliebtesten“ |

## Kleines Experiment: zwei Entwürfe, keine Veröffentlichung

1. Schreibe aus synthetischem Kontext zwei Einleitungen und nenne Zielgruppe, Problem, Aktion und fehlenden Beleg.
2. Vergib anonyme Labels und ein lokales Wörterbuch aggregierter Zählwerte mit Nenner, Deduplizierung, Fenster und Aufbewahrung.
3. Markiere jeden Satz als Fakt, Hypothese oder ohne Beleg; entferne die letzte Kategorie.
4. Bitte eine Testperson im lokalen Beispiel um Verständnis von Aktion und Unbekanntem. Speichere nur autorisiertes Feedback, kein Marktergebnis.
5. Ein echter Channel ist eine neue Aktion: Host, Organisation, Konto, Publikum, Einwilligung, Batch, menschliche Freigabe und Rücknahme erneut bestätigen.

## Eigene Abnahme

- [ ] Vor dem Schreiben stehen Entscheidung, einzige Änderung, Nenner und Stopp fest.
- [ ] Ich mache aus beschreibenden Zählwerten keine Kausalität, Effizienz oder Marktakzeptanz.
- [ ] Jeder Claim ist Fakt, Hypothese, autorisiertes Feedback oder gelöscht.
- [ ] Ohne Kundenevidenz erfinde ich keine Testimonials, Größe, Adoption oder Dringlichkeit.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="16-engineering-track-DE.md">← Vorheriges<br><strong>Kapitel 16 · Engineering-Pfad, von der Idee zu zuverlässiger Software</strong></a></td><td align="right"><a data-chapter-nav="next" href="18-content-design-data-automation-DE.md">Nächstes →<br><strong>Kapitel 18 · Pfad für Inhalte, Design, Daten und Automatisierung</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
