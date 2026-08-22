<!-- content_id: lab-007-action-boundaries | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->
---
id: lab-007-action-boundaries
title: "Placer une tâche README derrière trois frontières d’action"
level: L3
domain: general
goal: "Séparer observation, autorisation, édition et publication"
setup: "Une tâche README désinfectée et trois copies locales"
task: "Comparer copie ordinaire, worktree isolé et dossier organisationnel simulé"
evidence:
  - "Les cartes de surface et d’autorité"
  - "Le diff local et le contrôle"
  - "La décision de ne pas publier"
failure_variant: "Confondre connexion, accès et permission de pousser"
reflection: "Quelle frontière était la plus facile à cacher ?"
status: draft
last_verified: "not run"
transfer_task: "Appliquer la matrice à une préparation de publication"
transfer_domain: "ingénierie, contenu, recherche ou release"
transfer_evidence: "Cible, autorité, effet, contrôle et rollback"
transfer_limitations: "La simulation ne prouve aucun accès GitHub réel"
---

# Lab 007 : Trois frontières pour une même tâche

## Objectif

Le but est de séparer observation, autorisation, édition et publication.

## Préparation

Préparez trois dossiers qui représentent une copie locale, un worktree et une
surface organisationnelle. N’utilisez aucun token.

## Tâche

Pour chaque surface, observez d’abord, modifiez seulement le README autorisé,
relisez le diff et classez l’effet : lecture, écriture locale ou publication.

## Preuve

Conservez la cible, la permission déclarée, l’état avant et après, le contrôle et
les actions non faites.

## Échec et limite

Un bouton visible ou une session connectée ne prouve pas l’autorité de publier.
Marquez l’action externe `blocked`.

## Réflexion

Quelle surface rendait le retour arrière le plus clair ?

## Transfert

Transférez la carte à une révision documentaire.

## Liste de contrôle d’acceptation

- [ ] Les trois surfaces sont nommées.
- [ ] Le diff reste dans le périmètre.
- [ ] L’effet externe n’est pas inféré.
- [ ] Le rollback et le propriétaire sont écrits.

## Sources et limite de mise à jour

**Statut :** `draft` · **Exécution :** `not_run`. Aucune publication réelle.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navigation entre les Labs"><table role="presentation" width="100%"><tr>
<td align="left"><a data-lab-nav="previous" href="lab-006-agent-stop-conditions-FR.md" aria-label="Lab précédent : Lab 006 · Concevoir les conditions d’arrêt d’un agent">← Précédent<br><strong>Lab 006 · Concevoir les conditions d’arrêt d’un agent</strong></a></td>
<td align="right"><a data-lab-nav="next" href="lab-008-research-question-FR.md" aria-label="Lab suivant : Lab 008 · Transformer un sujet en question de recherche vérifiable">Suivant →<br><strong>Lab 008 · Transformer un sujet en question de recherche vérifiable</strong></a></td>
</tr></table></nav>
<!-- lab-navigation:end -->
