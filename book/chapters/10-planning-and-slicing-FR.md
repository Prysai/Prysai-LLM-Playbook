<!-- content_id: chapter-10-planning-and-slicing | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-bootstrap -->

# Chapitre 10 : Planifier et découper en tranches

## Le problème que résout ce chapitre

Un grand objectif cache les dépendances et produit des diffs difficiles à
relire. Une tranche verticale relie une entrée à un petit résultat vérifiable.

## Objectifs d’apprentissage

<a id="core-evidence-bearing-slice"></a>

Choisir une unité qui tient dans une courte boucle : définir, lire, changer,
contrôler, documenter et transmettre.

## Entrée du problème réel

« Refaire le site » n’a pas de point d’acceptation unique. « Corriger le lien
de navigation de la page d’accueil, puis vérifier sa cible » en a un.

## Expérience : réduire un objectif

### Préparation

Prenez un objectif fictif et listez ses objets, dépendances et risques.

### Tâche

Écrivez trois tranches candidates avec : cible, précondition, diff attendu,
contrôle, retour arrière et transmission. Choisissez la plus petite qui apporte
une preuve utile sans effet externe.

### Preuve

Conservez le raisonnement d’exclusion, l’ordre retenu et un critère de sortie.
Un compteur de tâches ne remplace pas une preuve de résultat.

### Échec et limite

Si une tranche touche trop de fichiers ou demande une permission nouvelle,
revenez au découpage. Ne cachez pas le risque sous une liste plus longue.

### Réflexion

Quelle tranche pouvait être relue par une autre personne sans contexte caché ?

## Transfert

Découpez de la même façon une recherche ou une campagne de contenu. La cible
change ; l’exigence d’un résultat et d’un contrôle observables reste.

## Liste de contrôle d’acceptation

- [ ] Chaque tranche a une cible et une précondition.
- [ ] Le diff et le contrôle sont nommés avant l’action.
- [ ] Le retour arrière et la transmission sont possibles.
- [ ] La plus petite tranche utile a été choisie.
- [ ] Les permissions nouvelles sont visibles.

## Sources et limite de mise à jour

Le découpage est une méthode stable ; les outils et commandes doivent être
confirmés par leurs sources datées. Cette version française reste
`in-progress / candidate / not_run`.

Passez aux [frontières d’action](13-action-boundaries-FR.md).
