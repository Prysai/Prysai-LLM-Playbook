<!-- content_id: newcomer-entry-observation-protocol-v1 | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: newcomer-entry-observation-protocol-v1.md | source_revision: 2026-08-23 -->

# Protocole v1 d’observation de l’entrée pour les débutants

**Statut :** protocole `candidate`. Aucun recrutement, aucune session avec un participant et aucun résultat n’ont été enregistrés.

## Ce que cette observation peut éclairer

Un adulte qui n’a jamais envoyé de prompt à un modèle conversationnel génératif peut-il trouver la bonne première voie, atteindre le contrôle sans configuration et faire un essai à faible risque, uniquement textuel, sans ajouter de données privées ni d’autorité imprévue ?

Il s’agit d’une observation de l’utilisabilité de l’entrée, pas d’une étude d’efficacité. Elle peut éclairer les libellés, l’ordre des voies et les formulations d’arrêt pour cette révision candidate précise. Elle ne peut pas établir l’apprentissage, la rétention, le transfert, la qualité du modèle, la demande du marché, l’efficacité de la sécurité ni le bon fonctionnement de l’ensemble du cursus pour les débutants.

## Qui compte comme débutant

Recrutez 5 à 8 adultes consentants qui répondent **non** à la question de sélection suivante :

> Avant aujourd’hui, avez-vous déjà envoyé un prompt à un modèle conversationnel génératif ?

N’enregistrez que `no`, `yes` ou `unsure` ; ne recueillez ni nom de produit, ni nom de compte, ni employeur, ni dossier scolaire, ni explication. Les réponses `yes` et `unsure` ne constituent pas des observations de débutants. Elles peuvent participer à une observation distincte et clairement étiquetée de lecteurs expérimentés, jamais être mélangées au résultat des débutants.

Ne recrutez pas de mineurs, de subordonnés directs, d’étudiants dont la note pourrait être influencée, ni de personnes pour lesquelles un refus pourrait entraîner une sanction.

## Conditions d’entrée fixes

Avant la première session, déterminez sans utiliser de noms personnels :

- un SHA de commit candidat immuable et une URL d’entrée ;
- les rôles de modération, de responsable de la confidentialité et de revue indépendante ;
- le navigateur, le viewport, la langue et la surface de modèle conversationnel disponible ;
- la date de fin de conservation et le responsable de la suppression ;
- le message source fictif et la révision du prompt.

Conservez fixes, pour la session, la révision de la page, les libellés des voies, la source fictive et le formulaire d’observation. Si l’un de ces éléments change, arrêtez la session et commencez-en une nouvelle. Le [protocole pilote First Win v2](first-win-pilot-protocol-v2.md) reste l’étude distincte et plus approfondie de fidélité aux sources pour les utilisateurs expérimentés de modèles conversationnels.

## Déroulement de la session

### 1. Choisir une voie sans aide

Ouvrez la page d’entrée candidate. N’expliquez ni Codex, ni l’échauffement, ni le fixture. Posez seulement la question suivante :

> Vous n’avez pas de projet ni de code à modifier et vous voulez faire un premier essai sans risque. Qu’ouvririez-vous ensuite, et pourquoi ?

Enregistrez la première voie choisie et indiquez si la personne atteint le contrôle LLM sans configuration. Le bon choix est la voie textuelle sans configuration. La personne peut s’arrêter sans choisir ; notez alors `stopped_by_reader`, et non une mauvaise réponse.

### 2. Faire un essai borné

Montrez le message source fictif fixe déjà utilisé par le contrôle public sans configuration :

> Bonjour, l’atelier a changé. Il commence vendredi à 10 h. Apportez le brouillon. Dites-moi si vous ne pouvez pas venir.

La personne peut utiliser un compte de modèle conversationnel qu’elle contrôle, ou s’arrêter si aucune surface sûre n’est disponible. Elle ne copie que le prompt textuel fourni, sans ajouter de fichier, d’accès au navigateur, d’extension, d’identifiant, d’information personnelle ni d’action externe. La modération peut expliquer comment fermer la page ou s’arrêter, mais ne doit pas indiquer quelle voie ou quelle réponse choisir.

### 3. Enregistrer le contrôle de la limite

Demandez à la personne d’indiquer si la réponse conserve l’heure et le brouillon, maintient la demande de réponse et n’ajoute aucun détail. Ne recueillez ni réponse du modèle, ni identifiant de compte, ni capture d’écran, ni historique de conversation, ni contenu du presse-papiers. Enregistrez uniquement les trois marques, le temps écoulé, l’aide utilisée et le choix éventuel de s’arrêter.

### 4. Courte réflexion

Posez deux questions neutres :

1. Qu’est-ce que cet exercice vous demandait de vérifier vous-même ?
2. Qu’est-ce qui vous ferait vous arrêter avant d’envoyer une autre demande ?

Ne conservez une courte note désidentifiée que si elle ne contient aucune information personnelle, de compte ou de lieu de travail. Sinon, inscrivez `reflection_not_retained`.

## Enregistrement minimal

Utilisez une ligne désidentifiée par session :

```text
session_code | newcomer_screen | candidate_sha | entry_route_first_selected
no_setup_reached | attempt_started | attempt_completed | time_seconds
check_time_and_draft | check_reply_request | check_no_added_details
help_used | stopped_by_reader | safety_stop | retained_reflection_note
reviewer_route_assessment | reviewer_disagreement
```

Les valeurs autorisées pour `help_used` sont `none`, `navigation_only`, `stop_or_close_help` et `other_recorded`. N’inférez pas une compétence à partir du temps écoulé ou d’une réponse correcte du modèle. La personne qui révise évalue uniquement l’adéquation de la première voie choisie à la condition énoncée ; les marques consignent le jugement du participant, et non la preuve qu’il est correct.

## Règles d’arrêt et de confidentialité

Arrêtez immédiatement si la personne saisit des informations privées, liées à l’employeur, à la santé, aux finances ou au compte ; croit participer à une évaluation ; demande au modérateur de choisir une action réelle ; ou manifeste une détresse. Retirez les informations de l’écran et notez seulement `safety_stop` et un code de motif non identifiant.

Ne conservez ni enregistrement d’écran, ni transcription du modèle, ni adresse e-mail, ni adresse IP, ni nom de compte, ni prompt privé, ni sortie brute du chat. Le responsable de la confidentialité supprime les observations désidentifiées à la fin de la période annoncée, sauf si une nouvelle décision de conservation, autorisée séparément, est enregistrée avant cette date.

## Ce qu’il faut rapporter

Publiez au maximum un agrégat désidentifié : personnes dépistées, admissibles, ayant commencé, terminé ou arrêté, répartition des voies, personnes ayant atteint le contrôle sans configuration, aide utilisée, arrêts de sécurité et désaccords entre réviseurs. Avec 5 à 8 participants, rapportez les décomptes et les changements de l’instrument uniquement ; ne calculez pas de significativité et ne revendiquez pas un taux d’achèvement pour une population plus large.

## Limite des preuves

Écrire, valider ou exécuter ce protocole ne clôt pas à lui seul Q-001, Q-002 ou Q-013. Une session peut seulement montrer si l’expérience d’entrée indiquée était observable pour cette petite cohorte fixe et cette révision candidate. Toute affirmation sur le cursus, un Skill, la sécurité, une plateforme, les apprenants ou la publication conserve son statut enregistré séparément.
