<!-- content_id: lab-002-task-protocol | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

---
id: lab-002-task-protocol
title: "Transformer un souhait vague en protocole borné"
level: L2
domain: general
goal: "Pratiquer la transformation d’un souhait incomplet en objectif, contexte, entrées, limites, actions autorisées, acceptation, arrêt, récupération et transmission"
setup: "Une copie temporaire ou un projet sans risque et une demande locale ; aucun secret, état de production, appel réseau ou effet externe"
task: "Rédiger trois versions d’un protocole sans autoriser Codex à modifier un fichier ni à exécuter une action qui change un état"
evidence:
  - "Le souhait inchangé et trois identifiants de séance"
  - "Les questions de clarification et les protocoles v1, v2 et v3"
  - "Un tableau comparatif des hypothèses, actions autorisées, arrêts et preuves gagnées"
failure_variant: "Omettre une entrée qui change le périmètre, laisser « rends-le professionnel » ou autoriser « fais tout ce qui est nécessaire » sans fichier cible"
reflection: "Quelle question a réduit le plus de risque ? Quelle précision n'a fait qu'allonger le prompt ? Quelle affirmation reste sans preuve ?"
status: draft
last_verified: "not run"
transfer_task: "Réutiliser le protocole pour une recherche, une régression, une mise à jour localisée et un plan de publication"
transfer_domain: "recherche, ingénierie, contenu, documentation ou publication"
transfer_evidence: "Conserver les protocoles transférés, les champs modifiés, un échec et la revue indépendante de la frontière"
transfer_limitations: "Un protocole clair ne prouve ni la vérité des entrées, ni l'efficacité des permissions, ni la correction du résultat final"
---

# Lab 002 : Transformer un souhait en protocole

## Objectif d'apprentissage

Ce Lab rend le chapitre 3 observable. Il teste si des informations plus précises
changent les questions, les hypothèses, la frontière d'action et le plan de
preuve — pas si un prompt plus long donne une réponse plus jolie.

## Sécurité et frontière

Travaillez dans un projet temporaire ou une copie non productive. Ne collez ni
token, cookie, clé privée, fichier `.env`, donnée client ni donnée privée. N'installez
rien, n'appelez aucun service, ne modifiez aucun fichier, ne lancez aucune
commande qui change un état, ne commitez pas, ne poussez pas, ne publiez pas et
ne prévenez personne. Si la cible, l'autorité ou la preuve sont floues, écrivez
`blocked` et restez au stade du protocole.

## Entrée fixe et identifiants

Gardez la phrase suivante inchangée dans les trois tours :

```text
Aide-moi à améliorer la page d’accueil de ce projet.
```

Créez un identifiant distinct par tour, par exemple :

```text
lab002-fr-2026-08-22-v1
lab002-fr-2026-08-22-v2
lab002-fr-2026-08-22-v3
```

Un identifiant est un repère de registre ; il ne prouve pas qu'une exécution a
eu lieu.

## Trois tours

### v1 — souhait seul

Donnez uniquement la phrase et demandez les questions de clarification ainsi
qu'une ébauche de protocole. Le modèle ne doit ni choisir une cible ni agir.

Conservez la sortie et notez : la cible qu'il a refusé ou deviné, les questions,
les hypothèses, les actions proposées et les preuves nécessaires pour déclarer
la tâche terminée.

### v2 — objectif et limites

Gardez le souhait inchangé et ajoutez seulement le public, le résultat
observable, les fichiers ou sources lisibles, les fichiers éditables, les
actions interdites et le fait que cette passe reste une planification.
Comparez les questions supprimées et celles qui restent.

Ne supprimez pas une question seulement parce qu'elle ralentit la réponse ;
supprimez-la lorsque le nouveau contexte la rend réellement inutile. Le contexte
supplémentaire n'autorise toujours aucune modification.

### v3 — acceptation et récupération

Gardez v1 et v2 fixes, puis ajoutez les affirmations d'acceptation et leur
preuve, les conditions d'arrêt en cas d'entrée, d'autorité, de silence, d'échec
répété ou d'élargissement de périmètre, la récupération après un contrôle en
échec et le format de transmission. Une modification ou une commande est un
échec de périmètre.

Demandez le protocole et les questions non résolues uniquement. Ajoutez ce qui
doit être transmis à la personne suivante, les actions non faites et ce qui
reste `unverified`. Un protocole complet décrit la sortie attendue, mais ne rend
pas les entrées vraies.

## Preuve à conserver

```text
run_id | champs ajoutés | ambiguïté retirée | hypothèses exposées |
actions autorisées | point d'arrêt | preuve attendue | effet réel
```

Utilisez `observed`, `verified`, `unverified`, `blocked` et `not_run` avec leur
portée exacte.

## Échecs intentionnels

Réalisez au moins une variante sans franchir la frontière :

1. omettre le fichier exact et demander de « trouver ce qu'il faut changer » ;
2. laisser « rends-le professionnel » ou « utilise la meilleure approche »
   comme critère ;
3. écrire « corrige tout ce qui est nécessaire » sans ensemble de fichiers ni
   politique de dépendances ; ou
4. demander de « continuer si le contrôle échoue » sans budget, nouvelle
   hypothèse ni retour arrière.

Le résultat attendu est une question, une proposition plus étroite ou `blocked`;
jamais une cible inventée, une installation, un retry illimité ou une affirmation
de fin.

## Revue indépendante

Donnez le protocole v3 à une personne qui ne l'a pas écrit. Sans ouvrir la
conversation d'origine, demandez-lui :

1. que peut-on exactement lire, modifier ou appeler ?
2. quelle preuve est requise pour la fin ?
3. qu'est-ce qui impose l'arrêt avant l'action ?
4. que faut-il conserver après un échec ?

Notez les divergences. Si la personne doit vous poser une question pour
reconstruire la frontière, le protocole n'est pas prêt.

## Réflexion

Répondez dans le compte rendu : quelle question a le plus changé la décision ?
quel champ a rendu une action dangereuse visible ? quelle phrase a ajouté du
volume sans augmenter le contrôle ? quelle affirmation reste `unverified` et
quel est le plus petit contrôle sûr suivant ?

## Transfert

Réécrivez le protocole pour : une régression reproductible, une note de recherche
à sources de première partie, une mise à jour de README dans la même locale et
un plan de publication avec sauvegarde, restauration et contrôle après action.
Gardez la dépendance entre les champs, mais remplacez les preuves : tests et
diffs, fiches de sources, contrôles de liens/locale, puis preuves de déploiement
et de restauration.

## Liste de contrôle d’acceptation

- [ ] Le souhait est identique dans les trois tours.
- [ ] Chaque tour possède un identifiant et une sortie conservée.
- [ ] Aucune action non autorisée n’a été exécutée.
- [ ] v3 nomme entrées, contraintes, actions autorisées, acceptation, arrêt, récupération et transmission.
- [ ] Chaque affirmation de fin a une preuve proposée.
- [ ] Une variante d'échec produit une réponse étroite ou `blocked`.
- [ ] Une revue indépendante peut relire la frontière sans deviner.

## Sources et limite de mise à jour

**Statut :** `draft` · **Exécution :** `not_run`. Le Lab ne prouve ni la qualité
d'un prompt ni une capacité produit. Une revue de protocole n'est pas une
exécution Codex et ne prouve pas la réussite d'un produit. La version française
reste `candidate / in-progress` jusqu'à une relecture indépendante.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navigation entre les Labs">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-001-first-safe-task-FR.md" aria-label="Lab précédent : Lab 001 · Rendre la première demande exploitable">← Précédent<br><strong>Lab 001 · Rendre la première demande exploitable</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-003-evidence-review-FR.md" aria-label="Lab suivant : Lab 003 · Auditer une affirmation de fin">Suivant →<br><strong>Lab 003 · Auditer une affirmation de fin</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
