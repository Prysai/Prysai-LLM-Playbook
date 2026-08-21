<!-- content_id: chapter-16-engineering-track | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

# Chapitre 16 : Ingénierie, de l’idée au logiciel fiable

**Statut :** `candidate` · **Expérience :** `not_run`  
Un code qui compile n’est pas encore une livraison utilisable.

## Le problème

Commencer à coder avant de fixer les exigences, les tests, l’observation du
environnement d’exécution et le repli créent des correctifs qui semblent terminés mais échouent sur
le vrai parcours utilisateur.

## Objectifs d’apprentissage

- spécifier avant d’implémenter ;
- travailler par tranche verticale ;
- utiliser les tests et le rendu comme preuves distinctes ;
- prévoir diagnostic, rollback et limite d’autorité.

## Problèmes de terrain

Le compilateur, les tests unitaires, le navigateur, l’accessibilité et la
publication répondent à des questions différentes. Ne remplacez pas l’un par
l’autre.

## Cycle d’ingénierie

```text
spécifier → inspecter → implémenter petit → tester → rendre → relire
→ livrer ou revenir en arrière
```

Une prévisualisation est une hypothèse sur l’environnement d’exécution ; le test visuel vérifie
le parcours réel, pas seulement l’existence des fichiers.

## Expérience : direct contre cycle complet

### Préparation

### Tâche

Dans une copie jetable, choisissez trois petites tâches fixes. Faites une
tentative directe puis une tentative avec définition, plan, contrôle et revue.

### Preuve

Conservez les diffs, commandes, sorties, erreurs, relectures et changements de
condition. Ne transformez pas trois tâches en classement universel.

### Échec et limite

Introduisez une entrée manquante ou un contrôle qui échoue ; diagnostiquez avant
d’ajouter du code. L’exercice ne prouve pas un gain général.

### Réflexion
## Transfert

Quel point de contrôle a empêché le plus gros détour ? Transférez le cycle à une
transformation de données ou une page documentaire.

## Liste de contrôle d’acceptation

- [ ] Le critère utilisateur précède le code.
- [ ] Une tranche complète est testable et récupérable.
- [ ] Environnement d’exécution, test et rendu sont séparés.
- [ ] Les erreurs sont conservées avant correction.
- [ ] La livraison contient un rollback ou une raison d’arrêt.

## Sources et limite de mise à jour

Vérifiez les versions, frameworks et commandes dans leur documentation
officielle. Traduction `in-progress / candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="15-research-track-FR.md" aria-label="Chapitre précédent: Chapitre 15 · Recherche vérifiable">← Précédent<br><strong>Chapitre 15 · Recherche vérifiable</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="17-marketing-track-FR.md" aria-label="Chapitre suivant: Chapitre 17 · Marketing et expériences">Suivant →<br><strong>Chapitre 17 · Marketing et expériences</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
