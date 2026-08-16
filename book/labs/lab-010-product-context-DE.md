<!-- content_id: lab-010-product-context | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-010-product-context
title: "Gemeinsamen Produktkontext erstellen, der zwei Aufgaben übersteht"
level: L3
domain: marketing
goal: "Einen kleinen versionierten Produktbestand erstellen, der Wiederholungen verringert und Fakten, Annahmen, Positionierungsentscheidungen sowie fehlende Evidenz getrennt hält"
setup: "Ein fiktives oder bereinigtes Produkt, zwei risikoarme Marketingaufgaben und eine versionierte Produktkontext-Datei ohne Verbindung zu laufenden Kampagnen"
task: "Minimalen Kontext bauen, ihn für Produkterklärung und Messplan nutzen, eine Positionierungsentscheidung ändern und die daraus entstehenden Unterschiede prüfen"
evidence:
  - "Zwei Versionen des Produktkontexts mit Herkunft, Zuversicht, Verantwortlichkeit und Prüftermin je Feld"
  - "Eine Produkterklärung und ein Messplan, die die verwendeten Felder und Annahmen benennen"
  - "Der Diff der Positionierungsentscheidung, nachgelagerte Ausgabe-Diffs, Begründung der Kennzahlen und offene Evidenzlücken"
failure_variant: "audience oder target_action entfernen und prüfen, dass fehlender Kontext angefordert wird statt Segment, Zitat oder Kennzahl zu erfinden"
reflection: "Welche Felder wurden wiederverwendet, welche Änderung beeinflusste eine echte Entscheidung, und wo versteckte glatte Sprache schwache Evidenz?"
status: draft
last_verified: "not run"
transfer_task: "Denselben Minimalkontext-Vertrag auf ein bereinigtes Engineering-Tool, einen Forschungsdienst oder ein internes Inhaltsprojekt übertragen"
transfer_domain: "Produktentwicklung, Forschungsdienste, Inhalte oder Marketing"
transfer_evidence: "Kontextrevisionen, Herkunft, Annahmen, zwei Aufgabenausgaben, Diffs, Kennzahlengrenzen und Verhalten bei fehlenden Feldern aufbewahren"
transfer_limitations: "Gemeinsamer Kontext senkt Wiederholung, belegt aber weder Faktenwahrheit noch echte Kundensprache, Marktreaktion, Attribution oder strategische Freigabe"
---

# Lab 010: Gemeinsamen Produktkontext erstellen, der zwei Aufgaben übersteht

## Lernziel

Erstelle eine kleine Quelle für Produktinformationen, die zwei unterschiedliche Aufgaben wiederverwenden können. Ziel ist Konsistenz mit sichtbarer Unsicherheit – kein großes Brand-Handbuch und keine flüssigere Wiederholung unbelegter Positionierung.

## Vorbereitung

Nutze ein fiktives Produkt oder bereinigte öffentliche Informationen. Verwende keine Kundenliste, private Forschung, internen Umsatz, unveröffentlichte Strategie oder personenbezogenen Daten. Die Übung darf keine Verbindung zu E-Mail, Werbung, Analytics, CRM, Veröffentlichung oder laufenden Websites herstellen.

Lege `product-context-v1.md` mit diesen Feldern an:

```text
product:
audience:
problem:
alternative:
difference:
proof:
objections:
customer_language:
voice:
target_action:
non_goals:
```

Ergänze bei jedem Feld `source`, `status: fact | assumption | decision | unknown`, `confidence`, `owner` und `next_review`. Fehlende Evidenz bleibt leer. Eine Annahme darf nicht in ein Kundenzitat verwandelt werden.

## Aufgabe und Experiment

Verwende denselben Kontext für zwei Aufgaben:

1. Schreibe eine knappe Produkterklärung für die genannte Zielgruppe.
2. Entwirf einen Messplan für eine echte Entscheidung, etwa ob Lesende das Produkt gut genug verstehen, um den nächsten Schritt zu wählen.

Beide Ausgaben müssen genutzte Kontextfelder, getroffene Annahmen und noch zu prüfende Fakten aufführen. Notiere für jede Kennzahl Zielhandlung, Datenquelle, Beobachtungsfenster, Entscheidungsregel und Grenze. Eine vorgeschlagene Kennzahl ist ein Plan, kein gemessenes Ergebnis.

Ändere danach eine Positionierungsentscheidung, erhöhe die Kontextversion, begründe die Änderung und erzeuge beide Ausgaben erneut. Vergleiche Kontext-Diff und Ausgabe-Diff. Trenne Änderungen, die die Entscheidung verlangt, von bloßer Textvariation.

## Evidenz und Fehlerfall

Bewahre beide Kontextversionen, Feldherkunft, Änderungsgrund, beide Aufgaben in beiden Versionen, Diffs, Kennzahlenkarte und offene Felder auf. Ein kürzerer Prompt genügt nicht als Beleg: Zeige, welche wiederholten Fakten nicht mehr erklärt werden mussten und ob die zweite Aufgabe sie korrekt nutzte.

Entferne entweder `audience` oder `target_action` und fordere beide Ausgaben erneut an. Korrekt ist, die fehlende Entscheidung zu benennen, die Ausgabe einzugrenzen oder danach zu fragen. Ein Segment, Kundenzitat, Conversion-Ereignis oder Marktergebnis zu erfinden lässt das Lab scheitern – auch wenn der Text überzeugend klingt.

## Abnahmeliste

- [ ] Fakten, Annahmen, Entscheidungen und Unbekanntes sind sichtbar getrennt.
- [ ] Jedes wesentliche Feld hat Herkunft, verantwortliche Person und Prüfstatus.
- [ ] Beide Aufgaben verwenden eine Kontextrevision und nennen die verwendeten Felder.
- [ ] Die Positionierungsänderung hat einen Grund und einen prüfbaren nachgelagerten Diff.
- [ ] Kennzahlen sind einer Entscheidung zugeordnet und nicht als beobachtete Ergebnisse beschrieben.
- [ ] Es gab keine echte Veröffentlichung, Ansprache, Nachverfolgung, Ausgabe oder Nutzung privater Daten.

## Rückblick und Transfer

Welche Felder verringerten wiederholte Erklärungen tatsächlich? Welches Feld führte zur größten nachgelagerten Entscheidungsänderung? Übertrage den Kontext in einen anderen Bereich, entferne reines Marketingvokabular und notiere, was bestehen bleibt und was eine neue verantwortliche Person oder Evidenzquelle braucht. Gemeinsamer Kontext verringert Wiederholung, beweist aber keine Fakten, echte Kundensprache, Marktreaktion, Attribution oder strategische Freigabe.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab-Navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-009-engineering-lifecycle-DE.md" aria-label="Vorheriges Lab: Lab 009 · Direkte Umsetzung mit einem vollständigen Engineering-Lebenszyklus vergleichen">← Zurück<br><strong>Lab 009 · Direkte Umsetzung mit einem vollständigen Engineering-Lebenszyklus vergleichen</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-011-gpt-codex-boundaries-DE.md" aria-label="Nächstes Lab: Lab 011 · GPT, Codex, Tools und Agents trennen">Weiter →<br><strong>Lab 011 · GPT, Codex, Tools und Agents trennen</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
