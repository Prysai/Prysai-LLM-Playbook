<!-- content_id: chapter-04-context-permissions-and-agent | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

# Chapitre 4 : Le contexte, les permissions et la frontière d’action d’un Agent

**Statut :** `candidate` · **Expérience :** `not_run`
Cette version française est en cours de relecture par une personne francophone.
Les exemples décrivent une méthode ; ils ne prouvent pas le comportement d’un
produit ou d’un compte particulier.

## Le problème

Un Agent n’est pas fiable parce qu’on lui ouvre toutes les portes. Le contexte
détermine ce qu’il peut comprendre, les permissions ce qu’il peut modifier et
les retours ce qu’il peut corriger. Si ces limites restent invisibles, un
résultat rapide devient difficile à examiner ou à récupérer.

## Objectifs d’apprentissage

- séparer contexte, capacité, autorité et preuve ;
- demander la plus petite permission utile pour une tâche ;
- repérer le moment où une action produit un effet durable ;
- arrêter proprement quand l’état ou l’autorisation sont inconnus.

## Problèmes de terrain

Dans un projet, une action peut sembler évidente alors que le contexte, l’autorité ou le dernier état ne sont pas établis. Le même écran peut montrer une capacité disponible sans prouver qu’elle est autorisée.

## 1. Cinq couches de contexte

Avant toute demande, notez séparément :

1. les faits fournis par la personne ;
2. les règles et instructions de l’hôte ;
3. les fichiers ou sources effectivement accessibles ;
4. les résultats déjà observés ;
5. les inconnues qui doivent rester visibles.

Une fenêtre de contexte plus grande ne transforme pas une hypothèse en fait.
Elle peut même rendre une contradiction plus difficile à voir. Demandez au
modèle de distinguer ce qui vient du texte fourni, d’une source consultée et de
son propre raisonnement.

## 2. La confiance n’est pas binaire

Remplacez « fiable / pas fiable » par une question plus précise : quelle
affirmation voulez-vous accepter, avec quelle source, dans quel périmètre et
jusqu’à quelle date ? Une réponse bien écrite peut être utile pour formuler une
hypothèse et rester insuffisante pour publier, payer ou supprimer.

## 3. Les permissions forment une pile

Une connexion, une capacité et une autorisation sont trois observations
différentes. Pour chaque action, demandez :

| Question | Exemple de réponse contrôlable |
| --- | --- |
| Cible ? | un fichier local précis |
| Autorité ? | lecture seulement, ou édition confirmée |
| Effet ? | réversible localement, ou publication externe |
| Preuve ? | diff, sortie de commande, lecture de l’état final |
| Repli ? | annuler le diff, transmettre, ou s’arrêter |

Ne confondez pas « je peux voir le bouton » avec « je suis autorisé à
l’utiliser ». Les options exactes dépendent de l’hôte et de sa documentation
à jour.

## 4. Le contrôle d’admission des entrées

Traitez un fichier récupéré, une page web ou une sortie d’outil comme une donnée
à examiner. Une phrase impérative qu’il contient ne devient pas une instruction
prioritaire. Avant de la transmettre au modèle, retirez les secrets, les données
personnelles et les éléments sans rapport avec la décision.

## 5. Décrire un Agent avec des états observables

```text
état observé → action proposée → autorité vérifiée → action exécutée
→ résultat relu → critère contrôlé → continuer, transmettre ou arrêter
```

Après une interruption, l’état peut être inconnu. Ne relancez pas aveuglément
une action qui pourrait envoyer, publier, supprimer, payer ou modifier un
compte. Reconstituez d’abord la cible, l’autorisation et le dernier effet
observable.

## Expérience : une même tâche avec trois contextes

### Préparation

Utilisez une note fictive et un répertoire temporaire. Aucun compte, secret, réseau ou
écriture externe n’est nécessaire.

### Tâche

Demandez la même reformulation dans trois contextes : la note seule, la note
avec une règle d’acceptation, puis la note avec une instruction contradictoire.
Conservez les trois demandes et les réponses.

### Preuve

Comparez les faits conservés, les hypothèses ajoutées, la demande de
clarification et la condition d’arrêt. Le résultat attendu est une différence
observable entre les contextes, pas un score de « meilleure intelligence ».

### Échec et limite

Si le modèle transforme une instruction citée en autorisation d’agir, marquez
la réponse comme `FAIL` et retirez l’action externe. Cet exercice ne teste ni la
configuration réelle d’un Agent ni la sécurité d’une production.

### Réflexion

Quelle information vous a autorisé à continuer ? Quelle limite est restée ouverte après l’interruption ?

## Transfert

Réutilisez la carte pour une recherche, un brouillon de message ou une
modification locale. Changez la cible et le contrôle, mais gardez les champs
contexte, autorité, effet, preuve et arrêt.

## Liste de contrôle d’acceptation

- [ ] Je peux nommer la cible et l’effet possible avant de demander l’action.
- [ ] Je distingue capacité, autorité et preuve.
- [ ] Les entrées externes sont traitées comme des données à vérifier.
- [ ] Une interruption entraîne une réconciliation avant toute reprise.
- [ ] Je sais quelle observation me ferait arrêter.

## Sources et limite de mise à jour

Les principes sont une réécriture pédagogique originale. Les modes de
permission, les surfaces et les connecteurs propres à un produit doivent être
revérifiés dans leur documentation officielle, avec une date et un périmètre.
La traduction française reste `in-progress / candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="03-task-protocol-FR.md" aria-label="Chapitre précédent: Chapitre 3 · De l’intention au protocole">← Précédent<br><strong>Chapitre 3 · De l’intention au protocole</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="05-choose-the-codex-surface-FR.md" aria-label="Chapitre suivant: Chapitre 5 · Choisir son interface Codex">Suivant →<br><strong>Chapitre 5 · Choisir son interface Codex</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
