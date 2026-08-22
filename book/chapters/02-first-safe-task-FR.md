<!-- content_id: chapter-02-first-safe-task | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-bootstrap -->

# Chapitre 2 : Réaliser une première tâche sûre et vérifiable

## Le problème que résout ce chapitre

Le problème réel est simple : une première demande trop large peut toucher le
mauvais fichier ou produire un résultat impossible à accepter. Une petite
modification locale rend la cible, la récupération et l’acceptation visibles.

Une demande vague pousse un outil à élargir son périmètre. La première tâche
doit au contraire être petite, réversible, visible et sans données sensibles.

## Objectifs d’apprentissage

- transformer un souhait en contrat de tâche ;
- inspecter avant de modifier ;
- conserver un diff et un contrôle ciblé ;
- arrêter l’action quand une entrée, une autorité ou une preuve manque.

## Les six conditions d’une première tâche

Avant de demander une modification, vérifiez :

1. la cible exacte et son état initial sont lisibles ;
2. le résultat attendu tient en une phrase observable ;
3. les entrées autorisées et les interdits sont nommés ;
4. l’action reste locale, réversible et sans secret ;
5. le contrôle de sortie est connu avant l’édition ;
6. un arrêt est prévu si l’entrée, l’autorité ou la preuve manque.

## Cas réels : problèmes de terrain

« Rends ce projet plus professionnel » ne dit ni quel fichier changer, ni ce
qui permettrait d’accepter le résultat. « Corrige une phrase dans README.md,
puis montre le diff » possède une cible et un contrôle d’acceptation vérifiable.

## Expérience : une modification locale

### Préparation

Choisissez un dossier jetable ou utilisez la [première modification sûre](../routes/first-safe-change-FR.md). N’utilisez aucun secret, dépôt de production ou service externe.

### Tâche

```text
Résultat : clarifier une phrase de README.md.
Entrée : README.md uniquement.
Autorisé : lire, proposer, puis modifier ce fichier après confirmation.
Interdit : installation, réseau, compte, secret, commit, push et publication.
Acceptation : un diff d’une phrase et un contrôle de format documenté.
Preuve : chemin, diff, commande et sortie réelle.
Arrêt : tout autre fichier, permission ou fait non fourni.
```

Demandez d’abord un état initial et un plan. Ne validez qu’après avoir lu la
cible et le contrôle qu’elle documente.

### Trois moments où l’on confirme

- **Avant l’action :** la cible, le périmètre et les fichiers autorisés sont
  corrects.
- **Avant un effet externe :** la personne confirme l’autorité, le destinataire
  et l’effet attendu.
- **Avant la livraison :** le diff, le contrôle et les éléments non testés sont
  relus.

### Preuve

Conservez la version avant, le diff après et la sortie du contrôle. Distinguez
`modifié`, `contrôlé` et `non testé` dans votre compte rendu.

### Échec et limite

Si l’outil prétend avoir terminé sans diff, marquez la modification
`non_observée`. Si la vérification exige une installation ou un accès externe,
arrêtez-vous ; ce n’est pas une extension automatique de la tâche.

Ne confondez pas non plus « commande lancée » et « contrôle réussi », ni
« configuration présente » et « capacité démontrée ». Chaque affirmation a son
propre trace.

### Réflexion

Quel champ du contrat a empêché l’élargissement ? Quelle affirmation reste
encore seulement proposée ?

## Transfert

Utilisez le même contrat pour reformuler une note non sensible. Remplacez la
cible et le contrôle, mais conservez l’inspection initiale, la limite d’action,
la preuve et l’arrêt.

## Liste de contrôle d’acceptation

- [ ] La cible et les entrées sont nommées.
- [ ] Les actions autorisées et interdites sont visibles.
- [ ] Le diff reste dans le périmètre déclaré.
- [ ] Le contrôle exécuté et son résultat sont conservés.
- [ ] Les limites et les actions non exécutées sont listées.

## Sources et limite de mise à jour

Ce protocole est une méthode stable du projet. Les commandes et surfaces
propres à un produit doivent être confirmées dans leur documentation actuelle.
Cette version française reste `candidate` et `not_run` ; elle ne prouve pas un
résultat d’apprentissage.

Continuez avec le [Chapitre 3 : transformer un souhait en protocole](03-task-protocol-FR.md).

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="01-gpt-and-codex-FR.md" aria-label="Chapitre précédent: Chapitre 1 · Comprendre GPT avant Codex">← Précédent<br><strong>Chapitre 1 · Comprendre GPT avant Codex</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="03-task-protocol-FR.md" aria-label="Chapitre suivant: Chapitre 3 · De l’intention au protocole">Suivant →<br><strong>Chapitre 3 · De l’intention au protocole</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
