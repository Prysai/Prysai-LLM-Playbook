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

## 0.3 Une requête observable

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

## 0.4 Ce que les LLM ne peuvent pas établir seuls

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

## 0.5 Vérification des limites en cinq minutes

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

Tâche : réécris l’avis pour une nouvelle personne en deux phrases. Conserve
chaque fait. Place les informations absentes entre crochets, puis liste les
faits conservés.
Contrôle : compare chaque phrase avec l’avis. N’ajoute ni numéro de salle,
ni tarif, ni contact, ni promesse, ni nouvel horaire.
Arrêt : ne navigue pas, n’envoie rien, ne publie rien et n’invente aucun détail.
```

Marquez chaque proposition `PASS`, `FAIL` ou `UNSURE`. Si un numéro de salle
apparaît, l’observation est `FAIL` pour cette affirmation ; elle ne prouve pas
que tous les modèles se comporteront toujours ainsi.

## 0.6 Un premier contrat portable

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

## 0.7 Ce que vous devez conserver

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

Une carte est réussie si elle sépare le modèle du produit et de l’outil et nomme au moins
une raison de vérifier. Cette unité reste `candidate / not_run` : elle ne
prouve ni l’apprentissage, ni le transfert, ni l’équivalence entre produits.

## Sources et limites

Cette page est une réécriture pédagogique originale. Les sources de référence
et la date d’accès sont conservées dans la version anglaise et dans le registre
du projet. Une relecture indépendante par une personne francophone reste à
faire ; ce fichier reste `in-progress` / `candidate`, pas une traduction vérifiée.
