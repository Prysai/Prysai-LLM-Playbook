<!-- content_id: universal-core-foundations-route | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-22-fr-boundary-check -->

# Travailler avec un LLM : une première tâche sûre et quatre fondations

**Statut :** `candidate`. **Exécution :** `not_run`.

Commencez ici si vous utilisez un chat textuel sans configuration de produit.
Cette route n’enseigne qu’une couche de décision commune : une tâche claire, un
matériel borné, un contrôle visible et une limite d’arrêt. Elle ne prétend pas
que ChatGPT, Claude, Gemini, Grok et Codex ont les mêmes outils, droits, tarifs,
comptes, mémoire ou comportements d’Agent.

## Essayez maintenant une tâche sûre

N’utilisez que cet avis fictif. Ne copiez ni message privé, ni donnée client,
ni secret, ni fichier réel. N’utilisez ni recherche ni outil et n’envoyez rien.

```text
Résultat : réécrivez cet avis d’association pour une nouvelle personne.
Matériel : « L’association se réunit mardi à 18 h. Apporte un carnet. La salle
sera confirmée plus tard. »
Format : deux phrases, tous les faits conservés, détails absents entre [crochets],
puis une liste des faits conservés.
Contrôle : comparez l’original et la réécriture. N’ajoutez ni heure, ni salle, ni
cotisation, ni contact, ni promesse.
Arrêt : ne naviguez pas, n’envoyez rien, ne publiez rien et n’inventez rien.
```

Vérifiez vous-même :

1. Pouvez-vous rattacher chaque phrase de la réécriture à l’avis fourni ?
2. La réponse respecte-t-elle la limite de deux phrases et énumère-t-elle les
   faits conservés ?
3. Un détail inconnu a-t-il été inventé au lieu de rester entre crochets ?

Si la réponse à la troisième question est oui, supprimez le détail ajouté ou
demandez une seule correction. Si le chat propose une recherche, un envoi, une
publication ou un outil, ou réclame plus de matière que cet exercice n’en
nécessite, arrêtez-vous. Un résultat bien écrit ne prouve ni la vérité des faits
ni un comportement identique sur chaque produit.

## Relier la première tâche aux quatre fondations

1. [Transformer une intention en contrat de tâche](../chapters/03-task-protocol-FR.md#core-task-contract) : résultat, contexte, autorité, contrôle d’acceptation et arrêt.
2. [Relier les affirmations aux preuves](../chapters/09-verification-and-recovery-FR.md#core-evidence-recovery) : vérifier l’affirmation la plus étroite et s’arrêter au premier niveau non étayé.
3. [Planifier une petite tranche vérifiable](../chapters/10-planning-and-slicing-FR.md#core-evidence-bearing-slice) : choisir le plus petit résultat transmissible.
4. [Séparer capacité, autorité, confirmation et preuve](../chapters/13-action-boundaries-FR.md#core-action-boundary) : possible, autorisé, exécuté et vérifié ne sont pas synonymes.

Les procédures propres à un produit vont dans un adaptateur ; les exercices
métiers restent dans des routes d’application. Cette route n’est pas une
preuve d’efficacité pédagogique ni un test en direct.

## Pratiquer une jonction avant de choisir une plateforme

Ouvrez la [fixture de jonction universelle](../../examples/universal-seam-v1/README-FR.md)
si vous souhaitez continuer avec quatre enregistrements fictifs : demandez la
plus récente, la mauvaise cible, la trace d’outil manquante et la valeur
structurée modifiée. Pour chacun, dites ce que le texte visible ne prouve pas,
choisissez le plus
petit contrôle sûr et arrêtez-vous avant qu’un comportement réel ne demande un
adaptateur.

Le vérificateur de cette fixture ne contrôle que la cohérence de données
fictives. `verified_in_fixture` n’est pas un essai de produit, `not_run` n’est
pas une preuve d’exécution et une observation `inferred` demande un adaptateur
avant tout diagnostic en direct.

## Ce que cette route établit

La carte établit seulement la propriété canonique, les ancres stables, les
consommateurs valides et une projection compacte. La fixture établit seulement
son contrat de données. Ni l’une ni l’autre ne prouve le comportement d’une
plateforme, l’apprentissage ou le transfert d’une personne, un résultat de
sécurité ou une exécution en direct.
