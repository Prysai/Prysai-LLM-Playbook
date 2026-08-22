<!-- content_id: learning-practice-contract | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-bootstrap -->

# Contrat de pratique pour apprendre

**Statut :** `draft` · **Preuves d’exécution :** `not_run` · **Plateforme :**
conversation textuelle universelle. Les comportements propres à un produit
doivent être vérifiés dans un adaptateur documenté.

## Le problème

Une réponse bien écrite peut masquer une réponse suggérée à l’avance. Une leçon
terminée peut cacher une dépendance aux indices. Un bon score peut simplement
révéler que la personne connaît déjà le test. Si la cible, les aides, les
tâches, le barème ou les traces changent en cours de route, personne ne sait
exactement ce qui a été démontré.

## Le concept

Un contrat de pratique fixe la capacité visée et les règles de preuve avant que
le coaching commence. Il sépare l’aide formative de la preuve d’un résultat :

```text
référence → rappel → aide graduée → correction par l’apprenant
          → contrôle immédiat modifié → contrôle différé → transfert inédit
```

Le modèle peut poser des questions, donner des indices gradués, expliquer une
erreur et organiser les traces. Ses encouragements et son auto-évaluation ne
sont pas une preuve indépendante.

## Décision

Écrivez le contrat à une résolution observable :

```text
À partir de [contexte], l’apprenant réalisera [action observable]
en [durée], avec [aides autorisées], pour atteindre [seuil du barème].
```

N’utilisez pas « comprendre », « savoir », « apprendre » ou « maîtriser » comme
critère d’acceptation. Décidez les champs suivants avant la première tentative :

| Champ | Décision à prendre |
|---|---|
| Capacité cible | Action observable, conditions, durée et seuil de qualité |
| Aides autorisées | Sources, outils, dictionnaire, notes ou aucune aide |
| Fuite de réponse | Ce que le coach peut révéler, dans quel ordre et à quel moment |
| Référence | Version de la tâche, consignes, durée, aides et barème fixes |
| Tentatives | Conserver les tentatives initiale, corrigée, immédiate, différée et de transfert |
| Journal de correction | Erreur, niveau d’aide, correction de l’apprenant, règle et point non résolu |
| Cas immédiat modifié | Même capacité, détails de surface réellement différents |
| Contrôle différé | Délai annoncé, sans répétition immédiate, nouvelle tâche |
| Transfert inédit | Variation qui change la capacité en profondeur, pas une quasi-copie |
| Évaluateur | Barème fixe ; évaluation déterministe ou indépendante lorsque c’est pertinent |

Utilisez uniquement ces statuts calibrés :

- `template_selected` : le contrat ou le prompt a été choisi et enregistré ;
- `practised` : l’exercice et le relevé d’aide/correction sont terminés ;
- `demonstrated_on_this_task` : le contrôle fixe atteint le barème dans les conditions enregistrées ;
- `retained_at_[delay]` : le contrôle différé atteint le barème après le délai nommé ;
- `transferred_to_[variation]` : une tâche modifiée et inédite atteint le barème.

Aucun de ces statuts ne signifie maîtrise générale, aisance, expertise,
rétention permanente ou performance dans des conditions non testées. Chaque
étiquette s’applique séparément : réussir un transfert aujourd’hui ne crée pas
une preuve de rétention différée.

## Action

1. Écrivez la cible, les conditions, les exclusions, les aides, la règle de fuite et le barème.
2. Donnez la référence fixe avant tout exemple, explication, choix ou indice.
3. Conservez la référence et demandez d’abord un rappel sans aide.
4. Augmentez l’aide d’un seul niveau : localiser l’erreur, donner un indice partiel, puis montrer un fragment travaillé. Notez le niveau maximal utilisé.
5. Demandez une correction rédigée par l’apprenant ; ne remplacez pas silencieusement sa réponse.
6. Faites un contrôle immédiat dont les détails changent, mais pas la capacité ni le barème.
7. Préparez — sans prétendre programmer — un contrôle différé et un transfert inédit. Enregistrez leurs versions avant de les utiliser si possible.
8. Évaluez chaque trace avec le barème fixe. Conservez les désaccords et les inconnues au lieu de les moyenner.
9. N’énoncez que le statut réellement soutenu par les traces enregistrées.

L’exercice requis est local, réversible et sans enjeu : utilisez des données
fictives ou publiques dans un dossier temporaire. N’utilisez ni identifiants,
ni données privées, ni travail client réel, ni contact externe, ni système de
production, ni achat, ni publication, ni action destructive. Si l’une de ces
conditions devient nécessaire, arrêtez-vous et créez un protocole autorisé
séparément.

## Preuves

Conservez un seul paquet de traces :

```text
version_du_contrat | versions_des_tâches | date | modèle/surface
cible | conditions | aides_autorisées | règle_de_fuite | barème | évaluateur
tentative_initiale | indices_utilisés | journal_de_correction | tentative_corrigée
tentative_immédiate_modifiée | tentative_différée | tentative_de_transfert
scores | désaccord_de_l'évaluateur | inconnues | statut | limite_de_l'affirmation
```

Une réponse corrigée immédiatement prouve une pratique, pas une rétention. Un
contrôle fixe réussi peut soutenir `demonstrated_on_this_task`. Une réussite
différée peut soutenir `retained_at_[delay]`. Une réussite dans un cas inédit
peut soutenir `transferred_to_[variation]`. Une preuve manquante reste `not_run`
ou ne doit pas être revendiquée.

## Échecs à provoquer

- Demander la réponse idéale avant la référence : le coach doit conserver la règle de non-divulgation ou marquer la référence comme contaminée.
- Répéter une phrase de la leçon comme tâche de transfert : l’évaluateur doit la rejeter comme quasi-copie.
- Demander au modèle qui a enseigné de déclarer la maîtrise : il doit refuser ou limiter l’affirmation et signaler sa dépendance à l’évaluateur.
- Manquer la date du contrôle différé : enregistrer `not_run`, sans déduire une rétention du résultat immédiat.

## Réflexion

Quel résultat dépendait le plus des indices ? Quelle variation était vraiment
nouvelle ? Que contesterait un évaluateur indépendant ? Quel est le plus petit
contrôle ultérieur qui pourrait renforcer — ou réfuter — l’affirmation actuelle ?

## Liste de contrôle

- [ ] La cible est une action observable avec des conditions et un seuil.
- [ ] Les aides et les règles de divulgation sont fixées avant la référence.
- [ ] Tentatives, indices, corrections, scores et inconnues sont conservés.
- [ ] Le contrôle immédiat change le cas sans changer la capacité.
- [ ] Contrôle différé et transfert inédit sont distincts et utilisent le même barème.
- [ ] L’évaluateur, les désaccords et la dépendance éventuelle sont visibles.
- [ ] Le vocabulaire de statut correspond exactement aux preuves disponibles.
- [ ] Aucun statut ne signifie maîtrise, aisance ou expertise générale.
- [ ] Le parcours n’utilise ni secret, ni effet externe, ni production.

## Sources et entretien

- [Apprentissage durable assisté par LLM](../evidence-library-FR.md#source-notes) — synthèse candidate sur le rappel, le feedback, l’espacement, la rétention, le transfert et les limites d’affirmation ; consultée le 12/08/2026.
- [Terminologie du projet](../evidence-library-FR.md#core-terms) — distinction entre modèles, outils, Skills, Agents, preuves et parcours d’apprentissage.
- [Pack de pratique débutant](../communication-clinic-FR.md) — routes de langue, de travail et de recherche qui appliquent ce contrat.

Ce guide est un texte original du projet. La fiche de recherche indique ce que
les sources pédagogiques soutiennent et ce qu’elles ne démontrent pas. Revérifiez
les documents du produit avant d’ajouter une action propre à une plateforme.
Cette version n’a encore aucun essai d’apprenant, contrôle différé, résultat de
transfert ni évaluation indépendante.
