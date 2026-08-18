<!-- content_id: first-safe-change-route | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: first-safe-change-EN.md | source_revision: worktree-2026-08-14 -->

# Die erste sichere Änderung: eine Offline-Übung vor Lab 001

**Inhaltsstatus:** ergänzende Route `candidate`. **Lernendendurchlauf:**
`not_run`.
**Übersetzungsstatus:** vollständiger deutscher Entwurf; eine unabhängige
Sprachprüfung steht noch aus.

Dies ist die Standardsandbox für Einsteigerinnen und Einsteiger zwischen
Kapitel 2 und Lab 001. Sie bietet ein absichtlich unvollständiges README,
eine erlaubte lokale Änderung und einen engen Check, bevor du in deinem
eigenen Projekt arbeitest. Sie ist weder Kapitel 23 noch ein neues Skill,
keine Git-Übung und kein Beleg dafür, dass ein Modell etwas erledigt hat.

Wenn du zum ersten Mal einen Projektordner öffnest oder einen Check ausführst,
ist genau das der Grund für diese Route. Du musst nichts installieren, kein
Konto anlegen und kein echtes Projekt riskieren. Das Ziel bleibt so klein,
dass du alle relevanten Dateien sehen und selbst beurteilen kannst, ob der
Check die Frage tatsächlich beantwortet.

## Problem

Lab 001 verlangt ein wegwerfbares Projekt, eine echte Quelle für einen Befehl
und eine begrenzte README-Änderung. Das sind gute produktionsnahe Bedingungen,
doch der erste praktische Schritt kann sich dadurch im Kreis drehen: Neue
Lesende haben noch kein sicheres Projekt und wissen nicht, welcher
Befehlsquelle sie vertrauen sollen.

## Konzept

Ein Fixture trennt das *Üben der Methode* von der Suche nach einem passenden
Projekt. Es ist künstlich, lokal und wegwerfbar. Die einzige vorgesehene
Inhaltsänderung ist eine README-Korrektur; der Prüfer liest nur diese Datei und
meldet ein kleines Ergebnis. So wird die Abnahmebedingung sichtbar, ohne Konto,
Netzwerk, Installation, Git, Commit, Push, Veröffentlichung oder persönliche
Daten zu benötigen.

## Entscheidung

Wenn du noch kein wegwerfbares lokales Projekt hast, verwende das
projektinterne [Fixture „Erste sichere Änderung“](../../examples/lab-001-v1/README-DE.md).
Kopiere den gesamten Fixture-Ordner nach `.work/` oder an einen anderen
temporären Ort. Bearbeite nicht das Original im Repository, sonst bleibt der
vorbereitete Fehler für die nächste Person nicht erhalten.

## Aktion

Lege zunächst eine private Arbeitskopie an. Kopiere im Dateimanager den
gesamten Ordner `examples/lab-001-v1` an einen Ort, den du wieder löschen
kannst, und nenne die Kopie `first-safe-change`.

Wähle danach einen von zwei Checks:

1. **Check ohne Laufzeitumgebung (Standard).** Öffne in der Kopie
   `seed/README.md` und `expected/acceptance.json`. Vor der Änderung fehlen
   dem README zwei verpflichtende Vorschauangaben. Prüfe nach der einzigen
   erlaubten README-Änderung, ob das README alle drei unter
   `required_readme_strings` genannten Zeichenfolgen enthält.
2. **Optionaler lokaler Prüfer.** Verwende ihn nur, wenn Python 3 auf deinem
   Rechner bereits funktioniert. Öffne ein Terminal im kopierten Ordner und
   führe aus:

```powershell
python .\seed\verify_readme.py
```

Das erste optionale Prüfergebnis muss `FIRST_SAFE_CHANGE_FAILED` sein. Das ist
der absichtliche Ausgangszustand und keine defekte Installation. Lies die
Aufgabenkarte im Fixture-README, prüfe `seed/README.md` und schlage die
kleinstmögliche Änderung vor. Bearbeite **nur** dieses README, nachdem du den
Plan selbst bestätigt hast. Wiederhole anschließend den manuellen oder den
optionalen Check. Das optionale Erfolgsresultat lautet
`FIRST_SAFE_CHANGE_OK`.

Falls Python nicht verfügbar ist, installiere nicht nur für diese Route eine
Laufzeitumgebung und ersetze den Befehl nicht durch einen anderen. Verwende den
Check ohne Laufzeitumgebung und notiere
`check: manual required_readme_strings 3/3`. Wenn du nicht einmal eine
wegwerfbare lokale Kopie erstellen kannst, stoppe und nutze das textbasierte
First Win; eine GitHub-Webansicht ist keine lokale Sandbox.

## Web-Coding-Brücke: Eine sichtbare Änderung im echten Browser

Wenn dein nächstes Ziel Web-Coding ist, beginne nicht mit „Baue eine komplette Website“.
Verwende die [Product-Context-Sandbox](../../examples/skill-sandbox/product-context-real-estate/README-DE.md)
als wegwerfbare statische Seite. Sie enthält nur erfundene Texte, keine echten Angebote,
kein Formular, keine Analyse, keine API und kein externes Bild.

1. Kopiere den gesamten Ordner `examples/skill-sandbox/product-context-real-estate` an
   einen temporären Ort und lies README sowie `index.html`.
2. Ändere **nur `index.html`**: Ersetze einen sichtbaren Satz für dieselbe erfundene
   Zielgruppe. Ändere weder CSS noch Framework, Bild oder Formular.
3. Wenn Python 3 bereits verfügbar ist, starte im kopierten Ordner den dokumentierten
   lokalen Server:

```powershell
python -m http.server 4182
```

Öffne `http://127.0.0.1:4182/` im Browser. Prüfe Titel, neuen Satz, erhaltene Überschrift,
Linkziele, Konsole und einen 390px breiten Viewport. Wenn Befehl, Zieldatei oder
Browserergebnis unklar sind, stoppe; installiere für diese Übung keine Laufzeit.

Bewahre einen kurzen Beleg auf:

```text
sandbox: <kopierter Ordner>
allowed_change: index.html only
url: http://127.0.0.1:4182/
browser_check: neuer Satz einmal; Überschrift und Links erhalten; Konsole beobachtet
diff: <geprüfter Diff>
unverified: Deployment, Accessibility-Review, andere Browser, Nutzerabnahme
```

Das belegt nur einen lokal gerenderten Zustand bei einem Viewport. Es belegt weder einen
Produktions-Build noch alle responsiven Zustände, Barrierefreiheit, Sicherheit, Leistung
oder Produktwert. Für den vollständigen Ablauf gehe zu
[Kapitel 16](../chapters/16-engineering-track-DE.md).

## Beleg

Bewahre nur diesen kurzen Nachweis auf:

```text
sandbox: <Pfad der Arbeitskopie>
baseline: FIRST_SAFE_CHANGE_FAILED
allowed_change: seed/README.md only
diff: <geprüfter README-Diff>
check: manual required_readme_strings 3/3 | FIRST_SAFE_CHANGE_OK
external_actions: none
unverified:
  - learner completion
  - model behavior
  - transfer
```

Der Prüfer kann nur zeigen, dass dieses feste, künstliche README zu einem
Zeitpunkt die erklärten Zeichenfolgen enthält. Ein Erfolg belegt keine
Git-Operation, keinen Browser, keine Kontoberechtigung, keine Sicherheitsprüfung
und nicht, dass du die Methode beherrschst.

## Fehler- und Grenzfall

Ändere nicht den Prüfer, die Abnahmedatei oder einen anderen Pfad, nur um einen
Erfolg zu erhalten. Wenn die vorgeschlagene Korrektur eine Installation,
Netzwerkanfrage, ein Geheimnis, ein Konto, eine Repository-Operation oder eine
zweite Datei verlangt, stoppe. Das ist eine neue Entscheidung und nicht Teil
dieses Fixtures.

## Reflexion

1. Welcher Teil der Abnahmebedingung war vor jeder Änderung beobachtbar?
2. Was belegt der endgültige Diff, das eine selbstsichere „fertig“-Meldung
   nicht belegt?
3. Welche Tatsache eines echten Projekts musst du feststellen, bevor du dieses
   Muster in Lab 001 wiederholst?

## Weiter

Die nächste registrierte Einheit ist [Lab 001: Eine sichere README-Änderung
vornehmen](../labs/lab-001-first-safe-task-DE.md). Das Lab ist als deutscher
Kandidateninhalt verfügbar, bleibt aber `draft / not_run`. Diese Route ist eine in sich geschlossene Übung; sie führt
nicht stillschweigend in eine andere Sprache und stellt keine englische Quelle
als abgeschlossene deutsche Übersetzung dar.

## Status und Grenzen

Diese Route bleibt für Lernende `candidate / not_run`. Die Repository-Tests
prüfen nur die Form des Fixtures und das erklärte Bestehen-/Fehlschlagen des
Prüfers. Sie beobachten keine Lernenden, rufen weder Codex noch ein anderes
Modell auf, vergleichen keine Produkte, belegen keinen Transfer und validieren
keinen echten Projektbefehl.
