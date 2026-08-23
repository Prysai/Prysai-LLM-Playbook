<!-- content_id: prysai-product-context | locale: DE | language: de | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-product-context
description: >
  Vor Positionierung, Content, SEO, Conversion, Launch, Analytics oder Vertrieb
  einen versionierten Produkt- und Marketingkontext erstellen oder aktualisieren.
  Verwenden Sie den Skill, wenn ein gemeinsames Verständnis von Produkt,
  Zielgruppe, Positionierung, Markenstimme oder Produktkontext fehlt. Nicht zum
  Erfinden von Kundennachweisen, als Ersatz für Forschung oder zum Ausführen
  nachgelagerter Marketingänderungen verwenden.
---

# Produktkontext

Erstellen Sie einen kompakten, maßgeblichen Kontext, den nachgelagerte Arbeit
wiederverwenden kann. Trennen Sie beobachtete Fakten, zugeschriebene
Kundensprache, Entscheidungen und Hypothesen.

## Auslösegrenze und Übergabe

Übernehmen Sie die Aufgabe, wenn ein gemeinsames Artefakt zu Produkt,
Zielgruppe, Positionierung, Botschaft, Marke, Conversion oder Messung fehlt.

Geben Sie ab, wenn:

- ein `$skill` ausdrücklich genannt ist: Respektieren Sie ihn und liefern Sie
  Kontext nur auf ausdrücklichen Wunsch;
- externe Faktenrecherche erforderlich ist: Research Router;
- Aussagen eines vorhandenen Kontexts geprüft werden müssen: Evidence Review;
- Content- oder Launchänderungen ausgeführt werden sollen: Task Protocol oder
  Workflow Orchestrator;
- nur Positionierungsmethodik gelernt werden soll: Codex Coach.

Werden Sie weder zum Marketing-Ausführer noch zum Analytics-System oder Ersatz
für Kundenforschung. Rufen Sie Product Context für ein nachgelagertes
Lieferobjekt nicht erneut auf, außer es wird eine wesentliche Kontextlücke
entdeckt.

## Erforderliche Eingaben und Umgang mit Lücken

Verlangen Sie `product_or_project`, `current_goal`, `known_audience`,
`available_sources`, `decision_to_support` und `canonical_location`. Zusätzlich
benötigen Sie `decision_owner`, `context_version` und `version_baseline`. Prüfen
Sie den vorhandenen Kontext, seine aktuelle Version oder seinen Hash und sein
Änderungsprotokoll, bevor Sie eine Änderung vorschlagen. Kennzeichnen Sie
fehlende Kundennachweise, Metriken, Testimonials, Wettbewerbsfakten und
Präferenzen als `hypothesis` oder `unknown`; stellen Sie für wirkungsstarke
Lücken gezielte Fragen.

Erstellen Sie standardmäßig einen nicht maßgeblichen Entwurf oder einen
Änderungsvorschlag. Eine Bitte um Erklärung, Prüfung oder sprachliche
Überarbeitung eines bestehenden Kontexts berechtigt nicht dazu, die kanonische
Datei neu aufzubauen oder zu schreiben. Vor dem Schreiben in den kanonischen
Kontext müssen exakter Zielpfad, aktuelle Version/Hash, geänderter
Feldumfang, Datenschutzklassifizierung und PII-Entscheidung, Owner,
reversible Sicherung oder Rückbauziel sowie eine unmittelbare ausdrückliche
Bestätigung festgehalten sein. Die Bestätigung muss Ziel und Aktion nennen;
Login, Token oder „Vollzugriff“ genügt nicht. Fehlt ein Feld, geben Sie mit
`blocked_on` den Status `blocked` zurück, statt zu schreiben oder ein
Protokollereignis anzulegen. Überschreiben Sie keinen bestehenden Kontext,
wenn Ziel, Basis oder Schreibumfang nicht übereinstimmen.

## Erfassen und versionieren

Erfassen Sie Kurzbeschreibung, Kategorie, Typ, Ziel, Zielnutzer und
Entscheider, Jobs-to-be-done, Anti-Personas, Probleme, Alternativen,
Einwände, Differenzierung, Belege, Kundensprache, zu verwendende und zu
vermeidende Wörter, Glossar, Ton, Einschränkungen, Conversion-Aktion und
Messentscheidungen. Erhöhen Sie bei jeder wesentlichen Änderung die Version
und fügen Sie einen datierten Changelog-Eintrag hinzu. Teilen Sie der
nachgelagerten Arbeit mit, welcher Ort und welche Version maßgeblich sind.

Der Changelog-Eintrag muss alte und neue Version, geänderte Behauptungen,
verwendete Evidenz, Entscheidungsverantwortliche, betroffene nachgelagerte
Artefakte, Zielpfad und Rückbauziel nennen. Ein Entwurf ist nicht maßgeblich,
bevor der Owner den Eintrag akzeptiert hat. Halten Sie Vorschlag, bestätigten
Schreibvorgang und veröffentlichte Änderung getrennt; der Abschluss eines
Schritts bedeutet nicht den Abschluss des nächsten.

## Übergabe an nachgelagertes Design

Product Context begrenzt nachgelagertes Design; er wählt keinen visuellen Stil
nach Geschmack, erzeugt keine fertige Oberfläche und prüft keine visuelle
Qualität. Für eine nachgelagerte Website, Anwendung, Präsentation, einen
Bericht oder ein anderes visuelles Lieferobjekt liefern Sie ein
`design_handoff` mit:

- der realen Nutzeraufgabe und der Entscheidung, die das Artefakt unterstützen
  soll;
- der notwendigen Informationshierarchie und der minimal nützlichen Dichte;
- vertrauten Branchenmustern, die Nutzer ohne Erklärung erkennen können;
- erforderlichen Vertrauenssignalen, Quellen, Hinweisen, Eigentümer und
  Kontaktdaten;
- tatsächlich vorhandenen Fotos, Beständen, Daten, Kundensprache,
  Testimonials und freigegebenen Marken-Assets;
- verbotenen visuellen oder sprachlichen Mustern, die Belege erfinden oder
  unbelegte Autorität andeuten würden;
- Ziel-Viewports, Barrierefreiheitsbedingungen, Review-Owner und
  Abnahmekontrollen.

Fehlen echte Fotos, Bestand, Kundensprache, Testimonials oder ein freigegebenes
Markensystem, füllen Sie die Lücke nicht mit Lifestyle-Text, synthetischen
Angeboten, dekorativen Immobilienillustrationen, übergroßer redaktioneller
Serifenschrift, weichen Farbverläufen, schwebenden Karten oder übermäßigen
Abrundungen. Bevorzugen Sie einen Kaufratgeber, eine Serviceerklärung,
Checkliste, Vergleichs- oder Entscheidungshilfe, deren Nutzen nicht von
erfundenen Nachweisen abhängt. Ein visuell poliertes Artefakt bleibt
unverifiziert, bis es unter den angegebenen Bedingungen gerendert und geprüft
wurde.

## Risiken, Nebenwirkungen und Bestätigung

Das Erstellen aus bereitgestellten Quellen ist `R0` oder `R1`. Das Schreiben
der kanonischen Datei ist nur dann `R1`, wenn exaktes lokales Ziel, Basis,
Sicherung, Datenschutzentscheidung, Rückbauziel, Owner und unmittelbare
Bestätigung erfasst sind. Veröffentlichung, Änderung einer Live-Site,
Erhebung personenbezogener Daten, Nachrichtenversand oder Analytics-Änderung
ist `R2` oder höher und erfordert eine getrennte Übergabe an Task Protocol oder
Workflow Orchestrator mit Ziel, Umfang, Owner und Bestätigung. Halten Sie
personenbezogene Daten fern, sofern sie nicht erforderlich und autorisiert
sind; kopieren Sie keine Rohdaten von Kunden nur deshalb in den Kontext, weil
sie bereitgestellt wurden.

## Harte Stopps

Stoppen Sie mit `blocked`, wenn Produktidentität, Entscheidungsverantwortlicher,
kanonischer Ort, Belegherkunft, Datenschutzgrenze, Versionsbasis, Zielzustand,
Sicherung, Rückbauziel oder Schreibbestätigung unklar ist. Stoppen Sie auch,
wenn eine Änderung eine ungeprüfte Entscheidung überschreiben, PII offenlegen
oder den angeforderten Feldumfang überschreiten würde. Machen Sie aus einer
Annahme niemals einen Beleg, aus einem Entwurf keine Kundenaussage und aus
einem Kontext-Update keine Veröffentlichungserlaubnis.

## Festgelegte Ausgabe

Geben Sie genau Folgendes zurück:

1. `context_scope_and_owner`
2. `authoritative_version_and_location`
3. `observed_facts`
4. `hypotheses_and_unknowns`
5. `audience_and_jobs`
6. `positioning_and_message_constraints`
7. `proof_points_and_evidence_gaps`
8. `changelog_entry`
9. `downstream_handoff`
10. `design_handoff`
11. `risk_and_permissions` — mit `risk`, `action_state` (`draft_only`,
    `write_blocked`, `write_confirmed` oder `handoff_required`), exaktem Ziel,
    Datenschutzentscheidung, Owner, Bestätigung, Sicherung/Rückbau und
    Stopbedingungen
12. `content_status`

## Evidenz- und Statuszuordnung

Kennzeichnen Sie jede Aussage als `observed`, `attributed`, `hypothesis`,
`decision` oder `unknown`. Prüfen Sie einen Kontextvorschlag, indem Sie jede
wesentliche Aussage gegen die zitierte Quelle halten, die vorgeschlagenen
Felder mit der aktuellen Basis vergleichen, Datenschutzklassifizierung und
Änderungsumfang prüfen und bestätigen, dass der Abnahme-Owner die Diff
einsehen kann. Das prüft den Vorschlag, nicht Kundeneffekt oder nachgelagerte
Ausführung. Verwenden Sie `draft` vor Quellen- und Ownership-Prüfung,
`candidate` bei vorhandenem versioniertem Kontext ohne aktuelle Stakeholder-
oder Quellenprüfung, `verified` bei bestandener deklarierter Evidenz und
Owner-Review und `production-ready` erst nach Datenschutz-, Publikations-,
Wartungs- und Rückbaugates. Die Kontextprüfung bestätigt keine nachgelagerten
Behauptungen.

## Wartungseintrag

- `source`: `docs/charter.md`; `CONTEXT.md`;
  `docs/quality/skill-quality-standard.md`
- `license`: ursprüngliche Überarbeitung; bereitgestellte Kunden- oder
  externe Inhalte bleiben ihrer Quellenfreigabe unterstellt
- `owner`: product-context maintainer
- `version`: `0.3.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
