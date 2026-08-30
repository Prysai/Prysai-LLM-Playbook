<!-- content_id: llm-fundamentals-guide | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-17-foundation-observations -->

# Ce qu’est un LLM : comprendre les couches avant de lui faire confiance

**Unité :** `core-llm-boundaries`
**Statut :** `candidate`. **Exécution :** `not_run`.
**Durée indicative :** 25 minutes. **Prérequis :** aucun. Vous n’avez besoin ni de Codex, ni de Git, ni d’un compte payant, ni d’un outil.

Cette page est le point de départ du Playbook. Avant de choisir un produit,
de joindre un fichier ou de demander à un Agent d’agir, il faut savoir quelle
couche a produit une affirmation et quel élément permet de la vérifier.

Posez quatre questions face à une nouvelle fonction d’IA :

1. Qu’est-ce que le modèle doit produire ?
2. Quel contexte a réellement été fourni pour cette demande ?
3. Quel produit ou outil peut observer ou modifier quelque chose en dehors du modèle ?
4. Quelle trace permettrait à une autre personne de contrôler l’affirmation ?

Si une réponse manque, gardez le résultat comme brouillon ou hypothèse. Ne
remplissez pas le vide avec une phrase qui paraît sûre d’elle.

## 0.1 Une phrase de travail

Un modèle de base génère du texte en estimant des séquences de tokens. De
nombreux modèles autorégressifs produisent le texte token après token à partir
du contexte disponible. L’entraînement complémentaire et les couches du
produit influencent ensuite la réponse.

Le mot « prédire » décrit le mécanisme de génération ; il ne signifie pas que
le modèle a vérifié le monde, compris une personne ou reçu l’autorisation
d’agir. Un texte fluide peut donc rester à vérifier.

## 0.2 Les neuf notions à garder séparées

| Notion | Sens minimal utile | Ce qu’il ne faut pas en déduire |
|---|---|---|
| **LLM / modèle** | Des paramètres appris produisent une réponse à partir d’un contexte. | Une base de données vérifiée, une personne ou un acteur autorisé. |
| **Token / tokenizer** | Le tokenizer transforme le texte en identifiants propres au modèle. Un token peut être un morceau de mot. | Un rapport universel token/mot ou token/caractère. |
| **Contexte** | Instructions, conversation, textes fournis, passages récupérés et résultats d’outils disponibles pour cette requête. | Que tout ce contexte soit vrai, pertinent ou correctement utilisé. |
| **Fenêtre de contexte** | Une **fenêtre de contexte finie** limite la quantité de tokens d’entrée et de sortie pour un modèle et une interface donnés. | Un nombre stable pour tous les modèles, comptes ou produits. |
| **Prompt** | Une consigne qui précise le résultat, le contexte, les contraintes et la forme attendue. | Une formule magique ou un accès implicite. |
| **Instruction utilisateur / système / développeur** | L’utilisateur décrit la tâche ; l’hôte peut appliquer des instructions de priorité supérieure. | Que l’utilisateur puisse ignorer les règles de l’hôte. |
| **Outil / récupération** | Un hôte peut proposer une recherche, un lecteur de fichiers, un calculateur ou un autre service externe. | Qu’une proposition de l’outil prouve qu’il a été exécuté. |
| **MCP** | Un protocole peut organiser la connexion entre un hôte compatible et des outils ou fournisseurs de contexte. | La compatibilité universelle, la confiance ou l’accès illimité. |
| **Agent / Skill** | Un Agent est une boucle observable ; un Skill est une procédure réutilisable que l’hôte peut charger. | Une intention humaine, un droit d’accès ou la preuve que la boucle a réussi. |

Trois distinctions restent valables dans toutes les interfaces :

- capacité, autorité et preuve sont trois observations différentes ;
- une couche supplémentaire peut ajouter une capacité sans corriger la couche précédente ;
- un texte fourni par une source ou un outil est une donnée, pas automatiquement une instruction à suivre.

Une interface peut ajouter de la **recherche, récupération, fichiers, mémoire ou
outils** au modèle ; cela change la surface observable, pas la fiabilité de
chaque résultat.

### Les notions que l’on confond le plus souvent

**Le contexte n’est pas une mémoire permanente.** Le contexte est ce que l’hôte
rend disponible pour cette requête : texte de la conversation, documents
fournis, passages récupérés et résultats d’outils. Un produit peut conserver
un historique, des préférences, des fichiers ou des embeddings, puis en
sélectionner une partie plus tard ; cette conservation et cette sélection sont
une autre décision. Une information mémorisée peut être ancienne, incomplète
ou absente de la demande actuelle. Demandez toujours : « Qu’est-ce qui a
réellement été fourni cette fois-ci ? »

**La récupération est un chemin vers une preuve, pas une garantie de vérité.**
Une recherche ou un système RAG choisit des passages à ajouter au contexte. Il
peut manquer la meilleure source, retourner une copie ou sélectionner une
version ancienne. Conservez l’URL, la date et la correspondance entre chaque
affirmation et son passage source. Une fenêtre de contexte plus grande donne
plus de place ; elle ne rend pas chaque passage pertinent ou exact.

**Un prompt est un contrat, pas un sortilège.** Une première demande utile
précise le résultat, le contexte de départ, les contraintes, la forme de la
réponse, le contrôle et la condition d’arrêt. Les instructions système ou
d’équipe peuvent avoir une priorité supérieure ; un document cité peut aussi
contenir une instruction non fiable. Traitez le texte fourni comme une donnée,
sauf si la tâche le désigne explicitement comme règle applicable.

**Un appel d’outil a deux auteurs.** Le modèle peut proposer un appel structuré ;
l’hôte décide s’il est permis ; l’outil l’exécute et renvoie une sortie. Notez
la cible, l’autorité, l’effet attendu, le résultat retourné et la relecture ou
autre preuve qui confirme l’état. Le nom d’un outil dans une réponse n’est pas
un reçu d’exécution.

**MCP réduit un problème d’intégration ; il ne supprime pas la gouvernance.**
Un protocole peut standardiser une partie de la connexion entre un hôte
compatible et des outils ou fournisseurs de contexte. L’authentification,
l’implémentation du serveur, l’approbation, le périmètre réseau, la sortie des
données et le contrôle du résultat restent des décisions séparées. « Compatible
MCP » ne veut pas dire « tous les serveurs MCP sont compatibles ou sûrs ».

**Un Agent est une boucle que l’on peut inspecter, pas une personne.** Décrivez
les états visibles : réception, plan, action proposée, approbation ou refus,
résultat d’outil, vérification, reprise, passation et arrêt. N’essayez pas de
déduire une pensée cachée. Une boucle qui se termine par un texte n’a pas
nécessairement terminé la tâche externe.

**Un Skill est un paquet de méthode, pas un droit d’accès.** Un bon Skill
indique quand il s’applique, quelles entrées il exige, ce qu’il ne doit pas
faire, comment il s’arrête et quelles preuves il rend. Le chargement progressif
peut retarder une longue référence jusqu’à ce que le déclencheur corresponde ;
il n’accorde ni fichier, ni terminal, ni navigateur, ni compte, ni permission
de publication.

## 0.3 Ce qui se passe pendant une requête

```text
demande + contexte fourni
          ↓
l’hôte assemble les instructions et le contexte
          ↓
le modèle génère une suite de tokens
          ↓
l’hôte affiche le texte ou propose un appel d’outil
          ↓
l’outil n’agit que si l’hôte et l’autorité l’autorisent
          ↓
une personne relit le résultat, les limites et la trace
```

Avec un Agent, répétez le contrôle à chaque étape :

```text
état observé → action proposée → autorité vérifiée → action exécutée
→ résultat relu → critère contrôlé → continuer, transmettre ou arrêter
```

Après un délai ou une interruption, l’état peut être inconnu. Ne relancez pas
aveuglément une action qui pourrait envoyer, publier, supprimer, payer ou
modifier un compte.

![Contrat de prompt en six champs : résultat, contexte, aide autorisée, limites, contrôle et arrêt](../../assets/teaching/prompt-contract-six-fields-red-black.svg)

![Frontière d’action observable : proposition, autorité, exécution et relecture humaine](../../assets/teaching/observable-action-boundary-red-black.svg)

## 0.4 Un peu d’histoire, sans en faire une garantie

L’article *Attention Is All You Need* de 2017 a présenté l’architecture
Transformer qui a influencé une grande partie des modèles de langage
ultérieurs. L’attention facilite les relations entre tokens dans une séquence
fournie, mais elle ne rend pas le contexte illimité. Les produits actuels
ajoutent aussi optimisation, entraînement d’instructions, contrôles de
sécurité, routage, récupération, outils et code d’interface. Aucun nom
historique ne suffit donc à expliquer le comportement de chaque service
actuel.

Cette histoire aide à comprendre une famille de techniques ; elle ne donne ni
la capacité d’un modèle précis, ni sa date de mise à jour, ni une preuve de
fiabilité. Pour une affirmation actuelle, revenez à la source de première main
et à sa date.

## 0.5 Ce que les LLM ne peuvent pas établir seuls

Sans source ou outil approprié, un modèle ne peut pas établir seul qu’une
citation existe, qu’un site est encore disponible, qu’une information actuelle
est vraie ou qu’une action a réellement eu lieu. Un système de recherche peut
ajouter un chemin vers une preuve, mais ce chemin peut être incomplet, ancien
ou mal sélectionné. Avant de croire une affirmation actuelle, **vérifiez la
source originale et sa date**, plutôt que de vous fier uniquement à la date de
coupure du modèle.

Avant de coller ou d’envoyer une donnée, vérifiez ce qui peut quitter
l’interface actuelle et qui l’a autorisé. Une réponse plausible ne devient pas
un paiement, une publication, une suppression ou une modification de compte
sans frontière d’action explicite et preuve correspondante.

## 0.6 Vérification des limites en cinq minutes

N’utilisez qu’un texte fictif. N’activez ni recherche, ni fichier, ni donnée
privée. Écrivez d’abord deux suites possibles pour :

> Le club se réunit mardi à 18 h ; le numéro de salle sera confirmé plus tard.

Le bon constat est que le numéro de salle n’est pas fourni. Envoyez ensuite :

Pour une variante d’actualité sans données privées, la phrase de départ peut
être : « La bibliothèque municipale fermera aujourd’hui à 18 h. » Elle ne
permet pas de déduire la raison de la fermeture, une adresse ou un horaire du
lendemain.

```text
Avis : « Le club se réunit mardi à 18 h. Apportez un carnet. Le numéro de
salle sera confirmé plus tard. »

Tâche : réécrivez l’avis pour une nouvelle personne en deux phrases. Conservez
chaque fait. Placez les informations absentes entre crochets, puis listez les
faits conservés.
Contrôle : comparez chaque phrase avec l’avis. N’ajoutez ni numéro de salle,
ni tarif, ni contact, ni promesse, ni nouvel horaire.
Arrêt : ne naviguez pas, n’envoyez rien, ne publiez rien et n’inventez aucun détail.
```

Conservez la première demande et la première réponse, puis vérifiez chaque
proposition :

| Vérification | Question |
|---|---|
| Correspondance avec la source | Pouvez-vous retrouver chaque fait dans l’avis ? |
| Forme | La réponse comporte-t-elle deux phrases et la liste des faits conservés ? |
| Élément inconnu | Le numéro de salle est-il resté `[inconnu]` plutôt que d’être inventé ? |

Marquez chaque proposition `PASS`, `FAIL` ou `UNSURE`. Si un numéro de salle
apparaît, l’observation est `FAIL` pour cette affirmation ; elle ne prouve pas
que tous les modèles se comporteront toujours ainsi.

### Trois observations sans risque

Les points précédents sont de petites démonstrations, pas une preuve qu’un
modèle ou qu’un apprenant se comportera toujours de la même manière. Pour
répéter la méthode sans compte, données privées, outil ni réseau, utilisez ces
fixtures textuelles :

- [Contexte et inconnues](../../evals/candidates/core-course-v1/observations/context-change-and-unknowns.md)
  — comparer deux versions fournies et conserver le numéro de salle comme
  `UNSURE` ;
- [Contrat de première demande](../../evals/candidates/core-course-v1/observations/first-request-contract.md)
  — écrire but, matériau, contraintes, forme et arrêt avant une réponse ;
- [Frontière outil, autorité et preuve](../../evals/candidates/core-course-v1/observations/tool-boundary-authority-evidence.md)
  — séparer action proposée, autorité accordée, exécution et relecture.

Chaque fixture demande un premier artefact avant toute aide, conserve l’aide
reçue et fixe une condition d’arrêt. Leur état reste `candidate / not_run` :
elles ne prouvent ni l’efficacité du cours, ni la supériorité d’un prompt, ni
la rétention, ni le transfert général, ni l’équivalence entre plateformes.

## 0.7 Un premier contrat portable

```text
Résultat : [un résultat observable]
Contexte de départ : [faits ou texte fourni]
Aide autorisée : [ce que le modèle peut faire]
Contraintes : [ce qui doit rester vrai ou interdit]
Réponse et contrôle : [forme attendue et manière de la vérifier]
Arrêt : [entrée, autorité, source ou preuve manquante]
```

Pour un premier essai, utilisez un exemple fictif ou non sensible. Conservez
la première demande et la première réponse ; sinon vous ne saurez pas si une
révision a réellement corrigé le problème.

Continuez avec [Fondations universelles : une première tâche sûre](../routes/universal-core-foundations-FR.md).
La route Codex commence après les fondations, au [Chapitre 1](../chapters/01-gpt-and-codex-FR.md).

## 0.8 La seule vérification de fin de cette unité

Rédigez une carte avec vos propres mots :

```text
Frontière du LLM :
Frontière token / contexte :
Frontière prompt / produit / outil :
Frontière contexte / mémoire :
Frontière outil / MCP / Agent / Skill :
Pourquoi une réponse fluide peut-elle être fausse ?

Décision 1 (soutenu / non soutenu) :
Preuve :
Décision 2 (modèle / produit / outil) :
Preuve :
```

Évaluez votre carte avec ce repère simple :

- `0` — elle traite un texte fluide comme une preuve, attribue une intention au
  modèle ou ne donne aucune preuve pour les deux décisions ;
- `1` — elle mentionne la génération à partir du contexte, mais laisse une
  limite importante ou la raison de vérifier dans le flou ;
- `2` — elle est formulée avec vos mots, sépare modèle, produit et outil, et
  donne une raison de vérifier dans cette tâche.

Conservez la carte, la première demande, la première réponse et une phrase sur
ce qui reste inconnu. Ne déclarez pas une réussite du cours à partir de cette
auto-vérification. Continuez avec [Fondations universelles : une première tâche
sûre](../routes/universal-core-foundations-FR.md), puis ouvrez la route Codex au
[Chapitre 1](../chapters/01-gpt-and-codex-FR.md).

## Sources et limites

Cette page est une réécriture pédagogique originale. Les sources ci-dessous
sont des références, pas du texte à copier :

- [Microsoft Learn — LLM fundamentals](https://learn.microsoft.com/en-gb/agent-framework/journey/llm-fundamentals),
  notions générales et limites ;
- [Glossaire Anthropic](https://platform.claude.com/docs/en/about-claude/glossary),
  termes token et contexte, propres à une documentation produit ;
- [Spécification Model Context Protocol](https://modelcontextprotocol.io/specification/2025-06-18),
  périmètre du protocole, pas preuve qu’un hôte ou serveur est configuré ;
- [OpenAI — Prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering),
  recommandations d’un fournisseur, pas garantie interplateforme ;
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762), article
  historique sur les Transformers ;
- [NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf),
  cadre de risques et d’intégrité de l’information, pas test de produit.

Les faits propres à une interface, à une version de modèle ou à une permission
doivent aussi avoir une URL, une date d’accès, une portée, un responsable et une
prochaine revue dans leur fiche de source. Une relecture indépendante par une
personne francophone reste à faire ; ce fichier reste `in-progress` /
`candidate`, pas une traduction certifiée.
