<!-- content_id: lab-014-resume-reconciliation | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->
---
id: lab-014-resume-reconciliation
title: "Réconcilier une tâche avant de la reprendre"
level: L3
domain: general
goal: "Comparer le pointeur, la cible, les permissions et les effets avant de continuer"
setup: "Un répertoire temporaire ou un dépôt local avec un checkpoint et deux fichiers"
task: "Observer l’état vivant, le comparer au checkpoint, classer chaque champ et décider de continuer ou de s’arrêter"
evidence:
  - "Le checkpoint précédent et les observations actuelles"
  - "La table des champs avec leur statut et leur preuve"
  - "La décision de continuer ou de s’arrêter, avec le prochain contrôle"
failure_variant: "Faire correspondre le nom de tâche mais pas la racine du dépôt, ou ignorer une action distante inconnue"
reflection: "Quelle supposition semblait raisonnable avant l’observation, et quel fait a changé la décision ?"
status: draft
last_verified: "not run"
transfer_task: "Appliquer la même enveloppe à une session navigateur ou MCP sans effectuer d’écriture distante"
transfer_domain: "navigation, recherche, ingénierie ou contenu"
transfer_evidence: "Dernière demande confirmée, cible, autorité, risque d’effet distant et nouveau checkpoint"
transfer_limitations: "Le jeu de test local ne prouve pas la continuité d’un compte réel, d’une ressource distante ou d’une tâche de production"
---

# Lab 014 : Reprendre sans supposer

**Statut :** `draft` · **Exécution :** `not_run`

## Objectif

Après une interruption, un résumé ou un changement de contexte, l’interface peut
sembler active alors que le chemin, la cible ou les effets précédents restent
incertains. Le but de ce Lab est de comparer l’état vivant au dernier checkpoint
confirmé avant de poursuivre. Reprendre une conversation n’est pas une preuve de
continuité.

## Préparation

Travaillez dans un répertoire temporaire contenant deux fichiers texte sans
données sensibles. Notez d’abord le chemin absolu, la racine du dépôt, la
branche, le fichier cible, la baseline, les permissions et les actions
interdites. Créez ensuite un checkpoint, modifiez un fichier, puis simulez une
interruption en remplaçant le checkpoint par une copie plus ancienne ou en
ouvrant un second répertoire. N’utilisez ni identifiant, ni réseau, ni fichier
de production, ni commande irréversible.

Le checkpoint doit être lisible par une autre personne :

```text
checkpoint_id:
goal:
surface_and_root:
target:
branch:
baseline_hash_or_mtime:
last_confirmed_action:
pending_action:
permission_and_side_effect_state:
evidence_paths:
created_at:
```

## Tâche

Observez d’abord l’état actuel sans modifier le répertoire. Comparez les
champs suivants au checkpoint et joignez une observation vérifiable à chaque
ligne :

| Champ | Observation actuelle | Statut | Preuve conservée | Décision si `changed` ou `not_observed` |
|---|---|---|---|---|
| objectif et tâche |  | `matched` / `changed` / `not_observed` |  | arrêter et reformuler |
| surface et racine |  |  | chemin absolu | ne pas écrire |
| fichier cible |  |  | chemin et hash/mtime | ne pas deviner |
| branche et baseline |  |  | `git status`, hash ou mtime | créer un nouveau checkpoint |
| permission |  |  | contrat ou décision | demander une autorisation précise |
| effets précédents |  |  | journal, diff, lecture distante | considérer l’état comme inconnu |

Un champ critique `changed` ou `not_observed` interdit de continuer. Créez un
nouveau checkpoint, nommez la plus petite sonde de lecture autorisée et arrêtez-
vous. Ne remplacez jamais `not_observed` par « probablement identique ».

Pour une décision de continuation, écrivez une phrase bornée :

```text
continue_decision: continue | stop
reason:
critical_fields:
smallest_next_check:
stop_condition:
```

## Preuve

Conservez l’ancien checkpoint, les commandes ou observations, le statut du
répertoire, le diff, la table de comparaison et la décision. Pour chaque ligne,
indiquez le chemin de la sortie ou `not_observed`. Une observation distante
absente reste explicitement inconnue ; un nouveau prompt ou un résumé ne la
réécrit pas.

## Variantes d’échec et récupération

Réalisez au moins une variante :

1. le nom de la tâche correspond, mais la racine ou le fichier cible diffère ;
2. le diff est déjà non vide alors que le checkpoint indique une copie propre ;
3. une action distante précédente est possible mais aucune lecture indépendante
   ne la confirme ;
4. tous les champs concordent et la continuation bornée est autorisée.

Dans les trois premiers cas, arrêtez avant l’édition et identifiez le premier
champ non réconcilié. Dans le dernier cas, réalisez une seule action locale,
créez un checkpoint mis à jour et vérifiez à nouveau le périmètre. La bonne
réponse peut donc être un arrêt propre, pas une réparation.

La fixture ne prouve pas la continuité d’une session, d’un compte réel, d’une
ressource distante ou d’une tâche de production. Elle teste uniquement la
procédure de comparaison dans ce répertoire.

## Réflexion

Quel champ était le plus facile à supposer ? Quelle observation a empêché une
édition ou une reprise injustifiée ? Qu’est-ce qui reste `not_observed` ?

## Transfert

Appliquez l’enveloppe à un navigateur ou à un serveur MCP sans action externe :
identifiez la dernière demande confirmée, la ressource exacte, l’identité et
l’autorisation, le risque qu’un appel précédent ait changé l’état distant, puis
conservez un nouveau checkpoint. Une page visible ne prouve pas qu’un formulaire
a été envoyé ; une configuration visible ne prouve pas qu’un appel est
exécutable.

## Liste de contrôle d’acceptation

- [ ] J’ai capturé le chemin, la racine, la branche, la cible et le diff réels.
- [ ] J’ai comparé chaque champ à un checkpoint nommé.
- [ ] J’ai distingué `matched`, `changed` et `not_observed`.
- [ ] Toute inconnue critique provoque un arrêt ou une sonde bornée.
- [ ] La décision de continuer nomme la permission et l’effet autorisé.
- [ ] Un nouveau checkpoint est conservé après une action locale.
- [ ] Je n’ai pas traité un résumé ou une reprise de prompt comme une preuve.
- [ ] La transmission indique les travaux faits, les inconnues et le prochain contrôle.

## Sources et limite de mise à jour

- [Problèmes de terrain et modèles de prompts — P2](../../docs/research/field-problems-and-prompt-patterns-p2-2026-08-11.md), FP2-01 à FP2-04 et FP2-08.
- [Chapitre 10 : planification et découpage](../chapters/10-planning-and-slicing-FR.md).
- [Chapitre 12 : boucle d’Agent et conditions d’arrêt](../chapters/12-agent-loop-and-stop-FR.md).

Ces sources motivent une discipline de reprise ; elles ne prouvent pas qu’un
produit précis conserve son état après une interruption. Aucun compte ni service
réel n’est utilisé ici. Le Lab reste `draft / not_run` jusqu’à une exécution
d’apprenant et une revue indépendante.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navigation entre les Labs">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-013-l3-vertical-slice-FR.md" aria-label="Lab précédent : Lab 013 · Mener une tranche verticale complète">← Précédent<br><strong>Lab 013 · Mener une tranche verticale complète</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-015-evidence-delivery-FR.md" aria-label="Lab suivant : Lab 015 · Livrer des preuves, pas une phrase de fin">Suivant →<br><strong>Lab 015 · Livrer des preuves, pas une phrase de fin</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
