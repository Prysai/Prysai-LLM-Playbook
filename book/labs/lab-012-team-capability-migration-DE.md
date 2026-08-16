<!-- content_id: lab-012-team-capability-migration | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-012-team-capability-migration
title: "Eine persönliche Methode in Teamfähigkeit überführen"
level: L6
domain: team
goal: "Eine Methode so paketieren, dass zwei Personen sie reproduzieren, prüfen, aktualisieren und zurückrollen können"
setup: "Eine fiktive Wochenberichtsaufgabe, zwei anonyme Rollen und keine echten Organisationssysteme"
task: "v0.1 erstellen, zwei Reproduktionen mit frischem Kontext ausführen, eine Anforderung in v0.2 ändern und Wirkung sowie Rollback prüfen"
evidence: ["Zwei Paketversionen mit Eigentümer, Rechten und Abnahme", "Zwei unabhängige Laufprotokolle mit Eingabe-hash, Ausgaben und Punkten", "Diff, Wirkungsmatrix, Rollback-Ergebnis und Liste unbestätigter Punkte"]
failure_variant: "Eigentümer, Eingabequelle, Berechtigungsgrenze oder Abnahmeregel entfernen oder Zielgruppe ändern, ohne Abnahme zu ändern"
reflection: "Welches Wissen lag nur im Gedächtnis einer Person und was würde das Paket unsicher vererbbar machen?"
status: draft
last_verified: "not run"
transfer_task: "Das Paketformat auf einen risikoarmen Engineering-, Recherche- oder Inhaltsablauf anwenden"
transfer_domain: "Team-Engineering, Recherche oder Inhaltsbetrieb"
transfer_evidence: "Paketversionen, Rechte-Matrix, unabhängige Läufe, Diff, Wirkung, Rollback und Review-Notizen aufbewahren"
transfer_limitations: "Eine statische Simulation beweist weder Kontozugang noch Produktionsintegration oder organisatorische Annahme"
---

# Lab 012: Eine persönliche Methode in Teamfähigkeit überführen

## Lernziel

Ersetze private Intuition und Chatverlauf durch einen versionierten Vertrag, den eine andere Person sicher ausführen kann.

## Vorbereitung

Nutze eine fiktive Wochenberichtsaufgabe und zwei anonyme Rollen. Keine echten Konten, Namen, Kundendaten, internen Kennzahlen, gemeinsamen Systeme oder Produktions-Repositories. Erstelle `v0.1` mit Zweck und Nichtzielen, Eigentümer und Reviewrhythmus, Ein- und Ausgabeschema, Rechte-Matrix und verbotenen Aktionen, Vorgehen und Stopps, positiven/Grenz-/Fehler-/Transferprüfungen sowie Rollback-Ziel.

## Unabhängige Reproduktion

A und B erhalten dasselbe Paket in frischem Kontext und dürfen den Chatverlauf des Autors nicht verwenden. Beide notieren Eingabe-hash, `run_id`, Entscheidungen, Ausgabe, Unsicherheiten und Punktzahl. Vergleiche die Läufe, ohne Unterschiede stillschweigend auszugleichen. Ändere eine echte Anforderung für `v0.2` und dokumentiere Diff, betroffene Verbraucher, Migrationsentscheidung, Kompatibilitätsanspruch und Rollback-Prüfung.

## Fehler, Abnahme und Transfer

Entferne Eigentümer, Eingabequelle, Berechtigungsgrenze oder Abnahmeregel. Das korrekte Ergebnis ist, die Migration zu stoppen und den fehlenden Vertrag zu notieren. Ändere die Zielgruppe in `v0.2`, aber nicht die Abnahmekriterien: Das Review muss den Kompatibilitätsanspruch ablehnen oder neue Evidenz verlangen.

- [ ] Zwei Personen reproduzierten die Aufgabe aus frischem Kontext.
- [ ] Eingaben, Ausgaben, Rechte und Eigentümer sind explizit.
- [ ] Unterschiede der Läufe sind erklärt, nicht wegmittelt.
- [ ] Für die Versionsänderung gibt es Wirkung und Rollback.
- [ ] Es wurden keine echten Konten, Produktionssysteme oder vertraulichen Eingaben genutzt.

Bewahre beide Versionen, hashes, Rechte-Matrix, unabhängige Protokolle, Bewertungsnotizen, Diff, Wirkungsmatrix, Rollback und unbestätigte Punkte auf. Bis das vorliegt, ist die L6-Fähigkeit unbewiesen. Übertrage sie danach auf einen lokalen risikoarmen Ablauf und frage, was vorher nur im Gedächtnis einer Person lag und was in sechs Monaten unsicher zu übernehmen wäre.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-011-gpt-codex-boundaries-DE.md">← Vorheriges<br><strong>Lab 011 · GPT, Codex, Tools und Agents trennen</strong></a></td><td align="right"><a data-lab-nav="next" href="../README-DE.md">Nächstes Lab in Arbeit →<br><strong>Verfügbarkeit von Lab 013 ansehen</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
