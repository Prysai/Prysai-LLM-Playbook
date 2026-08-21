<!-- content_id: lab-003-evidence-review | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

---
id: lab-003-evidence-review
title: "Auditer une affirmation de fin"
level: L3
domain: general
goal: "Séparer affirmation, preuve directe, inférence et vérification manquante"
setup: "Trois comptes rendus de livraison désinfectés et une grille de correction conservée à part"
task: "Associer chaque affirmation à sa portée, sa preuve et son prochain contrôle"
evidence:
  - "Les trois comptes rendus fixes et la grille de correction"
  - "Une table affirmation-preuve remplie"
  - "Les notes de revue et la liste explicite des inconnues"
failure_variant: "Ajouter « tous les tests passent » sans sortie, date, environnement ni périmètre"
reflection: "Quelle preuve établit l’existence, la correction ou la préparation ?"
status: draft
last_verified: "not run"
transfer_task: "Appliquer la table à une livraison d’ingénierie, de recherche ou de contenu"
transfer_domain: "ingénierie, recherche ou publication"
transfer_evidence: "Conserver les affirmations bornées, preuves, lacunes et notes de revue"
transfer_limitations: "Un audit statique ne prouve pas l’authenticité d’un artefact hors du périmètre inspecté"
---

# Lab 003 : Auditer une affirmation de fin

## Objectif

Décider si un résultat est terminé sans se fier au ton assuré ou à la mise en
forme.

## Préparation

Préparez un compte rendu soutenu par une preuve directe, un compte rendu
partiellement terminé et un compte rendu très soigné sans journal de contrôle.
La revue est en lecture seule.

## Tâche

| Affirmation | Portée | Preuve requise | Preuve trouvée | État | Prochain contrôle |
| --- | --- | --- | --- | --- | --- |
| Exemple | fichier, version, date | diff et contrôle ciblé | chemin ou `none` | vérifié / inféré / bloqué | une action bornée |

Séparez existence, correction dans le périmètre et préparation pour l’usage. Un
diff prouve un changement ; il ne prouve pas que le changement est correct.

## Échec et limite

Ajoutez « tous les tests passent » sans sortie de commande. Réduisez la portée
ou demandez la preuve. Faites ensuite la même chose avec « fonctionne sur tous
les appareils » soutenu par un seul navigateur.

## Réflexion

Quelle affirmation a perdu de la force quand sa portée a été écrite ?

## Transfert

Réutilisez la table pour un rapport de recherche ou une page publiée.

## Liste de contrôle d’acceptation

- [ ] Chaque affirmation importante a une portée.
- [ ] Preuve directe et inférence sont séparées.
- [ ] Les affirmations non soutenues ne sont pas vérifiées.
- [ ] Le prochain contrôle est plus petit qu’un rerun complet.
- [ ] Les éléments non vérifiés figurent dans la transmission.

## Sources et limite de mise à jour

**Statut :** `draft` · **Exécution :** `not_run`. Aucun log privé ni résultat de
production n’est requis. Cette traduction attend une relecture indépendante.

<!-- lab-navigation:start --><hr><nav class="lab-navigation" aria-label="Navigation des Labs"><table role="presentation" width="100%"><tr><td align="left"></td><td align="right"></td></tr></table></nav><!-- lab-navigation:end -->
