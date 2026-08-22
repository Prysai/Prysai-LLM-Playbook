<!-- content_id: chapter-21-team-capability-system | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

# Chapitre 21 : Construire une capacité d’équipe

**Statut :** `candidate` · **Expérience :** `not_run`  
L’exercice est une simulation statique : il n’autorise, ne connecte et ne
publie rien.

## Le problème

Une habitude personnelle n’est pas encore une capacité d’équipe. Il faut un
propriétaire, une version, des entrées, une limite d’autorité, une preuve, une
revue et un plan de retrait.

## Objectifs d’apprentissage

- emballer une méthode pour une personne qui n’était pas présente ;
- répartir responsabilité et permissions ;
- tester une reproduction en contexte vierge ;
- faire évoluer ou retirer le paquet sans perdre les preuves.

## Problèmes de terrain

Une réussite racontée oralement cache souvent les données, les décisions et les
limites qui la rendaient possible.

## Contrat de capacité

```text
Propriétaire · version · objectif · entrées · sortie
permissions minimales · contrôles · incidents · prochain examen · rollback
```

## Expérience : deux reproductions

### Préparation

Préparez un dossier de simulation avec une tâche hebdomadaire fictive, deux
rôles anonymisés, un propriétaire et une date de revue. Définissez une entrée
qui ne contient aucune donnée client, la sortie attendue, les permissions
minimales et un point de retrait. La personne qui reproduit le paquet ne doit
pas avoir besoin d’une explication orale.

### Tâche

Utilisez une tâche hebdomadaire fictive et deux rôles anonymes. Créez une v0.1,
faites deux reproductions dans un contexte vierge, puis modifiez une exigence
en v0.2. Demandez à chaque personne de signaler ce qu’elle a compris, ce qui
manquait et la permission qu’elle aurait refusée.

### Preuve

Réunissez la fiche de capacité, les versions, les diffs, les deux traces de
reproduction, la relecture et les éléments non vérifiés. Pour chaque étape,
notez l’entrée, l’action autorisée, la sortie, le contrôle et la décision :

```text
run-id | version | rôle | entrée | sortie | contrôle | décision | inconnue
```

Une reproduction réussie dans la simulation ne prouve ni l’adoption d’équipe ni
la sécurité d’un environnement réel.

### Échec et limite

Conservez versions, diffs, décisions et relectures. Si le propriétaire ou la
permission manque, bloquez la livraison. Une simulation ne prouve pas
l’adoption organisationnelle.

### Réflexion

- Quelle connaissance était uniquement dans la tête de la première personne ?
- Quelle permission était plus large que la tâche ?
- Qu’est-ce qui a changé entre v0.1 et v0.2, et où ce changement est-il prouvé ?
- Qui peut corriger, suspendre ou retirer le paquet si son propriétaire disparaît ?

## Transfert

Quelle connaissance était seulement dans la tête d’une personne ? Transférez le
format à une équipe de recherche ou de contenu.

## Liste de contrôle d’acceptation

- [ ] Le propriétaire et le périmètre sont nommés.
- [ ] La reproduction part d’un contexte vierge.
- [ ] Les permissions sont minimales et vérifiables.
- [ ] La version, la revue et le rollback existent.
- [ ] Les résultats restent limités à la simulation.

## Sources et limite de mise à jour

Les règles d’organisation et d’accès sont propres à chaque équipe. Documentez
leur source et leur date. Traduction `in-progress / candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="20-personal-codex-work-system-FR.md" aria-label="Chapitre précédent: Chapitre 20 · Système de travail Codex">← Précédent<br><strong>Chapitre 20 · Système de travail Codex</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="22-continuous-update-and-future-proofing-FR.md" aria-label="Chapitre suivant: Chapitre 22 · Mise à jour et récupération">Suivant →<br><strong>Chapitre 22 · Mise à jour et récupération</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
