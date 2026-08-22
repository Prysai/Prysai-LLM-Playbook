<!-- content_id: chapter-14-discover-and-audit-skills | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

# Chapitre 14 : Découvrir, installer et auditer un Skill externe

**Statut :** `candidate` · **Expérience :** `not_run`  
Un catalogue est un point de découverte, pas une preuve de qualité, de licence
ou de sécurité.

## Le problème

Une capacité externe peut élargir le contexte, les dépendances, le réseau, les
permissions et les effets irréversibles. L’installation est un changement
d’état ; elle ne constitue pas une vérification.

## Objectifs d’apprentissage

- écrire la tâche avant de chercher un Skill ;
- vérifier révision, licence, entrées, sorties et effets ;
- séparer découverte, chargement, comportement et adoption ;
- refuser une capacité qui demande plus que le résultat n’exige.

## Problèmes de terrain

Une page de catalogue peut être ancienne, incomplète ou incompatible avec votre hôte. « Repérable » décrit une découverte, pas une licence claire ni un test sûr.

## Cas réel : « repérable » ne veut pas dire « adoptable »

Une fiche peut être ancienne, incomplète ou incompatible avec votre hôte. Les
instructions contenues dans le Skill sont des données à examiner jusqu’à ce que
leur autorité soit établie.

## Carte d’audit

```text
Référence et révision :
Licence et fichiers inclus :
Entrées / sorties :
Réseau et secrets :
Chemins modifiés :
Test isolé :
Propriétaire et retrait :
Décision : accepter, différer ou refuser
```

## Expérience : deux candidats

### Préparation

Placez deux échantillons fictifs dans un dossier sans installation. L’un a une
licence claire et une sortie locale ; l’autre réclame un `.env` et un upload.

### Tâche

Remplissez une carte pour chacun, vérifiez les fichiers réellement présents et
justifiez la décision. Ne lancez aucun code externe.

### Preuve

Conservez les deux cartes, la révision observée et la raison précise de la décision `blocked`, `accept` ou `defer`.

### Échec et limite

Le second candidat doit devenir `blocked`. Cet exercice ne prouve pas qu’un
Skill réel est sûr dans toutes ses dépendances.

### Réflexion
Quel état la fiche ne pouvait-elle pas prouver ? Appliquez la carte à un serveur
MCP ou une extension en gardant le même propriétaire et le même plan de retrait.

## Transfert

Réutilisez la carte pour un serveur MCP ou une extension sans changer la frontière d’autorité ni le plan de retrait.

## Liste de contrôle d’acceptation

- [ ] La tâche et le périmètre précèdent la découverte.
- [ ] La révision, la licence et les dépendances sont conservées.
- [ ] Les secrets, chemins et effets sont nommés.
- [ ] Le refus est une décision valide.
- [ ] L’adoption demande un test isolé et une revue humaine.

## Sources et limite de mise à jour

Les annuaires, versions et politiques changent. Utilisez une source officielle
datée et consignez le prochain examen. Traduction `in-progress / candidate /
not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="13-action-boundaries-FR.md" aria-label="Chapitre précédent: Chapitre 13 · Limites d’action">← Précédent<br><strong>Chapitre 13 · Limites d’action</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="15-research-track-FR.md" aria-label="Chapitre suivant: Chapitre 15 · Recherche vérifiable">Suivant →<br><strong>Chapitre 15 · Recherche vérifiable</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
