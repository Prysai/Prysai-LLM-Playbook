<!-- content_id: prysai-llm-comparison-protocol | locale: FR | language: fr | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-llm-comparison-protocol
description: >
  Planifier ou examiner une comparaison équitable et liée à une tâche entre
  deux LLM, modèles, fournisseurs ou workflows nommés. À utiliser lorsqu’une
  personne demande quelle option est meilleure, plus rapide, moins chère ou
  mérite une extension et que la réponse doit conserver des conditions fixes,
  les preuves brutes, les cas indisponibles et une conclusion étroite. Ne pas
  l’utiliser pour admettre une leçon de plateforme nommée, récupérer des faits
  produit actuels, exécuter un modèle sans autorisation ou publier un classement
  général.
---

# Protocole de comparaison des LLM

Transformez « lequel est meilleur ? » en une décision inspectable. Ce Skill
prépare ou examine une comparaison; il n’exécute pas de modèles, ne dépense pas
de budget, n’expose pas d’entrées privées et ne transforme pas un petit résultat
en classement.

## Figer la décision

Exigez un identifiant et un responsable de décision, exactement deux fiches de
candidats, une variable modifiée, un jeu de tâches, des entrées, un ordre, une
grille, des répétitions et un correcteur fixes, ainsi qu’une empreinte de
contexte, les outils et versions, les permissions, une base de coût ou un
budget, une fenêtre de disponibilité, l’emplacement des journaux, la limite de
conservation, la condition d’arrêt et la condition `not-comparable`.

Retournez `blocked` s’il manque un candidat, une règle d’acceptation, une limite
de permission, une base de coût ou un responsable. Ne normalisez pas
silencieusement les différences de compte, forfait, région, rate limit, outils,
contexte système ou format de sortie.

Passez les commandes, permissions ou comportements runtime d’un produit nommé
à `prysai-platform-adapter-review`. Passez prix, disponibilité et faits produit
actuels à `prysai-source-investigator`. Passez l’audit d’une affirmation de
comparaison terminée à `prysai-evidence-review`.

## Utiliser une seule surface fixe

Utilisez le paquet projet à trois tâches `evals/candidates/three-task-smoke-v1/`
lorsque ses entrées synthétiques correspondent à la décision. Lancez son
validateur local avant toute exécution externe. Le paquet fournit entrées,
hashes, forme de sortie attendue et modèle de run-record figés; il ne contient
aucun résultat de modèle et ne constitue pas un benchmark.

S’il ne convient pas, définissez un nouveau contrat de tâches avant d’exécuter
l’un ou l’autre candidat. Après le premier résultat, ne changez ni les entrées,
la grille, le contexte, les outils, le niveau de permission, le budget ni la
règle d’arrêt. Une condition changée est une nouvelle comparaison, pas une
nouvelle tentative dans l’ancienne.

## Conserver un run-record honnête

La planification et les contrôles statiques du fixture sont `R0`. Un run local
réversible et autorisé est `R1`. Un fournisseur, un compte, le réseau, une API
payante, un dépôt partagé ou un service externe sont `R2` et demandent une
cible, une limite de données, un budget, un responsable, un retour arrière ou
nettoyage et une confirmation explicites.

Pour chaque candidat et chaque tâche, conservez run ID, attempt ID, candidate ID,
task ID, hash d’entrée, empreinte de contexte, outils et versions, permissions,
base de coût, événement de disponibilité, emplacement de sortie brute,
validation, score humain, état de résultat, motif `not-comparable` et limite.
Rendez la première sortie immuable. Un retravail contrôlé reçoit un nouvel
attempt ID.

Une erreur de capacité, surface indisponible, permission incompatible,
divergence de hash, changement de version d’outil ou sortie brute manquante est
une preuve à conserver, pas une cellule vide à masquer.

## Limiter la conclusion

Classez chaque ligne `comparable`, `not-comparable` ou `not-run`. Puis ne
retournez qu’une décision :

- `worth-expanding` : les preuves déclarées au niveau de la tâche justifient
  de préparer une comparaison plus grande séparément ;
- `do-not-expand-yet` : les preuves observées échouent à la barrière déclarée
  ou présentent un défaut matériel non résolu ;
- `insufficient-evidence` : entrées, conditions, preuves, score ou comparabilité
  sont incomplets.

Ne nommez pas de gagnant universel, ne publiez pas de classement général,
n’inférez pas une capacité à partir de la disponibilité, la fiabilité d’un seul
succès, ne comparez pas des coûts dissemblables et ne transformez pas un
protocole non exécuté en preuve de performance.

## Retourner le reçu de comparaison

Retournez l’identifiant de décision, son responsable, la variable comparée, les
fiches des candidats, les conditions figées, le jeu de tâches et les hashes
d’entrée, l’acceptation et la notation, le statut des runs, les lignes
comparables, non comparables et la décision, les preuves, inconnues, relais,
risque, statut de contenu et cette limite : décision candidate limitée à la
tâche; pas un classement produit, benchmark, garantie runtime, résultat
d’apprenant ni recommandation de production.

## Fiche de maintenance

- `source` : méthode originale de Prysai Lab dérivée du fixture fixe
  `three-task-smoke` et des Chapitres 6 et 19
- `license` : réécriture originale; documentation de modèle/produit et traces
  d’exécution restent des références sous `docs/sources/asset-register.md`
- `owner` : evaluation-maintainer
- `version` : `0.1.0`
- `review_date` : `2026-09-14`
- `content_status` : `candidate`
