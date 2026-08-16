<!-- content_id: chapter-20-personal-codex-work-system | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 20: Ein persönliches Codex-Arbeitssystem aufbauen

**Status:** `candidate`. **Experimentstatus:** `draft / not_run`. Dieses Kapitel zeigt eine übertragbare Methode; es setzt nicht voraus, dass Memory, automatisches Laden oder Einstiegspunkte eines Produkts dauerhaft sind.

## Das Problem

Viele Menschen erklären Projekt, Ziel, Begriffe, Grenzen und Abnahme jedes Mal neu. Daraus entstehen inkonsistenter Kontext, nicht nachvollziehbare Entscheidungen, wiederverwendete veraltete Befehle und Erfahrungen, die nicht in die nächste Aufgabe gelangen. Ein ernsteres Risiko ist, eine persönliche Komfortnotiz als Speicher für Tokens, Passwörter, Cookies, Kundentext oder unbestätigte Schlüsse zu nutzen.

## Fünf Assets mit fünf Aufgaben

| Asset | Frage | Lebenszyklus | Ausschließen |
|---|---|---|---|
| Projektregeln | Was muss das Projekt immer einhalten? | Versioniert, bewusst geändert, geprüft | Temporäre Vermutungen und Geheimnisse |
| Aufgaben-Kontext | Was ist diesmal zu tun? | Pro Aufgabe erstellt und archiviert | Unverbundene Historie |
| Aktueller Zustand | Was wurde gelesen, geändert, verifiziert oder blockiert? | An Checkpoints aktualisiert | Als Ergebnis dargestellte Pläne |
| Vorlage | Wie startet und übergibt man ähnliche Arbeit? | Nach wiederholter Praxis extrahiert | Unverifizierte dauerhafte Schlüsse |
| Reflexion | Was funktionierte, scheiterte oder ändert sich? | Nur übertragbare Lehren | Tokens, Cookies, Kundentext, unnötige persönliche Daten |

Mehr Kontext ist nicht automatisch besser. Relevanz, Vertrauenswürdigkeit, Sensitivität und Aktualität zählen mehr als Länge.

## Skill erstellen oder Protokoll behalten?

| Beobachtung | Entscheidung | Nötige Evidenz |
|---|---|---|
| Einmalig oder Ein-/Ausgabe ändern sich noch | Aufgabenprotokoll behalten | Input, Grenzen, Entscheidungen und Übergabe einer Aufgabe |
| Inputs, Entscheidungspunkte und Outputs stabil, mit Positiv- und Fehlerbeispielen | Skill-Kandidat erstellen | Mindestens drei Läufe, Fehlerset, Transferaufgabe |
| Methode nützlich, aber Trigger oder Nebenwirkung unklar | Weiter beobachten oder blockieren | Lückenrecord, Risiko, offene Validierung |
| Geheimnisse, externe Writes oder Produktionsrelease mit unklarer Autorisierung/Rollback | Blockieren | Berechtigungsmatrix, menschliche Freigabe, Rollbackplan |

Ein zufälliger Erfolg begründet keinen Skill. Halte Decision-ID, wiederkehrende Aufgabe, Kandidaten-Asset, stabile Inputs, Fehler, Evidenz, Owner, Review und Aktion fest.

## Das kleinste persönliche Paket

Beginne mit Projektkarte, Aufgabenprotokoll, Zustandslog, Evidenzindex und Reflexion. Beim Start prüfst du Regeln, Branch, Zustand und Berechtigungen. Während der Ausführung trägst du nur nötigen Kontext. Bei der Übergabe trennst du verifiziert von offen. In der Reflexion ziehst du eine Regel heraus, die andere verstehen und prüfen können.

Eine Übergabe nennt Änderungen, tatsächlich gelaufene Befehle, Resultate und Exit Codes, unverifizierte oder außerhalb des Umfangs liegende Punkte, Risiken, Wiederherstellung und nächsten Owner. Mache aus persönlicher Gewohnheit keine Produktgarantie; prüfe aktuelle offizielle Dokumentation und die autorisierte Surface.

## Übung und Grenze

Klassifiziere in einer temporären Kopie vier feste Hinweise: mobilen Überlauf mit Screenshot ohne Fix, bestandenen Build ohne Nutzerabnahme, Authentifizierungsfehler ohne Version/Einstieg/Log und Copy-Update ohne Publikum/Quelle. Vergleiche A mit nur Task/Input gegen B mit den fünf Records. Stelle identischen Input und Baseline wieder her, führe jeden Weg zweimal aus und bewahre Hash, `run_id`, Klärungen, tatsächliche Änderungen, Validierung, sechs Evidenzteile, Nacharbeit, Unverifiziertes und Status auf.

Füge einen alten Befehl und ein altes Verzeichnis als Fixture hinzu, markiere beides `stale` und stoppe die Wiederverwendung. Erst vier vollständige Logs ohne Geheimnisse oder externe Nebenwirkungen und geprüftes Acceptance lassen das Experiment bestehen. Auch dann werden Skill oder echtes Memory-Verhalten nicht verifiziert.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="19-evaluate-models-and-workflows-DE.md">← Vorheriges<br><strong>Kapitel 19 · Modelle und Workflows evaluieren, von Eindrücken zu Evidenz</strong></a></td><td align="right"><a data-chapter-nav="next" href="21-team-capability-system-DE.md">Weiter →<br><strong>Kapitel 21 · ein Team-Fähigkeitssystem aufbauen</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
