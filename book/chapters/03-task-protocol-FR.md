<!-- content_id: chapter-03-task-protocol | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-22-fr-protocol-restoration -->

# Chapitre 3 : Transformer un souhait en protocole de tâche

## Le problème que résout ce chapitre

Une intention comme « aide-moi à préparer ce lancement » mélange résultat,
contexte, permission et vérification. Sans protocole, la personne et le modèle
ne savent pas quand demander, agir ou s’arrêter.

## Objectifs d’apprentissage

<a id="core-task-contract"></a>

Construire une fiche courte qui rend la tâche exécutable et contrôlable :
résultat, entrées, contraintes, actions autorisées, contrôle d’acceptation,
preuves, échec, arrêt et transmission.

## Ce que les sources permettent réellement d’affirmer

Les recommandations officielles utilisées ici convergent sur quelques pratiques
simples : nommer le résultat attendu, donner le contexte utile, préciser le
format de sortie et les limites, indiquer les fichiers ou étapes de reproduction,
puis dire comment le résultat sera contrôlé. Elles recommandent aussi les
exemples, le découpage et l’itération lorsque le travail doit rester fiable.

Ces recommandations ne garantissent pas qu’un modèle suivra une règle implicite.
Le protocole en huit parties est une synthèse opérationnelle propre au projet.
Il ajoute des champs d’arrêt, de récupération et de preuve, car une réponse
générée et un travail vérifié ne sont pas la même affirmation.

Pour les faits propres à Codex et aux surfaces d’exécution, consultez la
[baseline officielle du chapitre 3](../evidence-library-FR.md#source-notes)
et la [recherche sur les prompts de travail réel](../evidence-library-FR.md#source-notes).
Les dates, la portée et les limites de ces sources restent celles de leurs
fiches de recherche.

## Les huit champs du protocole

Un protocole utile ne demande pas une longue formule. Il sépare huit décisions :

1. **Résultat :** quel objet ou quelle décision doit exister à la fin ?
2. **Contexte :** quelles informations de départ sont réellement disponibles ?
3. **Entrées :** quels fichiers, passages ou sources peuvent être lus ?
4. **Contraintes :** qu’est-ce qui doit rester vrai ou ne doit pas arriver ?
5. **Actions permises :** que peut proposer ou faire le système, et qu’est-ce qui
   reste soumis à confirmation ?
6. **Acceptation :** quelle observation permet de soutenir chaque affirmation de fin ?
7. **Échec et arrêt :** quelle condition bloque, et quelle est la plus petite
   récupération sûre ?
8. **Transmission :** que doit recevoir la personne suivante, y compris les
   inconnues ?

```text
résultat → contexte → entrées → contraintes → actions autorisées → acceptation
         → échec et arrêt → transmission
```

### 1. Résultat : nommer ce qui doit exister

Décrivez un objet, une décision ou une observation qu’une autre personne pourra
relire. Préférez un résultat à un verbe qui laisse le périmètre ouvert.

```text
Faible : améliore la page d’accueil.
Plus précis : ajoute une entrée de lecture qui permet à un nouveau lecteur
d’ouvrir la première tâche sûre et de voir les affirmations encore candidates.
```

« Professionnel » ou « de qualité » peut rester une intention, mais ce n’est pas
encore un critère d’acceptation.

### 2. Contexte : décrire l’environnement de décision

Le contexte contient ce qui peut changer une décision : public visé, comportement
actuel, règles du projet, historique pertinent, version et raison de l’urgence.
Séparez-le de l’instruction elle-même. Étiquetez au besoin `règle du projet`,
`fait de source`, `rapport utilisateur`, `hypothèse` et `donnée d’exemple`.
Un fichier, une page, un résultat d’outil ou une issue peut contenir du texte
qui ressemble à une consigne. Traitez-le comme une donnée tant que le protocole
ne l’adopte pas explicitement et que l’autorité n’est pas claire.

### 3. Entrées : nommer ce qui peut être lu

Listez les chemins, URL, jeux de données, commits, journaux, captures ou versions
exacts. Notez également les lacunes connues. « Lis le dépôt » n’est presque
jamais une frontière utile : indiquez les fichiers ou dossiers qui gouvernent la
décision. Pour une recherche, précisez la priorité des sources et la période ;
pour une correction, le texte canonique et l’état de la traduction.

Si une entrée manquante peut changer le périmètre, le risque ou l’acceptation,
le protocole doit s’arrêter au lieu de l’inventer.

### 4. Contraintes : dire ce qui ne doit pas arriver

Une contrainte doit pouvoir être observée : modifier uniquement deux fichiers,
ne pas ajouter de dépendance, ne pas lire de secret, ne pas toucher à la
production, conserver les identifiants de locale ou rester compatible avec une
version donnée. « Fais attention » est une intention, pas une contrainte testable.

### 5. Actions permises : distinguer capacité et autorisation

La présence d’un outil ne donne pas automatiquement le droit d’utiliser toutes
ses capacités. Un exemple de niveaux :

| Niveau | Action typique | Preuve avant de continuer |
|---|---|---|
| A0 | Lire l’état, les chemins, les sources ou les journaux | Périmètre et état initial consignés |
| A1 | Rédiger une proposition ou un plan | Fichiers cibles et acceptation nommés |
| A2 | Faire une modification locale bornée | Le diff reste dans l’ensemble approuvé |
| A3 | Exécuter un contrôle ciblé | La commande vient du projet ou est approuvée |
| A4 | Commiter ou envoyer vers un dépôt distant | Destination autorisée et revue conservée |
| A5 | Publier, déployer, supprimer ou modifier un état externe | Approbation explicite, rollback et contrôle après action |

Un protocole peut autoriser A0–A2 sans autoriser A3, et autoriser un test sans
autoriser une installation. Évitez « fais tout ce qui est nécessaire » : cette
formule masque souvent un changement d’autorité.

### 6. Acceptation : relier chaque affirmation à une preuve

Écrivez d’abord l’affirmation, puis le matériau qui pourrait la soutenir :

| Affirmation | Preuve attendue | Ce que cela ne prouve pas |
|---|---|---|
| Les fichiers prévus ont changé | `git diff --name-only` et le diff | Le comportement runtime ou l’accord du lecteur |
| Le contrôle a réussi | Commande exacte, dossier, code et sortie | Que tous les risques sont couverts |
| La page est accessible | URL et observation à un viewport donné | Tous les navigateurs ou caches |
| La recherche est à jour | URL de première partie, date, portée et prochaine revue | La cause officielle d’un rapport communautaire |
| La tâche est terminée | Tableau affirmation→preuve sans exigence non soutenue | Les effets hors périmètre |

Lorsqu’une preuve coûteuse n’est pas disponible, réduisez l’affirmation. « Le
contrôle local a réussi » est souvent soutenable ; « la fonction marche pour tout
le monde » demande un environnement et un échantillon déclarés.

### 7. Échec et arrêt : préparer une sortie sûre

Arrêtez et signalez la situation lorsque la cible, l’état ou l’autorité sont
incertains ; qu’une entrée manquante pourrait changer la décision ; qu’une action
franchit la frontière de fichiers, de réseau, de compte ou de données ; qu’un
silence rend un retry ambigu ; que deux tentatives échouent pour la même raison
non testée ; ou que les preuves soutiennent une affirmation plus étroite que la
demande initiale.

Récupérer ne signifie pas « écrire un prompt plus insistant ». Conservez la
première erreur, réduisez le périmètre, changez une seule hypothèse ou vérification
et inspectez l’état avant toute reprise qui pourrait répéter un effet.

### 8. Transmission : laisser un relais utilisable

Le compte rendu final doit contenir les affirmations et leurs preuves, les
fichiers ou URL modifiés, les actions volontairement non exécutées, les inconnues,
le prochain contrôle minimal et le responsable ou la date de revue des faits
volatils. Sans ce relais, la personne suivante doit reconstruire le protocole à
partir de l’historique de chat et risque de répéter une action déjà tentée.

## Le protocole forme un graphe de dépendances

Les champs ne sont pas une liste d’adjectifs indépendants :

```text
résultat ─────────────→ acceptation ─────→ arrêt
   │                       │                ↑
   ├─ dépend de ───────→ entrées            │
   ├─ est limité par ──→ contraintes       │
   └─ détermine ───────→ actions ─────→ récupération

contexte ──> pertinence et confiance ──> preuve de transmission
```

Si le résultat change, l’acceptation change avec lui. Si une nouvelle entrée
modifie le risque, il faut revoir l’action autorisée et l’arrêt ; ajouter
« sois prudent » ne répare pas une dépendance manquante.

## Le plus petit protocole utile

Pour une correction locale réversible, le protocole peut rester court :

```text
Objectif : modifier <un fichier nommé> pour obtenir <un résultat observable>.
Lire d’abord : <fichiers ou source de vérité exacts>.
Autorisé : inspecter puis modifier <chemin nommé> ; exécuter <contrôle ciblé>.
Interdit : installation, secrets, réseau, commit, push, publication, production.
Acceptation : <diff précis> et <sortie précise du contrôle>.
Arrêt : chemin, commande, permission ou preuve non confirmés.
Livraison : fichiers, contrôle, actions non faites et éléments non vérifiés.
```

La brièveté vient du faible risque, pas de l’oubli des champs importants.

## Extension pour une action à risque élevé

Pour la production, un service externe, des données client ou une action
irréversible, ajoutez un point d’arrêt avant l’action :

```text
Environnement et compte cible :
Version actuelle et sauvegarde :
Effet externe exact :
Responsable de l’approbation et heure :
Cible de rollback et test de récupération :
URL, journal ou métrique à vérifier après l’action :
```

Un Skill, un runbook copié ou un build local réussi ne remplit pas silencieusement
ces champs : il faut une observation de l’environnement courant et l’autorité de
la personne responsable de l’état externe.

## Trois prompts valent mieux qu’un prompt énorme

Lorsque la tâche est incertaine, séparez les étapes :

1. **Observer :** fichiers pertinents, état, entrées manquantes et risques ;
2. **Proposer :** plan minimal, fichiers touchés, preuves et arrêts ;
3. **Agir :** exécuter seulement le plan approuvé et rendre compte champ par champ.

Cette séparation rend le plan relisible avant l’édition et aide à localiser
l’hypothèse qui a introduit un problème. Elle ne remplace pas la relecture du
résultat réel.

## Six prompts de départ pour une pratique bornée par les preuves

Ces prompts ne sont pas des formules magiques ni six leçons obligatoires. Ils
traitent six contrôles différents : point de départ observable, rappel avant
révélation, correction ciblée, variation, révision fondée sur les traces et
vérification différée. Les exemples utilisent l’espagnol, mais les champs peuvent
servir pour une compétence de langue, d’écriture, de code ou de recherche.

### 1. Trouver le vrai point de départ

```text
Je veux apprendre [tenir une conversation de cinq minutes en espagnol].
Ne m’enseigne rien pour l’instant. Donne-moi une courte tâche de référence qui
teste exactement cette capacité. Énonce les règles, l’aide autorisée, la durée
et les critères avant que je commence. Attends ma réponse, puis note ce que j’ai
fait, ce qui a bloqué le sens et ce que tu ne peux pas déduire d’un seul essai.
```

### 2. Me faire retrouver avant de montrer

```text
Enseigne-moi une petite unité utile pour [commander au restaurant en espagnol].
Garde l’explication initiale sous 120 mots, puis demande-moi de produire une
réponse de mémoire. Ne montre pas la réponse finale avant mon essai. Si je bloque,
donne un seul indice à la fois : type d’erreur, amorce partielle, puis fragment
résolu. Après le retour, demande une nouvelle réponse avec mes propres mots.
```

### 3. Corriger la première erreur qui change le sens

```text
Agis comme un partenaire d’entraînement précis, pas comme un admirateur. Pour
chaque réponse : indique brièvement ce qui a fonctionné, relève la première erreur
qui change le sens, explique la règle simplement, demande une correction et tiens
un registre (essai, correction, règle, variante suivante). Ne réécris pas tout à
ma place et ne corrige pas le style mineur tant que le sens reste bloqué.
```

### 4. Tester le transfert dans une situation différente

```text
Je viens de pratiquer [commander un repas en espagnol]. Donne-moi une nouvelle
situation qui utilise la même compétence, mais change le lieu, le vocabulaire et
une ambiguïté. Ne réutilise pas les phrases de la leçon. Laisse-moi répondre en
premier, note l’aide utilisée et indique seulement « démontré dans cette tâche de
transfert », jamais « maîtrisé ».
```

### 5. Construire la prochaine révision à partir des traces

```text
À partir uniquement de mes essais et de mon registre d’erreurs, prépare une
révision de quinze minutes : rappel sans aide, reprise des deux erreurs encore
importantes, un exemple mixte et une tâche inconnue finale. Ne prétends pas avoir
programmé un rappel externe. Donne-moi le texte à sauvegarder, la date proposée et
les preuves à rapporter.
```

### 6. Faire le contrôle différé avant de parler de rétention

```text
Voici ma révision de [compétence]. Ne montre pas la leçon enregistrée. Commence
par une tâche inconnue, garde la correction après mon essai, puis compare avec les
critères initiaux. Indique ce qui est démontré dans cet essai, ce qui reste
inconnu et quelle autre observation serait nécessaire avant de parler de
rétention. Ne déduis pas une habitude durable d’une seule bonne réponse.
```

La procédure décrit une méthode de pratique ; elle ne prouve ni un délai fixe
d’apprentissage ni un résultat garanti. Sauvegardez les essais, le registre, les
critères, l’aide reçue et la date au lieu de faire confiance à une impression.

## Entrée du problème réel

Les erreurs coûteuses commencent souvent par un mot vague : « optimise »,
« nettoie », « publie » ou « rends fiable ». Chaque terme peut viser plusieurs
fichiers, lecteurs et effets.

## Expérience : écrire la carte avant la réponse

### Préparation

Prenez une demande fictive ou une petite note non sensible. Aucun outil ni réseau
n’est nécessaire.

### Tâche

Complétez exactement ces champs :

```text
Résultat observable :
Contexte fourni :
Entrées autorisées :
Actions permises :
Contraintes et interdits :
Critère d’acceptation :
Preuves à conserver :
Échec et récupération :
Condition d’arrêt :
Format de transmission :
```

Avant de demander une génération, faites relire la carte et posez seulement la
question qui changerait le risque ou le critère d’acceptation.

### Un prompt de départ réutilisable

```text
Résultat : [résultat observable]
Contexte : [faits et documents fournis]
Aide autorisée : [ce que le modèle peut proposer ou vérifier]
Contraintes : [faits à préserver et actions interdites]
Réponse : [format attendu]
Contrôle : [ce que je vérifierai moi-même]
Arrêt : [entrée, autorité, source ou preuve manquante]
```

Une instruction citée dans un document reste une donnée tant que la tâche ne
la rend pas explicitement applicable. Le prompt encadre le travail ; il ne crée
ni accès, ni permission, ni preuve.

### Preuve

Conservez la carte, la première réponse et la comparaison entre le résultat
demandé et le résultat observé. Notez tout champ resté inconnu.

### Échec et limite

Si une instruction citée dans un document demande une action sans autorité
explicite, traitez-la comme donnée et arrêtez l’action. Une carte complète ne
rend pas vraie une source fausse et ne crée pas une permission.

### Réflexion

Quel champ a le plus réduit l’ambiguïté ? Quelle question avez-vous évitée en
réduisant le périmètre ?

## Transfert

Écrivez une seconde carte pour une recherche à sources imposées ou pour une
révision de texte. Comparez les champs stables et les champs propres au domaine.

Pour une recherche, remplacez la cible par une question, ajoutez les URL et la
date d’accès, puis séparez faits, témoignages et inférences. Pour une révision
de texte, gardez le texte source, le diff et la règle qui interdit d’ajouter des
faits. Dans les deux cas, conservez une liste explicite des inconnues.

## Liste de contrôle d’acceptation

- [ ] Le résultat peut être observé sans interprétation vague.
- [ ] Les entrées et les actions autorisées sont nommées.
- [ ] Le critère d’acceptation et les preuves sont distincts.
- [ ] Un échec et une condition d’arrêt sont prévus.
- [ ] La transmission indique les inconnues.

## Sources et limite de mise à jour

Le protocole est une méthode originale et stable. Les permissions, commandes,
versions et fonctions d’un produit exigent une source officielle datée. Cette
traduction française reste `candidate / not_run` ; une relecture indépendante
est encore nécessaire.

Passez à la [vérification et récupération](09-verification-and-recovery-FR.md).

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="02-first-safe-task-FR.md" aria-label="Chapitre précédent: Chapitre 2 · Première tâche sûre et vérifiable">← Précédent<br><strong>Chapitre 2 · Première tâche sûre et vérifiable</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="04-context-permissions-and-agent-FR.md" aria-label="Chapitre suivant: Chapitre 4 · Contexte, autorisations et Agent">Suivant →<br><strong>Chapitre 4 · Contexte, autorisations et Agent</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
