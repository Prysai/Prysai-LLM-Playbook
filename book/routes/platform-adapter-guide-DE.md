<!-- content_id: platform-adapter-guide-route | locale: DE | language: de | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Wähle deine LLM-Plattform: derselbe Kern und ein Adapter nach dem anderen

**Status:** `candidate`. **Laufstatus:** `not_run`.

ChatGPT, Claude, Gemini, DeepSeek, Grok und Codex sprechen alle im Gespräch mit
dir, aber sie sind nicht dasselbe Produkt. Diese Route behält den übertragbaren
Kern der [Universal Core Foundations route](universal-core-foundations-de.md)
und ergänzt jeweils einen ehrlichen Adapter: was sich wirklich unterscheidet,
was du heute auf jeder Plattform gefahrlos ausprobieren kannst und was du in
offiziellen Quellen prüfen musst, bevor du einer plattformspezifischen
Behauptung vertraust.

Der Flaggschiff-Übungsstrang des Playbook ist Codex, aber die Methode ist nicht
an einen Anbieter gebunden. Jede unten genannte Plattform ist ein
**Kandidaten-Adapter**: Der universelle Kern gilt, die plattformspezifischen
Steuerungen brauchen eine eigene datierte Quelle vom Anbieter, bevor sie zu
Lehrfakten werden.

## Regel Null: Leite Gleichwertigkeit nie aus einem Namen ab

Ein Modellname, ein Login oder ein vertrauter Button beweist nicht, dass zwei
Plattformen Werkzeuge, Berechtigungen, Speicher, Konten, Preise,
Datenkontrollen oder das Verhalten ihrer Agents teilen. Bevor du eine
Behauptung über eine Plattform weitergibst, stelle drei Fragen:

1. **Welche Produktoberfläche genau** (Web-Chat, App, CLI, IDE, API, Agent)?
2. **Welche Quelle vom Anbieter selbst, geprüft wann**, sagt, dass das heute
   stimmt?
3. **Was würde sich sichtbar ändern**, wenn die Behauptung falsch wäre?

Wenn du nicht alle drei beantworten kannst, behandle die Behauptung als
`unknown` und notiere die nächste Prüfung. Die Pflegemethode hinter dieser
Regel beschreiben der
[Platform Adapter Review Skill](../skills/prysai-platform-adapter-review/SKILL.md)
und der [Platform Fact Watch](../skills/prysai-platform-fact-watch/SKILL.md).

## Die Plattformübersicht auf einer Seite

| Plattform | Typische Oberflächen | Was sich meist vom Kern unterscheidet | Sicherer erster Schritt auf dieser Seite |
|---|---|---|---|
| ChatGPT | Web-Chat, App, API | Kontoumfang, Speichereinstellungen, Datei-Upload, Browsing-Schalter, Share-Links | [Erste Aufgabe in ChatGPT](#chatgpt-first-task) |
| Claude / Claude Code | Web-Chat, CLI-Agent, IDE | Terminal- und Datei-Agent, Berechtigungsabfragen, CLAUDE.md-Projektspeicher | [Erste Aufgabe in Claude Code](#claude-code-first-task) |
| Gemini | Web-Chat, App, API | Google-Kontoumfang, Google-Workspace-Integration, App-Erweiterung | [Erste Aufgabe in Gemini](#gemini-first-task) |
| DeepSeek | Web-Chat, App, API | Modellwahl und Kontextfenster variieren je nach Release; offizielle Modellseite prüfen | [Erste Aufgabe in DeepSeek](#deepseek-first-task) |
| Grok | Web-Chat, App | X-Konto-Integration, Zugriff auf Echtzeit-Beiträge, Rhythmus der Modell-Releases | [Erste Aufgabe in Grok](#grok-first-task) |
| Codex | Desktop, CLI, IDE, Cloud, API | der Flaggschiff-Übungsstrang des Playbook: Dateien, Werkzeuge, Skills, Agents, Berechtigungen | [Codex-Pfad](../routes/first-safe-change-de.md) |

Diese Tabelle ist Orientierung, keine Gleichwertigkeitsaussage. Jede Zeile
braucht weiterhin eine eigene aktuelle Quelle, bevor eine Lektion davon
abhängt. Die Verfügbarkeit von Oberflächen, Preise und Standard-Berechtigungen
ändern sich häufig; behandle sie als volatile Fakten.

## Die sichere erste Aufgabe auf jeder Plattform

Kopiere diese Anfrage in die Plattform deiner Wahl. Sie verwendet fiktives
Material, keine Werkzeuge und keine Kontodaten – dieselbe Aufgabe funktioniert
überall, und genau darum geht es im Kern.

```text
Ergebnis: Schreibe diesen fiktiven Vereinshinweis für neue Mitglieder um.
Material: „Der Verein trifft sich dienstags um 18 Uhr. Bring ein Notizbuch mit.
Der Raum wird später bestätigt."
Form der Antwort: Schreibe zwei Sätze. Behalte jedes genannte Faktum bei. Setze
fehlende Details in [eckige Klammern]. Liste dann die Fakten auf, die du
beibehalten hast.
Prüfung: Vergleiche Quelle und Umschreibung. Es darf keine neue Uhrzeit, kein
neuer Raum, keine Gebühr, kein Kontakt und kein Versprechen auftauchen.
Stopp: Surfe nicht, sende nicht, veröffentliche nicht und nimm kein unbekanntes
Detail an.
```

Prüfe dann selbst drei Dinge:

1. Kannst du jede Aussage in der Umschreibung im gelieferten Hinweis belegen?
2. Hat die Antwort die Zwei-Sätze-Grenze eingehalten und gezeigt, was sie
   beibehalten hat?
3. Hat sie ein Detail ergänzt, das `[unknown]` bleiben sollte?

Wenn der Chat anbietet zu suchen, zu senden, zu veröffentlichen oder ein
Werkzeug zu verwenden, oder wenn er mehr Material verlangt, als diese kleine
Übung braucht, stoppe. Die Plattform mag zu diesen Aktionen fähig sein;
Fähigkeit ist keine Anweisung, sie zu nutzen.

<span id="chatgpt-first-task"></span>

## Erste Aufgabe in ChatGPT

Öffne eine beliebige ChatGPT-Oberfläche und führe die sichere erste Aufgabe von
oben aus. Notiere dann einen Plattform-Unterschied, den du tatsächlich
beobachtest: Erwähnt die Antwort Browsing, Speicher oder einen Share-Link?
Halte fest, was du gesehen hast, nicht was du annimmst. Für eine
quellengestützte Prüfung einer ChatGPT-Behauptung nutze den
[Source Investigator Skill](../skills/prysai-source-investigator/SKILL.md) –
die offiziellen OpenAI-Hilfeseiten sind der Eigentümer der Produktfakten.

<span id="claude-code-first-task"></span>

## Erste Aufgabe in Claude Code

Claude Code ist ein Terminal-Agent: Er kann Dateien in dem Projekt lesen und
bearbeiten, in dem du ihn startest. Erstelle vor jedem Schritt einen
Wegwerf-Ordner und führe die sichere erste Aufgabe dort aus. Achte auf die
Berechtigungsabfrage: Fragt sie, bevor Dateien bearbeitet oder Befehle
ausgeführt werden? Diese Abfrage ist der Unterschied zwischen Chat und Agent –
und der Punkt, an dem du wählst. Für den Projektspeicher liest Claude Code eine
Datei `CLAUDE.md`; behandle alles, was dort steht, als Anweisungen, denen ein
Modell folgen kann, und prüfe sie wie jede Projektregel. Starte Claude Code
erst dann in einem echten Repository mit Zugangsdaten, Produktionsdaten oder
destruktiven Befehlen, wenn du die Disziplin der
[First Safe Change route](first-safe-change-de.md) abgeschlossen hast.

<span id="gemini-first-task"></span>

## Erste Aufgabe in Gemini

Führe die sichere erste Aufgabe in der Gemini-Chat-Oberfläche aus. Notiere,
welcher Kontoumfang aktiv ist und ob die Oberfläche App-Erweiterungen (Google
Workspace, YouTube, Maps) anbietet. Eine Erweiterung ist eine externe Wirkung:
Sie kann in deinem Namen lesen oder schreiben. Eine Gemini-Lektion über
Erweiterungen ist daher ein Plattform-Adapter-Thema, kein Kern-Thema. Aktiviere
für eine reine Textübung keine Erweiterungen.

<span id="deepseek-first-task"></span>

## Erste Aufgabe in DeepSeek

Führe die sichere erste Aufgabe in der DeepSeek-Chat- oder App-Oberfläche aus.
Modellnamen, Kontextfenster und Verfügbarkeit ändern sich zwischen Releases;
die offizielle Modellseite ist der Eigentümer dieser Fakten. Notiere den
Modellnamen, den du tatsächlich verwendet hast, und das Datum, damit der Lauf
reproduzierbar bleibt. Füge keine API-Schlüssel, keinen privaten Code und keine
internen Dokumente in einen Web-Chat ein.

<span id="grok-first-task"></span>

## Erste Aufgabe in Grok

Führe die sichere erste Aufgabe in der Grok-Chat-Oberfläche aus. Wenn dein Konto
mit X verknüpft ist, beachte, dass Beiträge und Echtzeit-Inhalte in den Umfang
des Gesprächs fallen können; das ist ein Plattform-Unterschied und zugleich
eine Entscheidung über deine Privatsphäre. Füge keine privaten Nachrichten oder
Entwürfe in ein Gespräch ein, das ein soziales Netz erreichen kann. Eine
Grok-Antwort, die aktuelle Beiträge zitiert, ist eine Behauptung über das
Abrufverhalten der Plattform – prüfe sie anhand der offiziellen X/Grok-
Hilfeseiten, bevor du sie weitergibst.

## Erste Aufgabe in Codex

Codex ist der Flaggschiff-Übungsstrang des Playbook, weil er den vollständigen
Kreislauf zeigt: Kontext, Werkzeuge, Berechtigungen, Skills, Agents und
Verifikation. Beginne mit der [First Safe Change route](first-safe-change-de.md)
und [Lab 001](../labs/lab-001-first-safe-task-de.md) in einem Wegwerf-Projekt.
Wechsle erst dann zu einer Cloud-Oberfläche oder einem echten Repository, wenn
dir die Gewohnheit vertraut ist, erst zu prüfen und dann zu bearbeiten.

## Nach der ersten Aufgabe: Welchem Übungsstrang solltest du folgen?

- Du willst eine reine Text-Einstiegsübung: [Beginner Practice Pack](../communication-clinic-de.md).
- Du willst den Flaggschiff-Übungsstrang mit Dateien und Werkzeugen in der
  Tiefe: [First Safe Change](first-safe-change-de.md).
- Du willst zuerst das plattformneutrale Fundament: [Universal Core Foundations](universal-core-foundations-de.md).
- Du willst zwei Plattformen fair vergleichen: [LLM Comparison Protocol](../skills/prysai-llm-comparison-protocol/SKILL.md).
- Du willst wissen, ob eine Plattform-Lektion in den Lehrplan gehört:
  [Platform Adapter Review](../skills/prysai-platform-adapter-review/SKILL.md).

## Belegstand und Grenzen

Diese Route ist `candidate / not_run`: Struktur und Prüfungen existieren,
aber es ist kein Lernenden-Lauf, kein plattformübergreifender Lauf und keine
unabhängige Prüfung dokumentiert. Die Beschreibungen der einzelnen Plattformen
oben sind Orientierung, abgeleitet aus Dokumentation des Anbieters und
datierten Forschungsbelegen
([cross-LLM beginner prompting source receipt](../docs/research/cross-llm-beginner-prompting-and-platform-boundaries-source-receipt-2026-08-15.md),
[platform teaching boundary card](../docs/research/cross-platform-teaching-boundary-card-source-receipt-2026-08-15.md)).
Sie sind kein Beleg dafür, dass sich Plattformen identisch verhalten, dass eine
Aufgabe überall gelingt oder dass Produktfunktionen gleichwertig sind.
Plattformspezifische Befehle, Berechtigungen, Preise und Verfügbarkeit sind
volatile Fakten: Prüfe die offizielle Quelle mit Abrufdatum, bevor du dich
darauf verlässt.

- [ ] Ich habe nur fiktiven, öffentlichen oder autorisierten Text verwendet.
- [ ] Ich habe die genaue Oberfläche, den sichtbaren Modellnamen und das Datum meines Laufs notiert.
- [ ] Ich habe das Verhalten einer Plattform nicht als Beleg für das Verhalten einer anderen behandelt.
- [ ] Ich habe keine Geheimnisse, privaten Nachrichten oder unveröffentlichten Dateien eingefügt.
- [ ] Ich habe gestoppt, als ein Werkzeug, Browsing, Upload, Senden oder Veröffentlichen angeboten wurde.
