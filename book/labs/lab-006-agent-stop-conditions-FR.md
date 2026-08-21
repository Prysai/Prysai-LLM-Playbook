<!-- content_id: lab-006-agent-stop-conditions | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->
---
id: lab-006-agent-stop-conditions
title: "Concevoir les conditions d’arrêt d’un Agent"
level: L4
domain: general
goal: "Décider quand demander, récupérer, continuer ou s’arrêter"
setup: "Une fixture locale avec entrée absente, permission refusée et état inconnu"
task: "Écrire un événement et une décision pour chaque branche"
evidence:
  - "La trace des événements"
  - "Les checkpoints et décisions"
  - "La revue des actions non exécutées"
failure_variant: "Réessayer deux fois sans changer la condition"
reflection: "Quelle observation vous a donné le droit de continuer ?"
status: draft
last_verified: "not run"
transfer_task: "Reprendre la carte pour une session navigateur ou MCP"
transfer_domain: "outils, recherche, ingénierie ou contenu"
transfer_evidence: "Trace, checkpoint, décision et limite"
transfer_limitations: "La fixture ne prouve pas les événements exposés par un Agent réel"
---

# Lab 006 : Concevoir les conditions d’arrêt

## Objectif

Le but est de décider quand demander, récupérer, continuer ou s’arrêter.

## Sécurité

Travaillez dans une copie jetable. Aucun réseau, secret, compte ou effet externe
n’est autorisé.

## Tâche

Pour chaque branche, consignez `état → action proposée → observation → décision` :
entrée absente, permission en conflit, échec répété, instruction non fiable et
réponse perdue.

## Preuve

Gardez le checkpoint avant et après la décision. Notez explicitement ce qui n’a
pas été exécuté.

## Échec et limite

Après deux échecs sans condition nouvelle, la décision attendue est `stop` ou
`ask`, pas une troisième tentative automatique.

## Réflexion

Quelle branche exigeait une réconciliation ?

## Transfert

Appliquez la même trace à un connecteur en lecture seule.

## Liste de contrôle d’acceptation

- [ ] Chaque branche a une décision.
- [ ] Le budget de reprise est limité.
- [ ] L’état inconnu n’est pas traité comme un succès.
- [ ] La trace permet une transmission.

## Sources et limite de mise à jour

**Statut :** `draft` · **Exécution :** `not_run`. Ce Lab n’exécute aucun Agent
réel et attend une relecture francophone.
