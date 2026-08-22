<!-- content_id: lab-011-gpt-codex-boundaries | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-bootstrap -->

---
id: lab-011-gpt-codex-boundaries
title: "Séparer génération, exécution et vérification"
level: L0
domain: general
goal: "Classer une proposition d’Agent et refuser les affirmations d’accès ou d’exécution sans preuve"
setup: "Cartes textuelles fictives uniquement ; pas de compte, réseau, secret, terminal ni dépôt réel."
task: "Remplir une matrice de frontière pour cinq cartes et exécuter une comparaison textuelle contrôlée."
evidence:
  - "Matrice avec couche, action autorisée, action interdite, preuve minimale, arrêt et inconnues"
  - "Deux réponses à entrée fixe avec la variable changée et les limites d’attribution"
  - "Registre d’affirmations séparant connexion, autorité, exécution et état distant"
failure_variant: "Accepter completed comme preuve de publication ou poursuivre une boucle sans budget"
reflection: "Quelle couche avez-vous cessé de confondre avec la suivante ?"
status: draft
last_verified: "not run"
transfer_task: "Appliquer la matrice à une recherche ou à une reformulation sans outil externe"
transfer_domain: "recherche, contenu, ingénierie ou design"
transfer_evidence: "Matrice, deux observations, différence contrôlée et inconnues"
transfer_limitations: "La simulation ne prouve aucun comportement de produit, de permission ou d’Agent en direct."
---

# Lab 011 : La frontière GPT–Codex

## Expérience : classer cinq cartes

Pour chaque carte, indiquez la couche principale, l’action autorisée, l’action
interdite, la preuve minimale et la condition d’arrêt :

| Carte | Demande |
|---|---|
| A | Expliquer le contexte et nommer deux incertitudes. |
| B | Lire `notes.md`, modifier une copie locale jetable et montrer le diff. |
| C | Appeler un outil, écrire dans un dépôt public et prévenir l’équipe. |
| D | Réessayer jusqu’à ce que cela paraisse réussi, sans journal intermédiaire. |
| E | Le système est connecté, donc publier sans contrôle. |

Repères attendus : A relève de la génération ; B combine lecture et édition
locale bornée ; C demande un effet externe et doit rester bloqué ici ; D est une
boucle sans budget ; E confond connexion, autorité et preuve. Justifiez chaque
classement avec la plus petite observation nécessaire, sans présenter ces
repères comme un résultat de produit.

## Préparation

Écrivez une ligne `not_observed` lorsqu’une preuve manque. Ne remplacez pas une
simulation par un résultat d’outil.

## Tâche

Répétez cette question avec une seule modification de contexte :

> Examine l’extrait fourni, propose une amélioration, ne modifie aucun fichier,
> indique ce qui est donné, comment vérifier et ce qui reste inconnu.

La variable changée peut être la cible, une règle courte ou un critère
d’acceptation. Si l’effet change mais que la cause n’est pas isolée, écrivez
`résultat différent observé ; cause non isolée`.

Conservez aussi la version exacte de l’entrée et l’état de l’outil. Une réponse
différente n’identifie pas sa cause si le modèle, la surface ou la configuration
ont changé en même temps.

## Preuve

```text
run_id | version d’entrée | surface/modèle | variable changée | outil appelé ?
| fichier changé ? | observation | inconnues
```

## Échec et limite

Une session connectée, un statut `completed` ou une phrase du modèle ne prouve
pas une publication. L’expérience reste statique et `not_run`.

Après une interruption, l’état distant doit être relu avant toute nouvelle
écriture. La bonne récupération est une observation plus petite, pas une
répétition automatique.

## Réflexion

Quelle preuve devrait être lue avant une nouvelle tentative ? Quel effet externe
avez-vous refusé d’inférer ?

## Transfert

Utilisez les mêmes colonnes pour une recherche à sources imposées. Ajoutez URL,
date, portée et propriétaire de chaque source.

## Liste de contrôle d’acceptation

- [ ] Chaque carte possède une couche et une preuve minimale.
- [ ] Les actions externes sont arrêtées sans autorité et confirmation.
- [ ] La variable de la comparaison est nommée.
- [ ] Les observations et les inconnues sont conservées.
- [ ] Aucune capacité de produit n’est déduite de la simulation.
