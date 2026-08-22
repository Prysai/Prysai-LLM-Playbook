<!-- content_id: chapter-05-choose-the-codex-surface | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-22-fr-surface-restoration -->

# Chapitre 5 : Choisir la bonne surface Codex

**Statut :** `candidate` · **Expérience :** `not_run`
Ce chapitre propose une méthode de décision. Il ne promet pas qu’un compte,
un modèle ou un mode d’exécution précis est disponible partout.

## Le problème

Le même objectif peut commencer dans une application de bureau, un terminal,
une extension d’IDE ou une interface web. Il peut toucher un dossier local, un
worktree isolé ou un environnement distant. Choisir la surface avant de
clarifier le travail revient à confondre le lieu, l’outil et l’autorité.

## Objectifs d’apprentissage

- distinguer surface de travail, point d’entrée et environnement d’exécution ;
- choisir une surface à partir du risque et du résultat attendu ;
- écrire une carte de décision avant la première action ;
- prévoir une solution de repli quand une capacité manque ;
- distinguer une capacité annoncée, une capacité accessible dans la phase
  courante et un résultat effectivement vérifié.

## Un point de départ réel : le symptôme indique souvent la couche à vérifier

Les recherches du projet rassemblent des signalements publics provenant
d’issues, de forums et de discussions techniques. Ce sont des observations de
personnes, pas des reproductions locales, des diagnostics officiels ni des
correctifs garantis. Leur intérêt est plus modeste et plus utile : ils montrent
les étapes que l’on confond le plus souvent.

| Signalement public | Ce que l’on peut soutenir | Ce que cela ne prouve pas | Premier contrôle sûr |
|---|---|---|---|
| La page d’autorisation s’ouvre, mais l’échange échoue | Une étape d’autorisation a atteint un état visible | Que la session cliente, l’hôte ou le dépôt sont utilisables | Consigner autorisation, callback, échange et première lecture inoffensive séparément |
| Un fournisseur affiche un seul outil | Une configuration ou un inventaire annonce une capacité | Que le modèle peut appeler l’outil ou effectuer l’action | Enregistrer l’inventaire réel, puis distinguer découverte et appel |
| Le worktree affiché ne correspond pas au shell | Deux surfaces donnent des identités différentes | Qu’une isolation effective protège le processus qui écrit | Lire chemin absolu, racine Git, worktrees, branche et statut avant toute écriture |
| Le setup Cloud réussit, puis l’Agent ne peut pas joindre le service | Une étape de préparation a réussi | Que le réseau, les secrets et les dépendances sont disponibles dans la phase Agent | Séparer journaux setup/Agent, phase réseau, durée de vie du secret et diff final |
| Un hôte est bloqué par une allowlist | Une politique a refusé une requête | Que l’ouverture totale du réseau est le bon remède | Distinguer sandbox, proxy, DNS/TLS et pare-feu avant de demander un changement étroit |

Consultez l’[index des problèmes de terrain](../../docs/research/field-problems-index-2026-08-10.md),
la [recherche sur les surfaces](../../docs/research/field-problems-surface-2026-08-10.md)
et la [recherche des forums](../../docs/research/field-problems-forums-2026-08-10.md)
pour les liens originaux, les dates et la portée exacte. Le projet n’affirme pas
avoir reproduit ces cas.

## Problèmes de terrain

Une même demande peut être préparée dans un chat, exécutée localement ou envoyée vers un service distant. Si l’on ne distingue pas ces lieux, on peut attribuer à l’interface un accès ou un effet qu’elle n’a pas.

## 1. Trois couches souvent confondues

La **surface de travail** est l’endroit où des fichiers ou commandes peuvent
être observés. Le **point d’entrée** est la manière dont une personne commence
et relit la tâche. L’**environnement** précise la copie, le compte, les outils,
le réseau et les protections réellement présents.

Un nom de produit ne décrit aucune de ces couches à lui seul. Écrivez-les
explicitement dans le contrat de tâche.

### Surface de travail : où l’exécution et les changements ont lieu

| Surface | Où la tâche s’exécute | Utile pour | Ce que cela ne prouve pas |
|---|---|---|---|
| `Local` | Le dossier du projet sur votre machine | Lire et modifier rapidement une copie connue | Que le dossier est propre, sûr ou la bonne cible |
| `Worktree` | Une autre arborescence Git locale | Isoler un changement et relire un diff ciblé | Que chaque processus utilise ce worktree, ni que le réseau ou le compte ont changé |
| `Cloud` | Un environnement distant configuré | Une exécution longue ou isolée avec un checkout approuvé | Que le dépôt, les outils, le réseau, les secrets ou le diff final sont disponibles dans ce run |

`Local` et `Worktree` restent des exécutions locales. Un worktree isole une
arborescence Git, mais ne constitue pas à lui seul une frontière de sécurité
universelle. Cloud est une frontière d’exécution, pas une preuve que son setup,
son Agent ou ses connexions externes sont prêts.

### Point d’entrée : comment la personne commence et relit

| Point d’entrée | Atout principal | Preuves de revue typiques |
|---|---|---|
| Application de bureau | État de la tâche et revue interactive visibles | Libellé de surface, événements, résumé, diff et confirmation |
| CLI | Chemins, commandes et sorties répétables | `cwd`, sortie, code retour, statut Git, diff et journaux |
| Extension IDE | Contexte de l’éditeur et diff proche du code | Racine du workspace, sélection, patch et diff ciblé |
| Flux Web/Cloud | Setup distant et transfert de tâche | Dépôt/branche, preuves setup/Agent, résumé et diff |

Un CLI peut agir dans `Local` ou dans un `Worktree`. Une extension IDE peut être
attachée au worktree tandis qu’un shell reste dans le checkout principal.
« J’ai utilisé le CLI » ne répond donc pas à « où l’édition a-t-elle eu lieu ? ».

## 2. Une capacité est une chaîne

Pour dire qu’une tâche est faisable, il faut au moins :

```text
objectif → contexte lisible → surface correcte → autorité suffisante
→ action observable → contrôle → livraison ou arrêt
```

Un écran de connexion n’est pas une preuve d’accès au bon dépôt. Une réponse
proposée n’est pas un changement local. Une exécution locale n’est pas une
publication distante.

Chaque flèche doit avoir sa propre observation :

| Observation | Elle peut soutenir | Elle ne soutient pas à elle seule |
|---|---|---|
| La page d’autorisation réussit | Une page a atteint un état d’autorisation | L’échange, la lecture du dépôt ou la cible courante |
| Le modèle apparaît dans un sélecteur | Il est visible à cet instant | Sa disponibilité sur une autre surface ou la qualité de la tâche |
| Un dossier est inscriptible | Une sonde d’écriture a réussi pour ce chemin et ce moment | Le bon dépôt, l’autorisation distante ou la livraison sûre |
| Un nom d’outil est visible | Une capacité est annoncée ou enregistrée | Ses identifiants, son appel effectif ou son droit à un effet externe |
| Le setup installe une dépendance | Cette étape de setup a atteint l’installation | Le réseau de la phase Agent ou un diff vérifié |
| L’interface affiche `Completed` | Un état visuel a été présenté | Relecture, test, déploiement, push ou acceptation utilisateur |

Lorsque la chaîne casse, nommez le maillon exact. Ne rendez pas la conclusion
plus forte en passant de « cette tâche » à « le produit le permet en général ».

## 3. Cinq portes avant de choisir

1. **Contexte :** les entrées utiles sont-elles accessibles sans données
   superflues ?
2. **Isolation :** la tâche possède-t-elle une copie sûre et récupérable ?
3. **Effet :** l’action est-elle seulement locale ou crée-t-elle un effet
   durable ?
4. **Preuve :** quel diff, journal ou état final permettra la relecture ?
5. **Récupération :** que fera-t-on après une panne ou un état inconnu ?

Plus le risque est grand, plus il faut une surface qui rende ces cinq réponses
visibles. Une interface plus riche n’est pas automatiquement un meilleur choix.

### Tableau de sélection pratique

| Forme de tâche | Candidat probable | Preuve requise avant l’action |
|---|---|---|
| Lire une documentation publique et produire une note locale | `Local` | Checkout, liste des sources et chemin de sortie |
| Modifier un dépôt partagé en protégeant les changements locaux | `Worktree` | Chemin, branche, commit, forme de `.git` et statut |
| Exécuter une tâche longue dans un environnement isolé approuvé | `Cloud` | Dépôt connecté, phases setup/Agent, journaux et diff |
| Envoyer des données client à un connecteur | Aucun choix automatique | Payload, destination, autorisation, conservation et rollback |
| Diagnostiquer un outil absent ou un chemin inaccessible | Surface courante en lecture seule | Inventaire, chemin absolu, configuration et erreur |

Ce tableau fournit des candidats, pas une permission automatique. Une surface
normalement adaptée peut rester `blocked` si la preuve ou l’autorité manque.

## 4. La carte de décision

```text
Résultat observable :
Surface envisagée :
Copie et fichiers autorisés :
Outils et accès nécessaires :
Effets externes possibles :
Contrôle avant livraison :
Repli si la surface échoue :
Condition d’arrêt :
```

Remplissez la carte avant de demander une installation ou une publication.
Demandez au système de signaler le champ qu’il ne peut pas confirmer.

Pour une tâche qui dépasse l’explication en lecture seule, conservez une carte
`surface-decision.md`. Les cartes rejetées sont utiles : elles expliquent pourquoi
une option plausible n’a pas été retenue.

```text
task_id:
task_goal:
surface: Local | Worktree | Cloud
entry: desktop | CLI | IDE | web | autre
decision: selected | rejected | blocked | not_observed

required_context:
context_readable: yes | no | not_observed
context_evidence:
data_boundary:
allowed_side_effects:
isolation_and_git_delivery:

account_authorized: yes | no | not_observed
authorization_evidence:
target_resource_readable: yes | no | not_observed
resource_read_evidence:
model_id:
surface_available: yes | no | not_observed
availability_evidence:
required_tools:
tools_available: yes | no | not_observed
tool_evidence:

setup_action: not_applicable | action concrète
setup_evidence:
agent_action: not_applicable | action concrète
agent_evidence:
network_phase: local_policy | setup | agent | not_observed
secret_lifetime: none | setup_only | full_task_env | not_observed
result_review:
recovery_path:
rejection_or_block_reason:
checked_at:
reviewer:
```

Utilisez `not_observed` lorsqu’un run n’a pas eu lieu ou qu’une observation n’a
pas été recueillie. Ne transformez pas un champ vide en `yes` ou `no` pour finir
la fiche.

## Le Cloud a une phase de setup et une phase Agent

La documentation officielle décrit le setup et l’exécution de l’Agent comme
deux parties distinctes. Le setup peut installer des dépendances avec un accès
réseau ; la phase Agent peut être hors ligne si l’environnement n’est pas
autrement configuré. Les secrets peuvent être disponibles au setup puis retirés
avant l’Agent.

Consignez séparément :

```text
setup_action / setup_evidence
agent_action / agent_evidence
network_phase
secret_lifetime
result_review
```

« Le script de setup a installé le paquet » ne signifie pas que l’Agent peut
joindre son service. « Le secret existe dans les réglages » ne signifie pas que
le runtime peut le lire. Par défaut, mettez les appels externes en pause jusqu’à
ce que la phase et le trajet des données soient observés.

## Expérience : trois cartes pour un même résultat

### Préparation

Prenez une petite correction de texte dans un répertoire temporaire. N’utilisez ni
secret ni dépôt de production.

### Tâche

Écrivez une carte pour un chat textuel, une surface locale avec terminal et une
surface distante hypothétique. Comparez les entrées, les effets et les preuves
nécessaires avant de recommander l’une d’elles.

Appliquez les cinq portes à chaque carte. Pour chacune, notez le chemin absolu,
la cible lue, l’inventaire des outils, la visibilité du modèle et les effets
autorisés. Ne retenez au plus qu’une carte pour l’édition inoffensive ; marquez
les autres `rejected`, `blocked` ou `not_observed` avec une raison. Si Cloud n’est
pas exécuté, sa carte doit rester `not_observed`.

### Preuve

Conservez les trois cartes et notez la cible, l’autorité, l’effet possible et le
contrôle qui justifie votre choix.

Ajoutez le `run_id`, la copie ou l’environnement utilisé, la lecture de la cible,
la décision, le diff, le résultat du contrôle et le nom de la personne qui relit.
Un compte rendu utile montre à la fois pourquoi une surface a été choisie et
pourquoi les autres ont été refusées.

### Échec et limite

Si une surface demande une permission persistante alors que le résultat peut
être obtenu localement, rétrogradez vers la surface locale. L’exercice ne
mesure ni la vitesse ni la qualité générale d’un produit.

| Échec | Interprétation prudente | Rétrogradation sûre |
|---|---|---|
| Connexion réussie, lecture de la cible échouée | Identité et accès à la ressource sont deux étapes | Arrêter à la lecture, conserver `blocked` |
| Modèle visible, outil absent | Sélection et enregistrement de l’outil diffèrent | Continuer avec un plan textuel ou une surface connue |
| Worktree choisi, chemins divergents | Métadonnées et processus ne désignent pas la même copie | Stopper les écritures et relire les chemins |
| Setup réussi, Agent échoué | La preuve setup ne couvre pas la preuve Agent | Garder setup `passed`, Agent `failed` ou `not_observed` |
| Attente longue sans nouvel événement | La progression et la complétion ne sont pas observées | Préserver le checkpoint et interrompre selon la règle |

Ce sont des états de diagnostic, pas des diagnostics universels de fournisseur.

### Réflexion

Quelle porte de décision a éliminé la surface la plus risquée ? Quel succès
en amont vous a tenté de surinterpréter ? Quelle observation distinguerait une
mauvaise surface d’un manque d’autorisation ou d’un outil absent ? Avec des
données client, qu’est-ce qui changerait dans la frontière et l’approbation ?

## Transfert

Utilisez la même carte pour une recherche, une revue de contenu ou une tâche de
design. La surface change ; les limites, la preuve et le repli restent. Pour une
recherche, ajoutez domaine, date, portée des sources et conservation des extraits.
Pour une revue visuelle, ajoutez viewport, capture, critères de rendu et limites
de ce que l’image ne peut pas prouver.

## Liste de contrôle d’acceptation

- [ ] Je sais où l’action se déroule réellement.
- [ ] Les entrées et l’autorité sont limitées à la tâche.
- [ ] La preuve attendue est définie avant l’action.
- [ ] Un repli local ou une condition d’arrêt est écrit.
- [ ] Je n’ai pas déduit une capacité d’un simple écran de connexion.
- [ ] Je sépare autorisation de compte, lecture de la cible, visibilité du modèle,
      enregistrement de l’outil, appel, effet et relecture.
- [ ] Je consigne setup et Agent, phase réseau et durée de vie des secrets séparément.
- [ ] Les options rejetées et non observées ont une raison explicite.
- [ ] Je peux rétrograder ou arrêter sans élargir l’autorité.

## Sources et limite de mise à jour

La méthode de décision est stable. Les surfaces, modèles, modes de permission,
détails du cycle Cloud, outils et libellés d’interface sont volatils. Vérifiez
chaque fait dans la documentation de première partie de la surface utilisée et
notez la date, la portée et la prochaine revue. Cette traduction reste
`in-progress / candidate / not_run` ; les options non exécutées ne deviennent pas
des capacités prouvées par la seule structure de la carte.

Les faits produits et leurs limites sont suivis dans la
[baseline Codex](../../docs/research/openai-codex-baseline.md) et les rapports
de terrain liés plus haut. Ne copiez pas leurs instructions ou captures ; ils
servent ici de matériau de vérification, pas de preuve d’un compte courant.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="04-context-permissions-and-agent-FR.md" aria-label="Chapitre précédent: Chapitre 4 · Contexte, autorisations et Agent">← Précédent<br><strong>Chapitre 4 · Contexte, autorisations et Agent</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="06-model-selection-FR.md" aria-label="Chapitre suivant: Chapitre 6 · Choisir un modèle">Suivant →<br><strong>Chapitre 6 · Choisir un modèle</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
