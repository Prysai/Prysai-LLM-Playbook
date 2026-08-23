<!-- content_id: prysai-workflow-orchestrator | locale: FR | language: fr | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-workflow-orchestrator
description: >
  Orchestrer un travail Codex complexe qui traverse la définition, le contrat
  de tâche, la planification, l’exécution incrémentale, la vérification, la
  revue, la livraison et la maintenance. À utiliser lorsqu’une demande couvre
  plusieurs étapes, fichiers, outils, domaines ou points de contrôle, ou
  demande une livraison de bout en bout. Ne pas l’utiliser pour une action
  unique et délimitée, une explication pédagogique, un audit de preuves
  autonome ou une question de recherche ponctuelle.
---

# Orchestrateur de workflows

Maintenez un cycle de vie fini et auditable. Ce Skill coordonne les étapes ; il
n’accorde pas de permissions, ne remplace pas le jugement métier et ne déclare
pas terminée une étape qu’il n’a pas vérifiée.

## Limite de déclenchement et passage de relais

Prenez en charge le travail qui comporte au moins deux étapes dépendantes ou
qui nécessite des points de contrôle, une récupération, plusieurs artefacts ou
une coordination entre domaines.

Passez le relais lorsque :

- un `$skill` explicite est nommé pour une sous-tâche délimitée : inscrivez-le
  comme étape et préservez son périmètre ;
- la demande est une action unique et peu claire : commencez par Task Protocol ;
- la demande consiste uniquement à enseigner : Codex Coach ;
- elle consiste uniquement à examiner des preuves : Evidence Review ;
- elle consiste uniquement à découvrir ou synthétiser des sources : Research
  Router ;
- elle consiste uniquement à choisir des Skills : Skill Selector ;
- elle consiste uniquement à établir un contexte de positionnement partagé :
  Product Context.

La seule boucle de relais interne autorisée est `orchestrator -> task protocol
-> one domain route -> evidence review -> orchestrator checkpoint`. N’appelez
pas l’orchestrateur depuis une étape et ne relancez pas une étape terminée sans
nouvelle constatation ou changement de périmètre.

## Entrées requises et traitement des informations manquantes

Exigez `outcome`, `non_goals`, `stages`, `dependencies`, `allowed_actions`,
`acceptance_evidence`, `checkpoints`, `rollback` et `owner`. Si les étapes ou
leurs dépendances sont floues, retournez un plan proposé avec des champs
`blocked_on`. Le contrat doit aussi nommer `decision_owner`, une
`delivery_target` exacte et la signification de toute étape `commit` : un
commit local, un push, une pull request et une publication sont des actions
différentes avec des seuils de confirmation différents. Posez uniquement la
question minimale qui changerait le chemin ou le risque.

Avant de marquer une étape `in-progress`, consignez ces champs :

```yaml
owner: "role or named maintainer"
input_and_action: "fixed input and allowed action"
exit_evidence: "observable file, log, command, review, or URL"
checkpoint: "who may approve the next stage and what is checked"
rollback: "exact diff, copy, branch, or target to restore"
risk: "R0 | R1 | R2 | R3"
confirmation: "required | not_required; state the decision point"
```

L’absence de `delivery_target`, de responsable, de preuve d’acceptation ou de
cible de retour arrière bloque l’exécution ; elle ne permet pas de deviner une
cible.

## Cycle de vie et points de contrôle

1. Définissez le résultat, les utilisateurs, les objectifs exclus, les risques
   et les critères d’acceptation.
2. Créez ou validez le contrat de tâche une seule fois.
3. Découpez le travail en étapes verticales, réversibles, avec responsable et
   preuve.
4. Exécutez une étape à la fois et conservez les diffs, journaux et identifiants
   d’exécution.
5. Vérifiez chaque affirmation avec le test, le runtime, le navigateur, la
   source, la sécurité, le visuel ou la preuve humaine appropriés.
6. Examinez le périmètre, les hypothèses, la maintenabilité et les chemins
   d’échec.
7. Livrez les éléments terminés, incomplets, inférés, bloqués et les prochaines
   étapes.
8. Notez la maintenance, le rafraîchissement des sources, la migration et le
   retour arrière.

La cible de livraison fait partie du graphe des étapes. Un commit local, un
push vers une branche partagée, une pull request et une release publique
doivent être listés comme étapes distinctes lorsqu’il est demandé d’en faire
plus d’une.

## Risques, effets de bord et confirmation

Classez chaque étape `R0` en lecture seule, `R1` locale et réversible, `R2`
partagée ou externe, ou `R3` de production, irréversible, porteuse de secrets
ou à accès large. Mettez-vous en pause immédiatement avant une extension de
permission, l’accès à un secret, un message externe, un commit/push/publication,
une modification de production ou une action irréversible. L’utilisateur doit
confirmer l’étape exacte, la cible et l’effet de bord ; l’orchestration ne
réutilise pas l’autorisation d’une étape sans rapport.

## Arrêts impératifs et récupération

Arrêtez-vous avec `blocked` si la propriété, l’acceptation, la cible, la
récupération, la preuve ou une permission sûre est non résolue, si le retour
arrière échoue, si une preuve est perdue ou si un échec se répète sans nouvelle
hypothèse. Conservez l’échec, réduisez le périmètre, apportez une modification
appuyée par les preuves et ne relancez que le contrôle concerné. N’élargissez
jamais les permissions et ne réessayez pas indéfiniment.

## Sortie fixe

Retournez exactement :

1. `outcome_and_scope`
2. `stage_graph_and_current_stage`
3. `checkpoint_log`
4. `actions_and_permissions`
5. `evidence_by_stage`
6. `failures_recovery_and_rollback`
7. `completed_incomplete_inferred_blocked`
8. `handoffs`
9. `risks_and_unknowns`
10. `content_status`

## Correspondance entre preuves et statuts

Utilisez pour les étapes `not-started`, `in-progress`, `blocked`, `verified` ou
`accepted`. Utilisez globalement `practice` pour l’exploration, `candidate`
lorsque le workflow est structuré et que les contrôles de base réussissent,
`verified` lorsque chaque étape et chaque cas de limite déclarés ont des
preuves, et `production-ready` seulement après les contrôles de release, de
sécurité, de propriété, de maintenance et de retour arrière.

## Fiche de maintenance

- `source` : `docs/book-architecture.md` ; `docs/charter.md` ;
  `docs/quality/skill-quality-standard.md`
- `license` : réécriture originale; les matériaux externes restent fournis à
  titre de référence sous `docs/sources/asset-register.md`
- `owner` : workflow-systems maintainer
- `version` : `0.2.0`
- `review_date` : `2026-09-09`
- `content_status` : `candidate`
