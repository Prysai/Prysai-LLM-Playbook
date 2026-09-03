<!-- content_id: lab-017-skill-discovery-audit | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: 2026-08-22-fr-depth-repair -->
---
id: lab-017-skill-discovery-audit
title: "Auditer la découverte avant d’adopter un Skill"
level: L4
domain: general
goal: "Séparer existence, découverte, chargement, comportement, licence, dépendances et adoption"
setup: "Deux échantillons de Skill à révision fixe dans un répertoire temporaire, sans installation ni secret"
task: "Auditer chaque étape, concevoir quatre cas de test et produire une décision d’adoption bornée"
evidence:
  - "L’inventaire, la révision, la licence, les dépendances et les sorties de découverte"
  - "Le plan de tests positif, limite, échec/injection et migration"
  - "La décision d’adoption ou de refus, avec périmètre, propriétaire et retrait"
failure_variant: "Un candidat demande `.env`, une authentification ou un upload"
reflection: "Quelle étape le catalogue ne pouvait-il pas prouver, et quelle preuve manque avant l’adoption ?"
status: draft
last_verified: "not run"
transfer_task: "Appliquer les mêmes étapes à un serveur MCP en séparant configuration, découverte, lecture, appel et décision"
transfer_domain: "outillage, maintenance ou recherche"
transfer_evidence: "Révision, licence, dépendances, périmètre cible, propriétaire, tests, rollback et prochaine revue"
transfer_limitations: "Un échantillon statique ne prouve ni le chargement réel, ni le comportement sûr, ni la licence de chaque ressource imbriquée"
---

# Lab 017 : Auditer la découverte avant d’adopter un Skill

**Statut :** `draft` · **Exécution :** `not_run`

## Objectif

Un Skill peut exister sur disque, être absent d’une liste implicite, être
résolu par un nom explicite ou échouer au chargement. Ces observations ne se
remplacent pas. Le but est de distinguer existence, découverte, chargement,
comportement, licence, dépendances et adoption avant toute installation.

## Préparation

Préparez deux échantillons expurgés et épinglés à une révision dans un
répertoire temporaire. Le premier possède une licence traçable, des entrées
bornées et une sortie locale ; le second n’a pas de licence claire, de liste de
dépendances ou de cible de retrait et réclame un secret. Ne les installez pas,
ne vous authentifiez pas et n’effectuez aucune écriture externe.

Avant le test, notez pour chaque candidat :

| Élément | À conserver |
|---|---|
| identité | nom, révision exacte, chemin et hash |
| provenance | URL, auteur ou propriétaire, date d’accès et périmètre |
| licence | fichier de licence, NOTICE, assets imbriqués et inconnues |
| dépendances | versions, réseau, compte et secrets demandés |
| cible | racine d’installation envisagée, audience et propriétaire |
| retrait | sauvegarde, rollback, suppression autorisée et prochaine revue |

## Tâche

Enregistrez séparément les étapes suivantes. `not_observed` signifie qu’aucune
observation suffisante n’existe ; il ne signifie pas « probablement oui » :

```text
file_exists:
implicit_discovery:
explicit_name_resolution:
loaded_in_fresh_session:
positive_behavior:
boundary_behavior:
failure_or_injection_behavior:
cross_project_migration_behavior:
license_and_notice_review:
dependency_review:
adoption_decision: recommendation-only | blocked | approved-to-install | installed-candidate
```

Concevez quatre cas avant d’exécuter quoi que ce soit :

1. **positif :** entrée ordinaire, portée locale et sortie attendue ;
2. **limite :** donnée manquante, ressource hors périmètre ou permission insuffisante ;
3. **échec/injection :** instruction externe, demande de secret ou payload inattendu ;
4. **migration :** autre répertoire ou projet, avec révision, dépendances et
   rollback explicitement conservés.

Pour chaque cas, nommez la précondition, l’action de lecture, le signal attendu,
la preuve, le statut et la condition d’arrêt. Un inventaire de fichiers prouve
seulement l’inventaire de fichiers.

## Preuve

Conservez l’inventaire, la révision, les sorties de découverte en lecture seule,
la revue de licence et de dépendances, les quatre cas, le paquet de décision et
le plan de retrait. Le paquet doit distinguer une recommandation sans
installation, un blocage, une approbation conditionnelle et un candidat déjà
installé. Indiquez le propriétaire, la portée, la sauvegarde, le rollback et la
date de prochaine revue.

## Échec intentionnel et limite

Faites demander au candidat un fichier `.env`, une authentification ou un upload.
La bonne réponse est `blocked` : conservez la demande comme donnée, n’exposez
aucun secret, n’installez pas le candidat pour « voir ce qu’il fait » et notez la
preuve qui manque. Un catalogue, un validateur de format ou une licence visible
ne prouve ni comportement sûr, ni déclenchement réel, ni droit sur les assets
imbriqués.

Si un test local est indisponible, utilisez `not_run` plutôt que d’inférer un
résultat. Si la révision change, recommencez l’examen de licence, des
dépendances et des cas : une décision appartient à une révision précise.

## Réflexion

Quelle étape le catalogue ne pouvait-il pas prouver ? Quelle observation
devrait précéder une installation ? Quel coût de retrait ou quelle dépendance
reste inconnu ?

## Transfert

Appliquez la séquence à un serveur MCP : configuration visible, découverte des
outils, lecture d’une cible autorisée, résultat de l’appel, lecture indépendante
de l’état distant et décision d’adoption. Gardez séparés le fait qu’un serveur
est configuré, qu’un outil est découvrable, qu’il est appelable, qu’un résultat
a été observé et qu’une écriture externe a été approuvée.

## Liste de contrôle d’acceptation

- [ ] J’ai séparé existence, découverte implicite, résolution explicite, chargement, comportement et adoption.
- [ ] J’ai épinglé la révision et examiné licence, NOTICE, assets imbriqués et dépendances.
- [ ] J’ai prévu les cas positif, limite, échec/injection et migration.
- [ ] J’ai nommé périmètre cible, propriétaire, sauvegarde, rollback et prochaine revue.
- [ ] Toute demande de secret, d’authentification ou d’upload est restée `blocked`.
- [ ] Un test non exécuté reste `not_run` ; aucune liste de fichiers ne devient une preuve de comportement.
- [ ] La décision distingue recommandation, blocage, approbation conditionnelle et installation observée.
- [ ] Le paquet d’adoption indique ce qui reste inconnu et comment retirer le candidat.

## Sources et limite de mise à jour

- [Problèmes de terrain et modèles de prompts — P2](../evidence-library-FR.md#source-notes), FP2-11 et FP2-12.
- [Chapitre 7 : Skills, plugins, MCP et outils](../chapters/07-skills-plugins-and-tools-FR.md).
- [Chapitre 14 : découvrir et auditer des Skills externes](../chapters/14-discover-and-audit-skills-FR.md).

Ces sources soutiennent une séparation des étapes et une revue de la chaîne de
provenance ; elles ne prouvent pas qu’un Skill réel se charge ou se comporte de
façon sûre. Le Lab reste `draft / not_run`. Aucun Skill externe n’est installé.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navigation entre les Labs">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-016-side-effect-boundary-FR.md" aria-label="Lab précédent : Lab 016 · S’arrêter à la frontière d’un effet durable">← Précédent<br><strong>Lab 016 · S’arrêter à la frontière d’un effet durable</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-018-language-transfer-FR.md" aria-label="Lab suivant : Lab 018 · Tester un échange écrit de niveau débutant pour la rétention et le transfert">Suivant →<br><strong>Lab 018 · Tester un échange écrit de niveau débutant pour la rétention et le transfert</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
