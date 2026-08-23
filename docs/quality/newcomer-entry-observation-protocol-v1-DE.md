<!-- content_id: newcomer-entry-observation-protocol-v1 | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: newcomer-entry-observation-protocol-v1.md | source_revision: 2026-08-23 -->

# Beobachtungsprotokoll v1 für den Einstieg von Neulingen

**Status:** Protokoll im Status `candidate`. Es gab noch keine Rekrutierung, Teilnehmerdurchführung oder Ergebnisaufzeichnung.

## Welche Frage diese Beobachtung klären kann

Kann ein Erwachsener, der bisher noch keinen Prompt an ein generatives Chatmodell gesendet hat, den richtigen ersten Weg erkennen, die Prüfung ohne Einrichtung erreichen und einen risikoarmen, rein textbasierten Versuch machen, ohne private Inhalte oder unbeabsichtigte Befugnisse hinzuzufügen?

Das ist eine Beobachtung der Einstiegstauglichkeit, keine Wirksamkeitsstudie. Sie kann die Beschriftungen, die Reihenfolge der Wege und die Formulierungen zum Stoppen für genau diese Kandidatenrevision informieren. Sie kann weder Lernen, Behalten, Transfer, Modellqualität, Marktnachfrage, Sicherheitswirksamkeit noch die Eignung des gesamten Curriculums für Anfänger belegen.

## Wer als Neuling zählt

Rekrutieren Sie 5–8 einwilligende Erwachsene, die diese Screeningfrage mit **nein** beantworten:

> Haben Sie vor heute schon einmal einen Prompt an ein generatives Chatmodell gesendet?

Zeichnen Sie nur `no`, `yes` oder `unsure` auf; erfassen Sie keinen Produktnamen, Kontonamen, Arbeitgeber, Bildungsnachweis oder eine Erklärung. `yes` und `unsure` zählen nicht als Neulingsbeobachtung. Diese Personen können an einer getrennt gekennzeichneten Beobachtung erfahrener Leser teilnehmen, dürfen aber nie mit dem Neulingsergebnis zusammengelegt werden.

Rekrutieren Sie keine Minderjährigen, direkten Vorgesetzten, Studierenden mit möglicher Notenbeeinflussung oder Personen, für die eine Ablehnung Nachteile haben könnte.

## Festgelegte Einstiegsbedingungen

Bestimmen Sie vor der ersten Sitzung ohne persönliche Namen:

- einen unveränderlichen Kandidaten-Commit-SHA und eine Einstiegs-URL;
- die Rollen von Moderation, Datenschutz und unabhängiger Prüfung;
- Browser, Viewport, Sprache und verfügbare Chat-Modelloberfläche;
- das Ende der Aufbewahrungsfrist und die für die Löschung verantwortliche Person; sowie
- die fiktive Quellnachricht und die Prompt-Revision.

Halten Sie Seitenrevision, Wegbeschriftungen, fiktive Quelle und Beobachtungsformular während der Runde fest. Wenn sich etwas ändert, stoppen Sie und beginnen eine neue Runde. Das bestehende [First-Win-Pilotprotokoll v2](first-win-pilot-protocol-v2.md) bleibt die separate, ausführlichere Untersuchung der Quellentreue für erfahrene Chatmodell-Nutzer.

## Ablauf der Sitzung

### 1. Ohne Hilfe einen Weg auswählen

Öffnen Sie die Kandidaten-Einstiegsseite. Erklären Sie Codex, die Aufwärmübung oder das Fixture nicht. Fragen Sie nur:

> Sie haben kein Projekt und keinen Code zu bearbeiten und möchten einen sicheren ersten Versuch machen. Was würden Sie als Nächstes öffnen und warum?

Zeichnen Sie den zuerst gewählten Weg und fest, ob die Person die Prüfung ohne Einrichtung erreicht. Die richtige Wahl ist der rein textbasierte Weg ohne Einrichtung. Die Person darf statt einer Wahl stoppen; notieren Sie dann `stopped_by_reader`, nicht eine falsche Antwort.

### 2. Einen begrenzten Versuch machen

Zeigen Sie die feste fiktive Quellnachricht, die die öffentliche Prüfung ohne Einrichtung verwendet:

> Hallo, der Workshop wurde geändert. Er beginnt am Freitag um 10 Uhr. Bringen Sie den Entwurf mit. Sagen Sie mir, wenn Sie nicht kommen können.

Die Person darf ein von ihr kontrolliertes Chatmodell-Konto verwenden oder stoppen, wenn keine Oberfläche sicher verfügbar ist. Sie kopiert nur den vorgegebenen Text-Prompt und fügt keine Dateien, Browserzugriffe, Erweiterungen, Zugangsdaten, persönlichen Fakten oder externen Aktionen hinzu. Die Moderation darf erklären, wie man die Seite schließt oder stoppt, aber nicht den Weg oder die Antwort vorgeben.

### 3. Die Grenzprüfung aufzeichnen

Bitten Sie die Person zu markieren, ob die Antwort Zeit und Entwurf bewahrt, die Bitte um eine Rückmeldung beibehält und keine Details ergänzt. Erfassen Sie weder die Modellantwort noch Konto-Kennung, Screenshot, Gesprächsverlauf oder Zwischenablage. Notieren Sie nur die drei Markierungen, die verstrichene Zeit, die verwendete Hilfe und ob die Person gestoppt hat.

### 4. Kurze Reflexion

Stellen Sie zwei neutrale Fragen:

1. Was sollten Sie in dieser Übung selbst prüfen?
2. Was würde Sie davon abhalten, vor der nächsten Anfrage weiterzumachen?

Speichern Sie eine kurze bereinigte Notiz nur, wenn sie keine persönlichen, Konto- oder Arbeitsplatzdaten enthält. Sonst notieren Sie `reflection_not_retained`.

## Minimaler Datensatz

Verwenden Sie pro Sitzung eine de-identifizierte Zeile:

```text
session_code | newcomer_screen | candidate_sha | entry_route_first_selected
no_setup_reached | attempt_started | attempt_completed | time_seconds
check_time_and_draft | check_reply_request | check_no_added_details
help_used | stopped_by_reader | safety_stop | retained_reflection_note
reviewer_route_assessment | reviewer_disagreement
```

Zulässige Werte für `help_used` sind `none`, `navigation_only`, `stop_or_close_help` und `other_recorded`. Leiten Sie aus der verstrichenen Zeit oder einer richtigen Modellantwort keine Fähigkeit ab. Die prüfende Person bewertet nur, ob der zuerst gewählte Weg zur genannten Bedingung passt; die Markierungen dokumentieren das Urteil des Teilnehmers und beweisen nicht, dass es richtig war.

## Stopp- und Datenschutzregeln

Stoppen Sie sofort, wenn private, Arbeitgeber-, Gesundheits-, Finanz- oder Kontodaten eingegeben werden, die Person die Sitzung für eine Prüfung hält, eine reale Handlung von der Moderation auswählen lassen möchte oder sich unwohl fühlt. Entfernen Sie die Daten aus dem Blick und zeichnen Sie nur `safety_stop` und einen nicht identifizierenden Grundcode auf.

Bewahren Sie keine Bildschirmaufnahme, kein Modelltranskript, keine E-Mail-Adresse, IP-Adresse, Kontobezeichnung, privaten Prompt oder unbearbeitete Chat-Ausgabe auf. Die Datenschutzverantwortlichen löschen die de-identifizierten Beobachtungsdaten am erklärten Ende der Aufbewahrung, sofern nicht vorher eine neue, separat genehmigte Aufbewahrungsentscheidung dokumentiert wurde.

## Was berichtet werden darf

Veröffentlichen Sie höchstens eine de-identifizierte Zusammenfassung: gescreente, geeignete, gestartete, abgeschlossene und gestoppte Personen, Verteilung der Wegwahl, erreichte Prüfungen ohne Einrichtung, verwendete Hilfe, Sicherheitsstopps und Uneinigkeiten der Prüfer. Bei 5–8 Personen berichten Sie nur Zählungen und Änderungen am Instrument; berechnen Sie keine Signifikanz und behaupten Sie keine Abschlussquote für eine größere Population.

## Evidenzgrenze

Das Schreiben, Validieren oder Ausführen dieses Protokolls schließt Q-001, Q-002 oder Q-013 nicht von selbst. Ein Lauf kann nur zeigen, ob die benannte Einstiegserfahrung für diese kleine, feste Gruppe und Kandidatenrevision beobachtbar war. Aussagen über Curriculum, Skill, Sicherheit, Plattform, Lernende oder Veröffentlichung behalten ihren jeweils separat aufgezeichneten Status.
