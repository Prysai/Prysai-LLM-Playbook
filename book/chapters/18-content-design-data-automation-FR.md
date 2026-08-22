<!-- content_id: chapter-18-content-design-data-automation | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

# Chapitre 18 : Contenu, design, données et automatisation

**Statut :** `candidate` · **Expérience :** `not_run`  
L’existence d’un fichier ou d’un script ne prouve pas que le livrable est lisible,
accessible ou publiable.

## Le problème

Les workflows riches peuvent masquer un écran cassé, un graphique trompeur, une
licence absente, une écriture dupliquée ou une permission excessive.

## Objectifs d’apprentissage

- commencer par la forme finale et son public ;
- choisir les capacités par niveau de risque ;
- inspecter données, rendu, accessibilité et licence ;
- garder une automatisation répétable et réversible.

## Problèmes de terrain

Un CSV produit n’est pas une décision ; une image générée n’est pas une page
relue. Définissez le dernier artefact observable avant d’activer un outil.

## Carte de livrable

```text
Public et usage :
Forme finale :
Sources et droits :
Données minimales :
Contrôles de contenu et de rendu :
Effet externe :
Rollback :
```

## Expérience : une capacité à la fois

### Préparation

Préparez dans un dossier temporaire une petite table fictive, son dictionnaire
de colonnes, le public visé et la forme finale souhaitée. Notez la licence de
la table et de chaque image utilisée. Choisissez un format de sortie précis,
par exemple un graphique accompagné d’une note de cinq phrases et d’un texte
alternatif.

### Tâche

Dans un dossier jetable, transformez une table fictive en graphique puis en
note courte. Demandez à l’outil de décrire les transformations avant de les
faire. Inspectez ensuite les valeurs, les unités, le rendu sur petit écran, le
texte alternatif, les contrastes, les droits et la possibilité de refaire ou
d’annuler l’opération.

### Preuve

Gardez l’entrée, le script ou prompt utilisé, la sortie brute et une fiche de
contrôle :

```text
valeurs et unités vérifiées : PASS / FAIL / UNSURE
message visuel fidèle aux données : PASS / FAIL / UNSURE
texte alternatif et lecture mobile : PASS / FAIL / UNSURE
source, licence et attribution : PASS / FAIL / UNSURE
répétition et retour arrière : PASS / FAIL / UNSURE
```

Le fichier final ne doit pas masquer les contrôles qui ont échoué.

### Échec et limite

Conservez l’entrée, la sortie et les contrôles. Si le graphique suggère une
conclusion absente des données, marquez-le `FAIL` et corrigez la source avant le
style. L’exercice ne prouve pas l’accessibilité universelle.

### Réflexion

- Quel défaut le rendu visuel a-t-il révélé alors que la table semblait correcte ?
- Quelle capacité était vraiment nécessaire, et laquelle ajoutait seulement du risque ?
- Que faudrait-il encore vérifier avant une publication réelle ?
- Comment une autre personne pourrait-elle refaire l’opération sans votre mémoire ?

## Transfert

Quel contrôle a détecté un problème que le script ne pouvait pas voir ?
Réutilisez la carte pour une présentation ou une automatisation sans publication.

## Liste de contrôle d’acceptation

- [ ] La forme finale et le public sont connus.
- [ ] Les données et licences sont traçables.
- [ ] Le rendu, le texte et l’accessibilité sont inspectés.
- [ ] L’automatisation peut être répétée et annulée.
- [ ] La publication reste une étape séparée.

## Sources et limite de mise à jour

Les outils, formats et règles de licence évoluent. Consultez les sources
officielles et conservez la date. Traduction `in-progress / candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="17-marketing-track-FR.md" aria-label="Chapitre précédent: Chapitre 17 · Marketing et expériences">← Précédent<br><strong>Chapitre 17 · Marketing et expériences</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="19-evaluate-models-and-workflows-FR.md" aria-label="Chapitre suivant: Chapitre 19 · Évaluer modèles et workflows">Suivant →<br><strong>Chapitre 19 · Évaluer modèles et workflows</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
