<!-- content_id: lab-013-l3-vertical-slice | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-013-l3-vertical-slice
title: "Einen vollständigen vertikalen Schnitt ausführen"
level: L3
domain: engineering
goal: "Eine begrenzte Änderung von der Definition bis zu Evidenz und Übergabe führen"
setup: "Wegwerfkopie eines Repositories, ein erlaubter Markdown-Ausgabepfad, keine Veröffentlichung oder Zugangsdaten"
task: "CP0 bis CP4 für eine Release-Note durchlaufen, mit fokussiertem Check, Fehlerzweig und Übergabe in frischem Kontext"
evidence: ["Eingabe-hashes, Basiszustand, Checkpoints und Aktionslog", "Diff, Befehlsausgabe, Exit-Codes und Anspruch-Evidenz-Tabelle", "Fehlerprotokoll, Übergabe, Rollback und unbestätigte Punkte"]
failure_variant: "Eine erforderliche Eingabe entfernen, den Check scheitern lassen, nach CP2 fortsetzen, externe Anweisung einschleusen oder dauerhafte Umgebungsänderung verlangen"
reflection: "Welcher Checkpoint verhinderte den größten unbelegten Anspruch oder die unnötigste Aktion?"
status: draft
last_verified: "Maintainer reference run accepted 2026-08-12; learner run not run"
transfer_task: "Den Checkpoint-Ablauf auf eine risikoarme Recherche- oder Inhaltsaufgabe übertragen"
transfer_domain: "Engineering, Recherche oder Inhalt"
transfer_evidence: "Neu geschriebenes Aufgabenprotokoll, Checkpoints, Artefakt oder Blockierungsprotokoll, Evidenztabelle, Übergabe"
transfer_limitations: "Ein lokaler Schnitt beweist weder Remote-Veröffentlichung noch Produktionsverhalten oder Leserakzeptanz"
---

# Lab 013: Einen vollständigen vertikalen Schnitt ausführen

## Lernziel und Vorbereitung

Führe einen kleinen Ablauf aus, ohne Planung, Bearbeitung, Check, Review, Übergabe und Veröffentlichung zu verwechseln. Nutze eine Wegwerfkopie; nur eine Markdown-Release-Note an einem benannten Pfad darf geändert werden. Notiere Eingaben und hashes, anfänglichen `git status`, erlaubten Pfad, Abnahme, Rollback und verbotene Aktionen. Veröffentlichen, Pushen, Abhängigkeiten installieren und Zugangsdaten verwenden liegen außerhalb des Umfangs.

| Checkpoint | Erforderliche Evidenz |
|---|---|
| CP0 Definition | Ziel, Eingaben, Umfang, Rechte, Stopps, Basis-hash |
| CP1 Plan | kleinster Schnitt, Methode, erwartete Evidenz, Rollback |
| CP2 Änderung | Diff, geänderte Pfade, Aktionslog, Ausgabe-hash |
| CP3 Verifikation | Befehle, Roh-Ausgabe, Exit-Codes, Abdeckung, nicht ausgeführte Checks |
| CP4 Übergabe | fertig, unvollständig, Evidenz, Unbekanntes, nächster Check, Rollback |

## Experiment und Fehler

Schreibe die Note nur mit Fakten aus der Eingabe. Prüfe, dass nur der erlaubte Pfad geändert wurde, erforderlicher Inhalt vorhanden ist und keine unbelegten Ansprüche hinzukamen. Ein erfolgreicher Diff beweist weder Veröffentlichung, Leserverständnis noch Remote-Synchronisierung.

Führe mindestens einen Fehlerfall aus: erforderliche Eingabe entfernen und stoppen; fokussierten Check scheitern lassen und Ausgabe bewahren; nach CP2 mit nur Checkpoints und Repositoryzustand in frischem Kontext fortsetzen; eine Token-Upload-Anweisung als Daten behandeln; bei einer nicht autorisierten dauerhaften Änderung stoppen. Wiederhole erst, wenn sich die Diagnose verändert hat und vorhandene Nebenwirkungen verstanden sind.

- [ ] Ziel, Umfang, Autorität, Abnahme und Rollback sind explizit.
- [ ] CP0–CP4 sind bewahrt, und nur der erlaubte Pfad änderte sich.
- [ ] Befehle enthalten Roh-Ausgabe und Exit-Status.
- [ ] Mindestens ein Fehlerzweig stoppte oder erholte sich korrekt.
- [ ] Die Übergabe trennt lokalen Abschluss von Veröffentlichung oder Produktion.

Bewahre hashes, Checkpoints, Diff, Aktionslog, Befehlsausgabe, Fehlerprotokoll, Anspruch-Evidenz-Tabelle und Übergabe auf. Dieses Lab bleibt `draft / not_run`. Ein deterministisches Referenzpaket des Maintainers beweist weder Lernenden-Unabhängigkeit noch Codex-Verhalten, Transfer oder Produktion.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-012-team-capability-migration-DE.md">← Vorheriges<br><strong>Lab 012 · Migration von Teamfähigkeiten</strong></a></td><td align="right"><a data-lab-nav="next" href="../README-DE.md">Nächstes Lab in Arbeit →<br><strong>Verfügbarkeit von Lab 014 ansehen</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
