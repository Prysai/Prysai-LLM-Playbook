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

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="08-full-lifecycle-workflow-DE.md">← Vorheriges<br><strong>Kapitel 8 · Von der Definition zur Übergabe</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-DE.md">Nächstes Kapitel in Arbeit →<br><strong>Verfügbarkeit von Kapitel 10 ansehen</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
