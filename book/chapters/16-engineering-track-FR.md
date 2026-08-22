<!-- content_id: chapter-16-engineering-track | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

# Chapitre 16 : Ingénierie, de l’idée au logiciel fiable

**Statut :** `candidate` · **Expérience :** `not_run`  
Un code qui compile n’est pas encore une livraison utilisable.

## Le problème

Commencer à coder avant d’avoir fixé les exigences, les tests, l’observation de
l’environnement d’exécution et le plan de retour conduit à des correctifs qui
paraissent terminés, mais échouent sur le vrai parcours utilisateur.

## Objectifs d’apprentissage

- spécifier avant d’implémenter ;
- livrer par petites tranches de bout en bout ;
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

Travaillez dans une copie jetable. Notez le point de départ, la version de
l’environnement, la commande de test et le critère de réussite. Préparez trois
entrées synthétiques : une entrée normale, une entrée vide et une entrée
invalide. Aucune clé, donnée client, publication ni écriture externe n’est
nécessaire.

### Tâche

Choisissez une petite tâche fixe, par exemple dédupliquer une liste locale et
écrire un fichier JSON. Faites d’abord une tentative directe, puis une seconde
tentative avec définition du besoin, plan, tranche minimale, test, exécution
locale et revue. Après chaque étape, arrêtez-vous pour regarder le diff et
vérifier que la sortie attendue est toujours la même.

### Preuve

Conservez un reçu court :

```text
version et dossier de départ :
contrat et critères d’acceptation :
fichiers modifiés et diff :
commandes, codes de sortie et journaux :
résultat normal / vide / invalide :
observation dans l’environnement local :
inconnues et point de retour :
```

Ce reçu permet de distinguer « le code se construit » de « le parcours
fonctionne ». Ne transformez pas une seule tâche en classement universel.

### Échec et limite

Introduisez une entrée manquante ou un contrôle qui échoue ; diagnostiquez avant
d’ajouter du code. L’exercice ne prouve pas un gain général.

### Réflexion

- Quelle vérification a empêché le plus grand détour ?
- Qu’a montré l’exécution locale que les tests statiques ne pouvaient pas montrer ?
- À quel moment auriez-vous dû vous arrêter ou revenir au point précédent ?
- Quelle affirmation reste `UNSURE` malgré la réussite de l’exercice ?

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
