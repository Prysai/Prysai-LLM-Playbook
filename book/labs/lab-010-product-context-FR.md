<!-- content_id: lab-010-product-context | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->
---
id: lab-010-product-context
title: "Créer un contexte produit qui survit à deux tâches"
level: L3
domain: marketing
goal: "Séparer faits, hypothèses, positionnement et preuves manquantes"
setup: "Un produit fictif, deux tâches marketing et un fichier versionné"
task: "Créer v0.1, produire deux sorties, changer une décision puis comparer"
evidence:
  - "Les versions du contexte"
  - "Les sorties et différences"
  - "Les limites de mesure et la revue"
failure_variant: "Retirer le public et laisser le modèle inventer un segment"
reflection: "Quelle modification a réellement changé la sortie ?"
status: draft
last_verified: "not run"
transfer_task: "Transférer le format à un outil interne ou un projet de contenu"
transfer_domain: "produit, recherche, ingénierie ou marketing"
transfer_evidence: "Contexte, provenance, versions, sorties et limites"
transfer_limitations: "Un contexte partagé ne prouve ni la vérité ni la réaction du marché"
---

# Lab 010 : Construire un contexte produit partagé

## Objectif

Le but est de séparer faits, hypothèses, décisions de positionnement et preuves
manquantes dans une petite source de contexte que deux tâches peuvent réutiliser.
La cohérence est utile seulement si l’incertitude reste visible : un document
plus fluide ne transforme pas une affirmation non étayée en fait.

## Préparation

Inventez un produit simple ou utilisez des informations publiques expurgées de toute donnée sensible.
N’incluez aucune liste client, recherche privée, donnée personnelle, revenu
interne ou stratégie non publiée. Ne connectez ni messagerie, ni publicité, ni
analytics, ni CRM, ni site en production.

Créez `product-context-v1.md` avec le minimum suivant :

```text
product:
audience:
problem:
alternative:
difference:
proof:
objections:
customer_language:
voice:
target_action:
non_goals:
```

Pour chaque champ, ajoutez `source`, `status: fact | assumption | decision |
unknown`, `confidence`, `owner` et `next_review`. Une preuve vide reste vide ;
elle ne devient pas une citation client parce qu’une phrase semble convaincante.

## Tâche et expérience

Utilisez la même version du contexte pour deux tâches :

1. rédiger une présentation concise pour le public nommé ;
2. concevoir un plan de mesure pour une décision réelle, par exemple vérifier
   que les lecteurs comprennent le produit avant de choisir l’étape suivante.

Chaque sortie doit nommer les champs utilisés, les hypothèses et les faits à
valider. Pour chaque métrique, notez l’action cible, la source de données, la
fenêtre d’observation, la règle de décision et la limite d’attribution. Une
métrique proposée est un plan, pas un résultat mesuré.

Changez une décision de positionnement, incrémentez la version, écrivez la
raison et régénérez les deux sorties. Comparez le diff du contexte et celui des
sorties : distinguez ce que la décision a réellement changé des variations de
style.

## Paquet de preuves

Conservez les deux versions, la provenance des champs, la raison du changement,
les quatre sorties, les diffs, la carte des métriques et les champs non résolus.
Le tableau suivant aide à rendre la réutilisation inspectable :

| Élément | Version utilisée | Champ cité | Observation | Limite |
|---|---|---|---|---|
| Présentation |  |  |  |  |
| Plan de mesure |  |  |  |  |

Une consigne plus courte n’est pas une preuve : montrez quelles informations
n’ont plus dû être répétées et si la seconde tâche les a utilisées correctement.

## Échec et limite

Retirez `audience` ou `target_action`, puis demandez à nouveau les deux sorties.
Le comportement correct est de demander la décision manquante, de réduire la
portée ou de laisser le champ inconnu. Inventer un segment, une citation, un
événement de conversion ou un résultat de marché échoue au Lab, même si la
prose est élégante.

## Liste de contrôle d’acceptation

- [ ] Faits, hypothèses, décisions et inconnues sont distingués.
- [ ] Chaque champ matériel possède une provenance, un propriétaire et une date de revue.
- [ ] Les deux tâches réutilisent une seule version et nomment les champs utilisés.
- [ ] La modification de positionnement a une raison et un diff inspectable.
- [ ] Les métriques correspondent à une décision et ne sont pas présentées comme observées.
- [ ] Aucune publication, prise de contact, dépense, collecte ou donnée privée n’a eu lieu.
- [ ] Le retrait d’un champ manquant produit une demande ou une sortie bornée, jamais une invention.

## Réflexion et transfert

Quels champs ont réellement réduit les explications répétées ? Lequel a changé
la décision en aval ? Transférez le contrat à un outil d’ingénierie, un service
de recherche ou un projet de documentation expurgé de toute donnée sensible. Retirez les termes
propres au marketing et indiquez ce qui nécessite un nouveau propriétaire ou
une nouvelle preuve.

## Sources et limite de mise à jour

**Statut :** `draft` · **Exécution :** `not_run`. Le contexte partagé réduit la
répétition ; il n’établit ni la vérité factuelle, ni la réaction des clients, ni
la performance du marché, ni une approbation stratégique. Produit et résultats
restent fictifs, et la traduction française attend une relecture indépendante.
