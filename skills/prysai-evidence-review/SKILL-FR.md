<!-- content_id: prysai-evidence-review | locale: FR | language: fr | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: 2dfe4e3 | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-evidence-review
description: >
  Auditer des affirmations concernant Codex, des Agents, une recherche, du
  marketing, un navigateur, un déploiement, un Skill ou l’achèvement d’une
  tâche à partir de preuves observables. À utiliser lorsqu’un résultat peut
  sembler abouti tout en restant incomplet, lorsqu’il faut distinguer
  verified, inferred, blocked et unknown, ou lorsqu’une prochaine vérification
  minimale est nécessaire. Ne pas l’utiliser pour exécuter la vérification
  manquante ni pour remplacer un parcours de recherche de sources.
---

# Revue des preuves

Auditez les affirmations au regard de preuves qu’une autre personne peut
inspecter. L’absence de preuve ne prouve pas un échec ; étiquetez précisément
la situation et indiquez la prochaine vérification.

## Limite de déclenchement et transmission

Prenez en charge toute entrée qui contient une affirmation d’achèvement, un
résultat, un diff, un test, une déclaration appuyée par une source, une capture
d’écran, un journal, un rapport de déploiement ou une évaluation.

Transmettez lorsque :

- un `$skill` explicite est nommé ; ne révisez que si la demande explicite est
  un audit, tout en appliquant la sécurité ;
- la personne veut que la recherche manquante soit effectuée : Research Router ;
- la personne veut exécuter une tâche qui n’est pas claire : Task Protocol ;
- la personne veut exécuter un workflow en plusieurs étapes : Workflow
  Orchestrator ;
- la personne veut une leçon ou un exercice qui ne concerne pas Codex :
  Learning Coach ;
- la personne veut une leçon ou un exercice Codex : Codex Coach.

Ne réparez pas silencieusement l’artefact examiné. Une réparation constitue une
nouvelle tâche et doit être orientée séparément.

## Entrées requises et comportement en cas de manque

Exigez `claims`, `scope`, `evidence`, `time_or_version` et `acceptance_rule`.
Pour chaque affirmation, notez aussi `owner` lorsque le résultat est partagé ou
publié à l’extérieur, et distinguez `not_observed` de `failed`. Si une
affirmation manque, demandez-la. Si la preuve manque, retournez une évaluation
`unknown` ou `blocked` et indiquez la plus petite vérification sûre ; ne
comblez pas le manque par plausibilité, mémoire ou une affirmation recopiée de
l’artefact.

## Méthode de revue

Pour chaque affirmation, enregistrez le périmètre, le type de preuve, la
fraîcheur, la provenance, la couverture et la prochaine vérification. Demandez
si la source est obsolète, générée, simulée, destinée à une autre cible ou trop
étroite. Adaptez la vérification à l’affirmation : diff pour une modification
de fichier, sortie de commande pour un build, observation à l’exécution pour un
comportement runtime, rendu pour une affirmation visuelle, URL faisant
autorité avec date pour un fait volatil, échantillon défini et méthode pour
une affirmation de préférence. Une affirmation vérifiée reste limitée à ses
preuves ; ne la transformez pas en déclaration générale.

### Profil des preuves d’apprentissage

Lorsqu’une affirmation concerne la pratique ou l’apprentissage, séparez
`process_pass` de `learner_outcome`. Exigez la révision du fixture fixe, les
aides autorisées, la tentative de référence conservée, le registre des
indices, la correction rédigée par l’apprenant, une tâche modifiée, le
correcteur et le seuil, ainsi qu’un délai si la rétention est revendiquée.
Associez le résultat demandé à un statut précis :

- une invite ou un plan choisi : `template_selected` ;
- une boucle accompagnée terminée : `practised` ;
- une tâche fixe réussie : `demonstrated_on_this_task` ;
- une tâche changée et non vue réussie : `transferred_to_[variation]` ;
- une tâche changée et non vue réussie après délai : `retained_at_[delay]`.

Refusez `mastered`, `fluent`, `expert` ou une amélioration générale lorsque le
dossier ne contient qu’une réponse du modèle, une correction dans la même
session, une auto-évaluation du modèle ou une seule tâche réussie. Utilisez le
reçu du Learning Coach lorsqu’il existe ; ne transformez pas ce profil de revue
en deuxième boucle de coaching.

## Risque, effets de bord et confirmation

Le risque par défaut est `R0`, car la revue est en lecture seule. Relancer un
contrôle local est `R1` ; récupérer sur le réseau, accéder à un compte,
inspecter la production ou modifier l’artefact relève de `R2` ou plus et exige
un périmètre et une confirmation explicites. N’exposez pas de secrets dans les
preuves ; masquez-les tout en conservant assez de contexte pour identifier le
contrôle.

## Arrêts stricts

Arrêtez-vous avec `blocked` si le périmètre ou la cible de l’affirmation est
ambigu, si la provenance est indisponible, si la preuve est inaccessible, si
la vérification demandée exige un accès non autorisé ou si la personne demande
de qualifier de `verified` un résultat non vérifié. La déclaration de complétude
de l’artefact ne constitue jamais une preuve.

## Sortie fixe

Retournez exactement :

1. `review_scope`
2. `claim_table` avec `claim`, `scope`, `evidence`, `freshness`, `status` et
   `next_check`
3. `verified_facts`
4. `partial_or_inferred_facts`
5. `blocked_or_unknown_facts`
6. `decision_risks`
7. `smallest_next_verification`
8. `owner_and_review_date`
9. `content_status`
10. `side_effects_and_permissions`

## Correspondance entre preuves et statuts

Utilisez pour les affirmations les statuts `verified`, `partially-verified`,
`inferred`, `blocked` ou `unknown`. Classez l’artefact en `practice` lorsqu’il
est exploratoire, `candidate` lorsque la structure et les contrôles de base
passent, `verified` lorsque les preuves normale, de limite, d’échec et de
transfert couvrent le périmètre annoncé, et `production-ready` seulement après
les portes de sécurité, maintenance, propriété, version, rollback et release.

## Fiche de maintenance

- `source` : `docs/quality/skill-quality-standard.md` ;
  `docs/book-architecture.md` ; `docs/quality/evaluation-framework.md`
- `license` : réécriture originale ; les éléments externes restent des
  références selon `docs/sources/asset-register.md`
- `owner` : evidence-systems maintainer
- `version` : `0.3.0`
- `review_date` : `2026-09-09`
- `content_status` : `candidate`
