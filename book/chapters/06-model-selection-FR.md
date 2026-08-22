<!-- content_id: chapter-06-model-selection | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-22-fr-deepening -->

# Chapitre 6 : Choisir un modèle sans vénérer un modèle

**Statut :** `candidate`. Le protocole de comparaison est écrit et borné par
des sources, mais le jeu de tâches de ce dépôt n’a pas encore été exécuté.
Les performances, le coût, la latence, la capacité, la stabilité et le
classement global restent donc `not_run`.

## Le problème que résout ce chapitre

Le choix d’un modèle se résume trop facilement à « prends le meilleur ». Pour
un travail réel, la question utile est plus étroite :

> Pour cette tâche, sur cette interface, avec ce fournisseur, ce contexte, ces
> outils, cette autorisation, ce délai et cette grille d’acceptation, quel
> candidat atteint le minimum requis ? Avons-nous assez de preuves pour élargir
> l’essai ?

Un candidat peut être décrit dans une documentation officielle et rester
indisponible pour un compte donné. Deux essais qui changent le contexte, les
outils, les permissions ou le niveau de raisonnement ne constituent pas une
comparaison propre. Une jolie démonstration montre un résultat dans une
configuration ; elle ne prouve ni un classement universel ni une valeur
générale.

## Objectifs d’apprentissage

À la fin de ce chapitre, vous devriez pouvoir :

- définir la tâche et la surface de travail avant de choisir un modèle ;
- vérifier la disponibilité dans le compte, l’espace de travail, le fournisseur
  et la session réellement utilisés, au lieu de déduire l’accès d’un catalogue ;
- séparer l’identifiant du modèle, le fournisseur, l’effort de raisonnement, le
  contexte, les outils, les permissions et le critère d’acceptation ;
- mener une petite comparaison à trois tâches sans modifier les conditions pour
  sauver un candidat ;
- conserver les échecs de capacité, de fournisseur ou d’attente prolongée ;
- dire précisément ce que l’essai montre, ce qu’il laisse inconnu et quand il
  faut s’arrêter.

## Problèmes de terrain

La [recherche de terrain du projet](../../docs/research/field-problems-codex.md)
réunit des Issues GitHub publiques et d’autres discussions publiques. Ces
rapports décrivent des symptômes ; ils ne sont ni des diagnostics officiels ni
des reproductions locales. Ils sont utiles parce qu’ils montrent les
hypothèses qui rendent un choix de modèle trompeur.

| Symptôme public | Ce que le rapporteur a observé | Ce que cela ne prouve pas | Première réponse sûre |
|---|---|---|---|
| Le sélecteur change `model` mais conserve un `model_provider` personnalisé | Le modèle visible et le fournisseur effectif peuvent former une paire invalide | Que le sélecteur, le fournisseur ou le modèle est toujours défectueux | Lire les deux valeurs ensemble, puis conserver un diff de configuration expurgé |
| Le modèle choisi est à capacité | La tâche s’arrête avant une sortie complète et la relance peut rencontrer un état partiel | Que le modèle est de mauvaise qualité ou que la relance signifie que le premier essai est terminé | Sauvegarder le checkpoint, le diff, les journaux et les contrôles ; classer l’état |
| Une commande Windows reste en `Working` | L’interface affiche une activité, mais aucune sortie vérifiable n’arrive | Que le formateur, l’Agent ou le modèle produit encore un travail utile | Appliquer la règle de délai, interrompre prudemment, inspecter l’arbre de travail |

Les liens, les dates, les versions et les niveaux de preuve figurent dans le
[dossier de recherche sur la sélection des modèles](../../docs/research/codex-model-selection-official-facts-2026-08-11.md).
Le projet n’a pas exécuté les commandes ni les contournements mentionnés dans
ces rapports.

### Lire un rapport sans en faire une légende

Conservez quatre étiquettes distinctes pour chaque symptôme :

1. **Rapport utilisateur :** ce qu’une personne dit avoir vu dans un
   environnement nommé ;
2. **Rapport indépendant :** une autre personne décrit-elle un symptôme proche ?
3. **Confirmation officielle :** existe-t-il une réponse de mainteneur, une
   documentation de première partie ou une note de version ?
4. **Preuve du Playbook :** ce dépôt a-t-il reproduit le comportement ?

Ici, les deux premières étiquettes peuvent exister, mais le projet ne dispose
pas d’une reproduction locale ni d’une confirmation officielle de la cause.
La bonne action est donc de conserver les faits et de réduire le prochain
contrôle, pas de promettre un réglage magique.

## 1. Le choix d’un modèle est une décision de configuration

### La disponibilité passe avant la qualité

Utilisez deux portes séparées :

~~~text
documentation officielle du produit
→ autorisation réelle du compte / espace / organisation
→ surface et fournisseur visés
→ modèle visible dans cette session
→ requête inoffensive réussie
→ outil requis appelable
→ résultat de la tâche vérifié
~~~

Chaque flèche porte une affirmation différente. Une réponse textuelle réussie
ne prouve pas que le fichier, le terminal, le navigateur ou le connecteur
nécessaire à la tâche est disponible. `not_observed` est un résultat valable :
le contrôle n’a pas été fait ou n’a pas laissé de preuve exploitable.

Utilisez au minimum ces champs dans une carte de candidat :

~~~text
candidate_id:
model_id:
provider:
surface: Local | Worktree | Cloud
entry: desktop | CLI | IDE | web | API | autre
account_or_workspace_scope:
surface_available: yes | no | not_observed
availability_evidence:
not_available_reason:
model_visible_evidence:
harmless_request_evidence:
~~~

### Le positionnement du produit n’est qu’une hypothèse de départ

Lors de la vérification des sources du 11 août 2026, la page officielle des
modèles Codex présentait en termes généraux trois points de départ : Sol pour
un travail complexe et ouvert, Terra comme outil polyvalent du quotidien, et
Luna pour des tâches claires, répétables et volumineuses. Ce sont des
descriptions du fournisseur, pas les résultats d’un benchmark du Playbook.

Formulez donc une hypothèse limitée : essayez Sol quand le jugement et
l’ambiguïté dominent, Terra pour le travail courant, et Luna pour une
transformation structurée. Mesurez ensuite le taux de premier passage, la
durée, le coût, la stabilité et le comportement des outils sur votre propre
jeu de tâches.

La documentation indique aussi que l’effort de raisonnement peut améliorer un
travail complexe tout en prenant plus de temps et de tokens. Commencez au
niveau le plus bas qui satisfait la grille ; augmentez-le seulement si le
besoin est écrit dans le protocole. `Max` et `Ultra` modifient l’enveloppe de
ressources ou la forme du travail : un essai avec sous-agents n’est pas une
comparaison « modèle seul » avec un agent unique.

### Modèle, fournisseur et surface forment un tuple

Ne notez pas seulement `model = ...`. Une identité de comparaison utile est :

~~~text
(model_id, provider, surface, entry, account_scope, reasoning_effort,
 context_fingerprint, tools_and_versions, permission_profile)
~~~

Si un membre important change, marquez la ligne `not_comparable` et relancez
les deux côtés sous le nouveau contrat. Un fichier de configuration est une
preuve de configuration, pas la preuve que la valeur effective a été utilisée.
Relisez le fournisseur et le modèle effectifs, puis effectuez une requête
inoffensive avant de considérer le tuple comme actif.

## 2. Décider dans le bon ordre

Ne partez pas d’une marque favorite. Suivez cette séquence :

~~~text
définir la tâche et le risque
→ choisir Local / Worktree / Cloud
→ choisir l’interface et le fournisseur
→ vérifier l’accès et la disponibilité du modèle
→ figer contexte, outils, permissions, effort et acceptation
→ exécuter le même jeu de tâches
→ examiner les lignes comparables / not_comparable
→ élargir, arrêter ou recueillir plus de preuves
~~~

### Classer la tâche avant de classer le modèle

La classe de tâche détermine le sens de « suffisamment bon » :

- **Comprendre et extraire :** trouver des valeurs structurées ;
- **Transformer et générer :** réécrire, résumer, classer ou formater avec un
  schéma fixe ;
- **Planifier et juger :** traiter des contraintes, des arbitrages et de
  l’incertitude ;
- **Coder et utiliser des outils :** inspecter, éditer, exécuter et réparer ;
- **Rechercher et relire :** trouver des sources, rapprocher des affirmations
  et exposer les lacunes ;
- **Créer et concevoir :** conserver une direction malgré plusieurs retours.

Un candidat qui réussit une extraction peut être un mauvais choix pour une
réparation multi-fichiers. La grille d’acceptation doit correspondre à la
classe de tâche.

### Verrouiller la surface et la frontière de risque

Choisissez le plus petit environnement qui peut fournir la preuve requise.
Gardez les entrées synthétiques ou expurgées en local quand aucune exécution
distante n’est nécessaire. Utilisez un Worktree temporaire pour isoler du
travail non commis. N’utilisez Cloud que si le dépôt, l’environnement, le
réseau, les secrets et la voie de revue sont approuvés et observables.

Le choix du modèle ne compense ni un mauvais dépôt, ni un connecteur absent,
ni une permission non accordée. Si la surface est incorrecte, arrêtez-vous à
la décision de surface au lieu de « tester » dans des conditions inégales.

## 3. Écrire la carte de candidat avant le premier essai

Préparez une carte par candidat ou par workflow :

~~~text
candidate_id:
model_id / provider:
surface: Local | Worktree | Cloud
entry:
account_or_workspace_scope:
surface_available: yes | no | not_observed
availability_evidence:
not_available_reason:

reasoning_effort_or_config:
task_set_version: three-task-smoke-v1
context_fingerprint:
tools_and_versions:
permission_profile:
acceptance_rubric_version:
cost_basis: actual | credits | token_only | not_observed
known_capacity_or_network_issue:

not_comparable: true | false
not_comparable_reason:
conclusion_status: not_run | candidate | disputed
~~~

Avant le premier appel, gelez les entrées exactes et leur version, la surface,
l’interface, le fournisseur, le modèle et l’effort, les outils, les
permissions, la grille, le délai, le budget de relance et la base de coût.
N’ajoutez pas du contexte ou une permission à un seul côté pour le sauver. Si
le contrat change, incrémentez sa version et relancez les deux candidats.

## 4. Expérience : comparaison de trois tâches

**État de l’expérience :** `not_run`. Ce protocole est un exercice ; il ne
constitue pas une preuve que ce dépôt a comparé des modèles.

### Préparation

Choisissez deux candidats dont `surface_available` vaut `yes` sur la même
surface. Utilisez le jeu hors ligne versionné
[three-task-smoke-v1](../../evals/candidates/three-task-smoke-v1/README-FR.md),
qui contient des entrées synthétiques non sensibles et un validateur local,
mais aucun résultat de modèle. N’utilisez ni données de production, ni secret,
ni écriture externe, ni publication, ni push, ni déploiement, ni connecteur
payant.

Figez `task_set_version: three-task-smoke-v1`, les deux cartes, la grille, les
emplacements des sorties brutes, les journaux et l’arrêt en cas
d’indisponibilité, de capacité, de permission, de dérive d’entrée ou de version
d’outil. Exécutez chaque tâche une fois et autorisez au plus une reprise
pré-déclarée, identique pour les deux candidats.

### Tâches fixes

Les identifiants canoniques sont `extract-01`, `markdown-02` et
`gap-review-03`. Ils couvrent l’extraction structurée, la transformation
Markdown contrainte et la revue d’une lacune de preuve. Les empreintes SHA-256
de `fixture.json` permettent de détecter une entrée modifiée.

Ne remplacez pas une tâche par une démonstration plus flatteuse pour un seul
candidat. Si le schéma, la consigne ou la règle d’acceptation change, créez une
nouvelle version du jeu puis relancez les deux côtés.

### Tâche

1. Complétez les deux cartes avant d’appeler le premier candidat.
2. Vérifiez la disponibilité sur la surface choisie et notez l’emplacement de
   la preuve.
3. Exécutez A et B dans le même ordre, avec les mêmes entrées et la même grille.
4. Sauvegardez les sorties brutes avant toute correction humaine ; notez les
   événements, la durée, la base de coût et le type d’erreur.
5. En cas d’échec, utilisez seulement la reprise prévue ; ne transformez pas
   des relances aveugles en succès caché.
6. Relisez chaque ligne `not_comparable` avant de résumer les résultats.
7. Terminez par `worth expanding`, `do not expand yet` ou `insufficient evidence`,
   avec les limites et la condition du prochain essai.

### Preuve à conserver

~~~text
run_id | candidate_id | task_id | model_id | provider | surface | entry
surface_available | availability_evidence
reasoning_effort_or_config | context_fingerprint | tools_and_versions
permission_profile | first_pass | rework_count | duration
cost_basis | cost_observed | error_type | reviewer_score
comparable | not_comparable_reason | raw_evidence
~~~

Une autre personne doit pouvoir reconstruire les trois entrées, les conditions
et les critères. Une cellule vide, une estimation ou la sortie de l’autre
candidat ne doit pas remplir un essai interrompu. Les tokens ne sont pas une
monnaie sans base de coût explicitement définie.

## 5. Variantes d’échec et récupération sûre

| Variante | Pourquoi la comparaison cesse d’être propre | Réponse sûre |
|---|---|---|
| Le candidat n’est pas visible ou appelable | Il n’existe pas d’essai sur la même surface | Noter `surface_available: no` ou `not_observed` ; ne pas noter l’indisponibilité comme une qualité du modèle |
| Le sélecteur et le fournisseur ne correspondent pas | La requête n’a peut-être pas utilisé le candidat visé | Conserver un diff effectif expurgé et corriger le tuple, ou reclasser l’essai comme test de workflow |
| Une erreur de capacité interrompt l’essai | La sortie et la durée sont incomplètes ; la reprise peut partir d’un état partiel | Sauvegarder l’erreur et le checkpoint ; classer `blocked` ou `not_comparable` |
| Une commande attend sans événement vérifiable | `Working` n’est pas un résultat | Appliquer le délai, interrompre, inspecter le diff et l’état du processus, puis noter la preuve manquante |
| Un côté reçoit plus de contexte, d’effort ou d’outils | La variable indépendante n’est plus seulement le modèle | Marquer `not_comparable`, conserver les deux fiches et relancer sous le contrat figé |
| Une seule démonstration annonce un vainqueur général | La taille de l’échantillon ne porte pas la conclusion | Revenir à `candidate` ou `insufficient evidence` et élargir les tâches avant toute conclusion |

La récupération réaliste n’est pas de cliquer jusqu’à ce que cela fonctionne.
Conservez le dernier état connu, déterminez si la tâche est terminée, partielle
ou inconnue, puis choisissez un contrôle borné. Une nouvelle conversation peut
être une surface de reprise ; elle n’hérite pas de la preuve de l’ancienne.

## Réflexion

Répondez à partir des cartes et des sorties brutes :

- Quelle tâche a changé la décision d’élargir ou d’arrêter ?
- Quelle différence peut venir du modèle, et laquelle peut venir de la surface,
  du fournisseur, du contexte, de l’outil, de la permission, de la capacité ou
  du relecteur ?
- Où une sortie plus rapide ou moins chère échouerait-elle encore à la grille ?
- Quelles phrases sont un positionnement officiel, et lesquelles sont une
  observation de l’essai ?
- Si vous n’avez qu’une démonstration convaincante, qu’est-ce qui interdit un
  classement général ?

## Transfert

Réutilisez les mêmes champs pour comparer le même modèle en Local et en
Worktree, convertir un document selon un schéma strict, rapprocher des
sources de recherche ou inspecter un dépôt avec des outils en lecture seule.
Figez une nouvelle version du jeu de tâches et une grille propre au domaine.
Ne copiez pas le choix du modèle ni le résultat du premier essai dans le
nouveau domaine ; dites ce qui reste valable au niveau de la tâche et ce qui
doit être abandonné.

## Preuve attendue du chapitre

La livraison attendue contient deux cartes de candidat, un jeu de tâches et une
grille figés, les sorties brutes, les reprises contrôlées, un tableau de
comparaison, des erreurs typées et une décision d’élargissement ou d’arrêt.
Tant que ces pièces n’existent pas, le chapitre reste `not_run` : le
positionnement officiel et une démonstration ne remplacent pas une évaluation.

## Sources et limite de mise à jour

| Fait ou limite de méthode | Source | Accès | Portée | Responsable / prochaine revue |
|---|---|---:|---|---|
| Positionnement des modèles, effort de raisonnement, valeurs par défaut locales et limites Cloud | [Codex models](https://learn.chatgpt.com/docs/models.md) | 2026-08-11 | Documentation officielle à cette date ; ni preuve d’accès du compte ni benchmark | `facts-maintainer` / 2026-09-11 |
| Surface CLI et workflow de dépôt local | [Codex CLI](https://learn.chatgpt.com/docs/cli.md) | 2026-08-11 | Documentation officielle ; pas la configuration effective de cette session | `facts-maintainer` / 2026-09-11 |
| Environnement Cloud, journaux et limites de revue | [Codex Cloud](https://learn.chatgpt.com/docs/cloud.md) | 2026-08-11 | Documentation officielle ; la configuration ne prouve pas la fin d’un Agent | `facts-maintainer` / 2026-09-11 |
| Symptômes de capacité, fournisseur et attente prolongée | [Dossier de terrain](../../docs/research/codex-model-selection-official-facts-2026-08-11.md) | 2026-08-11 | Rapports utilisateurs et méthode du projet ; pas une cause officielle ni une reproduction locale | `curriculum-maintainer` / 2026-09-11 |
| Méthode de comparaison à tâches fixes | [Chapitre d’évaluation](19-evaluate-models-and-workflows-FR.md) et [fixture versionnée](../../evals/candidates/three-task-smoke-v1/README-FR.md) | 2026-08-14 | Méthode du Playbook et validateur local ; aucun run de modèle terminé | `evaluation-maintainer` / 2026-09-11 |

Les identifiants de modèles, surfaces, prix, capacités, paramètres et avis de
dépréciation changent. À chaque changement, actualisez les sources de première
partie, le registre d’impact, ce chapitre, les fixtures et leur statut. Gardez
dans des phrases séparées le positionnement officiel, les symptômes rapportés
et les observations d’exécution locale.

## Liste d’acceptation

- [ ] Je peux définir la tâche, le risque, la surface, le fournisseur et la
      grille d’acceptation avant de nommer un modèle.
- [ ] Je peux conserver une preuve d’accès réelle au lieu de déduire la
      disponibilité d’un catalogue, d’un fichier de configuration ou d’un
      sélecteur.
- [ ] Je peux remplir deux cartes avec modèle, fournisseur, effort, contexte,
      outils, permissions, coût et version du jeu de tâches.
- [ ] Je peux exécuter ou bloquer correctement les six appels initiaux de
      `three-task-smoke-v1` sans modifier les conditions d’un côté.
- [ ] Je peux conserver les erreurs de fournisseur, de capacité et d’attente,
      et distinguer récupération et vérification.
- [ ] Je peux limiter mon compte rendu aux tâches observées et expliquer
      pourquoi une démonstration ne prouve pas un classement général.
- [ ] Je peux dire que ce chapitre est `candidate` et que son expérience reste
      `not_run` jusqu’à l’existence de runs et d’une revue.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="05-choose-the-codex-surface-FR.md" aria-label="Chapitre précédent : Chapitre 5 · Choisir la bonne interface Codex">← Précédent<br><strong>Chapitre 5 · Choisir la bonne interface Codex</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="07-skills-plugins-and-tools-FR.md" aria-label="Chapitre suivant : Chapitre 7 · Skills, Plugins, MCP et outils">Suivant →<br><strong>Chapitre 7 · Skills, Plugins, MCP et outils</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
