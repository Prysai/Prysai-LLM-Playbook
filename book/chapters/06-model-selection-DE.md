<!-- content_id: chapter-06-model-selection | locale: DE | language: de | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 6: Modellauswahl ist keine Modellverehrung

**Status:** `candidate`. Das unten stehende Vergleichsprotokoll ist formuliert und quellenbegrenzt, aber dieses Repository hat seinen festen Aufgabensatz noch nicht ausgeführt. Modellleistung, Kosten, Latenz, Kapazität, Stabilität und die Gesamtrangfolge bleiben `not_run`.

## Das Problem, das dieses Kapitel löst

Modellauswahl wird oft durch einen Slogan ersetzt: „Nimm das beste Modell.“ Echte Arbeit braucht eine engere Frage:

> Für diese Aufgabe, auf dieser Arbeitsfläche, bei diesem Provider, mit diesem Kontext, diesem Tool-Satz, dieser Berechtigungsgrenze, diesem Zeitbudget und dieser Abnahmerubrik: Welcher Kandidat erfüllt die Mindestanforderung – und gibt es genug Belege, um den Versuch auszuweiten?

Ist ein Kandidat auf der gewählten Arbeitsfläche nicht verfügbar, oder verwenden zwei Läufe unterschiedliche Eingaben, Tools, Berechtigungen oder Reasoning-Einstellungen, gibt es keinen sauberen Modellvergleich. Eine schöne Demo kann zeigen, dass eine Konfiguration ein Ergebnis erzeugt hat. Sie kann keine universelle Rangfolge und keinen Gesamtnutzen belegen.

## Lernziele

Am Ende dieses Kapitels solltest du in der Lage sein:

- die Aufgabe und die Arbeitsfläche zu wählen, bevor du ein Modell wählst;
- die Verfügbarkeit des Modells im tatsächlichen Konto, Workspace, Provider und in der Sitzung zu prüfen, statt sie aus einem Katalog oder Picker abzuleiten;
- Modell-ID, Provider, Reasoning-Aufwand, Kontext, Tools, Berechtigungen und Abnahmekriterien als getrennte Vergleichsvariablen zu behandeln;
- einen risikoarmen Smoke-Vergleich mit drei Aufgaben durchzuführen, ohne Bedingungen zu ändern, um einen Kandidaten zu retten;
- Kapazitäts-, Provider-Fehlzuordnungs- und Langzeit-Wartefehler als Belege zu sichern; und
- zu benennen, was das Experiment beweist, was es nicht beweist und wann man aufhört.

## Einstieg aus der Praxis: Modellauswahl scheitert auf ganz gewöhnliche Weise

Die [Codex-Feldrecherche](../../docs/research/field-problems-codex.md) des Projekts sammelt öffentliche GitHub Issues und andere öffentliche Diskussionen. Diese Berichte sind Symptome, keine offiziellen Diagnosen und keine lokalen Reproduktionen. Sie sind wertvoll, weil sie die Annahmen sichtbar machen, die Menschen treffen, wenn eine Modellauswahl schiefgeht.

| Öffentliches Symptom | Was der Melder beobachtet hat | Was es **nicht** beweist | Erste sichere Reaktion |
|---|---|---|---|
| Ein Modell-Picker ändert `model`, behält aber einen benutzerdefinierten `model_provider` | Das sichtbare Modell und der wirksame Provider können ein ungültiges Paar bilden | Dass Picker, Provider oder Modell allgemein defekt sind | Wirksames `model` und `model_provider` zusammen lesen; vor der Korrektur einen geschwärzten Konfigurations-Diff sichern |
| Das gewählte Modell ist ausgelastet | Eine Aufgabe stoppt vor einem vollständigen Ergebnis, und spätere Prompts können auf einen Teilzustand treffen | Dass das Modell schlecht ist oder dass ein erneuter Versuch bedeutet, der erste Lauf sei abgeschlossen | Checkpoint, Diff, Logs und Tests sichern; den Zustand einordnen, bevor du fortfährst |
| Ein Windows-Befehl bleibt auf `Working` | Die UI zeigt Aktivität, aber es trifft keine überprüfbare Ausgabe ein | Dass Formatter, Agent oder Modell weiterhin sinnvolle Fortschritte machen | Die Timeout-/Stopp-Regel anwenden, sicher unterbrechen, den Worktree prüfen und nur einen begrenzten Check erneut ausführen |

Die ursprünglichen Links, Daten, Versionen, Evidenzgrade und Unsicherheitshinweise stehen im [Datensatz zur Modellauswahl](../../docs/research/codex-model-selection-official-facts-2026-08-11.md). Das Projekt hat die Befehle oder Workarounds aus diesen Berichten nicht ausgeführt.

### Wie man einen echten Bericht nutzt, ohne daraus Folklore zu machen

Halte für jedes Symptom vier Kennzeichnungen getrennt:

1. **Nutzerbericht:** was eine Person sagt, sei in einer benannten Umgebung geschehen.
2. **Unabhängiger Bericht:** ob eine andere Person ein ähnliches Symptom beschreibt.
3. **Offizielle Bestätigung:** eine Maintainer-Antwort, offizielle Dokumentation, Release-Notiz oder anderer Erstparteien-Beleg.
4. **Playbook-Beleg:** was dieses Projekt tatsächlich reproduziert hat.

In den drei Beispielen oben können die ersten beiden Kennzeichnungen vorhanden sein, aber dieses Projekt hat weder eine lokale Reproduktion noch eine offizielle Ursachenbestätigung, die sie zu einer garantierten Lösung aufwerten würde. Das ändert die Vorgehensweise: Belege sichern und die nächste Prüfung eingrenzen, statt eine Zaubereinstellung zu versprechen.

## 1. Modellauswahl ist eine Konfigurationsentscheidung

### Verfügbarkeit kommt vor Qualität

Nutze zwei getrennte Prüfschleusen:

```text
offizielle Produktdokumentation
→ tatsächliche Konto- / Workspace- / Organisations-Autorisierung
→ Ziel-Arbeitsfläche und Provider
→ Modell in dieser Sitzung sichtbar
→ harmlose Anfrage gelingt
→ benötigtes Tool ist aufrufbar
→ Aufgabenergebnis ist verifiziert
```

Jeder Pfeil trägt eine andere Behauptung. Ein Modell kann auf einer offiziellen Seite beschrieben sein und für ein Konto trotzdem nicht verfügbar sein. Es kann im Picker erscheinen und trotzdem scheitern, wenn der Provider die Anfrage erhält. Eine erfolgreiche Textantwort beweist noch nicht, dass die Datei, das Terminal, der Browser oder der Connector verfügbar ist, den die Aufgabe braucht.

Nutze diese Felder in einer Kandidatenkarte:

```text
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
```

`not_observed` ist ein gültiges Ergebnis. Es bedeutet, dass die Prüfung nicht durchgeführt wurde oder keine brauchbaren Belege hinterlassen hat. Es ist sicherer, als das Formular mit einer Vermutung zu füllen.

### Produktpositionierung ist eine Anfangshypothese

Beim Quellencheck vom 2026-08-11 beschreibt die offizielle Codex-Modellseite die empfohlenen GPT-5.6-Wahlen ungefähr so:

| Offizielle Positionierung | Eine vernünftige Anfangshypothese | Was noch getestet werden muss |
|---|---|---|
| Sol: komplexe, offene Arbeit mit zusätzlicher Analyse und Feinschliff | Probiere es, wenn Mehrdeutigkeit, Urteilsvermögen oder hochwertige Reviews dominieren | Erstversuchsquote, Dauer, Kosten, Stabilität und Tool-Verhalten bei deinem Aufgabensatz |
| Terra: pragmatischer Alltags-Arbeiter | Probiere es für gewöhnliche Arbeit, die starkes Reasoning und Tool-Nutzung braucht | Ob es unter deinen tatsächlichen Randbedingungen deine Abnahmeschwelle erreicht |
| Luna: klare, wiederholbare Arbeit mit hohem Volumen | Probiere es für Extraktion, Klassifikation, Umwandlung und strukturierte Zusammenfassungen | Ob das Ergebnis akzeptabel bleibt, wenn Kontext, Provider, Aufwand und Review-Kosten eingerechnet sind |

Das sind Produktbeschreibungen, keine Benchmark-Ergebnisse des Playbooks. Die offizielle Seite warnt außerdem, dass ein höherer Reasoning-Aufwand komplexe Arbeit verbessern kann, dafür aber länger dauert und mehr Tokens verbraucht. Beginne mit dem niedrigsten Aufwand, der die Abnahmerubrik erfüllt; erhöhe ihn nur, wenn die Aufgabe mehr Planung, Analyse oder Prüfung braucht. Halte die Einstellung als Teil des Laufs fest.

`Max` und `Ultra` sind keine kostenlosen Qualitätslabels. Die offizielle Seite beschreibt Max so, dass es einer Aufgabe mehr Reasoning-Zeit gibt, und Ultra so, dass es Subagents für trennbare komplexe Arbeit einsetzt. Sie verändern den Workflow und den Ressourcenrahmen, daher ist ein Ultra-Lauf kein reiner Modellvergleich mit einem Einzelagenten-Lauf.

### Modell, Provider und Arbeitsfläche bilden ein Tupel

Schreibe einen Kandidaten nicht nur als `model = ...`. Eine brauchbare Vergleichsidentität ist:

```text
(model_id, provider, surface, entry, account_scope, reasoning_effort,
 context_fingerprint, tools_and_versions, permission_profile)
```

Ändert sich ein Kernbestandteil, vergleichst du entweder einen anderen Workflow oder du markierst den Lauf `not_comparable` und wiederholst beide Seiten unter dem neuen Vertrag.

Die offizielle Dokumentation beschreibt einen gemeinsamen `config.toml`-Weg für die Standardwerte von Desktop, CLI und IDE, während Cloud-Chats eine andere Standardmodell-Grenze haben. Eine Konfigurationsdatei ist nur ein Konfigurationsbeleg. Lies den wirksamen Provider und das wirksame Modell zurück und stelle eine harmlose Anfrage, bevor du das Tupel als aktiv behandelst.

## 2. In der richtigen Reihenfolge entscheiden

Beginne nicht mit einem Lieblingsmodell. Nutze diese Reihenfolge:

```text
Aufgabe und Risiko definieren
→ Local / Worktree / Cloud wählen
→ Einstiegspunkt und Provider wählen
→ Zielzugriff und Modellverfügbarkeit prüfen
→ Kontext, Tools, Berechtigungen, Aufwand und Abnahme einfrieren
→ denselben Aufgabensatz ausführen
→ vergleichbare / nicht vergleichbare Zeilen prüfen
→ ausweiten, stoppen oder weitere Belege sammeln
```

### Zuerst die Aufgabe einordnen

Die Aufgabenklasse sagt dir, was „gut genug“ bedeutet:

- **Verstehen und extrahieren:** strukturierte Werte im Material finden;
- **Umwandeln und erzeugen:** unter einem festen Schema umschreiben, zusammenfassen, klassifizieren oder formatieren;
- **Planen und bewerten:** Randbedingungen, Abwägungen und Unsicherheit handhaben;
- **Code schreiben und Tools nutzen:** ein Repository prüfen, bearbeiten, ausführen und reparieren;
- **Recherchieren und reviewen:** Quellen finden, Behauptungen abgleichen und Lücken aufdecken; und
- **Erstellen und gestalten:** einen Stil über Feedback-Runden hinweg erhalten.

Ein Kandidat, der die Extraktion besteht, kann für eine Mehrdatei-Reparatur oder ein Review mit hohem Risiko trotzdem die falsche Wahl sein. Die Abnahmerubrik muss zur Aufgabenklasse passen.

### Arbeitsfläche und Risikogrenze festlegen

Wähle die kleinste Umgebung, die die benötigten Belege liefern kann. Halte synthetische oder geschwärzte Eingaben lokal, wenn die Aufgabe keine Remote-Ausführung braucht. Nutze einen wegwerfbaren Worktree, wenn aktuelle, nicht committete Arbeit isoliert werden muss. Nutze Cloud nur, wenn Repository, Umgebung, Netzwerk, Geheimnisse und Review-Pfad genehmigt und beobachtbar sind.

Modellauswahl kann eine fehlende Datei, einen nicht verfügbaren Connector, einen falschen Checkout oder einen nicht autorisierten Schreibzugriff nicht ausgleichen. Ist die Umgebung falsch, stoppe bei der Arbeitsflächenentscheidung, statt das Modell unter ungleichen Bedingungen zu „testen“.

## 3. Vor dem Lauf eine Kandidatenkarte schreiben

Nutze eine Karte pro Kandidat oder Workflow:

```text
candidate_id:
model_id / provider:
surface: Local | Worktree | Cloud
entry:
account_or_workspace_scope:
surface_available: yes | no | not_observed
availability_evidence:
not_available_reason:

reasoning_effort_or_config:
task_set_version: three-task-smoke-v1
context_fingerprint:
tools_and_versions:
permission_profile:
acceptance_rubric_version:
cost_basis: actual | credits | token_only | not_observed
known_capacity_or_network_issue:

not_comparable: true | false
not_comparable_reason:
conclusion_status: not_run | candidate | disputed
```

Vor dem ersten Lauf frierst du ein:

- die exakten Aufgabeneingaben und ihre Version;
- Arbeitsfläche, Einstiegspunkt, Provider, Modell und Aufwandseinstellung;
- die relevanten Kontext- und Tool-Versionen;
- Berechtigungen und erlaubte Nebenwirkungen;
- die Abnahmerubrik und den Reviewer;
- die Zeitgrenze und das Wiederholungsbudget; und
- die Kostenmessungsbasis.

Ändere keinen Prompt, füge keinen Kontext hinzu, gewähre kein Tool, erhöhe keinen Aufwand und weite keine Berechtigung nur für einen Kandidaten aus. Ändert sich der Aufgabenvertrag, erhöhe die Version und wiederhole beide Kandidaten.

## 4. Experiment: Drei-Aufgaben-Smoke-Vergleich

**Experimentstatus:** `not_run`. Dies ist ein Übungsprotokoll, kein Beleg dafür, dass dieses Repository einen Modellvergleich durchgeführt hat.

### Vorbereitung

Wähle zwei Kandidaten mit `surface_available: yes` auf derselben Arbeitsfläche. Nutze das versionierte, offline [`three-task-smoke-v1`-Fixture](../../evals/candidates/three-task-smoke-v1/README-DE.md), statt Eingaben aus dem Gedächtnis neu zu erzeugen. Es enthält synthetische, nicht sensible Eingaben plus einen lokalen Validator; es enthält keine Modellläufe. Nutze keine Produktionsdaten, echten Geheimnisse, externen Schreibzugriff, Veröffentlichung, Push, Deployment oder einen kostenpflichtigen Connector. Führe jede Aufgabe zunächst einmal aus und erlaube höchstens eine vorab deklarierte, gleichformatige Nachbearbeitung.

Friere `task_set_version: three-task-smoke-v1`, beide Kandidatenkarten, eine Abnahmerubrik, die Ablageorte der Rohausgaben, die Log-Ablageorte und eine Stoppbedingung für Nichtverfügbarkeit, Kapazitätsunterbrechung, Berechtigungsfehlpassung, Eingabedrift oder Tool-Versionsdrift ein.

### Feste Aufgaben

Die kanonischen Aufgaben-IDs sind `extract-01`, `markdown-02` und `gap-review-03`. Sie decken strukturierte Extraktion, eingeschränkte Markdown-Umwandlung und ein Review von Evidenzlücken ab. Jedes Aufgabenverzeichnis enthält eine Instruktion, eine eingefrorene Eingabe, eine erwartete Ausgabe und einen Validator. Das Paket veröffentlicht die exakten SHA-256-Werte der Eingaben in `fixture.json`, damit ein Reviewer Drift erkennen kann.

Ersetze keine Aufgabe durch eine hübschere Demo für einen Kandidaten. Muss eine Eingabe, eine Instruktion, ein Ausgabeschema oder eine Abnahmeregel geändert werden, erstelle eine neue Aufgabenversionsstufe und wiederhole beide Seiten.

### Ablauf

1. Vervollständige und sichere beide Kandidatenkarten, bevor du einen Kandidaten aufrufst.
2. Prüfe die Verfügbarkeit auf der gewählten Arbeitsfläche und halte den Belegort fest.
3. Führe Kandidat A und B in derselben Aufgabenreihenfolge mit denselben Eingaben und derselben Abnahmerubrik aus.
4. Sichere Rohausgaben, bevor sie von Menschen bearbeitet werden. Halte Ereignisse, Dauer, Kostenbasis und Fehlerkategorie fest.
5. Schlägt ein Lauf fehl, erlaube nur die vorab deklarierte kontrollierte Nachbearbeitung. Mache aus wiederholten blinden Versuchen keine versteckte Erfolgskennzahl.
6. Prüfe jede `not_comparable`-Zeile, bevor du eine Zusammenfassung berechnest.
7. Beende mit nur `worth expanding`, `do not expand yet` oder `insufficient evidence`, plus den Grenzen und den Bedingungen für den nächsten Lauf.

### Belege

Der Vergleichsdatensatz sollte mindestens enthalten:

```text
run_id | candidate_id | task_id | model_id | provider | surface | entry
surface_available | availability_evidence
reasoning_effort_or_config | context_fingerprint | tools_and_versions
permission_profile | first_pass | rework_count | duration
cost_basis | cost_observed | error_type | reviewer_score
comparable | not_comparable_reason | raw_evidence
```

Ein weiterer Reviewer sollte die drei Eingaben, Bedingungen und Abnahmekriterien rekonstruieren können. Nutze keine leere Zelle, keine Schätzung und nicht die Ausgabe des anderen Kandidaten, um einen unterbrochenen Lauf zu füllen. Token-Zahlen sind kein Geld, es sei denn, die gewählte Kostenbasis definiert diese Umrechnung ausdrücklich.

## 5. Fehlervarianten und sichere Wiederherstellung

| Fehlervariante | Warum das Ergebnis nicht vergleichbar ist | Sicheres Vorgehen |
|---|---|---|
| Kandidat ist auf der gewählten Arbeitsfläche nicht sichtbar oder aufrufbar | Es gibt keinen Lauf auf derselben Arbeitsfläche zum Vergleichen | `surface_available: no` oder `not_observed` festhalten; diesen Kandidaten stoppen und Nichtverfügbarkeit nicht als Modellqualität werten |
| Modell-Picker und Provider widersprechen sich | Die Anfrage hat möglicherweise nicht das beabsichtigte Modell verwendet | Einen geschwärzten Diff der wirksamen Konfiguration sichern; das Tupel korrigieren oder den Vergleich zu einem Provider-/Workflow-Test umbauen |
| Ein Kapazitätsfehler unterbricht einen Lauf | Ausgabe und Dauer sind unvollständig, und der nächste Versuch kann von einem Teilzustand starten | Fehler und Checkpoint sichern; als `blocked` oder `not_comparable` einordnen; beide Seiten nur unter einer deklarierten Bedingung erneut ausführen |
| Ein Befehl wartet ohne überprüfbares Ereignis | Ein `Working`-Label ist kein Ergebnis | Die Timeout-Regel anwenden, unterbrechen, Diff und Prozesszustand prüfen und die Verifikation als fehlend festhalten |
| Eine Seite erhält zusätzlichen Kontext, einen höheren Aufwand oder ein neues Tool | Die unabhängige Variable ist nicht mehr nur das Modell | `not_comparable` markieren, beide Datensätze sichern und mit dem eingefrorenen Vertrag erneut ausführen |
| Eine attraktive Demo wird genutzt, um einen Gesamtsieger zu verkünden | Stichprobengröße und Aussageumfang passen nicht zusammen | Zu `candidate` oder `insufficient evidence` zurückkehren; Aufgabenklassen und Wiederholungen ausweiten, bevor die Aussage erweitert wird |

Die realistische Reaktion auf einen Kapazitäts- oder Langzeit-Wartefehler ist nicht „weiterklicken, bis es funktioniert“. Sie lautet: den letzten bekannten Zustand sichern, feststellen, ob die Aufgabe vollständig, teilweise oder unbekannt war, und dann eine begrenzte Wiederherstellung wählen. Ein neues Gespräch kann eine Wiederherstellungsfläche sein, aber es erbt keinen Beweis vom alten Gespräch.

## Reflexion

Antworte aus den Karten und den Rohbelegen, nicht aus dem Gedächtnis:

- Welche Aufgabe hat die Ausweitungs-/Stopp-Entscheidung verändert?
- Welcher Unterschied könnte vom Modell kommen, und welcher von der Arbeitsfläche, dem Provider, dem Kontext, den Tools, den Berechtigungen, der Kapazität oder dem Reviewer?
- Wo würde eine schnellere oder billigere Ausgabe trotzdem die Abnahmerubrik verfehlen?
- Welche Sätze sind offizielle Produktpositionierung, und welche sind Beobachtungen aus diesem Smoke-Lauf?
- Wenn du nur eine attraktive Demo hast, was genau verhindert eine allgemeine Rangfolge?

## Übertragung

Übertrage dieselben Vergleichsfelder auf eine dieser Aufgaben:

- dasselbe Modell auf Local und Worktree;
- Dokumentumwandlung mit einem strengen Ausgabeschema;
- Quellenabgleich in der Recherche mit Zitaten und einer Unbekannt-Spalte; oder
- eine risikoarme Code-Inspektion mit einer Read-only-Toolgrenze.

Friere eine neue Aufgabenversionsstufe und eine domänenspezifische Abnahmerubrik ein. Kopiere die Modellwahl oder das Drei-Aufgaben-Ergebnis nicht in die neue Domäne. Benenne, welche Schlussfolgerungen aufgabenbezogen bleiben und welche Behauptungen verworfen werden müssen.

## Belege dieses Kapitels

Die vorgesehene Lieferung besteht aus zwei Kandidatenkarten, einem eingefrorenen Aufgabensatz und einer Rubrik, ersten Rohläufen und jeder kontrollierten Nachbearbeitung, einer Vergleichstabelle, typisierten Fehlerdatensätzen und einer Ausweitungs-/Stopp-Entscheidung. Bis diese Datensätze existieren, muss das Kapitel `not_run` behalten; offizielle Positionierung und eine einzelne Demo können Evaluierungsbelege nicht ersetzen.

## Quellen und Wartungsgrenze

| Fakten- oder Methodengrenze | Quelle | Zugriff | Gilt für | Verantwortlich / nächste Prüfung |
|---|---:|---|---|
| Offizielle Modellpositionierung, Reasoning-Hinweise, lokale Standardwerte, Cloud-Modellgrenze und Deprecation-Hinweise | [Codex models](https://learn.chatgpt.com/docs/models.md) | 2026-08-11 | Die offizielle Dokumentation zum Zugriffszeitpunkt; kein Konto-Nachweis und kein Benchmark | `facts-maintainer` / 2026-09-11 |
| CLI-Arbeitsfläche und lokaler Repository-Workflow | [Codex CLI](https://learn.chatgpt.com/docs/cli.md) | 2026-08-11 | Offizielle CLI-Dokumentation; nicht die wirksame Konfiguration dieser Sitzung | `facts-maintainer` / 2026-09-11 |
| Cloud-Umgebung, Einrichtung, Logs und Review-Grenzen | [Codex Cloud](https://learn.chatgpt.com/docs/cloud.md) | 2026-08-11 | Offizielle Cloud-Dokumentation; die Einrichtung ist kein abgeschlossener Agent-Schritt | `facts-maintainer` / 2026-09-11 |
| Öffentliche Modell-/Provider-, Kapazitäts- und Langzeit-Wartesymptome | [Feldproblem-Datensatz](../../docs/research/codex-model-selection-official-facts-2026-08-11.md) | 2026-08-11 | Nutzerberichte und Projektleitfaden; keine lokale Reproduktion und kein Anspruch auf eine offizielle Ursache | `curriculum-maintainer` / 2026-09-11 |
| Vergleichsmethode mit festen Aufgaben | [Evaluierungskapitel](19-evaluate-models-and-workflows-DE.md) und das [versionierte Fixture](../../evals/candidates/three-task-smoke-v1/README-DE.md) | 2026-08-14 | Playbook-Methode und lokaler Fixture-Validator; noch keine abgeschlossenen Modellläufe | `evaluation-maintainer` / 2026-09-11 |

Modell-IDs, Arbeitsflächen-Matrizen, Preise, Kapazität, Konfigurationssyntax, Provider-Support, Aufwandskontrollen und Deprecation-Hinweise können sich ändern. Wenn das geschieht, aktualisiere zuerst die Erstparteien-Quellen und dann das Faktenwirkungsregister, den Forschungsdatensatz, dieses Kapitel, betroffene Evaluierungs-Fixtures und die Statusquelle. Halte offizielle Positionierung, Nutzersymptome und lokale Laufzeitbelege in getrennten Sätzen.

## Abnahme-Checkliste

- [ ] Ich kann Aufgabe, Risiko, Arbeitsfläche, Provider und Abnahmerubrik definieren, bevor ich ein Modell benenne.
- [ ] Ich kann tatsächliche Verfügbarkeitsbelege festhalten, statt Zugriff aus einem Modellkatalog, einem Konfigurationswert oder einem Picker-Label abzuleiten.
- [ ] Ich kann zwei Kandidatenkarten mit Modell, Provider, Aufwand, Kontext, Tools, Berechtigungen, Kostenbasis und Aufgabenversionsstufe ausfüllen.
- [ ] Ich kann die sechs ersten Ausführungen in `three-task-smoke-v1` ausführen oder korrekt blockieren, ohne die Bedingungen einer Seite zu ändern.
- [ ] Ich kann Provider-Fehlzuordnung, Kapazitäts- und Langzeit-Wartebelege sichern und Wiederherstellung von Verifikation unterscheiden.
- [ ] Ich kann nur aufgabenbezogene Beobachtungen berichten und erklären, warum eine einzelne Demo keine Gesamtrangfolge und keine Kosten-Nutzen-Aussage beweisen kann.
- [ ] Ich kann feststellen, dass dieses Kapitel weiterhin `candidate` ist und dass sein Experiment und seine Modellbewertung weiterhin `not_run` sind.

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
