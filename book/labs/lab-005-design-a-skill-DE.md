<!-- content_id: lab-005-design-a-skill | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-005-design-a-skill
title: "Eine wiederholte Methode in einen klar begrenzten Skill überführen"
level: L4
domain: general
goal: "Entscheiden, ob ein wiederholter Ablauf einen Skill verdient, und prüfen, dass der Skill Arbeit begrenzt statt überall auszulösen"
setup: "Ein mindestens zweimal ausgeführter risikoarmer Ablauf, ein getrenntes Übungsverzeichnis, vier bereinigte Fixtures und der offizielle Skill-Validator"
task: "Stabile Entscheidungen herausarbeiten, den kleinsten nützlichen Skill schreiben, positive, Grenz-, Fehler- und Transferfälle prüfen und ohne Installation eine Adoptionsentscheidung treffen"
status: draft
last_verified: "not run"
---

# Lab 005: Eine wiederholte Methode in einen klar begrenzten Skill überführen

## Lernziel

Baue ein wiederverwendbares Anweisungspaket nur, wenn die wiederholte Arbeit ein stabiles
Entscheidungsmuster hat. Ein Skill ist kein Speicher für eine einmal gute Antwort, keine
projektbezogene Checkliste und kein Ablageort für alle Fakten eines Fachgebiets.

## Vorbereitung

Wähle einen harmlosen Ablauf, der mindestens zweimal abgeschlossen wurde, und bewahre beide
Protokolle auf. Nutze bereinigte Eingaben und ein Übungsverzeichnis außerhalb der entdeckbaren
Skill-Wurzel. Verwende keine Zugangsdaten, Produktionsdaten, unveröffentlichtes Kundenmaterial
oder externe Quellen mit unklaren Wiederverwendungsbedingungen.

Erstelle `extraction.md`:

| Beobachteter Schritt | Stabile Entscheidung | Projektspezifisches Detail | Beleg aus beiden Durchläufen |
|---|---|---|---|

Nur stabile Entscheidungen sind Skill-Kandidaten. Dateinamen, Kundendetails, temporäre
Umgehungen und einmalige Ziele bleiben im Projektkontext.

## Aufgabe und Experiment

Schreibe den kleinsten Kandidaten mit einer passenden Beschreibung samt Nichtauslösern,
Eingaben, erlaubten Aktionen, Berechtigungsgrenzen, Geheimnisbehandlung, Ausgabe und Abnahme.
Halte den Kernablauf kurz; trenne detaillierte Referenzen oder Skripte ab, wenn sie nur
gelegentlich gebraucht werden. Ergänze ein positives, ein Grenz- und ein Fehlerbeispiel sowie
Quelle, Lizenz, Verantwortung, Version und nächsten Prüftermin.

Führe den offiziellen Validator aus. Prüfe in einem frischen Kontext vier feste Fixtures:
positiv, Grenze, Fehler und Transfer in ein anderes Fachgebiet. Notiere getrennt, ob der
Kandidat gefunden, geladen, ausgewählt, befolgt und im Verhalten geprüft wurde. Keiner dieser
fünf Zustände beweist den nächsten.

Schließe mit `skill-adoption-decision.md` ab:

```text
candidate_revision:
task_gap:
trigger_conditions / non_trigger_conditions:
source / license / notice:
dependencies:
permissions / external_side_effects:
positive / boundary / failure / transfer results:
target_install_scope:
backup / rollback / rollback_check:
owner / next_review:
decision: recommendation-only | blocked | approved-to-install
unverified / unblock_conditions:
```

Dieses Lab endet mit einer Empfehlung. Installation verändert gemeinsamen Zustand und braucht
eine eigene Autorisierung.

## Aufzubewahrende Belege

Bewahre beide Ablaufprotokolle, `extraction.md`, Kandidatenverzeichnis, Revision oder Hash,
Validator-Ausgabe, Ein- und Ausgaben aller vier Fixtures, Notizen zum frischen Kontext und die
Adoptionsentscheidung auf. Ein fehlgeschlagener Test bleibt als Fehler erhalten.

## Fehlerfall

Trage zuerst einen echten Projektdateinamen oder eine kundenspezifische Regel in den Skill ein.
Prüfe mit dem Transfer-Fixture, ob der Kandidat fehlzündet oder eine irrelevante Anweisung
erzeugt. Entferne das zufällige Detail und wiederhole mit neuer Versuchs-ID.

Füge danach ein externes Fragment ohne klare Lizenz- oder Erlaubnisaufzeichnung hinzu. Selbst
bei bestandenem Validator ist `blocked` richtig: Dateistruktur klärt keine Herkunft.

## Abnahme, Reflexion und Transfer

- [ ] Zwei frühere Durchläufe tragen jede codierte stabile Entscheidung.
- [ ] Auslöse- und Nichtauslösebedingungen wurden beide geprüft.
- [ ] Positive, Grenz-, Fehler- und Transferfälle behalten Rohresultate.
- [ ] Quellen und Wiederverwendungsrechte sind festgehalten.
- [ ] Installation, Geheimnisse, Veröffentlichung und externe Nebenwirkungen blieben aus.
- [ ] Die Entscheidung nennt offene Punkte und die nächste verantwortliche Person.

Wende die Methode auf einen anderen Bereich an. Was überstand den Wechsel, was gehörte in den
Projektkontext, und verringerte der Kandidat wiederholte Auslassungen oder machte er Anweisungen
nur länger?

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab-Navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-004-skill-selection-DE.md" aria-label="Vorheriges Lab: Lab 004 · Die kleinste nützliche Fähigkeit auswählen">← Vorheriges<br><strong>Lab 004 · Die kleinste nützliche Fähigkeit auswählen</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="../table-of-contents-DE.md" aria-label="Zum deutschen Inhaltsverzeichnis: Lab 006 ist noch nicht übersetzt">Nächstes Lab in Arbeit →<br><strong>Verfügbarkeit von Lab 006 ansehen</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
