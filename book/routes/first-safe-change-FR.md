<!-- content_id: first-safe-change-route | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-22-fr-contract-completion -->

# Première modification sûre : une sandbox hors ligne avant le Lab 001

**Statut :** `candidate`. **Exécution :** `not_run`.
**Traduction :** version française en cours ; relecture indépendante à venir.

Cette route est le pont facultatif entre le Chapitre 2 et le Lab 001. Elle
propose un README volontairement incomplet, une seule modification locale et
un contrôle visible. Elle ne demande ni compte, ni installation, ni réseau, ni
Git, et ne prouve pas qu’un modèle a réellement effectué une action.

## Problème

Le Lab 001 suppose un projet jetable et une source réelle pour la commande de
vérification. Une personne qui débute n’en possède pas toujours un. Une fixture
locale sépare donc l’apprentissage de la méthode de la recherche d’un projet.

## Concept

Une fixture sépare *la pratique de la méthode* de *la recherche d’un projet
approprié*. Elle est synthétique, locale et temporaire. La seule modification
prévue concerne le README ; le vérificateur lit ce fichier et renvoie un résultat
court. La condition d’acceptation devient ainsi visible sans compte, réseau,
installation, Git, commit, envoi vers un dépôt distant, publication ni donnée
personnelle.

## Décision

Utilisez la [fixture First Safe Change](../../examples/lab-001-v1/README-FR.md)
si vous n’avez pas déjà un projet local temporaire. Copiez tout le dossier dans
`.work/` ou dans un autre répertoire de travail provisoire afin de laisser
l’erreur initiale disponible pour la prochaine personne. Ne modifiez jamais la
fixture originale du dépôt.

## Action

Commencez par créer une copie privée. Dans l’explorateur de fichiers, copiez le
dossier `examples/lab-001-v1` dans un répertoire temporaire nommé
`first-safe-change`. Laissez l’original intact : son erreur volontaire sert de
point de départ à la personne suivante.

Choisissez ensuite l’un de ces deux contrôles :

1. **Contrôle sans exécution (par défaut).** Ouvrez `seed/README.md` et
   `expected/acceptance.json` dans la copie. Avant toute modification, le README
   manque deux détails d’aperçu. Après l’unique correction autorisée, vérifiez
   visuellement que les trois chaînes de `required_readme_strings` sont présentes.
2. **Vérificateur local facultatif.** Utilisez-le seulement si Python 3 fonctionne
   déjà sur votre machine. Ouvrez un terminal dans la copie et lancez :

```powershell
python .\seed\verify_readme.py
```

Le premier résultat attendu est `FIRST_SAFE_CHANGE_FAILED`, car l’état initial
est volontairement incomplet. Utilisez la fiche de tâche du README pour relire
`seed/README.md`, proposer la plus petite correction, puis ne modifier que ce
README après avoir confirmé le plan. Le même contrôle doit ensuite renvoyer
`FIRST_SAFE_CHANGE_OK`. Si Python n’est pas disponible, n’installez pas de
nouvel environnement pour cette route : notez
`check: manual required_readme_strings 3/3`. Si vous ne pouvez pas créer de
copie temporaire, arrêtez-vous et utilisez la première victoire textuelle ; une
vue GitHub n’est pas une sandbox locale.

## Pont vers le développement web : une modification visible dans un navigateur

Si votre objectif suivant est le développement web, ne commencez pas par
« construire un site complet ». Utilisez la [fixture Product Context](../../examples/skill-sandbox/product-context-real-estate/README-FR.md)
comme page statique temporaire. Elle ne contient que du texte fictif : pas
d’annonce réelle, de formulaire, d’analytique, d’API ni d’image externe.

1. Copiez tout le dossier `examples/skill-sandbox/product-context-real-estate`
   dans un répertoire temporaire. Lisez son README et `index.html`.
2. Modifiez **uniquement** `index.html` : remplacez une phrase visible par une
   phrase de votre cru pour le même public fictif. Ne touchez ni au CSS, ni à un
   framework, ni à une image, ni à un formulaire.
3. Si Python 3 est déjà installé, démarrez le serveur documenté depuis la copie :

```powershell
python -m http.server 4182
```

Ouvrez `http://127.0.0.1:4182/`. Vérifiez le titre, la phrase modifiée, le titre
resté inchangé, les cibles des liens, la console et une fenêtre de 390 px. Si la
commande, le fichier cible ou le résultat du navigateur est ambigu, arrêtez-vous
; n’installez pas de runtime pour cet exercice.

Conservez un reçu court :

```text
sandbox : <copie temporaire>
modification_autorisée : index.html uniquement
url : http://127.0.0.1:4182/
contrôle_navigateur : phrase modifiée une fois ; titre et liens conservés ; console observée
diff : <diff relu>
non_vérifié : déploiement, accessibilité, autres navigateurs, acceptation utilisateur
```

Ce reçu établit un état local rendu à une seule fenêtre. Il ne prouve ni la
qualité d’un déploiement, ni l’accessibilité, ni la sécurité, ni les performances,
ni l’utilité du produit.

## Preuve à conserver

```text
sandbox: <dossier temporaire>
modification_autorisée: seed/README.md uniquement
diff: <diff relu>
contrôle: manual 3/3 ou FIRST_SAFE_CHANGE_OK
actions_externes: aucune
non_vérifié: exécution du modèle, transfert, déploiement
```

Le contrôle peut seulement établir que ce README fictif respecte les chaînes
déclarées par la fixture à un instant local. Un succès n’est ni un résultat Git,
ni un test navigateur, ni une preuve de droits de compte, de sécurité ou
d’apprentissage.

## Échec et limite

Ne modifiez ni le vérificateur, ni le fichier d’acceptation, ni un second
fichier pour obtenir un succès. Si une installation, un secret, un réseau, un
compte ou une publication devient nécessaire, arrêtez-vous : c’est une nouvelle
décision.

## Réflexion

- Quelle condition d’acceptation était visible avant l’édition ?
- Que prouve le diff que ne prouve pas la phrase « c’est terminé » ?
- Quelle information devez-vous confirmer avant d’utiliser ce modèle dans un vrai projet ?

## Continuer

Passez ensuite au [Lab 001 — réaliser une première tâche sûre](../labs/lab-001-first-safe-task-FR.md).
Son installation pour débutant renvoie à cette fixture, puis ajoute les contrôles
de projet réel : source de commande, identité de la sandbox et reprise après
échec.

## Statut et limites

Cette route reste `candidate` et `not_run` du point de vue d’un apprenant. Les
tests du dépôt vérifient la forme de la fixture et le comportement déclaré du
vérificateur ; ils n’observent ni apprenant, ni Codex ou autre modèle, ni
transfert, ni commande réelle d’un projet.
