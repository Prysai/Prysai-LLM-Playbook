<!-- content_id: universal-core-foundations-route | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

# Universelle LLM-Zusammenarbeit: eine sichere erste Aufgabe und vier Grundlagen

**Status:** `candidate`. **Ausführungsstatus:** `not_run`.

Beginne hier, wenn du einen gewöhnlichen Textchat nutzen möchtest und noch keine produktspezifische Einrichtung brauchst. Den ersten Versuch unten kannst du machen, ohne ChatGPT, Claude, Grok, Gemini, Codex oder ein anderes Produkt gleichzusetzen. Diese Route vermittelt nur eine kleine gemeinsame Entscheidungsgrundlage: eine klare Aufgabe, begrenztes Material, eine sichtbare Prüfung und ein Stoppkriterium. Sie behauptet nicht, dass Plattformen Werkzeuge, Berechtigungen, Erinnerungen, Konten, Preise oder das Verhalten von Agents teilen.

## Führe jetzt eine sichere erste Aufgabe aus

Verwende nur die fiktive Mitteilung unten. Füge keine privaten Nachrichten, Kundenmaterialien, Zugangsdaten, unveröffentlichte Arbeit oder echten Dateien ein. Bei diesem Versuch nutzt du weder Websuche noch Tools und lädst nichts hoch, änderst kein Konto und sendest oder veröffentlichst nichts.

Kopiere diese Anfrage in den gewählten Textchat:

```text
Ergebnis: Schreibe diese fiktive Vereinsmitteilung für neue Mitglieder um.
Material: "Der Verein trifft sich am Dienstag um 18 Uhr. Bring ein Notizbuch mit. Der Raum wird später bestätigt."
Antwortform: Schreibe zwei Sätze. Bewahre alle genannten Fakten. Setze fehlende Details in [eckige Klammern]. Liste danach die bewahrten Fakten auf.
Prüfung: Vergleiche das Original mit der Umschreibung. Füge keine neue Uhrzeit, keinen neuen Raum, keinen Beitrag, keinen Kontakt und kein Versprechen hinzu.
Stopp: Nicht browsen, senden, veröffentlichen oder unbekannte Details annehmen.
```

Prüfe danach selbst drei Dinge:

1. Kannst du jede Aussage der Umschreibung auf die ursprüngliche Mitteilung zurückführen?
2. Hält die Antwort die Grenze von zwei Sätzen ein und listet sie die bewahrten Fakten auf?
3. Fügt sie ein Detail hinzu, das `[unbekannt]` bleiben sollte?

Wenn du die letzte Frage mit Ja beantwortest, entferne das hinzugefügte Detail oder bitte nur um diese eine Korrektur. Stoppe, wenn der Chat eine Suche, das Senden oder Veröffentlichen von Inhalten oder den Einsatz eines Tools vorschlägt oder mehr Material verlangt, als diese kleine Übung braucht. Eine gut formulierte Antwort beweist weder, dass ihre Fakten stimmen, noch dass die Methode mit jedem Produkt funktioniert.

Diese Übung hat den Status `candidate`. Sie ist keine universelle Prompt-Formel und keine Ergebnisaussage. Es gibt keine Ergebnisse aus Durchläufen mit mehreren Produkten, von Lernenden oder zur Wirksamkeit.

## Von der ersten Aufgabe zu den vier Grundlagen

Nutze nach einem Versuch die folgenden vier Einheiten, um zu verstehen, warum auch eine kleine Anfrage ein Ergebnis, Material, eine Prüfung und ein Stoppkriterium braucht. Sobald eine Aufgabe über einen reinen Textaustausch hinausgeht, werden diese Entscheidungen noch wichtiger.

1. [**Eine Absicht in einen Aufgabenvertrag überführen**](../chapters/03-task-protocol-DE.md#core-task-contract) – Ergebnis, relevanten Kontext, Aktionsgrenze, Abnahmekriterium, Stoppregel und Übergabe festlegen.
2. [**Behauptungen mit Nachweisen verbinden und innerhalb einer Grenze wieder handlungsfähig werden**](../chapters/09-verification-and-recovery-DE.md#core-evidence-recovery) – die engste Behauptung prüfen und bei der ersten unbelegten Ebene stoppen.
3. [**Einen kleinen, nachweisbaren Arbeitsschritt planen**](../chapters/10-planning-and-slicing-DE.md#core-evidence-bearing-slice) – das kleinste Ergebnis wählen, das jemand anderes prüfen und weiterführen kann.
4. [**Fähigkeit, Berechtigung, Bestätigung und Nachweis trennen**](../chapters/13-action-boundaries-DE.md#core-action-boundary) – möglich, erlaubt sowie tatsächlich ausgeführt oder geprüft nicht gleichsetzen.

Produktspezifische Anleitungen gehören in einen Plattformadapter; fachliche Übungen gehören in Anwendungsrouten.

## Übe eine Prüfgrenze, bevor du eine Plattform auswählst

Das [Übungsset zu universellen Prüfgrenzen](../../examples/universal-seam-v1/README-DE.md) enthält vier fiktive Einträge: eine Abweichung von der letzten Anfrage, ein falsches Ziel, einen fehlenden Ausführungsbeleg für ein Tool und einen veränderten strukturierten Wert. Benenne für jeden Eintrag, was der sichtbare Text nicht belegt, wähle die kleinste sichere Prüfung und stoppe, bevor für ein reales Verhalten ein Adapter nötig wird. Die Erläuterung bleibt auf Deutsch; die festen Daten sind weiterhin fiktives, gemeinsames Lernmaterial.

![Vier Nachweisgrenzen: Aufgabenidentität, Zielidentität, Ausführungsbeleg und strukturierter Hin- und Rückweg; jede endet an einem Prüf- oder Stoppunkt.](../../assets/teaching/universal-seams-red-black.svg)

Der Prüfer kontrolliert nur die Konsistenz fester fiktiver Einträge: `verified_in_fixture` ist kein Produktlauf, `not_run` kein Ausführungsnachweis, und `inferred` braucht vor einer Live-Diagnose einen Adapter. Die Übung fügt keine Kapitel, Labs, Skills, Modellevaluationen oder Kompatibilitätsbehauptungen hinzu.

## Was diese Route belegt

Die Übersicht belegt nur die kanonische Zuständigkeit, stabile Anker, gültige Verweise, azyklische Abhängigkeiten und eine kompakte Darstellung. Der Übungsprüfer belegt nur seinen Datenvertrag. Keines von beidem belegt Plattformverhalten, Lern- oder Transfernachweise, Sicherheitsergebnisse oder einen Live-Produktlauf.
