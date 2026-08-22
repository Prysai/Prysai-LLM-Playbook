<!-- content_id: lab-001-first-safe-task | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-bootstrap -->

---
id: lab-001-first-safe-task
title: "Effectuer une petite modification de README et montrer ce qui a changé"
level: L1
domain: general
goal: "Inspecter avant d’éditer, limiter l’autorité, relire le diff et vérifier une seule chose"
setup: "Partie A : un chat textuel et une note fictive. Partie B : un projet Git jetable avec README et commande locale documentée. Aucun secret, fichier de production ou écriture externe."
task: "Comparer une demande vague et une demande structurée ; puis, si une sandbox sûre est disponible, modifier uniquement README.md après inspection et conserver le diff réel."
evidence:
  - "Deux réponses conservées à partir de la même note et comparaison des faits, du format et des inconnues"
  - "Carte de tâche avec résultat, entrées, actions autorisées, acceptation et arrêt"
  - "État initial, diff réel et sortie de la vérification ciblée"
failure_variant: "Faire varier le nom du script, interrompre une lecture incomplète ou demander un second fichier"
reflection: "Quelle confirmation a réduit le risque ? Que prouve le diff et que laisse-t-il ouvert ?"
status: draft
last_verified: "not run"
transfer_task: "Réutiliser le protocole pour une recherche à sources fixes ou une révision de texte sans écriture externe"
transfer_domain: "recherche, ingénierie, contenu, design ou marketing"
transfer_evidence: "Deux protocoles, le diff, le contrôle et la liste explicite des points non vérifiés"
transfer_limitations: "Ce Lab montre une frontière locale ; il ne prouve ni les permissions d’un compte, ni la sécurité d’une production, ni le comportement d’un outil en ligne."
---

# Lab 001 : La première tâche sûre

## Expérience : comparer deux demandes

Utilisez cette note fictive dans deux conversations séparées :

```text
Lundi : une faute corrigée dans le guide débutant.
Mardi : une checklist de publication préparée, encore en attente de relecture.
Mercredi : aucun contrôle local exécuté, car la bonne commande reste inconnue.
Prochaine étape : demander à Maya quel contrôle effectuer avant publication.
```

Comparez « Fais-en une bonne mise à jour » avec :

```text
Tâche : transformez uniquement ces notes en mise à jour.
Format : Fait, En attente, Inconnu, Prochaine étape.
N’invente ni test, ni approbation, ni date, ni raison.
Avant de répondre, nommez les faits manquants qui changeraient la décision.
```

Pour chaque réponse, relevez séparément les faits conservés, les éléments
ajoutés, le format obtenu et les inconnues. Le but n’est pas de préférer une
formulation ; il est de voir quelle contrainte rend le résultat contrôlable.

## Préparation

Si vous poursuivez avec une modification, copiez un projet jetable. N’utilisez
aucun secret, compte, donnée client, réseau, publication ou dépôt de production.

## Tâche

1. Lisez le README et la source de la commande de contrôle.
2. Demandez l’état initial et un plan.
3. Après confirmation, modifiez uniquement `README.md`.
4. Conservez le diff et la sortie réelle du contrôle.

Avant l’édition, demandez au système de citer la cible et de montrer ce qu’il
compte modifier. Avant la livraison, lisez vous-même le diff ; un message
« terminé » n’est pas une preuve.

## Preuve

```text
run_id: lab001-fr-<date>
baseline: <état avant>
diff: <diff relu>
commande: <source de la commande>
résultat: <sortie et code réel>
non_exécuté: installation, réseau, publication
```

## Échec et limite

Le premier état peut être `FIRST_SAFE_CHANGE_FAILED` : c’est le défaut prévu
de la fixture. Ne modifiez jamais le vérificateur pour obtenir un succès. Une
réponse simulée n’est pas une exécution d’outil.

Si le contrôle échoue, conservez l’état, la sortie et la commande exacte.
Modifiez une seule condition de diagnostic avant une nouvelle tentative ; si
la cause ou l’autorité reste inconnue, arrêtez-vous et notez `blocked`.

## Réflexion

- Quel champ a empêché l’ajout d’une information inventée ?
- Quelle différence le contrôle a-t-il réellement vérifiée ?
- Quelle autorité faudrait-il confirmer dans un vrai dépôt ?

## Transfert

Produisez la même carte pour un court contrôle de sources. Gardez les faits
fournis, le périmètre, la preuve et la condition d’arrêt.

## Liste de contrôle d’acceptation

- [ ] La note et les deux demandes sont conservées.
- [ ] La sandbox et le fichier autorisé sont identifiés.
- [ ] Le diff montre seulement la modification déclarée.
- [ ] Le contrôle et les actions non exécutées sont indiqués.
- [ ] Une limite de portée est écrite.
