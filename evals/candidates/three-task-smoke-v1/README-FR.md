# Smoke test à trois tâches v1

**Statut :** paquet de fixtures `candidate` · **Preuve d’exécution :** `not_run`

Ce paquet hors ligne commun sert aux chapitres 6 et 19. Donnez les mêmes trois
petites tâches à deux modèles ou workflows candidats avant de décider si une
évaluation plus large mérite le coût et le temps qu’elle demande.

La réussite du validateur local signifie seulement qu’une soumission respecte
le schéma figé et ses règles d’acceptation. Elle **ne prouve pas** la qualité,
le prix, la sécurité, l’utilité générale, les résultats d’apprentissage ni
l’existence d’un gagnant global.

## Conditions à garder fixes

- les identifiants, consignes, entrées synthétiques, sorties attendues et
  empreintes de `fixture.json` ;
- une seule variable de comparaison par tour : modèle, workflow ou surface ;
- le même contexte, les mêmes outils, permissions, conditions réseau, budget
  de temps et relecteur ;
- au plus une reprise contrôlée, annoncée avant le premier essai.

Les entrées pédagogiques sont originales et synthétiques : elles ne contiennent
ni données client, ni identifiants, ni journaux de production, ni texte issu
d’une source externe.

## Exécuter une tâche

1. Copiez sans les modifier la consigne et l’entrée à chaque candidat ;
   enregistrez les réponses brutes avant toute correction humaine.
2. Enregistrez chaque réponse localement sous le nom de fichier demandé.
3. Validez-la en local ; le validateur ne fait aucun appel réseau et n’appelle
   aucun modèle.

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py evals\candidates\three-task-smoke-v1\validate_submission.py `
  --task extract-01 `
  --submission <candidate-output>/candidate-a-extract-01.json
```

| Tâche | Soumission | Vérification |
| --- | --- | --- |
| `extract-01` | tableau JSON | extraction structurée sans faits inventés |
| `markdown-02` | fichier Markdown | transformation contrainte qui conserve l’inconnu |
| `gap-review-03` | objet JSON | revue des lacunes de preuve sans déclasser une preuve existante |

Pour deux candidats, conservez six soumissions indépendantes et notez les
conditions ainsi que les résultats du validateur dans
`run-record-template.yaml`. Les champs `not_run` sont des marqueurs à remplir,
pas des résultats.

## S’arrêter honnêtement

Utilisez `not_comparable` si une interruption, un blocage de permission, une
modification de l’empreinte d’entrée, une version d’outil différente ou une
autre variation d’une condition figée affecte un seul côté. Ne remplacez pas
une réponse interrompue par une reprise réussie. Même six réponses comparables
ne permettent qu’une décision limitée à ces tâches ; elles ne justifient pas
un classement général des modèles.

<!-- Evaluation fixture: original project material; no external source text. -->
