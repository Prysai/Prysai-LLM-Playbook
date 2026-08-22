<!-- content_id: lab-005-design-a-skill | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->
---
id: lab-005-design-a-skill
title: "Transformer une méthode répétée en Skill étroit"
level: L4
domain: general
goal: "Écrire un contrat de Skill testable avant ses détails"
setup: "Une méthode fictive de classement de faits dans un répertoire temporaire"
task: "Définir déclencheur, non-déclencheur, entrée, sortie, arrêt et preuve"
evidence:
  - "Le contrat et quatre cas de test"
  - "Les résultats bruts et la revue indépendante"
  - "La liste des ressources et de leurs licences"
failure_variant: "Déclencher avec une demande proche mais hors périmètre"
reflection: "Quel champ a empêché le Skill de devenir une solution générale ?"
status: draft
last_verified: "not run"
transfer_task: "Adapter le contrat à une revue de sources"
transfer_domain: "recherche, contenu ou ingénierie"
transfer_evidence: "Contrat, cas, sorties, arrêt et transfert"
transfer_limitations: "Les cas fictifs ne prouvent ni découverte ni exécution par un hôte"
---

# Lab 005 : Concevoir un Skill étroit

## Objectif

Le but est d’écrire un contrat testable avant de détailler le Skill.

## Préparation

Imaginez un Skill qui transforme une note en tableau de faits. N’utilisez ni
secret, ni réseau, ni installation persistante.

## Tâche

Remplissez : but, entrées acceptées, sortie, déclencheur, non-déclencheur,
permissions, preuves et arrêt. Testez un cas positif, un cas proche, une entrée
manquante et un transfert vers un autre domaine.

## Preuve

Conservez le contrat, les quatre demandes, les réponses et la décision de revue.
Une réponse simulée doit rester étiquetée `not_run`.

## Échec et limite

Si le Skill réclame un fichier `.env` ou une écriture pour une tâche de lecture,
arrêtez et notez `blocked`.

## Réflexion

Quelle condition évite le plus d’appels inutiles ?

## Transfert

Réécrivez le contrat pour un contrôle de sources.

## Liste de contrôle d’acceptation

- [ ] Le déclencheur et le non-déclencheur sont observables.
- [ ] Les entrées, sorties et permissions sont bornées.
- [ ] Les quatre cas possèdent une preuve.
- [ ] L’arrêt est explicite.

## Sources et limite de mise à jour

**Statut :** `draft` · **Exécution :** `not_run`. Relecture française
indépendante encore attendue.
