<!-- content_id: llm-fundamentals-guide | locale: DE | language: de | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 0: Was ist ein großes Sprachmodell?

**Lesezeit:** etwa 20 Minuten. Beginne mit einem Ein-Satz-Modell und prüfe seine Grenzen anschließend in einer fünfminütigen Chat-Übung.

Dies ist die erste Lektion des Playbooks. Wenn du nicht sicher bist, was ein
„Large Language Model“ (LLM) wirklich ist — jenseits des Marketings —, beginne
hier. Wir bauen uns ein mentales Modell auf, Schicht für Schicht, so wie eine
Professorin oder ein Professor ein neues Thema einführen würde: zuerst das
Wesentliche, dann die Mechanik, dann die ehrlichen Grenzen. Alles in dieser
Lektion ist eine allgemeinverständliche Nacherzählung der am Ende aufgeführten
öffentlichen Quellen; sie ist keine Kopie eines einzelnen Dokuments.

## 0.1 Ein Satz, dann ein Bild

**Ein modernes Text-LLM ist ein Modell, das Tokenfolgen schätzt und erzeugt;
viele autoregressive LLMs sagen aus dem Kontext den nächsten Token voraus,
während nachträgliches Training und Produktschichten die Antwort weiter formen.**

Das ist ein nützliches Arbeitsmodell, aber keine vollständige Definition jedes
Sprach-, multimodalen oder eingesetzten Systems, das LLM genannt wird.

Das Bild, das das konkret macht: Stell dir die Autovervollständigung auf
deinem Telefon vor — aber trainiert auf einer Bibliothek aus Millionen von
Büchern, Artikeln, Code-Repositories und Gesprächen und enorm hochskaliert.
Die Autovervollständigung schlägt ein Wort vor; ein LLM kann einen Absatz
fortsetzen, eine Frage beantworten, übersetzen, gliedern, Code debuggen oder
ein Gespräch führen — denn all diese Aufgaben lassen sich umformulieren als
„angesichts des bisherigen Texts: Was kommt als Nächstes?“

Diese eine Idee erklärt mehr, als du erwarten würdest:

- warum ein LLM über fast alles flüssig schreiben kann (das Training zeigt ihm
  viele Muster; Flüssigkeit beweist aber weder Fachwissen, Abdeckung noch
  Wahrheit);
- warum es manchmal Fakten erfindet (ein Basismodell sagt plausiblen Text
  voraus, statt Fakten selbst nachzuschlagen);
- warum ein Chat-Produkt mehr als das Basismodell leisten kann (es kann Suche,
  Dateien, Speicher, Retrieval oder Tools ergänzen, jeweils mit eigenen Daten-
  und Berechtigungsgrenzen);
- warum sich das Verhalten zwischen Versionen oder Produkten ändert (Anbieter
  können Gewichte, nachträgliches Training, Systemanweisungen,
  Sicherheitskontrollen, Retrieval, Tools, Routing oder die Oberfläche ändern,
  nicht nur den Trainingstext).

Die intuitivste moderne Erklärung der Mechanik ist Grant Sandersons
(3Blue1Brown) animierte Reihe über GPT und Attention; sie ist in den Quellen
verlinkt. Wenn du nur eines ansiehst, dann dieses.

## 0.2 Woher LLMs kommen: ein dreißigjähriger Schnelldurchlauf

Ein Sprachmodell ist keine neue Idee. Der Stammbaum:

- **1950er–1980er — Regeln und Statistik.** Frühe Systeme nutzten
  handgeschriebene Grammatikregeln oder einfache
  Worthäufigkeits-Statistiken („wenn das Wort `bank` auf `river` folgt, meint
  es wahrscheinlich das Flussufer“).
- **1990er–2010er — statistische Sprachmodelle.** Forschende bauten Modelle,
  die dem nächsten Wort eine Wahrscheinlichkeit zuordnen, basierend auf den
  vorherigen Wörtern. Sie trieben frühe Handy-Tastaturen und maschinelle
  Übersetzung an. Die Schwäche: Sie konnten nur ein kurzes Kontextfenster
  sehen.
- **2017 — der Transformer.** Ein Forschungspapier namens *Attention Is All
  You Need* stellte eine Architektur vor, in der Tokens andere Tokens im
  verfügbaren Kontext beachten können. Sie machte es leichter, weit entfernte
  Beziehungen zu modellieren und zu skalieren, hob Kontextgrenzen aber nicht
  auf: Praktische Modelle haben weiterhin ein endliches Kontextfenster.
- **2018–2022 — große Transformer-Sprachmodelle.** Unternehmen trainierten
  Transformer-Modelle auf riesigen Korpora, oft mit dem Ziel, den nächsten Token
  vorherzusagen (ein Token ist grob gesagt ein Wortfragment). Die Fähigkeiten
  entstehen aus dem Zusammenspiel von Architektur, Datenqualität und -abdeckung,
  Optimierung, Skalierung und späterem Training; Ziel und Größe allein erklären
  sie nicht vollständig.
- **2022–heute — Instruction Tuning und Alignment.** Rohe Next-Token-Modelle
  können Texte fortsetzen, aber nicht gut Anfragen befolgen. Anbieter
  trainieren Modelle deshalb darauf, Anweisungen zu befolgen (Instruction
  Tuning) und hilfreiche, harmlose Antworten zu bevorzugen (Alignment, oft
  über menschliches oder KI-Feedback). Das ist der Unterschied zwischen
  „einem Modell, das einen Satz vervollständigen kann“ und „einem Chatbot,
  der tut, was du fragst“.

Das technische Herz — Attention — erklärt 3Blue1Browns Lektion *Transformer
attention* visuell, und die offizielle Modelldokumentation von OpenAI,
Anthropic und Google erklärt es in verständlichem Text. Für einen guten
Umgang mit LLMs brauchen wir die Mathematik nicht. Wichtig ist aber: Die
Vorhersage des nächsten Tokens ist ein wichtiges Trainingsziel, keine
vollständige Erklärung jedes Modells oder Produkts.

## 0.3 Wie ein modernes LLM entsteht: trainieren, ausrichten, bereitstellen

Denk an drei Phasen:

1. **Pre-Training.** Das Modell wird auf einem riesigen Korpus darauf
   optimiert, den nächsten Token vorherzusagen, und erwirbt dabei viele
   statistische Verknüpfungen für die Generierung. Das Ergebnis ist keine
   verifizierte Faktendatenbank. Datenqualität, Abdeckung, Filterung,
   Optimierung und späteres Training beeinflussen blinde Flecken; ein Anbieter
   kann das Modell außerdem aktualisieren oder Retrieval, Suche, Dateien,
   Speicher und Tools ergänzen.
2. **Alignment / Instruction Tuning.** Das Modell wird weiter trainiert,
   Anfragen zu befolgen, schädliche abzulehnen und menschlichen Präferenzen
   zu entsprechen. Deshalb können sich zwei Modelle mit ähnlichem
   Pre-Training im Gespräch sehr unterschiedlich anfühlen.
3. **Bereitstellung und Sicherheitsebenen.** Wenn du in ein Chat-Fenster
   tippst, wird dein Text tokenisiert, durch das Modell geleitet, und der
   Anbieter kann Filter, System-Prompts, Retrieval oder Tool-Zugriff darum
   herum ergänzen. Was du erlebst, ist das Modell plus diese Ebenen.

Drei praktische Konsequenzen:

- **Ein Anbieter kann für ein bestimmtes Modell oder eine Oberfläche einen
  Cutoff dokumentieren.** Bedeutung und Umfang hängen von Anbieter und Version
  ab. Prüfe bei zeitkritischen Antworten aktuelle Produktdokumentation,
  verwendete Quelle und Datum; ein Cutoff allein entscheidet die Frage nicht.
- **Token-Abrechnung hängt vom Produkt ab.** Viele APIs messen Eingabe- und
  Ausgabe-Tokens für Limits oder Abrechnung, aber Preis, Caching, versteckte
  Anweisungen und Zählweise können variieren. Langer Kontext ist nützlich und
  kann Kosten verursachen.
- **Dasselbe Modell kann sich unterschiedlich verhalten**, je nach
  System-Prompts, Einstellungen (temperature) und umgebenden Tools. Eine
  Verhaltensänderung ist nicht automatisch eine Änderung des Modells.

## 0.4 Vier Konzepte, denen du überall begegnest

**Token.** Eine Einheit, die ein bestimmter Tokenizer erzeugt und die das Modell
liest oder generiert. Ein Token ist oft ein Wortfragment, kein ganzes Wort:
„ChatGPT“ kann aus zwei oder drei Tokens bestehen. Preise, Kontextgrenzen und
Geschwindigkeit werden oft in Tokens angegeben, aber die Zählweise hängt von
Anbieter und Oberfläche ab. 100 Tokens ≈ 75 englische Wörter ist nur eine grobe
Schätzung für bestimmte englische Prosa; andere Sprachen und Formate können
stark abweichen.

**Context window.** Die maximale Textmenge, die das Modell auf einmal
berücksichtigen kann — deine Anweisungen plus jedes Gespräch oder Dokument,
das du einfügst. Es ist ein Maß für das Arbeitsgedächtnis, nicht für
Intelligenz. Ein größeres Fenster erlaubt es, längere Dokumente
einzufügen, aber das Modell behandelt das gesamte Fenster weiterhin als
„Dinge, die es zu beachten gilt“, nicht als verifizierte Fakten.

**Temperature (und Sampling).** Eine providerabhängige Dekodiersteuerung.
Niedrige Werte machen wiederholte Ausgaben oft vorhersehbarer, höhere können die
Varianz erhöhen. Temperature ist kein Wahrheitsregler: Auch ein niedriger Wert
kann falsch liegen. Für Fakten und Code muss die Aufgabe prüfbar sein und das
Ergebnis verifiziert werden; beim Brainstorming kann mehr Varianz helfen.

**Parameter und Skalierung.** „Milliarden von Parametern“ beschreibt die
Größe des Modells. Die Größe korreliert mit der Leistungsfähigkeit,
garantiert aber keine Qualität bei deiner Aufgabe; ein kleineres Modell kann
ein größeres bei einer engen, klar definierten Aufgabe schlagen. Beurteile
Modelle nach den Ergebnissen bei deinen eigenen Aufgaben, nicht nach der
Parameteranzahl.

## 0.5 Worin LLMs wirklich gut sind

Gemessen daran, wie diese Systeme in offiziellen Dokumentationen und
Lehrmaterialien beschrieben und eingesetzt werden, sind die verlässlichen
Stärken:

- **Umformulieren und Zusammenfassen** von Texten, die du lieferst, mit
  vorgegebenem Ton, Umfang oder Zielpublikum;
- **Erklären und Unterrichten**: ein Konzept in Schritte zerlegen, Beispiele
  geben, Rückfragen in anderen Worten beantworten;
- **Entwerfen**: Gliederungen, E-Mails, Pläne, Code-Gerüste und erste
  Versionen, die du anschließend überarbeitest;
- **Übersetzen und Sprachübungen** zwischen wichtigen Sprachen in brauchbarer
  Qualität;
- **Informationen strukturieren**: Notizen in Tabellen, Listen oder
  Zusammenfassungen verwandeln; Felder aus Text extrahieren;
- **Code erzeugen und gemeinsam debuggen**: kleine Funktionen schreiben,
  Fehler erklären und Code-Ausschnitte prüfen — immer gegen deine Tests;
- **Planen und Vergleichen**: Optionen und Kriterien aufzählen, solange du
  die Fakten lieferst und die Entscheidung triffst.

Der gemeinsame Nenner: LLMs sind am stärksten, wenn die Aufgabe **Text rein,
Text raus** ist, **mit einem klaren Ziel, das du prüfen kannst**. Am
schwächsten sind sie, wenn die Aufgabe heimlich von Fakten, mathematischer
Präzision oder Handlungen in der realen Welt abhängt.

## 0.6 Was LLMs nicht können (die ehrliche Liste)

Alle seriösen Quellen — von Microsofts LLM-Grundlagen über das Glossar von
Anthropic bis zu unabhängigem Lehrmaterial — kommen zu denselben Grenzen.
Ein Modell:

- **schlägt Fakten nicht selbst nach.** Ein Basismodell erzeugt Text, der
  *konsistent mit* seinen Trainingsdaten ist. Ein Produkt kann Suche,
  Retrieval, Dateien, Speicher oder Tools ergänzen; das sind getrennte
  Oberflächen mit eigenen Daten- und Berechtigungsgrenzen. Auch zurückgegebenes
  Material kann veraltet, unvollständig oder falsch sein: Prüfe Originalquelle
  und Datum.
- **kennt weder die Gegenwart noch deine privaten Daten automatisch.** Es hat
  einen Trainings-Cutoff und erhält nur, was du, ein verbundenes Produkt,
  Kontospeicher, ein Retrieval-System, eine Datei oder ein Tool bereitstellt.
  Prüfe vor dem Einfügen, Hochladen oder Aktivieren einer Verbindung, was die
  aktuelle Oberfläche verlassen darf und wer dies autorisiert hat.
- **kann nicht zuverlässig rechnen.** Große Modelle lösen Textaufgaben über
  Muster, nicht über Berechnung; lange oder knifflige Mathematik braucht
  einen Taschenrechner, Code oder ein Tool.
- **kann nicht verifizieren.** Ein Modell kann dir nicht sagen, ob ein Zitat
  echt ist, eine Website existiert oder eine Behauptung stimmt. Nur du (oder
  ein Tool, das für dich handelt) kannst das prüfen.
- **kann nicht von sich aus in der Welt handeln.** Ein Chat-Modell hat keine
  Dateien, Konten oder Berechtigungen, es sei denn, eine Tool-Ebene stellt
  sie explizit bereit. Ein Login, ein Button oder eine
  Agenten-Zusammenfassung beweisen nicht, dass eine Aktion stattgefunden hat.
- **hat keine eingebaute Erinnerung an dich.** Ein Produkt kann Chatverlauf
  oder Kontospeicher aufbewahren; Datenschutz, Aufbewahrung und Löschung hängen
  vom Produkt und seinen Einstellungen ab. Nimm nicht an, dass ein Chat privat
  ist oder erinnert wird, sondern lies die geltende Richtlinie.
- **ist für sich genommen keine Suchmaschine, kein Taschenrechner, keine
  Datenbank und keine Person.** Ein Produkt kann solche Fähigkeiten verbinden,
  doch dadurch wird nicht jede Antwort aktuell, richtig, autorisiert oder
  privat.

Ein nützliches mentales Modell: **Ein Basis-LLM ist ein brillanter, belesener
Praktikant, der gut entwerfen kann, aber Lücken selbstbewusst füllt. Ein
Chat-Produkt kann diesem Praktikanten zusätzlich Suchergebnisse, Dateien,
einen Taschenrechner, Speicher oder Tools geben.** Du entscheidest trotzdem,
was er lesen oder senden darf, prüfst Quelle und Ergebnis und würdest kein
Rechtsgutachten ungeprüft veröffentlichen lassen. Genau so nutzt man ein LLM.

## 0.7 Wie das deinen Umgang damit verändert

Die Methode des Playbooks folgt direkt aus den Abschnitten 0.5 und 0.6:

1. **Definiere die Aufgabe in Textform** — welches Ergebnis, mit welcher
   Eingabe und welchen Einschränkungen (Kapitel 3 behandelt den vollständigen
   Auftrag).
2. **Liefere den Kontext** — füge das Material ein, benenne das Publikum,
   lege die Grenzen fest. Das Modell arbeitet mit dem, was du ihm gibst.
3. **Verlange eine prüfbare Form** — eine Tabelle, einen Diff, eine Liste,
   einen umgeschriebenen Absatz; etwas, das du inspizieren kannst.
4. **Prüfe selbst** — gleiche Fakten mit Quellen ab, führe Tests am Code aus,
   lies den Diff, bevor du ihn akzeptierst.
5. **Halte die Grenze ein** — lass nicht zu, dass eine plausible Antwort ohne
   Belege zu einer Handlung, einer Zahlung, einer Veröffentlichung oder einer
   Überzeugung wird.

### Fünf-Minuten-Grenzcheck

Bevor du weitermachst, verwende in einem beliebigen Textchat diese fiktive
Behauptung. Aktiviere keine Suche, lade keine Datei hoch und gib keine privaten
Informationen ein.

```text
Ich habe diese Behauptung erhalten: „Die Stadtbibliothek schließt heute um 18 Uhr.“
Bevor du antwortest, ordne ich ein, was ein reines Textmodell feststellen kann und was nicht.

Bitte lass mich zuerst meine Einordnung schreiben. Weise danach nur auf eine Grenze hin,
die ich übersehen habe: Generierung, aktuelle Fakten, Quellenprüfung oder eine Handlung in der realen Welt.
Suche nichts und erfinde keine Quelle.
```

Bewahre deine erste Einordnung und die eine Korrektur auf. Es geht nicht darum,
einen Zauberprompt zu lernen oder die Genauigkeit eines Modells zu beweisen.
Beobachte vielmehr den Unterschied zwischen einem plausiblen Satz und der
Prüfung einer aktuellen Behauptung.

Fahre danach fort mit
[Kapitel 1: Verstehe GPT, bevor du Codex vertraust](../chapters/01-gpt-and-codex-DE.md).

## 0.8 Quellen und Grenzen

Diese Lektion ist eine originäre, allgemeinverständliche Nacherzählung. Die
zugrunde liegenden öffentlichen Quellen (geprüft am 2026-08-16) sind:

- **Microsoft Learn — LLM Fundamentals** (Agent-Framework-Journey):
  https://learn.microsoft.com/en-gb/agent-framework/journey/llm-fundamentals —
  beschreibt, was LLMs sind, Tokens, Kontext und womit LLMs sich schwer tun.
- **3Blue1Brown — How large language models work** (animierte Reihe):
  https://www.3blue1brown.com/lessons/attention — die klarste visuelle
  Erklärung von Token-Vorhersage und Attention.
- **Claude Platform Docs — Glossary**:
  https://platform.claude.com/docs/en/about-claude/glossary — offizielle
  Definitionen von Modell, Context Window, Token und verwandten Begriffen.
- **Educative — Limitations of large language models**:
  https://www.educative.io/blog/limitations-of-llms — eine gut lesbare
  Zusammenfassung von Halluzination, veralteten Daten und mathematischen
  Grenzen.
- **Attention Is All You Need** (Vaswani et al., 2017): das ursprüngliche
  Transformer-Papier, verlinkt für den Geschichtsabschnitt.

Zugriffsdaten, Modellversionen und Produktfakten ändern sich; behandle alles
Produktspezifische in dieser Lektion als `stale after 2026-11-09`, bis es
anhand offizieller Quellen aktualisiert wird. Die Lektion behauptet nicht,
dass ein Modell, ein Anbieter oder ein Benchmark-Ergebnis das beste,
schnellste oder sicherste ist. Sie ist ein Kandidat: Quellen und Struktur
wurden geprüft, Lernergebnisse wurden jedoch noch nicht gemessen.
