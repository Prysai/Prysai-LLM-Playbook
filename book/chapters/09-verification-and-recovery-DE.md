<!-- content_id: chapter-09-verification-and-recovery | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 9: Überprüfung, Zweifel und Wiederherstellung

**Status:** `candidate`. **Experiment:** `not_run`. Dieses Kapitel ordnet Aussagen über den Abschluss ihren Belegen zu und zeigt, wie ein unsicherer Ablauf wieder unter Kontrolle kommt. Es ist weder eine lokale Reproduktion noch eine offizielle Diagnose oder ein Nachweis für den Produktionseinsatz.

## Das Problem dieses Kapitels

Ein Agent kann eine überzeugende Abschlusszusammenfassung für ein falsches, zu weitgehendes, nie ausgeführtes oder in der falschen Umgebung geprüftes Ergebnis schreiben. Die richtige Reaktion ist weder blindes Vertrauen noch dauerndes Misstrauen: Zerlege die Zusammenfassung in einzelne Behauptungen und ordne jeder den kleinsten Beleg zu, der sie in dem genannten Umfang stützt.

| Behauptung | Mindestbeleg | Beweist nicht |
|---|---|---|
| Eine Datei änderte sich | Diff, Pfad oder Hash | Korrektheit oder Vollständigkeit |
| Ein Check bestand | Befehl, Verzeichnis, Exit-Code und relevante Ausgabe | Gleiches Verhalten in anderem Umfeld |
| Die Anwendung läuft | Echter Start und Beobachtung eines kritischen Pfads | Nutzerwert, Sicherheit oder Produktionsreife |
| Die Seite sieht korrekt aus | Render-Prüfung mit dokumentiertem Viewport | Vollständige Barrierefreiheit, Backend oder Conversion |
| Eine Tatsache ist offiziell | Autoritative URL, Datum, Umfang und Verantwortlichkeit | Zugriff dieses Kontos oder lokale Konfiguration |

Ein einzelner schwacher Beleg ersetzt die übrigen nicht. Ein Build beweist keine Laufzeit, ein Screenshot keine Nachfrage und eine offizielle URL keinen Zugriff.

## Lernziele

Du kannst eine Abschlusszusammenfassung in einzeln prüfbare Behauptungen zerlegen, für jede den passenden Mindestbeleg benennen, den ersten unbelegten Übergang finden und einen sicheren nächsten Check oder eine ehrliche Übergabe schreiben. Die Übung beweist weder Produktzuverlässigkeit noch Lernwirkung; dafür bräuchte es einen eigenen Lauf und ein eigenes Review.

## Praxisfälle: Eine überzeugende Zusammenfassung ohne passenden Beleg

Eine Antwort kann „fertig“, „alle Tests bestanden“ oder „Lesende verstehen es“ sagen, ohne Diff, Testausgabe oder Beobachtung von Lesenden zu liefern. Das ist keine Aussage über ein bestimmtes Modell. Es ist ein Anlass, nur die erste fehlende Stufe zwischen Anfrage, Autorisierung, Tool, Aktion, Ergebnis und Review zu prüfen.

## Den ersten Bruch finden

```text
Anfrage → Autorisierung → sichtbares Tool → Aktion → Ergebnis → Review
```

Notiere den ersten Pfeil, den du nicht beobachten kannst. Eine verfügbare Sitzung beweist nicht, dass ein Tool registriert ist; die wiedergewonnene Kontrolle über einen Lauf beweist nicht das gewünschte Ergebnis.

| Status | Bedeutung |
|---|---|
| `verified` | Der angegebene Beleg trägt die Behauptung in diesem Umfang |
| `unverified` | Erforderlicher Beleg fehlt; das heißt nicht falsch |
| `unknown` | Beobachtung reicht für keine Einordnung |
| `partial` | Ein konkreter Teil ist gestützt, ein anderer nicht |
| `not_observed` | Das Projekt speicherte keine Beobachtung |
| `error` | Für die erklärte Operation liegt ein Fehlbeleg vor |

## Mit einem sicheren Check wiederherstellen

Bei Kapazitätsfehlern, einem endlosen `Working`, einem fehlenden Tool oder einer vorgeschlagenen Neuinstallation bewahrst du zuerst Diff, Ausgabe, Log und den letzten akzeptierten Checkpoint auf. Wähle dann genau eine begrenzte Aktion: Ziel prüfen, denselben Befehl einmal begrenzt wiederholen, fehlende Eingaben anfordern oder stoppen. Ein Check ist keine Erlaubnis für Installation, Neustart, Deployment oder Schreiben außerhalb des Auftrags.

```text
claim: Alle Tests bestanden
evidence: Testausgabe fehlt
status: unverified
next_check: Nur den freigegebenen Befehl im festen Verzeichnis und Revision ausführen
```

### Ein grüner Status ist noch kein Ergebnis

Ein grüner Check bedeutet nur, dass **ein** Check zu einem bestimmten Zeitpunkt
ohne Fehler endete. Bevor du „funktioniert“ schreibst, trenne deshalb diese Fragen:

| Beobachtung | Noch zu prüfen | Kleiner, sicherer Check |
|---|---|---|
| Der Befehl endete mit Exit-Code 0 | Waren Befehl, Ordner und Revision die erwarteten? | Befehl, Ordner, Revision und relevante Ausgabe sichern |
| Es gibt einen Diff | Hält die Änderung Auftrag und Grenzen ein? | Den Diff gegen Ziel und vereinbarte Grenzen lesen |
| Eine Seite öffnet sich | Reagiert der wichtige Pfad auf die vorgesehene Eingabe? | Einen Pfad mit harmloser Eingabe und notiertem Viewport prüfen |
| Das Modell sagt „erledigt“ | Welche unabhängige Beobachtung stützt jede Behauptung? | Pfade, Ausgabe, Diff oder eine ausdrückliche Einschränkung anfordern |

Aus einem bestandenen Check wird keine Zusage über Sicherheit, Nutzwert oder
Produktionsreife. Fehlt die Beobachtung, bleibt die Zeile `unverified`; wir füllen sie
nicht mit Zuversicht auf.

### Wiederherstellungsnotiz: sicher an andere übergeben

Wenn du einen Ablauf stoppst oder wieder unter Kontrolle bringst, hinterlasse
eine kurze Notiz mit den Belegen. So beginnt niemand blind von vorn, und die nächste Person
weiß, was sie ohne zusätzliche Berechtigungen prüfen darf:

```text
ziel und grenze: Was sollte geschehen, was war nicht erlaubt?
letzter bestätigter punkt: vorhandene Beobachtung, Pfad oder Ausgabe
erste unbelegte stelle: erste Behauptung ohne Beleg
zielzustand: keine Änderung / Teiländerung / unbekannt
gesicherte belege: Diff, Log, Ausgabe, Screenshot oder konkreter Link
nächster sicherer check: eine schreibgeschützte oder reversible Aktion
noch nicht: veröffentlichen, installieren, deployen oder Umfang erweitern
```

Die Notiz repariert kein Ergebnis und beweist keine Ursache. Sie hält nur den
genauen Punkt fest, an dem sicher weitergearbeitet werden kann, ohne aus einem
„vielleicht“ ein „erledigt“ zu machen.

## Experiment und Grenzen

### Vorbereitung

Lege in einem lokalen, wegwerfbaren Ordner eine bereinigte Zusammenfassung, einen Diff, eine Testausgabe, Quellenlinks und genau einen absichtlich fehlenden Beleg ab. Nutze keine Geheimnisse oder Produktionsressourcen und nimm keine Installation, Anmeldung oder externe Änderung vor.

### Aufgabe

Bereite eine bereinigte Zusammenfassung, einen Diff, eine Testausgabe, Quellenlinks und einen absichtlich fehlenden Beleg vor. Erstelle mit Lab 003 eine Tabelle aus Behauptung, Umfang, Beleg, Status und nächstem Check. Lehne „alle Tests bestanden“ ohne Ausgabe auch dann ab, wenn es selbstbewusst klingt.

Halte Behauptungen über Fakten, Ausführung und Nutzerwirkung getrennt und erkläre, warum sie nicht denselben schwachen Beleg teilen können. Verbinde keine Produktionsdienste und ändere keine externen Systeme. Eine Wiederherstellung kann einen Zustand wieder beobachtbar machen, macht ihn aber nicht automatisch `verified`.

### Belege

Bewahre die Claim-Evidence-Tabelle, alle benannten Pfade und Ausgaben, den Status jeder Zeile, die erste Lücke und den nächsten sicheren Check auf. Fehlt eine Ausführung, schreibe `not_run`; erfinde keine Testausgabe aus einem selbstsicheren Tonfall.

## Geführte Übung: Eine überzeugende Zusammenfassung ist noch kein Nachweis

Stell dir vor, du bittest um Folgendes: „Überarbeite diesen Text mit höchstens
90 Wörtern, damit eine neue Person den ersten Schritt versteht. Ändere keine
Fakten und veröffentliche nichts.“ Das Modell antwortet: „Erledigt; der Text ist
klar und alle Checks sind bestanden.“ Bevor du das übernimmst, bitte um eine
prüfbare Übergabe:

1. Welcher genaue Text oder welche Datei änderte sich? Fordere Diff oder beide
   Textversionen an.
2. Welcher Check lief wirklich? Fordere Befehl, Verzeichnis, Exit-Code und die
   relevante Ausgabe an.
3. Was blieb ungeprüft? Etwa das Verständnis einer neuen Person oder die
   Darstellung auf einer Website.
4. Was ist der nächste sichere Check? Hier: die Textversionen vergleichen und
   eine neue Leserin oder einen neuen Leser nur nach dem ersten Schritt fragen.

Du musst das Modell nicht als unehrlich bezeichnen. Es reicht, die weitreichende
Aussage in überprüfbare Behauptungen zu zerlegen. Ohne Testausgabe bleibt
„alle Checks bestanden“ `unverified`. Wurde nur der Text verglichen, lautet die
ehrliche Übergabe: „Textänderung geprüft; Verständnis von Lesenden ungeprüft.“

## Wiederherstellungskarte für den Anfang

Wenn das Ergebnis unklar ist, fügst du nicht planlos weitere Anweisungen hinzu.
Trage zunächst nur Beobachtungen ein:

```text
ziel: Den ersten Schritt verständlicher machen, ohne Veröffentlichung
letzte_bestätigte_beobachtung: Entwurf und Diff existieren
erste_lücke: Kein Beleg dafür, dass eine neue Person ihn versteht
sicherer_nächster_check: Eine Person nur nach dem ersten Schritt fragen
stopp_wenn: Veröffentlichung, Installation oder andere Dateien nötig werden
ehrliche_übergabe: Textreview vorhanden; Leseverständnis unverified
```

Die Karte macht aus „es hat nicht funktioniert“ einen untersuchbaren nächsten
Schritt. Sie beweist nicht die Wirksamkeit eines Modells, Skills oder Kurses.
Sie trennt nur Beobachtung, Lücke und weiterhin sichere Handlung.

## Absichtlicher Fehler und Grenze

Schreibe einmal eine Übergabe mit „Lesende verstehen den Text“, obwohl niemand
befragt wurde. Markiere die Behauptung, die über ihren Beleg hinausgeht, und
formuliere sie ehrlich um. Erkläre danach, welcher kleinste Nachweis den Status
ändern könnte und was trotzdem außerhalb des Umfangs bliebe. Bewahre die Antwort
beim Diff auf. Ohne Lauf- und Review-Aufzeichnungen bleibt dieses Kapitel
`candidate` und diese Übung `not_run`.

## Reflexion

Welcher Satz in deiner Tabelle war am verführerischsten zu übertreiben? Welcher kleinste Check würde ihn enger stützen, und welche wichtige Behauptung bliebe trotz dieses Checks offen?

## Transferaufgabe

Nutze dieselbe Karte für eine Sprachübung oder eine Quellenrecherche. Bei Sprache unterscheide eine assistierte Antwort von einem späteren Abruf ohne Hilfe, dessen Zeitpunkt niemand vorher kennt. Bei Recherche trenne einen gefundenen Link von einer überprüften Aussage. Übernimm Status, Belege und Grenzen, aber nicht die Behauptung aus diesem Kapitel.

## Abnahme-Checkliste

- [ ] Jede Abschlussbehauptung hat einen Umfang, einen Beleg oder den Status `unverified`.
- [ ] Ich kann Diff, Testausgabe, Laufzeitbeobachtung, Render-Prüfung und Nutzerbeobachtung unterscheiden.
- [ ] Ich habe die erste unbelegte Stufe gefunden und nur einen sicheren nächsten Check gewählt.
- [ ] Meine Übergabe benennt Änderung, Evidenz, Unbekanntes und nicht ausgeführte Nebenwirkungen.

## Quellen und Wartungsgrenze

Die Claim-Evidence-Karte und der Wiederherstellungsablauf sind stabile Lehrmethoden. Produktstatus, Tools, Berechtigungen und öffentliche Symptome können sich ändern. Prüfe vor einer aktuellen Produktbehauptung die [offiziellen Faktenkarten](../evidence-library-DE.md#source-notes) und den [Feldproblemindex](../evidence-library-DE.md#source-notes). Sie ersetzen weder einen lokalen Lauf noch ein unabhängiges Review oder eine Lernbeobachtung.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="08-full-lifecycle-workflow-DE.md" aria-label="Vorheriges Kapitel: Kapitel 8 · Von der Definition zur Übergabe">← Zurück<br><strong>Kapitel 8 · Von der Definition zur Übergabe</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="10-planning-and-slicing-DE.md" aria-label="Nächstes Kapitel: Kapitel 10 · Planung und vertikale Schnitte">Weiter →<br><strong>Kapitel 10 · Planung und vertikale Schnitte</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
