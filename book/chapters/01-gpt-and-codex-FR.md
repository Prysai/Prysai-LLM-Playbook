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
- refuser une affirmation d’exécution sans reçu correspondant.

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
