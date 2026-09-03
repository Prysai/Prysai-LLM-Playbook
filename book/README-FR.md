<!-- content_id: book-readme | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: 2026-08-22-fr-book-guide-expansion -->

# Guide du livre Prysai LLM Playbook

> Point d’entrée français. Les 22 chapitres et les 18 Labs ont un fichier
> source dans chacune des huit locales enregistrées ; aucun Lab ni parcours de
> lecture n’est déclaré vérifié en runtime tant qu’un enregistrement de preuve
> n’existe pas.

<!-- language-switcher:start -->
**Langues :** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | [繁體中文](README-ZHTW.md) | [Français](README-FR.md)
<!-- language-switcher:end -->

## Commencez par les fondamentaux des LLM

L’ordre par défaut est un chemin, pas un menu de chapitres concurrents :

1. [Unité 1 — notions LLM](guides/llm-fundamentals-FR.md) — tokens, contexte,
   prompts, outils, MCP, Agents et Skills ;
2. [Fondations LLM : première route universelle](routes/universal-core-foundations-FR.md)
   — expliquer, commencer, identifier, réparer, puis transférer ;
3. [Première modification sûre](routes/first-safe-change-FR.md)
   — rendre visibles le but, le contexte, les limites et la forme de la réponse ;
4. [Contrat du cours de base (locale-neutral)](evidence-library-FR.md#method-and-status) ;
5. [Inventaire du contenu de base (locale-neutral)](../docs/governance/core-content-inventory.yaml).

Les cartes de prompts, les boucles de langue, les Labs Codex et les Skills
constituent la pratique d’application facultative après les fondations. Elle ne
remplace pas le cœur LLM ; son état `candidate` / `not_run` reste affiché.

Le livre organise une méthode transférable autour des limites du modèle, du
contexte, des échecs observables, du contrôle et d’une tâche inconnue. Codex
est le parcours pratique le plus approfondi pour le moment ; cela ne signifie
pas que les autres plateformes se comportent de la même manière.

## Avant de choisir une plateforme ou une application

Terminez le cœur LLM avant d’ouvrir une route Codex, Claude Code, Gemini, Grok,
outil, Agent, Skill ou domaine métier. Le cœur donne le vocabulaire et les
contrôles nécessaires pour distinguer une réponse fluide d’un résultat étayé.
Après cela, utilisez la [première tâche LLM universelle](routes/universal-core-foundations-FR.md)
ou le parcours Codex lorsque ses limites et ses sources correspondent à votre
tâche. Si vous n’avez pas de projet temporaire, faites la [première modification
sûre](routes/first-safe-change-FR.md) avant le Lab 001.

Le but n’est pas de connaître davantage de noms de produits. C’est de prendre
une décision que vous pouvez expliquer, inspecter et améliorer.

## Le contrat de chaque chapitre

Avant d’entrer dans le chemin principal, un chapitre doit rendre visibles :

- un objectif d’apprentissage ;
- les concepts nécessaires à la décision ;
- une expérience suffisamment petite pour être utile ;
- un échec intentionnel ou un cas limite ;
- une tâche de transfert dans un autre contexte ;
- des preuves d’acceptation qu’un lecteur peut réellement relire ;
- les faits actuels, leurs sources et leur périmètre de revue ;
- un état de maturité et de mise à jour qui ne dépasse pas les preuves.

Le [cadre d’évaluation (locale-neutral)](evidence-library-FR.md#method-and-status) définit le
seuil minimal. Une fiche de chapitre, un validateur structurel vert ou une
réponse générée agréable ne suffisent pas à appeler le chapitre `verified`.

## État actuel de la lecture

Le dépôt contient 22 chapitres structurés, tous enregistrés `candidate`, y
compris les chapitres 19 à 22. Les fichiers et les routes de lecture existent,
mais les prétests en contexte frais, les essais d’apprenants et la relecture
indépendante restent incomplets.

Le jeu d’évaluation comprend 40 tâches fixes réparties sur 16 parcours. Il est
`candidate`, son statut d’exécution est `not_run` et sa revue reste limitée à la
structure tant que des journaux d’exécution de modèles n’existent pas. La
collection contient 18 Labs, chacun `draft` avec `run_status: not_run`.

## Où entrer dans le livre

- [Première tâche LLM universelle](routes/universal-core-foundations-FR.md) —
  commencer par une réécriture textuelle fictive, puis travailler quatre
  fondations transférables ; `candidate / not_run` ;
- [Fondations LLM : première route universelle](routes/universal-core-foundations-FR.md)
  — le chemin français disponible en cinq étapes ;
- [Unité 2 : contexte, instructions et première génération](guides/llm-fundamentals-FR.md)
  — les notions et la première fiche de tâche sans configuration Codex ni outil ;
- [Première modification sûre](routes/first-safe-change-FR.md) — pont hors
  ligne facultatif entre le chapitre 2 et le Lab 001 ;
- [Préface](preface-FR.md) ;
- [Table des matières française](table-of-contents-FR.md) ;
- [Pack de pratique débutant](communication-clinic-FR.md#first-practice-intake)
  — routes facultatives pour apprendre, rechercher, décider ou créer ;
- [Six messages courts pour pratiquer l’espagnol](communication-clinic-FR.md#six-short-spanish-messages)
  — un échange textuel fictif en quatre tours, sans promesse de fluidité ;
- [Boucle de mise à jour professionnelle](work-update-practice-loop-FR.md) —
  préserver les faits, réviser une phrase et laisser une fiche ;
- [Boucle de contrôle de recherche](research-check-practice-loop-FR.md) —
  vérifier une affirmation à partir de documents fournis ;
- [Six messages courts pour une recherche bornée](communication-clinic-FR.md#six-short-research-messages)
  — un contrôle de décision appuyé par des sources fournies ;
- [Fiche de portée des sources](communication-clinic-FR.md#retrieval-scope-receipt)
  — classer une liste fictive selon une règle explicite ;
- [Share Check](communication-clinic-FR.md#share-check) — choisir un élément
  fictif plus petit à partager ou s’arrêter avant tout envoi ;
- [Carte du projet (locale-neutral)](evidence-library-FR.md#method-and-status) — emplacement des chapitres,
  Labs, Skills, recherches et contrôles ;
- [Source canonique de navigation (locale-neutral)](../docs/governance/book-navigation.yaml) ;
- [Cadre d’évaluation neutre par langue (locale-neutral)](evidence-library-FR.md#method-and-status) ;
- [Évaluation du modèle Luna (locale-neutral)](evidence-library-FR.md#method-and-status) ;
- [Recherche de base OpenAI/Codex (locale-neutral)](evidence-library-FR.md#source-notes) ;
- [Index des problèmes réels (locale-neutral)](evidence-library-FR.md#source-notes).

Les chapitres anglais sont les sources canoniques de contenu. Les pages
françaises gardent leur navigation française lorsque le fichier cible existe.
Les documents de gouvernance, les registres de sources, les validateurs et les
ADR restent dans leur langue de maintenance ; ils ne sont pas silencieusement
présentés comme des traductions.

Les exemples de référence actuels sont le [chapitre 12](chapters/12-agent-loop-and-stop-FR.md)
et le [Lab 006](labs/lab-006-agent-stop-conditions-FR.md), qui montrent comment
noter l’état, les conditions d’arrêt, la récupération et la passation.

## Le chemin d’apprentissage

Le livre développe deux capacités en même temps.

**Comprendre le système.** Commencez par les modèles et les LLM, puis voyez
comment un produit relie un modèle à un projet, aux fichiers, au terminal, au
navigateur, à GitHub et aux services externes. Les chapitres rendent concrets
le contexte, les outils, les Skills, les Plugins, les connecteurs, MCP, les
Agents et les permissions au lieu de les traiter comme des synonymes.

**Agir sur le système.** Commencez par une tâche bornée et peu risquée. Exercez
la formulation du but, le choix du contexte, la planification, l’exécution, la
vérification, la relecture et la livraison. Apprenez ensuite à choisir ou
concevoir des Skills, à comparer des modèles et des workflows, puis à former
un paquet de méthode relisible par une équipe.

La théorie sans run reste du vocabulaire. L’usage d’outils sans limites
transforme un succès accidentel en habitude peu fiable.

## La boucle d’un chapitre

Chaque chapitre suit une séquence stable :

```text
problème → concept → décision → action → preuve → échec → réflexion → transfert
```

L’expérience est une tâche pour le lecteur, pas la promesse que l’auteur a
exécuté tous les environnements possibles. Elle peut demander un résultat, un
diff, un journal, une source, une capture ou une réflexion. La preuve demandée
fait partie de la leçon : elle apprend à distinguer « la sortie paraît finie »
de « le travail annoncé a effectivement été contrôlé ».

## Comment le livre utilise les problèmes réels

La recherche rassemble des rapports publics et des expériences de communauté
sur l’authentification, la configuration, les worktrees, les surfaces Cloud,
les listes réseau, les mises à jour et d’autres workflows Codex. Ces cas servent
à aiguiser une décision ou un exercice d’échec. Un rapport n’est pas réécrit en
cause officielle, et une astuce de communauté n’est pas présentée comme un
correctif pris en charge.

Chaque cas conserve sa source, sa date, son niveau de preuve et son statut de
reproduction locale. La valeur pratique est donc précise : reconnaître un
symptôme, faire un premier contrôle sûr, choisir un repli plus petit et dire
ce qui reste inconnu.

## Ce qu’un lecteur doit pouvoir montrer

Pour déclarer une capacité apprise, vous devez pouvoir :

1. expliquer le concept et sa limite sans recopier une définition ;
2. réaliser la tâche dans un environnement réel ou peu risqué ;
3. justifier le modèle, l’outil, le Skill, la permission et la condition d’arrêt
   choisis ;
4. repérer une erreur, un risque, une hallucination, un élément incomplet ou
   un fait périmé.

Le [modèle d’apprentissage (locale-neutral)](evidence-library-FR.md#method-and-status) et le [cadre d’évaluation (locale-neutral)](evidence-library-FR.md#method-and-status)
décrivent ces preuves plus précisément. Un journal manquant maintient un item
à `draft`, `candidate` ou `not_run` ; il ne devient pas une preuve par
implication.

## Règle des locales

L’anglais est la locale publique par défaut. Chaque fichier de lecture
localisé, y compris la source anglaise, porte un suffixe majuscule : `-EN`,
`-ZH`, `-ES`, `-JA`, `-KO`, `-DE`, `-ZHTW` ou `-FR`. L’identité stable du
chapitre reste la même dans toutes les traductions.

Lorsqu’une cible traduite existe, les liens restent dans la locale courante.
Les fichiers de gouvernance, registres, validateurs et ADR sont volontairement
neutres. Un ancien lien sans suffixe n’est utilisé que lorsqu’il est marqué
explicitement comme migration en cours. Consultez la [décision sur les suffixes
de locale (locale-neutral)](evidence-library-FR.md#method-and-status).

Les huit locales sont désormais exposées pour les 22 chapitres et les
18 Labs. Cette couverture ne prouve ni la relecture native indépendante, ni
l’équivalence sémantique, ni les résultats d’apprenants, ni le comportement
d’une plateforme. La traduction française reste `in-progress`.

## Séquence de départ recommandée

1. Lisez la [préface française](preface-FR.md) pour comprendre le modèle de
   travail.
2. Ouvrez la [table des matières française](table-of-contents-FR.md) et
   choisissez un chapitre ; les liens de lecture restent en français.
3. À la fin d’un chapitre, utilisez le lien **Chapitre précédent** ou
   **Chapitre suivant** généré. Le premier n’a qu’un lien suivant, le dernier
   qu’un lien précédent.
4. Lisez les limites et les exigences de preuve avant de toucher à un outil,
   un service externe ou un credential.
5. Exécutez uniquement la plus petite expérience réversible définie par le
   chapitre.
6. Conservez résultat, diff, sorties, sources et réflexion avant de décider
   que la méthode se transfère.

Le but n’est pas de terminer les pages rapidement. Il est de laisser une trace
qu’une autre personne peut relire, reproduire dans le périmètre déclaré et
mettre à jour lorsque le produit ou l’environnement change.

**État de traduction :** `in-progress` · **Maturité du contenu :** `candidate`
pour les chapitres et `draft / not_run` pour les Labs. Une couverture de fichiers
ne vaut pas une preuve d’apprentissage, une relecture native ou une préparation
de production.
