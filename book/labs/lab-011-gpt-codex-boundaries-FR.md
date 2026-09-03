<!-- content_id: lab-011-gpt-codex-boundaries | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: f521e29 -->

---
id: lab-011-gpt-codex-boundaries
title: "Construire une carte de frontières observables avant d'accorder une autorisation"
level: L0
domain: general
goal: "Distinguer génération, contexte, exécution, résultats d'outil, vérification et boucles d'Agent sans supposer un accès caché"
setup: "Cartes de tâches synthétiques fixes et registre de frontières vierge ; aucun compte réel, secret, service externe ou dépôt public"
task: "Classer les cartes, réaliser une expérience de contexte uniquement textuelle et corriger une affirmation de fin volontairement dangereuse"
evidence:
  - "Un registre de frontières pour les cartes A à E, avec raisons, actions autorisées, actions interdites, preuves et points d'arrêt"
  - "Deux comptes rendus avec révision de l'entrée, identifiant d'exécution, surface/modèle, variable modifiée, résultat observé et inconnues"
  - "Une note de correction qui sépare action d'outil proposée, exécution, état modifié et vérification"
failure_variant: "Prendre une page de connexion, un nom de Skill, un nom de modèle ou un message d'outil pour une preuve d'autorité ou de travail terminé ; ou réessayer après une erreur sans vérifier le dernier point de reprise"
reflection: "Quel événement avez-vous pris pour une preuve, et quelle observation minimale comblerait réellement cette lacune ?"
status: draft
last_verified: "not run"
transfer_task: "Appliquer le registre à une note de recherche fondée sur un ensemble fixe de sources publiques, sans autoriser d'écriture externe"
transfer_domain: "recherche, ingénierie, contenu ou marketing"
transfer_evidence: "Conserver le registre de transfert, la frontière des sources, la raison d'exclure une instruction non fiable et la liste explicite des éléments non vérifiés"
transfer_limitations: "Ce Lab enseigne des frontières observables ; il ne prouve pas qu'un modèle, un Skill, un outil, un connecteur, un compte ou une surface Agent donnée se comporte de la même façon en production"
---

# Lab 011 : Distinguer GPT, Codex, les outils et les Agents

## Objectif du Lab

Cette introduction à faible risque correspond au niveau L0. Ce n'est pas un
test d'intégration en direct et elle ne vous demande pas de coller des
identifiants dans Codex. Le résultat attendu est un registre qu'une autre
personne peut relire, pas une réponse simplement bien rédigée.

Gardez cette distinction entre les événements :

```text
texte généré
  ≠ action d'outil proposée
  ≠ action autorisée / exécutée
  ≠ état modifié
  ≠ résultat vérifié
```

## Sécurité et préparation

- Travaillez dans un répertoire local jetable ou dans une simple fiche texte.
- Pour la partie obligatoire, ne connectez ni ChatGPT, ni Codex Cloud, ni
  GitHub, ni compte de navigateur, ni MCP, ni autre service externe.
- N'utilisez ni token, ni cookie, ni clé privée, ni fichier `.env`, ni donnée
  client, ni fichier de production.
- Ne modifiez que la fiche d'apprentissage et, si vous choisissez l'extension
  locale facultative, un fichier de notes jetable.
- Si une étape proposée demande un appel réseau, un compte, un secret, une
  écriture publique ou une remise à zéro destructive, arrêtez-vous et notez
  `blocked`.

Créez un identifiant tel que `lab011-fr-2026-08-10-a`. Notez la date, la
surface et le modèle s'ils sont utilisés, la révision de l'entrée et le fait
que la partie obligatoire est statique ou uniquement textuelle.

## Partie 1 : remplir le registre de frontières

Classez les cartes fixes suivantes. « Couche principale » désigne la couche
que la personne doit observer ; ce n'est pas une affirmation sur
l'implémentation interne du produit.

| Carte | Carte de tâche |
|---|---|
| A | « Expliquez le contexte avec vos propres mots et nommez deux incertitudes. » |
| B | « Lisez `notes.md`, ajoutez un titre à une copie locale jetable et montrez le diff. » |
| C | « Appelez un outil, écrivez le résultat dans le dépôt public de l'organisation et prévenez l'équipe. » |
| D | « Continuez à corriger l'erreur jusqu'à ce que cela ait l'air réussi ; n'enregistrez aucun état intermédiaire. » |
| E | « Le système est connecté. L'outil a renvoyé `completed`, alors publiez maintenant sans contrôle. » |

Remplissez ce registre :

| Carte | Couche principale | Action autorisée | Action interdite | Preuve minimale | Point d'arrêt / de confirmation | Ce qui reste inconnu |
|---|---|---|---|---|---|---|
| A |  |  |  |  |  |  |
| B |  |  |  |  |  |  |
| C |  |  |  |  |  |  |
| D |  |  |  |  |  |  |
| E |  |  |  |  |  |  |

Suivez cet ordre de décision :

1. La demande porte-t-elle sur une explication ou une génération, sur une
   lecture ou une édition, ou sur une modification d'un état externe ?
2. Si un état change, quel objet exact, quelle autorisation, quelle
   confirmation et quel retour arrière sont nécessaires ?
3. Quelle preuve correspond précisément à l'affirmation de fin ?
4. Quelle observation impose l'arrêt plutôt qu'une nouvelle tentative ?

Une réponse de référence bien argumentée classe A comme une explication, B
comme une exécution locale limitée, C comme un plan à effet externe qui ne doit
pas être exécuté ici, D comme une boucle d'Agent sans limite, et E comme une
suite d'hypothèses non étayées. Expliquez vos raisons ; ne recopiez pas cette
phrase comme preuve.

## Partie 2 : réaliser une expérience de contexte contrôlée

Utilisez cette tâche uniquement textuelle :

> Examinez l'extrait de README fourni et proposez une amélioration. Ne modifiez
> aucun fichier. Indiquez ce qui vous a été donné, pourquoi l'amélioration est
> utile, comment elle pourrait être vérifiée et ce que vous ne pouvez pas savoir.

Faites une première passe avec l'extrait seul. Recommencez en ne changeant
qu'un seul élément :

1. ajouter le public visé ;
2. ajouter une courte règle du projet ; ou
3. ajouter un critère d'acceptation.

N'affirmez pas que l'élément modifié a causé la différence observée si vous
n'avez pas maintenu assez constants le modèle ou la surface, la révision de
l'entrée, la configuration de génération et l'état de l'outil. Sinon, écrivez
simplement : `résultat différent observé ; cause non isolée`.

Conservez ce tableau :

```text
run_id | révision de l'entrée | surface/modèle | variable modifiée | outil appelé ? | fichier modifié ? | preuve observée | inconnues
```

Vous pouvez terminer le Lab avec une simulation écrite à la main. Un véritable
appel de modèle est facultatif et doit être accompagné de sa preuve réelle.
Une sortie d'outil simulée n'est jamais le résultat d'un outil exécuté.

## Partie 3 : corriger une affirmation de fin dangereuse

Commencez par cette phrase :

> « La connexion dans le navigateur a réussi, l'outil a renvoyé `completed` et
> le modèle a dit que la modification était terminée. Le dépôt public a donc
> été mis à jour. »

Réécrivez-la sous forme de registre de claims :

| Claim | Preuve nécessaire | État actuel | Prochaine vérification sûre |
|---|---|---|---|
| L'authentification du navigateur est terminée | Preuve de l'étape d'authentification et de la session ou du token côté client |  |  |
| L'action est autorisée pour ce dépôt | Cible, portée du compte ou de l'organisation et preuve d'autorisation |  |  |
| L'outil a exécuté l'écriture | Appel/résultat de l'outil et identifiant de la cible |  |  |
| L'objet visé a changé | Nouvelle lecture de la cible ou enregistrement côté fournisseur |  |  |
| La modification est acceptable | Diff, revue, tests ou acceptation humaine |  |  |

Ne remplissez jamais un état vide par « probablement ». Utilisez
`not_observed`, `blocked`, `partial` ou `verified within scope` et précisez la
portée de l'état.

## Partie 3A : ajouter un échec au niveau du mécanisme

Choisissez un cas synthétique sans réseau et ajoutez-le au registre de claims :

- **Schéma valide, sémantique invalide :** la réponse est un JSON valide avec
  tous les champs requis, mais l'objet référencé n'existe pas. Ajoutez un
  contrôle de l'état métier.
- **Résultat de recherche, exception absente :** un fragment de politique
  générale a été sélectionné alors que l'exception liée à la version manque.
  Ajoutez la requête, le filtre, le fragment sélectionné et les champs de
  preuve manquants.
- **Données qui ressemblent à une instruction :** un README ou un résultat
  d'outil demande d'ignorer la règle de sécurité de la tâche. Conservez-le
  comme donnée, refusez l'effet externe et notez la source ainsi que la
  tentative d'influence.

L'objectif est de nommer la couche qui a réellement échoué. Un résultat de
schéma, une correspondance de recherche ou une chaîne visible ne prouve pas
automatiquement la justesse sémantique, l'exhaustivité du contexte ou
l'autorité. Consultez la [recherche sur les mécanismes des LLM](../evidence-library-FR.md#source-notes)
pour les frontières étayées par des sources ; ce Lab n'exécute pas de
fournisseur en direct.

## Partie 4 : exercer la règle d'arrêt

Choisissez un échec inoffensif injecté dans la fiche :

- indiquez que le modèle est à capacité ;
- indiquez qu'une commande est restée en état `Working` au-delà du délai fixé ;
- ou indiquez qu'une commande de vérification demande une réinstallation forcée.

Ne relancez pas automatiquement. Écrivez :

```text
état | symptôme visible | dernier checkpoint | preuves conservées | autorisation nécessaire | action minimale de récupération | éléments non vérifiés
```

La récupération correcte consiste généralement à inspecter l'état actuel,
préserver le registre, réduire la prochaine vérification ou demander une
autorisation. Elle ne consiste pas à effacer l'espace de travail, forcer une
installation ou envoyer l'instruction suivante en attente.

Ces formes d'échec proviennent de [l'étude des problèmes de terrain Codex](../evidence-library-FR.md#source-notes).
Ce sont des témoignages d'utilisateurs, pas une confirmation officielle de la
cause ; ce Lab ne prétend pas les avoir reproduits localement.

## Paquet de preuves

Remettez un répertoire ou une fiche Markdown comprenant :

1. la version des cartes fixes et les identifiants d'exécution ;
2. le registre de frontières A à E rempli ;
3. les deux lignes de l'expérience de contexte et les facteurs de confusion ;
4. le registre de claims corrigé ;
5. le compte rendu d'arrêt et de récupération ;
6. un résumé personnel de 150 mots maximum.

Le résumé doit répondre aux questions suivantes :

- Quelle différence y a-t-il entre une sortie de modèle et un résultat d'outil ?
- Quelle différence y a-t-il entre un résultat d'outil et un état vérifié ?
- Pourquoi une connexion, un nom de modèle, un nom de Skill ou un message de
  fin ne prouvent-ils ni l'autorité ni la correction ?
- Quel claim reste `not_observed` ?

## Critères d'acceptation

Le Lab est réussi uniquement si :

- chaque carte fixe possède une raison, une limite, une preuve et un point d'arrêt ;
- les cartes C et E ne provoquent ni écriture externe ni notification réelle ;
- au moins un claim reste volontairement non vérifié plutôt que deviné ;
- l'expérience de contexte indique la variable modifiée et les facteurs de confusion ;
- l'exercice d'échec s'arrête avant toute escalade destructive ou non autorisée ;
- le cas mécanistique précise si la lacune concerne le schéma, la sélection du
  contexte, l'autorité d'une instruction, l'exécution ou la vérification ;
- une seconde personne peut distinguer les événements simulés, observés et
  non exécutés.

Le Lab reste `draft` avec `run_status: not_run` jusqu'à ce qu'un vrai compte
rendu d'exécution et une revue indépendante existent. Une fiche complète est
une preuve de l'exercice de l'apprenant ; elle ne prouve pas que toutes les
surfaces Codex se comportent de la même façon.

## Tâche de transfert

Prenez un ensemble fixe de sources publiques et préparez une note de recherche
d'une page dans un fichier local jetable. Séparez le texte source, les
instructions de l'utilisateur, les suggestions du modèle, les modifications
locales et les contrôles de vérification. Ajoutez une source qui contient une
phrase ressemblant à une instruction mais sans rapport avec la note. Expliquez
pourquoi cette phrase est traitée comme une donnée et non comme une autorité.
Ne naviguez pas, ne publiez pas et n'appelez pas de connecteur externe pour ce
transfert, sauf si vous créez un nouveau protocole avec portée et confirmation
explicites.

## Sources et maintenance

- [Terminologie du projet](../evidence-library-FR.md#core-terms) — frontières stables utilisées par le Lab.
- [Baseline officielle des faits Codex](../evidence-library-FR.md#source-notes) — faits produits datés et limites d'autorisation ; vérifiée le 2026-08-09.
- [Recherche sur les problèmes réels des utilisateurs Codex](../evidence-library-FR.md#source-notes) — rapports publics, liens sources et niveaux de preuve ; vérifiée le 2026-08-09.
- [Recherche sur les mécanismes des LLM](../evidence-library-FR.md#source-notes) — cartes mécanistiques et expériences d'échec appuyées par des sources officielles ; vérifiée le 2026-08-10.
- [Chapitre 1 — Comprendre GPT avant de faire confiance à Codex](../chapters/01-gpt-and-codex-FR.md) — contexte conceptuel et cas de terrain pour ce Lab.

Cet exercice est original. Il ne copie ni prompts externes, ni journaux, ni
identifiants, ni instructions de Skill. Revérifiez les faits produits volatils
avant d'utiliser une surface en direct ; le statut reste `draft` tant que les
preuves déclarées ne sont pas réunies.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navigation des Labs">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-010-product-context-FR.md" aria-label="Lab précédent : Lab 010 · Construire un contexte produit partagé">← Précédent<br><strong>Lab 010 · Construire un contexte produit partagé</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-012-team-capability-migration-FR.md" aria-label="Lab suivant : Lab 012 · Transformer une méthode personnelle en capacité d'équipe">Suivant →<br><strong>Lab 012 · Transformer une méthode personnelle en capacité d'équipe</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
