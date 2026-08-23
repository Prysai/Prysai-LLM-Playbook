<!-- content_id: prysai-task-protocol | locale: FR | language: fr | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: 2dfe4e3 | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-task-protocol
description: >
  Transformer une demande insuffisamment précisée en protocole de tâche Codex
  borné, couvrant le résultat, le contexte, les entrées, les contraintes, les
  actions autorisées, les preuves d’acceptation, la gestion des échecs et la
  livraison. À utiliser lorsque la demande est vague, risque de provoquer
  beaucoup de reprises, touche aux permissions ou entraîne des effets
  externes. Ne pas l’utiliser comme parcours principal pour l’apprentissage,
  l’audit de preuves, la synthèse de recherche, le contexte produit, le choix
  d’un Skill ou l’orchestration en plusieurs étapes lorsque le contrat est
  déjà clair.
---

# Protocole de tâche

Créez le plus petit contrat qui rende une tâche exécutable et auditable. Ce
Skill définit la limite ; il n’exécute pas la tâche.

## Limite de déclenchement et transmission

Prenez en charge les verbes vagues comme « améliorer », « construire »,
« rechercher » ou « connecter », ainsi que toute demande dont le périmètre,
l’autorité, l’acceptation ou les effets de bord sont flous.

Transmettez la demande lorsque :

- un `$skill` explicite est nommé ; préservez ce parcours et ajoutez seulement
  les questions de sécurité obligatoires ;
- un protocole complet est déjà fourni et la personne veut l’exécuter :
  transmettez à Workflow Orchestrator ou au parcours métier approprié ;
- la question porte sur la véracité d’un résultat existant : Evidence Review ;
- le travail non résolu consiste à trouver des sources : Research Router ;
- le travail non résolu est le positionnement d’un produit : Product Context ;
- le travail non résolu est le choix ou l’installation d’un Skill : Skill
  Selector.

Ne vous appelez jamais vous-même. Vous pouvez indiquer une transmission, mais
ne reconstruisez pas récursivement un protocole après le retour d’un autre Skill
si la personne n’a pas changé le périmètre.

## Entrées requises et comportement en cas de manque

Collectez `goal`, `background`, `inputs`, `constraints`, `allowed_actions`,
`acceptance_evidence`, `failure_handling` et `delivery_format`. Classez aussi
`risk` comme `R0`, `R1`, `R2` ou `R3`, puis notez `owner`, `checkpoint`,
`rollback` et `confirmation` lorsqu’une tâche peut modifier un état partagé ou
externe. Marquez les inconnues `missing`, et non comme des hypothèses.
Inspectez une entrée locale et peu risquée avant de poser une question ; ne
posez que les questions qui changent le périmètre, le risque, le choix
d’implémentation ou l’acceptation. Pour un manque lié à un système externe, à
des secrets, à la production, à une action irréversible ou à la propriété,
retournez `blocked on <field>` et n’exécutez rien.

Appliquez cette porte de risque minimale avant de déclarer le protocole prêt :

| Risque | Contrat requis | Action par défaut |
|---|---|---|
| `R0` | périmètre de lecture exact, entrées, contrôle d’acceptation et limite sans écriture | explication ou inspection en lecture seule uniquement |
| `R1` | cible locale exacte, ensemble de commandes/écritures autorisées, point de contrôle, cible de rollback et contrôle d’acceptation réversible | action locale réversible uniquement |
| `R2` | cible partagée/externe exacte, exposition des données, responsable, confirmation au niveau de l’action, point de contrôle, rollback et responsable de la preuve | bloqué jusqu’à l’enregistrement de la confirmation nommée |
| `R3` | tous les champs `R2`, plus un but étroit, un contrôle indépendant et une confirmation explicite juste avant l’action irréversible, de production, porteuse de secrets ou à permissions larges | arrêt strict ; ne pas exécuter à partir de ce protocole seul |

Représentez séparément les accès `read`, `edit`, `run`, `network`, `commit`,
`push`, `publish`, `deploy`, `restart` et `secret`, avec l’état `allowed`,
`not_allowed` ou `confirmation_required`. Une permission générale, un token,
une connexion ou une approbation antérieure n’autorise pas une action non
énumérée. Si la personne demande plusieurs actions, découpez-les en étapes
avec risque, cible, confirmation, point de contrôle, rollback et preuves
d’acceptation distincts.

## Ordre de construction

1. Énoncez le résultat et le bénéficiaire.
2. Délimitez fichiers, systèmes, comptes, versions et période.
3. Séparez lectures, écritures, commandes, appels réseau, commits, pushes et
   publications autorisés ; ne les rangez pas sous une permission unique.
4. Attribuez le niveau de risque et définissez la cible exacte, le responsable,
   le point de confirmation, le point de contrôle, le rollback et la preuve
   d’acceptation observable.
5. Marquez les hypothèses, les inconnues et la prochaine transmission.

Pour chaque affirmation d’acceptation, nommez l’artefact observable ou la
sortie de commande qui la prouverait ainsi que la limite qu’elle ne peut pas
franchir. Un protocole n’est pas une preuve d’exécution. Ne marquez pas une
action terminée parce qu’elle a été demandée, planifiée, démarrée ou qu’elle a
renvoyé un texte plausible.

## Risque, effets de bord et confirmation

Classez `R0` comme explication ou lecture seule, `R1` comme changement local
réversible, `R2` comme changement d’un service externe ou d’un dépôt partagé,
et `R3` comme action de production, irréversible, porteuse de secrets ou à
permissions larges. Un protocole peut décrire un effet de bord, mais son
exécution exige une autorisation explicite limitée à la cible et à l’action
exactes. Une confirmation « de toutes les permissions » ne remplace pas une
cible étroite. N’insérez jamais de secrets dans le protocole. Pour `R2`/`R3`,
la confirmation doit intervenir après la fixation de la cible et de l’action,
et non avant. Une compilation, une connexion ou une simulation réussie ne
confirme pas une écriture, un push, une publication, un déploiement ou un
redémarrage ultérieur.

## Arrêts stricts

Retournez `blocked` si le bénéficiaire ou le résultat manque, si la propriété
est floue, si l’acceptation ne peut pas être observée, si un secret serait
exposé, si la cible est ambiguë, si une action irréversible n’a pas de
confirmation ou si une règle du projet contredit la demande. Conservez la
condition et le motif de l’arrêt. Une nouvelle tentative n’est permise que si
une condition énoncée change et qu’un nouveau contrôle est nommé ; sinon
retournez `blocked` ou `unverified` au lieu de réessayer indéfiniment. Ne
transformez pas un champ manquant en valeur par défaut inventée lorsqu’il
change le risque ou le périmètre.

## Sortie fixe

Retournez exactement :

1. `protocol_status` (`ready_to_execute` ou `blocked_on`)
2. `goal`
3. `background`
4. `inputs_and_unknowns`
5. `constraints`
6. `allowed_actions_and_permissions` — fiches d’action séparées avec état,
   cible, risque, exposition des données et exigence de confirmation
7. `acceptance_evidence`
8. `failure_handling`
9. `delivery_format`
10. `handoff`
11. `risk`
12. `owner_and_confirmation` — responsable exact de la décision, point de
    confirmation et actions non confirmées
13. `checkpoint_and_rollback` — artefact observable, cible de restauration et
    décision de récupération
14. `content_status`

## Correspondance entre preuves et statuts

Le protocole lui-même est `draft` tant que tous les champs ne sont pas présents,
`candidate` lorsque le contrat passe un contrôle local de complétude mais n’a
pas été exercé, `verified` seulement lorsque les preuves d’acceptation indiquées
ont été observées, et `production-ready` uniquement après les portes de
production, rollback, maintenance et propriété. Vérifiez le protocole en
comparant les champs requis à la porte de risque, chaque action à sa cible et à
l’état de permission exact, puis chaque affirmation d’acceptation à un contrôle
observable. Pour `R2` et `R3`, vérifiez séparément le point de confirmation, le
checkpoint, le rollback et la fiche d’exposition des données. Ne marquez pas la
tâche terminée parce que le protocole est prêt.

## Fiche de maintenance

- `source` : `CONTEXT.md` ; `docs/charter.md` ;
  `docs/quality/skill-quality-standard.md`
- `license` : réécriture originale ; les éléments externes restent des
  références selon `docs/sources/asset-register.md`
- `owner` : task-systems maintainer
- `version` : `0.2.0`
- `review_date` : `2026-09-09`
- `content_status` : `candidate`
