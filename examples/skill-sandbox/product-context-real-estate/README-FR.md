# Contexte produit → guide fictif pour un premier achat

Cette sandbox locale et temporaire montre la chaîne bornée du Skill
`prysai-product-context` :

```text
brief synthétique → brouillon de contexte → transmission au design
→ guide statique → captures du navigateur
```

Ce n’est ni une annonce immobilière, ni un livrable client, ni une étude de
marché, ni un service de conseil, ni une page de collecte de prospects. Elle ne
contient aucun bien disponible, personne réelle, témoignage client,
statistique de marché, outil d’analyse, formulaire, image externe, police web,
CDN, API ou compte connecté.

Une première version a été refusée lors d’une revue visuelle : elle ajoutait
une décoration générique et une fiche de bien fictive. La règle corrigée est
simple : sans preuve ni ressource réelle, fournir une aide à la décision utile
plutôt qu’une ambiance inventée.

## Exécuter localement

Depuis la racine du dépôt :

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py -m http.server 4182
```

Ouvrez ensuite `http://127.0.0.1:4182/examples/skill-sandbox/product-context-real-estate/`.

## Inspecter

- `brief.md` : entrée fictive ;
- `context-draft.md` : sortie de contexte non autoritative, transmission et
  motifs refusés ;
- `index.html` et `styles.css` : guide produit en aval ;
- `scripts/capture_case_screenshots.mjs` : captures Edge reproductibles ;
- `assets/cases/` et la fiche de cas liée : preuves et non-affirmations.

Le brouillon n’autorise ni publication ni écriture dans le contexte canonique.
Cette sandbox reste un matériel pédagogique `candidate`.
