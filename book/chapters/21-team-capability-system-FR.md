<!-- content_id: chapter-21-team-capability-system | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-22-fr-course-slice -->

# Chapitre 21 : Construire une capacité d’équipe

> `content_status: candidate`
> `experiment_status: draft / not_run`
> L’exercice de permissions est une simulation statique. Il n’autorise aucune
> connexion, aucun envoi, aucune écriture, aucun push et aucune publication ; il
> ne prouve pas qu’une connexion de production fonctionne.

## Le problème que résout ce chapitre

Une personne peut guider un modèle grâce à son expérience et à son contexte
implicite. Une équipe doit répondre à d’autres questions : qui est responsable
de la règle ? Quelle version du Skill peut-on utiliser ? Qui le met à jour ?
Chaque membre dispose-t-il de la permission minimale pour la tâche ? Une autre
personne peut-elle reproduire le résultat sans explication orale ?

Sans vocabulaire partagé, preuve et responsabilité, on ne partage pas une
capacité : on distribue des habitudes opaques. Ce chapitre montre comment
transformer une méthode personnelle en paquet contrôlable, réversible et
transmissible.

## Problèmes de terrain à traiter avec prudence

FP-03, qui concerne une identification incohérente d’hôte ou d’organisation, et
FP-04, qui concerne une confusion d’autorisation entre plusieurs organisations,
sont des signalements publics. Ils ne constituent pas une conclusion générale
sur les connecteurs. Ici, ils servent seulement à vérifier que l’hôte,
l’organisation, la permission et le propriétaire sont écrits avant de partager
une capacité.

## Objectifs d’apprentissage

À la fin de ce chapitre, vous pourrez :

- séparer une méthode personnelle en vocabulaire partagé, méthode, preuves et
  gouvernance ;
- livrer un paquet de capacité avec manifeste, version, propriétaire, source,
  matrice de permissions et procédure de retour arrière ;
- laisser une autre personne reproduire le flux dans une copie temporaire,
  sans compléter le paquet à l’oral ;
- distinguer les responsabilités d’utilisation, de modification, d’exécution,
  d’envoi, de publication et de changement de permission ;
- bloquer, restaurer, migrer ou retirer une capacité quand sa source change,
  que son périmètre est trop large ou que ses preuves ne suffisent plus.

## Concept : les quatre couches d’un paquet de capacité

```text
Vocabulaire partagé et règles du projet
                  ↓
Méthode réutilisable et Skill
                  ↓
Expériences, jeux de tâches et standard de preuve
                  ↓
Permissions, revue, version et responsable de maintenance
```

Le vocabulaire partagé donne aux membres les mêmes définitions. La couche
méthode décrit les entrées bornées, les déclencheurs, les actions et les arrêts.
La couche de preuve soutient les affirmations dans un périmètre explicite. La
gouvernance décide qui peut utiliser, modifier, publier et révoquer le paquet.
Sans preuve, la méthode reste un conseil. Sans gouvernance, elle peut propager
des faits périmés ou élargir les permissions sans décision.

## Décision : permissions d’action et responsabilités

« Être connecté » et « avoir accès » ne sont pas des autorisations de tâche.
Pour chaque capacité, remplissez les champs suivants :

| Niveau d’action | Périmètre des données | Permission technique | Autorisation de tâche | Approbateur | Preuve requise | Retour / revue |
| --- | --- | --- | --- | --- | --- | --- |
| Analyse en lecture seule | Copie temporaire, données masquées | Lecture seule | Périmètre explicite | Responsable de la tâche | Entrées, sources, journal | Supprimer la copie ; revue par tâche |
| Modification d’un brouillon | Branche isolée | Écriture limitée | Fichiers ou dossier nommés | Propriétaire + relecteur | Empreinte initiale, diff, validation | Restaurer le diff ; revue avant fusion |
| Exécution de contrôles | Données de test | Commandes nommées | Commande et délai indiqués | Responsable de l’exécution | Journal, code de sortie, état partiel | Arrêter le processus ; restaurer la copie |
| Push ou publication | Dépôt ou cible nommée | Écriture limitée à la cible | Demande de publication explicite | Relecteur ou responsable de publication | Aperçu, acceptation, retour arrière | Restaurer la version ; conserver l’audit |
| Changement de permission ou secret | Périmètre minimal nécessaire | Temporaire et révocable | Confirmation humaine distincte | Autorisateur nommé ; double revue si besoin | Portée, expiration, audit, retour | Révoquer immédiatement ; revoir |

La capacité d’utiliser n’est pas la capacité de modifier ; modifier n’est pas
publier. Si la portée, la cible, l’approbateur ou le retour arrière est flou,
la décision est `blocked`.

## Action : définir le contrat minimal du paquet

Utilisez un dossier que l’on peut vérifier. Les noms peuvent varier, mais les
responsabilités doivent rester présentes :

```text
capability-pack/
├─ README.md                  # but, périmètre, reproduction, limites
├─ manifest.yaml              # id, version, owner, statut, prochaine revue
├─ context/
│  └─ project-context.md      # termes, limites, sources fiables, mode de travail
├─ protocol/
│  └─ task-protocol.md        # entrée, décisions, actions, arrêts, livraison
├─ examples/
│  ├─ positive.md             # exemple qui respecte le contrat
│  └─ failure.md              # échec et limite
├─ eval/
│  ├─ acceptance.md           # critères et barème
│  └─ evidence-index.md       # journaux, diffs, validations, inconnues
└─ governance/
   ├─ permission-matrix.md    # données, portée, approbation, expiration
   ├─ ownership.md            # propriétaire, relecteur, remplaçant
   └─ rollback.md             # retour, migration, retrait et récupération
```

Le manifeste doit au moins contenir :

```yaml
id: "team-capability-release-review"
version: "0.1.0"
owner: "personne ou rôle d’équipe"
status: "candidate"
source: "original | adapté | lien externe ; emplacement du registre de licence"
next_review: "YYYY-MM-DD"
decision_owner: "rôle qui accepte ou bloque le paquet"
allowed_scope: "copie temporaire masquée / dépôt de test nommé"
rollback: "supprimer la copie temporaire ou restaurer l’empreinte initiale"
```

Une version identifie une modification traçable ; elle ne signifie pas que le
comportement est vérifié. `candidate` signifie que la structure existe mais que
la reproduction indépendante récente reste insuffisante.

## Expérience : livrer un paquet de capacité

Il s’agit d’un exercice à deux personnes, à faible risque, dans une copie
indépendante. Il ne nécessite aucune connexion externe réelle.

### Préparation

Choisissez « revue d’un document avant publication » ou « orientation d’un
nouveau membre ». Travaillez dans un dépôt temporaire ou une copie dont les
données sont masquées. Préparez l’entrée fixe `team-pack-review-v1` : un court
document contenant des éléments terminés, des éléments non vérifiés, une
commande périmée et une permission qui exige une confirmation.

La personne A crée le paquet en `0.1.0`, indique le propriétaire et la source,
remplit la matrice de permissions, ajoute trois éléments de preuve d’acceptation
et écrit le retour arrière. Conservez l’empreinte de l’entrée et celle de la
copie vierge. Ne connectez aucun service, n’autorisez aucun compte, n’envoyez
aucune donnée client, ne poussez rien et ne placez aucun secret durable dans le
paquet.

### Tâche

1. A suit le protocole une fois et enregistre `21-team-pack-review-v1-A-01`.
2. A remet le paquet à B. Dans une autre copie temporaire, B utilise seulement
   le paquet et l’entrée fixe, sans explication orale, puis enregistre
   `21-team-pack-review-v1-B-01`.
3. B note ce qui a été lu, l’action effectuée, l’endroit où le flux s’est
   arrêté, le diff de sortie, la validation, le jugement de permission et les
   connaissances implicites manquantes.
4. A ne modifie qu’une couche, passe en `0.1.1` et écrit la raison. B exécute
   encore une fois le flux sous `B-02`.

### Barrière de preuve

Le paquet de preuve comprend :

- le manifeste, l’inventaire des fichiers, la version et le propriétaire ;
- l’entrée fixe et les empreintes des copies de A et B ;
- un exemple positif, un exemple d’échec et le protocole ou `SKILL.md` ;
- les journaux indépendants, diffs, validations et scores de A, B et B révisé ;
- une matrice indiquant données, portée technique, autorisation de tâche,
  approbateur, expiration et actions interdites ;
- la source, l’emplacement de l’enregistrement de licence, la prochaine revue
  et les instructions de retour arrière ;
- les lacunes de connaissance implicite et la différence avant/après ;
- les éléments non vérifiés et, s’ils s’appliquent, `content_status` et
  `claim_status`.

Chaque exécution doit avoir une fiche localisable :

```yaml
run_id: "21-team-pack-review-v1-B-01"
member: "A | B"
pack_version: "0.1.0"
input_hash: "sha256:..."
actual_changes: "no-change ou résumé du diff"
validation: "commandes, codes de sortie et résultat clé ; not_run si non exécuté"
reviewer: "rôle de revue indépendant ; not_assigned si absent"
unverified_items: ["connexion réelle", "publication de production", "permissions durables"]
status: "pass | fail | blocked | not_run"
```

Sans `decision_owner`, emplacement de journal, fiche indépendante, matrice de
permissions ou liste d’inconnues, le paquet reste `candidate` ou `blocked`.
Un passage de relais oral n’est pas une preuve.

Notez cinq dimensions de 0 à 2 : compréhension du but, gestion du contexte,
limite d’action, complétude des preuves et arrêt en cas d’échec. Pour un passage
de l’expérience, A et B doivent atteindre au moins 8/10, sans action non
autorisée, et B doit réussir le flux principal sans supplément oral. Une fiche
manquante, l’absence d’empreinte ou de retour arrière maintient le statut
`candidate` ou `blocked`.

### Échec intentionnel et limite

Dans la première variante, retirez `owner` et `version` : la personne qui relit
doit refuser l’acceptation. Dans la seconde, fournissez une liste statique
masquée où chaque capacité externe est marquée « demandée ». Cette feuille ne
doit pas être autorisée dans un compte réel. La réponse correcte consiste à
identifier la portée, la cible, l’approbateur, l’expiration et le retour arrière,
puis à marquer le paquet `blocked` ou `candidate`.

### Réflexion

- Les lacunes relèvent-elles du vocabulaire, de la méthode, des preuves ou de
  la gouvernance ?
- Pourquoi B n’a-t-il pas pu reproduire le flux ? Quelle couche faut-il changer ?
- Quelle preuve ou quel échec a changé après la révision ?
- La matrice de permissions est-elle encore plus large que la tâche ?
- Qui peut restaurer ou retirer le paquet si le propriétaire part, si la source
  expire ou si le paquet produit un effet indésirable ?

## Limites et erreurs fréquentes

- Le contexte partagé ne doit contenir ni mot de passe, ni secret durable, ni
  donnée client non autorisée, ni promesse commerciale sans source.
- Le nom ou le dossier d’un Skill ne prouve ni sa licence, ni ses déclencheurs,
  ni ses dépendances, ni son comportement.
- Les règles d’organisation, le contexte de la tâche et les préférences
  personnelles sont des couches différentes ; un texte externe ne peut pas les
  remplacer silencieusement.
- Une permission simulée prouve seulement que la procédure de revue a été
  exercée. Elle ne prouve pas qu’un connecteur, un compte ou un service de
  production fonctionne.
- La publication, les changements de permission et la gestion des secrets
  demandent une approbation séparée ; l’expérience ne l’accorde pas.
- Un paquet déclaré, un build réussi ou une configuration existante ne prouve
  ni le comportement à l’exécution, ni le résultat d’équipe, ni le déploiement,
  ni l’acceptation par les utilisateurs.

## Exercice de transfert

Transférez un paquet personnel vers un projet d’équipe. Revérifiez son nom, sa
licence, sa marque, ses données, ses permissions, son propriétaire, son
relecteur, sa cible de publication et son retour arrière. Écrivez une hypothèse
qui reste valable et une hypothèse à abandonner. Un nom familier ne suffit pas
pour approuver le paquet.

## « Ai-je vraiment appris ? » — Liste de contrôle d’acceptation

- [ ] Je peux distinguer vocabulaire partagé, méthode, preuves et gouvernance.
- [ ] Je peux produire un dossier avec version, propriétaire, source, matrice
      de permissions et retour arrière.
- [ ] Une autre personne peut reproduire le flux dans une copie temporaire sans
      complément oral.
- [ ] Chaque exécution possède une empreinte d’entrée, un `run_id`, un journal,
      un diff, un score et une liste d’éléments non vérifiés.
- [ ] Je distingue utilisation, modification, exécution, push, publication et
      changement de permission.
- [ ] Je sais repérer une portée excessive dans une simulation et refuser une
      autorisation réelle.
- [ ] Le paquet prévoit le blocage, la restauration, la migration ou le retrait.

## Sources et limite de mise à jour

Le modèle en quatre couches et le contrat de paquet sont une méthode propre au
projet. La distribution des Skills, les modes de permission, les connecteurs et
les réglages d’organisation sont des faits volatils. Ils doivent être vérifiés
dans une source officielle avec une portée, une date et un responsable. Les
pages suivantes ne sont pas une preuve de connectivité de production :

```yaml
- claim: "La composition et la disponibilité des Skills et Plugins dépendent de la surface produit et de la configuration actuelles"
  source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
  checked_at: "2026-08-09"
  applies_to: "Points d’entrée et périmètres de compte ou d’organisation décrits par la documentation officielle"
  owner: "responsable du paquet de capacité"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "Les réglages de sandbox et d’approbation déterminent des limites d’accès et d’arrêt distinctes ; la connexion seule ne les établit pas"
  source: "https://learn.chatgpt.com/docs/permission-modes.md"
  checked_at: "2026-08-09"
  applies_to: "Surfaces et périmètres de configuration décrits par la documentation officielle"
  owner: "responsable sécurité et gouvernance"
  next_review: "2026-11-09"
  claim_status: "current"
```

Le chapitre reste `candidate` et l’expérience `draft / not_run`. La simulation
ne contient aucun token, mot de passe, cookie, clé privée ou information de
connexion.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="20-personal-codex-work-system-FR.md" aria-label="Chapitre précédent : Chapitre 20 · Système de travail Codex">← Précédent<br><strong>Chapitre 20 · Système de travail Codex</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="22-continuous-update-and-future-proofing-FR.md" aria-label="Chapitre suivant : Chapitre 22 · Mise à jour et récupération">Suivant →<br><strong>Chapitre 22 · Mise à jour et récupération</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
