<!-- content_id: chapter-05-choose-the-codex-surface | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 5: Die richtige Codex-Arbeitsfläche wählen

**Status:** `candidate`. Dieses Kapitel bietet eine quellenbasierte Entscheidungsmethode, aber keinen unabhängigen Vortest mit Lernenden. Es belegt weder die Funktionen deines Kontos noch eine Cloud-Ausführung oder einen Modellvergleich.

## Das Problem dieses Kapitels

Dasselbe Ziel kann in einer Desktop-App, der CLI, einer IDE oder im Web beginnen und lokal, in einem Git-Worktree oder in der Cloud ausgeführt werden. Das sind getrennte Entscheidungen:

~~~
Arbeitsfläche wählen → Einstieg wählen → Ziel und Kontogrenze prüfen
→ Modell und Tools prüfen → kleinste Aktion → Belege vor der Übergabe prüfen
~~~

Eine *Arbeitsfläche* ist der Ort, an dem die Arbeit ausgeführt wird und Änderungen landen. Ein *Einstieg* ist die Art, wie die Arbeit gestartet und geprüft wird. CLI, IDE, Desktop und Web sind keine anderen Namen für Local, Worktree und Cloud.

## Lernziele

- `Local`, `Worktree` und `Cloud` nach Kontext, Datengrenze, Nebenwirkung, Beleg und Wiederherstellung wählen;
- den Zugriff auf Ressourcen sowie die Verfügbarkeit von Modell und Tools getrennt prüfen;
- Cloud-`setup` und `agent` sowie Netzwerk- und Geheimnislebensdauer getrennt dokumentieren; und
- sicher stoppen, wenn der nächste Beleg breitere Autorität verlangt.

## Praxisfälle: öffentliche Symptome, keine Laufzeitbeweise

Öffentliche Berichte sind Diagnosematerial, nicht lokale Reproduktion, offizielle Ursache oder garantierte Lösung.

| Bericht | Beobachtung | Beweist nicht | Sicherer Check |
|---|---|---|---|
| OAuth gelingt, aber der Token-Austausch scheitert | Die Browser-Autorisierung wird abgeschlossen, aber der Client scheitert beim Austausch | Dass CLI, Host oder Repository nutzbar sind | Autorisierung, Callback, Austausch und erste Lesung getrennt notieren |
| Ein Provider stellt nur ein Tool bereit | Die Konfiguration wird akzeptiert, aber Shell, Dateien oder Browser fehlen | Dass die fehlenden Aktionen möglich sind | Tool-Inventar sichern; Registrierung und Aufruf getrennt testen |
| Worktree und Checkout weichen ab | UI, `cwd`, IDE-Root oder Git-Metadaten stimmen nicht überein | Dass der editierende Prozess isoliert ist | Absoluten Pfad, `.git`, Workspace-Root und `git status` vergleichen |
| Setup gelingt, aber der Agent erreicht den Dienst nicht | Setup installiert etwas, doch der Agent hat keinen Netzwerk- oder Geheimniszugriff | Dass beide Phasen dieselben Rechte haben | Setup-/Agent-Logs, Netzwerkphase, Geheimnislebensdauer und Diff getrennt sichern |

Siehe [Feldproblem-Index](../evidence-library-DE.md#source-notes), [Arbeitsflächenforschung](../evidence-library-DE.md#source-notes) und [Forenforschung](../evidence-library-DE.md#source-notes). Der Worktree-Fall [FC-WORKTREE-01](../evidence-library-DE.md#source-notes) zeigt: Nach einer Übergabe von Local an Worktree sind Checkout, Shell-`cwd`, Git-Top-Level, Worktree-Liste, Branch/HEAD und schreibbare Wurzeln zu vergleichen. Bei Abweichung nicht schreiben.

## 1. Arbeitsfläche und Einstieg

| Arbeitsfläche | Ort | Zweck | Kein Beweis für |
|---|---|---|---|
| `Local` | Aktuelles Projektverzeichnis | Schnelle Prüfung, kleiner Edit | Sicheres, sauberes oder richtiges Ziel |
| `Worktree` | Separater Git-Worktree | Änderung isolieren und Diff prüfen | Dass alle Prozesse dort arbeiten |
| `Cloud` | Konfigurierte Remote-Umgebung | Längere oder parallele Arbeit | Konto, Repo, Tools, Netz, Geheimnisse oder finalen Diff |

`Local` und `Worktree` sind lokale Ausführungsumgebungen; Worktree ist eine Git-Isolation, aber keine universelle Sicherheitsgrenze. Cloud ist eine Ausführungsgrenze, jedoch kein Beleg dafür, dass alles bereit ist.

| Einstieg | Vorteil | Prüfbeleg |
|---|---|---|
| Desktop-App | Sichtbarer Aufgabenstatus | Umgebungslabel, Ereignisse, Zusammenfassung, Diff |
| CLI | Explizite Pfade und Befehle | `cwd`, Ausgabe, Exit-Code, Git-Status, Diff |
| IDE-Erweiterung | Editor-Kontext und direkter Diff | Workspace-Root, Kontext, Patch |
| Web / Cloud | Remote-Setup und Übergabe | Repo/Branch, Setup-/Agent-Beleg, Diff |

## 2. Fähigkeit ist eine Kette

~~~
offizieller Produktsupport → Konto autorisiert → Ziel lesbar → Modell verfügbar
→ Tool registriert → Tool aufrufbar → Aktion endet → Ergebnis verifiziert
~~~

Jeder Pfeil braucht einen eigenen Beleg. Browser-Login, Modell im Picker, schreibbares Verzeichnis, sichtbarer Toolname, Setup-Installation oder der UI-Status `Completed` belegen jeweils nur den eng begrenzten Schritt – nicht Repositoryzugriff, Toolausführung, Deployment, Push oder Nutzerabnahme.

## 3. Fünf Tore

1. **Kontext:** Kann die Fläche die genauen Regeln, Zieldateien, die Version und die Abnahmeeingaben lesen?
2. **Daten und Isolation:** Bleiben Geheimnisse, Kundendaten, privater Code und uncommittete Arbeit an der richtigen Grenze?
3. **Aktion:** Ist nur Lesen, Edit, Branch, Push, API oder Produktion nötig? Wähle die kleinste passende Fläche.
4. **Beleg:** Können andere den Pfad, die Ziellesung, das Tool-Inventar, die Ausgabe, den Diff, den Test, das Cloud-Log oder die Freigabe prüfen?
5. **Wiederherstellung:** Bleibt bei Auth-, Netz-, Abhängigkeits- oder Teiländerungsfehlern ein Checkpoint?

| Aufgabe | Kandidat | Beleg vor Aktion |
|---|---|---|
| Öffentliche Doku lesen, lokale Notiz schreiben | `Local` | Checkout, Quellenliste, Ausgabepfad |
| Gemeinsames Repository editieren, uncommittete Arbeit schützen | `Worktree` | Worktree-Pfad, Branch/Commit, `.git`, Git-Status |
| Lange parallele Änderung im genehmigten Repository | `Cloud` | Verbundenes Repo, Umgebung, Setup-/Agent-Phase, Logs, Diff |
| Kundendaten an Connector senden | Keine automatische Wahl | Payload, Zielkonto, Freigabe, Rollback, Toolbeleg |
| Fehlendes Tool oder unzugänglichen Pfad diagnostizieren | Zuerst die aktuelle Oberfläche nur lesend nutzen | Tool-Inventar, absoluter Pfad, Konfigurationsquelle und Fehlermeldung |

## 4. Entscheidungskarte

~~~
task_id:
task_goal:
surface: Local | Worktree | Cloud
entry: desktop | CLI | IDE | web | other
decision: selected | rejected | blocked | not_observed
context_readable: yes | no | not_observed
data_boundary:
allowed_side_effects:
account_authorized: yes | no | not_observed
target_resource_readable: yes | no | not_observed
model_id:
surface_available: yes | no | not_observed
required_tools:
tools_available: yes | no | not_observed
setup_action / setup_evidence:
agent_action / agent_evidence:
network_phase: local_policy | setup | agent | not_observed
secret_lifetime: none | setup_only | full_task_env | not_observed
result_review:
recovery_path:
rejection_or_block_reason:
checked_at:
reviewer:
~~~

`not_observed` heißt: Es gab keinen Lauf oder es wurde kein Beleg gesammelt. Fehlende Beobachtungen werden nicht bloß zum Ausfüllen des Formulars in `yes` oder `no` verwandelt.

## 5. Cloud: Setup und Agent sind getrennt

Setup darf Abhängigkeiten mit Netzwerkzugriff installieren; der Agent ist normalerweise offline, sofern die Umgebung nicht anders konfiguriert ist. Ein Geheimnis kann im Setup vorhanden und vor der Agent-Phase entfernt sein. „Paket installiert“ belegt Setup, nicht den Agent-Zugriff. Externe Aufrufe bleiben pausiert, bis Phase und Datenweg belegt sind.

## Experiment: beobachtbares Mini-Experiment

**Experimentstatus:** `not_run`. Dies ist ein Übungsentwurf, kein Bericht über einen Lauf dieses Repositories in Local, Worktree oder Cloud.

### Vorbereitung

Lege eine wegwerfbare Markdown-Datei, eine kurze Abnahmeliste und ein temporäres Git-Repository ohne Remote an. Verwende keine Geheimnisse oder privaten Daten und führe keine Installation, Nachrichten, Pushes oder Produktionsaktionen aus.

### Aufgabe

> Lies `brief.md`, ändere eine benannte Formulierung in `draft.md`, führe einen lesenden Formatcheck aus und berichte den Diff. Ändere nichts anderes.

Fülle die Local-, Worktree- und Cloud-Karte vor der Ausführung aus. Notiere absoluten Pfad, Ziellesung, Tool-Inventar, Modellsichtbarkeit und erlaubte Nebenwirkung. Wähle höchstens eine Karte; die anderen sind `rejected`, `blocked` oder `not_observed`. Sichere Diff, Prüfausgabe, Run-ID und die genaue Arbeitsfläche samt Einstieg. Wenn sich ein Pfad-, Tool-, Ziel- oder Phasenbeleg ändert, halte an und bewahre den Checkpoint.

### Belege

~~~
run_id | surface | entry | checkout_or_environment
target_read | model_visible | tools_available
setup_status | agent_status | network_phase | secret_lifetime
decision | diff_path | check_output | reviewer
~~~

## 7. Fehler und sichere Rückstufung

| Fehler | Richtige Reaktion |
|---|---|
| Login klappt, Ziel-Lesen nicht | Beim Lese-Beleg stoppen; `blocked` behalten |
| Modell sichtbar, Tool fehlt | Textplan oder bekannte Fläche nutzen; Rechte nicht blind erweitern |
| Worktree-Pfade widersprechen sich | Nicht schreiben; Pfade/Git prüfen und Bestätigung einholen |
| Setup bestanden, Agent scheitert | Setup `passed`, Agent `failed`/`not_observed`, Task `blocked` |
| Netz blockiert | Anfrage eingrenzen, Fehler sichern, kein unbeschränktes Netz |

## Reflexion

Welches Tor hat deine Wahl verändert? Welchen vorgelagerten Erfolg könntest du leicht überbewerten? Begründe die Antwort mit deiner Entscheidungskarte, nicht mit deiner Erinnerung an eine Oberfläche.

## Transferaufgabe

Übertrage die Methode auf eine Rechercheaufgabe: Nutze einen Browser nur für öffentliche Quellen, eine lokale Shell nur für redigierte Belege und eine isolierte Umgebung für sensible Dateien. Fülle neue Karten aus; übernimm die Flächenwahl aus diesem Kapitel nicht automatisch. Markiere, welche Quelle, welcher Pfad und welche Nebenwirkung die neue Wahl begründen.

## Abnahme-Checkliste

- [ ] Ich kann `Local`, `Worktree` und `Cloud` von Desktop, CLI, IDE und Web als Einstiegen unterscheiden.
- [ ] Meine Karte trennt Kontofreigabe, Lesezugriff, Modellsichtbarkeit, Tool-Verfügbarkeit und Ergebnisprüfung.
- [ ] Ich habe eine Option mit einem überprüfbaren Grund ausgewählt und die anderen als `rejected`, `blocked` oder `not_observed` dokumentiert.
- [ ] Für Cloud habe ich Setup und Agent, Netzwerkphase und Geheimnislebensdauer getrennt erfasst oder ehrlich als nicht beobachtet markiert.
- [ ] Bei einem widersprüchlichen Pfad oder fehlenden Beleg stoppe ich, statt Rechte auszuweiten.

## Quellen und Wartungsgrenze

| Veränderliche Tatsache | Quelle | Zugriff | Grenze |
|---|---|---|---|
| Local, Worktree und Cloud sind Arbeitsflächen | https://learn.chatgpt.com/docs/environments/modes.md | 2026-08-09 | Belegt nicht dieses Konto oder diese Aufgabe |
| Setup und Agent sind getrennte Cloud-Phasen | https://learn.chatgpt.com/docs/environments/cloud-environment.md | 2026-08-09 | Belegt keinen Cloud-Lauf hier |
| Netz und Geheimnis-Lebensdauer haben getrennte Grenzen | https://learn.chatgpt.com/docs/cloud/internet-access.md | 2026-08-09 | Policy und Runtime-Beleg bleiben nötig |
| Berechtigung und Approval sind getrennt | https://learn.chatgpt.com/docs/agent-approvals-security.md | 2026-08-09 | Belegt nicht die wirksame Sitzungskonfiguration |

Die [Faktenkarten](../evidence-library-DE.md#source-notes) und [Feldproblemakten](../evidence-library-DE.md#source-notes) ersetzen keine aktuelle Konto- oder Runtime-Beobachtung. Dieses Kapitel bleibt `candidate`, sein Experiment `not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="04-context-permissions-and-agent-DE.md" aria-label="Vorheriges Kapitel: Kapitel 4 · Kontext, Berechtigungen und die Handlungsgrenze des Agents">← Zurück<br><strong>Kapitel 4 · Kontext, Berechtigungen und die Handlungsgrenze des Agents</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="06-model-selection-DE.md" aria-label="Nächstes Kapitel: Kapitel 6 · Modellauswahl ist keine Modellverehrung">Weiter →<br><strong>Kapitel 6 · Modellauswahl ist keine Modellverehrung</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
