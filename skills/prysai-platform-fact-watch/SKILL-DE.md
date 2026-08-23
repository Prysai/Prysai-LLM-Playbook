<!-- content_id: prysai-platform-fact-watch | locale: DE | language: de | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: 2dfe4e3 | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-platform-fact-watch
description: >
  Hält aktuelle, plattformspezifische Lehrbehauptungen auf dem neuesten Stand,
  wenn sich ein Anbieterdokument, eine Produktoberfläche, eine Berechtigung,
  ein Modell, ein Kontopfad oder ein Link geändert haben könnte. Verwenden Sie
  den Skill, wenn eine für den Lehrplan verantwortliche Person betroffene
  Kapitel, Labs, Skills, Routen und vorübergehende Lesebeschränkungen für
  Codex, Claude Code, Grok, ChatGPT, Gemini, Copilot oder eine andere benannte
  LLM-Plattform ermitteln muss. Nicht zur Faktensuche, zur Aufnahme eines
  neuen Adapters, zur Ausführung einer Plattform oder zum Modellvergleich
  verwenden.
---

# Plattform-Faktenwache

Machen Sie aus „Diese Plattform könnte sich geändert haben“ eine kleine
Wartungsentscheidung. Dieser Skill erfasst vorhandene Behauptungen und ihre
Auswirkungen. Er durchsucht das Web nicht, führt kein Produkt aus, erstellt
keinen Release und ersetzt keine Quellenprüfung.

## Mit einer Behauptungskarte beginnen

Verlangen Sie eine benannte Plattform, eine quellenbelegte Behauptung oder
claim ID, ihren aktuellen leserorientierten Ort, den Quellenverantwortlichen
und die URL, das Datum der letzten Prüfung, den Geltungsbereich, den Owner, die
nächste Prüfung und den Prüfgrund. Ein fehlendes Feld wird als `unreviewed`
markiert und nicht als harmlose Lücke behandelt.

Halten Sie die Behauptung eng. „Claude Code hat einen Berechtigungsmodus“ und
„Grok Build hat eine API-Route“ sind getrennte Karten. Ein Plattformname, ein
Funktionslabel oder eine HTTP-Antwort ersetzt keine Behauptung.

## Das Änderungssignal einordnen

Wählen Sie genau einen Status, ohne das aktuelle Produktverhalten zu
erschließen:

- `review_due`: Der geplante Prüfungstermin ist erreicht oder die Quelle wurde
  im angegebenen Intervall nicht geprüft.
- `source_changed`: Eine datierte Prüfung einer Primärquelle meldet einen
  wesentlichen Unterschied zur gespeicherten Behauptung.
- `source_unavailable`: Die zitierte Quelle kann die Behauptung derzeit nicht
  stützen.
- `scope_changed`: Die Behauptung gilt möglicherweise nicht mehr für die
  benannte Oberfläche, das Konto, die Region, die Version oder die
  Berechtigungsgrenze.
- `no_change_recorded`: Eine datierte Prüfung einer Primärquelle fand dieselbe
  Behauptung im selben Geltungsbereich.
- `unreviewed`: Es liegt keine geeignete Prüfung einer Primärquelle vor.

Wählen Sie `no_change_recorded` nicht aufgrund von Erinnerung, einer
weitergeleiteten URL, einem Such-Snippet, einem Community-Beitrag oder einer
erfolgreichen Anmeldung. Eine Quellenprüfung bestätigt eine Aussage nur für
das aufgezeichnete Datum und den aufgezeichneten Geltungsbereich.

## Die betroffene Lehrfläche abbilden

Listen Sie jede betroffene kanonische Einheit auf und kennzeichnen Sie ihre
Rolle:

```text
claim_id:
platform / surface:
source owner / URL:
last_checked / next_review:
change_status:
affected_units:
  - path | role: stable_core | adapter_fact | task_step | Lab | Skill | route | generated_page
reader_risk: none | clarification | pause_named_step | remove_current_claim
safe_interim_text:
owner:
next_action:
```

Stabile Grundprinzipien wie ausdrückliche Autorität, Belege, Wiederherstellung
und möglichst geringe Nebenwirkungen bleiben normalerweise verwendbar. Ein
Produktbefehl, UI-Pfad, eine Standardberechtigung, ein Preis, ein Anspruch, eine
Integration oder die Verfügbarkeit eines Modells ist eine Adaptertatsache und
braucht eine Quellenprüfung. Machen Sie aus einer Quellenänderung nicht die
Behauptung, der gesamte Kurs sei unbrauchbar.

## Die kleinste sichere Aktion wählen

- `no_change_recorded`: Behalten Sie die Aussage in ihrem Geltungsbereich bei
  und aktualisieren Sie nur den Prüfbeleg; behaupten Sie keine weitergehende
  Beständigkeit.
- `review_due` oder `unreviewed`: Behalten Sie den universellen Kern bei,
  markieren Sie den benannten Schritt zur Prüfung und übergeben Sie den
  aktuellen Fakt an `prysai-source-investigator`.
- `source_changed`, `source_unavailable` oder `scope_changed`: Pausieren oder
  entfernen Sie den benannten Lehrschritt, bis eine Quellenprüfung eine
  Ersatzformulierung begründet. Bewahren Sie den früheren Datensatz als
  historische Evidenz auf.
- Wenn die Änderung Quelle, Lauf, Autorität oder Fehlernachweis des Adapters in
  Frage stellt, übergeben Sie die Aufnahmeentscheidung an
  `prysai-platform-adapter-review`.
- Wenn eine öffentliche Behauptung, eine generierte Seite oder eine
  Release-Notiz noch den alten Fakt enthält, übergeben Sie das Artefaktpaket vor
  einer Korrekturveröffentlichung an `prysai-evidence-review`.

Schreiben Sie eine Produktprozedur niemals stillschweigend aus dem Gedächtnis
um. Erklären Sie einen Adapter nicht aufgrund eines Aktualitätsbelegs als
aufgenommen, sicher, gleichwertig oder produktionsbereit.

## Einen Wartungsbeleg zurückgeben

Geben Sie genau einen Datensatz zurück, der Behauptungskarte, Änderungsstatus,
betroffene Einheiten, Leserrisiko, sicheren Zwischentext, Übergabe zur
Quellenprüfung, eine mögliche Übergabe zur Adapter- oder Behauptungsprüfung,
Owner, nächsten Prüfungstermin und Unbekanntes enthält.

Beenden Sie ihn mit dieser Grenze: `This receipt manages the freshness boundary of one named platform claim. It does not prove current product behavior, account access, permission safety, runtime success, adapter admission, model quality, learner outcome, or cross-platform equivalence.`

## Wartungsnotiz

- `source`: ursprüngliche Prysai-Lab-Wartungsmethode, abgeleitet aus ADR-0025,
  dem Content-Lifecycle, dem Fact-Impact-Register und dem quellengebundenen
  Adapter-Aufnahmedatensatz
- `license`: originäre Überarbeitung; Dokumentation der Plattformanbieter und
  öffentliche Berichte bleiben gemäß `docs/sources/asset-register.md` reine
  Referenzen
- `owner`: facts-maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-14`
- `content_status`: `candidate`
