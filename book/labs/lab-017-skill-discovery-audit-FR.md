<!-- content_id: lab-017-skill-discovery-audit | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->
---
id: lab-017-skill-discovery-audit
title: "Auditer la découverte avant d’adopter un Skill"
level: L4
domain: general
goal: "Séparer existence, découverte, chargement, comportement, licence et adoption"
setup: "Deux échantillons de Skill à révision fixe dans un dossier jetable"
task: "Remplir une carte d’audit et produire une décision bornée"
evidence:
  - "La révision, les fichiers et la licence"
  - "Les entrées, effets et dépendances"
  - "La décision d’adoption ou de refus"
failure_variant: "Un candidat demande `.env` ou upload"
reflection: "Quel état le catalogue ne pouvait-il pas prouver ?"
status: draft
last_verified: "not run"
transfer_task: "Appliquer les étapes à un serveur MCP"
transfer_domain: "outillage, maintenance ou recherche"
transfer_evidence: "Révision, propriétaire, test, rollback et revue"
transfer_limitations: "Un échantillon statique ne prouve pas le comportement réel"
---

# Lab 017 : Auditer avant d’adopter

## Objectif

Le but est de séparer existence, découverte, chargement, comportement, licence et adoption.

## Préparation

Placez deux descriptions fictives dans un dossier sans installation. L’une a une
licence claire et une sortie locale ; l’autre réclame un secret.

## Tâche

Pour chaque candidat, notez : existe, repérable, installé, chargé, comportement
observé, licence, propriétaire et adoption. La carte doit conserver la révision
exacte.

## Preuve

Gardez les fichiers, l’analyse de périmètre, les effets et le plan de retrait.

## Échec et limite

Le candidat qui réclame `.env` ou upload est `blocked`. Ne l’installez pas pour
« voir ce qu’il fait ».

## Réflexion

Quelle étape manquait au catalogue ?

## Transfert

Transférez la séquence à un connecteur MCP.

## Liste de contrôle d’acceptation

- [ ] Les six états sont séparés.
- [ ] Révision, licence et dépendances sont notées.
- [ ] Le test reste isolé.
- [ ] Le refus et le retrait sont prévus.

## Sources et limite de mise à jour

**Statut :** `draft` · **Exécution :** `not_run`. Aucun Skill externe n’est
installé ; relecture française à faire.
