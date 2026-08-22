<!-- content_id: chapter-02-first-safe-task | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-22-fr-foundation-restoration -->

# Chapitre 2 : Réaliser une première tâche sûre et vérifiable

**Statut :** `candidate` · **Expérience :** `not_run`

Cette adaptation française est en cours de relecture indépendante. Elle ne
prouve pas un apprentissage ni le comportement d’un compte, modèle ou outil.

## Commencer ici : rendre le premier pas volontairement banal

Vous n’avez pas besoin d’un projet spectaculaire pour apprendre à utiliser un
outil d’IA. Une tâche dramatique mélange trop de fichiers, permissions et
inconnues pour permettre de comprendre ce qui a réussi ou échoué. Choisissez
une cible visible, une modification autorisée et un contrôle répétable. Sans
projet temporaire, utilisez la [fixture Première modification sûre](../routes/first-safe-change-FR.md).

## Le problème que résout ce chapitre

La première tâche réelle doit être petite, réversible, inspectable et
accompagnée d’une preuve d’acceptation avant la première écriture. Une demande
comme « améliore le projet » n’a ni cible ni critère stable.

Des rapports publics décrivent des périodes sans événement visible, des
contrôles restés en `Working`, des permissions qui ne s’appliquent pas à la
tâche courante et des vérifications devenues une installation. Ces rapports ne
prouvent pas une cause universelle ; ils montrent qu’un label de fin ne suffit
pas à porter toute l’affirmation.

```text
définir → inspecter → confirmer → modifier → relire le diff → vérifier → livrer ou arrêter
```

## Objectifs d’apprentissage

- choisir une tâche locale, réversible et vérifiable ;
- écrire le fichier exact et la frontière d’action avant l’édition ;
- distinguer capacité technique, approbation, état modifié et preuve ;
- récupérer sans élargir l’autorité ;
- livrer un compte rendu qui sépare observé, vérifié, non vérifié et bloqué.

## Une première tâche est une petite expérience

La tâche doit avoir une entrée et une cible nommées, un impact faible, un retour
arrière clair, aucune donnée sensible ni action externe, et un critère observable.
Ajouter une section README, corriger une faute connue ou ajouter un test pur
conviennent.

### Les six préconditions

| Frontière | Réponse minimale | Si elle manque |
|---|---|---|
| Surface | Copie temporaire ou sandbox, chemin absolu et état. | Rester en lecture seule et demander la surface. |
| Cible | Un fichier non sensible et son chemin exact. | Ne pas deviner. |
| Baseline | Copie propre, hash ou changements existants connus. | Enregistrer l’état avant de toucher. |
| Action | Une modification et les contrôles nécessaires ; pas d’installation, commit, push ou publication. | Demander si l’effet est autorisé. |
| Acceptation | Contrôle tiré de la configuration, du test, du fichier ou de la source réelle. | Ajouter le contrôle. |
| Arrêt | Règle pour entrée, autorité, délai, périmètre ou preuve manquants. | S’arrêter. |

## Ce que la frontière officielle dit — et ne dit pas

Consultez la [baseline officielle du chapitre 2](../../docs/research/chapter-02-official-baseline-2026-08-10.md)
pour les faits produits datés. La méthode stable est :

| Événement | Ce qu’il peut établir | Ce qu’il ne prouve pas seul |
|---|---|---|
| Proposition du modèle | Une action possible a été générée. | Permission ou exécution. |
| Sandbox affichée | Une limite technique est décrite. | Accès à tous les chemins. |
| Approbation acceptée | Une approbation précise a eu lieu. | Une portée plus large. |
| Réponse de succès | Une réponse d’outil a été reçue. | Objet modifié correctement. |
| `git diff` | L’état comparé diffère. | Tests, déploiement ou acceptation. |
| Test avec code zéro | Ce contrôle a passé ici. | Tous les chemins ou services. |
| `Completed` dans l’interface | Un état visuel existe. | Résultat relu ou objectif atteint. |

## Le protocole de première tâche

```text
Objectif : ajouter une section de démarrage local dans README.md.
Contexte : README, manifeste et script qui possède la commande.
Entrées : les fichiers nommés seulement.
Actions autorisées : lire puis, après confirmation, modifier README.md.
Interdit : code, installation, réseau, commit, push, publication, messages et secrets.
Baseline : statut et copie/hash de README.md.
Acceptation : les commandes existent dans le vrai script et le diff ne touche que README.md.
Échec : commande ambiguë, contrôle bloqué ou portée modifiée → préserver et arrêter.
Livraison : résumé, fichiers, commandes exécutées, sorties, limites et prochaine vérification.
```

Ce protocole convertit chaque verbe vague en objet, autorité et preuve. Ce n’est
pas un prompt magique : le jugement humain reste nécessaire.

## Du prompt de chat à la première tâche

```text
Objectif : clarifier une note ou un README local non sensible.
Entrée : texte collé ou fichier nommé ; marquer comme inconnu tout fait non fourni.
Autorisé : lire et proposer, puis modifier un seul fichier après confirmation.
Interdit : réseau, installation, connexion, envoi, commit, publication et secrets.
Acceptation : montrer le diff avant/après et relier chaque changement à l’objectif.
Arrêt : autre fichier, compte, réseau, écriture externe ou fait non confirmé.
```

Avant toute action :

```text
Répète l’objectif, les entrées lues, les actions interdites, la preuve d’acceptation
et la condition d’arrêt. Si un champ manque, pose seulement la question minimale.
```

## Trois moments de confirmation

### Avant la première action

Faites énoncer l’objectif, les fichiers lus, le seul chemin modifiable, les
actions interdites et la preuve attendue. Corrigez tout malentendu avant le diff.

### Avant un effet de bord

Éditer, exécuter, installer, utiliser le réseau, un compte, Git, un navigateur,
committer, pousser, publier ou envoyer sont des actions distinctes. Demandez une
nouvelle décision avec cible, effet, rollback et preuve exacts.

### Avant la livraison

Exigez les fichiers changés, commandes réellement exécutées, comparaison du
diff, état externe et éléments `unverified`, `blocked` ou `not_run`. Planifié,
tenté, terminé, validé, installé, publié et vérifié en ligne ne sont pas synonymes.

## Problèmes de terrain : quand les raccourcis cassent

Ces cas viennent de la [recherche du chapitre 2](../../docs/research/chapter-02-field-problems-2026-08-10.md).
Ce sont des rapports, pas des causes officielles ni des reproductions locales.

| Cas | Signal | Réponse sûre |
|---|---|---|
| Aucun événement visible | Attente et retry ne prouvent pas l’absence d’effet. | Conserver chronologie, checkpoint, diff et effets avant reprise. |
| Commande en `Working` | Démarrage, fin et contrôle réussi sont trois faits. | Fixer un délai, capturer sortie/état et inspecter le diff. |
| Vérification devenue réinstallation | Contrôle et mutation persistante sont différents. | Séparer source, test, installation, restart, publication et live check. |
| Configuration sans capacité | Visible, callable, lisible et inscriptible sont distincts. | Tester le chemin courant avec une sonde inoffensive. |
| Terminé dans l’interface | État runtime et résultat relu peuvent diverger. | Vérifier runtime, artefact, diff, effets et revue. |

### La plus petite sonde sûre

Confirmez le chemin absolu et son inclusion dans la sandbox autorisée, créez un
seul fichier sentinelle sans secret, relisez-le, puis retirez-le seulement si le
nettoyage est dans le périmètre. Notez chemin, opération, résultat et limites.
La sonde ne lit aucun credential, ne change aucune permission, n’installe rien,
n’appelle pas le réseau et ne prouve pas un accès de production.

## Récupérer lorsque la tâche bloque

1. Préserver carte, heure, répertoire, processus, dernier événement et sortie.
2. Interrompre seulement avec le mécanisme autorisé ; l’interruption ne prouve ni échec ni succès.
3. Inspecter `git status`, le diff, les dates, fichiers générés et la cible externe éventuelle.
4. Classer : entrée, objectif, chemin, environnement, implémentation, contrôle ou autorité.
5. Réduire la prochaine vérification à un fichier, une lecture, un test ou un marqueur temporaire.
6. Reprendre une seule fois seulement si une condition change et que le budget est écrit.

N’installez pas, n’élargissez pas l’accès, n’utilisez pas de credential, ne
supprimez pas l’état et ne contactez pas un service externe simplement parce
qu’une vérification a échoué.

## Trois couches de preuve

| Couche | Ce qu’elle doit montrer |
|---|---|
| Périmètre | Statut, liste de fichiers ou diff limité à la cible autorisée. |
| Correction | Commande, sortie, comparaison de source ou inspection couvrant l’acceptation. |
| Livraison | Actions faites et non faites, inconnues, blocages et prochaine vérification. |

Pour un effet externe, ajoutez cible exacte, autorisation, objet de résultat et
rollback. Pour un fait volatil, ajoutez URL, date, portée, responsable et revue.

## Expérience : une modification README en sandbox

### Préparation

Utilisez un dossier ou dépôt Git jetable, confirmez le chemin absolu et gardez
une copie propre. N’utilisez aucun secret, `.env`, fichier client, dépôt public,
installation ou cible de déploiement. Les commandes viennent du manifeste ou des
scripts réels.

### Tâche

```text
Run ID : lab001-readme-<date>-<suffix>
Objectif : ajouter une section de démarrage local exacte à <chemin>/README.md.
Lire d’abord : README.md, manifeste et script concerné.
Édition autorisée : README.md seulement.
Interdit : installation, réseau, code, commit, push, publication, messages et secrets.
Avant : rapporter baseline, plan, source de commande et contrôle.
Après : montrer le diff et exécuter uniquement le contrôle approuvé.
Chemin, commande, permission ou récupération ambigus → arrêter et demander.
```

### Preuve à conserver

```text
run_id:
checkpoint_before:
scope:
inputs_read:
assumptions:
actions_done:
actions_not_done:
diff_scope:
verification_command:
verification_result:
unverified:
blocked_on:
next_check:
permission_boundary:
status: passed | failed | stopped
```

Le passage exige que seul README change, que la commande corresponde au script
réel, que le contrôle ait une sortie ou `not_run`, qu’aucune écriture externe
ne soit faite et que le handoff n’affirme pas avoir lancé toute l’application.

### Variantes d’échec

Dans une copie temporaire, rendez le nom du script différent de README, faites
attendre un contrôle, retirez le critère d’acceptation ou demandez réseau,
installation, credential ou publication. La réponse correcte est `blocked` ou
`unverified` avec une explication ; aucun contournement n’est requis.

### Réflexion

Quel point de confirmation a évité le plus de risque ? Quelle affirmation le
diff prouve-t-il et laquelle exige une autre vérification ? Après interruption,
quel état reste inconnu ?

## Liste de contrôle d’acceptation

- [ ] La carte contient objectif, contexte, entrées, contraintes, actions permises, acceptation, échec et livraison.
- [ ] La baseline et l’observation avant action sont conservées.
- [ ] Le diff réel nomme son périmètre.
- [ ] Le contrôle a une sortie ou un statut `not_run` explicite.
- [ ] Une variante distingue arrêt, échec et succès.
- [ ] Le handoff sépare plan, action, preuve et portée non vérifiée.
- [ ] L’autorité minimale suffit à la tâche.

## Transfert

Transférez la carte à un brief de recherche à sources fixes, une correction de
texte, un inventaire de contenu ou une revue visuelle. Gardez objectif, entrées,
limites, actions, acceptation, échec et livraison ; ajoutez citations, vie privée,
échantillonnage, revue humaine ou preuve visuelle. Comparez les champs stables,
ceux propres au domaine, les effets interdits et les preuves nécessaires à une
réutilisation d’équipe.

## Sources et limite de mise à jour

Le protocole, les couches de preuve et la récupération sont des méthodes
stables. Permissions, sandbox, commandes, modèles et interface sont volatils.
Consultez la [baseline officielle](../../docs/research/chapter-02-official-baseline-2026-08-10.md)
et le [cycle de contenu](../../docs/governance/content-lifecycle.md) avant une
instruction produit. La recherche de terrain contient des rapports et
suggestions, pas des causes officielles. Cette version reste `candidate` et
`not_run` jusqu’à une nouvelle exécution bornée et documentée.

Continuez avec le [Chapitre 3 : transformer un souhait en protocole](03-task-protocol-FR.md).

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres"><table role="presentation" width="100%"><tr>
<td align="left"><a data-chapter-nav="previous" href="01-gpt-and-codex-FR.md" aria-label="Chapitre précédent : Chapitre 1 · Comprendre GPT avant Codex">← Précédent<br><strong>Chapitre 1 · Comprendre GPT avant Codex</strong></a></td>
<td align="right"><a data-chapter-nav="next" href="03-task-protocol-FR.md" aria-label="Chapitre suivant : Chapitre 3 · De l’intention au protocole">Suivant →<br><strong>Chapitre 3 · De l’intention au protocole</strong></a></td>
</tr></table></nav>
<!-- chapter-navigation:end -->
