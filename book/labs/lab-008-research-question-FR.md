<!-- content_id: lab-008-research-question | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->
---
id: lab-008-research-question
title: "Réduire un thème à une question exploitable"
level: L3
domain: research
goal: "Construire une question dont les affirmations peuvent être soutenues ou laissées ouvertes"
setup: "Un sujet public, une source primaire et une source d’autorité incertaine"
task: "Écrire trois questions, en retenir une et remplir une table de preuves"
evidence:
  - "Les versions de la question"
  - "Les sources, dates et extraits"
  - "Les lacunes et la condition d’arrêt"
failure_variant: "Ajouter une source inaccessible et compléter la conclusion par intuition"
reflection: "Quelle contrainte a rendu la question réellement exploitable ?"
status: draft
last_verified: "not run"
transfer_task: "Réutiliser la table pour un bug ou une vérification de contenu"
transfer_domain: "ingénierie, recherche ou rédaction"
transfer_evidence: "Question, sources, carte des affirmations et limites"
transfer_limitations: "Une source publique peut rester ancienne, biaisée ou incomplète"
---

# Lab 008 : Réduire une question de recherche

## Objectif

Le but est de construire une question exploitable, dont chaque affirmation peut
être soutenue, limitée ou laissée ouverte. Une question utile nomme la
population ou l’objet, la période, la décision à éclairer et la classe de
preuves acceptable avant que la rédaction ne commence.

## Préparation

Choisissez un thème public sans enjeu médical, juridique ou financier. Préparez
une source primaire ou faisant autorité qui soit accessible aujourd’hui, ainsi
qu’une source dont l’autorité ou l’accessibilité est incertaine. Notez les URL
et les dates d’accès avant de prendre des notes. Une source publique peut être
ancienne, incomplète ou biaisée.

## Tâche et expérience

Écrivez trois questions candidates. Pour chacune, remplissez cette fiche :

```text
decision_this_answer_informs:
object_or_population:
time_window:
included / excluded:
required_source_class:
answer_shape:
stop_condition:
```

Retenez une question et expliquez pourquoi les deux autres sont trop larges,
trop vagues ou impossibles à soutenir avec les preuves autorisées. Construisez
le plan de sources avant le brouillon : utilisez les sources primaires pour les
faits de produit, les politiques, les normes et les statistiques ; utilisez les
sources secondaires pour trouver ou comparer, jamais pour remplacer
silencieusement le document primaire.

## Table de preuves

Créez une ligne pour chaque affirmation matérielle :

| Affirmation | Source et emplacement | Date d’accès | Soutien direct | Inférence | Limite | Statut |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  | `supported` / `partial` / `disputed` / `unknown` / `out_of_scope` |

Rédigez seulement après avoir rempli la table. Une phrase qui relève de
l’analyse doit être marquée comme telle. Terminez par la plus petite source ou
expérience qui réduirait l’incertitude la plus importante.

## Paquet de référence du mainteneur

Le projet fournit une fixture locale et gelée pour ce Lab. Elle comprend une
source actuelle, une source ancienne avec un conflit de portée, une source
inaccessible et une citation fabriquée. Le premier brief surestime le soutien
et doit échouer. Le brief corrigé doit réduire la décision, conserver le conflit
et les inconnues, exclure les sources inadmissibles et enregistrer une fiche de
clôture avant de pouvoir réussir.

Consultez la [fixture gelée](../../examples/lab-008-v1/README.md), le
[contrat de l’exemple exécutable](../../docs/governance/executable-examples.yaml)
et la [revue du paquet mainteneur](../../docs/quality/lab-008-reference-run-review-2026-08-13.md).
Cette preuve est déterministe et synthétique : elle n’utilise ni modèle, ni
navigation Web, ni apprenant et n’établit pas la qualité d’une recherche réelle.

## Preuve à conserver

Conservez le thème initial, les trois questions, la justification du choix, le
plan de sources, les extraits ou emplacements précis, les dates d’accès, la
table d’affirmations, le brouillon et la section de limites. Une URL seule ne
prouve pas ce qu’une source disait à la date d’accès.

## Échec et limite

Ajoutez une source impossible à ouvrir, portant sur une autre population ou
avançant une conclusion forte sans méthode visible. L’affirmation concernée
doit devenir `unknown`, `partial` ou `out_of_scope`, la portée de la conclusion
doit diminuer et une vérification de remplacement doit être nommée. Ne
reconstruisez jamais un fait à partir d’un titre, d’un extrait de recherche ou
d’une formulation assurée.

## Liste de contrôle d’acceptation

- [ ] La question finale nomme sa portée, sa décision, sa classe de preuves et sa condition d’arrêt.
- [ ] Chaque affirmation matérielle renvoie à un emplacement précis et à une date d’accès.
- [ ] Soutien direct, inférence, désaccord et inconnue restent distincts.
- [ ] La fixture de source faible réduit la confiance au lieu d’inventer un soutien.
- [ ] Aucune donnée privée, prise de contact, dépense, soumission ou publication n’a eu lieu.
- [ ] La conclusion indique quelle preuve pourrait la modifier.
- [ ] Le résultat reste `draft / not_run` tant qu’un run et une revue ne sont pas conservés.

## Réflexion et transfert

Quelle contrainte a produit le plus grand gain de précision ? Quelle source
semblait utile mais ne soutenait pas l’affirmation réelle ? Qu’est-ce qui reste
une hypothèse plutôt qu’un résultat ? Transférez ensuite le protocole à une
enquête d’ingénierie, de produit ou de vérification documentaire en recréant une
nouvelle table et une nouvelle limite.

## Sources et limite de mise à jour

**Statut :** `draft` · **Exécution :** `not_run`. Les sources accessibles
restent susceptibles d’être anciennes, incomplètes ou biaisées ; ce Lab ne
produit aucun avis professionnel et ne prouve pas une qualité de recherche
générale. La traduction française reste à relire indépendamment.
