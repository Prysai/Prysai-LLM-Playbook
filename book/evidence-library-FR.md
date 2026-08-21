<!-- content_id: reader-evidence-library | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-bootstrap -->

# Bibliothèque des preuves et de la terminologie

Cette page garde le parcours d’apprentissage lisible tout en conservant ses
limites de preuve. Les pages du cours renvoient ici plutôt que vers un dossier
technique de recherche ou de gouvernance destiné aux mainteneurs.

Il s’agit d’un guide des preuves, pas d’un remplacement du document source. Une
note de source ne peut soutenir que la portée qu’elle énonce ; elle ne prouve ni
les résultats d’apprentissage, ni le comportement actuel d’un produit, ni la
qualité d’un modèle, ni une sécurité générale.

<a id="core-terms"></a>

## Termes essentiels

La distinction stable est la suivante : un **modèle** génère une sortie ; un
**outil** peut observer ou modifier un système externe ; un **Skill** est une
méthode réutilisable avec des entrées, des arrêts et des contrôles ; un
**Agent** est une boucle observable en plusieurs étapes ; une **preuve** est un
élément qu’une autre personne peut inspecter. Le nom d’une plateforme ne la rend
pas automatiquement équivalente à une autre.

Pour la terminologie maintenue complète, utilisez l’identifiant de source
`CONTEXT.md`. Les noms de produits, menus, valeurs par défaut, prix, limites et
permissions sont des faits susceptibles de changer : ils nécessitent une
source officielle datée avant d’être utilisés.

<a id="source-notes"></a>

## Notes de source

Le cours utilise quatre types de preuves. Lisez l’étiquette avant de vous y fier :

| Étiquette | Ce qu’elle peut soutenir | Ce qu’elle ne peut pas soutenir |
|---|---|---|
| Référence officielle | Un fait produit daté, dans sa portée déclarée | Une promesse pour tous les comptes ou toutes les versions futures |
| Rapport public de terrain | Un problème signalé ou un contournement rapporté | Une cause confirmée ou une reproduction locale |
| Scénario fixe | Un contrat local et limité | Le comportement d’un modèle, d’un apprenant ou d’un système de production |
| Méthode du projet | Une procédure proposée et sa limite déclarée | Une efficacité ou une adoption indépendamment démontrée |

Les identifiants techniques comprennent `openai-codex-baseline.md`,
`field-problems-codex.md`, `prompt-patterns-for-real-work-2026-08-10.md` et
`llm-mechanism-deep-dive-2026-08-10.md`. Ce sont des fiches de preuve
maintenues, pas des chapitres supplémentaires.

<a id="method-and-status"></a>

## Méthode et statut

La boucle de travail durable est : définir la tâche → ne sélectionner que le
contexte nécessaire → fixer une frontière d’action → effectuer la plus petite
action réversible → inspecter les preuves → récupérer ou transmettre. Un
contrôle vert ne valide que le contrat de ce contrôle.

`draft` signifie que le contenu ou la preuve est inachevé. `candidate` signifie
que la structure et les contrôles de base existent, mais que l’affirmation
déclarée manque encore de preuves récentes suffisantes. `verified` et
`production-ready` exigent les preuves plus fortes nommées dans les documents
techniques de publication du projet.

## Utiliser une source sans se perdre

1. Énoncez la décision que vous devez prendre.
2. Lisez l’étiquette et la date de la source.
3. Notez le fait, le rapport ou l’inconnue exacte que vous avez utilisés.
4. Arrêtez-vous lorsque la décision exige une observation en direct ou une nouvelle autorité.

Retournez à votre chapitre après avoir enregistré le résultat. Ne transformez
pas une ancienne note de source en fait produit actuel sans revérifier la source
primaire.
