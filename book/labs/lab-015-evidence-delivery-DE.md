<!-- content_id: lab-015-evidence-delivery | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-015-evidence-delivery
title: "Evidenz statt einer Fertigmeldung übergeben"
level: L5
domain: general
goal: "Abschlussansprüche in Evidenzprotokolle mit Umfang zerlegen und den kleinsten nächsten Check bestimmen"
setup: "Wegwerf-Textänderung, ein fokussierter Check, ein absichtlich fehlender Check und anonymisierte Übergabe; kein echter Dienst oder Nutzerdaten"
task: "Jeden Quellen-, Check- und Laufzeitanspruch mit Umfang, Befehl oder Beobachtung, Ergebnis, gespeicherter Ausgabe, Status und nächstem Check dokumentieren"
evidence: ["Anspruch-Evidenz-Tabelle, Roh-Ausgabe, Diff, Reviewentscheidung", "Explizite Unterscheidung von verified, partial, unverified, blocked und not_run"]
failure_variant: "Ausgabedatei entfernen und nur Befehlsnamen in der Übergabe lassen; unverified oder not_run markieren"
reflection: "Welcher Anspruch war breiter als seine Evidenz und welcher kleine Check schließt die Lücke?"
status: draft
last_verified: "not run"
transfer_task: "Die Tabelle auf eine statische Website anwenden und Quelle, Build, Browser, Screenshot, öffentliche URL trennen"
transfer_domain: "Webveröffentlichung, Dokumentation, Recherche oder Engineering"
transfer_evidence: "Eine Zeile pro Anspruch mit Umfang, Befehl oder Beobachtung, Ergebnis, Ausgabepfad und Grenze"
transfer_limitations: "Ein Quellencheck beweist weder visuelle Laufzeit noch Nutzerakzeptanz oder öffentliche URL"
---

# Lab 015: Evidenz statt einer Fertigmeldung übergeben

## Warum dieses Lab existiert

Ein Befehl kann laufen, während seine Ausgabe verborgen, gekürzt, an das falsche
Arbeitsverzeichnis gebunden oder für den behaupteten Schluss zu schwach ist. Dieses
Lab macht aus „fertig“ ein Protokoll, das jeden Anspruch mit einem Beleg verbindet.

## Vorbereitung

Erstelle eine temporäre Textänderung, einen fokussierten Check und einen absichtlich
fehlenden Check. Bereite eine anonymisierte Übergabe mit einem Quellenanspruch,
einem Checkanspruch und einem Laufzeit- oder Nutzerwirkungsanspruch vor. Nutze
keinen echten Dienst und keine Nutzerdaten.

## Aufgabe

Notiere für jeden Anspruch:

```text
Anspruch:
Umfang:
Befehl oder Beobachtung:
Arbeitsverzeichnis:
Exit-Code / Ergebnis:
Gespeicherte Ausgabe:
Status: verified | partial | unverified | blocked | not_run
Kleinster nächster Check:
```

Eine zweite Reviewperson oder eine frische Sitzung soll jeden Anspruch zurückweisen,
für den ein Beleg fehlt, dessen Umfang größer als die Prüfung ist oder der nur aus
einer anderen Zeile abgeleitet wurde.

## Nachweise

Bewahre Anspruchstabelle, rohe Befehlsausgabe, Diff und Reviewentscheidung auf. Das
Protokoll muss zeigen, warum ein bestandener Quellencheck weder visuellen Laufzeit-
Erfolg noch Nutzerakzeptanz beweist.

## Fehlerfall

Entferne die Ausgabedatei, lasse aber den Befehlsnamen in der Übergabe stehen. Der
richtige Status ist `unverified` oder `not_run`, nicht „wahrscheinlich bestanden“.

## Feldvariante: drei Windows-Brüche in der Evidenz

Nutze die drei öffentlichen Berichte in [Kapitel 9](../chapters/09-verification-and-recovery-DE.md) als Referenzfälle. Versuche in diesem Lab nicht, ein externes Produktproblem zu reproduzieren. Erstelle stattdessen harmlose lokale Fixtures, die die Evidenzgrenze modellieren:

1. Erzeuge mehr Text, als der Terminalausschnitt anzeigen kann, speichere denselben
   Inhalt in einer Datei und vergleiche das Dauerhafte mit dem Sichtbaren.
2. Lege BMP- und Nicht-BMP-Zeichen in ein Text-Fixture. Vergleiche die erwartete
   und die empfangene Zeichenfolge vor jedem Toolaufruf; bei einer Abweichung den
   Fall als `blocked` markieren.
3. Erstelle nur dann ein temporäres Git-Repository mit einem absichtlich langen,
   aber gewöhnlichen Testdateinamen, wenn das Dateisystem dies unterstützt.
   Protokolliere Pfadlänge und Git-Ergebnis; erstelle oder lösche keine internen
   Codex-Refs und ändere keine Repository-Konfiguration.

Füge für jeden Fall eine Zeile in die Anspruchstabelle ein:

```text
reported symptom:
local fixture:
source URL:
local reproduction: not_run | observed | blocked
last confirmed stage:
first unknown stage:
durable evidence:
safe next check:
stop condition:
```

Das richtige Ergebnis kann `reference-only`, `not_run` oder `blocked` sein. Ein
lokales Fixture, das eine Grenze modelliert, ist keine Reproduktion des externen
Problems; ein aus einem öffentlichen Bericht kopierter Workaround ist kein
offizieller Fix.

## Übertragung

Wende dieselbe Tabelle auf eine statische Website an. Trenne vorhandene Quelldateien,
gebautes Artefakt, Browser-Render, geprüftes Screenshot und erreichbare öffentliche
URL.

## Abnahme-Checkliste

- [ ] Jeder Fertigsatz ist in einen Anspruch mit Umfang zerlegt.
- [ ] Befehle enthalten Pfad, Exit-Code und gespeicherte Ausgabe.
- [ ] Fehlende Belege sind ausdrücklich markiert.
- [ ] Ein späterer Erfolg überschreibt keine frühere Ungewissheit.
- [ ] Die Übergabe nennt den kleinsten nächsten Check und die Stoppbedingung.

## Reflexion

Bestimme den Anspruch, dessen Umfang größer als seine Evidenz war, und nenne den
kleinsten Check, der die Lücke schließen würde.

## Quellen

- [Feldprobleme und Prompt-Muster — P2](../../docs/research/field-problems-and-prompt-patterns-p2-2026-08-11.md), FP2-05, FP2-06 und FP2-20.
- [Kapitel 9: Verifikation, Zweifel und Wiederherstellung](../chapters/09-verification-and-recovery-DE.md).

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-014-resume-reconciliation-DE.md">← Vorheriges<br><strong>Lab 014 · Abgleich beim Fortsetzen</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-016-side-effect-boundary-DE.md">Nächstes Lab →<br><strong>Lab 016 · Grenze von Nebenwirkungen</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
