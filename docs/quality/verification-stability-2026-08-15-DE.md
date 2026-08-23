<!-- content_id: verification-stability-2026-08-15 | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: verification-stability-2026-08-15.md | source_revision: 2026-08-15 -->

# Fünf wiederholte lokale Verifizierungsläufe

**Status:** technische Beobachtung im Status `candidate`

**Aufgezeichnet:** 2026-08-15 (America/Los_Angeles)  
**Daten:** [maschinenlesbare Laufzeiten](verification-stability-2026-08-15.json) · [Diagramm](verification-stability-2026-08-15.svg)

## Was tatsächlich beobachtet wurde

Im aktuellen Windows-Arbeitsbaum wurden sieben lokale Prüfungen des Repositorys fünfmal hintereinander in derselben Reihenfolge ausgeführt. Jeder Lauf endete erfolgreich. Das Diagramm zeigt die Medianlaufzeit jeder Prüfung; die Tabelle bewahrt alle fünf Rohwerte auf, damit die Zusammenfassung nachvollziehbar bleibt und nicht nur geglaubt werden muss.

![Median der Laufzeit von fünf wiederholten lokalen Verifizierungsläufen](verification-stability-2026-08-15.svg)

Auf dem Smartphone stehen die genauen Werte in der Tabelle. Der Reader stellt dieses dichte Diagramm als benannten Link bereit, der in voller Größe geöffnet werden kann, statt es auf dem kleinen Bildschirm als lesbaren Text erscheinen zu lassen.

| Prüfung | Erfolgreich | Rohwerte (ms) | Median (ms) | Mittelwert (ms) |
| --- | ---: | --- | ---: | ---: |
| Projekt-Baseline | 5 / 5 | 48.9, 38.3, 36.1, 34.4, 35.1 | 36.1 | 38.6 |
| Projektstruktur | 5 / 5 | 43.2, 42.3, 40.5, 39.1, 39.5 | 40.5 | 40.9 |
| Inhaltsvollständigkeit | 5 / 5 | 49.4, 47.5, 46.9, 47.0, 44.7 | 47.0 | 47.1 |
| Englischer Lernvertrag | 5 / 5 | 86.8, 83.8, 84.5, 83.1, 83.9 | 83.9 | 84.4 |
| Skill-Registry | 5 / 5 | 49.7, 47.4, 47.6, 48.2, 47.4 | 47.6 | 48.1 |
| Skill-Routing-Vertrag | 5 / 5 | 34.2, 35.2, 35.4, 34.0, 34.3 | 34.3 | 34.6 |
| Lokale Markdown-Links | 5 / 5 | 498.1, 496.1, 474.8, 473.9, 484.5 | 484.5 | 485.5 |

## Was diese Beobachtung zeigt und was nicht

Das ist brauchbare technische Evidenz: Die sieben benannten Prüfungen blieben in fünf aufeinanderfolgenden lokalen Läufen stabil, und die Linkprüfung war in dieser kleinen Stichprobe am langsamsten. Es handelt sich nicht um einen Benchmark für das Buch, ein Modell oder einen Skill.

Diese Zahlen zeigen insbesondere nicht, dass Leser schneller lernen, ein Skill die Produktivität erhöht, ein Modell sicherer oder genauer ist oder sich der IQ einer Person verändert hat. Das Repository verfügt weder über ein validiertes psychometrisches Instrument noch über qualifizierte Beurteiler oder eine ethische Grundlage für eine solche Behauptung. IQ ist hier keine operative Projektmetrik.

Das separate [Shift-Handoff-Pilotprotokoll](shift-handoff-pilot-protocol-v1.md) beschreibt, was für die Beobachtung eines wesentlich engeren Prozessergebnisses nötig wäre. Der Anfangsstatus bleibt `candidate / not_run`, bis autorisierte, de-identifizierte Laufprotokolle vorliegen und von einer unabhängigen bewertenden Person geprüft wurden.

## Die technische Beobachtung reproduzieren

Verwende die in [AGENTS.md](../../AGENTS.md) dokumentierte Projektumgebung. Führe die sieben im JSON aufgeführten Befehle fünfmal in derselben Reihenfolge aus und bewahre die vollständige Ausgabe, den Exit-Code, die Commit-ID, das Betriebssystem, die Laufzeitumgebung und den Zustand des lokalen Arbeitsbaums auf. Vergleiche Laufzeiten verschiedener Rechner nicht als Produktivitätswert. Ein Vergleich mit einem sauberen Checkout oder CI wäre eine neue Beobachtung, nicht die Fortsetzung dieser Messung.

## Evidenzgrenze

Die Beobachtung beschränkt sich auf die genannten statischen und strukturellen Prüfungen. Ihr Bestehen belegt weder das Verständnis von Lernenden noch das Laufzeitverhalten von Skills, automatisches Auslösen, die Semantik von Quellen, Übersetzungsqualität, Browserverhalten, Deployment, Sicherheit, Nutzen oder Veröffentlichungsreife.
