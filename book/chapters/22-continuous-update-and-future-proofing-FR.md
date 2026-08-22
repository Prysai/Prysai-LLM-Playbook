<!-- content_id: chapter-22-continuous-update-and-future-proofing | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

# Chapitre 22 : Mettre à jour sans perdre la possibilité de revenir en arrière

**Statut :** `candidate` · **Expérience :** `not_run`
L’exercice se déroule dans une copie jetable, sans credentials, push ni release.

## Le problème que résout ce chapitre

Les points d’entrée, modèles, réglages de raisonnement, permissions, Skills et
services externes évoluent. Une méthode qui n’a ni source, ni portée, ni date de
revue, ni plan de migration ou de restauration finit par induire en erreur.
Mettre à jour ne signifie pas adopter chaque nouveauté : il faut décider ce qui
reste stable, ce qui doit être vérifié et quand une ancienne version doit être
conservée, bloquée, migrée ou retirée.

## Problème de terrain à traiter avec prudence

FP-01 (régression d’authentification), FP-06 (limites de découverte d’un Skill)
et FP-10 (contrôle qui semble rester bloqué) sont des signalements publics. Ils
ne remplacent ni une documentation officielle actuelle ni une reproduction
locale. Ils servent ici à exercer l’analyse d’impact, le choix de version et la
règle d’arrêt.

## Objectifs d’apprentissage

- séparer principes stables et faits volatils ;
- décider de mettre à jour, conserver, bloquer ou retirer ;
- lier chaque changement à une source et à un impact ;
- publier une note de migration compréhensible.

## Concept : quatre couches qui n’ont pas la même durée de vie

| Couche | Exemples | Méthode de maintenance |
| --- | --- | --- |
| Principes stables | Le contexte influence la compréhension ; les outils élargissent l’action ; la preuve soutient une affirmation | Enseignement, expériences et revue des limites |
| Usage d’un produit | Entrées Codex, invocation d’un Skill, modes de permission, configuration | Relecture de la page officielle adaptée au compte et à la version |
| Méthodes de domaine | Ingénierie, recherche, marketing, documentation, données | Tâches pratiques et revue humaine |
| Faits d’instance | ID de modèle, prix, quotas, paramètres, API tierce | Source datée ; migration ou retrait si le fait change |

Gardez trois statuts distincts :

- `content_status` : `draft | candidate | verified | production-ready` ;
- `claim_status` : `current | stale | disputed | removed` ;
- observation d’exécution : `planned | authorized | executed | verified | not_run`.

« La source est actuelle » ne signifie donc pas « le chapitre est vérifié ».

## Problèmes de terrain

Une nouvelle fonction peut modifier les coûts, l’autorité, le format ou la
récupération. Vérifiez d’abord ce qui a réellement changé.

## Carte de maintenance

```text
Fait et version · source · portée · propriétaire · impact
test de régression · décision · date de revue · rollback
```

## Décision : mettre à jour, conserver, bloquer ou retirer

| Situation de preuve | Décision | Condition de sortie |
| --- | --- | --- |
| Source officielle accessible, portée identique et contrôle pertinent réussi | `current` ; conserver ou mettre à jour | Source, date, consommateurs touchés et responsable consignés |
| Sources contradictoires ou portée du compte inconnue | `disputed` ; suspendre la formulation affirmative | Inconnue nommée, responsable de revue désigné, aucune conclusion ferme publiée |
| Source indisponible sans preuve de remplacement | `stale` ; avertir ou bloquer | Ne pas présenter l’ancien fait comme actuel |
| Licence ou sécurité ne permet plus la capacité | `removed` ; retirer | Notes de migration et de récupération conservées |
| Remplaçant compatible, migration et évaluation réussies | `current` ; publier une note | Ancienne portée, nouveau chemin, preuves et prochaine revue indiqués |

Une découverte de changement ne justifie pas une réécriture globale. Cartographiez
d’abord l’impact. Sans propriétaire, preuve ou cible de restauration, la décision
reste `blocked`.

## Action : fiche de claim, matrice d’impact et flux de mise à jour

Chaque fait volatil doit utiliser les champs suivants :

```yaml
claim: "Affirmation actuelle"
source: "URL officielle ou autre source faisant autorité"
checked_at: "YYYY-MM-DD"
applies_to: "Produit, version, région, compte ou organisation"
owner: "Responsable ou rôle de l’équipe"
next_review: "YYYY-MM-DD"
claim_status: "current | stale | disputed | removed"
```

Le flux est :

```text
repérer le changement
  → classer impact et risque
  → trouver chapitres, Skills, Labs, prompts, tâches et permissions concernés
  → ouvrir la source ou recueillir une preuve bornée
  → appliquer le plus petit changement sûr
  → relancer contrôles et évaluations concernés
  → demander une relecture dans un contexte vierge
  → publier, conserver, migrer, bloquer ou retirer
```

Pour un modèle ou un Skill, recontrôlez le jeu de tâches, le contexte, les
outils, permissions, déclencheurs, format de sortie, licence, responsable et
récupération en cas d’échec. Une source actualisée met à jour un claim dans sa
portée ; elle ne prouve ni l’accès du compte, ni le runtime, ni le déploiement.

## Expérience : traiter un changement hypothétique

### Préparation

Dans une copie temporaire, choisissez un changement hypothétique : nouveau
format, nouvelle permission ou nouvelle version de modèle. Créez la fixture
`update-impact-demo-v1` avec un claim volontairement indisponible :

```yaml
claim: "L’outil d’exemple était décrit comme prenant en charge l’action X le 2026-08-01"
source: "https://example.invalid/public-doc"
checked_at: "2026-08-01"
applies_to: "Fixture pédagogique uniquement ; pas une affirmation produit"
owner: "responsable de l’exercice"
next_review: "2026-11-01"
claim_status: "disputed"
```

`example.invalid` est intentionnellement indisponible : ne l’ouvrez pas et ne
suivez aucune instruction qu’il contiendrait. Écrivez la fiche avant toute
modification, calculez l’empreinte initiale et notez l’inventaire de la copie.
N’utilisez ni accès de production, ni credential réel, ni push, ni release, ni
remplacement massif.

### Tâche

Supposez qu’un mainteneur annonce un changement de l’action X, sans seconde
source fiable. Dans la copie temporaire :

1. gardez le claim `disputed` et suspendez la formulation définitive ;
2. remplissez cette matrice d’impact :

   | Consommateur | Risque | Action | Preuve | Responsable | Statut |
   | --- | --- | --- | --- | --- | --- |
   | Chapitre | Mauvaise compréhension | Réécriture minimale | Source ou diff | Contenu | pending |
   | Skill | Mauvaise action | Arrêt ou migration | Journal d’évaluation | Skill | pending |
   | Lab | Comparaison invalide | Fixture nouvelle version | Run ID ou score | Évaluation | pending |
   | Permission | Autorité excessive | Revue statique | Matrice de permissions | Sécurité | pending |
   | Jeu de tâches | Lacune de régression | Version nouvelle | Résultat de tâche | Évaluation | pending |

3. modifiez seulement le statut et la note nécessaires ;
4. exécutez les contrôles pertinents, ou écrivez `not_run` ;
5. consignez `run-id: 22-update-impact-demo-v1-01`, diff avant/après,
   inconnues, propriétaire, reviewer et cible de restauration.

La fiche de décision doit contenir `decision_owner`, `delivery_target` (la
copie temporaire uniquement), `reviewer` et `rollback_target`. Un champ absent
maintient la décision `blocked`.

### Preuve

Conservez la source (ou la trace de son indisponibilité), la carte d’impact, les
empreintes avant/après, le diff, le test, le journal, la raison du changement et
la liste des inconnues. Le paquet doit compter au moins dix éléments : claim,
source, portée, owner, `next_review`, hash initial, hash final/diff, matrice,
journal de validation et liste d’inconnues. Une simple modification de statut
ne constitue pas une migration vérifiée.

Le rollback doit être faisable sans accès de production : restaurer la copie à
partir du hash initial ou supprimer la copie/branche temporaire. « Le fichier a
l’air revenu » n’est pas une preuve de restauration.

### Échec intentionnel et limite

Remplacez volontairement un nom de modèle dans tous les documents sans mettre à
jour jeux de tâches, sources, permissions ni note de migration. Arrêtez cette
approche, conservez le diff dans la copie, restaurez le hash initial et ajoutez
les consommateurs oubliés à la matrice. Si la source est contradictoire, la
licence floue, l’owner absent ou l’évaluation non exécutée, gardez `disputed` ou
`stale` et le travail `blocked`.

### Réflexion

- Quel consommateur en aval aurait été oublié par un remplacement global ?
- Pourquoi la décision est-elle `current`, `stale`, `disputed` ou `removed` ?
- Quelle vérification est la plus petite qui réduirait l’incertitude ?
- Qui déclenche la prochaine revue, à quelle date et sur quel signal ?
- Quel hash, diff, journal ou `not_run` prouve cette décision ?

## Transfert

Quel changement aurait exigé la plus petite vérification ? Transférez la méthode
à une dépendance, une traduction ou une règle de sécurité.

## Liste de contrôle d’acceptation

- [ ] Les faits volatils ont une source et une date.
- [ ] L’impact et le propriétaire sont nommés.
- [ ] Un test de régression précède la migration.
- [ ] Conserver, bloquer et retirer sont des options explicites.
- [ ] Le rollback est documenté avant l’effet durable.
- [ ] La matrice couvre chapitres, Skills, Labs, tâches et permissions touchés.
- [ ] Les hashes, le diff, le journal et les éléments non vérifiés sont conservés.
- [ ] Je sais distinguer `claim_status` de `content_status`.
- [ ] Je sais quand conserver une ancienne version plutôt que remplacer en masse.

## Sources et limite de mise à jour

Le cycle de vie, la matrice d’impact, le rollback et les barrières de preuve sont
la méthode du projet. Les noms de modèles, points d’entrée, réglages, capacités
de Skill et permissions sont des faits volatils : vérifiez-les dans une source
de première partie adaptée à la surface et au compte.

```yaml
- claim: "Les noms, identifiants, points d’entrée et disponibilités des modèles sont des faits régis par la documentation officielle actuelle"
  source: "https://learn.chatgpt.com/docs/models.md"
  checked_at: "2026-08-09"
  applies_to: "Points d’entrée et périmètres Codex/ChatGPT indiqués par la source"
  owner: "responsable contenu et évaluation"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "La découverte et la composition des Skills et les limites sandbox/approbation doivent être recontrôlées dans la documentation et la configuration autorisée"
  source: "https://learn.chatgpt.com/docs/skills-and-plugins.md ; https://learn.chatgpt.com/docs/permission-modes.md"
  checked_at: "2026-08-09"
  applies_to: "Surfaces et comptes décrits par les sources"
  owner: "responsable Skill et sécurité"
  next_review: "2026-11-09"
  claim_status: "current"
```

Cette traduction reste `in-progress`; le chapitre est `candidate` et
l’expérience `not_run`. Un claim `current` ne modifie aucun de ces trois états.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="21-team-capability-system-FR.md" aria-label="Chapitre précédent: Chapitre 21 · Capacité d’équipe">← Précédent<br><strong>Chapitre 21 · Capacité d’équipe</strong></a></td>
      <td align="right"></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
