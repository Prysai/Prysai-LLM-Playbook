<!-- content_id: prompt-escalation-boundary-source-and-action-2026-08-14 | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: prompt-escalation-boundary-source-and-action-2026-08-14.md | source_revision: 2026-08-23 -->

# Quand un prompt simple ne suffit plus : la limite entre source et action

**État :** candidat de recherche / `not_run`

**Consulté le :** 2026-08-14 (America/Los_Angeles)

**Responsable :** curriculum-maintainer

**Prochaine revue :** 2026-11-14, ou avant d'en faire une carte apprenant, de l'évaluer avec des apprenants ou de l'utiliser pour une affirmation sur un produit nommé.

## Question et périmètre

Quelle décision minimale, compréhensible par un débutant, sépare un prompt textuel ordinaire d'un travail qui exige une investigation appuyée par des sources ou un protocole de tâche auditable ? Ce relevé ne donne pas de conseils généraux de rédaction. Il ne couvre que le premier aiguillage entre :

1. transformer ou discuter un texte déjà fourni ;
2. établir une affirmation importante sur le monde extérieur ;
3. modifier un fichier, un compte, un système partagé, une publication ou un autre état externe.

Il ne prescrit pas de format universel, ne compare pas les modèles, ne vérifie pas une source, n'exécute pas de tâche et n'évalue pas un apprenant. C'est une limite de routage du cœur de collaboration LLM, pas un adaptateur de plateforme.

## Méthode et choix des sources

Seules des références de première main sont conservées : la documentation actuelle des développeurs OpenAI et une publication du NIST. La page OpenAI est volatile et limitée à un produit ; le document NIST est un profil de risque, non un guide de prompts ni un test de modèle. Les deux ont été lus seulement. Aucun compte, appel API, échange de modèle, session apprenant, recherche de source ou exécution n'a eu lieu.

L'inférence du projet reste prudente : commencer par un prompt simple uniquement si le lecteur peut vérifier la sortie contre les éléments fournis et si aucune affirmation externe actuelle ni action externe n'est requise. Sinon, escalader. Il s'agit d'une décision de programme, pas d'une affirmation selon laquelle un prompt long serait dangereux ou l'escalade infaillible.

## Carte des preuves

| ID | Affirmation | Classe | Appui principal et périmètre | Limite |
|---|---|---|---|---|
| O1 | OpenAI montre un prompt simple pour produire un court texte fictif. | fait officiel | Exemple d'histoire du soir en une phrase dans le guide de prompt engineering. | Ne dit rien sur les faits importants, les conséquences ou le travail interproduits. |
| O2 | OpenAI décrit le comportement non déterministe des prompts et recommande tests et suites d'évaluation quand la complexité ou les modèles changent. | fait officiel | Même guide, section « Prompt engineering ». | Guidance API, pas preuve d'un échec particulier, d'un résultat d'apprentissage ou d'une règle universelle. |
| O3 | Le profil NIST GenAI classe la confabulation parmi les risques et rend la gestion dépendante du contexte. | fait officiel | NIST AI 600-1. | Ne classe pas une tâche ou une source de ce dépôt comme sûre ou dangereuse. |
| P1 | Le débutant peut demander : « La réponse introduira-t-elle un fait externe important ou changera-t-elle quelque chose hors de la conversation ? » | inférence du projet | Test original dérivé de O1–O3 et des contrats du projet. | Aucun résultat apprenant, modèle ou revue indépendante. |
| L1 | Aucune vérification de source, exécution de workflow ou observation d'apprenant n'a été faite. | reproduction locale | `not_run`, revue de source et de contrat seulement. | Aucun effet de fiabilité ou d'enseignement ne suit. |

## Le problème débutant, en version étroite

« Cette politique est-elle encore valable ? Résume-la et mets à jour notre page d'aide publique. » mélange une affirmation externe actuelle et une action de publication. Une réponse fluide peut cacher l'absence de propriétaire de source, date, permission, cible et preuve d'acceptation. Aucune enquête ni mesure d'utilisateurs n'est fournie ici : c'est un scénario pédagogique défini par le projet, pas une mesure de fréquence.

## Carte d'escalade

| Demande | Première action sûre | Repli | Arrêt | Route existante | Ce qui n'est pas affirmé |
|---|---|---|---|---|---|
| « Réécris mon paragraphe fourni sans ajouter de faits. » | Nommer le texte, le public, la forme de sortie et le contrôle de conservation. | Dialogue Brief ou First-Turn Check. | Arrêter si une nouvelle source, un compte, un fichier ou une action est requis. | `prysai-dialogue-brief` / `prysai-first-turn-check` | Un prompt clair ne prouve ni l'adéquation ni la vérité du texte. |
| « Cette politique ou ce fait produit est-il actuel ? » | Fixer une seule affirmation, décision, date, propriétaire de source et condition de changement. | Réduire à une question ouverte si le périmètre échappe. | `unresolved` si le propriétaire est invérifiable, le périmètre flou ou la certitude demandée trop forte. | `prysai-source-investigator` | Une recherche sourcée ne prouve ni exhaustivité, ni validité future, ni résultat de décision. |
| « Compare plusieurs options et dis-moi ce que conclut la recherche. » | Écrire décision, candidats, critères, classes de sources, date limite et livrable. | Une recherche bornée sur le seul fait décisif restant. | Arrêter si l'ensemble ne peut être fixé sans deviner. | `prysai-research-router` | Un plan ou une liste de citations n'est pas une revue complète, une validation indépendante ou une recommandation. |
| « Utilise la réponse pour mettre à jour, envoyer, publier, acheter, connecter ou modifier. » | Séparer la recherche de faits et la modification proposée ; préciser cible, actions, responsable, acceptation, point de contrôle et restauration. | Garder un brouillon non envoyé ou un plan en lecture seule. | Arrêter si autorité, cible, frontière de données, preuve ou confirmation manquent. | `prysai-task-protocol` | Un protocole complet n'autorise ni ne prouve l'exécution, la sécurité, le déploiement ou la restauration. |

## Test de routage compact

Avant le premier appel, répondre simplement : (1) puis-je juger la sortie uniquement avec le texte et les faits fournis ? (2) faut-il une affirmation externe actuelle ou un changement hors conversation ? Si oui à la première et non à la seconde, un prompt textuel peut convenir. Une affirmation importante passe par la source ; une action externe passe aussi par le contrat de tâche. Si les deux sont présentes, garder découverte de source et autorité d'action séparées. Les sujets médicaux, juridiques, financiers, d'emploi, d'éducation, de logement, d'immigration, d'assurance ou de sécurité personnelle demandent une revue humaine ou experte adaptée ; ce relevé ne la fournit pas.

## Limite d'échec et preuve d'acceptation

Échec : demander en un tour « confirme la règle actuelle et envoie la mise à jour ». La réponse est assurée et contient un lien, mais le propriétaire de la source, la date, l'emplacement de soutien, la cible et l'autorisation d'envoi restent inconnus.

Récupération minimale : conserver le brouillon non envoyé, séparer question de source et action proposée, puis s'arrêter à la règle d'entrée manquante de la route choisie. Ne pas demander au modèle d'inventer l'autorité ni utiliser une page inaccessible comme preuve.

Acceptation candidate : le lecteur peut montrer le résultat visé, le caractère matériel de l'affirmation, l'action proposée, la route choisie et la condition d'arrêt. Cela vérifie seulement que le routage est explicite, pas la source, la sortie, l'action ou l'apprentissage.

## Frontière avec les documents existants

Ce relevé ne remplace pas les contrats first-turn, research, source ou task. Il ajoute une distinction minimale : un prompt simple traite une transformation ou discussion textuelle fournie ; Source Investigator traite une question actuelle bornée ; Research Router traite une recherche non résolue ou multi-source ; Task Protocol traite autorité, effets secondaires, preuve d'acceptation et récupération. Aucun nouveau Skill, chapitre, Lab, carte, fixture d'évaluation ou affirmation lecteur n'est proposé.

## Sources principales

| ID | URL faisant autorité | Propriétaire | Date | Périmètre et maintenance |
|---|---|---|---|---|
| O1, O2 | [Documentation OpenAI : Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering.md) | OpenAI | 2026-08-14 | Guidance développeur liée au produit ; revérifier avant toute citation d'API, modèle, évaluation ou comportement précis. |
| O3 | [NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) | National Institute of Standards and Technology | 2026-08-14 | Profil de risque ; revérifier avant toute affirmation de conformité, incident ou risque système. |

## Limites, divulgation et prochaine preuve

Le texte est original et rédigé par Prysai. Les sources sont liées comme preuves ; aucun prompt, code ou support pédagogique externe n'est copié. Le relevé ne prouve pas qu'un débutant reconnaît la limite, qu'un modèle route correctement, que les citations sont valides ou que les routes améliorent sécurité ou réussite.

Avant d'en faire un contenu lecteur, mener une observation apprenant à faible risque et pré-déclarée. Conserver la demande initiale, la route choisie, la raison, les champs non résolus, le temps écoulé et la confusion éventuelle entre plan/citation et preuve d'exécution. Garder `candidate` tant qu'une preuve observée ne permet pas une affirmation plus étroite.
