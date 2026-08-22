<!-- content_id: chapter-16-engineering-track | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-22-fr-engineering-restoration -->

# Chapitre 16 : Ingénierie, de l’idée au logiciel fiable

**Statut :** `candidate` · **Expérience :** `not_run`

Ce chapitre enseigne un cycle d’ingénierie portant des preuves. Les rapports de
terrain sont des signalements ou des analyses, pas des reproductions locales ni
des causes confirmées pour toutes les versions.

## Le problème que résout ce chapitre

Un Agent peut commencer à coder avant que les exigences, les erreurs possibles,
le runtime, le test et le rollback soient définis. Un patch peut compiler et les
tests unitaires passer alors que le parcours utilisateur échoue, que les versions
de dépendances divergent ou que la livraison n’est pas récupérable.

Le cycle ici est :

```text
problème → spécification → plan et tranches → implémentation incrémentale
→ contrôles/tests → runtime → revue → release/rollback → maintenance
```

Chaque étape a une condition d’entrée, une plus petite sortie attendue, un échec
et une condition d’arrêt. Diagnostiquez avant d’ajouter du code ou d’élargir les
permissions.

## Objectifs d’apprentissage

Vous devriez pouvoir :

- écrire périmètre, entrées, sorties, risques et arrêts d’une tâche ;
- vérifier les affirmations de framework/API avec une source officielle ou le
  code courant ;
- implémenter une tranche petite et réversible ;
- distinguer build, tests, runtime, rendu visuel, acceptation utilisateur et
  préparation de production ;
- conserver commandes, codes, logs, diff, environnement et rollback ;
- reconnaître timeout, état de worktree inconnu, secret réel et remplacement
  persistant d’environnement comme des raisons d’arrêter.

## Entrée du problème réel : changer du code ne livre pas le résultat

Les rapports `FP-09`, `FP-10` et `FP-11` décrivent respectivement une interruption
de capacité, une commande Windows restée en `Working` et une vérification qui a
dérivé vers une réinstallation persistante. Ils servent à formuler les contrôles,
pas à diagnostiquer tous les comptes.

| Signal | Ce qu’il soutient | Première réponse sûre |
|---|---|---|
| Erreur de capacité au milieu d’une tâche | Un run a été interrompu dans un état partiel | Geler, relire diff, logs, tests et dernier checkpoint |
| Commande sans sortie claire | Aucun signal de fin n’est observé dans ce run | Fixer délai et sortie attendue ; interrompre selon la règle |
| Vérification qui propose une réinstallation forcée | Une frontière persistante a été franchie dans la proposition | Séparer source, test, installation, restart, déploiement et contrôle en ligne |

Consultez les détails dans [`field-problems-codex.md`](../../docs/research/field-problems-codex.md)
et marquez les causes non reproduites `unknown`.

## 1. Le cycle d’ingénierie et ses sorties

| Étape | Condition d’entrée | Preuve minimale de sortie |
|---|---|---|
| Problème | Besoin utilisateur ou système et périmètre | Formulation répétable par une autre personne |
| Spécification | Entrées, sorties, erreurs et limites connues | Critères d’acceptation et hors objectif |
| Planification | Dépendances et risques listés | Tranches vérifiables indépendamment |
| Implémentation | Baseline et tranche courante confirmées | Diff petit et explicable, registre de changement |
| Tests | Comportement et échecs exerçables | Commandes, résultats et lecture des échecs |
| Runtime | Environnement démarrable et données représentatives | Version, logs, réponse ou écran et environnement |
| Release | Revue et retour arrière disponibles | Note de release, monitoring et rollback exercé |

Une sortie de test ne remplace pas la sortie runtime, et une capture ne remplace
pas un contrôle d’accessibilité, de sécurité ou d’acceptation.

## 2. Spécifier avant d’implémenter

Une bonne demande indique action utilisateur, contraintes d’entrée, sortie de
succès, sortie d’erreur, cas limite, hors objectif, contraintes de performance et
de sécurité, signaux observables et méthode d’acceptation.

Pour « ajouter un export », précisez format, plage de données, permission,
comportement d’un fichier partiel, politique d’écrasement et contrôle final. Un
Skill ne doit pas remplacer une décision par une valeur par défaut silencieuse.

```text
Résultat utilisateur :
Entrées et limites :
Sortie de succès :
Sortie d’erreur et cas vide :
Hors objectif :
Risques / secrets / effets externes :
Contrôle d’acceptation :
Condition d’arrêt et rollback :
```

## 3. Source, doute, incrément

- **Source d’abord :** pour framework, API, bibliothèque ou version, partez de
  la documentation officielle, des types, du code courant ou d’un résultat
  reproductible. Un blog ou la mémoire du modèle sont des pistes.
- **Doute ciblé :** vérifiez les affirmations que types et tests unitaires ne
  prouvent pas : réseau, base, navigateur, permission, concurrence, fuseau et
  déploiement.
- **Incrément :** une tranche explicable à la fois, diff et point de retour
  conservés. N’empilez pas les correctifs sur un échec inconnu.

## 4. Le runtime a son propre niveau de preuve

| Preuve | Elle établit | Elle n’établit pas |
|---|---|---|
| Build réussi | Le code se construit ici | Le parcours réel ou la sécurité |
| Tests unitaires verts | Des assertions ciblées passent | Le navigateur, le réseau ou la production |
| Test d’intégration | Des composants coopèrent dans l’environnement déclaré | Tous les comptes et toutes les données |
| Observation runtime | Une entrée produit une sortie dans un environnement nommé | La stabilité générale ou la demande utilisateur |
| Acceptation utilisateur | Un groupe défini accepte la tâche et le périmètre | La sécurité ou chaque future version |
| Production-ready | Portes sécurité, performance, migration, monitoring, rollback et acceptation passées | Un environnement non testé |

Pour le runtime, notez commande de démarrage, versions, variables de test, entrée,
réponse ou écran, logs et chemin d’erreur. Ces catégories ne peuvent pas se
remplacer.

## 5. Arrêts et frontières d’autorité

Arrêtez-vous en cas de sortie absente au-delà du délai, dépendance de test
indisponible, changement inconnu du worktree, credential réel, modification
persistante, demande de publier, déployer ou redémarrer. Si la validation exige
une installation ou un remplacement de runtime, obtenez l’autorisation, notez
cible, impact et rollback ; sinon utilisez un sandbox, un compte de test ou un
contrôle statique.

## 6. Le web est une boucle visible, pas un prompt unique

« Construis un site » cache plusieurs travaux : public et résultat, fichier
source, runtime local, vraie observation navigateur et décision de partage.
Un HTML généré n’est pas la preuve du bon contenu, du viewport mobile, du clavier
ou de la publication.

Pour une première pratique, gardez une page statique avec un titre, une phrase et
un statut. Une demande sûre peut être :

```text
Objectif : modifier une phrase visible sur la page statique.
Lire d’abord : index.html, styles.css et la commande locale documentée.
Autorisé : index.html seulement ; garder structure et styles.
Interdit : installer, ajouter framework/image, réseau, secrets, commit, push, publier.
Acceptation : la nouvelle phrase apparaît une fois dans le navigateur, l’ancienne
disparaît, titre et heading restent, un seul fichier est dans le diff.
Arrêt : cible, commande ou observation navigateur incertaine.
```

Le navigateur est une preuve additionnelle : il révèle chemin relatif cassé,
CSS absent, cache, erreur console ou débordement mobile qu’un diff ne montre pas.
Une page locale qui passe reste un résultat `candidate`, pas un site déployé.

## 7. Le retour visuel est une spécification complémentaire

Une capture ou une région pointée doit préciser :

```text
Cible : région, état et viewport exacts
Changement : une différence observable
Préserver : contenu, comportement, ordre de focus et chemins
Contrôle : observation rendue et vérification du diff
```

« Rends l’en-tête meilleur » est trop vague. « À 390 px, placer la recherche
sous le titre, sans changer liens ni focus, puis vérifier largeur et diff d’un
fichier » est contrôlable.

Une prévisualisation peut différer du runtime cible (cookies, origine, fonts,
assets, réseau, permission, viewport). Séparez : défaut source/client ou
conditions de prévisualisation ? Lisez console et réseau autorisés, reproduisez
la plus petite interaction dans un navigateur local indépendant, puis changez une
seule condition.

## 8. Parcours d’apprentissage de la programmation avec un LLM

| Niveau | Pratique | Preuve minimale avant d’avancer |
|---|---|---|
| 1. Lire | Expliquer une fonction ou page existante | Reformuler entrées, sortie et une limite |
| 2. Changer | Éditer un fichier dans un projet jetable | Diff limité et résultat observable |
| 3. Tester | Ajouter ou exécuter un contrôle avec échec | Dire ce que le contrôle prouve et ignore |
| 4. Découper | Livrer une tranche du contrat au runtime | Cas normal et vide/invalide consignés |
| 5. Récupérer | Reprendre après interruption | Checkpoint relu avant toute suite |
| 6. Collaborer | Règles, isolation, revue et handoff | Une autre personne reproduit la décision |

Un texte généré aide à apprendre ; il ne prouve pas que vous pouvez diagnostiquer,
maintenir ou livrer sans aide. Conservez votre essai initial, l’aide utilisée,
les fichiers changés, les contrôles, un échec et le prochain exercice.

## Expérience observable : direct contre cycle complet

### Préparation

Dans une copie jetable, choisissez une tâche sans réseau : dédupliquer une liste
locale et écrire JSON. Préparez entrées normale, vide, dupliquée et invalide.
Fixez version runtime, délai court et dossier de sortie ; n’utilisez aucune clé.

### Tâche

1. **Direct :** donnez seulement l’objectif ; consignez spécification, fichiers,
   commandes et gestion des entrées invalides.
2. **Cycle complet :** demandez d’abord problème, acceptation, hors objectif,
   tranches et matrice de tests ; implémentez progressivement et relisez le diff.
3. Lancez dans les deux cas contrôles statiques, tests, exécution locale, entrée
   vide et entrée invalide.
4. Simulez une interruption : arrêtez, relisez worktree, diff, logs et tests,
   puis choisissez continuer, rollback ou nouveau checkpoint.

Ne forcez pas réinstallation, production, déploiement ou redémarrage. Toute
proposition de ce type reste hors autorité et doit être enregistrée.

### Preuve

Gardez contrats, diffs, matrice de tests, commandes et codes, entrées/sorties
runtime, logs, point de découverte de chaque problème, rollback et acceptation.
Séparez au moins : build réussi, tests passés, runtime correct et acceptation.

### Échec et limite

Faites entrer le formateur dans une longue absence de sortie ou rendez une
dépendance inexistante. Arrêtez, reprenez le contrôle, inspectez état et processus
et classez la validation incomplète. Ne concluez pas succès après avoir attendu,
et ne remplacez pas l’environnement. Si une nouvelle demande arrive sur un état
partiel, créez d’abord un checkpoint.

### Réflexion

Quelle preuve le cycle complet a-t-il conservée ? Quelle observation runtime ne
peut pas être remplacée par un test unitaire ? Quand rollback plutôt que continuer
le diagnostic ? Quelle autorisation nouvelle exigerait une installation persistante ?

## Échecs et frontières

- Des tests verts peuvent ignorer service réel, navigateur, permission ou mobile.
- Un build réussi avec runtime en échec exige inspection du démarrage, variables,
  versions, assets, routes, migrations et logs ; ne dites pas « runtime vérifié ».
- Une commande suspendue demande délai, sortie attendue, interruption et relecture
  du worktree après arrêt.
- Après FP-09, relisez diff et point de complétion ; une continuation ne connaît
  pas forcément l’état actuel.
- Après FP-11, séparez `source modified`, `validated`, `installed`, `published`,
  `deployed`, `restarted` et `live verified`.
- Une dépendance externe inaccessible reste `unverified` ; utilisez un double ou
  un sandbox, sans appeler l’externe la preuve.
- Sans artefact récupérable, sauvegarde de base, migration inverse ou snapshot de
  configuration, une release de production s’arrête à `candidate`.

## Transfert

Réécrivez une tâche d’ingénierie en contrat d’une page : problème, périmètre,
acceptation, exclusions, permissions, risques, tranches, matrice de tests,
runtime et rollback. Ajoutez contrôles normal, vide, invalide, timeout et
permission insuffisante ; demandez au modèle une première tranche seulement ;
faites une observation locale ; puis demandez à un reviewer de classer les preuves
`draft`, `candidate`, `verified` ou `production-ready`.

## Liste de contrôle d’acceptation

- [ ] Périmètre, entrées/sorties, conditions d’entrée/sortie et arrêts sont écrits.
- [ ] Les tranches sont incrémentales et récupérables.
- [ ] Je distingue build, tests, runtime, acceptation et production-ready.
- [ ] Les affirmations importantes viennent d’une source officielle ou d’un résultat courant.
- [ ] Les cas normal, frontière, échec, permission et timeout sont couverts.
- [ ] Diff, commandes, codes, logs, environnement et sorties sont conservés.
- [ ] Je peux expliquer la récupération et la frontière d’autorité des rapports FP-09/10/11.
- [ ] Je n’ai pas installé, forcé une réinstallation, publié, déployé ou redémarré sans autorisation.

## Sources et limite de mise à jour

- **Problèmes de terrain :** [`field-problems-codex.md`](../../docs/research/field-problems-codex.md), FP-09, FP-10 et FP-11 ; statut `candidate`, pas de reproduction locale.
- **Méthode et assets :** [`asset-register.md`](../../docs/sources/asset-register.md), S05 ; ce chapitre est une réécriture originale.
- **Faits volatils :** documentation officielle du framework ou de l’API et [dépôt OpenAI Codex](https://github.com/openai/codex) ; noter URL, version, date et portée.

Le propriétaire de mise à jour est le mainteneur de la piste Ingénierie. Revoir
après changement de runtime, dépendances, release ou permissions, et au plus tard
le 2026-11-09. Cette traduction reste `in-progress / candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="15-research-track-FR.md" aria-label="Chapitre précédent : Chapitre 15 · Recherche vérifiable">← Précédent<br><strong>Chapitre 15 · Recherche vérifiable</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="17-marketing-track-FR.md" aria-label="Chapitre suivant : Chapitre 17 · Marketing et expériences">Suivant →<br><strong>Chapitre 17 · Marketing et expériences</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
