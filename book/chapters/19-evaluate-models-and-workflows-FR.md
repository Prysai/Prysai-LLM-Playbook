<!-- content_id: chapter-19-evaluate-models-and-workflows | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

# Chapitre 19 : Évaluer modèles et workflows, des impressions aux preuves

**Statut :** `candidate` · **Expérience :** `not_run`  
Les fixtures du dépôt ne contiennent pas de journaux de comparaison exécutés.

## Le problème

« Ce modèle est plus intelligent » ou « ce Skill est plus fiable » mélange
observation et conclusion. Le contexte, les outils, les permissions, la tâche
et la relecture humaine changent le résultat.

## Objectifs d’apprentissage

- définir l’objet exact de l’évaluation ;
- geler les tâches et les conditions ;
- enregistrer les résultats et les désaccords ;
- limiter la conclusion à ce qui a été observé.

## Problèmes de terrain

Changer le prompt, le contexte ou la version au milieu de l’essai rend les
sorties incomparables. Notez toute dérive au lieu de la cacher dans la moyenne.

## Carte d’évaluation

```text
Question de décision :
Jeu de tâches fixe :
Conditions communes :
Critères et seuils :
Sorties brutes et relecture :
Désaccords / inconnues :
Conclusion autorisée :
```

## Expérience : trois tâches modestes

### Préparation

### Tâche

Comparez deux configurations sur extraction, reformulation et repérage d’une
information absente. Gardez les entrées, sorties, corrections et temps observés.

### Preuve

### Échec et limite

Si une condition diffère, marquez la ligne `incomparable`. Trois tâches ne
peuvent pas établir un classement général, une causalité ou un gain de
productivité.

### Réflexion
## Transfert

Quelle mesure répond réellement à la décision ? Réutilisez la carte pour deux
prompts dans un seul modèle.

## Liste de contrôle d’acceptation

- [ ] La question de décision est écrite avant les résultats.
- [ ] Les tâches, versions et conditions sont gelées.
- [ ] Les sorties brutes et la relecture sont conservées.
- [ ] Les dérives et désaccords sont visibles.
- [ ] La conclusion ne dépasse pas son échantillon.

## Sources et limite de mise à jour

Les versions, coûts et limites de modèles sont volatils. Vérifiez les
documentations officielles. Traduction `in-progress / candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="18-content-design-data-automation-FR.md" aria-label="Chapitre précédent: Chapitre 18 · Contenu, design, données">← Précédent<br><strong>Chapitre 18 · Contenu, design, données</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="20-personal-codex-work-system-FR.md" aria-label="Chapitre suivant: Chapitre 20 · Système de travail Codex">Suivant →<br><strong>Chapitre 20 · Système de travail Codex</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
