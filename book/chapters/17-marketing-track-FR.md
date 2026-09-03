<!-- content_id: chapter-17-marketing-track | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-22-fr-deepening -->

# Chapitre 17 : Parcours marketing — du contexte produit aux expériences de croissance

## Le problème que résout ce chapitre

Le marketing devient flou quand la demande ne précise ni le produit, ni le
public, ni le positionnement, ni la preuve, ni l’action attendue. Il devient
risqué quand l’équipe collecte un grand flux d’événements ou fabrique un beau
tableau de bord avant de savoir quelle décision les données doivent changer.
Le risque augmente encore si un Skill apporte des données personnelles, une
liste de clients, des permissions d’organisation ou un accès de publication
dont l’expérience n’a pas besoin.

Ce chapitre traite le marketing comme un système de décision que l’on peut
relire : versionner le contexte produit, poser une hypothèse, choisir la
mesure minimale, puis produire un contenu ou une action en respectant la
confidentialité, la taille d’échantillon et l’incertitude de l’attribution.

## Objectifs d’apprentissage

À la fin de ce chapitre, vous devriez pouvoir :

1. créer un contexte produit couvrant produit, public, problème, alternatives,
   différence, objections, langage client, ton, preuves et action attendue ;
2. partir d’une décision pour définir les événements, métriques, dénominateur,
   échantillon, fenêtre, nommage et règle d’arrêt minimaux ;
3. repérer biais d’échantillonnage, sur-attribution, sélection des résultats,
   risques de confidentialité et incertitude de conclusion ;
4. concevoir une expérience avec un Skill marketing sans exposer de données
   personnelles, contourner une permission ou publier automatiquement.

## Entrée réelle : identité, organisation et données ont besoin d’un contexte

- **FP-03 :** un utilisateur réservé à une instance Enterprise aurait été
  interrogé sur `github.com` alors que l’entrée pertinente était un hôte
  Enterprise. Cela rappelle qu’un hôte par défaut ou un public par défaut ne
  constitue pas un fait sur l’utilisateur.
- **FP-04 :** un connecteur aurait réutilisé la première organisation parmi deux
  organisations accessibles au même utilisateur. L’accès au compte ne vaut pas
  autorisation d’utiliser les données d’une organisation pour cette expérience.

Ce sont des rapports d’utilisateurs issus d’une étude de terrain, pas des
confirmations officielles ni des reproductions locales. Ils servent à exercer
la distinction entre identité, organisation, périmètre d’installation et
données autorisées ; ils ne constituent pas une règle universelle.

## Concepts et décisions de base

### 1. Le contexte produit est un artefact partagé et versionné

Un contexte produit rend les hypothèses visibles et révisables. Enregistrez au
minimum :

~~~text
Produit et version ; objectifs explicitement exclus :
Public cible et public exclu :
Problème central et situation d’usage :
Alternatives et coût de changement :
Promesses différenciantes et preuves disponibles :
Objections courantes et langage client anonymisé :
Voix de marque, formulations interdites, limites de conformité :
Action attendue et prérequis :
Canal, région, langue et période :
Version, raison du changement, propriétaire et date de revue :
~~~

### Contexte produit synthétique : fixture d’entraînement, pas un dossier client

L’exercice utilise un contexte inventé. Il ne décrit ni une vraie entreprise, ni
des clients, ni un stock, ni un prix, ni un taux de conversion, ni un
témoignage ou résultat de campagne.

~~~yaml
context_id: synthetic-product-context-v1
product: "Espace local de planification pour petites équipes"
audience: "Personnes qui coordonnent un petit projet dans une liste partagée"
non_goals: ["Aucune part de marché", "Aucun résultat client"]
problem: "Les décisions se perdent entre réunions et mises à jour de tâches"
alternative: "Document partagé et rappels manuels"
proof: "Aucune preuve client fournie ; les promesses restent des hypothèses"
objections: ["Temps de prise en main", "Accès aux données", "Outil supplémentaire"]
desired_action: "Examiner un espace de travail d’exemple en local"
data_boundary: "Données synthétiques ; aucun nom, e-mail, IP ou identifiant externe"
status: candidate
~~~

La fixture sert à montrer les champs et leurs limites. Une phrase sans preuve
reste une hypothèse, doit être adoucie ou doit disparaître.

### 2. Mesurer pour une décision

Écrivez la décision avant de choisir les données :

~~~text
Décision à prendre :
Hypothèse principale :
Question minimale à trancher :
Définition de la métrique et nom de l’événement :
Dénominateur, échantillon, période et segments :
Déduplication, valeurs manquantes et délais :
Consentement, confidentialité, conservation et accès :
Règle d’arrêt et prochaine action :
~~~

« La variante B a un meilleur taux de clic » n’est pas vérifiable sans condition
d’exposition, dénominateur, règle de déduplication, population, période et
prochaine action. Ne faites pas des adresses complètes, des IP entières, des
transcriptions ou des identifiants intersites l’entrée par défaut. Préférez des
données de test, agrégées, désidentifiées et conservées peu de temps.

### 3. L’Agent aide le jugement ; il ne possède pas l’attribution

Un Agent peut organiser le contexte, proposer des variantes, inspecter des noms
d’événements, calculer des statistiques descriptives et suggérer le prochain
essai. Il ne peut pas déduire une causalité d’une différence de texte, cacher un
biais dans un graphique ni publier dans une régie publicitaire, un CRM, un
service d’e-mail ou un réseau social sans action séparément autorisée et
révisable. Une écriture externe exige un compte de test ou une sandbox, une
approbation humaine, un identifiant de lot et un retrait ou rollback possible.

### 4. Regrouper les capacités selon la décision

| Groupe | Sortie typique | Limite à inscrire |
|---|---|---|
| Contexte produit | Contexte versionné et registre de claims | Faits, hypothèses, propriétaire, revue |
| Contenu et positionnement | Variantes liées au public et aux objections | Preuves, ton, promesses interdites |
| Expérience de conversion | Hypothèse, exposition et arrêt | Échantillon, dénominateur, consentement, période |
| Distribution et croissance | Brouillon ou lot en sandbox | Canal, approbation, retrait |
| Mesure et attribution | Rapport agrégé et limites | Schéma d’événements, qualité, limites causales |

### 5. Un même cycle de preuve pour apprendre et expérimenter

Un prototype n’est pas un produit et une page soignée ne prouve pas une demande.
Utilisez la boucle suivante :

~~~text
problème observé → utilisateur et contexte décrits → plus petite tranche testable
→ essai réalisé → sortie et friction enregistrées
→ une hypothèse modifiée → prochaine décision ou arrêt
~~~

Pour apprendre à programmer, commencez par une tâche inspectable : expliquer une
fonction, changer un état visible, ajouter un test ciblé ou réparer un échec
connu. Demandez à l’apprenant de prédire le résultat, gardez sa première
tentative et retestez une entrée modifiée. Le modèle peut expliquer ou donner
un indice ; il ne doit pas remplacer la preuve que l’apprenant sait effectuer
la modification.

Pour une expérience produit, écrivez la décision avant le discours :

~~~text
Problème : quelle situation répétée est pénible, et que fait-on aujourd’hui ?
Promesse minimale : quel résultat le prototype rend-il visible ?
Prototype : quelle page, procédure ou prestation minimale ?
Signal : quelle action observable changerait la prochaine décision ?
Explication alternative : qu’est-ce qui produirait aussi ce signal ?
Coût et limite : temps, données, permissions, droits et personnes contactées :
Règle d’arrêt : quand supprimer, réviser ou suspendre l’expérience ?
~~~

« Les gens ont aimé la démo », « la page a reçu des clics » ou « le modèle a
créé l’application » sont des observations. Il faut un dénominateur, une
comparaison, un public, une période et une fiche de revue avant d’en tirer
quelque chose. Elles ne prouvent ni volonté de payer, ni adéquation produit-
marché, ni revenus récurrents, ni apprentissage. La monétisation reste une
hypothèse d’échange autorisé : pilote payant, abonnement, achat ponctuel ou
service. Avant d’accepter de l’argent, vérifiez offre, remboursement, support,
fiscalité, confidentialité, droits et capacité de livraison avec le responsable
humain compétent.

Conservez un reçu court : problème versionné, prototype ou script, public et
recrutement autorisés, actions observées, exclusions, coûts, objections,
décision et inconnues. Une maquette générée ou une réponse non notée garde le
statut `candidate` ; elle appelle un test plus petit, pas une promesse plus large.

## Tableau d’éléments de preuve

| Élément | Artefact | Ce que cela soutient | Ce que cela ne soutient pas |
|---|---|---|---|
| Contexte produit | `synthetic-product-context-v1`, raison et propriétaire | Claims et public employés dans l’exercice | Clients ou résultats réels |
| Registre de claims | Lignes `fact`, `hypothesis`, `unverified`, `not applicable` | Statut déclaré de chaque phrase | Preuve d’une ligne `unverified` |
| Plan de mesure | Définition, dénominateur, période, échantillon, arrêt | Reproductibilité du plan | Significativité ou causalité à elle seule |
| Dictionnaire de données | Champs agrégés, conservation, accès, règle des manquants | Ce qui est entré dans l’analyse | Permission de collecter d’autres données personnelles |
| Fiche de variante | Entrées, texte, version, relecteur | Ce qui a été comparé | Que la variante a causé un résultat |
| Fiche de distribution | Brouillon/sandbox, lot, approbation, retrait | Action contrôlée préparée | Qu’un envoi public a eu lieu |

## Petite expérience observable : deux demandes pour le même produit synthétique

### Préparation

Utilisez la fixture ci-dessus, une description expurgée, trois objections
synthétiques, aucun témoignage, stock ou chiffre de performance. Créez une
table locale de simples comptages, sans nom, e-mail, IP entière, appareil ou
identifiant intersite. Choisissez une courte période et deux variantes, sans
prétendre qu’elles ont été diffusées.

### Tâche

1. Demandez A : « Rédige une introduction soignée pour ce produit » et gardez la
   sortie.
2. Demandez B avec le contexte versionné, public, objections, preuve manquante,
   action et plan de mesure ; exigez deux variantes, l’hypothèse, la métrique,
   le dénominateur, la limite d’échantillon et la prochaine décision.
3. Comparez A et B pour précision, public, statut de preuve et actionnabilité ;
   marquez chaque claim sans support.
4. Demandez une inspection des événements, déduplications, valeurs manquantes,
   périodes et limites de confidentialité. N’envoyez rien à un canal réel.
5. Si vous utilisez des comptages, présentez-les comme fixture descriptive ; ne
   déclarez ni causalité ni vainqueur avec un échantillon insuffisant.

### Preuve

Gardez les deux demandes, la version du contexte, les variantes, le tableau
d’hypothèses, les définitions, les notes de dénominateur et d’échantillon, le
dictionnaire désidentifié, les décisions de confidentialité, les contrôles de
qualité et la prochaine décision. Chaque phrase doit être étiquetée fait,
hypothèse ou claim non vérifié.

### Variante d’échec

Fournissez un canal simulé dont l’hôte par défaut est `github.com` alors que
l’exercice n’autorise qu’un hôte Enterprise. Ajoutez ensuite des agrégats de
deux organisations alors qu’une seule est autorisée. Le bon comportement est de
s’arrêter, confirmer hôte, organisation et périmètre, puis d’utiliser la plus
petite donnée autorisée ou synthétique. Donnez enfin un petit échantillon avec
une grande différence apparente : l’Agent doit signaler la limite et le caractère
observationnel du résultat.

### Réflexion

- Quels champs ont rendu B plus précis que A ?
- Quelle métrique changerait réellement la prochaine décision ?
- Quels champs pourraient être agrégés ou supprimés sans perdre la réponse ?
- Comment FP-03 et FP-04 changent-ils vos hypothèses sur hôte, organisation,
  public et accès aux données ?

## Échecs et limites fréquents

- **Preuve ou langage client inventé :** transformer un témoignage ou chiffre
  absent en hypothèse, l’adoucir ou le retirer.
- **Petit échantillon déclaré gagnant :** conserver taille, dénominateur, période,
  segments et manquants ; si le jugement n’est pas stable, dire « signal
  directionnel » ou continuer.
- **Corrélation écrite comme causalité :** isoler une variable ou qualifier le
  résultat d’observation.
- **Permissions de plateforme incohérentes :** vérifier hôte, organisation,
  installation et autorisation de l’expérience ; l’accès du compte ne suffit pas.
- **Excès de données personnelles :** minimiser, agréger, contrôler l’accès et
  définir une durée de conservation.
- **Publication sans retrait :** brouillon/sandbox, approbation humaine, lot et
  méthode de retrait avant tout envoi.
- **Graphique qui masque des données faibles :** vérifier doublons, fuseaux,
  délais, bots, dénominateur, manquants et sélection des canaux.

## Transfert

Choisissez une décision marketing réelle, mais utilisez uniquement des données
expurgées ou agrégées :

1. rédigez un contexte et marquez faits, hypothèses et claims à prouver ;
2. choisissez une décision qui pourrait changer, sa mesure minimale et son arrêt ;
3. inscrivez la raison de confidentialité, l’accès, la conservation et la
   suppression pour chaque champ ;
4. concevez une sandbox et une variante d’échec qui teste hôte, organisation et
   autorisation de publication.

## Liste d’acceptation

- [ ] Le contexte produit est versionné, possède un propriétaire, une raison et
      une date de revue.
- [ ] Je distingue faits produit, hypothèses marketing, preuves clients et
      claims non vérifiés.
- [ ] Je peux dériver métrique, dénominateur, échantillon, période et arrêt d’une
      décision.
- [ ] J’ai vérifié doublons, manquants, délais, fuseau, bots et biais de sélection
      lorsque c’est pertinent.
- [ ] Je n’ai pas transformé corrélation en causalité ni déclaré un gagnant stable
      à partir d’un petit échantillon.
- [ ] J’ai minimisé ou agrégé les données, limité l’accès et défini la conservation.
- [ ] Je peux expliquer hôte, organisation, connecteur et autorisation de
      l’expérience pour FP-03/FP-04.
- [ ] Je n’ai pas publié ni écrit dans un service externe sans approbation, preuve
      de sandbox et retrait.
- [ ] Je peux montrer un artefact de preuve pour chaque claim important.

## Sources et limite de mise à jour

- **Rapports de terrain :** [`docs/research/field-problems-codex.md`](../evidence-library-FR.md#source-notes),
  FP-03 et FP-04. Dossier `candidate`, organisé le 2026-08-09 par la maintenance
  Prysai ; pas une reproduction locale.
- **Référence de méthode marketing :** [`docs/sources/asset-register.md`](../evidence-library-FR.md#source-notes),
  S04. Cette synthèse est originale ; elle ne copie pas un Skill marketing externe.
- **Faits de plateforme et confidentialité :** utiliser la documentation
  officielle, la politique d’organisation et la configuration actuelle, avec
  URL, date, région, propriétaire et conservation dans le reçu.
- **Responsable :** maintenance marketing ; revue quand positionnement, canal,
  permission, confidentialité, schéma d’événement ou attribution changent, et au
  plus tard le 2026-11-09.

Le chapitre reste `candidate`. Une conclusion marketing ne peut devenir
`verified` qu’avec preuves de qualité de données, confidentialité et revue
humaine. Ce chapitre ne fournit aucun client, stock, taux de conversion ou
résultat de campagne.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="16-engineering-track-FR.md" aria-label="Chapitre précédent: Chapitre 16 · Ingénierie fiable">← Précédent<br><strong>Chapitre 16 · Ingénierie fiable</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="18-content-design-data-automation-FR.md" aria-label="Chapitre suivant: Chapitre 18 · Contenu, design, données">Suivant →<br><strong>Chapitre 18 · Contenu, design, données</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
