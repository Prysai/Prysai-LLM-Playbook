<!-- content_id: chapter-09-verification-and-recovery | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 9: Überprüfung, Zweifel und Wiederherstellung

**Status:** `candidate`. **Experiment:** `not_run`. Dieses Kapitel ordnet Abschlussbehauptungen ihren Belegen zu und zeigt, wie ein unsicherer Ablauf wieder unter Kontrolle kommt. Es ist keine lokale Reproduktion, offizielle Diagnose oder Produktionsnachweis.

## Das Problem

Ein Agent kann eine überzeugende Abschlusszusammenfassung für ein falsches, zu weitgehendes, nie ausgeführtes oder im falschen Umfeld geprüftes Ergebnis schreiben. Die Antwort ist weder blindes Vertrauen noch dauerhafter Verdacht: Zerlege die Zusammenfassung in einzelne Behauptungen und ordne jeder den kleinsten Beleg zu, der sie im angegebenen Umfang tragen kann.

| Behauptung | Mindestbeleg | Beweist nicht |
|---|---|---|
| Eine Datei änderte sich | Diff, Pfad oder Hash | Korrektheit oder Vollständigkeit |
| Ein Check bestand | Befehl, Verzeichnis, Exit-Code und relevante Ausgabe | Gleiches Verhalten in anderem Umfeld |
| Die Anwendung läuft | Echter Start und Beobachtung eines kritischen Pfads | Nutzerwert, Sicherheit oder Produktionsreife |
| Die Seite sieht korrekt aus | Render-Prüfung mit dokumentiertem Viewport | Vollständige Barrierefreiheit, Backend oder Conversion |
| Eine Tatsache ist offiziell | Autoritative URL, Datum, Umfang und Verantwortlichkeit | Zugriff dieses Kontos oder lokale Konfiguration |

Ein schwacher Beleg ersetzt nicht alle anderen. Ein Build beweist keine Laufzeit, ein Screenshot keine Nachfrage und eine offizielle URL keinen Zugriff.

## Den ersten Bruch finden

```text
Anfrage → Autorisierung → sichtbares Tool → Aktion → Ergebnis → Review
```

Notiere den ersten Pfeil, den du nicht beobachten kannst. Eine verfügbare Sitzung beweist keine Tool-Registrierung; zurückgewonnene Kontrolle über einen Lauf beweist nicht das gewünschte Ergebnis.

| Status | Bedeutung |
|---|---|
| `verified` | Der angegebene Beleg trägt die Behauptung in diesem Umfang |
| `unverified` | Erforderlicher Beleg fehlt; das heißt nicht falsch |
| `unknown` | Beobachtung reicht für keine Einordnung |
| `partial` | Ein konkreter Teil ist gestützt, ein anderer nicht |
| `not_observed` | Das Projekt speicherte keine Beobachtung |
| `error` | Für die erklärte Operation liegt ein Fehlbeleg vor |

## Mit einem sicheren Check wiederherstellen

Bei Kapazitätsfehler, `Working` ohne Ende, fehlendem Tool oder vorgeschlagener Neuinstallation bewahrst du zuerst Diff, Ausgabe, Log und letzten akzeptierten Checkpoint auf. Wähle dann genau eine begrenzte Aktion: Ziel inspizieren, denselben Befehl einmal begrenzt wiederholen, Eingabe anfordern oder stoppen. Ein Check ist keine Erlaubnis für Installation, Neustart, Deployment oder Schreiben außerhalb des Auftrags.

```text
claim: Alle Tests bestanden
evidence: Testausgabe fehlt
status: unverified
next_check: Nur den freigegebenen Befehl im festen Verzeichnis und Revision ausführen
```

## Experiment und Grenze

Bereite eine bereinigte Zusammenfassung, Diff, Testausgabe, Quellenlinks und ein absichtlich fehlendes Belegstück vor. Erstelle mit Lab 003 eine Tabelle aus Behauptung, Umfang, Beleg, Status und nächstem Check. Lehne „alle Tests bestanden“ ohne Ausgabe auch bei sicherem Ton ab.

Halte Fakt-, Ausführungs- und Nutzerwirkungsbehauptung getrennt und erkläre, warum sie keinen schwachen Beleg teilen. Keine Produktionsdienste verbinden oder externe Systeme ändern. Wiederherstellung kann einen Zustand wieder beobachtbar machen, macht ihn aber nicht automatisch `verified`.

## Geführte Übung: Eine sichere Zusammenfassung ist noch kein Nachweis

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

Du musst das Modell nicht als unehrlich bezeichnen. Es reicht, die breite
Aussage in überprüfbare Behauptungen zu zerlegen. Ohne Testausgabe bleibt
„alle Checks bestanden“ `unverified`. Wurde nur der Text verglichen, lautet die
ehrliche Übergabe: „Textänderung geprüft; Verständnis von Lesenden ungeprüft.“

## Wiederherstellungskarte für den Einstieg

Wenn das Ergebnis unklar ist, fügst du nicht planlos weitere Anweisungen hinzu.
Trage nur Beobachtungen ein:

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

## Absichtlicher Fehler und Rückblick

Schreibe einmal eine Übergabe mit „Lesende verstehen den Text“, obwohl niemand
befragt wurde. Markiere die Behauptung, die über ihren Beleg hinausgeht, und
formuliere sie ehrlich um. Erkläre danach, welcher kleinste Nachweis den Status
ändern könnte und was trotzdem außerhalb des Umfangs bliebe. Bewahre die Antwort
beim Diff auf. Ohne Lauf- und Review-Aufzeichnungen bleibt dieses Kapitel
`candidate` und diese Übung `not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="08-full-lifecycle-workflow-DE.md">← Vorheriges<br><strong>Kapitel 8 · Von der Definition zur Übergabe</strong></a></td><td align="right"><a data-chapter-nav="next" href="10-planning-and-slicing-DE.md">Weiter →<br><strong>Kapitel 10 · Planung und vertikale Schnitte</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
