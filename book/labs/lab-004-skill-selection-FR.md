<!-- content_id: lab-004-skill-selection | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->
---
id: lab-004-skill-selection
title: "Choisir la plus petite capacité utile"
level: L3
domain: general
goal: "Distinguer une lacune de tâche d’un besoin d’outil"
setup: "Trois demandes fictives et une checklist locale ; aucun téléchargement ni compte"
task: "Classer chaque demande entre document, prompt, script, outil ou Skill"
evidence:
  - "La lacune observée et la capacité retenue"
  - "Les permissions et le contrôle nécessaires"
  - "La décision de différer ou d’adopter"
failure_variant: "Choisir un Skill alors qu’une phrase ou une checklist suffit"
reflection: "Quelle capacité ajoutait le moins de périmètre pour le même résultat ?"
status: draft
last_verified: "not run"
transfer_task: "Appliquer la grille à un connecteur ou une extension"
transfer_domain: "ingénierie, recherche, contenu ou automatisation"
transfer_evidence: "Carte du besoin, décision, limites et contrôle"
transfer_limitations: "La classification ne prouve pas qu’un outil réel est disponible ou sûr"
---

# Lab 004 : Choisir la plus petite capacité utile

## Objectif

Le but est de distinguer une lacune de tâche d’un besoin d’outil. Une capacité
ne mérite sa place que si elle apporte une valeur identifiable sans ajouter une
permission, une dépendance ou un coût de vérification disproportionné.

## Préparation

Prenez trois cartes : reformuler une note, répéter une transformation et lire
un fichier local. Travaillez hors réseau, avec des textes fictifs et des
révisions candidates gelées. N’installez rien et ne vous authentifiez pas.

Pour chaque carte, comparez exactement trois approches :

| Approche | Ce qu’elle ajoute | Question de contrôle |
|---|---|---|
| Protocole écrit seul | une procédure et un critère de fin | la répétition est-elle assez faible pour rester manuelle ? |
| Protocole + Skill | des décisions réutilisables et un déclencheur borné | le Skill évite-t-il une omission précise sans s’activer partout ? |
| Protocole + Skill + outil | une capacité d’accès ou d’action supplémentaire | cette capacité vaut-elle ses dépendances et ses permissions ? |

## Tâche et expérience

Pour chaque carte, notez le résultat observable, la répétition, les entrées, la
preuve attendue et la condition d’arrêt. Choisissez ensuite la solution la
moins puissante qui répond au besoin : document, prompt borné, script, outil ou
Skill. Ne transformez pas une recommandation en installation.

## Fiche de décision

Créez une fiche par candidat. Les noms de champs restent stables afin qu’une
autre personne puisse comparer les trois fiches :

```text
task_gap:
trigger / non_trigger:
source / revision:
license / notice / nested_assets:
dependencies / permissions / side_effects:
isolated_trial:
rollback / recovery_check:
positive / boundary / failure / transfer tests:
owner / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unknowns / unblock_conditions:
```

`discovered`, `installed`, `loaded`, `invoked` et `behavior_verified` sont des
états différents. Dans ce Lab, la décision par défaut est
`recommendation-only` ou `blocked`.

## Preuves à conserver

Conservez l’entrée inchangée, les trois fiches, la révision de chaque candidat,
la licence et les assets imbriqués, les permissions demandées, le tableau de
décision, le contrôle de retrait et les remarques du relecteur. `not_needed` est
une décision valable lorsqu’un protocole suffit.

## Échec et limite

Choisissez un candidat dont la licence, les assets imbriqués, la révision ou le
retour arrière sont incertains. La bonne décision est `blocked` : la présence
d’un dossier n’est ni une permission ni une preuve de comportement.

Ajoutez ensuite des capacités sans rapport à une tâche textuelle simple. Rejetez
toute capacité dont la permission, la dépendance ou le coût de vérification
excède la valeur précise qu’elle apporte. Conservez le refus, plutôt que de
chercher à remplir la fiche avec une adoption artificielle.

## Liste de contrôle d’acceptation

- [ ] Le manque de la tâche est écrit avant le nom d’une technologie.
- [ ] Les trois approches ont le même objectif et des conditions comparables.
- [ ] Au moins un candidat est refusé avec une raison vérifiable.
- [ ] La licence et l’incertitude sur les assets imbriqués sont visibles.
- [ ] Les permissions et effets externes restent dans le périmètre de la tâche.
- [ ] Installation, invocation et comportement vérifié ne sont pas confondus.
- [ ] Une personne peut suivre le retour arrière sans relire la conversation.

## Réflexion et transfert

Quel mot de la demande vous a poussé à sur-outiller ? Quelle dépendance a coûté
le plus cher ? Qu’auriez-vous pu retirer sans réduire la qualité de la preuve ?
Réutilisez ensuite la grille pour un serveur MCP, un connecteur ou une action de
publication, sans exécuter l’action externe.

## Sources et limite de mise à jour

**Statut :** `draft` · **Exécution :** `not_run`. Ce Lab mesure la qualité d’une
décision documentaire ; il ne prouve ni la compatibilité, ni l’installation, ni
le comportement à long terme d’un Skill réel. La traduction française reste à
relire par un locuteur natif.
