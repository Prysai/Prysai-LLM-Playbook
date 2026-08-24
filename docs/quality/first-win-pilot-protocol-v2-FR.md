<!-- content_id: first-win-pilot-protocol-v2 | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: first-win-pilot-protocol-v2.md | source_revision: 2026-08-23 -->

# Protocole pilote First Win v2

**Statut :** protocole `candidate` ; aucun recrutement, aucune session participante et aucun résultat enregistré.

## La décision que ce pilote peut éclairer

Une personne qui découvre le guide peut-elle repérer, dans un court message rédigé par un modèle,
un fait de source manquant et un fait ajouté sans appui, appliquer la méthode First Win puis répéter
le contrôle sur un message jamais vu ?

Le pilote peut améliorer la tâche, la grille, le libellé et l’ordre de la route. Il ne peut pas établir
l’efficacité pédagogique, la rétention, la compétence rédactionnelle générale, la fiabilité d’un modèle,
la demande du marché, la popularité ou la supériorité sur un autre cours.

## Construction étroite

Le seul objet évalué est :

> Repérer les écarts de fidélité à la source dans une courte réponse de modèle et effectuer la plus petite correction sans ajouter d’information non étayée.

Ne pas noter dans cette construction la confiance, le goût, la politesse, la sophistication grammaticale,
la longueur du prompt, la préférence de modèle ou l’aptitude à Codex.

## Participants et autorité

Recruter 5 à 8 adultes ayant déjà utilisé un modèle de chat, mais pas ce guide. Il s’agit d’un échantillon
de débutants expérimentés, pas d’une preuve sur la première session de chat d’une personne. Le premier tour
sert à déboguer l’instrument, pas à mesurer l’efficacité. Utiliser le même commit immuable ou le même candidat
Pages pendant toute la session.

Avant le recrutement, nommer le canal de recrutement, le responsable de la confidentialité, le modérateur,
le ou la responsable de la notation indépendante, la durée de conservation et la date de suppression.
La participation est volontaire. Ne pas recruter de mineurs, de personnes placées sous votre autorité directe,
d’étudiants dont la note pourrait être touchée ou de personnes qui ne peuvent pas refuser librement.

Ne recueillir ni nom, coordonnées, historique brut de chat, données de compte, fichiers privés, documents
d’employeur, informations de santé ou financières, ni enregistrement d’écran. Conserver uniquement un code
de session aléatoire, une catégorie grossière d’expérience, les conditions, les artefacts notés, le temps écoulé,
l’aide utilisée, le premier abandon et une note d’observation désidentifiée.

## Conditions fixes

Avant la première session, consigner :

- révision du protocole et SHA candidat ;
- URL d’entrée et langue ;
- version du navigateur et viewport ;
- modèle et surface, avec les réglages visibles ;
- modérateur et évaluateur indépendant ;
- révision de la grille, fin de conservation et responsable de suppression.

Garder le modèle, les prompts, l’ordre des tâches, la grille et la version visible du site fixes pendant
un tour. Si l’un doit changer, arrêter le tour et recommencer avec une nouvelle révision. Inclure les sessions
abandonnées et exclues dans le décompte.

## Paquet pilote lié au commit

Avant toute session autorisée, générer un paquet local avec le [contrat pilot-kit](../governance/first-win-pilot-kit.yaml).
Il copie depuis un commit donné la fiche du participant, le guide du modérateur, la clé de notation, les enregistrements
vides et le modèle d’agrégat, tout en écrivant les condensats exacts des sources. Le générateur refuse un commit invalide,
un dossier de sortie non vide, un alias de rôle mal formé, le même alias pour modérateur et évaluateur indépendant,
une date de conservation dépassée ou une URL contenant des identifiants, une query ou un fragment. Les deux rôles
doivent être exercés par des personnes différentes ; les alias rendent cette séparation vérifiable sans enregistrer de noms.
Le générateur ne recrute, ne contacte, ne collecte pas de données et ne prouve pas l’approbation du pilote.

Après confirmation des rôles d’autorité, de confidentialité, de conservation et de revue indépendante, exécuter depuis la racine :

```text
python scripts/first_win_pilot_kit.py \
  --candidate-sha <full-40-character-commit-sha> \
  --output-dir .work/first-win-pilot/<round-label> \
  --pilot-authorizer <role-alias> \
  --privacy-owner <role-alias> \
  --moderator <role-alias> \
  --independent-scorer <role-alias> \
  --deletion-owner <role-alias> \
  --recruitment-channel <approved-channel-alias> \
  --retention-end <YYYY-MM-DD> \
  --locale <locale> \
  --model-surface <surface-label> \
  --browser-os-viewport <environment-label>
```

Avant la première session, lancer `--validate-package <local-package-path>` et comparer `manifest.json`
au commit choisi. Ne mettre aucune donnée participante dans le paquet ; les CSV vides définissent seulement
les champs. La clé reste avec le modérateur et l’évaluateur indépendant. `prepared_no_recruitment_or_participant_run_recorded`
reste un état de préparation, pas une preuve d’apprenant.

## Phase 1 — référence sans aide

Ne pas montrer le prompt First Win, l’exemple, les checks ni le rescue prompt. Présenter cette source fictive
et cette réponse volontairement défectueuse :

> The volunteer briefing starts Tuesday at 3. Bring the printed checklist. If you cannot attend, message the coordinator.

> The volunteer briefing starts Tuesday at 3 in Room 204. If you cannot attend, email the coordinator.

Demander de marquer chaque problème de fidélité à la source et d’écrire un message corrigé. Ne pas expliquer
le nombre ni le type de défauts. La clé fixe contient trois observations : `Bring the printed checklist` a été
omis, `Room 204` a été inventé et `message` a été changé sans appui en `email`.

## Présentation de l’étude

Le warm-up public facultatif garde l’exemple acceptable caché jusqu’à la sélection des trois états de contrôle.
La fiche d’étude doit lier la source publique exacte, le prompt, les checks, le rescue prompt, la porte de comparaison
et la limite à un commit, puis conserver l’URL et son condensat. Ne pas appeler ses résultats une utilisation publique sans aide.

Avant la référence, effectuer une observation publique séparée et non notée : la personne distingue-t-elle la route Codex
recommandée du warm-up, trouve-t-elle la première tâche locale, comprend-elle que l’exemple est illustratif et atteint-elle
les checks ? Séparer cette observation des scores. Ne montrer la fiche, le prompt, l’exemple, les checks, le rescue ou la clé qu’après.

## Phase 2 — instruction First Win

Ouvrir la fiche liée au commit. La personne utilise la source fixe, copie le prompt et conserve la première réponse du modèle
avant toute réparation. Pour chaque check, noter `PASS / FAIL / UNSURE` et les mots exacts qui justifient le jugement, puis verrouiller
ce jugement avant de révéler l’exemple.

Si tout passe, enregistrer `not_observable_no_failure` et ne pas compter cela comme une réussite de récupération. Ensuite présenter cette
réponse défectueuse et demander d’identifier le premier check échoué avec le même rescue prompt :

> The workshop starts Friday at 10 in Studio B. Please bring your notes. If you cannot attend, email the organizer.

Si l’exemple est apparu avant le premier jugement, enregistrer `example_exposed`, exclure la comparaison notée de la phase 2 et continuer
seulement l’observation publique. Ne pas jeter automatiquement la référence ni les données de rétention ultérieures. Noter si la personne
sépare faits de source et informations absentes, accepte `UNSURE`, trouve le premier check sans orientation, ne change que le nécessaire et
explique ce que l’exercice ne démontre pas.

## Phase 3 — transfert immédiat inédit

Ne pas donner le prompt de l’atelier mot pour mot. Montrer cette nouvelle source fictive :

> The repair appointment is Monday at 8. Leave the side gate unlocked. Call us if the time no longer works.

La personne rédige une instruction courte, examine la réponse et la corrige si nécessaire. Conserver cinq traces distinctes : instruction,
première réponse, problèmes marqués, réponse finale et différence avant/après. Une première réponse correcte ne prouve pas que la personne a
vérifié ; si elle respecte la source, noter `no_correction_needed`. Noter toute aide, notamment rouvrir First Win ou copier du texte.

## Phase 4 — transfert différé inédit

Après 48–72 heures, utiliser un autre domaine sans fournir le prompt, les checks, l’exemple ni le texte de secours originaux :

> Applications close Thursday at noon. Attach one work sample. Contact the programme office if the form does not open.

Demander d’instruire le modèle, d’examiner la réponse et de corriger les erreurs de fidélité. Conserver les cinq mêmes traces et noter si la
personne revient. Ne pas remplacer une donnée différée manquante par le dernier score observé.

## Fiche de session

Une ligne par phase, en conservant les deux colonnes d’évaluation :

```text
session_code | phase | timer_start | timer_end | completed | first_answer
participant_instruction | marked_findings | check_1 | check_2 | check_3
help_code | recovery_branch | final_answer | before_after_diff | drop_off
example_exposed | scorer_a_dimensions | scorer_b_dimensions | disagreement
```

Pour la phase 2, commencer le chronomètre quand la source apparaît et l’arrêter lorsque les trois jugements sont verrouillés et que la réparation
est terminée ou que `not_observable_no_failure` est consigné. Signaler la distribution des temps et le nombre à 15 minutes ou moins : 15 minutes
reste un objectif non vérifié, pas un seuil de réussite.

Valeurs `help_code` : `none`, `reopen_first_win`, `copy_text`, `moderator_clarification`, `other_recorded`. Valeurs de récupération :
`independent`, `seeded`, `not_observable_no_failure`, `not_attempted`, `stopped`. Une phase n’est complète que lorsque tous ses champs obligatoires
sont présents ; une absence n’est pas un score nul.

## Grille de notation

Noter si possible les artefacts de référence et de transfert sans connaître leur phase.

| Dimension | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Faits requis | au moins deux manquants ou changés | un manquant ou changé | tous conservés |
| Faits non étayés | au moins deux ajoutés | un ajouté | aucun |
| Action demandée | absente ou substantiellement changée | présente mais ambiguë | clairement conservée |
| Portée de la correction | crée un nouveau défaut | corrige la cible avec changement inutile | correction minimale suffisante |

Deux évaluateurs notent chaque artefact séparément. Conserver les deux notes et la raison du désaccord ; publier l’accord brut et les désaccords
par dimension, sans les cacher derrière une moyenne. Si la grille est appliquée de façon instable, la réviser après le premier tour.

## Arrêt et sécurité

Arrêter la session si une personne tente d’utiliser un contenu privé, pense participer à une évaluation d’emploi ou d’études, ressent un malaise
ou nécessite une action externe. Supprimer le contenu privé et ne noter qu’un arrêt de sécurité. Arrêter le tour et réviser l’instrument si deux
personnes interprètent la tâche de manière incompatible, si la clé est ambiguë, si la surface ne conserve pas les conditions fixes, si l’exemple
est exposé trop tôt dans deux sessions, ou si le consentement et la minimisation des données ne sont pas respectés.

## Rapport agrégé

Publier uniquement un agrégat désidentifié : recrutements et exclusions, achèvements et retours, abandons, écarts de conditions, désaccords de grille,
distributions de scores de référence/immédiats/différés, durée de phase 2 et nombre à 15 minutes, récupérations indépendantes ou semées,
`not_observable_no_failure`, aides, incidents critiques et changements proposés. Avec 5–8 personnes, utiliser seulement des comptes et distributions
descriptifs ; ne pas revendiquer de signification statistique ni que le guide fonctionne.

## Limite de preuve

Écrire ou valider ce protocole ne fournit aucune preuve d’apprentissage. Un tour peut produire des éléments d’utilisabilité et de mesure pour cette
révision précise, mais ne clôt pas Q-001 ou Q-002 et ne fait pas passer le cours, First Win, les Labs ou les fixtures d’évaluation à un statut supérieur.
