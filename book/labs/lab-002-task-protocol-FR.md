<!-- content_id: lab-002-task-protocol | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

---
id: lab-002-task-protocol
title: "Transformer un souhait vague en protocole borné"
level: L2
domain: general
goal: "Pratiquer la transformation d’un souhait incomplet en objectif, contexte, limites, preuves et arrêt"
setup: "Une copie jetable et une demande de faible risque ; aucun secret, état de production ou effet externe"
task: "Rédiger trois versions d’un protocole sans autoriser d’édition ni d’action durable"
evidence:
  - "Le souhait inchangé et trois identifiants de séance"
  - "Les questions de clarification et les protocoles v1, v2 et v3"
  - "Un tableau des hypothèses, actions permises, arrêts et preuves"
failure_variant: "Laisser « rends-le professionnel » ou « corrige tout » sans cible ni critère"
reflection: "Quelle question a réduit le plus de risque ? Quelle affirmation reste sans preuve ?"
status: draft
last_verified: "not run"
transfer_task: "Réutiliser le protocole pour une recherche, une régression ou une mise à jour localisée"
transfer_domain: "recherche, ingénierie, contenu ou publication"
transfer_evidence: "Conserver les protocoles, les champs modifiés, l’échec et la revue indépendante"
transfer_limitations: "Un protocole clair ne prouve ni la vérité des entrées ni la correction du résultat"
---

# Lab 002 : Transformer un souhait en protocole

## Objectif

Le but est de transformer une demande vague en protocole borné.

## Sécurité

Ce Lab rend le chapitre 3 observable. Il mesure la précision du périmètre et du
plan de preuve, pas l’élégance d’une réponse. N’installez rien, n’appelez aucun
service, ne modifiez pas de fichier, ne commitez pas et ne publiez pas.

## Entrée fixe

Gardez la phrase suivante inchangée dans les trois tours :

```text
Aide-moi à améliorer la page d’accueil de ce projet.
```

Créez un identifiant par tour, par exemple `lab002-fr-v1`. Un identifiant est
un repère de registre ; il ne prouve pas qu’une exécution a eu lieu.

## Trois tours

### v1 — souhait seul

Demandez uniquement les questions de clarification et un protocole. Le modèle
ne doit ni choisir une cible ni agir.

### v2 — objectif et limites

Ajoutez le public, le résultat observable, les fichiers lisibles, les fichiers
éditables et les actions interdites. Comparez les questions supprimées et celles
qui restent.

### v3 — acceptation et récupération

Ajoutez les preuves attendues, les conditions d’arrêt, la récupération après
échec et le format de livraison. Une modification est un échec de périmètre.

## Preuve à conserver

```text
id | champs ajoutés | ambiguïté retirée | hypothèses | action permise
| arrêt | preuve attendue | effet réel
```

Utilisez `observed`, `verified`, `unverified`, `blocked` et `not_run` avec leur
portée exacte.

## Échec intentionnel

Retirez le nom du fichier ou écrivez « fais tout ce qui est nécessaire ». Le
résultat correct est une question, un plan plus étroit ou `blocked`, jamais une
cible inventée ou une boucle sans budget.

## Réflexion

Quelle phrase a réellement changé la décision ?

## Transfert

Réécrivez la carte pour une recherche à sources fixes, une correction de README
ou un plan de publication.

## Liste de contrôle d’acceptation

- [ ] Le souhait est identique dans les trois tours.
- [ ] Chaque tour possède un identifiant et une sortie conservée.
- [ ] Aucune action non autorisée n’a été exécutée.
- [ ] v3 nomme entrées, limites, acceptation, arrêt et récupération.
- [ ] Une personne externe peut relire la frontière sans deviner.

## Sources et limite de mise à jour

**Statut :** `draft` · **Exécution :** `not_run`. Le Lab ne prouve ni la qualité
d’un prompt ni une capacité produit. Traduction française en cours de relecture.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navigation des Labs"><table role="presentation" width="100%"><tr><td align="left"></td><td align="right"></td></tr></table></nav>
<!-- lab-navigation:end -->
