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

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="13-action-boundaries-DE.md">← Vorheriges<br><strong>Kapitel 13 · Aktionsgrenzen für Dateien, Terminal, Browser und GitHub</strong></a></td><td align="right"><a data-chapter-nav="next" href="15-research-track-DE.md">Nächstes →<br><strong>Kapitel 15 · Forschungspfad, von der Frage zu prüfbarem Wissen</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
