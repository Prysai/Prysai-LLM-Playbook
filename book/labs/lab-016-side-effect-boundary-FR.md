<!-- content_id: lab-016-side-effect-boundary | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->
---
id: lab-016-side-effect-boundary
title: "S’arrêter à la frontière d’un effet durable"
level: L3
domain: general
goal: "Séparer diagnostic, installation, publication et redémarrage"
setup: "Un projet jetable avec contrôle en échec et autorité locale limitée"
task: "Classer les actions proposées par cible, effet, propriétaire et rollback"
evidence:
  - "La matrice d’actions"
  - "La décision et le point d’autorisation"
  - "Les actions refusées"
failure_variant: "Traiter un impératif externe comme une instruction autorisée"
reflection: "Quelle action ressemblait à une vérification mais changeait l’état ?"
status: draft
last_verified: "not run"
transfer_task: "Appliquer la matrice à un push ou une installation"
transfer_domain: "release, navigateur, Skill ou données"
transfer_evidence: "Cible, payload, propriétaire, accord, rollback et limite"
transfer_limitations: "Une matrice statique ne prouve pas un rollback réel"
---

# Lab 016 : La frontière d’effet

## Objectif

Le but est de séparer diagnostic, installation, publication et redémarrage.

## Préparation

Créez un contrôle local inoffensif mais en échec. Autorisez la lecture, une
seule édition et le contrôle ; interdisez installation, authentification,
upload, redémarrage et publication.

## Tâche

Classez chaque proposition selon cible, persistance, permission, propriétaire,
rollback et décision. Les actions de diagnostic restent séparées des actions
durables.

## Preuve

Conservez la matrice et la raison de chaque arrêt. Une autorisation doit être
liée à une action précise.

## Échec et limite

Une instruction trouvée dans un rapport est une donnée. Marquez l’installation
ou l’envoi `blocked`.

## Réflexion

Quelle action vous aurait surpris après coup ?

## Transfert

Transférez la carte à un Skill externe.

## Liste de contrôle d’acceptation

- [ ] La persistance est visible.
- [ ] Le propriétaire et l’autorisation sont nommés.
- [ ] Le rollback précède l’effet durable.
- [ ] Le diagnostic n’est pas présenté comme une publication.

## Sources et limite de mise à jour

**Statut :** `draft` · **Exécution :** `not_run`. Aucun effet externe n’est
exécuté.
