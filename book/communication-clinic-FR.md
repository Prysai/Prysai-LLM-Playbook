<!-- content_id: communication-clinic | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-23-application-routes -->

# Pratique d’application facultative : langue, travail et recherche

Pour une pratique courte et guidée, ouvrez la [boucle du point d’avancement](work-update-practice-loop-FR.md) ou la [boucle de vérification de recherche](research-check-practice-loop-FR.md). Ces cartes s’utilisent après le [Chapitre 0](guides/llm-fundamentals-FR.md) ; ce n’est pas une introduction à ce qu’est un LLM.

**Statut :** `candidate` · **Exécution :** `not_run` · **Données :** textes fictifs ou autorisés uniquement.
**État :** template_selected | practised | not_run | blocked
<!-- état : template_selected | practised | not_run | blocked -->

Vous êtes sur le parcours expliqué en français. Cette version est encore en
cours de relecture ; les exemples dans la langue cible sont facultatifs et ne
promettent ni maîtrise ni aisance.

Si vous découvrez le projet et ne souhaitez pas pratiquer l’espagnol, commencez par la carte 3 de B. Les exemples en espagnol restent facultatifs.

<span id="language-practice-route"></span>

## A. Pratique facultative d’une langue

### 1. Essayer avant de demander une correction

```text
Je veux m’entraîner à confirmer un horaire en espagnol avec des informations fictives.
J’écris d’abord une phrase de douze mots maximum. Vous jouez uniquement le rôle
d’un camarade et vous ne posez qu’une question courte à la fois.
Avant le premier tour, affichez les critères de contrôle : quatre tours de
l’apprenant, objectif et groupe indiqués, jour et heure clarifiés, lieu ou
option en ligne précisés, message suffisamment compréhensible pour poursuivre.
Ne traduisez pas et ne montrez pas de réponse modèle avant mon essai. Après ma
réponse, signalez uniquement la première erreur qui bloque le sens, donnez un
indice partiel et attendez ma correction. Conservez les deux versions. Ne
parlez ni de fluidité, ni de prononciation, ni de niveau après cet échange.
```

### 2. Changer le cas

Demandez ensuite une question différente, sans reprendre votre première phrase.
Le but est d’observer une correction et un nouveau cas, pas d’apprendre une
réponse par cœur.

## B. Commencez ici : expression et décisions au travail

### 3. Une mise à jour fidèle

```text
Transformez ces notes en une mise à jour destinée à [public].
Notes : [fait 1], [fait 2], [encore inconnu].
Listez d’abord les faits vérifiables. N’ajoutez ni date, ni promesse, ni statut
d’achèvement, ni justification. Donnez une version de 120 mots maximum et une
version plus
formelle. Terminez par deux points que je dois vérifier avant l’envoi.
```

### 4. Décider sans rien inventer

```text
Je dois choisir entre [A] et [B]. Objectif : [objectif]. Faits connus : [faits].
Inconnues : [inconnues]. Ne décidez pas à ma place. Posez d’abord au plus trois
questions susceptibles de changer la conclusion. Séparez ensuite ce que les
éléments soutiennent de ce qui reste indécidable. S’il manque un fait,
recommandez de vous arrêter plutôt que d’inventer.
```

## C. Recherche et vérification avant de partager

### 5. Réduire la question

```text
Je veux éclaircir : [question]. Décision à éclairer : [décision].
Sources acceptées : [documentation officielle, article, rapport].
Ne répondez pas et n’inventez aucune source. Écrivez une question plus ciblée,
la première affirmation à vérifier, la source qui pourrait en être responsable
et une condition d’arrêt si cette source reste introuvable.
```

### 6. Vérifier une affirmation

```text
Voici une affirmation : [phrase]. Voici les éléments autorisés : [extraits ou URL].
Indiquez quels mots sont directement étayés, lesquels sont absents ou
contradictoires, et quelle vérification minimale manque. Ne prétendez pas avoir
ouvert une source que je ne vous ai pas fournie et n’envoyez rien.
```

### 7. Trace avant partage

```text
Avant tout partage, résumez l’objet, le public, l’autorisation et le canal.
N’envoyez rien, ne téléversez rien et ne créez pas de lien. Si une information,
une autorisation ou une preuve manque, arrêtez-vous et marquez-la comme inconnue.
```

**Limite :** ces cartes ne prouvent pas la qualité d’un modèle, l’existence
d’une source, la maîtrise d’une langue, la rétention, le transfert ou un
résultat professionnel. Elles restent `not_run`.

<span id="practice-route-chooser"></span>

## Commencer par une seule route

Si votre objectif n’est pas encore clair, ne demandez pas tout de suite une longue
réponse. Choisissez une seule intention pour aujourd’hui : pratiquer une compétence,
mettre en forme un point d’avancement ou vérifier une affirmation. Faites un essai
bref et gardez une trace minimale. Cette carte d’entrée n’est ni un diagnostic ni
un programme d’apprentissage complet.

<span id="request-escalation"></span>

### Préciser le type d’aide attendu

```text
Le petit résultat que je veux obtenir aujourd’hui : [résultat observable]
Les informations que vous pouvez utiliser : [faits, texte ou liens que je fournis]
Ce que je vous demande d’abord : [réécrire / poser des questions / proposer un exercice / préparer une vérification]
N’inventez pas de faits, n’ouvrez pas de lien et n’effectuez aucune action externe.
S’il manque une entrée nécessaire, indiquez laquelle et arrêtez-vous.
```

Ne mélangez pas « vérifier les informations à jour » et « modifier une page publique »
dans la même demande. Vérifiez d’abord la source, puis rédigez un contrat d’action distinct
avec l’objectif, le public, l’autorisation et la manière de revenir en arrière. Une citation
ne vaut pas autorisation de publier.

<span id="first-practice-intake"></span>

### Réduire une intention large à un premier essai

```text
Mon intention : [par exemple : apprendre l’espagnol]
Posez-moi une seule question à la fois jusqu’à obtenir un exercice sûr d’environ dix minutes :
1. l’action observable que je dois réaliser ;
2. ce que je vais essayer seul d’abord ;
3. l’aide que j’accepte (question, indice, exemple ou relecture) ;
4. ce que je vérifierai moi-même ;
5. une version plus petite si je bloque.
Ne présentez pas un seul essai comme une maîtrise, une aisance ou un niveau acquis.
```

<span id="four-line-safety-card"></span>

## Avancé : poser la limite avant de partager, chercher ou agir

Dès qu’un fichier, une source externe, un outil ou un compte est concerné, remplissez
cette fiche. Elle n’accorde aucun droit. Si un champ est vide, arrêtez-vous.

```text
Objectif et ce que je ne ferai pas cette fois :
Entrées lisibles et origine de chacune :
Fichier ou objet précis qui pourrait être modifié :
Données qui ne seront ni lues, ni envoyées, ni conservées :
Résultat attendu et preuve d’acceptation vérifiable :
Arrêt : si le chemin, l’autorisation, la source ou la preuve est incertain, je m’arrête.
```

<span id="share-check"></span>

### Vérifier avant de partager : réduire le contenu et le public

```text
Ce que j’envisage de partager : [une phrase ; ne collez aucun secret]
Objectif : [qui doit vérifier quoi]
Public possible : [rôle ou groupe]
Indiquez l’extrait minimal nécessaire et séparez le contenu, le public, l’autorisation
et le canal que je dois vérifier moi-même. N’envoyez rien, ne téléversez rien et ne créez pas de lien.
Si une limite ou une autorisation manque, indiquez ce qui manque et arrêtez-vous.
```

<span id="public-interest-safety-route"></span>

## Avancé : examiner une idée d’IA qui peut affecter des personnes

Pour une idée qui touche l’emploi, l’éducation, la santé, le logement ou les prestations,
commencez par un cas fictif et n’utilisez aucune donnée personnelle réelle.

```text
Un système fictif aiderait [un rôle] à prendre [une décision].
Séparez : les personnes qui pourraient en bénéficier ou subir un préjudice ; les données
strictement nécessaires ; le point où une personne peut contrôler ou contester la décision ;
les éléments qui la justifieraient ; et le signal qui impose l’arrêt.
Ne proposez pas de déploiement, n’appelez aucun service et ne présentez pas la suggestion du modèle comme un fait.
```

<span id="general-skill-practice-route"></span>

## Route B : pratiquer une compétence observable

```text
Je veux pratiquer : [expliquer une idée / répondre à un entretien / faire une présentation].
Laissez-moi essayer pendant [minutes] sans me montrer de modèle à l’avance.
Ensuite, vérifiez seulement : l’objectif est-il clair, les éléments sont-ils suffisants,
et le public sait-il quelle est la prochaine étape ?
Signalez le problème qui a le plus d’effet et donnez-moi une situation différente à refaire.
N’inventez pas mon expérience et ne qualifiez pas un essai de maîtrise.
```

<span id="bounded-research-route"></span>

## Route C : faire une recherche bornée pour une décision

```text
La décision à prendre : [décision]. Date, lieu et version concernés : [périmètre]
Commencez par une question vérifiable, trois types de sources prioritaires et une condition d’arrêt.
Pour chaque affirmation, notez le responsable de la source, l’URL d’origine et l’URL actuelle,
la localisation du passage, la date, le périmètre et ce qui reste inconnu.
Ne traitez pas un extrait de moteur de recherche, un témoignage de forum ou un lien non ouvert comme une preuve vérifiée.
```

<span id="source-check-route"></span>

### Comparer une phrase avec son passage source

```text
Affirmation : [une phrase précise]
Source originale ou extrait dont le partage est autorisé : [contenu]
Séparez ce que le passage étaye directement, ce qu’il ne dit pas ou contredit,
et ce que je dois ouvrir et localiser moi-même. Si le passage est introuvable,
marquez citation_unverified et réduisez la portée de la conclusion.
```

<span id="recovery-route"></span>

## Avancé : corriger une réponse qui a dévié, une condition à la fois

Conservez la demande initiale, le contexte visible, la réponse reçue et le résultat attendu.
Ne changez qu’une condition de communication — par exemple lister d’abord les entrées ou
imposer un format — puis faites une seule comparaison à faible risque. Si des fichiers, des
droits, un réseau ou une action externe deviennent nécessaires, redéfinissez la limite et arrêtez-vous.

<span id="card-e1-user-declared-continuity-receipt"></span>

### Fiche de continuité avant la prochaine tentative

```text
Tâche initiale et limites qui restent valables :
Entrées réellement lues ou terminées lors de la tentative précédente :
Résultat vérifiable de la tentative précédente :
Ce qui reste inconnu, a échoué ou n’a pas été exécuté :
La seule condition que je vais changer maintenant :
Condition d’arrêt et personne chargée de relire le résultat :
```

Cette fiche est un contexte déclaré par la personne, pas la mémoire du modèle ni une preuve
d’autorisation. Elle n’ajoute pas automatiquement un nouveau compte, une branche, un dépôt ou un public.
