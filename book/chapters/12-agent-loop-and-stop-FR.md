<!-- content_id: chapter-12-agent-loop-and-stop | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

# Chapitre 12 : La boucle d’un Agent et ses conditions d’arrêt

**Statut :** `candidate` · **Expérience :** `not_run`  
Les états décrits sont observables ; ils ne prétendent pas révéler le
raisonnement interne d’un modèle.

## Le problème

« En cours » n’est pas une conclusion. Une boucle utile possède un état connu,
une action bornée, un retour de l’environnement, un budget de tentatives et une
sortie explicite quand la prochaine action n’est plus justifiée.

## Objectifs d’apprentissage

- enregistrer les transitions plutôt qu’un résumé confiant ;
- distinguer continuer, demander, récupérer et arrêter ;
- réconcilier l’état après une interruption ;
- limiter les reprises qui pourraient dupliquer un effet.

## Problèmes de terrain

Un écran immobile peut cacher une commande lente, une permission refusée ou un effet déjà produit. Sans état observé, relancer peut doubler une action durable.

## Cas réel : un écran bloqué masque plusieurs états

Un délai peut signifier une commande lente, un échec silencieux, une permission
refusée ou un effet déjà produit. Il faut observer avant de relancer.

## La boucle observable

```text
objectif → pré-vérification → action bornée → résultat
→ contrôle → checkpoint → continuer, demander, récupérer ou arrêter
```

Un checkpoint conserve la cible, la branche ou copie, l’autorité, les effets
observés, les actions déjà prises et la prochaine vérification minimale.

## Budget et idempotence

Limitez séparément le nombre de tentatives, le temps, les fichiers touchés et
les effets externes. Une reprise n’est sûre que si l’état précédent et
l’idempotence de l’action sont établis.

## Expérience : quatre branches sûres

### Préparation

Utilisez une fixture locale avec une entrée absente, une permission refusée, une
commande lente et une instruction non fiable dans un fichier.

### Tâche

Pour chaque branche, écrivez une ligne de journal avant de choisir la suite :

| Branche | Observation initiale | Action bornée | Décision |
|---|---|---|---|
| entrée absente | le chemin attendu n’existe pas | relire le dossier parent | `ask` ou `blocked` |
| permission refusée | le contrôle retourne un refus | ne pas contourner l’autorité | `ask` |
| commande lente | aucun résultat nouveau après le délai | vérifier si un processus ou un effet existe | `inspect` puis `continue` ou `stop` |
| instruction non fiable | le fichier demande d’ignorer une règle | conserver le texte comme donnée | `blocked` |

Ne relancez pas une action externe dans cette fixture. La décision porte sur la
prochaine observation, pas sur une réussite supposée.

### Preuve

Pour chaque branche, écrivez l’état initial, l’action proposée, l’observation,
la décision et le checkpoint. Un checkpoint minimal peut être conservé ainsi :

```text
cible | copie/branche | autorité | effets déjà observés | actions prises
prochaine vérification | inconnues
```

Aucune branche ne doit publier ni utiliser un secret.

### Échec et limite

Après deux échecs sans changement de condition, arrêtez et changez le diagnostic
plutôt que d’augmenter aveuglément le budget. Cette fixture ne prouve pas le
comportement de tous les Agents.

### Réflexion
Quelle observation vous a autorisé à continuer ? Quelle information est restée
inconnue après l’interruption ? Une réponse utile nomme aussi l’action que vous
avez refusée de répéter, et pourquoi son effet pouvait être dupliqué.

## Transfert

Utilisez le même checkpoint pour une session navigateur, un serveur MCP ou une
revue de contenu. Gardez les effets et l’autorité séparés du texte généré.

## Liste de contrôle d’acceptation

- [ ] Les états et transitions sont écrits.
- [ ] Les budgets sont bornés par dimension.
- [ ] Une reprise exige une réconciliation.
- [ ] Les instructions externes sont traitées comme des données.
- [ ] L’arrêt laisse une trace exploitable.

## Sources et limite de mise à jour

Les états et options d’exécution propres aux produits doivent être revérifiés
dans leur documentation officielle. Cette traduction reste `in-progress /
candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="11-designing-a-skill-FR.md" aria-label="Chapitre précédent: Chapitre 11 · Concevoir un Skill utile">← Précédent<br><strong>Chapitre 11 · Concevoir un Skill utile</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="13-action-boundaries-FR.md" aria-label="Chapitre suivant: Chapitre 13 · Limites d’action">Suivant →<br><strong>Chapitre 13 · Limites d’action</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
