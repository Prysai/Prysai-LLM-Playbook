<!-- content_id: llm-fundamentals-guide | locale: DE | language: de | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Lektion 0: Was ist ein großes Sprachmodell?

**Lesezeit:** etwa 20 Minuten. **Status:** `candidate` · **Lernnachweis:** `not_run`.

Dies ist die erste Lektion des Playbooks. Wenn du nicht sicher bist, was ein
„Large Language Model“ (LLM) wirklich ist — jenseits des Marketings —, beginne
hier. Wir bauen uns ein mentales Modell auf, Schicht für Schicht, so wie eine
Professorin oder ein Professor ein neues Thema einführen würde: zuerst das
Wesentliche, dann die Mechanik, dann die ehrlichen Grenzen. Alles in dieser
Lektion ist eine allgemeinverständliche Nacherzählung der am Ende aufgeführten
öffentlichen Quellen; sie ist keine Kopie eines einzelnen Dokuments.

## 0.1 Ein Satz, dann ein Bild

**Ein LLM ist eine Maschine, die das nächste Textstück vorhersagt, auf einer
enormen Menge menschlicher Texte trainiert und anschließend darauf abgestimmt
ist, Anweisungen zu befolgen.**

Das Bild, das das konkret macht: Stell dir die Autovervollständigung auf
deinem Telefon vor — aber trainiert auf einer Bibliothek aus Millionen von
Büchern, Artikeln, Code-Repositories und Gesprächen und enorm hochskaliert.
Die Autovervollständigung schlägt ein Wort vor; ein LLM kann einen Absatz
fortsetzen, eine Frage beantworten, übersetzen, gliedern, Code debuggen oder
ein Gespräch führen — denn all diese Aufgaben lassen sich umformulieren als
„angesichts des bisherigen Texts: Was kommt als Nächstes?“

Diese eine Idee erklärt mehr, als du erwarten würdest:

- warum ein LLM über fast alles flüssig schreiben kann (es hat enorme Mengen
  an Text gesehen);
- warum es manchmal Fakten erfindet (ein Basismodell sagt plausiblen Text
  voraus, statt Fakten selbst nachzuschlagen);
- warum ein Chat-Produkt mehr als das Basismodell leisten kann (es kann Suche,
  Dateien, Speicher, Retrieval oder Tools ergänzen, jeweils mit eigenen Daten-
  und Berechtigungsgrenzen);
- warum es sich ändert, wenn Modelle aktualisiert werden (der Trainingstext
  ändert sich).

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
  You Need* stellte eine Architektur vor, die es einem Modell erlaubt, alle
  Wörter eines Texts gleichzeitig zu gewichten, statt von links nach rechts
  zu lesen. Damit fiel der Engpass des kurzen Fensters weg.
- **2018–2022 — Skalierung und der „Next-Token“-Trick.** Unternehmen
  trainierten Transformer-Modelle auf riesigen Korpora mit einem einzigen
  Ziel: den nächsten Token vorherzusagen (ein Token ist grob gesagt ein
  Wortfragment). Mit genug Daten und Rechenleistung begannen Modelle, Fragen
  zu beantworten, Code zu schreiben und Anweisungen zu befolgen, ohne für
  jede Aufgabe explizit programmiert zu sein.
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
Umgang mit LLMs brauchen wir die Mathematik nicht, aber zu wissen, dass der
Kern darin besteht, „den nächsten Token vorherzusagen und das Verhalten
anschließend auszurichten“, erklärt das meiste von dem, was folgt.

## 0.3 Wie ein modernes LLM entsteht: trainieren, ausrichten, bereitstellen

Denk an drei Phasen:

1. **Pre-Training.** Das Modell liest ein riesiges Korpus und lernt, den
   nächsten Token vorherzusagen. Hier wird der Großteil des „Wissens“ (als
   statistische Muster) gespeichert. Hier entstehen auch die blinden Flecken
   des Modells: Endet das Korpus 2025, kennt das Modell die Ereignisse von
   2026 nicht.
2. **Alignment / Instruction Tuning.** Das Modell wird weiter trainiert,
   Anfragen zu befolgen, schädliche abzulehnen und menschlichen Präferenzen
   zu entsprechen. Deshalb können sich zwei Modelle mit ähnlichem
   Pre-Training im Gespräch sehr unterschiedlich anfühlen.
3. **Bereitstellung und Sicherheitsebenen.** Wenn du in ein Chat-Fenster
   tippst, wird dein Text tokenisiert, durch das Modell geleitet, und der
   Anbieter kann Filter, System-Prompts, Retrieval oder Tool-Zugriff darum
   herum ergänzen. Was du erlebst, ist das Modell plus diese Ebenen.

Drei praktische Konsequenzen:

- **Das Modell ist an seinem Trainings-Cutoff eingefroren**, sofern der
  Anbieter kein Retrieval ergänzt oder das Modell aktualisiert wird. Frag bei
  zeitkritischen Fragen immer nach dem Cutoff.
- **Jede Anfrage kostet Tokens.** Sowohl die Eingabe, die du lieferst, als
  auch die erzeugte Ausgabe zählen. Ein langer Kontext ist nützlich, aber
  nicht umsonst.
- **Dasselbe Modell kann sich unterschiedlich verhalten**, je nach
  System-Prompts, Einstellungen (temperature) und umgebenden Tools. Eine
  Verhaltensänderung ist nicht automatisch eine Änderung des Modells.

## 0.4 Vier Konzepte, denen du überall begegnest

**Token.** Die Einheit, die das Modell liest und schreibt. Ein Token ist oft
ein Wortfragment, kein ganzes Wort: „ChatGPT“ kann aus zwei oder drei Tokens
bestehen. Preise, Kontextgrenzen und Geschwindigkeit werden in Tokens
gemessen. Grob gesagt: 100 Tokens ≈ 75 englische Wörter.

**Context window.** Die maximale Textmenge, die das Modell auf einmal
berücksichtigen kann — deine Anweisungen plus jedes Gespräch oder Dokument,
das du einfügst. Es ist ein Maß für das Arbeitsgedächtnis, nicht für
Intelligenz. Ein größeres Fenster erlaubt es, längere Dokumente
einzufügen, aber das Modell behandelt das gesamte Fenster weiterhin als
„Dinge, die es zu beachten gilt“, nicht als verifizierte Fakten.

**Temperature (und Sampling).** Eine Einstellung, die steuert, wie zufällig
die Ausgabe ist. Niedrige Temperatur → vorhersehbarer, repetitiver; hohe
Temperatur → abwechslungsreicher, manchmal kreativer. Für Fakten und Code
nimm lieber niedrige Werte; beim Brainstorming kann ein höherer Wert helfen.

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

Wenn du das in zehn Minuten spüren willst, mach den
[ersten Check ohne Setup](../communication-clinic-DE.md#share-check): eine
fiktive Nachricht, drei menschliche Prüfungen, eine kleine Quittung. Wenn du
ein fundierteres Fundament willst, fahre fort mit
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
schnellste oder sicherste ist.
