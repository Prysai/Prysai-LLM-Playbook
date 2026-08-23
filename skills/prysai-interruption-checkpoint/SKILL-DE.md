<!-- content_id: prysai-interruption-checkpoint | locale: DE | language: de | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-interruption-checkpoint
description: Den beobachtbaren Zustand einer LLM-gestützten Aufgabe nach einer Unterbrechung bewahren und genau eine sichere nächste Entscheidung wählen. Verwenden Sie den Skill, wenn Modell nicht verfügbar, Task abgelaufen, Session verloren, Tool fehlend oder Handoff getrennt ist, bevor Abnahmeevidenz sichtbar ist. Nicht für Retry, Diagnose einer bewahrten Interaktion, Audit eines vorhandenen Claims oder Ableitung von Plattformverhalten verwenden.
---

# Unterbrechungs-Checkpoint

Besitzen Sie die erste sichere Minute nach der Unterbrechung. Bewahren Sie
Sichtbares, lassen Sie Unsichtbares als `unknown` stehen und stoppen Sie, bevor
eine neue Aktion eine unklare Aufgabe in eine nicht prüfbare Geschichte macht.

## Nur die Unterbrechungsnaht routen

Nutzen Sie den Skill, wenn ein Task teilweise sein kann und eine sichtbare
Unterbrechung den nächsten Schritt unklar lässt: unavailable model, Timeout,
verlorene Session, fehlendes Tool oder getrenntes Handoff.

Geben Sie ab, wenn:

- bewahrte Anfrage, Antwort und erwartetes Ergebnis Kommunikationsreparatur
  brauchen: Communication Failure Triage;
- Completion-, Reliability- oder Release-Claim geprüft werden soll: Evidence
  Review;
- ein aktueller Fakt zu benannter Plattform geprüft werden muss: Source
  Investigator;
- neue oder geänderte Aufgabe Action und Berechtigungen braucht: Task Protocol.

Diagnostizieren Sie keinen Provider, leiten Sie keine Ursache ab, vergleichen Sie
keine Modelle, erklären Sie keinen Accountstatus und erstellen Sie keine
allgemeine Recovery-Prozedur aus einer einzigen Unterbrechung.

## Minimales Evidenzpaket bewahren

Sammeln Sie nur bereits Sichtbares:

1. `goal` — gewünschtes Ergebnis in einem Satz;
2. `observed_event` — sichtbare Unterbrechung ohne Ursache;
3. `last_inspectable_artifact` — Diff, Test, Dateiansicht, Notiz oder
   `none_observed`;
4. `acceptance_evidence` — Completion-Check oder `unknown`;
5. `external_actions` — alles Gesendete, Geänderte, Hochgeladene, Ausgegebene,
   Committe oder Veröffentlichte oder `not_observed`.

Füllen Sie kein fehlendes Feld mit plausibler Kontogeschichte. Fordern Sie
keine Secrets, Tokens, Passwörter, Cookies, privaten Logs, Account-Screenshots
oder themenfremden Kontext an.

## Ohne fertige Geschichte klassifizieren

Genau einen Zustand verwenden:

- `complete` nur bei bereits prüfbarer deklarierter Abnahmeevidenz;
- `partial` bei sichtbarem Artefakt ohne Erfüllungsnachweis;
- `unknown`, wenn Artefakt, Bedeutung oder Abnahmebeleg fehlt.

Unterbrechungsmeldung ist weder Diagnose noch Taskbeleg. Neuer Prompt erbt keine
Completion-Evidenz aus einer früheren Aufgabe.

## Eine begrenzte nächste Entscheidung wählen

Standard ist `hold` bei `R0`: Receipt bewahren, nichts tun.

Bieten Sie `inspect_local` bei `R1` nur an, wenn der Auftraggeber lokales,
reversibles Ziel, exakte Beobachtung und den Hinweis liefert, dass die
Inspektion den früheren Abschluss allein nicht beweist. Der Skill zeichnet die
Entscheidung auf; er führt die Inspektion nicht aus.

Bei frischer Aufgabe, Retry, Toolnutzung, Modell-/Provider-/Account-/Setting-
Wechsel, Netzwerk, Upload, Ausgabe, Commit, Push, Publish oder Deploy: stoppen
und an Task Protocol übergeben. Separates Permission-, Checkpoint-, Rollback-
und Acceptance-Gate verlangen.

## Stopbedingungen

Geben Sie `blocked` zurück, wenn Ziel, letztes prüfbares Artefakt, Bedeutung
der Abnahme oder Autorität für nächste externe Aktion fehlt. Niemals automatisch
retryen oder „continue from where left off“ senden, Modell/Account/Plan
wechseln, einen Providerreport als Ursache behandeln, Account/externe Dienste
prüfen oder einen Teilstatus als abgeschlossen ausgeben.

## Checkpoint-Receipt liefern

Geben Sie exakt zurück:

```text
checkpoint_status: ready_for_one_bounded_next_decision | blocked_on_<field>
goal:
observed_event:
last_inspectable_artifact:
acceptance_evidence:
state_classification: complete | partial | unknown
knowns:
unknowns:
external_actions:
next_decision: hold | inspect_local | handoff
handoff:
risk_and_permission_boundary:
```

Akzeptieren Sie nur einen Receipt, der `unknown` explizit bewahrt,
Unterbrechung und Completion trennt, keine unautorisierte Außenaktion nennt und
höchstens eine Entscheidung zuweist. Dies ist eine Candidate-Methode, kein
Beleg für Wiederherstellbarkeit, Serviceverfügbarkeit oder Lernerfolg.

## Wartungseintrag

- `source`: ursprüngliche Prysai-Lab-Methode aus source-bounded interruption
  checkpoint, Task Protocol und Evidence Review
- `license`: ursprüngliche Überarbeitung; öffentliche Capacity-Reports und
  API-Dokumentation bleiben unter `docs/sources/asset-register.md` Referenz
- `owner`: reliability-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-14`
- `content_status`: `candidate`
