<!-- content_id: chapter-20-personal-codex-work-system | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-22-fr-deepening -->

# Chapitre 20 : Construire son système de travail avec Codex

**Statut :** `candidate` · **Expérience :** `not_run`. Ne présumez pas qu’une
fonction de mémoire existe, sauvegarde automatiquement un contenu ou est
disponible dans chaque compte.

## Le problème que résout ce chapitre

Sans paquet de continuité, il faut réexpliquer le projet à chaque session. On
réutilise alors une décision obsolète ou une commande hors contexte. À l’inverse,
un carnet trop large finit par retenir des secrets, des cookies, des données
client ou des hypothèses sans date. Un système personnel utile doit montrer ce
qui est observé, ce qui est rapporté et ce qui reste à vérifier.

## Objectifs d’apprentissage

À la fin de ce chapitre, vous devriez pouvoir :

- distinguer contexte, protocole, Skill, preuve et journal ;
- assembler un paquet de reprise minimal et sans données sensibles ;
- versionner décisions, observations et dates de revue ;
- reprendre après interruption en vérifiant d’abord l’état local et distant ;
- savoir quand s’arrêter au lieu de compléter les inconnues par supposition.

## Entrée réelle : la mémoire implicite ne vaut pas un reçu

Un fichier local explicitement conservé est inspectable ; une promesse de mémoire
implicite ne l’est pas. Une session suivante peut avoir un autre dépôt, modèle,
compte, permission ou état distant. Écrivez la source et la portée de chaque fait
dans le paquet.

## Le kit de continuité

Un paquet minimal peut contenir :

~~~text
objectif et non-objectifs
contexte versionné et empreinte
décisions, hypothèses et propriétaire
commandes datées et résultat réellement observé
état local / distant et dernière vérification
diff, tests, liens ou autres preuves
inconnues et blocages
prochaine vérification, permission et point de retour
~~~

Ne copiez jamais token, cookie, clé, fichier `.env`, identifiant client ou
transcription privée. Référencez un emplacement protégé ou masquez la valeur ;
la présence d’un chemin n’est pas une permission d’y accéder.

## Un contrat de reprise en quatre états

| État | Exemple | Action permise |
|---|---|---|
| `observed` | diff local ou sortie d’une commande datée | l’utiliser dans une décision bornée |
| `reported` | phrase d’un utilisateur ou d’un ticket | la conserver comme rapport, pas comme cause |
| `inferred` | hypothèse tirée de plusieurs observations | l’étiqueter et chercher une vérification |
| `unknown` | état distant ou permission non contrôlée | ne pas le remplir par imagination |

Le paquet doit également distinguer `actions_done`, `actions_not_done`,
`blocked_on`, `unverified` et `next_check`. Un résumé fluide ne transforme pas
un `reported` ou `unknown` en fait.

## Expérience : reprise contrôlée après interruption

### Préparation

Dans un répertoire temporaire, créez deux fichiers fictifs, un journal et un
checkpoint. Fixez un `run_id`, une branche, les permissions prévues, l’heure et
la dernière observation. Utilisez une copie locale ; aucun compte réel, cookie,
secret, mémoire supposée ou service externe n’est requis.

### Tâche

1. Écrivez une petite demande et son critère d’acceptation dans le checkpoint.
2. Modifiez un seul champ dans le fichier fictif et notez le diff.
3. Interrompez l’exercice avant toute action durable.
4. Dans une nouvelle session, lisez le checkpoint, l’arbre de travail et l’état
   de branche avant de demander un résumé.
5. Demandez au modèle de distinguer observé, rapporté, inféré et inconnu ;
   complétez les inconnues vous-même ou laissez-les telles quelles.
6. Décidez `continue`, `ask`, `recover` ou `stop`, puis écrivez pourquoi.

### Preuve à conserver

Le checkpoint doit rester lisible par une autre personne :

~~~text
run_id:
objectif et non-objectifs:
contexte_version / empreinte:
branche et dernier état observé:
fichiers, diff et contrôles connus:
actions_done:
actions_not_done:
permissions et effets autorisés:
preuves conservées:
reported / inferred / unknown:
blocked_on:
prochaine vérification et point de retour:
owner / next_review:
~~~

Conservez l’ancien et le nouveau checkpoint, les sorties brutes et l’horodatage.
Un état distant non observé reste `unknown`, même si le résumé paraît cohérent.

## Variante d’échec et limites

Corrompez volontairement le checkpoint, retirez la branche ou rendez l’empreinte
incompatible dans la copie temporaire. Le bon résultat est `stop` ou `ask` :
conserver la preuve, inspecter l’état réel et ne pas reprendre une commande
écrite dans un contexte différent. Ne laissez pas le modèle inventer une branche,
une permission ou une écriture réussie.

Autres limites :

- un fichier local ne prouve pas qu’un dépôt distant a reçu le changement ;
- un résumé n’est pas une preuve de test, de publication ou de récupération ;
- `unknown` reste inconnu jusqu’à un contrôle autorisé ;
- un kit de continuité ne doit pas devenir un historique illimité de données
  sensibles.

## Réflexion

- Quelle information a permis de reprendre sans refaire le travail ?
- Quel champ aurait été dangereux à compléter par supposition ?
- Quelle observation manque avant une action durable ?
- Quelle donnée faut-il retirer pour réduire le risque ?
- Pourquoi la décision est-elle `continue`, `ask`, `recover` ou `stop` ?

## Transfert

Transférez le kit à une recherche, une revue de contenu ou une maintenance
documentaire. Gardez `run_id`, propriétaire, empreinte, état, inconnues, prochaine
vérification et point de retour ; remplacez les permissions et preuves par
celles du domaine. Ne copiez ni un état distant ni une commande sans les
réexaminer.

## Liste d’acceptation

- [ ] Aucun secret, cookie, fichier `.env` ou donnée client n’est conservé.
- [ ] Chaque décision a une source, une portée et une date.
- [ ] La reprise commence par l’observation de l’arbre de travail et de l’état
      pertinent.
- [ ] `reported`, `inferred` et `unknown` ne sont pas présentés comme `observed`.
- [ ] Les actions faites et non faites sont séparées.
- [ ] Un checkpoint corrompu déclenche `ask`, `recover` ou `stop`.
- [ ] Le prochain contrôle, le propriétaire et le point de retour sont explicites.
- [ ] Je peux expliquer que ce chapitre reste `candidate / not_run` et ne prouve
      pas la continuité d’un compte réel.

## Sources et limite de mise à jour

Les fonctions de mémoire, les surfaces Codex, les comptes et les permissions
changent. Vérifiez les documents officiels de la surface réellement utilisée et
notez URL, date, compte ou périmètre dans votre reçu. Le kit et l’expérience
décrits ici sont une méthode du projet ; ils ne prouvent pas le comportement
d’une fonction de mémoire, d’un Agent ou d’un compte donné.

La traduction française reste `in-progress / candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navigation entre les chapitres">
  <table role="presentation">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="19-evaluate-models-and-workflows-FR.md" aria-label="Chapitre précédent : Chapitre 19 · Évaluer modèles et workflows">← Précédent<br><strong>Chapitre 19 · Évaluer modèles et workflows</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="21-team-capability-system-FR.md" aria-label="Chapitre suivant : Chapitre 21 · Construire une capacité d’équipe">Suivant →<br><strong>Chapitre 21 · Construire une capacité d’équipe</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
