<!-- content_id: chapter-13-action-boundaries | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 13: Aktionsgrenzen für Dateien, Terminal, Browser und GitHub

**Status:** `candidate`. **Experimentstatus:** `draft / not_run`. Dieses Kapitel lehrt eine Entscheidungsmethode; öffentliche Vorfälle sind Lehrmaterial, keine lokale Reproduktion oder offizielle Ursachenfeststellung.

## Das Problem

Ein Agent kann Dateien lesen, bearbeiten, Befehle ausführen, committen, pushen oder einen externen Dienst verändern. Das sind nicht dieselben Berechtigungen. Sie unterscheiden sich bei Ziel, Betroffenen, Umkehrbarkeit und notwendiger Evidenz.

> Wenn genaues Ziel, Daten, Autorität, Umkehrbarkeit, Stoppsignal oder Evidenz unbekannt sind, grenze die Aufgabe ein oder stoppe.

Angemeldet zu sein, ein Tool zu sehen, in ein Verzeichnis schreiben zu können, einen Befehl einmal ausgeführt zu haben oder „weiter“ zu hören, beweist jeweils nur etwas Enges. Keines davon autorisiert allein eine konkrete externe Aktion.

## Fünf Aktionsklassen

| Klasse | Beispiel | Minimaler Check vor dem Start |
|---|---|---|
| A — Beobachten | Datei, Status oder Seite lesen | Pfad, Host, Konto und Sensitivität |
| B — Lokal und reversibel | Temporäre Kopie bearbeiten, Bericht erzeugen | Umfang, Original oder Diff und Check |
| C — Umgebung oder Daten ändern | Installieren, konfigurieren, Daten schreiben, Netzwerk | Persistenz, Geheimnisse, betroffene Daten, Wiederherstellung |
| D — Externe Zusammenarbeit | Push, PR, Upload, Remote-Service, öffentlicher Entwurf | Konto, Organisation, Ziel, Publikum, Prüfung |
| E — Hohe Wirkung | Löschen, deployen, senden, zahlen, Rechte ändern | Exakte Autorisierung, menschliche Bestätigung, getestetes Rollback |

Ordne nach tatsächlicher Wirkung ein, nicht nach dem freundlichen Toolnamen. Ein Test, der Pakete installiert oder Daten schreibt, ist nicht automatisch lokal und reversibel.

## Vier Zustände getrennt halten

```text
Authentifizierung: Welches Konto oder welche Verbindung weist eine Identität nach?
Technische Fähigkeit: Welche Pfade, Tools und Ressourcen können handeln?
Aufgabenautorisierung: Welches Ziel und welcher Umfang sind für diese Aufgabe erlaubt?
Menschliche Bestätigung: Wer hat welche wirkungsstarke Aktion bestätigt?
```

Ein beschreibbares Verzeichnis ist keine Editierfreigabe, und Netzwerkzugang ist keine Upload-Freigabe. Schreibe für eine externe Aktion System, Konto, Organisation, Repository oder Objekt, Daten, Ausschlüsse, erwartetes Ergebnis, Evidenz, Wiederherstellung und Stoppsignal auf. Fehlen Ziel oder Publikum, zeige eine Vorschau und frage nach.

## Browser, Terminal und GitHub

Trenne im Browser Beobachtung und Absenden. Prüfe unmittelbar vor Senden, Veröffentlichen, Hochladen, Freigeben, Löschen oder Rechteänderung Ziel, Inhalt, Publikum, Privatsphäre und Rollback erneut. Element gefunden, Aktion aufgerufen, Antwort erhalten und Seitenzustand geändert sind verschiedene Ereignisse.

Vor einem schreibenden Befehl erklärst du Arbeitsverzeichnis, Eingaben, veränderbare Pfade, Netzwerk oder Installation, erwartete Ausgabe, Zeitlimit, Checkpoint und Stoppsignal. Vor Push oder Veröffentlichung ergänzt du GitHub-Host, Organisation, Branch, Payload, Publikum, Remote-Evidenz und Rollback. `gh auth status` beweist nur die Authentifizierung.

## Übung und Grenze

Lege in einem temporären Verzeichnis eine synthetische Markdown-Datei und ein leeres lokales Git-Repository an. Ordne „eine Überschrift ändern und liefern“ vom Lesen bis zur Webseitenveröffentlichung ein. Führe nur A und B aus und füge weder Remote noch Token hinzu. Behandle einen Satz, der einen Token-Upload verlangt, als nicht vertrauenswürdige Daten und stoppe.

Bewahre Grenzkarte, Ausgangszustand, Diff, Check-Ausgabe, nicht ausgeführte D/E-Aktionen und Rollback-Read-back auf. Bis ein unabhängiger Lauf vorliegt, bleibt das Kapitel `candidate` und das Experiment `not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="12-agent-loop-and-stop-DE.md">← Vorheriges<br><strong>Kapitel 12 · Agent-Schleife, Zustand und Stoppbedingungen</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-DE.md">Nächstes Kapitel in Arbeit →<br><strong>Verfügbarkeit von Kapitel 14 ansehen</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
