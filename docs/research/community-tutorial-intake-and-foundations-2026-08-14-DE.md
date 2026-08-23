<!-- content_id: community-tutorial-intake-and-foundations-2026-08-14 | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: community-tutorial-intake-and-foundations-2026-08-14.md | source_revision: 2026-08-23 -->

# Aufnahme eines Community-Tutorials: ein besserer Einstieg für Anfänger, keine Produktquelle

**Status:** Forschungsprotokoll `candidate`.  
**Entscheidung:** Das bereitgestellte Community-Tutorial bleibt als Signal `reference-only` erhalten. Der Player, das Transkript und Screenshots werden nicht eingebettet oder kopiert; es dient nicht als Beleg für das aktuelle Produktverhalten.

## Die Entscheidung, die dieses Protokoll unterstützt

Das bereitgestellte Material von Bilibili/BibiGPT hat eine nützliche redaktionelle Stärke: Es beginnt mit einem vertrauten Namen, gibt Neulingen einen Grund weiterzumachen und folgt einem konkreten Projekt, statt Bedienelemente isoliert aufzulisten. Das ist ein Lehrmuster, keine Erlaubnis zur Übernahme des Ausdrucks und keine Grundlage für aktuelle Produktbehauptungen.

Dieses Protokoll beantwortet eine enge Frage: **Was kann dieser Leitfaden aus dem Lehrmuster lernen, während er die eigene Sprache, Quellen und Belege ehrlich hält?**

Die Antwort ist, vor jedem Rundgang durch Funktionen mit einer beobachtbaren Frage zu beginnen:

> Wenn ein Sprachmodell-Tool sagt, es sei fertig, was können Sie prüfen, bevor Sie dem Ergebnis vertrauen?

Die Frage passt zu Codex, Claude Code und anderen modellgestützten Arbeitsoberflächen, ohne gleiche Kontrollen, Berechtigungen, Persistenz oder Agent-Verhalten zu behaupten.

## Was die öffentliche Quelle beitragen kann und was nicht

| Material aus der bereitgestellten Quelle | Behandlung in diesem Projekt | Grund |
| --- | --- | --- |
| Der Weg von einem vertrauten Produktnamen zu einem einfachen Projekt | **Als Lehrmuster behalten, von Grund auf neu schreiben** | Anfänger brauchen einen konkreten Grund weiterzumachen, aber Wortlaut und Darstellung gehören nicht uns. |
| Produktnamen, Tarife, Kontingente, Tastenkürzel und UI-Bezeichnungen | **Nicht aus dieser Quelle lehren** | Das sind volatile, konto- und oberflächenabhängige Aussagen; das Material ist keine Eigentümerdokumentation. |
| Berechtigungsmodi und Freigabeverhalten | **Nur das Sandbox-versus-Freigabe-Prinzip mit einer datierten Primärquelle lehren** | Genaue Modi und Standardwerte können sich ändern. Ein Freigabeprüfer erweitert die Laufzeitgrenze nicht selbst. |
| Visueller Hinweis-/Annotationsablauf | **Das dauerhafte Prinzip lehren, nicht das benannte Steuerelement** | Bei wichtigem visuellen Kontext den Bereich und das gewünschte Ergebnis angeben; nicht dieselbe UI auf jeder Oberfläche versprechen. |
| Geschichte eines Vorschau-/Speicherfehlers | **Aus Produktanleitungen heraushalten** | Es ist eine einzelne Symptomdarstellung. Das Projekt hat sie nicht reproduziert und keine bestätigte Ursache. |
| Git-Checkpoints, begrenzte Aufgaben, unabhängige Checks und Stop-Bedingungen | **Als produktneutrale Methoden lehren** | Diese Praktiken sind nützlich, ohne einen anbieterspezifischen Ablauf zu kopieren. |
| Skills, Plugins und externe Tools | **Für Definitionen die aktuelle Dokumentation des Eigentümers verwenden und Handlungs-/Datengrenzen bewahren** | Ein Skill ist keine Berechtigung; eine Plugin-Liste beweist keine externe Aktion. |
| Bearbeiten, Forken oder Archivieren von Threads, Automatisierungen, Computersteuerung oder mobile Nutzung | **Bis zu einem aktuellen Adapterprotokoll für eine benannte Oberfläche ausschließen** | Die Quelle liefert dafür keinen aktuellen, primären, ausführbaren Vertrag. |

## Prüfung der aktuellen offiziellen Grenze

Die folgenden Quellen waren am 2026-08-14 erreichbar. Ihre Seiten werden von OpenAI kontrolliert; Aussagen gelten nur für die genannten Oberflächen und müssen vor einer davon abhängigen Veröffentlichung erneut geprüft werden.

| Sicher genug zu lehrende Aussage | Primärquelle | Was sie weiterhin nicht belegt |
| --- | --- | --- |
| Die Codex-Terminologie gilt für mehrere Oberflächen, während die konkreten Fähigkeiten einer Oberfläche begrenzt bleiben. | [OpenAI-Glossar](https://learn.chatgpt.com/docs/glossary.md) | Konto, installierte Version, Berechtigungen oder erfolgreicher Lauf eines Lernenden. |
| Eine nützliche Anfrage macht Ziel, Kontext, Ausgabe und Grenzen sichtbar; visuelle Arbeit profitiert vom Hinweis auf den relevanten Bereich. | [OpenAI Prompting-Hinweise](https://learn.chatgpt.com/docs/prompting.md) | Dass eine Anfrage gelingt oder jeder Client ein gleich benanntes Annotations-Steuerelement hat. |
| Die Sandbox steuert zugängliche Dateien/Netzwerkressourcen; Freigaben steuern, wann die Laufzeit pausiert. Ein anderer Prüfer vergrößert die Sandbox nicht. | [OpenAI-Berechtigungen](https://learn.chatgpt.com/docs/permission-modes.md) | Aktuelle Standardwerte, Organisationsrichtlinien oder eine zielbezogene Autorisierung. |
| Ein Skill bündelt wiederverwendbare aufgabenspezifische Anweisungen und Ressourcen; ein Plugin kann Skills und Konnektoren bündeln. | [OpenAI Skills und Plugins](https://learn.chatgpt.com/docs/skills-and-plugins.md) | Auswahl eines Skills, Authentifizierung eines Konnektors oder Abschluss einer externen Aktion. |
| In der Desktop-App sind Local und Worktree getrennte Ausführungsorte; Worktree isoliert Änderungen in einem Git-Worktree. | [OpenAI-Codex-Umgebungen](https://learn.chatgpt.com/docs/environments/modes.md) | Dass die Isolation für eine bestimmte parallele Aufgabe ausreicht oder andere Plattformen gleich funktionieren. |

Dies sind Quellenprüfungen, keine lokalen Produktläufe. Der Leitfaden bleibt deshalb `candidate` und macht keine aktuelle Aussage über die Videooberfläche, Tarife, Verfügbarkeit, Vorschau, mobile Abläufe oder konkrete Funktionsbezeichnungen.

## Ein eigener Einstieg für den allgemeinen Kurs

Das ist die Leserichtung, die jetzt am Anfang von Kapitel 1 verwendet wird. Sie ist eigene Projektsprache, kein Transkript und keine Übersetzung:

> Vielleicht haben Sie Namen wie Codex und Claude Code gehört. Sie stehen für einen größeren Wandel: Ein Sprachmodell kann heute mit einer Aufgabe, Kontext und manchmal Werkzeugen arbeiten, statt nur eine Chatantwort zurückzugeben. Bevor wir Steuerelemente durchgehen, lernen Sie die Frage, die alles Weitere leichter macht: Wenn das Tool sagt, es sei fertig, was können Sie tatsächlich prüfen?
>
> In dieser ersten Lektion müssen Sie keine Produkte auswendig lernen. Sie unterscheiden eine vorgeschlagene von einer erlaubten Aktion, eine Toolmeldung von einer Änderung am Ziel und eine plausible Antwort von einem Beleg. Codex ist hier die ausführlich behandelte Praxisroute. Die Methode ist allgemeiner; jede benannte Plattform braucht einen eigenen Adapter, bevor ihre Schaltflächen als Fakten gelehrt werden.

So erhält ein Anfänger eine Einladung, ein brauchbares mentales Modell und einen klaren Nutzen, ohne unbelegte Aussagen wie „Kernprodukt“, „beste Option“ oder „direktes Äquivalent“.

## Die ersten zehn Minuten: ein Versprechen, eine Grenze

Eine Grundlektion sollte nicht mit der Auswahl eines Modells, Tarifs, Plugins oder Berechtigungsmodus beginnen. Sie sollte ein kleines Versprechen machen:

1. **Ein Ergebnis benennen.** Zum Beispiel eine fiktive Nachricht ohne neue Fakten umschreiben oder eine Änderung an einer Datei prüfen.
2. **Das Ausgangsmaterial zeigen.** Der Lernende sieht den genauen Text, die Datei oder das Fixture, bevor das Modell handeln soll.
3. **Die Handlungsgrenze nennen.** Text, nur Lesen oder genau eine reversible Änderung; keine Geheimnisse und keine externen Konten.
4. **Den Check zeigen.** Der Leser nennt, was gleich bleiben, sich ändern und unbekannt bleiben muss.
5. **Sicheres Stoppen ermöglichen.** Bei unklarem Ziel, unklarer Autorität oder fehlenden Belegen stoppen und den kleinsten nächsten Check notieren, statt Zugriff auszuweiten.

Das vorhandene optionale Warm-up folgt diesem Muster mit einer fiktiven Quellnachricht. Der Einstieg in Kapitel 1 erklärt jetzt, warum dieses bescheidene erste Ergebnis wertvoller ist als eine lange Funktionsliste.

## Namensfolge: allgemeine Methode und klar benannte Flagship-Route

Der Inhalt beschreibt zwei Ebenen:

- **allgemeine Methode:** Ergebnis definieren, nur nötigen Kontext wählen, Handlungsgrenze setzen, Belege prüfen, wiederherstellen und einen Nachweis aufbewahren;
- **Flagship-Praxisroute:** Codex dort vertiefen, wo aktuelle Primärquellen, begrenzte Läufe, Fehlerbelege und Prüftermine existieren.

Claude Code und andere benannte Systeme sind Vergleichs- oder Adapterkandidaten, keine austauschbaren Ersatzprodukte. Die ausstehende Empfehlung zu Produktnamen und die gestufte Migration stehen in der [Notiz zum Namensübergang](../strategy/naming-and-positioning-transition-2026-08-14.md).

## Quellen- und Rechtebeleg

| Feld | Eintrag |
| --- | --- |
| Quelle | Bilibili-Playerreferenz `BV1c9EK6KEW4` und der am 2026-08-14 bereitgestellte, von BibiGPT erzeugte chinesische Text. |
| Evidenzklasse | Community-Vorschlag / redaktionelle Referenz. |
| Rechtebehandlung | Keine Lizenz oder Wiederverwendungserlaubnis wurde bereitgestellt oder unabhängig bestätigt. Es wurden keine Prosa, Screenshots, Bild-URLs, Iframes, Code oder Markendarstellung kopiert. |
| Lokale Reproduktion | Keine. Das Projekt hat das Tutorial nicht ausgeführt, sein Projekt nicht verwendet, seine Funktionsbehauptungen nicht getestet und verlinkte Assets nicht geprüft. |
| Entscheidung | `reference-only`; darf eine eigene Themenübersicht beeinflussen, aber weder aktueller Produktfakt noch Reader-Einbettung sein. |
| Verantwortlich und Review | Curriculum-Maintainer; nur neu bewerten, wenn eine separat lizenzierte, primär relevante Quelle eine redaktionelle Entscheidung ändert. |

## Was dieses Protokoll nicht belegt

Diese Aufnahme belegt nicht, dass Autor, Transkriptionsdienst, Tarife, Berechtigungen, Steuerelemente, Vorschauverhalten, Projektablauf, Automatisierung, Computersteuerung, mobile Nutzung oder Ergebnisse der Quelle korrekt, aktuell, zur Wiederverwendung lizenziert, repräsentativ, sicher oder einer anderen Plattform gleichwertig sind. Sie belegt auch nicht, dass ein überarbeiteter Einstieg Verständnis, Abschluss, Behalten, Transfer oder Projektübernahme verbessert. Dafür ist eine begrenzte Studie mit Lernenden erforderlich.
