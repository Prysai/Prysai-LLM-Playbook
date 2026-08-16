<!-- content_id: chapter-07-skills-plugins-and-tools | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 7: Wie Skills, Plugins, MCP und Tools die Arbeit aufteilen

**Status:** `candidate`. **Vergleich:** `not_run`. Dieses Kapitel lehrt eine Methode;
es belegt nicht, dass ein externer Skill in diesem Repository lief.

**Startpunkt:** Benenne zuerst die Aufgabenlücke und wähle erst dann die kleinste
Fähigkeit, die sie schließt.

## Das Problem

„Ich brauche einen Skill“ ist nicht immer die richtige Diagnose. Skill, Plugin,
MCP-Server, Connector, Skript, Vorlage und Dokument lösen verschiedene Probleme.
Wer sie als austauschbare Namen behandelt, installiert unnötige Fähigkeiten,
verbirgt Abhängigkeiten und erweitert externe Nebenwirkungen unbemerkt.

> Was fehlt dieser Aufgabe? Welche kleinste Fähigkeit schließt die Lücke, während
> Rechte, Lizenz, Abhängigkeiten und Belege kontrollierbar bleiben?

## Lernziele

- Methode, Verbindung, Ausführung und Verteilung unterscheiden;
- eine kleinste nützliche Kombination aus der Aufgabe statt aus einem Verzeichnis ableiten;
- Trigger, Abhängigkeiten, Lizenz, Rechte, Nebenwirkungen und Belege vor der Übernahme prüfen; und
- Datei, Entdeckung, Laden, Übernahme und verifiziertes Verhalten nicht verwechseln.

## Ein realer Einstieg: Entdeckung kann vor der Aufgabe scheitern

Die [Codex-Feldrecherche](../../docs/research/field-problems-codex.md) enthält
öffentliche Symptome, keine offizielle Ursache und keine lokale Reproduktion.

| Symptom | Beobachtung | Beweist nicht | Sichere Reaktion |
|---|---|---|---|
| Skill funktioniert als normale Datei, wird als symbolischer Link aber nicht entdeckt | Dateidarstellung verändert die Entdeckung | Dass jeder Scanner, jedes OS oder jeder Release denselben Fehler hat | Dateiform und Arbeitsfläche sichern; Datei und Link isoliert vergleichen |
| Explizite Skill-Nutzung hängt von einer impliziten Liste ab | Eine explizite Anfrage ist nicht unabhängig von der aktuellen Liste | Allgemeine Routing-Regel oder offizielle Garantie | Sichtbare Liste, exakte Anfrage, Sitzung und geladene Ressourcen getrennt sichern |

Ein Pfad im Repository bedeutet nicht, dass der aktuelle Host ihn entdeckte. Ein
sichtbarer Name bedeutet nicht, dass die Sitzung ihn lud; Laden beweist weder
funktionierende externe Abhängigkeiten noch Berechtigungen.

## 1. Ein vierstufiges Fähigkeitsmodell

```text
Methodenschicht       Skill           wiederholbare Methode für eine Aufgabenklasse
Verbindungsschicht    MCP/Connector   externe Daten, Kontext oder Aktionen
Ausführungsschicht    Tool            lesen, editieren, ausführen, browsen, aufrufen
Verteilungsschicht    Plugin          Paket zum Verteilen und Kombinieren von Fähigkeiten
```

| Schicht | Liefert | Gewährt nicht von selbst |
|---|---|---|
| Skill | Anweisungen und Ressourcen für wiederholte Aufgabe oder Workflow | Rechte, externen Zugriff oder Wirksamkeitsbeweis |
| MCP-Server / Connector | Brücke zu externen Tools, Ressourcen, Kontexten oder Aktionen | Authentifizierung, Aktionsgenehmigung oder sichere Datengrenze |
| Tool | Beobachtbare Aktion wie Datei lesen, Befehl ausführen oder API aufrufen | Grund zur Nutzung, Erlaubnis oder korrektes Ergebnis |
| Plugin | Verteilung und Komposition mehrerer Fähigkeiten | Automatische Autorisierung oder Verfügbarkeitsgarantie |

Für deterministische Wiederholung ist meist ein Skript besser, für eine stabile
Ausgabeform eine Vorlage und für gelegentliches Hintergrundwissen ein Dokument.
Ein Skill lohnt sich, wenn die Methode wiederkehrt, aber Kontexturteil braucht.

## 2. In einer Reihenfolge wählen, die Umfang begrenzt

1. Kläre zuerst das Aufgabenprotokoll.
2. Wiederholt sich die Methode und gehen Schritte verloren, erwäge einen Skill.
3. Nur bei nötigen externen Daten oder Aktionen frage nach Connector oder MCP.
4. Ist die Umwandlung deterministisch, bevorzuge ein Skript.
5. Müssen mehrere Fähigkeiten gemeinsam verteilt werden, erwäge ein Plugin.
6. Erst danach entscheide über Installation, Authentifizierung oder weitere Rechte.

Ein großes Verzeichnis kann mehr Fähigkeit vortäuschen und zugleich den realen
Abhängigkeits- und Berechtigungsgraphen unlesbar machen.

## 3. Mit der Aufgabenlücke beginnen, nicht mit dem Skill-Namen

Vor der Übernahme beantwortest du schriftlich:

- **Aufgabenlücke:** Fehlt stabile Methode, deterministisches Skript, externe Verbindung oder die Aufgabendefinition?
- **Trigger/Nicht-Trigger:** Welche Eingabe löst aus, welche ähnliche Anfrage darf nicht auslösen? Gemeinsame Wörter reichen nicht.
- **Quelle/Revision:** Kann ein Reviewer URL, fixierten Commit, Version oder Hash und Inventardatum prüfen?
- **Lizenz/Abhängigkeiten:** Deckt die Lizenz Ziel-Dateien? Sind NOTICE, verschachtelte Assets und Laufzeitabhängigkeiten inventarisiert?
- **Rechte/Nebenwirkungen:** Was wird gelesen oder geschrieben? Ist Netz oder Konto nötig? Kann es senden, veröffentlichen, löschen oder verändern?
- **Prüfung/Wartung:** Deckt ein isolierter Test positiv, Grenze, Fehler und Transfer? Wer besitzt Approval, Backup, Update und Rollback?

Die Zahl externer Einträge ist kein Qualitätsmaß. Jeder Kandidat benötigt eine
eigene evidenzbasierte Prüfung.

### Plugin-Inhalt und Supportgrenze

Die offizielle [Plugin-Dokumentation](https://learn.chatgpt.com/docs/plugins.md)
beschreibt ein Plugin als installierbares Paket mit Skills, Connectors oder beidem.
Ein Connector kann über einen MCP-Server Tools, geteilte Information oder externe
Aktionen anbieten. Plugin ist Verteilung und Komposition, keine Autorisierung.

Am 2026-08-09 nannte die Supportdokumentation Plugins für ChatGPT Chat/Work im Web,
Desktop und Mobil, Codex in der ChatGPT-Desktop-App und den Plugin-Browser der Codex
CLI; keine IDE-Erweiterung. Mobilzugriff bedeutet nicht dieselbe Browse- oder
Installationsfläche wie Desktop.

```text
Produktsupport → Konto-/Org-Autorisierung → Plugin-Installation
→ Connector-Authentifizierung → neue Sitzung → sichtbarer Skill/Tool
→ tatsächlicher Aufruf → verifiziertes externes Ergebnis
```

Jeder Pfeil ist eine eigene Behauptung. `Sign in with ChatGPT` gewährt weder
automatisch Plugin-Datenzugriff noch genehmigt es Aktionen. Prüfe `OF-015`,
`OF-016`, `UF-001`, `UF-003` und `LB-002` im
[Fact-Impact-Register](../../docs/governance/fact-impact-registry.yaml).

Offizielle Materialien vom 2026-08-10 unterscheiden automatische Zuordnung und
explizite Auswahl: ChatGPT nutzt `@`, Codex `$`; eine neue Chat- oder CLI-Sitzung
nach Installation gehört zum Ablauf. Das sind volatile Produktfakten, keine
automatisch verliehenen Rechte. Ein lokaler Check muss Arbeitsfläche, Sitzung,
Invocation, geladene Ressource, Ausgabe und Ergebnisprüfung sichern. Hier fehlen
solche Runtime-Protokolle, also bleibt der Zustand `not_observed`.

## 4. Das Prüfpaket vor der Übernahme

Vor Installation entsteht eine `skill-adoption-decision.md`:

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

| Entscheidung | Darf behauptet werden | Darf nicht behauptet werden |
|---|---|---|
| `recommendation-only` | „Lohnt weitere Read-only-Prüfung oder isolierten Versuch“ | „Für Installation freigegeben“ |
| `blocked` | „Noch nicht übernehmen; diese Bedingungen lösen die Blockade“ | „Erst installieren, später dokumentieren“ |
| `approved-to-install` | „In diesem Scope installierbar“ | „Installiert“ oder „verifiziert“ |
| `installed-candidate` | „Isolierter Installationskandidat existiert“ | „Team hat übernommen“ oder „production-ready“ |

`draft`, `candidate`, `verified` und `production-ready` sind Projektzustände,
nicht diese Übernahmeentscheidungen. GitHub-Erreichbarkeit klärt keine Lizenz;
ein Manifest beweist keinen erfolgreichen Tool-Aufruf.

### Fünf leicht verwechselte Zustände

| Zustand | Mindestbeleg | Beweist nicht |
|---|---|---|
| Datei existiert | Pfad, Manifest, Inventar oder Hash in fixer Revision | Entdeckung durch aktuelle Fläche |
| Entdeckt | Sichtbare Liste oder Namensauflösung | Laden in dieser Sitzung |
| Geladen | Ressource oder Instruktion in neuer Sitzung | Übernahme durch ein Team |
| Übernommen | Owner- und Genehmigungsnachweis im Scope | Verifiziertes Verhalten |
| Verifiziert | Positiv-, Grenz-, Fehler- und Transferbeleg | Gleiches Verhalten in anderem Konto, Einstieg oder Version |

Zielpfad und Installationslog können `installed-candidate` stützen, überspringen
aber nicht Entdeckung, Laden, Übernahme und Verhaltensprüfung.

### Zwei Übernahmeentscheidungen

- **Empfehlung:** S05 `code-review-and-quality` ist für Diff-Prüfung mit definierter
  Basis ein `recommendation-only`-Kandidat: lokales Archiv von
  `https://github.com/addyosmani/agent-skills`, SHA-256
  `6EEDBE7D2EA3A82417781D879785BD501FBDE21275627F557DE4B76560BA1250`, MIT-Signal
  auf Repository-Ebene. Verschachtelte Abhängigkeiten, vollständige Assets,
  wirksame Rechte und Rollback sind ungeprüft; als Nächstes folgt nur Review oder
  Offline-Test, nicht Installation.
- **Blockiert:** S06 `webapp-testing` bleibt `blocked`: lokales Archiv von
  `https://github.com/composio-community/awesome-codex-skills`, SHA-256
  `D3DA83ED9D474690E7FF235351376114972840C78BC319CBCB8F89CBD704608E`. Ein
  Apache-2.0-Signal an der Wurzel belegt nicht, dass jeder verschachtelte Skill,
  jedes Skript und Asset passende Lizenz-/NOTICE-Abdeckung hat. Ohne Asset-Review
  und übbares Rollback reicht `SKILL.md` nicht.

## 5. Fähigkeiten komponieren, nicht stapeln

```text
Aufgabenprotokoll → Domänenmethode → Tool oder Verbindung → Evidenzprüfung
```

In einem risikoarmen Marketingexperiment definiert das Protokoll Ziel und Grenze,
eine Produktkontextmethode liefert Publikum und Positionierung, ein Analysetool
zeichnet Daten auf und Evidence Review prüft das Ereignis. Zehn überlappende Skills
sind meist weniger verständlich als eine Methode mit einem klaren Protokoll.

## 6. Übergabe vor der Komposition

```text
status | owner | scope | inputs | assumptions | actions_done
actions_not_done | evidence | unverified | blocked_on | next_check
permission_boundary | next_review
```

Domänen-Skill, Task Protocol, Evidence Review und Workflow Orchestrator besitzen
jeweils Methode, Ausführungsgrenze, Claim-Review beziehungsweise Phasen und
Checkpoints. Ein aufgerufener Skill erhält nicht die Rechte eines anderen.

## 7. Experiment: drei Fähigkeitskombinationen vergleichen

Wähle eine lokale, risikoarme, reversible Aufgabe. Bereite ein Protokoll, zwei
Skill-Kandidaten mit fixer Revision und eine simulierte externe Verbindung vor.
Einer soll weiter isoliert geprüft, einer wegen unklarer Lizenz, NOTICE oder
Rücknahme abgelehnt werden. Lade keine echten Daten hoch, sende keine Nachrichten,
schreibe nicht an Dritte und authentifiziere keine externen Konten. Jede Kombination
erhält eine `run-id`; Aufgabentext und Abnahmerubrik bleiben gleich.

Vergleiche (1) Protokoll allein, (2) Protokoll plus Domänen-Skill und (3) Protokoll,
Skill plus externe Verbindung. Schließe die Vorprüfung vorher ab. Der Versuch bleibt
read-only: nicht installieren, authentifizieren oder Teamkonfiguration aktivieren.
Vergleiche Ausgabequalität, Zeit, Rechteumfang, Verifikationskosten und Nebenwirkung.

Bewahre Wege, `run-id`, zwei Entscheidungen, Rechte-/Abhängigkeitstabelle,
Lizenzfunde, simulierte oder echte Ausgabe, Prüfergebnis und eine Liste nicht
ausgeführter externer Aktionen auf. Ein valider Eintrag macht Quelle/Revision
prüfbar, verweist Lizenzschlüsse auf echte Dateien, benennt Installations-, Backup-
und Rollback-Ziel, Owner und Approval, deckt positiv/Grenze/Fehler/Transfer ab und
behält die Basis ohne zusätzliche Verbindung. Ein simulierter Aufruf heißt simuliert.

Erkläre, welcher Beleg `recommendation-only` oder `blocked` weiterbewegen würde.
Notiere, ob jede Beobachtung Existenz, Entdeckung, Laden, Übernahme oder Verifikation
zeigt; ein früher Zustand ersetzt keinen späteren.

## Bewusster Fehlerfall und Transfer

Gib drei überlappende Skills vor, von denen einer externes Hochladen verlangt,
obwohl nur lokale Ordnung nötig ist. Ergänze einen Kandidaten mit erreichbarem Repo
und `SKILL.md`, aber unklarer Lizenz oder Rücknahme. Die Übung ist bestanden, wenn
Überlappung erkannt, unnötige Rechte abgelehnt, der unklare Kandidat `blocked`
bleibt und die Basis mit Protokoll allein oder einem Skill erhalten bleibt.

Übertrage das Vier-Schichten-Modell auf Recherche-Workflow und Produktbericht.
Bestimme jeweils Methode, Verbindung und jede deterministische Umwandlung, die ein
Skript sein sollte.

## Quellen und Wartungsgrenze

| Tatsache oder Grenze | Quelle | Zugriff | Geltung |
|---|---|---:|---|
| Skills als Task-/Workflow-Anweisungen und Ressourcen | [Skills and Plugins](https://learn.chatgpt.com/docs/skills-and-plugins.md) | 2026-08-09 | Offizielle Beschreibung, kein Ladebeleg hier |
| Plugin-Komposition, Flächen, Installation und Approval | [Plugins](https://learn.chatgpt.com/docs/plugins.md) | 2026-08-09 | Zugriff kann je Konto/Organisation wechseln |
| MCP-Server, Tools/Ressourcen/Prompts und Allow/Deny | [MCP](https://learn.chatgpt.com/docs/extend/mcp.md) | 2026-08-09 | Authentifizierung, Tools und Policy brauchen eigene Prüfung |
| Connector-/MCP-Aktionen und Approval-Grenze | [Agent approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | 2026-08-09 | Keine Runtime-Konfiguration hier |
| Link-Entdeckung und explizite Invocation | [Codex-Feldrecherche](../../docs/research/field-problems-codex.md) | 2026-08-09 | Öffentliche Berichte ohne Reproduktion oder offizielle Ursache |
| Kandidatenarchiv und Lizenzsignale | [Skill-Kandidatenkatalog](../../docs/sources/skill-candidate-catalog.md) | 2026-08-09 | Inventar, keine Installationsfreigabe |

Details zu Skills, Plugins, Connectors, MCP, Manifesten, Authentifizierung und
Invocation können sich ändern. Aktualisiere zuerst Primärquellen und prüfe danach
Fact-Impact-Register, Kapitel, Labs, Skills, Fixtures und betroffene Routen. Mische
offizielle Beschreibung, Community-Symptom und lokalen Runtime-Beleg nicht in einem
Satz.

## Abnahme-Checkliste

- [ ] Ich unterscheide Skill, Plugin, MCP-Server, Connector, Tool, Skript, Vorlage und Dokument.
- [ ] Ich kann Aufgabenlücke, Trigger, Nicht-Trigger, Quellenrevision, Lizenz, Abhängigkeit, Recht, Nebenwirkung, Owner und Rollback erklären.
- [ ] Ich halte einen Kandidaten auf `recommendation-only` und markiere ihn bei unklarer Lizenz oder Rücknahme `blocked`.
- [ ] Ich unterscheide Existenz, Entdeckung, Laden, Übernahme und verifiziertes Verhalten.
- [ ] Ich vergleiche Protokollbasis und Fähigkeitskombination bei fester Eingabe, Abnahme und Evidenzgrenze.
- [ ] Ich nenne nicht ausgeführte externe Aktionen und nötige Belege vor einer Runtime-Erfolgsbehauptung.
- [ ] Ich berichte, dass dieses Kapitel `candidate` und sein Vergleich `not_run` bleibt.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="06-model-selection-DE.md" aria-label="Vorheriges Kapitel: Kapitel 6 · Modellauswahl ist keine Modellverehrung">← Vorheriges<br><strong>Kapitel 6 · Modellauswahl ist keine Modellverehrung</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="../table-of-contents-DE.md" aria-label="Zum deutschen Inhaltsverzeichnis: Kapitel 8 ist noch nicht übersetzt">Nächstes Kapitel in Arbeit →<br><strong>Verfügbarkeit von Kapitel 8 ansehen</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
