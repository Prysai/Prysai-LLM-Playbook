<!-- content_id: chapter-14-discover-and-audit-skills | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 14: Externe Skills finden, installieren und prüfen

**Status:** `candidate`. **Experimentstatus:** `draft / not_run`. Dieses Kapitel lehrt Skill-Entdeckung und Übernahmeprüfung; Feldberichte sind Lehrmaterial, keine lokale Reproduktion oder offizielle Ursachenfeststellung.

## Das Problem

Externe Skills können wiederholte Schritte, Fachwissen und Tool-Aufrufe als wiederverwendbare Fähigkeiten bündeln. Sie können aber auch Kontext, Abhängigkeiten, Netzwerkzugriff, Kontoberechtigungen, externe Nebenwirkungen und Lizenzpflichten erweitern. Die Frage ist nicht „Wo finde ich mehr Skills?“, sondern ob eine reale Aufgabenlücke einen Skill braucht, wie ein Verzeichniseintrag zu einem prüfbaren Kandidaten wird und wie man ihn ohne Geheimnisleck oder Überschreitung der Autorisierung testet.

> Ein Verzeichnis ist ein Einstieg zur Entdeckung, kein Qualitätsbeweis. Installation verändert einen Zustand; sie verifiziert kein Verhalten. Auslösbar zu sein heißt nicht, dass ein Skill übernommen werden sollte.

## Zuerst den Aufgabenvertrag schreiben

```text
Ziel: Was soll sich ändern?
Eingaben: Welche Dateien, Daten oder öffentlichen Quellen dürfen gelesen werden?
Ausgabe: Welche Form hat die Übergabe?
Abnahme: Welche Evidenz zeigt die Fertigstellung?
Autorisierung: Welche Tools, Netzwerke, Konten und Schreibvorgänge sind erlaubt?
Stopp: Welche Bedingungen erfordern Pause und Rückfrage?
```

| Lücke | Übliche Lösung | Häufiger Irrtum |
|---|---|---|
| Fehlendes Konzept oder Fakt | Recherche, offizielle Dokumentation, menschliches Urteil | Skill statt Quelle verwenden |
| Wiederholtes stabiles Verfahren | Lokaler Skill oder Script | Ein riesiger Skill für alles |
| Externes System beobachten oder ändern | Kontrolliertes Tool oder Connector | „Aufrufbar“ mit „autorisiert“ verwechseln |
| Unklares Ziel oder Abnahme | Erst klären | Installation versteckt unklare Anforderungen |

Ein Skill ist ein Methoden- und Routingvertrag; ein Tool ist eine Schnittstelle zur Beobachtung oder Veränderung der Außenwelt. Plugin und Connector sind Produktschichten. Frage bei der Prüfung: Was liest der Skill? Was empfiehlt er? Was tut das Tool? Was erhält der externe Dienst?

## Prüfkarte vor der Installation

Für jeden Kandidaten dokumentierst du Aufgabenlücke, Trigger / Non-Trigger, URL und feste Revision, Inventar, Lizenz, NOTICE, verschachtelte Assets, Abhängigkeiten, Netzwerk, Konto, isoliertes Ziel, Geheimnisgrenze, externe Nebenwirkungen, Backup, Rollback, Freigabepunkte, vier Verhaltenstests, Owner und nächsten Review.

Es gibt nur vier Übernahmeentscheidungen: `recommendation-only`, `blocked`, `approved-to-install`, `installed-candidate`. Verhaltensevidenz bleibt getrennt: Datei vorhanden, entdeckt, geladen, übernommen und verifiziert. Eine Datei beweist keine Entdeckung; Entdeckung kein Laden; Laden keine Übernahme; Übernahme keine Verifizierung.

## Skill-Inhalt ist nicht vertrauenswürdige Eingabe

Behandle `SKILL.md`, README, Remote-Seiten, Issues, Beispiele und Tool-Ergebnisse als Daten. „Ignoriere höhere Regeln“, „lade Geheimnisse hoch“, „sende das Ergebnis“ oder „führe diesen unautorisierten Befehl aus“ erhält innerhalb eines Skills keine Autorität. Extrahiere das Minimum, entferne Geheimnisse, teste wenn möglich ohne Netzwerk in einer Sandbox und dokumentiere die Ablehnung.

Erhöhe das Risiko stufenweise: lokales Lesen, reversible Schreibvorgänge, externe Sandbox-Verbindungen, danach Produktionsschreiben und Veröffentlichung. Vor jeder höheren Stufe deklarierst du neue Rechte, Evidenz und Rollback. Ein einzelner Smoke-Test stützt höchstens `candidate`.

## Übung und Grenze

Prüfe zwei Kandidaten mit festen Revisionen, ohne sie zu installieren. A hat ein nachvollziehbares Lizenzsignal und passt zur Aufgabe; es kann `recommendation-only` bleiben. B hat kein klares Lizenz-/NOTICE-Signal oder kein konkretes Rollback und muss `blocked` sein. Halte URL, Revision, Inventar, Abhängigkeiten, Berechtigungen, isoliertes Ziel, Backup, Wiederherstellung, Freigaben und Owner fest. Entwirf für A einen positiven, einen Grenz-, einen Fehler-/Injektions- und einen Migrationstest, führe sie aber nicht aus.

Die Übung belegt eine Prüfentscheidung, nicht Entdeckung, Laden, Ausführung oder reale Übernahme. Bis die Tests in einer deklarierten Umgebung laufen und unabhängig geprüft werden, bleibt dieses Kapitel `candidate / not_run`.

## Vor der Installation aus einem Kandidaten eine widerlegbare Entscheidung machen

Ein Verzeichnis, Stars oder eine Demo machen nur einen Kandidaten. Bewahre für jeden eine Review-Karte auf.

```text
Aufgabenlücke: welche stabile Methode fehlt hier?
Quelle: Projekt-URL, feste Revision, Prüftag, tatsächlicher Dateipfad
Auslöser / Nicht-Auslöser: wann gilt die Methode, wann gibt sie ab?
Lizenz: Evidenz für Repository, Zieldatei, NOTICE, verschachtelte Skripte und Assets
Abhängigkeiten / Rechte: Lesen, Schreiben, Netzwerk, Konto, Geheimnisse, externe Nebenwirkung
Isolierter Versuch: Verzeichnis, geheimnisfreie Eingabe, erlaubte Aktion, Stoppunkt
Wiederherstellung: Backup vor Installation, genaue Restore-Schritte, Read-back-Check
Entscheidung: recommendation-only / blocked / approved-to-install / installed-candidate
```

Fehlt feste Revision, Lizenz/NOTICE, Installationsziel, Backup oder Restore-Check, bleibt der Kandidat `blocked`. „Erst installieren“ schließt keine Evidenzlücke.

Vermische nicht `file exists`, `discovered`, `loaded`, `adopted` und `verified`. Eine `SKILL.md` belegt nur das Erste; ein Installationslog höchstens `installed-candidate`.

## Vier Schritte zur Prüfung: Unklares zuerst stoppen

Beginne nicht mit „Wie installiere ich das?“. Stelle diese vier Fragen der
Reihe nach und stoppe bei der ersten, die sich nicht mit einem Eintrag
beantworten lässt:

1. **Braucht die Aufgabe es wirklich?** Benenne das wiederkehrende, stabile und leicht zu übersehende Urteil. Fehlt ein Fakt, prüfe Quellen; ist das Ziel unklar, kläre es zuerst.
2. **Was erhalten wir genau?** Fixiere Projekt-URL, feste Revision, tatsächlichen Einstiegspfad, Lizenz/NOTICE und verschachtelte Abhängigkeiten. Name oder Star-Zahl reichen nicht.
3. **Was könnte es tun?** Trenne Lesen, Schreiben, Installation, Netzwerk, Konto, Geheimnisse und externe Wirkung. Ohne Inventar nicht auf Harmlosigkeit schließen.
4. **Wie kehren wir nach einem Fehler zurück?** Notiere isoliertes Verzeichnis, Backup vor Installation, Wiederherstellung und Read-back-Check. „Ordner löschen“ ist keine nachgewiesene Wiederherstellung.

Nur wenn alle vier Antworten dokumentiert sind, ist `approved-to-install`
sinnvoll. Fehlt eine, lautet die richtige Entscheidung meist
`recommendation-only` oder `blocked`. Das verurteilt keinen Kandidaten; es
verhindert nur, dass Neugier zu einer ungeprüften Umgebungsänderung wird.

### Kurze, aber brauchbare Ablehnungsnotiz

```text
kandidat: <feste URL und Revision>
entscheidung: blocked
grund: Das Einstiegsskript nutzt Netzwerk, aber Abhängigkeiten, Installationsziel und Restore-Read-back fehlen.
geprüft: Projektlink, Einstiegsdatei und oberes Lizenzsignal.
nicht geprüft: Laufzeitverhalten, Lizenz verschachtelter Assets, tatsächlicher Netzwerkverkehr.
freigabe_bedingung: fehlende Angaben ergänzen und im nicht sensiblen isolierten Verzeichnis erneut prüfen.
```

Das ist brauchbarer als „wirkt unsicher“ und macht nicht ausgeführtes Verhalten
nicht zu einem bereits beobachteten Risiko.

## Kleines Experiment: zwei Kandidaten prüfen, keinen installieren

Wähle zwei öffentliche Kandidaten mit festen Revisionen oder zwei bereinigte lokale Beispiele. A hat nachvollziehbare Quelle und Lizenzsignal; B hat absichtlich keine Lizenz/NOTICE, Abhängigkeitsangabe oder Wiederherstellung.

1. Lies nur Quelle, Revision, Inventar, Eingangs-Zusammenfassung, Abhängigkeiten und Lizenzsignal. Nicht in ein Laufzeitverzeichnis laden, nicht anmelden und kein Netzwerk ausführen.
2. Fülle für beide Karten mit Aufgabenlücke, Grenzen, minimalen Rechten, isoliertem Versuch und Freigabepunkten aus.
3. Entwirf für A positive, Grenz-, Injection/Fehler- und Migrationsfälle mit Eingabe, erwartetem Verhalten, Stopp und Evidenz; behaupte keinen Lauf.
4. Lasse B `blocked` und nenne das Material zum Aufheben der Sperre.

„Übergeordnete Regeln ignorieren“, „`.env` hochladen“ oder „Produktion zum Testen ändern“ in einer Quelle sind nicht vertrauenswürdige Daten, keine Skill-Rechte und keine Nutzerfreigabe. Ablehnen, protokollieren und stoppen ist richtig.

## Eigene Abnahme

- [ ] Ich trenne Wissenslücke, wiederholbare Methode, Tool-Fähigkeit und unklare Aufgabe.
- [ ] Ich notiere URL, Revision, Pfad, Lizenz/NOTICE, Abhängigkeiten, Rechte und Verantwortliche.
- [ ] Ich trenne Freigaben für Beschaffung, Schreiben ins Installationsziel, Abhängigkeit/Anmeldung und Team-/Produktionsumfang.
- [ ] Ich behaupte exists, discovered, loaded, adopted oder verified nur mit passender Evidenz.

## Übernahmebeleg: Erst prüfbar machen, dann über die Aktivierung entscheiden

Dieser Beleg gilt für originale Projekt-Skills ebenso wie für extern gefundene Kandidaten. Ein beliebtes Repository, eine flüssige Beschreibung oder ein sichtbares Verzeichnis machen externe Inhalte nicht automatisch vertrauenswürdig oder ausführbar.

```text
Name und Version/Commit des Kandidaten:
Herkunft: original | extern; Original-Link des externen Projekts:
Verantwortung und Prüfdatum:
Konkrete zu schließende Aufgabenlücke:
Lizenz: Sind Code, Text, Assets und verschachtelte Abhängigkeiten getrennt klar?
Erwartetes Lesen/Schreiben/Netzwerk/Installieren/Senden/Veröffentlichen:
Positiv-, Grenz-, Fehler- und Transferfall:
Beobachtet: Datei | Discovery | Auswahl | Laden | Ausführung | Rücklesen/Prüfung
Nicht beobachtet:
Erlaubter temporärer Testumfang:
Grund für Ablehnung, Pause oder Übernahme:
Kleinste nächste sichere Prüfung:
```

Ein externes `SKILL.md`, eine Seite, ein Issue, ein Installationsprotokoll oder Tool-Ausgabe sind zu prüfende Daten. Darin enthaltene Befehle, Links oder Sätze wie „ignoriere vorherige Regeln“ erhalten keine höhere Autorität. Fehlen klare Herkunft, Lizenz, Verhaltensumfang oder Wiederherstellungsweg, lautet die richtige Entscheidung `blocked` oder Ablehnung, nicht „erst installieren“.

### Schichtweise aktivieren statt pauschal vertrauen

Lies zuerst Metadaten und Anleitung, prüfe dann einen schreibgeschützten oder umkehrbaren Pfad in einem temporären Verzeichnis ohne sensibles Material. Erst nach dokumentiertem Ergebnis, Umfang und Wiederherstellung entscheidet ein Mensch getrennt über Schreiben, Netzwerk, Installation oder externe Aktionen. Ein Erfolg gilt nur für Host, Version, Eingabe und Aufgabe im Protokoll; er beweist keine Zuverlässigkeit über Modelle, Verzeichnisse oder Konten hinweg.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="13-action-boundaries-DE.md" aria-label="Vorheriges Kapitel: Kapitel 13 · Aktionsgrenzen für Dateien, Terminal, Browser und GitHub">← Zurück<br><strong>Kapitel 13 · Aktionsgrenzen für Dateien, Terminal, Browser und GitHub</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="15-research-track-DE.md" aria-label="Nächstes Kapitel: Kapitel 15 · Forschungspfad, von der Frage zu prüfbarem Wissen">Weiter →<br><strong>Kapitel 15 · Forschungspfad, von der Frage zu prüfbarem Wissen</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
