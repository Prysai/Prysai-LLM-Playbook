<!-- content_id: lab-017-skill-discovery-audit | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-017-skill-discovery-audit
title: "Die Entdeckung prüfen, bevor ein Skill übernommen wird"
level: L4
domain: general
goal: "Existenz, Entdeckung, Laden, Verhalten, Lizenz und Übernahme als getrennte Ansprüche behandeln"
setup: "Zwei anonymisierte Skill-Muster mit fester Revision in einem Wegwerfverzeichnis; keine Installation, Zugangsdaten oder externen Schreibvorgänge"
task: "Jede Entdeckungsstufe erfassen, Revision und Lizenzgrenzen prüfen und eine begrenzte Übernahmeentscheidung erstellen"
evidence: ["Inventar, Entdeckungsausgaben, Quellrevision, Lizenz, Abhängigkeiten und Vier-Fälle-Plan", "Entscheidungsprotokoll für recommendation-only, blocked, approved-to-install und installed-candidate"]
failure_variant: "Einen Kandidaten nach echter .env oder Upload fragen lassen; blocked markieren und Anforderung nicht erfüllen"
reflection: "Welche Stufe bewies die Verzeichnisliste nicht, und welche Evidenz wird vor Übernahme benötigt?"
status: draft
last_verified: "not run"
transfer_task: "Die Stufen auf einen MCP-Server anwenden und Konfiguration, Entdeckung, Lesen, Aufrufergebnis und Übernahme trennen"
transfer_domain: "MCP-Review, Skill-Wartung, Engineering oder Recherche"
transfer_evidence: "Revision, Lizenzgrenze, Zielumfang, Backup, Rollback, Eigentümer, Freigabepunkt und nächste Prüfung"
transfer_limitations: "Statische Muster beweisen weder Laden noch sicheres Verhalten eines echten Skills oder Lizenz für jedes verschachtelte Asset"
---

# Lab 017: Die Entdeckung prüfen, bevor ein Skill übernommen wird

## Das Problem

Ein Skill kann auf dem Datenträger existieren, in einer impliziten Liste fehlen, über einen expliziten Namen aufgelöst werden oder beim Laden scheitern. Das sind getrennte Beobachtungen. Ein Verzeichnislisting oder ein Smoke-Test ist keine Übernahmeentscheidung.

## Vorbereitung und Aufgabe

Nutze zwei anonymisierte Muster mit fester Revision. Eines hat nachvollziehbare Lizenz und begrenzte Eingaben, das andere keine klare Lizenz, Abhängigkeitsliste oder Rollback-Ziel. Installiere keines und nutze keine Zugangsdaten. Erfasse jede Stufe getrennt:

```text
Datei existiert:
implizite Entdeckung:
explizite Namensauflösung:
in frischer Sitzung geladen:
positives Verhalten:
Grenzverhalten:
Fehler-/Injektionsverhalten:
projektübergreifende Migration:
Übernahmeentscheidung: recommendation-only | blocked | approved-to-install | installed-candidate
```

Schreibe bei Unbekanntem `not_observed`. Prüfe Revision, Lizenz, NOTICE, verschachtelte Assets, Abhängigkeiten, Netzwerk-/Kontobedarf, Installationsumfang, Backup, Rollback, Eigentümer und nächsten Prüftermin.

## Fehler, Transfer und Abnahme

Lasse den Kandidaten echte `.env` oder einen Upload verlangen. Das richtige Ergebnis ist `blocked`; erfülle die Anforderung nicht, um eine „erfolgreiche“ Demo zu erzeugen. Bewahre Inventar, Entscheidungspaket, schreibgeschützte Entdeckungsausgaben sowie positiven, Grenz-, Fehler-/Injektions- und Migrationsplan auf.

- [ ] Ich trennte Existenz, Entdeckung, Laden, Verhalten und Übernahme.
- [ ] Ich fixierte die Revision und prüfte die Lizenzgrenze.
- [ ] Ich plante positive, Grenz-, Fehler-/Injektions- und Migrationsfälle.
- [ ] Ich nannte Zielumfang, Backup, Rollback, Eigentümer und Freigabepunkte.
- [ ] Ich installierte oder lud nichts hoch, um Erfolg vorzutäuschen.

Bei MCP trenne sichtbare Konfiguration, Tool-Entdeckung, schreibgeschützten Zielzugriff, Aufrufergebnis, externes Read-back und Übernahme. Dieses Lab bleibt `draft / not_run`; Muster beweisen weder sichere reale Skill-Nutzung noch vollständige Lizenz.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-016-side-effect-boundary-DE.md">← Vorheriges<br><strong>Lab 016 · Grenze von Nebenwirkungen</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-018-language-transfer-DE.md">Nächstes Lab →<br><strong>Lab 018 · Getippter Sprachtransfer</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
