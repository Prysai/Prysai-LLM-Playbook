<!-- content_id: french-practice-loop | locale: JA | language: ja | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# フランス語の小さな練習：コピーできる6通のメッセージ

任意のテキスト LLM で、架空のフランス語カフェまたはホテルのやり取りを四ターン練習します。流暢さ、学習速度、訂正の正確さは約束しません。架空の情報だけを使い、モデルが実名、予約、パスポート、住所、連絡先、支払いデータを求めてきたらそこで止めます。

## 1. 目標

```text
Je veux m'entraîner à commander au café en français avec des détails fictifs.
Aide-moi à choisir un objectif écrit de quatre tours, une aide autorisée et un
moyen visible de le vérifier. N'écris pas de dialogue, n'évalue pas mon niveau
et ne promets pas la fluidité.
```

## 2. 最初の試行

```text
Joue la scène fictive du café convenue. Tu es le serveur et tu poses une
question courte à chaque fois. Attends ma réponse. Ne traduis pas, ne donne
pas de réponse modèle et conserve ma première tentative.
```

## 3. 一つの不足

```text
Compare ma tentative avec cette vérification : quatre tours, la commande
communiquée, une précision demandée (par exemple taille ou température) et une
ambiguïté résolue. Signale au maximum un problème qui empêche de me comprendre.
Si tu n'es pas sûr, dis « inconnu ». Ne réécris pas ma réponse et ne la dis
pas fluide.
```

## 4. 自分で修正

```text
Pour ce seul problème, donne-moi un indice partiel et attends ma propre
correction. N'écris pas de phrase complète sauf si je dis que l'indice ne
suffit pas. Conserve séparément ma tentative et ma correction, et note l'aide
utilisée.
```

## 5. 場面を変える

```text
Garde le même objectif de quatre tours, mais change de scène : je suis à
l'hôtel, je dois demander une chambre pour une nuit et préciser si le
petit-déjeuner est inclus. Ne réutilise pas mes phrases, ne donne pas
d'indices et conserve ma réponse sans aide.
```

## 6. 後で確認

```text
À la date ultérieure que j'indiquerai, crée une situation fictive nouvelle de
quatre tours avec la même vérification. Ne la montre pas avant, ne dis pas que
tu as programmé un rappel et n'infère pas de rétention permanente. Note la
date, ma tentative, l'aide utilisée et ce qui reste sans observation.
```

目標、最初の試行、支援、修正版、変更後のタスク、不明点を保存します。一回のループは記録された練習であり、習得や独立評価ではありません。同じループのスペイン語版は [spanish-practice-loop-ja.md](spanish-practice-loop-ja.md) を開いてください。
