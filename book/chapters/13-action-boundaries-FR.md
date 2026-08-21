<!-- content_id: chapter-13-action-boundaries | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-bootstrap -->

# Chapitre 13 : Les frontières d’action entre fichiers, terminaux et GitHub

## Le problème que résout ce chapitre

Lire, éditer, exécuter, valider, committer, pousser et publier n’ont ni le même
effet ni la même récupération. Les regrouper sous « travailler sur le projet »
fait perdre la décision qui devait être confirmée.

## Objectifs d’apprentissage

<a id="core-action-boundary"></a>

Classer chaque action par capacité, autorité, effet, preuve et retour arrière.

## Cas réels

Un bouton de connexion n’est pas une preuve d’autorisation pour ce dépôt. Un
commit local n’est pas un push. Un push n’est pas une page déployée.

## Expérience : matrice d’action

### Préparation

Utilisez une tâche locale fictive, sans token ni dépôt réel.

### Tâche

Remplissez :

| Action | Objet | Autorité | Effet | Preuve | Retour arrière |
|---|---|---|---|---|---|
| Lire | fichier nommé | lecture locale | aucun | contenu lu | n/a |
| Éditer | un fichier | écriture locale | réversible | diff | restaurer la copie |
| Exécuter | contrôle ciblé | terminal | variable | sortie et code | arrêter/inspecter |
| Committer | historique local | dépôt | persistant | SHA et diff | revert contrôlé |
| Pousser | branche distante | compte autorisé | externe | SHA distant | correction coordonnée |
| Publier | site ou release | mainteneur | public | URL et artefact | rollback publié |

### Preuve

Pour toute action persistante, conservez la cible exacte, l’autorité, la
confirmation, le résultat et l’état lu après coup.

### Échec et limite

Si l’un de ces champs est inconnu, arrêtez-vous au lieu d’agrandir la portée.
N’utilisez pas une connexion ou un message d’Agent comme preuve de publication.

### Réflexion

À quel moment l’effet devient-il externe ? Quelle preuve ne peut être obtenue
qu’en relisant la cible distante ?

## Transfert

Appliquez la matrice à un navigateur, à un outil MCP ou à une plateforme de
publication. Ajoutez les données qui quittent l’interface et la personne qui a
autorisé cette sortie.

## Liste de contrôle d’acceptation

- [ ] Les actions locales et externes sont séparées.
- [ ] Autorité, confirmation et preuve sont renseignées.
- [ ] Chaque action persistante a un retour arrière ou une limite explicite.
- [ ] Un commit, un push et un déploiement ne sont pas confondus.
- [ ] Les inconnues entraînent un arrêt ou une escalade documentée.

## Sources et limite de mise à jour

Les règles d’un fournisseur, ses permissions et ses interfaces doivent être
revérifiées dans ses documents actuels. Cette traduction française attend une
relecture indépendante et reste `candidate / not_run`.

Retournez au [protocole de tâche](03-task-protocol-FR.md#core-task-contract) si le périmètre change.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"></td>
      <td align="right"></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
