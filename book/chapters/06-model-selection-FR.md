<!-- content_id: chapter-06-model-selection | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

# Chapitre 6 : Choisir un modèle sans idolâtrer le modèle

**Statut :** `candidate` · **Comparaison :** `not_run`  
La méthode ci-dessous aide à construire une comparaison ; elle ne fournit ni
classement universel ni mesure de performance déjà exécutée.

## Le problème

« Utilise le meilleur modèle » n’est pas une décision exploitable. Le bon choix
dépend de la tâche, des entrées, du niveau de risque, de la disponibilité, du
coût, de la latence, des outils et du contrôle humain possible.

## Objectifs d’apprentissage

- définir la tâche avant de parler de modèle ;
- séparer fournisseur, modèle, surface et configuration ;
- comparer des sorties avec un jeu fixe et une grille explicite ;
- refuser une conclusion plus large que les observations.

## Problèmes de terrain

Une démonstration peut donner l’impression qu’un modèle est « le meilleur » sans indiquer la tâche, la version, le contexte ni le critère de réussite. La décision doit rester limitée à ce qui a réellement été comparé.

## 1. Le choix est une configuration

Une comparaison honnête fixe au minimum : le texte d’entrée, le contexte, la
version ou l’identifiant du modèle, les outils autorisés, les réglages visibles,
le temps d’exécution, le critère d’acceptation et la personne qui relit.

La disponibilité vient avant la qualité. Un modèle indisponible, trop lent ou
incompatible avec la frontière de données n’est pas une option pratique, même
si une démonstration le présente comme excellent.

## 2. Décider dans le bon ordre

1. Classez la tâche : génération, extraction, transformation, raisonnement,
   recherche ou action.
2. Fixez les données et les effets acceptables.
3. Choisissez deux ou trois candidats réellement accessibles.
4. Définissez les erreurs qui comptent le plus.
5. Décidez ce qui ferait arrêter la comparaison.

## 3. Carte de candidat

```text
Tâche fixe :
Entrées et contexte :
Candidats et versions :
Outils / permissions :
Critères d’acceptation :
Erreur critique :
Mesure conservée :
Condition d’arrêt :
```

Une carte incomplète est une raison de demander une information, pas de remplir
le vide avec une préférence de marque.

## Expérience : une comparaison de trois tâches

### Préparation

Choisissez trois tâches fictives et réversibles : extraire des faits, reformuler
un paragraphe et repérer une information absente. N’envoyez aucune donnée
confidentielle.

### Tâche

Utilisez la même entrée et le même critère pour chaque candidat. Gardez les
sorties brutes, les corrections humaines, le temps observé et les inconnues.
Indiquez toute variation de contexte ou d’outil.

### Preuve

Conservez les sorties brutes, les corrections et la grille remplie pour chaque
candidat. Une absence de mesure reste `not_run`, pas une conclusion.

### Échec et limite

Si un candidat reçoit une aide différente, marquez la comparaison comme
`incomparable`. Trois petites tâches ne démontrent ni supériorité générale ni
gain de productivité.

### Réflexion

Quelle variable a le plus changé la décision ? Quelle conclusion serait injustifiée avec ce petit échantillon ?

## Transfert

Reprenez la carte pour comparer deux prompts dans un seul modèle. Le protocole
reste identique ; vous changez une seule variable à la fois.

## Liste de contrôle d’acceptation

- [ ] La tâche et le jeu d’entrées sont gelés avant la comparaison.
- [ ] Les versions, outils et permissions sont consignés.
- [ ] Les critères d’erreur sont définis avant de voir les sorties.
- [ ] Les conditions différentes sont signalées.
- [ ] La conclusion est limitée au périmètre réellement observé.

## Sources et limite de mise à jour

Les tarifs, limites, noms de modèles et fonctions évoluent. Utilisez les pages
officielles du fournisseur avec URL, date d’accès et périmètre. Cette traduction
reste `in-progress / candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="05-choose-the-codex-surface-FR.md" aria-label="Chapitre précédent: Chapitre 5 · Choisir son interface Codex">← Précédent<br><strong>Chapitre 5 · Choisir son interface Codex</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="07-skills-plugins-and-tools-FR.md" aria-label="Chapitre suivant: Chapitre 7 · Skills, Plugins, MCP et outils">Suivant →<br><strong>Chapitre 7 · Skills, Plugins, MCP et outils</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
