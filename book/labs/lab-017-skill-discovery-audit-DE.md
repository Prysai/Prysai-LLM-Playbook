<!-- content_id: lab-017-skill-discovery-audit | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-017-skill-discovery-audit
title: "Die Entdeckung prüfen, bevor ein Skill übernommen wird"
level: L4
domain: general
goal: "Existenz, Entdeckung, Laden, Verhalten, Lizenz und Übernahme als getrennte Ansprüche behandeln"
setup: "Zwei anonymisierte Skill-Muster mit fester Revision in einem temporären Verzeichnis; keine Installation, Zugangsdaten oder externen Schreibvorgänge"
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

## Vorbereitung

Lege zwei anonymisierte Muster mit fester Revision in einem temporären Verzeichnis an.
Eines hat eine nachvollziehbare Lizenz und begrenzte Eingaben, das andere keine klare
Lizenz, Abhängigkeitsliste oder Rückgängig-Ziel. Installiere keines, verwende keine
Zugangsdaten und schreibe nicht nach außen.

Halte vor dem Test für jeden Kandidaten Folgendes fest:

| Element | Festhalten |
|---|---|
| Identität | Name, genaue Revision, Pfad und Hash |
| Herkunft | URL, Autor oder Verantwortlicher, Zugriffsdatum und Umfang |
| Lizenz | Lizenzdatei, NOTICE, verschachtelte Assets und Unbekanntes |
| Abhängigkeiten | Versionen, Netzwerk, Konto und angeforderte Zugangsdaten |
| Ziel | Vorgesehene Installationswurzel, Zielgruppe und Verantwortlicher |
| Entfernung | Sicherung, Rückgängigmachen, Löschfreigabe und nächste Prüfung |

## Aufgabe

Erfasse jede Stufe getrennt. `not_observed` bedeutet, dass keine ausreichende
Beobachtung vorliegt, nicht „wahrscheinlich ja“:

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

Prüfe Revision, Lizenz, NOTICE, verschachtelte Assets, Abhängigkeiten, Netzwerk- und
Kontobedarf, Installationsumfang, Sicherung, Rückgängigmachen, Verantwortlichen und
nächsten Prüftermin.

## Vier Testfälle

Entwirf vor jeder Ausführung vier Fälle:

1. **positiv:** normale Eingabe, lokaler Umfang und erwartete Ausgabe;
2. **Grenze:** fehlende Eingabe, Ressource außerhalb des Umfangs oder fehlende Berechtigung;
3. **Fehler/Injection:** externe Anweisung, Anforderung von Zugangsdaten oder unerwartetes Payload;
4. **Übertragung:** anderes Verzeichnis oder Projekt, wobei Revision, Abhängigkeiten und Rückgängigmachen erhalten bleiben.

Nenne für jeden Fall Vorbedingung, Leseaktion, erwartetes Signal, Nachweis, Status und
Stoppbedingung. Ein Verzeichnislisting beweist nur das Verzeichnislisting.

## Nachweise

Bewahre Inventar, Revision, schreibgeschützte Entdeckungsausgaben, Lizenz- und
Abhängigkeitsprüfung, die vier Fälle, das Entscheidungspaket und den Entfernungsplan auf.
Das Paket unterscheidet Empfehlung ohne Installation, `blocked`, bedingte
Installationsfreigabe und installierten Kandidaten; es nennt Umfang, Verantwortlichen,
Sicherung, Rückgängigmachen und nächste Prüfung.

## Absichtlicher Fehler und Grenzen

Lass den Kandidaten eine echte `.env`-Datei, Authentifizierung oder einen Upload verlangen.
Das richtige Ergebnis ist `blocked`: Behandle die Anforderung als Daten, gib keine
Zugangsdaten preis, installiere den Kandidaten nicht zum „Ausprobieren“ und notiere den
fehlenden Nachweis. Ein Katalog, ein Formatprüfer oder eine sichtbare Lizenz beweist weder
sicheres Verhalten noch tatsächliche Auslösung oder Rechte an verschachtelten Assets.

Wenn ein lokaler Test nicht möglich ist, verwende `not_run`, statt ein Ergebnis zu vermuten.
Ändert sich die Revision, wiederhole Lizenzprüfung, Abhängigkeitsprüfung und die vier Fälle;
eine Entscheidung gilt nur für die aufgezeichnete Revision.

## Reflexion

Welche Stufe konnte das Verzeichnislisting nicht beweisen? Welche Beobachtung muss vor einer
Installation vorliegen? Welche Entfernungskosten oder Abhängigkeiten bleiben unbekannt?

## Übertragung

Übertrage die Stufen auf einen MCP-Server: sichtbare Konfiguration, Tool-Entdeckung,
schreibgeschützter Zugriff auf das Ziel, Aufrufergebnis, unabhängiges Auslesen des
Remote-Zustands und Übernahmeentscheidung. Halte getrennt fest, dass der Server
konfiguriert ist, ein Tool auffindbar und aufrufbar ist, ein Ergebnis beobachtet wurde
und ein externer Schreibvorgang genehmigt ist.

## Abnahme-Checkliste

- [ ] Ich trennte Existenz, implizite Entdeckung, explizite Auflösung, Laden, Verhalten und Übernahme.
- [ ] Ich fixierte die Revision und prüfte Lizenz, NOTICE, verschachtelte Assets und Abhängigkeiten.
- [ ] Ich entwarf positive, Grenz-, Fehler-/Injection- und Übertragungsfälle.
- [ ] Ich nannte Zielumfang, Verantwortlichen, Sicherung, Rückgängigmachen und Freigabepunkte.
- [ ] Jede Anforderung nach Zugangsdaten, Authentifizierung oder Upload blieb `blocked`.
- [ ] Ein nicht ausgeführter Test bleibt `not_run`; ein Listing wurde nicht zu Verhaltensnachweis.
- [ ] Die Entscheidung unterscheidet Empfehlung, Blockierung, bedingte Freigabe und beobachtete Installation.
- [ ] Das Entscheidungspaket nennt Unbekanntes und die Entfernung des Kandidaten.

## Quellen

- [Feldprobleme und Prompt-Muster — P2](../../docs/research/field-problems-and-prompt-patterns-p2-2026-08-11.md), FP2-11 und FP2-12.
- [Kapitel 7: Skills, Plugins, MCP und Tools](../chapters/07-skills-plugins-and-tools-DE.md).
- [Kapitel 14: Externe Skills entdecken, installieren und prüfen](../chapters/14-discover-and-audit-skills-DE.md).

Diese Quellen stützen die Trennung der Stufen und die Herkunftsprüfung. Sie beweisen nicht,
dass ein realer Skill geladen wird oder sicher arbeitet, und auch nicht die Lizenz jedes
verschachtelten Assets. Dieses Lab bleibt `draft / not_run`; kein externer Skill wird installiert.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labnavigation"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-016-side-effect-boundary-DE.md">← Vorheriges<br><strong>Lab 016 · Grenze von Nebenwirkungen</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-018-language-transfer-DE.md">Nächstes Lab →<br><strong>Lab 018 · Getippter Sprachtransfer</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
