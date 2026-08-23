<!-- content_id: prysai-platform-fact-watch | locale: FR | language: fr | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: 2dfe4e3 | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-platform-fact-watch
description: >
  Maintenir à jour les affirmations pédagogiques portant sur une plateforme
  nommée lorsqu’un document fournisseur, une interface, une permission, un
  modèle, un parcours de compte ou un lien a pu changer. À utiliser lorsqu’un
  responsable de programme doit identifier les chapitres, Labs, Skills,
  parcours et limites temporaires visibles par les lecteurs qui sont touchés
  pour Codex, Claude Code, Grok, ChatGPT, Gemini, Copilot ou toute autre
  plateforme LLM nommée. Ne pas l’utiliser pour rechercher des faits, admettre
  un nouvel adaptateur, exécuter une plateforme ou comparer des modèles.
---

# Veille des faits de plateforme

Transformez « cette plateforme a peut-être changé » en une petite décision de
maintenance. Ce Skill inventorie les affirmations existantes et leur rayon
d’impact. Il ne navigue pas sur le Web, n’exécute pas un produit, ne publie pas
de version et ne remplace pas une revue de source.

## Commencer par une fiche d’affirmation

Exigez une plateforme nommée, une affirmation appuyée par une source ou un
identifiant d’affirmation, son emplacement actuel visible par le lecteur,
l’organisation responsable de la source et son URL, la date de dernière
vérification, le périmètre, le responsable, la prochaine revue et le motif de
la revue. Un champ manquant doit être marqué `unreviewed`, et non traité comme
une case vide sans conséquence.

Gardez l’affirmation étroite. « Claude Code possède un mode de permission » et
« Grok Build possède une route API » sont deux fiches distinctes. Un nom de
plateforme, un libellé de fonctionnalité ou une réponse HTTP ne remplace pas
une affirmation.

## Classifier le signal de changement

Choisissez un seul statut, sans déduire le comportement actuel du produit :

- `review_due` : la date de revue prévue est arrivée ou la source n’a pas été
  vérifiée selon l’intervalle déclaré ;
- `source_changed` : une revue datée d’une source de première partie relève une
  différence matérielle par rapport à l’affirmation enregistrée ;
- `source_unavailable` : la source citée ne permet actuellement plus d’étayer
  l’affirmation ;
- `scope_changed` : l’affirmation peut ne plus s’appliquer à la surface, au
  compte, à la région, à la version ou à la limite de permission nommée ;
- `no_change_recorded` : une revue datée d’une source de première partie a
  retrouvé la même affirmation dans le même périmètre ;
- `unreviewed` : aucune revue de première partie appropriée n’est disponible.

Ne choisissez pas `no_change_recorded` à partir de votre mémoire, d’une URL
redirigée, d’un extrait de recherche, d’une publication communautaire ou d’une
connexion réussie. Une vérification de source confirme une phrase uniquement
pour la date et le périmètre enregistrés.

## Cartographier la surface pédagogique touchée

Listez chaque unité canonique touchée et indiquez son rôle :

```text
claim_id:
platform / surface:
source owner / URL:
last_checked / next_review:
change_status:
affected_units:
  - path | role: stable_core | adapter_fact | task_step | Lab | Skill | route | generated_page
reader_risk: none | clarification | pause_named_step | remove_current_claim
safe_interim_text:
owner:
next_action:
```

Les principes du socle stable — autorité explicite, preuves, récupération et
limitation des effets de bord — restent normalement utilisables. Une commande,
une interface, une permission par défaut, un prix, un droit d’accès, une
intégration ou la disponibilité d’un modèle sont des faits d’adaptateur et
doivent faire l’objet d’une revue de source. Ne transformez pas un changement
de source en affirmation selon laquelle tout le cours serait devenu inutilisable.

## Choisir l’action sûre la plus petite

- `no_change_recorded` : conservez le libellé dans son périmètre et mettez à
  jour uniquement le reçu de revue ; n’en déduisez pas une durabilité plus
  large.
- `review_due` ou `unreviewed` : conservez le socle universel, marquez l’étape
  nommée pour revue et transmettez le fait actuel à
  `prysai-source-investigator`.
- `source_changed`, `source_unavailable` ou `scope_changed` : mettez en pause
  ou retirez l’étape pédagogique nommée jusqu’à ce qu’une revue de source
  établisse un nouveau libellé. Conservez la fiche précédente comme preuve
  historique.
- si le changement remet en question la source, l’exécution, l’autorité ou le
  relevé d’échec de l’adaptateur, transmettez la décision d’admission à
  `prysai-platform-adapter-review`.
- si une affirmation publique, une page générée ou une note de version expose
  déjà l’ancien fait, transmettez le paquet d’artefacts à
  `prysai-evidence-review` avant de publier une correction.

Ne réécrivez jamais silencieusement une procédure produit à partir de votre
mémoire. Ne déclarez pas qu’un adaptateur est admis, sûr, équivalent ou prêt
pour la production à partir d’un reçu de fraîcheur.

## Retourner un reçu de maintenance

Retournez exactement un enregistrement contenant la fiche d’affirmation, le
statut de changement, les unités touchées, le risque pour le lecteur, le texte
intermédiaire sûr, la transmission pour revue de source, toute transmission
vers une revue d’adaptateur ou d’affirmation, le responsable, la prochaine
revue et les éléments inconnus.

Terminez par cette limite : `This receipt manages the freshness boundary of one named platform claim. It does not prove current product behavior, account access, permission safety, runtime success, adapter admission, model quality, learner outcome, or cross-platform equivalence.`

## Fiche de maintenance

- `source` : méthode originale de maintenance de Prysai Lab, dérivée de
  l’ADR-0025, du cycle de vie du contenu, du registre d’impact des faits et du
  dossier d’admission d’un adaptateur borné par ses sources
- `license` : réécriture originale ; la documentation de plateforme de première
  partie et les rapports publics restent des références uniquement selon
  `docs/sources/asset-register.md`
- `owner` : facts-maintainer
- `version` : `0.1.0`
- `review_date` : `2026-09-14`
- `content_status` : `candidate`
