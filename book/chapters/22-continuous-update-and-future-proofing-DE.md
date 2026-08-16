<!-- content_id: chapter-22-continuous-update-and-future-proofing | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Kapitel 22: Kontinuierliche Aktualisierung und Zukunftssicherheit

**Status:** `candidate`. **Experiment:** `draft / not_run`. Es läuft nur in einer temporären Kopie oder einem isolierten Branch; keine Produktion, echten Zugangsdaten, Pushes, Releases oder externen Massenersetzungen.

## Das Problem

Modelle, Codex-Einstiegspunkte, Berechtigungen, Skills und externe Dienste ändern sich. Ein heute brauchbarer Ablauf kann nach Monaten irreführend sein, wenn Quelle, Umfang, Prüftermin, Migrationsplan und Rollback fehlen. Kontinuierliche Pflege bedeutet nicht, jede Neuheit zu übernehmen. Sie entscheidet diszipliniert, was stabil ist, was neu geprüft werden muss und wann eine Praxis beibehalten, blockiert, migriert oder eingestellt wird.

## Vier Ebenen, vier Lebensdauern

| Ebene | Beispiele | Pflege |
|---|---|---|
| Stabile Prinzipien | Kontext beeinflusst Verständnis; Tools verändern den Handlungsraum; Evidenz stützt einen Abschlussanspruch | Lehre, Experimente, Grenzreview |
| Produktnutzung | Codex-Einstiegspunkte, Skill-Aufruf, Berechtigungen, Konfiguration | Gegen die konkrete offizielle Seite prüfen |
| Fachmethoden | Engineering, Recherche, Marketing, Dokumentation, Daten | Übungsaufgaben und menschliches Review |
| Instanzfakten | Modell-ID, Preis, Quote, Parameter, externe API | An datierte Quelle binden; bei Bedarf migrieren oder entfernen |

Inhaltliche Reife `draft | candidate | verified | production-ready`, Status flüchtiger Aussagen `current | stale | disputed | removed` und Ausführungsbeobachtung `planned | authorized | executed | verified | not_run` sind verschieden. Eine aktuelle Quelle macht ein Kapitel nicht verifiziert.

## Entscheidung: behalten, aktualisieren, blockieren, einstellen

| Evidenzlage | Aktion | Erforderlicher Abschluss |
|---|---|---|
| Autoritative Quelle besteht und der Umfang passt | `current`; behalten oder minimal ändern | Quelle, Prüfung, betroffene Verbraucher dokumentiert |
| Quellen widersprechen sich oder Beobachtung kollidiert | `disputed`; definitive Aussage aussetzen | Unbekannte und Review-Verantwortung notieren |
| Quelle fehlt, kein Ersatzbeleg | `stale`; warnen oder blockieren | Altes nicht als aktuell darstellen |
| Lizenz oder Sicherheit erlaubt die Fähigkeit nicht mehr | `removed`; einstellen | Migration und Wiederherstellung dokumentieren |
| Kompatibler Ersatz und Migration bewertet | `current`; Migration erläutern | Alter Umfang, Pfad, Evidenz, nächste Prüfung |

Ohne Verantwortliche Person, Evidenz oder Rollback ist die Arbeit `blocked`.

## Aktion: Aussageprotokoll und Wirkungsmatrix

```yaml
claim: "Die konkrete Aussage"
source: "Offizielle oder autoritative URL"
checked_at: "YYYY-MM-DD"
applies_to: "Produkt, Version, Region oder Konto-Umfang"
owner: "Verantwortliche Rolle"
next_review: "YYYY-MM-DD"
claim_status: "current | stale | disputed | removed"
```

Der Ablauf: Änderung entdecken → Wirkung und Risiko einordnen → betroffene Kapitel, Skills, Labs, Tasks und Rechte finden → Quelle oder begrenzte Evidenz prüfen → kleinste sichere Änderung → relevante Checks erneut ausführen → Review mit frischem Kontext → behalten, migrieren, blockieren, einstellen oder veröffentlichen.

Bei einer Modell- oder Skill-Migration werden Erstversuch, Fehler, Kontext, Tools, Berechtigungen, Trigger, Ausgabeformat, Lizenz, Zuständigkeit und Wiederherstellung erneut geprüft. Ein Quell-Refresh beweist weder Kontozugriff noch Laufzeit, Deployment oder Teamwirkung.

## Experiment: hypothetische Produktänderung bearbeiten

Erstelle in einer temporären Kopie `update-impact-demo-v1` mit einer erfundenen, `disputed` Aussage zu `https://example.invalid/public-doc`. Diese Adresse ist absichtlich nicht verfügbar. Nicht aufrufen, keine Anweisungen ausführen und nicht als Produktsbeleg behandeln. Bewahre Basis-hash, Inventar, Vorher-diff und `run_id` auf.

Nimm an, eine öffentliche Beschreibung ändere sich, aber es gibt keine zweite vertrauenswürdige Quelle. Belasse `disputed` und stoppe definitive Lehrformulierungen. Erstelle für Kapitel, Skill, Lab, Berechtigungsnotiz und Task-Set eine Wirkungsmatrix mit Verbraucher, Risiko, Minimalaktion, Evidenz, Eigentümer und Status. Ändere nur das Fixture, führe nur relevante Checks aus und notiere Ergebnis oder `not_run`, diff, unbestätigte Punkte und Rollback. Ohne `decision_owner`, temporäres `delivery_target`, `reviewer` und `rollback_target` bleibt der Status `blocked`.

Das Evidenzpaket enthält Aussage, Quelle oder Abwesenheitsprotokoll, Umfang, Verantwortliche Person, Prüftermin, hash oder diff, Wirkungsmatrix, Log und Liste unbestätigter Punkte. Rollback muss die temporäre Kopie auf den hash zurückführen oder sie verwerfen können.

## Fehler, Transfer und Abnahme

Führe bewusst einen Fehler herbei, indem du einen Modellnamen überall ersetzt, ohne Tasks, Quellen, Rechte oder Lizenz zu prüfen. Stoppe, bewahre den fehlgeschlagenen diff in der temporären Kopie, stelle die Basis wieder her und ergänze übersehene Verbraucher. Ein echter externer Skill-Kandidat bleibt `blocked` oder Anpassungskandidat, bis Lizenz, Abhängigkeiten, Trigger, Rechte, Risiken, Eigentümer und Evaluation geprüft sind.

- [ ] Ich unterscheide stabile Prinzipien, Produktnutzung, Fachmethoden und Instanzfakten.
- [ ] Jede flüchtige Aussage hat Quelle, Datum, Umfang, Eigentümer, Prüftermin und Status.
- [ ] Die Wirkungsmatrix umfasst Kapitel, Skills, Labs, Tasks und Rechte.
- [ ] Ich trenne Aussage-Status und Inhaltsreife.
- [ ] Die Übung enthält hash, diff, Log, Rollback und unbestätigte Punkte.

Produktnamen, Berechtigungen und Verhalten sind flüchtige Fakten. Prüfe aktuelle offizielle Quellen. Dieses Kapitel bleibt `candidate`; die Übung beweist weder Produktionsverhalten noch Teamwirkung.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Kapitelnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="21-team-capability-system-DE.md">← Vorheriges<br><strong>Kapitel 21 · ein Team-Fähigkeitssystem aufbauen</strong></a></td><td align="right"></td></tr></table></nav>
<!-- chapter-navigation:end -->
