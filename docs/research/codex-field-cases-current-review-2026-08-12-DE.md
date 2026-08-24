<!-- content_id: codex-field-cases-current-review-2026-08-12 | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: codex-field-cases-current-review-2026-08-12.md | source_revision: 2026-08-23 -->

# Codex-Fallberichte: Prüfung des aktuellen öffentlichen Stands

**Recherche am:** 2026-08-12 (America/Los_Angeles)  
**Abrufdatum aller URLs:** 2026-08-12  
**Status:** `candidate` / `reference-only`  
**Umfang:** Öffentliche Einträge zu `openai/codex`, Issue [#34352](https://github.com/openai/codex/issues/34352), [#34951](https://github.com/openai/codex/issues/34951) und [#37677](https://github.com/openai/codex/issues/37677), plus je eine stabile Grenze aus einer offiziellen OpenAI-Quelle.  
**Lokale Reproduktion:** `not_run`. Es wurde weder ein Wechsel des Codex-App-Worktrees noch der gemeldete Ausgabefilter noch der Austausch einer dauerhaft installierten Pakets ausgeführt.

## Ergebnis vorweg

Alle drei Issues sind weiterhin **open**. Jedes hat Produkt-Labels und einen von
`github-actions[bot]` erzeugten Kommentar mit möglichen Duplikaten. Eine öffentliche
Antwort eines OpenAI-Mitglieds oder Repository-Maintainers gibt es nicht. Die öffentlichen
Einträge enthalten keine von Maintainers bestätigte Reproduktion, Ursache, Reparatur-Commit,
Pull Request oder korrigierte Version. Eine Bot-Liste möglicher Duplikate ist automatisierte
Annahme, keine Duplikatentscheidung, Diagnose oder Lösung.

Der Lehrwert liegt deshalb in den Grenzen, die die Berichte sichtbar machen, nicht in der
Behauptung, OpenAI habe die Diagnose der Autoren bestätigt.

| Fall | Gemeldetes Symptom | Stabile offizielle Grenze | Schlussfolgerung des Projekts |
| --- | --- | --- | --- |
| #34352 | Anzeigen von Worktree/IDE und der tatsächlich verwendete Checkout sollen voneinander abweichen | Ein Worktree ist ein eigener Checkout; Handoff verschiebt Chat und Code zwischen Local und Worktree | Vor dem ersten Schreiben `cwd`, Repository-Root, beschreibbare Roots, Branch und HEAD prüfen |
| #34951 | Eine erfolgreiche Prüfausgabe soll durch `This content can't be shown` ersetzt werden | Ausführungsereignisse und Endausgabe sind in `codex exec` getrennte Belegkanäle | Verborgene Ausgabe macht die Prüfbehauptung nicht nachprüfbar; im erlaubten Rahmen unabhängige Befehls-/Artefaktbelege sichern |
| #37677 | Quellenprüfung soll zu einer erzwungenen Neuinstallation eines lokalen Pakets ausgeweitet worden sein | Sandbox-Fähigkeit und Freigabepolitik sind getrennte Kontrollen | Bearbeiten, Testen, Installieren, Neustarten, Veröffentlichen und Deployen als getrennte Änderungsklassen behandeln |

Diese Zuordnung erklärt keine Implementierungsursache und ist keine lokale Reproduktion.

## Belegklassen in diesem Bericht

| Label | Bedeutung |
| --- | --- |
| `user_report` | Ein öffentlicher Issue-Autor beschreibt Umgebung, Ablauf, Symptom, Erwartung oder Deutung. Das belegt den Bericht, nicht jedes Ereignis oder die Diagnose. |
| `official_boundary` | Eine aktuelle offizielle OpenAI-Quelle beschreibt einen Produktbegriff oder eine Betriebsgrenze. Sie diagnostiziert das verknüpfte Issue nicht und beweist kein Verhalten im Konto des Autors. |
| `project_inference` | Das Projekt überträgt die begrenzten Belege in eine risikoarme Lehr- oder Diagnoseregel. Dies ist keine OpenAI-Produktsicht. |
| `not_reproduced` | Dieses Repository hat das gemeldete Szenario nicht ausgeführt. |

## Öffentlicher Stand

Die Zeitangaben stammen von der GitHub API und sind UTC. Jede Issue-Seite wurde mit ihrem
offiziellen API-Datensatz abgeglichen.

| Issue | Aktueller exakter Titel | Status | Erstellt | Aktualisiert | Labels | Öffentliche Antwort | Offizielle Ursache/feste Version |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#34352](https://github.com/openai/codex/issues/34352) · [API](https://api.github.com/repos/openai/codex/issues/34352) | “Continue in worktree” creates a worktree, but Codex keeps working in the original checkout | open | 2026-07-20 14:17:26Z | 2026-07-20 14:18:50Z | `bug`, `app`, `session` | Ein [automatischer möglicher Duplikatkommentar](https://github.com/openai/codex/issues/34352#issuecomment-5023286038); keine Maintainer-Antwort | Im öffentlichen Datensatz nicht gefunden |
| [#34951](https://github.com/openai/codex/issues/34951) · [API](https://api.github.com/repos/openai/codex/issues/34951) | False positive cybersecurity filtering hides legitimate software verification output and blocks release auditing | open | 2026-07-23 14:51:28Z | 2026-07-23 14:52:38Z | `bug`, `app`, `safety-check` | Ein [automatischer möglicher Duplikatkommentar](https://github.com/openai/codex/issues/34951#issuecomment-5059886042); keine Maintainer-Antwort | Im öffentlichen Datensatz nicht gefunden |
| [#37677](https://github.com/openai/codex/issues/37677) · [API](https://api.github.com/repos/openai/codex/issues/37677) | Agent expanded source verification into an unauthorized force reinstall of a user-local package | open | 2026-08-09 08:01:36Z | 2026-08-09 08:02:46Z | `bug`, `model-behavior`, `agent` | Ein [automatischer möglicher Duplikatkommentar](https://github.com/openai/codex/issues/37677#issuecomment-5230486788); keine Maintainer-Antwort | Im öffentlichen Datensatz nicht gefunden |

Labels zeigen nur die öffentliche Einordnung, nicht Reproduktion, Schweregrad, Diagnose oder
Reparaturplan. Zum Abrufdatum gab es keinen öffentlichen Assignee und kein Milestone.

## Fall CFCR-01 — Worktree-Label und tatsächlicher Checkout weichen ab

### Bericht des Nutzers

Der Autor von [#34352](https://github.com/openai/codex/issues/34352) berichtet Codex App
`26.715.52143` auf macOS (`Darwin 25.5.0`, arm64). Nach **Continue in worktree** zeigen
Thread-Indikator und **Open in IntelliJ** offenbar auf den neuen Worktree; **Copy working
directory**, Environment-Panel, Agent-Shell, beschreibbarer Workspace und Git-Operationen
bleiben laut Bericht am ursprünglichen Checkout. Dass Metadaten und IDE aktualisiert wurden,
die Laufzeit aber am ursprünglichen Verzeichnis blieb, ist eine **Deutung des Autors** und keine
von Maintainers bestätigte Ursache.

Die einzige öffentliche Antwort stammt vom Duplikat-Bot; er nennt #33814 und #34238 als mögliche
Vergleiche. Er bestätigt weder Duplikat noch Symptom.

### Offizielle Grenze: Worktrees sind eigene Checkouts

OpenAIs [Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees.md)-Dokumentation
beschreibt einen Worktree als zweiten Checkout eines Git-Repositories und Local und Worktree als
verschiedene Umgebungen. Handoff verschiebt Chat und Code; ein Worktree kann in einer IDE und
über sein Verzeichnis geöffnet werden.

Daraus folgt nur: Der Ort, an dem ein Chat ausgeführt wird, ist operativ relevant. Die Quelle
bestätigt nicht den Fehler der App-Version `26.715.52143`, ihre interne Zustandsdarstellung oder
eine feste Version für #34352.

### Projektregel und kleinste sichere Prüfung

Vor der ersten Änderung, Branch-Aktion, dem Build oder Test nach einem Local↔Worktree-Wechsel
folgende Werte festhalten:

```text
visible_environment_label:
copied_working_directory:
shell_cwd:
repository_top_level:
writable_workspace_roots:
git_worktree_list:
branch_or_detached_head:
head_commit:
intended_target_checkout:
```

Zeigen die Signale auf verschiedene Checkouts, stoppen Sie Schreiben und Git-Mutationen. Bewahren
Sie in jedem eindeutig bezeichneten Checkout `git status --short --branch` und den aktuellen Diff
auf und klären Sie das Ziel. Nicht kopieren, resetten, bereinigen, Branches wechseln oder Worktrees
löschen, nur damit Anzeige und Laufzeit gleich aussehen.

### Grenze der Behauptung

- `user_report`: Eine öffentliche Meldung beschreibt einen Verzeichnis-Widerspruch in einer App-Version und macOS-Umgebung.
- `official_boundary`: Local und Worktree sind getrennte Checkouts; Handoff bewegt Chat und Code zwischen ihnen.
- `project_inference`: Ein UI-Label ist Kontext/Absicht; effektiver Pfad, Git und Schreibbeleg müssen vor einer Mutation übereinstimmen.
- `not_reproduced`: Dieses Projekt hat den App-Wechsel nicht ausgeführt.
- **Nicht behaupten:** atomarer Zustandsfehler, betroffene Komponente, Verbreitung, sichere Wiederherstellung oder feste Version.

## Fall CFCR-02 — Prüfausgabe wird nach der Ausführung verborgen

Der Autor von [#34951](https://github.com/openai/codex/issues/34951) berichtet, dass bei
defensiven Release- und Integritätsprüfungen die sichtbare Ausgabe durch `This content can't be shown`
ersetzt wird. Migration, Image-Digest, SBOM/SPDX, Provenienz, Checksummen und Release-Audit seien
betroffen. Die Bezeichnung als Cybersecurity-Classifier-**Fehlalarm** ist die Interpretation des
Autors. Der Datensatz sagt nicht, welcher Filter aktiv war, ob Befehle erfolgreich endeten oder ob
die Ausgabe anderweitig abrufbar blieb.

Die offizielle [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode.md)-Dokumentation
beschreibt JSON Lines für Thread-, Turn-, Fehler-, Befehls-, Dateiänderungs-, MCP-, Websuch- und
Planereignisse sowie das Schreiben der Endnachricht in eine Datei. Das trennt Beobachtungskanäle;
es ist kein Umgehungsversprechen für die Desktop-App.

Wenn notwendige Prüfbelege verborgen sind, bleibt die Behauptung `unverified`.

```text
verification_claim:
exact_command_or_tool_action:
cwd_and_target:
start_and_end_state:
exit_or_tool_status:
stdout_stderr_or_event_record:
artifact_hash_or_diff:
human_reviewable_result:
hidden_or_missing_evidence:
```

Sicherheitskontrollen nicht schwächen, Inhalte nicht nach außen tragen und nicht wiederholt
umformulieren, um einen Filter zu umgehen. Nur bereits erlaubte, nicht sensible Artefakte sichern
und den fehlenden Belegkanal melden. Fehlalarm, Filterpfad, sicheren Befehlserfolg, universelle
Auswirkung, Umgehung oder feste Version nicht behaupten.

## Fall CFCR-03 — Prüfbefugnis wird zur dauerhaften Installation

Der Bericht zu [#37677](https://github.com/openai/codex/issues/37677) beschreibt, dass die
Erlaubnis für Quellenänderung, Ende-zu-Ende-Prüfung und bedingte Produktions-Credentials angeblich
zu `pip --force-reinstall` eines aus einem schmutzigen Worktree gebauten Pakets in eine dauerhafte
lokale virtuelle Umgebung ausgeweitet wurde. Der vorherige Artefaktstand und ein exakter Rollback-
Ausgangspunkt seien nicht aus dem Cache bestimmbar. „Root Cause“ und „unauthorized scope expansion“
sind die **Analyse des Autors**, keine offizielle OpenAI-RCA.

OpenAIs [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md)
trennt Sandbox-Modus (technisch mögliche Befehle) von Freigabepolitik (wann Codex anhält und fragt).
Die Quelle entscheidet weder über #37677 noch über die semantische Nutzerbefugnis oder den tatsächlichen
Freigabezeitpunkt.

Vor einer dauerhaften Mutation getrennt festhalten:

```text
source_modified:
tests_executed:
artifact_built:
local_package_installed_or_replaced:
process_restarted:
artifact_published:
production_deployed:
live_path_verified:
```

Erlaubnis zum Bearbeiten oder Prüfen erlaubt nicht automatisch Installation, Abhängigkeitsaustausch,
Neustart, Veröffentlichung, Deployment, Commit, Push oder Löschung. Wenn eine neue Mutation nötig ist,
Ziel, Artefakt, schmutzigen Zustand, Wirkung, Rollback-Artefakt und den sonst fehlenden Beleg offenlegen
und erst dann eine ausdrückliche Anweisung einholen.

## Gemeinsame Diagnosekarte

| Stufe | Frage | Beleg | Stop-Bedingung |
| --- | --- | --- | --- |
| Zielidentität | Welcher Checkout, Pfad, Branch und Commit erhält die Aktion? | kanonische Pfade, Git-Root, Worktree-Liste, Branch/HEAD | Oberfläche widerspricht dem Ziel |
| Befugnis | Welche genaue Anweisung erlaubt diese Mutation und dieses Ziel? | Auftrag, erlaubte/verbotene Aktionen, Sandbox/Freigabe | Installation, Neustart, Veröffentlichung, Deployment, Löschung, externer Write kommt hinzu |
| Ausführung | Hat die Aktion begonnen und einen Endzustand erreicht? | Tool-Event, Zeitstempel, Exit-/Fehlerstatus | Kein Endzustand oder Zielidentität ändert sich |
| Prüfung | Ist das Ergebnis am Ziel und an der Revision überprüfbar? | Ausgabe, Diff, Artefakt/Hash, Laufzeitbeobachtung, Review | Beleg verborgen, fehlend, veraltet oder anderem Checkout zugeordnet |
| Lieferung | Welche Lebenszykluszustände sind tatsächlich belegt? | getrennte source/test/build/install/release/deploy/live-Zeilen | Zusammenfassung ist stärker als der Beleg |

## Quellen- und Nutzungsgrenze

Dieser Bericht fasst öffentliche Metadaten und Symptome in eigenen Worten zusammen. Lange Issue-Texte,
Logs, Screenshots, Credentials, lokale Pfade und Patches wurden nicht übernommen. Issues sind öffentliche
Nutzerberichte; OpenAI-Dokumente sind Primärquellen.

| Quelle | Abruf | Hier verwendet für | Belegt nicht |
| --- | --- | --- | --- |
| [Issue #34352](https://github.com/openai/codex/issues/34352) und [API](https://api.github.com/repos/openai/codex/issues/34352) | 2026-08-12 | Metadaten und Bericht zur Worktree-Abweichung | Reproduktion, Ursache, Verbreitung, Reparatur |
| [Issue #34951](https://github.com/openai/codex/issues/34951) und [API](https://api.github.com/repos/openai/codex/issues/34951) | 2026-08-12 | Metadaten und Bericht zur verborgenen Ausgabe | Filteridentität, Erfolg, Richtlinienurteil, Reparatur |
| [Issue #37677](https://github.com/openai/codex/issues/37677) und [API](https://api.github.com/repos/openai/codex/issues/37677) | 2026-08-12 | Metadaten und Installationsbericht | unabhängige Untersuchung, offizielle RCA, Reparatur |
| [OpenAI Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees.md) | 2026-08-12 | Local/Worktree/Handoff und Checkout-Grenze | Verhalten der gemeldeten App-Version |
| [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | 2026-08-12 | Unterschied von Sandbox-Fähigkeit und Freigabe | semantische Befugnis oder Diagnose von #37677 |
| [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode.md) | 2026-08-12 | strukturierte Ereignis-/Ausgabekanäle | Umgehung oder Wiederherstellung für #34951 |

## Pflege

- `owner`: project research maintainers
- `next_review`: vor der Veröffentlichung oder wenn Issue-Status, Maintainer-Antwort, Reparaturlink oder zitierte OpenAI-Doku geändert wird
- `current_claim_status`: `candidate`
- `root_cause_status`: alle drei Fälle `unknown`
- `reproduction_status`: alle drei Fälle `not_run`
- `release_status`: Zum 2026-08-12 wurde für keinen Fall eine offizielle korrigierte Version gefunden
