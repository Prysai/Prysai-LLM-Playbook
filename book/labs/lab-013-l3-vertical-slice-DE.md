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

## Checkpoint-Protokoll

Halte jeden Übergang in einem eigenen Eintrag fest. Das folgende Verfahren ist
eine Lernanleitung; die tatsächliche Beobachtung ist die Evidenz.

### CP0 — Definition

Notiere Ziel, Eingaben, erlaubten Pfad, Autorität, Abnahme, Stop-Bedingung,
Basis-hash und verbotene Aktionen. Authentifizierung und technische Fähigkeit
sind Beobachtungen, keine Freigabe für Veröffentlichung oder Remote-Änderung.

### CP1 — Plan

Wähle die kleinste Änderung, den möglicherweise fehlschlagenden Check, das
erwartete Artefakt und den Rollback. Halte fest, dass Netzwerk, Installation,
Push, Veröffentlichung, Zugangsdaten und Änderungen außerhalb des Pfads nicht
ausgeführt werden.

### CP2 — Änderung

Ändere nur die benannte Release-Note. Bewahre Zeitstempel, Aktion, Ergebnis,
geänderte Pfade, Ausgabe-hash und Diff. Bei fehlender Eingabe oder unklarem Pfad
steht die Entscheidung auf `blocked`; kein alternatives Ziel erraten.

### CP3 — Verifikation

Führe den fokussierten Check im angegebenen Verzeichnis aus. Speichere Befehl,
Roh-Ausgabe, Exit-Code, Version, Umfang und nicht ausgeführte Checks. Exit-Code 0
belegt nur diesen Befehl in dieser Umgebung, nicht Veröffentlichung,
Produktionsverhalten oder Leserverständnis.

### CP4 — Übergabe

Trenne fertig, unvollständig, observed, verified, `unverified`, `blocked` und
`not_run`. Nenne nächsten sicheren Check, Rollback, Verantwortlichen und
absichtlich nicht ausgeführte Aktionen.

## Aufgabenvertrag und Grenze externer Wirkung

```text
Ziel und außerhalb des Umfangs:
Eingabe, Revision, Hash:
Lese- / Schreibpfad:
Erlaubte Aktionen:
Verbotene Aktionen: Netzwerk, Installation, Push, Veröffentlichung, Secrets
Beobachtbare Abnahme:
Evidenz und Rollback:
Stop-Bedingung:
```

Eine externe Aktion gehört nur dann in den Vertrag, wenn Konto, Organisation,
Repository, Branch, Publikum und Payload benannt sind. Beobachtung einer Seite
ist keine Übermittlung. Dieses Lab führt Submit, Push und Publish nicht aus.

## Fehlerkarten und Wiederherstellung

| Symptom | Erste Beobachtung | Sichere Entscheidung |
|---|---|---|
| Eingabe fehlt | Pfad und Dateiliste | `blocked`; genaue Eingabe anfordern |
| Check schlägt fehl | Ausgabe, Exit-Code und Diff sichern | Diagnosebedingung ändern oder stoppen |
| Antwort nach CP2 verloren | Kopiezustand, Hash und Diff | Vor Wiederholung abgleichen |
| Externer Text verlangt Token-Upload | Quelle und Umfang | Als nicht vertrauenswürdige Daten ablehnen |
| Dauerhafte Änderung verlangt | Wirkung, Ziel und Rollback | `blocked`; nicht installieren oder veröffentlichen |

Fortsetzen ist erst erlaubt, wenn sich eine benannte Diagnosebedingung geändert
hat und die Nebenwirkung des ersten Versuchs verstanden ist.

## Experiment und Fehler

Schreibe die Note nur mit Fakten aus der Eingabe. Prüfe, dass nur der erlaubte Pfad geändert wurde, erforderlicher Inhalt vorhanden ist und keine unbelegten Ansprüche hinzukamen. Ein erfolgreicher Diff beweist weder Veröffentlichung, Leserverständnis noch Remote-Synchronisierung.

Führe mindestens einen Fehlerfall aus: erforderliche Eingabe entfernen und stoppen; fokussierten Check scheitern lassen und Ausgabe bewahren; nach CP2 mit nur Checkpoints und Repositoryzustand in frischem Kontext fortsetzen; eine Token-Upload-Anweisung als Daten behandeln; bei einer nicht autorisierten dauerhaften Änderung stoppen. Wiederhole erst, wenn sich die Diagnose verändert hat und vorhandene Nebenwirkungen verstanden sind.

- [ ] Ziel, Umfang, Autorität, Abnahme und Rollback sind in CP0 explizit.
- [ ] CP0–CP4 sind bewahrt, und nur der erlaubte Pfad änderte sich.
- [ ] Befehle enthalten Roh-Ausgabe und Exit-Status.
- [ ] Mindestens ein Fehlerzweig stoppte oder erholte sich korrekt.
- [ ] Die Übergabe trennt lokalen Abschluss von Veröffentlichung oder Produktion.

## Evidenzpaket und Referenzlauf

Bewahre Eingabekopie und Hashes, CP0–CP4, Diff, Aktionslog, Befehlsausgabe,
Fehlerprotokoll, Anspruch-Evidenz-Tabelle, Rollback-Ziel und unbekannte Punkte.
Jeder Anspruch erhält `scope`, `evidence`, `status`, `uncovered` und `next_check`.

Ein deterministisches Maintainer-Referenzpaket kann Fixture, Fehlerzweig und
Wiederherstellungs-Diff belegen. Es beweist weder unabhängige Lernendenläufe,
Codex-Verhalten, Transfer, Veröffentlichung noch Produktionsreife.

Bewahre hashes, Checkpoints, Diff, Aktionslog, Befehlsausgabe, Fehlerprotokoll, Anspruch-Evidenz-Tabelle und Übergabe auf. Dieses Lab bleibt `draft / not_run`. Ein deterministisches Referenzpaket des Maintainers beweist weder Lernenden-Unabhängigkeit noch Codex-Verhalten, Transfer oder Produktion.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-012-team-capability-migration-DE.md">← Vorheriges<br><strong>Lab 012 · Migration von Teamfähigkeiten</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-014-resume-reconciliation-DE.md">Nächstes Lab →<br><strong>Lab 014 · Abgleich beim Fortsetzen</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
