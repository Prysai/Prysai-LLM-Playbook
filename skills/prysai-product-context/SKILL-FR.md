<!-- content_id: prysai-product-context | locale: FR | language: fr | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

---
name: prysai-product-context
description: >
  Créer ou mettre à jour un contexte produit et marketing versionné avant un
  travail de positionnement, de contenu, de SEO, de conversion, de lancement,
  d’analytique ou de vente. À utiliser lorsqu’il manque une compréhension
  commune du produit, du public, du positionnement, de la voix de marque ou du
  contexte produit. Ne pas l’utiliser pour inventer des preuves client,
  remplacer une recherche ou exécuter des modifications marketing en aval.
---

# Contexte produit

Créez un contexte compact et canonique que le travail en aval pourra réutiliser.
Séparez les faits observés, les mots attribués aux clients, les décisions et
les hypothèses.

## Limite de déclenchement et passage de relais

Prenez en charge lorsqu’il manque un artefact commun concernant le produit, le
public, le positionnement, le message, la marque, la conversion ou la mesure.

Passez le relais lorsque :

- un `$skill` explicite est nommé : respectez-le et ne fournissez le contexte
  que si la demande le requiert ;
- une recherche externe est nécessaire : Research Router ;
- les affirmations d’un contexte existant doivent être auditées : Evidence
  Review ;
- la demande consiste à exécuter des changements de contenu ou de lancement :
  Task Protocol ou Workflow Orchestrator ;
- la demande consiste seulement à apprendre le positionnement : Codex Coach.

Ne devenez ni l’exécutant marketing, ni le système d’analytique, ni le
substitut d’une recherche client. Ne rappelez pas Product Context pour un
livrable en aval sauf si une lacune matérielle de contexte apparaît.

## Entrées requises et traitement des informations manquantes

Exigez `product_or_project`, `current_goal`, `known_audience`,
`available_sources`, `decision_to_support` et `canonical_location`. Exigez
également `decision_owner`, `context_version` et `version_baseline`. Inspectez
le contexte existant, sa version ou son hash actuel et son journal des
modifications avant de proposer un changement. Marquez les preuves client,
mesures, témoignages, faits concurrentiels et préférences absents comme
`hypothesis` ou `unknown`; posez des questions ciblées pour les lacunes à fort
impact.

Par défaut, fournissez un brouillon non autoritatif ou une diff proposée. Une
demande d’explication, de revue ou de polissage d’un contexte existant
n’autorise pas sa reconstruction ni l’écriture du fichier canonique. Avant
d’écrire dans ce fichier, exigez le chemin cible exact, la version/hash de
référence, le périmètre des champs modifiés, la classification de confidentialité
et la décision PII, le responsable, une sauvegarde réversible ou une cible de
retour arrière, ainsi qu’une confirmation explicite immédiatement avant
l’écriture. La confirmation doit nommer la cible et l’action; une connexion,
un token ou une formule « accès complet » ne suffit pas. Si un champ manque,
retournez `blocked` avec `blocked_on` au lieu d’écrire ou de créer une entrée de
journal. Ne remplacez jamais un contexte existant si la cible, la référence ou
le périmètre d’écriture ne correspondent pas.

## Capturer et versionner

Capturez la phrase de synthèse, la catégorie, le type, l’objectif, les publics
et décideurs cibles, les jobs-to-be-done, les anti-personas, les problèmes,
les alternatives, les objections, la différenciation, les points de preuve,
les mots des clients, les termes à employer ou éviter, le glossaire, le ton,
les contraintes, l’action de conversion et les décisions de mesure. Pour chaque
changement matériel, augmentez la version et ajoutez une entrée datée au
journal. Indiquez au travail en aval l’emplacement et la version faisant
autorité.

L’entrée du journal doit identifier l’ancienne version, la nouvelle version,
les affirmations changées, les preuves utilisées, le responsable de la décision,
les artefacts en aval touchés, le chemin cible et la cible de retour arrière. Un
contexte en brouillon n’est pas autoritatif tant que le responsable n’a pas
accepté cette entrée. Gardez distincts les états de proposition, d’écriture
confirmée et de changement publié; l’achèvement de l’un n’implique pas le
suivant.

## Transmission au design en aval

Product Context contraint le design en aval; il ne choisit pas un style visuel
par goût, ne génère pas une interface terminée et ne vérifie pas la qualité
visuelle. Lorsqu’un artefact en aval est une page web, une application, une
présentation, un rapport ou un autre livrable visuel, fournissez un
`design_handoff` qui précise :

- la tâche réelle de l’utilisateur et la décision que l’artefact doit aider à
  prendre ;
- la hiérarchie d’information requise et la densité minimale utile ;
- les conventions familières du secteur que l’utilisateur peut reconnaître
  sans explication ;
- les signaux de confiance, sources, mentions, propriétaire et coordonnées
  nécessaires ;
- les photographies, stocks, données, mots de clients, témoignages et actifs
  de marque approuvés qui existent réellement ;
- les motifs visuels ou rédactionnels interdits parce qu’ils fabriqueraient une
  preuve ou impliqueraient une autorité non étayée ;
- les tailles d’écran cibles, conditions d’accessibilité, responsable de revue
  et contrôles d’acceptation.

Si des photographies réelles, un inventaire, des mots de clients, des
témoignages ou un système de marque approuvé manquent, ne comblez pas la lacune
avec un texte de style de vie, des offres synthétiques, des illustrations
immobilières décoratives, une grande typographie éditoriale à empattements, des
formes en dégradé doux, des cartes flottantes ou des arrondis excessifs.
Préférez un guide d’achat, une explication de service, une checklist, une
comparaison ou un outil de décision dont l’utilité ne dépend pas de preuves
inventées. Un artefact visuellement soigné reste non vérifié tant qu’il n’a pas
été rendu et examiné dans les conditions déclarées.

## Risques, effets de bord et confirmation

La rédaction à partir de sources fournies est `R0` ou `R1`. L’écriture du
fichier canonique est `R1` seulement lorsque la cible locale exacte, la
référence, la sauvegarde, la décision de confidentialité, le retour arrière,
le responsable et la confirmation immédiate sont consignés. Publier, modifier
un site en production, collecter des données personnelles, envoyer des
messages ou modifier l’analytique relève de `R2` ou plus et exige un passage
séparé par Task Protocol ou Workflow Orchestrator avec cible, périmètre,
responsable et confirmation. Gardez les informations personnelles hors du
contexte sauf nécessité et autorisation; ne copiez pas de dossiers client bruts
simplement parce qu’ils ont été fournis.

## Arrêts impératifs

Arrêtez-vous avec `blocked` si l’identité du produit, le responsable de la
décision, l’emplacement canonique, la provenance des preuves, la limite de
confidentialité, la référence de version, l’état de la cible, la sauvegarde, le
retour arrière ou la confirmation d’écriture est incertain. Arrêtez-vous aussi
si le changement écraserait une décision non revue, exposerait des PII ou
dépasserait le périmètre de champs demandé. Ne transformez jamais une
hypothèse en preuve, un brouillon en affirmation client ou une mise à jour de
contexte en permission de publier.

## Sortie fixe

Retournez exactement :

1. `context_scope_and_owner`
2. `authoritative_version_and_location`
3. `observed_facts`
4. `hypotheses_and_unknowns`
5. `audience_and_jobs`
6. `positioning_and_message_constraints`
7. `proof_points_and_evidence_gaps`
8. `changelog_entry`
9. `downstream_handoff`
10. `design_handoff`
11. `risk_and_permissions` — inclure `risk`, `action_state` (`draft_only`,
    `write_blocked`, `write_confirmed` ou `handoff_required`), la cible exacte,
    la décision de confidentialité, le responsable, la confirmation, la
    sauvegarde/le retour arrière et les conditions d’arrêt
12. `content_status`

## Correspondance entre preuves et statuts

Étiquetez chaque énoncé `observed`, `attributed`, `hypothesis`, `decision` ou
`unknown`. Vérifiez une proposition de contexte en contrôlant chaque affirmation
matérielle avec sa source citée, en comparant les champs proposés à la
référence actuelle, en vérifiant la classification de confidentialité et le
périmètre modifié, et en confirmant que le responsable peut examiner la diff.
Cela vérifie la proposition, pas l’impact client ni l’exécution en aval. Utilisez
`draft` avant la revue des sources et du responsable, `candidate` lorsqu’un
contexte versionné existe mais que les contrôles récents manquent, `verified`
lorsque les preuves déclarées et la revue du responsable réussissent, et
`production-ready` seulement après les contrôles de confidentialité, de
publication, de maintenance et de retour arrière. La vérification du contexte
ne vérifie pas les affirmations en aval.

## Fiche de maintenance

- `source` : `docs/charter.md` ; `CONTEXT.md` ;
  `docs/quality/skill-quality-standard.md`
- `license` : réécriture originale; les données client ou contenus externes
  fournis restent régis par leur autorisation de source
- `owner` : product-context maintainer
- `version` : `0.3.0`
- `review_date` : `2026-09-09`
- `content_status` : `candidate`
