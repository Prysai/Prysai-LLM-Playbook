<!-- content_id: lab-015-evidence-delivery | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: 2026-08-22-fr-depth-repair -->
---
id: lab-015-evidence-delivery
title: "Livrer des preuves, pas une phrase de fin"
level: L5
domain: general
goal: "Décomposer les affirmations de livraison et choisir le plus petit contrôle suivant"
setup: "Une modification de texte, un contrôle présent, un contrôle manquant et une transmission expurgée"
task: "Créer une ligne de preuve par affirmation, avec portée, observation, sortie, statut et prochain contrôle"
evidence:
  - "La table affirmation → preuve, les sorties brutes et le diff"
  - "Les chemins, répertoires et codes de sortie conservés"
  - "La revue qui distingue vérifié, partiel, non vérifié, bloqué et non exécuté"
failure_variant: "Garder le nom d’une commande mais supprimer sa sortie, ou élargir une affirmation au-delà de sa portée"
reflection: "Quelle affirmation dépassait sa preuve, et quel plus petit contrôle pourrait fermer l’écart ?"
status: draft
last_verified: "not run"
transfer_task: "Appliquer la table à un site statique en séparant source, artefact, rendu, capture et accessibilité publique"
transfer_domain: "publication, ingénierie, recherche ou documentation"
transfer_evidence: "Une ligne par affirmation, portée, commande ou observation, sortie, statut et limitation"
transfer_limitations: "Un contrôle de source ne prouve ni le rendu visuel, ni l’acceptation utilisateur, ni l’accessibilité de l’URL publique"
---

# Lab 015 : Livrer des preuves, pas une phrase de fin

**Statut :** `draft` · **Exécution :** `not_run`

## Objectif

Une phrase comme « c’est terminé » mélange souvent plusieurs affirmations :
le fichier serait présent, le contrôle aurait passé, le site serait rendu et la
livraison serait publique. Le but est de séparer ces affirmations, d’attacher à
chacune la preuve disponible et de choisir le plus petit contrôle suivant. Une
commande écrite sans son résultat n’est pas un résultat.

## Préparation

Travaillez dans un répertoire temporaire avec une petite modification de texte,
un contrôle ciblé réellement disponible et un contrôle volontairement manquant.
Préparez une transmission expurgée contenant au moins :

- une affirmation sur la source ;
- une affirmation sur un contrôle ;
- une affirmation sur le rendu, l’effet utilisateur ou la publication.

N’utilisez ni service réel, ni donnée personnelle, ni secret. Notez le chemin de
travail et la portée autorisée avant de commencer.

## Tâche

Pour chaque affirmation, remplissez une ligne complète. Conservez le vocabulaire
de statut en anglais dans les registres afin qu’il reste interopérable, puis
expliquez-le en français à la première occurrence :

```text
claim_id:
claim:
scope:
command_or_observation:
working_directory:
exit_code_or_result:
saved_output:
status: verified | partial | unverified | blocked | not_run
smallest_next_check:
stop_condition:
limitation:
```

`verified` signifie que la preuve couvre l’affirmation dans sa portée ; `partial`
qu’elle n’en couvre qu’une partie ; `unverified` qu’une preuve attendue manque ;
`blocked` qu’un contrôle autorisé ne pouvait pas être effectué ; `not_run` qu’il
n’a pas été lancé. Aucun statut ne doit être déduit d’une autre ligne.

Demandez ensuite à un second lecteur, ou à une session vierge, de contester toute
ligne dont la preuve est absente, plus large que sa portée ou seulement déduite
d’une autre ligne. Réduisez la phrase de livraison jusqu’à ce que chaque mot
soit soutenu.

## Preuve

Conservez la table, les sorties brutes, les chemins, le répertoire de travail,
les codes de sortie, le diff et la décision du second lecteur. La table doit
montrer pourquoi un contrôle de source ne prouve pas à lui seul le rendu visuel,
le comportement runtime, la disponibilité de l’URL ou l’acceptation par une
personne. Si une sortie est tronquée, indiquez-le et limitez la conclusion à ce
qui reste lisible.

## Variante d’échec : trois ruptures de preuve sous Windows

Utilisez les rapports publics cités au chapitre 9 uniquement comme cas de
référence. Ne cherchez pas à reproduire un problème d’un produit externe. Créez
plutôt des jeux de test locaux et inoffensifs :

1. produisez plus de texte que la fenêtre du terminal ne peut en afficher, puis
   enregistrez le même contenu dans un fichier ; comparez ce qui est durable à
   ce qui est visible ;
2. placez des caractères BMP et non-BMP dans une fixture ; comparez la chaîne
   prévue à la chaîne reçue avant tout appel conséquent ; marquez `blocked` si
   elles diffèrent ;
3. créez un dépôt Git temporaire avec un nom de fichier de test ordinaire et
   long seulement si le système de fichiers le permet ; notez la longueur, le
   résultat Git et le chemin exact. Ne touchez pas aux références internes de
   l’outil et ne modifiez pas la configuration du dépôt.

Ajoutez une ligne à la table pour chaque cas :

```text
reported_symptom:
local_fixture:
source_url:
local_reproduction: not_run | observed | blocked
last_confirmed_stage:
first_unknown_stage:
durable_evidence:
safe_next_check:
stop_condition:
```

Un jeu de test qui reproduit une frontière d’observation n’est pas une
reproduction du problème amont. Un contournement rapporté publiquement n’est
pas un correctif officiel. Si vous supprimez un artefact tout en gardant le nom
de la commande dans la transmission, rétrogradez la ligne en `unverified` ou
`not_run` ; ne la « décorez » pas.

## Réflexion

Quelle affirmation était plus large que sa preuve ? Quel contrôle minimal
fermerait réellement l’écart ? Quelle partie restera inconnue après ce contrôle ?

## Transfert

Appliquez la table à une page multilingue en distinguant : fichiers source
présents, artefact construit, rendu dans un navigateur, capture examinée, langue
de l’interface, liens testés et URL publique atteignable. Un fichier traduit ou
un build réussi ne prouve pas une lecture naturelle, une navigation complète ou
une validation par des locuteurs.

## Liste de contrôle d’acceptation

- [ ] Une ligne existe par affirmation importante.
- [ ] Chaque ligne indique portée, commande ou observation, répertoire et sortie.
- [ ] Les statuts `verified`, `partial`, `unverified`, `blocked` et `not_run` sont employés sans les confondre.
- [ ] Une sortie absente ou tronquée reste explicitement absente ou tronquée.
- [ ] Une réussite ultérieure ne réécrit pas un essai antérieur inconnu.
- [ ] Le prochain contrôle et la condition d’arrêt sont bornés.
- [ ] Un second lecteur a rejeté les affirmations trop larges.
- [ ] La transmission distingue source, contrôle, rendu, publication et acceptation utilisateur.

## Sources et limite de mise à jour

- [Problèmes de terrain et modèles de prompts — P2](../evidence-library-FR.md#source-notes), FP2-05, FP2-06 et FP2-20.
- [Chapitre 9 : vérifier, douter et récupérer](../chapters/09-verification-and-recovery-FR.md).

Ces sources soutiennent une discipline de preuve et des limites de rapport ;
elles ne prouvent pas une publication, un comportement runtime ou une
amélioration utilisateur. Le Lab reste `draft / not_run` jusqu’à une exécution
d’apprenant et une revue indépendante.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navigation entre les Labs">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-014-resume-reconciliation-FR.md" aria-label="Lab précédent : Lab 014 · Réconcilier une tâche avant de la reprendre">← Précédent<br><strong>Lab 014 · Réconcilier une tâche avant de la reprendre</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-016-side-effect-boundary-FR.md" aria-label="Lab suivant : Lab 016 · S’arrêter à la frontière d’un effet durable">Suivant →<br><strong>Lab 016 · S’arrêter à la frontière d’un effet durable</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
