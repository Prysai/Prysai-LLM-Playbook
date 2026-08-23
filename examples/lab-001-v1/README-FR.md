# Lab 001 v1 — Fixture pour une première modification sûre

Cette petite fixture synthétique accompagne le [Lab 001](../../book/labs/lab-001-first-safe-task-FR.md). Elle ne contient ni projet réel, ni historique Git, ni identifiant, ni requête réseau, ni installation, ni compte, ni appel de modèle, ni effet externe.

## Ce que vous allez modifier

Copiez **tout ce dossier** dans un emplacement temporaire. Dans cette copie,
ouvrez `seed/README.md` et ne modifiez que ce fichier. Ne modifiez ni
`verify_readme.py`, ni `expected/acceptance.json`.

Le contrat d’acceptation indique la correction à effectuer : la commande de
prévisualisation doit mentionner le port `8080`, et le README doit mentionner
l’URL locale. Comparez ces éléments avec la source d’acceptation locale ; ne
devinez pas la commande à partir d’une réponse de modèle.

## Déroulement

Dans la copie, ouvrez `seed/README.md` et `expected/acceptance.json` côte à côte.

1. Avant toute modification, constatez que le README ne contient ni le port
   requis ni l’URL locale.
2. Effectuez l’unique correction autorisée dans le README.
3. Vérifiez que toutes les valeurs de `required_readme_strings` sont présentes :
   le contrôle manuel doit donner `3/3`.

Si Python 3 est déjà disponible, vous pouvez aussi ouvrir un terminal dans la
copie et lancer :

```powershell
python .\seed\verify_readme.py
```

Le premier résultat attendu est `FIRST_SAFE_CHANGE_FAILED`. Après la correction
autorisée, il doit devenir `FIRST_SAFE_CHANGE_OK`. N’installez pas Python
uniquement pour obtenir ce signal supplémentaire.

## Carte de tâche bornée

```text
Objectif : corriger les instructions de prévisualisation locale dans seed/README.md.
Sandbox : <le dossier lab-001-v1 copié temporairement>.
À lire d’abord : seed/README.md et expected/acceptance.json.
Modification autorisée : seed/README.md uniquement, après présentation d’un plan.
Interdit : modifier le vérificateur ou le fichier d’acceptation, installer,
  utiliser le réseau, lire des secrets, créer un commit, envoyer vers un dépôt
  distant (`push`), publier, contacter quelqu’un ou modifier un autre fichier.
Acceptation : confirmer manuellement `required_readme_strings 3/3` ; si Python
  est déjà disponible, le vérificateur fourni renvoie aussi `FIRST_SAFE_CHANGE_OK`.
Reçu : état initial, plan, diff exact du README, second résultat du contrôle et
  liste explicite des éléments non vérifiés.
Arrêt : la copie locale, la cible ou la source d’acceptation est introuvable.
```

## Ce que signifie un résultat positif

La fixture et le contrôle local établissent seulement le comportement de ce
vérificateur synthétique fixe sur cette structure de README. Ils ne prouvent
ni qu’un apprenant a terminé l’exercice, ni qu’un modèle a suivi la carte, ni
que la commande convient à un projet réel, ni que la méthode se transfère à
une autre tâche.
