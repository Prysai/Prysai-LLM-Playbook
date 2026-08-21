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

## Cas réels : problèmes de terrain

« Rends ce projet plus professionnel » ne dit ni quel fichier changer, ni ce
qui ferait accepter le résultat. « Corrige une phrase dans README.md, puis
montre le diff » possède une cible et une réception contrôlables.

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

### Preuve

Conservez la version avant, le diff après et la sortie du contrôle. Distinguez
`modifié`, `contrôlé` et `non testé` dans votre compte rendu.

### Échec et limite

Si l’outil prétend avoir terminé sans diff, marquez la modification
`non_observée`. Si la vérification exige une installation ou un accès externe,
arrêtez-vous ; ce n’est pas une extension automatique de la tâche.

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
Cette version française est `in-progress`, `candidate` et `not_run`; elle ne
prouve pas un résultat d’apprentissage.

Continuez avec le [Chapitre 3 : transformer un souhait en protocole](03-task-protocol-FR.md).
