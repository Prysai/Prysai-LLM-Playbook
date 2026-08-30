<!-- content_id: chapter-08-full-lifecycle-workflow | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-22-fr-lifecycle-restoration -->

# Chapitre 8 : De la définition à la livraison

**Statut :** `candidate` · **Expérience :** `not_run`

Ce chapitre propose un flux de travail qui transporte des preuves d’une étape à
l’autre. L’exercice et le cas sont des supports pédagogiques : ils ne sont pas
le compte rendu d’une session Codex, d’un client ou d’une mise en production.

## Le problème que résout ce chapitre

Faire commencer une rédaction est facile. Terminer un résultat utile est autre
chose. Une tâche peut sembler saine alors que l’objectif est encore vague, que
le périmètre s’élargit, que le contrôle porte sur les mauvais fichiers ou que le
dernier changement confirmé est inconnu. Un Agent peut s’arrêter après une
interruption de capacité ; un terminal peut rester en `Working` sans preuve de
fin ; une page d’authentification peut réussir alors que l’échange suivant
échoue.

Le cycle utile est donc :

```text
définir → planifier → construire → vérifier → relire → livrer → maintenir
```

Chaque flèche est un point de décision. Une étape n’est pas terminée parce que
l’interface a avancé ou que l’Agent a dit « terminé ». Elle l’est lorsque la
preuve de sortie existe et qu’une autre personne peut la relire.

![Carte pédagogique : un flux de travail transporte les preuves de la définition à la maintenance](../../assets/teaching/locales/fr/lifecycle-checkpoints.svg)

> Cette carte appartient au projet. Elle explique une méthode ; elle ne prouve
> pas qu’un Skill, un Agent ou un service externe a exécuté ce flux.

### Voir un résultat sans perdre sa frontière

Le dépôt contient aussi un cas fictif et jetable : une page destinée à un
acheteur immobilier débutant. Lisez d’abord le [registre du cas](../../docs/research/skill-case-product-context-real-estate-2026-08-11.md) :
il décrit les entrées synthétiques, le rendu local, le viewport et ce que la
capture ne peut pas établir.

[![Rendu local de la page fictive pour un premier acheteur](../../assets/cases/product-context-real-estate-thumbnail.png)](../../assets/cases/product-context-real-estate-desktop.png)

La capture prouve seulement qu’un rendu local a été observé à un viewport donné.
Elle ne prouve ni l’exécution autonome d’un Skill, ni la réalité d’une annonce,
ni un gain de confiance, de demandes ou de ventes. Le [sandbox source](../../examples/skill-sandbox/product-context-real-estate/README-FR.md)
reste assez petit pour être relu et relancé sans secret ni requête externe.

## Objectifs d’apprentissage

À la fin de ce chapitre, vous devriez pouvoir :

- écrire une définition avec périmètre, exclusions, acceptation, autorité et
  cible de récupération avant d’autoriser une édition ;
- transformer une grande demande en tranche verticale qui produit rapidement une
  preuve relisible ;
- créer des points de contrôle qui conservent le dernier état connu et rendent
  les reprises conditionnelles ;
- distinguer les preuves de source, de build, de runtime, de rendu visuel, de
  sécurité et d’acceptation humaine ;
- remettre un relais honnête qui dit ce qui s’est passé, ce qui n’a pas eu lieu
  et ce que le prochain lecteur doit encore vérifier.

## Entrée du problème réel : l’échec peut se trouver entre deux écrans

La [recherche de terrain Codex](../../docs/research/field-problems-codex.md)
rassemble des rapports publics. Ce sont des symptômes rapportés, pas des
analyses officielles de cause ni des reproductions locales.

| Symptôme rapporté | Ce que le rapport permet de dire | Ce qu’il ne prouve pas | Première réponse sûre |
|---|---|---|---|
| Le modèle devient indisponible et la tâche s’arrête | Un run a été interrompu par un signal de capacité | La sémantique de la file, la cause du service ou le comportement de tous les comptes | Geler les prompts dépendants, relire diff, journaux et dernier point accepté |
| Un formateur reste longtemps en `Working` | Aucun signal de fin n’a été observé dans ce run | Un deadlock universel ou le processus fautif | Fixer un délai, garder sortie et état du processus, interrompre selon la règle |
| Le navigateur annonce la réussite de l’authentification, puis le client échoue | L’authentification comporte plusieurs étapes observables | Que la page prouve l’échange, le réseau ou la préparation du client | Séparer callback, échange et première requête réussie |
| « Vérifier » déclenche une réinstallation | Une demande de contrôle a franchi une frontière persistante | Que tous les Agents agissent ainsi ou qu’une installation soit toujours fausse | Séparer source, test, installation, redémarrage, déploiement et contrôle en ligne |

La règle n’est pas « ne jamais réessayer ». La suite doit dépendre de
l’observation et de l’autorité, pas seulement du temps écoulé ou d’un libellé.

## 1. Le cycle est une suite d’états qui portent des preuves

Les sept étapes sont un modèle pédagogique. Elles ne promettent pas que chaque
surface Codex affiche exactement ces états.

| Étape | Question | Travail permis | Preuve de sortie | S’arrêter si… |
|---|---|---|---|---|
| Définir | Quel résultat, pour qui, dans quelle limite ? | Lire règles, cible, entrées, risques et exclusions | Protocole et critère d’acceptation | Une entrée manque et pourrait changer le périmètre ou l’autorité |
| Planifier | Quel est le plus petit ordre utile ? | Cartographier dépendances, tranche et inconnues | Plan ordonné et contrôles | Le plan n’est qu’une suite de couches sans résultat vérifiable |
| Construire | Qu’est-ce qui a changé dans la portée autorisée ? | Faire une modification bornée et garder un checkpoint | Diff, liste des fichiers et checkpoint | Le diff sort du périmètre ou le retour arrière est inconnu |
| Vérifier | Le résultat se comporte-t-il selon les contrôles pertinents ? | Tests ciblés, rendu, runtime ou vérification de source | Commande, code, sortie, environnement et limites | La commande porte sur la mauvaise cible ou ne produit aucune preuve |
| Relire | Les affirmations correspondent-elles aux preuves ? | Relire le diff dans un contexte neuf, examiner risques et maintenance | Tableau affirmation→preuve et risques ouverts | Une affirmation est plus large que sa preuve |
| Livrer | Une autre personne peut-elle utiliser et inspecter le résultat ? | Remettre fichiers, journaux, limites et suite | Note de livraison et chemins exacts | Le statut serait exagéré en publié ou en ligne |
| Maintenir | Qui met à jour ou restaure le résultat ? | Enregistrer source, propriétaire, revue et rollback | Fiche de maintenance et déclencheur de revue | Personne ne possède la mise à jour ou le rollback |

Utilisez `blocked` ou `unverified` si la preuve de sortie manque. N’ajoutez pas
une étape supplémentaire pour cacher un fichier, une permission ou un test
manquant.

### Un état ne remplace pas une preuve

| Phrase | Preuve minimale |
|---|---|
| « La source a changé. » | Diff ou comparaison à un chemin nommé |
| « Le contrôle a tourné. » | Commande, répertoire, code retour et sortie |
| « L’application fonctionne. » | Observation runtime dans un environnement et avec une entrée nommés |
| « La page est correcte. » | Rendu à un viewport enregistré et critères visuels |
| « La fonctionnalité est livrée. » | État du dépôt ou du déploiement, release et contrôle après livraison |

Un build vert est utile, mais ne devient pas automatiquement une preuve runtime,
visuelle, de sécurité ou d’acceptation utilisateur.

## 2. Définir avant d’agir

La définition transforme un souhait en contrat assez court pour être lu avant le
travail et assez précis pour empêcher l’invention de périmètre.

```text
owner: content-maintainer
target: docs/guide.md
goal: rendre étapes, liens et acceptation cohérents
allowed_scope: lire les règles ; modifier docs/guide.md ; lancer les contrôles existants
inputs: fichier cible, règles, liste de défauts et vérificateur de liens
non_goals: pas de code, installation, commit, push, publication ni message externe
acceptance: défauts nommés corrigés et contrôles autorisés avec une sortie
evidence: diff, fichiers modifiés, sortie, revue et liste des inconnues
stop_when: cible, portée, autorité ou source de récupération manquante
rollback: copie avant édition ou checkpoint propre enregistré
delivery: relais local indiquant si commit et push n’ont pas eu lieu
```

Deux omissions sont fréquentes. `non_goals` protège contre l’expansion :
« vérifier la page » n’autorise pas silencieusement une réinstallation ou un
déploiement. `rollback` doit nommer une vraie source de récupération ; un hash
prouve qu’un fichier a changé, mais ne remet pas son contenu à lui seul.

### La règle d’autorité minimale

Commencez en lecture seule. Ajoutez l’écriture seulement pour la cible nommée.
Ajoutez réseau, authentification, installation, redémarrage, déploiement ou
message externe uniquement si la tâche en a besoin et que ce périmètre est
autorisé. Une capacité technique et une autorisation sémantique sont deux faits
différents. Les actions d’un connecteur ou d’un MCP qui ont un effet externe
restent dans la frontière d’approbation.

## 3. Planifier autour de tranches verticales

Un plan horizontal termine une couche avant de savoir si un utilisateur obtient
un résultat :

```text
toutes les données → toute l’API → toute l’interface → intégration → tests
```

Une tranche verticale prend un résultat étroit de l’entrée jusqu’à la preuve :

```text
une entrée → plus petit changement → une observation → un contrôle ciblé
```

Par exemple, « un lecteur ouvre un chapitre et trouve son expérience » peut
être une meilleure première tranche que « migrer toute la navigation du livre ».

| Champ de tranche | Exemple |
|---|---|
| Résultat | Un chapitre s’ouvre depuis le sommaire anglais |
| Entrées | Source, entrée du sommaire, matrice de locale et vérificateur de liens |
| Changement | Ajouter le fichier canonique et son entrée anglaise seulement |
| Acceptation | Lien résolu, statut enregistré, ancien chemin conservé seulement s’il est déclaré legacy |
| Preuve | Diff, validation, sortie du lien local et revue des fichiers concernés |
| Non prouvé | Qualité de traduction, compréhension, déploiement ou runtime d’un Skill |

Exposez l’inconnue la plus coûteuse dans la première tranche. Une dépendance à
une capacité de fournisseur, un artefact absent ou un credential manquant ne doit
pas être découverte après plusieurs couches de travail.

## 4. Construire avec des points de contrôle

Un checkpoint décrit un état récupérable ; ce n’est pas seulement une heure.
Il permet de décider sans faire confiance à l’historique du chat.

```text
run_id: chapter-review-001
CP0: copie initiale, statut, hash cible et source de récupération
CP1: définition acceptée ; plan et autorisations fixés ; aucune édition
CP2: première tranche éditée ; diff et fichiers modifiés enregistrés
CP3: contrôles terminés ou interrompus ; sortie et inconnues enregistrées
CP4: relecture indépendante ; état de livraison et prochaine revue
```

À chaque point, demandez : quelle est la dernière réussite certaine ? Quels
fichiers, processus, services ou comptes peuvent avoir changé ? Quelle preuve
manque ? Quelle est l’action sûre la plus petite ? Quelle condition impose une
pause plutôt qu’un retry ?

Ne planifiez pas la suite à partir d’un checkpoint non accepté. Une référence
dans une conversation n’est pas une preuve que la tâche précédente a fini.

### Réessayer seulement après avoir relu l’état

```text
failed_stage: verify
failure_class: capacity | timeout | unknown
last_accepted_checkpoint: CP2
changes_since_checkpoint: aucun connu ; diff relu
retry_condition: même commande, même cible, une tentative bornée
fallback: arrêter et remettre un relais si la sortie reste absente ou si la portée change
```

« Continue » n’est pas un plan de récupération : il ne nomme ni l’état accepté,
ni le risque de doubler un effet, ni la raison qui rend le retry sûr.

## 5. Vérifier par couches

Choisissez les contrôles en fonction des affirmations que vous voulez faire.

| Affirmation | Contrôle qui peut la soutenir | Limite du contrôle |
|---|---|---|
| Le fichier prévu a changé | Diff sur le chemin nommé | Ne prouve pas que le changement est correct |
| La syntaxe ou le build est valide | Validateur ou commande de build ciblé | Ne prouve pas le runtime |
| La fonction marche dans un environnement | Observation runtime avec entrée fixe | Ne généralise pas à chaque compte, OS ou fournisseur |
| La page se rend comme prévu | Inspection navigateur à viewport enregistré | Ne prouve pas l’accessibilité complète ni le déploiement |
| Le fait externe est actuel | Source d’autorité datée, portée et prochaine revue | Ne prouve pas l’accès du compte courant |
| La release est en ligne | Trace de déploiement et requête après livraison | Ne prouve pas chaque cache, route ou appareil |

Gardez un tableau affirmation→preuve :

```text
claim: le chapitre 8 est accessible depuis le sommaire anglais
evidence: lien du sommaire et sortie du vérificateur local
scope: arbre de travail au commit enregistré
not_proven: rendu GitHub, liens traduits et compréhension du lecteur

claim: l’expérience comparative est terminée
evidence: aucune
scope: aucun
status: not_run ; ne pas déclarer complete
```

### Quand une commande reste en `Working`

Le silence est une observation, pas un succès. Avant une commande longue,
définissez la sortie attendue, le délai raisonnable et le mécanisme d’interruption.
Si le délai expire :

1. consignez commande, répertoire, cible et durée ;
2. capturez la sortie et l’état du processus disponibles ;
3. inspectez diff et dernier checkpoint ;
4. interrompez seulement si la règle de récupération l’autorise ;
5. reclassez le résultat `complete`, `partial`, `failed` ou `unknown` avant tout retry.

Le rapport FP-10 ne permet pas de choisir entre formateur, processus enfant,
terminal ou Agent comme cause universelle. C’est précisément pourquoi la
récupération doit reposer sur des observations.

## 6. Relire indépendamment de l’exécution

La personne ou l’Agent qui a produit le changement est souvent la moins bien
placée pour décider qu’il est complet. Relisez le résultat dans un contexte neuf,
avec l’objectif et la liste de preuves visibles.

Posez quatre questions :

1. Le diff répond-il au problème déclaré ?
2. A-t-il modifié quelque chose hors périmètre ?
3. Chaque affirmation de livraison a-t-elle une preuve de même portée ?
4. Que devra savoir la personne suivante pour reproduire, mettre à jour ou
   restaurer le résultat ?

Relisez aussi l’échec. Une commande ratée peut avoir modifié un fichier ; un
retry peut avoir doublé un effet ; une capture peut cacher une requête manquante.

## 7. Livrer et maintenir

Un relais utile peut rester court :

```text
status: ready_for_local_review
owner: content-maintainer
scope: docs/guide.md seulement
actions_done: inspection, plan, édition, diff et contrôles locaux
actions_not_done: commit, push, publication et revue navigateur
evidence: CP0, diff CP2, sortie CP3, note de revue
unverified: utilité lecteur, rendu en ligne et faits hors brief
blocked_on: confirmation humaine avant commit
next_check: relire la cible et les chemins de preuve
permission_boundary: édition locale réversible et contrôles sans écriture
next_review: après changement de source ou de structure
```

La livraison n’arrête pas le cycle. Pour un modèle, un outil, une permission,
une commande ou un service volatile, enregistrez URL officielle, date d’accès,
portée, responsable et prochaine revue. Un Skill ou un workflow partagé demande
en plus son déclencheur, ses exclusions, ses tests et son rollback.

## 8. Motifs de récupération issus des rapports

### Interruption de capacité

**Signal observé :** le modèle devient indisponible et la tâche s’arrête.

**Première réponse sûre :** geler les prompts dépendants, conserver diff et
journaux, identifier le dernier checkpoint accepté et vérifier si l’artefact est
partiel. Ensuite seulement, choisir un retry borné, une surface de repli ou un
relais.

**Ne pas affirmer :** que la tâche en attente s’est terminée, que le modèle est
la seule cause ou que plusieurs prompts « continue » ont produit la preuve.

### Vérification longue

**Signal observé :** l’interface reste en `Working` sans sortie de fin.

**Première réponse sûre :** appliquer le délai prévu, conserver sortie et état,
inspecter diff et classer la vérification. Si la cause reste inconnue, la laisser
inconnue.

**Ne pas affirmer :** qu’une absence d’erreur visible signifie que le processus
a fini.

### Première page d’authentification réussie

Créez une carte séparant page d’autorisation, callback, échange client et
première requête réussie. Testez uniquement le prochain maillon manquant. Une
page réussie ne prouve ni l’accès au dépôt, ni le droit du compte, ni un outil MCP.

### Vérification qui demande un changement persistant

Arrêtez-vous et nommez l’effet, la cible, la sauvegarde, le rollback et le point
d’autorisation. Préférez un contrôle isolé ou en lecture seule. Une source, un
test vert et une installation réussie sont trois états différents.

## 9. Cas travaillé : relire un chapitre Markdown

Ce cas est un exemple rempli, pas un run enregistré.

### Définition

```text
owner: content-maintainer
target: docs/guide.md
goal: rendre étapes, liens et acceptation cohérents
allowed_scope: éditer docs/guide.md et lancer les contrôles existants
non_goals: code, installation, commit, push, publication et messages externes
```

Lisez uniquement le fichier cible, les règles du projet, le vérificateur
documenté et la liste fixe des défauts. Une affirmation produit volatile retourne
à sa fiche de source avant d’entrer dans le chapitre.

### Décision de capacité

| Capacité | Décision | Raison |
|---|---|---|
| Protocole de tâche | Utiliser | Fixe objectif, limites, confirmation et format de livraison |
| Orchestration | Utiliser comme registre | Suit dépendances et checkpoints sans élargir l’autorité |
| Revue des preuves | Utiliser | Relie diff et contrôle aux affirmations |
| Recherche externe | Ne pas utiliser maintenant | La liste de défauts est fixe |
| Navigateur, connecteur, écriture GitHub | Ne pas utiliser | Aucun ne sert une revue Markdown locale |

Choisir un Skill ne termine pas la tâche et ne lui donne pas le droit d’appeler
un autre outil.

### Sorties de chaque étape

| Étape | Action permise | Preuve de sortie |
|---|---|---|
| Définir | Lire règles, cible et défauts | Carte et liste d’entrées |
| Planifier | Ordonner deux ou trois éditions locales | Plan et hypothèses |
| Construire | Modifier seulement la cible | Diff, checkpoint et liste de fichiers |
| Vérifier | Lancer les contrôles existants | Commandes, codes, sorties et limites |
| Relire | Comparer diff, objectif et preuves | Note de revue et tableau affirmation→preuve |
| Livrer | Préparer le paquet local | Résumé disant si commit ou push ont eu lieu |

Si une sortie manque, classez l’étape `blocked` ou `unverified`.

### Checkpoints et récupération

```text
CP0 : copie originale, statut Git et hash de la cible
CP1 : plan accepté ; aucune édition
CP2 : édition locale ; diff de la cible enregistré
CP3 : contrôles terminés ou interrompus ; sorties et limites conservées
```

Si CP2 dépasse la portée, préservez le diff avant de corriger et revenez à la
source de récupération de CP0. Ne restaurez pas largement sans confirmer la
cible exacte et la source de retour.

### Livraison honnête

```text
completed: docs/guide.md relu et édité ; diff conservé
verified: portée autorisée et contrôle de liens nommé, avec codes retour
unverified: rendu navigateur, utilité lecteur et faits hors liste
not_done: commit, push, publication et écritures externes
next: revue humaine des chemins de preuve
```

## 10. Expérience : comparer deux plans pour un résultat

**Statut de l’expérience :** `not_run`.

### Préparation

Utilisez une copie ou un répertoire temporaire isolé, une entrée nettoyée, un
critère fixe et un registre de l’état initial. N’utilisez ni réseau, ni
installation, ni credential, ni commit, ni publication.

### Tâche

Écrivez deux plans pour le même objectif : un plan horizontal qui suit les
couches techniques et un plan par tranche verticale qui mène une petite entrée
jusqu’à sa preuve. Ne changez pas le critère entre les plans. Comparez la
première inconnue révélée, le premier artefact relisible, le nombre de
dépendances et le point de reprise après une interruption volontaire.

### Preuve et réflexion

Conservez les plans, le schéma de dépendances, les conditions d’entrée et de
sortie, le diff, les contrôles et les checkpoints. Notez quelle inconnue est
apparue le plus tôt, quelle tranche était encore trop grande et quel checkpoint
serait utilisé après une erreur de capacité ou un délai d’attente. Un résultat plus rapide
ou plus élégant n’est pas à lui seul une preuve d’efficacité générale.

## Échec intentionnel et frontière

Commencez une petite édition, écrivez « terminé » avant le contrôle, puis
simulez une interruption : modèle indisponible, commande silencieuse au-delà du
délai, ou récupération qui demanderait installation, redémarrage, réseau ou
écriture hors périmètre.

Le passage exige un relais contenant checkpoint, diff partiel, preuve manquante,
limite d’autorité, chemin de récupération et inconnue précise. Empiler des
éditions pour donner une impression de progrès fait échouer l’expérience.

## Terminer d’abord une petite tranche complète

Choisissez un court texte, un README local ou un petit ensemble de sources
publiques. Le but n’est pas de faire « beaucoup », mais de fermer une boucle
visible :

```text
Résultat : une phrase de 120 caractères maximum permet de trouver le premier pas.
Entrée : texte original, lecteur visé et problème connu.
Autorisé : lire, proposer un plan, puis modifier ce texte après confirmation.
Interdit : réseau, connexion, installation, envoi, publication et autres fichiers.
Contrôle : comparer avant/après et demander si le premier pas est trouvable.
Relais : changement, contrôle, actions non faites et inconnues.
```

Si une entrée ou une action externe devient nécessaire, arrêtez `blocked` avant
d’élargir les permissions.

## Transfert

Appliquez le cycle à un brief de recherche, une page marketing ou une remise de
design. Pour chaque étape, écrivez la condition d’entrée, la preuve de sortie,
la condition d’arrêt et la frontière d’effet. Identifiez ce qui correspond à un
diff, à un contrôle runtime et à une acceptation humaine.

## Liste de contrôle d’acceptation

- [ ] Je peux écrire une définition avec objectif, périmètre, exclusions,
      autorité, preuve et source de rollback.
- [ ] Je distingue plan horizontal, plan par fichiers, tranche verticale et sonde.
- [ ] Chaque tranche a une dépendance, un résultat fourni à la suivante et un
      contrôle de dépendance.
- [ ] J’ai fixé un budget d’actions et un checkpoint avant tout effet irréversible.
- [ ] Je peux arrêter après un délai d’attente, un changement de portée, une autorité manquante ou
      cible inconnue sans empiler automatiquement des éditions.
- [ ] Je sais relire une reprise en changeant une seule variable.
- [ ] Le relais sépare `done`, `partial`, `blocked`, `unverified`, `not_proven`
      et `next`.
- [ ] Je peux dire que l’expérience reste `not_run` tant qu’un run local et une
      relecture ne sont pas enregistrés.

## Sources et limite de mise à jour

| Fait ou frontière | Source | Portée | Responsable / prochaine revue |
|---|---|---|---|
| Sandbox et approbation sont deux contrôles distincts ; un connecteur peut avoir un effet externe | [Agent approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security.md) et [facts refresh](../../docs/research/openai-codex-facts-refresh-2026-08-09.md) | Description officielle datée ; ne prouve pas la politique runtime de ce dépôt | `facts-maintainer` / 2026-09-09 |
| Le travail Cloud sépare setup, Agent, revue et suivi | [Codex Cloud](https://learn.chatgpt.com/docs/cloud.md) | Fait produit ; compte, organisation et environnement exigent une vérification séparée | `facts-maintainer` / 2026-09-09 |
| Une interruption de capacité peut laisser l’état d’une tâche dépendante incertain | [FP-09 / issue #33865](https://github.com/openai/codex/issues/33865) et [recherche terrain](../../docs/research/field-problems-codex.md) | Rapport public, sans cause universelle ni reproduction locale | `curriculum-maintainer` / 2026-09-09 |
| Une vérification longue peut laisser la complétion ambiguë | [FP-10 / issue #34325](https://github.com/openai/codex/issues/34325) | Rapport public ; cause et portée inconnues | `curriculum-maintainer` / 2026-09-09 |
| L’authentification doit être décomposée en étapes observables | [FP-01 et FP-02](../../docs/research/field-problems-codex.md) | Discipline de preuve, pas conseil officiel de réparation | `curriculum-maintainer` / 2026-09-09 |
| Une vérification ne doit pas devenir silencieusement une installation persistante | [FP-11 / issue #37677](https://github.com/openai/codex/issues/37677) | Rapport public, pas politique officielle ni reproduction locale | `curriculum-maintainer` / 2026-09-09 |

Les principes de cycle sont relativement stables. Les surfaces, modèles,
permissions, commandes, authentification et services changent. Lorsqu’un fait
évolue, actualisez d’abord sa fiche de première partie, puis revoyez ce chapitre,
les Labs et les chemins du site. Cette version française reste
`in-progress / candidate / not_run` jusqu’à une relecture francophone et une
exécution bornée.

## Pratique de la frontière de récupération

Utilisez le [Lab 014 : réconcilier une tâche reprise](../labs/lab-014-resume-reconciliation-FR.md)
après une interruption, une perte de contexte ou un changement de branche ou de
permission. Le Lab exige une lecture de l’état courant avant toute reprise ; un
ancien plan n’est pas une preuve que l’environnement est resté identique.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="07-skills-plugins-and-tools-FR.md" aria-label="Chapitre précédent: Chapitre 7 · Skills, Plugins, MCP et outils">← Précédent<br><strong>Chapitre 7 · Skills, Plugins, MCP et outils</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="09-verification-and-recovery-FR.md" aria-label="Chapitre suivant: Chapitre 9 · Vérification et récupération">Suivant →<br><strong>Chapitre 9 · Vérification et récupération</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
