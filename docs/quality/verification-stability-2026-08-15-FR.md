<!-- content_id: verification-stability-2026-08-15 | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: verification-stability-2026-08-15.md | source_revision: 2026-08-15 -->

# Cinq exécutions locales de vérification répétées

**Statut :** observation d’ingénierie `candidate`

**Enregistré le :** 2026-08-15 (America/Los_Angeles)  
**Données :** [durées lisibles par machine](verification-stability-2026-08-15.json) · [graphique](verification-stability-2026-08-15.svg)

## Ce qui a réellement été observé

Dans l’arbre de travail Windows actuel, sept vérifications locales du dépôt ont été exécutées cinq fois de suite, dans le même ordre. Chaque exécution s’est terminée avec succès. Le graphique montre la durée médiane de chaque vérification ; le tableau conserve les cinq mesures brutes afin que le résumé puisse être contrôlé, et pas seulement accepté.

![Durée médiane de cinq exécutions locales de vérification](verification-stability-2026-08-15.svg)

Sur un téléphone, utilisez le tableau ci-dessous pour les valeurs exactes. Le Reader présente ce graphique dense comme un lien nommé, ouvrable à sa taille réelle, plutôt que comme un texte supposé lisible sur un petit écran.

| Vérification | Réussites | Mesures brutes (ms) | Médiane (ms) | Moyenne (ms) |
| --- | ---: | --- | ---: | ---: |
| Base du projet | 5 / 5 | 48.9, 38.3, 36.1, 34.4, 35.1 | 36.1 | 38.6 |
| Structure du projet | 5 / 5 | 43.2, 42.3, 40.5, 39.1, 39.5 | 40.5 | 40.9 |
| Intégrité du contenu | 5 / 5 | 49.4, 47.5, 46.9, 47.0, 44.7 | 47.0 | 47.1 |
| Contrat d’apprentissage anglais | 5 / 5 | 86.8, 83.8, 84.5, 83.1, 83.9 | 83.9 | 84.4 |
| Registre des Skills | 5 / 5 | 49.7, 47.4, 47.6, 48.2, 47.4 | 47.6 | 48.1 |
| Contrat de routage des Skills | 5 / 5 | 34.2, 35.2, 35.4, 34.0, 34.3 | 34.3 | 34.6 |
| Liens Markdown locaux | 5 / 5 | 498.1, 496.1, 474.8, 473.9, 484.5 | 484.5 | 485.5 |

## Ce que cela montre — et ne montre pas

Il s’agit d’un élément utile d’évidence technique : les sept vérifications nommées sont restées stables pendant cinq exécutions locales consécutives, et l’audit des liens a été le plus lent dans ce petit échantillon. Ce n’est ni un benchmark du livre, ni celui d’un modèle ou d’un Skill.

Ces chiffres ne montrent notamment pas qu’un lecteur apprend plus vite, qu’un Skill améliore la productivité, qu’un modèle est plus sûr ou plus exact, ni que le QI de qui que ce soit a changé. Le dépôt ne dispose ni d’un instrument psychométrique validé, ni d’un évaluateur qualifié, ni d’une base éthique permettant une telle affirmation. Le QI n’est donc pas une mesure opérationnelle du projet.

Le [protocole pilote Shift Handoff](shift-handoff-pilot-protocol-v1.md) définit ce qu’il faudrait pour observer un résultat de processus beaucoup plus précis. Son statut initial reste `candidate / not_run` tant que des comptes rendus autorisés et désidentifiés n’existent pas et qu’un évaluateur indépendant ne les a pas examinés.

## Reproduire l’observation technique

Utilisez l’environnement documenté dans [AGENTS.md](../../AGENTS.md), exécutez cinq fois dans le même ordre les sept commandes listées dans le fichier JSON, puis conservez la sortie complète, le code de sortie, l’identifiant du commit, le système d’exploitation, le runtime et l’état de l’arbre de travail local. Ne comparez pas les durées entre machines comme s’il s’agissait d’un score de productivité. Une comparaison avec un checkout propre ou avec la CI constituerait une nouvelle observation, pas la suite de celle-ci.

## Limite de l’évidence

L’observation se limite aux vérifications statiques et structurelles indiquées. Leur réussite n’établit ni la compréhension des apprenants, ni le comportement des Skills à l’exécution, ni leur déclenchement automatique, ni la sémantique des sources, ni la qualité des traductions, ni le comportement du navigateur, ni le déploiement, la sécurité, l’utilité ou la préparation à la publication.
