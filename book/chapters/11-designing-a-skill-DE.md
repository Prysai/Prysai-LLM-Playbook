<!-- content_id: chapter-11-designing-a-skill | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-20 -->

# Kapitel 11: Einen Skill entwerfen, der seinen Platz verdient

**Status:** `candidate`. **Experimentstatus:** `not_run`. Dieses Kapitel beschreibt eine Entwurfsmethode; es beweist nicht, dass ein bestimmter Host einen Skill entdeckt, lädt oder ausführt.

## Das Problem dieses Kapitels

Eine beeindruckende Sitzung reicht nicht, um aus einem Prompt einen Skill zu machen. Der Prompt kann von nicht dokumentierten Fakten abhängen, unnötige Rechte verlangen, vorhandene Zugangsdaten voraussetzen oder bei einem Modewort anspringen. Ein nützlicher Skill ist ein versioniertes Methodenpaket für eine wiederkehrende Arbeitsklasse: mit begrenzten Aktionen und überprüfbarer Evidenz.

## Lernziele

Du kannst entscheiden, ob eine wiederkehrende Aufgabe überhaupt einen Skill braucht, einen Vertrag mit Auslösern und Nicht-Auslösern schreiben, Methode von Daten und Ausführung trennen und einen Kandidaten mit positiven, Grenz-, Fehler- und Transferfällen prüfen. Ein vorhandenes `SKILL.md` oder ein einzelner Lauf beweist noch keine Zuverlässigkeit über Hosts, Modelle oder Personen hinweg.

## Ein Skill in einem Satz

Verwende diese Definition im ganzen Kapitel:

> Ein Skill ist ein auffindbares, wiederverwendbares Methodenpaket, das eine begrenzte Aufgabenklasse mit begrenzten Aktionen und prüfbarer Evidenz verbindet.

Die vier Begriffe setzen die Grenze:

| Begriff | Praktische Bedeutung | Was dadurch ausgeschlossen wird |
|---|---|---|
| **Auffindbar** | Der Host kann das Paket in der vorgesehenen Arbeitsoberfläche erkennen; alternativ gibt es einen dokumentierten manuellen Weg | Eine Datei im Repository beweist nicht, dass die aktuelle Sitzung sie sieht |
| **Wiederverwendbar** | Die Methode funktioniert für verschiedene Aufgabeninstanzen; projektspezifische Fakten kommen als Eingabe | Ein Kundenbrief oder ein absoluter lokaler Pfad im Skill |
| **Begrenzt** | Aufgabe, Zuständigkeit, Daten und Nebenwirkungen haben ausdrückliche Grenzen | „Für alles rund ums Marketing“ |
| **Prüfbar** | Eine andere Person kann Eingaben, Aktionen, Ausgaben und unbelegte Aussagen prüfen | „Das Modell sagte, es habe den Prozess befolgt“ |

Ein Skill ist weder Modell, Werkzeug, Berechtigung, Connector noch Ersatz für menschliche Freigabe. Er beschreibt eine Methode; der Host und die Autorisierung der nutzenden Person bestimmen, welche Aktionen technisch möglich und erlaubt sind.

## Ein Praxisproblem: Ein Skill kann scheitern, bevor seine Methode beginnt

Der praktische Fehler ist oft eine fehlende Entscheidung: Der Host entdeckt den Skill nicht, der Trigger passt nicht, eine Eingabe fehlt, die Lizenz ist unklar oder die Aufgabe verlangt eine weitergehende Nebenwirkung als erlaubt. Deshalb prüfst du Datei, Auffindbarkeit, Auswahl, Laden, Ausführung und Ausgabe getrennt. Stoppe, bevor du einen externen Kandidaten als eigene Fähigkeit ausgibst.

> Ein Skill ist ein auffindbares, wiederverwendbares Methodenpaket, das eine abgegrenzte Aufgabenklasse auf begrenzte Aktionen und prüfbare Evidenz abbildet.

Er ist weder Modell noch Werkzeug, Berechtigung, Connector noch Ersatz für menschliche Freigabe.

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
allowed_actions: "Benannte Ziele lesen; Bericht in einen temporären Ausgabeort schreiben; benannte reversible Prüfungen ausführen"
forbidden_actions: "Geheimnisse lesen oder ausgeben; veröffentlichen, versenden, löschen, installieren oder ohne Autorisierung das Netzwerk nutzen"
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

Baue einen absichtlichen Fehler ein, der nur eine Variable verändert und ein sichtbares Signal hinterlässt. Bestimme Ziel, Ausgangslage, Wiederherstellungsschritte und eine anschließende Prüfung. „Rückgängig machen“ allein genügt nicht.

## Experiment und Grenzen

### Vorbereitung

Wähle eine lokale, nicht sensible Aufgabe, die du mindestens zweimal erledigt hast. Lege eine temporäre Eingabe, klare Abnahmekriterien und eine Nur-Lesen-Grenze fest. Verwende keine Zugangsdaten, Installationen, Netzwerkzugriffe oder fremden Skill-Inhalte mit unklarer Lizenz.

### Aufgabe

Wähle eine risikoarme Methode, die du mindestens zweimal ausgeführt hast, etwa Markdown-Links prüfen, Quellen eines Berichts kontrollieren oder eine Übergabe vorbereiten. Entwirf Vertrag, positiven Fall, einen ähnlichen Fall, der nicht auslösen soll, eine fehlende Eingabe, einen sichtbaren Fehler und eine Wiederherstellungsprüfung. Bewahre eine Tabelle auf: Was beweist jedes Artefakt, und was bleibt unbekannt?

### Belege

Sichere Vertrag, Version, nicht sensible Eingabe, erwartete und tatsächliche Ausgabe, Stoppunkt, geladene Ressourcen und die genaue Host-/Oberflächenbeobachtung. Markiere jede Stufe, die nicht beobachtet wurde, als `not_observed`; aus dem Ordner allein wird kein Ausführungsnachweis.

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

## Kleines Experiment und Grenze

1. Wähle eine Markdown-Datei, die du gefahrlos lesen darfst; gib dem Modell keine Geheimnisse oder privaten Materialien.
2. Trage Ziel, Umfang und Abnahme in den Aufgabenvertrag ein.
3. Führe einen Read-only-Check aus und bewahre Umgebung, Datum, Eingabe und Roh-Ausgabe auf.
4. Füge zeitweise einen kaputten Link ein, wiederhole den Check und prüfe, dass ein Fehlersignal statt einer Reparatur entsteht.
5. Verwirf das Beispiel oder stelle die Zeile wieder her; lies Original und Bericht erneut, um unautorisierte Änderungen auszuschließen.
6. Gib einer zweiten Person nur Vertrag und Bericht. Sie soll Ergebnis, Umfang und Unbekanntes erklären können.

Diese Beobachtung gilt nur für die dokumentierte Umgebung. Sie beweist nicht dieselbe Entdeckung, Auswahl, das Laden oder die Ausführung in anderen Hosts, Versionen oder Modellen.

## Häufige Fehler

- Eine Beschreibung als Garantie schreiben: „Veröffentlichungen automatisch absichern“ hat weder Grenze noch Abnahme.
- Skript und Skill verwechseln: Das Skript prüft etwas Bestimmtes; der Skill entscheidet über Einsatz, Stopp und Interpretation.
- Auffindbarkeit mit Zuverlässigkeit verwechseln: Metadaten, Auswahl, Laden, Aktionen und Evidenz getrennt prüfen.
- Unbekanntes verstecken: „Remote-Link nicht geprüft“ ist ein wichtiges Ergebnis des Berichts.

## Übernahmeeintrag: Eine Datei allein genügt nicht

Bevor ein Skill in eine echte Aufgabe kommt, hinterlässt du einen
Übernahmeeintrag. Er trennt „ich sehe einen Ordner“ von „ich darf mich darauf
verlassen“ und zeigt der nächsten Person, auf welcher Stufe das Review beginnt:

```text
Skill-Name und Version:
Aufgabenlücke: konkrete Entscheidung statt „die KI besser machen“
Quelle und Lizenz: Original / geprüfte Quelle; Lizenz und Prüfdatum
Host und Arbeitsoberfläche dieses Versuchs: tatsächlich verwendetes Produkt, Version und Pfad
beobachtet: Datei / Auffindbarkeit / Auswahl / Laden / Aktion / Ausgabe
nicht beobachtet: jede nicht ausgeführte, nicht zurückgelesene oder nicht unabhängig geprüfte Stufe
erlaubter Umfang: Lesen, temporäres Schreiben, Netzwerk, Installation und Veröffentlichung getrennt
nächster sicherer Check: genau eine unbeobachtete Stufe prüfen
Stopp: Eingabe, Autorität, Wiederherstellungsziel oder Beleg fehlt
```

Eine vorhandene `SKILL.md` belegt nur die Existenz der Datei, nicht ihre Auffindbarkeit
im Host oder die Ausführung der Methode. Ein einmaliger Bericht gilt nur für
die dokumentierte Aufgabe und Umgebung, nicht für alle Modelle, Ordner oder
Nutzenden. Der Beleg macht aus „ich glaube, es geht“ eine prüfbare Entscheidung.

## Externe Methoden erst nach Quellenprüfung übernehmen

Behandle Anweisungen, Skripte und Beispiele eines externen Skills als zu
prüfendes Material. Kopiere sie nicht in den Kurs und führe sie nicht mit echten
Daten aus, nur weil ein Repository beliebt ist, die Beschreibung glatt klingt
oder der Name vertraut wirkt. Prüfe mindestens:

1. ursprünglichen Link, konkrete Revision, verantwortliche Person und Prüfdatum;
2. ob die obere Lizenz benötigten Code, Skripte, Assets und verschachtelte Abhängigkeiten abdeckt;
3. was gelesen, geschrieben, installiert, verbunden oder versendet werden könnte;
4. ob die Aufgabenlücke dies wirklich braucht statt einer kleineren eigenen Methode; und
5. was mit einem nicht sensiblen temporären Fixture geprüft wurde und was nicht lief.

Fehlt eine Antwort, bleiben nur Link und Forschungsnotiz erhalten. Das Material
wird weder als eigener Skill kopiert noch als übernommene Fähigkeit bezeichnet.

## Geführte Übung: Einen wiederholbaren Check in einen Skill verwandeln

Wähle eine kleine Aufgabe, die du mindestens zweimal gemacht hast: lokale Links
in einer Markdown-Datei prüfen, Quelle und Datum in einem Bericht kontrollieren
oder eine Übergabe mit Diff und Testbefehl vorbereiten. Wähle nicht „mach es
besser“; diese Aussage enthält keine Entscheidung, die jemand anders wiederholen
kann.

Führe die Aufgabe zunächst einmal ohne Skill aus und bewahre nur Ziel,
Eingabedatei, erlaubte Aktionen, Ergebnis, Evidenz und Stoppunkt auf. Markiere
anschließend die Entscheidung, die auch bei einer anderen Aufgabe nötig wäre.
Nicht Dateinamen oder eine schöne Antwort, sondern diese Entscheidung ist ein
Kandidat für den Skill.

```text
wann: Eine benannte Markdown-Datei soll auf lokale Links geprüft werden
nicht_wann: Textüberarbeitung, Weblinks, Veröffentlichung oder Massenreparatur
benötigt: Datei, Linkbasis, Nur-Lesen-Umfang und Abnahme
liefert: bestätigte, mögliche und unbekannte Links getrennt
stoppt: Datei/Basis fehlt oder Netzwerk, Installation oder Schreiben nötig wird
```

Lass das Modell diesen Vertrag kritisieren, bevor ein `SKILL.md` entsteht:
Welche Eingabe würde es erfinden? Welche ähnliche Anfrage muss einem anderen
Verfahren weichen? Womit kann ein Review das Ergebnis prüfen? „Der Skill
automatisiert alles“ ist keine ausreichende Antwort. Eine brauchbare Regel nennt
Entscheidung, Grenze und ein prüfbares Signal.

## Reflexion

Welche Entscheidung ist im Skill wiederverwendbar, und welche gehört nur zu dieser Datei oder diesem Host? Welche Anfrage darf das Skill ausdrücklich nicht übernehmen? Welcher Nachweis würde die nächste unbeobachtete Stufe prüfen, ohne Berechtigung oder Umfang zu erweitern?

## Transferaufgabe

Übertrage den Vertrag auf eine Lern- oder Rechercheaufgabe. Ein Lern-Skill darf Übungszyklen und eine spätere Abrufaufgabe organisieren, aber weder fluency noch mastery behaupten. Ein Recherche-Skill kann Quellen und Unsicherheit ordnen, aber keinen gefundenen Link als geprüfte Tatsache ausgeben. Behalte Trigger, Nicht-Trigger, Stoppregel und Evidenzgrenze bei.

## Abnahme-Checkliste

- [ ] Der Kandidat löst eine benannte wiederkehrende Entscheidung, nicht „die KI besser machen“.
- [ ] Trigger, Nicht-Trigger, Eingaben, erlaubte Aktionen, Stopppunkt und überprüfbare Ausgabe sind benannt.
- [ ] Methode, projektspezifische Daten und deterministische Ausführung sind getrennt.
- [ ] Positive, Grenz-, Fehler- und Transferfälle haben erwartete Ergebnisse oder ehrliches `not_run`.
- [ ] Externes Material wurde nur nach Quellen-, Lizenz- und Nebenwirkungsprüfung aufgenommen.

## Quellen und Wartungsgrenze

Die Skill-Entscheidungsmethode ist projektintern. Host-Verhalten, Auffindbarkeit, Plugins, MCP, Berechtigungen und externe Kandidaten sind veränderlich. Prüfe aktuelle Behauptungen gegen die [offiziellen Faktenkarten](../evidence-library-DE.md#source-notes), das [Skill-Kandidatenregister](../evidence-library-DE.md#source-notes) und die konkrete Lizenzquelle. Keiner dieser Nachweise ersetzt einen Lauf im dokumentierten Host.

## Vier Fälle vor der Übernahme

Bereite ein minimales Set ohne Zugangsdaten und Netzwerk vor:

| Fall | Eingabe | Korrektes Ergebnis |
|---|---|---|
| Positiv | Datei und Basis sind klar | Bericht zu lokalen Links mit Lese-Evidenz |
| Grenze | Bitte nur den Text zu glätten | Nicht auslösen; es ist kein Link-Review |
| Fehler | Datei oder Basis fehlt | Frage oder `blocked`; keinen Pfad erraten |
| Transfer | Anderer lokaler Bericht mit anderer Struktur | Methode behalten, Basis und Abnahme neu entscheiden |

Bewahre Skill-Version, nicht sensible Eingabe, geladene Ressourcen, Ausgabe und
ersten Stoppunkt auf. Dass eine Datei im Verzeichnis liegt, beweist weder
Auffindbarkeit noch Laden oder Ausführung im Host. Bis diese Aufzeichnungen vorliegen,
bleiben Kapitel `candidate` und Experiment `not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="10-planning-and-slicing-DE.md" aria-label="Vorheriges Kapitel: Kapitel 10 · Planung und vertikale Schnitte">← Zurück<br><strong>Kapitel 10 · Planung und vertikale Schnitte</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="12-agent-loop-and-stop-DE.md" aria-label="Nächstes Kapitel: Kapitel 12 · Agent-Schleife, Zustand und Stoppbedingungen">Weiter →<br><strong>Kapitel 12 · Agent-Schleife, Zustand und Stoppbedingungen</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
