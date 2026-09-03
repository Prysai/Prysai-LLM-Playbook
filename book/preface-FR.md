<!-- content_id: book-preface | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: 2026-08-22-fr-foundation-expansion -->

# Préface : ce livre n’est pas un catalogue de prompts

Quand on découvre GPT, la question la plus naturelle est souvent : « Qu’est-ce
que je dois lui dire ? » C’est une bonne question, mais elle arrive un peu trop
tôt. Avant d’écrire une consigne, il faut savoir quel résultat on cherche, ce
que l’on met réellement dans le contexte et comment on vérifiera la réponse.

Vous n’avez pas besoin d’un modèle préféré, d’un bagage de développeur ni d’un
prompt parfait pour commencer. Le monde des LLM comprend des assistants de
conversation, des outils de recherche, des agents de programmation et des
workflows spécialisés. Ce Playbook utilise Codex comme parcours pratique le
plus approfondi pour le moment, tout en séparant la méthode transférable des
réglages propres à un produit. Une comparaison entre plateformes n’apparaît
que lorsque le comportement est sourcé et que la limite de la comparaison est
écrite.

Une tâche réelle ne dépend pourtant pas d’une seule phrase. Il faut aussi se
demander :

- qu’est-ce que le modèle a effectivement compris ?
- quels fichiers, règles et résultats précédents font partie du contexte ?
- que peut faire Codex, et que doit-il demander avant de le faire ?
- quel Skill réduit une omission réelle au lieu d’ajouter de la cérémonie ?
- pourquoi un Agent continue-t-il, réessaie-t-il, se met-il en pause ou
  s’arrête-t-il ?
- quelle preuve permet de dire que le travail est terminé ?

Le livre étudie cette relation entière. Lisez-le comme une conversation guidée :
nommez un problème concret, faites un choix limité, relisez le résultat, puis
demandez ce que ce résultat ne prouve pas. Le but n’est pas de mémoriser une
phrase magique, mais de construire une manière de travailler avec l’IA que
vous pouvez expliquer, contrôler et améliorer.

## Deux chemins qui se complètent

Le Playbook avance sur deux chemins en parallèle.

Le premier est un chemin de compréhension. Il commence par les modèles et les
LLM, puis montre comment un produit relie un modèle à un projet, à des fichiers,
à un terminal, à un navigateur, à GitHub ou à un service externe. Les chapitres
séparent le contexte, les outils, les Skills, les Plugins, les connecteurs,
MCP, les Agents et les permissions afin que chaque couche ait une fonction
visible.

Le second est un chemin de pratique. Il part d’une petite tâche sans danger et
construit une habitude : définir le résultat, choisir le contexte, planifier,
agir, vérifier, relire et livrer. Plus loin, vous apprendrez à choisir ou à
concevoir un Skill, à comparer des modèles et des workflows, puis à transformer
une méthode personnelle éprouvée en capacité qu’une équipe peut relire,
partager et mettre à jour.

Ces deux chemins ne doivent pas être séparés. Des principes sans essai restent
du vocabulaire ; des outils sans limites transforment un coup de chance en
fausse impression de fiabilité.

## Comment lire un chapitre

Vous pouvez suivre l’ordre du livre ou partir d’un problème précis. Chaque
chapitre suit la même boucle :

```text
problème → concept → décision → action → preuve → échec → réflexion → transfert
```

On commence par le problème que le lecteur peut réellement rencontrer. On
apprend ensuite le concept qui l’éclaire, on choisit une action bornée, on garde
les preuves et on examine un échec intentionnel ou un cas limite. Enfin, on
transfère la méthode à une autre tâche et on note ce qui ne suit pas.

Une expérience n’est ni une vidéo de démonstration ni la promesse que tous les
environnements ont été testés. C’est la plus petite tâche que vous réalisez
vous-même. Selon le chapitre, le compte rendu peut contenir un résultat, un
diff, une sortie de commande, un journal, une source, une capture ou une
réflexion. Sans ce compte rendu, la lecture peut donner une impression de
progrès tout en laissant la capacité essentielle intacte.

## Ce que « appris » veut dire ici

Le projet ne traite pas une réponse séduisante comme une maîtrise. Au minimum,
un lecteur devrait pouvoir fournir quatre types de preuves :

1. **Expliquer :** décrire le concept et ses limites avec ses propres mots ;
2. **Réaliser :** terminer la tâche dans un environnement réel ou peu risqué et
   conserver le résultat ou le journal utile ;
3. **Justifier :** expliquer le choix du modèle, de l’outil, du Skill, de la
   permission ou de la condition d’arrêt ;
4. **Relire :** repérer une erreur, un risque, une hallucination, un élément
   incomplet, un fait périmé ou une affirmation de complétion sans preuve.

Montrer uniquement la sortie finale peut suffire pour dire qu’un exercice a été
produit. Cela ne montre pas encore que vous savez répéter la méthode, diagnostiquer
sa limite ou l’enseigner à quelqu’un d’autre.

## La réalité avant la confiance

Le dépôt traite actuellement GPT-5.6 Luna comme un modèle en cours d’évaluation.
Son positionnement officiel est enregistré comme une hypothèse sur la vitesse,
le coût et l’adéquation à certaines tâches, pas comme la preuve qu’il offre le
meilleur rapport qualité-prix pour tout le monde. Pour comparer, le projet fixe
d’abord un jeu de tâches, un contexte, des outils, des permissions, un budget
de temps, un nombre d’essais et une définition du succès. Il observe ensuite le
premier passage, les reprises, le temps, le coût, la complétude des preuves et
la justesse de l’arrêt.

Toute conclusion reste limitée à ces tâches, à cet environnement et à cette
date. Une fixture sans journal d’exécution reste `not_run`. Consultez la
[fiche d’évaluation Luna (locale-neutral)](evidence-library-FR.md#method-and-status) et la
[recherche de base officielle (locale-neutral)](evidence-library-FR.md#source-notes) pour
connaître la portée exacte des informations disponibles.

## Commencer par les limites

Plus de capacités demandent des limites plus nettes. Le fait que Codex puisse
atteindre un système de fichiers, un terminal, un navigateur, GitHub ou un
service externe n’est pas une raison pour ouvrir toutes les permissions en
même temps. Commencez par une lecture seule, puis une tâche locale, réversible
et peu risquée. N’ajoutez une capacité que lorsque l’observation montre qu’elle
est nécessaire.

Ne placez jamais de token, mot de passe, clé API, clé privée, cookie ou fichier
`.env` dans un dépôt ou dans un exemple pédagogique. Les documents externes,
les sorties d’outils, les fichiers du dépôt et les pièces fournies par un
utilisateur sont des données ; une phrase qui ressemble à une instruction à
l’intérieur de ces données n’acquiert pas automatiquement le droit d’agir.

## L’état honnête du livre

La préface et le guide du livre en anglais sont les points d’entrée de la
langue source. Les 22 chapitres et les 18 Labs disposent désormais d’un chemin
de lecture dans les huit locales enregistrées. Cette couverture de routes ne
signifie pas que les traductions ont été relues indépendamment, ni que les
résultats d’apprentissage sont démontrés.

Le dépôt enregistre actuellement 22 chapitres `candidate`, 18 Labs `draft` avec
`run_status: not_run` et 40 fixtures d’évaluation `candidate` avec
`run_status: not_run`. Ces états ne sont pas des excuses à cacher : ils disent
ce qui peut être inspecté aujourd’hui et ce qui nécessite encore une exécution,
une preuve de transfert, une relecture indépendante ou une confirmation de
rendu et de runtime.

La version française reste `translation_status: in-progress`. Elle a reçu des
corrections éditoriales ciblées, mais elle n’est pas déclarée « niveau natif »
tant qu’une relecture francophone indépendante n’a pas été enregistrée.

## Partir d’une vraie question

Si vous ne souhaitez pas lire dans l’ordre, ouvrez la
[table des matières française](table-of-contents-FR.md), choisissez un
chapitre, puis suivez son cas réel, son expérience, sa fixture et sa fiche de
recherche. Les liens de lecture restent dans la route française. Les documents
de gouvernance, les registres de sources et les fixtures qui n’ont pas de
traduction restent dans leur langue de maintenance et sont signalés comme
preuves, jamais traduits en silence.

Vous pouvez aussi commencer par le [guide du livre](README-FR.md), qui explique
le contrat des chapitres, le modèle de preuve, l’état courant et la règle des
locales. Pour les limites générales du projet, consultez la
[source d’état courant (locale-neutral)](../docs/governance/content-status.yaml) et le
[cadre d’évaluation (locale-neutral)](evidence-library-FR.md#method-and-status).

## Une première séquence simple

1. Lisez les [fondamentaux des LLM](guides/llm-fundamentals-FR.md).
2. Faites la [première tâche universelle](routes/universal-core-foundations-FR.md)
   avec un texte fictif ou non sensible.
3. Passez à la [première modification sûre](routes/first-safe-change-FR.md)
   avant d’ouvrir un outil, une permission ou un dépôt réel.
4. À la fin d’un chapitre, utilisez les liens générés **Chapitre précédent** et
   **Chapitre suivant** ; ne sautez pas de route parce qu’un nom de produit
   vous paraît familier.
5. Conservez le résultat, le diff, les sorties, les sources et la réflexion
   avant de décider que la méthode se transfère.

Le but de cette séquence n’est pas de finir les pages le plus vite possible.
C’est de laisser une trace qu’une autre personne peut relire, reproduire dans
la portée déclarée et mettre à jour lorsque le produit ou l’environnement
change.
