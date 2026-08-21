# Fixture Universal Seam v1

Cette petite fixture fictive et hors ligne accompagne la première route
universelle. Elle enseigne une seule règle : une réponse visible, une étiquette
de branche, un bloc qui ressemble à un outil ou la réussite d’un parseur ne
prouvent pas à eux seuls la tâche, la cible, l’action ou l’état demandé.

La fixture n’utilise ni compte, ni appel de modèle, ni réseau, ni identifiant,
ni dépôt réel, ni modification de fichier, ni commande, ni commit, ni push, ni
publication, ni autre effet externe. Les catégories ont été inspirées par une
note de recherche datée ; les enregistrements eux-mêmes sont du contenu
original du projet.

## À faire

Pour chaque enregistrement de `cases.json`, relevez l’écart exact, écrivez le
contrôle sûr le plus petit et gardez le sens étroit de l’état fourni :

| État | Sens dans cette fixture fixe |
| --- | --- |
| `verified_in_fixture` | Les valeurs locales fournies établissent directement l’écart nommé. |
| `blocked` | La cible ou l’autorité contredit les éléments ; l’étape suivante doit s’arrêter. |
| `not_run` | Aucun reçu d’exécution n’est fourni ; aucune action n’est démontrée. |
| `inferred` | Un écart apparaît, mais un diagnostic en direct demanderait un adaptateur propre à la plateforme. |

Depuis la racine du dépôt, exécutez le vérificateur déterministe :

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py scripts\validate_universal_seam_fixture.py
& $py scripts\test_universal_seam_fixture.py
```

Ces commandes vérifient le contrat fixe et ses cas d’échec. Elles ne contactent
ni modèle ni service.

## Carte de reçu délimitée

```text
Tâche : classer une jonction dans l’enregistrement fictif fourni.
Lire d’abord : cases.json et expected/acceptance.json.
Action autorisée : comparer les valeurs fixes et écrire une note locale.
Interdit : réseau, compte, secret, dépôt réel, outil en direct, commande,
commit, push ou publication.
Acceptation : nommer l’écart, l’inférence non étayée, le plus petit contrôle,
la condition d’arrêt et l’état étroit fourni.
Reçu : identifiant du cas, champs observés, décision, inconnues et nécessité
d’un futur adaptateur de plateforme.
Arrêt : un comportement, une permission, un schéma ou un état externe réel
serait nécessaire pour continuer.
```

## Ce que cette fixture ne peut pas établir

Une réussite montre seulement que les enregistrements fictifs respectent le
contrat d’acceptation. Elle ne reproduit pas un rapport externe, ne prouve pas
qu’un problème est actuel, ne diagnostique pas une plateforme, ne montre pas
qu’une action a été exécutée et ne prouve ni apprentissage, ni portabilité, ni
sécurité, ni préparation à la production.
