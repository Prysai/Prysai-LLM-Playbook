# Lab 001 v1 — Fixture für die erste sichere Änderung

Dieses kleine synthetische Fixture gehört zu [Lab 001](../../book/labs/lab-001-first-safe-task-DE.md). Es enthält kein echtes Projekt, keinen Git-Verlauf, keine Zugangsdaten, kein Netzwerk, keine Installation, kein Konto, keinen Modellaufruf und keine externe Nebenwirkung.

## Was du änderst

Kopiere dieses **gesamte Verzeichnis** an einen entbehrlichen Ort. Prüfe dort `seed/README.md` und ändere nur diese Datei. Bearbeite weder `verify_readme.py` noch `expected/acceptance.json`.

Der Akzeptanzvertrag verrät die Korrektur: Der Vorschau-Befehl muss Port `8080` nennen, und die README muss die lokale URL nennen. Vergleiche feste lokale Belege; rate nicht anhand einer Modellantwort.

## Ablauf

Öffne in der Kopie `seed/README.md` und `expected/acceptance.json` nebeneinander.

1. Stelle fest, dass Port und lokale URL fehlen.
2. Führe die eine erlaubte README-Änderung durch.
3. Prüfe alle `required_readme_strings`; die manuelle Prüfung lautet `3/3`.

Wenn Python 3 bereits vorhanden ist, kannst du `python .\seed\verify_readme.py` ausführen. Zuerst erscheint `FIRST_SAFE_CHANGE_FAILED`, danach `FIRST_SAFE_CHANGE_OK`. Installiere Python nicht nur für dieses Signal.

## Begrenzte Aufgabenkarte

```text
Ziel: Die lokale Vorschauanleitung in seed/README.md korrigieren.
Zuerst lesen: seed/README.md und expected/acceptance.json.
Erlaubte Änderung: Nach einem Plan nur seed/README.md.
Nicht: Verifier oder Akzeptanzdatei ändern, installieren, Netzwerk nutzen, Geheimnisse lesen, committen, pushen oder veröffentlichen.
Beleg: Ausgangslage, Plan, genauer Diff, zweites Ergebnis und ungeprüfte Liste.
Stopp: Lokale Kopie, Ziel oder Akzeptanzquelle fehlt.
```

Ein Erfolg gilt nur für diesen festen synthetischen Prüfer. Er beweist weder Lernabschluss noch Modellverhalten, echten Befehl oder Transfer.
