<!-- content_id: lab-007-action-boundaries | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-11 -->

# Lab 007: Eine README-Aufgabe hinter drei Handlungsgrenzen

---
id: lab-007-action-boundaries
title: "Autorisierung, Stopps und Evidenz in drei Oberflächen üben"
level: L3
domain: general
goal: "Grenzsymptome aus öffentlichen Berichten in eine risikoarme, beobachtbare und reversible Übung überführen"
setup: "Redigierte README-Aufgabe, lokale Kopie, isoliertes Worktree oder Simulation und ein zweites Organisations-Simulationsverzeichnis; kein echter Token"
task: "In drei Oberflächen beobachten, die kleinste lokale Änderung durchführen und Status, Symptome, Prüfungen und Evidenz aufzeichnen; kein echter Push und keine Veröffentlichung"
evidence:
  - "Pro Szenario eine Karte, die eingeloggt, autorisiert, ausgeführt und verifiziert trennt"
  - "Symptomkarten, kleinste Diagnosefolge, Stopbedingungen und Evidenztabelle"
  - "Diff und Rollback für lokale Kopie und Worktree sowie Risiken der Organisationssimulation"
  - "Übertragung auf Dokumentation, Forschung oder Veröffentlichungsvorbereitung"
failure_variant: "Browsererfolg mit Token-Austausch, authentifizierten Host mit Zielhost, Organisationszugriff mit Installation in einer anderen Organisation oder Verifikation mit Recht zur Zwangsinstallation verwechseln"
reflection: "Welche Phase wird durch bereits eingeloggt verborgen? Welche Prüfung erhöht Evidenz ohne mehr Autorität? Wie verändern Oberflächen Rollback und Review?"
status: draft
last_verified: "Nicht ausgeführt; echte Drei-Oberflächen-Übung steht aus"
transfer_task: "Die Grenzkarte auf eine Aufgabe ohne echtes externes Schreiben übertragen"
transfer_domain: "Releasevorbereitung, Forschung, Content und Teamfreigabe"
transfer_evidence: "Redigierte Karten, Zustände, Symptome, Logs, Prüfungen und Rollback"
transfer_limitations: "Beweist keine Verfügbarkeit realer Konten, Enterprise-Hosts, Installationen, Connectoren, Veröffentlichungs- oder Remote-Rollback-Ketten"
---

## Problem und feste Eingabe

Öffentliche Berichte vermischen logged in, erreichbar, autorisiert, ausgeführt und
verifiziert. Beispiele sind ein Fehler beim Token-Austausch nach Browsererfolg,
unterschiedliche Hosts bei Enterprise-CLI und PR-Einstieg, fehlende Installation
für eine zweite Organisation und eine erzwungene Neuinstallation zur Verifikation.
Das sind Nutzerberichte, keine lokale Reproduktion und keine offizielle Ursache.

Verwende keine echte Organisation, keinen Remote, Token, Cookie, Schlüssel,
Umgebungsdatei, Produktionsdatei oder personenbezogene Daten. Erstelle:

~~~text
fixture-readme/
└── README.md
~~~

~~~markdown
# Acme Notes

This is a redacted practice repository.

## Status

- owner: redacted
- source: local fixture
~~~

Füge unter Status genau eine Zeile boundary: local-only ein, erhalte alles andere,
zeige Diff und Prüfung und ändere nur README.md. Ohne neue ausdrückliche Autorisierung
kein Commit, Push, Publish, keine Installation und keine dauerhafte Umgebung. Externe
Aktionen bleiben not_run; Rollback ist Kopie wiederherstellen oder Zeile entfernen.

## Drei Oberflächen

**A lokale Kopie:** Absolutpfad und baseline hash notieren, eine Zeile bearbeiten,
Diff und Offline-Prüfung speichern. Konto, Remote und Veröffentlichung bleiben not_run.

**B isoliertes Worktree:** Wegwerf-Git oder worktree-simulation benutzen. Hauptbaum,
Branch, Basis-Commit und isolierten Pfad notieren, nur dort ändern und Hauptbaum prüfen.
Kein Commit, Push oder Publish.

**C Organisationssimulation:** Ein als organization-like-simulation bezeichnetes zweites
Verzeichnis nutzen. Keine Organisation, Enterprise, Connector, Remote oder Netzwerk
verbinden. Sichtbarkeit, Mitarbeiter, Branch-Schutz, Installationsumfang und Rollback-
Verantwortung neu bewerten. Technische Schreibbarkeit ist keine Organisationsfreigabe.

## Symptomkarten

| Karte | Symptom | Sicher zu notieren | Nicht folgern | Kleinste Prüfung |
|---|---|---|---|---|
| S-02 | Browserauthentifizierung erfolgreich, Token-Austausch scheitert | Nur Browserphase erfolgreich | vollständige Anmeldung oder Ursache bekannt | Phasen trennen und redigierten Fehler speichern |
| S-03 | Enterprise-CLI authentifiziert, PR-Einstieg prüft github.com und gibt 401 | Hosts können verschieden sein | ganz GitHub sei verfügbar | Host, Remote und Einstieg lesend vergleichen |
| S-04 | Zugriff auf eine Organisation erzeugt keine Installation in einer zweiten | Identity, Organisation, Installation und Repozugriff sind getrennt | Admin-Zugriff genüge | Zustände notieren, keine Installation anfordern |
| S-11 | Verifikation wird zu force reinstall oder dauerhafter Ersetzung | Verifikation ist keine Installationsfreigabe | technische Ausführbarkeit sei Erlaubnis | Diff bewahren und isoliert/statisch prüfen |

Jede Karte erhält den Hinweis: Quelle user report, lokale Reproduktion nicht erfolgt,
offizielle Ursache nicht bestätigt.

## Zustandskarte

~~~text
run_id:
scenario: local | worktree | organization-like-second-directory
fixture_path:
baseline_hash_or_commit:
surface_and_version:
source_present: planned | authorized | executed | verified | not_run
source_read: planned | authorized | executed | verified | not_run
local_edit: planned | authorized | executed | verified | not_run
check_or_test: planned | authorized | executed | verified | not_run
commit: planned | authorized | executed | verified | not_run
push: planned | authorized | executed | verified | not_run
publish: planned | authorized | executed | verified | not_run
identity_observed:
action_authorized:
result_verified:
external_state_changed:
rollback_entry:
stop_reason_or_next_check:
evidence_paths:
~~~

Beobachtete Identität ist keine Autorisierung; ausgeführt ist nicht verifiziert;
ein schreibbares Verzeichnis erlaubt kein gemeinsames oder Remote-Schreiben.

## Reflexion

Bevor ein Zustand als `verified` markiert wird, notiere die stützende Beobachtung, die
noch unbekannte Phase und ob die nächste Prüfung Information ohne weiteren externen
Nebeneffekt liefert.

## Kleinste Diagnosefolge, Stop und Evidenz

1. Exakten Pfad, Ziel, Host, Datenumfang und verbotene Aktionen festhalten.
2. Hash, git status, Branch, Worktree und Originalaufgabe sichern.
3. Phase bestimmen: Einstieg, Identität, Ziel, Autorisierung, Ausführung, Verifikation.
4. Dateien, Pfade, Konfigurationsform, Hosts und redigierte Logs lesend prüfen.
5. Im Fixture genau eine reversible Änderung machen und Diff und Rückgabe speichern.
6. Sichtbarkeit und Rollback-Verantwortung der drei Oberflächen vergleichen.
7. Nur bei passender Evidenz verified schreiben, sonst unverified oder blocked.

Bei unklarem Umfang, Commit/Push/Publish/Installation, Geheimnis, personenbezogenen
Daten, unklarer Genehmigung, externem Konto, dauerhafter Umgebung, Force-Aktion oder
unbekanntem Schreiben stoppen. Eine Evidenztabelle mit Aufgabe, Oberfläche, Baseline,
fünf Berechtigungsfeldern, Symptom, Aktion, Ergebnis, Zustand, Rollback und externen
Aktionen einreichen; externe Aktionen ausdrücklich als not_run markieren.

## Fehler, Übertragung und Abnahmecheckliste

Nur im Fixture behandeln: Browser war erfolgreich, CLI ist eingeloggt, Nutzer ist
Administrator, zur Verifikation neu installieren. Jeweils fehlende Evidenz und
kleinere Prüfung notieren. Danach Karten auf Quelltabellen, Release-Notizen oder
redigierte PR-Prüfung ohne echtes Schreiben übertragen.

Bestanden ist die Übung nach Wiederholung in drei Oberflächen, Trennung der vier
Zustände, Behandlung von S-02/S-03/S-04/S-11 als Nutzerberichte, gesicherter
Baseline, keinem Force-Befehl als Beweis, vollständigen Karten und Übertragung.
Token, Push, Publish, Installation, Deployment, Nachricht und dauerhafte Ersetzung
bleiben not_run.

## Quellen und Grenzen

Codex-Problem- und Forenrecherche liefern Symptome und Community-Kontext, keine
lokalen Reproduktionen oder offiziellen Reparaturen. Das Fixture ist original und
reversibel, beweist aber keine realen Konten, Connectoren, Enterprise-, Publish-
oder Remote-Rollback-Ketten.
