<!-- content_id: prysai-practice-target | locale: FR | language: fr | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-practice-target
description: Transformer un souhait d’apprentissage ambitieux ou vague en une cible de pratique petite, honnête et prête pour un prompt. À utiliser lorsqu’un apprenant dit « apprendre l’espagnol en sept jours », « m’améliorer en entretien », « apprendre une compétence avec l’IA » ou demande par où commencer avec un objectif limité dans le temps. Fixer situation, état initial, budget de séance, aide autorisée, contrôle visible et repli avant le coaching. Ne pas l’utiliser pour enseigner la compétence, établir un plan d’étude, évaluer le niveau, chercher des faits ou promettre un résultat.
---

# Cible de pratique

Transformez un souhait en prochaine action réelle. Gardez les mots de
l’apprenant, mais remplacez « courant », « expert » ou « meilleur » par une
performance dans une situation précise.

## Posséder le moment de définition

Utilisez ce Skill avant une séance guidée par un LLM lorsque l’apprenant a un
objectif mais pas encore de première tentative délimitée. Il prépare le relais;
il n’enseigne, ne corrige, ne note et ne construit pas un long programme.

Passez le relais au lieu d’étendre la cible :

- une tentative existe déjà et l’apprenant veut feedback, correction ou cas
  modifié : `prysai-learning-coach` ;
- il faut rédiger une demande textuelle non envoyée : `prysai-dialogue-brief` ;
- une première demande existante doit être inspectée : `prysai-first-turn-check` ;
- l’objectif dépend de faits actuels, de sources ou d’une conclusion « meilleure » :
  `prysai-source-investigator` ou `prysai-research-router` ;
- fichiers, outils, comptes, personne réelle, test, publication, paiement ou
  autre effet externe apparaissent : `prysai-task-protocol`.

Ne demandez pas dossiers privés, diagnostics, identifiants, données d’employeur
ou d’école, ni réponse d’examen. Définir une cible ne donne pas l’autorité pour
une action ultérieure.

## Demander le plus petit choix manquant

Partez du but déjà fourni. S’il manque une décision, posez exactement une
question simple. Préférez « Quelle situation traiter d’abord ? » à « Quel est
votre niveau ? ».

Définissez uniquement :

```text
practice_target: une chose que l’apprenant dira, écrira, choisira, expliquera ou fera
situation: un contexte ordinaire où cela compte
baseline: une petite tentative sans aide, ou not_run
session_budget: une limite de temps ou de tours
allowed_help: aucune aide, un indice, une limite de recherche ou du matériel fourni
visible_check: ce qu’un lecteur peut inspecter dans la tentative
fallback: la version réduite si la première tentative est trop difficile
```

Refusez une promesse de durée fixe comme cible. « Français en sept jours »
devient « demander l’horaire d’un train et résoudre une question à choix dans
un échange écrit en français de quatre tours ». Cela ne devient ni fluidité,
ni niveau, ni résultat oral, ni résultat garanti en sept jours.

## Retourner un relais utilisable

Lorsque les champs suffisent, retournez exactement :

```text
target_status: ready_for_first_attempt | needs_one_answer | out_of_scope | blocked
practice_target:
situation:
baseline:
session_budget:
allowed_help:
visible_check:
fallback:
copy_ready_next_message:
handoff:
claim_limit: a selected target is not evidence of learning, retention, transfer, proficiency, or model quality
content_status: candidate
```

Le `copy_ready_next_message` doit être simple et bref. Il demande au modèle
récepteur d’attendre la première réponse de l’apprenant, de conserver la
tentative et de ne pas fournir une réponse polie avant l’essai. Ne transformez
pas le reçu en évaluation, note, persona, promesse ou plan en douze étapes.

Pour une cible non résolue, retournez `needs_one_answer` avec une question et
aucun plan inventé. Pour un but de sécurité, à fort enjeu ou soumis à un
règlement d’examen, retournez `blocked` et nommez la route qualifiée ou
autorisée.

## Vérifier avant le relais

Acceptez seulement une performance observable, un contexte, une première
tentative bornée, une règle d’aide, un contrôle visible et un repli plus petit.
Laissez toutes les inconnues visibles. Une cible est prête à commencer la
pratique; elle ne rend pas l’apprenant prêt.

## Fiche de maintenance

- `source` : méthode originale de Prysai Lab dérivée du relevé de pratique en
  six étapes, du Beginner Practice Pack et de la limite Learning Coach
- `license` : réécriture originale; les sources liées restent des références
  sous `docs/sources/asset-register.md`
- `owner` : learning-systems maintainer
- `version` : `0.1.0`
- `review_date` : `2026-11-14`
- `content_status` : `candidate`
