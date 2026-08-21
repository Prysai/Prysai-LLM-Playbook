<!-- content_id: chapter-07-skills-plugins-and-tools | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 7: Wie Skills, Plugins, MCP und Tools die Arbeit aufteilen

**Status:** `candidate`. **Vergleich:** `not_run`. Dieses Kapitel vermittelt eine
Methode; es belegt nicht, dass ein externer Skill in diesem Repository ausgeführt
wurde.

**Startpunkt:** Benenne zuerst, was der Aufgabe fehlt. Wähle erst danach die
kleinste Fähigkeit, die diese Lücke schließt.

## Das Problem dieses Kapitels

„Ich brauche einen Skill“ ist nicht immer die richtige Diagnose. Skill, Plugin,
MCP-Server, Connector, Skript, Vorlage und Dokument lösen unterschiedliche
Probleme. Wer sie nur als austauschbare Bezeichnungen behandelt, installiert
unnötige Fähigkeiten, macht Abhängigkeiten schwerer sichtbar und vergrößert
unbemerkt den möglichen Schaden nach außen.

> Was fehlt dieser Aufgabe? Welche kleinste Fähigkeit schließt diese Lücke, ohne
> dass Rechte, Lizenz, Abhängigkeiten und Belege aus dem Blick geraten?

## Lernziele

- Methode, Verbindung, Ausführung und Verteilung voneinander unterscheiden;
- aus der Aufgabe statt aus einem Verzeichnis die kleinste nützliche Kombination ableiten;
- Trigger, Abhängigkeiten, Lizenz, Rechte, Nebenwirkungen und Belege vor der Übernahme prüfen; und
- eine vorhandene Datei, ihre Entdeckung, ihr Laden, ihre Übernahme und ihr verifiziertes Verhalten nicht verwechseln.

## Praxisfälle: Die Entdeckung kann schon vor dem eigentlichen Auftrag scheitern

Die [Codex-Feldrecherche](../evidence-library-DE.md#source-notes) hält öffentliche
Beobachtungen fest. Sie liefert weder eine offizielle Ursachenanalyse noch eine
lokale Reproduktion.

| Symptom | Beobachtung | Beweist nicht | Sichere Reaktion |
|---|---|---|---|
| Skill funktioniert als normale Datei, wird als symbolischer Link aber nicht entdeckt | Die Darstellung der Datei verändert das Entdeckungsergebnis | Dass jeder Scanner, jedes Betriebssystem und jede Version denselben Fehler zeigt | Dateiform und Arbeitsfläche sichern; normale Datei und Link in einem isolierten Test vergleichen |
| Explizite Skill-Nutzung hängt von einer impliziten Liste ab | Eine ausdrücklich gestellte Anfrage lässt sich nicht von der aktuell sichtbaren Liste trennen | Dass dies eine allgemeine Routing-Regel oder eine offizielle Garantie ist | Sichtbare Liste, exakte Anfrage, Sitzung und geladene Ressourcen getrennt sichern |

Ein Pfad im Repository bedeutet nicht, dass der aktuelle Host ihn entdeckt hat.
Ein sichtbarer Name bedeutet nicht, dass die Sitzung den Skill geladen hat; und
Laden beweist weder funktionierende externe Abhängigkeiten noch passende Rechte.

## 1. Ein vierstufiges Fähigkeitsmodell

```text
Methodenschicht       Skill           wiederholbare Methode für eine Aufgabenklasse
Verbindungsschicht    MCP/Connector   externe Daten, Kontext oder Aktionen
Ausführungsschicht    Tool            lesen, bearbeiten, ausführen, durchsuchen, aufrufen
Verteilungsschicht    Plugin          Paket zum Verteilen und Kombinieren von Fähigkeiten
```

| Schicht | Liefert | Gewährt nicht von selbst |
|---|---|---|
| Skill | Anweisungen und Ressourcen für wiederholte Aufgabe oder Workflow | Rechte, externen Zugriff oder Wirksamkeitsbeweis |
| MCP-Server / Connector | Brücke zu externen Tools, Ressourcen, Kontexten oder Aktionen | Authentifizierung, Aktionsgenehmigung oder sichere Datengrenze |
| Tool | Beobachtbare Aktion wie Datei lesen, Befehl ausführen oder API aufrufen | Grund zur Nutzung, Erlaubnis oder korrektes Ergebnis |
| Plugin | Verteilung und Komposition mehrerer Fähigkeiten | Automatische Autorisierung oder Verfügbarkeitsgarantie |

Für eine deterministische, wiederholbare Umwandlung ist meist ein Skript besser;
für eine feste Ausgabeform eine Vorlage und für gelegentlich benötigtes
Hintergrundwissen ein Dokument. Ein Skill lohnt sich, wenn die Methode wiederkehrt,
aber jedes Mal eine Beurteilung des Kontexts verlangt.

## 2. In einer Reihenfolge wählen, die Umfang begrenzt

1. Kläre zuerst das Aufgabenprotokoll.
2. Wiederholt sich die Methode, und werden dabei regelmäßig Schritte übersprungen, erwäge einen Skill.
3. Wenn externe Daten oder Aktionen wirklich nötig sind, prüfe, ob ein Connector oder MCP genügt.
4. Ist die Umwandlung deterministisch, bevorzuge ein Skript.
5. Müssen mehrere Fähigkeiten gemeinsam verteilt werden, erwäge ein Plugin.
6. Entscheide erst danach über Installation, Authentifizierung oder zusätzliche Rechte.

Ein großes Verzeichnis kann mehr Fähigkeiten vortäuschen und gleichzeitig den
realen Abhängigkeits- und Berechtigungsgraphen unlesbar machen.

## 3. Mit der Aufgabenlücke beginnen, nicht mit dem Skill-Namen

Vor einer Übernahme beantwortest du schriftlich:

- **Aufgabenlücke:** Fehlt eine stabile Methode, ein deterministisches Skript, eine externe Verbindung oder zunächst die Aufgabendefinition?
- **Trigger/Nicht-Trigger:** Welche Eingabe löst aus, und welche ähnliche Anfrage darf nicht auslösen? Gemeinsame Wörter reichen nicht.
- **Quelle/Revision:** Kann ein Reviewer URL, fixierten Commit, Version oder Hash sowie das Inventardatum prüfen?
- **Lizenz/Abhängigkeiten:** Deckt die Lizenz die Zieldateien ab? Sind NOTICE, verschachtelte Assets und Laufzeitabhängigkeiten erfasst?
- **Rechte/Nebenwirkungen:** Was wird gelesen oder geschrieben? Sind Netzwerk oder Konto nötig? Kann die Fähigkeit senden, veröffentlichen, löschen oder verändern?
- **Prüfung/Wartung:** Deckt ein isolierter Test den Normalfall, die Grenze, den Fehler und die Migration ab? Wer verantwortet Freigabe, Backup, Update und Rollback?

Die Zahl externer Einträge ist kein Qualitätsmaß. Jeder Kandidat braucht eine
eigene Prüfung anhand konkreter Belege.

### Plugin-Inhalt und Supportgrenze

Die offizielle [Plugin-Dokumentation](https://learn.chatgpt.com/docs/plugins.md)
beschreibt ein Plugin als installierbares Paket, das Skills, Connectors oder beides
enthalten kann. Ein Connector kann über einen MCP-Server Tools, geteilte
Informationen oder externe Aktionen bereitstellen. Ein Plugin dient der Verteilung
und Komposition; es ist keine Autorisierung.

In der am 2026-08-09 geprüften Supportdokumentation wurden Plugins für ChatGPT
Chat/Work im Web, auf dem Desktop und mobil, für Codex in der ChatGPT-Desktop-App
und für den Plugin-Browser der Codex CLI genannt; eine IDE-Erweiterung wurde nicht
genannt. Dass Chat/Work mobil verfügbar ist, bedeutet nicht, dass dort dieselbe
Browse- oder Installationsfläche wie auf dem Desktop vorhanden ist.

```text
Produktsupport → Konto-/Org-Autorisierung → Plugin-Installation
→ Connector-Authentifizierung → neue Sitzung → sichtbarer Skill/Tool
→ tatsächlicher Aufruf → verifiziertes externes Ergebnis
```

Jeder Pfeil ist eine eigene Behauptung. `Sign in with ChatGPT` gewährt weder
automatisch Zugriff auf Plugin-Daten noch genehmigt es Aktionen. Prüfe `OF-015`,
`OF-016`, `UF-001`, `UF-003` und `LB-002` im
[Fact-Impact-Register](../../docs/governance/fact-impact-registry.yaml).

Die am 2026-08-10 geprüften offiziellen Materialien unterscheiden automatische
Zuordnung und explizite Auswahl: ChatGPT nutzt `@`, Codex `$`; eine neue Chat- oder
CLI-Sitzung nach der Installation gehört zum beschriebenen Ablauf. Das sind
veränderliche Produktfakten, keine automatisch verliehenen Rechte. Ein lokaler
Check muss Arbeitsfläche, Sitzung, exakten Aufruf, geladene Ressource, Ausgabe und
Ergebnisprüfung sichern. Hier fehlen solche Runtime-Protokolle; der Zustand bleibt
also `not_observed`.

## 4. Das Prüfprotokoll vor der Übernahme

Vor der Installation legst du eine `skill-adoption-decision.md` an:

```text
task_gap:
trigger_conditions:
non_trigger_conditions:
source_url / revision / inventory_date:
license / NOTICE / nested_assets:
dependencies:
target_install_scope:
permissions:
external_side_effects:
isolated_trial:
backup_and_restore_target:
rollback_steps_and_success_check:
approval_points:
behavior_tests: positive | boundary | failure | migration
owner / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unverified:
```

| Entscheidung | Was du damit sagen darfst | Was du damit nicht sagen darfst |
|---|---|---|
| `recommendation-only` | „Eine weitere schreibgeschützte Prüfung oder ein isolierter Versuch lohnt sich“ | „Für die Installation freigegeben“ |
| `blocked` | „Noch nicht übernehmen; diese Bedingungen müssen zuerst erfüllt sein“ | „Erst installieren und später dokumentieren“ |
| `approved-to-install` | „In diesem festgelegten Umfang installierbar“ | „Installiert“ oder „verifiziert“ |
| `installed-candidate` | „Ein isolierter Installationskandidat ist vorhanden“ | „Vom Team übernommen“ oder „production-ready“ |

`draft`, `candidate`, `verified` und `production-ready` sind Projektzustände,
nicht Übernahmeentscheidungen. Dass eine GitHub-Seite erreichbar ist, klärt keine
Lizenz; ein vorhandenes Manifest beweist keinen erfolgreichen Tool-Aufruf.

### Fünf leicht verwechselte Zustände

| Zustand | Mindestbeleg | Beweist nicht |
|---|---|---|
| Datei existiert | Pfad, Manifest, Inventar oder Hash in fixer Revision | Entdeckung durch aktuelle Fläche |
| Entdeckt | Sichtbare Liste oder Namensauflösung | Laden in dieser Sitzung |
| Geladen | Ressource oder Instruktion in neuer Sitzung | Übernahme durch ein Team |
| Übernommen | Owner- und Genehmigungsnachweis im Scope | Verifiziertes Verhalten |
| Verifiziert | Positiv-, Grenz-, Fehler- und Transferbeleg | Gleiches Verhalten in anderem Konto, Einstieg oder Version |

Zielpfad und Installationsprotokoll können `installed-candidate` stützen. Sie
ersetzen aber weder die Entdeckung und das Laden noch die Übernahme und
Verhaltensprüfung.

### Zwei Übernahmeentscheidungen

- **Empfehlung:** S05 `code-review-and-quality` ist für eine Diff-Prüfung mit
  definierter Basis ein `recommendation-only`-Kandidat: lokales Archiv von
  `https://github.com/addyosmani/agent-skills`, SHA-256
  `6EEDBE7D2EA3A82417781D879785BD501FBDE21275627F557DE4B76560BA1250` und ein
  MIT-Signal auf Repository-Ebene. Verschachtelte Abhängigkeiten, vollständige
  Assets, tatsächliche Rechte und Rollback sind noch ungeprüft. Der nächste
  Schritt ist daher nur eine Prüfung oder ein Offline-Test, nicht die Installation.
- **Blockiert:** S06 `webapp-testing` bleibt `blocked`: lokales Archiv von
  `https://github.com/composio-community/awesome-codex-skills`, SHA-256
  `D3DA83ED9D474690E7FF235351376114972840C78BC319CBCB8F89CBD704608E`. Ein
  Apache-2.0-Signal im Wurzelverzeichnis belegt nicht, dass jeder verschachtelte
  Skill, jedes Skript und jedes Asset von einer passenden Lizenz oder NOTICE
  abgedeckt ist. Ohne eine Prüfung der einzelnen Assets und ein durchspielbares
  Rollback reicht die bloße Existenz einer `SKILL.md` nicht aus.

## 5. Fähigkeiten zusammenstellen, nicht wahllos stapeln

```text
Aufgabenprotokoll → Domänenmethode → Tool oder Verbindung → Evidenzprüfung
```

In einem risikoarmen Marketingexperiment definiert das Protokoll Ziel und Grenze,
eine Methode für den Produktkontext liefert Publikum und Positionierung, ein
Analysetool zeichnet die nötigen Daten auf und Evidence Review prüft, ob das
Ereignis tatsächlich stattgefunden hat. Zehn überlappende Skills sind meist
schwerer zu verstehen als eine Methode mit einem klaren Protokoll.

## 6. Übergabe vor der Komposition

```text
status | owner | scope | inputs | assumptions | actions_done
actions_not_done | evidence | unverified | blocked_on | next_check
permission_boundary | next_review
```

Domänen-Skill, Task Protocol, Evidence Review und Workflow Orchestrator haben jeweils
eine eigene Aufgabe: Methode, Ausführungsgrenze, Prüfung von Behauptungen sowie
Phasen und Checkpoints. Ein aufgerufener Skill erhält nicht die Rechte eines anderen.

## 7. Experiment: drei Fähigkeitskombinationen vergleichen

### Vorbereitung

Wähle eine lokale, risikoarme und reversible Aufgabe. Bereite ein Protokoll, zwei
Skill-Kandidaten mit fixer Revision und eine simulierte externe Verbindung vor.
Einer soll weiter isoliert geprüft werden können; der andere wird wegen unklarer
Lizenz, NOTICE oder Rücknahme abgelehnt. Lade keine echten Daten hoch, sende keine
Nachrichten, schreibe nicht an Dritte und authentifiziere keine externen Konten.
Jede Kombination erhält eine `run-id`; Aufgabentext und Abnahmerubrik bleiben gleich.

### Aufgabe

Vergleiche (1) das Protokoll allein, (2) das Protokoll plus Domänen-Skill und (3)
das Protokoll mit Domänen-Skill und externer Verbindung. Schließe die Vorprüfung
vorher ab. Der Versuch bleibt schreibgeschützt: nichts installieren oder
authentifizieren und keine Teamkonfiguration aktivieren. Vergleiche Ausgabequalität,
Zeit, Rechteumfang, Prüfaufwand und Nebenwirkungen.

### Belege

Bewahre Pfade, `run-id`, die beiden Entscheidungen, eine Rechte- und
Abhängigkeitstabelle, Lizenzfunde, simulierte oder echte Ausgaben, das Prüfergebnis
und eine Liste der nicht ausgeführten externen Aktionen auf. Ein belastbarer Eintrag
macht Quelle und Revision prüfbar, verweist Lizenzschlüsse auf echte Dateien,
nennt Installations-, Backup- und Rollback-Ziel sowie Owner und Approval, deckt
Normalfall, Grenze, Fehler und Migration ab und behält die Basis ohne zusätzliche
Verbindung. Ein simulierter Aufruf muss als simuliert gekennzeichnet sein.

Erkläre, welcher Beleg `recommendation-only` oder `blocked` in den nächsten Zustand
überführen würde. Notiere, ob jede Beobachtung Existenz, Entdeckung, Laden,
Übernahme oder Verifikation zeigt; ein früher Zustand ersetzt keinen späteren.

## Bewusster Fehlerfall und Grenze

Stelle drei überlappende Skills bereit; einer davon verlangt das Hochladen nach
außen, obwohl für die Aufgabe eine lokale Ordnung genügt. Ergänze einen Kandidaten
mit erreichbarem Repository und `SKILL.md`, dessen Lizenz oder Rücknahme aber unklar
ist. Die Übung ist bestanden, wenn du die Überschneidung erkennst, unnötige Rechte
ablehnst, den unklaren Kandidaten auf `blocked` lässt und die Basis mit dem Protokoll
allein oder mit einem Skill erhältst.

## Reflexion

Welche zusätzliche Fähigkeit hat Beleglage oder Berechtigungen am stärksten
verändert? Welche Beobachtung war nur simuliert? Begründe, warum die Basis ohne
externe Verbindung erhalten bleiben muss.

## Transferaufgabe

Übertrage das Vier-Schichten-Modell auf einen Recherche-Workflow und einen
Produktbericht. Bestimme jeweils Methode und Verbindung sowie jede deterministische
Umwandlung, die besser als Skript umgesetzt wird.

## Quellen und Wartungsgrenze

| Tatsache oder Grenze | Quelle | Zugriff | Geltung |
|---|---|---:|---|
| Skills als Task-/Workflow-Anweisungen und Ressourcen | [Skills and Plugins](https://learn.chatgpt.com/docs/skills-and-plugins.md) | 2026-08-09 | Offizielle Beschreibung, kein Ladebeleg hier |
| Plugin-Komposition, Flächen, Installation und Approval | [Plugins](https://learn.chatgpt.com/docs/plugins.md) | 2026-08-09 | Zugriff kann je Konto/Organisation wechseln |
| MCP-Server, Tools/Ressourcen/Prompts und Allow/Deny | [MCP](https://learn.chatgpt.com/docs/extend/mcp.md) | 2026-08-09 | Authentifizierung, Tools und Policy brauchen eigene Prüfung |
| Connector-/MCP-Aktionen und Approval-Grenze | [Agent approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | 2026-08-09 | Keine Runtime-Konfiguration hier |
| Link-Entdeckung und explizite Invocation | [Codex-Feldrecherche](../evidence-library-DE.md#source-notes) | 2026-08-09 | Öffentliche Berichte ohne Reproduktion oder offizielle Ursache |
| Kandidatenarchiv und Lizenzsignale | [Skill-Kandidatenkatalog](../evidence-library-DE.md#source-notes) | 2026-08-09 | Inventar, keine Installationsfreigabe |

Einzelheiten zu Skills, Plugins, Connectors, MCP, Manifesten, Authentifizierung und
Aufrufen können sich ändern. Aktualisiere zuerst die Primärquellen und prüfe danach
Fact-Impact-Register, Kapitel, Labs, Skills, Fixtures und betroffene Routen. Vermische
offizielle Beschreibung, Community-Symptom und lokalen Runtime-Beleg nicht in einem
Satz.

## Abnahme-Checkliste

- [ ] Ich unterscheide Skill, Plugin, MCP-Server, Connector, Tool, Skript, Vorlage und Dokument.
- [ ] Ich kann Aufgabenlücke, Trigger, Nicht-Trigger, Quellenrevision, Lizenz, Abhängigkeit, Recht, Nebenwirkung, Owner und Rollback erklären.
- [ ] Ich belasse einen Kandidaten bei `recommendation-only` und setze ihn bei unklarer Lizenz oder Rücknahme auf `blocked`.
- [ ] Ich unterscheide Existenz, Entdeckung, Laden, Übernahme und verifiziertes Verhalten.
- [ ] Ich vergleiche Protokollbasis und Fähigkeitskombination bei fester Eingabe, Abnahme und Evidenzgrenze.
- [ ] Ich nenne nicht ausgeführte externe Aktionen und nötige Belege vor einer Runtime-Erfolgsbehauptung.
- [ ] Ich berichte, dass dieses Kapitel `candidate` und sein Vergleich `not_run` bleibt.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="06-model-selection-DE.md" aria-label="Vorheriges Kapitel: Kapitel 6 · Modellauswahl ist keine Modellverehrung">← Zurück<br><strong>Kapitel 6 · Modellauswahl ist keine Modellverehrung</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="08-full-lifecycle-workflow-DE.md" aria-label="Nächstes Kapitel: Kapitel 8 · Von der Definition zur Übergabe">Weiter →<br><strong>Kapitel 8 · Von der Definition zur Übergabe</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
