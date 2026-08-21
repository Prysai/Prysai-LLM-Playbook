<!-- content_id: chapter-05-choose-the-codex-surface | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

# Chapitre 5 : Choisir la bonne surface Codex

**Statut :** `candidate` · **Expérience :** `not_run`  
Ce chapitre propose une méthode de décision. Il ne promet pas qu’un compte,
un modèle ou un mode d’exécution précis est disponible partout.

## Le problème

Le même objectif peut commencer dans une application de bureau, un terminal,
une extension d’IDE ou une interface web. Il peut toucher un dossier local, un
worktree isolé ou un environnement distant. Choisir la surface avant de
clarifier le travail revient à confondre le lieu, l’outil et l’autorité.

## Objectifs d’apprentissage

- distinguer surface de travail, point d’entrée et environnement d’exécution ;
- choisir une surface à partir du risque et du résultat attendu ;
- écrire une carte de décision avant la première action ;
- prévoir une solution de repli quand une capacité manque.

## Problèmes de terrain

Une même demande peut être préparée dans un chat, exécutée localement ou envoyée vers un service distant. Si l’on ne distingue pas ces lieux, on peut attribuer à l’interface un accès ou un effet qu’elle n’a pas.

## 1. Trois couches souvent confondues

La **surface de travail** est l’endroit où des fichiers ou commandes peuvent
être observés. Le **point d’entrée** est la manière dont une personne commence
et relit la tâche. L’**environnement** précise la copie, le compte, les outils,
le réseau et les protections réellement présents.

Un nom de produit ne décrit aucune de ces couches à lui seul. Écrivez-les
explicitement dans le contrat de tâche.

## 2. Une capacité est une chaîne

Pour dire qu’une tâche est faisable, il faut au moins :

```text
objectif → contexte lisible → surface correcte → autorité suffisante
→ action observable → contrôle → livraison ou arrêt
```

Un écran de connexion n’est pas une preuve d’accès au bon dépôt. Une réponse
proposée n’est pas un changement local. Une exécution locale n’est pas une
publication distante.

## 3. Cinq portes avant de choisir

1. **Contexte :** les entrées utiles sont-elles accessibles sans données
   superflues ?
2. **Isolation :** la tâche possède-t-elle une copie sûre et récupérable ?
3. **Effet :** l’action est-elle seulement locale ou crée-t-elle un effet
   durable ?
4. **Preuve :** quel diff, journal ou état final permettra la relecture ?
5. **Récupération :** que fera-t-on après une panne ou un état inconnu ?

Plus le risque est grand, plus il faut une surface qui rende ces cinq réponses
visibles. Une interface plus riche n’est pas automatiquement un meilleur choix.

## 4. La carte de décision

```text
Résultat observable :
Surface envisagée :
Copie et fichiers autorisés :
Outils et accès nécessaires :
Effets externes possibles :
Contrôle avant livraison :
Repli si la surface échoue :
Condition d’arrêt :
```

Remplissez la carte avant de demander une installation ou une publication.
Demandez au système de signaler le champ qu’il ne peut pas confirmer.

## Expérience : trois cartes pour un même résultat

### Préparation

Prenez une petite correction de texte dans un dossier jetable. N’utilisez ni
secret ni dépôt de production.

### Tâche

Écrivez une carte pour un chat textuel, une surface locale avec terminal et une
surface distante hypothétique. Comparez les entrées, les effets et les preuves
nécessaires avant de recommander l’une d’elles.

### Preuve

Conservez les trois cartes et notez la cible, l’autorité, l’effet possible et le
contrôle qui justifie votre choix.

### Échec et limite

Si une surface demande une permission persistante alors que le résultat peut
être obtenu localement, rétrogradez vers la surface locale. L’exercice ne
mesure ni la vitesse ni la qualité générale d’un produit.

### Réflexion

Quelle porte de décision a éliminé la surface la plus risquée ? Qu’est-ce qui reste à vérifier dans votre environnement ?

## Transfert

Utilisez la même carte pour une recherche, une revue de contenu ou une tâche de
design. La surface change ; les limites, la preuve et le repli restent.

## Liste de contrôle d’acceptation

- [ ] Je sais où l’action se déroule réellement.
- [ ] Les entrées et l’autorité sont limitées à la tâche.
- [ ] La preuve attendue est définie avant l’action.
- [ ] Un repli local ou une condition d’arrêt est écrit.
- [ ] Je n’ai pas déduit une capacité d’un simple écran de connexion.

## Sources et limite de mise à jour

Les noms, options et limites propres à Codex évoluent. Vérifiez chaque fait
volatile dans la documentation officielle de la surface utilisée et notez la
date d’accès. Cette traduction reste `in-progress / candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="04-context-permissions-and-agent-FR.md" aria-label="Chapitre précédent: Chapitre 4 · Contexte, autorisations et Agent">← Précédent<br><strong>Chapitre 4 · Contexte, autorisations et Agent</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="06-model-selection-FR.md" aria-label="Chapitre suivant: Chapitre 6 · Choisir un modèle">Suivant →<br><strong>Chapitre 6 · Choisir un modèle</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
