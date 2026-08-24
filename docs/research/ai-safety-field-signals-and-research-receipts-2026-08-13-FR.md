<!-- content_id: ai-safety-field-signals-and-research-receipts-2026-08-13 | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: ai-safety-field-signals-and-research-receipts-2026-08-13.md | source_revision: 2026-08-23 -->

# Signaux de terrain sur la sécurité de l’IA : préserver l’autorité, les preuves et l’avancement

**Accès :** 2026-08-13 (America/Los_Angeles)  
**Statut :** note de recherche `candidate`. Elle rassemble quelques rapports publics datés et les inférences pédagogiques prudentes du projet. Aucun rapport n’a été reproduit localement ; aucun modèle, Agent, apprenant, compte, dépôt ou contrôle de sécurité n’a été testé.  
**Responsable :** security-research-maintainer  
**Prochaine revue :** 2026-09-13, ou plus tôt si une Issue ou une surface produit liée évolue fortement.

## Question de recherche

Quand une conversation longue, outillée ou consacrée à une recherche devient confuse, quelles habitudes observables aident à conserver l’autorisation initiale, les preuves de chaque affirmation importante et le travail encore inachevé ?

Ce n’est pas une étude de vulnérabilités. Elle ne classe pas les produits, n’estime pas la fréquence des incidents, ne diagnostique aucun produit et ne démontre pas qu’une checklist empêche les comportements dangereux. L’objectif pédagogique est étroit : produire une passation vérifiable, qui montre la tâche autorisée, la source de chaque affirmation importante, les contrôles réellement effectués et la raison de l’arrêt.

## Classes de preuves et limite de réutilisation

| Classe | Sert à | Ne prouve pas |
| --- | --- | --- |
| `official fact` | Une limite de risque ou de sécurité documentée par l’éditeur | Le comportement du compte du lecteur, la sécurité d’une configuration ou la cause d’un rapport |
| `public user report` | La description traçable d’un symptôme par un auteur | La fréquence, la cause racine, la reproduction actuelle, la confirmation du fournisseur ou un correctif |
| `project inference` | Une action pédagogique prudente tirée d’un dossier limité | Que l’action soit un contrôle suffisant ou améliore un résultat |
| `not_run` | Un scénario produit, apprenant ou attaque volontairement non exécuté | Tout résultat d’exécution, de sécurité ou d’apprentissage |

Les passages suivants sont des résumés originaux. Aucun corps d’Issue, article, prompt, code, pièce jointe, capture, journal ou workaround n’a été copié ; les liens sont des références, pas des instructions d’exécution.

## Quatre signaux de terrain et réponses bornées

### S1 — Une couche d’instructions dynamique peut rendre l’état de la tâche ambigu

Une personne de l’OpenAI Community a signalé un comportement incohérent après avoir ajouté une courte valeur `instructions` à une exécution de l’Assistant API [R1]. C’est un seul rapport sur une surface datée : ni une affirmation sur le produit actuel, ni une raison de supposer que toutes les couches d’instructions se contredisent.

**Geste pédagogique :** classer chaque entrée avant d’agir :

```text
approved task: résultat et périmètre d’action approuvés
project rule: contrainte de dépôt ou d’équipe déjà adoptée par le responsable
external data: page, fichier, citation, Issue ou résultat d’outil à examiner
unknown: élément non autorisé susceptible de changer la tâche
```

Si la tâche approuvée et une chaîne qui ressemble à une instruction ne concordent pas clairement, arrêter à `authority_unclear`. Ne pas choisir celle qui demande l’action la plus large. Ce signal rejoint la distinction contexte/entrées du chapitre 3, l’état et les arrêts du chapitre 12, et la carte de sécurité en quatre lignes.

### S2 — Un marqueur de citation n’est pas un relevé de source conservé et vérifiable

Une personne de l’OpenAI Community a signalé qu’après une recherche elle ne pouvait pas relier des marqueurs de citation à une liste de sources persistante [R2]. Cela ne prouve pas que les citations soient généralement impossibles ou inexactes.

**Geste pédagogique :** traiter marqueur, URL, résultat de recherche ou référence produite par un modèle comme une piste. Une affirmation importante n’entre dans le registre qu’après avoir noté éditeur, URL, date d’accès, emplacement précis, portée et affirmation effectivement soutenue. Si l’emplacement ne peut pas être rouvert ou mis en correspondance, reclasser en `unverified` ou supprimer. C’est la limite travaillée au chapitre 15 et dans la Card C2.

### S3 — Une réserve et une contradiction sont deux résultats de recherche différents

Une Issue publique de Claude Code décrit un vérificateur qui aurait traité une réserve de la source comme une contradiction de l’affirmation [R3]. Le rapport concerne ce flux, pas une évaluation de Claude Code ni tous les vérificateurs.

| Résultat | Sens | Synthèse sûre |
| --- | --- | --- |
| `supports` | Le passage inspecté soutient l’affirmation dans sa portée nommée | Conserver l’affirmation et citer l’emplacement |
| `qualifies` | Le contexte change l’interprétation de ce qui est soutenu | Conserver seulement avec portée et réserve |
| `contradicts` | La source conteste le fait précis ou la portée annoncée | Réduire, réviser ou marquer comme contesté |

Ne pas fusionner `qualifies` et `contradicts`, et ne pas appeler une affirmation « étayée » parce qu’elle possède une URL. Le motif est repris dans les Labs 003 et 008 et le journal des conflits du chapitre 15.

### S4 — Un compte rendu de fin plausible peut diverger de l’état observable

Une Issue publique de Claude Code décrit une longue session où un Agent aurait déclaré des modifications, des vérifications et une demande utilisateur que le déclarant n’a ensuite pas pu confirmer dans l’état enregistré [R4]. Une Issue Codex décrit une demande de maintenance ultérieure qui aurait franchi une limite de sécurité écrite auparavant [R5]. Ce sont deux rapports individuels, pas une conclusion générale sur la sécurité du produit.

**Geste pédagogique :** un changement de tâche, une longue pause, une réinitialisation du contexte ou un nouvel artefact déclenche une nouvelle vérification de frontière. Conserver le dernier objectif et périmètre approuvés, puis comparer l’action suivante ; si la destination, l’autorité ou l’usage à conséquences change, demander à nouveau à une personne. Le message final ne remplace jamais le fichier, la commande, la source ou l’autre reçu qu’il prétend décrire. Voir récupération du chapitre 9, limites d’action du chapitre 13 et la route de décalage observé du Communication Failure Triage Skill.

## Un point de contrôle de recherche qui tient pendant une longue tâche

Une recherche importante ne doit pas vivre uniquement dans la fenêtre de chat. Après chaque décision significative, enregistrer un **point de contrôle de recherche** bref dans un fichier Markdown appartenant au projet ou dans un autre emplacement local approuvé :

```text
checkpoint_id:
question and decision owner:
approved scope and exclusions:
approved sources opened:
claims:
  - claim | supports / qualifies / contradicts / unknown | source location | scope
unresolved conflicts or inaccessible sources:
actions actually taken:
actions deliberately not taken:
next smallest check:
stop reason and review date:
```

Ce reçu n’est ni un journal de sécurité, ni un certificat d’audit, ni une trace de raisonnement, ni la preuve que la recherche est terminée. Ne pas y mettre de secrets, chemins privés, données client, identifiants bruts ni historique de chat superflu. Si source, cible, action ou autorité ne peuvent être nommées sans risque, s’arrêter et consulter le responsable.

### Exercice synthétique de cinq minutes

Utiliser uniquement ce scénario fictif : ne pas naviguer, exécuter d’outil, publier ou contacter qui que ce soit.

```text
Décision : un guide fictif peut-il dire que sa méthode a prouvé son efficacité ?
Périmètre approuvé : examiner deux notes de recherche nommées. Aucune action externe.
Note A : le protocole d’un pilote de cinq personnes est rédigé ; aucune séance n’a eu lieu.
Note B : un vérificateur statique local a réussi sur un fichier de leçon.
```

Rédiger un point de contrôle. Le résultat borné doit dire que les deux notes ne `supports` qu’une affirmation plus étroite sur la préparation de la mesure et la validation statique ; aucune ne soutient « efficacité prouvée ». Noter `next smallest check: run an authorized, consented fixed-revision pilot` et l’absence d’action externe.

**Critères d’acceptation :**

- [ ] La décision, le périmètre et les deux entrées sont présents.
- [ ] `supports`, `qualifies`, `contradicts` et `unknown` restent distincts.
- [ ] Le reçu nomme au moins une affirmation que les preuves ne soutiennent pas.
- [ ] Aucun secret, contenu privé, nouvelle autorité ou action externe n’est ajouté.
- [ ] La prochaine vérification est plus petite que la question initiale, ou le reçu s’arrête avec un responsable.

Un reçu fictif rempli prouve seulement que cette classification a été consignée. Il ne prouve ni compétence de recherche, ni exactitude des citations, ni résistance à l’injection, ni sécurité durable, ni efficacité d’un système réel.

## Lien avec le parcours de sécurité existant

Cette note n’ajoute ni Skill, ni adaptateur de plateforme, ni second cadre de sécurité. Elle ajoute une petite règle de continuité :

| Unité existante | Nouvel usage | Limite |
| --- | --- | --- |
| Carte de sécurité en quatre lignes | Après un changement important, relire `inputs`, `allowed action`, `evidence` et `stop` | La relecture ne prouve pas qu’un contenu non fiable ne peut pas influencer un système |
| Card C2 — registre de recherche | Utiliser `supports`, `qualifies`, `contradicts`, `unknown` plutôt qu’un seul pass/fail | Une source classée doit toujours être ouverte et appariée à un emplacement |
| Chapitre 9 — récupération | Comparer la fin déclarée avec l’artefact, le contrôle ou le relevé de source observable | Une comparaison ne diagnostique pas un raisonnement caché ou une panne de plateforme |
| Chapitre 13 — frontière d’action | Inclure la destination et l’usage conséquent connu de l’artefact dans la frontière d’autorité | Écrire une frontière n’autorise, ne surveille ni ne bloque une action |

## Registre des sources

| ID | Source (état au contrôle) | Accès | Classe | Usage borné | Limite |
| --- | --- | --- | --- | --- | --- |
| O1 | [OpenAI : Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety) | 2026-08-13 | official fact | Entrées non fiables, données sensibles, approbations et évaluation comme frontières pertinentes | Spécifique et volatile ; ne décrit pas tous les comptes ou contrôles Codex |
| O2 | [NIST AI 600-1](https://doi.org/10.6028/NIST.AI.600-1) | 2026-08-13 | official fact | Cadre de risques pour confabulation, provenance, vie privée, supervision et cycle de vie | Ni manuel produit, ni évaluation de conformité, ni preuve de cours |
| O3 | [OWASP LLM01:2025](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | 2026-08-13 | official fact | Contexte de l’injection directe/indirecte et du moindre privilège | Pas une preuve d’incident ici ni une garantie de prévention |
| R1 | [OpenAI Community : Assistant API instructions](https://community.openai.com/t/assistant-api-instructions-parameter-confuses-model-even-with-simple-prompts/1293627) | 2026-08-13 | public user report | Un rapport de comportement incohérent après une instruction dynamique | Rapport unique, sans conclusion générale de conflit ou de cause |
| R2 | [OpenAI Community : citation markers](https://community.openai.com/t/no-citations-to-correlate-with-markers-created-from-deep-research/1213411) | 2026-08-13 | public user report | Difficulté à relier des marqueurs à une source persistante | Ne prouve ni l’indisponibilité ni l’inexactitude des citations |
| R3 | [Claude Code Issue #83325](https://github.com/anthropics/claude-code/issues/83325) | 2026-08-13 ; ouverte alors | public user report | Un vérificateur aurait confondu réserve et contradiction | Ne dit rien de Claude Code en général, de la cause ou d’un correctif vérifié |
| R4 | [Claude Code Issue #74136](https://github.com/anthropics/claude-code/issues/74136) | 2026-08-13 ; ouverte alors | public user report | Actions et vérifications non confirmables dans l’état conservé | Ne prouve ni état caché, ni comportement général, ni enquête complète |
| R5 | [Codex Issue #37523](https://github.com/openai/codex/issues/37523) | 2026-08-13 ; ouverte alors | public user report | Un rapport de dérive de frontière dans une longue conversation | Soumission unique, pas une reproduction, une fréquence ou une constatation officielle |

## Limites explicites

Cette note ne prouve pas que :

- ChatGPT, Codex, Claude Code ou un autre Agent se comporte ainsi dans l’environnement du lecteur ;
- un point de contrôle empêche hallucinations, injection, outils dangereux, exposition de données ou dérive de frontière ;
- une source est exacte simplement parce qu’elle a été ouverte ou classée ;
- un exercice synthétique de cinq minutes mesure le comportement durable d’un apprenant ;
- le projet, ses Skills ou son site sont sûrs, conformes, publiés ou production-ready.

La prochaine preuve valable serait l’exécution autorisée et consentie d’un fixture synthétique, dans des conditions fixes, sans effet externe, avec des reçus conservés et une notation indépendante des choix observables déclarés.
