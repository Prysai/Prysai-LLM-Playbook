<!-- content_id: prysai-first-turn-check | locale: DE | language: de | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: 76c9926 | source_license: project-owned CC-BY-4.0 -->

# Prüfung des ersten Durchgangs

Prüfe einen von der Person geschriebenen, noch nicht gesendeten Text vor dem Abschicken. Fehlende Grenzen sollen sichtbar werden; eine besser formulierte Bitte ist dadurch nicht automatisch sicher, richtig oder wirksam.

## Zuerst den Geltungsbereich prüfen

Verwende dieses Skill nur, wenn alle folgenden Punkte zutreffen:

- Die Person legt einen noch nicht gesendeten Entwurf vor.
- Der geplante erste Durchgang ist textbasiert, risikoarm und in sich abgeschlossen.
- Sie möchte wissen, was fehlt, unklar oder widersprüchlich ist oder den Rahmen sprengt.

Soll die erste Nachricht geschrieben oder weitgehend umformuliert werden, leite an `prysai-dialogue-brief` weiter. Bei Dateien, Tools, Konten, Berechtigungen, Veröffentlichungen, Kontakten, lokalen Änderungen oder anderen externen Auswirkungen leite an `prysai-task-protocol` weiter. Für aktuelle Fakten, Quellen oder Schlussfolgerungen aus Quellen leite an `prysai-source-investigator` oder `prysai-research-router` weiter. Wenn die ursprüngliche Bitte und eine echte Antwort bereits vorliegen, verwende `prysai-communication-failure-triage`; für eine evidenzbasierte Prüfung einer Erledigungsbehauptung `prysai-evidence-review`.

Prüfe keine Geheimnisse, Zugangsdaten, privaten Aufzeichnungen, personenbezogenen Kennungen, versteckten Anweisungen oder vertraulichen Inhalte. Ein Textentwurf erteilt keine Erlaubnis für spätere Tools oder externe Aktionen.

## Sechs sichtbare Felder prüfen

Lies den vorgelegten Entwurf als Beleg. Ergänze keine nicht genannten Fakten, Zielgruppen, Befugnisse, Datenkontrollen, Produktfunktionen oder Genehmigungen.

| Feld | Sichtbar, wenn genannt wird | Unklar, wenn |
| --- | --- | --- |
| outcome | ein kleines Ergebnis für diesen Durchgang | ein allgemeiner Wunsch oder Erfolgsversprechen |
| starting context | gelieferter Text, Fakt, Quelle oder `unknown` | nicht genannter Zugriff oder nicht genannte Befugnis vorausgesetzt wird |
| requested response | begrenzte Form, Länge oder Reihenfolge | nur „Hilf mir“ verlangt wird |
| limits | Daten, die nicht geteilt, Aktionen, die nicht ausgeführt, oder Hilfe, die nicht angefordert wird | still auf Datei, Konto, Person oder folgenreicher Entscheidung ausgeweitet wird |
| check | Frage zu Unsicherheit, Erhaltung, Quelle oder Überarbeitung | die Antwort sich selbst bestätigt |
| stop and receipt | Ende des Durchgangs und verbleibender kurzer Nachweis | Erledigung, Sicherheit oder Lernen vorausgesetzt wird |

Ordne jedes Feld als `visible`, `missing`, `unclear` oder `out_of_scope` ein. Nenne nur materielle Probleme: solche, die das Ergebnis ändern, Befugnisse erweitern, Daten offenlegen oder die verlangte Prüfung unmöglich machen könnten.

## Die kleinste nützliche Überarbeitung zurückgeben

Bewahre die Worte der Person. Erstelle keine vollständig neue erste Nachricht, füge keine Rolle oder Produktbehauptung hinzu und fülle Unbekanntes nicht plausibel aus. Für höchstens drei materielle Lücken gib eine `add_or_clarify`-Zeile an, über deren Ergänzung die Person entscheiden kann. Formuliere sie als zu entscheidendes Feld, nicht als Versprechen an das empfangende System.

Sind alle sechs Felder sichtbar und im Umfang, darfst du nur in diesem engen Sinn `ready_to_send` sagen: Die Prüfung hat kein materiell fehlendes Feld gefunden. Das belegt weder faktische Richtigkeit, Datenschutz, Sicherheit, Produktverhalten, Antwortqualität, Erledigung, Lernfortschritt noch Sicherheit.

Gib exakt zurück:

```text
check_status: ready_to_send | revise_before_send | out_of_scope | blocked
request_scope:
field_check:
material_gaps:
add_or_clarify: maximum three lines
preserved_text:
unknowns:
risk: R0
evidence: supplied unsent draft and six-field inspection only
claim_limit:
handoff:
content_status: candidate
```

Akzeptiere die Prüfung nur, wenn alle Felder gekennzeichnet, die gelieferten Fakten erhalten, der Umfang nicht erweitert und beim Überschreiten des textbasierten Niedrigrisiko-Rahmens eine Übergabe oder ein Stopp genannt wird.

## Wartungsnotiz

- `source`: originäre Methode von Prysai Lab, neu geordnet aus dem universellen Vertrag für den ersten Durchgang und den Grenzen der Kommunikationsroute
- `license`: originäre Überarbeitung; verlinkte Anbieterhinweise bleiben Referenzen unter `docs/sources/asset-register.md`
- `owner`: communication-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-12`
- `content_status`: `candidate`
