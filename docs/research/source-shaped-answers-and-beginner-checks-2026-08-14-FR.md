# Réponses de LLM qui semblent sourcées : vérifier avant de croire

**Statut :** note de recherche candidate. Il s’agit d’un projet daté et limité par ses sources ; aucune session d’apprenant, exécution de modèle, tâche de navigation, vérification de citation, évaluation de sécurité du produit ou évaluation de la qualité des sources n’a encore été menée.

## Question

Quelle est la première action sûre et minimale lorsqu’un débutant reçoit une réponse de LLM qui *semble sourcée* sans fournir de relevé de source vérifiable ?

## Périmètre et méthode

Cette note est plus étroite qu’un parcours de recherche complet. Elle ne dit pas si une affirmation est vraie. Elle apprend à distinguer un marqueur qui ressemble à une citation du relevé nécessaire pour examiner une affirmation importante : l’affirmation, le responsable de la source, un emplacement résoluble, la date d’accès et le document ou le passage qui la soutient dans son contexte.

L’activité est un exercice fictif et textuel fixe. Elle interdit la navigation, la récupération de sources, le partage de données et toute action externe. Pour établir un fait actuel, il faut passer le relais aux parcours existants Source Investigator et Research Router.

## Carte des preuves

| ID | Classe de preuve | Source et accès | Ce que cela étaye | Ce que cela n’établit pas |
| --- | --- | --- | --- | --- |
| O1 | recommandation officielle | [Bonnes pratiques de sécurité de l’API OpenAI](https://platform.openai.com/docs/guides/safety-best-practices), consultée le 2026-08-14 | OpenAI recommande une revue humaine des sorties avant utilisation, surtout dans les domaines à risque, avec accès au document original nécessaire à la vérification. | La vérité d’une réponse particulière, un audit indépendant, une propriété de sécurité du produit ou un effet de cette carte sur le comportement d’un lecteur. |
| O2 | recommandation technique officielle | [NIST AI 600-1 : profil de l’IA générative](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), consulté le 2026-08-14 | NIST décrit la confabulation : un contenu peut être faux tout en paraissant plausible ou assuré. Les justifications générées doivent donc rester à vérifier. | Le taux de citations erronées, le comportement d’un modèle donné ou l’exactitude d’une source précise. |
| R1 | témoignage public d’utilisateur | [OpenAI Developer Community : URL et titres d’articles inventés](https://community.openai.com/t/critical-hallucinated-urls-fake-article-titles-in-web-mode-despite-verification-requests/1253893), consulté le 2026-08-13 | Une personne a signalé des titres et URL apparemment fabriqués lors d’un échange avec la fonction web. C’est un signal d’échec pour le contrôle du relevé de source. | Un incident reproduit, sa cause, sa fréquence, le comportement actuel du produit ou une mesure corrective validée. |

## Décision pédagogique

L’inférence du projet reste volontairement modeste : **un marqueur de citation n’est pas encore un relevé de source vérifiable**. Pour une affirmation importante, conserver l’affirmation, le responsable de la source, l’URL ou autre emplacement résoluble, la date d’accès et le passage ou la donnée qui la soutient directement. Si un champ manque, le premier état honnête est `unverified`, et non « probablement exact ».

Il s’agit d’une règle éditoriale de gestion des preuves dérivée de O1 et O2. Ce n’est ni une norme formelle ni une obligation légale ; elle ne garantit pas qu’un relevé complet soit exact et ne remplace pas une vérification qualifiée.

## Exercice sans risque élevé

Utiliser une réponse fictive qui contient une affirmation et un marqueur entre crochets, mais aucun responsable de source, URL, date ni passage justificatif. Demander au lecteur de conserver les champs manquants au lieu de les compléter par une supposition plausible. Le relevé attendu est :

```text
claim: [quoted from the fictional answer]
source record: missing
status: unverified — source record missing
next allowed check: locate the source owner and the supporting material
stop: do not invent a source, browse, publish, or act on the claim here
```

Cela produit un petit artefact de décision, sans vérifier la source ni l’affirmation. Une question de fait actuel ne commence qu’après avoir nommé l’affirmation et le responsable de la source dans Source Investigator ; une question à plusieurs sources commence dans Research Router.

## Échec et seuil d’arrêt

L’exercice échoue si le lecteur ou le modèle ajoute une source, une date, un passage, un score de confiance ou une conclusion absente de la carte fictive. Conserver l’ajout comme artefact d’échec et marquer le relevé de source comme manquant. Ne pas naviguer pour sauver l’exemple, le transformer en affirmation sur une politique réelle ou justifier ainsi une action externe.

Arrêter si l’affirmation peut toucher à la santé, au droit, à l’emploi, à l’éducation, à l’argent, à la sécurité, à une personne privée ou à un système partagé. Cette carte ne convient pas à cette décision.

## Ce qui n’est pas affirmé

Cette note et sa carte ne démontrent pas qu’une citation de LLM est inventée ou fiable ; qu’un relevé complet rende une affirmation exacte, actuelle, impartiale ou utilisable pour décider ; qu’un apprenant puisse évaluer seul des sources, détecter la désinformation, résister à une injection d’instructions ou faire des recherches ; ni le comportement, la sécurité, la confidentialité, la conformité, l’apprentissage, la rétention, le transfert ou la maturité publique ou de production d’un produit.

## Sources et licences

Les explications, le contenu fictif, les champs du relevé et le SVG lié sont des éléments originaux de Prysai Lab. O1 et O2 sont uniquement des références liées, soumises aux conditions de leurs propriétaires. R1 reste un témoignage public individuel, non copié et non présenté comme un fait officiel. Le registre des actifs du dépôt documente cette limite de diffusion.

## Déclencheurs de relecture

Relire la note avant de modifier l’affirmation de la carte, ses champs de source, les recommandations produit liées ou le périmètre de sécurité. Une modification substantielle des recommandations citées par OpenAI ou NIST, ou la première observation autorisée d’un apprenant, déclenche également une relecture.
