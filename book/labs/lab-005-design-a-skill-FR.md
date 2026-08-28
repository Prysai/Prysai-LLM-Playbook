<!-- content_id: lab-005-design-a-skill | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->
---
id: lab-005-design-a-skill
title: "Transformer une méthode répétée en Skill étroit"
level: L4
domain: general
goal: "Écrire un contrat de Skill testable avant ses détails"
setup: "Une méthode fictive de classement de faits dans un répertoire temporaire"
task: "Définir déclencheur, non-déclencheur, entrée, sortie, arrêt et preuve"
evidence:
  - "Le contrat et quatre cas de test"
  - "Les résultats bruts et la revue indépendante"
  - "La liste des ressources et de leurs licences"
failure_variant: "Déclencher avec une demande proche mais hors périmètre"
reflection: "Quel champ a empêché le Skill de devenir une solution générale ?"
status: draft
last_verified: "not run"
transfer_task: "Adapter le contrat à une revue de sources"
transfer_domain: "recherche, contenu ou ingénierie"
transfer_evidence: "Contrat, cas, sorties, arrêt et transfert"
transfer_limitations: "Les cas fictifs ne prouvent ni découverte ni exécution par un hôte"
---

# Lab 005 : Concevoir un Skill étroit

## Objectif

Le but est d’écrire un contrat testable avant de détailler le Skill. Une
méthode répétée peut devenir une capacité réutilisable, mais un Skill n’est ni
un dossier de réponses réussies, ni une checklist propre à un seul projet.

## Préparation

Choisissez un flux de travail sans risque déjà réalisé au moins deux fois.
Conservez les deux comptes rendus, utilisez des entrées expurgées et
travaillez dans un répertoire temporaire distinct du dossier découvrable des
Skills. N’utilisez ni secret, ni donnée de production, ni contenu client non
publié, ni source externe dont la licence est incertaine.

Créez `extraction.md` :

| Étape observée | Décision stable | Détail propre au projet | Preuve des deux runs |
|---|---|---|---|
|  |  |  |  |

Seules les décisions stables sont candidates. Les noms de fichiers, clients,
contournements temporaires et cibles uniques restent dans le contexte du
projet.

## Contrat minimal

Imaginez un Skill qui transforme une note en tableau de faits. Écrivez le
contrat avant ses ressources détaillées :

```text
name:
description:
trigger_conditions / non_trigger_conditions:
inputs / input_status:
allowed_actions / forbidden_actions:
permission_boundary / secret_policy:
outputs / acceptance:
stop_conditions / recovery:
evidence:
source / license / notice:
owner / version / next_review:
```

Le noyau doit rester court. Séparez les références ou scripts qui ne sont
nécessaires que dans certains cas et indiquez quand ils peuvent être chargés.

## Tâche et expérience

Le candidat doit contenir :

- une description assez précise pour se déclencher sur les demandes pertinentes
  et s’effacer sur les demandes voisines ;
- les entrées, actions autorisées, limites de permission, gestion des secrets,
  sortie et critères d’acceptation ;
- un exemple positif, un exemple de frontière et un exemple d’échec ;
- la source, la licence, le propriétaire, la version et la prochaine revue.

Testez quatre fixtures fixes dans un contexte vierge :

| Cas | Demande | Résultat attendu |
|---|---|---|
| Positif | classer une note expurgée en faits et hypothèses | le Skill est retenu et la sortie respecte le contrat |
| Frontière | demander une recommandation de domaine sans note à classer | le Skill explique le non-déclenchement |
| Échec | fournir une entrée manquante ou contradictoire | il s’arrête et conserve l’incertitude |
| Transfert | appliquer la même forme à un autre domaine | les décisions stables survivent sans détail du premier projet |

Notez séparément si le candidat a été `found`, `loaded`, `selected`, `followed`
et `behavior_verified`. Aucun de ces états ne prouve le suivant.

## Décision d’adoption

Conservez une fiche `skill-adoption-decision.md` :

```text
candidate_revision:
task_gap:
trigger_conditions / non_trigger_conditions:
source / license / notice:
dependencies:
permissions / external_side_effects:
positive / boundary / failure / transfer results:
target_install_scope:
backup / rollback / rollback_check:
owner / next_review:
decision: recommendation-only | blocked | approved-to-install
unverified / unblock_conditions:
```

Ce Lab s’arrête à une recommandation. L’installation modifie un état partagé et
demande une autorisation distincte.

## Preuve à conserver

Conservez les deux flux de départ, `extraction.md`, le répertoire complet du
candidat, sa révision ou son hash, la sortie du validateur officiel, les quatre
entrées et sorties brutes, les notes du contexte vierge et la décision
d’adoption. Un échec reste un échec dans le dossier ; ne le remplacez pas par la
version corrigée.

## Échec et limite

Insérez d’abord un vrai nom de fichier ou une règle client dans le Skill, puis
exécutez la fixture de transfert. Le candidat doit soit refuser la demande,
soit produire une instruction manifestement hors sujet. Retirez le détail
accidentel et recommencez avec un nouvel identifiant de tentative.

Ajoutez ensuite un fragment externe dont la licence ou l’autorisation est
inconnue. Même si la structure passe la validation, la décision correcte est
`blocked` : la validité du fichier ne règle pas la provenance.

## Liste de contrôle d’acceptation

- [ ] Deux runs antérieurs justifient chaque décision encodée.
- [ ] Les conditions de déclenchement et de non-déclenchement sont testées.
- [ ] Les quatre fixtures conservent leurs entrées, sorties et statuts bruts.
- [ ] Les sources et permissions de réutilisation sont documentées.
- [ ] Aucun secret, déploiement, envoi externe ou effet de production n’a eu lieu.
- [ ] La décision nomme les inconnues, le propriétaire et la prochaine revue.
- [ ] Une personne peut retirer le candidat sans l’historique de conversation.

## Réflexion et transfert

Quelle décision était assez stable pour être encodée ? Qu’est-ce qui devait
rester dans le contexte du projet ? Le candidat a-t-il réduit une omission
répétée, ou a-t-il seulement rendu les instructions plus longues ? Réécrivez le
contrat pour une revue de sources et notez ce qui change.

## Sources et limite de mise à jour

**Statut :** `draft` · **Exécution :** `not_run`. La validation structurelle et
un essai en contexte vierge ne prouvent ni la fiabilité en production,
l’adoption par une équipe, la maintenance à long terme ni l’accord de licence.
Une relecture française indépendante reste attendue.
