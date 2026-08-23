<!-- content_id: field-case-capacity-interruption-checkpoint-2026-08-14 | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: field-case-capacity-interruption-checkpoint-2026-08-14.md | source_revision: 2026-08-23 -->

# Cas de terrain : faire une pause avant de relancer une tâche interrompue

## Commencer ici : ne pas rendre l'interruption invisible

Quand le modèle choisi devient indisponible, on peut être tenté d'envoyer le prompt suivant, de changer un réglage ou de supposer que la tâche était presque terminée. Il faut d'abord s'arrêter. Avant toute nouvelle tentative, créer un petit point de contrôle qui sépare ce qui est connu de ce que l'on espère :

1. écrire l'objectif en une phrase ;
2. conserver le dernier artefact réellement inspectable : diff, résultat de test, note, ou absence d'artefact ;
3. marquer chaque résultat manquant `unknown`, sans combler le vide par une histoire rassurante ;
4. ne choisir qu'une prochaine étape bornée après avoir classé la tâche précédente comme complète, partielle ou inconnue.

Cette page est un exercice de décision hors ligne. Elle n'envoie pas de prompt, ne relance ni ne change de modèle, n'inspecte aucun compte et ne dit pas comment un fournisseur se comportera. Son objectif est plus modeste : une interruption doit laisser un reçu vérifiable avant de devenir une nouvelle tâche.

![Point de contrôle d'interruption : s'arrêter avant un nouveau prompt, noter les faits connus et inconnus, puis choisir une seule décision bornée.](../../assets/teaching/interruption-checkpoint-card-red-black.svg)

## Identité du cas

- `case_id` : `FC-CAPACITY-01`
- `title` : Faire une pause avant de relancer une tâche interrompue
- `problem` : une tâche est interrompue par un message de modèle indisponible ; l'apprenant doit éviter de traiter un résultat non observé comme une tâche terminée.
- `audience` : débutants et relecteurs utilisant une interface assistée par modèle
- `collected_at` : 2026-08-14
- `owner` : research-maintainer
- `content_status` : `candidate`
- `related_chapters` : chapitre 6 ; chapitre 9 ; chapitre 19
- `related_labs` : Lab 001 ; Lab 013
- `related_skills` : Interruption Checkpoint ; Task Protocol ; Evidence Review ; LLM Comparison Protocol
- `related_evaluations` : `three-task-smoke-v1`, état `not_run`

## Fiche de source

- `source_type` : `github_issue`
- `source_url` : https://github.com/openai/codex/issues/33865
- `source_title` : rapport public sur un modèle choisi devenu indisponible
- `source_author_or_publisher` : auteur public d'une Issue GitHub
- `accessed_at` : 2026-08-14, comme indiqué dans le [signal de terrain sur la capacité](field-signal-model-capacity-budget-2026-08-14.md)
- `source_license_or_usage_boundary` : rapport public de référence uniquement ; ce cas utilise un résumé original et un jeu de test hors ligne fictif
- `quotation_policy` : aucune prose, commentaire, trace, donnée de compte, nom de modèle, détail de machine, sortie de commande, solution, capture ou charge de tâche n'est copié
- `source_scope` : l'Issue établit seulement qu'une personne a publié à une date donnée un signal sur l'indisponibilité d'un modèle choisi. Elle n'établit ni cause, ni fréquence, ni disponibilité actuelle, ni comportement de retry, ni politique de service, ni sémantique de file, ni correctif, ni comportement sur une autre surface, un autre compte, modèle ou fournisseur. Le signal associé cite aussi un guide officiel de limites API : il décrit uniquement l'API et n'explique pas automatiquement ce rapport Codex.

## Situation rapportée

- `user_report_summary` : l'auteur d'une Issue publique décrit un message lié à la capacité qui l'empêchait d'utiliser le modèle choisi dans un contexte donné.
- `observed_symptom` : la source indique que le modèle est devenu indisponible avant l'obtention d'un résultat complet.
- `expected_behavior` : l'auteur s'attendait à ce que le modèle choisi soit disponible ; ce n'est pas une promesse du fournisseur.
- `official_boundary` : `unknown` pour l'événement Codex rapporté. La documentation API liée décrit sa propre limite de débit.
- `product_surface` : CLI, selon le rapport ; non reproduit ici
- `product_version` : non établi comme fait vérifié
- `operating_system` : non établi comme fait vérifié
- `model_or_provider` : volontairement omis ; ce n'est pas une comparaison de modèles
- `network_or_auth_context` : non inspecté ; aucun compte ni droit d'accès utilisé
- `input_shape` : tâche locale bornée avec critère d'acceptation explicite
- `risk_level` : `medium` si des prompts ultérieurs peuvent agir sur un état local incertain

## Tableau des affirmations et des preuves

| Affirmation | Classe de preuve | Source ou artefact | Date | Périmètre | Limite | État |
|---|---|---|---|---|---|---|
| Un auteur public a signalé un modèle indisponible dans un contexte Codex. | `reported` | [Issue #33865](https://github.com/openai/codex/issues/33865) | 2026-08-14 | Un rapport public daté | Ni reproduction, ni diagnostic, ni mesure de fréquence, ni garantie de support | candidate |
| La documentation API OpenAI décrit les limites de débit et les en-têtes de réponse de son API. | `official` | [Rate limits](https://platform.openai.com/docs/guides/rate-limits), borné par le [signal de terrain](field-signal-model-capacity-budget-2026-08-14.md) | 2026-08-14 | Documentation API seulement | Ne donne pas la cause du rapport et ne définit pas le comportement de Codex | candidate |
| La tâche interrompue est terminée, partielle ou reprenable sans risque. | `not_observed` | Aucune tâche locale, retry, compte, modèle ou artefact inspecté | 2026-08-14 | Ce dépôt | L'absence de preuve ne prouve pas l'absence de travail | unverified |
| Il faut conserver un point de contrôle avant d'envoyer un prompt ultérieur. | `project_inference` | Ce cas hors ligne ; chapitres 6 et 9 ; `three-task-smoke-v1` | 2026-08-14 | Méthode pédagogique prudente | Ne garantit ni récupération, ni contexte, ni prévention de l'interruption | candidate |

## État de reproduction

- `reproduction_status` : `not_run`
- `reproduction_scope` : aucun modèle sélectionné, aucune tâche envoyée, aucun compte inspecté, aucun retry exécuté, aucun réglage modifié et aucune télémétrie obtenue.
- `fixed_input_or_fixture` : relevé fictif original de la section **Conversion pédagogique**
- `logs_or_artifacts` : reçu de point de contrôle créé par l'apprenant seulement si un exercice hors ligne est approuvé et relu indépendamment
- `independent_reviewer` : en attente
- `last_checked_at` : 2026-08-14
- `root_cause_status` : `unknown`

## Parcours de diagnostic minimal et sûr

| Étape | Vérification en lecture seule ou action à faible risque | Observation attendue | Règle d'arrêt |
|---|---|---|---|
| 1 | Arrêter la tâche fictive et inscrire objectif, dernier artefact visible et critère d'acceptation dans un reçu local. | L'objectif est séparé de tout résultat non observé. | S'arrêter si l'objectif, la classe d'artefact ou le critère sont inconnus ; ne pas envoyer de prompt ultérieur. |
| 2 | Classer l'état précédent `complete`, `partial` ou `unknown` en utilisant uniquement l'artefact listé. | La preuve manquante reste visible. | Ne jamais écrire `complete` sans la preuve d'acceptation annoncée. |
| 3 | Choisir une décision : inspection bornée en lecture seule, nouvelle tâche avec le reçu, ou pause vers la page d'aide/statut officielle actuelle. | La nouvelle étape apporte sa propre preuve et n'hérite pas de celle de la tâche interrompue. | S'arrêter avant retry, changement de modèle, réglage, dépense, téléversement ou affirmation de reprise. |

- `allowed_actions` : lire ce cas fictif, écrire un point de contrôle local, classer les preuves et nommer une décision future
- `forbidden_actions` : envoyer un prompt, retry, changer de modèle ou de configuration, consulter un compte, dépenser des crédits, téléverser, appeler une API, commit, push, publication ou secret
- `minimal_safe_probe` : reçu local de cinq lignes sans données produit réelles
- `stop_condition` : artefact final, signification de l'acceptation ou autorité pour l'action externe suivante manquant
- `rollback_or_cleanup` : supprimer le reçu fictif local inutile ; aucun système, compte ou dépôt n'a été modifié

## Conversion pédagogique

- `learner_problem` : un message de modèle indisponible apparaît pendant qu'un débutant prépare une petite modification ; il veut envoyer « continue là où tu t'es arrêté ».
- `core_concept` : une interruption visible, un artefact et une tâche réussie sont trois choses différentes. Une nouvelle tentative n'hérite pas de la preuve précédente.
- `decision_to_teach` : conserver un reçu et faire une inspection bornée avant une nouvelle tâche, ou faire une pause et suivre le chemin d'aide/statut officiel. La première option clarifie la preuve locale ; la seconde évite d'ajouter de l'activité quand autorité ou preuve manquent. Aucune ne garantit capacité, récupération ou achèvement.
- `smallest_experiment` : utiliser uniquement ce relevé fictif :

  ```text
  goal: ajouter une ligne à la checklist d'acceptation d'une page locale
  last_visible_event: un message de modèle indisponible est apparu
  artifact_available: aucun résumé, diff ou résultat de test inspecté
  tempting_next_action: envoyer « continue là où tu t'es arrêté »
  ```

  Sans ouvrir d'outil, créer ce point de contrôle :

  ```text
  goal: ajouter une ligne à la checklist
  last_accepted_evidence: unknown
  state_classification: unknown
  missing_evidence: diff ou vue du fichier, et résultat de la checklist
  next_decision: blocked — conserver ce reçu avant toute nouvelle tâche
  external_actions: not_run
  ```

- `intentional_failure` : dire que la ligne a été ajoutée, qu'un retry continuera sans risque, que le modèle est mauvais ou qu'une limite API a causé l'événement.
- `required_artifact` : point de contrôle de six lignes et une phrase expliquant pourquoi un nouveau prompt ne prouve pas l'achèvement précédent
- `acceptance` : le reçu nomme l'objectif ; conserve `unknown` sans artefact ; distingue événement et achèvement ; n'affirme ni cause ni fournisseur ; note `external actions: not_run`.
- `transfer` : appliquer le même contrôle après timeout, perte d'une session navigateur, outil manquant, transmission déconnectée ou autre interruption. L'invariant est que l'étape suivante a besoin d'une preuve fraîche ; seuls l'artefact observable et la limite sûre changent.
- `forbidden_claims` : disponibilité actuelle, cause racine, comportement de file, succès du retry, qualité du modèle, équivalence des plateformes, facturation, achèvement, efficacité de sécurité, compétence, transfert réussi ou préparation à la production

## Emplacement du contenu

- `primary_chapter` : [chapitre 9 — Vérification, doute et récupération](../../book/chapters/09-verification-and-recovery-FR.md)
- `supporting_chapters` : [chapitre 6 — Choix du modèle](../../book/chapters/06-model-selection-FR.md) ; [chapitre 19 — Évaluer modèles et workflows](../../book/chapters/19-evaluate-models-and-workflows-FR.md)
- `primary_lab` : [Lab 013 — Tranche verticale auditable](../../book/labs/lab-013-l3-vertical-slice-FR.md)
- `supporting_labs` : [Lab 001 — Première tâche sûre](../../book/labs/lab-001-first-safe-task-FR.md)
- `related_skill` : [Interruption Checkpoint](../../skills/prysai-interruption-checkpoint/SKILL.md) ; [Task Protocol](../../skills/prysai-task-protocol/SKILL.md) ; [Evidence Review](../../skills/prysai-evidence-review/SKILL.md) ; [LLM Comparison Protocol](../../skills/prysai-llm-comparison-protocol/SKILL.md)
- `evaluation_fixture` : [three-task-smoke-v1](../../evals/candidates/three-task-smoke-v1/README.md), `not_run`
- `update_registry_entry` : revoir si le rapport change, si une instruction Codex de première partie est admise, si un run réel est proposé ou si un lecteur demande une recette de récupération produit

Ce cas rend un signal public existant exploitable sans augmenter la maturité du chapitre, du lab, du Skill, de l'évaluation ou de la plateforme.

## Vie privée, permissions et maintenance

- `personal_data_removed` : oui ; aucune identité, compte ou caractéristique d'environnement n'est réutilisée
- `secrets_removed` : oui ; aucun identifiant, jeton, plan, identifiant de modèle, chemin, charge de tâche ou log
- `private_paths_removed` : oui
- `copyrighted_material_boundary` : résumé original et jeu de test fictif uniquement ; aucune prose d'Issue, commentaire, solution ou documentation n'est copiée
- `asset_register_entry` : S103 dans `docs/sources/asset-register.md`
- `volatile_facts` : état de l'Issue, métadonnées, disponibilité, limites API, contrôles produit, pages d'aide et comportement des plateformes
- `next_review` : 2026-09-14, ou avant toute affirmation de récupération, capacité ou produit
- `change_trigger` : évolution de la source, admission d'une documentation Codex de première partie, run proposé ou demande d'enseigner un retry/configuration
- `owner` : research-maintainer

## Limites des affirmations

- `what_can_be_claimed` : un rapport public daté est présenté comme cas candidat borné, avec source, classes de preuve, état de reproduction, exercice de point de contrôle hors ligne et condition d'arrêt.
- `what_must_not_be_claimed` : que le rapport soit fréquent, actuel, reproductible ou causé par une limite API ; qu'une interruption soit reprenable sans risque ; qu'un fournisseur soit meilleur ; que l'exercice empêche une perte ; ou qu'une preuve d'apprenant, de runtime, de release ou de production soit établie.
- `next_smallest_check` : exercice hors ligne du point de contrôle fictif, autorisé et relu indépendamment, sans collecter compte, modèle, tâche, prompt, projet, usage, données personnelles ou service externe.
- `current_status` : `candidate`
