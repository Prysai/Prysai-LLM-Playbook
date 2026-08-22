<!-- content_id: chapter-08-full-lifecycle-workflow | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

# Chapitre 8 : De la définition à la livraison

**Statut :** `candidate` · **Expérience :** `not_run`  
Ce chapitre décrit un flux de travail fondé sur des preuves. Le cas est pédagogique ; il ne
constitue pas le compte rendu d’une mise en production ou d’une session Codex
réelle.

## Le problème

Faire commencer une rédaction est facile. Terminer un résultat utile demande de
définir la cible, de travailler par petites tranches, de vérifier chaque sortie
et de livrer avec un état compréhensible par une autre personne.

## Objectifs d’apprentissage

- décrire une tâche comme une suite d’états observables ;
- choisir une première tranche verticale et récupérable ;
- distinguer erreur de l’outil, erreur de l’entrée et permission manquante ;
- remettre une livraison avec ses preuves et ses limites.

## Problèmes de terrain

Une livraison peut être proprement formulée tout en manquant de diff, de contrôle ou de preuve de l’état final. Le cycle doit rendre ces absences visibles avant la publication.

## 1. Les états du cycle

```text
définir → inspecter → planifier → agir → contrôler → relire → livrer
```

« Terminé » est une étiquette, pas une preuve. Chaque transition doit laisser
un résultat : contrat, état initial, diff, contrôle, revue ou décision d’arrêt.

## 2. Définir avant d’agir

Écrivez le résultat observable, les entrées autorisées, les contraintes, les
actions permises, le critère d’acceptation et la preuve à conserver. Les mots
« optimise » ou « rends professionnel » doivent être transformés en
observations concrètes.

## 3. Planifier une tranche verticale

Une tranche verticale traverse l’entrée, la transformation, le contrôle et la
présentation du résultat. Elle est petite, mais complète. Une liste de dix
fichiers sans preuve de bout en bout est moins informative qu’une seule tranche
qui peut être relue et annulée.

## 4. Travailler avec des points de contrôle

Avant chaque action, relisez la cible et l’autorité. Après chaque action,
observez l’état réel. Si un contrôle échoue, conservez l’échec avant de changer
le code ou le plan. Réessayez seulement après avoir modifié la condition qui a
causé l’échec.

## 5. Vérifier par couches

Séparez la présence du fichier, le diff, le contrôle ciblé, le rendu, la revue
humaine et l’état distant. Un test local passant ne prouve pas que la page
publique est accessible ; une page accessible ne prouve pas que son contenu est
correct.

## 6. Revoir indépendamment l’exécution

Une personne peut relire le résultat sans accepter le récit de l’Agent. Elle
compare la demande, les sources, les sorties et les limites. Toute affirmation
qui dépasse sa preuve est ramenée à `candidate`, `unknown` ou `not_run`.

## 7. Livrer et maintenir

Une livraison utile indique : ce qui a changé, ce qui a été contrôlé, où se
trouvent les preuves, ce qui n’a pas été exécuté et quel est le prochain contrôle
si l’état évolue. La prochaine personne doit pouvoir reprendre sans deviner.

## Expérience : deux plans pour un résultat

### Préparation

Prenez une correction de Markdown dans une copie jetable. Aucun secret, compte
ou push n’est nécessaire.

### Tâche

Écrivez un plan direct et un plan par tranches. Comparez les points de contrôle,
les possibilités de récupération et les preuves produites. Ne mesurez pas la
« productivité » à partir d’un seul exercice.

### Preuve

Conservez les deux plans, les points de contrôle et l’état observé au moment de l’interruption. La comparaison reste descriptive tant qu’elle n’est pas répétée.

### Échec et limite

Interrompez volontairement la tâche après l’inspection. Le bon résultat est un
état repris ou bloqué clairement, pas une relance qui pourrait dupliquer un effet.

### Réflexion

Quel point de contrôle a empêché le plus gros détour ? Quelle inconnue devait rester visible ?

## Transfert

Appliquez le cycle à une recherche, une révision de traduction ou un graphique.
Remplacez les contrôles techniques par les contrôles propres au domaine, sans
retirer la preuve de limite.

## Liste de contrôle d’acceptation

- [ ] Le résultat et la première tranche sont observables.
- [ ] Chaque action possède une autorité et un point de contrôle.
- [ ] Les échecs sont conservés avant toute nouvelle tentative.
- [ ] La livraison sépare fait, contrôle, inconnu et non exécuté.
- [ ] Une autre personne peut reprendre avec le dossier fourni.

## Sources et limite de mise à jour

Les commandes, surfaces et conditions de publication sont volatiles. Utilisez
les sources officielles datées du produit concerné. Cette traduction demeure
`in-progress / candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="07-skills-plugins-and-tools-FR.md" aria-label="Chapitre précédent: Chapitre 7 · Skills, Plugins, MCP et outils">← Précédent<br><strong>Chapitre 7 · Skills, Plugins, MCP et outils</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="09-verification-and-recovery-FR.md" aria-label="Chapitre suivant: Chapitre 9 · Vérification et récupération">Suivant →<br><strong>Chapitre 9 · Vérification et récupération</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
