<!-- content_id: universal-first-turn-prompt-contract-2026-08-13 | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: universal-first-turn-prompt-contract-2026-08-13.md | source_revision: 2026-08-23 -->

# Contrat de prompt du premier tour : un protocole débutant, borné

**Date du protocole :** 2026-08-13  
**Sources consultées :** 2026-08-13 (America/Los_Angeles)  
**Statut :** document de recherche `candidate`. Aucun prompt exécuté, aucune comparaison de modèles, aucune évaluation par des apprenants, de la qualité des sources, de la rétention, du transfert ou indépendante.  
**Responsable :** curriculum-maintainer  
**Prochaine revue :** 2026-09-13, ou avant toute adaptation à un produit nommé, toute étude ou toute présentation comme preuve d’un résultat utilisateur.

## Périmètre et question

Ce document propose deux petites cartes originales pour le premier message d’un débutant : un
échange de cinq minutes pour pratiquer l’espagnol et un échange de cinq minutes pour trier une
question de recherche. Elles utilisent des champs en langage courant, sans syntaxe, nom d’outil,
réglage de compte, nom de modèle ni couche d’instructions cachée propres à un produit.

**Question :** quels champs du premier tour restent compréhensibles entre plusieurs produits LLM,
sans prétendre que leurs produits, comptes, outils ou sorties sont équivalents ?

Ici, *universel* signifie seulement qu’une personne peut exprimer les mêmes champs en langage simple
en changeant de produit. Cela ne signifie pas qu’OpenAI, Anthropic, Google, Microsoft et Meta offrent
les mêmes modèles, fonctionnalités, outils, gestion du contexte, contrôles de données, prix,
disponibilité, autorisations, réponses ou comportement de sécurité. Consultez la documentation actuelle
de la surface réellement utilisée.

Les cartes sont volontairement limitées : aucun accès au compte, navigation, voix, téléversement,
contact, achat, publication, exécution de code ou décision de santé, de droit, de finance, d’emploi ou
d’orientation scolaire. Ne collez pas de dossiers privés, identifiants, données personnelles ou recherche
confidentielle avant d’avoir compris les contrôles de données et l’autorisation applicables.

## Classes de preuve et limite des affirmations

| Classe | Utilisation dans ce document | Ne permet pas d’établir |
| --- | --- | --- |
| `official fact` | Guide de prompt publié par un fournisseur dans le périmètre de son produit | Équivalence entre produits, exactitude de la sortie, efficacité pédagogique |
| `public user report` | Besoin ou difficulté rapporté à une date donnée par une personne | Prévalence, fait actuel sur un produit, cause racine, remède validé |
| `community suggestion` | Aucun élément conservé ici | Conseil officiel ou preuve d’efficacité |
| `local reproduction` | Aucune ; `not_run` | Comportement d’un produit ou résultat d’un utilisateur |
| `project inference` | Carte prudente qui rend visibles intention, limites et fiche de clôture | Que la carte fonctionne avant une évaluation appropriée |

`not_run` est un état, pas une preuve. Il signifie qu’aucun temps d’exécution, comportement de modèle,
score de qualité, réponse d’apprenant, évaluation linguistique, contrôle de citation ou résultat de transfert
n’a été observé.

## Guides officiels : des périmètres séparés

Les cinq pages officielles ci-dessous sont hébergées par des organisations différentes et restent
spécifiques à leurs produits. OpenAI parle d’instructions, de contexte, d’exemples et d’évaluation des
prompts ; Anthropic demande de définir des critères de réussite et un test empirique avant l’optimisation ;
Google présente les instructions claires et précises ainsi que les exemples ; Microsoft décrit instruction,
contenu principal et exemples ; Meta publie un guide de prompting pour Llama.

Ce sont cinq faits officiels distincts, pas un benchmark commun. La seule **déduction du projet** est
la suivante : le premier tour d’un débutant devrait rendre visibles la tâche, le contexte disponible,
la réponse demandée, les limites et la condition de vérification ou d’arrêt. Les sources ne prouvent pas
que ces champs sont nécessaires, suffisants, optimaux, stables entre produits ou efficaces pour apprendre
une langue ou faire de la recherche.

## Deux signaux publics datés

Ces signalements servent uniquement à rendre visibles deux besoins plausibles de débutants. Ils ne sont
ni copiés dans un support pédagogique ni utilisés comme faits produit.

| ID | Signalement public | Signal étroit conservé | Limite stricte |
| --- | --- | --- | --- |
| U1 | OpenAI Community, [*Learn languages at the same time*][U1], publié le 2024-12-03, consulté le 2026-08-13 | Une personne souhaitait des séances de langue plus longues et percevait une limite d’utilisation | Objectif et contrainte perçue d’une personne ; pas un quota actuel, une estimation de demande ou une preuve d’apprentissage |
| U2 | OpenAI Community, [*Long instruction prompt on short input data*][U2], publié le 2024-06-24, consulté le 2026-08-13 | Une personne envoyait de longues instructions avec de petites entrées variables et demandait une meilleure interaction | Préoccupation d’un workflow ; pas une preuve sur tous les produits, la mémoire, le coût ou une configuration recommandée |

**Déduction du projet :** une courte première demande avec une frontière de tâche visible et une petite
fiche est plus facile à inspecter que « apprends-moi une langue » ou « fais des recherches là-dessus ».
Ce n’est pas une solution éprouvée aux limites d’accès, à la persistance des instructions, au réglage de
la difficulté ou à la qualité des réponses.

## Contrat candidat du premier tour

Ce contrat est rédigé par le projet. C’est une liste de contrôle pour composer une demande, pas une
grammaire de commande ni une promesse sur l’interprétation du système.

| Champ | Ce que fournit le lecteur | Pourquoi il existe | Ne pas en déduire |
| --- | --- | --- | --- |
| **Un résultat** | Un résultat petit et observable pour la séance | Séparer la prochaine action d’une aspiration générale | Maîtrise, aisance, expertise, garantie d’achèvement |
| **Contexte de départ** | Petit exemple personnel, faits connus, sources fournies ou `unknown` | Montrer ce sur quoi la réponse peut s’appuyer | Évaluation valide de la personne ou du matériau |
| **Réponse demandée** | Forme, longueur ou séquence bornée | Donner un objet à conserver ou à refuser | Exactitude, pertinence, conformité |
| **Limites** | Données à ne pas partager, actions à ne pas prendre, aide non demandée | Rendre autorité et effets de bord explicites | Confidentialité, sécurité ou conformité complètes |
| **Vérification** | Question, condition de source ou demande de révision qui expose l’incertitude | Éviter de traiter la réponse comme auto-validante | Faits vérifiés, qualité pédagogique, score fiable |
| **Arrêt et fiche** | Condition de fin et petite trace à conserver | Rendre visibles l’inachevé et la suite | Rétention, transfert, tâche réelle terminée |

![Rendez la limite visible : nommez les six champs du premier tour. Leur visibilité ne certifie ni sécurité, ni exactitude, ni achèvement.](../../assets/teaching/first-turn-contract-card.svg)

### Avant l’envoi : vérifier, sans certifier

Pour une demande textuelle, sans risque et encore non envoyée, le [First-Turn Check Skill](../../skills/prysai-first-turn-check/SKILL.md)
peut marquer chaque champ `visible`, `missing`, `unclear` ou `out_of_scope`. Il renvoie au plus trois
lignes `add_or_clarify` importantes, sans réécrire la demande. Utilisez [Dialogue Brief](../../skills/prysai-dialogue-brief/SKILL.md)
pour rédiger le premier message et [Task Protocol](../../skills/prysai-task-protocol/SKILL.md) si un fichier,
un outil, un compte, une autorisation ou un effet externe intervient.

Cette méthode rend le brouillon plus facile à examiner ; elle ne valide ni réponse, comportement du produit,
traitement des données, sécurité ni résultat d’apprentissage.

## Carte A : cinq minutes de pratique de l’espagnol

Un exercice original et sans enjeu, limité à un bref échange écrit. Il n’évalue pas une personne,
ne lui attribue pas de niveau CECR ou autre, n’utilise ni voix ni navigation et ne prétend pas mesurer
la communication réelle.

### Utiliser seulement si

- le sujet est ordinaire et non sensible, par exemple saluer ou commander une boisson ;
- l’essai tient en quelques phrases ;
- les corrections sont traitées comme des suggestions à vérifier, pas comme une évaluation linguistique autoritaire.

### Carte originale

~~~text
I have five minutes for beginner Spanish practice.

Outcome: I want to write one polite two-sentence reply for [a simple situation].
Starting context: [words I know, a self-written attempt, or "unknown"].

Give me one short situation and wait for my reply. Do not assign a level or
claim that I have learned Spanish. After I reply, point out at most two changes
that would most affect meaning or politeness. For each change, say whether you
are uncertain. Ask me for one revision.

Do not use personal information, browse, contact anyone, or turn this into a
study plan. End by listing: my first reply, my revision, help used, one thing I
should check elsewhere, and the smallest next practice or stop condition.
~~~

### Ce qu’une fiche de cinq minutes peut montrer

Au plus, qu’une personne a fait un court essai dans une séance enregistrée, reçu une aide déclarée
et révisé son texte. Elle ne démontre ni acquisition de l’espagnol, ni grammaire correcte, ni registre
approprié, ni autonomie, ni rétention, ni transfert, ni niveau. Une correction destinée à un message réel
doit être vérifiée auprès d’une personne compétente ou d’une source faisant autorité.

## Carte B : cinq minutes de triage de recherche

Cette carte rend la prochaine étape de recherche inspectable ; elle ne produit ni réponse finale ni texte
qui imite une citation. Elle utilise le matériel fourni dans la conversation actuelle, sauf si une capacité
de recherche ou de navigation documentée a été explicitement accordée et vérifiée.

### Utiliser seulement si

- la question peut être formulée en une phrase ;
- aucun résultat ne servira seul à prendre une décision à fort enjeu ;
- les URL ou titres nécessaires à une vérification ultérieure peuvent être conservés.

### Carte originale

~~~text
I have five minutes to prepare a research check, not a final answer.

Question: [one narrow question].
Material I supplied: [URLs, titles, excerpts, or "none"].

First, restate the question and name what evidence would be needed. Then make a
three-row table with: possible claim, supplied source or "missing", and what
would need checking. Do not invent citations, state that you opened a source
you cannot access, or give a recommendation. Separate fact, report, and
inference. If the material is missing, contradictory, personal, or high stakes,
stop and tell me the smallest safe next step.

End with: sources actually supplied, unknowns, and one question I should answer
before continuing.
~~~

La carte ne prouve pas qu’une source existe, soit à jour, présentée équitablement ou soutienne une
affirmation. Elle ne prouve ni exactitude factuelle, ni exhaustivité, ni qualité scientifique, ni suffisance
juridique, ni sécurité d’une décision. URL, citation, résumé, tableau ou niveau de confiance générés ne sont
pas des preuves à eux seuls.

## Limite d’une promesse d’apprentissage en sept jours

Ce document ne prouve pas qu’une personne peut ou ne peut pas apprendre l’espagnol, ou une autre langue,
en sept jours. Il faudrait au minimum un niveau de départ, une compétence cible, un relevé de la pratique et
de l’aide, une tâche d’évaluation, des critères de notation, l’indépendance des évaluateurs, un intervalle
de rétention et une condition de transfert. Rien de cela n’a été recueilli.

Sept conversations quotidiennes, ou une exécution de chaque carte, ne prouvent ni aisance, ni niveau,
ni rétention, ni communication indépendante, ni effet causal d’un LLM. Les guides officiels et les deux
témoignages individuels ne comblent pas ces lacunes.

## Ce qui n’est pas établi

Le document n’établit pas que les cartes améliorent l’apprentissage, la recherche ou le prompting ;
qu’un produit nommé les suit de la même manière ; qu’une réponse, correction, citation ou synthèse est exacte ;
qu’un produit peut évaluer un apprenant, vérifier une source ou prendre une décision à fort enjeu ; que U1 ou U2
est fréquent, actuel, causé par un produit ou résolu par ce contrat ; qu’une séance dure cinq minutes ou que
sept jours donnent aisance, rétention ou transfert ; ni que le document a reçu des essais d’apprenants, une
revue indépendante, une évaluation de sécurité ou une autorisation de production.

## Limite des sources, de la réutilisation et des licences

Il s’agit d’une synthèse originale de Prysai Lab. Le contrat et les deux cartes ont été écrits pour ce document ;
aucun prompt externe, exemple de fournisseur, texte de forum, item d’évaluation, code, capture, image, logo,
identifiant ou donnée utilisateur n’a été copié ni adapté. Les documents externes sont seulement liés et paraphrasés
en bref ; leurs conditions, licences, périmètres produit et disponibilité restent ceux de leurs propriétaires et peuvent changer.
Une adaptation à une surface donnée exige une nouvelle revue de sa documentation et de ses conditions.

## Registre des sources

| ID | Classe | Source et accès | Utilisation bornée | Responsable / prochaine revue | Ne prouve pas |
| --- | --- | --- | --- | --- | --- |
| O1 | official fact | OpenAI [*Prompt engineering*][O1], 2026-08-13 | Instructions, contexte, exemples et évaluation dans le périmètre OpenAI | facts-maintainer / 2026-09-13 | autre produit, exactitude, efficacité d’apprentissage |
| O2 | official fact | Anthropic [*Prompt engineering overview*][O2], 2026-08-13 | Critères de réussite et test empirique | facts-maintainer / 2026-09-13 | autre produit, efficacité, résultats apprenant |
| O3 | official fact | Google [*Prompt design strategies*][O3], 2026-08-13 | Instructions claires, spécifiques et exemples | facts-maintainer / 2026-09-13 | autre produit, exactitude des sources, résultat linguistique |
| O4 | official fact | Microsoft Learn [*Prompt engineering techniques*][O4], 2026-08-13 | Instruction, contenu principal et exemples | facts-maintainer / 2026-09-13 | équivalence de modèles, qualité de recherche |
| O5 | official fact | Meta [*Prompt engineering*][O5], 2026-08-13 | Guide de prompting Llama | facts-maintainer / 2026-09-13 | autre produit, exactitude, résultat débutant |
| U1/U2 | public user report | OpenAI Community, dates indiquées plus haut | Objectif et préoccupation de workflow d’une personne | curriculum-maintainer / 2026-09-13 | prévalence, limite, cause, remède |
| P1 | project inference | Contrat et cartes de ce document | Première demande inspectable et indépendante du produit | curriculum-maintainer / `not_run` | équivalence, exactitude, efficacité, durée |
| L1 | local reproduction | Aucune ; `not_run` | Aucun prompt, modèle, produit ou apprenant exécuté | curriculum-maintainer / `not_run` | tout résultat comportemental ou pédagogique |
| C1 | community suggestion | Aucun élément conservé | Non nécessaire pour cette conclusion étroite | curriculum-maintainer / `not_run` | demande, bonne pratique, efficacité |

## Fiche d’arrêt et lacunes de preuve

La recherche s’est arrêtée après l’examen de cinq guides officiels appartenant à des organisations
distinctes et de deux signalements publics datés et traçables. Aucun compte n’a été utilisé, aucun modèle
n’a été interrogé, aucune donnée personnelle n’a été collectée et aucune comparaison de produits n’a été tentée.

On ignore encore si les débutants comprennent les cartes, les terminent en cinq minutes, si les surfaces
acceptent le texte de la même façon, si les sorties sont exactes, si les corrections conviennent et si la
pratique se maintient ou se transfère hors session. Une future évaluation nécessitera un protocole autorisé,
une tâche et un environnement déclarés, un consentement et des limites de données, des conditions produit
enregistrées et une vérification indépendante.

[O1]: https://developers.openai.com/api/docs/guides/prompt-engineering
[O2]: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
[O3]: https://ai.google.dev/gemini-api/docs/prompting-strategies
[O4]: https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering
[O5]: https://www.llama.com/docs/how-to-guides/prompting/
[U1]: https://community.openai.com/t/learn-languages-at-the-same-time/1040799
[U2]: https://community.openai.com/t/long-instruction-prompt-on-short-input-data/837381
