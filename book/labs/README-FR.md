<!-- content_id: book-labs-readme | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-lab-index -->

# Prysai LLM Playbook : index des Labs

<!-- language-switcher:start -->
**Langues :** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | [繁體中文](README-ZHTW.md) | [Français](README-FR.md)
<!-- language-switcher:end -->

Les Labs servent à vérifier, sur une petite tâche observable, si une manière de
demander de l’aide à un LLM rend le travail plus clair. Ils ne constituent pas
un cours séparé de formalités et ne supposent ni Codex Cloud ni programmation.
Chaque Lab pose une question visible : les faits sont-ils conservés ? La forme
demandée est-elle respectée ? Les inconnues sont-elles signalées ? La modification
laissée peut-elle être relue par quelqu’un d’autre ?

## Commencer par le résultat voulu

- [Lab 001](lab-001-first-safe-task-FR.md) : comparer une demande vague à une
  demande vérifiable, d’abord sans code puis dans un répertoire temporaire ;
- [Lab 002](lab-002-task-protocol-FR.md) : transformer « aide-moi » en contrat
  de tâche avec objectif, contexte, limites, réception et arrêt ;
- [Lab 008](lab-008-research-question-FR.md) : vérifier une réponse fondée sur
  une liste de sources fournie, sans prétendre avoir fait toute la recherche ;
- [Lab 011](lab-011-gpt-codex-boundaries-FR.md) : distinguer modèle, interface,
  outil et Agent avant d’attribuer une action au mauvais composant.

Si vous ne disposez que d’une fenêtre de chat, le premier Lab suffit. N’installez
pas d’outil et n’utilisez pas un projet réel pour suivre le catalogue. Passez à
un exercice de fichiers seulement lorsque vous pouvez nommer un répertoire temporaire,
une cible autorisée et la preuve que vous conserverez.

## État actuel

Le catalogue contient 18 identifiants stables. Les 18 Labs sont encore `draft`
et leur `run_status` d’apprenant est `not_run`. Les fichiers français existent
pour les 18 entrées, mais la traduction reste `in-progress` : une présence de
fichier ou un contrôle de liens réussi ne prouve ni une relecture native, ni un
apprentissage, ni un comportement fiable sur toutes les plateformes.

## Carte des Labs

| Lab | Capacité travaillée | Niveau | Entrée française |
|---:|---|:---:|---|
| 001 | Rendre la première demande exploitable | L1 | [Ouvrir](lab-001-first-safe-task-FR.md) |
| 002 | Protocole de tâche | L2 | [Ouvrir](lab-002-task-protocol-FR.md) |
| 003 | Revue des preuves | L3 | [Ouvrir](lab-003-evidence-review-FR.md) |
| 004 | Choisir un Skill | L4 | [Ouvrir](lab-004-skill-selection-FR.md) |
| 005 | Concevoir un Skill | L4 | [Ouvrir](lab-005-design-a-skill-FR.md) |
| 006 | Conditions d’arrêt d’un Agent | L5 | [Ouvrir](lab-006-agent-stop-conditions-FR.md) |
| 007 | Limites d’action | L3 | [Ouvrir](lab-007-action-boundaries-FR.md) |
| 008 | Question de recherche | L3 | [Ouvrir](lab-008-research-question-FR.md) |
| 009 | Cycle de vie d’ingénierie | L3 | [Ouvrir](lab-009-engineering-lifecycle-FR.md) |
| 010 | Contexte produit partagé | L3 | [Ouvrir](lab-010-product-context-FR.md) |
| 011 | Frontières entre GPT et Codex | L0 | [Ouvrir](lab-011-gpt-codex-boundaries-FR.md) |
| 012 | Faire passer une capacité à une équipe | L6 | [Ouvrir](lab-012-team-capability-migration-FR.md) |
| 013 | Tranche verticale vérifiable | L3 | [Ouvrir](lab-013-l3-vertical-slice-FR.md) |
| 014 | Reprendre après une interruption | L3 | [Ouvrir](lab-014-resume-reconciliation-FR.md) |
| 015 | Livrer avec des preuves | L5 | [Ouvrir](lab-015-evidence-delivery-FR.md) |
| 016 | Limiter les effets de bord | L3 | [Ouvrir](lab-016-side-effect-boundary-FR.md) |
| 017 | Auditer la découverte d’un Skill | L4 | [Ouvrir](lab-017-skill-discovery-audit-FR.md) |
| 018 | Transférer une méthode d’apprentissage | L2 | [Ouvrir](lab-018-language-transfer-FR.md) |

Les numéros sont des identifiants de catalogue, pas un ordre obligatoire. Le
[parcours d’apprentissage](../../docs/governance/learning-path.yaml) définit
les niveaux et les prérequis déclarés.

## Exécuter un Lab avec prudence

1. Utilisez un répertoire temporaire, une révision d’entrée fixe et aucune véritable
   donnée d’identification.
2. Lisez la limite de permission et d’effets de bord avant toute action.
3. Conservez l’état initial, les commandes, les sorties, le diff, l’échec et les
   inconnues.
4. Arrêtez-vous si la cible, l’autorité, la source ou le retour arrière n’est
   pas observable.
5. Ne faites l’exercice de transfert qu’après avoir enregistré l’exercice
   initial.

## Limite de statut

`draft` signifie que les preuves prévues par le projet manquent encore avant de
parler de contenu `candidate`, `verified` ou `production-ready`. `not_run`
signifie qu’aucun résultat d’exécution d’apprenant n’est enregistré ici. Deux
paquets de référence mainteneur (Labs 008 et 013) existent séparément ; ils ne
constituent pas un résultat d’apprentissage et ne changent pas le statut
`not_run` des apprenants.

## Revenir aux autres entrées françaises

- [Guide du livre](../README-FR.md)
- [Préface](../preface-FR.md)
- [Table des matières](../table-of-contents-FR.md)
- [Cartes de pratique pour débutants](../communication-clinic-FR.md)
