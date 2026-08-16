<!-- content_id: chapter-06-model-selection | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 6: Modellauswahl ist keine Modellverehrung

**Status:** `candidate`. Das Vergleichsprotokoll und die Quellenbegrenzung sind
dokumentiert; dieses Repository hat seinen festen Aufgabensatz jedoch noch nicht
ausgeführt. Leistung, Kosten, Latenz, Kapazität, Stabilität und Rangfolge sind
weiterhin `not_run`.

## Das Problem

„Nimm das beste Modell“ ist keine Arbeitsentscheidung. Die hilfreiche Frage lautet:

> Welcher Kandidat erfüllt für diese Aufgabe, auf dieser Arbeitsfläche, bei diesem
> Provider, mit diesem Kontext, diesen Tools, dieser Berechtigungsgrenze, diesem
> Zeitbudget und dieser Abnahmerubrik die Mindestanforderung – und welcher Beleg
> rechtfertigt, den Test auszuweiten?

Ist ein Kandidat auf der gewählten Fläche nicht verfügbar oder unterscheiden sich
Eingaben, Tools, Berechtigungen oder Einstellungen, ist der Vergleich nicht sauber.
Eine eindrucksvolle Demo zeigt nur, dass eine Konfiguration einmal ein Ergebnis
erzeugte; sie begründet keine allgemeine Rangliste.

## Lernziele

- Aufgabe und Arbeitsfläche vor dem Modell wählen;
- Verfügbarkeit im tatsächlichen Konto, Workspace, Provider und in der Sitzung prüfen;
- Modell, Provider, Reasoning-Aufwand, Kontext, Tools, Berechtigungen und Abnahme trennen;
- drei risikoarme Aufgaben vergleichen, ohne Bedingungen einseitig zu verbessern;
- Kapazitäts-, Provider- und Wartefehler als Beleg bewahren; und
- erklären, was das Experiment zeigt, was nicht und wann es endet.

## Öffentliche Berichte: Symptome statt Zauberlösungen

Die [Codex-Feldrecherche](../evidence-library-DE.md#source-notes) sammelt
öffentliche Issues und Diskussionen. Sie enthält Symptome, keine offizielle
Diagnose und keine lokale Reproduktion.

| Symptom | Beobachtung | Beweist nicht | Sichere Reaktion |
|---|---|---|---|
| Picker ändert `model`, behält aber `model_provider` | Sichtbares Modell und wirksamer Provider können ein ungültiges Paar bilden | Dass Picker, Provider oder Modell allgemein fehlerhaft sind | Beide Werte lesen, geschwärzten Konfigurations-Diff sichern und das Paar korrigieren |
| Modell ist ausgelastet | Task stoppt vor Ende; der nächste Versuch kann Teilzustand erben | Schlechte Modellqualität oder dass Wiederholung den ersten Lauf abschließt | Checkpoint, Diff, Logs und Checks sichern; Zustand vor Fortsetzung einordnen |
| Befehl bleibt auf `Working` | Die Oberfläche zeigt Aktivität ohne überprüfbare Ausgabe | Dass Formatter, Agent oder Modell korrekt weiterarbeiten | Zeitgrenze anwenden, sicher abbrechen, Worktree prüfen und genau einen begrenzten Check ausführen |

Der [Datensatz zur Modellauswahl](../evidence-library-DE.md#source-notes)
enthält Links, Daten und Grenzen. Trenne bei jedem Bericht: Aussage einer Person,
unabhängige Meldung, offizielle Bestätigung und lokale Reproduktion durch dieses
Playbook. Ein Bericht ohne Reproduktion wird nicht zur garantierten Lösung.

## 1. Ein Modell wählen heißt eine Konfiguration wählen

### Verfügbarkeit vor Qualität

~~~
offizielle Dokumentation → Konto-/Workspace-/Org-Autorisierung
→ Ziel-Arbeitsfläche und Provider → sichtbares Modell in der Sitzung
→ harmlose Anfrage funktioniert → erforderliches Tool ist aufrufbar
→ Aufgabenergebnis ist geprüft
~~~

Jeder Pfeil ist eine andere Behauptung. Offizielle Seite, Katalogeintrag oder
Modellname im Picker belegen nicht, dass dieses Modell mit den benötigten Dateien,
Terminal, Browser oder Connectoren diese Aufgabe ausführen kann.

Nutze eine Kandidatenkarte:

~~~
candidate_id:
model_id:
provider:
surface: Local | Worktree | Cloud
entry: desktop | CLI | IDE | web | API | other
account_or_workspace_scope:
surface_available: yes | no | not_observed
availability_evidence:
not_available_reason:
model_visible_evidence:
harmless_request_evidence:
~~~

`not_observed` ist ein gültiges Ergebnis. Es ist sicherer als eine Lücke mit einer
Vermutung zu füllen.

### Produktpositionierung ist eine Anfangshypothese

Offizielle Seiten können Modelle für offene komplexe Arbeit, pragmatische tägliche
Arbeit oder wiederholbare Massenumwandlung beschreiben. Das hilft bei der Auswahl
eines Tests, erklärt aber keinen Sieger. Höherer Reasoning-Aufwand kann Analyse
gegen mehr Zeit oder Tokens tauschen. Beginne mit der kleinsten Einstellung, die
die Rubrik erfüllt. Fügt ein Modus Reasoning-Zeit oder Subagents hinzu, vergleichst
du einen Workflow und ein Budget – nicht nur ein Modell.

### Modell, Provider und Arbeitsfläche bilden ein Tupel

~~~
(model_id, provider, surface, entry, account_scope, reasoning_effort,
 context_fingerprint, tools_and_versions, permission_profile)
~~~

Ändert sich ein wesentliches Element, vergleichst du einen anderen Ablauf. Markiere
die Zeile `not_comparable` und wiederhole beide Seiten unter dem neuen Vertrag. Eine
Konfigurationsdatei belegt nur Konfiguration. Lies wirksamen Provider und Modell
zurück und führe eine harmlose Anfrage aus, bevor du sie als aktiv behandelst.

## 2. In der richtigen Reihenfolge entscheiden

~~~
Aufgabe und Risiko definieren → Local / Worktree / Cloud wählen
→ Einstieg und Provider wählen → Zugriff und Verfügbarkeit prüfen
→ Kontext, Tools, Rechte, Aufwand und Abnahme einfrieren
→ identischen Satz ausführen → vergleichbare Zeilen prüfen
→ ausweiten, stoppen oder weitere Belege sammeln
~~~

Ordne die Aufgabe zuerst ein: Extraktion, Umwandlung, Planung, Implementierung mit
Tools, Recherche/Review oder Erstellen/Design. Ein Kandidat, der gut extrahiert,
muss nicht zu einer Mehrdatei-Reparatur oder zu einer Prüfung mit hohem Risiko
passen. Die Rubrik muss zur Aufgabenklasse passen.

Wähle die kleinste Arbeitsfläche, die die nötigen Belege zulässt. Halte synthetische
oder geschwärzte Eingaben lokal, wenn keine Remote-Ausführung nötig ist. Nutze einen
wegwerfbaren Worktree, um nicht zu committende Arbeit zu isolieren. Nutze Cloud nur,
wenn Repository, Umgebung, Netz, Geheimnisse und Review-Weg genehmigt und
beobachtbar sind. Ein Modell kompensiert keine fehlende Datei, keinen unzugänglichen
Connector, den falschen Checkout oder eine nicht erlaubte Schreibaktion.

## 3. Karte vor dem Lauf

~~~
candidate_id:
model_id / provider:
surface: Local | Worktree | Cloud
entry:
account_or_workspace_scope:
surface_available: yes | no | not_observed
reasoning_effort_or_config:
task_set_version: three-task-smoke-v1
context_fingerprint:
tools_and_versions:
permission_profile:
acceptance_rubric_version:
cost_basis: actual | credits | token_only | not_observed
not_comparable: true | false
not_comparable_reason:
conclusion_status: not_run | candidate | disputed
~~~

Vor dem ersten Lauf fixierst du Eingabe und Version, Fläche, Einstieg, Provider,
Modell, Aufwand, Kontext, Tool-Versionen, Rechte, Rubrik, Prüfer, Zeitgrenze,
Wiederholungen und Kostenbasis. Verbessere Prompt, Kontext, Tool, Aufwand oder Recht
nicht nur für eine Seite. Ändert sich der Vertrag, erhöhe die Version und wiederhole
beide Seiten.

## 4. Experiment: drei Aufgaben vergleichen

**Experimentstatus:** `not_run`. Dies ist ein Übungsprotokoll, kein Nachweis, dass
dieses Repository Modelle verglichen hat.

Wähle zwei Kandidaten mit `surface_available: yes` auf derselben Arbeitsfläche. Nutze
das versionierte Offline-Fixture [`three-task-smoke-v1`](../../evals/candidates/three-task-smoke-v1/README-DE.md)
mit synthetischen Eingaben und lokalem Validator; es enthält keine Modellläufe. Nutze
keine Produktionsdaten, Geheimnisse, externen Schreibzugriff, Veröffentlichung,
Push, Deployment oder kostenpflichtige Connectoren. Führe jede Aufgabe einmal aus
und erlaube höchstens eine vorher festgelegte, kontrollierte Wiederholung im gleichen
Format.

Die festen Aufgaben `extract-01`, `markdown-02` und `gap-review-03` prüfen
strukturierte Extraktion, Markdown-Umwandlung unter Einschränkungen und einen Review
von Evidenzlücken. Ersetze keine Aufgabe einseitig durch eine spektakulärere Demo.
Ändern sich Eingabe, Instruktion, Schema oder Abnahme, erstelle eine neue Version und
wiederhole beide Seiten.

1. Beide Karten vor dem Aufruf ausfüllen.
2. Verfügbarkeit prüfen und Belegort notieren.
3. A und B mit gleicher Reihenfolge, Eingabe und Rubrik ausführen.
4. Rohausgabe vor der Bearbeitung sichern; Ereignisse, Dauer, Kosten und Fehler notieren.
5. Bei Fehler nur die kontrollierte Wiederholung nutzen, keine blinden Wiederholungen als Erfolg zählen.
6. Jede `not_comparable`-Zeile vor der Zusammenfassung prüfen.
7. Nur `worth expanding`, `do not expand yet` oder `insufficient evidence` folgern und Grenzen notieren.

~~~
run_id | candidate_id | task_id | model_id | provider | surface | entry
surface_available | availability_evidence | reasoning_effort_or_config
context_fingerprint | tools_and_versions | permission_profile | first_pass
rework_count | duration | cost_basis | cost_observed | error_type
reviewer_score | comparable | not_comparable_reason | raw_evidence
~~~

## 5. Fehler, Wiederherstellung und Transfer

| Fehler | Behandlung |
|---|---|
| Kandidat nicht sichtbar oder aufrufbar | `no` oder `not_observed` notieren; Verfügbarkeit nicht als Qualität werten |
| Picker und Provider passen nicht zusammen | Geschwärzten Diff bewahren, Tupel korrigieren oder Provider-/Workflow-Test erklären |
| Kapazität unterbricht einen Lauf | Fehler und Checkpoint sichern, `blocked` oder `not_comparable` markieren; nur beide Seiten unter erklärter Bedingung wiederholen |
| Warten ohne prüfbares Ereignis | Zeitregel anwenden, abbrechen, Diff/Status prüfen und fehlende Verifikation notieren |
| Eine Seite erhält zusätzlichen Kontext, Aufwand oder Tool | `not_comparable` markieren und unter eingefrorenem Vertrag wiederholen |
| Eine Demo erklärt einen universellen Gewinner | Auf `candidate` oder `insufficient evidence` zurückstufen |

Übertrage dieselben Felder auf Local gegen Worktree, Dokumentumwandlung mit strengem
Schema, Quellenabgleich mit Zitaten und Unknown-Spalte oder Codeinspektion mit
Read-only-Tools. Kopiere kein Ergebnis in eine andere Domäne ohne neuen Satz und
neue Rubrik.

## Evidenzgrenze und Quellen

Die geplante Übergabe besteht aus zwei Karten, eingefrorenem Satz und Rubrik,
Rohausführungen, Tabelle, typisierten Fehlern und einer Entscheidung zum Ausweiten
oder Stoppen. Bis sie existieren, bleibt alles `not_run`. Offizielle Positionierung
oder eine einzelne Demo ersetzen keine Evaluation.

| Veränderliche Grenze | Primärquelle | Zugriff |
|---|---|---|
| Modellpositionierung, Reasoning und Grenzen | [Codex models](https://learn.chatgpt.com/docs/models.md) | 2026-08-11 |
| CLI und lokaler Repository-Ablauf | [Codex CLI](https://learn.chatgpt.com/docs/cli.md) | 2026-08-11 |
| Cloud-Umgebung und Review | [Codex Cloud](https://learn.chatgpt.com/docs/cloud.md) | 2026-08-11 |
| Öffentliche Symptome zu Modell/Provider/Kapazität | [Feldakte](../evidence-library-DE.md#source-notes) | 2026-08-11 |

Modell-IDs, Preise, Kapazität, Provider-Support, Syntax und Controls können sich
ändern. Aktualisiere zuerst Primärquellen und bewahre offizielle Positionierung,
Nutzerbericht und lokalen Beleg in getrennten Sätzen.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="05-choose-the-codex-surface-DE.md" aria-label="Vorheriges Kapitel: Kapitel 5 · Die richtige Codex-Arbeitsfläche wählen">← Zurück<br><strong>Kapitel 5 · Die richtige Codex-Arbeitsfläche wählen</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="07-skills-plugins-and-tools-DE.md" aria-label="Nächstes Kapitel: Kapitel 7 · Wie Skills, Plugins, MCP und Tools die Arbeit aufteilen">Weiter →<br><strong>Kapitel 7 · Wie Skills, Plugins, MCP und Tools die Arbeit aufteilen</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
