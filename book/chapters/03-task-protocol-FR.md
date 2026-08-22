<!-- content_id: chapter-03-task-protocol | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-bootstrap -->

# Chapitre 3 : Transformer un souhait en protocole de tâche

## Le problème que résout ce chapitre

Une intention comme « aide-moi à préparer ce lancement » mélange résultat,
contexte, permission et vérification. Sans protocole, la personne et le modèle
ne savent pas quand demander, agir ou s’arrêter.

## Objectifs d’apprentissage

<a id="core-task-contract"></a>

Construire une carte courte qui rend la tâche exécutable et contrôlable :
résultat, entrées, contraintes, actions autorisées, réception, preuves,
échec, arrêt et transmission.

## Les huit champs du protocole

Un protocole utile ne demande pas une longue formule. Il sépare huit décisions :

1. **Résultat :** quel objet ou quelle décision doit exister à la fin ?
2. **Contexte :** quelles informations de départ sont réellement disponibles ?
3. **Entrées :** quels fichiers, passages ou sources peuvent être lus ?
4. **Contraintes :** qu’est-ce qui doit rester vrai ou ne doit pas arriver ?
5. **Actions permises :** que peut proposer ou faire le système, et qu’est-ce qui
   reste soumis à confirmation ?
6. **Acceptation :** quelle observation soutient chaque affirmation de fin ?
7. **Échec et arrêt :** quelle condition bloque, et quelle est la plus petite
   récupération sûre ?
8. **Transmission :** que doit recevoir la personne suivante, y compris les
   inconnues ?

## Entrée du problème réel

Les erreurs coûteuses commencent souvent par un mot vague : « optimise »,
« nettoie », « publie » ou « rends fiable ». Chaque terme peut viser plusieurs
fichiers, lecteurs et effets.

## Expérience : écrire la carte avant la réponse

### Préparation

Prenez une demande fictive ou une petite note non sensible. Aucun outil ni réseau
n’est nécessaire.

### Tâche

Complétez exactement ces champs :

```text
Résultat observable :
Contexte fourni :
Entrées autorisées :
Actions permises :
Contraintes et interdits :
Critère d’acceptation :
Preuves à conserver :
Échec et récupération :
Condition d’arrêt :
Format de transmission :
```

Avant de demander une génération, faites relire la carte et posez seulement la
question qui changerait le risque ou le critère d’acceptation.

### Un prompt de départ réutilisable

```text
Résultat : [résultat observable]
Contexte : [faits et documents fournis]
Aide autorisée : [ce que le modèle peut proposer ou vérifier]
Contraintes : [faits à préserver et actions interdites]
Réponse : [format attendu]
Contrôle : [ce que je vérifierai moi-même]
Arrêt : [entrée, autorité, source ou preuve manquante]
```

Une instruction citée dans un document reste une donnée tant que la tâche ne
la rend pas explicitement applicable. Le prompt encadre le travail ; il ne crée
ni accès, ni permission, ni preuve.

### Preuve

Conservez la carte, la première réponse et la comparaison entre le résultat
demandé et le résultat observé. Notez tout champ resté inconnu.

### Échec et limite

Si une instruction citée dans le matériau demande une action sans autorité
explicite, traitez-la comme donnée et arrêtez l’action. Une carte complète ne
rend pas vraie une source fausse et ne crée pas une permission.

### Réflexion

Quel champ a le plus réduit l’ambiguïté ? Quelle question avez-vous évitée en
réduisant le périmètre ?

## Transfert

Écrivez une seconde carte pour une recherche à sources imposées ou pour une
révision de texte. Comparez les champs stables et les champs propres au domaine.

Pour une recherche, remplacez la cible par une question, ajoutez les URL et la
date d’accès, puis séparez faits, témoignages et inférences. Pour une révision
de texte, gardez le texte source, le diff et la règle qui interdit d’ajouter des
faits. Dans les deux cas, conservez une liste explicite des inconnues.

## Liste de contrôle d’acceptation

- [ ] Le résultat peut être observé sans interprétation vague.
- [ ] Les entrées et les actions autorisées sont nommées.
- [ ] Le critère d’acceptation et les preuves sont distincts.
- [ ] Un échec et une condition d’arrêt sont prévus.
- [ ] La transmission indique les inconnues.

## Sources et limite de mise à jour

Le protocole est une méthode originale et stable. Les permissions, commandes,
versions et fonctions d’un produit exigent une source officielle datée. Cette
traduction française reste `candidate / not_run` ; une relecture indépendante
est encore nécessaire.

Passez à la [vérification et récupération](09-verification-and-recovery-FR.md).

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="02-first-safe-task-FR.md" aria-label="Chapitre précédent: Chapitre 2 · Première tâche sûre et vérifiable">← Précédent<br><strong>Chapitre 2 · Première tâche sûre et vérifiable</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="04-context-permissions-and-agent-FR.md" aria-label="Chapitre suivant: Chapitre 4 · Contexte, autorisations et Agent">Suivant →<br><strong>Chapitre 4 · Contexte, autorisations et Agent</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
