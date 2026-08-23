<!-- content_id: prysai-platform-adapter-review | locale: FR | language: fr | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: skill-registry | source_license: project-owned CC-BY-4.0 -->

# Revue d’un adaptateur de plateforme

Déterminez si un tutoriel ou un workflow consacré à une plateforme apporte réellement une différence documentée, exécutable et maintenable. Remplacer le nom du fournisseur dans une liste de fonctions ne constitue pas une adaptation.

## Figer l’affirmation

Consignez la plateforme, la surface, les limites du compte ou du forfait, la version et la date, le résultat attendu pour le lecteur, le prérequis du universal core, le statut proposé et les affirmations précises examinées. Séparez les affirmations qui mélangent plusieurs plateformes, sauf si une tâche de comparaison fixe et une même grille les rendent réellement comparables.

## Examiner le contrat de l’adaptateur

Exigez une réponse explicite pour :

1. `surface` : chat, bureau, CLI, IDE, web, API ou autre point d’entrée ;
2. `context_injection` : fichiers, règles, état de la conversation, recherche ou artefacts de l’utilisateur ;
3. `actions` : ce que la surface peut observer ou modifier ;
4. `authority` : permissions, confirmations, sandbox, compte, facturation et effets externes ;
5. `persistence` : ce qui survit à un tour, une session, une tâche ou un projet ;
6. `control_loop` : planification observable, usage d’outils, retours, nouvelles tentatives et délégation ;
7. `verification_surface` : diffs, journaux, citations, aperçus, tests, traces ou état externe ;
8. `failure_modes` : incompréhensions et voies de dégradation propres au produit ;
9. `volatile_facts` : URL faisant autorité, date d’accès, périmètre, responsable et prochaine revue ;
10. `transfer_lab` : entrées fixes, actions sûres, critères d’acceptation, nettoyage, échec et limite des preuves.

Marquez `not_applicable` uniquement avec une justification. Marquez `unknown` lorsqu’aucune source actuelle ni aucun run ne permet de répondre.

## Appliquer les portes de preuve

Séparez trois classes de preuves (le statut d’un fait officiel est `official`) :

- fait officiel : documentation primaire actuelle ou source détenue par la plateforme ;
- comportement observé : run conservé avec sa configuration et ses actions visibles ;
- signal de terrain : rapport public qui établit seulement un symptôme ou un besoin.

Les publications communautaires ne satisfont pas la porte des faits officiels. La documentation ne prouve ni le compte, ni l’environnement d’exécution, ni le résultat d’un utilisateur. Un seul run réussi ne prouve ni un comportement universel, ni la fiabilité, ni la supériorité, ni le transfert de l’apprentissage.

Refusez les équivalences non étayées. Des étiquettes communes comme Agent, outil, mémoire, projet, Skill ou recherche ne garantissent pas une sémantique identique. Comparez uniquement une tâche fixe avec les mêmes entrées, critères d’acceptation, limites de risque et grille de revue ; conservez les différences de configuration et notez `not_comparable`.

## Décider du traitement

Renvoyez l’un des statuts suivants :

- `admit_candidate` : toutes les différences, sources, runs, échecs, responsables, dates de revue et limites de preuve nécessaires sont présents ;
- `draft_source_gap` : une affirmation volatile importante n’a pas de soutien de première partie ;
- `draft_run_gap` : le contrat est sourcé mais aucun run borné n’existe ;
- `merge_into_core` : aucune différence de plateforme significative ne subsiste ;
- `quarantine` : la licence, la sécurité, la confidentialité ou la provenance sont floues ;
- `retire` : l’adaptateur est obsolète, sans responsable, redondant ou inutile.

Ne faites pas monter le statut parce qu’une connexion réussit, qu’une commande existe ou que le texte semble complet. Un adaptateur `candidate` ne constitue ni une preuve de transfert de l’apprenant ni un guide de production vérifié.

## Livrer la revue

Commencez par le traitement et la raison la plus forte. Donnez ensuite la matrice du contrat, les affirmations non étayées, les manques de source, de run ou de licence, le recouvrement avec le universal core, l’expérience suivante, le responsable, la prochaine revue et ce que la réussite ne prouverait toujours pas. Adaptez le format au nombre d’affirmations ; n’imposez pas de titres cérémoniels à une revue portant sur une seule affirmation.

## Fiche de maintenance

- `source` : méthode originale de Prysai Lab mettant en œuvre l’ADR-0025 et la limite d’admission du contenu de référence
- `license` : réécriture originale ; la documentation des fournisseurs et les rapports communautaires restent des références sauf licence distincte
- `owner` : platform-adapter maintainer
- `version` : `0.1.0`
- `review_date` : `2026-09-12`
- `content_status` : `candidate`
