<!-- content_id: chapter-11-designing-a-skill | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 11: Einen Skill entwerfen, der seinen Platz verdient

**Status:** `candidate`. **Experimentstatus:** `not_run`. Dieses Kapitel beschreibt eine Entwurfsmethode; es beweist nicht, dass ein bestimmter Host einen Skill findet, lädt oder ausführt.

## Das Problem

Eine beeindruckende Sitzung reicht nicht, um aus einem Prompt einen Skill zu machen. Der Prompt kann von nicht dokumentierten Fakten abhängen, unnötige Rechte verlangen, eine Zugangsdaten voraussetzen oder bei einem Modewort anspringen. Ein nützlicher Skill ist ein versioniertes Methodenpaket für eine wiederkehrende Arbeitsklasse: mit begrenzten Aktionen und überprüfbarer Evidenz.

> Ein Skill ist ein auffindbares, wiederverwendbares Methodenpaket, das eine abgegrenzte Aufgabenklasse auf begrenzte Aktionen und prüfbare Evidenz abbildet.

Er ist weder Modell noch Werkzeug, Berechtigung, Connector oder Ersatz für menschliche Freigabe.

## Erst den Vertrag schreiben, dann den Text

```yaml
skill_id: pruefung-von-evidenzgrenzen
version: "0.1.0"
owner: person-oder-team
review_date: "JJJJ-MM-TT"
purpose: "Ein bereitgestelltes Artefakt gegen eine benannte Evidenzgrenze prüfen."
trigger:
  - "Eine Prüfung der Evidenzgrenze wird verlangt."
  - "Artefakt, Ziel und Abnahmekriterien liegen vor."
non_trigger:
  - "Eine uneingeschränkte Neufassung wird verlangt."
  - "Für wesentliche Aussagen fehlen Quellen."
  - "Eine andere ausdrücklich benannte Methode besitzt die Aufgabe."
required_inputs:
  - genauer Pfad oder eingefügtes Artefakt
  - Ziel, Ausschlüsse und Abnahme
  - Herkunft wesentlicher Aussagen
allowed_actions: "Benannte Ziele lesen; Bericht in einen wegwerfbaren Ausgabeort schreiben; benannte reversible Checks ausführen"
forbidden_actions: "Geheimnisse, Veröffentlichung, Versand, Löschen, Installation oder Netzwerk ohne Autorisierung"
output: "Bericht: Behauptung → Evidenz → nicht abgedeckter Umfang"
stop_when: "Eingabe, Autorität, Quelle oder wiederherstellbares Ziel fehlt"
```

Ein Auslöser muss Aufgabenabsicht, nötige Eingaben, Zuständigkeit der Methode und akzeptables Risiko enthalten. Eine bloße Wortübereinstimmung reicht nicht. Nicht-Auslöser verhindern, dass ein Skill eine benachbarte Aufgabe an sich zieht.

## Methode, Daten und Ausführung trennen

- `SKILL.md` enthält Zweck, Grenzen, Schritte, Stop-Regeln und Evidenz, die immer gelten.
- `references/` enthält nur Material, das in einem bestimmten Zweig geladen wird.
- `scripts/` enthalten nur deterministische Checks mit deklarierten Abhängigkeiten, Netzwerkverhalten, Schreibpfaden und Exit-Verhalten.
- `assets/` enthalten nur deklarierte statische Ressourcen.

Kritische Sicherheitsregeln gehören nicht in eine optionale Referenz. Eine vorhandene Datei beweist auch keine Auffindbarkeit; Auffindbarkeit beweist kein Laden; Laden beweist keine Übernahme; Übernahme beweist kein Verhalten.

## Vier Fälle bewerten

| Fall | Muss passieren | Darf nicht passieren |
|---|---|---|
| Positiv | Die Methode löst aus und hinterlässt ein prüfbares Artefakt | Erfolg ohne Evidenz behaupten |
| Grenze | Sie übergibt an eine andere Methode oder stellt eine präzise Frage | Wegen eines ähnlichen Begriffs auslösen |
| Fehler | Sie stoppt vor einem unsicheren Schreibvorgang und bewahrt die erste fehlende Voraussetzung | Eingabe, Berechtigung oder Ergebnis erfinden |
| Transfer | Sie ändert Fachfakten und prüft Annahmen erneut | Namen mechanisch ersetzen |

Baue einen absichtlichen Fehler ein, der nur eine Variable verändert und ein sichtbares Signal hinterlässt. Bestimme Ziel, Ausgangslage, Wiederherstellungsschritte und eine anschließende Kontrolle: „Rückgängig machen“ allein genügt nicht.

## Übung und Grenze

Wähle eine risikoarme Methode, die du mindestens zweimal ausgeführt hast, etwa Markdown-Links prüfen, Quellen eines Berichts kontrollieren oder eine Übergabe vorbereiten. Entwirf Vertrag, positiven Fall, einen ähnlichen Fall, der nicht auslösen soll, eine fehlende Eingabe, einen sichtbaren Fehler und eine Wiederherstellungsprüfung. Bewahre eine Tabelle auf: Was beweist jedes Artefakt, und was bleibt unbekannt?

Solange diese Fälle nicht in einer deklarierten Umgebung dokumentiert und unabhängig geprüft sind, bleibt der Skill `candidate`. Behaupte weder Auffindbarkeit, Laden, Ausführung noch geschäftliche Wirkung.

## Ein beobachtbarer Entwurfsablauf

Wir verwenden eine risikoarme Aufgabe: lokale Markdown-Links prüfen. Dafür sind weder Netzwerk, Konto noch Daten realer Nutzer nötig. Das beweist allerdings nicht, dass ein bestimmter Host diesen Skill automatisch findet.

### Die Aufgabe auf einen prüfbaren Umfang begrenzen

„Prüfe die Dokumentationsqualität“ hat keine Grenze. Schreibe vor der Methode den Vertrag für diesen einen Auftrag auf:

```text
Ziel: defekte relative Markdown-Links in docs/quickstart.md finden.
Erlaubt: diese Datei lesen; Kandidaten in einen temporären Bericht schreiben;
einen lokalen Read-only-Check ausführen.
Nicht erlaubt: Text ändern, Netzwerk, Abhängigkeiten installieren, löschen, veröffentlichen.
Abnahme: Der Bericht zeigt Linktext, Ziel, Prüfergebnis und Grund für unbekannte Fälle.
Stopp: Datei fehlt, Auflösungsbasis ist unklar oder eine nicht autorisierte Aktion wäre nötig.
```

Dieser Vertrag gehört nur zu diesem Auftrag. Der Skill enthält nur die wiederverwendbare Methode. Werden beide vermischt, gelangen alte Pfade, Berechtigungen und Schlüsse in die nächste Aufgabe.

### Auslöser und Übergaberegeln entwerfen

Ein Auslöser ist kein Werbesatz. Er muss erkennen lassen, ob die Methode diese Aufgabe besitzen darf.

| Punkt | Beispiel für Link-Prüfung |
|---|---|
| Gilt | Ein benanntes Markdown-Dokument mit Ziel und Abnahme soll auf lokale Links geprüft werden |
| Gilt nicht | Neufassung, Remote-Site-Check, Reparatur des ganzen Repos oder fehlende Zieldatei |
| Zuerst fragen | Werden Links relativ zur Datei, zum Repository-Root oder zur Site-Ausgabe aufgelöst? |
| Stoppen | Netzwerk, Zugangsdaten, geschütztes Schreiben oder Veröffentlichungsänderung wäre ohne explizite Freigabe nötig |

Die Wörter „Link“ und „Prüfung“ reichen nicht. Absicht, Eingaben, Zuständigkeit der Methode und akzeptables Risiko bilden zusammen die Entscheidung.

### Handlung und Evidenz koppeln

| Phase | Erlaubte Handlung | Zurückbleibende Evidenz | Noch nicht bewiesen |
|---|---|---|---|
| Eingabe | Datei und Vertrag lesen | Pfad, Ausgangsversion, fehlende Eingaben | Dass ein Link defekt ist |
| Suche | Relative Links extrahieren | Kandidatentabelle und Auflösungsregel | Dass das Ziel existiert |
| Check | Pfade nur lesend auflösen | vorhanden/fehlend/unbekannt | Dass eine Remote-URL funktioniert |
| Übergabe | Wegwerfbaren Bericht schreiben | Bericht, Befehl, Exit-Status | Dass das Problem behoben wurde |
| Review | Risiko- und unbekannte Fälle lesen | Entscheidung und nicht abgedeckter Umfang | Dass es für jedes Repo funktioniert |

Ein Exit-Status von null zeigt nur, dass der Check nach seiner eigenen Definition endete. Er deckt weder ignorierte Formate noch Build-Umschreibungen oder Remote-Ziele automatisch ab.

## Minimal heißt nicht: wichtige Urteile weglassen

Die Eingangsdatei `SKILL.md` darf kurz sein; Grenzen, die immer gelten, müssen bleiben.

```markdown
---
name: local-link-review
description: Prüft lokale Markdown-Links in einer benannten Datei, wenn Ziel,
Abnahme und Read-only-Umfang vorliegen. Nicht für Neufassungen, Netzwerk oder Massenreparaturen.
---

1. Ziel, Link-Basis, erlaubten Umfang und Abnahme bestätigen.
2. Bei einer fehlenden Angabe stoppen und fragen.
3. Nur lokale relative Links extrahieren; Originaltext bewahren.
4. Den deklarierten Read-only-Check ausführen sowie Version und Exit-Status notieren.
5. Kandidaten, bestätigte und unbekannte Ergebnisse trennen.
6. Ohne neue Freigabe weder ändern, veröffentlichen, installieren noch Netzwerk nutzen.
```

Details können in `references/`, ein deterministischer Prüfer in `scripts/` liegen. „Ohne Ziel stoppen“ und „kein Netzwerk, kein Schreiben“ dürfen jedoch nicht in einer optionalen Datei versteckt werden.

## Einen absichtlichen Fehler nutzen, um das Stoppen zu prüfen

Erstelle ein temporäres Beispiel und ändere nur eine Variable: Ein Link zeigt auf einen nicht vorhandenen Pfad. Erwartet wird ein sichtbares Signal, keine vage Behauptung von Intelligenz.

```text
BROKEN: [Installationshinweis] (guides/install.md)
resolved: docs/guides/install.md
check: path does not exist
scope: local relative path only; remote availability not checked
```

Danach folgt ein Grenzfall mit einem `https://`-Link. Der Skill soll ihn ohne Netzverbindung als außerhalb des Umfangs oder unbekannt ausweisen. Fehlt die Link-Basis, ist Fragen oder Stoppen richtig, nicht das Erraten der Struktur.

## Kleines Experiment und Rückblick

1. Wähle eine Markdown-Datei, die du gefahrlos lesen darfst; gib dem Modell keine Geheimnisse oder privaten Materialien.
2. Trage Ziel, Umfang und Abnahme in den Aufgabenvertrag ein.
3. Führe einen Read-only-Check aus und bewahre Umgebung, Datum, Eingabe und Roh-Ausgabe auf.
4. Füge zeitweise einen kaputten Link ein, wiederhole den Check und prüfe, dass ein Fehlersignal statt einer Reparatur entsteht.
5. Verwirf das Beispiel oder stelle die Zeile wieder her; lies Original und Bericht erneut, um unautorisierte Änderungen auszuschließen.
6. Gib einer zweiten Person nur Vertrag und Bericht. Sie soll Ergebnis, Umfang und Unbekanntes erklären können.

Diese Beobachtung gilt nur für die dokumentierte Umgebung. Sie beweist nicht dieselbe Entdeckung, Auswahl, Ladung oder Ausführung in anderen Hosts, Versionen oder Modellen.

## Häufige Fehler

- Eine Beschreibung als Garantie schreiben: „Veröffentlichungen automatisch absichern“ hat weder Grenze noch Abnahme.
- Skript und Skill verwechseln: Das Skript prüft etwas Bestimmtes; der Skill entscheidet über Einsatz, Stopp und Interpretation.
- Auffindbarkeit mit Zuverlässigkeit verwechseln: Metadaten, Auswahl, Laden, Aktionen und Evidenz getrennt prüfen.
- Unbekanntes verstecken: „Remote-Link nicht geprüft“ ist ein wichtiges Ergebnis des Berichts.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="10-planning-and-slicing-DE.md">← Vorheriges<br><strong>Kapitel 10 · Planung und vertikale Schnitte</strong></a></td><td align="right"><a data-chapter-nav="next" href="12-agent-loop-and-stop-DE.md">Nächstes →<br><strong>Kapitel 12 · Agent-Schleife, Zustand und Stoppbedingungen</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
