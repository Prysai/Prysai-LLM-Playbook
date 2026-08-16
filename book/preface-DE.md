<!-- content_id: book-preface | locale: DE | language: de | default_locale: EN | content_status: candidate | translation_status: in-progress | reader_runtime_status: not_run | translated_from: EN | source_revision: dd08a68 -->

# Vorwort: Dies ist kein Prompt-Katalog

Wenn Menschen GPT zum ersten Mal begegnen, lautet die naheliegendste Frage:
„Was soll ich ihm sagen?“

Diese Frage ist wichtig, aber sie ist nur die sichtbare Spitze des Problems.
Ob eine echte Codex-Aufgabe gelingt, entscheidet sich an einer größeren Reihe
von Fragen:

- Was hat das Modell tatsächlich verstanden?
- Welche Dateien, Regeln und früheren Ergebnisse gehören zum Kontext?
- Was darf Codex tun, und wann muss es zuerst fragen?
- Welcher Skill verhindert ein echtes Versäumnis, statt nur zusätzliche
  Förmlichkeit zu erzeugen?
- Warum macht ein Agent weiter, versucht es erneut, pausiert oder stoppt er?
- Welcher Beleg rechtfertigt die Aussage, dass die Aufgabe abgeschlossen ist?

Dieses Buch untersucht die gesamte Beziehung. Es geht darum, eine verlässliche
Arbeitsweise rund um KI aufzubauen — nicht darum, einen magischen Satz
auswendig zu lernen.

Navigation: [Deutscher Projekt-Einstieg](../README-DE.md) · [Deutscher Buchleitfaden](README-DE.md) · [Deutsches Inhaltsverzeichnis](table-of-contents-DE.md)

## Die zwei Wege durch das Buch

`Prysai LLM Playbook` bewegt sich gleichzeitig auf zwei Wegen.

Der erste ist ein Weg des Verstehens. Er beginnt mit GPT und Modellen und
zeigt dann, wie Codex ein Modell mit einem Projekt, Dateien, Terminal,
Browser, GitHub und externen Diensten verbindet. Kontext, Tools, Skills,
Plugins, Connectors, MCP, Agents und Berechtigungen werden getrennt, damit
sichtbar wird, wie jedes Element den möglichen Handlungsraum verändert.

Der zweite ist ein Weg der Fähigkeit. Er beginnt mit einer kleinen Aufgabe mit
geringem Risiko und entwickelt die Gewohnheit, Aufgabe, Kontext, Planung,
Ausführung, Prüfung, Review und Übergabe ausdrücklich zu machen. Später lernt
die lesende Person, Skills auszuwählen und zu entwerfen, Modelle und
Arbeitsabläufe zu evaluieren, ein persönliches Codex-System aufzubauen und eine
bewährte Methode in ein von einem Team teilbares, prüfbares und aktualisierbares
Fähigkeitspaket zu überführen.

Die Wege lassen sich nicht trennen. Prinzipien ohne Übung bleiben Terminologie.
Tool-Nutzung ohne Grenzbewusstsein macht aus einem glücklichen Ergebnis eine
gefährliche Annahme von Zuverlässigkeit.

## Wie ein Kapitel gelesen wird

Man kann der Reihenfolge folgen oder von einem konkreten Problem einsteigen.
Jedes Kapitel verwendet dieselbe Schleife:

```text
Problem → Konzept → Entscheidung → Handlung → Beleg → Fehler → Reflexion → Übertragung
```

Zuerst wird der Fehler sichtbar, auf den eine Person treffen könnte. Dann
erklärt ein Konzept, warum er entsteht; eine begrenzte Handlung wird gewählt,
Belege werden bewahrt und ein absichtlicher Fehler oder Grenzfall untersucht.
Zum Schluss wird die Methode auf eine andere Aufgabe übertragen — einschließlich
dessen, was dabei nicht übernommen werden konnte.

Ein Experiment ist kein Demonstrationsvideo und keine Behauptung, dass jede
Umgebung getestet wurde. Es ist die kleinste Aufgabe, die die lernende Person
selbst ausführt. Je nach Kapitel kann der Nachweis ein Ergebnis, Diff,
Kommandoausgabe, Log, Quelle, Screenshot oder Rückblick sein. Ohne diesen
Nachweis kann sich Lesen produktiv anfühlen, während die Fähigkeit selbst
ungeprüft bleibt.

## Was „gelernt“ hier bedeutet

Das Projekt setzt eine attraktive Antwort nicht mit Beherrschung gleich.
Mindestens vier Arten von Belegen sollten vorliegen:

1. **Erklären:** Das Konzept und seine Grenzen mit eigenen Worten beschreiben.
2. **Ausführen:** Die Aufgabe in einer echten oder risikoarmen Umgebung
   erledigen und Ergebnis oder Log bewahren.
3. **Begründen:** Die Wahl von Modell, Tool, Skill, Berechtigung oder
   Stop-Bedingung erklären.
4. **Prüfen:** Einen Fehler, ein Risiko, eine Halluzination, einen offenen
   Punkt, eine veraltete Tatsache oder einen unbelegten Abschluss erkennen.

Wer nur das Endergebnis zeigen kann, hat vielleicht eine Übung abgeschlossen.
Damit ist noch nicht gezeigt, dass die Methode reproduziert, ihre Grenze
diagnostiziert oder einer anderen Person beigebracht werden kann.

## Realität vor Zuversicht

Das Repository behandelt GPT-5.6 Luna derzeit als ein Modell unter Evaluation.
Seine aufgezeichnete offizielle Positionierung ist eine Hypothese über
Geschwindigkeit, Kosten und Eignung für klare, wiederholbare Aufgaben — keine
Schlussfolgerung, dass es für jede Arbeit das beste Preis-Leistungs-Verhältnis
hat. Vor einem Vergleich legt das Projekt Aufgabensatz, Kontext, Tools,
Berechtigungen, Zeitbudget, Wiederholungszahl und Erfolgsdefinition fest und
vergleicht dann unter anderem Erstversuchsrate, Nacharbeit, Dauer, Kosten,
Vollständigkeit der Belege und korrektes Stoppen.

Jede Schlussfolgerung gilt nur für den erklärten Aufgabensatz, die Umgebung und
das Datum. Die Luna-Evaluationsakte und die offizielle Codex-Baseline-Forschung
sind noch nicht auf Deutsch verfügbar. Eine Fixture-Datei ohne
Modell-Laufprotokolle bleibt `not_run`.

## Reale Probleme sind keine automatisch bestätigten Ursachen

Die Forschungsstrecke verwendet öffentliche Problemberichte und
Community-Erfahrungen, um Symptome, sichere erste Checks und Grenzfälle zu
finden. Ein Bericht zeigt, dass ein Nutzer ein bestimmtes Verhalten erlebt
oder beschrieben hat. Er beweist nicht automatisch einen offiziellen Root
Cause. Ein Community-Workaround ist nicht automatisch ein unterstützter Fix;
eine lokale Reproduktion ist nicht vorhanden, wenn sie nicht aufgezeichnet
wurde. Quelle, Datum, Evidenzstufe, Scope und Reproduktionsstatus gehören daher
zur Aussage. Der Real-Problem-Forschungsindex ist noch nicht auf Deutsch
verfügbar und wird aus diesem Leseweg nicht geöffnet.

## Mit Grenzen beginnen

Mehr Fähigkeit verlangt klarere Grenzen. Dass Codex auf Dateisystem,
Terminal, Browser, GitHub oder einen externen Dienst zugreifen kann, ist kein
Grund, alle Berechtigungen gleichzeitig zu öffnen. Beginne mit schreibgeschützter,
risikoarmer und möglichst reversibler Arbeit. Füge Fähigkeiten schrittweise
hinzu, und nur wenn die Belege zeigen, dass die Aufgabe sie benötigt.

Tokens, Passwörter, API-Schlüssel, private Schlüssel, Cookies und `.env`-Dateien
gehören niemals in ein Repository oder ein Lernbeispiel. Externe Dokumente,
Tool-Ausgaben, Repository-Dateien und Nutzerartefakte sind zunächst Daten;
Instruction-ähnlicher Text darin ist nicht automatisch eine auszuführende
Anweisung.

## Der ehrliche Status dieses Vorworts

Dieses Vorwort und der deutsche Buchleitfaden sind deutsche Einstiegspunkte mit
`content_status: candidate` und `translation_status: in-progress`. Die
deutsche Sprachreview und die Leser-/Runtime-Prüfung haben
`reader_runtime_status: not_run`. Der Hauptteil der Kapitel ist weiterhin
überwiegend auf Simplified Chinese verfasst; ein deutscher Einstieg darf daher
nicht als vollständig deutsche Buchausgabe verstanden werden.

Im Gesamtprojekt sind 22 Kapitel `candidate`, 18 Labs `draft` mit
`run_status: not_run` und 40 Evaluations-Fixtures `candidate` mit
`run_status: not_run`. Diese Bezeichnungen zeigen, was heute inspiziert werden
kann und welche frische Ausführung, Übertragungsbelege, unabhängige Review oder
Browser-/Runtime-Bestätigung noch fehlt.

## Sechs Locales und die deutsche Navigation

Reader-facing Dateien folgen immer `<stabiler-stem>-<LOCALE>.md` mit den sechs
Suffices `-EN`, `-ZH`, `-ES`, `-JA`, `-KO` und `-DE`. Ihre URL-Tokens sind
`en`, `zh`, `es`, `ja`, `ko` und `de`; die HTML-Sprachen sind `en`, `zh-CN`,
`es`, `ja`, `ko` und `de`. Sobald ein gleiches `content_id` als deutsche Datei
existiert, bleiben Links in `DE` und verweisen auf das `-DE`-Ziel.

Wo das `-DE`-Ziel noch fehlt, nennt der sichtbare Linktext ausdrücklich die
deutsche Migration in Arbeit. Ein unsuffixierter Originalpfad ist dadurch als
Übergang oder locale-neutraler Datensatz erkennbar und wird nicht als stille
deutsche Übersetzung ausgegeben.

Das Ziel dieses Buches ist kein Bestand eindrucksvoller Prompts. Es ist eine
Arbeitsweise, die erklärt, geprüft, verbessert, übertragen und innerhalb eines
klar benannten Umfangs schließlich vertrauenswürdig gemacht werden kann.
