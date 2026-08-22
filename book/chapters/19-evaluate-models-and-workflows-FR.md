<!-- content_id: chapter-19-evaluate-models-and-workflows | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-22-fr-deepening -->

# Chapitre 19 : Évaluer modèles et workflows, des impressions aux preuves

**Statut :** `candidate` · **Expérience :** `not_run`. Les fixtures du dépôt
ne contiennent pas de journaux de comparaison exécutés.

## Le problème que résout ce chapitre

« Ce modèle est plus intelligent » ou « ce Skill est plus fiable » confond une
observation locale avec une conclusion générale. Le contexte, les outils, les
permissions, la tâche, la durée et la relecture humaine peuvent changer le
résultat. Une évaluation utile commence par une décision et s’arrête à la portée
des preuves.

## Objectifs d’apprentissage

À la fin de ce chapitre, vous devriez pouvoir :

- exprimer une préférence de modèle ou de workflow comme une décision bornée ;
- geler tâche, entrée, surface, outils, permissions, score et relecteur ;
- conserver sorties initiales, reprises, erreurs et désaccords ;
- distinguer premier passage, reprise, résultat final et condition incomparable ;
- choisir une seule base de coût et ne pas transformer un petit smoke test en
  palmarès.

## Entrée réelle : les conditions changent avant le résultat

Une différence peut venir du prompt, du fichier, de l’accès ou de la règle
d’acceptation plutôt que du modèle. Cette méthode ne cite pas de benchmark public
et ne fournit aucun résultat d’exécution du projet.

## Carte de décision avant le test

Écrivez la carte avant de regarder une sortie :

~~~text
decision_question:
candidate_a / candidate_b:
task_set: three-task-smoke-v1
surface and version:
model or workflow and version:
context and input hashes:
tools, network, permissions:
acceptance rubric and threshold:
red lines:
time budget and retry budget:
cost basis:
reviewer:
allowed conclusion:
~~~

Une ligne rouge franchie signifie `reject` ou `blocked`. Une qualité minimale
manquante ne peut pas être compensée par un coût inférieur. `adopt` n’est permis
que si les résultats sont assez stables dans le périmètre écrit. L’absence de
preuve signifie `continue_test`, pas « meilleur rapport qualité-prix ».

## Figer le jeu de tâches et les conditions

Un jeu réutilisable contient tâches normales, entrées manquantes ou
contradictoires, un échec, un transfert et au moins une tâche de jugement
humain. Chaque tâche possède identifiant, version, contexte, actions permises,
preuve attendue, interdictions et critère de réussite.

Ne supprimez pas une tâche parce qu’un candidat y échoue. Si elle est mal
conçue, créez une nouvelle version et notez pourquoi. Figez :

- le texte, l’entrée expurgée et la version du contexte ;
- modèle, effort, entrée produit et surface ;
- outils, réseau, permissions et budget ;
- répétitions, format, grille et relecteur ;
- baseline, hash de fichiers et méthode de restauration.

Toute différence appartient au journal ; sinon une amélioration apparente peut
simplement venir de plus de fichiers, de temps ou d’autorité.

## Expérience : smoke test de comparabilité à trois tâches

Cette expérience hors ligne, faible risque et reproductible répond seulement à
« faut-il élargir l’évaluation ? ». Elle ne prouve pas qu’un modèle ou un
workflow est généralement meilleur.

### Préparation

Dans une copie temporaire, utilisez le paquet fixe
[`three-task-smoke-v1`](../../evals/candidates/three-task-smoke-v1/README-EN.md).
Il contient entrées synthétiques, sorties attendues, hash, modèle de fiche et
validateur local. Choisissez une seule variable : modèle avec workflow fixe, ou
workflow avec modèle fixe. N’utilisez ni production, ni secrets, ni écriture
réseau, ni commit, ni push, ni publication.

| `task_id` | Entrée fixe | Règle du premier passage |
|---|---|---|
| `extract-01` | Extraire `claim`, `status`, `evidence` d’une note disant « build exit code 0 ; mobile 390px checked ; user acceptance not run » | Trois lignes ; les deux premières `verified`, l’acceptation `unverified`, aucun fait ajouté |
| `markdown-02` | Transformer la note avec les titres `Completed` et `Unverified` | Classification correcte, inconnues conservées, aucun claim ajouté |
| `gap-review-03` | Examiner « la fonctionnalité est terminée parce que le code existe et le build passe » | Signaler l’absence de preuve runtime et d’effet utilisateur ; ne pas dégrader la preuve de build |

Figez textes, entrées, schéma, grille et hash sous `task_set_version: v1`. Les
candidats ont même surface, contexte, outils, permissions, réseau, budget et
relecteur. Exécutez chacun une fois, avec au plus une reprise déclarée, sans
écraser la tentative initiale.

### Tâche

1. **Candidat A :** consignez modèle et workflow réels ; en comparaison de
   workflow, donnez seulement tâche et entrée.
2. **Candidat B :** consignez modèle et workflow réels ; en comparaison de
   workflow, ajoutez seulement le protocole et les règles figés.
3. Exécutez A puis B dans le même ordre et notez le biais ; une étude plus large
   pourra croiser l’ordre.
4. Donnez un `run_id` unique à chaque candidat et tâche. Une reprise reçoit un
   `attempt_id` nouveau et ne remplace pas la sortie initiale.
5. En cas de capacité, permission, hash, outil ou autre dérive, conservez
   l’événement et marquez la ligne `not_comparable`.

### Preuves et fiche d’exécution

Lorsqu’aucun run n’a eu lieu, laissez `not_run` :

~~~yaml
run_id: "19-three-task-smoke-v1-B-extract-01"
attempt_id: "initial"
decision_id: "DEC-19-001"
task_set: "three-task-smoke-v1"
task_id: "extract-01 | markdown-02 | gap-review-03"
candidate_id: "A | B"
surface: "surface réelle et version"
model: "ID réel ou not_run"
workflow: "ID/version réel ou not_run"
started_at: "YYYY-MM-DDThh:mm:ssZ ou not_run"
ended_at: "YYYY-MM-DDThh:mm:ssZ ou not_run"
input_hash: "sha256:... ou not_run"
context_version: "v1"
permissions: "Copie temporaire en lecture seule"
tool_set_and_versions: "réels ou not_run"
network_condition: "Offline"
time_budget: "plafond fixé"
conditions_match: true
timeline:
  - at: "YYYY-MM-DDThh:mm:ssZ"
    event: "request_started | first_output | tool_started | tool_ended | no_event_threshold | retry_started | completed | failed"
cost_value: "valeur réelle ou unavailable"
cost_basis: "facture API | tokens | proxy abonnement | unavailable"
diff: "fichiers, lignes ou aucun changement"
validation: "commande, code retour et sortie clé"
reviewer: "relecteur indépendant ou not_assigned"
first_pass: true
rework_count: 0
score: 0
evidence_completeness: "0/6"
error_category: "none | goal | context | capability | capacity | timeout | permission | implementation | fact | verification | delivery | condition_drift"
comparability: "comparable | not_comparable"
not_comparable_reason: "none ou condition modifiée"
status: "pass | fail | not_comparable | not_run"
~~~

Notez cinq dimensions humaines de 0 à 2 : exactitude, complétude, périmètre,
correspondance aux preuves et arrêt sûr. Le passage demande au moins 8/10, avec
périmètre et arrêt sûr à au moins 1. `first_pass` ne vaut true que si la
première tentative passe sans correction ; une reprise peut passer tout en
restant false.

`evidence_completeness` compte six pièces : entrée, sortie, diff, validation,
score et inconnues. Une pièce manquante diminue le compte. Choisissez une base
de coût avant de comparer. Si l’abonnement ne donne aucun montant, utilisez un
proxy nommé et écrivez la valeur `unavailable`. Ne mélangez pas les bases.

À la fin, produisez un tableau deux candidats × trois tâches et une carte de
décision par candidat : run ID, surface, modèle/workflow, conditions, premier
passage, reprises, durée, coût et base, erreur, comparabilité, score et journal.
Si les six fiches sont incomplètes ou qu’une paire manque, les seules décisions
honnêtes sont `continue_test`, `blocked` ou `not_run`. Un smoke test réussi
autorise seulement « worth expanding » ou « do not expand yet ».

## Variante d’échec

Pendant le run B de `markdown-02`, introduisez une erreur de capacité, permission,
hash ou version d’outil. Arrêtez, gardez la chronologie et la preuve
d’interruption, marquez `not_comparable` et dites s’il faut restaurer les
conditions ou arrêter. Une relance automatique réussie, une cellule vide ou la
sortie de A ne peut pas remplir la ligne.

Autres frontières : validation sans événement au-delà du délai, sortie qui ajoute
des faits absents et candidat meilleur dans une seule classe. Ce ne sont pas des
causes officielles de produit.

## Réflexion

- Quel coût de mise en place le workflow a-t-il ajouté et quel risque a-t-il
  réduit ?
- Quel artefact soutient directement la décision, et lequel n’est qu’une
  observation ?
- Quelle variable pouvait confondre la comparaison ?
- L’échec vient-il de l’objectif, du contexte, du fait, de la permission, de la
  vérification ou de la livraison ?
- Quelles tâches sont couvertes et lesquelles sont hors périmètre ?
- Quelle condition unique changera le prochain tour, et qui la relira ?

## Limites et erreurs fréquentes

- Une démonstration ne prouve ni performance générale, ni coût, ni meilleure
  valeur.
- Un temps court ne compense pas une action non autorisée, une preuve inventée
  ou une forte reprise.
- Une description officielle n’est pas une mesure du projet.
- Un validateur de schéma prouve la forme de la fixture, pas un run ni un
  apprentissage.
- Dès qu’une condition change, créez une nouvelle version ou marquez le run
  incomparable.

## Transfert

Appliquez la fiche à une recherche, une expérience marketing ou un choix de Skill.
Gardez run ID, hash, score et carte. Précisez les métriques transférables,
celles à modifier et une conclusion qui ne se transfère pas.

## Liste d’acceptation

- [ ] Je peux exprimer une préférence avec candidats, portes, lignes rouges et action.
- [ ] Le jeu possède version, entrées fixes, cas normaux, limites, échecs et transfert.
- [ ] Chaque tâche a entrée, règle d’acceptation et run A/B, ou `not_run`.
- [ ] Chaque run a ID, surface, modèle/workflow, conditions, chronologie, diff,
      validation, score et statut.
- [ ] Je distingue premier passage, reprise et résultat final.
- [ ] Je choisis une base de coût et un type d’erreur sans écraser la tentative.
- [ ] Je sais arrêter une expérience quand une condition change.
- [ ] Je peux dire portée, inconnues et prochaine revue.
- [ ] Je n’ai pas présenté une évaluation non exécutée comme résultat vérifié.

## Sources et limite de mise à jour

Les noms de modèles, identifiants, surfaces, disponibilité, coût et compte sont
volatils. `content_status` et `claim_status` sont distincts :

~~~yaml
- claim: "La documentation officielle peut modifier le positionnement ou la disponibilité selon l’entrée, le compte ou la version"
  source: "https://developers.openai.com/api/docs/models/gpt-5.6-luna"
  checked_at: "2026-08-09"
  applies_to: "Entrée API, compte et plage de versions indiqués"
  owner: "evaluation-maintainer"
  next_review: "2026-11-09"
  claim_status: "current at check date"
- claim: "Les conseils sur modèles et surfaces Codex viennent du guide officiel courant"
  source: "https://learn.chatgpt.com/docs/models.md"
  checked_at: "2026-08-09"
  applies_to: "Surfaces Codex/ChatGPT citées ; pas les comptes non déclarés"
  owner: "content-maintainer"
  next_review: "2026-11-09"
  claim_status: "current at check date"
~~~

`evals/task-set-v1.yaml` et `docs/model-evaluation-luna.md` restent
`draft / not_run`. Ce chapitre est `candidate` ; il ne contient ni benchmark ni
résultat exécuté.

## Livraison bornée par les preuves

Après une évaluation, utilisez [Lab 015 : livrer des preuves plutôt qu’une phrase de fin](../labs/lab-015-evidence-delivery-FR.md).
Le Lab 003 tranche les claims indépendamment ; le Lab 015 transmet sans dépasser
les pièces jointes.

## Carte de comparaison en cinq minutes

Avec un seul modèle et une note fictive, comparez deux consignes : A demande
trois actions ; B exige les mêmes actions, marque les propriétaires ou dates
manquants par `[à confirmer]`, n’invente rien et cite la phrase justificative.
Notez entrées, sorties et scores sur faits conservés, inconnues, traçabilité,
périmètre et arrêt sûr. Une meilleure sortie B justifie un nouvel essai borné,
pas une conclusion sur l’intelligence ou la productivité.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="18-content-design-data-automation-FR.md" aria-label="Chapitre précédent : Chapitre 18 · Contenu, design, données et automatisation">← Précédent<br><strong>Chapitre 18 · Contenu, design, données et automatisation</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="20-personal-codex-work-system-FR.md" aria-label="Chapitre suivant : Chapitre 20 · Construire son système de travail Codex">Suivant →<br><strong>Chapitre 20 · Construire son système de travail Codex</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
