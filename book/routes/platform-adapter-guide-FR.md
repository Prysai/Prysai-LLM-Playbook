<!-- content_id: platform-adapter-guide-route | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-bootstrap -->

# Choisir une plateforme LLM : le même socle, puis un adaptateur à la fois

**Statut :** `candidate`. **Exécution :** `not_run`.

ChatGPT, Claude, Gemini, DeepSeek, Grok et Codex dialoguent tous avec vous,
mais ce ne sont pas le même produit. Cette page conserve le socle commun et
ajoute un adaptateur à la fois : ce qui diffère réellement, ce que vous pouvez
essayer sans risque aujourd’hui et ce qu’il faut vérifier dans une source
officielle avant de reprendre une affirmation propre à une plateforme.

Le parcours approfondi du Playbook se fait dans Codex, mais la méthode ne
dépend pas d’un fournisseur. Chaque plateforme nommée ci-dessous est un
**adaptateur candidat** : les principes communs s’appliquent, tandis que les
commandes, permissions et fonctionnalités doivent être vérifiées séparément.

## Règle zéro : ne déduisez jamais l’équivalence d’un nom

Un nom de modèle, une connexion ou un bouton familier ne prouve pas que deux
produits partagent les mêmes outils, permissions, mémoire, comptes, tarifs,
contrôles de données ou comportement d’Agent. Avant de répéter une affirmation,
demandez-vous :

1. Quelle surface précise est concernée : chat web, application, CLI, IDE, API ou Agent ?
2. Quelle source officielle, consultée quand, l’établit-elle ?
3. Qu’est-ce qui changerait visiblement si l’affirmation était fausse ?

Si vous ne pouvez pas répondre aux trois questions, marquez l’affirmation
`inconnue` et notez la prochaine vérification. La méthode est résumée dans la
[bibliothèque des preuves](../evidence-library-FR.md#method-and-status). Les
fiches détaillées des Skills sont des documents de maintenance du dépôt ; si
Reader ne propose pas une version française, il doit l’indiquer au lieu de
charger silencieusement une autre langue.

## La première tâche sûre, quelle que soit la plateforme

Copiez cette demande dans la plateforme choisie. Elle utilise un contenu
fictif, aucun outil et aucune donnée de compte.

```text
Résultat : réécrivez cet avis fictif pour de nouveaux membres.
Matériel : « L’association se réunit mardi à 18 h. Apporte un carnet. La salle
sera confirmée plus tard. »
Format : deux phrases. Conservez chaque fait. Mettez tout détail manquant entre
[crochets]. Ajoutez ensuite la liste des faits conservés.
Contrôle : comparez le texte source et la réécriture. N’ajoutez ni heure, ni salle,
ni tarif, ni contact, ni promesse.
Arrêt : ne naviguez pas, n’envoyez rien, ne publiez rien et ne supposez aucun
détail inconnu.
```

Vérifiez vous-même : chaque phrase est-elle rattachée au texte fourni ? La
limite de deux phrases est-elle respectée ? Un détail qui devait rester
`[inconnu]` a-t-il été ajouté ? Si la plateforme propose une recherche, un
envoi, une publication ou un outil, arrêtez-vous : une capacité n’est pas une
permission.

<span id="chatgpt-first-task"></span>

## Première tâche dans ChatGPT

Exécutez la tâche sûre ci-dessus sur la surface autorisée. Notez uniquement une
différence observable : la réponse mentionne-t-elle la navigation, la mémoire
ou un lien de partage ? Pour les faits concernant ChatGPT, utilisez une page
d’aide officielle et notez sa date de consultation.

<span id="claude-code-first-task"></span>

## Première tâche dans Claude Code

Claude Code agit dans un terminal et peut lire ou modifier les fichiers du
projet où vous le lancez. Commencez dans un répertoire temporaire avec la tâche sûre.
Observez la demande de permission avant toute modification ou commande. Si le
projet contient un fichier `CLAUDE.md`, relisez-le comme une règle que l’outil
pourrait suivre. N’utilisez pas un dépôt réel, des identifiants ou des données
de production pour ce premier essai.

<span id="gemini-first-task"></span>

## Première tâche dans Gemini

Exécutez la tâche sûre dans la surface de chat autorisée. Notez le compte actif
et les extensions proposées. Une extension peut lire ou écrire pour vous : ne
l’activez pas pour un exercice qui ne demande que du texte.

<span id="deepseek-first-task"></span>

## Première tâche dans DeepSeek

La source examinée pour cet adaptateur couvre **l’API uniquement**. Elle ne
vérifie ni le chat web ni l’application DeepSeek, leurs fenêtres de contexte,
leurs tarifs ou les droits d’un compte. Consultez une source officielle dédiée
à la surface exacte avant d’en tirer une leçon.

Pour un premier essai sans clé ni donnée privée, utilisez la tâche sûre
générique ci-dessus dans une surface autorisée. Si une expérience API est
explicitement autorisée, consultez d’abord la
[documentation officielle de l’API DeepSeek](https://api-docs.deepseek.com/),
puis vérifiez la trace de source conservée dans le dépôt avant de reprendre une
affirmation. Cette page ne transforme pas cette trace en preuve pour le chat web.
Notez la surface, l’identifiant du modèle réellement utilisé et la date. Ne
collez jamais de clé API, de code privé ou de document interne.

### Limite de l’adaptateur API (facultative)

Le point d’entrée [`GET /models`](https://api-docs.deepseek.com/api/list-models)
est la source à consulter pour les modèles actuellement signalés par un compte
API autorisé. Ne recopiez pas un nom de modèle, un tarif, une taille de contexte
ou un quota depuis un ancien exemple. Une demande d’appel d’outil est une
proposition : validez ses arguments, décidez de l’autorisation séparément et
n’exécutez que l’opération approuvée la plus petite.

Cet adaptateur reste `candidate / not_run` : aucun appel API, aucune clé et
aucune action de facturation n’ont été exécutés dans ce projet.

<span id="grok-first-task"></span>

## Première tâche dans Grok

Exécutez la tâche sûre dans la surface de chat autorisée. Si le compte est lié
à X, les publications ou contenus récents peuvent entrer dans le périmètre :
c’est à la fois une différence technique et une décision de confidentialité.
N’envoyez ni message privé ni brouillon non publié.

## Première tâche dans Codex

Codex est le parcours approfondi du Playbook : contexte, outils, permissions,
Skills, Agents et vérification. Commencez par la
[première modification sûre](first-safe-change-FR.md) et le
[Lab 001](../labs/lab-001-first-safe-task-FR.md) dans un projet jetable.

## Après la première tâche

- Pour une pratique textuelle courte : [pack de pratique pour débuter](../communication-clinic-FR.md).
- Pour le parcours approfondi avec fichiers et outils : [première modification sûre](first-safe-change-FR.md).
- Pour le socle indépendant des plateformes : [fondations universelles](universal-core-foundations-FR.md).
- Pour comparer deux plateformes : commencez par la [bibliothèque des
  preuves](../evidence-library-FR.md#source-notes), puis consultez, après avoir
  confirmé leur périmètre, le [LLM Comparison Protocol (locale-neutral)](../../skills/prysai-llm-comparison-protocol/SKILL.md)
  et le [Platform Adapter Review (locale-neutral)](../../skills/prysai-platform-adapter-review/SKILL.md)
  du dépôt.

## État des preuves et limites

Cette page est `candidate / not_run` : sa structure et ses contrôles existent,
mais aucun essai d’apprenant, test interplateforme ou avis indépendant n’est
enregistré. Les descriptions de plateformes sont une orientation bornée par
des sources ; elles ne prouvent ni un comportement identique, ni une réussite
partout, ni l’équivalence des fonctionnalités.

- [ ] J’ai utilisé uniquement du texte fictif, public ou autorisé.
- [ ] J’ai noté la surface exacte, le modèle visible et la date.
- [ ] Je n’ai pas déduit le comportement d’une plateforme à partir d’une autre.
- [ ] Je n’ai transmis aucun secret, message privé ou fichier inédit.
- [ ] Je me suis arrêté lorsqu’un outil, une recherche, un envoi ou une publication a été proposé.
