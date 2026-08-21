<!-- content_id: chapter-09-verification-and-recovery | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-bootstrap -->

# Chapitre 9 : Vérifier, douter et récupérer

## Le problème que résout ce chapitre

Une sortie convaincante peut masquer un fichier incorrect, une commande non
exécutée ou une source périmée. La récupération commence par l’état observé,
pas par une nouvelle tentative automatique.

## Objectifs d’apprentissage

<a id="core-evidence-recovery"></a>

Relier chaque affirmation à la preuve minimale, distinguer échec et absence de
preuve, puis reprendre avec une petite sonde réversible.

## Cas réels

« La commande a démarré » ne signifie pas « le contrôle a réussi ». « Le modèle
a dit terminé » ne signifie pas « l’objet distant a changé ». Ces étapes ont des
preuves différentes.

## Expérience : un registre d’affirmations

### Préparation

Utilisez une sortie fictive et un diff fictif. Ne relancez aucune commande réelle.

### Tâche

Créez ce tableau :

| Affirmation | Preuve nécessaire | État | Plus petite vérification |
|---|---|---|---|
| Un fichier local a changé | diff frais | `not_observed` | relire le diff |
| Le contrôle a réussi | sortie et code de retour | `not_observed` | exécuter le contrôle approuvé |
| La publication existe | lecture distante | `not_observed` | lire la cible exacte |

### Preuve

Gardez la version initiale, l’état après interruption et la liste des inconnues.
Une sonde réussie ne prouve que cette opération dans ce chemin et ce run.

### Échec et limite

Après un délai, arrêtez l’action, inspectez l’état et n’effectuez qu’une reprise
dont l’idempotence et le budget sont explicites. Ne supprimez pas l’historique
pour faire disparaître l’échec.

### Réflexion

Quelle affirmation avait la preuve la plus faible ? Qu’avez-vous refusé de
déduire d’un message d’état ?

## Transfert

Appliquez le registre à une note de recherche : source consultée, date, portée,
affirmation soutenue et contradiction ouverte.

## Liste de contrôle d’acceptation

- [ ] Chaque phrase importante a une preuve ou un statut explicite.
- [ ] L’interruption est séparée du succès et de l’échec.
- [ ] La récupération est petite, réversible et autorisée.
- [ ] L’historique et les inconnues sont conservés.
- [ ] La conclusion ne dépasse pas la portée du registre.

## Sources et limite de mise à jour

Les commandes et statuts propres aux plateformes évoluent ; confirmez-les dans
les sources officielles avant une action. La traduction française est
`in-progress`, `candidate` et `not_run`.

Continuez avec la [planification et le découpage](10-planning-and-slicing-FR.md).
