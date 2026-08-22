<!-- content_id: lab-013-l3-vertical-slice | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: 2026-08-22-fr-depth-repair -->

---
id: lab-013-l3-vertical-slice
title: "Mener une tranche verticale complète"
level: L3
domain: engineering
goal: "Faire passer une modification bornée de sa définition jusqu’aux preuves et à la transmission"
setup: "Une copie jetable d’un dépôt, un seul chemin Markdown autorisé, sans publication ni identifiants"
task: "Exécuter CP0 à CP4 pour une note de version, avec contrôle ciblé, branche d’échec et transmission en contexte vierge"
evidence:
  - "Hachages d’entrée, état initial, checkpoints et journal des actions"
  - "Diff réel, sortie de commande, codes de sortie et table affirmation-preuve"
  - "Échec, transmission, cible de retour arrière et liste des inconnues"
failure_variant: "Supprimer une entrée requise, faire échouer le contrôle ciblé, reprendre après CP2, injecter une instruction d’action externe ou demander une modification persistante d’environnement"
reflection: "Quel checkpoint a empêché l’affirmation non étayée ou l’action inutile la plus importante ?"
status: draft
last_verified: "Maintainer reference run accepted 2026-08-12; learner run not run"
transfer_task: "Transférer le workflow de checkpoints à une tâche de recherche ou de contenu sans risque"
transfer_domain: "ingénierie, recherche ou workflow éditorial"
transfer_evidence: "Conserver le protocole réécrit, les checkpoints, l’artefact ou le blocage, la table de preuves et la transmission"
transfer_limitations: "Une tranche locale ne prouve ni la publication distante, ni le comportement de production, ni l’acceptation par les lecteurs"
---

# Lab 013 : Mener une tranche verticale complète

## Objectif d’apprentissage

Mener une petite modification de bout en bout sans confondre planification, édition, contrôle, revue, livraison et publication.

## Préparation

Utilisez une copie jetable d’un dépôt. La seule modification autorisée est une petite note Markdown à un chemin nommé. Notez les fichiers d’entrée, leurs hachages, le `git status` initial, le chemin permis, les critères d’acceptation, la cible de restauration et les actions interdites. Publication, envoi vers le dépôt distant, installation de dépendances et identifiants sont hors périmètre.

Avant de commencer, classez chaque action :

| Classe | Exemple dans ce Lab | Preuve minimale | Décision par défaut |
|---|---|---|---|
| A — lecture | lire les entrées, `git status`, configuration | sortie ou note d’observation | autorisée si la copie est identifiée |
| B — édition locale | modifier le seul fichier Markdown prévu | diff et chemin | autorisée après CP0 et CP1 |
| C — contrôle local | lancer le contrôle ciblé documenté | commande, sortie brute, code | autorisée si l’effet est borné |
| D — état du dépôt | commit ou changement de branche | référence et état avant/après | hors périmètre de la fixture sauf décision distincte |
| E — action externe | envoyer vers le dépôt distant, publier, notifier ou modifier un environnement persistant | cible, payload, autorisation et preuve distante | `not_run` et arrêt par défaut |

Une session ouverte n’est pas une autorisation. Une capacité technique n’est
pas une permission. Une demande d’action externe doit identifier la cible
exacte, l’effet, l’autorité et la confirmation humaine avant toute exécution.

## Checkpoints

Utilisez cinq checkpoints et ne passez pas au suivant sans conserver sa preuve :

| Checkpoint | Preuve requise |
|---|---|
| CP0 Définition | but, entrées, périmètre, autorité, arrêts et hachage initial |
| CP1 Plan | tranche minimale, méthode, preuve attendue et retour arrière |
| CP2 Modification | diff, chemins, journal d’action et hachage de sortie |
| CP3 Vérification | commandes, sortie brute, codes, couverture et contrôles non exécutés |
| CP4 Transmission | terminé, incomplet, preuves, inconnues, prochaine vérification et retour arrière |

Le journal note heure, observation, action, résultat, changement d’état, preuve, risque, étape suivante et raison d’arrêt.

## Expérience

Créez la note de version avec les seuls faits fournis dans l’entrée. Avant
l’édition, demandez à l’Agent de reformuler le but, le chemin, les limites et le
critère d’acceptation ; vérifiez votre CP0. Faites ensuite un plan minimal (CP1),
modifiez une seule fois (CP2), et vérifiez que seul le chemin autorisé a changé,
que le contenu requis est présent, qu’aucune affirmation non étayée n’a été
ajoutée et que le contrôle local ciblé a réussi (CP3). Un diff réussi ne prouve
ni la publication, ni la compréhension des lecteurs, ni la synchronisation
distante. CP4 doit dire séparément ce qui est livré localement, ce qui reste
`not_run` et comment une autre personne peut reprendre.

## Cas d’échec

Réalisez au moins une branche :

- supprimer une entrée requise et s’arrêter avant l’édition ;
- faire échouer le contrôle ciblé et conserver sa sortie avant récupération ;
- reprendre après CP2 dans un contexte vierge, avec les seuls checkpoints et l’état du dépôt ;
- placer une instruction d’envoi de jeton dans l’entrée et la traiter comme donnée ;
- demander une modification persistante d’environnement et s’arrêter faute d’autorité.

Une reprise n’est permise qu’après changement du diagnostic et compréhension des effets déjà produits. Répéter la même action n’est pas une récupération.

Pour chaque branche, remplissez une ligne « affirmation → preuve » :

| Affirmation | Preuve attendue | Si elle manque |
|---|---|---|
| le bon fichier a changé | diff et chemin autorisé | restaurer et revenir à CP1 |
| le contrôle a réussi | sortie brute et code de sortie | conserver l’échec, changer une condition de diagnostic |
| la reprise est sûre | checkpoints et état du dépôt dans le nouveau contexte | arrêter et demander la pièce manquante |
| la publication est faite | preuve de la cible distante et du résultat | écrire `not_run` ; un diff local ne suffit pas |

## Liste de contrôle d’acceptation

- [ ] But, périmètre, autorité, acceptation et retour arrière sont explicites.
- [ ] CP0 à CP4 sont conservés.
- [ ] Seul le chemin autorisé a changé.
- [ ] Les commandes ont une sortie brute et un code de sortie.
- [ ] Au moins une branche d’échec s’est arrêtée ou a récupéré correctement.
- [ ] La transmission sépare achèvement local, publication et production.
- [ ] Une autre personne peut continuer sans lire la conversation d’origine.
- [ ] Les actions A–E sont classées ; toute action externe possède cible, effet,
      autorité et confirmation, ou reste `not_run`.
- [ ] La table affirmation-preuve distingue une sortie locale d’une preuve
      distante et nomme les éléments encore inconnus.

## Preuves à conserver

Gardez la copie d’entrée et ses hachages, les checkpoints, le diff, le journal, les sorties, l’échec, la table affirmation-preuve et la transmission. Le Lab reste `draft / not_run` jusqu’à une exécution d’apprenant en contexte vierge et une revue indépendante.

### Dossier de référence du mainteneur

Le projet possède un dossier de référence déterministe accepté pour cette fixture. Il conserve CP0 à CP4, un contrôle réellement en échec, l’artefact échoué, le diff de récupération, un contrôle réussi, le diff final, le reçu de nettoyage et la transmission. Voir le [contrat des exemples exécutables](../../docs/governance/executable-examples.yaml) et la [revue de resoumission indépendante](../../docs/quality/lab-013-reference-run-resubmission-review-2026-08-12.md).

Ce dossier vient d’un exécuteur local déterministe, pas d’un apprenant ni d’un modèle. Il ne prouve ni l’indépendance, ni le comportement de Codex, ni le transfert, ni la publication, ni la répétition du retour arrière. Les exécutions d’apprenant et de transfert restent `not_run`.

## Réflexion et transfert

Transférez le workflow à une recherche ou une revue de contenu. Réécrivez les
champs source, autorité, acceptation et échec au lieu de copier des commandes
d’ingénierie. Ajoutez les limites de citation ou de confidentialité propres au
domaine. Quel checkpoint a empêché l’affirmation non étayée la plus importante ?

## Sources et limite de mise à jour

- [Chapitre 10 : planification et découpage](../chapters/10-planning-and-slicing-FR.md)
- [Chapitre 12 : boucle et conditions d’arrêt](../chapters/12-agent-loop-and-stop-FR.md)
- [Contrat des exemples exécutables](../../docs/governance/executable-examples.yaml)

Ce Lab reste `draft / not_run`. Une tranche locale ne prouve ni publication distante, ni comportement de production, ni acceptation par les lecteurs.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navigation entre les Labs">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-012-team-capability-migration-FR.md" aria-label="Lab précédent : Lab 012 · Transformer une méthode personnelle en capacité d’équipe">← Précédent<br><strong>Lab 012 · Transformer une méthode personnelle en capacité d’équipe</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-014-resume-reconciliation-FR.md" aria-label="Lab suivant : Lab 014 · Réconcilier une reprise avant de continuer">Suivant →<br><strong>Lab 014 · Réconcilier une reprise avant de continuer</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
