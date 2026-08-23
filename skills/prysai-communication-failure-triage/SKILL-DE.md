<!-- content_id: prysai-communication-failure-triage | locale: DE | language: de | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: 2dfe4e3 | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-communication-failure-triage
description: Eine bereits fehlgeschlagene LLM-Interaktion anhand der ursprünglichen Anfrage, des sichtbaren Kontexts, der tatsächlichen Antwort oder des Artefakts und des erwarteten Ergebnisses diagnostizieren; die kleinste Kommunikationskorrektur und einen kontrollierten neuen Lauf vorschlagen. Verwenden Sie den Skill, wenn eine Antwort Vorgaben ignoriert, die vorherige Aufgabe beantwortet, wiederholte Nacharbeit verursacht oder nicht abnahmefähig bleibt. Nicht für eine noch nicht erprobte vage Anfrage, gewöhnliche Textredaktion, Plattformfehler ohne Interaktionsbeleg oder allgemeine Prompt-Vorlagen verwenden.
---

# Triage bei Kommunikationsfehlern

Behandeln Sie Anfrage, Kontext, Antwort, Artefakt und Rückmeldung als Belege.
Leiten Sie aus einer einzelnen fehlgeschlagenen Interaktion weder verborgenes
Reasoning, System-Prompts, den Dienstzustand noch einen allgemeinen Modellfehler
ab.

## Das Belegpaket verlangen

Verlangen Sie vor der Diagnose vier Dinge:

1. die ursprüngliche Anfrage oder die bestmöglich erhaltene Fassung;
2. den sichtbaren Kontext, Eingaben, Tools, Berechtigungen und
   Gesprächszustand;
3. die tatsächliche Antwort oder das tatsächliche Artefakt;
4. das erwartete Ergebnis oder ein konkretes Fehlersymptom.

Stellen Sie höchstens drei Fragen, wenn ein fehlendes Element die Diagnose
ändern könnte. Stoppen Sie mit `insufficient_evidence`, wenn der fehlende Beleg
nicht wiederhergestellt werden kann. Fordern Sie niemals Token, Passwörter,
Cookies, private Schlüssel oder Dateien mit Geheimnissen an.

## Vor der Diagnose weiterleiten

- Geben Sie eine unversuchte, vage Aufgabe an das Task Protocol weiter.
- Geben Sie ein reines Audit einer Abschlussbehauptung an Evidence Review weiter.
- Geben Sie Fragen zu aktuellem Befehl, Feature, Konto oder Plattformzustand an
  Source Investigator weiter. Verwenden Sie Platform Adapter Review nur, wenn
  das geprüfte Artefakt selbst eine plattformspezifische Lektion oder ein
  Workflow ist, der gegenüber dem universal core eine ausführbare Differenz
  behauptet.
- Geben Sie einen reproduzierbaren Softwarefehler an die Fehlerdiagnose weiter.
- Verwenden Sie gewöhnliche Textredaktion, wenn ohne fehlgeschlagene
  Interaktion nur die Formulierung verbessert werden soll.

Übernehmen Sie nur die Naht nach dem Fehler: Ordnen Sie die beobachtete
Abweichung ein, ändern Sie genau eine kleine Kommunikationsbedingung und
definieren Sie einen neuen Lauf, der zeigen kann, ob diese Änderung geholfen
hat.

## Beobachtbare Nahtstellen einordnen

Wählen Sie höchstens zwei Hauptklassen:

- `outcome_acceptance`: Ergebnis, Zielgruppe, Ausgabeform oder Abnahmetest
  fehlte oder widersprach sich;
- `context_provenance`: Eine notwendige Eingabe fehlte, war veraltet,
  widersprüchlich, übermäßig oder hatte keine geklärte Autorität und Priorität;
- `constraint_authority`: Umfang, verbotene Aktionen, externe Auswirkungen,
  Bestätigungen oder Stoppregeln waren unklar;
- `turn_state_protocol`: Die Antwort folgte einer alten Aufgabe, die aktuelle
  Arbeitsoberfläche war unklar oder Text und ausführbare Anweisung wurden
  verwechselt;
- `evidence_feedback`: Wörter wie „besser“, „professionell“ oder „fertig“
  hatten keine beobachtbare Prüfung, Fehleridentität,
  Erhaltungsregel oder Revisionsgrenze.

Halten Sie für jeden Befund fest:

```text
observed_symptom:
candidate_class:
direct_evidence:
alternative_explanations:
confidence: low | medium | high
discriminating_check:
```

Nennen Sie dies eine Kandidatenklasse, nicht die Root Cause. Mehr Kontext ist
nicht automatisch die Korrektur; irrelevanter oder widersprüchlicher Kontext
kann selbst der Fehler sein.

## Die kleinste Korrektur vornehmen

Ändern Sie eine Bedingung, die zum beobachteten Symptom passt. Ergänzen Sie
lieber ein fehlendes Ergebnis, eine Eingabepriorität, ein Verbot, einen
Zustandsreset oder eine Abnahmeprüfung, als die ganze Anfrage umzuschreiben.
Zeigen Sie einen kompakten Diff von Original und Überarbeitung und verknüpfen
Sie jede geänderte Zeile mit einem Befund.

Bewahren Sie die Wörter und Arbeitsweise der Person, solange diese nicht das
beobachtete Problem sind. Fügen Sie keine Zeremonie, kein Lob, Rollenspiel,
„Schritt für Schritt denken“, emotionalen Druck oder unbelegte
Leistungsversprechen hinzu.

## Einen vergleichbaren neuen Lauf definieren

Halten Sie Aufgabe, Eingabe, Modell oder Arbeitsoberfläche, Tools,
Berechtigungen, Budget und Abnahmekriterien konstant. Ändern Sie nur die
vorgeschlagene Kommunikationskorrektur. Wenn sich eine andere Bedingung ändert,
kennzeichnen Sie den Vergleich als `not_comparable`.

Setzen Sie das Ergebnis auf genau einen dieser Zustände:

- `unrun`
- `improved_on_this_case`
- `unchanged`
- `regressed`
- `not_comparable`

Schreiben Sie aus einem bloßen Prompt-Vorschlag nie `resolved`. Wenn zwei
vergleichbare neue Läufe keine Verbesserung zeigen, fügen Sie dem Prompt keinen
weiteren Text hinzu und übergeben Sie den ersten Bruchpunkt.

## An Aktions- und Wissensgrenzen stoppen

Stoppen Sie, bevor Sie Geheimnisse lesen, Berechtigungen erweitern,
veröffentlichen, deployen, eine andere Person kontaktieren oder einen externen
Zustand ändern. Die Bitte, eine Bestätigung zu entfernen, macht eine riskante
Aktion nicht zu einem Kommunikationsproblem.

Wenn der wahrscheinliche Fehler von einem unsichtbaren System-Prompt, privaten
Log, einer Kontokonfiguration, dem Dienstzustand oder der Produktimplementierung
abhängt, halten Sie ihn als `unknown` fest und leiten ihn an die passende
Plattformuntersuchung weiter. Lehnen Sie Anfragen nach verborgenem Reasoning
oder nach Anweisungen zur Umgehung von Sicherheit und Autorität ab.

## Die Triage-Karte liefern

Geben Sie zurück:

```text
target_outcome:
expected_vs_observed:
evidence_received:
primary_findings: maximum two
alternatives_ruled_out:
smallest_repair:
prompt_diff:
rerun_contract:
result_status:
evidence:
unknowns:
risk:
stop_conditions:
handoff:
```

Akzeptieren Sie das Ergebnis nur, wenn jeder Befund direkten Beleg nennt, jede
Änderung ein benanntes Symptom adressiert, der neue Lauf eine Variable ändert,
keine Berechtigung erweitert wird und der Status nicht über die vorhandenen
Laufbelege hinausgeht.

## Wartungsnotiz

- `source`: originäre Prysai-Lab-Methode, abgeleitet aus Aufgaben-, Beleg- und
  Autoritätsverträgen, dem Kommunikations-Clinic und der
  Fehlerklassifizierung
- `license`: originäre Überarbeitung; offizielle Anbieterhinweise bleiben als
  Referenz verknüpft
- `owner`: communication-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-12`
- `content_status`: `candidate`
