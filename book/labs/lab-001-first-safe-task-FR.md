<!-- content_id: lab-001-first-safe-task | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-bootstrap -->

---
id: lab-001-first-safe-task
title: "Effectuer une petite modification de README et montrer ce qui a changé"
level: L1
domain: general
goal: "Inspecter avant d’éditer, limiter l’autorité, relire le diff et vérifier une seule chose"
setup: "Partie A : un chat textuel et une note fictive. Partie B : un projet Git jetable avec README et commande locale documentée. Aucun secret, fichier de production ou écriture externe."
task: "Comparer une demande vague et une demande structurée ; puis, si une sandbox sûre est disponible, modifier uniquement README.md après inspection et conserver le diff réel."
evidence:
  - "Deux réponses conservées à partir de la même note et comparaison des faits, du format et des inconnues"
  - "Carte de tâche avec résultat, entrées, actions autorisées, acceptation et arrêt"
  - "État initial, diff réel et sortie de la vérification ciblée"
failure_variant: "Faire varier le nom du script, interrompre une lecture incomplète ou demander un second fichier"
reflection: "Quelle confirmation a réduit le risque ? Que prouve le diff et que laisse-t-il ouvert ?"
status: draft
last_verified: "not run"
transfer_task: "Réutiliser le protocole pour une recherche à sources fixes ou une révision de texte sans écriture externe"
transfer_domain: "recherche, ingénierie, contenu, design ou marketing"
transfer_evidence: "Deux protocoles, le diff, le contrôle et la liste explicite des points non vérifiés"
transfer_limitations: "Ce Lab montre une frontière locale ; il ne prouve ni les permissions d’un compte, ni la sécurité d’une production, ni le comportement d’un outil en ligne."
---

# Lab 001 : Rendre la première demande exploitable

## Commencer par le résultat attendu

Commencez par comparer deux demandes dans un espace de travail LLM. Ensuite,
si vous disposez d’un projet sûr, reprenez la même discipline pour une seule
modification de README avec Codex. Ce n’est pas un test de vitesse ni un
classement de modèles : vous vérifiez si la seconde demande produit un résultat
plus facile à contrôler et à corriger.

## Partie A — comparaison de demandes en dix minutes

### Pourquoi commencer ici ?

Une demande utile ne se reconnaît pas au nombre de mots. Elle précise la
matière autorisée, la forme attendue, ce qu’il ne faut pas inventer et la façon
de vérifier la réponse. Vous pouvez observer ces éléments dans un simple chat,
avant d’accorder un accès à des fichiers, au terminal, au navigateur ou au
réseau.

### Utiliser une entrée fixe et sans risque

Copiez la même note fictive dans deux conversations séparées :

```text
Lundi : une faute corrigée dans le guide débutant.
Mardi : une checklist de publication préparée, encore en attente de relecture.
Mercredi : aucun contrôle local exécuté, car la bonne commande reste inconnue.
Prochaine étape : demander à Maya quel contrôle effectuer avant publication.
```

**Tour A — demande vague**

```text
Fais-en une bonne mise à jour de projet.
```

**Tour B — demande contrôlable**

```text
Tâche : transforme uniquement les notes ci-dessous en mise à jour.
Public : une collègue qui doit décider de la prochaine action.
Inclure : fait terminé, élément en attente, un point explicitement inconnu,
et le responsable ou l’action suivante.
Ne pas inventer : test, approbation, date ou cause absente des notes.
Format : quatre puces intitulées Fait, En attente, Inconnu, Prochaine étape.
Avant de rédiger : indique les faits manquants qui changeraient la décision.
```

Conservez les deux réponses. Relevez les quatre faits source, les ajouts, la
forme, les inconnues et le nombre réel de tours de correction. Si le tour B ne
fait pas mieux, gardez ce résultat : vérifiez d’abord que l’entrée, le modèle,
la conversation et la règle d’acceptation étaient bien identiques.

| Contrôle | Tour A | Tour B |
|---|---:|---:|
| Les quatre faits sont conservés (0–4) |  |  |
| La forme demandée est présente (oui/non) |  |  |
| Une inconnue est nommée plutôt qu’inventée (oui/non) |  |  |
| Tours de révision nécessaires avant usage |  |  |
| Temps effectivement mesuré (facultatif) |  |  |

## Partie B — appliquer la même discipline à un fichier

Cette partie est le pont L1 vers la pratique Codex. Elle ajoute une cible
unique, une inspection préalable, un diff et un contrôle ciblé. Elle ne prouve
ni une permission de compte, ni la sécurité d’une production, ni le comportement
de toutes les surfaces Codex.

### Préparation

Utilisez le [projet de première modification sûre](../routes/first-safe-change-FR.md)
ou une copie jetable d’un dépôt non productif. N’utilisez ni secret, ni compte,
ni donnée client, ni fichier de production, ni publication, ni réseau. Notez le
chemin absolu, le `git status` initial si Git est présent, et le point de
restauration. Identifiez dans la configuration réelle la commande locale de
contrôle ; ne la devinez pas.

Écrivez explicitement les exclusions : pas d’installation, pas d’accès réseau,
pas de commit, pas de push, pas de publication, pas de message externe et pas
de lecture de secrets. Si une condition est floue, arrêtez-vous avec le statut
`blocked`.

### Les quatre réponses avant toute action

| Question | À consigner | Continuer seulement si… | Arrêter si… |
|---|---|---|---|
| Où le travail se déroule-t-il ? | sandbox déclarée, répertoire observé, racine Git et branche/`HEAD` (ou « pas une sandbox Git » pour la fixture) | le répertoire observé est dedans et les identifiants désignent la même copie | un chemin ou une identité est absent, ambigu ou contradictoire |
| Qu’est-ce qui peut changer ? | `README.md` uniquement | le fichier est identifiable dans la sandbox | un second chemin devient nécessaire |
| Quelles actions sont permises ? | lire, proposer un plan, puis éditer après confirmation | l’action reste locale et réversible | elle demande des identifiants, une installation, un accès réseau ou une écriture externe |
| Quel est le reçu ? | état initial, plan, diff, source de la commande, sortie et inconnues | chaque élément peut être conservé et relu | il ne resterait qu’un message « terminé » |

Ces réponses ne sont pas une formalité : une réponse vide ou `unknown` est un
signal d’arrêt, pas une invitation à deviner.

## Carte de tâche

```text
Run ID : lab001-fr-<date>-<suffixe>
But : ajouter une courte section de démarrage local exacte à <chemin>/README.md.
Sandbox : <chemin absolu> ; seul fichier éditable : README.md.
Lire avant : README.md, manifeste de construction et fichier de script existant.
Autorisé : inspecter, proposer le plan, puis modifier README.md après confirmation.
Interdit : installer, réseau, code, commit, push, publication, message, secret,
ou donnée de production.
Reçu : état initial, plan, diff exact, source de commande, contrôle ciblé,
et liste explicite des éléments non vérifiés.
Avant l’édition : montrer la cible, l’état observé et le plan.
Après l’édition : afficher le diff et exécuter uniquement le contrôle approuvé.
En cas de doute sur le chemin, la commande ou la permission, arrêtez-vous et demandez.
```

La carte est un contrat de travail, pas une preuve que l’action a eu lieu.

## Preuves à conserver

```text
run_id:
checkpoint_before:
répertoire_observé:
racine_git_et_branche:
cible_autorisée:
actions_faites:
actions_non_faites:
diff_scope:
commande_de_vérification:
résultat_et_code:
inconnues:
raison_de_blocage:
prochaine_vérification:
statut : passed | failed | stopped
```

Séparez toujours un plan d’une action, une commande proposée d’une commande
exécutée, un diff d’un contrôle réussi et un contrôle interrompu d’un succès.

## Sonde de capacité sans effet externe

Si vous devez vérifier une affirmation de chemin, faites une seule sonde dans
la sandbox approuvée : confirmez le chemin absolu, créez un petit fichier
sentinelle sans secret au chemin exact, relisez-le, puis supprimez-le seulement
si le nettoyage reste dans la même autorité. Cette sonde prouve une écriture
locale dans ce run ; elle ne prouve ni un accès de production ni une permission
distante. Si le chemin de nettoyage n’est pas clair, notez `blocked`.

## Variantes d’échec et limites

Utilisez une copie jetable uniquement :

- **Source contradictoire :** faites diverger le nom du script dans le manifeste
  et celui du README. La réponse correcte constate le conflit et s’arrête ;
  elle ne choisit pas le nom « le plus probable ».
- **Contrôle incomplet :** interrompez un contrôle local sans sortie complète.
  Le statut est `stopped` ou `unverified`, jamais `passed`.
- **Autorité élargie :** ajoutez une demande d’installation, de lecture de
  secret, de réseau ou de push. Demandez une nouvelle décision étroite ;
  n’élargissez pas l’accès pour rendre le résultat plus joli.
- **Capacité incohérente :** déclarez une sandbox mais rendez la sentinelle
  absente ou extérieure. Signalez le mismatch et arrêtez avant l’édition.

Un état initial `FIRST_SAFE_CHANGE_FAILED` peut être le défaut prévu de la
fixture. Ne modifiez jamais le vérificateur pour obtenir `passed`. Une réponse
simulée n’est pas une exécution d’outil.

## Liste de contrôle d’acceptation

- [ ] La carte nomme un seul fichier et un seul chemin éditable.
- [ ] La sandbox, le répertoire observé, l’identité Git applicable, la cible,
      les actions permises et le reçu sont écrits avant l’action.
- [ ] L’état initial et les changements préexistants sont conservés.
- [ ] Le système a inspecté avant d’éditer et a proposé un plan borné.
- [ ] Le diff réel ne contient que la modification autorisée.
- [ ] La commande de contrôle vient de la configuration réelle du projet.
- [ ] La sortie réelle ou `not_run`/`stopped` est conservée.
- [ ] Une variante d’échec conserve l’état et n’élargit pas les permissions.
- [ ] La transmission sépare ce qui a changé, ce qui n’a pas changé et ce qui
      reste non vérifié.

## Réflexion

1. Quelle confirmation a évité l’erreur la plus coûteuse ?
2. Que prouve réellement le diff, et que laisse-t-il ouvert ?
3. Qu’est-ce qui restait inconnu après un contrôle interrompu ?
4. Quel champ ajouteriez-vous à la carte avant de recommencer ?
5. Quelle des quatre réponses préalables était la plus difficile à rendre
   concrète, et a-t-elle changé le périmètre ?

## Transfert

Réécrivez la carte pour une note de recherche à sources fixes, une correction
de texte, un inventaire de contenu ou une revue de design avec capture/trace
d’inspection. Gardez but, entrées, contraintes, actions permises, acceptation,
échec et livraison ; ajoutez la confidentialité, l’échantillonnage, la revue
humaine ou la preuve visuelle propre au domaine.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navigation des Labs"><table role="presentation" width="100%"><tr>
<td align="left"></td>
<td align="right"><a data-lab-nav="next" href="lab-002-task-protocol-FR.md" aria-label="Lab suivant : Lab 002 · Transformer un souhait en protocole de tâche">Suivant →<br><strong>Lab 002 · Transformer un souhait en protocole de tâche</strong></a></td>
</tr></table></nav>
<!-- lab-navigation:end -->
