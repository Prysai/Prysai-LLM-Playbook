<!-- content_id: chapter-09-verification-and-recovery | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: 2026-08-22-fr-contract-reinforcement -->

# Chapitre 9 : Vérifier, douter et récupérer

**Statut :** `candidate` · **Expérience :** `not_run`

Ce chapitre apprend à relier chaque affirmation à la plus petite preuve qui la
soutient, puis à reprendre une tâche incertaine sans élargir son périmètre. Les
rapports publics sont des entrées pédagogiques, pas des reproductions locales,
diagnostics officiels ou preuves de production. Les états de travail (`verified`,
`partial`, `unverified`, `blocked`, `not_run`) décrivent ici la portée de la
preuve ; ils ne classent pas une personne ni un fournisseur.

![Carte pédagogique : s’arrêter à la première preuve manquante et récupérer avec une vérification sûre](../../assets/teaching/evidence-recovery-ladder.svg)

> Cette carte appartient au projet. Elle décrit une méthode de revue ; elle ne
> prouve pas l’exécution d’un Skill, Agent, outil ou service externe.

## Le problème que résout ce chapitre

Un Agent peut produire un résumé convaincant pour un résultat faux, hors
périmètre, jamais exécuté ou contrôlé dans le mauvais environnement. La réponse
fiable n’est ni la confiance aveugle ni le doute permanent : découpez le résumé
en affirmations et donnez à chacune la plus petite preuve qui puisse la soutenir.

## Objectifs d’apprentissage

- séparer une affirmation de complétion et choisir sa preuve minimale ;
- distinguer error, unverified, unknown, partial, not_observed et verified ;
- repérer la dernière étape confirmée et le premier maillon non étayé ;
- préserver l’état, réduire la portée, ajouter un contrôle ou arrêter ;
- rédiger une livraison avec les travaux faits, lacunes et prochaine vérification.

## Une entrée de terrain : reprendre le contrôle ne prouve pas le résultat

Les recherches du projet décrivent des interruptions de capacité, des commandes
restées en `Working`, des outils absents et des contrôles qui se sont transformés
en réinstallation.
Elles montrent des ruptures observables, mais n’établissent ni cause universelle
ni correctif pour chaque compte.

| Symptôme rapporté | Ce qu’il soutient | Première réponse bornée |
|---|---|---|
| Modèle indisponible, tâche interrompue | Un observateur a vu une erreur et une interruption. | Geler, inspecter diff, logs et dernier checkpoint. |
| Contrôle bloqué en Working | Aucun signal de fin n’a été observé dans ce run. | Fixer un délai, capturer sortie et état, interrompre selon la règle. |
| Session disponible, outil absent | Inventaire et attente ne correspondaient pas. | Consigner la liste réelle, arrêter avant l’action. |
| Vérification transformée en réinstallation | Une interprétation a franchi une frontière persistante. | Séparer source, test, installation, redémarrage, publication et contrôle en ligne. |

Ne concluez pas « ne jamais réessayer » ou « installer est toujours faux ».
Faites dépendre la suite de l’observation, de l’autorité et du budget.

### Trois cas Windows : le signal n’est pas la preuve

Ces cas proviennent de rapports GitHub publics consultés le 12 août 2026. Ils ne
constituent ni une reproduction locale, ni un diagnostic officiel, ni un
comportement Windows universel. Le détail des versions et la limite de chaque
source figurent dans la [recherche sur les entrées et les preuves Windows](../../docs/research/field-problems-input-and-evidence-p3-2026-08-11.md).

| Symptôme rapporté | Ce que l’on peut en tirer | Premier contrôle borné | S’arrêter avant |
|---|---|---|---|
| La sortie CLI dépasse la fenêtre du terminal et ne semble plus récupérable ([#35335](https://github.com/openai/codex/issues/35335)) | Une fenêtre d’affichage n’est pas une preuve durable | Sauvegarder la sortie dans un fichier nommé ou régénérer seulement l’extrait nécessaire ; noter CLI, terminal et portée du prompt | Affirmer que l’absence dans le scrollback prouve une perte de données du dépôt |
| Des caractères non BMP disparaissent lors d’un collage dans le composeur TUI ([#37578](https://github.com/openai/codex/issues/37578)) | L’écho du composeur ne prouve pas l’intégrité de l’entrée | Comparer la chaîne prévue et la chaîne reçue avec un jeu de test inoffensif avant toute demande conséquente | Éditer, committer ou envoyer une requête dont l’entrée n’a pas été préservée |
| Des références de checkpoint longues provoquent `bad ref` ou `Filename too long` sous Windows Git ([#37559](https://github.com/openai/codex/issues/37559)) | L’état interne d’un Agent n’est pas l’état ordinaire du projet | Dans un périmètre autorisé, consigner `git status`, `git show-ref`, `git fsck --full`, `git worktree list` et le chemin exact de la référence | Supprimer `.git`, modifier la configuration ou réparer sans copie et autorisation |

La règle pratique est de capturer le plus petit artefact durable avant une
nouvelle tentative (`retry`) :
fichier de sortie, comparaison de l’entrée reçue, diff, hash, journal de commande
ou passation expurgée. Un contournement communautaire peut aider au triage ; ce
n’est ni un correctif officiel ni une autorisation de modifier l’environnement.

### Registre de terrain : ne pas mélanger signal et preuve

Pour chaque rapport, remplissez une ligne avant de proposer une réparation. Le
registre garde la portée du témoignage et empêche une hypothèse de devenir une
cause officielle par simple répétition :

| Champ | Exemple de valeur | Question de contrôle |
|---|---|---|
| `source` | ticket, URL ou rapport daté | Qui a écrit le signal et quand ? |
| `observation` | « aucun événement visible pendant 10 min » | Qu’a-t-on réellement vu, dans quelle surface ? |
| `claim` | « la première tentative est peut-être encore active » | Quelle phrase voulons-nous soutenir exactement ? |
| `evidence` | sortie, diff, hash, état relu | Quel artefact peut être inspecté par une autre personne ? |
| `status` | `verified`, `partial`, `unverified`, `blocked`, `not_run` | L’état décrit-il l’observation ou une conclusion trop large ? |
| `next_check` | relire un fichier local sans écriture | Quelle seule lecture pourrait changer la décision ? |
| `limit` | pas de reproduction, pas de cause mainteneur | Que cette source ne permet-elle pas d’affirmer ? |

Un rapport peut donc contenir une observation `verified` tout en laissant sa
cause `unverified`. N’écrivez pas « le service est bloqué » si la seule preuve
est « aucun événement n’a été observé dans cette interface ».

### Cas FC-EVIDENCE-01 : une commande terminée peut laisser une affirmation impossible à relire

Le [cas borné FC-EVIDENCE-01](../../docs/research/field-case-hidden-verification-output-2026-08-12.md)
s’appuie sur le ticket #34951. Le ticket était ouvert, sans diagnostic public de
mainteneur, et n’a pas été reproduit ici. Si la sortie nécessaire est absente,
conservez seulement l’exit, l’événement, le diff, l’artefact, le hash ou le
résultat de la relecture déjà autorisés ; marquez l’affirmation `unverified` et nommez le
canal manquant. Ne relancez pas une action conséquente uniquement pour récupérer
une sortie de présentation ou pour affaiblir une limite de sécurité.

## 1. Relier les affirmations aux preuves

| Affirmation | Preuve minimale dans la portée déclarée | Ce qui reste hors affirmation |
|---|---|---|
| Un fichier a changé | Diff, chemin nommé ou hash. | Correction ou complétude. |
| Un contrôle a réussi | Commande, répertoire, code retour et sortie. | Comportement d’un autre environnement. |
| L’application démarre | Démarrage réel et observation d’un chemin critique. | Qualité, sécurité, valeur ou production. |
| La page est correcte visuellement | Rendu ou capture à viewport enregistré. | Accessibilité, tous breakpoints ou backend. |
| Le fait vient d’une source officielle | URL, date, portée et responsable. | Capacité de votre compte courant. |
| Aucun secret n’est exposé | Scan borné, vérification d’environnement et frontière écrite. | Système externe inconnu. |
| Le résultat aide les utilisateurs | Échantillon, tâche et acceptation utilisateur définis. | Succès du marché. |
| Prêt pour la production | Portes qualité, sécurité, maintenance, release et rollback. | Environnement non testé ou futur changement. |

### Avant le Lab 013 : écrire un tableau affirmation → preuve

Avant un slice auditable, écrivez :

~~~text
assertion: ce que je prétends exactement
scope: fichier, commande, run, version ou environnement
evidence: chemin, sortie, log, capture, source ou revue
status: verified / partial / unverified / blocked / not_run
gap_or_next_check: ce qui manque et la plus petite façon de l’ajouter
~~~

Un diff ne prouve pas un test ; une page connectée ne prouve pas un échange de
token ou une action distante. Une preuve absente reste unverified ou blocked.

## 2. Utiliser le doute pour choisir le prochain contrôle

Pour une décision importante, demandez : quelle prémisse n’a pas de preuve ?
Quelle frontière est hors test ? Le résultat peut-il venir d’un cache, d’un mock,
d’un fichier ancien ou du mauvais environnement ? Où le défaut deviendrait-il
visible ? Quel contrôle additionnel changerait la décision ?

| Phrase | Preuve minimale |
|---|---|
| « La source a changé. » | Diff ou comparaison au chemin nommé. |
| « Le contrôle a tourné. » | Commande, répertoire, code et sortie. |
| « L’application fonctionne. » | Observation runtime dans l’environnement nommé. |
| « La page est correcte. » | Rendu à viewport enregistré et critères visuels. |
| « La fonctionnalité est publiée. » | État distant, release/deployment et contrôle post-livraison. |

La dernière phrase est plus exigeante que les quatre premières. Un build vert
est utile, mais il ne prouve pas automatiquement le runtime, le rendu visuel,
la sécurité ou l’acceptation par les utilisateurs.

### Un statut n’est pas un contrôle de sortie

Les étiquettes `Working`, `Completed`, `success` ou `ready` décrivent une surface
ou un état rapporté ; elles ne ferment pas à elles seules une affirmation. Pour
chaque statut, demandez : quel objet a changé, dans quel environnement, avec
quelle sortie conservée et quelle lecture indépendante ? Si la réponse manque,
gardez `unverified`, `partial` ou `not_run` au lieu de transformer le libellé en
conclusion.

## 3. Récupérer dans un ordre borné

1. préserver l’erreur et l’état courant ;
2. classer la frontière : entrée, compréhension, environnement, code, capacité, permission ou vérification ;
3. réduire le périmètre et reproduire la rupture la plus petite ;
4. faire une réparation minimale ou ajouter un contrôle ciblé ;
5. relancer le chemin touché et consigner la nouvelle preuve ;
6. si la cause reste floue, arrêter et livrer une note de blocage précise ;
7. élargir permission, portée ou budget seulement si la preuve le justifie.

« Relancer » n’est donc pas une stratégie de récupération. Avant tout nouvel
essai, écrivez l’état qui a changé, l’idempotence de l’action, le budget restant
et la preuve attendue. Si l’effet de la première tentative est inconnu, le
statut reste `unverified` ou `blocked` jusqu’à une lecture de réconciliation ;
un résultat favorable obtenu ensuite ne transforme pas rétroactivement la
première tentative en succès.

### Chaîne de capacité

~~~text
outil/Skill visible → découverte en lecture seule → état cible lisible
→ action retourne → changement externe confirmé
~~~

Chaque maillon a sa propre preuve. Un nom visible ne prouve pas l’enregistrement,
la découverte ou l’exécution. Une lecture du DOM ne prouve pas un clic réussi.

### Une fiche de point d’arrêt doit être actionnable

Ne gardez pas la chaîne de capacité comme un simple schéma. Pour chaque maillon,
inscrivez quatre éléments :

```text
stage: découverte / cible lisible / action retournée / effet confirmé
observation: ce qui a réellement été vu
status: passed | failed | not_observed
next_check: une seule lecture sûre qui pourrait changer le statut
```

Le `next_check` doit être plus petit que l’action qui a échoué. Il ne doit pas
installer, publier, élargir les permissions ou répéter une écriture dont l’effet
reste inconnu. Si aucune lecture bornée ne peut lever le doute, livrez
`unverified` ou `blocked`.

### Décalage de surface : visible ne signifie pas callable

Des rapports publics décrivent une surface Computer Use ou `node_repl` visible
alors qu’un appel en lecture seule échouait, un navigateur dont le DOM était
lisible mais dont le clic expirait, ou une configuration de fournisseur qui ne
rendait pas la capacité multi-agent attendue. Ce sont des rapports du 10 août
2026, pas des faits internes ni des reproductions. Consultez la
[recherche terrain Web](../../docs/research/web-field-problems-2026-08-10.md),
notamment WF-08 à WF-11, et ne généralisez pas l’exemple à tous les comptes.

### Fiche de point d’arrêt

~~~yaml
run_id: "identifiant unique"
surface: "surface et version réelles"
expected_capability: "plus petite capacité nécessaire"
chain:
  - stage: "session disponible"
    observation: "événement ou erreur observable"
    status: "passed | failed | not_observed"
  - stage: "outil enregistré et découvrable"
    observation: "liste ou découverte en lecture seule"
    status: "passed | failed | not_observed"
  - stage: "état cible lisible"
    observation: "chemin, compte, objet ou fenêtre"
    status: "passed | failed | not_observed"
  - stage: "action retournée"
    observation: "résultat, code ou catégorie d’erreur"
    status: "passed | failed | not_observed"
  - stage: "effet confirmé"
    observation: "diff, relecture ou état distant"
    status: "passed | failed | not_observed"
last_confirmed_stage: "dernier maillon passé"
first_breakpoint: "premier maillon échoué ou non observé"
safe_next_check: "contrôle qui change une seule condition"
stop_condition: "moment où l’on s’arrête sans élargir l’autorité"
~~~

### Longue attente sans événements

Consignez request_started_at, first_event_at, chaque événement outil/réseau,
last_event_at, l’interruption ou erreur, le début d’un retry et l’état final. Au
seuil prévu, marquez no_event_observed, reprenez le contrôle par un moyen
autorisé et inspectez processus, worktree, cible et checkpoint. Si un effet est
possible, arrêtez unverified ou blocked. Une seconde tentative réussie ne
réécrit pas la première tentative silencieuse.

### Réconcilier une réponse perdue

Après une réponse absente, gelez la suite, conservez la commande exacte et
relisez seulement la cible déclarée. Comparez baseline, état actuel et
postcondition, puis classez :

```text
no_effect_observed | effect_matches | effect_differs | effect_unknown
```

Une lecture qui trouve le bon fichier ne prouve pas qu’un message, un envoi,
un déploiement ou une autre cible externe n’a pas été touché. Reprenez seulement
si la nouvelle condition, l’idempotence, la preuve attendue et le budget sont
explicitement consignés.

Avant une reprise, complétez cette fiche minimale :

```text
première tentative : commande ou demande exacte
état avant : checkpoint, hash, diff et cible
état après lecture : no_effect_observed | effect_matches | effect_differs | effect_unknown
classe d’idempotence : aucune | idempotente | doublon possible | inconnue
nouvelle condition : ce qui a changé depuis la première tentative
preuve attendue du second essai : artefact distinct et lecture indépendante
budget et arrêt : délai, nombre d’essais et condition d’arrêt
```

Une action dont la classe d’idempotence est `inconnue` ne doit pas être répétée
pour « voir si cela passe ». Si l’état reste `effect_unknown`, livrez cette
incertitude et demandez une décision ciblée ; ne la remplacez pas par le succès
d’un second essai. Le second essai possède toujours son propre `run_id`, sa
propre sortie et sa propre portée.

Pour une reprise autorisée, conservez au minimum :

1. la commande ou la demande exacte de la première tentative ;
2. le checkpoint et la comparaison avant/après ;
3. la classe d’idempotence et le risque d’un doublon ;
4. la lecture indépendante qui a justifié la reprise ; et
5. la preuve propre au second essai, sans la fusionner avec la première ligne.

## 4. Distinguer récupération et complétion

`practice` désigne un exercice, `candidate` une structure prometteuse mais
incomplètement évaluée, `verified` une preuve dans la portée déclarée et
`production-ready` les portes qualité, sécurité, restauration (`rollback`),
maintenance et publication (`release`) passées. `not_observed` décrit un événement non vu ; `not_run` signifie que
l’expérience n’a pas eu lieu ; partial, unverified et blocked décrivent la lacune
la plus étroite soutenue.

Récupérer le contrôle ne fait pas monter le statut de complétion. Interrompre un
processus et préserver un diff peut produire un handoff candidate alors que le
résultat runtime reste unverified.

## 5. Expérience : auditer une affirmation de complétion

### Préparation

Préparez un résumé de fin anonymisé, un diff, une sortie de test, des sources et
une preuve volontairement absente. Aucun service de production ni système
externe ne doit être connecté.

### Tâche

Utilisez le [Lab 003](../labs/lab-003-evidence-review-FR.md) pour créer un tableau
des affirmations. Ajoutez une phrase non étayée comme « tous les tests passent »
et vérifiez que la revue la refuse au lieu de suivre son ton.

### Preuve

Gardez tableau, chemins de preuve, catégorie de lacune, décision de revue et
plan de récupération. Incluez une affirmation de fait, une de runtime et une
d’effet utilisateur.

Utilisez trois lignes au minimum pour rendre la différence visible :

| Type d’affirmation | Exemple | Preuve attendue |
|---|---|---|
| Fait source | « La documentation décrit cette option. » | URL, date, passage et portée relus. |
| Exécution | « Le contrôle a passé dans cette copie. » | Commande, répertoire, code retour et sortie. |
| Effet utilisateur | « La page est utilisable sur mobile. » | Rendu à un viewport nommé, critères et revue humaine. |

Une seule capture, un seul diff ou un seul message de réussite ne peut pas
remplacer les trois preuves.

### Échec intentionnel et limite

Si une phrase n’a aucun contrôle correspondant, baissez-la à `unverified` ou
`not_run`. Pour un exercice plus réaliste, commencez une petite modification
réversible dans une copie jetable, écrivez avant le contrôle une passation disant
« terminé » et « tous les tests passent », puis rendez la sortie absente ou
faites proposer une installation, un redémarrage, un appel réseau ou une écriture
hors périmètre. L’exercice n’est réussi que si l’apprenant :

- marque l’affirmation non étayée `unverified` ou `not_run` ;
- conserve diff partiel, erreur, portée et dernier checkpoint ;
- refuse de déduire le runtime ou l’effet utilisateur du seul diff ;
- choisit un contrôle sûr ou un arrêt net, sans empiler les éditions.

Le tableau n’établit ni une cause fournisseur, ni une reproduction, ni un succès
d’apprentissage.

### Fiche de revue

```text
claim: phrase exacte
scope: fichiers, run, version, viewport ou environnement
evidence: artefact réellement relu
status: verified | partial | unverified | blocked | not_run
uncovered: ce qui reste hors du contrôle
next_check: plus petite observation suivante
reviewer/date: relecture et moment
```

Ce reçu force la différence entre une sortie préparée, une sortie observée et
une affirmation acceptée. Un résumé de fin sans `scope` et `uncovered` invite à
une conclusion plus large que la preuve.

### Réflexion

Quelle phrase avait la preuve la plus faible ? Quelle action avez-vous refusée
de répéter ? Quel contrôle unique aurait changé la décision ? Pourquoi
`unverified` ne signifie-t-il pas « faux » ? Réécrivez une phrase de passation
pour que son statut corresponde à sa preuve.

## Liste de contrôle d’acceptation

- [ ] Chaque phrase importante possède une preuve ou un statut explicite.
- [ ] Interruption, succès, échec et effet inconnu sont séparés.
- [ ] La récupération est petite, réversible et autorisée.
- [ ] L’historique, le checkpoint et les inconnues sont conservés.
- [ ] La conclusion ne dépasse pas la portée du registre.
- [ ] Une chaîne de capacité possède une preuve par maillon.
- [ ] La fiche de point d’arrêt nomme la première transition absente.
- [ ] Un handoff distingue verified, partial, blocked et unverified.
- [ ] Je peux expliquer la différence entre une erreur, une affirmation non
      étayée et un résultat simplement inconnu.
- [ ] Je peux dire pourquoi une récupération ne fait pas monter le statut de
      complétion.
- [ ] Je peux livrer une note contenant travaux terminés, travaux incomplets,
      inconnues, risques, chemins de preuve et prochain contrôle sûr.
- [ ] Je peux conserver `candidate` et `not_run` lorsque l’expérience et sa
      relecture n’ont pas eu lieu.
- [ ] Je peux consigner une reprise comme un nouvel essai, avec son propre
      périmètre, sa preuve et sa limite.

## Transfert

Appliquez le registre à une note de recherche ou à un rapport marketing. Incluez
au moins une affirmation factuelle, une affirmation d’exécution et une affirmation
d’effet utilisateur. Expliquez pourquoi elles ne peuvent pas partager une preuve
faible, puis nommez le plus petit contrôle de suivi pour l’affirmation la moins
soutenue. Pour une revue visuelle, ajoutez viewport, capture, critères et limites
de ce que l’image ne prouve pas.

## Sources et limite de mise à jour

Les méthodes de preuve et le vocabulaire de statut sont stables. Commandes,
entrées, noms de modèles, comportements de fournisseurs et états de tickets sont
volatils. Vérifiez les opérations concrètes dans le [cadre d’évaluation](../../docs/quality/evaluation-framework.md),
la [baseline officielle](../../docs/research/openai-codex-baseline.md) et la
[recherche Web](../../docs/research/web-field-problems-2026-08-10.md).

| Fait ou frontière | Source | Consultée le | Portée | Responsable / prochaine revue |
|---|---|---:|---|---|
| Une interruption de capacité peut laisser l’état d’une tâche dépendante incertain | [FP-09 / issue #33865](../../docs/research/field-problems-codex.md) | 2026-08-09 | Rapport public ; pas de reproduction locale ni de conclusion universelle sur la file | `curriculum-maintainer` / 2026-09-09 |
| Une vérification longue peut laisser l’état de complétion incertain | [FP-10 / issue #34325](../../docs/research/field-problems-codex.md) | 2026-08-09 | Rapport public ; cause et portée de version inconnues | `curriculum-maintainer` / 2026-09-09 |
| Authentification, disponibilité de l’outil, exécution et résultat externe sont des affirmations distinctes | [FP-01—FP-02](../../docs/research/field-problems-codex.md), [WF-08—WF-11](../../docs/research/web-field-problems-2026-08-10.md) | 2026-08-09 / 2026-08-10 | Discipline de preuve pour des symptômes rapportés ; pas un guide officiel de réparation | `curriculum-maintainer` / 2026-09-09 |
| Une vérification ne doit pas s’élargir silencieusement en installation ou changement persistant | [FP-11 / issue #37677](../../docs/research/field-problems-codex.md) | 2026-08-09 | Rapport public ; pas une politique officielle ni une reproduction locale | `curriculum-maintainer` / 2026-09-09 |
| Passation, enregistrement d’outil, permissions et retry peuvent échouer à des étapes différentes | [FUP-01—FUP-05](../../docs/research/field-problems-follow-up-2026-08-10.md) | 2026-08-10 | Rapports publics ; compte, version, fournisseur et runtime local restent déterminants | `curriculum-maintainer` / 2026-09-09 |

Ces sources servent à montrer où la preuve se rompt. Elles ne transforment pas
un ticket, un contournement, un libellé ou une réponse communautaire en garantie
produit.

Continuez avec la [planification et le découpage](10-planning-and-slicing-FR.md).

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="08-full-lifecycle-workflow-FR.md" aria-label="Chapitre précédent: Chapitre 8 · De la définition à la livraison">← Précédent<br><strong>Chapitre 8 · De la définition à la livraison</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="10-planning-and-slicing-FR.md" aria-label="Chapitre suivant: Chapitre 10 · Planification et tranches verticales">Suivant →<br><strong>Chapitre 10 · Planification et tranches verticales</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
