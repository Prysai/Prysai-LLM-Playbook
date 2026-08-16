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

## Das Problem

Ein Befehl kann laufen, während seine Ausgabe verborgen, gekürzt, an das falsche Arbeitsverzeichnis gebunden oder für den behaupteten Schluss zu schwach ist. Dieses Lab verwandelt „fertig“ in ein Anspruch-Evidenz-Protokoll.

## Vorbereitung und Aufgabe

Erstelle eine Wegwerf-Textänderung, einen fokussierten und einen absichtlich fehlenden Check. Bereite eine anonymisierte Übergabe mit Quellenanspruch, Checkanspruch und Laufzeit- oder Nutzerwirkungsanspruch vor. Nutze keinen echten Dienst und keine Nutzerdaten. Notiere je Anspruch:

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

Eine zweite Reviewperson oder frische Sitzung soll Ansprüche ohne Evidenz, außerhalb des Umfangs oder nur aus einer anderen Zeile abgeleitete Ansprüche zurückweisen.

## Fehler und Grenzübung

Entferne die Ausgabedatei, aber lasse den Befehlsnamen in der Übergabe. Der korrekte Status ist `unverified` oder `not_run`, nicht „wahrscheinlich bestanden“. Ohne Netzwerk lassen sich Grenzen modellieren: mehr Text als ein Terminal zeigt, BMP- und Nicht-BMP-Zeichen vor Toolaufruf vergleichen oder — falls unterstützt — einen langen normalen Testdateinamen verwenden. Ein lokales Fixture ist kein Nachweis, ein fremdes Problem reproduziert zu haben.

## Abnahme und Transfer

- [ ] Jeder Fertigsatz ist in einen Anspruch mit Umfang zerlegt.
- [ ] Befehle enthalten Pfad, Ausgabe und Exit-Code.
- [ ] Fehlende Evidenz ist explizit.
- [ ] Ein späterer Erfolg überschreibt keine frühere Ungewissheit.
- [ ] Die Übergabe nennt nächsten Check und Stoppbedingung.

Übertrage die Tabelle auf eine statische Website: Trenne Quelldateien, gebautes Artefakt, Browser-Render, Screenshot-Review und erreichbare öffentliche URL. Dieses Lab bleibt `draft / not_run`; ein Quellencheck beweist weder visuelle Laufzeit noch Nutzerakzeptanz.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-014-resume-reconciliation-DE.md">← Vorheriges<br><strong>Lab 014 · Abgleich beim Fortsetzen</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-016-side-effect-boundary-DE.md">Nächstes Lab →<br><strong>Lab 016 · Grenze von Nebenwirkungen</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
