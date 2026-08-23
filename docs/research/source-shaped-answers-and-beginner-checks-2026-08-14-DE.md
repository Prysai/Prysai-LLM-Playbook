# LLM-Antworten mit scheinbaren Quellen: Erst prüfen, dann glauben

**Status:** Kandidaten-Forschungsnotiz. Dies ist ein datierter, quellengebundener Entwurf. Es gab noch keine Lernendensitzung, keinen Modelldurchlauf, keine Rechercheaufgabe, keine Zitatprüfung, keinen Produktsicherheitstest und keine Bewertung der Quellenqualität.

## Frage

Was ist der kleinste sichere erste Schritt, wenn eine Anfängerin oder ein Anfänger eine LLM-Antwort erhält, die *belegt wirkt*, aber keinen überprüfbaren Quellenbeleg enthält?

## Umfang und Methode

Diese Notiz ist enger als ein vollständiger Rechercheablauf. Sie entscheidet nicht, ob eine Aussage wahr ist. Sie unterscheidet ein zitatähnliches Zeichen von dem Protokoll, das für die Prüfung einer wichtigen Aussage nötig ist: Aussage, verantwortliche Quelle, auflösbarer Fundort, Zugriffsdatum und das Material, das die Aussage im Zusammenhang direkt stützt.

Die Übung ist ein festes, fiktives Textbeispiel. Browsing, das Abrufen von Quellen, das Teilen von Daten und externe Aktionen sind verboten. Wer eine aktuelle Tatsache klären muss, übergibt sie an die bestehenden Routen Source Investigator und Research Router.

## Evidenzkarte

| ID | Evidenzklasse | Quelle und Zugriff | Was sie stützt | Was sie nicht belegt |
| --- | --- | --- | --- | --- |
| O1 | offizielle Anleitung | [OpenAI API: Best Practices für Sicherheit](https://platform.openai.com/docs/guides/safety-best-practices), abgerufen am 2026-08-14 | OpenAI empfiehlt, Ausgaben vor der Nutzung durch Menschen prüfen zu lassen, besonders in risikoreichen Bereichen, und das für die Prüfung nötige Originalmaterial zugänglich zu machen. | Die Wahrheit einer konkreten Antwort, ein unabhängiges Audit, eine Sicherheitseigenschaft des Produkts oder eine Verhaltensänderung durch diese Karte. |
| O2 | offizielle technische Anleitung | [NIST AI 600-1: Profil generativer KI](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), abgerufen am 2026-08-14 | NIST nennt Konfabulation als Risiko: Inhalte können falsch sein und trotzdem plausibel oder selbstsicher wirken. Deshalb sind erzeugte Begründungen Prüfmaterial. | Die Quote falscher Zitate, das Verhalten eines bestimmten Modells oder die Richtigkeit einer bestimmten Quelle. |
| R1 | öffentlicher Nutzerbericht | [OpenAI Developer Community: Bericht über erfundene URLs und Artikeltitel](https://community.openai.com/t/critical-hallucinated-urls-fake-article-titles-in-web-mode-despite-verification-requests/1253893), abgerufen am 2026-08-13 | Eine Person berichtete von offenbar erfundenen Artikeltiteln und URLs in einer Interaktion mit aktivierter Webfunktion. Das ist nur ein Fehlersignal für die Quellenprüfung. | Ein reproduzierter Vorfall, die Ursache, die Häufigkeit, aktuelles Produktverhalten oder eine geprüfte Gegenmaßnahme. |

## Didaktische Entscheidung

Die Projektschlussfolgerung bleibt bewusst eng: **Ein Zitatzeichen ist noch kein überprüfbarer Quellenbeleg.** Bei einer wichtigen Aussage werden Aussage, Quellenverantwortlicher, URL oder anderer auflösbarer Fundort, Zugriffsdatum und der direkt stützende Absatz oder Datensatz festgehalten. Fehlt ein Feld, lautet der erste ehrliche Status `unverified`, nicht „wahrscheinlich richtig“.

Das ist eine redaktionelle Regel für den Umgang mit Evidenz, abgeleitet aus O1 und O2. Sie ist weder eine formale Norm noch eine rechtliche Pflicht, garantiert nicht die Richtigkeit eines vollständigen Belegs und ersetzt keine qualifizierte Prüfung.

## Niedrigrisiko-Übung

Verwende eine fiktive Antwort mit einer Aussage und einem Klammerzeichen, aber ohne Quellenverantwortlichen, URL, Datum oder stützende Passage. Die fehlenden Felder sollen erhalten bleiben, statt sie mit einer plausiblen Vermutung zu füllen. Der erwartete Beleg lautet:

```text
claim: [quoted from the fictional answer]
source record: missing
status: unverified — source record missing
next allowed check: locate the source owner and the supporting material
stop: do not invent a source, browse, publish, or act on the claim here
```

Das ergibt ein kleines Entscheidungsartefakt, verifiziert aber weder Quelle noch Aussage. Eine Frage zu einer aktuellen Tatsache beginnt erst, wenn in Source Investigator Aussage und Quellenverantwortlicher benannt sind; eine Frage mit mehreren Quellen beginnt in Research Router.

## Fehler und Stop-Grenze

Die Übung ist fehlgeschlagen, wenn Lernende oder Modell eine Quelle, ein Datum, eine Passage, einen Vertrauenswert oder eine Schlussfolgerung ergänzen, die im fiktiven Beispiel nicht stand. Bewahre die Ergänzung als Fehlerartefakt auf und markiere den Quellenbeleg als fehlend. Browsing zur Rettung des Beispiels, eine Umwandlung in eine Aussage über echte Richtlinien oder eine externe Aktion sind nicht erlaubt.

Stoppe, wenn die Aussage Gesundheit, Recht, Beschäftigung, Bildung, Geld, Sicherheit, eine Privatperson oder ein gemeinsames System betreffen könnte. Für diese Entscheidung ist die Karte nicht geeignet.

## Nicht beanspruchte Ergebnisse

Diese Notiz und ihre Karte belegen nicht, dass ein LLM-Zitat erfunden oder zuverlässig ist; dass ein vollständiger Quellenbeleg eine Aussage richtig, aktuell, unparteiisch oder entscheidungstauglich macht; dass Lernende Quellen selbstständig bewerten, Desinformation erkennen, Prompt-Injection widerstehen oder forschen können; oder dass Produktverhalten, Sicherheit, Datenschutz, Lernen, Behalten, Transfer, öffentliche Beta- oder Produktionsreife gegeben sind.

## Quellen- und Lizenzgrenze

Erklärungen für Lesende, fiktiver Inhalt, Belegfelder und das verlinkte SVG sind Originalmaterial von Prysai Lab. O1 und O2 sind nur verlinkte Referenzen; ihr zugrunde liegender Inhalt bleibt den Bedingungen der jeweiligen Eigentümer unterworfen. R1 ist ein individueller öffentlicher Bericht und wird weder kopiert noch als offizielle Tatsache dargestellt. Das Asset-Register des Repositories dokumentiert die Verteilungsgrenze.

## Prüftrigger

Prüfe die Notiz, bevor Aussage, Quellenfelder, verlinkte Produktanleitung oder Sicherheitsumfang der Karte geändert werden. Eine wesentliche Änderung der zitierten Anleitung durch OpenAI oder NIST sowie die erste autorisierte Lernendenbeobachtung lösen ebenfalls eine Prüfung aus.
