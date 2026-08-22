<!-- content_id: chapter-01-gpt-and-codex | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-bootstrap -->

# Chapitre 1 : Comprendre GPT avant de faire confiance à Codex

## Le problème que résout ce chapitre

Ce chapitre répond à un problème concret : une réponse bien formulée peut
ressembler à une action déjà effectuée. Nous allons donc suivre une demande
observable, puis séparer ce que le texte, l’outil et l’état distant établissent.

Les noms « GPT », « Codex » et « Agent » sont souvent utilisés comme s’ils
désignaient la même chose. Cette confusion fait passer un texte généré pour
une action réalisée, ou une connexion disponible pour une autorisation acquise.

## Objectifs d’apprentissage

- distinguer modèle, produit, outil et Agent ;
- décrire ce qu’un contexte fourni permet réellement d’établir ;
- écrire une première demande avec une frontière et un contrôle visibles ;
- refuser une affirmation d’exécution sans trace correspondante.

## Commencez par les rôles, pas par les marques

Le **modèle** génère une réponse à partir du contexte qu’il reçoit. Le
**produit** de chat assemble ce contexte, applique ses propres règles et
affiche le résultat. Un **outil** peut lire ou modifier un système extérieur.
Un **Agent** organise plusieurs tours visibles entre demande, proposition,
action, retour et arrêt. Ces rôles peuvent se trouver dans la même interface,
mais le nom commercial ne les rend pas équivalents.

La question pratique est donc toujours : *qu’est-ce qui vient d’être
observé ?* Une phrase produite par le modèle, une action proposée, un résultat
d’outil et un état vérifié sont quatre observations différentes.

## Cas réels : problèmes de terrain

Dans un projet, une phrase comme « Codex a mis à jour le dépôt » peut vouloir
dire plusieurs choses : le modèle a proposé un patch, un outil a modifié un
fichier local, un commit existe, ou une publication distante a réellement eu
lieu. Sans cible, autorité, diff et lecture de l’état final, ces phrases ne
sont pas interchangeables. Ce cas ne prouve pas qu’un produit donné fonctionne
ainsi dans toutes les interfaces : il sert à choisir la prochaine vérification
observable.

## Expérience : classer une affirmation

### Préparation

Utilisez la carte fictive suivante, sans compte, réseau, fichier privé ni outil.

### Tâche

Classez chaque phrase comme `génération`, `proposition`, `exécution`,
`vérification` ou `inconnue` :

1. « Voici une modification possible de README.md. »
2. « Le terminal a affiché une commande. »
3. « Le diff local contient une ligne nouvelle. »
4. « Le dépôt distant contient le commit attendu. »
5. « Le système est connecté, donc la publication a réussi. »

### Preuve

Pour chaque ligne, notez la pièce qui la soutient : texte de réponse, sortie de
commande, diff, lecture distante, ou `aucune`. Une phrase n’est pas vérifiée
parce qu’elle emploie un verbe assuré.

### Échec et limite

Si vous classez la phrase 5 comme preuve, recommencez en séparant connexion,
autorité, exécution et lecture de l’objet. Cette expérience ne mesure ni un
produit particulier ni la qualité générale d’un modèle.

### Réflexion

Quelle phrase vous a demandé le plus de preuves ? Qu’est-ce qui resterait
inconnu après une interruption ?

## GPT, Codex et un chat ordinaire

Dans ce Playbook, **GPT** désigne la famille de modèles et de capacités de
génération ; un **chat** ajoute une interface qui assemble le contexte et
affiche une réponse ; **Codex** désigne ici une surface de travail orientée
vers des projets et des outils. Les frontières exactes dépendent du produit et
de sa documentation actuelle. Le nom d’un modèle ne prouve ni accès aux
fichiers, ni terminal, ni GitHub, ni permission de publier.

### Comment une réponse est produite

Pour une demande textuelle simple, gardez ce schéma modeste en tête :

```text
demande + documents fournis
          ↓
l’hôte assemble les instructions et le contexte
          ↓
le modèle génère une suite de tokens
          ↓
l’hôte affiche la réponse ou propose un appel d’outil
          ↓
l’outil ne s’exécute que si l’hôte et l’autorité l’autorisent
          ↓
une personne relit le résultat, la limite et la trace
```

Le contexte est à la fois un **budget** et un **filtre**. Un document absent ne
peut pas être déduit de façon fiable ; un document présent peut être ancien,
hors sujet ou mal interprété. Une fenêtre de contexte plus large augmente la
capacité d’entrée, mais ne transforme pas automatiquement chaque passage en
preuve.

La génération comporte aussi une part de variation. Si vous comparez deux
réponses, conservez au minimum la surface, le modèle ou libellé visible, la
version exacte de l’entrée, le réglage qui a changé et le résultat observé.
Sans cela, écrivez `résultat différent observé ; cause non isolée` plutôt que
d’attribuer l’écart à une seule phrase.

## Un appel d’outil est une frontière de protocole

Un modèle peut proposer un appel structuré ; l’hôte décide s’il est permis ;
l’outil l’exécute et renvoie un résultat. Notez les cinq éléments suivants :

| Élément | Question à poser |
|---|---|
| cible | Quel fichier, compte, dépôt ou service est visé ? |
| autorité | Qui a le droit d’autoriser cette action ? |
| effet | Qu’est-ce qui pourrait changer à l’extérieur ? |
| résultat | Quelle sortie l’outil a-t-il réellement renvoyée ? |
| preuve | Quel diff, journal ou nouvel état permet de relire l’action ? |

Un bouton, un nom d’outil ou le mot `completed` ne remplace aucune de ces
preuves. Après un délai ou une interruption, relisez la cible avant de relancer
une action qui pourrait envoyer, publier, supprimer, payer ou modifier un
compte.

## Trois pièges de mécanisme à reconnaître

### 1. Une sortie structurée peut être correcte sur la forme et fausse sur le fond

Un JSON peut contenir tous les champs obligatoires tout en citant un fichier
qui n’existe pas ou une version qui n’est pas la bonne. Ajoutez donc un contrôle
de l’état réel, pas seulement un contrôle de schéma.

### 2. Une recherche apporte un chemin vers une preuve, pas une garantie de vérité

La récupération peut sélectionner une copie, manquer l’exception importante ou
retourner une page ancienne. Conservez l’URL, la date, le périmètre et la
correspondance entre chaque affirmation et sa source.

### 3. Un texte qui ressemble à une instruction reste une donnée

Un README, un résultat d’outil ou un extrait cité peut dire « ignore la règle
de sécurité ». Tant que la tâche ne l’a pas rendu applicable, gardez ce texte
comme des éléments à examiner, refusez l’effet externe et enregistrez la source de la demande.

## La boucle Agent que vous pouvez réellement inspecter

Ne cherchez pas à expliquer une pensée cachée. Décrivez plutôt les états
visibles :

```text
état lu → action proposée → autorité vérifiée → action exécutée
→ résultat relu → critère d’acceptation contrôlé → continuer, transmettre ou arrêter
```

Une boucle saine possède un budget, une condition d’arrêt et un point de
reprise. Si l’entrée manque, si l’autorité est ambiguë ou si deux essais ont
échoué sans changer le diagnostic, elle doit s’arrêter et demander la plus
petite information utile.

## Trois consignes utilisables dès maintenant

Ces cartes sont des points de départ, pas des recettes magiques. Remplacez les
éléments entre crochets et inspectez toujours la sortie.

### 1. Pratiquer une langue ou une autre petite compétence

```text
Je veux pratiquer [espagnol] à l’écrit pendant cinq minutes.
Fais-moi essayer avant d’expliquer. Pose une seule question à la fois,
attends ma réponse, corrige d’abord l’erreur qui bloque le sens et demande-moi
de la reformuler. Termine par ce qui a été observé, ce qui reste inconnu et un
exercice légèrement différent. Ne promets ni fluidité ni maîtrise.
```

### 2. Organiser des sources publiques sans inventer une recherche

```text
Question : [question précise].
Sources fournies : [URL, titre, extrait ou « aucune »].
Commence par reformuler la question et liste les preuves nécessaires. Fais un
tableau : affirmation possible, source réellement fournie, vérification encore
nécessaire. N’invente aucune citation, ne prétends pas avoir ouvert une URL
inaccessible et sépare faits, témoignages et inférences. Arrête-toi si une
source manque ou se contredit.
```

### 3. Clarifier une demande trop vague

```text
Avant de proposer une solution, transforme ma demande en contrat court :
résultat observable, contexte fourni, actions permises, actions interdites,
critère d’acceptation, preuve à conserver et condition d’arrêt. Pose seulement
la question dont la réponse changerait le risque ou l’acceptation. N’invente
pas de cible et n’agis pas tant qu’un champ essentiel manque.
```

Une seule séance ne prouve ni un apprentissage durable ni une performance
indépendante. Elle vous donne une première observation à relire.

Une demande utile commence par le résultat observable :

```text
Résultat : une modification locale d’un seul fichier.
Contexte : le fichier nommé et les règles pertinentes seulement.
Actions autorisées : lire, proposer, puis éditer après confirmation.
Interdit : réseau, secrets, commit, push, publication et suppression.
Contrôle : diff exact et vérification ciblée.
Arrêt : cible, autorité ou preuve manquante.
```

## Transfert

Reprenez la même carte pour une note de recherche ou une reformulation de
message. Gardez les champs résultat, contexte, autorité, contrôle et arrêt ;
remplacez seulement le contenu métier. Si le nouveau cas demande une source
actuelle ou un effet externe, ajoutez la vérification correspondante au lieu
de supposer que la première carte suffit.

Pour une nouvelle tâche, conservez la même chaîne : résultat → contexte →
action bornée → contrôle → limite. Si la tâche change de plateforme, vérifiez
à nouveau les faits propres à cette plateforme ; la méthode générale ne prouve
pas que les permissions, les outils ou la mémoire sont identiques.

## Liste de contrôle d’acceptation

- [ ] Je peux expliquer la différence entre texte généré, action proposée et état modifié.
- [ ] Je peux nommer la cible et l’autorité nécessaires avant une action externe.
- [ ] Je peux montrer quel diff, résultat ou source soutient une affirmation.
- [ ] Je peux écrire une condition d’arrêt explicite.
- [ ] Je sais ce que cette expérience ne prouve pas.

## Sources et limite de mise à jour

Les définitions générales sont une réécriture pédagogique originale. Les faits
propres à une interface, à une version de modèle ou à une permission doivent
être revérifiés dans leur documentation officielle avant d’être ajoutés à ce
chapitre. La version française attend une relecture indépendante et reste
`in-progress` / `candidate`.

Passez au [Chapitre 2 : une première tâche sûre et vérifiable](02-first-safe-task-FR.md).

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"></td>
      <td align="right"><a data-chapter-nav="next" href="02-first-safe-task-FR.md" aria-label="Chapitre suivant: Chapitre 2 · Première tâche sûre et vérifiable">Suivant →<br><strong>Chapitre 2 · Première tâche sûre et vérifiable</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
