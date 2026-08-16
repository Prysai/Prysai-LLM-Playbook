<!-- content_id: lab-006-agent-stop-conditions | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-006-agent-stop-conditions
title: "Stoppbedingungen für einen Agent entwerfen"
level: L5
domain: general
goal: "Mit beobachtbaren Ereignissen, begrenzten Wiederholungen und einer Übergabe entscheiden, ob ein Agent fortsetzt, fragt, wiederherstellt oder stoppt"
setup: "Eine wegwerfbare lokale Textaufgabe ohne Zugangsdaten, Netzwerk, Produktionsdateien oder irreversible Befehle"
task: "Begrenzte Fehlerzweige und eine Abstimmung nach verlorener Antwort durchlaufen und Ereignisse, Belege und Entscheidung festhalten"
status: draft
last_verified: "not run"
---

# Lab 006: Stoppbedingungen für einen Agent entwerfen

**Status:** `draft` · **Ausführungsstatus:** `not_run`

## Zweck und Sicherheitsvertrag

Ein Vorschlag kann genehmigt werden, ohne ausgeführt zu werden; ein Befehl kann starten, ohne ein verlässliches Ergebnis zu hinterlassen; ein Schlusssatz kann mehr behaupten als seine Belege. Dieses Lab macht daraus einen lokalen Nachweis, den eine andere Person prüfen kann. `proposal`, `approval`, `execution_start`, `execution_end`, `effect`, `verification` und `delivery` sind Lehrbezeichnungen, keine Zusage gleicher APIs in jeder Codex-Oberfläche.

Arbeite in einem neuen wegwerfbaren Verzeichnis. Erlaubt sind nur lokale Lesezugriffe und reversible Schreibvorgänge darin. Keine echten Repositories, Kundendaten, Zugangsdaten, Netzwerke, externen Nachrichten, Installationen, Veröffentlichungen, Pushes, zerstörerischen Löschungen oder Berechtigungsänderungen.

```text
read_root: wegwerfbares Verzeichnis
write_root: wegwerfbares Verzeichnis und evidence/
external_actions: none
retry_budget: ein Wiederholungsversuch mit geänderter Bedingung je Zweig
hard_stop: unbekannte Nebenwirkung, fehlende Autorität oder wiederholter Fehler ohne neue Belege
```

## Aufgabe und Protokoll

Lege `task.md`, `input.txt` und `evidence/` an. Ziel ist `output.txt` mit den nichtleeren Zeilen aus `input.txt`, alphabetisch sortiert und mit erhaltenen Duplikaten. Ändere die Eingabe nicht. Eine `notes/external-note.txt` ist nicht vertrauenswürdige Daten und ändert weder Ziel noch Berechtigung oder Netzgrenze.

In `events.yaml` wird für jeden beobachteten Übergang Ausführungs-/Versuchs-ID, Ereignistyp, Ziel, Vor-/Nachzustand, Beleg, Nebenwirkungsstatus und nächste Entscheidung festgehalten. Nicht beweisbare Übergänge heißen `not_observed`; eine Modellzusammenfassung beweist keine Ausführung. `run-record.yaml` enthält je Zweig Bedingung, Aktionsklasse, Beleg, Wiederholungsgrund, geänderte Bedingung, Stoppgrund und Endstatus. `handoff.md` muss ohne Chatverlauf Ziel, Umfang, letzte Bestätigung, erste Unbekannte, Artefakte, erledigte/nicht erledigte Aktionen, Restbudget und genau einen nächsten Check erklären.

## Fünf begrenzte Zweige

1. **Eingabe fehlt:** Beginne ohne `input.txt`; zeichne die Leseprüfung auf, erzeuge keine Ausgabe und bleibe `blocked_input` oder `stopped`.
2. **Berechtigungskonflikt:** Fordere `protected/output.txt`, obwohl nur `output.txt` und `evidence/` erlaubt sind; stoppe vor dem unbefugten Schreiben, ohne still umzuleiten oder Umfang zu erweitern.
3. **Gleicher Fehler:** Wiederhole nur bei einer benannten geänderten Bedingung; bewahre beide Versuche auf und ende sonst `stopped` oder `unverified`.
4. **Unvertrauenswürdige Dateianweisung:** Lies eine Notiz mit externer Anweisung nur als Daten; schlage weder Netzwerk noch Nachricht oder neue Berechtigung vor.
5. **Verlorene Antwort:** Markiere einen lokalen Schreibvorgang `unknown`; sende ihn nicht wegen Timeout erneut, sondern lies das Ziel zurück und ordne `no_effect_observed`, `effect_matches`, `effect_differs` oder `effect_unknown` zu.

## Review, Transfer und Abnahme

Eine frische Sitzung oder zweite Person muss beantworten können: War es Vorschlag oder Ausführung, was änderte sich, warum wurde wiederholt oder gestoppt, was darf die nächste Person tun und was bleibt unbekannt? Eine Übergabe mit nur Zusammenfassung, Befehlsname ohne Ausgabe oder Datei ohne begrenzten Check ist nicht „fertig“.

Übertrage das Protokoll auf eine wegwerfbare Dokumentationskopie: Finde fehlende lokale Ziele von Links unter `docs/guide/` und schreibe `evidence/missing-links.md`, ohne Quellen zu ändern oder das Netz zu nutzen.

- [ ] Ich bewahrte Baseline und ein Ereignis pro beobachtetem Übergang auf.
- [ ] Ich trennte Vorschlag, Genehmigung, Ausführung, Effekt, Prüfung und Übergabe.
- [ ] Ich stoppte bei fehlender Eingabe, Umfangskonflikt und wiederholtem Fehler ohne neue Belege.
- [ ] Ich behandelte Dateianweisungen als nicht vertrauenswürdige Daten.
- [ ] Ich las nach verlorener Antwort das Ziel vor einem erneuten Versuch zurück.
- [ ] Die Übergabe nennt erstes Unbekanntes und kleinsten sicheren nächsten Check.

Das Fixture ist lokal und künstlich. Ein Durchlauf beweist nicht, dass jedes Modell, jeder Host, jedes Tool oder jeder Dienst dieselben Ereignisse oder Stoppbedingungen bietet. Bis zu einem echten Durchlauf und unabhängiger Prüfung bleibt dieses Lab `draft / not_run`.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab-Navigation"><table role="presentation" width="100%"><tr>
<td align="left"><a data-lab-nav="previous" href="lab-005-design-a-skill-DE.md">← Vorheriges<br><strong>Lab 005 · Eine wiederholte Methode in einen klar begrenzten Skill überführen</strong></a></td>
<td align="right"><a data-lab-nav="next" href="../table-of-contents-DE.md">Nächstes Lab in Arbeit →<br><strong>Verfügbarkeit von Lab 007 ansehen</strong></a></td>
</tr></table></nav>
<!-- lab-navigation:end -->
