# Product Context → Leitfaden für den ersten Kauf

Diese entbehrliche lokale Sandbox zeigt die begrenzte Kette des Skills
`prysai-product-context`:

```text
synthetisches Briefing → Kontextentwurf → Designübergabe → statischer Kaufratgeber → Browseransichten
```

Sie ist kein Immobilienangebot, keine Kundenauslieferung, Marktstudie,
Beratungsleistung oder Lead-Seite. Es gibt keine echten Bestände, Personen,
Kundenzitate, Marktstatistiken, Analysen, Formulare, externen Bilder,
Webfonts, CDN, API oder Kontoverbindung.

Eine frühe Fassung wurde bei der Sichtprüfung abgelehnt, weil sie allgemeine
Lifestyle-Dekoration und eine fiktive Angebotskarte nutzte. Ohne echte Belege
oder Ressourcen gilt: hilfreiche Entscheidungsunterstützung geben, keine
Atmosphäre erfinden.

## Lokal ausführen

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py -m http.server 4182
```

Öffne `http://127.0.0.1:4182/examples/skill-sandbox/product-context-real-estate/`.

## Prüfen

- `brief.md`: fiktive Eingabe.
- `context-draft.md`: nicht autoritative Kontextausgabe, Übergabe und abgelehnte Muster.
- `index.html` und `styles.css`: nachgelagerter Leitfaden.
- `scripts/capture_case_screenshots.mjs`: reproduzierbare Edge-Ansichten.
- `assets/cases/` und der Fallbericht: Belege und Nicht-Behauptungen.

Der Entwurf erlaubt weder Veröffentlichung noch einen kanonischen
Produktkontext-Eintrag. Er bleibt ein `candidate`-Lehrmaterial.
