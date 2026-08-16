<!-- content_id: lab-004-skill-selection | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-004-skill-selection
title: "Die kleinste wirksame Fähigkeit auswählen"
level: L4
domain: general
goal: "Einen Skill oder ein Tool nach Aufgabenpassung, Risiko, Lizenz und Verifikationskosten auswählen"
setup: "Eine risikoarme lokale Aufgabe und Kandidaten mit fester Revision"
task: "Protokoll allein, Protokoll plus Skill und Protokoll plus Skill plus Tool vergleichen, ohne zu installieren oder sich anzumelden"
evidence:
  - "Drei Ansatzprotokolle mit Aufgabenpassung, Abhängigkeiten, Berechtigungen und Verifikationskosten"
  - "Notizen zu Quelle, Revision, Lizenz, verschachtelten Assets und Rollback jedes Kandidaten"
  - "Eine reine Empfehlung und eine blockierte Entscheidung"
failure_variant: "Einen sichtbaren Kandidaten mit unklarer Lizenz oder Rücknahme wählen und einer einfachen Aufgabe irrelevante Fähigkeiten hinzufügen"
reflection: "Welche Fähigkeit hat ihren Platz verdient? Welche Abhängigkeit schuf die höchsten Wartungskosten? Was kann weg?"
status: draft
last_verified: "Not run"
transfer_task: "Den Vergleich für eine risikoarme Recherche- oder Content-Aufgabe wiederholen"
transfer_domain: "research, engineering, marketing, or documentation"
transfer_evidence: "Aufgabenlücke, Vergleichstabelle, Übernahmeprotokolle und Reviewer-Kommentare aufbewahren"
transfer_limitations: "Ein reiner Empfehlungsvergleich belegt weder Installation noch Laufzeitverhalten oder langfristigen Wartungswert"
---

# Lab 004: Die kleinste wirksame Fähigkeit auswählen

## Lernziel

Wähle Fähigkeiten, weil sie eine konkrete Aufgabenlücke schließen – nicht weil sie
populär, zahlreich oder leicht zu installieren sind.

## Vorbereitung

Wähle eine risikoarme lokale Aufgabe und vergleiche drei Vorgehensweisen:

1. nur ein geschriebenes Aufgabenprotokoll;
2. das Protokoll mit einem passenden Skill;
3. das Protokoll, den Skill und ein externes Tool oder einen Connector.

Fixiere die Revision jedes Kandidaten. Notiere Quelle, Lizenz, Abhängigkeiten,
beabsichtigten Installationsbereich, Berechtigungen, Nebenwirkungen, Owner,
Prüfdatum und Rollback. Installiere nichts und authentifiziere dich nicht, solange
eine spätere Aufgabe dies nicht ausdrücklich erlaubt.

## Entscheidungsprotokoll

Erstelle für jeden Kandidaten einen kurzen Übernahmeeintrag:

```text
task_gap:
trigger / non_trigger:
source / revision:
license / notice / nested_assets:
dependencies / permissions / side_effects:
isolated_trial:
rollback / recovery_check:
positive / boundary / failure / transfer tests:
owner / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unknowns / unblock_conditions:
```

Die Standardentscheidung in diesem Lab ist `recommendation-only` oder `blocked`.
Entdecken, Installieren, Laden, Aufrufen, beobachteter Effekt und verifiziertes
Ergebnis sind verschiedene Zustände und werden getrennt festgehalten.

## Fehlerfall

Wähle einen Kandidaten, dessen Ordner vorhanden ist, dessen Lizenz,
verschachtelte Assets, feste Revision oder Rollback-Verfahren aber unklar sind.
Die richtige Entscheidung ist `blocked`. Auffindbarkeit ist keine Erlaubnis;
Installation ist kein Nachweis des Verhaltens.

Füge danach einer einfachen Textaufgabe mehrere irrelevante Fähigkeiten hinzu.
Lehne jede Fähigkeit ab, deren Berechtigungs-, Abhängigkeits- oder
Verifikationskosten größer sind als der konkrete Wert, den sie für die Aufgabe
liefert.

## Abnahme-Checkliste

- [ ] Die Aufgabenlücke ist vor dem Vergleich notiert.
- [ ] Mindestens ein Kandidat wird mit konkretem Grund abgelehnt.
- [ ] Unsicherheit zu Lizenz und verschachtelten Assets ist sichtbar.
- [ ] Berechtigungen und externe Nebenwirkungen sind nicht breiter als die Aufgabe.
- [ ] Installation und Verhalten werden nicht als derselbe Zustand behandelt.
- [ ] Eine wartende Person kann den Rollback ohne Chatverlauf ausführen.

## Aufzubewahrende Belege

Bewahre die unveränderte Aufgabeneingabe, drei Ansatzprotokolle,
Kandidaten-Revisionen, Lizenznotizen, Entscheidungstabelle und
Reviewer-Kommentare auf. Dieses Lab ist kein Beleg dafür, dass ein externer Skill
installiert oder zuverlässig validiert wurde.

## Reflexion und Transfer

Wiederhole den Vergleich für eine Recherche- oder Content-Aufgabe. Welche neue
Abhängigkeit erzeugte die meisten Wartungskosten? Was könntest du entfernen,
ohne die Qualität der finalen Belege zu senken?

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab-Navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-003-evidence-review-DE.md" aria-label="Vorheriges Lab: Lab 003 · Eine Fertigmeldung prüfen">← Vorheriges<br><strong>Lab 003 · Eine Fertigmeldung prüfen</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="../table-of-contents-DE.md" aria-label="Zum deutschen Inhaltsverzeichnis: Lab 005 ist noch nicht übersetzt">Nächstes Lab in Arbeit →<br><strong>Verfügbarkeit von Lab 005 ansehen</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
