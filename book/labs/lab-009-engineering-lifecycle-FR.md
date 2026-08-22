<!-- content_id: lab-009-engineering-lifecycle | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->
---
id: lab-009-engineering-lifecycle
title: "Comparer une implémentation directe et un cycle complet"
level: L3
domain: engineering
goal: "Mesurer, dans un cadre étroit, si la définition, le plan, la vérification, la revue et la livraison réduisent les reprises sans prétendre établir une supériorité générale"
setup: "Un dépôt local temporaire avec une base versionnée, trois tâches sans risque, des outils et des permissions fixes, sans état de production ni effet externe"
task: "Exécuter les mêmes tâches selon un parcours direct puis un cycle complet, conserver la première tentative et classer toute dérive de conditions"
evidence:
  - "Les fixtures gelées, hachages d'entrée, révision de base, environnement, outils, permissions et ordre des six exécutions"
  - "Les sorties brutes, diffs, contrôles, horodatages, statut au premier passage, reprises, durée observée et catégorie d'erreur"
  - "Une comparaison 2 × 3 qui marque les exécutions ayant dérivé comme `not_comparable` et nomme le contrôle le plus utile"
failure_variant: "Introduire un délai dépassé, un blocage de permission, une entrée ou version d'outil différente, ou un effet local inconnu, puis le réconcilier sans réécrire la première tentative"
reflection: "Quelle définition ou quel contrôle a évité une reprise ? Quelle comparaison est invalide ? Les preuves justifient-elles une évaluation plus large ?"
status: draft
last_verified: "not run"
transfer_task: "Appliquer le cycle à une transformation de données réversible"
transfer_domain: "ingénierie, données ou automatisation"
transfer_evidence: "Plans, diff, contrôles, limites et rollback"
transfer_limitations: "Trois petites tâches ne permettent pas d'établir un coût, une qualité ou un classement de modèles général ; un contrôle local ne prouve ni le déploiement ni l'acceptation par les utilisateurs"
---

# Lab 009 : Comparer deux cycles d’ingénierie

## Objectif d'apprentissage

Testez une affirmation étroite : dans une même configuration, un cycle explicite
améliore-t-il les preuves ou réduit-il les reprises sur trois tâches fixes ? Ce
Lab est un test de fumée d'ingénierie, pas un classement de modèles.

## Préparation et gel des conditions

Créez un dépôt temporaire avec une base versionnée. Préparez trois tâches
inoffensives et leurs contrôles d'acceptation, puis fixez avant de commencer la
révision, l'environnement, le modèle, les outils, les permissions, la condition
réseau, le budget de temps et l'ordre des essais. Restaurez la base avant chaque
tâche. Si le modèle change, gardez le workflow constant ; si le workflow change,
gardez le modèle constant. Notez le biais éventuel lié à l'ordre.

Le parcours A reçoit le but, l'entrée et l'acceptation. Le parcours B applique
`définir`, `planifier`, `construire`, `vérifier`, `relire`, `livrer`. Aucun parcours
ne publie, ne pousse, n'installe de dépendance ou ne touche un service externe.

## Contrat de comparaison

Écrivez la comparaison avant de lancer les essais. Une seule mesure ne suffit
pas : une durée plus courte peut cacher davantage de reprises, et une sortie
qui semble correcte peut avoir été vérifiée avec une condition différente.

| Dimension | À geler avant l'essai | Observation attendue |
|---|---|---|
| Entrée | fixture, hachage et révision de base | la même entrée revient avant chaque tâche |
| Capacité | modèle, outils, versions, surface et permissions | les deux parcours peuvent observer la même surface |
| Action | étapes autorisées et budget de reprise | aucune installation ni action externe |
| Résultat | critère d'acceptation et format de sortie | diff, contrôle et état de première tentative |
| Comparabilité | condition qui invalide un run | `not_comparable` plutôt qu'une moyenne forcée |

La question testée est limitée : « dans ces trois fixtures et ces conditions,
quels contrôles ont changé la première tentative ou la qualité de la preuve ? »
Elle ne devient pas « le cycle complet est toujours meilleur ».

## Chaîne observable et points de rupture

Pour chaque run, notez l'événement visible et le point où la chaîne pourrait se
rompre :

| Étape | Signal à conserver | Point de rupture à rechercher |
|---|---|---|
| Définir | but, entrée et acceptation réécrits | but vague ou critère ajouté après coup |
| Planifier | étapes, risques et contrôle choisi | étape sans preuve ou dépendance cachée |
| Construire | diff et journal d'action | chemin inattendu ou affirmation inventée |
| Vérifier | commande, sortie brute et code | contrôle non exécuté ou résultat ambigu |
| Relire | remarque indépendante et décision | relecture qui ne voit que la sortie finale |
| Livrer | résumé, inconnues et prochaine action | livraison locale présentée comme publication |

Ajoutez une ligne de temps append-only pour ne pas reconstruire l'histoire à
partir du résultat final :

```text
timestamp | run_id | étape | observation | action | résultat | état | preuve | suite
```

Une ligne ne doit pas être réécrite après une reprise. Ajoutez un nouvel
événement qui explique la correction et son diagnostic.

## Tâche et expérience

Utilisez trois fixtures sans danger :

1. extraire trois champs nommés d'un court relevé de livraison synthétique ;
2. rendre ce relevé en Markdown en séparant le travail terminé de ce qui reste
   non vérifié ;
3. examiner l'affirmation « le code existe et se construit, donc la fonction
   est vérifiée ».

Exécutez A puis B selon l'ordre gelé. Autorisez au plus une reprise contrôlée par
exécution, mais conservez toujours le premier résultat. Une réussite après
reprise n'est pas une réussite au premier passage.

## Registre d'exécution et preuves

Conservez les six tentatives initiales, les éventuelles reprises, les diffs, les
commandes, les codes de sortie, les contrôles, la revue, la livraison et les
éléments non vérifiés. Remplissez une ligne par exécution :

```yaml
run_id: lab-009-fr-A-extract-01
attempt_id: initial
candidate: A
task_id: extract-01
baseline_revision: actual-revision
input_hash: sha256:actual-hash
surface: actual-surface-and-version
model: actual-model-or-unavailable
workflow: direct
tool_versions: actual-values
permissions: disposable-local-repository
network: offline
started_at: actual-timestamp
ended_at: actual-timestamp
first_pass: true
rework_count: 0
elapsed: actual-duration-or-unavailable
cost_value: actual-value-or-unavailable
cost_basis: actual-basis-or-unavailable
error_category: none
comparability: comparable
validation: command-output-and-exit-code
status: pass
```

N'estimez jamais une durée ou un coût manquant : utilisez `unavailable`. Ajoutez
un tableau 2 × 3 avec premier passage, durée observée, reprises, erreur,
validation et comparabilité. Concluez seulement `expand`, `do_not_expand` ou
`insufficient_evidence` pour ce test de fumée.

Ajoutez ensuite une table affirmation-preuve :

| Affirmation | Preuve attendue | État possible |
|---|---|---|
| les six essais sont comparables | fixtures, hachages et conditions identiques | `verified` ou `not_comparable` |
| le premier passage a réussi | artefact initial et contrôle correspondant | `verified`, jamais déduit d'une reprise |
| une reprise a réduit le risque | diagnostic changé, diff de reprise et nouveau contrôle | `verified` ou `unverified` |
| le cycle mérite une évaluation plus large | résultat cohérent et limites écrites | `expand`, `do_not_expand` ou `insufficient_evidence` |

Le statut `observed` signifie seulement « vu dans le registre ». `verified`
ajoute la preuve prévue. `unavailable` signifie que la valeur n'a pas été
mesurée ; il ne faut ni l'estimer ni la remplacer par une valeur moyenne.

## Échec, réconciliation et limites

Faites dériver une exécution : dépassement du délai, permission refusée,
hachage d'entrée différent, version d'outil différente ou résultat d'écriture
local inconnu. Conservez le dernier événement confirmé, inspectez la cible avant
de relancer et marquez la comparaison `not_comparable` dès qu'une condition
gelée a changé. Une réussite ultérieure ne répare pas rétroactivement la
comparabilité.

Ne modifiez jamais l'artefact initial pour rendre le tableau plus favorable. Les
trois tâches restent un échantillon minuscule ; aucune conclusion universelle de
productivité, de qualité ou de modèle n'est permise.

### Récupération bornée

Après un incident, appliquez cette séquence une seule fois :

1. arrêter l'action et conserver la dernière sortie confirmée ;
2. inspecter l'artefact et comparer son hachage à la base attendue ;
3. classer le symptôme (entrée, permission, outil, délai ou effet inconnu) ;
4. changer une seule condition de diagnostic et écrire l'hypothèse ;
5. reprendre dans la même copie seulement si l'état est compris, sinon marquer
   le run `blocked` ou `not_comparable` ;
6. enregistrer séparément le résultat de la reprise et ce qui reste inconnu.

Un même échec répété sans hypothèse nouvelle n'est pas une reprise contrôlée.
Une capacité technique visible ne prouve ni l'autorisation de l'utiliser ni
l'effet produit.

## Critères d'acceptation

- [ ] Les deux workflows ont utilisé les mêmes tâches gelées et la base restaurée.
- [ ] Les six premières tentatives et les reprises restent séparément inspectables.
- [ ] Premier passage, durée, reprises, catégorie d'erreur et validation utilisent des valeurs réelles ou `unavailable`.
- [ ] Une branche d'échec conserve la réconciliation ou `not_comparable` honnêtement.
- [ ] Une construction réussie n'est pas présentée comme une preuve de runtime, de déploiement ou d'acceptation.
- [ ] La conclusion reste dans le périmètre du test de trois tâches.
- [ ] Les conditions d'entrée, de capacité, d'action et de résultat sont gelées.
- [ ] Chaque étape de la chaîne possède un signal observable et un point de rupture.
- [ ] La table affirmation-preuve sépare `observed`, `verified`, `unavailable` et `not_comparable`.
- [ ] Toute reprise change explicitement le diagnostic et conserve la sortie précédente.
- [ ] Une capacité, une permission et un effet réellement observé ne sont pas confondus.
- [ ] Le résultat est borné aux trois fixtures ; aucune efficacité générale n'est annoncée.

## Réflexion et transfert

Quel stade a détecté le premier problème important ? Quel stade a ajouté de la
cérémonie sans changer le résultat ? Transférez seulement les contrôles utiles à
une autre tâche réversible et expliquez pourquoi elle est, ou non, comparable.

Pour le transfert, remplacez les fixtures et la preuve, mais gardez la même
chaîne : entrée gelée, action bornée, contrôle observable, incident, reprise et
limitation. Un transfert réussi demande une nouvelle table de comparabilité ;
il ne permet pas de réutiliser les temps ou les conclusions du présent Lab.

## Sources et limite de mise à jour

**Statut :** `draft` · **Exécution :** `not_run`. Aucun déploiement ni classement
de modèle n'est établi. Les données manquantes restent `unavailable` plutôt que
déduites.

Pour les tâches et les contrôles, utilisez les contrats de [planification et
découpage](../chapters/10-planning-and-slicing-FR.md) et de [boucle et arrêt](../chapters/12-agent-loop-and-stop-FR.md).

Les états et les preuves de ce Lab sont des choix méthodologiques du projet,
pas des valeurs par défaut d'un fournisseur. Le Lab reste `draft / not_run`
jusqu'à ce que les six runs, une branche d'échec et une revue indépendante
soient réellement conservés.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navigation entre les Labs">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-008-research-question-FR.md" aria-label="Lab précédent : Lab 008 · Formuler une question de recherche vérifiable">← Précédent<br><strong>Lab 008 · Formuler une question de recherche vérifiable</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-010-product-context-FR.md" aria-label="Lab suivant : Lab 010 · Construire un contexte produit partagé">Suivant →<br><strong>Lab 010 · Construire un contexte produit partagé</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
