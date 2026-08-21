<!-- content_id: lab-014-resume-reconciliation | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->
---
id: lab-014-resume-reconciliation
title: "Réconcilier une tâche avant de la reprendre"
level: L3
domain: general
goal: "Comparer pointeur, cible, permissions et effets avant de continuer"
setup: "Un dossier jetable avec checkpoint et deux fichiers"
task: "Observer l’état vivant, le comparer au checkpoint et classer chaque champ"
evidence:
  - "Le checkpoint précédent et l’observation actuelle"
  - "La table des champs réconciliés"
  - "La décision de continuer ou d’arrêter"
failure_variant: "Faire correspondre le nom de tâche mais pas la racine du dépôt"
reflection: "Quelle supposition a changé après l’observation ?"
status: draft
last_verified: "not run"
transfer_task: "Appliquer l’enveloppe à une session navigateur ou MCP"
transfer_domain: "navigation, recherche, ingénierie ou contenu"
transfer_evidence: "État, cible, autorité, risque distant et nouveau checkpoint"
transfer_limitations: "La fixture ne prouve pas la continuité d’un compte réel"
---

# Lab 014 : Reprendre sans supposer

## Objectif

Le but est de comparer l’état vivant au dernier point de reprise avant de continuer.

## Préparation

Créez un point de reprise dans un dossier jetable, modifiez un fichier puis simulez
une interruption.

## Tâche

Comparez objectif, racine, cible, branche, permissions, diff et effets. Pour
chaque champ, notez `égal`, `différent` ou `inconnu`. Continuez seulement si les
champs qui changent le risque concordent.

## Preuve

Conservez l’ancien checkpoint, l’observation et la décision. Un état distant
inconnu reste explicitement inconnu.

## Échec et limite

Si la racine ou le fichier diffère, arrêtez avant d’éditer. La fixture ne prouve
pas la reprise d’une production.

## Réflexion

Quel champ était le plus facile à supposer ?

## Transfert

Transférez la carte à un navigateur sans action externe.

## Liste de contrôle d’acceptation

- [ ] Tous les champs critiques sont observés.
- [ ] L’état inconnu n’est pas remplacé par une supposition.
- [ ] La reprise ou l’arrêt est justifié.
- [ ] Un nouveau checkpoint est conservé.

## Sources et limite de mise à jour

**Statut :** `draft` · **Exécution :** `not_run`. Aucun compte ou service réel.
