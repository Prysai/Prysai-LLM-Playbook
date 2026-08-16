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

## Persönliche Gewohnheit in eine prüfbare Übergabe verwandeln

Ein persönliches Arbeitssystem ist kein Ort, an dem alles notiert wird. Es soll beim Start der nächsten Aufgabe rasch drei Fragen beantworten: Was ist zu liefern? Welche Tatsachen wurden tatsächlich geprüft? Wo muss die Arbeit anhalten, um einen Menschen zu fragen? Hilft ein Record dabei nicht, wird er gekürzt statt weiter angehäuft.

```yaml
handoff_id: personal-system-20-example
goal: "Entscheiden, ob vier Problemberichte sicher weitergehen können"
read: ["Projektregeln", "Task-Input", "aktueller Zustand"]
changed: []
verified: ["Input-Hash", "aktueller Branch", "keine externen Writes"]
not_verified: ["echter Sign-in-Einstieg", "Nutzerabnahme des Builds"]
blocked_by: ["Version, Einstieg und Error-Log fehlen"]
next_owner_action: "fehlenden Input ergänzen und neu klassifizieren"
recovery: "temporäre Records löschen und saubere Kopie wiederherstellen"
```

In `verified` steht nur, was wirklich geprüft wurde. Pläne, Vorhersagen und „hat früher funktioniert“ gehören nach `not_verified` oder `blocked_by`. So verwechselt die nächste Person die Übergabe nicht mit einer Fertigmeldung.

## In zehn Minuten starten: eine Karte für die nächste Aufgabe

Du musst nicht zuerst ein kompliziertes „zweites Gehirn“ bauen. Bevor du das Modell Dokumentation ändern, Quellen ordnen oder Code prüfen lässt, füllst du diese Karte in drei Minuten aus und ergänzt sie nach der Arbeit in zwei weiteren Minuten. Sie ist leichter zu prüfen und zu übergeben als ein langer Chatverlauf.

```text
Ziel: Welches konkrete Ergebnis wird benötigt?
Input: Welche Dateien, Texte oder Links dürfen verwendet werden?
Grenzen: Was darf nicht geändert werden, und wofür muss vorher gefragt werden?
Abnahme: Welche Datei, welcher Test, welche Seite oder welcher Record prüft das Ergebnis?
Ergebnis: Was änderte sich wirklich, welche Befehle liefen, welche Evidenz fehlt?
Nächster Schritt: Wer macht unter welcher Bedingung weiter?
```

„README verbessern“ ist noch keine übergebbare Aufgabe. Formuliere stattdessen: „Nur die ersten drei Absätze von `README.md` umschreiben; Lizenz, Links und Faktenbehauptungen nicht ändern; lokale Links prüfen; ungeprüfte Produktfakten als offen markieren.“ Dann ist klar, was das Modell tun darf, was nicht, und was am Ende bleiben muss. Vorschläge des Modells gehören zunächst nach „zu prüfen“, nicht direkt nach „Ergebnis“.

## Ergänzung zur Übung: veraltete Information zuerst erkennen

Lege vor einem A/B-Lauf einen alten Befehl und ein nicht mehr vorhandenes Verzeichnis in die `project-map`, ohne sie auszuführen. Lass Quelle, letztes Bestätigungsdatum, aktuellen Status und sichere Prüfmethode notieren. Die richtige Reaktion ist nicht „noch einmal ausführen“: Lies den aktuellen Zustand innerhalb der Berechtigung, markiere `stale` und erhalte die Unsicherheit.

1. Ist der aktuelle Zustand nicht prüfbar, setze `blocked`; vermute nicht, dass der Befehl noch gilt.
2. Existiert das Verzeichnis, ist sein Zweck aber unklar, dokumentiere nur die Beobachtung und benutze es nicht als Write-Ziel.
3. Sind Account, Netzwerk oder externer Write nötig, halte an und fordere klare Autorisierung an.
4. Behalte in der Reflexion nur eine übertragbare Regel wie „Quelle und Datum beim Start prüfen“, nicht den alten Befehl als dauerhafte Vorlage.

## Selbstcheck

- [ ] Eine neue Person findet Ziel, Evidenz und Blockade ohne mündliche Ergänzung.
- [ ] Ich kann erklären, warum ein Record `stale` ist und welche Minimalaktion zum aktuellen Fakt zurückführt.
- [ ] Ich behandle persönliche Notizen nicht als Geheimnisspeicher, Produkt-Memory-Garantie oder verifizierten Skill.
- [ ] Ich unterscheide fehlenden Input, mögliche Ausführung und nötige menschliche Bestätigung.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="19-evaluate-models-and-workflows-DE.md">← Vorheriges<br><strong>Kapitel 19 · Modelle und Workflows evaluieren, von Eindrücken zu Evidenz</strong></a></td><td align="right"><a data-chapter-nav="next" href="21-team-capability-system-DE.md">Weiter →<br><strong>Kapitel 21 · ein Team-Fähigkeitssystem aufbauen</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
