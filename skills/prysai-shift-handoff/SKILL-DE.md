<!-- content_id: prysai-shift-handoff | locale: DE | language: de | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-shift-handoff
description: Für wiederkehrende LLM-Zusammenarbeit einen aktuellen Arbeitsbrief vorbereiten, der wiederverwendbare Kriterien, wechselndes Element, Autorität und Abnahmeevidenz getrennt hält. Verwenden Sie ihn, wenn gestriger Kontext oder ein früheres Beispiel mit heutiger Arbeit verwechselt werden könnte. Nicht zum Erstellen von Produktkontext, vollständigem Task Protocol, Wiederherstellung, Claim-Audit oder Ausführung verwenden.
---

# Schichtübergabe

Erstellen Sie den kleinsten Brief, der ein wechselndes Arbeitselement sichtbar
macht, ohne zu behaupten, dass früherer Chat, Beispiel, Erlaubnis oder Ergebnis
heute noch gilt. Der Skill bereitet eine Übergabe vor; er sendet keinen Prompt,
prüft kein System und erledigt die Arbeit nicht.

## Nur die wiederkehrende Naht besitzen

Nutzen Sie den Skill, wenn ein wiederholter Textworkflow dauerhafte Kriterien,
aber ein wechselndes Element hat: heutige Feedbacknotiz unter genehmigter
Taxonomie klassifizieren, Wochenupdate gegen Hausstil prüfen oder einen neuen
Quelleneintrag in feste Form bringen.

Geben Sie ab, wenn Produkt-, Zielgruppen-, Positionierungs- oder Messkontext
eine versionierte Entscheidung braucht: Product Context; wenn Outcome, Scope,
Autorität oder Acceptance unklar sind: Task Protocol; bei früher abgebrochener
Aufgabe: Interruption Checkpoint; bei vorhandenem fehlgeschlagenem Austausch:
Communication Failure Triage; bei aktuellem Fakt: Source Investigator. Datei,
Datensatz, Tool, Konto, Netzwerk oder Außenwirkung muss vor dem Brief an Task
Protocol übergeben werden.

Machen Sie aus einem wiederholten Chatmuster keinen Claim über Memory,
Context-Window-Verhalten, Kosten, Persistenz, Automation oder benannte
Produktkonfiguration.

## Eine stabile und eine aktuelle Karte verlangen

Sammeln Sie nur sichtbare Eingaben. **Stabile Karte**:

1. `work_stream` — wiederkehrende Arbeit in Alltagssprache;
2. `criteria_revision` — Version, Datum oder unveränderliche Regelreferenz;
3. `allowed_inputs` — Material, das für jedes Element zulässig ist;
4. `forbidden_assumptions` — Fakten, Quellen, Berechtigungen oder alte Outputs,
   die nicht geerbt werden dürfen;
5. `response_shape` — verbindliche Ergebnisform.

**Aktuelle Karte**:

1. `item_id` — nicht-sensitive lokale Kennung;
2. `item_input` — aktueller gelieferter Text oder minimale sichere Zusammenfassung;
3. `item_change` — was heute neu ist;
4. `task_request` — das jetzt verlangte Ergebnis;
5. `acceptance_evidence` — sichtbare Prüfregel oder Artefakt;
6. `authority_and_risk` — `R0` text-only Vorbereitung oder `handoff_required`.

Lehnen Sie Briefs mit Secret, privaten Aufzeichnungen, unlizenzierter Quelle,
unbelegtem Fakt oder nicht freigegebener Aktion ab. Fordern Sie keinen
unnötigen Gesprächsverlauf an.

## Vor dem Schreiben vergleichen

1. Trennen Sie stabile Kartenfelder von Feldern des aktuellen Elements.
2. Bewahren Sie frühere Beispiele nur als markierte Referenz; sie sind weder
   aktueller Fakt noch Acceptance-Ergebnis.
3. Markieren Sie jede nicht erneut gelieferte Tatsache, Permission, Quelle,
   Deadline, Destination oder Acceptance-Prüfung als `missing` oder
   `not_authorized`.
4. Stoppen Sie, wenn das aktuelle Element stabile Kriterien verändert; geben
   Sie an Owner oder Product Context/Task Protocol.
5. Kopierfertigen Brief nur für `R0`-Arbeit mit bereitgestelltem Text liefern.
   Die spätere Aktion braucht eigene Grenze und Evidenz.

## Handoff-Receipt zurückgeben

Geben Sie exakt zurück:

```text
handoff_status: ready_for_text_only_current_item | blocked_on_<field> | handoff_required
work_stream:
criteria_revision:
stable_card:
current_item:
item_change:
allowed_inputs:
forbidden_inheritance:
requested_response_shape:
acceptance_evidence:
authority_and_risk:
unknowns_or_conflicts:
next_owner_or_action:
claim_limit:
```

Verwenden Sie `ready_for_text_only_current_item` nur, wenn stabile und aktuelle
Karte, Anfrage, Form, Acceptance und `R0`-Grenze sichtbar sind. Der Receipt
begrenzt Kontext; er beweist weder Regelbehalten, Verständnis, korrekte Antwort
noch erledigte Aufgabe.

## Fehlerprüfungen

Stoppen oder übergeben Sie, wenn „dieselben Regeln wie letztes Mal“ ohne
Kriterienrevision/aktuellen Check verlangt wird; ein altes Beispiel still zur
Wahrheit wird; das Item Dateien, Credentials, private Inhalte, Browsing,
Publikation, Ausgaben, Account oder externe Wirkung enthält; es Rubrik,
Berechtigung, Ziel oder Output-Vertrag ändert; oder eine Antwort schon als
fertig gilt. Im letzten Fall Evidence Review verwenden.

## Wartungseintrag

- `source`: ursprüngliche Prysai-Lab-Methode aus source-bounded recurring-item
  research record, Task Protocol, Product Context und Interruption Checkpoint
- `license`: ursprüngliche Überarbeitung; offizielle Guidance und öffentliche
  Reports bleiben unter `docs/sources/asset-register.md` Referenzmaterial
- `owner`: workflow-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-11-14`
- `content_status`: `candidate`
