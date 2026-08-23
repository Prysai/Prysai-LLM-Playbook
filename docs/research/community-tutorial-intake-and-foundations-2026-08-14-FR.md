<!-- content_id: community-tutorial-intake-and-foundations-2026-08-14 | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: community-tutorial-intake-and-foundations-2026-08-14.md | source_revision: 2026-08-23 -->

# Intégrer un tutoriel communautaire : une meilleure ouverture pour les débutants, pas une source produit

**Statut :** fiche de recherche `candidate`.  
**Décision :** conserver le tutoriel communautaire fourni comme signal `reference-only` ; ne pas intégrer son lecteur, ne pas copier sa transcription, ne pas réutiliser ses captures d’écran et ne pas l’utiliser comme autorité sur le comportement actuel d’un produit.

## La décision que cette fiche étaye

Le matériel Bilibili/BibiGPT fourni présente une qualité éditoriale utile : il commence par un nom familier, donne au nouveau lecteur une raison de continuer et suit un projet concret au lieu d’énumérer des contrôles isolés. C’est un modèle pédagogique, pas une autorisation de réutiliser son expression ni une base pour formuler des affirmations actuelles sur un produit.

Cette fiche répond à une question étroite : **que peut apprendre ce guide de ce modèle pédagogique tout en restant honnête sur ses propres textes, ses sources et ses preuves ?**

La réponse consiste à commencer par une question observable avant toute visite des fonctionnalités :

> Lorsqu’un outil de modèle de langage dit qu’il a terminé, que pouvez-vous contrôler avant de faire confiance au résultat ?

Cette question fonctionne pour Codex, Claude Code et d’autres surfaces de travail assistées par un modèle, sans affirmer que leurs contrôles, permissions, persistance ou comportement d’Agent sont équivalents.

## Ce que la source publique peut apporter — et ce qu’elle ne peut pas apporter

| Matériel fourni par la source | Traitement dans ce projet | Raisons |
| --- | --- | --- |
| Sa progression d’un nom de produit familier vers un projet simple | **Conserver le modèle pédagogique et réécrire entièrement** | Un débutant a besoin d’une raison concrète de continuer, mais le texte et la mise en scène ne nous appartiennent pas. |
| Noms de produits, offres, quotas, raccourcis et libellés d’interface | **Ne pas enseigner à partir de cette source** | Ce sont des affirmations volatiles, liées au compte et à la surface ; ce matériel n’est pas la documentation du responsable du produit. |
| Modes de permission et comportement d’approbation | **N’enseigner que le principe sandbox/approbation, avec une source primaire datée** | Les modes et les valeurs par défaut peuvent changer. Un relecteur d’approbation n’élargit pas à lui seul la frontière d’exécution. |
| Parcours visuel de pointage/annotation | **Enseigner le principe durable, pas le contrôle nommé** | Lorsque le contexte visuel compte, montrer la zone pertinente et demander le résultat attendu ; ne pas promettre la même interface partout. |
| Récit d’échec de prévisualisation/stockage | **Exclure des instructions produit** | Il s’agit d’un seul récit de symptôme. Le projet ne l’a pas reproduit et ne dispose pas d’une cause confirmée par le responsable. |
| Checkpoints Git, tâches bornées, contrôles indépendants et conditions d’arrêt | **Enseigner comme méthodes neutres par rapport au produit** | Ces pratiques restent utiles sans copier un flux de travail propre à un fournisseur. |
| Skills, plugins et outils externes | **Utiliser la documentation actuelle du responsable pour les définitions, en conservant les frontières d’action et de données** | Un Skill n’accorde pas de permission ; la présence d’un plugin ne prouve pas qu’une action externe a eu lieu. |
| Modification, fork ou archivage de threads, automatisations, contrôle de l’ordinateur ou usage mobile | **Exclure jusqu’à l’existence d’une fiche d’adaptation actuelle pour une surface nommée** | La source n’offre pas de contrat actuel, primaire et exécutable pour ces affirmations. |

## Contrôle de la frontière officielle actuelle

Les sources suivantes étaient accessibles le 2026-08-14. Leurs pages sont contrôlées par OpenAI ; leurs affirmations ne valent que pour les surfaces indiquées et doivent être revues avant toute publication qui en dépend.

| Affirmation assez sûre pour être enseignée | Source de première main | Ce que cela n’établit toujours pas |
| --- | --- | --- |
| La terminologie Codex couvre plusieurs surfaces, tandis que les capacités concrètes de chaque surface restent bornées. | [Glossaire OpenAI](https://learn.chatgpt.com/docs/glossary.md) | Le compte, la version installée, les permissions ou le succès d’une exécution par un apprenant. |
| Une demande utile rend visibles l’objectif, le contexte, la sortie et les limites ; le travail visuel gagne à désigner la zone concernée. | [Conseils de prompting OpenAI](https://learn.chatgpt.com/docs/prompting.md) | La réussite de la demande ou l’existence d’un contrôle d’annotation portant ce nom dans chaque client. |
| La sandbox contrôle les fichiers/ressources réseau accessibles ; les approbations contrôlent le moment où le runtime se met en pause. Changer de relecteur n’agrandit pas la sandbox. | [Permissions OpenAI](https://learn.chatgpt.com/docs/permission-modes.md) | Une valeur par défaut actuelle, une politique d’organisation ou une autorisation propre à une cible. |
| Un Skill regroupe des instructions et ressources réutilisables propres à une tâche ; un Plugin peut regrouper des Skills et des connecteurs. | [Skills et Plugins OpenAI](https://learn.chatgpt.com/docs/skills-and-plugins.md) | Qu’un Skill ait été sélectionné, qu’un connecteur soit authentifié ou qu’une action externe soit terminée. |
| Dans l’application de bureau, Local et Worktree sont des lieux d’exécution distincts ; Worktree isole les modifications dans un worktree Git. | [Environnements OpenAI Codex](https://learn.chatgpt.com/docs/environments/modes.md) | Que l’isolation suffise à une tâche concurrente donnée ou qu’une autre plateforme suive le même modèle. |

Il s’agit de contrôles de sources, pas d’exécutions locales du produit. Le guide conserve donc l’état `candidate` et ne fait aucune affirmation actuelle sur l’interface de la vidéo, les offres, la disponibilité, la prévisualisation, le parcours mobile ou les libellés précis des fonctions.

## Une ouverture originale pour le cours général

Voici l’orientation destinée aux lecteurs, désormais utilisée au début du chapitre 1. Le texte appartient au projet ; ce n’est ni une transcription ni une traduction :

> Vous avez peut-être entendu des noms comme Codex et Claude Code. Ils illustrent une évolution plus large : un modèle de langage peut maintenant travailler avec une tâche, un contexte et parfois des outils, au lieu de renvoyer uniquement une réponse de chat. Avant de parcourir les contrôles, apprenez la question qui rend la suite plus simple : lorsque l’outil dit qu’il a terminé, que pouvez-vous réellement vérifier ?
>
> Dans cette première leçon, vous n’avez pas à mémoriser des produits. Vous séparerez une action suggérée d’une action autorisée, un message d’outil d’une modification de la cible et une réponse plausible d’une preuve. Codex constitue ici la voie pratique de référence. La méthode est plus large ; toute plateforme nommée doit disposer de son propre adaptateur avant que ses boutons soient enseignés comme des faits.

Cette ouverture invite le débutant, lui donne un modèle mental utilisable et une récompense claire, tout en évitant les affirmations non étayées telles que « le produit central », « le meilleur choix » ou « l’équivalent direct d’un autre produit ».

## Les dix premières minutes : une promesse, une frontière

Une leçon de base ne devrait pas commencer par le choix d’un modèle, d’une offre payante, d’un plugin ou d’un mode de permission. Elle doit faire une petite promesse :

1. **Nommer un résultat.** Par exemple, réécrire un message fictif sans ajouter de faits ou inspecter une modification d’un seul fichier.
2. **Montrer le matériel de départ.** Le lecteur voit le texte, le fichier ou le fixture exact avant de demander une action au modèle.
3. **Énoncer la frontière d’action.** Préciser s’il s’agit de texte, de lecture seule ou d’une seule modification réversible. Aucun secret ni compte externe.
4. **Montrer le contrôle.** Le lecteur indique ce qui doit rester vrai, ce qui doit changer et ce qui reste inconnu.
5. **Rendre l’arrêt sûr.** Si la cible, l’autorité ou la preuve n’est pas claire, s’arrêter et noter le contrôle minimal suivant plutôt que d’élargir l’accès.

L’échauffement facultatif existant suit ce modèle avec un message source fictif. L’ouverture du chapitre 1 explique maintenant pourquoi ce premier résultat modeste vaut mieux qu’une longue liste de fonctionnalités.

## Conséquence pour le nom : méthode générale et voie phare explicite

Le contenu doit se décrire en deux couches :

- **méthode générale :** définir le résultat, sélectionner uniquement le contexte nécessaire, fixer une frontière d’action, inspecter les preuves, récupérer et conserver une fiche ;
- **voie pratique phare :** enseigner Codex en profondeur lorsqu’il existe des sources de première main actuelles, des exécutions bornées, des preuves d’échec et des dates de revue.

Claude Code et les autres systèmes nommés sont des candidats à la comparaison ou à l’adaptation, pas des substituts interchangeables. La recommandation de nom en attente et la migration par étapes sont consignées dans la [note de transition des noms](../strategy/naming-and-positioning-transition-2026-08-14.md).

## Fiche de source et de droits

| Champ | Fiche |
| --- | --- |
| Source | Référence du lecteur Bilibili `BV1c9EK6KEW4` et texte chinois généré par BibiGPT fourni au projet le 2026-08-14. |
| Classe d’évidence | Suggestion communautaire / référence éditoriale. |
| Traitement des droits | Aucune licence ni permission de réutilisation n’a été fournie ou établie indépendamment. Aucune prose, capture, URL d’image, iframe, code ou présentation de marque n’est copié dans ce dépôt. |
| Reproduction locale | Aucune. Le projet n’a pas exécuté le tutoriel, utilisé son projet, testé ses affirmations ni inspecté ses assets liés. |
| Décision | `reference-only` ; peut éclairer un plan de sujets original, jamais un fait actuel de produit ni une intégration destinée aux lecteurs. |
| Responsable et revue | Responsable du curriculum ; réévaluer uniquement si une source distinctement autorisée et pertinente de première main modifie une décision éditoriale. |

## Ce que cette fiche ne prouve pas

Cette intégration ne prouve pas que l’auteur de la source, le service de transcription, les offres, permissions, contrôles, comportement de prévisualisation, flux du projet, automatisation, contrôle de l’ordinateur, usage mobile ou résultats sont exacts, actuels, réutilisables sous licence, représentatifs, sûrs ou équivalents à ceux d’une autre plateforme. Elle ne prouve pas non plus qu’une ouverture révisée améliore la compréhension, l’achèvement, la rétention, le transfert ou l’adoption du projet. Ces affirmations nécessitent une étude bornée avec des apprenants.
