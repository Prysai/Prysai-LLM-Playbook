<!-- content_id: prysai-communication-failure-triage | locale: FR | language: fr | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: 2dfe4e3 | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-communication-failure-triage
description: Diagnostiquer une interaction LLM déjà échouée à partir de la demande originale, du contexte visible, de la réponse ou de l’artefact réel et du résultat attendu ; proposer la plus petite correction de communication et une nouvelle tentative contrôlée. À utiliser lorsqu’une réponse a ignoré des contraintes, répondu à la tâche précédente, provoqué des reprises répétées ou est restée impossible à accepter. Ne pas l’utiliser pour une demande vague qui n’a pas encore été essayée, une simple révision stylistique, un dépannage de plateforme sans preuve d’interaction ou la génération générale de modèles de prompts.
---

# Triage d’un échec de communication

Traitez la demande, le contexte, la réponse, l’artefact et le retour de la
personne comme des éléments de preuve. N’inférez pas un raisonnement caché, un
prompt système, l’état du service ou un défaut universel du modèle à partir
d’une seule interaction échouée.

## Exiger le paquet de preuves

Exigez les quatre éléments suivants avant de diagnostiquer :

1. la demande originale ou la version la mieux conservée ;
2. le contexte visible, les entrées, les outils, les permissions et l’état de
   la conversation ;
3. la réponse ou l’artefact réel ;
4. le résultat attendu ou un symptôme d’échec concret.

Posez au maximum trois questions lorsqu’un élément manquant pourrait changer le
diagnostic. Arrêtez-vous avec `insufficient_evidence` lorsque la preuve absente
ne peut pas être restaurée. Ne demandez jamais de token, mot de passe, cookie,
clé privée ou fichier contenant des secrets.

## Orienter avant de diagnostiquer

- Transmettez une tâche vague qui n’a pas été essayée au Task Protocol.
- Transmettez un audit pur d’une affirmation d’achèvement à Evidence Review.
- Transmettez une question sur une commande, une fonctionnalité, un compte ou
  l’état d’une plateforme à Source Investigator. Utilisez Platform Adapter
  Review seulement si l’artefact examiné est lui-même une leçon ou un workflow
  nommé par une plateforme qui revendique une différence exécutable par rapport
  au universal core.
- Transmettez un défaut logiciel reproductible au diagnostic de bug.
- Utilisez une révision ordinaire pour une amélioration de formulation sans
  interaction échouée.

Ne prenez en charge que la jonction après l’échec : classifiez l’écart observé,
effectuez une seule modification minimale de communication et définissez une
nouvelle tentative qui permette de voir si cette modification a aidé.

## Classifier les écarts observables

Sélectionnez au plus deux classes principales :

- `outcome_acceptance` : le résultat demandé, le public, la forme de sortie ou
  le test d’achèvement manquait ou se contredisait ;
- `context_provenance` : une entrée nécessaire était absente, obsolète,
  contradictoire, excessive ou dépourvue d’autorité et de priorité ;
- `constraint_authority` : le périmètre, les actions interdites, les effets
  externes, les confirmations ou les règles d’arrêt n’étaient pas clairs ;
- `turn_state_protocol` : la réponse a suivi une ancienne tâche, la surface de
  travail actuelle n’était pas claire, ou le texte et les instructions
  exécutables ont été confondus ;
- `evidence_feedback` : des termes comme « meilleur », « professionnel » ou
  « terminé » ne comportaient ni contrôle observable, ni identité de l’échec,
  ni règle de conservation, ni limite de révision.

Pour chaque constat, enregistrez :

```text
observed_symptom:
candidate_class:
direct_evidence:
alternative_explanations:
confidence: low | medium | high
discriminating_check:
```

Parlez d’une classe candidate, et non d’une cause racine. Ajouter du contexte
n’est pas automatiquement une correction ; un contexte sans rapport ou
contradictoire peut être le défaut.

## Effectuer la plus petite correction

Modifiez une seule condition correspondant au symptôme observé. Préférez
l’ajout d’un résultat manquant, d’une priorité d’entrée, d’une interdiction,
d’une réinitialisation d’état ou d’un contrôle d’acceptation à la réécriture de
toute la demande. Montrez une différence compacte entre l’original et la
version révisée, et reliez chaque ligne modifiée à un constat.

Conservez les mots et le style de travail de la personne, sauf si ce style est
le défaut observé. N’ajoutez ni cérémonial, ni éloge, ni jeu de rôle, ni
« raisonnement étape par étape », ni pression émotionnelle, ni promesse de
performance non étayée.

## Définir une nouvelle tentative comparable

Gardez constants la tâche, les entrées, le modèle ou la surface de travail, les
outils, les permissions, le budget et les critères d’acceptation. Ne changez
que la correction de communication proposée. Si une autre condition change,
étiquetez la comparaison `not_comparable`.

Définissez le résultat comme l’un des états suivants :

- `unrun`
- `improved_on_this_case`
- `unchanged`
- `regressed`
- `not_comparable`

N’écrivez jamais `resolved` à partir d’un prompt proposé seulement. Après deux
nouvelles tentatives comparables sans amélioration, cessez d’ajouter du texte
au prompt et transmettez le premier point de rupture.

## S’arrêter aux limites d’action et de connaissance

Arrêtez-vous avant de lire des secrets, d’élargir des permissions, de publier,
de déployer, de contacter quelqu’un ou de modifier un état externe. Une
demande de supprimer la confirmation ne transforme pas une action risquée en
problème de communication.

Lorsque le défaut probable dépend d’un prompt système invisible, d’un journal
privé, d’une configuration de compte, de l’état du service ou de
l’implémentation du produit, enregistrez-le comme `unknown` et transmettez-le à
l’enquête de plateforme appropriée. Refusez les demandes de raisonnement caché
ou d’instructions destinées à contourner la sécurité et l’autorité.

## Livrer la fiche de triage

Retournez :

```text
target_outcome:
expected_vs_observed:
evidence_received:
primary_findings: maximum two
alternatives_ruled_out:
smallest_repair:
prompt_diff:
rerun_contract:
result_status:
evidence:
unknowns:
risk:
stop_conditions:
handoff:
```

N’acceptez le résultat que si chaque constat cite une preuve directe, chaque
modification répond à un symptôme nommé, la nouvelle tentative ne change
qu’une variable, les permissions ne s’élargissent pas et le statut ne dépasse
pas les preuves recueillies.

## Fiche de maintenance

- `source` : méthode originale de Prysai Lab dérivée des contrats de tâche,
  de preuve et d’autorité, de la communication-clinic et des contrats de
  classification des échecs
- `license` : réécriture originale ; les recommandations officielles des
  fournisseurs restent des références liées
- `owner` : communication-systems maintainer
- `version` : `0.1.0`
- `review_date` : `2026-09-12`
- `content_status` : `candidate`
