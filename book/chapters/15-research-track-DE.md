<!-- content_id: chapter-15-research-track | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 15: Forschungspfad, von der Frage zu prüfbarem Wissen

**Status:** `candidate`. **Experimentstatus:** `draft / not_run`. Dieses Kapitel lehrt Forschungsdisziplin; öffentliche Fälle sind Lehrmaterial, keine lokale Reproduktion oder offizielle Ursachenfeststellung.

## Das Problem

„Bitte recherchiere das“ kann Fakten finden, Optionen vergleichen, Literatur prüfen, eine Forschungsfrage bilden, einen Bericht schreiben oder einen Entwurf prüfen heißen. Ohne vorherige Eingrenzung kann ein Agent Suchausschnitte als Schlussfolgerung ausgeben, eine unzugängliche URL als gelesen behandeln oder eine Anweisung in einem externen Dokument befolgen.

> Die Fähigkeit ist nicht eine längere Literaturübersicht. Sie ist eine Kette, in der jede wichtige Behauptung zu einer Frage, Quelle, Fundstelle, Evidenzstufe und menschlichen Prüfung zurückverfolgt werden kann.

## Das Thema in eine beantwortbare Frage verwandeln

Bestimme Objekt, Vergleich oder Beziehung, Umfang, Zeit, Publikum und Ausgabezweck. „Login-Probleme recherchieren“ genügt nicht. Eine gute Frage definiert außerdem Einschluss und Ausschluss, priorisierte Quellen, Stoppzeitpunkt und Form des Ergebnisses: Faktentabelle, Vergleich, Entscheidungsnotiz oder zitierter Entwurf.

Suche Symptome vor Ursachen. Baue Query-Gruppen für Symptom, Grenze und Umgebung; die vermutete Ursache darf nicht die einzige Query sein. Protokolliere Begriffe, Datum und Zeitzone, Quellenumfang, Original-Links, Ausschlüsse und Stoppsignale. Snippets, Aggregatoren und automatisch erzeugte Listen sind Hinweise, keine Evidenz.

Stoppe, wenn wichtige Behauptungen einen Evidenzpfad haben, mindestens eine Gegenquery gelaufen ist, zwei verschiedene Suchrunden keine neue Umgebung oder kein Gegenbeispiel liefern, der Cutoff erreicht ist, der Umfang keine Verallgemeinerung erlaubt oder eine Quelle Geheimnisse, breitere Rechte oder unbekannte Scripts verlangt.

## Eine Kette von Forschungsartefakten bauen

```text
Absicht → Frage → Quellenplan → Abruf und Lesen
→ Extraktion → Konflikte und Lücken → Synthese → Zitate → menschliche Prüfung → versionierte Übergabe
```

| Phase | Artefakt | Ausstiegsbedingung |
|---|---|---|
| Eingrenzen | Frage, Umfang, Stoppsignale | Überdehnung ist erkennbar |
| Planen | Prioritäten, Queries, Daten, Zugriff | Wichtige Behauptungen haben Evidenzpfade |
| Extrahieren | Evidenztabelle und Fundstelle | Jede Behauptung führt zur Quelle zurück |
| Synthese | Konflikte, Unbekanntes, Stärke | Ein Bericht wird nicht zur Universalregel |
| Übergabe | Entwurf, Zitate, Review, Version | Andere können nachprüfen |

Eine Evidenzzeile enthält atomare Behauptung, Original- und finale URL, Autor oder Organisation, Veröffentlichungs-, Zugriffs- und Cutoff-Datum, Version, Plattform, Umfang, Fundstelle, Quellentyp, Evidenzbeziehung, Beobachtung und Hypothese, Konflikt, Zitatprüfung, Ton, Reviewer und nächste Aktion.

## Unzugängliche Quellen, Konflikte und Foren

Suchtreffer, `200` oder Redirect beweisen kein Lesen. Bewahre Original-URL, Status, finale URL, Seitenidentität, Datum und Leseergebnis auf. Login-Wall, Rate-Limit, Timeout und Fehler sind unzugänglich; fülle die Lücke nicht mit Erinnerung, Titel oder Snippet.

Wenn offizielle Quellen abweichen, vergleiche Objekt, Zeit, Version, Work Surface, Konto, Region und Definition. Bleibt der Konflikt, behalte beide Seiten, schränke den Text ein und bleibe bei `candidate`. In Foren trennst du „Autor beobachtete“, „Antwort schlug vor“, „jemand vermutete“ und „Maintainer bestätigte“. Viele Stimmen, Schließen oder akzeptierte Antwort ersetzen keine Bestätigung oder Reproduktion.

Auch eine glänzende KI-Zitation ist keine Evidenz. Öffne die Quelle und prüfe Fundstelle, Titel, Datum, Version und Umfang. Stützt sie nur einen Teil des Satzes, trenne ihn; ist eine Schlüsselzitation nicht auffindbar, markiere `citation_unverified` und schwäche oder entferne die Behauptung.

## Übung und Grenze

Beginne mit einem breiten Thema und bereite eine offizielle Quelle, einen Feldbericht mit URL und Datum sowie einen unzugänglichen oder widersprüchlichen Eintrag vor. Formuliere zuerst nur drei Kandidatenfragen, wähle eine und lege Umfang, Cutoff, Zeitzone und Stoppsignale fest. Entwirf Symptom-, Grenz- und Umgebungsqueries, Quellenplan, Evidenztabelle, Access Log, Conflict Log und Citation Audit. Lade keine Logs, Cookies, Tokens oder Kontakte hoch.

Fehlt Schlüsselevidenz, liefere `candidate` mit Bekanntem, Unbekanntem, Konflikten, Umfang, Stoppgrund und nächstem risikoarmen Schritt. Bis Schlüsselquellen geöffnet, lokalisiert und unabhängig geprüft sind, ist die Übung kein Beweis vollständiger Forschung.

## Ein breites Thema in eine prüfbare Übergabe verwandeln

„Welches LLM ist für mein Team am besten?“ ist noch nicht beantwortbar: Aufgabe, Kontobedingung, Budget, Zeitpunkt und Abnahme fehlen. Formuliere es so:

```text
Frage: Welche öffentlichen Primärquellen beschreiben zum <Datum mit Zeitzone>
für <drei benannte Aufgaben> die erklärten Fähigkeiten, Grenzen und Konto-/Regions-Unknowns
der <Kandidatenprodukte>?
Antwortet nicht: Gesamtrang „am besten“, nicht veröffentlichte Preise oder nicht getestete Leistung.
Übergabe: Behauptung → Quelle → Umfang → unbekannt, ohne Gesamtrang.
Stopp: Schlüsselseite unzugänglich, Umfang unklar oder Konto/private Daten/Zahlung nötig.
```

Bereite Queries für Aufgabe/Symptom, Grenze und Umgebung vor. Suche nicht nur nach dem Produkt, das gewinnen soll, plus `best`. Bewahre Query, Datum, Zeitzone, Quellenumfang sowie Ein- und Ausschluss auf. Snippets und Modell-Links sind Hinweise.

| Feld | Sichere Form |
|---|---|
| Atomare Behauptung | „Seite X beschrieb Y am Zugriffstag“ |
| Evidenz | Original-/Final-URL, Titel, Fundstelle, Zugriffstag |
| Umfang | Surface, Version, Region, Konto oder unknown |
| Stufe | official / maintainer / user report / lead |
| Nicht impliziert | Verfügbarkeit für mein Konto, Aufgabenerfolg, beste Wahl |

## Kleines Experiment: Konflikt und unzugängliche Quelle

Nutze eine zugängliche offizielle Seite, einen datierten Nutzerbericht und einen Link mit Redirect/Login/Fehler. Lade keine Logs, Cookies, Tokens, Kontakte oder privaten Dateien hoch.

1. Schreibe drei Kandidatenfragen, wähle eine und bestimme Umfang, Cutoff, Zeitzone, Ein-/Ausschluss und Stopp.
2. Notiere Original-/Final-URL, Zugriffsergebnis, Organisation, Datum und Fundstelle. Nicht geöffnete Seiten bleiben `inaccessible`, nicht mit Snippet ergänzt.
3. Suche zu jeder Schlüsselbehauptung mit einer Gegenquery nach Grenze, anderer Umgebung oder Gegenbeispiel. Nicht gefunden ist kein Beweis.
4. Bei Konflikt vergleiche Version, Surface, Konto, Region und Definition. Bleibt er bestehen, behalte beide Seiten und grenze die Übergabe ein.
5. Übergib eine Seite `candidate` mit Bekanntem, Unbekanntem, Konflikt, Nichtbehauptetem, Stoppgrund und nächster sicherer Aktion.

## Eigene Abnahme

- [ ] Ich mache aus „was ist am besten“ eine Frage mit Aufgabe, Umfang, Datum, Quellen und Übergabe.
- [ ] Ich bewahre URLs, Zugriff und Fundstelle auf und behandle ein Snippet nicht als Lese-Evidenz.
- [ ] Ich suche Grenzen oder Gegenbeispiele und notiere, was sie nicht beweisen.
- [ ] Ich verdichte offiziellen Konflikt, Konto, Region und Nutzerbericht nicht zu einer allgemeinen Regel.

## Eine echte, risikoarme Forschungskarte

Beginne nicht mit „Welches Modell ist am besten?“. Formuliere eine Frage, die
geprüft und auch zurückgewiesen werden kann:

```text
frage: Wie beschreiben öffentliche Primärquellen zum [Datum mit Zeitzone] die
erklärten Fähigkeiten, Grenzen und Unknowns von [zwei Modellen] für [eine konkrete
Aufgabe, etwa nicht sensiblen Text in klare Aufgaben umwandeln]?
beantwortet_nicht: Gesamtrang, nicht getesteten Erfolg, Zugang meines Kontos oder versteckte Preise.
quellen: offizielle Seiten, Release Notes und öffentliche Dokumentation.
übergabe: claim → URL → Fundstelle → Zugriffstag → Umfang → unknown.
stopp: Schlüsselseite unzugänglich, Login/Zahlung/private Daten nötig oder unerklärter Konflikt.
```

Lass das Modell Quellen und Queries vorschlagen, behandle jeden Link aber als
Hinweis. Nach dem Öffnen bewahrst du Titel, Original- und End-URL, Fundstelle,
Zugriffsergebnis und erklärten Umfang auf. Sagt das Modell „offiziell unterstützt“,
du findest den Text aber nicht, wird die Aussage `citation_unverified`. Eine
überzeugende Bibliografie füllt keine Lücke.

## Ein Gegencheck pro Behauptung

Ergänze jede wichtige Aussage um eine Frage, die sie einschränken könnte. Nach
„die Seite beschreibt X“ suchst du Limits, Konto-/Regionsunterschiede,
Versionsvoraussetzungen und öffentliche Gegenbeispiele. Kein Gegenbeispiel zu
finden beweist keine Universalregel; es dokumentiert nur die Suche im Umfang.

| Behauptung | Direkte Quelle | Gegencheck | Kann stützen | Bleibt unknown |
|---|---|---|---|---|
| Seite beschrieb X an diesem Tag | URL und Fundstelle | Limit-/Region-/Versionsquery | öffentliche Formulierung damals | eigenes Konto, echter Erfolg, beste Wahl |

Übergib eine Seite `candidate` mit Bekanntem, Unknowns, Konflikten,
Nichtbehauptetem, Stoppgrund und nächster risikoarmer Aktion. Das ist kein
Benchmark, keine Nutzerstudie und keine Kaufempfehlung; Kapitel und Experiment
bleiben `candidate` und `not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="14-discover-and-audit-skills-DE.md">← Vorheriges<br><strong>Kapitel 14 · Externe Skills finden, installieren und prüfen</strong></a></td><td align="right"><a data-chapter-nav="next" href="16-engineering-track-DE.md">Nächstes →<br><strong>Kapitel 16 · Engineering-Pfad, von der Idee zu zuverlässiger Software</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
