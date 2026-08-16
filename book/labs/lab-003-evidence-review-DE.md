<!-- content_id: lab-003-evidence-review | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-003-evidence-review
title: "Eine Fertigmeldung prüfen"
level: L3
domain: general
goal: "Behauptungen, direkte Belege, Schlussfolgerungen und fehlende Verifikation trennen"
setup: "Drei bereinigte Lieferzusammenfassungen; der Lösungsschlüssel bleibt außerhalb des Lernkontexts"
task: "Jede wesentliche Behauptung auf Umfang, nötige und gefundene Belege, Status und kleinsten nächsten Check abbilden"
evidence:
  - "Die drei festen Eingabezusammenfassungen und der Lösungsschlüssel"
  - "Eine ausgefüllte Behauptung-Beleg-Tabelle"
  - "Review-Notizen und eine ausdrückliche Liste unverifizierter Punkte"
failure_variant: "Eine unbelegte Behauptung alle Tests bestanden und eine mit nur einem Browser belegte Behauptung funktioniert auf jedem Gerät einfügen"
reflection: "Welcher Beleg bewies Existenz, Korrektheit oder Einsatzbereitschaft, und welche Behauptung wurde nach dem Umfang schwächer?"
status: draft
last_verified: "Not run"
transfer_task: "Die Prüftabelle auf eine kleine Engineering-, Forschungs- oder Veröffentlichungsübergabe anwenden"
transfer_domain: "Engineering, Forschung oder Content-Übergabe"
transfer_evidence: "Begrenzte Behauptungen, direkte Belege, Lücken, Review-Notizen und Endstatus aufbewahren"
transfer_limitations: "Eine statische Prüfung beweist nicht, dass zitierte Artefakte außerhalb des geprüften Umfangs echt oder vollständig sind"
---

# Lab 003: Eine Fertigmeldung prüfen

## Lernziel

Entscheide ohne Tonfall, Selbstsicherheit oder visuelle Politur, ob ein Ergebnis fertig ist.

## Vorbereitung und Aufgabe

Bereite drei bereinigte Lieferzusammenfassungen vor: eine mit direkten Belegen, eine teilweise fertige mit Fertigmeldung und eine polierte ohne Verifikationsprotokoll. Der Lösungsschlüssel bleibt außerhalb des Lernkontexts. Erlaubt sind nur lesende Prüfung und Anforderungen nach engeren Belegen.

| Behauptung | Umfang | Nötiger Beleg | Gefundener Beleg | Status | Kleinster nächster Check |
|---|---|---|---|---|---|
| Beispiel | Datei, Umgebung, Version, Datum | Diff und fokussierter Check | exakter Pfad oder `none` | verified / partial / inferred / blocked / unknown | eine begrenzte Aktion |

Trenne: Existiert ein Artefakt? Ist es im genannten Umfang korrekt? Ist es für Leser oder Umgebung bereit? Diff beweist Änderung, kein korrektes Ergebnis; ein Unit-Test beweist abgedecktes Verhalten, nicht Deployment oder Nutzerabnahme.

## Fehlerfall

Füge „alle Tests bestanden“ ohne Befehlsausgabe, Testnamen, Datum, Umgebung oder Exit-Code ein. Stufe die Behauptung herab und fordere Belege. Wiederhole mit einem Browserbeleg für „funktioniert auf jedem Gerät“: Grenze ein oder verlange weitere Gerätebelege.

## Abnahme, Belege und Transfer

- [ ] Jede wichtige Behauptung hat expliziten Umfang.
- [ ] Direkter Beleg und Schlussfolgerung stehen getrennt.
- [ ] Unbelegte Behauptungen sind nicht `verified`.
- [ ] Der nächste Check ist kleiner als ein vollständiger Projektlauf.
- [ ] Geheimnisse, Kundendaten und private Logs fehlen.
- [ ] Die Übergabe nennt verbleibende Ungewissheit.

Bewahre Eingaben, Prüftabelle, Lösungsschlüsselvergleich, Reviewer-Notizen und Endstatus auf. Bis Lernerlauf und unabhängiges Review dokumentiert sind, bleibt das Lab `draft / not_run`. Übertrage die Tabelle auf Engineering, Forschung oder eine Veröffentlichung.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab-Navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-002-task-protocol-DE.md" aria-label="Vorheriges Lab: Lab 002 · Einen Wunsch in ein Aufgabenprotokoll verwandeln">← Vorheriges<br><strong>Lab 002 · Aufgabenprotokoll</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="../table-of-contents-DE.md" aria-label="Zum deutschen Inhaltsverzeichnis: Lab 004 ist noch nicht übersetzt">Nächstes Lab in Arbeit →<br><strong>Verfügbarkeit von Lab 004 ansehen</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
