<!-- content_id: first-safe-change-route | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-bootstrap -->

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

## Décision

Copiez `examples/lab-001-v1` vers un dossier temporaire que vous pouvez
supprimer. Ne modifiez pas l’original du dépôt. La seule modification autorisée
est `seed/README.md`.

## Action

1. Lisez `seed/README.md` et `expected/acceptance.json`.
2. Relevez les trois chaînes exigées dans `required_readme_strings`.
3. Demandez d’abord une lecture et un plan ; n’autorisez qu’une correction du README.
4. Exécutez le contrôle documenté si Python 3 est déjà disponible :

```powershell
python .\seed\verify_readme.py
```

Le premier résultat attendu est `FIRST_SAFE_CHANGE_FAILED`, car l’état initial
est volontairement incomplet. Après la seule correction, le résultat attendu
est `FIRST_SAFE_CHANGE_OK`. Si Python n’est pas disponible, ne l’installez pas
pour cette route : notez `check: manual required_readme_strings 3/3`.

## Preuve à conserver

```text
sandbox: <dossier temporaire>
modification_autorisée: seed/README.md uniquement
diff: <diff relu>
contrôle: manual 3/3 ou FIRST_SAFE_CHANGE_OK
actions_externes: aucune
non_vérifié: exécution du modèle, transfert, déploiement
```

## Échec et limite

Ne modifiez ni le vérificateur, ni le fichier d’acceptation, ni un second
fichier pour obtenir un succès. Si une installation, un secret, un réseau, un
compte ou une publication devient nécessaire, arrêtez-vous : c’est une nouvelle
décision.

## Réflexion

- Quelle condition d’acceptation était visible avant l’édition ?
- Que prouve le diff que ne prouve pas la phrase « c’est terminé » ?
- Quelle information devez-vous confirmer avant d’utiliser ce modèle dans un vrai projet ?

Passez ensuite au [Lab 001](../labs/lab-001-first-safe-task-FR.md). Cette route
reste `candidate / not_run` et ne constitue pas une preuve de maîtrise.
