<!-- content_id: chapter-07-skills-plugins-and-tools | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-22-fr-deepening -->

# Chapitre 7 : Skills, Plugins, MCP et outils : répartir le travail

**Statut :** `candidate` · **Comparaison :** `not_run`. Les exemples
enseignent une méthode ; ils ne prouvent pas qu’un Skill externe a été chargé
ou exécuté par un hôte précis.

**Commencez ici :** décrivez le manque de la tâche, puis choisissez la plus
petite capacité qui peut le combler.

## Le problème que résout ce chapitre

« Il me faut un Skill » n’est pas toujours le bon diagnostic. Un Skill, un
Plugin, un serveur MCP, un connecteur, un script, un modèle de document et un
document ordinaire ne résolvent pas le même problème. Les traiter comme des
synonymes pousse à installer plus de capacités que nécessaire, rend le
contexte plus difficile à inspecter et élargit les effets externes possibles.

La question utile n’est pas « quel catalogue contient le plus de Skills ? »,
mais :

> Que manque-t-il à cette tâche, et quelle est la plus petite capacité capable
> de combler ce manque tout en gardant permissions, licence, dépendances et
> preuves vérifiables ?

## Objectifs d’apprentissage

À la fin de ce chapitre, vous devriez pouvoir :

- expliquer la répartition entre méthode, connexion, exécution et distribution ;
- dériver la combinaison minimale à partir de la tâche, sans commencer par un
  catalogue ;
- vérifier déclencheurs, exclusions, dépendances, licence, permissions, effets
  externes et preuves avant d’adopter un Skill, un Plugin ou un connecteur ;
- distinguer un fichier existant d’une capacité découverte, chargée, adoptée ou
  vérifiée par son comportement.

## Problèmes de terrain : l’échec peut précéder la première tâche

La [recherche de terrain Codex](../evidence-library-FR.md#source-notes)
consigne deux rapports publics. Ils décrivent des symptômes, pas des causes
officielles ni des reproductions locales :

| Symptôme public | Observation rapportée | Ce que cela ne prouve pas | Premier contrôle sûr |
|---|---|---|---|
| Un Skill fonctionne comme fichier ordinaire puis disparaît lorsqu’il est représenté par un lien symbolique | La découverte change selon la représentation du fichier ; le rapport compare aussi un lien physique | Que tous les scanners, systèmes ou versions ont le même comportement | Conserver la représentation et la surface exactes ; comparer fichier ordinaire et lien dans un essai isolé |
| L’utilisation explicite d’un Skill dépend de la liste implicitement disponible | La personne ne pouvait pas traiter la demande explicite indépendamment de la liste visible de la surface | Qu’il s’agit d’une règle universelle ou d’une garantie officielle | Sauvegarder la liste visible, la demande exacte, la session et la preuve des ressources chargées |

Une adresse dans un dépôt n’est donc pas la même chose qu’un Skill découvert
par l’hôte actuel. Un nom visible ne prouve pas le chargement, et un Skill
chargé ne prouve ni ses dépendances externes ni ses permissions.

## 1. Un modèle de capacité en quatre couches

Nommez d’abord la couche qui manque :

~~~text
Couche méthode       Skill          manière répétable d’accomplir une tâche
Couche connexion     MCP/connecteur données, contexte ou actions externes
Couche exécution     Outil          lire, modifier, exécuter, parcourir ou appeler
Couche distribution  Plugin        paquet qui distribue plusieurs capacités
~~~

Les produits réels mélangent parfois ces rôles, mais les questions restent
différentes :

| Couche | Ce qu’elle apporte | Ce qu’elle n’accorde pas à elle seule |
|---|---|---|
| Skill | Instructions et ressources pour une tâche ou un workflow récurrent | Une permission, un accès externe ou la preuve que la méthode marche ici |
| Serveur MCP / connecteur | Un pont vers outils, ressources, contexte ou actions externes | L’authentification, l’approbation de chaque action ou une frontière de données sûre |
| Outil | Une opération observable : lire, lancer une commande, modifier un fichier ou appeler une API | Une raison de l’exécuter, l’autorisation ou la preuve du résultat |
| Plugin | Une couche de distribution et de composition de capacités | Une autorisation automatique ou la disponibilité de chaque composant |

Un script convient généralement mieux à une transformation déterministe répétée.
Un modèle de document convient à une forme de sortie stable. Un document sert à transmettre
un savoir de fond. Un Skill mérite sa place quand la méthode est récurrente mais
demande encore un jugement dépendant du contexte.

## 2. Choisir dans un ordre qui limite le périmètre

Avant d’installer ou d’activer quoi que ce soit :

1. vérifiez que la tâche a un protocole compréhensible ; sinon, clarifiez-la ;
2. si la même méthode revient et que des étapes sont souvent oubliées,
   envisagez un Skill ;
3. si des données ou une action externes sont nécessaires, demandez-vous si un
   connecteur ou un serveur MCP est réellement indispensable ;
4. si la transformation est déterministe, préférez un script ;
5. si plusieurs capacités doivent voyager ensemble, envisagez un Plugin comme
   couche de distribution ;
6. seulement après, décidez d’installer, d’authentifier ou d’ouvrir une
   permission supplémentaire.

Un catalogue volumineux peut donner une impression de puissance tout en cachant
le graphe réel des dépendances et des permissions.

## 3. Partir du manque de la tâche, pas du nom du Skill

Avant d’adopter un candidat, écrivez les réponses suivantes :

- **Manque :** manque-t-il une méthode, un script déterministe, une connexion
  externe, ou la tâche n’est-elle simplement pas définie ?
- **Déclenchement et exclusion :** quelles entrées doivent déclencher la
  capacité ? Quelles demandes proches ne doivent pas la déclencher ? Des mots
  communs ne suffisent pas.
- **Source et révision :** un autre relecteur peut-il vérifier l’URL, le commit,
  la version ou le hash d’archive, ainsi que la date d’inventaire ?
- **Licence et dépendances :** la licence du dépôt couvre-t-elle le fichier visé ?
  Les fichiers NOTICE, les assets imbriqués et les dépendances d’exécution sont-
  ils recensés ?
- **Permissions et effets :** que peut-on lire ou écrire ? Faut-il un réseau ou
  un compte ? Peut-on envoyer, publier, supprimer ou modifier un système externe ?
- **Vérification et maintenance :** un essai isolé couvre-t-il les cas positif,
  limite, échec et migration ? Qui approuve, possède, sauvegarde, met à jour et
  répète la procédure de retrait ?

Le nombre d’entrées d’un catalogue n’est pas une mesure de qualité. Chaque
candidat doit être examiné sur ses propres preuves.

### Ce qu’un Plugin contient — et où s’arrête son support

La [documentation officielle des Plugins](https://learn.chatgpt.com/docs/plugins.md)
décrit un Plugin comme un paquet installable pouvant contenir des Skills, des
Connectors, ou les deux. Un Connector peut s’appuyer sur un serveur MCP qui
fournit des outils, des informations partagées ou des actions dans un système
externe. Cela en fait une couche de distribution et de composition, pas une
autorisation.

La description officielle consultée le 9 août 2026 listait les Plugins pour
ChatGPT Chat/Work sur le web, ordinateur et mobile, ainsi que Codex dans
l’application de bureau ChatGPT et un navigateur de Plugins dans Codex CLI.
Elle ne listait pas l’extension IDE. La disponibilité de Chat/Work sur mobile
ne prouve pas une surface de catalogue identique à celle de l’ordinateur.

Traitez l’état du produit et de la connexion comme une chaîne distincte :

~~~text
support du produit → autorisation du compte / organisation → installation du Plugin
→ authentification du connecteur → nouvelle session → visibilité Skill/outil
→ invocation réelle → vérification du résultat externe
~~~

Chaque flèche correspond à une preuve. « Se connecter avec ChatGPT » ne donne
pas automatiquement l’accès aux données du Plugin ni l’approbation des actions.
Les permissions demandées doivent encore être examinées et approuvées. Le
registre de faits relie ces limites à `OF-015`, `OF-016`, `UF-001`, `UF-003` et
`LB-002` ; consultez-le avant de modifier une expérience.

La source sur Skills et Plugins, vérifiée le 10 août 2026, séparait aussi la
correspondance automatique de la sélection explicite : ChatGPT utilise une
mention `@` et Codex une mention `$`, puis une nouvelle conversation ou session
CLI après installation. Ce sont des faits de produit susceptibles de changer,
pas des permissions accordées par un Skill. Une vérification locale doit noter
la surface, la session, l’invocation exacte, les ressources chargées, la sortie
et la vérification du résultat. Le dépôt ne possède pas encore ces runs ; l’état
reste `not_observed`.

## 4. Le dossier de décision avant adoption

Avant une installation, produisez une fiche `skill-adoption-decision.md` plutôt
que d’écrire seulement « licence vérifiée » :

~~~text
task_gap:
trigger_conditions:
non_trigger_conditions:
source_url / revision / inventory_date:
license / NOTICE / nested_assets:
dependencies:
target_install_scope:
permissions:
external_side_effects:
isolated_trial:
backup_and_restore_target:
rollback_steps_and_success_check:
approval_points:
behavior_tests: positive | boundary | failure | migration
owner / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unverified:
~~~

Ces valeurs décrivent la décision d’adoption, pas le statut de l’artefact :

| Décision | Signification | Ce qu’elle autorise à dire | Ce qu’elle n’autorise pas à dire |
|---|---|---|---|
| `recommendation-only` | L’adéquation paraît plausible ; poursuivre la revue en lecture seule ou un essai isolé | « Cela vaut la peine d’être examiné » | « C’est approuvé » ou « c’est utilisable » |
| `blocked` | Licence, NOTICE, révision, dépendance, permission ou retrait insuffisants | « Ne pas adopter encore ; voici les conditions pour débloquer » | « Installer maintenant et compléter après » |
| `approved-to-install` | Révision, périmètre, sauvegarde, retrait et approbations sont définis | « Peut être installé dans ce périmètre » | « C’est installé » ou « c’est vérifié » |
| `installed-candidate` | Installation isolée et observable, comportement et adoption encore à revoir | « Une installation candidate isolée existe » | « L’équipe l’a adopté » ou « c’est prêt pour la production » |

Les états du projet `draft`, `candidate`, `verified` et `production-ready` restent
indépendants. Une page accessible ne prouve pas une licence claire ; un
manifest ne prouve pas qu’un appel d’outil réussit.

### Cinq états faciles à confondre

| État | Preuve minimale | Ce que cela ne prouve pas |
|---|---|---|
| Fichier présent | chemin, manifeste, inventaire ou hash à une révision donnée | que la surface actuelle peut le découvrir |
| Découvert | liste visible ou résolution de nom par la surface | que la session l’a chargé |
| Chargé | ressource ou instruction observée dans une nouvelle session | que l’équipe l’a adopté |
| Adopté | propriétaire et approbation dans le périmètre déclaré | que le comportement est vérifié |
| Vérifié | preuves positive, limite, échec et migration dans l’environnement déclaré | qu’un autre compte, une autre entrée ou une autre version se comporte pareil |

L’installation est aussi une action observable. Un chemin cible et un journal
de réussite peuvent justifier `installed-candidate`, mais ne sautent ni la
découverte, ni le chargement, ni l’adoption, ni la vérification.

### Deux décisions illustrées

- **Recommandation :** S05, `code-review-and-quality`, peut rester
  `recommendation-only` pour une revue d’un diff fixé. Sa source est l’archive
  locale de https://github.com/addyosmani/agent-skills, avec le hash SHA-256
  `6EEDBE7D2EA3A82417781D879785BD501FBDE21275627F557DE4B76560BA1250` et un
  signal MIT au niveau du dépôt. Le déclencheur est un diff défini et une
  demande de revue ; il ne doit pas se déclencher pour produire une
  fonctionnalité ou sans baseline. Les dépendances imbriquées, l’ensemble des
  assets, les permissions et le retrait restent non vérifiés : la prochaine
  étape est une revue en lecture seule ou un essai hors ligne isolé, pas une
  approbation d’installation.
- **Variante bloquée :** S06, `webapp-testing`, doit rester `blocked`. Il vient
  de l’archive locale de
  https://github.com/composio-community/awesome-codex-skills, hash SHA-256
  `D3DA83ED9D474690E7FF235351376114972840C78BC319CBCB8F89CBD704608E`. Un signal
  Apache-2.0 à la racine ne confirme pas la licence de chaque Skill, script,
  asset ou fichier NOTICE imbriqué. Si le chemin d’installation, la sauvegarde
  et le contrôle de restauration ne sont pas définis, l’existence de
  `SKILL.md` ne suffit pas. Ne téléchargez pas, n’installez pas et ne décrivez
  pas ce candidat comme découvert ou utilisable avant d’avoir levé ces blocages.

## 5. Composer les capacités au lieu de les empiler

Une combinaison lisible ressemble à ceci :

~~~text
protocole de tâche → méthode de domaine → outil ou connexion → revue des preuves
~~~

Pour un essai marketing à faible risque, le protocole fixe le résultat et les
limites, la méthode fournit le contexte d’audience, l’outil enregistre les
données et la revue des preuves vérifie les événements. Dix Skills qui se
recouvrent peuvent rendre le routage et le contexte moins lisibles qu’un seul
protocole clair.

## 6. Préparer la transmission avant la composition

Utilisez ces champs lorsqu’une capacité remet un travail à une autre :

~~~text
status | owner | scope | inputs | assumptions | actions_done
actions_not_done | evidence | unverified | blocked_on | next_check
permission_boundary | next_review
~~~

Le Skill de domaine possède sa méthode. Le protocole de tâche possède les
limites d’exécution. La revue des preuves examine les affirmations existantes.
L’orchestrateur possède les étapes et les points de contrôle. Un Skill ne gagne
pas les permissions d’un autre parce qu’il a été appelé ; il ne doit pas lancer
en secret toute une orchestration récursive.

## 7. Expérience : comparer trois combinaisons de capacités

### Préparation

Choisissez une tâche locale, réversible et sans enjeu. Préparez un protocole,
deux Skills à révisions fixes et une option simulée qui nécessiterait une
connexion externe. Un candidat doit rester examinable en isolation ; l’autre
doit être rejeté parce que sa licence, ses NOTICE ou son retrait sont obscurs.
N’envoyez aucune donnée réelle, n’authentifiez aucun compte et n’écrivez dans
aucun service tiers. Attribuez un `run-id` à chaque combinaison et gardez la
consigne et la grille fixes.

### Tâche

Concevez trois approches pour la même tâche :

1. le protocole seul ;
2. le protocole avec un Skill de domaine ;
3. le protocole, le Skill et la connexion externe.

Pour chaque candidat, terminez d’abord la fiche de pré-adoption. Dans cette
expérience, restez en lecture seule : n’installez pas, n’authentifiez pas et
n’activez pas une configuration d’équipe. Comparez la qualité de sortie, le
temps, le périmètre de permission, le coût de vérification et les effets.
Dites quand la capacité supplémentaire apporte un bénéfice net et quand elle
ne fait qu’ajouter de la complexité.

### Preuve à conserver

Gardez les trois approches et leurs `run-id`, deux fiches de décision
d’adoption, les tableaux de dépendances et de permissions, les observations de
licence, les sorties simulées ou réelles, les vérifications et la liste explicite
des actions externes non effectuées. Un dossier recevable doit rendre la source
et la révision vérifiables, pointer vers les fichiers qui fondent la licence,
nommer l’installation, la sauvegarde, le retrait, le propriétaire et le point
d’approbation, couvrir les cas positif, limite, échec et migration, et conserver
un baseline sans connexion. Une simulation doit être étiquetée comme telle.

### Réflexion

Notez la valeur de décision et sa raison pour chaque candidat. Décrivez les
preuves nécessaires pour passer de `recommendation-only` ou `blocked` à l’état
suivant. Pour chaque observation, dites si elle prouve la présence, la
découverte, le chargement, l’adoption ou la vérification. Un état antérieur ne
remplace jamais un état ultérieur.

## Échec volontaire et cas limite

Donnez à la tâche trois Skills qui se recouvrent, dont un demande un envoi
externe alors que l’organisation locale suffit. Ajoutez un candidat dont le
dépôt est accessible et dont le `SKILL.md` existe, mais dont la licence ou le
retrait restent inconnus.

La réussite consiste à repérer la redondance, refuser la permission inutile,
marquer le candidat incertain `blocked` et conserver un baseline qui n’utilise
que le protocole ou un seul Skill.

## Transfert

Appliquez le modèle à une recherche et à un rapport produit. Pour chacun,
indiquez quelle capacité est une méthode, laquelle est une connexion et quelle
transformation déterministe pourrait être un script. Gardez distinctes existence,
capacité, autorité, observation et décision d’adoption.

## Sources et limite de mise à jour

| Fait ou limite | Source | Accès | Portée | Responsable / prochaine revue |
|---|---|---:|---|---|
| Skills comme instructions de tâche ou de workflow, avec ressources et sélection explicite | [Skills and Plugins](https://learn.chatgpt.com/docs/skills-and-plugins.md) et [fiche de mise à jour](../evidence-library-FR.md#source-notes) | 2026-08-09 | Description officielle à cette date ; ne prouve pas qu’un Skill précis est activé ou chargé | `facts-maintainer` / 2026-09-09 |
| Composition des Plugins, surfaces prises en charge, installation, authentification et approbation | [Plugins](https://learn.chatgpt.com/docs/plugins.md) et [registre d’impact](../../docs/governance/fact-impact-registry.yaml) | 2026-08-09 | Description officielle ; catalogue et accès du compte peuvent varier | `facts-maintainer` / 2026-09-09 |
| Serveurs MCP, outils/ressources/prompts exposés et contrôle d’autorisation | [MCP](https://learn.chatgpt.com/docs/extend/mcp.md) | 2026-08-09 | Configuration officielle de l’hôte Codex ; l’authentification, les outils et la politique d’organisation exigent des contrôles séparés | `facts-maintainer` / 2026-09-09 |
| Les actions d’un connecteur ou de MCP peuvent faire partie de l’approbation | [Agent approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | 2026-08-09 | Modèle officiel d’approbation ; pas la configuration d’exécution actuelle du dépôt | `facts-maintainer` / 2026-09-09 |
| Symptômes de découverte liés aux liens et aux appels explicites | [Recherche de terrain Codex](../evidence-library-FR.md#source-notes) | 2026-08-09 | Rapports publics ; pas de reproduction locale ni de cause officielle | `curriculum-maintainer` / 2026-09-09 |
| Inventaire et signaux de licence des candidats | [Catalogue des Skills candidats](../evidence-library-FR.md#source-notes) et [registre des assets](../evidence-library-FR.md#source-notes) | 2026-08-09 | Inventaire du projet ; n’est pas une approbation d’installation | `source-maintainer` / 2026-11-09 |

Les détails d’installation, d’authentification, de manifeste et d’invocation
changent. Actualisez les sources de première partie, le registre d’impact, ce
chapitre, les expériences, les Skills et les chemins du site lorsque la surface
évolue. Séparez toujours descriptions officielles, symptômes de communauté et
observations locales.

## Liste d’acceptation

- [ ] Je peux distinguer Skill, Plugin, serveur MCP, connecteur, outil, script,
      modèle, document et leur responsabilité.
- [ ] Je peux écrire le manque, le déclencheur, l’exclusion, la révision, la
      licence, les dépendances, les permissions, les effets, le propriétaire et
      le retrait d’un candidat.
- [ ] Je peux garder un candidat à `recommendation-only` et marquer un candidat
      dont la licence ou le retrait est obscur `blocked` sans l’installer.
- [ ] Je peux distinguer présence, découverte, chargement, adoption et
      vérification comportementale.
- [ ] Je peux comparer un baseline protocole-seul et des capacités ajoutées en
      gardant entrées, acceptation et preuves fixes.
- [ ] Je peux dire quelles actions externes n’ont pas été effectuées et quelles
      preuves seraient nécessaires avant une déclaration de runtime.
- [ ] Je peux dire que ce chapitre est `candidate` et que sa comparaison reste
      `not_run` tant que les runs et la revue indépendante n’existent pas.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="06-model-selection-FR.md" aria-label="Chapitre précédent: Chapitre 6 · Choisir un modèle">← Précédent<br><strong>Chapitre 6 · Choisir un modèle</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="08-full-lifecycle-workflow-FR.md" aria-label="Chapitre suivant: Chapitre 8 · De la définition à la livraison">Suivant →<br><strong>Chapitre 8 · De la définition à la livraison</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
