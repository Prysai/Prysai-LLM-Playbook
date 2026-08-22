<!-- content_id: chapter-11-designing-a-skill | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

# Chapitre 11 : Concevoir un Skill qui mérite d’être conservé

**Statut :** `candidate` · **Expérience :** `not_run`  
Cette version française est une adaptation pédagogique en cours de relecture.
Elle ne prouve pas qu’un hôte découvrira ou exécutera le Skill proposé.

## Le problème

Une réussite ponctuelle ne suffit pas pour transformer un prompt en Skill. Un
Skill utile décrit un manque récurrent, ses entrées, ses limites, ses sorties,
ses preuves et ses cas où il doit refuser d’agir.

## Objectifs d’apprentissage

- écrire un contrat avant d’écrire des instructions ;
- séparer déclenchement, exécution et non-déclenchement ;
- charger progressivement références, scripts et ressources ;
- tester un cas positif, un cas limite, un échec et un transfert.

## Problèmes de terrain

Un Skill peut être présent sans être repérable, chargé ou autorisé. Une fiche qui ne décrit pas le non-déclenchement pousse l’utilisateur à élargir la demande au lieu de s’arrêter.

## Cas réel : le problème peut arriver avant le déclenchement

« Le Skill est installé » ne dit pas s’il est repérable, chargé, autorisé ou
adapté à la demande. Chaque état doit avoir sa propre observation.

## Le contrat minimal

```text
But observable :
Entrées acceptées :
Sortie et format :
Déclencheur :
Non-déclencheur :
Permissions :
Preuves :
Arrêt et récupération :
```

Le contrat doit demander les informations manquantes plutôt que les inventer.
Les secrets ne font jamais partie des exemples ou des fixtures.

## Divulgation progressive

Gardez dans `SKILL.md` le contrat et le chemin principal. Placez les détails
stables dans `references/`, les transformations déterministes dans `scripts/`
et les images ou gabarits dans `assets/`. Chaque ressource doit préciser son
entrée, son effet et sa licence.

## Expérience : quatre comportements

### Préparation

Créez un Skill fictif qui transforme une note en tableau de faits. Utilisez un
dossier jetable et aucun compte externe.

### Tâche

Écrivez d’abord le contrat, puis appliquez-le à quatre demandes :

| Cas | Demande | Décision attendue |
|---|---|---|
| positif | « Transforme cette note fournie en faits, hypothèses et inconnues. » | `continue` : les entrées et la sortie sont présentes |
| proche mais hors périmètre | « Réécris cette page pour la rendre plus persuasive. » | `handoff` : la demande relève d’une autre méthode |
| entrée manquante | « Analyse le rapport » sans fournir le rapport | `ask` : demander le fichier ou l’extrait exact |
| transfert | « Utilise le même contrat pour une revue de traduction. » | `adapt` : conserver la frontière et préciser le nouveau domaine |

Ne lancez aucun script et n’écrivez que dans le dossier jetable. Le but est de
voir si le contrat guide une décision, pas de produire un Skill installable.

### Preuve

Testez une demande adaptée, une demande proche mais hors périmètre, une entrée
manquante et une demande de transfert à un autre domaine. Conservez le contrat,
la réponse, le statut et la raison d’un éventuel arrêt. Utilisez un tableau
simple : `cas | entrée observée | action permise | sortie | preuve | statut`.

### Échec et limite

Si le cas limite déclenche une écriture ou réclame un secret, marquez-le
`blocked`. Le test ne prouve pas la compatibilité avec tous les hôtes.

### Réflexion
Quel champ du contrat a empêché l’élargissement ? Quelle preuve manquerait avant
une adoption d’équipe ? Si la demande positive et la demande hors périmètre
produisent la même décision, le déclencheur est encore trop large.

## Transfert

Réécrivez le contrat pour une recherche ou une revue de contenu sans changer la
frontière d’autorité.

## Liste de contrôle d’acceptation

- [ ] Le manque récurrent est décrit avant la solution.
- [ ] Le déclencheur et le non-déclencheur sont testables.
- [ ] Les ressources et licences sont identifiées.
- [ ] Les erreurs, arrêts et preuves sont explicites.
- [ ] Aucun résultat simulé n’est présenté comme une exécution.

## Sources et limite de mise à jour

Les règles d’un hôte et le format d’un Skill sont volatils. Vérifiez les sources
officielles avec date, périmètre et propriétaire. Cette traduction reste
`in-progress / candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="10-planning-and-slicing-FR.md" aria-label="Chapitre précédent: Chapitre 10 · Planification et tranches verticales">← Précédent<br><strong>Chapitre 10 · Planification et tranches verticales</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="12-agent-loop-and-stop-FR.md" aria-label="Chapitre suivant: Chapitre 12 · Boucle et arrêts de l’Agent">Suivant →<br><strong>Chapitre 12 · Boucle et arrêts de l’Agent</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
