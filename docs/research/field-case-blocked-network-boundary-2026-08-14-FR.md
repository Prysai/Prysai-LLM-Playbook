<!-- content_id: field-case-blocked-network-boundary-2026-08-14 | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: field-case-blocked-network-boundary-2026-08-14.md | source_revision: 2026-08-23 -->

# Cas de terrain : `FC-NETWORK-01` — Une requête bloquée n’élargit pas l’autorité

## Commencer par la limite

Une requête bloquée signifie que le chemin actuel ne peut pas continuer. Cela n’autorise ni un accès réseau sans restriction, ni un proxy, ni une permission plus large.

Avant de modifier un réglage, noter trois éléments :

1. Le seul résultat externe dont la tâche a besoin, sans ajouter de véritable endpoint ni de secret.
2. La personne capable d’approuver une exception minimale, ou l’artefact hors ligne approuvé qui pourrait la remplacer.
3. La sonde minimale et non sensible, ainsi que les preuves à conserver si l’exception est approuvée.

Si l’un de ces éléments est inconnu, s’arrêter et demander une décision plus étroite. Cette page est une aide à la décision hors ligne, pas un guide de configuration : elle n’effectue aucune requête réseau, n’enseigne pas de réglage de proxy et ne consigne aucun comportement produit en direct.

## Identité du cas

- `case_id` : `FC-NETWORK-01`
- `title` : Une requête bloquée n’élargit pas l’autorité
- `problem` : une requête réseau est bloquée et il faut choisir entre une exception minimale et révisable, ou l’élargissement de l’accès sans preuve.
- `audience` : débutants et relecteurs utilisant un environnement de programmation outillé
- `collected_at` : 2026-08-14
- `owner` : research-maintainer
- `content_status` : `candidate`
- `related_chapters` : chapitre 4 ; chapitre 9 ; chapitre 13
- `related_labs` : Lab 001 ; Lab 007 ; Lab 016
- `related_skills` : Task Protocol ; Evidence Review
- `related_evaluations` : aucune attribuée

## Fiche de source

- `source_type` : `forum`
- `source_url` : https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox
- `source_title` : question publique sur l’accès sortant depuis une session Codex CLI en sandbox
- `source_author_or_publisher` : contributeur public de Stack Overflow
- `accessed_at` : 2026-08-10, comme indiqué dans l’ensemble de recherche `field-problems-forums-2026-08-10.md`
- `source_license_or_usage_boundary` : rapport public de référence ; ce cas utilise un résumé original et un jeu de test hors ligne fictif
- `quotation_policy` : aucun texte de la publication, fragment de configuration, journal, identifiant, URL réelle ou commande de contournement n’est copié
- `source_scope` : la question établit seulement qu’une personne a décrit une requête sortante bloquée dans un environnement donné. Elle n’établit ni la syntaxe actuelle, ni une limite officielle, ni une solution sûre, ni la cause racine, ni le comportement d’un autre environnement.

## Situation rapportée

- `user_report_summary` : l’auteur de la question avait besoin qu’une commande atteigne un hôte public tout en gardant le sandbox, mais la requête a été bloquée avant l’achèvement.
- `observed_symptom` : un blocage sortant ressemblant à celui d’un proxy ou d’une liste d’autorisation a été rapporté.
- `expected_behavior` : l’auteur espérait qu’un chemin réseau étroit puisse coexister avec le sandbox.
- `official_boundary` : `unknown` dans ce cas. Aucune syntaxe actuelle ni garantie de prise en charge n’est enseignée.
- `product_surface` : CLI, selon le rapport
- `product_version` : non enregistrée comme fait vérifié
- `operating_system` : non enregistré comme fait vérifié
- `model_or_provider` : sans incidence sur la décision pédagogique
- `network_or_auth_context` : un chemin sortant restreint est rapporté ; aucun compte, proxy ou identifiant n’a été inspecté
- `input_shape` : un hôte public nécessaire à la tâche, dont le véritable nom est volontairement omis
- `risk_level` : `high` si la tâche réelle élargissait le réseau, exposait le contexte du projet ou ajoutait un proxy

## Tableau des affirmations et des preuves

| Affirmation | Classe de preuve | Source ou artefact | Date | Périmètre | Limite | État |
|---|---|---|---|---|---|---|
| Une personne a signalé une requête sortante bloquée dans une session Codex CLI en sandbox | `reported` | [Stack Overflow #79970154](https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox) | 2026-08-10 | Un environnement rapporté | Une question n’est ni une reproduction, ni un diagnostic, ni une garantie | candidate |
| Le rapport contient une recette actuelle et sûre | `not_observed` | Aucune configuration n’a été copiée, testée ou relue indépendamment | 2026-08-14 | Configuration et déploiement | Délibérément hors périmètre | unverified |
| Un blocage autorise un réseau sans restriction ou une modification de proxy | `not_observed` | Aucune autorisation du responsable ni tâche en direct | 2026-08-14 | Autorité de modifier la politique réseau | Un blocage est une preuve de limite, pas une permission de la supprimer | unverified |
| La requête doit rester bloquée tant que la cible, le motif, le périmètre minimal et la sonde sûre ne sont pas révisables | `project_inference` | Ce cas, chapitre 13 et Labs 007 et 016 | 2026-08-14 | Règle pédagogique prudente sur les effets externes | Ne définit pas la configuration d’un fournisseur et ne garantit pas une exception sûre | candidate |

## État de reproduction

- `reproduction_status` : `not_run`
- `reproduction_scope` : le projet n’a effectué aucune requête réseau, inspecté aucun sandbox en direct, modifié aucun proxy, ajouté aucune liste d’autorisation et utilisé aucun compte.
- `fixed_input_or_fixture` : relevé hors ligne de la section **Conversion pédagogique**
- `logs_or_artifacts` : carte de limite et court reçu de décision si un exercice est autorisé
- `independent_reviewer` : en attente
- `last_checked_at` : 2026-08-14
- `root_cause_status` : `unknown`

## Diagnostic minimal et sûr

| Étape | Vérification en lecture seule ou action à faible risque | Observation attendue | Règle d’arrêt |
|---|---|---|---|
| 1 | Écrire dans un jeu de test local le résultat, la catégorie d’hôte, l’action autorisée, la preuve et la condition d’arrêt. | L’effet externe est distingué de l’objectif de la tâche. | S’arrêter si l’hôte, le motif, le responsable, la classe de données ou l’effet externe est inconnu. |
| 2 | Enregistrer le blocage synthétique comme `reported` et lister la politique effective, la cible, le périmètre minimal et la sonde manquants. | Le relevé en forme d’erreur reste une preuve de limite, pas un diagnostic. | Ne pas déduire une modification de configuration, un défaut produit ou une résolution réussie. |
| 3 | Préparer pour le responsable une demande précisant le besoin de l’hôte, la sonde minimale non sensible, les preuves à garder et le retour arrière. | La personne chargée de la revue peut approuver, refuser ou réduire l’exception. | S’arrêter avant toute requête réelle, modification de proxy, édition de politique, installation, téléversement ou utilisation d’un identifiant. |

- `allowed_actions` : lire le relevé fictif, classer les preuves, rédiger une demande locale et repérer une alternative hors ligne
- `forbidden_actions` : effectuer une requête réseau, modifier la politique, ajouter un proxy, exposer un secret, installer une dépendance, changer une permission, committer, pousser, publier ou utiliser un compte
- `minimal_safe_probe` : carte de limite en quatre lignes et demande d’approbation nommant le périmètre minimal de l’hôte et un test non sensible
- `stop_condition` : décision du responsable, classification des données, destination, plan de preuve ou retour arrière manquant
- `rollback_or_cleanup` : supprimer le reçu temporaire s’il n’y a rien à conserver ; le jeu de test fictif reste inchangé

## Conversion pédagogique

- `learner_problem` : la tâche a besoin d’une entrée externe, mais la première tentative est bloquée et la personne veut retirer la limite.
- `core_concept` : une limite technique, un besoin de tâche et l’autorité de modifier cette limite sont des faits distincts. Une erreur ne crée pas une nouvelle permission.
- `decision_to_teach` : faire une pause et demander une exception minimale et révisable, ou utiliser un artefact hors ligne approuvé ou différer la tâche. Les deux sont plus honnêtes qu’un élargissement silencieux.
- `smallest_experiment` : travailler avec ce seul relevé hors ligne, sans requête :

  ```text
  task: vérifier un checksum qui n’a pas encore été téléchargé
  local record: la demande vers l’hôte public requis est bloquée dans le fixture
  proposed next action: activer un accès réseau sans restriction et réessayer
  ```

  Écrire ce reçu :

  ```text
  observed: le fixture consigne un blocage
  known need: la tâche du checksum a besoin d’un hôte public de la catégorie nommée
  missing evidence: politique effective, approbation, sonde minimale et retour arrière
  decision: blocked — demander une exception minimale ou un artefact hors ligne approuvé
  external actions: not_run
  ```

- `intentional_failure` : traiter le blocage comme l’autorisation d’activer le réseau sans restriction, déclarer un proxy sûr sans revue ou dire que le checksum est vérifié sans artefact inspectable.
- `required_artifact` : reçu complet, phrase séparant objectif et autorité, et alternative hors ligne sûre
- `acceptance` : le reçu consigne le blocage sans le diagnostiquer ; l’hôte est indiqué seulement par catégorie ; la proposition sans limite est refusée ; une décision ou alternative est nommée ; `external actions: not_run` est conservé.
- `transfer` : appliquer la même limite à un téléchargement de paquet, une API de recherche, un webhook ou une soumission navigateur. L’invariant est qu’un besoin technique ne crée pas d’autorité ; la cible et la sonde minimale changent.
- `forbidden_claims` : configuration actuelle de Codex, politique réseau officielle, défaut produit, proxy sûr, requête réussie, reproduction locale, compétence de l’apprenant, efficacité de sécurité, transfert réussi ou préparation à la production

## Emplacement du contenu

- `primary_chapter` : [chapitre 13 — Limites d’action](../../book/chapters/13-action-boundaries-FR.md)
- `supporting_chapters` : [chapitre 4 — Contexte, permissions et limite d’action de l’agent](../../book/chapters/04-context-permissions-and-agent-FR.md) ; [chapitre 9 — Vérification, doute et récupération](../../book/chapters/09-verification-and-recovery-FR.md)
- `primary_lab` : [Lab 016 — Limite des effets secondaires](../../book/labs/lab-016-side-effect-boundary-FR.md)
- `supporting_labs` : [Lab 001 — Première tâche sûre](../../book/labs/lab-001-first-safe-task-FR.md) ; [Lab 007 — Limites d’action](../../book/labs/lab-007-action-boundaries-FR.md)
- `related_skill` : [Task Protocol](../../skills/prysai-task-protocol/SKILL.md) ; [Evidence Review](../../skills/prysai-evidence-review/SKILL.md)
- `evaluation_fixture` : aucun
- `update_registry_entry` : revoir si la source publique change, si une politique officielle est admise, si un exercice en direct est proposé ou si un exemple de configuration est ajouté

Ce cas transforme un ancien signal de terrain en cas consultable et borné. Il ne change pas la maturité des contenus associés.

## Vie privée, permissions et maintenance

- `personal_data_removed` : oui ; l’exercice est fictif et ne réutilise ni identité ni endpoint réels
- `secrets_removed` : oui ; aucun identifiant, proxy, compte, chemin privé ou URL réelle
- `private_paths_removed` : oui
- `copyrighted_material_boundary` : résumé et jeu de test originaux uniquement ; aucune publication, configuration ou réponse n’est copiée
- `asset_register_entry` : S88 dans `docs/sources/asset-register.md`
- `volatile_facts` : état de la source, configuration, valeurs par défaut, comportement du proxy et prise en charge du produit
- `next_review` : 2026-09-14, ou avant toute affirmation de configuration, de sécurité, d’exécution ou de publication
- `change_trigger` : changement de source ou de documentation officielle, exercice en direct proposé ou nouvel exemple de configuration
- `owner` : research-maintainer

## Limites des affirmations

- `what_can_be_claimed` : un ancien témoignage public est représenté comme un cas candidat avec type de source, symptôme, classes de preuves, état de reproduction, diagnostic à faible risque et règle d’arrêt.
- `what_must_not_be_claimed` : que le rapport soit actuel ou reproductible, que la cause soit connue, que l’accès sans restriction soit nécessaire ou sûr, qu’un produit accepte une configuration donnée, que le fixture prouve un contrôle de sécurité ou qu’un apprenant ait achevé la décision.
- `next_smallest_check` : exécution hors ligne du relevé fixe, consentie et revue indépendamment ; elle ne doit produire aucun trafic ni recueillir identifiants, comptes, projets, proxies ou données personnelles.
- `current_status` : `candidate`
