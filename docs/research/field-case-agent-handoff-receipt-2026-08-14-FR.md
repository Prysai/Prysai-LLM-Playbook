<!-- content_id: field-case-agent-handoff-receipt-2026-08-14 | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: field-case-agent-handoff-receipt-2026-08-14.md | source_revision: 2026-08-23 -->

# Cas de terrain : créer un sous-agent ne constitue pas un reçu de tâche

## Commencer par nommer le point de contrôle manquant

Voir apparaître un sous-agent dans une liste de tâches ne prouve pas qu'il a reçu le travail. Avant de déléguer une vraie tâche, séparer ces points de contrôle :

1. la demande de transmission a été créée ;
2. l'agent destinataire a été démarré ou réveillé ;
3. l'agent destinataire peut montrer le reçu de la tâche inoffensive ;
4. l'agent destinataire a réalisé l'action annoncée ;
5. le parent a reçu un résultat vérifiable.

Seul le troisième point établit la livraison. S'il manque, marquer la transmission `blocked`, cesser d'envoyer du travail réel par cette voie et utiliser un agent unique ou une transmission humaine. Cette page est une aide à la décision hors ligne : elle ne crée pas d'agent, n'envoie aucun message, n'inspecte aucune session et ne diagnostique aucun produit.

![Cinq points de contrôle : création, démarrage, réception, exécution et retour du résultat. Le reçu est la porte de livraison.](../../assets/teaching/agent-handoff-receipt-checkpoints-red-black.svg)

## Identité du cas

- `case_id` : `FC-HANDOFF-01`
- `title` : Créer un sous-agent ne constitue pas un reçu de tâche
- `problem` : le flux parent semble créer un sous-agent, mais le texte de la tâche peut être invisible à l'arrivée.
- `audience` : débutants et relecteurs utilisant des environnements de programmation outillés et multi-étapes
- `collected_at` : 2026-08-14
- `owner` : research-maintainer
- `content_status` : `candidate`
- `related_chapters` : chapitre 10 ; chapitre 12
- `related_labs` : Lab 013
- `related_skills` : Task Protocol ; Evidence Review
- `related_evaluations` : aucune attribuée

## Fiche de source

- `source_type` : `github_issue`
- `source_url` : https://github.com/openai/codex/issues/37822
- `source_title` : rapport public d'une transmission affichée comme créée sans reçu de tâche visible
- `source_author_or_publisher` : rapporteur public sur GitHub
- `accessed_at` : 2026-08-14
- `source_license_or_usage_boundary` : rapport public de référence uniquement ; ce cas utilise un résumé original et un jeu de test hors ligne fictif
- `quotation_policy` : aucune prose d'Issue, commande, trace, capture, pièce jointe, compte, chemin de projet, réglage fournisseur ou archive de reproduction n'est copiée
- `source_scope` : au moment de l'accès, les métadonnées de l'Issue indiquaient un rapport public ouvert. Cela établit seulement le récit et l'attente d'un auteur dans les environnements cités. Cela n'établit ni la cause, ni le comportement actuel, ni la fréquence, ni une solution prise en charge, ni le comportement d'un autre compte, version, fournisseur, flux ou système.

## Situation rapportée

- `user_report_summary` : un rapporteur public décrit une transmission du parent vers un sous-agent : l'enfant semblait démarrer, puis répondait comme s'il n'avait reçu aucune mission. Le rapport mentionne le symptôme sur plusieurs surfaces et réglages nommés.
- `observed_symptom` : la tâche enfant était visible ou active, mais sa réponse ne démontrait pas la réception du texte fourni.
- `expected_behavior` : le rapporteur attendait que l'enfant reçoive le message du parent et agisse en conséquence.
- `official_boundary` : `unknown`. Ce cas ne décrit ni les mécanismes internes, ni la prise en charge actuelle, ni une configuration ou une correction.
- `product_surface` : bureau et CLI selon le rapport ; aucun des deux n'est reproduit ici.
- `product_version` : les versions et réglages de la source ne sont pas vérifiés indépendamment.
- `operating_system` : une plateforme est mentionnée par la source ; ce projet ne l'a pas inspectée.
- `model_or_provider` : le contexte concernait un fournisseur personnalisé ; aucune comparaison de fournisseurs n'est faite.
- `network_or_auth_context` : non inspecté ; aucun compte, secret, fournisseur ou réseau n'a été utilisé.
- `input_shape` : contrôle de reçu avec une phrase fixe et fictive ; aucune tâche, aucun dépôt, fichier, secret ou contenu utilisateur réel.
- `risk_level` : `medium` si un flux réel délègue une action irréversible ou du contenu sensible avant confirmation du reçu

## Tableau des affirmations et des preuves

| Affirmation | Classe de preuve | Source ou artefact | Date | Périmètre | Limite | État |
|---|---|---|---|---|---|---|
| L'Issue publique #37822 existait et était ouverte lors de l'accès. | `direct` | [GitHub Issue #37822](https://github.com/openai/codex/issues/37822) | 2026-08-14 | Métadonnées publiques | L'état ouvert ne prouve ni un défaut actif, ni sa priorité, ni sa reproduction, ni une cause non résolue. | candidate |
| Un rapporteur décrit un enfant créé ou réveillé sans reçu visible. | `reported` | La même Issue publique | 2026-08-14 | Environnements et observations d'un auteur | Ce n'est ni une reproduction indépendante ni une affirmation générale. | candidate |
| Un champ interne ou un chemin de déchiffrement particulier aurait supprimé le message. | `not_observed` | Aucune source locale, exécution ou revue indépendante | 2026-08-14 | Mécanisme interne et diagnostic | L'hypothèse du rapporteur n'est pas adoptée comme fait du projet. | unverified |
| Création, réveil, reçu, exécution et retour sont des affirmations à distinguer. | `project_inference` | Ce cas ; chapitres 10 et 12 ; Lab 013 | 2026-08-14 | Enseignement prudent des flux multi-étapes | Cela ne garantit ni l'implémentation, ni la détection de tous les échecs, ni la sécurité d'un agent. | candidate |

## État de reproduction

- `reproduction_status` : `not_run`
- `reproduction_scope` : le projet n'a appelé aucun outil de transmission, créé aucun sous-agent, inspecté aucun journal ou session, utilisé aucun fournisseur et exécuté aucun environnement rapporté.
- `fixed_input_or_fixture` : carte de reçu hors ligne originale de la section **Conversion pédagogique**.
- `logs_or_artifacts` : carte fictive complétée et reçu de décision borné si un essai autorisé est approuvé plus tard
- `independent_reviewer` : en attente
- `last_checked_at` : 2026-08-14
- `root_cause_status` : `unknown`

## Parcours de diagnostic minimal et sûr

| Étape | Vérification en lecture seule ou action à faible risque | Observation attendue | Règle d'arrêt |
|---|---|---|---|
| 1 | Lire la carte fictive et étiqueter chaque point : créée, démarrée, reçu, exécutée, retournée. | L'état visible n'est pas transformé en reçu de tâche. | S'arrêter si une vraie tâche, un contenu privé, un outil, un compte ou une configuration apparaît. |
| 2 | Marquer `not_observed` pour le reçu lorsque la carte ne montre que la création et une réponse générique. | La transmission est `blocked` ; aucun résultat n'est accepté. | Ne pas inférer un bug, une permission manquante ou une reprise sûre. |
| 3 | Choisir un repli : tâche bornée avec un seul agent ou transmission lisible par un humain. | L'étape suivante a un responsable nommé, sans hypothèse cachée de livraison. | S'arrêter avant de créer un agent, d'envoyer un message, de modifier un réglage ou de relancer un effet réel. |

- `allowed_actions` : lire le relevé fictif, classer les observations, rédiger un reçu local et choisir un repli sans délégation
- `forbidden_actions` : créer ou réveiller un agent, envoyer une tâche, exposer un secret, lire des journaux ou sessions, modifier un fournisseur ou un indicateur, relancer un effet, installer, commit, pousser, publier ou utiliser un compte
- `minimal_safe_probe` : carte à cinq points complétée avec la phrase fixe `RECEIPT-OK`
- `stop_condition` : remplacer la phrase fixe par une vraie tâche, ne pas nommer le responsable du repli ou introduire un effet externe non examiné
- `rollback_or_cleanup` : supprimer le reçu temporaire s'il n'apporte aucune décision utile ; laisser le jeu fictif inchangé

## Conversion pédagogique

- `learner_problem` : un tableau indique qu'un assistant existe, sans permettre de savoir s'il a reçu la mission.
- `core_concept` : visibilité du cycle de vie et livraison du message sont différentes. Une transmission fiable impose un reçu avant de faire confiance à l'exécution.
- `decision_to_teach` : utiliser un probe de reçu inoffensif avant une tâche approuvée, ou garder le travail auprès d'un agent unique ou d'un humain en l'absence de reçu. Le premier choix ajoute un contrôle ; le second peut être plus lent. Aucun ne fabrique une preuve de livraison.
- `smallest_experiment` : utiliser uniquement cette carte hors ligne :

  ```text
  handoff_id: demo-01
  parent_request: "Retourner exactement : RECEIPT-OK"
  visible_status: child created; child started
  child_reply: "En attente d'une mission."
  receipt_observed: no
  execution_observed: no
  result_returned: no usable task result
  ```

  Sans exécuter d'outil, compléter le reçu borné :

  ```text
  created: observed
  started: observed
  receipt: not_observed
  execution: not_observed
  returned_result: not_accepted
  decision: blocked — utiliser un agent unique ou une transmission humaine
  external_actions: not_run
  ```

- `intentional_failure` : traiter `created` comme preuve de livraison, demander à l'enfant de deviner la mission, envoyer une tâche réelle sans reçu ou présenter le rapport comme un défaut produit confirmé.
- `required_artifact` : reçu complété, phrase nommant le point non observé et repli avec responsable
- `acceptance` : les cinq points sont distingués ; le reçu est `not_observed` ; aucune cause ou configuration n'est inventée ; aucun travail réel n'est envoyé ; un repli est nommé ; `external_actions: not_run` est inscrit.
- `transfer` : appliquer la carte à un worker de file, un webhook, une approbation, un pipeline ou un ticket d'équipe. L'invariant est qu'un événement visible du cycle de vie ne prouve pas que le contenu attendu a atteint l'acteur suivant.
- `forbidden_claims` : défaut Codex actuel, mécanisme interne, configuration prise en charge, reprise sûre, résultat exécuté, garantie de capacité, compétence de l'apprenant, transfert réussi, efficacité de sécurité ou préparation de production

## Emplacement du contenu

- `primary_chapter` : [chapitre 10 — Planifier et découper](../../book/chapters/10-planning-and-slicing-FR.md)
- `supporting_chapters` : [chapitre 12 — Boucle et arrêt de l'agent](../../book/chapters/12-agent-loop-and-stop-FR.md) ; [chapitre 9 — Vérification et récupération](../../book/chapters/09-verification-and-recovery-FR.md)
- `primary_lab` : [Lab 013 — Tranche verticale](../../book/labs/lab-013-l3-vertical-slice-FR.md)
- `supporting_labs` : [Lab 007 — Limites d'action](../../book/labs/lab-007-action-boundaries-FR.md) ; [Lab 016 — Limite des effets secondaires](../../book/labs/lab-016-side-effect-boundary-FR.md)
- `related_skill` : [Task Protocol](../../skills/prysai-task-protocol/SKILL.md) ; [Evidence Review](../../skills/prysai-evidence-review/SKILL.md)
- `evaluation_fixture` : aucun
- `update_registry_entry` : revoir lorsque la source change, qu'une limite officielle est admise, qu'une reproduction locale contrôlée est proposée ou qu'un exercice de transmission est demandé

Ce cas rend un signal public ancien consultable et lui donne une forme pédagogique sûre. Il ne change pas la maturité des chapitres, labs, Skills ou évaluations liés.

## Vie privée, permissions et maintenance

- `personal_data_removed` : oui ; exercice fictif sans identité de source
- `secrets_removed` : oui ; aucun compte, fournisseur, chemin, contenu de tâche ou session n'est utilisé
- `private_paths_removed` : oui
- `copyrighted_material_boundary` : résumé et carte fictive originaux uniquement ; aucune prose d'Issue, commande, trace, pièce jointe, capture ou réponse n'est copiée
- `asset_register_entry` : S89 dans `docs/sources/asset-register.md`
- `volatile_facts` : état de l'Issue, prise en charge produit, comportement de transmission, versions, fournisseurs, permissions et détails d'implémentation
- `next_review` : 2026-09-14, ou avant toute affirmation produit, runtime, configuration ou publication
- `change_trigger` : changement de source, admission d'une documentation officielle, projet d'exercice en ligne ou demande d'une transmission exécutable
- `owner` : research-maintainer

## Limites des affirmations

- `what_can_be_claimed` : un rapport public ancien est présenté comme un cas borné avec source, symptôme, classes de preuve, état de reproduction, diagnostic hors ligne et condition d'arrêt.
- `what_must_not_be_claimed` : que le rapport soit actuel ou reproductible, que toutes les transmissions soient touchées, que la cause soit connue, qu'un réglage corrige le problème, qu'un message caché ait été reçu, que la carte détecte tous les échecs ou qu'un apprenant ait réalisé une délégation réelle.
- `next_smallest_check` : exécution consentie et revue indépendamment du probe fixe dans un environnement nommé, avec phrase inoffensive, sans session, dépôt, secret, compte, tâche privée ou donnée personnelle, et arrêt avant tout effet.
- `current_status` : `candidate`
