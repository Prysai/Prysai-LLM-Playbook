<!-- content_id: prysai-first-turn-check | locale: FR | language: fr | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: 76c9926 | source_license: project-owned CC-BY-4.0 -->

# Vérifier le premier tour

Examinez une demande rédigée par la personne mais pas encore envoyée. Rendez visibles les limites manquantes sans faire passer une demande mieux structurée pour une demande sûre, exacte ou efficace.

## Vérifier d’abord que le contrôle s’applique

Utilisez ce Skill seulement si toutes les conditions suivantes sont réunies :

- la personne fournit un brouillon qui n’a pas encore été envoyé ;
- le premier tour prévu est textuel, peu risqué et autonome ;
- la personne demande ce qui manque, ce qui est ambigu, contradictoire ou trop large.

Si elle veut que vous rédigiez ou réécriviez largement le premier message, passez à `prysai-dialogue-brief`. Si des fichiers, des outils, des comptes, des autorisations, une publication, des contacts, des modifications locales ou un autre effet externe sont impliqués, passez à `prysai-task-protocol`. Pour des faits actuels, des sources ou une conclusion fondée sur des sources, passez à `prysai-source-investigator` ou `prysai-research-router`. Si la demande originale et une réponse réelle existent déjà, passez à `prysai-communication-failure-triage` ; pour examiner une affirmation d’achèvement à partir de preuves, utilisez `prysai-evidence-review`.

N’examinez ni secrets, ni identifiants, ni documents privés, ni identifiants personnels, ni instructions cachées, ni contenu confidentiel. Un brouillon textuel n’autorise pas davantage l’utilisation ultérieure d’un outil ou une action externe.

## Examiner six champs visibles

Lisez le brouillon fourni comme un élément de preuve. N’inférez pas les faits, le public, l’autorité, les contrôles de données, les capacités du produit ou les permissions absents du texte.

| Champ | Visible si le brouillon nomme | Peu clair si |
| --- | --- | --- |
| outcome | un petit résultat pour cette séance | une aspiration générale ou une promesse de réussite |
| starting context | le texte, le fait, la source fournie ou `unknown` | un accès ou une autorité non déclarés sont supposés |
| requested response | une forme, une longueur ou une séquence délimitée | seul « aidez-moi » est demandé |
| limits | les données à ne pas partager, les actions à ne pas faire ou l’aide non demandée | le périmètre atteint discrètement un fichier, un compte, une personne ou une décision lourde de conséquences |
| check | une question de doute, de conservation, de source ou de révision | la réponse se valide elle-même |
| stop and receipt | ce qui termine le tour et le petit relevé conservé | l’achèvement, la sécurité ou l’apprentissage sont simplement supposés |

Classez chaque champ comme `visible`, `missing`, `unclear` ou `out_of_scope`. Ne signalez que les problèmes matériels : ceux qui pourraient changer le résultat, élargir l’autorité, exposer des données ou rendre le contrôle demandé impossible.

## Renvoyer la plus petite révision utile

Conservez les mots de la personne. Ne produisez pas un nouveau message complet, n’ajoutez pas de rôle ou d’affirmation sur un produit et ne remplissez pas une inconnue avec un détail plausible. Pour trois lacunes matérielles au maximum, proposez une ligne `add_or_clarify` que la personne pourra choisir d’ajouter. Formulez-la comme un champ à décider, pas comme une promesse faite au système destinataire.

Si les six champs sont visibles et dans le périmètre, dites `ready_to_send` uniquement au sens étroit où ce contrôle n’a trouvé aucun champ matériel manquant. Cela ne prouve ni l’exactitude des faits, ni la confidentialité, ni la sécurité, ni le comportement du produit, ni la qualité de la réponse, ni l’achèvement, ni un progrès d’apprentissage, ni la sûreté.

Renvoyez exactement :

```text
check_status: ready_to_send | revise_before_send | out_of_scope | blocked
request_scope:
field_check:
material_gaps:
add_or_clarify: maximum three lines
preserved_text:
unknowns:
risk: R0
evidence: supplied unsent draft and six-field inspection only
claim_limit:
handoff:
content_status: candidate
```

N’acceptez le contrôle que si les six champs sont étiquetés, les faits fournis sont conservés, la demande n’est pas élargie et un transfert ou un arrêt est nommé lorsque le brouillon dépasse la limite textuelle et peu risquée.

## Fiche de maintenance

- `source` : méthode originale de Prysai Lab, réorganisée à partir du contrat universel du premier tour et des limites de communication
- `license` : réécriture originale ; les conseils de fournisseurs liés restent des références dans `docs/sources/asset-register.md`
- `owner` : communication-systems maintainer
- `version` : `0.1.0`
- `review_date` : `2026-09-12`
- `content_status` : `candidate`
