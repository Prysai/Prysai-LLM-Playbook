<!-- content_id: chapter-09-verification-and-recovery | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-22-fr-recovery-restoration -->

# Chapitre 9 : Vérifier, douter et récupérer

**Statut :** candidate · **Expérience :** not_run

Ce chapitre apprend à relier chaque affirmation à la plus petite preuve qui la
soutient, puis à reprendre une tâche incertaine sans élargir son périmètre. Les
rapports publics sont des entrées pédagogiques, pas des reproductions locales,
diagnostics officiels ou preuves de production.

![Carte pédagogique : s’arrêter à la première preuve manquante et récupérer avec une vérification sûre](../../assets/teaching/evidence-recovery-ladder.svg)

> Cette carte appartient au projet. Elle décrit une méthode de revue ; elle ne
> prouve pas l’exécution d’un Skill, Agent, outil ou service externe.

## Le problème que résout ce chapitre

Un Agent peut produire un résumé convaincant pour un résultat faux, hors
périmètre, jamais exécuté ou contrôlé dans le mauvais environnement. La réponse
fiable n’est ni la confiance aveugle ni le doute permanent : découpez le résumé
en affirmations et donnez à chacune la plus petite preuve qui puisse la soutenir.

## Objectifs d’apprentissage

- séparer une affirmation de complétion et choisir sa preuve minimale ;
- distinguer error, unverified, unknown, partial, not_observed et verified ;
- repérer la dernière étape confirmée et le premier maillon non étayé ;
- préserver l’état, réduire la portée, ajouter un contrôle ou arrêter ;
- rédiger une livraison avec les travaux faits, lacunes et prochaine vérification.

## Problèmes de terrain : le signal n’est pas la preuve

Les recherches du projet décrivent des interruptions de capacité, des commandes
restées en Working, des outils absents et des contrôles devenus réinstallation.
Elles montrent des ruptures observables, mais n’établissent ni cause universelle
ni correctif pour chaque compte.

| Symptôme rapporté | Ce qu’il soutient | Première réponse bornée |
|---|---|---|
| Modèle indisponible, tâche interrompue | Un observateur a vu une erreur et une interruption. | Geler, inspecter diff, logs et dernier checkpoint. |
| Contrôle bloqué en Working | Aucun signal de fin n’a été observé dans ce run. | Fixer un délai, capturer sortie et état, interrompre selon la règle. |
| Session disponible, outil absent | Inventaire et attente ne correspondaient pas. | Consigner la liste réelle, arrêter avant l’action. |
| Vérification transformée en réinstallation | Une interprétation a franchi une frontière persistante. | Séparer source, test, installation, restart, publication et live check. |

Ne concluez pas « ne jamais réessayer » ou « installer est toujours faux ».
Faites dépendre la suite de l’observation, de l’autorité et du budget.

## 1. Relier les affirmations aux preuves

| Affirmation | Preuve minimale dans la portée déclarée | Ce qui reste hors affirmation |
|---|---|---|
| Un fichier a changé | Diff, chemin nommé ou hash. | Correction ou complétude. |
| Un contrôle a réussi | Commande, répertoire, code retour et sortie. | Comportement d’un autre environnement. |
| L’application démarre | Démarrage réel et observation d’un chemin critique. | Qualité, sécurité, valeur ou production. |
| La page est correcte visuellement | Rendu ou capture à viewport enregistré. | Accessibilité, tous breakpoints ou backend. |
| Le fait vient d’une source officielle | URL, date, portée et responsable. | Capacité de votre compte courant. |
| Aucun secret n’est exposé | Scan borné, vérification d’environnement et frontière écrite. | Système externe inconnu. |
| Le résultat aide les utilisateurs | Échantillon, tâche et acceptation utilisateur définis. | Succès du marché. |
| Prêt pour la production | Portes qualité, sécurité, maintenance, release et rollback. | Environnement non testé ou futur changement. |

### Tableau affirmation → preuve

Avant un slice auditable, écrivez :

~~~text
assertion: ce que je prétends exactement
scope: fichier, commande, run, version ou environnement
evidence: chemin, sortie, log, capture, source ou revue
status: verified / partial / unverified / blocked / not_run
gap_or_next_check: ce qui manque et la plus petite façon de l’ajouter
~~~

Un diff ne prouve pas un test ; une page connectée ne prouve pas un échange de
token ou une action distante. Une preuve absente reste unverified ou blocked.

## 2. Utiliser le doute pour choisir le prochain contrôle

Pour une décision importante, demandez : quelle prémisse n’a pas de preuve ?
Quelle frontière est hors test ? Le résultat peut-il venir d’un cache, d’un mock,
d’un fichier ancien ou du mauvais environnement ? Où le défaut deviendrait-il
visible ? Quel contrôle additionnel changerait la décision ?

| Phrase | Preuve minimale |
|---|---|
| « La source a changé. » | Diff ou comparaison au chemin nommé. |
| « Le contrôle a tourné. » | Commande, répertoire, code et sortie. |
| « L’application fonctionne. » | Observation runtime dans l’environnement nommé. |
| « La page est correcte. » | Rendu à viewport enregistré et critères visuels. |
| « La fonctionnalité est publiée. » | État distant, release/deployment et contrôle post-livraison. |

## 3. Récupérer dans un ordre borné

1. préserver l’erreur et l’état courant ;
2. classer la frontière : entrée, compréhension, environnement, code, capacité, permission ou vérification ;
3. réduire le périmètre et reproduire la rupture la plus petite ;
4. faire une réparation minimale ou ajouter un contrôle ciblé ;
5. relancer le chemin touché et consigner la nouvelle preuve ;
6. si la cause reste floue, arrêter et livrer une note de blocage précise ;
7. élargir permission, portée ou budget seulement si la preuve le justifie.

### Chaîne de capacité

~~~text
outil/Skill visible → découverte en lecture seule → état cible lisible
→ action retourne → changement externe confirmé
~~~

Chaque maillon a sa propre preuve. Un nom visible ne prouve pas l’enregistrement,
la découverte ou l’exécution. Une lecture du DOM ne prouve pas un clic réussi.

### Fiche de point d’arrêt

~~~yaml
run_id: "identifiant unique"
surface: "surface et version réelles"
expected_capability: "plus petite capacité nécessaire"
chain:
  - stage: "session disponible"
    observation: "événement ou erreur observable"
    status: "passed | failed | not_observed"
  - stage: "outil enregistré et découvrable"
    observation: "liste ou découverte en lecture seule"
    status: "passed | failed | not_observed"
  - stage: "état cible lisible"
    observation: "chemin, compte, objet ou fenêtre"
    status: "passed | failed | not_observed"
  - stage: "action retournée"
    observation: "résultat, code ou catégorie d’erreur"
    status: "passed | failed | not_observed"
  - stage: "effet confirmé"
    observation: "diff, lecture arrière ou état distant"
    status: "passed | failed | not_observed"
last_confirmed_stage: "dernier maillon passé"
first_breakpoint: "premier maillon échoué ou non observé"
safe_next_check: "contrôle qui change une seule condition"
stop_condition: "moment où l’on s’arrête sans élargir l’autorité"
~~~

### Longue attente sans événements

Consignez request_started_at, first_event_at, chaque événement outil/réseau,
last_event_at, l’interruption ou erreur, le début d’un retry et l’état final. Au
seuil prévu, marquez no_event_observed, reprenez le contrôle par un moyen
autorisé et inspectez processus, worktree, cible et checkpoint. Si un effet est
possible, arrêtez unverified ou blocked. Une seconde tentative réussie ne
réécrit pas la première tentative silencieuse.

## 4. Distinguer récupération et complétion

practice désigne un exercice, candidate une structure prometteuse mais
incomplètement évaluée, verified une preuve dans la portée déclarée et
production-ready les portes qualité, sécurité, rollback, maintenance et release
passées. not_observed décrit un événement non vu ; not_run signifie que
l’expérience n’a pas eu lieu ; partial, unverified et blocked décrivent la lacune
la plus étroite soutenue.

Récupérer le contrôle ne fait pas monter le statut de complétion. Interrompre un
processus et préserver un diff peut produire un handoff candidate alors que le
résultat runtime reste unverified.

## 5. Expérience : auditer une affirmation de complétion

### Préparation

Préparez un résumé de fin anonymisé, un diff, une sortie de test, des sources et
une preuve volontairement absente. Aucun service de production ni système
externe ne doit être connecté.

### Tâche

Utilisez [Lab 003](../labs/lab-003-evidence-review-FR.md) pour créer un tableau
des affirmations. Ajoutez une phrase non étayée comme « tous les tests passent »
et vérifiez que la revue la refuse au lieu de suivre son ton.

### Preuve

Gardez tableau, chemins de preuve, catégorie de lacune, décision de revue et
plan de récupération. Incluez une affirmation de fait, une de runtime et une
d’effet utilisateur.

### Échec et limite

Si une phrase n’a aucun contrôle correspondant, baissez-la à unverified ou
not_run. Le tableau n’établit ni une cause fournisseur, ni une reproduction, ni
un succès d’apprentissage.

### Réflexion

Quelle phrase avait la preuve la plus faible ? Quelle action avez-vous refusée
de répéter ? Quel contrôle unique aurait changé la décision ?

## Liste de contrôle d’acceptation

- [ ] Chaque phrase importante possède une preuve ou un statut explicite.
- [ ] Interruption, succès, échec et effet inconnu sont séparés.
- [ ] La récupération est petite, réversible et autorisée.
- [ ] L’historique, le checkpoint et les inconnues sont conservés.
- [ ] La conclusion ne dépasse pas la portée du registre.
- [ ] Une chaîne de capacité possède une preuve par maillon.
- [ ] La fiche de point d’arrêt nomme la première transition absente.
- [ ] Un handoff distingue verified, partial, blocked et unverified.

## Transfert

Appliquez le registre à une note de recherche : source consultée, date, portée,
affirmation soutenue et contradiction ouverte. Puis transférez-le à une revue
visuelle en ajoutant viewport, capture, critères et limites de ce que l’image ne
prouve pas.

## Sources et limite de mise à jour

Les commandes, états et interfaces propres aux plateformes évoluent. Vérifiez
les sources officielles avant une action. La [recherche de terrain](../../docs/research/field-problems-codex.md)
contient des rapports et limites, pas des causes universelles. Cette adaptation
reste in-progress, candidate et not_run jusqu’à une exécution bornée et une
relecture francophone.

Continuez avec la [planification et le découpage](10-planning-and-slicing-FR.md).

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres"><table role="presentation" width="100%"><tr>
<td align="left"><a data-chapter-nav="previous" href="08-full-lifecycle-workflow-FR.md" aria-label="Chapitre précédent : Chapitre 8 · De la définition à la livraison">← Précédent<br><strong>Chapitre 8 · De la définition à la livraison</strong></a></td>
<td align="right"><a data-chapter-nav="next" href="10-planning-and-slicing-FR.md" aria-label="Chapitre suivant : Chapitre 10 · Planification et tranches verticales">Suivant →<br><strong>Chapitre 10 · Planification et tranches verticales</strong></a></td>
</tr></table></nav>
<!-- chapter-navigation:end -->
