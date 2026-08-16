<!-- content_id: chapter-21-team-capability-system | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 21: Ein Team-Fähigkeitssystem aufbauen

**Status:** `candidate`. **Experiment:** `draft / not_run`. Die Übung ist eine statische Simulation: Sie autorisiert weder Verbindungen noch Senden, Schreiben, Pushes oder Veröffentlichungen und beweist keine Produktionsverbindung.

## Das Problem

Eine Person kann Codex mit eigener Erfahrung durch eine Aufgabe führen. Ein Team muss zusätzlich klären: Wer besitzt die Regel? Welchem Skill darf man vertrauen? Wer aktualisiert oder zieht ihn zurück? Ohne gemeinsame Sprache, Methode, Evidenz und Verantwortung verteilt ein Team nur undurchsichtige persönliche Gewohnheiten.

## Vier Ebenen eines Fähigkeitspakets

```text
Gemeinsame Sprache und Projektregeln
            ↓
Wiederverwendbare Methode und Skill
            ↓
Experimente, Aufgabensätze und Evidenzstandard
            ↓
Berechtigungen, Review, Versionierung und Wartungsverantwortung
```

Die Methode allein genügt nicht. Evidenz begrenzt Aussagen; Governance legt fest, wer das Paket nutzen, ändern, veröffentlichen oder widerrufen darf.

## Entscheidung: Berechtigung ist nicht Aufgabenfreigabe

| Aktion | Sicherer Umfang | Freigabe | Evidenz und Wiederherstellung |
|---|---|---|---|
| Analyse | Anonymisierte schreibgeschützte Kopie | Aufgabenverantwortliche Person | Eingabe und Log; Kopie verwerfen |
| Entwurf | Isolierter Branch und benannte Dateien | Eigentümer und Reviewer | Basis-hash, Diff, Validierung; Diff zurücksetzen |
| Checks ausführen | Testdaten und benannte Befehle | Ausführungsverantwortliche Person | Log und Exit-Code; Prozess stoppen |
| Push/Release | Benanntes Repository oder Entwurfsziel | Reviewer oder Release-Verantwortung | Vorschau, Abnahme, Rollback; Version zurücksetzen |
| Rechte/Geheimnisse ändern | Minimal, befristet, widerrufbar | Benannte Freigabe | Umfang, Ablauf, Audit; sofort widerrufen |

Eingeloggt zu sein oder Zugriff zu haben ist keine Aufgabenfreigabe. Sind Umfang, Ziel, Freigabe oder Rollback unklar, lautet die richtige Entscheidung `blocked`.

## Aktion: der kleinste Paketvertrag

```text
capability-pack/
├─ README.md                  # Zweck, Umfang, Reproduktion, Grenzen
├─ manifest.yaml              # id, Version, Eigentümer, Status, nächste Prüfung
├─ context/project-context.md # Begriffe, Grenzen, vertrauenswürdige Quellen
├─ protocol/task-protocol.md  # Eingabe, Entscheidungen, Aktionen, Stopps
├─ examples/                  # positives und Fehlerbeispiel
├─ eval/                      # Abnahme und Evidenzindex
└─ governance/                # Rechte, Verantwortung, Rollback
```

Das Manifest enthält `id`, `version`, `owner`, `status`, Quelle und Lizenz, nächsten Prüftermin, erlaubten Umfang und Rollback. Eine Version macht Änderungen nachvollziehbar, sie beweist kein verifiziertes Verhalten.

## Experiment: ein Paket übergeben und unabhängig reproduzieren

Wählt in einem temporären Repository „Dokumentenreview vor Release“ oder „Projektorientierung für neue Mitglieder“ als feste Aufgabe. Die Eingabe enthält erledigte und unbestätigte Punkte, einen veralteten Befehl und eine Berechtigung, die Bestätigung verlangt. A führt das Protokoll aus und speichert hash und Log. B erhält nur Paket und Eingabe, arbeitet in einer zweiten Kopie und protokolliert Gelesenes, Aktionen, Stopps, Diff, Validierung und implizite Wissenslücken. A ändert nur eine Ebene, erhöht von `0.1.0` auf `0.1.1`, dann führt B erneut aus.

Keine echten Konten verbinden, Daten hochladen, Nachrichten senden, pushen, veröffentlichen oder langlebige Geheimnisse speichern. Jeder Lauf benötigt `run_id`, Mitglied, Version, Eingabe-hash, tatsächliche Änderungen, Befehle und Exit-Codes, Reviewer, unbestätigte Punkte und Status. Ein Kandidaten-Pass verlangt von A und B mindestens 8/10 für Verständnis, Kontext, Aktionsgrenze, Evidenz und Fehlerstopp, keine unautorisierten Aktionen und Reproduktion ohne mündliche Ergänzung. Fehlt etwas, bleibt er `candidate` oder `blocked`.

## Fehlerfall und Reflexion

Entfernt `owner` und `version`: Das Paket muss abgelehnt werden. Auch wenn eine statische Liste jede externe Fähigkeit als `requested` kennzeichnet, entsteht keine echte Freigabe. Umfang, Ziel, Freigabe, Ablauf und Rollback müssen geklärt werden; bis dahin wird gestoppt. Ordnet Lücken gemeinsamer Sprache, Methode, Evidenz oder Governance zu. „Ich verstehe es“ ersetzt weder Log noch Diff noch unabhängige Reproduktion.

## Abnahmecheckliste

- [ ] Ich trenne persönliche Erfahrung von gemeinsamer Sprache, Methode, Evidenz und Governance.
- [ ] Mein Paket enthält Version, Eigentümer, Quelle, Rechte und Rollback.
- [ ] Eine andere Person kann den Kernablauf ohne mündliche Erklärung reproduzieren.
- [ ] Jeder Lauf hat hash, Log, Diff, Validierung und unbestätigte Punkte.
- [ ] Ich kann zu breite Rechte oder Releases blockieren.

Berechtigungen, Connectoren und Produktoberflächen sind veränderliche Fakten. Prüfe die aktuelle offizielle Dokumentation. Dieses Kapitel bleibt `candidate`; die Simulation beweist weder Produktionsverbindung noch Teamwirkung.

## Beiträge einreichen, die sich schnell prüfen lassen

Das Team muss nicht jeden Vorschlag zu einer großen Änderung machen. Ein gut prüfbarer Test- oder Content-PR löst ein klares Problem und lässt Quelle, Änderung, Validierung und Unsicherheit in wenigen Minuten finden.

```yaml
contribution_type: "test-case | content-correction | translation | skill-candidate"
problem: "eine konkrete zu korrigierende oder prüfende Behauptung"
scope: "erlaubte Dateien und was unverändert bleibt"
source_or_fixture: "offizielle URL oder teilbares minimales Fixture"
expected_result: "prüfbarer Output, Fehler oder Blockierbedingung"
evidence: "Befehl, Log, Diff, Screenshot oder Ort der Bewertung"
license: "original oder Lizenzrecord im Asset Register"
reviewer_questions: ["Hat die Tatsache eine Quelle?", "Ändert sich Berechtigung oder Umfang?", "Was geschieht bei Fehler?"]
```

Füge keine Secrets, echten Kundendaten, unautorisierten Model Output oder nicht weiterverteilbares Material ein. Benötigt ein Test Account, Zahlung, Netzwerk, Write oder plattformspezifische Rechte, markiere ihn zuerst als `requested` oder `blocked`. Weder CI noch Maintainer sollen Autorisierung erraten.

### Minimaler Weg zum schnellen Merge

1. Ein PR enthält eine unabhängig prüfbare Änderung; umfassende Formatierung und Content-Änderung werden getrennt.
2. Ein Test enthält festen Input, erwartetes Ergebnis, Fehlerbedingung und minimalen Reproduktionsbefehl. Ohne Lauf steht dort `not_run`.
3. Content enthält Claim, Quelle, Abrufdatum, Umfang und Prüftermin; eine Übersetzung nennt zusätzlich EN-Quelle und Review-Status.
4. Der Maintainer prüft Lizenz, Datenumfang, Berechtigungen und Rollback vor Links, Struktur und passenden Tests.
5. Nur Änderungen mit klarem Umfang, auffindbarer Evidenz, bestandenen Checks und ohne Rechteausweitung kommen für schnellen Merge infrage; sonst folgt Klärung oder der Status bleibt `candidate`.

## Selbstcheck

- [ ] Ich kann einen Vorschlag als ein Problem, festen Input und prüfbares Ergebnis formulieren statt als „mach es besser“.
- [ ] Ich weiß, was nicht in einen PR gehört, und ersetze Autorisierung oder unabhängiges Review nicht durch grüne CI.
- [ ] Ich kann begründen, warum eine Änderung schnell mergebar ist oder `blocked` / `candidate` bleiben muss.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="20-personal-codex-work-system-DE.md">← Vorheriges<br><strong>Kapitel 20 · ein persönliches Codex-Arbeitssystem aufbauen</strong></a></td><td align="right"><a data-chapter-nav="next" href="22-continuous-update-and-future-proofing-DE.md">Weiter →<br><strong>Kapitel 22 · kontinuierliche Aktualisierung und Zukunftssicherheit</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
