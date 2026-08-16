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

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="10-planning-and-slicing-DE.md">← Vorheriges<br><strong>Kapitel 10 · Planung und vertikale Schnitte</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-DE.md">Nächstes Kapitel in Arbeit →<br><strong>Verfügbarkeit von Kapitel 12 ansehen</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
