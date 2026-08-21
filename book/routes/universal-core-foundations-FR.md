<!-- content_id: universal-core-foundations-route | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-bootstrap -->

# Travailler avec un LLM : une première tâche sûre et quatre fondations

**Statut :** `candidate`. **Exécution :** `not_run`.

Commencez ici si vous utilisez un chat textuel sans configuration de produit.
Cette route ne prétend pas que ChatGPT, Claude, Gemini, Grok et Codex ont les
mêmes outils, droits, tarifs ou comportements.

## Essayez maintenant une tâche sûre

N’utilisez que cet avis fictif. Ne copiez ni message privé, ni donnée client,
ni secret, ni fichier réel. N’utilisez ni recherche ni outil et n’envoyez rien.

```text
Résultat : réécris cet avis d’association pour une nouvelle personne.
Matériel : « L’association se réunit mardi à 18 h. Apporte un carnet. La salle
sera confirmée plus tard. »
Format : deux phrases, tous les faits conservés, détails absents entre [crochets],
puis une liste des faits conservés.
Contrôle : compare l’original et la réécriture. N’ajoute ni heure, ni salle, ni
cotisation, ni contact, ni promesse.
Arrêt : ne navigue pas, n’envoie rien, ne publie rien et n’invente rien.
```

Vérifiez vous-même : chaque phrase est-elle rattachée au texte ? La forme est-
elle respectée ? Un détail inconnu a-t-il été inventé ? Un résultat bien écrit
ne prouve ni la vérité des faits ni un comportement identique sur chaque produit.

## Relier la première tâche aux quatre fondations

1. [Transformer une intention en contrat de tâche](../chapters/03-task-protocol-FR.md#core-task-contract) : résultat, contexte, autorité, réception et arrêt.
2. [Relier les affirmations aux preuves](../chapters/09-verification-and-recovery-FR.md#core-evidence-recovery) : vérifier l’affirmation la plus étroite et s’arrêter au premier niveau non étayé.
3. [Planifier une petite tranche vérifiable](../chapters/10-planning-and-slicing-FR.md#core-evidence-bearing-slice) : choisir le plus petit résultat transmissible.
4. [Séparer capacité, autorité, confirmation et preuve](../chapters/13-action-boundaries-FR.md#core-action-boundary) : possible, autorisé, exécuté et vérifié ne sont pas synonymes.

Les procédures propres à un produit vont dans un adaptateur ; les exercices
métiers restent dans des routes d’application. Cette route n’est pas une
preuve d’efficacité pédagogique ni un test en direct.

## Pratiquer une jonction avant de choisir une plateforme

Ouvrez la [fixture de jonction universelle](../../examples/universal-seam-v1/README-FR.md)
si vous souhaitez continuer avec quatre enregistrements fictifs : demande la
plus récente, mauvaise cible, reçu d’outil absent et valeur structurée modifiée.
Pour chacun, dites ce que le texte visible ne prouve pas, choisissez le plus
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
