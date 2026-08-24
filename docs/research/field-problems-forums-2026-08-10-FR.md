<!-- content_id: field-problems-forums-2026-08-10 | locale: FR | language: fr | default_locale: EN | translation_status: in-progress | translated_from: field-problems-forums-2026-08-10.md | source_revision: 2026-08-23 -->

# Problèmes réels des surfaces Codex / agents de code IA : recherche forums et Issues publiques

**Date de recherche :** 2026-08-10  
**État :** `candidate` (sources consultées et synthétisées ; aucune reproduction locale, aucune suggestion de forum élevée au rang de conclusion officielle)  
**Périmètre :** permissions, Windows, VS Code, réseau du sandbox et accès aux répertoires.  
**Limite d'exécution :** lecture seule de l'API Stack Exchange, des liens Stack Overflow et des Issues publiques `openai/codex` ; aucune commande de publication exécutée, aucun secret lu, aucun commit ou push.

## Lire ces relevés

- **Rapport utilisateur :** environnement, symptôme ou récit de reproduction de l'auteur.
- **Suggestion de répondant :** workaround de communauté, pas une promesse produit.
- **Confirmation officielle :** documentation officielle, réponse explicite d'un mainteneur, code ou note de version officielle. Un auteur ordinaire d'Issue n'est pas une confirmation.
- **Reproduction locale :** aucune n'a été exécutée dans cette étude.
- **Hypothèse :** jugement de l'auteur ou du répondant sur la cause, à conserver comme incertain.

Les horodatages sont ceux des sites sources. Le fichier affirme seulement que les sources étaient accessibles le 2026-08-10 ; il ne transforme pas ces horodatages en chronologie locale vérifiée.

## Cas utiles à enseigner

### 1. Accès à GitHub bloqué par une allowlist réseau dans le sandbox

- **Source :** [Stack Overflow #79970154](https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox)
- **Symptôme :** Codex CLI avec `sandbox_mode = "workspace-write"`; `curl -I https://github.com` échoue avec une erreur de proxy de type `blocked-by-allowlist`.
- **Limite :** rapport utilisateur, conseils et hypothèse ; aucune reproduction ni confirmation officielle.
- **Action sûre :** distinguer interdiction réseau du sandbox, allowlist du proxy, DNS/TLS et pare-feu ; consigner URL, statut HTTP, erreur de proxy et permissions effectives ; tester sans secret sur le seul domaine nécessaire.
- **Ne pas affirmer :** `workspace-write` fournit Internet, ou l'activation du réseau rend tout CLI connecté ; ne pas copier une configuration de réponse ni choisir full access pour éviter une validation.

### 2. Windows : le support natif de Codex CLI est-il établi ?

- **Source :** [Stack Overflow #79887792](https://stackoverflow.com/questions/79887792/openai-codex-cli-isnt-available-on-windows-yet-is-there-any-other-way-i-can-hav)
- **Symptôme :** Windows 11, PowerShell/Command Prompt, WSL2 ; la documentation ne permet pas de distinguer absence de support et documentation incomplète.
- **Limite :** conseils communautaires contradictoires (WSL2 ou Windows natif), sans confirmation officielle ni reproduction.
- **Action sûre :** consigner version, origine d'installation, résolution `where`/PATH, shell, distribution WSL et système de fichiers du projet ; commencer par une vérification de version et une sonde en lecture seule.
- **Ne pas affirmer :** le support ou l'absence de support natif, ni l'équivalence WSL2/Windows.

### 3. Extension VS Code `spawn UNKNOWN`, CLI manuel fonctionnel

- **Source :** [Stack Overflow #79923404](https://stackoverflow.com/questions/79923404/vs-code-codex-extension-fails-with-spawn-unknown-on-windows-even-though-codex)
- **Symptôme :** environnement Windows géré, VS Code stable et PowerShell Constrained Language Mode ; le CLI fonctionne mais l'extension échoue avec `spawn UNKNOWN`.
- **Action sûre :** séparer versions VS Code/extension/CLI, résultats `where.exe`, logs de l'extension host, politique du shell et shim `.exe`/`.cmd`. « CLI exécutable » et « extension capable de spawn » sont deux critères.
- **Ne pas affirmer :** PATH correct = extension fonctionnelle, cause unique liée au PATH ou permission de contourner la politique d'entreprise.

### 4. `approval_policy = "on-failure"` demande toujours une approbation

- **Source :** [Stack Overflow #79891423](https://stackoverflow.com/questions/79891423/how-to-stop-codex-from-always-asking-for-approval)
- **Symptôme :** VS Code, Windows/WSL, workspace trusted ; chaque modification de fichier demande une approbation. La réponse acceptée a une autre version et un autre environnement.
- **Action sûre :** séparer « demande d'approbation » et « autorisation du sandbox », vérifier emplacement de configuration, session, workspace et writable roots, puis essayer un petit changement récupérable.
- **Ne pas affirmer :** `never` = accès total, ou workspace-write = tous fichiers modifiables.

### 5. Symboles illisibles dans Windows Terminal

- **Source :** [Stack Overflow #79880150](https://stackoverflow.com/questions/79880150/gibberish-symbols-in-codex-under-windows-cmd-in-windows-terminal)
- **Symptôme :** des symboles supplémentaires apparaissent dans l'interface ; redimensionner la fenêtre les fait disparaître temporairement.
- **Action sûre :** noter terminal, shell, police, taille, page de code et version ; comparer nouvelle fenêtre, redessin, autres terminaux et sortie texte.
- **Ne pas affirmer :** `chcp 65001` corrige forcément, que l'erreur est nécessairement UTF-8 ou que le redimensionnement est durable.

### 6. Utiliser le sandbox pour empêcher la lecture d'un répertoire privé

- **Source :** [Stack Overflow #79959031](https://stackoverflow.com/questions/79959031/how-to-prevent-codex-cli-from-reading-certain-files-or-directories-via-sandbox)
- **Symptôme :** Codex CLI, exemple Linux `~/private`; la personne veut une limite de lecture imposée par le noyau plutôt qu'une consigne au modèle.
- **Action sûre :** isoler par les permissions du système et sortir les données privées du workspace ; vérifier profile, chemin absolu, cwd, writable roots et helper avec un fichier non sensible.
- **Ne pas affirmer :** mêmes règles deny partout, résistance à toutes les exfiltrations ou preuve noyau parce que le modèle dit ne pas lire.

### 7. Échec de téléchargement d'une dépendance Maven

- **Source :** [Stack Overflow #79636395](https://stackoverflow.com/questions/79636395/codex-unable-to-access-java-maven-repository)
- **Symptôme :** Java/Spring Boot, `./mvnw clean test`, `Network is unreachable`, puis erreurs en cascade sur les versions manquantes.
- **Action sûre :** distinguer réseau inaccessible et POM/version ; consigner settings Maven, proxy, domaine et cache ; préférer le proxy approuvé ou le cache de dépendances de l'organisation.
- **Ne pas affirmer :** recommander un proxy public inconnu ou déduire qu'OpenAI, Maven Central, GitHub et tout domaine sont également accessibles.

### 8. Computer Use Windows ne peut pas énumérer les fenêtres

- **Source :** [openai/codex Issue #37306](https://github.com/openai/codex/issues/37306)
- **Symptôme :** `EnumWindows failed` et appels d'énumération impossibles. Un label bug public n'est pas une confirmation de mainteneur.
- **Action sûre :** tester d'abord les applications ordinaires, puis séparer API d'énumération, chemin/installation du helper et permissions/bureau actif ; conserver code d'erreur et actions déjà tentées.
- **Ne pas affirmer :** disponibilité ou indisponibilité générale, ni contrôle validé parce que le helper démarre.

### 9. Brève fenêtre d'invite de commandes pendant le travail Desktop

- **Source :** [openai/codex Issue #37153](https://github.com/openai/codex/issues/37153)
- **Symptôme :** fenêtre console au premier plan et enfant `conhost.exe`; l'utilisateur craint une action non autorisée.
- **Action sûre :** noter arbre de processus, chemins, signatures, moments et version ; comparer repos et exécution ; transmettre un paquet minimal sans code ni secret si nécessaire.
- **Ne pas affirmer :** exfiltration ou logiciel malveillant sur la seule base d'une fenêtre, ni généraliser un comportement alpha.

### 10. Contradiction possible entre writable root personnalisé et cwd

- **Source :** [openai/codex Issue #37655](https://github.com/openai/codex/issues/37655)
- **Symptôme :** le texte généré dit que le cwd est éditable, mais `apply_patch` demande une approbation alors que seul un autre root est writable.
- **Action sûre :** prendre le refus/l'approbation réel comme référence ; consigner cwd, roots, profile effectif, prompt généré et cible ; tester trois cibles : cwd, root autorisé, extérieur.
- **Ne pas affirmer :** explication de permission = enforcement OS, `workspace-write` = cwd forcément inscriptible, ou correction avant vérification du code et des tests de version.

## Carte de tri minimale commune

1. Séparer prompt du modèle, politique d'approbation, enforcement du sandbox, permissions OS, proxy réseau et outil cible.
2. Collecter version, plateforme, origine d'installation, shell/terminal, cwd, chemin de configuration, erreur exacte, arbre de processus et URL échouée.
3. Faire une vérification sans secret, récupérable, sur un fichier ou domaine unique ; ne pas exécuter directement les scripts, proxys ou commandes d'élargissement de permissions des forums.
4. Vérifier la configuration réellement active : le fichier édité n'est pas nécessairement celui de la session, de l'extension ou de l'app.
5. Accepter séparément démarrage, lecture, écriture, réseau, intégration VS Code et contrôle Computer Use.

## Sources, licence et limite d'usage

Les pages Stack Overflow indiquent CC BY-SA 4.0 ; ce fichier ne reprend que des résumés et liens, pas de longs passages, code ou commandes. Les Issues GitHub sont des rapports publics d'utilisateurs, pas une confirmation OpenAI. Aucune image, code ou instruction de Skill externe n'est copié ; aucun nouvel enregistrement d'actif n'est nécessaire.

## Blocages et éléments non vérifiés

- Les URL officielles Codex ont redirigé pendant cette passe ; leur texte final n'a pas été obtenu de manière fiable et n'est pas présenté comme confirmé.
- Les détails/commentaires GitHub ont rencontré une limite API anonyme ; seules les pages accessibles, résultats de recherche et résumés obtenus sont utilisés.
- Reddit, GitHub Discussions et les pages impossibles à citer de façon fiable sont exclus.
- Aucun problème de forum n'a été reproduit localement ; tous restent non vérifiés.
- Contenu de forum, versions, syntaxe de configuration et matrice de support changent : revisiter les URL, ajouter une source de première partie, la date et la portée de version avant publication.
