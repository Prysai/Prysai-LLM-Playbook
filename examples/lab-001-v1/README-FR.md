# Lab 001 v1 — Fixture de première modification sûre

Cette petite fixture synthétique accompagne le [Lab 001](../../book/labs/lab-001-first-safe-task-FR.md).
Elle ne contient ni projet réel, ni historique Git, ni identifiant, ni requête
réseau, ni installation, ni compte, ni appel de modèle, ni effet externe.

## Ce que vous allez modifier

Copiez **tout** ce dossier dans un répertoire temporaire. Dans la copie, lisez
`seed/README.md`, puis ne modifiez que ce fichier. Ne touchez ni à
`verify_readme.py`, ni à `expected/acceptance.json`.

Le contrat d’acceptation indique la correction attendue : la commande d’aperçu
doit mentionner le port `8080` et le README doit donner l’URL locale. Comparez
les éléments fixes du contrat ; ne déduisez pas une commande à partir d’une
réponse de modèle.

## Exécuter la fixture

Dans la copie, ouvrez `seed/README.md` et `expected/acceptance.json` côte à côte.

1. Avant de modifier quoi que ce soit, constatez que le README ne contient pas
   le port et l’URL locale exigés.
2. Effectuez l’unique correction autorisée dans le README.
3. Vérifiez que toutes les valeurs de `required_readme_strings` sont présentes :
   contrôle manuel `3/3`.

Ce contrôle manuel est le chemin par défaut. Il ne demande ni compte, ni paquet,
ni installation, ni dépôt Git, ni réseau.

Si Python 3 fonctionne déjà sur votre machine, vous pouvez aussi lancer
`python .\seed\verify_readme.py` dans un terminal ouvert dans la copie. Le
premier résultat doit être `FIRST_SAFE_CHANGE_FAILED` ; après la correction
autorisée, il doit être `FIRST_SAFE_CHANGE_OK`. N’installez pas Python pour
obtenir ce signal supplémentaire.

## Fiche de tâche bornée

```text
Objectif : corriger les instructions d’aperçu local dans seed/README.md.
Sandbox : <le dossier lab-001-v1 copié temporairement>.
À lire d’abord : seed/README.md et expected/acceptance.json.
Modification autorisée : seed/README.md uniquement, après présentation d’un plan.
Interdit : modifier le vérificateur ou le fichier d’acceptation ; installer ;
  utiliser le réseau ; lire des secrets ; commit ; envoyer vers un dépôt distant ;
  publier ; contacter quelqu’un ; modifier un autre fichier.
Acceptation : confirmer manuellement required_readme_strings 3/3 ; si Python est
  déjà disponible, le vérificateur fourni renvoie aussi FIRST_SAFE_CHANGE_OK.
Reçu : résultat initial, plan, diff exact du README, second résultat du contrôle
  et liste explicite de ce qui reste non vérifié.
Arrêt : la copie locale, la cible ou la source d’acceptation est indisponible.
```

## Ce que signifie le résultat

La fixture et un éventuel succès local établissent seulement le comportement de
ce vérificateur synthétique et fixe sur cette forme de README. Ils ne montrent
pas qu’une personne a terminé l’exercice, qu’un modèle a suivi la fiche, qu’une
commande d’un projet réel est correcte ou que la méthode se transfère à une
autre tâche.
