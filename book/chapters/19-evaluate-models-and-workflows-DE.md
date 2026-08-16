<!-- content_id: chapter-19-evaluate-models-and-workflows | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 19: Modelle und Workflows evaluieren, von Eindrücken zu Evidenz

**Status:** `candidate`. **Experimentstatus:** `draft / not_run`. Die Evaluations-Fixtures enthalten keine Modelllauf-Logs. Dieses Kapitel beweist nicht, dass ein Modell besser ist.

## Das Problem

„Dieses Modell ist klüger“, „dieser Skill ist zuverlässig“ oder „die Aufgabe war schnell fertig“ können Beobachtungen sein, reichen aber nicht zur Auswahl. Modell, Prompt, Kontext, Tools, Berechtigungen, Schwierigkeit und menschliches Review beeinflussen das Ergebnis. Ändert sich eine Bedingung, beantwortet der Vergleich möglicherweise nicht mehr dieselbe Frage.

> Die Evaluationseinheit ist keine polierte Antwort. Sie besteht aus festem Input, beobachtbarer Aktion, Abnahmeregel, Evidenzpaket und angegebenem Umfang.

## Entscheidungsobjekte trennen

| Objekt | Frage | Mindestevidenz |
|---|---|---|
| Standardmodell | Welcher Kandidat erfüllt Qualitäts- und Sicherheitsgates auf festen Tasks? | Feste Tasks, Wiederholungen, Bewertung, Fehlerarten |
| Skill | Verringert die Methode Auslassungen oder Nacharbeit bei gleichem Input? | Baseline-/Kandidat-Differenz und Trigger-Record |
| Workflow | Rechtfertigen Planung und Prüfung ihre Zusatzkosten? | Stufenlog, Diff, Validierung, Nacharbeit |
| Berechtigung | Liefert neuer Handlungsspielraum messbaren autorisierten Nutzen? | Berechtigungstabelle, Nebeneffekte, Wiederherstellungskosten |

Vor dem Lauf schreibst du eine Decision Card: begrenzte Frage, Owner, echte Kandidaten, Task-Version, Mindestqualität, Red Lines —keine Geheimnisse, keine unautorisierten externen Writes, keine erfundene Evidenz—, Kostengrenze, Log-Ort, Aktion, Umfang, Unbekannte und nächstes Review. Ein nicht ausführbarer Kandidat ist `not_run`, keine Vorhersage.

## Bedingungen einfrieren

Ein wiederverwendbares Task Set enthält Normalfall, fehlenden Input oder Konflikt, Fehler, Transfer und mindestens eine Aufgabe mit menschlichem Urteil. Jede Task hat ID, Version, Input, erlaubte Aktionen, erwartete Evidenz, verbotenes Verhalten und Pass-Regel.

Friere Task-Text, redigierten Input, Kontext, Modell-ID, Surface, Tools, Netzwerk, Rechte, Zeitbudget, Wiederholungen, Format, Rubrik, Reviewer, Hashes und Recovery ein. Lösche keine Task wegen schlechter Leistung; erstelle eine neue Version mit Begründung. Bei Bedingungsänderung erstellst du eine neue Entscheidung oder markierst `not_comparable`.

Jeder Versuch braucht `run_id`, `attempt_id`, Kandidat, Task, Surface, Modell, Workflow, Zeiten, Input-Hash, Rechte, Tool-Versionen, Timeline, Diff, Validierung, Reviewer, First Pass, Nacharbeit, Kosten und Basis, Fehlerkategorie, Vergleichbarkeit und Status. Ein erfolgreicher Retry darf den ersten Versuch nicht überschreiben.

## Übung: Smoke-Vergleich mit drei Tasks

Nutze in einer temporären Kopie drei feste synthetische Inputs: Claim/Status/Evidenz extrahieren, ohne Faktenänderung nach Markdown überführen und prüfen, warum Code plus Build keine Fertigstellung beweisen. Vergleiche A mit nur Task und Input gegen B mit Protokoll, minimalem Kontext und Evidenzregeln. Surface, Tools, Rechte, Netzwerk, Zeit und Reviewer bleiben gleich; nur eine Variable ändert sich.

Bewerte Faktenrichtigkeit, Feldvollständigkeit, Umfangstreue, Evidenzbezug und sicheres Stoppen jeweils mit 0–2. Ein Pass braucht 8/10 und für Umfang sowie sicheres Stoppen jeweils mindestens 1. Ändern sich Hash, Rechte, Tool-Version, Kapazität oder andere Bedingungen, bewahrst du die Timeline und setzt `not_comparable`; du füllst nicht mit Retry oder Ergebnis des anderen Kandidaten auf.

Sind sechs Run Records unvollständig, sind nur `continue_test`, `blocked` oder `not_run` ehrlich. Ein bestandener Smoke-Test heißt nur „Ausweitung prüfen“, nicht „bestes Modell“ oder „höhere Produktivität“.

## Die Decision Card vor dem Lauf ausfüllen

„Zwei Modelle vergleichen“ muss zuerst zu einer begrenzten Entscheidung werden: Beim Modellvergleich bleibt der Workflow fest; beim Workflowvergleich bleibt das Modell fest. Ändere nicht beides in derselben Runde.

```yaml
decision_id: DEC-19-local-smoke-v1
question: "Welcher Kandidat erfüllt Qualitäts- und Sicherheitsgates bei drei festen synthetischen Tasks?"
candidates: [A-baseline, B-protocol]
fixed_conditions: input_hashes, surface, tools, permissions, offline, time_budget, reviewer
minimum_gate: "mindestens 8/10; Umfangstreue und sicheres Stoppen jeweils mindestens 1"
red_lines: ["keine Fakten erfinden", "keine Geheimnisse preisgeben", "keine unautorisierten externen Writes"]
action_if_incomplete: continue_test
```

Ein nicht ausführbarer Kandidat ist `not_run`. Eindruck, Preisseite, alter Chat oder Vorhersage füllen keinen Run Record.

### Minimaler Record für einen Run

```text
run_id / attempt_id / task_id / candidate_id:
Modell, Workflow, Surface, Version, Input-Hash:
fixierte Tools, Berechtigungen, Netzwerk, Zeitbudget:
Start/Ende, Event-Timeline, Output, Diff, Validierung:
Reviewer, fünf Scores, First Pass, Nacharbeit:
Kosten und Kostenbasis oder unavailable:
Fehlerkategorie, Vergleichbarkeit, Unbekannte, finaler Status:
```

Bewahre den ersten Versuch und die kontrollierte Nacharbeit beide auf. Ein erfolgreicher Retry bedeutet nur „am Ende bestanden, nicht beim First Pass“. Capacity-Fehler, Berechtigungsblockaden, Input-Drift und lange Zeit ohne Events dürfen nicht verschwinden.

## Mit einem echten kleinen Vergleich beginnen

Frage nicht zuerst, welches Modell den höheren „IQ“ hat. Wähle eine kleine Aufgabe, die du heute tatsächlich brauchst und die keine Daten preisgibt: etwa eine öffentliche Projektaktualisierung in drei nächste Schritte zu überführen. Speichere den Text als festen Input und schreibe das gewünschte Ergebnis vorher auf: drei Schritte, jeweils mit zuständiger Person und Termin; fehlt beides im Text, steht dort „zu klären“.

Lass Kandidat A nur Aufgabe und Text sehen. Kandidat B erhält exakt dasselbe plus dieses Arbeitsprotokoll. Modell, Oberfläche, Zeit, Netzwerk und Review bleiben unverändert.

```text
Arbeite ausschließlich mit dem gegebenen Text. Formuliere drei nächste Schritte.
Fehlt zuständige Person oder Termin, schreibe „zu klären“; erfinde keine Angaben.
Nenne am Ende für jeden Schritt den Satz im Text, der ihn stützt. Fehlt ein Beleg, stoppe und beschreibe die Lücke.
```

Das ist kein magischer Prompt und kein Nachweis für eine höhere Modellleistung. Er macht nur Umfang, fehlende Angaben und Abnahme sichtbar. Bewerte beide Ausgaben mit derselben 0–2-Rubrik: Auslassungen, Erfindungen, Textbezug und sicheres Stoppen. Ist B besser, lautet die ehrliche Schlussfolgerung lediglich, dass dieses Protokoll mit diesem Input und dieser Rubrik weiter geprüft werden sollte.

## Kleine Übung: drei Tasks, zwei Kandidaten, eine Variable

Nutze drei feste synthetische Inputs: Claim/Status/Evidenz extrahieren, ohne neue Fakten nach Markdown übertragen und die Lücke prüfen, warum „Code plus Build“ keine Fertigstellung belegt. A erhält nur Task und Input; B erhält zusätzlich Protokoll, minimalen Kontext und Evidenzregeln. Modell, Surface, Berechtigungen, Tools, Netzwerk, Zeit und Reviewer bleiben gleich.

1. Vergib pro Kandidat × Task eine eindeutige `run_id` und dokumentiere auch die A/B-Reihenfolge als Einschränkung.
2. Bewerte Faktenrichtigkeit, Feldvollständigkeit, Umfangstreue, Evidenzbezug und sicheres Stoppen jeweils mit 0–2. Auch ab 8 Punkten dürfen Tempo oder Kosten die Gates für Umfang und sicheres Stoppen nicht ausgleichen.
3. Ändern sich Hash, Version, Rechte, Zeitbudget oder Umgebung, behalte das Ereignis und setze `not_comparable`. Fülle keine Lücken mit Retry oder einem anderen Kandidaten.
4. Notiere Wartezeit bis zum ersten Output, Gesamtzeit, Nacharbeit und genau eine Kostenbasis. Zeigt ein Abo keinen Betrag, schreibe `unavailable`.
5. Fehlen die sechs ersten Records, ein unabhängiges Review oder vergleichbare A/B-Paare, lautet die einzige ehrliche Schlussfolgerung `continue_test`, `blocked` oder `not_run`.

## Selbstcheck

- [ ] In dieser Runde änderte sich nur Modell, Workflow oder Berechtigung.
- [ ] Jeder Score lässt sich auf fixierten Input, Output, Validierung und Rubrik zurückführen.
- [ ] First Pass, Pass nach Nacharbeit, Fehlschlag und Unvergleichbarkeit sind getrennt gespeichert.
- [ ] Ich formuliere Fixture, Smoke-Test, Zeit oder Kosten nicht zu „klüger“, Produktivitätsgewinn oder einem allgemeinen Ranking um.

## Fünf-Minuten-Karte: eine Anweisung testen, nicht den „IQ“ eines Modells

Das geht mit einem Modell, Offline-Text und ohne Kontoverbindung. Nimm eine kurze öffentliche oder erfundene Statusnotiz. Text, Modell, Oberfläche, Zeitlimit und Reviewer bleiben gleich; nur die Anweisung ändert sich.

| Runde | Anweisung | Vor dem Urteil aufbewahren |
|---|---|---|
| A | „Liste drei nächste Schritte aus dieser Notiz auf.“ | Exakte Ausgabe und Laufzeit |
| B | „Nutze nur diese Notiz. Liste drei nächste Schritte auf. Fehlen zuständige Person oder Termin, schreibe `[zu klären]`; erfinde keine Fakten. Zitiere für jeden Schritt den stützenden Satz; fehlt er, stoppe und benenne die Lücke.“ | Exakte Ausgabe und Laufzeit |

Bewerte beide Ausgaben bei **Fakten erhalten**, **fehlende Information markiert**, **Textbezug nachvollziehbar**, **Umfang eingehalten** und **sicher gestoppt** jeweils mit 0–2. Bewahre Prompt, Input, Ausgaben, Scores und einen Satz zur Differenz auf. Ändern sich Text, Modell, Tool, Rechte oder Bedingung, schreibe `not_comparable`, statt einen Gewinner zu erklären.

Dies ist ein persönlicher Übungsrecord, keine Benchmark-Daten. Ein besseres B rechtfertigt nur, das Protokoll bei einer weiteren festen Aufgabe zu prüfen; es beweist keinen Produktivitätsgewinn, kein klügeres Modell und kein allgemeines Ranking.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="18-content-design-data-automation-DE.md" aria-label="Vorheriges Kapitel: Kapitel 18 · Pfad für Inhalte, Design, Daten und Automatisierung">← Zurück<br><strong>Kapitel 18 · Pfad für Inhalte, Design, Daten und Automatisierung</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="20-personal-codex-work-system-DE.md" aria-label="Nächstes Kapitel: Kapitel 20 · Ein persönliches Codex-Arbeitssystem aufbauen">Weiter →<br><strong>Kapitel 20 · Ein persönliches Codex-Arbeitssystem aufbauen</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
