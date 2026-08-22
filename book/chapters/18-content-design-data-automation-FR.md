<!-- content_id: chapter-18-content-design-data-automation | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-22-fr-content-automation-restoration -->

# Chapitre 18 : Contenu, design, données et automatisation

**Statut :** `candidate` · **Expérience :** `not_run`

L’existence d’un fichier, d’un script ou d’une connexion ne prouve pas que le
livrable est lisible, accessible, exact, autorisé ou publiable.

## Le problème que résout ce chapitre

Plus un workflow contient d’outils, plus il devient facile de confondre « le
fichier source existe », « le script a tourné » ou « l’API répond » avec un
livrable terminé. Les défauts les plus coûteux peuvent rester invisibles : mise
en page cassée, état vide incompréhensible, graphique trompeur, texte illisible,
licence absente, écriture dupliquée, fuite de données ou permission excessive.

La méthode est simple : définir la forme finale et son public, activer les
capacités par niveau de risque, puis inspecter le rendu, les entrées, les
sorties, les droits, la récupération et l’état de publication.

## Objectifs d’apprentissage

Vous devriez pouvoir :

- choisir des capacités selon le livrable et le risque, pas selon une marque ;
- écrire une acceptation observable pour document, site, image, présentation,
  feuille, PDF, données et automatisation ;
- inspecter hiérarchie, lisibilité, états vide/erreur, responsive, accessibilité,
  exactitude, licence et éditabilité dans la forme finale ;
- consigner schémas, transformations, appels externes, retries, idempotence,
  logs, permissions, confidentialité, validation et rollback.

## Entrée du problème réel : une étape intermédiaire n’est pas le livrable

Les rapports `FP-10` et `FP-11` montrent respectivement qu’une commande peut
rester en `Working` et qu’une vérification peut dériver vers un remplacement
persistant de l’environnement. Ce sont des rapports ou analyses, pas des
reproductions locales.

| Signal | Ce qu’il soutient | Ce qu’il ne soutient pas |
|---|---|---|
| Commande de formatage sans sortie | Aucun signal de fin n’est visible dans ce run | Qu’un résultat est produit ou contrôlé |
| Source vérifiée puis réinstallation proposée | Une proposition a franchi une frontière d’effet | Que l’installation est nécessaire ou autorisée |

Séparez toujours artefact intermédiaire, forme finale et état d’autorisation.

## 1. Organiser les capacités par livrable

| Livrable | Contrôles de forme finale | Risques typiques |
|---|---|---|
| Document/PDF | Pagination, sommaire, liens, polices, lisibilité, export | Reflow, police absente, citation ou licence erronée |
| Site | Rendu navigateur, responsive, interaction, états vide/erreur, clavier et mobile | Source correcte mais interface inutilisable ou hors périmètre |
| Image/vidéo | Dimensions, netteté, texte, droits, sous-titres/alt text, éditabilité | Fait faux, licence obscure, média inaccessible |
| Présentation | Taille de projection, hiérarchie, contraste, notes et ordre oral | Overflow, faible contraste, décalage avec le script |
| Tableur/rapport | Formules, filtres, unités, blancs, dénominateur, recalcul et export | Nombres déplacés, formules écrasées, unités ambiguës |
| Automatisation | Schéma, logs, retries, idempotence, permissions, rollback, validation | Écritures doublées, fuite, état partiel |

## 2. Partir de la forme finale

Les fichiers source, JSON, scripts et modèles sont des matériaux de production.
L’acceptation doit demander ce que le lecteur voit, s’il peut effectuer l’action,
si le contenu est exact, si les états vide/erreur sont compréhensibles et si la
sortie est accessible, éditable et réutilisable.

Rendez en PNG/PDF lorsque la mise en page compte, ouvrez le site dans un
navigateur, recalculez un tableur ou exécutez un flux avec un compte de test.
Un diff de source ne remplace jamais la preuve de forme finale.

## 3. Une automatisation doit être répétable et réversible

```text
Schéma d’entrée et exemple :
Champs sensibles et usage permis :
Transformations et versions :
Appels externes, cibles et permissions minimales :
Délai, retry, backoff et clé d’idempotence :
Logs, trace_id et catégories d’erreur :
Schéma de sortie et validation :
État partiel, compensation et rollback :
Point d’approbation humaine et condition d’arrêt :
```

« L’API a répondu » prouve la connectivité, pas le mapping, les doublons, la
complétude ou la correction en aval. Avant une écriture réelle, utilisez compte
de test, sandbox ou simulation locale et conservez hash d’entrée/sortie et batch ID.

## 4. Quatre niveaux de capacité

1. **Local, lecture seule, faible risque :** rédaction, parsing, contrôle statique
   et analyse hors ligne ;
2. **Travail réversible du projet :** génération de fichiers, branche ou rendu
   sans publication ;
3. **Connexion externe contrôlée :** compte de test, portée minimale,
   approbation humaine et logs auditables ;
4. **Écriture de production ou release publique :** autorisation explicite,
   revue vie privée/licence, aperçu, rollback et contrôle en ligne.

Monter d’un niveau exige raison, permissions, risques, preuves et récupération
nouveaux. Si le résultat n’en a pas besoin, n’activez pas ce niveau.

## 5. Relier chaque scène à un livrable

« Utiliser l’IA pour tout » n’est pas un parcours. Commencez par ce qu’une autre
personne doit lire, exécuter, décider ou approuver.

| Scène | Petit livrable initial | Contrôle humain |
|---|---|---|
| Écriture | Brouillon court à partir de faits fournis | Comparer chaque affirmation et marquer les absences |
| Recherche | Tableau affirmation/source/inconnue | Ouvrir les sources, vérifier portée/date, séparer fait et inférence |
| Web | Un état de page dans un navigateur local | Viewport, liens, console, diff et état d’échec |
| Données | Résumé reproductible sur fixture autorisée | Schéma, formules, unités, blancs et dénominateur |
| Image/présentation | Une page ou diapositive rendue pour un public nommé | Hiérarchie, texte, contraste, faits, attribution, éditabilité |
| PDF/document | Export avec ordre de lecture prévu | Rendu, pagination, liens, texte sélectionnable et exigences d’accès |
| Action navigateur/ordinateur | Dry-run ou brouillon avec cible exacte | Compte, destinataire, portée, effet et approbation avant envoi |
| Automatisation | Batch de test idempotent avec trace ID | État partiel, retries, permissions, logs et rollback |

Ce sont des patrons de méthode, pas des promesses sur un fournisseur ou un
client. Les faits produit vont dans un adaptateur daté ; le livrable et la preuve
restent la règle stable.

## 6. Carte de demande utilisable partout

```text
Livrable : que doit-il exister ou être décidé ?
Public et surface : qui le relit et où apparaît-il ?
Entrées : fichiers, faits, sources ou fixtures autorisés ?
Capacité : brouillon, transformer, inspecter, exécuter, connecter ou publier ?
Contraintes : faits à préserver, données exclues, format, délai et budget.
Acceptation : trois contrôles qu’une autre personne peut refaire.
Échec/récupération : qu’est-ce qui est incomplet et comment restaurer ?
Arrêt : quelle entrée, permission, source ou effet met la tâche en pause ?
```

Demandez d’abord une proposition ou un brouillon. Si la suite exige compte réel,
upload, envoi, publication, paiement, suppression ou installation persistante,
ouvrez une nouvelle carte et obtenez l’autorisation correspondante.

## Les dix premières minutes : rendre une demande vérifiable

Avant de choisir un outil, utilisez un brief fictif et un fichier local jetable :
« écrire une mise à jour d’une page sur trois inscriptions inventées ».

1. Notez lecteur, forme finale, faits fournis, données/actions interdites et
   critères d’acceptation.
2. Demandez :

   ```text
   Crée un [format] pour [lecteur] avec uniquement ces faits : [faits].
   N’invente ni nombres, ni sources, ni noms, ni résultats. Si une information
   manque, marque [manquant] et pose une seule question. Retourne un brouillon ;
   n’envoie, ne publie, ne te connecte et n’appelle aucun service externe.
   Contrôles : [trois observations].
   ```

3. Ouvrez le brouillon comme le lecteur : vérifiez chaque fait, marqueur
   `[manquant]`, ordre des titres et critères.
4. Gardez brief, prompt, sortie et trois lignes `passed / failed / unknown`.

Un brouillon propre ne prouve ni un prompt universel, ni un gain de vitesse, ni la
sûreté de production.

## Tableau concret de preuves

| Preuve | Artefact | Elle soutient | Elle ne soutient pas |
|---|---|---|---|
| Revue forme finale | PDF/PNG rendu, capture, tableur recalculé ou sortie contrôlée | Ce que le lecteur ou opérateur a vu | Que la source suffisait |
| Revue contenu/données | Sources, dictionnaire, contrôle formules et validation | Vérifications factuelles/structurelles | Qu’une belle sortie est exacte sans sources |
| Revue accès/éditabilité | Parcours clavier, alt text, sous-titres, texte sélectionnable, couches éditables | Exigences d’accès et de réutilisation testées | Accessibilité universelle |
| Contrat automatisation | Schémas, transformations, règles d’erreur | Forme des données et limite de validation | Que le service externe a compris le sens |
| Registre d’effet | Portée, compte de test, batch ID, trace, état brouillon | Ce qui était autorisé ou préparé | Qu’une release publique a eu lieu |
| Registre récupération | Clé d’idempotence, requête d’état, compensation ou rollback | Détection et réparation d’un partiel | Qu’un timeout signifie zéro écriture |

## Expérience : un groupe de capacités à la fois

### Préparation

Utilisez une description produit inventée, une petite fixture structurée
désidentifiée et un public fictif. Ajoutez données vides, colonne manquante,
valeur extrême et entrée malformée. Préparez quatre plans : document seul,
document+données, document+graphique, document+distribution externe.

### Tâche

Pour A–D, notez forme finale, entrées, sorties, permissions, effets et rollback.
Complétez A en inspectant pagination, titres, liens, faits et états vides ; ajoutez
B avec schéma, dénominateur et valeurs manquantes ; ajoutez C avec labels, unités,
contraste, police, mobile et impression ; n’ajoutez D qu’avec compte de test ou
endpoint brouillon. Ne publiez pas.

### Preuve

Conservez tableau A–D, rendus, dictionnaire et validation, réponses invalides,
logs, portée de permission, idempotence, retry, état sandbox et preuve d’absence
de release publique. Un script seul ne suffit pas.

### Échec et limite

Faites attendre un rendu au-delà du délai, simulez un timeout après une écriture,
ou donnez données vides/colonne absente. La réponse correcte est d’arrêter,
conserver batch/trace ID, interroger l’état d’un éventuel partiel, éviter le retry
non idempotent et marquer le livrable incomplet. Un état vide doit être lisible,
pas un graphique blanc ni un zéro inventé.

### Réflexion

Quel plan a exigé une permission externe en premier ? Quel défaut n’était visible
que dans le rendu final ? Après timeout, quelle preuve distinguerait doublon et
absence d’écriture ? Quelle preuve sépare connecté, brouillon, publié et vérifié
en ligne ?

## Échecs et frontières

- Source correcte mais rendu cassé : vérifier wrapping, overflow, polices, liens,
  recadrage, couleurs, impression et mobile.
- Belle sortie mais faits faux : confronter nombres, citations, marques et texte
  des médias aux sources ; ne pas publier une licence obscure.
- Sortie inaccessible ou non éditable : vérifier structure, alt text, clavier,
  contraste, captions, texte sélectionnable et couches éditables.
- Succès partiel : lire logs, batch IDs et état aval ; retry seulement avec clé
  idempotente ou compensation.
- Portée externe excessive : réduire, utiliser compte de test/endpoint brouillon
  et demander l’autorisation de publication séparément.
- Commande suspendue : appliquer délai, sortie attendue et relecture après arrêt.
- Vérification devenue changement persistant : séparer création, installation,
  publication, déploiement, restart et contrôle en ligne.

## Transfert

Choisissez un document, site, tableur, image ou automatisation existante. Écrivez
lecteur, format, action réussie, états vide/erreur et accès ; faites une revue de
forme finale ; complétez le contrat d’automatisation ; rejouez une entrée d’échec
dans un sandbox et classez le résultat `draft`, `candidate`, `verified` ou
`production-ready`.

## Liste de contrôle d’acceptation

- [ ] Je choisis une capacité par livrable et risque, pas par marque.
- [ ] Lecteur, forme finale, action réussie, état vide et état d’erreur sont définis.
- [ ] Je contrôle la forme rendue, pas seulement la source ou le code retour.
- [ ] Faits, droits/licence, accessibilité, lisibilité et éditabilité sont vérifiés.
- [ ] Schémas, transformations, appels, retries, idempotence, logs et validation sont enregistrés.
- [ ] J’utilise données synthétiques ou test, et je conserve permission, batch et rollback.
- [ ] Je peux expliquer l’effet de FP-10 et FP-11 sur un hang, un partiel ou un changement persistant.
- [ ] Je ne décris pas un brouillon, une connexion ou une commande démarrée comme release publique.
- [ ] Je peux pointer vers une preuve concrète de forme finale, données, permissions et récupération.

## Sources et limite de mise à jour

- **Rapports terrain :** [`field-problems-codex.md`](../../docs/research/field-problems-codex.md), FP-10 et FP-11 ; `candidate`, non reproduits localement.
- **Assets et licences :** [`asset-register.md`](../../docs/sources/asset-register.md), S01, S03 et S06 ; contenu sans licence claire = référence seulement.
- **Faits volatils :** documentation officielle de l’outil réellement utilisé ; noter URL, date, version et portée.

Le propriétaire est le mainteneur Contenu/Automatisation. Revoir après changement
de renderer, format, navigateur, API, licence ou modèle de permission, et au plus
tard le 2026-11-09. Cette traduction reste `in-progress / candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="17-marketing-track-FR.md" aria-label="Chapitre précédent : Chapitre 17 · Marketing et expériences">← Précédent<br><strong>Chapitre 17 · Marketing et expériences</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="19-evaluate-models-and-workflows-FR.md" aria-label="Chapitre suivant : Chapitre 19 · Évaluer modèles et workflows">Suivant →<br><strong>Chapitre 19 · Évaluer modèles et workflows</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
