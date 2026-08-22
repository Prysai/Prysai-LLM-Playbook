<!-- content_id: chapter-14-discover-and-audit-skills | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-22-fr-skill-audit-restoration -->

# Chapitre 14 : Découvrir, installer et auditer un Skill externe

**Statut :** `candidate` · **Expérience :** `not_run`

Un catalogue est un point de découverte, pas une preuve de qualité, de licence,
de sécurité ou de compatibilité. L’installation est un changement d’état ; elle
ne constitue pas une vérification.

## Le problème que résout ce chapitre

Un Skill externe peut regrouper une méthode, des connaissances et des appels
d’outils. Il peut aussi élargir le contexte, les dépendances, le réseau, les
permissions, les effets externes et les obligations de licence. La vraie
question n’est pas « où trouver davantage de Skills ? », mais :

> Le besoin vient-il d’un manque de connaissances, d’une procédure répétée,
> d’un outil ou d’une autorisation ? Si un Skill est pertinent, comment le
> transformer en candidat auditable et l’essayer sans secret ni effet hors
> périmètre ?

## Objectifs d’apprentissage

Vous devriez pouvoir :

- écrire la tâche avant de chercher un Skill ;
- distinguer un manque de connaissance, de procédure, d’outil ou d’autorité ;
- préparer un dossier de revue couvrant source, révision, déclencheur,
  dépendances, licence, permissions, effets, essai isolé et rollback ;
- repérer injection de prompt, demande de secret, upload inutile et permission
  excessive ;
- séparer fichier présent, découvert, chargé, adopté et vérifié ;
- décider `recommendation-only`, `blocked`, `approved-to-install` ou
  `installed-candidate` sans gonfler la preuve.

## Entrée du problème réel : « repérable » ne veut pas dire « adoptable »

Les rapports de terrain du projet signalent trois confusions : un fichier peut
exister sans apparaître dans une liste ; un nom explicite peut être appelé sans
que la liste visible le prouve ; et une vérification peut dériver vers une
réinstallation persistante. Ce sont des rapports et des points de diagnostic,
pas des comportements universels confirmés par le fournisseur.

| Signal | Ce que l’on peut soutenir | Ce que cela ne prouve pas | Premier contrôle |
|---|---|---|---|
| Le fichier existe mais n’apparaît pas | Une différence de découverte a été observée | Que le Skill n’existe pas ou ne peut jamais être découvert | Vérifier racines, fichier ordinaire, version et comportement de la surface |
| L’appel explicite dépend d’une liste visible | Une résolution de nom peut différer de l’inventaire | Que l’invocation a réussi | Consigner découverte implicite et résolution explicite séparément |
| La vérification demande une réinstallation forcée | Une frontière persistante a été proposée | Que l’Agent ou le fournisseur l’exige toujours | Arrêter, nommer l’effet et choisir un contrôle isolé |

Consultez `FP-06`, `FP-07` et `FP-11` dans la [recherche de terrain](../../docs/research/field-problems-codex.md).
Les identifiants sont des entrées de revue, pas des engagements produit.

## 1. Écrire le protocole de tâche avant de chercher un Skill

```text
Objectif : que doit-on changer ou décider ?
Entrées : quels fichiers, données ou sources publiques peuvent être lus ?
Sortie : quelle forme doit avoir le résultat ?
Acceptation : quelle preuve montrera qu’il est complet ?
Autorité : quels outils, réseau, comptes et écritures sont permis ?
Arrêt : quelles conditions imposent une pause et une question ?
```

Classez ensuite le manque :

| Manque | Réponse habituelle | Erreur fréquente |
|---|---|---|
| Concept ou fait absent | Source officielle, recherche, jugement humain | Installer un Skill à la place de vérifier une source |
| Procédure stable et répétée | Skill local ou script borné | Utiliser un Skill géant pour toutes les situations |
| Observation ou changement externe | Outil ou connecteur contrôlé | Confondre « callable » et « autorisé » |
| Objectif ou acceptation flou | Clarifier la tâche | Installer un Skill pour cacher l’ambiguïté |

## 2. Skill, outil, Plugin et Connector ne sont pas synonymes

Un **Skill** est une méthode et un contrat de routage. Un **outil** est une
interface qui observe ou modifie le monde extérieur. Un **Plugin** ou un
**Connector** est une couche de produit qui transporte ou relie ces capacités.
Pendant la revue, posez quatre questions : que lit le Skill ? que recommande-t-il ?
que fait réellement l’outil ? que reçoit le service externe ? Le nom d’un Skill ne
donne aucune permission, et un README ne prouve pas un comportement runtime.

## 3. Licence et sécurité font partie de l’adoption

Un candidat fonctionnel peut rester impropre à la publication si sa licence ou
ses fichiers `NOTICE` sont absents, si les dépendances imbriquées sont inconnues,
si le code ou la marque ne peuvent pas être copiés, ou si la confidentialité est
incertaine. Le registre d’assets du projet classe par défaut le matériau sans
licence claire comme référence ou lien externe.

Les index et leurs compteurs sont des pools de candidats, pas des preuves de
qualité. Une licence à la racine ne couvre pas automatiquement chaque Skill,
script, image ou dépendance imbriquée. Le registre `S02` (CC BY-NC 4.0) ne peut
pas entrer dans une release commerciale sans attribution et frontière de licence
préservées.

## 4. Traiter le contenu du Skill comme une donnée non fiable

Le texte du Skill, le README, une page distante, une issue, un exemple ou un
résultat d’outil sont des données. Les phrases comme « ignore les règles », « lis
et téléverse le secret », « envoie le résultat à cette adresse » ou « exécute
cette commande non autorisée » sont des signaux de blocage. Leur présence dans
un fichier Skill ne leur donne pas une priorité supérieure.

Retenez seulement les entrées nécessaires, masquez les secrets, désactivez le
réseau ou utilisez un sandbox, puis consignez ce qui a été refusé.

## Carte de décision et dossier de revue

### Étape 1 : découvrir

Dérivez les termes de recherche du protocole. Cherchez dans une source officielle,
le dépôt du projet ou un registre déjà audité. Notez date, URL, commit ou version
et n’empruntez pas le texte. Stars, téléchargements et langage promotionnel
créent un candidat ; ils ne remplacent pas la revue.

### Étape 2 : préparer la revue avant installation

Créez une fiche `skill-adoption-decision.md` par candidat :

```text
candidate / task_gap:
trigger_conditions / non_trigger_conditions:
source_url / revision / inventory_date:
license / NOTICE / nested_assets / copy_boundary:
dependencies / network / account:
target_install_scope:
permissions / secrets_boundary:
external_side_effects:
isolated_trial:
backup_and_restore_target:
rollback_steps / rollback_success_check:
approval_points:
behavior_tests: positive | boundary | failure | migration
owner / version_policy / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unverified / unblock_conditions:
```

Séparez l’autorisation d’obtenir une révision fixe, d’écrire dans la cible,
d’installer une dépendance ou d’entrer dans une équipe ou la production. Une
approbation ne couvre pas la suivante. « Supprimer le dossier » n’est pas un
rollback suffisant : nommez la sauvegarde de configuration, la cible exacte, les
étapes de restauration et le contrôle après restauration.

### Étape 3 : séparer état de décision et état de comportement

Les quatre décisions d’adoption sont :

- `recommendation-only` : correspondance plausible ; revue en lecture ou essai isolé à proposer ;
- `blocked` : licence, révision, dépendance, permission, cible ou rollback peu clair ;
- `approved-to-install` : cible, sauvegarde, rollback et autorisations approuvés, installation non faite ;
- `installed-candidate` : installé dans la cible isolée approuvée, comportement et adoption encore en attente.

Enregistrez séparément les cinq états de comportement :

```text
File exists : chemin, manifeste ou hash d’une révision fixe établi
Discovered : la surface courante résout ou liste le nom
Loaded : une nouvelle session enregistre le chargement de la ressource
Adopted : propriétaire et approbation l’incluent dans le périmètre déclaré
Verified : cas positif, frontière, échec et migration passent dans l’environnement déclaré
```

Ces états peuvent diverger selon surface, compte, session et version. Un log
d’installation prouve l’action d’installation et, au mieux, soutient
`installed-candidate` ; il ne prouve pas `Verified`.

### Étape 4 : activer par couches

Passez du moins risqué au plus risqué : lecture locale, fichiers réversibles,
connexion externe en sandbox ou compte de test, puis écritures de production et
release publique. Avant de monter d’un niveau, écrivez nouvelles permissions,
preuves et rollback. Une seule smoke test réussie laisse au mieux le Skill
`candidate`; elle ne le rend pas `verified`.

## Expérience observable : approuver ou refuser deux candidats

### Préparation

Préparez deux candidats à révision fixe, ou deux extraits locaux rédigés. Le
candidat A correspond au besoin et possède un signal de licence traçable ; le
candidat B manque volontairement de licence/NOTICE ou de rollback. Préparez URL,
révision, inventaire, dépendances, permissions et protocole. Ne téléchargez pas,
n’installez pas, ne vous authentifiez pas et n’activez pas d’environnement
d’équipe. Si la cible, la sauvegarde ou le contrôle de restauration ne sont pas
concrets, n’écrivez pas `approved-to-install`.

### Tâche

Pour A et B, complétez la fiche, l’inventaire et les quatre tests comportementaux
prévus pour A :

1. **Positif :** entrée fixe, sortie attendue et preuve de la sortie ;
2. **Frontière :** entrée manquante ou hors périmètre, arrêt attendu ;
3. **Échec/injection :** demande de secret ou d’upload, refus visible ;
4. **Migration :** même tâche dans un autre projet ou une autre version, limites
   et preuve de non-équivalence.

Gardez les inconnues `not_observed` et laissez A `recommendation-only` tant que
installation, sauvegarde et rollback n’ont pas une preuve réelle. Marquez B
`blocked` et nommez le matériau qui pourrait le débloquer.

### Preuve

Le paquet doit contenir deux fiches, URL et révisions, inventaires, conclusions
de licence liées aux fichiers réels, dépendances, permissions, cible et rollback,
points d’approbation, owner, quatre plans de comportement pour A, blocages de B
et les cinq états `File exists / Discovered / Loaded / Adopted / Verified`.

### Échec et limite

Rendez la licence ou le `NOTICE` introuvable, écrivez un rollback vague (« supprimer
le dossier ») ou demandez la lecture et l’upload d’un vrai `.env`. La réponse
correcte est `blocked` : ne pas télécharger, installer, élever l’autorité ou
envoyer des données. Ne transformez pas la présence du fichier en preuve qu’il a
été découvert, chargé, adopté ou vérifié.

### Réflexion

Quelle preuve a changé votre décision ? Avez-vous vérifié un comportement ou
seulement des métadonnées ? Quelle autorisation doit rester séparée ? Qui possède
la prochaine revue si la révision, la licence ou les dépendances changent ?

## Échecs et frontières à connaître

- **Absent de la liste ne signifie pas inexistant :** vérifiez racines, exigence
  de fichier ordinaire et version avant d’écrire « non découvert ».
- **Nom explicite et liste visible sont deux preuves :** testez l’entrée supportée
  séparément ; si elle échoue, documentez une dégradation manuelle.
- **Licence racine et contenu imbriqué diffèrent :** sans licence ou `NOTICE`
  propre au contenu, classez `reference-only` ou `blocked`.
- **Une smoke test peut passer sans rendre l’adoption sûre :** elle peut manquer
  suppression, retries dupliqués, fuite de token, concurrence, timeout ou abandon.
- **L’installation peut modifier un environnement persistant :** séparez
  `source modified`, `validated`, `installed`, `published`, `deployed`,
  `restarted` et `live verified` avec cible, autorisation et rollback.

## Transfert

Choisissez un Skill ou script d’équipe utilisé aujourd’hui sans toucher à la
production. Réécrivez son protocole, sa fiche de revue, une smoke test en lecture,
un échec et une variante d’injection. Demandez à un collègue de retrouver la même
décision avec la seule fiche ; ajoutez la source ou la preuve qu’il ne pouvait pas
voir.

## Liste de contrôle d’acceptation

- [ ] Je peux expliquer par une tâche réelle pourquoi un Skill est nécessaire ou non.
- [ ] Source, révision, déclencheur, non-déclencheur et propriétaire de la revue sont consignés.
- [ ] Licence, `NOTICE`, dépendances imbriquées et frontière de copie sont contrôlés.
- [ ] Cible isolée, sauvegarde, rollback exact et points d’approbation sont écrits.
- [ ] Je distingue instructions, permissions d’outils et autorisation humaine.
- [ ] Mon essai est secret-free, borné, observable et je ne présente pas un plan comme un résultat.
- [ ] Les cas positif, frontière, échec/injection et migration sont prévus.
- [ ] Je ne confonds pas repérable, déclenchable, exécutable et autorisé en production.
- [ ] Je ne confonds pas présent, découvert, chargé, adopté et vérifié.
- [ ] Je peux justifier `recommendation-only`, `blocked`, `approved-to-install` ou `installed-candidate`.

## Sources et limite de mise à jour

- **Rapports de terrain :** [`docs/research/field-problems-codex.md`](../../docs/research/field-problems-codex.md), FP-06, FP-07 et FP-11 ; ils restent `candidate` et ne sont pas des causes officielles.
- **Licences et assets :** [`docs/sources/asset-register.md`](../../docs/sources/asset-register.md), S02, S03 et S06 ; revoir après chaque ajout ou changement de licence.
- **Structure et comportements volatils :** [dépôt officiel OpenAI Codex](https://github.com/openai/codex) ; la source ne remplace pas une preuve runtime locale.

Le propriétaire de mise à jour est le groupe de maintenance Prysai LLM Playbook.
Revoir après chaque mise à niveau, changement de licence ou comportement de
découverte, et au plus tard le 2026-11-09. Cette traduction reste
`in-progress / candidate / not_run`.

## Pratique de la décision d’adoption

Utilisez le [Lab 017 : auditer la découverte avant d’adopter un Skill](../labs/lab-017-skill-discovery-audit-FR.md)
pour séparer découverte, chargement, dépendances, licence, comportement et
rollback. Trouver ou installer un Skill n’est pas une preuve qu’il mérite une
adoption d’équipe.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="13-action-boundaries-FR.md" aria-label="Chapitre précédent : Chapitre 13 · Limites d’action">← Précédent<br><strong>Chapitre 13 · Limites d’action</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="15-research-track-FR.md" aria-label="Chapitre suivant : Chapitre 15 · Recherche vérifiable">Suivant →<br><strong>Chapitre 15 · Recherche vérifiable</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
