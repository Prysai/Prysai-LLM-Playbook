# Universal-Seam-Übungsset v1

Diese kleine, fiktive Offline-Übung gehört zur ersten Route des universellen Kerns. Eine sichtbare Antwort, ein Branch-Name, ein werkzeugähnlicher Block oder ein erfolgreiches Parsen **beweisen für sich genommen nicht**, dass Aufgabe, Ziel, Aktion oder strukturierter Zustand stimmen.

Es gibt kein Konto, keinen Modellaufruf, keine Netzwerkanfrage, keine Zugangsdaten, kein echtes Repository, keine Dateiänderung, keinen Befehl, Commit, Push, keine Veröffentlichung und keine externe Nebenwirkung. Die Einträge sind fiktives Originalmaterial des Projekts, keine Anbieterprotokolle.

## Deine Aufgabe

Prüfe jeden Eintrag in `cases.json`: Benenne die genaue Abweichung, formuliere die kleinste sichere Prüfung und halte die Bedeutung des Status eng.

| Status | Bedeutung in diesem festen Übungsset |
| --- | --- |
| `verified_in_fixture` | Die gegebenen lokalen Werte belegen die genannte Abweichung direkt. |
| `blocked` | Ziel- oder Berechtigungshinweise widersprechen sich; der nächste Schritt muss stoppen. |
| `not_run` | Es liegt kein Ausführungsbeleg vor; keine Aktion ist gezeigt. |
| `inferred` | Es gibt eine Differenz, doch für eine echte Diagnose ist ein Plattformadapter nötig. |

Im Repository-Stamm ausführen:

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py scripts\validate_universal_seam_fixture.py
& $py scripts\test_universal_seam_fixture.py
```

Die Befehle prüfen nur den festen Vertrag und seine Grenztests. Sie kontaktieren kein Modell und keinen Dienst.

## Begrenzte Protokollkarte

```text
Aufgabe: Eine Naht in einem vorgegebenen fiktiven Eintrag einordnen.
Zuerst lesen: cases.json und expected/acceptance.json.
Erlaubt: Feste Werte vergleichen und eine lokale Entscheidungsnotiz schreiben.
Nicht verwenden: Netzwerk, Konto, Geheimnis, echtes Repository, Live-Werkzeug, Befehl, Commit, Push oder Veröffentlichungsziel.
Akzeptanz: Abweichung, unbelegte Folgerung, kleinste sichere Prüfung, Stoppbedingung und den vorgegebenen engen Status nennen.
Beleg: Fall-ID, beobachtete Felder, Entscheidung, Liste ungeprüfter Punkte und ob künftig ein Plattformadapter nötig ist.
Stopp: Echtes Produktverhalten, Berechtigung, Schema oder externer Zustand nötig.
```

## Was ein bestandener Test nicht zeigt

Ein Bestand zeigt nur, dass feste fiktive Einträge dem Akzeptanzvertrag entsprechen. Er belegt weder externe Probleme noch Plattformverhalten, eine ausgeführte Aktion, Lerntransfer, Sicherheit, Portabilität oder Release-Reife.
