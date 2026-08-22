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

## Critères d'acceptation

- [ ] Les deux workflows ont utilisé les mêmes tâches gelées et la base restaurée.
- [ ] Les six premières tentatives et les reprises restent séparément inspectables.
- [ ] Premier passage, durée, reprises, catégorie d'erreur et validation utilisent des valeurs réelles ou `unavailable`.
- [ ] Une branche d'échec conserve la réconciliation ou `not_comparable` honnêtement.
- [ ] Une construction réussie n'est pas présentée comme une preuve de runtime, de déploiement ou d'acceptation.
- [ ] La conclusion reste dans le périmètre du test de trois tâches.

## Réflexion et transfert

Quel stade a détecté le premier problème important ? Quel stade a ajouté de la
cerémonie sans changer le résultat ? Transférez seulement les contrôles utiles à
une autre tâche réversible et expliquez pourquoi elle est, ou non, comparable.

## Sources et limite de mise à jour

**Statut :** `draft` · **Exécution :** `not_run`. Aucun déploiement ni classement
de modèle n'est établi. Les données manquantes restent `unavailable` plutôt que
déduites.

Pour les tâches et les contrôles, utilisez les contrats de [planification et
découpage](../chapters/10-planning-and-slicing-FR.md) et de [boucle et arrêt](../chapters/12-agent-loop-and-stop-FR.md).

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
