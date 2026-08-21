<!-- content_id: lab-015-evidence-delivery | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->
---
id: lab-015-evidence-delivery
title: "Livrer des preuves, pas une phrase de fin"
level: L5
domain: general
goal: "Décomposer les affirmations de livraison et choisir le prochain contrôle"
setup: "Une modification de texte, un contrôle présent et un contrôle manquant"
task: "Créer une ligne de preuve par affirmation avec portée et statut"
evidence:
  - "La table affirmation-source-contrôle"
  - "Les sorties et chemins conservés"
  - "La liste des non-exécutés"
failure_variant: "Garder le nom de commande mais supprimer sa sortie"
reflection: "Quelle affirmation dépassait sa preuve ?"
status: draft
last_verified: "not run"
transfer_task: "Appliquer la table à un site statique"
transfer_domain: "publication, ingénierie, recherche ou documentation"
transfer_evidence: "Une ligne par affirmation, preuve et limitation"
transfer_limitations: "Un contrôle source ne prouve ni rendu ni URL publique"
---

# Lab 015 : Livrer des preuves

## Objectif

Le but est de décomposer une affirmation de livraison et de choisir le prochain contrôle.

## Préparation

Préparez un diff fictif, une sortie de contrôle et une affirmation volontairement
plus large que la preuve.

## Tâche

Remplissez : affirmation, portée, observation, commande, sortie, statut et
prochain contrôle. Utilisez `verified`, `unverified`, `blocked` ou `not_run`.

## Preuve

Conservez les chemins et les sorties réelles. Une commande écrite sans sa sortie
reste une preuve manquante.

## Échec et limite

Retirez un artefact tout en gardant son nom dans la transmission. La ligne doit
être rétrogradée, pas décorée.

## Réflexion

Quel petit contrôle fermerait réellement la lacune ?

## Transfert

Transférez la table à une page multilingue.

## Liste de contrôle d’acceptation

- [ ] Une ligne existe par affirmation importante.
- [ ] Portée et statut sont explicites.
- [ ] Les sorties absentes restent absentes.
- [ ] Le prochain contrôle est borné.

## Sources et limite de mise à jour

**Statut :** `draft` · **Exécution :** `not_run`. La méthode ne prouve aucune
publication.
