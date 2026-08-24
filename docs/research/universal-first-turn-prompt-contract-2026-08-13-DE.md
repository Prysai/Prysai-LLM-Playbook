<!-- content_id: universal-first-turn-prompt-contract-2026-08-13 | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: universal-first-turn-prompt-contract-2026-08-13.md | source_revision: 2026-08-23 -->

# Universeller First-Turn-Prompt-Vertrag: ein begrenztes Anfängerprotokoll

**Protokolldatum:** 2026-08-13  
**Quellen abgerufen:** 2026-08-13 (America/Los_Angeles)  
**Status:** Kandidaten-Forschungsprotokoll. Kein Prompt wurde ausgeführt, Modelle wurden nicht verglichen, und es gab keine Prüfung durch Lernende, keine Quellenqualitäts-, Behaltens-, Transfer- oder unabhängige Evaluation.  
**Verantwortlich:** curriculum-maintainer  
**Nächste Prüfung:** 2026-09-13 oder früher, bevor eine Karte an ein konkretes Produkt angepasst, in einer Studie verwendet oder als Nutzernachweis präsentiert wird.

## Umfang und Frage

Dieses Protokoll schlägt zwei kleine, eigene Karten für die erste Nachricht eines Anfängers vor:
eine fünfminütige Spanischübung und eine fünfminütige Forschungs-Triage. Sie verwenden normale
Textfelder und keine Syntax, Tool-Namen, Kontoeinstellungen, Modellnamen oder versteckten
Instruktionsebenen eines bestimmten Produkts.

**Frage:** Welche Felder der ersten Nachricht bleiben über mehrere LLM-Produkte verständlich,
ohne zu behaupten, dass Produkte, Konten, Tools oder Ausgaben gleichwertig sind?

„Universell“ bedeutet hier nur, dass eine Person beim Wechsel des Produkts dieselben Felder in
normaler Sprache ausdrücken kann. Es bedeutet nicht, dass OpenAI, Anthropic, Google, Microsoft
und Meta dieselben Modelle, Funktionen, Tools, Kontextverarbeitung, Datenkontrollen, Preise,
Verfügbarkeit, Berechtigungen, Antworten oder Sicherheitsverhalten anbieten. Prüfen Sie die
aktuelle Dokumentation der tatsächlich verwendeten Oberfläche.

Die Karten sind bewusst begrenzt: kein Kontozugriff, Browsing, Sprache, Upload, Kontakt,
Kauf, Veröffentlichung, Codeausführung sowie keine Gesundheits-, Rechts-, Finanz-, Beschäftigungs-
oder Bildungsplatzierungsentscheidung. Private Aufzeichnungen, Zugangsdaten, personenbezogene
Daten oder vertrauliche Forschung gehören nicht in ein Produkt, bevor Datenkontrollen und
Berechtigung verstanden sind.

## Belegklassen und Behauptungsgrenze

| Klasse | Verwendung | Belegt nicht |
| --- | --- | --- |
| `official fact` | Vom Anbieter veröffentlichte Prompt-Hilfe innerhalb seines Produktumfangs | Gleichwertigkeit zwischen Produkten, Richtigkeit der Ausgabe, Lernerfolg |
| `public user report` | Das datierte Anliegen oder die Schwierigkeit einer Person | Verbreitung, aktueller Produktfakt, Ursache, geprüfte Abhilfe |
| `community suggestion` | In diesem Protokoll kein Eintrag | Offizielle Anleitung oder Wirksamkeit |
| `local reproduction` | Keine; `not_run` | Verhalten eines Produkts oder Ergebnis einer Person |
| `project inference` | Konservative Karte, die Absicht, Grenzen und einen Beleg sichtbar macht | Dass die Karte vor einer passenden Evaluation funktioniert |

`not_run` ist ein Zustand, kein Beleg. Es gibt keine beobachtete Dauer, kein Modellverhalten,
keinen Qualitätsscore, keine Lernendenreaktion, keine Sprachbewertung, keine Zitatprüfung und
kein Transferergebnis.

## Offizielle Hinweise: getrennte Geltungsbereiche

Die fünf folgenden offiziellen Seiten stammen von verschiedenen Organisationen und bleiben
produktspezifisch. OpenAI behandelt Anweisungen, Kontext, Beispiele und Prompt-Evaluation;
Anthropic verlangt Erfolgskriterien und einen empirischen Test vor Optimierung; Google beschreibt
klare, konkrete Anweisungen und Beispiele; Microsoft nennt Anweisung, Hauptinhalt und Beispiele;
Meta veröffentlicht einen Llama-Prompting-Leitfaden.

Das sind fünf getrennte offizielle Tatsachen, kein gemeinsamer Benchmark. Die enge **Projektschlussfolgerung**
lautet: Eine erste Nachricht für Anfänger sollte Aufgabe, verfügbaren Kontext, gewünschte Antwort,
Grenzen und Stopp- oder Prüfbedingung sichtbar machen. Die Quellen zeigen nicht, dass diese Felder
notwendig, ausreichend, optimal, produktübergreifend stabil oder für Sprachlernen und Forschung wirksam sind.

## Zwei datierte öffentliche Signale

Diese Berichte machen zwei plausible Anfängerbedürfnisse sichtbar. Sie werden nicht als Lehrmaterial
kopiert und nicht als Produktfakt verwendet.

| ID | Öffentlicher Bericht | Enges Signal | Strikte Grenze |
| --- | --- | --- | --- |
| U1 | OpenAI Community, [*Learn languages at the same time*][U1], 2024-12-03 veröffentlicht, 2026-08-13 abgerufen | Eine Person wollte längere Sprachübungen und nahm eine Nutzungsschranke wahr | Ziel und Wahrnehmung einer Person; keine aktuelle Quote, Bedarfsschätzung oder Lernbeleg |
| U2 | OpenAI Community, [*Long instruction prompt on short input data*][U2], 2024-06-24 veröffentlicht, 2026-08-13 abgerufen | Eine Person sendete lange Anweisungen mit kleinen Änderungen erneut und fragte nach einem besseren Ablauf | Eine gemeldete Workflow-Sorge; keine Aussage über alle Produkte, Gedächtnis, Kosten oder empfohlene Konfiguration |

**Projektschlussfolgerung:** Eine kurze erste Nachricht mit sichtbarer Aufgaben- und Stoppgrenze
und einem kleinen Protokoll ist leichter zu prüfen als „Bring mir eine Sprache bei“ oder „Recherchiere das“.
Das ist keine geprüfte Lösung für Limits, Instruktionspersistenz, Schwierigkeitsgrad oder Antwortqualität.

## Kandidatenvertrag für die erste Nachricht

Die folgende Formulierung stammt aus diesem Projekt. Sie ist eine Checkliste, keine Befehlssyntax
und keine Zusage, wie ein System sie interpretiert.

| Feld | Was die lesende Person liefert | Warum es enthalten ist | Nicht daraus schließen |
| --- | --- | --- | --- |
| **Ein Ergebnis** | Ein kleines, beobachtbares Ergebnis für diese Sitzung | Nächste Aktion von einer allgemeinen Absicht trennen | Beherrschung, Flüssigkeit, Expertise, Abschlussgarantie |
| **Startkontext** | Kleines eigenes Beispiel, bekannte Fakten, bereitgestellte Quellen oder `unknown` | Zeigt, worauf die Antwort beruhen darf | Gültige Bewertung der Person oder des Materials |
| **Gewünschte Antwort** | Begrenzte Form, Länge oder Reihenfolge | Etwas zum Speichern oder Ablehnen schaffen | Richtigkeit, Relevanz, Befolgung |
| **Grenzen** | Daten, die nicht geteilt werden, Aktionen, die nicht stattfinden, Hilfe, die nicht gewünscht ist | Befugnis und Nebenwirkungen sichtbar machen | Vollständige Privatsphäre, Sicherheit oder Compliance |
| **Prüfung** | Frage, Quellenbedingung oder Änderungsbitte, die Unsicherheit zeigt | Antwort nicht als selbstbestätigend behandeln | Verifizierte Fakten, Lehrqualität, zuverlässige Punktzahl |
| **Stopp und Protokoll** | Bedingung zum Beenden und kleiner Beleg zum Aufbewahren | Unvollständigkeit und nächste Schritte sichtbar machen | Behalten, Transfer, erledigte reale Aufgabe |

![Grenzen sichtbar machen: sechs Felder der ersten Nachricht benennen. Sichtbarkeit beweist weder Sicherheit noch Richtigkeit oder Abschluss.](../../assets/teaching/first-turn-contract-card.svg)

### Vor dem Senden: prüfen, nicht zertifizieren

Für einen noch nicht gesendeten, textbasierten und risikoarmen Entwurf kann [First-Turn Check Skill](../../skills/prysai-first-turn-check/SKILL.md)
jedes Feld als `visible`, `missing`, `unclear` oder `out_of_scope` markieren. Er liefert höchstens
drei wesentliche `add_or_clarify`-Zeilen statt eines Ersatzprompts. Für das Formulieren einer ersten
Nachricht dient [Dialogue Brief](../../skills/prysai-dialogue-brief/SKILL.md); bei Datei, Tool, Konto,
Berechtigung oder externer Wirkung [Task Protocol](../../skills/prysai-task-protocol/SKILL.md).

Die Methode macht einen Entwurf prüfbarer, validiert aber weder Antwort, Produktverhalten,
Datenverarbeitung, Sicherheit noch Lernergebnis.

## Karte A: fünf Minuten Spanisch üben

Ein eigenes, risikoarmes Muster für einen kurzen schriftlichen Austausch. Es bewertet keine Person,
weist keinen CEFR- oder anderen Level zu, nutzt weder Spracheingabe noch Browsing und behauptet keine
reale Kommunikationsfähigkeit.

### Nur verwenden, wenn

- das Thema gewöhnlich und nicht sensibel ist, etwa Begrüßung oder Getränkebestellung;
- der Versuch auf wenige Sätze begrenzt bleibt; und
- Korrekturen als zu prüfende Vorschläge, nicht als autoritative Sprachbewertung behandelt werden.

### Eigene Karte

~~~text
I have five minutes for beginner Spanish practice.

Outcome: I want to write one polite two-sentence reply for [a simple situation].
Starting context: [words I know, a self-written attempt, or "unknown"].

Give me one short situation and wait for my reply. Do not assign a level or
claim that I have learned Spanish. After I reply, point out at most two changes
that would most affect meaning or politeness. For each change, say whether you
are uncertain. Ask me for one revision.

Do not use personal information, browse, contact anyone, or turn this into a
study plan. End by listing: my first reply, my revision, help used, one thing I
should check elsewhere, and the smallest next practice or stop condition.
~~~

### Was ein fünfminütiger Beleg zeigen kann

Höchstens, dass eine Person in einer aufgezeichneten Sitzung kurz versucht, offengelegte Hilfe
erhält und überarbeitet hat. Er zeigt weder Sprachaneignung noch korrekte Grammatik, passenden
Register, selbstständige Leistung, Behalten, Transfer oder ein Niveau. Für echte Nachrichten die
Änderung mit einer geeigneten Person oder autoritativen Quelle prüfen.

## Karte B: fünf Minuten Forschungs-Triage

Die Karte macht den nächsten Forschungsschritt prüfbar; sie erzeugt keine fertige Antwort und keine
Zitat-Attrappe. Verwenden Sie nur Material aus der aktuellen Unterhaltung, solange eine dokumentierte
Recherche- oder Browsing-Funktion nicht ausdrücklich erteilt und geprüft wurde.

### Nur verwenden, wenn

- die Frage in einem Satz eng genug formuliert ist;
- keine Entscheidung mit hohem Risiko allein daraus getroffen wird; und
- URLs oder Dokumenttitel für eine spätere Prüfung erhalten bleiben.

### Eigene Karte

~~~text
I have five minutes to prepare a research check, not a final answer.

Question: [one narrow question].
Material I supplied: [URLs, titles, excerpts, or "none"].

First, restate the question and name what evidence would be needed. Then make a
three-row table with: possible claim, supplied source or "missing", and what
would need checking. Do not invent citations, state that you opened a source
you cannot access, or give a recommendation. Separate fact, report, and
inference. If the material is missing, contradictory, personal, or high stakes,
stop and tell me the smallest safe next step.

End with: sources actually supplied, unknowns, and one question I should answer
before continuing.
~~~

Die Karte beweist nicht, dass eine Quelle existiert, aktuell ist, fair dargestellt wird oder eine
Behauptung trägt. Sie beweist weder sachliche Richtigkeit, Vollständigkeit, wissenschaftliche Qualität,
rechtliche Eignung noch eine sichere Entscheidung. Generierte URL, Zitat, Zusammenfassung, Tabelle oder
Sicherheitsaussage sind allein kein Beleg.

## Grenze einer siebentägigen Sprachlernbehauptung

Dieses Protokoll zeigt nicht, ob eine Person Spanisch oder eine andere Sprache in sieben Tagen lernen
kann. Dafür bräuchte es Ausgangsniveau, Zielkompetenz, Aufzeichnung von Übung und Hilfe, Prüfaufgabe,
Bewertungskriterien, unabhängige Bewertende, Behaltensintervall und Transferbedingung. Nichts davon wurde hier erhoben.

Sieben tägliche Chats oder je eine Karte beweisen weder Flüssigkeit, Niveau, Behalten, selbstständige
Kommunikation noch eine kausale Wirkung eines LLM. Die offiziellen Prompt-Hilfen und die zwei Einzelberichte
füllen diese Lücken nicht.

## Nicht belegt

Nicht belegt sind eine Verbesserung von Sprachlernen, Recherche oder Prompting durch die Karten, ein
gleiches Befolgen in benannten Produkten, die Richtigkeit von Antwort, Korrektur, Zitat oder Zusammenfassung,
die Eignung eines Produkts zur Lernendenbewertung, Quellenprüfung oder Hochrisikoentscheidung, die Verbreitung
und Aktualität von U1/U2 oder deren Lösung durch den Vertrag, eine Dauer von fünf Minuten, ein siebentägiges
Ergebnis, Lernenden- oder Sicherheitstests, unabhängige Prüfung und Produktionsfreigabe.

## Quellen-, Wiederverwendungs- und Lizenzgrenze

Dies ist eine originale Synthese von Prysai Lab. Vertrag und Karten wurden für diesen Eintrag geschrieben;
fremde Prompts, Anbieterbeispiele, Forentexte, Bewertungsitems, Code, Screenshots, Bilder, Logos, Zugangsdaten
und Nutzerdaten wurden nicht kopiert oder angepasst. Externe Dokumente werden nur verlinkt und kurz paraphrasiert;
ihre Bedingungen, Lizenzen, Produktbereiche und Verfügbarkeit bleiben bei den Eigentümern und können sich ändern.
Eine Anpassung an eine konkrete Oberfläche braucht eine neue Prüfung ihrer Dokumentation und Bedingungen.

## Quellenregister

| ID | Klasse | Quelle und Abruf | Begrenzte Verwendung | Owner / nächste Prüfung | Belegt nicht |
| --- | --- | --- | --- | --- | --- |
| O1 | official fact | OpenAI [*Prompt engineering*][O1], 2026-08-13 | Anweisungen, Kontext, Beispiele, Evaluation | facts-maintainer / 2026-09-13 | anderes Produkt, Richtigkeit, Lerneffekt |
| O2 | official fact | Anthropic [*Prompt engineering overview*][O2], 2026-08-13 | Erfolgskriterien und empirischer Test | facts-maintainer / 2026-09-13 | anderes Produkt, Wirksamkeit, Lernresultat |
| O3 | official fact | Google [*Prompt design strategies*][O3], 2026-08-13 | klare, konkrete Anweisungen und Beispiele | facts-maintainer / 2026-09-13 | anderes Produkt, Quellenrichtigkeit, Sprachresultat |
| O4 | official fact | Microsoft Learn [*Prompt engineering techniques*][O4], 2026-08-13 | Anweisung, Hauptinhalt und Beispiele | facts-maintainer / 2026-09-13 | Modellgleichheit, Forschungsqualität |
| O5 | official fact | Meta [*Prompt engineering*][O5], 2026-08-13 | Llama-Prompting-Leitfaden | facts-maintainer / 2026-09-13 | anderes Produkt, Richtigkeit, Anfängerergebnis |
| U1/U2 | public user report | OpenAI Community, Daten oben | Ziel und Workflow-Sorge einer Person | curriculum-maintainer / 2026-09-13 | Verbreitung, Limit, Ursache, Abhilfe |
| P1 | project inference | Vertrag und Karten dieses Eintrags | Produktneutrale, prüfbare erste Anfrage | curriculum-maintainer / `not_run` | Gleichheit, Richtigkeit, Wirkung, Zeit |
| L1 | local reproduction | Keine; `not_run` | Kein Prompt, Modell, Produkt oder Lernender ausgeführt | curriculum-maintainer / `not_run` | jedes Verhalten oder Ergebnis |
| C1 | community suggestion | Keine übernommen | Für die enge Aussage nicht nötig | curriculum-maintainer / `not_run` | Bedarf, Best Practice, Wirksamkeit |

## Stoppvermerk und offene Belege

Die Recherche endete nach fünf getrennt verantworteten offiziellen Leitfäden und zwei datierten,
nachverfolgbaren öffentlichen Berichten. Kein Konto wurde verwendet, kein Modell befragt, keine
personenbezogenen Daten gesammelt und kein Produktvergleich durchgeführt.

Offen bleibt, ob Anfänger beide Karten verstehen, in fünf Minuten abschließen, ob Oberflächen den
Text gleich behandeln, ob Antworten korrekt sind, Korrekturen passen und Übung über die Sitzung hinaus
bleibt oder transferiert. Eine spätere Evaluation braucht ein genehmigtes Protokoll, deklarierte Aufgabe
und Umgebung, Einwilligung und Datenbegrenzung, aufgezeichnete Produktbedingungen und unabhängige Prüfung.

[O1]: https://developers.openai.com/api/docs/guides/prompt-engineering
[O2]: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
[O3]: https://ai.google.dev/gemini-api/docs/prompting-strategies
[O4]: https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering
[O5]: https://www.llama.com/docs/how-to-guides/prompting/
[U1]: https://community.openai.com/t/learn-languages-at-the-same-time/1040799
[U2]: https://community.openai.com/t/long-instruction-prompt-on-short-input-data/837381
