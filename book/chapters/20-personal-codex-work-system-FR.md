<!-- content_id: chapter-20-personal-codex-work-system | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-21-fr-course-slice -->

# Chapitre 20 : Construire son système de travail avec Codex

**Statut :** `candidate` · **Expérience :** `not_run`
Ne présumez pas qu’une fonction de mémoire existe, sauvegarde automatiquement
un contenu ou est disponible dans chaque compte.

## Le problème

Sans paquet de continuité, il faut réexpliquer le projet à chaque session. On
réutilise alors des décisions obsolètes et des commandes sans vérifier leur
contexte. Un carnet pratique ne doit jamais contenir de secret.

## Objectifs d’apprentissage

- distinguer contexte, protocole, Skill, preuve et journal ;
- assembler un paquet de reprise minimal ;
- versionner les décisions et leur date de révision ;
- reprendre après interruption sans supposer l’état distant.

## Problèmes de terrain

Un fichier local explicitement conservé est contrôlable ; une promesse de
mémoire implicite ne l’est pas. Écrivez la source et la portée de chaque fait.

## Le kit de continuité

```text
objectif et portée · contexte versionné · décisions · commandes datées
état observé · preuves · inconnues · prochaine vérification
```

## Expérience : une reprise contrôlée

### Préparation

Créez une copie temporaire contenant seulement un objectif, deux fichiers
fictifs et un journal. Fixez un identifiant de checkpoint et notez la branche,
les permissions prévues, l’heure et la dernière observation. N’utilisez ni
compte réel, ni cookie, ni secret, ni fonction de mémoire supposée.

### Tâche

Créez une copie jetable avec deux fichiers et un checkpoint. Modifiez un champ,
interrompez la session, puis vérifiez cible, branche, permissions, fichiers
modifiés et effets possibles avant de continuer. Demandez au modèle de résumer
uniquement ce qui est écrit dans le checkpoint ; complétez vous-même les
inconnues.

### Preuve

Le checkpoint doit rester lisible par une autre personne :

```text
objectif et périmètre :
version, branche et dernière observation :
fichiers et diff connus :
permissions et effets autorisés :
preuves conservées :
inconnues (ne pas deviner) :
prochaine vérification et point de retour :
```

Conservez l’ancien checkpoint et le nouveau. Un état distant non observé reste
`unknown`, même si le résumé paraît cohérent.

### Échec et limite

Conservez l’ancien et le nouveau checkpoint. Un état distant inconnu doit rester
`unknown`. La fixture ne prouve pas la continuité d’un compte réel.

### Réflexion

- Quelle information a permis de reprendre sans refaire tout le travail ?
- Quel champ aurait été dangereux à compléter par supposition ?
- Quelle observation manque encore avant une action durable ?
- Que faudrait-il retirer du paquet pour éviter d’y conserver une donnée sensible ?

## Transfert

Quelle information était réellement réutilisable ? Transférez le kit à une
recherche ou une revue de contenu sans données personnelles.

## Liste de contrôle d’acceptation

- [ ] Aucun secret, cookie ou donnée client n’est conservé.
- [ ] Chaque décision possède une source et une date.
- [ ] La reprise commence par une observation.
- [ ] Les inconnues ne sont pas transformées en faits.
- [ ] Le prochain contrôle est explicite.

## Sources et limite de mise à jour

Les fonctions de mémoire et les surfaces Codex changent. Vérifiez la
documentation officielle. Traduction `in-progress / candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="19-evaluate-models-and-workflows-FR.md" aria-label="Chapitre précédent: Chapitre 19 · Évaluer modèles et workflows">← Précédent<br><strong>Chapitre 19 · Évaluer modèles et workflows</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="21-team-capability-system-FR.md" aria-label="Chapitre suivant: Chapitre 21 · Capacité d’équipe">Suivant →<br><strong>Chapitre 21 · Capacité d’équipe</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
