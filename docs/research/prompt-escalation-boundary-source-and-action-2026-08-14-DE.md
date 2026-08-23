<!-- content_id: prompt-escalation-boundary-source-and-action-2026-08-14 | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: prompt-escalation-boundary-source-and-action-2026-08-14.md | source_revision: 2026-08-23 -->

# Wenn ein einfacher Prompt nicht reicht: Grenze zwischen Quelle und Handlung

**Status:** Forschungskandidat / `not_run`

**Zugriff:** 2026-08-14 (America/Los_Angeles)

**Verantwortlich:** curriculum-maintainer

**Nächste Prüfung:** 2026-11-14 oder bevor die Grenze als Lernkarte, mit Lernenden bewertet oder für eine Aussage über ein benanntes Produkt verwendet wird.

## Frage und Umfang

Welche kleinste, anfängertaugliche Entscheidung trennt einen gewöhnlichen Text-Prompt von Arbeit, die eine quellenbasierte Untersuchung oder ein auditierbares Aufgabenprotokoll braucht? Dieser Eintrag behandelt nur die erste Weiterleitung zwischen (1) der Umformung oder Besprechung eines bereits gelieferten Textes, (2) einer wesentlichen Behauptung über die Außenwelt und (3) der Änderung einer Datei, eines Kontos, eines gemeinsamen Systems, einer Veröffentlichung oder eines anderen externen Zustands.

Er schreibt kein allgemeines Prompt-Format vor, vergleicht keine Modelle, prüft keine Quelle, führt keine Aufgabe aus und bewertet keine Lernenden. Er ist eine Routing-Grenze des allgemeinen LLM-Zusammenarbeitskerns, kein Plattformadapter.

## Methode und Quellenregel

Beibehalten wurden nur Primärquellen: aktuelle OpenAI-Entwicklerdokumentation und eine NIST-Publikation. Die OpenAI-Seite ist produktbezogen und volatil; die NIST-Publikation ist ein Risikoprofil, kein Prompt-Leitfaden und kein Modelltest. Beide wurden nur gelesen. Kein Konto, API-Aufruf, Modellaustausch, Lernendenlauf, Quellenabruf oder Task-Lauf wurde ausgeführt.

Die Projektableitung bleibt konservativ: einen einfachen Prompt nur dann verwenden, wenn die Ausgabe gegen bereitgestelltes Material geprüft werden kann und keine aktuelle externe Behauptung oder externe Handlung erforderlich ist. Ist eine Bedingung falsch, eskalieren. Das ist eine Lehrentscheidung, keine Behauptung, dass lange Prompts unsicher oder Eskalation fehlerfrei sei.

## Evidenzkarte

| ID | Behauptung | Klasse | Hauptbeleg und Umfang | Grenze |
|---|---|---|---|---|
| O1 | OpenAI zeigt einen einfachen Prompt für einen kurzen fiktiven Text. | offizieller Fakt | Ein-Satz-Schlafgeschichtenbeispiel im Prompt-Leitfaden. | Belegt keine Eignung für Fakten, Folgen oder Arbeit über Produkte hinweg. |
| O2 | OpenAI beschreibt nichtdeterministisches Prompt-Verhalten und empfiehlt Tests und Evaluationssuiten bei höherer Komplexität oder Modellwechseln. | offizieller Fakt | Abschnitt „Prompt engineering“ derselben Anleitung. | API-Hinweis, kein Beleg für einen konkreten Fehler, Lernergebnis oder universelle Regel. |
| O3 | Das NIST-GenAI-Profil nennt Konfabulation als Risiko und macht Risikomanagement vom Kontext abhängig. | offizieller Fakt | NIST AI 600-1. | Klassifiziert keine konkrete Aufgabe oder Quelle dieses Repositories. |
| P1 | Ein Anfänger kann fragen: „Führt das Ergebnis einen wesentlichen externen Fakt ein oder ändert es etwas außerhalb des Chats?“ | Projektableitung | Eigener Routing-Test aus O1–O3 und Projektverträgen. | Keine Lernenden-, Modell- oder unabhängige Review-Evidenz. |
| L1 | Es wurden keine Quellen verifiziert, Workflows ausgeführt oder Lernende beobachtet. | lokale Reproduktion | `not_run`; nur Quellen- und Vertragsprüfung. | Keine Zuverlässigkeits-, Nutzbarkeits- oder Lernbehauptung folgt. |

## Das enge Anfängerproblem

„Ist diese Richtlinie noch aktuell? Fasse sie zusammen und aktualisiere unsere öffentliche Hilfeseite.“ Die Anfrage vermischt einen aktuellen externen Fakt mit einer Veröffentlichung. Eine glatte Antwort kann Quelle, Datum, Berechtigung, Ziel und Abnahmebeleg offenlassen. Es gibt keine Umfrage oder öffentliche Stichprobe; dies ist ein projektspezifisches Lehrszenario, keine Häufigkeitsmessung.

## Eskalationskarte

| Anfrage | Sichere erste Handlung | Fallback | Stopp | Bestehender Weg | Nicht behauptet |
|---|---|---|---|---|---|
| „Formuliere meinen gelieferten Absatz freundlich um; füge keine Fakten hinzu.“ | Text, Publikum, Ausgabeform und Erhaltungsprüfung benennen. | Dialogue Brief oder First-Turn Check. | Stoppen, wenn neue Quelle, neues Konto, neue Datei oder Handlung nötig ist. | `prysai-dialogue-brief` / `prysai-first-turn-check` | Klarer Prompt beweist weder Angemessenheit, Vollständigkeit noch Wahrheit. |
| „Ist diese aktuelle Richtlinie oder Produktbehauptung wahr?“ | Eine Behauptung, Entscheidung, Datengrenze, Quellenverantwortung und Änderungsbedingung fixieren. | Bei unklarem Umfang offene Frage stellen. | `unresolved`, wenn Verantwortlicher unprüfbar, Umfang unklar oder Evidenz zu schwach ist. | `prysai-source-investigator` | Quellenrecherche beweist weder Antwort, Vollständigkeit, Zukunftsgültigkeit noch Entscheidung. |
| „Vergleiche Optionen und sage, was die Forschung schließt.“ | Entscheidung, Kandidaten, Kriterien, Quellenklassen, Zeitgrenze und Lieferobjekt nennen. | Auf eine begrenzte Recherche des einen entscheidenden Fakts reduzieren. | Stoppen, wenn Frage, Evidenz oder Vergleichsmenge nur durch Raten festlegbar wäre. | `prysai-research-router` | Plan oder Zitatliste ist keine Literaturübersicht, unabhängige Prüfung oder Empfehlung. |
| „Nutze die Antwort zum Aktualisieren, Senden, Veröffentlichen, Kaufen, Verbinden oder Ändern.“ | Faktenrecherche vom Änderungsvorschlag trennen; Ziel, Aktionen, Verantwortliche, Akzeptanz, Prüfpunkt und Wiederherstellung festlegen. | Unversendeten Entwurf oder Nur-Lese-Plan behalten. | Stoppen bei fehlender Autorität, Ziel, Datengrenze, Evidenz oder Bestätigung. | `prysai-task-protocol` | Ein vollständiges Protokoll autorisiert oder beweist keine Ausführung, Sicherheit, Bereitstellung oder Wiederherstellung. |

## Kompakter Routing-Test

Vor der ersten Anfrage in Alltagssprache fragen: (1) Kann ich die Ausgabe nur mit meinem bereitgestellten Text und Fakten beurteilen? (2) Braucht sie eine aktuelle externe Behauptung oder ändert sie etwas außerhalb des Gesprächs? Bei Ja und Nein kann ein Text-Prompt der Start sein. Ein wesentlicher Fakt geht in die Quellenroute; eine externe Handlung zusätzlich in den Aufgabenvertrag. Bei beidem Quellenfindung und Handlungsautorität getrennt halten. Medizinische, rechtliche, finanzielle, berufliche, Bildungs-, Wohn-, Einwanderungs-, Versicherungs- und Sicherheitsfragen brauchen geeignete menschliche oder fachliche Prüfung; dieser Eintrag liefert sie nicht.

## Fehlergrenze und Abnahmebeleg

Fehlerfall: In einem Zug „Bestätige die aktuelle Regel und sende das Update“ verlangen. Das Modell liefert einen selbstsicheren Absatz mit Link, aber Quellenverantwortlicher, Datum, Belegstelle, Veröffentlichungsziel und Sendeberechtigung bleiben unklar.

Kleinste sichere Wiederherstellung: unversendeten Entwurf bewahren, Quellenfrage und Handlungsvorschlag trennen und an der fehlenden Eingabe der gewählten Route stoppen. Keine Autorität erfinden lassen und keine unzugängliche Seite als Beleg behandeln.

Kandidatenabnahme: Der Leser kann Ziel, Wesentlichkeit der externen Behauptung, vorgeschlagene Handlung, gewählte Route und Stoppbedingung zeigen. Das prüft nur die ausgesprochene Routingentscheidung, nicht Quelle, Ausgabe, Handlung oder Lernergebnis.

## Grenze zu bestehendem Material

Dieser Eintrag ersetzt keine first-turn-, research-, source- oder task-Verträge. Er ergänzt eine kleine Unterscheidung: einfacher Prompt für bereitgestellte Textumformung oder -besprechung; Source Investigator für eine begrenzte aktuelle Quellenfrage; Research Router für offene oder mehrquellige Rechercheplanung; Task Protocol für Autorität, Nebenwirkungen, Akzeptanzbelege und Wiederherstellung. Kein neues Skill, keine Karte, kein Kapitel, Lab, Registry-Eintrag, Evaluations-Fixture oder Leserclaim wird vorgeschlagen.

## Primärquellen

| ID | Autoritative URL | Eigentümer | Zugriffsdatum | Umfang und Pflegegrenze |
|---|---|---|---|---|
| O1, O2 | [OpenAI-Dokumentation: Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering.md) | OpenAI | 2026-08-14 | Produktbezogene Entwicklerhilfe; vor konkreten API-, Modell-, Evaluations- oder Verhaltensclaims prüfen. |
| O3 | [NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) | National Institute of Standards and Technology | 2026-08-14 | Risikoprofil; vor Compliance-, Konformitäts-, Incident- oder systemspezifischen Risikoclaims prüfen. |

## Grenzen, Offenlegung und nächste Evidenz

Der Text ist eine originale Prysai-Formulierung. Quellen sind als Evidenz verlinkt; kein externer Prompt, Code oder Lehrinhalt wurde kopiert. Der Eintrag beweist nicht, dass Anfänger die Grenze erkennen, ein Modell korrekt routet, Zitate gültig sind oder die Routen Sicherheit und Erfolg verbessern.

Vor einer Aufnahme in den Lesertext eine vordefinierte, risikoarme Lernendenbeobachtung durchführen. Ursprungsanfrage, Route, Begründung, offene Felder, Zeit und eine mögliche Verwechslung von Plan/Zitat mit Ausführungsevidenz erhalten. `candidate` beibehalten, bis Beobachtung eine engere Behauptung trägt.
