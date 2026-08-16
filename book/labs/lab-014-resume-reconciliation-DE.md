<!-- content_id: lab-014-resume-reconciliation | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-014-resume-reconciliation
title: "Eine fortgesetzte Aufgabe vor dem Weiterarbeiten abgleichen"
level: L3
domain: general
goal: "Vor dem Fortsetzen Aufgabenzeiger, Ziel, Branch, Rechte und Nebenwirkungszustand abgleichen"
setup: "Wegwerf-Ordner oder Repository mit Checkpoint und zwei Textdateien; keine Zugangsdaten, Netzwerkzugriffe, Produktionsdateien oder irreversiblen Befehle"
task: "Live-Zustand erfassen, mit dem Checkpoint vergleichen, jedes Feld klassifizieren und nur bei Übereinstimmung von Ziel, Zielobjekt, Recht und Nebenwirkung fortfahren"
evidence: ["Checkpoint, Live-Beobachtungen, Befehle, Ausgaben, Diff, Klassifikationstabelle und Fortsetzungsentscheidung", "Klare Aufzeichnung übereinstimmender, veränderter und nicht beobachteter Felder"]
failure_variant: "Aufgabennamen gleich lassen, aber Repository-Root oder Zieldatei ändern; vor dem Bearbeiten stoppen"
reflection: "Welches Feld wurde am leichtesten angenommen und welche Beobachtung änderte die Entscheidung zum Fortsetzen oder Stoppen?"
status: draft
last_verified: "not run"
transfer_task: "Den Abgleichrahmen ohne Remote-Schreibvorgang auf eine Browser- oder MCP-Sitzung anwenden"
transfer_domain: "Browser, Recherche, Engineering oder Inhaltsübergabe"
transfer_evidence: "Vorherige Anfrage, Ziel, Freigabestatus, beobachtetes Remote-Risiko und neuer Checkpoint"
transfer_limitations: "Das Wegwerf-Fixture beweist keine Kontinuität eines echten Kontos, Remote-Objekts oder wiederaufgenommenen Produktionstasks"
---

# Lab 014: Eine fortgesetzte Aufgabe vor dem Weiterarbeiten abgleichen

## Warum dieses Lab nötig ist

Nach einer Unterbrechung kann eine neue Anweisung einen Task aktiv aussehen lassen, obwohl Ziel, Worktree oder frühere Nebenwirkungen unsicher sind. Gleiche den Zustand ab, bevor du fortsetzt. Ein fortgesetztes Gespräch ist kein Kontinuitätsbeweis.

## Vorbereitung und Aufgabe

Verwende eine Wegwerfkopie mit zwei Textdateien. Erstelle einen Checkpoint mit Ziel, Zielpfad, Branch, letzter Aktion, ausstehender Aktion, Berechtigungszustand und Evidenz. Simuliere eine Unterbrechung durch einen zweiten Task oder einen älteren Checkpoint. Keine Zugangsdaten, Netzwerkzugriffe, Produktion oder irreversiblen Befehle.

1. Erfasse aktuelles Verzeichnis, Repository-Root, Branch, Zieldatei, hash oder Änderungszeit und Diff.
2. Vergleiche diese Beobachtungen mit dem Checkpoint.
3. Klassifiziere jedes Feld als `matched`, `changed` oder `not_observed`.
4. Setze nur fort, wenn Ziel, Zielobjekt, Recht und Nebenwirkungszustand abgeglichen sind. Sonst neuen Checkpoint erstellen und stoppen.

## Fehler, Evidenz und Abnahme

Lass den sichtbaren Aufgabennamen gleich, ändere aber Root oder Zieldatei. Stoppe vor dem Bearbeiten und benenne das erste nicht abgeglichene Feld. Repariere nicht den falschen Checkout, nur weil er beschreibbar ist. Bewahre Checkpoint, Befehle, Ausgaben, Diff, Tabelle und kurze Entscheidung auf.

- [ ] Ich habe tatsächlichen Pfad, Repository, Branch, Ziel und Diff erfasst.
- [ ] Ich verglich Live-Zustand und benannten Checkpoint.
- [ ] Ich trennte verändert von nicht beobachtet.
- [ ] Ich stoppte bei unsicherem Ziel oder Nebenwirkungszustand.
- [ ] Ich nannte einen fortgesetzten Prompt nicht Kontinuitätsbeweis.

Übertrage den Rahmen ohne Remote-Schreiben auf Browser oder MCP: bestimme letzte bestätigte Anfrage, Zielkonto oder Ressource, Freigabe und das Risiko, dass ein früherer Aufruf Remote-Zustand änderte. Das Lab bleibt `draft / not_run`; das Fixture beweist keine echte Kontinuität.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-013-l3-vertical-slice-DE.md">← Vorheriges<br><strong>Lab 013 · Prüffähiger vertikaler Schnitt</strong></a></td><td align="right"><a data-lab-nav="next" href="../README-DE.md">Nächstes Lab in Arbeit →<br><strong>Verfügbarkeit von Lab 015 ansehen</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
