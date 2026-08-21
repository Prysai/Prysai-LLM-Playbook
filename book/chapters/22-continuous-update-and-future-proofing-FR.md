<!-- content_id: chapter-22-continuous-update-and-future-proofing | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

# Chapitre 22 : Mettre à jour sans perdre la possibilité de revenir en arrière

**Statut :** `candidate` · **Expérience :** `not_run`  
L’exercice se déroule dans une copie jetable, sans credentials, push ni release.

## Le problème

Les modèles, surfaces, permissions et services évoluent. Une méthode sans
source, portée, date de revue et rollback devient trompeuse au fil du temps.

## Objectifs d’apprentissage

- séparer principes stables et faits volatils ;
- décider de mettre à jour, conserver, bloquer ou retirer ;
- lier chaque changement à une source et à un impact ;
- publier une note de migration compréhensible.

## Problèmes de terrain

Une nouvelle fonction peut modifier les coûts, l’autorité, le format ou la
récupération. Vérifiez d’abord ce qui a réellement changé.

## Carte de maintenance

```text
Fait et version · source · portée · propriétaire · impact
test de régression · décision · date de revue · rollback
```

## Expérience : traiter un changement hypothétique

### Préparation

### Tâche

Choisissez une fonction fictive qui change une permission ou un format. Mettez à
jour la carte, identifiez les pages touchées, écrivez un test et préparez un
rollback sans l’exécuter dans un service réel.

### Preuve

### Échec et limite

Si la source ou la portée est inconnue, bloquez la migration. Une carte statique
ne prouve ni la fraîcheur permanente ni le comportement de production.

### Réflexion
## Transfert

Quel changement aurait exigé la plus petite vérification ? Transférez la méthode
à une dépendance, une traduction ou une règle de sécurité.

## Liste de contrôle d’acceptation

- [ ] Les faits volatils ont une source et une date.
- [ ] L’impact et le propriétaire sont nommés.
- [ ] Un test de régression précède la migration.
- [ ] Conserver, bloquer et retirer sont des options explicites.
- [ ] Le rollback est documenté avant l’effet durable.

## Sources et limite de mise à jour

Consultez la documentation officielle et le registre de maintenance du projet.
Cette traduction reste `in-progress / candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="21-team-capability-system-FR.md" aria-label="Chapitre précédent: Chapitre 21 · Capacité d’équipe">← Précédent<br><strong>Chapitre 21 · Capacité d’équipe</strong></a></td>
      <td align="right"></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
