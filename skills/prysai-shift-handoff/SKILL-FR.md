<!-- content_id: prysai-shift-handoff | locale: FR | language: fr | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-shift-handoff
description: Préparer un bref état du travail pour une collaboration LLM récurrente en séparant critères réutilisables, élément changeant, autorité et preuves d’acceptation. À utiliser lorsqu’un contexte d’hier ou un ancien exemple pourrait être pris pour le travail du jour. Ne pas l’utiliser pour créer un contexte produit, un contrat de tâche complet, récupérer une interruption, auditer une affirmation existante ou exécuter une action.
---

# Relais de changement d’équipe

Préparez le plus petit brief qui rend visible un élément changeant sans prétendre
qu’un tour précédent, un exemple, une permission ou un résultat s’applique
encore. Ce Skill prépare un relais; il n’envoie pas de prompt, n’inspecte pas un
système et n’effectue pas le travail.

## Posséder seulement la jonction du travail récurrent

Utilisez-le lorsqu’un workflow textuel répété possède des critères durables mais
qu’un élément change : classer la note d’aujourd’hui sous une taxonomie validée,
revoir la mise à jour hebdomadaire selon le style établi ou convertir une
nouvelle fiche source dans une forme fixe.

Passez le relais lorsque le contexte produit, public, positionnement ou mesure
doit devenir une décision versionnée : Product Context ; lorsque résultat,
périmètre, autorité ou acceptation restent flous : Task Protocol ; lorsqu’une
tâche antérieure s’est arrêtée avant ses preuves : Interruption Checkpoint ;
lorsqu’un échange déjà présent doit être réparé : Communication Failure Triage ;
lorsque l’élément est un fait actuel : Source Investigator. Un fichier, dataset,
outil, compte, réseau ou effet externe exige Task Protocol avant le brief.

Ne transformez pas un schéma de chats répété en affirmation sur mémoire,
contexte, coût, persistance, automatisation ou configuration d’un produit nommé.

## Exiger une fiche stable et une fiche actuelle

Ne recueillez que les entrées visibles. **Fiche stable** :

1. `work_stream` — travail récurrent en langage simple ;
2. `criteria_revision` — version, date ou référence immuable des règles ;
3. `allowed_inputs` — matériau utilisable pour chaque élément ;
4. `forbidden_assumptions` — faits, sources, permissions ou sorties antérieures
   à ne pas hériter ;
5. `response_shape` — forme obligatoire du résultat.

**Fiche actuelle** :

1. `item_id` — étiquette locale sans donnée sensible ;
2. `item_input` — texte courant fourni ou résumé sûr minimal ;
3. `item_change` — nouveauté du jour ;
4. `task_request` — résultat demandé maintenant ;
5. `acceptance_evidence` — règle ou artefact visible de contrôle ;
6. `authority_and_risk` — `R0` préparation textuelle ou `handoff_required`.

Refusez un brief contenant un secret, un dossier privé, un texte sans licence,
une affirmation factuelle non étayée ou une action non approuvée. Ne demandez
pas d’historique de conversation inutile.

## Comparer avant d’écrire

1. Distinguez chaque champ de la fiche stable de ceux propres à l’élément
   courant.
2. Conservez un ancien exemple uniquement comme référence étiquetée ; il ne
   devient ni fait courant ni résultat d’acceptation.
3. Marquez comme `missing` ou `not_authorized` toute permission, source,
   destination, échéance ou preuve actuelle non fournie à nouveau.
4. Arrêtez-vous si l’élément courant modifie les critères stables ; adressez-le
   à son propriétaire ou à Product Context/Task Protocol.
5. Retournez un brief prêt à copier seulement pour un travail `R0` sur texte
   fourni. L’action ultérieure a encore besoin de sa propre limite et preuve.

## Retourner un reçu de relais

Retournez exactement :

```text
handoff_status: ready_for_text_only_current_item | blocked_on_<field> | handoff_required
work_stream:
criteria_revision:
stable_card:
current_item:
item_change:
allowed_inputs:
forbidden_inheritance:
requested_response_shape:
acceptance_evidence:
authority_and_risk:
unknowns_or_conflicts:
next_owner_or_action:
claim_limit:
```

Utilisez `ready_for_text_only_current_item` seulement si fiches stable et
actuelle, demande, forme, preuve et limite `R0` sont visibles. Le reçu est une
limite de contexte, pas la preuve qu’un modèle a retenu les règles, compris
l’élément, produit une bonne réponse ou terminé le travail.

## Contrôles d’échec

Arrêtez ou passez le relais lorsqu’une personne dit « utilisez les mêmes règles
que la dernière fois » sans pouvoir nommer la révision et le contrôle actuels;
qu’un ancien exemple devient silencieusement la vérité; que l’élément contient
fichiers, identifiants, données privées, navigation, publication, dépense,
compte ou effet externe; qu’il change le barème, la permission, la destination
ou la sortie; ou qu’une réponse est déjà considérée comme terminée. Utilisez
Evidence Review dans le dernier cas.

## Fiche de maintenance

- `source` : méthode originale de Prysai Lab dérivée du dossier de recherche
  sur l’élément récurrent borné par les sources, de Task Protocol, Product
  Context et Interruption Checkpoint
- `license` : réécriture originale; les guides officiels et rapports publics
  restent des références sous `docs/sources/asset-register.md`
- `owner` : workflow-systems maintainer
- `version` : `0.1.0`
- `review_date` : `2026-11-14`
- `content_status` : `candidate`
