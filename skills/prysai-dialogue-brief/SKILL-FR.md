<!-- content_id: prysai-dialogue-brief | locale: FR | language: fr | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: dea08a5 | source_license: project-owned CC-BY-4.0 -->

# Brief de dialogue

Transformez une demande nouvelle et peu risquée en un premier message court, prêt à copier-coller. Ce Skill intervient avant une réponse de fond, une action avec un outil, une recherche ou une séquence d’apprentissage. Il n’exécute pas la demande et n’évalue pas la réponse.

## Vérifier d’abord que le Skill est adapté

Utilisez-le seulement si toutes les conditions suivantes sont réunies :

- la personne n’a pas encore envoyé sa demande et aucune réponse ratée n’est à réparer ;
- il s’agit d’un premier échange textuel à faible risque ;
- aucun fichier, outil, compte, accès web, document privé, publication ou action externe n’est nécessaire ;
- la personne veut formuler une demande délimitée, et non s’exercer ou rechercher un fait.

Si l’apprenant demande une ligne de base, un retour, une correction ou un exercice de transfert, passez à `prysai-learning-coach`. Si la demande concerne Codex, les outils, les Skills ou les Agents, passez à `prysai-codex-coach`. Si elle implique des fichiers, des autorisations, un compte, une action externe ou une vraie cible de livraison, passez à `prysai-task-protocol`. Pour des faits actuels, des sources ou une conclusion étayée, passez à `prysai-source-investigator` ou `prysai-research-router`. Si la demande et une réponse insatisfaisante existent déjà, utilisez `prysai-communication-failure-triage` ; pour vérifier qu’une affirmation est étayée, utilisez `prysai-evidence-review`.

Ne demandez ni secrets, ni données personnelles sensibles, ni documents non publiés, ni identifiants, ni état de compte, ni prompts privés. Préparer un brief n’autorise aucune action ultérieure.

## Recueillir seulement ce qu’il faut pour le premier tour

Conservez autant que possible les mots de la personne et rassemblez ces champs :

```text
outcome: un résultat observable que la première réponse doit produire
audience: les personnes qui utiliseront ou liront le résultat
supplied_inputs: les textes ou faits sûrs disponibles pour ce tour
constraints: les faits, limites, ton, exclusions ou règles d’aide à préserver
output_shape: la forme et la longueur demandées
acceptance_check: ce que la personne vérifiera avant d’accepter le résultat
stop_boundary: ce qui ne doit pas arriver ou le fait manquant qui impose l’arrêt
```

Si un champ manquant modifierait sensiblement le résultat, renvoyez le reçu `needs_clarification` ci-dessous avec une seule question claire. Ne rédigez pas un brief partiel, n’inventez ni public ni détail et ne posez pas plusieurs questions pour donner une impression de complétude. Si le résultat observable reste impossible à définir après cette clarification, renvoyez `blocked: outcome_not_observable` et indiquez la plus petite décision manquante.

## Rédiger le brief du premier tour

Renvoyez d’abord un brief de 120 à 180 mots, puis un premier message prêt à copier. Limitez le périmètre à un seul tour. Employez des mots directs et ordinaires ; n’ajoutez ni rôle, ni pression émotionnelle, ni demande de raisonnement caché, ni promesse de performance, ni formule creuse comme « soyez utile ».

Le message prêt à copier doit contenir naturellement ces éléments étiquetés :

```text
Outcome
Audience
Supplied inputs
Constraints
Output shape
Acceptance check
Stop boundary
```

Si un fait nécessaire n’a pas été fourni, demandez au modèle destinataire de le marquer `unknown` plutôt que de l’inventer. Si des sources sont nécessaires, demandez un plan de sources ou arrêtez-vous ; ne demandez pas une réponse factuelle assurée sans preuve.

## Renvoyer un reçu compact

Si un champ important manque, renvoyez exactement :

```text
brief_status: needs_clarification
clarifying_question:
known_inputs:
risk: R0
content_status: candidate
handoff:
```

Lorsque les champs suffisent, renvoyez exactement :

```text
brief_status: ready_to_copy | blocked
dialogue_brief: 120–180 words
first_turn: copy-ready text
inputs_preserved:
unknowns:
acceptance_check:
stop_boundary_or_blocker:
risk: R0
evidence: selected brief revision only
content_status: candidate
handoff:
```

N’acceptez le résultat que s’il conserve les faits fournis, contient une vérification observable, interdit d’élargir de son propre chef les données ou les actions et indique une route pour le travail qui dépasse le premier tour. `ready_to_copy` signifie seulement que le brief est présent ; cela ne prouve ni le comportement du modèle, ni la qualité de la réponse, ni l’apprentissage, ni l’exactitude des faits, ni la satisfaction de l’utilisateur, ni l’achèvement de la tâche.

## Fiche de maintenance

- `source` : méthode originale de Prysai Lab, réorganisée à partir des contrats communication-clinic, task, evidence et routing
- `license` : réécriture originale ; les documents externes restent des références dans `docs/sources/asset-register.md`
- `owner` : communication-systems maintainer
- `version` : `0.1.0`
- `review_date` : `2026-09-12`
- `content_status` : `candidate`
