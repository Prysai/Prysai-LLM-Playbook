<!-- content_id: lab-008-research-question | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-008-research-question
title: "Ein großes Thema zu einer beantwortbaren Forschungsfrage eingrenzen"
level: L3
domain: research
goal: "Ein breites Thema in eine abgegrenzte Frage überführen, deren Aussagen mit prüfbaren Quellen gestützt, begrenzt oder offen gelassen werden können"
setup: "Ein öffentliches risikoarmes Thema, eine zugängliche Primärquelle, eine Quelle mit unklarer Autorität und eine leere Behauptung-Evidenz-Tabelle"
task: "Fragekandidaten schreiben, eine Frage mit explizitem Umfang auswählen, Quellen planen, Aussagen Belegen zuordnen und Lücken nicht mit nicht prüfbaren Quellen füllen"
status: draft
last_verified: "Maintainer reference run accepted 2026-08-13; learner run not run"
---

# Lab 008: Ein großes Thema zu einer beantwortbaren Forschungsfrage eingrenzen

## Lernziel

Forschungsqualität wird vor dem Schreiben entschieden. Ein breites Thema verleitet zu einer Zusammenfassung; eine nützliche Frage benennt Objekt oder Population, Zeitraum, Entscheidung und akzeptierte Evidenz so genau, dass andere sie prüfen können.

## Vorbereitung

Wähle ein öffentliches, risikoarmes Thema. Schließe personenbezogene Daten sowie Rechts-, Medizin- und Finanzberatung aus. Bereite eine heute zugängliche Primär- oder maßgebliche Quelle und einen Kandidaten mit unsicherer Autorität oder Zugänglichkeit vor. Notiere URLs und Zugriffsdatum vor den Notizen.

## Aufgabe und Experiment

Schreibe drei Fragekandidaten und notiere für jeden:

```text
Entscheidung, die die Antwort informiert:
Objekt oder Population:
Zeitraum:
einbezogen / ausgeschlossen:
erforderliche Quellenklasse:
Antwortform:
Stoppbedingung:
```

Wähle eine Frage und erkläre, warum die anderen zu breit, zu vage oder mit den erlaubten Belegen nicht beantwortbar sind. Baue den Quellenplan vor dem Entwurf. Bevorzuge Primärquellen für Produktverhalten, Richtlinien, Standards und Statistiken; Sekundärquellen helfen beim Auffinden oder Vergleichen, ersetzen aber nicht still die Primärakte.

| Behauptung | Quelle | Zugriffsdatum | Direkte Stützung | Schlussfolgerung | Grenze | Status |
|---|---|---|---|---|---|---|

Statuswerte sind `supported`, `partial`, `disputed`, `unknown`, `out_of_scope`. Schreibe erst, wenn jeder wesentliche Satz eine Zeile hat oder klar als Analyse markiert ist. Nenne zum Schluss die kleinste Quelle oder das kleinste Experiment, das die wichtigste offene Unsicherheit verringert.

## Erst eine Fragekarte schreiben, dann suchen oder das Modell nutzen

Angenommen, du möchtest wissen, ob ein LLM beim Ordnen von Material hilft. Das ist noch keine Suchfrage, und du fragst das Modell nicht einfach nach dem „besten“. Zuerst grenzt du die Frage in einer Karte ein:

```text
Entscheidung: Sollen wir für öffentliche Unterlagen eines Lesekreises ein Modell zunächst für eine Gliederung aus Titeln und Stichpunkten ausprobieren?
Objekt: Ein bereits öffentliches Markdown-Dokument ohne personenbezogene Daten.
Zeit: Nur heute erreichbare offizielle Produktdokumentation; kein Preis- oder Langzeitqualitätsvergleich.
Quellen: Eine offizielle Produktseite und eine öffentliche, klar als Nutzererfahrung markierte Diskussion.
Ausschluss: Keine Rückschlüsse auf Datenschutz, Genauigkeit oder Teameffizienz; Suchsnippets sind keine Evidenz.
Stopp: Öffnet die offizielle Quelle nicht oder sprechen die Quellen über unterschiedliche Oberflächen, bleibt die Schlussfolgerung unknown.
```

Erst danach gibst du dem Modell eine begrenzte Aufgabe: **„Nenne anhand dieser Fragekarte fehlende Evidenz und ordne mögliche Behauptungen als Stützung, Schlussfolgerung oder unbekannt ein; suche, zitiere und entscheide nicht für mich.“** Die Antwort ist ein Planentwurf, keine Quelle. Du öffnest die Quellen selbst, notierst Fundstelle und Datum und entscheidest dann über den Tabellenstatus.

So wird „KI für Recherche nutzen“ zu prüfbarer Zusammenarbeit: Das Modell macht Fragen und Lücken sichtbar, Quellen stützen Tatsachen, und du begrenzt die Schlussfolgerung.

## Belege und Fehlerfall

Bewahre Thema, drei Fragen, Auswahlgrund, Quellenplan, genaue Fundstellen, Zugriffsdatum, Behauptungstabelle, Entwurf und Grenzen auf. Eine URL allein beweist nicht, was eine Quelle am Zugriffstag sagte.

Das eingefrorene Offline-Fixture des Projekts enthält eine aktuelle Quelle, eine im Umfang widersprechende veraltete Quelle, einen unzugänglichen Datensatz und einen erfundenen Zitatkandidaten. Der erste Kurzbericht übertreibt die Stützung und muss scheitern; die Korrektur grenzt die Entscheidung ein, bewahrt Widerspruch und Unbekanntes und hinterlässt einen Stoppbeleg. Das ist Maintainer-Evidenz über synthetische Eingaben, nicht über Modelle, Websuche, Lernende, Transfer oder reale Forschungsqualität.

Füge eine Quelle hinzu, die nicht öffnet, eine andere Population behandelt oder eine starke Aussage ohne Methode macht. Markiere die Behauptung `unknown`, `partial` oder `out_of_scope`, schwäche die Schlussfolgerung und nenne einen prüfbaren Ersatzcheck. Rekonstruiere keine Fakten aus Titel, Suchsnippet oder sicher klingendem Text.

## Abnahme, Reflexion und Transfer

- [ ] Die Endfrage nennt Umfang, Entscheidung, Evidenzklasse und Stoppbedingung.
- [ ] Jede wesentliche Behauptung verweist auf genaue Fundstelle und Zugriffsdatum.
- [ ] Direkte Stützung, Schlussfolgerung, Widerspruch und Unbekanntes sind getrennt.
- [ ] Eine schwache Quelle senkte Sicherheit statt erfundene Stützung zu erzeugen.
- [ ] Es gab keine privaten Daten, unbefugte Kontaktaufnahme, Käufe, Einreichungen oder Veröffentlichungen.
- [ ] Die Schlussfolgerung nennt Evidenz, die sie ändern könnte.

Wiederhole das Protokoll für einen anderen Bereich. Welche Einschränkung verbesserte die Frage am stärksten? Welche Quelle schien nützlich, stützte aber die tatsächliche Behauptung nicht? Was bleibt Hypothese statt Befund?

## Grenze

Zugängliche öffentliche Quellen können unvollständig, veraltet, verzerrt oder für rechtliche, medizinische, finanzielle oder organisatorische Entscheidungen ungeeignet sein. Bis Lernendenläufe und unabhängige Prüfung vorliegen, bleibt dieses Lab `draft / not_run`.
