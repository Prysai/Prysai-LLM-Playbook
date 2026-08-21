<!-- content_id: chapter-07-skills-plugins-and-tools | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

# Chapitre 7 : Skills, Plugins, MCP et outils : répartir le travail

**Statut :** `candidate` · **Comparaison :** `not_run`  
Les exemples expliquent comment choisir une capacité. Ils ne prouvent pas qu’un
Skill externe a été chargé ou exécuté par un hôte donné.

## Le problème

« Il me faut un Skill » n’est pas toujours le bon diagnostic. Un document, un
script, un outil, un serveur MCP et un Plugin n’ont ni le même rôle, ni la même
surface de risque, ni la même responsabilité de maintenance.

## Objectifs d’apprentissage

- partir du manque concret plutôt que du nom d’une technologie ;
- distinguer découverte, installation, chargement, comportement et adoption ;
- examiner les entrées, la licence, les permissions et les effets externes ;
- composer le plus petit ensemble de capacités qui suffit.

## Problèmes de terrain

Un catalogue peut rendre une capacité visible sans expliquer sa licence, ses dépendances ou ses effets. Installer parce qu’un nom paraît familier augmente le risque avant même que le besoin soit défini.

## 1. Quatre couches de capacité

Un **document** explique. Un **script** exécute une procédure déterministe. Un
**outil** expose une opération à l’hôte. Un **Skill** organise une méthode
réutilisable. Un **Plugin** peut regrouper du code et plusieurs points
d’intégration. MCP décrit un protocole d’échange ; il ne garantit ni la
fiabilité ni l’autorité du serveur.

## 2. Commencer par le manque

Écrivez d’abord :

```text
Résultat manquant :
Entrée disponible :
Répétition observée :
Capacité minimale envisagée :
Permission supplémentaire :
Preuve de réussite :
```

Si le travail n’est pas répétitif, un prompt borné ou une checklist peut être
plus sûr qu’une installation persistante.

## 3. Le dossier de pré-adoption

Avant d’activer une capacité externe, conservez sa référence exacte, sa
révision, sa licence, ses dépendances, ses chemins de lecture et d’écriture,
son besoin réseau, sa politique de secrets, son propriétaire et son plan de
retrait. Une page de catalogue prouve seulement la découverte.

## 4. Cinq états à ne pas confondre

```text
existe → découvrable → installé → chargé → comportement observé → adopté
```

Chaque flèche demande sa propre preuve. Une installation réussie ne prouve pas
que le Skill a été déclenché ; un déclenchement ne prouve pas qu’il doit être
adopté par une équipe.

## Expérience : comparer trois combinaisons

### Préparation

Utilisez deux procédures fictives et une note de contrôle dans un dossier
jetable. Aucun téléchargement, secret ou compte n’est requis.

### Tâche

Comparez une checklist seule, un script déterministe et un Skill hypothétique.
Évaluez le périmètre, la preuve, le coût de maintenance et le risque d’effet
externe. Ne concluez pas sur la qualité d’un outil que vous n’avez pas exécuté.

### Preuve

Gardez la grille, les entrées, la décision et les champs non vérifiés. La fiche
d’un candidat ne remplace pas une observation de son comportement.

### Échec et limite

Si un candidat demande un fichier `.env`, un envoi ou une permission inutile,
marquez-le `blocked` et ne satisfaites pas la demande. L’exercice ne prouve ni
la compatibilité universelle ni la sécurité d’un dépôt externe.

### Réflexion

Quel manque concret a justifié la capacité choisie ? Quelle preuve faudrait-il avant de l’adopter ?

## Transfert

Utilisez cette grille pour un connecteur, un serveur MCP ou une extension d’IDE.
Gardez séparées l’existence, la capacité, l’autorité, l’observation et la
décision d’adoption.

## Liste de contrôle d’acceptation

- [ ] Le problème métier est décrit sans commencer par un nom d’outil.
- [ ] La révision et la licence sont conservées.
- [ ] Les chemins, secrets, réseau et effets sont explicités.
- [ ] Un état `blocked` est possible et documenté.
- [ ] Le retrait et le propriétaire sont connus avant l’activation.

## Sources et limite de mise à jour

Les interfaces et protocoles externes changent. Vérifiez leurs documentations
officielles et les licences des fichiers réellement utilisés. La traduction
française reste `in-progress / candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="06-model-selection-FR.md" aria-label="Chapitre précédent: Chapitre 6 · Choisir un modèle">← Précédent<br><strong>Chapitre 6 · Choisir un modèle</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="08-full-lifecycle-workflow-FR.md" aria-label="Chapitre suivant: Chapitre 8 · De la définition à la livraison">Suivant →<br><strong>Chapitre 8 · De la définition à la livraison</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
