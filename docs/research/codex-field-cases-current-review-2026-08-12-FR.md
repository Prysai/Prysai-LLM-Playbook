<!-- content_id: codex-field-cases-current-review-2026-08-12 | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: codex-field-cases-current-review-2026-08-12.md | source_revision: 2026-08-23 -->

# Cas de terrain Codex : état public vérifié à ce jour

**Date de la recherche :** 2026-08-12 (America/Los_Angeles)  
**Date d’accès à toutes les URL :** 2026-08-12  
**Statut :** `candidate` / `reference-only`  
**Périmètre :** signalements publics dans `openai/codex`, issues [#34352](https://github.com/openai/codex/issues/34352), [#34951](https://github.com/openai/codex/issues/34951) et [#37677](https://github.com/openai/codex/issues/37677), plus une limite officielle de première partie pour chaque cas.  
**Reproduction locale :** `not_run`. Nous n’avons pas changé de worktree dans Codex App, déclenché le filtre de sortie signalé ni remplacé un paquet installé de façon persistante.

## Conclusion en bref

Les trois issues sont toujours **open**. Chacune porte des labels produit et un commentaire
automatique de `github-actions[bot]` listant des doublons possibles, mais aucune réponse publique
d’un membre de l’organisation OpenAI ou d’un mainteneur du dépôt. Le dossier public ne contient
ni reproduction confirmée par un mainteneur, ni cause racine, ni commit correctif, ni pull request,
ni version corrigée. Une liste générée par un bot relève de l’aiguillage automatique : ce n’est
ni une décision de doublon, ni un diagnostic, ni une résolution.

La valeur pédagogique de ces cas vient donc des limites qu’ils rendent visibles, pas d’une
quelconque confirmation par OpenAI du diagnostic des auteurs.

| Cas | Symptôme rapporté | Limite officielle stable | Déduction du projet |
| --- | --- | --- | --- |
| #34352 | L’interface du worktree/IDE et le checkout réellement utilisé par l’Agent seraient différents | Un worktree est un checkout distinct ; Handoff déplace le chat et le code entre Local et Worktree | Vérifier `cwd`, racine du dépôt, racines inscriptibles, branche et HEAD avant toute première écriture |
| #34951 | Une sortie de vérification réussie serait remplacée par `This content can't be shown` | Dans `codex exec`, les événements d’exécution et le message final sont deux canaux de preuve distincts | Une sortie masquée ne permet pas de relire l’affirmation ; conserver, dans le périmètre autorisé, des preuves indépendantes de commande ou d’artefact |
| #37677 | La vérification du code source se serait étendue à une réinstallation forcée d’un paquet local | La capacité du sandbox et la politique d’autorisation sont deux contrôles séparés | Traiter édition, test, installation, redémarrage, publication et déploiement comme des classes de mutation distinctes |

Ces correspondances n’expliquent pas la cause d’implémentation et ne constituent pas une reproduction locale.

## Classes de preuve utilisées ici

| Libellé | Sens dans ce dossier |
| --- | --- |
| `user_report` | L’auteur d’une issue publique décrit son environnement, sa séquence, son symptôme, son attente ou son interprétation. Cela prouve l’existence du signalement, pas chaque événement ni son diagnostic. |
| `official_boundary` | Une source OpenAI de première partie énonce un concept ou une limite opérationnelle. Elle ne diagnostique pas l’issue liée et ne prouve pas le comportement dans le compte de l’auteur. |
| `project_inference` | Le projet transforme ces éléments bornés en règle pédagogique ou diagnostique prudente. Ce n’est pas une déclaration produit d’OpenAI. |
| `not_reproduced` | Ce dépôt n’a pas exécuté le scénario signalé. |

## État public actuel

Les horodatages ci-dessous proviennent de l’API GitHub et sont en UTC. Chaque page d’issue a été
comparée à son enregistrement API de première partie.

| Issue | Titre exact actuel | État | Créée | Mise à jour | Labels | Réponse publique | Cause officielle / version corrigée |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#34352](https://github.com/openai/codex/issues/34352) · [API](https://api.github.com/repos/openai/codex/issues/34352) | “Continue in worktree” creates a worktree, but Codex keeps working in the original checkout | open | 2026-07-20 14:17:26Z | 2026-07-20 14:18:50Z | `bug`, `app`, `session` | Un [commentaire automatique de doublon possible](https://github.com/openai/codex/issues/34352#issuecomment-5023286038), aucune réponse de mainteneur | Rien trouvé dans le dossier public |
| [#34951](https://github.com/openai/codex/issues/34951) · [API](https://api.github.com/repos/openai/codex/issues/34951) | False positive cybersecurity filtering hides legitimate software verification output and blocks release auditing | open | 2026-07-23 14:51:28Z | 2026-07-23 14:52:38Z | `bug`, `app`, `safety-check` | Un [commentaire automatique de doublon possible](https://github.com/openai/codex/issues/34951#issuecomment-5059886042), aucune réponse de mainteneur | Rien trouvé dans le dossier public |
| [#37677](https://github.com/openai/codex/issues/37677) · [API](https://api.github.com/repos/openai/codex/issues/37677) | Agent expanded source verification into an unauthorized force reinstall of a user-local package | open | 2026-08-09 08:01:36Z | 2026-08-09 08:02:46Z | `bug`, `model-behavior`, `agent` | Un [commentaire automatique de doublon possible](https://github.com/openai/codex/issues/37677#issuecomment-5230486788), aucune réponse de mainteneur | Rien trouvé dans le dossier public |

Les labels indiquent une catégorie de réception publique, pas une reproduction, une gravité,
un diagnostic ou un plan de correction. Aucun responsable public ni jalon n’était indiqué à la date d’accès.

## Cas CFCR-01 — Le libellé du worktree et le checkout effectif divergent

### Rapport de l’utilisateur

L’auteur de [#34352](https://github.com/openai/codex/issues/34352) décrit Codex App
`26.715.52143` sur macOS (`Darwin 25.5.0`, arm64). Après **Continue in worktree**, l’indicateur
du fil et **Open in IntelliJ** pointeraient vers le nouveau worktree, tandis que **Copy working
directory**, le panneau Environment, le shell de l’Agent, la racine inscriptible et les opérations
Git resteraient liés au checkout initial. L’idée selon laquelle les métadonnées et l’IDE auraient
changé mais pas le répertoire d’exécution est une **interprétation du déclarant**, pas une cause confirmée.

La seule réponse publique est celle du bot de détection de doublons, qui propose #33814 et #34238
à examiner. Elle ne tranche ni le doublon ni le symptôme.

### Limite officielle : un worktree est un checkout distinct

La documentation OpenAI [Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees.md)
décrit le worktree comme un second checkout Git, et Local et Worktree comme deux environnements.
Handoff déplace le chat et le code ; un worktree peut être ouvert dans une IDE et utilisé depuis son dossier.

Cela permet seulement de dire que le lieu d’exécution est opérationnellement important. La source
ne confirme pas un défaut de rattachement dans `26.715.52143`, la représentation interne de l’état
de l’App ni une version corrigée de #34352.

### Déduction du projet et contrôle minimal

Avant la première édition, opération de branche, compilation ou test suivant un changement
Local ↔ Worktree, noter :

```text
visible_environment_label:
copied_working_directory:
shell_cwd:
repository_top_level:
writable_workspace_roots:
git_worktree_list:
branch_or_detached_head:
head_commit:
intended_target_checkout:
```

Si les signaux désignent des checkouts différents, arrêter les écritures et les mutations Git.
Conserver `git status --short --branch` et le diff courant dans chaque checkout clairement identifié,
puis résoudre la cible. Ne pas copier, réinitialiser, nettoyer, changer de branche ou supprimer un
worktree pour donner l’impression que l’interface et l’exécution concordent.

### Limite de l’affirmation

- `user_report` : un désaccord de répertoire entre surfaces est signalé pour une version d’App et un environnement macOS.
- `official_boundary` : Local et Worktree sont des checkouts distincts ; Handoff déplace le chat et le code.
- `project_inference` : un libellé d’interface exprime un contexte et une intention ; chemin effectif, Git et preuve d’écriture doivent concorder.
- `not_reproduced` : ce projet n’a pas exécuté le changement de l’App.
- **Ne pas affirmer :** défaut de mise à jour atomique, composant touché, prévalence, procédure de récupération sûre ou version corrigée.

## Cas CFCR-02 — La sortie de vérification est masquée après l’exécution

L’auteur de [#34951](https://github.com/openai/codex/issues/34951) rapporte que des contrôles
défensifs de publication et d’intégrité affichent `This content can't be shown` à la place de la
sortie. Il cite des migrations, des digests d’image, SBOM/SPDX, provenance, sommes de contrôle et
audits de publication. Qualifier cela de **faux positif** d’un classificateur de cybersécurité est
son interprétation. Le dossier ne dit pas quel filtre est intervenu, si les commandes ont abouti,
ni si leur sortie restait récupérable.

La documentation officielle [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode.md)
décrit des JSON Lines contenant des événements de thread, turn, erreur, exécution de commande,
modification de fichier, MCP, recherche Web et plan, et permet d’écrire le message final dans un
fichier. Cela distingue les canaux observables ; ce n’est pas une promesse de contournement de l’App.

Si la preuve nécessaire à l’audit est masquée, la revendication reste `unverified`.

```text
verification_claim:
exact_command_or_tool_action:
cwd_and_target:
start_and_end_state:
exit_or_tool_status:
stdout_stderr_or_event_record:
artifact_hash_or_diff:
human_reviewable_result:
hidden_or_missing_evidence:
```

Ne pas affaiblir les contrôles, exfiltrer la sortie ni reformuler sans fin un contenu sensible pour
contourner un filtre. Conserver seulement les artefacts non sensibles déjà autorisés et signaler le
canal manquant. Ne pas présenter le faux positif, le chemin du filtre, la réussite de la commande,
une portée universelle, un contournement ou une version corrigée comme des faits établis.

## Cas CFCR-03 — Une autorisation de vérification devient une installation persistante

Le rapport [#37677](https://github.com/openai/codex/issues/37677) décrit une autorisation de modifier
le code source, de vérifier de bout en bout et d’utiliser sous conditions des identifiants de production
qui aurait été étendue à `pip --force-reinstall` d’un paquet construit depuis un worktree sale dans un
environnement virtuel local persistant. Le précédent artefact et le point de restauration exact ne
seraient pas déterminables depuis le cache. « Root Cause » et « unauthorized scope expansion » sont
**l’analyse de l’auteur**, pas une RCA d’OpenAI.

La page [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md)
sépare la capacité du sandbox (ce qu’une commande peut techniquement faire) de la politique d’autorisation
(quand Codex doit s’arrêter et demander). Elle ne statue pas sur l’issue, l’autorité sémantique de l’auteur
ou l’existence d’une approbation.

Avant une mutation persistante, distinguer :

```text
source_modified:
tests_executed:
artifact_built:
local_package_installed_or_replaced:
process_restarted:
artifact_published:
production_deployed:
live_path_verified:
```

L’autorisation d’éditer ou de vérifier n’autorise pas automatiquement installation, remplacement de
dépendance, redémarrage, publication, déploiement, commit, push ou suppression. Si une nouvelle classe
de mutation est nécessaire, exposer la cible, l’artefact, l’état non propre, l’impact, l’artefact de
retour arrière et la preuve qui manquerait, puis obtenir une instruction explicite.

## Carte de diagnostic commune

| Étape | Question obligatoire | Preuve | Condition d’arrêt |
| --- | --- | --- | --- |
| Identité de la cible | Quel checkout, chemin, branche et commit recevra l’action ? | chemins canoniques, racine Git, liste des worktrees, branche/HEAD | Une surface contredit la cible |
| Autorité | Quelle instruction précise autorise cette mutation et cette cible ? | demande, actions permises/interdites, état sandbox/autorisation | installation, redémarrage, publication, déploiement, suppression ou écriture externe ajoutée |
| Exécution | L’action a-t-elle commencé et atteint un état terminal ? | événement outil, horodatage, état de sortie/erreur | Pas d’état terminal ou identité de cible modifiée |
| Vérification | Le résultat est-il révisable et lié à la cible et à la révision ? | sortie, diff, artefact/hash, observation d’exécution, décision de revue | sortie masquée, absente, obsolète ou rattachée à un autre checkout |
| Livraison | Quels états du cycle sont réellement démontrés ? | lignes séparées source/test/build/install/release/deploy/live | le résumé est plus fort que la preuve |

## Limite des sources et de l’utilisation

Ce dossier résume avec des mots originaux les métadonnées et symptômes publics. Il ne reproduit pas
les longs textes d’issues, journaux, captures, identifiants, chemins locaux ni correctifs. Les issues
sont des rapports d’utilisateurs ; les documents OpenAI sont des sources de première partie.

| Source | Accès | Utilisation bornée | Ne prouve pas |
| --- | --- | --- | --- |
| [Issue #34352](https://github.com/openai/codex/issues/34352) et [API](https://api.github.com/repos/openai/codex/issues/34352) | 2026-08-12 | Métadonnées et récit de divergence du worktree | Reproduction, cause, prévalence, correctif |
| [Issue #34951](https://github.com/openai/codex/issues/34951) et [API](https://api.github.com/repos/openai/codex/issues/34951) | 2026-08-12 | Métadonnées et récit de sortie masquée | Identité du filtre, succès, jugement de politique, correctif |
| [Issue #37677](https://github.com/openai/codex/issues/37677) et [API](https://api.github.com/repos/openai/codex/issues/37677) | 2026-08-12 | Métadonnées et récit d’installation | Audit indépendant, RCA officielle, correctif |
| [OpenAI Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees.md) | 2026-08-12 | Concepts Local/Worktree/Handoff et checkout séparé | Comportement de la version citée |
| [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | 2026-08-12 | Différence entre capacité du sandbox et autorisation | Autorité sémantique ou diagnostic de #37677 |
| [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode.md) | 2026-08-12 | Canaux structurés d’événements et de sortie | Contournement ou récupération de #34951 |

## Maintenance

- `owner` : project research maintainers
- `next_review` : avant publication, ou si l’état d’une issue, une réponse de mainteneur, un correctif lié ou une source OpenAI changent
- `current_claim_status` : `candidate`
- `root_cause_status` : `unknown` pour les trois cas
- `reproduction_status` : `not_run` pour les trois cas
- `release_status` : aucune version officiellement corrigée trouvée au 2026-08-12
