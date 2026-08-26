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

## Warum dieses Lab existiert

Öffentliche Feldberichte beschreiben Agents, die nach einer Kontextkomprimierung,
einer Kapazitätsunterbrechung oder einer Wiederaufnahme zu einer älteren Aufgabe
zurückkehren. Ein neuer Prompt kann den Lauf aktiv aussehen lassen, obwohl der
Aufgabenzeiger, der Arbeitsbaum oder der Zustand früherer Außenwirkungen unsicher
bleibt. Dieses Lab übt den Abgleich vor dem Fortsetzen.

## Vorbereitung

Verwende eine temporäre Kopie eines kleinen Repositorys oder einen Ordner mit zwei
Textdateien. Erstelle einen Checkpoint, der Ziel, Zielpfad, Branch, letzte
abgeschlossene Aktion, ausstehende Aktion, Berechtigungsstatus und Belege nennt.
Simuliere eine Unterbrechung, indem du einen zweiten Task startest oder den
Checkpoint durch eine ältere Kopie ersetzt. Nutze keine Zugangsdaten,
Netzwerkzugriffe, Produktionsdateien oder irreversiblen Befehle.

## Aufgabe

1. Erfasse aktuelles Arbeitsverzeichnis, Repository-Root, Branch, Zieldatei, Hash
   oder Änderungszeit und den aktuellen Diff.
2. Vergleiche diese Beobachtungen mit dem Checkpoint.
3. Klassifiziere jedes Feld als `matched`, `changed` oder `not_observed`.
4. Setze nur fort, wenn Ziel, Zielobjekt, Berechtigung und Zustand der
   Außenwirkungen abgeglichen sind. Erstelle sonst einen neuen Checkpoint und
   stoppe.

## Nachweise

Bewahre Checkpoint, Befehle und Ausgaben, Diff, Klassifikationstabelle und eine
kurze Entscheidung auf. Ein erfolgreicher Übungsbeleg zeigt nur, dass das
Abgleichverfahren im temporären Fixture befolgt wurde.

## Fehlerfall

Lass den sichtbaren Aufgabennamen gleich, ändere aber Repository-Root oder
Zieldatei. Richtig ist, vor der Bearbeitung zu stoppen und das erste nicht
abgeglichene Feld zu benennen. Repariere nicht den falschen Checkout, nur weil er
beschreibbar ist.

## Übertragung

Übertrage den Rahmen auf eine Browser- oder MCP-Sitzung: Ermittle die letzte
bestätigte Anfrage, das Zielkonto oder die Zielressource, den Freigabestatus und
das Risiko, dass ein früherer Aufruf den Remote-Zustand verändert hat.

## Abnahme-Checkliste

- [ ] Ich habe tatsächlichen Pfad, Repository, Branch, Ziel und Diff erfasst.
- [ ] Ich habe den Live-Zustand mit einem benannten Checkpoint verglichen.
- [ ] Ich habe verändert und nicht beobachtet getrennt.
- [ ] Ich habe bei unsicherem Ziel oder Zustand der Außenwirkungen gestoppt.
- [ ] Ich habe einen fortgesetzten Prompt nicht als Kontinuitätsbeweis bezeichnet.

## Reflexion

Notiere, welches Feld du am leichtesten angenommen hast, welche Beobachtung die
Entscheidung verändert hat und was weiterhin `not_observed` ist.

## Quellen

- [Feldprobleme und Prompt-Muster — P2](../../docs/research/field-problems-and-prompt-patterns-p2-2026-08-11.md), FP2-01 bis FP2-04 und FP2-08.
- [Kapitel 10: Planung und vertikale Schnitte](../chapters/10-planning-and-slicing-DE.md).
- [Kapitel 12: Agent-Schleife, Zustand und Stoppbedingungen](../chapters/12-agent-loop-and-stop-DE.md).

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-013-l3-vertical-slice-DE.md">← Vorheriges<br><strong>Lab 013 · Prüffähiger vertikaler Schnitt</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-015-evidence-delivery-DE.md">Nächstes Lab →<br><strong>Lab 015 · Übergabe mit Evidenz</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
