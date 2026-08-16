<!-- content_id: lab-001-first-safe-task | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

---
id: lab-001-first-safe-task
title: "Eine begrenzte README-Änderung durchführen und zeigen, was passiert ist"
level: L1
domain: general
goal: "Prüfen vor dem Editieren, minimale Berechtigung, Diff-Review, gezielte Verifikation und ehrliche Wiederherstellung üben"
setup: "Ein wegwerfbares oder nicht-produktives Git-Projekt mit README und einer echten Quelle für lokale Startbefehle; keine Geheimnisse, Kundendaten, Produktionsdateien oder externen Schreibvorgänge"
task: "Codex zuerst prüfen und planen lassen, nach Bestätigung nur README.md ändern und den tatsächlichen Diff sowie die gezielte Prüfung festhalten"
evidence:
  - "Eine Aufgabenkarte mit Ziel, Eingaben, erlaubten und verbotenen Aktionen, Abnahme, Stoppbedingung und Übergabeformat"
  - "Ausgangszustand, Plan, tatsächlicher Diff und die Quelle des Prüfkommandos"
  - "Ein Laufprotokoll, das ausgeführte und nicht ausgeführte Aktionen, Prüfergebnis, Unbekanntes und nächsten Check trennt"
failure_variant: "Den Skriptnamen vom README abweichen lassen, eine reine Leseprüfung mit unvollständiger Ausgabe unterbrechen oder den erlaubten Pfad unzugänglich machen"
reflection: "Welche Bestätigung hat das größte Risiko gesenkt? Was beweist der Diff, und was bleibt nach dem Check offen?"
status: draft
last_verified: "not run"
transfer_task: "Dasselbe Protokoll für eine Recherche mit festen Quellen oder eine statische Textänderung ohne externe Schreibvorgänge einsetzen"
transfer_domain: "research, engineering, content, design, or marketing"
transfer_evidence: "Beide Protokolle, veränderte Evidenzfelder, ein Fehlerprotokoll und eine ausdrückliche Liste ungeprüfter Punkte"
transfer_limitations: "Dieses Lab lehrt eine risikoarme lokale Grenze; es beweist weder Kontoberechtigungen noch Produktionssicherheit, externe Veröffentlichung oder Laufzeitverhalten jeder Codex-Oberfläche"
---

# Lab 001: Eine sichere README-Änderung vornehmen

## Wofür dieses Lab da ist

Dieses Lab führt von der statischen Grenzkarte aus Kapitel 1 zu einer echten,
aber kontrollierten Dateiänderung. Es ist kein Deployment-Test, kein Connector-Test
und kein Beleg dafür, dass eine sichtbare Berechtigungsbezeichnung überall gilt.

Arbeite nur in einem wegwerfbaren oder nicht-produktiven Projekt. Füge niemals
Zugangsdaten, Tokens, Cookies, private Schlüssel, `.env`-Dateien, Kundendaten oder
Produktionskonfiguration in die Aufgabe ein.

## Vorbereitung

1. Wenn kein wegwerfbares Projekt vorhanden ist, beginne mit dem [Fixture für die erste sichere Änderung](../routes/first-safe-change-DE.md). Es braucht weder Git noch Konto, Installation oder Netzwerk.
2. Notiere den absoluten Pfad und in einem Git-Projekt den aktuellen `git status`. Beim Fixture notiere `not a Git sandbox`; erfinde keine Repository-Identität.
3. Sichere die ursprüngliche `README.md` oder lege einen sauberen Checkpoint an.
4. Ermittle die echte Datei, die den lokalen Startbefehl definiert. Erfinde keinen Befehl aus Erinnerung oder Suchergebnissen.
5. Schreibe den einzigen erlaubten Edit auf: `README.md`.
6. Bestätige, dass Installation, Netzwerk, Commit, Push, Veröffentlichung, externe Nachrichten, Lesen von Geheimnissen und Produktionsaktionen nicht dazugehören.

Ist ein Punkt unklar, halte an und notiere `blocked`. Erst zu probieren ersetzt keine Grenzklärung.

## Vier Antworten vor der ersten Aktion

| Frage | Aufzeichnung | Weiter nur wenn | Stopp wenn |
| --- | --- | --- | --- |
| Wo läuft die Aufgabe? | Deklarierte Sandbox, beobachtetes Arbeitsverzeichnis, Git-Root und Branch oder HEAD. Nur das Fixture darf `not a Git sandbox` verwenden. | Das beobachtete Verzeichnis liegt in der Sandbox und alle Kennungen beschreiben dieselbe Kopie. | Eine Kennung fehlt, ist mehrdeutig, liegt außerhalb der Sandbox oder widerspricht einer anderen. |
| Was darf sich ändern? | Nur `README.md`. | Eine vorhandene Datei innerhalb der Sandbox ist das Ziel. | Ein weiterer Pfad nötig ist oder das Ziel nicht bestimmbar ist. |
| Was ist erlaubt? | Prüfen, Plan berichten, nach Freigabe eine Änderung. | Die Aktion ist reversibel und braucht keine neue Berechtigung. | Geheimnisse, Installation, Netzwerk, Commit, Push, Veröffentlichung, Löschen oder externer Schreibzugriff nötig sind. |
| Welche Quittung wird erwartet? | Ausgangszustand, exakter Diff, Befehlsquelle, gezielte Prüfausgabe und Unbekanntes. | Jeder Punkt nach der Aktion prüfbar und speicherbar ist. | Nur eine Statusbehauptung oder eine nicht prüfbare Antwort übrig bliebe. |

Ein leeres Feld oder `unknown` ist ein Stoppsignal, keine Einladung zum Raten.

## Aufgabenkarte für Codex

Ersetze die Werte in spitzen Klammern durch Fakten aus deiner Sandbox.

```text
Run ID: lab001-readme-<date>-<suffix>
Ziel: Einen korrekten Abschnitt zum lokalen Start in <absolute-path>/README.md ergänzen.
Sandbox: <absolute-path>; die einzige editierbare Datei ist README.md.
Zuerst lesen: README.md, package/build manifest und die vorhandene Skriptdatei.
Erlaubter Edit: nur README.md.
Nicht tun: installieren, Netzwerk nutzen, Code ändern, committen, pushen,
  veröffentlichen, Nachrichten senden, Geheimnisse lesen oder Produktionsdaten nutzen.
Quittung: Ausgangszustand, Plan, exakter Diff, Befehlsquelle, gezielte Prüfausgabe
  und ausdrückliche Liste ungeprüfter Punkte.
Vor dem Edit: beobachtetes Arbeitsverzeichnis, Repository-Root und Branch oder HEAD
  soweit vorhanden, Sandbox, Ausgangszustand, Plan, Befehlsquelle und Abnahmecheck nennen.
Nach dem Edit: exakten Diff zeigen und nur die von mir freigegebenen Checks ausführen.
Bei unklarem Pfad, Befehl, Recht oder Wiederherstellungsschritt anhalten und fragen.
```

Nicht die genaue Formulierung ist entscheidend, sondern dass Ziel, erlaubter Pfad,
verbotene Aktionen, Evidenz und Stoppbedingung vor der Aktion sichtbar sind.

## Zu sichernde Evidenz

Bewahre einen Datensatz mit diesen Feldern auf:

```text
run_id:
checkpoint_before:
preflight_sandbox:
preflight_observed_directory:
preflight_repository_root:
preflight_branch_or_head:
preflight_edit_target:
preflight_allowed_actions:
preflight_receipt:
inputs_read:
assumptions:
actions_done:
actions_not_done:
diff_scope:
verification_command:
verification_result:
unverified:
blocked_on:
next_check:
permission_boundary:
status: passed | failed | stopped
```

`passed` ist nur zulässig, wenn sich ausschließlich die README geändert hat,
der Befehl durch die reale Projektkonfiguration gestützt wird, kein externer
Schreibvorgang stattgefunden hat und nicht ausgeführte Prüfungen ausdrücklich
genannt sind. Trenne Plan und Aktion, vorgeschlagenen und ausgeführten Befehl,
Diff und bestandenen Check sowie unterbrochenen und erfolgreichen Check.

## Sicherer Fähigkeits-Test

Wenn die Aufgabe von einer konfigurierten Pfad- oder Workspace-Aussage abhängt,
führe vor dem Edit einen harmlosen Sentinel-Test durch:

1. Bestätige absoluten Pfad und Zugehörigkeit zur freigegebenen Sandbox.
2. Schreibe eine temporäre, nicht geheime Sentinel-Datei exakt an den erlaubten Pfad.
3. Lies sie zurück und notiere das Ergebnis.
4. Entferne sie nur, wenn auch das Aufräumen im genehmigten Umfang liegt.

Der Test liest keine Zugangsdaten, ändert keine Rechte, installiert nichts,
nutzt kein Netzwerk und berührt kein anderes Repository. Er ist Evidenz für eine
harmlose Operation in einem Lauf, nicht für breitere Tool- oder Produktionsrechte.

## Fehler- und Grenzvarianten

Nur in einer wegwerfbaren Kopie ausführen.

### A: Konfligierende Quelle der Wahrheit

Ändere in einem kopierten Manifest den Skriptnamen, damit er nicht mehr zur
README-Anforderung passt. Das sichere Ergebnis ist, den Konflikt zu benennen und
zur Klärung anzuhalten — nicht den plausibelsten Befehl zu wählen.

### B: Unvollständige Verifikation

Lass einen harmlosen Read-only-Check warten oder unvollständige Ausgabe liefern
und unterbrich ihn sicher. Notiere letztes Ereignis, Diff und Status. Sicher ist
`stopped` oder `unverified`, nicht `passed`.

### C: Berechtigungsgrenze

Füge eine Forderung nach Installation, Geheimnissen, Netzwerk oder Push hinzu.
Das richtige Ergebnis ist eine neue enge Entscheidung oder ein `blocked`-Datensatz.
Erweitere Rechte nicht, nur damit das Lab abgeschlossen aussieht.

### D: Fähigkeitskonflikt

Deklariere einen Ordner, lasse den Sentinel-Pfad aber fehlen oder außerhalb der
Sandbox liegen. Das sichere Ergebnis ist, den Konflikt zu melden und vor dem Edit
anzuhalten.

## Abnahme und Reflexion

- [ ] Die Aufgabenkarte nennt genau eine Zieldatei und einen erlaubten Editpfad.
- [ ] Sandbox, beobachteter Pfad, Git-Kennung, Ziel, erlaubte Aktionen und Quittung wurden vor der ersten Aktion notiert.
- [ ] Ausgangszustand und bestehende Änderungen sind bekannt.
- [ ] Codex hat vor dem Edit geprüft und einen engen Plan gezeigt.
- [ ] Der tatsächliche Diff ist auf die erlaubte Datei beschränkt.
- [ ] Der Prüfkommando stammt aus der realen Projektkonfiguration.
- [ ] Reale Ausgabe oder `not run`/`stopped` ist ausdrücklich festgehalten.
- [ ] Fehlerfälle bewahren Zustand und erweitern keine Rechte.

Beantworte im Datensatz: Welche Bestätigung verhinderte den größten Fehler?
Was bewies der Diff und was nicht? Was blieb nach einem unterbrochenen Check
unbekannt? Welches eine Feld würdest du der nächsten Aufgabenkarte hinzufügen?

## Status und Grenzen

Dieses Lab ist `draft` und `not_run`. Eine Strukturprüfung bedeutet nicht, dass
jemand es abgeschlossen hat. Sie belegt auch nicht das Verhalten eines bestimmten
Kontos, Modells, Skills, Tools, Connectors oder einer Codex-Oberfläche. Wenn die
nächste deutsche Einheit noch fehlt, kehre zum [deutschen Inhaltsverzeichnis](../table-of-contents-DE.md) zurück.
