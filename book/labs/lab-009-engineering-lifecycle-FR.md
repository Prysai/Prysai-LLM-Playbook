<!-- content_id: lab-009-engineering-lifecycle | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->
---
id: lab-009-engineering-lifecycle
title: "Comparer une implémentation directe et un cycle complet"
level: L3
domain: engineering
goal: "Observer ce que définition, plan, contrôle et revue changent dans une petite tâche"
setup: "Une copie locale jetable, trois tâches fixes et aucun effet externe"
task: "Exécuter les deux plans en conservant diff, erreurs et preuves"
evidence:
  - "Les baselines et journaux"
  - "Les résultats de contrôle et revues"
  - "Les écarts de condition"
failure_variant: "Introduire une entrée absente ou un contrôle en échec"
reflection: "Quel point de contrôle a évité le plus de reprise ?"
status: draft
last_verified: "not run"
transfer_task: "Appliquer le cycle à une transformation de données réversible"
transfer_domain: "ingénierie, données ou automatisation"
transfer_evidence: "Plans, diff, contrôles, limites et rollback"
transfer_limitations: "Trois petites tâches ne mesurent pas une productivité générale"
---

# Lab 009 : Comparer deux cycles d’ingénierie

## Objectif

Le but est de comparer deux cycles dans des conditions explicites.

## Préparation

Préparez trois demandes locales de faible risque. Fixez les entrées et l’outil
avant de commencer.

## Tâche

Faites une tentative directe, puis une tentative avec définition, plan, tranche,
contrôle et revue. Ne changez qu’une condition à la fois.

## Preuve

Conservez baseline, diff, commandes, sorties, erreurs, temps observé et
relecture. Notez toute dérive qui rend la comparaison invalide.

## Échec et limite

Après une entrée manquante ou un test rouge, diagnostiquez avant de modifier le
code. Trois tâches ne prouvent aucune supériorité universelle.

## Réflexion

Quelle preuve vous aurait manqué pour livrer ?

## Transfert

Transférez la carte à une automatisation réversible.

## Liste de contrôle d’acceptation

- [ ] Les tâches et conditions sont fixes.
- [ ] Les deux plans ont leurs propres journaux.
- [ ] Les erreurs sont conservées.
- [ ] La conclusion reste dans le périmètre.

## Sources et limite de mise à jour

**Statut :** `draft` · **Exécution :** `not_run`. Aucun déploiement ni classement
de modèle n’est établi.
