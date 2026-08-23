<!-- content_id: prysai-interruption-checkpoint | locale: FR | language: fr | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-interruption-checkpoint
description: Préserver l’état observable d’une tâche assistée par LLM après une interruption et choisir une seule décision sûre. À utiliser lorsqu’un modèle est indisponible, qu’une tâche expire, qu’une session est perdue, qu’un outil manque ou qu’un relais se déconnecte avant que la preuve d’acceptation soit visible. Ne pas l’utiliser pour réessayer, diagnostiquer une interaction conservée, auditer une affirmation existante ou inférer le comportement d’une plateforme.
---

# Point de contrôle après interruption

Prenez en charge la première minute sûre après une interruption. Préservez ce
qui est visible, gardez `unknown` pour ce qui ne l’est pas et arrêtez-vous avant
qu’une nouvelle action ne transforme une tâche opaque en récit impossible à
examiner.

## Garder uniquement la jonction d’interruption

Utilisez ce Skill lorsqu’une tâche peut être partielle et qu’une interruption
visible rend la suite incertaine. Exemples : message de modèle indisponible,
expiration, session perdue, outil manquant ou relais déconnecté.

Passez plutôt le relais lorsque :

- une demande, une réponse et un résultat attendu conservés ont besoin d’une
  réparation de communication : Communication Failure Triage ;
- une affirmation d’achèvement, de fiabilité ou de release doit être auditée :
  Evidence Review ;
- un fait actuel sur une plateforme nommée doit être vérifié : Source
  Investigator ;
- une tâche nouvelle ou modifiée doit fixer action et permissions : Task
  Protocol.

Ne diagnostiquez pas le fournisseur, n’inférez pas la cause, ne comparez pas les
modèles, n’expliquez pas l’état d’un compte et ne créez pas une procédure
générale de récupération à partir d’une interruption.

## Préserver le paquet minimal de preuves

Collectez seulement ce que le demandeur peut déjà observer :

1. `goal` — résultat visé en une phrase ;
2. `observed_event` — interruption visible, sans cause supposée ;
3. `last_inspectable_artifact` — diff, test, vue de fichier, note ou
   `none_observed` ;
4. `acceptance_evidence` — contrôle qui établirait l’achèvement, ou `unknown` ;
5. `external_actions` — tout ce qui a été envoyé, changé, téléversé, dépensé,
   commit, publié, ou `not_observed`.

Ne remplissez jamais un champ absent avec une histoire plausible. Ne demandez
ni secrets, tokens, mots de passe, cookies, journaux privés, captures de compte
ou contexte sans rapport.

## Classer sans achever l’histoire

Utilisez un seul état :

- `complete` uniquement si la preuve d’acceptation déclarée est déjà
  inspectable ;
- `partial` si un artefact inspectable existe mais n’établit pas le contrôle ;
- `unknown` si l’artefact, son sens ou la preuve d’acceptation manque.

Un message d’interruption n’est ni un diagnostic ni une preuve de tâche. Un
nouveau prompt n’hérite pas de la preuve d’achèvement d’une tâche antérieure.

## Choisir une décision suivante bornée

Par défaut, choisissez `hold` à `R0` : conserver le reçu et ne rien faire.

Proposez `inspect_local` à `R1` uniquement si le demandeur nomme une cible
locale, réversible, une observation exacte et le fait que cette inspection ne
pourra pas prouver à elle seule l’achèvement antérieur. Ce Skill enregistre la
décision ; il n’effectue pas l’inspection.

Pour une nouvelle tâche, une nouvelle tentative, un outil, un changement de
modèle, de réglage, de compte ou de fournisseur, une requête réseau, un
téléversement, une dépense, un commit, un push, une publication ou un déploiement,
arrêtez-vous et passez à Task Protocol. Exigez un périmètre, une permission,
un point de contrôle, un retour arrière et une acceptation séparés.

## Conditions d’arrêt

Retournez `blocked` si l’objectif, le dernier artefact inspectable, le sens de
l’acceptation ou l’autorité de l’action suivante manque. Ne réessayez jamais
automatiquement, ne changez pas de modèle ou de compte, ne traitez pas un
rapport de fournisseur comme une cause, n’inspectez pas un compte ou un service
externe et ne déclarez pas terminée une tâche partielle.

## Livrer le reçu de point de contrôle

Retournez exactement :

```text
checkpoint_status: ready_for_one_bounded_next_decision | blocked_on_<field>
goal:
observed_event:
last_inspectable_artifact:
acceptance_evidence:
state_classification: complete | partial | unknown
knowns:
unknowns:
external_actions:
next_decision: hold | inspect_local | handoff
handoff:
risk_and_permission_boundary:
```

Acceptez le reçu seulement s’il conserve explicitement `unknown`, sépare
l’interruption de l’achèvement, ne nomme aucune action non autorisée et assigne
au plus une décision. Il s’agit d’une méthode candidate, pas d’une preuve de
récupérabilité, de disponibilité d’un service ou d’utilisabilité par un
apprenant.

## Fiche de maintenance

- `source` : méthode originale de Prysai Lab dérivée du point de contrôle
  d’interruption borné par les sources, de Task Protocol et d’Evidence Review
- `license` : réécriture originale; les rapports publics et documentations API
  restent des références sous `docs/sources/asset-register.md`
- `owner` : reliability-systems maintainer
- `version` : `0.1.0`
- `review_date` : `2026-09-14`
- `content_status` : `candidate`
